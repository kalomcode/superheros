import { Component, Input, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SuperheroesService } from '../../services/superheroes.service';
import { Superhero } from '../../interfaces/superhero.interface';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-superheroes',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  templateUrl: './table-superheroes.component.html',
  styleUrls: ['./table-superheroes.component.scss']
})
export class TableSuperheroesComponent implements OnInit {

  private superheroesSvc = inject(SuperheroesService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() search = '';

  displayedColumns: string[] = ['superhero-imgUrl', 'superhero-name', 'superhero-action'];
  dataSource: MatTableDataSource<Superhero> = new MatTableDataSource();
  
  ngOnInit() {
    this.configFilter();
    this.getSuperheroes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['search']) {
      console.log('El dato del padre ha cambiado:', this.search);
      this.dataSource.filter = this.search;
    }
  }

  configFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.name.toLowerCase().includes(filter.toLowerCase());
    };
  }

  getSuperheroes() {
    this.superheroesSvc.getSuperheroes().subscribe({
      next: (superheroes) => {
        console.log({superheroes})
        this.dataSource.data = superheroes
        console.log(this.dataSource)
        console.log(this.dataSource.data);
      },
      error: () => {}
    })
  }

}
