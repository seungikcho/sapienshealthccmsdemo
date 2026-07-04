import React, { useState, useEffect, Fragment } from "react";
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

interface StepCard {
  name: string;
  number: string;
  title: string;
  desc: string;
  Graphic: () => React.ReactElement;
}

const steps = [
  {
    number: "01", colored: "Connect",  rest: " Fragmented Data",
    Icon: StepIconConnect,
    desc: "We connect fragmented clinical data and operational knowledge across your clinic to build one unified work context.",
  },
  {
    number: "02", colored: "Organize", rest: " Into Workflow",
    Icon: StepIconOrganize,
    desc: "We organize that context into the exact workflows your clinic needs, from clinical documentation to insurance billing.",
  },
  {
    number: "03", colored: "Execute",  rest: " Task Items",
    Icon: StepIconExecute,
    desc: "We use your clinic's own operating rules to turn structured workflows into finished outputs your team can review, send, or submit.",
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

// ── 9 use-case × step animated card graphics (minimal) ───────────────────

const A = "#5b3fa0";
const F = "rgba(91,63,160,0.12)";
const svgProps = { fill: "none" as const, xmlns: "http://www.w3.org/2000/svg", style: { width: "100%", height: "100%" } };

/* ── Clinical Documentation ── */

// Connect: doc template on left + rotating gear on right, dashed link
function GraphicConnect() {
  return (
    <svg viewBox="0 0 140 96" {...svgProps}>
      {/* Doc */}
      <rect x="14" y="10" width="44" height="56" rx="4" fill={F} stroke={A} strokeWidth="1.5"/>
      <line x1="22" y1="26" x2="50" y2="26" stroke={A} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="22" y1="35" x2="50" y2="35" stroke={A} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="22" y1="44" x2="44" y2="44" stroke={A} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="22" y1="53" x2="50" y2="53" stroke={A} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      {/* Link */}
      <line x1="58" y1="38" x2="76" y2="38" stroke={A} strokeWidth="1" strokeDasharray="3 2" opacity="0.35"
        style={{animation:"arrowPulse 2s ease-in-out infinite"}}/>
      {/* Gear */}
      <g style={{animation:"gearSpin 8s linear infinite", transformOrigin:"100px 38px"}}>
        <circle cx="100" cy="38" r="16" fill={F} stroke={A} strokeWidth="1.5"/>
        <circle cx="100" cy="38" r="6"  fill="rgba(91,63,160,0.22)" stroke={A} strokeWidth="1.2"/>
        {([0,45,90,135,180,225,270,315] as number[]).map((d,i) => (
          <rect key={i} x="98.5" y="20" width="3" height="6" rx="1.5" fill={A} opacity="0.55"
            style={{transformOrigin:"100px 38px", transform:`rotate(${d}deg)`}}/>
        ))}
      </g>
    </svg>
  );
}

// Organize: mic waveform → structured note lines
function GraphicOrganize() {
  return (
    <svg viewBox="0 0 140 96" {...svgProps}>
      {/* Mic */}
      <rect x="18" y="20" width="14" height="22" rx="7" fill={F} stroke={A} strokeWidth="1.5"/>
      <path d="M12 42 Q12 56 25 56 Q38 56 38 42" stroke={A} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="25" y1="56" x2="25" y2="64" stroke={A} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="64" x2="30" y2="64" stroke={A} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Sound arcs */}
      {([0,1,2] as number[]).map(i => (
        <path key={i} d={`M${42+i*8} 28 Q${46+i*8} 42 ${42+i*8} 56`}
          stroke={A} strokeWidth="1.2" strokeLinecap="round"
          style={{animation:"soundWave 1.4s ease-in-out infinite", animationDelay:`${i*0.22}s`}}
          opacity={0.55 - i*0.15}/>
      ))}
      {/* Arrow */}
      <g style={{animation:"arrowPulse 1.8s ease-in-out infinite"}}>
        <line x1="74" y1="42" x2="88" y2="42" stroke={A} strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M84 37 L90 42 L84 47" stroke={A} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* Note lines appearing */}
      {([0,1,2,3] as number[]).map(i => (
        <line key={i} x1="96" y1={26+i*13} x2={118-(i%2)*10} y2={26+i*13}
          stroke={A} strokeWidth="1.4" strokeLinecap="round"
          style={{animation:"soapFill 3s ease-in-out infinite", animationDelay:`${i*0.5}s`}}/>
      ))}
    </svg>
  );
}

// Execute: document + drawing checkmark
function GraphicExecute() {
  return (
    <svg viewBox="0 0 140 96" {...svgProps}>
      {/* Doc */}
      <rect x="28" y="8" width="84" height="76" rx="5" fill={F} stroke={A} strokeWidth="1.5"/>
      <rect x="28" y="8" width="84" height="18" rx="5" fill="rgba(91,63,160,0.18)" stroke="none"/>
      <rect x="28" y="18" width="84" height="8"  fill="rgba(91,63,160,0.18)" stroke="none"/>
      <rect x="44" y="13" width="36" height="5" rx="2" fill={A} opacity="0.45"/>
      <line x1="40" y1="38" x2="100" y2="38" stroke={A} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="40" y1="48" x2="96"  y2="48" stroke={A} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="40" y1="58" x2="100" y2="58" stroke={A} strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      {/* Big checkmark */}
      <path d="M46 55 l14 14 34-36" stroke={A} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        style={{animation:"siCheck 2.8s ease-in-out infinite", strokeDasharray:60, strokeDashoffset:60}}/>
    </svg>
  );
}

/* ── Care Coordination ── */

// Connect: 3 nodes forming a patient network
function GraphicCareConnect() {
  return (
    <svg viewBox="0 0 140 96" {...svgProps}>
      {/* Lines between nodes */}
      <line x1="30" y1="30" x2="110" y2="30" stroke={A} strokeWidth="1" strokeDasharray="4 3" opacity="0.3"/>
      <line x1="30" y1="30" x2="70"  y2="74" stroke={A} strokeWidth="1" strokeDasharray="4 3" opacity="0.3"/>
      <line x1="110" y1="30" x2="70" y2="74" stroke={A} strokeWidth="1" strokeDasharray="4 3" opacity="0.3"/>
      {/* 3 nodes */}
      {([
        {cx:30,  cy:30, delay:"0s"},
        {cx:110, cy:30, delay:"0.8s"},
        {cx:70,  cy:74, delay:"1.6s"},
      ]).map((n,i) => (
        <g key={i} style={{animation:"nodeHighlight 2.4s ease-in-out infinite", animationDelay:n.delay}}>
          <circle cx={n.cx} cy={n.cy} r="14" fill={F} stroke={A} strokeWidth="1.5"/>
          <circle cx={n.cx} cy={n.cy} r="5"  fill="rgba(91,63,160,0.3)" stroke={A} strokeWidth="1.2"/>
        </g>
      ))}
    </svg>
  );
}

// Organize: simple checklist 4 items checking off
function GraphicCareOrganize() {
  return (
    <svg viewBox="0 0 140 96" {...svgProps}>
      {([0,1,2,3] as number[]).map(i => (
        <g key={i} style={{animation:"soapFill 3.6s ease-in-out infinite", animationDelay:`${i*0.7}s`}}>
          <rect x="24" y={14+i*20} width="14" height="14" rx="3" fill={F} stroke={A} strokeWidth="1.4"/>
          <path d={`M27 ${22+i*20} l4 4 6-7`} stroke={A} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            style={{animation:"siCheck 3.6s ease-in-out infinite", animationDelay:`${i*0.7+0.2}s`,
              strokeDasharray:14, strokeDashoffset:14}}/>
          <line x1="44" y1={22+i*20} x2={100-(i%2)*16} y2={22+i*20}
            stroke={A} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
        </g>
      ))}
    </svg>
  );
}

// Execute: doc flying to chat bubble
function GraphicCareExecute() {
  return (
    <svg viewBox="0 0 140 96" {...svgProps}>
      {/* Source doc */}
      <rect x="10" y="24" width="36" height="46" rx="4" fill={F} stroke={A} strokeWidth="1.5"/>
      <line x1="17" y1="36" x2="39" y2="36" stroke={A} strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
      <line x1="17" y1="44" x2="39" y2="44" stroke={A} strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
      <line x1="17" y1="52" x2="34" y2="52" stroke={A} strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
      {/* Flying mini doc */}
      <g style={{animation:"flyToMsg 2.8s ease-in-out infinite"}}>
        <rect x="56" y="30" width="20" height="26" rx="3" fill="rgba(91,63,160,0.22)" stroke={A} strokeWidth="1.2"/>
        <line x1="60" y1="38" x2="72" y2="38" stroke={A} strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
        <line x1="60" y1="45" x2="72" y2="45" stroke={A} strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
      </g>
      {/* Chat bubble */}
      <rect x="96" y="18" width="36" height="30" rx="6" fill={F} stroke={A} strokeWidth="1.5"/>
      <path d="M104 48 l-4 8 6-8" fill={F} stroke={A} strokeWidth="1.2" strokeLinejoin="round"/>
      <line x1="102" y1="28" x2="126" y2="28" stroke={A} strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
      <line x1="102" y1="36" x2="122" y2="36" stroke={A} strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
      {/* Notification dot */}
      <circle cx="130" cy="22" r="4" fill={A} style={{animation:"siPulse 1.8s ease-in-out infinite"}}/>
    </svg>
  );
}

/* ── Insurance Billing ── */

// Connect: open book + billing tag
function GraphicBillConnect() {
  return (
    <svg viewBox="0 0 140 96" {...svgProps}>
      {/* Book left page */}
      <rect x="8"  y="16" width="36" height="62" rx="4" fill={F} stroke={A} strokeWidth="1.5"/>
      {/* Book right page */}
      <rect x="44" y="16" width="36" height="62" rx="4" fill="rgba(91,63,160,0.07)" stroke={A} strokeWidth="1.5"/>
      {/* Spine line */}
      <line x1="44" y1="16" x2="44" y2="78" stroke={A} strokeWidth="2" opacity="0.35"/>
      {/* Page lines */}
      {([28,38,48,58,68] as number[]).map(y => (
        <g key={y}>
          <line x1="14" y1={y} x2="38" y2={y} stroke={A} strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
          <line x1="50" y1={y} x2="74" y2={y} stroke={A} strokeWidth="1" strokeLinecap="round" opacity="0.28"/>
        </g>
      ))}
      {/* Link */}
      <line x1="84" y1="47" x2="98" y2="47" stroke={A} strokeWidth="1" strokeDasharray="3 2" opacity="0.35"
        style={{animation:"arrowPulse 2s ease-in-out infinite"}}/>
      {/* Tag */}
      <g style={{animation:"tagSway 3s ease-in-out infinite", transformOrigin:"116px 47px"}}>
        <path d="M100 32 L132 32 L138 47 L132 62 L100 62 L94 47 Z"
          fill={F} stroke={A} strokeWidth="1.5"/>
        <circle cx="103" cy="47" r="3.5" fill="rgba(91,63,160,0.2)" stroke={A} strokeWidth="1.2"/>
        <text x="121" y="44" textAnchor="middle" fill={A} fontSize="7.5" fontWeight="800" opacity="0.75">CPT</text>
        <text x="121" y="55" textAnchor="middle" fill={A} fontSize="6"   fontWeight="600" opacity="0.5">ICD</text>
      </g>
    </svg>
  );
}

// Organize: 3 text lines → arrow → 3 code boxes
function GraphicBillOrganize() {
  const rows = ["99213","Z00.00","J45.9"] as string[];
  return (
    <svg viewBox="0 0 140 96" {...svgProps}>
      {/* Clinical text lines (left) */}
      {([0,1,2] as number[]).map(i => (
        <line key={i} x1="10" y1={28+i*22} x2={40-(i%2)*8} y2={28+i*22}
          stroke={A} strokeWidth="1.4" strokeLinecap="round" opacity="0.4"/>
      ))}
      {/* Arrows + code boxes */}
      {rows.map((code, i) => (
        <g key={code} style={{animation:"soapFill 3.2s ease-in-out infinite", animationDelay:`${i*0.7}s`}}>
          <path d={`M46 ${28+i*22} L62 ${28+i*22}`} stroke={A} strokeWidth="1.5" strokeLinecap="round"/>
          <path d={`M58 ${24+i*22} L64 ${28+i*22} L58 ${32+i*22}`} stroke={A} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="66" y={19+i*22} width="62" height="18" rx="4" fill={F} stroke={A} strokeWidth="1.3"/>
          <text x="97" y={31+i*22} textAnchor="middle" fill={A} fontSize="8" fontWeight="800" opacity="0.75">{code}</text>
        </g>
      ))}
    </svg>
  );
}

// Execute: billing list + upload arrow + submitted badge
function GraphicBillExecute() {
  return (
    <svg viewBox="0 0 140 96" {...svgProps}>
      {/* Upload arrow */}
      <g style={{animation:"uploadBounce 2s ease-in-out infinite"}}>
        <line x1="70" y1="30" x2="70" y2="12" stroke={A} strokeWidth="2" strokeLinecap="round"/>
        <path d="M62 20 L70 12 L78 20" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      {/* Table */}
      <rect x="14" y="36" width="112" height="52" rx="4" fill={F} stroke={A} strokeWidth="1.5"/>
      {/* Header */}
      <rect x="14" y="36" width="112" height="14" rx="4" fill="rgba(91,63,160,0.18)" stroke="none"/>
      <rect x="14" y="42" width="112" height="8" fill="rgba(91,63,160,0.18)" stroke="none"/>
      {/* Row lines */}
      {([0,1,2] as number[]).map(i => (
        <g key={i} style={{animation:"soapFill 3s ease-in-out infinite", animationDelay:`${i*0.5}s`}}>
          <line x1="14" y1={54+i*11} x2="126" y2={54+i*11} stroke={A} strokeWidth="0.8" opacity="0.2"/>
          <rect x="18" y={56+i*11} width={24-(i%2)*6} height="5" rx="2" fill="rgba(91,63,160,0.18)"/>
          <rect x="60" y={56+i*11} width="36" height="5" rx="2" fill="rgba(91,63,160,0.12)"/>
          <rect x="108" y={56+i*11} width="14" height="5" rx="2" fill="rgba(91,63,160,0.18)"/>
        </g>
      ))}
      {/* Submitted badge */}
      <g style={{animation:"radiate1 3s ease-in-out infinite", animationDelay:"1.2s"}}>
        <rect x="84" y="4" width="52" height="16" rx="8" fill={A}/>
        <text x="110" y="15" textAnchor="middle" fill="#fff" fontSize="6.5" fontWeight="700">Submitted ✓</text>
      </g>
    </svg>
  );
}


/* ── useCaseCards data ────────────────────────────────────────────────────*/

const useCaseCards: Record<UseCase, [StepCard, StepCard, StepCard]> = {
  "Clinical Documentation": [
    {
      name: "Connect", number: "01",
      title: "We connect your clinic's templates, lab lists, and workflow preferences.",
      desc: "We learn your clinic's specific documentation style, lab ordering lists, note templates, and operational preferences so every output starts from the way your clinic already works.",
      Graphic: GraphicConnect,
    },
    {
      name: "Organize", number: "02",
      title: "We turn visit audio and physician notes into structured clinical documentation.",
      desc: "We organize unstructured visit conversations and brief physician notes into the right sections of your clinic's note templates, while also preparing patient-friendly visit summaries in your exact tone.",
      Graphic: GraphicOrganize,
    },
    {
      name: "Execute", number: "03",
      title: "We generate EMR-ready notes, summaries, and next actions.",
      desc: "We output clean, formatted clinical documents and queue the next steps, such as lab order forms, follow-up instructions, and patient messages for physician review.",
      Graphic: GraphicExecute,
    },
  ],
  "Care Coordination": [
    {
      name: "Connect", number: "01",
      title: "We connect fragmented patient history across your clinic workflow.",
      desc: "We pull together relevant patient information from the EMR, prior notes, lab results, referrals, care plans, and clinic-specific care criteria.",
      Graphic: GraphicCareConnect,
    },
    {
      name: "Organize", number: "02",
      title: "We build a complete care profile for every patient.",
      desc: "We transform scattered patient data into structured care workflows, including care plan templates, outreach scripts, referral packets, and follow-up tasks.",
      Graphic: GraphicCareOrganize,
    },
    {
      name: "Execute", number: "03",
      title: "We prepare the exact coordination work your staff needs next.",
      desc: "We draft care plans, patient call scripts, referral letters, and follow-up documentation so your team can coordinate care faster with less manual work.",
      Graphic: GraphicCareExecute,
    },
  ],
  "Insurance Billing": [
    {
      name: "Connect", number: "01",
      title: "We connect clinical work to billing rules and clinic coding conventions.",
      desc: "We learn your clinic's billing workflows, payer requirements, coding preferences, and CMS documentation standards.",
      Graphic: GraphicBillConnect,
    },
    {
      name: "Organize", number: "02",
      title: "We map care activity to billable codes and required documentation.",
      desc: "We organize clinical narratives, tracked time, care coordination activity, and documentation requirements into structured billing-ready records.",
      Graphic: GraphicBillOrganize,
    },
    {
      name: "Execute", number: "03",
      title: "We create audit-ready billing lists for one-click processing.",
      desc: "At the end of each care cycle, we compile billable time, ICD/CPT codes, supporting documentation, and patient lists into a clean billing file ready for review and submission.",
      Graphic: GraphicBillExecute,
    },
  ],
};

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
  const cards = useCaseCards[activeCase];

  function handleCaseClick(uc: UseCase) {
    if (uc === activeCase) return;
    setActiveCase(uc);
    setAnimKey(k => k + 1);
  }

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
                <p className="mt-6 max-w-[34rem] text-[1.155rem] leading-[1.75] text-[#0d1b4d]/75">
                  Sapiens Health builds AI-native medical assistants that connect fragmented data, organize into workflow, and execute tasks.
                </p>
                <div className="mt-8">
                  <a href={demoHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0d1b4d] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#1a2d6b]">
                    Book a Demo →
                  </a>
                </div>
              </div>
              <div className="flex flex-col mt-8 lg:mt-0">
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
                    <div className="mt-1.5 font-semibold text-[#0d1b4d]"
                      style={{ fontFamily: '"Instrument Sans","Manrope",sans-serif', fontSize: "clamp(1.04rem,1.75vw,1.53rem)" }}>
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
                  <h3 className="font-semibold tracking-[-0.03em] text-[#0d1b4d]"
                    style={{ fontSize: "clamp(1.45rem,2.2vw,1.75rem)" }}>
                    <span className="text-[#5b3fa0]">{colored}</span>{rest}
                  </h3>
                  <p className="max-w-[52rem] leading-[1.8] text-[#0d1b4d]/70"
                    style={{ fontSize: "clamp(1rem,1.4vw,1.15rem)" }}>{desc}</p>
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
            {cards.map(({ name, number, title, desc, Graphic }, i) => (
              <div key={number}
                className="flex flex-col rounded-2xl border border-[#0d1b4d]/10 bg-white/70 overflow-hidden"
                style={{
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(13,27,77,0.08)",
                  animation: "cardIn 0.45s cubic-bezier(.22,.68,0,1.2) both",
                  animationDelay: `${i * 90}ms`,
                }}>
                {/* Graphic area */}
                <div className="flex items-center justify-center bg-gradient-to-br from-[#f4f0fb] to-[#ede7f8] border-b border-[#0d1b4d]/08"
                  style={{ height: "148px", padding: "14px 20px" }}>
                  <Graphic />
                </div>
                {/* Content */}
                <div className="flex flex-col gap-2.5 p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#0d1b4d]/30">{number}</span>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#5b3fa0]">{name}</span>
                  </div>
                  <p className="text-[0.9rem] font-semibold leading-[1.5] text-[#0d1b4d]">{title}</p>
                  <p className="text-[0.8rem] leading-[1.72] text-[#0d1b4d]/70">{desc}</p>
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

        /* ── Care Coordination ── */
        @keyframes nodeHighlight {
          0%,10%  { opacity: 0.35; transform: scale(1);    }
          25%,40% { opacity: 1;    transform: scale(1.06); }
          55%,100%{ opacity: 0.35; transform: scale(1);    }
        }
        @keyframes checkFill {
          0%,20%  { opacity: 0; }
          40%,80% { opacity: 1; }
          95%,100%{ opacity: 0; }
        }
        @keyframes flyToMsg {
          0%,10%  { transform: translate(0,0);       opacity: 0; }
          20%,55% { transform: translate(0,0);       opacity: 1; }
          80%     { transform: translate(32px,-6px); opacity: 0; }
          81%,100%{ transform: translate(0,0);       opacity: 0; }
        }

        @keyframes gearSpin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }

        /* ── Insurance Billing ── */
        @keyframes tagSway {
          0%,100% { transform: rotate(0deg);   }
          35%     { transform: rotate(-4deg);  }
          70%     { transform: rotate(3deg);   }
        }
        @keyframes uploadBounce {
          0%,100% { transform: translateY(0);   opacity: 0.6; }
          50%     { transform: translateY(-5px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
