<?php
include('formas.php');
require('fpdf.php');

$extras = $_REQUEST['dato'];
$tuVector = explode('|',$extras);
define('FPDF_FONTPATH','font/');
class PDF extends FPDF
{
//Cabecera de página
var $colonnes;
var $format;
var $angle=0;
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
			$this->Error('CARACTER NO VALIDO: '.$char);
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

//Pie de p�gina
function Footer()
{
    //Posici�n: a 1,5 cm del final
    $this->SetY(-15);
    //Arial italic 8
    $this->SetFont('Arial','I',8);
    //N�mero de p�gina
    $this->Cell(0,10,''.$this->PageNo().'/{nb}',0,0,'C');
}
	function RoundedRect($x, $y, $w, $h, $r, $style = '')
	{
		$k = $this->k;
		$hp = $this->h;
		if($style=='F')
			$op='f';
		elseif($style=='FD' || $style=='DF')
			$op='B';
		else
			$op='S';
		$MyArc = 4/3 * (sqrt(2) - 1);
		$this->_out(sprintf('%.2F %.2F m',($x+$r)*$k,($hp-$y)*$k ));
		$xc = $x+$w-$r ;
		$yc = $y+$r;
		$this->_out(sprintf('%.2F %.2F l', $xc*$k,($hp-$y)*$k ));

		$this->_Arc($xc + $r*$MyArc, $yc - $r, $xc + $r, $yc - $r*$MyArc, $xc + $r, $yc);
		$xc = $x+$w-$r ;
		$yc = $y+$h-$r;
		$this->_out(sprintf('%.2F %.2F l',($x+$w)*$k,($hp-$yc)*$k));
		$this->_Arc($xc + $r, $yc + $r*$MyArc, $xc + $r*$MyArc, $yc + $r, $xc, $yc + $r);
		$xc = $x+$r ;
		$yc = $y+$h-$r;
		$this->_out(sprintf('%.2F %.2F l',$xc*$k,($hp-($y+$h))*$k));
		$this->_Arc($xc - $r*$MyArc, $yc + $r, $xc - $r, $yc + $r*$MyArc, $xc - $r, $yc);
		$xc = $x+$r ;
		$yc = $y+$r;
		$this->_out(sprintf('%.2F %.2F l',($x)*$k,($hp-$yc)*$k ));
		$this->_Arc($xc - $r, $yc - $r*$MyArc, $xc - $r*$MyArc, $yc - $r, $xc, $yc - $r);
		$this->_out($op);
	}

	function _Arc($x1, $y1, $x2, $y2, $x3, $y3)
	{
		$h = $this->h;
		$this->_out(sprintf('%.2F %.2F %.2F %.2F %.2F %.2F c ', $x1*$this->k, ($h-$y1)*$this->k,
                $x2*$this->k, ($h-$y2)*$this->k, $x3*$this->k, ($h-$y3)*$this->k));
	}
}
//Creaci�n del objeto de la clase heredada
$pdf=new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Arial','B',15);

$pdf->SetLineWidth(0.1);
$pdf->SetFillColor(192);

include "../conexion.php";
 $num_rows = count($tuVector);

 if ($num_rows<5) {
    $aprox=$num_rows;
 }
 else {
    $aprox=round($num_rows/10);
 }

$numero=0;
for($conta=1;$conta<=$aprox;$conta++)
{	    $espacio=0;
		for($cont=0;$cont<5;$cont++)
		{
				$sql="select * from personal WHERE `id` ='$tuVector[$numero]'";
				$rs=mysql_query($sql);

				while($campo=mysql_fetch_array($rs))
				{
				$pdf->Image('FOTOCHECK.jpg',20,15+$espacio,82.3);
				//Image($file,$x,$y,$w=0,$h=0,$type='',$link='')
                                if($campo["foto"]=="")
                                    {

                                        $pdf->Image('../../fotografias/default.jpg',21,33.5-7+$espacio,23,27);
                                    }
                                 else
				$pdf->Image('../../fotografias/'.$campo["foto"].'',21,33.5-7+$espacio,23,27);

				//ECHO $campo["foto"];
				//$pdf->Image('fotos/'.$campo["foto"],21,35+$espacio,22,30.6);
				//$pdf->Image('fotos/'.$campo["foto"].'',118,35+$espacio,22,30.6);
                               // $pdf->Rect(21,35+$espacio,22,30.6,'S');
				//carne 01
				$pdf->SetLineWidth(0);
				$pdf->Rect(20,15+$espacio,82.3,50.5,'D');//cuadrado de impresion
				$pdf->SetLineWidth(0.1);
                                $pdf->Rect(21,33.5-7+$espacio,23,27,'S');
                                $pdf->SetTextColor(221,102,23);
				$pdf->SetFont('Times','b',10);
                                $pdf->SetTextColor(0,0,0);
				$pdf->Text(47,37-1.5+$espacio,utf8_decode($campo["paterno"]." ".$campo["materno"]));
				//$pdf->Text(46,47+$espacio,$campo["materno"]);
				$pdf->Text(47,45-1+$espacio,utf8_decode($campo["nombres"]));
				$pdf->SetFont('Times','b',8);

                                $pdf->Text(47,53-1.5+$espacio,$campo["cargo"]);
				$pdf->SetFont('Times','b',10);
                               // $pdf->Text(25,64-1.5+$espacio,$campo["dni"]);
                                $pdf->SetTextColor(0,0,0);

				$pdf->SetFont('Times','',5);
				$pdf->Text(50,64+$espacio,'');

				$cod=$campo["dni"];

				$pdf->Code39(50-28,61.9-5-1.7+$espacio,$cod,1.1,9);
				//fin de  carne 01

				}
                                $numero++;
                                //id	paterno	materno	nombres	cargo	dni	foto	fecha	estado
				$sql2="select * from personal WHERE `id` ='$tuVector[$numero]'";
				$rs2=mysql_query($sql2);

				while($campo2=mysql_fetch_array($rs2))
				{

				$pdf->Image('FOTOCHECK.jpg',20+97,15+$espacio,82.3);
                                if($campo2["foto"]=="")
                                    {

                                        $pdf->Image('../../fotografias/default.jpg',21,33.5-7+$espacio,23,27);
                                    }
                                 else
				$pdf->Image('../../fotografias/'.$campo2["foto"].'',21+97,33.5-7+$espacio,23,27);
                               // $pdf->Rect(21,35+$espacio,22,30.6,'S');
				//carne 01
				//$pdf->Image('fotos/'.$campo2["foto"].'',118,35+$espacio,22,30.6);
				 //carne 02
                 //$pdf->RoundedRect(20+97, 20+$espacio, 80.7, 50.5, 3.5);
				$pdf->SetLineWidth(0);
				$pdf->Rect(20+97,15+$espacio,82.3,50.5,'D');//cuadrado de impresion
				$pdf->SetLineWidth(0.1);
                $pdf->Rect(21+97,33.5-7+$espacio,23,27,'S');
				//$pdf->Rect(21,36,32,24,'D');//cuadrado de impresion

                $pdf->SetTextColor(221,102,23);

				$pdf->SetFont('Times','B',10);
                 $pdf->SetTextColor(0,0,0);
				//$pdf->Text(47,42+$espacio,$campo["paterno"]." ".$campo["materno"]);

				$pdf->Text(46+97,37-1.5+$espacio,utf8_decode($campo2["paterno"]." ".$campo2["materno"]));
				//$pdf->Text(46+97,47+$espacio,$campo2["materno"]);
				$pdf->Text(46+97,45-1+$espacio,utf8_decode($campo2["nombres"]));
            				$pdf->SetFont('Times','b',8);
                $pdf->Text(47+98,53-1.5+$espacio,$campo2["cargo"]);
				$pdf->SetFont('Times','b',10);
               //	$pdf->Text(25+97,64+$espacio,$campo2["dni"]);
//                $pdf->Text(28+97,69+$espacio,$campo["codigo"]);
				$pdf->SetFont('Times','',5);
				$pdf->Text(50+97,64+$espacio,'');
				$cod2=$campo2["dni"];
				$pdf->Code39(50+97-29+16,61.9-5-2.5+$espacio,$cod2,1,10);



				$espacio=$espacio+52;
				$numero=$numero+1;
			}
		}

$pdf->AddPage();
}
$pdf->Output();
?>