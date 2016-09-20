<?php if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
class tipo extends CI_Controller
{
 	/* Funcion para obtener los datos de los clientes */
    public function __construct()
    {
        parent::__construct();
        //cargamos nuestro helper y el helper url
        $this->load->helper(array('url'));
        $this->load->library('session');
     //   $this->load->database('default');
    }
        function listado(){
             $this->load->model('tipo_model','', TRUE);
             //$node= $this->input->get('node');
             $id_session=$this->session->userdata('id');
             $limit= $this->input->post('limit');
             $start= $this->input->post('start');
             
             //$start = isset($this->input->post('start'))?$this->input->post('start'):0; //posición a iniciar
	     //$limit = isset($this->input->post('limit'))?$this->input->post('limit'):5; //número de registros a 
        
             //$registros= $this->input->post('registros');
             
             $this->tipo_model->listado($start,$limit);
        }
        function crear(){
             $this->load->model('tipo_model','', TRUE);
              $registros= $this->input->post('registros');
             // $idmeta=$this->session->userdata('idmeta');
             $this->tipo_model->crear($registros);
        }
        function eliminar(){
             $this->load->model('tipo_model','', TRUE);
             $registros= $this->input->post('registros');
             // $idmeta=$this->session->userdata('idmeta');
             $this->tipo_model->eliminar($registros);
        }
        function actualiza(){
             $this->load->model('tipo_model','', TRUE);
             //$node= $this->input->get('node');
             $registros= $this->input->post('registros');
             //$idmeta=$this->session->userdata('idmeta');
             $this->tipo_model->actualiza($registros);
        }
       
}

?>
