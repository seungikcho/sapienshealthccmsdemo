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
  dbView: null,
  addWfOpen: false, addWfType: 'lab', addWfLabel: '', addWfSteps: [''],
  userWorkflows: [],
};

// ── Data ─────────────────────────────────────────────────────────────────
const PATIENTS = [];

const TASKS = [];
const PROGRESS = [];
const DONE_SEED = [];
const ACTIVITY = [];
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
      ||(key==='patients'&&(S.view==='patients'||S.view==='patient'))
      ||(key===S.capType&&S.view==='cap')
      ||(key==='mem-templates'&&S.view==='mem'&&S.memTab==='templates')
      ||(key==='mem-database'&&S.view==='mem'&&S.memTab==='database')
      ||(key==='mem-workflow'&&S.view==='mem'&&S.memTab==='workflow');
    return `background:${active?'var(--accent-soft)':'transparent'};color:${active?'var(--text)':'var(--text-2)'}`;
  };
  return `
  <div style="display:flex;align-items:center;gap:10px;padding:4px 6px;">
    <span style="width:28px;height:28px;border-radius:9px;background:linear-gradient(150deg,#a78bfa,#7c5cdb);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;color:#fff;">A</span>
    <span style="font-size:14px;font-weight:700;letter-spacing:-.015em;line-height:1.2;">Archway Family<br>Medicine</span>
  </div>
  <div style="display:flex;flex-direction:column;gap:3px;">
    <div style="font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--text-3);padding:0 8px 7px;">Workspace</div>
    <button class="nav-btn" data-action="go:today" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('today')};transition:background .15s;">${I.home} Home</button>
    <button class="nav-btn" data-action="go:patients" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('patients')};transition:background .15s;">${I.patients} Patients</button>
  </div>
  <div style="display:flex;flex-direction:column;gap:3px;">
    <div style="font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--text-3);padding:0 8px 7px;">Work Items</div>
    <button class="nav-btn" data-action="cap:lab" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('lab')};transition:background .15s;">${I.lab} Lab panels</button>
    <button class="nav-btn" data-action="cap:referral" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('referral')};transition:background .15s;">${I.referral} Referrals</button>
    <button class="nav-btn" data-action="cap:note" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('note')};transition:background .15s;">${I.note} Visit notes</button>
    <button class="nav-btn" data-action="cap:doc" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('doc')};transition:background .15s;">${I.doc} Documents</button>
  </div>
  <div style="display:flex;flex-direction:column;gap:3px;">
    <div style="font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--text-3);padding:0 8px 7px;">Memory</div>
    <button class="nav-btn" data-action="mem:templates" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('mem-templates')};transition:background .15s;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><path d="M17 13v8M13 17h8"/></svg>
      Templates
    </button>
    <button class="nav-btn" data-action="mem:database" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('mem-database')};transition:background .15s;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>
      Database
    </button>
    <button class="nav-btn" data-action="mem:workflow" style="display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;font-size:13.5px;font-weight:600;${nb('mem-workflow')};transition:background .15s;">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M5 8v4a5 5 0 0 0 5 5h.5M19 8v4a5 5 0 0 1-5 5h-.5"/></svg>
      Workflow
    </button>
  </div>
  <div style="margin-top:auto;display:flex;align-items:center;gap:10px;padding:0 4px;">
    <span style="width:30px;height:30px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:800;">SC</span>
    <div style="flex:1;min-width:0;">
      <div style="font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Dr. Seungik Cho</div>
      <div style="font-size:11px;color:var(--text-3);">Archway Family Medicine</div>
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
Dr. Seungik Cho
Archway Family Medicine`;
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
          <div style="font-size:13px;color:var(--text-3);margin-top:3px;">Search the Archway lab price list, build a panel, and see your combined pricing.</div>
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

// ── Today view ────────────────────────────────────────────────────────────
function renderToday(ma){
  const allPatients=[...PATIENTS,...S.extraPatients];
  const wq=S.workQ.toLowerCase();
  const filteredPatients=allPatients.filter(p=>!wq||p.name.toLowerCase().includes(wq));

  const TYPE_COLOR={lab:'var(--accent)',note:'var(--good)',referral:'var(--info)',doc:'var(--ready)'};
  const TYPE_LABEL={lab:'Lab panel',note:'Visit note',referral:'Referral',doc:'Document'};

  function oneSentence(t){
    const p=byId(t.patient);
    const n=p?.name||'patient';
    if(t.type==='lab'){const c=t.lab?.items?.length||1;return `Ordered ${c} lab test${c!==1?'s':''} for ${n}.`;}
    if(t.type==='note') return `Visit note recorded for ${n}.`;
    if(t.type==='referral') return `Referral to ${t.referral?.specialist||'specialist'} drafted for ${n}.`;
    if(t.type==='doc') return `Document "${t.doc?.source||'file'}" extracted and summarized for ${n}.`;
    return `${t.title} assigned for ${n}.`;
  }

  const logs=[...S.extraTasks].reverse();

  const rows=logs.map((t,i)=>{
    const color=TYPE_COLOR[t.type]||'var(--text-3)';
    const label=TYPE_LABEL[t.type]||t.type;
    const isLast=i===logs.length-1;
    return `
    <div style="display:flex;align-items:center;gap:14px;padding:15px 22px;${isLast?'':'border-bottom:1px solid var(--border)'};">
      <span style="width:7px;height:7px;border-radius:50%;background:${color};flex:none;"></span>
      <span style="flex:1;font-size:13.5px;color:var(--text);line-height:1.45;">${oneSentence(t)}</span>
      <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:${color};flex:none;">${label}</span>
      <span style="font-size:12px;color:var(--text-3);flex:none;width:54px;text-align:right;">${t.at}</span>
    </div>`;
  }).join('');

  const empty=`
    <div style="padding:52px 24px;text-align:center;font-size:13.5px;color:var(--text-3);">
      Assigned work will appear here.
    </div>`;

  return `
  <div style="padding:86px 32px 70px;max-width:820px;margin:0 auto;width:100%;">
    ${renderCreateWork(filteredPatients)}
    <div style="border:1px solid var(--border);border-radius:16px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">
      ${logs.length?rows:empty}
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
function renderAddWorkflow(){
  if(!S.addWfOpen) return '';
  const TYPE_OPTS=[
    {id:'lab',     label:'Lab panels',  icon:I.lab,      color:'var(--accent)',soft:'var(--accent-soft)'},
    {id:'referral',label:'Referrals',   icon:I.referral, color:'var(--info)',  soft:'var(--info-soft)'},
    {id:'note',    label:'Visit notes', icon:I.note,     color:'var(--good)',  soft:'var(--good-soft)'},
    {id:'doc',     label:'Documents',   icon:I.doc,      color:'var(--ready)', soft:'var(--ready-soft)'},
  ];
  const typePills=TYPE_OPTS.map(o=>`
    <button data-action="aw-type:${o.id}"
      style="display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:20px;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .15s;
        background:${S.addWfType===o.id?o.soft:'var(--panel-2)'};
        color:${S.addWfType===o.id?o.color:'var(--text-3)'};
        border:1.5px solid ${S.addWfType===o.id?o.color:'transparent'};">
      ${o.icon.replace('stroke="currentColor"',`stroke="${S.addWfType===o.id?o.color:'var(--text-3)'}"`)
              .replace(/width="\d+"/,'width="14"').replace(/height="\d+"/,'height="14"')}
      @ ${o.label}
    </button>`).join('');

  const stepItems=S.addWfSteps.map((step,i)=>`
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="width:24px;height:24px;border-radius:50%;background:var(--accent-soft);color:var(--accent);font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none;">${i+1}</span>
      <input id="wf-step-${i}" value="${step.replace(/"/g,'&quot;')}" placeholder="Describe this step…"
        style="flex:1;padding:10px 13px;border:1.5px solid var(--border);border-radius:10px;background:var(--panel);color:var(--text);font-size:13.5px;font-family:inherit;"/>
      ${S.addWfSteps.length>1?`<button data-action="aw-rm-step:${i}" style="color:var(--text-3);font-size:17px;cursor:pointer;background:none;border:none;padding:0 3px;flex:none;">×</button>`:''}
    </div>`).join('');

  const canSave=!!(S.addWfLabel.trim()&&S.addWfSteps.some(s=>s.trim()));
  return `
  <div style="position:fixed;inset:0;z-index:50;background:rgba(13,27,77,.22);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;" id="aw-overlay">
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:22px;box-shadow:0 24px 70px rgba(13,27,77,.24);width:min(620px,96vw);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;">
      <div style="display:flex;align-items:center;padding:22px 28px;border-bottom:1px solid var(--border);flex:none;">
        <span style="font-size:17px;font-weight:800;letter-spacing:-.02em;color:var(--text);flex:1;">Add Workflow</span>
        <button data-action="aw-close" style="width:32px;height:32px;border-radius:9px;border:1px solid var(--border);background:var(--panel);color:var(--text-2);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">×</button>
      </div>
      <div style="flex:1;overflow-y:auto;padding:24px 28px;display:flex;flex-direction:column;gap:20px;">
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);margin-bottom:10px;">Work Item Tag</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">${typePills}</div>
        </div>
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);margin-bottom:8px;">Workflow Name</div>
          <input id="aw-label-input" value="${S.addWfLabel.replace(/"/g,'&quot;')}" placeholder="e.g. Price comparison across vendors"
            style="width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:11px;background:var(--panel);color:var(--text);font-size:13.5px;font-family:inherit;"/>
        </div>
        <div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-3);margin-bottom:10px;">Steps</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${stepItems}
            <button data-action="aw-add-step"
              style="display:flex;align-items:center;gap:8px;padding:9px 14px;border-radius:10px;border:1.5px dashed var(--border);background:transparent;color:var(--text-3);font-size:13px;font-weight:600;cursor:pointer;margin-top:2px;">
              ${I.plus} Add step
            </button>
          </div>
        </div>
      </div>
      <div style="padding:18px 28px;border-top:1px solid var(--border);flex:none;">
        <button data-action="aw-save"
          style="width:100%;padding:13px;border-radius:12px;border:none;font-size:14px;font-weight:700;
            background:${canSave?'#4c2d9c':'var(--panel-2)'};
            color:${canSave?'#fff':'var(--text-3)'};
            cursor:${canSave?'pointer':'default'};">
          Save Workflow
        </button>
      </div>
    </div>
  </div>`;
}

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
  const tabs=[
    {id:'templates',label:'Templates',icon:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><path d="M17 13v8M13 17h8"/></svg>`},
    {id:'database', label:'Database', icon:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>`},
    {id:'workflow', label:'Workflow', icon:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M5 8v4a5 5 0 0 0 5 5h.5M19 8v4a5 5 0 0 1-5 5h-.5"/></svg>`},
  ];

  const tabBar=tabs.map(t=>`
    <button data-action="mem:${t.id}"
      style="display:flex;align-items:center;gap:8px;padding:9px 18px;border-radius:10px;font-size:13.5px;font-weight:600;transition:all .15s;
        background:${S.memTab===t.id?'var(--accent-soft)':'transparent'};
        color:${S.memTab===t.id?'var(--text)':'var(--text-2)'};
        border:${S.memTab===t.id?'1px solid var(--accent-line)':'1px solid transparent'};">
      ${t.icon} ${t.label}
    </button>`).join('');

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

  const allTemplates=[...TEMPLATES,...S.userTemplates];
  const TYPE_META={
    referral:{icon:I.referral,label:'Referrals',   color:'var(--info)',  soft:'var(--info-soft)'},
    note:    {icon:I.note,    label:'Visit notes', color:'var(--good)',  soft:'var(--good-soft)'},
    lab:     {icon:I.lab,     label:'Lab panels',  color:'var(--accent)',soft:'var(--accent-soft)'},
    doc:     {icon:I.doc,     label:'Documents',   color:'var(--ready)', soft:'var(--ready-soft)'},
  };
  const TYPE_ORDER=['referral','note','lab','doc'];

  const tmplSection=(meta,items)=>`
    <div style="margin-bottom:24px;">
      <div style="margin-bottom:10px;">
        <span style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;background:${meta.soft};color:${meta.color};font-size:12px;font-weight:700;">
          ${meta.icon.replace('stroke="currentColor"',`stroke="${meta.color}"`).replace(/width="\d+"/,'width="14"').replace(/height="\d+"/,'height="14"')}
          @ ${meta.label}
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${items.map(tmpl=>`
        <button data-action="tmpl-open:${tmpl.id}" class="action-card"
          style="display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid var(--border);border-radius:13px;background:var(--panel-2);text-align:left;cursor:pointer;transition:all .15s;width:100%;">
          <div style="width:38px;height:38px;border-radius:11px;background:${meta.soft};display:flex;align-items:center;justify-content:center;flex:none;">
            ${meta.icon.replace('stroke="currentColor"',`stroke="${meta.color}"`)}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:14px;font-weight:700;color:var(--text);">${tmpl.label}</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>`).join('')}
      </div>
    </div>`;

  const sections=TYPE_ORDER.map(type=>{
    const items=allTemplates.filter(t=>t.type===type);
    return items.length?tmplSection(TYPE_META[type],items):'';
  }).join('');

  const templatesBody=`
    <div style="padding:24px;">
      ${sections}
      <button data-action="at-open"
        style="display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px;border-radius:13px;border:1.5px dashed var(--border);background:transparent;color:var(--text-3);font-size:13.5px;font-weight:600;cursor:pointer;transition:all .15s;">
        ${I.plus} Add Template
      </button>
    </div>`;

  let body='';
  if(S.memTab==='templates') body=templatesBody;
  const labRows=LAB_TESTS.map((t,i)=>{
    const isLast=i===LAB_TESTS.length-1;
    return `
    <div style="display:grid;grid-template-columns:1fr 90px 80px 70px 70px;align-items:center;padding:12px 20px;${isLast?'':'border-bottom:1px solid var(--border)'};">
      <div>
        <div style="font-size:13.5px;font-weight:600;color:var(--text);">${t.name}</div>
        <div style="font-size:11.5px;color:var(--text-3);margin-top:2px;">${t.vendor} · Cat ${t.cat}</div>
      </div>
      <div style="font-size:12px;color:var(--text-3);text-align:center;">CPT ${t.cpt}</div>
      <div style="font-size:12px;color:var(--text-3);text-align:right;">${t.vendor}</div>
      <div style="font-size:13px;font-weight:600;color:var(--text-2);text-align:right;">${money(t.price)}</div>
      <div style="font-size:13px;font-weight:700;color:var(--accent);text-align:right;">${money(t.markup)}</div>
    </div>`;
  }).join('');

  const dbBody= S.dbView==='lab' ? `
    <div>
      <div style="display:flex;align-items:center;gap:10px;padding:14px 20px;border-bottom:1px solid var(--border);background:var(--panel-2);">
        <button data-action="db-back" style="display:flex;align-items:center;gap:5px;font-size:12.5px;font-weight:600;color:var(--text-3);cursor:pointer;background:none;border:none;">${I.back.replace('stroke="currentColor"','stroke="var(--text-3)"')} Back</button>
        <span style="display:inline-flex;align-items:center;gap:6px;padding:4px 11px;border-radius:20px;background:var(--accent-soft);color:var(--accent);font-size:12px;font-weight:700;">
          ${I.lab.replace('stroke="currentColor"','stroke="var(--accent)"').replace(/width="\d+"/,'width="13"').replace(/height="\d+"/,'height="13"')} @ Lab panels
        </span>
        <span style="font-size:13.5px;font-weight:700;color:var(--text);">Lab Test Database</span>
        <span style="margin-left:auto;font-size:12px;color:var(--text-3);">${LAB_TESTS.length} tests</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 90px 80px 70px 70px;padding:9px 20px;border-bottom:1px solid var(--border);background:var(--panel-2);">
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Test</span>
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);text-align:center;">CPT</span>
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);text-align:right;">Vendor</span>
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);text-align:right;">Price</span>
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--accent);text-align:right;">Markup</span>
      </div>
      <div style="overflow-y:auto;max-height:520px;">${labRows}</div>
    </div>`
  : `
    <div style="padding:24px;">
      <div style="margin-bottom:12px;">
        <span style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;background:var(--accent-soft);color:var(--accent);font-size:12px;font-weight:700;">
          ${I.lab.replace('stroke="currentColor"','stroke="var(--accent)"').replace(/width="\d+"/,'width="14"').replace(/height="\d+"/,'height="14"')}
          @ Lab panels
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <button data-action="db-view:lab" class="action-card"
          style="display:flex;align-items:center;gap:14px;padding:14px 18px;border:1px solid var(--border);border-radius:13px;background:var(--panel-2);text-align:left;cursor:pointer;transition:all .15s;width:100%;">
          <div style="width:38px;height:38px;border-radius:11px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;flex:none;">
            ${I.lab.replace('stroke="currentColor"','stroke="var(--accent)"')}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:14px;font-weight:700;color:var(--text);">Lab Test Database</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>`;

  if(S.memTab==='database') body=dbBody;
  const BUILT_IN_WORKFLOWS=[
    {id:'wf-lab-price',type:'lab',label:'Lab panel price comparison',
     steps:['Labcorp test selection','Same name test search in PathGroup','Compare the best price']},
  ];
  const allWorkflows=[...BUILT_IN_WORKFLOWS,...S.userWorkflows];
  const WF_TYPE_META={
    lab:     {icon:I.lab,     label:'Lab panels',  color:'var(--accent)',soft:'var(--accent-soft)'},
    referral:{icon:I.referral,label:'Referrals',   color:'var(--info)',  soft:'var(--info-soft)'},
    note:    {icon:I.note,    label:'Visit notes', color:'var(--good)',  soft:'var(--good-soft)'},
    doc:     {icon:I.doc,     label:'Documents',   color:'var(--ready)', soft:'var(--ready-soft)'},
  };
  const WF_TYPE_ORDER=['lab','referral','note','doc'];

  const wfCard=wf=>{
    const m=WF_TYPE_META[wf.type]||WF_TYPE_META.lab;
    return `
    <div style="padding:16px 18px;border:1px solid var(--border);border-radius:13px;background:var(--panel-2);">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <div style="width:38px;height:38px;border-radius:11px;background:${m.soft};display:flex;align-items:center;justify-content:center;flex:none;">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="${m.color}" stroke-width="1.8"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M5 8v4a5 5 0 0 0 5 5h.5M19 8v4a5 5 0 0 1-5 5h-.5"/></svg>
        </div>
        <div style="font-size:14px;font-weight:700;color:var(--text);">${wf.label}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:7px;">
        ${wf.steps.map((s,i)=>`
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="width:20px;height:20px;border-radius:50%;background:${m.soft};color:${m.color};font-size:10.5px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none;">${i+1}</span>
          <span style="font-size:13px;color:var(--text-2);">${s}</span>
        </div>`).join('')}
      </div>
    </div>`;
  };

  const wfSections=WF_TYPE_ORDER.map(type=>{
    const m=WF_TYPE_META[type];
    const items=allWorkflows.filter(w=>w.type===type);
    if(!items.length) return '';
    return `
      <div style="margin-bottom:22px;">
        <div style="margin-bottom:10px;">
          <span style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;background:${m.soft};color:${m.color};font-size:12px;font-weight:700;">
            ${m.icon.replace('stroke="currentColor"',`stroke="${m.color}"`).replace(/width="\d+"/,'width="14"').replace(/height="\d+"/,'height="14"')}
            @ ${m.label}
          </span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">${items.map(wfCard).join('')}</div>
      </div>`;
  }).join('');

  const wfBody=`
    <div style="padding:24px;">
      ${wfSections}
      <button data-action="aw-open"
        style="display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px;border-radius:13px;border:1.5px dashed var(--border);background:transparent;color:var(--text-3);font-size:13.5px;font-weight:600;cursor:pointer;transition:all .15s;">
        ${I.plus} Add Workflow
      </button>
    </div>`;
  if(S.memTab==='workflow') body=wfBody;

  return `
  <div style="padding:36px 32px 70px;max-width:820px;margin:0 auto;width:100%;">
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:28px;padding:5px;background:var(--panel);border:1px solid var(--border);border-radius:13px;width:fit-content;">
      ${tabBar}
    </div>
    <div style="border:1px solid var(--border);border-radius:16px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">
      ${body}
    </div>
  </div>`;
}

// ── Patients list view ────────────────────────────────────────────────────
function renderPatients(){
  const live=liveTasks();
  const q=S.pq.toLowerCase();
  const allPatients=[...PATIENTS,...S.extraPatients];
  const list=allPatients.filter(p=>!q||p.name.toLowerCase().includes(q));
  const rows=list.map(p=>{
    const cnt=live.filter(t=>t.patient===p.id).length;
    return `
    <div class="table-row" data-action="patient:${p.id}" style="display:flex;align-items:center;padding:14px 20px;border-bottom:1px solid var(--border);transition:background .14s;">
      <span style="flex:1;display:flex;align-items:center;gap:12px;min-width:0;">
        <span style="width:34px;height:34px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex:none;">${initials(p.name)}</span>
        <span style="font-size:14px;font-weight:600;white-space:nowrap;">${p.name}</span>
      </span>
      <span style="width:160px;text-align:center;">
        <span style="${MONO};font-size:12.5px;font-weight:700;color:${cnt>0?'var(--ready)':'var(--text-3)'};">${cnt>0?cnt+' open':'—'}</span>
      </span>
      <span style="width:120px;text-align:right;font-size:12.5px;color:var(--text-3);">${p.last||'—'}</span>
    </div>`;}).join('');
  const empty=`<div style="padding:40px;text-align:center;font-size:13.5px;color:var(--text-3);">No patients yet.</div>`;
  return `
  <div style="padding:20px 30px 70px;max-width:900px;margin:0 auto;width:100%;">
    <div style="border:1px solid var(--border);border-radius:15px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">
      <div style="display:flex;align-items:center;padding:11px 20px;border-bottom:1px solid var(--border);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-3);">
        <span style="flex:1;">Patient</span><span style="width:160px;text-align:center;">Assigned Work</span><span style="width:120px;text-align:right;">Date</span>
      </div>
      ${list.length?rows:empty}
    </div>
  </div>`;
}

// ── Patient detail view ───────────────────────────────────────────────────
function renderPatient(){
  const p=byId(S.patientId); if(!p) return '';
  const rm=riskMeta(p.risk); const live=liveTasks();
  const ptasks=live.filter(t=>t.patient===p.id).map(vo);
  const isNewPatient=S.extraPatients.some(ep=>ep.id===p.id);
  const timeline=[
    ...ptasks.map(t=>({title:'Sapiens prepared: '+t.title,at:t.at+' today',dot:'var(--accent)'})),
    ...(isNewPatient?[]:[
      {title:'Lab results received from Labcorp',at:'Yesterday',dot:'var(--info)'},
      {title:'Visit note signed',at:'May 28',dot:'var(--good)'},
      {title:'Follow-up message sent',at:'May 21',dot:'var(--ready)'},
    ]),
  ];
  const workRows=ptasks.map(t=>`
    <div class="table-row" data-action="task:${t.id}" style="display:flex;align-items:center;gap:14px;padding:13px 16px;border-bottom:1px solid var(--border);transition:background .12s;cursor:pointer;">
      <span style="width:7px;height:7px;border-radius:50%;background:var(--ready);flex:none;"></span>
      <span style="font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-3);width:88px;flex:none;">${t.typeLabel}</span>
      <span style="flex:1;font-size:14px;font-weight:500;color:var(--text);">${t.title}</span>
      ${t.urgent?`<span style="font-size:11px;font-weight:600;color:var(--ready);background:var(--ready-soft);padding:3px 9px;border-radius:999px;white-space:nowrap;">Before noon</span>`:''}
      <span style="font-size:12px;color:var(--text-3);">Review →</span>
    </div>`).join('');
  const tlItems=timeline.map((e,i)=>`
    <div style="display:flex;gap:13px;padding:11px 0;">
      <div style="display:flex;flex-direction:column;align-items:center;padding-top:4px;">
        <span style="width:9px;height:9px;border-radius:50%;background:${e.dot};flex:none;"></span>
        ${i<timeline.length-1?`<span style="width:1.5px;flex:1;background:var(--border);margin-top:4px;"></span>`:''}
      </div>
      <div style="flex:1;padding-bottom:4px;">
        <div style="font-size:13px;color:var(--text);line-height:1.4;">${e.title}</div>
        <div style="font-size:11.5px;color:var(--text-3);margin-top:3px;">${e.at}</div>
      </div>
    </div>`).join('');
  return `
  <div style="padding:30px 30px 70px;max-width:1140px;margin:0 auto;width:100%;">
    <h1 style="font-size:28px;font-weight:700;letter-spacing:-.025em;margin:0 0 22px;">${p.name}</h1>
    <div style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);">Work Items</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
      <button class="action-card" data-action="launch:lab" style="text-align:left;border:1px solid var(--border);background:var(--panel);border-radius:13px;padding:15px;display:flex;flex-direction:column;gap:9px;transition:border-color .15s,transform .15s;">${I.lab.replace('stroke="currentColor"','stroke="var(--accent)"').replace('width="17"','width="19"').replace('height="17"','height="19"')}<span style="font-size:13.5px;font-weight:600;">Lab panels</span></button>
      <button class="action-card" data-action="launch:referral" style="text-align:left;border:1px solid var(--border);background:var(--panel);border-radius:13px;padding:15px;display:flex;flex-direction:column;gap:9px;transition:border-color .15s,transform .15s;">${I.referral.replace('stroke="currentColor"','stroke="var(--accent)"').replace('width="17"','width="19"').replace('height="17"','height="19"')}<span style="font-size:13.5px;font-weight:600;">Referrals</span></button>
      <button class="action-card" data-action="launch:note" style="text-align:left;border:1px solid var(--border);background:var(--panel);border-radius:13px;padding:15px;display:flex;flex-direction:column;gap:9px;transition:border-color .15s,transform .15s;">${I.note.replace('stroke="currentColor"','stroke="var(--accent)"').replace('width="17"','width="19"').replace('height="17"','height="19"')}<span style="font-size:13.5px;font-weight:600;">Visit notes</span></button>
      <button class="action-card" data-action="launch:doc" style="text-align:left;border:1px solid var(--border);background:var(--panel);border-radius:13px;padding:15px;display:flex;flex-direction:column;gap:9px;transition:border-color .15s,transform .15s;">${I.doc.replace('stroke="currentColor"','stroke="var(--accent)"').replace('width="17"','width="19"').replace('height="17"','height="19"')}<span style="font-size:13.5px;font-weight:600;">Documents</span></button>
    </div>
    <div style="display:flex;gap:26px;align-items:flex-start;margin-top:28px;">
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:13px;">
        <h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);margin:0;">Works Record</h2>
        ${workRows?`<div style="border:1px solid var(--border);border-radius:13px;overflow:hidden;background:var(--panel);box-shadow:var(--shadow);">${workRows}</div>`:'<div style="border:1px dashed var(--border);border-radius:13px;padding:26px;text-align:center;font-size:13.5px;color:var(--text-3);">No records yet.</div>'}
      </div>
      <div style="width:340px;flex:none;display:flex;flex-direction:column;gap:13px;">
        <h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--text-3);margin:0;">Timeline</h2>
        ${timeline.length?`<div style="border:1px solid var(--border);background:var(--panel);border-radius:15px;padding:6px 18px;box-shadow:var(--shadow);">${tlItems}</div>`:`<div style="border:1px dashed var(--border);border-radius:13px;padding:26px;text-align:center;font-size:13.5px;color:var(--text-3);">No history yet.</div>`}
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
      <div style="font-size:12.5px;color:var(--text-3);margin-bottom:13px;">Assembled from ${t.patient.first}'s visit note · priced against the Archway list.</div>
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
  ${renderLabSearch()}
  ${renderNoteRecorder()}
  ${renderDocProcessor()}
  ${renderReferral()}
  ${renderLabWfOverlay()}
  ${renderTemplateOverlay()}
  ${renderAddTemplate()}
  ${renderAddWorkflow()}`;
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
  const awl=document.getElementById('aw-label-input');
  if(awl){ awl.focus(); plainInput(awl,v=>{
    S.addWfLabel=v;
    const btn=document.querySelector('[data-action="aw-save"]');
    if(btn){const ok=!!(v.trim()&&S.addWfSteps.some(s=>s.trim()));btn.style.background=ok?'#4c2d9c':'var(--panel-2)';btn.style.color=ok?'#fff':'var(--text-3)';}
  }); }
  S.addWfSteps.forEach((_,i)=>{
    const el=document.getElementById(`wf-step-${i}`);
    if(el) plainInput(el,v=>{
      S.addWfSteps=S.addWfSteps.map((s,j)=>j===i?v:s);
      const btn=document.querySelector('[data-action="aw-save"]');
      if(btn){const ok=!!(S.addWfLabel.trim()&&S.addWfSteps.some(s=>s.trim()));btn.style.background=ok?'#4c2d9c':'var(--panel-2)';btn.style.color=ok?'#fff':'var(--text-3)';}
    });
  });
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
    S.extraPatients=[...S.extraPatients,{id,name,age:null,sex:null,plan:null,risk:null,mrn:null,clinic:'Archway Family Medicine',last:'Just now'}];
    S.view='patient';S.patientId=id;S.workOpen=false;S.workMode=null;S.newPName='';render();return;
  }
  if(act==='theme'){S.theme=S.theme==='dark'?'light':'dark';render();return;}
  if(act==='go:today'){S.view='today';S.taskId=null;S.patientId=null;S.cmd=false;render();return;}
  if(act==='go:patients'){S.view='patients';S.taskId=null;S.patientId=null;S.cmd=false;render();return;}
  if(act.startsWith('mem:')){S.view='mem';S.memTab=act.slice(4);S.dbView=null;S.cmd=false;render();return;}
  if(act.startsWith('db-view:')){S.dbView=act.slice(8);render();return;}
  if(act==='db-back'){S.dbView=null;render();return;}
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
  if(act==='aw-open'){S.addWfOpen=true;S.addWfLabel='';S.addWfSteps=[''];S.addWfType='lab';render();return;}
  if(act==='aw-close'){S.addWfOpen=false;render();return;}
  if(act.startsWith('aw-type:')){S.addWfType=act.slice(8);render();return;}
  if(act==='aw-add-step'){S.addWfSteps=[...S.addWfSteps,''];render();return;}
  if(act.startsWith('aw-rm-step:')){
    const i=parseInt(act.slice(11));
    S.addWfSteps=S.addWfSteps.filter((_,j)=>j!==i);
    render();return;
  }
  if(act==='aw-save'){
    if(!S.addWfLabel.trim()||!S.addWfSteps.some(s=>s.trim())) return;
    S.userWorkflows=[...S.userWorkflows,{
      id:'uwf-'+Date.now(), type:S.addWfType,
      label:S.addWfLabel.trim(),
      steps:S.addWfSteps.filter(s=>s.trim()),
    }];
    S.addWfOpen=false;S.addWfLabel='';S.addWfSteps=[''];
    showToast('Workflow saved');render();return;
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
});

// ── Keyboard shortcuts ────────────────────────────────────────────────────
window.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&(e.key==='k'||e.key==='K')){e.preventDefault();S.cmd=!S.cmd;S.query='';render();}
  if(e.key==='Escape'){
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
