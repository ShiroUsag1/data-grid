import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datagrid-footer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './datagrid-footer.component.html',
  styleUrl: './datagrid-footer.component.scss'
})
export class DatagridFooterComponent implements OnInit {

  currentPage: any;
  itenspInput: any;
  @Input() itemsPerPage: number;
  @Input() qtdeMaxItens: any;
  @Input() searchTerm: any;
  @Output() setQtdeItens = new EventEmitter();
  @Output() setPage = new EventEmitter();
  @Output() calledUpdate = new EventEmitter();

  ngOnInit(): void {
    this.itenspInput = this.itemsPerPage;
    this.currentPage = 1;
  }

  Imprimir() {
    window.print();
  }

  getMaxPages(): number {
    return Math.ceil(this.qtdeMaxItens / this.itemsPerPage);
  }

  updatePaginatedArticlesF() {
    this.calledUpdate.emit();
  }

  setQtde() {
    this.setQtdeItens.emit(parseInt(this.itenspInput));
  }

  setPageF(arg0: any) {
    this.currentPage = arg0;
    this.setPage.emit(arg0);
  }
}
