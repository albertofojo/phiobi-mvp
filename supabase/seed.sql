-- Insert initial assets for IBEX 35, Mercado Continuo, and BME Growth
-- Uses the TICKER.MC format

INSERT INTO public.assets (symbol, name, sector, market, is_active)
VALUES
-- IBEX 35
('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35', true),
('SAN.MC', 'Banco Santander', 'Financiero', 'IBEX 35', true),
('IBE.MC', 'Iberdrola', 'Energía', 'IBEX 35', true),
('BBVA.MC', 'BBVA', 'Financiero', 'IBEX 35', true),
('TEF.MC', 'Telefónica', 'Telecomunicaciones', 'IBEX 35', true),
('REP.MC', 'Repsol', 'Energía', 'IBEX 35', true),
('AENA.MC', 'Aena', 'Industrial', 'IBEX 35', true),
('CABK.MC', 'CaixaBank', 'Financiero', 'IBEX 35', true),
('FER.MC', 'Ferrovial', 'Industrial', 'IBEX 35', true),
('AMS.MC', 'Amadeus', 'Tecnología', 'IBEX 35', true),
('ACS.MC', 'ACS', 'Industrial', 'IBEX 35', true),
('CLNX.MC', 'Cellnex Telecom', 'Telecomunicaciones', 'IBEX 35', true),
('BKT.MC', 'Bankinter', 'Financiero', 'IBEX 35', true),
('ENG.MC', 'Enagás', 'Energía', 'IBEX 35', true),
('RED.MC', 'Redeia', 'Energía', 'IBEX 35', true),
('IAG.MC', 'IAG', 'Industrial', 'IBEX 35', true),
('MAP.MC', 'Mapfre', 'Financiero', 'IBEX 35', true),
('SAB.MC', 'Banco Sabadell', 'Financiero', 'IBEX 35', true),
('GRF.MC', 'Grifols', 'Salud', 'IBEX 35', true),
('ANA.MC', 'Acciona', 'Industrial', 'IBEX 35', true),
('ELE.MC', 'Endesa', 'Energía', 'IBEX 35', true),
('NTGY.MC', 'Naturgy', 'Energía', 'IBEX 35', true),
('ROVI.MC', 'Laboratorios Rovi', 'Salud', 'IBEX 35', true),
('UNI.MC', 'Unicaja Banco', 'Financiero', 'IBEX 35', true),
('LOG.MC', 'Logista', 'Industrial', 'IBEX 35', true),
('MRL.MC', 'Merlin Properties', 'Inmobiliario', 'IBEX 35', true),
('COL.MC', 'Inmobiliaria Colonial', 'Inmobiliario', 'IBEX 35', true),
('FLUI.MC', 'Fluidra', 'Industrial', 'IBEX 35', true),
('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'IBEX 35', true),
('SCYR.MC', 'Sacyr', 'Industrial', 'IBEX 35', true),
('ACX.MC', 'Acerinox', 'Materiales Básicos', 'IBEX 35', true),
('MTS.MC', 'ArcelorMittal', 'Materiales Básicos', 'IBEX 35', true),
('SLR.MC', 'Solaria', 'Energía', 'IBEX 35', true),

-- Mercado Continuo (Principales)
('CIE.MC', 'CIE Automotive', 'Consumo Discrecional', 'Continuo', true),
('VID.MC', 'Vidrala', 'Materiales Básicos', 'Continuo', true),
('EBRO.MC', 'Ebro Foods', 'Consumo Básico', 'Continuo', true),
('CAF.MC', 'CAF', 'Industrial', 'Continuo', true),
('ALM.MC', 'Almirall', 'Salud', 'Continuo', true),
('FDR.MC', 'Faes Farma', 'Salud', 'Continuo', true),
('ENC.MC', 'Ence', 'Materiales Básicos', 'Continuo', true),
('PHM.MC', 'PharmaMar', 'Salud', 'Continuo', true),
('TLGO.MC', 'Talgo', 'Industrial', 'Continuo', true),
('APP.MC', 'Applus+', 'Industrial', 'Continuo', true),
('TRG.MC', 'Técnicas Reunidas', 'Energía', 'Continuo', true),

-- BME Growth (Principales)
('GIG.MC', 'Gigal Digital', 'Tecnología', 'BME Growth', true),
('LLE.MC', 'Lleida.net', 'Telecomunicaciones', 'BME Growth', true),
('AGIL.MC', 'Agile Content', 'Tecnología', 'BME Growth', true),
('ALC.MC', 'Atrys Health', 'Salud', 'BME Growth', true),
('HLZ.MC', 'Holaluz', 'Energía', 'BME Growth', true),
('TRJ.MC', 'Tier1', 'Tecnología', 'BME Growth', true),
('NTH.MC', 'Netex', 'Tecnología', 'BME Growth', true)
ON CONFLICT (symbol) DO UPDATE
SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market,
    is_active = EXCLUDED.is_active;
