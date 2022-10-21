import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { timeStamp } from 'console';
import { range } from 'rxjs';
import Swal from "sweetalert2";
import { Carta } from '../Interfaces/Carta';
import { CartasService } from '../Servicios/cartas.service';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  constructor(private servicio:CartasService) { }

  cartasJugador: Carta[] = [];
  puntosJugador = 0;
  plantarme =true;

  @Output() onPedirCarta = new EventEmitter<Carta[]>();
  @Output() onPLantarse = new EventEmitter();
  @Output() onPuntosjugador =  new EventEmitter();

  ngOnInit(): void {
   setTimeout(()=> {this.iniciarJugador()},0);
  }
  
   inputOptions = {
      '1 ': '1',
      '11' : '11',
  };

  iniciarJugador(){
    this.cartasJugador = this.servicio.iniciarJugador();
    this.puntosJugador = this.servicio.calcularPuntosJugador();
    //Se calculan los puntos antes de seleccionar el valor del AS
    //para que en caso de que no se seleccione ningun valor
    //el as valga 1
    //Entrega 
    this.onPedirCarta.emit(this.cartasJugador);
    this.onPuntosjugador.emit(this.puntosJugador);

    this.cartasJugador.forEach(async (carta) => {
      if(carta.valor == 1){     
        const { value: puntos } = await Swal.fire({
          title: 'Seleccione un valor para el AS',
          input: 'radio',
          inputOptions: this.inputOptions,
        })
        if (puntos == 11) {
          this.puntosJugador += 10;
          this.onPuntosjugador.emit(this.puntosJugador);
        }
    }
    });
  }

  async validarAs(carta:Carta){
    
    if(carta.valor == 1){
      const { value: puntos } = await Swal.fire({
        title: 'Seleccione un valor para el AS',
        input: 'radio',
        inputOptions: this.inputOptions,
      })
      if (puntos == 11) {
        this.puntosJugador += 10;
        this.onPuntosjugador.emit(this.puntosJugador);
      }
    }
  }

  pedirCarta() {
    const cartaJugador = this.servicio.pedirCarta();
    this.cartasJugador.push(cartaJugador);
    this.puntosJugador += cartaJugador.valor;
    this.onPedirCarta.emit(this.cartasJugador);
    this.onPuntosjugador.emit(this.puntosJugador);
    this.validarAs(cartaJugador);
  }
  
  plantarse(){
      this.onPLantarse.emit();
      this.plantarme = false
  }
}
