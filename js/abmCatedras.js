$(document).ready(function () {
    //NACHO COMENTA EL CODIGO!!!!
    $(".alta").hide();
    $(".baja").hide();
    $(".modificacion").hide();
    $("#submit").hide();
    $("#btnAlta").click(function () {
        $(".baja").hide();
        $(".modificacion").hide();
        $(".alta").show();
        $("#submit").show();
    });

    $("#btnBaja").click(function () {
        $(".alta").hide();
        $(".modificacion").hide();
        $(".baja").show();
        $("#submit").show();
    });

    $("#btnModificacion").click(function () {
        $(".alta").hide();
        $(".baja").hide();
        $(".modificacion").show();
        $("#submit").show();
    });
});


