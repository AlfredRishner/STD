<?php if ( ! defined('BASEPATH')) exit('El acceso directo a este archivo no esta permitido.');
class inicio extends CI_Controller
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
           // $data=comprobar();
            $this->load->view('inicio');
        }

	/*function acceso()
	{
		//La funcion ReadClientes se encuentra en el modelo Model_Clientes
                $this->load->model('Validar_model','', TRUE);
                $alias = $this->input->post('alias');
                $password = $this->input->post('password');
                $this->Validar_model->accesoUsuarios($alias,$password);
	}
        function  comprobar()
        {
            $this->load->helper('cookie');
            if( $this->session->userdata('logeado') ) {
                return true;
                } else {
                   return false;
                }
        }*/
	
}

?>