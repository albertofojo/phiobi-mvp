-- Seed script for populating the assets table with IBEX 35, Mercado Continuo, and BME Growth tickers

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
    -- IBEX 35
    ('SAN.MC', 'Banco Santander', 'Financials', 'IBEX 35'),
    ('IBE.MC', 'Iberdrola', 'Utilities', 'IBEX 35'),
    ('ITX.MC', 'Inditex', 'Consumer Discretionary', 'IBEX 35'),
    ('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria', 'Financials', 'IBEX 35'),
    ('TEF.MC', 'Telefónica', 'Telecommunications', 'IBEX 35'),
    ('CABK.MC', 'CaixaBank', 'Financials', 'IBEX 35'),
    ('REP.MC', 'Repsol', 'Energy', 'IBEX 35'),
    ('AENA.MC', 'Aena', 'Industrials', 'IBEX 35'),
    ('FER.MC', 'Ferrovial', 'Industrials', 'IBEX 35'),
    ('NTGY.MC', 'Naturgy Energy Group', 'Utilities', 'IBEX 35'),
    ('IAG.MC', 'International Consolidated Airlines Group', 'Industrials', 'IBEX 35'),
    ('RED.MC', 'Redeia Corporación', 'Utilities', 'IBEX 35'),
    ('GRF.MC', 'Grifols', 'Healthcare', 'IBEX 35'),
    ('ACS.MC', 'ACS, Actividades de Construcción y Servicios', 'Industrials', 'IBEX 35'),
    ('BKT.MC', 'Bankinter', 'Financials', 'IBEX 35'),
    ('ANA.MC', 'Acciona', 'Utilities', 'IBEX 35'),
    ('SAB.MC', 'Banco Sabadell', 'Financials', 'IBEX 35'),
    ('MAP.MC', 'Mapfre', 'Financials', 'IBEX 35'),
    ('MRL.MC', 'Merlin Properties SOCIMI', 'Real Estate', 'IBEX 35'),
    ('ENG.MC', 'Enagás', 'Utilities', 'IBEX 35'),
    ('ELE.MC', 'Endesa', 'Utilities', 'IBEX 35'),
    ('CIE.MC', 'CIE Automotive', 'Consumer Discretionary', 'IBEX 35'),
    ('FLUI.MC', 'Fluidra', 'Consumer Discretionary', 'IBEX 35'),
    ('UNI.MC', 'Unicaja Banco', 'Financials', 'IBEX 35'),
    ('ACX.MC', 'Acerinox', 'Materials', 'IBEX 35'),
    ('COL.MC', 'Inmobiliaria Colonial SOCIMI', 'Real Estate', 'IBEX 35'),
    ('ROVI.MC', 'Laboratorios Farmacéuticos Rovi', 'Healthcare', 'IBEX 35'),
    ('MEL.MC', 'Meliá Hotels International', 'Consumer Discretionary', 'IBEX 35'),
    ('VIS.MC', 'Viscofan', 'Consumer Staples', 'IBEX 35'),
    ('IDR.MC', 'Indra Sistemas', 'Information Technology', 'IBEX 35'),
    ('SACYR.MC', 'Sacyr', 'Industrials', 'IBEX 35'),
    ('ANE.MC', 'Acciona Energías Renovables', 'Utilities', 'IBEX 35'),
    ('LOG.MC', 'Logista', 'Industrials', 'IBEX 35'),

    -- Mercado Continuo (selección de principales)
    ('TLGO.MC', 'Talgo', 'Industrials', 'Mercado Continuo'),
    ('CAF.MC', 'Construcciones y Auxiliar de Ferrocarriles', 'Industrials', 'Mercado Continuo'),
    ('DIA.MC', 'Distribuidora Internacional de Alimentación', 'Consumer Staples', 'Mercado Continuo'),
    ('PHM.MC', 'Pharma Mar', 'Healthcare', 'Mercado Continuo'),
    ('GCO.MC', 'Grupo Catalana Occidente', 'Financials', 'Mercado Continuo'),
    ('EBRO.MC', 'Ebro Foods', 'Consumer Staples', 'Mercado Continuo'),
    ('VID.MC', 'Vidrala', 'Materials', 'Mercado Continuo'),
    ('ALM.MC', 'Almirall', 'Healthcare', 'Mercado Continuo'),
    ('ENC.MC', 'Ence Energía y Celulosa', 'Materials', 'Mercado Continuo'),
    ('APPS.MC', 'Applus Services', 'Industrials', 'Mercado Continuo'),
    ('TRE.MC', 'Técnicas Reunidas', 'Energy', 'Mercado Continuo'),
    ('TUB.MC', 'Tubacex', 'Materials', 'Mercado Continuo'),
    ('MCM.MC', 'Miquel y Costas & Miquel', 'Materials', 'Mercado Continuo'),
    ('FAES.MC', 'Faes Farma', 'Healthcare', 'Mercado Continuo'),
    ('ENO.MC', 'Elecnor', 'Industrials', 'Mercado Continuo'),

    -- BME Growth (selección de principales)
    ('LLE.MC', 'Lleida.net', 'Information Technology', 'BME Growth'),
    ('GIG.MC', 'Gigas Hosting', 'Information Technology', 'BME Growth'),
    ('NXT.MC', 'Nextil', 'Consumer Discretionary', 'BME Growth'),
    ('ADZ.MC', 'Adolfo Domínguez', 'Consumer Discretionary', 'BME Growth'),
    ('HLZ.MC', 'Holaluz', 'Utilities', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE
SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market;