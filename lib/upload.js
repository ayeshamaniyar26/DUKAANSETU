import fs from 'fs/promises';
import path from 'path';

/**
 * Handles local file upload for Next.js Server Actions
 * @param {File} file - The file object from formData
 * @returns {Promise<string|null>} - The public URL path of the uploaded file
 */
export async function handleFileUpload(file) {
  if (!file || typeof file === 'string' || file.size === 0) return null;
  
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const cleanName = file.name.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
    const filename = `${Date.now()}-${cleanName}`;
    
    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    
    return `/uploads/${filename}`;
  } catch (err) {
    console.error('File upload utility error:', err);
    return null;
  }
}
