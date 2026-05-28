-- Create or replace assets function for idempotency.
-- Seed data for Spanish market assets (IBEX 35, Mercado Continuo, BME Growth)
-- using TICKER.MC format.

INSERT INTO public.assets (symbol, name, sector, market) VALUES
-- IBEX 35 (Partial, representative list)
('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35'),
('SAN.MC', 'Banco Santander', 'Financiero', 'IBEX 35'),
('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35'),
('BBVA.MC', 'BBVA', 'Financiero', 'IBEX 35'),
('CABK.MC', 'CaixaBank', 'Financiero', 'IBEX 35'),
('TEF.MC', 'Telefónica', 'Telecomunicaciones', 'IBEX 35'),
('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
('MTS.MC', 'ArcelorMittal', 'Materiales Básicos', 'IBEX 35'),
('GRF.MC', 'Grifols', 'Salud', 'IBEX 35'),
('RED.MC', 'Redeia', 'Servicios Públicos', 'IBEX 35'),
('ELE.MC', 'Endesa', 'Servicios Públicos', 'IBEX 35'),
('ENG.MC', 'Enagás', 'Servicios Públicos', 'IBEX 35'),
('BKT.MC', 'Bankinter', 'Financiero', 'IBEX 35'),
('ACS.MC', 'ACS', 'Industria', 'IBEX 35'),
('SAB.MC', 'Banco Sabadell', 'Financiero', 'IBEX 35'),
('IAG.MC', 'IAG', 'Industria', 'IBEX 35'),
('ANA.MC', 'Acciona', 'Industria', 'IBEX 35'),
('NTGY.MC', 'Naturgy', 'Servicios Públicos', 'IBEX 35'),

-- Mercado Continuo (Partial, representative list)
('PHM.MC', 'PharmaMar', 'Salud', 'Continuo'),
('VID.MC', 'Vidrala', 'Materiales Básicos', 'Continuo'),
('CAF.MC', 'CAF', 'Industria', 'Continuo'),
('VIS.MC', 'Viscofan', 'Consumo Básico', 'Continuo'),
('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'Continuo'),
('TLGO.MC', 'Talgo', 'Industria', 'Continuo'),
('ALB.MC', 'Corporación Financiera Alba', 'Financiero', 'Continuo'),
('CIE.MC', 'CIE Automotive', 'Consumo Discrecional', 'Continuo'),
('DIA.MC', 'DIA', 'Consumo Básico', 'Continuo'),
('ALM.MC', 'Almirall', 'Salud', 'Continuo'),
('ENC.MC', 'Ence', 'Materiales Básicos', 'Continuo'),
('TUB.MC', 'Tubacex', 'Industria', 'Continuo'),

-- BME Growth (Partial, representative list)
('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
('EBI.MC', 'EiDF Solar', 'Energía', 'BME Growth'),
('ATRS.MC', 'Atrys Health', 'Salud', 'BME Growth'),
('AGIL.MC', 'Agile Content', 'Tecnología', 'BME Growth'),
('HLZ.MC', 'Holaluz', 'Servicios Públicos', 'BME Growth'),
('FACE.MC', 'FacePhi', 'Tecnología', 'BME Growth'),
('ALT.MC', 'Altia', 'Tecnología', 'BME Growth'),
('ELZ.MC', 'ElZaburu', 'Servicios Profesionales', 'BME Growth'),
('GIGA.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth')

ON CONFLICT (symbol) DO UPDATE SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market;
