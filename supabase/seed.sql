-- Supabase Seed Script for Spanish Market Assets
-- This script populates the 'assets' table with tickers from the IBEX 35, Mercado Continuo, and BME Growth.
-- It uses the TICKER.MC format and includes ON CONFLICT (symbol) DO UPDATE to be idempotent.

INSERT INTO public.assets (symbol, name, description, sector, market, is_active)
VALUES
  -- IBEX 35 (Major Companies)
  ('ANA.MC', 'Acciona', 'Global leader in renewable energy and sustainable infrastructure.', 'Energy & Utilities', 'IBEX 35', true),
  ('ANE.MC', 'Acciona Energía', 'Renewable energy subsidiary of Acciona.', 'Energy', 'IBEX 35', true),
  ('ACX.MC', 'Acerinox', 'Stainless steel manufacturing conglomerate.', 'Basic Materials', 'IBEX 35', true),
  ('ACS.MC', 'ACS', 'Construction and engineering company.', 'Industrials', 'IBEX 35', true),
  ('AENA.MC', 'Aena', 'Airport management company.', 'Industrials', 'IBEX 35', true),
  ('AMS.MC', 'Amadeus IT Group', 'IT provider for the global travel and tourism industry.', 'Technology', 'IBEX 35', true),
  ('ARL.MC', 'ArcelorMittal', 'Multinational steel manufacturing corporation.', 'Basic Materials', 'IBEX 35', true),
  ('SAB.MC', 'Banco Sabadell', 'Spanish multinational financial services company.', 'Financial Services', 'IBEX 35', true),
  ('SAN.MC', 'Banco Santander', 'Spanish multinational financial services company.', 'Financial Services', 'IBEX 35', true),
  ('BKT.MC', 'Bankinter', 'Spanish commercial bank.', 'Financial Services', 'IBEX 35', true),
  ('BBVA.MC', 'BBVA', 'Spanish multinational financial services company.', 'Financial Services', 'IBEX 35', true),
  ('CABK.MC', 'CaixaBank', 'Spanish multinational financial services company.', 'Financial Services', 'IBEX 35', true),
  ('CLNX.MC', 'Cellnex Telecom', 'Wireless telecommunications and broadcasting infrastructures.', 'Telecommunications', 'IBEX 35', true),
  ('ENG.MC', 'Enagás', 'Spanish energy company and European transmission system operator.', 'Energy', 'IBEX 35', true),
  ('ELE.MC', 'Endesa', 'Major electric utility company in Spain.', 'Energy & Utilities', 'IBEX 35', true),
  ('FER.MC', 'Ferrovial', 'Multinational infrastructure operator and municipal services company.', 'Industrials', 'IBEX 35', true),
  ('FDR.MC', 'Fluidra', 'Swimming pool and wellness equipment company.', 'Industrials', 'IBEX 35', true),
  ('GRLS.MC', 'Grifols', 'Multinational pharmaceutical and chemical manufacturer.', 'Healthcare', 'IBEX 35', true),
  ('IAG.MC', 'IAG', 'Anglo-Spanish multinational airline holding company.', 'Industrials', 'IBEX 35', true),
  ('IBE.MC', 'Iberdrola', 'Spanish multinational electric utility company.', 'Energy & Utilities', 'IBEX 35', true),
  ('ITX.MC', 'Inditex', 'Multinational clothing company (Zara, etc.).', 'Consumer Cyclical', 'IBEX 35', true),
  ('IDR.MC', 'Indra Sistemas', 'Information technology and defense systems company.', 'Technology', 'IBEX 35', true),
  ('COL.MC', 'Inmobiliaria Colonial', 'Real estate corporation.', 'Real Estate', 'IBEX 35', true),
  ('LOG.MC', 'Logista', 'Distribution company.', 'Industrials', 'IBEX 35', true),
  ('MAP.MC', 'Mapfre', 'Multinational insurance company.', 'Financial Services', 'IBEX 35', true),
  ('MEL.MC', 'Meliá Hotels International', 'Hotel and resort operator.', 'Consumer Cyclical', 'IBEX 35', true),
  ('MRL.MC', 'Merlin Properties', 'Real estate investment trust (REIT).', 'Real Estate', 'IBEX 35', true),
  ('NTGY.MC', 'Naturgy', 'Natural gas and electrical energy utilities company.', 'Energy & Utilities', 'IBEX 35', true),
  ('RED.MC', 'Redeia', 'Electric grid operator.', 'Energy & Utilities', 'IBEX 35', true),
  ('REP.MC', 'Repsol', 'Multinational energy and petrochemical company.', 'Energy', 'IBEX 35', true),
  ('ROVI.MC', 'Laboratorios Rovi', 'Pharmaceutical company.', 'Healthcare', 'IBEX 35', true),
  ('SCYR.MC', 'Sacyr', 'Construction and engineering company.', 'Industrials', 'IBEX 35', true),
  ('TEF.MC', 'Telefónica', 'Multinational telecommunications company.', 'Telecommunications', 'IBEX 35', true),
  ('UNI.MC', 'Unicaja Banco', 'Spanish bank.', 'Financial Services', 'IBEX 35', true),
  ('SOL.MC', 'Solaria', 'Solar energy company.', 'Energy', 'IBEX 35', true),

  -- Mercado Continuo (Selected Companies)
  ('CAF.MC', 'CAF', 'Construcciones y Auxiliar de Ferrocarriles.', 'Industrials', 'Continuo', true),
  ('EBRO.MC', 'Ebro Foods', 'Multinational food company.', 'Consumer Defensive', 'Continuo', true),
  ('FCC.MC', 'FCC', 'Fomento de Construcciones y Contratas.', 'Industrials', 'Continuo', true),
  ('TLGO.MC', 'Talgo', 'Railway vehicle manufacturing company.', 'Industrials', 'Continuo', true),
  ('VID.MC', 'Vidrala', 'Glass packaging manufacturer.', 'Basic Materials', 'Continuo', true),
  ('VIS.MC', 'Viscofan', 'Meat casing manufacturer.', 'Consumer Defensive', 'Continuo', true),
  ('ZOT.MC', 'Zardoya Otis', 'Elevator and escalator manufacturer.', 'Industrials', 'Continuo', true),

  -- BME Growth (Selected Companies)
  ('LLE.MC', 'Lleida.net', 'Telecommunications operator and e-signature provider.', 'Technology', 'BME Growth', true),
  ('EIDF.MC', 'EiDF Solar', 'Solar energy installations.', 'Energy', 'BME Growth', true),
  ('GIG.MC', 'Gigas Hosting', 'Cloud computing and hosting services.', 'Technology', 'BME Growth', true)
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market,
  is_active = EXCLUDED.is_active;
