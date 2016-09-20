/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('proyecto.view.grupo.ComboMesGrupo', {
    extend: 'Ext.form.field.ComboBox',
     requires: [
        'Ext.form.field.ComboBox'
    ],
    fieldLabel: 'Seleccion Mes',
    displayField: 'mes',
    id:'IdComboMesGrupo',
    alias: 'widget.ComboMesGrupo',
    valueField: 'id',
    labelWidth: 130,
    store: {
        fields: [{name: 'id', type: 'int'}, {name: 'mes'}],
        data: [{id: 1, mes: 'Enero'},
            {id: 2, mes: 'Febrero'},
            {id: 3, mes: 'Marzo'},
            {id: 4, mes: 'Abril'},
            {id: 5, mes: 'Mayo'},
            {id: 6, mes: 'Junio'},
            {id: 7, mes: 'Julio'},
            {id: 8, mes: 'Agosto'},
            {id: 9, mes: 'Setiembre'},
            {id: 10, mes: 'Octubre'},
            {id: 11, mes: 'Noviembre'},
            {id: 12, mes: 'Diciembre'}]
    },
    listeners: {
            load: function () {
                //this sets the default value to USA after the store loads
               // var combo = Ext.getCmp('countrySearchBox');
                this.setValue(/*this.first().data.code*/"Enero");
            }
         }
})

