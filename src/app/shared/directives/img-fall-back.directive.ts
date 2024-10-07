import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appImgFallBack]',
  standalone: true,
})
export class ImgFallBackDirective {
  readonly el = inject(ElementRef<HTMLImageElement>);

  @Input() appImgFallback!: string;

  @HostListener('error') onError() {
    const element: HTMLImageElement = this.el.nativeElement;
    element.src = this.appImgFallback || '/assets/images/person.svg';
  }
}
