import { useEffect, useRef } from 'react';
import { useStore } from '../stores/useStore';
/**
 * Som ambiente espacial gerado proceduralmente via WebAudio
 * (drone suave + ruído filtrado) — não depende de arquivos externos.
 */
export function useAmbientSound() {
    const soundOn = useStore((s) => s.soundOn);
    const ctxRef = useRef(null);
    const gainRef = useRef(null);
    useEffect(() => {
        if (soundOn && !ctxRef.current) {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            const ctx = new Ctx();
            const master = ctx.createGain();
            master.gain.value = 0.0;
            master.connect(ctx.destination);
            // drone de duas senoides
            [55, 82.5].forEach((f, i) => {
                const osc = ctx.createOscillator();
                osc.type = 'sine';
                osc.frequency.value = f;
                const g = ctx.createGain();
                g.gain.value = i === 0 ? 0.18 : 0.08;
                osc.connect(g).connect(master);
                osc.start();
            });
            // ruído rosa filtrado (vento espacial)
            const bufferSize = 2 * ctx.sampleRate;
            const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++)
                data[i] = (Math.random() * 2 - 1) * 0.4;
            const noise = ctx.createBufferSource();
            noise.buffer = noiseBuffer;
            noise.loop = true;
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 400;
            const ng = ctx.createGain();
            ng.gain.value = 0.05;
            noise.connect(filter).connect(ng).connect(master);
            noise.start();
            master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2);
            ctxRef.current = ctx;
            gainRef.current = master;
        }
        if (!soundOn && gainRef.current && ctxRef.current) {
            gainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.6);
        }
        else if (soundOn && gainRef.current && ctxRef.current) {
            ctxRef.current.resume();
            gainRef.current.gain.linearRampToValueAtTime(0.5, ctxRef.current.currentTime + 1);
        }
    }, [soundOn]);
}
