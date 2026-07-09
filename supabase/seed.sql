-- Seed script for populating the assets table with Spanish market data
-- Target tables: public.assets
-- This script is idempotent. It uses ON CONFLICT (symbol) DO UPDATE.

INSERT INTO public.assets (symbol, name, description, sector, market, is_active)
VALUES
  -- IBEX 35
  ('IBE.MC', 'Iberdrola', 'Empresa española líder mundial en el sector eléctrico.', 'Utilities', 'IBEX 35', true),
  ('ITX.MC', 'Inditex', 'Grupo multinacional español de fabricación y distribución textil.', 'Consumer Cyclical', 'IBEX 35', true),
  ('SAN.MC', 'Banco Santander', 'Banco comercial español y una de las principales entidades financieras del mundo.', 'Financial Services', 'IBEX 35', true),
  ('BBVA.MC', 'BBVA', 'Banco Bilbao Vizcaya Argentaria, entidad bancaria española con fuerte presencia internacional.', 'Financial Services', 'IBEX 35', true),
  ('TEF.MC', 'Telefónica', 'Empresa multinacional española de telecomunicaciones.', 'Communication Services', 'IBEX 35', true),
  ('CABK.MC', 'CaixaBank', 'Banco con sede en España, líder en el mercado nacional.', 'Financial Services', 'IBEX 35', true),
  ('AENA.MC', 'Aena', 'Sociedad mercantil estatal que gestiona los aeropuertos de interés general en España.', 'Industrials', 'IBEX 35', true),
  ('REP.MC', 'Repsol', 'Compañía multinacional energética y petroquímica española.', 'Energy', 'IBEX 35', true),
  ('FER.MC', 'Ferrovial', 'Empresa multinacional española que opera en el sector de las infraestructuras.', 'Industrials', 'IBEX 35', true),
  ('NTGY.MC', 'Naturgy', 'Empresa española del sector energético.', 'Utilities', 'IBEX 35', true),
  ('ENG.MC', 'Enagás', 'Compañía española de transporte de gas natural y Gestor Técnico del Sistema Gasista de España.', 'Utilities', 'IBEX 35', true),
  ('RED.MC', 'Redeia', 'Operador del sistema eléctrico español.', 'Utilities', 'IBEX 35', true),
  ('IAG.MC', 'IAG', 'International Airlines Group, holding anglo-español de aerolíneas.', 'Industrials', 'IBEX 35', true),
  ('GRF.MC', 'Grifols', 'Empresa multinacional española del sector farmacéutico y hospitalario.', 'Healthcare', 'IBEX 35', true),
  ('ELE.MC', 'Endesa', 'Empresa española del sector eléctrico y gasístico.', 'Utilities', 'IBEX 35', true),
  ('BKT.MC', 'Bankinter', 'Banco español de tamaño medio.', 'Financial Services', 'IBEX 35', true),
  ('ACS.MC', 'ACS', 'Actividades de Construcción y Servicios, empresa española constructora y de servicios.', 'Industrials', 'IBEX 35', true),
  ('SAB.MC', 'Banco Sabadell', 'Banco español originario de Sabadell.', 'Financial Services', 'IBEX 35', true),
  ('MRL.MC', 'Merlin Properties', 'Sociedad Cotizada Anónima de Inversión en el Mercado Inmobiliario (SOCIMI).', 'Real Estate', 'IBEX 35', true),
  ('CLNX.MC', 'Cellnex Telecom', 'Empresa española de servicios e infraestructuras de telecomunicaciones.', 'Communication Services', 'IBEX 35', true),
  ('MAP.MC', 'Mapfre', 'Empresa multinacional española dedicada al sector del seguro.', 'Financial Services', 'IBEX 35', true),
  ('ANA.MC', 'Acciona', 'Empresa española de promoción y gestión de infraestructuras y energías renovables.', 'Utilities', 'IBEX 35', true),
  ('VIS.MC', 'Viscofan', 'Empresa española líder en envolturas para productos cárnicos.', 'Consumer Defensive', 'IBEX 35', true),
  ('IDR.MC', 'Indra', 'Empresa multinacional española de consultoría y tecnología.', 'Technology', 'IBEX 35', true),
  ('LOG.MC', 'Logista', 'Distribuidor de productos a minoristas en el sur de Europa.', 'Industrials', 'IBEX 35', true),
  ('ROVI.MC', 'Laboratorios Rovi', 'Compañía farmacéutica española.', 'Healthcare', 'IBEX 35', true),
  ('UNI.MC', 'Unicaja Banco', 'Entidad financiera española.', 'Financial Services', 'IBEX 35', true),
  ('SCYR.MC', 'Sacyr', 'Empresa española de construcción e infraestructuras.', 'Industrials', 'IBEX 35', true),
  ('COL.MC', 'Colonial', 'Sociedad Anónima Cotizada de Inversión Inmobiliaria.', 'Real Estate', 'IBEX 35', true),
  ('ACX.MC', 'Acerinox', 'Grupo empresarial multinacional español, dedicado a la fabricación de aceros inoxidables.', 'Basic Materials', 'IBEX 35', true),
  ('FDR.MC', 'Fluidra', 'Empresa multinacional del sector de la piscina y el wellness.', 'Industrials', 'IBEX 35', true),
  ('MEL.MC', 'Meliá Hotels International', 'Empresa hotelera española.', 'Consumer Cyclical', 'IBEX 35', true),
  ('AMAD.MC', 'Amadeus', 'Empresa proveedora de soluciones tecnológicas para la industria de los viajes.', 'Technology', 'IBEX 35', true),

  -- Mercado Continuo
  ('LLE.MC', 'Lleida.net', 'Proveedor de servicios de notificación electrónica, SMS y contratación certificada.', 'Technology', 'Continuo', true),
  ('ALM.MC', 'Almirall', 'Compañía farmacéutica con sede en Barcelona.', 'Healthcare', 'Continuo', true),
  ('CIE.MC', 'CIE Automotive', 'Proveedor de componentes para automoción.', 'Consumer Cyclical', 'Continuo', true),
  ('EBRO.MC', 'Ebro Foods', 'Multinacional del sector de la alimentación española.', 'Consumer Defensive', 'Continuo', true),
  ('PHM.MC', 'PharmaMar', 'Empresa farmacéutica que desarrolla fármacos de origen marino.', 'Healthcare', 'Continuo', true),
  ('VID.MC', 'Vidrala', 'Empresa productora de envases de vidrio.', 'Basic Materials', 'Continuo', true),
  ('GCO.MC', 'Grupo Catalana Occidente', 'Grupo asegurador español.', 'Financial Services', 'Continuo', true),
  ('CAF.MC', 'CAF', 'Construcciones y Auxiliar de Ferrocarriles.', 'Industrials', 'Continuo', true),
  ('TRE.MC', 'Técnicas Reunidas', 'Ingeniería general y construcción de infraestructuras.', 'Industrials', 'Continuo', true),
  ('TLGO.MC', 'Talgo', 'Fabricante de trenes y equipos ferroviarios.', 'Industrials', 'Continuo', true),
  ('EDR.MC', 'eDreams ODIGEO', 'Empresa de viajes online.', 'Consumer Cyclical', 'Continuo', true),
  ('DIA.MC', 'Dia', 'Distribuidora Internacional de Alimentación.', 'Consumer Defensive', 'Continuo', true),

  -- BME Growth
  ('GIG.MC', 'Gigas Hosting', 'Proveedor de servicios de cloud computing.', 'Technology', 'BME Growth', true),
  ('HLZ.MC', 'Holaluz', 'Comercializadora de energía eléctrica de origen renovable.', 'Utilities', 'BME Growth', true),
  ('EIDF.MC', 'EiDF Solar', 'Especializada en instalaciones de energía solar fotovoltaica.', 'Utilities', 'BME Growth', true),
  ('AGIL.MC', 'Agile Content', 'Empresa de servicios y soluciones de vídeo por internet.', 'Technology', 'BME Growth', true),
  ('IZS.MC', 'Izertis', 'Consultora tecnológica.', 'Technology', 'BME Growth', true),
  ('TR1.MC', 'Tier1 Technology', 'Software y servicios de tecnología.', 'Technology', 'BME Growth', true),
  ('NTH.MC', 'Netex', 'Soluciones tecnológicas para el aprendizaje (e-learning).', 'Technology', 'BME Growth', true)

ON CONFLICT (symbol) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sector = EXCLUDED.sector,
  market = EXCLUDED.market,
  is_active = EXCLUDED.is_active;
