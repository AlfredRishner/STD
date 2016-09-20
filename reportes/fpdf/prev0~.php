<?php
include('formas.php');
require('fpdf.php');
define('FPDF_FONTPATH','font/');
class PDF extends FPDF
{
//Cabecera de página
var $colonnes;
var $format;
var $angle=0;
function Header()
{
    //Logo1
   // 	 $this->Image('fotos/0001.JPG',23,35,20);//('../fotos/051210.JPG',X,Y,22);
   // $this->Image('../fotos/051209.jpg',10,145,22);
   // $this->Image('logo2.jpg',20,20,80);
	
}
function Code39($xpos, $ypos, $code, $baseline=0.5, $height=5){

	$wide = $baseline;
	$narrow = $baseline / 3 ; 
	$gap = $narrow;

	$barChar['0'] = 'nnnwwnwnn';
	$barChar['1'] = 'wnnwnnnnw';
	$barChar['2'] = 'nnwwnnnnw';
	$barChar['3'] = 'wnwwnnnnn';
	$barChar['4'] = 'nnnwwnnnw';
	$barChar['5'] = 'wnnwwnnnn';
	$barChar['6'] = 'nnwwwnnnn';
	$barChar['7'] = 'nnnwnnwnw';
	$barChar['8'] = 'wnnwnnwnn';
	$barChar['9'] = 'nnwwnnwnn';
	$barChar['A'] = 'wnnnnwnnw';
	$barChar['B'] = 'nnwnnwnnw';
	$barChar['C'] = 'wnwnnwnnn';
	$barChar['D'] = 'nnnnwwnnw';
	$barChar['E'] = 'wnnnwwnnn';
	$barChar['F'] = 'nnwnwwnnn';
	$barChar['G'] = 'nnnnnwwnw';
	$barChar['H'] = 'wnnnnwwnn';
	$barChar['I'] = 'nnwnnwwnn';
	$barChar['J'] = 'nnnnwwwnn';
	$barChar['K'] = 'wnnnnnnww';
	$barChar['L'] = 'nnwnnnnww';
	$barChar['M'] = 'wnwnnnnwn';
	$barChar['N'] = 'nnnnwnnww';
	$barChar['O'] = 'wnnnwnnwn'; 
	$barChar['P'] = 'nnwnwnnwn';
	$barChar['Q'] = 'nnnnnnwww';
	$barChar['R'] = 'wnnnnnwwn';
	$barChar['S'] = 'nnwnnnwwn';
	$barChar['T'] = 'nnnnwnwwn';
	$barChar['U'] = 'wwnnnnnnw';
	$barChar['V'] = 'nwwnnnnnw';
	$barChar['W'] = 'wwwnnnnnn';
	$barChar['X'] = 'nwnnwnnnw';
	$barChar['Y'] = 'wwnnwnnnn';
	$barChar['Z'] = 'nwwnwnnnn';
	$barChar['-'] = 'nwnnnnwnw';
	$barChar['.'] = 'wwnnnnwnn';
	$barChar[' '] = 'nwwnnnwnn';
	$barChar['*'] = 'nwnnwnwnn';
	$barChar['$'] = 'nwnwnwnnn';
	$barChar['/'] = 'nwnwnnnwn';
	$barChar['+'] = 'nwnnnwnwn';
	$barChar['%'] = 'nnnwnwnwn';

	$this->SetFont('Arial','',10);
	//$this->Text($xpos, $ypos + $height + 4, $code);
	$this->SetFillColor(0);

	$code = '*'.strtoupper($code).'*';
	for($i=0; $i<strlen($code); $i++){
		$char = $code{$i};
		if(!isset($barChar[$char])){
			$this->Error('Invalid character in barcode: '.$char);
		}
		$seq = $barChar[$char];
		for($bar=0; $bar<9; $bar++){
			if($seq{$bar} == 'n'){
				$lineWidth = $narrow;
			}else{
				$lineWidth = $wide;
			}
			if($bar % 2 == 0){
				$this->Rect($xpos, $ypos, $lineWidth, $height, 'F');
			}
			$xpos += $lineWidth;
		}
		$xpos += $gap;
	}
}

//Pie de página
function Footer()
{
    //Posición: a 1,5 cm del final
    $this->SetY(-15);
    //Arial italic 8
    $this->SetFont('Arial','I',8);
    //Número de página
    $this->Cell(0,10,'Página '.$this->PageNo().'/{nb}',0,0,'C');
}
}
//Creación del objeto de la clase heredada
$pdf=new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Arial','B',15);
include "conexion.php";
$numero=1;
$desde=$_REQUEST['desde'];
$hasta=$_REQUEST['hasta'];		
for($conta=$desde;$conta<$hasta;$conta++)
{	    $espacio=0;
		for($cont=0;$cont<5;$cont++)
		{
				$sql="select idcarnet,codigo ,paterno,	materno,	nombres,foto from carnet WHERE `idcarnet` ='$numero'";
				$rs=mysql_query($sql);
				while($campo=mysql_fetch_array($rs))
				{				
				$pdf->Image('logo2.jpg',20,20+$espacio,80);
				$pdf->Image('fotos/'.$campo["foto"].'',23,36+$espacio,25,33);
				//carne 01 
				$pdf->Rect(20,20+$espacio,80,50,'D');//cuadrado de impresion
				//$pdf->Rect(21,36,32,24,'D');//cuadrado de impresion
				$pdf->SetFont('Times','',12);
				//$pdf->Text(35,25,'.:Academia PreUniversitaria:.');
				//$pdf->SetFont('Times','',14);
				//$pdf->Text(45,30,'SERUNA');
				$pdf->SetFont('Times','',10);
				//$pdf->Text(54,36,'Carné de Estudiante');
				$pdf->Text(54,40+$espacio,'Código:');
				$pdf->Text(54,44+$espacio,'Apellidos:');
				$pdf->Text(54,56+$espacio,'Nombres:');
				$pdf->SetFont('Times','b',12);
				$pdf->Text(70,40+$espacio,$campo["codigo"]);
				$pdf->Text(54,48+$espacio,$campo["paterno"]);
				$pdf->Text(54,52+$espacio,$campo["materno"]);
				$pdf->Text(54,60+$espacio,$campo["nombres"]);
				$pdf->SetFont('Times','',5);
				$pdf->Text(50,69+$espacio,'');
				 $cod=$campo["codigo"];
				$pdf->Code39(50,61+$espacio,$cod,1,8);
				//fin de  carne 01 
				
				}
				$sql2="select idcarnet,codigo ,paterno,	materno,	nombres,foto from carnet WHERE `idcarnet` ='$numero'+1";
				$rs2=mysql_query($sql2);
				while($campo2=mysql_fetch_array($rs2))
				{	
				$pdf->Image('logo2.jpg',20+97,20+$espacio,80);
				$pdf->Image('fotos/'.$campo2["foto"].'',120,36+$espacio,25,33);
				//carne 02 
				$pdf->Rect(20+97,20+$espacio,80,50,'D');//cuadrado de impresion
				//$pdf->Rect(21,36,32,24,'D');//cuadrado de impresion
				$pdf->SetFont('Times','',12);
				//$pdf->Text(35,25,'.:Academia PreUniversitaria:.');
				//$pdf->SetFont('Times','',14);
				//$pdf->Text(45,30,'SERUNA');
				$pdf->SetFont('Times','',10);
				//$pdf->Text(54,36,'Carné de Estudiante');
				$pdf->Text(54+97,40+$espacio,'Código:');
				$pdf->Text(54+97,44+$espacio,'Apellidos:');
				$pdf->Text(54+97,56+$espacio,'Nombres:');
				$pdf->SetFont('Times','B',12);
				$pdf->Text(70+97,40+$espacio,$campo2["codigo"]);
				$pdf->Text(54+97,48+$espacio,$campo2["paterno"]);
				$pdf->Text(54+97,52+$espacio,$campo2["materno"]);
				$pdf->Text(54+97,60+$espacio,$campo2["nombres"]);
				$pdf->SetFont('Times','',5);
				$pdf->Text(50+97,69+$espacio,'');
				$cod2=$campo2["codigo"];
				$pdf->Code39(50+97,61+$espacio,$cod2,1,8);
				//fin de  carne 02 
			
				$espacio=$espacio+51;
				$numero=$numero+2;
			}
		}

$pdf->AddPage();
}


$pdf->SetFont('Arial','B',20);
$pdf->Cell(0,6,$nombre,0,1);

//$pdf->Rect($xpos, $ypos, $lineWidth, $height, 'F');
/*$pdf->Cell(0,10,'FICHA SOCIO - ECONOMICA 2008',0,1,'C');
$pdf->SetFont('Arial','B',22);
$pdf->Cell(0,10,'CONSTANCIA',0,1,'C');
$pdf->Cell(0,2,'',0,1,'C');
*/
//$pdf->Code39(20,20,'10002',1,5);
//$pdf->addReglement("Chèque à réception de facture");
//$pdf->Output();

//////////////////////////////////////
//	aqui decidimos si le damos o no la constancia jejej
//////////////////////////////////////

	
/*
$var_est = $_GET['sogimaimnossusejyracsoorrapahccilotiuguh'];
//$var_est = 17127;
include "../supervisa2.php";
$estado_estu=supervisa($var_est);
if($estado_estu=='OK')
{

include "../conecta.php";
$sql="select id_carrera,cod_img from ingresante where id_estudiante='$var_est'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
	$co_carre = $campo["id_carrera"];
	$imagen = $campo["cod_img"];
//	$pdf->Cell(0,10,'foto'.$campo["cod_img"],0,1,'C');
}
mysql_close();
$pdf->Image('fotos/'. $imagen,175,145,22);

include "../conecta.php";
$sql="select mod_ing from academico where id_estudiante='$var_est'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
//	$co_carre = $campo["id_carrera"];

	$moda_ing = $campo["mod_ing"];
}
mysql_close();

//vemos la facu manes
include "../conecta.php";
$sql="select cod_fac from carrera_cca where id_carrera='$co_carre'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
	$facu_cod = $campo["cod_fac"];
}

mysql_close();
include "../conecta.php";
$sql="select upper(fac_des) fac_des from facultad where cod_fac='$facu_cod'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
//	$facu_nom = $campo["fac_des"];
	$pdf->SetFont('Arial','B',10);
	$pdf->Cell(0,6,'FACULTAD: '.$campo["fac_des"],1,1);
}

mysql_close();
include "../conecta.php";
$sql="select upper(car_nom) nombre_escu, ('nombre facu') nombre_facu from carrera_cca where id_carrera='$co_carre'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
	$pdf->SetFont('Arial','B',10);
//	$pdf->Cell(0,6,'FACULTAD: '.$facu_nom,1,1);
	$pdf->Cell(0,6,'ESCUELA PROFESIONAL: '.$campo[nombre_escu],1,1);
}
mysql_close();
//parte 1

include "../conecta.php";
$sql="select upper(ing_des) desc_moda from moding where mod_ing='$moda_ing'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
	$pdf->Cell(0,6,'MODALIDAD DE INGRESO: '.$campo[desc_moda],1,1);
}
mysql_close();
//hasta aqui modalidad de ingreso con ultima tabla

include "../conecta.php";
$sql="select paterno, (' ')a, materno, nombres from ingresante where id_estudiante='$var_est'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
	$pdf->Cell(0,6,'NOMBRES: '.$campo[paterno] .$campo[a] .$campo[materno] .$campo[a] .$campo[nombres],1,1);
}
mysql_close();
//hasta aqui vemos datos de nombres del estu tabla OTI

	$pdf->SetFont('Arial','',12);
    $pdf->Ln(2);
	$pdf->Cell(0,6,'Se hace constar que el presente alumno esta apto para su matricula');
	$pdf->SetFont('Arial','B',12);
	//para la parte de arriba jejeje
    $pdf->Text(175,135,'Usuario');
    $pdf->Text(175,285,'Cargo');

//	para la parte de arribba
	//ponemos grososr de la linea jejej
	$pdf->SetLineWidth(0.5);
	//ponemos linea jejej
	$pdf->Line(22,110,80,110);
	$pdf->Line(105,110,155,110);

    $pdf->Text(120,115,'Estudiante');
    $pdf->Text(25,115,'Unidad de Servicio Social');

//desde aqiu para mostara la fecha manes loles

include "../conecta.php";
$rs = mysql_query("SELECT (' ')vacio, (' de ')de, (' del ')del, (dayofweek(curdate())) aa, (date_format(curdate(),'%D')) bb, (date_format(curdate(),'%c')) cc, (date_format(curdate(),'%Y')) dd", $link);
while($campo=mysql_fetch_array($rs))
{
											if($campo[aa]=='1')
												$dias='Domingo';
											if($campo[aa]=='2')
												$dias='Lunes';
											if($campo[aa]=='3')
												$dias='Martes';
											if($campo[aa]=='4')
												$dias='Miercoles';
											if($campo[aa]=='5')
												$dias='Jueves';
											if($campo[aa]=='6')
												$dias='Viernes';
											if($campo[aa]=='7')
												$dias='Sabado';
										
								//desde aqui vemos los mese del año
											if($campo[cc]=='1')
												$meses='Enero';
											if($campo[cc]=='2')
												$meses='Febrero';
											if($campo[cc]=='3')
												$meses='Marzo';
											if($campo[cc]=='4')
												$meses='Abril';
											if($campo[cc]=='5')
												$meses='Mayo';
											if($campo[cc]=='6')
												$meses='Junio';
											if($campo[cc]=='7')
												$meses='Julio';
											if($campo[cc]=='8')
												$meses='Agosto';
											if($campo[cc]=='9')
												$meses='Septiembre';
											if($campo[cc]=='10')
												$meses='Octubre';
											if($campo[cc]=='11')
												$meses='Noviembre';
											if($campo[cc]=='12')
												$meses='Diciembre';
//			echo "$dias $fila1[1] de $meses del $fila1[3]";
	$pdf->Text(65,130,'' .$dias .$campo[vacio] .$campo[bb] .$campo[de] .$meses .$campo[del] .$campo[dd]);
	$pdf->Text(65,280,'' .$dias .$campo[vacio] .$campo[bb] .$campo[de] .$meses .$campo[del] .$campo[dd]);
}
mysql_close();
//    $pdf->Text(25,115, .campo[sysdate]);
//hasta aqiu tenemos la respuesta en tiempo ral del servidor aunque uinsted no lo cre jejejje

//	para la parte de abajo
	//ponemos linea jejej
	$pdf->SetLineWidth(0.5);
	$pdf->Line(22,260,80,260);
	$pdf->Line(105,260,155,260);

    $pdf->Text(120,265,'Estudiante');
    $pdf->Text(25,265,'Unidad de Servicio Social');
	
//vemos ela insercion del codigo de constancia
//		(X , Y)
    $pdf->Text(15,285,'N°: '.$var_est);
    $pdf->Text(15,135,'N°: '.$var_est);	

//hasta aqui manes


//aqji sera la linea manes jeje
//	$pdf->SetLineWidth(15);

//desde aqiu para alla
    $pdf->Ln(64);
	$pdf->SetFont('Arial','B',18);
    //Movernos a la derecha
    $pdf->Cell(80);
    //Título1
    $pdf->Cell(30,10,'Universidad Nacional del Altiplano',0,0,'C');
    $pdf->Ln(13);
    //Arial bold 12
    $pdf->SetFont('Arial','B',15);
    //Título2
    $pdf->Cell(0,0,'Vicerrectorado Académico',0,0,'C');
    $pdf->Ln(7);
    //Arial bold 10
    $pdf->SetFont('Arial','B',11);
    //Título3
    $pdf->Cell(0,0,'Oficina de Tecnologia Informática',0,0,'C');
    //Salto de línea
    $pdf->Ln(3);
	//ponemos grososr de la linea jejej
	$pdf->SetLineWidth(0.8);
	//ponemos linea jejej
	$pdf->Line(10,173,200,173);
	//ponemos grososr de la linea jejej
	$pdf->SetLineWidth(0.5);
	//ponemos linea jejej
	$pdf->Line(10,174,200,174);
    $pdf->Ln(3);
//hasta aqiu noma man jejeje

$pdf->SetFont('Arial','B',15);
$pdf->Cell(0,10,'FICHA SOCIO - ECONOMICA 2008',0,1,'C');
$pdf->SetFont('Arial','B',22);
$pdf->Cell(0,10,'CONSTANCIA',0,1,'C');
$pdf->Cell(0,2,'',0,1,'C');

//--------------- desde aqui cambiamos los datos principales jejeje -----------------------------------------//
//aqui sacamos el id de estudiante y sacamos el cod_de escuela profewsional
include "../conecta.php";
$sql="select cod_fac from carrera_cca where id_carrera='$co_carre'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
	$facu_cod = $campo["cod_fac"];
}
mysql_close();
	$pdf->SetLineWidth(0.5);
include "../conecta.php";
$sql="select upper(fac_des) fac_des from facultad where cod_fac='$facu_cod'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
//	$facu_nom = $campo["fac_des"];
	$pdf->SetFont('Arial','B',10);
	$pdf->Cell(0,6,'FACULTAD: '.$campo["fac_des"],1,1);
}

mysql_close();
include "../conecta.php";
$sql="select upper(car_nom) nombre_escu, ('nombre facu') nombre_facu from carrera_cca where id_carrera='$co_carre'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
	$pdf->SetFont('Arial','B',10);
//	$pdf->Cell(0,6,'FACULTAD: '.$facu_nom,1,1);
	$pdf->Cell(0,6,'ESCUELA PROFESIONAL: '.$campo[nombre_escu],1,1);
}
mysql_close();
//parte 1

include "../conecta.php";
$sql="select upper(ing_des) desc_moda from moding where mod_ing='$moda_ing'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
	$pdf->Cell(0,6,'MODALIDAD DE INGRESO: '.$campo[desc_moda],1,1);
}
mysql_close();
//hasta aqui modalidad de ingreso con ultima tabla

include "../conecta.php";
$sql="select paterno, (' ')a, materno, nombres from ingresante where id_estudiante='$var_est'";
$rs=mysql_query($sql);
while($campo=mysql_fetch_array($rs))
{
	$pdf->Cell(0,6,'NOMBRES: '.$campo[paterno] .$campo[a] .$campo[materno] .$campo[a] .$campo[nombres],1,1);
}
mysql_close();
//hasta aqui vemos datos de nombres del estu tabla OTI
//------------------------hasta aqui nomas man jejeje----------------------------------------------------//
	$pdf->SetFont('Arial','',12);
    $pdf->Ln(2);
	$pdf->Cell(0,6,'Se hace constar que el presente alumno esta apto para su matricula');
	$pdf->SetFont('Arial','B',12);

//////////////////////////////////////////
//hasta aqui es la comprobacion jejeje
//////////////////////////////////////////
}
else
{
	$pdf->SetFont('Arial','',15);
    $pdf->Ln(2);
	$pdf->Cell(0,6,'Se hace constar que el presente alumno no esta apto  esta apto para su matricula');
    $pdf->Ln(12);
	$pdf->Cell(0,6,'pues no acabo de llenar su ficha socioeconomica 2008');
//	$pdf->SetFont('Arial','B',12);
}
*/
$pdf->Output();
?>
