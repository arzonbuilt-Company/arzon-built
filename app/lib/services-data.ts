export type WidgetType = 'roofing' | 'painting' | 'siding' | 'windows' | 'kitchen' | 'deck' | 'full'

export interface ServiceData {
  slug: string
  num: string
  widget: WidgetType
  image: string
  title:    { en: string; es: string }
  subtitle: { en: string; es: string }
  body:     { en: string; es: string }
  features: { en: string[]; es: string[] }
  process:  { en: { step: string; desc: string }[]; es: { step: string; desc: string }[] }
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'roofing', num: '01', widget: 'roofing', image: '/assets/roofing.png',
    title:    { en: 'Roofing',                          es: 'Techos'                          },
    subtitle: { en: 'Engineered for decades. Installed in days.',
                es: 'Diseñado para décadas. Instalado en días.'                               },
    body:     { en: 'A failing roof is a failing house. We strip to the deck, inspect every rafter, and rebuild with 30-year architectural shingles. Sealed ridge, synthetic underlayment, full flashing — no shortcuts.',
                es: 'Un techo en mal estado pone toda la casa en riesgo. Retiramos todo hasta la estructura, inspeccionamos cada viga y reconstruimos con tejas arquitectónicas de 30 años. Cumbrera sellada, membrana sintética — sin atajos.' },
    features: {
      en: ['30-year architectural shingles','Synthetic underlayment','Sealed ridge cap','Full flashing system','Ventilation inspection','Workmanship warranty'],
      es: ['Tejas arquitectónicas 30 años','Membrana sintética','Cumbrera sellada','Sistema de destellos completo','Inspección de ventilación','Garantía de mano de obra'],
    },
    process: {
      en: [{ step:'Inspection', desc:'Free roof inspection and damage report.' },{ step:'Removal',    desc:'Full tear-off of old materials down to the deck.' },{ step:'Repair',     desc:'Deck repairs, flashing, and underlayment.' },{ step:'Install',    desc:'Shingles installed per manufacturer specs.' },{ step:'Cleanup',    desc:'Magnetic nail sweep, full site cleanup.' }],
      es: [{ step:'Inspección', desc:'Inspección gratuita con informe de daños.' },{ step:'Retiro',     desc:'Remoción completa hasta la cubierta.' },{ step:'Reparación', desc:'Reparación de cubierta, destellos y membrana.' },{ step:'Instalación',desc:'Tejas instaladas según especificaciones.' },{ step:'Limpieza',   desc:'Barrido magnético de clavos, limpieza total.' }],
    },
  },
  {
    slug: 'painting', num: '02', widget: 'painting', image: '/assets/painting.png',
    title:    { en: 'Painting',                         es: 'Pintura'                         },
    subtitle: { en: 'Professional PCA-standard painting built for Georgia’s humidity and sun.',
                es: 'Pintura profesional bajo estándares PCA diseñada para el clima y humedad de Georgia.'       },
    body:     { en: 'In Georgia, high humidity and intense UV exposure degrade standard paint in months. Our professional process strictly adheres to PCA (Painting Contractors Association) standards: sanitizing pressure washing to eliminate mold and mildew spores, digital moisture meter validation (<12% threshold), meticulous hand-scraping and feather-sanding, sealing gaps with premium ASTM C920 class 25 elastomeric caulk, moisture-barrier priming, and two full coats of Sherwin-Williams Emerald or Duration acrylic coatings. A bulletproof finish that will not peel or fade, protecting your home for years.',
                es: 'En Georgia, la humedad extrema y el sol intenso destruyen la pintura convencional en pocos meses. Nuestro proceso profesional sigue estrictamente los estándares de la PCA (Painting Contractors Association): lavado a presión desinfectante anti-moho, verificación con medidor digital de humedad (límite <12%), raspado y lijado minucioso de bordes, sellado de juntas y ventanas con calafateo elastomérico ASTM C920 clase 25, imprimación bloqueadora de humedad y dos capas completas de Sherwin-Williams Emerald o Duration. Un acabado ultra resistente que no se descascara y protege tu hogar por años.' },
    features: {
      en: [
        'Strict PCA standards compliance (P1, P14)',
        'Sanitizing mold & mildew pressure washing',
        'Digital moisture testing (<12% wood limit)',
        'ASTM C920 class 25 elastomeric caulking',
        'Tannin & moisture-blocking technical primer',
        'Sherwin-Williams Emerald & Duration paints',
        'Peel-free workmanship warranty'
      ],
      es: [
        'Cumplimiento estricto de estándares PCA (P1, P14)',
        'Lavado desinfectante anti-moho y esporas',
        'Medición digital de humedad en madera (<12%)',
        'Calafateo elastomérico ASTM C920 clase 25',
        'Imprimación técnica bloqueadora de humedad y taninos',
        'Pinturas premium Sherwin-Williams Emerald/Duration',
        'Garantía por escrito contra descascarillado'
      ],
    },
    process: {
      en: [
        { step: 'Decontaminate & Wash', desc: 'High-pressure wash using mold-inhibiting agents to completely sanitize the siding and remove active spores.' },
        { step: 'Surface Prep', desc: 'Hand-scraping all loose paint, scraping corners, and feather-sanding rough edges to ensure a sound, flat substrate.' },
        { step: 'Moisture Testing & Sealing', desc: 'Verifying wood moisture is under 12% with digital meters, then sealing joints and trim with ASTM C920 class 25 elastomeric caulk.' },
        { step: 'Technical Primer', desc: 'Applying specialized Sherwin-Williams moisture and stain-blocking primer to seal bare wood and prevent tannin bleed.' },
        { step: 'Double Premium Coat', desc: 'Applying two full coats of Sherwin-Williams Emerald or Duration acrylic paint to recommended dry mil thickness for maximum UV defense.' }
      ],
      es: [
        { step: 'Desinfección y Lavado', desc: 'Lavado a presión con solución desinfectante para eliminar moho profundo, hongos y esporas del revestimiento.' },
        { step: 'Preparación de Superficies', desc: 'Raspado manual minucioso de pintura vieja y lijado de bordes para lograr una transición uniforme y máxima adherencia.' },
        { step: 'Medición de Humedad y Sellado', desc: 'Verificación de humedad en madera (<12%) y calafateo de juntas y ventanas con sellador elastomérico ASTM C920 clase 25.' },
        { step: 'Imprimación de Barrera', desc: 'Aplicación de primer bloqueador de humedad y taninos Sherwin-Williams para sellar áreas expuestas antes de pintar.' },
        { step: 'Doble Capa Emerald/Duration', desc: 'Dos manos completas de pintura exterior acrílica Sherwin-Williams premium para máxima elasticidad, protección UV y humedad.' }
      ],
    },
  },
  {
    slug: 'siding', num: '03', widget: 'siding', image: '/assets/siding-spruce.png',
    title:    { en: 'Siding',                           es: 'Revestimiento'                   },
    subtitle: { en: 'New skin. Same bones. Decades of protection.',
                es: 'Nueva piel. Los mismos huesos. Décadas de protección.'                   },
    body:     { en: 'Siding is the first line of defense and the face of your home. We install fiber cement, premium vinyl, and natural wood — each sealed, flashed, and finished to stand up to Georgia humidity and UV.',
                es: 'El revestimiento es la primera línea de defensa y el rostro de tu hogar. Instalamos fibrocemento, vinilo premium y madera natural — correctamente sellados y acabados para resistir la humedad y el UV de Georgia.' },
    features: {
      en: ['Fiber cement, vinyl & wood options','50-year warranty available','Moisture barrier installation','Full flashing at all joints','Color-matched trim','Engineered for Georgia climate'],
      es: ['Fibrocemento, vinilo y madera','Garantía disponible de 50 años','Barrera de humedad','Destellos en todas las juntas','Molduras coordinadas','Diseñado para el clima de Georgia'],
    },
    process: {
      en: [{ step:'Assessment',desc:'Inspect existing siding and moisture damage.' },{ step:'Removal',   desc:'Remove old siding, treat any rot or mold.' },{ step:'Wrap',       desc:'Install house wrap and moisture barrier.' },{ step:'Install',    desc:'Attach new siding panels and trim.' },{ step:'Seal',       desc:'Caulk and paint all joints and trim.' }],
      es: [{ step:'Evaluación', desc:'Inspección del revestimiento actual y humedad.' },{ step:'Retiro',     desc:'Retiro del revestimiento, tratamiento de pudrición.' },{ step:'Membrana',   desc:'Instalación de membrana y barrera de humedad.' },{ step:'Instalación',desc:'Fijación de los nuevos paneles y molduras.' },{ step:'Sellado',    desc:'Calafateo y pintura de todas las juntas.' }],
    },
  },
  {
    slug: 'windows-doors', num: '04', widget: 'windows', image: '/assets/ventanas.png',
    title:    { en: 'Windows & Doors',                  es: 'Ventanas y Puertas'              },
    subtitle: { en: 'Light in. Cold out. Curb appeal up.',
                es: 'Luz adentro. Frío afuera. Fachada mejorada.'                             },
    body:     { en: 'Double-pane, energy-efficient windows anchored plumb and true. Black-trim frames, Low-E glass, weatherstripped doors. Utility bills drop. The house looks different from the street.',
                es: 'Ventanas de doble panel eficientes ancladas a plomo. Marcos con perfil negro, vidrio de baja emisividad, puertas con burletes. Las facturas bajan. La casa se ve diferente desde la calle.' },
    features: {
      en: ['Double-pane Low-E glass','Black-trim profile options','Energy Star rated','Professional anchoring & sealing','All weather stripping included','Door frame reinforcement'],
      es: ['Vidrio doble panel de baja emisividad','Opciones de perfil negro','Certificado Energy Star','Anclaje y sellado profesional','Burletes incluidos','Refuerzo de marcos de puerta'],
    },
    process: {
      en: [{ step:'Measure',  desc:'Precise measurement of all openings.' },{ step:'Order',    desc:'Custom windows fabricated to spec.' },{ step:'Remove',   desc:'Remove old windows, inspect framing.' },{ step:'Install',  desc:'Set, level, anchor, and flash.' },{ step:'Seal',     desc:'Foam insulation, interior and exterior trim.' }],
      es: [{ step:'Medición',  desc:'Medición precisa de todas las aberturas.' },{ step:'Pedido',    desc:'Ventanas fabricadas a medida.' },{ step:'Retiro',    desc:'Retiro de ventanas viejas, inspección.' },{ step:'Instalación',desc:'Nivelar, anclar y sellar.' },{ step:'Acabado',   desc:'Espuma aislante, molduras internas y externas.' }],
    },
  },
  {
    slug: 'kitchen', num: '05', widget: 'kitchen', image: '/assets/kitchen.png',
    title:    { en: 'Kitchen',                          es: 'Cocina'                          },
    subtitle: { en: 'The room that makes the house.',
                es: 'El cuarto que hace la casa.'                                             },
    body:     { en: 'Complete kitchen remodels from demo to final detail. New cabinetry, stone countertops, tile backsplash, flooring, lighting — built for daily use and lasting ten years between updates.',
                es: 'Remodelaciones completas de cocina desde la demolición hasta el detalle final. Nuevos gabinetes, mesones de piedra, salpicadero, pisos e iluminación — construido para el uso diario.' },
    features: {
      en: ['Custom or semi-custom cabinetry','Quartz & granite countertops','Tile backsplash','Hardwood or LVP flooring','Under-cabinet lighting','Full plumbing & electrical coordination'],
      es: ['Gabinetes personalizados','Mesones de cuarzo y granito','Salpicadero en cerámica','Pisos de madera o LVP','Iluminación bajo gabinete','Coordinación de plomería y electricidad'],
    },
    process: {
      en: [{ step:'Design',   desc:'Layout planning and material selection.' },{ step:'Demo',     desc:'Surgical demolition — protect what stays.' },{ step:'Rough-in',  desc:'Electrical, plumbing, and drywall.' },{ step:'Install',   desc:'Cabinets, counters, backsplash, flooring.' },{ step:'Finish',    desc:'Fixtures, hardware, paint, final punch.' }],
      es: [{ step:'Diseño',   desc:'Planificación de distribución y materiales.' },{ step:'Demolición',desc:'Demolición quirúrgica — se protege lo que queda.' },{ step:'Instalación bruta',desc:'Electricidad, plomería y drywall.' },{ step:'Instalación',desc:'Gabinetes, mesones, salpicadero, pisos.' },{ step:'Acabado',   desc:'Accesorios, herrajes, pintura, detalles.' }],
    },
  },
  {
    slug: 'deck', num: '06', widget: 'deck', image: '/assets/deck.png',
    title:    { en: 'Deck',                             es: 'Terraza'                         },
    subtitle: { en: 'Outside, built to last.',
                es: 'Al aire libre, construido para durar.'                                   },
    body:     { en: 'Custom decks in cedar, composite, and Trex — engineered for Georgia\'s heat, humidity, and freeze cycles. Framing built to code, boards laid true, railings anchored solid.',
                es: 'Terrazas a la medida en cedro, compuesto y Trex — diseñadas para el calor, la humedad y los ciclos de congelación de Georgia. Estructura conforme al código, tablas perfectas.' },
    features: {
      en: ['Cedar, composite & Trex materials','50-year composite warranty','Built to local code','Custom railing systems','Hidden fastener options','Stain & seal included'],
      es: ['Cedro, compuesto y Trex','Garantía compuesto 50 años','Código local','Sistemas de barandas personalizados','Fijación oculta disponible','Sellado incluido'],
    },
    process: {
      en: [{ step:'Design',  desc:'Layout, material, and railing selection.' },{ step:'Permit',  desc:'Pull permits and plan approval.' },{ step:'Frame',   desc:'Footings, posts, and beam structure.' },{ step:'Deck',    desc:'Board installation and fastening.' },{ step:'Finish',  desc:'Railing, stairs, stain or seal.' }],
      es: [{ step:'Diseño',   desc:'Distribución, material y barandas.' },{ step:'Permisos',  desc:'Obtención de permisos y aprobación.' },{ step:'Estructura',desc:'Cimentación, postes y vigas.' },{ step:'Tablas',    desc:'Instalación y fijación de tablones.' },{ step:'Acabado',   desc:'Barandas, escaleras, sellado.' }],
    },
  },
  {
    slug: 'full-remodeling', num: '07', widget: 'full', image: '/assets/full-remodeling.png',
    title:    { en: 'Full Remodeling',                  es: 'Remodelación Completa'           },
    subtitle: { en: 'Same address. A presence it never had.',
                es: 'La misma dirección. Una presencia que nunca tuvo.'                       },
    body:     { en: 'From a single room to the entire house — one team manages every trade. Electrical, plumbing, framing, finishes. No hand-off chaos. One point of contact from demo day to move-in day.',
                es: 'Desde un cuarto hasta toda la casa — un solo equipo gestiona cada especialidad. Electricidad, plomería, estructura, acabados. Sin caos de traspasos. Un punto de contacto desde la demolición hasta la mudanza.' },
    features: {
      en: ['Single-team management','All trades coordinated','Custom framing & structural work','All finishes & fixtures','Project timeline with milestones','Licensed & fully insured'],
      es: ['Gestión de un solo equipo','Todas las especialidades coordinadas','Estructuras personalizadas','Todos los acabados','Cronograma con hitos','Licenciados y asegurados'],
    },
    process: {
      en: [{ step:'Scope',  desc:'Detailed walkthrough and project scope.' },{ step:'Plan',   desc:'Design, permits, and material selection.' },{ step:'Demo',   desc:'Surgical demolition, protect structure.' },{ step:'Build',  desc:'Rough-in through finish work, staged.' },{ step:'Deliver',desc:'Final inspection and owner walk-through.' }],
      es: [{ step:'Alcance',    desc:'Recorrido detallado y definición del proyecto.' },{ step:'Planificación',desc:'Diseño, permisos y materiales.' },{ step:'Demolición',  desc:'Demolición quirúrgica, protección de estructura.' },{ step:'Construcción', desc:'Desde instalación bruta hasta acabados.' },{ step:'Entrega',     desc:'Inspección final y recorrido con el propietario.' }],
    },
  },
]

export function getService(slug: string) {
  return SERVICES.find(s => s.slug === slug)
}
