
import { Project } from "@/components/ProjectGallery";

// Dados específicos para casos odontológicos
export const projectsData: Project[] = [
  {
    id: "1",
    title: "Coroa unitária em zircônia",
    thumbnail: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2070",
    modelUrl: "https://sketchfab.com/models/3d7ae759231941f182bdf73add09292e/embed?autospin=1&autostart=1&ui_theme=dark",
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Material: Dissilicato de lítio</li>
          <li>Elemento: 36</li>
          <li>Software: Exocad</li>
          <li>Tipo: Coroa total</li>
        </ul>
      </div>
    `,
    exocadHtmlUrl: "https://ilaftvbwammedhiozylx.supabase.co/storage/v1/object/public/exocad_html/molar-teste/MOLAR%2037.html",
    type: "Unitário",
    description: "Coroa unitária em zircônia para molar inferior, desenhada para oclusão ideal e alta resistência em região posterior.",
    category: "Odontológico"
  },
  {
    id: "2",
    title: "Prótese sobre implante – 12 a 22",
    thumbnail: "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?q=80&w=2070",
    modelUrl: "https://sketchfab.com/models/a1e2051330554a88a1855a1fc5be4243/embed?autospin=1&autostart=1&ui_theme=dark",
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Material: Zircônia</li>
          <li>Técnica: Fresagem CAD/CAM</li>
          <li>Software: Exocad</li>
          <li>Tipo: Prótese sobre implante</li>
        </ul>
      </div>
    `,
    exocadHtmlUrl: "https://ilaftvbwammedhiozylx.supabase.co/storage/v1/object/public/exocad_html/molar-teste/MOLAR%2037.html",
    type: "Implante",
    description: "Reconstrução estética de 12 a 22 com estrutura fresada, acabamento em cerâmica e planejamento digital completo.",
    category: "Odontológico"
  },
  {
    id: "3",
    title: "Lentes de Contato Dental",
    thumbnail: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932",
    modelUrl: "https://sketchfab.com/models/011525c2b4624466b06e22b698a0102f/embed?autospin=1&autostart=1&ui_theme=dark",
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Material: E.max</li>
          <li>Espessura: 0.3mm</li>
          <li>Software: Exocad</li>
          <li>Dentes: 13 a 23</li>
        </ul>
      </div>
    `,
    exocadHtmlUrl: "https://ilaftvbwammedhiozylx.supabase.co/storage/v1/object/public/exocad_html/molar-teste/MOLAR%2037.html",
    type: "Lente",
    description: "Laminados ultrafinos para correção estética com preservação máxima da estrutura dental, design personalizado com mock-up digital prévio.",
    category: "Odontológico"
  },
  {
    id: "4",
    title: "Protocolo Sobre Implante",
    thumbnail: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=2067",
    modelUrl: "https://sketchfab.com/models/e9f348dab51743caa3eb5db48e2e7c91/embed?autospin=1&autostart=1&ui_theme=dark",
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Material: Protocolo híbrido</li>
          <li>Implantes: 6 unidades</li>
          <li>Software: Exocad + Meshmixer</li>
          <li>Arcada: Superior completa</li>
        </ul>
      </div>
    `,
    exocadHtmlUrl: "https://ilaftvbwammedhiozylx.supabase.co/storage/v1/object/public/exocad_html/molar-teste/MOLAR%2037.html",
    type: "Protocolo",
    description: "Reabilitação total com protocolo híbrido sobre 6 implantes, planejamento guiado por tomografia e fluxo digital completo.",
    category: "Odontológico"
  },
  {
    id: "5",
    title: "Placa de Bruxismo",
    thumbnail: "https://images.unsplash.com/photo-1584740231956-699de7b54283?q=80&w=2070",
    modelUrl: "https://sketchfab.com/models/e916764c1d8e46169cacb4068283a50e/embed?autospin=1&autostart=1&ui_theme=dark",
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Material: Resina acrílica</li>
          <li>Tipo: Placa miorrelaxante</li>
          <li>Software: Exocad</li>
          <li>Arcada: Superior</li>
        </ul>
      </div>
    `,
    exocadHtmlUrl: "https://ilaftvbwammedhiozylx.supabase.co/storage/v1/object/public/exocad_html/molar-teste/MOLAR%2037.html",
    type: "Placa",
    description: "Placa para bruxismo com design anatômico preciso, fabricada com tecnologia CAD/CAM para máximo conforto e durabilidade.",
    category: "Odontológico"
  },
  {
    id: "6",
    title: "Molar Unitário Posterior",
    thumbnail: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2070",
    modelUrl: "https://sketchfab.com/models/3d7ae759231941f182bdf73add09292e/embed?autospin=1&autostart=1&ui_theme=dark",
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Material: Dissilicato de lítio</li>
          <li>Elemento: 36</li>
          <li>Software: Exocad</li>
          <li>Tipo: Coroa total</li>
        </ul>
      </div>
    `,
    exocadHtmlUrl: "https://ilaftvbwammedhiozylx.supabase.co/storage/v1/object/public/exocad_html/molar-teste/MOLAR%2037.html",
    type: "Unitário",
    description: "Coroa unitária em dissilicato de lítio para molar inferior, desenhada para oclusão ideal e alta resistência em região posterior.",
    category: "Odontológico"
  }
];
