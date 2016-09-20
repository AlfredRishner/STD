/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('proyecto.view.MiPerfil', {
    extend: 'Ext.Window',
    id:'login',
    alias : 'widget.miperfil',
    //el:'winValidar',
    title:'Bienvenido...',
    layout:'fit',
    bodyStyle:'padding:5px;',
    //bodyStyle: "background-image:url('images/final.jpg')",
   // closeAction: 'hide',
    width:840,
    height:430,
    autoShow: true,
    resizable:false,
    modal:true,
    autoScroll: true,
    maximizable:false,
    closable:true,
    //plain: true,
    buttonAlign:'center',
    items:[
        //{xtype:'panel', baseCls:'x-plain', border:false, contentEl:'msgValidar', autoWidth: true, autoHeight:true},
       // Ext.create('proyecto.view.formValidar')
    ],
    buttons: [{
        text:'Guardar',
        align:'center',
        handler: function (){
             var valid=Ext.getCmp('validlogin');
           /* if (valid.form.isValid()) {
                valid.form.submit({
                    waitTitle: "Validando",
                    waitMsg : "Espere un momento por favor......",
                     failure: function(sender,action){
                            Ext.example.msg('Mensaje',"Usuario / Contraseña incorrecto");
                      },
                      success: function(sender,action) {
                                Ext.example.msg('Bienvenido', action.result.msg);  
                                Ext.getCmp('login').hide();
                                //Ext.getCmp('gridcitas').getStore().load();
                                
                            }
                     
                });
             }*/
                 
        }
    }]
  });