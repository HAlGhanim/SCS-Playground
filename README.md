# API Services Documentation - وثائق خدمات API

## Table of Contents - جدول المحتويات

1. [GCC Service - خدمة دول مجلس التعاون](#gcc-service)
2. [GCC Reports Service - خدمة تقارير دول مجلس التعاون](#gcc-reports-service)
3. [Employees Abroad Service - خدمة العاملين بالخارج](#employees-abroad-service)

---

## GCC Service - خدمة دول مجلس التعاون

### Report Generation Endpoints - نقاط نهاية إنشاء التقارير

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
- **Parameters**: Country code (81=KSA, 82=Bahrain, 83=UAE, 84=Oman, 85=Qatar)

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

- **Arabic**: كشف مبالغ الإشتراكات لأصحاب الأعمال بعد الأول من ابريل
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

### Employer Information Endpoints - نقاط نهاية معلومات صاحب العمل

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

### Report Generation Endpoints - نقاط نهاية إنشاء التقارير

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
| 81   | السعودية | Saudi Arabia |
| 82   | البحرين  | Bahrain      |
| 83   | الإمارات | UAE          |
| 84   | عمان     | Oman         |
| 85   | قطر      | Qatar        |

---

## Registration Number Format - تنسيق رقم التسجيل

- Must be 7 digits

---

_Generated on: [Date]_
