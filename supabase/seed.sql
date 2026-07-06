-- Seed script for public.assets table with major Spanish stocks
-- IBEX 35, Mercado Continuo, and BME Growth
-- Uses ON CONFLICT to ensure idempotency

INSERT INTO public.assets (symbol, name, description, sector, market, is_active)
VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Industria de Diseño Textil, S.A.', 'Consumer Cyclical', 'IBEX 35', true),
  ('SAN.MC', 'Banco Santander', 'Banco Santander, S.A.', 'Financial Services', 'IBEX 35', true),
  ('IBE.MC', 'Iberdrola', 'Iberdrola, S.A.', 'Utilities', 'IBEX 35', true),
  ('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria', 'Banco Bilbao Vizcaya Argentaria, S.A.', 'Financial Services', 'IBEX 35', true),
  ('CABK.MC', 'CaixaBank', 'CaixaBank, S.A.', 'Financial Services', 'IBEX 35', true),
  ('TEF.MC', 'Telefónica', 'Telefónica, S.A.', 'Communication Services', 'IBEX 35', true),
  ('AENA.MC', 'Aena', 'Aena S.M.E., S.A.', 'Industrials', 'IBEX 35', true),
  ('AMS.MC', 'Amadeus IT Group', 'Amadeus IT Group, S.A.', 'Technology', 'IBEX 35', true),
  ('CLNX.MC', 'Cellnex Telecom', 'Cellnex Telecom, S.A.', 'Communication Services', 'IBEX 35', true),
  ('REP.MC', 'Repsol', 'Repsol, S.A.', 'Energy', 'IBEX 35', true),
  ('ENG.MC', 'Enagás', 'Enagás, S.A.', 'Utilities', 'IBEX 35', true),
  ('ELE.MC', 'Endesa', 'Endesa, S.A.', 'Utilities', 'IBEX 35', true),
  ('FDR.MC', 'Fluidra', 'Fluidra, S.A.', 'Industrials', 'IBEX 35', true),
  ('MAP.MC', 'Mapfre', 'Mapfre, S.A.', 'Financial Services', 'IBEX 35', true),
  ('NTGY.MC', 'Naturgy', 'Naturgy Energy Group, S.A.', 'Utilities', 'IBEX 35', true),
  ('RED.MC', 'Redeia', 'Redeia Corporación, S.A.', 'Utilities', 'IBEX 35', true),
  ('ANA.MC', 'Acciona', 'Acciona, S.A.', 'Industrials', 'IBEX 35', true),
  ('ACS.MC', 'ACS', 'ACS, Actividades de Construcción y Servicios, S.A.', 'Industrials', 'IBEX 35', true),

  -- Mercado Continuo
  ('LLE.MC', 'Lleida.net', 'Lleidanetworks Serveis Telemàtics, S.A.', 'Technology', 'Mercado Continuo', true),
  ('CAF.MC', 'CAF', 'Construcciones y Auxiliar de Ferrocarriles, S.A.', 'Industrials', 'Mercado Continuo', true),
  ('TAL.MC', 'Talgo', 'Talgo, S.A.', 'Industrials', 'Mercado Continuo', true),
  ('ALM.MC', 'Almirall', 'Almirall, S.A.', 'Healthcare', 'Mercado Continuo', true),
  ('CASH.MC', 'Prosegur Cash', 'Prosegur Cash, S.A.', 'Industrials', 'Mercado Continuo', true),
  ('DIA.MC', 'DIA', 'Distribuidora Internacional de Alimentación, S.A.', 'Consumer Defensive', 'Mercado Continuo', true),
  ('ENC.MC', 'Ence', 'Ence Energía y Celulosa, S.A.', 'Basic Materials', 'Mercado Continuo', true),
  ('PHM.MC', 'PharmaMar', 'Pharma Mar, S.A.', 'Healthcare', 'Mercado Continuo', true),
  ('TLGO.MC', 'Talgo', 'Talgo, S.A.', 'Industrials', 'Mercado Continuo', true),
  ('TUB.MC', 'Tubacex', 'Tubacex, S.A.', 'Basic Materials', 'Mercado Continuo', true),
  ('VID.MC', 'Vidrala', 'Vidrala, S.A.', 'Consumer Cyclical', 'Mercado Continuo', true),

  -- BME Growth
  ('GIG.MC', 'Gigas Hosting', 'Gigas Hosting, S.A.', 'Technology', 'BME Growth', true),
  ('EIDF.MC', 'EiDF Solar', 'Energía Innovación y Desarrollo Fotovoltaico, S.A.', 'Utilities', 'BME Growth', true),
  ('HOSP.MC', 'Atrys Health', 'Atrys Health, S.A.', 'Healthcare', 'BME Growth', true),
  ('AGIL.MC', 'Agile Content', 'Agile Content, S.A.', 'Technology', 'BME Growth', true),
  ('CCOM.MC', 'Catenon', 'Catenon, S.A.', 'Industrials', 'BME Growth', true),
  ('IZER.MC', 'Izertis', 'Izertis, S.A.', 'Technology', 'BME Growth', true),
  ('SNG.MC', 'SNGULAR', 'Sngular, S.A.', 'Technology', 'BME Growth', true)
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market,
  is_active = EXCLUDED.is_active;
