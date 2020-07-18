namespace general{
    window.addEventListener("load", function(){
        (<HTMLInputElement>document.getElementById("btnAlta")).addEventListener("click", AltaVehiculo);
        (<HTMLInputElement>document.getElementById("btnAgregar")).addEventListener("click", AgregarVehiculo);
        (<HTMLInputElement>document.getElementById("slcAgregar")).addEventListener("change", CompletarVistaAlta);
        (<HTMLInputElement>document.getElementById("slcFiltro")).addEventListener("change", FiltrarTabla);
        (<HTMLInputElement>document.getElementById("btnCancelarAgregar")).addEventListener("click", CerrarVistaAgregarVehiculo);
        (<HTMLInputElement>document.getElementById("btnCalcularProm")).addEventListener("click", CalcularPromedio);
        (<HTMLInputElement>document.getElementById("chkID")).addEventListener("click", MostrarCampos);
        (<HTMLInputElement>document.getElementById("chkMarca")).addEventListener("click", MostrarCampos);
        (<HTMLInputElement>document.getElementById("chkModelo")).addEventListener("click", MostrarCampos);
        (<HTMLInputElement>document.getElementById("chkPrecio")).addEventListener("click", MostrarCampos);
        

        
    });

    var listaVehiculos:Array<Vehiculo> = new Array<Vehiculo>();

    function AltaVehiculo():void{
        document.getElementById("VntPrincipal").style.opacity = "0.15";
        document.getElementById("VntAlta").hidden = false;
        document.getElementById("lblAgregarCantPuertas").hidden = true;
        document.getElementById("txtAgregarCantPuertas").hidden = true;
        document.getElementById("lblAgregarEs4x4").hidden = true;
        document.getElementById("chkAgregarEs4x4").hidden = true;
        (<HTMLInputElement>document.getElementById("txtAgregarMarca")).value = "";
        (<HTMLInputElement>document.getElementById("txtAgregarModelo")).value = "";
        (<HTMLInputElement>document.getElementById("txtAgregarPrecio")).value = "";
        (<HTMLInputElement>document.getElementById("slcAgregar")).value = "";
        (<HTMLInputElement>document.getElementById("txtAgregarCantPuertas")).value = "";
        (document.getElementById("chkAgregarEs4x4") as HTMLInputElement).checked = false;
    }

    function CompletarVistaAlta():void{
        var slcVehiculo:string = (<HTMLInputElement>document.getElementById("slcAgregar")).value;
        
        switch(slcVehiculo){
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

    function AgregarVehiculo():void{
        var marca:string = (<HTMLInputElement>document.getElementById("txtAgregarMarca")).value;
        var modelo:string = (<HTMLInputElement>document.getElementById("txtAgregarModelo")).value;
        var precio:number = parseInt((<HTMLInputElement>document.getElementById("txtAgregarPrecio")).value);
        var id:number = GetProximoID();
        var vehiculo:Vehiculo = new Vehiculo(id, marca, modelo, precio);
        var slcVehiculo:string = (<HTMLInputElement>document.getElementById("slcAgregar")).value;
        switch(slcVehiculo){
            case "Auto":
                var cantPuertas:number = parseInt((<HTMLInputElement>document.getElementById("txtAgregarCantPuertas")).value);
                vehiculo = new Auto(id, marca, modelo, precio, cantPuertas)
                break;
            case "Camioneta":
                var es4x4:boolean = (document.getElementById("chkAgregarEs4x4") as HTMLInputElement).checked;
                vehiculo = new Camioneta(id, marca, modelo, precio, es4x4);
                break;
        }
        listaVehiculos.push(vehiculo);
        AgregarALaTabla(vehiculo);
        CerrarVistaAgregarVehiculo();
    }

    function GetProximoID():number{
        var tabla = document.getElementById("Tabla");
        var cantFilas = tabla.getElementsByTagName("tr").length - 1;
        return cantFilas + 1;
    }

    function AgregarALaTabla(vehiculo:Vehiculo):void{
        var tabla = document.getElementById("Tabla");
        var tr=document.createElement('tr');

        var ID=document.createElement('td');
        ID.innerText=vehiculo.getID().toString();
        var marca=document.createElement('td');
        marca.innerText=vehiculo.getMarca();
        var modelo=document.createElement('td');
        modelo.innerText=vehiculo.getModelo();
        var precio=document.createElement('td');
        precio.innerText=vehiculo.getPrecio().toString();

        tr.appendChild(ID);
        tr.appendChild(marca);
        tr.appendChild(modelo);
        tr.appendChild(precio);
        tabla.appendChild(tr); 
    }

    function CerrarVistaAgregarVehiculo():void{
        document.getElementById("VntPrincipal").style.opacity = "1";
        document.getElementById("VntAlta").hidden = true;
    }

    function LimpiarTabla():void{
        var tabla = document.getElementById("Tabla");
        var cantFilas = tabla?.getElementsByTagName("tr").length

        tabla.removeChild(tabla.lastElementChild);
        for (var i:number=0;i<cantFilas;i++)
        {
            if (tabla.firstElementChild != tabla.lastElementChild)
                tabla.removeChild(tabla.lastElementChild);
        }        
    }

    function FiltrarTabla():void{
        var slcFiltro:string = (<HTMLInputElement>document.getElementById("slcFiltro")).value;
        console.log("ENTRO A FILTRAR TABLA");
        switch(slcFiltro){
            case "Auto":
                LimpiarTabla();
                var listaAutos = listaVehiculos.filter(x => x instanceof Auto);
                for(var i:number=0;i<listaAutos.length;i++){
                    AgregarALaTabla(listaAutos[i]);
                }
                break;
            case "Camioneta":
                LimpiarTabla();
                var listaCamionetas = listaVehiculos.filter(x => x instanceof Camioneta);
                for(var i:number=0;i<listaCamionetas.length;i++){
                    AgregarALaTabla(listaCamionetas[i]);
                }
                break;
            default:
                for(var i:number=0;i<listaVehiculos.length;i++)
                    AgregarALaTabla(listaVehiculos[i]);
        }
    }

    function CalcularPromedio():void{
        var totalPrecio = listaVehiculos.reduce(function(total,x){
            return total += x.getPrecio();
        }, 0);
        var promedio = totalPrecio / listaVehiculos.length;
        
        if (promedio > -1)
            (<HTMLInputElement>document.getElementById("txtPromedio")).value = promedio.toString();
        else
            (<HTMLInputElement>document.getElementById("txtPromedio")).value = "0";
    }

    function MostrarCampos():void{
        var chkID:boolean = (document.getElementById("chkID") as HTMLInputElement).checked;
        var chkMarca:boolean = (document.getElementById("chkMarca") as HTMLInputElement).checked;
        var chkModelo:boolean = (document.getElementById("chkModelo") as HTMLInputElement).checked;
        var chkPrecio:boolean = (document.getElementById("chkPrecio") as HTMLInputElement).checked;
        var tabla = document.getElementById("Tabla");
    }

}