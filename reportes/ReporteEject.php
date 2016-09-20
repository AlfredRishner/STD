<?php

include_once('class/tcpdf/tcpdf.php');
include_once("class/PHPJasperXML.inc.php");
include_once ('setting.php');
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);




$PHPJasperXML = new PHPJasperXML();
//$PHPJasperXML->debugsql=true;
//'mes=Enero&nombremeta='+json.registros[0].nombre+'&idmeta='+json.registros[0].idmeta+'&meta='+json.registros[0].codigo+'&idmes=1'
//
$PHPJasperXML->arrayParameter = array(
"mes" => $_REQUEST['mes'],
 "nombremeta" => $_REQUEST['nombremeta'],
"idmeta" => $_REQUEST['idmeta'],
 "meta" => $_REQUEST['meta'],
 "idmes" => $_REQUEST['idmes']

);
$PHPJasperXML->load_xml_file("reporteFinal.jrxml");

$PHPJasperXML->transferDBtoArray($server, $user, $pass, $db); //* use this line if you want to connect with mysql
//if you want to use universal odbc connection, please create a dsn connection in odbc first
//$PHPJasperXML->transferDBtoArray($server,"odbcuser","odbcpass","phpjasperxml","odbc"); //odbc = connect to odbc
//$PHPJasperXML->transferDBtoArray($server,"psqluser","psqlpass","phpjasperxml","psql"); //odbc = connect to potgresql
$PHPJasperXML->outpage("I");    //page output method I:standard output  D:Download file
?>