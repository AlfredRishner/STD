Ext.define('proyecto.view.grupo.formGrupo', {
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
    alias: 'widget.formGrupo',
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
                title: "Registro de Grupo",
                autoHeight: true,
                items: [{
                        xtype: 'textfield',
                        name: 'id',
                        fieldLabel: 'id',
                        hidden: true
                    },
                    {
                        xtype: 'textfield',
                        name: 'motivo',
                        allowBlank: false,
                        fieldLabel: '<b>Motivo</b>',
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                        //style : {textTransform: "uppercase"}
                    }, {
                        xtype: "datefield",
                        fieldLabel: "<b>Fecha</b>",
                        name: "fecha",
                        format: 'd/m/Y',
                        submitFormat: 'Y-m-d',
                        value: new Date(),
                        allowBlank: false
                    }, {
                        xtype: 'timefield',
                        name: 'horasalida',
                        fieldLabel: '<b>Hora Salida</b>',
                        minValue: '8:00 AM',
                        allowBlank: false,
                        maxValue: '5:00 PM',
                        increment: 15,
                        format:"H:i:s",
                        value:'8:00 AM',
                        anchor: '100%'
                    }, {
                        xtype: 'timefield',
                        name: 'horaretorno',
                        fieldLabel: '<b>Hora Retorno</b>',
                        minValue: '8:00 AM',
                        value:'8:00 AM',
                        allowBlank: false,
                        format:"H:i:s",
                        maxValue: '5:00 PM',
                        increment: 15,
                        anchor: '100%'
                    }, {
                        xtype: "textfield",
                        fieldLabel: "<b>Tiempo Autorizado</b>",
                        allowBlank: false,
                        name: "tiempoautorizado",
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    }, {
                        xtype: "textarea",
                        fieldLabel: "<b>Observaciones</b>",
                        allowBlank: false,
                        name: "observaciones",
                        value: '-.-',
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },
                    {
                        xtype: 'textfield',
                        name: 'firmajefeinmediato',
                        value: 0,
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        name: 'firmaadministracion',
                        value: 0,
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        name: 'firmapersonal',
                        value: 0,
                        hidden: true
                    }

                ]}];

        this.bbar = ['->',
            {
                iconCls: 'guardar',
                text: 'Guardar / Actualizar',
                action: 'guardarPapeleta'
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