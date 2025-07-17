// src/app/pages/reports/gcc-reports/gcc-reports.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { GCCReportsService } from '../../../services/api-services/reports/gcc-reports.service';
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
  private gccService = inject(GCCReportsService);
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
