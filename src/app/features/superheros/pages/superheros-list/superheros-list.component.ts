import { Component, inject, Signal, signal, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { SearchInputComponent } from '../../../../shared/components/search-input/search-input.component';
import { TablesuperherosComponent } from '../../components/table-superheros/table-superheros.component';

@Component({
  selector: 'app-superheros-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    SearchInputComponent,
    TablesuperherosComponent
],
  templateUrl: './superheros-list.component.html',
  styleUrls: ['./superheros-list.component.scss']
})
export class superherosListComponent {
  private router = inject(Router);
  
  search = signal('');

  goToNewSuperhero() {
    this.router.navigate(['/superheros/new']);
  }
  
}
