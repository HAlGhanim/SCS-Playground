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
import {
  AlertComponent,
  PageHeaderComponent,
  ButtonComponent,
  FormFieldComponent,
  ReportContainerComponent,
  CardComponent,
} from '../../components/index';
import { EAB_REPORT_TYPES } from '../../interfaces/index';
import { MessageService } from '../../services/index';
import { CustomValidators, FormHelpers } from '../../utils/validators';

@Component({
  selector: 'app-employees-abroad',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    PageHeaderComponent,
    ButtonComponent,
    FormFieldComponent,
    ReportContainerComponent,
    CardComponent,
  ],
  templateUrl: `./employees-abroad.component.html`,
})
export class EmployeesAbroadComponent implements OnInit {
  eabForm: FormGroup;
  loading = false;
  eabReportTypes = EAB_REPORT_TYPES;

  constructor(
    private fb: FormBuilder,
    private eabService: EmployeesAbroadService,
    private fileDownloadService: FileDownloadService,
    public messageService: MessageService
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
      dueDate: [null],
      startFY: [null],
      endFY: [null],
    });
  }

  private updateEabFormValidators(reportType: string): void {
    // Reset validators
    this.eabForm.get('dueDate')?.clearValidators();
    this.eabForm.get('startFY')?.clearValidators();
    this.eabForm.get('endFY')?.clearValidators();

    // Clear form-level validators
    this.eabForm.clearValidators();

    if (reportType === 'cf020') {
      this.eabForm.get('dueDate')?.clearValidators();
      this.eabForm.get('startFY')?.setValidators(Validators.required);
      this.eabForm.get('endFY')?.setValidators(Validators.required);
      // Add date range validator at form level
      this.eabForm.setValidators(
        CustomValidators.dateRange('startFY', 'endFY')
      );
    } else {
      this.eabForm.get('dueDate')?.setValidators(Validators.required);
      this.eabForm.get('startFY')?.clearValidators();
      this.eabForm.get('endFY')?.clearValidators();
    }

    // Update validity
    this.eabForm.get('dueDate')?.updateValueAndValidity({ emitEvent: false });
    this.eabForm.get('startFY')?.updateValueAndValidity({ emitEvent: false });
    this.eabForm.get('endFY')?.updateValueAndValidity({ emitEvent: false });
    this.eabForm.updateValueAndValidity({ emitEvent: false });
  }

  generateEabReport(): void {
    if (this.eabForm.invalid) {
      FormHelpers.markFormGroupTouched(this.eabForm);
      this.messageService.showError('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
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
        fileName = `كشف عدد الأشهر المستحقة ${new Date().toLocaleDateString(
          'ar-SA'
        )}.xlsx`;
        break;
      case 'inactiveCreditors':
        reportObservable = this.eabService.getEABInActiveCreditors(
          formValue.dueDate
        );
        fileName = `كشف غير فعالين - رصيد دائن ${new Date().toLocaleDateString(
          'ar-SA'
        )}.xlsx`;
        break;
      case 'inactiveDebtors':
        reportObservable = this.eabService.getEABInActiveDeptors(
          formValue.dueDate
        );
        fileName = `كشف غير فعالين - رصيد مدين ${new Date().toLocaleDateString(
          'ar-SA'
        )}.xlsx`;
        break;
      case 'activeCreditors':
        reportObservable = this.eabService.getEABActiveCreditors(
          formValue.dueDate
        );
        fileName = `كشف فعالين - رصيد دائن ${new Date().toLocaleDateString(
          'ar-SA'
        )}.xlsx`;
        break;
      case 'activeDebtors':
        reportObservable = this.eabService.getEABActiveDeptors(
          formValue.dueDate
        );
        fileName = `كشف فعالين - رصيد مدين ${new Date().toLocaleDateString(
          'ar-SA'
        )}.xlsx`;
        break;
      case 'cf020':
        reportObservable = this.eabService.getCF020(
          formValue.startFY,
          formValue.endFY
        );
        fileName = `كشف الملفات الرقابية CF020 ${new Date().toLocaleDateString(
          'ar-SA'
        )}.xlsx`;
        break;
      default:
        this.loading = false;
        this.messageService.showError('نوع التقرير غير مدعوم');
        return;
    }

    reportObservable.pipe(finalize(() => (this.loading = false))).subscribe({
      next: (response: HttpResponse<Blob>) => {
        this.fileDownloadService.downloadFile(response.body!, fileName);
        this.messageService.showSuccess('تم تنزيل التقرير بنجاح');
      },
      error: (error) => {
        console.error('Error generating report:', error);
        this.messageService.showError(
          'حدث خطأ في إنشاء التقرير. يرجى المحاولة مرة أخرى.'
        );
      },
    });
  }

  isEabFieldRequired(fieldName: string): boolean {
    return this.eabForm.get(fieldName)?.hasError('required') || false;
  }

  get selectedEabReportType(): string {
    return this.eabForm.get('reportType')?.value || '';
  }

  // Helper methods for form validation
  hasError(fieldName: string): boolean {
    return FormHelpers.hasError(this.eabForm.get(fieldName), fieldName);
  }

  getError(fieldName: string): string {
    // Handle form-level errors
    if (fieldName === 'dateRange' && this.eabForm.hasError('dateRange')) {
      return 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية';
    }

    return FormHelpers.getErrorMessage(this.eabForm.get(fieldName), fieldName);
  }
}
