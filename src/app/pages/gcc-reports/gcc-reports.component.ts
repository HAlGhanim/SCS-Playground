import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import {
  ReportType,
  GCCCountry,
  AmountType,
  ReportFormValue,
} from '../../interfaces/gcc-reports/gcc-reports.interface';
import { GCCService } from '../../services/api-services/GCC/gcc.service';
import { FileDownloadService } from '../../services/app-services/file-download.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-gcc-reports',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gcc-reports.component.html',
})
export class GCCReportsComponent implements OnInit {
  reportForm: FormGroup;
  loading = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  message = '';

  // Report types
  reportTypes: ReportType[] = [
    // Employer Reports
    {
      id: 'GCCRPT20',
      name: 'GCC Employers Report (GCC Currency)',
      nameAr: 'كشف لأصحاب الأعمال الخليجيين بالعملة الخليجية (20)',
      category: 'employer',
    },
    {
      id: 'GCCRPT30',
      name: 'GCC Employers Report (KWD)',
      nameAr: 'كشف لأصحاب الأعمال الخليجيين بالدينار الكويتي (30)',
      category: 'employer',
    },
    {
      id: 'GCCRPT40',
      name: 'GCC Employers Creditors/Debtors',
      nameAr: 'كشف لأصحاب الأعمال الخليجيين بفصل الدائن والمدين (40)',
      category: 'employer',
    },
    {
      id: 'GCCRPT100',
      name: 'Statistical Report for All GCC Employers',
      nameAr: 'كتاب احصائي لجميع أصحاب الأعمال الخليجيين (100)',
      category: 'employer',
    },
    {
      id: 'GCCRPT120',
      name: 'Registrants Count by Activity Status',
      nameAr: 'كشف عدد المسجلين تحت صاحب عمل خليجي بإختلاف فعالية السجل (120)',
      category: 'employer',
    },
    {
      id: 'GCCRPT130',
      name: 'GCC Employers Debtors Report',
      nameAr:
        'كشف لأصحاب الأعمال الخليجيين من لديهم كويتيين بالعملة الخليجية (130)',
      category: 'employer',
    },
    {
      id: 'GCCRPT170',
      name: 'Terminated Employees Report',
      nameAr:
        'كشف لأصحاب الأعمال الخليجيين المنتهية خدمات المؤمن عليهم لديهم حتى تاريخ (170)',
      category: 'employer',
    },
    {
      id: 'GCCRPTPF9',
      name: 'GCC Employers List',
      nameAr: 'كشف لأصحاب الأعمال الخليجيين (PF9)',
      category: 'employer',
    },

    // Employee Reports
    {
      id: 'GCCRPT150',
      name: 'Active Insured Members',
      nameAr: 'كشف أسماء المؤمن عليهم الفعالين (150)',
      category: 'employee',
    },
    {
      id: 'GCCRPTPF1',
      name: 'GCC Registrants by Country',
      nameAr: 'كشف المسجلين في دول مجلس التعاون (PF1)',
      category: 'employee',
    },
    {
      id: 'GCCRPTPF7',
      name: 'Registrants Under GCC Employer',
      nameAr: 'كشف المسجلين لدى صاحب عمل خليجي (PF7)',
      category: 'employee',
    },

    // Financial Reports
    {
      id: 'GCCRPT3132',
      name: 'Subscriptions After April 1st',
      nameAr: 'كشف مبالغ الإشتراكات بعد الأول من ابريل 2022 (3132)',
      category: 'financial',
    },
    {
      id: 'GCCRPT3334',
      name: 'Subscriptions Before April 1st 2022',
      nameAr: 'كشف مبالغ الإشتراكات قبل الأول من ابريل 2022 (3334)',
      category: 'financial',
    },
    {
      id: 'GCCRPT515354',
      name: 'Paid Amounts After April 1st 2022',
      nameAr: 'كشف المبالغ المسددة بعد الأول من ابريل 2022 (515354)',
      category: 'financial',
    },

    // Special Reports
    {
      id: 'CMYGC009',
      name: 'Regulatory Files - Protection Extension',
      nameAr: 'كشف الملفات الرقابية لنظام مد الحماية (009)',
      category: 'special',
    },
    {
      id: 'KwtQtrActive',
      name: 'Active Kuwaitis in Qatar',
      nameAr: 'المؤمن عليهم الكويتيين في قطر - الفعالين',
      category: 'special',
    },
    {
      id: 'KwtQtrInactive',
      name: 'Inactive Kuwaitis in Qatar',
      nameAr: 'المؤمن عليهم الكويتيين في قطر - غير الفعالين',
      category: 'special',
    },
    {
      id: 'KwtKsaActive',
      name: 'Employers in Saudi Arabia',
      nameAr: 'أصحاب أعمال في السعودية',
      category: 'special',
    },
  ];

  // GCC Countries
  gccCountries: GCCCountry[] = [
    { code: 81, nameAr: 'السعودية', nameEn: 'Saudi Arabia' },
    { code: 82, nameAr: 'البحرين', nameEn: 'Bahrain' },
    { code: 83, nameAr: 'الإمارات', nameEn: 'UAE' },
    { code: 84, nameAr: 'عمان', nameEn: 'Oman' },
    { code: 85, nameAr: 'قطر', nameEn: 'Qatar' },
  ];

  // Amount types for CMYGC009
  amountTypes: AmountType[] = [
    { value: 3, label: 'Bank Deposit', labelAr: 'إيداع بنكي' },
    {
      value: 4,
      label: 'Deduction from Pensioner',
      labelAr: 'استقطاع من صاحب معاش',
    },
    {
      value: 9,
      label: 'Deduction from Workforce',
      labelAr: 'استقطاع من القوى العاملة',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private gccService: GCCService,
    private fileDownloadService: FileDownloadService
  ) {
    this.reportForm = this.createReportForm();
  }

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

    // Set validators based on report type
    switch (reportType) {
      case 'GCCRPT120':
        this.reportForm.get('date')?.setValidators(Validators.required);
        break;
      case 'GCCRPT130':
        this.reportForm
          .get('balance')
          ?.setValidators([Validators.required, Validators.min(0)]);
        this.reportForm.get('countryCode')?.setValidators(Validators.required);
        break;
      case 'GCCRPT150':
        this.reportForm.get('stopDate')?.setValidators(Validators.required);
        break;
      case 'GCCRPTPF1':
        this.reportForm.get('countryCode')?.setValidators(Validators.required);
        break;
      case 'GCCRPTPF7':
        this.reportForm
          .get('regNum')
          ?.setValidators([
            Validators.required,
            Validators.pattern(/^[0-9]{7}$/),
          ]);
        this.reportForm.get('startDate')?.setValidators(Validators.required);
        break;
      case 'CMYGC009':
        this.reportForm.get('amountKD')?.setValidators(Validators.required);
        break;
    }

    // Update validity with { emitEvent: false } to prevent infinite loop
    Object.keys(this.reportForm.controls).forEach((key) => {
      this.reportForm.get(key)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  generateReport(): void {
    if (this.reportForm.invalid) {
      this.showError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    this.loading = true;
    const formValue: ReportFormValue = this.reportForm.value;
    const reportType = formValue.reportType;

    let reportObservable;
    let fileName = '';

    switch (reportType) {
      case 'GCCRPT20':
        reportObservable = this.gccService.getGCCRPT20(formValue.date);
        fileName = `كشف لأصحاب الأعمال الخليجيين بالعملة الخليجية ${new Date().toLocaleDateString()}.zip`;
        break;
      case 'GCCRPT30':
        reportObservable = this.gccService.getGCCRPT30(formValue.date);
        fileName = `كشف لأصحاب الأعمال الخليجيين بالدينار الكويتي ${new Date().toLocaleDateString()}.zip`;
        break;
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
        const countryCode = Number(formValue.countryCode);
        reportObservable = this.gccService.getGCCRPT130(
          formValue.balance!,
          countryCode!,
          formValue.date
        );
        const extension =
          countryCode === 81 || countryCode === 84 ? '.zip' : '.xlsx';
        fileName = `كشف لأصحاب الأعمال الخليجيين المدينين ${new Date().toLocaleDateString()}${extension}`;
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
        fileName = `كشف لأصحاب الأعمال المنتهية خدمات المؤمن عليهم ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPTPF1':
        reportObservable = this.gccService.getGCCRPTPF1(formValue.countryCode!);
        fileName = `كشف المسجلين في دول مجلس التعاون ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPTPF7':
        reportObservable = this.gccService.getGCCRPTPF7(
          formValue.regNum!,
          formValue.startDate!,
          formValue.stopDate
        );
        fileName = `كشف المسجلين لدى صاحب عمل خليجي ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPTPF9':
        reportObservable = this.gccService.getGCCRPTPF9();
        fileName = `كشف أصحاب الأعمال الخليجيين ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPT3132':
        reportObservable = this.gccService.getGCCRPT3132();
        fileName = `كشف مبالغ الإشتراكات بعد الأول من ابريل 2022 ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPT3334':
        reportObservable = this.gccService.getGCCRPT3334();
        fileName = `كشف مبالغ الإشتراكات قبل الأول من ابريل 2022 ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'GCCRPT515354':
        reportObservable = this.gccService.getGCCRPT515354();
        fileName = `كشف المبالغ المسددة بعد الأول من ابريل 2022 ${new Date().toLocaleDateString()}.xlsx`;
        break;
      case 'CMYGC009':
        reportObservable = this.gccService.getCMYGC009(formValue.amountKD!);
        fileName = `كشف الملفات الرقابية لنظام مد الحماية ${new Date().toLocaleDateString()}.xlsx`;
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

  getReportsByCategory(category: string): ReportType[] {
    return this.reportTypes.filter((report) => report.category === category);
  }

  isFieldRequired(fieldName: string): boolean {
    return this.reportForm.get(fieldName)?.hasError('required') || false;
  }

  get selectedReportType(): string {
    return this.reportForm.get('reportType')?.value || '';
  }
}
