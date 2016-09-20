<?php if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
class RecordarUsuario extends CI_Controller
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
	function acceso()
	{
		 $this->load->model('acceso_model','', TRUE);
                $this->acceso_model->get_session();
	}
        function login()
	{
            if($this->session->userdata('id'))
            {
                 echo '{"success":true}';	
            }
            else {
            $alias=$this->input->post('alias');
            $password=$this->input->post('password');
            $this->load->model('acceso_model','', TRUE);
            $this->acceso_model->accesoUsuarios( $alias,$password);
            }
	}
        function logOut()
	{
		$this->load->model('acceso_model','', TRUE);
                $this->acceso_model->get_out();
	}
	function getMeta()
	{
		$this->load->model('acceso_model','', TRUE);
                $this->acceso_model->get_meta();
                
                
	}
}

?>