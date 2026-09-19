// input-style.directive.ts
import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputStyle]',
  standalone: true
})
export class InputStyleDirective implements OnInit {

  @Input() appInputStyle: 'success' | 'error' | 'default' = 'default';
  @Input() focusColor: string = '#6366f1';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.applyBaseStyle();
    // this.applyVariantStyle();
  }

  private applyBaseStyle() {
    const styles = {
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      padding: '10px 14px',
      outline: 'none',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      width: '100%',
      boxSizing: 'border-box'
    };

    Object.entries(styles).forEach(([prop, value]) => {
      this.renderer.setStyle(this.el.nativeElement, prop, value);
    });
  }

  private applyVariantStyle() {
    const colors: Record<string, string> = {
      success: '#22c55e',
      error: '#ef4444',
      default: '#d1d5db'
    };

    const color = colors[this.appInputStyle] ?? colors['default'];
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', color);
  }

  @HostListener('focus')
  onFocus() {
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', this.focusColor);
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', `0 0 0 3px ${this.focusColor}33`);
  }

  @HostListener('blur')
  onBlur() {
    this.renderer.removeStyle(this.el.nativeElement, 'boxShadow');
    this.applyVariantStyle();
  }

  // @HostListener('input', ['$event.target.value'])
  // onInput(value: string) {
  //   // Exemplo: destaca em vermelho se vazio
  //   if (!value.trim()) {
  //     this.renderer.setStyle(this.el.nativeElement, 'borderColor', '#ef4444');
  //   } else {
  //     this.applyVariantStyle();
  //   }
  // }
}