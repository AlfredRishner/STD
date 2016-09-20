/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('proyecto.view.abril.ComboMesEjecucion', {
    extend: 'Ext.form.field.ComboBox',
     requires: [
        'Ext.form.field.ComboBox'
    ],
    fieldLabel: '<b>Mes Afecto</b>',
    displayField: 'nombre',
    //id:'IdComboMesGrupo',
    alias: 'widget.ComboMesEjecucion',
    valueField: 'mes',
    name:'mes',
    labelWidth: 130,
    store: {
        fields: [{name: 'mes', type: 'int'}, {name: 'nombre'}],
        data: [
            {mes: 1, nombre: 'Enero'},
            {mes: 2, nombre: 'Febrero'},
            {mes: 3, nombre: 'abril'},
            {mes: 4, nombre: 'Abril'},
            {mes: 5, nombre: 'Mayo'},
            {mes: 6, nombre: 'Junio'},
            {mes: 7, nombre: 'Julio'},
            {mes: 8, nombre: 'Agosto'},
            {mes: 9, nombre: 'Setiembre'},
            {mes: 10, nombre: 'Octubre'},
            {mes: 11, nombre: 'Noviembre'},
            {mes: 12, nombre: 'Diciembre'}]
    },
    listeners: {
            load: function () {
                //this sets the default value to USA after the store loads
               // var combo = Ext.getCmp('countrySearchBox');
                this.setValue(/*this.first().data.code*/"Enero");
            }
         }
})

