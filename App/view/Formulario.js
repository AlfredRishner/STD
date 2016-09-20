Ext.define('proyecto.view.Formulario', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.form.Field'
		],
	defaultType: 'textfield',
	defaults: {
		allowBlank: false,
		labelAlign: 'left',
		labelWidth: 150
	},
	alias: 'widget.usuarioform',
        padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                   // allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },

	initComponent: function(){

		this.items = [
                            {
                                xtype:"fieldset",
                                title:"Registro",
                                autoHeight:true,
                                items:[{
                                xtype: 'textfield',
                                name : 'id',
                                fieldLabel: 'id',
                                hidden:true
                            },{
                                xtype:"textfield",
                                fieldLabel:"<b>visitante</b>",
                                name:"visitante",
                                allowBlank:false
                          },{
                                xtype:"textfield",
                                fieldLabel:"<b>DNI</b>",
                                allowBlank:false,
                                name:"dni"
                          },{
                                xtype:"datefield",
                                fieldLabel:"<b>Fecha Cita</b>",
                                format:'Y-m-d',
                                value:new Date(),
                                allowBlank:false,
                                name:"fecha"
                          },{
                                xtype:"timefield",
                                minValue: '8:00 AM',
                                maxValue: '6:00 PM',
                                //forceSelection:true,
                                fieldLabel:"<b>Hora ingreso</b>",
                                allowBlank:false,
                                valueField:'horaingreso',
                             //   displayField:'horaingreso',
                                name:"horaingreso"
                          },{
                                xtype:"timefield",
                                fieldLabel:"<b>Hora Salida</b>",
                                minValue: '8:00 AM',
                                maxValue: '6:00 PM',
                                valueField:'horasalida',
                                allowBlank:false,
                                name:"horasalida"
                          },{
                            xtype:"textfield",
                            fieldLabel:"<b>Procedencia</b>",
                            allowBlank:false,
                            name:"procedencia"
                          },{
                            xtype:"textarea",
                            fieldLabel:"<b>Motivo</b>",
                            allowBlank:false,
                            name:"motivo"
                          },{
                            xtype:"textfield",
                            fieldLabel:"<b>Observacion</b>",
                            name:"observacion"
                            },{               
                            xtype: 'combo',
                            name: 'oficina',
                            fieldLabel: '<b>Oficina</b>',
                          //  hiddenName:'id_oficina',
                            valueField:'oficina',
                            typeAhead: true,
                            mode: 'remote',
                            minChars:2,
                            triggerAction: 'all',
                            emptyText:'Selecciona Oficina..',
                            selectOnFocus:true,
                           // forceSelection:true,
                            anchor:'90%',
                            allowBlank:false,
                            editable : false,
                            queryMode: 'local',
                            displayField: 'oficina',
                            store: Ext.create('Ext.data.Store', {
                                              fields: ['id','oficina']
                                                                    ,
                                                proxy: {
                                                        type: 'ajax',
                                                        url: 'index.php/oficinas/listadoOficinas',
                                                        reader: {
                                                                type: 'json',
                                                                root: 'registros',
                                                                totalProperty: 'total',
                                                                successProperty: 'success'
                                                            }
                                                    },
                                                    autoLoad: true
                                            })
                                  },
                                    {
                                        xtype:"textfield",
                                        fieldLabel:"<b>Atiende</b>",
                                        name:"personabusca"
                                    }]
  }

                ]
            
		this.bbar = ['->',
			{
                        iconCls: 'guardar',
                        text: 'Guardar / Actualizar',
                        action: 'save'
                       /* handler: function(){
					this.up('usuarioform').isValid();
				}*/
                        }
			,{
				text: 'Cancelar',
				action: 'cancel',
				itemId: 'cancelar',
				iconCls: 'cancel',
				handler: function(){
					this.up('window').close();
				}
			}
		];
			
		this.callParent(arguments);
	}
});
/*Ext.define('proyecto.view.Formulario', {
    extend: 'Ext.window.Window',
    alias : 'widget.contatoform',
    requires: ['Ext.form.Panel','Ext.form.field.Text'],
    title : 'Editar / Crear Cita',
    layout: 'fit',
    autoShow: true,
    width: 380,
    constrainHeader:true,
    modal:true,
    iconCls: 'icon-user',
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                //contatoform
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name : 'id',
                        fieldLabel: 'id',
                        hidden:true
                    },
{
    xtype:"fieldset",
    title:"Registro",
    autoHeight:true,
    items:[{
        xtype:"textfield",
        fieldLabel:"Nombres",
        name:"nombres"
      },{
        xtype:"textfield",
        fieldLabel:"Dni",
        name:"dni"
      },{
        xtype:"datefield",
        fieldLabel:"Fecha Cita",
        name:"fecha"
      },{
        xtype:"timefield",
        minValue: '8:00 AM',
        maxValue: '6:00 PM',
        fieldLabel:"Hora Ingreso",
        name:"horaingreso"
      },{
        xtype:"timefield",
        fieldLabel:"Hora Salida",
        minValue: '8:00 AM',
        maxValue: '6:00 PM',
        name:"horasalida"
      },{
        xtype:"textfield",
        fieldLabel:"Procedencia",
        name:"procedencia"
      },{
        xtype:"textfield",
        fieldLabel:"Motivo",
        name:"motivo"
      },{
        xtype:"textfield",
        fieldLabel:"Observacion",
        name:"observacion"
        },{               
        xtype: 'combo',
        fieldLabel: 'Oficina',
        name: 'Oficina',
        width: 300,
        queryMode: 'local',
        triggerAction: 'all',
        valueField: 'id',
        displayField: 'nombre',
        store: Ext.create('Ext.data.Store', {
                          fields: ['id','nombre']
                                                ,
                            proxy: {
                                    type: 'ajax',
                                    url: 'index.php/oficinas/listadoOficinas',
                                    reader: {
                                            type: 'json',
                                            root: 'registros',
                                            totalProperty: 'total',
                                            successProperty: 'success'
                                        }
                                },
                                autoLoad: true
                        })
              },{
        xtype:"textfield",
        fieldLabel:"Atiende",
        name:"personabusca"
      }]
  }

                ]
            }
        ];
        
         this.dockedItems = [{
           xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'guardar',
                text: 'Guardar / Actualizar',
                action: 'save'
            },{
                iconCls: 'icon-reset',
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
*/