<?php
define('FPDF_FONTPATH','font/');
require('code39.php');
require('fpdf.php');
$pdf=new PDF_Code39();
$pdf->AddPage();
$pdf->Cell(20,10,'FICHA SOCIO - ECONOMICA 2008',0,1,'C');
$pdf->Code39(20,4,'10002',1,5);
$pdf->Output();
?>
