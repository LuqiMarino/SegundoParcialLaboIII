var general;
(function (general) {
    window.addEventListener("load", function () {
        document.getElementById("btnAlta").addEventListener("click", AltaVehiculo);
        document.getElementById("btnAgregar").addEventListener("click", AgregarVehiculo);
        document.getElementById("slcAgregar").addEventListener("change", CompletarVistaAlta);
        document.getElementById("slcFiltro").addEventListener("change", FiltrarTabla);
        document.getElementById("btnCancelarAgregar").addEventListener("click", CerrarVistaAgregarVehiculo);
        document.getElementById("btnCalcularProm").addEventListener("click", CalcularPromedio);
        document.getElementById("chkID").addEventListener("click", MostrarCampos);
        document.getElementById("chkMarca").addEventListener("click", MostrarCampos);
        document.getElementById("chkModelo").addEventListener("click", MostrarCampos);
        document.getElementById("chkPrecio").addEventListener("click", MostrarCampos);
    });
    var listaVehiculos = new Array();
    function AltaVehiculo() {
        document.getElementById("VntPrincipal").style.opacity = "0.15";
        document.getElementById("VntAlta").hidden = false;
        document.getElementById("lblAgregarCantPuertas").hidden = true;
        document.getElementById("txtAgregarCantPuertas").hidden = true;
        document.getElementById("lblAgregarEs4x4").hidden = true;
        document.getElementById("chkAgregarEs4x4").hidden = true;
        document.getElementById("txtAgregarMarca").value = "";
        document.getElementById("txtAgregarModelo").value = "";
        document.getElementById("txtAgregarPrecio").value = "";
        document.getElementById("slcAgregar").value = "";
        document.getElementById("txtAgregarCantPuertas").value = "";
        document.getElementById("chkAgregarEs4x4").checked = false;
    }
    function CompletarVistaAlta() {
        var slcVehiculo = document.getElementById("slcAgregar").value;
        switch (slcVehiculo) {
            case "Auto":
                document.getElementById("lblAgregarCantPuertas").hidden = false;
                document.getElementById("txtAgregarCantPuertas").hidden = false;
                document.getElementById("lblAgregarEs4x4").hidden = true;
                document.getElementById("chkAgregarEs4x4").hidden = true;
                break;
            case "Camioneta":
                document.getElementById("lblAgregarCantPuertas").hidden = true;
                document.getElementById("txtAgregarCantPuertas").hidden = true;
                document.getElementById("lblAgregarEs4x4").hidden = false;
                document.getElementById("chkAgregarEs4x4").hidden = false;
                break;
            case "0":
                document.getElementById("lblAgregarCantPuertas").hidden = true;
                document.getElementById("txtAgregarCantPuertas").hidden = true;
                document.getElementById("lblAgregarEs4x4").hidden = true;
                document.getElementById("chkAgregarEs4x4").hidden = true;
                break;
        }
    }
    function AgregarVehiculo() {
        var marca = document.getElementById("txtAgregarMarca").value;
        var modelo = document.getElementById("txtAgregarModelo").value;
        var precio = parseInt(document.getElementById("txtAgregarPrecio").value);
        var id = GetProximoID();
        var vehiculo = new general.Vehiculo(id, marca, modelo, precio);
        var slcVehiculo = document.getElementById("slcAgregar").value;
        switch (slcVehiculo) {
            case "Auto":
                var cantPuertas = parseInt(document.getElementById("txtAgregarCantPuertas").value);
                vehiculo = new general.Auto(id, marca, modelo, precio, cantPuertas);
                break;
            case "Camioneta":
                var es4x4 = document.getElementById("chkAgregarEs4x4").checked;
                vehiculo = new general.Camioneta(id, marca, modelo, precio, es4x4);
                break;
        }
        listaVehiculos.push(vehiculo);
        AgregarALaTabla(vehiculo);
        CerrarVistaAgregarVehiculo();
    }
    function GetProximoID() {
        var tabla = document.getElementById("Tabla");
        var cantFilas = tabla.getElementsByTagName("tr").length - 1;
        return cantFilas + 1;
    }
    function AgregarALaTabla(vehiculo) {
        var tabla = document.getElementById("Tabla");
        var tr = document.createElement('tr');
        var ID = document.createElement('td');
        ID.innerText = vehiculo.getID().toString();
        var marca = document.createElement('td');
        marca.innerText = vehiculo.getMarca();
        var modelo = document.createElement('td');
        modelo.innerText = vehiculo.getModelo();
        var precio = document.createElement('td');
        precio.innerText = vehiculo.getPrecio().toString();
        tr.appendChild(ID);
        tr.appendChild(marca);
        tr.appendChild(modelo);
        tr.appendChild(precio);
        tabla.appendChild(tr);
    }
    function CerrarVistaAgregarVehiculo() {
        document.getElementById("VntPrincipal").style.opacity = "1";
        document.getElementById("VntAlta").hidden = true;
    }
    function LimpiarTabla() {
        var tabla = document.getElementById("Tabla");
        var cantFilas = tabla === null || tabla === void 0 ? void 0 : tabla.getElementsByTagName("tr").length;
        tabla.removeChild(tabla.lastElementChild);
        for (var i = 0; i < cantFilas; i++) {
            if (tabla.firstElementChild != tabla.lastElementChild)
                tabla.removeChild(tabla.lastElementChild);
        }
    }
    function FiltrarTabla() {
        var slcFiltro = document.getElementById("slcFiltro").value;
        console.log("ENTRO A FILTRAR TABLA");
        switch (slcFiltro) {
            case "Auto":
                LimpiarTabla();
                var listaAutos = listaVehiculos.filter(function (x) { return x instanceof general.Auto; });
                for (var i = 0; i < listaAutos.length; i++) {
                    AgregarALaTabla(listaAutos[i]);
                }
                break;
            case "Camioneta":
                LimpiarTabla();
                var listaCamionetas = listaVehiculos.filter(function (x) { return x instanceof general.Camioneta; });
                for (var i = 0; i < listaCamionetas.length; i++) {
                    AgregarALaTabla(listaCamionetas[i]);
                }
                break;
            default:
                for (var i = 0; i < listaVehiculos.length; i++)
                    AgregarALaTabla(listaVehiculos[i]);
        }
    }
    function CalcularPromedio() {
        var totalPrecio = listaVehiculos.reduce(function (total, x) {
            return total += x.getPrecio();
        }, 0);
        var promedio = totalPrecio / listaVehiculos.length;
        if (promedio > -1)
            document.getElementById("txtPromedio").value = promedio.toString();
        else
            document.getElementById("txtPromedio").value = "0";
    }
    function MostrarCampos() {
        var chkID = document.getElementById("chkID").checked;
        var chkMarca = document.getElementById("chkMarca").checked;
        var chkModelo = document.getElementById("chkModelo").checked;
        var chkPrecio = document.getElementById("chkPrecio").checked;
        var tabla = document.getElementById("Tabla");
    }
})(general || (general = {}));
