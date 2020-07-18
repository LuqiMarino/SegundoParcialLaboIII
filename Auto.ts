namespace general{
    export class Auto extends Vehiculo{
        private cantPuertas:number;

        constructor(id:number, marca:string, modelo:string, precio:number, cantPuertas:number){
            super(id,marca,modelo,precio);
            this.cantPuertas=cantPuertas;
        }

        public getCantPuertas():number{
            return this.cantPuertas;
        }
    }
}