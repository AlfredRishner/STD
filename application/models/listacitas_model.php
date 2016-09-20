<?php

if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');

class Listacitas_model extends CI_Model {

    function LeerVisitantes($fecha, $id_session, $permiso) {

        if (!$fecha) {
            $fecha = date('Y-m-d');
        } else {
            $fecha = date('Y-m-d', strtotime($fecha));
        }
        // echo $permiso;

        if ($permiso == 1) {
            $queryString = "SELECT * FROM visitantes where fecha='$fecha'";
        } else {
            $queryString = "SELECT * FROM visitantes where fecha='$fecha' and  oficina ='$id_session' ";
        }

        //$queryString = "SELECT * FROM visitantes where fecha='$fecha' and oficina ='$id_session'";
        $SqlRead = $this->db->query($queryString);
        $arr = array();
        foreach ($SqlRead->result() as $row) {
            $arr[] = $row;
        }
        $paging = array(
            'success' => true,
            'total' => count($arr), //<--- total de registros a paginar
            'registros' => $arr
        );
        echo json_encode($paging);
    }

    function EstadoAtencion($id) {
        $queryString = "update visitantes set atencion=1 where id=$id";
        $this->db->query($queryString);
        echo '{"success":true}';
    }

    function EstadoAtencionbien($id) {
        $queryString = "update visitantes set atencion=0 where id=$id";
        $this->db->query($queryString);
        echo '{"success":true}';
    }

    public function insertar($registros) {
        $data = json_decode($registros);
        $this->db->insert('visitantes', $data);
        echo json_encode(array(
            "success" => true
        ));
    }

    public function updatearCita($registros) {
        $data = json_decode($registros);
        $this->db->where('id', $data->id);
        $this->db->update('visitantes', $data);
        echo json_encode(array(
            "success" => true
        ));
    }

    public function EliminarCita($registros) {
        $data = json_decode($registros);
        $this->db->where('id', $data->id);
        $this->db->delete('visitantes', $data);
        echo json_encode(array(
            "success" => true
        ));
    }

    public function ListadoMenus($node) {
        $parent_id = $node;//$_GET['node'];
        $query = "SELECT id, text, leaf FROM menu WHERE parent_id='" . $parent_id . "' ORDER BY id ASC";
        /*$rs = mysql_query($query);
        $arr = array();
        while ($obj = mysql_fetch_object($rs)) {
            $arr[] = $obj;
        }

        echo json_encode($arr);*/
		$SqlRead = $this->db->query($query);
		$arr = array();
        foreach ($SqlRead->result() as $row) {
            $arr[] = $row;
        }
      /*  $paging = array(
            'success' => true,
            'total' => count($arr), //<--- total de registros a paginar
            'registros' => $arr
        );*/
        echo json_encode($arr);
		
    }

}

?>