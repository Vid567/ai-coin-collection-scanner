// EU-wide euro circulation reference layer.
// Primary sources: European Commission Economy & Finance euro coin catalogue.
// This layer covers all current euro issuers and all eight circulation denominations.
const EU='https://economy-finance.ec.europa.eu/euro/euro-coins-and-notes/euro-coins/national-sides-euro-coins_en';
const COMMON='https://economy-finance.ec.europa.eu/euro/euro-coins-and-notes/euro-coins/common-sides-euro-coins_en';
export const EURO_DENOMINATIONS={
 '1 cent':{weight:2.30,diameter:16.25,composition:'Copper-covered steel'},
 '2 cent':{weight:3.06,diameter:18.75,composition:'Copper-covered steel'},
 '5 cent':{weight:3.92,diameter:21.25,composition:'Copper-covered steel'},
 '10 cent':{weight:4.10,diameter:19.75,composition:'Nordic gold'},
 '20 cent':{weight:5.74,diameter:22.25,composition:'Nordic gold'},
 '50 cent':{weight:7.80,diameter:24.25,composition:'Nordic gold'},
 '1 euro':{weight:7.50,diameter:23.25,composition:'Bimetal'},
 '2 euro':{weight:8.50,diameter:25.75,composition:'Bimetal'}
};
const issuers=[
 ['Austria',2002,'Flowers, architecture and famous historical figures'],
 ['Belgium',1999,'Belgian monarch; multiple official series'],
 ['Bulgaria',2026,'Madara Horseman / St Ivan Rilski / Paisius of Hilendar'],
 ['Croatia',2023,'Glagolitic HR / Nikola Tesla / marten / map of Croatia'],
 ['Cyprus',2008,'Mouflon / Kyrenia ship / Idol of Pomos'],
 ['Estonia',2011,'Map of Estonia and Eesti'],
 ['Finland',1999,'Lion / swans / cloudberries; designs vary by denomination'],
 ['France',1999,'Marianne / Sower / Tree and later official series'],
 ['Germany',2002,'Oak twig / Brandenburg Gate / Federal eagle'],
 ['Greece',2002,'Ships / historical figures / Europa and the bull'],
 ['Ireland',2002,'Celtic harp and Éire'],
 ['Italy',2002,'Italian art and cultural motifs; denomination-specific designs'],
 ['Latvia',2014,'Latvian maiden / coat of arms'],
 ['Lithuania',2015,'Vytis and Lietuva'],
 ['Luxembourg',2002,'Grand Duke portrait; official portrait series'],
 ['Malta',2008,'Maltese cross / coat of arms / Mnajdra temples'],
 ['Netherlands',2002,'Queen Beatrix / King Willem-Alexander official series'],
 ['Portugal',2002,'Royal seals and Portuguese shields'],
 ['Slovakia',2009,'Kriváň / Bratislava Castle / double cross'],
 ['Slovenia',2007,'National historical and cultural motifs by denomination'],
 ['Spain',1999,'Cathedral / Cervantes / monarch; multiple official series'],
 ['Andorra',2014,'Pyrenean chamois / Romanesque church / Casa de la Vall'],
 ['Monaco',2001,'Monégasque royal and state motifs; multiple official series'],
 ['San Marino',2002,'San Marino landmarks and symbols; multiple official series'],
 ['Vatican City',2002,'Papal / Vatican motifs; multiple official series']
];
export const EURO_REFERENCE_DB=issuers.flatMap(([country,yearFrom,design])=>Object.entries(EURO_DENOMINATIONS).map(([denomination,spec])=>({
 country,currency:'Euro',denomination,yearFrom,yearTo:2026,
 type:`${country} ${denomination} regular circulation`,design,
 composition:spec.composition,weight:spec.weight,diameter:spec.diameter,
 authority:'European Commission',source:EU,commonSideSource:COMMON,
 catalogue:'EU official euro circulation',research:false,researchPriority:'Normal',
 researchReason:'Regular euro circulation type. Check year, national design, mint mark and whether a €2 coin has a commemorative national side.'
})));
export const EURO_ISSUERS=issuers.map(([country,yearFrom,design])=>({country,yearFrom,design,source:EU}));
export function euroReferenceRows(){return EURO_REFERENCE_DB.map(r=>({Country:r.country,Currency:r.currency,Denomination:r.denomination,'Year From':r.yearFrom,'Year To':r.yearTo,Type:r.type,Design:r.design,Composition:r.composition,'Weight (g)':r.weight,'Diameter (mm)':r.diameter,Authority:r.authority,Source:r.source,Catalogue:r.catalogue,'Research Priority':r.researchPriority,'Research Reason':r.researchReason}));}
export function euroReferenceStats(){return {records:EURO_REFERENCE_DB.length,issuers:issuers.length,denominations:Object.keys(EURO_DENOMINATIONS).length};}
