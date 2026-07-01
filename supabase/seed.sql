-- Seed script for public.assets with Spanish stock market tickers (TICKER.MC format)

INSERT INTO public.assets (symbol, name, sector, market) VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander', 'Servicios Financieros', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35'),
  ('BBVA.MC', 'BBVA', 'Servicios Financieros', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank', 'Servicios Financieros', 'IBEX 35'),
  ('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
  ('TEF.MC', 'Telefónica', 'Comunicaciones', 'IBEX 35'),
  ('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
  ('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
  ('AMS.MC', 'Amadeus IT Group', 'Tecnología', 'IBEX 35'),

  -- Mercado Continuo
  ('LLE.MC', 'Lleida.net', 'Comunicaciones', 'Mercado Continuo'),
  ('GRI.MC', 'Grifols', 'Salud', 'Mercado Continuo'),
  ('VIS.MC', 'Viscofan', 'Consumo Defensivo', 'Mercado Continuo'),
  ('CAF.MC', 'CAF', 'Industria', 'Mercado Continuo'),
  ('ELE.MC', 'Endesa', 'Servicios Públicos', 'Mercado Continuo'),
  ('BKT.MC', 'Bankinter', 'Servicios Financieros', 'Mercado Continuo'),
  ('IAG.MC', 'IAG', 'Industria', 'Mercado Continuo'),
  ('NTGY.MC', 'Naturgy', 'Servicios Públicos', 'Mercado Continuo'),

  -- BME Growth
  ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
  ('ADZ.MC', 'Atrys Health', 'Salud', 'BME Growth'),
  ('EIDF.MC', 'EiDF Solar', 'Energía', 'BME Growth'),
  ('HOL.MC', 'Holaluz', 'Servicios Públicos', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;