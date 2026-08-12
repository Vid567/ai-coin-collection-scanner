// Nederlandse presentatielaag voor Browser Beta v1.8.
// Scanner-, detectie-, opslag- en referentielogica wordt gedeeld met de EN-versie.
import './coin-batch02.js';

const exact = new Map(Object.entries({
  'Duplicate':'Dupliceren','Delete':'Verwijderen','Check public reference':'Controleer openbare referentie',
  'Obverse':'Voorzijde','Reverse':'Achterzijde','Edge':'Rand','None':'Geen','None / choose later':'Geen / later kiezen',
  'Country / Issuing Authority':'Land / uitgevende instantie','Year':'Jaar','Approximate Period':'Geschatte periode',
  'Denomination':'Nominale waarde','Currency':'Valuta','Mint Mark':'Muntteken','Metal / Possible Composition':'Metaal / mogelijke samenstelling',
  'Diameter (mm)':'Diameter (mm)','Weight (g)':'Gewicht (g)','Condition':'Conditie',
  'Visible text / motif for public reference':'Zichtbare tekst / motief voor openbare referentie',
  'Obverse Design':'Ontwerp voorzijde','Reverse Design':'Ontwerp achterzijde','Edge Description':'Beschrijving rand',
  'Quantity':'Aantal','Confidence':'Zekerheid','Coin Type':'Munttype','Public Reference Match':'Match openbare referentie',
  'Reference Authority':'Referentie-instantie','Public Reference Source':'Openbare referentiebron',
  'Research Priority':'Onderzoeksprioriteit','Research Reason':'Reden voor verder onderzoek',
  'Research Source 1':'Onderzoeksbron 1','Research Source 2':'Onderzoeksbron 2','Research Source 3':'Onderzoeksbron 3',
  'Collector Notes':'Notities verzamelaar','Information Status':'Informatiestatus',
  'Uncertain':'Onzeker','Poor':'Slecht','Fair':'Redelijk','Good':'Goed','Very Good':'Zeer goed','Fine':'Fraai',
  'Very Fine':'Zeer fraai','Extremely Fine':'Prachtig','Uncirculated':'Ongecirculeerd',
  'Needs review':'Controleren','Low':'Laag','Medium':'Middel','High':'Hoog','User confirmed':'Door gebruiker bevestigd',
  'Interesting':'Interessant','Possibly interesting':'Mogelijk interessant','Normal':'Normaal',
  'AI not connected — manual review':'AI niet gekoppeld — handmatig controleren',
  'Computer-vision crop — needs review':'Automatische uitsnede — controleren',
  'AI suggestion':'AI-suggestie','Public-reference match — verify photo':'Match openbare referentie — controleer foto',
  'Multiple public-reference candidates — physical check needed':'Meerdere mogelijke referenties — fysieke controle nodig'
}));

function translateExact(text){return exact.get(String(text).trim()) || text;}
function translateNode(root=document){
  root.querySelectorAll?.('label,button,option,strong,small').forEach(el=>{
    if(el.childElementCount===0){const t=el.textContent;const tr=translateExact(t);if(tr!==t)el.textContent=tr;}
  });
  root.querySelectorAll?.('select').forEach(sel=>[...sel.options].forEach(opt=>{const tr=translateExact(opt.textContent);if(tr!==opt.textContent)opt.textContent=tr;}));
  const pc=document.querySelector('#photo-count');if(pc)pc.textContent=pc.textContent.replace(/source photos?/,'bronfoto').replace(/bronfoto(?!'s)/g,"bronfoto's").replace(/crops?/,'uitsneden');
  const rc=document.querySelector('#row-count');if(rc)rc.textContent=rc.textContent.replace(/coin$/,'munt').replace(/coins$/,'munten');
  const ds=document.querySelector('#detection-summary');if(ds)ds.textContent=ds.textContent.replace('No automatic detection run yet.','Nog geen automatische detectie uitgevoerd.').replace(/Front:/g,'Voorzijde:').replace(/Back:/g,'Achterzijde:').replace(/detected crops?/g,'gedetecteerde uitsneden');
  const st=document.querySelector('#reference-db-status');if(st&&st.textContent.startsWith('Curated starter database:'))st.textContent=st.textContent.replace('Curated starter database:','Samengestelde startdatabase:').replace('reference types across','referentietypen uit').replace('issuing areas, including','uitgevende gebieden, waaronder').replace('Netherlands references.','Nederlandse referenties.');
}
const observer=new MutationObserver(mutations=>{observer.disconnect();for(const m of mutations){for(const n of m.addedNodes){if(n.nodeType===1)translateNode(n);}}translateNode(document);observer.observe(document.body,{childList:true,subtree:true});});
translateNode(document);observer.observe(document.body,{childList:true,subtree:true});