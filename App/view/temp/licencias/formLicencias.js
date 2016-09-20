Ext.define('proyecto.view.licencias.formLicencias', {
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
    alias: 'widget.formLicencias',
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
                autoHeight: true,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'id',
                        fieldLabel: 'id',
                        hidden: true
                    }, {
                        xtype: 'fieldset',
                        //width: 888,
                        title: 'Tipo',
                        items: [
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
                            },
                            {
                                xtype: 'textarea',
                                fieldLabel: '<b>Detalle</b>',
                                name: 'descripcion',
                                value: '-.-',
                                allowBlank: false
                            }
                        ]
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: '<b>Programado</b>',
                        name: 'programado',
                       // value: '-.-',
                        allowBlank: false,
                        decimalPrecision:2,
                        allowDecimals:true,
                        decimalSeparator:'.'
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: '<b>Ejecutado Mes</b>',
                        name: 'ejecutado_mes',
                        value: '-.-',
                        allowBlank: false,
                        decimalPrecision:2,
                        allowDecimals:true,
                        decimalSeparator:'.'
                    }
                    , {
                        xtype: 'numberfield',
                        fieldLabel: '<b>Acumulado Mes</b>',
                        name: 'acumulado_mes',
                        value: '-.-',
                        allowBlank: false,
                        decimalPrecision:2,
                        allowDecimals:true,
                        decimalSeparator:'.'
                    }
                    , {
                        xtype: 'numberfield',
                        fieldLabel: '<b>Saldo Mes</b>',
                        name: 'saldo_mes',
                        value: '-.-',
                        allowBlank: false,
                        decimalPrecision:2,
                        allowDecimals:true,
                        decimalSeparator:'.'
                    }
                ]}];

        this.bbar = ['->',
            {
                iconCls: 'guardar',
                text: 'Guardar / Actualizar',
                action: 'guardarLicencias'
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

