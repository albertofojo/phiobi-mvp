-- Seed data for assets (IBEX 35, Mercado Continuo, BME Growth)

INSERT INTO public.assets (symbol, name, sector, market) VALUES
-- IBEX 35
('ITX.MC', 'Industria de Diseño Textil, S.A.', 'Consumer Cyclical', 'IBEX 35'),
('SAN.MC', 'Banco Santander, S.A.', 'Financial Services', 'IBEX 35'),
('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria, S.A.', 'Financial Services', 'IBEX 35'),
('IBE.MC', 'Iberdrola, S.A.', 'Utilities', 'IBEX 35'),
('TEF.MC', 'Telefónica, S.A.', 'Communication Services', 'IBEX 35'),
('CABK.MC', 'CaixaBank, S.A.', 'Financial Services', 'IBEX 35'),
('REP.MC', 'Repsol, S.A.', 'Energy', 'IBEX 35'),
('AENA.MC', 'Aena S.M.E., S.A.', 'Industrials', 'IBEX 35'),
('FER.MC', 'Ferrovial SE', 'Industrials', 'IBEX 35'),
('IAG.MC', 'International Consolidated Airlines Group, S.A.', 'Industrials', 'IBEX 35'),
('ENG.MC', 'Enagás, S.A.', 'Utilities', 'IBEX 35'),
('ELE.MC', 'Endesa, S.A.', 'Utilities', 'IBEX 35'),
('NTGY.MC', 'Naturgy Energy Group, S.A.', 'Utilities', 'IBEX 35'),
('MTS.MC', 'ArcelorMittal S.A.', 'Basic Materials', 'IBEX 35'),
('GRF.MC', 'Grifols, S.A.', 'Healthcare', 'IBEX 35'),
('ACS.MC', 'ACS, Actividades de Construcción y Servicios, S.A.', 'Industrials', 'IBEX 35'),
('MAP.MC', 'Mapfre S.A.', 'Financial Services', 'IBEX 35'),
('BKT.MC', 'Bankinter, S.A.', 'Financial Services', 'IBEX 35'),
('RED.MC', 'Red Eléctrica Corporación, S.A.', 'Utilities', 'IBEX 35'),
('SAB.MC', 'Banco de Sabadell, S.A.', 'Financial Services', 'IBEX 35'),

-- Mercado Continuo
('LLE.MC', 'Lleida.net', 'Communication Services', 'Mercado Continuo'),
('VID.MC', 'Vidrala, S.A.', 'Consumer Defensive', 'Mercado Continuo'),
('CAF.MC', 'Construcciones y Auxiliar de Ferrocarriles, S.A.', 'Industrials', 'Mercado Continuo'),
('MEL.MC', 'Meliá Hotels International, S.A.', 'Consumer Cyclical', 'Mercado Continuo'),
('NHH.MC', 'NH Hotel Group, S.A.', 'Consumer Cyclical', 'Mercado Continuo'),
('TUB.MC', 'Tubacex, S.A.', 'Basic Materials', 'Mercado Continuo'),
('TRG.MC', 'Tubos Reunidos, S.A.', 'Basic Materials', 'Mercado Continuo'),
('VIS.MC', 'Viscofan, S.A.', 'Consumer Defensive', 'Mercado Continuo'),
('CBAV.MC', 'Borges Agricultural & Industrial Nuts, S.A.', 'Consumer Defensive', 'Mercado Continuo'),
('DIA.MC', 'Distribuidora Internacional de Alimentación, S.A.', 'Consumer Defensive', 'Mercado Continuo'),

-- BME Growth
('GIG.MC', 'Gigas Hosting, S.A.', 'Technology', 'BME Growth'),
('IZY.MC', 'Izertis, S.A.', 'Technology', 'BME Growth'),
('FACE.MC', 'FacePhi Biometría, S.A.', 'Technology', 'BME Growth'),
('TRJ.MC', 'Tier1 Technology, S.A.', 'Technology', 'BME Growth'),
('BIO.MC', 'Biosearch, S.A.', 'Healthcare', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market;
