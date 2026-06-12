-- Seed data for assets table (IBEX 35, Mercado Continuo, BME Growth)

INSERT INTO public.assets (symbol, name, sector, market) VALUES
    -- IBEX 35 (Complete 35)
    ('ITX.MC', 'Industria de Diseño Textil, S.A.', 'Consumer Cyclical', 'IBEX 35'),
    ('SAN.MC', 'Banco Santander, S.A.', 'Financial Services', 'IBEX 35'),
    ('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria, S.A.', 'Financial Services', 'IBEX 35'),
    ('IBE.MC', 'Iberdrola, S.A.', 'Utilities', 'IBEX 35'),
    ('TEF.MC', 'Telefónica, S.A.', 'Communication Services', 'IBEX 35'),
    ('CABK.MC', 'CaixaBank, S.A.', 'Financial Services', 'IBEX 35'),
    ('REP.MC', 'Repsol, S.A.', 'Energy', 'IBEX 35'),
    ('AENA.MC', 'Aena S.M.E., S.A.', 'Industrials', 'IBEX 35'),
    ('AMA.MC', 'Amadeus IT Group, S.A.', 'Technology', 'IBEX 35'),
    ('ELE.MC', 'Endesa, S.A.', 'Utilities', 'IBEX 35'),
    ('FER.MC', 'Ferrovial, S.E.', 'Industrials', 'IBEX 35'),
    ('ACS.MC', 'ACS, Actividades de Construcción y Servicios, S.A.', 'Industrials', 'IBEX 35'),
    ('NTGY.MC', 'Naturgy Energy Group, S.A.', 'Utilities', 'IBEX 35'),
    ('IAG.MC', 'International Consolidated Airlines Group, S.A.', 'Industrials', 'IBEX 35'),
    ('CLNX.MC', 'Cellnex Telecom, S.A.', 'Communication Services', 'IBEX 35'),
    ('RED.MC', 'Redeia Corporación, S.A.', 'Utilities', 'IBEX 35'),
    ('BKT.MC', 'Bankinter, S.A.', 'Financial Services', 'IBEX 35'),
    ('SAB.MC', 'Banco de Sabadell, S.A.', 'Financial Services', 'IBEX 35'),
    ('GRF.MC', 'Grifols, S.A.', 'Healthcare', 'IBEX 35'),
    ('MAP.MC', 'Mapfre, S.A.', 'Financial Services', 'IBEX 35'),
    ('ENG.MC', 'Enagás, S.A.', 'Utilities', 'IBEX 35'),
    ('ROVI.MC', 'Laboratorios Farmacéuticos Rovi, S.A.', 'Healthcare', 'IBEX 35'),
    ('LOG.MC', 'Logista Holdings, S.A.', 'Industrials', 'IBEX 35'),
    ('UNI.MC', 'Unicaja Banco, S.A.', 'Financial Services', 'IBEX 35'),
    ('ACX.MC', 'Acerinox, S.A.', 'Basic Materials', 'IBEX 35'),
    ('MEL.MC', 'Meliá Hotels International, S.A.', 'Consumer Cyclical', 'IBEX 35'),
    ('MTS.MC', 'ArcelorMittal, S.A.', 'Basic Materials', 'IBEX 35'),
    ('SACYR.MC', 'Sacyr, S.A.', 'Industrials', 'IBEX 35'),
    ('FLUI.MC', 'Fluidra, S.A.', 'Industrials', 'IBEX 35'),
    ('COL.MC', 'Inmobiliaria Colonial, SOCIMI, S.A.', 'Real Estate', 'IBEX 35'),
    ('MRL.MC', 'Merlin Properties, SOCIMI, S.A.', 'Real Estate', 'IBEX 35'),
    ('ACC.MC', 'Acciona, S.A.', 'Industrials', 'IBEX 35'),
    ('ANA.MC', 'Acciona Energías Renovables, S.A.', 'Utilities', 'IBEX 35'),
    ('SOL.MC', 'Solaria Energía y Medio Ambiente, S.A.', 'Utilities', 'IBEX 35'),
    ('IDR.MC', 'Indra Sistemas, S.A.', 'Technology', 'IBEX 35'),

    -- Mercado Continuo
    ('ALM.MC', 'Almirall, S.A.', 'Healthcare', 'Mercado Continuo'),
    ('ENC.MC', 'Ence Energía y Celulosa, S.A.', 'Basic Materials', 'Mercado Continuo'),
    ('CAF.MC', 'Construcciones y Auxiliar de Ferrocarriles, S.A.', 'Industrials', 'Mercado Continuo'),
    ('TLGO.MC', 'Talgo, S.A.', 'Industrials', 'Mercado Continuo'),
    ('VID.MC', 'Vidrala, S.A.', 'Basic Materials', 'Mercado Continuo'),
    ('VIS.MC', 'Viscofan, S.A.', 'Consumer Defensive', 'Mercado Continuo'),
    ('OHLA.MC', 'OHLA, S.A.', 'Industrials', 'Mercado Continuo'),

    -- BME Growth
    ('LLE.MC', 'Lleida.net', 'Communication Services', 'BME Growth'),
    ('GIG.MC', 'Gigas Hosting, S.A.', 'Technology', 'BME Growth'),
    ('IZR.MC', 'Izertis, S.A.', 'Technology', 'BME Growth'),
    ('SNG.MC', 'Sngular, S.A.', 'Technology', 'BME Growth'),
    ('EIDF.MC', 'EiDF Solar, S.A.', 'Utilities', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market;
