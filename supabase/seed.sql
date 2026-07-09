-- Seed data for main Spanish stocks (IBEX 35, Mercado Continuo, BME Growth)
-- Idempotent script using ON CONFLICT DO UPDATE

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
  -- IBEX 35 (Select subset as representatives)
  ('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander', 'Finanzas', 'IBEX 35'),
  ('BBVA.MC', 'BBVA', 'Finanzas', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35'),
  ('TEF.MC', 'Telefónica', 'Comunicaciones', 'IBEX 35'),
  ('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank', 'Finanzas', 'IBEX 35'),
  ('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
  ('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
  ('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),
  ('RED.MC', 'Redeia', 'Servicios Públicos', 'IBEX 35'),
  ('NTGY.MC', 'Naturgy', 'Servicios Públicos', 'IBEX 35'),
  ('MTS.MC', 'ArcelorMittal', 'Materiales Básicos', 'IBEX 35'),
  ('ACS.MC', 'ACS', 'Industria', 'IBEX 35'),
  ('IAG.MC', 'IAG', 'Industria', 'IBEX 35'),
  ('BKT.MC', 'Bankinter', 'Finanzas', 'IBEX 35'),
  ('ANA.MC', 'Acciona', 'Industria', 'IBEX 35'),
  ('ELE.MC', 'Endesa', 'Servicios Públicos', 'IBEX 35'),
  ('GRF.MC', 'Grifols', 'Salud', 'IBEX 35'),
  ('SAB.MC', 'Banco Sabadell', 'Finanzas', 'IBEX 35'),

  -- Mercado Continuo (Representatives)
  ('ALB.MC', 'Corporación Financiera Alba', 'Finanzas', 'Continuo'),
  ('LOG.MC', 'Logista', 'Industria', 'Continuo'),
  ('FDR.MC', 'Fluidra', 'Industria', 'Continuo'),
  ('ENC.MC', 'Ence', 'Materiales Básicos', 'Continuo'),
  ('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'Continuo'),
  ('VID.MC', 'Vidrala', 'Materiales Básicos', 'Continuo'),
  ('VIS.MC', 'Viscofan', 'Consumo Defensivo', 'Continuo'),
  ('TRE.MC', 'Técnicas Reunidas', 'Energía', 'Continuo'),
  ('CAF.MC', 'CAF', 'Industria', 'Continuo'),
  ('OHLA.MC', 'OHLA', 'Industria', 'Continuo'),
  ('CASH.MC', 'Prosegur Cash', 'Industria', 'Continuo'),
  ('PSG.MC', 'Prosegur', 'Industria', 'Continuo'),
  ('TUB.MC', 'Tubacex', 'Materiales Básicos', 'Continuo'),
  ('TRG.MC', 'Tubos Reunidos', 'Materiales Básicos', 'Continuo'),

  -- BME Growth (Representatives)
  ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
  ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
  ('FACE.MC', 'FacePhi', 'Tecnología', 'BME Growth'),
  ('COM.MC', 'Kompotes', 'Bienes de Consumo', 'BME Growth'),
  ('EIDF.MC', 'EiDF Solar', 'Energía', 'BME Growth'),
  ('HLZ.MC', 'Holaluz', 'Servicios Públicos', 'BME Growth'),
  ('ATR.MC', 'Atrys Health', 'Salud', 'BME Growth')

ON CONFLICT (symbol) DO UPDATE
SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;
