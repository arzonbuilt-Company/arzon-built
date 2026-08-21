export type WidgetType = 'roofing' | 'painting' | 'siding' | 'windows' | 'kitchen' | 'deck' | 'full'

export interface ServiceData {
  slug: string
  num: string
  widget: WidgetType
  image: string
  beforeImage: string
  afterImage: string
  gallery: {
    image: string
    caption: { en: string; es: string }
  }[]
  title:    { en: string; es: string }
  subtitle: { en: string; es: string }
  body:     { en: string; es: string }
  features: { en: string[]; es: string[] }
  process:  { en: { step: string; desc: string }[]; es: { step: string; desc: string }[] }
}

export const SERVICES: ServiceData[] = [
  {
    slug: 'roofing', num: '01', widget: 'roofing', image: '/assets/roofing.png',
    beforeImage: '/assets/roofing_before.png', afterImage: '/assets/roofing.png',
    gallery: [
      { image: '/assets/roofing.png', caption: { en: 'Completed charcoal architectural roof shingles.', es: 'Tejas arquitectónicas de carbón completadas.' } },
      { image: '/assets/roofing_detail_1.png', caption: { en: 'Clinical installation line and ridge vent detailing.', es: 'Detalle de línea de instalación clínica y ventilación en cumbrera.' } },
      { image: '/assets/roofing_detail_2.png', caption: { en: 'Flawless chimney flashing and roof edge finishes.', es: 'Acabados de cumbreras y destellos metálicos de chimenea impecables.' } }
    ],
    title:    { en: 'Roofing',                          es: 'Techos'                          },
    subtitle: { en: 'Engineered for decades. Installed with clinical precision.',
                es: 'Diseñado para décadas. Instalado con precisión clínica.'                 },
    body:     { en: 'A failing roof compromises your entire home. We strip down to the structural plywood decking, replace any wood rot we detect, and rebuild with premium 30-year architectural shingles. We install synthetic water-resistant underlayment, ice & water shields in valleys, and a sealed ridge cap for ventilation. We treat your yard like our own, performing daily magnetic sweeps for nails to ensure absolute safety.',
                es: 'Un techo dañado pone en peligro toda la casa. Desmontamos todo hasta la madera contrachapada, reemplazamos la madera podrida y reconstruimos con tejas arquitectónicas premium de 30 años. Instalamos membranas sintéticas impermeables, barreras contra hielo y agua en los valles y cumbreras selladas para la ventilación. Cuidamos tu jardín con un barrido magnético de clavos diario para garantizar seguridad total.' },
    features: {
      en: ['30-Year Architectural Shingles','Synthetic Waterproof Underlayment','Self-Sealing Ice & Water Valley Shields','Precision Metal Flashing (Chimney/Walls)','Ridge Vent Airflow Optimization','Magnetic Nail Cleanup Guarantee'],
      es: ['Tejas arquitectónicas de 30 años','Membrana sintética impermeable','Barrera autoadhesiva para valles y bordes','Intermitentes metálicos de precisión','Optimización de ventilación en cumbrera','Garantía de barrido magnético de clavos'],
    },
    process: {
      en: [
        { step: 'Damage Assessment', desc: 'Thorough inspection of shingles, flashing, decking, and attic ventilation.' },
        { step: 'Tear-Off & Inspection', desc: 'Full removal of old layers down to the wood. We check and replace rotten plywood.' },
        { step: 'Waterproofing Layers', desc: 'Application of self-adhering valley shields and high-performance synthetic underlayment.' },
        { step: 'Shingle Installation', desc: 'Hand-nailed architectural shingles laid to strict manufacturer specifications.' },
        { step: 'Magnetic Sweep & Handover', desc: 'Multiple passes with magnets to collect nails, full property cleanup, and final review.' }
      ],
      es: [
        { step: 'Inspección de Daños', desc: 'Evaluación exhaustiva de tejas, destellos, madera y ventilación del ático.' },
        { step: 'Desmantelamiento Completo', desc: 'Retiro total de capas viejas. Inspeccionamos y reemplazamos madera podrida.' },
        { step: 'Barreras de Humedad', desc: 'Instalación de membranas autoadhesivas en valles y membrana sintética en toda la cubierta.' },
        { step: 'Montaje de Tejas', desc: 'Instalación de tejas arquitectónicas siguiendo estrictas normas de fábrica.' },
        { step: 'Barrido Magnético y Entrega', desc: 'Limpieza total con rodillos magnéticos para clavos y recorrido de inspección final.' }
      ],
    },
  },
  {
    slug: 'painting', num: '02', widget: 'painting', image: '/assets/painting.png',
    beforeImage: '/assets/painting_before.png', afterImage: '/assets/painting.png',
    gallery: [
      { image: '/assets/painting.png', caption: { en: 'Clean and durable exterior paint coating finish.', es: 'Acabado de pintura exterior limpio y duradero.' } },
      { image: '/assets/painting_detail_1.png', caption: { en: 'Precise masking and clean cut-in paint lines.', es: 'Enmascarado preciso y cortes de pintura limpios.' } },
      { image: '/assets/painting_detail_2.png', caption: { en: 'Smooth warm greige interior wall finishing.', es: 'Acabado de paredes interiores en greige cálido y suave.' } }
    ],
    title:    { en: 'Painting',                         es: 'Pintura'                         },
    subtitle: { en: 'The premium finish that frames and protects your home.',
                es: 'El acabado premium que enmarca y protege su hogar.'                     },
    body:     { en: 'Professional painting is 80% preparation and 20% application. We power wash exteriors, scrape loose paint, sand rough edges, and caulk every gap with premium grade sealant. We apply a marine-grade structural primer to guarantee adhesion and finish with two generous coats of UV-stable acrylic paint. The result is a vibrant, weather-resistant coating that retains its color for over a decade.',
                es: 'La pintura profesional es 80% preparación y 20% aplicación. Lavamos a presión las fachadas, raspamos la pintura suelta, lijamos los bordes rugosos y sellamos cada grieta con sellador de alta calidad. Aplicamos un imprimante grado marino para garantizar la adherencia y terminamos con dos capas de pintura acrílica resistente a los rayos UV. El resultado es un color vibrante que dura más de una década.' },
    features: {
      en: ['Premium Sherwin-Williams Paint','Marine-Grade Adhesive Primers','Elastic Weather-Resistant Caulking','Full Surface Preparation (Sanding/Washing)','Strict Window and Landscape Masking','10-Year Color Retention Guarantee'],
      es: ['Pinturas Sherwin-Williams premium','Imprimantes de alta adherencia grado marino','Sellado elástico resistente al clima','Preparación total (lijado, raspado, lavado)','Enmascarado riguroso de ventanas y plantas','Garantía de retención de color por 10 años'],
    },
    process: {
      en: [
        { step: 'Surface Assessment', desc: 'We inspect for wood rot, moisture traps, and paint adhesion issues.' },
        { step: 'Deep Preparation', desc: 'Power washing, scraping, sanding, and filling cracks with flexible outdoor caulk.' },
        { step: 'Protective Priming', desc: 'Full application of specialized bonding primer on all bare or repaired surfaces.' },
        { step: 'Dual Coat Application', desc: 'Two coats of premium acrylic paint applied using professional spray and brush techniques.' },
        { step: 'Detail Walkthrough', desc: 'Final inspection with the homeowner to check corners, lines, and clean borders.' }
      ],
      es: [
        { step: 'Inspección de Superficie', desc: 'Buscamos madera dañada, focos de humedad y problemas de adherencia.' },
        { step: 'Preparación Profunda', desc: 'Lavado a presión, raspado de pintura vieja, lijado y calafateado de grietas.' },
        { step: 'Imprimación Protectora', desc: 'Capa completa de primer de alta adherencia en áreas expuestas o reparadas.' },
        { step: 'Doble Capa de Acabado', desc: 'Dos manos de pintura acrílica aplicadas con técnicas de pulverizado y brocha fina.' },
        { step: 'Inspección de Detalles', desc: 'Recorrido con el cliente para verificar esquinas, cortes limpios y acabados.' }
      ],
    },
  },
  {
    slug: 'siding', num: '03', widget: 'siding', image: '/assets/siding.png',
    beforeImage: '/assets/siding_before.png', afterImage: '/assets/siding.png',
    gallery: [
      { image: '/assets/siding.png', caption: { en: 'Finished fiber cement siding panels installed.', es: 'Paneles de revestimiento de fibrocemento terminados.' } },
      { image: '/assets/siding_detail_1.png', caption: { en: 'Overlapping panel joints and color-matched trim.', es: 'Juntas de paneles superpuestas y molduras del mismo color.' } },
      { image: '/assets/siding_detail_2.png', caption: { en: 'Modern white vertical board and batten home exterior.', es: 'Exterior contemporáneo con paneles verticales board & batten blancos.' } }
    ],
    title:    { en: 'Siding',                           es: 'Revestimiento'                   },
    subtitle: { en: 'High-end insulation, structural defense, and custom curb appeal.',
                es: 'Aislamiento de alto nivel, defensa estructural y estética a medida.'     },
    body:     { en: 'Siding is your home\'s main shield against wind, rain, and heat. We install premium James Hardie® fiber cement, engineered wood, and heavy-gauge vinyl. Every project includes a full moisture wrap barrier, structural joint flashing, and color-matched trim. Designed and anchored to withstand Georgia\'s humidity and storm seasons, our installations are built to last up to 50 years.',
                es: 'El revestimiento es el escudo principal de tu casa. Instalamos fibrocemento premium James Hardie®, madera tratada y vinilo de gran espesor. Cada proyecto incluye una envoltura de barrera de humedad completa, destellos estructurales en las juntas y molduras a juego. Diseñado y anclado para soportar la humedad y tormentas de Georgia, garantizando hasta 50 años de vida útil.' },
    features: {
      en: ['James Hardie® Fiber Cement Siding','Tyvek Home-Wrap Moisture Barrier','Rust-Proof Galvanized Framing Nails','ColorPlus® Technology Baked-On Finish','Custom Corner Trim Accents','50-Year Material Warranty Options'],
      es: ['Tableros de fibrocemento James Hardie®','Barrera de humedad Tyvek Home-Wrap','Clavos de montaje galvanizados inoxidables','Acabado horneado con tecnología ColorPlus®','Molduras esquineras personalizadas','Garantía de material de hasta 50 años'],
    },
    process: {
      en: [
        { step: 'Demolition & Framing Check', desc: 'Surgical removal of old siding and inspection of underlying wall studs.' },
        { step: 'Weatherproof Wrap', desc: 'Installation of high-performance house wrap and flashing around windows and corners.' },
        { step: 'Siding Anchoring', desc: 'Blind-nailing of siding panels to studs using galvanized structural nails.' },
        { step: 'Trim & Joint Sealing', desc: 'Fitting color-matched trim boards and sealing joints with weather-resistant caulk.' },
        { step: 'Final Clean & Paint', desc: 'Final paint coating touch-up and site cleanup to leave the exterior spotless.' }
      ],
      es: [
        { step: 'Desmantelamiento y Estructura', desc: 'Retiro del revestimiento viejo e inspección de los montantes de madera.' },
        { step: 'Barrera de Humedad', desc: 'Instalación de papel Tyvek y destellos de protección en esquinas y ventanas.' },
        { step: 'Montaje del Revestimiento', desc: 'Clavado de paneles con clavos galvanizados directo a los montantes.' },
        { step: 'Ajuste de Molduras', desc: 'Instalación de molduras de esquinas y sellado de juntas con sellador elástico.' },
        { step: 'Detalles y Limpieza', desc: 'Retoques de pintura final y limpieza exhaustiva de residuos alrededor de la casa.' }
      ],
    },
  },
  {
    slug: 'windows-doors', num: '04', widget: 'windows', image: '/assets/ventanas.png',
    beforeImage: '/assets/ventanas_before.png', afterImage: '/assets/ventanas.png',
    gallery: [
      { image: '/assets/ventanas.png', caption: { en: 'New modern black-profile windows installed true.', es: 'Nuevas ventanas modernas de perfil negro niveladas.' } },
      { image: '/assets/windows_detail_1.png', caption: { en: 'Custom matte black front entry door with brass hardware.', es: 'Puerta de entrada negra mate a medida con herrajes de bronce.' } },
      { image: '/assets/windows_detail_2.png', caption: { en: 'Cozy living room view with large insulated sliding glass.', es: 'Vista de sala con puertas corredizas de vidrio templado aislantes.' } }
    ],
    title:    { en: 'Windows & Doors',                  es: 'Ventanas y Puertas'              },
    subtitle: { en: 'Energy efficiency, noise reduction, and custom architectural frames.',
                es: 'Eficiencia energética, aislamiento acústico y marcos de diseño.'        },
    body:     { en: 'Windows are the lungs of a house. We install premium double-pane Low-E glass windows filled with argon gas to reflect external thermal radiation and keep utility bills down. Every window is anchored plumb, level, and true, then sealed with expanding foam and flashed to guarantee zero air leaks or water drafts. Choose black-trim frames for a modern, high-contrast look.',
                es: 'Las ventanas regulan la temperatura de tu hogar. Instalamos ventanas premium de doble cristal Low-E con gas argón, que reflejan el calor y bajan las facturas de servicios públicos. Cada ventana se ancla a plomo y nivel, se aísla con espuma y se sella para evitar fugas de aire o agua. Elige perfiles negros para una estética contemporánea de alto impacto.' },
    features: {
      en: ['Double-Pane Low-E Insulated Glass','Argon Gas Filled Thermal Chamber','Black-Trim Profile Design Options','Expanding Polyurethane Foam Sealant','Drip-Cap Water Flashing Installation','Reinforced Heavy-Duty Security Hardware'],
      es: ['Vidrio doble panel Low-E aislante','Cámara de gas argón contra transferencia térmica','Perfiles en color negro de diseño moderno','Sellado con espuma de poliuretano expansiva','Instalación de tapajuntas metálicos de goteo','Herrajes de seguridad reforzados'],
    },
    process: {
      en: [
        { step: 'Laser Measurement', desc: 'We take precise laser measurements of every window opening to ensure a custom fit.' },
        { step: 'Removal & Sill Check', desc: 'Surgical extraction of old window frames, dry rot check, and sill repair.' },
        { step: 'Plumb & Level Setting', desc: 'Windows are set with shims, leveled on three axes, and anchored to the structural frame.' },
        { step: 'Thermal Foam Sealing', desc: 'Expanding foam is injected around the perimeter, followed by exterior flashing and trim.' },
        { step: 'Calibration & Clean', desc: 'Testing sash movement, locks, cleaning the glass, and sealing borders.' }
      ],
      es: [
        { step: 'Medición Láser', desc: 'Tomamos medidas exactas con láser de cada abertura para un ajuste perfecto.' },
        { step: 'Retiro de Marcos', desc: 'Extracción limpia de ventanas viejas, inspección de madera y reparación del alféizar.' },
        { step: 'Alineación y Anclaje', desc: 'Nivelación en tres ejes y fijación con tornillos de estructura.' },
        { step: 'Sellado Térmico', desc: 'Inyección de espuma expansiva y colocación de tapajuntas e impermeabilización exterior.' },
        { step: 'Ajuste y Limpieza', desc: 'Calibración de hojas, cerraduras, limpieza del vidrio y sellado de molduras.' }
      ],
    },
  },
  {
    slug: 'kitchen', num: '05', widget: 'kitchen', image: '/assets/kitchen.png',
    beforeImage: '/assets/kitchen_before.png', afterImage: '/assets/kitchen.png',
    gallery: [
      { image: '/assets/kitchen.png', caption: { en: 'Modern high-end kitchen remodel completed.', es: 'Remodelación de cocina de alta gama moderna completada.' } },
      { image: '/assets/kitchen_detail_1.png', caption: { en: 'Polished quartz countertop with gooseneck brass faucet.', es: 'Mesón de cuarzo pulido con grifo de bronce de cuello de ganso.' } },
      { image: '/assets/kitchen_detail_2.png', caption: { en: 'Forest green cabinets with premium soft-close hardware.', es: 'Gabinetes verde bosque con rieles de cierre suave premium.' } }
    ],
    title:    { en: 'Kitchen',                          es: 'Cocina'                          },
    subtitle: { en: 'The functional heart of the home, built for generations.',
                es: 'El corazón funcional del hogar, construido para generaciones.'           },
    body:     { en: 'A kitchen remodel requires coordinating design, plumbing, gas, electrical, and structural craft. We manage the entire project from demolition to final detailing. We install custom cabinetry with soft-close drawers, durable quartz or granite countertops, intricate tile backsplashes, and modern task lighting. Built to meet local codes, with high-quality finishes that stand up to daily life.',
                es: 'Remodelar una cocina requiere coordinar diseño, plomería, electricidad y carpintería. Gestionamos todo el proyecto desde la demolición hasta los últimos detalles. Instalamos gabinetes con cierre suave, mesones de cuarzo o granito, salpicaderos de cerámica e iluminación moderna. Construido bajo códigos locales y acabados hechos para durar.' },
    features: {
      en: ['Custom Solid Wood Cabinets','Quartz & Natural Granite Slab Options','Soft-Close Premium Cabinet Hardware','Intricate Ceramic Tile Backsplashes','Under-Cabinet LED Task Lighting','Full Plumbing and Electrical Code Compliance'],
      es: ['Gabinetes de madera sólida a medida','Mesones en placas de cuarzo y granito natural','Bisagras y rieles premium de cierre suave','Salpicaderos de cerámica de diseño','Iluminación de trabajo LED bajo gabinete','Cumplimiento estricto de códigos eléctricos y plomería'],
    },
    process: {
      en: [
        { step: 'Design & Space Planning', desc: '3D layout planning, cabinet configuration, and material selections.' },
        { step: 'Dust-Controlled Demo', desc: 'Surgical removal of old kitchen. We seal the room to keep dust out of your home.' },
        { step: 'Utility Rough-In', desc: 'Relocating or updating electrical outlets, plumbing lines, and gas hookups to code.' },
        { step: 'Cabinetry & Stone Install', desc: 'Precision leveling of base cabinets, stone countertop template and fit.' },
        { step: 'Backsplash & Trim Detail', desc: 'Tiling, hardware install, lighting hookup, and custom crown molding.' }
      ],
      es: [
        { step: 'Diseño y Planificación', desc: 'Distribución espacial, selección de gabinetes, mesones y materiales.' },
        { step: 'Demolición Controlada', desc: 'Retiro limpio de la cocina vieja, sellando el área para evitar polvo en la casa.' },
        { step: 'Instalaciones de Servicios', desc: 'Actualización y reubicación de plomería, electricidad y gas según el código.' },
        { step: 'Montaje de Muebles y Piedra', desc: 'Nivelación de gabinetes e instalación de las encimeras de cuarzo.' },
        { step: 'Detalles de Acabado', desc: 'Colocación de azulejos, grifería, tiradores, iluminación y molduras.' }
      ],
    },
  },
  {
    slug: 'deck', num: '06', widget: 'deck', image: '/assets/deck.png',
    beforeImage: '/assets/deck_before.png', afterImage: '/assets/deck.png',
    gallery: [
      { image: '/assets/deck.png', caption: { en: 'Premium stained cedar structural deck.', es: 'Terraza estructural de cedro teñido premium.' } },
      { image: '/assets/deck_detail_1.png', caption: { en: 'Trex composite planks laid with hidden fastener system.', es: 'Tablones de compuesto Trex con sistemas de fijación oculta.' } },
      { image: '/assets/deck_detail_2.png', caption: { en: 'Outdoor living area with sleek horizontal cable railings.', es: 'Área exterior con barandillas de cables de acero elegantes.' } }
    ],
    title:    { en: 'Deck',                             es: 'Terraza'                         },
    subtitle: { en: 'Custom outdoor living spaces engineered for Georgia weather.',
                es: 'Espacios exteriores a medida diseñados para el clima de Georgia.'        },
    body:     { en: 'We build custom decks using premium Western Red Cedar and high-end composites like Trex. Every deck is engineered to meet local building codes, with concrete footings poured below the frost line, heavy-duty joist framing, and flashing tape to prevent wood rot. Railing systems are anchored directly into the structural posts to guarantee safety and stability.',
                es: 'Construimos terrazas personalizadas utilizando cedro rojo y compuestos premium de marcas como Trex. Cada terraza se diseña bajo códigos locales, con cimientos de concreto bajo la línea de congelación, vigas tratadas y cinta protectora para evitar la humedad. Las barandas se anclan directo a la estructura para máxima seguridad.' },
    features: {
      en: ['Trex & Premium Composite Decking','Western Red Cedar Structural Elements','Hidden Fastener Clip Systems','Heavy-Duty Post & Joist Framing','Deck Joist Waterproofing Flashing Tape','Anchored Heavy-Duty Guardrail Systems'],
      es: ['Tablones compuestos premium Trex','Elementos estructurales en cedro rojo occidental','Sistemas de fijación oculta sin clavos visibles','Estructuras de vigas tratadas para exteriores','Cinta de destello impermeable sobre vigas','Sistemas de barandillas de alta resistencia ancladas'],
    },
    process: {
      en: [
        { step: 'Layout & Load Engineering', desc: 'Determining sizes, structural load calculations, and permit submission.' },
        { step: 'Footing & Post Setting', desc: 'Digging and pouring deep concrete footings. Setting structural support posts.' },
        { step: 'Framing & Joist Tape', desc: 'Building the support deck frame and sealing joist tops with butyl flashing tape.' },
        { step: 'Planking & Fasteners', desc: 'Laying composite or cedar deck boards using hidden clip fasteners for a clean face.' },
        { step: 'Railings & Steps', desc: 'Installing guardrails, structural stairs, trim boards, and applying sealer if wood.' }
      ],
      es: [
        { step: 'Diseño e Ingeniería de Carga', desc: 'Cálculo de cargas estructurales, dimensiones y solicitud de permisos.' },
        { step: 'Excavación y Cimientos', desc: 'Perforación y vertido de zapatas de concreto. Colocación de postes de soporte.' },
        { step: 'Estructura y Cinta Protectora', desc: 'Ensamblaje del armazón de vigas y sellado superior con cinta impermeable.' },
        { step: 'Colocación de Tablas', desc: 'Montaje de tablones utilizando fijaciones ocultas para una superficie limpia.' },
        { step: 'Barandas y Escaleras', desc: 'Instalación de barandillas de seguridad, escaleras de acceso y sellado de madera.' }
      ],
    },
  },
  {
    slug: 'full-remodeling', num: '07', widget: 'full', image: '/assets/remodeling.png',
    beforeImage: '/assets/remodeling_before.png', afterImage: '/assets/remodeling.png',
    gallery: [
      { image: '/assets/remodeling.png', caption: { en: 'Completely renovated home layout and finishing.', es: 'Estructura y acabados de casa completamente renovados.' } },
      { image: '/assets/remodeling_detail_1.png', caption: { en: 'Open-concept living room with wide-plank oak floors.', es: 'Sala de concepto abierto con pisos de roble de tablón ancho.' } },
      { image: '/assets/remodeling_detail_2.png', caption: { en: 'Luxurious bathroom walk-in shower with herringbone tiles.', es: 'Baño lujoso con ducha de obra y azulejos en espiga.' } }
    ],
    title:    { en: 'Full Remodeling',                  es: 'Remodelación Completa'           },
    subtitle: { en: 'Surgical home renovations managed by a single professional team.',
                es: 'Renovaciones del hogar gestionadas por un único equipo profesional.'     },
    body:     { en: 'Whole-house remodeling can be chaotic when managing multiple subcontractors. At Arzon Built, we use our own experienced in-house crew to handle demolition, framing, drywall, plumbing, electrical, and finish carpentry. You get a dedicated project manager, a clear milestone schedule, and a written warranty. We manage the details so you can look forward to moving back in.',
                es: 'Remodelar toda una casa puede ser caótico si se coordinan múltiples subcontratistas. En Arzon Built, trabajamos con nuestro propio equipo para demolición, drywall, electricidad y carpintería. Tendrás un gerente de proyecto dedicado, un calendario claro de hitos y una garantía por escrito. Nos encargamos de todo para tu tranquilidad.' },
    features: {
      en: ['Dedicated Project Manager','In-House Skilled Crew Only','Structural Modification & Framing','Complete Utility Coordination (Plumbing/Electric)','Staged Timeline with Progress Milestones','Licensed, Bonded, and Fully Insured'],
      es: ['Gerente de proyecto asignado dedicado','Equipo propio calificado sin subcontratación cruzada','Modificaciones estructurales y vigas de carga','Coordinación completa de servicios (plomería, electricidad)','Cronograma con hitos de avance programados','Licenciados y asegurados con cobertura total'],
    },
    process: {
      en: [
        { step: 'Project Consult & Estimate', desc: 'Detailed walkthrough, architectural review, and comprehensive budget proposal.' },
        { step: 'Permits & Planning', desc: 'Obtaining municipal building permits, finalizing materials, and ordering items.' },
        { step: 'Surgical Demolition', desc: 'Careful removal of old walls and utilities while protecting structural framing.' },
        { step: 'Structural & Utility Build', desc: 'Framing new layouts, running electrical, plumbing, insulation, and drywall.' },
        { step: 'Finishing & Move-In', desc: 'Painting, trim work, tile, floor installation, fixtures, cleanup, and final walkthrough.' }
      ],
      es: [
        { step: 'Consulta y Presupuesto', desc: 'Recorrido detallado, revisión de planos y propuesta de presupuesto completa.' },
        { step: 'Permisos y Planificación', desc: 'Gestión de permisos de construcción, compra de materiales y programación.' },
        { step: 'Demolición Estructural', desc: 'Remoción quirúrgica de muros antiguos y tuberías protegiendo la estructura de carga.' },
        { step: 'Instalaciones y Drywall', desc: 'Levantamiento de marcos, cableado, plomería, aislamiento y colocación de yeso.' },
        { step: 'Acabados y Entrega', desc: 'Pintura, molduras, instalación de pisos, grifos, limpieza total y recorrido final.' }
      ],
    },
  },
]

export function getService(slug: string) {
  return SERVICES.find(s => s.slug === slug)
}
