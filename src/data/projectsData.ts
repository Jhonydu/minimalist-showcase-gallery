
import { Project } from "@/components/ProjectGallery";

// Dados de exemplo para os projetos
export const projectsData: Project[] = [
  {
    id: "1",
    title: "Casa Moderna",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    // EXEMPLO: Link do Sketchfab - substitua pelo seu modelo
    modelUrl: "https://sketchfab.com/models/e916764c1d8e46169cacb4068283a50e/embed",
    // EXEMPLO: HTML embutido - substitua pelo seu conteúdo
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Área: 230m²</li>
          <li>Pavimentos: 2</li>
          <li>Quartos: 3</li>
          <li>Banheiros: 2</li>
        </ul>
      </div>
    `,
    type: "Projeto Residencial",
    description: "Projeto residencial com foco em integração de espaços e amplitude. Uso de linhas retas e amplos painéis de vidro para maximizar a iluminação natural.",
    category: "Residencial"
  },
  {
    id: "2",
    title: "Loft Corporativo",
    thumbnail: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069",
    // EXEMPLO: Link do Sketchfab - substitua pelo seu modelo
    modelUrl: "https://sketchfab.com/models/91894c41353c455dac6bbc02c04d91f4/embed",
    // EXEMPLO: HTML embutido - substitua pelo seu conteúdo
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Área: 120m²</li>
          <li>Estações de trabalho: 12</li>
          <li>Salas de reunião: 2</li>
          <li>Copa/área de descompressão: 1</li>
        </ul>
      </div>
    `,
    type: "Projeto Comercial",
    description: "Espaço de trabalho moderno para startup de tecnologia. Design que incentiva a colaboração e criatividade, com áreas flexíveis e recursos tecnológicos integrados.",
    category: "Comercial"
  },
  {
    id: "3",
    title: "Prótese sobre implante – 12 a 22",
    thumbnail: "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?q=80&w=2070",
    // EXEMPLO: Link do Sketchfab - substitua pelo seu modelo
    modelUrl: "https://sketchfab.com/models/a1e2051330554a88a1855a1fc5be4243/embed",
    // EXEMPLO: HTML embutido - substitua pelo seu conteúdo
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
    type: "Implante",
    description: "Reconstrução estética de 12 a 22 com estrutura fresada, acabamento em cerâmica e planejamento digital completo.",
    category: "Odontológico"
  },
  {
    id: "4",
    title: "Lentes de Contato Dental",
    thumbnail: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932",
    // EXEMPLO: Link do Sketchfab - substitua pelo seu modelo
    modelUrl: "https://sketchfab.com/models/011525c2b4624466b06e22b698a0102f/embed",
    // EXEMPLO: HTML embutido - substitua pelo seu conteúdo
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
    type: "Lente",
    description: "Laminados ultrafinos para correção estética com preservação máxima da estrutura dental, design personalizado com mock-up digital prévio.",
    category: "Odontológico"
  },
  {
    id: "5",
    title: "Protocolo Sobre Implante",
    thumbnail: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=2067",
    // EXEMPLO: Link do Sketchfab - substitua pelo seu modelo
    modelUrl: "https://sketchfab.com/models/e9f348dab51743caa3eb5db48e2e7c91/embed",
    // EXEMPLO: HTML embutido - substitua pelo seu conteúdo
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
    type: "Protocolo",
    description: "Reabilitação total com protocolo híbrido sobre 6 implantes, planejamento guiado por tomografia e fluxo digital completo.",
    category: "Odontológico"
  },
  {
    id: "6",
    title: "Unitário Posterior",
    thumbnail: "https://images.unsplash.com/photo-1584740231956-699de7b54283?q=80&w=2070",
    // EXEMPLO: Link do Sketchfab - substitua pelo seu modelo
    modelUrl: "https://sketchfab.com/models/a56f727cf9084971897b774d3b2d16a0/embed",
    // EXEMPLO: HTML embutido - substitua pelo seu conteúdo
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
    type: "Unitário",
    description: "Coroa unitária em dissilicato de lítio para molar inferior, desenhada para oclusão ideal e alta resistência em região posterior.",
    category: "Odontológico"
  }
];
