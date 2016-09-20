<?php
$mail = $_REQUEST['mensaje'];;
//Titulo
$titulo = "Mesa Ayuda PELT";
//cabecera
$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
//dirección del remitente 
$headers .= "From: Mesa Ayuda [P.E.L.T.] < aloza@reniec.gob.pe >\r\n";
//Enviamos el mensaje a tu_dirección_email 
$bool = mail("alfred.loza@hotmail.com",$titulo,$mail,$headers);
if($bool){
    echo "Mensaje enviado";
}else{
    echo "Mensaje no enviado";
}
?>