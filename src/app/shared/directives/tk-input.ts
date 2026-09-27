import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appInputStyle]',
})
export class InputStyleDirective {
  readonly appInputStyle = input<'success' | 'error' | 'default'>('default');
}