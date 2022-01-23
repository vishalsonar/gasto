import { ErrorHandler, Injectable } from '@angular/core';
import { Message } from './message';

declare function showErrorMessage(message: any): any;

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    showErrorMessage(Message.server_error);
  }
}
