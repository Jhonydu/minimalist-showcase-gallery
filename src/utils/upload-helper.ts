
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
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    return { 
      url: publicUrl,
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
