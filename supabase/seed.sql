-- Seed script to populate the assets table with Spanish market stocks
-- Uses TICKER.MC format for Spanish market assets
-- Includes IBEX 35, and key assets from Mercado Continuo and BME Growth

INSERT INTO public.assets (symbol, name, sector, market, is_active)
VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35', true),
  ('SAN.MC', 'Banco Santander', 'Finanzas', 'IBEX 35', true),
  ('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35', true),
  ('BBVA.MC', 'BBVA', 'Finanzas', 'IBEX 35', true),
  ('CABK.MC', 'CaixaBank', 'Finanzas', 'IBEX 35', true),
  ('AENA.MC', 'Aena', 'Industrial', 'IBEX 35', true),
  ('TEF.MC', 'Telefónica', 'Comunicaciones', 'IBEX 35', true),
  ('FER.MC', 'Ferrovial', 'Industrial', 'IBEX 35', true),
  ('REP.MC', 'Repsol', 'Energía', 'IBEX 35', true),
  ('NTGY.MC', 'Naturgy', 'Servicios Públicos', 'IBEX 35', true),
  ('ENG.MC', 'Enagás', 'Energía', 'IBEX 35', true),
  ('RED.MC', 'Redeia', 'Servicios Públicos', 'IBEX 35', true),
  ('MTS.MC', 'ArcelorMittal', 'Materiales Básicos', 'IBEX 35', true),
  ('BKT.MC', 'Bankinter', 'Finanzas', 'IBEX 35', true),
  ('SAB.MC', 'Banco Sabadell', 'Finanzas', 'IBEX 35', true),
  ('IAG.MC', 'IAG', 'Industrial', 'IBEX 35', true),
  ('ELE.MC', 'Endesa', 'Servicios Públicos', 'IBEX 35', true),
  ('GRF.MC', 'Grifols', 'Salud', 'IBEX 35', true),
  ('ANA.MC', 'Acciona', 'Industrial', 'IBEX 35', true),
  ('MAP.MC', 'Mapfre', 'Finanzas', 'IBEX 35', true),
  ('ACS.MC', 'ACS', 'Industrial', 'IBEX 35', true),
  ('COL.MC', 'Inmobiliaria Colonial', 'Inmobiliario', 'IBEX 35', true),
  ('MRL.MC', 'Merlin Properties', 'Inmobiliario', 'IBEX 35', true),
  ('IDR.MC', 'Indra', 'Tecnología', 'IBEX 35', true),
  ('FLUI.MC', 'Fluidra', 'Industrial', 'IBEX 35', true),
  ('LOG.MC', 'Logista', 'Industrial', 'IBEX 35', true),
  ('ROVI.MC', 'Rovi', 'Salud', 'IBEX 35', true),
  ('UNI.MC', 'Unicaja', 'Finanzas', 'IBEX 35', true),
  ('SACYR.MC', 'Sacyr', 'Industrial', 'IBEX 35', true),
  ('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'IBEX 35', true),
  ('CIE.MC', 'CIE Automotive', 'Consumo Discrecional', 'IBEX 35', true),
  ('VIS.MC', 'Viscofan', 'Consumo Básico', 'IBEX 35', true),
  ('EBRO.MC', 'Ebro Foods', 'Consumo Básico', 'IBEX 35', true),
  ('ACX.MC', 'Acerinox', 'Materiales Básicos', 'IBEX 35', true),

  -- Mercado Continuo (Principales)
  ('CAF.MC', 'CAF', 'Industrial', 'Continuo', true),
  ('ENC.MC', 'Ence', 'Materiales Básicos', 'Continuo', true),
  ('PHM.MC', 'PharmaMar', 'Salud', 'Continuo', true),
  ('ALB.MC', 'Corporación Alba', 'Finanzas', 'Continuo', true),
  ('VID.MC', 'Vidrala', 'Materiales Básicos', 'Continuo', true),
  ('FAES.MC', 'Faes Farma', 'Salud', 'Continuo', true),
  ('GCO.MC', 'Grupo Catalana Occidente', 'Finanzas', 'Continuo', true),
  ('TUB.MC', 'Tubacex', 'Industrial', 'Continuo', true),
  ('TRG.MC', 'Tubos Reunidos', 'Industrial', 'Continuo', true),
  ('DIA.MC', 'Dia', 'Consumo Básico', 'Continuo', true),
  ('TAL.MC', 'Talgo', 'Industrial', 'Continuo', true),

  -- BME Growth (Principales)
  ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth', true),
  ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth', true),
  ('COM.MC', 'Altia', 'Tecnología', 'BME Growth', true),
  ('EIDF.MC', 'EiDF Solar', 'Energía', 'BME Growth', true),
  ('SNG.MC', 'SNGULAR', 'Tecnología', 'BME Growth', true),
  ('HLZ.MC', 'Holaluz', 'Energía', 'BME Growth', true)

ON CONFLICT (symbol) DO UPDATE
SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market,
  is_active = EXCLUDED.is_active;
