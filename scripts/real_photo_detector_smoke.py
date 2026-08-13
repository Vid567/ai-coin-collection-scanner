import io,json,math,urllib.request
from PIL import Image
import numpy as np

CASES=[
 {"id":"morgan-single","url":"https://upload.wikimedia.org/wikipedia/commons/4/4e/1884_Morgan_Dollar_in_a_Coin_capsule.jpg","expected":1,"license":"CC BY-SA 4.0","source":"https://commons.wikimedia.org/wiki/File:1884_Morgan_Dollar_in_a_Coin_capsule.jpg"},
 {"id":"euro-line","url":"https://upload.wikimedia.org/wikipedia/commons/b/b9/Euro_coins_line.jpg","expected":8,"license":"CC0 1.0","source":"https://commons.wikimedia.org/wiki/File:Euro_coins_line.jpg"},
 {"id":"eu-commission-euro-07","url":"https://upload.wikimedia.org/wikipedia/commons/6/6d/Euro_coins_%2807%29.jpg","expected":None,"license":"CC BY 4.0","source":"https://commons.wikimedia.org/wiki/File:Euro_coins_(07).jpg"}
]

def fetch(url):
 req=urllib.request.Request(url,headers={'User-Agent':'AI-Coin-Collection-Scanner-Benchmark/1.0'})
 with urllib.request.urlopen(req,timeout=30) as r:return r.read()

def boxsum(ii,r):
 h,w=ii.shape[0]-1,ii.shape[1]-1
 ys=np.arange(h)[:,None];xs=np.arange(w)[None,:]
 y0=np.maximum(0,ys-r);y1=np.minimum(h-1,ys+r);x0=np.maximum(0,xs-r);x1=np.minimum(w-1,xs+r)
 return ii[y1+1,x1+1]-ii[y0,x1+1]-ii[y1+1,x0]+ii[y0,x0],(y1-y0+1)*(x1-x0+1)

def binary_window(mask,r,mode):
 ii=np.pad(mask.astype(np.int32),((1,0),(1,0))).cumsum(0).cumsum(1);s,n=boxsum(ii,r)
 return (s>0) if mode=='dilate' else (s>=n)

def morph(mask,r):
 out=mask
 for _ in range(2):out=binary_window(binary_window(out,r,'dilate'),r,'erode')
 return binary_window(binary_window(out,r,'erode'),r,'dilate')

def candidate_score(w,h,fill):
 aspect=min(w/h,h/w);a=max(0,min(1,(aspect-.58)/.42));f=max(0,min(1,(fill-.5)/.32));return .58*a+.42*f

def components(mask):
 h,w=mask.shape;seen=np.zeros_like(mask,bool);out=[];area_all=w*h
 for sy in range(h):
  for sx in range(w):
   if not mask[sy,sx] or seen[sy,sx]:continue
   stack=[(sx,sy)];seen[sy,sx]=1;pts=[]
   while stack:
    x,y=stack.pop();pts.append((x,y))
    for dy in (-1,0,1):
     for dx in (-1,0,1):
      if dx==dy==0:continue
      qx,qy=x+dx,y+dy
      if 0<=qx<w and 0<=qy<h and mask[qy,qx] and not seen[qy,qx]:seen[qy,qx]=1;stack.append((qx,qy))
   xs=[p[0] for p in pts];ys=[p[1] for p in pts];bw=max(xs)-min(xs)+1;bh=max(ys)-min(ys)+1;fill=len(pts)/(bw*bh);share=len(pts)/area_all;aspect=bw/bh
   if share<.0045 or share>.30 or aspect<.52 or aspect>1.92 or fill<.48:continue
   score=candidate_score(bw,bh,fill)
   if score>=.28:out.append((min(xs),min(ys),bw,bh,score))
 return out

def iou(a,b):
 ax,ay,aw,ah,_=a;bx,by,bw,bh,_=b;x1=max(ax,bx);y1=max(ay,by);x2=min(ax+aw,bx+bw);y2=min(ay+ah,by+bh);inter=max(0,x2-x1)*max(0,y2-y1)
 return 0 if not inter else inter/(aw*ah+bw*bh-inter)

def nms(items,t=.42):
 kept=[]
 for item in sorted(items,key=lambda x:x[4],reverse=True):
  if all(iou(item,k)<t for k in kept):kept.append(item)
 return kept

def detect(blob,maxdim=700):
 im=Image.open(io.BytesIO(blob)).convert('RGB');sw,sh=im.size;scale=min(1,maxdim/max(sw,sh));w=max(1,round(sw*scale));h=max(1,round(sh*scale));im=im.resize((w,h));a=np.asarray(im).astype(np.float32);gray=.299*a[:,:,0]+.587*a[:,:,1]+.114*a[:,:,2];sat=a.max(2)-a.min(2);r=max(24,round(min(w,h)*.08))
 gi=np.pad(gray,((1,0),(1,0))).cumsum(0).cumsum(1);si=np.pad(sat,((1,0),(1,0))).cumsum(0).cumsum(1);gs,n=boxsum(gi,r);ss,_=boxsum(si,r);mask=(np.abs(gs/n-gray)>10)|(np.abs(sat-ss/n)>18);mr=max(2,round(min(w,h)*.005));return nms(components(morph(mask,mr)))

rows=[]
for case in CASES:
 try:
  data=fetch(case['url']);boxes=detect(data);row={**case,'bytes':len(data),'detected':len(boxes),'scores':[round(b[4],3) for b in boxes]}
  if case['expected'] is not None:row['countError']=len(boxes)-case['expected'];row['countExact']=len(boxes)==case['expected']
 except Exception as e:row={**case,'error':str(e)}
 rows.append(row)
print(json.dumps({'status':'REAL_PHOTO_BASELINE','cases':rows},indent=2))
# report-only baseline: fail only when no image could be downloaded/tested
if not any('detected' in r for r in rows):raise SystemExit(1)
