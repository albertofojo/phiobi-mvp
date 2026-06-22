-- Seed script for Spanish market assets (IBEX 35, Mercado Continuo, BME Growth)

INSERT INTO public.assets (symbol, name, sector, market) VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander', 'Servicios Financieros', 'IBEX 35'),
  ('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria', 'Servicios Financieros', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola', 'Energía', 'IBEX 35'),
  ('TEF.MC', 'Telefónica', 'Telecomunicaciones', 'IBEX 35'),
  ('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
  ('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank', 'Servicios Financieros', 'IBEX 35'),
  ('ELE.MC', 'Endesa', 'Energía', 'IBEX 35'),
  ('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
  ('AMS.MC', 'Amadeus IT Group', 'Tecnología', 'IBEX 35'),
  ('ACS.MC', 'ACS', 'Industria', 'IBEX 35'),
  ('NAT.MC', 'Naturgy', 'Energía', 'IBEX 35'),
  ('RED.MC', 'Red Eléctrica', 'Energía', 'IBEX 35'),
  ('CLNX.MC', 'Cellnex Telecom', 'Telecomunicaciones', 'IBEX 35'),
  ('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),
  ('SAB.MC', 'Banco Sabadell', 'Servicios Financieros', 'IBEX 35'),
  ('BKT.MC', 'Bankinter', 'Servicios Financieros', 'IBEX 35'),
  ('MAP.MC', 'Mapfre', 'Servicios Financieros', 'IBEX 35'),
  ('IAG.MC', 'IAG', 'Consumo Discrecional', 'IBEX 35'),
  ('ANA.MC', 'Acciona', 'Industria', 'IBEX 35'),
  ('MRL.MC', 'Merlin Properties', 'Inmobiliario', 'IBEX 35'),
  ('COL.MC', 'Inmobiliaria Colonial', 'Inmobiliario', 'IBEX 35'),
  ('GRF.MC', 'Grifols', 'Salud', 'IBEX 35'),

  -- Mercado Continuo
  ('LOG.MC', 'Logista', 'Industria', 'Mercado Continuo'),
  ('EBRO.MC', 'Ebro Foods', 'Consumo Defensivo', 'Mercado Continuo'),
  ('VID.MC', 'Vidrala', 'Industria', 'Mercado Continuo'),
  ('VIS.MC', 'Viscofan', 'Consumo Defensivo', 'Mercado Continuo'),
  ('CIE.MC', 'CIE Automotive', 'Consumo Discrecional', 'Mercado Continuo'),
  ('CAF.MC', 'CAF', 'Industria', 'Mercado Continuo'),
  ('ALM.MC', 'Almirall', 'Salud', 'Mercado Continuo'),
  ('FDR.MC', 'Faes Farma', 'Salud', 'Mercado Continuo'),
  ('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'Mercado Continuo'),
  ('TUB.MC', 'Tubacex', 'Materiales Básicos', 'Mercado Continuo'),
  ('TRE.MC', 'Técnicas Reunidas', 'Energía', 'Mercado Continuo'),
  ('ENC.MC', 'Ence', 'Materiales Básicos', 'Mercado Continuo'),
  ('SACYR.MC', 'Sacyr', 'Industria', 'Mercado Continuo'),
  ('ROVI.MC', 'Laboratorios Rovi', 'Salud', 'Mercado Continuo'),
  ('APPS.MC', 'Applus Services', 'Industria', 'Mercado Continuo'),

  -- BME Growth
  ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
  ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
  ('IZER.MC', 'Izertis', 'Tecnología', 'BME Growth'),
  ('PAR.MC', 'Parlem Telecom', 'Telecomunicaciones', 'BME Growth'),
  ('AGIL.MC', 'Agile Content', 'Tecnología', 'BME Growth'),
  ('HLZ.MC', 'Holaluz', 'Energía', 'BME Growth'),
  ('EIDF.MC', 'EiDF Solar', 'Energía', 'BME Growth'),
  ('ARTE.MC', 'Arteche', 'Industria', 'BME Growth'),
  ('ENEE.MC', 'Endurance Motive', 'Industria', 'BME Growth'),
  ('ALT.MC', 'Altia Consultores', 'Tecnología', 'BME Growth'),
  ('MCL.MC', 'Making Science', 'Tecnología', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE
SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;
