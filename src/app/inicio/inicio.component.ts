import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  videoUrl:string;
  constructor(private router:Router) { 
    this.videoUrl = "assets/videos/1.mp4"
  }

  ngOnInit(): void {
  }

  Jugar(){
    this.router.navigateByUrl("/tablero")
  }

  Reglas(){
    this.router.navigateByUrl("/reglas")
  }
}
