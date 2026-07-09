-- Insert initial assets for the Spanish Market
-- IBEX 35, Mercado Continuo, and BME Growth
-- Using ON CONFLICT to make the script idempotent

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
    -- IBEX 35
    ('ITX.MC', 'Inditex', 'Retail', 'IBEX 35'),
    ('SAN.MC', 'Banco Santander', 'Financial Services', 'IBEX 35'),
    ('IBE.MC', 'Iberdrola', 'Utilities', 'IBEX 35'),
    ('BBVA.MC', 'BBVA', 'Financial Services', 'IBEX 35'),
    ('AENA.MC', 'Aena', 'Industrials', 'IBEX 35'),
    ('AMS.MC', 'Amadeus IT Group', 'Technology', 'IBEX 35'),
    ('CABK.MC', 'CaixaBank', 'Financial Services', 'IBEX 35'),
    ('FER.MC', 'Ferrovial', 'Industrials', 'IBEX 35'),
    ('REP.MC', 'Repsol', 'Energy', 'IBEX 35'),
    ('TEF.MC', 'Telefónica', 'Communication Services', 'IBEX 35'),
    ('IAG.MC', 'International Consolidated Airlines', 'Industrials', 'IBEX 35'),
    ('ACS.MC', 'ACS', 'Industrials', 'IBEX 35'),
    ('ELE.MC', 'Endesa', 'Utilities', 'IBEX 35'),
    ('NTGY.MC', 'Naturgy Energy Group', 'Utilities', 'IBEX 35'),
    ('RED.MC', 'Redeia', 'Utilities', 'IBEX 35'),
    ('MAP.MC', 'Mapfre', 'Financial Services', 'IBEX 35'),
    ('BKT.MC', 'Bankinter', 'Financial Services', 'IBEX 35'),
    ('ANA.MC', 'Acciona', 'Industrials', 'IBEX 35'),
    ('ENG.MC', 'Enagás', 'Utilities', 'IBEX 35'),
    ('GRF.MC', 'Grifols', 'Healthcare', 'IBEX 35'),
    ('MRL.MC', 'Merlin Properties', 'Real Estate', 'IBEX 35'),
    ('COL.MC', 'Inmobiliaria Colonial', 'Real Estate', 'IBEX 35'),
    ('SAB.MC', 'Banco Sabadell', 'Financial Services', 'IBEX 35'),
    ('ROVI.MC', 'Laboratorios Rovi', 'Healthcare', 'IBEX 35'),
    ('LOG.MC', 'Logista', 'Industrials', 'IBEX 35'),
    ('FDR.MC', 'Fluidra', 'Consumer Cyclical', 'IBEX 35'),
    ('SCYR.MC', 'Sacyr', 'Industrials', 'IBEX 35'),
    ('MEL.MC', 'Meliá Hotels', 'Consumer Cyclical', 'IBEX 35'),
    ('ACX.MC', 'Acerinox', 'Basic Materials', 'IBEX 35'),
    ('CIE.MC', 'CIE Automotive', 'Consumer Cyclical', 'IBEX 35'),
    ('UNI.MC', 'Unicaja Banco', 'Financial Services', 'IBEX 35'),
    ('IDR.MC', 'Indra Sistemas', 'Technology', 'IBEX 35'),
    ('CELL.MC', 'Cellnex Telecom', 'Communication Services', 'IBEX 35'),

    -- Mercado Continuo
    ('CAF.MC', 'CAF', 'Industrials', 'Continuo'),
    ('TAL.MC', 'Talgo', 'Industrials', 'Continuo'),
    ('PHM.MC', 'PharmaMar', 'Healthcare', 'Continuo'),
    ('VID.MC', 'Vidrala', 'Basic Materials', 'Continuo'),
    ('VIS.MC', 'Viscofan', 'Consumer Defensive', 'Continuo'),
    ('EBRO.MC', 'Ebro Foods', 'Consumer Defensive', 'Continuo'),
    ('CASH.MC', 'Prosegur Cash', 'Industrials', 'Continuo'),
    ('PSG.MC', 'Prosegur', 'Industrials', 'Continuo'),
    ('ENC.MC', 'Ence', 'Basic Materials', 'Continuo'),
    ('EDR.MC', 'eDreams ODIGEO', 'Consumer Cyclical', 'Continuo'),
    ('TRE.MC', 'Técnicas Reunidas', 'Energy', 'Continuo'),
    ('TUB.MC', 'Tubacex', 'Basic Materials', 'Continuo'),
    ('TRG.MC', 'Tubos Reunidos', 'Basic Materials', 'Continuo'),
    ('DIA.MC', 'Distribuidora Internacional de Alimentación', 'Consumer Defensive', 'Continuo'),
    ('GSJ.MC', 'Grupo San José', 'Industrials', 'Continuo'),
    ('FCC.MC', 'FCC', 'Industrials', 'Continuo'),
    ('ALM.MC', 'Almirall', 'Healthcare', 'Continuo'),
    ('NXT.MC', 'Nextil', 'Consumer Cyclical', 'Continuo'),

    -- BME Growth
    ('LLE.MC', 'Lleida.net', 'Technology', 'BME Growth'),
    ('GIG.MC', 'Gigas Hosting', 'Technology', 'BME Growth'),
    ('ALT.MC', 'Altia Consultores', 'Technology', 'BME Growth'),
    ('TR1.MC', 'Tier1 Technology', 'Technology', 'BME Growth'),
    ('EVM.MC', 'Sngular', 'Technology', 'BME Growth'),
    ('MAKS.MC', 'Making Science', 'Communication Services', 'BME Growth'),
    ('COM.MC', 'Kompotes', 'Technology', 'BME Growth'),
    ('HLZ.MC', 'Holaluz', 'Utilities', 'BME Growth'),
    ('CLR.MC', 'Clerhp Estructuras', 'Industrials', 'BME Growth'),
    ('ADZ.MC', 'Adzhibem', 'Technology', 'BME Growth'),
    ('CMM.MC', 'Catenon', 'Industrials', 'BME Growth'),
    ('IZD.MC', 'Izertis', 'Technology', 'BME Growth'),
    ('PRO.MC', 'Proeduca Altia', 'Consumer Defensive', 'BME Growth'),
    ('SEC.MC', 'Secuoya', 'Communication Services', 'BME Growth')

ON CONFLICT (symbol)
DO UPDATE SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market;
