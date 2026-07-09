-- Seed data for assets table (IBEX 35, Mercado Continuo, BME Growth)
-- Using INSERT ... ON CONFLICT to ensure idempotency

INSERT INTO public.assets (symbol, name, sector, market, is_active)
VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35', true),
  ('SAN.MC', 'Banco Santander', 'Finanzas', 'IBEX 35', true),
  ('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35', true),
  ('BBVA.MC', 'BBVA', 'Finanzas', 'IBEX 35', true),
  ('CABK.MC', 'CaixaBank', 'Finanzas', 'IBEX 35', true),
  ('TEF.MC', 'Telefónica', 'Telecomunicaciones', 'IBEX 35', true),
  ('AENA.MC', 'Aena', 'Industrial', 'IBEX 35', true),
  ('FER.MC', 'Ferrovial', 'Industrial', 'IBEX 35', true),
  ('REP.MC', 'Repsol', 'Energía', 'IBEX 35', true),
  ('ACS.MC', 'ACS', 'Industrial', 'IBEX 35', true),

  -- Mercado Continuo
  ('LDO.MC', 'Laboratorios Rovi', 'Salud', 'Mercado Continuo', true),
  ('VID.MC', 'Vidrala', 'Materiales Básicos', 'Mercado Continuo', true),
  ('FDR.MC', 'Fluidra', 'Industrial', 'Mercado Continuo', true),
  ('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'Mercado Continuo', true),
  ('NHH.MC', 'NH Hotel Group', 'Consumo Discrecional', 'Mercado Continuo', true),
  ('ENC.MC', 'Ence', 'Materiales Básicos', 'Mercado Continuo', true),
  ('TUB.MC', 'Tubacex', 'Industrial', 'Mercado Continuo', true),
  ('CIE.MC', 'CIE Automotive', 'Consumo Discrecional', 'Mercado Continuo', true),
  ('ALM.MC', 'Almirall', 'Salud', 'Mercado Continuo', true),
  ('CAF.MC', 'CAF', 'Industrial', 'Mercado Continuo', true),

  -- BME Growth
  ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth', true),
  ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth', true),
  ('EIDF.MC', 'EiDF Solar', 'Energía', 'BME Growth', true),
  ('NTH.MC', 'Netex', 'Tecnología', 'BME Growth', true),
  ('ATR.MC', 'Atrys Health', 'Salud', 'BME Growth', true),
  ('ADZ.MC', 'Adolfo Domínguez', 'Consumo Discrecional', 'BME Growth', true),
  ('IZG.MC', 'Izertis', 'Tecnología', 'BME Growth', true),
  ('PANG.MC', 'Pangaea Oncology', 'Salud', 'BME Growth', true),
  ('SNG.MC', 'Tier1 Technology', 'Tecnología', 'BME Growth', true),
  ('HLZ.MC', 'Holaluz', 'Servicios Públicos', 'BME Growth', true)
ON CONFLICT (symbol) DO UPDATE
SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market,
  is_active = EXCLUDED.is_active;
