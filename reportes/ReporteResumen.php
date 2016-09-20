<?php

include_once('class/tcpdf/tcpdf.php');
include_once("class/PHPJasperXML.inc.php");
include_once ('setting.php');
//error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
$PHPJasperXML = new PHPJasperXML();
//$PHPJasperXML->debugsql=true;
function mes($mes) {
    switch ($mes) {
        case 1: return 'DE ENERO';
            break;
        case 2: return 'DE FEBRERO';
            break;
        case 3: return 'DE MARZO';
            break;
        case 4: return 'DE ABRIL';
            break;
        case 5: return 'DE MAYO';
            break;
        case 6: return 'DE JUNIO';
            break;
        case 7: return 'DE JULIO';
            break;
        case 8: return 'DE AGOSTO';
            break;
        case 9: return 'DE SETIEMBRE';
            break;
        case 10: return 'DE OCTUBRE';
            break;
        case 11: return 'DE NOVIEMBRE';
            break;
        case 12: return 'DE DICIEMBRE';
            break;

        default : return '0';
    }
}

$PHPJasperXML->arrayParameter = array(
    "mes" => $_REQUEST['idmes'],
    "nombremes" => mes($_REQUEST['idmes']),
     "idmeta" => $_REQUEST['idmeta'],
    "nombre" => $_REQUEST['nombre'],
    "codigo" => $_REQUEST['codigo']);
$PHPJasperXML->load_xml_file("ReporteResumen.jrxml");
$PHPJasperXML->transferDBtoArray($server, $user, $pass, $db); //* use this line if you want to connect with mysql
//if you want to use universal odbc connection, please create a dsn connection in odbc first
//$PHPJasperXML->transferDBtoArray($server,"odbcuser","odbcpass","phpjasperxml","odbc"); //odbc = connect to odbc
//$PHPJasperXML->transferDBtoArray($server,"psqluser","psqlpass","phpjasperxml","psql"); //odbc = connect to potgresql
$PHPJasperXML->outpage("I");    //page output method I:standard output  D:Download file
?>