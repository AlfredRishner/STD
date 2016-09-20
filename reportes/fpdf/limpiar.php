<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
include "conexion.php";

$sql="TRUNCATE TABLE `carnet`";
$rs=mysql_query($sql);
  if($rs)        {
       echo "Puedes Contiuar....2";
}
else{
    echo "Error:...(BD)!";
}
?>
