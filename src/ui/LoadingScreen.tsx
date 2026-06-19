import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../stores/useStore';

const TIPS = [
  'Calibrando satélites em órbita…',
  'Traçando rotas entre as 48 seleções…',
  'Iluminando a atmosfera do planeta…',
  'Sincronizando o ciclo dia e noite…',
];

export function LoadingScreen() {
  const loaded = useStore((s) => s.loaded);
  const setLoaded = useStore((s) => s.setLoaded);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18);
        if (next >= 100) { clearInterval(iv); setTimeout(() => setReady(true), 350); }
        return next;
      });
    }, 260);
    const tipIv = setInterval(() => setTip((t) => (t + 1) % TIPS.length), 1500);
    return () => { clearInterval(iv); clearInterval(tipIv); };
  }, []);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div className="loading" exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.8 }}>
          <motion.div className="loading-logo" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1>WORLD CUP EXPLORER</h1>
            <p>Edição 2026 · EUA · México · Canadá</p>
          </motion.div>

          {!ready ? (
            <>
              <div className="loading-bar">
                <motion.div className="loading-bar-fill" animate={{ width: `${progress}%` }} transition={{ ease: 'easeOut' }} />
              </div>
              <p className="loading-tip">{TIPS[tip]}</p>
            </>
          ) : (
            <motion.button
              className="enter-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setLoaded(true)}
            >
              ENTRAR NO MUNDO ▶
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
