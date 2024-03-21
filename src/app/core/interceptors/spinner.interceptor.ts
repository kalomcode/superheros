import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { delay, finalize } from 'rxjs';

import { SpinnerPageService } from '../services/spinner-page.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerPageSvc = inject(SpinnerPageService);
  spinnerPageSvc.show();
  return next(req).pipe(
    delay(1000), // Delay en pruebas para poder ver el spinner
    finalize(() => spinnerPageSvc.hide())
  )
};
