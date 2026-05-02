# Project Context: High-Quality Stock Forum (Spanish Market)

## 1. Visión del Producto
Crear la plataforma de referencia para inversores de habla hispana, priorizando la **señal sobre el ruido**. El objetivo es alejarse de los foros saturados de publicidad y diseño anticuado (tipo Rankia o Invertia) para ofrecer una experiencia "Investor-First".

## 2. Principios de Diseño
- **Clean & Focused:** Estética moderna (inspirada en Linear/Substack). Sin banners intrusivos.
- **Asset-Centric:** La información se organiza en torno a activos ($Tickers). Cada empresa tiene su propio espacio de conocimiento.
- **Calidad de Contenido:** Diferenciación clara entre "charla rápida" y "Tesis de Inversión" (análisis profundos).
- **Reputación Real:** Sistema de votos y karma para premiar a los analistas que aportan valor real.

## 3. Alcance del Mercado (MVP)
- **Foco Geográfico:** España (Principalmente).
- **Activos:** IBEX 35, Mercado Continuo y BME Growth.
- **Datos:** Precios End-of-Day (EOD) y con retraso de 15 min. Nada de tiempo real costoso en Fase 1.

## 4. Stack Tecnológico (2026 Standard)
- **Framework:** Next.js (App Router).
- **Auth & Database:** Supabase (PostgreSQL + Realtime).
- **Styling:** Tailwind CSS (Dark mode por defecto).
- **Charts:** TradingView Lightweight Charts (Librería Open Source).
- **IA Integration:** Uso de LLMs para resúmenes de hilos, extracción de datos de hechos relevantes y moderación de contenido.

## 5. Estrategia de Desarrollo
- **Metodología:** IA-Assisted Development (usando Antigravity y Jules).
- **Prioridad MVP:** Construir el motor de interacción (foro) y la estructura de activos. Las funcionalidades de pago (suscripciones tipo Substack) se dejarán preparadas pero desactivadas inicialmente.
- **Eficiencia de Datos:** Implementación de una capa de caché en el backend para minimizar llamadas a APIs externas (EODHD/Twelve Data).

## 6. Objetivos de la Fase 1
1.  Landing page con lista de activos destacados del mercado español.
2.  Fichas de activo con gráfica básica y feed de comentarios.
3.  Sistema de publicación de Tesis con editor Markdown.
4.  Perfil de usuario con historial de aportaciones y contador de karma.

---
**Nota para la IA:** Actúa como un Senior Fullstack Engineer. Escribe código limpio, tipado (TypeScript) y optimizado para SEO. No sugieras soluciones que impliquen costes altos de licencias de datos en esta fase.