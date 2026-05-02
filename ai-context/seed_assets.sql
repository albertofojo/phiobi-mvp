-- Seed data for public.assets (Spanish Stock Market)
-- Includes IBEX 35, Mercado Continuo, and BME Growth

INSERT INTO public.assets (symbol, name, sector, market) VALUES
-- IBEX 35
('ITX.MC', 'Inditex', 'Retail', 'IBEX 35'),
('SAN.MC', 'Banco Santander', 'Financial Services', 'IBEX 35'),
('IBE.MC', 'Iberdrola', 'Utilities', 'IBEX 35'),
('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria', 'Financial Services', 'IBEX 35'),
('AENA.MC', 'Aena', 'Transportation', 'IBEX 35'),
('AMS.MC', 'Amadeus IT Group', 'Technology', 'IBEX 35'),
('CABK.MC', 'CaixaBank', 'Financial Services', 'IBEX 35'),
('FER.MC', 'Ferrovial', 'Construction', 'IBEX 35'),
('REP.MC', 'Repsol', 'Energy', 'IBEX 35'),
('NTGY.MC', 'Naturgy Energy Group', 'Utilities', 'IBEX 35'),
('TEF.MC', 'Telefónica', 'Telecommunications', 'IBEX 35'),
('ELE.MC', 'Endesa', 'Utilities', 'IBEX 35'),
('ACS.MC', 'ACS', 'Construction', 'IBEX 35'),
('IAG.MC', 'International Consolidated Airlines', 'Transportation', 'IBEX 35'),
('RED.MC', 'Redeia', 'Utilities', 'IBEX 35'),
('BKT.MC', 'Bankinter', 'Financial Services', 'IBEX 35'),
('MAP.MC', 'Mapfre', 'Financial Services', 'IBEX 35'),
('ENG.MC', 'Enagás', 'Utilities', 'IBEX 35'),
('ROVI.MC', 'Laboratorios Rovi', 'Healthcare', 'IBEX 35'),
('LOG.MC', 'Logista', 'Transportation', 'IBEX 35'),
('ANA.MC', 'Acciona', 'Construction', 'IBEX 35'),
('MRL.MC', 'Merlin Properties', 'Real Estate', 'IBEX 35'),
('COL.MC', 'Colonial', 'Real Estate', 'IBEX 35'),
('FLUI.MC', 'Fluidra', 'Consumer Goods', 'IBEX 35'),

-- Mercado Continuo
('EBS.MC', 'Ebro Foods', 'Consumer Goods', 'Mercado Continuo'),
('VID.MC', 'Vidrala', 'Industrials', 'Mercado Continuo'),
('CAF.MC', 'CAF', 'Industrials', 'Mercado Continuo'),
('VIS.MC', 'Viscofan', 'Consumer Goods', 'Mercado Continuo'),
('CIE.MC', 'CIE Automotive', 'Industrials', 'Mercado Continuo'),
('ALM.MC', 'Almirall', 'Healthcare', 'Mercado Continuo'),
('FDR.MC', 'Faes Farma', 'Healthcare', 'Mercado Continuo'),
('ENC.MC', 'Ence', 'Basic Materials', 'Mercado Continuo'),
('MEL.MC', 'Meliá Hotels International', 'Consumer Services', 'Mercado Continuo'),
('SACY.MC', 'Sacyr', 'Construction', 'Mercado Continuo'),
('TUB.MC', 'Tubacex', 'Basic Materials', 'Mercado Continuo'),
('TRG.MC', 'Tubos Reunidos', 'Basic Materials', 'Mercado Continuo'),
('TLGO.MC', 'Talgo', 'Industrials', 'Mercado Continuo'),

-- BME Growth
('LLE.MC', 'Lleida.net', 'Technology', 'BME Growth'),
('GIG.MC', 'Gigas Hosting', 'Technology', 'BME Growth'),
('HLZ.MC', 'Holaluz', 'Utilities', 'BME Growth'),
('MAKX.MC', 'Making Science', 'Technology', 'BME Growth'),
('EIDF.MC', 'EiDF Solar', 'Utilities', 'BME Growth'),
('AGIL.MC', 'Agile Content', 'Technology', 'BME Growth'),
('CCOM.MC', 'Cuatroochenta', 'Technology', 'BME Growth'),
('ELZ.MC', 'Tier1', 'Technology', 'BME Growth'),
('MIO.MC', 'MioGroup', 'Technology', 'BME Growth'),
('ENRS.MC', 'Enerside Energy', 'Utilities', 'BME Growth')
ON CONFLICT (symbol) DO NOTHING;
