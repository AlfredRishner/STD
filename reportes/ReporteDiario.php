<?php
date_default_timezone_set('America/Lima');
include_once('class/tcpdf/tcpdf.php');
include_once('class/PHPJasperXML.inc.php');
setlocale(LC_ALL,"es_ES");
include_once ('setting.php');
$fecha = date('Y-m-d',  strtotime($_REQUEST['id']));
$xml =  simplexml_load_file("repJasper/ReporteDiario.jrxml");



$PHPJasperXML = new PHPJasperXML();
//$PHPJasperXML->debugsql=true;
$PHPJasperXML->arrayParameter=array("parameter1"=>$fecha);
$PHPJasperXML->xml_dismantle($xml);

$PHPJasperXML->transferDBtoArray($server,$user,$pass,$db);
$PHPJasperXML->outpage("I");    //page output method I:standard output  D:Download file


?>
