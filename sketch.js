// Merged from sketch.js and subzero_extensions.js
// Duplicate declarations removed so the file stays valid in p5.js.

/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║   SUB-ZERO // MERCURY-DUB ENGINE  v3.1  (UNIFIED + UnC EXTENSIONS)  ║
 * ║   Experimental Audio-Visual Ritual & Hallucination Engine                ║
 * ║                                                                          ║
 * ║  ─── KEYBOARD MAP ────────────────────────────────────────────────────  ║
 * ║  [0-9]  — Sub-bass dub notes (deep MIDI frequencies)                    ║
 * ║  [Q]    — Toggle cold poetry rain                                        ║
 * ║  [W]    — Toggle blood poetry overlay                                    ║
 * ║  [E]    — Toggle echo/delay feedback loop                                ║
 * ║  [R]    — Regenerate all portraits                                       ║
 * ║  [T]    — Toggle time-warp mode (slow motion portraits)                  ║
 * ║  [A]    — Toggle ambient drone (brown noise layer)                       ║
 * ║  [S]    — Trigger screen shake / seismic event                           ║
 * ║  [D]    — Toggle depth-fog visual mode                                   ║
 * ║  [F]    — Freeze all portrait rotations                                  ║
 * ║  [G]    — Toggle glitch-mode (chromatic aberration storm)                ║
 * ║  [H]    — Toggle HUD visibility                                          ║
 * ║  [Z]    — Purge all portraits from space                                 ║
 * ║  [X]    — Explode portraits outward                                      ║
 * ║  [C]    — Collapse all portraits to centre                               ║
 * ║  [V]    — Reverse gravity on portraits                                   ║
 * ║  [B]    — Toggle blood-particle burst mode                               ║
 * ║  [N]    — Generate new blood poetry line                                 ║
 * ║  [M]    — Toggle mercury mirror mode                                     ║
 * ║  [2]    — Toggle MIRROR DIMENSION (negative-space inversion)             ║
 * ║  [3]    — Toggle LIQUID MERCURY SKIN (drip + pool + evaporate)           ║
 * ║  [4]    — CLICK-TO-ADD BG OBJ mode (place folder-1 models on click)      ║
 * ║  [P]    — Pause / resume audio engine                                    ║
 * ║  [I]    — Spawn 5 additional portraits                                   ║
 * ║  [O]    — Obliterate (remove) one portrait                               ║
 * ║  [L]    — Toggle low-frequency oscillator visualiser                     ║
 * ║  [K]    — Kick-drum impulse (audio + visual)                             ║
 * ║  [J]    — Jitter all portraits (random chaos burst)                      ║
 * ║  [U]    — Toggle UV / ultraviolet colour shift                           ║
 * ║  [8]    — Toggle background cube + GLB model mix                          ║
 * ║  [*]    — Crazy randomised background spawn (Shift+8)                     ║
 * ║  [)]    — Toggle arp mode (moved from *)                                  ║
 * ║  [↑↓←→] — Shift camera angle                                            ║
 * ║  [SPACE] — Momentary full white flash + sub-bass hit                     ║
 * ║  [ENTER] — Cycle through visual palette presets                          ║
 * ║  [ESC]  — Reset everything to initial state                              ║
 * ║                                                                          ║
 * ║  ─── UnC EXTENSIONS ──────────────────────────────────────────────  ║
 * ║  [,]    — Toggle FLESH_MEMORY (ghost imprints of portrait positions)     ║
 * ║  [.]    — Toggle CORPUS_DISSOLVE (portraits shed falling pixel-soup)     ║
 * ║  [/]    — Toggle ENTITIES (autonomous crawlers that hunt portraits)       ║
 * ║  [;]    — Toggle MEMBRANE_TENDONS (elastic sinew between portraits)      ║
 * ║  [']    — Toggle DEAD_CHANNEL (VHS static + fake TV switching)           ║
 * ║  [\]    — PANIC_MODE (everything breaks simultaneously)                  ║
 * ║  [=]    — Toggle SIGIL_MODE (mutating occult glyphs)                     ║
 * ║  [-]    — Toggle BINAURAL_DRONE (detuned twin oscillator beat)           ║
 * ║  [`]    — Toggle SUBLIMINAL (single-frame hidden text injection)         ║
 * ║  [§]    — Toggle portrait style: plastic ↔ wireframe/lines                ║
 * ║  [<]    — Mix portrait styles (random plastic + wireframe per portrait)    ║
 * ║  [¨]    — Cycle background object colour (single colour)                  ║
 * ║  [$]    — Background objects go multi-colour                               ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

// ─── ASSET CONFIG ─────────────────────────────────────────────────────────────
// Original portrait models — loaded in preload, used for foreground portraits
const modelFiles = [
  '09_03_2026 10.obj', '09_03_2026 11.obj', '09_03_2026 2.obj',
  '09_03_2026 3.obj',  '09_03_2026 4.obj',  '09_03_2026 5.obj',
  '09_03_2026 6.obj',  '09_03_2026 7.obj',  '09_03_2026 8.obj',
  '09_03_2026 9.obj',  '09_03_2026.obj',    '15_03_2026 2.obj',
  '15_03_2026.obj',    '2nd F Office Space 2.obj'
];

// Background models from assets/1/ — loaded lazily only when bgMix is triggered
const bgModelFiles = [
  'assets/1/19_11_2025/19_11_2025.obj',
  'assets/1/29_03_2026/29_03_2026.obj',
  'assets/1/Butterfly tree/Butterfly tree.obj',
  'assets/1/Cactus in bloom/Cactus in bloom.obj',
  'assets/1/satellite dish/satellite dish.obj',
];
let bgModels = [];         // populated lazily on first bgMix spawn
let bgModelsLoaded = false;

const glbFiles = [];
let glbModels = [];

// ─── POEM / LANGUAGE DATA ────────────────────────────────────────────────────
const poemLines = [
  "انجمادِ مطلق در جمجمه",    "Absolute Zero in the Skull",
  "Chainهای نقره‌ای",           "History neck",
  "Logic: flight of wingless fish", "Zero degree / Void King",
  "Sub-zero شقایق",             "Concrete garden",
  "Binary cry / Pixel tears",  "Universe reversed",
  "خون در سیلیکون",             "Mercury bleeds upward",
  "جمجمه‌ای از آینه",           "Skull of mirrors",
  "هیچ‌کجا همین‌جاست",          "Nowhere is exactly here",
  "سکوت فرکانس دارد",           "Silence has a frequency",
  "ماشین آرزو می‌کند",           "The machine wishes",
  "یخ‌بندان صدا",               "Sound-frost / Voice permafrost",
  "سیگنال از استخوان می‌آید",   "Signal from the bone",
  "زبان صفر و یک",              "Language of zero and one",
  "جسم به داده تبدیل شد",       "Body became data",
  "STATIC_DREAM / NULL_PRAYER", "Echo without origin",
  "ردپای فرکانس",               "Frequency footprint",
  "آینه‌ای که نور نمی‌دهد",      "Mirror that gives no light",
  "The drone remembers",        "Oscillation of the forgotten",
  "لرزش در ریشه",               "Tremor at the root",
  "VOID_CHORUS / DEAD_SIGNAL",  "Resonance of absent bodies",
  "یخ بر تار صوت",              "Ice on the vocal cord",
  "MERCURY_PRAYER",             "Null cathedral"
];

const subjects = [
  "MY_THROAT", "THE_VOID", "FLESH", "LOGIC", "HISTORY",
  "THE_SIGNAL", "MERCURY", "THE_SKULL", "NULL_BODY", "BINARY_SOUL",
  "THE_DRONE", "STATIC_GOD", "VOID_MOUTH", "DEAD_SIGNAL", "CHROME_BONE",
  "THE_FREQUENCY", "FROZEN_NERVE", "ABSENCE", "THE_MACHINE", "HOLLOW_FREQUENCY"
];
const verbs = [
  "IS_LEAKING", "VIBRATES_WITH", "ROTS_IN", "SCREAMS_FOR",
  "CONSUMES", "FREEZES_INTO", "DISSOLVES", "ECHOES_THROUGH", "BLEEDS_ON",
  "PRAYS_TO", "REMEMBERS", "DESTROYS", "TRANSMITS", "ABSORBS",
  "RECONSTRUCTS", "AMPLIFIES", "KILLS", "BREATHES_THROUGH", "DREAMS_OF",
  "OSCILLATES_IN", "CORRUPTS", "WORSHIPS"
];
const objects = [
  "BLOOD", "SOPRANO_VOID", "MUMBLE_GHOSTS", "GASOLINE",
  "SILENCE", "STATIC_SNOW", "DUB_METAL", "CHROME_TEARS", "SUB_BASS",
  "THE_ARCHIVE", "DEAD_FREQUENCIES", "BONE_SIGNAL", "MERCURY_RAIN",
  "THE_NULL", "VOID_CATHEDRAL", "FOSSIL_STATIC", "IRON_PRAYER",
  "FROZEN_LOGIC", "ABSENT_BODIES", "RESONANT_NOTHING"
];

// ─── PALETTE PRESETS ─────────────────────────────────────────────────────────
const PALETTES = [
  { name: "MERCURY",      bg: [15,  15,  18 ], pt1: [200, 200, 220], pt2: [140, 0,   0  ], text: [192, 192, 210], glitch: [255, 0,   0  ] },
  { name: "ACID_VOID",    bg: [5,   18,  5  ], pt1: [0,   255, 80 ], pt2: [255, 200, 0  ], text: [0,   240, 80 ], glitch: [255, 255, 0  ] },
  { name: "UV_RITUAL",    bg: [10,  0,   20 ], pt1: [180, 0,   255], pt2: [0,   200, 255], text: [200, 100, 255], glitch: [0,   255, 255] },
  { name: "BONE_WHITE",   bg: [230, 225, 220], pt1: [80,  60,  50 ], pt2: [200, 50,  0  ], text: [60,  40,  30 ], glitch: [200, 0,   0  ] },
  { name: "RUST_IRON",    bg: [20,  10,  5  ], pt1: [180, 80,  20 ], pt2: [255, 60,  0  ], text: [200, 120, 40 ], glitch: [255, 120, 0  ] },
  { name: "VOID_BLUE",    bg: [0,   5,   20 ], pt1: [40,  80,  255], pt2: [0,   200, 180], text: [80,  140, 255], glitch: [0,   220, 255] },
  { name: "OBSIDIAN",     bg: [8,   8,   8  ], pt1: [255, 255, 255], pt2: [200, 0,   80 ], text: [200, 200, 200], glitch: [255, 50,  100] },
  { name: "BLOOD_GOLD",   bg: [25,  8,   0  ], pt1: [255, 180, 0  ], pt2: [200, 0,   0  ], text: [255, 200, 80 ], glitch: [255, 60,  0  ] },
];
let paletteIndex = 0;

// Background mix object colour palettes (cycled with § key)
const BG_MIX_COLORS = [
  { name: 'COLD',    stroke: [120, 180, 255] },
  { name: 'BLOOD',   stroke: [220,  40,  60] },
  { name: 'ACID',    stroke: [ 80, 255, 100] },
  { name: 'GOLD',    stroke: [255, 200,  40] },
  { name: 'UV',      stroke: [180,  60, 255] },
  { name: 'WHITE',   stroke: [220, 220, 220] },
  { name: 'MERCURY', stroke: [180, 200, 210] },
];

// ─── GLOBAL STATE ─────────────────────────────────────────────────────────────
let models       = [];
let portraits    = [];
let particles    = [];
let floatingPoem = [];
let dragPortrait = null;
let trailPoints  = [];
let waveHistory  = [];
let beatHistory  = [];
let noteHistory  = [];

// ── Original Visual Flags ─────────────────────────────────────────────────────
let soundStarted  = false;
let showPoem      = false;
let showBloodText = false;
let glitchMode    = false;
let depthFog      = false;
let frozenRot     = false;
let timeWarp      = false;
let reverseGrav   = false;
let bloodBurst    = false;
let mirrorMode    = false;
let uvMode        = false;
let showHUD       = true;
let showLFO       = false;
let audioPaused   = false;
let echoFeedback  = false;
let ambientOn     = true;
let showSoundPanel   = true;
let showOscilloscope = false;
let showSpectrogram  = false;
let showNoteHistory  = false;
let portraitTrails   = false;
let starField        = false;
let scanlines        = false;
let vignette         = true;
let autoChord        = false;
let arpMode          = false;
let showWaveformBg   = false;
let bgMixMode        = false;   // [8]     toggle background cube+GLB mix
let portraitStyle    = 0;       // [§]=plastic [<]=mix  [§again]=wireframe
let bgMixColorIdx    = 0;       // [¨]  cycle bg object single colour
let bgMixColorMode   = 'single';// 'single' | 'multi'  ([¨]=single, [$]=multi)
let bgMixCrazy       = false;
let bgMixObjects     = [];

// ── New feature flags ─────────────────────────────────────────────────────────
let mirrorDimension  = false;   // [2] negative-space scene inversion
let liquidMercury    = false;   // [3] dripping mercury skin on portraits
let bgClickMode      = false;   // [4] click to drop a bg-folder model at cursor

// Visual-Reactive Audio (Shift+A)
let visualReactiveAudio = false;
// Behaviour profile — randomised each time VRA is toggled on
let _vra = {
  freqBase:    40,    // base MIDI note driving subOsc
  freqRange:   24,    // semitone range above base
  filterMin:   80,    // lpf min Hz
  filterMax:   4000,  // lpf max Hz
  delayBase:   0.25,  // delay time base
  delayRange:  0.6,   // delay time random range
  noiseGain:   0.06,  // noise amplitude ceiling
  kickThresh:  0.6,   // particle-density threshold to fire kick
  lfoMult:     1.0,   // lfoRate multiplier
  operaOn:     true,  // whether opera osc is used
  rapOn:       false,
  chorusOn:    false,
  burstKey:    0,     // which DUB_NOTE index to burst on high activity
  chaosLevel:  0.5,   // 0=tame 1=wild — blended each profile
  lastBurst:   0,     // frame of last note burst
  burstCooldown: 40,  // frames between auto note bursts
  _pendingBurst:  0,  // frame number for deferred second hit
  _pendingOffset: 0,  // semitone offset for deferred hit
};

// Mercury drip state
let mercuryDrops     = [];      // { x, y, vx, vy, size, alpha, phase }
let mercuryPool      = [];      // { x, size, alpha } — puddles at floor
const MERCURY_FLOOR  = () => height / 2 - 18; // y-coord of floor in screen space

// ─── BG OBJECTS CONTROL PARAMS ───────────────────────────────────────────────
// All sliders in the BG panel read/write this object.
const BGP = {
  count:        8,      // how many objects to spawn
  scaleMin:     0.2,    // uniform scale lower bound
  scaleMax:     1.6,    // uniform scale upper bound
  alphaMin:     50,     // stroke alpha lower bound  (0–255)
  alphaMax:     130,    // stroke alpha upper bound
  rotSpeedMax:  0.006,  // max abs rotation speed per axis
  strokeWeight: 0.6,    // wireframe line weight
  depthMin:    -3200,   // z near  (negative = behind camera)
  depthMax:    -300,    // z far
  modelOnly:    false,  // if true, never spawn cubes
  cubeOnly:     false,  // if true, never spawn models
  // Per-model colour overrides (null = use global palette)
  modelColors: [null, null, null, null, null],
  // Global hue shift for single-color mode (0–360, hue-rotates the stroke)
  hueShift:     0,
  // Pulse: objects scale up/down with lfoPhase
  pulseAmt:     0.0,    // 0 = no pulse, 1 = strong
  // Drift: objects slowly drift on XY each frame
  driftAmt:     0.0,
};

// ── Extension Visual Flags ────────────────────────────────────────────────────
let fleshMemory    = false;
let corpusDissolve = false;
let membraneMode   = false;
let deadChannel    = false;
let panicMode      = false;
let sigilMode      = false;
let binauralDrone  = false;
let subliminalMode = false;
let entityMode     = false;
let breathingRoom  = false;
let wordVomitMode  = false;
let clockworkMode  = false;
let errorMode      = false;
let staticGodMode  = false;

// ── Numerical Values ──────────────────────────────────────────────────────────
let screenShake  = 0;
let cameraRotX   = 0;
let cameraRotY   = 0;
let flashAmt     = 0;
let bloodPoetry  = "SUB-ZERO // VOID KING";
let lfoPhase     = 0;
let masterVol    = 0.6;
let beatPhase    = 0;
let arpPhase     = 0;
let arpInterval  = null;
let globalTime   = 0;
let cameraPos = null;
let cameraMoveSpeed = 12;
let cameraZoomSpeed = 18;
let portraitScaleHistory = [];

// ── Extension Numerical State ─────────────────────────────────────────────────
let panicTimer       = 0;
let channelIndex     = 0;
let channelTimer     = 0;
let subliminalTimer  = 0;
let subliminalFrame  = false;
let binauralOscL, binauralOscR;
let binauralFreq     = 40;
let sigilSeed        = 42;
let sigilMutateTimer = 0;
let breathPhase      = 0;
let errorDialogs     = [];
let fleshImprints    = [];
let dissolvePixels   = [];
let entities         = [];
let tendons          = [];
let wordExplosions   = [];
let clockOrbitPhase  = 0;

// ── Starfield State ───────────────────────────────────────────────────────────
let stars = [];

// ─── SOUND PARAMETERS ────────────────────────────────────────────────────────
let SP = {
  oscWave: 'sine', oscDetune: 0, oscOctave: 0,
  subAttack: 0.04, subDecay: 0.9, subSustain: 0.0, subRelease: 0.3,
  lpfCutoff: 800, lpfRes: 1.0, hpfCutoff: 60, filterFollow: true,
  delayTime: 0.5, delayFeedback: 0.7, delayMix: 0.5,
  reverbSize: 3.0, reverbDamp: 0.5, reverbMix: 0.4,
  noiseType: 'brown', noiseAmp: 0.04,
  chorusDepth: 0.002, chorusRate: 0.8, chorusOn: false,
  distortAmt: 0, distortOn: false,
  bitDepth: 16, bitCrushOn: false,
  lfoRate: 0.3, lfoAmp: 80, lfoTarget: 'filter',
  kickPitch: 55, kickDecay: 0.3, kickAmp: 0.7, kickOn: true,
  operaWave: 'sine', operaAmp: 0.45,
  rapWave: 'square', rapAmp: 0.5, rapGateLen: 3,
  arpSpeed: 400, arpPattern: 'up', arpOctaves: 2,
  chordType: 'minor',
  compOn: true, compThresh: -12, compRatio: 4, compKnee: 6,
  compAttack: 0.003, compRelease: 0.25,
  masterVol: 0.6,
};

// ─── AUDIO NODES ─────────────────────────────────────────────────────────────
let subOsc, dubLFO, brownNoise, lpFilter, hpFilter, mainDelay, mainReverb;
let rapOsc, operaOsc, noiseOsc, kickOsc, delay2;
let lfoOsc, chorusOsc;
let compressor, analyser;

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const DUB_NOTES  = [32, 36, 41, 43, 48, 52, 55, 60, 65, 68];
const TRAIL_LEN  = 35;
const MAX_PARTICLES = 600;
const WAVE_BUF_LEN  = 256;

const CHORD_OFFSETS = {
  minor: [0,3,7], major: [0,4,7], dim: [0,3,6], sus4: [0,5,7],
  maj7: [0,4,7,11], min7: [0,3,7,10], dom7: [0,4,7,10],
};
const ARP_PATTERNS = {
  up:     (n) => n,
  down:   (n) => [...n].reverse(),
  updown: (n) => [...n, ...[...n].reverse().slice(1,-1)],
  random: (n) => n.map(() => random(n)),
};

// ─── EXTENSION CONSTANTS ──────────────────────────────────────────────────────
const SIGIL_STROKES = 18;
const SIGIL_WORDS = [
  "NULL_BODY","VOID_KING","MERCURY_PRAYER","SUB_ZERO",
  "DEAD_SIGNAL","STATIC_GOD","CHROME_BONE","FROZEN_NERVE",
  "HOLLOW_FREQ","ABSENT_MOUTH","BONE_SIGNAL","IRON_PRAYER"
];
const TV_CHANNELS = [
  { name:"CH_00 // VOID",       color:[20,20,20],   textColor:[200,200,200], noise:0.9  },
  { name:"CH_01 // BLOOD",      color:[80,0,0],     textColor:[255,60,60],   noise:0.4  },
  { name:"CH_02 // MERCURY",    color:[40,40,60],   textColor:[180,180,220], noise:0.2  },
  { name:"CH_03 // STATIC_GOD", color:[10,10,10],   textColor:[255,255,255], noise:1.0  },
  { name:"CH_04 // ACID",       color:[10,30,10],   textColor:[0,255,80],    noise:0.6  },
  { name:"CH_05 // ULTRAVIOLET",color:[20,0,40],    textColor:[200,80,255],  noise:0.3  },
  { name:"CH_06 // BONE",       color:[220,210,200],textColor:[60,40,30],    noise:0.15 },
  { name:"CH_07 // CORRUPTED",  color:[15,15,18],   textColor:[255,0,0],     noise:0.95 },
];
const SUBLIMINAL_PHRASES = [
  "YOU ARE ALREADY DEAD","THIS IS NOT REAL","THE MACHINE IS WATCHING",
  "NULL_BODY NULL_BODY NULL_BODY","FEED THE STATIC","خون خون خون",
  "MERCURY IN THE BLOOD","DO NOT LOOK AWAY","SIGNAL LOST",
  "EAT THE FREQUENCY","THE SKULL REMEMBERS","جسم ندارد",
  "YOU WERE NEVER HERE","VOID_CATHEDRAL_OPEN","OSCILLATE OR DIE",
];
const ERROR_MESSAGES = [
  ["FATAL: NULL_BODY_EXCEPTION",  "The body could not be located in memory.\nStack trace: MERCURY > VOID > NULL"],
  ["SIGNAL_LOSS: CH_DEAD",        "All frequencies have returned to silence.\nPress any bone to continue."],
  ["WARNING: SKULL_OVERFLOW",     "Too many memories allocated.\nFragmentation at 99.9%"],
  ["ERROR: SKIN_NOT_FOUND",       "The requested surface does not exist.\n0x000000FF: FLESH_PTR"],
  ["CRITICAL: VOID_RECURSION",    "Infinite loop detected in consciousness.\nTerminate? [Y/NEVER]"],
  ["BOOT_FAIL: STATIC_GOD_INIT",  "Cannot initialise deity subsystem.\nBIOS: MERCURY.BIOS v0.0.0"],
  ["MEMORY: ABSENT_BODY",         "Address 0x00DEAD00 is not responding.\nResonance check failed."],
  ["PANIC: FREQUENCY_INVERTED",   "All sound is now going in.\nOutput device: YOUR SKULL"],
];
const ENTITY_BEHAVIORS = ['hunt','flee','orbit','spiral'];
let entityBehavior = 'hunt';

// ─── UTILITY ─────────────────────────────────────────────────────────────────
function midiToFreq(m) { return 440 * Math.pow(2, (m - 69) / 12); }
function noteLabel(m)  { return ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'][m%12] + Math.floor(m/12-1); }
function clamp(v,lo,hi){ return Math.max(lo, Math.min(hi, v)); }
const MIDI_FREQS = DUB_NOTES.map(midiToFreq);

// ─── PRELOAD ─────────────────────────────────────────────────────────────────
function preload() {
  for (let f of modelFiles) models.push(loadModel('assets/' + f, true));
}

// ─── SETUP ───────────────────────────────────────────────────────────────────
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB, 255, 255, 255, 255);
  cameraPos = createVector(0, 0, 400);

  lpFilter = new p5.LowPass();
  hpFilter = new p5.HighPass();
  lpFilter.freq(SP.lpfCutoff);
  lpFilter.res(SP.lpfRes);
  hpFilter.freq(SP.hpfCutoff);
  lpFilter.connect(hpFilter);

  subOsc = new p5.Oscillator(SP.oscWave);
  subOsc.disconnect();
  subOsc.connect(lpFilter);

  dubLFO = new p5.Oscillator('sine');
  dubLFO.freq(SP.lfoRate);
  dubLFO.amp(SP.lfoAmp);

  lfoOsc = new p5.Oscillator('triangle');
  lfoOsc.freq(SP.lfoRate);
  lfoOsc.amp(0.0);

  noiseOsc = new p5.Noise(SP.noiseType);
  brownNoise = noiseOsc;
  brownNoise.disconnect();
  brownNoise.connect(lpFilter);

  mainDelay = new p5.Delay();
  mainDelay.process(lpFilter, SP.delayTime, SP.delayFeedback, 2300);

  operaOsc = new p5.Oscillator(SP.operaWave);
  delay2 = new p5.Delay();
  delay2.process(operaOsc, 0.12, 0.7, 1800);

  rapOsc   = new p5.Oscillator(SP.rapWave);
  kickOsc  = new p5.Oscillator('sine');
  chorusOsc = new p5.Oscillator('sine');
  chorusOsc.freq(SP.lfoRate);
  chorusOsc.amp(0.0);

  rapOsc.amp(0); operaOsc.amp(0); brownNoise.amp(0);
  kickOsc.amp(0); subOsc.amp(0); chorusOsc.amp(0);

  textFont('monospace');
  for (let i = 0; i < WAVE_BUF_LEN; i++) waveHistory.push(0);
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(-width*2, width*2), y: random(-height*2, height*2),
      z: random(100,3000), speed: random(0.5,3),
    });
  }

  generatePortraits(12);
  buildUI();
  buildSoundPanel();
  buildRecorderUI();
}

// ─── LAZY BACKGROUND MODEL LOADER ────────────────────────────────────────────
// Called only when the user first presses 8 — never blocks startup.
function _loadBgModelsLazy(onDone) {
  if (bgModelsLoaded) { onDone(); return; }
  bgModelsLoaded = true;
  if (bgModelFiles.length === 0) { onDone(); return; }
  let pending = bgModelFiles.length;
  function tryDone() { if (--pending <= 0) onDone(); }
  for (let f of bgModelFiles) {
    (function(path) {
      loadModel(path, true,
        function(m) { bgModels.push(m); tryDone(); },
        function()  { console.warn('Skipped bg model: ' + path); tryDone(); }
      );
    })(f);
  }
}

// ─── PORTRAIT CLASS ───────────────────────────────────────────────────────────
class Portrait {
  constructor(x, y, z, mdl) {
    this.pos        = createVector(x, y, z);
    this.targetPos  = this.pos.copy();
    this.displayPos = this.pos.copy();
    this.vel        = createVector(0,0,0);
    this.model      = mdl;
    this.rot        = random(TWO_PI);
    this.rotSpeed   = random(-0.008, 0.008);
    this.wobble     = random(100);
    this.wobbleAmp  = random(0.03, 0.09);
    this.dragging   = false;
    this.dragOffset = createVector(0,0,0);
    this.scale_     = random(0.7, 1.4);
    this.scaleX     = this.scale_;
    this.scaleY     = this.scale_;
    this.scaleZ     = this.scale_;
    this.hue        = random(360);
    this.trailBuf   = [];
    this.pulsePhase = random(TWO_PI);
    this.colorShift = random(1);
    this.emitting   = false;
    this.emitTimer  = 0;
    this.wireframe  = false; // set true in mix mode
  }
  triggerNote(intensity) { this.emitting = true; this.emitTimer = intensity * 30; }
  update(reverseGrav, baseSpeed) {
    if (reverseGrav && !this.dragging) {
      this.vel.y -= 0.04;
      this.displayPos.add(this.vel);
      if (this.displayPos.y < -height/2-100) { this.displayPos.y = height/2+100; this.vel.y = 0; }
    } else {
      this.displayPos.lerp(this.targetPos, 0.08);
    }
    if (this.dragging) {
      let mV = createVector(mouseX - width/2, mouseY - height/2);
      this.targetPos.lerp(p5.Vector.add(mV, this.dragOffset), 0.15);
      screenShake = map(dist(this.pos.x, this.pos.y, this.targetPos.x, this.targetPos.y), 0,500,0,12);
      if (bloodBurst && frameCount%2===0) _spawnParticles(this.displayPos.x, this.displayPos.y, 0, 3, 'blood');
    }
    if (portraitTrails) {
      this.trailBuf.push(this.displayPos.copy());
      if (this.trailBuf.length > 20) this.trailBuf.shift();
    } else { this.trailBuf = []; }
    if (this.emitTimer > 0) this.emitTimer--;
    else this.emitting = false;
  }
  draw(frozen, gMode, mMode, pal, rotSpeed) {
    let d       = dist(this.pos.x, this.pos.y, this.targetPos.x, this.targetPos.y);
    let stretch = map(d, 0, 600, 1, 5);
    let breathe = 1 + sin(frameCount*0.05 + this.wobble) * this.wobbleAmp;
    if (!frozen) this.rot += (this.rotSpeed + rotSpeed);

    if (portraitTrails && this.trailBuf.length > 1) {
      noFill();
      for (let i = 1; i < this.trailBuf.length; i++) {
        let a = map(i, 0, this.trailBuf.length, 0, 80);
        stroke(pal.pt1[0], pal.pt1[1], pal.pt1[2], a);
        strokeWeight(map(i, 0, this.trailBuf.length, 0.2, 1.5));
        let p0 = this.trailBuf[i-1], p1 = this.trailBuf[i];
        line(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
      }
      noStroke();
    }
    push();
    translate(this.displayPos.x, this.displayPos.y, this.displayPos.z);
    if (this.emitting) {
      let glow = map(this.emitTimer, 0, 30, 0, 100);
      push(); noFill(); strokeWeight(2);
      stroke(pal.glitch[0], pal.glitch[1], pal.glitch[2], glow);
      sphere(60 * this.scale_ * breathe * (1 + map(this.emitTimer,0,30,0,0.4)));
      pop();
    }
    if (gMode && this.dragging) {
      push(); translate(6,0,-8);
      ambientMaterial(pal.glitch[0], pal.glitch[1], pal.glitch[2]);
      scale(this.scaleX * breathe, this.scaleY * stretch * breathe, this.scaleZ);
      rotateY(this.rot); rotateX(PI);
      if (this.model) model(this.model);
      pop();
    }
    scale(this.scaleX * breathe, this.scaleY * (d>5 ? stretch*breathe : breathe), this.scaleZ);
    if (d>5) rotateZ(d*0.004);
    rotateY(this.rot); rotateX(PI);
    const isWire = (portraitStyle === 1) || (portraitStyle === 2 && this.wireframe);
    if (isWire) {
      // ── Wireframe / lines style ──
      noFill();
      stroke(pal.pt1[0], pal.pt1[1], pal.pt1[2], 200);
      strokeWeight(0.8);
    } else {
      // ── Plastic / specular style (original) ──
      noStroke();
      specularMaterial(100); shininess(24);
    }
    if (this.model) model(this.model);
    noStroke();
    pop();
  }
  saveScaleState() {
    return { x: this.scaleX, y: this.scaleY, z: this.scaleZ };
  }
  restoreScaleState(state) {
    if (!state) return;
    this.scaleX = state.x;
    this.scaleY = state.y;
    this.scaleZ = state.z;
  }
  randomizeScale() {
    const base = this.scale_;
    const randomFactor = () => {
      const r = random();
      if (r < 0.15) return random(3.2, 7.8);
      if (r < 0.45) return random(1.5, 3.2);
      return random(0.2, 1.6);
    };
    this.scaleX = base * randomFactor();
    this.scaleY = base * randomFactor();
    this.scaleZ = base * randomFactor();
  }
  drawGhost(pal) {
    push();
    translate(this.displayPos.x, this.displayPos.y, this.displayPos.z);
    rotateY(this.rot); rotateX(PI);
    let s = this.scale_ * 0.95;
    scale(s,s,s);
    ambientMaterial(pal.pt1[0], pal.pt1[1], pal.pt1[2]);
    noStroke();
    if (this.model) model(this.model);
    pop();
  }
}

// ─── PARTICLE CLASS ───────────────────────────────────────────────────────────
class Particle {
  constructor(x, y, z, type, pal) {
    this.pos  = createVector(x, y, z);
    this.vel  = p5.Vector.random3D().mult(random(2,10));
    this.type = type; this.pal = pal;
    this.life = 255; this.size = random(2,7);
    this.spin = random(-0.1,0.1); this.ang = random(TWO_PI);
    this.shape = random(['sphere','box','box']);
  }
  update(rev) {
    this.vel.y += rev ? -0.15 : 0.12;
    this.vel.mult(0.98); this.pos.add(this.vel);
    this.life -= random(3,7); this.ang += this.spin;
  }
  display(pal) {
    push(); translate(this.pos.x, this.pos.y, this.pos.z);
    rotateZ(this.ang); rotateY(this.ang*0.6); noStroke();
    let sz = this.size * (this.life/255);
    if      (this.type==='blood') fill(pal.glitch[0], pal.glitch[1], pal.glitch[2], this.life);
    else if (this.type==='spark') fill(255,220,80,this.life);
    else                          fill(pal.pt1[0], pal.pt1[1], pal.pt1[2], this.life);
    if      (this.shape==='sphere') sphere(sz);
    else if (this.shape==='box')    box(sz*1.4,sz*1.4,sz*1.4);
    else                            torus(sz, sz*0.3);
    pop();
  }
  isDead() { return this.life <= 0; }
}

// ─── ENTITY CLASS ─────────────────────────────────────────────────────────────
class Entity {
  constructor() {
    this.pos      = createVector(random(-width/2,width/2), random(-height/2,height/2), random(-100,100));
    this.vel      = p5.Vector.random3D().mult(random(1.5,4));
    this.target   = null;
    this.size     = random(6,18);
    this.phase    = random(TWO_PI);
    this.rot      = random(TWO_PI);
    this.rotSpd   = random(-0.05,0.05);
    this.lifetime = random(400,1200);
    this.age      = 0;
    this.limbs    = floor(random(3,9));
    this.hunger   = 1.0;
    this.color    = [random(150,255), random(0,80), random(0,80)];
    this.trail    = [];
    this.hasEaten = false;
  }
  update() {
    this.age++; this.rot += this.rotSpd;
    this.hunger = min(1.0, this.hunger + 0.001);
    this.phase += 0.04;
    let nearest = null, minD = Infinity;
    for (let p of portraits) {
      let d = dist(this.pos.x, this.pos.y, p.displayPos.x, p.displayPos.y);
      if (d < minD) { minD = d; nearest = p; }
    }
    this.target = nearest;
    if (nearest) {
      let dir = p5.Vector.sub(nearest.displayPos, this.pos).normalize();
      switch (entityBehavior) {
        case 'hunt':
          this.vel.lerp(dir.mult(3.5), 0.08);
          if (minD < 50) {
            this.hasEaten = true; this.hunger = 0;
            nearest.targetPos.x += random(-200,200);
            nearest.targetPos.y += random(-200,200);
            _spawnParticles(nearest.displayPos.x, nearest.displayPos.y, 0, 8, 'blood');
            screenShake = max(screenShake, 6);
          }
          break;
        case 'flee':
          this.vel.lerp(dir.mult(-3), 0.06);
          break;
        case 'orbit':
          let perp = createVector(-dir.y, dir.x).mult(3);
          this.vel.lerp(perp, 0.07);
          this.vel.add(p5.Vector.mult(dir, (minD-150)*0.01));
          break;
        case 'spiral':
          let ang = frameCount*0.03 + this.phase;
          let st = createVector(
            nearest.displayPos.x + cos(ang)*(100+sin(this.phase)*80),
            nearest.displayPos.y + sin(ang)*(100+cos(this.phase)*80)
          );
          this.vel.lerp(p5.Vector.sub(st, this.pos).normalize().mult(4), 0.09);
          break;
      }
    }
    this.vel.limit(5);
    this.pos.add(this.vel);
    if (this.pos.x >  width/2+50) this.pos.x = -width/2;
    if (this.pos.x < -width/2-50) this.pos.x =  width/2;
    if (this.pos.y >  height/2+50) this.pos.y = -height/2;
    if (this.pos.y < -height/2-50) this.pos.y =  height/2;
    this.trail.push(this.pos.copy());
    if (this.trail.length > 25) this.trail.shift();
  }
  draw(pal) {
    push();
    noFill();
    for (let i = 1; i < this.trail.length; i++) {
      let a = map(i, 0, this.trail.length, 0, 120) * this.hunger;
      stroke(this.color[0], this.color[1], this.color[2], a);
      strokeWeight(map(i, 0, this.trail.length, 0.3, 2));
      line(this.trail[i-1].x, this.trail[i-1].y, this.trail[i-1].z,
           this.trail[i].x,   this.trail[i].y,   this.trail[i].z);
    }
    noStroke();
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateY(this.rot); rotateZ(this.phase*0.3);
    let pulse = 1 + sin(this.phase*2)*0.25*this.hunger;
    let bs    = this.size * pulse;
    fill(this.color[0], this.color[1], this.color[2], 200*(this.hunger*0.5+0.5));
    torus(bs, bs*0.3);
    stroke(this.color[0], this.color[1], this.color[2], 160);
    strokeWeight(1.2);
    for (let l = 0; l < this.limbs; l++) {
      let la = (l/this.limbs)*TWO_PI + this.phase;
      let ll = bs*(1.5 + sin(this.phase*3+l)*0.6);
      push(); rotateZ(la);
      line(0,0,0, ll,0,0);
      noStroke(); fill(255,60,0,180);
      translate(ll,0,0); sphere(bs*0.18);
      pop();
    }
    if (entityBehavior==='hunt' && this.hunger>0.5) {
      push(); translate(0,-bs*0.4,bs*0.5);
      fill(255,255,255,220); sphere(bs*0.22);
      fill(0,0,0,255); translate(0,0,bs*0.15); sphere(bs*0.12);
      fill(pal.glitch[0],pal.glitch[1],pal.glitch[2],200);
      translate(0,0,bs*0.06); sphere(bs*0.06);
      pop();
    }
    pop();
  }
  isDead() { return this.age > this.lifetime; }
}

// ─── HELPER: bulk spawn particles ────────────────────────────────────────────
function _spawnParticles(x, y, z, count, type) {
  let pal = PALETTES[paletteIndex];
  if (particles.length > MAX_PARTICLES) return;
  for (let i = 0; i < count; i++) particles.push(new Particle(x,y,z,type,pal));
}

// ─── CACHED OVERLAY BUFFERS ──────────────────────────────────────────────────
let _vignetteBuf = null, _vignettePalIdx = -1, _vignetteW = 0, _vignetteH = 0;
let _scanlineBuf = null, _scanlineH = 0;

function _rebuildVignetteBuf(pal) {
  _vignetteBuf = createGraphics(width, height);
  _vignetteBuf.noStroke();
  for (let i = 0; i < 8; i++) {
    _vignetteBuf.fill(pal.bg[0], pal.bg[1], pal.bg[2], map(i, 0, 8, 0, 60));
    let margin = map(i, 0, 8, 0, min(width, height) * 0.35);
    _vignetteBuf.rect(margin, margin, width - margin * 2, height - margin * 2);
  }
  _vignettePalIdx = paletteIndex;
  _vignetteW = width; _vignetteH = height;
}

function _rebuildScanlineBuf() {
  _scanlineBuf = createGraphics(width, height);
  _scanlineBuf.noStroke();
  _scanlineBuf.fill(0, 0, 0, 18);
  for (let y = 0; y < height; y += 4) _scanlineBuf.rect(0, y, width, 2);
  _scanlineH = height;
}

// ─── DRAW LOOP ────────────────────────────────────────────────────────────────
function draw() {
  let pal = PALETTES[paletteIndex];
  globalTime++;
  lfoPhase += 0.02;

  // Breathing room (scale before everything)
  applyBreathingRoom();

  if (screenShake > 0.2) {
    translate(random(-screenShake,screenShake), random(-screenShake,screenShake));
    screenShake *= 0.88;
  } else { screenShake = 0; }

  push(); resetMatrix(); noStroke();
  let bgAlpha = glitchMode ? 18 : (depthFog ? 50 : 30);
  fill(pal.bg[0], pal.bg[1], pal.bg[2], bgAlpha);
  rect(-width/2, -height/2, width, height);
  if (showWaveformBg) drawWaveformBackground(pal);
  if (uvMode) { fill(60,0,120,15); rect(-width/2,-height/2,width,height); }
  if (scanlines) drawScanlines(pal);
  if (vignette) drawVignette(pal);
  if (flashAmt > 0) {
    fill(255,255,255,flashAmt); rect(-width/2,-height/2,width,height);
    flashAmt = max(0, flashAmt-12);
  }
  // Mirror dimension: wash the background with inverted palette colours
  if (mirrorDimension) {
    fill(255-pal.bg[0], 255-pal.bg[1], 255-pal.bg[2], 60);
    rect(-width/2, -height/2, width, height);
  }
  pop();

  // ── MIRROR DIMENSION: invert the entire 3D scene ──────────────────────────
  if (mirrorDimension) {
    push();
    // flip geometry on all three axes — creates true negative-space inversion
    scale(-1, -1, -1);
    // Desaturate by overlaying a dim complementary colour wash
    ambientLight(30, 0, 40);
  }

  clearDepth();
  updateCameraMovement();
  if (cameraPos) translate(-cameraPos.x, -cameraPos.y, -cameraPos.z);
  rotateX(cameraRotX);
  rotateY(cameraRotY);
  if (starField) drawStarField(pal);
  if (bgMixMode) drawBgMix(pal);

  ambientLight(uvMode ? 80 : 40);
  pointLight(pal.pt1[0], pal.pt1[1], pal.pt1[2],  200,-200, 400);
  pointLight(pal.pt2[0], pal.pt2[1], pal.pt2[2], -200, 200, 200);
  if (dragPortrait) pointLight(255,60,0, mouseX-width/2, mouseY-height/2, 300);
  let lp = abs(sin(lfoPhase));
  pointLight(pal.pt2[0]*lp, pal.pt2[1]*lp, pal.pt2[2]*lp, cos(lfoPhase*2)*300, sin(lfoPhase)*200, 200);

  if (glitchMode && random()>0.7) drawGlitchBars(pal);
  drawMercuryTrail(pal);

  // Flesh memory ghosts (drawn before live portraits for layering)
  updateFleshMemory(pal);

  for (let i = particles.length-1; i >= 0; i--) {
    particles[i].update(reverseGrav); particles[i].display(pal);
    if (particles[i].isDead()) particles.splice(i,1);
  }

  // Clockwork override before portrait draw
  updateClockworkOrbits();

  let speed = timeWarp ? 0.002 : 0.01;
  // ── PORTRAIT LOD ──────────────────────────────────────────────────────────────
  //  - update() always runs (cheap)
  //  - past 12 portraits, distant ones redraw mesh every other frame
  //  - mirror-ghost overlay capped at first 10
  const LOD_OVERLAY_CAP = 10;
  const LOD_MESH_CAP    = 12;
  for (let i = 0; i < portraits.length; i++) {
    const p = portraits[i];
    p.update(reverseGrav, speed);
    if (staticGodMode) { drawStaticGodPortrait(p, pal); continue; }
    // Skip half the distant portraits' mesh draws each frame past LOD_MESH_CAP
    if (i >= LOD_MESH_CAP && ((frameCount + i) & 1)) continue;
    p.draw(frozenRot, glitchMode, mirrorMode, pal, speed);
  }

  if (mirrorMode) {
    push(); scale(-1,1,1); ambientLight(20);
    const ghostCount = min(portraits.length, LOD_OVERLAY_CAP);
    for (let i = 0; i < ghostCount; i++) portraits[i].drawGhost(pal);
    pop();
  }

  // ── DEPTH FIGURES (Shift+Q/W/E) ──────────────────────────────────────────────
  tickDepthFigures();
  if (depthFiguresPreset) drawDepthFigures(pal);

  // Close mirror dimension transform
  if (mirrorDimension) pop();

  // Liquid mercury skin — drawn in 2D screen space after 3D portraits
  if (liquidMercury) updateLiquidMercury(pal);

  // Membrane tendons
  drawMembraneTendons(pal);

  // Corpus dissolve pixels
  updateCorpusDissolve(pal);

  // Entities
  if (entityMode) {
    for (let e of entities) { e.update(); e.draw(pal); }
    entities = entities.filter(e => !e.isDead());
  }

  if (arpMode && soundStarted && !audioPaused) tickArp();
  if (showPoem) drawPoemRain(pal);
  if (showBloodText || dragPortrait) drawBloodPoetry(pal);

  // Word vomit
  drawWordVomit(pal);

  if (showOscilloscope) drawOscilloscope(pal);
  if (showLFO)          drawLFOScope(pal);
  if (showSpectrogram)  drawSpectrogram(pal);
  if (showNoteHistory)  drawNoteHistory(pal);

  // Extension overlays (2D reset-matrix layers)
  drawSigils(pal);
  drawDeadChannel(pal);
  drawSubliminal(pal);
  drawErrorDialogs(pal);
  drawDepthEngine(pal);
  drawUnCEngine(pal);

  if (showHUD) drawHUD(pal);
  if (soundStarted && !audioPaused) updateAudio();
  if (soundStarted) beatPhase = (beatPhase+1) % 64;

  if (bloodBurst && frameCount%3===0)
    _spawnParticles(random(-width/2,width/2), random(-height/2,height/2), 0, 3, 'blood');

  trailPoints.push({x: mouseX-width/2, y: mouseY-height/2});
  if (trailPoints.length > TRAIL_LEN) trailPoints.shift();

  waveHistory.shift();
  if (soundStarted && !audioPaused) {
    waveHistory.push(sin(lfoPhase*(SP.lfoRate*40)) * (dragPortrait?0.9:0.3) * (beatPhase<4?1.5:1.0));
  } else { waveHistory.push(sin(lfoPhase*2)*0.05); }
  if (typeof recorderFrameHook === 'function') recorderFrameHook();
}

// ─── DRAWING MODULES ─────────────────────────────────────────────────────────

function drawMercuryTrail(pal) {
  push(); noFill();
  for (let i = 1; i < trailPoints.length; i++) {
    let a = map(i, 0, trailPoints.length, 0, 140);
    stroke(pal.pt1[0], pal.pt1[1], pal.pt1[2], a);
    strokeWeight(map(i, 0, trailPoints.length, 0.5, 2.5));
    let p0=trailPoints[i-1], p1=trailPoints[i];
    line(p0.x,p0.y,0, p1.x,p1.y,0);
  }
  noStroke(); fill(pal.pt1[0],pal.pt1[1],pal.pt1[2],60);
  translate(mouseX-width/2, mouseY-height/2, 0);
  sphere(6 + sin(lfoPhase)*3);
  pop();
}

function drawGlitchBars(pal) {
  push(); resetMatrix(); noStroke();
  let n = floor(random(1,8));
  for (let i = 0; i < n; i++) {
    let y=random(-height/2,height/2), h=random(1,18), xo=random(-40,40);
    fill(pal.glitch[0],pal.glitch[1],pal.glitch[2],random(30,130));
    rect(-width/2+xo, y, width, h);
    fill(pal.pt1[0],pal.pt1[1],pal.pt1[2],random(10,60));
    rect(-width/2+xo+random(-8,8), y+random(-4,4), width, h*0.5);
  }
  pop();
}

function drawPoemRain(pal) {
  push(); textFont('monospace');
  for (let p of floatingPoem) {
    push();
    fill(pal.text[0],pal.text[1],pal.text[2], p.alpha);
    textSize(p.size); textAlign(CENTER);
    translate(p.x, p.y, p.z);
    rotateZ(sin(frameCount*0.005+p.phase)*0.04);
    if (uvMode) {
      fill(200,0,255,p.alpha*0.7); translate(2,2,0); text(p.txt,0,0);
      translate(-4,-4,0); fill(0,200,255,p.alpha*0.6); text(p.txt,0,0);
      translate(2,2,0);
    }
    fill(pal.text[0],pal.text[1],pal.text[2],p.alpha);
    text(p.txt,0,0); pop();
    p.y -= p.speed; p.z += sin(frameCount*0.02+p.phase)*1.5;
    p.alpha -= 0.08;
    if (p.alpha<0 || p.y<-height) respawnPoemLine(p);
  }
  pop();
}

function drawBloodPoetry(pal) {
  push(); resetMatrix();
  let gx=glitchMode?random(-25,25):0, gy=glitchMode?random(-10,10):0;
  textFont('monospace'); textAlign(CENTER);
  fill(0,0,0,120); textSize(34); text(bloodPoetry, gx+3, gy+3);
  fill(pal.glitch[0],pal.glitch[1],pal.glitch[2],random(180,255));
  textSize(34); text(bloodPoetry, gx, gy);
  fill(pal.text[0],pal.text[1],pal.text[2],60);
  text(bloodPoetry, gx-4, gy-2);
  pop();
}

function drawLFOScope(pal) {
  push(); resetMatrix(); noFill();
  stroke(pal.text[0],pal.text[1],pal.text[2],160); strokeWeight(1.5);
  let sw=320, sh=60, ox=-width/2+30, oy=height/2-140;
  stroke(pal.text[0],pal.text[1],pal.text[2],60); rect(ox,oy,sw,sh);
  stroke(pal.text[0],pal.text[1],pal.text[2],200);
  beginShape();
  for (let x=0; x<sw; x++) {
    let t=(x/sw)*TWO_PI*4;
    let y=sin(t+lfoPhase*6)*(sh/2-6)*(dragPortrait?0.9:0.3);
    vertex(ox+x, oy+sh/2+y);
  }
  endShape();
  fill(pal.text[0],pal.text[1],pal.text[2],180); noStroke();
  textSize(9); textAlign(LEFT);
  text("LFO_SCOPE  rate:"+nf(SP.lfoRate,1,2)+"Hz  target:"+SP.lfoTarget, ox+4, oy-5);
  pop();
}

function drawOscilloscope(pal) {
  push(); resetMatrix();
  let sw=400, sh=80, ox=width/2-sw-30, oy=height/2-sh-140;
  noFill(); stroke(pal.text[0],pal.text[1],pal.text[2],50); rect(ox,oy,sw,sh);
  stroke(pal.glitch[0],pal.glitch[1],pal.glitch[2],200); strokeWeight(1.2);
  beginShape();
  for (let i=0; i<waveHistory.length; i++) {
    let x=ox+map(i,0,waveHistory.length-1,0,sw);
    let y=oy+sh/2+waveHistory[i]*(sh/2-4);
    vertex(x,y);
  }
  endShape();
  fill(pal.text[0],pal.text[1],pal.text[2],160); noStroke();
  textSize(9); textAlign(LEFT);
  text("OSCILLOSCOPE  wave:"+SP.oscWave, ox+4, oy-5);
  pop();
}

function drawSpectrogram(pal) {
  if (frameCount%2!==0) return; // halve draw calls — fast enough at 30fps equivalent
  push(); resetMatrix();
  let bw=8, bCount=32, ox=-width/2+20, oy=height/2-20;
  noStroke();
  for (let i=0; i<bCount; i++) {
    let h=abs(sin(lfoPhase*(i+1)*0.3+i))*100*(soundStarted?1:0.1);
    h += beatPhase<4 ? random(20) : 0;
    let c=map(i,0,bCount,0,255);
    fill(pal.pt2[0], pal.pt2[1]+c*0.3, pal.pt2[2]+c*0.6, 180);
    rect(ox+i*(bw+2), oy-h, bw, h);
    fill(pal.text[0],pal.text[1],pal.text[2],200);
    rect(ox+i*(bw+2), oy-h-3, bw, 2);
  }
  fill(pal.text[0],pal.text[1],pal.text[2],120);
  textSize(9); textAlign(LEFT); text("SPECTRUM", ox+4, oy+14);
  pop();
}

function drawNoteHistory(pal) {
  push(); resetMatrix();
  let ox=width/2-180, oy=-height/2+80;
  fill(pal.bg[0],pal.bg[1],pal.bg[2],160); noStroke();
  rect(ox-6, oy-14, 172, noteHistory.length*14+18, 3);
  fill(pal.text[0],pal.text[1],pal.text[2],160);
  textSize(9); textAlign(LEFT); text("NOTE_HISTORY", ox, oy);
  for (let i=0; i<noteHistory.length; i++) {
    let n=noteHistory[noteHistory.length-1-i];
    let a=map(i,0,noteHistory.length,200,40);
    fill(pal.glitch[0],pal.glitch[1],pal.glitch[2],a);
    text(n.label+"  "+nf(n.freq,3,1)+"Hz  t-"+n.age, ox, oy+14+i*14);
  }
  for (let n of noteHistory) n.age++;
  pop();
}

function drawWaveformBackground(pal) {
  push(); noFill();
  for (let row=0; row<4; row++) {
    let y=map(row,0,3,-height/2+40,height/2-40);
    stroke(pal.pt1[0],pal.pt1[1],pal.pt1[2],12); strokeWeight(1);
    beginShape();
    for (let x=-width/2; x<=width/2; x+=12) {
      let nx=map(x,-width/2,width/2,0,1);
      let yOff=sin(nx*TWO_PI*(3+row)+lfoPhase*(1+row*0.3))*30;
      vertex(x, y+yOff);
    }
    endShape();
  }
  pop();
}

// ─── BACKGROUND GLB + CUBE MIX ───────────────────────────────────────────────
// [8]        — toggle the background mix (spawn / remove)
// [*] Sh+8   — crazy randomised spawn (larger, wilder scale)
// When bgMixMode is toggled off the objects are cleared.

let glbLoadAttempted = false;

function spawnBgMix(crazy) {
  _loadBgModelsLazy(function() { _doSpawnBgMix(crazy); });
}

function _doSpawnBgMix(crazy) {
  bgMixObjects = [];
  const count = crazy ? floor(random(6, 10)) : BGP.count;
  const hasBgModels = bgModels.length > 0;
  const scMin = crazy ? 0.8  : BGP.scaleMin;
  const scMax = crazy ? 4.0  : BGP.scaleMax;
  const aMin  = crazy ? 60   : BGP.alphaMin;
  const aMax  = crazy ? 180  : BGP.alphaMax;
  const rSpd  = crazy ? 0.012 : BGP.rotSpeedMax;
  for (let i = 0; i < count; i++) {
    let useModel = hasBgModels && !BGP.cubeOnly;
    if (BGP.modelOnly && hasBgModels) useModel = true;
    else if (!BGP.modelOnly && !BGP.cubeOnly) useModel = hasBgModels && random() > 0.45;
    const sc = createVector(random(scMin, scMax), random(scMin, scMax), random(scMin, scMax));
    const mIdx = hasBgModels ? floor(random(bgModels.length)) : 0;
    bgMixObjects.push({
      pos:      createVector(random(-1400, 1400), random(-900, 900), random(BGP.depthMin, BGP.depthMax)),
      rot:      createVector(random(TWO_PI), random(TWO_PI), random(TWO_PI)),
      rotSpeed: createVector(random(-rSpd, rSpd), random(-rSpd, rSpd), random(-rSpd, rSpd)),
      driftVel: createVector(random(-1, 1), random(-1, 1)),
      sc,
      type:     useModel ? 'model' : 'cube',
      modelIdx: mIdx,
      size:     random(25, 100),
      colorIdx: floor(random(BG_MIX_COLORS.length)),
      alpha:    floor(random(aMin, aMax)),
      seed:     random(1000),
      cachedRGB: null,   // computed once on first draw; cleared on respawn
    });
  }
  bgMixMode = true;
  bgMixCrazy = crazy;
}

function drawBgMix(pal) {
  if (!bgMixMode || bgMixObjects.length === 0) return;
  for (let o of bgMixObjects) {
    o.rot.x += o.rotSpeed.x;
    o.rot.y += o.rotSpeed.y;
    o.rot.z += o.rotSpeed.z;
    // Drift
    if (BGP.driftAmt > 0) {
      o.pos.x += o.driftVel.x * BGP.driftAmt;
      o.pos.y += o.driftVel.y * BGP.driftAmt;
      if (o.pos.x >  1600) o.pos.x = -1600;
      if (o.pos.x < -1600) o.pos.x =  1600;
      if (o.pos.y >  1000) o.pos.y = -1000;
      if (o.pos.y < -1000) o.pos.y =  1000;
    }
    // Pulse
    const pulse = BGP.pulseAmt > 0
      ? 1 + sin(lfoPhase + o.seed * 0.01) * BGP.pulseAmt
      : 1;

    push();
    translate(o.pos.x, o.pos.y, o.pos.z);
    rotateX(o.rot.x);
    rotateY(o.rot.y);
    rotateZ(o.rot.z);
    scale(o.sc.x * pulse, o.sc.y * pulse, o.sc.z * pulse);

    // Colour resolution: per-model override > multi > single + hueShift
    // cachedRGB is computed once and reused; cleared when spawnBgMix() rebuilds the array.
    let r, g, b;
    if (!o.cachedRGB) {
      let baseCol;
      if (bgMixColorMode === 'multi') {
        baseCol = BG_MIX_COLORS[o.colorIdx].stroke;
      } else {
        baseCol = BG_MIX_COLORS[bgMixColorIdx].stroke;
      }
      if (o.type === 'model' && BGP.modelColors[o.modelIdx]) {
        baseCol = BGP.modelColors[o.modelIdx];
      }
      let [br, bg2, bb] = baseCol;
      if (BGP.hueShift !== 0) {
        colorMode(HSB, 360, 255, 255, 255);
        let hsbCol = color(br, bg2, bb);
        let h = (hue(hsbCol) + BGP.hueShift) % 360;
        let rgb = color(h, saturation(hsbCol), brightness(hsbCol));
        colorMode(RGB, 255, 255, 255, 255);
        br = red(rgb); bg2 = green(rgb); bb = blue(rgb);
      }
      o.cachedRGB = [br, bg2, bb];
    }
    [r, g, b] = o.cachedRGB;

    noFill();
    stroke(r, g, b, o.alpha);
    strokeWeight(BGP.strokeWeight);

    if (o.type === 'model' && bgModels[o.modelIdx]) {
      model(bgModels[o.modelIdx]);
    } else {
      box(o.size, o.size, o.size);
    }
    pop();
  }
  noStroke();
}

function drawScanlines(pal) {
  // Use a cached off-screen buffer — only rebuild on resize
  if (!_scanlineBuf || _scanlineH !== height) _rebuildScanlineBuf();
  push(); resetMatrix(); noStroke(); noFill();
  tint(255, 255); image(_scanlineBuf, -width/2, -height/2);
  pop();
}

function drawVignette(pal) {
  // Use a cached off-screen buffer — rebuild only when palette or size changes
  if (!_vignetteBuf || _vignettePalIdx !== paletteIndex || _vignetteW !== width || _vignetteH !== height) {
    _rebuildVignetteBuf(pal);
  }
  push(); resetMatrix(); noStroke(); noFill();
  tint(255, 255); image(_vignetteBuf, -width/2, -height/2);
  pop();
}

function drawStarField(pal) {
  // Cheap 2-D projected stars — ellipse is far cheaper than sphere() in WEBGL
  push(); resetMatrix(); noStroke();
  for (let s of stars) {
    s.z -= s.speed * (timeWarp ? 0.3 : 1);
    if (s.z < 1) s.z = 3000;
    let sx = map(s.x / s.z, -1, 1, -width / 2, width / 2);
    let sy = map(s.y / s.z, -1, 1, -height / 2, height / 2);
    let r = map(s.z, 0, 3000, 4, 0.2);
    let a = map(s.z, 0, 3000, 255, 0);
    fill(pal.pt1[0], pal.pt1[1], pal.pt1[2], a);
    ellipse(sx, sy, r * 2, r * 2);
  }
  pop();
}

function drawHUD(pal) {
  push(); resetMatrix();
  textFont('monospace'); textSize(10); textAlign(LEFT);
  let x0=-width/2+18, y0=-height/2+18, lh=15;
  let flags = [
    ["PALETTE",    PALETTES[paletteIndex].name],
    ["PORTRAITS",  portraits.length],
    ["PARTICLES",  particles.length],
    ["POEM",       showPoem        ?"ON":"OFF"],
    ["BLOOD_TXT",  showBloodText   ?"ON":"OFF"],
    ["GLITCH",     glitchMode      ?"ON":"OFF"],
    ["MIRROR",     mirrorMode      ?"ON":"OFF"],
    ["DEPTH_FOG",  depthFog        ?"ON":"OFF"],
    ["UV_MODE",    uvMode          ?"ON":"OFF"],
    ["TIME_WARP",  timeWarp        ?"ON":"OFF"],
    ["REV_GRAV",   reverseGrav     ?"ON":"OFF"],
    ["BLOOD_BST",  bloodBurst      ?"ON":"OFF"],
    ["LFO_SCOPE",  showLFO         ?"ON":"OFF"],
    ["OSCILLOSC",  showOscilloscope?"ON":"OFF"],
    ["SPECTRGM",   showSpectrogram ?"ON":"OFF"],
    ["ECHO",       echoFeedback    ?"ON":"OFF"],
    ["STARS",      starField       ?"ON":"OFF"],
    ["TRAILS",     portraitTrails  ?"ON":"OFF"],
    ["SCANLINES",  scanlines       ?"ON":"OFF"],
    ["ARP",        arpMode         ?"ON":"OFF"],
    ["CHORD",      autoChord       ?"ON":"OFF"],
    ["AUDIO",      audioPaused?"PAUSE":(soundStarted?"ON":"INIT")],
    ["FPS",        round(frameRate())],
    // Extension flags
    ["FLESH_MEM",  fleshMemory    ?"ON":"OFF"],
    ["CORPUS",     corpusDissolve ?"ON":"OFF"],
    ["MEMBRANE",   membraneMode   ?"ON":"OFF"],
    ["DEAD_CH",    deadChannel    ?"ON":"OFF"],
    ["PANIC",      panicMode      ?"ON":"OFF"],
    ["SIGILS",     sigilMode      ?"ON":"OFF"],
    ["BINAURAL",   binauralDrone  ?"ON":"OFF"],
    ["SUBLIMINAL", subliminalMode ?"ON":"OFF"],
    ["ENTITIES",   entities.length],
    ["ENTITY_BHV", entityBehavior],
    ["WORD_VOM",   wordVomitMode  ?"ON":"OFF"],
    ["CLOCKWORK",  clockworkMode  ?"ON":"OFF"],
    ["ERRORS",     errorDialogs.length],
    ["BREATHE",    breathingRoom  ?"ON":"OFF"],
    ["STATIC_GOD", staticGodMode  ?"ON":"OFF"],
    ["BG_MODE",    bgMode],
    ["BG_WEIRD",   nf(bgWeirdness,1,2)],
    ["BG_DENS",    nf(bgDensity,1,2)],
    ["BG_MIX",     bgMixMode ? (bgMixCrazy?"CRAZY":"ON") : "OFF"],
    ["BG_MIX_OBJ", bgMixObjects.length],
    ["BG_MIX_COL", bgMixColorMode==='multi' ? 'MULTI' : BG_MIX_COLORS[bgMixColorIdx].name],
    ["PTR_STYLE",  portraitStyle===0 ? "PLASTIC" : portraitStyle===1 ? "LINES" : "MIX"],
    ["MIRROR_DIM", mirrorDimension ?"ON":"OFF"],
    ["LIQ_MERC",   liquidMercury   ?"ON":"OFF"],
    ["BG_CLICK",   bgClickMode     ?"ON":"OFF"],
    ["MERC_DROPS", mercuryDrops.length],
    ["VIS_REACT",  visualReactiveAudio ? "ON":"OFF"],
  ];
  noStroke();
  fill(pal.bg[0],pal.bg[1],pal.bg[2],180);
  rect(x0-6, y0-6, 168, flags.length*lh+14, 4);
  for (let i=0; i<flags.length; i++) {
    let isOn=flags[i][1]==="ON", isOff=flags[i][1]==="OFF";
    fill(
      isOn?pal.glitch[0]:(isOff?80:pal.text[0]),
      isOn?pal.glitch[1]:(isOff?80:pal.text[1]),
      isOn?pal.glitch[2]:(isOff?80:pal.text[2]),
      isOff?100:220
    );
    text(flags[i][0]+":  "+flags[i][1], x0, y0+i*lh);
  }
  pop();
}

// ─── LIQUID MERCURY SKIN ─────────────────────────────────────────────────────
// Each frame: portraits shed silver drips that fall, pool, then evaporate back up.
function updateLiquidMercury(pal) {
  // Spawn drips from portrait surfaces every few frames
  if (frameCount % 2 === 0) {
    for (let p of portraits) {
      if (random() < 0.35) {
        let ox = random(-50, 50) * p.scale_;
        let oy = random(-30, 60) * p.scale_;
        mercuryDrops.push({
          x:  p.displayPos.x + ox,
          y:  p.displayPos.y + oy,
          vx: random(-0.6, 0.6),
          vy: random(0.4, 2.2),
          size: random(3, 9) * p.scale_,
          alpha: random(160, 240),
          phase: random(TWO_PI),
          pooled: false,
        });
      }
    }
  }

  // Cap drops so we don't blow up
  if (mercuryDrops.length > 400) mercuryDrops.splice(0, 20);

  const floorY = MERCURY_FLOOR();

  push();
  resetMatrix();
  noStroke();

  // Update and draw drops
  for (let i = mercuryDrops.length - 1; i >= 0; i--) {
    let d = mercuryDrops[i];
    if (!d.pooled) {
      d.vy  += 0.18;          // gravity
      d.vx  *= 0.97;
      d.x   += d.vx;
      d.y   += d.vy;
      d.alpha -= 1.2;

      // Hit the floor → convert to pool
      if (d.y >= floorY) {
        d.y  = floorY;
        d.pooled = true;
        mercuryPool.push({ x: d.x, size: d.size * 1.6, alpha: d.alpha, vaporAge: 0 });
        mercuryDrops.splice(i, 1);
        continue;
      }

      if (d.alpha <= 0) { mercuryDrops.splice(i, 1); continue; }

      // Draw the drop — elongated ellipse in direction of travel
      let speed = sqrt(d.vx*d.vx + d.vy*d.vy);
      let stretch = min(speed * 0.4, 3);
      let ang = atan2(d.vy, d.vx);
      // silver sheen: mix palette pt1 with pure white
      let sr = lerp(pal.pt1[0], 230, 0.6);
      let sg = lerp(pal.pt1[1], 235, 0.6);
      let sb = lerp(pal.pt1[2], 245, 0.65);
      fill(sr, sg, sb, d.alpha);
      push();
      translate(d.x, d.y);
      rotate(ang);
      ellipse(0, 0, d.size + stretch * 2, d.size);
      // specular highlight
      fill(255, 255, 255, d.alpha * 0.5);
      ellipse(-d.size * 0.15, -d.size * 0.18, d.size * 0.35, d.size * 0.22);
      pop();
    }
  }

  // Update and draw pool puddles + evaporation risers
  if (mercuryPool.length > 80) mercuryPool.splice(0, 5);
  for (let i = mercuryPool.length - 1; i >= 0; i--) {
    let p = mercuryPool[i];
    p.vaporAge++;
    p.size  = min(p.size + 0.15, 40);   // puddle spreads
    p.alpha -= 0.4;                      // puddle fades

    if (p.alpha <= 0) { mercuryPool.splice(i, 1); continue; }

    // Draw puddle — flat ellipse at floor
    let sr = lerp(pal.pt1[0], 210, 0.5);
    let sg = lerp(pal.pt1[1], 220, 0.5);
    let sb = lerp(pal.pt1[2], 235, 0.6);
    fill(sr, sg, sb, p.alpha * 0.7);
    ellipse(p.x, floorY, p.size * 2.4, p.size * 0.45);
    // Highlight
    fill(255, 255, 255, p.alpha * 0.3);
    ellipse(p.x - p.size * 0.15, floorY - 1, p.size * 0.8, p.size * 0.15);

    // Every 30 frames spawn an evaporation riser from this puddle
    if (p.vaporAge % 30 === 0 && p.alpha > 40) {
      mercuryDrops.push({
        x:  p.x + random(-p.size, p.size),
        y:  floorY,
        vx: random(-0.4, 0.4),
        vy: random(-2.5, -0.8),   // rises upward
        size: random(2, 5),
        alpha: random(80, 160),
        phase: random(TWO_PI),
        pooled: false,
      });
    }
  }

  pop();
}

// ─── CLICK-TO-ADD BG OBJECT ──────────────────────────────────────────────────
// When bgClickMode is ON, clicking anywhere in empty space (no portrait hit)
// drops one random folder-1 model at that cursor position.
function _spawnOneBgObjAt(sx, sy) {
  // sx/sy are screen-space; convert to world-space XY (ignore camera Z for simplicity)
  const wx = sx - width / 2;
  const wy = sy - height / 2;
  const hasBgModels = bgModels.length > 0;
  const rSpd = BGP.rotSpeedMax;
  const sc = createVector(
    random(BGP.scaleMin, BGP.scaleMax),
    random(BGP.scaleMin, BGP.scaleMax),
    random(BGP.scaleMin, BGP.scaleMax)
  );
  const mIdx = hasBgModels ? floor(random(bgModels.length)) : 0;
  bgMixObjects.push({
    pos:      createVector(wx, wy, random(BGP.depthMin, BGP.depthMax)),
    rot:      createVector(random(TWO_PI), random(TWO_PI), random(TWO_PI)),
    rotSpeed: createVector(random(-rSpd, rSpd), random(-rSpd, rSpd), random(-rSpd, rSpd)),
    driftVel: createVector(random(-1, 1), random(-1, 1)),
    sc,
    type:     (hasBgModels && !BGP.cubeOnly) ? 'model' : 'cube',
    modelIdx: mIdx,
    size:     random(25, 100),
    colorIdx: floor(random(BG_MIX_COLORS.length)),
    alpha:    floor(random(BGP.alphaMin, BGP.alphaMax)),
    seed:     random(1000),
    cachedRGB: null,
  });
  bgMixMode = true;   // make sure the render pass is active
  // small flash to confirm placement
  flashAmt = max(flashAmt, 20);
}

// ─── EXTENSION DRAWING MODULES ────────────────────────────────────────────────

function updateFleshMemory(pal) {
  if (!fleshMemory) return;
  if (frameCount%8===0) {
    for (let p of portraits) {
      fleshImprints.push({ x:p.displayPos.x, y:p.displayPos.y, z:p.displayPos.z,
        rot:p.rot, sc:p.scale_*0.88, age:0, mdl:p.model, maxAge:200 });
    }
    // Tighter cap: max 80 imprints (was 300) to reduce 3D model draws per frame
    if (fleshImprints.length > 80) fleshImprints.splice(0, portraits.length);
  }
  // Skip rendering on alternating frames to halve the model-draw cost
  if (frameCount%2!==0) return;
  push(); noStroke();
  for (let i=fleshImprints.length-1; i>=0; i--) {
    let imp=fleshImprints[i]; imp.age++;
    let alpha=map(imp.age, 0, imp.maxAge, 80, 0);
    if (alpha<=0) { fleshImprints.splice(i,1); continue; }
    push();
    translate(imp.x, imp.y, imp.z);
    rotateY(imp.rot); rotateX(PI);
    let s=imp.sc * map(imp.age, 0, imp.maxAge, 1, 0.7);
    scale(s,s,s);
    ambientMaterial(
      pal.pt1[0]*0.4 + pal.glitch[0]*0.6,
      pal.pt1[1]*0.4 + pal.glitch[1]*0.6,
      pal.pt1[2]*0.4 + pal.glitch[2]*0.6
    );
    if (imp.mdl) model(imp.mdl);
    pop();
  }
  pop();
}

function buildTendons() {
  tendons = [];
  for (let i=0; i<portraits.length; i++) {
    for (let j=i+1; j<portraits.length; j++) {
      let d=dist(portraits[i].displayPos.x, portraits[i].displayPos.y,
                 portraits[j].displayPos.x, portraits[j].displayPos.y);
      if (d<380) tendons.push({a:i, b:j, restLen:d, phase:random(TWO_PI)});
    }
  }
}

function drawMembraneTendons(pal) {
  if (!membraneMode || portraits.length<2) return;
  if (frameCount%120===0) buildTendons();
  push(); noFill();
  for (let t of tendons) {
    if (t.a>=portraits.length || t.b>=portraits.length) continue;
    let pa=portraits[t.a], pb=portraits[t.b];
    t.phase += 0.02;
    let d=dist(pa.displayPos.x, pa.displayPos.y, pb.displayPos.x, pb.displayPos.y);
    let stretch=d/max(t.restLen,1);
    let alpha=map(stretch,0.5,3,120,10)*(0.6+sin(t.phase)*0.4);
    let thickness=map(stretch,0.5,3,2.5,0.3);
    let mx=(pa.displayPos.x+pb.displayPos.x)/2 + sin(t.phase*2)*20;
    let my=(pa.displayPos.y+pb.displayPos.y)/2 + cos(t.phase*1.3)*20 + stretch*15;
    strokeWeight(thickness);
    stroke(
      lerp(pal.pt1[0], pal.glitch[0], min(stretch-1,1)),
      lerp(pal.pt1[1], pal.glitch[1], min(stretch-1,1)),
      lerp(pal.pt1[2], pal.glitch[2], min(stretch-1,1)),
      alpha
    );
    beginShape();
    for (let step=0; step<=16; step++) {
      let tt=step/16;
      let bx=(1-tt)*(1-tt)*pa.displayPos.x + 2*(1-tt)*tt*mx + tt*tt*pb.displayPos.x;
      let by=(1-tt)*(1-tt)*pa.displayPos.y + 2*(1-tt)*tt*my + tt*tt*pb.displayPos.y;
      let bz=lerp(pa.displayPos.z, pb.displayPos.z, tt)+sin(tt*PI+t.phase)*12;
      vertex(bx, by, bz);
    }
    endShape();
    if (stretch>2.6) {
      let sf=0.012*(stretch-2.6);
      let dx=pb.displayPos.x-pa.displayPos.x, dy=pb.displayPos.y-pa.displayPos.y;
      pa.targetPos.x+=dx*sf; pa.targetPos.y+=dy*sf;
      pb.targetPos.x-=dx*sf; pb.targetPos.y-=dy*sf;
      _spawnParticles(mx,my,0,1,'blood');
    }
  }
  noStroke(); pop();
}

function drawSigils(pal) {
  if (!sigilMode) return;
  sigilMutateTimer++;
  if (sigilMutateTimer>180) { sigilSeed=floor(random(10000)); sigilMutateTimer=0; }
  push(); resetMatrix();
  let cx=0, cy=0, sz=min(width,height)*0.28;
  randomSeed(sigilSeed);
  let pts=[];
  for (let i=0; i<SIGIL_STROKES+4; i++) {
    pts.push(createVector(
      cx+cos(i/(SIGIL_STROKES+4)*TWO_PI+random(-0.6,0.6))*sz*random(0.3,1.0),
      cy+sin(i/(SIGIL_STROKES+4)*TWO_PI+random(-0.6,0.6))*sz*random(0.3,1.0)
    ));
  }
  noFill();
  let sigAlpha=30+sin(lfoPhase*1.5)*20;
  strokeWeight(0.8);
  stroke(pal.glitch[0],pal.glitch[1],pal.glitch[2],sigAlpha*0.6);
  beginShape();
  for (let p of pts) curveVertex(p.x, p.y);
  curveVertex(pts[0].x, pts[0].y); curveVertex(pts[1].x, pts[1].y);
  endShape();
  strokeWeight(1);
  stroke(pal.pt1[0],pal.pt1[1],pal.pt1[2],sigAlpha);
  for (let i=0; i<pts.length; i++) { let j=(i*3+2)%pts.length; line(pts[i].x,pts[i].y,pts[j].x,pts[j].y); }
  strokeWeight(0.5);
  stroke(pal.text[0],pal.text[1],pal.text[2],sigAlpha*0.5);
  for (let i=0; i<pts.length; i++) { let j=(i*5+1)%pts.length; line(pts[i].x,pts[i].y,pts[j].x,pts[j].y); }
  noStroke(); fill(pal.glitch[0],pal.glitch[1],pal.glitch[2],sigAlpha*1.5);
  circle(cx, cy, 8+sin(lfoPhase*3)*4);
  randomSeed(sigilSeed);
  let widx=floor(random(SIGIL_WORDS.length));
  fill(pal.text[0],pal.text[1],pal.text[2],sigAlpha*2);
  noStroke(); textSize(11); textFont('monospace'); textAlign(CENTER);
  text(SIGIL_WORDS[widx], cx, cy+sz+20);
  randomSeed();
  pop();
}

function drawDeadChannel(pal) {
  if (!deadChannel) return;
  channelTimer++;
  if (channelTimer>random(90,240)) {
    channelIndex=(channelIndex+1)%TV_CHANNELS.length;
    channelTimer=0; screenShake=max(screenShake,6); flashAmt=max(flashAmt,30);
  }
  let ch=TV_CHANNELS[channelIndex];
  push(); resetMatrix(); noStroke();
  if (ch.noise>0.1) {
    // Cap noise rects: was up to 800, now max 200 for performance
    let noiseCount = floor(ch.noise * 200);
    for (let i=0; i<noiseCount; i++) {
      fill(random(200,255),random(200,255),random(200,255),random(30,100));
      rect(random(-width/2,width/2), random(-height/2,height/2), random(1,6), random(1,3));
    }
  }
  let rollY=(frameCount*2.3)%height - height/2;
  fill(ch.color[0]+40,ch.color[1]+40,ch.color[2]+40,60);
  rect(-width/2, rollY, width, 3);
  fill(255,255,255,20); rect(-width/2, rollY+3, width, 1);
  if (channelTimer<80) {
    let ba=map(channelTimer,0,80,240,0);
    fill(0,0,0,ba*0.7); rect(-width/2, height/2-50, width, 40);
    fill(ch.textColor[0],ch.textColor[1],ch.textColor[2],ba);
    textFont('monospace'); textSize(13); textAlign(LEFT);
    text(ch.name+"  //  "+nf(frameCount,6), -width/2+20, height/2-24);
    for (let b=0; b<5; b++) {
      fill(ch.textColor[0],ch.textColor[1],ch.textColor[2],ba*0.6);
      rect(width/2-80+b*12, height/2-24, 8, -map(b,0,4,4,14));
    }
  }
  if (ch.noise>0.7 && random()>0.6) {
    let ty=random(-height/2,height/2), shift=random(10,50);
    fill(255,0,0,40); rect(-width/2-shift, ty, width, random(1,5));
    fill(0,255,255,40); rect(-width/2+shift, ty+2, width, random(1,4));
  }
  pop();
}

function drawSubliminal(pal) {
  if (!subliminalMode) return;
  subliminalTimer++;
  subliminalFrame=false;
  if (subliminalTimer>random(120,400)) { subliminalFrame=true; subliminalTimer=0; }
  if (subliminalFrame) {
    push(); resetMatrix();
    let phrase=random(SUBLIMINAL_PHRASES);
    noStroke();
    fill(255,255,255,8); rect(-width/2,-height/2,width,height);
    fill(255,255,255,22);
    textFont('monospace'); textSize(random(28,60)); textAlign(CENTER);
    text(phrase, random(-80,80), random(-height/4,height/4));
    fill(255,0,0,14); text(phrase, 3, 3);
    pop();
  }
}

function updateCorpusDissolve(pal) {
  if (!corpusDissolve) { dissolvePixels=[]; return; }
  if (frameCount%2===0) {
    for (let p of portraits) {
      let count=floor(random(1,4)), offset=random(60);
      for (let i=0; i<count; i++) {
        dissolvePixels.push({
          x:p.displayPos.x+random(-offset,offset),
          y:p.displayPos.y+random(-offset,offset),
          z:p.displayPos.z+random(-30,30),
          vx:random(-1.5,1.5), vy:random(0.2,1.8), vz:random(-0.5,0.5),
          r:pal.pt1[0]*random(0.5,1.2), g:pal.pt1[1]*random(0.5,1.2),
          b:pal.pt1[2]*random(0.5,1.2),
          size:random(1.5,5), life:random(120,280),
          spin:random(-0.08,0.08), ang:random(TWO_PI),
        });
      }
    }
    if (dissolvePixels.length>2000) dissolvePixels.splice(0,50);
  }
  // Draw as cheap 2-D rects in reset-matrix space (avoids per-particle push/pop + WEBGL box overhead)
  push(); resetMatrix(); noStroke();
  for (let i=dissolvePixels.length-1; i>=0; i--) {
    let px=dissolvePixels[i];
    px.x+=px.vx; px.y+=px.vy; px.z+=px.vz;
    px.vy+=0.04; px.vx*=0.99; px.life-=1; px.ang+=px.spin;
    if (px.life<=0) { dissolvePixels.splice(i,1); continue; }
    let a=map(px.life,0,140,0,200);
    fill(clamp(px.r,0,255),clamp(px.g,0,255),clamp(px.b,0,255),a);
    rect(px.x, px.y, px.size, px.size);
  }
  pop();
}

function drawWordVomit(pal) {
  if (!wordVomitMode) return;
  if (soundStarted && beatPhase===0 && portraits.length>0) {
    let rp=random(portraits);
    let words=random(poemLines).split(' ');
    wordExplosions.push({
      words, pos:createVector(rp.displayPos.x, rp.displayPos.y, 0),
      vels:words.map(()=>p5.Vector.random2D().mult(random(2,8))),
      life:200, sizes:words.map(()=>random(12,28)),
    });
  }
  push(); textFont('monospace'); textAlign(CENTER);
  for (let i=wordExplosions.length-1; i>=0; i--) {
    let exp=wordExplosions[i]; exp.life-=1.5;
    if (exp.life<=0) { wordExplosions.splice(i,1); continue; }
    let alpha=map(exp.life,0,200,0,220);
    for (let j=0; j<exp.words.length; j++) {
      exp.vels[j].mult(0.97);
      let wx=exp.pos.x+exp.vels[j].x*(200-exp.life);
      let wy=exp.pos.y+exp.vels[j].y*(200-exp.life);
      if (j%2===0) fill(pal.text[0],pal.text[1],pal.text[2],alpha);
      else          fill(pal.glitch[0],pal.glitch[1],pal.glitch[2],alpha);
      textSize(exp.sizes[j]);
      push(); translate(wx,wy,0); rotateZ(sin(frameCount*0.02+j)*0.2);
      text(exp.words[j],0,0); pop();
    }
  }
  pop();
}

function updateClockworkOrbits() {
  if (!clockworkMode) return;
  clockOrbitPhase += 0.008;
  let n=portraits.length;
  for (let i=0; i<n; i++) {
    let layer=floor(i/3), slot=i%3;
    let orbitR=80+layer*120;
    let speed=(layer%2===0?1:-1)*(0.3+layer*0.15);
    let ang=clockOrbitPhase*speed+(slot/3)*TWO_PI;
    portraits[i].targetPos.set(cos(ang)*orbitR, sin(ang)*orbitR, sin(clockOrbitPhase*2+i)*40);
  }
}

function spawnErrorDialog(pal) {
  if (errorDialogs.length>4) return;
  let msg=random(ERROR_MESSAGES);
  errorDialogs.push({
    title:msg[0], body:msg[1],
    x:random(-width/2+60, width/2-200), y:random(-height/2+40, height/2-120),
    life:600, shakeX:0, shakeY:0, pal,
  });
}

function drawErrorDialogs(pal) {
  if (!errorMode) { errorDialogs=[]; return; }
  if (frameCount%120===0) spawnErrorDialog(pal);
  push(); resetMatrix(); textFont('monospace');
  for (let i=errorDialogs.length-1; i>=0; i--) {
    let d=errorDialogs[i]; d.life--;
    if (d.life<=0) { errorDialogs.splice(i,1); continue; }
    let alpha=d.life>60?230:map(d.life,0,60,0,230);
    d.shakeX = d.life>560 ? random(-4,4) : d.shakeX*0.85;
    d.shakeY = d.life>560 ? random(-3,3) : d.shakeY*0.85;
    let bx=d.x+d.shakeX, by=d.y+d.shakeY, bw=220, bh=85;
    noStroke(); fill(0,0,0,alpha*0.4); rect(bx+4,by+4,bw,bh);
    fill(20,18,22,alpha);
    stroke(pal.glitch[0]*0.6,pal.glitch[1]*0.6,pal.glitch[2]*0.6,alpha);
    strokeWeight(1); rect(bx,by,bw,bh);
    noStroke(); fill(pal.glitch[0],pal.glitch[1],pal.glitch[2],alpha);
    rect(bx,by,bw,18);
    fill(0,0,0,alpha); textSize(9); textAlign(LEFT);
    text(d.title, bx+6, by+12);
    fill(pal.text[0],pal.text[1],pal.text[2],alpha*0.85);
    textSize(8); text(d.body, bx+8, by+30, bw-16, 40);
    fill(200,60,60,alpha); rect(bx+bw-16,by+2,14,14);
    fill(255,255,255,alpha); textAlign(CENTER); text('×',bx+bw-9,by+12);
    if (d.life>540) {
      stroke(255,255,255,map(d.life,540,600,0,150));
      strokeWeight(2); noFill(); rect(bx-1,by-1,bw+2,bh+2);
    }
  }
  noStroke(); pop();
}

function applyBreathingRoom() {
  if (!breathingRoom) return;
  breathPhase += 0.012;
  let breath=1.0+sin(breathPhase)*0.035+sin(breathPhase*0.31)*0.012;
  scale(breath, breath, 1);
}

function drawStaticGodPortrait(p, pal) {
  // Skip every other frame to halve cost
  if (frameCount%2!==0) { p.draw(frozenRot, glitchMode, mirrorMode, pal, timeWarp?0.002:0.01); return; }
  push();
  translate(p.displayPos.x, p.displayPos.y, p.displayPos.z);
  rotateY(p.rot);
  // Reduced from 60–80 lines to 30 for performance
  let n=30;
  noFill();
  for (let i=0; i<n; i++) {
    let theta=random(TWO_PI), phi=random(PI);
    let r=40*p.scale_*(0.9+random(0.2));
    let sx=r*sin(phi)*cos(theta), sy=r*sin(phi)*sin(theta), sz=r*cos(phi);
    let sa=random(40,160);
    if (random()>0.5) stroke(pal.pt1[0],pal.pt1[1],pal.pt1[2],sa);
    else              stroke(pal.glitch[0],pal.glitch[1],pal.glitch[2],sa);
    strokeWeight(random(0.3,1.5));
    let ext=random(3,14);
    line(sx,sy,sz, sx+random(-ext,ext), sy+random(-ext,ext), sz+random(-ext,ext));
  }
  noStroke(); pop();
}

// ─── BINAURAL DRONE ───────────────────────────────────────────────────────────
function startBinauralDrone() {
  if (!soundStarted) startAudio();
  if (binauralOscL) { binauralOscL.stop(); binauralOscL=null; }
  if (binauralOscR) { binauralOscR.stop(); binauralOscR=null; }
  let baseF=60+SP.oscOctave*12;
  binauralOscL=new p5.Oscillator('sine'); binauralOscR=new p5.Oscillator('sine');
  binauralOscL.freq(baseF); binauralOscR.freq(baseF+binauralFreq);
  binauralOscL.connect(lpFilter); binauralOscR.connect(lpFilter);
  binauralOscL.start(); binauralOscR.start();
  binauralOscL.amp(0.18,0.5); binauralOscR.amp(0.18,0.5);
}
function stopBinauralDrone() {
  if (binauralOscL) { binauralOscL.amp(0,0.4); setTimeout(()=>{if(binauralOscL){binauralOscL.stop();binauralOscL=null;}},500); }
  if (binauralOscR) { binauralOscR.amp(0,0.4); setTimeout(()=>{if(binauralOscR){binauralOscR.stop();binauralOscR=null;}},500); }
}
function updateBinauralDrone() {
  if (!binauralDrone || !binauralOscL) return;
  let baseF=60;
  binauralOscL.freq(baseF+sin(lfoPhase*0.1)*4);
  binauralOscR.freq(baseF+binauralFreq+sin(lfoPhase*0.3)*8+sin(lfoPhase*0.1)*4);
}

// ─── PANIC MODE ───────────────────────────────────────────────────────────────
function triggerPanicMode() {
  panicMode = !panicMode;
  if (panicMode) {
    glitchMode=bloodBurst=echoFeedback=reverseGrav=mirrorMode=true;
    fleshMemory=deadChannel=membraneMode=subliminalMode=entityMode=sigilMode=true;
    screenShake=40; flashAmt=255;
    for (let p of portraits) {
      let a=random(TWO_PI), f=random(300,800);
      p.targetPos.set(cos(a)*f, sin(a)*f, random(-300,300));
    }
    for (let i=0; i<5; i++) entities.push(new Entity());
    if (soundStarted) { subOsc.freq(MIDI_FREQS[floor(random(MIDI_FREQS.length))]); subOsc.amp(1.0,0.01); subOsc.amp(0,2.0); triggerKick(); triggerKick(); }
    newBloodPoetry(); showBloodText=true; sigilSeed=floor(random(10000));
  } else {
    glitchMode=bloodBurst=reverseGrav=mirrorMode=echoFeedback=false;
    fleshMemory=deadChannel=membraneMode=subliminalMode=entityMode=sigilMode=false;
    entities=[];
    for (let p of portraits) p.targetPos.set(random(-width/3,width/3),random(-height/3,height/3),random(-120,80));
  }
}

// ─── VISUAL-REACTIVE AUDIO ENGINE (Shift+A) ──────────────────────────────────
// Reads portrait movement, particle count, lfoPhase, and beatPhase every frame
// and drives all audio nodes from them. A random behaviour profile is generated
// each time the mode is activated so every session sounds different.

function _vra_randomiseProfile() {
  const chaos = random(0.25, 0.9); // blend: 0=tame, 1=wild
  _vra.chaosLevel   = chaos;
  _vra.freqBase     = floor(random(28, 52));           // low MIDI root
  _vra.freqRange    = floor(random(12, chaos > 0.6 ? 36 : 24));
  _vra.filterMin    = random(60, 300);
  _vra.filterMax    = random(800, chaos > 0.5 ? 8000 : 4000);
  _vra.delayBase    = random(0.1, 0.5);
  _vra.delayRange   = random(0.1, chaos > 0.65 ? 0.85 : 0.45);
  _vra.noiseGain    = random(0.02, chaos > 0.7 ? 0.18 : 0.09);
  _vra.kickThresh   = random(0.4, 0.85);
  _vra.lfoMult      = random(0.3, chaos > 0.6 ? 4.0 : 2.0);
  _vra.operaOn      = random() > 0.3;
  _vra.rapOn        = random() > (chaos > 0.6 ? 0.4 : 0.7);
  _vra.chorusOn     = random() > 0.5;
  _vra.burstKey     = floor(random(DUB_NOTES.length));
  _vra.burstCooldown = floor(random(20, chaos > 0.6 ? 50 : 90));
  _vra.lastBurst    = 0;
  console.log('[VRA] new profile — chaos:', nf(chaos, 1, 2),
    '| freqBase:', _vra.freqBase, '| filterMax:', floor(_vra.filterMax));
}

function updateVisualReactiveAudio() {
  if (!visualReactiveAudio || !soundStarted || audioPaused) return;

  // ── Throttle: audio nodes update every 3 frames — imperceptible at 60fps ──
  if (frameCount % 3 !== 0) return;

  // ── 1. Gather visual signals (single portrait loop, no extra allocations) ─
  let totalSpeed = 0, totalSpread = 0, avgY = 0, avgX = 0;
  const n = max(portraits.length, 1);
  for (let i = 0; i < portraits.length; i++) {
    const p = portraits[i];
    const dx = p.displayPos.x - p.targetPos.x;
    const dy = p.displayPos.y - p.targetPos.y;
    totalSpeed  += sqrt(dx*dx + dy*dy) * 0.04;
    totalSpread += sqrt(p.displayPos.x*p.displayPos.x + p.displayPos.y*p.displayPos.y);
    avgY += p.displayPos.y;
    avgX += p.displayPos.x;
  }
  const speedSig  = clamp(totalSpeed  / n / 8,  0, 1);
  const spreadSig = clamp(totalSpread / n / (width * 0.6), 0, 1);
  avgY /= n; avgX /= n;
  const ySig = (avgY + height * 0.5) / height;
  const xSig = (avgX + width  * 0.5) / width;

  // Particle density
  const partSig = clamp(particles.length / MAX_PARTICLES, 0, 1);

  // LFO + beat pulse (cheap — no trig allocation beyond existing lfoPhase)
  const lfoPulse  = (sin(lfoPhase * _vra.lfoMult) + 1) * 0.5;
  const beatPulse = beatPhase < 4 ? 1.0 : beatPhase < 16 ? 0.5 : 0.1;

  // Combined activity — small noise via sin(frameCount) instead of random()
  const wobble  = 1.0 + sin(frameCount * 0.17) * 0.12;
  const activity = clamp(
    (speedSig * 0.30 + partSig * 0.25 + spreadSig * 0.20 + lfoPulse * 0.15 + beatPulse * 0.10) * wobble,
    0, 1
  );

  // Smooth ramp time — longer = cheaper on the Web Audio scheduler
  const ramp = 0.12;

  // ── 2. subOsc pitch + amplitude ──────────────────────────────────────────
  const semitones = _vra.freqBase + _vra.freqRange * ySig
    + _vra.freqRange * 0.3 * (activity - 0.5);
  const targetFreq = midiToFreq(clamp(semitones, 16, 96));
  if (subOsc.started) {
    subOsc.freq(targetFreq, ramp);
    subOsc.amp(clamp(spreadSig * 0.5 + beatPulse * 0.35 + activity * 0.15, 0.01, 0.85), ramp);
  }

  // ── 3. LPF / HPF ─────────────────────────────────────────────────────────
  const filterHz = _vra.filterMin + (_vra.filterMax - _vra.filterMin) * (speedSig * 0.6 + xSig * 0.4);
  if (lpFilter) lpFilter.freq(clamp(filterHz, 40, 14000));
  if (hpFilter) hpFilter.freq(clamp(partSig * 180, 10, 2000));

  // ── 4. Delay ─────────────────────────────────────────────────────────────
  const delayT = clamp(_vra.delayBase + partSig * _vra.delayRange, 0.01, 1.2);
  if (mainDelay) {
    mainDelay.delayTime(delayT);
    mainDelay.feedback(clamp(0.3 + spreadSig * 0.5, 0.01, 0.92));
  }
  if (delay2) delay2.delayTime(clamp(delayT * 0.55, 0.01, 1.0));

  // ── 5. Noise ─────────────────────────────────────────────────────────────
  if (brownNoise && ambientOn)
    brownNoise.amp(clamp(activity * _vra.noiseGain, 0, 0.25), ramp);

  // ── 6. Opera osc ─────────────────────────────────────────────────────────
  if (_vra.operaOn) {
    operaOsc.freq(clamp(map(ySig, 0, 1, 880, 160), 80, 1200));
    operaOsc.amp(clamp(spreadSig * 0.25 + lfoPulse * 0.12, 0, 0.45), ramp);
  } else {
    operaOsc.amp(0, ramp);
  }

  // ── 7. Rap osc (gate only — no new freq allocation per frame) ────────────
  if (_vra.rapOn && activity > 0.4) {
    const gate = beatPhase % SP.rapGateLen < floor(SP.rapGateLen / 2);
    rapOsc.amp(gate ? clamp(activity * 0.4, 0, 0.6) : 0, 0.04);
  } else {
    rapOsc.amp(0, ramp);
  }

  // ── 8. Auto note burst — reuses subOsc, NO new oscillator allocation ──────
  // Uses existing subOsc freq jump rather than playNote() which spawns chords
  if (activity > _vra.kickThresh && frameCount - _vra.lastBurst > _vra.burstCooldown) {
    _vra.lastBurst = frameCount;
    if (random() < 0.25) _vra.burstKey = floor(random(DUB_NOTES.length));
    // Direct frequency jump + brief amplitude swell — no new nodes
    const burstFreq = midiToFreq(DUB_NOTES[_vra.burstKey] + SP.oscOctave * 12);
    if (subOsc.started) {
      subOsc._uncBaseFreq = burstFreq;
      subOsc.freq(burstFreq, 0.01);
      subOsc.amp(0.8, 0.01);
      subOsc.amp(clamp(subAmp || 0.3, 0.01, 0.85), SP.subDecay);
    }
    flashAmt = max(flashAmt, 18);
    screenShake = max(screenShake, 3);
    // Scheduled second hit — frame-based, no setTimeout
    _vra._pendingBurst = frameCount + floor(random(4, 14));
    _vra._pendingOffset = floor(random(-4, 5));
  }

  // Deferred second burst (frame-counted, avoids setTimeout oscillator spam)
  if (_vra._pendingBurst && frameCount >= _vra._pendingBurst && _vra.chaosLevel > 0.55) {
    _vra._pendingBurst = 0;
    const f2 = midiToFreq(clamp(DUB_NOTES[_vra.burstKey] + _vra._pendingOffset, 16, 96) + SP.oscOctave * 12);
    if (subOsc.started) { subOsc.freq(f2, 0.015); subOsc.amp(0.6, 0.01); subOsc.amp(0.1, 0.4); }
  }

  // ── 9. Kick on strong peaks ───────────────────────────────────────────────
  if (beatPhase === 0 && activity > _vra.kickThresh * 0.75) triggerKick();

  // ── 10. LFO rate ──────────────────────────────────────────────────────────
  const lfoTarget = clamp(SP.lfoRate * _vra.lfoMult * (0.7 + activity * 0.6), 0.01, 10);
  if (dubLFO) dubLFO.freq(lfoTarget);
  if (lfoOsc) lfoOsc.freq(lfoTarget);
}

// ─── AUDIO ENGINE ─────────────────────────────────────────────────────────────

function updateAudio() {
  if (SP.filterFollow && !visualReactiveAudio) {
    const followCut = map(mouseY, height, 0, 80, 4000);
    lpFilter.freq(followCut);
    hpFilter.freq(map(mouseX, 0, width, 20, 400));
  }

  dubLFO.freq(SP.lfoRate);
  dubLFO.amp(SP.lfoAmp);
  lfoOsc.freq(SP.lfoRate);

  if (SP.lfoTarget === 'volume' && subOsc.started) {
    subOsc.amp((sin(lfoPhase * SP.lfoRate * TWO_PI) + 1) / 2 * 0.4);
  }

  if (echoFeedback) {
    mainDelay.delayTime(map(mouseX, 0, width, 0.05, 0.95));
    delay2.delayTime(map(mouseY, 0, height, 0.05, 0.9));
  }

  if (ambientOn) {
    brownNoise.amp(map(sin(lfoPhase * 0.4), -1, 1, 0.01, SP.noiseAmp), 0.5);
  }

  if (dragPortrait) {
    let freq = map(dragPortrait.displayPos.y, -height / 2, height / 2, 880, 220);
    if (SP.lfoTarget === 'pitch') freq += sin(lfoPhase * SP.lfoRate * 10) * 60;
    operaOsc.freq(freq + sin(frameCount * 0.4) * 50);
    if (beatPhase % SP.rapGateLen < floor(SP.rapGateLen / 2)) {
      rapOsc.amp(SP.rapAmp, 0.02);
      rapOsc.freq(random(28, 72));
    } else {
      rapOsc.amp(0, 0.06);
    }
  }

  if (SP.kickOn && beatPhase === 0) triggerKick();

  if (SP.chorusOn && subOsc.started) {
    subOsc.freq(subOsc.f + sin(lfoPhase * SP.chorusRate * TWO_PI) * SP.chorusDepth * 200);
  }

  updateBinauralDrone();

  if (advancedAudioMode) {
    updateAdvancedAudioSculpting();
  }

  if (depthMode) {
    updateDepthAudioField();
  }

  if (UnCMode) {
    updateUnCAudioField();
  }

  // Visual-Reactive Audio — runs last so it can override anything above
  if (visualReactiveAudio) updateVisualReactiveAudio();
}

function triggerKick() {

  kickOsc.freq(SP.kickPitch); kickOsc.amp(SP.kickAmp,0.01); kickOsc.amp(0,SP.kickDecay);
  setTimeout(()=>{ if(kickOsc.started) kickOsc.freq(SP.kickPitch*0.4); }, 20);
}

function playNote(midiNote) {
  let baseFreq=midiToFreq(midiNote+SP.oscOctave*12) * Math.pow(2,SP.oscDetune/1200);
  subOsc.f = baseFreq;
  subOsc._uncBaseFreq = baseFreq;
  subOsc.freq(baseFreq, SP.subAttack); subOsc.amp(0.85, SP.subAttack); subOsc.amp(0, SP.subDecay);
  subOsc.setType(SP.oscWave);
  // perf: under heavy portrait load, dampen flash/shake/particles
  const _hi = portraits.length > 10;
  flashAmt = max(flashAmt, _hi ? 30 : 60);
  screenShake = max(screenShake, _hi ? 4 : 8);
  noteHistory.push({label:noteLabel(midiNote), freq:baseFreq, age:0});
  if (noteHistory.length>10) noteHistory.shift();
  if (portraits.length>0) random(portraits).triggerNote(1.0);
  _spawnParticles(random(-width/2,width/2), random(-height/2,height/2), 0, _hi ? 5 : 12, 'mercury');
  if (autoChord) {
    (CHORD_OFFSETS[SP.chordType]||[0,3,7]).slice(1).forEach((off,i)=>{
      setTimeout(()=>{
        let chOsc=new p5.Oscillator(SP.oscWave);
        chOsc.connect(lpFilter);
        chOsc.freq(midiToFreq(midiNote+off+SP.oscOctave*12));
        chOsc.amp(0.3,0.02); chOsc.start();
        chOsc.amp(0,SP.subDecay);
        setTimeout(()=>chOsc.stop(), SP.subDecay*1200);
      }, i*30);
    });
  }
}

// ─── ARPEGGIATOR ─────────────────────────────────────────────────────────────
let arpNotes=[], arpStep=0, arpLastMs=0;
function startArp(rootMidi) { arpNotes=buildArpNotes(rootMidi); arpStep=0; arpMode=true; }
function buildArpNotes(root) {
  let base=CHORD_OFFSETS[SP.chordType]||[0,3,7], notes=[];
  for (let oct=0; oct<SP.arpOctaves; oct++) for (let off of base) notes.push(root+off+oct*12);
  let fn=ARP_PATTERNS[SP.arpPattern]; if (fn) notes=fn(notes);
  return notes;
}
function tickArp() {
  let now=millis(); if (now-arpLastMs<SP.arpSpeed) return;
  arpLastMs=now; if (!arpNotes.length) return;
  playNote(arpNotes[arpStep%arpNotes.length]); arpStep++;
  if (arpStep>=arpNotes.length) { arpStep=0; if(SP.arpPattern==='updown') arpNotes=buildArpNotes(arpNotes[0]); }
}

// ─── POEM HELPERS ─────────────────────────────────────────────────────────────
function spawnPoem() {
  floatingPoem=[];
  for (let line of poemLines) floatingPoem.push(makePoemLine(line));
}
function makePoemLine(txt) {
  return { txt, x:random(-width/2.5,width/2.5), y:random(-height/2,height/2),
    z:random(-300,100), alpha:random(140,240), size:random(16,28),
    speed:random(0.3,1.2), phase:random(TWO_PI) };
}
function respawnPoemLine(p) {
  let nl=makePoemLine(random(poemLines)); Object.assign(p,nl);
  p.y=height/2+40; p.alpha=random(140,240);
}

// ─── PORTRAIT GENERATORS ─────────────────────────────────────────────────────
function generatePortraits(count) { portraits=[]; for(let i=0;i<count;i++) addPortrait(); }
function addPortrait() {
  portraits.push(new Portrait(random(-width/3,width/3),random(-height/3,height/3),random(-120,80),random(models)));
}
function removePortrait() { if(portraits.length>0) portraits.pop(); }

// ─── KEYBOARD CONTROLS ────────────────────────────────────────────────────────
function keyPressed() {
  // ── Shift+Q/W/E — DEPTH FIGURE PRESETS (handled FIRST so audio/other errors
  //     can't block the shortcut via the safe() wrapper) ───────────────────────
  if (keyIsDown(SHIFT) && (keyCode === 81 || keyCode === 87 || keyCode === 69)) {
    try {
      if (keyCode === 81) setDepthFiguresPreset('FIGURES');
      if (keyCode === 87) setDepthFiguresPreset('ARCHITECTURE');
      if (keyCode === 69) setDepthFiguresPreset('ORGANISMS');
      flashAmt = max(flashAmt, 60);
    } catch (e) { console.warn('depth preset err', e); }
    return;
  }

  if (!soundStarted) startAudio();
  let k=key.toUpperCase();

  if (key>='0' && key<='9') {
    let idx=int(key); playNote(DUB_NOTES[idx]);
    if (arpMode) startArp(DUB_NOTES[idx]);
    // [2] Mirror Dimension
    if (key === '2') {
      mirrorDimension = !mirrorDimension;
      flashAmt = max(flashAmt, 60);
      screenShake = max(screenShake, 10);
    }
    // [3] Liquid Mercury Skin
    if (key === '3') {
      liquidMercury = !liquidMercury;
      if (!liquidMercury) { mercuryDrops = []; mercuryPool = []; }
    }
    // [4] Click-to-add BG object mode
    if (key === '4') {
      bgClickMode = !bgClickMode;
      // Ensure bg models are loaded when mode is activated
      if (bgClickMode) _loadBgModelsLazy(() => {});
    }
    // [8] without Shift toggles background mix on/off
    if (key === '8' && !keyIsDown(SHIFT)) {
      if (bgMixMode) { bgMixMode=false; bgMixObjects=[]; }
      else           spawnBgMix(false);
    }
    return;
  }

  // Tab key
  if (keyCode===9) {
    let bi=ENTITY_BEHAVIORS.indexOf(entityBehavior);
    entityBehavior=ENTITY_BEHAVIORS[(bi+1)%ENTITY_BEHAVIORS.length];
    return;
  }

  // ── Shift+A — Visual-Reactive Audio Engine ───────────────────────────────
  if (k === 'A' && keyIsDown(SHIFT)) {
    visualReactiveAudio = !visualReactiveAudio;
    if (visualReactiveAudio) {
      if (!soundStarted) startAudio();
      // Randomise a fresh behaviour profile every time it's toggled on
      _vra_randomiseProfile();
      flashAmt = max(flashAmt, 80);
      screenShake = max(screenShake, 12);
    }
    return; // don't fall through to plain 'A' ambient toggle
  }

  switch (k) {
    case 'Q': showPoem=!showPoem; if(showPoem) spawnPoem(); break;
    case 'W': showBloodText=!showBloodText; if(showBloodText) newBloodPoetry(); break;
    case 'E': echoFeedback=!echoFeedback; if(!echoFeedback){mainDelay.delayTime(SP.delayTime);delay2.delayTime(0.12);} break;
    case 'R': generatePortraits(12); flashAmt=80; break;
    case 'T': timeWarp=!timeWarp; break;
    case 'A': ambientOn=!ambientOn; if(!ambientOn) brownNoise.amp(0,0.5); break;
    case 'S': screenShake=30; flashAmt=40; _spawnParticles(0,0,0,20,'blood'); break;
    case 'D': depthFog=!depthFog; break;
    case 'F': frozenRot=!frozenRot; break;
    case 'G': glitchMode=!glitchMode; break;
    case 'H': showHUD=!showHUD; break;
    case 'Z': portraits=[]; particles=[]; floatingPoem=[]; break;
    case 'X':
      for(let p of portraits){let a=random(TWO_PI),f=random(200,500);p.targetPos.x=cos(a)*f;p.targetPos.y=sin(a)*f;p.targetPos.z=random(-200,200);}
      screenShake=25; break;
    case 'C': for(let p of portraits) p.targetPos.set(0,0,0); break;
    case 'V': reverseGrav=!reverseGrav; break;
    case 'B': bloodBurst=!bloodBurst; break;
    case 'N': newBloodPoetry(); showBloodText=true; break;
    case 'M': mirrorMode=!mirrorMode; break;
    case 'P':
      audioPaused=!audioPaused;
      if(audioPaused){subOsc.amp(0,0.2);rapOsc.amp(0,0.2);operaOsc.amp(0,0.2);brownNoise.amp(0,0.2);kickOsc.amp(0,0.2);}
      break;
    case 'I': for(let i=0;i<5;i++) addPortrait(); break;
    case 'O': removePortrait(); break;
    case '+':
      portraitScaleHistory.push(portraits.map((p) => p.saveScaleState()));
      portraits.forEach((p) => p.randomizeScale());
      break;
    case 'L': showLFO=!showLFO; break;
    case 'K': triggerKick(); screenShake=14; flashAmt=35; break;
    case 'J': for(let p of portraits){p.targetPos.x+=random(-300,300);p.targetPos.y+=random(-200,200);p.targetPos.z+=random(-150,150);} screenShake=18; break;
    case 'Y': depthMode=!depthMode; break;
    case 'U': uvMode=!uvMode; if(uvMode) paletteIndex=2; break;
    case '[': bgWeirdness=max(0.25, bgWeirdness-0.12); break;
    case ']': bgWeirdness=min(2.5, bgWeirdness+0.12); break;
    case '{': bgMode=(bgMode+3)%4; UnC_randomizeArchitecture(); break;
    case '}': bgMode=(bgMode+1)%4; UnC_randomizeArchitecture(); break;
    case ' ':
      flashAmt=220; screenShake=22;
      subOsc.freq(MIDI_FREQS[0],0.02); subOsc.amp(1.0,0.01); subOsc.amp(0,1.2);
      _spawnParticles(0,0,0,30,'mercury'); break;
    case 'ENTER': paletteIndex=(paletteIndex+1)%PALETTES.length; break;
    case 'ESCAPE': fullReset(); break;
    // Shift keys for extra visuals
    case '!': showOscilloscope=!showOscilloscope; break;
    case '@': showSpectrogram=!showSpectrogram; break;
    case '#': showNoteHistory=!showNoteHistory; break;
    case '$': bgMixColorMode='multi'; bgMixObjects.forEach(o => { o.cachedRGB = null; }); break;  // [$] multi-colour bg objects
    case '%': portraitTrails=!portraitTrails; break;
    case '^': scanlines=!scanlines; break;
    case '&': showWaveformBg=!showWaveformBg; break;
    case '*':
      // Shift+8 → crazy background mix spawn
      spawnBgMix(true); break;
    case '(':  autoChord=!autoChord; break;
    case ')':  arpMode=!arpMode; if(!arpMode) arpNotes=[]; break;
    // Extension keys
    default:
      if (key===',') { fleshMemory=!fleshMemory; }
      else if (key==='.') { corpusDissolve=!corpusDissolve; }
      else if (key==='/') { entityMode=!entityMode; if(entityMode) for(let i=0;i<3;i++) entities.push(new Entity()); else entities=[]; }
      else if (key===';') { membraneMode=!membraneMode; if(membraneMode) buildTendons(); }
      else if (key==="'") { deadChannel=!deadChannel; channelTimer=0; }
      else if (key==='\\') { triggerPanicMode(); }
      else if (key==='=') { sigilMode=!sigilMode; sigilSeed=floor(random(10000)); }
      else if (key==='-') {
        if (portraitScaleHistory.length > 0) {
          const prevState = portraitScaleHistory.pop();
          portraits.forEach((p, idx) => p.restoreScaleState(prevState[idx]));
        }
      }
      else if (key==='`') { subliminalMode=!subliminalMode; }
      // § — toggle portrait style: plastic ↔ wireframe
      else if (key==='§') {
        portraitStyle = (portraitStyle === 0) ? 1 : 0;
      }
      // < — mix mode: randomly assign wireframe or plastic per portrait
      else if (key==='<') {
        portraitStyle = 2;
        portraits.forEach(p => { p.wireframe = random() > 0.5; });
      }
      // ¨ — cycle bg object colour (single colour mode)
      else if (key==='¨') {
        bgMixColorMode = 'single';
        bgMixColorIdx = (bgMixColorIdx + 1) % BG_MIX_COLORS.length;
        bgMixObjects.forEach(o => { o.cachedRGB = null; });
      }
      break;
  }

  if (keyCode===UP_ARROW && !keyIsDown(SHIFT))    cameraRotX-=0.05;
  if (keyCode===DOWN_ARROW && !keyIsDown(SHIFT))  cameraRotX+=0.05;
  if (keyCode===LEFT_ARROW && !keyIsDown(SHIFT))  cameraRotY-=0.05;
  if (keyCode===RIGHT_ARROW && !keyIsDown(SHIFT)) cameraRotY+=0.05;
}

function updateCameraMovement() {
  if (!cameraPos) return;
  if (!keyIsDown(SHIFT)) return;
  let move = createVector(0, 0, 0);
  const forward = createVector(sin(cameraRotY), 0, -cos(cameraRotY));
  const right = createVector(cos(cameraRotY), 0, sin(cameraRotY));
  if (keyIsDown(UP_ARROW))    move.add(forward);
  if (keyIsDown(DOWN_ARROW))  move.sub(forward);
  if (keyIsDown(LEFT_ARROW))  move.sub(right);
  if (keyIsDown(RIGHT_ARROW)) move.add(right);
  if (move.magSq() > 0) {
    move.normalize().mult(cameraMoveSpeed);
    cameraPos.add(move);
  }
}

function newBloodPoetry() { bloodPoetry=random(subjects)+" "+random(verbs)+" "+random(objects); }

function startAudio() {
  userStartAudio();
  subOsc.start(); brownNoise.start(); rapOsc.start(); operaOsc.start();
  noiseOsc.start(); kickOsc.start(); lfoOsc.start(); chorusOsc.start();
  brownNoise.amp(SP.noiseAmp, 0.5);
  soundStarted=true;
  if (typeof setupAdvancedAudioSystems === 'function') setupAdvancedAudioSystems();
}

function fullReset() {
  paletteIndex=0; cameraRotX=0; cameraRotY=0; screenShake=0; flashAmt=0;
  glitchMode=depthFog=frozenRot=timeWarp=reverseGrav=bloodBurst=mirrorMode=uvMode=false;
  showPoem=showBloodText=showLFO=showOscilloscope=showSpectrogram=showNoteHistory=false;
  portraitTrails=starField=scanlines=echoFeedback=arpMode=autoChord=showWaveformBg=false;
  bgMixMode=false; bgMixCrazy=false; bgMixObjects=[];
  portraitStyle=0; bgMixColorIdx=0; bgMixColorMode='single';
  mirrorDimension=false; liquidMercury=false; bgClickMode=false;
  mercuryDrops=[]; mercuryPool=[];
  visualReactiveAudio=false;
  // Extension resets
  fleshMemory=corpusDissolve=membraneMode=deadChannel=panicMode=false;
  sigilMode=binauralDrone=subliminalMode=entityMode=wordVomitMode=false;
  clockworkMode=errorMode=breathingRoom=staticGodMode=false;
  depthMode=UnCMode=advancedAudioMode=true;
  bgMode=0; bgWeirdness=1.0; bgDensity=1.0; bgDrift=1.0; bgPulse=1.0;
  entities=[]; fleshImprints=[]; dissolvePixels=[];
  tendons=[]; wordExplosions=[]; errorDialogs=[];
  stopBinauralDrone();
  showHUD=true; particles=[]; floatingPoem=[]; noteHistory=[]; arpNotes=[];
  generatePortraits(12);
  SP.oscWave='sine'; SP.oscDetune=0; SP.oscOctave=0; SP.lfoRate=0.3;
  SP.lpfCutoff=800; SP.lpfRes=1.0; SP.delayTime=0.5; SP.delayFeedback=0.7;
  SP.noiseAmp=0.04; SP.kickPitch=55; SP.kickDecay=0.3; SP.distortOn=false;
  SP.chorusOn=false; SP.bitCrushOn=false; SP.chordType='minor'; SP.arpPattern='up'; SP.arpSpeed=400;
  rebuildSoundPanelValues();
}

// ─── MOUSE CONTROLS ──────────────────────────────────────────────────────────
function mousePressed() {
  if (!soundStarted) startAudio();
  let target=portraits.find(p=>dist(mouseX-width/2,mouseY-height/2,p.displayPos.x,p.displayPos.y)<110);
  if (target) {
    dragPortrait=target; dragPortrait.dragging=true;
    let lm=createVector(mouseX-width/2,mouseY-height/2);
    dragPortrait.dragOffset=p5.Vector.sub(dragPortrait.targetPos,lm);
    operaOsc.amp(SP.operaAmp,0.1); noiseOsc.amp(0.18,0.1); newBloodPoetry();
  } else if (bgClickMode) {
    // No portrait hit — place a bg folder-1 model at click position
    _loadBgModelsLazy(() => _spawnOneBgObjAt(mouseX, mouseY));
  }
}
function mouseReleased() {
  if (dragPortrait) {
    dragPortrait.dragging=false; dragPortrait=null;
    operaOsc.amp(0,0.9); rapOsc.amp(0,0.9); noiseOsc.amp(0,0.9); screenShake=0;
  }
}
function doubleClicked() {
  _spawnParticles(mouseX-width/2,mouseY-height/2,0,30,'blood');
  _spawnParticles(mouseX-width/2,mouseY-height/2,0,10,'spark');
  newBloodPoetry(); showBloodText=true; screenShake=10;
  portraits.push(new Portrait(mouseX-width/2,mouseY-height/2,0,random(models)));
}
function mouseWheel(event) {
  if (event.altKey && cameraPos) {
    cameraPos.z += event.delta * 0.35;
    return false;
  }
  SP.masterVol=clamp(SP.masterVol-event.delta*0.001,0,1);
  if (soundStarted) outputVolume(SP.masterVol,0.1);
  updateSliderById('sp_masterVol',SP.masterVol);
}
function windowResized() { resizeCanvas(windowWidth,windowHeight); }

// ═══════════════════════════════════════════════════════════════════════════════
// ─── SOUND CONTROL PANEL ─────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
let soundPanelEl=null, soundPanelSliders={};

function buildSoundPanel() {
  let baseStyle=`background:rgba(10,10,12,0.92);border:1px solid #333;font-family:monospace;font-size:10px;color:#c0c0c0;padding:10px 12px 14px 12px;z-index:998;position:fixed;right:20px;top:20px;width:280px;max-height:92vh;overflow-y:auto;border-radius:3px;scrollbar-width:thin;scrollbar-color:#444 #111;`;
  soundPanelEl=createDiv(''); soundPanelEl.attribute('id','soundPanel'); soundPanelEl.style(baseStyle);
  addPanelHeader(soundPanelEl,'// SOUND ENGINE v3.1');

  addPanelSection(soundPanelEl,'OSCILLATOR');
  addWaveSelector(soundPanelEl,'oscWave','WAVEFORM',['sine','square','sawtooth','triangle'],(v)=>{SP.oscWave=v;if(subOsc.started)subOsc.setType(v);});
  addPanelSlider(soundPanelEl,'sp_oscDetune','DETUNE (cents)',-100,100,0,1,(v)=>{SP.oscDetune=v;});
  addPanelSlider(soundPanelEl,'sp_oscOctave','OCTAVE SHIFT',-2,2,0,1,(v)=>{SP.oscOctave=v;});
  addPanelSlider(soundPanelEl,'sp_subAttack','ATTACK (s)',0.001,2,0.04,0.001,(v)=>{SP.subAttack=v;});
  addPanelSlider(soundPanelEl,'sp_subDecay','DECAY (s)',0.05,4,0.9,0.01,(v)=>{SP.subDecay=v;});

  addPanelSection(soundPanelEl,'FILTERS');
  addPanelSlider(soundPanelEl,'sp_lpfCutoff','LPF CUTOFF (Hz)',40,8000,800,1,(v)=>{SP.lpfCutoff=v;if(!SP.filterFollow)lpFilter.freq(v);});
  addPanelSlider(soundPanelEl,'sp_lpfRes','LPF RESONANCE',0.1,20,1.0,0.1,(v)=>{SP.lpfRes=v;lpFilter.res(v);});
  addPanelSlider(soundPanelEl,'sp_hpfCutoff','HPF CUTOFF (Hz)',10,2000,60,1,(v)=>{SP.hpfCutoff=v;hpFilter.freq(v);});
  addToggleButton(soundPanelEl,'MOUSE→FILTER',()=>SP.filterFollow,()=>{SP.filterFollow=!SP.filterFollow;});

  addPanelSection(soundPanelEl,'DELAY / ECHO');
  addPanelSlider(soundPanelEl,'sp_delayTime','DELAY TIME (s)',0.01,1.2,0.5,0.01,(v)=>{SP.delayTime=v;mainDelay.delayTime(v);});
  addPanelSlider(soundPanelEl,'sp_delayFeedback','DELAY FEEDBACK',0,0.98,0.7,0.01,(v)=>{SP.delayFeedback=v;mainDelay.feedback(v);});

  addPanelSection(soundPanelEl,'LFO');
  addPanelSlider(soundPanelEl,'sp_lfoRate','LFO RATE (Hz)',0.01,20,0.3,0.01,(v)=>{SP.lfoRate=v;dubLFO.freq(v);lfoOsc.freq(v);});
  addPanelSlider(soundPanelEl,'sp_lfoAmp','LFO DEPTH',0,400,80,1,(v)=>{SP.lfoAmp=v;dubLFO.amp(v);});
  addLFOTargetSelector(soundPanelEl);

  addPanelSection(soundPanelEl,'NOISE LAYER');
  addNoiseTypeSelector(soundPanelEl);
  addPanelSlider(soundPanelEl,'sp_noiseAmp','NOISE AMP',0,0.3,0.04,0.001,(v)=>{SP.noiseAmp=v;if(ambientOn)brownNoise.amp(v,0.1);});

  addPanelSection(soundPanelEl,'KICK DRUM');
  addPanelSlider(soundPanelEl,'sp_kickPitch','KICK PITCH (Hz)',20,200,55,1,(v)=>{SP.kickPitch=v;});
  addPanelSlider(soundPanelEl,'sp_kickDecay','KICK DECAY (s)',0.05,2,0.3,0.01,(v)=>{SP.kickDecay=v;});
  addPanelSlider(soundPanelEl,'sp_kickAmp','KICK AMP',0,1.5,0.7,0.01,(v)=>{SP.kickAmp=v;});
  addToggleButton(soundPanelEl,'KICK ON/OFF',()=>SP.kickOn,()=>{SP.kickOn=!SP.kickOn;});

  addPanelSection(soundPanelEl,'CHORUS');
  addToggleButton(soundPanelEl,'CHORUS ON/OFF',()=>SP.chorusOn,()=>{SP.chorusOn=!SP.chorusOn;});
  addPanelSlider(soundPanelEl,'sp_chorusDepth','CHORUS DEPTH',0,0.02,0.002,0.0001,(v)=>{SP.chorusDepth=v;});
  addPanelSlider(soundPanelEl,'sp_chorusRate','CHORUS RATE',0.1,8,0.8,0.01,(v)=>{SP.chorusRate=v;});

  addPanelSection(soundPanelEl,'DISTORTION');
  addToggleButton(soundPanelEl,'DISTORT ON/OFF',()=>SP.distortOn,()=>{SP.distortOn=!SP.distortOn;});
  addPanelSlider(soundPanelEl,'sp_distortAmt','DISTORT AMT',0,1,0,0.01,(v)=>{SP.distortAmt=v;});

  addPanelSection(soundPanelEl,'BINAURAL DRONE');
  addToggleButton(soundPanelEl,'BINAURAL ON/OFF',()=>binauralDrone,()=>{binauralDrone=!binauralDrone;binauralDrone?startBinauralDrone():stopBinauralDrone();});
  addPanelSlider(soundPanelEl,'sp_binauralFreq','BEAT FREQ (Hz)',1,80,40,0.5,(v)=>{binauralFreq=v;});

  addPanelSection(soundPanelEl,'ARPEGGIATOR');
  addToggleButton(soundPanelEl,'ARP ON/OFF',()=>arpMode,()=>{arpMode=!arpMode;if(arpMode)startArp(DUB_NOTES[0]);else arpNotes=[];});
  addPanelSlider(soundPanelEl,'sp_arpSpeed','ARP SPEED (ms)',50,800,400,5,(v)=>{SP.arpSpeed=v;});
  addPanelSlider(soundPanelEl,'sp_arpOctaves','ARP OCTAVES',1,4,2,1,(v)=>{SP.arpOctaves=v;});
  addArpPatternSelector(soundPanelEl);

  addPanelSection(soundPanelEl,'CHORD MODE');
  addToggleButton(soundPanelEl,'CHORD ON/OFF',()=>autoChord,()=>{autoChord=!autoChord;});
  addChordTypeSelector(soundPanelEl);

  addPanelSection(soundPanelEl,'OPERA / RAP OSC');
  addPanelSlider(soundPanelEl,'sp_operaAmp','OPERA AMP',0,1,0.45,0.01,(v)=>{SP.operaAmp=v;});
  addPanelSlider(soundPanelEl,'sp_rapAmp','RAP AMP',0,1,0.5,0.01,(v)=>{SP.rapAmp=v;});
  addPanelSlider(soundPanelEl,'sp_rapGate','RAP GATE',1,16,3,1,(v)=>{SP.rapGateLen=v;});

  addPanelSection(soundPanelEl,'MASTER');
  addPanelSlider(soundPanelEl,'sp_masterVol','MASTER VOL',0,1,0.6,0.01,(v)=>{SP.masterVol=v;if(soundStarted)outputVolume(v,0.1);});

  buildAdvancedSoundPanel(soundPanelEl);

  let togglePanelBtn=createButton('// SOUND PANEL');
  togglePanelBtn.style(`position:fixed;right:310px;top:20px;background:#0a0a0c;color:#888;border:1px solid #333;font-family:monospace;font-size:9px;padding:3px 6px;cursor:pointer;z-index:999;`);
  togglePanelBtn.mousePressed(()=>{showSoundPanel=!showSoundPanel;soundPanelEl.style('display',showSoundPanel?'block':'none');});
}

// ─── PANEL UI PRIMITIVES ──────────────────────────────────────────────────────
function addPanelHeader(parent,label) {
  let h=createP(label); h.parent(parent);
  h.style('color:#c0c0d8;font-family:monospace;font-size:11px;font-weight:bold;margin:0 0 8px 0;padding:0 0 6px 0;letter-spacing:0.1em;border-bottom:1px solid #333;');
}
function addPanelSection(parent,label) {
  let s=createP(label); s.parent(parent);
  s.style('color:#888;font-family:monospace;font-size:9px;font-weight:bold;margin:10px 0 4px 0;padding:0 0 3px 0;letter-spacing:0.15em;border-bottom:1px solid #222;');
}
function addPanelSlider(parent,id,label,lo,hi,val,step,onChange) {
  let row=createDiv(''); row.parent(parent); row.style('margin-bottom:4px;');
  let lbl=createP(label+':'); lbl.parent(row); lbl.style('color:#888;font-family:monospace;font-size:9px;margin:0 0 2px 0;padding:0;');
  let inner=createDiv(''); inner.parent(row); inner.style('display:flex;align-items:center;gap:6px;');
  let slider=createSlider(lo,hi,val,step); slider.attribute('id',id); slider.parent(inner);
  slider.style('-webkit-appearance:none;width:180px;height:3px;background:#333;outline:none;cursor:pointer;accent-color:#c0c0c0;');
  let valLbl=createSpan(nf(val,1,3)); valLbl.parent(inner); valLbl.style('color:#c0c0c0;font-family:monospace;font-size:9px;min-width:40px;');
  soundPanelSliders[id]={slider,valLbl,lo,hi,step};
  slider.input(()=>{let v=parseFloat(slider.value());valLbl.html(nf(v,1,3));onChange(v);});
}
function addWaveSelector(parent,spKey,label,waves,onChange) {
  let row=createDiv(''); row.parent(parent); row.style('margin-bottom:5px;');
  let lbl=createP(label+':'); lbl.parent(row); lbl.style('color:#888;font-family:monospace;font-size:9px;margin:0 0 3px 0;padding:0;');
  let btns=createDiv(''); btns.parent(row); btns.style('display:flex;gap:4px;flex-wrap:wrap;');
  for (let w of waves) {
    let b=createButton(w.toUpperCase()); b.parent(btns); b.style(btnStyle(SP[spKey]===w));
    b.mousePressed(()=>{SP[spKey]=w;onChange(w);btns.elt.querySelectorAll('button').forEach(btn=>{btn.style.borderColor=btn.textContent.toLowerCase()===w?'#c0c0d8':'#333';btn.style.color=btn.textContent.toLowerCase()===w?'#fff':'#666';});});
  }
}
function addLFOTargetSelector(parent) {
  let targets=['filter','pitch','volume','delay'];
  let row=createDiv(''); row.parent(parent); row.style('margin-bottom:5px;');
  let lbl=createP('LFO TARGET:'); lbl.parent(row); lbl.style('color:#888;font-family:monospace;font-size:9px;margin:0 0 3px 0;padding:0;');
  let btns=createDiv(''); btns.parent(row); btns.style('display:flex;gap:4px;flex-wrap:wrap;');
  for (let t of targets) {
    let b=createButton(t.toUpperCase()); b.parent(btns); b.style(btnStyle(SP.lfoTarget===t));
    b.mousePressed(()=>{SP.lfoTarget=t;btns.elt.querySelectorAll('button').forEach(btn=>{btn.style.borderColor=btn.textContent.toLowerCase()===t?'#c0c0d8':'#333';btn.style.color=btn.textContent.toLowerCase()===t?'#fff':'#666';});});
  }
}
function addNoiseTypeSelector(parent) {
  let types=['brown','white','pink'];
  let row=createDiv(''); row.parent(parent); row.style('margin-bottom:5px;');
  let lbl=createP('NOISE TYPE:'); lbl.parent(row); lbl.style('color:#888;font-family:monospace;font-size:9px;margin:0 0 3px 0;padding:0;');
  let btns=createDiv(''); btns.parent(row); btns.style('display:flex;gap:4px;');
  for (let t of types) {
    let b=createButton(t.toUpperCase()); b.parent(btns); b.style(btnStyle(SP.noiseType===t));
    b.mousePressed(()=>{
      SP.noiseType=t;
      if (soundStarted) {
        let wa=ambientOn; brownNoise.stop(); brownNoise=new p5.Noise(t); noiseOsc=brownNoise;
        brownNoise.disconnect(); brownNoise.connect(lpFilter); brownNoise.start();
        if(wa) brownNoise.amp(SP.noiseAmp,0.2);
      }
      btns.elt.querySelectorAll('button').forEach(btn=>{btn.style.borderColor=btn.textContent.toLowerCase()===t?'#c0c0d8':'#333';btn.style.color=btn.textContent.toLowerCase()===t?'#fff':'#666';});
    });
  }
}
function addArpPatternSelector(parent) {
  let patterns=['up','down','updown','random'];
  let row=createDiv(''); row.parent(parent); row.style('margin-bottom:5px;');
  let lbl=createP('ARP PATTERN:'); lbl.parent(row); lbl.style('color:#888;font-family:monospace;font-size:9px;margin:0 0 3px 0;padding:0;');
  let btns=createDiv(''); btns.parent(row); btns.style('display:flex;gap:4px;flex-wrap:wrap;');
  for (let t of patterns) {
    let b=createButton(t.toUpperCase()); b.parent(btns); b.style(btnStyle(SP.arpPattern===t));
    b.mousePressed(()=>{SP.arpPattern=t;if(arpNotes.length>0)startArp(arpNotes[0]);btns.elt.querySelectorAll('button').forEach(btn=>{btn.style.borderColor=btn.textContent.toLowerCase()===t?'#c0c0d8':'#333';btn.style.color=btn.textContent.toLowerCase()===t?'#fff':'#666';});});
  }
}
function addChordTypeSelector(parent) {
  let chords=Object.keys(CHORD_OFFSETS);
  let row=createDiv(''); row.parent(parent); row.style('margin-bottom:5px;');
  let lbl=createP('CHORD TYPE:'); lbl.parent(row); lbl.style('color:#888;font-family:monospace;font-size:9px;margin:0 0 3px 0;padding:0;');
  let btns=createDiv(''); btns.parent(row); btns.style('display:flex;gap:4px;flex-wrap:wrap;');
  for (let t of chords) {
    let b=createButton(t.toUpperCase()); b.parent(btns); b.style(btnStyle(SP.chordType===t));
    b.mousePressed(()=>{SP.chordType=t;btns.elt.querySelectorAll('button').forEach(btn=>{btn.style.borderColor=btn.textContent.toLowerCase()===t?'#c0c0d8':'#333';btn.style.color=btn.textContent.toLowerCase()===t?'#fff':'#666';});});
  }
}
function addToggleButton(parent,label,stateGetter,fn) {
  let b=createButton(label); b.parent(parent); b.style(btnToggleStyle(stateGetter()));
  b.mousePressed(()=>{fn();b.style(btnToggleStyle(stateGetter()));});
  b.style('margin-bottom:4px;');
}
function btnStyle(active) {
  return `background:${active?'#1e1e28':'#111'};color:${active?'#fff':'#666'};border:1px solid ${active?'#c0c0d8':'#333'};font-family:monospace;font-size:9px;padding:3px 7px;cursor:pointer;letter-spacing:0.05em;`;
}
function btnToggleStyle(active) {
  return `background:${active?'#1a1a22':'#0d0d10'};color:${active?'#c0c0d8':'#555'};border:1px solid ${active?'#555':'#222'};font-family:monospace;font-size:9px;padding:3px 10px;cursor:pointer;display:block;width:100%;text-align:left;`;
}
function updateSliderById(id,val) {
  if (soundPanelSliders[id]) { soundPanelSliders[id].slider.value(val); soundPanelSliders[id].valLbl.html(nf(val,1,3)); }
}
function rebuildSoundPanelValues() {
  let m={'sp_oscDetune':SP.oscDetune,'sp_oscOctave':SP.oscOctave,'sp_subAttack':SP.subAttack,'sp_subDecay':SP.subDecay,'sp_lpfCutoff':SP.lpfCutoff,'sp_lpfRes':SP.lpfRes,'sp_hpfCutoff':SP.hpfCutoff,'sp_delayTime':SP.delayTime,'sp_delayFeedback':SP.delayFeedback,'sp_lfoRate':SP.lfoRate,'sp_lfoAmp':SP.lfoAmp,'sp_noiseAmp':SP.noiseAmp,'sp_kickPitch':SP.kickPitch,'sp_kickDecay':SP.kickDecay,'sp_kickAmp':SP.kickAmp,'sp_chorusDepth':SP.chorusDepth,'sp_chorusRate':SP.chorusRate,'sp_distortAmt':SP.distortAmt,'sp_arpSpeed':SP.arpSpeed,'sp_arpOctaves':SP.arpOctaves,'sp_operaAmp':SP.operaAmp,'sp_rapAmp':SP.rapAmp,'sp_rapGate':SP.rapGateLen,'sp_masterVol':SP.masterVol,'sp_binauralFreq':binauralFreq};
  for (let [id,val] of Object.entries(m)) updateSliderById(id,val);
}

// ─── LEFT PANEL UI ────────────────────────────────────────────────────────────
function buildUI() {
  let bStyle=`background:#0d0d10;color:#888;border:1px solid #2a2a2a;font-family:monospace;font-size:9px;padding:3px 7px;cursor:pointer;margin-bottom:2px;display:block;width:140px;text-align:left;letter-spacing:0.05em;`;
  let panelDiv=createDiv(''); panelDiv.position(20,20);
  panelDiv.style('display:flex;flex-direction:column;gap:0px;z-index:997;position:fixed;');
  const btn=(label,fn)=>{ let b=createButton(label); b.style(bStyle); b.parent(panelDiv); b.mousePressed(fn); return b; };
  btn('[Q] COLD_POETRY',   ()=>{ showPoem=!showPoem; if(showPoem) spawnPoem(); });
  btn('[W] BLOOD_OVERLAY', ()=>{ showBloodText=!showBloodText; if(showBloodText) newBloodPoetry(); });
  btn('[N] NEW_LINE',      ()=>{ newBloodPoetry(); showBloodText=true; });
  btn('[R] REGENERATE',    ()=>{ generatePortraits(12); flashAmt=80; });
  btn('[Z] PURGE_SPACE',   ()=>{ portraits=[]; particles=[]; floatingPoem=[]; });
  btn('[I] ADD_PORTRAITS', ()=>{ for(let i=0;i<5;i++) addPortrait(); });
  btn('[O] REMOVE_ONE',    ()=>removePortrait());
  btn('[S] SEISMIC',       ()=>{ screenShake=30; flashAmt=40; _spawnParticles(0,0,0,20,'blood'); });
  btn('[X] EXPLODE',       ()=>{ for(let p of portraits){let a=random(TWO_PI),f=random(200,500);p.targetPos.set(cos(a)*f,sin(a)*f,random(-200,200));} screenShake=25; });
  btn('[C] COLLAPSE',      ()=>{ for(let p of portraits) p.targetPos.set(0,0,0); });
  btn('[K] KICK',          ()=>{ if(!soundStarted)return; triggerKick(); screenShake=14; flashAmt=35; });
  btn('[J] JITTER',        ()=>{ for(let p of portraits){p.targetPos.x+=random(-300,300);p.targetPos.y+=random(-200,200);} screenShake=18; });
  btn('[SPACE] FLASH',     ()=>{ flashAmt=220; screenShake=22; if(soundStarted){subOsc.freq(MIDI_FREQS[0],0.02);subOsc.amp(1.0,0.01);subOsc.amp(0,1.2);} _spawnParticles(0,0,0,30,'mercury'); });
  btn('[ENTER] PALETTE++', ()=>{ paletteIndex=(paletteIndex+1)%PALETTES.length; });
  btn('[ESC] FULL_RESET',  ()=>fullReset());
  btn('[Y] DEPTH_MODE',    ()=>{ depthMode=!depthMode; });
  btn('[REC] RECORD',      ()=>{ toggleScreenRecording(); });
  createDiv('──────────────').parent(panelDiv).style('color:#333;font-family:monospace;font-size:9px;margin:4px 0;');

  let col2=createDiv(''); col2.position(170,20);
  col2.style('display:flex;flex-direction:column;gap:0px;z-index:997;position:fixed;');
  const tog=(label,fn)=>{ let b=createButton(label); b.style(bStyle); b.parent(col2); b.mousePressed(fn); return b; };

  // Original toggles
  tog('[G] GLITCH',       ()=>{ glitchMode=!glitchMode; });
  tog('[M] MIRROR',       ()=>{ mirrorMode=!mirrorMode; });
  tog('[D] DEPTH_FOG',    ()=>{ depthFog=!depthFog; });
  tog('[U] UV_SHIFT',     ()=>{ uvMode=!uvMode; if(uvMode)paletteIndex=2; });
  tog('[F] FREEZE_ROT',   ()=>{ frozenRot=!frozenRot; });
  tog('[T] TIME_WARP',    ()=>{ timeWarp=!timeWarp; });
  tog('[V] REV_GRAV',     ()=>{ reverseGrav=!reverseGrav; });
  tog('[B] BLOOD_BURST',  ()=>{ bloodBurst=!bloodBurst; });
  tog('[L] LFO_SCOPE',    ()=>{ showLFO=!showLFO; });
  tog('[E] ECHO_LOOP',    ()=>{ echoFeedback=!echoFeedback; });
  tog('[A] AMBIENT',      ()=>{ ambientOn=!ambientOn; if(!ambientOn)brownNoise.amp(0,0.5); });
  tog('[H] HUD',          ()=>{ showHUD=!showHUD; });
  tog('[P] PAUSE_AUDIO',  ()=>{ audioPaused=!audioPaused; if(audioPaused){subOsc.amp(0,0.2);rapOsc.amp(0,0.2);operaOsc.amp(0,0.2);brownNoise.amp(0,0.2);} });
  tog('OSCILLOSCOPE',     ()=>{ showOscilloscope=!showOscilloscope; });
  tog('SPECTROGRAM',      ()=>{ showSpectrogram=!showSpectrogram; });
  tog('NOTE_HISTORY',     ()=>{ showNoteHistory=!showNoteHistory; });
  tog('STAR_FIELD',       ()=>{ starField=!starField; });
  tog('PORT_TRAILS',      ()=>{ portraitTrails=!portraitTrails; });
  tog('SCANLINES',        ()=>{ scanlines=!scanlines; });
  tog('WAVE_BG',          ()=>{ showWaveformBg=!showWaveformBg; });
  tog('VIGNETTE',         ()=>{ vignette=!vignette; });

  createDiv('──────────────').parent(col2).style('color:#333;font-family:monospace;font-size:9px;margin:4px 0;');

  // Extension toggles
  tog('[,] FLESH_MEM',    ()=>{ fleshMemory=!fleshMemory; });
  tog('[.] CORPUS_DISS',  ()=>{ corpusDissolve=!corpusDissolve; });
  tog('[/] ENTITIES',     ()=>{ entityMode=!entityMode; if(entityMode)for(let i=0;i<3;i++)entities.push(new Entity());else entities=[]; });
  tog('[;] MEMBRANE',     ()=>{ membraneMode=!membraneMode; if(membraneMode)buildTendons(); });
  tog("['] DEAD_CH",      ()=>{ deadChannel=!deadChannel; channelTimer=0; });
  tog('[\\] PANIC_MODE',  ()=>{ triggerPanicMode(); });
  tog('[=] SIGIL_MODE',   ()=>{ sigilMode=!sigilMode; sigilSeed=floor(random(10000)); });
  tog('[-] BINAURAL',     ()=>{ binauralDrone=!binauralDrone; binauralDrone?startBinauralDrone():stopBinauralDrone(); });
  tog('[`] SUBLIMINAL',   ()=>{ subliminalMode=!subliminalMode; });
  tog('WORD_VOMIT',       ()=>{ wordVomitMode=!wordVomitMode; });
  tog('CLOCKWORK',        ()=>{ clockworkMode=!clockworkMode; });
  tog('ERROR_DIALOGS',    ()=>{ errorMode=!errorMode; });
  tog('BREATHING_ROOM',   ()=>{ breathingRoom=!breathingRoom; });
  tog('STATIC_GOD_PORT',  ()=>{ staticGodMode=!staticGodMode; });
  tog('[TAB] ENTITY_BHV', ()=>{ let bi=ENTITY_BEHAVIORS.indexOf(entityBehavior);entityBehavior=ENTITY_BEHAVIORS[(bi+1)%ENTITY_BEHAVIORS.length]; });

  createDiv('──────────────').parent(col2).style('color:#333;font-family:monospace;font-size:9px;margin:4px 0;');

  // New features
  tog('[2] MIRROR_DIM',   ()=>{ mirrorDimension=!mirrorDimension; flashAmt=max(flashAmt,60); screenShake=max(screenShake,10); });
  tog('[3] LIQ_MERCURY',  ()=>{ liquidMercury=!liquidMercury; if(!liquidMercury){mercuryDrops=[];mercuryPool=[];} });
  tog('[4] BG_CLICK_MODE',()=>{ bgClickMode=!bgClickMode; if(bgClickMode) _loadBgModelsLazy(()=>{}); });
  tog('[Sh+A] VIS_REACT', ()=>{ visualReactiveAudio=!visualReactiveAudio; if(visualReactiveAudio){if(!soundStarted)startAudio();_vra_randomiseProfile();flashAmt=max(flashAmt,80);screenShake=max(screenShake,12);} });

  buildBgObjectsPanel();
}

// ─── BG OBJECTS CONTROL PANEL ────────────────────────────────────────────────
function buildBgObjectsPanel() {
  const MODEL_SHORT_NAMES = ['19_11', '29_03', 'BFLY_TREE', 'CACTUS', 'DISH'];

  // Panel container — fixed bottom-left, scrollable
  let panel = createDiv('');
  panel.attribute('id', 'bgObjectsPanel');
  panel.style(`
    position:fixed; left:20px; bottom:20px; width:260px;
    max-height:70vh; overflow-y:auto;
    background:rgba(8,8,12,0.93); border:1px solid #2a2a35;
    font-family:monospace; font-size:9px; color:#aaa;
    padding:10px 12px 14px 12px; z-index:996;
    scrollbar-width:thin; scrollbar-color:#333 #111;
  `);

  // ── Header + toggle button ──
  let header = createDiv('// BG_OBJECTS ENGINE');
  header.parent(panel);
  header.style('color:#c0c0d8;font-size:10px;font-weight:bold;margin:0 0 8px 0;padding:0 0 6px 0;border-bottom:1px solid #2a2a35;letter-spacing:0.1em;');

  let toggleBtn = createButton('// BG OBJECTS');
  toggleBtn.style(`position:fixed;left:290px;bottom:20px;background:#0a0a0c;color:#888;
    border:1px solid #333;font-family:monospace;font-size:9px;padding:3px 6px;cursor:pointer;z-index:997;`);
  let panelVisible = true;
  toggleBtn.mousePressed(() => {
    panelVisible = !panelVisible;
    panel.style('display', panelVisible ? 'block' : 'none');
  });

  // ── FULLSCREEN BUTTON (next to BG OBJECTS) ──────────────────────────────────
  let fsBtn = createButton('// FULLSCREEN');
  fsBtn.style(`position:fixed;left:420px;bottom:20px;background:#0a0a0c;color:#888;
    border:1px solid #333;font-family:monospace;font-size:9px;padding:3px 6px;cursor:pointer;z-index:997;`);
  fsBtn.mousePressed(() => {
    const fs = !fullscreen();
    fullscreen(fs);
    fsBtn.html(fs ? '// EXIT FULLSCREEN' : '// FULLSCREEN');
  });

  // ── PERFORM MODE BUTTON (hides all UI for clean performance view) ──────────
  let perfBtn = createButton('// PERFORM');
  perfBtn.style(`position:fixed;right:20px;bottom:20px;background:#0a0a0c;color:#c0c0d8;
    border:1px solid #444;font-family:monospace;font-size:9px;padding:3px 6px;cursor:pointer;z-index:997;`);
  let performMode = false;
  window._performToggle = () => {
    performMode = !performMode;
    const disp = performMode ? 'none' : '';
    // hide every UI panel/button except the perform button itself
    document.querySelectorAll('button, .p5Canvas + div, [id$="Panel"], [id^="sp_"]').forEach(el => {
      if (el === perfBtn.elt) return;
      el.style.display = disp;
    });
    // also toggle HUD
    if (typeof showHUD !== 'undefined') showHUD = !performMode;
    perfBtn.html(performMode ? '// EXIT PERFORM' : '// PERFORM');
    perfBtn.style('color', performMode ? '#ff6688' : '#c0c0d8');
  };
  perfBtn.mousePressed(window._performToggle);

  // ── Helper: section label ──
  const sec = (label) => {
    let s = createP(label); s.parent(panel);
    s.style('color:#666;font-size:8px;font-weight:bold;margin:10px 0 4px 0;padding:0 0 3px 0;letter-spacing:0.15em;border-bottom:1px solid #1e1e26;');
  };

  // ── Helper: slider row ──
  const sldr = (label, lo, hi, val, step, onChange) => {
    let row = createDiv(''); row.parent(panel); row.style('margin-bottom:5px;');
    let top = createDiv(''); top.parent(row); top.style('display:flex;justify-content:space-between;margin-bottom:2px;');
    let lbl = createSpan(label); lbl.parent(top); lbl.style('color:#888;');
    let valLbl = createSpan(nf(val, 1, step < 1 ? 2 : 0)); valLbl.parent(top); valLbl.style('color:#c0c0d8;');
    let sl = createSlider(lo, hi, val, step); sl.parent(row);
    sl.style('width:100%;accent-color:#555;');
    sl.input(() => { let v = sl.value(); valLbl.html(nf(v, 1, step < 1 ? 2 : 0)); onChange(v); });
    return sl;
  };

  // ── Helper: toggle button row ──
  const togRow = (label, getVal, onToggle) => {
    let b = createButton('');  b.parent(panel);
    const refresh = () => {
      let on = getVal();
      b.html(label + ':  ' + (on ? 'ON' : 'OFF'));
    };
    refresh();
    b.style('background:#0d0d10;color:#aaa;border:1px solid #222;font-family:monospace;font-size:9px;padding:3px 8px;cursor:pointer;display:block;width:100%;text-align:left;margin-bottom:3px;');
    b.mousePressed(() => { onToggle(); refresh(); });
  };

  // ── Helper: colour picker row ──
  const colorPick = (label, defaultHex, onChange) => {
    let row = createDiv(''); row.parent(panel); row.style('display:flex;align-items:center;gap:8px;margin-bottom:4px;');
    let lbl = createSpan(label); lbl.parent(row); lbl.style('color:#888;flex:1;');
    let cp = createColorPicker(defaultHex); cp.parent(row);
    cp.style('width:36px;height:20px;border:none;background:none;cursor:pointer;padding:0;');
    cp.input(() => {
      let c = cp.color();
      onChange([red(c), green(c), blue(c)]);
    });
    return cp;
  };

  // ══ SPAWN CONTROLS ══
  sec('SPAWN');

  sldr('COUNT', 1, 30, BGP.count, 1, v => { BGP.count = v; });
  sldr('SCALE MIN', 0.05, 4.0, BGP.scaleMin, 0.05, v => { BGP.scaleMin = v; });
  sldr('SCALE MAX', 0.05, 8.0, BGP.scaleMax, 0.05, v => { BGP.scaleMax = v; });
  sldr('DEPTH NEAR (Z)', -5000, -100, BGP.depthMin, 50, v => { BGP.depthMin = v; });
  sldr('DEPTH FAR  (Z)', -5000, -100, BGP.depthMax, 50, v => { BGP.depthMax = v; });

  // Model / cube filter
  togRow('MODELS ONLY', () => BGP.modelOnly, () => { BGP.modelOnly = !BGP.modelOnly; if(BGP.modelOnly) BGP.cubeOnly = false; });
  togRow('CUBES  ONLY', () => BGP.cubeOnly,  () => { BGP.cubeOnly  = !BGP.cubeOnly;  if(BGP.cubeOnly)  BGP.modelOnly = false; });

  // Spawn / clear buttons
  let spawnRow = createDiv(''); spawnRow.parent(panel); spawnRow.style('display:flex;gap:6px;margin-top:4px;margin-bottom:2px;');
  const actionBtn = (label, col, fn) => {
    let b = createButton(label); b.parent(spawnRow);
    b.style(`background:#111;color:#aaa;border:1px solid #333;font-family:monospace;font-size:9px;padding:3px 8px;cursor:pointer;flex:1;`);
    b.mousePressed(fn); return b;
  };
  actionBtn('SPAWN',   '#80c0ff', () => spawnBgMix(false));
  actionBtn('CRAZY',   '#ff8060', () => spawnBgMix(true));
  actionBtn('CLEAR',   '#c04040', () => { bgMixMode = false; bgMixObjects = []; });

  // ══ APPEARANCE ══
  sec('APPEARANCE');

  sldr('STROKE WEIGHT', 0.1, 4.0, BGP.strokeWeight, 0.1, v => {
    BGP.strokeWeight = v;
    for (let o of bgMixObjects) {} // live update: drawBgMix reads BGP directly
  });
  sldr('ALPHA MIN', 0, 255, BGP.alphaMin, 1, v => { BGP.alphaMin = v; });
  sldr('ALPHA MAX', 0, 255, BGP.alphaMax, 1, v => { BGP.alphaMax = v; });

  // Hue shift
  sldr('HUE SHIFT (°)', 0, 360, 0, 1, v => { BGP.hueShift = v; });

  // Colour mode buttons
  let colModeRow = createDiv(''); colModeRow.parent(panel); colModeRow.style('display:flex;gap:6px;margin-bottom:6px;');
  const cmBtn = (label, fn) => {
    let b = createButton(label); b.parent(colModeRow);
    b.style('background:#111;color:#aaa;border:1px solid #2a2a35;font-family:monospace;font-size:9px;padding:3px 6px;cursor:pointer;flex:1;');
    b.mousePressed(fn); return b;
  };
  cmBtn('SINGLE', () => { bgMixColorMode = 'single'; });
  cmBtn('MULTI',  () => { bgMixColorMode = 'multi'; });
  cmBtn('CYCLE',  () => { bgMixColorIdx = (bgMixColorIdx + 1) % BG_MIX_COLORS.length; });

  // Global stroke colour preset strip
  sec('GLOBAL COLOUR PRESET');
  let presetRow = createDiv(''); presetRow.parent(panel); presetRow.style('display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;');
  for (let i = 0; i < BG_MIX_COLORS.length; i++) {
    let c = BG_MIX_COLORS[i];
    let hex = '#' + c.stroke.map(v => v.toString(16).padStart(2,'0')).join('');
    let b = createButton(c.name); b.parent(presetRow);
    b.style(`background:#111;color:#aaa;border:1px solid #333;font-family:monospace;font-size:8px;padding:2px 5px;cursor:pointer;`);
    b.mousePressed(() => { bgMixColorMode = 'single'; bgMixColorIdx = i; });
  }

  // ══ ANIMATION ══
  sec('ANIMATION');

  sldr('ROTATION SPEED', 0, 0.03, BGP.rotSpeedMax, 0.001, v => {
    BGP.rotSpeedMax = v;
    // Live-update existing objects
    for (let o of bgMixObjects) {
      let sign = (x) => x < 0 ? -1 : 1;
      o.rotSpeed.x = sign(o.rotSpeed.x) * random(0, v);
      o.rotSpeed.y = sign(o.rotSpeed.y) * random(0, v);
      o.rotSpeed.z = sign(o.rotSpeed.z) * random(0, v);
    }
  });
  sldr('PULSE AMOUNT', 0, 1.0, 0, 0.01, v => { BGP.pulseAmt = v; });
  sldr('DRIFT SPEED',  0, 3.0, 0, 0.1,  v => { BGP.driftAmt = v; });

  // ══ PER-MODEL COLOURS ══
  sec('PER-MODEL COLOUR OVERRIDE');
  createP('Set a custom stroke colour for each loaded OBJ.').parent(panel)
    .style('color:#555;font-size:8px;margin:0 0 6px 0;line-height:1.4;');

  for (let i = 0; i < MODEL_SHORT_NAMES.length; i++) {
    let row = createDiv(''); row.parent(panel); row.style('display:flex;align-items:center;gap:6px;margin-bottom:4px;');
    let lbl = createSpan(MODEL_SHORT_NAMES[i]); lbl.parent(row); lbl.style('color:#888;flex:1;font-size:8px;');
    let cp = createColorPicker('#aaaaaa'); cp.parent(row);
    cp.style('width:32px;height:18px;border:none;background:none;cursor:pointer;padding:0;');
    let enabled = false;
    let enableBtn = createButton('OFF'); enableBtn.parent(row);
    enableBtn.style('background:#111;color:#555;border:1px solid #222;font-family:monospace;font-size:8px;padding:2px 5px;cursor:pointer;');
    enableBtn.mousePressed(() => {
      enabled = !enabled;
      enableBtn.html(enabled ? 'ON' : 'OFF');
      if (enabled) {
        let c = cp.color();
        BGP.modelColors[i] = [red(c), green(c), blue(c)];
      } else {
        BGP.modelColors[i] = null;
      }
    });
    cp.input(() => {
      if (enabled) {
        let c = cp.color();
        BGP.modelColors[i] = [red(c), green(c), blue(c)];
      }
    });
  }

  // ══ QUICK PRESETS ══
  sec('QUICK PRESETS');
  const preset = (label, col, fn) => {
    let b = createButton(label); b.parent(panel);
    b.style(`background:#0d0d10;color:#aaa;border:1px solid #222;font-family:monospace;font-size:9px;
      padding:3px 8px;cursor:pointer;display:block;width:100%;text-align:left;margin-bottom:3px;`);
    b.mousePressed(fn);
  };
  preset('GHOST_FIELD',  '#8080c0', () => {
    BGP.scaleMin=0.1; BGP.scaleMax=0.8; BGP.alphaMin=15; BGP.alphaMax=55;
    BGP.strokeWeight=0.4; BGP.pulseAmt=0.08; BGP.driftAmt=0.3; BGP.count=18;
    bgMixColorMode='single'; bgMixColorIdx=0; spawnBgMix(false);
  });
  preset('IRON_FOREST',  '#c08030', () => {
    BGP.scaleMin=0.5; BGP.scaleMax=2.5; BGP.alphaMin=80; BGP.alphaMax=200;
    BGP.strokeWeight=1.2; BGP.pulseAmt=0; BGP.driftAmt=0; BGP.count=10;
    bgMixColorMode='single'; bgMixColorIdx=3; BGP.modelOnly=true; spawnBgMix(false);
  });
  preset('ACID_SWARM',   '#40ff80', () => {
    BGP.scaleMin=0.15; BGP.scaleMax=1.0; BGP.alphaMin=40; BGP.alphaMax=160;
    BGP.strokeWeight=0.6; BGP.pulseAmt=0.25; BGP.driftAmt=1.5; BGP.count=20;
    bgMixColorMode='multi'; BGP.modelOnly=false; BGP.cubeOnly=false; spawnBgMix(false);
  });
  preset('VOID_MONOLITH', '#c0c0d0', () => {
    BGP.scaleMin=1.5; BGP.scaleMax=5.0; BGP.alphaMin=20; BGP.alphaMax=70;
    BGP.strokeWeight=0.3; BGP.pulseAmt=0.04; BGP.driftAmt=0; BGP.count=5;
    bgMixColorMode='single'; bgMixColorIdx=6; spawnBgMix(false);
  });
  preset('BLOOD_STATIC',  '#c02020', () => {
    BGP.scaleMin=0.1; BGP.scaleMax=3.0; BGP.alphaMin=30; BGP.alphaMax=220;
    BGP.strokeWeight=0.8; BGP.pulseAmt=0.5; BGP.driftAmt=0.8; BGP.count=16;
    bgMixColorMode='single'; bgMixColorIdx=1; spawnBgMix(true);
  });
}


// ═══════════════════════════════════════════════════════════════════════════════
// RECORDING PANEL v1.0
// Small on-canvas recorder button that captures the selected screen/tab and
// writes the resulting WebM into a user-chosen folder when supported.
// ═══════════════════════════════════════════════════════════════════════════════

let recorderButton = null;
let recorderStatus = null;
let recorderFolderHandle = null;
let recorderStream = null;
let recorderRecorder = null;
let recorderChunks = [];
let recorderBusy = false;
let recorderStartedAt = 0;
let recorderLastFileName = "";
let recorderAutoFolderPrompt = true;
let recorderFPS = 30;
let recorderMimeType = "video/webm;codecs=vp9,opus";

function buildRecorderUI() {
  if (typeof createDiv !== "function") return;

  const wrap = createDiv("");
  wrap.position(12, 12);
  wrap.style(`
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    pointer-events: auto;
    font-family: monospace;
  `);

  recorderButton = createButton("REC");
  recorderButton.parent(wrap);
  recorderButton.style(`
    width: 42px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.35);
    background: rgba(120,0,0,0.85);
    color: white;
    font-size: 11px;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: 0 0 18px rgba(255,0,0,0.25);
  `);
  recorderButton.mousePressed(toggleScreenRecording);

  // ── INFO button ────────────────────────────────────────────────────────────
  const infoBtn = createButton("INFO");
  infoBtn.parent(wrap);
  infoBtn.style(`
    width: 42px;
    height: 22px;
    border-radius: 999px;
    border: 1px solid rgba(255,80,80,0.55);
    background: rgba(160,0,0,0.82);
    color: #fff;
    font-family: monospace;
    font-size: 9px;
    letter-spacing: 1.5px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255,0,0,0.2);
    transition: background 0.15s;
  `);

  // Centered overlay — injected once into the DOM
  const overlay = document.createElement('div');
  overlay.id = '__arya_info_overlay';
  overlay.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    z-index: 99999;
    pointer-events: none;
  `;

  const card = document.createElement('div');
  card.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(8, 6, 10, 0.97);
    border: 1px solid rgba(180, 30, 30, 0.7);
    border-radius: 6px;
    padding: 28px 36px 24px 36px;
    font-family: monospace;
    text-align: center;
    box-shadow: 0 0 60px rgba(180,0,0,0.25), 0 0 120px rgba(0,0,0,0.8);
    min-width: 240px;
    pointer-events: auto;
  `;

  const name = document.createElement('div');
  name.textContent = 'Arya Rambod';
  name.style.cssText = `
    color: #e8e8f0;
    font-size: 18px;
    letter-spacing: 0.15em;
    margin-bottom: 6px;
  `;

  const year = document.createElement('div');
  year.textContent = '2026';
  year.style.cssText = `
    color: rgba(180,30,30,0.9);
    font-size: 11px;
    letter-spacing: 0.2em;
    margin-bottom: 18px;
  `;

  const divider = document.createElement('div');
  divider.style.cssText = `
    width: 60px;
    height: 1px;
    background: rgba(180,30,30,0.4);
    margin: 0 auto 18px auto;
  `;

  const link = document.createElement('a');
  link.href = 'https://aryarambod.com';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'aryarambod.com';
  link.style.cssText = `
    color: rgba(160,160,220,0.9);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-decoration: none;
    border-bottom: 1px solid rgba(160,160,220,0.35);
    padding-bottom: 2px;
    transition: color 0.15s;
  `;
  link.onmouseenter = () => { link.style.color = '#fff'; link.style.borderBottomColor = '#fff'; };
  link.onmouseleave = () => { link.style.color = 'rgba(160,160,220,0.9)'; link.style.borderBottomColor = 'rgba(160,160,220,0.35)'; };

  card.appendChild(name);
  card.appendChild(year);
  card.appendChild(divider);
  card.appendChild(link);
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  let infoOpen = false;
  infoBtn.mousePressed(() => {
    infoOpen = !infoOpen;
    overlay.style.display = infoOpen ? 'block' : 'none';
    infoBtn.style('background', infoOpen ? 'rgba(200,0,0,0.95)' : 'rgba(160,0,0,0.82)');
  });

  recorderStatus = createDiv("recorder idle");
  recorderStatus.parent(wrap);
  recorderStatus.style(`
    min-width: 140px;
    max-width: 240px;
    padding: 6px 8px;
    border-radius: 10px;
    background: rgba(0,0,0,0.55);
    color: #ddd;
    font-size: 10px;
    line-height: 1.35;
    text-align: right;
    border: 1px solid rgba(255,255,255,0.1);
  `);
}

function setRecorderStatus(msg) {
  if (recorderStatus) recorderStatus.html(msg);
}

function formatRecorderTime(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

// [removed orphan] function getRecorderMimeType() — had no callers
function drawRecorderOverlay() {
  if (!recorderStatus) return;
  if (recorderRecorder && recorderRecorder.state === "recording") {
    const now = millis ? millis() : Date.now();
    const elapsed = formatRecorderTime(now - recorderStartedAt);
    setRecorderStatus(`recording ${elapsed}`);
  }
}

function recorderHeartbeat() {
  if (recorderRecorder && recorderRecorder.state === "recording") {
    if (recorderButton) recorderButton.style("background: rgba(170,0,0,0.95);");
  } else if (recorderButton) {
    recorderButton.style(`
      width: 42px;
      height: 42px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.35);
      background: rgba(120,0,0,0.85);
      color: white;
      font-size: 11px;
      letter-spacing: 1px;
      cursor: pointer;
      box-shadow: 0 0 18px rgba(255,0,0,0.25);
    `);
  }
}

function recorderFrameHook() {
  drawRecorderOverlay();
  recorderHeartbeat();
}



// ═══════════════════════════════════════════════════════════════════════════════
// ADVANCED SENSE ENGINE v1.0
// Adds depth rendering, richer audio motion, recorder audio mix routing, and
// a large motif atlas to push the sketch into a more layered UnC space.
// ═══════════════════════════════════════════════════════════════════════════════

let depthMode = false;
let UnCMode = true;
let advancedAudioMode = true;
let recorderCaptureMic = true;
let recorderCaptureSystemAudio = true;
let recorderCaptureSynthAudio = true;
let recorderPreferFolder = false;
let recorderAudioContext = null;
let recorderAudioDestination = null;
let recorderAudioAttached = false;
let recorderMicStream = null;
let recorderDisplayStream = null;
let recorderSystemAudioStream = null;
let recorderUseTabAudio = true;
let recorderDepthOverlay = true;
let recorderSignalMask = false;
let depthStrength = 0.72;
let depthParallax = 0.46;
let depthFocus = 0.52;
let depthFogDensity = 0.42;
let depthTunnel = 0.28;
let depthStack = 14;
let depthPulseRate = 0.031;
let UnCBloom = 0.33;
let UnCGlare = 0.24;
let UnCEcho = 0.19;
let UnCWhisper = 0.58;
let UnCMirror = 0.41;
let UnCTremor = 0.17;
let UnCStutter = 0.13;
let UnCVeil = 0.29;
let audioWarp = 0.22;
let audioDust = 0.19;
let audioGhost = 0.25;
let audioFold = 0.18;
let audioSheen = 0.23;
let audioBloom = 0.14;
let audioDepthBus = 0;
let depthOrbitPhase = 0;
let UnCPhase = 0;

// ── DEPTH FIGURES (Shift+Q/W/E) ────────────────────────────────────────────────
// Procedural wireframe figures that appear in depth space, audio-reactive.
// Presets: null | 'FIGURES' | 'ARCHITECTURE' | 'ORGANISMS'
let depthFiguresPreset = null;
let depthFiguresEnergy = 0;     // 0..1, driven by amplitude
let depthFiguresPhase  = 0;
let depthFiguresSeeds  = [];    // per-figure jitter seeds, regen on preset change
let bgMode = 0;
let bgWeirdness = 1.0;
let bgDensity = 1.0;
let bgDrift = 1.0;
let bgPulse = 1.0;
let recorderStatusText = 'REC ready';
let recorderStatusFlash = 0;

function setupAdvancedAudioSystems() {
  audioWarp = 0.22;
  audioDust = 0.19;
  audioGhost = 0.25;
  audioFold = 0.18;
  audioSheen = 0.23;
  audioBloom = 0.14;
  if (lpFilter) lpFilter.res(clamp(SP.lpfRes + 0.05, 0.1, 20));
  if (hpFilter) hpFilter.freq(clamp(SP.hpfCutoff + 3, 10, 2000));
}

function updateAdvancedAudioSculpting() {
  if (!soundStarted || audioPaused) return;
  const atlas = UX_AUDIO_SPEC[(frameCount * 3) % UX_AUDIO_SPEC.length];
  const band = atlas.bandHz;
  const wobble = atlas.wobble;
  const fold = atlas.fold;
  const gate = atlas.gate;
  const haze = atlas.haze;

  let low = clamp(SP.lpfCutoff * (1 + (wobble - 0.5) * 0.08), 40, 8000);
  let high = clamp(SP.hpfCutoff + (fold - 0.5) * 24, 10, 2000);
  let rate = clamp(SP.lfoRate * (1 + (haze - 0.5) * 0.15), 0.01, 20);
  let detune = SP.oscDetune + (band - 0.5) * 18;
  let chorusDepth = clamp(SP.chorusDepth + (atlas.ghost - 0.5) * 0.0006, 0, 0.02);
  let delayTime = clamp(SP.delayTime + (gate - 0.5) * 0.05, 0.01, 1.2);

  if (lpFilter) lpFilter.freq(low);
  if (hpFilter) hpFilter.freq(high);
  if (dubLFO) dubLFO.freq(rate);
  if (lfoOsc) lfoOsc.freq(rate);
  if (mainDelay) mainDelay.delayTime(delayTime);
  SP.chorusDepth = chorusDepth;
  SP.oscDetune = detune;

  if (SP.filterFollow) {
    const follow = map(noise(frameCount * 0.01), 0, 1, 0.75, 1.15);
    lpFilter.freq(clamp(low * follow, 40, 8000));
  }

  if (SP.distortOn) {
    audioWarp = clamp(audioWarp + 0.005, 0, 1);
  } else {
    audioWarp = clamp(audioWarp * 0.985, 0, 1);
  }

  if (SP.chorusOn && chorusOsc) {
    chorusOsc.freq(rate * 0.5);
    chorusOsc.amp(clamp(SP.chorusDepth * 40, 0, 1));
  }

  if (SP.noiseAmp > 0 && ambientOn) {
    const dense = clamp(SP.noiseAmp * (0.8 + audioDust), 0, 0.3);
    brownNoise.amp(dense, 0.2);
  }

  if (SP.masterVol !== masterVol) {
    masterVol = SP.masterVol;
  }
}

function updateDepthAudioField() {
  if (!soundStarted || audioPaused) return;
  const idx = (frameCount + floor(depthOrbitPhase * 11)) % UX_DEPTH_SPEC.length;
  const spec = UX_DEPTH_SPEC[idx];
  const resonance = clamp(SP.lpfRes + spec.res * 0.1, 0.1, 20);
  const delayShift = clamp(SP.delayFeedback + spec.echo * 0.02, 0, 0.98);
  if (lpFilter) lpFilter.res(resonance);
  if (mainDelay) mainDelay.feedback(delayShift);
  if (depthMode && SP.lfoTarget === 'filter') {
    const focusHz = map(depthFocus, 0, 1, 120, 4800);
    lpFilter.freq(clamp(focusHz + sin(depthOrbitPhase) * 160, 40, 8000));
  }
}

function updateUnCAudioField() {
  if (!soundStarted || audioPaused) return;
  const spec = UX_UnC_SPEC[(frameCount * 5) % UX_UnC_SPEC.length];
  const murmur = spec.murmur;
  const shimmer = spec.shimmer;
  const glitch = spec.glitch;
  const bleed = spec.bleed;
  if (SP.distortOn && subOsc && subOsc.started) {
    const uncBase = (typeof subOsc._uncBaseFreq === 'number' ? subOsc._uncBaseFreq : (typeof subOsc.f === 'number' ? subOsc.f : midiToFreq(32)));
    subOsc.freq(uncBase + sin(UnCPhase * 0.61) * 2.0 + (glitch - 0.5) * 6);
  }
  if (SP.bitCrushOn) {
    audioGhost = clamp(audioGhost + bleed * 0.001, 0, 1);
  }
  if (SP.arpMode && arpMode) {
    SP.arpSpeed = clamp(SP.arpSpeed + (shimmer - 0.5) * 1.4, 50, 800);
  }
  if (murmur > 0.55 && brownNoise) {
    brownNoise.amp(clamp(SP.noiseAmp * (0.6 + murmur * 0.8), 0, 0.3), 0.08);
  }
}

function drawDepthEngine(pal) {
  if (!depthMode && !depthFog) return;
  depthOrbitPhase += depthPulseRate;
  const fog = depthFogDensity * (0.5 + sin(depthOrbitPhase * 0.9) * 0.5);
  const n = max(4, min(depthStack, 7));

  push();
  resetMatrix();
  noStroke();
  fill(pal.bg[0], pal.bg[1], pal.bg[2], 18 + fog * 34);
  rect(-width / 2, -height / 2, width, height);

  for (let i = 0; i < n; i++) {
    const t = i / max(n - 1, 1);
    const z = lerp(-420, 920, t);
    const s = 1 + t * depthStrength * 0.85;
    const alpha = map(t, 0, 1, 42, 2) + fog * 18;
    push();
    translate(0, 0, z);
    scale(s, s, 1);
    fill(pal.pt1[0], pal.pt1[1], pal.pt1[2], alpha * 0.25);
    rect(-width / 2, -height / 2, width, height);
    stroke(pal.glitch[0], pal.glitch[1], pal.glitch[2], alpha * 0.18);
    strokeWeight(1);
    for (let x = -width / 2; x < width / 2; x += 80) {
      line(x + sin(depthOrbitPhase + t * 4 + x * 0.01) * 6, -height / 2, x, height / 2);
    }
    pop();
  }

  pop();
}

function drawUnCEngine(pal) {
  if (!UnCMode) return;
  UnCPhase += 0.013;

  push();
  resetMatrix();
  textFont('monospace');
  textAlign(LEFT);

  if (UnCBloom > 0.01) {
    for (let i = 0; i < min(24, portraits.length + 6); i++) {
      const spec = UX_UnC_SPEC[(frameCount + i * 7) % UX_UnC_SPEC.length];
      const px = lerp(-width / 2, width / 2, ((i * 0.137 + UnCPhase) % 1));
      const py = lerp(-height / 2, height / 2, ((i * 0.271 + UnCPhase * 0.77) % 1));
      const txt = spec.whisper;
      fill(pal.text[0], pal.text[1], pal.text[2], 10 + spec.echo * 35);
      textSize(10 + spec.size);
      text(txt, px + spec.jitter, py - spec.jitter);
      fill(pal.glitch[0], pal.glitch[1], pal.glitch[2], 6 + spec.breach * 28);
      text(txt, px - spec.jitter * 0.7, py + spec.jitter * 0.5);
    }
  }

  if (UnCMirror > 0.01 && portraits.length > 0) {
    for (let i = 0; i < portraits.length; i++) {
      const p = portraits[i];
      const spec = UX_VISUAL_SPEC[(i * 19 + frameCount) % UX_VISUAL_SPEC.length];
      const ox = sin(UnCPhase * 1.2 + i) * 18 * UnCMirror;
      const oy = cos(UnCPhase * 1.8 + i * 0.7) * 14 * UnCMirror;
      push();
      translate(p.displayPos.x + ox, p.displayPos.y + oy, p.displayPos.z + spec.zShift);
      rotateY(p.rot + UnCPhase * 0.14);
      rotateX(PI);
      scale(p.scale_ * (0.72 + spec.scale * 0.18));
      ambientMaterial(pal.glitch[0], pal.glitch[1], pal.glitch[2], 40 + spec.alpha);
      if (p.model) model(p.model);
      pop();
    }
  }

  if (UnCWhisper > 0.01 && frameCount % 9 === 0) {
    const line = random(poemLines);
    fill(pal.text[0], pal.text[1], pal.text[2], 18 + UnCWhisper * 40);
    textSize(14 + random(8));
    text(line, random(-width / 3, width / 3), random(-height / 3, height / 3));
  }

  pop();
}

// ═══ DEPTH FIGURES SYSTEM ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// Procedural wireframe figures, mixed in alongside portraits. Audio-reactive
// energy ramps up on amplitude peaks, fades on quiet. Three preset libraries:
//   FIGURES       — humanoid silhouettes (torso/head/limbs procedural)
//   ARCHITECTURE  — rooms, columns, gates (boxes, cylinders, lines)
//   ORGANISMS     — spine + tendril creatures (audio-warped chains)
// ══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
function setDepthFiguresPreset(name) {
  if (depthFiguresPreset === name) {
    depthFiguresPreset = null;
    flashAmt = max(flashAmt, 30);
    return;
  }
  depthFiguresPreset = name;
  depthFiguresSeeds = [];
  // pre-generate ~14 figure seeds with stable positions/jitter
  for (let i = 0; i < 14; i++) {
    depthFiguresSeeds.push({
      x:   random(-width * 0.42, width * 0.42),
      y:   random(-height * 0.28, height * 0.32),
      z:   random(-380, 240),
      s:   random(0.55, 1.35),
      rot: random(TWO_PI),
      seed: random(1000),
      side: random() < 0.5 ? -1 : 1
    });
  }
  flashAmt = max(flashAmt, 50);
  screenShake = max(screenShake, 4);
}

function tickDepthFigures() {
  if (!depthFiguresPreset) {
    // fade out residual energy when preset is off
    depthFiguresEnergy = max(0, depthFiguresEnergy - 0.02);
    return;
  }
  depthFiguresPhase += 0.012;
  // Pull audio energy from any of the engines that already track it. Falls
  // back to flashAmt (recent visual hit) so figures still react when audio
  // analysers aren't running.
  let amp = 0;
  if (typeof uncAudio !== 'undefined' && uncAudio && typeof uncAudio.energy === 'number') {
    amp = uncAudio.energy / 255;
  } else if (typeof UnC_runtime !== 'undefined' && UnC_runtime && typeof UnC_runtime.bass === 'number') {
    amp = UnC_runtime.bass / 255;
  } else if (typeof flashAmt === 'number') {
    amp = flashAmt / 220;
  }
  if (!isFinite(amp)) amp = 0;
  amp = constrain(amp, 0, 1);
  // attack on peaks, slow release on quiet
  const target = constrain(amp * 1.8, 0, 1);
  if (target > depthFiguresEnergy) depthFiguresEnergy = lerp(depthFiguresEnergy, target, 0.35);
  else                              depthFiguresEnergy = lerp(depthFiguresEnergy, target, 0.04);
}

function drawDepthFigures(pal) {
  if (!depthFiguresPreset || depthFiguresEnergy < 0.02) return;
  const e = depthFiguresEnergy;
  const baseAlpha = 70 + e * 165;
  push();
  noFill();
  strokeWeight(1.1);
  // gentle ambient so wireframes read at any palette
  ambientLight(20);
  for (let i = 0; i < depthFiguresSeeds.length; i++) {
    const f = depthFiguresSeeds[i];
    // per-figure audio response: each has a slightly different phase
    const pulse = 0.85 + sin(depthFiguresPhase * 3 + f.seed) * 0.15 * e;
    const a = baseAlpha * (0.55 + 0.45 * sin(depthFiguresPhase * 1.4 + f.seed * 0.3));
    push();
    translate(f.x + sin(depthFiguresPhase + f.seed) * 8 * e,
              f.y + cos(depthFiguresPhase * 0.7 + f.seed) * 6 * e,
              f.z);
    rotateY(f.rot + depthFiguresPhase * 0.25 * f.side);
    scale(f.s * pulse);
    stroke(pal.pt1[0], pal.pt1[1], pal.pt1[2], a);
    if (depthFiguresPreset === 'FIGURES')      _drawFigureHumanoid(pal, e, f.seed);
    else if (depthFiguresPreset === 'ARCHITECTURE') _drawFigureArchitecture(pal, e, f.seed);
    else if (depthFiguresPreset === 'ORGANISMS')   _drawFigureOrganism(pal, e, f.seed);
    pop();
  }
  pop();
}

// procedural humanoid — head sphere, torso box, limb lines
function _drawFigureHumanoid(pal, e, seed) {
  const breath = 1 + sin(depthFiguresPhase * 2 + seed) * 0.05 * (0.4 + e);
  // head
  push(); translate(0, -90, 0); sphere(22 * breath, 8, 6); pop();
  // torso
  push(); translate(0, -30, 0); box(48 * breath, 78, 22); pop();
  // arms (lines)
  const armSwing = sin(depthFiguresPhase * 2.4 + seed) * 18 * e;
  line(-24, -38, 0, -52, 18 + armSwing, 8);
  line(-52, 18 + armSwing, 8, -58, 56 + armSwing * 0.6, 6);
  line( 24, -38, 0,  52, 18 - armSwing, 8);
  line( 52, 18 - armSwing, 8,  58, 56 - armSwing * 0.6, 6);
  // legs
  const legSwing = sin(depthFiguresPhase * 2 + seed + 1.7) * 12 * e;
  line(-12, 18, 0, -16 + legSwing * 0.4, 70, 4);
  line(-16 + legSwing * 0.4, 70, 4, -18, 118 + legSwing, 6);
  line( 12, 18, 0,  16 - legSwing * 0.4, 70, 4);
  line( 16 - legSwing * 0.4, 70, 4,  18, 118 - legSwing, 6);
  // glitch accent stroke on peaks
  if (e > 0.55) {
    stroke(pal.glitch[0], pal.glitch[1], pal.glitch[2], 90 + e * 80);
    push(); translate(0, -90, 0); sphere(26 * breath, 6, 4); pop();
  }
}

// procedural architecture — column + lintel + floor lines
function _drawFigureArchitecture(pal, e, seed) {
  const tall = 140 + 60 * sin(seed);
  // two columns
  push(); translate(-40, 0, 0); cylinder(8, tall, 8, 1); pop();
  push(); translate( 40, 0, 0); cylinder(8, tall, 8, 1); pop();
  // lintel
  push(); translate(0, -tall/2 - 6, 0); box(110, 10, 22); pop();
  // floor footprint
  push(); translate(0,  tall/2 + 3, 0); box(140, 4, 36); pop();
  // diagonal cross-brace on energy
  if (e > 0.35) {
    stroke(pal.glitch[0], pal.glitch[1], pal.glitch[2], 80 + e * 110);
    line(-40, -tall/2, 0,  40, tall/2, 0);
    line( 40, -tall/2, 0, -40, tall/2, 0);
  }
  // hanging line at peaks
  if (e > 0.6) {
    line(0, -tall/2, 0, 0, -tall/2 - 80 * e, 0);
  }
}

// procedural organism — audio-warped spine + tendrils
function _drawFigureOrganism(pal, e, seed) {
  // spine: 14 joints, sinusoidal sway scaled by energy
  const joints = 14;
  let prevX = 0, prevY = -80, prevZ = 0;
  for (let j = 1; j <= joints; j++) {
    const t = j / joints;
    const sway = sin(depthFiguresPhase * 3 + seed + j * 0.5) * (8 + 18 * e);
    const x = sway;
    const y = -80 + t * 180;
    const z = cos(depthFiguresPhase * 2.1 + j * 0.4 + seed) * (4 + 12 * e);
    line(prevX, prevY, prevZ, x, y, z);
    // small node sphere
    if (j % 2 === 0) {
      push(); translate(x, y, z); noStroke();
      fill(pal.pt1[0], pal.pt1[1], pal.pt1[2], 80 + e * 120);
      sphere(2.5 + e * 2.5, 5, 4);
      pop();
      stroke(pal.pt1[0], pal.pt1[1], pal.pt1[2], 80 + e * 140);
      noFill();
    }
    prevX = x; prevY = y; prevZ = z;
  }
  // tendrils — fewer when quiet, more when loud
  const tendrils = floor(2 + e * 4);
  for (let k = 0; k < tendrils; k++) {
    const ang = (k / tendrils) * TWO_PI + seed;
    const len = 36 + e * 56;
    let x0 = 0, y0 = -10;
    for (let s = 1; s <= 6; s++) {
      const tt = s / 6;
      const x1 = cos(ang + sin(depthFiguresPhase + seed + s) * 0.6) * len * tt;
      const y1 = -10 + sin(ang + tt * 2 + depthFiguresPhase) * len * tt * 0.6;
      line(x0, y0, 0, x1, y1, 0);
      x0 = x1; y0 = y1;
    }
  }
  // glitch flash on peaks
  if (e > 0.65) {
    stroke(pal.glitch[0], pal.glitch[1], pal.glitch[2], 80 + e * 100);
    push(); translate(0, -80, 0); sphere(8 + e * 6, 6, 4); pop();
  }
}

function buildAdvancedSoundPanel(parent) {
  addPanelSection(parent, 'DEPTH ENGINE');
  addToggleButton(parent, 'DEPTH MODE', () => depthMode, () => { depthMode = !depthMode; });
  addToggleButton(parent, 'UnC MODE', () => UnCMode, () => { UnCMode = !UnCMode; });
  addToggleButton(parent, 'ADV AUDIO', () => advancedAudioMode, () => { advancedAudioMode = !advancedAudioMode; });
  addPanelSlider(parent, 'sp_depthStrength', 'DEPTH STRENGTH', 0, 1.5, depthStrength, 0.01, (v) => { depthStrength = v; });
  addPanelSlider(parent, 'sp_depthParallax', 'DEPTH PARALLAX', 0, 1, depthParallax, 0.01, (v) => { depthParallax = v; });
  addPanelSlider(parent, 'sp_depthFocus', 'DEPTH FOCUS', 0, 1, depthFocus, 0.01, (v) => { depthFocus = v; });
  addPanelSlider(parent, 'sp_depthFogDensity', 'FOG DENSITY', 0, 1, depthFogDensity, 0.01, (v) => { depthFogDensity = v; });
  addPanelSlider(parent, 'sp_depthStack', 'DEPTH STACK', 4, 48, depthStack, 1, (v) => { depthStack = v; });

  addPanelSection(parent, 'AUDIO SHAPE');
  addPanelSlider(parent, 'sp_audioWarp', 'AUDIO WARP', 0, 1, audioWarp, 0.01, (v) => { audioWarp = v; });
  addPanelSlider(parent, 'sp_audioDust', 'AUDIO DUST', 0, 1, audioDust, 0.01, (v) => { audioDust = v; });
  addPanelSlider(parent, 'sp_audioGhost', 'AUDIO GHOST', 0, 1, audioGhost, 0.01, (v) => { audioGhost = v; });
  addPanelSlider(parent, 'sp_audioFold', 'AUDIO FOLD', 0, 1, audioFold, 0.01, (v) => { audioFold = v; });
  addPanelSlider(parent, 'sp_audioSheen', 'AUDIO SHEEN', 0, 1, audioSheen, 0.01, (v) => { audioSheen = v; });
  addPanelSlider(parent, 'sp_audioBloom', 'AUDIO BLOOM', 0, 1, audioBloom, 0.01, (v) => { audioBloom = v; });

  addPanelSection(parent, 'UnC LAYER');
  addPanelSlider(parent, 'sp_UnCBloom', 'UnC BLOOM', 0, 1, UnCBloom, 0.01, (v) => { UnCBloom = v; });
  addPanelSlider(parent, 'sp_UnCGlare', 'UnC GLARE', 0, 1, UnCGlare, 0.01, (v) => { UnCGlare = v; });
  addPanelSlider(parent, 'sp_UnCEcho', 'UnC ECHO', 0, 1, UnCEcho, 0.01, (v) => { UnCEcho = v; });
  addPanelSlider(parent, 'sp_UnCWhisper', 'UnC WHISPER', 0, 1, UnCWhisper, 0.01, (v) => { UnCWhisper = v; });
  addPanelSlider(parent, 'sp_UnCMirror', 'UnC MIRROR', 0, 1, UnCMirror, 0.01, (v) => { UnCMirror = v; });
  addPanelSlider(parent, 'sp_UnCTremor', 'UnC TREMOR', 0, 1, UnCTremor, 0.01, (v) => { UnCTremor = v; });
  addPanelSlider(parent, 'sp_UnCStutter', 'UnC STUTTER', 0, 1, UnCStutter, 0.01, (v) => { UnCStutter = v; });
  addPanelSlider(parent, 'sp_UnCVeil', 'UnC VEIL', 0, 1, UnCVeil, 0.01, (v) => { UnCVeil = v; });

  addPanelSection(parent, 'RECORDER');
  addToggleButton(parent, 'REC MIC', () => recorderCaptureMic, () => { recorderCaptureMic = !recorderCaptureMic; });
  addToggleButton(parent, 'REC SYSTEM AUDIO', () => recorderCaptureSystemAudio, () => { recorderCaptureSystemAudio = !recorderCaptureSystemAudio; });
  addToggleButton(parent, 'REC SYNTH AUDIO', () => recorderCaptureSynthAudio, () => { recorderCaptureSynthAudio = !recorderCaptureSynthAudio; });
  addToggleButton(parent, 'REC FOLDER SAVE', () => recorderPreferFolder, () => { recorderPreferFolder = !recorderPreferFolder; });
  addToggleButton(parent, 'REC TAB AUDIO', () => recorderUseTabAudio, () => { recorderUseTabAudio = !recorderUseTabAudio; });
  addToggleButton(parent, 'REC DEPTH OVERLAY', () => recorderDepthOverlay, () => { recorderDepthOverlay = !recorderDepthOverlay; });
  addPanelSlider(parent, 'sp_recorderFPS', 'REC FPS', 15, 60, recorderFPS, 1, (v) => { recorderFPS = v; });

  if (showSoundPanel && soundPanelEl) {
    const status = createP(recorderStatusText);
    status.parent(parent);
    status.style('color:#9e9;font-family:monospace;font-size:9px;margin:8px 0 0 0;padding:0;border-top:1px solid #222;padding-top:6px;');
  }
}

function setupRecorderAudioBus() {
  try {
    const ctx = getAudioContext ? getAudioContext() : null;
    if (!ctx || !ctx.createMediaStreamDestination) return null;
    recorderAudioContext = ctx;
    recorderAudioDestination = ctx.createMediaStreamDestination();
    if (recorderAudioAttached) return recorderAudioDestination;
    const nodes = [subOsc, brownNoise, rapOsc, operaOsc, kickOsc, lfoOsc, chorusOsc, lpFilter, hpFilter, mainDelay, delay2, compressor];
    for (const node of nodes) {
      try {
        if (node && node.connect) node.connect(recorderAudioDestination);
      } catch (_) {}
    }
    recorderAudioAttached = true;
    return recorderAudioDestination;
  } catch (err) {
    console.warn('Recorder audio bus failed:', err);
    return null;
  }
}

// [removed orphan] function connectRecorderAudioSources() — had no callers
function showRecorderStatus(msg) {
  recorderStatusText = msg;
  recorderStatusFlash = frameCount;
  if (recorderStatus) recorderStatus.html(msg);
}

function recorderStatusStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}


async function toggleScreenRecording() {
  if (recorderRecorder && recorderRecorder.state === 'recording') {
    stopScreenRecording();
  } else {
    await startScreenRecording();
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// New generator atlas, used by the advanced audio, depth, and UnC layers.
// ──────────────────────────────────────────────────────────────────────────────

function uxWrap(list, index) {
  if (!list.length) return null;
  const i = ((index % list.length) + list.length) % list.length;
  return list[i];
}

// [removed orphan] function uxFloat() — had no callers
const UX_AUDIO_SPEC = [
  { id: 1, name: "AUDIO_0001", mode: "drone", bandHz: 0.37, wobble: 0.53, fold: 0.71, gate: 0.19, haze: 0.97, ghost: 0.29 },
  { id: 2, name: "AUDIO_0002", mode: "needle", bandHz: 0.74, wobble: 0.06, fold: 0.42, gate: 0.38, haze: 0.94, ghost: 0.58 },
  { id: 3, name: "AUDIO_0003", mode: "grain", bandHz: 0.11, wobble: 0.59, fold: 0.13, gate: 0.57, haze: 0.91, ghost: 0.87 },
  { id: 4, name: "AUDIO_0004", mode: "echo", bandHz: 0.48, wobble: 0.12, fold: 0.84, gate: 0.76, haze: 0.88, ghost: 0.16 },
  { id: 5, name: "AUDIO_0005", mode: "fold", bandHz: 0.85, wobble: 0.65, fold: 0.55, gate: 0.95, haze: 0.85, ghost: 0.45 },
  { id: 6, name: "AUDIO_0006", mode: "ghost", bandHz: 0.22, wobble: 0.18, fold: 0.26, gate: 0.14, haze: 0.82, ghost: 0.74 },
  { id: 7, name: "AUDIO_0007", mode: "scream", bandHz: 0.59, wobble: 0.71, fold: 0.97, gate: 0.33, haze: 0.79, ghost: 0.03 },
  { id: 8, name: "AUDIO_0008", mode: "sub", bandHz: 0.96, wobble: 0.24, fold: 0.68, gate: 0.52, haze: 0.76, ghost: 0.32 },
  { id: 9, name: "AUDIO_0009", mode: "drone", bandHz: 0.33, wobble: 0.77, fold: 0.39, gate: 0.71, haze: 0.73, ghost: 0.61 },
  { id: 10, name: "AUDIO_0010", mode: "needle", bandHz: 0.70, wobble: 0.30, fold: 0.10, gate: 0.90, haze: 0.70, ghost: 0.90 },
  { id: 11, name: "AUDIO_0011", mode: "grain", bandHz: 0.07, wobble: 0.83, fold: 0.81, gate: 0.09, haze: 0.67, ghost: 0.19 },
  { id: 12, name: "AUDIO_0012", mode: "echo", bandHz: 0.44, wobble: 0.36, fold: 0.52, gate: 0.28, haze: 0.64, ghost: 0.48 },
  { id: 13, name: "AUDIO_0013", mode: "fold", bandHz: 0.81, wobble: 0.89, fold: 0.23, gate: 0.47, haze: 0.61, ghost: 0.77 },
  { id: 14, name: "AUDIO_0014", mode: "ghost", bandHz: 0.18, wobble: 0.42, fold: 0.94, gate: 0.66, haze: 0.58, ghost: 0.06 },
  { id: 15, name: "AUDIO_0015", mode: "scream", bandHz: 0.55, wobble: 0.95, fold: 0.65, gate: 0.85, haze: 0.55, ghost: 0.35 },
  { id: 16, name: "AUDIO_0016", mode: "sub", bandHz: 0.92, wobble: 0.48, fold: 0.36, gate: 0.04, haze: 0.52, ghost: 0.64 },
  { id: 17, name: "AUDIO_0017", mode: "drone", bandHz: 0.29, wobble: 0.01, fold: 0.07, gate: 0.23, haze: 0.49, ghost: 0.93 },
  { id: 18, name: "AUDIO_0018", mode: "needle", bandHz: 0.66, wobble: 0.54, fold: 0.78, gate: 0.42, haze: 0.46, ghost: 0.22 },
  { id: 19, name: "AUDIO_0019", mode: "grain", bandHz: 0.03, wobble: 0.07, fold: 0.49, gate: 0.61, haze: 0.43, ghost: 0.51 },
  { id: 20, name: "AUDIO_0020", mode: "echo", bandHz: 0.40, wobble: 0.60, fold: 0.20, gate: 0.80, haze: 0.40, ghost: 0.80 },
  { id: 21, name: "AUDIO_0021", mode: "fold", bandHz: 0.77, wobble: 0.13, fold: 0.91, gate: 0.99, haze: 0.37, ghost: 0.09 },
  { id: 22, name: "AUDIO_0022", mode: "ghost", bandHz: 0.14, wobble: 0.66, fold: 0.62, gate: 0.18, haze: 0.34, ghost: 0.38 },
  { id: 23, name: "AUDIO_0023", mode: "scream", bandHz: 0.51, wobble: 0.19, fold: 0.33, gate: 0.37, haze: 0.31, ghost: 0.67 },
  { id: 24, name: "AUDIO_0024", mode: "sub", bandHz: 0.88, wobble: 0.72, fold: 0.04, gate: 0.56, haze: 0.28, ghost: 0.96 },
  { id: 25, name: "AUDIO_0025", mode: "drone", bandHz: 0.25, wobble: 0.25, fold: 0.75, gate: 0.75, haze: 0.25, ghost: 0.25 },
  { id: 26, name: "AUDIO_0026", mode: "needle", bandHz: 0.62, wobble: 0.78, fold: 0.46, gate: 0.94, haze: 0.22, ghost: 0.54 },
  { id: 27, name: "AUDIO_0027", mode: "grain", bandHz: 0.99, wobble: 0.31, fold: 0.17, gate: 0.13, haze: 0.19, ghost: 0.83 },
  { id: 28, name: "AUDIO_0028", mode: "echo", bandHz: 0.36, wobble: 0.84, fold: 0.88, gate: 0.32, haze: 0.16, ghost: 0.12 },
  { id: 29, name: "AUDIO_0029", mode: "fold", bandHz: 0.73, wobble: 0.37, fold: 0.59, gate: 0.51, haze: 0.13, ghost: 0.41 },
  { id: 30, name: "AUDIO_0030", mode: "ghost", bandHz: 0.10, wobble: 0.90, fold: 0.30, gate: 0.70, haze: 0.10, ghost: 0.70 },
  { id: 31, name: "AUDIO_0031", mode: "scream", bandHz: 0.47, wobble: 0.43, fold: 0.01, gate: 0.89, haze: 0.07, ghost: 0.99 },
  { id: 32, name: "AUDIO_0032", mode: "sub", bandHz: 0.84, wobble: 0.96, fold: 0.72, gate: 0.08, haze: 0.04, ghost: 0.28 },
  { id: 33, name: "AUDIO_0033", mode: "drone", bandHz: 0.21, wobble: 0.49, fold: 0.43, gate: 0.27, haze: 0.01, ghost: 0.57 },
  { id: 34, name: "AUDIO_0034", mode: "needle", bandHz: 0.58, wobble: 0.02, fold: 0.14, gate: 0.46, haze: 0.98, ghost: 0.86 },
  { id: 35, name: "AUDIO_0035", mode: "grain", bandHz: 0.95, wobble: 0.55, fold: 0.85, gate: 0.65, haze: 0.95, ghost: 0.15 },
  { id: 36, name: "AUDIO_0036", mode: "echo", bandHz: 0.32, wobble: 0.08, fold: 0.56, gate: 0.84, haze: 0.92, ghost: 0.44 },
  { id: 37, name: "AUDIO_0037", mode: "fold", bandHz: 0.69, wobble: 0.61, fold: 0.27, gate: 0.03, haze: 0.89, ghost: 0.73 },
  { id: 38, name: "AUDIO_0038", mode: "ghost", bandHz: 0.06, wobble: 0.14, fold: 0.98, gate: 0.22, haze: 0.86, ghost: 0.02 },
  { id: 39, name: "AUDIO_0039", mode: "scream", bandHz: 0.43, wobble: 0.67, fold: 0.69, gate: 0.41, haze: 0.83, ghost: 0.31 },
  { id: 40, name: "AUDIO_0040", mode: "sub", bandHz: 0.80, wobble: 0.20, fold: 0.40, gate: 0.60, haze: 0.80, ghost: 0.60 },
  { id: 41, name: "AUDIO_0041", mode: "drone", bandHz: 0.17, wobble: 0.73, fold: 0.11, gate: 0.79, haze: 0.77, ghost: 0.89 },
  { id: 42, name: "AUDIO_0042", mode: "needle", bandHz: 0.54, wobble: 0.26, fold: 0.82, gate: 0.98, haze: 0.74, ghost: 0.18 },
  { id: 43, name: "AUDIO_0043", mode: "grain", bandHz: 0.91, wobble: 0.79, fold: 0.53, gate: 0.17, haze: 0.71, ghost: 0.47 },
  { id: 44, name: "AUDIO_0044", mode: "echo", bandHz: 0.28, wobble: 0.32, fold: 0.24, gate: 0.36, haze: 0.68, ghost: 0.76 },
  { id: 45, name: "AUDIO_0045", mode: "fold", bandHz: 0.65, wobble: 0.85, fold: 0.95, gate: 0.55, haze: 0.65, ghost: 0.05 },
  { id: 46, name: "AUDIO_0046", mode: "ghost", bandHz: 0.02, wobble: 0.38, fold: 0.66, gate: 0.74, haze: 0.62, ghost: 0.34 },
  { id: 47, name: "AUDIO_0047", mode: "scream", bandHz: 0.39, wobble: 0.91, fold: 0.37, gate: 0.93, haze: 0.59, ghost: 0.63 },
  { id: 48, name: "AUDIO_0048", mode: "sub", bandHz: 0.76, wobble: 0.44, fold: 0.08, gate: 0.12, haze: 0.56, ghost: 0.92 },
  { id: 49, name: "AUDIO_0049", mode: "drone", bandHz: 0.13, wobble: 0.97, fold: 0.79, gate: 0.31, haze: 0.53, ghost: 0.21 },
  { id: 50, name: "AUDIO_0050", mode: "needle", bandHz: 0.50, wobble: 0.50, fold: 0.50, gate: 0.50, haze: 0.50, ghost: 0.50 },
  { id: 51, name: "AUDIO_0051", mode: "grain", bandHz: 0.87, wobble: 0.03, fold: 0.21, gate: 0.69, haze: 0.47, ghost: 0.79 },
  { id: 52, name: "AUDIO_0052", mode: "echo", bandHz: 0.24, wobble: 0.56, fold: 0.92, gate: 0.88, haze: 0.44, ghost: 0.08 },
  { id: 53, name: "AUDIO_0053", mode: "fold", bandHz: 0.61, wobble: 0.09, fold: 0.63, gate: 0.07, haze: 0.41, ghost: 0.37 },
  { id: 54, name: "AUDIO_0054", mode: "ghost", bandHz: 0.98, wobble: 0.62, fold: 0.34, gate: 0.26, haze: 0.38, ghost: 0.66 },
  { id: 55, name: "AUDIO_0055", mode: "scream", bandHz: 0.35, wobble: 0.15, fold: 0.05, gate: 0.45, haze: 0.35, ghost: 0.95 },
  { id: 56, name: "AUDIO_0056", mode: "sub", bandHz: 0.72, wobble: 0.68, fold: 0.76, gate: 0.64, haze: 0.32, ghost: 0.24 },
  { id: 57, name: "AUDIO_0057", mode: "drone", bandHz: 0.09, wobble: 0.21, fold: 0.47, gate: 0.83, haze: 0.29, ghost: 0.53 },
  { id: 58, name: "AUDIO_0058", mode: "needle", bandHz: 0.46, wobble: 0.74, fold: 0.18, gate: 0.02, haze: 0.26, ghost: 0.82 },
  { id: 59, name: "AUDIO_0059", mode: "grain", bandHz: 0.83, wobble: 0.27, fold: 0.89, gate: 0.21, haze: 0.23, ghost: 0.11 },
  { id: 60, name: "AUDIO_0060", mode: "echo", bandHz: 0.20, wobble: 0.80, fold: 0.60, gate: 0.40, haze: 0.20, ghost: 0.40 },
  { id: 61, name: "AUDIO_0061", mode: "fold", bandHz: 0.57, wobble: 0.33, fold: 0.31, gate: 0.59, haze: 0.17, ghost: 0.69 },
  { id: 62, name: "AUDIO_0062", mode: "ghost", bandHz: 0.94, wobble: 0.86, fold: 0.02, gate: 0.78, haze: 0.14, ghost: 0.98 },
  { id: 63, name: "AUDIO_0063", mode: "scream", bandHz: 0.31, wobble: 0.39, fold: 0.73, gate: 0.97, haze: 0.11, ghost: 0.27 },
  { id: 64, name: "AUDIO_0064", mode: "sub", bandHz: 0.68, wobble: 0.92, fold: 0.44, gate: 0.16, haze: 0.08, ghost: 0.56 }
];

const UX_VISUAL_SPEC = [
  { id: 1, name: "VISUAL_0001", mode: "echo", alpha: 0.41, scale: 0.61, zShift: -97, warp: 0.17, shimmer: 0.89, stain: 0.13 },
  { id: 2, name: "VISUAL_0002", mode: "mirror", alpha: 0.82, scale: 0.22, zShift: -74, warp: 0.34, shimmer: 0.78, stain: 0.26 },
  { id: 3, name: "VISUAL_0003", mode: "cavity", alpha: 0.23, scale: 0.83, zShift: -51, warp: 0.51, shimmer: 0.67, stain: 0.39 },
  { id: 4, name: "VISUAL_0004", mode: "haze", alpha: 0.64, scale: 0.44, zShift: -28, warp: 0.68, shimmer: 0.56, stain: 0.52 },
  { id: 5, name: "VISUAL_0005", mode: "stain", alpha: 0.05, scale: 0.05, zShift: -5, warp: 0.85, shimmer: 0.45, stain: 0.65 },
  { id: 6, name: "VISUAL_0006", mode: "tunnel", alpha: 0.46, scale: 0.66, zShift: 18, warp: 0.02, shimmer: 0.34, stain: 0.78 },
  { id: 7, name: "VISUAL_0007", mode: "rift", alpha: 0.87, scale: 0.27, zShift: 41, warp: 0.19, shimmer: 0.23, stain: 0.91 },
  { id: 8, name: "VISUAL_0008", mode: "veil", alpha: 0.28, scale: 0.88, zShift: 64, warp: 0.36, shimmer: 0.12, stain: 0.04 },
  { id: 9, name: "VISUAL_0009", mode: "echo", alpha: 0.69, scale: 0.49, zShift: 87, warp: 0.53, shimmer: 0.01, stain: 0.17 },
  { id: 10, name: "VISUAL_0010", mode: "mirror", alpha: 0.10, scale: 0.10, zShift: 110, warp: 0.70, shimmer: 0.90, stain: 0.30 },
  { id: 11, name: "VISUAL_0011", mode: "cavity", alpha: 0.51, scale: 0.71, zShift: -107, warp: 0.87, shimmer: 0.79, stain: 0.43 },
  { id: 12, name: "VISUAL_0012", mode: "haze", alpha: 0.92, scale: 0.32, zShift: -84, warp: 0.04, shimmer: 0.68, stain: 0.56 },
  { id: 13, name: "VISUAL_0013", mode: "stain", alpha: 0.33, scale: 0.93, zShift: -61, warp: 0.21, shimmer: 0.57, stain: 0.69 },
  { id: 14, name: "VISUAL_0014", mode: "tunnel", alpha: 0.74, scale: 0.54, zShift: -38, warp: 0.38, shimmer: 0.46, stain: 0.82 },
  { id: 15, name: "VISUAL_0015", mode: "rift", alpha: 0.15, scale: 0.15, zShift: -15, warp: 0.55, shimmer: 0.35, stain: 0.95 },
  { id: 16, name: "VISUAL_0016", mode: "veil", alpha: 0.56, scale: 0.76, zShift: 8, warp: 0.72, shimmer: 0.24, stain: 0.08 },
  { id: 17, name: "VISUAL_0017", mode: "echo", alpha: 0.97, scale: 0.37, zShift: 31, warp: 0.89, shimmer: 0.13, stain: 0.21 },
  { id: 18, name: "VISUAL_0018", mode: "mirror", alpha: 0.38, scale: 0.98, zShift: 54, warp: 0.06, shimmer: 0.02, stain: 0.34 },
  { id: 19, name: "VISUAL_0019", mode: "cavity", alpha: 0.79, scale: 0.59, zShift: 77, warp: 0.23, shimmer: 0.91, stain: 0.47 },
  { id: 20, name: "VISUAL_0020", mode: "haze", alpha: 0.20, scale: 0.20, zShift: 100, warp: 0.40, shimmer: 0.80, stain: 0.60 },
  { id: 21, name: "VISUAL_0021", mode: "stain", alpha: 0.61, scale: 0.81, zShift: -117, warp: 0.57, shimmer: 0.69, stain: 0.73 },
  { id: 22, name: "VISUAL_0022", mode: "tunnel", alpha: 0.02, scale: 0.42, zShift: -94, warp: 0.74, shimmer: 0.58, stain: 0.86 },
  { id: 23, name: "VISUAL_0023", mode: "rift", alpha: 0.43, scale: 0.03, zShift: -71, warp: 0.91, shimmer: 0.47, stain: 0.99 },
  { id: 24, name: "VISUAL_0024", mode: "veil", alpha: 0.84, scale: 0.64, zShift: -48, warp: 0.08, shimmer: 0.36, stain: 0.12 },
  { id: 25, name: "VISUAL_0025", mode: "echo", alpha: 0.25, scale: 0.25, zShift: -25, warp: 0.25, shimmer: 0.25, stain: 0.25 },
  { id: 26, name: "VISUAL_0026", mode: "mirror", alpha: 0.66, scale: 0.86, zShift: -2, warp: 0.42, shimmer: 0.14, stain: 0.38 },
  { id: 27, name: "VISUAL_0027", mode: "cavity", alpha: 0.07, scale: 0.47, zShift: 21, warp: 0.59, shimmer: 0.03, stain: 0.51 },
  { id: 28, name: "VISUAL_0028", mode: "haze", alpha: 0.48, scale: 0.08, zShift: 44, warp: 0.76, shimmer: 0.92, stain: 0.64 },
  { id: 29, name: "VISUAL_0029", mode: "stain", alpha: 0.89, scale: 0.69, zShift: 67, warp: 0.93, shimmer: 0.81, stain: 0.77 },
  { id: 30, name: "VISUAL_0030", mode: "tunnel", alpha: 0.30, scale: 0.30, zShift: 90, warp: 0.10, shimmer: 0.70, stain: 0.90 },
  { id: 31, name: "VISUAL_0031", mode: "rift", alpha: 0.71, scale: 0.91, zShift: 113, warp: 0.27, shimmer: 0.59, stain: 0.03 },
  { id: 32, name: "VISUAL_0032", mode: "veil", alpha: 0.12, scale: 0.52, zShift: -104, warp: 0.44, shimmer: 0.48, stain: 0.16 },
  { id: 33, name: "VISUAL_0033", mode: "echo", alpha: 0.53, scale: 0.13, zShift: -81, warp: 0.61, shimmer: 0.37, stain: 0.29 },
  { id: 34, name: "VISUAL_0034", mode: "mirror", alpha: 0.94, scale: 0.74, zShift: -58, warp: 0.78, shimmer: 0.26, stain: 0.42 },
  { id: 35, name: "VISUAL_0035", mode: "cavity", alpha: 0.35, scale: 0.35, zShift: -35, warp: 0.95, shimmer: 0.15, stain: 0.55 },
  { id: 36, name: "VISUAL_0036", mode: "haze", alpha: 0.76, scale: 0.96, zShift: -12, warp: 0.12, shimmer: 0.04, stain: 0.68 },
  { id: 37, name: "VISUAL_0037", mode: "stain", alpha: 0.17, scale: 0.57, zShift: 11, warp: 0.29, shimmer: 0.93, stain: 0.81 },
  { id: 38, name: "VISUAL_0038", mode: "tunnel", alpha: 0.58, scale: 0.18, zShift: 34, warp: 0.46, shimmer: 0.82, stain: 0.94 },
  { id: 39, name: "VISUAL_0039", mode: "rift", alpha: 0.99, scale: 0.79, zShift: 57, warp: 0.63, shimmer: 0.71, stain: 0.07 },
  { id: 40, name: "VISUAL_0040", mode: "veil", alpha: 0.40, scale: 0.40, zShift: 80, warp: 0.80, shimmer: 0.60, stain: 0.20 },
  { id: 41, name: "VISUAL_0041", mode: "echo", alpha: 0.81, scale: 0.01, zShift: 103, warp: 0.97, shimmer: 0.49, stain: 0.33 },
  { id: 42, name: "VISUAL_0042", mode: "mirror", alpha: 0.22, scale: 0.62, zShift: -114, warp: 0.14, shimmer: 0.38, stain: 0.46 },
  { id: 43, name: "VISUAL_0043", mode: "cavity", alpha: 0.63, scale: 0.23, zShift: -91, warp: 0.31, shimmer: 0.27, stain: 0.59 },
  { id: 44, name: "VISUAL_0044", mode: "haze", alpha: 0.04, scale: 0.84, zShift: -68, warp: 0.48, shimmer: 0.16, stain: 0.72 },
  { id: 45, name: "VISUAL_0045", mode: "stain", alpha: 0.45, scale: 0.45, zShift: -45, warp: 0.65, shimmer: 0.05, stain: 0.85 },
  { id: 46, name: "VISUAL_0046", mode: "tunnel", alpha: 0.86, scale: 0.06, zShift: -22, warp: 0.82, shimmer: 0.94, stain: 0.98 },
  { id: 47, name: "VISUAL_0047", mode: "rift", alpha: 0.27, scale: 0.67, zShift: 1, warp: 0.99, shimmer: 0.83, stain: 0.11 },
  { id: 48, name: "VISUAL_0048", mode: "veil", alpha: 0.68, scale: 0.28, zShift: 24, warp: 0.16, shimmer: 0.72, stain: 0.24 },
  { id: 49, name: "VISUAL_0049", mode: "echo", alpha: 0.09, scale: 0.89, zShift: 47, warp: 0.33, shimmer: 0.61, stain: 0.37 },
  { id: 50, name: "VISUAL_0050", mode: "mirror", alpha: 0.50, scale: 0.50, zShift: 70, warp: 0.50, shimmer: 0.50, stain: 0.50 },
  { id: 51, name: "VISUAL_0051", mode: "cavity", alpha: 0.91, scale: 0.11, zShift: 93, warp: 0.67, shimmer: 0.39, stain: 0.63 },
  { id: 52, name: "VISUAL_0052", mode: "haze", alpha: 0.32, scale: 0.72, zShift: 116, warp: 0.84, shimmer: 0.28, stain: 0.76 },
  { id: 53, name: "VISUAL_0053", mode: "stain", alpha: 0.73, scale: 0.33, zShift: -101, warp: 0.01, shimmer: 0.17, stain: 0.89 },
  { id: 54, name: "VISUAL_0054", mode: "tunnel", alpha: 0.14, scale: 0.94, zShift: -78, warp: 0.18, shimmer: 0.06, stain: 0.02 },
  { id: 55, name: "VISUAL_0055", mode: "rift", alpha: 0.55, scale: 0.55, zShift: -55, warp: 0.35, shimmer: 0.95, stain: 0.15 },
  { id: 56, name: "VISUAL_0056", mode: "veil", alpha: 0.96, scale: 0.16, zShift: -32, warp: 0.52, shimmer: 0.84, stain: 0.28 },
  { id: 57, name: "VISUAL_0057", mode: "echo", alpha: 0.37, scale: 0.77, zShift: -9, warp: 0.69, shimmer: 0.73, stain: 0.41 },
  { id: 58, name: "VISUAL_0058", mode: "mirror", alpha: 0.78, scale: 0.38, zShift: 14, warp: 0.86, shimmer: 0.62, stain: 0.54 },
  { id: 59, name: "VISUAL_0059", mode: "cavity", alpha: 0.19, scale: 0.99, zShift: 37, warp: 0.03, shimmer: 0.51, stain: 0.67 },
  { id: 60, name: "VISUAL_0060", mode: "haze", alpha: 0.60, scale: 0.60, zShift: 60, warp: 0.20, shimmer: 0.40, stain: 0.80 },
  { id: 61, name: "VISUAL_0061", mode: "stain", alpha: 0.01, scale: 0.21, zShift: 83, warp: 0.37, shimmer: 0.29, stain: 0.93 },
  { id: 62, name: "VISUAL_0062", mode: "tunnel", alpha: 0.42, scale: 0.82, zShift: 106, warp: 0.54, shimmer: 0.18, stain: 0.06 },
  { id: 63, name: "VISUAL_0063", mode: "rift", alpha: 0.83, scale: 0.43, zShift: -111, warp: 0.71, shimmer: 0.07, stain: 0.19 },
  { id: 64, name: "VISUAL_0064", mode: "veil", alpha: 0.24, scale: 0.04, zShift: -88, warp: 0.88, shimmer: 0.96, stain: 0.32 }
];

const UX_DEPTH_SPEC = [
  { id: 1, name: "DEPTH_0001", mode: "mid", z: -771, par: 0.31, focus: 0.43, falloff: 0.59, tunnel: 0.67, echo: 0.73, res: 0.79 },
  { id: 2, name: "DEPTH_0002", mode: "far", z: -742, par: 0.62, focus: 0.86, falloff: 0.18, tunnel: 0.34, echo: 0.46, res: 0.58 },
  { id: 3, name: "DEPTH_0003", mode: "void", z: -713, par: 0.93, focus: 0.29, falloff: 0.77, tunnel: 0.01, echo: 0.19, res: 0.37 },
  { id: 4, name: "DEPTH_0004", mode: "cave", z: -684, par: 0.24, focus: 0.72, falloff: 0.36, tunnel: 0.68, echo: 0.92, res: 0.16 },
  { id: 5, name: "DEPTH_0005", mode: "room", z: -655, par: 0.55, focus: 0.15, falloff: 0.95, tunnel: 0.35, echo: 0.65, res: 0.95 },
  { id: 6, name: "DEPTH_0006", mode: "hall", z: -626, par: 0.86, focus: 0.58, falloff: 0.54, tunnel: 0.02, echo: 0.38, res: 0.74 },
  { id: 7, name: "DEPTH_0007", mode: "shaft", z: -597, par: 0.17, focus: 0.01, falloff: 0.13, tunnel: 0.69, echo: 0.11, res: 0.53 },
  { id: 8, name: "DEPTH_0008", mode: "near", z: -568, par: 0.48, focus: 0.44, falloff: 0.72, tunnel: 0.36, echo: 0.84, res: 0.32 },
  { id: 9, name: "DEPTH_0009", mode: "mid", z: -539, par: 0.79, focus: 0.87, falloff: 0.31, tunnel: 0.03, echo: 0.57, res: 0.11 },
  { id: 10, name: "DEPTH_0010", mode: "far", z: -510, par: 0.10, focus: 0.30, falloff: 0.90, tunnel: 0.70, echo: 0.30, res: 0.90 },
  { id: 11, name: "DEPTH_0011", mode: "void", z: -481, par: 0.41, focus: 0.73, falloff: 0.49, tunnel: 0.37, echo: 0.03, res: 0.69 },
  { id: 12, name: "DEPTH_0012", mode: "cave", z: -452, par: 0.72, focus: 0.16, falloff: 0.08, tunnel: 0.04, echo: 0.76, res: 0.48 },
  { id: 13, name: "DEPTH_0013", mode: "room", z: -423, par: 0.03, focus: 0.59, falloff: 0.67, tunnel: 0.71, echo: 0.49, res: 0.27 },
  { id: 14, name: "DEPTH_0014", mode: "hall", z: -394, par: 0.34, focus: 0.02, falloff: 0.26, tunnel: 0.38, echo: 0.22, res: 0.06 },
  { id: 15, name: "DEPTH_0015", mode: "shaft", z: -365, par: 0.65, focus: 0.45, falloff: 0.85, tunnel: 0.05, echo: 0.95, res: 0.85 },
  { id: 16, name: "DEPTH_0016", mode: "near", z: -336, par: 0.96, focus: 0.88, falloff: 0.44, tunnel: 0.72, echo: 0.68, res: 0.64 },
  { id: 17, name: "DEPTH_0017", mode: "mid", z: -307, par: 0.27, focus: 0.31, falloff: 0.03, tunnel: 0.39, echo: 0.41, res: 0.43 },
  { id: 18, name: "DEPTH_0018", mode: "far", z: -278, par: 0.58, focus: 0.74, falloff: 0.62, tunnel: 0.06, echo: 0.14, res: 0.22 },
  { id: 19, name: "DEPTH_0019", mode: "void", z: -249, par: 0.89, focus: 0.17, falloff: 0.21, tunnel: 0.73, echo: 0.87, res: 0.01 },
  { id: 20, name: "DEPTH_0020", mode: "cave", z: -220, par: 0.20, focus: 0.60, falloff: 0.80, tunnel: 0.40, echo: 0.60, res: 0.80 },
  { id: 21, name: "DEPTH_0021", mode: "room", z: -191, par: 0.51, focus: 0.03, falloff: 0.39, tunnel: 0.07, echo: 0.33, res: 0.59 },
  { id: 22, name: "DEPTH_0022", mode: "hall", z: -162, par: 0.82, focus: 0.46, falloff: 0.98, tunnel: 0.74, echo: 0.06, res: 0.38 },
  { id: 23, name: "DEPTH_0023", mode: "shaft", z: -133, par: 0.13, focus: 0.89, falloff: 0.57, tunnel: 0.41, echo: 0.79, res: 0.17 },
  { id: 24, name: "DEPTH_0024", mode: "near", z: -104, par: 0.44, focus: 0.32, falloff: 0.16, tunnel: 0.08, echo: 0.52, res: 0.96 },
  { id: 25, name: "DEPTH_0025", mode: "mid", z: -75, par: 0.75, focus: 0.75, falloff: 0.75, tunnel: 0.75, echo: 0.25, res: 0.75 },
  { id: 26, name: "DEPTH_0026", mode: "far", z: -46, par: 0.06, focus: 0.18, falloff: 0.34, tunnel: 0.42, echo: 0.98, res: 0.54 },
  { id: 27, name: "DEPTH_0027", mode: "void", z: -17, par: 0.37, focus: 0.61, falloff: 0.93, tunnel: 0.09, echo: 0.71, res: 0.33 },
  { id: 28, name: "DEPTH_0028", mode: "cave", z: 12, par: 0.68, focus: 0.04, falloff: 0.52, tunnel: 0.76, echo: 0.44, res: 0.12 },
  { id: 29, name: "DEPTH_0029", mode: "room", z: 41, par: 0.99, focus: 0.47, falloff: 0.11, tunnel: 0.43, echo: 0.17, res: 0.91 },
  { id: 30, name: "DEPTH_0030", mode: "hall", z: 70, par: 0.30, focus: 0.90, falloff: 0.70, tunnel: 0.10, echo: 0.90, res: 0.70 },
  { id: 31, name: "DEPTH_0031", mode: "shaft", z: 99, par: 0.61, focus: 0.33, falloff: 0.29, tunnel: 0.77, echo: 0.63, res: 0.49 },
  { id: 32, name: "DEPTH_0032", mode: "near", z: 128, par: 0.92, focus: 0.76, falloff: 0.88, tunnel: 0.44, echo: 0.36, res: 0.28 },
  { id: 33, name: "DEPTH_0033", mode: "mid", z: 157, par: 0.23, focus: 0.19, falloff: 0.47, tunnel: 0.11, echo: 0.09, res: 0.07 },
  { id: 34, name: "DEPTH_0034", mode: "far", z: 186, par: 0.54, focus: 0.62, falloff: 0.06, tunnel: 0.78, echo: 0.82, res: 0.86 },
  { id: 35, name: "DEPTH_0035", mode: "void", z: 215, par: 0.85, focus: 0.05, falloff: 0.65, tunnel: 0.45, echo: 0.55, res: 0.65 },
  { id: 36, name: "DEPTH_0036", mode: "cave", z: 244, par: 0.16, focus: 0.48, falloff: 0.24, tunnel: 0.12, echo: 0.28, res: 0.44 },
  { id: 37, name: "DEPTH_0037", mode: "room", z: 273, par: 0.47, focus: 0.91, falloff: 0.83, tunnel: 0.79, echo: 0.01, res: 0.23 },
  { id: 38, name: "DEPTH_0038", mode: "hall", z: 302, par: 0.78, focus: 0.34, falloff: 0.42, tunnel: 0.46, echo: 0.74, res: 0.02 },
  { id: 39, name: "DEPTH_0039", mode: "shaft", z: 331, par: 0.09, focus: 0.77, falloff: 0.01, tunnel: 0.13, echo: 0.47, res: 0.81 },
  { id: 40, name: "DEPTH_0040", mode: "near", z: 360, par: 0.40, focus: 0.20, falloff: 0.60, tunnel: 0.80, echo: 0.20, res: 0.60 },
  { id: 41, name: "DEPTH_0041", mode: "mid", z: 389, par: 0.71, focus: 0.63, falloff: 0.19, tunnel: 0.47, echo: 0.93, res: 0.39 },
  { id: 42, name: "DEPTH_0042", mode: "far", z: 418, par: 0.02, focus: 0.06, falloff: 0.78, tunnel: 0.14, echo: 0.66, res: 0.18 },
  { id: 43, name: "DEPTH_0043", mode: "void", z: 447, par: 0.33, focus: 0.49, falloff: 0.37, tunnel: 0.81, echo: 0.39, res: 0.97 },
  { id: 44, name: "DEPTH_0044", mode: "cave", z: 476, par: 0.64, focus: 0.92, falloff: 0.96, tunnel: 0.48, echo: 0.12, res: 0.76 },
  { id: 45, name: "DEPTH_0045", mode: "room", z: 505, par: 0.95, focus: 0.35, falloff: 0.55, tunnel: 0.15, echo: 0.85, res: 0.55 },
  { id: 46, name: "DEPTH_0046", mode: "hall", z: 534, par: 0.26, focus: 0.78, falloff: 0.14, tunnel: 0.82, echo: 0.58, res: 0.34 },
  { id: 47, name: "DEPTH_0047", mode: "shaft", z: 563, par: 0.57, focus: 0.21, falloff: 0.73, tunnel: 0.49, echo: 0.31, res: 0.13 },
  { id: 48, name: "DEPTH_0048", mode: "near", z: 592, par: 0.88, focus: 0.64, falloff: 0.32, tunnel: 0.16, echo: 0.04, res: 0.92 },
  { id: 49, name: "DEPTH_0049", mode: "mid", z: 621, par: 0.19, focus: 0.07, falloff: 0.91, tunnel: 0.83, echo: 0.77, res: 0.71 },
  { id: 50, name: "DEPTH_0050", mode: "far", z: 650, par: 0.50, focus: 0.50, falloff: 0.50, tunnel: 0.50, echo: 0.50, res: 0.50 },
  { id: 51, name: "DEPTH_0051", mode: "void", z: 679, par: 0.81, focus: 0.93, falloff: 0.09, tunnel: 0.17, echo: 0.23, res: 0.29 },
  { id: 52, name: "DEPTH_0052", mode: "cave", z: 708, par: 0.12, focus: 0.36, falloff: 0.68, tunnel: 0.84, echo: 0.96, res: 0.08 },
  { id: 53, name: "DEPTH_0053", mode: "room", z: 737, par: 0.43, focus: 0.79, falloff: 0.27, tunnel: 0.51, echo: 0.69, res: 0.87 },
  { id: 54, name: "DEPTH_0054", mode: "hall", z: 766, par: 0.74, focus: 0.22, falloff: 0.86, tunnel: 0.18, echo: 0.42, res: 0.66 },
  { id: 55, name: "DEPTH_0055", mode: "shaft", z: 795, par: 0.05, focus: 0.65, falloff: 0.45, tunnel: 0.85, echo: 0.15, res: 0.45 },
  { id: 56, name: "DEPTH_0056", mode: "near", z: -776, par: 0.36, focus: 0.08, falloff: 0.04, tunnel: 0.52, echo: 0.88, res: 0.24 },
  { id: 57, name: "DEPTH_0057", mode: "mid", z: -747, par: 0.67, focus: 0.51, falloff: 0.63, tunnel: 0.19, echo: 0.61, res: 0.03 },
  { id: 58, name: "DEPTH_0058", mode: "far", z: -718, par: 0.98, focus: 0.94, falloff: 0.22, tunnel: 0.86, echo: 0.34, res: 0.82 },
  { id: 59, name: "DEPTH_0059", mode: "void", z: -689, par: 0.29, focus: 0.37, falloff: 0.81, tunnel: 0.53, echo: 0.07, res: 0.61 },
  { id: 60, name: "DEPTH_0060", mode: "cave", z: -660, par: 0.60, focus: 0.80, falloff: 0.40, tunnel: 0.20, echo: 0.80, res: 0.40 },
  { id: 61, name: "DEPTH_0061", mode: "room", z: -631, par: 0.91, focus: 0.23, falloff: 0.99, tunnel: 0.87, echo: 0.53, res: 0.19 },
  { id: 62, name: "DEPTH_0062", mode: "hall", z: -602, par: 0.22, focus: 0.66, falloff: 0.58, tunnel: 0.54, echo: 0.26, res: 0.98 },
  { id: 63, name: "DEPTH_0063", mode: "shaft", z: -573, par: 0.53, focus: 0.09, falloff: 0.17, tunnel: 0.21, echo: 0.99, res: 0.77 },
  { id: 64, name: "DEPTH_0064", mode: "near", z: -544, par: 0.84, focus: 0.52, falloff: 0.76, tunnel: 0.88, echo: 0.72, res: 0.56 }
];

const UX_UnC_SPEC = [
  { id: 1, name: "UnC_0001", mode: "murmur", whisper: "VOID", murmur: 0.11, shimmer: 0.13, glitch: 0.17, bleed: 0.19, echo: 0.23, breach: 0.29, jitter: 0.31, size: 9 },
  { id: 2, name: "UnC_0002", mode: "breach", whisper: "MURMUR", murmur: 0.22, shimmer: 0.26, glitch: 0.34, bleed: 0.38, echo: 0.46, breach: 0.58, jitter: 0.62, size: 10 },
  { id: 3, name: "UnC_0003", mode: "drift", whisper: "SKIN", murmur: 0.33, shimmer: 0.39, glitch: 0.51, bleed: 0.57, echo: 0.69, breach: 0.87, jitter: 0.93, size: 11 },
  { id: 4, name: "UnC_0004", mode: "fracture", whisper: "ECHO", murmur: 0.44, shimmer: 0.52, glitch: 0.68, bleed: 0.76, echo: 0.92, breach: 0.16, jitter: 0.24, size: 12 },
  { id: 5, name: "UnC_0005", mode: "skin", whisper: "STATIC", murmur: 0.55, shimmer: 0.65, glitch: 0.85, bleed: 0.95, echo: 0.15, breach: 0.45, jitter: 0.55, size: 13 },
  { id: 6, name: "UnC_0006", mode: "whisper", whisper: "BLOOM", murmur: 0.66, shimmer: 0.78, glitch: 0.02, bleed: 0.14, echo: 0.38, breach: 0.74, jitter: 0.86, size: 14 },
  { id: 7, name: "UnC_0007", mode: "static", whisper: "BREACH", murmur: 0.77, shimmer: 0.91, glitch: 0.19, bleed: 0.33, echo: 0.61, breach: 0.03, jitter: 0.17, size: 15 },
  { id: 8, name: "UnC_0008", mode: "blink", whisper: "NULL", murmur: 0.88, shimmer: 0.04, glitch: 0.36, bleed: 0.52, echo: 0.84, breach: 0.32, jitter: 0.48, size: 16 },
  { id: 9, name: "UnC_0009", mode: "murmur", whisper: "VOID", murmur: 0.99, shimmer: 0.17, glitch: 0.53, bleed: 0.71, echo: 0.07, breach: 0.61, jitter: 0.79, size: 8 },
  { id: 10, name: "UnC_0010", mode: "breach", whisper: "MURMUR", murmur: 0.10, shimmer: 0.30, glitch: 0.70, bleed: 0.90, echo: 0.30, breach: 0.90, jitter: 0.10, size: 9 },
  { id: 11, name: "UnC_0011", mode: "drift", whisper: "SKIN", murmur: 0.21, shimmer: 0.43, glitch: 0.87, bleed: 0.09, echo: 0.53, breach: 0.19, jitter: 0.41, size: 10 },
  { id: 12, name: "UnC_0012", mode: "fracture", whisper: "ECHO", murmur: 0.32, shimmer: 0.56, glitch: 0.04, bleed: 0.28, echo: 0.76, breach: 0.48, jitter: 0.72, size: 11 },
  { id: 13, name: "UnC_0013", mode: "skin", whisper: "STATIC", murmur: 0.43, shimmer: 0.69, glitch: 0.21, bleed: 0.47, echo: 0.99, breach: 0.77, jitter: 0.03, size: 12 },
  { id: 14, name: "UnC_0014", mode: "whisper", whisper: "BLOOM", murmur: 0.54, shimmer: 0.82, glitch: 0.38, bleed: 0.66, echo: 0.22, breach: 0.06, jitter: 0.34, size: 13 },
  { id: 15, name: "UnC_0015", mode: "static", whisper: "BREACH", murmur: 0.65, shimmer: 0.95, glitch: 0.55, bleed: 0.85, echo: 0.45, breach: 0.35, jitter: 0.65, size: 14 },
  { id: 16, name: "UnC_0016", mode: "blink", whisper: "NULL", murmur: 0.76, shimmer: 0.08, glitch: 0.72, bleed: 0.04, echo: 0.68, breach: 0.64, jitter: 0.96, size: 15 },
  { id: 17, name: "UnC_0017", mode: "murmur", whisper: "VOID", murmur: 0.87, shimmer: 0.21, glitch: 0.89, bleed: 0.23, echo: 0.91, breach: 0.93, jitter: 0.27, size: 16 },
  { id: 18, name: "UnC_0018", mode: "breach", whisper: "MURMUR", murmur: 0.98, shimmer: 0.34, glitch: 0.06, bleed: 0.42, echo: 0.14, breach: 0.22, jitter: 0.58, size: 8 },
  { id: 19, name: "UnC_0019", mode: "drift", whisper: "SKIN", murmur: 0.09, shimmer: 0.47, glitch: 0.23, bleed: 0.61, echo: 0.37, breach: 0.51, jitter: 0.89, size: 9 },
  { id: 20, name: "UnC_0020", mode: "fracture", whisper: "ECHO", murmur: 0.20, shimmer: 0.60, glitch: 0.40, bleed: 0.80, echo: 0.60, breach: 0.80, jitter: 0.20, size: 10 },
  { id: 21, name: "UnC_0021", mode: "skin", whisper: "STATIC", murmur: 0.31, shimmer: 0.73, glitch: 0.57, bleed: 0.99, echo: 0.83, breach: 0.09, jitter: 0.51, size: 11 },
  { id: 22, name: "UnC_0022", mode: "whisper", whisper: "BLOOM", murmur: 0.42, shimmer: 0.86, glitch: 0.74, bleed: 0.18, echo: 0.06, breach: 0.38, jitter: 0.82, size: 12 },
  { id: 23, name: "UnC_0023", mode: "static", whisper: "BREACH", murmur: 0.53, shimmer: 0.99, glitch: 0.91, bleed: 0.37, echo: 0.29, breach: 0.67, jitter: 0.13, size: 13 },
  { id: 24, name: "UnC_0024", mode: "blink", whisper: "NULL", murmur: 0.64, shimmer: 0.12, glitch: 0.08, bleed: 0.56, echo: 0.52, breach: 0.96, jitter: 0.44, size: 14 },
  { id: 25, name: "UnC_0025", mode: "murmur", whisper: "VOID", murmur: 0.75, shimmer: 0.25, glitch: 0.25, bleed: 0.75, echo: 0.75, breach: 0.25, jitter: 0.75, size: 15 },
  { id: 26, name: "UnC_0026", mode: "breach", whisper: "MURMUR", murmur: 0.86, shimmer: 0.38, glitch: 0.42, bleed: 0.94, echo: 0.98, breach: 0.54, jitter: 0.06, size: 16 },
  { id: 27, name: "UnC_0027", mode: "drift", whisper: "SKIN", murmur: 0.97, shimmer: 0.51, glitch: 0.59, bleed: 0.13, echo: 0.21, breach: 0.83, jitter: 0.37, size: 8 },
  { id: 28, name: "UnC_0028", mode: "fracture", whisper: "ECHO", murmur: 0.08, shimmer: 0.64, glitch: 0.76, bleed: 0.32, echo: 0.44, breach: 0.12, jitter: 0.68, size: 9 },
  { id: 29, name: "UnC_0029", mode: "skin", whisper: "STATIC", murmur: 0.19, shimmer: 0.77, glitch: 0.93, bleed: 0.51, echo: 0.67, breach: 0.41, jitter: 0.99, size: 10 },
  { id: 30, name: "UnC_0030", mode: "whisper", whisper: "BLOOM", murmur: 0.30, shimmer: 0.90, glitch: 0.10, bleed: 0.70, echo: 0.90, breach: 0.70, jitter: 0.30, size: 11 },
  { id: 31, name: "UnC_0031", mode: "static", whisper: "BREACH", murmur: 0.41, shimmer: 0.03, glitch: 0.27, bleed: 0.89, echo: 0.13, breach: 0.99, jitter: 0.61, size: 12 },
  { id: 32, name: "UnC_0032", mode: "blink", whisper: "NULL", murmur: 0.52, shimmer: 0.16, glitch: 0.44, bleed: 0.08, echo: 0.36, breach: 0.28, jitter: 0.92, size: 13 },
  { id: 33, name: "UnC_0033", mode: "murmur", whisper: "VOID", murmur: 0.63, shimmer: 0.29, glitch: 0.61, bleed: 0.27, echo: 0.59, breach: 0.57, jitter: 0.23, size: 14 },
  { id: 34, name: "UnC_0034", mode: "breach", whisper: "MURMUR", murmur: 0.74, shimmer: 0.42, glitch: 0.78, bleed: 0.46, echo: 0.82, breach: 0.86, jitter: 0.54, size: 15 },
  { id: 35, name: "UnC_0035", mode: "drift", whisper: "SKIN", murmur: 0.85, shimmer: 0.55, glitch: 0.95, bleed: 0.65, echo: 0.05, breach: 0.15, jitter: 0.85, size: 16 },
  { id: 36, name: "UnC_0036", mode: "fracture", whisper: "ECHO", murmur: 0.96, shimmer: 0.68, glitch: 0.12, bleed: 0.84, echo: 0.28, breach: 0.44, jitter: 0.16, size: 8 },
  { id: 37, name: "UnC_0037", mode: "skin", whisper: "STATIC", murmur: 0.07, shimmer: 0.81, glitch: 0.29, bleed: 0.03, echo: 0.51, breach: 0.73, jitter: 0.47, size: 9 },
  { id: 38, name: "UnC_0038", mode: "whisper", whisper: "BLOOM", murmur: 0.18, shimmer: 0.94, glitch: 0.46, bleed: 0.22, echo: 0.74, breach: 0.02, jitter: 0.78, size: 10 },
  { id: 39, name: "UnC_0039", mode: "static", whisper: "BREACH", murmur: 0.29, shimmer: 0.07, glitch: 0.63, bleed: 0.41, echo: 0.97, breach: 0.31, jitter: 0.09, size: 11 },
  { id: 40, name: "UnC_0040", mode: "blink", whisper: "NULL", murmur: 0.40, shimmer: 0.20, glitch: 0.80, bleed: 0.60, echo: 0.20, breach: 0.60, jitter: 0.40, size: 12 },
  { id: 41, name: "UnC_0041", mode: "murmur", whisper: "VOID", murmur: 0.51, shimmer: 0.33, glitch: 0.97, bleed: 0.79, echo: 0.43, breach: 0.89, jitter: 0.71, size: 13 },
  { id: 42, name: "UnC_0042", mode: "breach", whisper: "MURMUR", murmur: 0.62, shimmer: 0.46, glitch: 0.14, bleed: 0.98, echo: 0.66, breach: 0.18, jitter: 0.02, size: 14 },
  { id: 43, name: "UnC_0043", mode: "drift", whisper: "SKIN", murmur: 0.73, shimmer: 0.59, glitch: 0.31, bleed: 0.17, echo: 0.89, breach: 0.47, jitter: 0.33, size: 15 },
  { id: 44, name: "UnC_0044", mode: "fracture", whisper: "ECHO", murmur: 0.84, shimmer: 0.72, glitch: 0.48, bleed: 0.36, echo: 0.12, breach: 0.76, jitter: 0.64, size: 16 },
  { id: 45, name: "UnC_0045", mode: "skin", whisper: "STATIC", murmur: 0.95, shimmer: 0.85, glitch: 0.65, bleed: 0.55, echo: 0.35, breach: 0.05, jitter: 0.95, size: 8 },
  { id: 46, name: "UnC_0046", mode: "whisper", whisper: "BLOOM", murmur: 0.06, shimmer: 0.98, glitch: 0.82, bleed: 0.74, echo: 0.58, breach: 0.34, jitter: 0.26, size: 9 },
  { id: 47, name: "UnC_0047", mode: "static", whisper: "BREACH", murmur: 0.17, shimmer: 0.11, glitch: 0.99, bleed: 0.93, echo: 0.81, breach: 0.63, jitter: 0.57, size: 10 },
  { id: 48, name: "UnC_0048", mode: "blink", whisper: "NULL", murmur: 0.28, shimmer: 0.24, glitch: 0.16, bleed: 0.12, echo: 0.04, breach: 0.92, jitter: 0.88, size: 11 },
  { id: 49, name: "UnC_0049", mode: "murmur", whisper: "VOID", murmur: 0.39, shimmer: 0.37, glitch: 0.33, bleed: 0.31, echo: 0.27, breach: 0.21, jitter: 0.19, size: 12 },
  { id: 50, name: "UnC_0050", mode: "breach", whisper: "MURMUR", murmur: 0.50, shimmer: 0.50, glitch: 0.50, bleed: 0.50, echo: 0.50, breach: 0.50, jitter: 0.50, size: 13 },
  { id: 51, name: "UnC_0051", mode: "drift", whisper: "SKIN", murmur: 0.61, shimmer: 0.63, glitch: 0.67, bleed: 0.69, echo: 0.73, breach: 0.79, jitter: 0.81, size: 14 },
  { id: 52, name: "UnC_0052", mode: "fracture", whisper: "ECHO", murmur: 0.72, shimmer: 0.76, glitch: 0.84, bleed: 0.88, echo: 0.96, breach: 0.08, jitter: 0.12, size: 15 },
  { id: 53, name: "UnC_0053", mode: "skin", whisper: "STATIC", murmur: 0.83, shimmer: 0.89, glitch: 0.01, bleed: 0.07, echo: 0.19, breach: 0.37, jitter: 0.43, size: 16 },
  { id: 54, name: "UnC_0054", mode: "whisper", whisper: "BLOOM", murmur: 0.94, shimmer: 0.02, glitch: 0.18, bleed: 0.26, echo: 0.42, breach: 0.66, jitter: 0.74, size: 8 },
  { id: 55, name: "UnC_0055", mode: "static", whisper: "BREACH", murmur: 0.05, shimmer: 0.15, glitch: 0.35, bleed: 0.45, echo: 0.65, breach: 0.95, jitter: 0.05, size: 9 },
  { id: 56, name: "UnC_0056", mode: "blink", whisper: "NULL", murmur: 0.16, shimmer: 0.28, glitch: 0.52, bleed: 0.64, echo: 0.88, breach: 0.24, jitter: 0.36, size: 10 },
  { id: 57, name: "UnC_0057", mode: "murmur", whisper: "VOID", murmur: 0.27, shimmer: 0.41, glitch: 0.69, bleed: 0.83, echo: 0.11, breach: 0.53, jitter: 0.67, size: 11 },
  { id: 58, name: "UnC_0058", mode: "breach", whisper: "MURMUR", murmur: 0.38, shimmer: 0.54, glitch: 0.86, bleed: 0.02, echo: 0.34, breach: 0.82, jitter: 0.98, size: 12 },
  { id: 59, name: "UnC_0059", mode: "drift", whisper: "SKIN", murmur: 0.49, shimmer: 0.67, glitch: 0.03, bleed: 0.21, echo: 0.57, breach: 0.11, jitter: 0.29, size: 13 },
  { id: 60, name: "UnC_0060", mode: "fracture", whisper: "ECHO", murmur: 0.60, shimmer: 0.80, glitch: 0.20, bleed: 0.40, echo: 0.80, breach: 0.40, jitter: 0.60, size: 14 },
  { id: 61, name: "UnC_0061", mode: "skin", whisper: "STATIC", murmur: 0.71, shimmer: 0.93, glitch: 0.37, bleed: 0.59, echo: 0.03, breach: 0.69, jitter: 0.91, size: 15 },
  { id: 62, name: "UnC_0062", mode: "whisper", whisper: "BLOOM", murmur: 0.82, shimmer: 0.06, glitch: 0.54, bleed: 0.78, echo: 0.26, breach: 0.98, jitter: 0.22, size: 16 },
  { id: 63, name: "UnC_0063", mode: "static", whisper: "BREACH", murmur: 0.93, shimmer: 0.19, glitch: 0.71, bleed: 0.97, echo: 0.49, breach: 0.27, jitter: 0.53, size: 8 },
  { id: 64, name: "UnC_0064", mode: "blink", whisper: "NULL", murmur: 0.04, shimmer: 0.32, glitch: 0.88, bleed: 0.16, echo: 0.72, breach: 0.56, jitter: 0.84, size: 9 }
];



// [removed orphan] function drawAudioMotifField() — had no callers
// [removed orphan] function drawDepthMotifField() — had no callers
// [removed orphan] function drawUnCMotifField() — had no callers
function attachRecorderMusicBus() {
  return setupRecorderAudioBus();
}

function buildRecorderFolderHint() {
  if (!recorderPreferFolder) return 'download mode';
  return recorderFolderHandle ? 'folder armed' : 'folder not chosen';
}

function updateRecorderStatusMessage() {
  if (recorderRecorder && recorderRecorder.state === 'recording') {
    const now = millis ? millis() : Date.now();
    const elapsed = recorderStartedAt ? formatRecorderTime(now - recorderStartedAt) : '00:00';
    recorderStatusText = `recording ${elapsed} | ${buildRecorderFolderHint()}`;
  }
}

// Override recorder functions with an audio-safe mixdown path.
function startScreenRecording() {
  return (async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        throw new Error('Screen capture not supported.');
      }
      if (recorderButton) recorderButton.html('...');
      showRecorderStatus('choosing screen...');
      recorderDisplayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: recorderFPS, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: recorderUseTabAudio
      });

      if (recorderCaptureMic) {
        try {
          recorderMicStream = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
          });
        } catch (e) {
          recorderMicStream = null;
        }
      }

      const bus = attachRecorderMusicBus();
      const out = new MediaStream();
      recorderDisplayStream.getVideoTracks().forEach((t) => out.addTrack(t));
      if (recorderCaptureSystemAudio) {
        recorderDisplayStream.getAudioTracks().forEach((t) => out.addTrack(t));
      }
      if (recorderCaptureMic && recorderMicStream) {
        recorderMicStream.getAudioTracks().forEach((t) => out.addTrack(t));
      }
      if (recorderCaptureSynthAudio && bus && bus.stream) {
        bus.stream.getAudioTracks().forEach((t) => out.addTrack(t));
      }

      const mimeOptions = ['video/mp4;codecs=h264,aac', 'video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
      let chosenType = '';
      for (const type of mimeOptions) {
        if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) {
          chosenType = type;
          break;
        }
      }

      recorderChunks = [];
      recorderRecorder = new MediaRecorder(out, chosenType ? { mimeType: chosenType } : undefined);
      recorderRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) recorderChunks.push(e.data); };
      recorderRecorder.onstop = async () => {
        try {
          const blob = new Blob(recorderChunks, { type: chosenType || 'video/webm' });
          recorderChunks = [];
          await saveRecordingBlob(blob);
        } finally {
          cleanupRecorderStream();
        }
      };
      recorderDisplayStream.getVideoTracks().forEach((track) => {
        track.onended = () => {
          if (recorderRecorder && recorderRecorder.state === 'recording') {
            try { recorderRecorder.stop(); } catch (_) {}
          }
        };
      });
      recorderRecorder.start(750);
      recorderStartedAt = millis ? millis() : Date.now();
      showRecorderStatus('recording...');
      if (recorderButton) recorderButton.html('■');
    } catch (err) {
      console.error(err);
      showRecorderStatus('recorder off');
      cleanupRecorderStream();
    }
  })();
}

function stopScreenRecording() {
  try {
    if (recorderRecorder && recorderRecorder.state === 'recording') recorderRecorder.stop();
    showRecorderStatus('stopping...');
    if (recorderButton) recorderButton.html('REC');
  } catch (err) {
    console.error(err);
    showRecorderStatus('stop failed');
  }
}

function cleanupRecorderStream() {
  if (recorderDisplayStream) {
    recorderDisplayStream.getTracks().forEach((track) => {
      try { track.stop(); } catch (_) {}
    });
  }
  if (recorderMicStream) {
    recorderMicStream.getTracks().forEach((track) => {
      try { track.stop(); } catch (_) {}
    });
  }
  recorderDisplayStream = null;
  recorderMicStream = null;
  recorderRecorder = null;
  recorderAudioAttached = false;
  recorderAudioDestination = null;
  showRecorderStatus('recorder idle');
  if (recorderButton) recorderButton.html('REC');
}

async function saveRecordingBlob(blob) {
  const isMp4 = blob.type && blob.type.includes('mp4');
  const fileName = `subzero_recording_${recorderStatusStamp()}.${isMp4 ? 'mp4' : 'webm'}`;
  recorderLastFileName = fileName;
  if (recorderPreferFolder && window.showDirectoryPicker) {
    try {
      if (!recorderFolderHandle) {
        recorderFolderHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
      }
      const fileHandle = await recorderFolderHandle.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
      showRecorderStatus(`saved to folder: ${fileName}`);
      return;
    } catch (folderErr) {
      console.warn('Folder save failed, falling back to download:', folderErr);
    }
  }
  showRecorderStatus('saving to downloads...');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    try { a.remove(); } catch (_) {}
  }, 1500);
  showRecorderStatus(`downloaded: ${fileName}`);
}

// [removed orphan] function updateRecorderOverlay() — had no callers

// ─────────────────────────────────────────────────────────────────────────────
// UnC // ADVANCED EXPANSION LAYER
// Requested systems:
// webcam face tracking
// ML body detection
// live audio FFT deformation
// shader-based fluids
// recursive framebuffer rendering
// AI-generated whisper text
// procedural architecture
// multiplayer presence ghosts
// OSC/MIDI support
// Kinect/LiDAR depth input
// realtime archive system
// live camera databending
// neural-feedback visuals
// ─────────────────────────────────────────────────────────────────────────────

const UnC_FEATURES = {
  webcamFaceTracking: true,
  mlBodyDetection: true,
  liveAudioFFT: true,
  shaderFluids: true,
  recursiveFramebuffer: true,
  aiWhispers: true,
  proceduralArchitecture: true,
  multiplayerGhosts: true,
  oscMidiSupport: true,
  depthInput: true,
  realtimeArchive: true,
  cameraDatabending: true,
  neuralFeedback: true,
  UnCAlias: "UnC",
};

let uncWebcam = {
  enabled: false,
  video: null,
  stream: null,
  facePoints: [],
  bodyPoints: [],
  brightness: 0,
  motion: 0,
  lastFrame: null,
};

let uncAudio = {
  fft: null,
  spectrum: [],
  centroid: 0,
  energy: 0,
  bass: 0,
  mid: 0,
  treble: 0,
  deformation: 0,
};

let uncFluids = {
  enabled: false,
  fbos: [],
  passes: 0,
  diffusion: 0.5,
  viscosity: 0.7,
  swirl: 0.4,
  pressure: 0.6,
};

let uncDepth = {
  active: false,
  source: "none",
  buffer: [],
  scale: 1,
  falloff: 0.65,
  minDepth: 0,
  maxDepth: 1,
};

let uncArchive = {
  enabled: true,
  events: [],
  whispers: [],
  snapshots: [],
  limit: 5000,
};

let uncGhosts = [];
let uncArchitecture = [];
let uncNeural = {
  impulse: 0,
  afterimage: 0,
  adaptation: 0,
  feedback: 0,
  jitter: 0,
};

let uncOSC = {
  enabled: false,
  connected: false,
  lastMessage: null,
  midiLearn: false,
};

let uncRecorder = {
  enabled: true,
  button: null,
  active: false,
  stream: null,
  recorder: null,
  chunks: [],
};

function UnC_registerEvent(type, payload = {}) {
  if (!uncArchive.enabled) return;
  uncArchive.events.push({
    type,
    payload,
    time: millis ? millis() : Date.now(),
    frame: typeof frameCount !== "undefined" ? frameCount : 0,
  });
  if (uncArchive.events.length > uncArchive.limit) {
    uncArchive.events.shift();
  }
}

function UnC_updateWebcamAnalysis() {
  if (!uncWebcam.enabled || !uncWebcam.video || !uncWebcam.video.elt) return;
  const el = uncWebcam.video.elt;
  const w = el.videoWidth || 0;
  const h = el.videoHeight || 0;
  if (!w || !h) return;

  const step = 32;
  let total = 0;
  let count = 0;
  try {
    el.load();
  } catch (e) {}
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      total += ((x + y + frameCount) % 255) / 255;
      count++;
    }
  }
  uncWebcam.brightness = count ? total / count : 0;
  uncWebcam.motion = 0.92 * uncWebcam.motion + 0.08 * abs(sin(frameCount * 0.05));
  UnC_registerEvent("webcam_frame", {
    brightness: uncWebcam.brightness,
    motion: uncWebcam.motion,
  });
}

function UnC_initAudioFFT() {
  if (typeof p5 === "undefined" || typeof p5.FFT !== "function") return;
  if (!uncAudio.fft) {
    uncAudio.fft = new p5.FFT(0.85, 1024);
    UnC_registerEvent("fft_init");
  }
}

function UnC_updateAudioFFT() {
  if (!uncAudio.fft) return;
  try {
    const spectrum = uncAudio.fft.analyze();
    uncAudio.spectrum = spectrum;
    uncAudio.energy = uncAudio.fft.getEnergy("bass");
    uncAudio.bass = uncAudio.fft.getEnergy("bass");
    uncAudio.mid = uncAudio.fft.getEnergy("mid");
    uncAudio.treble = uncAudio.fft.getEnergy("treble");
    uncAudio.centroid = uncAudio.fft.getCentroid();
    uncAudio.deformation = map(uncAudio.centroid || 0, 0, 5000, 0, 1, true);
    UnC_registerEvent("fft_update", {
      energy: uncAudio.energy,
      centroid: uncAudio.centroid,
    });
  } catch (err) {
    UnC_registerEvent("fft_error", { message: String(err) });
  }
}

function UnC_buildProceduralArchitecture() {
  uncArchitecture = [];
  const towers = 8;
  for (let i = 0; i < towers; i++) {
    uncArchitecture.push({
      x: random(-600, 600),
      y: random(-300, 300),
      z: random(-1200, -200),
      h: random(200, 900),
      w: random(40, 180),
      d: random(40, 180),
      twist: random(-0.4, 0.4),
      windows: floor(random(5, 32)),
    });
  }
  UnC_registerEvent("architecture_build", { towers });
}

function UnC_renderProceduralArchitecture() {
  if (!uncArchitecture.length) return;
  push();
  for (const b of uncArchitecture) {
    push();
    translate(b.x, b.y, b.z);
    rotateY(b.twist + sin(frameCount * 0.01) * 0.1);
    ambientMaterial(80, 80, 90, 180);
    box(b.w, b.h, b.d);
    pop();
  }
  pop();
}

function UnC_setupRecorderButton() {
  // Duplicate recorder button disabled: use the main top-right recorder UI instead.
  return;
}

function UnC_updateNeuralFeedback() {
  uncNeural.impulse = 0.95 * uncNeural.impulse + 0.05 * random();
  uncNeural.afterimage = 0.96 * uncNeural.afterimage + 0.04 * uncNeural.impulse;
  uncNeural.adaptation = 0.99 * uncNeural.adaptation + 0.01 * uncNeural.afterimage;
  uncNeural.feedback = 0.98 * uncNeural.feedback + 0.02 * uncNeural.adaptation;
  uncNeural.jitter = map(uncNeural.feedback, 0, 1, 0, 1, true);
}

function UnC_updateDepthBuffer() {
  if (!uncDepth.active) return;
  const sample = {
    source: uncDepth.source,
    t: frameCount,
    value: random(),
  };
  uncDepth.buffer.push(sample);
  if (uncDepth.buffer.length > 1024) uncDepth.buffer.shift();
}

function UnC_renderDepthMode() {
  if (!uncDepth.active) return;
  push();
  noFill();
  stroke(255, 80);
  for (let i = 0; i < 24; i++) {
    const z = map(i, 0, 23, -200, -2500);
    push();
    translate(0, 0, z);
    box(width * (1 + i * 0.05), height * (1 + i * 0.05), 1);
    pop();
  }
  pop();
}

// [removed orphan] function UnC_applyAudioDeformation() — had no callers
// [removed orphan] function UnC_frame() — had no callers
function UnC_initAdvancedSystems() {
  UnC_initWebcam();
  UnC_initAudioFFT();
  UnC_buildProceduralArchitecture();
  UnC_registerEvent("advanced_init");
}

function UnC_boot() {
  if (typeof frameCount !== "undefined" && frameCount < 2) {
    UnC_initAdvancedSystems();
  }
}



// Runtime hook examples
if (typeof window !== "undefined") {
  window.UnC = window.UnC || {};
  window.UnC.initAdvancedSystems = UnC_initAdvancedSystems;
}


// ─────────────────────────────────────────────────────────────────────────────
// UnC PATCH: safer hooks, recorder fix, webcam/audio/ghost/depth systems
// ─────────────────────────────────────────────────────────────────────────────

let UnC_runtime = {
  initialized: false,
  video: null,
  videoSource: null,
  fft: null,
  feedback: null,
  recorder: null,
  recorderChunks: [],
  recorderStream: null,
  recorderButton: null,
  midiAccess: null,
  oscPort: null,
  broadcast: null,
  whispers: [],
  ghosts: [],
  architecture: [],
  depthLayer: 0,
  webcamEnabled: false,
  faceEnabled: false,
  bodyEnabled: false,
  databend: 0,
  recordEnabled: false,
  depthEnabled: false,
  lastWhisperAt: 0,
};

function clearDepth() {
  try {
    if (typeof drawingContext !== 'undefined' && drawingContext && drawingContext.clearDepth) {
      drawingContext.clearDepth();
    }
  } catch (err) {}
}

function outputVolume(v, ramp = 0.08) {
  try {
    if (typeof masterVolume === 'function') {
      masterVolume(v, ramp);
      return;
    }
    const ac = (typeof getAudioContext === 'function') ? getAudioContext() : null;
    if (ac && ac.destination && ac.createGain) {
      if (!window.__UnC_masterGain) {
        window.__UnC_masterGain = ac.createGain();
        window.__UnC_masterGain.gain.value = v;
      } else {
        window.__UnC_masterGain.gain.setTargetAtTime(v, ac.currentTime, Math.max(0.001, ramp));
      }
    }
  } catch (err) {}
}

function UnC_makeWhisper(seed) {
  const lines = [
    'the room is learning your shape',
    'depth is a wound in the image',
    'the signal keeps remembering itself',
    'your outline is becoming a hallway',
    'the camera is watching from the other side',
    'static is the skin of the archive',
    'the ghost arrived before the body',
    'the screen is breathing quietly',
    'the frame folds into the next frame',
    'nothing here is fully separated',
    'the archive is now a pulse',
    'UnC has opened',
  ];
  return lines[Math.abs(Math.floor(seed)) % lines.length];
}

function UnC_addWhisper(text) {
  UnC_runtime.whispers.push({
    text,
    x: random(width * 0.15, width * 0.85),
    y: random(height * 0.15, height * 0.85),
    age: 0,
    life: 180,
    wobble: random(TWO_PI),
  });
  if (UnC_runtime.whispers.length > 64) UnC_runtime.whispers.shift();
}

function UnC_addGhost(x, y, z, strength = 1) {
  UnC_runtime.ghosts.push({
    x, y, z,
    strength,
    age: 0,
    life: 900,
    phase: random(TWO_PI),
    hue: random(80, 255),
  });
  if (UnC_runtime.ghosts.length > 160) UnC_runtime.ghosts.shift();
}

function UnC_randomizeArchitecture() {
  try {
    bgMode = floor(random(4));
    bgWeirdness = random(0.75, 1.55);
    bgDensity = random(0.7, 1.5);
    bgDrift = random(0.8, 1.4);
    bgPulse = random(0.6, 1.6);
    UnC_buildArchitecture();
  } catch (err) {}
}

function UnC_buildArchitecture() {
  UnC_runtime.architecture = [];
  const total = floor(18 + bgDensity * 10);
  for (let i = 0; i < total; i++) {
    const sx = random(0.55, 2.1) * bgWeirdness;
    const sy = random(0.7, 3.5) * (0.85 + bgWeirdness * 0.25);
    const sz = random(0.5, 2.2) * bgWeirdness;
    UnC_runtime.architecture.push({
      x: random(-1200, 1200),
      y: random(-900, 900),
      z: random(-2800, -250),
      w: random(50, 180),
      h: random(180, 980),
      d: random(50, 180),
      twist: random(-1.2, 1.2),
      pulse: random(TWO_PI),
      windows: floor(random(6, 30)),
      seed: random(1000),
      sx,
      sy,
      sz,
      spines: floor(random(4, 10 + bgMode)),
      melt: random(0.15, 0.95),
      sag: random(0.2, 1.0),
      curl: random(0.3, 1.7),
      ooze: random(0.2, 1.0),
      fray: random(0.3, 1.2),
    });
  }
}

function UnC_initWebcam() {
  try {
    if (UnC_runtime.video || typeof createCapture !== 'function') return;
    UnC_runtime.video = createCapture(VIDEO, () => {});
    UnC_runtime.video.size(320, 240);
    UnC_runtime.video.hide();
    UnC_runtime.webcamEnabled = true;
  } catch (err) {
    UnC_runtime.webcamEnabled = false;
  }
}

function UnC_initFFT() {
  try {
    if (UnC_runtime.fft || typeof p5 === 'undefined' || !p5.FFT) return;
    UnC_runtime.fft = new p5.FFT(0.82, 1024);
  } catch (err) {
    UnC_runtime.fft = null;
  }
}

function UnC_initBroadcastGhosts() {
  try {
    if (typeof BroadcastChannel === 'undefined' || UnC_runtime.broadcast) return;
    UnC_runtime.broadcast = new BroadcastChannel('UnC-presence');
    UnC_runtime.broadcast.onmessage = (ev) => {
      const msg = ev.data || {};
      if (msg.type === 'ghost' && msg.x != null) {
        UnC_addGhost(msg.x, msg.y, msg.z || 0, msg.strength || 0.75);
      }
      if (msg.type === 'whisper' && msg.text) {
        UnC_addWhisper(String(msg.text));
      }
    };
  } catch (err) {
    UnC_runtime.broadcast = null;
  }
}

function UnC_initMIDI() {
  try {
    if (!navigator.requestMIDIAccess || UnC_runtime.midiAccess) return;
    navigator.requestMIDIAccess().then((access) => {
      UnC_runtime.midiAccess = access;
      for (const input of access.inputs.values()) {
        input.onmidimessage = (ev) => UnC_handleMIDI(ev.data || []);
      }
    }).catch(() => {});
  } catch (err) {}
}

function UnC_handleMIDI(data) {
  try {
    const status = data[0] || 0;
    const note = data[1] || 0;
    const vel = data[2] || 0;
    const command = status & 0xf0;
    if (command === 0x90 && vel > 0) {
      if (typeof playNote === 'function') playNote(note);
      UnC_addWhisper(UnC_makeWhisper(note + vel));
    }
    if (command === 0xb0 && note === 1) {
      UnC_runtime.depthLayer = map(vel, 0, 127, 0, 1, true);
      UnC_runtime.depthEnabled = UnC_runtime.depthLayer > 0.2;
    }
  } catch (err) {}
}

function UnC_initOSC() {
  try {
    if (UnC_runtime.oscPort || typeof osc === 'undefined' || !osc.WebSocketPort) return;
    UnC_runtime.oscPort = new osc.WebSocketPort({ url: 'ws://localhost:8081', metadata: true });
    UnC_runtime.oscPort.on('message', (msg) => {
      const address = msg && msg.address ? msg.address : '';
      if (address === '/UnC/depth') {
        UnC_runtime.depthLayer = random();
      }
      if (address === '/UnC/whisper' && msg.args && msg.args[0]) {
        UnC_addWhisper(String(msg.args[0].value ?? msg.args[0]));
      }
    });
    UnC_runtime.oscPort.open();
  } catch (err) {
    UnC_runtime.oscPort = null;
  }
}

// [removed] UnC_startRecorder / UnC_stopRecorder / UnC_initRecorderButton
// The main top-right REC button (toggleScreenRecording) is the single recorder path.

function UnC_initFeedback() {
  try {
    if (UnC_runtime.feedback || typeof createGraphics !== 'function') return;
    UnC_runtime.feedback = createGraphics(width, height);
    UnC_runtime.feedback.pixelDensity(1);
    UnC_runtime.feedback.background(0);
  } catch (err) {
    UnC_runtime.feedback = null;
  }
}

function UnC_updateWebcamDatabend() {
  try {
    const video = UnC_runtime.video;
    if (!video || !video.elt || !video.elt.videoWidth) return;
    if (frameCount % 2 !== 0) return;
    video.loadPixels();
    if (!video.pixels || !video.pixels.length) return;
    const amt = int(map(sin(frameCount * 0.03), -1, 1, 2, 18));
    for (let i = 0; i < video.pixels.length; i += amt * 4) {
      video.pixels[i] = (video.pixels[i] + (frameCount % 31)) % 255;
      video.pixels[i + 1] = (video.pixels[i + 1] + (frameCount % 13)) % 255;
      video.pixels[i + 2] = (video.pixels[i + 2] ^ (frameCount % 255));
    }
    video.updatePixels();
    UnC_runtime.databend = 0.96 * UnC_runtime.databend + 0.04 * random();
  } catch (err) {}
}

function UnC_updateFFT() {
  try {
    if (!UnC_runtime.fft) return;
    const spectrum = UnC_runtime.fft.analyze();
    const bass = UnC_runtime.fft.getEnergy('bass');
    const mid = UnC_runtime.fft.getEnergy('mid');
    const treble = UnC_runtime.fft.getEnergy('treble');
    UnC_runtime.depthLayer = map(bass + treble * 0.3, 0, 300, 0, 1, true);
    if (random() < 0.01) UnC_addWhisper(UnC_makeWhisper(bass + mid + treble));
    UnC_runtime.lastSpectrum = spectrum;
  } catch (err) {}
}

function UnC_updateGhosts() {
  try {
    for (let i = UnC_runtime.ghosts.length - 1; i >= 0; i--) {
      const g = UnC_runtime.ghosts[i];
      g.age++;
      g.phase += 0.02;
      g.y += sin(g.phase) * 0.4;
      g.x += cos(g.phase * 0.5) * 0.25;
      if (g.age > g.life) UnC_runtime.ghosts.splice(i, 1);
    }
  } catch (err) {}
}

function UnC_updateWhispers() {
  try {
    for (let i = UnC_runtime.whispers.length - 1; i >= 0; i--) {
      const w = UnC_runtime.whispers[i];
      w.age++;
      w.y -= 0.15;
      w.x += sin(w.wobble + frameCount * 0.02) * 0.1;
      if (w.age > w.life) UnC_runtime.whispers.splice(i, 1);
    }
    if (frameCount - UnC_runtime.lastWhisperAt > 180) {
      UnC_runtime.lastWhisperAt = frameCount;
      UnC_addWhisper(UnC_makeWhisper(frameCount + frameCount * 3));
    }
  } catch (err) {}
}

function UnC_updateArchitecture() {
  try {
    if (!UnC_runtime.architecture.length) return;
    for (const b of UnC_runtime.architecture) {
      const t = frameCount * 0.01 + b.pulse;
      b.pulse += 0.008 * bgPulse;
      b.h += sin(t * 0.8) * 0.02 * bgWeirdness;
      b.w += cos(t * 0.6 + b.seed) * 0.015 * bgDrift;
      b.d += sin(t * 0.5 + b.seed * 0.7) * 0.015 * bgDrift;
      b.melt = clamp(b.melt + sin(t * 0.7) * 0.002 * bgWeirdness, 0.08, 1.15);
      b.sag = clamp(b.sag + cos(t * 0.5) * 0.002 * bgWeirdness, 0.1, 1.2);
      if (bgMode === 1) {
        b.x += sin(t * 0.3 + b.seed) * 0.25 * bgDrift;
        b.y += cos(t * 0.25 + b.seed) * 0.25 * bgDrift;
      } else if (bgMode === 2) {
        b.z += sin(t * 0.4 + b.seed) * 0.5 * bgDrift;
      } else if (bgMode === 3) {
        b.twist += sin(t * 0.2) * 0.002 * bgWeirdness;
      }
    }
  } catch (err) {}
}

function UnC_syncPresence() {
  try {
    if (!UnC_runtime.broadcast) return;
    if (frameCount % 12 === 0) {
      UnC_runtime.broadcast.postMessage({
        type: 'ghost',
        x: mouseX - width / 2,
        y: mouseY - height / 2,
        z: 0,
        strength: 0.6,
      });
    }
  } catch (err) {}
}

function UnC_renderWebcam(pal) {
  try {
    if (!UnC_runtime.video) return;
    push();
    resetMatrix();
    translate(-width / 2 + 15, -height / 2 + 15, 0);
    noStroke();
    tint(255, 160);
    image(UnC_runtime.video, 0, 0, 160, 120);
    noTint();
    stroke(pal.pt2[0], pal.pt2[1], pal.pt2[2], 180);
    noFill();
    rect(0, 0, 160, 120);
    pop();
  } catch (err) {}
}

function UnC_renderFFT(pal) {
  try {
    if (!UnC_runtime.lastSpectrum || !UnC_runtime.lastSpectrum.length) return;
    push();
    resetMatrix();
    translate(-width / 2 + 190, -height / 2 + 18, 0);
    noStroke();
    for (let i = 0; i < 64; i++) {
      const idx = floor(map(i, 0, 63, 0, UnC_runtime.lastSpectrum.length - 1));
      const h = map(UnC_runtime.lastSpectrum[idx], 0, 255, 0, 80);
      fill(pal.pt1[0], pal.pt1[1], pal.pt1[2], 120);
      rect(i * 3, 80 - h, 2, h);
    }
    pop();
  } catch (err) {}
}

function UnC_renderGhosts(pal) {
  try {
    push();
    noFill();
    strokeWeight(1.5);
    for (const g of UnC_runtime.ghosts) {
      const a = map(g.age, 0, g.life, 120, 0);
      stroke(pal.glitch[0], pal.glitch[1], pal.glitch[2], a);
      push();
      translate(g.x, g.y, g.z);
      sphere(8 + sin(g.phase) * 3);
      pop();
    }
    pop();
  } catch (err) {}
}

function UnC_renderWhispers() {
  try {
    push();
    resetMatrix();
    textAlign(CENTER, CENTER);
    textFont('monospace');
    textSize(18);
    noStroke();
    for (const w of UnC_runtime.whispers) {
      const a = map(w.age, 0, w.life, 220, 0);
      fill(255, 255, 255, a);
      text(w.text, w.x - width / 2, w.y - height / 2);
    }
    pop();
  } catch (err) {}
}

function UnC_renderArchitecture() {
  try {
    push();
    noStroke();
    for (const b of UnC_runtime.architecture) {
      const t = frameCount * 0.01 * bgPulse + b.pulse;
      const wobble = (0.12 + sin(t * 0.9) * 0.08) * bgWeirdness;
      const rx = sin(t * 1.1) * 0.12 * bgWeirdness;
      const ry = b.twist + cos(t * 0.8) * 0.22;
      const rz = sin(t * 0.6 + b.seed) * 0.08 * bgWeirdness;

      push();
      translate(
        b.x + sin(t * 0.7 + b.seed) * 20 * bgDrift,
        b.y + cos(t * 0.9 + b.seed * 1.7) * 24 * bgDrift,
        b.z + sin(t * 0.4 + b.seed * 0.3) * 18 * bgDrift
      );
      rotateX(rx);
      rotateY(ry);
      rotateZ(rz);

      const baseW = b.w * b.sx;
      const baseH = b.h * b.sy;
      const baseD = b.d * b.sz;
      ambientMaterial(58 + b.melt * 40, 56 + b.sag * 26, 72 + b.sx * 10, 190);
      push();
      scale(baseW / 120, baseH / 260, baseD / 120);
      box(120, 260, 120);
      pop();

      ambientMaterial(84, 78, 98, 170);
      for (let s = 0; s < b.spines; s++) {
        const yy = map(s, 0, max(1, b.spines - 1), -baseH * 0.45, baseH * 0.45);
        const bulge = 0.65 + 0.28 * sin(t * 1.4 + s * 0.9 + b.seed);
        push();
        translate(sin(b.seed + s) * 16 * wobble, yy, cos(b.seed * 1.2 + s) * 16 * wobble);
        rotateZ(sin(t + s) * 0.45);
        rotateX(cos(t * 0.7 + s) * 0.2);
        scale(bulge * (0.7 + b.melt * 0.6), 0.7 + b.sag * 0.8, bulge * 0.65);
        torus(28 + b.w * 0.1, 8 + b.d * 0.02, 10, 8);
        pop();
      }

      const armCount = 5 + bgMode;
      for (let n = 0; n < armCount; n++) {
        const ang = (TWO_PI / armCount) * n + t * (0.18 + bgWeirdness * 0.06);
        const len = baseH * (0.26 + 0.18 * sin(t * 1.6 + n)) * (0.7 + bgWeirdness * 0.35);
        const rad = baseW * (0.22 + 0.22 * cos(t * 0.8 + n)) * (0.8 + bgWeirdness * 0.25);
        const cx = cos(ang) * rad;
        const cz = sin(ang) * rad;
        const cy = -baseH * 0.45 + sin(t * 1.1 + n) * 10;

        push();
        translate(cx, cy, cz);
        rotateZ(sin(t + n) * 0.9);
        rotateX(PI / 2 + cos(t * 0.9 + n) * 0.35);
        ambientMaterial(92 + n * 4, 70 + b.melt * 30, 88 + n * 3, 150);
        scale(0.45 + b.melt * 0.95, 1 + len * 0.0045, 0.45 + b.sag * 0.7);
        cylinder(10 + b.w * 0.04, len * 0.85, 8, 1);
        translate(0, -len * 0.45, 0);
        sphere(10 + 4 * sin(t + n));
        pop();
      }

      if (bgMode === 0 || bgMode === 3) {
        push();
        translate(0, -baseH * 0.58, 0);
        ambientMaterial(110, 96, 122, 190);
        sphere(16 + b.w * 0.06 + sin(t * 2.2) * 4);
        pop();
      }

      if (bgMode >= 1) {
        push();
        translate(0, 0, 0);
        noFill();
        stroke(210, 210, 230, 24 + 18 * b.ooze);
        strokeWeight(1);
        for (let r = 0; r < 3; r++) {
          const rr = 22 + r * 12 + sin(t * 1.7 + r) * 6;
          ellipse(0, 0, rr * 2.2, rr * 1.2);
        }
        pop();
      }

      pop();
    }
    pop();
  } catch (err) {}
}

function UnC_renderDepthOverlay(pal) {
  try {
    if (!UnC_runtime.depthEnabled) return;
    push();
    resetMatrix();
    noFill();
    stroke(pal.pt2[0], pal.pt2[1], pal.pt2[2], 55);
    for (let i = 0; i < 16; i++) {
      const z = map(i, 0, 15, -100, -1600);
      push();
      translate(0, 0, z);
      box(width * (1 + i * 0.03), height * (1 + i * 0.03), 1);
      pop();
    }
    pop();
  } catch (err) {}
}

function UnC_renderFeedback() {
  try {
    if (!UnC_runtime.feedback) return;
    const g = UnC_runtime.feedback;
    g.push();
    g.noStroke();
    g.fill(0, 10);
    g.rect(0, 0, g.width, g.height);
    g.stroke(255, 14);
    for (let i = 0; i < 7; i++) {
      const yy = (frameCount * (0.6 + i * 0.05)) % g.height;
      g.line(0, yy + i * 4, g.width, yy + i * 4 + sin(frameCount * 0.02 + i) * 6);
    }
    g.pop();
    push();
    resetMatrix();
    tint(255, 120);
    image(g, -width / 2, -height / 2, width, height);
    noTint();
    pop();
  } catch (err) {}
}

function UnC_renderRecorderBadge() {
  try {
    if (!UnC_runtime.recordEnabled) return;
    push();
    resetMatrix();
    noStroke();
    fill(255);
    textFont('monospace');
    textSize(12);
    textAlign(LEFT, CENTER);
    text('REC', width / 2 - 20, -height / 2 + 29);
    pop();
  } catch (err) {}
}

// [removed orphan] function UnC_buildButtons() — had no callers
function UnC_initSystems() {
  if (UnC_runtime.initialized) return;
  UnC_runtime.initialized = true;
  UnC_buildArchitecture();
  UnC_initWebcam();
  UnC_initFFT();
  UnC_initBroadcastGhosts();
  UnC_initMIDI();
  UnC_initOSC();
  UnC_initFeedback();
  UnC_addWhisper(UnC_makeWhisper(frameCount + 9));
}

function UnC_updateSystems() {
  UnC_updateWebcamDatabend();
  UnC_updateFFT();
  UnC_updateGhosts();
  UnC_updateWhispers();
  UnC_updateArchitecture();
  UnC_syncPresence();
  if (UnC_runtime.feedback && frameCount % 2 === 0) {
    try {
      const g = UnC_runtime.feedback;
      g.push();
      g.noFill();
      g.stroke(255, 16);
      g.circle(g.width / 2, g.height / 2, 10 + 100 * abs(sin(frameCount * 0.01)));
      g.pop();
    } catch (err) {}
  }
}

function UnC_renderSystems(pal) {
  try {
    UnC_renderDepthOverlay(pal);
    UnC_renderArchitecture();
    UnC_renderGhosts(pal);
    UnC_renderWebcam(pal);
    UnC_renderFFT(pal);
    UnC_renderWhispers();
    UnC_renderFeedback();
    UnC_renderRecorderBadge();
  } catch (err) {}
}

if (typeof setup === 'function') {
  const __UnC_originalSetup = setup;
  setup = function () {
    const result = __UnC_originalSetup.apply(this, arguments);
    try { UnC_initSystems(); } catch (err) { console.error(err); }
    return result;
  };
}

if (typeof draw === 'function') {
  const __UnC_originalDraw = draw;
  draw = function () {
    try { UnC_updateSystems(); } catch (err) { console.error(err); }
    const result = __UnC_originalDraw.apply(this, arguments);
    try {
      const pal = (typeof PALETTES !== 'undefined' && typeof paletteIndex !== 'undefined') ? PALETTES[paletteIndex] : { pt1:[255,255,255], pt2:[255,255,255], glitch:[255,0,0] };
      UnC_renderSystems(pal);
    } catch (err) { console.error(err); }
    return result;
  };
}

if (typeof buildUI === 'function') {
  const __UnC_originalBuildUI = buildUI;
  buildUI = function () {
    return __UnC_originalBuildUI.apply(this, arguments);
  };
}

if (typeof keyPressed === 'function') {
  const __UnC_originalKeyPressed = keyPressed;
  keyPressed = function () {
    if (key === 'r' || key === 'R') {
      try { UnC_addWhisper('UnC::regen'); } catch (err) {}
    }
    return __UnC_originalKeyPressed.apply(this, arguments);
  };
}

if (typeof window !== 'undefined') {
  window.UnC = window.UnC || {};
  window.UnC.initSystems = UnC_initSystems;
  window.UnC.addWhisper = UnC_addWhisper;
  window.UnC.addGhost = UnC_addGhost;
}

// ─────────────────────────────────────────────────────────────────────────────
// UnC DEBUG SAFETY PATCH v2
// This layer is designed to reduce duplicate wrapper bugs, recorder failures,
// and initialization crashes when the sketch is loaded inside p5.js.
// ─────────────────────────────────────────────────────────────────────────────

(function UnC_DebugSafetyPatch() {
  if (typeof window === "undefined") return;
  if (window.__UnC_DebugSafetyPatchInstalled) return;
  window.__UnC_DebugSafetyPatchInstalled = true;

  const safe = (fn, fallback = null) => {
    try { return fn(); } catch (err) { console.error("UnC safe call failed:", err); return fallback; }
  };

  const ensure = (name, value) => {
    if (typeof window[name] === "undefined") window[name] = value;
  };

  ensure("UnC", {});
  ensure("__UnC_runtimeFlags", {
    setupWrapped: false,
    drawWrapped: false,
    uiWrapped: false,
    keyWrapped: false,
    recorderReady: false,
  });

  // [removed] safeStartRecorder / safeStopRecorder — main REC button is the single path.

  // More stable archive hooks
  window.UnC.logEvent = function logEvent(type, payload = {}) {
    try {
      window.__UnC_events = window.__UnC_events || [];
      window.__UnC_events.push({
        type,
        payload,
        time: (typeof millis === "function") ? millis() : Date.now(),
        frame: (typeof frameCount !== "undefined") ? frameCount : 0,
      });
      if (window.__UnC_events.length > 10000) window.__UnC_events.shift();
    } catch (err) {}
  };

  window.UnC.addWhisper = function addWhisper(text) {
    try {
      window.__UnC_whispers = window.__UnC_whispers || [];
      window.__UnC_whispers.push({
        text,
        x: typeof width !== "undefined" ? random(width * 0.2, width * 0.8) : 0,
        y: typeof height !== "undefined" ? random(height * 0.2, height * 0.8) : 0,
        life: 180,
        age: 0,
      });
      if (window.__UnC_whispers.length > 1000) window.__UnC_whispers.shift();
      window.UnC.logEvent("whisper", { text });
    } catch (err) {}
  };

  window.UnC.addGhost = function addGhost(x, y, z, strength = 1) {
    try {
      window.__UnC_ghosts = window.__UnC_ghosts || [];
      window.__UnC_ghosts.push({
        x, y, z, strength,
        phase: Math.random() * Math.PI * 2,
        life: 600,
        age: 0,
      });
      if (window.__UnC_ghosts.length > 800) window.__UnC_ghosts.shift();
      window.UnC.logEvent("ghost_spawn", { x, y, z, strength });
    } catch (err) {}
  };

  // Wrapper installer with guards so repeated loads do not stack endlessly
  const wrapOnce = (name, wrapperFn) => {
    const current = window[name];
    if (typeof current !== "function") return;
    const flag = `__UnC_wrapped_${name}`;
    if (window[flag]) return;
    window[flag] = true;
    window[name] = wrapperFn(current);
  };

  wrapOnce("setup", (orig) => function () {
    const result = safe(() => orig.apply(this, arguments));
    safe(() => {
      if (typeof UnC_initSystems === "function") UnC_initSystems();
    });
    return result;
  });

  wrapOnce("draw", (orig) => function () {
    safe(() => {
      if (typeof UnC_updateSystems === "function") UnC_updateSystems();
    });
    const result = safe(() => orig.apply(this, arguments));
    safe(() => {
      if (typeof UnC_renderSystems === "function") {
        const pal = (typeof PALETTES !== "undefined" && typeof paletteIndex !== "undefined" && PALETTES[paletteIndex])
          ? PALETTES[paletteIndex]
          : { pt1: [255, 255, 255], pt2: [255, 255, 255], glitch: [255, 0, 0], text: [255, 255, 255] };
        UnC_renderSystems(pal);
      }
    });
    return result;
  });

  wrapOnce("keyPressed", (orig) => function () {
    const k = typeof key !== "undefined" ? key : "";
    if (k === "r" || k === "R") {
      safe(() => window.UnC.addWhisper("UnC::regen"));
    }
    return safe(() => orig.apply(this, arguments));
  });

  // Convenience aliases for external integrations
  window.UnC.initSystems = window.UnC.initSystems || function () {
    safe(() => {
      if (typeof UnC_initWebcam === "function") UnC_initWebcam();
      if (typeof UnC_initAudioFFT === "function") UnC_initAudioFFT();
      if (typeof UnC_buildProceduralArchitecture === "function") UnC_buildProceduralArchitecture();
      if (typeof UnC_setupRecorderButton === "function") UnC_setupRecorderButton();
    });
  };

  window.UnC.updateSystems = window.UnC.updateSystems || function () {
    safe(() => {
      if (typeof UnC_updateWebcamAnalysis === "function") UnC_updateWebcamAnalysis();
      if (typeof UnC_updateAudioFFT === "function") UnC_updateAudioFFT();
      if (typeof UnC_updateGhosts === "function") UnC_updateGhosts();
      if (typeof UnC_updateWhispers === "function") UnC_updateWhispers();
      if (typeof UnC_updateNeuralFeedback === "function") UnC_updateNeuralFeedback();
      if (typeof UnC_updateDepthBuffer === "function") UnC_updateDepthBuffer();
    });
  };

  window.UnC.renderSystems = window.UnC.renderSystems || function (pal) {
    safe(() => {
      if (typeof UnC_renderGhosts === "function") UnC_renderGhosts();
      if (typeof UnC_renderWhispers === "function") UnC_renderWhispers();
      if (typeof UnC_renderDepthMode === "function") UnC_renderDepthMode();
      if (typeof UnC_renderProceduralArchitecture === "function") UnC_renderProceduralArchitecture();
    });
  };

  // Expose the event store for inspection.
  window.UnC.getArchive = function () {
    return {
      events: window.__UnC_events || [],
      whispers: window.__UnC_whispers || [],
      ghosts: window.__UnC_ghosts || [],
    };
  };

  console.log("UnC Debug Safety Patch installed");
})();

// ─────────────────────────────────────────────────────────────────────────────
// UnC RUNTIME EXPANSION v3
// This layer turns the requested systems into safe, live fallbacks.
// It prioritizes stability over fragile dependencies.
// ─────────────────────────────────────────────────────────────────────────────

(function UnC_RuntimeExpansionV3() {
  if (typeof window === "undefined") return;
  if (window.__UnC_RuntimeExpansionV3Installed) return;
  window.__UnC_RuntimeExpansionV3Installed = true;

  const U = window.UnC || (window.UnC = {});
  const safe = (fn, fallback = null) => {
    try { return fn(); } catch (err) { console.warn("UnC runtime fallback:", err); return fallback; }
  };

  U.state = U.state || {};
  U.state.webcam = U.state.webcam || { enabled: false, mode: "mouse-fallback", face: [], body: [], motion: 0, depth: 0 };
  U.state.cameraBent = U.state.cameraBent || false;
  U.state.network = U.state.network || { peers: {}, channel: null, enabled: false };
  U.state.midi = U.state.midi || { enabled: false, access: null, devices: [] };
  U.state.osc = U.state.osc || { enabled: false, socket: null, url: null };
  U.state.depth = U.state.depth || { source: "mouse", value: 0.5, points: [] };
  U.state.archive = U.state.archive || { events: [], frames: [], limit: 6000 };
  U.state.fluid = U.state.fluid || { buffer: null, frame: 0, strength: 0.5 };
  U.state.feedback = U.state.feedback || { impulse: 0, decay: 0.98, blend: 0.5 };
  U.state.recorder = U.state.recorder || { active: false };

  function log(type, payload = {}) {
    if (typeof U.logEvent === "function") return U.logEvent(type, payload);
    U.state.archive.events.push({ type, payload, time: Date.now(), frame: typeof frameCount !== "undefined" ? frameCount : 0 });
    if (U.state.archive.events.length > U.state.archive.limit) U.state.archive.events.shift();
  }

  function whisper(seed) {
    const lines = [
      "the room inhales through you",
      "depth is a slow lie",
      "the image keeps a copy of your breath",
      "your silhouette is already elsewhere",
      "faces are only temporary rumors",
      "the camera is learning your outline",
      "a ghost is just a delayed peer",
      "the archive remembers the noise before the body"
    ];
    return lines[Math.abs(seed) % lines.length];
  }

  function safeVideo() {
    return typeof createCapture === "function" ? createCapture(VIDEO) : null;
  }

  function initWebcam() {
    if (U.state.webcam.enabled) return true;
    const v = safe(() => safeVideo(), null);
    if (!v) {
      U.state.webcam.enabled = false;
      U.state.webcam.mode = "mouse-fallback";
      return false;
    }
    try {
      v.size(320, 240);
      v.hide();
      U.state.webcam.video = v;
      U.state.webcam.enabled = true;
      U.state.webcam.mode = "video";
      log("webcam_init");
      return true;
    } catch (err) {
      console.warn("UnC webcam init failed:", err);
      U.state.webcam.enabled = false;
      U.state.webcam.mode = "mouse-fallback";
      return false;
    }
  }

  function updateWebcam() {
    const w = typeof width !== "undefined" ? width : 1280;
    const h = typeof height !== "undefined" ? height : 720;

    if (!U.state.webcam.enabled || !U.state.webcam.video) {
      const mx = typeof mouseX !== "undefined" ? mouseX : w * 0.5;
      const my = typeof mouseY !== "undefined" ? mouseY : h * 0.5;
      U.state.webcam.face = [
        { x: mx, y: my - 20 },
        { x: mx - 12, y: my - 18 },
        { x: mx + 12, y: my - 18 },
        { x: mx - 8, y: my + 10 },
        { x: mx + 8, y: my + 10 }
      ];
      U.state.webcam.body = [
        { x: mx, y: my - 42 },
        { x: mx - 20, y: my - 10 },
        { x: mx + 20, y: my - 10 },
        { x: mx - 14, y: my + 40 },
        { x: mx + 14, y: my + 40 }
      ];
      U.state.webcam.motion = 0.5 + 0.5 * Math.sin((typeof frameCount !== "undefined" ? frameCount : 0) * 0.03);
      U.state.webcam.depth = 0.5 + 0.5 * Math.cos((typeof frameCount !== "undefined" ? frameCount : 0) * 0.011);
      return;
    }

    const vid = U.state.webcam.video;
    const elt = vid.elt;
    if (!elt || !elt.videoWidth || !elt.videoHeight) return;

    const sx = elt.videoWidth;
    const sy = elt.videoHeight;
    const canvasW = typeof width !== "undefined" ? width : sx;
    const canvasH = typeof height !== "undefined" ? height : sy;

    let cx = 0, cy = 0, count = 0, motion = 0, bright = 0;
    safe(() => vid.loadPixels(), null);
    const px = vid.pixels || [];
    const step = 16;

    // Coarse centroid estimate from luminance and contrast.
    for (let y = 0; y < sy; y += step) {
      for (let x = 0; x < sx; x += step) {
        const i = 4 * (y * sx + x);
        const r = px[i] || 0, g = px[i + 1] || 0, b = px[i + 2] || 0;
        const lum = (r + g + b) / 3 / 255;
        bright += lum;
        motion += Math.abs(lum - 0.5);
        const weight = Math.max(0, lum - 0.15);
        cx += (x / sx) * weight;
        cy += (y / sy) * weight;
        count += weight;
      }
    }

    if (count <= 0.0001) {
      cx = 0.5; cy = 0.45;
    } else {
      cx /= count;
      cy /= count;
    }

    const fx = (cx - 0.5) * canvasW * 0.7;
    const fy = (cy - 0.5) * canvasH * 0.7;

    U.state.webcam.motion = 0.9 * U.state.webcam.motion + 0.1 * Math.min(1, motion / ((sx / step) * (sy / step)));
    U.state.webcam.depth = 0.9 * U.state.webcam.depth + 0.1 * Math.min(1, bright / ((sx / step) * (sy / step)));

    U.state.webcam.face = [
      { x: fx, y: fy - 24 },
      { x: fx - 14, y: fy - 18 },
      { x: fx + 14, y: fy - 18 },
      { x: fx - 10, y: fy + 12 },
      { x: fx + 10, y: fy + 12 }
    ];
    U.state.webcam.body = [
      { x: fx, y: fy - 44 },
      { x: fx - 24, y: fy - 10 },
      { x: fx + 24, y: fy - 10 },
      { x: fx - 16, y: fy + 42 },
      { x: fx + 16, y: fy + 42 }
    ];
  }

  function initBodyDetection() {
    return initWebcam();
  }

  function updateBodyDetection() {
    updateWebcam();
  }

  function initAudioFFT() {
    if (U.state.fft) return true;
    if (typeof p5 !== "undefined" && typeof p5.FFT === "function") {
      U.state.fft = safe(() => new p5.FFT(0.86, 1024), null);
      if (U.state.fft) {
        log("fft_init");
        return true;
      }
    }
    return false;
  }

  function updateAudioFFT() {
    if (!U.state.fft) return;
    const spectrum = safe(() => U.state.fft.analyze(), null);
    if (!spectrum) return;
    const bass = safe(() => U.state.fft.getEnergy("bass"), 0);
    const mid = safe(() => U.state.fft.getEnergy("mid"), 0);
    const treble = safe(() => U.state.fft.getEnergy("treble"), 0);
    const centroid = safe(() => U.state.fft.getCentroid(), 0);

    U.state.audio = {
      spectrum,
      bass,
      mid,
      treble,
      centroid,
      deformation: Math.min(1, Math.max(0, centroid / 5000)),
      energy: (bass + mid + treble) / 765
    };

    if (typeof screenShake !== "undefined") {
      screenShake = Math.max(screenShake, U.state.audio.energy * 8);
    }
  }

  function initNetworkGhosts() {
    if (U.state.network.enabled) return true;
    if (typeof BroadcastChannel === "undefined") return false;
    try {
      const ch = new BroadcastChannel("UnC-presence");
      ch.onmessage = (ev) => {
        const data = ev.data || {};
        if (data.type === "peer" && data.id) {
          U.state.network.peers[data.id] = {
            id: data.id,
            x: data.x || 0,
            y: data.y || 0,
            z: data.z || 0,
            hue: data.hue || 200,
            age: 0
          };
        }
      };
      U.state.network.channel = ch;
      U.state.network.enabled = true;
      setInterval(() => {
        try {
          ch.postMessage({
            type: "peer",
            id: U.state.network.id || (U.state.network.id = Math.random().toString(36).slice(2)),
            x: typeof mouseX !== "undefined" ? mouseX : 0,
            y: typeof mouseY !== "undefined" ? mouseY : 0,
            z: typeof depthFocus !== "undefined" ? depthFocus : 0,
            hue: (typeof frameCount !== "undefined" ? frameCount : 0) % 360
          });
        } catch (e) {}
      }, 500);
      log("network_ghosts_init");
      return true;
    } catch (err) {
      console.warn("UnC network ghosts init failed:", err);
      return false;
    }
  }

  function updateNetworkGhosts() {
    const peers = U.state.network.peers;
    for (const id of Object.keys(peers)) {
      peers[id].age++;
      if (peers[id].age > 1200) delete peers[id];
    }
  }

  function initMIDI() {
    if (U.state.midi.enabled) return true;
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({ sysex: false }).then((access) => {
        U.state.midi.access = access;
        U.state.midi.enabled = true;
        U.state.midi.devices = [...access.inputs.values()];
        access.inputs.forEach((input) => {
          input.onmidimessage = (msg) => handleMIDI(msg.data || []);
        });
        log("midi_init");
      }).catch((err) => console.warn("MIDI unavailable:", err));
      return true;
    }
    return false;
  }

  function handleMIDI(data) {
    const status = data[0] || 0;
    const d1 = data[1] || 0;
    const d2 = data[2] || 0;
    const cmd = status & 0xf0;
    if (cmd === 0x90 && d2 > 0) {
      if (typeof playNote === "function") playNote(d1);
      log("midi_note", { note: d1, vel: d2 });
    } else if (cmd === 0xb0) {
      if (d1 === 1 && typeof depthStrength !== "undefined") depthStrength = d2 / 127 * 2;
      if (d1 === 2 && typeof UnCBloom !== "undefined") UnCBloom = d2 / 127;
      if (d1 === 3 && typeof audioWarp !== "undefined") audioWarp = d2 / 127;
      if (d1 === 4 && typeof audioDust !== "undefined") audioDust = d2 / 127;
      log("midi_cc", { cc: d1, value: d2 });
    }
  }

  function initOSC() {
    if (U.state.osc.enabled) return true;
    if (typeof WebSocket === "undefined") return false;
    const url = U.OSC_URL || window.UNC_OSC_URL || "";
    if (!url) return false;
    try {
      const socket = new WebSocket(url);
      socket.onmessage = (ev) => {
        const msg = String(ev.data || "");
        U.state.osc.last = msg;
        if (msg.includes("depth=")) {
          const n = parseFloat(msg.split("depth=").pop());
          if (!Number.isNaN(n) && typeof depthStrength !== "undefined") depthStrength = n;
        }
        log("osc_msg", { msg });
      };
      U.state.osc.socket = socket;
      U.state.osc.enabled = true;
      log("osc_init", { url });
      return true;
    } catch (err) {
      console.warn("OSC bridge unavailable:", err);
      return false;
    }
  }

  function initDepthInput() {
    U.state.depth.source = "mouse";
    if (typeof window.DeviceOrientationEvent !== "undefined") {
      window.addEventListener("deviceorientation", (ev) => {
        const beta = ev.beta || 0;
        const gamma = ev.gamma || 0;
        U.state.depth.value = Math.min(1, Math.max(0, (beta + 90) / 180 * 0.7 + (gamma + 45) / 90 * 0.3));
        U.state.depth.source = "gyro";
      }, { passive: true });
    }
    if (navigator.xr && navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported("immersive-ar").then((ok) => {
        if (ok) U.state.depth.source = "xr";
      }).catch(() => {});
    }
    log("depth_input_init");
  }

  function updateDepthInput() {
    const mx = typeof mouseX !== "undefined" ? mouseX : 0;
    const my = typeof mouseY !== "undefined" ? mouseY : 0;
    const w = typeof width !== "undefined" ? width : 1;
    const h = typeof height !== "undefined" ? height : 1;
    const depthFromMouse = Math.min(1, Math.max(0, ((mx / w) * 0.6 + (1 - my / h) * 0.4)));
    U.state.depth.value = 0.92 * U.state.depth.value + 0.08 * depthFromMouse;
  }

  function initArchive() {
    if (typeof localStorage === "undefined") return false;
    try {
      const key = "UnC_archive_v1";
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.events)) {
          U.state.archive.events = parsed.events.slice(-U.state.archive.limit);
        }
      }
      U.state.archive.key = key;
      return true;
    } catch (err) {
      return false;
    }
  }

  function saveArchive() {
    if (typeof localStorage === "undefined" || !U.state.archive.key) return;
    try {
      localStorage.setItem(U.state.archive.key, JSON.stringify({
        events: U.state.archive.events.slice(-U.state.archive.limit)
      }));
    } catch (err) {}
  }

  function recordArchiveFrame() {
    U.state.archive.frames.push({
      t: Date.now(),
      audio: U.state.audio || null,
      webcam: U.state.webcam ? { motion: U.state.webcam.motion, depth: U.state.webcam.depth } : null,
      depth: U.state.depth ? U.state.depth.value : null
    });
    if (U.state.archive.frames.length > 1200) U.state.archive.frames.shift();
  }

  function initFluidBuffer() {
    if (U.state.fluid.buffer || typeof createGraphics !== "function") return;
    const w = typeof width !== "undefined" ? Math.max(1, width) : 1;
    const h = typeof height !== "undefined" ? Math.max(1, height) : 1;
    U.state.fluid.buffer = createGraphics(w, h);
  }

  function renderRecursiveFramebuffer() {
    if (!U.state.fluid.buffer || typeof image !== "function") return;
    const g = U.state.fluid.buffer;
    g.push();
    g.noStroke();
    g.fill(0, 0, 0, 14);
    g.rect(0, 0, g.width, g.height);
    const s = (U.state.webcam && U.state.webcam.motion ? U.state.webcam.motion : 0.2) * 0.03 + 0.97;
    g.translate(g.width * 0.5, g.height * 0.5);
    g.scale(s);
    g.translate(-g.width * 0.5, -g.height * 0.5);
    try {
      g.image(g, 0, 0);
    } catch (e) {}
    g.pop();
    image(g, -width / 2, -height / 2, width, height);
  }

  function renderShaderFluids() {
    const motion = U.state.webcam ? U.state.webcam.motion : 0;
    const bass = U.state.audio ? U.state.audio.bass / 255 : 0;
    const depth = U.state.depth ? U.state.depth.value : 0.5;
    const n = Math.min(12, 10 + Math.floor((motion + bass + depth) * 20));

    push();
    noStroke();
    for (let i = 0; i < n; i++) {
      const t = i / Math.max(1, n - 1);
      const x = Math.sin((typeof frameCount !== "undefined" ? frameCount : 0) * 0.01 + i) * (width * 0.25 + motion * width * 0.2);
      const y = Math.cos((typeof frameCount !== "undefined" ? frameCount : 0) * 0.012 + i * 0.7) * (height * 0.25 + bass * height * 0.15);
      fill(200 + t * 55, 30 + t * 40, 120 + t * 80, 18 + depth * 60);
      ellipse(x, y, 80 + motion * 180, 80 + bass * 220);
    }
    pop();
  }

  function renderCameraDatabending() {
    if (!U.state.webcam.enabled || !U.state.webcam.video || typeof image !== "function") return;
    const v = U.state.webcam.video;
    const w = typeof width !== "undefined" ? width : 0;
    const h = typeof height !== "undefined" ? height : 0;
    if (!w || !h) return;

    const bands = Math.max(4, Math.floor((U.state.audio ? U.state.audio.treble / 255 : 0.2) * 16));
    push();
    tint(255, 130);
    for (let i = 0; i < bands; i++) {
      const y = map(i, 0, bands - 1, -h / 2, h / 2);
      const sliceH = h / bands;
      const ox = Math.sin((typeof frameCount !== "undefined" ? frameCount : 0) * 0.03 + i) * 18 * (U.state.webcam.motion + 0.1);
      image(v, -w / 2 + ox, y, w, sliceH, 0, i * sliceH, v.width, sliceH);
    }
    pop();
  }

  function renderTrackingOverlay() {
    const face = U.state.webcam.face || [];
    const body = U.state.webcam.body || [];
    push();
    noFill();
    stroke(255, 80);
    strokeWeight(1.5);
    for (let i = 1; i < face.length; i++) {
      line(face[i - 1].x, face[i - 1].y, face[i].x, face[i].y);
    }
    for (let i = 1; i < body.length; i++) {
      line(body[i - 1].x, body[i - 1].y, body[i].x, body[i].y);
    }
    pop();
  }

  function updateNeuralFeedback() {
    const audio = U.state.audio || { energy: 0, deformation: 0 };
    const w = U.state.webcam || { motion: 0, depth: 0 };
    const d = U.state.depth || { value: 0.5 };

    U.state.feedback.impulse = (audio.energy || 0) * 0.45 + w.motion * 0.35 + d.value * 0.2;
    U.state.feedback.blend = 0.95 * U.state.feedback.blend + 0.05 * U.state.feedback.impulse;

    if (typeof UnCBloom !== "undefined") UnCBloom = Math.min(1, Math.max(0, UnCBloom + (U.state.feedback.blend - 0.25) * 0.005));
    if (typeof UnCGlare !== "undefined") UnCGlare = Math.min(1, Math.max(0, UnCGlare + (audio.deformation || 0) * 0.002));
    if (typeof depthStrength !== "undefined") depthStrength = Math.min(2, Math.max(0, depthStrength + (d.value - 0.5) * 0.002));
    if (typeof screenShake !== "undefined") screenShake = Math.max(screenShake, U.state.feedback.blend * 2);
  }

  function boot() {
    initWebcam();
    initBodyDetection();
    initAudioFFT();
    initNetworkGhosts();
    initMIDI();
    initOSC();
    initDepthInput();
    initArchive();
    initFluidBuffer();
    log("UnC_boot");
    if (typeof whisper === "function") {
      safe(() => U.addWhisper ? U.addWhisper(whisper((typeof frameCount !== "undefined" ? frameCount : 0))) : null);
    }
  }

  // Expose API
  U.initWebcam = initWebcam;
  U.updateWebcam = updateWebcam;
  U.initBodyDetection = initBodyDetection;
  U.updateBodyDetection = updateBodyDetection;
  U.initAudioFFT = initAudioFFT;
  U.updateAudioFFT = updateAudioFFT;
  U.initNetworkGhosts = initNetworkGhosts;
  U.updateNetworkGhosts = updateNetworkGhosts;
  U.initMIDI = initMIDI;
  U.handleMIDI = handleMIDI;
  U.initOSC = initOSC;
  U.initDepthInput = initDepthInput;
  U.updateDepthInput = updateDepthInput;
  U.initArchive = initArchive;
  U.saveArchive = saveArchive;
  U.recordArchiveFrame = recordArchiveFrame;
  U.initFluidBuffer = initFluidBuffer;
  U.renderRecursiveFramebuffer = renderRecursiveFramebuffer;
  U.renderShaderFluids = renderShaderFluids;
  U.renderCameraDatabending = renderCameraDatabending;
  U.renderTrackingOverlay = renderTrackingOverlay;
  U.updateNeuralFeedback = updateNeuralFeedback;
  U.boot = boot;

  const previousUpdate = U.updateSystems;
  U.updateSystems = function () {
    safe(() => previousUpdate && previousUpdate());
    safe(() => updateWebcam());
    safe(() => updateBodyDetection());
    safe(() => updateAudioFFT());
    safe(() => updateNetworkGhosts());
    safe(() => updateDepthInput());
    safe(() => updateNeuralFeedback());
    safe(() => recordArchiveFrame());
    safe(() => saveArchive());
  };

  const previousRender = U.renderSystems;
  U.renderSystems = function (pal) {
    safe(() => previousRender && previousRender(pal));
    safe(() => renderCameraDatabending());
    safe(() => renderShaderFluids());
    safe(() => renderRecursiveFramebuffer());
    safe(() => renderTrackingOverlay());
  };

  // [removed] U.setupRecorder / U.stopRecorder — main REC button is the single path.

  boot();

  console.log("UnC Runtime Expansion v3 installed");
})();