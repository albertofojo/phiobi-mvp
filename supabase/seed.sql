-- Seed data for public.assets table

INSERT INTO public.assets (symbol, name, sector, market) VALUES
-- IBEX 35
('ITX.MC', 'Inditex', 'Consumo Cíclico', 'IBEX 35'),
('SAN.MC', 'Banco Santander', 'Servicios Financieros', 'IBEX 35'),
('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35'),
('BBVA.MC', 'BBVA', 'Servicios Financieros', 'IBEX 35'),
('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
('CABK.MC', 'CaixaBank', 'Servicios Financieros', 'IBEX 35'),
('TEF.MC', 'Telefónica', 'Comunicaciones', 'IBEX 35'),
('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
('ACS.MC', 'ACS', 'Industria', 'IBEX 35'),
('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),
('ELE.MC', 'Endesa', 'Servicios Públicos', 'IBEX 35'),
('BKT.MC', 'Bankinter', 'Servicios Financieros', 'IBEX 35'),
('NTGY.MC', 'Naturgy', 'Servicios Públicos', 'IBEX 35'),
('GRF.MC', 'Grifols', 'Salud', 'IBEX 35'),
('IAG.MC', 'IAG', 'Industria', 'IBEX 35'),
('SAB.MC', 'Banco Sabadell', 'Servicios Financieros', 'IBEX 35'),
('MAP.MC', 'Mapfre', 'Servicios Financieros', 'IBEX 35'),
('RED.MC', 'Red Eléctrica', 'Servicios Públicos', 'IBEX 35'),
('MRL.MC', 'Merlin Properties', 'Inmobiliaria', 'IBEX 35'),

-- Mercado Continuo
('VID.MC', 'Vidrala', 'Materiales Básicos', 'Continuo'),
('CAF.MC', 'CAF', 'Industria', 'Continuo'),
('EBR.MC', 'Ebro Foods', 'Consumo Defensivo', 'Continuo'),
('ALB.MC', 'Corporación Financiera Alba', 'Servicios Financieros', 'Continuo'),
('GCO.MC', 'Grupo Catalana Occidente', 'Servicios Financieros', 'Continuo'),
('TRE.MC', 'Técnicas Reunidas', 'Energía', 'Continuo'),
('CASH.MC', 'Prosegur Cash', 'Industria', 'Continuo'),
('PSG.MC', 'Prosegur', 'Industria', 'Continuo'),
('UNI.MC', 'Unicaja Banco', 'Servicios Financieros', 'Continuo'),
('OHLA.MC', 'OHLA', 'Industria', 'Continuo'),

-- BME Growth
('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
('AGIL.MC', 'Agile Content', 'Tecnología', 'BME Growth'),
('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
('HDC.MC', 'Holaluz', 'Servicios Públicos', 'BME Growth'),
('CBR.MC', 'Clerhp', 'Industria', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;
