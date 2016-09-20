<?php
$url = $_REQUEST["url"];
$id = $_REQUEST["identificador"];
$parametros = $_REQUEST["parametros"];
$titulo = $_REQUEST["titulo"];

?>
<div id="<?php echo $id;?>"></div>
<script type="text/javascript">
    function procesarRespuestaGuardarPapeleta(result, action) {
            var json = action.result;
           //var param = getParametro(json.parametros, "msg");
            if(json.success)
            { 
                ventanaEnviarDocumento.close();
                Ext.example.msg('Mensaje',"Guardado Correctamente");//Ext.utiles.msg('Mensaje ',Text2Html("param.valor"));
              
            }
    }

    var papeletaForm = new Ext.form.FormPanel({
        baseCls: 'x-plain',
        labelWidth: 100,
        autoScroll: true,
        url: 'index.php/papeletas/InsertarPapeletas',
        //baseParams:{enviar:1<%=params%>},
        defaultType: 'textfield',
        fieldDefaults: {
            anchor: '100%',
            labelAlign: 'left',
            allowBlank: false,
            combineErrors: true,
            msgTarget: 'side'
        },
        items: [
            {
                xtype: 'fieldset',
                title: 'Informacion de Papelta',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    labelAlign: 'right'
                },
                items: [
                    {fieldLabel: '<b>Motivo</b>', name: 'motivo', allowBlank: false,fieldStyle: 'background-color: #CACACA; background-image: none;'},
                    {fieldLabel: '<b>Hora Salida</b>',xtype: 'timefield',minValue: '8:00 AM',maxValue: '6:00 PM',increment: 15,anchor: '100%',name: 'salida', allowBlank: false,fieldStyle: 'background-color: #CACACA; background-image: none;'},
                    {fieldLabel: '<b>Hora Retorno</b>',xtype: 'timefield',minValue: '8:00 AM',maxValue: '6:00 PM',increment: 15,anchor: '100%',name: 'retorno', allowBlank: false,fieldStyle: 'background-color: #CACACA; background-image: none;'},
                    {fieldLabel: '<b>Tiempo Aut.</b>', name: 'autorizado',fieldStyle: 'background-color: #CACACA; background-image: none;'},
                    {fieldLabel: '<b>Observaciones</b>', name: 'obs', allowBlank: false,value:'-.-',fieldStyle: 'background-color: #CACACA; background-image: none;'},
                    {fieldLabel: '<b>Fecha</b>',xtype:'datefield',value:new Date(), name: 'fecha', allowBlank: false,fieldStyle: 'background-color: #CACACA; background-image: none;'}
                ]
            }]});
    // create the window on the first click and reuse on subsequent clicks
    var ventanaEnviarDocumento = new Ext.Window({
        //	el:'enviarDocumento',
        title: '<?php echo $titulo; ?>',
        layout: 'fit',
        bodyStyle: 'padding:5px;',
        width: 400,
        height: 350,
        minWidth: 400,
        minHeight: 350,
        autoScroll: false,
        maximizable: false,
        plain: true,
        constraintHeader: true,
        modal: true,
        items: [papeletaForm],
        tbar: [{
                text: 'Guardar ',
                tooltip: 'Generar Papeleta',
                iconCls: 'guardar',
                listeners: {
                    click: function() {
                        if (papeletaForm.getForm().isValid()) {
                            papeletaForm.getForm().submit({
                                waitTitle: 'Procesando',
                                waitMsg: 'Por favor Espere...',
                                success: procesarRespuestaGuardarPapeleta,
                                failure: procesarRespuestaGuardarPapeleta
                            });
                        }
                    }
                }
            }]
    });

    ventanaEnviarDocumento.show();

</script>
