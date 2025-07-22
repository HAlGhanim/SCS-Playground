import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { FileDownloadService } from '../../services/app-services/file-download.service';
import { EmployeesAbroadService } from '../../services/api-services/EAB/employess-abroad.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-employees-abroad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employees-abroad.component.html',
})
export class EmployeesAbroadComponent implements OnInit {
  eabForm: FormGroup;
  loading = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  message = '';

  // EAB Report types
  eabReportTypes = [
    { id: 'monthsDue', name: 'كشف عدد الأشهر المستحقة' },
    { id: 'inactiveCreditors', name: 'غير فعالين - رصيد دائن' },
    { id: 'inactiveDebtors', name: 'غير فعالين - رصيد مدين' },
    { id: 'activeCreditors', name: 'فعالين - رصيد دائن' },
    { id: 'activeDebtors', name: 'فعالين - رصيد مدين' },
    { id: 'cf020', name: 'كشف الملفات الرقابية (CF020)' },
  ];

  constructor(
    private fb: FormBuilder,
    private eabService: EmployeesAbroadService,
    private fileDownloadService: FileDownloadService
  ) {
    this.eabForm = this.createEabForm();
  }

  ngOnInit(): void {
    this.eabForm.get('reportType')?.valueChanges.subscribe((reportType) => {
      if (reportType) {
        this.updateEabFormValidators(reportType);
      }
    });
  }

  private createEabForm(): FormGroup {
    return this.fb.group({
      reportType: ['', Validators.required],
      dueDate: [null, Validators.required],
      startFY: [null],
      endFY: [null],
    });
  }

  private updateEabFormValidators(reportType: string): void {
    // Reset validators
    this.eabForm.get('dueDate')?.clearValidators();
    this.eabForm.get('startFY')?.clearValidators();
    this.eabForm.get('endFY')?.clearValidators();

    if (reportType === 'cf020') {
      this.eabForm.get('dueDate')?.clearValidators();
      this.eabForm.get('startFY')?.setValidators(Validators.required);
      this.eabForm.get('endFY')?.setValidators(Validators.required);
    } else {
      this.eabForm.get('dueDate')?.setValidators(Validators.required);
      this.eabForm.get('startFY')?.clearValidators();
      this.eabForm.get('endFY')?.clearValidators();
    }

    // Update validity
    this.eabForm.get('dueDate')?.updateValueAndValidity({ emitEvent: false });
    this.eabForm.get('startFY')?.updateValueAndValidity({ emitEvent: false });
    this.eabForm.get('endFY')?.updateValueAndValidity({ emitEvent: false });
  }

  generateEabReport(): void {
    if (this.eabForm.invalid) {
      this.showError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    this.loading = true;
    const formValue = this.eabForm.value;
    const reportType = formValue.reportType;

    let reportObservable;
    let fileName = '';

    switch (reportType) {
      case 'monthsDue':
        reportObservable = this.eabService.getEABMonthsDue(formValue.dueDate);
        fileName = `كشف عدد الأشهر المستحقة ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'inactiveCreditors':
        reportObservable = this.eabService.getEABInActiveCreditors(
          formValue.dueDate
        );
        fileName = `كشف غير فعالين - رصيد دائن ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'inactiveDebtors':
        reportObservable = this.eabService.getEABInActiveDeptors(
          formValue.dueDate
        );
        fileName = `كشف غير فعالين - رصيد مدين ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'activeCreditors':
        reportObservable = this.eabService.getEABActiveCreditors(
          formValue.dueDate
        );
        fileName = `كشف فعالين - رصيد دائن ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'activeDebtors':
        reportObservable = this.eabService.getEABActiveDeptors(
          formValue.dueDate
        );
        fileName = `كشف فعالين - رصيد مدين ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'cf020':
        reportObservable = this.eabService.getCF020(
          formValue.startFY,
          formValue.endFY
        );
        fileName = `كشف الملفات الرقابية CF020 ${new Date().toLocaleDateString()}.xlsx`;
        break;
      default:
        this.loading = false;
        return;
    }

    reportObservable.pipe(finalize(() => (this.loading = false))).subscribe({
      next: (response: HttpResponse<Blob>) => {
        this.fileDownloadService.downloadFile(response.body!, fileName);
        this.showSuccess('تم تنزيل التقرير بنجاح');
      },
      error: (error) => {
        console.error('Error generating report:', error);
        this.showError('حدث خطأ في إنشاء التقرير. يرجى المحاولة مرة أخرى.');
      },
    });
  }

  private showSuccess(message: string): void {
    this.message = message;
    this.showSuccessMessage = true;
    setTimeout(() => (this.showSuccessMessage = false), 5000);
  }

  private showError(message: string): void {
    this.message = message;
    this.showErrorMessage = true;
    setTimeout(() => (this.showErrorMessage = false), 5000);
  }

  isEabFieldRequired(fieldName: string): boolean {
    return this.eabForm.get(fieldName)?.hasError('required') || false;
  }

  get selectedEabReportType(): string {
    return this.eabForm.get('reportType')?.value || '';
  }
}
