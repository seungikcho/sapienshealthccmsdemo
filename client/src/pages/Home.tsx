import { useState, useEffect, Fragment } from "react";
import { LogIn } from "lucide-react";

const logoUrl =
  "https://d36hbw14aib5lz.cloudfront.net/310519663318202729/TdsfYCSbV9xhvU4DsPP84j/sapienslabs-logo-delta-s-ZjHQetHDXzKos43yZtYjhG.webp?Expires=1807943486&Signature=bfdsDHdM6VbnOCGdixbHpPYBMIrYD2Iaoli5PD2tmAlSbGwChYR7nNxUJIRSQ2Pliwgd7Vz3RvRDPXKLq87uJM5lNGBrieObDqPDN~gGsfmBUgMg-mB-7KN3h~BkL14M12o3i9aw89YHbu2KvJHqdAQPvU~X3MIYpnWR2DSTuKXoNitY490GJbM5LmyBIL2FezT~o04fHDRaALkBcifH7eKRlLab7boYuNTC3G4WEPXTyIyBDoPUZrPps1lyVnu~71IYflncNFZkMiadkvu7DAO5Vs1LfO7qBrII9lx8MzsA4lyPZmJugxjgK8DJ2Dtf1YNTCctpMCNZBxrDmNg8Lw__&Key-Pair-Id=K1MP89RTKNH4J";

const heroGraphic = "/hero-cropped.png";

const notifications = [
  { tag: "Referral",   text: "Referral for Sarah K. is ready for your review, Dr. Chen." },
  { tag: "Completed",  text: "Visit summary for John M. has been completed and filed." },
  { tag: "Lab Results",text: "Lab results for Patient #2847 flagged — lipid panel elevated." },
  { tag: "Follow-up",  text: "Follow-up plan for Maria L. sent via SMS successfully." },
  { tag: "Auth",       text: "Prior authorization for Dr. Park's patient approved." },
  { tag: "Intake",     text: "New call intake for Robert S. organized into workflow." },
];

type UseCase = "Clinical Documentation" | "Care Coordination" | "Insurance Billing";

const useCaseContent: Record<UseCase, [string, string, string]> = {
  "Clinical Documentation": [
    "We ingest the clinic's specific lab test lists, custom note templates, and operational workflow memory to establish a customized work context.",
    "AI organizes unstructured visit audio and brief physician notes against this established context, structuring the data to automatically populate clinical documentation and draft patient-friendly visit summaries in the clinic's exact tone.",
    "The system outputs perfectly formatted, EMR-ready documents and automatically executes the actual next action items such as queuing the exact lab order forms or drafting follow-up text messages.",
  ],
  "Care Coordination": [
    "We ingest patient care histories, specialist communications, referral records, and care team data to build a unified coordination context across all providers.",
    "AI identifies care gaps, structures multi-provider follow-up tasks, and organizes coordination needs into a clear, prioritized action plan ready for physician review.",
    "The system auto-drafts referral letters, follow-up instructions, and specialist communications — and queues them for physician approval and immediate send.",
  ],
  "Insurance Billing": [
    "We ingest clinical notes, procedure and diagnosis codes, payer contracts, and documentation requirements to build a complete, payer-aware billing context.",
    "AI cross-references encounter data against payer rules, flags missing documentation, and structures prior authorization requests and clean claim drafts for review.",
    "The system outputs compliant claims and prior authorization packages — ready for submission with a single physician sign-off, reducing denials and administrative overhead.",
  ],
};

const steps = [
  {
    number: "01", colored: "Connect",  rest: " Fragmented Data",
    Icon: StepIconConnect,
    desc: "We ingest scattered patient records and fuse them with the clinic's unique operational memory to build a unified, actionable work context. (e.g., EMR history, high volume faxes, external lab database, and physician preferences)",
  },
  {
    number: "02", colored: "Organize", rest: " Into Workflow",
    Icon: StepIconOrganize,
    desc: "We structure them against the clinic's internal rules to automatically prepare the required administrative work (e.g., populating complex care plan templates, mapping clinical notes to billable ICD codes, and drafting targeted outreach scripts).",
  },
  {
    number: "03", colored: "Execute",  rest: " Task Items",
    Icon: StepIconExecute,
    desc: "We carry the task across the finish line by generating final outputs for one-click review or direct system integration. (e.g., queuing exact lab order forms, outputting EMR-ready documents, and injecting audit-ready bulk billing lists directly into the clinic's software).",
  },
];

const stats = [
  { label: "AI Trained On", value: "Clinical Reality"  },
  { label: "Built For",     value: "Clinic's Workflow" },
  { label: "Connected To",  value: "Any EMR/EHR"       },
  { label: "Security",      value: "HIPAA Compliant"   },
];

const demoHref = "mailto:info@sapienshealth.co?subject=Demo%20request";

// ── Step icons (How It Works) ────────────────────────────────────────────

// 01 Connect: scattered nodes converging
function StepIconConnect() {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36, flexShrink: 0 }}>
      {/* Center node */}
      <circle cx="22" cy="22" r="5.5" fill="rgba(91,63,160,0.18)" stroke="#5b3fa0" strokeWidth="1.6"
        style={{ animation: "siPulse 2s ease-in-out infinite" }} />
      {/* Outer source nodes */}
      <circle cx="7"  cy="9"  r="3" fill="rgba(91,63,160,0.15)" stroke="#5b3fa0" strokeWidth="1.3"
        style={{ animation: "siNode1 3.6s ease-in-out infinite" }} />
      <circle cx="37" cy="9"  r="3" fill="rgba(91,63,160,0.15)" stroke="#5b3fa0" strokeWidth="1.3"
        style={{ animation: "siNode2 3.6s ease-in-out infinite", animationDelay: "1.2s" }} />
      <circle cx="22" cy="38" r="3" fill="rgba(91,63,160,0.15)" stroke="#5b3fa0" strokeWidth="1.3"
        style={{ animation: "siNode3 3.6s ease-in-out infinite", animationDelay: "2.4s" }} />
      {/* Connection trails */}
      <line x1="9"  y1="11" x2="18" y2="18" stroke="#5b3fa0" strokeWidth="1" strokeDasharray="3 2" opacity="0.35"/>
      <line x1="35" y1="11" x2="26" y2="18" stroke="#5b3fa0" strokeWidth="1" strokeDasharray="3 2" opacity="0.35"/>
      <line x1="22" y1="35" x2="22" y2="27" stroke="#5b3fa0" strokeWidth="1" strokeDasharray="3 2" opacity="0.35"/>
    </svg>
  );
}

// 02 Organize: disordered bars snap into sorted rows
function StepIconOrganize() {
  const bars = [
    { y: 10, w: 28, anim: "siBar1" },
    { y: 18, w: 16, anim: "siBar2" },
    { y: 26, w: 32, anim: "siBar3" },
    { y: 34, w: 12, anim: "siBar4" },
  ];
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36, flexShrink: 0 }}>
      {/* Left anchor lines */}
      {bars.map(({ y }) => (
        <rect key={y} x="6" y={y} width="4" height="5" rx="1.5" fill="#5b3fa0" opacity="0.35"/>
      ))}
      {/* Animated sorting bars */}
      {bars.map(({ y, w, anim }) => (
        <rect key={y} x="13" y={y} width={w} height="5" rx="2.5"
          fill="rgba(91,63,160,0.18)" stroke="#5b3fa0" strokeWidth="1.2"
          style={{ animation: `${anim} 3s ease-in-out infinite`, transformOrigin: `13px ${y + 2.5}px` }}/>
      ))}
    </svg>
  );
}

// 03 Execute: checkmark draws → ripple radiates
function StepIconExecute() {
  return (
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36, flexShrink: 0 }}>
      {/* Ripple rings */}
      <circle cx="22" cy="22" r="18" stroke="#5b3fa0" strokeWidth="1" opacity="0"
        style={{ animation: "siRipple 2.4s ease-out infinite" }} />
      <circle cx="22" cy="22" r="14" stroke="#5b3fa0" strokeWidth="1" opacity="0"
        style={{ animation: "siRipple 2.4s ease-out infinite", animationDelay: "0.6s" }} />
      {/* Base circle */}
      <circle cx="22" cy="22" r="10" fill="rgba(91,63,160,0.13)" stroke="#5b3fa0" strokeWidth="1.6"
        style={{ animation: "siPulse 2.4s ease-in-out infinite" }} />
      {/* Check path */}
      <path d="M15.5 22 l5 5 8-9" stroke="#5b3fa0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"
        style={{ animation: "siCheck 2.4s ease-in-out infinite", strokeDasharray: 20, strokeDashoffset: 20 }} />
      {/* Arrow out top-right */}
      <path d="M29 12 l5-5 m0 0 l-4 0 m4 0 l0 4" stroke="#5b3fa0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: "siArrow 2.4s ease-in-out infinite", animationDelay: "1s" }} />
    </svg>
  );
}

// ── Animated graphics ────────────────────────────────────────────────────

// Connect: Lab lists + Note templates + Workflow memory → Unified context node
function GraphicConnect() {
  return (
    <svg viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Center context node — pulsing glow */}
      <circle cx="90" cy="65" r="18" fill="rgba(91,63,160,0.12)" style={{ animation: "ctxPulse 2s ease-in-out infinite" }} />
      <circle cx="90" cy="65" r="12" fill="rgba(91,63,160,0.2)" stroke="#5b3fa0" strokeWidth="1.5" style={{ animation: "ctxPulse 2s ease-in-out infinite" }} />
      {/* "AI" spark in center */}
      <text x="90" y="69" textAnchor="middle" fill="#5b3fa0" fontSize="8" fontWeight="700" letterSpacing="0.5">AI</text>

      {/* Source 1: Lab list clipboard (top-left) */}
      <g style={{ animation: "srcFly1 3.6s ease-in-out infinite", transformOrigin: "28px 28px" }}>
        <rect x="14" y="14" width="28" height="32" rx="3" fill="rgba(91,63,160,0.1)" stroke="#5b3fa0" strokeWidth="1.4"/>
        <rect x="22" y="10" width="12" height="7" rx="2" fill="rgba(91,63,160,0.15)" stroke="#5b3fa0" strokeWidth="1.2"/>
        {/* Rows = lab items */}
        <line x1="19" y1="24" x2="37" y2="24" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
        <line x1="19" y1="29" x2="33" y2="29" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
        <line x1="19" y1="34" x2="37" y2="34" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
        <line x1="19" y1="39" x2="30" y2="39" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
        <text x="28" y="53" textAnchor="middle" fill="#5b3fa0" fontSize="6.5" fontWeight="600" opacity="0.7">Lab Lists</text>
      </g>

      {/* Source 2: Note template doc (top-right) */}
      <g style={{ animation: "srcFly2 3.6s ease-in-out infinite", animationDelay: "1.2s", transformOrigin: "151px 26px" }}>
        <rect x="137" y="12" width="28" height="32" rx="3" fill="rgba(91,63,160,0.1)" stroke="#5b3fa0" strokeWidth="1.4"/>
        {/* SOAP section headers */}
        <rect x="141" y="18" width="10" height="4" rx="1.5" fill="#5b3fa0" opacity="0.5"/>
        <line x1="141" y1="26" x2="160" y2="26" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <rect x="141" y="31" width="8" height="4" rx="1.5" fill="#5b3fa0" opacity="0.5"/>
        <line x1="141" y1="39" x2="157" y2="39" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <text x="151" y="53" textAnchor="middle" fill="#5b3fa0" fontSize="6.5" fontWeight="600" opacity="0.7">Templates</text>
      </g>

      {/* Source 3: Workflow gear (bottom-center) */}
      <g style={{ animation: "srcFly3 3.6s ease-in-out infinite", animationDelay: "2.4s", transformOrigin: "90px 110px" }}>
        {/* Gear shape simplified */}
        <circle cx="90" cy="108" r="11" fill="rgba(91,63,160,0.1)" stroke="#5b3fa0" strokeWidth="1.4"/>
        <circle cx="90" cy="108" r="5" fill="rgba(91,63,160,0.15)" stroke="#5b3fa0" strokeWidth="1.2"/>
        {[0,60,120,180,240,300].map((deg, i) => (
          <rect key={i} x="88.5" y="95" width="3" height="5" rx="1.5" fill="#5b3fa0" opacity="0.6"
            style={{ transformOrigin: "90px 108px", transform: `rotate(${deg}deg)` }} />
        ))}
        <text x="90" y="126" textAnchor="middle" fill="#5b3fa0" fontSize="6.5" fontWeight="600" opacity="0.7">Workflow</text>
      </g>

      {/* Dashed trails (static guide lines) */}
      <line x1="42" y1="40" x2="78" y2="58" stroke="#5b3fa0" strokeWidth="1" strokeDasharray="3 3" opacity="0.25"/>
      <line x1="137" y1="40" x2="102" y2="58" stroke="#5b3fa0" strokeWidth="1" strokeDasharray="3 3" opacity="0.25"/>
      <line x1="90" y1="97" x2="90" y2="83" stroke="#5b3fa0" strokeWidth="1" strokeDasharray="3 3" opacity="0.25"/>
    </svg>
  );
}

// Organize: Audio waveform + brief note → SOAP doc sections filling in
function GraphicOrganize() {
  return (
    <svg viewBox="0 0 190 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Left: Microphone */}
      <rect x="22" y="28" width="16" height="24" rx="8" fill="rgba(91,63,160,0.12)" stroke="#5b3fa0" strokeWidth="1.5"/>
      <path d="M16 52 Q16 66 30 66 Q44 66 44 52" stroke="#5b3fa0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <line x1="30" y1="66" x2="30" y2="74" stroke="#5b3fa0" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="24" y1="74" x2="36" y2="74" stroke="#5b3fa0" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Soundwaves radiating */}
      {[0,1,2].map(i => (
        <path key={i}
          d={`M${48+i*7} 38 Q${52+i*7} 52 ${48+i*7} 66`}
          stroke="#5b3fa0" strokeWidth="1.3" fill="none" strokeLinecap="round"
          style={{ animation: `soundWave 1.4s ease-in-out infinite`, animationDelay: `${i*0.22}s`, opacity: 0.6 - i*0.15 }}
        />
      ))}

      {/* Brief physician note (bottom left) */}
      <g style={{ animation: "noteFloat 3s ease-in-out infinite" }}>
        <rect x="10" y="88" width="50" height="30" rx="4" fill="rgba(91,63,160,0.08)" stroke="#5b3fa0" strokeWidth="1.2"/>
        <line x1="16" y1="97" x2="54" y2="97" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="16" y1="103" x2="48" y2="103" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="16" y1="109" x2="42" y2="109" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <text x="35" y="127" textAnchor="middle" fill="#5b3fa0" fontSize="6" fontWeight="600" opacity="0.6">Brief Note</text>
      </g>

      {/* Arrow */}
      <g style={{ animation: "arrowPulse 1.6s ease-in-out infinite" }}>
        <line x1="82" y1="65" x2="100" y2="65" stroke="#5b3fa0" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M96 60 L103 65 L96 70" stroke="#5b3fa0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>

      {/* Right: SOAP doc filling in section by section */}
      <rect x="108" y="22" width="72" height="90" rx="5" fill="rgba(91,63,160,0.06)" stroke="#5b3fa0" strokeWidth="1.3"/>
      {/* Section labels appearing */}
      {[
        { label: "S", y: 34,  lineW: 44 },
        { label: "O", y: 56,  lineW: 36 },
        { label: "A", y: 78,  lineW: 40 },
        { label: "P", y: 100, lineW: 32 },
      ].map(({ label, y, lineW }, i) => (
        <g key={label} style={{ animation: "soapFill 3.2s ease-in-out infinite", animationDelay: `${i * 0.55}s` }}>
          <rect x="115" y={y-6} width="8" height="8" rx="2" fill="#5b3fa0" opacity="0.55"/>
          <text x="119" y={y} textAnchor="middle" fill="#fff" fontSize="5.5" fontWeight="800">{label}</text>
          <rect x="128" y={y-3} width={lineW} height="4" rx="2" fill="rgba(91,63,160,0.18)"/>
          <rect x="128" y={y+5} width={lineW - 10} height="3" rx="1.5" fill="rgba(91,63,160,0.12)"/>
        </g>
      ))}
    </svg>
  );
}

// Execute: Center → EMR doc + Lab order + Follow-up SMS radiate outward
function GraphicExecute() {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* Center checkmark circle */}
      <circle cx="100" cy="65" r="18" fill="rgba(91,63,160,0.15)" stroke="#5b3fa0" strokeWidth="1.5"
        style={{ animation: "execPulse 2.4s ease-in-out infinite" }}/>
      <path d="M93 65 l5 5 9-10" stroke="#5b3fa0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        style={{ animation: "checkDraw 2.4s ease-in-out infinite" }}/>

      {/* Output 1: EMR document (top-left) */}
      <g style={{ animation: "radiate1 2.4s ease-in-out infinite" }}>
        <rect x="18" y="10" width="44" height="52" rx="5" fill="rgba(91,63,160,0.08)" stroke="#5b3fa0" strokeWidth="1.4"/>
        <rect x="18" y="10" width="44" height="14" rx="5" fill="rgba(91,63,160,0.14)" stroke="none"/>
        <rect x="18" y="16" width="44" height="8" rx="0" fill="rgba(91,63,160,0.14)" stroke="none"/>
        <rect x="26" y="14" width="24" height="5" rx="2" fill="#5b3fa0" opacity="0.45"/>
        <line x1="26" y1="32" x2="56" y2="32" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="26" y1="38" x2="52" y2="38" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="26" y1="44" x2="56" y2="44" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="26" y1="50" x2="46" y2="50" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <text x="40" y="74" textAnchor="middle" fill="#5b3fa0" fontSize="6.5" fontWeight="700" opacity="0.8">EMR Doc</text>
        {/* ✓ badge */}
        <circle cx="57" cy="14" r="7" fill="#5b3fa0"/>
        <path d="M53.5 14 l2.5 2.5 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      {/* Output 2: Lab order form (top-right) */}
      <g style={{ animation: "radiate2 2.4s ease-in-out infinite", animationDelay: "0.7s" }}>
        <rect x="138" y="10" width="48" height="52" rx="5" fill="rgba(91,63,160,0.08)" stroke="#5b3fa0" strokeWidth="1.4"/>
        {/* Lab flask icon top */}
        <path d="M158 22 l0 10 -6 14 h20 l-6-14 0-10z" fill="rgba(91,63,160,0.15)" stroke="#5b3fa0" strokeWidth="1.3" strokeLinejoin="round"/>
        <line x1="155" y1="25" x2="169" y2="25" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
        {/* Result lines */}
        <line x1="144" y1="52" x2="180" y2="52" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <line x1="144" y1="57" x2="172" y2="57" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
        <text x="162" y="74" textAnchor="middle" fill="#5b3fa0" fontSize="6.5" fontWeight="700" opacity="0.8">Lab Order</text>
        <circle cx="181" cy="14" r="7" fill="#5b3fa0"/>
        <path d="M177.5 14 l2.5 2.5 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      {/* Output 3: SMS follow-up (bottom) */}
      <g style={{ animation: "radiate3 2.4s ease-in-out infinite", animationDelay: "1.4s" }}>
        <rect x="60" y="92" width="80" height="36" rx="8" fill="rgba(91,63,160,0.1)" stroke="#5b3fa0" strokeWidth="1.4"/>
        <path d="M78 120 l-8 8 4-8" fill="rgba(91,63,160,0.1)" stroke="#5b3fa0" strokeWidth="1.2" strokeLinejoin="round"/>
        <line x1="70" y1="104" x2="130" y2="104" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="70" y1="111" x2="118" y2="111" stroke="#5b3fa0" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <text x="100" y="130" textAnchor="middle" fill="#5b3fa0" fontSize="6.5" fontWeight="700" opacity="0.8">Follow-up SMS</text>
        {/* Typing dots animation */}
        {[0,1,2].map(i => (
          <circle key={i} cx={86 + i * 9} cy="118" r="2.5" fill="#5b3fa0" opacity="0.5"
            style={{ animation: `typeDot 1.2s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}/>
        ))}
      </g>

      {/* Radiating lines from center */}
      <line x1="83" y1="52" x2="62" y2="36" stroke="#5b3fa0" strokeWidth="1" strokeDasharray="3 3" opacity="0.25"/>
      <line x1="117" y1="52" x2="138" y2="36" stroke="#5b3fa0" strokeWidth="1" strokeDasharray="3 3" opacity="0.25"/>
      <line x1="100" y1="83" x2="100" y2="92" stroke="#5b3fa0" strokeWidth="1" strokeDasharray="3 3" opacity="0.25"/>
    </svg>
  );
}

// ── Subcomponents ─────────────────────────────────────────────────────────

function NotificationCard() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % notifications.length); setVisible(true); }, 350);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const n = notifications[idx];
  return (
    <div className="rounded-b-2xl border border-t-0 border-[#0d1b4d]/12 bg-white px-5 py-4 shadow-[0_8px_24px_rgba(13,27,77,0.08)]">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-bold text-[#0d1b4d]">Sapiens Health</span>
        <span style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}
          className="rounded-full bg-[#5b3fa0]/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-[#5b3fa0]">
          {n.tag}
        </span>
      </div>
      <p className="text-sm text-[#0d1b4d]/75"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(4px)", transition: "opacity 0.35s ease, transform 0.35s ease" }}>
        {n.text}
      </p>
    </div>
  );
}

function SiteWordmark() {
  return (
    <a href="/" className="flex items-center gap-3">
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-2xl shadow-md">
        <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
      </div>
      <span className="text-[#0d1b4d]"
        style={{ fontFamily: '"Instrument Sans","Manrope",sans-serif', fontSize: "1.18rem", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1 }}>
        Sapiens Health
      </span>
    </a>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[#0d1b4d]/10 py-10">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-xl shadow-md">
            <img src={logoUrl} alt="Sapiens Health logo" className="h-full w-full object-cover" />
          </div>
          <span className="text-[#0d1b4d]" style={{ fontFamily: '"Instrument Sans","Manrope",sans-serif', fontWeight: 700 }}>
            Sapiens Health
          </span>
        </div>
        <p className="text-sm text-[#0d1b4d]/40">© 2026 Sapiens Health. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#0d1b4d]/70">
          <a href="/terms"    className="transition hover:text-[#0d1b4d]">Terms</a>
          <a href="/privacy"  className="transition hover:text-[#0d1b4d]">Privacy</a>
          <a href="/login"    className="transition hover:text-[#0d1b4d]">Sign In</a>
          <a href="#contact"  className="transition hover:text-[#0d1b4d]">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeCase, setActiveCase] = useState<UseCase>("Clinical Documentation");
  const [animKey, setAnimKey] = useState(0);

  const useCases: UseCase[] = ["Clinical Documentation", "Care Coordination", "Insurance Billing"];
  const [c1, c2, c3] = useCaseContent[activeCase];

  function handleCaseClick(uc: UseCase) {
    if (uc === activeCase) return;
    setActiveCase(uc);
    setAnimKey(k => k + 1);
  }

  const cards = [
    { step: steps[0], Graphic: GraphicConnect,  content: c1 },
    { step: steps[1], Graphic: GraphicOrganize, content: c2 },
    { step: steps[2], Graphic: GraphicExecute,  content: c3 },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden text-[#0d1b4d]"
      style={{ background: "linear-gradient(150deg,#f2eefb 0%,#ece6f8 50%,#eee9f9 100%)" }}>

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="py-5">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-10 sm:px-20 lg:px-40">
          <SiteWordmark />
          <a href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0d1b4d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a2d6b]">
            <LogIn className="h-4 w-4" /> Login
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="pb-20 pt-12 lg:pt-[67px]">
          <div className="mx-auto w-full max-w-[1480px] px-10 sm:px-20 lg:px-40">
            <div className="grid gap-4 lg:grid-cols-[2fr_1.4fr] lg:items-stretch">
              <div className="flex h-full flex-col justify-center">
                <h1 className="font-bold leading-[1.04] tracking-[-0.03em] text-[#0d1b4d]"
                  style={{ fontFamily: '"Instrument Sans","Manrope",sans-serif', fontSize: "clamp(1.8rem,2.9vw,3.24rem)" }}>
                  AI-Native<br />
                  <span className="text-[#5b3fa0]">Medical Assistant</span><br />
                  for Primary Care.
                </h1>
                <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-[1.75] text-[#0d1b4d]/75">
                  Sapiens Health builds AI-native medical assistants that connect fragmented data, organize into workflow, and execute tasks.
                </p>
                <div className="mt-8">
                  <a href={demoHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0d1b4d] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#1a2d6b]">
                    Book a Demo →
                  </a>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="overflow-hidden rounded-2xl border border-[#0d1b4d]/12 shadow-[0_8px_40px_rgba(13,27,77,0.12)]">
                  <img src={heroGraphic} alt="Doctor using Sapiens Health AI assistant" className="block w-full object-cover" />
                </div>
                <NotificationCard />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────── */}
        <div className="border-t border-[#0d1b4d]/10">
          <div className="mx-auto max-w-[1480px] px-10 sm:px-20 lg:px-40">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => {
                const cls = [
                  "py-9 text-center border-[#0d1b4d]/10",
                  i % 2 === 0 ? "border-r" : "",
                  i < 2      ? "border-b" : "",
                  i < 3      ? "lg:border-r" : "lg:border-r-0",
                  "lg:border-b-0",
                ].join(" ");
                return (
                  <div key={stat.label} className={cls}>
                    <div className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#0d1b4d]/65">{stat.label}</div>
                    <div className="mt-1.5 font-bold text-[#0d1b4d]"
                      style={{ fontFamily: '"Instrument Sans","Manrope",sans-serif', fontSize: "clamp(0.95rem,1.6vw,1.4rem)" }}>
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── How It Works ─────────────────────────────────────── */}
        <section id="how-it-works" className="mx-auto mt-6 w-full max-w-[1480px] px-10 py-10 sm:px-20 lg:px-40">
          <h2 className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#0d1b4d]/45">How It Works</h2>
          <div className="mt-10 space-y-0">
            {steps.map(({ number, colored, rest, Icon, desc }) => (
              <article key={number}
                className="flex items-start gap-5 border-t border-[#0d1b4d]/10 py-7 lg:gap-8">
                {/* Number + Icon row */}
                <div className="flex shrink-0 items-center gap-3 pt-1" style={{ width: 100 }}>
                  <span className="text-sm font-semibold tracking-[0.22em] text-[#0d1b4d]/30">{number}</span>
                  <Icon />
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[#0d1b4d] sm:text-[1.55rem]">
                    <span className="text-[#5b3fa0]">{colored}</span>{rest}
                  </h3>
                  <p className="max-w-[52rem] text-[0.93rem] leading-7 text-[#0d1b4d]/70">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Use Cases ────────────────────────────────────────── */}
        <section id="use-cases" className="mx-auto w-full max-w-[1480px] px-10 pb-16 pt-2 sm:px-20 lg:px-40">
          {/* Tabs */}
          <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <h2 className="shrink-0 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#0d1b4d]/45">Use Cases</h2>
            <div className="flex flex-wrap gap-3">
              {useCases.map(uc => {
                const isActive = uc === activeCase;
                return (
                  <button key={uc} onClick={() => handleCaseClick(uc)}
                    className="rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200"
                    style={{
                      borderColor: isActive ? "#5b3fa0" : "rgba(13,27,77,0.14)",
                      background:  isActive ? "#5b3fa0" : "rgba(13,27,77,0.04)",
                      color:       isActive ? "#fff"    : "rgba(13,27,77,0.65)",
                    }}>
                    {uc}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-column cards */}
          <div key={animKey} className="grid gap-5 lg:grid-cols-3">
            {cards.map(({ step, Graphic, content }, i) => (
              <div key={step.number}
                className="flex flex-col rounded-2xl border border-[#0d1b4d]/10 bg-white/70 overflow-hidden"
                style={{
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(13,27,77,0.08)",
                  animation: "cardIn 0.45s cubic-bezier(.22,.68,0,1.2) both",
                  animationDelay: `${i * 90}ms`,
                }}>
                {/* Graphic area */}
                <div className="flex items-center justify-center bg-gradient-to-br from-[#f4f0fb] to-[#ede7f8] border-b border-[#0d1b4d]/08"
                  style={{ height: "148px", padding: "16px 24px" }}>
                  <Graphic />
                </div>
                {/* Content */}
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#0d1b4d]/30">{step.number}</span>
                    <h3 className="text-[1.05rem] font-bold tracking-[-0.02em] text-[#5b3fa0]">
                      {step.colored}
                    </h3>
                  </div>
                  <p className="text-[0.875rem] leading-[1.75] text-[#0d1b4d]/70">{content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contact" className="mx-auto mt-14 w-full max-w-[1480px] px-10 pb-10 pt-8 sm:px-20 lg:px-40">
          <h2 className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#0d1b4d]/45">Contact</h2>
          <p className="mt-5 max-w-[18ch] font-bold leading-[1.05] tracking-[-0.04em] text-[#0d1b4d]"
            style={{ fontFamily: '"Instrument Sans","Manrope",sans-serif', fontSize: "clamp(1.8rem,3vw,2.74rem)" }}>
            Try out <span className="text-[#5b3fa0]">Sapiens Health</span>
            <span className="block">on your clinic.</span>
          </p>
          <a href={demoHref}
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#0d1b4d] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[#1a2d6b]">
            Book a demo
          </a>
          <div className="mt-16 sm:mt-20"><SiteFooter /></div>
        </section>
      </main>

      <style>{`
        /* ── Step icon: Connect ── */
        @keyframes siPulse {
          0%,100% { opacity: 0.8; transform: scale(1);    }
          50%     { opacity: 1;   transform: scale(1.15); }
        }
        @keyframes siNode1 {
          0%,20%  { transform: translate(0,0);       opacity: 1; }
          55%     { transform: translate(12px,11px); opacity: 0; }
          56%     { transform: translate(0,0);        opacity: 0; }
          75%,100%{ transform: translate(0,0);        opacity: 1; }
        }
        @keyframes siNode2 {
          0%,20%  { transform: translate(0,0);        opacity: 1; }
          55%     { transform: translate(-12px,11px); opacity: 0; }
          56%     { transform: translate(0,0);         opacity: 0; }
          75%,100%{ transform: translate(0,0);         opacity: 1; }
        }
        @keyframes siNode3 {
          0%,20%  { transform: translate(0,0);    opacity: 1; }
          55%     { transform: translate(0,-14px); opacity: 0; }
          56%     { transform: translate(0,0);     opacity: 0; }
          75%,100%{ transform: translate(0,0);     opacity: 1; }
        }
        /* ── Step icon: Organize ── */
        @keyframes siBar1 {
          0%,15%  { width: 28px; } 45%,55% { width: 20px; } 85%,100% { width: 28px; }
        }
        @keyframes siBar2 {
          0%,15%  { width: 16px; } 45%,55% { width: 24px; } 85%,100% { width: 16px; }
        }
        @keyframes siBar3 {
          0%,15%  { width: 32px; } 45%,55% { width: 28px; } 85%,100% { width: 32px; }
        }
        @keyframes siBar4 {
          0%,15%  { width: 12px; } 45%,55% { width: 16px; } 85%,100% { width: 12px; }
        }
        /* ── Step icon: Execute ── */
        @keyframes siCheck {
          0%,15%  { stroke-dashoffset: 20; opacity: 0.3; }
          45%,85% { stroke-dashoffset: 0;  opacity: 1;   }
          100%    { stroke-dashoffset: 20; opacity: 0.3; }
        }
        @keyframes siRipple {
          0%   { transform: scale(0.6); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0;   }
        }
        @keyframes siArrow {
          0%,30%  { opacity: 0; transform: translate(0,0);       }
          60%,80% { opacity: 1; transform: translate(3px,-3px);  }
          100%    { opacity: 0; transform: translate(3px,-3px);  }
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* ── Connect: Lab lists / Templates / Workflow → center AI node ── */
        @keyframes ctxPulse {
          0%,100% { opacity: 0.8; transform: scale(1);    }
          50%     { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes srcFly1 {
          0%,20%  { transform: translate(0,0);        opacity: 1; }
          55%     { transform: translate(50px,30px);  opacity: 0; }
          56%     { transform: translate(0,0);         opacity: 0; }
          75%,100%{ transform: translate(0,0);         opacity: 1; }
        }
        @keyframes srcFly2 {
          0%,20%  { transform: translate(0,0);         opacity: 1; }
          55%     { transform: translate(-50px,30px);  opacity: 0; }
          56%     { transform: translate(0,0);          opacity: 0; }
          75%,100%{ transform: translate(0,0);          opacity: 1; }
        }
        @keyframes srcFly3 {
          0%,20%  { transform: translate(0,0);     opacity: 1; }
          55%     { transform: translate(0,-46px); opacity: 0; }
          56%     { transform: translate(0,0);      opacity: 0; }
          75%,100%{ transform: translate(0,0);      opacity: 1; }
        }

        /* ── Organize: mic waves + brief note → SOAP sections fill in ── */
        @keyframes soundWave {
          0%,100% { opacity: 0.2; transform: scaleX(0.8); }
          50%     { opacity: 0.9; transform: scaleX(1.1); }
        }
        @keyframes noteFloat {
          0%,100% { transform: translateY(0);   opacity: 0.7; }
          50%     { transform: translateY(-4px); opacity: 1;   }
        }
        @keyframes arrowPulse {
          0%,100% { opacity: 0.3; transform: translateX(0);  }
          50%     { opacity: 1;   transform: translateX(3px); }
        }
        @keyframes soapFill {
          0%,8%   { opacity: 0; transform: translateX(-8px); }
          28%,72% { opacity: 1; transform: translateX(0);    }
          92%,100%{ opacity: 0; transform: translateX(0);    }
        }

        /* ── Execute: center check → EMR doc + Lab order + SMS radiate out ── */
        @keyframes execPulse {
          0%,100% { opacity: 0.8; transform: scale(1);    }
          50%     { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes checkDraw {
          0%,20%  { stroke-dasharray: 0 24;  opacity: 0.2; }
          50%,100%{ stroke-dasharray: 24 0;  opacity: 1;   }
        }
        @keyframes radiate1 {
          0%,15%  { opacity: 0; transform: translate(6px,6px)  scale(0.9); }
          40%,80% { opacity: 1; transform: translate(0,0)       scale(1);   }
          95%,100%{ opacity: 0; transform: translate(0,0)       scale(1);   }
        }
        @keyframes radiate2 {
          0%,15%  { opacity: 0; transform: translate(-6px,6px) scale(0.9); }
          40%,80% { opacity: 1; transform: translate(0,0)       scale(1);   }
          95%,100%{ opacity: 0; transform: translate(0,0)       scale(1);   }
        }
        @keyframes radiate3 {
          0%,15%  { opacity: 0; transform: translateY(-6px)    scale(0.9); }
          40%,80% { opacity: 1; transform: translateY(0)        scale(1);   }
          95%,100%{ opacity: 0; transform: translateY(0)        scale(1);   }
        }
        @keyframes typeDot {
          0%,100% { opacity: 0.2; transform: translateY(0);   }
          50%     { opacity: 0.8; transform: translateY(-2px); }
        }
      `}</style>
    </div>
  );
}
