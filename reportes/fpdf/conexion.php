<?php

// Intentamos conectar al servidor.

include("configuracion.php");
$conexion = mysql_connect($Servidor,$Usuario,$Password);
if (!$conexion)
{
	echo "<span class=azul><center>No se pudo conectar a la base de datos.</center><br></span>";
	exit();
}

// Intentamos seleccionar la base de datos.

$resultado=mysql_select_db($BaseDeDatos ,$conexion);

if (!$resultado)
{
	echo "<span class=azul><center>No se pudo seleccionar la base de datos.</center><br></span>";
	exit();
}
?>