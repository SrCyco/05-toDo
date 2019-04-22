import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista-model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertController: AlertController) {
  }

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    if ( this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista( lista: Lista ) {
    this.deseosService.borrarLista( lista );
  }

  async editarNombreLista( lista: Lista ) {
    const alertEdit = await this.alertController.create({
      header: 'Editar nombre',
      inputs: [{
        name: 'title',
        type: 'text',
        value: lista.titulo
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (data) => {
            this.lista.closeSlidingItems();
          }
       },
       {
         text: 'Editar',
         handler: (data) => {
            if (data.title.length === 0) {
              return;
            }
            this.deseosService.editarNombre(lista.id, data.title);
            this.lista.closeSlidingItems();
         }
       }
    ]
    });

    alertEdit.present();

  }

}
