import { of } from "rxjs";

export class MatSnackBarMock {
  open(message: string, action: string, config: any): any {
    return {
      afterDismissed: () => of(true),
      onAction: () => of(true)
    };
  }
}