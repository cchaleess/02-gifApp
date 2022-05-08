import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
   
})
export class SidebarComponent {

  buscar(termino: string) {
    console.log(termino);
    this.gifsService.buscarGif(termino);
  }

  constructor(private gifsService: GifsService) { }
  
  get historial() {
    return this.gifsService.historial;
  }

}
