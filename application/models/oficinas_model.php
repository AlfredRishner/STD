<?php  if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
class oficinas_model extends CI_Model{ 
     public function listado($start,$limit) {
        
        $this->db->from('oficinas');
                $this->db->order_by("idoficinas", "asc");
                $SqlRead = $this->db->get(); 
                $arr=array();
                             foreach($SqlRead->result() as $row)
                             {
                                     $arr[] = $row;
                             }
                $paging = array(
                      'success'=>true,
                      'total'=>count($arr), //<--- total de registros a paginar
                      'registros'=> array_splice($arr,$start,$limit) 
                );
                echo json_encode($paging);
    }

    
       function LeerOficinas()
	{  	
            //  $SqlRead=$this->db->get('visitantes', $start, $limit);
             //$SqlRead =  $this->db->query($queryString);
                $this->db->from('oficinas');
                $this->db->order_by("id", "asc");
                $SqlRead = $this->db->get(); 
                $arr=array();
                             foreach($SqlRead->result() as $row)
                             {
                                     $arr[] = $row;
                             }
                $paging = array(
                      'success'=>true,
                      'total'=>count($arr), //<--- total de registros a paginar
                      'registros'=> $arr
                );
                echo json_encode($paging);
        }
        function actualiza($registros) {

        $data = json_decode($registros);
        $preparado = array(
        'nombre' => $data->nombre,
        'abreviatura' => $data->abreviatura,
        );
        $this->db->where('idoficinas', $data->idoficinas);
        $this->db->update('oficinas', $preparado);
        //echo $this->db->last_query();
        echo '{"parametros":[{"valor":"Creado Correctamente", "clave":"msg"}], "success":true}';
    }
     function crear($registros) {
        $data = json_decode($registros);
        //registros	{"id":0,"idespecifica":3,"especifica":"","idgrupo":3,"nombre_grupo":"","detalle":"DETALLES","parcial":20000,"doc_fuente":"NEA1254","mes":""}
        $preparado = array(
            'nombre' => $data->nombre,
            'abreviatura' => $data->abreviatura
        );
        $this->db->insert('oficinas', $preparado);
        //echo $this->db->last_query();
        echo '{"parametros":[{"valor":"Creado Correctamente","clave":"msg"}],"success":true}';
    }

    function eliminar($registros) {
        $data = json_decode($registros);
        $this->db->where('idoficinas', $data->idoficinas);
        // $this->db->where('idpersona', $id_usuario);
        if ($this->db->delete('oficinas')) {
            echo json_encode(array(
                "success" => true
            ));
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
    }

}	
?>