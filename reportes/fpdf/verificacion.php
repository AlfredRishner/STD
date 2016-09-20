
<?php
include "conexion.php";						
		

				$sql="select idcarnet,codigo ,paterno,	materno,	nombres,foto from carnet";
				$rs=mysql_query($sql);
				while($campo=mysql_fetch_array($rs))
				{				
?>		
<table width="500" border="0" cellspacing="1">
  <tr>
  	
  <td><?php echo $campo["codigo"]; ?></td>
    <td><?php echo $campo["paterno"]; ?></td>
    <td><?php echo $campo["materno"]; ?></td>
    <td><?php echo $campo["nombres"]; ?></td>
    <td><img src="fotos/<?php echo $campo["foto"];?>" width="82"   /></td>
</tr>
</table>
				
				
<?php
				}
				//fin de  carne 01 
?>		
  	