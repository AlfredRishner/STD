<?php

if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');

class acceso_model extends CI_Model {
    /* Funcion para leer clientes de la BD */

    var $details;

    function accesoUsuarios($alias, $pass) {


         $query = $this->db->query("SELECT `id` , concat( nombres , ' ', paterno ) AS nombres, `oficina` FROM usuarios  where usuario='$alias' and pass='$pass'");
        $login = $query->result();
        if ($query->num_rows() > 0) {
            if (is_array($login) && count($login) == 1) {
                // Set the users details into the $details property of this class
                $this->details = $login[0];
                // Call set_session to set the user's session vars via CodeIgniter
                $this->set_session();
            }
            echo '{"success":true, "msg":"' . $this->session->userdata('nombres') . '"}';
        }
        else
            echo "{success:false,msg:'Error en el Proceso'}";
        /*            $newdata = array(
          'id'  => 'johndoe',
          'nombres'     => 'johndoe@some-site.com',
          'logged_in' => TRUE
          );

          $this->session->set_userdata($newdata); */
    }

    function set_session() {
        $this->session->set_userdata(array(
            'id' => $this->details->id,
            'nombres' => $this->details->nombres,
            'oficina' => $this->details->oficina,
           // 'idmeta' => $this->details->idmeta,
            'logeado' => true
                )
        );
    }

    function get_session() {

        if ($this->session->userdata('id')) {
            echo '{"success":true, "msg":' . $this->session->userdata('nombres') . '}';
        } else {
            echo '{"success":false, "msg":"Acceso Denegado"}';
        }
    }

    function get_out() {
        $this->session->sess_destroy();
        echo '{"success":false, "msg":"Acceso Denegado"}';
    }

    function get_meta() {
        $meta=$this->session->userdata('idmeta');
        $query = "SELECT nombre,codigo,idmeta FROM meta where idmeta=$meta";
        $SqlRead = $this->db->query($query);
        $arr = array();
        foreach ($SqlRead->result() as $row) {
            $arr[] = $row;
        }
        //echo json_encode($arr);
        //echo $arr[0][1];
        
        //$val=json_decode(json_encode($arr));
        //echo $val->nombre;
        /*echo $data=  json_decode(json_encode($arr));
       */
        $paging = array(
            'success' => true,
            'total' => count($arr), //<--- total de registros a paginar
            'registros' => $arr
        );
        echo json_encode($paging);/**/
    }
}

?>
