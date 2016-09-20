<?php
include('formas.php');
require('fpdf.php');

$extras = $_REQUEST['dato'];
//echo $cantidadElementos=count(extras);
$tuVector=array();
$tuVector = explode(',',$extras);
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
  //  $this->Cell(0,10,''.$this->PageNo().'/{nb}',0,0,'C');
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
                function Rotate($angle,$x=-1,$y=-1)
                {
                        if($x==-1)
                                $x=$this->x;
                        if($y==-1)
                                $y=$this->y;
                        if($this->angle!=0)
                                $this->_out('Q');
                        $this->angle=$angle;
                        if($angle!=0)
                        {
                                $angle*=M_PI/180;
                                $c=cos($angle);
                                $s=sin($angle);
                                $cx=$x*$this->k;
                                $cy=($this->h-$y)*$this->k;
                                $this->_out(sprintf('q %.5F %.5F %.5F %.5F %.2F %.2F cm 1 0 0 1 %.2F %.2F cm',$c,$s,-$s,$c,$cx,$cy,-$cx,-$cy));
                        }
                }



        	function RotatedText($x,$y,$txt,$angle)
                {
                        //Text rotated around its origin
                        $this->Rotate($angle,$x,$y);
                        $this->Text($x,$y,$txt);
                        $this->Rotate(0);
                }

                function RotatedImage($file,$x,$y,$w,$h,$angle)
                {
                        //Image rotated around its upper-left corner
                        $this->Rotate($angle,$x,$y);
                        $this->Image($file,$x,$y,$w,$h);
                        $this->Rotate(0);
                }


}
//Creaci�n del objeto de la clase heredada
$pdf=new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Arial','B',15);

$pdf->SetLineWidth(0.1);
$pdf->SetFillColor(192);

include "conexion.php";
$num_rows = count($tuVector);

 if ($num_rows<7) {
    $aprox=$num_rows+8;
 }
 else {
// echo $num_rows."<br/>";
   $aprox=round($num_rows/16)+3;
 }

$numero=0;
for($conta=1;$conta<$aprox;$conta++)
{
     $espacio=0;
		for($cont=0;$cont<8 ;$cont++)
		{	
				$sql="select * from carnet WHERE `id` ='$tuVector[$numero]'";
				$rs=mysql_query($sql);

				while($campo=mysql_fetch_array($rs))
				{				
				$pdf->Image('FINAL.jpg',20+7,15+$espacio,82.3);
				//carne 01 
				$pdf->SetLineWidth(0);
				//$pdf->Rect(20+7,15+$espacio,82.3,50.5,'D');//cuadrado de impresion
				//$pdf->SetLineWidth(0.1);
                //$pdf->Rect(21+7,33.5-7+$espacio,23,27,'S');
                $pdf->SetTextColor(221,102,23);
				$pdf->SetFont('Times','b',9);
                $pdf->SetTextColor(0,0,0);
				$pdf->Text(47+7-6,27+$espacio,utf8_decode(ereg_replace("([     ]+)","", $campo["codigo"])));
				//$pdf->Text(46,47+$espacio,$campo["materno"]);
				$pdf->SetFont('times','',6);
				$pdf->Text(30,33+$espacio,utf8_decode($campo["descripcion"]));
				$pdf->SetFont('Times','',8);
                $pdf->SetTextColor(0,0,0);
				$pdf->SetTextColor(255,0,0);
				$pdf->SetFont('Times','b',7);
				//$pdf->RotatedText(108,45+$espacio,"Inventario - ".date("Y"),90);
				
				$cod=ereg_replace( "([     ]+)", "", $campo["codigo"]);
				$pdf->SetFont('times','b',7);
				$pdf->SetTextColor(0,0,0);
				//$pdf->Cell(10, 2,$campo["descripcion"],1,"B","J");
				$pdf->RotatedText(108,45+$espacio,"Inventario / 2014",90);
				$pdf->SetTextColor(0,0,0);
				$pdf->SetFont('Times','',9);
				$pdf->Code39(50-28+7+8,36+$espacio,$campo["id"],0.8,10);
                //fin de  carne 01
				
				}
                                $numero++;
                                //id	paterno	materno	nombres	cargo	dni	foto	fecha	estado
				$sql2="select * from carnet WHERE `id` ='$tuVector[$numero]'";
				$rs2=mysql_query($sql2);

				while($campo2=mysql_fetch_array($rs2))
				{
				
				
                $pdf->Image('FINAL.jpg',20+97-7,15+$espacio,82.3);

                $pdf->SetLineWidth(0);
				//$pdf->Rect(20+97-7,15+$espacio,82.3,50.5,'D');//cuadrado de impresion
				$pdf->SetLineWidth(0.1);
                //  $pdf->Rect(21+97,33.5-7+$espacio,23,27,'S');
				//$pdf->Rect(21,36,32,24,'D');//cuadrado de impresion
				$pdf->SetTextColor(221,102,23);
				
                $pdf->SetTextColor(0,0,0);
				//$pdf->Text(47,42+$espacio,$campo["paterno"]." ".$campo["materno"]);


				$pdf->SetFont('Times','b',9);
				$pdf->Text(46+97-13,27+$espacio,utf8_decode(ereg_replace("([     ]+)","", $campo2["codigo"])));
				//$pdf->Text(46+97,47+$espacio,$campo2["materno"]);
				$pdf->SetFont('Times','',6);
				$pdf->Text(46+97-30,33+$espacio,utf8_decode($campo2["descripcion"]));

				$cod2=ereg_replace("([     ]+)","", $campo2["codigo"]);
				$pdf->SetFont('times','b',7);
				$pdf->SetTextColor(0,0,0);
				//$pdf->Cell(10, 2,$campo["descripcion"],1,"B","J");
				$pdf->RotatedText(190,45+$espacio,"Inventario /  2014 ",90);
				$pdf->SetTextColor(0,0,0);

				$pdf->Code39(50+97-29+2,37+$espacio,$campo2["id"],0.8,8);
				
				//$cod2=$campo2["dni"];
				//$pdf->Code39(50+97-29+16,61.9-5-2.5+$espacio,$cod2,1,10);
                      
                                
				
				$espacio=$espacio+35;
				$numero=$numero+1;
			}
			$pdf->ln(1);
                          
    
		}
                $pdf->AddPage();
}
$pdf->Output();
?>