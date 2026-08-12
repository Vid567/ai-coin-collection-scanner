// Netherlands historical coin reference layer.
// Primary official authority: De Nederlandsche Bank (Nationale Numismatische Collectie / NUMIS).
export const DNB_COLLECTION='https://www.dnb.nl/over-ons/de-nieuwe-schatkamer/geldcollectie/';
export const DNB_GUILDER_INFO='https://www.dnb.nl/geld-omwisselen/guldenbiljetten-omwisselen/';
export const DNB_NNC_INFO='https://www.dnb.nl/nieuws-voor-de-sector/bruiklenen-voor-tentoonstelling-gouden-koets/';
const rows=[
 ['Cent','Juliana',1948,1980,'Juliana portrait / KONINGIN DER NEDERLANDEN','Denomination / year','Bronze',2.0,15.0,'Smooth','Normal'],
 ['Cent','Beatrix',1980,2001,'Beatrix portrait / BEATRIX KONINGIN DER NEDERLANDEN','Denomination / year','Bronze / later plated steel',2.3,16.0,'Smooth','Normal'],
 ['5 cent','Juliana',1950,1980,'Juliana portrait','Denomination / year','Bronze',3.5,21.0,'Smooth','Normal'],
 ['5 cent','Beatrix',1982,2001,'Beatrix portrait','Denomination / year','Bronze / plated steel',3.5,21.0,'Smooth','Normal'],
 ['10 cent','Juliana',1950,1980,'Juliana portrait','Denomination / year','Nickel',1.5,15.0,'Reeded','Normal'],
 ['10 cent','Beatrix',1982,2001,'Beatrix portrait','Denomination / year','Nickel',1.5,15.0,'Reeded','Normal'],
 ['25 cent','Juliana',1950,1980,'Juliana portrait','Denomination / year','Nickel',3.0,19.0,'Reeded','Normal'],
 ['25 cent','Beatrix',1980,2001,'Beatrix portrait','Denomination / year','Nickel',3.0,19.0,'Reeded','Normal'],
 ['1 gulden','Juliana — silver',1954,1967,'Juliana portrait','Crowned Dutch arms / 1 G','Silver alloy',6.5,25.0,'GOD ZIJ MET ONS','Interesting'],
 ['1 gulden','Juliana — nickel',1967,1980,'Juliana portrait','Crowned Dutch arms / 1 G','Nickel',6.0,25.0,'GOD ZIJ MET ONS','Possibly interesting'],
 ['1 gulden','Beatrix',1982,2001,'Beatrix portrait','Geometric denomination / year','Nickel',6.0,25.0,'GOD ZIJ MET ONS','Normal'],
 ['2½ gulden','Juliana — silver',1959,1966,'Juliana portrait','Crowned Dutch arms / 2½ G','Silver alloy',15.0,33.0,'GOD ZIJ MET ONS','Interesting'],
 ['2½ gulden','Juliana — nickel',1969,1980,'Juliana portrait','Crowned Dutch arms / 2½ G','Nickel',10.0,29.0,'GOD ZIJ MET ONS','Possibly interesting'],
 ['2½ gulden','Beatrix',1982,2001,'Beatrix portrait','Geometric denomination / year','Nickel',10.0,29.0,'GOD ZIJ MET ONS','Normal'],
 ['5 gulden','Beatrix',1988,2001,'Beatrix portrait','Geometric denomination / 5 GULDEN / year','Nickel-bronze',9.25,23.5,'Edge inscription / patterned','Normal']
];
export const NETHERLANDS_GUILDER_REFERENCE_DB=rows.map(([denomination,series,yearFrom,yearTo,obverse,reverse,metal,weight,diameter,edge,priority])=>({country:'Netherlands',currency:'Dutch guilder (NLG)',period:'Kingdom of the Netherlands — post-war guilder',series,denomination,yearFrom,yearTo,obverse,reverse,mintMark:'Utrecht mint mark / privy mark may occur',metal,weight,diameter,edge,type:'Regular circulation',authority:'De Nederlandsche Bank — Nationale Numismatische Collectie',source:DNB_COLLECTION,researchPriority:priority,researchReason:priority==='Interesting'?'Silver guilder issue; exact year, mint/privy marks and condition merit further research.':priority==='Possibly interesting'?'Historic guilder series or transition type; verify exact year, material and mint/privy marks.':'Standard late guilder circulation type; verify year and variety when needed.'}));
export const NETHERLANDS_OLDER_REFERENCE_SEED={country:'Netherlands',currency:'Dutch guilder',period:'Kingdom of the Netherlands before 1948',series:'Willem I / Willem II / Willem III / Wilhelmina historical coinage',denominations:['½ cent','1 cent','2½ cent','5 cent','10 cent','25 cent','½ gulden','1 gulden','2½ gulden','5 gulden','10 gulden'],authority:'De Nederlandsche Bank — Nationale Numismatische Collectie / NUMIS',source:DNB_COLLECTION,researchPriority:'Interesting',researchReason:'Older Kingdom coinage, often including silver or gold issues. Exact monarch, year, denomination, metal and mint characteristics require NUMIS/NNC verification.'};
export function netherlandsHistoricalRows(){return NETHERLANDS_GUILDER_REFERENCE_DB.map(r=>({Country:r.country,Currency:r.currency,Period:r.period,Series:r.series,Denomination:r.denomination,'Year From':r.yearFrom,'Year To':r.yearTo,Obverse:r.obverse,Reverse:r.reverse,'Mint / Privy':r.mintMark,Metal:r.metal,'Weight (g)':r.weight,'Diameter (mm)':r.diameter,Edge:r.edge,Type:r.type,Authority:r.authority,Source:r.source,'Research Priority':r.researchPriority,'Research Reason':r.researchReason}));}
