export class Carta{
    valor:any;
    palo:any;

    constructor(valor:any,palo:any){
        this.palo = palo;
        this.valor = valor;
    }
    toString(){
        return "assets/images/cartas/"+this.valor+""+this.palo+".svg";
    }
}