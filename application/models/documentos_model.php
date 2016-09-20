<?php  if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
class documentos_model extends CI_Model{ 
     public function listado($start,$limit) {
        $query = " SELECT
documentos.iddocumentos	,
documentos.idtipo	,
tipo.nombre as nombre_tipo,
documentos.idoficinas	,
oficinas.nombre as nombre_oficina,
documentos.numero	,
documentos.asunto	,
documentos.fecha	,
documentos.para	,
documentos.de	,
documentos.archivo,	
documentos.folios	,
documentos.codigo,
documentos.anio
FROM
documentos
LEFT  JOIN tipo ON tipo.idtipo = documentos.idtipo
LEFT  JOIN  oficinas ON oficinas.idoficinas = documentos.idoficinas
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
        function actualiza($registros) {

        $data = json_decode($registros);
        $preparado = array(
        'nombre' => $data->nombre,
        'abreviatura' => $data->abreviatura,
        );
        $this->db->where('idoficinas', $data->idoficinas);
        $this->db->update('oficinas', $preparado);
        //echo $this->db->last_query();
        echo '{"parametros":[{"valor":"Creado Correctamente", "clave":"msg"}], "success":true}';
    }
     function crear($registros) {
        $data = json_decode($registros);
        //registros	{"id":0,"idespecifica":3,"especifica":"","idgrupo":3,"nombre_grupo":"","detalle":"DETALLES","parcial":20000,"doc_fuente":"NEA1254","mes":""}
        $preparado = array(
            'nombre' => $data->nombre,
            'abreviatura' => $data->abreviatura
        );
        $this->db->insert('oficinas', $preparado);
        //echo $this->db->last_query();
        echo '{"parametros":[{"valor":"Creado Correctamente","clave":"msg"}],"success":true}';
    }

    function eliminar($registros) {
        $data = json_decode($registros);
        $this->db->where('idoficinas', $data->idoficinas);
        // $this->db->where('idpersona', $id_usuario);
        if ($this->db->delete('oficinas')) {
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