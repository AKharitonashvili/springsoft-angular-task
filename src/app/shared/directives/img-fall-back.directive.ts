import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgFallBack]',
  standalone: true,
})
export class ImgFallBackDirective {
  @Input() appImgFallback!: string;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error') onError() {
    const element: HTMLImageElement = this.el.nativeElement;
    element.src = this.appImgFallback || '/assets/images/person.svg';
  }
}
