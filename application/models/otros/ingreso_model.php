<?php
if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');
class ingreso_model extends CI_Model {

 
     
       
/**************************************/
    public function insertarPermiso($registros) {
        $data = json_decode($registros);
        $this->db->insert('autorizacion', $data);
        echo json_encode(array(
            "success" => true
        ));
    }

    public function updatearPermiso($registros) {
        $data = json_decode($registros);
        $this->db->where('id', $data->id);
        $this->db->update('autorizacion', $data);
        echo json_encode(array(
            "success" => true
        ));
    }

    public function EliminarPermiso($registros) {
        $data = json_decode($registros);
        $this->db->where('id', $data->id);
        $this->db->delete('autorizacion', $data);
        echo json_encode(array(
            "success" => true
        ));
    }

    public function listadoPermiso() {
        $query = "SELECT * from autorizacion";
        $rs = mysql_query($query);
        $arr = array();
        while ($obj = mysql_fetch_object($rs)) {
            $arr[] = $obj;
        }

        echo json_encode($arr);
    }
    

}

?>