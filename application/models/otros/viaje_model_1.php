<?php

if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');

class viaje_model extends CI_Model {
    /*     * *********************************** */

    public function insertarViaje($registros) {
        //  $query = "SELECT LPAD(id,5,0) as id,lista,lugar,motivo,documento_referencia,salida_fecha,fecha_retorno,adelanto,componente_meta,aerea,vehiculo,placa,combustible,chofer,idcrea from autorizacion_viaje";
        // $rs = mysql_query($query);

        $data = json_decode($registros);
        $lista = implode(',', $data->lista);
        $lugar = $data->lugar;
        $motivo = $data->motivo;
        $documento_referencia = $data->documento_referencia;
        $salida_fecha = $data->salida_fecha;
        $hora_salida = $data->hora_salida;
        $fecha_retorno = $data->fecha_retorno;
        $hora_retorno = $data->hora_retorno;
        $adelanto = $data->adelanto;
        $componente_meta = $data->componente_meta;
        $aerea = $data->aerea;
        $vehiculo = $data->vehiculo;
        $placa = $data->placa;
        $combustible = $data->combustible;
        $chofer = $data->chofer;
        $idcrea = $data->idcrea;
        $fecha=  date("d/m/Y");
        $SQL = "INSERT INTO autorizacion_viaje VALUES ('','$fecha','$lista', '$lugar', '$motivo', '$documento_referencia', '$salida_fecha', '$hora_salida', '$fecha_retorno', '$hora_retorno', '$adelanto', '$componente_meta', '$aerea', '$vehiculo', '$placa', '$combustible', '$chofer', '$idcrea');";

        $rs = mysql_query($SQL);
        //echo print_r(json_encode($data->lista));
        //$this->db->insert('autorizacion_viaje', $data);
       // echo $this->db->last_query();
        echo json_encode(array(
            "success" => true
        ));
    }

    public function updatearViaje($registros) {
        $data = json_decode($registros);
        $this->db->where('id', $data->id);
        $this->db->update('autorizacion_viaje', $data);
        echo json_encode(array(
            "success" => true
        ));
    }

    public function EliminarViaje($registros) {
        $data = json_decode($registros);
        $this->db->where('id', $data->id);
        $this->db->delete('autorizacion_viaje', $data);
        echo json_encode(array(
            "success" => true
        ));
    }

    public function listadoViaje() {
        $query = "SELECT LPAD(id,5,0) as id,fecha,lista,lugar,motivo,documento_referencia,salida_fecha,fecha_retorno,adelanto,componente_meta,aerea,vehiculo,placa,combustible,chofer,idcrea from autorizacion_viaje";
        $rs = mysql_query($query);
        $arr = array();
        while ($obj = mysql_fetch_object($rs)) {
            $arr[] = $obj;
        }

        echo json_encode($arr);
    }

    public function listadoPersonasViaje($query) {
        if (isset($_REQUEST['query'])) {
            $querys = "SELECT id as lista,concat(paterno,' ',materno,' ',nombres ) as nombres  from usuarios where paterno LIKE '%" . $_REQUEST['query'] . "%' or materno LIKE '%" . $_REQUEST['query'] . "%' ";
        } else
            $querys = "SELECT id as lista,concat(paterno,' ',materno,' ',nombres ) as nombres  from usuarios";
        $rs = mysql_query($querys);
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