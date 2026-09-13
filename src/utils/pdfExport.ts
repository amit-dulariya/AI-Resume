import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { Resume } from '../types/resume';

export interface ExportPdfOptions {
  filename?: string;
  onProgress?: (status: string) => void;
}

export interface ExportPdfResult {
  success: boolean;
  filename: string;
  error?: string;
}

/**
 * Formats a clean, professional filename for the exported resume.
 * e.g. "Alexander_Wright_Resume.pdf" or "My_Resume.pdf"
 */
export function getResumePdfFilename(resume?: Resume): string {
  const name = resume?.content?.personalInfo?.fullName?.trim();
  if (name) {
    const sanitized = name.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_');
    return `${sanitized}_Resume.pdf`;
  }
  const title = resume?.title?.trim();
  if (title) {
    const sanitized = title.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_');
    return `${sanitized}.pdf`;
  }
  return 'My_Resume.pdf';
}

/**
 * Exports the selected resume preview element as a clean, print-ready A4 PDF.
 * Uses html2canvas-pro for modern CSS (including oklch & svg icons) and jsPDF.
 */
export async function exportResumeToPdf(
  elementOrId: HTMLElement | string,
  options: ExportPdfOptions = {}
): Promise<ExportPdfResult> {
  const targetElement =
    typeof elementOrId === 'string'
      ? document.getElementById(elementOrId)
      : elementOrId;

  const filename = options.filename || 'My_Resume.pdf';

  if (!targetElement) {
    return {
      success: false,
      filename,
      error: 'Resume document element was not found in the view.',
    };
  }

  try {
    options.onProgress?.('Preparing document styles and typography...');

    // Ensure all web fonts are loaded for crisp typography
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    options.onProgress?.('Rendering A4 layout at high resolution...');

    // Render high-DPI canvas (scale: 2 for print quality)
    const canvas = await html2canvas(targetElement, {
      scale: 2, // 2x for sharp print resolution
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      onclone: (_clonedDoc, clonedElement) => {
        // Reset scale transform so that the exported PDF uses native 100% A4 dimensions
        clonedElement.style.transform = 'none';
        clonedElement.style.boxShadow = 'none';
        clonedElement.style.border = 'none';
        clonedElement.style.borderRadius = '0';
        clonedElement.style.margin = '0 auto';
        clonedElement.style.width = '794px'; // standard A4 width in px at 96 DPI
      },
    });

    options.onProgress?.('Generating PDF pages...');

    // Standard A4 dimensions in millimeters
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    const imgData = canvas.toDataURL('image/png', 1.0);

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // If resume content spans beyond a single A4 page, add subsequent pages
    while (heightLeft > 4) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    options.onProgress?.('Saving file...');
    pdf.save(filename);

    return {
      success: true,
      filename,
    };
  } catch (err: any) {
    console.error('PDF export error:', err);
    return {
      success: false,
      filename,
      error: err?.message || 'Failed to export resume PDF. Please try again.',
    };
  }
}
