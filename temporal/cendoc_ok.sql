/*
Navicat MySQL Data Transfer

Source Server         : ok
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : cendoc

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2016-08-23 17:44:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `documentos`
-- ----------------------------
DROP TABLE IF EXISTS `documentos`;
CREATE TABLE `documentos` (
  `iddocumentos` int(11) NOT NULL AUTO_INCREMENT,
  `idtipo` int(11) NOT NULL,
  `idoficinas` int(11) NOT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `asunto` text,
  `fecha` datetime DEFAULT NULL,
  `para` varchar(45) DEFAULT NULL,
  `de` varchar(45) DEFAULT NULL,
  `archivo` varchar(120) DEFAULT NULL,
  `folios` varchar(45) NOT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `anio` year(4) DEFAULT NULL,
  PRIMARY KEY (`iddocumentos`,`idtipo`,`idoficinas`),
  KEY `fk_documentos_tipo_idx` (`idtipo`),
  KEY `fk_documentos_oficinas1_idx` (`idoficinas`),
  CONSTRAINT `fk_documentos_oficinas1` FOREIGN KEY (`idoficinas`) REFERENCES `oficinas` (`idoficinas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_documentos_tipo` FOREIGN KEY (`idtipo`) REFERENCES `tipo` (`idtipo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of documentos
-- ----------------------------
INSERT INTO `documentos` VALUES ('1', '3', '7', '321', '321', '2016-08-23 00:00:00', '321', '321', '3213', '213', '21321', '2016');

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'node_id',
  `text` varchar(40) NOT NULL COMMENT 'node_name',
  `parent_id` int(11) NOT NULL,
  `leaf` varchar(5) NOT NULL COMMENT 'true/false',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=92 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', 'Cendoc', '0', 'false');
INSERT INTO `menu` VALUES ('3', 'PELT', '1', 'true');
INSERT INTO `menu` VALUES ('88', 'Oficinas', '1', 'true');
INSERT INTO `menu` VALUES ('89', 'Tipo_Documento', '1', 'true');

-- ----------------------------
-- Table structure for `oficinas`
-- ----------------------------
DROP TABLE IF EXISTS `oficinas`;
CREATE TABLE `oficinas` (
  `idoficinas` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `abreviatura` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idoficinas`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of oficinas
-- ----------------------------
INSERT INTO `oficinas` VALUES ('2', 'DIRECCION DE DESARROLLO Y MEDIO AMBIENTE', 'DDAYMA');
INSERT INTO `oficinas` VALUES ('3', 'DIRECCION DE ESTUDIOS', 'DES');
INSERT INTO `oficinas` VALUES ('4', 'DIRECCION DE RECURSOS HIDROBIOLOGICOS', 'DRH');
INSERT INTO `oficinas` VALUES ('5', 'PLANTA DE PROCESAMIENTO DE ALIMENTOS', 'DRH-PPA');
INSERT INTO `oficinas` VALUES ('6', 'DIRECCION DE OBRAS', 'DO');
INSERT INTO `oficinas` VALUES ('7', null, null);
INSERT INTO `oficinas` VALUES ('8', 'OFICINA DE IMAGEN INSTITUCIONAL', 'OII');
INSERT INTO `oficinas` VALUES ('9', 'AREA DE INFORMATICA', 'OII-INF');
INSERT INTO `oficinas` VALUES ('10', 'PELTLIMA', 'PELTLIMA');
INSERT INTO `oficinas` VALUES ('11', 'SEC-TECNICA-PAD-ALTE', 'SEC-TECNICA-PAD-ALTE');
INSERT INTO `oficinas` VALUES ('12', 'OFICINA DE ADMINISTRACION', 'OA');
INSERT INTO `oficinas` VALUES ('13', 'UNIDAD DE ABASTECIMIENTOS Y SERVICIOS GENERAL', 'OA-UASG');
INSERT INTO `oficinas` VALUES ('14', 'AREA DE ALMACEN', 'OA-UASG-AA');
INSERT INTO `oficinas` VALUES ('15', 'AREA DE PATRIMONIO', 'OA-UASG-AP');
INSERT INTO `oficinas` VALUES ('16', 'UNIDAD DE CONTABILIDAD', 'OA-UC');
INSERT INTO `oficinas` VALUES ('17', 'CONTROL PREVIO', 'CONTROL PREVIO');
INSERT INTO `oficinas` VALUES ('18', 'UNIDAD DE PERSONAL', 'OA-UPER');
INSERT INTO `oficinas` VALUES ('19', 'TRAMITE DOCUMENTARIO', 'OA-UPER-TD');
INSERT INTO `oficinas` VALUES ('20', 'CENTRO DOCUMENTARIO', 'OA-UPER-CENDOC');
INSERT INTO `oficinas` VALUES ('21', 'UNIDAD DE TESORERIA', 'OA-UT');
INSERT INTO `oficinas` VALUES ('22', 'OFICINA DE ASESORIA JURIDICA', 'OAJ');
INSERT INTO `oficinas` VALUES ('23', 'OFICINA DE PRESUPUESTO Y PLANIFICACION', 'OPP');
INSERT INTO `oficinas` VALUES ('24', 'OFICINA DE CONTROL INTERNO', 'OCI');
INSERT INTO `oficinas` VALUES ('25', 'SEC-TECNICA-PAD', 'SEC-TECNICA-PAD');

-- ----------------------------
-- Table structure for `proyecto`
-- ----------------------------
DROP TABLE IF EXISTS `proyecto`;
CREATE TABLE `proyecto` (
  `idproyecto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `long` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `link` varchar(45) DEFAULT NULL,
  `proyectocol` varchar(45) DEFAULT NULL,
  `parent_id` int(11) NOT NULL,
  `leaf` varchar(80) NOT NULL,
  PRIMARY KEY (`idproyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of proyecto
-- ----------------------------
INSERT INTO `proyecto` VALUES ('1', 'Gestion de Proyecto', null, null, null, null, null, '0', 'false');

-- ----------------------------
-- Table structure for `tipo`
-- ----------------------------
DROP TABLE IF EXISTS `tipo`;
CREATE TABLE `tipo` (
  `idtipo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtipo`)
) ENGINE=InnoDB AUTO_INCREMENT=330 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tipo
-- ----------------------------
INSERT INTO `tipo` VALUES ('1', 'ABSOLUCION DE CONSULTAS');
INSERT INTO `tipo` VALUES ('2', 'ACTA DE BUENA PRO');
INSERT INTO `tipo` VALUES ('3', 'ACTA DE COMPROMISO');
INSERT INTO `tipo` VALUES ('4', 'ACTA DE CUSTODIA');
INSERT INTO `tipo` VALUES ('5', 'ACTA DE DONACION');
INSERT INTO `tipo` VALUES ('6', 'ACTA DE ENTREGA');
INSERT INTO `tipo` VALUES ('7', 'ACTA DE ENTREGA DE BIENES');
INSERT INTO `tipo` VALUES ('8', 'ACTA DE INSPECCION OCULAR-TA');
INSERT INTO `tipo` VALUES ('9', 'ACTA DE INSPECCION OCULAR-TUT');
INSERT INTO `tipo` VALUES ('10', 'ACTAS DE VISITA');
INSERT INTO `tipo` VALUES ('11', 'ACUERDO');
INSERT INTO `tipo` VALUES ('12', 'ACUERDO OPERATIVO');
INSERT INTO `tipo` VALUES ('13', 'ADDENDA');
INSERT INTO `tipo` VALUES ('14', 'ADENDA');
INSERT INTO `tipo` VALUES ('15', 'AGENDA');
INSERT INTO `tipo` VALUES ('16', 'AUDIENCIAS');
INSERT INTO `tipo` VALUES ('17', 'AUTORIZACIÓN CIENTIFICA');
INSERT INTO `tipo` VALUES ('18', 'AUTORIZACION DE VIAJES');
INSERT INTO `tipo` VALUES ('19', 'AVISO GENERAL');
INSERT INTO `tipo` VALUES ('20', 'AYUDA MEMORIA');
INSERT INTO `tipo` VALUES ('21', 'BOLETA DE VENTA');
INSERT INTO `tipo` VALUES ('22', 'BOLETAS');
INSERT INTO `tipo` VALUES ('23', 'CARTA');
INSERT INTO `tipo` VALUES ('24', 'CARTA ABIERTA');
INSERT INTO `tipo` VALUES ('25', 'CARTA ACLARATORIA');
INSERT INTO `tipo` VALUES ('26', 'CARTA CIRCULAR');
INSERT INTO `tipo` VALUES ('27', 'CARTA CONJUNTA');
INSERT INTO `tipo` VALUES ('28', 'CARTA DE ACUERDO');
INSERT INTO `tipo` VALUES ('29', 'CARTA DE COBRANZA');
INSERT INTO `tipo` VALUES ('30', 'CARTA DE COMPROMISO');
INSERT INTO `tipo` VALUES ('31', 'CARTA DE DESCARGO');
INSERT INTO `tipo` VALUES ('32', 'CARTA DE ENTENDIMIENTO');
INSERT INTO `tipo` VALUES ('33', 'CARTA DE ENVIO');
INSERT INTO `tipo` VALUES ('34', 'CARTA DE RENUNCIA');
INSERT INTO `tipo` VALUES ('35', 'CARTA FIANZA');
INSERT INTO `tipo` VALUES ('36', 'CARTA INFORMATIVA');
INSERT INTO `tipo` VALUES ('37', 'CARTA INVITACION');
INSERT INTO `tipo` VALUES ('38', 'CARTA MEMORIAL');
INSERT INTO `tipo` VALUES ('39', 'CARTA MULTIPLE');
INSERT INTO `tipo` VALUES ('40', 'CARTA NOTARIAL');
INSERT INTO `tipo` VALUES ('41', 'CARTA ORDEN');
INSERT INTO `tipo` VALUES ('42', 'CARTA PODER');
INSERT INTO `tipo` VALUES ('43', 'CARTA PODER');
INSERT INTO `tipo` VALUES ('44', 'CARTA PRP');
INSERT INTO `tipo` VALUES ('45', 'CEDULA DE NOTIFICACIÓN');
INSERT INTO `tipo` VALUES ('46', 'CERTIF. DE CRED. PRESUPUESTARI');
INSERT INTO `tipo` VALUES ('47', 'CERTIFICACION DE CAPACITACION');
INSERT INTO `tipo` VALUES ('48', 'CERTIFICACION PRESUPUESTAL');
INSERT INTO `tipo` VALUES ('49', 'CERTIFICACION TECNICA');
INSERT INTO `tipo` VALUES ('50', 'CERTIFICADO DE INSCRIPCIÓN');
INSERT INTO `tipo` VALUES ('51', 'CERTIFICADO DE POSESION');
INSERT INTO `tipo` VALUES ('52', 'CERTIFICADO DE PRACTICAS');
INSERT INTO `tipo` VALUES ('53', 'CERTIFICADO DE RENOVACIÓN');
INSERT INTO `tipo` VALUES ('54', 'CERTIFICADO DE RETENCIONES');
INSERT INTO `tipo` VALUES ('55', 'CERTIFICADO DE TRABAJO');
INSERT INTO `tipo` VALUES ('56', 'CERTIFICADOS');
INSERT INTO `tipo` VALUES ('57', 'CIRCULAR');
INSERT INTO `tipo` VALUES ('58', 'CITACION');
INSERT INTO `tipo` VALUES ('59', 'CLAUSULA DE CONTRATO');
INSERT INTO `tipo` VALUES ('60', 'COMISION DE SERVICIOS');
INSERT INTO `tipo` VALUES ('61', 'COMPROBANTE DE INGRESO');
INSERT INTO `tipo` VALUES ('62', 'COMPROBANTE DE PAGO');
INSERT INTO `tipo` VALUES ('63', 'COMUNICADO');
INSERT INTO `tipo` VALUES ('64', 'CONFORMIDAD DE BIENES');
INSERT INTO `tipo` VALUES ('65', 'CONFORMIDAD DE SERVICIOS');
INSERT INTO `tipo` VALUES ('66', 'CONST DE APORTES Y RETENCIONES');
INSERT INTO `tipo` VALUES ('67', 'CONSTANCIA');
INSERT INTO `tipo` VALUES ('68', 'CONSTANCIA CERTIFICADA');
INSERT INTO `tipo` VALUES ('69', 'CONSTANCIA DE ACUMULACIÓN');
INSERT INTO `tipo` VALUES ('70', 'CONSTANCIA DE CONTRATACION');
INSERT INTO `tipo` VALUES ('71', 'CONSTANCIA DE POSESION');
INSERT INTO `tipo` VALUES ('72', 'CONSTANCIA DE PREST. DE SERVIC');
INSERT INTO `tipo` VALUES ('73', 'CONSULTA');
INSERT INTO `tipo` VALUES ('74', 'CONTRAT COMPR VENTA LEY 277887');
INSERT INTO `tipo` VALUES ('75', 'CONTRAT COMPR VENTA LEY 28042');
INSERT INTO `tipo` VALUES ('76', 'CONTRATO DE ACCESO MARCO A R.G');
INSERT INTO `tipo` VALUES ('77', 'CONTRATO DE PRESTACION DE MAQU');
INSERT INTO `tipo` VALUES ('78', 'CONTRATOS');
INSERT INTO `tipo` VALUES ('79', 'CONTRATOS PARA OBRA');
INSERT INTO `tipo` VALUES ('80', 'CONVENIO');
INSERT INTO `tipo` VALUES ('81', 'CONVENIO MARCO');
INSERT INTO `tipo` VALUES ('82', 'CONVENIO PRP');
INSERT INTO `tipo` VALUES ('83', 'CONVENIOS DE ADJU. DE RECURSOS');
INSERT INTO `tipo` VALUES ('84', 'CONVENIOS ESPECIFICOS');
INSERT INTO `tipo` VALUES ('85', 'CONVENIOS INTERINSTITUCIONALES');
INSERT INTO `tipo` VALUES ('86', 'CORREO ELECTRONICO');
INSERT INTO `tipo` VALUES ('87', 'COTIZACION');
INSERT INTO `tipo` VALUES ('88', 'CREDENCIALES');
INSERT INTO `tipo` VALUES ('89', 'DECLARACION JURADA');
INSERT INTO `tipo` VALUES ('90', 'DECRETO DE URGENCIA');
INSERT INTO `tipo` VALUES ('91', 'DECRETO SUPREMO');
INSERT INTO `tipo` VALUES ('92', 'DENUNCIA');
INSERT INTO `tipo` VALUES ('93', 'DESIGNACION DEL COMITE ESPECIA');
INSERT INTO `tipo` VALUES ('94', 'DETALLE DE PAGO');
INSERT INTO `tipo` VALUES ('95', 'DIRECTIVA');
INSERT INTO `tipo` VALUES ('96', 'DIRECTIVA DE ORGANO');
INSERT INTO `tipo` VALUES ('97', 'DIRECTIVA DGIH');
INSERT INTO `tipo` VALUES ('98', 'DIRECTIVA GENERAL');
INSERT INTO `tipo` VALUES ('99', 'DIRECTIVA SECTORIAL');
INSERT INTO `tipo` VALUES ('100', 'DPPS - DOC PARA PAGO DE SERV');
INSERT INTO `tipo` VALUES ('101', 'ENCARGO');
INSERT INTO `tipo` VALUES ('102', 'ESCRITO');
INSERT INTO `tipo` VALUES ('103', 'ESCRITO JUDICIAL');
INSERT INTO `tipo` VALUES ('104', 'ESQUELA');
INSERT INTO `tipo` VALUES ('105', 'ESQUELA DE CITACION');
INSERT INTO `tipo` VALUES ('106', 'ESTADOS FINANCIEROS');
INSERT INTO `tipo` VALUES ('107', 'EXPEDIENTE');
INSERT INTO `tipo` VALUES ('108', 'EXPEDIENTES DE RESOLUCION JEFA');
INSERT INTO `tipo` VALUES ('109', 'EXPEDIENTES JUDICIALES');
INSERT INTO `tipo` VALUES ('110', 'FACSIMIL');
INSERT INTO `tipo` VALUES ('111', 'FACSIMIL CIRCULAR');
INSERT INTO `tipo` VALUES ('112', 'FACTURA');
INSERT INTO `tipo` VALUES ('113', 'FICHAS TECNICAS');
INSERT INTO `tipo` VALUES ('114', 'FORMATO DE JUNTAS DE USUARIOS');
INSERT INTO `tipo` VALUES ('115', 'GUIA DE REMISION');
INSERT INTO `tipo` VALUES ('116', 'GUIAS');
INSERT INTO `tipo` VALUES ('117', 'HOJA DE ENVIO');
INSERT INTO `tipo` VALUES ('118', 'HOJA DE REMISIÓN');
INSERT INTO `tipo` VALUES ('119', 'HOJA DE RUTA');
INSERT INTO `tipo` VALUES ('120', 'HOJA DE SEGUIMIENTO');
INSERT INTO `tipo` VALUES ('121', 'INF. DE DEMARCACION Y GEOREFER');
INSERT INTO `tipo` VALUES ('122', 'INFORME');
INSERT INTO `tipo` VALUES ('123', 'INFORME CERTIFICACION PRESUPUE');
INSERT INTO `tipo` VALUES ('124', 'INFORME DE ACTIVIDADES');
INSERT INTO `tipo` VALUES ('125', 'INFORME DE AUDITORIAS EXTERNAS');
INSERT INTO `tipo` VALUES ('126', 'INFORME DE AUDITORIAS INTERNAS');
INSERT INTO `tipo` VALUES ('127', 'INFORME DE CALIFICACION');
INSERT INTO `tipo` VALUES ('128', 'INFORME DE CIERRE');
INSERT INTO `tipo` VALUES ('129', 'INFORME DE CONFORMIDAD');
INSERT INTO `tipo` VALUES ('130', 'INFORME DE COORDINACION TECNIC');
INSERT INTO `tipo` VALUES ('131', 'INFORME DE DIAGN. SITUACIONAL');
INSERT INTO `tipo` VALUES ('132', 'INFORME DE DIAGN. SOCIO ECONOM');
INSERT INTO `tipo` VALUES ('133', 'INFORME DE DISPONIBILIDAD');
INSERT INTO `tipo` VALUES ('134', 'INFORME DE EVALUACION');
INSERT INTO `tipo` VALUES ('135', 'INFORME DE EVALUACION PRP');
INSERT INTO `tipo` VALUES ('136', 'INFORME DE FORMULACION PRP');
INSERT INTO `tipo` VALUES ('137', 'INFORME DE IMPLEMENTACIÓN');
INSERT INTO `tipo` VALUES ('138', 'INFORME DE INCENTIVOS');
INSERT INTO `tipo` VALUES ('139', 'INFORME DE MODIFICACION PRESUP');
INSERT INTO `tipo` VALUES ('140', 'INFORME DE REVISION');
INSERT INTO `tipo` VALUES ('141', 'INFORME DE SUPERVISION AMBIENT');
INSERT INTO `tipo` VALUES ('142', 'INFORME DE VERIFICACION');
INSERT INTO `tipo` VALUES ('143', 'INFORME EJECUTIVO');
INSERT INTO `tipo` VALUES ('144', 'INFORME ESCALAFONARIO');
INSERT INTO `tipo` VALUES ('145', 'INFORME FINAL PRP');
INSERT INTO `tipo` VALUES ('146', 'INFORME LEGAL');
INSERT INTO `tipo` VALUES ('147', 'INFORME LEGAL AMBIENTAL');
INSERT INTO `tipo` VALUES ('148', 'INFORME MULTIPLE');
INSERT INTO `tipo` VALUES ('149', 'INFORME PRP');
INSERT INTO `tipo` VALUES ('150', 'INFORME TECNICO');
INSERT INTO `tipo` VALUES ('151', 'INFORME TECNICO AMBIENTAL');
INSERT INTO `tipo` VALUES ('152', 'INFORME TECNICO FORESTAL');
INSERT INTO `tipo` VALUES ('153', 'INFORME TECNICO LEGAL');
INSERT INTO `tipo` VALUES ('154', 'INFORME TECNICO PRP');
INSERT INTO `tipo` VALUES ('155', 'INFORME TECNICO SOCIAL');
INSERT INTO `tipo` VALUES ('156', 'INFORMES DE GESTION');
INSERT INTO `tipo` VALUES ('157', 'INSTRUCTIVO');
INSERT INTO `tipo` VALUES ('158', 'INVENTARIO FISICO Y CONTROL B');
INSERT INTO `tipo` VALUES ('159', 'INVITACIONES');
INSERT INTO `tipo` VALUES ('160', 'LEGAJO PERSONAL');
INSERT INTO `tipo` VALUES ('161', 'LIBRO DE BANCO');
INSERT INTO `tipo` VALUES ('162', 'LIBRO DE COMPRAS');
INSERT INTO `tipo` VALUES ('163', 'LIBRO DIARIO');
INSERT INTO `tipo` VALUES ('164', 'LIBRO INVENTARIO');
INSERT INTO `tipo` VALUES ('165', 'LICITACIONES');
INSERT INTO `tipo` VALUES ('166', 'LIQUI DE BENEFICIO SOCIALES');
INSERT INTO `tipo` VALUES ('167', 'MEMORANDUM');
INSERT INTO `tipo` VALUES ('168', 'MEMORANDUM CIRCULAR');
INSERT INTO `tipo` VALUES ('169', 'MEMORANDUM DE ENTENDIMIENTO');
INSERT INTO `tipo` VALUES ('170', 'MEMORANDUM MULTIPLE');
INSERT INTO `tipo` VALUES ('171', 'MEMORANDUM PRP');
INSERT INTO `tipo` VALUES ('172', 'MEMORIAL');
INSERT INTO `tipo` VALUES ('173', 'MEMORIAS ANUALES');
INSERT INTO `tipo` VALUES ('174', 'NOTA');
INSERT INTO `tipo` VALUES ('175', 'NOTA ADMINISTRATIVA');
INSERT INTO `tipo` VALUES ('176', 'NOTA DE ABONO');
INSERT INTO `tipo` VALUES ('177', 'NOTA DE COORDINACION');
INSERT INTO `tipo` VALUES ('178', 'NOTA DE DEVOLUCION');
INSERT INTO `tipo` VALUES ('179', 'NOTA DE ENVIO');
INSERT INTO `tipo` VALUES ('180', 'NOTA DE LIQUIDACION');
INSERT INTO `tipo` VALUES ('181', 'NOTA DE PEDIDO');
INSERT INTO `tipo` VALUES ('182', 'NOTA INFORMATIVA');
INSERT INTO `tipo` VALUES ('183', 'NOTA INTERNA');
INSERT INTO `tipo` VALUES ('184', 'NOTA MULTIPLE');
INSERT INTO `tipo` VALUES ('185', 'NOTARIAL');
INSERT INTO `tipo` VALUES ('186', 'NOTIFICACION');
INSERT INTO `tipo` VALUES ('187', 'NOTIFICACION ADMINISTRATIVA');
INSERT INTO `tipo` VALUES ('188', 'NOTIFICACION DE RESOL. COACTIV');
INSERT INTO `tipo` VALUES ('189', 'NOTIFICACION DE RESOL. DIRECTO');
INSERT INTO `tipo` VALUES ('190', 'NOTIFICACION JUDICIAL');
INSERT INTO `tipo` VALUES ('191', 'NOTIFICACION POR CARTEL');
INSERT INTO `tipo` VALUES ('192', 'OBSERVACIÓN TECNICA');
INSERT INTO `tipo` VALUES ('193', 'OF. PEDIDO');
INSERT INTO `tipo` VALUES ('194', 'OFICIO');
INSERT INTO `tipo` VALUES ('195', 'OFICIO CIRCULAR');
INSERT INTO `tipo` VALUES ('196', 'OFICIO MULTIPLE');
INSERT INTO `tipo` VALUES ('197', 'OPINION LEGAL');
INSERT INTO `tipo` VALUES ('198', 'OPINIÓN TECNICA');
INSERT INTO `tipo` VALUES ('199', 'ORDEN DE COMPRA');
INSERT INTO `tipo` VALUES ('200', 'ORDEN DE PAGO');
INSERT INTO `tipo` VALUES ('201', 'ORDEN DE SALIDA');
INSERT INTO `tipo` VALUES ('202', 'ORDEN DE SERVICIO');
INSERT INTO `tipo` VALUES ('203', 'ORDENANZA');
INSERT INTO `tipo` VALUES ('204', 'OTROS');
INSERT INTO `tipo` VALUES ('205', 'P. MENOR CUANTIA');
INSERT INTO `tipo` VALUES ('206', 'PADRON DE POSESIONARIOS APTOS');
INSERT INTO `tipo` VALUES ('207', 'PADRONES DE USUARIOS');
INSERT INTO `tipo` VALUES ('208', 'PAPELETA');
INSERT INTO `tipo` VALUES ('209', 'PAPELETA DE DEPOSITO A FAVOR D');
INSERT INTO `tipo` VALUES ('210', 'PECOSA');
INSERT INTO `tipo` VALUES ('211', 'PEDIDO');
INSERT INTO `tipo` VALUES ('212', 'PEDIDO DE INFORMACION');
INSERT INTO `tipo` VALUES ('213', 'PEDIDO DE SUMINISTRO');
INSERT INTO `tipo` VALUES ('214', 'PLAN DE TRABAJO');
INSERT INTO `tipo` VALUES ('215', 'PLAN DE VIAJE');
INSERT INTO `tipo` VALUES ('216', 'PLANES OPERATIVOS');
INSERT INTO `tipo` VALUES ('217', 'PLANILLA DE PAGO');
INSERT INTO `tipo` VALUES ('218', 'PLANILLA DE VIATICO');
INSERT INTO `tipo` VALUES ('219', 'PLANILLAS');
INSERT INTO `tipo` VALUES ('220', 'PLANOS');
INSERT INTO `tipo` VALUES ('221', 'PRESUPUESTO');
INSERT INTO `tipo` VALUES ('222', 'PROFORMA');
INSERT INTO `tipo` VALUES ('223', 'PRONUNCIAMIENTO');
INSERT INTO `tipo` VALUES ('224', 'PROTOCOLO');
INSERT INTO `tipo` VALUES ('225', 'PROVEIDO');
INSERT INTO `tipo` VALUES ('226', 'PROY. DE CARTA MULTIPLE');
INSERT INTO `tipo` VALUES ('227', 'PROY. DE DECRETO DE URGENCIA');
INSERT INTO `tipo` VALUES ('228', 'PROYECTO');
INSERT INTO `tipo` VALUES ('229', 'PROYECTO DE CARTA');
INSERT INTO `tipo` VALUES ('230', 'PROYECTO DE CARTA NOTARIAL');
INSERT INTO `tipo` VALUES ('231', 'PROYECTO DE D.S');
INSERT INTO `tipo` VALUES ('232', 'PROYECTO DE DECRETO LEGISLATIV');
INSERT INTO `tipo` VALUES ('233', 'PROYECTO DE DIAGNOSTICO');
INSERT INTO `tipo` VALUES ('234', 'PROYECTO DE INFORME');
INSERT INTO `tipo` VALUES ('235', 'PROYECTO DE INFORME TECNICO');
INSERT INTO `tipo` VALUES ('236', 'PROYECTO DE LEY');
INSERT INTO `tipo` VALUES ('237', 'PROYECTO DE MEMO MULTIPLE');
INSERT INTO `tipo` VALUES ('238', 'PROYECTO DE MEMORANDUM');
INSERT INTO `tipo` VALUES ('239', 'PROYECTO DE NOTA DE ENVIO');
INSERT INTO `tipo` VALUES ('240', 'PROYECTO DE OFICIO');
INSERT INTO `tipo` VALUES ('241', 'PROYECTO DE OFICIO MULTIPLE');
INSERT INTO `tipo` VALUES ('242', 'PROYECTO DE R.D');
INSERT INTO `tipo` VALUES ('243', 'PROYECTO DE R.G.G');
INSERT INTO `tipo` VALUES ('244', 'PROYECTO DE R.I');
INSERT INTO `tipo` VALUES ('245', 'PROYECTO DE R.J');
INSERT INTO `tipo` VALUES ('246', 'PROYECTO DE R.M');
INSERT INTO `tipo` VALUES ('247', 'PROYECTO DE RESOLUCION SECRETA');
INSERT INTO `tipo` VALUES ('248', 'PROYECTO DE RESOLUCION VICEMIN');
INSERT INTO `tipo` VALUES ('249', 'PROYECTO R.S');
INSERT INTO `tipo` VALUES ('250', 'PROYECTO RESOLUCION JEFATURAL');
INSERT INTO `tipo` VALUES ('251', 'PROYECTOS DE CONFORMIDAD');
INSERT INTO `tipo` VALUES ('252', 'QUEJA');
INSERT INTO `tipo` VALUES ('253', 'QUEJAS');
INSERT INTO `tipo` VALUES ('254', 'RECIBO');
INSERT INTO `tipo` VALUES ('255', 'RECIBO DE DEVOLUCIONES');
INSERT INTO `tipo` VALUES ('256', 'RECIBO DE INDEPENDIENTES');
INSERT INTO `tipo` VALUES ('257', 'RECIBO DE INGRESO DE CAJA');
INSERT INTO `tipo` VALUES ('258', 'RECIBO DE INGRESOS');
INSERT INTO `tipo` VALUES ('259', 'RECIBO POR HONORARIOS');
INSERT INTO `tipo` VALUES ('260', 'RECLAMO');
INSERT INTO `tipo` VALUES ('261', 'RECURSO');
INSERT INTO `tipo` VALUES ('262', 'RECURSO DE QUEJA');
INSERT INTO `tipo` VALUES ('263', 'RECURSO DE RECONSIDERACION');
INSERT INTO `tipo` VALUES ('264', 'RECURSO DE REVISION');
INSERT INTO `tipo` VALUES ('265', 'REEMBOLSO');
INSERT INTO `tipo` VALUES ('266', 'REGISTRO DE COMPRAS');
INSERT INTO `tipo` VALUES ('267', 'REGISTRO DE INDEPENDIENTES');
INSERT INTO `tipo` VALUES ('268', 'REGISTRO DE PROVEEDORES');
INSERT INTO `tipo` VALUES ('269', 'RENDICIÓN');
INSERT INTO `tipo` VALUES ('270', 'RENDICION DE CUENTA');
INSERT INTO `tipo` VALUES ('271', 'RENDICION DE ENCARGOS');
INSERT INTO `tipo` VALUES ('272', 'RENDICION DE VIATICO');
INSERT INTO `tipo` VALUES ('273', 'REPORTE');
INSERT INTO `tipo` VALUES ('274', 'REPORTE DE CAPACITACION');
INSERT INTO `tipo` VALUES ('275', 'REPORTE ESTADISTICO');
INSERT INTO `tipo` VALUES ('276', 'REPORTE HIDROMETEREOLOGICO');
INSERT INTO `tipo` VALUES ('277', 'REQUERIMIENTO');
INSERT INTO `tipo` VALUES ('278', 'RES. DE QUEJA');
INSERT INTO `tipo` VALUES ('279', 'RES. EJECUT. REGIONAL');
INSERT INTO `tipo` VALUES ('280', 'RESOL. DE SECRETARIA GRAL');
INSERT INTO `tipo` VALUES ('281', 'RESOL. DIRECTORAL EJECUTIVA');
INSERT INTO `tipo` VALUES ('282', 'RESOLUCION');
INSERT INTO `tipo` VALUES ('283', 'RESOLUCION ADMIN. INIA-OA/URH');
INSERT INTO `tipo` VALUES ('284', 'RESOLUCIÓN ADMINISTRATIVA');
INSERT INTO `tipo` VALUES ('285', 'RESOLUCION COACTIVA');
INSERT INTO `tipo` VALUES ('286', 'RESOLUCION CONSEJO DIRECTIVO');
INSERT INTO `tipo` VALUES ('287', 'RESOLUCIÓN DE DIRECCIÓN GRAL');
INSERT INTO `tipo` VALUES ('288', 'RESOLUCION DE INTENDENCIA');
INSERT INTO `tipo` VALUES ('289', 'RESOLUCION DE MEDIDA CAUTELAR');
INSERT INTO `tipo` VALUES ('290', 'RESOLUCION DE MULTA');
INSERT INTO `tipo` VALUES ('291', 'RESOLUCION DIR. REG. SECTORIAL');
INSERT INTO `tipo` VALUES ('292', 'RESOLUCION DIRECCION REGIONAL');
INSERT INTO `tipo` VALUES ('293', 'RESOLUCION DIRECTORAL');
INSERT INTO `tipo` VALUES ('294', 'RESOLUCION DIRECTORAL DGEFFS');
INSERT INTO `tipo` VALUES ('295', 'RESOLUCION DIRECTORAL DGIA');
INSERT INTO `tipo` VALUES ('296', 'RESOLUCION DIRECTORAL EJEC');
INSERT INTO `tipo` VALUES ('297', 'RESOLUCION DIRECTORAL INIA-DEA');
INSERT INTO `tipo` VALUES ('298', 'RESOLUCION DIRECTORAL INIA-OA');
INSERT INTO `tipo` VALUES ('299', 'RESOLUCION DIRECTORAL OGA');
INSERT INTO `tipo` VALUES ('300', 'RESOLUCION DIRECTORAL OGA-OAP');
INSERT INTO `tipo` VALUES ('301', 'RESOLUCION DIRECTORAL OGGRH');
INSERT INTO `tipo` VALUES ('302', 'RESOLUCION DIRECTORAL PEPP');
INSERT INTO `tipo` VALUES ('303', 'RESOLUCION DIRECTORAL REGIONAL');
INSERT INTO `tipo` VALUES ('304', 'RESOLUCION DIRECTORAL-INIA-DDT');
INSERT INTO `tipo` VALUES ('305', 'RESOLUCION DIRECTORAL-INIA-DRG');
INSERT INTO `tipo` VALUES ('306', 'RESOLUCIÓN DIRECTORAL-OGPA');
INSERT INTO `tipo` VALUES ('307', 'RESOLUCION EJECUTIVA REGIONAL');
INSERT INTO `tipo` VALUES ('308', 'RESOLUCION GERENCIAL');
INSERT INTO `tipo` VALUES ('309', 'RESOLUCION JEFATURAL');
INSERT INTO `tipo` VALUES ('310', 'RESOLUCION JEFATURAL ADMIN');
INSERT INTO `tipo` VALUES ('311', 'RESOLUCIÓN MINISTERIAL');
INSERT INTO `tipo` VALUES ('312', 'RESOLUCION MINISTERIAL OGA');
INSERT INTO `tipo` VALUES ('313', 'RESOLUCION SECRETARIAL');
INSERT INTO `tipo` VALUES ('314', 'RESOLUCION SUBDIRECTORAL -UGRH');
INSERT INTO `tipo` VALUES ('315', 'RESOLUCION SUPREMA');
INSERT INTO `tipo` VALUES ('316', 'RESOLUCION VICEMINISTERIAL');
INSERT INTO `tipo` VALUES ('317', 'SEGUIMIENTO DE MEDIDAS CORRECT');
INSERT INTO `tipo` VALUES ('318', 'SOBRE CERRADO');
INSERT INTO `tipo` VALUES ('319', 'SOBRE CERRADO CONFIDENCIAL');
INSERT INTO `tipo` VALUES ('320', 'SOLICITUD');
INSERT INTO `tipo` VALUES ('321', 'SOLICITUD ');
INSERT INTO `tipo` VALUES ('322', 'SOLICITUD DE ANTICIPO');
INSERT INTO `tipo` VALUES ('323', 'SOLICITUD DE BIENES');
INSERT INTO `tipo` VALUES ('324', 'SOLICITUD DE COMPRA');
INSERT INTO `tipo` VALUES ('325', 'SOLICITUD DE COTIZACION');
INSERT INTO `tipo` VALUES ('326', 'SOLICITUD DE INFORMACION');
INSERT INTO `tipo` VALUES ('327', 'SOLICITUD DE REEMBOLSO');
INSERT INTO `tipo` VALUES ('328', 'SOLICITUD DE SERVICIO');
INSERT INTO `tipo` VALUES ('329', 'TRAFICO INTERNO');

-- ----------------------------
-- Table structure for `usuarios`
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paterno` varchar(45) DEFAULT NULL,
  `materno` varchar(45) DEFAULT NULL,
  `nombres` varchar(45) DEFAULT NULL,
  `oficina` varchar(12) NOT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `pass` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES ('1', 'LOZA', 'TORRES', 'ALFREDO', '', '1', '1');
