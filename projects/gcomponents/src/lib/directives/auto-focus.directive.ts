import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[gAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    const htmlElements = this.elementRef.nativeElement.querySelectorAll(
      `input:not([type='hidden']):not([disabled]),textarea:not([disabled]),select:not([disabled]),button:not([disabled])`
    ) as HTMLElement[];
    debugger;
    for (const htmlElement of htmlElements) {
       if (
        htmlElement.offsetWidth > 0 ||
        htmlElement.offsetHeight > 0 ||
        htmlElement.getClientRects().length > 0
      ) { 
      //if (isElementInViewport(htmlElement)) {
        htmlElement.focus();
        if (['INPUT', 'TEXTAREA'].indexOf(htmlElement.tagName) > 0)
          setTimeout(() => {
            (htmlElement as HTMLInputElement).select();
          }, 0);
        break;
      }
    }
  }
}

function isElementInViewport(el: any) {
  var rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
