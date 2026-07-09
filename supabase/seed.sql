-- Seed data for Spanish market assets (IBEX 35, Mercado Continuo, BME Growth)

INSERT INTO public.assets (symbol, name, sector, market) VALUES
-- IBEX 35
('ITX.MC', 'Inditex', 'Consumer Cyclical', 'IBEX 35'),
('SAN.MC', 'Banco Santander', 'Financial Services', 'IBEX 35'),
('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria', 'Financial Services', 'IBEX 35'),
('IBE.MC', 'Iberdrola', 'Utilities', 'IBEX 35'),
('CABK.MC', 'CaixaBank', 'Financial Services', 'IBEX 35'),
('AENA.MC', 'Aena', 'Industrials', 'IBEX 35'),
('FER.MC', 'Ferrovial', 'Industrials', 'IBEX 35'),
('TEF.MC', 'Telefónica', 'Communication Services', 'IBEX 35'),
('REP.MC', 'Repsol', 'Energy', 'IBEX 35'),
('IAG.MC', 'International Consolidated Airlines Group', 'Industrials', 'IBEX 35'),
('MTS.MC', 'ArcelorMittal', 'Basic Materials', 'IBEX 35'),
('SAB.MC', 'Banco Sabadell', 'Financial Services', 'IBEX 35'),
('BKT.MC', 'Bankinter', 'Financial Services', 'IBEX 35'),
('GRF.MC', 'Grifols', 'Healthcare', 'IBEX 35'),
('ACS.MC', 'ACS', 'Industrials', 'IBEX 35'),
('RED.MC', 'Redeia', 'Utilities', 'IBEX 35'),
('ENG.MC', 'Enagás', 'Utilities', 'IBEX 35'),
('ELE.MC', 'Endesa', 'Utilities', 'IBEX 35'),
('MAP.MC', 'Mapfre', 'Financial Services', 'IBEX 35'),
('ANA.MC', 'Acciona', 'Utilities', 'IBEX 35'),
('NTGY.MC', 'Naturgy', 'Utilities', 'IBEX 35'),
('ROVI.MC', 'Laboratorios Rovi', 'Healthcare', 'IBEX 35'),
('LOG.MC', 'Logista', 'Industrials', 'IBEX 35'),
('COL.MC', 'Inmobiliaria Colonial', 'Real Estate', 'IBEX 35'),
('MRL.MC', 'Merlin Properties', 'Real Estate', 'IBEX 35'),
('IDR.MC', 'Indra', 'Technology', 'IBEX 35'),
('MEL.MC', 'Meliá Hotels International', 'Consumer Cyclical', 'IBEX 35'),
('FDR.MC', 'Fluidra', 'Industrials', 'IBEX 35'),
('UNI.MC', 'Unicaja Banco', 'Financial Services', 'IBEX 35'),
('SCYR.MC', 'Sacyr', 'Industrials', 'IBEX 35'),
('AMP.MC', 'Amadeus IT Group', 'Technology', 'IBEX 35'),
('CIE.MC', 'CIE Automotive', 'Consumer Cyclical', 'IBEX 35'),

-- Mercado Continuo
('TAL.MC', 'Talgo', 'Industrials', 'Mercado Continuo'),
('CAF.MC', 'Construcciones y Auxiliar de Ferrocarriles', 'Industrials', 'Mercado Continuo'),
('DIA.MC', 'Distribuidora Internacional de Alimentación', 'Consumer Defensive', 'Mercado Continuo'),
('TUB.MC', 'Tubacex', 'Basic Materials', 'Mercado Continuo'),
('ALM.MC', 'Almirall', 'Healthcare', 'Mercado Continuo'),
('GCO.MC', 'Grupo Catalana Occidente', 'Financial Services', 'Mercado Continuo'),
('VIS.MC', 'Viscofan', 'Consumer Defensive', 'Mercado Continuo'),
('PHM.MC', 'PharmaMar', 'Healthcare', 'Mercado Continuo'),
('ENC.MC', 'Ence', 'Basic Materials', 'Mercado Continuo'),
('EDRE.MC', 'eDreams ODIGEO', 'Consumer Cyclical', 'Mercado Continuo'),
('TRE.MC', 'Técnicas Reunidas', 'Energy', 'Mercado Continuo'),
('APPS.MC', 'Applus Services', 'Industrials', 'Mercado Continuo'),

-- BME Growth
('LLE.MC', 'Lleida.net', 'Technology', 'BME Growth'),
('GIG.MC', 'Gigas Hosting', 'Technology', 'BME Growth'),
('AGIL.MC', 'Agile Content', 'Technology', 'BME Growth'),
('EIDF.MC', 'EiDF Solar', 'Utilities', 'BME Growth'),
('HLZ.MC', 'Holaluz', 'Utilities', 'BME Growth'),
('TR1.MC', 'Tier1 Technology', 'Technology', 'BME Growth'),
('CMM.MC', 'CommCenter', 'Communication Services', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE
SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;
