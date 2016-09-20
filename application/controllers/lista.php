<?php if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');

class lista extends CI_Controller
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
     function  index()
        {
                        $this->load->view('inicio');
        }

       
	function acceso()
	{
		$this->load->model('Listacitas_model','', TRUE);
                $fecha= $this->input->get('fecha');
               // $limit = $this->input->get('limit');
        //  $start = 1;//$_REQUEST['start'];
	//  $limit = 20;//$_REQUEST['limit'];
                //$start = $_REQUEST['start'];
	//$limit = $_REQUEST['limit'];
                $id_session=$this->session->userdata('oficina');
                $permiso=$this->session->userdata('permiso');
                $this->Listacitas_model->LeerVisitantes($fecha,$id_session,$permiso);
	}
	function actualiza(){
             $this->load->model('Listacitas_model','', TRUE);
                $id= $this->input->post('id');
                $this->Listacitas_model->EstadoAtencion($id);
        }
        function actualizabien(){
             $this->load->model('Listacitas_model','', TRUE);
                $id= $this->input->post('id');
                $this->Listacitas_model->EstadoAtencionbien($id);
        }
        function crearCita(){
             $this->load->model('Listacitas_model','', TRUE);
             $registros= $this->input->post('registros');
              //  $id= $this->input->post('id');
             $this->Listacitas_model->insertar($registros);
        }
        function actualizaCita(){
             $this->load->model('Listacitas_model','', TRUE);
             $registros= $this->input->post('registros');
             $this->Listacitas_model->updatearCita($registros);
        }
        function eliminarCita(){
             $this->load->model('Listacitas_model','', TRUE);
             $registros= $this->input->post('registros');
             $this->Listacitas_model->EliminarCita($registros);
        }
        
        
        function ListaNodosMenu(){
             $this->load->model('Listacitas_model','', TRUE);
             $node= $this->input->get('node');
             $this->Listacitas_model->ListadoMenus($node);
        }
        
        
}

?>