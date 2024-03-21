import { Component, inject, Signal, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { SearchInputComponent } from '../../../../shared/components/search-input/search-input.component';
import { TableSuperheroesComponent } from '../../components/table-superheroes/table-superheroes.component';

@Component({
  selector: 'app-superheroes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    SearchInputComponent,
    TableSuperheroesComponent
  ],
  templateUrl: './superheroes-list.component.html',
  styleUrls: ['./superheroes-list.component.scss']
})
export class SuperheroesListComponent {
  private router = inject(Router);
  
  search = signal('');

  goToNewSuperhero() {
    this.router.navigate(['/superheroes/new']);
  }
  
}
