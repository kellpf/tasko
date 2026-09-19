import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click')
  onClick() {
    this.elementRef.nativeElement.style.backgroundColor = 'red';
  }
}
