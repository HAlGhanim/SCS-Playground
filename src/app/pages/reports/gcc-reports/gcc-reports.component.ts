import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GCCService } from '../../../services/api-services/GCC/gcc.service';
import { FileDownloadService } from '../../../services/app-services/file-download.service';

@Component({
  selector: 'app-gcc-reports',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './gcc-reports.component.html',
})
export class GCCReportsComponent {
  private fb = inject(FormBuilder);
  private gccService = inject(GCCService);
  private fileService = inject(FileDownloadService);
  private snackBar = inject(MatSnackBar);

  loading = signal(false);

  rpt20Form: FormGroup = this.fb.group({
    date: [new Date()],
  });

  downloadRPT20() {
    this.loading.set(true);
    const date = this.rpt20Form.get('date')?.value;

    this.gccService.getGCCRPT20(date).subscribe({
      next: (blob) => {
        this.fileService.downloadFile(
          blob,
          `GCCRPT20_${date.toISOString().split('T')[0]}.zip`
        );
        this.snackBar.open('تم تحميل التقرير بنجاح', 'إغلاق', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Error downloading report:', error);
        this.snackBar.open('حدث خطأ في تحميل التقرير', 'إغلاق', {
          duration: 3000,
        });
      },
      complete: () => this.loading.set(false),
    });
  }
}
