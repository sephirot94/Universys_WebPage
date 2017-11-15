//Ejecuta metodo logout cuando le das click al boton Cerrar Sesion
$(document).ready(function() {
    $("#btnCerrarSesion").click(function() {
        var lc = new LoginControllerLocal;
        lc.logout();
    });
});