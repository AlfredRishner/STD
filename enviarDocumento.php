<?php
enviarDocumento('Nueva Papeleta','-','nuevapapeleta');
$url = $_REQUEST["url"];
$id = $_REQUEST["nuevapapeleta"];

?>
<div id="enviarDocumento"></div>
<script type="text/javascript">

    function procesarRespuestaSendMail(request, action) {
        try {
            var json = action.result;
            var param = getParametro(json.parametros, "msg");
            Ext.MessageBox.alert('Mensaje ', Text2Html(param.valor));
            return;
        } catch (Exception) {
            Ext.MessageBox.alert('Error', 'Problemas durante el proceso. Perdone las molestias');
        }
    }



    var papeletaForm = new Ext.form.FormPanel({
        baseCls: 'x-plain',
        labelWidth: 100,
        autoScroll: true,
        url: '<%=url%>',
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
                    {fieldLabel: '<b>Hora Salida</b>',xtype: 'timefield',minValue: '8:00 AM',maxValue: '6:00 PM',increment: 15,anchor: '100%',name: 'destinatario', allowBlank: false,fieldStyle: 'background-color: #CACACA; background-image: none;'},
                    {fieldLabel: '<b>Hora Retorno</b>',xtype: 'timefield',minValue: '8:00 AM',maxValue: '6:00 PM',increment: 15,anchor: '100%',name: 'destinatario', allowBlank: false,fieldStyle: 'background-color: #CACACA; background-image: none;'},
                    {fieldLabel: '<b>Tiempo Aut.</b>', name: 'destinatario',fieldStyle: 'background-color: #CACACA; background-image: none;'},
                    {fieldLabel: '<b>Observaciones</b>', name: 'destinatario', allowBlank: false,value:'-.-',fieldStyle: 'background-color: #CACACA; background-image: none;'},
                    {fieldLabel: '<b>Fecha</b>',xtype:'datefield',value:new Date(), name: 'destinatario', allowBlank: false,fieldStyle: 'background-color: #CACACA; background-image: none;'}
                ]
            }]});
    // create the window on the first click and reuse on subsequent clicks
    var ventanaEnviarDocumento = new Ext.Window({
        //	el:'enviarDocumento',
        title: 'Registro Papeleta',
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
                                success: procesarRespuestaSendMail,
                                failure: procesarRespuestaSendMail
                            });
                        }
                    }
                }
            }]
    });

    ventanaEnviarDocumento.show();

</script>
