<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
include "conexion.php";




$sql="select (idpreincripcion + 20100) as codigo ,paterno,	materno,	nombres ,carrera,CONCAT((idpreincripcion + 20100),'','.jpeg')  as foto, estado from preincripcion where estado=1";
$rs=mysql_query($sql);
  if($rs){
        while($campo=mysql_fetch_array($rs))
        {
           $sql_carnet="INSERT INTO academia.`carnet` VALUES ('','{$campo['codigo']}', '{$campo['paterno']}', '{$campo['materno']}', '{$campo['nombres']}', '{$campo['carrera']}', '{$campo['foto']}', '{$campo['estado']}')";
           $rs_carnet=mysql_query($sql_carnet);
        }
        echo "Continua con el Paso 3...";
}
else{
    echo "Error:...(BD)!";
}
?>
