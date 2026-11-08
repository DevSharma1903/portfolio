# Dev Sharma portfolio: design direction

## Phase 0: brief and assumptions

- Site: personal portfolio for Dev Sharma, a computer science and financial technology student at MIT Manipal.
- Real work already represented: an ESP32 rocket payload, a YouTube topic discovery project, investment analytics, city parking and traffic data, a local first notepad, and a college records portal.
- The recurring thread is turning varied, noisy inputs into software a person can use.
- Keep the entire site dark. Keep the user supplied Pngtree statue as a restrained, page wide Componentry ASCII texture. Do not add generated, stock, or project photography.
- Keep the existing hand built espresso machine illustration because the owner explicitly requested and approved it. Restyle it to the visual system and keep its extraction interaction quiet.
- The remote is `DevSharma1903/portfolio`. The production URL is not confirmed. The canonical base currently assumes `https://devsharma1903.github.io/portfolio/`; replace it if the site is published elsewhere.
- No project impact, awards, client claims, or performance metrics are invented. Project stories describe implemented outputs, and notes present design reasoning without implying measured outcomes.

## Phase 1: three concepts

### A. Signal to system (chosen)

Every page follows one signal from a real source to software people can use.

- Anchor: telemetry, video topics, financial scenarios, and city records are actual inputs in the listed projects.
- Layout rule: one fine copper signal path anchors the sections; project work is a set of distinct instruments along that path.
- Motion verb: resolve. Noise settles into a readable trace; cards fan out only when someone engages.
- Type voice: expressive grotesk display with small, sparing instrument labels.
- Palette source: dark instrument housing, warm phosphor text, and copper signal marks.
- Signature moment: particle lettering settles into Dev's name and responds only while a pointer is near it.
- Screenshot: a large name, a single traced line, and the portfolio's real areas of work.
- Portability: low. The specific mix of telemetry, video, finance, and city data is the point.
- Scores: originality 4, fit 5, feasibility 5, portability 2.

### B. Flight envelope

The whole portfolio is a rocket payload readout, with every project plotted as a flight event.

- Anchor: thrustMIT's ESP32 rocket payload.
- Layout rule: a vertical mission timeline.
- Motion verb: launch and coast.
- Type voice: condensed display with avionics labels.
- Palette source: night sky and signal amber.
- Signature moment: a payload trace lifts through the portfolio.
- Screenshot: a full height flight plot.
- Portability: medium. It fits one project far better than the rest.
- Scores: originality 4, fit 3, feasibility 4, portability 3.

### C. Field notes from Manipal

The site reads like a student's working notebook, with projects filed as annotated observations.

- Anchor: studying at MIT Manipal and learning by building.
- Layout rule: an open field journal with offset notes.
- Motion verb: mark and fold.
- Type voice: book typography with a small handwritten annotation.
- Palette source: dark paper and chalk.
- Signature moment: notes draw themselves beside a project.
- Screenshot: a spread of project notes.
- Portability: high. This can fit almost any student portfolio.
- Scores: originality 3, fit 4, feasibility 5, portability 4.

Choose A. It gives the site one visual rule that fits all six projects without pretending they are all aerospace work. Keep one small field note detail from C only where it improves clarity.

## Phase 2: art direction

### Color roles

- Ground: `#0B0D0D`, instrument charcoal.
- Surface: `#121615`, dark anodized panel.
- Ink: `#F0EEE7`, warm phosphor.
- Muted: `#AAAFA8`, cool grey green, used for body copy.
- Line: `#2A302D`, low contrast structure.
- Accent and curtain: `#D58B5D`, oxidized copper, reserved for active signal and primary actions.

Keep the supplied ASCII canvas at 5.5% opacity on desktop and 2.5% on narrow screens. It is texture behind the surface, not a readability layer. Use no colored glow or moving gradient.

### Typography

- Display and body: self hosted Switzer, with weight contrast and tight display tracking.
- Instrument labels: system monospace, limited to project discipline and small real metadata.
- Display: responsive, 0.88 to 0.98 line height, measured against its container.
- Reading text: 16 to 18 px, 50 to 68 characters wide.
- UI labels: 12 to 14 px, sentence case by default.

### Grid and rhythm

- Desktop: 12 column grid, 40 to 64 px outer gutter, centered at 1240 px.
- Mobile: 4 columns, 18 px outer gutter, art and cards re-composed for touch.
- Four spacing moods: 8 px detail, 20 px control, 48 px section, 112 px chapter.
- Alternate a large statement, asymmetrical two column feature, and project list. Avoid repeating the same card grid on every route.
- Radius rule: 4 px for controls, 12 px for instrument panels, no pill shaped card containers.

### Motion and interaction

- Native cursor stays visible.
- One signature interaction: the particle name disperses and settles under the pointer. It starts in a clear static state, sleeps at rest, pauses off screen, and becomes plain text under reduced motion.
- The orbit stack fans only in response to hover, focus, or a tap. Each project has a real external link.
- The Componentry fisheye field stays on the work index only; the semantic project list below it remains complete and usable without WebGL.
- Scroll is eased by Lenis on the GSAP ticker. All scroll reveal contexts are cleaned up on route changes. Reduced motion uses native scroll and no scroll reveals.
- Page transitions use a short signal wipe with a drawn waveform, not a loader. No persistent clock, eye tracking, ambient gradient, or side scrolling copy.
- One low contrast signal point travels along the home waveform every nine seconds. It carries the system motif and stops under reduced motion. No other animation runs continuously at rest.
- The name resolves once, the card stack responds to people, and the project sequence changes only when selected.
- The espresso illustration remains an explicit play action and does not animate until activated.

### Composition and content

- Home order: statement, areas of work, selected work, working approach, contact.
- About: a portrait free biography, work interests, and a clear link to the work list.
- Work: a dramatic interactive field, a semantic index with direct story links, then a selectable signal-to-decision story with explicit built outputs for three source-verified projects.
- Skills: grouped capabilities, displayed as an orderly index instead of generic skill chips.
- Writing: three concise field notes on telemetry context, forecast uncertainty, and audience evidence.
- Contact: direct email and real social links. No simulated newsletter service.
- Footer: one direct invitation and a small identity line.
- 404: a single broken signal and an obvious way home.

### Genericness check

This is not a generic dark developer template. The component arrangement and copy follow the real mix of inputs in Dev's projects. The signal path links the particle name, section dividers, project field, transition, and footer. No stock project imagery, fake stats, or invented testimonials are used.

## Phase 3: implementation

- Existing Vite and React stack, retained.
- Existing Componentry ASCII image, particle typography, orbit card stack, and fisheye grid, tuned to the site. The project stories turn real source data into an input → reading → next-step sequence; they make no unverified impact claims.
- Existing GSAP and Lenis dependencies, used with one ticker and route scoped cleanup.
- No new runtime dependencies and no generated image assets.

## Phase 4: review

Run the production build, static audit, and Awwwards visual shoot against every route. Review desktop, mobile, reduced motion, keyboard focus, hover pairs, page transitions, and report metrics. Record findings and a self score in the handoff if no independent critic can be launched.
