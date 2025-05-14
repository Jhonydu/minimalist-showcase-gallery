
import { supabase } from "@/integrations/supabase/client";

export async function uploadHtmlFile(
  file: File,
  bucketName: string = 'exocad_html',
  folderPath: string = ''
): Promise<{ url: string; error: Error | null }> {
  try {
    // Sanitize file name to avoid URL encoding issues
    const fileName = file.name.replace(/\s+/g, '-');
    
    // Construct file path
    const filePath = folderPath 
      ? `${folderPath}/${fileName}`
      : fileName;
    
    // Upload the file with the correct content type
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        contentType: 'text/html',
        upsert: true
      });
    
    if (error) {
      throw error;
    }
    
    // Get the public URL and append content_type parameter for proper display
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    // Append content_type=text/html to ensure proper rendering
    const finalUrl = publicUrl.includes('?') 
      ? `${publicUrl}&content_type=text/html` 
      : `${publicUrl}?content_type=text/html`;
    
    return { 
      url: finalUrl,
      error: null
    };
  } catch (error) {
    console.error("Error uploading HTML file:", error);
    return {
      url: '',
      error: error instanceof Error ? error : new Error('Unknown error occurred')
    };
  }
}

// Helper to process existing URLs to ensure HTML content type
export function processHtmlUrl(url: string): string {
  if (!url) return '';
  
  return url.includes('?')
    ? `${url}&content_type=text/html`
    : `${url}?content_type=text/html`;
}
