-- Supabase Seed Script for Spanish Market Assets
-- Inserts main assets from IBEX 35, Mercado Continuo, and BME Growth.

INSERT INTO public.assets (symbol, name, sector, market) VALUES
    -- IBEX 35
    ('ITX.MC', 'Inditex', 'Consumo Cíclico', 'IBEX 35'),
    ('SAN.MC', 'Banco Santander', 'Servicios Financieros', 'IBEX 35'),
    ('BBVA.MC', 'BBVA', 'Servicios Financieros', 'IBEX 35'),
    ('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35'),
    ('TEF.MC', 'Telefónica', 'Servicios de Comunicación', 'IBEX 35'),
    ('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
    ('CABK.MC', 'CaixaBank', 'Servicios Financieros', 'IBEX 35'),
    ('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
    ('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
    ('NTGY.MC', 'Naturgy', 'Servicios Públicos', 'IBEX 35'),
    ('ANA.MC', 'Acciona', 'Industria', 'IBEX 35'),
    ('ACS.MC', 'ACS', 'Industria', 'IBEX 35'),
    ('ELE.MC', 'Endesa', 'Servicios Públicos', 'IBEX 35'),
    ('MAP.MC', 'Mapfre', 'Servicios Financieros', 'IBEX 35'),
    ('IAG.MC', 'IAG', 'Industria', 'IBEX 35'),
    ('RED.MC', 'Redeia', 'Servicios Públicos', 'IBEX 35'),
    ('FDL.MC', 'Fluidra', 'Industria', 'IBEX 35'),
    ('GRF.MC', 'Grifols', 'Salud', 'IBEX 35'),
    ('ROVI.MC', 'Laboratorios Rovi', 'Salud', 'IBEX 35'),
    ('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),
    ('BKT.MC', 'Bankinter', 'Servicios Financieros', 'IBEX 35'),
    ('SAB.MC', 'Banco Sabadell', 'Servicios Financieros', 'IBEX 35'),
    ('COL.MC', 'Inmobiliaria Colonial', 'Bienes Raíces', 'IBEX 35'),
    ('MRL.MC', 'Merlin Properties', 'Bienes Raíces', 'IBEX 35'),
    ('MEL.MC', 'Meliá Hotels', 'Consumo Cíclico', 'IBEX 35'),
    ('IDR.MC', 'Indra', 'Tecnología', 'IBEX 35'),
    ('CLNX.MC', 'Cellnex', 'Servicios de Comunicación', 'IBEX 35'),
    ('ACX.MC', 'Acerinox', 'Materiales Básicos', 'IBEX 35'),
    ('VIS.MC', 'Viscofan', 'Consumo Defensivo', 'IBEX 35'),
    ('LOG.MC', 'Logista', 'Industria', 'IBEX 35'),
    ('UNI.MC', 'Unicaja Banco', 'Servicios Financieros', 'IBEX 35'),
    ('SCYR.MC', 'Sacyr', 'Industria', 'IBEX 35'),
    ('SLR.MC', 'Solaria', 'Energía', 'IBEX 35'),

    -- Mercado Continuo
    ('ALB.MC', 'Corporación Alba', 'Servicios Financieros', 'Continuo'),
    ('EBRO.MC', 'Ebro Foods', 'Consumo Defensivo', 'Continuo'),
    ('ENC.MC', 'Ence', 'Materiales Básicos', 'Continuo'),
    ('VID.MC', 'Vidrala', 'Materiales Básicos', 'Continuo'),
    ('CAF.MC', 'CAF', 'Industria', 'Continuo'),
    ('TUB.MC', 'Tubacex', 'Industria', 'Continuo'),
    ('PHM.MC', 'PharmaMar', 'Salud', 'Continuo'),
    ('TLGO.MC', 'Talgo', 'Industria', 'Continuo'),
    ('DIA.MC', 'DIA', 'Consumo Defensivo', 'Continuo'),

    -- BME Growth
    ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
    ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
    ('ALC.MC', 'Altia', 'Tecnología', 'BME Growth'),
    ('EIDF.MC', 'EiDF', 'Energía', 'BME Growth'),
    ('TRG.MC', 'Tier1', 'Tecnología', 'BME Growth')

ON CONFLICT (symbol) DO UPDATE SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market;
