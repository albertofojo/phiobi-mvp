-- Seed file to populate the assets table with companies from the Spanish stock market.
-- Includes IBEX 35, Mercado Continuo, and BME Growth tickers.

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
  -- IBEX 35
  ('ITX.MC', 'Industria de Diseño Textil, S.A. (Inditex)', 'Consumo Discrecional', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander, S.A.', 'Financiero', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola, S.A.', 'Energía', 'IBEX 35'),
  ('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria, S.A.', 'Financiero', 'IBEX 35'),
  ('AENA.MC', 'Aena S.M.E., S.A.', 'Industrial', 'IBEX 35'),
  ('AMS.MC', 'Amadeus IT Group, S.A.', 'Tecnología', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank, S.A.', 'Financiero', 'IBEX 35'),
  ('REP.MC', 'Repsol, S.A.', 'Energía', 'IBEX 35'),
  ('TEF.MC', 'Telefónica, S.A.', 'Telecomunicaciones', 'IBEX 35'),
  ('FER.MC', 'Ferrovial SE', 'Industrial', 'IBEX 35'),
  ('IAG.MC', 'International Consolidated Airlines Group, S.A.', 'Industrial', 'IBEX 35'),
  ('NAT.MC', 'Naturgy Energy Group, S.A.', 'Energía', 'IBEX 35'),
  ('ELE.MC', 'Endesa, S.A.', 'Energía', 'IBEX 35'),
  ('ACS.MC', 'ACS, Actividades de Construcción y Servicios, S.A.', 'Industrial', 'IBEX 35'),
  ('GRF.MC', 'Grifols, S.A.', 'Salud', 'IBEX 35'),
  ('RED.MC', 'Redeia Corporación, S.A.', 'Energía', 'IBEX 35'),
  ('ANA.MC', 'Acciona, S.A.', 'Industrial', 'IBEX 35'),
  ('ENG.MC', 'Enagás, S.A.', 'Energía', 'IBEX 35'),
  ('MAP.MC', 'Mapfre, S.A.', 'Financiero', 'IBEX 35'),
  ('SAB.MC', 'Banco de Sabadell, S.A.', 'Financiero', 'IBEX 35'),
  ('BKT.MC', 'Bankinter, S.A.', 'Financiero', 'IBEX 35'),
  ('MRL.MC', 'Merlin Properties SOCIMI, S.A.', 'Inmobiliario', 'IBEX 35'),
  ('COL.MC', 'Inmobiliaria Colonial, SOCIMI, S.A.', 'Inmobiliario', 'IBEX 35'),
  ('VIS.MC', 'Viscofan, S.A.', 'Consumo Básico', 'IBEX 35'),
  ('ROVI.MC', 'Laboratorios Farmacéuticos Rovi, S.A.', 'Salud', 'IBEX 35'),
  ('LOG.MC', 'Compañía de Distribución Integral Logista Holdings, S.A.', 'Industrial', 'IBEX 35'),
  ('FLX.MC', 'Fluidra, S.A.', 'Consumo Discrecional', 'IBEX 35'),
  ('MEL.MC', 'Meliá Hotels International, S.A.', 'Consumo Discrecional', 'IBEX 35'),
  ('SCYR.MC', 'Sacyr, S.A.', 'Industrial', 'IBEX 35'),
  ('UNI.MC', 'Unicaja Banco, S.A.', 'Financiero', 'IBEX 35'),
  ('IDR.MC', 'Indra Sistemas, S.A.', 'Tecnología', 'IBEX 35'),
  ('MTS.MC', 'ArcelorMittal, S.A.', 'Materiales Básicos', 'IBEX 35'),
  ('ACX.MC', 'Acerinox, S.A.', 'Materiales Básicos', 'IBEX 35'),
  ('CIE.MC', 'CIE Automotive, S.A.', 'Consumo Discrecional', 'IBEX 35'),
  ('SLR.MC', 'Solaria Energía y Medio Ambiente, S.A.', 'Energía', 'IBEX 35'),

  -- Mercado Continuo
  ('ALB.MC', 'Corporación Financiera Alba, S.A.', 'Financiero', 'Continuo'),
  ('ENC.MC', 'Ence Energía y Celulosa, S.A.', 'Materiales Básicos', 'Continuo'),
  ('GCO.MC', 'Grupo Catalana Occidente, S.A.', 'Financiero', 'Continuo'),
  ('CAF.MC', 'Construcciones y Auxiliar de Ferrocarriles, S.A.', 'Industrial', 'Continuo'),
  ('TUB.MC', 'Tubacex, S.A.', 'Materiales Básicos', 'Continuo'),
  ('TRG.MC', 'Tubos Reunidos, S.A.', 'Materiales Básicos', 'Continuo'),
  ('VID.MC', 'Vidrala, S.A.', 'Materiales Básicos', 'Continuo'),
  ('PHM.MC', 'Pharma Mar, S.A.', 'Salud', 'Continuo'),
  ('OHLA.MC', 'Obrascón Huarte Lain, S.A.', 'Industrial', 'Continuo'),
  ('DIA.MC', 'Distribuidora Internacional de Alimentación, S.A.', 'Consumo Básico', 'Continuo'),
  ('TL5.MC', 'Mediaset España Comunicación, S.A.', 'Servicios de Comunicación', 'Continuo'),
  ('TRE.MC', 'Técnicas Reunidas, S.A.', 'Industrial', 'Continuo'),
  ('A3M.MC', 'Atresmedia Corporación de Medios de Comunicación, S.A.', 'Servicios de Comunicación', 'Continuo'),
  ('ALM.MC', 'Almirall, S.A.', 'Salud', 'Continuo'),
  ('EDR.MC', 'eDreams ODIGEO S.A.', 'Consumo Discrecional', 'Continuo'),
  ('FDR.MC', 'Faes Farma, S.A.', 'Salud', 'Continuo'),

  -- BME Growth
  ('LLE.MC', 'Lleida.net', 'Tecnología', 'BME Growth'),
  ('GIG.MC', 'Gigas Hosting, S.A.', 'Tecnología', 'BME Growth'),
  ('HLZ.MC', 'Holaluz', 'Energía', 'BME Growth'),
  ('MCOM.MC', 'Making Science Group, S.A.', 'Tecnología', 'BME Growth'),
  ('CLER.MC', 'Clerhp Estructuras', 'Industrial', 'BME Growth'),
  ('TR1.MC', 'Tier1 Technology', 'Tecnología', 'BME Growth'),
  ('CCOM.MC', 'Cuatroochenta', 'Tecnología', 'BME Growth'),
  ('SNG.MC', 'SNGULAR', 'Tecnología', 'BME Growth'),
  ('AGIL.MC', 'Agile Content, S.A.', 'Tecnología', 'BME Growth'),
  ('EIDF.MC', 'EiDF Solar', 'Energía', 'BME Growth')

ON CONFLICT (symbol) DO UPDATE
SET
  name = EXCLUDED.name,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market,
  is_active = true,
  updated_at = TIMEZONE('utc'::text, NOW());
