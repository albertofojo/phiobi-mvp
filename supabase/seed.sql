-- Seed data for PHIOBI assets table (Spanish Stock Market)
-- Utilizes ON CONFLICT DO UPDATE to be idempotent

INSERT INTO public.assets (id, symbol, name, sector, market, is_active)
VALUES
    -- IBEX 35
    (gen_random_uuid(), 'ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35', true),
    (gen_random_uuid(), 'SAN.MC', 'Banco Santander', 'Financiero', 'IBEX 35', true),
    (gen_random_uuid(), 'IBE.MC', 'Iberdrola', 'Energía', 'IBEX 35', true),
    (gen_random_uuid(), 'BBVA.MC', 'BBVA', 'Financiero', 'IBEX 35', true),
    (gen_random_uuid(), 'CABK.MC', 'CaixaBank', 'Financiero', 'IBEX 35', true),
    (gen_random_uuid(), 'AENA.MC', 'Aena', 'Industrial', 'IBEX 35', true),
    (gen_random_uuid(), 'REP.MC', 'Repsol', 'Energía', 'IBEX 35', true),
    (gen_random_uuid(), 'TEF.MC', 'Telefónica', 'Comunicaciones', 'IBEX 35', true),
    (gen_random_uuid(), 'FER.MC', 'Ferrovial', 'Industrial', 'IBEX 35', true),
    (gen_random_uuid(), 'AMA.MC', 'Amadeus', 'Tecnología', 'IBEX 35', true),
    (gen_random_uuid(), 'ACS.MC', 'ACS', 'Industrial', 'IBEX 35', true),
    (gen_random_uuid(), 'NTGY.MC', 'Naturgy', 'Energía', 'IBEX 35', true),
    (gen_random_uuid(), 'ELE.MC', 'Endesa', 'Energía', 'IBEX 35', true),
    (gen_random_uuid(), 'ANA.MC', 'Acciona', 'Industrial', 'IBEX 35', true),
    (gen_random_uuid(), 'RED.MC', 'Redeia', 'Energía', 'IBEX 35', true),
    (gen_random_uuid(), 'SAB.MC', 'Banco Sabadell', 'Financiero', 'IBEX 35', true),
    (gen_random_uuid(), 'BKT.MC', 'Bankinter', 'Financiero', 'IBEX 35', true),
    (gen_random_uuid(), 'GRF.MC', 'Grifols', 'Salud', 'IBEX 35', true),
    (gen_random_uuid(), 'ENG.MC', 'Enagás', 'Energía', 'IBEX 35', true),
    (gen_random_uuid(), 'IAG.MC', 'IAG', 'Industrial', 'IBEX 35', true),
    (gen_random_uuid(), 'MTS.MC', 'ArcelorMittal', 'Materiales Básicos', 'IBEX 35', true),
    (gen_random_uuid(), 'MAP.MC', 'Mapfre', 'Financiero', 'IBEX 35', true),
    (gen_random_uuid(), 'CELL.MC', 'Cellnex', 'Comunicaciones', 'IBEX 35', true),
    (gen_random_uuid(), 'MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'IBEX 35', true),
    (gen_random_uuid(), 'COL.MC', 'Colonial', 'Inmobiliario', 'IBEX 35', true),
    (gen_random_uuid(), 'MRL.MC', 'Merlin Properties', 'Inmobiliario', 'IBEX 35', true),
    (gen_random_uuid(), 'ROVI.MC', 'Laboratorios Rovi', 'Salud', 'IBEX 35', true),
    (gen_random_uuid(), 'ACX.MC', 'Acerinox', 'Materiales Básicos', 'IBEX 35', true),
    (gen_random_uuid(), 'FLUI.MC', 'Fluidra', 'Industrial', 'IBEX 35', true),
    (gen_random_uuid(), 'LOG.MC', 'Logista', 'Industrial', 'IBEX 35', true),
    (gen_random_uuid(), 'UNI.MC', 'Unicaja Banco', 'Financiero', 'IBEX 35', true),
    (gen_random_uuid(), 'SACY.MC', 'Sacyr', 'Industrial', 'IBEX 35', true),
    (gen_random_uuid(), 'PUIG.MC', 'Puig', 'Consumo Discrecional', 'IBEX 35', true),

    -- Mercado Continuo (Principales)
    (gen_random_uuid(), 'EBRO.MC', 'Ebro Foods', 'Consumo Defensivo', 'Mercado Continuo', true),
    (gen_random_uuid(), 'CAF.MC', 'CAF', 'Industrial', 'Mercado Continuo', true),
    (gen_random_uuid(), 'VIS.MC', 'Viscofan', 'Consumo Defensivo', 'Mercado Continuo', true),
    (gen_random_uuid(), 'CIE.MC', 'CIE Automotive', 'Consumo Discrecional', 'Mercado Continuo', true),
    (gen_random_uuid(), 'VID.MC', 'Vidrala', 'Materiales Básicos', 'Mercado Continuo', true),
    (gen_random_uuid(), 'PHM.MC', 'PharmaMar', 'Salud', 'Mercado Continuo', true),
    (gen_random_uuid(), 'ALM.MC', 'Almirall', 'Salud', 'Mercado Continuo', true),
    (gen_random_uuid(), 'TRE.MC', 'Técnicas Reunidas', 'Energía', 'Mercado Continuo', true),
    (gen_random_uuid(), 'ENC.MC', 'Ence', 'Materiales Básicos', 'Mercado Continuo', true),
    (gen_random_uuid(), 'TLGO.MC', 'Talgo', 'Industrial', 'Mercado Continuo', true),
    (gen_random_uuid(), 'EDR.MC', 'eDreams ODIGEO', 'Consumo Discrecional', 'Mercado Continuo', true),
    (gen_random_uuid(), 'TUB.MC', 'Tubacex', 'Materiales Básicos', 'Mercado Continuo', true),

    -- BME Growth (Destacados)
    (gen_random_uuid(), 'LLE.MC', 'Lleida.net', 'Comunicaciones', 'BME Growth', true),
    (gen_random_uuid(), 'GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth', true),
    (gen_random_uuid(), 'ADZ.MC', 'Adverthia', 'Comunicaciones', 'BME Growth', true),
    (gen_random_uuid(), 'ELZ.MC', 'Holaluz', 'Energía', 'BME Growth', true),
    (gen_random_uuid(), 'COM.MC', 'Sercotel', 'Consumo Discrecional', 'BME Growth', true),
    (gen_random_uuid(), 'CLB.MC', 'Atrys Health', 'Salud', 'BME Growth', true),
    (gen_random_uuid(), 'AGIL.MC', 'Agilice', 'Tecnología', 'BME Growth', true)
ON CONFLICT (symbol)
DO UPDATE SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market,
    is_active = EXCLUDED.is_active;
