import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatIconModule, MatProgressBarModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() requiredFileType: string = 'image/*';

  fileName = signal<string | null>(null);
  filePreviewUrl = signal<string | ArrayBuffer | null>(null);
  isDisabled = signal<boolean>(false);

  private onChange = (value: File | null) => {};
  private onTouched = () => {};

  onFileSelected(event: any): void {
    if (this.isDisabled()) {
      return;
    }

    const file: File = event.target.files[0];

    if (file && this.isImageFile(file)) {
      this.fileName.set(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        this.filePreviewUrl.set(reader.result);
        const base64Image = reader.result?.toString();
        this.onChange(base64Image as unknown as File);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload an image file.');
    }
  }
  private isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  writeValue(value: File | null): void {
    if (value) {
      this.fileName.set(value.name);
      const reader = new FileReader();
      reader.onload = () => this.filePreviewUrl.set(reader.result);
      reader.readAsDataURL(this.ensureBlob(value));
    } else {
      this.fileName.set(null);
      this.filePreviewUrl.set(null);
    }
  }

  registerOnChange(fn: (value: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onTouchedEvent() {
    this.onTouched();
  }

  ensureBlob(value: any): Blob {
    if (value instanceof Blob) {
      return value;
    }

    if (typeof value === 'string') {
      const base64Data = value.split(',')[1];
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new Blob([bytes], { type: 'image/jpeg' });
    }

    throw new Error('Value cannot be converted to a Blob');
  }
}
