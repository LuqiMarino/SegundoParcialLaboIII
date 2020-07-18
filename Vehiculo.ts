namespace general{
    export class Vehiculo{
        private id:number;
        private marca:string;
        private modelo:string;
        private precio:number;

        constructor(id:number, marca:string, modelo:string, precio:number){
            this.id=id;
            this.marca=marca;
            this.modelo=modelo;
            this.precio=precio;
        }

        public getMarca():string{
            return this.marca;
        }
        
        public getModelo():string{
            return this.modelo;
        }

        public getPrecio():number{
            return this.precio;
        }

        public getID():number{
            return this.id;
        }
    }
}