export interface ExtractedPdfContent {
  text: string;
  base64: string;
  hasExtractableText: boolean;
  charCount: number;
  wordCount: number;
  error: string | null;
}

/**
 * Extracts plain text strings and base64 from a PDF file.
 */
export async function extractTextFromPdf(file: File): Promise<ExtractedPdfContent> {
  if (!file) {
    return {
      text: '',
      base64: '',
      hasExtractableText: false,
      charCount: 0,
      wordCount: 0,
      error: 'No file was provided.',
    };
  }

  // Validate PDF extension or MIME type
  const isPdf =
    file.type === 'application/pdf' ||
    file.name.toLowerCase().endsWith('.pdf');

  if (!isPdf) {
    return {
      text: '',
      base64: '',
      hasExtractableText: false,
      charCount: 0,
      wordCount: 0,
      error: 'Invalid file format. Please upload a valid PDF document (.pdf).',
    };
  }

  if (file.size === 0) {
    return {
      text: '',
      base64: '',
      hasExtractableText: false,
      charCount: 0,
      wordCount: 0,
      error: 'The uploaded PDF file is empty (0 bytes).',
    };
  }

  // Read base64
  let base64 = '';
  try {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    const chunkSize = 8192;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    base64 = btoa(binary);
  } catch (err) {
    console.warn('Failed to convert file to base64:', err);
  }

  // Extract raw text from PDF binary/streams
  try {
    const textBuffer = await file.text();

    // Strategy 1: Extract text in PDF parentheses inside BT ... ET text objects
    const textBlocks: string[] = [];
    const btRegex = /BT[\s\S]*?ET/g;
    let btMatch;

    while ((btMatch = btRegex.exec(textBuffer)) !== null) {
      const block = btMatch[0];
      // Match (text) or [(text1)(text2)]
      const stringRegex = /\(([^)]*)\)/g;
      let strMatch;
      let blockText = '';
      while ((strMatch = stringRegex.exec(block)) !== null) {
        let clean = strMatch[1]
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, ' ')
          .replace(/\\t/g, ' ')
          .replace(/\\\(/g, '(')
          .replace(/\\\)/g, ')')
          .replace(/\\\\/g, '\\');
        // Filter out non-printable binary junk
        clean = clean.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
        blockText += clean + ' ';
      }
      if (blockText.trim()) {
        textBlocks.push(blockText.trim());
      }
    }

    let extractedText = textBlocks.join('\n');

    // Strategy 2: If BT...ET yielded very little text, search for plain printable sequences
    if (extractedText.length < 50) {
      const printableChunks = textBuffer.match(/[A-Za-z0-9\s.,;:!@#$%^&*()_\-+=[\]{}|'"`~/?]{8,}/g) || [];
      const filteredChunks = printableChunks
        .filter((chunk) => {
          const t = chunk.trim();
          // Filter out typical PDF dictionary keywords and hex
          return (
            !t.startsWith('/Root') &&
            !t.startsWith('/Pages') &&
            !t.startsWith('/Font') &&
            !t.startsWith('/Type') &&
            !t.startsWith('/Filter') &&
            !t.startsWith('endobj') &&
            !t.startsWith('xref') &&
            t.length > 10 &&
            /[a-zA-Z]{3,}/.test(t)
          );
        })
        .slice(0, 150);

      if (filteredChunks.length > 0) {
        extractedText = filteredChunks.join('\n');
      }
    }

    // Clean up excessive whitespace
    extractedText = extractedText
      .replace(/[ \t]+/g, ' ')
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();

    const charCount = extractedText.length;
    const wordCount = extractedText ? extractedText.split(/\s+/).length : 0;
    const hasExtractableText = charCount >= 40;

    return {
      text: extractedText,
      base64,
      hasExtractableText,
      charCount,
      wordCount,
      error: null,
    };
  } catch (err: any) {
    return {
      text: '',
      base64,
      hasExtractableText: false,
      charCount: 0,
      wordCount: 0,
      error: 'Failed to read PDF text. ' + (err?.message || ''),
    };
  }
}
