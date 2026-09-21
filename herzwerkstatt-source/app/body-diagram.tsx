"use client";

/** Vereinfachtes Schema des Körperkreislaufs, bewusst ohne Lungenkreislauf. */
export default function BodyDiagram({ stage }: { stage: number }) {
  const shown = (step: number) => (stage === 0 || stage >= step ? "loop-part visible" : "loop-part");

  return (
    <figure className="body-circuit-figure">
      <svg
        className="circuit-svg loop-svg"
        viewBox="0 0 520 650"
        role="img"
        aria-labelledby="body-loop-title body-loop-description"
      >
        <title id="body-loop-title">Einfaches Schema des Körperkreislaufs</title>
        <desc id="body-loop-description">
          Oben liegt das Herz. Von der linken Herzkammer führt rechts ein rotes Gefäß
          nach unten zum Kapillarnetz des Körpers. Links führt ein blaues Gefäß
          wieder nach oben in den rechten Vorhof. Pfeile zeigen die Fließrichtung.
        </desc>
        <text x="260" y="32" textAnchor="middle" className="loop-heading">HERZ</text>
        <g className={shown(1)}>
          <path d="M260 183 C240 169 212 145 211 111 C210 86 230 76 248 88 L260 99 L272 88 C290 76 310 86 309 111 C308 145 280 169 260 183Z" fill="#fff" stroke="#244b67" strokeWidth="4" />
          <path d="M260 99 260 178" stroke="#244b67" strokeWidth="3" />
          <path d="M260 99 271 88 C290 76 310 86 309 111 C308 145 280 169 260 183Z" fill="#f9d8de" stroke="#d82c4c" strokeWidth="3" />
          <path d="M260 99 248 88 C230 76 210 86 211 111 C212 145 240 169 260 183Z" fill="#dceef9" stroke="#126aa7" strokeWidth="3" />
          <path d="M260 99 260 178" stroke="#fff" strokeWidth="4" />
          <text x="162" y="113" textAnchor="end" className="loop-small blue-label">rechter</text>
          <text x="162" y="132" textAnchor="end" className="loop-small blue-label">Vorhof</text>
          <path d="M173 120 211 120" className="loop-guide" />
          <text x="358" y="113" className="loop-small red-label">linke</text>
          <text x="358" y="132" className="loop-small red-label">Herzkammer</text>
          <path d="M310 120 349 120" className="loop-guide" />
        </g>

        <g className={shown(2)}>
          <path
            d="M296 145 C359 154 424 189 424 257 L424 448 C424 502 402 525 362 542"
            className="loop-vessel loop-red"
          />
          <path d="M466 288 V365 M451 349 466 371 481 349" className="loop-flow red-flow" />
          <text x="300" y="242" className="loop-small red-label">Aorta</text>
          <text x="300" y="402" className="loop-small red-label">Körperarterien</text>
        </g>

        <g className={shown(3)}>
          <rect x="156" y="518" width="208" height="82" rx="35" className="capillary-bed" />
          <path d="M362 542 C330 527 302 532 268 542 S210 557 158 542 M362 559 C326 577 304 568 264 557 S201 533 158 559 M362 580 C325 554 302 575 264 580 S202 570 158 580" className="capillary-lines" />
          <path d="M362 542 C330 527 302 532 268 542 M362 559 C326 577 304 568 264 557 M362 580 C325 554 302 575 264 580" className="capillary-red-lines" />
          <path d="M264 542 C224 551 198 554 158 542 M264 557 C222 545 198 545 158 559 M264 580 C221 583 191 571 158 580" className="capillary-blue-lines" />
          <text x="260" y="625" textAnchor="middle" className="loop-small exchange-label">Kapillarnetz im Körper · Stoffaustausch</text>
        </g>

        <g className={shown(4)}>
          <path
            d="M158 560 C116 538 96 505 96 448 L96 257 C96 189 161 154 224 145"
            className="loop-vessel loop-blue"
          />
          <path d="M54 371 V294 M39 316 54 288 69 316" className="loop-flow blue-flow" />
          <text x="128" y="402" className="loop-small blue-label">Körpervenen</text>
          <text x="128" y="242" className="loop-small blue-label">Hohlvenen</text>
        </g>

        <g className={shown(5)}>
          <circle cx="230" cy="119" r="9" fill="#126aa7" stroke="#fff" strokeWidth="2" />
        </g>
      </svg>
      <figcaption>
        {stage === 0
          ? "Überblick: rot vom Herzen weg, blau zum Herzen zurück."
          : stage < 5
            ? "Die Pfeile zeigen den Weg des Blutes."
            : "Linke Herzkammer → Körper → rechter Vorhof."}
      </figcaption>
    </figure>
  );
}
