$(document).ready(function () {
    //Acciones para esconder los botones
    $(".alta").hide();
    $(".baja").hide();
    $(".modificacion").hide();
    $("#submit_alta").hide();
    $("#submit_baja").hide();
    $("#submit_modificacion").hide();

    //Funcion para mostrar el panel de alta y esconder todos los otros paneles
    $("#btnAlta").click(function () {
        $("#operacion").val("alta");
        $(".baja").hide();
        $(".modificacion").hide();
        $(".alta").show();
        $("#submit_alta").show();
        $("#submit_baja").hide();
        $("#submit_modificacion").hide();
    });

    //Funcion para mostrar el panel de baja y esconder todos los otros paneles
    $("#btnBaja").click(function () {
        $("#operacion").val("baja");
        $(".alta").hide();
        $(".modificacion").hide();
        $(".baja").show();
        $("#submit_alta").hide();
        $("#submit_baja").show();
        $("#submit_modificacion").hide();
    });

    //Funcion para mostrar el panel de modificacion y esconder todos los otros paneles
    $("#btnModificacion").click(function () {
        $("#operacion").val("modificacion");
        $(".alta").hide();
        $(".baja").hide();
        $(".modificacion").show();
        $("#submit_alta").hide();
        $("#submit_baja").hide();
        $("#submit_modificacion").show();
    });

    $("#submit").click(function () {
        $("input, select").val('');
    });
});

