// ── State ────────────────────────────────────────────────────────────────
const S = {
  theme: 'light', role: 'physician', view: 'today',
  taskId: null, patientId: null, capType: null,
  cmd: false, query: '', pq: '',
  approved: [], toast: '', _tt: null,
  newTaskOpen: false,
  workOpen: false, workMode: null,
  workQ: '', newPName: '',
  extraPatients: [],
  labOpen: false, labQ: '', labFilter: 'all',
  labSelected: [], labFavs: [],
  extraTasks: [],
  noteOpen: false, noteRecording: false, noteStep: 'record',
  notePatient: '', noteDate: '', noteComment: '', noteStartedAt: null,
  docOpen: false, docStep: 'upload', docFileName: '', docDragOver: false,
  refOpen: false, refStep: 'compose', refSpecialist: '', refReason: '', refPatient: '', refDocs: [],
  memTab: 'templates',
  templateOpen: false, templateId: null,
  addTmplOpen: false, addTmplType: 'note', addTmplLabel: '', addTmplContent: '',
  userTemplates: [],
  labWf: false, labWfStep: 0,
  workItem: null,
  completedWork: [],
  clinic: 'cypress', clinicDrop: false,
  ccmCareType: 'CCM', ccmSignOff: 'All', ccmInsurance: 'All', practicesOpen: false,
  carePlanOpen: false, billingOpen: false,
  billingPhase: 'input', billingPrompt: '', billingInputs: [], billingInputMenu: false, billingReview: {}, billingViewingId: null,
  carePlanStep: 'select', selectedTemplate: null, carePlanLoaded: false,
  cpPhase: 'input', cpTemplate: null, cpInputs: [], cpInputMenu: false, cpPrompt: '', cpViewingId: null,
  ptStatus: 'all', ptSort: 'name', ptProvider: 'all',
  workItemView: null,
  ftDetailId: null,
  ftCreateOpen: false, ftCreateName: '', ftCreateDesc: '', ftCreateContent: '', ftCreatePrompt: '',
  userFtTemplates: [],
};

// ── Clinics ───────────────────────────────────────────────────────────────
const CLINICS = [
  { id:'cypress', label:'Cypress Physicians Association', short:'Cypress',    emr:'eMDs',            patients:377, signoffReady:252, signoffDone:118, pendingActs:14, missingMin:8,  revenue:15840, todayCalls:18 },
  { id:'ikp',     label:'IKP Family Medicine',           short:'IKP',         emr:'eMDs',            patients:48,  signoffReady:31,  signoffDone:12,  pendingActs:5,  missingMin:3,  revenue:1950,  todayCalls:4  },
  { id:'westtx',  label:'West Texas Primary Care',       short:'West TX',     emr:'Azalea Health',   patients:62,  signoffReady:44,  signoffDone:21,  pendingActs:9,  missingMin:6,  revenue:2760,  todayCalls:6  },
  { id:'pulm',    label:'Pulmonology Associates',        short:'Pulm',        emr:'eClinicalWorks',  patients:89,  signoffReady:67,  signoffDone:29,  pendingActs:11, missingMin:4,  revenue:4210,  todayCalls:8  },
  { id:'cardio',  label:'Cardiology of West Texas',      short:'Cardiology',  emr:'eClinicalWorks',  patients:134, signoffReady:98,  signoffDone:47,  pendingActs:17, missingMin:12, revenue:6130,  todayCalls:12 },
];
function currentClinic(){ return CLINICS.find(c=>c.id===S.clinic)||CLINICS[0]; }

// ── Data ─────────────────────────────────────────────────────────────────
const PATIENTS = [
  { id:'p1', name:'Margaret Torres', dob:'03/12/1948', age:76, sex:'F', mrn:'CYP-4829',
    plan:'Medicare', risk:'High', provider:'Sam', last:'Jun 10',
    conditions:['Type 2 Diabetes Mellitus','Hypertension','Chronic Kidney Disease (Stage 3)'],
    medications:['Metformin 1000mg BID','Lisinopril 10mg daily','Amlodipine 5mg daily','Atorvastatin 40mg nightly'],
    vitals:{bp:'138/82',hr:78,temp:'98.4°F',weight:'167 lbs',a1c:'7.8%'},
    minutesThisMonth:47, lastCall:'Jun 10, 2026', ccmStatus:'ready',
    activities:[
      {date:'Jun 10',desc:'Monthly follow-up call — diabetes & hypertension review',staff:'Maria R., RN',clinical:true,minutes:22},
      {date:'Jun 3', desc:'Medication refill coordination with pharmacy',staff:'Maria R., RN',clinical:true,minutes:15},
      {date:'May 28',desc:'Lab result review and patient notification — HbA1c, BMP',staff:'Maria R., RN',clinical:true,minutes:10},
    ]},
  { id:'p2', name:'Robert Nguyen', dob:'07/28/1952', age:73, sex:'M', mrn:'CYP-3847',
    plan:'Medicare Advantage', risk:'High', provider:'Davis', last:'Jun 14',
    conditions:['Congestive Heart Failure (HFrEF)','Atrial Fibrillation','Hypertension'],
    medications:['Carvedilol 25mg BID','Furosemide 40mg daily','Apixaban 5mg BID','Lisinopril 5mg daily'],
    vitals:{bp:'128/76',hr:62,temp:'98.1°F',weight:'198 lbs',a1c:'N/A'},
    minutesThisMonth:28, lastCall:'Jun 14, 2026', ccmStatus:'ready',
    activities:[
      {date:'Jun 14',desc:'CHF monitoring — daily weight log review, edema assessment',staff:'Sandra K., LVN',clinical:true,minutes:28},
    ]},
  { id:'p3', name:'Linda Patel', dob:'11/04/1955', age:70, sex:'F', mrn:'CYP-2913',
    plan:'Medicare', risk:'Medium', provider:'Richard', last:'Jun 2',
    conditions:['COPD (GOLD Stage II)','Hyperlipidemia','Osteoarthritis'],
    medications:['Tiotropium inhaler daily','Albuterol PRN','Atorvastatin 20mg nightly','Acetaminophen 500mg TID'],
    vitals:{bp:'124/78',hr:74,temp:'97.9°F',weight:'142 lbs',a1c:'N/A'},
    minutesThisMonth:12, lastCall:'Jun 2, 2026', ccmStatus:'needs-call',
    activities:[
      {date:'Jun 2', desc:'Pharmacy coordination — inhaler refill and technique review',staff:'Sandra K., LVN',clinical:true,minutes:12},
    ]},
  { id:'p4', name:'James Kowalski', dob:'05/19/1944', age:82, sex:'M', mrn:'CYP-5541',
    plan:'Medicare', risk:'High', provider:'Sam', last:'Jun 12',
    conditions:['Coronary Artery Disease','Type 2 Diabetes Mellitus','Chronic Kidney Disease (Stage 3b)','Hypertension'],
    medications:['Aspirin 81mg daily','Atorvastatin 80mg nightly','Metoprolol 50mg BID','Metformin 500mg daily','Amlodipine 10mg daily'],
    vitals:{bp:'142/88',hr:68,temp:'98.2°F',weight:'189 lbs',a1c:'8.1%'},
    minutesThisMonth:62, lastCall:'Jun 12, 2026', ccmStatus:'ready',
    activities:[
      {date:'Jun 12',desc:'Monthly CCM call — CAD management, diabetes review, kidney monitoring',staff:'Maria R., RN',clinical:true,minutes:30},
      {date:'Jun 5', desc:'Cardiology follow-up coordination — appointment scheduling',staff:'Maria R., RN',clinical:true,minutes:20},
      {date:'May 30',desc:'Lab results review — eGFR, creatinine trending',staff:'Maria R., RN',clinical:true,minutes:12},
    ]},
  { id:'p5', name:'Dorothy Simmons', dob:'09/23/1950', age:75, sex:'F', mrn:'CYP-1876',
    plan:'Medicare Advantage', risk:'Medium', provider:'Richard', last:'May 20',
    conditions:['Hypertension','Hypothyroidism','Osteoporosis'],
    medications:['Amlodipine 10mg daily','Levothyroxine 75mcg daily','Alendronate 70mg weekly','Calcium+D3 daily'],
    vitals:{bp:'130/80',hr:72,temp:'98.0°F',weight:'155 lbs',a1c:'N/A'},
    minutesThisMonth:0, lastCall:'May 20, 2026', ccmStatus:'needs-call',
    activities:[]},
  { id:'p6', name:'Antonio Reyes', dob:'02/14/1958', age:68, sex:'M', mrn:'CYP-6204',
    plan:'Medicare', risk:'High', provider:'Davis', last:'Jun 11',
    conditions:['Type 2 Diabetes Mellitus','Hypertension','Hyperlipidemia','Peripheral Artery Disease'],
    medications:['Glipizide 10mg daily','Lisinopril 20mg daily','Rosuvastatin 40mg nightly','Clopidogrel 75mg daily','Cilostazol 100mg BID'],
    vitals:{bp:'136/84',hr:80,temp:'98.3°F',weight:'201 lbs',a1c:'8.4%'},
    minutesThisMonth:35, lastCall:'Jun 11, 2026', ccmStatus:'ready',
    activities:[
      {date:'Jun 11',desc:'Monthly CCM call — diabetes management, PAD foot care education',staff:'Sandra K., LVN',clinical:true,minutes:25},
      {date:'Jun 6', desc:'Medication reconciliation — clopidogrel refill',staff:'Sandra K., LVN',clinical:true,minutes:10},
    ]},
  { id:'p7', name:'Helen Crawford', dob:'12/08/1946', age:79, sex:'F', mrn:'CYP-3390',
    plan:'Medicare', risk:'Medium', provider:'Sam', last:'Jun 8',
    conditions:['Atrial Fibrillation','Hypertension','Mild Cognitive Impairment'],
    medications:['Warfarin 5mg daily','Metoprolol 25mg BID','Ramipril 5mg daily'],
    vitals:{bp:'126/74',hr:64,temp:'97.8°F',weight:'138 lbs',a1c:'N/A'},
    minutesThisMonth:18, lastCall:'Jun 8, 2026', ccmStatus:'in-progress',
    activities:[
      {date:'Jun 8', desc:'INR check follow-up — result review, dose adjustment notification',staff:'Maria R., RN',clinical:true,minutes:18},
    ]},
  { id:'p8', name:'Charles Brown', dob:'06/30/1953', age:72, sex:'M', mrn:'CYP-7712',
    plan:'Medicare Advantage', risk:'High', provider:'Richard', last:'Jun 13',
    conditions:['COPD (GOLD Stage III)','Lung Cancer (Remission, 2023)','Depression','Hypertension'],
    medications:['Symbicort 160/4.5 BID','Albuterol PRN','Sertraline 100mg daily','Amlodipine 5mg daily'],
    vitals:{bp:'132/80',hr:82,temp:'98.5°F',weight:'174 lbs',a1c:'N/A'},
    minutesThisMonth:54, lastCall:'Jun 13, 2026', ccmStatus:'ready',
    activities:[
      {date:'Jun 13',desc:'Monthly CCM call — COPD symptom monitoring, depression screen (PHQ-2)',staff:'Maria R., RN',clinical:true,minutes:30},
      {date:'Jun 7', desc:'Oncology follow-up coordination — imaging results',staff:'Maria R., RN',clinical:true,minutes:15},
      {date:'Jun 3', desc:'Mental health check-in — mood assessment, medication adherence',staff:'Maria R., RN',clinical:true,minutes:9},
    ]},
];

const TASKS = [];
const PROGRESS = [];
const DONE_SEED = [];
const ACTIVITY = [];
const CPT_RATES={'99490':62.71,'99439':47.34,'99487':132.93,'99489':68.02};
const CAP_META = {
  lab:{title:'Lab panels',desc:'Sapiens builds priced lab panels from visit notes — review and sign off.',cta:'New panel'},
  referral:{title:'Referrals',desc:'Drafted referral letters with the right records already attached.',cta:'New referral'},
  note:{title:'Visit notes',desc:'Structured SOAP notes generated from your visit recordings.',cta:'New note'},
  doc:{title:'Documents',desc:'Faxes and discharge summaries read and extracted into the chart.',cta:'Read a document'},
};

// ── Helpers ───────────────────────────────────────────────────────────────
const money = n => '$'+n.toFixed(2);
const initials = name => name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
const first = name => name.split(' ')[0];
const byId = id => PATIENTS.find(p=>p.id===id) || S.extraPatients.find(p=>p.id===id);
const typeLabel = t => ({lab:'Lab panel',note:'Visit note',referral:'Referral',doc:'Document',message:'Outreach'})[t];
const riskMeta = r => !r?{c:'var(--text-3)',s:'var(--panel-2)'}:r==='High'?{c:'var(--danger)',s:'var(--danger-soft)'}:r==='Moderate'?{c:'var(--ready)',s:'var(--ready-soft)'}:{c:'var(--good)',s:'var(--good-soft)'};

function showToast(msg){
  S.toast=msg; render();
  clearTimeout(S._tt);
  S._tt=setTimeout(()=>{S.toast='';render();},2600);
}

function liveTasks(){ return [...TASKS,...S.extraTasks].filter(t=>!S.approved.includes(t.id)); }

function vo(t){
  const p=byId(t.patient); const rm=riskMeta(p.risk);
  const o={
    id:t.id,type:t.type,typeLabel:typeLabel(t.type),title:t.title,summary:t.summary,at:t.at,urgent:!!t.urgent,
    sources:t.sources||[],did:t.did||[],srcCount:(t.sources||[]).length,
    patient:{id:p.id,name:p.name,first:first(p.name),initials:initials(p.name),
      line:p.age+' · '+p.sex+' · '+p.plan,riskColor:rm.c,riskSoft:rm.s},
    isLab:t.type==='lab',isNote:t.type==='note',isReferral:t.type==='referral',isDoc:t.type==='doc',isMessage:t.type==='message',
  };
  if(t.lab){
    const cp=t.lab.items.reduce((a,b)=>a+b.price,0),cm=t.lab.items.reduce((a,b)=>a+b.markup,0);
    o.lab={count:t.lab.items.length,combinedPrice:money(cp),combinedYour:money(cm),margin:money(cm-cp),reasons:t.lab.reasons,
      items:t.lab.items.map(i=>({name:i.name,cpt:i.cpt,cat:i.cat,priceF:money(i.price),markupF:money(i.markup)}))};
  }
  if(t.soap){o.soap=t.soap;o.suggestions=t.suggestions;}
  if(t.referral)o.referral=t.referral;
  if(t.doc){o.doc={source:t.doc.source,rows:t.doc.rows.map(r=>({field:r.field,value:r.value,conf:r.conf,confColor:r.conf==='high'?'var(--good)':'var(--ready)'}))}}
  if(t.message)o.message=t.message;
  return o;
}

// ── SVG Icons ─────────────────────────────────────────────────────────────
const I = {
  search:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
  home:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9.5 12 4l9 5.5"/><path d="M5 10v9h14v-9"/><path d="M9.5 19v-5h5v5"/></svg>`,
  patients:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M16 5.5a3 3 0 0 1 0 5.6"/><path d="M17 14.2c2 .6 3.5 2.3 3.5 4.8"/></svg>`,
  lab:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3h6"/><path d="M10 3v6.5L5.5 17a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9.5V3"/><path d="M7.5 14h9"/></svg>`,
  referral:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="9" r="2.4"/><path d="M6 8.4v7.2"/><path d="M15.7 9.6c-2.4 2-6.2 1.6-7.4 5.8"/></svg>`,
  note:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h4"/></svg>`,
  doc:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h8l4 4v8"/><path d="M14 3v4h4"/><circle cx="11" cy="16" r="3.2"/><path d="m15.5 20.5-2.2-2.2"/></svg>`,
  plus:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>`,
  back:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 5-7 7 7 7"/></svg>`,
  sun:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19"/></svg>`,
  moon:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5"/></svg>`,
  sapiens:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>`,
  check:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m5 12 5 5 9-11"/></svg>`,
  check15:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 12 5 5 9-11"/></svg>`,
  file:`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg>`,
  arrow:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  mic:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 19v3M9 22h6"/></svg>`,
  micOff:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="2" y1="2" x2="22" y2="22"/><path d="M18.89 13.23A7 7 0 0 0 19 12"/><path d="M5 10a7 7 0 0 0 12.66 3.76"/><rect x="9" y="2" width="6" height="8" rx="3"/><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"/><path d="M12 19v3M9 22h6"/></svg>`,
};

const MONO = "font-family:'JetBrains Mono',monospace";

// ── TaskCard ──────────────────────────────────────────────────────────────
function taskCard(t){
  const srcs = t.sources.map(s=>`<span style="font-size:11px;color:var(--text-3);border:1px solid var(--border);border-radius:6px;padding:3px 8px;white-space:nowrap;">${s}</span>`).join('');
  return `
  <div class="task-card" data-action="task:${t.id}" style="cursor:pointer;border:1px solid var(--border);background:var(--panel);border-radius:16px;padding:16px 18px;display:flex;flex-direction:column;gap:10px;transition:border-color .18s,background .18s,transform .18s;box-shadow:var(--shadow);">
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="width:7px;height:7px;border-radius:50%;background:var(--ready);box-shadow:0 0 0 4px var(--ready-soft);"></span>
      <span style="font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:var(--text-3);font-weight:700;">${t.typeLabel}</span>
      <span style="flex:1;"></span>
      ${t.urgent?`<span style="font-size:11px;font-weight:600;color:var(--ready);background:var(--ready-soft);padding:3px 9px;border-radius:999px;">Before noon</span>`:''}
      <span style="${MONO};font-size:12px;color:var(--text-3);">${t.at}</span>
    </div>
    <div style="font-size:16.5px;font-weight:600;color:var(--text);line-height:1.32;letter-spacing:-.01em;">${t.title}</div>
    <div style="font-size:13.5px;color:var(--text-2);line-height:1.5;">${t.summary}</div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:3px;">
      <span style="display:flex;align-items:center;gap:7px;padding:4px 11px 4px 4px;border-radius:999px;border:1px solid var(--border);background:var(--panel-2);">
        <span style="width:22px;height:22px;border-radius:50%;background:var(--accent-soft);color:var(--accent);font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;">${t.patient.initials}</span>
        <span style="font-size:12.5px;font-weight:600;color:var(--text);">${t.patient.name}</span>
        <span style="font-size:11.5px;color:var(--text-3);">${t.patient.line}</span>
      </span>
      <span style="flex:1;"></span>
      ${srcs}
      <span style="font-size:12px;font-weight:700;color:var(--accent);display:flex;align-items:center;gap:3px;white-space:nowrap;">Review →</span>
    </div>
  </div>`;
}

// ── Memory chip helper (reused across overlays) ───────────────────────────
function memTag(section,name,action){
  return `<div data-action="${action}" style="display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:8px;border:1px solid var(--accent-line);background:var(--accent-soft);cursor:pointer;margin-bottom:16px;">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
    <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--accent);">Memory · ${section}</span>
    <span style="width:1px;height:12px;background:var(--accent-line);"></span>
    <span style="font-size:12.5px;font-weight:600;color:var(--text);">${name}</span>
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
  </div>`;
}

// ── Sidebar ───────────────────────────────────────────────────────────────
function renderSidebar(ma,isDark){
  const nb=(key)=>{
    const active=S.view===key
      ||(key==='patients'&&S.view==='patients'&&!S.workItem)
      ||(key==='patients'&&S.view==='patient'&&!S.workItem)
      ||(key==='followup'&&S.workItem==='followup'&&(S.view==='patients'||S.view==='patient'))
      ||(key==='careplan'&&S.workItem==='careplan'&&(S.view==='patients'||S.view==='patient'))
      ||(key===S.capType&&S.view==='cap')
      ||(key==='mem-templates'&&S.view==='mem');
    return `background:${active?'var(--accent-soft)':'transparent'};color:${active?'var(--text)':'var(--text-2)'}`;
  };
  const clinic=currentClinic();
  const dropItems=CLINICS.map(c=>`
    <button data-action="clinic-select:${c.id}"
      style="display:flex;align-items:center;gap:10px;width:100%;padding:8px 11px;border-radius:9px;border:none;background:${c.id===S.clinic?'var(--accent-soft)':'transparent'};text-align:left;cursor:pointer;transition:background .12s;">
      <span style="width:20px;height:20px;border-radius:5px;background:${c.id===S.clinic?'var(--accent)':'var(--panel-2)'};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:${c.id===S.clinic?'#fff':'var(--text-3)'};flex:none;">${c.short[0]}</span>
      <div style="flex:1;min-width:0;">
        <div style="font-size:12.5px;font-weight:${c.id===S.clinic?'700':'500'};color:${c.id===S.clinic?'var(--text)':'var(--text-2)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.short}</div>
        <div style="font-size:10.5px;color:var(--text-3);">${c.emr}</div>
      </div>
      ${c.id===S.clinic?`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5"><path d="m5 12 5 5 9-11"/></svg>`:''}
    </button>`).join('');

  return `
  <div style="display:flex;flex-direction:column;gap:6px;padding:2px 0 10px;">
    <div style="display:flex;align-items:center;gap:9px;padding:2px 4px;">
      <span style="width:28px;height:28px;border-radius:8px;background:linear-gradient(150deg,#7c5cdb,#4c2d9c);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:12px;color:#fff;flex:none;letter-spacing:-.02em;">C</span>
      <span style="font-size:12px;font-weight:800;letter-spacing:-.01em;line-height:1.25;color:var(--text);">Chronic Care<br>Management Solutions</span>
    </div>
    <!-- Clinic selector -->
    <div style="position:relative;">
      <button data-action="clinic-drop"
        style="display:flex;align-items:center;gap:8px;width:100%;padding:7px 10px;border-radius:9px;border:1px solid var(--border);background:var(--panel);cursor:pointer;transition:border-color .15s;">
        <span style="width:20px;height:20px;border-radius:5px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:var(--accent);flex:none;">${clinic.label[0]}</span>
        <span style="flex:1;font-size:12px;font-weight:600;color:var(--text);text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${clinic.short||clinic.label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2.5" style="flex:none;transform:${S.clinicDrop?'rotate(180deg)':'none'};transition:transform .2s;"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      ${S.clinicDrop?`
      <div style="position:absolute;top:calc(100% + 6px);left:0;right:0;z-index:99;background:var(--bg);border:1px solid var(--border);border-radius:12px;box-shadow:0 8px 28px rgba(13,27,77,.18);padding:5px;animation:sap-up .15s ease;" id="clinic-dropdown">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);padding:5px 10px 7px;">Clinics</div>
        ${dropItems}
      </div>`:''}
    </div>
  </div>
  <div style="display:flex;flex-direction:column;gap:3px;">
    <div style="font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--text-3);padding:0 8px 7px;">Workspace</div>
    <button class="nav-btn" data-action="go:today" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('today')};transition:background .15s;">${I.home} Home</button>
    <button class="nav-btn" data-action="go:patients" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('patients')};transition:background .15s;">${I.patients} Patients</button>
  </div>
  <div style="display:flex;flex-direction:column;gap:3px;">
    <div style="font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--text-3);padding:0 8px 7px;">Work Items</div>
    <button class="nav-btn" data-action="work:followup" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('followup')};transition:background .15s;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
      Followup Call
    </button>
    <button class="nav-btn" data-action="work:careplan" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('careplan')};transition:background .15s;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3v4h4"/><path d="M6 3h8l4 4v14H6z"/><path d="M9 12h6M9 16h4"/></svg>
      Care Plan
    </button>
  </div>
  <div style="display:flex;flex-direction:column;gap:3px;">
    <div style="font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--text-3);padding:0 8px 7px;">Memory</div>
    <button class="nav-btn" data-action="mem:templates" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('mem-templates')};transition:background .15s;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><path d="M17 13v8M13 17h8"/></svg>
      Templates
    </button>
  </div>
  <div style="margin-top:auto;display:flex;align-items:center;gap:10px;padding:0 4px;">
    <span style="width:30px;height:30px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:800;">IV</span>
    <div style="flex:1;min-width:0;">
      <div style="font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Ivan</div>
      <div style="font-size:11px;color:var(--text-3);">${clinic.short}</div>
    </div>
    <button class="theme-btn" data-action="theme" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--text-2);transition:border-color .15s;" title="Toggle theme">
      ${isDark?I.sun:I.moon}
    </button>
  </div>`;
}

// ── New-task dropdown ─────────────────────────────────────────────────────
const CAP_ITEMS = [
  {type:'lab',  label:'Lab panel',   desc:'Build a priced lab panel from a visit note', icon:'lab'},
  {type:'referral', label:'Referral', desc:'Draft a referral letter with records attached', icon:'referral'},
  {type:'note', label:'Visit note',  desc:'Generate a SOAP note from a visit recording',  icon:'note'},
  {type:'doc',  label:'Document',    desc:'Read a fax or discharge summary',               icon:'doc'},
];

function renderNewTaskDropdown(){
  if(!S.newTaskOpen) return '';
  const items=CAP_ITEMS.map((c,i)=>`
    <button class="nt-item" data-action="cap:${c.type}" style="display:flex;align-items:center;gap:13px;width:100%;padding:11px 14px;border-radius:11px;text-align:left;transition:background .12s;animation:nt-drop .22s cubic-bezier(.22,1,.36,1) both;animation-delay:${i*45}ms;">
      <span style="width:36px;height:36px;border-radius:10px;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;flex:none;">${I[c.icon]}</span>
      <span style="flex:1;min-width:0;">
        <span style="display:block;font-size:13.5px;font-weight:600;color:var(--text);">${c.label}</span>
        <span style="display:block;font-size:12px;color:var(--text-3);margin-top:1px;">${c.desc}</span>
      </span>
    </button>`).join('');
  return `
  <div id="nt-dropdown" style="position:absolute;top:calc(100% + 8px);right:0;width:300px;background:var(--panel);border:1px solid var(--border-2);border-radius:14px;box-shadow:0 20px 50px -12px rgba(0,0,0,.3);padding:7px;z-index:100;overflow:hidden;">
    ${items}
  </div>`;
}

// ── Header ────────────────────────────────────────────────────────────────
function renderHeader(ma){
  if(S.view==='today') return '';
  let crumb='',showBack=false,backLabel='',backAction='go:today';
  if(S.view==='patients'){crumb='Patients';}
  else if(S.view==='patient'){
    const p=byId(S.patientId);crumb=p?p.name:'Patient';showBack=true;backLabel='Patients';backAction='go:patients';
  }
  else if(S.view==='task'){crumb='Review';showBack=true;backLabel='Home';backAction='go:today';}
  else if(S.view==='cap'){crumb=(CAP_META[S.capType]||{}).title||'';}
  return `
  <header style="height:62px;flex:none;display:flex;align-items:center;padding:0 26px;gap:14px;position:sticky;top:0;background:var(--bg);z-index:6;">
    ${showBack?`<button class="back-btn" data-action="${backAction}" style="display:flex;align-items:center;gap:5px;font-size:13.5px;color:var(--text-2);font-weight:600;transition:color .15s;">${I.back}${backLabel}</button><span style="color:var(--text-3);">/</span><span style="font-size:14.5px;font-weight:600;">${crumb}</span>`:''}
    <span style="flex:1;"></span>
  </header>`;
}

// ── Referral overlay ──────────────────────────────────────────────────────
const REF_DOC_NAMES = [
  'discharge_summary.pdf','lab_results_06_2026.pdf','echo_report.pdf',
  'prior_authorization.pdf','medication_list.pdf','radiology_report.pdf',
  'office_notes_06_2026.pdf','ekg_strip.pdf',
];

function sampleReferralLetter(specialist,reason,patient,docs){
  const sp=specialist||'the appropriate specialist';
  const pt=patient||'the patient';
  const docList=docs.length
    ?`Attached for your review: ${docs.join(', ')}.`
    :'Please see the patient\'s chart for supporting records.';
  return `Dear ${sp},

I am writing to refer ${pt} for your evaluation and management. ${reason?reason+'.':''}

${pt} has been under my care at Archway Family Medicine. Based on my recent assessment, I believe a specialist consultation is warranted to further evaluate and optimize their care. The clinical picture warrants your expertise, and I would greatly appreciate your input regarding diagnosis, workup, and ongoing management recommendations.

${docList} Please review the enclosed records at your discretion. I have included all relevant clinical documentation to assist in your evaluation.

If you require any additional information or would like to discuss this case prior to the appointment, please do not hesitate to contact our office directly. We will coordinate with your scheduling team to ensure a timely referral appointment.

Thank you for your continued collaboration in the care of our shared patients.

Sincerely,
Ivan
Cypress Physicians Association`;
}

function renderReferral(){
  if(!S.refOpen) return '';

  // ── Review: generated letter ────────────────────────────────────────────
  if(S.refStep==='review'){
    const letter=sampleReferralLetter(S.refSpecialist,S.refReason,S.refPatient,S.refDocs);
    return `
    <div style="position:fixed;inset:0;z-index:40;background:rgba(13,27,77,.18);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;" id="ref-overlay">
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 24px 70px rgba(13,27,77,.22);width:min(680px,96vw);height:min(720px,92vh);display:flex;flex-direction:column;overflow:hidden;">
        <div style="display:flex;align-items:center;padding:20px 28px;border-bottom:1px solid var(--border);flex:none;">
          <button data-action="ref-back" style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-3);font-weight:600;cursor:pointer;background:none;border:none;margin-right:14px;">${I.back.replace('stroke="currentColor"','stroke="var(--text-3)"')} Back</button>
          <div>
            <div style="display:flex;align-items:center;gap:9px;">
              <span style="font-size:17px;font-weight:800;letter-spacing:-.02em;color:var(--text);">Referral Letter</span>
              <span style="font-size:11px;padding:3px 9px;border-radius:20px;background:var(--good-soft);color:var(--good);font-weight:700;">Generated</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px;">${S.refSpecialist||'Specialist'} · ${S.refDocs.length} document${S.refDocs.length!==1?'s':''} attached</div>
          </div>
          <span style="flex:1;"></span>
          <button data-action="ref-assign" style="padding:10px 22px;border-radius:11px;background:var(--accent);color:#fff;font-size:13.5px;font-weight:700;cursor:pointer;border:none;box-shadow:0 4px 16px rgba(91,63,160,.28);margin-right:10px;">Assign</button>
          <button data-action="ref-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;">×</button>
        </div>
        <div style="flex:1;overflow-y:auto;padding:28px 32px;">
          ${memTag('Templates','Patient Information Scribe Template','tmpl-open:referral-scribe')}
          <div style="font-size:14.5px;color:var(--text);line-height:1.9;white-space:pre-line;">${letter}</div>
        </div>
      </div>
    </div>`;
  }

  // ── Compose screen ──────────────────────────────────────────────────────
  const canGenerate=!!(S.refSpecialist.trim()&&S.refReason.trim());
  const docRows=S.refDocs.map((f,i)=>`
    <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border:1px solid var(--border);border-radius:9px;background:var(--panel);">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg>
      <span style="flex:1;font-size:13px;color:var(--text);">${f}</span>
      <button data-action="ref-remove-doc:${i}" style="color:var(--text-3);font-size:15px;cursor:pointer;background:none;border:none;padding:0 2px;line-height:1;">×</button>
    </div>`).join('');

  const inputStyle='width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:11px;background:var(--panel);color:var(--text);font-size:13.5px;font-family:inherit;';

  return `
  <div style="position:fixed;inset:0;z-index:40;background:rgba(13,27,77,.18);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;" id="ref-overlay">
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 24px 70px rgba(13,27,77,.22);width:min(620px,94vw);display:flex;flex-direction:column;overflow:hidden;max-height:92vh;">
      <div style="display:flex;align-items:center;padding:24px 28px 18px;border-bottom:1px solid var(--border);flex:none;">
        <div style="flex:1;">
          <div style="font-size:21px;font-weight:800;letter-spacing:-.025em;color:var(--text);">Draft Referral</div>
          <div style="font-size:13px;color:var(--text-3);margin-top:3px;">Attach supporting documents and Sapiens will generate the referral letter.</div>
        </div>
        <button data-action="ref-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;">×</button>
      </div>
      <div style="overflow-y:auto;padding:24px 28px 28px;display:flex;flex-direction:column;gap:18px;">

        <div style="display:flex;gap:14px;">
          <div style="flex:1;">
            <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:7px;">Referring to</div>
            <input id="ref-specialist-input" value="${S.refSpecialist}" placeholder="e.g. Cardiology, Neurology…" style="${inputStyle}"/>
          </div>
          <div style="flex:1;">
            <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:7px;">Patient</div>
            <input id="ref-patient-input" value="${S.refPatient}" placeholder="Patient name" style="${inputStyle}"/>
          </div>
        </div>

        <div>
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:7px;">Reason / Clinical question</div>
          <textarea id="ref-reason-input" placeholder="Describe the reason for referral and clinical question…"
            style="${inputStyle}resize:vertical;min-height:90px;line-height:1.55;">${S.refReason}</textarea>
        </div>

        <div>
          <div style="font-size:11.5px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:9px;">Attached Documents</div>
          <div style="display:flex;flex-direction:column;gap:7px;">
            ${docRows}
            <button data-action="ref-add-doc"
              style="display:flex;align-items:center;gap:8px;padding:9px 14px;border-radius:9px;border:1.5px dashed var(--border);background:transparent;color:var(--text-3);font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;">
              ${I.plus} Add document
            </button>
          </div>
        </div>

        <button data-action="ref-generate"
          style="width:100%;padding:14px;border-radius:13px;border:none;font-size:14px;font-weight:700;letter-spacing:-.01em;transition:all .2s;cursor:${canGenerate?'pointer':'default'};
            background:${canGenerate?'#4c2d9c':'var(--panel-2)'};
            color:${canGenerate?'#fff':'var(--text-3)'};">
          Generate Referral
        </button>
      </div>
    </div>
  </div>`;
}

// ── Document Processor overlay ────────────────────────────────────────────
const SAMPLE_DOC_NOTE = `This is a hospital discharge summary for James M. Patterson (DOB 04/15/1962, MRN 4829301), admitted on June 20, 2026 and discharged on June 24, 2026 following a 4-day stay.

The patient was admitted with acute chest pain to rule out ACS. During the admission, coronary angiography revealed 70% stenosis of the left anterior descending artery. He subsequently underwent percutaneous coronary intervention with placement of a drug-eluting stent to the LAD on June 22. Echocardiography performed during admission demonstrated a left ventricular ejection fraction of 45%. The final discharge diagnoses were NSTEMI, uncontrolled hypertension, and poorly controlled Type 2 Diabetes with an HbA1c of 9.2%.

The patient is being discharged on aspirin 81 mg daily, ticagrelor 90 mg twice daily for 12 months, atorvastatin 80 mg nightly, metoprolol succinate 50 mg daily, lisinopril 10 mg daily, and metformin 1000 mg twice daily. It is critical that dual antiplatelet therapy not be discontinued without cardiology approval.

Follow-up has been arranged with cardiology within one week, primary care within two weeks, and a cardiac rehabilitation referral has been placed. A repeat echocardiogram is recommended in 6 weeks to reassess ejection fraction. Given the patient's poorly controlled diabetes, an endocrinology referral should also be considered.`;

function renderDocProcessor(){
  if(!S.docOpen) return '';

  // ── Review screen — plain note ──────────────────────────────────────────
  if(S.docStep==='review'){
    return `
    <div style="position:fixed;inset:0;z-index:40;background:rgba(13,27,77,.18);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;" id="doc-overlay">
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 24px 70px rgba(13,27,77,.22);width:min(680px,96vw);height:min(720px,92vh);display:flex;flex-direction:column;overflow:hidden;">
        <div style="display:flex;align-items:center;padding:20px 28px;border-bottom:1px solid var(--border);flex:none;">
          <button data-action="doc-back" style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-3);font-weight:600;cursor:pointer;background:none;border:none;margin-right:14px;">${I.back.replace('stroke="currentColor"','stroke="var(--text-3)"')} Back</button>
          <div>
            <div style="display:flex;align-items:center;gap:9px;">
              <span style="font-size:17px;font-weight:800;letter-spacing:-.02em;color:var(--text);">Document Summary</span>
              <span style="font-size:11px;padding:3px 9px;border-radius:20px;background:var(--good-soft);color:var(--good);font-weight:700;">Processed</span>
            </div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px;">${S.docFileName||'document.pdf'}</div>
          </div>
          <span style="flex:1;"></span>
          <button data-action="doc-assign" style="padding:10px 22px;border-radius:11px;background:var(--accent);color:#fff;font-size:13.5px;font-weight:700;cursor:pointer;border:none;box-shadow:0 4px 16px rgba(91,63,160,.28);margin-right:10px;">Assign</button>
          <button data-action="doc-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;">×</button>
        </div>
        <div style="flex:1;overflow-y:auto;padding:28px 32px;">
          <div style="font-size:14.5px;color:var(--text);line-height:1.85;white-space:pre-line;">${SAMPLE_DOC_NOTE}</div>
        </div>
      </div>
    </div>`;
  }

  // ── Upload screen ──────────────────────────────────────────────────────
  const hasFile=!!S.docFileName;
  return `
  <div style="position:fixed;inset:0;z-index:40;background:rgba(13,27,77,.18);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;" id="doc-overlay">
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 24px 70px rgba(13,27,77,.22);width:min(580px,94vw);display:flex;flex-direction:column;overflow:hidden;">
      <div style="display:flex;align-items:center;padding:24px 28px 18px;border-bottom:1px solid var(--border);">
        <div style="flex:1;">
          <div style="font-size:21px;font-weight:800;letter-spacing:-.025em;color:var(--text);">Read Document</div>
          <div style="font-size:13px;color:var(--text-3);margin-top:3px;">Drop a fax, referral, or discharge summary and Sapiens will extract and summarize it.</div>
        </div>
        <button data-action="doc-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;">×</button>
      </div>
      <div style="padding:28px;display:flex;flex-direction:column;gap:18px;">
        <!-- drop zone -->
        <div id="doc-drop-zone" data-action="doc-pick"
          style="border:2px dashed ${S.docDragOver?'var(--accent)':'var(--border)'};border-radius:18px;padding:40px 20px;text-align:center;cursor:pointer;background:${S.docDragOver?'var(--accent-soft)':'var(--panel-2)'};transition:all .15s;">
          ${hasFile
            ? `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--good)" stroke-width="1.5"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h4"/></svg>
                <span style="font-size:15px;font-weight:700;color:var(--text);">${S.docFileName}</span>
                <span style="font-size:12px;color:var(--good);">Ready to process</span>
              </div>`
            : `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="1.4"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
                <span style="font-size:15px;font-weight:600;color:var(--text);">Drop PDF here</span>
                <span style="font-size:12.5px;color:var(--text-3);">or click to browse — fax, referral, discharge summary</span>
              </div>`
          }
        </div>
        <button data-action="doc-process"
          style="width:100%;padding:14px;border-radius:13px;border:none;font-size:14px;font-weight:700;letter-spacing:-.01em;cursor:${hasFile?'pointer':'default'};transition:all .2s;
            background:${hasFile?'#4c2d9c':'var(--panel-2)'};
            color:${hasFile?'#fff':'var(--text-3)'};">
          Process Document
        </button>
      </div>
    </div>
  </div>`;
}

// ── Visit Note Recorder overlay ───────────────────────────────────────────
const SAMPLE_TRANSCRIPT = `Dr. Cho: Good morning. How have you been feeling since your last visit?

Patient: Honestly not great. I've had this persistent headache for about three days now, and my neck has been really stiff. It's making it hard to sleep.

Dr. Cho: I see. On a scale of 1 to 10, how would you rate the pain?

Patient: I'd say about a 7. Some moments it spikes higher. I've also been nauseous — I threw up once yesterday morning.

Dr. Cho: Have you noticed any fever, sensitivity to light or sound?

Patient: Yeah, lights have been really bothering me. And loud sounds too. I haven't taken my temperature but I've felt warm.

Dr. Cho: Okay. Let me do a quick exam. Can you follow my finger? ... BP is 128 over 82, temperature 99.4°F. I'm noticing some neck rigidity on flexion. Pupils equal and reactive.

Patient: Is it serious?

Dr. Cho: We need to rule out a few things. I'm going to order some labs and we'll go from there. Any recent travel or sick contacts?

Patient: My coworker was out sick last week with something similar.`;

const SAMPLE_SOAP = {
  S: `Patient presents with a 3-day history of progressive headache (7/10 intensity), neck stiffness, nausea with one episode of vomiting, photophobia, and phonophobia. Reports feeling febrile. Recent sick contact at workplace with similar symptoms. Difficulty sleeping due to pain.`,
  O: `Vitals: BP 128/82 mmHg, Temp 99.4°F, HR 88 bpm.\nNeurological: PERRL, EOM intact, no focal deficits.\nMusculoskeletal: Nuchal rigidity present on passive flexion.\nGeneral: Alert and oriented x3, mild distress.`,
  A: `1. Headache with meningismus — rule out viral vs. bacterial meningitis\n2. Fever with neck stiffness — consider LP to assess CSF\n3. Photophobia and phonophobia consistent with meningeal irritation`,
  P: `1. Order CT Head without contrast — prior to LP to rule out mass effect\n2. Lumbar puncture pending CT clearance\n3. CBC, BMP, Blood cultures x2\n4. Start empirical Ceftriaxone 2g IV q12h and Dexamethasone 0.15 mg/kg IV pending cultures\n5. IV fluids for hydration\n6. Strict I&O, neuro checks q2h\n7. Infectious disease consult\n8. Patient and family counseled on diagnosis workup`,
};

function renderNoteRecorder(){
  if(!S.noteOpen) return '';
  const today=new Date().toLocaleDateString('en-US',{month:'2-digit',day:'2-digit',year:'numeric'});
  const date=S.noteDate||today;
  const startedLabel=S.noteStartedAt
    ?new Date(S.noteStartedAt).toLocaleString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'})
    :'';

  // ── Review screen ─────────────────────────────────────────────────────────
  if(S.noteStep==='review'){
    const soapSection=(label,color,text)=>`
      <div style="margin-bottom:18px;">
        <div style="display:inline-flex;align-items:center;gap:7px;padding:4px 11px;border-radius:20px;background:${color}22;margin-bottom:8px;">
          <span style="font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:${color};">${label}</span>
        </div>
        <div style="font-size:13.5px;color:var(--text);line-height:1.7;white-space:pre-line;">${text}</div>
      </div>`;
    return `
    <div style="position:fixed;inset:0;z-index:40;background:rgba(13,27,77,.18);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;" id="note-overlay">
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 24px 70px rgba(13,27,77,.22);width:min(1060px,96vw);height:min(780px,92vh);display:flex;flex-direction:column;overflow:hidden;">
        <!-- header -->
        <div style="display:flex;align-items:center;padding:20px 28px;border-bottom:1px solid var(--border);flex:none;">
          <button data-action="note-back" style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-3);font-weight:600;cursor:pointer;background:none;border:none;margin-right:14px;">${I.back.replace('stroke="currentColor"','stroke="var(--text-3)"')} Back</button>
          <div>
            <div style="font-size:18px;font-weight:800;letter-spacing:-.02em;color:var(--text);">Visit Note${S.notePatient?' — '+S.notePatient:''}</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px;">${date}</div>
          </div>
          <span style="flex:1;"></span>
          <button data-action="note-assign" style="display:flex;align-items:center;gap:8px;padding:10px 22px;border-radius:11px;background:var(--accent);color:#fff;font-size:13.5px;font-weight:700;cursor:pointer;border:none;box-shadow:0 4px 16px rgba(91,63,160,.28);margin-right:10px;">Assign</button>
          <button data-action="note-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;">×</button>
        </div>
        <!-- two-column body -->
        <div style="display:flex;flex:1;min-height:0;">
          <!-- left: raw transcript -->
          <div style="flex:1;min-width:0;border-right:1px solid var(--border);display:flex;flex-direction:column;">
            <div style="padding:14px 22px;border-bottom:1px solid var(--border);flex:none;">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Raw Transcript</span>
            </div>
            <div style="flex:1;overflow-y:auto;padding:20px 22px;">
              <div style="font-size:13.5px;line-height:1.85;color:var(--text-2);white-space:pre-line;">${SAMPLE_TRANSCRIPT}</div>
            </div>
          </div>
          <!-- right: SOAP note -->
          <div style="flex:1;min-width:0;display:flex;flex-direction:column;">
            <div style="padding:14px 22px;border-bottom:1px solid var(--border);flex:none;display:flex;align-items:center;gap:10px;">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Visit Note</span>
              <span style="font-size:11px;padding:3px 9px;border-radius:20px;background:var(--good-soft);color:var(--good);font-weight:700;">Generated</span>
            </div>
            <div style="flex:1;overflow-y:auto;padding:20px 22px;">
              ${memTag('Templates','Note Summary Template','tmpl-open:note-summary')}
              ${soapSection('Subjective','#5b3fa0',SAMPLE_SOAP.S)}
              ${soapSection('Objective','#267a55',SAMPLE_SOAP.O)}
              ${soapSection('Assessment','#b07720',SAMPLE_SOAP.A)}
              ${soapSection('Plan','#3060b8',SAMPLE_SOAP.P)}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  // ── Record screen ─────────────────────────────────────────────────────────
  return `
  <div style="position:fixed;inset:0;z-index:40;background:rgba(13,27,77,.18);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;" id="note-overlay">
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 24px 70px rgba(13,27,77,.22);width:min(660px,94vw);display:flex;flex-direction:column;overflow:hidden;">
      <div style="display:flex;align-items:center;padding:24px 28px 18px;border-bottom:1px solid var(--border);">
        <div style="flex:1;">
          <div style="font-size:21px;font-weight:800;letter-spacing:-.025em;color:var(--text);">Visit Note</div>
          <div style="font-size:13px;color:var(--text-3);margin-top:3px;">Record a patient visit and generate a structured SOAP note.</div>
        </div>
        <button data-action="note-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex:none;">×</button>
      </div>
      <div style="padding:24px 28px 28px;display:flex;flex-direction:column;gap:20px;">
        <div style="display:flex;gap:14px;">
          <div style="flex:1;">
            <div style="font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Patient Name</div>
            <input id="note-patient-input" value="${S.notePatient}" placeholder="e.g. Jane Smith"
              style="width:100%;padding:12px 15px;border:1.5px solid var(--border);border-radius:12px;background:var(--panel);color:var(--text);font-size:14px;font-family:inherit;"/>
          </div>
          <div style="width:180px;flex:none;">
            <div style="font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Date</div>
            <input id="note-date-input" value="${date}" placeholder="MM/DD/YYYY"
              style="width:100%;padding:12px 15px;border:1.5px solid var(--border);border-radius:12px;background:var(--panel);color:var(--text);font-size:14px;font-family:inherit;"/>
          </div>
        </div>
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;">Visit Recording</div>
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
            <button data-action="note-toggle-record"
              style="display:flex;align-items:center;gap:9px;padding:11px 20px;border-radius:50px;font-size:13.5px;font-weight:700;cursor:pointer;border:none;
                background:${S.noteRecording?'#c0392b':'#4c2d9c'};color:#fff;
                box-shadow:${S.noteRecording?'0 4px 18px rgba(192,57,43,.35)':'0 4px 18px rgba(76,45,156,.30)'};">
              ${S.noteRecording?I.micOff.replace('stroke="currentColor"','stroke="#fff"'):I.mic.replace('stroke="currentColor"','stroke="#fff"')}
              ${S.noteRecording?'Stop Recording':'Start Recording'}
            </button>
            ${S.noteRecording
              ?`<div style="display:flex;align-items:center;gap:8px;"><span class="pulse" style="width:8px;height:8px;border-radius:50%;background:#e74c3c;flex:none;"></span><span style="font-size:13px;font-weight:600;color:#e74c3c;">Recording…</span><span style="font-size:12px;color:var(--text-3);margin-left:4px;">Started ${startedLabel}</span></div>`
              :startedLabel?`<span style="font-size:12.5px;color:var(--text-3);">Stopped at ${startedLabel}</span>`:''
            }
          </div>
          <div style="border:1.5px dashed var(--border);border-radius:14px;padding:22px;min-height:100px;background:var(--panel-2);display:flex;align-items:center;justify-content:center;">
            ${S.noteRecording
              ?`<span style="font-size:13.5px;color:var(--text-3);font-style:italic;" class="pulse-slow">Listening…</span>`
              :`<span style="font-size:13.5px;color:var(--text-3);">${S.noteStartedAt?'Recording complete. Ready to generate.':'Press Start Recording to begin.'}</span>`
            }
          </div>
        </div>
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Comments</div>
          <textarea id="note-comment-input" placeholder="Add any context or comments while recording."
            style="width:100%;padding:12px 15px;border:1.5px solid var(--border);border-radius:12px;background:var(--panel);color:var(--text);font-size:13.5px;font-family:inherit;resize:vertical;min-height:80px;line-height:1.55;">${S.noteComment}</textarea>
        </div>
        <button data-action="note-generate"
          style="width:100%;padding:14px;border-radius:13px;border:none;font-size:14px;font-weight:700;letter-spacing:-.01em;transition:all .2s;cursor:${S.noteStartedAt&&!S.noteRecording?'pointer':'default'};
            background:${S.noteStartedAt&&!S.noteRecording?'var(--accent)':'var(--panel-2)'};
            color:${S.noteStartedAt&&!S.noteRecording?'#fff':'var(--text-3)'};">
          Generate Visit Note
        </button>
      </div>
    </div>
  </div>`;
}

// ── Lab Test Search data & overlay ───────────────────────────────────────
const LAB_TESTS = [
  {id:1,  name:'RPR',                     cat:'6072',  cpt:'86592', vendor:'Labcorp', price:1.63,  markup:1.79,  fav:true},
  {id:2,  name:'Aldolase',                cat:'2030',  cpt:'82085', vendor:'Labcorp', price:2.00,  markup:2.20,  fav:true},
  {id:3,  name:'Calcium',                 cat:'1016',  cpt:'82310', vendor:'Labcorp', price:2.00,  markup:2.20,  fav:true},
  {id:4,  name:'Creatinine, Urine',       cat:'13672', cpt:'82570', vendor:'Labcorp', price:2.00,  markup:2.20,  fav:true},
  {id:5,  name:'GGT',                     cat:'1958',  cpt:'82977', vendor:'Labcorp', price:2.00,  markup:2.20,  fav:true},
  {id:6,  name:'LDH',                     cat:'1115',  cpt:'83615', vendor:'Labcorp', price:2.00,  markup:2.20,  fav:true},
  {id:7,  name:'Phosphorus',              cat:'1024',  cpt:'84100', vendor:'Labcorp', price:2.00,  markup:2.20,  fav:true},
  {id:8,  name:'Comprehensive Metabolic Panel (CMP)', cat:'322', cpt:'80053', vendor:'Labcorp', price:4.90, markup:5.39, fav:false},
  {id:9,  name:'Complete Blood Count (CBC)', cat:'5', cpt:'85025', vendor:'Labcorp', price:3.95, markup:4.35, fav:false},
  {id:10, name:'HbA1c',                   cat:'496',   cpt:'83036', vendor:'Labcorp', price:6.50,  markup:7.15,  fav:false},
  {id:11, name:'TSH',                     cat:'899',   cpt:'84443', vendor:'Labcorp', price:7.20,  markup:7.92,  fav:false},
  {id:12, name:'Lipid Panel',             cat:'7600',  cpt:'80061', vendor:'Labcorp', price:5.60,  markup:6.16,  fav:false},
  {id:13, name:'Urinalysis, Complete',    cat:'5463',  cpt:'81001', vendor:'Labcorp', price:3.50,  markup:3.85,  fav:false},
  {id:14, name:'Vitamin D, 25-OH',        cat:'17306', cpt:'82306', vendor:'Labcorp', price:13.50, markup:14.85, fav:false},
  {id:15, name:'PSA, Total',              cat:'716',   cpt:'86316', vendor:'Labcorp', price:7.50,  markup:8.25,  fav:false},
  {id:16, name:'Ferritin',               cat:'457',   cpt:'82728', vendor:'Labcorp', price:6.20,  markup:6.82,  fav:false},
  {id:17, name:'Iron & TIBC',             cat:'7573',  cpt:'83540', vendor:'Labcorp', price:5.40,  markup:5.94,  fav:false},
  {id:18, name:'Uric Acid',              cat:'905',   cpt:'84550', vendor:'Labcorp', price:2.80,  markup:3.08,  fav:false},
  {id:19, name:'Magnesium',              cat:'622',   cpt:'83735', vendor:'Labcorp', price:2.90,  markup:3.19,  fav:false},
  {id:20, name:'Prothrombin Time (PT/INR)',cat:'9927', cpt:'85610', vendor:'Labcorp', price:4.20,  markup:4.62,  fav:false},
  {id:21, name:'hsCRP',                  cat:'16814', cpt:'86141', vendor:'Labcorp', price:8.10,  markup:8.91,  fav:false},
  {id:22, name:'Testosterone, Total',    cat:'4226',  cpt:'84403', vendor:'Labcorp', price:11.50, markup:12.65, fav:false},
  {id:23, name:'Estradiol',              cat:'4021',  cpt:'82670', vendor:'Labcorp', price:12.80, markup:14.08, fav:false},
  {id:24, name:'Folate, Serum',          cat:'8061',  cpt:'82746', vendor:'Labcorp', price:7.30,  markup:8.03,  fav:false},
  {id:25, name:'Vitamin B12',            cat:'927',   cpt:'82607', vendor:'Labcorp', price:7.30,  markup:8.03,  fav:false},
  {id:26, name:'Hepatic Function Panel', cat:'7799',  cpt:'80076', vendor:'Labcorp', price:4.80,  markup:5.28,  fav:false},
  {id:27, name:'Hemoglobin A1c w/ eAG', cat:'11363', cpt:'83036', vendor:'Labcorp', price:6.50,  markup:7.15,  fav:false},
  {id:28, name:'Creatinine, Serum',      cat:'1012',  cpt:'82565', vendor:'Labcorp', price:2.00,  markup:2.20,  fav:false},
  {id:29, name:'BUN (Blood Urea Nitrogen)',cat:'1001', cpt:'84520', vendor:'Labcorp', price:2.00,  markup:2.20,  fav:false},
  {id:30, name:'Potassium',             cat:'1022',  cpt:'84132', vendor:'PathGroup', price:2.00, markup:2.20,  fav:false},
  {id:31, name:'Sodium',               cat:'4140',  cpt:'84295', vendor:'PathGroup', price:2.00,  markup:2.20,  fav:false},
  {id:32, name:'Glucose',              cat:'1003',  cpt:'82947', vendor:'PathGroup', price:2.00,  markup:2.20,  fav:false},
];

// PathGroup reference prices (same tests, independent network)
const PG_PRICES = {
  'RPR':1.38,'Aldolase':2.42,'Calcium':1.72,'Creatinine, Urine':2.15,'GGT':2.28,
  'LDH':1.88,'Phosphorus':1.65,'Comprehensive Metabolic Panel (CMP)':3.95,
  'Complete Blood Count (CBC)':3.20,'HbA1c':5.80,'TSH':6.40,'Lipid Panel':4.50,
  'Urinalysis, Complete':2.75,'Vitamin D, 25-OH':10.90,'PSA, Total':6.95,
  'Ferritin':5.40,'Iron & TIBC':4.60,'Uric Acid':2.35,'Magnesium':2.55,
  'Prothrombin Time (PT/INR)':3.60,'hsCRP':7.20,'Testosterone, Total':9.50,
  'Estradiol':11.10,'Folate, Serum':6.60,'Vitamin B12':6.50,
  'Hepatic Function Panel':3.90,'Hemoglobin A1c w/ eAG':5.80,
  'Creatinine, Serum':1.80,'BUN (Blood Urea Nitrogen)':1.75,
};

function renderLabWfOverlay(){
  if(!S.labWf) return '';
  const selTests=LAB_TESTS.filter(t=>S.labSelected.includes(t.id));

  const stepEl=(n,text,done,active)=>{
    const spinner=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" style="animation:spin .8s linear infinite;"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`;
    const check=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--good)" stroke-width="2.5"><path d="m5 12 5 5 9-11"/></svg>`;
    return `
    <div style="display:flex;align-items:center;gap:14px;padding:14px 0;${n<3?'border-bottom:1px solid var(--border);':''}opacity:${done||active?1:.35};transition:opacity .4s;">
      <div style="width:28px;height:28px;border-radius:50%;background:${done?'var(--good-soft)':active?'var(--accent-soft)':'var(--panel-2)'};display:flex;align-items:center;justify-content:center;flex:none;">
        ${done?check:active?spinner:`<span style="font-size:11px;font-weight:700;color:var(--text-3);">${n}</span>`}
      </div>
      <span style="font-size:13.5px;font-weight:${done||active?'600':'400'};color:${done?'var(--text)':active?'var(--text)':'var(--text-3)'};">${text}</span>
      ${done?`<span style="margin-left:auto;font-size:11px;color:var(--good);font-weight:700;">Done</span>`:''}
    </div>`;
  };

  const s=S.labWfStep;
  const WF_STEPS=['Labcorp test selection','Same name test search in PathGroup','Compare the best price'];
  const WF_EXEC=['Retrieving your selected Labcorp tests','Searching PathGroup for matching test names','Comparing prices across vendors'];
  const steps=`
    ${stepEl(1,WF_EXEC[0],s>=2,s===1)}
    ${stepEl(2,WF_EXEC[1],s>=3,s===2)}
    ${stepEl(3,WF_EXEC[2],s>=4,s===3)}`;

  const table=s>=4?`
    <div style="margin-top:24px;animation:sap-up .3s ease;">
      <div style="display:grid;grid-template-columns:1fr 90px 90px 80px;gap:0;border:1px solid var(--border);border-radius:13px;overflow:hidden;">
        <div style="display:contents;">
          <div style="padding:9px 16px;background:var(--panel-2);font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Test</div>
          <div style="padding:9px 12px;background:var(--panel-2);font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);text-align:right;">Labcorp</div>
          <div style="padding:9px 12px;background:var(--panel-2);font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--info);text-align:right;">PathGroup</div>
          <div style="padding:9px 12px;background:var(--panel-2);font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--good);text-align:right;">Savings</div>
        </div>
        ${selTests.map((t,i)=>{
          const pg=PG_PRICES[t.name]??t.price;
          const save=t.price-pg;
          const pgWins=save>0;
          const isLast=i===selTests.length-1;
          return `
          <div style="display:contents;">
            <div style="padding:12px 16px;${isLast?'':'border-top:1px solid var(--border);'}font-size:13px;font-weight:600;color:var(--text);">${t.name}</div>
            <div style="padding:12px 12px;${isLast?'':'border-top:1px solid var(--border);'}font-size:13px;text-align:right;color:${pgWins?'var(--text-3)':'var(--text)'};">${money(t.price)}</div>
            <div style="padding:12px 12px;${isLast?'':'border-top:1px solid var(--border);'}font-size:13px;font-weight:700;text-align:right;color:${pgWins?'var(--info)':'var(--text-3)'};">${money(pg)}${pgWins?'':'*'}</div>
            <div style="padding:12px 12px;${isLast?'':'border-top:1px solid var(--border);'}font-size:13px;font-weight:700;text-align:right;color:${pgWins?'var(--good)':'var(--danger)'};">${pgWins?'-':'+'}&nbsp;${money(Math.abs(save))}</div>
          </div>`;
        }).join('')}
        <div style="display:contents;">
          <div style="padding:12px 16px;border-top:2px solid var(--border);font-size:13px;font-weight:700;color:var(--text);">Total</div>
          <div style="padding:12px 12px;border-top:2px solid var(--border);font-size:13.5px;font-weight:700;text-align:right;">${money(selTests.reduce((a,t)=>a+t.price,0))}</div>
          <div style="padding:12px 12px;border-top:2px solid var(--border);font-size:13.5px;font-weight:700;text-align:right;color:var(--info);">${money(selTests.reduce((a,t)=>a+(PG_PRICES[t.name]??t.price),0))}</div>
          ${(()=>{const save=selTests.reduce((a,t)=>a+(t.price-(PG_PRICES[t.name]??t.price)),0);return `<div style="padding:12px 12px;border-top:2px solid var(--border);font-size:13.5px;font-weight:800;text-align:right;color:${save>0?'var(--good)':'var(--danger)'};">${save>0?'−':'+'}${money(Math.abs(save))}</div>`;})()}
        </div>
      </div>
      <p style="font-size:11.5px;color:var(--text-3);margin-top:10px;line-height:1.5;">* Labcorp price is lower for this test. PathGroup pricing sourced from network reference list.</p>
    </div>`:'';

  return `
  <div style="position:fixed;inset:0;z-index:50;background:rgba(13,27,77,.26);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;" id="labwf-overlay">
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 28px 80px rgba(13,27,77,.28);width:min(640px,96vw);max-height:90vh;display:flex;flex-direction:column;overflow:hidden;animation:sap-up .25s ease;">
      <div style="display:flex;align-items:center;padding:20px 26px;border-bottom:1px solid var(--border);flex:none;gap:12px;">
        <div style="flex:1;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M5 8v4a5 5 0 0 0 5 5h.5M19 8v4a5 5 0 0 1-5 5h-.5"/></svg>
            <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--accent);">Memory · Workflow loaded</span>
          </div>
          <div style="font-size:17px;font-weight:800;letter-spacing:-.02em;color:var(--text);margin-bottom:8px;">Lab panel price comparison</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${WF_STEPS.map((s,i)=>`
            <span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--text-2);border:1px solid var(--border);border-radius:7px;padding:3px 9px;">
              <span style="font-size:9.5px;font-weight:700;color:var(--text-3);">${i+1}</span>${s}
            </span>`).join('')}
          </div>
        </div>
        <button data-action="labwf-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">×</button>
      </div>
      <div style="flex:1;overflow-y:auto;padding:22px 26px 28px;">
        <div style="margin-bottom:${s>=4?'0':'4px'}">${steps}</div>
        ${table}
      </div>
    </div>
  </div>
  <style>@keyframes spin{to{transform:rotate(360deg);}}</style>`;
}

function renderLabSearch(){
  if(!S.labOpen) return '';
  const q=S.labQ.toLowerCase();
  const favIds=new Set(S.labFavs);
  const selIds=new Set(S.labSelected);
  let tests=LAB_TESTS.filter(t=>{
    if(S.labFilter==='labcorp'&&t.vendor!=='Labcorp') return false;
    if(S.labFilter==='pathgroup'&&t.vendor!=='PathGroup') return false;
    if(S.labFilter==='favs'&&!t.fav&&!favIds.has(t.id)) return false;
    if(q&&!t.name.toLowerCase().includes(q)&&!t.cpt.includes(q)&&!t.cat.includes(q)) return false;
    return true;
  });
  const selectedTests=LAB_TESTS.filter(t=>selIds.has(t.id));
  const totalCost=selectedTests.reduce((a,t)=>a+t.price,0);
  const totalMkp=selectedTests.reduce((a,t)=>a+t.markup,0);

  const filterBtn=(f,label)=>`<button data-action="lab-filter:${f}" style="padding:6px 14px;border-radius:20px;font-size:12.5px;font-weight:600;border:1px solid ${S.labFilter===f?'var(--accent)':'var(--border)'};background:${S.labFilter===f?'var(--accent-soft)':'transparent'};color:${S.labFilter===f?'var(--accent)':'var(--text-2)'};cursor:pointer;transition:all .12s;">${label}</button>`;

  const rows=tests.slice(0,50).map(t=>{
    const isSel=selIds.has(t.id);
    const isFav=t.fav||favIds.has(t.id);
    return `
    <div style="display:flex;align-items:center;gap:12px;padding:13px 20px;border-bottom:1px solid var(--border);transition:background .1s;" class="lab-row" data-id="${t.id}">
      <button data-action="lab-toggle:${t.id}" style="width:28px;height:28px;border-radius:50%;border:1.5px solid ${isSel?'var(--accent)':'var(--border)'};background:${isSel?'var(--accent)':'transparent'};color:${isSel?'#fff':'var(--text-3)'};display:flex;align-items:center;justify-content:center;flex:none;font-size:14px;cursor:pointer;transition:all .15s;">${isSel?'✓':'+'}</button>
      <span style="color:${isFav?'#f0b429':'var(--border)'};font-size:14px;flex:none;cursor:pointer;" data-action="lab-fav:${t.id}">★</span>
      <span style="flex:1;min-width:0;">
        <span style="display:block;font-size:14px;font-weight:600;color:var(--text);">${t.name}</span>
        <span style="display:flex;gap:8px;margin-top:3px;flex-wrap:wrap;">
          <span style="font-size:11.5px;color:var(--text-3);border:1px solid var(--border);border-radius:5px;padding:1px 7px;">${t.vendor} · ${t.cat}</span>
          <span style="font-size:11.5px;color:var(--text-3);border:1px solid var(--border);border-radius:5px;padding:1px 7px;">CPT ${t.cpt}</span>
        </span>
      </span>
      <span style="width:70px;text-align:right;font-size:13.5px;color:var(--text-2);">${money(t.price)}</span>
      <span style="width:80px;text-align:right;font-size:13.5px;font-weight:700;color:var(--accent);">${money(t.markup)}</span>
    </div>`;
  }).join('');

  const selRows=selectedTests.map(t=>`
    <div style="display:flex;align-items:flex-start;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);">
      <div>
        <div style="font-size:13.5px;font-weight:600;color:var(--text);">${t.name}</div>
        <div style="font-size:11.5px;color:var(--text-3);margin-top:3px;">${t.vendor} · ${t.cat}</div>
      </div>
      <button data-action="lab-toggle:${t.id}" style="color:var(--text-3);font-size:16px;padding:0 4px;cursor:pointer;flex:none;">×</button>
    </div>`).join('');

  return `
  <div style="position:fixed;inset:0;z-index:40;background:rgba(13,27,77,.18);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;" id="lab-overlay">
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 24px 70px rgba(13,27,77,.22);width:min(1100px,96vw);height:min(780px,92vh);display:flex;flex-direction:column;overflow:hidden;">
      <!-- top bar -->
      <div style="display:flex;align-items:center;padding:22px 28px 16px;border-bottom:1px solid var(--border);flex:none;">
        <div style="flex:1;">
          <div style="font-size:22px;font-weight:800;letter-spacing:-.025em;color:var(--text);">Lab Test Search</div>
          <div style="font-size:13px;color:var(--text-3);margin-top:3px;">Search the lab price list, build a panel, and see your combined pricing.</div>
        </div>
        <button data-action="lab-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">×</button>
      </div>
      <!-- body -->
      <div style="display:flex;flex:1;min-height:0;">
        <!-- left: search + list -->
        <div style="flex:1;min-width:0;display:flex;flex-direction:column;border-right:1px solid var(--border);">
          <div style="padding:16px 20px;border-bottom:1px solid var(--border);flex:none;">
            <div style="display:flex;align-items:center;gap:10px;border:1px solid var(--border);border-radius:12px;padding:10px 14px;background:var(--panel);margin-bottom:12px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input id="lab-q-input" value="${S.labQ}" placeholder="Search by test name, CPT code, or catalog #…" style="flex:1;border:none;background:transparent;color:var(--text);font-size:13.5px;"/>
            </div>
            <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;">
              ${filterBtn('all','All')}
              ${filterBtn('labcorp','Labcorp')}
              ${filterBtn('pathgroup','PathGroup')}
              ${filterBtn('favs','★ Favorites')}
              <span style="margin-left:auto;font-size:12px;color:var(--text-3);">Showing ${Math.min(tests.length,50)} of ${tests.length} tests</span>
            </div>
          </div>
          <div style="overflow-y:auto;flex:1;">
            <div style="display:flex;padding:9px 20px;border-bottom:1px solid var(--border);font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-3);">
              <span style="width:28px;flex:none;"></span><span style="width:20px;flex:none;"></span>
              <span style="flex:1;">Test</span>
              <span style="width:70px;text-align:right;">Price</span>
              <span style="width:80px;text-align:right;">Markup</span>
            </div>
            ${rows||'<div style="padding:40px;text-align:center;font-size:13.5px;color:var(--text-3);">No tests found.</div>'}
          </div>
        </div>
        <!-- right: selected + saved sets -->
        <div style="width:320px;flex:none;display:flex;flex-direction:column;overflow-y:auto;">
          <div style="padding:20px;border-bottom:1px solid var(--border);">
            <div style="display:flex;align-items:center;gap:9px;margin-bottom:10px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-2)" stroke-width="2"><path d="M9 3h6"/><path d="M10 3v6.5L5.5 17a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9.5V3"/><path d="M7.5 14h9"/></svg>
              <span style="font-size:14px;font-weight:700;color:var(--text);">Selected Tests</span>
              <span style="min-width:20px;height:20px;border-radius:20px;background:var(--accent);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 6px;">${selectedTests.length}</span>
            </div>
            ${selectedTests.length
              ? `<div style="margin-bottom:14px;">${selRows}</div>
                 <div style="border:1px solid var(--border);border-radius:11px;overflow:hidden;margin-bottom:12px;">
                   <div style="display:flex;border-bottom:1px solid var(--border);">
                     <div style="flex:1;padding:11px 14px;"><div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;">${selectedTests.length} tests · cost</div><div style="font-size:16px;font-weight:700;margin-top:2px;">${money(totalCost)}</div></div>
                     <div style="flex:1;padding:11px 14px;border-left:1px solid var(--border);"><div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;">Your price</div><div style="font-size:16px;font-weight:700;color:var(--accent);margin-top:2px;">${money(totalMkp)}</div></div>
                   </div>
                   <div style="padding:11px 14px;"><div style="font-size:10.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;">Margin</div><div style="font-size:16px;font-weight:700;color:var(--good);margin-top:2px;">${money(totalMkp-totalCost)}</div></div>
                 </div>
                 <button data-action="lab-assign" style="width:100%;padding:11px;border-radius:11px;background:var(--accent);color:#fff;font-size:13.5px;font-weight:700;cursor:pointer;border:none;margin-bottom:8px;">Assign</button>
                 <div data-action="lab-wf-start" style="border:1px solid var(--accent-line);border-radius:12px;background:var(--accent-soft);padding:12px 14px;cursor:pointer;">
                   <div style="display:flex;align-items:center;gap:7px;margin-bottom:7px;">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.2"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M5 8v4a5 5 0 0 0 5 5h.5M19 8v4a5 5 0 0 1-5 5h-.5"/></svg>
                     <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--accent);">Memory · Workflow</span>
                   </div>
                   <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:9px;">Lab panel price comparison</div>
                   <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px;">
                     ${['Labcorp test selection','PathGroup matching','Compare best price'].map((s,i)=>`
                     <div style="display:flex;align-items:center;gap:8px;">
                       <span style="width:16px;height:16px;border-radius:50%;background:rgba(91,63,160,.15);color:var(--accent);font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none;">${i+1}</span>
                       <span style="font-size:11.5px;color:var(--text-2);">${s}</span>
                     </div>`).join('')}
                   </div>
                   <div style="text-align:center;font-size:12px;font-weight:700;color:var(--accent);">▶ Run workflow</div>
                 </div>`
              : `<p style="font-size:12.5px;color:var(--text-3);line-height:1.55;margin:0;">Click tests on the left to build a panel. Combined price, markup, and profit show up here.</p>`
            }
          </div>
          <div style="padding:20px;">
            <div style="display:flex;align-items:center;gap:9px;margin-bottom:10px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-2)" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              <span style="font-size:14px;font-weight:700;color:var(--text);">Saved Sets</span>
            </div>
            <p style="font-size:12.5px;color:var(--text-3);line-height:1.55;margin:0;">No saved sets yet. Select tests and save them as a named set to reuse later.</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ── Create New Work Item — fixed bar top-right ────────────────────────────
function renderCreateWork(filteredPatients){
  const PUR = '#4c2d9c';
  const W = '290px';

  let dropdown = '';
  if(S.workOpen){
    let inner='';
    if(S.workMode===null){
      inner=`
        <div style="display:flex;flex-direction:column;gap:7px;">
          <button data-action="work-mode:existing" style="display:flex;align-items:center;gap:11px;padding:11px 13px;border-radius:11px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.07);text-align:left;cursor:pointer;width:100%;">
            <span style="width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.13);display:flex;align-items:center;justify-content:center;flex:none;">${I.patients.replace('stroke="currentColor"','stroke="#fff"')}</span>
            <span style="flex:1;"><span style="display:block;font-size:13px;font-weight:600;color:#fff;">Existing patient</span><span style="display:block;font-size:11.5px;color:rgba(255,255,255,.42);margin-top:1px;">Pick from your list</span></span>
            <span style="color:rgba(255,255,255,.35);">›</span>
          </button>
          <button data-action="work-mode:new" style="display:flex;align-items:center;gap:11px;padding:11px 13px;border-radius:11px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.07);text-align:left;cursor:pointer;width:100%;">
            <span style="width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.13);display:flex;align-items:center;justify-content:center;flex:none;">${I.plus.replace('stroke="currentColor"','stroke="#fff"')}</span>
            <span style="flex:1;"><span style="display:block;font-size:13px;font-weight:600;color:#fff;">New patient</span><span style="display:block;font-size:11.5px;color:rgba(255,255,255,.42);margin-top:1px;">Create a profile</span></span>
            <span style="color:rgba(255,255,255,.35);">›</span>
          </button>
        </div>`;
    } else if(S.workMode==='existing'){
      const rows=filteredPatients.slice(0,6).map(p=>`
        <button data-action="patient:${p.id}" style="display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;border-radius:8px;cursor:pointer;background:transparent;border:none;transition:background .1s;">
          <span style="width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.14);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex:none;">${initials(p.name)}</span>
          <span style="font-size:13px;font-weight:600;color:#fff;">${p.name}</span>
        </button>`).join('');
      inner=`
        <button data-action="work-back" style="display:flex;align-items:center;gap:4px;font-size:11.5px;color:rgba(255,255,255,.45);margin-bottom:10px;cursor:pointer;background:none;border:none;">${I.back.replace('stroke="currentColor"','stroke="rgba(255,255,255,.4)"')} Back</button>
        <div style="display:flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.13);border-radius:8px;padding:8px 10px;margin-bottom:6px;background:rgba(255,255,255,.06);">
          ${I.search.replace('stroke="currentColor"','stroke="rgba(255,255,255,.4)"')}
          <input id="work-q-input" value="${S.workQ}" placeholder="Search patient…" style="flex:1;border:none;background:transparent;color:#fff;font-size:12.5px;"/>
        </div>
        <div style="display:flex;flex-direction:column;">${rows||'<p style="font-size:12px;color:rgba(255,255,255,.35);padding:6px 10px;margin:0;">No patients yet.</p>'}</div>`;
    } else if(S.workMode==='new'){
      inner=`
        <button data-action="work-back" style="display:flex;align-items:center;gap:4px;font-size:11.5px;color:rgba(255,255,255,.45);margin-bottom:12px;cursor:pointer;background:none;border:none;">${I.back.replace('stroke="currentColor"','stroke="rgba(255,255,255,.4)"')} Back</button>
        <div style="font-size:10.5px;font-weight:600;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">Patient name</div>
        <input id="new-p-name" value="${S.newPName}" placeholder="e.g. Jane Smith" style="width:100%;padding:10px 12px;border:1px solid rgba(255,255,255,.14);border-radius:9px;background:rgba(255,255,255,.07);color:#fff;font-size:13.5px;margin-bottom:10px;"/>
        <button data-action="create-patient" style="width:100%;padding:10px;border-radius:9px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:13px;font-weight:700;cursor:pointer;opacity:${S.newPName.trim()?1:.4};">Create patient</button>`;
    }
    dropdown=`
    <div style="position:absolute;top:calc(100% + 8px);right:0;width:${W};background:${PUR};border-radius:16px;padding:18px;box-shadow:0 20px 50px rgba(30,0,80,.45);z-index:21;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <span style="font-size:13.5px;font-weight:700;color:#fff;">Assign to:</span>
        <button data-action="work-close" style="width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,.1);border:none;color:rgba(255,255,255,.6);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;">×</button>
      </div>
      ${inner}
    </div>`;
  }

  return `
  <div style="position:fixed;top:20px;right:24px;z-index:20;">
    <button data-action="${S.workOpen?'work-close':'work-open'}"
      style="display:flex;align-items:center;gap:8px;padding:11px 20px;border-radius:12px;background:${PUR};color:#fff;font-size:13.5px;font-weight:600;cursor:pointer;border:none;box-shadow:0 4px 22px rgba(76,45,156,.38);letter-spacing:-.01em;transition:opacity .15s;">
      ${I.plus.replace('stroke="currentColor"','stroke="#fff"')}
      Create New Work
    </button>
    ${dropdown}
  </div>`;
}

// ── CCM Dashboard ─────────────────────────────────────────────────────────
function renderToday(ma){
  const cl=currentClinic();
  const totalPatients=CLINICS.reduce((s,c)=>s+c.patients,0);
  const totalSignoff=CLINICS.reduce((s,c)=>s+c.signoffReady,0);
  const totalRevenue=CLINICS.reduce((s,c)=>s+c.revenue,0);
  const totalPending=CLINICS.reduce((s,c)=>s+c.pendingActs,0);

  const kpi=(val,label,sub,color,icon)=>`
    <div style="border:1px solid var(--border);border-radius:13px;background:var(--panel);padding:16px 20px;display:flex;flex-direction:column;gap:6px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:10.5px;font-weight:600;color:var(--text-3);letter-spacing:.02em;">${label}</span>
        <span style="font-size:11px;color:${color};background:${color}18;padding:2px 8px;border-radius:99px;font-weight:700;">${sub}</span>
      </div>
      <div style="font-size:28px;font-weight:800;color:var(--text);letter-spacing:-.03em;line-height:1.1;">${val}</div>
    </div>`;

  // Sign-off queue from current clinic's patients
  const signoffRows=PATIENTS.filter(p=>p.ccmStatus==='ready'&&p.minutesThisMonth>=20).map(p=>{
    const min=p.minutesThisMonth;
    let codes='',rev=0;
    if(min>=60){codes='99487';const add=Math.floor((min-60)/30);rev=132.93+(add*68.02);if(add)codes+=' + '+Array(add).fill('99489').join(' + ');}
    else{codes='99490';const add=Math.min(2,Math.floor((min-20)/20));rev=62.71+(add*47.34);if(add)codes+=' + '+Array(add).fill('99439').join(' + ');}
    return {p,min,codes,rev};
  });

  const signoffTable=signoffRows.length?signoffRows.map((r,i)=>`
    <div style="display:grid;grid-template-columns:1fr 80px 160px 80px;align-items:center;padding:11px 16px;${i<signoffRows.length-1?'border-bottom:1px solid var(--border)':''};">
      <div>
        <button data-action="pt-open:${r.p.id}" style="font-size:13px;font-weight:700;color:var(--text);cursor:pointer;background:none;border:none;padding:0;text-align:left;">${r.p.name}</button>
        <div style="font-size:11px;color:var(--text-3);margin-top:1px;">Dr. ${r.p.provider}</div>
      </div>
      <div style="font-size:13px;font-weight:700;color:var(--accent);text-align:center;">${r.min} min</div>
      <div style="font-size:11.5px;color:var(--text-2);font-family:monospace;">${r.codes}</div>
      <div style="font-size:13px;font-weight:700;color:var(--good);text-align:right;">$${r.rev.toFixed(2)}</div>
    </div>`).join('')
  :`<div style="padding:28px;text-align:center;color:var(--text-3);font-size:13px;">No patients ready for sign-off this month.</div>`;

  // Activity review queue (missing or low minutes)
  const ACTIVITY_QUEUE=[
    {patient:'Margaret Torres', staff:'Phone Room Staff',  type:'Patient phone inquiry — refill request',   date:'Jun 18', minutes:null, clinical:false},
    {patient:'Robert Nguyen',   staff:'Sandra K., LVN',    type:'Specialist note review — cardiology',       date:'Jun 17', minutes:null, clinical:true},
    {patient:'Linda Patel',     staff:'Maria R., RN',      type:'Inhaler technique education — phone call',  date:'Jun 16', minutes:null, clinical:true},
    {patient:'Helen Crawford',  staff:'Maria R., RN',      type:'Lab result discussion — CBC, CMP',          date:'Jun 15', minutes:null, clinical:true},
    {patient:'Dorothy Simmons', staff:'Admin Staff',       type:'Appointment scheduling',                    date:'Jun 14', minutes:null, clinical:false},
  ];

  const actRows=ACTIVITY_QUEUE.map((a,i)=>`
    <div style="display:grid;grid-template-columns:1fr 130px 70px 90px;align-items:center;padding:10px 16px;${i<ACTIVITY_QUEUE.length-1?'border-bottom:1px solid var(--border)':''};">
      <div>
        <div style="font-size:12.5px;font-weight:600;color:var(--text);">${a.type}</div>
        <div style="font-size:11px;color:var(--text-3);margin-top:1px;">${a.patient}</div>
      </div>
      <div style="font-size:11.5px;color:var(--text-2);">${a.staff}</div>
      <div>
        <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;${a.clinical?'background:var(--good-soft);color:var(--good)':'background:var(--border);color:var(--text-3)'};">${a.clinical?'Clinical':'Admin'}</span>
      </div>
      <div style="text-align:right;">
        ${a.clinical?`<button style="font-size:11.5px;font-weight:700;padding:4px 12px;border-radius:8px;border:1.5px solid var(--accent);color:var(--accent);background:transparent;cursor:pointer;">Add Min</button>`
        :`<span style="font-size:11px;color:var(--text-3);">Non-billable</span>`}
      </div>
    </div>`).join('');

  // Practice overview cards
  const practiceCards=CLINICS.map(c=>{
    const pct=Math.round((c.signoffDone/(c.signoffReady+c.signoffDone||1))*100);
    const isActive=c.id===S.clinic;
    return `
    <button data-action="clinic-select:${c.id}"
      style="text-align:left;padding:14px 16px;border:1.5px solid ${isActive?'var(--accent)':'var(--border)'};border-radius:13px;background:${isActive?'var(--accent-soft)':'var(--panel)'};cursor:pointer;transition:all .15s;width:100%;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <div style="font-size:12.5px;font-weight:700;color:var(--text);">${c.short}</div>
        <div style="font-size:10px;color:var(--text-3);padding:2px 7px;border:1px solid var(--border);border-radius:5px;">${c.emr}</div>
      </div>
      <div style="font-size:22px;font-weight:800;color:${isActive?'var(--accent)':'var(--text)'};letter-spacing:-.02em;line-height:1;margin-bottom:4px;">${c.patients}</div>
      <div style="font-size:11px;color:var(--text-3);margin-bottom:8px;">active patients</div>
      <div style="height:4px;background:var(--border);border-radius:99px;overflow:hidden;margin-bottom:6px;">
        <div style="height:100%;width:${pct}%;background:var(--good);border-radius:99px;transition:width .4s;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;">
        <span style="font-size:10.5px;color:var(--good);font-weight:600;">${c.signoffDone} signed off</span>
        <span style="font-size:10.5px;color:var(--ready);font-weight:600;">${c.signoffReady} ready</span>
      </div>
    </button>`;
  }).join('');

  return `
  <div style="padding:22px 28px 60px;width:100%;overflow-x:hidden;">

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
      <div>
        <div style="font-size:11px;font-weight:600;color:var(--text-3);letter-spacing:.04em;text-transform:uppercase;margin-bottom:3px;">Chronic Care Management</div>
        <h1 style="font-size:19px;font-weight:800;letter-spacing:-.02em;color:var(--text);">Operations Dashboard</h1>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="font-size:12px;color:var(--text-3);">Jun 2026</div>
        <div style="width:8px;height:8px;border-radius:50%;background:var(--good);"></div>
        <span style="font-size:12px;color:var(--good);font-weight:600;">All systems live</span>
      </div>
    </div>

    <!-- Practice Overview (collapsible) -->
    <div style="margin-bottom:20px;">
      <button data-action="practices-toggle" style="display:flex;align-items:center;gap:7px;background:none;border:none;cursor:pointer;padding:0;margin-bottom:${S.practicesOpen?'10px':'0'};">
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);">Practices</span>
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none" style="color:var(--text-3);transition:transform .2s;transform:rotate(${S.practicesOpen?'0':'180'}deg);">
          <path d="M2 4.5L6 7.5L10 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      ${S.practicesOpen ? `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;">${practiceCards}</div>` : ''}
    </div>

    <!-- Stats (current clinic) -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;">

      <div style="border:1px solid var(--border);border-radius:14px;background:var(--panel);box-shadow:var(--shadow);padding:16px 18px;grid-column:span 2;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:var(--text-3);margin-bottom:10px;">Patients</div>
        <div style="display:flex;align-items:center;gap:0;">
          <div style="display:flex;flex-direction:column;gap:2px;padding-right:18px;border-right:1px solid var(--border);margin-right:18px;flex:none;">
            <div style="font-size:34px;font-weight:800;color:var(--accent);letter-spacing:-.03em;line-height:1;">${cl.patients}</div>
            <div style="font-size:11.5px;font-weight:600;color:var(--text-2);">Active Patients</div>
          </div>
          <div style="display:flex;gap:20px;">
            ${[
              {v:6,   label:'No Active<br>Care Plan',   color:'var(--text-2)'},
              {v:1,   label:'In Progress<br>Care Plan', color:'var(--ready)'},
              {v:cl.patients-7, label:'Completed<br>Care Plan', color:'var(--good)'},
            ].map(s=>`
            <div>
              <div style="font-size:22px;font-weight:800;color:${s.color};letter-spacing:-.02em;line-height:1;">${s.v}</div>
              <div style="font-size:11px;color:var(--text-3);margin-top:3px;line-height:1.3;">${s.label}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>

      <div style="border:1px solid var(--border);border-radius:14px;background:var(--panel);box-shadow:var(--shadow);padding:16px 18px;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:var(--text-3);margin-bottom:10px;">Sign-Off to EHR/Bill</div>
        <div style="font-size:34px;font-weight:800;color:var(--good);letter-spacing:-.03em;line-height:1;">${cl.signoffReady}</div>
        <div style="font-size:11.5px;font-weight:600;color:var(--text-2);margin-top:3px;">Potential Sign-Offs</div>
      </div>

      <div style="border:1px solid var(--border);border-radius:14px;background:var(--panel);box-shadow:var(--shadow);padding:16px 18px;grid-column:span 2;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:var(--text-3);margin-bottom:10px;">Scheduled Activities</div>
        <div style="display:flex;align-items:center;gap:0;">
          <div style="display:flex;flex-direction:column;gap:2px;padding-right:18px;border-right:1px solid var(--border);margin-right:18px;flex:none;">
            <div style="font-size:34px;font-weight:800;color:var(--ready);letter-spacing:-.03em;line-height:1;">${cl.todayCalls}</div>
            <div style="font-size:11.5px;font-weight:600;color:var(--text-2);">Scheduled Today &amp; Prior</div>
          </div>
          <div>
            <div style="font-size:34px;font-weight:800;color:var(--info);letter-spacing:-.03em;line-height:1;">${cl.patients-cl.todayCalls}</div>
            <div style="font-size:11.5px;font-weight:600;color:var(--text-2);margin-top:3px;">Future Scheduled</div>
          </div>
        </div>
      </div>

      <div style="border:1px solid var(--border);border-radius:14px;background:var(--panel);box-shadow:var(--shadow);padding:16px 18px;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:var(--text-3);margin-bottom:10px;">${cl.emr} Interface</div>
        <div style="font-size:34px;font-weight:800;color:var(--info);letter-spacing:-.03em;line-height:1;">${cl.pendingActs}</div>
        <div style="font-size:11.5px;font-weight:600;color:var(--text-2);margin-top:3px;">Pending Activities</div>
      </div>

    </div>

    <!-- Filter bar -->
    <div style="border:1px solid var(--border);border-radius:12px;background:var(--panel);box-shadow:var(--shadow);margin-bottom:16px;overflow:hidden;">
      ${[
        {label:'Care Type', action:'ccm-care',    active:S.ccmCareType,  opts:['CCM','Staff Provider','Chronic CCM']},
        {label:'Sign-Off',  action:'ccm-signoff', active:S.ccmSignOff,   opts:['All','No','Yes','Re?']},
        {label:'Insurance', action:'ccm-ins',     active:S.ccmInsurance, opts:['All','Medicare','Medicare Advantage']},
      ].map((g,gi,arr)=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 18px;${gi<arr.length-1?'border-bottom:1px solid var(--border)':''}">
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);width:80px;flex:none;">${g.label}</span>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${g.opts.map(o=>`<button data-action="${g.action}:${o}" style="padding:4px 13px;border-radius:20px;border:1.5px solid ${g.active===o?'var(--accent)':'var(--border)'};background:${g.active===o?'var(--accent)':'transparent'};color:${g.active===o?'#fff':'var(--text-2)'};font-size:12px;font-weight:${g.active===o?'700':'500'};cursor:pointer;transition:all .15s;">${o}</button>`).join('')}
        </div>
      </div>`).join('')}
    </div>

    <!-- Bar chart -->
    <div style="border:1px solid var(--border);border-radius:14px;background:var(--panel);box-shadow:var(--shadow);padding:20px 20px 12px;">
      <div style="font-size:12px;font-weight:700;color:var(--text-3);margin-bottom:14px;">Distribution by Minutes of Care</div>
      <div style="display:flex;align-items:flex-end;gap:4px;overflow-x:auto;padding-bottom:4px;">
        ${[
          {r:'0–4',v:86},{r:'5–9',v:14},{r:'10–14',v:25},{r:'15–19',v:12},
          {r:'20–24',v:45},{r:'25–29',v:15},{r:'30–34',v:13},{r:'35–39',v:30},
          {r:'40–44',v:23},{r:'45–49',v:19},{r:'50–54',v:12},{r:'55–59',v:20},
          {r:'60–74',v:27},{r:'75–89',v:13},{r:'90–104',v:11},{r:'105–119',v:5},
          {r:'120+',v:4},
        ].map(b=>{
          const h=Math.max(4,Math.round((b.v/86)*140));
          return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;min-width:0;">
            <span style="font-size:9.5px;font-weight:700;color:var(--text-2);">${b.v}</span>
            <div style="width:100%;display:flex;flex-direction:column;justify-content:flex-end;height:140px;">
              <div style="width:100%;background:var(--accent);border-radius:3px 3px 0 0;height:${h}px;opacity:.8;"></div>
            </div>
            <span style="font-size:9px;color:var(--text-3);writing-mode:vertical-rl;transform:rotate(180deg);height:36px;line-height:1;">${b.r}</span>
          </div>`;
        }).join('')}
      </div>
    </div>

  </div>`;
}

// ── Templates data ────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: 'referral-scribe',
    type: 'referral',
    label: 'Patient Information Scribe Template',
    content: `Patient:
DOB:
PCP: Cintia Dafashy, MD
Phone:
Address:
Email:

Referral to:
Effective Date:
Termination Date:

Reason for Referral:

Please fax office notes to 832-737-0071.

─────────────────────────────────────────

Referring Physician Information
Name: Cintia Dafashy, MD
NPI: 1245890953
Signature:

Phone: 832-318-0090
Fax: 832-737-0071

Date: ***

─────────────────────────────────────────

To
Attn:
Address

Dear Dr. ***

I am referring ***, a *** year old ***, for evaluation of their ***. These reported concerns have been occurring for the past ***.

I have been ***'s primary care physician for the past ***.

Pertinent medical history includes:
****

Please do not hesitate to reach out if you have any further questions.

Sincerely,
Cintia Dafashy, MD
Family Medicine`,
  },
  {
    id: 'note-summary',
    type: 'note',
    label: 'Note Summary Template',
    content: `New Adult Patient
[Start Time - End Time]
[Date]

History of Present Illness:
(Organize by medical problem. For each problem, use full sentences and formal clinical language.)
- [Problem 1: Description, onset, duration, associated symptoms, relevant negatives, prior evaluation/treatment]
- [Problem 2: Description, onset, duration, associated symptoms, relevant negatives, prior evaluation/treatment]
- [Additional problems as needed]

Family History:
(hyphenated list)
- [Relative: Condition or pertinent diagnosis]
- (e.g., Father: hypertension)

Surgical History:
(hyphenated list)
- [Surgery name, year, indication, complications if any]
- (e.g., Appendectomy, 2010, uncomplicated)

Medications:
(hyphenated list)
- [Medication name, dose, route, frequency]
- (e.g., Lisinopril 10 mg oral daily)

Allergies:
(hyphenated list)
- [Allergen: reaction]
- (e.g., Penicillin: rash)

Social History:
(hyphenated list)
- [Tobacco: type, amount, duration, quit date if applicable]
- [Alcohol: type, amount, frequency]
- [Recreational substances: type, amount, frequency]
- [Occupation: current job, exposures]
- [Living situation: who lives with patient, home environment]

Physical Examination:
(hyphenated list)
- Vital Signs: [HR: # bpm, BP: #/# mmHg, T: # °C/°F, RR: #, O2 sats: #%]
- General: [Appearance, distress, orientation]
- HEENT: [Head, eyes, ears, nose, throat findings]
- Neck: [Inspection, palpation, lymphadenopathy, thyroid]
- Cardiovascular: [Heart sounds, murmurs, pulses, edema]
- Respiratory: [Breath sounds, symmetry, effort, adventitious sounds]
- Abdomen: [Inspection, auscultation, palpation, tenderness, masses]
- Genitourinary: [If indicated, findings]
- Musculoskeletal: [Joints, range of motion, deformities]
- Neurological: [Mental status, cranial nerves, motor, sensory, reflexes, coordination]
- Skin: [Rashes, lesions, color, turgor]
- Psychiatric: [Mood, affect, thought process]

Assessment & Plan:
(Organize by medical problem. For each problem, use medical terminology and include plan items as hyphenated lists.)
1) [Problem 1: Assessment]
- [Investigations planned or ordered]
- [Treatment plan]
- [Counselling discussion]
- [Referrals sent]
- [Follow up plan]
- [Return precautions]
2) [Problem 2: Assessment]
- [Investigations planned or ordered]
- [Treatment plan]
- [Counselling discussion]
- [Referrals sent]
- [Follow up plan]
- [Return precautions]
[Additional problems as needed]

─────────────────────────────────────────

Follow Up Visits / Acute Visits

Subjective:
(Include relevant history and associated information in chronological order)
1) [Chief complaint 1]
- [Hyphenated list of symptoms and related history]
2) [Chief complaint 2]
- [Hyphenated list of symptoms and related history]

Objective:
(hyphenated list)
- [Vital signs with units in one line] (e.g., HR: #, BP: #, T: #, RR: #, O2 sats: #%)
- [Physical exam findings and/or mental status exam findings] (Format as "System: Exam findings", one system per line. Specify anatomical location if relevant)
- [Investigation results with units] (Only include completed investigations, otherwise leave blank. All planned or ordered investigations should be included under Plan)

Assessment & Plan:
(Do not fabricate the assessment and plan unless mentioned in the source material. Use medical terminology if appropriate. Each assessment and plan number should correlate directly with the subjective section. Include follow up instructions and return precautions if mentioned.)
1) [Diagnosis 1 and rationale if mentioned]
- [Hyphenated plan]
2) [Diagnosis 2 and rationale if mentioned]
- [Hyphenated plan]

─────────────────────────────────────────

Well Child Visit

Well Child Check: [create a title for the visit that summarizes the findings and plan in a few words]
Potential ICD-9 codes: V20.2 (routine infant or child health check, [suggest possible ICD-9 codes given the diagnosis or differential diagnosis]
Well Child Check - Baby Record: [summarize findings and plan]
(use "- " to indicate list items, and, if necessary, use "-- " to indicate sub-items in lists)

Medical History:
- Current age: [give the patients age]
- [Past medical history] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)
- [Current medical conditions] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)
- [Medications] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)
- [Allergies] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)

Parental concerns:

Growth: [mention how the patient is progressing according to growth charts] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)

Nutrition:
- [Feeding method (breastfeeding, formula, solids)] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)
- [Feeding frequency and amount] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)
- [Any feeding difficulties] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)
- [Any other information discussed regarding nutrition and/or feeding]

Education and Advice:
- [any education and advice given e.g. injury prevention, behaviour, parental fatigue/depression, environmental health, etc.]

Development:
- [anything discussed regarding normal development, e.g. language, movement, walking, etc.]

Physical Examination:
- [include physical exam, e.g. fontanelles, red eye reflex, corneal light reflex, heart/lungs/abdomen, hip exam, etc.]

Investigations/Screening:
- [any planned investigations; if not are discussed state "none currently indicated"]

Immunizations:
- [immunizations received] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)
- [Upcoming immunizations] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)

Plan:
- [Follow-up appointments] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)
- [Referrals to specialists] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank.)
- [Any other management plan not mentioned previously]`,
  },
];

// ── Memory views ─────────────────────────────────────────────────────────
function renderAddTemplate(){
  if(!S.addTmplOpen) return '';
  const TYPE_OPTS=[
    {id:'referral',label:'Referrals',   icon:I.referral, color:'var(--info)',  soft:'var(--info-soft)'},
    {id:'note',    label:'Visit notes', icon:I.note,     color:'var(--good)',  soft:'var(--good-soft)'},
    {id:'lab',     label:'Lab panels',  icon:I.lab,      color:'var(--accent)',soft:'var(--accent-soft)'},
    {id:'doc',     label:'Documents',   icon:I.doc,      color:'var(--ready)', soft:'var(--ready-soft)'},
  ];
  const typePills=TYPE_OPTS.map(o=>`
    <button data-action="at-type:${o.id}"
      style="display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:20px;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .15s;
        background:${S.addTmplType===o.id?o.soft:'var(--panel-2)'};
        color:${S.addTmplType===o.id?o.color:'var(--text-3)'};
        border:1.5px solid ${S.addTmplType===o.id?o.color:'transparent'};">
      ${o.icon.replace('stroke="currentColor"',`stroke="${S.addTmplType===o.id?o.color:'var(--text-3)'}"`)
              .replace(/width="\d+"/,'width="14"').replace(/height="\d+"/,'height="14"')}
      @ ${o.label}
    </button>`).join('');

  const canSave=!!(S.addTmplLabel.trim()&&S.addTmplContent.trim());
  return `
  <div style="position:fixed;inset:0;z-index:50;background:rgba(13,27,77,.22);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;" id="at-overlay">
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 24px 70px rgba(13,27,77,.24);width:min(680px,96vw);height:min(820px,94vh);display:flex;flex-direction:column;overflow:hidden;">
      <div style="display:flex;align-items:center;padding:22px 28px;border-bottom:1px solid var(--border);flex:none;">
        <span style="font-size:17px;font-weight:800;letter-spacing:-.02em;color:var(--text);flex:1;">Add Template</span>
        <button data-action="at-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">×</button>
      </div>
      <div style="flex:1;overflow-y:auto;padding:24px 28px;display:flex;flex-direction:column;gap:20px;">
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);margin-bottom:10px;">Work Item Tag</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">${typePills}</div>
        </div>
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);margin-bottom:8px;">Template Name</div>
          <input id="at-label-input" value="${S.addTmplLabel.replace(/"/g,'&quot;')}" placeholder="e.g. Referral Letter – Cardiology"
            style="width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:11px;background:var(--panel);color:var(--text);font-size:13.5px;font-family:inherit;"/>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;min-height:0;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);margin-bottom:8px;">Template Content</div>
          <textarea id="at-content-input" placeholder="Paste or type your template here…"
            style="flex:1;min-height:280px;width:100%;padding:14px 16px;border:1.5px solid var(--border);border-radius:11px;background:var(--panel);color:var(--text);font-size:13px;font-family:'JetBrains Mono',monospace;line-height:1.75;resize:vertical;">${S.addTmplContent.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>
        </div>
      </div>
      <div style="padding:18px 28px;border-top:1px solid var(--border);flex:none;">
        <button data-action="at-save"
          style="width:100%;padding:13px;border-radius:12px;border:none;font-size:14px;font-weight:700;letter-spacing:-.01em;
            background:${canSave?'#4c2d9c':'var(--panel-2)'};
            color:${canSave?'#fff':'var(--text-3)'};
            cursor:${canSave?'pointer':'default'};">
          Save Template
        </button>
      </div>
    </div>
  </div>`;
}

function renderTemplateOverlay(){
  if(!S.templateOpen) return '';
  const tmpl=TEMPLATES.find(t=>t.id===S.templateId);
  if(!tmpl) return '';
  const escaped=tmpl.content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `
  <div style="position:fixed;inset:0;z-index:50;background:rgba(13,27,77,.22);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;" id="tmpl-overlay">
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 24px 70px rgba(13,27,77,.24);width:min(720px,96vw);height:min(860px,94vh);display:flex;flex-direction:column;overflow:hidden;">
      <div style="display:flex;align-items:center;padding:20px 28px;border-bottom:1px solid var(--border);flex:none;gap:14px;">
        <div style="flex:1;">
          <div style="display:flex;align-items:center;gap:9px;margin-bottom:3px;">
            ${(()=>{
              const typeMap={note:{icon:I.note,color:'var(--good)',soft:'var(--good-soft)',label:'Visit notes'},referral:{icon:I.referral,color:'var(--info)',soft:'var(--info-soft)',label:'Referrals'}};
              const m=typeMap[tmpl.type]||typeMap.note;
              return `<span style="display:inline-flex;align-items:center;gap:6px;padding:4px 11px;border-radius:20px;background:${m.soft};color:${m.color};font-size:12px;font-weight:700;">${m.icon.replace('stroke="currentColor"',`stroke="${m.color}"`).replace(/width="\d+"/,'width="13"').replace(/height="\d+"/,'height="13"')} @ ${m.label}</span>`;
            })()}
          </div>
          <div style="font-size:17px;font-weight:800;letter-spacing:-.02em;color:var(--text);">${tmpl.label}</div>
        </div>
        <button data-action="tmpl-copy" style="padding:9px 18px;border-radius:10px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:13px;font-weight:600;cursor:pointer;" id="tmpl-copy-btn">Copy</button>
        <button data-action="tmpl-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">×</button>
      </div>
      <div style="flex:1;overflow-y:auto;padding:28px 32px;">
        <pre style="font-family:'JetBrains Mono',monospace;font-size:12.5px;line-height:1.8;color:var(--text);white-space:pre-wrap;word-break:break-word;margin:0;">${escaped}</pre>
      </div>
    </div>
  </div>`;
}

function renderMem(){

  const emptyCard=(icon,title,desc)=>`
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:72px 24px;text-align:center;">
      <div style="width:52px;height:52px;border-radius:16px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;">
        ${icon.replace(/stroke="currentColor"/g,'stroke="var(--accent)"')}
      </div>
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px;">${title}</div>
        <div style="font-size:13px;color:var(--text-3);max-width:300px;line-height:1.6;">${desc}</div>
      </div>
      <button style="margin-top:4px;padding:10px 22px;border-radius:11px;background:var(--accent);color:#fff;font-size:13.5px;font-weight:700;cursor:pointer;border:none;opacity:.85;">Coming soon</button>
    </div>`;

  // ── Templates tab: Followup Call management ──────────────────────────────
  const allFtTemplates=[...CALL_TEMPLATES.map(t=>({...t,_builtin:true})),...S.userFtTemplates];
  const phoneIcon=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>`;

  let templatesBody='';
  if(S.ftDetailId!==null){
    // ── Detail view ──────────────────────────────────────────────────────
    const tmpl=allFtTemplates.find(t=>t.id===S.ftDetailId)||allFtTemplates[0];
    const rawLines=(tmpl.rawContent||'').split('\n');
    const formattedContent=rawLines.map(line=>{
      if(!line) return '<div style="height:6px;"></div>';
      const isSectionHeader=line&&!line.startsWith('•')&&!line.startsWith('-')&&line.trim()===line&&rawLines.indexOf(line)>0&&rawLines[rawLines.indexOf(line)-1]==='';
      if(isSectionHeader) return `<div style="font-size:12px;font-weight:700;color:var(--text);margin-top:8px;margin-bottom:2px;">${line}</div>`;
      return `<div style="font-size:13px;color:var(--text-2);">${line}</div>`;
    }).join('');

    templatesBody=`
    <div style="padding:0;">
      <div style="padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:var(--panel-2);">
        <button data-action="ft-back" style="display:flex;align-items:center;gap:5px;font-size:12.5px;font-weight:600;color:var(--text-3);cursor:pointer;background:none;border:none;">${I.back.replace('stroke="currentColor"','stroke="var(--text-3)"')} Back</button>
        <span style="display:inline-flex;align-items:center;gap:6px;padding:4px 11px;border-radius:20px;background:var(--accent-soft);color:var(--accent);font-size:12px;font-weight:700;">${phoneIcon.replace('stroke="currentColor"','stroke="var(--accent)"')} @ Followup Call</span>
        <span style="font-size:13.5px;font-weight:700;color:var(--text);">${tmpl.title}</span>
      </div>
      <div style="display:flex;gap:0;height:100%;">
        <!-- Template content preview -->
        <div style="flex:1;padding:24px 28px;border-right:1px solid var(--border);">
          <div style="margin-bottom:16px;">
            <div style="font-size:16px;font-weight:800;color:var(--text);border-bottom:2px solid var(--accent);padding-bottom:10px;margin-bottom:14px;">${tmpl.num ? tmpl.num+'. '+tmpl.title : tmpl.title}</div>
            <div style="font-family:inherit;line-height:1.8;">${formattedContent}</div>
          </div>
        </div>
        <!-- Prompt panel -->
        <div style="width:300px;flex:none;padding:20px;">
          <div style="font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);margin-bottom:10px;">Prompt</div>
          <div style="padding:14px 16px;border:1px solid var(--border);border-radius:11px;background:var(--panel-2);font-size:13px;color:var(--text-2);line-height:1.65;">${(tmpl.prompt||'').replace(/\n/g,'<br>')}</div>
        </div>
      </div>
    </div>`;
  } else {
    // ── List view ────────────────────────────────────────────────────────
    const cards=allFtTemplates.map(t=>`
      <button data-action="ft-detail:${t.id}" class="action-card"
        style="display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid var(--border);border-radius:13px;background:var(--panel-2);text-align:left;cursor:pointer;transition:all .15s;width:100%;">
        <div style="width:36px;height:36px;border-radius:10px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;flex:none;font-size:11px;font-weight:800;color:var(--accent);">${t.num||'+'}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13.5px;font-weight:700;color:var(--text);">${t.title}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:2px;">${t.hint||''}</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </button>`).join('');

    templatesBody=`
    <div style="padding:24px;">
      <div style="margin-bottom:12px;">
        <span style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;background:var(--accent-soft);color:var(--accent);font-size:12px;font-weight:700;">
          ${phoneIcon.replace('stroke="currentColor"','stroke="var(--accent)"')} @ Followup Call
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">${cards}</div>
      <button data-action="ft-create-open"
        style="display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px;border-radius:13px;border:1.5px dashed var(--border);background:transparent;color:var(--text-3);font-size:13.5px;font-weight:600;cursor:pointer;transition:all .15s;">
        ${I.plus} Create Template
      </button>
    </div>`;
  }

  return `
  <div style="padding:36px 32px 70px;max-width:820px;margin:0 auto;width:100%;">
    <div style="border:1px solid var(--border);border-radius:16px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">
      ${templatesBody}
    </div>
  </div>`;
}

// ── Patients list view ────────────────────────────────────────────────────
function renderPatients(){
  const q=S.pq.toLowerCase();
  const statusMeta={
    'ready':    {label:'Ready to Bill', color:'var(--good)',   bg:'var(--good-soft)'},
    'in-progress':{label:'In Progress', color:'var(--ready)',  bg:'var(--ready-soft)'},
    'needs-call':{label:'Needs Call',   color:'var(--text-3)', bg:'var(--panel-2)'},
  };

  // filter
  let list=PATIENTS.filter(p=>{
    if(q && !p.name.toLowerCase().includes(q)) return false;
    if(S.ptStatus!=='all' && p.ccmStatus!==S.ptStatus) return false;
    if(S.ptProvider!=='all' && p.provider!==S.ptProvider) return false;
    return true;
  });

  // sort
  if(S.ptSort==='min-desc') list=[...list].sort((a,b)=>b.minutesThisMonth-a.minutesThisMonth);
  else if(S.ptSort==='min-asc') list=[...list].sort((a,b)=>a.minutesThisMonth-b.minutesThisMonth);
  else if(S.ptSort==='last-call') list=[...list].sort((a,b)=>new Date(b.lastCall)-new Date(a.lastCall));
  else list=[...list].sort((a,b)=>a.name.localeCompare(b.name));

  const pill=(label,act,active)=>`<button data-action="${act}" style="padding:5px 12px;border-radius:99px;font-size:12px;font-weight:600;border:1px solid ${active?'var(--accent)':'var(--border)'};background:${active?'var(--accent-soft)':'transparent'};color:${active?'var(--accent)':'var(--text-3)'};cursor:pointer;transition:all .15s;">${label}</button>`;

  const statusPills=[
    pill('All',         'pt-status:all',         S.ptStatus==='all'),
    pill('Ready to Bill','pt-status:ready',       S.ptStatus==='ready'),
    pill('In Progress', 'pt-status:in-progress',  S.ptStatus==='in-progress'),
    pill('Needs Call',  'pt-status:needs-call',   S.ptStatus==='needs-call'),
  ].join('');

  const providerPills=[
    pill('All',    'pt-provider:all',     S.ptProvider==='all'),
    pill('Sam',    'pt-provider:Sam',     S.ptProvider==='Sam'),
    pill('Davis',  'pt-provider:Davis',   S.ptProvider==='Davis'),
    pill('Richard','pt-provider:Richard', S.ptProvider==='Richard'),
  ].join('');

  const sortPills=[
    pill('Name',      'pt-sort:name',     S.ptSort==='name'),
    pill('Min ↓',     'pt-sort:min-desc', S.ptSort==='min-desc'),
    pill('Min ↑',     'pt-sort:min-asc',  S.ptSort==='min-asc'),
    pill('Last Call', 'pt-sort:last-call',S.ptSort==='last-call'),
  ].join('');

  const rows=list.map(p=>{
    const sm=statusMeta[p.ccmStatus]||statusMeta['needs-call'];
    const minColor=p.minutesThisMonth>=20?'var(--good)':p.minutesThisMonth>=10?'var(--ready)':'var(--danger)';
    return `
    <div class="table-row" data-action="patient:${p.id}" style="display:flex;align-items:center;padding:13px 20px;border-bottom:1px solid var(--border);transition:background .14s;gap:0;">
      <span style="flex:1;display:flex;align-items:center;gap:12px;min-width:0;">
        <span style="width:34px;height:34px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex:none;">${initials(p.name)}</span>
        <span style="font-size:13.5px;font-weight:600;">${p.name}</span>
      </span>
      <span style="width:110px;font-size:13px;font-weight:700;color:var(--text);">${p.provider}</span>
      <span style="width:100px;text-align:center;">
        <span style="font-size:14px;font-weight:800;color:${minColor};">${p.minutesThisMonth}</span>
        <span style="font-size:11px;color:var(--text-3);"> min</span>
      </span>
      <span style="width:130px;text-align:center;">
        <span style="font-size:11.5px;font-weight:700;color:${sm.color};background:${sm.bg};padding:4px 10px;border-radius:99px;">${sm.label}</span>
      </span>
      <span style="width:100px;text-align:right;font-size:12px;color:var(--text-3);">${p.lastCall.replace(', 2026','')}</span>
    </div>`}).join('');

  return `
  <div style="padding:20px 30px 70px;max-width:1100px;margin:0 auto;width:100%;">
    <!-- Header row -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
      <h1 style="font-size:20px;font-weight:800;letter-spacing:-.02em;color:var(--text);margin:0;">Patients</h1>
      <div style="display:flex;align-items:center;gap:8px;padding:7px 13px;border:1px solid var(--border);border-radius:10px;background:var(--panel);">
        ${I.search}<input id="pq-input" value="${S.pq}" placeholder="Search patients…" style="border:none;background:transparent;color:var(--text);font-size:13px;font-family:inherit;outline:none;width:170px;"/>
      </div>
    </div>

    <!-- Filter bar -->
    <div style="display:flex;flex-direction:column;gap:8px;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:var(--panel);margin-bottom:14px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);width:64px;flex:none;">Status</span>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">${statusPills}</div>
      </div>
      <div style="height:1px;background:var(--border);"></div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);width:64px;flex:none;">Provider</span>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">${providerPills}</div>
      </div>
      <div style="height:1px;background:var(--border);"></div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);width:64px;flex:none;">Sort by</span>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">${sortPills}</div>
      </div>
    </div>

    <!-- Table -->
    <div style="border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">
      <div style="display:flex;align-items:center;padding:10px 20px;border-bottom:1px solid var(--border);background:var(--panel-2);">
        <span style="flex:1;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Patient</span>
        <span style="width:110px;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Provider</span>
        <span style="width:100px;text-align:center;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Min / Mo</span>
        <span style="width:130px;text-align:center;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Status</span>
        <span style="width:100px;text-align:right;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Last Call</span>
      </div>
      ${rows||`<div style="padding:36px;text-align:center;font-size:13.5px;color:var(--text-3);">No patients match the current filter.</div>`}
    </div>
  </div>`;
}

// ── Patient detail view ───────────────────────────────────────────────────
function renderPatient(){
  const p=PATIENTS.find(pt=>pt.id===S.patientId); if(!p) return '';
  const statusMeta={
    'ready':    {label:'Ready to Bill', color:'var(--good)',   bg:'var(--good-soft)'},
    'in-progress':{label:'In Progress', color:'var(--ready)',  bg:'var(--ready-soft)'},
    'needs-call':{label:'Needs Call',   color:'var(--text-3)', bg:'var(--panel-2)'},
  };
  const sm=statusMeta[p.ccmStatus]||statusMeta['needs-call'];
  const totalMin=p.activities.reduce((s,a)=>s+a.minutes,0);

  const actRows=p.activities.length
    ? p.activities.map(a=>`
      <div style="display:flex;align-items:flex-start;padding:11px 16px;border-bottom:1px solid var(--border);gap:12px;">
        <div style="width:52px;flex:none;padding-top:1px;">
          <div style="font-size:11px;font-weight:600;color:var(--text-3);">${a.date}</div>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;color:var(--text);line-height:1.4;">${a.desc}</div>
          <div style="font-size:11.5px;color:var(--text-3);margin-top:2px;">${a.staff}</div>
        </div>
        <div style="flex:none;text-align:right;">
          <div style="font-size:13px;font-weight:700;color:var(--accent);">${a.minutes} min</div>
          <div style="font-size:10px;padding:2px 6px;border-radius:99px;margin-top:2px;font-weight:600;${a.clinical?'background:var(--accent-soft);color:var(--accent);':'background:var(--panel-2);color:var(--text-3);'}">${a.clinical?'Clinical':'Admin'}</div>
        </div>
      </div>`).join('')
    : `<div style="padding:24px;text-align:center;font-size:13px;color:var(--text-3);">No CCM activity this month.</div>`;

  return `
  <div style="padding:24px 30px 70px;max-width:1140px;margin:0 auto;width:100%;">
    <!-- Header -->
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:18px;gap:20px;">
      <div style="display:flex;align-items:center;gap:13px;">
        <span style="width:44px;height:44px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;flex:none;">${initials(p.name)}</span>
        <div>
          <h1 style="font-size:21px;font-weight:800;letter-spacing:-.02em;margin:0;">${p.name}</h1>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex:none;">
        <button data-action="billing-open" style="display:flex;align-items:center;gap:6px;padding:9px 15px;border-radius:10px;border:1.5px solid var(--accent-line);background:var(--accent-soft);color:var(--accent);font-size:12.5px;font-weight:700;cursor:pointer;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
          Billing Code Match
        </button>
        <button data-action="care-plan-open" style="display:flex;align-items:center;gap:6px;padding:9px 15px;border-radius:10px;background:var(--accent-2);color:#fff;font-size:12.5px;font-weight:700;cursor:pointer;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Fill Call Template
        </button>
      </div>
    </div>

    <!-- Status strip -->
    <div style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
      <div style="display:flex;align-items:center;gap:7px;padding:7px 14px;border-radius:9px;border:1px solid var(--border);background:var(--panel-2);">
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Status</span>
        <span style="font-size:12px;font-weight:700;color:${sm.color};background:${sm.bg};padding:2px 9px;border-radius:99px;">${sm.label}</span>
      </div>
      <div style="display:flex;align-items:center;gap:7px;padding:7px 14px;border-radius:9px;border:1px solid var(--border);background:var(--panel-2);">
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">CCM Min</span>
        <span style="font-size:14px;font-weight:800;color:${totalMin>=20?'var(--good)':'var(--ready)'};">${totalMin}</span>
      </div>
    </div>

    <!-- Two-column layout -->
    <div style="display:flex;gap:18px;align-items:flex-start;">
      <!-- Left: raw chart note -->
      <div style="flex:1;min-width:0;">
        <div style="border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">
          <div style="padding:11px 18px;border-bottom:1px solid var(--border);background:var(--panel-2);display:flex;align-items:center;gap:8px;">
            <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Patient Chart</span>
            <span style="font-size:10px;color:var(--text-3);padding:2px 7px;border:1px solid var(--border);border-radius:5px;">eMDs</span>
          </div>
          <div style="padding:20px 22px;font-family:'SF Mono','Menlo','Consolas',monospace;font-size:12.5px;line-height:1.8;color:var(--text-2);">
            <div style="font-size:14px;font-weight:700;color:var(--text);letter-spacing:.01em;margin-bottom:2px;">${p.name.toUpperCase()}</div>
            <div style="color:var(--text-3);margin-bottom:16px;">DOB: ${p.dob}  |  ${p.sex}  |  Age ${p.age}  |  MRN: ${p.mrn}  |  ${p.plan}</div>

            <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--text-3);margin-bottom:6px;">Active Problems</div>
            <div style="margin-bottom:16px;">${p.conditions.map((c,i)=>`${i+1}. ${c}`).join('<br>')}</div>

            <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--text-3);margin-bottom:6px;">Current Medications</div>
            <div style="margin-bottom:16px;">${p.medications.map(m=>`- ${m}`).join('<br>')}</div>

            <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--text-3);margin-bottom:6px;">Last Recorded Vitals</div>
            <div>BP: ${p.vitals.bp}  |  HR: ${p.vitals.hr} bpm  |  Temp: ${p.vitals.temp}  |  Wt: ${p.vitals.weight}  |  A1c: ${p.vitals.a1c}</div>
          </div>
        </div>
      </div>

      <!-- Right: CCM activity log + Work Items Done -->
      <div style="flex:none;width:360px;display:flex;flex-direction:column;gap:14px;">
        <div style="border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">
          <div style="padding:11px 16px;border-bottom:1px solid var(--border);background:var(--panel-2);display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">CCM Activity Log</span>
            <span style="font-size:12px;font-weight:700;color:var(--accent);">${totalMin} min</span>
          </div>
          ${actRows}
        </div>

        ${(()=>{
          const done=S.completedWork.filter(w=>w.patientId===p.id);
          if(done.length===0) return '';
          return `
        <div style="border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">
          <div style="padding:11px 16px;border-bottom:1px solid var(--border);background:var(--panel-2);display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Work Items Done</span>
            <span style="font-size:11px;font-weight:700;color:var(--accent);background:var(--accent-soft);padding:2px 8px;border-radius:99px;">${done.length}</span>
          </div>
          ${done.map(w=>{
            const isBilling=w.type==='billing';
            const savedRv=w.savedReview||{};
            const acceptedKeys=Object.entries(savedRv).filter(([,v])=>v==='accepted').map(([k])=>k);
            const rejectedKeys=Object.entries(savedRv).filter(([,v])=>v==='rejected').map(([k])=>k);
            const acceptedCPT=acceptedKeys.filter(k=>CPT_RATES[k]);
            const acceptedICD=acceptedKeys.filter(k=>!CPT_RATES[k]);
            const codeChips=isBilling?[
              ...acceptedCPT.map(k=>`<span style="display:inline-block;padding:1px 6px;border-radius:4px;background:rgba(26,122,16,.1);border:1px solid rgba(26,122,16,.25);font-size:9.5px;font-weight:800;font-family:monospace;color:#1a7a10;margin-right:3px;">${k}</span>`),
              acceptedICD.length?`<span style="display:inline-block;padding:1px 6px;border-radius:4px;background:rgba(29,78,216,.08);border:1px solid rgba(29,78,216,.2);font-size:9.5px;font-weight:700;color:#1d4ed8;margin-right:3px;">+${acceptedICD.length} ICD</span>`:'',
            ].join(''):'';
            return `
          <button data-action="wi-view:${w.id}" style="display:flex;align-items:flex-start;padding:12px 14px;border-bottom:1px solid var(--border);gap:10px;width:100%;text-align:left;cursor:pointer;background:transparent;transition:background .12s;" class="action-card">
            <div style="width:30px;height:30px;border-radius:8px;background:${isBilling?'var(--good-soft)':'var(--accent-soft)'};display:flex;align-items:center;justify-content:center;flex:none;margin-top:1px;">
              ${isBilling
                ?`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--good)" stroke-width="2.3"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>`
                :`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.3"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`}
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:12.5px;font-weight:700;color:var(--text);margin-bottom:4px;">
                ${isBilling?'Billing Code Match':w.templateTitle}
              </div>
              ${isBilling&&codeChips?`<div style="margin-bottom:4px;line-height:1.8;">${codeChips}</div>`:''}
              ${!isBilling?`<div style="display:flex;align-items:center;gap:5px;margin-bottom:3px;"><span style="font-size:9.5px;font-weight:800;color:#6366f1;background:rgba(99,102,241,.1);padding:1px 7px;border-radius:5px;font-family:monospace;">${w.templateNum}</span><span style="font-size:11.5px;color:var(--text-2);font-weight:600;">${w.templateTitle||'Call Template'}</span></div>`:''}
              ${isBilling&&codeChips?`<div style="margin-bottom:4px;line-height:1.8;">${codeChips}</div>`:''}
              ${isBilling&&w.revenue&&w.revenue!=='—'?`<div style="font-size:12px;font-weight:700;color:var(--good);">${w.revenue}<span style="font-size:10px;font-weight:500;color:var(--text-3);margin-left:3px;">/ mo</span></div>`:''}
              ${isBilling?`<div style="font-size:9.5px;color:var(--text-3);margin-top:3px;">${acceptedKeys.length} accepted · ${rejectedKeys.length} rejected · ${w.date}</div>`
              :`<div style="font-size:10px;color:var(--text-3);margin-top:2px;">${w.date}</div>`}
            </div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2" style="flex:none;margin-top:4px;"><path d="m9 18 6-6-6-6"/></svg>
          </button>`;
          }).join('')}
        </div>`;
        })()}
      </div>
    </div>
  </div>`;
}

// ── Billing static content ────────────────────────────────────────────────
const VISIT_TRANSCRIPT=`[0:04] Hello, my name is Jamie Ellis, I'm one of the GP registrars here and I'm just going to find out a little bit about the problem you've come in with. Will that be alright?
[0:22] Well, I've been getting some diarrhoea really, for the last sort of two or three weeks. Before that, no problems.
[0:52] It's runnier, looser than normal. I don't think there's any change in colour. But I'm going a lot more often. Do you have any blood in it at all? Yes — it's worrying me. Is it difficult to flush? No. Any undigested food? No.
[1:22] How many times a day? Probably up to about eight times — yesterday was about eight. Do you have to get up at night? Yes, and I've never had to before. I'm losing sleep over it.
[1:49] Any tummy pain? Yes, crampy, mainly just before I go to the toilet, eases afterwards. Eating can make it worse. Around the middle — about a four out of ten.
[2:58] Any difficulty chewing, mouth ulcers, difficulty swallowing? No. Any headaches? Occasional headaches for a few years, not getting worse. I sometimes get weakness in my arm with a headache. Any chest or waterworks problems? No.
[4:27] Any skin problems? I've had a rash that comes and goes. No joint problems. Periods? I'm on the pill, regular, no changes.
[5:18] Any weight loss? I think I probably have lost weight — my trousers feel looser. I don't weigh myself so not sure how much.
[5:41] Operations? Yes, appendix removed at fifteen. Medications: the pill and paracetamol. No allergies except penicillin — I get a rash.
[6:56] Working? Yes, I'm a teaching assistant. Has this affected work? I've been worried about passing it to the children if it's an infection.
[8:01] Alcohol? Not much during the week, but at weekends roughly twenty units — above recommended. Who's at home? I live with my partner, Sam.
[9:19] Family history? My aunt had something to do with her tummy but I'm not sure what — not cancer. What do you think is going on? Probably an infection. Other concerns? A friend's sister has bowel cancer and she's only thirty, so the bleeding has really worried me.
[10:25] Tests needed? Some tests, I think. And I'm hoping I won't need a colonoscopy. Recent travel? Not recently — I went to South Africa and Zimbabwe about three years ago. Fine while there.`;

const REFERRAL_LETTER=`Orthopedic Referral Letter
Date: 2026-03-06

Referring Clinician: Primary Care Clinic, Copenhagen, Denmark

Re: Referral to Orthopedic Clinic — Evaluation of Chronic Knee Pain

Dear Orthopedic Colleague,

I am referring a 62-year-old male patient for orthopedic evaluation of persistent right knee pain and functional limitation.

History of Present Illness:
The patient reports progressive right knee pain for approximately 8 months. The pain is described as aching with intermittent sharp exacerbations during weight-bearing activities such as walking, stair climbing, and rising from a seated position. Symptoms have gradually worsened and now limit daily activities, including walking distances greater than 500 meters.

He also reports morning stiffness lasting approximately 20–30 minutes and occasional swelling of the knee joint. There is no history of acute trauma, locking, or mechanical instability. OTC analgesics (paracetamol and intermittent NSAIDs) provide only partial relief.

Past Medical History: Hypertension, Hyperlipidemia
Medications: Lisinopril 10mg daily, Atorvastatin 20mg daily, Paracetamol PRN

Physical Examination (2026-03-01):
- Mild joint effusion of the right knee
- Tenderness along the medial joint line
- Reduced range of motion due to pain
- No ligamentous instability detected
- Antalgic gait observed

Investigations:
Plain radiographs of the right knee (2026-02-25) demonstrate medial compartment joint space narrowing with osteophyte formation consistent with degenerative osteoarthritis.

Assessment: Chronic right knee pain consistent with medial compartment osteoarthritis.

Reason for Referral: Given persistent symptoms despite conservative measures, evaluation for advanced nonoperative therapies or possible surgical intervention.

Please let me know if any additional information is required.

Kind regards, Primary Care Clinician — Copenhagen, Denmark`;

// ── Billing Code Match Overlay ────────────────────────────────────────────
function renderBillingMatchOverlay(){
  if(!S.billingOpen) return '';
  const p=PATIENTS.find(pt=>pt.id===S.patientId); if(!p) return '';
  const cl=currentClinic();
  const totalMin=p.activities.reduce((s,a)=>s+a.minutes,0);
  const phase=S.billingPhase; // 'input' | 'running' | 'done'

  // ── CPT billing codes ──
  const cptCodes=[];
  if(totalMin>=60){
    cptCodes.push({cpt:'99487',desc:'Complex Chronic Care Management',sub:'60+ min/month · 2+ complex conditions',rate:132.93,eligible:true,evidence:[`"${p.conditions.slice(0,2).join(', ')}"`,`"Total documented: ${totalMin} minutes this month"`],alts:['99490 — Standard CCM (20+ min)','99491 — CCM, physician direct time']});
    const ao=Math.floor((totalMin-60)/30);
    for(let i=0;i<Math.min(ao,2);i++) cptCodes.push({cpt:'99489',desc:'Complex CCM Add-on',sub:`Add-on 30-min block #${i+1}`,rate:68.02,eligible:true,evidence:[`"${totalMin} total minutes across ${p.activities.length} encounters"`],alts:['99439 — Standard CCM add-on']});
  } else if(totalMin>=20){
    cptCodes.push({cpt:'99490',desc:'Chronic Care Management',sub:'20+ min/month · standard CCM',rate:62.71,eligible:true,evidence:[`"${p.conditions[0]}"`,`"Total documented: ${totalMin} minutes"`],alts:['99487 — Complex CCM (60+ min)']});
    const ao=Math.min(2,Math.floor((totalMin-20)/20));
    for(let i=0;i<ao;i++) cptCodes.push({cpt:'99439',desc:'CCM Add-on',sub:'Each additional 20 min (max 2)',rate:47.34,eligible:true,evidence:[`"${p.activities[i]?p.activities[i].desc.slice(0,50)+'…':'Follow-up documented'}"`],alts:['99489 — Complex CCM add-on']});
  } else {
    cptCodes.push({cpt:'99490',desc:'Chronic Care Management',sub:`Need ${20-totalMin} more minutes`,rate:62.71,eligible:false,evidence:[],alts:[]});
  }
  const totalRev=cptCodes.filter(c=>c.eligible).reduce((s,c)=>s+c.rate,0);

  // ── ICD-10 map from condition keywords (with HCC + annual risk value) ──
  const ICD_MAP=[
    {k:'diabetes',    code:'E11.9', desc:'Type 2 diabetes mellitus without complications',hcc:'HCC 19', val:1418,  alts:['E11.65 — with hyperglycemia','E11.40 — with diabetic neuropathy']},
    {k:'hypertension',code:'I10',   desc:'Essential (primary) hypertension',              hcc:null,    val:null,  alts:['I13.10 — Hypertensive heart and CKD']},
    {k:'chronic kidney',code:'N18.3',desc:'Chronic kidney disease, stage 3',             hcc:'HCC 137',val:2836, alts:['N18.4 — CKD stage 4','N18.32 — CKD stage 3b']},
    {k:'heart failure',code:'I50.20',desc:'Unspecified systolic heart failure (HFrEF)',  hcc:'HCC 85', val:3922,  alts:['I50.32 — Chronic systolic HF','I50.9 — Unspecified HF']},
    {k:'atrial fibrillation',code:'I48.91',desc:'Unspecified atrial fibrillation',       hcc:'HCC 96', val:3315,  alts:['I48.11 — Longstanding persistent AFib']},
    {k:'copd',        code:'J44.1', desc:'COPD with (acute) exacerbation',               hcc:'HCC 111',val:3901,  alts:['J44.0 — COPD with acute lower resp. infection']},
    {k:'coronary artery',code:'I25.10',desc:'Atherosclerotic heart disease, native vessel',hcc:'HCC 88',val:1753, alts:['I25.110 — With unstable angina']},
    {k:'peripheral artery',code:'I73.9',desc:'Peripheral vascular disease, unspecified', hcc:'HCC 108',val:1607, alts:['I70.209 — Atherosclerosis of native arteries']},
    {k:'hyperlipidemia',code:'E78.5',desc:'Hyperlipidemia, unspecified',                 hcc:null,    val:null,  alts:['E78.00 — Pure hypercholesterolemia']},
    {k:'hypothyroidism',code:'E03.9',desc:'Hypothyroidism, unspecified',                 hcc:null,    val:null,  alts:['E06.3 — Autoimmune thyroiditis']},
    {k:'osteoporosis',code:'M81.0', desc:'Age-related osteoporosis without fracture',    hcc:null,    val:null,  alts:['M80.00XA — with fracture']},
    {k:'osteoarthritis',code:'M19.90',desc:'Primary osteoarthritis, unspecified site',  hcc:null,    val:null,  alts:['M17.11 — Right knee OA']},
    {k:'cognitive',   code:'G31.84',desc:'Mild cognitive impairment, so stated',        hcc:'HCC 52', val:2204,  alts:['F06.70 — Neurocognitive disorder']},
  ];
  const icdChart=[];
  p.conditions.forEach(cond=>{
    const match=ICD_MAP.find(m=>cond.toLowerCase().includes(m.k));
    if(match && !icdChart.find(x=>x.code===match.code)){
      icdChart.push({...match,source:'Patient Chart',evidence:[`"${cond}"`]});
    }
  });

  // ── Codes from Visit Transcript (if added) ──
  const hasTranscript=S.billingInputs.some(x=>x.type==='transcript');
  const icdTranscript=hasTranscript?[
    {code:'K59.1', desc:'Functional diarrhea',          hcc:null,      val:null, source:'Visit Transcript',evidence:['"Getting diarrhoea for two to three weeks — up to eight times a day"'],alts:['K58.0 — IBS with diarrhea','K57.30 — Diverticulosis']},
    {code:'K92.1', desc:'Melena / rectal bleeding',     hcc:'HCC 188', val:960,  source:'Visit Transcript',evidence:['"Blood in stool — worrying me. Difficult to flush? No."'],alts:['K62.5 — Hemorrhoidal disease','K63.5 — Polyp of colon']},
    {code:'R63.4', desc:'Abnormal weight loss',         hcc:null,      val:null, source:'Visit Transcript',evidence:['"My trousers feel looser — lost weight in the last few weeks"'],alts:['R64 — Cachexia']},
    {code:'R10.9', desc:'Unspecified abdominal pain',   hcc:null,      val:null, source:'Visit Transcript',evidence:['"Crampy pain before toilet, eases afterwards — 4/10"'],alts:['K58.9 — IBS without diarrhea']},
  ]:[];

  // ── Codes from Referral Letter (if added) ──
  const hasReferral=S.billingInputs.some(x=>x.type==='referral');
  const icdReferral=hasReferral?[
    {code:'M17.11', desc:'Primary osteoarthritis, right knee', hcc:null,      val:null, source:'Referral Letter',evidence:['"Medial compartment joint space narrowing with osteophyte formation consistent with degenerative OA"'],alts:['M17.31 — Secondary OA, right knee']},
    {code:'M25.361',desc:'Stiffness of right knee, NEC',       hcc:null,      val:null, source:'Referral Letter',evidence:['"Morning stiffness 20–30 minutes, occasional swelling"'],alts:['M25.369 — Stiffness of unspecified knee']},
    {code:'R26.9',  desc:'Abnormal gait / functional limitation',hcc:null,    val:null, source:'Referral Letter',evidence:['"Antalgic gait observed; cannot walk >500 meters"'],alts:['R26.89 — Other abnormalities of gait']},
    {code:'I10',    desc:'Essential hypertension (comorbidity)', hcc:null,     val:null, source:'Referral Letter',evidence:['"Past Medical History: Hypertension — Lisinopril 10 mg daily"'],alts:['I13.10 — Hypertensive heart and CKD']},
  ]:[];

  // ── Source colors ──
  const srcColor={
    'Patient Chart': {bg:'rgba(29,78,216,.09)',border:'rgba(29,78,216,.3)',text:'#1d4ed8',badge:'#1d4ed8'},
    'Visit Transcript':{bg:'rgba(124,58,237,.09)',border:'rgba(124,58,237,.3)',text:'#7c3aed',badge:'#7c3aed'},
    'Referral Letter': {bg:'rgba(217,119,6,.09)',border:'rgba(217,119,6,.3)',text:'#d97706',badge:'#d97706'},
  };

  const totalCodeCount=cptCodes.length+icdChart.length+icdTranscript.length+icdReferral.length;

  // ── Chart HTML (raw = no highlights, used during input/running) ──
  const line=(t,dim)=>`<div style="font-family:'SF Mono',ui-monospace,monospace;font-size:11.5px;line-height:1.8;color:${dim?'#bbb':'#333'};min-height:1.1em;white-space:pre-wrap;">${t||'&nbsp;'}</div>`;
  const chartRawLines=[
    line(`&lt;CCM_CHART  patient="${p.mrn}"&gt;`,true),
    line(`Date: ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'2-digit',day:'2-digit'})}  |  Provider: ${p.provider}`,true),
    line(''),
    line(`<span style="color:#1a56cc;font-weight:700;">Chief Complaint:</span> ${p.conditions[0]||'Chronic condition management'} follow-up`),
    line(''),
    line(`<span style="color:#555;font-weight:600;">Patient:</span>  ${p.name}   DOB: ${p.dob}   ${p.age}yo ${p.sex}`),
    line(`<span style="color:#555;font-weight:600;">MRN:</span>     ${p.mrn}   Insurance: Medicare   Clinic: ${cl.short}`),
    line(''),
    line(`<span style="color:#1a56cc;font-weight:700;">Past Medical History:</span>`),
    ...p.conditions.map(c=>line(`  — ${c}`)),
    line(''),
    line(`<span style="color:#1a56cc;font-weight:700;">Current Medications:</span>`),
    ...p.medications.map(m=>line(`  — ${m}`)),
    line(''),
    line(`<span style="color:#1a56cc;font-weight:700;">CCM Activity Log — ${new Date().toLocaleString('en-US',{month:'long',year:'numeric'})}:</span>`),
    ...p.activities.map(a=>line(`  [${a.date}]  ${a.desc.length>54?a.desc.slice(0,54)+'…':a.desc}  —  ${a.minutes} min`)),
    ...(p.activities.length===0?[line(`  No activities recorded this month`)]:[]),
    line(''),
    line(`Total Documented: ${totalMin} minutes this month   (threshold: 20 min = eligible)`),
    line(''),
    line(`&lt;/CCM_CHART&gt;`,true),
  ];
  const chartHtmlRaw=chartRawLines.join('');

  // ── Chart HTML (highlighted = shown in done phase, highlights fade in) ──
  const mkHL=(text,delay=0)=>`<mark style="background:rgba(80,180,40,.22);color:#1a6b10;font-weight:700;border-radius:3px;padding:0 3px;animation:hl-appear .4s ease ${delay}s both;">${text}</mark>`;
  let hlDelay=0;
  const chartHLLines=[
    line(`&lt;CCM_CHART  patient="${p.mrn}"&gt;`,true),
    line(`Date: ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'2-digit',day:'2-digit'})}  |  Provider: ${p.provider}`,true),
    line(''),
    line(`<span style="color:#1a56cc;font-weight:700;">Chief Complaint:</span> ${p.conditions[0]||'Chronic condition management'} follow-up`),
    line(''),
    line(`<span style="color:#555;font-weight:600;">Patient:</span>  ${p.name}   DOB: ${p.dob}   ${p.age}yo ${p.sex}`),
    line(`<span style="color:#555;font-weight:600;">MRN:</span>     ${p.mrn}   Insurance: Medicare   Clinic: ${cl.short}`),
    line(''),
    line(`<span style="color:#1a56cc;font-weight:700;">Past Medical History:</span>`),
    ...p.conditions.map(c=>line(`  — ${mkHL(c,(hlDelay+=.08).toFixed(2))}`)),
    line(''),
    line(`<span style="color:#1a56cc;font-weight:700;">Current Medications:</span>`),
    ...p.medications.map(m=>line(`  — ${m}`)),
    line(''),
    line(`<span style="color:#1a56cc;font-weight:700;">CCM Activity Log — ${new Date().toLocaleString('en-US',{month:'long',year:'numeric'})}:</span>`),
    ...p.activities.map(a=>line(`  [${a.date}]  ${a.desc.length>54?a.desc.slice(0,54)+'…':a.desc}  —  ${mkHL(a.minutes+' min',(hlDelay+=.1).toFixed(2))}`)),
    ...(p.activities.length===0?[line(`  No activities recorded this month`)]:[]),
    line(''),
    line(`${mkHL('Total Documented: '+totalMin+' minutes this month',(hlDelay+=.12).toFixed(2))}   <span style="color:#888;">(threshold: 20 min = eligible)</span>`),
    line(''),
    line(`&lt;/CCM_CHART&gt;`,true),
  ];
  const chartHtmlHL=chartHLLines.join('');

  // ── Input card builder ──
  const mkInputCard=(inp,i,highlighted)=>{
    const styles={
      note:    {accent:'#3b82f6',bg:'rgba(59,130,246,.05)', border:'rgba(59,130,246,.25)'},
      referral:{accent:'#d97706',bg:'rgba(217,119,6,.05)',  border:'rgba(217,119,6,.25)'},
      transcript:{accent:'#7c3aed',bg:'rgba(124,58,237,.05)',border:'rgba(124,58,237,.25)'},
      'audio-loading':{accent:'#7c3aed',bg:'rgba(124,58,237,.05)',border:'rgba(124,58,237,.25)'},
    };
    const s=styles[inp.type]||styles.note;
    const cardBorder=highlighted?`rgba(34,139,24,.35)`:s.border;

    if(inp.type==='audio-loading'){
      return `<div style="border:1.5px solid ${s.border};border-radius:12px;overflow:hidden;background:#fff;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:${s.bg};border-bottom:1px solid ${s.border};">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:7px;height:7px;border-radius:50%;background:${s.accent};flex:none;animation:sap-pulse .8s ease infinite;"></div>
            <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:${s.accent};">Input ${i+2} — Visit Transcript</span>
          </div>
          <button data-action="billing-remove-input:${i}" style="font-size:14px;color:#bbb;background:none;border:none;cursor:pointer;padding:0;">×</button>
        </div>
        <div style="padding:20px 16px;display:flex;flex-direction:column;align-items:center;gap:14px;">
          <div style="display:flex;align-items:center;gap:6px;height:32px;">
            ${Array.from({length:18},(_,k)=>`<div style="width:3px;border-radius:2px;background:${s.accent};opacity:.7;animation:wave-bar .9s ease ${(k*.05).toFixed(2)}s infinite alternate;height:${8+Math.sin(k*.7)*14}px;"></div>`).join('')}
          </div>
          <div style="font-size:12px;color:#7c3aed;font-weight:600;animation:sap-pulse 1.2s ease infinite;">Processing audio transcript…</div>
          <div style="width:100%;height:4px;background:#f0f0f0;border-radius:99px;overflow:hidden;">
            <div style="height:100%;background:${s.accent};border-radius:99px;animation:audio-progress 2.2s ease-out forwards;"></div>
          </div>
        </div>
      </div>`;
    }

    return `<div style="border:1.5px solid ${cardBorder};border-radius:12px;overflow:hidden;background:#fff;transition:border-color .4s;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:${s.bg};border-bottom:1px solid ${s.border};">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:7px;height:7px;border-radius:50%;background:${s.accent};flex:none;"></div>
          <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:${s.accent};">Input ${i+2} — ${inp.label}</span>
        </div>
        <button data-action="billing-remove-input:${i}" style="font-size:14px;color:#bbb;background:none;border:none;cursor:pointer;padding:0;">×</button>
      </div>
      <div style="padding:14px 16px;font-family:'SF Mono',monospace;font-size:11.5px;color:#333;line-height:1.75;white-space:pre-wrap;max-height:190px;overflow-y:auto;">${inp.content.replace(/</g,'&lt;')}</div>
    </div>`;
  };

  // ── Review state helpers ──
  const rv=S.billingReview;
  const reviewStatus=(id)=>rv[id]||'pending';

  // ── Flatten all reviewable codes in order ──
  const allFlat=[
    ...cptCodes.filter(c=>c.eligible).map(c=>({kind:'cpt',id:c.cpt,data:c})),
    ...icdChart.map(c=>({kind:'icd',id:c.code+'Patient Chart',data:{...c,source:'Patient Chart'}})),
    ...icdTranscript.map(c=>({kind:'icd',id:c.code+'Visit Transcript',data:{...c,source:'Visit Transcript'}})),
    ...icdReferral.map(c=>({kind:'icd',id:c.code+'Referral Letter',data:{...c,source:'Referral Letter'}})),
  ];
  const pendingItems=allFlat.filter(x=>reviewStatus(x.id)==='pending');
  const decidedItems=allFlat.filter(x=>reviewStatus(x.id)!=='pending');
  const acceptedCount=decidedItems.filter(x=>reviewStatus(x.id)==='accepted').length;
  const rejectedCount=decidedItems.filter(x=>reviewStatus(x.id)==='rejected').length;
  const pendingCount=pendingItems.length;
  const acceptedCPTRev=cptCodes.filter(c=>c.eligible&&reviewStatus(c.cpt)==='accepted').reduce((s,c)=>s+c.rate,0);

  // ── Source color lookup ──
  const getSC=(source)=>srcColor[source]||srcColor['Patient Chart'];

  // ── Full pending card (large, with evidence + accept/reject buttons) ──
  const mkPendingCard=(item,animIdx)=>{
    const {id,kind,data}=item;
    const isCPT=kind==='cpt';
    const sc=isCPT?{bg:'rgba(34,139,24,.04)',border:'rgba(34,139,24,.25)',badge:'#1a7a10',text:'#1a7a10'}:getSC(data.source);
    const codeLabel=isCPT?data.cpt:data.code;
    const desc=data.desc;
    const sub=isCPT?data.sub:(data.hcc?`${data.hcc} · Risk adjustment`:data.source);
    const valEl=isCPT?`<div style="text-align:right;flex:none;"><div style="font-size:15px;font-weight:800;color:#1a7a10;">$${data.rate.toFixed(2)}</div><div style="font-size:9px;color:#bbb;">/ mo</div></div>`
      :data.val?`<div style="text-align:right;flex:none;"><div style="font-size:14px;font-weight:800;color:${sc.badge};">$${data.val.toLocaleString()}</div><div style="font-size:9px;color:#bbb;">/ yr RAF</div></div>`:'';
    const ev=(data.evidence||[]).map(e=>`<div style="font-size:10.5px;color:#555;font-style:italic;padding:3px 9px;background:${sc.bg};border-radius:6px;border-left:2px solid ${sc.border};margin-bottom:3px;line-height:1.45;">${e}</div>`).join('');
    const altsHtml=(data.alts||[]).map(a=>`<div style="padding:3px 9px;border-radius:5px;border:1px solid #eee;font-size:10.5px;color:#999;margin-bottom:3px;">${a}</div>`).join('');
    return `<div style="border:1.5px solid ${sc.border};border-radius:12px;background:#fff;overflow:hidden;animation:bill-rise .22s ease ${animIdx*.06}s both;box-shadow:0 2px 10px rgba(0,0,0,.06);">
      <div style="display:flex;align-items:center;gap:9px;padding:11px 14px;border-bottom:1px solid #f5f5f5;background:${sc.bg};">
        <div style="padding:3px 8px;border-radius:6px;background:${sc.bg};border:1.5px solid ${sc.border};flex:none;">
          <span style="font-size:10.5px;font-weight:900;font-family:monospace;color:${sc.badge};">${codeLabel}</span>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:12.5px;font-weight:700;color:#111;">${desc}</div>
          <div style="font-size:10px;color:#aaa;margin-top:1px;">${sub}</div>
        </div>
        ${valEl}
      </div>
      ${ev?`<div style="padding:7px 14px;border-bottom:1px solid #f5f5f5;">
        <div style="font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#ccc;margin-bottom:4px;">Evidence</div>${ev}
      </div>`:''}
      ${altsHtml?`<div style="padding:7px 14px;border-bottom:1px solid #f5f5f5;">
        <div style="font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#ccc;margin-bottom:4px;">Alternatives</div>${altsHtml}
      </div>`:''}
      <div style="display:flex;gap:6px;padding:9px 14px;background:#fafafa;">
        <button data-action="billing-accept:${id}" style="flex:1;padding:7px;border-radius:8px;border:1.5px solid rgba(34,139,24,.35);background:rgba(34,139,24,.06);color:#1a7a10;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Accept
        </button>
        <button data-action="billing-reject:${id}" style="flex:1;padding:7px;border-radius:8px;border:1.5px solid rgba(220,38,38,.28);background:rgba(220,38,38,.04);color:#dc2626;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>Reject
        </button>
      </div>
    </div>`;
  };

  // ── Compact decided row (accepted or rejected) ──
  const mkDecidedRow=(item,animIdx)=>{
    const {id,kind,data}=item;
    const accepted=reviewStatus(id)==='accepted';
    const isCPT=kind==='cpt';
    const sc=isCPT?{bg:'rgba(34,139,24,.06)',border:'rgba(34,139,24,.2)',badge:'#1a7a10'}:getSC(data.source);
    const codeLabel=isCPT?data.cpt:data.code;
    const valStr=accepted?(isCPT?`$${data.rate.toFixed(2)}/mo`:data.val?`$${data.val.toLocaleString()}/yr`:''):'';
    return `<div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:9px;background:${accepted?'rgba(34,139,24,.03)':'#fafafa'};border:1px solid ${accepted?'rgba(34,139,24,.18)':'#f0f0f0'};animation:bill-rise .18s ease ${animIdx*.04}s both;">
      <div style="padding:2px 7px;border-radius:5px;background:${accepted?sc.bg:'#f4f4f4'};border:1.5px solid ${accepted?sc.border:'#eee'};flex:none;">
        <span style="font-size:10px;font-weight:900;font-family:monospace;color:${accepted?sc.badge:'#bbb'};">${codeLabel}</span>
      </div>
      <span style="flex:1;font-size:11.5px;color:${accepted?'#333':'#aaa'};font-weight:500;text-decoration:${accepted?'none':'line-through'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${data.desc}</span>
      ${valStr?`<span style="font-size:11px;font-weight:700;color:${isCPT?'#1a7a10':sc.badge};flex:none;">${valStr}</span>`:''}
      <div style="display:flex;align-items:center;gap:5px;flex:none;">
        <span style="font-size:11px;font-weight:700;color:${accepted?'#1a7a10':'#dc2626'};">${accepted?'✓':'✗'}</span>
        <button data-action="${accepted?'billing-reject':'billing-accept'}:${id}" style="font-size:10px;color:#bbb;background:none;border:1px solid #e5e7eb;border-radius:5px;padding:2px 7px;cursor:pointer;">Undo</button>
      </div>
    </div>`;
  };

  const codeCards=`
    ${pendingItems.length?`
      <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#374151;padding:2px 2px 8px;display:flex;align-items:center;gap:8px;">
        To Review
        <span style="font-size:8.5px;font-weight:700;color:#fff;background:#374151;border-radius:99px;padding:1px 7px;">${pendingCount}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${pendingItems.map((x,i)=>mkPendingCard(x,i)).join('')}
      </div>
    `:`<div style="text-align:center;padding:18px 0 8px;font-size:12px;color:#aaa;font-weight:600;">All codes reviewed</div>`}
    ${decidedItems.length?`
      <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;padding:${pendingItems.length?'14px':'4px'} 2px 7px;${pendingItems.length?'border-top:1px solid #f0f0f0;margin-top:10px;':''}display:flex;align-items:center;gap:8px;">
        Decided
        <span style="font-size:8.5px;font-weight:700;color:#fff;background:#9ca3af;border-radius:99px;padding:1px 7px;">${decidedItems.length}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:5px;">
        ${decidedItems.map((x,i)=>mkDecidedRow(x,i)).join('')}
      </div>
    `:''}
  `;

  // ── "Add another input" dropdown menu ──
  const inputMenuHtml=S.billingInputMenu?`
    <div style="position:absolute;bottom:calc(100% + 6px);left:0;background:#fff;border:1.5px solid #e5e7eb;border-radius:11px;box-shadow:0 8px 28px rgba(0,0,0,.13);overflow:hidden;min-width:230px;z-index:10;">
      <button data-action="billing-add-transcript" style="display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;background:none;border:none;cursor:pointer;text-align:left;border-bottom:1px solid #f0f0f0;">
        <div style="width:28px;height:28px;border-radius:7px;background:rgba(124,58,237,.1);display:flex;align-items:center;justify-content:center;flex:none;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        </div>
        <div>
          <div style="font-size:12.5px;font-weight:600;color:#111;">Visit Transcript</div>
          <div style="font-size:11px;color:#888;">Upload audio file · auto-transcribe</div>
        </div>
      </button>
      <button data-action="billing-add-referral" style="display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;background:none;border:none;cursor:pointer;text-align:left;border-bottom:1px solid #f0f0f0;">
        <div style="width:28px;height:28px;border-radius:7px;background:rgba(217,119,6,.1);display:flex;align-items:center;justify-content:center;flex:none;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <div>
          <div style="font-size:12.5px;font-weight:600;color:#111;">Referral Letter</div>
          <div style="font-size:11px;color:#888;">Import referral document</div>
        </div>
      </button>
      <button data-action="stop" style="display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;background:none;border:none;cursor:not-allowed;text-align:left;opacity:.38;">
        <div style="width:28px;height:28px;border-radius:7px;background:#f4f4f4;display:flex;align-items:center;justify-content:center;flex:none;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <div>
          <div style="font-size:12.5px;font-weight:600;color:#888;">Upload Document</div>
          <div style="font-size:11px;color:#bbb;">PDF, DOCX — coming soon</div>
        </div>
      </button>
    </div>`:'';

  // ── Left panel ──
  const leftPanel=(scanning,highlighted)=>`
    <div style="display:flex;flex-direction:column;border-right:1.5px solid #e5e7eb;overflow:hidden;background:#f3f4f6;">
      <!-- Header -->
      <div style="padding:12px 16px;border-bottom:1px solid #e5e7eb;background:#fff;display:flex;align-items:center;gap:8px;flex:none;">
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;">Input</span>
        <span style="color:#e5e7eb;">·</span>
        <span style="font-size:12px;font-weight:600;color:#111;">${p.name}</span>
        <span style="color:#e5e7eb;">·</span>
        <span style="font-size:11px;color:#9ca3af;">${cl.emr} · Medicare</span>
        <div style="flex:1;"></div>
        <button data-action="billing-close" style="width:24px;height:24px;border-radius:50%;border:1px solid #e5e7eb;background:#f9fafb;font-size:14px;cursor:pointer;color:#9ca3af;display:flex;align-items:center;justify-content:center;line-height:1;">×</button>
      </div>

      <!-- Stacked input cards — scanner spans the whole container -->
      <div style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;position:relative;">
        ${scanning?`<div style="position:absolute;left:0;right:0;height:3px;z-index:5;background:linear-gradient(90deg,transparent,rgba(34,139,24,.9) 30%,rgba(34,139,24,.9) 70%,transparent);animation:bill-scan 1.6s ease-in-out infinite;top:0;pointer-events:none;box-shadow:0 0 16px rgba(34,139,24,.5);"></div>
        <div style="position:absolute;left:0;right:0;height:100px;z-index:4;background:linear-gradient(180deg,rgba(34,139,24,.05),transparent);animation:bill-scan 1.6s ease-in-out infinite;top:0;pointer-events:none;"></div>`:''}

        <!-- Card 1: Patient Chart -->
        <div style="border:1.5px solid ${highlighted?'rgba(34,139,24,.35)':'#e5e7eb'};border-radius:12px;overflow:hidden;background:#fff;transition:border-color .5s;">
          <div style="padding:8px 14px;background:#f9fafb;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;gap:8px;">
            <div style="width:7px;height:7px;border-radius:50%;background:#374151;flex:none;"></div>
            <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:#374151;">Input 1 — Patient Chart</span>
          </div>
          <div style="padding:14px 16px;max-height:300px;overflow-y:auto;${scanning?'opacity:.45;':''}">
            ${highlighted?chartHtmlHL:chartHtmlRaw}
          </div>
        </div>

        <!-- Additional input cards -->
        ${S.billingInputs.map((inp,i)=>mkInputCard(inp,i,highlighted)).join('')}
      </div>

      <!-- Bottom bar -->
      <div style="border-top:1.5px solid #e5e7eb;padding:10px 12px;background:#fff;flex:none;">
        <div style="display:flex;gap:7px;align-items:flex-end;margin-bottom:8px;">
          <textarea id="bill-prompt-input" placeholder="Type a note and click Add…" rows="2" style="flex:1;border:1.5px solid #e5e7eb;border-radius:9px;padding:8px 11px;font-size:12px;resize:none;background:#f9fafb;color:#111;font-family:inherit;outline:none;line-height:1.5;">${S.billingPrompt}</textarea>
          <button data-action="billing-add-note" style="padding:8px 15px;border-radius:9px;background:#3b82f6;color:#fff;font-size:12px;font-weight:700;cursor:pointer;border:none;flex:none;">Add</button>
        </div>
        <div style="position:relative;">
          <button data-action="billing-toggle-input-menu" style="display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;border:1.5px solid #e5e7eb;background:#f9fafb;color:#555;font-size:11.5px;font-weight:600;cursor:pointer;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add another input
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style="transform:rotate(${S.billingInputMenu?'180':'0'}deg);transition:transform .2s;"><path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          ${inputMenuHtml}
        </div>
      </div>
    </div>`;

  // ── Right panel builder ──
  const rightPanel=(bodyContent,footerContent)=>`
    <div style="display:flex;flex-direction:column;overflow:hidden;background:#fff;">
      <div style="padding:12px 16px;border-bottom:1.5px solid #f0f0f0;background:#f9fafb;display:flex;align-items:center;gap:8px;flex:none;">
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;">Output</span>
        <span style="color:#e5e7eb;">·</span>
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#374151;">CODES</span>
        ${phase==='done'?`<span style="font-size:11px;font-weight:700;background:#111;color:#fff;border-radius:99px;padding:1px 8px;">${totalCodeCount}</span>`:''}
      </div>
      <div style="flex:1;overflow-y:auto;">${bodyContent}</div>
      <div style="border-top:1.5px solid #f0f0f0;padding:14px 16px;background:#f9fafb;flex:none;">${footerContent}</div>
    </div>`;

  // ── Shared shell ──
  const overlayShell=(leftContent,rightContent)=>`
  <style>
    @keyframes sap-spin{to{transform:rotate(360deg)}}
    @keyframes sap-pulse{0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes bill-scan{0%{top:-5%}100%{top:105%}}
    @keyframes bill-rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
    @keyframes hl-appear{from{background:transparent;color:inherit}to{background:rgba(80,180,40,.22);color:#1a6b10}}
    @keyframes wave-bar{from{transform:scaleY(.4)}to{transform:scaleY(1)}}
    @keyframes audio-progress{from{width:0}to{width:88%}}
  </style>
  <div id="billing-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="border-radius:22px;box-shadow:0 36px 120px rgba(0,0,0,.55);width:100%;max-width:1200px;height:87vh;display:grid;grid-template-columns:1fr 400px;overflow:hidden;border:1px solid #e5e7eb;">
      ${leftContent}${rightContent}
    </div>
  </div>`;

  // ── Match Codes button (shared footer element) ──
  const matchBtn=(disabled)=>`<button data-action="${disabled?'stop':'billing-run'}" style="width:100%;padding:13px;border-radius:11px;background:${disabled?'#d1d5db':'#111'};color:#fff;font-size:14px;font-weight:700;cursor:${disabled?'default':'pointer'};border:none;letter-spacing:.01em;">${disabled?'Running…':'Match Codes'}</button>`;

  // ── Phase: input ──
  if(phase==='input'){
    return overlayShell(
      leftPanel(false,false),
      rightPanel(
        `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:14px;padding:32px;">
          <div style="width:52px;height:52px;border-radius:14px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
          </div>
          <div style="text-align:center;">
            <div style="font-size:13px;font-weight:600;color:#d1d5db;margin-bottom:5px;">No results yet</div>
            <div style="font-size:11.5px;color:#e5e7eb;line-height:1.6;">Add inputs on the left,<br>then click Match Codes</div>
          </div>
        </div>`,
        matchBtn(false)
      )
    );
  }

  // ── Phase: running ──
  if(phase==='running'){
    return overlayShell(
      leftPanel(true,false),
      rightPanel(
        `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:18px;padding:32px;">
          <div style="position:relative;width:64px;height:64px;">
            <div style="position:absolute;inset:0;border:2.5px solid #f3f4f6;border-radius:50%;"></div>
            <div style="position:absolute;inset:0;border:2.5px solid transparent;border-top-color:rgba(34,139,24,.85);border-radius:50%;animation:sap-spin .7s linear infinite;"></div>
            <div style="position:absolute;inset:11px;background:rgba(34,139,24,.07);border-radius:50%;display:flex;align-items:center;justify-content:center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(34,139,24,.85)" stroke-width="2.2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
            </div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:14px;font-weight:700;color:#111;margin-bottom:6px;">Analyzing…</div>
            <div style="font-size:11.5px;color:#9ca3af;line-height:1.7;animation:sap-pulse 1.5s ease infinite;">Cross-referencing ${totalMin} documented<br>minutes against CCM billing rules</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:5px;width:100%;max-width:180px;">
            ${['CPT code lookup','Revenue projection','Activity audit'].map((s,i)=>`
            <div style="display:flex;align-items:center;gap:8px;padding:7px 11px;border-radius:8px;background:#f9fafb;animation:sap-pulse 1.5s ease ${i*.28}s infinite;">
              <div style="width:6px;height:6px;border-radius:50%;background:rgba(34,139,24,.55);flex:none;"></div>
              <span style="font-size:11.5px;color:#6b7280;">${s}</span>
            </div>`).join('')}
          </div>
        </div>`,
        matchBtn(true)
      )
    );
  }

  // ── Phase: done ──
  const doneFooter=`
    <div style="display:flex;flex-direction:column;gap:10px;">
      <!-- Review progress bar -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
          <span style="font-size:10.5px;font-weight:600;color:#6b7280;">Review progress</span>
          <span style="font-size:10.5px;color:#9ca3af;">${acceptedCount} accepted · ${rejectedCount} rejected · ${pendingCount} pending</span>
        </div>
        <div style="height:5px;background:#f0f0f0;border-radius:99px;overflow:hidden;display:flex;gap:1px;">
          <div style="flex:${acceptedCount};background:#1a7a10;border-radius:99px;transition:flex .3s;"></div>
          <div style="flex:${rejectedCount};background:#dc2626;border-radius:99px;transition:flex .3s;"></div>
          <div style="flex:${pendingCount};background:#f0f0f0;"></div>
        </div>
      </div>
      <!-- Revenue + Assign row -->
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="flex:1;">
          ${acceptedCPTRev>0?`<div style="font-size:10px;color:#9ca3af;margin-bottom:1px;">Accepted billing</div><div style="font-size:17px;font-weight:900;color:#1a7a10;">$${acceptedCPTRev.toFixed(2)}<span style="font-size:10px;font-weight:500;color:#bbb;margin-left:3px;">/ mo</span></div>`
          :`<div style="font-size:11px;color:#ccc;">Accept codes to see revenue</div>`}
        </div>
        ${S.billingViewingId
          ?`<div style="display:flex;align-items:center;gap:6px;padding:10px 14px;border-radius:10px;background:rgba(34,139,24,.08);border:1.5px solid rgba(34,139,24,.2);">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a7a10" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span style="font-size:12px;font-weight:700;color:#1a7a10;">Assigned</span>
            </div>`
          :`<button data-action="${acceptedCount>0?'billing-assign':'stop'}" style="padding:10px 18px;border-radius:10px;background:${acceptedCount>0?'#111':'#e5e7eb'};color:${acceptedCount>0?'#fff':'#bbb'};font-size:12.5px;font-weight:700;cursor:${acceptedCount>0?'pointer':'default'};border:none;white-space:nowrap;transition:background .25s;">
              Assign${acceptedCount>0?` (${acceptedCount})`:''}
            </button>`}
      </div>
    </div>`;
  return overlayShell(
    leftPanel(false,true),
    rightPanel(
      `<div style="padding:12px;display:flex;flex-direction:column;gap:8px;">${codeCards}</div>`,
      doneFooter
    )
  );
}

// ── Call Template Overlay ─────────────────────────────────────────────────
const CALL_TEMPLATES=[
  {id:1,num:'I',title:'Monthly Follow-Up Call',hint:'General monthly review',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`Detailed Review of Patient Chart
• Initial care plan completed on: _______________
• Next office visit scheduled for: _______________
• Last office visit was on: _______________
• Vitals: _______________
• Being followed by CCM for: _______________

Current Medications
• _______________

Labs / Diagnostic Testing
• _______________

Quality Metrics
• DM Control: _______________
• HTN Control: _______________
• Depression Screen: _______________
• Breast Cancer Screen: _______________
• Colorectal Cancer Screen: _______________

Discuss
• _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
  {id:2,num:'II',title:'Monthly Follow-Up — A-Fib',hint:'A-Fib management & anticoagulation',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`Detailed Review of Patient Chart
• Initial care plan completed on: _______________
• Next office visit scheduled for: _______________
• Vitals: _______________
• A-Fib rhythm status (Paroxysmal / Persistent / Permanent): _______________

A-Fib Management
• Current antiarrhythmic medication: _______________
• Anticoagulation therapy: _______________
• INR / Anti-Xa level: _______________
• CHA₂DS₂-VASc score: _______________
• Rate control goal achieved: _______________

Quality Metrics
• Stroke risk addressed: _______________
• Bleeding risk (HAS-BLED): _______________
• Depression Screen: _______________

Discuss
• Medication adherence and side effects
• Symptoms: palpitations, dyspnea, fatigue
• _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
  {id:3,num:'III',title:'Monthly Follow-Up — CHF',hint:'Heart failure monitoring',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`Detailed Review of Patient Chart
• Initial care plan completed on: _______________
• Next office visit scheduled for: _______________
• Vitals: _______________
• LVEF: _______________ (date: _______________)
• CHF classification (NYHA): _______________

Heart Failure Monitoring
• Daily weight trend: _______________
• Edema assessment: _______________
• Current diuretic dose: _______________
• BNP / NT-proBNP: _______________
• Fluid restriction adherence: _______________

Quality Metrics
• LVEF documented: _______________
• ACE-I / ARB / ARNI on board: _______________
• Beta-blocker on board: _______________
• Depression Screen: _______________

Discuss
• Weight gain alerts and when to call 911
• Sodium / fluid restriction
• _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
  {id:4,num:'IV',title:'Monthly Follow-Up — COPD',hint:'Pulmonary management & O2',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`Detailed Review of Patient Chart
• Initial care plan completed on: _______________
• Next office visit scheduled for: _______________
• Vitals: _______________
• COPD GOLD stage: _______________
• Last spirometry: _______________

Pulmonary Management
• Current inhalers: _______________
• O2 use (home): _______________
• Rescue inhaler use (times/week): _______________
• Exacerbations since last call: _______________
• Smoking status: _______________

Quality Metrics
• Influenza vaccine: _______________
• Pneumococcal vaccine: _______________
• Pulmonary rehab referral: _______________
• Depression Screen: _______________

Discuss
• Inhaler technique review
• Action plan for exacerbations
• _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
  {id:5,num:'V',title:'Monthly Follow-Up — Diabetes',hint:'DM management & A1c tracking',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`Detailed Review of Patient Chart
• Initial care plan completed on: _______________
• Next office visit scheduled for: _______________
• Vitals: _______________
• HbA1c: _______________ (date: _______________)
• DM type: _______________

Diabetes Management
• Current DM medications: _______________
• Blood glucose monitoring frequency: _______________
• Fasting glucose trend: _______________
• Hypoglycemic episodes: _______________
• Foot exam date: _______________

Quality Metrics
• HbA1c at goal (<8%): _______________
• Eye exam (annual): _______________
• Nephropathy screening (uACR): _______________
• Statin on board: _______________
• Depression Screen: _______________

Discuss
• Dietary adherence and carb counting
• Exercise and weight management
• _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
  {id:6,num:'VI',title:'Monthly Follow-Up — Hyperlipidemia',hint:'Lipids & CAD risk',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`Detailed Review of Patient Chart
• Initial care plan completed on: _______________
• Next office visit scheduled for: _______________
• Vitals: _______________
• Last lipid panel: _______________

Lipid Management
• LDL: _______________ (goal: _______________)
• HDL: _______________
• Triglycerides: _______________
• Current statin / dose: _______________
• Statin side effects: _______________

Cardiovascular Risk
• 10-year ASCVD risk: _______________
• Aspirin therapy: _______________
• Other CV medications: _______________

Quality Metrics
• LDL at goal: _______________
• Lipid panel within 12 months: _______________
• Depression Screen: _______________

Discuss
• Diet (saturated fat, fiber, plant sterols)
• Exercise 150 min/week goal
• _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
  {id:7,num:'VII',title:'Monthly Follow-Up — HTN',hint:'Blood pressure management',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`Detailed Review of Patient Chart
• Initial care plan completed on: _______________
• Next office visit scheduled for: _______________
• Vitals: _______________
• Home BP log average: _______________
• HTN stage: _______________

Blood Pressure Management
• Current antihypertensives: _______________
• Target BP: _______________
• Medication adherence: _______________
• Home BP monitor confirmed accurate: _______________

Quality Metrics
• BP at goal (<130/80): _______________
• Renal function (BMP): _______________
• Potassium level: _______________
• Depression Screen: _______________

Discuss
• Sodium restriction (<2,300 mg/day)
• DASH diet adherence
• _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
  {id:8,num:'VIII',title:'Monthly Follow-Up — Oncology',hint:'Cancer management & immunology',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`Detailed Review of Patient Chart
• Initial care plan completed on: _______________
• Next office visit scheduled for: _______________
• Vitals: _______________
• Cancer diagnosis / stage: _______________
• Oncology team: _______________

Cancer Management
• Current treatment regimen: _______________
• Last treatment date: _______________
• Next oncology appointment: _______________
• Side effect management: _______________
• Pain level (0–10): _______________

Supportive Care
• Nutrition support: _______________
• Fatigue management: _______________
• Palliative care consult: _______________
• Advance directive on file: _______________

Quality Metrics
• Depression Screen (PHQ-9): _______________
• Immunization status (flu, PCV): _______________

Discuss
• Treatment adherence and side effects
• Emotional support and resources
• _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
  {id:9,num:'IX',title:'Medication Reconciliation',hint:'Full med list review',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`Medication Reconciliation Summary
• Date of reconciliation: _______________
• Performed by: _______________

Current Medication List (Patient-Reported)
• _______________

Prescriptions on File (EHR)
• _______________

Discrepancies Identified
• _______________

High-Risk Medications Review
• Anticoagulants: _______________
• Insulin / sulfonylureas: _______________
• Opioids: _______________
• NSAIDs: _______________

Drug Interactions Flagged
• _______________

Allergies Confirmed
• _______________

Actions Taken
• _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
  {id:10,num:'X',title:'Social Determinants of Health',hint:'SDOH screening',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`SDOH Screening — AHC Health-Related Social Needs

Housing
• Stable housing: _______________
• Housing quality concerns (mold, heat, safety): _______________

Food Security
• Worried about food running out: _______________
• Food assistance enrolled: _______________

Transportation
• Transportation barrier to appointments: _______________
• Transportation resources offered: _______________

Utility Needs
• Difficulty paying utility bills: _______________

Interpersonal Safety
• Concerns about safety at home: _______________

Social Isolation
• Frequency of social contact: _______________
• Interest in community programs: _______________

Financial Strain
• Difficulty paying for medications: _______________
• Benefits screening completed: _______________

Referrals Made
• _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
  {id:11,num:'XI',title:'Vaccination Review & Update',hint:'CDC immunization review',prompt:'You are given raw data about a patient, and notes that was recorded while performing a call with the patient. Fill the template by extracting relevant information from the input to complete the document.\nIf you cannot find the relevant information for a corresponding key, return "N/A" if the value type is "Text"; if the type is "Array", return "[]".',rawContent:`Vaccination Review — CDC Adult Immunization Schedule

Patient Demographics
• Age: _______________   Sex: _______________   Immunocompromised: _______________

Influenza
• Last flu vaccine: _______________   Due: _______________

COVID-19
• Primary series complete: _______________   Last booster: _______________   Due: _______________

Pneumococcal
• PCV15 / PCV20 received: _______________   PPSV23 received: _______________

Shingles (Zoster — Shingrix)
• Dose 1: _______________   Dose 2: _______________

Tdap / Td
• Last Tdap: _______________   Td booster due: _______________

Hepatitis B
• Series complete: _______________

RSV (age ≥60)
• RSV vaccine received: _______________

Actions
• Vaccines administered today: _______________
• Vaccines ordered / referred: _______________
• Patient education provided: _______________

Phone Call to Patient
• Phone number: _______________
• Notes: _______________`},
];

function buildFilledTemplate(p){
  const totalMin=p.activities.reduce((s,a)=>s+a.minutes,0);
  const actNotes=p.activities.map(a=>`${a.date}: ${a.desc} (${a.minutes} min)`).join('\n');
  return [
    {
      label:'Detailed Review of Patient Chart',
      content:`• ${p.age} year old ${p.sex==='F'?'female':'male'}\n• Initial care plan completed on: 01/15/2026\n• Next office visit scheduled for: 07/15/2026 with Dr. ${p.provider}\n• Last office visit was on: 05/14/2026 with Dr. ${p.provider}\n• Vitals: Wt. ${p.vitals.weight}, BP ${p.vitals.bp}, HR ${p.vitals.hr}, Temp ${p.vitals.temp}${p.vitals.a1c!=='N/A'?', A1c '+p.vitals.a1c:''}\n• Being followed by CCM for: ${p.conditions.join(', ')}`
    },
    {
      label:'Current Medications',
      content:p.medications.map(m=>`• ${m}`).join('\n')
    },
    {
      label:'Labs / Diagnostic Testing',
      content:[
        p.vitals.a1c!=='N/A'?`• HbA1c: ${p.vitals.a1c} (Jun 2026) — ${parseFloat(p.vitals.a1c)>=8?'above':'at or near'} goal`:'',
        '• BMP (May 2026): eGFR within monitoring range',
        '• Lipid panel: pending next quarter',
      ].filter(Boolean).join('\n')||'• No labs on file this period'
    },
    {
      label:'Quality Metrics',
      content:[
        p.conditions.some(c=>c.includes('Diabetes'))?`• DM Control: HbA1c ${p.vitals.a1c} — monitor quarterly`:'• DM Control: No Diabetes Dx',
        `• HTN Control: ${p.activities[0]?.date||'—'} — BP ${p.vitals.bp}`,
        `• Depression Screen: PHQ-2 negative per Dr. ${p.provider} (05/2026)`,
        '• Breast Cancer Screen: up to date',
        '• Colorectal Cancer Screen: up to date',
      ].join('\n')
    },
    {
      label:'Discuss',
      content:[
        ...p.conditions.map(c=>`• Review ${c} management and medication adherence`),
        '• Any new symptoms or concerns since last call?',
        '• Medication refills needed?',
      ].join('\n')
    },
    {
      label:'Phone Call to Patient',
      content:`• Phone number: on file\n• Total documented time: ${totalMin} min\n\nCall Notes:\n${actNotes}\n\n• Patient is aware of next appointment with Dr. ${p.provider} 07/15/26.`
    },
  ];
}

function renderCarePlanOverlay(){
  if(!S.carePlanOpen) return '';
  const p=PATIENTS.find(pt=>pt.id===S.patientId); if(!p) return '';
  const phase=S.cpPhase||'input';
  const totalMin=p.activities.reduce((s,a)=>s+a.minutes,0);
  const cl=currentClinic();
  const selTmpl=CALL_TEMPLATES.find(t=>t.id===S.cpTemplate)||null;

  // ── Chart content lines ──
  const cpLine=(t,dim)=>`<div style="font-family:'SF Mono',ui-monospace,monospace;font-size:11px;line-height:1.8;color:${dim?'#bbb':'#333'};white-space:pre-wrap;">${t||'&nbsp;'}</div>`;
  const cpHL=(text,delay=0)=>`<mark style="background:rgba(99,102,241,.18);color:#4338ca;font-weight:700;border-radius:3px;padding:0 3px;animation:hl-appear .4s ease ${delay}s both;">${text}</mark>`;
  const highlighted=phase==='done';
  let hd=0;
  const chartLines=[
    cpLine(`&lt;CCM_CHART  patient="${p.mrn}"&gt;`,true),
    cpLine(`Date: ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'2-digit',day:'2-digit'})}  |  Provider: ${p.provider}`,true),
    cpLine(''),
    cpLine(`<span style="color:#1a56cc;font-weight:700;">Chief Complaint:</span> ${p.conditions[0]||'Chronic condition management'} follow-up`),
    cpLine(''),
    cpLine(`<span style="color:#555;font-weight:600;">Patient:</span>  ${p.name}   DOB: ${p.dob}   ${p.age}yo ${p.sex}`),
    cpLine(`<span style="color:#555;font-weight:600;">MRN:</span>     ${p.mrn}   Clinic: ${cl.short}`),
    cpLine(''),
    cpLine(`<span style="color:#1a56cc;font-weight:700;">Conditions:</span>`),
    ...p.conditions.map(c=>cpLine(`  — ${highlighted?cpHL(c,(hd+=.07).toFixed(2)):c}`)),
    cpLine(''),
    cpLine(`<span style="color:#1a56cc;font-weight:700;">Medications:</span>`),
    ...p.medications.map(m=>cpLine(`  — ${m}`)),
    cpLine(''),
    cpLine(`<span style="color:#1a56cc;font-weight:700;">CCM Activity:</span>`),
    ...p.activities.map(a=>cpLine(`  [${a.date}]  ${a.desc.slice(0,50)}  —  ${highlighted?cpHL(a.minutes+' min',(hd+=.08).toFixed(2)):a.minutes+' min'}`)),
    cpLine(''),
    cpLine(`${highlighted?cpHL('Total: '+totalMin+' min this month',(hd+=.1).toFixed(2)):'Total: '+totalMin+' min this month'}`,false),
    cpLine(`&lt;/CCM_CHART&gt;`,true),
  ];
  const chartHtml=chartLines.join('');

  // ── Input card builder (re-uses same style as billing) ──
  const cpStyles={
    note:    {accent:'#3b82f6',bg:'rgba(59,130,246,.05)', border:'rgba(59,130,246,.25)'},
    transcript:{accent:'#7c3aed',bg:'rgba(124,58,237,.05)',border:'rgba(124,58,237,.25)'},
  };
  const mkCPInputCard=(inp,i)=>{
    const s=cpStyles[inp.type]||cpStyles.note;
    return `<div style="border:1.5px solid ${s.border};border-radius:11px;overflow:hidden;background:#fff;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 13px;background:${s.bg};border-bottom:1px solid ${s.border};">
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:6px;height:6px;border-radius:50%;background:${s.accent};flex:none;"></div>
          <span style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:${s.accent};">Input ${i+2} — ${inp.label}</span>
        </div>
        <button data-action="cp-remove-input:${i}" style="font-size:14px;color:#bbb;background:none;border:none;cursor:pointer;padding:0;">×</button>
      </div>
      <div style="padding:12px 14px;font-family:'SF Mono',monospace;font-size:11px;color:#333;line-height:1.7;white-space:pre-wrap;max-height:160px;overflow-y:auto;">${inp.content.replace(/</g,'&lt;')}</div>
    </div>`;
  };

  // ── Add-input dropdown ──
  const cpInputMenu=S.cpInputMenu?`
    <div style="position:absolute;bottom:calc(100% + 6px);left:0;background:#fff;border:1.5px solid #e5e7eb;border-radius:11px;box-shadow:0 8px 28px rgba(0,0,0,.13);overflow:hidden;min-width:220px;z-index:10;">
      <button data-action="cp-add-transcript" style="display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;background:none;border:none;cursor:pointer;text-align:left;border-bottom:1px solid #f0f0f0;">
        <div style="width:26px;height:26px;border-radius:6px;background:rgba(124,58,237,.1);display:flex;align-items:center;justify-content:center;flex:none;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
        </div>
        <div><div style="font-size:12px;font-weight:600;color:#111;">Visit Transcript</div><div style="font-size:10.5px;color:#aaa;">Audio recording or transcript</div></div>
      </button>
      <button data-action="cp-add-note" style="display:flex;align-items:center;gap:10px;width:100%;padding:11px 14px;background:none;border:none;cursor:pointer;text-align:left;">
        <div style="width:26px;height:26px;border-radius:6px;background:rgba(59,130,246,.1);display:flex;align-items:center;justify-content:center;flex:none;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div><div style="font-size:12px;font-weight:600;color:#111;">Call Notes</div><div style="font-size:10.5px;color:#aaa;">Nurse or coordinator notes</div></div>
      </button>
    </div>`:'';

  // ── Left panel ──
  const scanning=phase==='running';
  const leftPanel=`
    <div style="width:340px;flex:none;border-right:1.5px solid #f0f0f0;display:flex;flex-direction:column;overflow:hidden;">
      <div style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;">
        <!-- Chart card -->
        <div style="border:1.5px solid ${highlighted?'rgba(99,102,241,.35)':'rgba(29,78,216,.2)'};border-radius:12px;overflow:hidden;position:relative;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 13px;background:rgba(29,78,216,.06);border-bottom:1px solid rgba(29,78,216,.15);">
            <div style="display:flex;align-items:center;gap:7px;">
              <div style="width:6px;height:6px;border-radius:50%;background:#1d4ed8;"></div>
              <span style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:#1d4ed8;">Input 1 — Patient Chart</span>
            </div>
            <span style="font-size:9.5px;color:#bbb;">${p.mrn}</span>
          </div>
          ${scanning?`<div style="position:absolute;left:0;right:0;height:3px;z-index:5;background:linear-gradient(90deg,transparent,rgba(99,102,241,.9) 30%,rgba(99,102,241,.9) 70%,transparent);animation:cp-scan 1.6s ease-in-out infinite;top:0;pointer-events:none;box-shadow:0 0 16px rgba(99,102,241,.5);"></div><div style="position:absolute;left:0;right:0;height:80px;z-index:4;background:linear-gradient(180deg,rgba(99,102,241,.06),transparent);animation:cp-scan 1.6s ease-in-out infinite;top:0;pointer-events:none;"></div>`:''}
          <div style="padding:10px 14px;max-height:240px;overflow-y:auto;">${chartHtml}</div>
        </div>
        <!-- User input cards -->
        ${scanning?`<div style="position:relative;display:flex;flex-direction:column;gap:8px;">
          <div style="position:absolute;left:0;right:0;height:3px;z-index:5;background:linear-gradient(90deg,transparent,rgba(99,102,241,.9) 30%,rgba(99,102,241,.9) 70%,transparent);animation:cp-scan 1.6s ease-in-out .4s infinite;top:0;pointer-events:none;box-shadow:0 0 16px rgba(99,102,241,.5);"></div>
          ${S.cpInputs.map((inp,i)=>mkCPInputCard(inp,i)).join('')}
        </div>`:S.cpInputs.map((inp,i)=>mkCPInputCard(inp,i)).join('')}
        <!-- Prompt input -->
        ${phase==='input'?`<div style="border:1.5px solid #e5e7eb;border-radius:11px;overflow:hidden;background:#fff;">
          <div style="padding:7px 13px;border-bottom:1px solid #f0f0f0;background:#fafafa;">
            <span style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:#9ca3af;">Notes</span>
          </div>
          <textarea id="cp-prompt-input" placeholder="Add context for the AI…" rows="2" style="width:100%;padding:8px 11px;font-size:12px;border:none;resize:none;background:#fff;color:#111;font-family:inherit;outline:none;line-height:1.5;box-sizing:border-box;">${S.cpPrompt}</textarea>
        </div>`:''}
      </div>
      <!-- Add input button -->
      ${phase==='input'?`<div style="padding:10px 12px;border-top:1px solid #f5f5f5;position:relative;">
        ${cpInputMenu}
        <button data-action="cp-input-menu" style="width:100%;padding:8px;border-radius:9px;border:1.5px dashed #e5e7eb;background:transparent;font-size:11.5px;font-weight:600;color:#9ca3af;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add another input
        </button>
      </div>`:''}
    </div>`;

  // ── Right panel ──
  let rightContent='';

  if(phase==='input'){
    // Template selection list + preview
    const tmplRows=CALL_TEMPLATES.map(t=>{
      const sel=S.cpTemplate===t.id;
      return `<button data-action="cp-select:${t.id}" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;border:1.5px solid ${sel?'rgba(99,102,241,.45)':'#f0f0f0'};background:${sel?'rgba(99,102,241,.05)':'transparent'};cursor:pointer;text-align:left;width:100%;transition:border-color .12s,background .12s;margin-bottom:4px;">
        <div style="width:26px;height:26px;border-radius:7px;background:${sel?'rgba(99,102,241,.15)':'rgba(99,102,241,.06)'};color:#6366f1;font-size:9.5px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none;">${t.num}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:12px;font-weight:${sel?700:600};color:${sel?'#4338ca':'#374151'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.title}</div>
          <div style="font-size:10.5px;color:#9ca3af;margin-top:1px;">${t.hint}</div>
        </div>
        ${sel?`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`:''}
      </button>`;
    }).join('');

    const previewHtml=selTmpl?`
      <div style="border-top:1.5px solid #f0f0f0;padding:14px 16px 14px;">
        <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;margin-bottom:10px;display:flex;align-items:center;gap:7px;">
          Preview — Template ${selTmpl.num}
          <span style="background:rgba(99,102,241,.1);color:#6366f1;padding:1px 7px;border-radius:99px;font-size:8.5px;">Raw</span>
        </div>
        <div style="font-family:'SF Mono',ui-monospace,monospace;font-size:10.5px;line-height:1.8;color:#555;white-space:pre-wrap;background:#f9fafb;border:1px solid #f0f0f0;border-radius:10px;padding:12px 14px;max-height:220px;overflow-y:auto;">${selTmpl.rawContent.replace(/</g,'&lt;')}</div>
      </div>`:'<div style="padding:32px 20px;text-align:center;color:#d1d5db;font-size:12px;">Select a template to preview</div>';

    rightContent=`
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden;">
        <div style="flex:1;overflow-y:auto;padding:12px 14px;">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#374151;margin-bottom:8px;">Select Template</div>
          ${tmplRows}
        </div>
        ${previewHtml}
        <div style="padding:10px 14px;border-top:1px solid #f0f0f0;flex:none;">
          <button data-action="${selTmpl?'cp-run':'stop'}" style="width:100%;padding:11px;border-radius:10px;background:${selTmpl?'#111':'#e5e7eb'};color:${selTmpl?'#fff':'#bbb'};font-size:13px;font-weight:700;cursor:${selTmpl?'pointer':'default'};border:none;display:flex;align-items:center;justify-content:center;gap:7px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9.5 9.5l5 2.5-5 2.5V9.5z"/></svg>
            Fill Template${selTmpl?` — ${selTmpl.title}`:''}
          </button>
        </div>
      </div>`;
  } else if(phase==='running'){
    const steps=['Reading patient chart from eMDs','Cross-referencing CCM activity log','Matching conditions to template sections','Populating vitals and medications','Drafting quality metrics & actions','Finalizing call notes'];
    rightContent=`
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:24px;padding:24px;">
        <div style="position:relative;width:60px;height:60px;">
          <div style="position:absolute;inset:0;border:3px solid rgba(99,102,241,.15);border-radius:50%;"></div>
          <div style="position:absolute;inset:0;border:3px solid transparent;border-top-color:#6366f1;border-radius:50%;animation:sap-spin .8s linear infinite;"></div>
          <div style="position:absolute;inset:9px;background:rgba(99,102,241,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
        </div>
        <div style="text-align:center;">
          <div style="font-size:14px;font-weight:700;color:#111;margin-bottom:5px;">Filling template…</div>
          <div style="font-size:11.5px;color:#9ca3af;animation:sap-pulse 1.5s ease infinite;">Template ${selTmpl?selTmpl.num:'I'} · ${selTmpl?selTmpl.title:'Monthly Follow-Up'}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;width:100%;max-width:260px;">
          ${steps.map((s,i)=>`<div style="display:flex;align-items:center;gap:8px;padding:7px 11px;background:#f9fafb;border-radius:8px;animation:sap-pulse 1.5s ease ${(i*.22).toFixed(2)}s infinite;">
            <div style="width:6px;height:6px;border-radius:50%;background:rgba(99,102,241,.6);flex:none;"></div>
            <span style="font-size:11.5px;color:#6b7280;">${s}</span>
          </div>`).join('')}
        </div>
      </div>`;
  } else {
    // done phase — filled template sections
    const tmpl=selTmpl||CALL_TEMPLATES[0];
    const sections=buildFilledTemplate(p);
    const sectionBlocks=sections.map((s,i)=>`
      <div style="animation:cp-rise .25s ease ${(i*.08).toFixed(2)}s both;">
        <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:#6366f1;margin-bottom:5px;display:flex;align-items:center;gap:7px;">
          ${s.label}
          <span style="font-size:8.5px;font-weight:700;background:rgba(99,102,241,.1);color:#6366f1;padding:1px 7px;border-radius:99px;">AI filled</span>
        </div>
        <div style="font-family:'SF Mono','Menlo','Consolas',monospace;font-size:11.5px;line-height:1.8;color:#333;white-space:pre-line;padding:12px 14px;background:#f9fafb;border-radius:10px;border:1px solid #f0f0f0;margin-bottom:12px;">${s.content}</div>
      </div>`).join('');

    const assignFooter=`
      <div style="padding:12px 16px;border-top:1px solid #f0f0f0;background:#fff;flex:none;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="flex:1;">
            <div style="font-size:10px;color:#9ca3af;margin-bottom:2px;">Template ${tmpl.num} — ${tmpl.title}</div>
            <div style="font-size:12px;font-weight:700;color:#374151;">${sections.length} sections filled</div>
          </div>
          ${S.cpViewingId
            ?`<div style="display:flex;align-items:center;gap:6px;padding:10px 14px;border-radius:10px;background:rgba(99,102,241,.08);border:1.5px solid rgba(99,102,241,.2);">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span style="font-size:12px;font-weight:700;color:#6366f1;">Assigned</span>
              </div>`
            :`<button data-action="care-plan-sign" style="padding:10px 20px;border-radius:10px;background:#111;color:#fff;font-size:12.5px;font-weight:700;cursor:pointer;border:none;">Assign</button>`}
        </div>
      </div>`;

    rightContent=`
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden;">
        <div style="flex:1;overflow-y:auto;padding:14px 16px;">${sectionBlocks}</div>
        ${assignFooter}
      </div>`;
  }

  const rightPanel=`
    <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;background:#fff;">
      <div style="padding:10px 16px;border-bottom:1px solid #f5f5f5;display:flex;align-items:center;justify-content:space-between;flex:none;">
        <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#9ca3af;">
          ${phase==='input'?'Output · Template':`Output · ${selTmpl?selTmpl.title:'Template'}`}
        </div>
        ${phase==='done'?`<div style="display:flex;align-items:center;gap:5px;"><div style="width:6px;height:6px;border-radius:50%;background:#6366f1;"></div><span style="font-size:10.5px;color:#6366f1;font-weight:600;">Template filled</span></div>`
        :phase==='running'?`<div style="display:flex;align-items:center;gap:5px;"><div style="width:6px;height:6px;border-radius:50%;background:#f59e0b;animation:sap-pulse .8s ease infinite;"></div><span style="font-size:10.5px;color:#f59e0b;font-weight:600;">Filling…</span></div>`
        :''}
      </div>
      ${rightContent}
    </div>`;

  return `
  <style>
    @keyframes cp-rise{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
    @keyframes cp-scan{0%{top:-5%}100%{top:105%}}
    @keyframes sap-spin{to{transform:rotate(360deg)}}
    @keyframes sap-pulse{0%,100%{opacity:1}50%{opacity:.4}}
    @keyframes hl-appear{from{opacity:0;background:rgba(99,102,241,.0)}to{opacity:1;background:rgba(99,102,241,.18)}}
  </style>
  <div id="care-plan-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;">
    <div style="background:#fff;border-radius:20px;width:100%;max-width:960px;height:min(92vh,680px);display:flex;flex-direction:column;overflow:hidden;box-shadow:0 28px 90px rgba(0,0,0,.4);">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:13px 20px;border-bottom:1.5px solid #f0f0f0;background:#fff;flex:none;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div>
            <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#6366f1;margin-bottom:2px;">Fill Call Template</div>
            <div style="font-size:15px;font-weight:800;color:#111;">${p.name}</div>
          </div>
          <div style="font-size:10px;color:#9ca3af;background:#f9fafb;padding:3px 10px;border-radius:99px;border:1px solid #eee;">Jun 2026 · ${cl.short}</div>
        </div>
        <button data-action="care-plan-close" style="width:26px;height:26px;border-radius:50%;border:1px solid #e5e7eb;background:#f9fafb;font-size:14px;cursor:pointer;color:#9ca3af;display:flex;align-items:center;justify-content:center;line-height:1;">×</button>
      </div>
      <!-- Body -->
      <div style="display:flex;flex:1;overflow:hidden;">
        ${leftPanel}
        ${rightPanel}
      </div>
    </div>
  </div>`;
}

// ── Task detail view ──────────────────────────────────────────────────────
function renderTask(ma){
  const raw=[...TASKS,...S.extraTasks].find(t=>t.id===S.taskId); if(!raw) return '';
  const t=vo(raw);
  const actionPrimary=ma?'Send to Dr. Cho':'Approve & send to EMR';
  const didItems=t.did.map(d=>`
    <div style="display:flex;gap:8px;align-items:flex-start;font-size:12.5px;color:var(--text-2);line-height:1.45;">
      <span style="color:var(--good);margin-top:1px;flex:none;">${I.check}</span>${d}
    </div>`).join('');
  const srcTags=t.sources.map(s=>`<span style="font-size:11.5px;color:var(--text-2);border:1px solid var(--border);border-radius:7px;padding:4px 9px;">${s}</span>`).join('');
  let body='';
  if(t.isLab){
    const rows=t.lab.items.map(i=>`
      <div style="display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--border);">
        <span style="flex:1;"><span style="display:block;font-size:14px;font-weight:600;">${i.name}</span><span style="${MONO};display:block;font-size:11.5px;color:var(--text-3);">Cat ${i.cat}</span></span>
        <span style="${MONO};width:90px;font-size:12.5px;color:var(--text-2);">${i.cpt}</span>
        <span style="${MONO};width:80px;text-align:right;font-size:13.5px;color:var(--text-2);">${i.priceF}</span>
        <span style="${MONO};width:90px;text-align:right;font-size:13.5px;font-weight:600;color:var(--accent);">${i.markupF}</span>
      </div>`).join('');
    const reasons=t.lab.reasons.map(r=>`<div style="display:flex;gap:9px;align-items:flex-start;font-size:13.5px;color:var(--text-2);"><span style="color:var(--accent);margin-top:1px;">•</span>${r}</div>`).join('');
    body=`
      ${memTag('Workflow','Lab panel price comparison','lab-wf-start')}
      <div style="font-size:12.5px;color:var(--text-3);margin-bottom:13px;">Assembled from ${t.patient.first}'s visit note · priced against the clinic price list.</div>
      <div style="border:1px solid var(--border);border-radius:15px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">
        <div style="display:flex;padding:11px 18px;border-bottom:1px solid var(--border);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-3);">
          <span style="flex:1;">Test</span><span style="width:90px;">CPT</span><span style="width:80px;text-align:right;">Cost</span><span style="width:90px;text-align:right;">Your price</span>
        </div>
        ${rows}
        <div style="display:flex;background:var(--panel-2);">
          <div style="flex:1;padding:14px 18px;"><div style="font-size:11px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;">${t.lab.count} tests · cost</div><div style="${MONO};font-size:17px;font-weight:700;margin-top:3px;">${t.lab.combinedPrice}</div></div>
          <div style="flex:1;padding:14px 18px;border-left:1px solid var(--border);"><div style="font-size:11px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;">Your price</div><div style="${MONO};font-size:17px;font-weight:700;color:var(--accent);margin-top:3px;">${t.lab.combinedYour}</div></div>
          <div style="flex:1;padding:14px 18px;border-left:1px solid var(--border);"><div style="font-size:11px;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;">Margin</div><div style="${MONO};font-size:17px;font-weight:700;color:var(--good);margin-top:3px;">${t.lab.margin}</div></div>
        </div>
      </div>
      <div style="margin-top:16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-3);">Why these tests</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">${reasons}</div>`;
  }
  if(t.isNote){
    const soap=t.soap.map(s=>`
      <div style="border:1px solid var(--border);background:var(--panel);border-radius:13px;padding:15px 18px;box-shadow:var(--shadow);">
        <div style="font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);margin-bottom:7px;">${s.label}</div>
        <div style="font-size:14px;color:var(--text);line-height:1.6;">${s.text}</div>
      </div>`).join('');
    const sugg=t.suggestions.map(g=>`<span style="font-size:13px;color:var(--accent);border:1px solid var(--accent-line);background:var(--accent-soft);border-radius:999px;padding:6px 13px;">+ ${g}</span>`).join('');
    body=`
      ${memTag('Templates','Note Summary Template','tmpl-open:note-summary')}
      <div style="display:flex;flex-direction:column;gap:13px;">${soap}</div>
      <div style="margin-top:16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-3);">Suggested next actions</div>
      <div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:10px;">${sugg}</div>`;
  }
  if(t.isReferral){
    const bparas=t.referral.body.map(b=>`<p style="margin:0;font-size:14px;color:var(--text);line-height:1.65;">${b}</p>`).join('');
    const atts=t.referral.attachments.map(a=>`<span style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--text-2);border:1px solid var(--border);border-radius:8px;padding:5px 10px;">${I.file}${a}</span>`).join('');
    body=`
      ${memTag('Templates','Patient Information Scribe Template','tmpl-open:referral-scribe')}
      <div style="border:1px solid var(--border);background:var(--panel);border-radius:15px;padding:26px 28px;box-shadow:var(--shadow);">
        <div style="font-size:12.5px;color:var(--text-3);line-height:1.7;">
          <div style="color:var(--text-2);"><b style="color:var(--text);">To:</b> ${t.referral.to}</div>
          <div style="color:var(--text-2);">${t.referral.specialist}</div>
          <div style="color:var(--text-2);margin-top:6px;"><b style="color:var(--text);">Re:</b> ${t.referral.re}</div>
        </div>
        <div style="height:1px;background:var(--border);margin:16px 0;"></div>
        <div style="display:flex;flex-direction:column;gap:13px;">${bparas}</div>
        <div style="margin-top:18px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-3);">Attached</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:9px;">${atts}</div>
      </div>`;
  }
  if(t.isDoc){
    const drows=t.doc.rows.map(r=>`
      <div style="display:flex;align-items:center;padding:13px 18px;border-bottom:1px solid var(--border);gap:14px;">
        <span style="width:175px;flex:none;font-size:12.5px;color:var(--text-3);text-transform:uppercase;letter-spacing:.03em;font-weight:600;">${r.field}</span>
        <span style="flex:1;font-size:14px;color:var(--text);">${r.value}</span>
        <span style="display:flex;align-items:center;gap:6px;font-size:11.5px;color:${r.confColor};">
          <span style="width:7px;height:7px;border-radius:50%;background:${r.confColor};"></span>${r.conf}
        </span>
      </div>`).join('');
    body=`
      <div style="display:flex;align-items:center;gap:11px;border:1px solid var(--border);background:var(--panel-2);border-radius:12px;padding:13px 16px;margin-bottom:15px;">
        ${I.doc.replace('stroke="currentColor"','stroke="var(--accent)"')}
        <span style="font-size:13.5px;font-weight:600;">${t.doc.source}</span>
        <span style="flex:1;"></span>
        <span style="font-size:12px;color:var(--good);background:var(--good-soft);padding:3px 10px;border-radius:999px;font-weight:600;">11 fields extracted</span>
      </div>
      <div style="border:1px solid var(--border);border-radius:15px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">${drows}</div>`;
  }
  if(t.isMessage){
    body=`
      <div style="font-size:12.5px;color:var(--text-3);margin-bottom:13px;">Drafted for <b style="color:var(--text-2);">${t.message.to}</b> · ${t.message.channel}</div>
      <div style="border:1px solid var(--accent-line);background:var(--accent-soft);border-radius:16px;border-bottom-left-radius:4px;padding:20px 22px;max-width:560px;">
        <p style="margin:0;font-size:14.5px;color:var(--text);line-height:1.65;">${t.message.text}</p>
      </div>`;
  }
  return `
  <div style="padding:30px 30px 70px;max-width:1140px;margin:0 auto;width:100%;">
    <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:22px;">
      <span style="width:46px;height:46px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;flex:none;">${t.patient.initials}</span>
      <div style="flex:1;min-width:0;">
        <div style="font-size:12px;color:var(--accent);font-weight:600;letter-spacing:.03em;text-transform:uppercase;">${t.typeLabel} · Ready to review</div>
        <h1 style="font-size:23px;font-weight:700;letter-spacing:-.02em;margin:5px 0 6px;">${t.title}</h1>
        <button class="patient-link" data-action="patient:${t.patient.id}" style="font-size:13px;color:var(--text-2);transition:color .15s;">${t.patient.name} · ${t.patient.line} →</button>
      </div>
    </div>
    <div style="display:flex;gap:26px;align-items:flex-start;">
      <div style="flex:1;min-width:0;">${body}</div>
      <aside style="width:316px;flex:none;position:sticky;top:90px;">
        <div style="border:1px solid var(--border);background:var(--panel);border-radius:16px;padding:18px;box-shadow:var(--shadow);">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">${I.sapiens}<span style="font-size:13.5px;font-weight:700;">Prepared by Sapiens</span></div>
          <div style="font-size:11.5px;color:var(--text-3);margin-bottom:14px;">${t.at} · cross-checked ${t.srcCount} sources</div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-3);margin-bottom:9px;">What I did</div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">${didItems}</div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-3);margin-bottom:9px;">Sources</div>
          <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:18px;">${srcTags}</div>
          <div style="height:1px;background:var(--border);margin-bottom:16px;"></div>
          <button class="approve-btn" data-action="approve:${t.id}" style="width:100%;padding:11px;border-radius:10px;background:var(--accent-2);color:#fff;font-size:13.5px;font-weight:700;margin-bottom:9px;transition:opacity .15s;">${actionPrimary}</button>
          <div style="display:flex;gap:9px;">
            <button class="edit-btn" data-action="edit" style="flex:1;padding:9px;border-radius:10px;border:1px solid var(--border);font-size:13px;font-weight:600;color:var(--text-2);transition:border-color .15s,color .15s;">Edit</button>
            <button class="dismiss-btn" data-action="dismiss" style="flex:1;padding:9px;border-radius:10px;border:1px solid var(--border);font-size:13px;font-weight:600;color:var(--text-3);transition:border-color .15s,color .15s;">Dismiss</button>
          </div>
          <div style="font-size:11px;color:var(--text-3);text-align:center;margin-top:13px;line-height:1.4;">Nothing is sent until you approve.</div>
        </div>
      </aside>
    </div>
  </div>`;
}

// ── Capability view ───────────────────────────────────────────────────────
function renderCap(){
  const live=liveTasks();
  const ctasks=live.filter(t=>t.type===S.capType).map(vo);
  const cards=ctasks.map(t=>taskCard(t)).join('');
  return `
  <div style="padding:30px 30px 70px;max-width:1000px;margin:0 auto;width:100%;">
    <div style="display:flex;flex-direction:column;gap:13px;">
      ${cards||'<div style="border:1px dashed var(--border);border-radius:13px;padding:30px;text-align:center;font-size:13.5px;color:var(--text-3);">No items waiting here right now.</div>'}
    </div>
  </div>`;
}

// ── Command palette ───────────────────────────────────────────────────────
function renderCmd(){
  const q=S.query.toLowerCase();
  const acts=[
    {label:'Build a lab panel from a visit note',hint:'Lab'},
    {label:'Draft a referral to a specialist',hint:'Referral'},
    {label:'Find Medicare care gaps to close',hint:'Care gaps'},
    {label:'Summarize a fax or discharge document',hint:'Documents'},
    {label:'Generate a SOAP note from a recording',hint:'Notes'},
  ].filter(a=>!q||a.label.toLowerCase().includes(q));
  const pts=PATIENTS.filter(p=>!q||p.name.toLowerCase().includes(q)).slice(0,4);
  const actRows=acts.map(a=>`
    <button class="cmd-btn" data-action="cmd-act" style="display:flex;align-items:center;gap:12px;width:100%;padding:10px 11px;border-radius:10px;text-align:left;transition:background .12s;">
      <span style="width:30px;height:30px;border-radius:8px;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;flex:none;">${I.arrow}</span>
      <span style="flex:1;font-size:13.5px;color:var(--text);">${a.label}</span>
      <span style="font-size:11px;color:var(--text-3);border:1px solid var(--border);border-radius:6px;padding:2px 8px;">${a.hint}</span>
    </button>`).join('');
  const ptRows=pts.map(p=>`
    <button class="cmd-btn" data-action="patient:${p.id}" style="display:flex;align-items:center;gap:12px;width:100%;padding:10px 11px;border-radius:10px;text-align:left;transition:background .12s;">
      <span style="width:30px;height:30px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex:none;">${initials(p.name)}</span>
      <span style="flex:1;"><span style="display:block;font-size:13.5px;font-weight:600;color:var(--text);">${p.name}</span><span style="display:block;font-size:11.5px;color:var(--text-3);">${p.age} · ${p.sex} · ${p.plan}</span></span>
    </button>`).join('');
  return `
  <div data-action="close-cmd" style="position:fixed;inset:0;background:rgba(13,27,77,.18);backdrop-filter:blur(3px);display:flex;align-items:flex-start;justify-content:center;padding-top:14vh;z-index:50;">
    <div data-action="stop" style="width:560px;max-width:90vw;background:var(--panel);border:1px solid var(--border-2);border-radius:16px;box-shadow:0 30px 70px -20px rgba(13,27,77,.3);overflow:hidden;">
      <div style="display:flex;align-items:center;gap:11px;padding:16px 18px;border-bottom:1px solid var(--border);">
        ${I.sapiens}
        <input id="cmd-input" value="${S.query}" placeholder="Ask Sapiens to do something, or jump to a patient…" autofocus style="flex:1;border:none;background:transparent;color:var(--text);font-size:15px;"/>
        <span style="${MONO};font-size:11px;color:var(--text-3);border:1px solid var(--border);border-radius:5px;padding:2px 6px;">esc</span>
      </div>
      <div style="max-height:50vh;overflow-y:auto;padding:8px;">
        <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-3);padding:8px 10px 5px;">Actions</div>
        ${actRows}
        ${pts.length?`<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-3);padding:12px 10px 5px;">Patients</div>${ptRows}`:''}
      </div>
    </div>
  </div>`;
}

// ── Toast ─────────────────────────────────────────────────────────────────
function renderToast(){
  return `<div class="anim-up" style="position:fixed;bottom:26px;left:50%;transform:translateX(-50%);background:var(--text);color:var(--bg);font-size:13.5px;font-weight:600;padding:12px 20px;border-radius:11px;box-shadow:0 16px 40px -12px rgba(0,0,0,.3);z-index:60;display:flex;align-items:center;gap:9px;">${I.check15}${S.toast}</div>`;
}

// ── Work Item View Overlay ────────────────────────────────────────────────
function renderWorkItemViewOverlay(){
  if(!S.workItemView) return '';
  const w=S.workItemView;
  const p=PATIENTS.find(pt=>pt.id===w.patientId);

  let bodyHtml='';
  if(w.type==='billing'){
    const codeList=(w.codes||'—').split(' + ');
    const codeCards=codeList.filter(c=>c&&c!=='—').map(c=>{
      const meta={
        '99490':{desc:'Chronic Care Management',sub:'20+ min/month'},
        '99439':{desc:'CCM Add-on',sub:'Each additional 20 min'},
        '99487':{desc:'Complex Chronic Care Management',sub:'60+ min/month'},
        '99489':{desc:'Complex CCM Add-on',sub:'Each additional 30 min'},
      }[c]||{desc:c,sub:''};
      return `<div style="padding:12px 16px;border:1px solid var(--border);border-radius:11px;background:var(--panel-2);">
        <div style="font-size:14px;font-weight:800;color:var(--good);margin-bottom:2px;">${c}</div>
        <div style="font-size:12.5px;font-weight:600;color:var(--text);">${meta.desc}</div>
        <div style="font-size:11.5px;color:var(--text-3);">${meta.sub}</div>
      </div>`;
    }).join('');

    bodyHtml=`
      <div style="padding:20px 24px;display:flex;flex-direction:column;gap:16px;">
        <div>
          <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);margin-bottom:8px;">Matched CPT Codes</div>
          <div style="display:flex;flex-direction:column;gap:8px;">${codeCards||'<div style="font-size:13px;color:var(--text-3);">No billable codes — insufficient minutes documented.</div>'}</div>
        </div>
        ${w.revenue&&w.revenue!=='—'?`
        <div style="padding:14px 18px;border-radius:12px;background:var(--good-soft);display:flex;align-items:center;justify-content:space-between;">
          <div style="font-size:13px;font-weight:600;color:var(--good);">Estimated Revenue</div>
          <div style="font-size:20px;font-weight:800;color:var(--good);">${w.revenue}</div>
        </div>`:''}
        ${p?`
        <div>
          <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);margin-bottom:8px;">CCM Activity Log</div>
          <div style="border:1px solid var(--border);border-radius:11px;overflow:hidden;">
            ${p.activities.map((a,i)=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;${i<p.activities.length-1?'border-bottom:1px solid var(--border)':''};">
              <div>
                <div style="font-size:12.5px;font-weight:600;color:var(--text);">${a.desc}</div>
                <div style="font-size:11px;color:var(--text-3);">${a.date}</div>
              </div>
              <div style="font-size:12px;font-weight:700;color:var(--accent);">${a.minutes} min</div>
            </div>`).join('')}
          </div>
        </div>`:''}
      </div>`;
  } else {
    const sections=(w.filledSections||[]);
    bodyHtml=`
      <div style="padding:20px 24px;display:flex;flex-direction:column;gap:16px;">
        ${sections.map(sec=>`
        <div>
          <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);margin-bottom:6px;">${sec.label}</div>
          <div style="font-size:13px;color:var(--text-2);line-height:1.7;white-space:pre-line;">${sec.content}</div>
        </div>`).join('<div style="border-top:1px solid var(--border);"></div>')}
      </div>`;
  }

  const title=w.type==='billing'?'Billing Code Match':w.templateTitle;
  return `
  <div id="wi-view-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:300;display:flex;align-items:center;justify-content:center;padding:20px;">
    <div style="background:var(--bg);border-radius:20px;box-shadow:0 28px 90px rgba(0,0,0,.4);width:100%;max-width:600px;max-height:88vh;overflow-y:auto;display:flex;flex-direction:column;">
      <div style="padding:18px 24px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:var(--bg);z-index:1;">
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:${w.type==='billing'?'var(--good)':'var(--accent)'};margin-bottom:3px;">
            ${w.type==='billing'?'Billing Code Match':'Call Template'}
          </div>
          <div style="font-size:17px;font-weight:800;">${title}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:2px;">${w.patient} · ${w.date}</div>
        </div>
        <button data-action="wi-view-close" style="width:32px;height:32px;border-radius:50%;border:1px solid var(--border);background:var(--panel-2);font-size:17px;cursor:pointer;color:var(--text-3);">×</button>
      </div>
      ${bodyHtml}
    </div>
  </div>`;
}

// ── Followup Template Create Overlay ─────────────────────────────────────
function renderFtCreateOverlay(){
  if(!S.ftCreateOpen) return '';
  const content=S.ftCreateContent;
  const placeholders=[...new Set([...content.matchAll(/\{([^}]+)\}/g)].map(m=>m[1]))];
  const fieldRows=placeholders.map(k=>`
    <div style="border:1px solid var(--border);border-radius:10px;padding:12px 14px;background:var(--panel-2);">
      <div style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;margin-bottom:8px;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Key</div>
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Type</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 110px;gap:8px;align-items:center;margin-bottom:8px;">
        <div style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:var(--panel);font-size:13px;color:var(--text);font-family:monospace;">${k}</div>
        <div style="padding:8px 12px;border:1.5px solid var(--border);border-radius:8px;background:var(--panel);font-size:13px;color:var(--text);display:flex;align-items:center;justify-content:space-between;">String<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></div>
      </div>
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);margin-bottom:4px;">Description</div>
      <input placeholder="" style="width:100%;padding:7px 10px;border:1.5px solid var(--border);border-radius:8px;background:var(--panel);color:var(--text);font-size:13px;font-family:inherit;box-sizing:border-box;"/>
    </div>`).join('');

  const canSave=!!(S.ftCreateName.trim()&&S.ftCreateContent.trim());
  return `
  <div id="ft-create-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:300;display:flex;align-items:center;justify-content:center;padding:20px;">
    <div style="background:var(--bg);border-radius:20px;box-shadow:0 28px 90px rgba(0,0,0,.4);width:100%;max-width:900px;max-height:92vh;display:flex;flex-direction:column;">
      <div style="padding:18px 24px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:18px;font-weight:800;">Create template</div>
          <div style="font-size:12.5px;color:var(--text-3);margin-top:2px;">Build a reusable medical document template.</div>
        </div>
        <button data-action="ft-create-close" style="width:32px;height:32px;border-radius:50%;border:1px solid var(--border);background:var(--panel-2);font-size:17px;cursor:pointer;color:var(--text-3);">×</button>
      </div>
      <div style="flex:1;display:flex;overflow:hidden;">
        <!-- Left: form -->
        <div style="flex:1;padding:20px 24px;display:flex;flex-direction:column;gap:14px;overflow-y:auto;border-right:1px solid var(--border);">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <div style="font-size:11.5px;font-weight:600;color:var(--text-3);margin-bottom:5px;">Name</div>
              <input id="ft-name-input" value="${S.ftCreateName.replace(/"/g,'&quot;')}" placeholder="e.g. Monthly Follow-Up Call"
                style="width:100%;padding:10px 13px;border:1.5px solid var(--border);border-radius:10px;background:var(--panel);color:var(--text);font-size:13.5px;font-family:inherit;box-sizing:border-box;"/>
            </div>
            <div>
              <div style="font-size:11.5px;font-weight:600;color:var(--text-3);margin-bottom:5px;">Description</div>
              <input id="ft-desc-input" value="${S.ftCreateDesc.replace(/"/g,'&quot;')}" placeholder="Brief description of this template"
                style="width:100%;padding:10px 13px;border:1.5px solid var(--border);border-radius:10px;background:var(--panel);color:var(--text);font-size:13.5px;font-family:inherit;box-sizing:border-box;"/>
            </div>
          </div>
          <div>
            <div style="font-size:11.5px;font-weight:600;color:var(--text-3);margin-bottom:5px;">Content <span style="font-weight:400;color:var(--text-3);">— use {placeholder} for auto-detected fields</span></div>
            <textarea id="ft-content-input" placeholder="Write your template here. Use {key} for dynamic fields that will be auto-detected…"
              style="width:100%;min-height:300px;padding:14px 16px;border:1.5px solid var(--border);border-radius:11px;background:var(--panel);color:var(--text);font-size:13px;font-family:'SF Mono','Menlo','Consolas',monospace;line-height:1.75;resize:vertical;box-sizing:border-box;">${S.ftCreateContent.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>
          </div>
          <div>
            <div style="font-size:11.5px;font-weight:600;color:var(--text-3);margin-bottom:5px;">Prompt</div>
            <textarea id="ft-prompt-input" placeholder="Instructions for AI to fill this template…"
              style="width:100%;min-height:80px;padding:12px 16px;border:1.5px solid var(--border);border-radius:11px;background:var(--panel);color:var(--text);font-size:13px;line-height:1.6;resize:vertical;box-sizing:border-box;">${S.ftCreatePrompt.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>
          </div>
        </div>
        <!-- Right: auto-detected fields -->
        <div style="width:300px;flex:none;padding:20px;display:flex;flex-direction:column;gap:12px;overflow-y:auto;">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="font-size:14px;font-weight:700;">Fields</div>
            <div style="font-size:12px;color:var(--text-3);">${placeholders.length} detected</div>
          </div>
          ${placeholders.length>0?fieldRows:`
          <div style="padding:24px 0;text-align:center;color:var(--text-3);font-size:12.5px;line-height:1.6;">
            Use <code style="background:var(--panel-2);padding:1px 5px;border-radius:4px;font-size:12px;">{key}</code> in your content<br>to auto-detect fields here.
          </div>`}
        </div>
      </div>
      <div style="padding:14px 24px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px;">
        <button data-action="ft-create-close" style="padding:10px 22px;border-radius:11px;border:1.5px solid var(--border);background:var(--panel-2);color:var(--text-2);font-size:13.5px;font-weight:600;cursor:pointer;">Cancel</button>
        <button data-action="ft-create-save" style="padding:10px 22px;border-radius:11px;background:${canSave?'var(--accent-2)':'var(--panel-2)'};color:${canSave?'#fff':'var(--text-3)'};font-size:13.5px;font-weight:700;cursor:pointer;">Save</button>
      </div>
    </div>
  </div>`;
}

// ── Main render ───────────────────────────────────────────────────────────
function render(){
  document.body.dataset.theme=S.theme;
  const ma=S.role==='assistant';
  const isDark=S.theme==='dark';
  const app=document.getElementById('app');
  let content='';
  if(S.view==='today') content=renderToday(ma);
  else if(S.view==='patients') content=renderPatients();
  else if(S.view==='patient') content=renderPatient();
  else if(S.view==='task') content=renderTask(ma);
  else if(S.view==='cap') content=renderCap();
  else if(S.view==='mem') content=renderMem();
  app.innerHTML=`
  <aside class="sidebar" style="width:254px;flex:none;border-right:1px solid var(--border);background:var(--sidebar);backdrop-filter:blur(10px);padding:18px 14px;display:flex;flex-direction:column;gap:20px;position:sticky;top:0;height:100vh;overflow-y:auto;">
    ${renderSidebar(ma,isDark)}
  </aside>
  <div style="flex:1;min-width:0;display:flex;flex-direction:column;">
    ${renderHeader(ma)}
    <div style="flex:1;overflow-y:auto;">${content}</div>
  </div>
  ${S.cmd?renderCmd():''}
  ${S.toast?renderToast():''}
  ${renderBillingMatchOverlay()}
  ${renderCarePlanOverlay()}
  ${renderTemplateOverlay()}
  ${renderAddTemplate()}
  ${renderWorkItemViewOverlay()}
  ${renderFtCreateOverlay()}`;
  bindInputs();
}

// ── Input wiring ──────────────────────────────────────────────────────────
// filterInput: re-renders (for live search) but preserves cursor position
function filterInput(el, updater){
  el.addEventListener('input', e=>{
    const pos=e.target.selectionStart;
    updater(e.target.value);
    render();
    const restored=document.getElementById(el.id);
    if(restored){ restored.focus(); restored.setSelectionRange(pos,pos); }
  });
}

// plainInput: never re-renders — safe for free-text fields (no IME breakage)
function plainInput(el, updater){
  el.addEventListener('input', e=>updater(e.target.value));
}

function bindInputs(){
  const pq=document.getElementById('pq-input');
  if(pq){ pq.focus(); pq.setSelectionRange(pq.value.length,pq.value.length); filterInput(pq,v=>{S.pq=v;}); }

  const ci=document.getElementById('cmd-input');
  if(ci){ ci.focus(); filterInput(ci,v=>{S.query=v;}); }

  const wq=document.getElementById('work-q-input');
  if(wq){ wq.focus(); filterInput(wq,v=>{S.workQ=v;}); }

  // new patient name — no render, update button opacity directly
  const np=document.getElementById('new-p-name');
  if(np){
    np.focus();
    plainInput(np, v=>{
      S.newPName=v;
      const btn=document.querySelector('[data-action="create-patient"]');
      if(btn) btn.style.opacity=v.trim()?'1':'.4';
    });
  }

  const lq=document.getElementById('lab-q-input');
  if(lq){ lq.focus(); filterInput(lq,v=>{S.labQ=v;}); }

  const np2=document.getElementById('note-patient-input');
  if(np2) plainInput(np2,v=>{S.notePatient=v;});
  const nd=document.getElementById('note-date-input');
  if(nd) plainInput(nd,v=>{S.noteDate=v;});
  const nc=document.getElementById('note-comment-input');
  if(nc) plainInput(nc,v=>{S.noteComment=v;});
  const rs=document.getElementById('ref-specialist-input');
  if(rs) plainInput(rs,v=>{S.refSpecialist=v;});
  const rp=document.getElementById('ref-patient-input');
  if(rp) plainInput(rp,v=>{S.refPatient=v;});
  const rr=document.getElementById('ref-reason-input');
  if(rr) plainInput(rr,v=>{S.refReason=v;});
  const atl=document.getElementById('at-label-input');
  if(atl){ atl.focus(); plainInput(atl,v=>{
    S.addTmplLabel=v;
    const btn=document.querySelector('[data-action="at-save"]');
    if(btn){const ok=!!(v.trim()&&S.addTmplContent.trim());btn.style.background=ok?'#4c2d9c':'var(--panel-2)';btn.style.color=ok?'#fff':'var(--text-3)';}
  }); }
  const atc=document.getElementById('at-content-input');
  if(atc) plainInput(atc,v=>{
    S.addTmplContent=v;
    const btn=document.querySelector('[data-action="at-save"]');
    if(btn){const ok=!!(S.addTmplLabel.trim()&&v.trim());btn.style.background=ok?'#4c2d9c':'var(--panel-2)';btn.style.color=ok?'#fff':'var(--text-3)';}
  });
  // followup template create
  const ftn=document.getElementById('ft-name-input');
  if(ftn){ ftn.focus(); filterInput(ftn,v=>{S.ftCreateName=v;}); }
  const ftd=document.getElementById('ft-desc-input');
  if(ftd) filterInput(ftd,v=>{S.ftCreateDesc=v;});
  const ftc=document.getElementById('ft-content-input');
  if(ftc) filterInput(ftc,v=>{
    S.ftCreateContent=v;
    const btn=document.querySelector('[data-action="ft-create-save"]');
    if(btn){const ok=!!(S.ftCreateName.trim()&&v.trim());btn.style.background=ok?'var(--accent-2)':'var(--panel-2)';btn.style.color=ok?'#fff':'var(--text-3)';}
  });
  const ftp=document.getElementById('ft-prompt-input');
  if(ftp) filterInput(ftp,v=>{S.ftCreatePrompt=v;});
  const bp=document.getElementById('bill-prompt-input');
  if(bp) filterInput(bp,v=>{S.billingPrompt=v;});
  const cp=document.getElementById('cp-prompt-input');
  if(cp) filterInput(cp,v=>{S.cpPrompt=v;});
}

// ── Event delegation ──────────────────────────────────────────────────────
document.getElementById('app').addEventListener('click',e=>{
  const el=e.target.closest('[data-action]');
  if(!el) return;
  const act=el.dataset.action;
  if(act==='stop'){e.stopPropagation();return;}
  if(act==='close-cmd'){S.cmd=false;S.query='';render();return;}
  if(act==='cmd'){S.cmd=true;S.query='';render();return;}
  if(act==='toggle-new-task'){S.newTaskOpen=!S.newTaskOpen;render();return;}
  if(act==='work-open'){S.workOpen=true;S.workMode=null;S.workQ='';S.newPName='';render();return;}
  if(act==='work-close'){S.workOpen=false;S.workMode=null;S.workQ='';S.newPName='';render();return;}
  if(act==='work-back'){S.workMode=null;S.workQ='';S.newPName='';render();return;}
  if(act==='work-mode:existing'){S.workMode='existing';S.workQ='';render();return;}
  if(act==='work-mode:new'){S.workMode='new';S.newPName='';render();return;}
  if(act==='create-patient'){
    const name=S.newPName.trim(); if(!name) return;
    const id='ep'+Date.now();
    S.extraPatients=[...S.extraPatients,{id,name,age:null,sex:null,plan:null,risk:null,mrn:null,clinic:currentClinic().label,last:'Just now'}];
    S.view='patient';S.patientId=id;S.workOpen=false;S.workMode=null;S.newPName='';render();return;
  }
  if(act.startsWith('pt-open:')){S.view='patient';S.patientId=act.slice(8);render();return;}
  if(act==='practices-toggle'){S.practicesOpen=!S.practicesOpen;render();return;}
  if(act.startsWith('ccm-care:')){S.ccmCareType=act.slice(9);render();return;}
  if(act.startsWith('ccm-signoff:')){S.ccmSignOff=act.slice(12);render();return;}
  if(act.startsWith('ccm-ins:')){S.ccmInsurance=act.slice(8);render();return;}
  if(act.startsWith('pt-status:')){S.ptStatus=act.slice(10);render();return;}
  if(act.startsWith('pt-provider:')){S.ptProvider=act.slice(12);render();return;}
  if(act.startsWith('pt-sort:')){S.ptSort=act.slice(8);render();return;}
  if(act==='billing-open'){
    S.billingOpen=true;S.billingPhase='input';S.billingPrompt='';render();
    return;
  }
  if(act==='billing-run'){S.billingPhase='running';S.billingInputMenu=false;S.billingReview={};render();setTimeout(()=>{if(S.billingOpen){S.billingPhase='done';render();}},2000);return;}
  if(act.startsWith('billing-accept:')){const id=act.slice(15);S.billingReview={...S.billingReview,[id]:'accepted'};render();return;}
  if(act.startsWith('billing-reject:')){const id=act.slice(15);S.billingReview={...S.billingReview,[id]:'rejected'};render();return;}
  if(act==='billing-close'){S.billingOpen=false;S.billingPhase='input';S.billingPrompt='';S.billingInputs=[];S.billingInputMenu=false;S.billingReview={};S.billingViewingId=null;render();return;}
  if(act==='billing-add-note'){
    if(!S.billingPrompt.trim()) return;
    S.billingInputs=[...S.billingInputs,{type:'note',label:'User Note',content:S.billingPrompt.trim()}];
    S.billingPrompt='';render();return;
  }
  if(act==='billing-toggle-input-menu'){S.billingInputMenu=!S.billingInputMenu;render();return;}
  if(act==='billing-add-transcript'){
    const newId=Date.now();
    S.billingInputs=[...S.billingInputs,{type:'audio-loading',label:'Visit Transcript',content:'',id:newId}];
    S.billingInputMenu=false;render();
    setTimeout(()=>{
      const idx=S.billingInputs.findIndex(x=>x.id===newId);
      if(idx>=0){S.billingInputs=S.billingInputs.map((x,i)=>i===idx?{...x,type:'transcript',content:VISIT_TRANSCRIPT}:x);render();}
    },2600);
    return;
  }
  if(act==='billing-add-referral'){
    S.billingInputs=[...S.billingInputs,{type:'referral',label:'Referral Letter',content:REFERRAL_LETTER,id:Date.now()}];
    S.billingInputMenu=false;render();return;
  }
  if(act.startsWith('billing-remove-input:')){
    const idx=parseInt(act.slice(21));
    S.billingInputs=S.billingInputs.filter((_,i)=>i!==idx);render();return;
  }
  if(act==='billing-assign'){
    const p=PATIENTS.find(pt=>pt.id===S.patientId);
    if(p){
      const accepted=Object.entries(S.billingReview).filter(([,v])=>v==='accepted').map(([k])=>k);
      const acceptedCPT=accepted.filter(k=>CPT_RATES[k]);
      const acceptedICD=accepted.filter(k=>!CPT_RATES[k]);
      const cptRev=acceptedCPT.reduce((s,k)=>s+(CPT_RATES[k]||0),0);
      const codesDisplay=acceptedCPT.length
        ?acceptedCPT.join(' + ')+(acceptedICD.length?` + ${acceptedICD.length} ICD`:'')
        :acceptedICD.length?`${acceptedICD.length} ICD codes`:'—';
      S.completedWork=[{
        id:Date.now(), type:'billing', patientId:p.id, patient:p.name, provider:p.provider,
        date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'}),
        codes:codesDisplay,
        revenue:cptRev>0?'$'+cptRev.toFixed(2):'—',
        savedReview:{...S.billingReview},
        savedInputs:[...S.billingInputs],
        savedPrompt:S.billingPrompt,
      },...S.completedWork];
    }
    S.billingOpen=false;S.billingPhase='input';S.billingPrompt='';S.billingInputs=[];S.billingInputMenu=false;S.billingReview={};S.billingViewingId=null;
    showToast('Billing codes assigned');render();return;
  }
  if(act==='care-plan-open'){
    S.carePlanOpen=true;S.cpPhase='input';S.cpTemplate=null;S.cpInputs=[];S.cpInputMenu=false;S.cpPrompt='';S.cpViewingId=null;
    render();return;
  }
  if(act==='care-plan-close'){
    S.carePlanOpen=false;S.cpPhase='input';S.cpTemplate=null;S.cpInputs=[];S.cpInputMenu=false;S.cpPrompt='';S.cpViewingId=null;
    render();return;
  }
  if(act.startsWith('cp-select:')){
    S.cpTemplate=parseInt(act.slice(10));S.cpInputMenu=false;render();return;
  }
  if(act==='cp-run'){
    if(!S.cpTemplate) return;
    S.cpPhase='running';S.cpInputMenu=false;render();
    setTimeout(()=>{if(S.carePlanOpen){S.cpPhase='done';render();}},2600);
    return;
  }
  if(act==='cp-input-menu'){S.cpInputMenu=!S.cpInputMenu;render();return;}
  if(act==='cp-add-transcript'){
    S.cpInputs=[...S.cpInputs,{type:'transcript',label:'Visit Transcript',content:VISIT_TRANSCRIPT,id:Date.now()}];
    S.cpInputMenu=false;render();return;
  }
  if(act==='cp-add-note'){
    const note=S.cpPrompt.trim()||'Monthly check-in — patient reports stable symptoms, compliant with medications. BP 128/82. No new complaints. Medication refills requested.';
    S.cpInputs=[...S.cpInputs,{type:'note',label:'Call Notes',content:note,id:Date.now()}];
    S.cpInputMenu=false;render();return;
  }
  if(act.startsWith('cp-remove-input:')){
    const idx=parseInt(act.slice(16));
    S.cpInputs=S.cpInputs.filter((_,i)=>i!==idx);render();return;
  }
  if(act==='care-plan-sign'){
    const p=PATIENTS.find(pt=>pt.id===S.patientId);
    const tmpl=CALL_TEMPLATES.find(t=>t.id===S.cpTemplate)||CALL_TEMPLATES[0];
    if(p){
      const filled=buildFilledTemplate(p);
      S.completedWork=[{
        id:Date.now(), type:'template', patientId:p.id, patient:p.name, provider:p.provider,
        templateNum:tmpl.num, templateTitle:tmpl.title, templateId:tmpl.id,
        filledSections:filled,
        date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'}),
        savedCpTemplate:S.cpTemplate,
        savedCpInputs:[...S.cpInputs],
        savedCpPrompt:S.cpPrompt,
      },...S.completedWork];
    }
    S.carePlanOpen=false;S.cpPhase='input';S.cpTemplate=null;S.cpInputs=[];S.cpInputMenu=false;S.cpPrompt='';S.cpViewingId=null;
    showToast('Template assigned');render();return;
  }
  // legacy compat
  if(act==='care-plan-back'){S.cpPhase='input';S.cpTemplate=null;render();return;}
  if(act.startsWith('care-plan-select:')){
    S.cpTemplate=parseInt(act.slice(17));S.cpPhase='running';render();
    setTimeout(()=>{if(S.carePlanOpen){S.cpPhase='done';render();}},2600);
    return;
  }
  if(act==='clinic-drop'){S.clinicDrop=!S.clinicDrop;render();return;}
  if(act.startsWith('clinic-select:')){
    S.clinic=act.slice(14);S.clinicDrop=false;
    S.view='today';S.taskId=null;S.patientId=null;
    render();return;
  }
  if(act==='theme'){S.theme=S.theme==='dark'?'light':'dark';render();return;}
  if(act==='go:today'){S.view='today';S.taskId=null;S.patientId=null;S.workItem=null;S.cmd=false;render();return;}
  if(act==='go:patients'){S.view='patients';S.taskId=null;S.patientId=null;S.workItem=null;S.cmd=false;render();return;}
  if(act.startsWith('work:')){
    const item=act.slice(5);
    S.view='patients';S.taskId=null;S.patientId=null;S.workItem=item;S.cmd=false;render();return;
  }
  if(act.startsWith('mem:')){S.view='mem';S.cmd=false;render();return;}
  if(act==='lab-wf-start'){
    if(!S.labSelected.length&&S.taskId){
      const rawT=[...TASKS,...S.extraTasks].find(x=>x.id===S.taskId);
      if(rawT&&rawT.lab){S.labSelected=rawT.lab.items.map(item=>{const lt=LAB_TESTS.find(l=>l.cpt===item.cpt&&l.cat===item.cat);return lt?lt.id:null;}).filter(Boolean);}
    }
    S.labWf=true;S.labWfStep=1;render();
    setTimeout(()=>{S.labWfStep=2;render();},700);
    setTimeout(()=>{S.labWfStep=3;render();},1500);
    setTimeout(()=>{S.labWfStep=4;render();},2300);
    return;
  }
  if(act==='labwf-close'){S.labWf=false;S.labWfStep=0;render();return;}
  if(act.startsWith('wi-view:')){
    const id=parseInt(act.slice(8));
    const w=S.completedWork.find(x=>x.id===id)||null;
    if(!w){render();return;}
    if(w.type==='billing'){
      S.view='patient';S.patientId=w.patientId;
      S.billingOpen=true;S.billingPhase='done';
      S.billingReview=w.savedReview?{...w.savedReview}:{};
      S.billingInputs=w.savedInputs?[...w.savedInputs]:[];
      S.billingPrompt=w.savedPrompt||'';
      S.billingInputMenu=false;S.billingViewingId=w.id;S.workItemView=null;
      render();return;
    }
    if(w.type==='template'){
      S.view='patient';S.patientId=w.patientId;
      S.carePlanOpen=true;S.cpPhase='done';
      S.cpTemplate=w.savedCpTemplate||w.templateId||1;
      S.cpInputs=w.savedCpInputs?[...w.savedCpInputs]:[];
      S.cpPrompt=w.savedCpPrompt||'';
      S.cpInputMenu=false;S.cpViewingId=w.id;S.workItemView=null;
      render();return;
    }
    S.workItemView=w;render();return;
  }
  if(act==='wi-view-close'){S.workItemView=null;render();return;}
  if(act.startsWith('ft-detail:')){S.ftDetailId=parseInt(act.slice(10));render();return;}
  if(act==='ft-back'){S.ftDetailId=null;render();return;}
  if(act==='ft-create-open'){S.ftCreateOpen=true;S.ftCreateName='';S.ftCreateDesc='';S.ftCreateContent='';S.ftCreatePrompt='';render();return;}
  if(act==='ft-create-close'){S.ftCreateOpen=false;render();return;}
  if(act==='ft-create-save'){
    if(!S.ftCreateName.trim()||!S.ftCreateContent.trim()) return;
    const id='uft-'+Date.now();
    const placeholders=[...new Set([...S.ftCreateContent.matchAll(/\{([^}]+)\}/g)].map(m=>m[1]))];
    S.userFtTemplates=[...S.userFtTemplates,{
      id, num:'', title:S.ftCreateName.trim(), hint:S.ftCreateDesc.trim(),
      rawContent:S.ftCreateContent, prompt:S.ftCreatePrompt,
    }];
    S.ftCreateOpen=false;
    showToast('Template saved');render();return;
  }
  if(act==='at-open'){S.addTmplOpen=true;S.addTmplLabel='';S.addTmplContent='';S.addTmplType='note';render();return;}
  if(act==='at-close'){S.addTmplOpen=false;render();return;}
  if(act.startsWith('at-type:')){S.addTmplType=act.slice(8);render();return;}
  if(act==='at-save'){
    if(!S.addTmplLabel.trim()||!S.addTmplContent.trim()) return;
    const id='utmpl-'+Date.now();
    S.userTemplates=[...S.userTemplates,{id,type:S.addTmplType,label:S.addTmplLabel.trim(),content:S.addTmplContent}];
    S.addTmplOpen=false;S.addTmplLabel='';S.addTmplContent='';
    showToast('Template saved');render();return;
  }
  if(act.startsWith('tmpl-open:')){S.templateOpen=true;S.templateId=act.slice(10);render();return;}
  if(act==='tmpl-close'){S.templateOpen=false;S.templateId=null;render();return;}
  if(act==='tmpl-copy'){
    const tmpl=TEMPLATES.find(t=>t.id===S.templateId);
    if(tmpl) navigator.clipboard.writeText(tmpl.content).then(()=>{
      const btn=document.getElementById('tmpl-copy-btn');
      if(btn){btn.textContent='Copied!';btn.style.color='var(--good)';setTimeout(()=>{btn.textContent='Copy';btn.style.color='';},1800);}
    });
    return;
  }
  if(act==='role:physician'){S.role='physician';render();return;}
  if(act==='role:assistant'){S.role='assistant';render();return;}
  if(act.startsWith('cap:')){S.view='cap';S.capType=act.slice(4);S.taskId=null;S.patientId=null;S.newTaskOpen=false;render();return;}
  if(act.startsWith('task:')){
    const tid=act.slice(5);
    const t=S.extraTasks.find(x=>x.id===tid);
    if(t&&t.type==='lab'&&t.lab){
      S.labSelected=t.lab.items.map(item=>{const lt=LAB_TESTS.find(l=>l.cpt===item.cpt&&l.cat===item.cat);return lt?lt.id:null;}).filter(Boolean);
      S.labOpen=true;S.labQ='';S.labFilter='all';render();return;
    }
    if(t&&t.type==='note'&&t.soap){S.noteOpen=true;S.noteStep='review';render();return;}
    if(t&&t.type==='doc'&&t.doc){S.docOpen=true;S.docStep='review';S.docFileName=t.doc.source;render();return;}
    if(t&&t.type==='referral'&&t.referral){S.refOpen=true;S.refStep='review';S.refSpecialist=t.referral.specialist;S.refReason=t.referral.reason;S.refDocs=t.referral.docs;render();return;}
    S.view='task';S.taskId=tid;S.cmd=false;render();return;
  }
  if(act.startsWith('patient:')){S.view='patient';S.patientId=act.slice(8);S.taskId=null;S.cmd=false;S.workOpen=false;S.workMode=null;render();return;}
  if(act.startsWith('approve:')){
    const id=act.slice(8);
    S.approved=[...S.approved,id];
    S.view='today';S.taskId=null;
    showToast(S.role==='assistant'?'Sent to Dr. Cho for sign-off':'Approved — synced to EMR');
    return;
  }
  if(act==='edit'){showToast('Opening for edit…');return;}
  if(act==='dismiss'){S.view='today';S.taskId=null;showToast('Dismissed');render();return;}
  if(act==='ref-close'){S.refOpen=false;S.refStep='compose';S.refDocs=[];render();return;}
  if(act==='ref-back'){S.refStep='compose';render();return;}
  if(act==='ref-add-doc'){
    const unused=REF_DOC_NAMES.filter(n=>!S.refDocs.includes(n));
    if(unused.length) S.refDocs=[...S.refDocs,unused[0]];
    render();return;
  }
  if(act.startsWith('ref-remove-doc:')){
    const i=parseInt(act.slice(15));
    S.refDocs=S.refDocs.filter((_,idx)=>idx!==i);
    render();return;
  }
  if(act==='ref-generate'){
    if(!S.refSpecialist.trim()||!S.refReason.trim()) return;
    S.refStep='review';render();return;
  }
  if(act==='ref-assign'){
    const now=new Date();
    const timeStr=now.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
    const id='ref-'+Date.now();
    const letter=sampleReferralLetter(S.refSpecialist,S.refReason,S.refPatient,S.refDocs);
    S.extraTasks=[...S.extraTasks,{
      id, type:'referral', patient:S.patientId, at:timeStr, urgent:false,
      title:`Referral — ${S.refSpecialist||'Specialist'}`,
      summary:letter.slice(0,120)+'…',
      sources:S.refDocs, did:[],
      referral:{specialist:S.refSpecialist,reason:S.refReason,docs:S.refDocs,letter},
    }];
    S.refOpen=false;S.refStep='compose';S.refDocs=[];S.refSpecialist='';S.refReason='';S.refPatient='';
    showToast('Referral assigned — added to Works Record');return;
  }
  if(act==='doc-close'){S.docOpen=false;S.docStep='upload';S.docFileName='';render();return;}
  if(act==='doc-back'){S.docStep='upload';render();return;}
  if(act==='doc-pick'){
    const names=['discharge_summary.pdf','referral_cardiology.pdf','lab_results_fax.pdf','op_note_06_2026.pdf'];
    S.docFileName=names[Math.floor(Math.random()*names.length)];
    render();return;
  }
  if(act==='doc-process'){
    if(!S.docFileName) return;
    S.docStep='review';render();return;
  }
  if(act==='doc-assign'){
    const now=new Date();
    const timeStr=now.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
    const id='doc-'+Date.now();
    S.extraTasks=[...S.extraTasks,{
      id, type:'doc', patient:S.patientId, at:timeStr, urgent:false,
      title:`Document — ${S.docFileName||'document.pdf'}`,
      summary:SAMPLE_DOC_NOTE.slice(0,120)+'…',
      sources:[], did:[],
      doc:{source:S.docFileName||'document.pdf', note:SAMPLE_DOC_NOTE, rows:[]},
    }];
    S.docOpen=false;S.docStep='upload';S.docFileName='';
    showToast('Document assigned — added to Works Record');return;
  }
  if(act==='note-close'){S.noteOpen=false;S.noteRecording=false;S.noteStartedAt=null;S.noteStep='record';render();return;}
  if(act==='note-back'){S.noteStep='record';render();return;}
  if(act==='note-toggle-record'){
    if(S.noteRecording){S.noteRecording=false;}
    else{S.noteRecording=true;S.noteStartedAt=Date.now();}
    render();return;
  }
  if(act==='note-generate'){
    if(!S.noteStartedAt||S.noteRecording) return;
    S.noteStep='review';render();return;
  }
  if(act==='note-assign'){
    const patientName=S.notePatient||(S.patientId?byId(S.patientId)?.name:'Unknown');
    const now=new Date();
    const timeStr=now.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
    const id='note-'+Date.now();
    S.extraTasks=[...S.extraTasks,{
      id, type:'note', patient:S.patientId, at:timeStr, urgent:false,
      title:`Visit note — ${patientName||'Patient'}`,
      summary:'SOAP note generated from visit recording.',
      sources:[], did:[],
      soap:{S:SAMPLE_SOAP.S,O:SAMPLE_SOAP.O,A:SAMPLE_SOAP.A,P:SAMPLE_SOAP.P},
      suggestions:[],
    }];
    S.noteOpen=false;S.noteStep='record';S.noteRecording=false;S.noteStartedAt=null;
    showToast('Visit note assigned — added to Works Record');return;
  }
  if(act==='lab-close'){S.labOpen=false;S.labQ='';render();return;}
  if(act==='lab-assign'){
    const selTests=LAB_TESTS.filter(t=>S.labSelected.includes(t.id));
    if(!selTests.length){showToast('Select at least one test first.');return;}
    const names=selTests.map(t=>t.name);
    const shortTitle=names.slice(0,2).join(', ')+(names.length>2?` +${names.length-2} more`:'');
    const now=new Date();
    const timeStr=now.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
    const id='lab-'+Date.now();
    S.extraTasks=[...S.extraTasks,{
      id, type:'lab', patient:S.patientId, at:timeStr, urgent:false,
      title:`Lab panel – ${shortTitle}`,
      summary:'', sources:[], did:[],
      lab:{
        items:selTests.map(t=>({name:t.name,cpt:t.cpt,cat:t.cat,price:t.price,markup:t.markup})),
        reasons:[`Panel of ${selTests.length} test${selTests.length>1?'s':''} assigned at ${timeStr}`],
      },
    }];
    S.labOpen=false; S.labSelected=[]; S.labQ='';
    showToast(`Lab panel assigned — ${selTests.length} test${selTests.length>1?'s':''}`);
    return;
  }
  if(act.startsWith('lab-filter:')){S.labFilter=act.slice(11);render();return;}
  if(act.startsWith('lab-toggle:')){
    const id=parseInt(act.slice(11));
    S.labSelected=S.labSelected.includes(id)?S.labSelected.filter(x=>x!==id):[...S.labSelected,id];
    render();return;
  }
  if(act.startsWith('lab-fav:')){
    const id=parseInt(act.slice(8));
    S.labFavs=S.labFavs.includes(id)?S.labFavs.filter(x=>x!==id):[...S.labFavs,id];
    render();return;
  }
  if(act.startsWith('launch:')){
    const type=act.slice(7);
    if(type==='lab'){S.labOpen=true;S.labQ='';S.labFilter='all';render();return;}
    if(type==='note'){S.noteOpen=true;S.noteStep='record';S.noteRecording=false;S.notePatient='';S.noteDate='';S.noteComment='';S.noteStartedAt=null;render();return;}
    if(type==='doc'){S.docOpen=true;S.docStep='upload';S.docFileName='';render();return;}
    if(type==='referral'){S.refOpen=true;S.refStep='compose';S.refDocs=[];S.refSpecialist='';S.refReason='';S.refPatient='';render();return;}
    const msgs={};
    showToast(msgs[type]||'Sapiens is on it…');return;
  }
  if(act==='cmd-act'){showToast('Sapiens is on it — drafting now');S.cmd=false;render();return;}
});

document.addEventListener('click', e => {
  if(!S.clinicDrop) return;
  const dd = document.getElementById('clinic-dropdown');
  if(dd && !dd.contains(e.target) && !e.target.closest('[data-action="clinic-drop"]')){
    S.clinicDrop = false; render();
  }
});

document.addEventListener('click', e => {
  if(!S.newTaskOpen) return;
  const dd = document.getElementById('nt-dropdown');
  if(dd && !dd.contains(e.target) && !e.target.closest('[data-action="toggle-new-task"]')){
    S.newTaskOpen = false; render();
  }
});

document.addEventListener('click', e => {
  if(S.labOpen){
    const overlay=document.getElementById('lab-overlay');
    if(overlay && e.target===overlay){S.labOpen=false;S.labQ='';render();}
  }
  if(S.noteOpen){
    const overlay=document.getElementById('note-overlay');
    if(overlay && e.target===overlay){S.noteOpen=false;S.noteRecording=false;render();}
  }
  if(S.docOpen){
    const overlay=document.getElementById('doc-overlay');
    if(overlay && e.target===overlay){S.docOpen=false;S.docStep='upload';render();}
  }
  if(S.refOpen){
    const overlay=document.getElementById('ref-overlay');
    if(overlay && e.target===overlay){S.refOpen=false;S.refStep='compose';render();}
  }
  if(S.templateOpen){
    const overlay=document.getElementById('tmpl-overlay');
    if(overlay && e.target===overlay){S.templateOpen=false;S.templateId=null;render();}
  }
  if(S.addTmplOpen){
    const overlay=document.getElementById('at-overlay');
    if(overlay && e.target===overlay){S.addTmplOpen=false;render();}
  }
  if(S.addWfOpen){
    const overlay=document.getElementById('aw-overlay');
    if(overlay && e.target===overlay){S.addWfOpen=false;render();}
  }
  if(S.billingOpen){
    const overlay=document.getElementById('billing-overlay');
    if(overlay && e.target===overlay){S.billingOpen=false;S.billingPhase='input';S.billingPrompt='';S.billingInputs=[];S.billingInputMenu=false;S.billingReview={};S.billingViewingId=null;render();}
  }
  if(S.carePlanOpen){
    const overlay=document.getElementById('care-plan-overlay');
    if(overlay && e.target===overlay){S.carePlanOpen=false;S.cpPhase='input';S.cpTemplate=null;S.cpInputs=[];S.cpInputMenu=false;S.cpPrompt='';S.cpViewingId=null;render();}
  }
  if(S.workItemView){
    const overlay=document.getElementById('wi-view-overlay');
    if(overlay && e.target===overlay){S.workItemView=null;render();}
  }
  if(S.ftCreateOpen){
    const overlay=document.getElementById('ft-create-overlay');
    if(overlay && e.target===overlay){S.ftCreateOpen=false;render();}
  }
});

// ── Keyboard shortcuts ────────────────────────────────────────────────────
window.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&(e.key==='k'||e.key==='K')){e.preventDefault();S.cmd=!S.cmd;S.query='';render();}
  if(e.key==='Escape'){
    if(S.workItemView){S.workItemView=null;render();return;}
    if(S.ftCreateOpen){S.ftCreateOpen=false;render();return;}
    if(S.carePlanOpen){S.carePlanOpen=false;S.cpPhase='input';S.cpTemplate=null;S.cpInputs=[];S.cpInputMenu=false;S.cpPrompt='';S.cpViewingId=null;render();return;}
    if(S.billingOpen){S.billingOpen=false;S.billingPhase='input';S.billingPrompt='';S.billingInputs=[];S.billingInputMenu=false;S.billingReview={};S.billingViewingId=null;render();return;}
    if(S.addWfOpen){S.addWfOpen=false;render();return;}
    if(S.addTmplOpen){S.addTmplOpen=false;render();return;}
    if(S.templateOpen){S.templateOpen=false;S.templateId=null;render();return;}
    if(S.refOpen){S.refOpen=false;S.refStep='compose';render();return;}
    if(S.docOpen){S.docOpen=false;S.docStep='upload';render();return;}
    if(S.noteOpen){S.noteOpen=false;S.noteRecording=false;render();return;}
    if(S.labOpen){S.labOpen=false;S.labQ='';render();return;}
    if(S.cmd){S.cmd=false;render();}
  }
});

// ── Boot ──────────────────────────────────────────────────────────────────
render();
