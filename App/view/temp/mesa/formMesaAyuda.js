Ext.define('proyecto.view.mesa.formMesaAyuda', {
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
    alias: 'widget.formMesaAyuda',
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
    initComponent: function() {
        this.items = [
            {
                xtype: "fieldset",
                title: "Reporte Mesa Ayuda",
                autoHeight: true,
                items: [{
                        xtype: 'textfield',
                        name: 'id',
                        fieldLabel: 'id',
                        hidden: true
                    }, {
                        xtype: "textfield",
                        fieldLabel: "<b>Asunto</b>",
                        allowBlank: false,
                        name: "asunto",
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        xtype: 'combobox',
                        hiddenName: 'idproioridad',
                        typeAhead: true,
                        triggerAction: 'all',
                        tpl: new Ext.XTemplate ('Prioridad de Atencion...',
                    '<tpl for=".">',
                    '<div class="x-boundlist-item">',
                    '<span style="background-color: {color};" class="color-box-icon"></span>{value}',
                    '</div>',
                    '</tpl>'
                ),
                        selectOnFocus: true,
                        forceSelection: true,
                        allowBlank: true,
                        name: 'prioridad',
                        anchor: '90%',
                        mode: 'remote',
                        fieldLabel: '<b>Prioridad</b>',
                        displayField: 'text',
                        valueField: 'value',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['value', 'text', 'color'],
                            data : [
                                {value:"Alto", text:"Alto", color:"yellow"},
                                {value:"Medio", text:"Medio", color:"#FFA500"},
                               {value:"Bajo", text:"Bajo", color:"blue"}
                            ]
                        })
                    }
                    ,
                    {
                     flex: 1,
                     fieldLabel: '<b>Consulta</b>',
                        xtype: 'htmleditor',
                        itemId: 'myEditor',
                        name:'consulta',
                        height: 200,
                        style: 'background-color: white;',
                        value: 'Escriba Aqui su consulta....'
                    
                    },
                    {
                    xtype: 'fileuploadfield',
                    id: 'filedata',
                    emptyText: 'Seleccione Archivo...',
                    fieldLabel: 'File',
                    buttonText: 'Browse'
                }
                ]}];

        this.bbar = ['->',
            {
                iconCls: 'guardar',
                text: 'Guardar / Actualizar',
                action: 'guardarEjecucion'
                        /* handler: function(){
                         this.up('usuarioform').isValid();
                         }*/
            }
            , {
                text: 'Cancelar',
                action: 'cancel',
                itemId: 'cancelar',
                iconCls: 'cancel',
                handler: function() {
                    this.up('window').close();
                }
            }
        ];

        this.callParent(arguments);
    }
});