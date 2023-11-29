import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'gupload',
  templateUrl: './gupload.component.html',
  styleUrls: ['./gupload.component.scss'],
})
export class GUploadComponent implements OnDestroy {
  @Input()
  address!: string;
message!: string;
  @Input()
  requiredFileType!: string;

  fileName = '';
  uploadProgress!: number | null;
  uploadSub!: Subscription | null;

  constructor(private httpClient: HttpClient) {}

  ngOnDestroy(): void {
    this.cancelUpload();
  }

  onFileSelected($event: Event) {
    const element = $event.currentTarget as HTMLInputElement;
    const files: FileList = element.files!;

    if (files) {
      this.fileName = files[0].name;
      const formData = new FormData();
      formData.append('thumbnail', files[0]);

      const upload$ = this.httpClient
        .post(this.address, formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
        }
      });
    }
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
