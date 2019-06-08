$(document).ready(function () {

    //Acciones para esconder los botones
    $(".alta").hide();
    $(".baja").hide();
    $(".listar").hide();
    $(".modificacion").hide();
    $("#submit_alta").hide();
    $("#submit_baja").hide();
    $("#submit_modificacion").hide();

    //Funcion para mostrar el panel de alta y esconder todos los otros paneles
    $("#btnAlta").click(function () {
        $("#operacion").val("alta");
        $(".baja").hide();
        $(".listar").hide();
        $(".modificacion").hide();
        $("#submit_baja").hide();
        $("#submit_modificacion").hide();
        $(".alta").show();
        $("#submit_alta").show();
    });

    //Funcion para mostrar el panel de baja y esconder todos los otros paneles
    $("#btnBaja").click(function () {
        $("#operacion").val("baja");
        $(".alta").hide();
        $(".listar").hide();
        $(".modificacion").hide();
        $("#submit_alta").hide();
        $("#submit_modificacion").hide();
        $(".baja").show();
        $("#submit_baja").show();
    });

    //Funcion para mostrar el panel de modificacion y esconder todos los otros paneles
    $("#btnModificacion").click(function () {
        $("#operacion").val("modificacion");
        $(".alta").hide();
        $(".baja").hide();
        $(".listar").hide();
        $("#submit_alta").hide();
        $("#submit_baja").hide();
        $(".modificacion").show();
        $("#submit_modificacion").show();
    });

    $("#btnListar").click(function () {
        $("#operacion").val("Listar");
        $(".alta").hide();
        $(".baja").hide();
        $(".modificacion").hide();
        $("#submit_alta").hide();
        $("#submit_baja").hide();
        $("#submit_modificacion").hide();
        $(".listar").show();
    });

    // Funcion para limpiar valores de inputs y selects al dar click en boton guardar
    $("#submit").click(function () {
        $(".empty").val('');
    });
});

