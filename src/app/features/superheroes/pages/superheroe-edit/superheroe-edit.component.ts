import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperheroesService } from '../../services/superheroes.service';
import { switchMap } from 'rxjs';
import { Superhero } from '../../interfaces';

@Component({
  selector: 'app-superheroe-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule
  ],
  templateUrl: './superheroe-edit.component.html',
  styleUrls: ['./superheroe-edit.component.scss']
})
export class SuperheroeEditComponent {
  
  superheroForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', { nonNullable: true }],
    power: [''],
    identity: [''],
    city: [''],
    status: [''],
    imgUrl: [''],
  });

  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];


  constructor(
    private fb: FormBuilder,
    private superheroesSvc: SuperheroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  get currentHero(): Superhero {
    const superhero = this.superheroForm.value as Superhero;
    return superhero;
  }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return;

    // this.activatedRoute.params
    //   .pipe(
    //     switchMap( ({ id }) => this.superheroesSvc.getHeroById( id ) ),
    //   ).subscribe( hero => {

    //     if ( !hero ) {
    //       return this.router.navigateByUrl('/');
    //     }

    //     this.superheroForm.reset( hero );
    //     return;
    //   });

  }

  onSubmit():void {

    // if ( this.superheroForm.invalid ) return;

    // if ( this.currentHero.id ) {
    //   this.superheroesSvc.updateHero( this.currentHero )
    //     .subscribe( hero => {
    //       this.showSnackbar(`${ hero.superhero } updated!`);
    //     });

    //   return;
    // }

    // this.superheroesSvc.addHero( this.currentHero )
    //   .subscribe( hero => {
    //     // TODO: mostrar snackbar, y navegar a /heroes/edit/ hero.id
    //     this.router.navigate(['/heroes/edit', hero.id ]);
    //     this.showSnackbar(`${ hero.superhero } created!`);
    //   });
  }

  onDeleteHero() {
    // if ( !this.currentHero.id ) throw Error('Hero id is required');

    // const dialogRef = this.dialog.open( ConfirmDialogComponent, {
    //   data: this.superheroForm.value
    // });

    // dialogRef.afterClosed()
    //   .pipe(
    //     filter( (result: boolean) => result ),
    //     switchMap( () => this.superheroesSvc.deleteHeroById( this.currentHero.id )),
    //     filter( (wasDeleted: boolean) => wasDeleted ),
    //   )
    //   .subscribe(() => {
    //     this.router.navigate(['/heroes']);
    //   });

    // dialogRef.afterClosed().subscribe(result => {
    //   if ( !result ) return;

    //   this.superheroesSvc.deleteHeroById( this.currentHero.id )
    //   .subscribe( wasDeleted => {
    //     if ( wasDeleted )
    //       this.router.navigate(['/heroes']);
    //   })
    // });

  }


  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }
}
