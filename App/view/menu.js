/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.view.menu', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.tree.*',
        'Ext.data.*'
    ],
    //store: treestore,
    xtype: 'basic-trees',
    height: 400,
    width: 350,
    useArrows: true,
	id:'menu',
	//xtype: 'treepanel',
	//region:'center',
	autoScroll:true,
	title:'Menu',
	iconCls:'nav',
	rootVisible: false,
	border:false,
	lines: false,
	singleExpand: false,
        bbar:[Ext.create('Ext.Button', {
                        text: 'Salir del Sistema',
                        handler: function() {
                           Ext.Ajax.request({
                                    url : 'index.php/RecordarUsuario/logOut' ,
                                    method: 'POST',
                                    //params: {access_log:true},
                            success: function(result,request) {
                                   // var json = Ext.JSON.decode(result.responseText);
                                   // Ext.create('proyecto.view.acceso').show();
                                   //Ext.getCmp('login').hide(); 
                                    var vnt=Ext.getCmp('login');
                                    if(vnt)vnt.show();
                                    else
                                    Ext.create('proyecto.view.acceso');
                                      
                                    },
                            failure: function(result,request){
                                    Ext.create('proyecto.view.acceso');
                                   // logOut()//mostrarWinValidar();
                            }
                            });
                        }
                    }),Ext.create('Ext.Button', {
                        text: 'Mi Perfil',
                        handler: function() {
                            Ext.create('proyecto.view.MiPerfil');
                        }
                    })],
        listeners: {
            itemclick:function(view, record, item, index, e)
                    {
                        //alert(record.get('leaf'));
                        if(record.get('leaf'))
    			{
                            
                                 var tabPanel = Ext.getCmp('tabs');
                                 var idtab = Ext.getCmp('sys_'+record.get('id'));
                                // alert(idtab);
                                 if(!idtab){
                                  var open = tabPanel.getItemId('sys_'+record.get('id'));
                                //alert(idtab);
                                   tabPanel.add(Ext.create('proyecto.view.panel').addTab(record.get('id'),record.get('text'))); 
                                 }
                                 else
                                     {
                                         tabPanel.setActiveTab('sys_'+record.get('id'));
                                     }
                        }
                    }

	},
        
	 initComponent: function() {
        Ext.apply(this, {
           store : 'treeStore',
            iconCls:'nav'
           /* store: new Ext.data.TreeStore({
                proxy: {
                    type: 'ajax',
                    proyecto.store.treeStore
                    url: 'js/app.tree.js',
                    node:'id',
                    reader: {
                         type: 'json'
                    }
                }
            })*/
        });
        this.callParent();
    }
	
});



  