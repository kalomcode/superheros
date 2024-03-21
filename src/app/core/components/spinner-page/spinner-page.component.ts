import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SpinnerPageService } from '../../services/spinner-page.service';

@Component({
  selector: 'app-spinner-page',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './spinner-page.component.html',
  styleUrls: ['./spinner-page.component.scss']
})
export class SpinnerPageComponent {
  private spinnerPageSvc = inject(SpinnerPageService);

  /**
   * Metodo antiguo usando Objservables
   */
  // isLoading$ = this.spinnerPageSvc.isLoading$;

  /**
   * Metodo nuevo usando Signals
   */
  isLoading = this.spinnerPageSvc.isLoading;

}
