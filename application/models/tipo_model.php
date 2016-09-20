<?php  if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
class tipo_model extends CI_Model{ 
     public function listado($start,$limit) {
        $this->db->from('tipo');
                $this->db->order_by("idtipo", "asc");
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
    function actualiza($registros) {

        $data = json_decode($registros);
        $preparado = array(
        'nombre' => $data->nombre
        );
        $this->db->where('idtipo', $data->idtipo);
        $this->db->update('tipo', $preparado);
        //echo $this->db->last_query();
        echo '{"parametros":[{"valor":"Creado Correctamente", "clave":"msg"}], "success":true}';
    }
     function crear($registros) {
        $data = json_decode($registros);
        $preparado = array(
            'nombre' => $data->nombre
        );
        $this->db->insert('tipo', $preparado);
        //echo $this->db->last_query();
        echo '{"parametros":[{"valor":"Creado Correctamente","clave":"msg"}],"success":true}';
    }
    function eliminar($registros) {
        $data = json_decode($registros);
        $this->db->where('idtipo', $data->idtipo);
        // $this->db->where('idpersona', $id_usuario);
        if ($this->db->delete('tipo')) {
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