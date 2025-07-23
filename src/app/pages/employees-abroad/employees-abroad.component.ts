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
  template: `
    <app-report-container>
      <app-page-header [title]="'العاملين بالخارج'"></app-page-header>

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
          <form [formGroup]="eabForm" (ngSubmit)="generateEabReport()">
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
                @for (report of eabReportTypes; track report.id; let i = $index)
                {
                <option [value]="report.id">
                  {{ i + 1 }}. {{ report.name }}
                </option>
                }
              </select>
            </app-form-field>

            <!-- Dynamic Fields -->
            @if (selectedEabReportType) {
            <div class="space-y-4">
              <!-- Due Date for most reports -->
              @if (selectedEabReportType !== 'cf020') {
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <app-form-field
                  [label]="'التاريخ المستحق'"
                  [required]="isEabFieldRequired('dueDate')"
                >
                  <input
                    type="date"
                    formControlName="dueDate"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </app-form-field>
              </div>
              }

              <!-- Start/End FY for CF020 -->
              @if (selectedEabReportType === 'cf020') {
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <app-form-field
                  [label]="'بداية السنة المالية'"
                  [required]="isEabFieldRequired('startFY')"
                >
                  <input
                    type="date"
                    formControlName="startFY"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </app-form-field>
                <app-form-field
                  [label]="'نهاية السنة المالية'"
                  [required]="isEabFieldRequired('endFY')"
                >
                  <input
                    type="date"
                    formControlName="endFY"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </app-form-field>
              </div>
              }
            </div>
            }

            <app-button
              [loading]="loading"
              [disabled]="eabForm.invalid"
              [text]="'إنشاء التقرير'"
            ></app-button>
          </form>
        </div>
      </app-card>
    </app-report-container>
  `,
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
      this.messageService.showError('يرجى ملء جميع الحقول المطلوبة');
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
}
