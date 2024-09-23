import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { DatagridFooterComponent } from "../datagrid-footer/datagrid-footer.component";
import { DataGridHeader } from '../../models/DataGridHeader';
import { ControleServidorContract } from '@shaenkan/server-contract-library';
import { TabelaFiltroService } from '../../services/tabelaFiltro/tabela-filtro.service';

@Component({
  selector: 'app-datagrid',
  standalone: true,
  imports: [
    CommonModule,
    DatagridFooterComponent
  ],
  templateUrl: './datagrid.component.html',
  styleUrl: './datagrid.component.scss',
})
export class DatagridComponent implements OnInit {
  @Input() DataGridKey;
  @Input() dataModel: any[];
  @Input() header: DataGridHeader[];
  @Output() calledUpdate = new EventEmitter();
  @Input() searchTerm: string;
  @Input() autoGrid:boolean;
  @Input() icons: any;
  @Input() showToggle: boolean = true;
  
  itemsPerPage: number = 4;
  currentPage: number = 1;
  HiddenKeys:any[] = []

  ngOnInit(): void {
    this.itemsPerPage = 4;
    this.currentPage = 1;
    this.HiddenKeys = [];

    if(!this.DataGridKey){
      console.error('DataGridKey not found!');
      return;
    } 

    let QIP = window.localStorage.getItem(ControleServidorContract.getPrefixApp()+this.DataGridKey);

    if(!QIP){
      QIP = this.itemsPerPage+"";
      window.localStorage.setItem(ControleServidorContract.getPrefixApp()+this.DataGridKey, QIP);
    }

    this.itemsPerPage = parseInt(QIP);
  }

  getFiltro(){
    let Temporizador: any[];
    if(TabelaFiltroService.getTermo() && (TabelaFiltroService.getTermo().trim().length > 0)) {
      return this.dataModel.filter((objx)=>{
        Temporizador = Object.keys(objx).filter((key)=>{ return (objx[key] + "").toLocaleLowerCase().includes(TabelaFiltroService.getTermo().trim().toLocaleLowerCase()); });
        return Temporizador.length > 0;
      });
    }
    else 
    {
      return this.dataModel;
    }
  }

  getDataModel(){
    return this.getFiltro().slice(this.itemsPerPage * (this.currentPage - 1), this.itemsPerPage * this.currentPage);
  }

  calledUpdateF($event){
    this.calledUpdate.emit($event);
  }

  getMaxItens(): number {
    if(this.dataModel == null){
      return 0;
    }

    return this.dataModel.length;
  }

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getHeaders(){
    this.HiddenKeys = [];

    let DataTop:any[] = 
          this.HiddenKeys;

    this.header.filter((objx)=>{ return objx.dataVisivel == false; }).map((objy)=>{
      DataTop.push(objy.key);
    });

    return this.header.filter((objx)=>{ return objx.visivel; });
  }

  getDataRow(row: any, key: string) {
    return (row.hasOwnProperty(key) ? row[key] : '[KEY-NOT-FOUND]');
  }

  setQtdeItens(Qtde: number) {
    this.itemsPerPage = Qtde;
    window.localStorage.setItem(ControleServidorContract.getPrefixApp()+this.DataGridKey, Qtde+"");
  }

  getKeyAtivo(Parametro: Object): any {
    if(!Parametro.hasOwnProperty('ativo')){
      return [ false ];
    }

    return [ Parametro['ativo'] ];
  }

  getKeys(Parametro: any): string[] {
    let DataTop:any[] = 
      this.HiddenKeys;

    return Object.keys(Parametro).filter((objx)=>{ return (objx != 'ativo') && (DataTop.indexOf(objx) == -1); });
  }
}
