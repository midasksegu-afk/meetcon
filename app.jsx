// app.jsx — root + Tweaks panel
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "serif": false,
  "density": "comfortable",
  "gradient": "aurora",
  "accent": "#1F45A8"
}/*EDITMODE-END*/;

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(()=>{
    document.documentElement.dataset.serif = String(!!t.serif);
    document.documentElement.dataset.density = t.density || 'comfortable';
    document.documentElement.dataset.gradient = t.gradient || 'aurora';
    document.documentElement.style.setProperty('--brand', t.accent || '#1F45A8');
    // light shade for soft accent
    const hex = (t.accent||'#1F45A8').replace('#','');
    const r = parseInt(hex.slice(0,2),16), g=parseInt(hex.slice(2,4),16), b=parseInt(hex.slice(4,6),16);
    const soft = `rgba(${r},${g},${b},0.10)`;
    document.documentElement.style.setProperty('--brand-soft', soft);
  },[t]);

  return (
    <>
      <Hero />
      <Differentiators />
      <div className="divider" aria-hidden="true"><div className="ln"></div><div className="ic">MK</div><div className="ln"></div></div>
      <Program />
      <Process />
      <Contact />
      <Notice />
      <Footer />
      <FloatCTA />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Typography" />
        <TweakToggle label="Serif (Noto Serif KR)" value={t.serif}
                     onChange={v=>setTweak('serif', v)} />
        <TweakRadio label="Density" value={t.density}
                    options={['compact','comfortable','roomy']}
                    onChange={v=>setTweak('density', v)} />

        <TweakSection label="Theme" />
        <TweakColor label="Accent" value={t.accent}
                    options={['#1F45A8','#0b0b0d','#127a4f','#b54708','#7a5cff']}
                    onChange={v=>setTweak('accent', v)} />
        <TweakRadio label="Hero glow" value={t.gradient}
                    options={['aurora','warm','none']}
                    onChange={v=>setTweak('gradient', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
