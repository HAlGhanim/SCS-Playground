import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import {
  AlertComponent,
  PageHeaderComponent,
  ButtonComponent,
  FormFieldComponent,
  ReportContainerComponent,
  CardComponent,
} from '../../components/index';
import {
  GCC_REPORT_TYPES,
  GCC_COUNTRIES,
  AMOUNT_TYPES,
  ReportFormValue,
} from '../../interfaces/index';
import {
  GCCService,
  MessageService,
  FileDownloadService,
} from '../../services/index';
import { CustomValidators, FormHelpers } from '../../utils/validators';

@Component({
  selector: 'app-gcc-reports',
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
  templateUrl: './gcc-reports.component.html',
})
export class GCCReportsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private gccService = inject(GCCService);
  private fileDownloadService = inject(FileDownloadService);
  public messageService = inject(MessageService);

  loading = false;
  reportTypes = GCC_REPORT_TYPES;
  gccCountries = GCC_COUNTRIES;
  amountTypes = AMOUNT_TYPES;
  reportForm: FormGroup = this.createReportForm();

  ngOnInit(): void {
    this.reportForm.get('reportType')?.valueChanges.subscribe((reportType) => {
      if (reportType) {
        this.updateFormValidators(reportType);
      }
    });
  }

  private createReportForm(): FormGroup {
    return this.fb.group({
      reportType: ['', Validators.required],
      date: [null],
      startDate: [null],
      stopDate: [null],
      regNum: [null],
      balance: [null],
      countryCode: [null],
      amountKD: [null],
    });
  }

  private updateFormValidators(reportType: string): void {
    // Reset all validators
    Object.keys(this.reportForm.controls).forEach((key) => {
      if (key !== 'reportType') {
        this.reportForm.get(key)?.clearValidators();
        this.reportForm.get(key)?.updateValueAndValidity({ emitEvent: false });
      }
    });

    // Clear form-level validators
    this.reportForm.clearValidators();

    // Set validators based on report type
    switch (reportType) {
      case 'GCCRPT120':
        this.reportForm.get('date')?.setValidators(Validators.required);
        break;
      case 'GCCRPT130':
        this.reportForm
          .get('balance')
          ?.setValidators([
            Validators.required,
            CustomValidators.positiveNumber(),
          ]);
        this.reportForm.get('countryCode')?.setValidators(Validators.required);
        break;
      case 'GCCRPT150':
        this.reportForm.get('stopDate')?.setValidators(Validators.required);
        // Add date range validator at form level
        this.reportForm.setValidators(
          CustomValidators.dateRange('startDate', 'stopDate')
        );
        break;
      case 'GCCRPTPF1':
        this.reportForm.get('countryCode')?.setValidators(Validators.required);
        break;
      case 'GCCRPTPF7':
        this.reportForm
          .get('regNum')
          ?.setValidators([
            Validators.required,
            CustomValidators.gccRegistrationNumber(),
          ]);
        this.reportForm.get('startDate')?.setValidators(Validators.required);
        // Add date range validator at form level if stopDate is provided
        this.reportForm.setValidators(
          CustomValidators.dateRange('startDate', 'stopDate')
        );
        break;
      case 'CMYGC009':
        this.reportForm.get('amountKD')?.setValidators(Validators.required);
        break;
    }

    // Update validity
    Object.keys(this.reportForm.controls).forEach((key) => {
      this.reportForm.get(key)?.updateValueAndValidity({ emitEvent: false });
    });
    this.reportForm.updateValueAndValidity({ emitEvent: false });
  }

  generateReport(): void {
    if (this.reportForm.invalid) {
      FormHelpers.markFormGroupTouched(this.reportForm);
      this.messageService.showError('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
      return;
    }

    this.loading = true;
    const formValue: ReportFormValue = this.reportForm.value;
    const reportType = formValue.reportType;

    let reportObservable;
    let fileName = '';

    switch (reportType) {
      // case 'GCCRPT20':
      //   reportObservable = this.gccService.getGCCRPT20(formValue.date);
      //   fileName = `كشف لأصحاب الأعمال الخليجيين بالعملة الخليجية ${new Date().toLocaleDateString()}.zip`;
      //   break;
      // case 'GCCRPT30':
      //   reportObservable = this.gccService.getGCCRPT30(formValue.date);
      //   fileName = `كشف لأصحاب الأعمال الخليجيين بالدينار الكويتي ${new Date().toLocaleDateString()}.zip`;
      //   break;
      case 'GCCRPT40':
        reportObservable = this.gccService.getGCCRPT40(formValue.date);
        fileName = `كشف لأصحاب الأعمال الخليجيين بفصل الدائن والمدين ${new Date().toLocaleDateString()}.zip`;
        break;
      case 'GCCRPT100':
        reportObservable = this.gccService.getGCCRPT100(formValue.date);
        fileName = `كتاب إحصائي لجميع أصحاب الأعمال الخليجيين ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPT120':
        reportObservable = this.gccService.getGCCRPT120(formValue.date!);
        fileName = `كشف عدد المسجلين تحت صاحب عمل خليجي ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPT130':
        reportObservable = this.gccService.getGCCRPT130(
          formValue.balance!,
          formValue.countryCode!,
          formValue.date
        );
        const countryName =
          this.gccCountries.find((c) => c.code === formValue.countryCode)
            ?.nameAr || '';
        fileName = `كشف لأصحاب الأعمال الخليجيين ${countryName} ${new Date().toLocaleDateString()}.${
          [81, 84].includes(formValue.countryCode!) ? 'zip' : 'xlsx'
        }`;
        break;
      case 'GCCRPT150':
        reportObservable = this.gccService.getGCCRPT150(
          formValue.stopDate!,
          formValue.startDate
        );
        fileName = `كشف أسماء المؤمن عليهم الفعالين ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPT170':
        reportObservable = this.gccService.getGCCRPT170(formValue.date);
        fileName = `كشف لأصحاب الأعمال الخليجيين المنتهية خدمات المؤمن عليهم ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPTPF1':
        reportObservable = this.gccService.getGCCRPTPF1(formValue.countryCode!);
        const countryNamePF1 =
          this.gccCountries.find((c) => c.code === formValue.countryCode)
            ?.nameAr || '';
        fileName = `كشف المسجلين في ${countryNamePF1} ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPTPF7':
        reportObservable = this.gccService.getGCCRPTPF7(
          formValue.regNum!,
          formValue.startDate!,
          formValue.stopDate
        );
        fileName = `كشف المسجلين لدى صاحب عمل خليجي ${
          formValue.regNum
        } ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPTPF9':
        reportObservable = this.gccService.getGCCRPTPF9();
        fileName = `كشف أصحاب الأعمال الخليجيين ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPT3132':
        reportObservable = this.gccService.getGCCRPT3132();
        fileName = `كشف مبالغ الإشتراكات بعد أبريل 2022 ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPT3334':
        reportObservable = this.gccService.getGCCRPT3334();
        fileName = `كشف مبالغ الإشتراكات قبل أبريل 2022 ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPT515354':
        reportObservable = this.gccService.getGCCRPT515354();
        fileName = `كشف المبالغ المسددة بعد أبريل 2022 ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'CMYGC009':
        reportObservable = this.gccService.getCMYGC009(formValue.amountKD!);
        const amountTypeName =
          this.amountTypes.find((t) => t.value === formValue.amountKD)
            ?.labelAr || '';
        fileName = `كشف الملفات الرقابية - ${amountTypeName} ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'KwtQtrActive':
        reportObservable = this.gccService.getKwtQtrActiveDisclosure();
        fileName = `المؤمن عليهم الكويتيين في قطر - الفعالين ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'KwtQtrInactive':
        reportObservable = this.gccService.getKwtQtrInactiveDisclosure();
        fileName = `المؤمن عليهم الكويتيين في قطر - غير الفعالين ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'KwtKsaActive':
        reportObservable = this.gccService.getKwtKsaActiveDisclosure();
        fileName = `أصحاب أعمال في السعودية ${new Date().toLocaleDateString()}.xlsx`;
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

  getReportsByCategory(category: string) {
    return this.reportTypes.filter((report) => report.category === category);
  }

  isFieldRequired(fieldName: string): boolean {
    return this.reportForm.get(fieldName)?.hasError('required') || false;
  }

  get selectedReportType(): string {
    return this.reportForm.get('reportType')?.value || '';
  }

  // Helper methods for form validation
  hasError(fieldName: string): boolean {
    return FormHelpers.hasError(this.reportForm.get(fieldName), fieldName);
  }

  getError(fieldName: string): string {
    // Handle form-level errors
    if (fieldName === 'dateRange' && this.reportForm.hasError('dateRange')) {
      return 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية';
    }

    return FormHelpers.getErrorMessage(
      this.reportForm.get(fieldName),
      fieldName
    );
  }
}
