<?php

if (!defined('BASEPATH'))
    exit('El acceso directo a este archivo no esta permitido.');

class SubirArchivo extends CI_Controller {
    /* Funcion para obtener los datos de los clientes */

    public function __construct() {
        parent::__construct();
        //cargamos nuestro helper y el helper url
        $this->load->helper(array('url'));
        $this->load->library('upload');
        // $this->load->database('default');
    }

    function subirArchivo() {
        $config['upload_path'] = "archivos";
        $config['file_name'] = "nombre_archivo";
        $config['allowed_types'] = "*";
        $config['max_size'] = "0";
        $config['max_width'] = "20000";
        $config['max_height'] = "2000";
        $config['encrypt_name'] = TRUE;
        $this->upload->initialize($config);
        // $this->load->library('upload', $config);
$upload_data = $this->upload->data();
        if (!$this->upload->do_upload('ArchivoEnvio')) {
            //*** ocurrio un error
            $data['uploadError'] = $this->upload->display_errors();
            echo $this->upload->display_errors();
            return;
        }
        $datos_archivo = $this->upload->data();
        echo $datos_archivo['file_name'];
        $data['uploadSuccess'] = $this->upload->data();
        //  $this->load->model('archivo_model','', TRUE);
        //  $registros= $this->input->post('ArchivoEnvio');
        //  $this->archivo_model->Subir($registros);
    }

    function crear() {
        $this->load->model('archivo_model', '', TRUE);
        $registros = $this->input->post('registros');
        // $idmeta=$this->session->userdata('idmeta');
        $this->archivo_model->crear($registros);
    }

    function eliminar() {
        $this->load->model('archivo_model', '', TRUE);
        $registros = $this->input->post('registros');
        // $idmeta=$this->session->userdata('idmeta');
        $this->archivo_model->eliminar($registros);
    }

    function actualiza() {
        $this->load->model('archivo_model', '', TRUE);
        //$node= $this->input->get('node');
        $registros = $this->input->post('registros');
        //$idmeta=$this->session->userdata('idmeta');
        $this->archivo_model->actualiza($registros);
    }

}

?>
