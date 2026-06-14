-- Seed script to populate the 'assets' table with IBEX 35, Mercado Continuo and BME Growth
-- Idempotent script using ON CONFLICT (symbol) DO UPDATE

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
    -- IBEX 35
    ('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35'),
    ('SAN.MC', 'Banco Santander', 'Finanzas', 'IBEX 35'),
    ('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35'),
    ('BBVA.MC', 'BBVA', 'Finanzas', 'IBEX 35'),
    ('CABK.MC', 'CaixaBank', 'Finanzas', 'IBEX 35'),
    ('TEF.MC', 'Telefónica', 'Comunicaciones', 'IBEX 35'),
    ('AMS.MC', 'Amadeus', 'Tecnología', 'IBEX 35'),
    ('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
    ('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
    ('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
    ('ACS.MC', 'ACS', 'Industria', 'IBEX 35'),
    ('NTR.MC', 'Naturgy', 'Servicios Públicos', 'IBEX 35'),
    ('RED.MC', 'Redeia', 'Servicios Públicos', 'IBEX 35'),
    ('ENG.MC', 'Enagás', 'Servicios Públicos', 'IBEX 35'),
    ('GRF.MC', 'Grifols', 'Salud', 'IBEX 35'),
    ('BKT.MC', 'Bankinter', 'Finanzas', 'IBEX 35'),
    ('ANA.MC', 'Acciona', 'Industria', 'IBEX 35'),
    ('SAB.MC', 'Banco Sabadell', 'Finanzas', 'IBEX 35'),
    ('MAP.MC', 'Mapfre', 'Finanzas', 'IBEX 35'),
    ('IAG.MC', 'IAG', 'Industria', 'IBEX 35'),
    ('CEL.MC', 'Cellnex Telecom', 'Comunicaciones', 'IBEX 35'),
    ('MRL.MC', 'Merlin Properties', 'Inmobiliario', 'IBEX 35'),
    ('COL.MC', 'Inmobiliaria Colonial', 'Inmobiliario', 'IBEX 35'),
    ('ACX.MC', 'Acerinox', 'Materiales Básicos', 'IBEX 35'),
    ('MTS.MC', 'ArcelorMittal', 'Materiales Básicos', 'IBEX 35'),
    ('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'IBEX 35'),
    ('ROVI.MC', 'Laboratorios Rovi', 'Salud', 'IBEX 35'),
    ('FDR.MC', 'Fluidra', 'Industria', 'IBEX 35'),
    ('LOG.MC', 'Logista', 'Industria', 'IBEX 35'),
    ('SACYR.MC', 'Sacyr', 'Industria', 'IBEX 35'),
    ('ELE.MC', 'Endesa', 'Servicios Públicos', 'IBEX 35'),
    ('UNI.MC', 'Unicaja Banco', 'Finanzas', 'IBEX 35'),

    -- Mercado Continuo (Principales)
    ('CIE.MC', 'CIE Automotive', 'Industria', 'Mercado Continuo'),
    ('VIS.MC', 'Viscofan', 'Consumo Defensivo', 'Mercado Continuo'),
    ('CAF.MC', 'CAF', 'Industria', 'Mercado Continuo'),
    ('EBRO.MC', 'Ebro Foods', 'Consumo Defensivo', 'Mercado Continuo'),
    ('ALM.MC', 'Almirall', 'Salud', 'Mercado Continuo'),
    ('PHM.MC', 'PharmaMar', 'Salud', 'Mercado Continuo'),
    ('DIA.MC', 'DIA', 'Consumo Defensivo', 'Mercado Continuo'),
    ('VID.MC', 'Vidrala', 'Materiales Básicos', 'Mercado Continuo'),
    ('OHLA.MC', 'OHLA', 'Industria', 'Mercado Continuo'),
    ('ENC.MC', 'Ence', 'Materiales Básicos', 'Mercado Continuo'),

    -- BME Growth (Principales)
    ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
    ('EID.MC', 'EiDF Solar', 'Energía', 'BME Growth'),
    ('TRG.MC', 'Tier1', 'Tecnología', 'BME Growth'),
    ('IZER.MC', 'Izertis', 'Tecnología', 'BME Growth'),
    ('ADZ.MC', 'Atrys Health', 'Salud', 'BME Growth'),
    ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth')

ON CONFLICT (symbol) DO UPDATE
SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market;
