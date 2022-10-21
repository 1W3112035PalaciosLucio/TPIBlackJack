import { Injectable } from '@angular/core';
import {Carta} from "../Interfaces/Carta";

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor() {
    this.generarCartas();
   }

  palos  = ["S","H","D","C"];
  mazo: Carta[] =[];
  cartasJugador: Carta[] =[];
  cartasCrupier: Carta[] =[];
  puntosCrupier = 0;
  puntosJugador = 0;

  generarCartas(){
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        this.mazo.push(new Carta(j,this.palos[i]));   
      } 
    }
    this.mezclarCartas();
  }

  mezclarCartas(){
    for (let i = 0; i < 100; i++) {
      this.mazo.splice(Math.random() * 52, 0, this.mazo[0]);
      this.mazo.shift();
    };
  }

  pedirCarta():Carta{
    const cartaJugador = this.mazo[Math.floor(Math.random()*this.mazo.length)]
    return cartaJugador;
  }

  iniciarJugador():Carta[]{

    for (let i = 0; i < 2; i++) {
      const cartaJugador = this.mazo[Math.floor(Math.random()*this.mazo.length)];
      this.cartasJugador.push(cartaJugador);
    } 
    return this.cartasJugador

  }

  iniciarCrupier():Carta[]{

    for (let i = 0; i < 1; i++) {
      const cartaCrupier = this.mazo[Math.floor(Math.random()*this.mazo.length)];
      this.cartasCrupier.push(cartaCrupier);
    } 
    return this.cartasCrupier
  }

  generarCartasCrupier():Carta[]{

    while(this.puntosCrupier < 17){
      const cartaCrupier = this.mazo[Math.floor(Math.random()*this.mazo.length)];
      this.cartasCrupier.push(cartaCrupier);
      let puntos = this.puntosCrupier;
      
      if(cartaCrupier.valor >= 10 )
      {
        this.puntosCrupier += 10;  
      }
      else if(cartaCrupier.valor == 1 && puntos + 11 <= 21)//el as suma 11 si la cantidad de puntos del crupier no se pasa de 21
      {
        this.puntosCrupier += 11;
      }

      else
      {
      this.puntosCrupier += cartaCrupier.valor;
      }

    }
    return this.cartasCrupier;  
  } 

  calcularPuntosJugador():number{
    this.puntosJugador = 0;
    for (let index = 0; index < this.cartasJugador.length; index++) {
      if(this.cartasJugador[index].valor >= 10)
      {
        this.puntosJugador += 10;  
      }

      else 
      {
      this.puntosJugador += this.cartasJugador[index].valor;
      }
    }
    return this.puntosJugador;
  }

  calcularPuntosCupier():number{
    this.puntosCrupier = 0;
    let puntos = this.puntosCrupier;
    for (let index = 0; index < this.cartasCrupier.length; index++) {
      if(this.cartasCrupier[index].valor >= 10 )
      {
        this.puntosCrupier += 10;  
      }
      else if(this.cartasCrupier[index].valor == 1 && puntos + 11 <= 21)//el as suma 11 si la cantidad de puntos del crupier no se pasa de 21
      {
        this.puntosCrupier += 11;
      }
      else 
      {
        this.puntosCrupier += this.cartasCrupier[index].valor;
      }
    }
    return this.puntosCrupier;
  }

  reiniciarJuego(){
    this.cartasCrupier = [];
    this.puntosCrupier = 0;
    this.puntosJugador = 0;
    this.cartasJugador = [];
    this.mezclarCartas();
  }
}
