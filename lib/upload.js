/**
 * Handles file upload by converting to Base64 for persistence on serverless environments like Vercel.
 * Note: For production, using an external storage like Supabase Storage or S3 is recommended.
 * @param {File} file - The file object from formData
 * @returns {Promise<string|null>} - The Base64 string of the uploaded file
 */
export async function handleFileUpload(file) {
  if (!file || typeof file === 'string' || file.size === 0) return null;
  
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Determine mime type
    const mimeType = file.type || 'image/jpeg';
    
    // Convert to Base64
    const base64String = buffer.toString('base64');
    
    return `data:${mimeType};base64,${base64String}`;
  } catch (err) {
    console.error('File upload utility error:', err);
    return null;
  }
}
