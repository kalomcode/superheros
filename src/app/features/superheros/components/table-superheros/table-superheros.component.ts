import { Component, Input, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

import { filter, switchMap } from 'rxjs';

import { Superhero } from '../../interfaces/superhero.interface';
import { SuperherosService } from '../../services/superheros.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DialogSuperheroDetailComponent } from '../dialog-superhero-detail/dialog-superhero-detail.component';
import { ImagePipe } from 'src/app/shared/pipes/image.pipe';
import { AsyncPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-table-superheros',
  standalone: true,
  imports: [
    ImagePipe,
    AsyncPipe,
    TitleCasePipe,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  templateUrl: './table-superheros.component.html',
  styleUrls: ['./table-superheros.component.scss']
})
export class TablesuperherosComponent implements OnInit {
  
  private router = inject(Router);
  private superherosSvc = inject(SuperherosService);
  private dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() search = '';

  displayedColumns: string[] = ['superhero-imgUrl', 'superhero-name', 'superhero-action'];
  dataSource: MatTableDataSource<Superhero> = new MatTableDataSource();
  
  ngOnInit() {
    this.configFilter();
    this.getsuperheros();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['search']) {
      this.dataSource.filter = this.search;
    }
  }

  configFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.name.toLowerCase().includes(filter.toLowerCase());
    };
  }

  getsuperheros() {
    this.superherosSvc.getsuperheros().subscribe({
      next: (superheros) => {
        this.dataSource.data = superheros
        this.dataSource.paginator?.firstPage();
      },
      error: () => {
        this.showrSnackbarError( `Error al intentar obtener los superhéroes`);
      }
    })
  }

  deleteSuperhero( superhero: Superhero ) {

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: `Eliminar a ${superhero.name}`
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.superherosSvc.deletesuperheroById( superhero.id!.toString() )),
      )
      .subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter( row => row.id !== superhero.id);
          this.dataSource.paginator?.firstPage();
          this.showSnackbarSuccess( `${superhero.name} eliminado correctamente` );
        },error: () => {
          this.showrSnackbarError( `Error al intentar eliminar a ${superhero.name}`);
        }
      });
        
  }

  showSuperheroDetail( superhero: Superhero ) {
    this.dialog.open( DialogSuperheroDetailComponent, {
      data: superhero
    });
  }

  showSnackbarSuccess( message: string ):void {
    this.snackbar.open( message, 'OK', {
      duration: 2500,
      panelClass: ['success-snackbar']
    })
  }

  showrSnackbarError( message: string ):void {
    this.snackbar.open( message, 'OK', {
      duration: 2500,
      panelClass: ['error-snackbar']
    })
  }

  goToEditSuperhero(id: string) {
    this.router.navigate(['/superheros/edit', id]);
  }

}
