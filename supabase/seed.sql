-- Poblando la tabla assets con los tickers del IBEX 35, Mercado Continuo y BME Growth.
-- El script es idempotente para evitar duplicados si se ejecuta múltiples veces.

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander', 'Finanzas', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35'),
  ('BBVA.MC', 'BBVA', 'Finanzas', 'IBEX 35'),
  ('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
  ('AMS.MC', 'Amadeus IT Group', 'Tecnología', 'IBEX 35'),
  ('TEF.MC', 'Telefónica', 'Comunicaciones', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank', 'Finanzas', 'IBEX 35'),
  ('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
  ('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
  ('NAT.MC', 'Naturgy', 'Servicios Públicos', 'IBEX 35'),
  ('ELE.MC', 'Endesa', 'Servicios Públicos', 'IBEX 35'),
  ('ACS.MC', 'ACS', 'Industria', 'IBEX 35'),
  ('BKT.MC', 'Bankinter', 'Finanzas', 'IBEX 35'),
  ('IAG.MC', 'IAG', 'Industria', 'IBEX 35'),
  ('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),
  ('ANA.MC', 'Acciona', 'Industria', 'IBEX 35'),
  ('MAP.MC', 'Mapfre', 'Finanzas', 'IBEX 35'),
  ('GRF.MC', 'Grifols', 'Salud', 'IBEX 35'),

  -- Mercado Continuo
  ('ALB.MC', 'Corporación Financiera Alba', 'Finanzas', 'Continuo'),
  ('VID.MC', 'Vidrala', 'Materiales Básicos', 'Continuo'),
  ('VIS.MC', 'Viscofan', 'Consumo Defensivo', 'Continuo'),
  ('CAF.MC', 'CAF', 'Industria', 'Continuo'),
  ('CIE.MC', 'CIE Automotive', 'Consumo Discrecional', 'Continuo'),
  ('EBRO.MC', 'Ebro Foods', 'Consumo Defensivo', 'Continuo'),
  ('ROVI.MC', 'Laboratorios Rovi', 'Salud', 'Continuo'),
  ('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'Continuo'),

  -- BME Growth
  ('LLE.MC', 'Lleida.net', 'Comunicaciones', 'BME Growth'),
  ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
  ('IZY.MC', 'Izertis', 'Tecnología', 'BME Growth'),
  ('TR1.MC', 'Tier1 Technology', 'Tecnología', 'BME Growth'),
  ('HLZ.MC', 'Holaluz', 'Servicios Públicos', 'BME Growth'),
  ('AGIL.MC', 'Agile Content', 'Tecnología', 'BME Growth'),
  ('EIDF.MC', 'EiDF Solar', 'Energía', 'BME Growth'),
  ('END.MC', 'Endurance Motive', 'Industria', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;
