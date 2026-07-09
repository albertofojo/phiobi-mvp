-- supabase/seed.sql
-- Seed data for the assets table with major IBEX 35, Mercado Continuo, and BME Growth stocks.

INSERT INTO public.assets (symbol, name, sector, market) VALUES
  -- IBEX 35
  ('ITX.MC', 'Inditex', 'Consumo Cíclico', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola', 'Energía', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander', 'Finanzas', 'IBEX 35'),
  ('BBVA.MC', 'BBVA', 'Finanzas', 'IBEX 35'),
  ('AENA.MC', 'Aena', 'Industrial', 'IBEX 35'),
  ('AMS.MC', 'Amadeus IT Group', 'Tecnología', 'IBEX 35'),
  ('REP.MC', 'Repsol', 'Energía', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank', 'Finanzas', 'IBEX 35'),
  ('TEF.MC', 'Telefónica', 'Telecomunicaciones', 'IBEX 35'),
  ('FER.MC', 'Ferrovial', 'Industrial', 'IBEX 35'),
  ('CELL.MC', 'Cellnex Telecom', 'Telecomunicaciones', 'IBEX 35'),
  ('ACS.MC', 'ACS', 'Industrial', 'IBEX 35'),
  ('NTGY.MC', 'Naturgy Energy Group', 'Energía', 'IBEX 35'),
  ('RED.MC', 'Redeia', 'Energía', 'IBEX 35'),
  ('ENG.MC', 'Enagás', 'Energía', 'IBEX 35'),
  ('MAP.MC', 'Mapfre', 'Finanzas', 'IBEX 35'),
  ('ANA.MC', 'Acciona', 'Industrial', 'IBEX 35'),
  ('BKT.MC', 'Bankinter', 'Finanzas', 'IBEX 35'),
  ('IAG.MC', 'International Airlines Group', 'Industrial', 'IBEX 35'),
  ('SAB.MC', 'Banco Sabadell', 'Finanzas', 'IBEX 35'),
  ('GRF.MC', 'Grifols', 'Salud', 'IBEX 35'),
  ('ACX.MC', 'Acerinox', 'Materiales Básicos', 'IBEX 35'),
  ('ROVI.MC', 'Laboratorios Rovi', 'Salud', 'IBEX 35'),
  ('LOG.MC', 'Logista', 'Industrial', 'IBEX 35'),
  ('FDR.MC', 'Fluidra', 'Industrial', 'IBEX 35'),
  ('UNI.MC', 'Unicaja Banco', 'Finanzas', 'IBEX 35'),
  ('MRL.MC', 'Merlin Properties', 'Inmobiliario', 'IBEX 35'),
  ('COL.MC', 'Inmobiliaria Colonial', 'Inmobiliario', 'IBEX 35'),
  ('ELE.MC', 'Endesa', 'Energía', 'IBEX 35'),
  ('MEL.MC', 'Meliá Hotels International', 'Consumo Cíclico', 'IBEX 35'),
  ('SACYR.MC', 'Sacyr', 'Industrial', 'IBEX 35'),

  -- Mercado Continuo
  ('ALM.MC', 'Almirall', 'Salud', 'Mercado Continuo'),
  ('CAF.MC', 'CAF', 'Industrial', 'Mercado Continuo'),
  ('DIA.MC', 'DIA', 'Consumo Defensivo', 'Mercado Continuo'),
  ('EBRO.MC', 'Ebro Foods', 'Consumo Defensivo', 'Mercado Continuo'),
  ('VID.MC', 'Vidrala', 'Materiales Básicos', 'Mercado Continuo'),
  ('TUB.MC', 'Tubacex', 'Industrial', 'Mercado Continuo'),
  ('EDRE.MC', 'eDreams ODIGEO', 'Consumo Cíclico', 'Mercado Continuo'),
  ('CASH.MC', 'Prosegur Cash', 'Industrial', 'Mercado Continuo'),
  ('PSG.MC', 'Prosegur', 'Industrial', 'Mercado Continuo'),
  ('ENC.MC', 'Ence', 'Materiales Básicos', 'Mercado Continuo'),
  ('PHM.MC', 'PharmaMar', 'Salud', 'Mercado Continuo'),
  ('TRE.MC', 'Técnicas Reunidas', 'Energía', 'Mercado Continuo'),
  ('TAL.MC', 'Talgo', 'Industrial', 'Mercado Continuo'),
  ('GEST.MC', 'Gestamp', 'Consumo Cíclico', 'Mercado Continuo'),
  ('APPS.MC', 'Applus Services', 'Industrial', 'Mercado Continuo'),

  -- BME Growth
  ('LLE.MC', 'Lleida.net', 'Telecomunicaciones', 'BME Growth'),
  ('GIG.MC', 'Gigas Hosting', 'Tecnología', 'BME Growth'),
  ('ALT.MC', 'Altia Consultores', 'Tecnología', 'BME Growth'),
  ('IZE.MC', 'Izertis', 'Tecnología', 'BME Growth'),
  ('HLZ.MC', 'Holaluz', 'Energía', 'BME Growth'),
  ('CLE.MC', 'Clerhp Estructuras', 'Industrial', 'BME Growth'),
  ('TR1.MC', 'Tier1 Technology', 'Tecnología', 'BME Growth'),
  ('EIDF.MC', 'EiDF Solar', 'Energía', 'BME Growth'),
  ('ADZ.MC', 'Adverthia', 'Tecnología', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE
SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;
