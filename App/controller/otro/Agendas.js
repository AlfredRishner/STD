Ext.define('proyecto.controller.Agendas', {
    extend: 'Ext.app.Controller',
    stores: ['datos','treeStore'],
    models: ['Agenda'],
    views: ['Grid', 'Formulario', 'Window'],
    refs: [
        {
            ref: 'list',
            selector: 'contatogrid'
        } ],

    init: function() {
      this.control({
            'contatogrid dataview': {
                itemdblclick: this.add
            },
            'contatogrid button[action=add]': {
            	//click: this.editarContato
               	click: this.add
            },
            'contatogrid button[action=delete]': {
                click: this.deleteContato
            },
            'usuarioform button[action=save]': {
                //click: this.updateContato
                click: this.save
            },
            'contatogrid button[action=printerDiario]': {
                click: this.repoterDiario
            }
            ,
            'gridPapeletas button[action=modificar]': {
                click: this.repoterDiario
            }
            
            
            /*,
             'usuarioedit button[action=save]': {
                //click: this.updateContato
                click: this.guardarnuevo
            }
            */
            
            ,
            'contatogrid button[action=printer]': {
                click: this.imprimeReporte
            }
        });  
    },
    guardarnuevo :function(btn){
                        var me = this,
			form = btn.up('usuarioform'),
			win = form.up('window'),
			basicForm = form.getForm(),
			store = this.getStore('datos'),//grid.getStore(),
			record = basicForm.getRecord(),
			values = basicForm.getValues();
                        if(basicForm.isValid())
                        {
                                record = Ext.create('proyecto.model.Agenda');
                                record.set(values);
                                this.getStore('datos').add(record);
                                store.sync();
                                win.close();
                                this.getStore('datos').load();
                                Ext.example.msg('Mensaje', 'Item Creado  Correctamente!!');
                          
                            return true;
                        }
                        else return false;
	},
   save:function(btn){
                        var me = this,
			form = btn.up('usuarioform'),
			win = form.up('window'),
			basicForm = form.getForm(),
			store = this.getStore('datos'),//grid.getStore(),
			record = basicForm.getRecord(),
			values = basicForm.getValues();
                        if(basicForm.isValid())
                        {
                            var nuevo = false;
                            if (values.id > 0){
                                    record.set(values);
                            } else{
                                    record = Ext.create('proyecto.model.Agenda');
                                    record.set(values);
                                    this.getStore('datos').add(record);
                        nuevo = true;
                            }
                            store.sync();
                            win.close();

                            if (nuevo){ //faz reload para atualziar
                                 this.getStore('datos').load();
                                 Ext.example.msg('Mensaje', 'Item Creado  Correctamente!!');
                            }
                            return true;
                        }
                        else return false;
			
                       
	},

    add: function(grid, record){
        var view = Ext.widget('usuarioedit');
        view.setTitle('Editar / Crear Cita');
         if(record){
        	view.down('form').loadRecord(record);
        }

        
    },
    
        repoterDiario: function(grid, record) {
           
                    //this.imprimirDocumentosEnviados('ReporteEdadesRpt', record.data.id, 'Impresion de Cita');
              this.imprimirDocumentosEnviados('ReporteDiario',Ext.getCmp('fecha').getValue(), 'Impresion de Reporte Diario');
        },
               imprimeReporte: function(grid, record) {
            var gridq = Ext.getCmp('gridcitas');
            if(gridq.getSelectionModel().hasSelection())
                {
                    var record = gridq.getSelectionModel().getSelection()[0];
                    this.imprimirDocumentosEnviados('ReporteEdadesRpt', record.data.id, 'Impresion de Cita');
                }
            else Ext.example.msg('Mensaje', 'Seleccione una fila a imprimir');
            if(record){
              grid.getForm().loadRecord(record);
              grid.edit.down('form').loadRecord(record);
            }/*editar*/
        }, 
            
    editarContato: function(grid, record) {
        
        var view = Ext.widget('usuarioedit');
 
        view.down('form').loadRecord(record);
       /*var edit = Ext.create('proyecto.view.Formulario').show();

               /* if(record){
                        edit.down('form').loadRecord(record);
                }*/

      
         
       /* if(record){
            grid.getForm().loadRecord(record);
            grid.edit.down('form').loadRecord(record);
        }*/
        
    },
    
    updateContato: function(button) {
    /*    var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
           // Ext.example.msg('Mesaje', 'Informacion procesado correctamente');
            var novo = false;
        
		if (values.id > 0){
			record.set(values);
		} else{
			record = Ext.create('proyecto.model.Agenda');
			record.set(values);
                         //Ext.getCmp('gridcitas').getStore().add(record);
                         this.getStore('datos').add(record);
			//this.getdatosStore().add(record);
            novo = true;
		}
        
		win.close();
        this.getStore('datos').sync();*/

        /*if (novo){ //faz reload para atualziar
            this.getAgendasStore().load();
        }*/
    },
    
    deleteContato: function(button) {
         var gridq = Ext.getCmp('gridcitas');
            if(gridq.getSelectionModel().hasSelection())
                {
                    var record = gridq.getSelectionModel().getSelection()[0];
                    var	store = this.getStore('datos');
                    //var grid = this.getGrid(),
                    //record = grid.getSelectionModel().getSelection(), 
                   // store = this.getStore();
                    store.remove(record);
                    //this.getStore().sync();
                    store.sync();
                    //faz reload para atualziar
                    this.getStore().load();
                  //  this.imprimirDocumentosEnviados('printDocumentoEnviado', record.data.id, 'Impresion de Cita');
                }
                else
                    {
                         Ext.example.msg('Mensaje', 'Seleccione una fila para eliminar!!');
                    }
    	
    },
 imprimirDocumentosEnviados:function(nombre, params, titulo){
        if(titulo==null) titulo=nombre;
        var open=Ext.get(nombre);
        if(!open){
                var msg = Ext.get('msg');
                msg.load({
                        url: 'reportes/printDocumento.php',
                        scripts: true,
                       params: {params:params,nombre:nombre,titulo:titulo},
                        text: 'Cargando...'
                });
                msg.show();
        }
}
});

   
