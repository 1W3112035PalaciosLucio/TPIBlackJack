import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Carta } from '../Interfaces/Carta';
import { CartasService } from '../Servicios/cartas.service';
import  Swal from "sweetalert2";

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  constructor(private servicio: CartasService, private route: Router, private renderer: Renderer2) {
    renderer.setStyle(
      document.body,
      "background-image",
      'url("assets/images/fondoBJ.jpg")'
    );

  }

  partidaIniciada = true;
  cartasJugador: Carta[] = [];
  cartasCrupier: Carta[] = [];
  puntosJugador: number = 0;
  puntosCrupier: number = 0;
  resultadoJuego = "";
  tableroImg!: string;


  ngOnInit(): void {
  }

  InicioPartida() {
    this.cartasCrupier = this.servicio.iniciarCrupier();
    this.partidaIniciada = false;
    this.puntosCrupier = this.servicio.calcularPuntosCupier();
  }


  Plantarse() {
    this.cartasCrupier = this.servicio.generarCartasCrupier();
    this.puntosCrupier = this.servicio.calcularPuntosCupier();

    if (this.puntosJugador == 21) {
      this.resultadoJuego = "¡¡¡ 21 PUNTOS, BLACKJACK GANASTE !!!"
    }
    else if (this.puntosJugador > 21) {
      this.resultadoJuego = "Te pasaste de puntos, ganó el Crupier"
    }
    else if (this.puntosJugador > this.puntosCrupier) {
      this.resultadoJuego = "Felicidades, le ganaste al Crupier"
    }
    else if (this.puntosCrupier > 21) {
      this.resultadoJuego = "Felicidades ganaste la partida, el Crupier se pasó de puntos"
    }
    else if (this.puntosCrupier > this.puntosJugador) {
      this.resultadoJuego = "Ganó el Crupier, vuelve a intentarlo"
    }
    else if (this.puntosCrupier == this.puntosJugador) {
      this.resultadoJuego = "Empate, ninguno gana"
    }
  }



  Reiniciar() {
    this.partidaIniciada = true;
    this.servicio.reiniciarJuego();
    this.cartasCrupier = [];
    this.cartasJugador = [];
    this.puntosCrupier = 0;
    this.puntosJugador = 0;
    this.resultadoJuego = "";
  }

  obtenerPuntosJugador(puntosJ:number){
    this.puntosJugador = puntosJ;
  }

  Volver() {
    this.route.navigateByUrl("");
  }

  PedirCarta(cartas: Carta[]) {
    this.cartasJugador = cartas;
  }
}

