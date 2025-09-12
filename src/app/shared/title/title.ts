import { AfterViewInit, Directive, ElementRef, HostBinding, inject, input } from '@angular/core';

@Directive({
  selector: '[appTitle]',
})
export class Title implements AfterViewInit {
  @HostBinding('attr.title') public appTitle = input.required<string>();
  elementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.title = this.appTitle();
  }
}
