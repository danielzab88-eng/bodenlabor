"use client";

import { useMemo, useState } from "react";
import { Activity, ArrowLeft, ArrowRight, Brain, Calculator, Check, ChevronRight, CircleHelp, Clock3, Droplets, HeartPulse, RotateCcw, Sparkles, X } from "lucide-react";

type Level = "easy" | "hard";
type Phase = "rest" | "fill" | "pump";
const stationNames = ["Startidee", "Puls-Detektive", "Herzlabor", "Körperkreislauf", "Blutweg-Spiel", "Gefäß-Check", "Wissen anwenden", "Denk-Update"];
const easyFlow = ["linke Herzkammer", "Körperarterie", "Körper", "Körpervene", "rechter Vorhof"];
const hardFlow = ["linke Herzkammer", "Aorta", "Körperarterien", "Kapillaren", "Körpervenen", "Hohlvene", "rechter Vorhof"];

export default function Home() {
  const [level,setLevel]=useState<Level|null>(null);
  const [station,setStation]=useState(-1);
  const [startIdea,setStartIdea]=useState<boolean|null>(null);
  const [startReason,setStartReason]=useState("");
  const [phase,setPhase]=useState<Phase>("rest");
  const [pulse,setPulse]=useState("");
  const [pulseWhy,setPulseWhy]=useState("");
  const [organs,setOrgans]=useState<string[]>([]);
  const [sequence,setSequence]=useState<string[]>([]);
  const [flowResult,setFlowResult]=useState<"idle"|"ok"|"wrong">("idle");
  const [vessels,setVessels]=useState<Record<number,string>>({});
  const [quiz,setQuiz]=useState<Record<number,string>>({});
  const [finalChoice,setFinalChoice]=useState<boolean|null>(null);
  const [finalText,setFinalText]=useState("");
  const hard=level==="hard";
  const flow=hard?hardFlow:easyFlow;
  const flowCorrect=useMemo(()=>sequence.join("|")===flow.join("|"),[sequence,flow]);

  function start(l:Level){setLevel(l);setStation(0)}
  function resetFlow(){setSequence([]);setFlowResult("idle")}
  const canNext = station!==0 || startIdea!==null;

  return <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
    <header className="sticky top-0 z-20 border-b border-sky-950/10 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-8">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-200"><HeartPulse/></div>
        <div className="min-w-0 flex-1"><p className="text-xs font-black uppercase tracking-[.15em] text-sky-700">Herzwerkstatt · ca. 60 Minuten</p><h1 className="truncate text-lg font-black sm:text-xl">Der Körperkreislauf</h1></div>
        {level&&<button className="modebadge" onClick={()=>{setLevel(null);setStation(-1)}}>{hard?"Knifflig":"Basis"} · wechseln</button>}
      </div>
      {level&&<div className="h-1 bg-sky-100"><div className="h-full bg-gradient-to-r from-sky-500 to-rose-500 transition-all" style={{width:`${(station+1)/8*100}%`}}/></div>}
    </header>

    {!level&&<LevelChoice onChoose={start}/>} 
    {level&&<div className="mx-auto max-w-6xl px-4 pt-5 sm:px-8"><div className="station-strip">{stationNames.map((n,i)=><button key={n} onClick={()=>setStation(i)} className={i===station?"current":i<station?"done":""}><span>{i<station?<Check size={14}/>:i+1}</span><b>{n}</b></button>)}</div></div>}
    {level&&station===0&&<IdeaScreen hard={hard} idea={startIdea} setIdea={setStartIdea} reason={startReason} setReason={setStartReason}/>} 
    {level&&station===1&&<PulseScreen hard={hard} pulse={pulse} setPulse={setPulse} why={pulseWhy} setWhy={setPulseWhy}/>} 
    {level&&station===2&&<LabScreen hard={hard} phase={phase} setPhase={setPhase}/>} 
    {level&&station===3&&<CircuitScreen hard={hard} organs={organs} setOrgans={setOrgans}/>} 
    {level&&station===4&&<FlowScreen hard={hard} flow={flow} sequence={sequence} setSequence={setSequence} result={flowResult} check={()=>setFlowResult(flowCorrect?"ok":"wrong")} reset={resetFlow}/>} 
    {level&&station===5&&<VesselScreen hard={hard} answers={vessels} setAnswers={setVessels}/>} 
    {level&&station===6&&<ApplyScreen hard={hard} quiz={quiz} setQuiz={setQuiz}/>} 
    {level&&station===7&&<FinalScreen hard={hard} startIdea={startIdea} choice={finalChoice} setChoice={setFinalChoice} text={finalText} setText={setFinalText}/>} 

    {level&&<nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 pb-12 pt-2 sm:px-8" aria-label="Seitennavigation">
      <button className="navbtn" disabled={station===0} onClick={()=>setStation(s=>Math.max(0,s-1))}><ArrowLeft size={18}/> Zurück</button>
      <span className="text-center text-sm font-black text-slate-500">{stationNames[station]}<br/><span className="font-normal">Station {station+1} von 8</span></span>
      <button className="navbtn" disabled={station===7||!canNext} onClick={()=>setStation(s=>Math.min(7,s+1))}>Weiter <ArrowRight size={18}/></button>
    </nav>}
  </main>
}

function LevelChoice({onChoose}:{onChoose:(l:Level)=>void}){return <section className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-16">
  <span className="eyebrow">Eine Unterrichtsstunde · zwei Lernwege</span><h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-sky-950 sm:text-6xl">Wie gelangt Blut <span className="text-rose-500">durch den ganzen Körper?</span></h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">Wähle den Weg, der zu dir passt. Beide Wege dauern ungefähr 60 Minuten und enden mit einer eigenen Erklärung.</p>
  <div className="mt-8 grid gap-5 md:grid-cols-2">
    <button onClick={()=>onChoose("easy")} className="level-card group border-sky-200 bg-sky-50 text-left hover:border-sky-500"><span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-sky-500 text-white"><Droplets/></span><h3 className="text-2xl font-black text-sky-950">Basis · mit vielen Hilfen</h3><ul className="mt-3 space-y-2 text-slate-600"><li>✓ kurze, einfache Texte</li><li>✓ sichtbare Merksätze</li><li>✓ nur fünf Stationen im Blutweg</li><li>✓ Satzanfänge für Erklärungen</li></ul><Time/><span className="mt-5 flex items-center gap-2 font-black text-sky-700">Basisweg starten <ChevronRight/></span></button>
    <button onClick={()=>onChoose("hard")} className="level-card group border-rose-200 bg-rose-50 text-left hover:border-rose-500"><span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-rose-500 text-white"><Sparkles/></span><h3 className="text-2xl font-black text-sky-950">Knifflig · für Forschende</h3><ul className="mt-3 space-y-2 text-slate-600"><li>✓ Fachbegriffe selbst erschließen</li><li>✓ sieben Stationen im Blutweg</li><li>✓ rechnen, begründen und übertragen</li><li>✓ Fälle zu Sport und langem Stehen</li></ul><Time/><span className="mt-5 flex items-center gap-2 font-black text-rose-700">Challenge starten <ChevronRight/></span></button>
  </div>
</section>}

function Time(){return <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-black text-slate-600"><Clock3 size={17}/> etwa 55–65 Minuten</span>}
function Shell({number,title,time,children}:{number:number,title:string,time:string,children:React.ReactNode}){return <section className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-11"><div className="flex flex-wrap items-center gap-3"><span className="eyebrow">Station {number}</span><span className="timechip"><Clock3 size={15}/>{time}</span></div><h2 className="mb-7 mt-2 text-3xl font-black tracking-tight text-sky-950 sm:text-4xl">{title}</h2>{children}</section>}

function IdeaScreen({hard,idea,setIdea,reason,setReason}:{hard:boolean,idea:boolean|null,setIdea:(v:boolean)=>void,reason:string,setReason:(v:string)=>void}){return <Shell number={1} title={hard?"Prüfe deine Startvorstellung":"Was glaubst du?"} time={hard?"7 Minuten":"5 Minuten"}>
  <div className="panel grid gap-7 md:grid-cols-[1fr_.9fr]"><div><p className="text-xl font-black">„Das Herz filtert das Blut.“</p><p className="mt-3 text-slate-600">Entscheide dich. Deine erste Idee darf sich beim Forschen verändern.</p>{!hard&&<div className="hint mt-5"><CircleHelp/><span><strong>Filtern</strong> bedeutet: Stoffe voneinander trennen – wie bei einem Kaffeefilter.</span></div>}{hard&&<label className="mt-5 block font-bold">Begründe deine Vermutung in mindestens zwei Sätzen.<textarea value={reason} onChange={e=>setReason(e.target.value)} className="answerbox" placeholder="Ich vermute …, weil …"/></label>}</div><div className="grid content-start gap-3"><Choice active={idea===true} onClick={()=>setIdea(true)} label="Das stimmt."/><Choice active={idea===false} onClick={()=>setIdea(false)} label="Das stimmt nicht."/>{idea!==null&&<p className="saved">Gespeichert. Die Auflösung kommt am Ende.</p>}</div></div>
  {hard&&<Task title="Forscherfrage">Welche Beobachtung könnte zeigen, ob das Herz filtert oder Blut bewegt? Notiere eine mögliche Idee auf deinem Blatt.</Task>}
</Shell>}

function PulseScreen({hard,pulse,setPulse,why,setWhy}:{hard:boolean,pulse:string,setPulse:(v:string)=>void,why:string,setWhy:(v:string)=>void}){return <Shell number={2} title={hard?"Puls messen und Daten deuten":"Fühle deine Herzpumpe"} time={hard?"8 Minuten":"7 Minuten"}>
  <div className="grid gap-5 md:grid-cols-2"><div className="panel"><h3 className="cardtitle">1. Miss 15 Sekunden</h3><ol className="steps"><li>Lege Zeige- und Mittelfinger an dein Handgelenk.</li><li>Zähle 15 Sekunden lang die Pulsschläge.</li><li>Trage die Zahl ein.</li></ol><label className="mt-5 block font-bold">Meine Schläge in 15 Sekunden<input inputMode="numeric" value={pulse} onChange={e=>setPulse(e.target.value.replace(/\D/g,""))} className="numberinput" placeholder="z. B. 18"/></label>{pulse&&<p className="resultline">Das sind ungefähr <strong>{Number(pulse)*4} Schläge pro Minute.</strong></p>}</div>
    <div className="panel"><h3 className="cardtitle">2. Denke nach</h3>{hard?<><p>Nach 20 Kniebeugen steigt der Puls. Erkläre die Kette aus Ursache und Wirkung.</p><textarea value={why} onChange={e=>setWhy(e.target.value)} className="answerbox" placeholder="Muskeln arbeiten stärker → … → Herz …"/><div className="wordbank">Nutze: Muskeln · Versorgung · Blutmenge · Herzschlag</div></>:<><p>Was spürst du beim Puls?</p><div className="mt-4 grid gap-2"><Choice active={why==="pumpe"} onClick={()=>setWhy("pumpe")} label="Das Herz drückt Blut weiter."/><Choice active={why==="filter"} onClick={()=>setWhy("filter")} label="Das Herz sortiert Blut."/></div>{why&&<Feedback ok={why==="pumpe"} text={why==="pumpe"?"Genau. Jeder fühlbare Schlag gehört zur Pumpbewegung.":"Versuche es noch einmal: Was kannst du am Handgelenk wirklich fühlen?"}/>}</>}</div></div>
</Shell>}

function LabScreen({hard,phase,setPhase}:{hard:boolean,phase:Phase,setPhase:(v:Phase)=>void}){const [answers,setAnswers]=useState<Record<number,string>>({});const questions=hard?[{q:"Der Herzmuskel entspannt sich. Was passiert mit dem Druck?",a:"Er sinkt."},{q:"Warum strömt Blut aus den Venen in das Herz?",a:"Es entsteht ein Druckgefälle."},{q:"Der Herzmuskel zieht sich zusammen. Wohin gelangt Blut?",a:"In die Arterien."}]:[{q:"Das Herz wird weit. Was passiert?",a:"Blut fließt hinein."},{q:"Das Herz drückt sich zusammen. Was passiert?",a:"Blut fließt hinaus."}];return <Shell number={3} title={hard?"Herzphasen und Druck":"Füllen und Pumpen"} time={hard?"8 Minuten":"7 Minuten"}>
  <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><div className="panel overflow-hidden"><div className="relative mx-auto grid min-h-[320px] max-w-xl place-items-center"><div className={`heart-model ${phase}`}><span>HERZ</span></div><div className={`blood blood-left ${phase}`}>● ● ●</div><div className={`blood blood-right ${phase}`}>● ● ●</div><div className="absolute left-1 top-1/2 -translate-y-1/2 text-center text-sm font-black text-sky-800">Vene<br/><small>hinein</small></div><div className="absolute right-0 top-1/2 -translate-y-1/2 text-center text-sm font-black text-rose-700">Arterie<br/><small>hinaus</small></div></div><div className="flex flex-wrap justify-center gap-3"><button onClick={()=>setPhase("fill")} className={`phasebtn ${phase==="fill"?"active":""}`}>1 · Füllphase</button><button onClick={()=>setPhase("pump")} className={`phasebtn ${phase==="pump"?"active":""}`}>2 · Pumpphase</button><button onClick={()=>setPhase("rest")} className="iconbtn" aria-label="Zurücksetzen"><RotateCcw size={18}/></button></div></div>
    <div className="space-y-3"><InfoNumber n="1" title="Füllphase" text={hard?"Der Herzmuskel entspannt sich. Der Druck sinkt und Blut strömt aus den Venen ein.":"Das Herz wird weit. Blut fließt aus den Venen hinein."}/><InfoNumber n="2" title="Pumpphase" text={hard?"Der Herzmuskel zieht sich zusammen. Der Druck steigt und Blut wird in die Arterien gepresst.":"Das Herz drückt sich zusammen. Blut fließt in die Arterien."}/><div className="fact"><strong>Genauer:</strong> Das Herz saugt nicht wie ein Strohhalm. „Saugfunktion“ meint hier: Beim Entspannen sinkt der Druck, sodass Blut einströmen kann.</div></div></div>
  <div className="panel mt-5"><h3 className="cardtitle">Phasen-Check</h3>{questions.map((x,i)=><div className="quizrow" key={x.q}><p>{x.q}</p><div>{[x.a,...(hard?(i===0?["Er steigt."]:i===1?["Das Blut wird gefiltert."]:["In die Venen."]):(i===0?["Blut fließt hinaus."]:["Blut bleibt stehen."]))].map(o=><button className={`smallchoice ${answers[i]===o?"selected":""}`} onClick={()=>setAnswers({...answers,[i]:o})} key={o}>{o}</button>)}</div>{answers[i]&&<span className={answers[i]===x.a?"inline-ok":"inline-no"}>{answers[i]===x.a?"✓ richtig":"✗ noch einmal überlegen"}</span>}</div>)}</div>
</Shell>}

function CircuitScreen({hard,organs,setOrgans}:{hard:boolean,organs:string[],setOrgans:(v:string[])=>void}){
  const [stage,setStage]=useState(0);
  const targets=["Kopf","Arme","Organe","Beine"];
  const steps=hard?
    ["Orientieren","Start: linke Herzkammer","Hinweg: Aorta und Arterien","Austausch in Kapillaren","Rückweg: Venen und Hohlvenen"]:
    ["Körper ansehen","1 · Herz startet","2 · Rot fließt hinaus","3 · Austausch im Körper","4 · Blau fließt zurück"];
  const explanations=hard?[
    "Der Körperkreislauf beginnt in der linken Herzkammer und endet im rechten Vorhof. Betrachte zuerst Herz, Körper und Pfeile.",
    "Die linke Herzkammer zieht sich zusammen. Sie erzeugt Druck und presst sauerstoffreiches Blut in die Aorta.",
    "Die Aorta verzweigt sich in Körperarterien und kleinere Arteriolen. Sie bringen sauerstoffreiches Blut zu Kopf, Armen, Organen und Beinen.",
    "In den Kapillaren werden Sauerstoff und Nährstoffe an die Zellen abgegeben. Kohlenstoffdioxid und Abfallstoffe gelangen ins Blut. Hier wechselt die Modellfarbe von Rot zu Blau.",
    "Venolen und Körpervenen sammeln das nun sauerstoffarme Blut. Obere und untere Hohlvene führen es zum rechten Vorhof zurück. Dort endet der Körperkreislauf."
  ]:[
    "Der Körperkreislauf ist eine Rundreise: vom Herzen in alle Körperteile und wieder zurück.",
    "Start: Die linke Herzkammer drückt sauerstoffreiches Blut hinaus.",
    "Rote Pfeile: Körperarterien führen das Blut vom Herzen zu Kopf, Armen, Organen und Beinen.",
    "In den feinsten Gefäßen gibt das Blut Sauerstoff an den Körper ab. Danach ist es sauerstoffarm.",
    "Blaue Pfeile: Körpervenen bringen das Blut zum rechten Vorhof zurück. Dort endet der Körperkreislauf."
  ];
  function toggle(x:string){setOrgans(organs.includes(x)?organs.filter(o=>o!==x):[...organs,x])}
  return <Shell number={4} title="Der Körperkreislauf – Schritt für Schritt" time={hard?"15 Minuten":"13 Minuten"}>
    <div className="color-key" role="note"><span><i className="key-red"/>Rot = sauerstoffreich</span><span><i className="key-blue"/>Blau = sauerstoffarm</span><strong>Die Farben sind ein Modell: Echtes Blut ist nie blau.</strong></div>
    <div className="circulation-lesson mt-5">
      <div className="panel diagram-panel">
        <BodyCircuitDiagram stage={stage}/>
      </div>
      <div className="panel step-panel">
        <p className="label">Abbildung lesen</p><h3 className="cardtitle">Verfolge den Weg</h3>
        <div className="diagram-steps">{steps.map((s,i)=><button key={s} className={stage===i?"active":""} onClick={()=>setStage(i)}><span>{i===0?"◎":i}</span>{s}</button>)}</div>
        <div className={`stage-explanation stage-${stage}`}><strong>Schritt {stage===0?"0":stage}</strong><p>{explanations[stage]}</p></div>
      </div>
    </div>
    <div className="direction-rule mt-5"><ArrowRight/><div><strong>Gefäße werden nach der Richtung benannt.</strong><p><b>Arterien</b> führen vom Herzen weg. <b>Venen</b> führen zum Herzen hin. Nicht die Farbe entscheidet.</p></div></div>
    <div className="panel mt-5"><h3 className="cardtitle">Hat das Blut wirklich den ganzen Körper erreicht?</h3><p className="mt-2 text-slate-600">Klicke alle Bereiche an, die von den Körperarterien versorgt werden.</p><div className="body-targets mt-4">{targets.map(t=><button className={organs.includes(t)?"visited":""} onClick={()=>toggle(t)} key={t}>{organs.includes(t)?<Check/>:<Droplets/>}{t}</button>)}</div>{organs.length===4&&<Feedback ok text="Richtig: Der Körperkreislauf ist ein verzweigtes Netz. Er erreicht alle diese Körperbereiche und bringt das Blut wieder zurück."/>}</div>
    {!hard?<>
      <div className="memorygrid mt-5"><Task title="Zeichenauftrag mit Hilfe">Zeichne ein rotes Gefäß von der linken Herzkammer zum Körper. Zeichne ein blaues Gefäß vom Körper zum rechten Vorhof. Setze Pfeilspitzen ein.</Task><Task title="Sprich den Weg laut">Linke Herzkammer → Körperarterie → Körper → Körpervene → rechter Vorhof.</Task></div>
      <div className="simple-cloze mt-5"><strong>Merksatz:</strong> Die <u>linke Herzkammer</u> pumpt Blut in den Körper. Der <u>rechte Vorhof</u> nimmt das Blut aus dem Körper wieder auf.</div>
    </>:<>
      <div className="panel mt-5"><h3 className="cardtitle">Zeichenauftrag für Forschende</h3><ol className="steps"><li>Übertrage den Körperumriss und das Herz auf dein Blatt.</li><li>Zeichne den sauerstoffreichen Weg rot: <b>linke Herzkammer → Aorta → Körperarterien → Arteriolen.</b></li><li>Markiere das Kapillarnetz violett und notiere den Stoffaustausch.</li><li>Zeichne den sauerstoffarmen Rückweg blau: <b>Venolen → Körpervenen → obere/untere Hohlvene → rechter Vorhof.</b></li><li>Setze an jedem Gefäß Pfeile für die Fließrichtung.</li></ol></div>
      <Task title="Begründe ausführlich">Erkläre, warum die Aussage „Arterien sind rot und Venen sind blau“ als allgemeine Regel falsch ist. Nutze Fließrichtung, Sauerstoffgehalt und Körperkreislauf.</Task>
    </>}
    <div className="next-question mt-5"><CircleHelp/><div><strong>Offene Frage für die nächste Stunde</strong><p>Im rechten Vorhof kommt sauerstoffarmes Blut an. Wie wird es wieder sauerstoffreich? Dafür brauchen wir später den Lungenkreislauf.</p></div></div>
  </Shell>
}

function BodyCircuitDiagram({stage}:{stage:number}){const showRed=stage>=2;const showExchange=stage>=3;const showBlue=stage>=4;return <figure className="body-circuit-figure"><svg className="circuit-svg" viewBox="0 0 520 720" role="img" aria-labelledby="body-circuit-title body-circuit-desc">
  <title id="body-circuit-title">Schema des Körperkreislaufs</title><desc id="body-circuit-desc">Sauerstoffreiches Blut fließt aus der linken Herzkammer durch Körperarterien in den Körper. In Kapillaren findet der Stoffaustausch statt. Sauerstoffarmes Blut fließt durch Körpervenen zum rechten Vorhof zurück.</desc>
  <defs><marker id="arrow-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#d92d50"/></marker><marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#087cab"/></marker></defs>
  <circle cx="260" cy="62" r="42" className="silhouette"/><path d="M205 121 Q260 98 315 121 L342 316 Q330 355 309 371 L326 660 L275 660 L260 410 L245 660 L194 660 L211 371 Q190 355 178 316 Z" className="silhouette"/><path d="M190 145 L82 346" className="limb"/><path d="M330 145 L438 346" className="limb"/>
  <g className={stage>=1?"diagram-part visible":"diagram-part"}><path d="M239 204 C214 179 194 215 212 245 C225 267 260 288 260 288 C260 288 295 267 308 245 C326 215 306 179 281 204 C270 215 260 224 260 224 C260 224 250 215 239 204Z" fill="#f7b6c4" stroke="#8e2340" strokeWidth="4"/><path d="M260 224 L260 280" stroke="#fff" strokeWidth="4"/><text x="172" y="198" className="svg-label red-label">linke Herzkammer</text><line x1="224" y1="202" x2="242" y2="228" className="label-line red-stroke"/><text x="288" y="198" className="svg-label blue-label">rechter Vorhof</text><line x1="302" y1="202" x2="283" y2="225" className="label-line blue-stroke"/></g>
  <g className={showRed?"diagram-part visible":"diagram-part"}><path d="M244 251 C205 235 185 196 187 157 C188 111 222 102 232 91" className="vessel red-vessel" markerEnd="url(#arrow-red)"/><path d="M210 174 L105 322" className="vessel red-vessel" markerEnd="url(#arrow-red)"/><path d="M214 260 C185 335 193 458 215 624" className="vessel red-vessel" markerEnd="url(#arrow-red)"/><path d="M220 282 C240 326 235 355 229 390" className="vessel red-vessel" markerEnd="url(#arrow-red)"/><path d="M201 315 L117 325" className="vessel red-vessel" markerEnd="url(#arrow-red)"/><text x="58" y="135" className="svg-label red-label">Aorta / Körperarterien</text></g>
  <g className={showExchange?"diagram-part visible":"diagram-part"}><circle cx="232" cy="91" r="10" className="capillary"/><circle cx="105" cy="322" r="10" className="capillary"/><circle cx="117" cy="325" r="10" className="capillary"/><circle cx="229" cy="390" r="10" className="capillary"/><circle cx="215" cy="624" r="10" className="capillary"/><circle cx="305" cy="624" r="10" className="capillary"/><text x="304" y="402" className="svg-label exchange-label">Kapillaren:</text><text x="304" y="421" className="svg-small">O₂ zum Körper</text><text x="304" y="439" className="svg-small">CO₂ ins Blut</text></g>
  <g className={showBlue?"diagram-part visible":"diagram-part"}><path d="M288 226 C329 210 337 171 330 130 C327 105 306 98 288 91" className="vessel blue-vessel" markerEnd="url(#arrow-blue)"/><path d="M415 322 L309 173" className="vessel blue-vessel" markerEnd="url(#arrow-blue)"/><path d="M305 624 C327 458 335 335 306 260" className="vessel blue-vessel" markerEnd="url(#arrow-blue)"/><path d="M291 390 C285 355 280 326 300 282" className="vessel blue-vessel" markerEnd="url(#arrow-blue)"/><path d="M403 325 L319 315" className="vessel blue-vessel" markerEnd="url(#arrow-blue)"/><text x="317" y="135" className="svg-label blue-label">Körpervenen / Hohlvenen</text></g>
  <text x="260" y="695" textAnchor="middle" className="svg-caption">KÖRPERKREISLAUF · LUNGE NOCH NICHT DARGESTELLT</text>
</svg><figcaption>{stage===0?"Wähle rechts den ersten Schritt.":stage<4?"Baue den Weg Schritt für Schritt auf.":"Vollständiger Körperkreislauf: links hinaus, rechts zurück."}</figcaption></figure>}

function FlowScreen({hard,flow,sequence,setSequence,result,check,reset}:{hard:boolean,flow:string[],sequence:string[],setSequence:(v:string[])=>void,result:string,check:()=>void,reset:()=>void}){const options=hard?["Kapillaren","rechter Vorhof","Aorta","Körpervenen","linke Herzkammer","Hohlvene","Körperarterien"]:["Körper","rechter Vorhof","Körperarterie","linke Herzkammer","Körpervene"];return <Shell number={5} title={hard?"Rekonstruiere den vollständigen Weg":"Baue den Blutweg"} time={hard?"8 Minuten":"7 Minuten"}>
  <div className="panel"><p className="text-lg font-black">Tippe die Begriffe in der richtigen Reihenfolge an.</p>{!hard&&<div className="hint mt-3"><CircleHelp/><span>Beginne bei der <strong>linken Herzkammer</strong>. Merke: Arterie = vom Herzen weg.</span></div>}<div className="mt-5 flex flex-wrap gap-3">{options.map(o=><button className="chip" onClick={()=>sequence.length<flow.length&&setSequence([...sequence,o])} key={o}>{o}</button>)}</div><div className="flowline mt-6">{sequence.length?sequence.map((x,i)=><span className="flex items-center gap-2" key={i}><b>{x}</b>{i<sequence.length-1&&<ArrowRight size={17}/>}</span>):<span className="text-slate-400">Dein Blutweg erscheint hier …</span>}</div><div className="mt-5 flex gap-3"><button className="primary" disabled={sequence.length!==flow.length} onClick={check}>Prüfen</button><button className="secondary" onClick={reset}><RotateCcw size={17}/> Neu</button></div>{result==="ok"&&<Feedback ok text="Der Körperkreislauf ist richtig aufgebaut."/>}{result==="wrong"&&<Feedback text={hard?"Noch nicht. Suche zuerst die Struktur, aus der Blut herausgepumpt wird.":"Noch nicht. Hilfe: linke Herzkammer → Körperarterie → Körper → Körpervene → rechter Vorhof"}/>}</div>
  {hard&&<Task title="Erklärauftrag">Beschreibe zusätzlich, wie sich der Durchmesser der Gefäße auf dem Weg von der Aorta zu den Kapillaren verändert und warum das sinnvoll ist.</Task>}
</Shell>}

const easyVessels=[{q:"führt Blut vom Herzen weg",a:"Arterie"},{q:"führt Blut zum Herzen hin",a:"Vene"},{q:"hat oft Klappen",a:"Vene"},{q:"kommt direkt nach der linken Herzseite",a:"Arterie"}];
const hardVessels=[...easyVessels,{q:"besitzt eine dicke, elastische Muskelschicht",a:"Arterie"},{q:"transportiert Blut meist unter geringerem Druck",a:"Vene"},{q:"wird durch die Muskelpumpe unterstützt",a:"Vene"},{q:"verzweigt sich auf dem Weg zu Kapillaren",a:"Arterie"}];
function VesselScreen({hard,answers,setAnswers}:{hard:boolean,answers:Record<number,string>,setAnswers:(v:Record<number,string>)=>void}){const cards=hard?hardVessels:easyVessels;const done=cards.every((x,i)=>answers[i]===x.a);return <Shell number={6} title={hard?"Gefäße vergleichen und Fehlregeln prüfen":"Arterie oder Vene?"} time={hard?"7 Minuten":"6 Minuten"}>
  <div className="mb-5 grid gap-4 md:grid-cols-2"><div className="vessel-card artery"><div className="vessel-tube"/><h3>Arterie</h3><p><strong>A wie Ausgang:</strong> vom Herzen weg.</p></div><div className="vessel-card vein"><div className="vessel-tube"><i/><i/></div><h3>Vene</h3><p>Zum Herzen hin; häufig mit Venenklappen.</p></div></div>
  {hard&&<div className="myth"><Brain/><div><strong>Achtung, Farb-Falle:</strong><p>Eine Arterie ist nicht automatisch sauerstoffreich und eine Vene nicht automatisch sauerstoffarm. Entscheidend ist immer die Fließrichtung zum oder vom Herzen.</p></div></div>}
  <div className="panel mt-5 space-y-3">{cards.map((c,i)=><div className="quizrow" key={c.q}><p>{c.q}</p><div><button className={`smallchoice ${answers[i]==="Arterie"?"selected":""}`} onClick={()=>setAnswers({...answers,[i]:"Arterie"})}>Arterie</button><button className={`smallchoice ${answers[i]==="Vene"?"selected":""}`} onClick={()=>setAnswers({...answers,[i]:"Vene"})}>Vene</button></div>{answers[i]&&<span className={answers[i]===c.a?"inline-ok":"inline-no"}>{answers[i]===c.a?"✓":"✗"}</span>}</div>)}{done&&<Feedback ok text={`Alle ${cards.length} Aussagen sind richtig zugeordnet.`}/>}</div>
</Shell>}

function ApplyScreen({hard,quiz,setQuiz}:{hard:boolean,quiz:Record<number,string>,setQuiz:(v:Record<number,string>)=>void}){if(!hard)return <Shell number={7} title="Herz-Wissen sichern" time="8 Minuten"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><Fact big="≈ Faust" text="So groß ist das Herz ungefähr."/><Fact big="≈ 100.000" text="Mal schlägt es ungefähr am Tag."/><Fact big="24 / 7" text="Es arbeitet ohne Pause."/></div><div className="panel mt-5"><h3 className="cardtitle">Drei schnelle Fragen</h3><EasyQuestion q="Wo beginnt unser Körperkreislauf?" options={["linke Herzseite","Beine"]} answer="linke Herzseite" value={quiz[0]} set={v=>setQuiz({...quiz,0:v})}/><EasyQuestion q="Welches Gefäß bringt Blut zurück?" options={["Vene","Arterie"]} answer="Vene" value={quiz[1]} set={v=>setQuiz({...quiz,1:v})}/><EasyQuestion q="Warum schlägt das Herz beim Rennen schneller?" options={["Die Muskeln brauchen mehr Versorgung.","Das Herz filtert schneller."]} answer="Die Muskeln brauchen mehr Versorgung." value={quiz[2]} set={v=>setQuiz({...quiz,2:v})}/></div></Shell>;
  return <Shell number={7} title="Wende dein Wissen auf neue Fälle an" time="10 Minuten"><div className="grid gap-5 md:grid-cols-2"><div className="panel"><h3 className="cardtitle">Fall 1 · Sprint</h3><p>Beim Sprint steigt das Herzzeitvolumen. Erkläre den Zusammenhang zwischen Muskelarbeit, Stoffaustausch in den Kapillaren und Herzschlag.</p><textarea className="answerbox" value={quiz[0]||""} onChange={e=>setQuiz({...quiz,0:e.target.value})} placeholder="Beim Sprint …"/><div className="wordbank">Nutze: Bedarf · Kapillaren · Blutmenge · Frequenz</div></div><div className="panel"><h3 className="cardtitle">Fall 2 · Langes Stehen</h3><p>Eine Person steht lange still. Warum kann Blut leichter in den Beinen bleiben, und was hilft beim Gehen?</p><textarea className="answerbox" value={quiz[1]||""} onChange={e=>setQuiz({...quiz,1:e.target.value})} placeholder="Beim langen Stehen …"/><div className="wordbank">Nutze: Schwerkraft · Venenklappen · Muskelpumpe</div></div></div><div className="panel mt-5"><div className="flex items-center gap-3"><Calculator className="text-rose-500"/><h3 className="cardtitle">Rechen-Challenge</h3></div><p>Ein Herz schlägt 72-mal pro Minute. Berechne die Zahl der Schläge in einer Stunde und in 24 Stunden.</p><input className="answerbox" value={quiz[2]||""} onChange={e=>setQuiz({...quiz,2:e.target.value})} placeholder="Rechenweg und Ergebnis …"/><details className="mt-3"><summary>Lösung vergleichen</summary><p className="mt-2">72 × 60 = <strong>4.320 pro Stunde</strong><br/>4.320 × 24 = <strong>103.680 pro Tag</strong></p></details></div></Shell>
}

function FinalScreen({hard,startIdea,choice,setChoice,text,setText}:{hard:boolean,startIdea:boolean|null,choice:boolean|null,setChoice:(v:boolean)=>void,text:string,setText:(v:string)=>void}){const required=hard?["Druck","linke Herz","Arterie","Kapillar","Vene","rechte Herz"]:[];const hits=required.filter(w=>text.toLowerCase().includes(w.toLowerCase())).length;const ready=choice===false&&(hard?hits>=5:text.trim().split(/\s+/).length>=6);return <Shell number={8} title={hard?"Formuliere deine wissenschaftliche Erklärung":"Was macht das Herz wirklich?"} time={hard?"7 Minuten":"6 Minuten"}>
  <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr]"><div className="panel"><p className="label">Deine Startidee</p><p className="mt-2 text-xl font-black">{startIdea?"Das Herz filtert Blut.":"Das Herz hat eine andere Aufgabe."}</p><p className="mt-4 text-slate-600">Neue Erkenntnisse dürfen unsere Vorstellungen verändern.</p></div><div className="panel"><p className="text-xl font-black">Das Herz filtert das Blut.</p><div className="mt-4 grid gap-3 sm:grid-cols-2"><Choice active={choice===true} onClick={()=>setChoice(true)} label="Stimmt"/><Choice active={choice===false} onClick={()=>setChoice(false)} label="Stimmt nicht"/></div>{choice===true&&<Feedback text="Das Herz bewegt Blut. Vor allem die Nieren filtern Abfallstoffe aus dem Blut."/>}{choice===false&&<Feedback ok text="Richtig. Das Herz füllt sich und pumpt Blut durch den Körperkreislauf."/>}<label className="mt-5 block font-black">{hard?"Erkläre den Körperkreislauf in mindestens fünf zusammenhängenden Sätzen.":"Vervollständige: Das Herz ist eine … Es …"}<textarea className="answerbox" value={text} onChange={e=>setText(e.target.value)} placeholder={hard?"Wenn sich die linke Herzkammer zusammenzieht, …":"Das Herz ist eine Pumpe. Es …"}/></label>{hard&&<div className="wordbank">Begriffe gefunden: {hits}/6 · Druck · linke Herzhälfte · Arterie · Kapillaren · Vene · rechte Herzhälfte</div>}{ready&&<div className="completion mt-5"><Check/><div><strong>Herzwerkstatt geschafft!</strong><p>Du hast den Körperkreislauf erklärt und deine Startidee überprüft.</p></div></div>}</div></div>
</Shell>}

function EasyQuestion({q,options,answer,value,set}:{q:string,options:string[],answer:string,value?:string,set:(v:string)=>void}){return <div className="quizrow"><p>{q}</p><div>{options.map(o=><button className={`smallchoice ${value===o?"selected":""}`} onClick={()=>set(o)} key={o}>{o}</button>)}</div>{value&&<span className={value===answer?"inline-ok":"inline-no"}>{value===answer?"✓ richtig":"✗ versuche es noch einmal"}</span>}</div>}
function Choice({active,onClick,label}:{active:boolean,onClick:()=>void,label:string}){return <button onClick={onClick} className={`choice ${active?"active":""}`}>{active?<Check size={20}/>:<span className="h-5 w-5 rounded-full border-2 border-slate-300"/>}{label}</button>}
function InfoNumber({n,title,text}:{n:string,title:string,text:string}){return <div className="flex gap-3 rounded-2xl border border-sky-100 bg-white p-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-500 font-black text-white">{n}</span><div><h3 className="font-black text-sky-950">{title}</h3><p className="mt-1 text-slate-600">{text}</p></div></div>}
function Feedback({ok=false,text}:{ok?:boolean,text:string}){return <div role="status" className={`feedback ${ok?"ok":"no"}`}>{ok?<Check/>:<X/>}<span>{text}</span></div>}
function Task({title,children}:{title:string,children:React.ReactNode}){return <div className="task"><Brain/><div><strong>{title}</strong><p>{children}</p></div></div>}
function Fact({big,text}:{big:string,text:string}){return <article className="factcard"><Activity className="text-rose-500"/><strong>{big}</strong><p>{text}</p></article>}
function Glossary({word,text}:{word:string,text:string}){return <span tabIndex={0} className="group relative inline-block cursor-help border-b-2 border-dotted border-sky-500 font-bold">{word}<span role="tooltip" className="tooltip">{text}</span></span>}
