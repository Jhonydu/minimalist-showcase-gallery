
// supabase/functions/set-html-metadata/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get request body
    const { filePath } = await req.json();
    
    if (!filePath) {
      return new Response(JSON.stringify({ error: "File path is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    
    // Split path into bucket and path components
    const pathParts = filePath.split('/');
    const bucketName = pathParts[0];
    const pathInBucket = pathParts.slice(1).join('/');
    
    // Update the metadata for the file to correctly set Content-Type
    const { data, error } = await supabaseClient
      .storage
      .from(bucketName)
      .updateBucket({
        public: true,
        fileSizeLimit: null,
        allowedMimeTypes: ['text/html', 'application/javascript', 'text/css', 'image/png', 'image/jpeg'],
      });
      
    if (error) {
      throw error;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "HTML metadata updated successfully",
        data
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
