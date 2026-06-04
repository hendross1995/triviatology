const TRIVIA_ROUND_SIZE = 5;
const STORAGE_KEY = "psicoreto-state-v1";
const MAX_POINTS = 3000;
const POINTS = {
  trivia: 100,
  case: 150,
  review: 75,
  timeAttack: 40
};

const modules = [
  { id: "conciencia",   name: "Psicopatología de la Conciencia",                                                                    category: "Conciencia",              icon: "C", color: "#8d5de4" },
  { id: "orientacion",  name: "Psicopatología de la Orientación",                                                                   category: "Orientación",             icon: "O", color: "#7b4fc7" },
  { id: "atencion",     name: "Psicopatología de la Atención y Concentración",                                                      category: "Atención y concentración", icon: "A", color: "#63c696" },
  { id: "memoria",      name: "Psicopatología de la Memoria",                                                                       category: "Memoria",                 icon: "M", color: "#ffb84d" },
  { id: "percepcion",   name: "Psicopatología de la Percepción, Imaginación y Sensaciones",                                         category: "Percepción",              icon: "P", color: "#65bdf0" },
  { id: "pensamiento",  name: "Psicopatología del Pensamiento",                                                                     category: "Pensamiento",             icon: "L", color: "#ef7fac" },
  { id: "lenguaje",     name: "Psicopatología del Lenguaje y Habla",                                                               category: "Lenguaje y habla",        icon: "H", color: "#e85d8a" },
  { id: "afectividad",  name: "Psicopatología de la Afectividad",                                                                   category: "Afectividad",             icon: "V", color: "#a06bdc" },
  { id: "conducta",     name: "Psicopatología del Comportamiento y Conducta Motora",                                                category: "Conducta motora",         icon: "K", color: "#f28f3b" },
  { id: "fisiologicas", name: "Psicopatología de las Funciones Fisiológicas: Sueño, Apetito e Ingesta y Sexualidad",               category: "Sueño, apetito y sexualidad", icon: "F", color: "#4d8fda" },
  { id: "sindromes",    name: "Psicopatología I: Semiología y Fenomenología – Síndromes",                                              category: "Síndromes",               icon: "S", color: "#58c4c7" }
];

const concepts = [
  {
    id: 1,
    name: "Obnubilación",
    moduleId: "conciencia",
    category: "Conciencia",
    type: "Semiología",
    definition: "Disminución del nivel de conciencia donde el paciente necesita estímulos más intensos para responder.",
    simple: "La persona está lenta, poco alerta y responde mejor cuando se le estimula con fuerza o insistencia.",
    example: "Durante la entrevista tarda en obedecer órdenes sencillas y parece desconectada del entorno.",
    confusion: [
      { term: "Somnolencia", difference: "Deterioro mayor; el paciente se duerme sin estimulación." },
      { term: "Coma", difference: "Suspensión global de la conciencia, sin posibilidad de despertar con estímulos." }
    ],
    difficulty: "Básica"
  },
  {
    id: 2,
    name: "Hipoprosexia",
    moduleId: "atencion",
    category: "Atención y concentración",
    type: "Semiología",
    definition: "Disminución de la capacidad atencional.",
    simple: "La persona tiene dificultad para concentrarse, mantener la atención o dirigirla hacia un estímulo.",
    example: "Un paciente intenta responder una pregunta, pero se distrae constantemente y no logra mantener el foco de la conversación.",
    confusion: [
      { term: "Aprosexia", difference: "Ausencia casi total de atención." },
      { term: "Hiperprosexia", difference: "Atención excesivamente concentrada en un solo tema." }
    ],
    difficulty: "Básica"
  },
  {
    id: 3,
    name: "Aprosexia",
    moduleId: "atencion",
    category: "Atención y concentración",
    type: "Semiología",
    definition: "Reducción máxima o ausencia casi total de la disposición atencional.",
    simple: "La persona no logra atender al entorno o queda absorbida por sus contenidos mentales.",
    example: "En un estado de coma no existe respuesta atencional al ambiente.",
    confusion: [
      { term: "Hipoprosexia", difference: "La atención está disminuida, pero no ausente." },
      { term: "Pseudoaprosexia", difference: "Parece falta de atención, pero la atención está dirigida a otro foco." }
    ],
    difficulty: "Básica"
  },
  {
    id: 4,
    name: "Hiperprosexia",
    moduleId: "atencion",
    category: "Atención y concentración",
    type: "Semiología",
    definition: "Focalización excesiva y transitoria de la atención sobre un estímulo, tema o vivencia.",
    simple: "La atención se estrecha y queda fijada intensamente en algo, excluyendo otros estímulos.",
    example: "Paciente deprimido que no logra apartar la atención de ideas de culpa.",
    confusion: [
      { term: "Hipervigilancia", difference: "La atención pasiva está aumentada hacia múltiples señales." },
      { term: "Distractibilidad", difference: "Inestabilidad para mantener la atención en un foco." }
    ],
    difficulty: "Media"
  },
  {
    id: 5,
    name: "Distractibilidad",
    moduleId: "atencion",
    category: "Atención y concentración",
    type: "Semiología",
    definition: "Inestabilidad atencional con dificultad para prestar atención a un estímulo, tema o actividad.",
    simple: "La mente salta de un punto a otro y cuesta sostener una conversación o tarea.",
    example: "El interlocutor nota que el paciente no mantiene el diálogo ni completa tareas sencillas.",
    confusion: [
      { term: "Hipoprosexia", difference: "Disminución general de la capacidad atencional." },
      { term: "Hipervigilancia", difference: "Alerta constante hacia señales externas o internas." }
    ],
    difficulty: "Media"
  },
  {
    id: 6,
    name: "Hipervigilancia",
    moduleId: "atencion",
    category: "Atención y concentración",
    type: "Semiología",
    definition: "Escudriñamiento continuo en búsqueda de señales o indicios externos o internos.",
    simple: "La persona está en alerta constante, pendiente de todo, pero le cuesta concentrarse en una sola cosa.",
    example: "Alguien ansioso detecta pequeños ruidos del ambiente y no puede concentrarse en la entrevista.",
    confusion: [
      { term: "Hiperprosexia", difference: "Fijación excesiva en un solo estímulo o tema." },
      { term: "Hiperfrenia", difference: "Estado de hipervigilancia máxima." }
    ],
    difficulty: "Media"
  },
  {
    id: 7,
    name: "Hipomnesia",
    moduleId: "memoria",
    category: "Memoria",
    type: "Semiología",
    definition: "Disminución de la memoria, ya sea de fijación o de evocación.",
    simple: "La persona recuerda menos o tiene problemas para registrar información nueva o recuperar recuerdos.",
    example: "No recuerda hechos recientes o le cuesta evocar información previa.",
    confusion: [
      { term: "Amnesia", difference: "Pérdida total o casi total de la memoria de un período." },
      { term: "Hipermnesia", difference: "Aumento exagerado de los recuerdos." }
    ],
    difficulty: "Básica"
  },
  {
    id: 8,
    name: "Amnesia",
    moduleId: "memoria",
    category: "Memoria",
    type: "Semiología",
    definition: "Pérdida total o casi total de la memoria relacionada con un período de vida.",
    simple: "La persona no puede fijar recuerdos nuevos o recuperar recuerdos ya almacenados.",
    example: "Tras un evento neurológico no recuerda lo ocurrido durante un intervalo específico.",
    confusion: [
      { term: "Hipomnesia", difference: "Disminución de la memoria, no pérdida total." },
      { term: "Confabulación", difference: "Relleno involuntario de lagunas de memoria con relatos no verídicos." }
    ],
    difficulty: "Básica"
  },
  {
    id: 9,
    name: "Ilusión",
    moduleId: "percepcion",
    category: "Percepción",
    type: "Semiología",
    definition: "Interpretación errónea de un estímulo real presente.",
    simple: "Hay un objeto real, pero se percibe de forma equivocada.",
    example: "Confundir una sombra en la pared con una persona.",
    confusion: [
      { term: "Alucinación", difference: "Percepción sin estímulo real presente." },
      { term: "Pseudoalucinación", difference: "Vivencia perceptiva reconocida como interna o subjetiva." }
    ],
    difficulty: "Básica"
  },
  {
    id: 10,
    name: "Alucinación",
    moduleId: "percepcion",
    category: "Percepción",
    type: "Semiología",
    definition: "Percepción sin objeto o estímulo real presente.",
    simple: "La persona oye, ve o siente algo que no está ocurriendo en el ambiente.",
    example: "Escuchar voces cuando no hay ninguna fuente externa de sonido.",
    confusion: [
      { term: "Ilusión", difference: "Existe estímulo real, pero mal interpretado." },
      { term: "Imagen eidética", difference: "Imagen mental vivida, no necesariamente patológica." }
    ],
    difficulty: "Básica"
  },
  {
    id: 11,
    name: "Delirium",
    moduleId: "conciencia",
    category: "Conciencia",
    type: "Semiología",
    definition: "Alteración orgánica aguda con deterioro cognitivo global, fluctuación y síntomas sensoperceptivos.",
    simple: "Se altera la conciencia, la atención y la orientación; pueden aparecer alucinaciones e intensa agitación.",
    example: "Paciente con desorientación fluctuante, temblores y alucinaciones visuales de animales.",
    confusion: [
      { term: "Estado crepuscular", difference: "Amnesia total posterior y estrechamiento de la conciencia." },
      { term: "Oniroide", difference: "Vivencias escénicas como sueños, con actitud más contemplativa." }
    ],
    difficulty: "Media"
  },
  {
    id: 12,
    name: "Estado crepuscular",
    moduleId: "conciencia",
    category: "Conciencia",
    type: "Semiología",
    definition: "Estado transitorio de inicio y fin súbitos con estrechamiento de conciencia y amnesia lacunar posterior.",
    simple: "La persona actúa de forma automática o impulsiva, con poca conciencia del entorno y luego recuerda poco o nada.",
    example: "Conducta agresiva inesperada durante un episodio epiléptico temporal, seguida de amnesia.",
    confusion: [
      { term: "Delirium", difference: "La orientación puede fluctuar y suele haber evocación residual." },
      { term: "Automatismo", difference: "Acción involuntaria sin control consciente." }
    ],
    difficulty: "Alta"
  },
  {
    id: 13,
    name: "Estado oniroide",
    moduleId: "conciencia",
    category: "Conciencia",
    type: "Semiología",
    definition: "Estado alterado de conciencia con ilusiones o alucinaciones escénicas, vividas y multimodales.",
    simple: "La realidad y la fantasía se mezclan como si el paciente estuviera viviendo una escena de sueño.",
    example: "Paciente inmóvil y contemplativo que describe escenas visuales intensas no angustiosas.",
    confusion: [
      { term: "Delirium", difference: "Suele ser más agitado, con alucinaciones amenazantes y orientación fluctuante." },
      { term: "Confusión mental", difference: "Predomina incoherencia y desorientación global." }
    ],
    difficulty: "Alta"
  },
  {
    id: 14,
    name: "Síndrome de delirium",
    moduleId: "sindromes",
    category: "Síndromes cerebrales orgánicos agudos",
    type: "Síndrome",
    definition: "Cuadro agudo con vigilia baja, atención distráctil, orientación fluctuante, alucinaciones y agitación.",
    simple: "El paciente puede estar sudoroso, tembloroso, desorientado por momentos y con alucinaciones visuales o táctiles.",
    example: "Paciente que ve animales repugnantes que se le acercan y se agita para defenderse.",
    confusion: [
      { term: "Síndrome de obnubilación", difference: "Predomina tranquilidad, hipomimia y necesidad de estímulos fuertes." },
      { term: "Síndrome oniroide", difference: "Vivencias escénicas y actitud contemplativa." }
    ],
    difficulty: "Media"
  },
  {
    id: 15,
    name: "Síndrome esquizofrénico",
    moduleId: "sindromes",
    category: "Síndromes psicopatológicos",
    type: "Síndrome",
    definition: "Desorganización de funciones psíquicas con disociación ideoafectivoconativa.",
    simple: "Puede haber aislamiento, comunicación difícil, alucinaciones auditivas, pensamiento autista y conducta incomprensible.",
    example: "Paciente con aspecto descuidado, bloqueo del pensamiento y respuestas afectivas incongruentes.",
    confusion: [
      { term: "Síndrome paranoide", difference: "Predominan ideas delirantes de persecución y alucinaciones auditivas." },
      { term: "Automatismo psíquico", difference: "Destacan robo o influencia del pensamiento y vivencias de despersonalización." }
    ],
    difficulty: "Alta"
  },
  {
    id: 16,
    name: "Síndrome paranoico",
    moduleId: "sindromes",
    category: "Síndromes delirantes",
    type: "Síndrome",
    definition: "Delirio único con argumentación lógica, sin trastornos sensoperceptivos importantes.",
    simple: "La persona conserva orientación y comunicación, pero organiza su conducta alrededor de una idea delirante.",
    example: "Paciente convencido de una persecución específica, con razonamientos aparentemente coherentes.",
    confusion: [
      { term: "Síndrome paranoide", difference: "Incluye alucinaciones auditivas y afectación más global." },
      { term: "Síndrome esquizofrénico", difference: "Predomina desorganización global de funciones psíquicas." }
    ],
    difficulty: "Alta"
  },
  {
    id: 17,
    name: "Síndrome maníaco",
    moduleId: "sindromes",
    category: "Síndromes afectivos",
    type: "Síndrome",
    definition: "Cuadro afectivo con hipertimia, labilidad, pensamiento acelerado, hiperbulia e hiperquinesia.",
    simple: "La persona se muestra eufórica o irritable, acelerada, con aumento de actividad y necesidades.",
    example: "Paciente con vestuario llamativo, fuga de ideas, hipersociabilidad e insomnio.",
    confusion: [
      { term: "Síndrome ansioso", difference: "Predominan temor, tensión vegetativa e irritabilidad." },
      { term: "Síndrome depresivo", difference: "Predominan hipotimia, lentitud, hipobulia y aislamiento." }
    ],
    difficulty: "Media"
  },
  {
    id: 18,
    name: "Síndrome depresivo",
    moduleId: "sindromes",
    category: "Síndromes afectivos",
    type: "Síndrome",
    definition: "Cuadro afectivo con hipotimia, pensamiento lento, hipobulia, hipoquinesia y alteración de necesidades.",
    simple: "La persona presenta tristeza marcada, retraimiento, menos energía, insomnio o anorexia.",
    example: "Paciente con postura flexionada, ideas de minusvalía e aislamiento social.",
    confusion: [
      { term: "Síndrome maníaco", difference: "Aumento de energía, hipertimia y pensamiento acelerado." },
      { term: "Síndrome asténico", difference: "Predomina cansancio fácil e irritabilidad." }
    ],
    difficulty: "Media"
  },
  {
    id: 19,
    name: "Síndrome ansioso",
    moduleId: "sindromes",
    category: "Síndromes afectivos",
    type: "Síndrome",
    definition: "Cuadro con ansiedad, irritabilidad, hipervigilancia discreta y manifestaciones vegetativas.",
    simple: "Hay temor, tensión corporal, palpitaciones, sudoración, manos frías e insomnio inicial.",
    example: "Paciente angustiado con pupilas dilatadas, palpitaciones y miedo a morir o enloquecer.",
    confusion: [
      { term: "Síndrome depresivo", difference: "Predomina tristeza, lentitud y retraimiento." },
      { term: "Hipervigilancia", difference: "Es un síntoma atencional, no todo el cuadro sindrómico." }
    ],
    difficulty: "Media"
  },
  {
    id: 20,
    name: "Síndrome amnésico confabulatorio",
    moduleId: "sindromes",
    category: "Síndromes cerebrales orgánicos crónicos",
    type: "Síndrome",
    definition: "Cuadro crónico con memoria reciente muy afectada y confabulaciones.",
    simple: "La persona olvida hechos recientes y puede rellenar los vacíos con relatos que parecen creíbles.",
    example: "Olvida que minutos antes recibió una visita y explica la laguna con una historia inventada sin intención.",
    confusion: [
      { term: "Síndrome demencial", difference: "Afectación intelectual global y deterioro progresivo." },
      { term: "Amnesia", difference: "Síntoma de pérdida de memoria, no síndrome completo." }
    ],
    difficulty: "Alta"
  }
];

function makeConcept(id, name, moduleId, category, type, definition, simple, example, confusion, difficulty = "Media") {
  return { id, name, moduleId, category, type, definition, simple, example, confusion, difficulty };
}

concepts.push(
  makeConcept(
    21,
    "Hiperfrenia",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Estado de hipervigilancia máxima con conciencia exagerada.",
    "La persona está extremadamente alerta y sensible a lo que ocurre alrededor.",
    "Paciente intoxicado o bajo estrés extremo que examina todo el ambiente como amenaza.",
    [
      { term: "Hipervigilancia", difference: "La hiperfrenia es un grado máximo de esa alerta aumentada." },
      { term: "Hiperprosexia", difference: "La hiperprosexia fija la atención en un estímulo; la hiperfrenia eleva globalmente la alerta." }
    ]
  ),
  makeConcept(
    22,
    "Somnolencia, letargia o sopor",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Deterioro progresivo de la conciencia en el que el paciente está despierto, pero se duerme si no recibe estimulación.",
    "Permanece adormecido y lento; necesita estímulos para mantenerse despierto.",
    "Durante la entrevista responde con dificultad y vuelve a dormirse cuando cesa la estimulación.",
    [
      { term: "Obnubilación", difference: "La obnubilación es más leve; el paciente aún ejecuta órdenes sencillas con lentitud." },
      { term: "Estupor", difference: "En el estupor solo se logra una alerta mínima con estímulos muy potentes." }
    ]
  ),
  makeConcept(
    23,
    "Estupor",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Falta de reacción y atención al ambiente con inmovilidad y alerta mínima ante estímulos muy potentes.",
    "La persona casi no responde, permanece inmóvil y sus respuestas verbales son incoherentes o ininteligibles.",
    "Paciente inmóvil que solo abre los ojos brevemente ante dolor intenso y no sostiene diálogo.",
    [
      { term: "Somnolencia", difference: "En la somnolencia aún hay respuestas más accesibles; en el estupor la respuesta es mínima." },
      { term: "Coma", difference: "En el coma no se despierta al paciente pese a estimulación intensa." }
    ],
    "Alta"
  ),
  makeConcept(
    24,
    "Confusión mental",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Afectación cognitiva con concepción desordenada de la realidad, desorientación e incoherencia.",
    "La persona no comprende lo que sucede, se desorienta y no logra mantener un diálogo comprensible.",
    "Paciente con facies de extrañeza que no reconoce dónde está ni consigue explicar lo que ocurre.",
    [
      { term: "Delirium", difference: "El delirium es un cuadro orgánico agudo con fluctuación y síntomas sensoperceptivos." },
      { term: "Desorientación", difference: "La desorientación puede ser un componente; la confusión afecta globalmente la comprensión." }
    ],
    "Alta"
  ),
  makeConcept(
    25,
    "Coma",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Suspensión global prolongada de la conciencia en la que resulta imposible despertar al paciente.",
    "La persona no despierta aunque se apliquen estímulos intensos y solo conserva funciones vegetativas.",
    "Paciente inconsciente tras intoxicación o lesión cerebral, sin respuesta voluntaria al ambiente.",
    [
      { term: "Estupor", difference: "En el estupor puede alcanzarse una alerta mínima; en el coma no." },
      { term: "Obnubilación", difference: "La obnubilación conserva reconocimiento parcial y ejecución lenta de órdenes." }
    ],
    "Alta"
  ),
  makeConcept(
    26,
    "Automatismos",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Acciones involuntarias realizadas en ausencia de conciencia, a veces complejas y coordinadas.",
    "La persona actúa como en automático y luego puede no recordar lo ocurrido.",
    "Durante un episodio realiza movimientos coordinados e inadecuados al contexto, con recuerdo parcial posterior.",
    [
      { term: "Estado crepuscular", difference: "El estado crepuscular puede incluir automatismos junto a estrechamiento de conciencia." },
      { term: "Obediencia automática", difference: "La obediencia automática responde a instrucciones externas; el automatismo ocurre sin control consciente." }
    ],
    "Alta"
  ),
  makeConcept(
    27,
    "Desorientación alopsíquica en tiempo",
    "orientacion",
    "Orientación",
    "Semiología",
    "Incapacidad para reconocer hora, día, mes, año o diferenciar día y noche.",
    "La persona no puede ubicarse correctamente en el tiempo.",
    "Al preguntarle la fecha, responde un mes o año incorrecto y no sabe si es mañana o noche.",
    [
      { term: "Desorientación espacial", difference: "La temporal afecta fechas y horarios; la espacial afecta lugar." },
      { term: "Desorientación autopsíquica", difference: "La autopsíquica afecta la identidad personal." }
    ],
    "Básica"
  ),
  makeConcept(
    28,
    "Desorientación alopsíquica en espacio",
    "orientacion",
    "Orientación",
    "Semiología",
    "Incapacidad para reconocer el lugar, ciudad, provincia, país o espacio circundante.",
    "La persona no sabe dónde está.",
    "En el hospital afirma estar en su casa o en otra ciudad.",
    [
      { term: "Desorientación temporal", difference: "La espacial se refiere al lugar; la temporal, al momento." },
      { term: "Desrealización", difference: "En desrealización el entorno se percibe raro, pero se reconoce como real." }
    ],
    "Básica"
  ),
  makeConcept(
    29,
    "Desorientación autopsíquica",
    "orientacion",
    "Orientación",
    "Semiología",
    "Incapacidad para identificarse a sí mismo o reconocer datos personales y personas conocidas.",
    "La persona no sabe quién es o no reconoce a personas cercanas.",
    "No puede decir su nombre ni identificar a familiares habituales.",
    [
      { term: "Despersonalización", difference: "En despersonalización hay extrañeza del yo; en autopsíquica falla la identificación." },
      { term: "Amnesia", difference: "La amnesia afecta memoria; la desorientación autopsíquica afecta ubicación de la propia identidad." }
    ],
    "Alta"
  ),
  makeConcept(
    30,
    "Pseudoaprosexia",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Aparente falta de atención al entorno pese a conservar la capacidad atencional, porque el foco está dirigido a otro contenido.",
    "Parece que no atiende, pero su atención está ocupada en otra cosa.",
    "Paciente ensimismado que no responde al ambiente porque está concentrado en sus vivencias internas.",
    [
      { term: "Aprosexia", difference: "La aprosexia implica ausencia casi total de atención." },
      { term: "Hipoprosexia", difference: "La hipoprosexia es disminución de la capacidad atencional." }
    ]
  ),
  makeConcept(
    31,
    "Paraprosexia",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Desviación aparentemente involuntaria de la atención con detrimento de la atención voluntaria y aumento de la espontánea.",
    "La atención se va hacia estímulos no elegidos por la persona.",
    "Mientras intenta escuchar, cualquier estímulo menor captura su atención y desvía la entrevista.",
    [
      { term: "Distractibilidad", difference: "La distractibilidad es inestabilidad para sostener el foco; la paraprosexia destaca la desviación anómala." },
      { term: "Hipervigilancia", difference: "En hipervigilancia hay alerta hacia múltiples señales." }
    ]
  ),
  makeConcept(
    32,
    "Fatigabilidad de la atención",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Agotamiento de la atención por el esfuerzo sostenido, con bajo rendimiento y abundantes errores.",
    "Al mantener la concentración, la persona se cansa pronto y empieza a fallar.",
    "Durante una prueba breve responde bien al inicio, pero luego comete errores crecientes por cansancio atencional.",
    [
      { term: "Hipoprosexia", difference: "La hipoprosexia es disminución global; la fatigabilidad aparece especialmente con el mantenimiento." },
      { term: "Apatía de la atención", difference: "La apatía es falta de interés; la fatigabilidad es agotamiento." }
    ]
  ),
  makeConcept(
    33,
    "Apatía de la atención",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Falta considerable de atención para interesarse por acontecimientos que normalmente despertarían interés.",
    "Nada parece captar el interés de la persona, aunque los estímulos sean relevantes.",
    "Permanece indiferente ante noticias familiares importantes o cambios evidentes del entorno.",
    [
      { term: "Fatigabilidad de la atención", difference: "La apatía es desinterés; la fatigabilidad es cansancio por sostener atención." },
      { term: "Hipoprosexia", difference: "La hipoprosexia es capacidad disminuida, no necesariamente falta de interés." }
    ]
  ),
  makeConcept(
    34,
    "Perplejidad de la atención",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Alteración cualitativa donde el sujeto no logra sintetizar lo atendido ni comprender sus acciones o circunstancias.",
    "La persona atiende fragmentos, pero no consigue entender el conjunto.",
    "Observa la situación con extrañeza y no puede explicar qué está haciendo ni qué ocurre.",
    [
      { term: "Confusión mental", difference: "La confusión afecta globalmente la comprensión de la realidad." },
      { term: "Distractibilidad", difference: "La distractibilidad cambia el foco; la perplejidad impide integrar lo atendido." }
    ],
    "Alta"
  ),
  makeConcept(
    35,
    "Sesgo atencional",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Tendencia a dirigir la atención de forma selectiva hacia información relevante para miedos, preocupaciones o estado de ánimo.",
    "La mente busca primero lo que confirma una preocupación.",
    "Persona ansiosa que detecta antes señales de peligro que estímulos neutrales del ambiente.",
    [
      { term: "Hipervigilancia", difference: "La hipervigilancia es alerta aumentada; el sesgo selecciona información congruente con preocupaciones." },
      { term: "Hiperprosexia", difference: "La hiperprosexia fija excesivamente la atención en un estímulo." }
    ]
  ),
  makeConcept(
    36,
    "Hipermnesia",
    "memoria",
    "Memoria",
    "Semiología",
    "Aumento exagerado de los recuerdos, con reproducción detallada de sucesos pasados.",
    "La persona recuerda de forma excesiva y minuciosa.",
    "Relata con precisión detalles irrelevantes de eventos antiguos que no parecían importantes.",
    [
      { term: "Hipomnesia", difference: "La hipomnesia disminuye la memoria; la hipermnesia la aumenta." },
      { term: "Ecmnesia", difference: "La ecmnesia revive el pasado como presente." }
    ]
  ),
  makeConcept(
    37,
    "Amnesia de fijación",
    "memoria",
    "Memoria",
    "Semiología",
    "Incapacidad para consolidar nuevos recuerdos; corresponde a amnesia anterógrada.",
    "La persona no logra guardar información nueva.",
    "Pregunta repetidamente lo mismo porque no recuerda la respuesta dada minutos antes.",
    [
      { term: "Amnesia retrógrada", difference: "La retrógrada afecta recuerdos previos; la de fijación afecta recuerdos nuevos." },
      { term: "Hipomnesia", difference: "La hipomnesia es disminución, no incapacidad marcada para fijar." }
    ],
    "Alta"
  ),
  makeConcept(
    38,
    "Amnesia lacunar",
    "memoria",
    "Memoria",
    "Semiología",
    "Pérdida de recuerdos delimitados a un período específico de tiempo.",
    "Falta un tramo concreto de la memoria.",
    "Después de un episodio confusional no recuerda lo ocurrido durante esas horas.",
    [
      { term: "Amnesia global", difference: "La global compromete gran parte del pasado; la lacunar se limita a un intervalo." },
      { term: "Estado crepuscular", difference: "El estado crepuscular suele dejar amnesia lacunar posterior." }
    ]
  ),
  makeConcept(
    39,
    "Amnesia selectiva",
    "memoria",
    "Memoria",
    "Semiología",
    "Pérdida de recuerdos específicos, que puede ser episódica o semántica.",
    "Se olvida un hecho o tipo de conocimiento, no toda la memoria.",
    "No recuerda un acontecimiento puntual de su vida, pero conserva otros recuerdos.",
    [
      { term: "Amnesia lacunar", difference: "La lacunar se delimita por tiempo; la selectiva por contenido." },
      { term: "Amnesia global", difference: "La global es mucho más extensa." }
    ]
  ),
  makeConcept(
    40,
    "Pseudoamnesia",
    "memoria",
    "Memoria",
    "Semiología",
    "Sensación subjetiva de pérdida de memoria sin pérdida objetiva demostrable.",
    "La persona cree que perdió la memoria, pero al evaluarla no se confirma esa pérdida.",
    "Afirma no recordar nada, aunque responde correctamente datos que decía haber olvidado.",
    [
      { term: "Amnesia", difference: "La amnesia verdadera implica pérdida real de fijación o evocación." },
      { term: "Agnosia", difference: "La agnosia es falla de reconocimiento sensorial, no pérdida mnésica primaria." }
    ]
  ),
  makeConcept(
    41,
    "Ecmnesia",
    "memoria",
    "Memoria",
    "Semiología",
    "Vivencia en la que recuerdos del pasado se experimentan como si ocurrieran en el presente.",
    "La persona revive una escena antigua como actual.",
    "Se comporta como si estuviera en una etapa previa de su vida y no en la situación presente.",
    [
      { term: "Hipermnesia", difference: "La hipermnesia aumenta el recuerdo; la ecmnesia altera la ubicación temporal del recuerdo." },
      { term: "Paramnesia", difference: "La paramnesia distorsiona el reconocimiento o recuerdo." }
    ],
    "Alta"
  ),
  makeConcept(
    42,
    "Paramnesia",
    "memoria",
    "Memoria",
    "Semiología",
    "Distorsión del recuerdo o del reconocimiento, como falsos reconocimientos o vivencias de familiaridad errónea.",
    "La memoria reconoce mal o recuerda de forma deformada.",
    "Tiene la sensación de haber estado antes en un lugar que visita por primera vez.",
    [
      { term: "Confabulación", difference: "La confabulación rellena lagunas de memoria con relatos no verídicos." },
      { term: "Amnesia", difference: "La amnesia es pérdida; la paramnesia es distorsión." }
    ]
  ),
  makeConcept(
    43,
    "Parapraxia",
    "memoria",
    "Memoria",
    "Semiología",
    "Error simple de memoria o acción cotidiana, como olvido de nombres, fechas o fenómeno de punta de la lengua.",
    "Son fallos menores comunes, no siempre patológicos.",
    "No recuerda un nombre conocido aunque siente que lo tiene en la punta de la lengua.",
    [
      { term: "Amnesia", difference: "La amnesia implica pérdida más marcada; la parapraxia es un fallo simple." },
      { term: "Hipomnesia", difference: "La hipomnesia es disminución general de memoria." }
    ],
    "Básica"
  ),
  makeConcept(
    44,
    "Hiperestesia",
    "percepcion",
    "Percepción",
    "Semiología",
    "Aumento exagerado de las sensaciones frente a estímulos sin cambio en el tipo de sensación.",
    "Un estímulo normal se siente demasiado intenso.",
    "Un sonido cotidiano le resulta insoportablemente fuerte.",
    [
      { term: "Hipoestesia", difference: "La hipoestesia disminuye la sensación; la hiperestesia la aumenta." },
      { term: "Parestesia", difference: "La parestesia cambia la cualidad de la sensación." }
    ]
  ),
  makeConcept(
    45,
    "Hipoestesia",
    "percepcion",
    "Percepción",
    "Semiología",
    "Disminución de la sensación habitual frente a un estímulo determinado.",
    "La persona siente menos de lo esperable.",
    "Percibe muy débilmente un estímulo táctil que normalmente sería claro.",
    [
      { term: "Anestesia", difference: "La anestesia es abolición total de la sensación." },
      { term: "Hiperestesia", difference: "La hiperestesia aumenta la intensidad percibida." }
    ]
  ),
  makeConcept(
    46,
    "Anestesia",
    "percepcion",
    "Percepción",
    "Semiología",
    "Abolición o falta total de sensaciones para uno o varios estímulos sensoriales.",
    "La persona no siente un estímulo que debería percibir.",
    "No percibe dolor ni temperatura en una zona de la piel.",
    [
      { term: "Hipoestesia", difference: "La hipoestesia disminuye la sensación; la anestesia la elimina." },
      { term: "Analgesia", difference: "La analgesia se refiere específicamente a ausencia de dolor." }
    ],
    "Básica"
  ),
  makeConcept(
    47,
    "Hiperalgesia",
    "percepcion",
    "Percepción",
    "Semiología",
    "Percepción exagerada de la intensidad del dolor.",
    "Pequeños golpes o molestias se sienten como dolor muy intenso.",
    "Un contacto leve se vive como un dolor desproporcionado.",
    [
      { term: "Hipoalgesia", difference: "La hipoalgesia reduce la percepción del dolor." },
      { term: "Hiperestesia", difference: "La hiperestesia puede afectar cualquier sensación; la hiperalgesia se centra en dolor." }
    ]
  ),
  makeConcept(
    48,
    "Hipoalgesia",
    "percepcion",
    "Percepción",
    "Semiología",
    "Percepción muy escasa de estímulos que normalmente causan dolor.",
    "El dolor se siente muy débil.",
    "Se golpea y apenas nota dolor pese a que el estímulo debería doler.",
    [
      { term: "Analgesia", difference: "La analgesia es ausencia total de dolor." },
      { term: "Hiperalgesia", difference: "La hiperalgesia aumenta exageradamente el dolor." }
    ]
  ),
  makeConcept(
    49,
    "Parestesia",
    "percepcion",
    "Percepción",
    "Semiología",
    "Sensación errónea o inadecuada ante un estímulo sensorial, como hormigueo, frío o sensación extraña.",
    "El estímulo se siente de una manera que no corresponde.",
    "Un pinchazo se percibe como hormigueo o frío en lugar de dolor.",
    [
      { term: "Cenestopatía", difference: "La cenestopatía es una sensación interna imprecisa en órganos o músculos." },
      { term: "Hipoestesia", difference: "La hipoestesia reduce intensidad; la parestesia altera cualidad." }
    ]
  ),
  makeConcept(
    50,
    "Cenestopatía",
    "percepcion",
    "Percepción",
    "Semiología",
    "Sensación interna imprecisa, habitualmente desagradable, referida a órganos o músculos.",
    "La persona siente malestar interno raro que no puede precisar.",
    "Describe una sensación desagradable dentro del abdomen sin poder ubicarla como dolor concreto.",
    [
      { term: "Parestesia", difference: "La parestesia se relaciona con estímulos sensoriales; la cenestopatía es malestar corporal interno difuso." },
      { term: "Idea hipocondríaca", difference: "La idea hipocondríaca interpreta molestias como enfermedad." }
    ],
    "Alta"
  ),
  makeConcept(
    51,
    "Metamorfopsia o dismegalopsia",
    "percepcion",
    "Percepción",
    "Semiología",
    "Alteración en la percepción del tamaño o la forma de los objetos.",
    "Los objetos se ven más grandes, pequeños o deformados.",
    "Refiere que las paredes se ven alargadas o que los objetos cambian de tamaño.",
    [
      { term: "Ilusión", difference: "La ilusión interpreta mal un estímulo real; la metamorfopsia distorsiona tamaño o forma." },
      { term: "Autometamorfopsia", difference: "La autometamorfopsia afecta el propio cuerpo." }
    ]
  ),
  makeConcept(
    52,
    "Autometamorfopsia",
    "percepcion",
    "Percepción",
    "Semiología",
    "Distorsión en la percepción del tamaño o la forma del propio cuerpo o de partes corporales.",
    "La persona siente su cuerpo o una parte como deformada o de tamaño distinto.",
    "Percibe una extremidad como enorme, pequeña o cambiada de forma.",
    [
      { term: "Metamorfopsia", difference: "La metamorfopsia se refiere a objetos externos; la autometamorfopsia, al cuerpo propio." },
      { term: "Despersonalización", difference: "La despersonalización es extrañeza del yo, no cambio perceptivo de tamaño o forma." }
    ],
    "Alta"
  ),
  makeConcept(
    53,
    "Escisión perceptiva",
    "percepcion",
    "Percepción",
    "Semiología",
    "Desintegración de elementos de un mismo estímulo o fracaso en integrar modalidades sensoriales.",
    "Lo percibido se separa en partes que no se sienten unidas.",
    "Al mirar televisión siente que imagen y sonido vienen de fuentes distintas y compiten entre sí.",
    [
      { term: "Aglutinación perceptiva", difference: "La aglutinación fusiona sensaciones; la escisión las separa." },
      { term: "Ilusión", difference: "La ilusión es error de interpretación, no falla de integración sensorial." }
    ],
    "Alta"
  ),
  makeConcept(
    54,
    "Aglutinación perceptiva",
    "percepcion",
    "Percepción",
    "Semiología",
    "Percepción unitaria de sensaciones que en realidad se producen de forma diferenciada.",
    "Varias sensaciones se mezclan y cuesta distinguirlas.",
    "Percibe color, sonido y forma como una sola experiencia difícil de separar.",
    [
      { term: "Escisión perceptiva", difference: "La escisión fragmenta; la aglutinación fusiona." },
      { term: "Sinestesia", difference: "La sinestesia asocia modalidades; la aglutinación impide diferenciarlas." }
    ],
    "Alta"
  ),
  makeConcept(
    55,
    "Pareidolia",
    "percepcion",
    "Percepción",
    "Semiología",
    "Ilusión donde se organiza un estímulo ambiguo y se le otorga significado específico.",
    "La mente encuentra figuras o sentidos en estímulos poco definidos.",
    "Ver caras en nubes, montañas o llamas.",
    [
      { term: "Ilusión", difference: "La pareidolia es una modalidad específica de ilusión ante estímulos ambiguos." },
      { term: "Alucinación", difference: "En la alucinación no hay estímulo real apropiado." }
    ],
    "Básica"
  ),
  makeConcept(
    56,
    "Imágenes hipnagógicas e hipnopómpicas",
    "percepcion",
    "Percepción",
    "Semiología",
    "Imágenes autónomas que aparecen en estados de semiconsciencia entre sueño y vigilia.",
    "Son imágenes que aparecen al dormirse o al despertar.",
    "Al quedarse dormido escucha o ve escenas breves que desaparecen al estar plenamente despierto.",
    [
      { term: "Alucinación", difference: "Estas imágenes se asocian al tránsito sueño-vigilia y pueden ser fisiológicas." },
      { term: "Estado oniroide", difference: "El estado oniroide es una alteración de conciencia con vivencias escénicas más amplias." }
    ]
  ),
  makeConcept(
    57,
    "Imágenes alucinoides",
    "percepcion",
    "Percepción",
    "Semiología",
    "Imágenes autónomas y subjetivas sin estímulo presente, reconocidas por la persona como creadas por la mente.",
    "La persona ve imágenes internas o externas, pero sabe que no son reales.",
    "Con fiebre alta refiere imágenes extrañas en el espacio de los ojos cerrados y reconoce que no existen.",
    [
      { term: "Alucinación", difference: "En la alucinación verdadera suele vivirse con fuerza de realidad." },
      { term: "Pseudoalucinación", difference: "La pseudoalucinación aparece en espacio subjetivo interior y sin corporeidad plena." }
    ],
    "Alta"
  ),
  makeConcept(
    58,
    "Alucinosis",
    "percepcion",
    "Percepción",
    "Semiología",
    "Fenómeno en el que la persona percibe algo inexistente pero conserva conciencia de irrealidad.",
    "Percibe algo que no existe, pero sabe que no es real.",
    "Tras consumo de sustancias oye sonidos y dice que son producto de la droga.",
    [
      { term: "Alucinación", difference: "En la alucinación puede faltar conciencia de irrealidad." },
      { term: "Ilusión", difference: "La ilusión parte de un estímulo real mal interpretado." }
    ],
    "Alta"
  ),
  makeConcept(
    59,
    "Alucinación negativa",
    "percepcion",
    "Percepción",
    "Semiología",
    "No percepción de un estímulo que sí existe en el campo sensorial.",
    "La persona no percibe algo real que está presente.",
    "No ve a una persona situada frente a ella pese a estar en su campo visual.",
    [
      { term: "Alucinación", difference: "La alucinación positiva añade una percepción sin estímulo; la negativa omite un estímulo real." },
      { term: "Anestesia", difference: "La anestesia es ausencia sensorial por vía o modalidad, no omisión perceptiva específica." }
    ],
    "Alta"
  ),
  makeConcept(
    60,
    "Desrealización",
    "percepcion",
    "Percepción",
    "Semiología",
    "Vivencia en la que los objetos se perciben con nitidez, pero parecen irreales o extraños.",
    "El mundo se siente raro, como si no fuera del todo real.",
    "Dice que todo a su alrededor parece una fantasía, aunque sabe que existe.",
    [
      { term: "Despersonalización", difference: "La desrealización afecta el entorno; la despersonalización afecta la vivencia del yo." },
      { term: "Delirio", difference: "En desrealización suele conservarse conciencia de que lo percibido corresponde a la realidad." }
    ],
    "Alta"
  ),
  makeConcept(
    61,
    "Despersonalización",
    "percepcion",
    "Percepción",
    "Semiología",
    "Vivencia de extrañeza o cambio del yo, con sensación de irrealidad personal y automatismo.",
    "La persona se siente extraña a sí misma, como si observara su vida desde fuera.",
    "Refiere que sus pensamientos y acciones parecen venir desde fuera de sí.",
    [
      { term: "Desrealización", difference: "La desrealización se refiere al mundo externo; la despersonalización, al yo." },
      { term: "Desorientación autopsíquica", difference: "En despersonalización hay extrañeza del yo, no necesariamente pérdida de identidad." }
    ],
    "Alta"
  ),
  makeConcept(
    62,
    "Pensamiento autista",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Pensamiento originado en vivencias perceptuales irreales, lleno de fantasía e irrealidad.",
    "La persona queda metida en un mundo interno fantástico y apartado de la realidad.",
    "Se muestra ensimismada y organiza sus ideas a partir de vivencias alucinatorias.",
    [
      { term: "Idea delirante", difference: "La idea delirante es una creencia irreductible; el pensamiento autista describe el modo de pensamiento fantástico." },
      { term: "Pseudoaprosexia", difference: "La pseudoaprosexia aparenta falta de atención por foco interno." }
    ],
    "Alta"
  ),
  makeConcept(
    63,
    "Bradipsiquia",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Retardo o lentificación en la producción de ideas.",
    "El pensamiento va lento y cuesta responder.",
    "Ante preguntas sencillas demora mucho en contestar y parece esforzarse para coordinar ideas.",
    [
      { term: "Taquipsiquia", difference: "La taquipsiquia acelera el pensamiento; la bradipsiquia lo enlentece." },
      { term: "Pobreza del habla", difference: "La pobreza del habla reduce producción verbal espontánea; la bradipsiquia enlentece ideas." }
    ]
  ),
  makeConcept(
    64,
    "Taquipsiquia",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Aceleración del desarrollo de las ideas, con conversación rápida y abundante.",
    "Las ideas salen muy rápido y el habla se acelera.",
    "Paciente maníaco que responde antes de terminar la pregunta y habla sin pausa.",
    [
      { term: "Bradipsiquia", difference: "La bradipsiquia es lentificación del pensamiento." },
      { term: "Fuga de ideas", difference: "La fuga de ideas es el grado máximo de aceleración con pérdida de conclusión." }
    ]
  ),
  makeConcept(
    65,
    "Fuga de ideas",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Grado máximo de aceleración del pensamiento donde las ideas se fugan y no se concluyen.",
    "Piensa tan rápido que no logra terminar lo que iba diciendo.",
    "Empieza una frase, salta a otra asociación y no vuelve a la idea inicial.",
    [
      { term: "Taquipsiquia", difference: "La taquipsiquia acelera; la fuga de ideas rompe la capacidad de concluir." },
      { term: "Disgregación", difference: "La disgregación rompe la relación lógica entre frases." }
    ],
    "Alta"
  ),
  makeConcept(
    66,
    "Pérdida de meta",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Fracaso para seguir una cadena de pensamientos hasta su conclusión, alejándose del tema inicial.",
    "La persona empieza con un tema y se pierde hasta no volver a lo que quería decir.",
    "Relata un problema, deriva por detalles laterales y nunca responde la pregunta inicial.",
    [
      { term: "Prolijidad", difference: "La prolijidad da rodeos, pero conserva la idea central." },
      { term: "Fuga de ideas", difference: "La fuga de ideas ocurre por aceleración extrema." }
    ],
    "Alta"
  ),
  makeConcept(
    67,
    "Prolijidad",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Exceso de rodeos y detalles innecesarios en la conversación, sin aceleración del pensamiento.",
    "La persona tarda mucho en llegar al punto por detalles secundarios.",
    "Para responder una pregunta simple cuenta antecedentes irrelevantes antes de llegar a la respuesta.",
    [
      { term: "Pérdida de meta", difference: "En la prolijidad se conserva la meta; en pérdida de meta se abandona." },
      { term: "Pobreza del contenido", difference: "La pobreza del contenido usa muchas palabras con poca información." }
    ]
  ),
  makeConcept(
    68,
    "Perseveración del pensamiento",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Repetición automática y frecuente de ideas, frases o palabras introducidas como material de relleno.",
    "La persona repite una idea una y otra vez sin necesidad.",
    "Contesta distintas preguntas volviendo siempre a la misma frase.",
    [
      { term: "Palilalia", difference: "La palilalia repite palabras; la perseveración repite contenido ideativo o verbal." },
      { term: "Rumiación", difference: "La rumiación repite pensamientos sobre malestar y problemas." }
    ]
  ),
  makeConcept(
    69,
    "Bloqueo del pensamiento",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Interrupción súbita del pensamiento durante el discurso, vivida como pérdida o robo de la idea.",
    "La persona se queda en blanco a mitad de una idea.",
    "Se detiene mientras habla y dice que se le fue lo que estaba pensando.",
    [
      { term: "Vacío mental", difference: "El vacío mental es sensación de no pensar en nada; el bloqueo interrumpe una idea en curso." },
      { term: "Bradipsiquia", difference: "La bradipsiquia enlentece, pero no corta súbitamente la idea." }
    ],
    "Alta"
  ),
  makeConcept(
    70,
    "Disgregación",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Incongruencia entre frases sin relación lógica entre ellas.",
    "Las frases no conectan bien entre sí.",
    "Dice: la naranja es dulce, pero yo me quedo en casa porque la silla está en su sitio.",
    [
      { term: "Incoherencia", difference: "La incoherencia llega a una ruptura incomprensible del pensamiento." },
      { term: "Tangencialidad", difference: "La tangencialidad responde de lado; la disgregación rompe conexiones lógicas." }
    ],
    "Alta"
  ),
  makeConcept(
    71,
    "Incoherencia o esquizofasia",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Falta de conexión lógica entre palabras que vuelve incomprensible el discurso.",
    "El habla se convierte en una mezcla incomprensible de palabras.",
    "El interlocutor no puede entender el sentido de lo que el paciente dice.",
    [
      { term: "Disgregación", difference: "La disgregación conserva frases más comprensibles; la incoherencia rompe el discurso." },
      { term: "Neologismos", difference: "Los neologismos son palabras inventadas o con significado propio." }
    ],
    "Alta"
  ),
  makeConcept(
    72,
    "Tangencialidad",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Respuesta oblicua, tangencial o irrelevante ante una pregunta.",
    "Contesta, pero se va por un lado y no responde realmente.",
    "Al preguntarle su edad, responde hablando de dónde vive su madre.",
    [
      { term: "Pérdida de meta", difference: "La pérdida de meta se aleja durante el discurso; la tangencialidad aparece ya en la respuesta." },
      { term: "Pararrespuesta", difference: "La pararrespuesta es aproximada e incorrecta, pero muestra comprensión de la pregunta." }
    ]
  ),
  makeConcept(
    73,
    "Neologismo",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Invención de palabras o uso de palabras comunes con un significado diferente al correcto.",
    "La persona usa palabras propias que los demás no comprenden.",
    "Dice una palabra inventada para nombrar un objeto cotidiano y no acepta el término usual.",
    [
      { term: "Parafasia", difference: "La parafasia sustituye sonidos o palabras en el habla." },
      { term: "Incoherencia", difference: "La incoherencia afecta la conexión general del discurso." }
    ],
    "Alta"
  ),
  makeConcept(
    74,
    "Alogia o pobreza del habla",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Disminución de la cantidad de lenguaje espontáneo, con respuestas breves y poco elaboradas.",
    "La persona habla muy poco y responde con lo mínimo.",
    "Ante preguntas abiertas responde solo sí, no o frases muy cortas.",
    [
      { term: "Mutismo", difference: "El mutismo implica ausencia de lenguaje expresivo." },
      { term: "Pobreza del contenido", difference: "En pobreza del contenido puede hablar mucho, pero aporta poca información." }
    ]
  ),
  makeConcept(
    75,
    "Pensamiento concreto",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Pensamiento literal con dificultad para la abstracción o para captar metáforas.",
    "La persona entiende expresiones figuradas como si fueran literales.",
    "Interpreta 'tener la cabeza fría' como una referencia real a temperatura.",
    [
      { term: "Ilogicidad", difference: "La ilogicidad falla en inferencias; el concretismo falla en abstracción." },
      { term: "Bradipsiquia", difference: "La bradipsiquia enlentece el pensamiento." }
    ]
  ),
  makeConcept(
    76,
    "Preocupación",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Cadena de pensamientos sobre el futuro con afecto negativo y dificultad de control.",
    "La mente anticipa problemas futuros una y otra vez.",
    "No puede dejar de imaginar que perderá el trabajo o que todo saldrá mal.",
    [
      { term: "Rumiación", difference: "La preocupación mira al futuro; la rumiación se centra en presente o pasado reciente." },
      { term: "Idea obsesiva", difference: "La obsesión se vive como intrusa, absurda y egodistónica." }
    ]
  ),
  makeConcept(
    77,
    "Rumiación",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Pensamiento perseverante sobre emociones negativas, síntomas, problemas, causas y consecuencias.",
    "La persona le da vueltas a lo que salió mal y no logra salir de ahí.",
    "Pasa el día pensando en errores pasados, culpa y posibles causas de su malestar.",
    [
      { term: "Preocupación", difference: "La preocupación se orienta al futuro; la rumiación al pasado reciente o presente." },
      { term: "Perseveración", difference: "La perseveración repite contenido sin el componente reflexivo de malestar." }
    ]
  ),
  makeConcept(
    78,
    "Idea obsesiva",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Pensamiento, impulso o imagen recurrente e intrusa que causa ansiedad y la persona intenta ignorar o suprimir.",
    "Aparece una idea no deseada que la persona reconoce como absurda o molesta, pero no puede controlar.",
    "Tiene pensamientos repetidos de contaminación y necesita comprobar o lavar para calmarse.",
    [
      { term: "Idea fija", difference: "La idea fija puede reflejar un fenómeno real; la obsesiva es intrusa, egodistónica y ansiógena." },
      { term: "Idea delirante", difference: "La delirante es irreductible; la obsesiva suele reconocerse como irracional." }
    ],
    "Alta"
  ),
  makeConcept(
    79,
    "Idea sobrevalorada",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Exceso de valoración o importancia otorgada a un asunto que no la tiene.",
    "La persona magnifica un hecho real y le da demasiada importancia.",
    "Después de una discusión menor cree que será sancionada gravemente.",
    [
      { term: "Idea delirante", difference: "La sobrevalorada parte de un hecho real y puede ser más discutible; la delirante es irreductible e irreal." },
      { term: "Preocupación", difference: "La preocupación encadena anticipaciones futuras." }
    ]
  ),
  makeConcept(
    80,
    "Idea fija",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Pensamiento persistente que aparece en la conciencia contra la voluntad y no puede apartarse fácilmente.",
    "Una idea se queda pegada en la mente aunque la persona quiera sacarla.",
    "No logra dejar de pensar en un problema ya resuelto.",
    [
      { term: "Idea obsesiva", difference: "La obsesiva suele ser intrusa, absurda, ansiógena y egodistónica." },
      { term: "Rumiación", difference: "La rumiación implica vueltas repetidas sobre malestar, causas y consecuencias." }
    ]
  ),
  makeConcept(
    81,
    "Idea fóbica",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Miedo persistente que la persona reconoce como infundado, pero no puede apartar.",
    "Sabe que el temor no tiene base suficiente, pero igual lo siente intensamente.",
    "Evita elevadores por miedo intenso a lugares cerrados pese a reconocer que no hay peligro real.",
    [
      { term: "Ansiedad", difference: "La ansiedad es emoción anticipatoria; la idea fóbica organiza un temor específico." },
      { term: "Idea delirante", difference: "La delirante no se reconoce como infundada." }
    ]
  ),
  makeConcept(
    82,
    "Idea hipocondríaca",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Interpretación de molestias corporales como señal de enfermedad, con búsqueda frecuente de confirmación médica.",
    "La persona cree que sus molestias indican una enfermedad y necesita comprobarlo.",
    "Acude repetidamente a consultas por sensaciones corporales leves que interpreta como enfermedad grave.",
    [
      { term: "Cenestopatía", difference: "La cenestopatía es sensación corporal imprecisa; la idea hipocondríaca interpreta enfermedad." },
      { term: "Delirio hipocondríaco", difference: "El delirio hipocondríaco es irreductible pese a la evidencia médica." }
    ]
  ),
  makeConcept(
    83,
    "Idea delirante",
    "pensamiento",
    "Ideas delirantes",
    "Semiología",
    "Creencia falsa, ilógica, morbosa e irreductible que no cede con razonamiento.",
    "La persona está convencida de algo falso y no cambia de idea aunque se le demuestre lo contrario.",
    "Afirma que lo vigilan con aparatos especiales sin evidencia y rechaza toda explicación alternativa.",
    [
      { term: "Idea obsesiva", difference: "La obsesiva suele ser reconocida como irracional; la delirante se sostiene como verdad." },
      { term: "Idea sobrevalorada", difference: "La sobrevalorada exagera un hecho real; la delirante es falsa e irreductible." }
    ],
    "Alta"
  ),
  makeConcept(
    84,
    "Delirio de persecución",
    "pensamiento",
    "Ideas delirantes",
    "Semiología",
    "Idea delirante cuyo contenido se refiere a vigilancia, chequeo o persecución de la persona.",
    "La persona cree firmemente que la siguen o vigilan.",
    "Dice que lo siguen por la calle y que todas sus llamadas están intervenidas.",
    [
      { term: "Delirio de referencia", difference: "El de referencia interpreta comentarios o gestos como dirigidos a uno." },
      { term: "Hipervigilancia", difference: "La hipervigilancia es alerta aumentada, no creencia delirante." }
    ],
    "Alta"
  ),
  makeConcept(
    85,
    "Delirio de influencia",
    "pensamiento",
    "Ideas delirantes",
    "Semiología",
    "Creencia delirante de que una fuerza externa controla o influye en el pensamiento.",
    "La persona cree que algo externo controla su mente.",
    "Afirma que le controlan los pensamientos por telepatía o aparatos especiales.",
    [
      { term: "Automatismo psíquico", difference: "El automatismo psíquico incluye vivencias de robo, influencia o imposición del pensamiento." },
      { term: "Pensamiento autista", difference: "El pensamiento autista describe un modo fantástico de pensar, no una creencia específica." }
    ],
    "Alta"
  ),
  makeConcept(
    86,
    "Delirio de grandeza",
    "pensamiento",
    "Ideas delirantes",
    "Semiología",
    "Creencia delirante de exaltación de cualidades personales, poder, fama o relaciones especiales.",
    "La persona cree ser extraordinariamente poderosa, famosa o elegida.",
    "Afirma haber descubierto una cura mundial y tener comunicación directa con líderes políticos.",
    [
      { term: "Manía", difference: "La manía puede incluir grandiosidad, pero es un síndrome afectivo completo." },
      { term: "Euforia", difference: "La euforia es estado de ánimo elevado, no creencia delirante." }
    ],
    "Alta"
  ),
  makeConcept(
    87,
    "Delirio de referencia",
    "pensamiento",
    "Ideas delirantes",
    "Semiología",
    "Creencia de que comentarios, risas o conductas de otros se refieren al paciente.",
    "La persona cree que todo lo que otros dicen o hacen tiene que ver con ella.",
    "Al oír risas en un grupo, asegura que se burlan de él aunque no haya evidencia.",
    [
      { term: "Autorreferencia", difference: "La autorreferencia lleva el discurso hacia sí mismo sin necesariamente sentir amenaza delirante." },
      { term: "Delirio de persecución", difference: "La persecución implica vigilancia o seguimiento." }
    ],
    "Alta"
  ),
  makeConcept(
    88,
    "Delirio celotípico",
    "pensamiento",
    "Ideas delirantes",
    "Semiología",
    "Creencia delirante de infidelidad de la pareja.",
    "La persona está convencida de que su pareja la engaña sin pruebas reales.",
    "Interpreta horarios, ropa o mensajes neutros como evidencia irrefutable de infidelidad.",
    [
      { term: "Idea sobrevalorada", difference: "La sobrevalorada puede exagerar hechos reales; el delirio celotípico es irreductible." },
      { term: "Delirio erótico", difference: "El erótico implica creerse amado por otra persona." }
    ],
    "Alta"
  ),
  makeConcept(
    89,
    "Delirio nihilista",
    "pensamiento",
    "Ideas delirantes",
    "Semiología",
    "Creencia delirante de muerte, inexistencia o destrucción del propio cuerpo o del mundo.",
    "La persona cree que está muerta o que todo dejó de existir.",
    "Afirma que sus órganos no funcionan o que el mundo está vacío y muerto.",
    [
      { term: "Delirio de negación", difference: "El de negación se centra en que algo no existe; el nihilista en muerte o destrucción." },
      { term: "Desrealización", difference: "En desrealización el mundo parece irreal, pero suele conservarse juicio de realidad." }
    ],
    "Alta"
  ),
  makeConcept(
    90,
    "Ideas deliroides",
    "pensamiento",
    "Ideas delirantes",
    "Semiología",
    "Ideas irreales e ilógicas similares a delirantes, pero que pueden reconsiderarse al razonar con el paciente.",
    "Parecen delirantes, pero la persona puede dudar y corregirse.",
    "Tras hablarlo, reconoce que su creencia pudo estar influida por su estado de ánimo.",
    [
      { term: "Idea delirante", difference: "La delirante es irreductible; la deliroide puede reconsiderarse." },
      { term: "Creencia disfuncional", difference: "La creencia disfuncional sesga la interpretación, pero no alcanza necesariamente forma deliroide." }
    ],
    "Alta"
  ),
  makeConcept(
    91,
    "Afasia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Pérdida de la capacidad de producir o comprender lenguaje por lesión cerebral.",
    "La persona pierde habilidades de hablar, comprender, leer o escribir por daño cerebral.",
    "Después de un accidente cerebrovascular no comprende órdenes verbales o no puede expresarse.",
    [
      { term: "Disartria", difference: "La disartria afecta articulación por músculos; la afasia afecta lenguaje." },
      { term: "Mutismo", difference: "El mutismo es ausencia de lenguaje expresivo, no necesariamente por lesión del sistema del lenguaje." }
    ],
    "Alta"
  ),
  makeConcept(
    92,
    "Agramatismo",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Dificultad para encadenar palabras en frases usando reglas gramaticales.",
    "La persona habla con estructura gramatical muy pobre.",
    "Dice palabras sueltas sin conectores ni flexiones necesarias para armar una frase.",
    [
      { term: "Afasia", difference: "El agramatismo puede aparecer dentro de afasias, pero describe una falla gramatical específica." },
      { term: "Paragramatismo", difference: "El paragramatismo vuelve la estructura incomprensible." }
    ]
  ),
  makeConcept(
    93,
    "Aprosodia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Incapacidad para la entonación, musicalidad, inflexión y cadencia del habla.",
    "El habla pierde melodía y variación emocional.",
    "Habla de forma plana, sin cambios de tono aunque el contenido sea emocional.",
    [
      { term: "Disfonía", difference: "La disfonía afecta la voz; la aprosodia afecta entonación y musicalidad." },
      { term: "Aplanamiento afectivo", difference: "El aplanamiento es falta de expresión afectiva global." }
    ]
  ),
  makeConcept(
    94,
    "Anomia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Dificultad para encontrar palabras que designen objetos o personas.",
    "La palabra está, pero no logra encontrarla.",
    "Ve un lápiz, sabe para qué sirve, pero no puede nombrarlo.",
    [
      { term: "Parapraxia", difference: "La parapraxia puede ser un olvido simple; la anomia es dificultad lingüística de denominación." },
      { term: "Alexia", difference: "La alexia afecta lectura." }
    ]
  ),
  makeConcept(
    95,
    "Dislalia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Dificultad para articular fonemas, sílabas o palabras, de origen orgánico o funcional.",
    "La persona no pronuncia bien ciertos sonidos.",
    "Sustituye o deforma fonemas al hablar, pese a comprender lo que quiere decir.",
    [
      { term: "Disartria", difference: "La disartria se debe a alteración neuromuscular del habla." },
      { term: "Disglosia", difference: "La disglosia se produce por alteración de órganos periféricos del habla." }
    ]
  ),
  makeConcept(
    96,
    "Disartria",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Dificultad del habla por trastornos del tono y movimiento de músculos articulatorios secundarios a lesión del sistema nervioso.",
    "La articulación se altera por un problema motor neurológico.",
    "Habla pastosa o mal articulada tras lesión neurológica.",
    [
      { term: "Afasia", difference: "La afasia afecta lenguaje; la disartria afecta ejecución motora del habla." },
      { term: "Dislalia", difference: "La dislalia es alteración de fonemas, a menudo funcional u orgánica periférica." }
    ],
    "Alta"
  ),
  makeConcept(
    97,
    "Parafasia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Producción no intencional de sílabas, palabras o frases sustituidas durante el habla.",
    "La persona cambia sonidos o palabras sin querer.",
    "Dice 'zapato' cuando quería decir 'guante' o sustituye sílabas dentro de una palabra.",
    [
      { term: "Neologismo", difference: "El neologismo inventa palabras o significados; la parafasia sustituye elementos lingüísticos." },
      { term: "Dislalia", difference: "La dislalia es defecto articulatorio, no sustitución lingüística con articulación correcta." }
    ],
    "Alta"
  ),
  makeConcept(
    98,
    "Mutismo",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Ausencia permanente o temporal del lenguaje expresivo en alguien que lo adquirió previamente.",
    "La persona no habla, aunque antes podía hacerlo.",
    "Permanece sin emitir palabras durante la entrevista pese a estar despierta.",
    [
      { term: "Alogia", difference: "La alogia reduce el habla; el mutismo la elimina." },
      { term: "Mutismo selectivo", difference: "El mutismo selectivo aparece ante personas o situaciones específicas." }
    ]
  ),
  makeConcept(
    99,
    "Tartamudez",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Alteración persistente de la fluidez, tiempo y ritmo del habla.",
    "El habla se interrumpe con repeticiones, bloqueos o disfluencias.",
    "Repite sonidos o queda bloqueado al iniciar palabras, dificultando la comunicación.",
    [
      { term: "Palilalia", difference: "La palilalia repite palabras con incremento de frecuencia." },
      { term: "Ecolalia", difference: "La ecolalia repite lo que acaba de decir otra persona." }
    ],
    "Básica"
  ),
  makeConcept(
    100,
    "Ecolalia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Repetición en eco de sílabas, palabras o frases breves que acaba de pronunciar otra persona.",
    "La persona repite lo que escucha como un eco.",
    "El entrevistador dice 'buenos días' y el paciente responde repitiendo 'buenos días'.",
    [
      { term: "Palilalia", difference: "La palilalia repite palabras propias." },
      { term: "Ecopraxia", difference: "La ecopraxia imita movimientos, no palabras." }
    ]
  ),
  makeConcept(
    101,
    "Palilalia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Repetición de una palabra propia con aumento de frecuencia.",
    "La persona repite una palabra que acaba de decir.",
    "Dice 'bien, bien, bien, bien' cada vez más rápido o repetido.",
    [
      { term: "Ecolalia", difference: "La ecolalia repite palabras ajenas; la palilalia repite palabras propias." },
      { term: "Perseveración", difference: "La perseveración repite ideas o respuestas de forma más amplia." }
    ]
  ),
  makeConcept(
    102,
    "Eutimia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Estado de ánimo equilibrado, caracterizado por bienestar y tranquilidad.",
    "El ánimo está estable y proporcionado.",
    "Durante la entrevista muestra serenidad y respuesta emocional adecuada al contexto.",
    [
      { term: "Hipertimia", difference: "La hipertimia aumenta el tono afectivo." },
      { term: "Hipotimia", difference: "La hipotimia disminuye el tono afectivo." }
    ],
    "Básica"
  ),
  makeConcept(
    103,
    "Euforia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Estado de ánimo placentero producido por alegría inmotivada.",
    "La persona está alegre sin una causa clara.",
    "Se muestra muy alegre y expansiva, pero no puede explicar por qué.",
    [
      { term: "Alegría", difference: "La alegría normal tiene motivo proporcional." },
      { term: "Manía", difference: "La manía es el grado máximo con conducta excitada y otros síntomas." }
    ]
  ),
  makeConcept(
    104,
    "Moria",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Alegría insulsa o sin sentido, descrita como tonta o inadecuada.",
    "La alegría se ve vacía, infantil o fuera de lugar.",
    "Ríe y hace bromas simples en una situación grave sin captar su significado.",
    [
      { term: "Euforia", difference: "La euforia es alegría inmotivada; la moria tiene carácter insulso e inadecuado." },
      { term: "Afecto discordante", difference: "La discordancia implica reacción emocional opuesta a la esperable." }
    ],
    "Alta"
  ),
  makeConcept(
    105,
    "Hipomanía",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Exaltación del ánimo o alegría exagerada con elevada satisfacción no siempre concordante con la realidad.",
    "La persona está demasiado alegre, activa y simpática, pero menos intensa que en manía.",
    "Se muestra jocosa, muy sociable y acelerada, sin llegar al cuadro maníaco pleno.",
    [
      { term: "Manía", difference: "La manía es más intensa y se acompaña de conducta excitada marcada." },
      { term: "Euforia", difference: "La euforia es ánimo placentero inmotivado, no necesariamente síndrome de activación." }
    ]
  ),
  makeConcept(
    106,
    "Disforia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Estado de mal humor con gran irritabilidad y posible conducta agresiva.",
    "La persona está irritable y se molesta por cosas pequeñas.",
    "Responde con enojo desproporcionado ante comentarios neutros.",
    [
      { term: "Tristeza", difference: "La tristeza se centra en abatimiento; la disforia en irritabilidad." },
      { term: "Ansiedad", difference: "La ansiedad anticipa peligro; la disforia expresa malestar irritable." }
    ]
  ),
  makeConcept(
    107,
    "Indiferencia afectiva",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Disminución de la reacción emocional ante situaciones que normalmente deberían producir respuesta afectiva.",
    "La persona reacciona poco emocionalmente a hechos importantes.",
    "Recibe una noticia relevante y apenas cambia su expresión.",
    [
      { term: "Aplanamiento afectivo", difference: "El aplanamiento es el grado máximo de indiferencia afectiva." },
      { term: "Apatía de la atención", difference: "La apatía atencional es falta de interés; la indiferencia afectiva es baja reacción emocional." }
    ]
  ),
  makeConcept(
    108,
    "Aplanamiento afectivo",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Ausencia marcada de respuesta afectiva, con mímica y gestos pobres o inexistentes.",
    "La expresión emocional está casi apagada.",
    "Ante una noticia dolorosa se mantiene inmutable, sin gestos de tristeza o sorpresa.",
    [
      { term: "Indiferencia afectiva", difference: "El aplanamiento es más intenso, cercano a ausencia de afecto observable." },
      { term: "Depresión", difference: "La depresión implica ánimo triste o abatido, no necesariamente ausencia expresiva total." }
    ],
    "Alta"
  ),
  makeConcept(
    109,
    "Anhedonia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Pérdida de la capacidad para experimentar alegría o placer.",
    "La persona ya no disfruta actividades que antes le gustaban.",
    "Dice que comer, salir o escuchar música ya no le produce ningún placer.",
    [
      { term: "Depresión", difference: "La anhedonia puede ser síntoma depresivo; la depresión es un cuadro más amplio." },
      { term: "Aplanamiento afectivo", difference: "El aplanamiento se observa en expresión; la anhedonia es pérdida de placer." }
    ]
  ),
  makeConcept(
    110,
    "Ambivalencia afectiva",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Reacción emocional doble y contrapuesta frente a una misma situación.",
    "La persona siente dos emociones opuestas al mismo tiempo hacia lo mismo.",
    "Expresa amor y rechazo intensos hacia una misma persona en el mismo momento.",
    [
      { term: "Ambitendencia", difference: "La ambitendencia es conflicto motor entre acciones opuestas." },
      { term: "Disociación ideoafectiva", difference: "La disociación ideoafectiva implica afecto incongruente con la idea o situación." }
    ],
    "Alta"
  ),
  makeConcept(
    111,
    "Disociación ideoafectiva",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Reacción emocional contrapuesta o incongruente con la situación o contenido ideativo.",
    "La emoción no coincide con lo que se dice o con lo que ocurre.",
    "Relata una tragedia riendo o con expresión alegre.",
    [
      { term: "Ambivalencia afectiva", difference: "La ambivalencia mezcla emociones opuestas; la disociación muestra incongruencia." },
      { term: "Moria", difference: "La moria es alegría insulsa; la disociación es discordancia afectiva." }
    ],
    "Alta"
  ),
  makeConcept(
    112,
    "Alexitimia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Incapacidad o dificultad para identificar, reconocer y expresar las propias emociones.",
    "La persona no sabe nombrar bien lo que siente.",
    "Dice que se siente mal, pero no distingue si es tristeza, enojo o miedo.",
    [
      { term: "Aplanamiento afectivo", difference: "La alexitimia afecta identificación y comunicación emocional; el aplanamiento afecta expresión observable." },
      { term: "Anhedonia", difference: "La anhedonia es pérdida de placer." }
    ]
  ),
  makeConcept(
    113,
    "Incontinencia afectiva",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Imposibilidad de contener adecuadamente reacciones emocionales, a menudo ante estímulos poco relevantes.",
    "La emoción sale de forma intensa y difícil de frenar.",
    "Llora o se enfurece bruscamente por un comentario menor.",
    [
      { term: "Labilidad afectiva", difference: "La labilidad implica cambios rápidos; la incontinencia destaca falta de control." },
      { term: "Disforia", difference: "La disforia es irritabilidad sostenida." }
    ]
  ),
  makeConcept(
    114,
    "Acinesia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Pérdida del movimiento o dificultad para iniciarlo.",
    "La persona no inicia movimientos o le cuesta mucho empezar a moverse.",
    "Permanece inmóvil y no logra iniciar una acción solicitada.",
    [
      { term: "Hipocinesia", difference: "La hipocinesia reduce movimientos; la acinesia afecta su inicio o ausencia." },
      { term: "Parálisis", difference: "La parálisis es incapacidad por lesión o alteración funcional de una parte corporal." }
    ],
    "Alta"
  ),
  makeConcept(
    115,
    "Cataplejía",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Pérdida súbita y reversible del tono muscular durante la vigilia sin alteración de conciencia.",
    "La persona pierde fuerza de golpe, usualmente por emoción intensa, pero sigue consciente.",
    "Al reír intensamente se le doblan las rodillas y cae sin perder conciencia.",
    [
      { term: "Catalepsia", difference: "La catalepsia es inmovilidad y rigidez mantenida." },
      { term: "Narcolepsia", difference: "La cataplejía puede formar parte de la narcolepsia." }
    ],
    "Alta"
  ),
  makeConcept(
    116,
    "Catatonía",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Cuadro motor que puede incluir estupor, catalepsia, flexibilidad cérea, mutismo, negativismo, manierismos, estereotipias y ecosíntomas.",
    "Es un conjunto de alteraciones motoras y conductuales intensas.",
    "Paciente con mutismo, posturas extrañas, resistencia a instrucciones y repetición de gestos.",
    [
      { term: "Catalepsia", difference: "La catalepsia es un signo específico; la catatonía es un cuadro más amplio." },
      { term: "Estupor", difference: "El estupor puede aparecer dentro de catatonía, pero también por otras causas." }
    ],
    "Alta"
  ),
  makeConcept(
    117,
    "Retardo psicomotor",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Lentitud en iniciación, ejecución y finalización de actividad motora y pensamiento sin causa orgánica aparente.",
    "La persona se mueve, habla y piensa más lento.",
    "Camina despacio, tarda en responder y muestra gestos pobres durante un episodio depresivo.",
    [
      { term: "Bradipsiquia", difference: "La bradipsiquia enlentece ideas; el retardo psicomotor incluye conducta motora." },
      { term: "Hipocinesia", difference: "La hipocinesia reduce cantidad de movimiento; el retardo enfatiza lentitud." }
    ]
  ),
  makeConcept(
    118,
    "Hipocinesia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Reducción de los movimientos voluntarios y de la actividad espontánea.",
    "La persona hace menos movimientos y menos actividades.",
    "Deja de realizar tareas sencillas y permanece casi todo el día quieta.",
    [
      { term: "Acinesia", difference: "La acinesia es pérdida o dificultad para iniciar movimiento." },
      { term: "Hiperquinesia", difference: "La hiperquinesia aumenta la actividad motora." }
    ]
  ),
  makeConcept(
    119,
    "Hiperquinesia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Actividad motora excesiva con muchas acciones en poco tiempo o simultáneas, a menudo sin completarlas.",
    "La persona se mueve demasiado y empieza muchas cosas.",
    "Camina de un lado a otro, inicia tareas y las abandona rápidamente.",
    [
      { term: "Hipocinesia", difference: "La hipocinesia reduce actividad; la hiperquinesia la aumenta." },
      { term: "Agitación", difference: "La agitación puede ser hiperactividad intensa con tensión emocional." }
    ]
  ),
  makeConcept(
    120,
    "Negativismo",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Oposición o resistencia sin motivación aparente a instrucciones o movimientos demandados.",
    "La persona se resiste a hacer lo que se le pide, o hace lo contrario.",
    "Se le pide levantar el brazo y no lo mueve; o se le pide sentarse y se levanta.",
    [
      { term: "Obediencia automática", difference: "La obediencia automática ejecuta instrucciones pese a consecuencias." },
      { term: "Ambitendencia", difference: "La ambitendencia inicia acciones opuestas que se interfieren." }
    ],
    "Alta"
  ),
  makeConcept(
    121,
    "Obediencia automática",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Ejecución de una instrucción sin considerar consecuencias, incluso si resulta molesta.",
    "La persona obedece de forma automática, aunque no le convenga.",
    "Sigue sacando la lengua cuando se le pide, aunque cada vez reciba un pinchazo molesto.",
    [
      { term: "Negativismo", difference: "El negativismo resiste instrucciones; la obediencia automática las cumple." },
      { term: "Automatismo", difference: "El automatismo no depende necesariamente de una orden externa." }
    ],
    "Alta"
  ),
  makeConcept(
    122,
    "Ambitendencia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Tendencia a iniciar simultáneamente acciones antagónicas que se interfieren y no se completan.",
    "Quiere hacer dos movimientos opuestos y queda bloqueado.",
    "Extiende la mano para saludar, se detiene, vuelve a intentarlo y no completa el saludo.",
    [
      { term: "Ambivalencia afectiva", difference: "La ambivalencia afectiva es emocional; la ambitendencia es motora." },
      { term: "Negativismo", difference: "El negativismo resiste; la ambitendencia vacila entre acciones opuestas." }
    ],
    "Alta"
  ),
  makeConcept(
    123,
    "Flexibilidad cérea",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Resistencia plástica al mover pasivamente el cuerpo, conservando la postura final aunque sea incómoda.",
    "El cuerpo se deja colocar como cera y mantiene la posición.",
    "El examinador eleva el brazo del paciente y este queda suspendido por tiempo prolongado.",
    [
      { term: "Catalepsia", difference: "La flexibilidad cérea puede acompañar la catalepsia, pero describe la resistencia plástica." },
      { term: "Rigidez", difference: "La rigidez no conserva necesariamente posturas impuestas con cualidad cérea." }
    ],
    "Alta"
  ),
  makeConcept(
    124,
    "Catalepsia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Inmovilidad y rigidez muscular repentina y mantenida, sin respuesta a estímulos sensoriales.",
    "La persona queda rígida e inmóvil en una postura.",
    "Permanece en una posición fija y se pueden movilizar sus miembros pasivamente.",
    [
      { term: "Cataplejía", difference: "La cataplejía pierde tono; la catalepsia mantiene rigidez." },
      { term: "Flexibilidad cérea", difference: "La flexibilidad cérea es un fenómeno que puede verse dentro de catalepsia." }
    ],
    "Alta"
  ),
  makeConcept(
    125,
    "Ecopraxia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Imitación automática de movimientos observados en otra persona.",
    "La persona copia movimientos ajenos sin proponérselo.",
    "El examinador cruza los brazos y el paciente repite el gesto de inmediato.",
    [
      { term: "Ecolalia", difference: "La ecolalia repite palabras; la ecopraxia repite movimientos." },
      { term: "Ecomimia", difference: "La ecomimia imita gestos faciales." }
    ]
  ),
  makeConcept(
    126,
    "Temblor",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Movimiento no intencional, oscilatorio y rítmico por contracción alternante de músculos.",
    "Una parte del cuerpo tiembla de forma rítmica sin intención.",
    "Manos con oscilaciones visibles al mantener brazos extendidos.",
    [
      { term: "Tic", difference: "El tic es repentino, intermitente y puede suprimirse brevemente." },
      { term: "Mioclonía", difference: "La mioclonía es sacudida breve y rápida, no oscilación rítmica." }
    ],
    "Básica"
  ),
  makeConcept(
    127,
    "Distonía",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Movimiento involuntario por contracción muscular sostenida que causa torsiones, posturas extrañas o movimientos repetitivos.",
    "Un músculo se contrae y coloca el cuerpo en posturas raras o dolorosas.",
    "El cuello gira de forma sostenida e involuntaria por contracción muscular.",
    [
      { term: "Espasmo", difference: "El espasmo es contracción involuntaria; la distonía es sostenida y genera posturas." },
      { term: "Tic", difference: "El tic es breve, repetitivo y a veces suprimible." }
    ],
    "Alta"
  ),
  makeConcept(
    128,
    "Mioclonía",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Movimiento espasmódico muy rápido y breve, de amplitud variable.",
    "Es una sacudida muscular corta y rápida.",
    "Sacudidas breves de una mano o de varios músculos al mismo tiempo.",
    [
      { term: "Temblor", difference: "El temblor es rítmico y oscilatorio; la mioclonía es sacudida breve." },
      { term: "Convulsión", difference: "La convulsión es contracción violenta y difusa." }
    ],
    "Alta"
  ),
  makeConcept(
    129,
    "Tics",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Movimientos o sonidos involuntarios repentinos, intermitentes, espasmódicos y sin objetivo.",
    "La persona hace movimientos o sonidos breves que puede suprimir por poco tiempo.",
    "Parpadea repetidamente o emite sonidos breves que aumentan con ansiedad.",
    [
      { term: "Estereotipia", difference: "La estereotipia es repetición continuada y organizada de movimientos." },
      { term: "Mioclonía", difference: "La mioclonía no suele tener tensión previa ni supresión voluntaria." }
    ]
  ),
  makeConcept(
    130,
    "Estereotipias",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Repetición continuada e innecesaria de movimientos o gestos complejos y organizados.",
    "La persona repite movimientos sin finalidad clara.",
    "Se frota las manos, golpea dedos o mece el cuerpo de forma repetitiva.",
    [
      { term: "Tics", difference: "Los tics son repentinos e intermitentes; las estereotipias son más continuadas y organizadas." },
      { term: "Perseveración motora", difference: "La perseveración repite una acción solicitada o previa." }
    ]
  ),
  makeConcept(
    131,
    "Insomnio",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Pérdida del sueño o dificultad para dormir, ya sea inicial, tardía, media, mixta o total.",
    "La persona no logra dormir bien o no puede mantener el sueño.",
    "Le cuesta conciliar el sueño por ansiedad o despierta de madrugada en un cuadro depresivo.",
    [
      { term: "Hipersomnia", difference: "La hipersomnia es exceso de sueño." },
      { term: "Narcolepsia", difference: "La narcolepsia produce ataques anormales de sueño." }
    ],
    "Básica"
  ),
  makeConcept(
    132,
    "Hipersomnia",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Exceso de sueño con tendencia a dormir demasiado y mostrarse somnoliento.",
    "La persona duerme mucho más de lo habitual.",
    "Duerme más de ocho horas y aun así se mantiene somnolienta durante el día.",
    [
      { term: "Somnolencia", difference: "La somnolencia es estado de conciencia disminuido; la hipersomnia es patrón de sueño excesivo." },
      { term: "Insomnio", difference: "El insomnio es dificultad o falta de sueño." }
    ]
  ),
  makeConcept(
    133,
    "Narcolepsia",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Síndrome con ataques anormales de sueño, somnolencia diurna excesiva, cataplejía, parálisis del sueño o alucinaciones hipnagógicas.",
    "La persona tiene ataques bruscos de sueño durante el día.",
    "Se queda dormida de forma repentina en situaciones activas y puede presentar cataplejía.",
    [
      { term: "Hipersomnia", difference: "La hipersomnia es exceso de sueño; la narcolepsia incluye ataques de sueño y síntomas REM." },
      { term: "Cataplejía", difference: "La cataplejía es uno de los síntomas posibles de narcolepsia." }
    ],
    "Alta"
  ),
  makeConcept(
    134,
    "Parálisis del sueño",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Estado transitorio en el que la persona siente que no puede moverse, hablar o respirar con naturalidad al dormir o despertar.",
    "Está consciente, pero no puede moverse por unos minutos.",
    "Al despertar siente que no puede mover el cuerpo ni hablar, sin desencadenante emocional.",
    [
      { term: "Cataplejía", difference: "La cataplejía ocurre en vigilia por emoción intensa; la parálisis del sueño aparece alrededor del sueño." },
      { term: "Estupor", difference: "En estupor hay alteración del nivel de conciencia." }
    ],
    "Alta"
  ),
  makeConcept(
    135,
    "Apnea del sueño",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Interrupción repetitiva del flujo aéreo nasobucal durante el sueño por más de diez segundos.",
    "La respiración se detiene repetidamente mientras duerme.",
    "Ronca, hace pausas respiratorias y despierta bruscamente durante la noche.",
    [
      { term: "Insomnio", difference: "El insomnio es dificultad para dormir; la apnea altera respiración durante el sueño." },
      { term: "Narcolepsia", difference: "La narcolepsia produce ataques de sueño diurnos." }
    ]
  ),
  makeConcept(
    136,
    "Pesadillas",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Episodios del sueño REM con contenido terrorífico, angustiante o amenazante que puede despertar al individuo.",
    "Sueños muy angustiosos que se recuerdan al despertar.",
    "Despierta ansioso tras soñar una amenaza y reconoce que era un sueño.",
    [
      { term: "Terrores nocturnos", difference: "En terrores nocturnos suele haber grito, confusión y poco recuerdo del contenido." },
      { term: "Estado oniroide", difference: "El estado oniroide ocurre en conciencia alterada, no solo durante sueño REM." }
    ],
    "Básica"
  ),
  makeConcept(
    137,
    "Terrores nocturnos",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Episodios en fases profundas del sueño con grito angustiante, despertar confuso y escaso recuerdo.",
    "La persona se despierta muy asustada, pero no recuerda claramente un sueño.",
    "Se levanta con angustia intensa en mitad de la noche y no sabe qué ocurrió.",
    [
      { term: "Pesadillas", difference: "Las pesadillas suelen recordarse y ocurren en REM." },
      { term: "Sonambulismo", difference: "El sonambulismo implica conducta motora durante sueño de ondas lentas." }
    ]
  ),
  makeConcept(
    138,
    "Sonambulismo",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Secuencia de movimientos corporales durante sueño de ondas lentas, con escasa respuesta a estímulos ambientales.",
    "La persona camina o hace actividades mientras duerme.",
    "Se levanta, camina por la casa y no responde claramente al entorno.",
    [
      { term: "Terrores nocturnos", difference: "Los terrores destacan angustia intensa y grito; el sonambulismo destaca actividad motora." },
      { term: "Automatismo", difference: "El automatismo ocurre en ausencia de conciencia, no necesariamente durante sueño." }
    ]
  ),
  makeConcept(
    139,
    "Anorexia",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "Pérdida total o parcial del apetito o deseo de ingerir alimentos.",
    "La persona no tiene ganas de comer o restringe mucho la comida.",
    "Evita alimentos calóricos y pierde peso progresivamente.",
    [
      { term: "Bulimia", difference: "La bulimia implica episodios de ingesta excesiva con conductas compensatorias." },
      { term: "Pica", difference: "La pica es ingestión de sustancias no nutritivas." }
    ]
  ),
  makeConcept(
    140,
    "Bulimia",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "Episodios recurrentes de ingesta excesiva de alimentos seguidos de conductas compensatorias.",
    "La persona come en exceso por episodios y luego intenta compensarlo.",
    "Tras atracones recurre a vómitos, ayunos o ejercicio para evitar subir de peso.",
    [
      { term: "Anorexia", difference: "La anorexia se centra en restricción y pérdida de apetito o ingesta." },
      { term: "Hiperfagia", difference: "La hiperfagia aumenta ingesta sin implicar necesariamente compensación." }
    ]
  ),
  makeConcept(
    141,
    "Pica",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "Hábito de ingerir sustancias inorgánicas o no apropiadas como tierra, cal, arena o plastilina.",
    "La persona come cosas que no son alimentos.",
    "Ingiere tierra o tiza de forma repetida fuera de una práctica cultural aceptada.",
    [
      { term: "Coprofagia", difference: "La coprofagia se refiere a ingesta de heces u otras sustancias orgánicas inapropiadas." },
      { term: "Rumiación alimentaria", difference: "La rumiación alimentaria regurgita y remastica comida." }
    ],
    "Alta"
  ),
  makeConcept(
    142,
    "Disforia de género",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Malestar profundo por incongruencia entre sexo biológico asignado e identificación de género persistente.",
    "La persona sufre por la discordancia entre su sexo asignado y su identidad.",
    "Expresa rechazo intenso a características sexuales propias y deseo persistente de pertenecer al otro sexo.",
    [
      { term: "Disfunción sexual", difference: "La disfunción sexual afecta fases de la respuesta sexual." },
      { term: "Aversión al sexo", difference: "La aversión al sexo es asco, temor o ansiedad ante actividad sexual." }
    ],
    "Alta"
  ),
  makeConcept(
    143,
    "Anafrodisia",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Pérdida del deseo sexual.",
    "La libido desaparece o baja de forma marcada.",
    "Refiere ausencia persistente de interés sexual y de fantasías.",
    [
      { term: "Hipersexualidad", difference: "La hipersexualidad aumenta libido y actividad sexual." },
      { term: "Aversión al sexo", difference: "La aversión implica asco, temor o ansiedad ante la actividad sexual." }
    ]
  ),
  makeConcept(
    144,
    "Hipersexualidad",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Aumento de la libido y de la actividad sexual, con estimulación sexual reiterada.",
    "La actividad y deseo sexual aumentan de forma marcada.",
    "Busca estímulos sexuales repetidamente y dedica gran parte del día a conductas sexuales.",
    [
      { term: "Anafrodisia", difference: "La anafrodisia es pérdida del deseo sexual." },
      { term: "Manía", difference: "La manía puede incluir hipererotismo, pero es un síndrome afectivo completo." }
    ],
    "Alta"
  ),
  makeConcept(
    145,
    "Dispareunia",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Dolor en zona genital u otra durante la respuesta sexual, descartando enfermedad médica como causa principal.",
    "La actividad sexual se acompaña de dolor.",
    "Refiere dolor persistente durante la penetración o excitación sexual.",
    [
      { term: "Vaginismo", difference: "El vaginismo implica espasmos involuntarios del tercio externo vaginal." },
      { term: "Trastorno eréctil", difference: "El trastorno eréctil afecta mantenimiento de la erección." }
    ],
    "Alta"
  )
);

concepts.push(
  makeConcept(
    146,
    "Síndrome de obnubilación",
    "sindromes",
    "Síndromes cerebrales orgánicos agudos",
    "Síndrome",
    "Cuadro orgánico agudo con vigilia baja, atención distráctil, memoria disminuida, orientación grosera y necesidad de estímulos fuertes para comunicarse.",
    "El paciente está tranquilo, poco expresivo y necesita estímulos intensos para responder.",
    "Enfermo hipomímico, descuidado si no se le auxilia, con pensamiento lento, indiferencia, abulia e hipoquinesia.",
    [
      { term: "Síndrome de delirium", difference: "En delirium predominan agitación, temblores, alucinaciones visuales o táctiles y orientación fluctuante." },
      { term: "Síndrome de confusión mental", difference: "En confusión mental la vigilia está casi abolida, hay comprensión abolida y agitación limitada a la cama." }
    ],
    "Alta"
  ),
  makeConcept(
    147,
    "Síndrome oniroide",
    "sindromes",
    "Síndromes cerebrales orgánicos agudos",
    "Síndrome",
    "Cuadro orgánico agudo con vigilia baja, atención centrada en vivencias alucinatorias y alucinaciones visuales escénicas no angustiosas.",
    "El paciente parece vivir una escena de sueño y se mantiene contemplativo.",
    "Paciente hipomímico e inmóvil, con vivencias visuales escénicas, complacencia beatífica y orientación autopsíquica conservada.",
    [
      { term: "Síndrome de delirium", difference: "El delirium suele ser agitado, ansioso o terrorífico y con orientación fluctuante." },
      { term: "Síndrome de estado crepuscular", difference: "El estado crepuscular deja amnesia total y conducta agresiva o fugitiva ligada a alucinaciones." }
    ],
    "Alta"
  ),
  makeConcept(
    148,
    "Síndrome de estado crepuscular",
    "sindromes",
    "Síndromes cerebrales orgánicos agudos",
    "Síndrome",
    "Cuadro orgánico agudo con vigilia muy baja, desorientación total sin fluctuaciones, alucinaciones terroríficas y amnesia total posterior.",
    "El paciente entra en un estado estrechado, agresivo o fugitivo, y luego no recuerda lo ocurrido.",
    "Enfermo sudoroso y agresivo, con pánico, alucinaciones visuales terroríficas y lenguaje prácticamente nulo.",
    [
      { term: "Síndrome de delirium", difference: "En delirium suele quedar evocación residual fragmentaria y la orientación fluctúa." },
      { term: "Síndrome oniroide", difference: "El oniroide es contemplativo y las escenas no suelen ser angustiosas." }
    ],
    "Alta"
  ),
  makeConcept(
    149,
    "Síndrome de confusión mental",
    "sindromes",
    "Síndromes cerebrales orgánicos agudos",
    "Síndrome",
    "Cuadro orgánico agudo con vigilia casi abolida, memoria y comprensión abolidas, desorientación total e incoherencia.",
    "La conciencia está muy tomada y el paciente apenas comprende o se orienta.",
    "Paciente con perplejidad, movimientos carfólicos como enrollar la sábana, ilusiones visuales e incoherencia.",
    [
      { term: "Síndrome de obnubilación", difference: "La obnubilación es menos profunda y permite comunicación con estímulos fuertes." },
      { term: "Síndrome de delirium", difference: "El delirium tiene riqueza alucinatoria y agitación amplia defensiva." }
    ],
    "Alta"
  ),
  makeConcept(
    150,
    "Síndrome oligofrénico",
    "sindromes",
    "Síndromes cerebrales orgánicos crónicos",
    "Síndrome",
    "Cuadro orgánico crónico con capacidades intelectuales muy disminuidas, pensamiento concreto y funciones de relación comparables a las de un niño.",
    "Predomina limitación intelectual y adaptación creadora reducida.",
    "Paciente distraído y descuidado, con respuestas infantiles, sugestibilidad, dependencia e intolerancia a la frustración.",
    [
      { term: "Síndrome demencial", difference: "El demencial implica deterioro adquirido con memoria muy tomada y desorganización progresiva." },
      { term: "Síndrome apatoabúlico", difference: "El apatoabúlico destaca indiferencia, abulia e hipoquinesia." }
    ],
    "Alta"
  ),
  makeConcept(
    151,
    "Síndrome demencial",
    "sindromes",
    "Síndromes cerebrales orgánicos crónicos",
    "Síndrome",
    "Cuadro orgánico crónico con vigilia normal, atención distráctil, memoria muy afectada, capacidades intelectuales muy disminuidas y alteración de hábitos.",
    "Hay deterioro global, especialmente de memoria, intelecto, hábitos y personalidad.",
    "Paciente descuidado, comunicación limitada, pensamiento concreto, perseverante o prolijo, con indiferencia o labilidad.",
    [
      { term: "Síndrome amnésico confabulatorio", difference: "En el amnésico confabulatorio predomina memoria reciente tomada con confabulaciones y orientación relativamente conservada." },
      { term: "Síndrome oligofrénico", difference: "El oligofrénico corresponde a limitación intelectual del desarrollo, no deterioro adquirido." }
    ],
    "Alta"
  ),
  makeConcept(
    152,
    "Síndrome apatoabúlico",
    "sindromes",
    "Síndromes cerebrales orgánicos crónicos",
    "Síndrome",
    "Cuadro orgánico crónico con indiferencia, abulia, hipoquinesia, hipomnesia y afectación marcada de funciones de relación, hábitos y necesidades.",
    "Predominan apatía, falta de iniciativa y disminución de la actividad.",
    "Paciente con facies indiferente, curso asociado lentificado, toma de hábitos y necesidades.",
    [
      { term: "Síndrome depresivo", difference: "El depresivo tiene hipotimia, ideas de minusvalía y tristeza; el apatoabúlico centra apatía y abulia orgánicas." },
      { term: "Síndrome demencial", difference: "El demencial compromete más globalmente las capacidades intelectuales y memoria." }
    ],
    "Alta"
  ),
  makeConcept(
    153,
    "Síndrome paranoide",
    "sindromes",
    "Síndromes delirantes",
    "Síndrome",
    "Cuadro delirante con actitud recelosa, atención hipervigilante, alucinaciones auditivas verbales e ideas delirantes de daño, persecución o referencia.",
    "Hay delirio con alucinaciones auditivas y afectación global de las funciones de relación.",
    "Paciente descuidado y receloso que oye voces, cree que lo persiguen y actúa de acuerdo con el delirio.",
    [
      { term: "Síndrome paranoico", difference: "El paranoico conserva comunicación y presenta delirio único lógico sin trastornos sensoperceptivos importantes." },
      { term: "Síndrome esquizofrénico", difference: "El esquizofrénico destaca desorganización global y disociación ideoafectivoconativa." }
    ],
    "Alta"
  ),
  makeConcept(
    154,
    "Síndrome de automatismo psíquico",
    "sindromes",
    "Síndromes delirantes",
    "Síndrome",
    "Cuadro con pseudoalucinaciones auditivas, trastorno del esquema corporal, despersonalización, desrealización y delirios de influencia o robo del pensamiento.",
    "La persona vive sus pensamientos o cuerpo como influidos, robados o manejados desde fuera.",
    "Paciente con atención dirigida hacia adentro, pseudoalucinaciones, pensamiento autista, bloqueo y delirio de influencia.",
    [
      { term: "Síndrome paranoide", difference: "El paranoide se organiza alrededor de persecución, daño o referencia con alucinaciones auditivas." },
      { term: "Síndrome esquizofrénico", difference: "El esquizofrénico es más amplio y se define por desorganización de funciones psíquicas." }
    ],
    "Alta"
  ),
  makeConcept(
    155,
    "Síndrome estuporoso",
    "sindromes",
    "Síndromes discinéticos",
    "Síndrome",
    "Síndrome discinético caracterizado por inmovilidad, mutismo, abulia, acinesia y alteración total de necesidades y hábitos, con claridad de conciencia variable.",
    "El paciente queda inmóvil y mudo, sin estar necesariamente en coma.",
    "Paciente descuidado, inmóvil y mutista, con facies de pánico, tristeza, indiferencia o perplejidad según la forma clínica.",
    [
      { term: "Coma", difference: "En coma la claridad de conciencia está abolida; en estuporoso puede mantenerse en grado variable." },
      { term: "Síndrome hipercinético", difference: "El hipercinético es el polo opuesto: actividad motora excesiva y agitación." }
    ],
    "Alta"
  ),
  makeConcept(
    156,
    "Síndrome hipercinético",
    "sindromes",
    "Síndromes discinéticos",
    "Síndrome",
    "Síndrome discinético con aumento de actividad motora voluntaria o involuntaria y afectación notable de la adaptación al medio.",
    "El paciente está extremadamente inquieto y puede llegar a agitación psicomotora.",
    "Puede presentarse como agitación catatónica, excitación maníaca, excitación histérica o furor epiléptico.",
    [
      { term: "Síndrome estuporoso", difference: "El estuporoso se define por inmovilidad y mutismo." },
      { term: "Síndrome maníaco", difference: "La excitación maníaca es una modalidad del hipercinético, pero el síndrome maníaco es afectivo." }
    ],
    "Alta"
  ),
  makeConcept(
    157,
    "Síndrome hipocondríaco",
    "sindromes",
    "Otros síndromes psicopatológicos",
    "Síndrome",
    "Cuadro centrado en preocupación excesiva por la salud, temor constante a la muerte y autoobservación continua de funciones corporales.",
    "La persona interpreta el cuerpo desde el miedo a una enfermedad grave o mortal.",
    "Consulta repetidamente al médico sin justificación objetiva, usando terminología médica y centrando la atención en funciones corporales.",
    [
      { term: "Idea hipocondríaca", difference: "La idea hipocondríaca es un contenido; el síndrome incluye conducta, afectividad y atención corporal." },
      { term: "Síndrome ansioso", difference: "El ansioso se centra en ansiedad general y síntomas vegetativos; el hipocondríaco en temor a enfermedad." }
    ],
    "Alta"
  ),
  makeConcept(
    158,
    "Síndrome asténico",
    "sindromes",
    "Otros síndromes psicopatológicos",
    "Síndrome",
    "Cuadro caracterizado por agotamiento fácil, cansancio, irritabilidad, disforia, intolerancia a ruidos y dificultades de atención y memoria.",
    "La persona se agota rápido y se irrita con facilidad.",
    "Paciente con aspecto cansado, hipomnesia de fijación y evocación, hiperestesia, cenestopatías y sueño fásico.",
    [
      { term: "Síndrome depresivo", difference: "El depresivo se centra en hipotimia, minusvalía y aislamiento; el asténico en cansancio e irritabilidad." },
      { term: "Síndrome ansioso", difference: "El ansioso destaca temor, hiperactividad vegetativa e insomnio vespertino." }
    ],
    "Media"
  ),
  makeConcept(
    159,
    "Síndrome psicopático",
    "sindromes",
    "Otros síndromes psicopatológicos",
    "Síndrome",
    "Cuadro de patrones inadaptativos de comportamiento, control de impulsos, seguridad personal, autovaloración, exigencias, intereses y satisfacción de necesidades.",
    "Predominan formas inadaptativas y persistentes de relación consigo mismo, con otros y con las cosas.",
    "Persona sin alteraciones de síntesis o intelectuales importantes, pero con impulsividad, inseguridad, labilidad y dificultades sexuales o sociales.",
    [
      { term: "Síndrome esquizofrénico", difference: "El esquizofrénico implica desorganización psíquica, alucinaciones y disociación ideoafectiva." },
      { term: "Síndrome afectivo ansioso", difference: "El ansioso es un cuadro afectivo con ansiedad y manifestaciones vegetativas." }
    ],
    "Alta"
  )
);

// ─── Conceptos añadidos desde revisión del PDF de semiología ───────────────
concepts.push(
  // ── Forma del pensamiento ────────────────────────────────────────────────
  makeConcept(
    160,
    "Vacío mental",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El paciente manifiesta que no piensa en nada, que tiene la mente en blanco.",
    "La persona siente que su mente está vacía, sin pensamientos.",
    "Dice: no pienso en nada, mi mente está completamente en blanco.",
    [
      { term: "Bloqueo del pensamiento", difference: "El bloqueo interrumpe una idea en curso; el vacío mental es la sensación de ausencia total de pensamiento." },
      { term: "Bradipsiquia", difference: "La bradipsiquia enlentece el pensamiento, pero hay pensamiento; el vacío mental implica ausencia subjetiva." }
    ]
  ),
  makeConcept(
    161,
    "Verborrea",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El individuo habla por horas o días intentando expresar ideas, pero sin lograrlo; lo que dice carece de significado.",
    "La persona habla muchísimo, sola o con otros, sin poder transmitir ideas con sentido.",
    "Monologa durante horas con tono variable, pero el contenido resulta incomprensible para el interlocutor.",
    [
      { term: "Alogia", difference: "La alogia reduce la cantidad de habla; la verborrea la aumenta sin aportar contenido." },
      { term: "Logorrea", difference: "La logorrea es habla excesiva y rápida; la verborrea destaca la pérdida de sentido comunicativo." }
    ]
  ),
  makeConcept(
    162,
    "Aliteración",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El paciente repite una o muchas letras en una sola frase de manera innecesaria.",
    "Dentro de una frase aparecen repeticiones involuntarias de sonidos o letras.",
    "Dice frases donde una misma letra domina de forma anómala y sin propósito.",
    [
      { term: "Perseveración", difference: "La perseveración repite ideas, palabras o frases; la aliteración repite sonidos o letras." },
      { term: "Palilalia", difference: "La palilalia repite palabras propias con incremento de frecuencia." }
    ]
  ),
  makeConcept(
    163,
    "Habla distraída",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "La persona se detiene en medio de una frase o idea y cambia de tema en respuesta a estímulos inmediatos del entorno.",
    "El hilo del discurso se rompe por cualquier estímulo del ambiente.",
    "Se para a mitad de una explicación porque algo en la mesa del clínico captura su atención.",
    [
      { term: "Distractibilidad", difference: "La distractibilidad afecta la atención; el habla distraída describe la ruptura del discurso por estímulos externos." },
      { term: "Pérdida de meta", difference: "La pérdida de meta se aleja del tema por divagación interna; el habla distraída lo hace por estímulos externos." }
    ]
  ),
  makeConcept(
    164,
    "Autorreferencia",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El paciente lleva constantemente el discurso hacia sí mismo de forma inadecuada, aunque el tema sea neutro.",
    "Todo lo que se habla termina relacionándose con la propia persona.",
    "Ante la pregunta de qué día es hoy responde: Martes. Justamente ese es un gran problema para mí.",
    [
      { term: "Delirio de referencia", difference: "El delirio de referencia implica sentirse amenazado o aludido; la autorreferencia es llevar el discurso a uno mismo sin componente amenazante." },
      { term: "Egocentrismo", difference: "La autorreferencia es un trastorno formal del pensamiento, no solo una característica de personalidad." }
    ]
  ),
  makeConcept(
    165,
    "Pararrespuesta",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Ante una pregunta concreta, el paciente proporciona una respuesta aproximada que indica comprensión pero no es correcta ni exacta.",
    "Entiende la pregunta, pero la respuesta se desvía o solo la roza.",
    "Ante ¿cuántos años tiene? responde: con mi madre y mis dos hijas sumamos 152.",
    [
      { term: "Tangencialidad", difference: "La tangencialidad responde de lado; la pararrespuesta muestra comprensión pero da una respuesta no exacta." },
      { term: "Confabulación", difference: "La confabulación rellena lagunas de memoria; la pararrespuesta distorsiona la respuesta a una pregunta concreta." }
    ]
  ),
  makeConcept(
    166,
    "Ilogicidad",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Patrón de habla en el que no se llega a conclusiones de manera lógica; fallo en las inferencias inductivas.",
    "La persona razona y habla, pero sus conclusiones no se derivan lógicamente de sus premisas.",
    "Encadena ideas, pero la conclusión final no tiene relación lógica con lo que afirmó antes.",
    [
      { term: "Incoherencia", difference: "La incoherencia rompe la conexión entre palabras; la ilogicidad falla en el razonamiento inferencial." },
      { term: "Pensamiento concreto", difference: "El pensamiento concreto falla en abstracción; la ilogicidad falla en inferencia." }
    ]
  ),
  // ── Contenido del pensamiento ────────────────────────────────────────────
  makeConcept(
    167,
    "Pensamientos automáticos negativos",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Autoafirmaciones negativas, autodepreciativas, breves y repetitivas que aparecen de forma repentina sin buscar soluciones.",
    "Son frases cortas y negativas sobre uno mismo que aparecen sin querer.",
    "No soy bueno. Por qué no puedo hacer nada bien. Mi vida es un desastre.",
    [
      { term: "Rumiación", difference: "La rumiación da vueltas al malestar y sus causas; los PAN son frases autodepreciativas breves y automáticas." },
      { term: "Idea obsesiva", difference: "La idea obsesiva es intrusa y egodistónica; los PAN pueden sentirse como parte del propio pensamiento." }
    ]
  ),
  makeConcept(
    168,
    "Obsesiones autógenas",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Ideas obsesivas con contenidos agresivos, sexuales, religiosos o inmorales que resultan muy desagradables y egodistónicas.",
    "Son pensamientos intrusivos de contenido muy molesto o inaceptable que se sienten como propios, pero repugnantes.",
    "Imágenes intrusivas de agredir a alguien querido, aunque no exista deseo real de hacerlo.",
    [
      { term: "Obsesiones reactivas", difference: "Las reactivas tienen contenido sobre contaminación, orden o errores y se perciben como más racionales." },
      { term: "Ideación autolítica", difference: "La ideación autolítica se centra en autolesión; las obsesiones autógenas se centran en contenidos agresivos, sexuales o inmorales." }
    ],
    "Alta"
  ),
  makeConcept(
    169,
    "Obsesiones reactivas",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Ideas obsesivas sobre contaminación, errores, simetría u orden, cuyos contenidos se perciben como racionales, pero sus consecuencias temidas generan comportamientos compulsivos.",
    "Son preocupaciones obsesivas sobre contaminar, cometer errores o no tener las cosas en orden.",
    "Miedo intenso a contaminarse al tocar superficies, que lleva a lavado repetido de manos.",
    [
      { term: "Obsesiones autógenas", difference: "Las autógenas tienen contenido inmoral, agresivo o sexual y se perciben como inaceptables." },
      { term: "Preocupación", difference: "La preocupación anticipa el futuro; las obsesiones reactivas se centran en rituales de neutralización." }
    ],
    "Alta"
  ),
  makeConcept(
    170,
    "Ideación autolítica",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Pensamientos sobre lesionarse físicamente o quitarse la vida, que fluctúan en persistencia y se asocian a estados afectivos negativos intensos.",
    "Son pensamientos sobre hacerse daño o morir.",
    "Pensamientos repetidos de que sería mejor no estar aquí, con o sin plan específico.",
    [
      { term: "Delirio nihilista", difference: "El nihilista es una creencia fija de estar muerto o no existir; la ideación autolítica son pensamientos sobre morir." },
      { term: "Idea fóbica", difference: "La idea fóbica organiza un temor; la ideación autolítica expresa deseo de autolesión o muerte." }
    ],
    "Alta"
  ),
  makeConcept(
    171,
    "Creencia disfuncional",
    "pensamiento",
    "Pensamiento repetitivo negativo",
    "Semiología",
    "Supuestos, juicios y valoraciones que se asumen como verdaderos y sesgan el procesamiento de información en sentido negativo e improductivo.",
    "Son reglas internas que la persona da por ciertas y que distorsionan cómo ve las situaciones.",
    "Creer que si comete un error será rechazada por todos, lo que la lleva a evitar cualquier riesgo.",
    [
      { term: "Ideas deliroides", difference: "Las deliroides se pueden reconsiderar con razonamiento; las creencias disfuncionales persisten como esquemas cognitivos." },
      { term: "Idea sobrevalorada", difference: "La sobrevalorada magnifica un hecho; la creencia disfuncional es un supuesto general que filtra toda la información." }
    ],
    "Alta"
  ),
  // ── Percepción / Memoria ──────────────────────────────────────────────────
  makeConcept(
    172,
    "Déjà vu",
    "memoria",
    "Memoria",
    "Semiología",
    "Falso reconocimiento positivo: sensación de haber vivido o experimentado antes algo que ocurre por primera vez.",
    "La persona siente que algo nuevo ya lo vivió antes, aunque sabe que no.",
    "Al entrar a un lugar por primera vez siente con certeza que ya ha estado ahí.",
    [
      { term: "Jamais vu", difference: "El déjà vu reconoce falsamente algo nuevo como conocido; el jamais vu no reconoce algo familiar." },
      { term: "Paramnesia", difference: "El déjà vu es un tipo específico de paramnesia de reconocimiento." }
    ]
  ),
  makeConcept(
    173,
    "Jamais vu",
    "memoria",
    "Memoria",
    "Semiología",
    "Falso reconocimiento negativo: sensación de extrañeza ante algo o alguien conocido, como si fuera completamente nuevo.",
    "La persona no reconoce algo que debería resultarle familiar.",
    "Ve a un familiar cercano y lo percibe como un extraño que no ha visto antes.",
    [
      { term: "Déjà vu", difference: "El jamais vu percibe lo conocido como desconocido; el déjà vu percibe lo desconocido como conocido." },
      { term: "Desrealización", difference: "En la desrealización el entorno parece irreal globalmente; el jamais vu es fallo de reconocimiento específico." }
    ]
  ),
  makeConcept(
    174,
    "Imágenes mnémicas",
    "percepcion",
    "Percepción",
    "Semiología",
    "Imágenes que surgen del recuerdo, menos intensas y vividas que las perceptivas, y reconocidas como internas.",
    "Son imágenes del recuerdo que la persona sabe que vienen de su memoria.",
    "Al recordar a un ser querido puede evocar una imagen mental de su rostro.",
    [
      { term: "Imágenes alucinoides", difference: "Las alucinoides son más autónomas y pueden proyectarse al exterior; las mnémicas provienen claramente del recuerdo." },
      { term: "Ecmnesia", difference: "La ecmnesia revive el recuerdo como si fuera presente; la imagen mnémica es recordada con conciencia de pasado." }
    ],
    "Básica"
  ),
  makeConcept(
    175,
    "Imágenes consecutivas o postimágenes",
    "percepcion",
    "Percepción",
    "Semiología",
    "Imágenes que persisten brevemente tras retirar el estímulo que las provocó, como negativo fotográfico.",
    "Después de mirar algo intenso, la imagen permanece unos instantes aunque ya no esté.",
    "Tras mirar una luz intensa sigue viendo su silueta en el campo visual durante unos segundos.",
    [
      { term: "Imágenes parásitas", difference: "Las parásitas se instalan de forma persistente e intrusiva; las consecutivas siguen a un estímulo real y desaparecen rápido." },
      { term: "Alucinación", difference: "La alucinación no depende de un estímulo previo real." }
    ],
    "Básica"
  ),
  makeConcept(
    176,
    "Imágenes parásitas",
    "percepcion",
    "Percepción",
    "Semiología",
    "Imágenes que aparecen de forma intrusiva y persistente en el campo perceptivo sin estímulo actual que las justifique.",
    "Son imágenes no deseadas que reaparecen solas en la mente.",
    "Una imagen desagradable vista semanas antes vuelve a aparecer espontáneamente con nitidez.",
    [
      { term: "Imágenes consecutivas", difference: "Las consecutivas siguen a un estímulo real reciente; las parásitas son intrusivas y sin estímulo actual." },
      { term: "Alucinación", difference: "En la alucinación la percepción tiene fuerza de realidad; la imagen parásita se reconoce como interna." }
    ],
    "Alta"
  ),
  makeConcept(
    177,
    "Transformación",
    "percepcion",
    "Percepción",
    "Semiología",
    "Vivencia de percibirse como otra persona o de haber cambiado radicalmente de identidad.",
    "La persona siente que se ha convertido en otra persona.",
    "Refiere que ya no es ella misma, que se ha transformado en otra persona completamente distinta.",
    [
      { term: "Despersonalización", difference: "La despersonalización es extrañeza del yo propio; la transformación implica sentirse como otro." },
      { term: "Desorientación autopsíquica", difference: "La desorientación autopsíquica falla al identificarse; la transformación cree ser otra persona." }
    ],
    "Alta"
  ),
  // ── Conducta motora / Voluntad ───────────────────────────────────────────
  makeConcept(
    178,
    "Hiperbulia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Incremento en la capacidad de decisión voluntaria junto con mayor actividad psicomotora, siempre que no pierda coordinación.",
    "La persona tiene mucha energía y voluntad para actuar.",
    "En un episodio hipomaníaco inicia muchos proyectos con fuerte determinación.",
    [
      { term: "Hipobulia", difference: "La hipobulia es pérdida parcial de la voluntad; la hiperbulia es su incremento." },
      { term: "Hiperquinesia", difference: "La hiperquinesia describe el aumento de actividad motora; la hiperbulia hace referencia a la voluntad aumentada." }
    ]
  ),
  makeConcept(
    179,
    "Hipobulia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Pérdida parcial de la voluntad con pocos deseos de hacer las cosas, manifestada por inactividad psicomotora en menor grado que la abulia.",
    "La persona quiere hacer cosas pero le cuesta mucho; puede hacerlas con lentitud o pereza.",
    "Tarda mucho en empezar tareas cotidianas, aunque finalmente las realiza con esfuerzo.",
    [
      { term: "Abulia", difference: "La abulia implica ausencia o marcada disminución de voluntad; la hipobulia es una reducción parcial." },
      { term: "Hiperbulia", difference: "La hiperbulia aumenta la voluntad de actuar." }
    ]
  ),
  makeConcept(
    180,
    "Interceptación cinética",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Interrupción brusca y sin motivo de un movimiento en fase de ejecución, sin completar la meta, con reinicio posterior.",
    "El movimiento se corta a mitad como si alguien le diera pausa, y luego continúa.",
    "A mitad de coger un objeto la mano se detiene sin razón y luego retoma el movimiento.",
    [
      { term: "Obstrucción motora", difference: "La obstrucción es el bloqueo que impide iniciar o mantener el movimiento; la interceptación lo corta en ejecución." },
      { term: "Bloqueo del pensamiento", difference: "El bloqueo corta el pensamiento; la interceptación cinética corta el movimiento." }
    ],
    "Alta"
  ),
  makeConcept(
    181,
    "Apraxia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Dificultad para llevar a cabo de forma exitosa actividades psicomotoras propositivas previamente aprendidas, pese a comprender la tarea y tener capacidad física.",
    "La persona sabe lo que quiere hacer y puede moverse, pero no puede ejecutar la secuencia aprendida.",
    "Dice: no sé cómo se hace. No puedo abotonarme la camisa, aunque lo ha hecho toda la vida.",
    [
      { term: "Parálisis", difference: "La parálisis impide el movimiento por daño físico o funcional; la apraxia preserva la capacidad motora pero falla la secuencia." },
      { term: "Acinesia", difference: "La acinesia dificulta iniciar el movimiento; la apraxia falla en la ejecución coordinada de secuencias aprendidas." }
    ],
    "Alta"
  ),
  makeConcept(
    182,
    "Hipermimia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Expresión exagerada de la mímica facial o de los gestos al hablar, con implicación afectiva marcada.",
    "Los gestos faciales son excesivos o muy dramáticos.",
    "Gesticulación facial muy intensa y expresiva al hablar, fuera de proporción con el contexto.",
    [
      { term: "Hipomimia", difference: "La hipomimia reduce o elimina la expresión facial; la hipermimia la exagera." },
      { term: "Dismimia", difference: "La dismimia es discordancia entre expresión facial y contenido; la hipermimia es exageración de la expresión." }
    ]
  ),
  makeConcept(
    183,
    "Hipomimia o amimia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Disminución o ausencia de la expresión mímica, tanto en gestos como en movimientos faciales.",
    "El rostro se mantiene fijo, con poca o ninguna expresión.",
    "Durante la entrevista la mirada permanece fija y sin cambios, incluso ante contenidos emocionales.",
    [
      { term: "Hipermimia", difference: "La hipermimia exagera la expresión; la hipomimia la reduce o elimina." },
      { term: "Aplanamiento afectivo", difference: "El aplanamiento se refiere a la respuesta emocional global; la hipomimia es la expresión facial reducida." }
    ]
  ),
  makeConcept(
    184,
    "Dismimia o paramimia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Discordancia entre la expresión facial del paciente y los contenidos afectivos o verbales.",
    "Lo que el rostro expresa no coincide con lo que dice o siente.",
    "Relata una situación trágica con una sonrisa o expresión inapropiada.",
    [
      { term: "Disociación ideoafectiva", difference: "La disociación ideoafectiva es incongruencia de afecto e idea; la dismimia es discordancia específica de la expresión facial." },
      { term: "Moria", difference: "La moria es alegría insulsa; la dismimia es cualquier discordancia entre expresión y contenido." }
    ],
    "Alta"
  ),
  // ── Lenguaje y habla ─────────────────────────────────────────────────────
  makeConcept(
    185,
    "Agrafia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Pérdida de la capacidad ya adquirida para el lenguaje escrito.",
    "La persona no puede escribir aunque antes sabía hacerlo.",
    "Tras una lesión cerebral no logra escribir palabras, aunque comprende el lenguaje oral.",
    [
      { term: "Alexia", difference: "La alexia afecta la lectura; la agrafia afecta la escritura." },
      { term: "Afasia", difference: "La afasia es pérdida global del lenguaje; la agrafia puede ser un componente específico." }
    ],
    "Alta"
  ),
  makeConcept(
    186,
    "Alexia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Pérdida de la capacidad ya adquirida para la lectura.",
    "La persona no puede leer aunque antes sabía hacerlo.",
    "Tras daño cerebral no reconoce letras ni puede leer palabras.",
    [
      { term: "Agrafia", difference: "La agrafia afecta escritura; la alexia afecta lectura." },
      { term: "Anomia", difference: "La anomia afecta la denominación oral; la alexia afecta el reconocimiento escrito." }
    ],
    "Alta"
  ),
  makeConcept(
    187,
    "Disfonía",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Trastorno de la voz que abarca alteraciones cualitativas y cuantitativas, de origen orgánico o funcional.",
    "La voz cambia en calidad o cantidad.",
    "Voz ronca, apagada o con cambios de tono que no corresponden al habla normal.",
    [
      { term: "Disartria", difference: "La disartria afecta la articulación de fonemas por trastorno neuromuscular; la disfonía afecta la voz." },
      { term: "Aprosodia", difference: "La aprosodia afecta la entonación y musicalidad; la disfonía afecta la producción de la voz en sí." }
    ]
  ),
  makeConcept(
    188,
    "Coprolalia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Emisión involuntaria de palabras obscenas o insultantes que la persona no dirige con intención de molestar y de las que se avergüenza.",
    "La persona suelta palabras obscenas sin querer y sin poder evitarlo.",
    "Al responder un saludo emite involuntariamente una palabra soez y se muestra avergonzado.",
    [
      { term: "Ecolalia", difference: "La ecolalia repite lo que dice otro; la coprolalia emite involuntariamente palabras obscenas propias." },
      { term: "Tics", difference: "La coprolalia puede ser un tic vocal complejo dentro del espectro de los tics." }
    ],
    "Alta"
  ),
  // ── Funciones fisiológicas ────────────────────────────────────────────────
  makeConcept(
    189,
    "Insomnio inicial",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Dificultad para conciliar el sueño; la persona tarda en dormirse pero puede dormir bien una vez lo logra.",
    "Cuesta quedarse dormido al acostarse.",
    "Permanece despierto durante horas antes de lograr conciliar el sueño.",
    [
      { term: "Insomnio tardío", difference: "El tardío permite dormir la prima noche pero despierta de madrugada; el inicial impide conciliar." },
      { term: "Insomnio intermitente", difference: "El intermitente alterna sueño y vigilia durante la noche." }
    ],
    "Básica"
  ),
  makeConcept(
    190,
    "Insomnio tardío",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "El paciente duerme la prima noche, pero despierta de madrugada sin poder volver a dormirse.",
    "La persona se duerme bien pero despierta muy temprano y no puede continuar durmiendo.",
    "Duerme hasta las 3 o 4 de la mañana y permanece despierto el resto de la noche.",
    [
      { term: "Insomnio inicial", difference: "El inicial impide conciliar; el tardío permite conciliar pero despierta prematuramente." },
      { term: "Hipersomnia", difference: "La hipersomnia implica dormir en exceso." }
    ],
    "Básica"
  ),
  makeConcept(
    191,
    "Rumiación alimentaria",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "Regurgitar la comida, remasticarla y luego deglutirla.",
    "La persona regurgita comida ingerida, la mastica de nuevo y vuelve a tragarla.",
    "Devuelve sin esfuerzo alimento del estómago, lo mastica y lo vuelve a tragar.",
    [
      { term: "Rumiación cognitiva", difference: "La cognitiva es pensamiento perseverante sobre malestar; la alimentaria es conducta de regurgitación." },
      { term: "Bulimia", difference: "La bulimia implica atracones y compensaciones; la rumiación alimentaria es devolución y remasticación involuntaria." }
    ]
  ),
  makeConcept(
    192,
    "Malacia",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "Hábito de combinar sabores que comúnmente no combinan en la alimentación.",
    "La persona mezcla alimentos con sabores incompatibles.",
    "Come mango con arroz o frijoles con postres de manera habitual.",
    [
      { term: "Pica", difference: "La pica ingiere sustancias no alimenticias; la malacia combina alimentos de forma inusual pero comestibles." },
      { term: "Bulimia", difference: "La bulimia implica ingesta excesiva con compensación; la malacia es un patrón de combinación atípica." }
    ]
  )
);

const questions = [
  {
    id: 1,
    category: "Atención y concentración",
    question: "¿Qué alteración se caracteriza por una disminución de la capacidad atencional?",
    options: ["Aprosexia", "Hipoprosexia", "Hiperprosexia", "Paraprosexia"],
    answer: "Hipoprosexia",
    explanation: "La hipoprosexia implica una disminución de la capacidad para concentrarse y mantener la atención.",
    extra: "Aprosexia sería una ausencia casi total de atención."
  },
  {
    id: 2,
    category: "Percepción",
    question: "La ilusión ocurre cuando la persona interpreta mal un estímulo real presente.",
    options: ["Verdadero", "Falso"],
    answer: "Verdadero",
    explanation: "En la ilusión sí existe un estímulo real, pero se percibe o interpreta de manera equivocada.",
    extra: "La alucinación, en cambio, aparece sin estímulo real presente."
  },
  {
    id: 3,
    category: "Memoria",
    question: "¿Qué término describe una disminución de la memoria?",
    options: ["Hipomnesia", "Hipermnesia", "Ecmnesia", "Paramnesia"],
    answer: "Hipomnesia",
    explanation: "La hipomnesia es la disminución de la memoria, ya sea de fijación o evocación.",
    extra: "Hipermnesia significa aumento exagerado de los recuerdos."
  },
  {
    id: 4,
    category: "Conciencia",
    question: "¿Qué estado combina vivencias como de sueño, escenas visuales vividas y mezcla de realidad con fantasía?",
    options: ["Estado oniroide", "Coma", "Desorientación alopsíquica", "Apatía de la atención"],
    answer: "Estado oniroide",
    explanation: "El estado oniroide presenta vivencias escénicas, como de sueño, generalmente visuales y multimodales.",
    extra: "No suele tener la misma agitación defensiva del delirium."
  },
  {
    id: 5,
    category: "Síndromes afectivos",
    question: "¿En qué síndrome predominan hipertimia, fuga de ideas, hiperbulia e hiperquinesia?",
    options: ["Síndrome depresivo", "Síndrome maníaco", "Síndrome ansioso", "Síndrome asténico"],
    answer: "Síndrome maníaco",
    explanation: "El síndrome maníaco se caracteriza por estado de ánimo elevado o irritable, aceleración y aumento de actividad.",
    extra: "El depresivo muestra el patrón opuesto: lentitud, hipotimia e hipobulia."
  }
];

const cases = [
  {
    id: 1,
    title: "Caso clínico #01",
    category: "Síndromes cerebrales orgánicos agudos",
    text: "Paciente tranquilo, hipomímico y descuidado en su arreglo personal. Responde únicamente cuando se le estimula con insistencia y fuerza. Presenta pensamiento lento, indiferencia total al entorno, abulia e hipoquinesia. No hay alucinaciones ni agitación.",
    question: "¿Qué síndrome cerebral orgánico agudo se describe?",
    options: ["Síndrome de obnubilación", "Síndrome de delirium", "Síndrome oniroide", "Síndrome de confusión mental"],
    answer: "Síndrome de obnubilación",
    explanation: "El síndrome de obnubilación se caracteriza por vigilia baja, necesidad de estímulos fuertes para lograr comunicación, pensamiento lento e indiferencia, sin síntomas productivos (alucinaciones).",
    keys: ["Vigilia baja", "Necesidad de estímulos fuertes", "Pensamiento lento", "Indiferencia", "Abulia e hipoquinesia"]
  },
  {
    id: 2,
    title: "Caso clínico #02",
    category: "Síndromes cerebrales orgánicos agudos",
    text: "Paciente agitado, sudoroso y tembloroso. Momentáneamente logra ubicarse en espacio y persona, pero al instante vuelve a estar totalmente desorientado. Refiere ver animales repugnantes que se le acercan y siente que está en peligro de muerte. El pensamiento es disgregado y perseverante.",
    question: "¿Qué síndrome cerebral orgánico agudo se describe?",
    options: ["Síndrome de delirium", "Síndrome de obnubilación", "Síndrome oniroide", "Síndrome de estado crepuscular"],
    answer: "Síndrome de delirium",
    explanation: "El delirium se caracteriza por agitación, temblores, alucinaciones visuales y táctiles (animales, temas cósmicos), orientación fluctuante, y pensamiento disgregado. La orientación fluctuante —a veces ubicado, a veces no— lo diferencia del estado crepuscular.",
    keys: ["Agitación, sudoración y temblores", "Alucinaciones visuales y táctiles", "Orientación fluctuante", "Pensamiento disgregado", "Ansiedad y terror"]
  },
  {
    id: 3,
    title: "Caso clínico #03",
    category: "Síndromes cerebrales orgánicos agudos",
    text: "Paciente en actitud contemplativa e inmóvil, con expresión de beatífica complacencia. Parece absorto y hiperconcentrado en algo que solo él percibe. Al recuperarse refiere haber visto escenas visuales vívidas y no angustiosas. La orientación alopsíquica estaba tomada pero conservaba la autopsíquica.",
    question: "¿Qué síndrome cerebral orgánico agudo se describe?",
    options: ["Síndrome oniroide", "Síndrome de delirium", "Síndrome de estado crepuscular", "Síndrome de obnubilación"],
    answer: "Síndrome oniroide",
    explanation: "El síndrome oniroide se reconoce por la actitud contemplativa, las alucinaciones visuales escénicas de temática no angustiosa, la beatífica complacencia y la inmovilidad. A diferencia del delirium, no hay agitación ni alucinaciones terroríficas.",
    keys: ["Actitud contemplativa e inmóvil", "Alucinaciones visuales escénicas", "Temática no angustiosa", "Beatífica complacencia", "Orientación alopsíquica tomada"]
  },
  {
    id: 4,
    title: "Caso clínico #04",
    category: "Síndromes cerebrales orgánicos agudos",
    text: "Paciente agitado, sudoroso y agresivo con alucinaciones visuales terroríficas y conducta fugitiva. Presenta desorientación total y sin fluctuaciones. Al concluir el episodio, el paciente no recuerda absolutamente nada de lo ocurrido.",
    question: "¿Qué síndrome cerebral orgánico agudo se describe?",
    options: ["Síndrome de estado crepuscular", "Síndrome de delirium", "Síndrome oniroide", "Síndrome de confusión mental"],
    answer: "Síndrome de estado crepuscular",
    explanation: "La amnesia total posterior al episodio es el rasgo que diferencia al estado crepuscular del delirium y del oniroide, donde es posible evocar fragmentariamente lo ocurrido. Se añaden alucinaciones terroríficas, desorientación sin fluctuaciones y conducta agresiva o fugitiva.",
    keys: ["Amnesia total posterior", "Desorientación total sin fluctuaciones", "Alucinaciones visuales terroríficas", "Conducta agresiva y fugitiva", "Pánico"]
  },
  {
    id: 5,
    title: "Caso clínico #05",
    category: "Síndromes cerebrales orgánicos agudos",
    text: "Paciente con expresión de perplejidad, agitación limitada a la cama y movimientos repetitivos sin propósito visible, como si estuviese enrollando una sábana. La vigilia está casi abolida, la memoria y comprensión también abolidas. En momentos repite gestos propios de su trabajo habitual.",
    question: "¿Qué síndrome cerebral orgánico agudo se describe?",
    options: ["Síndrome de confusión mental", "Síndrome de obnubilación", "Síndrome oniroide", "Síndrome de estado crepuscular"],
    answer: "Síndrome de confusión mental",
    explanation: "Los movimientos carfólicos (como enrollar la sábana) son de alto valor diagnóstico en el síndrome de confusión mental. Se suman vigilia casi abolida, memoria y comprensión abolidas, perplejidad y a veces agitación con características profesionales.",
    keys: ["Movimientos carfólicos", "Expresión de perplejidad", "Vigilia casi abolida", "Memoria y comprensión abolidas", "Agitación con rasgos profesionales"]
  },
  {
    id: 6,
    title: "Caso clínico #06",
    category: "Síndromes cerebrales orgánicos crónicos",
    text: "Joven de 22 años con capacidades intelectuales muy disminuidas desde la infancia. Presenta pensamiento concreto, respuestas afectivas infantiles, intolerancia a las frustraciones e incapacidad para posponer satisfacciones. La vigilia es normal y no hay alteraciones sensoperceptivas. Su conducta es pueril e inconsistente.",
    question: "¿Qué síndrome cerebral orgánico crónico se describe?",
    options: ["Síndrome oligofrénico", "Síndrome demencial", "Síndrome apatoabúlico", "Síndrome amnésico confabulatorio"],
    answer: "Síndrome oligofrénico",
    explanation: "El síndrome oligofrénico se caracteriza por capacidades intelectuales muy disminuidas desde etapas tempranas, pensamiento concreto, respuestas afectivas infantiles (intolerancia a frustraciones, dependencia, sugestibilidad) y conducta pueril. La vigilia es normal y no hay alteraciones sensoperceptivas.",
    keys: ["Capacidades intelectuales muy disminuidas desde la infancia", "Pensamiento concreto", "Respuestas afectivas infantiles", "Conducta pueril", "Sin alteraciones sensoperceptivas"]
  },
  {
    id: 7,
    title: "Caso clínico #07",
    category: "Síndromes cerebrales orgánicos crónicos",
    text: "Paciente mayor con aspecto descuidado y comunicación progresivamente limitada. La memoria se fue afectando primero en la fijación y luego en la evocación. El pensamiento es concreto, perseverante y a veces delirante. Presenta explosividad afectiva y deterioro global de sus hábitos y necesidades.",
    question: "¿Qué síndrome cerebral orgánico crónico se describe?",
    options: ["Síndrome demencial", "Síndrome amnésico confabulatorio", "Síndrome oligofrénico", "Síndrome apatoabúlico"],
    answer: "Síndrome demencial",
    explanation: "El síndrome demencial implica un deterioro crónico con afectación progresiva de la memoria (primero fijación, luego evocación), pensamiento concreto y perseverante, explosividad o labilidad afectiva y deterioro global de hábitos y necesidades.",
    keys: ["Deterioro crónico progresivo", "Memoria muy tomada (fijación y evocación)", "Pensamiento concreto y perseverante", "Explosividad afectiva", "Deterioro de hábitos y necesidades"]
  },
  {
    id: 8,
    title: "Caso clínico #08",
    category: "Síndromes cerebrales orgánicos crónicos",
    text: "Paciente que no recuerda haber recibido la visita de su familiar hace unos minutos. Para llenar esos vacíos de memoria relata episodios que no ocurrieron, sin darse cuenta de que los está inventando. Sorpresivamente, mantiene la orientación bastante conservada a pesar de la grave afectación mnésica.",
    question: "¿Qué síndrome cerebral orgánico crónico se describe?",
    options: ["Síndrome amnésico confabulatorio", "Síndrome demencial", "Síndrome apatoabúlico", "Síndrome oligofrénico"],
    answer: "Síndrome amnésico confabulatorio",
    explanation: "La característica esencial es la grave afectación de la memoria de fijación reciente con confabulaciones para llenar los vacíos, junto a una orientación sorpresivamente conservada. El paciente no tiene conciencia de que inventa recuerdos.",
    keys: ["Memoria de fijación muy tomada", "Confabulaciones", "Orientación sorpresivamente conservada", "Sin conciencia del déficit", "Pensamiento concreto y perseverante"]
  },
  {
    id: 9,
    title: "Caso clínico #09",
    category: "Síndromes cerebrales orgánicos crónicos",
    text: "Paciente con facies de indiferencia total, abulia marcada e hipoquinesia. No muestra interés en su entorno ni en sus necesidades básicas. Las funciones de relación están muy afectadas y el curso del pensamiento se encuentra lentificado. Hay síntomas residuales en percepciones y pensamiento.",
    question: "¿Qué síndrome cerebral orgánico crónico se describe?",
    options: ["Síndrome apatoabúlico", "Síndrome demencial", "Síndrome amnésico confabulatorio", "Síndrome esquizofrénico"],
    answer: "Síndrome apatoabúlico",
    explanation: "El síndrome apatoabúlico se caracteriza por indiferencia total (facies apática), abulia, hipoquinesia, funciones de relación muy afectadas y curso asociativo lentificado. Los síntomas residuales en percepciones y pensamiento orientan a un origen orgánico crónico.",
    keys: ["Facies indiferente", "Abulia e hipoquinesia", "Funciones de relación muy afectadas", "Curso asociativo lentificado", "Síntomas residuales en percepciones"]
  },
  {
    id: 10,
    title: "Caso clínico #10",
    category: "Síndrome esquizofrénico",
    text: "Paciente aislado socialmente, con aspecto descuidado y marcadas dificultades de comunicación. Escucha voces que no provienen de personas presentes. El pensamiento aparece disgregado y con bloqueos frecuentes. Existe una evidente disociación entre lo que dice, lo que siente y lo que hace. La vigilia, memoria y orientación se conservan.",
    question: "¿Qué síndrome se describe?",
    options: ["Síndrome esquizofrénico", "Síndrome paranoide", "Síndrome apatoabúlico", "Síndrome de automatismo psíquico"],
    answer: "Síndrome esquizofrénico",
    explanation: "El elemento cardinal es la disociación ideoafectivoconativa: hay ruptura entre lo que el paciente piensa, siente y hace. Se suman alucinaciones auditivas, pensamiento autista con bloqueos y disgregación, y conservación de vigilia, memoria y orientación.",
    keys: ["Disociación ideoafectivoconativa", "Alucinaciones auditivas", "Pensamiento autista y disgregado", "Bloqueos frecuentes", "Vigilia y orientación conservadas"]
  },
  {
    id: 11,
    title: "Caso clínico #11",
    category: "Síndromes delirantes",
    text: "Paciente con comunicación fluida, orientación intacta y capacidades intelectuales normales. Expone con detalle y argumentación lógica una única idea fija de persecución que sostiene con coherencia. No refiere alucinaciones. Sus hábitos están conservados.",
    question: "¿Qué síndrome delirante se describe?",
    options: ["Síndrome paranoico", "Síndrome paranoide", "Síndrome de automatismo psíquico", "Síndrome esquizofrénico"],
    answer: "Síndrome paranoico",
    explanation: "El síndrome paranoico se organiza alrededor de un delirio único con argumentación lógica, sin trastornos sensoperceptivos (no hay alucinaciones), con conservación de la orientación y los hábitos. La afectación de la relación se limita al tema delirante.",
    keys: ["Delirio único con argumentación lógica", "Sin alucinaciones", "Orientación conservada", "Hábitos conservados", "Afectación de relación solo en tema delirante"]
  },
  {
    id: 12,
    title: "Caso clínico #12",
    category: "Síndromes delirantes",
    text: "Paciente con aspecto descuidado y actitud recelosa. Escucha voces que lo insultan y cree que sus vecinos le hacen daño. Interpreta comentarios casuales como mensajes dirigidos a él con intención de perjudicarlo. Su conducta es concordante con esas ideas y presenta ansiedad y agresividad.",
    question: "¿Qué síndrome delirante se describe?",
    options: ["Síndrome paranoide", "Síndrome paranoico", "Síndrome de automatismo psíquico", "Síndrome esquizofrénico"],
    answer: "Síndrome paranoide",
    explanation: "El síndrome paranoide se distingue por alucinaciones auditivas verbales, ideas delirantes de daño, persecución y referencia, actitud recelosa y conducta concordante con el delirio. A diferencia del paranoico, hay alteraciones sensoperceptivas y mayor afectación global.",
    keys: ["Actitud recelosa", "Alucinaciones auditivas verbales", "Ideas de daño y persecución", "Ideas de referencia", "Conducta concordante con el delirio"]
  },
  {
    id: 13,
    title: "Caso clínico #13",
    category: "Síndromes delirantes",
    text: "Paciente que describe voces internas que no provienen del exterior (pseudoalucinaciones). Refiere que una fuerza extraña le roba los pensamientos y controla su mente. Experimenta sensaciones de extrañeza consigo mismo (despersonalización) y con el mundo (desrealización). La atención está dirigida hacia adentro.",
    question: "¿Qué síndrome delirante se describe?",
    options: ["Síndrome de automatismo psíquico", "Síndrome paranoide", "Síndrome paranoico", "Síndrome esquizofrénico"],
    answer: "Síndrome de automatismo psíquico",
    explanation: "El síndrome de automatismo psíquico reúne pseudoalucinaciones auditivas, delirio de robo e influencia del pensamiento, despersonalización, desrealización y atención dirigida hacia adentro. La vivencia de control externo sobre la mente es su rasgo más característico.",
    keys: ["Pseudoalucinaciones auditivas", "Delirio de robo del pensamiento", "Delirio de influencia", "Despersonalización y desrealización", "Atención dirigida hacia adentro"]
  },
  {
    id: 14,
    title: "Caso clínico #14",
    category: "Síndromes afectivos",
    text: "Paciente con vestuario llamativo y maquillaje exagerado. Habla sin parar, saltando de un tema a otro con gran velocidad (fuga de ideas). Presenta euforia, hiperactividad improductiva, hipersociabilidad, bulimia e hipererotismo marcados.",
    question: "¿Qué síndrome afectivo se describe?",
    options: ["Síndrome maníaco", "Síndrome depresivo", "Síndrome afectivo ansioso", "Síndrome hipercinético"],
    answer: "Síndrome maníaco",
    explanation: "El síndrome maníaco se caracteriza por hipertimia placentera, pensamiento acelerado con fuga de ideas, hiperbulia, hiperquinesia improductiva y aumento de necesidades (bulimia, hipererotismo, hipersociabilidad). El aspecto llamativo y el vestuario exagerado son rasgos propios.",
    keys: ["Hipertimia placentera", "Pensamiento acelerado y fuga de ideas", "Hiperbulia e hiperquinesia improductiva", "Bulimia e hipererotismo", "Aspecto llamativo"]
  },
  {
    id: 15,
    title: "Caso clínico #15",
    category: "Síndromes afectivos",
    text: "Paciente con aspecto descuidado y postura flexionada. Refiere tristeza profunda, pérdida de intereses, insomnio, anorexia e ideas de minusvalía. El discurso es lento y hay retraimiento social marcado. En casos más severos aparecen ideas hipocondríacas e ideas suicidas.",
    question: "¿Qué síndrome afectivo se describe?",
    options: ["Síndrome depresivo", "Síndrome maníaco", "Síndrome afectivo ansioso", "Síndrome apatoabúlico"],
    answer: "Síndrome depresivo",
    explanation: "El síndrome depresivo reúne hipotimia, pensamiento de curso lento, hipobulia, hipoquinesia, retraimiento, insomnio, anorexia, hipoerotismo e ideas de minusvalía. La postura flexionada y el aspecto descuidado son signos clínicos orientadores.",
    keys: ["Hipotimia", "Pensamiento lento", "Hipobulia e hipoquinesia", "Insomnio y anorexia", "Ideas de minusvalía"]
  },
  {
    id: 16,
    title: "Caso clínico #16",
    category: "Síndromes afectivos",
    text: "Paciente con expresión angustiada, pupilas dilatadas y manos frías y sudorosas. Manifiesta un temor persistente a enloquecer o morir. El pensamiento está acelerado y anticipa constantemente la llegada de noticias desagradables. Las funciones de relación están conservadas.",
    question: "¿Qué síndrome afectivo se describe?",
    options: ["Síndrome afectivo ansioso", "Síndrome depresivo", "Síndrome maníaco", "Síndrome hipocondríaco"],
    answer: "Síndrome afectivo ansioso",
    explanation: "El síndrome afectivo ansioso se reconoce por la expresión angustiada con signos neurovegetativos (pupilas dilatadas, manos frías y sudorosas), temor a enloquecer o morir, pensamiento acelerado y expectación de noticias desagradables, con funciones de relación conservadas.",
    keys: ["Expresión angustiada", "Signos neurovegetativos (pupilas dilatadas, manos frías)", "Temor a enloquecer o morir", "Pensamiento acelerado", "Funciones de relación conservadas"]
  },
  {
    id: 17,
    title: "Caso clínico #17",
    category: "Síndromes discinéticos",
    text: "Paciente en absoluta inmovilidad y mutismo. No responde a llamados verbales ni a estímulos táctiles suaves. Sin embargo, conserva un grado variable de claridad de conciencia que lo distingue del coma. Presenta abulia, acinesia y alteración total de necesidades y hábitos. La facies puede expresar tristeza, pánico o indiferencia.",
    question: "¿Qué síndrome discinético se describe?",
    options: ["Síndrome estuporoso", "Síndrome hipercinético", "Síndrome de confusión mental", "Síndrome apatoabúlico"],
    answer: "Síndrome estuporoso",
    explanation: "El síndrome estuporoso se define por inmovilidad y mutismo con conservación variable de la claridad de conciencia, lo que lo diferencia del coma donde dicha claridad está abolida. Se añaden abulia, acinesia y alteración total de necesidades y hábitos.",
    keys: ["Inmovilidad y mutismo", "Claridad de conciencia conservada (diferencia del coma)", "Abulia y acinesia", "Alteración de necesidades y hábitos", "Facies variable (tristeza, pánico, indiferencia)"]
  },
  {
    id: 18,
    title: "Caso clínico #18",
    category: "Síndromes discinéticos",
    text: "Paciente en estado de agitación psicomotora extrema, en constante movimiento sin finalidad adaptativa. La actividad motora se encuentra notablemente aumentada con movimientos voluntarios e involuntarios que impiden toda adaptación creadora al entorno.",
    question: "¿Qué síndrome discinético se describe?",
    options: ["Síndrome hipercinético", "Síndrome estuporoso", "Síndrome maníaco", "Síndrome de estado crepuscular"],
    answer: "Síndrome hipercinético",
    explanation: "El síndrome hipercinético se caracteriza por el aumento de la actividad motora con predominio de movimientos voluntarios o involuntarios y notable afectación de la adaptación creadora. Puede manifestarse como agitación catatónica, excitación maníaca, excitación histérica o furor epiléptico.",
    keys: ["Aumento de actividad motora", "Movimientos voluntarios e involuntarios", "Agitación psicomotora", "Afectación de la adaptación creadora", "Varias modalidades clínicas"]
  },
  {
    id: 19,
    title: "Caso clínico #19",
    category: "Otros síndromes psicopatológicos",
    text: "Paciente que acude reiteradamente al médico describiendo múltiples síntomas en terminología médica. Mantiene una preocupación persistente por la posibilidad de padecer una enfermedad grave y un temor constante a la muerte, a pesar de que no se encuentran hallazgos objetivos. La atención está hiperconcentrada en sus funciones corporales.",
    question: "¿Qué síndrome se describe?",
    options: ["Síndrome hipocondríaco", "Síndrome afectivo ansioso", "Síndrome asténico", "Síndrome depresivo"],
    answer: "Síndrome hipocondríaco",
    explanation: "El síndrome hipocondríaco se organiza en torno al temor a la muerte por enfermedad grave, la autoobservación continua de funciones corporales y las reiteradas visitas al médico sin justificación objetiva. A diferencia del síndrome ansioso, el foco es el temor a morir, no la angustia difusa.",
    keys: ["Temor persistente a la enfermedad grave", "Temor constante a la muerte", "Autoobservación de funciones corporales", "Reiteradas visitas al médico", "Comunicación en terminología médica"]
  },
  {
    id: 20,
    title: "Caso clínico #20",
    category: "Otros síndromes psicopatológicos",
    text: "Paciente con aspecto de cansancio, que se fatiga fácilmente ante cualquier esfuerzo. Se irrita con los ruidos del entorno y con la menor contrariedad presenta disforia. Refiere dificultades para fijar y evocar recuerdos, sueño no reparador y sensaciones de tensión y malestar corporal (hiperestesia).",
    question: "¿Qué síndrome se describe?",
    options: ["Síndrome asténico", "Síndrome depresivo", "Síndrome hipocondríaco", "Síndrome afectivo ansioso"],
    answer: "Síndrome asténico",
    explanation: "El síndrome asténico se organiza alrededor del cansancio fácil, la irritabilidad con disforia, la intolerancia a ruidos y las dificultades de atención y memoria. Se añaden hiperestesia, cenestopatías y sueño fásico no reparador.",
    keys: ["Cansancio fácil", "Irritabilidad y disforia", "Intolerancia a ruidos", "Hipomnesia de fijación y evocación", "Hiperestesia y sueño fásico"]
  },
  {
    id: 21,
    title: "Caso clínico #21",
    category: "Otros síndromes psicopatológicos",
    text: "Paciente sin alteraciones de conciencia, percepción ni memoria. Presenta patrones inadaptativos persistentes en sus relaciones consigo mismo y con los demás, con dificultades marcadas en el control de impulsos, labilidad afectiva e inseguridad. Las capacidades intelectuales están conservadas.",
    question: "¿Qué síndrome se describe?",
    options: ["Síndrome psicopático", "Síndrome apatoabúlico", "Síndrome asténico", "Síndrome esquizofrénico"],
    answer: "Síndrome psicopático",
    explanation: "El síndrome psicopático se caracteriza por patrones inadaptativos en el comportamiento, con dificultades en el control de impulsos, inseguridad personal y labilidad afectiva. A diferencia de otros síndromes, no hay alteraciones de conciencia, percepción, memoria ni capacidades intelectuales.",
    keys: ["Patrones inadaptativos persistentes", "Dificultades en el control de impulsos", "Labilidad afectiva e inseguridad", "Sin alteraciones de conciencia ni percepción", "Capacidades intelectuales conservadas"]
  }
];

const achievements = [
  { id: "first-concept", label: "Primer concepto", icon: "1", check: state => state.studied.length >= 1 },
  { id: "ten-correct", label: "10 preguntas correctas", icon: "10", check: state => state.correctAnswers >= 10 },
  { id: "attention-module", label: "Módulo de atención", icon: "A", check: state => completedModule(state, "atencion") },
  { id: "first-case", label: "Primer caso clínico", icon: "C", check: state => solvedCaseCount(state) >= 1 },
  { id: "first-review", label: "Primer error corregido", icon: "↻", check: state => state.games.errors.corrected >= 1 },
  { id: "time-five", label: "5 aciertos contrarreloj", icon: "◷", check: state => state.games.timeAttack.bestScore >= 5 },
  { id: "all-concepts", label: "Completar biblioteca", icon: "✓", check: state => state.studied.length >= conceptTotal() },
  { id: "seven-streak", label: "7 días de racha", icon: "7", check: state => state.streak >= 7 },
  { id: "all-cases", label: "Resolver todos los casos", icon: "C", check: state => solvedCaseCount(state) >= cases.length },
  { id: "syndrome-module", label: "Síndromes clínicos", icon: "S", check: state => completedModule(state, "sindromes") }
];

const gameModes = [
  { id: "trivia", route: "juego", icon: "⚡", title: "Trivia rápida", description: "Preguntas cortas con retroalimentación" },
  { id: "cases", route: "casos", icon: "▣", title: "Caso clínico", description: "Reconoce síndromes en escenas breves" },
  { id: "errors", route: "errores", icon: "↻", title: "Repaso de errores", description: "Vuelve a intentar solo lo fallado" },
  { id: "timeAttack", route: "contrarreloj", icon: "◷", title: "Desafío contrarreloj", description: "Acierta todo lo posible en 45 segundos" }
];

let appState = loadState();
let route = "inicio";
let selectedConceptId = concepts[0]?.id || 1;
let selectedQuestionIndex = appState.games.trivia.lastIndex % generalTriviaQuestions().length;
let selectedCaseIndex = appState.games.cases.lastIndex % cases.length;
let shuffledCaseOptions = shuffleArray([...cases[selectedCaseIndex].options]);
let caseRoundStart = appState.games.cases.correct;
let casesAnsweredInRound = 0;
let selectedReviewIndex = appState.games.errors.lastIndex;
let selectedTimedQuestionIndex = appState.games.timeAttack.lastIndex % generalTriviaQuestions().length;
let selectedAnswer = "";
let lastResult = null;
let searchTerm = "";
let activeFilter = "Todos";
let timer = 25;
let timerInterval = null;
let triviaRound = defaultTriviaRound();
let timeAttackScore = 0;
let timeAttackAnswered = 0;
let timeAttackActive = false;

function loadState() {
  const initialGames = defaultGames();

  const fallback = {
    points: 0,
    streak: 0,
    studied: [],
    correctAnswers: 0,
    casesSolved: 0,
    solvedCases: [],
    hardConcepts: [],
    games: initialGames,
    mistakes: defaultMistakes(),
    lastVisit: todayKey()
  };

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const savedState = stored && typeof stored === "object" ? stored : {};
    const state = { ...fallback, ...savedState };
    state.games = normalizeGames(savedState.games, state);
    state.mistakes = normalizeMistakes(savedState.mistakes);
    normalizeState(state);
    const updatedState = updateStreak(state);
    saveStoredState(updatedState);
    return updatedState;
  } catch {
    const updatedFallback = updateStreak(fallback);
    saveStoredState(updatedFallback);
    return updatedFallback;
  }
}

function defaultGames() {
  return {
    trivia: { attempts: 0, correct: 0, streak: 0, bestStreak: 0, lastIndex: 0 },
    cases: { attempts: 0, correct: 0, lastIndex: 0 },
    errors: { attempts: 0, corrected: 0, lastIndex: 0 },
    timeAttack: { plays: 0, attempts: 0, correct: 0, bestScore: 0, lastIndex: 0 }
  };
}

function defaultMistakes() {
  return {
    questions: [],
    cases: []
  };
}

function normalizeState(state) {
  state.points = Math.min(MAX_POINTS, normalizeCounter(state.points));
  state.streak = normalizeCounter(state.streak);
  state.correctAnswers = normalizeCounter(state.correctAnswers);
  state.casesSolved = normalizeCounter(state.casesSolved);
  state.solvedCases = normalizeKnownIdList(state.solvedCases, cases);
  state.studied = normalizeKnownIdList(state.studied, concepts);
  syncSolvedCaseConcepts(state);
  state.hardConcepts = normalizeKnownIdList(state.hardConcepts, concepts);
  state.lastVisit = typeof state.lastVisit === "string" ? state.lastVisit : todayKey();
  return state;
}

function normalizeGames(games = {}, state = {}) {
  const savedGames = games && typeof games === "object" ? games : {};
  const defaults = defaultGames();
  const normalized = {
    trivia: normalizeGame(savedGames.trivia, defaults.trivia),
    cases: normalizeGame(savedGames.cases, defaults.cases),
    errors: normalizeGame(savedGames.errors, defaults.errors),
    timeAttack: normalizeGame(savedGames.timeAttack, defaults.timeAttack)
  };

  if (!savedGames.trivia && state.correctAnswers) normalized.trivia.correct = state.correctAnswers;
  if (!savedGames.cases && state.casesSolved) normalized.cases.correct = state.casesSolved;
  return normalized;
}

function normalizeGame(game = {}, defaults = {}) {
  const savedGame = game && typeof game === "object" ? game : {};
  const normalized = { ...defaults, ...savedGame };
  Object.keys(defaults).forEach(key => {
    normalized[key] = normalizeCounter(normalized[key]);
  });
  return normalized;
}

function normalizeMistakes(mistakes = {}) {
  const savedMistakes = mistakes && typeof mistakes === "object" ? mistakes : {};
  return {
    questions: normalizeKnownIdList(savedMistakes.questions, questions),
    cases: normalizeKnownIdList(savedMistakes.cases, cases)
  };
}

function normalizeIdList(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(Number).filter(Number.isFinite))];
}

function normalizeKnownIdList(value, collection) {
  const validIds = new Set(collection.map(item => item.id));
  return normalizeIdList(value).filter(id => validIds.has(id));
}

function normalizeCounter(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
}

function addPoints(amount) {
  const previousPoints = appState.points;
  appState.points = Math.min(MAX_POINTS, appState.points + amount);
  return appState.points - previousPoints;
}

function updateStreak(state) {
  const today = todayKey();
  if (state.lastVisit === today) {
    state.streak = Math.max(1, state.streak);
    return state;
  }

  const daysSinceLastVisit = daysBetween(state.lastVisit, today);
  state.lastVisit = today;
  state.streak = daysSinceLastVisit === 1 ? Math.max(1, state.streak + 1) : 1;
  return state;
}

function saveState() {
  saveStoredState(appState);
}

function saveStoredState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The app can still be used if browser storage is unavailable.
  }
}

function todayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daysBetween(startKey, endKey) {
  const start = dateFromKey(startKey);
  const end = dateFromKey(endKey);
  if (!start || !end) return Number.POSITIVE_INFINITY;
  return Math.round((end - start) / 86400000);
}

function dateFromKey(key) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key || "");
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function progressPercent() {
  const total = conceptTotal();
  return total ? Math.min(100, Math.round((appState.studied.length / total) * 100)) : 0;
}

function conceptTotal() {
  return concepts.length;
}

function studiedByCategory(state, category) {
  return concepts.filter(concept => concept.category === category && state.studied.includes(concept.id)).length;
}

function conceptsByModule(module) {
  return concepts.filter(concept => concept.moduleId === module.id);
}

function moduleStats(module) {
  const moduleConcepts = conceptsByModule(module);
  const studied = moduleConcepts.filter(concept => appState.studied.includes(concept.id)).length;
  const total = moduleConcepts.length;
  const progress = total ? Math.round((studied / total) * 100) : 0;
  return { studied, total, progress };
}

function uniqueCategories() {
  return ["Todos", ...new Set(concepts.map(concept => concept.category))];
}

function completedModule(state, moduleId) {
  const moduleConcepts = concepts.filter(concept => concept.moduleId === moduleId);
  return moduleConcepts.length > 0 && moduleConcepts.every(concept => state.studied.includes(concept.id));
}

function solvedCaseCount(state) {
  return normalizeKnownIdList(state.solvedCases, cases).length;
}

function markCaseSolved(caseId) {
  if (!appState.solvedCases.includes(caseId)) {
    appState.solvedCases.push(caseId);
    appState.casesSolved = appState.solvedCases.length;
  }
}

function markConceptStudiedByName(conceptName) {
  const concept = concepts.find(item => item.name === conceptName);
  if (concept && !appState.studied.includes(concept.id)) appState.studied.push(concept.id);
}

function syncSolvedCaseConcepts(state) {
  const studied = new Set(state.studied);
  state.solvedCases.forEach(caseId => {
    const clinicalCase = cases.find(item => item.id === caseId);
    const concept = concepts.find(item => item.name === clinicalCase?.answer);
    if (concept) studied.add(concept.id);
  });
  state.studied = [...studied];
}

function libraryFilters() {
  return [{ id: "Todos", name: "Todos" }, ...modules.map(module => ({ id: module.id, name: module.name }))];
}

function defaultTriviaRound(questionSet = questions, context = {}) {
  return {
    active: false,
    total: Math.min(TRIVIA_ROUND_SIZE, questionSet.length),
    current: 0,
    correct: 0,
    wrong: 0,
    points: 0,
    answers: [],
    questions: questionSet,
    mode: context.mode || "general",
    conceptName: context.conceptName || ""
  };
}

function startTriviaRound(startIndex = 0, conceptId) {
  const concept = conceptId ? concepts.find(item => item.id === conceptId) : null;
  const questionSet = concept ? buildConceptPracticeQuestions(concept) : generalTriviaQuestions();
  triviaRound = {
    ...defaultTriviaRound(questionSet, {
      mode: concept ? "concept" : "general",
      conceptName: concept?.name || ""
    }),
    active: true
  };
  selectedQuestionIndex = startIndex % questionSet.length;
}

function activeTriviaQuestions() {
  return triviaRound.questions?.length ? triviaRound.questions : generalTriviaQuestions();
}

function currentTriviaQuestion() {
  const questionSet = activeTriviaQuestions();
  return questionSet[selectedQuestionIndex % questionSet.length];
}

function rotatedOptions(options, seed = 0) {
  const uniqueOptions = [...new Set(options)].filter(Boolean);
  if (uniqueOptions.length < 2) return uniqueOptions;
  const offset = seed % uniqueOptions.length;
  return [...uniqueOptions.slice(offset), ...uniqueOptions.slice(0, offset)];
}

function conceptDistractors(concept, key, limit = 3) {
  return concepts
    .filter(item => item.id !== concept.id)
    .sort((a, b) => {
      if (a.category === concept.category && b.category !== concept.category) return -1;
      if (a.category !== concept.category && b.category === concept.category) return 1;
      return a.id - b.id;
    })
    .map(item => item[key])
    .filter(Boolean)
    .slice(0, limit);
}

function buildConceptPracticeQuestions(concept) {
  const categories = uniqueCategories().filter(category => category !== "Todos" && category !== concept.category);
  const firstConfusion = concept.confusion[0] || {
    term: "otro concepto cercano",
    difference: concept.definition
  };
  const confusionDistractors = concepts
    .filter(item => item.id !== concept.id)
    .flatMap(item => item.confusion.map(confusion => confusion.difference))
    .filter(Boolean)
    .slice(0, 3);

  return [
    {
      id: `concept-${concept.id}-definition`,
      category: concept.category,
      source: "concept",
      question: `¿Qué concepto corresponde a esta definición? ${concept.definition}`,
      options: rotatedOptions([concept.name, ...conceptDistractors(concept, "name")], concept.id),
      answer: concept.name,
      explanation: `Esa definición corresponde a ${concept.name}.`,
      extra: concept.simple
    },
    {
      id: `concept-${concept.id}-simple`,
      category: concept.category,
      source: "concept",
      question: `¿Cuál explicación sencilla describe mejor ${concept.name}?`,
      options: rotatedOptions([concept.simple, ...conceptDistractors(concept, "simple")], concept.id + 1),
      answer: concept.simple,
      explanation: `La explicación sencilla de ${concept.name} es: ${concept.simple}`,
      extra: `Ejemplo clínico: ${concept.example}`
    },
    {
      id: `concept-${concept.id}-category`,
      category: concept.category,
      source: "concept",
      question: `¿A qué categoría pertenece ${concept.name}?`,
      options: rotatedOptions([concept.category, ...categories.slice(0, 3)], concept.id + 2),
      answer: concept.category,
      explanation: `${concept.name} pertenece a la categoría ${concept.category}.`,
      extra: `Tipo: ${concept.type}. Dificultad: ${concept.difficulty}.`
    },
    {
      id: `concept-${concept.id}-example`,
      category: concept.category,
      source: "concept",
      question: `¿Qué ejemplo clínico corresponde mejor a ${concept.name}?`,
      options: rotatedOptions([concept.example, ...conceptDistractors(concept, "example")], concept.id + 3),
      answer: concept.example,
      explanation: `Ese ejemplo ilustra ${concept.name}.`,
      extra: concept.definition
    },
    {
      id: `concept-${concept.id}-confusion`,
      category: concept.category,
      source: "concept",
      question: `Según la ficha, ¿qué diferencia ayuda a distinguir ${concept.name} de ${firstConfusion.term}?`,
      options: rotatedOptions([firstConfusion.difference, ...confusionDistractors], concept.id + 4),
      answer: firstConfusion.difference,
      explanation: `${concept.name} no debe confundirse con ${firstConfusion.term}.`,
      extra: firstConfusion.difference
    }
  ];
}

function buildConceptQuickQuestion(concept) {
  return {
    id: `quick-${concept.id}-definition`,
    category: concept.category,
    source: "concept",
    question: `¿Qué concepto corresponde a esta definición? ${concept.definition}`,
    options: rotatedOptions([concept.name, ...conceptDistractors(concept, "name")], concept.id),
    answer: concept.name,
    explanation: `Esa definición corresponde a ${concept.name}.`,
    extra: concept.simple
  };
}

function generalTriviaQuestions() {
  return [...questions, ...concepts.map(buildConceptQuickQuestion)];
}

function navigate(nextRoute, options = {}) {
  route = nextRoute;
  selectedAnswer = "";
  lastResult = null;
  if (options.conceptId) selectedConceptId = options.conceptId;
  if (nextRoute === "juego") {
    if (options.continueRound) {
      selectedQuestionIndex = options.questionIndex ?? selectedQuestionIndex;
    } else {
      startTriviaRound(
        options.questionIndex ?? ((appState.games.trivia.lastIndex + 1) % generalTriviaQuestions().length),
        options.conceptId
      );
    }
  }
  if (nextRoute === "casos") {
    const pendingCaseIndex = cases.findIndex(clinicalCase => !appState.solvedCases.includes(clinicalCase.id));
    selectedCaseIndex = options.caseIndex ?? (pendingCaseIndex >= 0 ? pendingCaseIndex : appState.games.cases.lastIndex % cases.length);
    shuffledCaseOptions = shuffleArray([...cases[selectedCaseIndex].options]);
    if (!options.continueRound) {
      caseRoundStart = appState.games.cases.correct;
      casesAnsweredInRound = 0;
    }
  }
  if (nextRoute === "errores") selectedReviewIndex = options.reviewIndex ?? appState.games.errors.lastIndex;
  if (nextRoute === "contrarreloj") startTimeAttack();
  if (nextRoute !== "contrarreloj" && route !== "resultadoContrarreloj") timeAttackActive = false;
  resetTimer(nextRoute);
  render();
}

function resetTimer(nextRoute) {
  clearInterval(timerInterval);
  if (nextRoute === "juego") timer = 25;
  if (nextRoute === "contrarreloj") timer = 45;
  if (nextRoute !== "juego" && nextRoute !== "contrarreloj") return;

  timerInterval = setInterval(() => {
    timer = Math.max(0, timer - 1);
    const timerNode = document.querySelector("[data-timer]");
    if (timerNode) timerNode.textContent = `00:${String(timer).padStart(2, "0")}`;
    if (timer === 0) {
      clearInterval(timerInterval);
      if (route === "juego") submitQuiz(true);
      if (route === "contrarreloj") finishTimeAttack("time");
    }
  }, 1000);
}

function startTimeAttack() {
  const questionSet = generalTriviaQuestions();
  timeAttackScore = 0;
  timeAttackAnswered = 0;
  timeAttackActive = true;
  selectedTimedQuestionIndex = appState.games.timeAttack.lastIndex % questionSet.length;
}

function markStudied(conceptId) {
  if (!appState.studied.includes(conceptId)) {
    appState.studied.push(conceptId);
    saveState();
  }
}

function toggleHard(conceptId) {
  if (appState.hardConcepts.includes(conceptId)) {
    appState.hardConcepts = appState.hardConcepts.filter(id => id !== conceptId);
  } else {
    appState.hardConcepts.push(conceptId);
  }
  saveState();
  render();
}

function submitQuiz(timedOut = false) {
  const question = currentTriviaQuestion();
  if (!selectedAnswer && !timedOut) return;
  if (!triviaRound.active) startTriviaRound(selectedQuestionIndex);

  const correct = !timedOut && selectedAnswer === question.answer;
  const pointsGained = correct ? addPoints(POINTS.trivia) : 0;
  appState.games.trivia.attempts += 1;
  if (triviaRound.mode === "general") appState.games.trivia.lastIndex = selectedQuestionIndex;
  if (correct) {
    appState.correctAnswers += 1;
    appState.games.trivia.correct += 1;
    appState.games.trivia.streak += 1;
    appState.games.trivia.bestStreak = Math.max(appState.games.trivia.bestStreak, appState.games.trivia.streak);
    if (question.source !== "concept") removeMistake("questions", question.id);
  } else {
    appState.games.trivia.streak = 0;
    if (question.source !== "concept") addMistake("questions", question.id);
  }

  triviaRound.correct += correct ? 1 : 0;
  triviaRound.wrong += correct ? 0 : 1;
  triviaRound.points += pointsGained;
  triviaRound.answers.push({
    question: question.question,
    selected: timedOut ? "Sin responder" : selectedAnswer,
    answer: question.answer,
    correct
  });

  saveState();
  const timeoutExtra = triviaRound.mode === "concept"
    ? "Se acabó el tiempo. La pregunta cuenta como incorrecta en esta práctica."
    : "Se acabó el tiempo. La pregunta queda como incorrecta y va a repaso.";
  lastResult = {
    correct,
    answer: question.answer,
    explanation: question.explanation,
    extra: timedOut ? timeoutExtra : question.extra,
    selected: timedOut ? "Sin responder" : selectedAnswer,
    pointsGained,
    questionNumber: triviaRound.current + 1,
    total: triviaRound.total,
    isLast: triviaRound.current + 1 >= triviaRound.total
  };
  route = "resultadoTrivia";
  clearInterval(timerInterval);
  render();
}

function submitCase() {
  const clinicalCase = cases[selectedCaseIndex];
  if (!selectedAnswer) return;
  const correct = selectedAnswer === clinicalCase.answer;
  appState.games.cases.attempts += 1;
  appState.games.cases.lastIndex = selectedCaseIndex;
  const alreadySolved = appState.solvedCases.includes(clinicalCase.id);
  casesAnsweredInRound += 1;
  const pointsGained = correct && !alreadySolved ? addPoints(POINTS.case) : 0;
  if (correct) {
    markCaseSolved(clinicalCase.id);
    markConceptStudiedByName(clinicalCase.answer);
    if (!alreadySolved) appState.games.cases.correct += 1;
    removeMistake("cases", clinicalCase.id);
  } else {
    addMistake("cases", clinicalCase.id);
  }
  saveState();
  lastResult = {
    correct,
    selected: selectedAnswer,
    answer: clinicalCase.answer,
    explanation: clinicalCase.explanation,
    keys: clinicalCase.keys,
    pointsGained
  };
  route = "resultadoCaso";
  render();
}

function submitReview() {
  const reviewItems = buildReviewItems();
  const item = reviewItems[selectedReviewIndex % Math.max(1, reviewItems.length)];
  if (!item || !selectedAnswer) return;

  const correct = selectedAnswer === item.answer;
  appState.games.errors.attempts += 1;
  appState.games.errors.lastIndex = selectedReviewIndex;
  const pointsGained = correct ? addPoints(POINTS.review) : 0;
  if (correct) {
    appState.games.errors.corrected += 1;
    if (item.bucket === "cases") {
      markCaseSolved(item.id);
      markConceptStudiedByName(item.answer);
    }
    removeMistake(item.bucket, item.id);
  }

  saveState();
  lastResult = {
    correct,
    answer: item.answer,
    explanation: item.explanation,
    extra: correct ? "Este error ya salió de tu lista de repaso." : "Se mantiene en repaso para volver a intentarlo.",
    source: item.source,
    pointsGained
  };
  route = "resultadoErrores";
  render();
}

function submitTimeAttack() {
  const questionSet = generalTriviaQuestions();
  const question = questionSet[selectedTimedQuestionIndex % questionSet.length];
  if (!selectedAnswer || !timeAttackActive) return;

  const correct = selectedAnswer === question.answer;
  appState.games.timeAttack.attempts += 1;
  timeAttackAnswered += 1;
  if (correct) {
    timeAttackScore += 1;
    addPoints(POINTS.timeAttack);
    appState.games.timeAttack.correct += 1;
    if (question.source !== "concept") removeMistake("questions", question.id);
  } else {
    if (question.source !== "concept") addMistake("questions", question.id);
  }

  selectedTimedQuestionIndex = (selectedTimedQuestionIndex + 1) % questionSet.length;
  appState.games.timeAttack.lastIndex = selectedTimedQuestionIndex;
  selectedAnswer = "";
  saveState();
  render();
}

function finishTimeAttack(reason = "manual") {
  if (!timeAttackActive && route === "resultadoContrarreloj") return;

  clearInterval(timerInterval);
  timeAttackActive = false;
  appState.games.timeAttack.plays += 1;
  appState.games.timeAttack.bestScore = Math.max(appState.games.timeAttack.bestScore, timeAttackScore);
  saveState();
  lastResult = {
    score: timeAttackScore,
    answered: timeAttackAnswered,
    bestScore: appState.games.timeAttack.bestScore,
    reason
  };
  route = "resultadoContrarreloj";
  render();
}

function nextQuestion() {
  const questionSet = activeTriviaQuestions();
  if (triviaRound.current + 1 >= triviaRound.total) {
    triviaRound.active = false;
    route = "resultadoTriviaFinal";
    selectedAnswer = "";
    lastResult = null;
    saveState();
    render();
    return;
  }

  triviaRound.current += 1;
  selectedQuestionIndex = (selectedQuestionIndex + 1) % questionSet.length;
  if (triviaRound.mode === "general") appState.games.trivia.lastIndex = selectedQuestionIndex;
  saveState();
  navigate("juego", { questionIndex: selectedQuestionIndex, continueRound: true });
}

function nextCase() {
  const nextPendingIndex = cases.findIndex((clinicalCase, index) => {
    return index > selectedCaseIndex && !appState.solvedCases.includes(clinicalCase.id);
  });

  if (nextPendingIndex < 0) {
    route = "resultadoCasosFinal";
    selectedAnswer = "";
    lastResult = null;
    saveState();
    render();
    return;
  }

  selectedCaseIndex = nextPendingIndex;
  shuffledCaseOptions = shuffleArray([...cases[selectedCaseIndex].options]);
  appState.games.cases.lastIndex = selectedCaseIndex;
  saveState();
  navigate("casos", { caseIndex: selectedCaseIndex, continueRound: true });
}

function nextReview() {
  const total = buildReviewItems().length;
  if (!total) {
    navigate("inicio");
    return;
  }
  selectedReviewIndex = (selectedReviewIndex + 1) % total;
  appState.games.errors.lastIndex = selectedReviewIndex;
  saveState();
  navigate("errores", { reviewIndex: selectedReviewIndex });
}

function addMistake(bucket, id) {
  if (!appState.mistakes[bucket].includes(id)) appState.mistakes[bucket].push(id);
}

function removeMistake(bucket, id) {
  appState.mistakes[bucket] = appState.mistakes[bucket].filter(item => item !== id);
}

function buildReviewItems() {
  const failedQuestions = appState.mistakes.questions
    .map(id => questions.find(question => question.id === id))
    .filter(Boolean)
    .map(question => ({
      id: question.id,
      bucket: "questions",
      source: "Trivia",
      category: question.category,
      question: question.question,
      options: question.options,
      answer: question.answer,
      explanation: question.explanation,
      extra: question.extra
    }));

  const failedCases = appState.mistakes.cases
    .map(id => cases.find(clinicalCase => clinicalCase.id === id))
    .filter(Boolean)
    .map(clinicalCase => ({
      id: clinicalCase.id,
      bucket: "cases",
      source: "Caso clínico",
      category: clinicalCase.category,
      question: `${clinicalCase.text} ${clinicalCase.question}`,
      options: clinicalCase.options,
      answer: clinicalCase.answer,
      explanation: clinicalCase.explanation,
      extra: clinicalCase.keys.join(" · ")
    }));

  return [...failedQuestions, ...failedCases];
}

function activeNav() {
  if (route.includes("biblioteca") || route === "concepto") return "biblioteca";
  if (route.includes("Trivia") || route === "juego" || route === "errores" || route === "resultadoErrores" || route === "contrarreloj" || route === "resultadoContrarreloj") return "juego";
  if (route.includes("Caso") || route === "casos") return "casos";
  if (route === "logros") return "logros";
  if (route === "perfil") return "perfil";
  return "inicio";
}

function render() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = `
    <main class="app-shell">
      ${renderSidebar()}
      <section class="main-stage">
        <div class="desktop-view">${renderCurrentView(false)}</div>
        <div class="mobile-shell">
          <div class="mobile-content">${renderCurrentView(true)}</div>
          ${renderBottomNav()}
        </div>
      </section>
    </main>
  `;
  bindEvents();
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function brainLogo() {
  return `
    <svg class="brain-logo" viewBox="0 0 64 64" aria-hidden="true">
      <path class="brain-lobe" d="M29.5 14.6c-5.4-4-13.1-.5-13.8 6.2-5.2 1.2-8.3 6.8-5.8 11.6-3 3.3-2.8 8.5.5 11.5 1.5 1.4 3.4 2.2 5.4 2.4.9 5 5.2 8.8 10.5 8.8h3.2V14.6Z" />
      <path class="brain-lobe" d="M34.5 14.6c5.4-4 13.1-.5 13.8 6.2 5.2 1.2 8.3 6.8 5.8 11.6 3 3.3 2.8 8.5-.5 11.5-1.5 1.4-3.4 2.2-5.4 2.4-.9 5-5.2 8.8-10.5 8.8h-3.2V14.6Z" />
      <path class="brain-line" d="M22 22.4c2.9-1.1 5.4.1 7.3 2.6M16.2 32.2c3.6-.9 6.7.2 8.8 3.2M20.2 43.2c2.4-.5 4.7.4 6.2 2.6M42 22.4c-2.9-1.1-5.4.1-7.3 2.6M47.8 32.2c-3.6-.9-6.7.2-8.8 3.2M43.8 43.2c-2.4-.5-4.7.4-6.2 2.6M32 15.8v39.4" />
    </svg>
  `;
}

function renderSidebar() {
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">${brainLogo()}</div>
        <div>
          <div class="brand-title">Triviatology</div>
          <div class="brand-subtitle">Semiología y Síndromes</div>
        </div>
      </div>
      <nav class="nav">
        ${navButton("inicio", "Inicio")}
        ${navButton("biblioteca", "Biblioteca")}
        ${navButton("juego", "Juego")}
        ${navButton("casos", "Casos clínicos")}
        ${navButton("logros", "Logros")}
        ${navButton("perfil", "Perfil")}
      </nav>
      <div class="keep-going">
        <div class="brand-mark">${brainLogo()}</div>
        <div>
          <strong>¡Sigue así!</strong>
          <span>El aprendizaje constante te hace mejor.</span>
        </div>
      </div>
    </aside>
  `;
}

function navIcon(id) {
  const icons = {
    inicio: `<svg viewBox="0 0 24 24"><path d="M3.8 11.3 12 4l8.2 7.3"/><path d="M5.5 10.5v8.2h4.4v-5h4.2v5h4.4v-8.2"/></svg>`,
    biblioteca: `<svg viewBox="0 0 24 24"><path d="M5 5.8c0-1 .8-1.8 1.8-1.8H19v15H6.8A1.8 1.8 0 0 1 5 17.2Z"/><path d="M5 17.2c0-1 .8-1.8 1.8-1.8H19"/><path d="M9 7.5h6"/></svg>`,
    juego: `<svg viewBox="0 0 24 24"><path d="M13 2.8 5.5 13h5.4L10 21.2 18.5 10h-5.6Z"/></svg>`,
    casos: `<svg viewBox="0 0 24 24"><path d="M8.2 6.5V4.8c0-1 .8-1.8 1.8-1.8h4c1 0 1.8.8 1.8 1.8v1.7"/><path d="M4.5 6.5h15v13h-15Z"/><path d="M9.5 13h5"/><path d="M12 10.5v5"/></svg>`,
    logros: `<svg viewBox="0 0 24 24"><path d="m12 3 2.4 5 5.4.8-3.9 3.8.9 5.4-4.8-2.6L7.2 18l.9-5.4-3.9-3.8 5.4-.8Z"/></svg>`,
    perfil: `<svg viewBox="0 0 24 24"><path d="M12 12.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"/><path d="M4.8 20.2c1.3-3.6 3.8-5.4 7.2-5.4s5.9 1.8 7.2 5.4"/></svg>`
  };
  return icons[id] || "";
}

function navButton(id, label) {
  return `
    <button class="nav-button ${activeNav() === id ? "active" : ""}" data-route="${id}">
      <span class="nav-icon">${navIcon(id)}</span>
      <span>${label}</span>
    </button>
  `;
}

function renderBottomNav() {
  const tabs = [
    ["inicio", "Inicio"],
    ["biblioteca", "Biblioteca"],
    ["juego", "Juego"],
    ["casos", "Casos"],
    ["logros", "Logros"]
  ];
  return `
    <nav class="mobile-bottom">
      ${tabs.map(([id, label]) => `
        <button class="bottom-tab ${activeNav() === id ? "active" : ""}" data-route="${id}">
          <span class="bottom-icon">${navIcon(id)}</span>
          <span>${label}</span>
        </button>
      `).join("")}
    </nav>
  `;
}

function renderCurrentView(isMobile) {
  if (route === "biblioteca") return renderLibrary(isMobile);
  if (route === "concepto") return renderConcept(isMobile);
  if (route === "juego") return renderQuiz(isMobile);
  if (route === "resultadoTrivia") return renderQuizResult(isMobile);
  if (route === "resultadoTriviaFinal") return renderQuizSummary(isMobile);
  if (route === "casos") return renderCases(isMobile);
  if (route === "resultadoCaso") return renderCaseResult(isMobile);
  if (route === "resultadoCasosFinal") return renderCaseSummary(isMobile);
  if (route === "errores") return renderReview(isMobile);
  if (route === "resultadoErrores") return renderReviewResult(isMobile);
  if (route === "contrarreloj") return renderTimeAttack(isMobile);
  if (route === "resultadoContrarreloj") return renderTimeAttackResult(isMobile);
  if (route === "logros") return renderAchievements(isMobile);
  if (route === "perfil") return renderProfile(isMobile);
  return renderHome(isMobile);
}

function renderHome(isMobile) {
  const studyTarget = nextStudyTarget();
  const hasStarted = appState.studied.length > 0;

  return `
    ${isMobile ? screenHeader("Triviatology", false) : `
      <div class="topbar">
        <div>
          <h1>Hola, estudiante 👋</h1>
          <p class="muted">¿Listo para tu reto de hoy?</p>
        </div>
        <div class="top-actions">
          ${statPill("🔥", "Racha", `${appState.streak} días`)}
          ${statPill("🏆", "Puntos", `${appState.points}/${MAX_POINTS}`)}
          <button class="icon-button" data-route="perfil">◉</button>
        </div>
      </div>
    `}
    <div class="dashboard-grid">
      <section class="panel progress-panel">
        <div>
          <p class="eyebrow">Progreso de conceptos</p>
          <div class="progress-number">${progressPercent()}%</div>

          <div class="progress-bar" style="--value: ${progressPercent()}%"><div class="progress-fill"></div></div>
        </div>
        <div class="study-illustration">${brainLogo()}</div>
      </section>
      <section class="panel continue-panel">
        <p class="eyebrow">${hasStarted ? "Continuar estudiando" : "Empezar a estudiar"}</p>
        <div class="target-row">
          <div>
            <p class="muted">${hasStarted ? "Siguiente concepto" : "Primer concepto sugerido"}</p>
            <h2>${studyTarget.name}</h2>
            <span class="concept-category">${(modules.find(m => m.id === studyTarget.moduleId) || {}).name || studyTarget.category}</span>
          </div>
          <div class="target-art">◎</div>
        </div>
        <button class="primary-button" data-route="concepto" data-concept-id="${studyTarget.id}">${hasStarted ? "Continuar" : "Empezar"} →</button>
      </section>
    </div>
    <div class="study-grid">
      <section>
        <div class="section-title">Módulos de estudio</div>
        <div class="modules">
          ${modules.map(module => renderModule(module)).join("")}
        </div>
      </section>
      <section>
        <div class="section-title">Modos de juego</div>
        <div class="game-modes">
          ${gameModes.map(renderGameMode).join("")}
        </div>
      </section>
    </div>
    <div class="quote-bar">“El conocimiento de la mente humana es el primer paso para comprender al otro.”</div>
  `;
}

function nextStudyTarget() {
  return concepts.find(concept => !appState.studied.includes(concept.id)) || concepts[0];
}

function renderGameMode(mode) {
  return `
    <button class="game-mode" data-route="${mode.route}">
      <span class="game-mode-icon">${mode.icon}</span>
      <span>
        <strong>${mode.title}</strong>
        <span>${mode.description}</span>
        <small class="game-summary">${gameSummary(mode.id)}</small>
      </span>
    </button>
  `;
}

function gameSummary(id) {
  if (id === "trivia") {
    const { correct, attempts } = appState.games.trivia;
    return attempts
      ? `${correct} aciertos de ${attempts} intentos · +${POINTS.trivia} por acierto`
      : `Sin intentos · +${POINTS.trivia} por acierto`;
  }
  if (id === "cases") {
    const solved = solvedCaseCount(appState);
    return solved
      ? `${solved} de ${cases.length} casos resueltos · +${POINTS.case} por caso`
      : `${cases.length} casos disponibles · +${POINTS.case} por caso`;
  }
  if (id === "errors") return `${buildReviewItems().length} pendientes · +${POINTS.review} por corrección`;
  return `Mejor marca: ${appState.games.timeAttack.bestScore} · +${POINTS.timeAttack} por acierto`;
}

function statPill(icon, label, value) {
  return `
    <div class="stat-pill">
      <span class="stat-icon">${icon}</span>
      <span><small>${label}</small><strong>${value}</strong></span>
    </div>
  `;
}

function renderModule(module) {
  const stats = moduleStats(module);
  return `
    <article class="module-tile">
      <div class="module-icon" style="background:${module.color}">${module.icon}</div>
      <div>
        <h3>${module.name}</h3>
        <div class="mini-progress" style="--value:${stats.progress}%"><span></span></div>
      </div>
      <div class="module-percent">${stats.progress}%</div>
    </article>
  `;
}

function screenHeader(title, back = true) {
  return `
    <header class="screen-header">
      ${back ? `<button class="back-button" data-route="inicio">‹</button>` : ""}
      <h2>${title}</h2>
      <span></span>
    </header>
  `;
}

function renderLibrary(isMobile) {
  const activeModule = modules.find(module => module.id === activeFilter);
  const activeModuleConceptIds = activeModule
    ? new Set(conceptsByModule(activeModule).map(concept => concept.id))
    : null;
  const filtered = concepts.filter(concept => {
    const matchesFilter = activeFilter === "Todos"
      || activeModuleConceptIds?.has(concept.id)
      || concept.category === activeFilter;
    const text = `${concept.name} ${concept.category} ${concept.definition}`.toLowerCase();
    return matchesFilter && text.includes(searchTerm.toLowerCase());
  });

  return `
    ${screenHeader("Biblioteca", isMobile)}
    <div class="library-tools">
      <label class="search-box">
        <input id="searchInput" value="${escapeHtml(searchTerm)}" placeholder="Buscar concepto..." />
        <span class="search-icon">⌕</span>
      </label>
      <div class="chips">
        ${libraryFilters().map(filter => `
          <button class="chip ${activeFilter === filter.id ? "active" : ""}" data-filter="${filter.id}">${filter.name}</button>
        `).join("")}
      </div>
    </div>
    <div class="concept-list">
      ${filtered.length ? filtered.map(renderConceptRow).join("") : `<div class="empty-state">No se encontraron conceptos.</div>`}
    </div>
  `;
}

function renderConceptRow(concept) {
  return `
    <article class="concept-row">
      <div>
        <strong>${concept.name}</strong>
        <span class="concept-category">${concept.category}</span>
        <p>${concept.definition}</p>
      </div>
      <button class="small-button" data-route="concepto" data-concept-id="${concept.id}">Estudiar</button>
      <div class="bookmark">${appState.studied.includes(concept.id) ? "◆" : "◇"}</div>
    </article>
  `;
}

function renderConcept(isMobile) {
  const concept = concepts.find(item => item.id === selectedConceptId) || concepts[0];
  markStudied(concept.id);
  const isHard = appState.hardConcepts.includes(concept.id);
  const mod = modules.find(m => m.id === concept.moduleId) || {};
  const modColor = mod.color || "#8d5de4";
  const bgColor = hexToRgba(modColor, 0.09);
  const borderColor = hexToRgba(modColor, 0.30);
  const avatarGrad = `linear-gradient(135deg, ${hexToRgba(modColor, 0.45)}, ${modColor})`;

  return `
    <header class="screen-header">
      <button class="back-button" data-route="inicio">‹</button>
      <h2>Concepto</h2>
      <span></span>
    </header>
    <div class="concept-module-banner" style="background:${bgColor};border:1.5px solid ${borderColor}">
      <div class="concept-avatar" style="background:${avatarGrad}">${brainLogo()}</div>
      <div class="concept-module-info">
        <span class="concept-module-label">Módulo</span>
        <span class="concept-module-name" style="color:${modColor}">${mod.name || concept.category}</span>
      </div>
    </div>
    <div class="concept-title-block">
      <p class="concept-type-label">${concept.type} · ${concept.difficulty}</p>
      <h1 class="concept-title-name">${concept.name}</h1>
    </div>
    <section class="study-section">
      <h3>Definición</h3>
      <p>${concept.definition}</p>
    </section>
    <section class="study-section">
      <h3>Explicación sencilla</h3>
      <p>${concept.simple}</p>
    </section>
    <section class="study-section">
      <h3>Ejemplo clínico</h3>
      <p>${concept.example}</p>
    </section>
    <section class="study-section">
      <h3>No confundir con</h3>
      <div class="confusions">
        ${concept.confusion.map(item => `
          <div class="confusion-item">
            <strong>${item.term}</strong>
            <span>${item.difference}</span>
          </div>
        `).join("")}
      </div>
    </section>
    <button class="primary-button" data-route="juego" data-concept-id="${concept.id}">▶ Practicar este concepto</button>
    <button class="ghost-button" data-hard="${concept.id}">${isHard ? "★ Marcado como difícil" : "☆ Marcar como difícil"}</button>
  `;
}

function renderQuiz(isMobile) {
  if (!triviaRound.active) startTriviaRound(selectedQuestionIndex);
  const question = currentTriviaQuestion();
  const questionNumber = triviaRound.current + 1;
  const title = triviaRound.mode === "concept" ? `Práctica: ${triviaRound.conceptName}` : "Trivia rápida";
  return `
    ${screenHeader(title, true)}
    <div class="progress-bar" style="--value:${(questionNumber / triviaRound.total) * 100}%"><div class="progress-fill"></div></div>
    <div class="quiz-meta">
      <span>Pregunta ${questionNumber} de ${triviaRound.total}</span>
      <span class="concept-category">Ronda: ${triviaRound.correct} aciertos · ${triviaRound.wrong} errores</span>
    </div>
    <p class="quiz-question">${question.question}</p>
    <div class="answers">
      ${question.options.map((option, index) => renderAnswer(option, index)).join("")}
    </div>
    <div class="action-footer">
      <div class="timer-row">
        <span>◷ <span data-timer>00:${String(timer).padStart(2, "0")}</span></span>
        <span>${question.category}</span>
      </div>
      <button class="primary-button" data-submit-quiz ${selectedAnswer ? "" : "disabled"}>Responder</button>
    </div>
  `;
}

function renderAnswer(option, index) {
  const letters = ["A.", "B.", "C.", "D."];
  return `
    <button class="answer-option ${selectedAnswer === option ? "selected" : ""}" data-answer="${escapeHtml(option)}">
      <span class="answer-dot"></span>
      <span>${letters[index] || ""} ${option}</span>
    </button>
  `;
}

function renderQuizResult(isMobile) {
  const result = {
    correct: false,
    answer: "",
    explanation: "",
    extra: "",
    selected: "Sin responder",
    pointsGained: 0,
    questionNumber: triviaRound.current + 1,
    total: triviaRound.total,
    isLast: false,
    ...(lastResult || {})
  };
  return `
    ${screenHeader("Resultado", true)}
    <section class="result-hero">
      <div>
        <div class="result-icon">${result.correct ? "✓" : "!"}</div>
        <p class="result-title">${result.correct ? "¡Correcto!" : "Casi, revisemos"}</p>
        <strong>${result.pointsGained || 0} puntos ganados</strong>
      </div>
    </section>
    <div class="score-strip">
      <div><span>Pregunta</span><strong>${result.questionNumber || 1}/${result.total || triviaRound.total}</strong></div>
      <div><span>Aciertos</span><strong>${triviaRound.correct}</strong></div>
      <div><span>Errores</span><strong>${triviaRound.wrong}</strong></div>
    </div>
    <p><strong>Tu respuesta:</strong> <span class="concept-category">${result.selected || selectedAnswer || "Sin responder"}</span></p>
    <p><strong>La respuesta es:</strong> <span class="concept-category">${result.answer}</span></p>
    <section class="study-section">
      <h3>Explicación</h3>
      <p>${result.explanation}</p>
    </section>
    <div class="result-box">${result.extra}</div>
    <button class="primary-button" data-next-question>${result.isLast ? "Ver resumen" : "Siguiente pregunta"}</button>
  `;
}

function renderQuizSummary(isMobile) {
  const total = triviaRound.total || TRIVIA_ROUND_SIZE;
  const percent = total ? Math.round((triviaRound.correct / total) * 100) : 0;
  const isConceptRound = triviaRound.mode === "concept";
  const message = percent >= 80
    ? isConceptRound
      ? `Muy bien. Ya reconoces ${triviaRound.conceptName} con seguridad.`
      : "Muy bien. Estás reconociendo los conceptos con seguridad."
    : percent >= 60
      ? isConceptRound
        ? "Vas bien. Conviene volver a mirar la ficha para afinar detalles."
        : "Vas bien. Conviene repasar los errores para afinar diferencias."
      : isConceptRound
        ? "Necesitas otra vuelta sobre este concepto antes de mezclarlo con la trivia general."
        : "Necesitas otra vuelta. Tus errores quedaron guardados para repaso.";

  return `
    ${screenHeader("Resumen de trivia", true)}
    <section class="result-hero">
      <div>
        <div class="result-icon">${percent >= 60 ? "✓" : "!"}</div>
        <p class="result-title">${percent}% de acierto</p>
        <strong>${triviaRound.points} puntos ganados</strong>
      </div>
    </section>
    <section class="score-strip">
      <div><span>Aciertos</span><strong>${triviaRound.correct}</strong></div>
      <div><span>Errores</span><strong>${triviaRound.wrong}</strong></div>
      <div><span>Total</span><strong>${total}</strong></div>
    </section>
    <div class="result-box">${message}</div>
    <div class="round-review">
      ${triviaRound.answers.map((item, index) => `
        <article class="round-review-item ${item.correct ? "correct" : "wrong"}">
          <strong>${index + 1}. ${item.correct ? "Correcta" : "Incorrecta"}</strong>
          <span>${item.question}</span>
          <small>Tu respuesta: ${item.selected} · Correcta: ${item.answer}</small>
        </article>
      `).join("")}
    </div>
    <button class="primary-button" data-route="juego" ${isConceptRound ? `data-concept-id="${selectedConceptId}"` : ""}>${isConceptRound ? "Repetir práctica" : "Jugar otra ronda"}</button>
    <button class="ghost-button" data-route="${isConceptRound ? "concepto" : "errores"}" ${isConceptRound ? `data-concept-id="${selectedConceptId}"` : ""}>${isConceptRound ? "Volver al concepto" : "Repasar errores"}</button>
  `;
}

function renderReview(isMobile) {
  const reviewItems = buildReviewItems();
  const reviewIndex = reviewItems.length ? selectedReviewIndex % reviewItems.length : 0;
  const item = reviewItems[reviewIndex];

  if (!item) {
    return `
      ${screenHeader("Repaso de errores", true)}
      <section class="empty-state panel">
        <h3>No hay errores pendientes</h3>
        <p class="muted">Cuando falles una trivia o un caso clínico, aparecerá aquí para repasarlo.</p>
        <button class="primary-button" data-route="juego">Ir a trivia</button>
      </section>
    `;
  }

  return `
    ${screenHeader("Repaso de errores", true)}
    <div class="progress-bar" style="--value:${((reviewIndex + 1) / reviewItems.length) * 100}%"><div class="progress-fill"></div></div>
    <div class="quiz-meta">
      <span>Error ${reviewIndex + 1} de ${reviewItems.length}</span>
      <span class="concept-category">${item.source}</span>
    </div>
    <p class="quiz-question">${item.question}</p>
    <div class="answers">
      ${item.options.map((option, index) => renderAnswer(option, index)).join("")}
    </div>
    <div class="action-footer">
      <span class="muted">${item.category}</span>
      <button class="primary-button" data-submit-review ${selectedAnswer ? "" : "disabled"}>Corregir error</button>
    </div>
  `;
}

function renderReviewResult(isMobile) {
  const result = { correct: false, answer: "", explanation: "", extra: "", source: "", pointsGained: 0, ...(lastResult || {}) };
  return `
    ${screenHeader("Resultado", true)}
    <section class="result-hero">
      <div>
        <div class="result-icon">${result.correct ? "✓" : "!"}</div>
        <p class="result-title">${result.correct ? "Error corregido" : "Sigue en repaso"}</p>
        <strong>${result.correct ? `+${result.pointsGained} puntos` : "0 puntos"}</strong>
      </div>
    </section>
    <p><strong>La respuesta es:</strong> <span class="concept-category">${result.answer}</span></p>
    <section class="study-section">
      <h3>Explicación</h3>
      <p>${result.explanation}</p>
    </section>
    <div class="result-box">${result.extra}</div>
    <button class="primary-button" data-next-review>Siguiente error</button>
  `;
}

function renderCases(isMobile) {
  const clinicalCase = cases[selectedCaseIndex];
  const caseNumber = selectedCaseIndex + 1;
  return `
    ${screenHeader("Caso clínico", true)}
    <div class="case-number">Caso #${String(clinicalCase.id).padStart(2, "0")}</div>
    <section class="score-strip">
      <div><span>Avance</span><strong>${Math.min(caseRoundStart + casesAnsweredInRound, cases.length)}/${cases.length}</strong></div>
      <div><span>Resueltos</span><strong>${solvedCaseCount(appState)}/${cases.length}</strong></div>
      <div><span>Correctos</span><strong>${appState.games.cases.correct}</strong></div>
    </section>
    <p class="case-text">${clinicalCase.text}</p>
    <p class="quiz-question">${clinicalCase.question}</p>
    <div class="answers">
      ${shuffledCaseOptions.map((option, index) => renderAnswer(option, index)).join("")}
    </div>
    <div class="action-footer">
      <button class="primary-button" data-submit-case ${selectedAnswer ? "" : "disabled"}>Responder</button>
    </div>
  `;
}

function renderTimeAttack(isMobile) {
  const questionSet = generalTriviaQuestions();
  const question = questionSet[selectedTimedQuestionIndex % questionSet.length];
  return `
    ${screenHeader("Desafío contrarreloj", true)}
    <section class="score-strip">
      <div><span>Tiempo</span><strong><span data-timer>00:${String(timer).padStart(2, "0")}</span></strong></div>
      <div><span>Aciertos</span><strong>${timeAttackScore}</strong></div>
      <div><span>Mejor</span><strong>${appState.games.timeAttack.bestScore}</strong></div>
    </section>
    <p class="quiz-question">${question.question}</p>
    <div class="answers">
      ${question.options.map((option, index) => renderAnswer(option, index)).join("")}
    </div>
    <div class="action-footer">
      <span class="muted">${question.category}</span>
      <button class="primary-button" data-submit-time ${selectedAnswer ? "" : "disabled"}>Responder rápido</button>
      <button class="ghost-button" data-finish-time>Terminar intento</button>
    </div>
  `;
}

function renderTimeAttackResult(isMobile) {
  const result = {
    score: timeAttackScore,
    answered: timeAttackAnswered,
    bestScore: appState.games.timeAttack.bestScore,
    reason: "manual",
    ...(lastResult || {})
  };
  return `
    ${screenHeader("Fin del desafío", true)}
    <section class="result-hero">
      <div>
        <div class="result-icon">◷</div>
        <p class="result-title">${result.score} aciertos</p>
        <strong>${result.reason === "time" ? "Tiempo terminado" : "Intento cerrado"}</strong>
      </div>
    </section>
    <div class="result-box">
      Respondiste ${result.answered} preguntas. Tu mejor marca guardada es ${result.bestScore}.
    </div>
    <button class="primary-button" data-route="contrarreloj">Jugar otra vez</button>
  `;
}

function renderCaseResult(isMobile) {
  const result = { correct: false, selected: "", answer: "", explanation: "", keys: [], pointsGained: 0, ...(lastResult || {}) };
  const keys = Array.isArray(result.keys) ? result.keys : [];
  const hasNextPending = cases.some((clinicalCase, index) => {
    return index > selectedCaseIndex && !appState.solvedCases.includes(clinicalCase.id);
  });
  return `
    ${screenHeader(result.correct ? "Caso resuelto" : "Revisar caso", true)}
    <section class="result-hero">
      <div>
        <div class="result-icon">${result.correct ? "✓" : "!"}</div>
        <p class="result-title">${result.correct ? "Correcto" : "No fue correcto"}</p>
        <strong>${result.correct ? `+${result.pointsGained} puntos` : "Sigue pendiente"}</strong>
      </div>
    </section>
    <p><strong>Tu respuesta:</strong> <span class="concept-category">${result.selected || "Sin responder"}</span></p>
    <p><strong>Respuesta correcta:</strong> <span class="concept-category">${result.answer}</span></p>
    <section class="study-section">
      <h3>¿Por qué?</h3>
      <p>${result.explanation}</p>
    </section>
    <div class="result-box">
      <strong>Características clave:</strong>
      <ul class="key-list">
        ${keys.map(key => `<li>${key}</li>`).join("")}
      </ul>
    </div>
    <div class="result-box">
      ${result.correct
        ? "Este caso ya cuenta como resuelto."
        : "Este caso se mantiene pendiente para que lo vuelvas a intentar."}
    </div>
    <button class="primary-button" data-next-case>${hasNextPending ? "Siguiente pendiente" : "Ver resumen"}</button>
  `;
}

function renderCaseSummary(isMobile) {
  const solved = solvedCaseCount(appState);
  const total = cases.length;
  const pending = total - solved;
  return `
    ${screenHeader("Resumen de casos", true)}
    <section class="result-hero">
      <div>
        <div class="result-icon">${pending ? "!" : "✓"}</div>
        <p class="result-title">${pending ? "Ronda terminada" : "Casos completados"}</p>
        <strong>${solved} de ${total} casos resueltos</strong>
      </div>
    </section>
    <div class="result-box">
      ${pending
        ? `Te quedan ${pending} caso${pending === 1 ? "" : "s"} por resolver correctamente.`
        : "Ya resolviste todos los casos clínicos disponibles."}
    </div>
    <button class="primary-button" data-route="casos">${pending ? "Practicar pendientes" : "Repetir casos"}</button>
    <button class="ghost-button" data-route="inicio">Volver al inicio</button>
  `;
}

function renderAchievements(isMobile) {
  const unlocked = achievements.filter(item => item.check(appState));
  const locked = achievements.filter(item => !item.check(appState));
  return `
    ${screenHeader("Logros", isMobile)}
    <section class="achievements-head">
      <div>
        <p class="muted">Racha actual</p>
        <h2>🔥 ${appState.streak} días seguidos</h2>
      </div>
      <div class="trophy-art">🏆</div>
    </section>
    <div class="section-title">Medallas obtenidas</div>
    <div class="achievement-grid">
      ${unlocked.map(renderAchievement).join("") || `<div class="empty-state">Aún no hay medallas.</div>`}
    </div>
    <div class="section-title">Próximos logros</div>
    <div class="achievement-grid">
      ${locked.map(item => renderAchievement(item, true)).join("")}
    </div>
  `;
}

function renderAchievement(item, locked = false) {
  return `
    <article class="achievement ${locked ? "locked" : ""}">
      <div class="medal">${locked ? "⌧" : item.icon}</div>
      <strong>${item.label}</strong>
    </article>
  `;
}

function renderProfile(isMobile) {
  return `
    ${screenHeader("Perfil", true)}
    <section class="profile-card">
      <dl>
        <div><dt>Estudiante</dt><dd>Psicología I</dd></div>
        <div><dt>Nivel</dt><dd>${levelName()}</dd></div>
        <div><dt>Puntos</dt><dd>${appState.points}/${MAX_POINTS}</dd></div>
        <div><dt>Racha actual</dt><dd>${appState.streak} días</dd></div>
        <div><dt>Conceptos estudiados</dt><dd>${appState.studied.length}/${conceptTotal()}</dd></div>
        <div><dt>Trivia rápida</dt><dd>${appState.games.trivia.correct}/${appState.games.trivia.attempts}</dd></div>
        <div><dt>Precisión en trivia</dt><dd>${accuracy(appState.games.trivia.correct, appState.games.trivia.attempts)}</dd></div>
        <div><dt>Casos clínicos</dt><dd>${appState.games.cases.correct}/${appState.games.cases.attempts}</dd></div>
        <div><dt>Errores corregidos</dt><dd>${appState.games.errors.corrected}/${appState.games.errors.attempts}</dd></div>
        <div><dt>Mejor contrarreloj</dt><dd>${appState.games.timeAttack.bestScore}</dd></div>
        <div><dt>Errores pendientes</dt><dd>${buildReviewItems().length}</dd></div>
      </dl>
    </section>
    <button class="ghost-button" data-reset>Reiniciar progreso</button>
  `;
}

function levelName() {
  if (appState.points >= MAX_POINTS) return "Experto en semiología";
  if (appState.points >= 2200) return "Evaluador psicopatológico";
  if (appState.points >= 1500) return "Analista semiológico";
  if (appState.points >= 700) return "Estudiante clínico";
  return "Observador";
}

function accuracy(correct, attempts) {
  if (!attempts) return "0%";
  return `${Math.round((correct / attempts) * 100)}%`;
}

function bindEvents() {
  document.querySelectorAll("[data-route]").forEach(button => {
    button.addEventListener("click", () => {
      const nextRoute = button.dataset.route;
      const conceptId = button.dataset.conceptId ? Number(button.dataset.conceptId) : undefined;
      navigate(nextRoute, { conceptId });
    });
  });

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      render();
      focusSearch();
    });
  });

  document.querySelectorAll("[data-answer]").forEach(button => {
    button.addEventListener("click", () => {
      selectedAnswer = button.dataset.answer;
      render();
    });
  });

  document.querySelectorAll("#searchInput").forEach(input => {
    input.addEventListener("input", event => {
      searchTerm = event.target.value;
      render();
      focusSearch();
    });
  });

  document.querySelectorAll("[data-submit-quiz]").forEach(button => {
    button.addEventListener("click", () => submitQuiz());
  });

  document.querySelectorAll("[data-submit-case]").forEach(button => {
    button.addEventListener("click", submitCase);
  });

  document.querySelectorAll("[data-submit-review]").forEach(button => {
    button.addEventListener("click", submitReview);
  });

  document.querySelectorAll("[data-submit-time]").forEach(button => {
    button.addEventListener("click", submitTimeAttack);
  });

  document.querySelectorAll("[data-finish-time]").forEach(button => {
    button.addEventListener("click", () => finishTimeAttack("manual"));
  });

  document.querySelectorAll("[data-next-question]").forEach(button => {
    button.addEventListener("click", nextQuestion);
  });

  document.querySelectorAll("[data-next-case]").forEach(button => {
    button.addEventListener("click", nextCase);
  });

  document.querySelectorAll("[data-next-review]").forEach(button => {
    button.addEventListener("click", nextReview);
  });

  document.querySelectorAll("[data-hard]").forEach(button => {
    button.addEventListener("click", () => toggleHard(Number(button.dataset.hard)));
  });

  document.querySelectorAll("[data-reset]").forEach(button => {
    button.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      appState = loadState();
      selectedQuestionIndex = appState.games.trivia.lastIndex % generalTriviaQuestions().length;
      selectedCaseIndex = appState.games.cases.lastIndex % cases.length;
      shuffledCaseOptions = shuffleArray([...cases[selectedCaseIndex].options]);
      caseRoundStart = 0;
      casesAnsweredInRound = 0;
      selectedReviewIndex = appState.games.errors.lastIndex;
      selectedTimedQuestionIndex = appState.games.timeAttack.lastIndex % generalTriviaQuestions().length;
      navigate("inicio");
    });
  });
}

function focusSearch() {
  requestAnimationFrame(() => {
    const inputs = document.querySelectorAll("#searchInput");
    const searchInput = Array.from(inputs).find(el => el.offsetParent !== null) || inputs[0];
    if (searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    }
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

render();
