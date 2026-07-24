// TipPal hero animation — scenes for animations-v2 SceneStage
const {SceneStage, useTime, useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakToggle} = window;

const BG = '#E2CCF3', ACCENT = '#30006a', SECONDARY = '#8A2BE2', PRIMARY = '#007FFF', HEART = '#FF7A59';
const FRED = "'Fredoka', sans-serif", JAK = "'Plus Jakarta Sans', sans-serif";
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (p, a, b) => cl((p - a) / (b - a));
const ez = t => 1 - Math.pow(1 - t, 3);
const easeIO = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const joy = t => { const c = 2.05, u = t - 1; return t <= 0 ? 0 : 1 + u * u * ((c + 1) * u + c); };

const CHARS = [
  {img: 'assets/barista.png', x: 10, y: 478, w: 330, h: 422, pill: {label: 'Baristas', cx: 170}, phone: [300, 700], focus: {cx: 220, cy: 600}},
  {img: 'assets/valet.png', x: 330, y: 480, w: 280, h: 420, pill: {label: 'Valet', cx: 470}, phone: [545, 700], focus: {cx: 480, cy: 600}},
  {img: 'assets/driver.png', x: 612, y: 331, w: 398, h: 376, pill: null, phone: [725, 595], focus: {cx: 805, cy: 500}},
  {img: 'assets/housekeeper.png', x: 1000, y: 483, w: 285, h: 417, pill: {label: 'Housekeeping', cx: 1170}, phone: [1230, 720], focus: {cx: 1140, cy: 600}},
  {img: 'assets/creator.png', x: 1255, y: 456, w: 345, h: 444, pill: {label: 'Creators', cx: 1430}, phone: [1498, 676], focus: {cx: 1420, cy: 590}},
];
const FULL = {cx: 800, cy: 450, z: 1};
const TweaksCtx = React.createContext({hearts: true, zoom: 1.9});

const ICONS = {
  Baristas: <path d="M6 8h11v7a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8zm11 2h1.5a2.5 2.5 0 0 1 0 5H17M8 4.5v1.5M11.5 4v2M15 4.5v1.5" />,
  Valet: <path d="M14.5 4a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm-4 9.5L4 20m2.5-2.5L9 20m-3.5-1L4 17.5" />,
  Housekeeping: <path d="M4 8.5h13a3 3 0 0 1 3 3V13H4V8.5zM4 13h16v3.5H4V13zm0 3.5h16V20H4v-3.5z" />,
  Creators: <path d="M4 8h3l1.5-2h5L15 8h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zm7.5 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />,
};

function focusOf(i, zoom) {
  const f = CHARS[i].focus;
  return {cx: f.cx, cy: f.cy, z: i === 2 ? zoom * .92 : zoom};
}
function camAt(from, to, p) {
  const e = easeIO(seg(p, 0, .45));
  const c = {cx: from.cx + (to.cx - from.cx) * e, cy: from.cy + (to.cy - from.cy) * e, z: from.z + (to.z - from.z) * e};
  if (to.z > 1.05 && p > .45) {
    const d = Math.sin(Math.PI * seg(p, .45, 1));
    c.z += .05 * d; c.cy -= 6 * d;
  }
  return c;
}

function Heart({x, y, size, color, opacity, rot}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{position: 'absolute', left: x, top: y, opacity, transform: `rotate(${rot}deg)`}}>
    <path fill={color} d="M12 21C12 21 3 15.5 3 9.5C3 6.5 5.5 4 8.5 4C10 4 11.3 4.8 12 6C12.7 4.8 14 4 15.5 4C18.5 4 21 6.5 21 9.5C21 15.5 12 21 12 21Z" />
  </svg>;
}

function AmbientHearts({fade}) {
  const t = useTime();
  const tw = React.useContext(TweaksCtx);
  if (!tw.hearts || fade <= 0) return null;
  const cols = ['#FF7A59', '#b78df0', '#8A2BE2', '#9bbcff'];
  const hearts = [];
  for (let i = 0; i < 10; i++) {
    const x = (137 + i * 331) % 1520 + 30;
    const spd = 55 + (i * 37) % 40;
    const y = 960 - ((t * spd + i * 217) % 1080);
    const u = 1 - (y + 120) / 1080;
    const op = Math.sin(Math.PI * cl(1 - (y + 60) / 1020)) * .55 * fade;
    hearts.push(<Heart key={i} x={x + Math.sin(t * .8 + i) * 14} y={y} size={16 + (i * 53) % 22} color={cols[i % 4]} opacity={op} rot={Math.sin(t * .6 + i * 2) * 16} />);
  }
  return <React.Fragment>{hearts}</React.Fragment>;
}

function Rings({cx, cy, lt, env}) {
  if (env <= 0) return null;
  const rings = [0, 1, 2].map(k => {
    const ph = ((lt * .75 + k * .333) % 1);
    return <div key={k} style={{position: 'absolute', left: cx - 60 * ph - 25, top: cy - 60 * ph - 25, width: 50 + 120 * ph, height: 50 + 120 * ph, borderRadius: '50%', border: `3px solid ${SECONDARY}`, opacity: env * (1 - ph) * .65}} />;
  });
  return <React.Fragment>{rings}</React.Fragment>;
}

function Pill({c, scale, glow}) {
  return <div style={{position: 'absolute', left: c.pill.cx, top: 852, transform: `translate(-50%,-50%) scale(${scale})`, display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 9999, padding: '13px 26px', boxShadow: glow > 0 ? `0 6px 24px rgba(48,0,106,${.12 + .18 * glow}), 0 0 0 ${3 * glow}px rgba(138,43,226,${.35 * glow})` : '0 6px 24px rgba(48,0,106,.12)'}}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONS[c.pill.label]}</svg>
    <span style={{fontFamily: JAK, fontWeight: 700, fontSize: 25, color: ACCENT, whiteSpace: 'nowrap'}}>{c.pill.label}</span>
  </div>;
}

// ip: intro progress (1 = settled). active: focused char index or -1.
function SetContent({ip, active, p, lt}) {
  const h1a = 'Gratitude is human.'.split(' '), h1b = 'No pressure.'.split(' ');
  const wordStyle = (i, color) => {
    const e = ip >= 1 ? 1 : ez(seg(ip, .12 + i * .05, .26 + i * .05));
    return {display: 'inline-block', color, opacity: e, transform: `translateY(${24 * (1 - e)}px)`, marginRight: '.28em'};
  };
  const logoE = ip >= 1 ? 1 : joy(seg(ip, .05, .2));
  const l2 = ip >= 1 ? 1 : ez(seg(ip, .38, .52));
  const l3 = ip >= 1 ? 1 : ez(seg(ip, .48, .62));
  const chip = ip >= 1 ? 1 : ez(seg(ip, .52, .66));
  return <React.Fragment>
    <AmbientHearts fade={ip >= 1 ? 1 : seg(ip, .55, .85)} />
    <img src="assets/logo.png" alt="TipPal" style={{position: 'absolute', left: 55, top: 32, width: 215, opacity: cl(logoE), transform: `scale(${Math.max(.2, logoE)})`}} />
    <div style={{position: 'absolute', left: 0, top: 44, width: 1600, textAlign: 'center', fontFamily: FRED, fontWeight: 600, fontSize: 62, lineHeight: 1.1}}>
      {h1a.map((w, i) => <span key={'a' + i} style={wordStyle(i, ACCENT)}>{w}</span>)}
      {h1b.map((w, i) => <span key={'b' + i} style={wordStyle(i + h1a.length, SECONDARY)}>{w}</span>)}
    </div>
    <div style={{position: 'absolute', left: 0, top: 128, width: 1600, textAlign: 'center', fontFamily: JAK, fontWeight: 800, fontSize: 33, color: ACCENT, opacity: l2, transform: `translateY(${18 * (1 - l2)}px)`}}>Send and receive gratitude —</div>
    <div style={{position: 'absolute', left: 0, top: 176, width: 1600, textAlign: 'center', fontFamily: JAK, fontWeight: 700, fontSize: 26, color: '#5b21b6', opacity: l3, transform: `translateY(${14 * (1 - l3)}px)`}}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5b21b6" strokeWidth="2.4" strokeLinecap="round" style={{verticalAlign: '-5px', marginRight: 10}}><path d="M6 9a6 6 0 0 1 0 6M10 6.5a10 10 0 0 1 0 11M14 4a14 14 0 0 1 0 16" /></svg>
      with Tap to Pay — fast, secure, contactless
    </div>
    <img src="assets/accept.png" alt="We also accept Apple Pay and Google Pay" style={{position: 'absolute', left: 1280, top: 38, width: 275, opacity: chip, transform: `translateX(${40 * (1 - chip)}px)`}} />
    {CHARS.map((c, i) => {
      const e = ip >= 1 ? 1 : ez(seg(ip, .30 + i * .09, .48 + i * .09));
      const focus = active === i;
      return <img key={i} src={c.img} alt="" style={{position: 'absolute', left: c.x, top: c.y, width: c.w, height: c.h, opacity: e, transform: `translateY(${150 * (1 - e)}px)`, filter: focus ? 'none' : 'none'}} />;
    })}
    {active >= 0 && <Rings cx={CHARS[active].phone[0]} cy={CHARS[active].phone[1]} lt={lt} env={Math.sin(Math.PI * seg(p, .25, .95))} />}
    {CHARS.map((c, j) => {
      if (!c.pill) return null;
      const k = [0, 1, 3, 4].indexOf(j);
      const e = ip >= 1 ? 1 : joy(seg(ip, .58 + k * .07, .74 + k * .07));
      const pop = active === j ? Math.sin(Math.PI * seg(p, .25, .8)) : 0;
      return <div key={j} style={{opacity: cl(e)}}><Pill c={c} scale={Math.max(.2, e) * (1 + .14 * pop)} glow={pop} /></div>;
    })}
  </React.Fragment>;
}

function World({cam, label, children}) {
  return <div data-screen-label={label} style={{position: 'absolute', inset: 0, overflow: 'hidden', background: BG}}>
    <div style={{position: 'absolute', left: 0, top: 0, width: 1600, height: 900, transform: `translate(${800 - cam.cx * cam.z}px, ${450 - cam.cy * cam.z}px) scale(${cam.z})`, transformOrigin: '0 0'}}>
      {children}
    </div>
  </div>;
}

function Intro({scene, localTime, progress}) {
  const z = 1 + .015 * Math.sin(Math.PI * progress);
  return <World cam={{cx: 800, cy: 450, z}} label={`Intro ${localTime.toFixed(1)}s`}>
    <SetContent ip={Math.min(progress / .92, 1)} active={-1} p={progress} lt={localTime} />
  </World>;
}

function CharScene({scene, localTime, progress}) {
  const tw = React.useContext(TweaksCtx);
  const who = scene.who;
  const from = who === 0 ? FULL : focusOf(who - 1, tw.zoom);
  const cam = camAt(from, focusOf(who, tw.zoom), progress);
  return <World cam={cam} label={`${scene.name} ${localTime.toFixed(1)}s`}>
    <SetContent ip={1} active={who} p={progress} lt={localTime} />
  </World>;
}

function Finale({scene, localTime, progress}) {
  const tw = React.useContext(TweaksCtx);
  const cam = camAt(focusOf(4, tw.zoom), FULL, progress);
  const e = ez(seg(progress, .45, .68));
  const burst = seg(progress, .5, .95);
  return <World cam={cam} label={`Finale ${localTime.toFixed(1)}s`}>
    <SetContent ip={1} active={-1} p={progress} lt={localTime} />
    <div style={{position: 'absolute', left: 800, top: 700, width: 420, marginLeft: -210, textAlign: 'center', opacity: e, transform: `translateY(${26 * (1 - e)}px)`, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', borderRadius: 22, padding: '16px 20px 18px', boxShadow: '0 10px 30px rgba(48,0,106,.12)'}}>
      <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 24, lineHeight: 1.25, color: ACCENT, whiteSpace: 'nowrap'}}>Everyone can receive gratitude<br />with <span style={{color: PRIMARY}}>Tap to Pay.</span></div>
      <div style={{fontFamily: JAK, fontWeight: 700, fontSize: 20, color: SECONDARY, marginTop: 8}}>Sign up with just an email.</div>
    </div>
    {burst > 0 && [0, 1, 2, 3, 4, 5, 6, 7].map(k => {
      const a = (k / 8) * Math.PI * 2 - Math.PI / 2;
      const r = 60 + 190 * ez(burst);
      return <Heart key={k} x={800 + Math.cos(a) * r * 1.5 - 12} y={775 + Math.sin(a) * r * .55 - 12} size={22} color={k % 2 ? HEART : '#b78df0'} opacity={Math.sin(Math.PI * burst) * .9} rot={(k * 47) % 60 - 30} />;
    })}
  </World>;
}

function TipPalHero() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  const wrapRef = React.useRef(null);
  const [scale, setScale] = React.useState(null);
  React.useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const upd = () => setScale(el.clientWidth / 1600);
    const ro = new ResizeObserver(upd); ro.observe(el); upd();
    return () => ro.disconnect();
  }, []);
  return <TweaksCtx.Provider value={t}>
    <div ref={wrapRef} style={{width: '100%', position: 'relative', overflow: 'hidden', height: scale ? 900 * scale : undefined, aspectRatio: scale ? undefined : '16/9'}}>
      {scale !== null && <div style={{transform: `scale(${scale})`, transformOrigin: '0 0', width: 1600, height: 900}}>
        <SceneStage width={1600} height={900} bg={BG} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
          {{Intro, Baristas: CharScene, Valet: CharScene, Driver: CharScene, Housekeeping: CharScene, Creators: CharScene, Finale}}
        </SceneStage>
      </div>}
      <TweaksPanel>
        <TweakSection label="Animación" />
        <TweakSlider label="Zoom de cámara" value={t.zoom} min={1.3} max={2.6} step={0.1} onChange={v => setTweak('zoom', v)} />
        <TweakToggle label="Corazones flotantes" value={t.hearts} onChange={v => setTweak('hearts', v)} />
        <TweakSection label="Editor" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </div>
  </TweaksCtx.Provider>;
}
window.TipPalHero = TipPalHero;
