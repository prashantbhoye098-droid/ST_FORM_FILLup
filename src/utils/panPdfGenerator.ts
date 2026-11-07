import { PDFDocument, degrees } from 'pdf-lib';

export async function convertToPngDataUrl(src: string): Promise<string> {
  if (src.startsWith('data:image/png')) {
    return src;
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width || 400;
      canvas.height = img.naturalHeight || img.height || 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

/**
 * Dynamically renders the pages of any uploaded PDF file to high-res PNG image Data URLs
 */
export async function renderPdfPagesToImages(
  pdfBytesOrUrl: Uint8Array | string
): Promise<{ page1: string; page2?: string }> {
  const pdfjs = (window as any).pdfjsLib;
  if (!pdfjs) {
    throw new Error('PDF.js लायब्ररी लोड होत आहे. कृपया पुन्हा प्रयत्न करा.');
  }

  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  let docData: any;
  if (typeof pdfBytesOrUrl === 'string') {
    docData = { url: pdfBytesOrUrl };
  } else {
    docData = { data: pdfBytesOrUrl };
  }

  const loadingTask = pdfjs.getDocument(docData);
  const pdf = await loadingTask.promise;

  // Render Page 1
  const p1 = await pdf.getPage(1);
  const vp1 = p1.getViewport({ scale: 2.0 });
  const canvas1 = document.createElement('canvas');
  canvas1.width = vp1.width;
  canvas1.height = vp1.height;
  const ctx1 = canvas1.getContext('2d');
  await p1.render({ canvasContext: ctx1, viewport: vp1 }).promise;
  const page1 = canvas1.toDataURL('image/png');

  // Render Page 2 if exists
  let page2: string | undefined;
  if (pdf.numPages >= 2) {
    const p2 = await pdf.getPage(2);
    const vp2 = p2.getViewport({ scale: 2.0 });
    const canvas2 = document.createElement('canvas');
    canvas2.width = vp2.width;
    canvas2.height = vp2.height;
    const ctx2 = canvas2.getContext('2d');
    await p2.render({ canvasContext: ctx2, viewport: vp2 }).promise;
    page2 = canvas2.toDataURL('image/png');
  }

  return { page1, page2 };
}

export interface PanPdfOverlayOptions {
  pdfUrlOrBytes: string | Uint8Array;
  photoDataUrl?: string;
  signatureDataUrl?: string;
  crossSign?: boolean;
  photo1X?: number; // % from left
  photo1Y?: number; // % from top
  photo1Width?: number;
  photo1Height?: number;
  photo2X?: number;
  photo2Y?: number;
  photo2Width?: number;
  photo2Height?: number;
  signPage2X?: number;
  signPage2Y?: number;
  signPage2Width?: number;
  signPage2Height?: number;
  isCorrection?: boolean;
}

export async function generatePanPdfWithOverlays(
  options: PanPdfOverlayOptions
): Promise<Blob> {
  let existingPdfBytes: Uint8Array;
  if (typeof options.pdfUrlOrBytes === 'string') {
    const res = await fetch(options.pdfUrlOrBytes);
    existingPdfBytes = new Uint8Array(await res.arrayBuffer());
  } else {
    existingPdfBytes = options.pdfUrlOrBytes;
  }

  const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const page1 = pages[0];
  const { width: p1Width, height: p1Height } = page1.getSize();

  // Standard PAN Form 49A exact coordinates
  const p1X = (options.photo1X ?? 4.2) / 100 * p1Width;
  const p1W = (options.photo1Width ?? 16.5) / 100 * p1Width;
  const p1H = (options.photo1Height ?? 15.2) / 100 * p1Height;
  const p1Y = p1Height - ((options.photo1Y ?? 13.0) / 100 * p1Height) - p1H;

  const p2X = (options.photo2X ?? 79.5) / 100 * p1Width;
  const p2W = (options.photo2Width ?? 16.5) / 100 * p1Width;
  const p2H = (options.photo2Height ?? 15.2) / 100 * p1Height;
  const p2Y = p1Height - ((options.photo2Y ?? 13.0) / 100 * p1Height) - p2H;

  // Embed Photo
  if (options.photoDataUrl) {
    try {
      const pngData = await convertToPngDataUrl(options.photoDataUrl);
      const photoImg = await pdfDoc.embedPng(pngData);

      // Page 1 Left Photo
      page1.drawImage(photoImg, {
        x: p1X,
        y: p1Y,
        width: p1W,
        height: p1H,
      });

      // Page 1 Right Photo
      page1.drawImage(photoImg, {
        x: p2X,
        y: p2Y,
        width: p2W,
        height: p2H,
      });
    } catch (e) {
      console.error('Failed to embed photo in PDF', e);
    }
  }

  // Embed Signature
  if (options.signatureDataUrl) {
    try {
      const pngSignData = await convertToPngDataUrl(options.signatureDataUrl);
      const signImg = await pdfDoc.embedPng(pngSignData);

      // Cross Signature across Left Photo on Page 1
      if (options.crossSign !== false) {
        const crossW = p1W * 1.05;
        const crossH = p1H * 0.42;
        const crossX = p1X - (p1W * 0.05);
        const crossY = p1Y - (p1H * 0.08);

        page1.drawImage(signImg, {
          x: crossX,
          y: crossY,
          width: crossW,
          height: crossH,
          rotate: degrees(-18),
        });
      }

      // Page 2 Bottom-Right Corner Signature
      if (pages.length > 1) {
        const page2 = pages[1];
        const { width: p2Width, height: p2Height } = page2.getSize();

        const defaultSignY = options.isCorrection ? 41.0 : 90.0;
        const defaultSignX = options.isCorrection ? 53.5 : 56.5;
        const defaultSignW = options.isCorrection ? 38.0 : 36.5;
        const defaultSignH = options.isCorrection ? 5.2 : 5.0;

        const sW = (options.signPage2Width ?? defaultSignW) / 100 * p2Width;
        const sH = (options.signPage2Height ?? defaultSignH) / 100 * p2Height;
        const sX = (options.signPage2X ?? defaultSignX) / 100 * p2Width;
        const sY = p2Height - ((options.signPage2Y ?? defaultSignY) / 100 * p2Height) - sH;

        page2.drawImage(signImg, {
          x: sX,
          y: sY,
          width: sW,
          height: sH,
        });
      }
    } catch (e) {
      console.error('Failed to embed signature in PDF', e);
    }
  }

  const modifiedPdfBytes = await pdfDoc.save();
  return new Blob([modifiedPdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
}
