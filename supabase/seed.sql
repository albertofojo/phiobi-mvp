-- seed.sql: Populate assets table with IBEX 35, Mercado Continuo, and BME Growth
-- Uses the TICKER.MC format for Spanish market compatibility.

INSERT INTO public.assets (symbol, name, sector, market)
VALUES
  -- IBEX 35
  ('ITX.MC', 'Industria de Diseño Textil, S.A.', 'Consumer Cyclical', 'IBEX 35'),
  ('IBE.MC', 'Iberdrola, S.A.', 'Utilities', 'IBEX 35'),
  ('SAN.MC', 'Banco Santander, S.A.', 'Financial Services', 'IBEX 35'),
  ('BBVA.MC', 'Banco Bilbao Vizcaya Argentaria, S.A.', 'Financial Services', 'IBEX 35'),
  ('CABK.MC', 'CaixaBank, S.A.', 'Financial Services', 'IBEX 35'),
  ('AMS.MC', 'Amadeus IT Group, S.A.', 'Technology', 'IBEX 35'),
  ('AENA.MC', 'Aena S.M.E., S.A.', 'Industrials', 'IBEX 35'),
  ('CLNX.MC', 'Cellnex Telecom, S.A.', 'Communication Services', 'IBEX 35'),
  ('TEF.MC', 'Telefónica, S.A.', 'Communication Services', 'IBEX 35'),
  ('FER.MC', 'Ferrovial SE', 'Industrials', 'IBEX 35'),
  ('REP.MC', 'Repsol, S.A.', 'Energy', 'IBEX 35'),
  ('NTGY.MC', 'Naturgy Energy Group, S.A.', 'Utilities', 'IBEX 35'),
  ('ELE.MC', 'Endesa, S.A.', 'Utilities', 'IBEX 35'),
  ('ACS.MC', 'ACS, Actividades de Construcción y Servicios, S.A.', 'Industrials', 'IBEX 35'),
  ('IAG.MC', 'International Consolidated Airlines Group, S.A.', 'Industrials', 'IBEX 35'),
  ('GRF.MC', 'Grifols, S.A.', 'Healthcare', 'IBEX 35'),
  ('RED.MC', 'Redeia Corporación, S.A.', 'Utilities', 'IBEX 35'),
  ('ANA.MC', 'Acciona, S.A.', 'Utilities', 'IBEX 35'),
  ('SAB.MC', 'Banco de Sabadell, S.A.', 'Financial Services', 'IBEX 35'),
  ('BKT.MC', 'Bankinter, S.A.', 'Financial Services', 'IBEX 35'),
  ('ENG.MC', 'Enagás, S.A.', 'Utilities', 'IBEX 35'),
  ('LOG.MC', 'Compañía de Distribución Integral Logista Holdings, S.A.', 'Industrials', 'IBEX 35'),
  ('MAP.MC', 'Mapfre, S.A.', 'Financial Services', 'IBEX 35'),
  ('FDR.MC', 'Fluidra, S.A.', 'Industrials', 'IBEX 35'),
  ('ROVI.MC', 'Laboratorios Farmacéuticos Rovi, S.A.', 'Healthcare', 'IBEX 35'),
  ('SCYR.MC', 'Sacyr, S.A.', 'Industrials', 'IBEX 35'),
  ('IDR.MC', 'Indra Sistemas, S.A.', 'Technology', 'IBEX 35'),
  ('UNI.MC', 'Unicaja Banco, S.A.', 'Financial Services', 'IBEX 35'),
  ('SLR.MC', 'Solaria Energía y Medio Ambiente, S.A.', 'Utilities', 'IBEX 35'),
  ('MEL.MC', 'Meliá Hotels International, S.A.', 'Consumer Cyclical', 'IBEX 35'),
  ('COL.MC', 'Inmobiliaria Colonial, SOCIMI, S.A.', 'Real Estate', 'IBEX 35'),
  ('MRL.MC', 'Merlin Properties SOCIMI, S.A.', 'Real Estate', 'IBEX 35'),
  ('ACX.MC', 'Acerinox, S.A.', 'Basic Materials', 'IBEX 35'),
  ('MTS.MC', 'ArcelorMittal S.A.', 'Basic Materials', 'IBEX 35'),

  -- Mercado Continuo (Principales)
  ('VIS.MC', 'Viscofan, S.A.', 'Consumer Defensive', 'Continuo'),
  ('VID.MC', 'Vidrala, S.A.', 'Consumer Cyclical', 'Continuo'),
  ('GEST.MC', 'Gestamp Automoción, S.A.', 'Consumer Cyclical', 'Continuo'),
  ('ALM.MC', 'Almirall, S.A.', 'Healthcare', 'Continuo'),
  ('FAE.MC', 'Faes Farma, S.A.', 'Healthcare', 'Continuo'),
  ('GRE.MC', 'Grenergy Renovables, S.A.', 'Utilities', 'Continuo'),
  ('CAF.MC', 'Construcciones y Auxiliar de Ferrocarriles, S.A.', 'Industrials', 'Continuo'),
  ('TLGO.MC', 'Talgo, S.A.', 'Industrials', 'Continuo'),
  ('TUB.MC', 'Tubacex, S.A.', 'Basic Materials', 'Continuo'),
  ('OHLA.MC', 'Obrascón Huarte Lain, S.A.', 'Industrials', 'Continuo'),
  ('PRM.MC', 'Promotora de Informaciones, S.A.', 'Communication Services', 'Continuo'),
  ('DIA.MC', 'Distribuidora Internacional de Alimentación, S.A.', 'Consumer Defensive', 'Continuo'),

  -- BME Growth (Destacados)
  ('GIG.MC', 'Gigas Hosting, S.A.', 'Technology', 'BME Growth'),
  ('LLE.MC', 'Lleidanetworks Serveis Telemàtics, S.A.', 'Technology', 'BME Growth'),
  ('IZER.MC', 'Izertis, S.A.', 'Technology', 'BME Growth'),
  ('ART.MC', 'Arteche Lantegi Elkartea, S.A.', 'Industrials', 'BME Growth'),
  ('HLZ.MC', 'Holaluz-Clidom, S.A.', 'Utilities', 'BME Growth'),
  ('ADL.MC', 'ADL Bionatur Solutions, S.A.', 'Healthcare', 'BME Growth'),
  ('CCOM.MC', 'Catenon, S.A.', 'Industrials', 'BME Growth')
ON CONFLICT (symbol) DO NOTHING;
