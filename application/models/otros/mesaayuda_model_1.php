<?php

if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');

class mesaayuda_model extends CI_Model {

    public function listadoEspecificas() {
        $query = "SELECT * FROM `mesaayuda`";
        $rs = mysql_query($query);
        $arr = array();
        while ($obj = mysql_fetch_object($rs)) {
            $arr[] = $obj;
        }
        $paging = array(
            'success' => true,
            'total' => count($arr), //<--- total de registros a paginar
            'registros' => $arr
        );
        echo json_encode($paging);
    }

    public function listado($id_usuario) {
       if($id_usuario)
        { 
           $query = "  select * FROM mesaayuda where idUsuario='$id_usuario' ";
        $SqlRead = $this->db->query($query);
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
    }
    function crear($registros, $idmeta) {
        $data = json_decode($registros);
        //registros	{"id":0,"idespecifica":3,"especifica":"","idgrupo":3,"nombre_grupo":"","detalle":"DETALLES","parcial":20000,"doc_fuente":"NEA1254","mes":""}
        $preparado = array(
            'idespecifica' => $data->idespecifica,
            'idgrupo' => $data->idgrupo,
            'detalle' => $data->detalle,
            'parcial' => $data->parcial,
            'doc_fuente' => $data->doc_fuente,
            'mes' => 2,
            'idmeta' => $idmeta,
            'siaf' => $data->siaf,
            'proveedor' => $data->proveedor
        );
        $this->db->insert('avance', $preparado);
        //echo $this->db->last_query();
        echo '{"parametros":[{"valor":"Creado Correctamente","clave":"msg"}],"success":true}';
    }

    function eliminar($registros, $idmeta) {
        $data = json_decode($registros);
        $this->db->where('id', $data->id);
        // $this->db->where('idpersona', $id_usuario);
        if ($this->db->delete('avance')) {
            echo json_encode(array(
                "success" => true
            ));
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
    }

    function actualiza($registros, $idmeta) {

        $data = json_decode($registros);
        $preparado = array(
        'idespecifica' => $data->idespecifica,
        'idgrupo' => $idmeta,
        'detalle' => $data->detalle,
        'parcial' => $data->parcial,
        'doc_fuente' => $data->doc_fuente,
        'mes'=>2,
        'idmeta'=>$idmeta,
            'siaf' => $data->siaf,
            'proveedor' => $data->proveedor
        );
        $this->db->where('id', $data->id);
        $this->db->update('avance', $preparado);
        //echo $this->db->last_query();
        echo '{"parametros":[{"valor":"Creado Correctamente", "clave":"msg"}], "success":true}';
    }

}

?>
