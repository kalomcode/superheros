import { Injectable, computed, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerPageService {
  /**
   * Metodo antiguo usando Objservables
   */
  // isLoading$ = new Subject<boolean>();

  // show() {
  //   this.isLoading$.next(true);
  // }

  // hide() {
  //   this.isLoading$.next(false);
  // }

  /**
   * Metodo nuevo usando Signals
   */
  private _isLoading = signal<boolean>(false);
  isLoading = computed(() => this._isLoading())

  show() {
    this._isLoading.set(true);
  }

  hide() {
    this._isLoading.set(false);
  }

}
