
<?php

if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');

class ejec_model extends CI_Model {

    public function listadoEspecificas() {
        $query = "SELECT idespecifica, concat(especifica,'  ' , nombre) as especifica from especificas";
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

    public function listadoEjec($id_usuario) {
        $query = "  SELECT
avance.id,
especificas.idespecifica,
especificas.especifica as especifica,
grupos.idgrupo,
grupos.detalle as nombre_grupo,
avance.detalle,
avance.parcial,
avance.doc_fuente,
avance.mes

FROM
avance
LEFT  JOIN grupos ON avance.idgrupo = grupos.idgrupo
LEFT  JOIN  especificas ON avance.idespecifica = especificas.idespecifica
where avance.mes=2

  ";
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

    function crearEjec($registros, $idmeta) {
        $data = json_decode($registros);
        $preparado = array(
            'idespecifica' => $data->idespecifica,
            'idgrupo' => $data->idgrupo,
            'detalle' => $data->detalle,
            'parcial' => $data->parcial,
            'doc_fuente' => $data->doc_fuente
        );
        $this->db->insert('avance', $preparado);
        //echo $this->db->last_query();
        echo '{"parametros":[{"valor":"Creado Correctamente","clave":"msg"}],"success":true}';
    }

    function eliminarEjec($registros, $idmeta) {
        $data = json_decode($registros);
        $this->db->where('idprogramacion', $data->idprogramacion);
        // $this->db->where('idpersona', $id_usuario);
        if ($this->db->delete('programacion')) {
            echo json_encode(array(
                "success" => true
            ));
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
    }

    function actualizaEjec($registros, $idmeta) {
        //{"idprogramacion":1,"idespecifica":1,"especifica":"2.6.2.3.4.5 PERSONAL","nombre":"PERSONAL","ppto":48000}
        $data = json_decode($registros);
        $preparado = array(
            'idespecifica' => $data->idespecifica,
            'idmeta' => $idmeta,
            'ppto' => $data->ppto
        );


        $this->db->where('idprogramacion', $data->idprogramacion);
        $this->db->update('programacion', $preparado);
        //echo $this->db->last_query();
        echo '{"parametros":[{"valor":"Creado Correctamente","clave":"msg"}],"success":true}';
    }

}

?>
