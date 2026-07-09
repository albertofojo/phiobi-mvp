-- Supabase Seed Script for Spanish Market Assets
-- This script populates the assets table with companies from IBEX 35, Mercado Continuo, and BME Growth.
-- It uses idempotency via ON CONFLICT DO UPDATE.

INSERT INTO public.assets (symbol, name, sector, market, is_active)
VALUES
    -- IBEX 35
    ('ITX.MC', 'Inditex', 'Consumo Discrecional', 'IBEX 35', true),
    ('IBE.MC', 'Iberdrola', 'Servicios Públicos', 'IBEX 35', true),
    ('SAN.MC', 'Banco Santander', 'Servicios Financieros', 'IBEX 35', true),
    ('BBVA.MC', 'BBVA', 'Servicios Financieros', 'IBEX 35', true),
    ('CABK.MC', 'CaixaBank', 'Servicios Financieros', 'IBEX 35', true),
    ('AENA.MC', 'Aena', 'Industria', 'IBEX 35', true),
    ('TEF.MC', 'Telefónica', 'Telecomunicaciones', 'IBEX 35', true),
    ('AMS.MC', 'Amadeus', 'Tecnología', 'IBEX 35', true),
    ('REP.MC', 'Repsol', 'Energía', 'IBEX 35', true),
    ('FER.MC', 'Ferrovial', 'Industria', 'IBEX 35', true),
    ('ACS.MC', 'ACS', 'Industria', 'IBEX 35', true),
    ('RED.MC', 'Redeia', 'Servicios Públicos', 'IBEX 35', true),
    ('ELE.MC', 'Endesa', 'Servicios Públicos', 'IBEX 35', true),
    ('NTGY.MC', 'Naturgy', 'Servicios Públicos', 'IBEX 35', true),
    ('IAG.MC', 'IAG', 'Industria', 'IBEX 35', true),
    ('SAB.MC', 'Banco Sabadell', 'Servicios Financieros', 'IBEX 35', true),
    ('BKT.MC', 'Bankinter', 'Servicios Financieros', 'IBEX 35', true),
    ('GRF.MC', 'Grifols', 'Salud', 'IBEX 35', true),
    ('MRL.MC', 'Merlin Properties', 'Inmobiliaria', 'IBEX 35', true),
    ('ANA.MC', 'Acciona', 'Industria', 'IBEX 35', true),
    ('ENG.MC', 'Enagás', 'Servicios Públicos', 'IBEX 35', true),
    ('MAP.MC', 'Mapfre', 'Servicios Financieros', 'IBEX 35', true),
    ('COL.MC', 'Colonial', 'Inmobiliaria', 'IBEX 35', true),
    ('FDR.MC', 'Fluidra', 'Consumo Discrecional', 'IBEX 35', true),
    ('MEL.MC', 'Meliá Hotels', 'Consumo Discrecional', 'IBEX 35', true),
    ('UNI.MC', 'Unicaja', 'Servicios Financieros', 'IBEX 35', true),
    ('ROVI.MC', 'Rovi', 'Salud', 'IBEX 35', true),
    ('LOG.MC', 'Logista', 'Industria', 'IBEX 35', true),
    ('SCYR.MC', 'Sacyr', 'Industria', 'IBEX 35', true),

    -- Mercado Continuo (Selección)
    ('CIE.MC', 'CIE Automotive', 'Consumo Discrecional', 'Mercado Continuo', true),
    ('VID.MC', 'Vidrala', 'Materiales Básicos', 'Mercado Continuo', true),
    ('VIS.MC', 'Viscofan', 'Consumo Defensivo', 'Mercado Continuo', true),
    ('EBRO.MC', 'Ebro Foods', 'Consumo Defensivo', 'Mercado Continuo', true),
    ('ALM.MC', 'Almirall', 'Salud', 'Mercado Continuo', true),
    ('PHM.MC', 'PharmaMar', 'Salud', 'Mercado Continuo', true),
    ('APP.MC', 'Applus Services', 'Industria', 'Mercado Continuo', true),
    ('CAF.MC', 'CAF', 'Industria', 'Mercado Continuo', true),
    ('TLGO.MC', 'Talgo', 'Industria', 'Mercado Continuo', true),
    ('TRE.MC', 'Técnicas Reunidas', 'Energía', 'Mercado Continuo', true),
    ('TUB.MC', 'Tubacex', 'Materiales Básicos', 'Mercado Continuo', true),
    ('TRG.MC', 'Tubos Reunidos', 'Materiales Básicos', 'Mercado Continuo', true),
    ('DIA.MC', 'DIA', 'Consumo Defensivo', 'Mercado Continuo', true),
    ('CASH.MC', 'Prosegur Cash', 'Industria', 'Mercado Continuo', true),
    ('PSG.MC', 'Prosegur', 'Industria', 'Mercado Continuo', true),
    ('EDR.MC', 'eDreams ODIGEO', 'Consumo Discrecional', 'Mercado Continuo', true),
    ('MCL.MC', 'Miquel y Costas', 'Materiales Básicos', 'Mercado Continuo', true),

    -- BME Growth (Selección)
    ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth', true),
    ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth', true),
    ('NTH.MC', 'Netex', 'Tecnología', 'BME Growth', true),
    ('COM.MC', 'CommCenter', 'Telecomunicaciones', 'BME Growth', true),
    ('ELZ.MC', 'ElZaburu', 'Servicios', 'BME Growth', true),
    ('HLZ.MC', 'Holaluz', 'Servicios Públicos', 'BME Growth', true),
    ('TR1.MC', 'Tier1', 'Tecnología', 'BME Growth', true),
    ('CBAV.MC', 'Cuatroochenta', 'Tecnología', 'BME Growth', true),
    ('AGIL.MC', 'Agilice', 'Servicios Financieros', 'BME Growth', true)

ON CONFLICT (symbol) DO UPDATE
SET
    name = EXCLUDED.name,
    sector = EXCLUDED.sector,
    market = EXCLUDED.market,
    is_active = EXCLUDED.is_active;
