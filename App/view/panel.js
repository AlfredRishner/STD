Ext.define('proyecto.view.panel', {
    extend: 'Ext.tab.Panel',
    xtype: 'framed-tabs',
    frame: true,
    width: 400,
    height: 300,
    defaults: {
        bodyPadding: 10,
        autoScroll: true
    },
    addTab: function(id,titulo)
    {
        var tabPanel = Ext.getCmp('tabs');
      //  alert('grid'+titulo);
        var newPanel = new Ext.Panel({
				        id : 'sys_'+id,
					layout: 'fit',
                                        layoutOnTabChange : true,
				        title: titulo,
                                        autoDestroy: true,
                                       //  autoLoad: true,
				        //loadScripts: true,
                                        loaded: true,
				        closable: true,
                                       // scripts: true,
				        border:true,
				        iconCls:'ico_'+id+'_icon',
					items:[
                                            {xtype:'grid'+titulo}
                                        ]
                                     /*    loader: {
                                            url: id+'.php',//'
                                            renderer: 'html',
                                            autoLoad: true,
                                            scripts: true
                                            }
            autoLoad: {
							url:id+'.php',
							border:false,
							autoLoad: true,
                                            scripts: true,
							scope: this
						}*/

			      	});
                               
			     	tabPanel.add(newPanel);
			     	tabPanel.setActiveTab(newPanel);
                                
      
       // alert(""+string);
       /* Ext.Msg.show({
     title:'Save Changes?',
     msg: 'You are closing a tab that has unsaved changes. Would you like to save your changes?',
     buttons: Ext.Msg.YESNOCANCEL,
    
     icon: Ext.window.MessageBox.QUESTION
});
*/
        
    }
    
});


