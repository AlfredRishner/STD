Ext.define('proyecto.view.agosto.formAgosto', {
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
    alias: 'widget.formAgosto',
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
                title: "Registro de Ejecucion",
                autoHeight: true,
                items: [{
                        xtype: 'textfield',
                        name: 'id',
                        fieldLabel: 'id',
                        hidden: true
                    },
                    {
                        xtype: 'combobox',
                        hiddenName: 'idespecifica',
                        typeAhead: true,
                        triggerAction: 'all',
                        selectOnFocus: true,
                        forceSelection: true,
                        allowBlank: true,
                        name: 'idespecifica',
                        anchor: '90%',
                        mode: 'remote',
                        fieldLabel: '<b>Especifica</b>',
                        displayField: 'especifica',
                        valueField: 'idespecifica',
                        store: 'StoreComboEspecificas'
                    },{
                        xtype: 'combobox',
                        hiddenName: 'idgrupo',
                        typeAhead: true,
                        triggerAction: 'all',
                        selectOnFocus: true,
                        forceSelection: true,
                        allowBlank: true,
                        name: 'idgrupo',
                        anchor: '90%',
                        mode: 'remote',
                        fieldLabel: '<b>Grupo</b>',
                        displayField: 'detalle',
                        valueField: 'idgrupo',
                        store: 'StoreComboGrupo'
                    },
                    {
                        xtype: 'textareafield',
                        name: 'detalle',
                        allowBlank: false,
                        fieldLabel: '<b>Detalle</b>',
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                        //style : {textTransform: "uppercase"}
                    }, {
                        xtype: "numberfield",
                        fieldLabel: "<b>Parcial</b>",
                        name: "parcial",
                        allowBlank: false,
                        decimalPrecision:2,
                        allowDecimals:true,
                        decimalSeparator:'.'
                    }, {
                        xtype: "textfield",
                        fieldLabel: "<b>Doc. Fuente</b>",
                        allowBlank: false,
                        name: "doc_fuente",
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    },{
                        xtype: "textfield",
                        fieldLabel: "<b>Reg. siaf</b>",
                        allowBlank: true,
                        name: "siaf",
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    }, {
                        xtype: "textfield",
                        fieldLabel: "<b>Proveedor</b>",
                        allowBlank: true,
                        name: "proveedor",
                        listeners: {
                            change: function(field, newValue, oldValue) {
                                field.setValue(newValue.toUpperCase());
                            }
                        }
                    }
                    /*{xtype:'ComboMesEjecucion'}*/

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