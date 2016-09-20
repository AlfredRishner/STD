<?php

if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');

class programa_model extends CI_Model {
    
    public function listadoGrupo() {
        $query = "SELECT idgrupo, detalle from grupos";
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
    public function listadoPPTO($id_meta) {
        $query = "  SELECT 
            prg.idprogramacion,
            esp.idespecifica,
esp.especifica,
esp.nombre,
prg.ppto,
meta.nombre as meta
from programacion as prg
left JOIN especificas as esp on (prg.idespecifica=esp.idespecifica)
LEFT OUTER JOIN meta ON prg.idmeta = meta.idmeta
where prg.`idmeta`='$id_meta'
  ";
        $SqlRead = $this->db->query($query);
        // echo $this->db->last_query();
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
     function crearPPTO($registros,$idmeta){
                $data = json_decode($registros);
                    $preparado = array(
                   'idprogramacion' => NULL,
                   'idespecifica' => $data->idespecifica,
                   'idmeta' => $idmeta,
                   'ppto' => $data->ppto
                );
        //print_r($data);
                $this->db->insert('programacion',$preparado);
               // $rs = mysql_query($query);
        echo '{"parametros":[{"valor":"Creado Correctamente","clave":"msg"}],"success":true}';
        }
        function eliminarPPTO($registros,$idmeta){
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
        function actualizaPPTO($registros,$idmeta){
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
 
/*
    
    public function Insertar($id_session, $autorizado, $fecha, $motivo, $obs, $retorno, $salida) {
        // $data = json_decode($registros);

        $data = array(
            'idpersona' => $id_session,
            'motivo' => $motivo,
            'horasalida' => $motivo,
            'horaretorno' => $motivo,
            'tiempoautorizado' => $autorizado,
            'observaciones' => $obs,
            'fecha' => $fecha,
            'firmajefeinmediato' => 0,
            'firmaadministracion' => 0,
            'firmapersonal' => 0
        );
        //print_r($data);
        $this->db->insert('papeleta', $data);
        echo '{"parametros":[{"valor":"Creado Correctamente","clave":"msg"}],"success":true}';
    
    }

    
    public function updatearPapeleta($registros) {
        $data = json_decode($registros);
        $this->db->where('id', $data->id);
        $this->db->update('papeleta', $data);
        // echo $this->db->last_query();
        echo json_encode(array(
            "success" => true
        ));
    }

    public function EliminarPapeleta($registros, $id_usuario) {
        $data = json_decode($registros);
        $this->db->where('id', $data->id);
        $this->db->where('idpersona', $id_usuario);
        if ($this->db->delete('papeleta')) {
            echo json_encode(array(
                "success" => true
            ));
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
    }
*/
    
}

?>
