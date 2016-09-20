<?php
if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');
class licencias_model extends CI_Model {

 
     
       
/**************************************/
    public function insertarLicencias($registros) {
        $data = json_decode($registros);
        
        $id=$data->id;	
        $especifica=$data->idespecifica;
        $descripcion=$data->descripcion;
        $programado=$data->programado;
        $ejecutado_mes=$data->ejecutado_mes;
        $acumulado_mes=$data->acumulado_mes;
        $saldo_mes=$data->saldo_mes;
        $idpersona = $this->session->userdata('id');
        
       // id 	especifica 	nombre_especifica 	descripcion 	programado 	ejecutado_mes 	acumulado_mes 	saldo_mes
        $query="insert into avance values(null,'$especifica','$descripcion','$programado','$ejecutado_mes','$acumulado_mes','$saldo_mes','$idpersona')";
                
       // $this->db->insert('papeleta', array($id,$idpersona,$motivo,$horasalida,$horaretorno,$tiempoautorizado,$observaciones,$fecha,$firmajefeinmediato,$firmaadministracion,$firmapersonal));
        if($this->db->query($query)){
            echo json_encode(array(
                "success" => true
            ));
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
        echo $this->db->last_query();
        
    }

    public function updatearLicencias($registros) {
        $data = json_decode($registros);
        $id=$data->id;	
        $idespecifica=$data->idespecifica;
        $nombre_especifica=$data->nombre_especifica;
        $descripcion=$data->descripcion;
        $programado=$data->programado;
        $ejecutado_mes=$data->ejecutado_mes;
        $acumulado_mes=$data->acumulado_mes;
        $saldo_mes=$data->saldo_mes;
        $idpersona = $this->session->userdata('id');
         $query="update  avance set idespecifica='$idespecifica', descripcion='$descripcion',
              programado=$programado,ejecutado_mes=$ejecutado_mes,acumulado_mes=$acumulado_mes,saldo_mes=$saldo_mes where id=$id" ;
                
       // $this->db->insert('papeleta', array($id,$idpersona,$motivo,$horasalida,$horaretorno,$tiempoautorizado,$observaciones,$fecha,$firmajefeinmediato,$firmaadministracion,$firmapersonal));
        if($this->db->query($query)){
            echo json_encode(array(
                "success" => true
            ));
        } else {
            echo json_encode(array(
                "success" => false
            ));
        }
      // echo $this->db->last_query();
    }

    public function EliminarLicencias($registros) {
        $data = json_decode($registros);
        $this->db->where('id', $data->id);
        $this->db->delete('licencias', $data);
        echo json_encode(array(
            "success" => true
        ));
    }

    public function listadoLicencias() {
        $query = "SELECT
     av.`id`,
     esp.especifica as idespecifica,
     concat(esp.especifica,' ',esp.nombre) as especifica,
     grp.`detalle`,
     av.`idespecifica` AS avance_idespecifica,
     av.`idgrupo` AS avance_idgrupo,
     av.`detalle` AS descripcion,
     av.`parcial` AS ejecutado_mes  ,
     av.`doc_fuente` AS doc_fuente,
     av.`mes` AS mes
FROM
     `avance`  as av
left JOIN especificas as esp ON (av.`idespecifica` = esp.`idespecifica`)
left JOIN grupos as grp ON (av.`idgrupo` = grp.`idgrupo`)";
        $rs = mysql_query($query);
        $arr = array();
        while ($obj = mysql_fetch_object($rs)) {
            $arr[] = $obj;
        }

        echo json_encode($arr);
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

}

?>