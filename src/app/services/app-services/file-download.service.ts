import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FileDownloadService {
  downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link); // Some browsers require this
    link.click();
    document.body.removeChild(link); // Clean up
    window.URL.revokeObjectURL(url);
  }

  getFileNameFromResponse(response: HttpResponse<Blob>): string {
    const contentDisposition = response.headers.get('content-disposition');
    if (contentDisposition) {
      // Handle both filename and filename*
      const fileNameMatch = contentDisposition.match(
        /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/
      );
      if (fileNameMatch && fileNameMatch[1]) {
        // Decode URI encoding if present
        try {
          return decodeURIComponent(fileNameMatch[1].replace(/['"]/g, ''));
        } catch {
          return fileNameMatch[1].replace(/['"]/g, '');
        }
      }
    }

    // Generate filename based on content type
    const extension = this.getFileExtension(response.body!);
    return `gcc_report_${new Date().getTime()}${extension}`;
  }

  getFileExtension(blob: Blob): string {
    switch (blob.type) {
      case 'application/x-zip-compressed':
      case 'application/zip':
        return '.zip';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
        return '.xlsx';
      case 'application/pdf':
        return '.pdf';
      default:
        return '';
    }
  }

  // Optional: Add error handling
  downloadFileWithErrorHandling(blob: Blob, filename: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.downloadFile(blob, filename);
        resolve();
      } catch (error) {
        console.error('Error downloading file:', error);
        reject(error);
      }
    });
  }
}
