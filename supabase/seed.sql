-- Seed file for populating the assets table with Spanish stock market tickers
-- Format: TICKER.MC
-- Markets: IBEX 35, Mercado Continuo, BME Growth

INSERT INTO public.assets (symbol, name, sector, market) VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Consumer Cyclical', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander', 'Financial Services', 'IBEX 35'),
  ('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria', 'Financial Services', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola', 'Utilities', 'IBEX 35'),
  ('TEF.MC', 'Telefónica', 'Communication Services', 'IBEX 35'),
  ('REP.MC', 'Repsol', 'Energy', 'IBEX 35'),
  ('AENA.MC', 'Aena', 'Industrials', 'IBEX 35'),
  ('FER.MC', 'Ferrovial', 'Industrials', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank', 'Financial Services', 'IBEX 35'),
  ('IAG.MC', 'International Consolidated Airlines', 'Industrials', 'IBEX 35'),
  ('ELE.MC', 'Endesa', 'Utilities', 'IBEX 35'),
  ('NTGY.MC', 'Naturgy Energy Group', 'Utilities', 'IBEX 35'),
  ('BKT.MC', 'Bankinter', 'Financial Services', 'IBEX 35'),
  ('SAB.MC', 'Banco Sabadell', 'Financial Services', 'IBEX 35'),
  ('ENG.MC', 'Enagás', 'Utilities', 'IBEX 35'),

  -- Mercado Continuo
  ('ALM.MC', 'Almirall', 'Healthcare', 'Mercado Continuo'),
  ('PHM.MC', 'PharmaMar', 'Healthcare', 'Mercado Continuo'),
  ('VIS.MC', 'Viscofan', 'Consumer Defensive', 'Mercado Continuo'),
  ('CAF.MC', 'Construcciones y Auxiliar de Ferrocarriles', 'Industrials', 'Mercado Continuo'),
  ('TAL.MC', 'Talgo', 'Industrials', 'Mercado Continuo'),
  ('TRE.MC', 'Técnicas Reunidas', 'Energy', 'Mercado Continuo'),
  ('DIA.MC', 'Distribuidora Internacional de Alimentación', 'Consumer Defensive', 'Mercado Continuo'),
  ('ALB.MC', 'Corporación Financiera Alba', 'Financial Services', 'Mercado Continuo'),
  ('EBRO.MC', 'Ebro Foods', 'Consumer Defensive', 'Mercado Continuo'),
  ('VID.MC', 'Vidrala', 'Basic Materials', 'Mercado Continuo'),

  -- BME Growth
  ('LLE.MC', 'Lleida.net', 'Technology', 'BME Growth'),
  ('GIG.MC', 'Gigas Hosting', 'Technology', 'BME Growth'),
  ('HLZ.MC', 'Holaluz', 'Utilities', 'BME Growth'),
  ('EIDF.MC', 'EiDF Solar', 'Utilities', 'BME Growth'),
  ('AGIL.MC', 'Agile Content', 'Technology', 'BME Growth'),
  ('TRJ.MC', 'Tier1 Technology', 'Technology', 'BME Growth'),
  ('COM.MC', 'CommCenter', 'Communication Services', 'BME Growth'),
  ('CCOM.MC', 'Clerhp Estructuras', 'Industrials', 'BME Growth')
ON CONFLICT (symbol) DO NOTHING;
