import { Component, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Superhero } from '../../interfaces';

import { ImagePipe } from 'src/app/shared/pipes/image.pipe';
import { AsyncPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-superhero-detail',
  standalone: true,
  imports: [
    ImagePipe,
    TitleCasePipe,
    AsyncPipe,
    UpperCasePipe,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './dialog-superhero-detail.component.html',
  styleUrls: ['./dialog-superhero-detail.component.scss']
})
export class DialogSuperheroDetailComponent {
  superhero: Superhero = inject(MAT_DIALOG_DATA);
}
