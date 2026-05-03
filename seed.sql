-- Insert sample assets for IBEX 35, Mercado Continuo, and BME Growth
INSERT INTO public.assets (symbol, name, sector, market) VALUES
-- IBEX 35
('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35'),
('SAN.MC', 'Banco Santander', 'Financiero', 'IBEX 35'),
('IBE.MC', 'Iberdrola', 'Energía', 'IBEX 35'),
('BBVA.MC', 'BBVA', 'Financiero', 'IBEX 35'),
('AENA.MC', 'Aena', 'Industrial', 'IBEX 35'),
('TEF.MC', 'Telefónica', 'Telecomunicaciones', 'IBEX 35'),
('AMS.MC', 'Amadeus IT Group', 'Tecnología', 'IBEX 35'),
('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
('FER.MC', 'Ferrovial', 'Industrial', 'IBEX 35'),
('CABK.MC', 'CaixaBank', 'Financiero', 'IBEX 35'),
('FDL.MC', 'Fluidra', 'Industrial', 'IBEX 35'),
('ACS.MC', 'ACS', 'Industrial', 'IBEX 35'),
('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),

-- Mercado Continuo
('CAF.MC', 'Construcciones y Auxiliar de Ferrocarriles (CAF)', 'Industrial', 'Mercado Continuo'),
('VID.MC', 'Vidrala', 'Materiales Básicos', 'Mercado Continuo'),
('ALM.MC', 'Almirall', 'Salud', 'Mercado Continuo'),
('TRE.MC', 'Técnicas Reunidas', 'Energía', 'Mercado Continuo'),
('EBRO.MC', 'Ebro Foods', 'Consumo Básico', 'Mercado Continuo'),
('TLGO.MC', 'Talgo', 'Industrial', 'Mercado Continuo'),
('CASH.MC', 'Prosegur Cash', 'Industrial', 'Mercado Continuo'),

-- BME Growth
('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
('IZERT.MC', 'Izertis', 'Tecnología', 'BME Growth'),
('ADL.MC', 'ADL Bionatur Solutions', 'Salud', 'BME Growth'),
('TR1.MC', 'Tier1 Technology', 'Tecnología', 'BME Growth')
ON CONFLICT (symbol) DO NOTHING;
