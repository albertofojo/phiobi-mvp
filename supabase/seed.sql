-- Seed data for assets table (IBEX 35, Mercado Continuo, BME Growth)
-- Idempotent script using ON CONFLICT DO UPDATE

INSERT INTO public.assets (symbol, name, sector, market, is_active)
VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Consumer Cyclical', 'IBEX 35', true),
  ('SAN.MC', 'Banco Santander', 'Financial Services', 'IBEX 35', true),
  ('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria', 'Financial Services', 'IBEX 35', true),
  ('IBE.MC', 'Iberdrola', 'Utilities', 'IBEX 35', true),
  ('TEF.MC', 'Telefónica', 'Communication Services', 'IBEX 35', true),
  ('CABK.MC', 'CaixaBank', 'Financial Services', 'IBEX 35', true),
  ('REP.MC', 'Repsol', 'Energy', 'IBEX 35', true),
  ('AENA.MC', 'Aena', 'Industrials', 'IBEX 35', true),
  ('FER.MC', 'Ferrovial', 'Industrials', 'IBEX 35', true),
  ('NTGY.MC', 'Naturgy', 'Utilities', 'IBEX 35', true),
  ('ELE.MC', 'Endesa', 'Utilities', 'IBEX 35', true),
  ('ENG.MC', 'Enagás', 'Utilities', 'IBEX 35', true),
  ('RED.MC', 'Redeia', 'Utilities', 'IBEX 35', true),
  ('IAG.MC', 'International Consolidated Airlines Group', 'Industrials', 'IBEX 35', true),
  ('BKT.MC', 'Bankinter', 'Financial Services', 'IBEX 35', true),
  ('ACS.MC', 'ACS', 'Industrials', 'IBEX 35', true),
  ('ANA.MC', 'Acciona', 'Industrials', 'IBEX 35', true),
  ('MAP.MC', 'Mapfre', 'Financial Services', 'IBEX 35', true),
  ('SAB.MC', 'Banco Sabadell', 'Financial Services', 'IBEX 35', true),
  ('GRF.MC', 'Grifols', 'Healthcare', 'IBEX 35', true),
  ('CLNX.MC', 'Cellnex Telecom', 'Communication Services', 'IBEX 35', true),
  ('FDR.MC', 'Fluidra', 'Consumer Cyclical', 'IBEX 35', true),
  ('MRL.MC', 'Merlin Properties', 'Real Estate', 'IBEX 35', true),
  ('COL.MC', 'Inmobiliaria Colonial', 'Real Estate', 'IBEX 35', true),
  ('ROVI.MC', 'Laboratorios Farmacéuticos Rovi', 'Healthcare', 'IBEX 35', true),
  ('MEL.MC', 'Meliá Hotels International', 'Consumer Cyclical', 'IBEX 35', true),
  ('UNI.MC', 'Unicaja Banco', 'Financial Services', 'IBEX 35', true),
  ('SACYR.MC', 'Sacyr', 'Industrials', 'IBEX 35', true),
  ('LOG.MC', 'Logista', 'Industrials', 'IBEX 35', true),

  -- Mercado Continuo
  ('LLE.MC', 'Lleida.net', 'Technology', 'Mercado Continuo', true),
  ('OHLA.MC', 'OHLA', 'Industrials', 'Mercado Continuo', true),
  ('DIA.MC', 'Distribuidora Internacional de Alimentación', 'Consumer Defensive', 'Mercado Continuo', true),
  ('TUB.MC', 'Tubacex', 'Basic Materials', 'Mercado Continuo', true),
  ('TRG.MC', 'Tubos Reunidos', 'Basic Materials', 'Mercado Continuo', true),
  ('ENC.MC', 'Ence', 'Basic Materials', 'Mercado Continuo', true),
  ('ALM.MC', 'Almirall', 'Healthcare', 'Mercado Continuo', true),
  ('CAF.MC', 'CAF', 'Industrials', 'Mercado Continuo', true),
  ('CASH.MC', 'Prosegur Cash', 'Industrials', 'Mercado Continuo', true),
  ('PSG.MC', 'Prosegur', 'Industrials', 'Mercado Continuo', true),
  ('EBR.MC', 'Ebro Foods', 'Consumer Defensive', 'Mercado Continuo', true),
  ('VID.MC', 'Vidrala', 'Consumer Cyclical', 'Mercado Continuo', true),
  ('TLGO.MC', 'Talgo', 'Industrials', 'Mercado Continuo', true),
  ('PHM.MC', 'PharmaMar', 'Healthcare', 'Mercado Continuo', true),

  -- BME Growth
  ('AGIL.MC', 'Agile Content', 'Technology', 'BME Growth', true),
  ('ELZ.MC', 'Gigas Hosting', 'Technology', 'BME Growth', true),
  ('CCOM.MC', 'Catenon', 'Industrials', 'BME Growth', true),
  ('SNG.MC', 'SNGULAR', 'Technology', 'BME Growth', true),
  ('GNT.MC', 'Tier1', 'Technology', 'BME Growth', true),
  ('MIO.MC', 'MioGroup', 'Communication Services', 'BME Growth', true)
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market,
  is_active = EXCLUDED.is_active;
