
<?php

if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');

class grupo_model extends CI_Model {
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
    public function listadoGrupo($id_usuario) {
        $query = "  SELECT
concat(especificas.especifica,' ',
especificas.nombre) as especifica,
grupos.detalle,
enlace.ppto,
IFNULL(mes_ant.par_ant,0) as ejec_actual_mes,
(IFNULL(mes_ant.par_ant,0)+IFNULL(mes_act.par_act,0)) as acum_actual,
(enlace.ppto-(IFNULL(mes_ant.par_ant,0)+IFNULL(mes_act.par_act,0)))as saldo_anual,
IFNULL(mes_act.par_act,0) as acum_anterior


FROM
enlace

LEFT OUTER JOIN grupos ON enlace.idgrupo = grupos.idgrupo
LEFT JOIN (select 
idespecifica,idgrupo,
SUM(parcial) as par_ant
FROM avance
where mes=2 
GROUP BY idgrupo) as mes_ant ON  mes_ant.idgrupo=enlace.idgrupo
LEFT JOIN (select 
idespecifica,idgrupo,
SUM(parcial) as par_act
FROM avance
where mes <2
GROUP BY idgrupo) as mes_act ON  mes_act.idgrupo=enlace.idgrupo

LEFT OUTER JOIN especificas ON especificas.idespecifica = enlace.idespecifica
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
     function crearGrupo($registros,$idmeta){
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
        function eliminarGrupo($registros,$idmeta){
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
        function actualizaGrupo($registros,$idmeta){
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
