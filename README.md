# 🌍 World Cup Explorer 2026

Experiência imersiva 3D para explorar a Copa do Mundo de 2026 (EUA · México · Canadá)
como se fosse um jogo de exploração — globo low-poly giratório, continentes interativos,
rotas de voo animadas, HUD estilo videogame e pós-processamento cinematográfico.

Inspirado em Abeto Messenger, FIFA World Cup, EA Sports FC, Google Earth e Flight Radar.

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Abra o endereço que o Vite imprimir (geralmente http://localhost:5173).

Build de produção:

```bash
npm run build
npm run preview
```

## 🕹️ Como usar

1. Tela de loading animada → clique em **ENTRAR NO MUNDO**.
2. A câmera faz uma aproximação cinematográfica do planeta (GSAP).
3. O globo gira sozinho. **Clique num marcador de continente** para voar até ele
   e abrir o painel das eliminatórias (vagas, seleções, estatísticas).
4. Use o menu lateral: **Home · Stats · História · Estádios**.
5. **Busque** uma seleção pelo nome no topo para abrir sua ficha (ranking, títulos, técnico…).
6. Ative o **som ambiente** (gerado por WebAudio, sem arquivos externos).

## 🧱 Stack

React · TypeScript · Vite · Three.js · React Three Fiber · Drei ·
@react-three/postprocessing · GSAP · Framer Motion · Zustand

## 📁 Estrutura

```
src/
├─ assets/        # (espaço para imagens/áudio próprios)
├─ animations/    # (variantes/timelines reutilizáveis)
├─ components/    # Globe, SpaceBackground, ContinentMarkers, FlightRoutes,
│                 #   OrbitalObjects (satélites/meteoros), CameraRig (GSAP)
├─ scenes/        # WorldScene (luzes, sol dinâmico, postprocessing)
├─ pages/         # App (Canvas + camadas de UI, lazy loading)
├─ hooks/         # geo (lat/lon→3D, arcos), useAmbientSound
├─ shaders/       # planet (oceano + ciclo dia/noite), atmosphere (fresnel)
├─ stores/        # useStore (Zustand)
├─ services/      # (espaço para integração com APIs reais)
├─ data/          # teams (48 classificados), confederations, history, stadiums, types
└─ ui/            # LoadingScreen, HUD, Panels, styles.css
```

## ✨ Recursos implementados

- Globo low-poly facetado com atmosfera fresnel, nuvens, oceano animado e **ciclo dia/noite** via shader.
- Estrelas (3500), nebulosas com additive blending.
- **6 confederações** interativas (hover com glow/tooltip, clique → voo cinematográfico).
- Rotas de voo luminosas com **aviões** percorrendo arcos entre seleções e sedes.
- **Satélites** orbitando e **meteoros** ocasionais.
- HUD: logo, busca de seleção, menu lateral, botões Home/Stats/História/Estádios, toggle de som.
- Modos: **Seleções**, **Continente/Eliminatórias**, **História das Copas (1930–2026)**, **Estádios**, **Estatísticas**.
- Pós-processamento: Bloom, Chromatic Aberration, Vignette.
- Responsivo (painel vira bottom-sheet no mobile), `dpr` adaptativo, code splitting / lazy loading.

## 📝 Notas

- Os dados das seleções (rankings FIFA, técnicos, vagas) refletem o cenário pré-torneio de
  meados de 2026 e estão em `src/data/`. Ajuste à vontade.
- O som ambiente é sintetizado por WebAudio — não há dependência de arquivos de áudio.
- Para usar dados reais, plugue uma API em `src/services/` e alimente a store.
