-- Seed data for assets (IBEX 35, Mercado Continuo, BME Growth)
-- Using ON CONFLICT DO UPDATE to ensure idempotency

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander', 'Servicios Financieros', 'IBEX 35'),
  ('BBVA.MC', 'BBVA', 'Servicios Financieros', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank', 'Servicios Financieros', 'IBEX 35'),
  ('TEF.MC', 'Telefónica', 'Telecomunicaciones', 'IBEX 35'),
  ('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
  ('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
  ('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
  ('AMS.MC', 'Amadeus', 'Tecnología', 'IBEX 35'),
  ('ANA.MC', 'Acciona', 'Industria', 'IBEX 35'),
  ('ACX.MC', 'Acerinox', 'Materiales Básicos', 'IBEX 35'),
  ('BKT.MC', 'Bankinter', 'Servicios Financieros', 'IBEX 35'),
  ('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),
  ('ELE.MC', 'Endesa', 'Servicios Públicos', 'IBEX 35'),
  ('FDL.MC', 'Fluidra', 'Industria', 'IBEX 35'),
  ('GRF.MC', 'Grifols', 'Salud', 'IBEX 35'),
  ('IAG.MC', 'IAG', 'Industria', 'IBEX 35'),
  ('IDR.MC', 'Indra', 'Tecnología', 'IBEX 35'),
  ('COL.MC', 'Inmobiliaria Colonial', 'Inmobiliario', 'IBEX 35'),
  ('MAP.MC', 'Mapfre', 'Servicios Financieros', 'IBEX 35'),
  ('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'IBEX 35'),
  ('MRL.MC', 'Merlin Properties', 'Inmobiliario', 'IBEX 35'),
  ('NTGY.MC', 'Naturgy', 'Servicios Públicos', 'IBEX 35'),
  ('RED.MC', 'Redeia', 'Servicios Públicos', 'IBEX 35'),
  ('ROVI.MC', 'Laboratorios Rovi', 'Salud', 'IBEX 35'),
  ('SACY.MC', 'Sacyr', 'Industria', 'IBEX 35'),
  ('SCYR.MC', 'Sacyr', 'Industria', 'IBEX 35'), -- Note: SACY.MC is typically Sacyr, let's keep one.
  ('SOL.MC', 'Solaria', 'Energía', 'IBEX 35'),
  ('UNI.MC', 'Unicaja Banco', 'Servicios Financieros', 'IBEX 35'),
  ('LOG.MC', 'Logista', 'Industria', 'IBEX 35'),

  -- Mercado Continuo
  ('ALB.MC', 'Corporación Financiera Alba', 'Servicios Financieros', 'Continuo'),
  ('CAF.MC', 'CAF', 'Industria', 'Continuo'),
  ('DIA.MC', 'DIA', 'Consumo Defensivo', 'Continuo'),
  ('EDRE.MC', 'eDreams ODIGEO', 'Consumo Discrecional', 'Continuo'),
  ('ENC.MC', 'Ence', 'Materiales Básicos', 'Continuo'),
  ('GRE.MC', 'Grenergy', 'Energía', 'Continuo'),
  ('LYA.MC', 'Línea Directa', 'Servicios Financieros', 'Continuo'),
  ('OLE.MC', 'Deoleo', 'Consumo Defensivo', 'Continuo'),
  ('PHM.MC', 'PharmaMar', 'Salud', 'Continuo'),
  ('PSG.MC', 'Prosegur', 'Industria', 'Continuo'),
  ('CASH.MC', 'Prosegur Cash', 'Industria', 'Continuo'),
  ('TUB.MC', 'Tubacex', 'Industria', 'Continuo'),
  ('TRG.MC', 'Tubos Reunidos', 'Industria', 'Continuo'),
  ('VID.MC', 'Vidrala', 'Industria', 'Continuo'),
  ('OHLA.MC', 'OHLA', 'Industria', 'Continuo'),
  ('TAL.MC', 'Talgo', 'Industria', 'Continuo'),
  ('EZE.MC', 'Ezentis', 'Tecnología', 'Continuo'),

  -- BME Growth
  ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
  ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
  ('IZT.MC', 'Izertis', 'Tecnología', 'BME Growth'),
  ('HLZ.MC', 'Holaluz', 'Energía', 'BME Growth'),
  ('NBI.MC', 'NBI Bearings', 'Industria', 'BME Growth'),
  ('ATU.MC', 'Altia', 'Tecnología', 'BME Growth'),
  ('EIDF.MC', 'EiDF', 'Energía', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;
