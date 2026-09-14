# Herzwerkstatt – Der Körperkreislauf

Interaktive Lernwebsite für eine Unterrichtsstunde von etwa 60 Minuten. Die Schülerinnen und Schüler wählen zwischen einem Basisweg mit vielen Hilfen und einer kniffligen Version mit zusätzlichen Fachbegriffen, Begründungen, Fallbeispielen und Rechenaufgaben.

## Inhalte

- Herz als Pumpe und Füllfunktion
- Körperkreislauf ohne Lungenkreislauf
- Arterien, Venen, Aorta, Hohlvene und Kapillaren
- interaktive Herzanimation
- Blutweg- und Zuordnungsspiele
- Pulsaufgabe und Transferaufgaben
- Abschlussreflexion zur Fehlvorstellung „Das Herz filtert Blut“

## Website

[Herzwerkstatt öffnen](https://danielzab88-eng.github.io/bodenlabor/herzwerkstatt/)

Der QR-Code für den Unterricht befindet sich in [`QR-Code-Herzwerkstatt.png`](QR-Code-Herzwerkstatt.png).

## Entwicklung

```bash
pnpm install
pnpm exec vite --config pages/vite.config.ts
```

Bei Änderungen auf `main` veröffentlicht GitHub Actions die Seite automatisch über GitHub Pages.
