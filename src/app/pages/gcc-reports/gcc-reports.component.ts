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
import { GCCService } from '../../services/api-services/GCC/gcc.service';
import { HttpResponse } from '@angular/common/http';
import { AlertComponent } from '../../components/alert/alert.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormFieldComponent } from '../../components/forms/form-field/form-field.component';
import { ReportContainerComponent } from '../../components/report-container/report-container.component';
import { CardComponent } from '../../components/card/card.component';
import { GCC_REPORT_TYPES } from '../../interfaces/gcc/gcc-reports.interface';
import { GCC_COUNTRIES } from '../../interfaces/gcc/gcc-countries.interface';
import { AMOUNT_TYPES } from '../../interfaces/gcc/amounts.interface';
import { MessageService } from '../../services/app-services/message.service';
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
  template: `
    <app-report-container>
      <app-page-header
        [title]="'العاملين في دول مجلس التعاون'"
      ></app-page-header>

      <app-card>
        <app-alert
          [show]="
            messageService.isVisible() &&
            messageService.messageType() === 'success'
          "
          [type]="'success'"
          [message]="messageService.messageText()"
        ></app-alert>

        <app-alert
          [show]="
            messageService.isVisible() &&
            messageService.messageType() === 'error'
          "
          [type]="'error'"
          [message]="messageService.messageText()"
        ></app-alert>

        <div class="p-6">
          <form [formGroup]="reportForm" (ngSubmit)="generateReport()">
            <!-- Report Type Selection -->
            <app-form-field
              [label]="'نوع التقرير'"
              [required]="true"
              [containerClass]="'mb-6'"
            >
              <select
                formControlName="reportType"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">اختر نوع التقرير</option>
                <optgroup label="تقارير أصحاب الأعمال">
                  @for (report of getReportsByCategory('employer'); track
                  report.id; let i = $index) {
                  <option [value]="report.id">
                    {{ i + 1 }}. {{ report.nameAr }}
                  </option>
                  }
                </optgroup>
                <optgroup label="تقارير الموظفين">
                  @for (report of getReportsByCategory('employee'); track
                  report.id; let i = $index) {
                  <option [value]="report.id">
                    {{ i + 1 + getReportsByCategory('employer').length }}.
                    {{ report.nameAr }}
                  </option>
                  }
                </optgroup>
                <optgroup label="التقارير المالية">
                  @for (report of getReportsByCategory('financial'); track
                  report.id; let i = $index) {
                  <option [value]="report.id">
                    {{
                      i +
                        1 +
                        getReportsByCategory('employer').length +
                        getReportsByCategory('employee').length
                    }}. {{ report.nameAr }}
                  </option>
                  }
                </optgroup>
                <optgroup label="تقارير خاصة">
                  @for (report of getReportsByCategory('special'); track
                  report.id; let i = $index) {
                  <option [value]="report.id">
                    {{
                      i +
                        1 +
                        getReportsByCategory('employer').length +
                        getReportsByCategory('employee').length +
                        getReportsByCategory('financial').length
                    }}. {{ report.nameAr }}
                  </option>
                  }
                </optgroup>
              </select>
            </app-form-field>

            <!-- Dynamic Fields -->
            @if (selectedReportType) {
            <div class="space-y-4">
              <!-- Date Field -->
              @if (selectedReportType !== 'GCCRPT150' && selectedReportType !==
              'GCCRPTPF7') {
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <app-form-field
                  [label]="'التاريخ'"
                  [required]="isFieldRequired('date')"
                >
                  <input
                    type="date"
                    formControlName="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </app-form-field>
              </div>
              }

              <!-- Start/Stop Dates -->
              @if (selectedReportType === 'GCCRPT150' || selectedReportType ===
              'GCCRPTPF7') {
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <app-form-field
                  [label]="'تاريخ البداية'"
                  [required]="isFieldRequired('startDate')"
                >
                  <input
                    type="date"
                    formControlName="startDate"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </app-form-field>
                <app-form-field
                  [label]="'تاريخ النهاية'"
                  [required]="isFieldRequired('stopDate')"
                >
                  <input
                    type="date"
                    formControlName="stopDate"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </app-form-field>
              </div>
              }

              <!-- Registration Number -->
              @if (selectedReportType === 'GCCRPTPF7') {
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <app-form-field
                  [label]="'رقم التسجيل'"
                  [required]="true"
                  [hint]="'يجب أن يكون 7 أرقام'"
                >
                  <input
                    type="text"
                    formControlName="regNum"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </app-form-field>
              </div>
              }

              <!-- Balance -->
              @if (selectedReportType === 'GCCRPT130') {
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <app-form-field
                  [label]="'الحد الأدنى للرصيد'"
                  [required]="true"
                >
                  <input
                    type="number"
                    formControlName="balance"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </app-form-field>
              </div>
              }

              <!-- Country Code -->
              @if (selectedReportType === 'GCCRPT130' || selectedReportType ===
              'GCCRPTPF1') {
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <app-form-field [label]="'الدولة'" [required]="true">
                  <select
                    formControlName="countryCode"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">اختر الدولة</option>
                    @for (country of gccCountries; track country.code; let i =
                    $index) {
                    <option [value]="country.code">
                      {{ i + 1 }}. {{ country.nameAr }}
                    </option>
                    }
                  </select>
                </app-form-field>
              </div>
              }

              <!-- Amount Type -->
              @if (selectedReportType === 'CMYGC009') {
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <app-form-field [label]="'نوع الدفع'" [required]="true">
                  <select
                    formControlName="amountKD"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">اختر نوع الدفع</option>
                    @for (type of amountTypes; track type.value; let i = $index)
                    {
                    <option [value]="type.value">
                      {{ i + 1 }}. {{ type.labelAr }}
                    </option>
                    }
                  </select>
                </app-form-field>
              </div>
              }
            </div>
            }

            <app-button
              [loading]="loading"
              [disabled]="reportForm.invalid"
              [text]="'إنشاء التقرير'"
            ></app-button>
          </form>
        </div>
      </app-card>
    </app-report-container>
  `,
})
export class GCCReportsComponent implements OnInit {
  reportForm: FormGroup;
  loading = false;

  // Import constants
  reportTypes = GCC_REPORT_TYPES;
  gccCountries = GCC_COUNTRIES;
  amountTypes = AMOUNT_TYPES;

  constructor(
    private fb: FormBuilder,
    private gccService: GCCService,
    private fileDownloadService: FileDownloadService,
    public messageService: MessageService
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

    // Update validity
    Object.keys(this.reportForm.controls).forEach((key) => {
      this.reportForm.get(key)?.updateValueAndValidity({ emitEvent: false });
    });
  }

  generateReport(): void {
    if (this.reportForm.invalid) {
      this.messageService.showError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    this.loading = true;
    const formValue: ReportFormValue = this.reportForm.value;
    const reportType = formValue.reportType;

    let reportObservable;
    let fileName = '';

    // [Same switch case logic as original but with messageService instead of showSuccess/showError]
    switch (reportType) {
      case 'GCCRPT20':
        reportObservable = this.gccService.getGCCRPT20(formValue.date);
        fileName = `كشف لأصحاب الأعمال الخليجيين بالعملة الخليجية ${new Date().toLocaleDateString()}.zip`;
        break;
      // ... [All other cases remain the same]
      default:
        this.loading = false;
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
}
