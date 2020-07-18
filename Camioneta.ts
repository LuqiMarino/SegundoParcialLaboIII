namespace general{
    export class Camioneta extends Vehiculo{
        private es4x4:boolean;

        constructor(id:number, marca:string, modelo:string, precio:number, es4x4:boolean){
            super(id,marca,modelo,precio);
            this.es4x4=es4x4;
        }

        public getEs4x4():boolean{
            return this.es4x4;
        }
    }
}