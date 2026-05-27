-- supabase/seed.sql

-- Insert or update assets (IBEX 35, Mercado Continuo, and BME Growth)
-- We use ON CONFLICT (symbol) to ensure the script is idempotent.

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
  -- IBEX 35
  ('ITX.MC', 'Industria de Diseño Textil, S.A.', 'Consumo Cíclico', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander, S.A.', 'Servicios Financieros', 'IBEX 35'),
  ('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria, S.A.', 'Servicios Financieros', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola, S.A.', 'Utilidades', 'IBEX 35'),
  ('TEF.MC', 'Telefónica, S.A.', 'Comunicaciones', 'IBEX 35'),
  ('REP.MC', 'Repsol, S.A.', 'Energía', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank, S.A.', 'Servicios Financieros', 'IBEX 35'),
  ('AENA.MC', 'Aena S.M.E., S.A.', 'Industrial', 'IBEX 35'),
  ('AMS.MC', 'Amadeus IT Group, S.A.', 'Tecnología', 'IBEX 35'),
  ('NAT.MC', 'Naturgy Energy Group, S.A.', 'Utilidades', 'IBEX 35'),
  ('RED.MC', 'Redeia Corporación, S.A.', 'Utilidades', 'IBEX 35'),
  ('ELE.MC', 'Endesa, S.A.', 'Utilidades', 'IBEX 35'),
  ('ACS.MC', 'ACS, Actividades de Construcción y Servicios, S.A.', 'Industrial', 'IBEX 35'),
  ('FDL.MC', 'Fluidra, S.A.', 'Industrial', 'IBEX 35'),
  ('CLNX.MC', 'Cellnex Telecom, S.A.', 'Comunicaciones', 'IBEX 35'),
  ('ENG.MC', 'Enagás, S.A.', 'Utilidades', 'IBEX 35'),
  ('MAP.MC', 'Mapfre, S.A.', 'Servicios Financieros', 'IBEX 35'),
  ('IAG.MC', 'International Consolidated Airlines Group, S.A.', 'Industrial', 'IBEX 35'),
  ('ANA.MC', 'Acciona, S.A.', 'Industrial', 'IBEX 35'),
  ('ANE.MC', 'Acciona Energías Renovables, S.A.', 'Utilidades', 'IBEX 35'),
  ('BKT.MC', 'Bankinter, S.A.', 'Servicios Financieros', 'IBEX 35'),
  ('SAB.MC', 'Banco de Sabadell, S.A.', 'Servicios Financieros', 'IBEX 35'),
  ('UNI.MC', 'Unicaja Banco, S.A.', 'Servicios Financieros', 'IBEX 35'),
  ('MRL.MC', 'MERLIN Properties SOCIMI, S.A.', 'Inmobiliaria', 'IBEX 35'),
  ('COL.MC', 'Inmobiliaria Colonial, SOCIMI, S.A.', 'Inmobiliaria', 'IBEX 35'),
  ('ROVI.MC', 'Laboratorios Farmacéuticos Rovi, S.A.', 'Salud', 'IBEX 35'),
  ('LOG.MC', 'Logista Holdings, S.A.', 'Industrial', 'IBEX 35'),
  ('MEL.MC', 'Meliá Hotels International, S.A.', 'Consumo Cíclico', 'IBEX 35'),
  ('GRF.MC', 'Grifols, S.A.', 'Salud', 'IBEX 35'),
  ('SCYR.MC', 'Sacyr, S.A.', 'Industrial', 'IBEX 35'),
  ('VIS.MC', 'Viscofan, S.A.', 'Consumo Defensivo', 'IBEX 35'),
  ('ACX.MC', 'Acerinox, S.A.', 'Materiales Básicos', 'IBEX 35'),
  ('MTS.MC', 'ArcelorMittal, S.A.', 'Materiales Básicos', 'IBEX 35'),

  -- Mercado Continuo (Principales)
  ('CAF.MC', 'Construcciones y Auxiliar de Ferrocarriles, S.A.', 'Industrial', 'Mercado Continuo'),
  ('TAL.MC', 'Talgo, S.A.', 'Industrial', 'Mercado Continuo'),
  ('TRG.MC', 'Técnicas Reunidas, S.A.', 'Energía', 'Mercado Continuo'),
  ('VID.MC', 'Vidrala, S.A.', 'Materiales Básicos', 'Mercado Continuo'),
  ('TUB.MC', 'Tubacex, S.A.', 'Materiales Básicos', 'Mercado Continuo'),
  ('DIA.MC', 'Distribuidora Internacional de Alimentación, S.A.', 'Consumo Defensivo', 'Mercado Continuo'),
  ('OHLA.MC', 'OHLA, S.A.', 'Industrial', 'Mercado Continuo'),
  ('CIE.MC', 'CIE Automotive, S.A.', 'Consumo Cíclico', 'Mercado Continuo'),
  ('EBR.MC', 'Ebro Foods, S.A.', 'Consumo Defensivo', 'Mercado Continuo'),
  ('ENC.MC', 'Ence Energía y Celulosa, S.A.', 'Materiales Básicos', 'Mercado Continuo'),
  ('FAES.MC', 'Faes Farma, S.A.', 'Salud', 'Mercado Continuo'),

  -- BME Growth (Principales)
  ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
  ('IZG.MC', 'Izertis, S.A.', 'Tecnología', 'BME Growth'),
  ('EIDF.MC', 'EiDF Solar, S.A.', 'Energía', 'BME Growth'),
  ('GIG.MC', 'Gigas Hosting, S.A.', 'Tecnología', 'BME Growth'),
  ('AGIL.MC', 'Agile Content, S.A.', 'Tecnología', 'BME Growth'),
  ('HLZ.MC', 'Holaluz-Clidom, S.A.', 'Utilidades', 'BME Growth'),
  ('MIO.MC', 'MIO Group, S.A.', 'Comunicaciones', 'BME Growth'),
  ('ART.MC', 'Arteche, S.A.', 'Industrial', 'BME Growth'),
  ('TR1.MC', 'Tier1 Technology, S.A.', 'Tecnología', 'BME Growth')
ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market;
