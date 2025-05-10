
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
    description: "Projeto residencial com foco em integração de espaços e amplitude. Uso de linhas retas e amplos painéis de vidro para maximizar a iluminação natural."
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
    description: "Espaço de trabalho moderno para startup de tecnologia. Design que incentiva a colaboração e criatividade, com áreas flexíveis e recursos tecnológicos integrados."
  },
  {
    id: "3",
    title: "Apartamento Minimalista",
    thumbnail: "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?q=80&w=2070",
    // EXEMPLO: Link do Sketchfab - substitua pelo seu modelo
    modelUrl: "https://sketchfab.com/models/a1e2051330554a88a1855a1fc5be4243/embed",
    // EXEMPLO: HTML embutido - substitua pelo seu conteúdo
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Área: 72m²</li>
          <li>Quartos: 1</li>
          <li>Banheiros: 1</li>
          <li>Varanda integrada</li>
        </ul>
      </div>
    `,
    type: "Projeto Residencial",
    description: "Conceito minimalista para apartamento urbano, com aproveitamento máximo do espaço e soluções de armazenamento inteligentes. Paleta de cores neutras e linhas limpas."
  },
  {
    id: "4",
    title: "Café Conceito",
    thumbnail: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932",
    // EXEMPLO: Link do Sketchfab - substitua pelo seu modelo
    modelUrl: "https://sketchfab.com/models/011525c2b4624466b06e22b698a0102f/embed",
    // EXEMPLO: HTML embutido - substitua pelo seu conteúdo
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Área: 85m²</li>
          <li>Capacidade: 40 pessoas</li>
          <li>Balcão: 4,5m</li>
          <li>Cozinha: 15m²</li>
        </ul>
      </div>
    `,
    type: "Projeto Comercial",
    description: "Espaço aconchegante com design que prioriza experiência sensorial. Uso de materiais naturais como madeira e pedra, combinados com iluminação estratégica."
  },
  {
    id: "5",
    title: "Residência de Campo",
    thumbnail: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=2067",
    // EXEMPLO: Link do Sketchfab - substitua pelo seu modelo
    modelUrl: "https://sketchfab.com/models/e9f348dab51743caa3eb5db48e2e7c91/embed",
    // EXEMPLO: HTML embutido - substitua pelo seu conteúdo
    htmlContent: `
      <div class="p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">Especificações</h4>
        <ul class="list-disc pl-5 text-sm space-y-1">
          <li>Área construída: 280m²</li>
          <li>Terreno: 1500m²</li>
          <li>Quartos: 4</li>
          <li>Área externa com piscina e churrasqueira</li>
        </ul>
      </div>
    `,
    type: "Projeto Residencial",
    description: "Casa de campo que integra o ambiente natural ao espaço construído. Grandes aberturas, uso de materiais locais e design que favorece a ventilação natural e aproveitamento da luz."
  }
];
