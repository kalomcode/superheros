import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { TableSuperheroesComponent } from '../../components/table-superheroes/table-superheroes.component';

@Component({
  selector: 'app-superheroes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SearchInputComponent,
    TableSuperheroesComponent
  ],
  templateUrl: './superheroes-list.component.html',
  styleUrls: ['./superheroes-list.component.scss']
})
export class SuperheroesListComponent {
  search = signal('')

}
