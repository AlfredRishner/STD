/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.view.documentos.gridArchivos', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridArchivos',
    config : {},
    constructor : function(config){
        this.initConfig(config);
        return this.callParent(arguments);
    },
    width : '100%',
    height : 400,
    //selType : 'checkboxmodel',
    //title : 'Students Information',
    selModel : 
    {
        mode : 'MULTI'
    },
    viewConfig : 
    {
        stripeRows : true
    },
    initComponent : function(){
        Ext.apply(this, 
        {
           // store : 'School.store.Student',
            columns : [{
                text : "Id",
                dataIndex : 'Id',
                hidden : false,
                width : 35
            }, 
            {
                text : "First Name",
                flex : 1,
                dataIndex : 'firstName'
            }, 
            {
                text : "Middle Name",
                flex : 1,
                dataIndex : 'middleName'
            }],
            dockedItems : [{
                     xtype: 'toolbar',
                //dock : 'bottom',
                ui : 'footer',
                layout : 
                {
                    pack : 'Lefth'
                },
                defaults : 
                {
                    minWidth : 80
                },
                items : [
                {
                    text : 'Subir',
                    itemId : 'btnCreate',
                     action: 'VentanaSubirArch'
                }/*, 
                {
                    text : 'Load Data',
                    itemId : 'btnLoad'
                }, 
                {
                    text : 'Save',
                    itemId : 'btnSave'
                }, 
                {
                    text : 'Delete',
                    itemId : 'btnDelete'
                }*/]
            }]
        });
        
        this.callParent(arguments);
    }
});

