INSERT INTO public.assets (symbol, name, sector, market) VALUES
-- IBEX 35
('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35'),
('SAN.MC', 'Banco Santander', 'Finanzas', 'IBEX 35'),
('BBVA.MC', 'BBVA', 'Finanzas', 'IBEX 35'),
('IBE.MC', 'Iberdrola', 'Energía', 'IBEX 35'),
('TEF.MC', 'Telefónica', 'Telecomunicaciones', 'IBEX 35'),
('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
('CABK.MC', 'CaixaBank', 'Finanzas', 'IBEX 35'),
('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),

-- Mercado Continuo
('EBRO.MC', 'Ebro Foods', 'Consumo Defensivo', 'Mercado Continuo'),
('VID.MC', 'Vidrala', 'Industria', 'Mercado Continuo'),
('ALM.MC', 'Almirall', 'Salud', 'Mercado Continuo'),
('CAF.MC', 'CAF', 'Industria', 'Mercado Continuo'),
('TL5.MC', 'Mediaset España', 'Servicios de Comunicación', 'Mercado Continuo'),

-- BME Growth
('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
('SNG.MC', 'SNGULAR', 'Tecnología', 'BME Growth'),
('ADL.MC', 'ADL Bionatur', 'Salud', 'BME Growth'),
('CBI.MC', 'Clerhp Estructuras', 'Industria', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;
