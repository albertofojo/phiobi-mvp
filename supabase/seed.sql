-- Seed data for the assets table
-- Includes IBEX 35, Mercado Continuo, and BME Growth tickers

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
    -- IBEX 35
    ('ITX.MC', 'Inditex', 'Consumo Cíclico', 'IBEX 35'),
    ('SAN.MC', 'Banco Santander', 'Finanzas', 'IBEX 35'),
    ('IBE.MC', 'Iberdrola', 'Energía', 'IBEX 35'),
    ('BBVA.MC', 'BBVA', 'Finanzas', 'IBEX 35'),
    ('AENA.MC', 'Aena', 'Industria', 'IBEX 35'),
    ('AMS.MC', 'Amadeus', 'Tecnología', 'IBEX 35'),
    ('CABK.MC', 'CaixaBank', 'Finanzas', 'IBEX 35'),
    ('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
    ('TEF.MC', 'Telefónica', 'Comunicaciones', 'IBEX 35'),
    ('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35'),
    ('RED.MC', 'Redeia', 'Energía', 'IBEX 35'),
    ('ELE.MC', 'Endesa', 'Energía', 'IBEX 35'),
    ('NTGY.MC', 'Naturgy', 'Energía', 'IBEX 35'),
    ('MTS.MC', 'ArcelorMittal', 'Materiales Básicos', 'IBEX 35'),
    ('ACS.MC', 'ACS', 'Industria', 'IBEX 35'),
    ('IAG.MC', 'IAG', 'Industria', 'IBEX 35'),
    ('ANA.MC', 'Acciona', 'Industria', 'IBEX 35'),
    ('BKT.MC', 'Bankinter', 'Finanzas', 'IBEX 35'),
    ('MAP.MC', 'Mapfre', 'Finanzas', 'IBEX 35'),
    ('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),
    ('SAB.MC', 'Banco Sabadell', 'Finanzas', 'IBEX 35'),
    ('CLNX.MC', 'Cellnex', 'Comunicaciones', 'IBEX 35'),
    ('MEL.MC', 'Meliá Hotels', 'Consumo Cíclico', 'IBEX 35'),
    ('FDR.MC', 'Fluidra', 'Industria', 'IBEX 35'),
    ('ROVI.MC', 'Laboratorios Rovi', 'Salud', 'IBEX 35'),
    ('LOG.MC', 'Logista', 'Industria', 'IBEX 35'),
    ('UNI.MC', 'Unicaja Banco', 'Finanzas', 'IBEX 35'),

    -- Mercado Continuo
    ('VID.MC', 'Vidrala', 'Materiales Básicos', 'Mercado Continuo'),
    ('CAF.MC', 'CAF', 'Industria', 'Mercado Continuo'),
    ('EBRO.MC', 'Ebro Foods', 'Consumo Defensivo', 'Mercado Continuo'),
    ('ALM.MC', 'Almirall', 'Salud', 'Mercado Continuo'),
    ('CIE.MC', 'CIE Automotive', 'Consumo Cíclico', 'Mercado Continuo'),
    ('FAE.MC', 'Faes Farma', 'Salud', 'Mercado Continuo'),
    ('GCO.MC', 'Grupo Catalana Occidente', 'Finanzas', 'Mercado Continuo'),
    ('PHM.MC', 'PharmaMar', 'Salud', 'Mercado Continuo'),
    ('TLGO.MC', 'Talgo', 'Industria', 'Mercado Continuo'),
    ('TUB.MC', 'Tubacex', 'Industria', 'Mercado Continuo'),
    ('VIS.MC', 'Viscofan', 'Consumo Defensivo', 'Mercado Continuo'),
    ('EDR.MC', 'eDreams ODIGEO', 'Consumo Cíclico', 'Mercado Continuo'),

    -- BME Growth
    ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
    ('GIGA.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
    ('AGIL.MC', 'Agile Content', 'Tecnología', 'BME Growth'),
    ('COM.MC', 'Tier1 Technology', 'Tecnología', 'BME Growth'),
    ('EID.MC', 'EiDF Solar', 'Energía', 'BME Growth'),
    ('SNG.MC', 'SNGULAR', 'Tecnología', 'BME Growth'),
    ('MIO.MC', 'Making Science', 'Tecnología', 'BME Growth'),
    ('IZR.MC', 'Izertis', 'Tecnología', 'BME Growth'),
    ('CARS.MC', 'Astara', 'Consumo Cíclico', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE
SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market;
