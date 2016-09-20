<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<title>2010-05-28 17:57:23</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<style type='text/css'>
		body {
			background-color:#5C7185!important;
			font-family: tahoma,arial,helvetica,sans-serif;
			font-size: 14px;
			line-height:normal;
			font-family:tahoma,arial,helvetica,sans-serif;
			}
		#master {
			margin: 0 auto;
			border:1px solid black;
			border-collapsed:collapsed;
			width:680px;
			height:850px;
			border-color:#cccccc #bbbbbb #bbbbbb #cccccc;
			border-style:solid;
			border-width:1px 2px 2px 1px;
			margin: 15px auto 25px;
			background-color:#ffffff;
			padding:60px;

		}
		.rotulo{
			font-size:13px;
			font-weight:bold;

		}
		.leyenda{
			font-size:14px;
			font-weight:bold;
			color:#0033FF;
		}
		.etiqueta {
			font-family:tahoma,arial,helvetica,sans-serif;
			font-size:10px;
			font-weight:normal;
			background:#ffc;
			color:#aaa;
			padding:2px;
			border-top:1px solid #999;
		}

		#cab {
			height:50pt;
			text-align:left;
			width:100%;
			font-size:14px;
			text-align:center;
			font-family:arial, sans;
		}
		.item {
			width:100%;
			padding: 2px 0;
			text-align:left;
		}
		.detalle {
			width:100%;
			padding: 2px 0;
			text-align:left;
		}
		#fecha {
			text-align:center;
			font-weight:normal;
		}
		#constancia {
			border-top: 1px solid #666666;
			border-bottom: 1px solid #666666;
			font-weight:normal;
			text-align:justify;
			padding:10px;
			padding-right:150px;
			margin-top:10px;
		}
		#constancia p {
			margin: 4px;
		}
		#observaciones {
			font-size: 12pt;
			font-weight:bold;
			text-align:center;
		}
		#pie {
			border: 1px solid #666666;
			font-size: 8pt;
			font-weight:bold;
		}
    </style>


	<style media="print" type="text/css">
		@page {
			margin:0 1%;
		}
		body {
			background:none;
		}
		#master {
			margin: 0;
			border:none;
			padding:0 6px;
			width:686px;
		}
		#mensaje {
			display:none;
		}

	</style></head>

    <body >

    <table id="master">
	    <tr>
	        <td valign="top">
			<table id = "cab">
				<tr>
				  <td height="178">

					  <span class="rotulo"><img src="images/minag.JPG" width="588" height="67" /></span>
					  <p><span class="rotulo">DIRECCIÓN DE DESARROLLO AGRÍCOLA  Y   MEDIO AMBIENTE</span></p>
					  <p>
					    CENTRO DE RESCATE DEL SURI, RHEA PENNATA<br />
					    MODULO HUMAJALSO TUPALA<br />
					    FICHA DE NACIMIENTO   <?php echo date("Y");?></p>

				   				</td>
				</tr>
			</table>

			<table width="100%" height="527" class="detalle" >
				<tr>
					<td>
						<table align="center">
							<tr>
								<td valign="top" style="text-align:justify">
								    <fieldset>
								    <legend><span class="leyenda" >Reporte Datos Biométricos</span></legend>

                                    <table width="654" border="0">
									  <tr>
										<td width="139"><div align="left"><span class="rotulo" >Fecha</span></div></td>
										<td width="112"><div align="left"><span class="rotulo">Peso</span></div></td>
										<td width="107"><div align="left"><span class="rotulo">Lomo</span></div></td>
										<td width="171"><div align="left"><span class="rotulo">Tarso</span></div></td>
										<td width="103"><div align="left"><span class="rotulo">Pico</span></div></td>
										</tr>
						<?php

                        $result=mysql_query("select b.*
											  from historial h,biometria b
											  where h.idhistorial='$valor_suri' and b.historial_idhistorial=h.idhistorial");
	  
                        //$sql="select * from su_suri WHERE idSuri ='$id'";
                        //$rs=mysql_query($result);

                        while($campo=mysql_fetch_array($result))
                        {
?>
  <tr>

    <td><?php echo $campo["fecha"];?></td>
    <td width="112"><?php echo $campo["peso"];?></td>
    <td width="107"><?php echo $campo["lomo"];?></td>
    <td width="171"><?php echo $campo["tarso"];?></td>
    <td width="103"><?php echo $campo["pico"];?></td>
  </tr>
  <?php
  }
  ?>
</table>

								    </fieldset>

								    <p class="rotulo">Observaciones:............................................................................................................................................</p>
								    <p class="rotulo">......................................................................................................................................................................</p>
								    <p id="fecha" style="text-align:right">
										<strong>Modulo de rescate Tupala, PELT <?php  echo date("d/m/Y"); ?></strong>
									</p>
									 <br />
									<br />
									<br />
									<br />

									<p style="text-align:center">_________________________<br /><?php echo $usuario; ?> <br />
									12345678</p>
									<br />
									<table>
										<tr>
										  <td  valign="top" style = "font-weight:bold"><p>C.c.</p></td>
											<td ><p>/Archivo.</p>
										  </td>
										</tr>
									</table>
							  </td>
							</tr>
						</table>
					</td>
				</tr>
			</table>

	        </td>
	    </tr>
	</table>
	 	<?php
	//	}
	?>

	</body>



</html>
