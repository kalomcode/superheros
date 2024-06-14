import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Subject, debounceTime, takeUntil } from 'rxjs';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule
],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  @Output() search = new EventEmitter<string>();

  inputControl = new FormControl('');

  ngOnInit() {
    this.inputControl.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(newValue => {
      this.search.emit(newValue || '');
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
