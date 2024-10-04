import { ImgFallBackDirective } from './img-fall-back.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  template: `<img [appImgFallback]="fallbackImage" src="invalid-path.jpg" />`,
})
class TestComponent {
  fallbackImage: string | undefined = undefined;
}

describe('ImgFallBackDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let imgEl: HTMLImageElement;
  let directiveInstance: ImgFallBackDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ImgFallBackDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    imgEl = fixture.debugElement.query(By.css('img'))
      .nativeElement as HTMLImageElement;
    directiveInstance = new ImgFallBackDirective({ nativeElement: imgEl });
  });

  it('should set fallback image on error', () => {
    fixture.componentInstance.fallbackImage = '/assets/images/fallback.svg';
    directiveInstance.appImgFallback = fixture.componentInstance.fallbackImage;
    directiveInstance.onError();
    fixture.detectChanges();

    expect(imgEl.src).toContain('/assets/images/fallback.svg');
  });

  it('should use default fallback if none provided', () => {
    fixture.componentInstance.fallbackImage = '';
    directiveInstance.appImgFallback = fixture.componentInstance.fallbackImage;
    directiveInstance.onError();
    fixture.detectChanges();

    expect(imgEl.src).toContain('/assets/images/person.svg');
  });
});
