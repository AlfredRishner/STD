<?php
	$params = $_REQUEST["params"];
	$nombre = $_REQUEST["nombre"];
	$titulo = $_REQUEST["titulo"];
?>
<div id="print<?php echo $nombre;?>"></div>
<script type="text/javascript">
Ext.create('Ext.window.Window', {
    //el:'print<?php echo $nombre; ?>',
                title:'<?php echo $titulo;?>',
	        layout:'fit',
	        bodyStyle:'padding:5px;',
	        width:800,
                constrainHeader:true,
	        height:550,
                modal:true,
	        minWidth: 800,
                minHeight: 550,
                autoScroll: false,
	        maximizable:true,
	        plain: true,
                items : [{
                            frame: false,
                            border: false,
                            xtype : "component",
                            autoEl : {
                                tag : "iframe",
                                src: "reportes/<?php echo $nombre; ?>.php?<?php echo $params; ?>"
                            }
                        }]
                //html:"<iframe src='reportes/ReporteEdadesRpt.php' height='100%' width='100%'>"
             
	       // items:new Ext.ux.IFrameComponent({ id: 'framePrint<?php echo $nombre;?>', url: '<?php echo 'reportes/'.$nombre.'.php';?>?id=<?php echo $id; ?>&date='+new Date(), name: 'framePrint<?php    echo $nombre;?>'})
	        //autoLoad: {url: 'cartaSiniestroToPdf.jsp', params: 'id=<%=id%>', scripts: true, scope: this}

}).show();
 

</script>

      
    
       
