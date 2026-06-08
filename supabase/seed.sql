-- Seed data for assets (IBEX 35, Mercado Continuo, BME Growth)

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander', 'Finanzas', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35'),
  ('BBVA.MC', 'BBVA', 'Finanzas', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank', 'Finanzas', 'IBEX 35'),
  ('TEF.MC', 'Telefónica', 'Telecomunicaciones', 'IBEX 35'),
  ('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
  ('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
  ('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
  ('ACS.MC', 'ACS', 'Industria', 'IBEX 35'),
  ('ELE.MC', 'Endesa', 'Servicios Públicos', 'IBEX 35'),
  ('IAG.MC', 'IAG', 'Industria', 'IBEX 35'),
  ('NTGY.MC', 'Naturgy', 'Servicios Públicos', 'IBEX 35'),
  ('RED.MC', 'Redeia', 'Servicios Públicos', 'IBEX 35'),
  ('SAB.MC', 'Banco Sabadell', 'Finanzas', 'IBEX 35'),
  ('ANA.MC', 'Acciona', 'Industria', 'IBEX 35'),
  ('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),
  ('GRF.MC', 'Grifols', 'Salud', 'IBEX 35'),
  ('BKT.MC', 'Bankinter', 'Finanzas', 'IBEX 35'),
  ('MAP.MC', 'Mapfre', 'Finanzas', 'IBEX 35'),
  ('CEL.MC', 'Cellnex Telecom', 'Telecomunicaciones', 'IBEX 35'),
  ('LOG.MC', 'Logista', 'Industria', 'IBEX 35'),
  ('ROVI.MC', 'Laboratorios Rovi', 'Salud', 'IBEX 35'),
  ('COL.MC', 'Inmobiliaria Colonial', 'Inmobiliario', 'IBEX 35'),
  ('MRL.MC', 'Merlin Properties', 'Inmobiliario', 'IBEX 35'),
  ('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'IBEX 35'),
  ('FDR.MC', 'Fluidra', 'Industria', 'IBEX 35'),
  ('UNI.MC', 'Unicaja Banco', 'Finanzas', 'IBEX 35'),
  ('SACY.MC', 'Sacyr', 'Industria', 'IBEX 35'),
  ('ACX.MC', 'Acerinox', 'Materiales Básicos', 'IBEX 35'),
  ('MTS.MC', 'ArcelorMittal', 'Materiales Básicos', 'IBEX 35'),
  ('VIS.MC', 'Viscofan', 'Consumo Defensivo', 'IBEX 35'),
  ('PUIG.MC', 'Puig', 'Consumo Discrecional', 'IBEX 35'),

  -- Mercado Continuo
  ('TAL.MC', 'Talgo', 'Industria', 'Mercado Continuo'),
  ('ENCE.MC', 'Ence', 'Materiales Básicos', 'Mercado Continuo'),
  ('CAF.MC', 'CAF', 'Industria', 'Mercado Continuo'),
  ('OHLA.MC', 'OHLA', 'Industria', 'Mercado Continuo'),
  ('DIA.MC', 'DIA', 'Consumo Defensivo', 'Mercado Continuo'),
  ('TRE.MC', 'Técnicas Reunidas', 'Energía', 'Mercado Continuo'),
  ('GCO.MC', 'Grupo Catalana Occidente', 'Finanzas', 'Mercado Continuo'),
  ('EBRO.MC', 'Ebro Foods', 'Consumo Defensivo', 'Mercado Continuo'),
  ('PHM.MC', 'PharmaMar', 'Salud', 'Mercado Continuo'),
  ('TUB.MC', 'Tubacex', 'Materiales Básicos', 'Mercado Continuo'),
  ('TRG.MC', 'Tubos Reunidos', 'Materiales Básicos', 'Mercado Continuo'),
  ('EDR.MC', 'eDreams ODIGEO', 'Consumo Discrecional', 'Mercado Continuo'),
  ('ALM.MC', 'Almirall', 'Salud', 'Mercado Continuo'),

  -- BME Growth
  ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
  ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
  ('ARH.MC', 'Arteche', 'Industria', 'BME Growth'),
  ('EIDF.MC', 'EiDF Solar', 'Energía', 'BME Growth'),
  ('CCOM.MC', 'Clerhp Estructuras', 'Inmobiliario', 'BME Growth'),
  ('HLZ.MC', 'Holaluz', 'Servicios Públicos', 'BME Growth'),
  ('AGIL.MC', 'Agile Content', 'Tecnología', 'BME Growth')

ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;
