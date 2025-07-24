# API Services Documentation - وثائق خدمات API

## Project Overview

This is an Angular 19 standalone application for generating various reports for GCC employees and Employees Abroad (EAB). The application features RTL support for Arabic language and uses Tailwind CSS for styling.

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/HAlGhanim/GCC-EAB-FE.git
   cd GCC-EAB-FE
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the application**

   ```bash
   npm start
   # or
   ng serve
   ```

   The application will be available at `http://localhost:4200`

## Project Flow

```
App Entry (main.ts)
    ↓
App Component
    ↓
Router → Pages
    ├── GCC Reports Page (/reports/gcc)
    └── Employees Abroad Page (/reports/eab)
           ↓
    Services (API calls)
           ↓
    File Download Service
           ↓
    Downloaded Report Files
```

### Request Flow with Interceptors

```
HTTP Request
    ↓
AuthInterceptor (adds API key)
    ↓
LoadingInterceptor (shows loading)
    ↓
RetryInterceptor (retry logic for GET)
    ↓
API Call
    ↓
ErrorInterceptor (error handling)
    ↓
Response/Error to Component
```

## Project Structure

### Interceptors (`src/app/interceptors/`)

1. **AuthInterceptor** - Adds PIFSS API key to all requests
2. **ErrorInterceptor** - Handles HTTP errors with Arabic error messages
3. **LoadingInterceptor** - Shows/hides loading indicator during requests
4. **RetryInterceptor** - Automatically retries failed GET requests (3 attempts)

### Pages (`src/app/pages/`)

1. **GCC Reports Page** (`/gcc-reports`)

   - Generates 17 different types of GCC reports
   - Categories: Employer, Employee, Financial, Special reports
   - Dynamic form fields based on report type

2. **Employees Abroad Page** (`/employees-abroad`)
   - Generates 6 different types of EAB reports
   - Handles active/inactive employee reports
   - CF020 regulatory files reports

### Components (`src/app/components/`)

- **Alert** - Displays success/error messages
- **Button** - Submit button with loading state
- **Card** - Container component for content
- **Forms**:
  - `FormField` - Field wrapper with label and error handling
  - `FormInput` - Custom input component
  - `FormSelect` - Custom select component
- **Icons**:
  - `PifssLogo` - Default logo
  - `PifssLogoH` - Horizontal logo
  - `PifssLogoV` - Vertical logo
- **Navbar** - Navigation between GCC and EAB reports
- **PageHeader** - Page title header
- **ReportContainer** - Main container for report pages

### Interfaces (`src/app/interfaces/`)

1. **EAB Interfaces**:

   - `EabReportType` - Types of EAB reports

2. **GCC Interfaces**:
   - `AmountType` - Payment types for CMYGC009 report
   - `GCCCountry` - GCC country codes and names
   - `ReportType` - GCC report types with categories
   - `ReportFormValue` - Form data structure

### Services (`src/app/services/`)

#### API Services:

1. **BaseService** - Base HTTP service with common methods
2. **GCCService** - All GCC report API endpoints
3. **EmployeesAbroadService** - All EAB report API endpoints
4. **AuthenticationService** - Token management (placeholder)

#### App Services:

1. **FileDownloadService** - Handles file downloads with proper filenames
2. **LoadingService** - Global loading state management
3. **MessageService** - Success/error message management

### Utils (`src/app/utils/`)

1. **DateUtils** - Date formatting and validation utilities
2. **CustomValidators** - Form validators:
   - Kuwait Civil ID
   - GCC Registration Number
   - Date range validation
   - Positive numbers
   - Arabic/English text
3. **FormHelpers** - Form error handling utilities
4. **isTokenExpired** - JWT token validation
5. **apiValidationError** - API error message extraction

## GCC Service - خدمة دول مجلس التعاون

### Report Generation Endpoints

#### getGCCRPT20

- **Arabic**: كشف لأصحاب الأعمال الخليجيين ممن يعمل لديهم كويتيين بالعملة الخليجية
- **English**: Report for GCC employers who have Kuwaiti employees in GCC currency
- **Returns**: ZIP file
- **Parameters**: Optional date

#### getGCCRPT30

- **Arabic**: كشف لأصحاب الأعمال الخليجيين بالدينار الكويتي
- **English**: Report for GCC employers in Kuwaiti Dinar
- **Returns**: ZIP file
- **Parameters**: Optional date

#### getGCCRPT40

- **Arabic**: كشف لأصحاب الأعمال الخليجيين ممن لديهم كويتيين بفصل الدائن والمدين
- **English**: Report for GCC employers with Kuwaitis - separating creditors and debtors
- **Returns**: ZIP file
- **Parameters**: Optional date

#### getGCCRPT100

- **Arabic**: كتاب إحصائي لجميع أصحاب الأعمال الخليجيين
- **English**: Statistical report for all GCC employers
- **Returns**: Excel file (.xlsx)
- **Parameters**: Optional date

#### getGCCRPT120

- **Arabic**: كشف عدد المسجلين تحت صاحب عمل خليجي بإختلاف فعالية السجل
- **English**: Report on the number of registrants under GCC employers by activity status
- **Returns**: ZIP file
- **Parameters**: Required date

#### getGCCRPT130

- **Arabic**: كشف لأصحاب الأعمال الخليجيين ممن لديهم كويتيين بالعملة الخليجية (مدين)
- **English**: Report for GCC employers with Kuwaitis in GCC currency (debtors)
- **Returns**: ZIP file for KSA/Oman, Excel file for others
- **Parameters**:
  - Balance (minimum threshold)
  - Country code (81=KSA, 82=Bahrain, 83=UAE, 84=Oman, 85=Qatar)
  - Optional date

#### getGCCRPT150

- **Arabic**: كشف أسماء المؤمن عليهم الفعالين
- **English**: Report of active insured members' names
- **Returns**: Excel file (.xlsx)
- **Parameters**:
  - Required stop date
  - Optional start date (defaults to 2006-01-01)

#### getGCCRPT170

- **Arabic**: كشف لأصحاب الأعمال الخليجيين المنتهية خدمات المؤمن عليهم لديهم حتى تاريخ
- **English**: Report for GCC employers whose insured employees' services have ended up to date
- **Returns**: ZIP file
- **Parameters**: Optional date

#### getGCCRPTPF1

- **Arabic**: كشف المسجلين في دول مجلس التعاون
- **English**: Report of registrants in GCC countries
- **Returns**: Excel file (.xlsx)
- **Parameters**: Country code (0=KWT, 81=KSA, 82=Bahrain, 83=UAE, 84=Oman, 85=Qatar)

#### getGCCRPTPF7

- **Arabic**: كشف المسجلين لدى صاحب عمل خليجي
- **English**: Report of registrants under a GCC employer
- **Returns**: Excel file (.xlsx)
- **Parameters**:
  - Registration number
  - Start date
  - Optional stop date

#### getGCCRPTPF9

- **Arabic**: كشف أصحاب الأعمال الخليجيين
- **English**: Report of GCC employers
- **Returns**: Excel file (.xlsx)
- **Parameters**: None

#### getGCCRPT3132

- **Arabic**: كشف مبالغ الإشتراكات لأصحاب الأعمال بعد الأول من ابريل 2022
- **English**: Report of subscription amounts for employers after April 1st
- **Returns**: Excel file (.xlsx)
- **Parameters**: None

#### getGCCRPT3334

- **Arabic**: كشف مبالغ الإشتراكات لأصحاب الأعمال السابقه للأول من ابريل 2022
- **English**: Report of subscription amounts for employers before April 1st, 2022
- **Returns**: Excel file (.xlsx)
- **Parameters**: None

#### getGCCRPT515354

- **Arabic**: كشف المبالغ المسدده لأصحاب الأعمال لميزانية بعد الأول من ابريل 2022
- **English**: Report of amounts paid by employers for budget after April 1st, 2022
- **Returns**: Excel file (.xlsx)
- **Parameters**: None

#### getCMYGC009

- **Arabic**: كشف الملفات الرقابية الخاص بنظام مد الحماية للكويتيين
- **English**: Report of regulatory files for the Kuwaiti protection extension system
- **Returns**: Excel file (.xlsx)
- **Parameters**: Amount type
  - 3 = إيداع بنكي (Bank deposit)
  - 4 = استقطاع من صاحب معاش (Deduction from pensioner)
  - 9 = استقطاع من القوى العاملة (Deduction from workforce)

#### getKwtQtrActiveDisclosure

- **Arabic**: طلب كشف للمؤمن عليهم الكويتيين العاملين بدولة قطر – الفعالين
- **English**: Report request for active Kuwaiti insured employees working in Qatar
- **Returns**: Excel file (.xlsx)
- **Parameters**: None

#### getKwtQtrInactiveDisclosure

- **Arabic**: طلب كشف للمؤمن عليهم الكويتيين العاملين بدولة قطر – الغير الفعالين
- **English**: Report request for inactive Kuwaiti insured employees working in Qatar
- **Returns**: Excel file (.xlsx)
- **Parameters**: None

#### getKwtKsaActiveDisclosure

- **Arabic**: أصحاب أعمال في المملكة العربية السعودية
- **English**: Employers in the Kingdom of Saudi Arabia
- **Returns**: Excel file (.xlsx)
- **Parameters**: None

---

## GCC Reports Service - خدمة تقارير دول مجلس التعاون

### Employer Information Endpoints

#### getGCCEmployerDueBalance

- **Arabic**: الرصيد المستحق لصاحب العمل الخليجي
- **English**: Get GCC employer due balance
- **Returns**: JSON object with balance in Arabic and English currencies
- **Parameters**: Registration number (8000000-8999999)

#### getGCCMonthlyBalanceAccount

- **Arabic**: قيمة الاشتراك الشهري لصاحب العمل الخليجي
- **English**: Get GCC employer monthly subscription amount
- **Returns**: JSON object with monthly balance in Arabic and English currencies
- **Parameters**: Registration number (8000000-8999999)

#### getGccEmployerInfo

- **Arabic**: بيانات صاحب العمل الخليجي
- **English**: Get GCC employer information
- **Returns**: JSON object with employer details including:
  - Name and addresses
  - License information
  - Active employee count
  - Business type and location
- **Parameters**: GCC employer civil ID

---

## Employees Abroad Service - خدمة العاملين بالخارج

### Report Generation Endpoints

#### getEABMonthsDue

- **Arabic**: كشف للمؤمن عليهم العاملين بالخارج - عدد الأشهر المستحقة
- **English**: Report for insured employees working abroad - number of months due
- **Returns**: Excel file (.xlsx)
- **Parameters**: Due date

#### getEABInActiveCreditors

- **Arabic**: كشف للمؤمن عليهم العاملين بالخارج الغير فعالين - رصيد دائن
- **English**: Report for inactive insured employees abroad - creditor balance
- **Returns**: Excel file (.xlsx)
- **Parameters**: Due date

#### getEABInActiveDeptors

- **Arabic**: كشف للمؤمن عليهم العاملين بالخارج الغير فعالين - رصيد مدين
- **English**: Report for inactive insured employees abroad - debtor balance
- **Returns**: Excel file (.xlsx)
- **Parameters**: Due date

#### getEABActiveCreditors

- **Arabic**: كشف للمؤمن عليهم العاملين بالخارج الفعالين - رصيد دائن
- **English**: Report for active insured employees abroad - creditor balance
- **Returns**: Excel file (.xlsx)
- **Parameters**: Due date

#### getEABActiveDeptors

- **Arabic**: كشف للمؤمن عليهم العاملين بالخارج الفعالين - رصيد مدين
- **English**: Report for active insured employees abroad - debtor balance
- **Returns**: Excel file (.xlsx)
- **Parameters**: Due date

#### getCF020

- **Arabic**: كشف الملفات الرقابية للعاملين بالخارج
- **English**: CF020 Report - Regulatory files for employees abroad
- **Returns**: Excel file (.xlsx)
- **Parameters**:
  - Start fiscal year date
  - End fiscal year date

---

## Country Codes Reference - مرجع رموز الدول

| Code | Arabic   | English      |
| ---- | -------- | ------------ |
| 0    | الكويت   | Kuwait       |
| 81   | السعودية | Saudi Arabia |
| 82   | البحرين  | Bahrain      |
| 83   | الإمارات | UAE          |
| 84   | عمان     | Oman         |
| 85   | قطر      | Qatar        |

## Registration Number Format - تنسيق رقم التسجيل

- Must be 7 digits

## Technology Stack

- **Frontend**: Angular 20 (Standalone)
- **Styling**: Tailwind CSS with RTL support
- **State Management**: Angular Signals
- **HTTP**: Angular HttpClient with Interceptors
- **Forms**: Reactive Forms with Custom Validators
- **Fonts**: Taminat Arabic & English fonts

---

_Generated on: [Date]_
