<?php  if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
class reporte_model extends CI_Model{ 
       function DatoReporte()
	{  	
                $SqlRead=$this->db->query("SELECT * FROM  visitantes ");
               
                
                 foreach($SqlRead->result() as $row)
                     {
                           
                           $arr[] = $row;
                     }
                     
                     return $arr;
                     
        } 
}	
?>