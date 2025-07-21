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
  GCCBalanceResponse,
  GCCEmployerInfo,
  ReportFormValue,
} from '../../interfaces/gcc-reports/gcc-reports.interface';
import { GCCService } from '../../services/api-services/GCC/gcc.service';
import { GCCReportsService } from '../../services/api-services/GCC/gcc-reports.service';
import { FileDownloadService } from '../../services/app-services/file-download.service';

@Component({
  selector: 'app-gcc-reports',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gcc-reports.component.html',
})
export class GCCReportsComponent implements OnInit {
  reportForm: FormGroup;
  employerInfoForm: FormGroup;
  loading = false;
  activeTab: 'reports' | 'employer' = 'reports';
  showSuccessMessage = false;
  showErrorMessage = false;
  message = '';
  employerInfo: GCCEmployerInfo | null = null;
  balanceInfo: GCCBalanceResponse | null = null;

  // Report types
  reportTypes: ReportType[] = [
    // Employer Reports
    {
      id: 'GCCRPT20',
      name: 'GCC Employers Report (GCC Currency)',
      nameAr: 'كشف لأصحاب الأعمال الخليجيين بالعملة الخليجية',
      category: 'employer',
    },
    {
      id: 'GCCRPT30',
      name: 'GCC Employers Report (KWD)',
      nameAr: 'كشف لأصحاب الأعمال الخليجيين بالدينار الكويتي',
      category: 'employer',
    },
    {
      id: 'GCCRPT40',
      name: 'GCC Employers Creditors/Debtors',
      nameAr: 'كشف لأصحاب الأعمال الخليجيين بفصل الدائن والمدين',
      category: 'employer',
    },
    {
      id: 'GCCRPT100',
      name: 'Statistical Report for All GCC Employers',
      nameAr: 'كتاب إحصائي لجميع أصحاب الأعمال الخليجيين',
      category: 'employer',
    },
    {
      id: 'GCCRPT120',
      name: 'Registrants Count by Activity Status',
      nameAr: 'كشف عدد المسجلين تحت صاحب عمل خليجي',
      category: 'employer',
    },
    {
      id: 'GCCRPT130',
      name: 'GCC Employers Debtors Report',
      nameAr: 'كشف لأصحاب الأعمال الخليجيين المدينين',
      category: 'employer',
    },
    {
      id: 'GCCRPT170',
      name: 'Terminated Employees Report',
      nameAr: 'كشف لأصحاب الأعمال المنتهية خدمات المؤمن عليهم',
      category: 'employer',
    },
    {
      id: 'GCCRPTPF9',
      name: 'GCC Employers List',
      nameAr: 'كشف أصحاب الأعمال الخليجيين',
      category: 'employer',
    },

    // Employee Reports
    {
      id: 'GCCRPT150',
      name: 'Active Insured Members',
      nameAr: 'كشف أسماء المؤمن عليهم الفعالين',
      category: 'employee',
    },
    {
      id: 'GCCRPTPF1',
      name: 'GCC Registrants by Country',
      nameAr: 'كشف المسجلين في دول مجلس التعاون',
      category: 'employee',
    },
    {
      id: 'GCCRPTPF7',
      name: 'Registrants Under GCC Employer',
      nameAr: 'كشف المسجلين لدى صاحب عمل خليجي',
      category: 'employee',
    },

    // Financial Reports
    {
      id: 'GCCRPT3132',
      name: 'Subscriptions After April 1st',
      nameAr: 'كشف مبالغ الإشتراكات بعد الأول من ابريل',
      category: 'financial',
    },
    {
      id: 'GCCRPT3334',
      name: 'Subscriptions Before April 1st 2022',
      nameAr: 'كشف مبالغ الإشتراكات قبل الأول من ابريل 2022',
      category: 'financial',
    },
    {
      id: 'GCCRPT515354',
      name: 'Paid Amounts After April 1st 2022',
      nameAr: 'كشف المبالغ المسددة بعد الأول من ابريل 2022',
      category: 'financial',
    },

    // Special Reports
    {
      id: 'CMYGC009',
      name: 'Regulatory Files - Protection Extension',
      nameAr: 'كشف الملفات الرقابية لنظام مد الحماية',
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
    private gccReportsService: GCCReportsService,
    private fileDownloadService: FileDownloadService
  ) {
    this.reportForm = this.createReportForm();
    this.employerInfoForm = this.createEmployerInfoForm();
  }

  ngOnInit(): void {
    this.reportForm.get('reportType')?.valueChanges.subscribe((reportType) => {
      this.updateFormValidators(reportType);
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

  private createEmployerInfoForm(): FormGroup {
    return this.fb.group({
      civilId: ['', Validators.required],
      regNum: ['', [Validators.required, Validators.pattern(/^[8][0-9]{6}$/)]],
    });
  }

  private updateFormValidators(reportType: string): void {
    // Reset all validators
    Object.keys(this.reportForm.controls).forEach((key) => {
      if (key !== 'reportType') {
        this.reportForm.get(key)?.clearValidators();
        this.reportForm.get(key)?.updateValueAndValidity();
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
            Validators.pattern(/^[8][0-9]{6}$/),
          ]);
        this.reportForm.get('startDate')?.setValidators(Validators.required);
        break;
      case 'CMYGC009':
        this.reportForm.get('amountKD')?.setValidators(Validators.required);
        break;
    }

    // Update validity
    Object.keys(this.reportForm.controls).forEach((key) => {
      this.reportForm.get(key)?.updateValueAndValidity();
    });
  }

  generateReport(): void {
    if (this.reportForm.invalid) {
      this.showError('Please fill all required fields');
      return;
    }

    this.loading = true;
    const formValue: ReportFormValue = this.reportForm.value;
    const reportType = formValue.reportType;

    let reportObservable;

    switch (reportType) {
      case 'GCCRPT20':
        reportObservable = this.gccService.getGCCRPT20(formValue.date);
        break;
      case 'GCCRPT30':
        reportObservable = this.gccService.getGCCRPT30(formValue.date);
        break;
      case 'GCCRPT40':
        reportObservable = this.gccService.getGCCRPT40(formValue.date);
        break;
      case 'GCCRPT100':
        reportObservable = this.gccService.getGCCRPT100(formValue.date);
        break;
      case 'GCCRPT120':
        reportObservable = this.gccService.getGCCRPT120(formValue.date!);
        break;
      case 'GCCRPT130':
        reportObservable = this.gccService.getGCCRPT130(
          formValue.balance!,
          formValue.countryCode!,
          formValue.date
        );
        break;
      case 'GCCRPT150':
        reportObservable = this.gccService.getGCCRPT150(
          formValue.stopDate!,
          formValue.startDate
        );
        break;
      case 'GCCRPT170':
        reportObservable = this.gccService.getGCCRPT170(formValue.date);
        break;
      case 'GCCRPTPF1':
        reportObservable = this.gccService.getGCCRPTPF1(formValue.countryCode!);
        break;
      case 'GCCRPTPF7':
        reportObservable = this.gccService.getGCCRPTPF7(
          formValue.regNum!,
          formValue.startDate!,
          formValue.stopDate
        );
        break;
      case 'GCCRPTPF9':
        reportObservable = this.gccService.getGCCRPTPF9();
        break;
      case 'GCCRPT3132':
        reportObservable = this.gccService.getGCCRPT3132();
        break;
      case 'GCCRPT3334':
        reportObservable = this.gccService.getGCCRPT3334();
        break;
      case 'GCCRPT515354':
        reportObservable = this.gccService.getGCCRPT515354();
        break;
      case 'CMYGC009':
        reportObservable = this.gccService.getCMYGC009(formValue.amountKD!);
        break;
      case 'KwtQtrActive':
        reportObservable = this.gccService.getKwtQtrActiveDisclosure();
        break;
      case 'KwtQtrInactive':
        reportObservable = this.gccService.getKwtQtrInactiveDisclosure();
        break;
      case 'KwtKsaActive':
        reportObservable = this.gccService.getKwtKsaActiveDisclosure();
        break;
      default:
        this.loading = false;
        return;
    }

    reportObservable.pipe(finalize(() => (this.loading = false))).subscribe({
      next: (blob) => {
        const extension = this.fileDownloadService.getFileExtension(blob);
        const filename = `${reportType}_${new Date().getTime()}${extension}`;
        this.fileDownloadService.downloadFile(blob, filename);
        this.showSuccess('Report downloaded successfully');
      },
      error: (error) => {
        console.error('Error generating report:', error);
        this.showError('Error generating report. Please try again.');
      },
    });
  }

  getEmployerDueBalance(): void {
    if (this.employerInfoForm.get('regNum')?.invalid) {
      return;
    }

    this.loading = true;
    const regNum = this.employerInfoForm.get('regNum')?.value;

    this.gccReportsService
      .getGCCEmployerDueBalance(regNum)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.balanceInfo = response;
          this.showSuccess('Balance retrieved successfully');
        },
        error: (error) => {
          console.error('Error fetching balance:', error);
          this.showError('Error fetching balance');
        },
      });
  }

  getMonthlyBalance(): void {
    if (this.employerInfoForm.get('regNum')?.invalid) {
      return;
    }

    this.loading = true;
    const regNum = this.employerInfoForm.get('regNum')?.value;

    this.gccReportsService
      .getGCCMonthlyBalanceAccount(regNum)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.balanceInfo = response;
          this.showSuccess('Monthly balance retrieved successfully');
        },
        error: (error) => {
          console.error('Error fetching balance:', error);
          this.showError('Error fetching balance');
        },
      });
  }

  getEmployerInfo(): void {
    if (this.employerInfoForm.get('civilId')?.invalid) {
      return;
    }

    this.loading = true;
    const civilId = this.employerInfoForm.get('civilId')?.value;

    this.gccReportsService
      .getGccEmployerInfo(civilId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.employerInfo = response;
          this.showSuccess('Employer info retrieved successfully');
        },
        error: (error) => {
          console.error('Error fetching employer info:', error);
          this.showError('Error fetching employer info');
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
