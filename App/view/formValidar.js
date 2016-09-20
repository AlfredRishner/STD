/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('proyecto.view.formValidar' ,{
    extend: 'Ext.form.FormPanel',
      baseCls: 'x-plain',
      id:'validlogin',
      labelWidth: 180,
      autoWidth:true,
      autoHeight:true,
    //  frame:true,
      autoScroll:false,
      bodyStyle:'padding:10px;',
      url:'index.php/RecordarUsuario/login',
       fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },
      items: [
		{xtype:'fieldset',title:'Usuario / Password', autoWidth:true, labelWidth: 90, autoHeight:true, defaultType: 'textfield',
                    x: 0,
                    y: 60,
			items:[
				{fieldLabel:'Usuario', name: 'alias', allowBlank:false, maxLength:250,
                                    listeners: {
                                        specialkey: function(f,e){
                                          if (e.getKey() == e.ENTER) {
                                              Ext.getCmp('password').focus();
                                             
                                          }
                                        }
                                      },
                                 style: 'color: #FFF; font-weight: bold; font-size: 11px'},
				{fieldLabel:'Password', id:'password',
                                    listeners: {
                                        specialkey: function(f,e){
                                          if (e.getKey() == e.ENTER) {
                                             // Ext.getCmp('validlogin').submit();
                                              Ext.getCmp('validlogin').form.submit({
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
                                          }
                                        }
                                      },
                                      inputType:'password', allowBlank:false, maxLength:20, name: 'password'}
			]
		}
		//{fieldLabel:'Recordarme en este equipo', xtype:'checkbox', id:'recordar', name: 'recordar', checked:false, inputValue:'1'}
	]
  });