import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';

function createFileList(files: File[]): FileList {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  return dataTransfer.files;
}

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadComponent, MatIconModule, MatProgressBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default message when no file is selected', () => {
    const label = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(label.textContent).toContain('Upload Profile Picture');
  });

  it('should display image preview when a valid image is selected', done => {
    const file = new File(['test'], 'test-image.jpg', { type: 'image/jpeg' });
    const fileInput = fixture.debugElement.query(By.css('input')).nativeElement;
    spyOn(component as any, 'onChange').and.callThrough();

    fileInput.files = createFileList([file]);
    fileInput.dispatchEvent(new Event('change'));

    setTimeout(() => {
      fixture.detectChanges();
      const img = fixture.debugElement.query(By.css('img'));
      expect(img).toBeTruthy();
      expect((component as any).onChange).toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should alert when a non-image file is selected', () => {
    spyOn(window, 'alert');
    const file = new File(['test'], 'test-file.txt', { type: 'text/plain' });
    const fileInput = fixture.debugElement.query(By.css('input')).nativeElement;

    fileInput.files = createFileList([file]);
    fileInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Please upload an image file.');
  });

  it('should disable the input and button when disabled', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(input.disabled).toBeTrue();
    expect(button.disabled).toBeTrue();
  });

  it('should call onTouchedEvent directly', () => {
    const onTouchedSpy = spyOn(component, 'onTouchedEvent').and.callThrough();
    component.onTouchedEvent();
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
