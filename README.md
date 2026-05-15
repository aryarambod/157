# 157

*Audiovisual performance work — 2026*

157 is a generative audiovisual instrument comprising 157 functions, three procedural entity classes, and forty-eight performable inputs. Built as a single executable score in p5.js, the work operates simultaneously as composition, instrument, and image  a system in which sound, portraiture, and code are inseparable dimensions of the same gesture.

At its core, the piece treats the human figure as unstable data. Procedurally generated portraits drift, fracture, and recombine in real time, modulated by an audio engine of layered oscillators, dub harmonics, and granular noise. Three depth presets *FIGURES*, *ARCHITECTURE*, *ORGANISMS*  invoke distinct wireframe ecologies that respond to amplitude rather than time, surfacing only when sound demands their presence. Nothing in the work is pre-rendered; every frame is computed at the moment of its appearance and lost the moment after.

The title refers to the number of functions that constitute the system. 

---

## Live

The piece runs in the browser: **[aryarambod.github.io/157](https://aryarambod.github.io/157)**

Click anywhere on the splash to enter (required by browsers before audio can start).

## Performance

| Input | Action |
|---|---|
| `0–9` | trigger dub notes / numeric toggles |
| `A–Z` | scene, audio, and visual toggles (48 in total) |
| `Shift + Q` | depth preset · FIGURES |
| `Shift + W` | depth preset · ARCHITECTURE |
| `Shift + E` | depth preset · ORGANISMS |
| `Shift + A` | visual-reactive audio engine |
| `// PERFORM` | hide all UI for clean performance view |
| `// FULLSCREEN` | toggle fullscreen |

## Technical

- p5.js 1.9.4 (WebGL + sound)
- 5 664 lines · 157 functions · 3 classes · 8 palettes
- audio: layered oscillators, brown noise, dub harmonics, granular delay
- visuals: procedural portraits, wireframe entities, depth field, mirror dimension
- optional: webcam input, MIDI input

## Run locally

```bash
git clone https://github.com/aryarambod/157.git
cd 157
python3 -m http.server 8000
# open http://localhost:8000
```

---

*Arya Rambod · 2026*
