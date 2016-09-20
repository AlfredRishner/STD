<?php

if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');

class papeletas_model extends CI_Model {

    public function ListadoPapeletas() {
        $query = "SELECT * FROM papeleta";
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
        /* echo json_encode(array(
          "success" => true
          )); */
    }

    public function insertarPapeleta($registros) {
        $data = json_decode($registros);
        $id = $data->id;
        $idpersona = $this->session->userdata('id');
        $motivo = $data->motivo;
        $horasalida = $data->horasalida;
        $horaretorno = $data->horaretorno;
        $tiempoautorizado = $data->tiempoautorizado;
        $observaciones = $data->observaciones;
        $fecha = $data->fecha;
        $firmajefeinmediato = $data->firmajefeinmediato;
        $firmaadministracion = $data->firmaadministracion;
        $firmapersonal = $data->firmapersonal;
        $query = "insert into papeleta values('$id','$idpersona','$motivo','$horasalida','$horaretorno','$tiempoautorizado','$observaciones','$fecha','$firmajefeinmediato','$firmaadministracion','$firmapersonal');";
        // $this->db->insert('papeleta', array($id,$idpersona,$motivo,$horasalida,$horaretorno,$tiempoautorizado,$observaciones,$fecha,$firmajefeinmediato,$firmaadministracion,$firmapersonal));
        if ($this->db->query($query)) {
            echo json_encode(array(
                "success" => true
            ));
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
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

    public function listadoPapeleta($id_usuario,$mes) {
    
             if($id_usuario){
            // $id_meta=$this->session->userdata('idmeta');
             $query = "SELECT
meta.nombre as meta,
especificas.especifica,
especificas.nombre,
programacion.ppto,
IFNULL(mes_ant.par_ant,0) as ejec_actual,
/*IFNULL(mes_act.par_act,0) as acum_act,*/
(IFNULL(mes_ant.par_ant,0)+IFNULL(mes_act.par_act,0)) as acum_actual,
(programacion.ppto-(IFNULL(mes_ant.par_ant,0)+IFNULL(mes_act.par_act,0)))as saldo_anual,
((IFNULL(mes_ant.par_ant,0)+IFNULL(mes_act.par_act,0))-IFNULL(mes_ant.par_ant,0)) as saldo_acum_anterior
/*(programacion.ppto-(IFNULL(mes_ant.par_ant,0)+IFNULL(mes_act.par_act,0)))as saldo_anterior*/
FROM
programacion
LEFT OUTER JOIN especificas ON especificas.idespecifica = programacion.idespecifica
LEFT OUTER JOIN meta ON meta.idmeta= programacion.idmeta
LEFT JOIN (select 
idespecifica,
SUM(parcial) as par_ant
FROM avance
where mes=$mes and idmeta=$id_usuario
GROUP BY idespecifica) as mes_ant ON mes_ant.idespecifica = programacion.idespecifica
LEFT JOIN (select 
idespecifica,
SUM(parcial) as par_act
FROM avance
where mes<$mes and idmeta=$id_usuario
GROUP BY idespecifica) as mes_act ON mes_act.idespecifica = programacion.idespecifica
WHERE programacion.idmeta=$id_usuario";
        $SqlRead = $this->db->query($query);
        
        $arr = array();
        foreach ($SqlRead->result() as $row) {
            $arr[] = $row;
        }
      //echo $this->db->last_query();
        $paging = array(
            'success' => true,
            'total' => count($arr), //<--- total de registros a paginar
            'registros' => $arr
        );
        echo json_encode($paging);
             }
    }

}

?>