Ext.define('proyecto.view.documentos.formArchivo', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.Field'
    ],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 50
    },
    alias: 'widget.formArchivo',
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
            {xtype: 'fileuploadfield',
                anchor: '100%',
                emptyText: 'Selecciona Archivo',
                name: 'ArchivoEnvio',
                fieldLabel: 'Archivo',
                allowBlank: false,
                forceSelection: true
            }
                ];

        this.bbar = ['->',
            {
                iconCls: 'guardar',
                text: 'Subir Archivo',
                action: 'subirarchivo'
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