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
  { id: "relacion",     name: "Psicopatología de las Funciones de Relación",                                             category: "Funciones de relación", icon: "R", color: "#5d9b8f" },
  { id: "sindromes",    name: "Psicopatología I: Semiología y Fenomenología – Síndromes",                                              category: "Síndromes",               icon: "S", color: "#58c4c7" }
];

const concepts = [
  makeConcept(
    1,
    "Hipomnesia",
    "memoria",
    "Memoria",
    "Semiología",
    "Disminución de la memoria. Hipomnesia de fijación o anterógrada. Cuando la deficiencia se refiere a hechos ocurridos recientemente. Hipomnesia es de evocación o retrógrada. Incapacidad para recordar el pasado, o, dicho de otro modo, como la incapacidad para recuperar información que había sido almacenada con anterioridad al inicio del cuadro.",
    "Disminución de la memoria.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Disminución de la memoria.",
    [
      { term: "Amnesias", difference: "Hipomnesia se define en el documento como: Disminución de la memoria." }, { term: "Pseudoamnesia", difference: "Hipomnesia se define en el documento como: Disminución de la memoria." }
    ],
    "Media"
  ),
  makeConcept(
    2,
    "Amnesias",
    "memoria",
    "Memoria",
    "Semiología",
    "La amnesia es la pérdida total o casi total de la memoria relacionada con un período de la vida del paciente. No debemos confundir la verdadera amnesia de la que puede presentarse en pacientes que han tenido un estado de toma de conciencia, pues en ellos no ha podido fijarse la imagen del recuerdo o imagen mnésica, dada la profunda afección de su sistema nervioso que se lo ha imposibilitado. Amnesia de fijación: Es la incapacidad para consolidar nuevos recuerdos. Cuando una persona padece este tipo de amnesia, se dice que \"vive en el presente\", que no recordará nada de su pasado. Dentro de esto están las \"amnesias anterógradas\". Las amnesias anterógradas siempre son de causa orgánica y se producen a consecuencia de un acontecimiento de índole neurológico. Amnesia de conservación: Es la incapacidad de recordar algo, una pérdida de recuerdos de los que ya están almacenados. No todos los recuerdos tienen la misma facilidad de ser olvidados. La \"Ley de Ribot\" dice que aquellos recuerdos más recientes, menos organizados y automatizados, son más vulnerables a que se pierdan. Hay diferentes tipos de amnesia de conservación. Global: Una persona puede llegar a perder todos los recuerdos de su pasado. Lacunar: Los recuerdos que se pierden están delimitados en el tiempo. Selectivas: Se dividen en dos tipos:  Episódicas: Se olvida un acontecimiento específico de la vida.  Semánticas: Lo que se pierden son los conocimientos, o ciertos tipos de conocimientos. Amnesia de evocación: Cuando el recuerdo no se pierde, pero es muy difícil traerlo a la memoria, cuando la persona no recuerda algo, pero tiene la sensación de saberlo. Tal vez esto pueda deberse a un estado emocional alterado (mucha ansiedad), astenia, falta de atención, exposición a contenido que interfiere en la capacidad para recuperar información, etc.",
    "La amnesia es la pérdida total o casi total de la memoria relacionada con un período de la vida del paciente.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La amnesia es la pérdida total o casi total de la memoria relacionada con un período de la vida del paciente.",
    [
      { term: "Hipomnesia", difference: "Amnesias se define en el documento como: La amnesia es la pérdida total o casi total de la memoria relacionada con un período de la vida del paciente." }, { term: "Pseudoamnesia", difference: "Amnesias se define en el documento como: La amnesia es la pérdida total o casi total de la memoria relacionada con un período de la vida del paciente." }
    ],
    "Alta"
  ),
  makeConcept(
    3,
    "Pseudoamnesia",
    "memoria",
    "Memoria",
    "Semiología",
    "Pseudoamnesia: Las personas con esta alteración de la memoria tienen la sensación de que han perdido la memoria, pero objetivamente no hay tal pérdida. Las agnosias, por ejemplo, son amnesias sensoriales, no se reconoce algo que se ve, se toca, se huele, etc. Este tipo de amnesia es de causa orgánica.",
    "Pseudoamnesia: Las personas con esta alteración de la memoria tienen la sensación de que han perdido la memoria, pero objetivamente no hay tal pérdida.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Pseudoamnesia: Las personas con esta alteración de la memoria tienen la sensación de que han perdido la memoria, pero objetivamente no hay tal pérdida.",
    [
      { term: "Amnesias", difference: "Pseudoamnesia se define en el documento como: Pseudoamnesia: Las personas con esta alteración de la memoria tienen la sensación de que han perdido la memoria, pero objetivamente no hay tal pérdida." }, { term: "Hipermnesia", difference: "Pseudoamnesia se define en el documento como: Pseudoamnesia: Las personas con esta alteración de la memoria tienen la sensación de que han perdido la memoria, pero objetivamente no hay tal pérdida." }
    ],
    "Media"
  ),
  makeConcept(
    4,
    "Hipermnesia",
    "memoria",
    "Memoria",
    "Semiología",
    "Aumento exagerado de los recuerdos. Estos pacientes son capaces de reproducir todos los detalles de sucesos pasados que incluso aparentemente no habían despertado su atención.",
    "Aumento exagerado de los recuerdos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Aumento exagerado de los recuerdos.",
    [
      { term: "Pseudoamnesia", difference: "Hipermnesia se define en el documento como: Aumento exagerado de los recuerdos." }, { term: "Pseudohipermnesias", difference: "Hipermnesia se define en el documento como: Aumento exagerado de los recuerdos." }
    ],
    "Media"
  ),
  makeConcept(
    5,
    "Pseudohipermnesias",
    "memoria",
    "Memoria",
    "Semiología",
    "Evocación repetitiva de recuerdos, por ejemplo, relacionados con la patología del paciente y que los puede usar para afianzar su argumentación. Puede darse en población normal (p. ej., flashes de vivencias pasadas)",
    "Evocación repetitiva de recuerdos, por ejemplo, relacionados con la patología del paciente y que los puede usar para afianzar su argumentación.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Evocación repetitiva de recuerdos, por ejemplo, relacionados con la patología del paciente y que los puede usar para afianzar su argumentación.",
    [
      { term: "Ecmnesia", difference: "Pseudohipermnesias se define en el documento como: Evocación repetitiva de recuerdos, por ejemplo, relacionados con la patología del paciente y que los puede usar para afianzar su argumentación." }, { term: "Hipermnesia", difference: "Pseudohipermnesias se define en el documento como: Evocación repetitiva de recuerdos, por ejemplo, relacionados con la patología del paciente y que los puede usar para afianzar su argumentación." }
    ],
    "Media"
  ),
  makeConcept(
    6,
    "Ecmnesia",
    "memoria",
    "Memoria",
    "Semiología",
    "Se produce cuando el sujeto cree estar en el pasado, lo que supone revivir con gran implicación emocional vivencias del pasado. Se produce una pérdida de la orientación en el presente. El delirio ecmésico hace referencia a la sensación de revivir algún recuerdo auténtico como si fuera presente en un proceso delirante o alucinatorio.",
    "Se produce cuando el sujeto cree estar en el pasado, lo que supone revivir con gran implicación emocional vivencias del pasado.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se produce cuando el sujeto cree estar en el pasado, lo que supone revivir con gran implicación emocional vivencias del pasado.",
    [
      { term: "Paramnesias", difference: "Ecmnesia se define en el documento como: Se produce cuando el sujeto cree estar en el pasado, lo que supone revivir con gran implicación emocional vivencias del pasado." }, { term: "Pseudohipermnesias", difference: "Ecmnesia se define en el documento como: Se produce cuando el sujeto cree estar en el pasado, lo que supone revivir con gran implicación emocional vivencias del pasado." }
    ],
    "Media"
  ),
  makeConcept(
    7,
    "Paramnesias",
    "memoria",
    "Memoria",
    "Semiología",
    "Deformidad de los recuerdos. Creen recordar hechos reales pero deformados, o sencillamente están seguros de recordar hechos que en la realidad no les han ocurrido antes. Es importante diferenciar la paramnesia de la mentira, también llamada pseudología fantástica.",
    "Deformidad de los recuerdos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Deformidad de los recuerdos.",
    [
      { term: "Confabulaciones", difference: "Paramnesias se define en el documento como: Deformidad de los recuerdos." }, { term: "Ecmnesia", difference: "Paramnesias se define en el documento como: Deformidad de los recuerdos." }
    ],
    "Media"
  ),
  makeConcept(
    8,
    "Confabulaciones",
    "memoria",
    "Memoria",
    "Semiología",
    "Mezcla de recuerdos falsos y verdaderos. La persona relata cosas que no han sucedido intentando compensar la pérdida de la memoria respecto a lo que se quiere recordar.",
    "Mezcla de recuerdos falsos y verdaderos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Mezcla de recuerdos falsos y verdaderos.",
    [
      { term: "Paramnesias", difference: "Confabulaciones se define en el documento como: Mezcla de recuerdos falsos y verdaderos." }, { term: "Parapraxias", difference: "Confabulaciones se define en el documento como: Mezcla de recuerdos falsos y verdaderos." }
    ],
    "Media"
  ),
  makeConcept(
    9,
    "Parapraxias",
    "memoria",
    "Memoria",
    "Semiología",
    "Errores de memoria simples, como el olvido de nombres, fechas, el fenómeno de \"en la punta de la lengua\" Por tanto, estos términos hacen referencia tanto a distorsiones en el recuerdo como en el reconocimiento. Es importante señalar que se producen tanto en población normal como clínica, por lo que no necesariamente están asociados a alteraciones mnésicas",
    "Errores de memoria simples, como el olvido de nombres, fechas, el fenómeno de \"en la punta de la lengua\" Por tanto, estos términos hacen referencia tanto a distorsiones en el recuerdo como en el reconocimiento.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Errores de memoria simples, como el olvido de nombres, fechas, el fenómeno de \"en la punta de la lengua\" Por tanto, estos términos hacen referencia tanto a distorsiones en el...",
    [
      { term: "Confabulaciones", difference: "Parapraxias se define en el documento como: Errores de memoria simples, como el olvido de nombres, fechas, el fenómeno de \"en la punta de la lengua\" Por tanto, estos términos hacen referencia tanto a distorsiones en el..." }, { term: "Déjà vu o falso reconocimiento positivo", difference: "Parapraxias se define en el documento como: Errores de memoria simples, como el olvido de nombres, fechas, el fenómeno de \"en la punta de la lengua\" Por tanto, estos términos hacen referencia tanto a distorsiones en el..." }
    ],
    "Media"
  ),
  makeConcept(
    10,
    "Déjà vu o falso reconocimiento positivo",
    "memoria",
    "Memoria",
    "Semiología",
    "Se experimenta que algo ya se había visto antes cuando realmente sabemos que es la primera vez que lo vemos. Dos fenómenos asociados: Pseudopresentimiento: Sensación de haber visto un suceso que hubiera sido capaz de predecir. Paramnesia reduplicativa: Falso reconocimiento (afirmar, por ejemplo, que se estuvo en el mismo lugar anteriormente siendo la primera vez que está). Frecuente en el síndrome de Korsakoff, los estados confusionales y las demencias",
    "Se experimenta que algo ya se había visto antes cuando realmente sabemos que es la primera vez que lo vemos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se experimenta que algo ya se había visto antes cuando realmente sabemos que es la primera vez que lo vemos.",
    [
      { term: "Jamais vu o falso reconocimiento negativo", difference: "Déjà vu o falso reconocimiento positivo se define en el documento como: Se experimenta que algo ya se había visto antes cuando realmente sabemos que es la primera vez que lo vemos." }, { term: "Parapraxias", difference: "Déjà vu o falso reconocimiento positivo se define en el documento como: Se experimenta que algo ya se había visto antes cuando realmente sabemos que es la primera vez que lo vemos." }
    ],
    "Alta"
  ),
  makeConcept(
    11,
    "Jamais vu o falso reconocimiento negativo",
    "memoria",
    "Memoria",
    "Semiología",
    "El individuo reconoce y recuerda una situación, pero no experimenta sensación de familiaridad alguna. Fenómeno relacionado: pérdida del significado de las palabras, en el que se produce una articulación correcta de la palabra, pero sin significado cuando se presta atención a la misma.",
    "El individuo reconoce y recuerda una situación, pero no experimenta sensación de familiaridad alguna.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El individuo reconoce y recuerda una situación, pero no experimenta sensación de familiaridad alguna.",
    [
      { term: "Criptoamnesia", difference: "Jamais vu o falso reconocimiento negativo se define en el documento como: El individuo reconoce y recuerda una situación, pero no experimenta sensación de familiaridad alguna." }, { term: "Déjà vu o falso reconocimiento positivo", difference: "Jamais vu o falso reconocimiento negativo se define en el documento como: El individuo reconoce y recuerda una situación, pero no experimenta sensación de familiaridad alguna." }
    ],
    "Media"
  ),
  makeConcept(
    12,
    "Criptoamnesia",
    "memoria",
    "Memoria",
    "Semiología",
    "Un recuerdo no es vivido como tal, sino que se tiene la certeza que es una producción original y propia (autogenerada), experimentada por primera vez. Fallo en el reconocimiento de ideas ya conocidas. Es, por tanto, una anomalía en el reconocimiento junto a una ausencia de sensación de familiaridad",
    "Un recuerdo no es vivido como tal, sino que se tiene la certeza que es una producción original y propia (autogenerada), experimentada por primera vez.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Un recuerdo no es vivido como tal, sino que se tiene la certeza que es una producción original y propia (autogenerada), experimentada por primera vez.",
    [
      { term: "Jamais vu o falso reconocimiento negativo", difference: "Criptoamnesia se define en el documento como: Un recuerdo no es vivido como tal, sino que se tiene la certeza que es una producción original y propia (autogenerada), experimentada por primera vez." }, { term: "Déjà vu o falso reconocimiento positivo", difference: "Criptoamnesia se define en el documento como: Un recuerdo no es vivido como tal, sino que se tiene la certeza que es una producción original y propia (autogenerada), experimentada por primera vez." }
    ],
    "Media"
  ),
  makeConcept(
    13,
    "Eutimia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Estado de ánimo equilibrado, caracterizado por una sensación de bienestar y tranquilidad",
    "Estado de ánimo equilibrado, caracterizado por una sensación de bienestar y tranquilidad",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Estado de ánimo equilibrado, caracterizado por una sensación de bienestar y tranquilidad",
    [
      { term: "Hipertimia", difference: "Eutimia se define en el documento como: Estado de ánimo equilibrado, caracterizado por una sensación de bienestar y tranquilidad" }, { term: "Hipotimia", difference: "Eutimia se define en el documento como: Estado de ánimo equilibrado, caracterizado por una sensación de bienestar y tranquilidad" }
    ],
    "Básica"
  ),
  makeConcept(
    14,
    "Hipertimia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "La euforia: Es un estado de ánimo también placentero, producido por una alegría inmotivada. El individuo está alegre, pero no sabe por qué está alegre. La moria: Es un estado de alegría \"insulsa\", \"sosa\", que no tiene sentido. Podríamos decir que es una \"alegría estúpida, tonta\" y puede verse en pacientes con tumoraciones cerebrales o retrasos intelectuales profundos. La hipomanía: Es un estado de exaltación del estado de ánimo o de alegría exagerada, donde el paciente muestra su grado elevado de satisfacción que no siempre concuerda con la realidad que lo circunda. Estos pacientes se muestran muy jocosos, chistosos, en extremo alegres, resultan muy simpáticos a los interlocutores. La manía: Es el grado máximo de exaltación del tono afectivo de un individuo y ese estado siempre se acompaña de una conducta excitada. Estos pacientes suelen ser en extremo inquietos, comienzan una actividad y no la terminan para luego comenzar otra, son en extremo simpáticos. Hacen chistes, se ponen a bailar, cantar, su conducta sexual es exagerada (hipererotismo).",
    "La euforia: Es un estado de ánimo también placentero, producido por una alegría inmotivada.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La euforia: Es un estado de ánimo también placentero, producido por una alegría inmotivada.",
    [
      { term: "Eutimia", difference: "Hipertimia se define en el documento como: La euforia: Es un estado de ánimo también placentero, producido por una alegría inmotivada." }, { term: "Hipotimia", difference: "Hipertimia se define en el documento como: La euforia: Es un estado de ánimo también placentero, producido por una alegría inmotivada." }
    ],
    "Alta"
  ),
  makeConcept(
    15,
    "Hipotimia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "En estos pacientes todas las reacciones emocionales se encuentran disminuidas. - Indiferencia afectiva: la indiferencia afectiva es la disminución de la reacción emocional de un sujeto ante situaciones que sí deben producirle algún tipo de respuesta afectiva. Estos pacientes no muestran ningún cambio o muy poco cambio en sus expresiones cuando en el medio se produce algún hecho que normalmente debe provocarle agrado, malestar, inconformidad, placer, etc.",
    "En estos pacientes todas las reacciones emocionales se encuentran disminuidas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: En estos pacientes todas las reacciones emocionales se encuentran disminuidas.",
    [
      { term: "Aplanamiento afectivo", difference: "Hipotimia se define en el documento como: En estos pacientes todas las reacciones emocionales se encuentran disminuidas." }, { term: "Hipertimia", difference: "Hipotimia se define en el documento como: En estos pacientes todas las reacciones emocionales se encuentran disminuidas." }
    ],
    "Alta"
  ),
  makeConcept(
    16,
    "Aplanamiento afectivo",
    "afectividad",
    "Afectividad",
    "Semiología",
    "podemos decir que el aplanamiento afectivo es el grado máximo de indiferencia afectiva. Es la ausencia de respuesta afectiva, por tanto, estamos en presencia de una atimia (a-partícula privativa, timia-afecto). Estos pacientes se muestran amímicos, o sea, que no tienen ninguna expresión en su mímica o gestos faciales que indiquen cambios en su estado anímico. Hemos visto a un paciente que ante la noticia del fallecimiento de su madre -a la que quería mucho- se ha mantenido totalmente inmutable. No ha mostrado tristeza alguna ni se ha comportado como si la noticia le causara sorpresa siquiera. Estos síntomas son característicos de los procesos esquizofrénicos.",
    "podemos decir que el aplanamiento afectivo es el grado máximo de indiferencia afectiva.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: podemos decir que el aplanamiento afectivo es el grado máximo de indiferencia afectiva.",
    [
      { term: "Ansiedad", difference: "Aplanamiento afectivo se define en el documento como: podemos decir que el aplanamiento afectivo es el grado máximo de indiferencia afectiva." }, { term: "Hipotimia", difference: "Aplanamiento afectivo se define en el documento como: podemos decir que el aplanamiento afectivo es el grado máximo de indiferencia afectiva." }
    ],
    "Alta"
  ),
  makeConcept(
    17,
    "Ansiedad",
    "afectividad",
    "Afectividad",
    "Semiología",
    "También llamada angustia. La ansiedad es una emoción que puede ser definida como respuesta emocional aprendida de naturaleza anticipatoria, que posee un alto valor funcional ya que nos avisa de la posible presencia de un peligro o amenaza y, por tanto, constituye una fuente poderosa de motivación pero que, en determinadas ocasiones, puede llegar a ser desproporcionada, irracional, y desadaptativa Sentimiento de inconformidad que tiene el sujeto, generalmente de una causa desconocida que se acompaña de cierta inquietud, a veces ligero temblor, lenguaje entrecortado, manifestaciones neurovegetativas tales como enrojecimiento o palidez de la cara, escalofríos, sudoración de manos y pies, a veces más generalizada, erizamiento de los vellos, palpitaciones, etc. la ansiedad tiene sus manifestaciones subjetivas y objetivas: Las manifestaciones subjetivas de la ansiedad: están dadas por esa sensación , que muchas veces el paciente traduce como opresión en el pecho y que en las personas normales puede observarse en ciertas y determinadas circunstancias tales como: asistir a un examen que vaya a definir nuestra carrera, el esperar un ómnibus en una parada cuando éste se demora y nosotros tenemos prisa, el esperar a una persona que tarda a una cita previamente establecida, etc. esa sensación de desasosiego que experimentamos en esos momentos, es lo que definimos como ansiedad subjetiva. Las manifestaciones objetivas de la ansiedad: están dadas por todas las alteraciones del sistema neurovegetativo que podemos observar en el paciente y por las alteraciones motoras que ya mencionamos con anterioridad. Las primeras están sometidas a la sensación experimentada por el paciente y que nosotros no podemos comprobar. De ahí su nombre de subjetivas. Las segundas sí pueden ser constatadas por el examinador, tales como el temblor, la sudoración de las manos, la palidez o enrojecimiento de la cara, la inquietud, etc. De ahí su nombre de objetivas. La ansiedad como síntoma, constituye el núcleo central de todas las neurosis, pero también puede verse en otros cuadros psiquiátricos.",
    "También llamada angustia.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: También llamada angustia.",
    [
      { term: "Aplanamiento afectivo", difference: "Ansiedad se define en el documento como: También llamada angustia." }, { term: "Depresión", difference: "Ansiedad se define en el documento como: También llamada angustia." }
    ],
    "Alta"
  ),
  makeConcept(
    18,
    "Depresión",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Al igual que ocurría con la ansiedad, el término «depresión» puede aludir: a) Una circunstancia anímica (caracterizada por sentimientos de tristeza y decaimiento), adaptativa y frecuente en la vida cotidiana de las personas. b) Un síntoma cuando el estado de ánimo decaído, abatido o triste (disfórico) no es proporcional en intensidad y o duración a las circunstancias del contexto, estando presente en una amplia variedad de cuadros psicopatológicos y de condiciones médicas. c) Un síndrome o cuadro clínico que constituye un conjunto o patrón de síntomas que covarían entre sí. En este último caso, deben estar presentes otros síntomas distintos del estado de ánimo triste o abatido.",
    "Al igual que ocurría con la ansiedad, el término «depresión» puede aludir: a) Una circunstancia anímica (caracterizada por sentimientos de tristeza y decaimiento), adaptativa y frecuente en la vida cotidiana...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Al igual que ocurría con la ansiedad, el término «depresión» puede aludir: a) Una circunstancia anímica (caracterizada por sentimientos de tristeza y decaimiento), adaptativa y...",
    [
      { term: "Anhedonia", difference: "Depresión se define en el documento como: Al igual que ocurría con la ansiedad, el término «depresión» puede aludir: a) Una circunstancia anímica (caracterizada por sentimientos de tristeza y decaimiento), adaptativa y..." }, { term: "Ansiedad", difference: "Depresión se define en el documento como: Al igual que ocurría con la ansiedad, el término «depresión» puede aludir: a) Una circunstancia anímica (caracterizada por sentimientos de tristeza y decaimiento), adaptativa y..." }
    ],
    "Alta"
  ),
  makeConcept(
    19,
    "Anhedonia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Hace referencia a la pérdida de la capacidad para experimentar alegría y placer. Se trata de una subcategoría dentro de la sintomatología de disminución de intensidad de las emociones. La anhedonia se caracteriza por la incapacidad total de disfrutar de la vida, incluyendo a los acontecimientos u objetos de la vida diaria; una «pérdida de la capacidad para experimentar placer»",
    "Hace referencia a la pérdida de la capacidad para experimentar alegría y placer.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Hace referencia a la pérdida de la capacidad para experimentar alegría y placer.",
    [
      { term: "Ambivalencia afectiva", difference: "Anhedonia se define en el documento como: Hace referencia a la pérdida de la capacidad para experimentar alegría y placer." }, { term: "Depresión", difference: "Anhedonia se define en el documento como: Hace referencia a la pérdida de la capacidad para experimentar alegría y placer." }
    ],
    "Media"
  ),
  makeConcept(
    20,
    "Ambivalencia afectiva",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Reacción emocional doble de un sujeto frente a una situación dada, con un sentido contrapuesto. Como observamos, el paciente tiene dos reacciones emocionales contrapuestas ante un mismo estímulo. De ahí su nombre de ambivalencia.",
    "Reacción emocional doble de un sujeto frente a una situación dada, con un sentido contrapuesto.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Reacción emocional doble de un sujeto frente a una situación dada, con un sentido contrapuesto.",
    [
      { term: "Anhedonia", difference: "Ambivalencia afectiva se define en el documento como: Reacción emocional doble de un sujeto frente a una situación dada, con un sentido contrapuesto." }, { term: "Paratimia o afecto discordante", difference: "Ambivalencia afectiva se define en el documento como: Reacción emocional doble de un sujeto frente a una situación dada, con un sentido contrapuesto." }
    ],
    "Media"
  ),
  makeConcept(
    21,
    "Paratimia o afecto discordante",
    "afectividad",
    "Afectividad",
    "Semiología",
    "También llamada afecto discordante Reacción emocional contrapuesta a la que habitualmente debe producirle a un sujeto una situación dada. Característicos de la esquizofrenia.",
    "También llamada afecto discordante Reacción emocional contrapuesta a la que habitualmente debe producirle a un sujeto una situación dada.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: También llamada afecto discordante Reacción emocional contrapuesta a la que habitualmente debe producirle a un sujeto una situación dada.",
    [
      { term: "Ambivalencia afectiva", difference: "Paratimia o afecto discordante se define en el documento como: También llamada afecto discordante Reacción emocional contrapuesta a la que habitualmente debe producirle a un sujeto una situación dada." }, { term: "Catatimia", difference: "Paratimia o afecto discordante se define en el documento como: También llamada afecto discordante Reacción emocional contrapuesta a la que habitualmente debe producirle a un sujeto una situación dada." }
    ],
    "Media"
  ),
  makeConcept(
    22,
    "Catatimia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Estado afectivo intenso hacia alguna persona que es capaz de interferir en la percepción real que sobre la conducta de ese sujeto se pueda tener. Por ejemplo: el afecto inmenso que una madre siente por un hijo le impide aceptar que el mismo es un ladrón o un mentiroso.",
    "Estado afectivo intenso hacia alguna persona que es capaz de interferir en la percepción real que sobre la conducta de ese sujeto se pueda tener.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Estado afectivo intenso hacia alguna persona que es capaz de interferir en la percepción real que sobre la conducta de ese sujeto se pueda tener.",
    [
      { term: "Alexitimia", difference: "Catatimia se define en el documento como: Estado afectivo intenso hacia alguna persona que es capaz de interferir en la percepción real que sobre la conducta de ese sujeto se pueda tener." }, { term: "Paratimia o afecto discordante", difference: "Catatimia se define en el documento como: Estado afectivo intenso hacia alguna persona que es capaz de interferir en la percepción real que sobre la conducta de ese sujeto se pueda tener." }
    ],
    "Media"
  ),
  makeConcept(
    23,
    "Alexitimia",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Este término etimológicamente significa «la falta de palabras para los afectos». En el lenguaje psicopatológico generalmente se utiliza para describir la incapacidad para identificar o reconocer las propias emociones. Es decir, la persona muestra una escasa conciencia de sus estados emocionales, confusión respecto a los mismos y, por tanto, dificultades para expresarlos, describirlos y comunicarlos.",
    "Este término etimológicamente significa «la falta de palabras para los afectos».",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Este término etimológicamente significa «la falta de palabras para los afectos».",
    [
      { term: "Catatimia", difference: "Alexitimia se define en el documento como: Este término etimológicamente significa «la falta de palabras para los afectos»." }, { term: "Tenacidad afectiva", difference: "Alexitimia se define en el documento como: Este término etimológicamente significa «la falta de palabras para los afectos»." }
    ],
    "Media"
  ),
  makeConcept(
    24,
    "Tenacidad afectiva",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Persistencia de un estado afectivo prolongado en el tiempo, más de lo común. En mi criterio se pudiera interpretar como una perseveración afectiva Por ejemplo, odio hacia alguien que no ha hecho nada tan grave como para merecerlo.",
    "Persistencia de un estado afectivo prolongado en el tiempo, más de lo común.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Persistencia de un estado afectivo prolongado en el tiempo, más de lo común.",
    [
      { term: "Alexitimia", difference: "Tenacidad afectiva se define en el documento como: Persistencia de un estado afectivo prolongado en el tiempo, más de lo común." }, { term: "Incontinencia afectiva", difference: "Tenacidad afectiva se define en el documento como: Persistencia de un estado afectivo prolongado en el tiempo, más de lo común." }
    ],
    "Media"
  ),
  makeConcept(
    25,
    "Incontinencia afectiva",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Imposibilidad de contener de forma adecuada las reacciones emocionales Muchas veces provocadas por situaciones que no tienen esa gran relevancia para el sujeto.",
    "Imposibilidad de contener de forma adecuada las reacciones emocionales Muchas veces provocadas por situaciones que no tienen esa gran relevancia para el sujeto.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Imposibilidad de contener de forma adecuada las reacciones emocionales Muchas veces provocadas por situaciones que no tienen esa gran relevancia para el sujeto.",
    [
      { term: "Perplejidad afectiva", difference: "Incontinencia afectiva se define en el documento como: Imposibilidad de contener de forma adecuada las reacciones emocionales Muchas veces provocadas por situaciones que no tienen esa gran relevancia para el sujeto." }, { term: "Tenacidad afectiva", difference: "Incontinencia afectiva se define en el documento como: Imposibilidad de contener de forma adecuada las reacciones emocionales Muchas veces provocadas por situaciones que no tienen esa gran relevancia para el sujeto." }
    ],
    "Media"
  ),
  makeConcept(
    26,
    "Perplejidad afectiva",
    "afectividad",
    "Afectividad",
    "Semiología",
    "Estado producido por la presencia de extrañeza, desconfianza, falta de comprensión de los sucesos que le rodean al enfermo. Está presente en el estado confusional y a veces en cuadros psicóticos graves.",
    "Estado producido por la presencia de extrañeza, desconfianza, falta de comprensión de los sucesos que le rodean al enfermo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Estado producido por la presencia de extrañeza, desconfianza, falta de comprensión de los sucesos que le rodean al enfermo.",
    [
      { term: "Incontinencia afectiva", difference: "Perplejidad afectiva se define en el documento como: Estado producido por la presencia de extrañeza, desconfianza, falta de comprensión de los sucesos que le rodean al enfermo." }, { term: "Tenacidad afectiva", difference: "Perplejidad afectiva se define en el documento como: Estado producido por la presencia de extrañeza, desconfianza, falta de comprensión de los sucesos que le rodean al enfermo." }
    ],
    "Media"
  ),
  makeConcept(
    27,
    "Hiperestesias",
    "percepcion",
    "Percepción",
    "Semiología",
    "Aumento exagerado de las sensaciones frente a los estímulos sin que exista modificación del tipo de sensación que debe producir dicho estímulo. O sea que el paciente aqueja sentir desproporcionadamente intenso un estímulo que para otra persona normal no lo es.",
    "Aumento exagerado de las sensaciones frente a los estímulos sin que exista modificación del tipo de sensación que debe producir dicho estímulo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Aumento exagerado de las sensaciones frente a los estímulos sin que exista modificación del tipo de sensación que debe producir dicho estímulo.",
    [
      { term: "Hipoestesias", difference: "Hiperestesias se define en el documento como: Aumento exagerado de las sensaciones frente a los estímulos sin que exista modificación del tipo de sensación que debe producir dicho estímulo." }, { term: "Retardo o enlentecimiento de la percepción", difference: "Hiperestesias se define en el documento como: Aumento exagerado de las sensaciones frente a los estímulos sin que exista modificación del tipo de sensación que debe producir dicho estímulo." }
    ],
    "Media"
  ),
  makeConcept(
    28,
    "Hipoestesias",
    "percepcion",
    "Percepción",
    "Semiología",
    "La hipoestesia es la sensación opuesta al caso anterior. Existe es una disminución de la sensación habitual o normal, que debe producirse frente a un estímulo determinado. Entre ellas podemos señalar la hipoacusia que es la disminución de la audición",
    "La hipoestesia es la sensación opuesta al caso anterior.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La hipoestesia es la sensación opuesta al caso anterior.",
    [
      { term: "Hiperestesias", difference: "Hipoestesias se define en el documento como: La hipoestesia es la sensación opuesta al caso anterior." }, { term: "Retardo o enlentecimiento de la percepción", difference: "Hipoestesias se define en el documento como: La hipoestesia es la sensación opuesta al caso anterior." }
    ],
    "Media"
  ),
  makeConcept(
    29,
    "Retardo o enlentecimiento de la percepción",
    "percepcion",
    "Percepción",
    "Semiología",
    "Como su nombre indica es la lentitud que presenta el enfermo para percibir los fenómenos que se suceden a su alrededor, en relación con la unidad de tiempo. Este fenómeno es característico de las depresiones, sobre todo las de nivel psicótico.",
    "Como su nombre indica es la lentitud que presenta el enfermo para percibir los fenómenos que se suceden a su alrededor, en relación con la unidad de tiempo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Como su nombre indica es la lentitud que presenta el enfermo para percibir los fenómenos que se suceden a su alrededor, en relación con la unidad de tiempo.",
    [
      { term: "Anestesias", difference: "Retardo o enlentecimiento de la percepción se define en el documento como: Como su nombre indica es la lentitud que presenta el enfermo para percibir los fenómenos que se suceden a su alrededor, en relación con la unidad de tiempo." }, { term: "Hipoestesias", difference: "Retardo o enlentecimiento de la percepción se define en el documento como: Como su nombre indica es la lentitud que presenta el enfermo para percibir los fenómenos que se suceden a su alrededor, en relación con la unidad de tiempo." }
    ],
    "Media"
  ),
  makeConcept(
    30,
    "Anestesias",
    "percepcion",
    "Percepción",
    "Semiología",
    "Es la abolición o falta total de las sensaciones par uno o varios estímulos sensoriales. Las anestesias al sonido son las llamadas acusias o sorderas, las que tienen que ver con la visión son las cegueras, ambliopías o amaurosis, las que están relacionadas con el tacto son las táctiles y en estos casos el paciente pierde las sensaciones térmicas, dolorosas, etc. en su piel.",
    "Es la abolición o falta total de las sensaciones par uno o varios estímulos sensoriales.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es la abolición o falta total de las sensaciones par uno o varios estímulos sensoriales.",
    [
      { term: "Hiperalgesias", difference: "Anestesias se define en el documento como: Es la abolición o falta total de las sensaciones par uno o varios estímulos sensoriales." }, { term: "Retardo o enlentecimiento de la percepción", difference: "Anestesias se define en el documento como: Es la abolición o falta total de las sensaciones par uno o varios estímulos sensoriales." }
    ],
    "Media"
  ),
  makeConcept(
    31,
    "Hiperalgesias",
    "percepcion",
    "Percepción",
    "Semiología",
    "Percepción exagerada de la intensidad del dolor: \"cualquier golpecito, por pequeño que sea... es como si me dieran con un martillo, me retumba y me duele por todo el cuerpo\"",
    "Percepción exagerada de la intensidad del dolor: \"cualquier golpecito, por pequeño que sea...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Percepción exagerada de la intensidad del dolor: \"cualquier golpecito, por pequeño que sea...",
    [
      { term: "Anestesias", difference: "Hiperalgesias se define en el documento como: Percepción exagerada de la intensidad del dolor: \"cualquier golpecito, por pequeño que sea..." }, { term: "Hipoalgesias", difference: "Hiperalgesias se define en el documento como: Percepción exagerada de la intensidad del dolor: \"cualquier golpecito, por pequeño que sea..." }
    ],
    "Media"
  ),
  makeConcept(
    32,
    "Hipoalgesias",
    "percepcion",
    "Percepción",
    "Semiología",
    "Percepción muy escasa de estímulos que causan dolor: \"nada me afecta, nada me impresiona, me golpeo con la cabeza en la pared para ver si noto algo, pero apenas nada... como si fuera un colchón la pared\"",
    "Percepción muy escasa de estímulos que causan dolor: \"nada me afecta, nada me impresiona, me golpeo con la cabeza en la pared para ver si noto algo, pero apenas nada...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Percepción muy escasa de estímulos que causan dolor: \"nada me afecta, nada me impresiona, me golpeo con la cabeza en la pared para ver si noto algo, pero apenas nada...",
    [
      { term: "Analgesia", difference: "Hipoalgesias se define en el documento como: Percepción muy escasa de estímulos que causan dolor: \"nada me afecta, nada me impresiona, me golpeo con la cabeza en la pared para ver si noto algo, pero apenas nada..." }, { term: "Hiperalgesias", difference: "Hipoalgesias se define en el documento como: Percepción muy escasa de estímulos que causan dolor: \"nada me afecta, nada me impresiona, me golpeo con la cabeza en la pared para ver si noto algo, pero apenas nada..." }
    ],
    "Media"
  ),
  makeConcept(
    33,
    "Analgesia",
    "percepcion",
    "Percepción",
    "Semiología",
    "Ausencia total de percepción de dolor: de ahí que ciertos fármacos destinados a disminuir el dolor físico se denominen, genéricamente, \"analgésicos\" (otras veces aun es peor... me golpeo, veo la sangre, me tendría que estar retorciendo de dolor, pero nada, no noto nada).",
    "Ausencia total de percepción de dolor: de ahí que ciertos fármacos destinados a disminuir el dolor físico se denominen, genéricamente, \"analgésicos\" (otras veces aun es peor...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Ausencia total de percepción de dolor: de ahí que ciertos fármacos destinados a disminuir el dolor físico se denominen, genéricamente, \"analgésicos\" (otras veces aun es peor...",
    [
      { term: "Hipoalgesias", difference: "Analgesia se define en el documento como: Ausencia total de percepción de dolor: de ahí que ciertos fármacos destinados a disminuir el dolor físico se denominen, genéricamente, \"analgésicos\" (otras veces aun es peor..." }, { term: "Parestesias", difference: "Analgesia se define en el documento como: Ausencia total de percepción de dolor: de ahí que ciertos fármacos destinados a disminuir el dolor físico se denominen, genéricamente, \"analgésicos\" (otras veces aun es peor..." }
    ],
    "Media"
  ),
  makeConcept(
    34,
    "Parestesias",
    "percepcion",
    "Percepción",
    "Semiología",
    "Sensaciones erróneas de acuerdo con el estímulo producido. En este caso el sujeto ante el estímulo sensorial que debía producirle una sensación adecuada a él, le produce una sensación inadecuada. Igual ocurre que si al recibir un pinchazo en lugar de sentir dolor es un hormigueo o frío, etc.",
    "Sensaciones erróneas de acuerdo con el estímulo producido.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Sensaciones erróneas de acuerdo con el estímulo producido.",
    [
      { term: "Analgesia", difference: "Parestesias se define en el documento como: Sensaciones erróneas de acuerdo con el estímulo producido." }, { term: "Cenestopatías", difference: "Parestesias se define en el documento como: Sensaciones erróneas de acuerdo con el estímulo producido." }
    ],
    "Media"
  ),
  makeConcept(
    35,
    "Cenestopatías",
    "percepcion",
    "Percepción",
    "Semiología",
    "Son sensaciones imprecisas que el paciente refiere tener en sus órganos internos y o músculos. Habitualmente son desagradables para él y se queja de malestar interno que no puede precisar con exactitud como lo haría una persona al sentir dolor en una víscera, por ejemplo.",
    "Son sensaciones imprecisas que el paciente refiere tener en sus órganos internos y o músculos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Son sensaciones imprecisas que el paciente refiere tener en sus órganos internos y o músculos.",
    [
      { term: "Metamorfopsias o Dismegalopsias", difference: "Cenestopatías se define en el documento como: Son sensaciones imprecisas que el paciente refiere tener en sus órganos internos y o músculos." }, { term: "Parestesias", difference: "Cenestopatías se define en el documento como: Son sensaciones imprecisas que el paciente refiere tener en sus órganos internos y o músculos." }
    ],
    "Media"
  ),
  makeConcept(
    36,
    "Metamorfopsias o Dismegalopsias",
    "percepcion",
    "Percepción",
    "Semiología",
    "La metamorfosis es una alteración en el tamaño o la forma de los objetos que el paciente percibe. El sujeto refiere que ve las cosas mayores o menores que su tamaño real o sencillamente percibe modificada su forma, ya sea alargada, redondeada, más chata, etc. Macropsias o megalopsias, hace referencia a escala aumentada. Micropsias, hace referencia a pequeña escala.",
    "La metamorfosis es una alteración en el tamaño o la forma de los objetos que el paciente percibe.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La metamorfosis es una alteración en el tamaño o la forma de los objetos que el paciente percibe.",
    [
      { term: "Autometamorfopsias o alteración del esquema corporal", difference: "Metamorfopsias o Dismegalopsias se define en el documento como: La metamorfosis es una alteración en el tamaño o la forma de los objetos que el paciente percibe." }, { term: "Cenestopatías", difference: "Metamorfopsias o Dismegalopsias se define en el documento como: La metamorfosis es una alteración en el tamaño o la forma de los objetos que el paciente percibe." }
    ],
    "Media"
  ),
  makeConcept(
    37,
    "Autometamorfopsias o alteración del esquema corporal",
    "percepcion",
    "Percepción",
    "Semiología",
    "Distorsiones en la percepción del tamaño y o la forma del propio cuerpo. Percibe diferente en cuanto a su estatura o tamaño, a su grosor, a su forma en general o generalmente a alguna porción de su cuerpo, casi siempre a alguna extremidad, su cara o sus genitales.",
    "Distorsiones en la percepción del tamaño y o la forma del propio cuerpo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Distorsiones en la percepción del tamaño y o la forma del propio cuerpo.",
    [
      { term: "Escisión perceptiva", difference: "Autometamorfopsias o alteración del esquema corporal se define en el documento como: Distorsiones en la percepción del tamaño y o la forma del propio cuerpo." }, { term: "Metamorfopsias o Dismegalopsias", difference: "Autometamorfopsias o alteración del esquema corporal se define en el documento como: Distorsiones en la percepción del tamaño y o la forma del propio cuerpo." }
    ],
    "Media"
  ),
  makeConcept(
    38,
    "Escisión perceptiva",
    "percepcion",
    "Percepción",
    "Semiología",
    "El objeto percibido se desintegra en fragmentos o elementos. Percepción desintegrada de los diversos elementos de un mismo estímulo. Puede ceñirse a las formas \"morfolisis\" o a la disociación entre color y forma \"metacromía\" Por ejemplo, cuando está viendo la televisión experimenta la sensación de que existe una especie de \"competición\", e incluso conflicto, entre lo que oye y lo que ve, como si ambas sensaciones no tuvieran nada que ver entre sí, o como si procedieran de fuentes de estimulación diferentes y \"lucharan\" entre sí por atraer su atención. Las conexiones entre ambas modalidades sensoriales (auditiva y visual) han fracasado, o no se han establecido correctamente, y, por ello, la persona tiene la sensación de que proceden de fuentes diferentes y de que atraen al mismo tiempo sus recursos atencionales",
    "El objeto percibido se desintegra en fragmentos o elementos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El objeto percibido se desintegra en fragmentos o elementos.",
    [
      { term: "Aglutinación Perceptiva", difference: "Escisión perceptiva se define en el documento como: El objeto percibido se desintegra en fragmentos o elementos." }, { term: "Autometamorfopsias o alteración del esquema corporal", difference: "Escisión perceptiva se define en el documento como: El objeto percibido se desintegra en fragmentos o elementos." }
    ],
    "Alta"
  ),
  makeConcept(
    39,
    "Aglutinación Perceptiva",
    "percepcion",
    "Percepción",
    "Semiología",
    "Percepción unitaria de sensaciones que en la realidad se producen de forma diferenciada. Consiste en que las distintas cualidades sensoriales se funden en una única experiencia perceptiva. En este caso, la persona tiene dificultades, o es incapaz, de distinguir entre diferentes sensaciones.",
    "Percepción unitaria de sensaciones que en la realidad se producen de forma diferenciada.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Percepción unitaria de sensaciones que en la realidad se producen de forma diferenciada.",
    [
      { term: "Escisión perceptiva", difference: "Aglutinación Perceptiva se define en el documento como: Percepción unitaria de sensaciones que en la realidad se producen de forma diferenciada." }, { term: "Ilusiones", difference: "Aglutinación Perceptiva se define en el documento como: Percepción unitaria de sensaciones que en la realidad se producen de forma diferenciada." }
    ],
    "Media"
  ),
  makeConcept(
    40,
    "Ilusiones",
    "percepcion",
    "Percepción",
    "Semiología",
    "Es una mala interpretación de una percepción real, es decir, la persona interpreta un estímulo real de manera equivocada y se convierte en un error perceptivo. Para que ocurra la ilusión, el objeto debe encontrarse dentro del campo sensorial del sujeto, o sea, que en el lugar que se encuentra situado, la persona es capaz de percibirlo como un todo con todas sus cualidades. Por ejemplo, cuando, atemorizados por la oscuridad de la noche, en una calle desierta, creemos ver una persona allí donde se mueven algunas ramas por efecto del viento",
    "Es una mala interpretación de una percepción real, es decir, la persona interpreta un estímulo real de manera equivocada y se convierte en un error perceptivo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es una mala interpretación de una percepción real, es decir, la persona interpreta un estímulo real de manera equivocada y se convierte en un error perceptivo.",
    [
      { term: "Aglutinación Perceptiva", difference: "Ilusiones se define en el documento como: Es una mala interpretación de una percepción real, es decir, la persona interpreta un estímulo real de manera equivocada y se convierte en un error perceptivo." }, { term: "Pareidolias", difference: "Ilusiones se define en el documento como: Es una mala interpretación de una percepción real, es decir, la persona interpreta un estímulo real de manera equivocada y se convierte en un error perceptivo." }
    ],
    "Alta"
  ),
  makeConcept(
    41,
    "Pareidolias",
    "percepcion",
    "Percepción",
    "Semiología",
    "Se trata de una modalidad especial de ilusión en la cual el individuo proporciona una organización o estructura física y, en consecuencia, otorga un significado específico a un estímulo ambiguo, poco estructurado, sin una forma ni significado concretos y, por tanto, sujeto al juego libre de interpretación y búsqueda de significado. Ejemplos cotidianos de pareidolia son las \"caras\" que vemos dibujadas en el perfil de una montaña, en las nubes que observamos, o en las llamas que surgen de una chimenea.",
    "Se trata de una modalidad especial de ilusión en la cual el individuo proporciona una organización o estructura física y, en consecuencia, otorga un significado específico a un estímulo ambiguo, poco...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se trata de una modalidad especial de ilusión en la cual el individuo proporciona una organización o estructura física y, en consecuencia, otorga un significado específico a un...",
    [
      { term: "Ilusiones", difference: "Pareidolias se define en el documento como: Se trata de una modalidad especial de ilusión en la cual el individuo proporciona una organización o estructura física y, en consecuencia, otorga un significado específico a un..." }, { term: "Imágenes hipnapómpicas e hipnagógicas", difference: "Pareidolias se define en el documento como: Se trata de una modalidad especial de ilusión en la cual el individuo proporciona una organización o estructura física y, en consecuencia, otorga un significado específico a un..." }
    ],
    "Alta"
  ),
  makeConcept(
    42,
    "Imágenes hipnapómpicas e hipnagógicas",
    "percepcion",
    "Percepción",
    "Semiología",
    "Se las conoce también como alucinaciones fisiológicas, con base en la etiología que tienen. Estos dos tipos de imágenes se producen estados de seminconsciencia, en donde la persona se encuentra entre el sueño y la vigilia. Particularmente las imágenes hipnagógicas se originan cuando la persona sale del sueño, lo que sería estar entre el sueño y vigilia. Las imágenes hipnagógicas se originan cuando la persona entra en el sueño, es decir, entre la vigilia y el sueño. Ambas imágenes son autónomas ya que aparecen sin que el individuo pueda controlarlas",
    "Se las conoce también como alucinaciones fisiológicas, con base en la etiología que tienen.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se las conoce también como alucinaciones fisiológicas, con base en la etiología que tienen.",
    [
      { term: "Imágenes alucinoides", difference: "Imágenes hipnapómpicas e hipnagógicas se define en el documento como: Se las conoce también como alucinaciones fisiológicas, con base en la etiología que tienen." }, { term: "Pareidolias", difference: "Imágenes hipnapómpicas e hipnagógicas se define en el documento como: Se las conoce también como alucinaciones fisiológicas, con base en la etiología que tienen." }
    ],
    "Alta"
  ),
  makeConcept(
    43,
    "Imágenes alucinoides",
    "percepcion",
    "Percepción",
    "Semiología",
    "Estas imágenes se caracterizan por ser autónomas y subjetivas, por presentarse sin la presencia del estímulo que las active. Son originadas de forma interna, cuando se dan en el \"espacio negro de los ojos cerrados\". Cuya causa se atribuye a la fiebre con temperaturas muy altas o de manera externa cuya causa sería el consumo de drogas alucinógenas, a pesar de ser muy relacionadas a las alucinaciones en estas imágenes la persona es consciente que reconoce que esas imágenes son creadas por su mente y no existen en realidad.",
    "Estas imágenes se caracterizan por ser autónomas y subjetivas, por presentarse sin la presencia del estímulo que las active.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Estas imágenes se caracterizan por ser autónomas y subjetivas, por presentarse sin la presencia del estímulo que las active.",
    [
      { term: "Imágenes hipnapómpicas e hipnagógicas", difference: "Imágenes alucinoides se define en el documento como: Estas imágenes se caracterizan por ser autónomas y subjetivas, por presentarse sin la presencia del estímulo que las active." }, { term: "Imágenes mnémicas y eidéticas", difference: "Imágenes alucinoides se define en el documento como: Estas imágenes se caracterizan por ser autónomas y subjetivas, por presentarse sin la presencia del estímulo que las active." }
    ],
    "Alta"
  ),
  makeConcept(
    44,
    "Imágenes mnémicas y eidéticas",
    "percepcion",
    "Percepción",
    "Semiología",
    "Estas imágenes se relacionan con los recuerdos de cada persona, que son transformados con base en los deseos que tiene cada persona. Se caracterizan porque la persona puede crearlos voluntariamente y puede mantenerlos de igual manera, ya que, al momento de no mantenerlos voluntariamente, éstos se van desvaneciendo y así van desapareciendo.",
    "Estas imágenes se relacionan con los recuerdos de cada persona, que son transformados con base en los deseos que tiene cada persona.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Estas imágenes se relacionan con los recuerdos de cada persona, que son transformados con base en los deseos que tiene cada persona.",
    [
      { term: "Imágenes alucinoides", difference: "Imágenes mnémicas y eidéticas se define en el documento como: Estas imágenes se relacionan con los recuerdos de cada persona, que son transformados con base en los deseos que tiene cada persona." }, { term: "Imágenes consecutivas o postimágenes", difference: "Imágenes mnémicas y eidéticas se define en el documento como: Estas imágenes se relacionan con los recuerdos de cada persona, que son transformados con base en los deseos que tiene cada persona." }
    ],
    "Media"
  ),
  makeConcept(
    45,
    "Imágenes consecutivas o postimágenes",
    "percepcion",
    "Percepción",
    "Semiología",
    "Se conocen como post imágenes ya que estas se presentan después de una alta carga de información sensorial Además, la imagen que se produce tiene propiedades opuestas a las de la imagen original, hecho por el cual a veces se las denomina \"imágenes negativas\": por ejemplo, después de mirar un intenso color oscuro, se ve un color claro, o el movimiento descendente de una cascada se experimenta posteriormente con un movimiento ascendente.",
    "Se conocen como post imágenes ya que estas se presentan después de una alta carga de información sensorial Además, la imagen que se produce tiene propiedades opuestas a las de la imagen original, hecho por el...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se conocen como post imágenes ya que estas se presentan después de una alta carga de información sensorial Además, la imagen que se produce tiene propiedades opuestas a las de la...",
    [
      { term: "Imágenes mnémicas y eidéticas", difference: "Imágenes consecutivas o postimágenes se define en el documento como: Se conocen como post imágenes ya que estas se presentan después de una alta carga de información sensorial Además, la imagen que se produce tiene propiedades opuestas a las de la..." }, { term: "Imágenes parásitas", difference: "Imágenes consecutivas o postimágenes se define en el documento como: Se conocen como post imágenes ya que estas se presentan después de una alta carga de información sensorial Además, la imagen que se produce tiene propiedades opuestas a las de la..." }
    ],
    "Alta"
  ),
  makeConcept(
    46,
    "Imágenes parásitas",
    "percepcion",
    "Percepción",
    "Semiología",
    "Se diferencian de las mnésicas porque son autónomas e involuntarias y de las consecutivas por su subjetividad (i. e„ la persona sabe que son un producto de su mente). Pero al igual que ellas, se producen como consecuencia de un estímulo concreto que ya no se halla presente cuando se produce la imagen, lo que las distingue de las ilusiones.",
    "Se diferencian de las mnésicas porque son autónomas e involuntarias y de las consecutivas por su subjetividad (i.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se diferencian de las mnésicas porque son autónomas e involuntarias y de las consecutivas por su subjetividad (i.",
    [
      { term: "ALUCINACIONES", difference: "Imágenes parásitas se define en el documento como: Se diferencian de las mnésicas porque son autónomas e involuntarias y de las consecutivas por su subjetividad (i." }, { term: "Imágenes consecutivas o postimágenes", difference: "Imágenes parásitas se define en el documento como: Se diferencian de las mnésicas porque son autónomas e involuntarias y de las consecutivas por su subjetividad (i." }
    ],
    "Media"
  ),
  makeConcept(
    47,
    "ALUCINACIONES",
    "percepcion",
    "Percepción",
    "Semiología",
    "Experiencias similares a la percepción que se producen en ausencia del estímulo apropiado para producir tal percepción con toda la fuerza e impacto de una percepción real y que no pueden ser dirigidas o controladas por quien las está experimentando. El sujeto percibe falsamente un cuerpo que no se encuentra presente en el campo sensorial en el momento de la vivencia, sin que exista sustitución de los cuerpos presentes a su alrededor.",
    "Experiencias similares a la percepción que se producen en ausencia del estímulo apropiado para producir tal percepción con toda la fuerza e impacto de una percepción real y que no pueden ser dirigidas o...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Experiencias similares a la percepción que se producen en ausencia del estímulo apropiado para producir tal percepción con toda la fuerza e impacto de una percepción real y que no...",
    [
      { term: "Imágenes parásitas", difference: "ALUCINACIONES se define en el documento como: Experiencias similares a la percepción que se producen en ausencia del estímulo apropiado para producir tal percepción con toda la fuerza e impacto de una percepción real y que no..." }, { term: "Según su complejidad", difference: "ALUCINACIONES se define en el documento como: Experiencias similares a la percepción que se producen en ausencia del estímulo apropiado para producir tal percepción con toda la fuerza e impacto de una percepción real y que no..." }
    ],
    "Alta"
  ),
  makeConcept(
    48,
    "Según su complejidad",
    "percepcion",
    "Percepción",
    "Semiología",
    "En las alucinaciones complejas se percibe el estímulo concreto, es decir, si se presencia un objeto entonces éste se percibirá muy detallado, mientras que en las alucinaciones elementales se aprecia el objeto de una manera difusa.",
    "En las alucinaciones complejas se percibe el estímulo concreto, es decir, si se presencia un objeto entonces éste se percibirá muy detallado, mientras que en las alucinaciones elementales se aprecia el objeto...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: En las alucinaciones complejas se percibe el estímulo concreto, es decir, si se presencia un objeto entonces éste se percibirá muy detallado, mientras que en las alucinaciones...",
    [
      { term: "ALUCINACIONES", difference: "Según su complejidad se define en el documento como: En las alucinaciones complejas se percibe el estímulo concreto, es decir, si se presencia un objeto entonces éste se percibirá muy detallado, mientras que en las alucinaciones..." }, { term: "Según su contenido", difference: "Según su complejidad se define en el documento como: En las alucinaciones complejas se percibe el estímulo concreto, es decir, si se presencia un objeto entonces éste se percibirá muy detallado, mientras que en las alucinaciones..." }
    ],
    "Media"
  ),
  makeConcept(
    49,
    "Según su contenido",
    "percepcion",
    "Percepción",
    "Semiología",
    "Los contenidos que pueden abarcar las alucinaciones son infinitos, sin embargo, estos se pueden englobar en temas centrales como serian: las necesidades del individuo, donde se encontrarán subtemas como recuerdos, temores, deseos, entre otros. O los contenidos del entorno de la persona como la influencia de sus ideologías que crearían inseguridad, vergüenza, entre otros. Adicional y relacionado a la posición de la persona en el ambiente se encontrarán las circunstancias vitales y extremas de la persona, ya que, por ejemplo, una persona a la que mantienen en la cárcel tenderá a alucinaciones con verdugos, por ejemplo.",
    "Los contenidos que pueden abarcar las alucinaciones son infinitos, sin embargo, estos se pueden englobar en temas centrales como serian: las necesidades del individuo, donde se encontrarán subtemas como...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Los contenidos que pueden abarcar las alucinaciones son infinitos, sin embargo, estos se pueden englobar en temas centrales como serian: las necesidades del individuo, donde se...",
    [
      { term: "Según la modalidad sensorial", difference: "Según su contenido se define en el documento como: Los contenidos que pueden abarcar las alucinaciones son infinitos, sin embargo, estos se pueden englobar en temas centrales como serian: las necesidades del individuo, donde se..." }, { term: "Según su complejidad", difference: "Según su contenido se define en el documento como: Los contenidos que pueden abarcar las alucinaciones son infinitos, sin embargo, estos se pueden englobar en temas centrales como serian: las necesidades del individuo, donde se..." }
    ],
    "Alta"
  ),
  makeConcept(
    50,
    "Según la modalidad sensorial",
    "percepcion",
    "Percepción",
    "Semiología",
    "Se refiere a la vía por la cual la alucinación se evidencia. En la mayoría las alucinaciones se presentan de forma visual o auditiva, sin embargo, existen más vías, a las que se hará referencia a continuación",
    "Se refiere a la vía por la cual la alucinación se evidencia.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se refiere a la vía por la cual la alucinación se evidencia.",
    [
      { term: "Según su contenido", difference: "Según la modalidad sensorial se define en el documento como: Se refiere a la vía por la cual la alucinación se evidencia." }, { term: "Alucinaciones visuales", difference: "Según la modalidad sensorial se define en el documento como: Se refiere a la vía por la cual la alucinación se evidencia." }
    ],
    "Media"
  ),
  makeConcept(
    51,
    "Alucinaciones visuales",
    "percepcion",
    "Percepción",
    "Semiología",
    "Una alucinación visual es aquella que se produce a través de la vista, tiene las siguientes subdivisiones con base en el tamaño, a la temática, etc.: Según la temática: alucinaciones relacionadas a un tema específico. Zoopsias: alucinaciones relacionadas con los insectos. Delirium Tremens: alucinaciones relacionadas con multitud de temáticas, debido a síndrome de abstinencia alcohólica.",
    "Una alucinación visual es aquella que se produce a través de la vista, tiene las siguientes subdivisiones con base en el tamaño, a la temática, etc.: Según la temática: alucinaciones relacionadas a un tema...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Una alucinación visual es aquella que se produce a través de la vista, tiene las siguientes subdivisiones con base en el tamaño, a la temática, etc.: Según la temática:...",
    [
      { term: "Alucinaciones auditivas", difference: "Alucinaciones visuales se define en el documento como: Una alucinación visual es aquella que se produce a través de la vista, tiene las siguientes subdivisiones con base en el tamaño, a la temática, etc.: Según la temática:..." }, { term: "Según la modalidad sensorial", difference: "Alucinaciones visuales se define en el documento como: Una alucinación visual es aquella que se produce a través de la vista, tiene las siguientes subdivisiones con base en el tamaño, a la temática, etc.: Según la temática:..." }
    ],
    "Media"
  ),
  makeConcept(
    52,
    "Alucinaciones auditivas",
    "percepcion",
    "Percepción",
    "Semiología",
    "Las alucinaciones auditivas son aquellas cuya vía es la audición, es decir, en estas alucinaciones la persona \"escucha\" un estímulo inexistente. Este tipo de alucinaciones es el más frecuente conjunto a las alucinaciones visuales. Las alucinaciones auditivas según su grado de complejidad pueden presentarse como elementales, en donde la persona escucha tonos, pasos o murmullos. Mientras que en una alucinación auditiva compleja, la persona escucha palabras claras y con significado. Entre las variables para subdividir este tipo de alucinaciones se encuentran: Claridad: claridad con la que se percibe Intensidad: la magnitud de este estímulo irreal Ej. susurros, gritos, entre otros. Localización: distancia a la que se percibe. Ej. Cerca, lejos. Contenido: Estímulos simples o complejos, a continuación, se presentan ejemplos de estas. Reveladores de cierta información. Ej. la persona que escucha voces que le dicen cosas como dónde está el bastón de su abuelo. Voces que piden. Voces que ordenan.",
    "Las alucinaciones auditivas son aquellas cuya vía es la audición, es decir, en estas alucinaciones la persona \"escucha\" un estímulo inexistente.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Las alucinaciones auditivas son aquellas cuya vía es la audición, es decir, en estas alucinaciones la persona \"escucha\" un estímulo inexistente.",
    [
      { term: "Alucinaciones olfativas", difference: "Alucinaciones auditivas se define en el documento como: Las alucinaciones auditivas son aquellas cuya vía es la audición, es decir, en estas alucinaciones la persona \"escucha\" un estímulo inexistente." }, { term: "Alucinaciones visuales", difference: "Alucinaciones auditivas se define en el documento como: Las alucinaciones auditivas son aquellas cuya vía es la audición, es decir, en estas alucinaciones la persona \"escucha\" un estímulo inexistente." }
    ],
    "Alta"
  ),
  makeConcept(
    53,
    "Alucinaciones olfativas",
    "percepcion",
    "Percepción",
    "Semiología",
    "Alucinaciones en donde la persona huele, desde cosas agradables a nauseabundas. Es habitual que estén asociadas a envenenamientos, tumores cerebrales, cuadros clínicos en donde las personas creen estar siendo envenenadas, entre otros. De esta manera los pacientes consideran estos olores los agreden, o consideran son parte de una persecución que busca causarles un daño.",
    "Alucinaciones en donde la persona huele, desde cosas agradables a nauseabundas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Alucinaciones en donde la persona huele, desde cosas agradables a nauseabundas.",
    [
      { term: "Alucinaciones auditivas", difference: "Alucinaciones olfativas se define en el documento como: Alucinaciones en donde la persona huele, desde cosas agradables a nauseabundas." }, { term: "Alucinaciones gustativas", difference: "Alucinaciones olfativas se define en el documento como: Alucinaciones en donde la persona huele, desde cosas agradables a nauseabundas." }
    ],
    "Media"
  ),
  makeConcept(
    54,
    "Alucinaciones gustativas",
    "percepcion",
    "Percepción",
    "Semiología",
    "Este tipo de alucinaciones crean en los pacientes la experimentación de gustos desagradables, y las relacionan con creencias de ser envenenado, pero es difícil saber qué es verdaderamente una alucinación debido a que en la vida diaria beber o comer algunos medicamentos o comidas pueden alterar el gusto. En algunos casos se presentan como causadas por su propio cuerpo, en donde el sujeto atribuye la idea de estar pudriéndose por dentro.",
    "Este tipo de alucinaciones crean en los pacientes la experimentación de gustos desagradables, y las relacionan con creencias de ser envenenado, pero es difícil saber qué es verdaderamente una alucinación...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Este tipo de alucinaciones crean en los pacientes la experimentación de gustos desagradables, y las relacionan con creencias de ser envenenado, pero es difícil saber qué es...",
    [
      { term: "Alucinaciones olfativas", difference: "Alucinaciones gustativas se define en el documento como: Este tipo de alucinaciones crean en los pacientes la experimentación de gustos desagradables, y las relacionan con creencias de ser envenenado, pero es difícil saber qué es..." }, { term: "Alucinaciones táctiles", difference: "Alucinaciones gustativas se define en el documento como: Este tipo de alucinaciones crean en los pacientes la experimentación de gustos desagradables, y las relacionan con creencias de ser envenenado, pero es difícil saber qué es..." }
    ],
    "Alta"
  ),
  makeConcept(
    55,
    "Alucinaciones táctiles",
    "percepcion",
    "Percepción",
    "Semiología",
    "Estas alucinaciones se pueden presentar por todo el cuerpo. El sujeto puede sentir pellizcos, tocamientos, corrientes eléctricas, quemaduras, entre otros. De esta manera, en función del contenido de cada una de estas se pueden distinguir: Hápticas: sensación física. Ej. Cosquilleos. Hídricas: sensación de humedad. De contacto: tocar Cinestésicas: cuando un individuo dice que una parte de su cuerpo se está moviendo. Determinada por otra sensación subjetiva que afecta a un sentido diferente. Activas: cuando la persona tiene la sensación de tocar, es decir, la persona cree, por ejemplo, que ha tocado un objeto inexistente como tener la sensación de estar tocando insectos, etc. Pasivas: cuando la persona tiene la sensación de ser tocada. El paciente cree que hay alguien o algo que le está tocando, quemándole o pinchándole, etc.",
    "Estas alucinaciones se pueden presentar por todo el cuerpo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Estas alucinaciones se pueden presentar por todo el cuerpo.",
    [
      { term: "División adicional de alucinaciones", difference: "Alucinaciones táctiles se define en el documento como: Estas alucinaciones se pueden presentar por todo el cuerpo." }, { term: "Alucinaciones gustativas", difference: "Alucinaciones táctiles se define en el documento como: Estas alucinaciones se pueden presentar por todo el cuerpo." }
    ],
    "Alta"
  ),
  makeConcept(
    56,
    "División adicional de alucinaciones",
    "percepcion",
    "Percepción",
    "Semiología",
    "Existe una división adicional de alucinaciones conocidas como nueva variante y hasta se consideran trastornos de la representación ya que por ejemplo \"la pseudoalucinación no tiene corporeidad y aparece en el espacio subjetivo interior, rasgos esenciales que la distinguen de la alucinación verdadera\" (Capponi, 2013, p. 54). Entre estas se encuentran: Pseudoalucinaciones: La diferencia que la percepción errónea se encuentra fuera del campo perceptual del sujeto enfermo. O sea, que el objeto se percibe allí conde normalmente no puede percibirse. Ejemplo: un paciente se queja de oír voces dentro de la cabeza, o ver un animal dentro de su estómago. Alucinosis: La persona es consciente de que lo que percibe no existe. Ej. Alguien que ha tomado drogas. Alucinación negativa: La persona no percibe un estímulo que si existe.",
    "Existe una división adicional de alucinaciones conocidas como nueva variante y hasta se consideran trastornos de la representación ya que por ejemplo \"la pseudoalucinación no tiene corporeidad y aparece en el...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Existe una división adicional de alucinaciones conocidas como nueva variante y hasta se consideran trastornos de la representación ya que por ejemplo \"la pseudoalucinación no...",
    [
      { term: "Desrealización", difference: "División adicional de alucinaciones se define en el documento como: Existe una división adicional de alucinaciones conocidas como nueva variante y hasta se consideran trastornos de la representación ya que por ejemplo \"la pseudoalucinación no..." }, { term: "Táctiles", difference: "División adicional de alucinaciones se define en el documento como: Existe una división adicional de alucinaciones conocidas como nueva variante y hasta se consideran trastornos de la representación ya que por ejemplo \"la pseudoalucinación no..." }
    ],
    "Alta"
  ),
  makeConcept(
    57,
    "Desrealización",
    "percepcion",
    "Percepción",
    "Semiología",
    "Percibe los objetos con la misma nitidez que antes, pero le parece que no existen, no puede precisar si verdaderamente son reales. Tiene conciencia de que lo que percibe se corresponde a la realidad. Generalmente estos pacientes dicen que \"notan las cosas raras, como si no existieran, como si todo a su alrededor fuera una fantasía\".",
    "Percibe los objetos con la misma nitidez que antes, pero le parece que no existen, no puede precisar si verdaderamente son reales.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Percibe los objetos con la misma nitidez que antes, pero le parece que no existen, no puede precisar si verdaderamente son reales.",
    [
      { term: "Despersonalización", difference: "Desrealización se define en el documento como: Percibe los objetos con la misma nitidez que antes, pero le parece que no existen, no puede precisar si verdaderamente son reales." }, { term: "División adicional de alucinaciones", difference: "Desrealización se define en el documento como: Percibe los objetos con la misma nitidez que antes, pero le parece que no existen, no puede precisar si verdaderamente son reales." }
    ],
    "Media"
  ),
  makeConcept(
    58,
    "Despersonalización",
    "percepcion",
    "Percepción",
    "Semiología",
    "Vivencia de extrañeza o de cambio del Yo, en la que el sujeto se percibe como si no fuera real, caracterizada por pérdida de espontaneidad de los actos, del pensamiento y de los sentimientos, así como vivencia de conducta automática. Sentimiento de extrañeza y de estar alejado de uno mismo, sensación de pensar y percibir como si fuera otra persona y de que puede salir del cuerpo y verse a sí mismo, impresión de que las palabras y los pensamientos ven desde fuera",
    "Vivencia de extrañeza o de cambio del Yo, en la que el sujeto se percibe como si no fuera real, caracterizada por pérdida de espontaneidad de los actos, del pensamiento y de los sentimientos, así como vivencia...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Vivencia de extrañeza o de cambio del Yo, en la que el sujeto se percibe como si no fuera real, caracterizada por pérdida de espontaneidad de los actos, del pensamiento y de los...",
    [
      { term: "Desrealización", difference: "Despersonalización se define en el documento como: Vivencia de extrañeza o de cambio del Yo, en la que el sujeto se percibe como si no fuera real, caracterizada por pérdida de espontaneidad de los actos, del pensamiento y de los..." }, { term: "Transformación", difference: "Despersonalización se define en el documento como: Vivencia de extrañeza o de cambio del Yo, en la que el sujeto se percibe como si no fuera real, caracterizada por pérdida de espontaneidad de los actos, del pensamiento y de los..." }
    ],
    "Alta"
  ),
  makeConcept(
    59,
    "Transformación",
    "percepcion",
    "Percepción",
    "Semiología",
    "Percibe él mismo como si no fuera él, considera que es otra persona. Ha perdido su identidad propia para convertirse en otro sujeto, habitualmente relacionado con algún personaje destacado en el campo de la cultura, deportes, política, la ciencia, etc.",
    "Percibe él mismo como si no fuera él, considera que es otra persona.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Percibe él mismo como si no fuera él, considera que es otra persona.",
    [
      { term: "Despersonalización", difference: "Transformación se define en el documento como: Percibe él mismo como si no fuera él, considera que es otra persona." }, { term: "Desrealización", difference: "Transformación se define en el documento como: Percibe él mismo como si no fuera él, considera que es otra persona." }
    ],
    "Media"
  ),
  makeConcept(
    60,
    "Desorientación alopsíquica en tiempo",
    "orientacion",
    "Orientación",
    "Semiología",
    "Cuando al preguntarle, no es capaz de reconocer la hora, el día, el mes o el año en que estamos. A veces no sabe diferenciar si es de día o de noche",
    "Cuando al preguntarle, no es capaz de reconocer la hora, el día, el mes o el año en que estamos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Cuando al preguntarle, no es capaz de reconocer la hora, el día, el mes o el año en que estamos.",
    [
      { term: "Desorientación alopsíquica en espacio", difference: "Desorientación alopsíquica en tiempo se define en el documento como: Cuando al preguntarle, no es capaz de reconocer la hora, el día, el mes o el año en que estamos." }, { term: "Desorientación autopsíquica o en persona", difference: "Desorientación alopsíquica en tiempo se define en el documento como: Cuando al preguntarle, no es capaz de reconocer la hora, el día, el mes o el año en que estamos." }
    ],
    "Media"
  ),
  makeConcept(
    61,
    "Desorientación alopsíquica en espacio",
    "orientacion",
    "Orientación",
    "Semiología",
    "Cuando no puede reconocer el lugar en que está situado, la ciudad o localidad donde vive o donde se encuentra, la provincia o el país, etc. no puede reconocer el espacio que le rodea.",
    "Cuando no puede reconocer el lugar en que está situado, la ciudad o localidad donde vive o donde se encuentra, la provincia o el país, etc.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Cuando no puede reconocer el lugar en que está situado, la ciudad o localidad donde vive o donde se encuentra, la provincia o el país, etc.",
    [
      { term: "Desorientación alopsíquica en tiempo", difference: "Desorientación alopsíquica en espacio se define en el documento como: Cuando no puede reconocer el lugar en que está situado, la ciudad o localidad donde vive o donde se encuentra, la provincia o el país, etc." }, { term: "Desorientación autopsíquica o en persona", difference: "Desorientación alopsíquica en espacio se define en el documento como: Cuando no puede reconocer el lugar en que está situado, la ciudad o localidad donde vive o donde se encuentra, la provincia o el país, etc." }
    ],
    "Media"
  ),
  makeConcept(
    62,
    "Desorientación autopsíquica o en persona",
    "orientacion",
    "Orientación",
    "Semiología",
    "Cuando no puede identificar quien es, de donde viene o a donde se dirige, desconoce a las demás personas que le rodean habitualmente, tales como amigos, vecinos, familiares, compañeros de trabajo o estudios, etc., y que él conoce de antemano. También estará desorientado en persona cuando no pueda identificarse a sí mismo. Está imposibilitado de saber quién es él mismo.",
    "Cuando no puede identificar quien es, de donde viene o a donde se dirige, desconoce a las demás personas que le rodean habitualmente, tales como amigos, vecinos, familiares, compañeros de trabajo o estudios...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Cuando no puede identificar quien es, de donde viene o a donde se dirige, desconoce a las demás personas que le rodean habitualmente, tales como amigos, vecinos, familiares...",
    [
      { term: "Desorientación alopsíquica en espacio", difference: "Desorientación autopsíquica o en persona se define en el documento como: Cuando no puede identificar quien es, de donde viene o a donde se dirige, desconoce a las demás personas que le rodean habitualmente, tales como amigos, vecinos, familiares..." }, { term: "Desorientación alopsíquica en tiempo", difference: "Desorientación autopsíquica o en persona se define en el documento como: Cuando no puede identificar quien es, de donde viene o a donde se dirige, desconoce a las demás personas que le rodean habitualmente, tales como amigos, vecinos, familiares..." }
    ],
    "Media"
  ),
  makeConcept(
    63,
    "Afasia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Trastorno del lenguaje que sobreviene como consecuencia de una lesión cerebral. Se define la afasia como la perdida de la capacidad de producir o de comprender el lenguaje en cualquiera de sus formas -lectura, escritura o habla- debida a traumatismos o enfermedades de los centros cerebrales implicados en el lenguaje. Existe acuerdo en cuanto al carácter focal, y no generalizado o difuso, de las lesiones cerebrales que la originan. Por el contrario, hay desacuerdo sobre la descripción de la naturaleza de la afasia y qué trastornos lingüísticos deben incluirse bajo dicho término. Los síndromes afásicos pueden tener un origen cortical y o subcortical.",
    "Trastorno del lenguaje que sobreviene como consecuencia de una lesión cerebral.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Trastorno del lenguaje que sobreviene como consecuencia de una lesión cerebral.",
    [
      { term: "Agramatismo", difference: "Afasia se define en el documento como: Trastorno del lenguaje que sobreviene como consecuencia de una lesión cerebral." }, { term: "Aprosodia", difference: "Afasia se define en el documento como: Trastorno del lenguaje que sobreviene como consecuencia de una lesión cerebral." }
    ],
    "Alta"
  ),
  makeConcept(
    64,
    "Agramatismo",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Dificultad para encadenar palabras en frases utilizando las reglas gramaticales",
    "Dificultad para encadenar palabras en frases utilizando las reglas gramaticales",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Dificultad para encadenar palabras en frases utilizando las reglas gramaticales",
    [
      { term: "Afasia", difference: "Agramatismo se define en el documento como: Dificultad para encadenar palabras en frases utilizando las reglas gramaticales" }, { term: "Aprosodia", difference: "Agramatismo se define en el documento como: Dificultad para encadenar palabras en frases utilizando las reglas gramaticales" }
    ],
    "Básica"
  ),
  makeConcept(
    65,
    "Aprosodia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Incapacidad para la entonación, musicalidad, inflexión y cadencia del habla",
    "Incapacidad para la entonación, musicalidad, inflexión y cadencia del habla",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Incapacidad para la entonación, musicalidad, inflexión y cadencia del habla",
    [
      { term: "Agrafia", difference: "Aprosodia se define en el documento como: Incapacidad para la entonación, musicalidad, inflexión y cadencia del habla" }, { term: "Agramatismo", difference: "Aprosodia se define en el documento como: Incapacidad para la entonación, musicalidad, inflexión y cadencia del habla" }
    ],
    "Básica"
  ),
  makeConcept(
    66,
    "Agrafia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Pérdida en la capacidad ya adquirida para el lenguaje escrito",
    "Pérdida en la capacidad ya adquirida para el lenguaje escrito",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Pérdida en la capacidad ya adquirida para el lenguaje escrito",
    [
      { term: "Alexia", difference: "Agrafia se define en el documento como: Pérdida en la capacidad ya adquirida para el lenguaje escrito" }, { term: "Aprosodia", difference: "Agrafia se define en el documento como: Pérdida en la capacidad ya adquirida para el lenguaje escrito" }
    ],
    "Básica"
  ),
  makeConcept(
    67,
    "Alexia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Pérdida en la capacidad ya adquirida para la lectura",
    "Pérdida en la capacidad ya adquirida para la lectura",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Pérdida en la capacidad ya adquirida para la lectura",
    [
      { term: "Agrafia", difference: "Alexia se define en el documento como: Pérdida en la capacidad ya adquirida para la lectura" }, { term: "Anomia", difference: "Alexia se define en el documento como: Pérdida en la capacidad ya adquirida para la lectura" }
    ],
    "Básica"
  ),
  makeConcept(
    68,
    "Anomia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Dificultad para encontrar palabras que designen objetos o personas",
    "Dificultad para encontrar palabras que designen objetos o personas",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Dificultad para encontrar palabras que designen objetos o personas",
    [
      { term: "Alexia", difference: "Anomia se define en el documento como: Dificultad para encontrar palabras que designen objetos o personas" }, { term: "Dislalia", difference: "Anomia se define en el documento como: Dificultad para encontrar palabras que designen objetos o personas" }
    ],
    "Básica"
  ),
  makeConcept(
    69,
    "Dislalia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Dificultad para articular fonemas, sílabas o palabras [dislalia fonética]. Puede ser debida a alteraciones orgánicas [labio leporino, macroglosia, fisura palatina, rinolalia, déficits auditivos) o funcionales. Estas últimas son las más frecuentes. Cuando la dificultad es para identificar y reproducir los sonidos de la lengua se la denomina dislalia fonológica.",
    "Dificultad para articular fonemas, sílabas o palabras [dislalia fonética].",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Dificultad para articular fonemas, sílabas o palabras [dislalia fonética].",
    [
      { term: "Anomia", difference: "Dislalia se define en el documento como: Dificultad para articular fonemas, sílabas o palabras [dislalia fonética]." }, { term: "Disfasia evolutiva (trastorno específico del lenguaje)", difference: "Dislalia se define en el documento como: Dificultad para articular fonemas, sílabas o palabras [dislalia fonética]." }
    ],
    "Media"
  ),
  makeConcept(
    70,
    "Disfasia evolutiva (trastorno específico del lenguaje)",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "La disfasia evolutiva es un trastorno específico del lenguaje que afecta tanto a la expresión como a la comprensión. Se da en niños de inteligencia normal, que no han adquirido aún el lenguaje y que no presentan ningún tipo de alteración sensorial, neurológica, emocional ni carencia ambiental. En la actualidad también se conoce como trastorno específico del lenguaje (TEL).",
    "La disfasia evolutiva es un trastorno específico del lenguaje que afecta tanto a la expresión como a la comprensión.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La disfasia evolutiva es un trastorno específico del lenguaje que afecta tanto a la expresión como a la comprensión.",
    [
      { term: "Disartria", difference: "Disfasia evolutiva (trastorno específico del lenguaje) se define en el documento como: La disfasia evolutiva es un trastorno específico del lenguaje que afecta tanto a la expresión como a la comprensión." }, { term: "Dislalia", difference: "Disfasia evolutiva (trastorno específico del lenguaje) se define en el documento como: La disfasia evolutiva es un trastorno específico del lenguaje que afecta tanto a la expresión como a la comprensión." }
    ],
    "Media"
  ),
  makeConcept(
    71,
    "Disartria",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Dificultad del habla debida a trastornos del tono y delmovimiento de los músculos que controlan la articulación y que son secundarios a lesiones del sistema nervioso.",
    "Dificultad del habla debida a trastornos del tono y delmovimiento de los músculos que controlan la articulación y que son secundarios a lesiones del sistema nervioso.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Dificultad del habla debida a trastornos del tono y delmovimiento de los músculos que controlan la articulación y que son secundarios a lesiones del sistema nervioso.",
    [
      { term: "Disfasia evolutiva (trastorno específico del lenguaje)", difference: "Disartria se define en el documento como: Dificultad del habla debida a trastornos del tono y delmovimiento de los músculos que controlan la articulación y que son secundarios a lesiones del sistema nervioso." }, { term: "Disglosia", difference: "Disartria se define en el documento como: Dificultad del habla debida a trastornos del tono y delmovimiento de los músculos que controlan la articulación y que son secundarios a lesiones del sistema nervioso." }
    ],
    "Media"
  ),
  makeConcept(
    72,
    "Disglosia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Trastorno en la articulación de fonemas por alteración o daño de los órganos periféricos del habla (paladar, lengua, labios, etc). También se conoce como Dislalia orgánica.",
    "Trastorno en la articulación de fonemas por alteración o daño de los órganos periféricos del habla (paladar, lengua, labios, etc).",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Trastorno en la articulación de fonemas por alteración o daño de los órganos periféricos del habla (paladar, lengua, labios, etc).",
    [
      { term: "Disartria", difference: "Disglosia se define en el documento como: Trastorno en la articulación de fonemas por alteración o daño de los órganos periféricos del habla (paladar, lengua, labios, etc)." }, { term: "Disfonía", difference: "Disglosia se define en el documento como: Trastorno en la articulación de fonemas por alteración o daño de los órganos periféricos del habla (paladar, lengua, labios, etc)." }
    ],
    "Media"
  ),
  makeConcept(
    73,
    "Disfonía",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Trastorno de la voz. Abarca tanto las alteraciones cualitativas como cuantitativas de la voz. Puede ser orgánica o funcional.",
    "Trastorno de la voz.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Trastorno de la voz.",
    [
      { term: "Disglosia", difference: "Disfonía se define en el documento como: Trastorno de la voz." }, { term: "Parafasia", difference: "Disfonía se define en el documento como: Trastorno de la voz." }
    ],
    "Media"
  ),
  makeConcept(
    74,
    "Parafasia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Producción no intencional de sílabas, palabras o frases durante el habla. Se diferencia del defecto articulatorio en que en las parafasias algunos sonidos se sustituyen por otra cuya articulación es correcta. Si se sustituyen sílabas se trata de una parafasia literal o fonémica, que puede devenir en neologística en los casos en que las nuevas expresiones resultantes de los cambios constituyan verdaderos neologismos en el idioma afásico. Si el paciente cambia una palabra por otras (por ejemplo, «guante» por «zapato») nos hallamos ante una parafasia verbal.",
    "Producción no intencional de sílabas, palabras o frases durante el habla.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Producción no intencional de sílabas, palabras o frases durante el habla.",
    [
      { term: "Disfonía", difference: "Parafasia se define en el documento como: Producción no intencional de sílabas, palabras o frases durante el habla." }, { term: "Mutismo", difference: "Parafasia se define en el documento como: Producción no intencional de sílabas, palabras o frases durante el habla." }
    ],
    "Alta"
  ),
  makeConcept(
    75,
    "Mutismo",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Ausencia permanente del lenguaje expresivo o desaparición temporal o permanente de éste en un sujeto que lo ha adquirido previamente. Puede relacionarse con causas psicológicas y emocionales, funcionales, estructurales o mixtas. Se encuentran casos de mutismo permanente en cuadros de autismo infantil, psicosis regresivas y deficiencia mental profunda.",
    "Ausencia permanente del lenguaje expresivo o desaparición temporal o permanente de éste en un sujeto que lo ha adquirido previamente.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Ausencia permanente del lenguaje expresivo o desaparición temporal o permanente de éste en un sujeto que lo ha adquirido previamente.",
    [
      { term: "Mutismo selectivo", difference: "Mutismo se define en el documento como: Ausencia permanente del lenguaje expresivo o desaparición temporal o permanente de éste en un sujeto que lo ha adquirido previamente." }, { term: "Parafasia", difference: "Mutismo se define en el documento como: Ausencia permanente del lenguaje expresivo o desaparición temporal o permanente de éste en un sujeto que lo ha adquirido previamente." }
    ],
    "Media"
  ),
  makeConcept(
    76,
    "Mutismo selectivo",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Cuadro clínico que se caracteriza porque el sujeto se niega a hablar ante determinadas personas o situaciones. Aparece entre los 3 y 7 años, coincidiendo a veces con la iniciación del niño en la vida escolar. Suele manifestarse sin asociación de otras alteraciones, a no ser la de negarse a ingerir alimentos. Para algunos autores es un trastorno de ansiedad de tipo obsesivo-compulsivo; para otros es un trastorno psicótico o prepsicótico. Se denomina también mutismo electivo o mutismo parcial.",
    "Cuadro clínico que se caracteriza porque el sujeto se niega a hablar ante determinadas personas o situaciones.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Cuadro clínico que se caracteriza porque el sujeto se niega a hablar ante determinadas personas o situaciones.",
    [
      { term: "Mutismo", difference: "Mutismo selectivo se define en el documento como: Cuadro clínico que se caracteriza porque el sujeto se niega a hablar ante determinadas personas o situaciones." }, { term: "Tartamudez", difference: "Mutismo selectivo se define en el documento como: Cuadro clínico que se caracteriza porque el sujeto se niega a hablar ante determinadas personas o situaciones." }
    ],
    "Alta"
  ),
  makeConcept(
    77,
    "Tartamudez",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Alteración en la fluidez y en el patrón del habla, inapropiadas para la edad del individuo y persistentes a través del tiempo. El patrón de habla del tartamudeo se caracteriza por las interrupciones en la producción de los sonidos del habla, a las que se denominan «disritmias» o «disfluencias». La fluidez, el tiempo y el ritmo del habla, al estar alterados, dificultan las posibilidades de comunicación del sujeto.",
    "Alteración en la fluidez y en el patrón del habla, inapropiadas para la edad del individuo y persistentes a través del tiempo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Alteración en la fluidez y en el patrón del habla, inapropiadas para la edad del individuo y persistentes a través del tiempo.",
    [
      { term: "Coprolalia", difference: "Tartamudez se define en el documento como: Alteración en la fluidez y en el patrón del habla, inapropiadas para la edad del individuo y persistentes a través del tiempo." }, { term: "Mutismo selectivo", difference: "Tartamudez se define en el documento como: Alteración en la fluidez y en el patrón del habla, inapropiadas para la edad del individuo y persistentes a través del tiempo." }
    ],
    "Media"
  ),
  makeConcept(
    78,
    "Coprolalia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Se trata de la emisión involuntaria de palabras obscenas o insultantes, que no se dirigen a un oyente concreto con intención o voluntad de agraviar o molestar. Pueden producirse al inicio del discurso (p. ej„ al responder a un saludo o a una pregunta concreta) o aparecer en el transcurso del habla normal. La persona se da cuenta de la aparición de estas palabras y se avergüenza de ellas.",
    "Se trata de la emisión involuntaria de palabras obscenas o insultantes, que no se dirigen a un oyente concreto con intención o voluntad de agraviar o molestar.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se trata de la emisión involuntaria de palabras obscenas o insultantes, que no se dirigen a un oyente concreto con intención o voluntad de agraviar o molestar.",
    [
      { term: "Ecolalia", difference: "Coprolalia se define en el documento como: Se trata de la emisión involuntaria de palabras obscenas o insultantes, que no se dirigen a un oyente concreto con intención o voluntad de agraviar o molestar." }, { term: "Tartamudez", difference: "Coprolalia se define en el documento como: Se trata de la emisión involuntaria de palabras obscenas o insultantes, que no se dirigen a un oyente concreto con intención o voluntad de agraviar o molestar." }
    ],
    "Media"
  ),
  makeConcept(
    79,
    "Ecolalia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Forma parte del grupo de los \"eco-síntomas\" que consisten en que el paciente repite como en un eco lo que acaba de escuchar, o el movimiento que alguien hizo ante él (ecopraxia), o el gesto del interlocutor (ecomimid). En su formato verbal, consiste en la repetición en eco de las últimas sílabas, palabras, o frases breves que acaba de pronunciar un interlocutor, o alguien que está cerca del paciente, o de una imitación o reproducción del habla de otra persona que está presente.",
    "Forma parte del grupo de los \"eco-síntomas\" que consisten en que el paciente repite como en un eco lo que acaba de escuchar, o el movimiento que alguien hizo ante él (ecopraxia), o el gesto del interlocutor...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Forma parte del grupo de los \"eco-síntomas\" que consisten en que el paciente repite como en un eco lo que acaba de escuchar, o el movimiento que alguien hizo ante él (ecopraxia)...",
    [
      { term: "Coprolalia", difference: "Ecolalia se define en el documento como: Forma parte del grupo de los \"eco-síntomas\" que consisten en que el paciente repite como en un eco lo que acaba de escuchar, o el movimiento que alguien hizo ante él (ecopraxia)..." }, { term: "Palilalia", difference: "Ecolalia se define en el documento como: Forma parte del grupo de los \"eco-síntomas\" que consisten en que el paciente repite como en un eco lo que acaba de escuchar, o el movimiento que alguien hizo ante él (ecopraxia)..." }
    ],
    "Alta"
  ),
  makeConcept(
    80,
    "Palilalia",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Repetición de una palabra que va incrementándose en su frecuencia El individuo repite las palabras o sílabas que tienen coherencia con su estado de ánimo o emocional. Se presentan en personas deprimidas o pesimistas, esquizofrénicas y dementes",
    "Repetición de una palabra que va incrementándose en su frecuencia El individuo repite las palabras o sílabas que tienen coherencia con su estado de ánimo o emocional.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Repetición de una palabra que va incrementándose en su frecuencia El individuo repite las palabras o sílabas que tienen coherencia con su estado de ánimo o emocional.",
    [
      { term: "Ecolalia", difference: "Palilalia se define en el documento como: Repetición de una palabra que va incrementándose en su frecuencia El individuo repite las palabras o sílabas que tienen coherencia con su estado de ánimo o emocional." }, { term: "Logoclonía", difference: "Palilalia se define en el documento como: Repetición de una palabra que va incrementándose en su frecuencia El individuo repite las palabras o sílabas que tienen coherencia con su estado de ánimo o emocional." }
    ],
    "Media"
  ),
  makeConcept(
    81,
    "Logoclonía",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Repetición espasmódica de una sílaba en medio o al final de una palabra",
    "Repetición espasmódica de una sílaba en medio o al final de una palabra",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Repetición espasmódica de una sílaba en medio o al final de una palabra",
    [
      { term: "Palilalia", difference: "Logoclonía se define en el documento como: Repetición espasmódica de una sílaba en medio o al final de una palabra" }, { term: "Taquifemia o farfulleo", difference: "Logoclonía se define en el documento como: Repetición espasmódica de una sílaba en medio o al final de una palabra" }
    ],
    "Básica"
  ),
  makeConcept(
    82,
    "Taquifemia o farfulleo",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Es un trastorno del habla que se caracteriza por la rapidez excesiva de las palabras, la omisión de sílabas o sonidos y la articulación imprecisa de los fonemas.",
    "Es un trastorno del habla que se caracteriza por la rapidez excesiva de las palabras, la omisión de sílabas o sonidos y la articulación imprecisa de los fonemas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es un trastorno del habla que se caracteriza por la rapidez excesiva de las palabras, la omisión de sílabas o sonidos y la articulación imprecisa de los fonemas.",
    [
      { term: "Glosomanía", difference: "Taquifemia o farfulleo se define en el documento como: Es un trastorno del habla que se caracteriza por la rapidez excesiva de las palabras, la omisión de sílabas o sonidos y la articulación imprecisa de los fonemas." }, { term: "Logoclonía", difference: "Taquifemia o farfulleo se define en el documento como: Es un trastorno del habla que se caracteriza por la rapidez excesiva de las palabras, la omisión de sílabas o sonidos y la articulación imprecisa de los fonemas." }
    ],
    "Media"
  ),
  makeConcept(
    83,
    "Glosomanía",
    "lenguaje",
    "Lenguaje y habla",
    "Semiología",
    "Un patrón de habla acelerado, caracterizado por la producción de oraciones, cuyas palabras son elegidas fundamentalmente por su afinidad o parentesco fonológico (rimas, asonancias, juegos de palabras, etc.].",
    "Un patrón de habla acelerado, caracterizado por la producción de oraciones, cuyas palabras son elegidas fundamentalmente por su afinidad o parentesco fonológico (rimas, asonancias, juegos de palabras, etc.].",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Un patrón de habla acelerado, caracterizado por la producción de oraciones, cuyas palabras son elegidas fundamentalmente por su afinidad o parentesco fonológico (rimas...",
    [
      { term: "Taquifemia o farfulleo", difference: "Glosomanía se define en el documento como: Un patrón de habla acelerado, caracterizado por la producción de oraciones, cuyas palabras son elegidas fundamentalmente por su afinidad o parentesco fonológico (rimas..." }, { term: "Logoclonía", difference: "Glosomanía se define en el documento como: Un patrón de habla acelerado, caracterizado por la producción de oraciones, cuyas palabras son elegidas fundamentalmente por su afinidad o parentesco fonológico (rimas..." }
    ],
    "Media"
  ),
  makeConcept(
    84,
    "Aprosexia",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Denominada también a veces inatención, ya que implicaría una reducción máxima de la disposición atencional, es decir, una ausencia total de atención. A veces, el término aprosexia se restringe a la falta de atención total, como ocurriría, por ejemplo, en el coma, mientras que la inatención se utiliza para un tipo específico de alteración que se produce por exceso de fijación de la atención, ya que la persona parece prestar atención únicamente a sus contenidos mentales, se muestra ensimismada, y manifiesta una incapacidad de cambiar el foco de la atención.",
    "Denominada también a veces inatención, ya que implicaría una reducción máxima de la disposición atencional, es decir, una ausencia total de atención.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Denominada también a veces inatención, ya que implicaría una reducción máxima de la disposición atencional, es decir, una ausencia total de atención.",
    [
      { term: "Hipoprosexia", difference: "Aprosexia se define en el documento como: Denominada también a veces inatención, ya que implicaría una reducción máxima de la disposición atencional, es decir, una ausencia total de atención." }, { term: "Hiperprosexia o Hiperconcentración", difference: "Aprosexia se define en el documento como: Denominada también a veces inatención, ya que implicaría una reducción máxima de la disposición atencional, es decir, una ausencia total de atención." }
    ],
    "Alta"
  ),
  makeConcept(
    85,
    "Hipoprosexia",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Existe una disminución de la capacidad atencional. La persona presenta una capacidad disminuida para enfocar, concentrarse y orientarse hacia un objeto. Se trata de un trastorno de la capacidad de prestar atención persistentemente a una determinada actividad, objeto o vivencia.",
    "Existe una disminución de la capacidad atencional.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Existe una disminución de la capacidad atencional.",
    [
      { term: "Aprosexia", difference: "Hipoprosexia se define en el documento como: Existe una disminución de la capacidad atencional." }, { term: "Hiperprosexia o Hiperconcentración", difference: "Hipoprosexia se define en el documento como: Existe una disminución de la capacidad atencional." }
    ],
    "Media"
  ),
  makeConcept(
    86,
    "Hiperprosexia o Hiperconcentración",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "A veces también se denomina hiperconcentración o estrechamiento de la atención. Hacen referencia a alteraciones que se caracterizan por una focalización excesiva y transitoria de la atención sobre un estímulo, aspecto, tema, o vivencia. Se trataría de una concentración excesiva, tenaz y constante sobre un estímulo o grupo de estímulos, con exclusión de otros que suceden alrededor de la persona. Como la mayoría de las alteraciones atencionales, este tipo de anomalías se producen en personas sin psicopatología, aunque también puede estar presente en pacientes que presentan trastornos depresivos, trastornos obsesivos o trastornos psicóticos, entre otros.",
    "A veces también se denomina hiperconcentración o estrechamiento de la atención.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: A veces también se denomina hiperconcentración o estrechamiento de la atención.",
    [
      { term: "Hipoprosexia", difference: "Hiperprosexia o Hiperconcentración se define en el documento como: A veces también se denomina hiperconcentración o estrechamiento de la atención." }, { term: "Pseudoaprosexias", difference: "Hiperprosexia o Hiperconcentración se define en el documento como: A veces también se denomina hiperconcentración o estrechamiento de la atención." }
    ],
    "Alta"
  ),
  makeConcept(
    87,
    "Pseudoaprosexias",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Suele referirse a la falta de atención hacia el entorno, a pesar de mantener conservada la capacidad atencional. Impresiona una aprosexia pero la atención se encuentra focalizada en el medio externo del individuo.",
    "Suele referirse a la falta de atención hacia el entorno, a pesar de mantener conservada la capacidad atencional.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Suele referirse a la falta de atención hacia el entorno, a pesar de mantener conservada la capacidad atencional.",
    [
      { term: "Hiperprosexia o Hiperconcentración", difference: "Pseudoaprosexias se define en el documento como: Suele referirse a la falta de atención hacia el entorno, a pesar de mantener conservada la capacidad atencional." }, { term: "Paraprosexias", difference: "Pseudoaprosexias se define en el documento como: Suele referirse a la falta de atención hacia el entorno, a pesar de mantener conservada la capacidad atencional." }
    ],
    "Media"
  ),
  makeConcept(
    88,
    "Paraprosexias",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Esta alteración indicaría solo una dirección anómala de la atención. Ocurren desviaciones de la atención de apariencia involuntaria. A causa del detrimento de la atención voluntaria, la atención espontanea se exacerba. Además, se observa un incremento psicomotriz.",
    "Esta alteración indicaría solo una dirección anómala de la atención.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Esta alteración indicaría solo una dirección anómala de la atención.",
    [
      { term: "Distraibilidad o Distractibilidad", difference: "Paraprosexias se define en el documento como: Esta alteración indicaría solo una dirección anómala de la atención." }, { term: "Pseudoaprosexias", difference: "Paraprosexias se define en el documento como: Esta alteración indicaría solo una dirección anómala de la atención." }
    ],
    "Media"
  ),
  makeConcept(
    89,
    "Distraibilidad o Distractibilidad",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Podría definirse como inestabilidad atencional y se manifiesta cuando la persona tiene dificultades para prestar atención a un estímulo, aspecto, tema, o vivencia. Tiene disminuida su atención activa sin que necesariamente su atención pasiva esté aumentada. Su pensamiento \"está flotando\", \"vaga\" hacia recuerdos sin importancia y no puede concentrarse en lo que está haciendo. El interlocutor aprecia que el enfermo distráctil es incapaz de mantener el dialogo o de realizar las tareas más elementales",
    "Podría definirse como inestabilidad atencional y se manifiesta cuando la persona tiene dificultades para prestar atención a un estímulo, aspecto, tema, o vivencia.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Podría definirse como inestabilidad atencional y se manifiesta cuando la persona tiene dificultades para prestar atención a un estímulo, aspecto, tema, o vivencia.",
    [
      { term: "Hipervigilancia", difference: "Distraibilidad o Distractibilidad se define en el documento como: Podría definirse como inestabilidad atencional y se manifiesta cuando la persona tiene dificultades para prestar atención a un estímulo, aspecto, tema, o vivencia." }, { term: "Paraprosexias", difference: "Distraibilidad o Distractibilidad se define en el documento como: Podría definirse como inestabilidad atencional y se manifiesta cuando la persona tiene dificultades para prestar atención a un estímulo, aspecto, tema, o vivencia." }
    ],
    "Alta"
  ),
  makeConcept(
    90,
    "Hipervigilancia",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Escudriñamiento continuo en búsqueda de determinadas señales o indicios, externas [p. ej„ en el ambiente] o internas [p. ej., en el propio cuerpo]. Su atención pasiva exageradamente aumentada y se ve imposibilitado para fijar su atención activa en ninguno de los hechos que ocurren a su alrededor. Está pendiente de todo lo que sucede cerca de él. Está en un estado de alerta constante y es capaz de captar hechos que para las personas sanas son insignificantes y no puede concentrarse en ninguno de ellos específicamente, o si lo hace, sólo es por un breve instante.",
    "Escudriñamiento continuo en búsqueda de determinadas señales o indicios, externas [p.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Escudriñamiento continuo en búsqueda de determinadas señales o indicios, externas [p.",
    [
      { term: "Distraibilidad o Distractibilidad", difference: "Hipervigilancia se define en el documento como: Escudriñamiento continuo en búsqueda de determinadas señales o indicios, externas [p." }, { term: "Labilidad atentiva emocional", difference: "Hipervigilancia se define en el documento como: Escudriñamiento continuo en búsqueda de determinadas señales o indicios, externas [p." }
    ],
    "Alta"
  ),
  makeConcept(
    91,
    "Labilidad atentiva emocional",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Relacionada con inconstancia y oscilación en el rendimiento atencional ante niveles elevados de estrés o ansiedad (aunque es un término difícilmente diferenciable del de distraibilidad).",
    "Relacionada con inconstancia y oscilación en el rendimiento atencional ante niveles elevados de estrés o ansiedad (aunque es un término difícilmente diferenciable del de distraibilidad).",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Relacionada con inconstancia y oscilación en el rendimiento atencional ante niveles elevados de estrés o ansiedad (aunque es un término difícilmente diferenciable del de...",
    [
      { term: "Fatigabilidad de la atención", difference: "Labilidad atentiva emocional se define en el documento como: Relacionada con inconstancia y oscilación en el rendimiento atencional ante niveles elevados de estrés o ansiedad (aunque es un término difícilmente diferenciable del de..." }, { term: "Hipervigilancia", difference: "Labilidad atentiva emocional se define en el documento como: Relacionada con inconstancia y oscilación en el rendimiento atencional ante niveles elevados de estrés o ansiedad (aunque es un término difícilmente diferenciable del de..." }
    ],
    "Media"
  ),
  makeConcept(
    92,
    "Fatigabilidad de la atención",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Se referiría a la modificación causada por el efecto de mantener la atención, que se acompaña de escasos rendimientos y abundancia de errores. Consistiría en un agotamiento de la atención. Puede ser consecuencia de factores cerebrales, es decir, por causas como traumatismos, tumores, procesos demenciales, etc.",
    "Se referiría a la modificación causada por el efecto de mantener la atención, que se acompaña de escasos rendimientos y abundancia de errores.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se referiría a la modificación causada por el efecto de mantener la atención, que se acompaña de escasos rendimientos y abundancia de errores.",
    [
      { term: "Apatía de la atención", difference: "Fatigabilidad de la atención se define en el documento como: Se referiría a la modificación causada por el efecto de mantener la atención, que se acompaña de escasos rendimientos y abundancia de errores." }, { term: "Labilidad atentiva emocional", difference: "Fatigabilidad de la atención se define en el documento como: Se referiría a la modificación causada por el efecto de mantener la atención, que se acompaña de escasos rendimientos y abundancia de errores." }
    ],
    "Media"
  ),
  makeConcept(
    93,
    "Apatía de la atención",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "También se denomina indiferencia atencional, o incluso inatención apática, y hace referencia a una considerable falta de atención para interesarse por los acontecimientos, siendo ineficaces los estímulos que despiertan interés en situaciones normales. La persona no presta atención a acontecimientos del medio ambiente que normalmente interesarían a cualquier otro. Se puede encontrar en síndromes orgánico-cerebrales, en algún subtipo de esquizofrenia, etc.",
    "También se denomina indiferencia atencional, o incluso inatención apática, y hace referencia a una considerable falta de atención para interesarse por los acontecimientos, siendo ineficaces los estímulos que...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: También se denomina indiferencia atencional, o incluso inatención apática, y hace referencia a una considerable falta de atención para interesarse por los acontecimientos, siendo...",
    [
      { term: "Fatigabilidad de la atención", difference: "Apatía de la atención se define en el documento como: También se denomina indiferencia atencional, o incluso inatención apática, y hace referencia a una considerable falta de atención para interesarse por los acontecimientos, siendo..." }, { term: "Perplejidad de la atención", difference: "Apatía de la atención se define en el documento como: También se denomina indiferencia atencional, o incluso inatención apática, y hace referencia a una considerable falta de atención para interesarse por los acontecimientos, siendo..." }
    ],
    "Alta"
  ),
  makeConcept(
    94,
    "Perplejidad de la atención",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Alteración cualitativa de la atención. El sujeto es incapaz de sintetizar el contenido de lo atendido, no logra comprender sus acciones y las circunstancias que lo rodean.",
    "Alteración cualitativa de la atención.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Alteración cualitativa de la atención.",
    [
      { term: "Apatía de la atención", difference: "Perplejidad de la atención se define en el documento como: Alteración cualitativa de la atención." }, { term: "Sesgos atencionales", difference: "Perplejidad de la atención se define en el documento como: Alteración cualitativa de la atención." }
    ],
    "Media"
  ),
  makeConcept(
    95,
    "Sesgos atencionales",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "Tendencia a dirigir la atención, selectiva y prioritariamente, hacia el procesamiento de la información material que es relevante para la persona, porque, por ejemplo, es congruente con sus miedos, preocupaciones, o su el estado de ánimo.",
    "Tendencia a dirigir la atención, selectiva y prioritariamente, hacia el procesamiento de la información material que es relevante para la persona, porque, por ejemplo, es congruente con sus miedos...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Tendencia a dirigir la atención, selectiva y prioritariamente, hacia el procesamiento de la información material que es relevante para la persona, porque, por ejemplo, es...",
    [
      { term: "Falta de concentración", difference: "Sesgos atencionales se define en el documento como: Tendencia a dirigir la atención, selectiva y prioritariamente, hacia el procesamiento de la información material que es relevante para la persona, porque, por ejemplo, es..." }, { term: "Perplejidad de la atención", difference: "Sesgos atencionales se define en el documento como: Tendencia a dirigir la atención, selectiva y prioritariamente, hacia el procesamiento de la información material que es relevante para la persona, porque, por ejemplo, es..." }
    ],
    "Media"
  ),
  makeConcept(
    96,
    "Falta de concentración",
    "atencion",
    "Atención y concentración",
    "Semiología",
    "También conocida como dificultad para sostener la atención está presente en muchas condiciones no patológicas (p. ej., fatiga extrema, necesidad de dormir, estados de desnutrición) y en condiciones orgánicas (p. ej., daño cerebral adquirido). También está presente en una gran variedad de trastornos emocionales (especialmente en la depresión o distimia, y el trastorno de ansiedad generalizada) y el TEPT. Así pues, en el caso de la depresión o distimia y el trastorno de ansiedad generalizada, las quejas de los pacientes respecto a los problemas para mantener la concentración son muy habituales (p. ej., problemas para leer o mirar la televisión),",
    "También conocida como dificultad para sostener la atención está presente en muchas condiciones no patológicas (p.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: También conocida como dificultad para sostener la atención está presente en muchas condiciones no patológicas (p.",
    [
      { term: "Sesgos atencionales", difference: "Falta de concentración se define en el documento como: También conocida como dificultad para sostener la atención está presente en muchas condiciones no patológicas (p." }, { term: "Perplejidad de la atención", difference: "Falta de concentración se define en el documento como: También conocida como dificultad para sostener la atención está presente en muchas condiciones no patológicas (p." }
    ],
    "Alta"
  ),
  makeConcept(
    97,
    "Acinesia o aquinesia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Se define por la pérdida de movimiento o la dificultad para iniciarlo. Esta alteración se caracteriza fundamentalmente por un fallo en el inicio de los movimientos. La acinesia puede afectar a alguna parte del cuerpo (p. ej., la cabeza, los ojos, los miembros del cuerpo), al espacio de acción (p. ej., reticencia a moverse en una dirección espacial) o a las condiciones de respuesta a los estímulos (p. ej., no conseguir moverse frente a un estímulo específico). La condición médica que se asocia con más frecuencia a la acinesia es la enfermedad de Párkinson, aunque también puede estar presente en otras enfermedades (p. ej., accidentes cerebrovasculares y trastornos neurocognitivos). Esta alteración también puede observarse asociada a trastornos mentales, tales como la esquizofrenia o la depresión mayor.",
    "Se define por la pérdida de movimiento o la dificultad para iniciarlo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se define por la pérdida de movimiento o la dificultad para iniciarlo.",
    [
      { term: "Parálisis", difference: "Acinesia o aquinesia se define en el documento como: Se define por la pérdida de movimiento o la dificultad para iniciarlo." }, { term: "Cataplejía", difference: "Acinesia o aquinesia se define en el documento como: Se define por la pérdida de movimiento o la dificultad para iniciarlo." }
    ],
    "Alta"
  ),
  makeConcept(
    98,
    "Parálisis",
    "conducta",
    "Conducta motora",
    "Semiología",
    "La parálisis o paresis es la incapacidad para mover alguna parte del cuerpo como consecuencia de una lesión cerebral. La parálisis provoca desgaste y atrofia muscular de la región afectada a consecuencia de la falta de uso. Las parálisis funcionales afectan al movimiento para realizar alguna acción, por ejemplo, el paciente puede ser incapaz de permanecer de pie y, por tanto, andar y, sin embargo, puede realizar todo tipo de movimientos activos estando sentado o tumbado. Las parálisis localizadas son aquellas que afectan a un miembro o a una parte de este (p. ej., la mano). La parálisis también puede ser un síntoma del trastorno de conversión, aunque tradicionalmente se la denomina pseudoparálisis para diferenciarla de las que presentan etiología orgánica.",
    "La parálisis o paresis es la incapacidad para mover alguna parte del cuerpo como consecuencia de una lesión cerebral.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La parálisis o paresis es la incapacidad para mover alguna parte del cuerpo como consecuencia de una lesión cerebral.",
    [
      { term: "Acinesia o aquinesia", difference: "Parálisis se define en el documento como: La parálisis o paresis es la incapacidad para mover alguna parte del cuerpo como consecuencia de una lesión cerebral." }, { term: "Cataplejía", difference: "Parálisis se define en el documento como: La parálisis o paresis es la incapacidad para mover alguna parte del cuerpo como consecuencia de una lesión cerebral." }
    ],
    "Alta"
  ),
  makeConcept(
    99,
    "Cataplejía",
    "conducta",
    "Conducta motora",
    "Semiología",
    "El término hace referencia a la pérdida súbita y reversible del tono muscular durante la vigilia (sin alteración de la conciencia). Suele estar desencadenada por emociones intensas, como la risa, el llanto o la ira, y afecta a ciertos músculos voluntarios, por ejemplo, se cae la mandíbula; la cabeza, los brazos y las rodillas se doblan. La cataplejía es una alteración que frecuentemente acompaña a la narcolepsia, un trastorno del sueño caracterizado por una somnolencia diurna grave e irresistible.",
    "El término hace referencia a la pérdida súbita y reversible del tono muscular durante la vigilia (sin alteración de la conciencia).",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El término hace referencia a la pérdida súbita y reversible del tono muscular durante la vigilia (sin alteración de la conciencia).",
    [
      { term: "Catatonía", difference: "Cataplejía se define en el documento como: El término hace referencia a la pérdida súbita y reversible del tono muscular durante la vigilia (sin alteración de la conciencia)." }, { term: "Parálisis", difference: "Cataplejía se define en el documento como: El término hace referencia a la pérdida súbita y reversible del tono muscular durante la vigilia (sin alteración de la conciencia)." }
    ],
    "Alta"
  ),
  makeConcept(
    100,
    "Catatonía",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Trastorno que incluye varios síntomas: estupor, catalepsia, flexibilidad cérea, mutismo, negativismo, perseveración, manierismos, estereotipias, agitación, muecas y ecosíntomas. También puede ser un especificador de diversos trastornos mentales, estar asociada a diferentes enfermedades médicas, o ser precipitada por los efectos secundarios de algunos medicamentos antipsicóticos.",
    "Trastorno que incluye varios síntomas: estupor, catalepsia, flexibilidad cérea, mutismo, negativismo, perseveración, manierismos, estereotipias, agitación, muecas y ecosíntomas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Trastorno que incluye varios síntomas: estupor, catalepsia, flexibilidad cérea, mutismo, negativismo, perseveración, manierismos, estereotipias, agitación, muecas y ecosíntomas.",
    [
      { term: "Cataplejía", difference: "Catatonía se define en el documento como: Trastorno que incluye varios síntomas: estupor, catalepsia, flexibilidad cérea, mutismo, negativismo, perseveración, manierismos, estereotipias, agitación, muecas y ecosíntomas." }, { term: "Retardo", difference: "Catatonía se define en el documento como: Trastorno que incluye varios síntomas: estupor, catalepsia, flexibilidad cérea, mutismo, negativismo, perseveración, manierismos, estereotipias, agitación, muecas y ecosíntomas." }
    ],
    "Media"
  ),
  makeConcept(
    101,
    "Retardo",
    "conducta",
    "Conducta motora",
    "Semiología",
    "El retardo (o retraso) psicomotor o inhibición psicomotriz se caracteriza por anormalidades de la marcha, la expresión facial, los gestos, el habla, la psicomotricidad fina, y los procesos de pensamiento. Esta alteración implica lentitud en la iniciación, ejecución y finalización de la actividad motora y del pensamiento (bradipsiquia) sin que exista una causa orgánica aparente. Al paciente le resulta más difícil iniciar y llevar a cabo cualquier actividad, así como pensar, dando lugar a una reducción de la actividad motora espontánea y a mayores latencias de respuesta.",
    "El retardo (o retraso) psicomotor o inhibición psicomotriz se caracteriza por anormalidades de la marcha, la expresión facial, los gestos, el habla, la psicomotricidad fina, y los procesos de pensamiento.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El retardo (o retraso) psicomotor o inhibición psicomotriz se caracteriza por anormalidades de la marcha, la expresión facial, los gestos, el habla, la psicomotricidad fina, y los...",
    [
      { term: "Catatonía", difference: "Retardo se define en el documento como: El retardo (o retraso) psicomotor o inhibición psicomotriz se caracteriza por anormalidades de la marcha, la expresión facial, los gestos, el habla, la psicomotricidad fina, y los..." }, { term: "Hipocinesia o Hipoquinesia", difference: "Retardo se define en el documento como: El retardo (o retraso) psicomotor o inhibición psicomotriz se caracteriza por anormalidades de la marcha, la expresión facial, los gestos, el habla, la psicomotricidad fina, y los..." }
    ],
    "Alta"
  ),
  makeConcept(
    102,
    "Hipocinesia o Hipoquinesia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Algunos autores diferencian el retardo psicomotor de la reducción de la actividad motora espontánea o hipocinesia, que recogería la reducción en las actividades que realiza la persona, el hacer pocas cosas (p. ej., dejar de hacer las tareas sencillas del hogar, o en un grado más leve dejar de hacer algunas cosas que antes se hacían como, por ejemplo, quedar con los amigos). Es una característica asociada a la motivación y a diversas alteraciones como el estupor, los episodios depresivos, la esquizofrenia, o estados de intoxicación. También se puede observar en estados elevados de ansiedad.",
    "Algunos autores diferencian el retardo psicomotor de la reducción de la actividad motora espontánea o hipocinesia, que recogería la reducción en las actividades que realiza la persona, el hacer pocas cosas (p.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Algunos autores diferencian el retardo psicomotor de la reducción de la actividad motora espontánea o hipocinesia, que recogería la reducción en las actividades que realiza la...",
    [
      { term: "Obstrucción", difference: "Hipocinesia o Hipoquinesia se define en el documento como: Algunos autores diferencian el retardo psicomotor de la reducción de la actividad motora espontánea o hipocinesia, que recogería la reducción en las actividades que realiza la..." }, { term: "Retardo", difference: "Hipocinesia o Hipoquinesia se define en el documento como: Algunos autores diferencian el retardo psicomotor de la reducción de la actividad motora espontánea o hipocinesia, que recogería la reducción en las actividades que realiza la..." }
    ],
    "Alta"
  ),
  makeConcept(
    103,
    "Obstrucción",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Se describe como el bloqueo de una actividad motora, y puede manifestarse de diversas formas. Por ejemplo, la persona puede ser incapaz de iniciar una acción en un momento dado, pero poco después llevarla a cabo sin dificultad; o ante la solicitud de que mueva una parte de su cuerpo puede comenzar a realizar el movimiento y luego detenerse a mitad sin saber cómo continuar; o la persona puede estar realizando una acción voluntaria y detenerse a mitad de forma abrupta. Puede afectar a los movimientos habituales y reactivos, de modo que puede impedir que el paciente se proteja ante una amenaza; así, por ejemplo, un paciente puede permitir que una mosca permanezca en su cara sin espantarla, o no volverse hacia su interlocutor cuando este le habla.",
    "Se describe como el bloqueo de una actividad motora, y puede manifestarse de diversas formas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se describe como el bloqueo de una actividad motora, y puede manifestarse de diversas formas.",
    [
      { term: "Hipercinesia o hiperquinesia", difference: "Obstrucción se define en el documento como: Se describe como el bloqueo de una actividad motora, y puede manifestarse de diversas formas." }, { term: "Hipocinesia o Hipoquinesia", difference: "Obstrucción se define en el documento como: Se describe como el bloqueo de una actividad motora, y puede manifestarse de diversas formas." }
    ],
    "Alta"
  ),
  makeConcept(
    104,
    "Hipercinesia o hiperquinesia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "También denominada hiperactividad se define como el estado en el que la persona realiza un elevado número de acciones en un corto período de tiempo o simultáneamente, sin llegar a completar mucha de ellas. La hiperquinesia se puede manifestar de dos formas habitualmente Hiperquinesia productiva: Cuando la inquietud que presenta la persona es aprovechada para hacer algo productivo. Generalmente estas personas siempre están haciendo algo, pero algo útil y esta forma se asocia a estados habituales de algunos tipos de personalidades o a cuadros de ansiedad. Hiperquinesia improductiva: En este caso la intranquilidad que presenta el sujeto enfermo se traduce en movimientos que no cumplen un fin específico. Caminan por la casa o la sala del hospital de un lado a otro sin un objetivo, si se sientan se mecen constantemente, aunque sea en una silla o mueven las piernas, etc.",
    "También denominada hiperactividad se define como el estado en el que la persona realiza un elevado número de acciones en un corto período de tiempo o simultáneamente, sin llegar a completar mucha de ellas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: También denominada hiperactividad se define como el estado en el que la persona realiza un elevado número de acciones en un corto período de tiempo o simultáneamente, sin llegar a...",
    [
      { term: "Agitación", difference: "Hipercinesia o hiperquinesia se define en el documento como: También denominada hiperactividad se define como el estado en el que la persona realiza un elevado número de acciones en un corto período de tiempo o simultáneamente, sin llegar a..." }, { term: "Obstrucción", difference: "Hipercinesia o hiperquinesia se define en el documento como: También denominada hiperactividad se define como el estado en el que la persona realiza un elevado número de acciones en un corto período de tiempo o simultáneamente, sin llegar a..." }
    ],
    "Alta"
  ),
  makeConcept(
    105,
    "Agitación",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Este término se aplica cuando la hipercinesia es extrema y, a diferencia de esta, los movimientos carecen de objetivo. El paciente puede informar de una sensación de tensión o inquietud interna, que efectivamente coincide con una elevada frecuencia de movimientos, a menudo repetitivos, desorganizados o incoherentes, como caminar muy rápido, moverse nerviosamente incapacidad para permanecer sentado, o retorcerse las manos, entre otros. Atendiendo a la etiología de la agitación, esta se puede clasificar en tres categorías Agitaciones reactivas: Se dan como consecuencia de situaciones o acontecimientos estresantes, de factores tóxicos como efectos secundarios de medicamentos, y de intoxicación y abstinencia a drogas. Agitaciones en trastornos orgánico-cerebrales: Son aquellas que aparecen en cuadros confuso-oníricos como el delirium tremens, en las crisis de la epilepsia, y como consecuencia de infartos o traumatismos cerebrales.",
    "Este término se aplica cuando la hipercinesia es extrema y, a diferencia de esta, los movimientos carecen de objetivo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Este término se aplica cuando la hipercinesia es extrema y, a diferencia de esta, los movimientos carecen de objetivo.",
    [
      { term: "Hipercinesia o hiperquinesia", difference: "Agitación se define en el documento como: Este término se aplica cuando la hipercinesia es extrema y, a diferencia de esta, los movimientos carecen de objetivo." }, { term: "Inquietud", difference: "Agitación se define en el documento como: Este término se aplica cuando la hipercinesia es extrema y, a diferencia de esta, los movimientos carecen de objetivo." }
    ],
    "Alta"
  ),
  makeConcept(
    106,
    "Inquietud",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Se trata de un nivel leve de hiperactividad, donde los movimientos no tienen un objetivo. En este estado el paciente mantiene cierto control sobre su conducta. Al igual que la hiperactividad, la inquietud se observa en estados de ansiedad y en pacientes con depresión con características mixtas, y también puede ser un efecto secundario de los neurolépticos.",
    "Se trata de un nivel leve de hiperactividad, donde los movimientos no tienen un objetivo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se trata de un nivel leve de hiperactividad, donde los movimientos no tienen un objetivo.",
    [
      { term: "Agitación", difference: "Inquietud se define en el documento como: Se trata de un nivel leve de hiperactividad, donde los movimientos no tienen un objetivo." }, { term: "Interceptación cinética", difference: "Inquietud se define en el documento como: Se trata de un nivel leve de hiperactividad, donde los movimientos no tienen un objetivo." }
    ],
    "Media"
  ),
  makeConcept(
    107,
    "Interceptación cinética",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Es la interrupción brusca y sin motivos de un movimiento en fase de ejecución, sin haber logrado la finalidad o meta de este. Es como si se tratara de una película de vídeo a la que se le coloca pausa, al poco rato el movimiento se reinicia, como si le diéramos play de nuevo.",
    "Es la interrupción brusca y sin motivos de un movimiento en fase de ejecución, sin haber logrado la finalidad o meta de este.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es la interrupción brusca y sin motivos de un movimiento en fase de ejecución, sin haber logrado la finalidad o meta de este.",
    [
      { term: "Inquietud", difference: "Interceptación cinética se define en el documento como: Es la interrupción brusca y sin motivos de un movimiento en fase de ejecución, sin haber logrado la finalidad o meta de este." }, { term: "Negativismo", difference: "Interceptación cinética se define en el documento como: Es la interrupción brusca y sin motivos de un movimiento en fase de ejecución, sin haber logrado la finalidad o meta de este." }
    ],
    "Media"
  ),
  makeConcept(
    108,
    "Negativismo",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Se caracteriza por la oposición o resistencia del paciente, sin motivación aparente, a seguir las instrucciones o movimientos que se le demandan. Se puede distinguir entre: Negativismo pasivo en el que la resistencia del paciente no es activa (p. ej„ se le pide que levante el brazo y no lo mueve; se le tiende la mano para saludarle, y no mueve su mano). Negativismo activo en que el paciente realiza la acción contraria a la demandada (p. ej., cuando se le pide al paciente que se levante, se sienta, o el examinador le pide al paciente que continúe andando y este se detiene).",
    "Se caracteriza por la oposición o resistencia del paciente, sin motivación aparente, a seguir las instrucciones o movimientos que se le demandan.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se caracteriza por la oposición o resistencia del paciente, sin motivación aparente, a seguir las instrucciones o movimientos que se le demandan.",
    [
      { term: "Interceptación cinética", difference: "Negativismo se define en el documento como: Se caracteriza por la oposición o resistencia del paciente, sin motivación aparente, a seguir las instrucciones o movimientos que se le demandan." }, { term: "Obediencia automática", difference: "Negativismo se define en el documento como: Se caracteriza por la oposición o resistencia del paciente, sin motivación aparente, a seguir las instrucciones o movimientos que se le demandan." }
    ],
    "Alta"
  ),
  makeConcept(
    109,
    "Obediencia automática",
    "conducta",
    "Conducta motora",
    "Semiología",
    "En este trastorno el paciente lleva a cabo una instrucción sin importar las consecuencias. Para demostrar esto, se debe pedir al paciente que se resista a las instrucciones del examinador. Así, por ejemplo, Emil Kraepelin les pedía a sus pacientes que sacaran la lengua, y él los pinchaba con un alfiler; los pacientes con obediencia automática seguían sacando la lengua cuando se les pedía, a pesar de que cada vez que lo hacían recibían un pinchazo que les molestaba.",
    "En este trastorno el paciente lleva a cabo una instrucción sin importar las consecuencias.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: En este trastorno el paciente lleva a cabo una instrucción sin importar las consecuencias.",
    [
      { term: "Ambitendencia o ambivalencia motora", difference: "Obediencia automática se define en el documento como: En este trastorno el paciente lleva a cabo una instrucción sin importar las consecuencias." }, { term: "Negativismo", difference: "Obediencia automática se define en el documento como: En este trastorno el paciente lleva a cabo una instrucción sin importar las consecuencias." }
    ],
    "Alta"
  ),
  makeConcept(
    110,
    "Ambitendencia o ambivalencia motora",
    "conducta",
    "Conducta motora",
    "Semiología",
    "También denominada ambivalencia motora es considerada por algunos autores como una forma leve (o previa) de negativísimo. Se refiere a la tendencia a realizar simultáneamente dos acciones que resultan antagónicas, por lo que, al iniciarse, se interfieren entre sí, y no llegan a completarse. Por ejemplo, cuando el examinador le ofrece su mano al paciente para saludarle, este mueve su mano derecha hacia la mano del examinador como si fuera a saludarle, pero antes de chocar la mano, se detiene, comienza a mover la mano de nuevo y vuelve a detenerse, y así sucesivamente, hasta que la mano finalmente se queda en reposo sin llegar a tocar, y por tanto saludar, la mano del examinador.",
    "También denominada ambivalencia motora es considerada por algunos autores como una forma leve (o previa) de negativísimo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: También denominada ambivalencia motora es considerada por algunos autores como una forma leve (o previa) de negativísimo.",
    [
      { term: "Obediencia automática", difference: "Ambitendencia o ambivalencia motora se define en el documento como: También denominada ambivalencia motora es considerada por algunos autores como una forma leve (o previa) de negativísimo." }, { term: "Perseveración motora Perseveración motora", difference: "Ambitendencia o ambivalencia motora se define en el documento como: También denominada ambivalencia motora es considerada por algunos autores como una forma leve (o previa) de negativísimo." }
    ],
    "Alta"
  ),
  makeConcept(
    111,
    "Perseveración motora Perseveración motora",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Es la incapacidad para cambiar de tarea o movimiento. El paciente repite una acción, que pudo tener sentido antes, pero no actualmente. Por lo que respecta a la perseveración motora, esta se clasifica en: Simple, cuando el paciente no cesa de realizar una actividad que se le pidió (p. ej„ se le solicita que saque la lengua y la saca y mete sin cesar; se le pide que dibuje un círculo y no deja de dibujar círculos) Iterativa, cuando se repite un mismo movimiento solicitado (p. ej„ dibuja un círculo, y al terminarlo, dibuja otro más) Sustitutiva, cuando se realiza de nuevo el mismo movimiento acción previamente solicitada, a pesar de que se le pide que realice otro (p. ej„ cuando después de haber dibujado el círculo que se le había pedido, se le indica que dibuje una cruz y continúa dibujando círculos). Son signos típicos de la presencia de perseveración: El reflejo de asir (i. e., el paciente agarra cualquier objeto que se le ponga por delante sin intención de utilizarlo con algún propósito) El asimiento forzado (i. e„ el paciente sigue dando la mano pese a que se le ha pedido que no lo haga) El signo del imán (i. e„ el examinador toca con un dedo la palma de la mano del paciente y, al retirarlo, la mano del paciente sigue el dedo del examinador como si tuviera un imán).",
    "Es la incapacidad para cambiar de tarea o movimiento.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es la incapacidad para cambiar de tarea o movimiento.",
    [
      { term: "Ambitendencia o ambivalencia motora", difference: "Perseveración motora Perseveración motora se define en el documento como: Es la incapacidad para cambiar de tarea o movimiento." }, { term: "Flexibilidad cérea", difference: "Perseveración motora Perseveración motora se define en el documento como: Es la incapacidad para cambiar de tarea o movimiento." }
    ],
    "Alta"
  ),
  makeConcept(
    112,
    "Flexibilidad cérea",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Se caracteriza por una sensación de resistencia plástica cuando el examinador mueve el cuerpo del paciente, lo que se asemeja a la flexión de una varilla de cera blanda. Cuando el movimiento pasivo se detiene, se conserva la postura final (durante un minuto o más), aunque resulte incómoda para el paciente. De manera similar, en el fenómeno de la almohada psicológica el paciente es capaz de sostener la cabeza en el aire durante horas, sin cansancio alguno. La flexibilidad cérea y la almohada psicológica pueden presentarse de manera independiente o asociadas a otras alteraciones, tales como la perseveración o la catatonía.",
    "Se caracteriza por una sensación de resistencia plástica cuando el examinador mueve el cuerpo del paciente, lo que se asemeja a la flexión de una varilla de cera blanda.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se caracteriza por una sensación de resistencia plástica cuando el examinador mueve el cuerpo del paciente, lo que se asemeja a la flexión de una varilla de cera blanda.",
    [
      { term: "Catalepsia", difference: "Flexibilidad cérea se define en el documento como: Se caracteriza por una sensación de resistencia plástica cuando el examinador mueve el cuerpo del paciente, lo que se asemeja a la flexión de una varilla de cera blanda." }, { term: "Perseveración motora Perseveración motora", difference: "Flexibilidad cérea se define en el documento como: Se caracteriza por una sensación de resistencia plástica cuando el examinador mueve el cuerpo del paciente, lo que se asemeja a la flexión de una varilla de cera blanda." }
    ],
    "Alta"
  ),
  makeConcept(
    113,
    "Catalepsia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Es una alteración motora que se caracteriza por la aparición repentina y momentánea de inmovilidad y rigidez muscular, sin que la persona responda a los estímulos sensoriales. La persona adquiere una posición inmóvil mantenida de manera constante, a veces se pueden movilizar sus miembros de manera pasiva, mostrando flexibilidad cérea, y quedándose en la posición que se dejan. Esta alteración se asocia también a la esquizofrenia con catatonía.",
    "Es una alteración motora que se caracteriza por la aparición repentina y momentánea de inmovilidad y rigidez muscular, sin que la persona responda a los estímulos sensoriales.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es una alteración motora que se caracteriza por la aparición repentina y momentánea de inmovilidad y rigidez muscular, sin que la persona responda a los estímulos sensoriales.",
    [
      { term: "Ecosíntomas", difference: "Catalepsia se define en el documento como: Es una alteración motora que se caracteriza por la aparición repentina y momentánea de inmovilidad y rigidez muscular, sin que la persona responda a los estímulos sensoriales." }, { term: "Flexibilidad cérea", difference: "Catalepsia se define en el documento como: Es una alteración motora que se caracteriza por la aparición repentina y momentánea de inmovilidad y rigidez muscular, sin que la persona responda a los estímulos sensoriales." }
    ],
    "Alta"
  ),
  makeConcept(
    114,
    "Ecosíntomas",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Consisten en que la persona imita los movimientos, gestos, o palabras de otra persona. Se suele diferenciar entre: ecopraxia o (ecocinesis), en la que se da una imitación automática de los movimientos observados en otra persona; la ecomímica en la que el paciente imita los gestos de su interlocutor.",
    "Consisten en que la persona imita los movimientos, gestos, o palabras de otra persona.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Consisten en que la persona imita los movimientos, gestos, o palabras de otra persona.",
    [
      { term: "Catalepsia", difference: "Ecosíntomas se define en el documento como: Consisten en que la persona imita los movimientos, gestos, o palabras de otra persona." }, { term: "Espasmos", difference: "Ecosíntomas se define en el documento como: Consisten en que la persona imita los movimientos, gestos, o palabras de otra persona." }
    ],
    "Media"
  ),
  makeConcept(
    115,
    "Espasmos",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Contracciones involuntarias de los músculos. Son muy comunes y pueden adoptar diversas formas. Se clasifican como movimientos espasmódicos la corea, balismo, mioclonía, convulsiones y tics, a diferencia del temblor, discinesia y distonía no espasmódica.",
    "Contracciones involuntarias de los músculos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Contracciones involuntarias de los músculos.",
    [
      { term: "Ecosíntomas", difference: "Espasmos se define en el documento como: Contracciones involuntarias de los músculos." }, { term: "Temblor", difference: "Espasmos se define en el documento como: Contracciones involuntarias de los músculos." }
    ],
    "Media"
  ),
  makeConcept(
    116,
    "Temblor",
    "conducta",
    "Conducta motora",
    "Semiología",
    "El término temblor remite, en general, a un movimiento no intencional, oscilatorio y rítmico que se produce por la contracción síncrona alternante de músculos agonistas y antagonistas. Aunque es más visible en las manos, puede observarse también en piernas, cabeza y voz. El temblor es uno de los trastornos del movimiento más frecuentes. En general, el temblor se puede clasificar en tres tipos El temblor estático o de reposo se da cuando el miembro afectado está apoyado sobre una superficie, no activamente contraído. Este tipo de temblor suele ser fino, es decir, con poca amplitud y alta frecuencia. A menudo se observa solo en manos o dedos, aunque también en la cabeza y en la parte superior del tronco. Suele acompañarse de rigidez muscular junto con una reducción o incluso ausencia de movimientos. El temblor intencional se observa cuando la persona inicia un movimiento voluntario, como coger un objeto o tocarse la nariz con el dedo, de modo que dificulta la consecución de este. Desaparece cuando el miembro está en reposo. En ocasiones se asocia a un movimiento concreto como escribir o cantar. El temblor intencional es más grueso que el temblor estático, esto es, las oscilaciones presentan mayor amplitud y menor frecuencia. El temblor postural aparece cuando la persona trata de mantenerse en una postura en contra de la gravedad, como por ejemplo al tratar de mantener brazos o piernas extendidas. Se puede clasificar en función de la frecuencia de sus oscilaciones: el temblor de acción rápida (entre 8 y 12 movimientos por segundo), que es más común en estados de ansiedad y de intoxicaciones con sustancias, y el de acción lenta (de 4 a 6 movimientos por segundo), que se asocia a enfermedades estructurales del cerebro.",
    "El término temblor remite, en general, a un movimiento no intencional, oscilatorio y rítmico que se produce por la contracción síncrona alternante de músculos agonistas y antagonistas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El término temblor remite, en general, a un movimiento no intencional, oscilatorio y rítmico que se produce por la contracción síncrona alternante de músculos agonistas y...",
    [
      { term: "Balismo", difference: "Temblor se define en el documento como: El término temblor remite, en general, a un movimiento no intencional, oscilatorio y rítmico que se produce por la contracción síncrona alternante de músculos agonistas y..." }, { term: "Espasmos", difference: "Temblor se define en el documento como: El término temblor remite, en general, a un movimiento no intencional, oscilatorio y rítmico que se produce por la contracción síncrona alternante de músculos agonistas y..." }
    ],
    "Alta"
  ),
  makeConcept(
    117,
    "Balismo",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Este es un tipo de movimiento espástico muy brusco, como un \"disparo\", y de gran amplitud, que se da desde el hombro o desde la pelvis. Se produce en una extremidad, normalmente en el brazo, y solo en un lado del cuerpo (hemibalismo). El balismo bilateral es raro y se asocia a alteraciones metabólicas. En ocasiones se presenta solo en un miembro (monobalismo). Esta alteración suele darse en pacientes que también presentan corea.",
    "Este es un tipo de movimiento espástico muy brusco, como un \"disparo\", y de gran amplitud, que se da desde el hombro o desde la pelvis.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Este es un tipo de movimiento espástico muy brusco, como un \"disparo\", y de gran amplitud, que se da desde el hombro o desde la pelvis.",
    [
      { term: "Distonía", difference: "Balismo se define en el documento como: Este es un tipo de movimiento espástico muy brusco, como un \"disparo\", y de gran amplitud, que se da desde el hombro o desde la pelvis." }, { term: "Temblor", difference: "Balismo se define en el documento como: Este es un tipo de movimiento espástico muy brusco, como un \"disparo\", y de gran amplitud, que se da desde el hombro o desde la pelvis." }
    ],
    "Alta"
  ),
  makeConcept(
    118,
    "Distonía",
    "conducta",
    "Conducta motora",
    "Semiología",
    "La distonía es un movimiento involuntario que se caracteriza por una contracción muscular sostenida en el tiempo causando retorcimiento, movimientos repetitivos, o posturas extrañas. Puede darse en todo el cuerpo, el tronco, las extremidades o el cuello. Puede estar ocasionada por una alteración genética (distonía primaria), o también secundaria a trastornos o fármacos, como los antipsicóticos Existe una gran variedad en la velocidad en la que se dan los movimientos, desde espasmos distónicos donde se dan breves contracciones, o posturas distónicas, donde la contracción puede prolongarse durante horas o incluso días, produciendo dolor y causando una gran incapacidad. En función de la distribución, la distonía se puede clasificar en cuatro tipos: La distonía focal se da cuando involucra a una sola área del cuerpo. Incluidas en este tipo estaría la tortícolis espasmódico, que afecta a los músculos del cuello. La distonía espasmódica, que afecta a las cuerdas vocales y puede ocasionar desde ronquera hasta afonía. Las distonías ocupacionales, profesionales, o de tareas específicas, que se pueden observar por un uso excesivo de una parte del cuerpo, como en escritores, golfistas o músicos, especialmente pianistas. La distonía segmentaria, es aquella en la que se ven involucradas dos áreas contiguas del cuerpo. Las distonías focales y las segmentarias suelen comenzar entre los 20 y los 30 años, y al inicio pueden ocurrir solo ocasionalmente o ante situaciones de estrés, hasta llegar a empeorar y mantenerse esa parte del cuerpo contorsionada. Distonía multifocal cuando se da en dos o más áreas no contiguas del cuerpo, y distonía generalizada cuando se da en el tronco y dos partes del cuerpo. La distonía que comienza en la infancia suele evolucionar a la forma generalizada, mientras que si tiene inicio en la adultez normalmente se mantiene en la forma focal o segmentaria.",
    "La distonía es un movimiento involuntario que se caracteriza por una contracción muscular sostenida en el tiempo causando retorcimiento, movimientos repetitivos, o posturas extrañas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La distonía es un movimiento involuntario que se caracteriza por una contracción muscular sostenida en el tiempo causando retorcimiento, movimientos repetitivos, o posturas...",
    [
      { term: "Balismo", difference: "Distonía se define en el documento como: La distonía es un movimiento involuntario que se caracteriza por una contracción muscular sostenida en el tiempo causando retorcimiento, movimientos repetitivos, o posturas..." }, { term: "Míoclonía", difference: "Distonía se define en el documento como: La distonía es un movimiento involuntario que se caracteriza por una contracción muscular sostenida en el tiempo causando retorcimiento, movimientos repetitivos, o posturas..." }
    ],
    "Alta"
  ),
  makeConcept(
    119,
    "Míoclonía",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Se caracteriza por movimientos espasmódicos con amplitud variable muy rápidos y breves. Puede afectar solo a una mano, o a varios músculos a la vez en el brazo, pierna, o cara. Habitualmente se distingue entre mioclonía positiva (la más frecuente), cuando se produce movimiento muscular, y negativa, cuando se produce inhibición del tono muscular. También se clasifica en función de su etiología en: Esencial, cuando no se conoce la causa. Epiléptica o sintomática, cuando es secundaria a otro trastorno (p. ej„ a la enfermedad de Creutzfeldt-Jakob). Fisiológica, donde las más frecuentes son las del sueño (hípnicas) que ocurren al conciliar el sueño o al despertar.",
    "Se caracteriza por movimientos espasmódicos con amplitud variable muy rápidos y breves.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se caracteriza por movimientos espasmódicos con amplitud variable muy rápidos y breves.",
    [
      { term: "Convulsiones", difference: "Míoclonía se define en el documento como: Se caracteriza por movimientos espasmódicos con amplitud variable muy rápidos y breves." }, { term: "Distonía", difference: "Míoclonía se define en el documento como: Se caracteriza por movimientos espasmódicos con amplitud variable muy rápidos y breves." }
    ],
    "Alta"
  ),
  makeConcept(
    120,
    "Convulsiones",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Las convulsiones se caracterizan por la contracción violenta, incontrolable y difusa de la musculatura voluntaria que son características de la epilepsia, pero que también se dan en traumatismos craneales, abstinencia al alcohol, tumores, trastornos metabólicos, lesiones congénitas o asociadas a la fiebre en niños, entre otros. En función del área donde se inicia la crisis, estas se clasifican en dos grandes categorías: focales y generalizadas.",
    "Las convulsiones se caracterizan por la contracción violenta, incontrolable y difusa de la musculatura voluntaria que son características de la epilepsia, pero que también se dan en traumatismos craneales...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Las convulsiones se caracterizan por la contracción violenta, incontrolable y difusa de la musculatura voluntaria que son características de la epilepsia, pero que también se dan...",
    [
      { term: "Míoclonía", difference: "Convulsiones se define en el documento como: Las convulsiones se caracterizan por la contracción violenta, incontrolable y difusa de la musculatura voluntaria que son características de la epilepsia, pero que también se dan..." }, { term: "Tics", difference: "Convulsiones se define en el documento como: Las convulsiones se caracterizan por la contracción violenta, incontrolable y difusa de la musculatura voluntaria que son características de la epilepsia, pero que también se dan..." }
    ],
    "Alta"
  ),
  makeConcept(
    121,
    "Tics",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Los tics se caracterizan por ser movimientos involuntarios repentinos, intermitentes, espasmódicos y sin objetivo. Suelen surgir en la infancia, y la mayoría son leves y no causan interferencia a la persona. Su aparición se agrava con la ansiedad, reduciéndose con la distracción. Un aspecto importante de los tics, y que lo diferencia de otros movimientos involuntarios como la mioclonía, corea y estereotipias, es que los tics normalmente están precedidos por una sensación de tensión previa y pueden ser suprimidos voluntariamente, aunque por un tiempo breve. Habitualmente se clasifican en tics motores y fies vocálicos fónicos, aunque los vocálicos son en realidad tics motores que involucran la respiración, laringe, boca y musculatura nasal, que mediante la contracción de los músculos hace que la persona emita sonidos. Ambos tipos, en función de la forma que adopten, pueden clasificarse en tics simples, que duran milisegundos, como son el parpadeo, arrugar la nariz, o toser; y tics complejos, que duran segundos, como gestos faciales, palabras malsonantes u obscenas (coprolalid), repeticiones de sonidos, palabras o frases que se acaban de oír al interlocutor (.ecolalia! y repetición de sonidos o palabras que acaba de decir la propia persona (palilalia), aunque estos últimos algunos autores abogan por conceptualizarlos como estereotipias. También se clasifican en tics clónicos, que son repentinos y rápidos (100 ms) como el parpadeo, y los tics prolongados, de generalmente más de 300 ms.supresión ocasiona una sensación de tensión y malestar, el impulso a realizarlo, que solo es aliviado cuando se lleva a cabo.",
    "Los tics se caracterizan por ser movimientos involuntarios repentinos, intermitentes, espasmódicos y sin objetivo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Los tics se caracterizan por ser movimientos involuntarios repentinos, intermitentes, espasmódicos y sin objetivo.",
    [
      { term: "Convulsiones", difference: "Tics se define en el documento como: Los tics se caracterizan por ser movimientos involuntarios repentinos, intermitentes, espasmódicos y sin objetivo." }, { term: "Estereotipias", difference: "Tics se define en el documento como: Los tics se caracterizan por ser movimientos involuntarios repentinos, intermitentes, espasmódicos y sin objetivo." }
    ],
    "Alta"
  ),
  makeConcept(
    122,
    "Estereotipias",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Consisten en la repetición continuada e innecesaria de movimientos o gestos que son complejos y organizados, como el frotarse las manos o la cara, golpetear con los dedos, mecer el cuerpo, o golpearse. Pueden aparecer cuando la persona está concentrada en alguna actividad, pero también ante emociones fuertes o aburrimiento. A menudo la persona no se da cuenta de que está haciendo estos movimientos. Las estereotipias, de la misma manera que los tics, se pueden clasificar en estereotipias motoras o fónicas (p. ej., gruñidos, gemidos o zumbidos), y en simples (p. ej., golpeteo de dedos, rascar, acariciar, dar palmadas en las rodillas), que suelen aparecer en las demencias, o complejas (p. ej., sentarse y levantarse de una silla), típicas de trastornos psicóticos no orgánicos. En ocasiones algunas estereotipias pueden asemejarse a las compulsiones por su carácter estereotipado. La diferencia es que mientras que la conducta estereotipada es reforzante en sí misma y sin objetivo, los rituales se realizan para reducir la ansiedad que experimenta la persona.",
    "Consisten en la repetición continuada e innecesaria de movimientos o gestos que son complejos y organizados, como el frotarse las manos o la cara, golpetear con los dedos, mecer el cuerpo, o golpearse.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Consisten en la repetición continuada e innecesaria de movimientos o gestos que son complejos y organizados, como el frotarse las manos o la cara, golpetear con los dedos, mecer...",
    [
      { term: "Automatismos motores", difference: "Estereotipias se define en el documento como: Consisten en la repetición continuada e innecesaria de movimientos o gestos que son complejos y organizados, como el frotarse las manos o la cara, golpetear con los dedos, mecer..." }, { term: "Tics", difference: "Estereotipias se define en el documento como: Consisten en la repetición continuada e innecesaria de movimientos o gestos que son complejos y organizados, como el frotarse las manos o la cara, golpetear con los dedos, mecer..." }
    ],
    "Alta"
  ),
  makeConcept(
    123,
    "Automatismos motores",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Son movimientos involuntarios repetitivos que se realizan sin control consciente, automático, y, por tanto, no tienen un objetivo. La persona durante el automatismo mantiene la postura y el tono muscular. Surgen en estados alterados de consciencia, en situaciones en las que la persona está confusa y no responde o su respuesta no es adecuada. Tras el episodio la persona normalmente no recordará lo que ha hecho. Se pueden clasificar en simples, como masticar, parpadear, succionar, o complejos, como movimiento de pedaleo, caminar o continuar con una acción que estuviera haciendo tal como conducir o limpiar. Los automatismos son característicos de la fase previa a las crisis de la epilepsia o aura, especialmente en las crisis temporales. También pueden aparecer en traumatismos, sonambulismo, intoxicación por sustancias, y catatonía.",
    "Son movimientos involuntarios repetitivos que se realizan sin control consciente, automático, y, por tanto, no tienen un objetivo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Son movimientos involuntarios repetitivos que se realizan sin control consciente, automático, y, por tanto, no tienen un objetivo.",
    [
      { term: "Acatisia", difference: "Automatismos motores se define en el documento como: Son movimientos involuntarios repetitivos que se realizan sin control consciente, automático, y, por tanto, no tienen un objetivo." }, { term: "Estereotipias", difference: "Automatismos motores se define en el documento como: Son movimientos involuntarios repetitivos que se realizan sin control consciente, automático, y, por tanto, no tienen un objetivo." }
    ],
    "Alta"
  ),
  makeConcept(
    124,
    "Acatisia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "La característica definitoria es la sensación subjetiva de inquietud, tensión y el impulso irrefrenable de moverse. El signo observable de la acatisia es el movimiento repetitivo que alivia el malestar, como por ejemplo «caminar» sin moverse del sitio, balancearse, o mover las piernas mientras está sentado, aunque en los casos leves no siempre se da el movimiento observable. Cuando la gravedad es leve o moderada afecta predominantemente a las extremidades inferiores, y a medida que la gravedad es mayor se pueden ver involucradas otras partes del cuerpo. La acatisia puede ser un efecto secundario de los antidepresivos, litio o de los neurolépticos, pudiendo aparecer a los pocos días (acatisia aguda) o después de tres meses o más de tomar la medicación (acatisia tardía). También se han dado casos de acatisia en pacientes con esquizofrenia que no habían recibido tratamiento (acatisia espontánea).",
    "La característica definitoria es la sensación subjetiva de inquietud, tensión y el impulso irrefrenable de moverse.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La característica definitoria es la sensación subjetiva de inquietud, tensión y el impulso irrefrenable de moverse.",
    [
      { term: "Automatismos motores", difference: "Acatisia se define en el documento como: La característica definitoria es la sensación subjetiva de inquietud, tensión y el impulso irrefrenable de moverse." }, { term: "Evitación y escape", difference: "Acatisia se define en el documento como: La característica definitoria es la sensación subjetiva de inquietud, tensión y el impulso irrefrenable de moverse." }
    ],
    "Alta"
  ),
  makeConcept(
    125,
    "Evitación y escape",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Se definen como una reacción conductual o cognitiva que la persona realiza ante una situación o un estímulo que le provoca miedo o malestar con el objetivo de mantenerse lejos del estímulo o situación temida. Se puede distinguir entre el escape o huida, es decir, cuando la persona está en la situación y sale de la misma (p. ej., el paciente con fobia a los aviones que, en la puerta de embarque, o ya sentado en el avión, decide que se marcha) La evitación activa implica que la persona realiza comportamientos dirigidos a prevenir o minimizar la posibilidad de contacto con aquello que teme de modo que elude enfrentarse al objeto temido (p. ej., el paciente no acude al aeropuerto para coger el avión; o no sube al metro) La evitación pasiva, en la que la persona deja de hacer algo, es decir, inhibe una conducta que ha sido previamente castigada (p. ej., el paciente no llega a comprar el billete de avión).",
    "Se definen como una reacción conductual o cognitiva que la persona realiza ante una situación o un estímulo que le provoca miedo o malestar con el objetivo de mantenerse lejos del estímulo o situación temida.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se definen como una reacción conductual o cognitiva que la persona realiza ante una situación o un estímulo que le provoca miedo o malestar con el objetivo de mantenerse lejos del...",
    [
      { term: "Acatisia", difference: "Evitación y escape se define en el documento como: Se definen como una reacción conductual o cognitiva que la persona realiza ante una situación o un estímulo que le provoca miedo o malestar con el objetivo de mantenerse lejos del..." }, { term: "Compulsión o compulsiones", difference: "Evitación y escape se define en el documento como: Se definen como una reacción conductual o cognitiva que la persona realiza ante una situación o un estímulo que le provoca miedo o malestar con el objetivo de mantenerse lejos del..." }
    ],
    "Alta"
  ),
  makeConcept(
    126,
    "Compulsión o compulsiones",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Comportamientos cognitivos o conductuales repetitivos o ritualizados que se realizan en respuesta a una obsesión con el objetivo de prevenir un mal temido o disminuir la ansiedad que genera la obsesión. A continuación, definiremos brevemente las características de las compulsiones más frecuentes en el TOC. Las compulsiones de lavado o de limpieza son conductas de limpieza estereotipadas y repetitivas que se realizan con el objetivo de eliminar los sentimientos de contaminación que amenazan la propia salud como el lavado de manos o duchas prolongadas. Se asocian a obsesiones relacionadas con la contaminación. Las compulsiones de comprobación consisten en la inspección o comprobación excesiva para, supuestamente, prevenir desgracias futuras y protegerse o proteger a los demás de posibles desastres o peligros. Las compulsiones de repetición son conductas repetitivas o estereotipadas llevadas a cabo para prevenir la ocurrencia de alguna desgracia, o de que el pensamiento se convierta en realidad, y se asocian a obsesiones de contenido altamente desagradable o evaluado como peligroso catastrófico (p. ej., imágenes de muerte). Las compulsiones de orden y simetría responden a un intento activo por parte de las personas (habitualmente implica muchas horas) de que las cosas a su alrededor estén de acuerdo con un orden o distribución determinada o simétrica («just right»), Las conductas de acumulación consisten en la colección o almacenamiento de objetos de forma excesiva como consecuencia directa de las obsesiones (p. ej., tener que documentar y conservar todas las experiencias de vida) o compulsiones (p. ej., el paciente acumula ropa nueva sin estrenar que ha ido adquiriendo porque el proceso de lavado que tiene seguir es tan costoso -compulsiones de lavado- que no le da tiempo de realizarlo, o que evita realizarlo).",
    "Comportamientos cognitivos o conductuales repetitivos o ritualizados que se realizan en respuesta a una obsesión con el objetivo de prevenir un mal temido o disminuir la ansiedad que genera la obsesión.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Comportamientos cognitivos o conductuales repetitivos o ritualizados que se realizan en respuesta a una obsesión con el objetivo de prevenir un mal temido o disminuir la ansiedad...",
    [
      { term: "Comprobación", difference: "Compulsión o compulsiones se define en el documento como: Comportamientos cognitivos o conductuales repetitivos o ritualizados que se realizan en respuesta a una obsesión con el objetivo de prevenir un mal temido o disminuir la ansiedad..." }, { term: "Evitación y escape", difference: "Compulsión o compulsiones se define en el documento como: Comportamientos cognitivos o conductuales repetitivos o ritualizados que se realizan en respuesta a una obsesión con el objetivo de prevenir un mal temido o disminuir la ansiedad..." }
    ],
    "Alta"
  ),
  makeConcept(
    127,
    "Comprobación",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Las comprobaciones hacen referencia a comprobaciones continuas (conductuales o cognitivas) de aquello temido o que constituye el centro de las preocupaciones de la persona. Las comprobaciones se pueden dar en diferentes patologías, especialmente en los trastornos de ansiedad, trastorno dismórfico corporal, de la conducta alimentaria, o ansiedad por la enfermedad (hipocondría). En los trastornos de la conducta alimentaria se observan comprobaciones repetidas del peso y la forma empleando el peso, espejos, o prendas de ropa para valorar posibles cambios en el peso. En la ansiedad por la enfermedad (hipocondría), las comprobaciones repetidas del cuerpo por si existen signos de una enfermedad constituyen un criterio diagnóstico (DSM-5) (i. e., comportamientos excesivos relacionados con la salud).",
    "Las comprobaciones hacen referencia a comprobaciones continuas (conductuales o cognitivas) de aquello temido o que constituye el centro de las preocupaciones de la persona.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Las comprobaciones hacen referencia a comprobaciones continuas (conductuales o cognitivas) de aquello temido o que constituye el centro de las preocupaciones de la persona.",
    [
      { term: "Compulsión o compulsiones", difference: "Comprobación se define en el documento como: Las comprobaciones hacen referencia a comprobaciones continuas (conductuales o cognitivas) de aquello temido o que constituye el centro de las preocupaciones de la persona." }, { term: "Conducta de atracón", difference: "Comprobación se define en el documento como: Las comprobaciones hacen referencia a comprobaciones continuas (conductuales o cognitivas) de aquello temido o que constituye el centro de las preocupaciones de la persona." }
    ],
    "Alta"
  ),
  makeConcept(
    128,
    "Conducta de atracón",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Esta conducta hace referencia a una consumición rápida de grandes cantidades de comida con poca o ninguna satisfacción. Durante un atracón se suelen ingerir alimentos con alto contenido calórico, cuyo aporte energético puede superar entre 3 y 27 veces las calorías recomendadas al día. El atracón suele acabar con dolor abdominal y o sentimientos de culpa y repulsa asociados a dicha conducta Ejemplo: \"Me levanté a las 5 de la mañana, fui a la cocina, tuve que quitar las dos sillas que había puesto para obstaculizar el acceso, me comí medio kilo de salchichas crudas, una barra de pan y las dos tabletas de chocolate que tenía en la despensa. No pude parar, estaba fuera de mí, después me sentí fatal, gorda, horrible, nunca voy a salir de esta situación, nada puede detenerme\"",
    "Esta conducta hace referencia a una consumición rápida de grandes cantidades de comida con poca o ninguna satisfacción.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Esta conducta hace referencia a una consumición rápida de grandes cantidades de comida con poca o ninguna satisfacción.",
    [
      { term: "Comportamientos purgativos", difference: "Conducta de atracón se define en el documento como: Esta conducta hace referencia a una consumición rápida de grandes cantidades de comida con poca o ninguna satisfacción." }, { term: "Comprobación", difference: "Conducta de atracón se define en el documento como: Esta conducta hace referencia a una consumición rápida de grandes cantidades de comida con poca o ninguna satisfacción." }
    ],
    "Alta"
  ),
  makeConcept(
    129,
    "Comportamientos purgativos",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Empleamos el término comportamientos purgativos en el contexto de los trastornos de la conducta alimentaria para recoger la conducta por la que la persona compensa una ingesta excesiva de caloría (p. ej., un atracón), a través de vómitos autoprovocados, empleo incorrecto de laxantes, diuréticos, o enemas. Es un especificador de la anorexia nerviosa (tipo con atracones purgas) Ejemplo: \"Después de haber comido tanto, fui al baño, me introduje los dedos y vomité, me sentí mejor\"",
    "Empleamos el término comportamientos purgativos en el contexto de los trastornos de la conducta alimentaria para recoger la conducta por la que la persona compensa una ingesta excesiva de caloría (p.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Empleamos el término comportamientos purgativos en el contexto de los trastornos de la conducta alimentaria para recoger la conducta por la que la persona compensa una ingesta...",
    [
      { term: "Comportamientos restrictivos", difference: "Comportamientos purgativos se define en el documento como: Empleamos el término comportamientos purgativos en el contexto de los trastornos de la conducta alimentaria para recoger la conducta por la que la persona compensa una ingesta..." }, { term: "Conducta de atracón", difference: "Comportamientos purgativos se define en el documento como: Empleamos el término comportamientos purgativos en el contexto de los trastornos de la conducta alimentaria para recoger la conducta por la que la persona compensa una ingesta..." }
    ],
    "Alta"
  ),
  makeConcept(
    130,
    "Comportamientos restrictivos",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Los comportamientos restrictivos recogen comportamientos dirigidos a perder peso restringiendo las calorías que la persona ingiere a través de dietas o ayuno. Hermán y Mack (1975) definen la restricción como la intención que tiene la persona de restringir voluntariamente su ingesta, con el fin de mantener o conseguir el peso que considera ideal. Ejemplo: \"Cuento cada caloría que ingiero, no puedo pasarme de 400, también tengo una rutina estricta de ejercicios que hago en el gimnasio durante las dos horas que tengo para comer en el trabajo,y al llegar a casa por las noches, normalmente puedo dedicar otras dos horitas. Los fines de semana si puedo hacer más ejercicio, suelo salir a correr por las mañanas\"",
    "Los comportamientos restrictivos recogen comportamientos dirigidos a perder peso restringiendo las calorías que la persona ingiere a través de dietas o ayuno.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Los comportamientos restrictivos recogen comportamientos dirigidos a perder peso restringiendo las calorías que la persona ingiere a través de dietas o ayuno.",
    [
      { term: "Comportamientos autoagresivos", difference: "Comportamientos restrictivos se define en el documento como: Los comportamientos restrictivos recogen comportamientos dirigidos a perder peso restringiendo las calorías que la persona ingiere a través de dietas o ayuno." }, { term: "Comportamientos purgativos", difference: "Comportamientos restrictivos se define en el documento como: Los comportamientos restrictivos recogen comportamientos dirigidos a perder peso restringiendo las calorías que la persona ingiere a través de dietas o ayuno." }
    ],
    "Alta"
  ),
  makeConcept(
    131,
    "Comportamientos autoagresivos",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Se suele diferenciar entre las lesiones inducidas o conductas autolesivas, y los intentos de suicidio. Las primeras se describen como aquellas conductas que conllevan una destrucción directa y deliberada de una parte del propio cuerpo en ausencia de un intento de que sean letales.",
    "Se suele diferenciar entre las lesiones inducidas o conductas autolesivas, y los intentos de suicidio.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se suele diferenciar entre las lesiones inducidas o conductas autolesivas, y los intentos de suicidio.",
    [
      { term: "Comportamientos heteroagresivos", difference: "Comportamientos autoagresivos se define en el documento como: Se suele diferenciar entre las lesiones inducidas o conductas autolesivas, y los intentos de suicidio." }, { term: "Comportamientos restrictivos", difference: "Comportamientos autoagresivos se define en el documento como: Se suele diferenciar entre las lesiones inducidas o conductas autolesivas, y los intentos de suicidio." }
    ],
    "Media"
  ),
  makeConcept(
    132,
    "Comportamientos heteroagresivos",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Se emplea este término para referirnos a aquella conducta que tiene como resultado un daño personal o hacia la propiedad de otra persona. No suelen incluirse bajo este término el abuso verbal o los gritos, que, aunque resulten hostiles, y puedan ser precursores de una conducta violenta, no lo son en sí mismos. Ejemplo: \"Cuando el paciente se cruzó con su vecino, de quien estaba convencido había pinchado su teléfono y estaba organizando un complot para arruinarle y que su mujer lo abandonara, le dio dos puñetazos\"",
    "Se emplea este término para referirnos a aquella conducta que tiene como resultado un daño personal o hacia la propiedad de otra persona.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se emplea este término para referirnos a aquella conducta que tiene como resultado un daño personal o hacia la propiedad de otra persona.",
    [
      { term: "Comportamientos autoagresivos", difference: "Comportamientos heteroagresivos se define en el documento como: Se emplea este término para referirnos a aquella conducta que tiene como resultado un daño personal o hacia la propiedad de otra persona." }, { term: "Impulsividad", difference: "Comportamientos heteroagresivos se define en el documento como: Se emplea este término para referirnos a aquella conducta que tiene como resultado un daño personal o hacia la propiedad de otra persona." }
    ],
    "Alta"
  ),
  makeConcept(
    133,
    "Impulsividad",
    "conducta",
    "Conducta motora",
    "Semiología",
    "La impulsividad está dada por la presencia del deseo de realizar una impulsión inmotivada e irrefrenable que el sujeto no puede dominar. Muchas veces el paciente siente la impulsión de robar algún objeto, sin necesidad de hacerlo pues tiene dinero para adquirirlo por la vía legal, o de agredir a alguna persona que no le ha hecho nada que justifique su agresividad.",
    "La impulsividad está dada por la presencia del deseo de realizar una impulsión inmotivada e irrefrenable que el sujeto no puede dominar.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La impulsividad está dada por la presencia del deseo de realizar una impulsión inmotivada e irrefrenable que el sujeto no puede dominar.",
    [
      { term: "Actos impulsivos", difference: "Impulsividad se define en el documento como: La impulsividad está dada por la presencia del deseo de realizar una impulsión inmotivada e irrefrenable que el sujeto no puede dominar." }, { term: "Comportamientos heteroagresivos", difference: "Impulsividad se define en el documento como: La impulsividad está dada por la presencia del deseo de realizar una impulsión inmotivada e irrefrenable que el sujeto no puede dominar." }
    ],
    "Media"
  ),
  makeConcept(
    134,
    "Actos impulsivos",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Los actos impulsivos se caracterizan por ser comportamientos inapropiados en un contexto particular, expresarse de forma prematura sin deliberar ni reflexionar sobre sus consecuencias futuras, y dar lugar a consecuencias no deseadas a corto o largo plazo que la persona no había previsto. Se trata de actos generados por la simple aparición de un estímulo exterior o de una fuerza interior o tensión, siendo tal esta fuerza que la persona suele realizar el acto. La única finalidad de los actos impulsivos es seguir el propio impulso, es decir, no hay un objetivo a la base de la realización del acto.",
    "Los actos impulsivos se caracterizan por ser comportamientos inapropiados en un contexto particular, expresarse de forma prematura sin deliberar ni reflexionar sobre sus consecuencias futuras, y dar lugar a...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Los actos impulsivos se caracterizan por ser comportamientos inapropiados en un contexto particular, expresarse de forma prematura sin deliberar ni reflexionar sobre sus...",
    [
      { term: "Abulia", difference: "Actos impulsivos se define en el documento como: Los actos impulsivos se caracterizan por ser comportamientos inapropiados en un contexto particular, expresarse de forma prematura sin deliberar ni reflexionar sobre sus..." }, { term: "Impulsividad", difference: "Actos impulsivos se define en el documento como: Los actos impulsivos se caracterizan por ser comportamientos inapropiados en un contexto particular, expresarse de forma prematura sin deliberar ni reflexionar sobre sus..." }
    ],
    "Alta"
  ),
  makeConcept(
    135,
    "Abulia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "La abulia implica una disminución de la voluntad para iniciar (o completar) una conducta dirigida a objetivo. Como resultado, la persona disminuye sus actividades, y puede permanecer sentada durante largos períodos de tiempo sin interés por participar en actividades sociales o laborales. La abulia es un síntoma negativo de la esquizofrenia, aunque se puede observar también en episodios depresivos, y en trastornos neurocognitivos",
    "La abulia implica una disminución de la voluntad para iniciar (o completar) una conducta dirigida a objetivo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La abulia implica una disminución de la voluntad para iniciar (o completar) una conducta dirigida a objetivo.",
    [
      { term: "Actos impulsivos", difference: "Abulia se define en el documento como: La abulia implica una disminución de la voluntad para iniciar (o completar) una conducta dirigida a objetivo." }, { term: "Hipobulia", difference: "Abulia se define en el documento como: La abulia implica una disminución de la voluntad para iniciar (o completar) una conducta dirigida a objetivo." }
    ],
    "Alta"
  ),
  makeConcept(
    136,
    "Hipobulia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Pérdida parcial de la voluntad de los pocos deseos de hacer las cosas, manifestada por un proceso de inactividad psicomotora en menor grado que la abulia. En estos casos, a pesar de ello, el paciente hace las cosas, quizás con cierta lentitud o pereza, pero las hace.",
    "Pérdida parcial de la voluntad de los pocos deseos de hacer las cosas, manifestada por un proceso de inactividad psicomotora en menor grado que la abulia.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Pérdida parcial de la voluntad de los pocos deseos de hacer las cosas, manifestada por un proceso de inactividad psicomotora en menor grado que la abulia.",
    [
      { term: "Abulia", difference: "Hipobulia se define en el documento como: Pérdida parcial de la voluntad de los pocos deseos de hacer las cosas, manifestada por un proceso de inactividad psicomotora en menor grado que la abulia." }, { term: "Hiperbulia", difference: "Hipobulia se define en el documento como: Pérdida parcial de la voluntad de los pocos deseos de hacer las cosas, manifestada por un proceso de inactividad psicomotora en menor grado que la abulia." }
    ],
    "Media"
  ),
  makeConcept(
    137,
    "Hiperbulia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Incremento en la capacidad de decisión voluntaria del sujeto para hacer las cosas, junto con la actividad psicomotora, mientras no pierda la coordinación y si la hiperbulia tiene un sentido adaptativo no se considera anormal",
    "Incremento en la capacidad de decisión voluntaria del sujeto para hacer las cosas, junto con la actividad psicomotora, mientras no pierda la coordinación y si la hiperbulia tiene un sentido adaptativo no se...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Incremento en la capacidad de decisión voluntaria del sujeto para hacer las cosas, junto con la actividad psicomotora, mientras no pierda la coordinación y si la hiperbulia tiene...",
    [
      { term: "Comportamientos extravagantes", difference: "Hiperbulia se define en el documento como: Incremento en la capacidad de decisión voluntaria del sujeto para hacer las cosas, junto con la actividad psicomotora, mientras no pierda la coordinación y si la hiperbulia tiene..." }, { term: "Hipobulia", difference: "Hiperbulia se define en el documento como: Incremento en la capacidad de decisión voluntaria del sujeto para hacer las cosas, junto con la actividad psicomotora, mientras no pierda la coordinación y si la hiperbulia tiene..." }
    ],
    "Media"
  ),
  makeConcept(
    138,
    "Comportamientos extravagantes",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Con el término comportamientos extravagantes nos referimos a aquellas conductas que al observador le resultan raras, extrañas, peculiares, o no adecuadas a la situación; es uno de los síntomas que la población general asocia al concepto de «locura». Serían también conductas extravagantes aquellas relacionadas con la vestimenta y apariencia que hemos descrito con anterioridad, por ejemplo, vestir de forma inadecuada o inusual en un contexto (p. ej., en una ceremonia) o estación del año determinada. Ejemplo: \"Al entrar en el cine, la paciente entregó una cuchara como si fuera la entrada al cine.",
    "Con el término comportamientos extravagantes nos referimos a aquellas conductas que al observador le resultan raras, extrañas, peculiares, o no adecuadas a la situación; es uno de los síntomas que la población...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Con el término comportamientos extravagantes nos referimos a aquellas conductas que al observador le resultan raras, extrañas, peculiares, o no adecuadas a la situación; es uno de...",
    [
      { term: "Hiperbulia", difference: "Comportamientos extravagantes se define en el documento como: Con el término comportamientos extravagantes nos referimos a aquellas conductas que al observador le resultan raras, extrañas, peculiares, o no adecuadas a la situación; es uno de..." }, { term: "Manierismos", difference: "Comportamientos extravagantes se define en el documento como: Con el término comportamientos extravagantes nos referimos a aquellas conductas que al observador le resultan raras, extrañas, peculiares, o no adecuadas a la situación; es uno de..." }
    ],
    "Alta"
  ),
  makeConcept(
    139,
    "Manierismos",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Los manierismos también son conductas que resultan extravagantes, pero en este caso se emplea el término para referirse a modos característicos de hacer las cosas, variaciones propias o extrañas de conductas normales. Al tratarse de conductas dirigidas a un objetivo que se realiza de forma inusual, o se modifica, aunque la conducta pueda tener una finalidad, el observador externo la considera inusual o extraña. Ejemplo: Entrevistador: \"Caminaba de una manera extraña, el pie derecho de puntillas y el izquierdo de talón\"",
    "Los manierismos también son conductas que resultan extravagantes, pero en este caso se emplea el término para referirse a modos característicos de hacer las cosas, variaciones propias o extrañas de conductas...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Los manierismos también son conductas que resultan extravagantes, pero en este caso se emplea el término para referirse a modos característicos de hacer las cosas, variaciones...",
    [
      { term: "Bloqueo o congelación conductual, quedarse paralizado", difference: "Manierismos se define en el documento como: Los manierismos también son conductas que resultan extravagantes, pero en este caso se emplea el término para referirse a modos característicos de hacer las cosas, variaciones..." }, { term: "Comportamientos extravagantes", difference: "Manierismos se define en el documento como: Los manierismos también son conductas que resultan extravagantes, pero en este caso se emplea el término para referirse a modos característicos de hacer las cosas, variaciones..." }
    ],
    "Alta"
  ),
  makeConcept(
    140,
    "Bloqueo o congelación conductual, quedarse paralizado",
    "conducta",
    "Conducta motora",
    "Semiología",
    "El bloqueo recoge la respuesta de inmovilidad ante una situación que genera miedo frente a las respuestas habituales de activación (huida o lucha). La persona se siente paralizada, es incapaz de escapar de la situación, de moverse, puede sentir sensación de desmayo o llegar a desmayarse como ocurre en la fobia a la sangre. Ejemplo: \"Cuando vi al auditorio, sentí una especie de mareo, no pude decir ni una palabra\"",
    "El bloqueo recoge la respuesta de inmovilidad ante una situación que genera miedo frente a las respuestas habituales de activación (huida o lucha).",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El bloqueo recoge la respuesta de inmovilidad ante una situación que genera miedo frente a las respuestas habituales de activación (huida o lucha).",
    [
      { term: "Apraxia", difference: "Bloqueo o congelación conductual, quedarse paralizado se define en el documento como: El bloqueo recoge la respuesta de inmovilidad ante una situación que genera miedo frente a las respuestas habituales de activación (huida o lucha)." }, { term: "Manierismos", difference: "Bloqueo o congelación conductual, quedarse paralizado se define en el documento como: El bloqueo recoge la respuesta de inmovilidad ante una situación que genera miedo frente a las respuestas habituales de activación (huida o lucha)." }
    ],
    "Media"
  ),
  makeConcept(
    141,
    "Apraxia",
    "conducta",
    "Conducta motora",
    "Semiología",
    "La apraxia es una alteración neurológica que se manifiesta por la dificultad para llevar a cabo de forma exitosa una actividad psicomotora propositiva (voluntaria) de cierta complejidad (i. e„ que requiere secuenciar y coordinar movimientos) previamente aprendida y",
    "La apraxia es una alteración neurológica que se manifiesta por la dificultad para llevar a cabo de forma exitosa una actividad psicomotora propositiva (voluntaria) de cierta complejidad (i.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La apraxia es una alteración neurológica que se manifiesta por la dificultad para llevar a cabo de forma exitosa una actividad psicomotora propositiva (voluntaria) de cierta...",
    [
      { term: "Abandono de los hábitos higiénicos o del aspecto personal", difference: "Apraxia se define en el documento como: La apraxia es una alteración neurológica que se manifiesta por la dificultad para llevar a cabo de forma exitosa una actividad psicomotora propositiva (voluntaria) de cierta..." }, { term: "Bloqueo o congelación conductual, quedarse paralizado", difference: "Apraxia se define en el documento como: La apraxia es una alteración neurológica que se manifiesta por la dificultad para llevar a cabo de forma exitosa una actividad psicomotora propositiva (voluntaria) de cierta..." }
    ],
    "Media"
  ),
  makeConcept(
    142,
    "Abandono de los hábitos higiénicos o del aspecto personal",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Estos pacientes se dejan de bañar, de afeitar, pelar, se muestran sucios, desaliñados, con mal olor generalmente con los cutis seborreicos, el pelo grasiento, uñas sucias, etc.",
    "Estos pacientes se dejan de bañar, de afeitar, pelar, se muestran sucios, desaliñados, con mal olor generalmente con los cutis seborreicos, el pelo grasiento, uñas sucias, etc.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Estos pacientes se dejan de bañar, de afeitar, pelar, se muestran sucios, desaliñados, con mal olor generalmente con los cutis seborreicos, el pelo grasiento, uñas sucias, etc.",
    [
      { term: "Apraxia", difference: "Abandono de los hábitos higiénicos o del aspecto personal se define en el documento como: Estos pacientes se dejan de bañar, de afeitar, pelar, se muestran sucios, desaliñados, con mal olor generalmente con los cutis seborreicos, el pelo grasiento, uñas sucias, etc." }, { term: "Hipermimias", difference: "Abandono de los hábitos higiénicos o del aspecto personal se define en el documento como: Estos pacientes se dejan de bañar, de afeitar, pelar, se muestran sucios, desaliñados, con mal olor generalmente con los cutis seborreicos, el pelo grasiento, uñas sucias, etc." }
    ],
    "Media"
  ),
  makeConcept(
    143,
    "Hipermimias",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Consisten en la expresión exagerada de la mímica facial o de los gestos al hablar. Existen dos tipos. Hipermimias generalizadas. Donde participan todos los músculos faciales, se observa también que la mirada no se fija en ningún punto, sino que se encuentra distraída. Existe una implicación afectiva (p. ej., la mirada hiperexpresiva, provocadora y agresiva en el contexto de un trastorno de conversión que podría estar reflejando características histriónicas). Hipermimias polarizadas: Muestran un estado afectivo monotemático. Así mismo, las muecas excesivas y las contorsiones faciales que se presentan en la catatonía son alteraciones de la expresión, pero, a menudo, se consideran también como estereotipias o resultado de la paracinesia, que se conoce como la alteración de cualquier movimiento que se ha hecho extravagante patológicamente.",
    "Consisten en la expresión exagerada de la mímica facial o de los gestos al hablar.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Consisten en la expresión exagerada de la mímica facial o de los gestos al hablar.",
    [
      { term: "Abandono de los hábitos higiénicos o del aspecto personal", difference: "Hipermimias se define en el documento como: Consisten en la expresión exagerada de la mímica facial o de los gestos al hablar." }, { term: "Hipomimias y Animias", difference: "Hipermimias se define en el documento como: Consisten en la expresión exagerada de la mímica facial o de los gestos al hablar." }
    ],
    "Alta"
  ),
  makeConcept(
    144,
    "Hipomimias y Animias",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Implican una disminución o ausencia de la expresión mímica, tanto en los gestos como en los movimientos. La mirada se mantiene fija, detenida en un objeto o en el vacío. Pueden presentarse hipomimias en los episodios de depresión mayor, los trastornos neurocognitivos, la discapacidad intelectual y la esquizofrenia",
    "Implican una disminución o ausencia de la expresión mímica, tanto en los gestos como en los movimientos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Implican una disminución o ausencia de la expresión mímica, tanto en los gestos como en los movimientos.",
    [
      { term: "Dismimias o paramimias", difference: "Hipomimias y Animias se define en el documento como: Implican una disminución o ausencia de la expresión mímica, tanto en los gestos como en los movimientos." }, { term: "Hipermimias", difference: "Hipomimias y Animias se define en el documento como: Implican una disminución o ausencia de la expresión mímica, tanto en los gestos como en los movimientos." }
    ],
    "Media"
  ),
  makeConcept(
    145,
    "Dismimias o paramimias",
    "conducta",
    "Conducta motora",
    "Semiología",
    "Reflejan una discordancia entre la expresión facial del paciente y los contenidos afectivos. A su vez se dividen en paramimias o mímicas discordantes, que suponen una contracción entre la expresión verbal y facial del paciente (p. ej., sonrisas o risas inmotivadas, extrañas) y se observan frecuentemente en la esquizofrenia; y mimias reflejas o ficticias que reproducen los movimientos del observador (ecomimia) en forma de espejo, y se observan en la discapacidad intelectual, la simulación, el trastorno de conversión y la esquizofrenia.",
    "Reflejan una discordancia entre la expresión facial del paciente y los contenidos afectivos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Reflejan una discordancia entre la expresión facial del paciente y los contenidos afectivos.",
    [
      { term: "Hipomimias y Animias", difference: "Dismimias o paramimias se define en el documento como: Reflejan una discordancia entre la expresión facial del paciente y los contenidos afectivos." }, { term: "Hipermimias", difference: "Dismimias o paramimias se define en el documento como: Reflejan una discordancia entre la expresión facial del paciente y los contenidos afectivos." }
    ],
    "Alta"
  ),
  makeConcept(
    146,
    "Insomnio",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Es la pérdida del sueño o la dificultad para dormir. El insomnio se clasifica en: Insomnio inicial o vespertino: Es la dificultad que tiene la persona para conciliar el sueño. Al individuo le cuesta trabajo quedarse dormido, pero cuando lo hace logra dormir por lo general, si no tiene asociado algún otro tipo de trastorno del sueño. Este tipo de insomnio es característico de los cuadros de ansiedad. Insomnio tardío o matinal: En esta modalidad, el paciente duerme la prima-noche y despierta de madrugada y no puede continuar durmiendo. Este tipo de insomnio es característico de los cuadros depresivos. Insomnio medio o intermitente: El insomnio intermitente se presenta cuando el paciente duerme a intervalos, despierta y vuelve a conciliar el sueño, para luego despertar de nuevo y volver a dormirse, etc. Insomnio mixto: Es la combinación de diferentes tipos de insomnio. Insomnio total: Cuando la persona no logra dormir en toda la noche.",
    "Es la pérdida del sueño o la dificultad para dormir.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es la pérdida del sueño o la dificultad para dormir.",
    [
      { term: "Hipersomnia", difference: "Insomnio se define en el documento como: Es la pérdida del sueño o la dificultad para dormir." }, { term: "Narcolepsia", difference: "Insomnio se define en el documento como: Es la pérdida del sueño o la dificultad para dormir." }
    ],
    "Alta"
  ),
  makeConcept(
    147,
    "Hipersomnia",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Las pacientes hipersomnias duermen demasiado, siempre se muestran somnolientos En este caso debemos tener en cuenta que normalmente hay personas que necesitan más de 8 horas de sueño en 24 horas.",
    "Las pacientes hipersomnias duermen demasiado, siempre se muestran somnolientos En este caso debemos tener en cuenta que normalmente hay personas que necesitan más de 8 horas de sueño en 24 horas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Las pacientes hipersomnias duermen demasiado, siempre se muestran somnolientos En este caso debemos tener en cuenta que normalmente hay personas que necesitan más de 8 horas de...",
    [
      { term: "Insomnio", difference: "Hipersomnia se define en el documento como: Las pacientes hipersomnias duermen demasiado, siempre se muestran somnolientos En este caso debemos tener en cuenta que normalmente hay personas que necesitan más de 8 horas de..." }, { term: "Narcolepsia", difference: "Hipersomnia se define en el documento como: Las pacientes hipersomnias duermen demasiado, siempre se muestran somnolientos En este caso debemos tener en cuenta que normalmente hay personas que necesitan más de 8 horas de..." }
    ],
    "Media"
  ),
  makeConcept(
    148,
    "Narcolepsia",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "La narcolepsia es un síndrome de origen desconocido caracterizado por ataques anormales de sueño. Por lo que se van a considerar los siguientes síntomas: 1. Somnolencia diurna excesiva: los pacientes presentan ataques de sueño agudos durante circunstancias que se podrían considerar estimulantes. Este episodio dura entre 10 y 15 minutos y suele haber un periodo refractario de varias horas antes del próximo episodio. 2. Cataplexia: es una alteración de la psicomotricidad por entrar de repente en la fase REM. Lo que el sujeto experimentará es una repentina disminución del tono muscular (generalizada o localizada) estando totalmente consciente de ello. Usualmente se va a desencadenar por emociones intensas como la risa, el llanto o la ira y durará pocos segundos. Estos episodios se iniciarán años después de establecerse la somnolencia diurna. 3. Parálisis del sueño: es un estado que mantiene similitud con la cataplexia puesto que, el paciente siente que no puede moverse, hablar o respirar con naturalidad. La diferencia está en que éste no va a tener desencadenantes emocionales. Su duración no excederá los pocos minutos, pudiendo cesar antes frente a estímulos externos. 4. Alucinaciones hipnagógicas: los episodios alucinógenos son pseudopercepciones de índole auditiva o visual. No aparecerán hasta la adolescencia y van a tender a disminuir con el tiempo. Hay casos en los que la parálisis y las alucinaciones se dan simultáneamente convirtiéndose en un evento terrorífico para el paciente.",
    "La narcolepsia es un síndrome de origen desconocido caracterizado por ataques anormales de sueño.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La narcolepsia es un síndrome de origen desconocido caracterizado por ataques anormales de sueño.",
    [
      { term: "Apnea del sueño obstructiva", difference: "Narcolepsia se define en el documento como: La narcolepsia es un síndrome de origen desconocido caracterizado por ataques anormales de sueño." }, { term: "Hipersomnia", difference: "Narcolepsia se define en el documento como: La narcolepsia es un síndrome de origen desconocido caracterizado por ataques anormales de sueño." }
    ],
    "Alta"
  ),
  makeConcept(
    149,
    "Apnea del sueño obstructiva",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Consiste en el cese del flujo aéreo, volviéndose a iniciar de manera repentina. Esta es la apnea más común. Durante el sueño, los músculos se relajan y las vías respiratorias se estrechan por lo que, la respiración se vuelve inadecuada por 10 a 20 segundos. El encéfalo detecta la anomalía y despierta al sujeto. El signo más característico será el ronquido, dado que las paredes de la garganta colapsan.",
    "Consiste en el cese del flujo aéreo, volviéndose a iniciar de manera repentina.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Consiste en el cese del flujo aéreo, volviéndose a iniciar de manera repentina.",
    [
      { term: "Apnea del sueño central", difference: "Apnea del sueño obstructiva se define en el documento como: Consiste en el cese del flujo aéreo, volviéndose a iniciar de manera repentina." }, { term: "Narcolepsia", difference: "Apnea del sueño obstructiva se define en el documento como: Consiste en el cese del flujo aéreo, volviéndose a iniciar de manera repentina." }
    ],
    "Media"
  ),
  makeConcept(
    150,
    "Apnea del sueño central",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Consiste en el cese parcial del ritmo respiratorio debido a que las neuronas eferentes del encéfalo evitan que los músculos que controlan la respiración actúen de forma correcta. Esto va a ocurrir únicamente en casos en los que el SNC se haya lesionado.",
    "Consiste en el cese parcial del ritmo respiratorio debido a que las neuronas eferentes del encéfalo evitan que los músculos que controlan la respiración actúen de forma correcta.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Consiste en el cese parcial del ritmo respiratorio debido a que las neuronas eferentes del encéfalo evitan que los músculos que controlan la respiración actúen de forma correcta.",
    [
      { term: "Apnea del sueño mixta", difference: "Apnea del sueño central se define en el documento como: Consiste en el cese parcial del ritmo respiratorio debido a que las neuronas eferentes del encéfalo evitan que los músculos que controlan la respiración actúen de forma correcta." }, { term: "Apnea del sueño obstructiva", difference: "Apnea del sueño central se define en el documento como: Consiste en el cese parcial del ritmo respiratorio debido a que las neuronas eferentes del encéfalo evitan que los músculos que controlan la respiración actúen de forma correcta." }
    ],
    "Media"
  ),
  makeConcept(
    151,
    "Apnea del sueño mixta",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Va a ser la combinación de las dos apneas anteriormente mencionadas. Unas veces se va a paralizar el sistema respiratorio y en otras habrá una obstrucción.",
    "Va a ser la combinación de las dos apneas anteriormente mencionadas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Va a ser la combinación de las dos apneas anteriormente mencionadas.",
    [
      { term: "Apnea del sueño central", difference: "Apnea del sueño mixta se define en el documento como: Va a ser la combinación de las dos apneas anteriormente mencionadas." }, { term: "Tipo de fases de sueño retardadas", difference: "Apnea del sueño mixta se define en el documento como: Va a ser la combinación de las dos apneas anteriormente mencionadas." }
    ],
    "Media"
  ),
  makeConcept(
    152,
    "Tipo de fases de sueño retardadas",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Surge por una demora al momento de ir a dormir (más de 2 h)",
    "Surge por una demora al momento de ir a dormir (más de 2 h)",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Surge por una demora al momento de ir a dormir (más de 2 h)",
    [
      { term: "Apnea del sueño mixta", difference: "Tipo de fases de sueño retardadas se define en el documento como: Surge por una demora al momento de ir a dormir (más de 2 h)" }, { term: "Tipo de fases de sueño avanzadas", difference: "Tipo de fases de sueño retardadas se define en el documento como: Surge por una demora al momento de ir a dormir (más de 2 h)" }
    ],
    "Básica"
  ),
  makeConcept(
    153,
    "Tipo de fases de sueño avanzadas",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Sus biomarcadores circadianos se han programados 2 a 4h antes de lo habitual puesto que, se han acostumbrado a madrugar.",
    "Sus biomarcadores circadianos se han programados 2 a 4h antes de lo habitual puesto que, se han acostumbrado a madrugar.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Sus biomarcadores circadianos se han programados 2 a 4h antes de lo habitual puesto que, se han acostumbrado a madrugar.",
    [
      { term: "Tipo asociado a turnos laborales", difference: "Tipo de fases de sueño avanzadas se define en el documento como: Sus biomarcadores circadianos se han programados 2 a 4h antes de lo habitual puesto que, se han acostumbrado a madrugar." }, { term: "Tipo de fases de sueño retardadas", difference: "Tipo de fases de sueño avanzadas se define en el documento como: Sus biomarcadores circadianos se han programados 2 a 4h antes de lo habitual puesto que, se han acostumbrado a madrugar." }
    ],
    "Media"
  ),
  makeConcept(
    154,
    "Tipo asociado a turnos laborales",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Le ocurre a las personas que tienen horarios de trabajo poco comunes, por ejemplo, una semana trabaja durante la noche y otra semana trabaja durante la mañana. Esto interfieren en el mantenimiento de un horario de sueño-vigilia normal.",
    "Le ocurre a las personas que tienen horarios de trabajo poco comunes, por ejemplo, una semana trabaja durante la noche y otra semana trabaja durante la mañana.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Le ocurre a las personas que tienen horarios de trabajo poco comunes, por ejemplo, una semana trabaja durante la noche y otra semana trabaja durante la mañana.",
    [
      { term: "Pesadillas", difference: "Tipo asociado a turnos laborales se define en el documento como: Le ocurre a las personas que tienen horarios de trabajo poco comunes, por ejemplo, una semana trabaja durante la noche y otra semana trabaja durante la mañana." }, { term: "Tipo de fases de sueño avanzadas", difference: "Tipo asociado a turnos laborales se define en el documento como: Le ocurre a las personas que tienen horarios de trabajo poco comunes, por ejemplo, una semana trabaja durante la noche y otra semana trabaja durante la mañana." }
    ],
    "Media"
  ),
  makeConcept(
    155,
    "Pesadillas",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Las pesadillas son episodios que ocurren durante el sueño REM y tiene que ver con el contenido de lo que se está soñando, que puede ser terrorífico, angustiante o amenazante. La ansiedad puede provocar una reacción motora que despierte al individuo. Sin embargo, la ansiedad se irá disipando en la medida que reconozca que sólo estaba soñando.",
    "Las pesadillas son episodios que ocurren durante el sueño REM y tiene que ver con el contenido de lo que se está soñando, que puede ser terrorífico, angustiante o amenazante.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Las pesadillas son episodios que ocurren durante el sueño REM y tiene que ver con el contenido de lo que se está soñando, que puede ser terrorífico, angustiante o amenazante.",
    [
      { term: "Terrores nocturnos", difference: "Pesadillas se define en el documento como: Las pesadillas son episodios que ocurren durante el sueño REM y tiene que ver con el contenido de lo que se está soñando, que puede ser terrorífico, angustiante o amenazante." }, { term: "Tipo asociado a turnos laborales", difference: "Pesadillas se define en el documento como: Las pesadillas son episodios que ocurren durante el sueño REM y tiene que ver con el contenido de lo que se está soñando, que puede ser terrorífico, angustiante o amenazante." }
    ],
    "Media"
  ),
  makeConcept(
    156,
    "Terrores nocturnos",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "Los terrores nocturnos suelen producirse en las fases III o IV del sueño. Inician con un grito angustiante y desgarrador en mitad de la noche. Generalmente, la persona se levantará con una sensación angustiante difusa, sin saber exactamente qué ha ocurrido ni recordar nada. Su etiología se cree guarda relación con la tensión emocional y la fatiga.",
    "Los terrores nocturnos suelen producirse en las fases III o IV del sueño.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Los terrores nocturnos suelen producirse en las fases III o IV del sueño.",
    [
      { term: "Pesadillas", difference: "Terrores nocturnos se define en el documento como: Los terrores nocturnos suelen producirse en las fases III o IV del sueño." }, { term: "Sonambulismo", difference: "Terrores nocturnos se define en el documento como: Los terrores nocturnos suelen producirse en las fases III o IV del sueño." }
    ],
    "Media"
  ),
  makeConcept(
    157,
    "Sonambulismo",
    "fisiologicas",
    "Sueño",
    "Semiología",
    "El sonambulismo se caracteriza por una secuencia movimientos corporales que el sujeto realiza durante el sueño de ondas lentas. La persona puede llegar a levantarse y realizar diversas actividades como caminar por la casa o mover cosas. También podría articular algunas palabras. Durante este estado, la persona no reacciona a los estímulos ambientales. Su duración puede ser de 1 a 30 minutos y puede ocurrir varias veces por semana a lo largo de la vida. Este trastorno se va a desencadenar aún más en épocas de estrés.",
    "El sonambulismo se caracteriza por una secuencia movimientos corporales que el sujeto realiza durante el sueño de ondas lentas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El sonambulismo se caracteriza por una secuencia movimientos corporales que el sujeto realiza durante el sueño de ondas lentas.",
    [
      { term: "Terrores nocturnos", difference: "Sonambulismo se define en el documento como: El sonambulismo se caracteriza por una secuencia movimientos corporales que el sujeto realiza durante el sueño de ondas lentas." }, { term: "Pesadillas", difference: "Sonambulismo se define en el documento como: El sonambulismo se caracteriza por una secuencia movimientos corporales que el sujeto realiza durante el sueño de ondas lentas." }
    ],
    "Alta"
  ),
  makeConcept(
    158,
    "Anorexia",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "La anorexia es la pérdida total o parcial del apetito o los deseos de ingerir alimentos. Se caracteriza por la restricción de la comida, sobre todo si posee un alto nivel calórico. Se limita a ciertos alimentos, en algunos casos practica ejercicio físico en exceso, dado que su único objetivo es adelgazar. La pérdida de peso puede ser gradual, de manera que el cuerpo se va adaptando al nuevo estado de malnutrición.",
    "La anorexia es la pérdida total o parcial del apetito o los deseos de ingerir alimentos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La anorexia es la pérdida total o parcial del apetito o los deseos de ingerir alimentos.",
    [
      { term: "Bulimia", difference: "Anorexia se define en el documento como: La anorexia es la pérdida total o parcial del apetito o los deseos de ingerir alimentos." }, { term: "Rumiación alimentaria", difference: "Anorexia se define en el documento como: La anorexia es la pérdida total o parcial del apetito o los deseos de ingerir alimentos." }
    ],
    "Media"
  ),
  makeConcept(
    159,
    "Bulimia",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "La bulimia es el síntoma opuesto de la anorexia, se caracteriza por episodios recurrentes de excesiva ingesta de alimentos seguidos de conductas compensatorias. En estos casos, el paciente se siente hambriento en todo momento. No llega a saciar su hambre, aunque haya comido lo suficiente.",
    "La bulimia es el síntoma opuesto de la anorexia, se caracteriza por episodios recurrentes de excesiva ingesta de alimentos seguidos de conductas compensatorias.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La bulimia es el síntoma opuesto de la anorexia, se caracteriza por episodios recurrentes de excesiva ingesta de alimentos seguidos de conductas compensatorias.",
    [
      { term: "Anorexia", difference: "Bulimia se define en el documento como: La bulimia es el síntoma opuesto de la anorexia, se caracteriza por episodios recurrentes de excesiva ingesta de alimentos seguidos de conductas compensatorias." }, { term: "Rumiación alimentaria", difference: "Bulimia se define en el documento como: La bulimia es el síntoma opuesto de la anorexia, se caracteriza por episodios recurrentes de excesiva ingesta de alimentos seguidos de conductas compensatorias." }
    ],
    "Media"
  ),
  makeConcept(
    160,
    "Rumiación alimentaria",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "Regurgitar la comida, re-masticarla y luego la deglutirla. Aparece en el 10% de los retrasos mentales y con frecuencia en demencias.",
    "Regurgitar la comida, re-masticarla y luego la deglutirla.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Regurgitar la comida, re-masticarla y luego la deglutirla.",
    [
      { term: "Bulimia", difference: "Rumiación alimentaria se define en el documento como: Regurgitar la comida, re-masticarla y luego la deglutirla." }, { term: "Pica", difference: "Rumiación alimentaria se define en el documento como: Regurgitar la comida, re-masticarla y luego la deglutirla." }
    ],
    "Media"
  ),
  makeConcept(
    161,
    "Pica",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "La pica es el hábito de comer sustancias inorgánicas no apropiadas para la ingestión, tales como la cal o la tierra, arena, plastilina, excrementos de animales, hojas, etc. Aparece en niños retrasos o demencias y puede llevar a la muerte.",
    "La pica es el hábito de comer sustancias inorgánicas no apropiadas para la ingestión, tales como la cal o la tierra, arena, plastilina, excrementos de animales, hojas, etc.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La pica es el hábito de comer sustancias inorgánicas no apropiadas para la ingestión, tales como la cal o la tierra, arena, plastilina, excrementos de animales, hojas, etc.",
    [
      { term: "Malacia", difference: "Pica se define en el documento como: La pica es el hábito de comer sustancias inorgánicas no apropiadas para la ingestión, tales como la cal o la tierra, arena, plastilina, excrementos de animales, hojas, etc." }, { term: "Rumiación alimentaria", difference: "Pica se define en el documento como: La pica es el hábito de comer sustancias inorgánicas no apropiadas para la ingestión, tales como la cal o la tierra, arena, plastilina, excrementos de animales, hojas, etc." }
    ],
    "Media"
  ),
  makeConcept(
    162,
    "Malacia",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "La malacia es el hábito de combinar sabores que comúnmente no combinan en la alimentación. Ejemplo: comer mango ligado con arroz, frijoles con postres, etc.",
    "La malacia es el hábito de combinar sabores que comúnmente no combinan en la alimentación.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La malacia es el hábito de combinar sabores que comúnmente no combinan en la alimentación.",
    [
      { term: "Coprofagia", difference: "Malacia se define en el documento como: La malacia es el hábito de combinar sabores que comúnmente no combinan en la alimentación." }, { term: "Pica", difference: "Malacia se define en el documento como: La malacia es el hábito de combinar sabores que comúnmente no combinan en la alimentación." }
    ],
    "Media"
  ),
  makeConcept(
    163,
    "Coprofagia",
    "fisiologicas",
    "Apetito e ingesta",
    "Semiología",
    "Es el deseo de ingestión de heces fecales u otras sustancias de origen orgánico pero que no están de forma apropiada para la alimentación.",
    "Es el deseo de ingestión de heces fecales u otras sustancias de origen orgánico pero que no están de forma apropiada para la alimentación.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es el deseo de ingestión de heces fecales u otras sustancias de origen orgánico pero que no están de forma apropiada para la alimentación.",
    [
      { term: "Malacia", difference: "Coprofagia se define en el documento como: Es el deseo de ingestión de heces fecales u otras sustancias de origen orgánico pero que no están de forma apropiada para la alimentación." }, { term: "Pica", difference: "Coprofagia se define en el documento como: Es el deseo de ingestión de heces fecales u otras sustancias de origen orgánico pero que no están de forma apropiada para la alimentación." }
    ],
    "Media"
  ),
  makeConcept(
    164,
    "Disforia de género",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Anteriormente denominado trastorno de la identidad sexual se define como la disconformidad de un individuo con su sexo biológico, debido a que existe una identificación persistente o dan por hecho que pertenecen al sexo opuesto. Esta psicopatología está acompañada de una profunda insatisfacción con el sexo asignado, así como repudio o malestar hacia las características, tanto primarias como secundarias, propias de cada sexo.",
    "Anteriormente denominado trastorno de la identidad sexual se define como la disconformidad de un individuo con su sexo biológico, debido a que existe una identificación persistente o dan por hecho que...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Anteriormente denominado trastorno de la identidad sexual se define como la disconformidad de un individuo con su sexo biológico, debido a que existe una identificación...",
    [
      { term: "Disfunciones sexuales", difference: "Disforia de género se define en el documento como: Anteriormente denominado trastorno de la identidad sexual se define como la disconformidad de un individuo con su sexo biológico, debido a que existe una identificación..." }, { term: "Anafrodisia", difference: "Disforia de género se define en el documento como: Anteriormente denominado trastorno de la identidad sexual se define como la disconformidad de un individuo con su sexo biológico, debido a que existe una identificación..." }
    ],
    "Alta"
  ),
  makeConcept(
    165,
    "Disfunciones sexuales",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Es la alteración en alguna de las fases de la respuesta sexual, cuyas fases son: Deseo: Aparecen fantasías sexuales, cambios hormonales y deseo de actividad sexual Excitación. Aumenta la tensión muscular, respiratoria y cardíaca. En varones, la vasoconstricción provoca la erección del pene. En la mujer, la dilatación de la vagina y su lubricación. Meseta: Consiste en el mantenimiento de fase de excitación, con una preparación para el orgasmo. Orgasmo. Existen contracciones involuntarias musculares, la respiración y el ritmo cardíaco alcanzan su máximo. Hay una fuerte sensación de placer. Resolución. Se libera la tensión muscular y el organismo se relaja.",
    "Es la alteración en alguna de las fases de la respuesta sexual, cuyas fases son: Deseo: Aparecen fantasías sexuales, cambios hormonales y deseo de actividad sexual Excitación.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es la alteración en alguna de las fases de la respuesta sexual, cuyas fases son: Deseo: Aparecen fantasías sexuales, cambios hormonales y deseo de actividad sexual Excitación.",
    [
      { term: "Anafrodisia", difference: "Disfunciones sexuales se define en el documento como: Es la alteración en alguna de las fases de la respuesta sexual, cuyas fases son: Deseo: Aparecen fantasías sexuales, cambios hormonales y deseo de actividad sexual Excitación." }, { term: "Disforia de género", difference: "Disfunciones sexuales se define en el documento como: Es la alteración en alguna de las fases de la respuesta sexual, cuyas fases son: Deseo: Aparecen fantasías sexuales, cambios hormonales y deseo de actividad sexual Excitación." }
    ],
    "Alta"
  ),
  makeConcept(
    166,
    "Anafrodisia",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Se caracteriza por la pérdida del deseo sexual.",
    "Se caracteriza por la pérdida del deseo sexual.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se caracteriza por la pérdida del deseo sexual.",
    [
      { term: "Disfunciones sexuales", difference: "Anafrodisia se define en el documento como: Se caracteriza por la pérdida del deseo sexual." }, { term: "Hiposexualidad o hipoerotismo", difference: "Anafrodisia se define en el documento como: Se caracteriza por la pérdida del deseo sexual." }
    ],
    "Básica"
  ),
  makeConcept(
    167,
    "Hiposexualidad o hipoerotismo",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Se caracteriza por la marcada disminución del apetito sexual con escases de fantasías. Su principal etiología como psicopatología son los problemas de carácter emocional, mientras que biológicamente es causado por problemas neurológicos. Se puede dar en comorbilidad con la epilepsia y la depresión, por daños en el sistema límbico, desbalance endocrino e inducida por medicación.",
    "Se caracteriza por la marcada disminución del apetito sexual con escases de fantasías.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se caracteriza por la marcada disminución del apetito sexual con escases de fantasías.",
    [
      { term: "Anafrodisia", difference: "Hiposexualidad o hipoerotismo se define en el documento como: Se caracteriza por la marcada disminución del apetito sexual con escases de fantasías." }, { term: "Hipersexualidad o hipererotismo", difference: "Hiposexualidad o hipoerotismo se define en el documento como: Se caracteriza por la marcada disminución del apetito sexual con escases de fantasías." }
    ],
    "Media"
  ),
  makeConcept(
    168,
    "Hipersexualidad o hipererotismo",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Es el aumento de la libido y de la actividad sexual, siendo esta última una característica muy relevante. La hipersexualidad genera que las personas se estimulen sexualmente de forma reiterada, ante estímulos visuales o pensamientos. Generalmente se presenta en personas que han sido reprimidos sexualmente durante las primeras etapas del desarrollo (infancia y adolescencia). Esta patología se presenta con mucha frecuencia en personas con un trastorno de la personalidad u otras alteraciones mentales, tales como la satiriasis (exclusiva en hombre) o la ninfomanía (exclusiva en mujeres), conocidas popularmente como \"adicción al sexo\", que se caracterizan por un aumento de la libido y del deseo sexual, lo que genera que las actividades sexuales aumenten.",
    "Es el aumento de la libido y de la actividad sexual, siendo esta última una característica muy relevante.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es el aumento de la libido y de la actividad sexual, siendo esta última una característica muy relevante.",
    [
      { term: "Hiposexualidad o hipoerotismo", difference: "Hipersexualidad o hipererotismo se define en el documento como: Es el aumento de la libido y de la actividad sexual, siendo esta última una característica muy relevante." }, { term: "Trastorno eréctil en el hombre", difference: "Hipersexualidad o hipererotismo se define en el documento como: Es el aumento de la libido y de la actividad sexual, siendo esta última una característica muy relevante." }
    ],
    "Alta"
  ),
  makeConcept(
    169,
    "Trastorno eréctil en el hombre",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "También denominado disfunción eréctil, se define como la inhabilitación para obtener o mantener una erección, ya sea de forma persistente, o recurrente (cuando no ocurre siempre). Esta patología impide iniciar o mantener relaciones sexuales puesto que no se puede consumar la penetración, lo que a su vez genera un deterioro en las relaciones interpersonal en la pareja.",
    "También denominado disfunción eréctil, se define como la inhabilitación para obtener o mantener una erección, ya sea de forma persistente, o recurrente (cuando no ocurre siempre).",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: También denominado disfunción eréctil, se define como la inhabilitación para obtener o mantener una erección, ya sea de forma persistente, o recurrente (cuando no ocurre siempre).",
    [
      { term: "Hipersexualidad o hipererotismo", difference: "Trastorno eréctil en el hombre se define en el documento como: También denominado disfunción eréctil, se define como la inhabilitación para obtener o mantener una erección, ya sea de forma persistente, o recurrente (cuando no ocurre siempre)." }, { term: "Trastorno de la excitación sexual en mujeres", difference: "Trastorno eréctil en el hombre se define en el documento como: También denominado disfunción eréctil, se define como la inhabilitación para obtener o mantener una erección, ya sea de forma persistente, o recurrente (cuando no ocurre siempre)." }
    ],
    "Media"
  ),
  makeConcept(
    170,
    "Trastorno de la excitación sexual en mujeres",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Esta patología se define como la incapacidad de mantener la respuesta de la lubricación vaginal que es propia de la etapa de excitación y al igual que en el caso del trastorno eréctil en el hombre, esta puede ser recurrente o persistente. Y así mismo puede provocar malestar y deterioro en las relaciones interpersonal en la pareja.",
    "Esta patología se define como la incapacidad de mantener la respuesta de la lubricación vaginal que es propia de la etapa de excitación y al igual que en el caso del trastorno eréctil en el hombre, esta puede...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Esta patología se define como la incapacidad de mantener la respuesta de la lubricación vaginal que es propia de la etapa de excitación y al igual que en el caso del trastorno...",
    [
      { term: "Eyaculación prematura", difference: "Trastorno de la excitación sexual en mujeres se define en el documento como: Esta patología se define como la incapacidad de mantener la respuesta de la lubricación vaginal que es propia de la etapa de excitación y al igual que en el caso del trastorno..." }, { term: "Trastorno eréctil en el hombre", difference: "Trastorno de la excitación sexual en mujeres se define en el documento como: Esta patología se define como la incapacidad de mantener la respuesta de la lubricación vaginal que es propia de la etapa de excitación y al igual que en el caso del trastorno..." }
    ],
    "Media"
  ),
  makeConcept(
    171,
    "Eyaculación prematura",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Es la pérdida de control sobre los reflejos eyaculatorios, que generan una eyaculación casi inmediata como respuesta a un estímulo sexual leve (o bien antes, durante, incluso poco tiempo después de realizar el coito). Este trastorno genera malestar y problemas en las relaciones interpersonales a quien lo padece. Puede ser adquirido o de nacimiento, y generalizado o situacional. Además, se pueden diferenciar tres niveles: Leve que se da cuando el estímulo sexual provoca la respuesta eyaculatoria en un laxo de 30 a 60 segundos. Moderado, cuando la respuesta eyaculatoria tiene lugar entre 15 y 30 segundos después de la presencia del estímulo. Grave, cuando la eyaculación se da en menos de 15. El criterio diagnóstico que determina el trastorno de eyaculación precoz se da cuando la eyaculación tiene lugar antes de que la persona lo desee, y que este problema se presente durante, como mínimo, seis meses.",
    "Es la pérdida de control sobre los reflejos eyaculatorios, que generan una eyaculación casi inmediata como respuesta a un estímulo sexual leve (o bien antes, durante, incluso poco tiempo después de realizar el...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es la pérdida de control sobre los reflejos eyaculatorios, que generan una eyaculación casi inmediata como respuesta a un estímulo sexual leve (o bien antes, durante, incluso poco...",
    [
      { term: "Eyaculación retardada", difference: "Eyaculación prematura se define en el documento como: Es la pérdida de control sobre los reflejos eyaculatorios, que generan una eyaculación casi inmediata como respuesta a un estímulo sexual leve (o bien antes, durante, incluso poco..." }, { term: "Trastorno de la excitación sexual en mujeres", difference: "Eyaculación prematura se define en el documento como: Es la pérdida de control sobre los reflejos eyaculatorios, que generan una eyaculación casi inmediata como respuesta a un estímulo sexual leve (o bien antes, durante, incluso poco..." }
    ],
    "Alta"
  ),
  makeConcept(
    172,
    "Eyaculación retardada",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Ausencia de eyaculación (aneyaculación) o la presencia de ésta de forma retardada (30-45 minutos) posterior a la penetración o ante cualquier actividad sexual. Este trastorno es generalmente de carácter psicológico, aunque también puede darse como consecuencia de alteraciones orgánicas provocadas por el consumo de fármacos, especialmente los antidepresivos, y por daños neurológicos como trauma en los nervios pélvicos o espina dorsal.",
    "Ausencia de eyaculación (aneyaculación) o la presencia de ésta de forma retardada (30-45 minutos) posterior a la penetración o ante cualquier actividad sexual.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Ausencia de eyaculación (aneyaculación) o la presencia de ésta de forma retardada (30-45 minutos) posterior a la penetración o ante cualquier actividad sexual.",
    [
      { term: "Dispareunia", difference: "Eyaculación retardada se define en el documento como: Ausencia de eyaculación (aneyaculación) o la presencia de ésta de forma retardada (30-45 minutos) posterior a la penetración o ante cualquier actividad sexual." }, { term: "Eyaculación prematura", difference: "Eyaculación retardada se define en el documento como: Ausencia de eyaculación (aneyaculación) o la presencia de ésta de forma retardada (30-45 minutos) posterior a la penetración o ante cualquier actividad sexual." }
    ],
    "Alta"
  ),
  makeConcept(
    173,
    "Dispareunia",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "5% en varones 15% en mujeres. La persona tiene dolor (en la zona genital o en otro sitio) en el momento de la respuesta sexual. Se descarta en el caso de que este provocado por enfermedad médica.",
    "5% en varones 15% en mujeres.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: 5% en varones 15% en mujeres.",
    [
      { term: "Eyaculación retardada", difference: "Dispareunia se define en el documento como: 5% en varones 15% en mujeres." }, { term: "Vaginismo", difference: "Dispareunia se define en el documento como: 5% en varones 15% en mujeres." }
    ],
    "Media"
  ),
  makeConcept(
    174,
    "Vaginismo",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "No confundir con vaginitis. Espasmos involuntarios en el tercio externo de la vagina. Si se intenta la penetración hay dolor.",
    "No confundir con vaginitis.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: No confundir con vaginitis.",
    [
      { term: "Dispareunia", difference: "Vaginismo se define en el documento como: No confundir con vaginitis." }, { term: "Parafilias", difference: "Vaginismo se define en el documento como: No confundir con vaginitis." }
    ],
    "Media"
  ),
  makeConcept(
    175,
    "Parafilias",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Antiguamente denominadas desviaciones sexuales. Están relacionados con una actividad sexual en la que el objeto, la persona o las prácticas no son adecuadas. Hay muchísimas y no existe alteración en la respuesta sexual, tienen todas las fases. Tipos: Pedofilia (niños) Incesto (familiares) Zoofilia (animales) Coprofilia (heces) Urofilia (orina) Klismafilia (enemas) Fetichismo (objetos inanimados)",
    "Antiguamente denominadas desviaciones sexuales.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Antiguamente denominadas desviaciones sexuales.",
    [
      { term: "Fetichismo", difference: "Parafilias se define en el documento como: Antiguamente denominadas desviaciones sexuales." }, { term: "Vaginismo", difference: "Parafilias se define en el documento como: Antiguamente denominadas desviaciones sexuales." }
    ],
    "Media"
  ),
  makeConcept(
    176,
    "Fetichismo",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Cualquier objeto puede ser fetiche, aunque destaca la ropa interior y los zapatos. También puede ser que sea una parte del cuerpo (parcialismos) Hay tres tipos: La excitación es producida por estimulación táctil. Aquellos en los que es el objeto el que produce la excitación. Fetichismo travestista: la persona se excita con la ropa del otro sexo.",
    "Cualquier objeto puede ser fetiche, aunque destaca la ropa interior y los zapatos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Cualquier objeto puede ser fetiche, aunque destaca la ropa interior y los zapatos.",
    [
      { term: "Parafilias", difference: "Fetichismo se define en el documento como: Cualquier objeto puede ser fetiche, aunque destaca la ropa interior y los zapatos." }, { term: "Voyerismo y exhibicionismo", difference: "Fetichismo se define en el documento como: Cualquier objeto puede ser fetiche, aunque destaca la ropa interior y los zapatos." }
    ],
    "Media"
  ),
  makeConcept(
    177,
    "Voyerismo y exhibicionismo",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "No es raro que aparezcan en la misma persona. Le excita que le pillen mirando a escondidas a otras personas manteniendo relaciones, o el mostrar el propio cuerpo a quien no se lo espera.",
    "No es raro que aparezcan en la misma persona.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: No es raro que aparezcan en la misma persona.",
    [
      { term: "Fetichismo", difference: "Voyerismo y exhibicionismo se define en el documento como: No es raro que aparezcan en la misma persona." }, { term: "Sadismo y masoquismo sexual", difference: "Voyerismo y exhibicionismo se define en el documento como: No es raro que aparezcan en la misma persona." }
    ],
    "Media"
  ),
  makeConcept(
    178,
    "Sadismo y masoquismo sexual",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "El sádico le hace daño al otro y le humilla. El masoquista recibir daño y humillación de otro, ambas tendencias provocan mucho placer a quien lo padece.",
    "El sádico le hace daño al otro y le humilla.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El sádico le hace daño al otro y le humilla.",
    [
      { term: "Pedofilia e incesto", difference: "Sadismo y masoquismo sexual se define en el documento como: El sádico le hace daño al otro y le humilla." }, { term: "Voyerismo y exhibicionismo", difference: "Sadismo y masoquismo sexual se define en el documento como: El sádico le hace daño al otro y le humilla." }
    ],
    "Media"
  ),
  makeConcept(
    179,
    "Pedofilia e incesto",
    "fisiologicas",
    "Sexualidad",
    "Semiología",
    "Incesto: se mantienen relaciones entre familiares (padre - hija; tío - sobrina). Hay quien no considera incesto a las relaciones entre hermanos; no es la opinión del autor. Las víctimas suelen ser niñas que ya han entrado en una época de desarrollo sexual. Pedofilia: Se excitan con los niños en general.",
    "Incesto: se mantienen relaciones entre familiares (padre - hija; tío - sobrina).",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Incesto: se mantienen relaciones entre familiares (padre - hija; tío - sobrina).",
    [
      { term: "Sadismo y masoquismo sexual", difference: "Pedofilia e incesto se define en el documento como: Incesto: se mantienen relaciones entre familiares (padre - hija; tío - sobrina)." }, { term: "Voyerismo y exhibicionismo", difference: "Pedofilia e incesto se define en el documento como: Incesto: se mantienen relaciones entre familiares (padre - hija; tío - sobrina)." }
    ],
    "Media"
  ),
  makeConcept(
    180,
    "Relaciones consigo mismo",
    "relacion",
    "Funciones de relación",
    "Semiología",
    "Aquí se valora la autoapreciación de cualidades positivas y negativas. ¿Qué piensa usted de sí mismo? ¿Como lo valoran otras personas generalmente? ¿Le gusta ser como es o prefiere ser como otra persona? ¿Con qué características? ¿Cómo le gustaría ser? ¿Qué piensan los demás de él?",
    "Aquí se valora la autoapreciación de cualidades positivas y negativas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Aquí se valora la autoapreciación de cualidades positivas y negativas.",
    [
      { term: "Relaciones con las demás personas", difference: "Relaciones consigo mismo se define en el documento como: Aquí se valora la autoapreciación de cualidades positivas y negativas." }, { term: "Relaciones con las cosas", difference: "Relaciones consigo mismo se define en el documento como: Aquí se valora la autoapreciación de cualidades positivas y negativas." }
    ],
    "Media"
  ),
  makeConcept(
    181,
    "Relaciones con las demás personas",
    "relacion",
    "Funciones de relación",
    "Semiología",
    "Se enfoca directamente al tipo de relaciones intrapersonales que el sujeto suele establecer. ¿Cómo eres tú en tus relaciones con las demás personas? ¿Qué piensas tú de las demás personas?",
    "Se enfoca directamente al tipo de relaciones intrapersonales que el sujeto suele establecer.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se enfoca directamente al tipo de relaciones intrapersonales que el sujeto suele establecer.",
    [
      { term: "Relaciones con las cosas", difference: "Relaciones con las demás personas se define en el documento como: Se enfoca directamente al tipo de relaciones intrapersonales que el sujeto suele establecer." }, { term: "Relaciones consigo mismo", difference: "Relaciones con las demás personas se define en el documento como: Se enfoca directamente al tipo de relaciones intrapersonales que el sujeto suele establecer." }
    ],
    "Media"
  ),
  makeConcept(
    182,
    "Relaciones con las cosas",
    "relacion",
    "Funciones de relación",
    "Semiología",
    "Es importante saber cuáles son los intereses que tiene el paciente en la vida. Hay personas que tienen intereses científicos, otras artísticos, literarios, políticos, etc., ¿Qué es lo que más le interesa en la vida? ¿Qué es lo que menos le interesa? ¿Cuáles son sus ideales más importantes? ¿A qué dedica su tiempo libre? ¿Qué es lo que más le motiva hacer? ¿Lo que más disfruta y lo que menos?",
    "Es importante saber cuáles son los intereses que tiene el paciente en la vida.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es importante saber cuáles son los intereses que tiene el paciente en la vida.",
    [
      { term: "Relaciones con las demás personas", difference: "Relaciones con las cosas se define en el documento como: Es importante saber cuáles son los intereses que tiene el paciente en la vida." }, { term: "Relaciones consigo mismo", difference: "Relaciones con las cosas se define en el documento como: Es importante saber cuáles son los intereses que tiene el paciente en la vida." }
    ],
    "Media"
  ),
  makeConcept(
    183,
    "Pensamiento autista",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El pensar se origina a partir de vivencias preceptúales que no se corresponden a la realidad. Es un pensamiento lleno de fantasía y de irrealidad. Generalmente surge a partir de una sensación o percepción anormal, habitualmente alucinatoria. A estos pacientes se les ve \"ensimismados\" en su mundo irreal, apartados de la realidad, \"viviendo\" su mundo fantástico. Esto es lo que llamamos autismo o pensamiento autista",
    "El pensar se origina a partir de vivencias preceptúales que no se corresponden a la realidad.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El pensar se origina a partir de vivencias preceptúales que no se corresponden a la realidad.",
    [
      { term: "Bradipsiquia lentificación del pensamiento", difference: "Pensamiento autista se define en el documento como: El pensar se origina a partir de vivencias preceptúales que no se corresponden a la realidad." }, { term: "Taquipsiquia o aceleración del pensamiento", difference: "Pensamiento autista se define en el documento como: El pensar se origina a partir de vivencias preceptúales que no se corresponden a la realidad." }
    ],
    "Media"
  ),
  makeConcept(
    184,
    "Bradipsiquia lentificación del pensamiento",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Retardo o la lentificación en la producción de las ideas. La paciente conversa muy lentamente, cuando le dirigimos una pregunta, demora en contestar y cuando lo hace, su diálogo se torna tediosos, como si tuviera que hacer un tremendo esfuerzo para coordinar sus ideas. Este síntoma es frecuente en pacientes portadores de cuadros depresivos graves.",
    "Retardo o la lentificación en la producción de las ideas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Retardo o la lentificación en la producción de las ideas.",
    [
      { term: "Pensamiento autista", difference: "Bradipsiquia lentificación del pensamiento se define en el documento como: Retardo o la lentificación en la producción de las ideas." }, { term: "Taquipsiquia o aceleración del pensamiento", difference: "Bradipsiquia lentificación del pensamiento se define en el documento como: Retardo o la lentificación en la producción de las ideas." }
    ],
    "Media"
  ),
  makeConcept(
    185,
    "Taquipsiquia o aceleración del pensamiento",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Es lo opuesto del anterior. Se caracteriza por el desarrollo rápido de las ideas. Los pacientes responden las preguntas muy rápido u su conversación es acelerada y habitualmente muy rica en palabras y expresiones. Este síntoma es característico de los cuadros de manía.",
    "Es lo opuesto del anterior.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es lo opuesto del anterior.",
    [
      { term: "Bradipsiquia lentificación del pensamiento", difference: "Taquipsiquia o aceleración del pensamiento se define en el documento como: Es lo opuesto del anterior." }, { term: "Fuga de ideas o descarrilamiento", difference: "Taquipsiquia o aceleración del pensamiento se define en el documento como: Es lo opuesto del anterior." }
    ],
    "Media"
  ),
  makeConcept(
    186,
    "Fuga de ideas o descarrilamiento",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Es el grado máximo de aceleración del pensamiento. El paciente \"piensa más rápido de lo que es capaz de transmitir mediante el lenguaje\". Las ideas \"se le fugan\" al paciente y no puede concluir la idea que estaba expresando.",
    "Es el grado máximo de aceleración del pensamiento.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es el grado máximo de aceleración del pensamiento.",
    [
      { term: "Pérdida de meta", difference: "Fuga de ideas o descarrilamiento se define en el documento como: Es el grado máximo de aceleración del pensamiento." }, { term: "Taquipsiquia o aceleración del pensamiento", difference: "Fuga de ideas o descarrilamiento se define en el documento como: Es el grado máximo de aceleración del pensamiento." }
    ],
    "Media"
  ),
  makeConcept(
    187,
    "Pérdida de meta",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "En este caso se produce un fracaso a la hora de seguir una cadena de pensamientos hasta su conclusión. Se trata de un discurso que comienza con un tema concreto, pero empieza a divagar y se va alejando paulatinamente del asunto inicial hasta el punto de que no se vuelve a él. El paciente puede darse cuenta, o no, de que ha perdido su meta, lo que quería decir. Su aparición se suele asociar con el descarrilamiento.",
    "En este caso se produce un fracaso a la hora de seguir una cadena de pensamientos hasta su conclusión.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: En este caso se produce un fracaso a la hora de seguir una cadena de pensamientos hasta su conclusión.",
    [
      { term: "Fuga de ideas o descarrilamiento", difference: "Pérdida de meta se define en el documento como: En este caso se produce un fracaso a la hora de seguir una cadena de pensamientos hasta su conclusión." }, { term: "Presión del habla", difference: "Pérdida de meta se define en el documento como: En este caso se produce un fracaso a la hora de seguir una cadena de pensamientos hasta su conclusión." }
    ],
    "Media"
  ),
  makeConcept(
    188,
    "Presión del habla",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "En este caso la persona presenta un aumento significativo en la cantidad y velocidad (taquilalia) del habla espontánea, en comparación con lo que era normal para esa persona o de lo que se considera habitual en su contexto social de referencia. El paciente habla muy deprisa, deja frases sin completar por el ansia de comunicar una nueva idea y es difícil interrumpirle: de hecho, puede continuar hablando a pesar de que se le interrumpa. Puede acompañarse de descarrilamiento, tangencialidad, incoherencia o fuga de ideas, aunque en la presión del habla las características esenciales son la velocidad y cantidad del discurso.",
    "En este caso la persona presenta un aumento significativo en la cantidad y velocidad (taquilalia) del habla espontánea, en comparación con lo que era normal para esa persona o de lo que se considera habitual...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: En este caso la persona presenta un aumento significativo en la cantidad y velocidad (taquilalia) del habla espontánea, en comparación con lo que era normal para esa persona o de...",
    [
      { term: "Prolijidad", difference: "Presión del habla se define en el documento como: En este caso la persona presenta un aumento significativo en la cantidad y velocidad (taquilalia) del habla espontánea, en comparación con lo que era normal para esa persona o de..." }, { term: "Pérdida de meta", difference: "Presión del habla se define en el documento como: En este caso la persona presenta un aumento significativo en la cantidad y velocidad (taquilalia) del habla espontánea, en comparación con lo que era normal para esa persona o de..." }
    ],
    "Alta"
  ),
  makeConcept(
    189,
    "Prolijidad",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Detallismo en la conversación Sin que tenga aceleración de su pensamiento, al hablar, da muchos rodeos innecesarios, haciendo alusión a hechos y sucesos que no tienen tanta importancia pero que se relacionan con la idea central de lo que quiere expresar. Este síntoma es frecuente en pacientes que son portadores de enfermedades como las demencias y trastornos obsesivo-compulsivos, que estudiaremos más adelante.",
    "Detallismo en la conversación Sin que tenga aceleración de su pensamiento, al hablar, da muchos rodeos innecesarios, haciendo alusión a hechos y sucesos que no tienen tanta importancia pero que se relacionan...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Detallismo en la conversación Sin que tenga aceleración de su pensamiento, al hablar, da muchos rodeos innecesarios, haciendo alusión a hechos y sucesos que no tienen tanta...",
    [
      { term: "Perseveración", difference: "Prolijidad se define en el documento como: Detallismo en la conversación Sin que tenga aceleración de su pensamiento, al hablar, da muchos rodeos innecesarios, haciendo alusión a hechos y sucesos que no tienen tanta..." }, { term: "Presión del habla", difference: "Prolijidad se define en el documento como: Detallismo en la conversación Sin que tenga aceleración de su pensamiento, al hablar, da muchos rodeos innecesarios, haciendo alusión a hechos y sucesos que no tienen tanta..." }
    ],
    "Media"
  ),
  makeConcept(
    190,
    "Perseveración",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Repetición automática y frecuente de representaciones verbales y motoras, introducidas por el sujeto como material de relleno cuando se dan déficit de evocación, el paciente insiste en la idea y la repite una y otra vez. A veces se trata de una idea, frase o simplemente palabra que se repite durante el diálogo de forma reiterativa e innecesaria.",
    "Repetición automática y frecuente de representaciones verbales y motoras, introducidas por el sujeto como material de relleno cuando se dan déficit de evocación, el paciente insiste en la idea y la repite una...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Repetición automática y frecuente de representaciones verbales y motoras, introducidas por el sujeto como material de relleno cuando se dan déficit de evocación, el paciente...",
    [
      { term: "Bloqueo o Interrupción del pensamiento", difference: "Perseveración se define en el documento como: Repetición automática y frecuente de representaciones verbales y motoras, introducidas por el sujeto como material de relleno cuando se dan déficit de evocación, el paciente..." }, { term: "Prolijidad", difference: "Perseveración se define en el documento como: Repetición automática y frecuente de representaciones verbales y motoras, introducidas por el sujeto como material de relleno cuando se dan déficit de evocación, el paciente..." }
    ],
    "Media"
  ),
  makeConcept(
    191,
    "Bloqueo o Interrupción del pensamiento",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "También se le llama robo del pensamiento. Caracterizado porque el paciente en su conversación de pronto se detiene sin haber terminado la idea central, manifestando que \"se le fue la idea de lo que estaba diciendo\"",
    "También se le llama robo del pensamiento.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: También se le llama robo del pensamiento.",
    [
      { term: "Perseveración", difference: "Bloqueo o Interrupción del pensamiento se define en el documento como: También se le llama robo del pensamiento." }, { term: "Vacío mental", difference: "Bloqueo o Interrupción del pensamiento se define en el documento como: También se le llama robo del pensamiento." }
    ],
    "Media"
  ),
  makeConcept(
    192,
    "Vacío mental",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El paciente manifiesta que no piensa en nada, que tiene la mente en blanco. Se suele presentar en pacientes con depresión y demencias.",
    "El paciente manifiesta que no piensa en nada, que tiene la mente en blanco.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El paciente manifiesta que no piensa en nada, que tiene la mente en blanco.",
    [
      { term: "Bloqueo o Interrupción del pensamiento", difference: "Vacío mental se define en el documento como: El paciente manifiesta que no piensa en nada, que tiene la mente en blanco." }, { term: "Verborrea", difference: "Vacío mental se define en el documento como: El paciente manifiesta que no piensa en nada, que tiene la mente en blanco." }
    ],
    "Media"
  ),
  makeConcept(
    193,
    "Verborrea",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El individuo habla por horas o por días, intentando expresar sus ideas, pero sin poder lograrlo -lo que dice carece de significado-. Puede estar hablando solo o con otras personas, también puede tener un tono alto al hablar o muy bajo (murmullo). Asociado a procesos orgánicos, psicóticos o maníacos.",
    "El individuo habla por horas o por días, intentando expresar sus ideas, pero sin poder lograrlo -lo que dice carece de significado-.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El individuo habla por horas o por días, intentando expresar sus ideas, pero sin poder lograrlo -lo que dice carece de significado-.",
    [
      { term: "Disgregación", difference: "Verborrea se define en el documento como: El individuo habla por horas o por días, intentando expresar sus ideas, pero sin poder lograrlo -lo que dice carece de significado-." }, { term: "Vacío mental", difference: "Verborrea se define en el documento como: El individuo habla por horas o por días, intentando expresar sus ideas, pero sin poder lograrlo -lo que dice carece de significado-." }
    ],
    "Media"
  ),
  makeConcept(
    194,
    "Disgregación",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Existe es una incongruencia en las frases que dice el paciente sin que una tenga relación con la otra. Por ejemplo: un paciente dice ¡la naranja es dulce y sabrosa, pero yo me quedo en la casa porque la silla está en su sitio\".",
    "Existe es una incongruencia en las frases que dice el paciente sin que una tenga relación con la otra.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Existe es una incongruencia en las frases que dice el paciente sin que una tenga relación con la otra.",
    [
      { term: "Aliteración", difference: "Disgregación se define en el documento como: Existe es una incongruencia en las frases que dice el paciente sin que una tenga relación con la otra." }, { term: "Verborrea", difference: "Disgregación se define en el documento como: Existe es una incongruencia en las frases que dice el paciente sin que una tenga relación con la otra." }
    ],
    "Media"
  ),
  makeConcept(
    195,
    "Aliteración",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El paciente repite una o muchas letras en una sola frase de manera innecesaria.",
    "El paciente repite una o muchas letras en una sola frase de manera innecesaria.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El paciente repite una o muchas letras en una sola frase de manera innecesaria.",
    [
      { term: "Disgregación", difference: "Aliteración se define en el documento como: El paciente repite una o muchas letras en una sola frase de manera innecesaria." }, { term: "Incoherencia, Esquisofasia o Paragramatismo", difference: "Aliteración se define en el documento como: El paciente repite una o muchas letras en una sola frase de manera innecesaria." }
    ],
    "Básica"
  ),
  makeConcept(
    196,
    "Incoherencia, Esquisofasia o Paragramatismo",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Falta de conexión lógica entre las palabras que componen una frase y que se hace totalmente incomprensible para el interlocutor. Verdaderamente lo que se produce es una \"ensalada de palabras\" y podríamos decir que hay una ruptura del pensamiento del paciente.",
    "Falta de conexión lógica entre las palabras que componen una frase y que se hace totalmente incomprensible para el interlocutor.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Falta de conexión lógica entre las palabras que componen una frase y que se hace totalmente incomprensible para el interlocutor.",
    [
      { term: "Aliteración", difference: "Incoherencia, Esquisofasia o Paragramatismo se define en el documento como: Falta de conexión lógica entre las palabras que componen una frase y que se hace totalmente incomprensible para el interlocutor." }, { term: "Tangencialidad", difference: "Incoherencia, Esquisofasia o Paragramatismo se define en el documento como: Falta de conexión lógica entre las palabras que componen una frase y que se hace totalmente incomprensible para el interlocutor." }
    ],
    "Media"
  ),
  makeConcept(
    197,
    "Tangencialidad",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Cuando se le realiza una pregunta al paciente, éste responde oblicuamente, es decir, con respuestas tangenciales o incluso irrelevante.",
    "Cuando se le realiza una pregunta al paciente, éste responde oblicuamente, es decir, con respuestas tangenciales o incluso irrelevante.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Cuando se le realiza una pregunta al paciente, éste responde oblicuamente, es decir, con respuestas tangenciales o incluso irrelevante.",
    [
      { term: "Ilogicidad", difference: "Tangencialidad se define en el documento como: Cuando se le realiza una pregunta al paciente, éste responde oblicuamente, es decir, con respuestas tangenciales o incluso irrelevante." }, { term: "Incoherencia, Esquisofasia o Paragramatismo", difference: "Tangencialidad se define en el documento como: Cuando se le realiza una pregunta al paciente, éste responde oblicuamente, es decir, con respuestas tangenciales o incluso irrelevante." }
    ],
    "Media"
  ),
  makeConcept(
    198,
    "Ilogicidad",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Patrón de habla en el que no se llega a las conclusiones de manera lógica. Es un fracaso en las inferencias inductivas.",
    "Patrón de habla en el que no se llega a las conclusiones de manera lógica.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Patrón de habla en el que no se llega a las conclusiones de manera lógica.",
    [
      { term: "Habla distraída", difference: "Ilogicidad se define en el documento como: Patrón de habla en el que no se llega a las conclusiones de manera lógica." }, { term: "Tangencialidad", difference: "Ilogicidad se define en el documento como: Patrón de habla en el que no se llega a las conclusiones de manera lógica." }
    ],
    "Básica"
  ),
  makeConcept(
    199,
    "Habla distraída",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Este trastorno es especialmente frecuente en la manía y, en un grado mucho menor, en estados de ansiedad. Se caracteriza porque durante el discurso la persona se detiene en medio de una frase o idea, y cambia de tema en respuesta a estímulos inmediatos y nuevos (p. ej., lo que hay sobre la mesa del clínico).",
    "Este trastorno es especialmente frecuente en la manía y, en un grado mucho menor, en estados de ansiedad.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Este trastorno es especialmente frecuente en la manía y, en un grado mucho menor, en estados de ansiedad.",
    [
      { term: "Ilogicidad", difference: "Habla distraída se define en el documento como: Este trastorno es especialmente frecuente en la manía y, en un grado mucho menor, en estados de ansiedad." }, { term: "Resonancias", difference: "Habla distraída se define en el documento como: Este trastorno es especialmente frecuente en la manía y, en un grado mucho menor, en estados de ansiedad." }
    ],
    "Media"
  ),
  makeConcept(
    200,
    "Resonancias",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Patrón del habla en el que la elección de palabras parece estar determinada por los sonidos (p. ej., por rimas entre palabras) y no por sus relaciones de significado. En consecuencia, son las asociaciones fonéticas (denominación que a veces se aplica a este trastorno) y no los significados lo que rige el discurso del paciente, discurso que puede llegar a ser ininteligible para el oyente. Además de las rimas, pueden producirse también juegos de palabras y asociaciones de doble sentido, de modo que una palabra con un sonido parecido a otra, pero con un significado distinto, da lugar a iniciar una nueva idea o pensamiento.",
    "Patrón del habla en el que la elección de palabras parece estar determinada por los sonidos (p.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Patrón del habla en el que la elección de palabras parece estar determinada por los sonidos (p.",
    [
      { term: "Habla distraída", difference: "Resonancias se define en el documento como: Patrón del habla en el que la elección de palabras parece estar determinada por los sonidos (p." }, { term: "Neologismos", difference: "Resonancias se define en el documento como: Patrón del habla en el que la elección de palabras parece estar determinada por los sonidos (p." }
    ],
    "Alta"
  ),
  makeConcept(
    201,
    "Neologismos",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "En este caso la persona inventa palabras o bien otorga un significado diferente del correcto a una palabra del lenguaje cotidiano. En consecuencia, el oyente no comprende lo que está diciendo el paciente que, a menudo, acaba también por perderse en su discurso. Es muy poco frecuente y solo aparece ocasionalmente en algunos casos de manía y esquizofrenia. Ejemplo: En las meserías se asientan las orugas como si fueran aspirides.",
    "En este caso la persona inventa palabras o bien otorga un significado diferente del correcto a una palabra del lenguaje cotidiano.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: En este caso la persona inventa palabras o bien otorga un significado diferente del correcto a una palabra del lenguaje cotidiano.",
    [
      { term: "Habla afectada (discurso enfático)", difference: "Neologismos se define en el documento como: En este caso la persona inventa palabras o bien otorga un significado diferente del correcto a una palabra del lenguaje cotidiano." }, { term: "Resonancias", difference: "Neologismos se define en el documento como: En este caso la persona inventa palabras o bien otorga un significado diferente del correcto a una palabra del lenguaje cotidiano." }
    ],
    "Alta"
  ),
  makeConcept(
    202,
    "Habla afectada (discurso enfático)",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El discurso resulta pomposo, distante o pedante por la utilización, por ejemplo, de fórmulas de cortesía extrema o excesivamente cultas, fuera de contexto e inadecuadas. Es poco frecuente, si bien, puede aparecer en el transcurso del discurso de paciente con manía, depresión o esquizofrenia",
    "El discurso resulta pomposo, distante o pedante por la utilización, por ejemplo, de fórmulas de cortesía extrema o excesivamente cultas, fuera de contexto e inadecuadas.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El discurso resulta pomposo, distante o pedante por la utilización, por ejemplo, de fórmulas de cortesía extrema o excesivamente cultas, fuera de contexto e inadecuadas.",
    [
      { term: "Autorreferencia", difference: "Habla afectada (discurso enfático) se define en el documento como: El discurso resulta pomposo, distante o pedante por la utilización, por ejemplo, de fórmulas de cortesía extrema o excesivamente cultas, fuera de contexto e inadecuadas." }, { term: "Neologismos", difference: "Habla afectada (discurso enfático) se define en el documento como: El discurso resulta pomposo, distante o pedante por la utilización, por ejemplo, de fórmulas de cortesía extrema o excesivamente cultas, fuera de contexto e inadecuadas." }
    ],
    "Media"
  ),
  makeConcept(
    203,
    "Autorreferencia",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El paciente lleva constantemente el discurso hacia sí mismo de manera inadecuada, aunque se trate de un tema neutro. Es difícil de valorar en el contexto de una entrevista clínica donde las preguntas se refieren continuamente a la persona, es más fácil hacerlo en una conversación informal sobre aspectos neutros u observando cómo se comporta el paciente en las relaciones con otros. Ejemplo: Entrevistador: ¿Qué día de la semana es hoy? Paciente: Martes. Justamente ese es un gran problema para mí, nunca tengo claro qué día es. No se debe confundir con un delirio de referencia, en el que el paciente se siente amenazado o minusvalorado a partir de cualquier comentario inocuo que escuche, ya sea sobre él o sobre cualquier otro tema, o ante cualquier pregunta que se le haga durante una entrevista.",
    "El paciente lleva constantemente el discurso hacia sí mismo de manera inadecuada, aunque se trate de un tema neutro.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El paciente lleva constantemente el discurso hacia sí mismo de manera inadecuada, aunque se trate de un tema neutro.",
    [
      { term: "Habla afectada (discurso enfático)", difference: "Autorreferencia se define en el documento como: El paciente lleva constantemente el discurso hacia sí mismo de manera inadecuada, aunque se trate de un tema neutro." }, { term: "Pobreza del habla o alogia", difference: "Autorreferencia se define en el documento como: El paciente lleva constantemente el discurso hacia sí mismo de manera inadecuada, aunque se trate de un tema neutro." }
    ],
    "Alta"
  ),
  makeConcept(
    204,
    "Pobreza del habla o alogia",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Consiste en una disminución de la cantidad de lenguaje espontáneo. La persona responde a las preguntas de forma breve, concreta y poco elaborada, sin añadir información adicional de manera espontánea. Las respuestas pueden ser, de hecho, monosilábicas e incluso puede que el paciente no responda a alguna de las preguntas. Ejemplo: Entrevistador: ¿Tienes hermanos? Paciente: Sí. (Habitualmente, ante preguntas de este tipo se suele añadir algún detalle, como por ejemplo, «sí dos chicas más jóvenes que yo y un chico mayor que yo»).",
    "Consiste en una disminución de la cantidad de lenguaje espontáneo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Consiste en una disminución de la cantidad de lenguaje espontáneo.",
    [
      { term: "Autorreferencia", difference: "Pobreza del habla o alogia se define en el documento como: Consiste en una disminución de la cantidad de lenguaje espontáneo." }, { term: "Pobreza del contenido del habla (pobreza del contenido del pensamiento, habla vacía, alogia, verbigeración, trastorno formal negativo", difference: "Pobreza del habla o alogia se define en el documento como: Consiste en una disminución de la cantidad de lenguaje espontáneo." }
    ],
    "Alta"
  ),
  makeConcept(
    205,
    "Pobreza del contenido del habla",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "El paciente responde tomándose un tiempo normal, e incluso algo superior, pero el contenido que se transmite es escaso y poco informativo. También puede suceder que el paciente proporciona la información adecuada, pero necesita muchas palabras y tiempo para proporcionarla. Ejemplo: Entrevistador: ¿Por qué elegiste leer precisamente esta novela? Paciente: Porque me gusta leer, leer es bueno. Mi padre siempre dice que le gusta leer, a mí me gusta leer. Cuando leo me gusta. También me gusta leer con mi padre. La novela es una forma de literatura muy interesante. Me gusta mucho.",
    "El paciente responde tomándose un tiempo normal, e incluso algo superior, pero el contenido que se transmite es escaso y poco informativo.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El paciente responde tomándose un tiempo normal, e incluso algo superior, pero el contenido que se transmite es escaso y poco informativo.",
    [
      { term: "Pararrespuestas o respuestas aproximadas", difference: "Pobreza del contenido del habla se define en el documento como: El paciente responde tomándose un tiempo normal, e incluso algo superior, pero el contenido que se transmite es escaso y poco informativo." }, { term: "Pobreza del habla o alogia", difference: "Pobreza del contenido del habla se define en el documento como: El paciente responde tomándose un tiempo normal, e incluso algo superior, pero el contenido que se transmite es escaso y poco informativo." }
    ],
    "Alta"
  ),
  makeConcept(
    206,
    "Pararrespuestas o respuestas aproximadas",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Se evidencia cuando, ante una pregunta concreta que entra dentro de los conocimientos del paciente, este proporciona una respuesta aproximada que indica que ha comprendido la pregunta, pero su respuesta no es correcta ni exacta, o guarda solo una relación muy indirecta con la pregunta: Por ejemplo, ante la pregunta de \"¿cuántos años tiene?\", el paciente responde: \"con mi madre y mis dos hijas sumamos 152\"",
    "Se evidencia cuando, ante una pregunta concreta que entra dentro de los conocimientos del paciente, este proporciona una respuesta aproximada que indica que ha comprendido la pregunta, pero su respuesta no es...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se evidencia cuando, ante una pregunta concreta que entra dentro de los conocimientos del paciente, este proporciona una respuesta aproximada que indica que ha comprendido la...",
    [
      { term: "Pensamiento concreto (concretismo)", difference: "Pararrespuestas o respuestas aproximadas se define en el documento como: Se evidencia cuando, ante una pregunta concreta que entra dentro de los conocimientos del paciente, este proporciona una respuesta aproximada que indica que ha comprendido la..." }, { term: "Pobreza del contenido del habla", difference: "Pararrespuestas o respuestas aproximadas se define en el documento como: Se evidencia cuando, ante una pregunta concreta que entra dentro de los conocimientos del paciente, este proporciona una respuesta aproximada que indica que ha comprendido la..." }
    ],
    "Media"
  ),
  makeConcept(
    207,
    "Pensamiento concreto (concretismo)",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Hace referencia a un pensamiento excesivamente concreto y literal, con dificultades para la abstracción o para captar el significado metafórico del lenguaje, interpretando las metáforas en sentido literal: por ejemplo, un paciente al que se le indica que la medicación que está tomando puede tener efectos secundarios, intenta ser siempre el segundo en cualquier actividad del hospital.",
    "Hace referencia a un pensamiento excesivamente concreto y literal, con dificultades para la abstracción o para captar el significado metafórico del lenguaje, interpretando las metáforas en sentido literal: por...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Hace referencia a un pensamiento excesivamente concreto y literal, con dificultades para la abstracción o para captar el significado metafórico del lenguaje, interpretando las...",
    [
      { term: "Pararrespuestas o respuestas aproximadas", difference: "Pensamiento concreto (concretismo) se define en el documento como: Hace referencia a un pensamiento excesivamente concreto y literal, con dificultades para la abstracción o para captar el significado metafórico del lenguaje, interpretando las..." }, { term: "Preocupación (worry)", difference: "Pensamiento concreto (concretismo) se define en el documento como: Hace referencia a un pensamiento excesivamente concreto y literal, con dificultades para la abstracción o para captar el significado metafórico del lenguaje, interpretando las..." }
    ],
    "Media"
  ),
  makeConcept(
    208,
    "Preocupación (worry)",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Cadena de pensamientos sobre el futuro, cargada de afecto negativo, relativamente incontrolable. Representa un intento de resolución mental de problemas con resultado incierto, aunque con alta probabilidad de que sea negativo. Ejemplo: \"Siempre me he preocupado por todo, qué prepararía para cenar, qué suéter me combinaba mejor, o cuál sería el mejor regalo para cualquier amigo. Simplemente no puedo despreocuparme de ningún detalle. Si estaba demasiado preocupado, dejaba de ir al trabajo. Entonces me preocupaba por perder el trabajo. Siempre me he imaginado que las cosas serían peores que la realidad\"",
    "Cadena de pensamientos sobre el futuro, cargada de afecto negativo, relativamente incontrolable.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Cadena de pensamientos sobre el futuro, cargada de afecto negativo, relativamente incontrolable.",
    [
      { term: "Pensamiento concreto (concretismo)", difference: "Preocupación (worry) se define en el documento como: Cadena de pensamientos sobre el futuro, cargada de afecto negativo, relativamente incontrolable." }, { term: "Rumiación", difference: "Preocupación (worry) se define en el documento como: Cadena de pensamientos sobre el futuro, cargada de afecto negativo, relativamente incontrolable." }
    ],
    "Alta"
  ),
  makeConcept(
    209,
    "Rumiación",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Proceso de pensar de forma perseverante o repetitiva sobre las emociones negativas, los síntomas de malestar y los problemas, así como en sus posibles causas y consecuencias. Más orientada hacia el presente o el pasado reciente que hacia el futuro. Ejemplo: \"Siento que todo el día estoy dándole vueltas a las cosas que hice mal, y en las que podía haber hecho para no llegar a esta situación en la que ahora me encuentro... ¿qué hice mal? ...todo el tiempo me siento mal, sin ganas de nada, intento entender el porqué, pero no lo consigo, lo pienso una y mil veces, vueltas y más vueltas sobre lo mismo, no consigo librarme de esto, es como estar en un túnel, sin salida... He fallado a todo el mundo, empezando por mí mismo...\"",
    "Proceso de pensar de forma perseverante o repetitiva sobre las emociones negativas, los síntomas de malestar y los problemas, así como en sus posibles causas y consecuencias.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Proceso de pensar de forma perseverante o repetitiva sobre las emociones negativas, los síntomas de malestar y los problemas, así como en sus posibles causas y consecuencias.",
    [
      { term: "Pensamientos automáticos negativos (PAN)", difference: "Rumiación se define en el documento como: Proceso de pensar de forma perseverante o repetitiva sobre las emociones negativas, los síntomas de malestar y los problemas, así como en sus posibles causas y consecuencias." }, { term: "Preocupación (worry)", difference: "Rumiación se define en el documento como: Proceso de pensar de forma perseverante o repetitiva sobre las emociones negativas, los síntomas de malestar y los problemas, así como en sus posibles causas y consecuencias." }
    ],
    "Alta"
  ),
  makeConcept(
    210,
    "Pensamientos automáticos negativos (PAN)",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Auto-afirmaciones negativas, auto-depreciativas, breves, repetitivas, que aparecen de forma repentina en el flujo de pensamientos. No guardan relación con la búsqueda de soluciones acerca de los problemas. Ejemplo: «No soy bueno». «Por qué no puedo hacer nada bien». «Me siento incapaz de empezar de nuevo» «Mi vida es un desastre» «Soy un inútil, no valgo para nada».",
    "Auto-afirmaciones negativas, auto-depreciativas, breves, repetitivas, que aparecen de forma repentina en el flujo de pensamientos.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Auto-afirmaciones negativas, auto-depreciativas, breves, repetitivas, que aparecen de forma repentina en el flujo de pensamientos.",
    [
      { term: "Obsesión Idea obsesiva", difference: "Pensamientos automáticos negativos (PAN) se define en el documento como: Auto-afirmaciones negativas, auto-depreciativas, breves, repetitivas, que aparecen de forma repentina en el flujo de pensamientos." }, { term: "Rumiación", difference: "Pensamientos automáticos negativos (PAN) se define en el documento como: Auto-afirmaciones negativas, auto-depreciativas, breves, repetitivas, que aparecen de forma repentina en el flujo de pensamientos." }
    ],
    "Media"
  ),
  makeConcept(
    211,
    "Obsesión Idea obsesiva",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Característica de la idea fija y fóbica de no poder apartarla cuando se produce a pesar de los esfuerzos que haga el paciente para hacerlo, o sea, es una idea parásita y morbosa, sin embargo, por su contenido, tiene la característica de ser absurda, ilógica y el propio paciente la reconoce como tal. Pensamiento, Impulso o imagen recurrente y persistente que se experimenta como intrusa o no deseada y que causa ansiedad o malestar significativos, por lo que la persona la intenta ignorar o suprimir de algún modo. Las principales características de las obsesiones son las siguientes (Clark y Rhyno, 2005): Cualidad intrusa: Los pensamientos, imágenes o impulsos irrumpen de forma repetitiva, involuntaria y súbita en el flujo del pensamiento consciente en contra de la voluntad de la persona. Recurrencia: En la mayoría de los casos, cuando los síntomas se dan en su máxima expresión, las obsesiones se producen a diario, durante amplios períodos de tiempo. Inaceptabilidad: Las obsesiones son valoradas por los sujetos como inaceptables, y el afecto negativo que evocan varía desde la molestia al malestar o el miedo y la ansiedad. Irracionalidad: La persona reconoce, en algún momento, que la idea obsesiva no tiene sentido, que es irracional. Muchos pensamientos obsesivos son valorados por el sujeto como ideas absurdas, carentes por completo de justificación racional. Esta valoración puede diferir en diferentes momentos del trastorno y en diferentes pacientes. Resistencia activa: Son extremadamente habituales los intentos voluntarios de suprimir, eliminar, disminuir o evitar que la obsesión entre en el flujo de pensamiento por medio de la evitación, de estrategias de control cognitivas o de comportamientos repetitivos (compulsiones). Incontrolabilidad: Los intentos de supresión están condenados al fracaso porque la ¡dea obsesiva es muy difícil (o imposible) de controlar voluntariamente.",
    "Característica de la idea fija y fóbica de no poder apartarla cuando se produce a pesar de los esfuerzos que haga el paciente para hacerlo, o sea, es una idea parásita y morbosa, sin embargo, por su contenido...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Característica de la idea fija y fóbica de no poder apartarla cuando se produce a pesar de los esfuerzos que haga el paciente para hacerlo, o sea, es una idea parásita y morbosa...",
    [
      { term: "Obsesiones autógenas", difference: "Obsesión Idea obsesiva se define en el documento como: Característica de la idea fija y fóbica de no poder apartarla cuando se produce a pesar de los esfuerzos que haga el paciente para hacerlo, o sea, es una idea parásita y morbosa..." }, { term: "Pensamientos automáticos negativos (PAN)", difference: "Obsesión Idea obsesiva se define en el documento como: Característica de la idea fija y fóbica de no poder apartarla cuando se produce a pesar de los esfuerzos que haga el paciente para hacerlo, o sea, es una idea parásita y morbosa..." }
    ],
    "Alta"
  ),
  makeConcept(
    212,
    "Obsesiones autógenas",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Ideas obsesivas con contenidos agresivos, sexuales, religiosos o inmorales, que resultan muy desagradables, son egodistónicas, y están poco relacionados con los estímulos que las suscitan.",
    "Ideas obsesivas con contenidos agresivos, sexuales, religiosos o inmorales, que resultan muy desagradables, son egodistónicas, y están poco relacionados con los estímulos que las suscitan.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Ideas obsesivas con contenidos agresivos, sexuales, religiosos o inmorales, que resultan muy desagradables, son egodistónicas, y están poco relacionados con los estímulos que las...",
    [
      { term: "Obsesiones reactivas", difference: "Obsesiones autógenas se define en el documento como: Ideas obsesivas con contenidos agresivos, sexuales, religiosos o inmorales, que resultan muy desagradables, son egodistónicas, y están poco relacionados con los estímulos que las..." }, { term: "Obsesión Idea obsesiva", difference: "Obsesiones autógenas se define en el documento como: Ideas obsesivas con contenidos agresivos, sexuales, religiosos o inmorales, que resultan muy desagradables, son egodistónicas, y están poco relacionados con los estímulos que las..." }
    ],
    "Media"
  ),
  makeConcept(
    213,
    "Obsesiones reactivas",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Ideas obsesivas sobre contaminación, errores, simetría y orden, cuyos contenidos son valorados como racionales y lógicos pero sus posibles consecuencias resultan muy amenazantes y suscitan comportamientos dirigidos a evitar o minimizar tales consecuencias (p. ej., lavar, ordenar, contar, repetir, comprobar).",
    "Ideas obsesivas sobre contaminación, errores, simetría y orden, cuyos contenidos son valorados como racionales y lógicos pero sus posibles consecuencias resultan muy amenazantes y suscitan comportamientos...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Ideas obsesivas sobre contaminación, errores, simetría y orden, cuyos contenidos son valorados como racionales y lógicos pero sus posibles consecuencias resultan muy amenazantes y...",
    [
      { term: "Obsesiones autógenas", difference: "Obsesiones reactivas se define en el documento como: Ideas obsesivas sobre contaminación, errores, simetría y orden, cuyos contenidos son valorados como racionales y lógicos pero sus posibles consecuencias resultan muy amenazantes y..." }, { term: "Pensamientos intrusos", difference: "Obsesiones reactivas se define en el documento como: Ideas obsesivas sobre contaminación, errores, simetría y orden, cuyos contenidos son valorados como racionales y lógicos pero sus posibles consecuencias resultan muy amenazantes y..." }
    ],
    "Media"
  ),
  makeConcept(
    214,
    "Pensamientos intrusos",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Ideas fenomenológicamente similares a las obsesiones: repetitivas, intrusivas, no deseadas, no intencionadas, interfieren con las actividades, se asocian con afecto negativo, y son difíciles de controlar. Pueden versar sobre cualquier contenido (p. ej., contenidos obsesivos, alimentarios, sobre defectos en la apariencia, hipocondríacos) y son comunes en la población general sin trastornos mentales.",
    "Ideas fenomenológicamente similares a las obsesiones: repetitivas, intrusivas, no deseadas, no intencionadas, interfieren con las actividades, se asocian con afecto negativo, y son difíciles de controlar.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Ideas fenomenológicamente similares a las obsesiones: repetitivas, intrusivas, no deseadas, no intencionadas, interfieren con las actividades, se asocian con afecto negativo, y...",
    [
      { term: "Ideación autolítica", difference: "Pensamientos intrusos se define en el documento como: Ideas fenomenológicamente similares a las obsesiones: repetitivas, intrusivas, no deseadas, no intencionadas, interfieren con las actividades, se asocian con afecto negativo, y..." }, { term: "Obsesiones reactivas", difference: "Pensamientos intrusos se define en el documento como: Ideas fenomenológicamente similares a las obsesiones: repetitivas, intrusivas, no deseadas, no intencionadas, interfieren con las actividades, se asocian con afecto negativo, y..." }
    ],
    "Media"
  ),
  makeConcept(
    215,
    "Ideación autolítica",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "La ideación autolítica o suicida consiste en pensamientos sobre lesionarse físicamente o matarse. Estos pensamientos fluctúan en cuanto a su persistencia y recurrencia y se asocian a estados afectivos negativos e intensos: especialmente, tristeza, ira, culpa, frustración y ansiedad.",
    "La ideación autolítica o suicida consiste en pensamientos sobre lesionarse físicamente o matarse.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: La ideación autolítica o suicida consiste en pensamientos sobre lesionarse físicamente o matarse.",
    [
      { term: "Creencia disfuncional o distorsionada", difference: "Ideación autolítica se define en el documento como: La ideación autolítica o suicida consiste en pensamientos sobre lesionarse físicamente o matarse." }, { term: "Pensamientos intrusos", difference: "Ideación autolítica se define en el documento como: La ideación autolítica o suicida consiste en pensamientos sobre lesionarse físicamente o matarse." }
    ],
    "Media"
  ),
  makeConcept(
    216,
    "Creencia disfuncional o distorsionada",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Supuestos, juicios y valoraciones que se asumen como ciertas, verdaderas o muy plausibles, independientemente de un suceso o situación concretos, y sesgan el procesamiento de información nueva en un sentido que es improductivo y negativo para la persona.",
    "Supuestos, juicios y valoraciones que se asumen como ciertas, verdaderas o muy plausibles, independientemente de un suceso o situación concretos, y sesgan el procesamiento de información nueva en un sentido...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Supuestos, juicios y valoraciones que se asumen como ciertas, verdaderas o muy plausibles, independientemente de un suceso o situación concretos, y sesgan el procesamiento de...",
    [
      { term: "Idea sobrevalorada", difference: "Creencia disfuncional o distorsionada se define en el documento como: Supuestos, juicios y valoraciones que se asumen como ciertas, verdaderas o muy plausibles, independientemente de un suceso o situación concretos, y sesgan el procesamiento de..." }, { term: "Ideación autolítica", difference: "Creencia disfuncional o distorsionada se define en el documento como: Supuestos, juicios y valoraciones que se asumen como ciertas, verdaderas o muy plausibles, independientemente de un suceso o situación concretos, y sesgan el procesamiento de..." }
    ],
    "Media"
  ),
  makeConcept(
    217,
    "Idea sobrevalorada",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Exceso de valoración o de importancia de un asunto que realmente no lo tiene. Por ejemplo: una persona tuvo una pequeña discusión de trabajo con otra. Terminada la misma, el asunto queda aclarado y totalmente solucionado, sin embargo, ella sigue pensando que el problema ha sido grave 24 e incluso llega a darle tanto valor que cree que por lo ocurrido va a ser sancionada o amonestada.",
    "Exceso de valoración o de importancia de un asunto que realmente no lo tiene.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Exceso de valoración o de importancia de un asunto que realmente no lo tiene.",
    [
      { term: "Creencia disfuncional o distorsionada", difference: "Idea sobrevalorada se define en el documento como: Exceso de valoración o de importancia de un asunto que realmente no lo tiene." }, { term: "Idea fija", difference: "Idea sobrevalorada se define en el documento como: Exceso de valoración o de importancia de un asunto que realmente no lo tiene." }
    ],
    "Media"
  ),
  makeConcept(
    218,
    "Idea fija",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Refleja un fenómeno real y además lógico, sin embargo, aparece en el campo de la conciencia del individuo persistentemente y en contra de su voluntad. El paciente refiere que no puede apartar de su mente un pensamiento o una idea y aunque haga un esfuerzo para apartarla, no lo logra.",
    "Refleja un fenómeno real y además lógico, sin embargo, aparece en el campo de la conciencia del individuo persistentemente y en contra de su voluntad.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Refleja un fenómeno real y además lógico, sin embargo, aparece en el campo de la conciencia del individuo persistentemente y en contra de su voluntad.",
    [
      { term: "Idea fóbica", difference: "Idea fija se define en el documento como: Refleja un fenómeno real y además lógico, sin embargo, aparece en el campo de la conciencia del individuo persistentemente y en contra de su voluntad." }, { term: "Idea sobrevalorada", difference: "Idea fija se define en el documento como: Refleja un fenómeno real y además lógico, sin embargo, aparece en el campo de la conciencia del individuo persistentemente y en contra de su voluntad." }
    ],
    "Media"
  ),
  makeConcept(
    219,
    "Idea fóbica",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Refleja miedo o temor El paciente comprende que ese miedo que siente no tiene fundamento pues analiza que lo que se lo produce no es una causa para que lo sienta, sin embargo, aunque trate de apartarlo de su mente, no puede hacerlo. El encontrarse en un lugar cerrado como elevadores, guaguas llenas de pasajeros, habitaciones cerradas, etc. En este caso hablamos de una claustrofobia. Hay otras situaciones comunes en la cotidianeidad como el cruzar una calle muy espaciosa, o permanecer en una plaza grande estando vacía de otras personas, etc. Este temor a los espacios abiertos se denomina agorafobia",
    "Refleja miedo o temor El paciente comprende que ese miedo que siente no tiene fundamento pues analiza que lo que se lo produce no es una causa para que lo sienta, sin embargo, aunque trate de apartarlo de su...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Refleja miedo o temor El paciente comprende que ese miedo que siente no tiene fundamento pues analiza que lo que se lo produce no es una causa para que lo sienta, sin embargo...",
    [
      { term: "Idea fija", difference: "Idea fóbica se define en el documento como: Refleja miedo o temor El paciente comprende que ese miedo que siente no tiene fundamento pues analiza que lo que se lo produce no es una causa para que lo sienta, sin embargo..." }, { term: "Idea hipocondríaca", difference: "Idea fóbica se define en el documento como: Refleja miedo o temor El paciente comprende que ese miedo que siente no tiene fundamento pues analiza que lo que se lo produce no es una causa para que lo sienta, sin embargo..." }
    ],
    "Alta"
  ),
  makeConcept(
    220,
    "Idea hipocondríaca",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Aqueja molestias diversas procedentes de su organismo que él interpreta, pudieran ser producidas por alguna enfermedad. Acuden con frecuencia al médico buscando se les diagnostique alguna enfermedad y se someten a investigaciones paramédicas diversas para lograr su convencimiento.",
    "Aqueja molestias diversas procedentes de su organismo que él interpreta, pudieran ser producidas por alguna enfermedad.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Aqueja molestias diversas procedentes de su organismo que él interpreta, pudieran ser producidas por alguna enfermedad.",
    [
      { term: "Idea delirante. Falsa imagen de un hecho que no se ha producido o la deformación de un suceso que sí ocurrió", difference: "Idea hipocondríaca se define en el documento como: Aqueja molestias diversas procedentes de su organismo que él interpreta, pudieran ser producidas por alguna enfermedad." }, { term: "Idea fóbica", difference: "Idea hipocondríaca se define en el documento como: Aqueja molestias diversas procedentes de su organismo que él interpreta, pudieran ser producidas por alguna enfermedad." }
    ],
    "Media"
  ),
  makeConcept(
    221,
    "Idea delirante",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Decimos que el delirio es irreal porque el pensamiento que tiene el paciente no es como realmente él cree, no es verdadero. Es ilógica por lo absurdo que su contenido tiene. Es morbosa porque se hace pertinaz, constante, el individuo que la posee no puede apartarla de su mente y se convierte verdaderamente en un morbo. Es, además, irreductible puesto que, aunque intentemos por medio del convencimiento de lo que él piensa es irreal, ilógico, no logramos convencerle. De daño o perjuicio: Cuando el contenido se refiere a algún daño para el propio paciente, tal y como pusimos en el ejemplo.",
    "Decimos que el delirio es irreal porque el pensamiento que tiene el paciente no es como realmente él cree, no es verdadero.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Decimos que el delirio es irreal porque el pensamiento que tiene el paciente no es como realmente él cree, no es verdadero.",
    [
      { term: "Idea hipocondríaca", difference: "Idea delirante. Falsa imagen de un hecho que no se ha producido o la deformación de un suceso que sí ocurrió se define en el documento como: Decimos que el delirio es irreal porque el pensamiento que tiene el paciente no es como realmente él cree, no es verdadero." }, { term: "Ideas deliroides", difference: "Idea delirante. Falsa imagen de un hecho que no se ha producido o la deformación de un suceso que sí ocurrió se define en el documento como: Decimos que el delirio es irreal porque el pensamiento que tiene el paciente no es como realmente él cree, no es verdadero." }
    ],
    "Alta"
  ),
  makeConcept(
    222,
    "Ideas deliroides",
    "pensamiento",
    "Pensamiento y lenguaje",
    "Semiología",
    "Tienen características similares a las delirantes, pues son morbosas o insidiosas, son irreales, ilógicas, pero al hacer razonar al enfermo acerca de lo ilógico de las mismas, puede reconsiderarlas y comprender que pudieran estar producidas por un estado de ánimos de él mismo.",
    "Tienen características similares a las delirantes, pues son morbosas o insidiosas, son irreales, ilógicas, pero al hacer razonar al enfermo acerca de lo ilógico de las mismas, puede reconsiderarlas y...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Tienen características similares a las delirantes, pues son morbosas o insidiosas, son irreales, ilógicas, pero al hacer razonar al enfermo acerca de lo ilógico de las mismas...",
    [
      { term: "Idea delirante. Falsa imagen de un hecho que no se ha producido o la deformación de un suceso que sí ocurrió", difference: "Ideas deliroides se define en el documento como: Tienen características similares a las delirantes, pues son morbosas o insidiosas, son irreales, ilógicas, pero al hacer razonar al enfermo acerca de lo ilógico de las mismas..." }, { term: "Idea hipocondríaca", difference: "Ideas deliroides se define en el documento como: Tienen características similares a las delirantes, pues son morbosas o insidiosas, son irreales, ilógicas, pero al hacer razonar al enfermo acerca de lo ilógico de las mismas..." }
    ],
    "Media"
  ),
  makeConcept(
    223,
    "Hipervigilancia (como elemento de la conciencia)",
    "conciencia",
    "Conciencia",
    "Semiología",
    "El individuo se encuentra en un awareness con mayor sensibilidad sensorial, con un aumento motor e intensidad emocional. El sujeto está en búsqueda constante de posibles amenazas, que lo vuelve más irritable, agotado física y mentalmente. Este estado puede ser producido por intoxicaciones, situaciones de alto estrés, etc.). Awareness: Estado funcional donde el individuo puede realizar un procesamiento significativo de recepción de estímulos internos o externos y puede emitir una respuesta. Hay una buena habilidad perceptiva y cognoscitiva con un aprendizaje y atención optimas (claridad de conciencia).",
    "El individuo se encuentra en un awareness con mayor sensibilidad sensorial, con un aumento motor e intensidad emocional.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: El individuo se encuentra en un awareness con mayor sensibilidad sensorial, con un aumento motor e intensidad emocional.",
    [
      { term: "Hiperfrenia", difference: "Hipervigilancia (como elemento de la conciencia) se define en el documento como: El individuo se encuentra en un awareness con mayor sensibilidad sensorial, con un aumento motor e intensidad emocional." }, { term: "Obnubilación", difference: "Hipervigilancia (como elemento de la conciencia) se define en el documento como: El individuo se encuentra en un awareness con mayor sensibilidad sensorial, con un aumento motor e intensidad emocional." }
    ],
    "Alta"
  ),
  makeConcept(
    224,
    "Hiperfrenia",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Estado de hipervigilancia máxima; consciencia exagerada.",
    "Estado de hipervigilancia máxima; consciencia exagerada.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Estado de hipervigilancia máxima; consciencia exagerada.",
    [
      { term: "Hipervigilancia (como elemento de la conciencia)", difference: "Hiperfrenia se define en el documento como: Estado de hipervigilancia máxima; consciencia exagerada." }, { term: "Obnubilación", difference: "Hiperfrenia se define en el documento como: Estado de hipervigilancia máxima; consciencia exagerada." }
    ],
    "Básica"
  ),
  makeConcept(
    225,
    "Obnubilación",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Describe el primer estadio de disminución del nivel de conciencia, caracterizándose por una dificultad para mantener el estado de alerta necesario para responder adecuadamente a los estímulos del contexto, de tal manera que se requieren estímulos externos de cierta intensidad para poder percibirlos. Esta alteración se acompaña de un cierto nivel de deterioro de otros procesos psicológicos como la atención, la percepción, el pensamiento y la memoria, además de la conciencia limitada al entorno, si bien no se pierde por completo la capacidad de reconocimiento. De este modo, el paciente puede entender y ejecutar lentamente órdenes sencillas (p. ej., sacar la lengua o dar la mano). Esta alteración puede estar presente en muchas enfermedades degenerativas y traumáticas, así como en una amplia variedad de condiciones orgánicas, como intoxicación por drogas y alcohol, meningitis, etc. También puede ocurrir en diversos trastornos mentales, como la esquizofrenia, la depresión, etc",
    "Describe el primer estadio de disminución del nivel de conciencia, caracterizándose por una dificultad para mantener el estado de alerta necesario para responder adecuadamente a los estímulos del contexto, de...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Describe el primer estadio de disminución del nivel de conciencia, caracterizándose por una dificultad para mantener el estado de alerta necesario para responder adecuadamente a...",
    [
      { term: "Hiperfrenia", difference: "Obnubilación se define en el documento como: Describe el primer estadio de disminución del nivel de conciencia, caracterizándose por una dificultad para mantener el estado de alerta necesario para responder adecuadamente a..." }, { term: "Somnolencia, letargia o sopor", difference: "Obnubilación se define en el documento como: Describe el primer estadio de disminución del nivel de conciencia, caracterizándose por una dificultad para mantener el estado de alerta necesario para responder adecuadamente a..." }
    ],
    "Alta"
  ),
  makeConcept(
    226,
    "Somnolencia, letargia o sopor",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Es un estado constante y es el siguiente nivel de deterioro progresivo de la conciencia. El paciente está «despierto», pero se quedará «dormido» si se queda sin estimulación sensorial. Se describe a sí mismo como lento para actuar, con dificultades para hablar, perezoso en sus planes y adormecido. Hay un intento de evitar los estímulos dolorosos. Los reflejos, incluyendo la tos y la deglución están presentes pero reducidos; el tono muscular también disminuye. Se caracteriza por una disminución de la actividad psicomotora y de la capacidad para reaccionar a los estímulos externos, que deben ser más intensos para provocar una reacción en el paciente Es importante, señalar que debe diferenciarse entre la somnolencia normal que se produce antes de iniciar el sueño y aquella originada por factores patológicos (infecciones, trastornos metabó-licos, estados tóxicos, epilepsia, trastornos cerebrovasculares, daño cerebral, etc.)",
    "Es un estado constante y es el siguiente nivel de deterioro progresivo de la conciencia.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es un estado constante y es el siguiente nivel de deterioro progresivo de la conciencia.",
    [
      { term: "Estupor", difference: "Somnolencia, letargia o sopor se define en el documento como: Es un estado constante y es el siguiente nivel de deterioro progresivo de la conciencia." }, { term: "Obnubilación", difference: "Somnolencia, letargia o sopor se define en el documento como: Es un estado constante y es el siguiente nivel de deterioro progresivo de la conciencia." }
    ],
    "Alta"
  ),
  makeConcept(
    227,
    "Estupor",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Se caracteriza por falta de reacción y atención al ambiente; el paciente se muestra generalmente inmóvil y sólo le es posible alcanzar un ligero estado de alerta mediante estímulos muy potentes. Por tanto, no son capaces de emitir ninguna conducta intencional y las ocasionales respuestas verbales son incoherentes o ininteligibles En este estado, es imposible explorar el contenido del pensamiento. Puede haber actividad motora estereotipada, movimientos temblorosos y reflejos positivos de presión y succión Tradicionalmente, se ha distinguido entre el estupor de origen neurológico y el estupor de origen psiquiátrico, refiriéndose este último, en su acepción más amplia, a todos aquellos estados caracterizados por mutismo, reducción de la actividad motora y fluctuación de la conciencia. Los diferentes tipos y características del estupor psiquiátrico serán revisados en el apartado dedicado a las alteraciones cualitativas de la conciencia.",
    "Se caracteriza por falta de reacción y atención al ambiente; el paciente se muestra generalmente inmóvil y sólo le es posible alcanzar un ligero estado de alerta mediante estímulos muy potentes.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Se caracteriza por falta de reacción y atención al ambiente; el paciente se muestra generalmente inmóvil y sólo le es posible alcanzar un ligero estado de alerta mediante...",
    [
      { term: "Confusión mental o estado confusional", difference: "Estupor se define en el documento como: Se caracteriza por falta de reacción y atención al ambiente; el paciente se muestra generalmente inmóvil y sólo le es posible alcanzar un ligero estado de alerta mediante..." }, { term: "Somnolencia, letargia o sopor", difference: "Estupor se define en el documento como: Se caracteriza por falta de reacción y atención al ambiente; el paciente se muestra generalmente inmóvil y sólo le es posible alcanzar un ligero estado de alerta mediante..." }
    ],
    "Alta"
  ),
  makeConcept(
    228,
    "Confusión mental o estado confusional",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Hay afectación en los procesos cognitivos del sujeto, concepción desordenada de la realidad, perdida leve de la memoria e incoherencia en relación con uno mismo y el mundo exterior. Se caracteriza por facies de extrañeza que tiene el paciente que lo posea. Éste se encuentra totalmente desorientado y no comprende lo que sucede a su alrededor. El paciente es incapaz de mantener una diálogo comprensible, a pesar de sus esfuerzos para hacerse entender.",
    "Hay afectación en los procesos cognitivos del sujeto, concepción desordenada de la realidad, perdida leve de la memoria e incoherencia en relación con uno mismo y el mundo exterior.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Hay afectación en los procesos cognitivos del sujeto, concepción desordenada de la realidad, perdida leve de la memoria e incoherencia en relación con uno mismo y el mundo...",
    [
      { term: "Coma", difference: "Confusión mental o estado confusional se define en el documento como: Hay afectación en los procesos cognitivos del sujeto, concepción desordenada de la realidad, perdida leve de la memoria e incoherencia en relación con uno mismo y el mundo..." }, { term: "Estupor", difference: "Confusión mental o estado confusional se define en el documento como: Hay afectación en los procesos cognitivos del sujeto, concepción desordenada de la realidad, perdida leve de la memoria e incoherencia en relación con uno mismo y el mundo..." }
    ],
    "Alta"
  ),
  makeConcept(
    229,
    "Coma",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Describe una forma prolongada de suspensión global de la conciencia en la que resulta imposible despertar al paciente a pesar de una estimulación intensa. Alteración que se caracteriza por la pérdida de conciencia, de sensibilidad y de motilidad voluntaria, desapareciendo incluso el funcionamiento reflejo, y en el que se conservan solo las funciones vegetativas Los tipos de coma más frecuentemente descritos son: los tóxicos (producidos por intoxicaciones etílicas, barbitúricos y otras drogas); los metabólicos (hipoglucémico, hepático, urémico, etc.); y los cerebrales (resultado de accidentes cerebrovasculares, traumatismos, tumores, etc.)",
    "Describe una forma prolongada de suspensión global de la conciencia en la que resulta imposible despertar al paciente a pesar de una estimulación intensa.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Describe una forma prolongada de suspensión global de la conciencia en la que resulta imposible despertar al paciente a pesar de una estimulación intensa.",
    [
      { term: "Confusión mental o estado confusional", difference: "Coma se define en el documento como: Describe una forma prolongada de suspensión global de la conciencia en la que resulta imposible despertar al paciente a pesar de una estimulación intensa." }, { term: "Delirium", difference: "Coma se define en el documento como: Describe una forma prolongada de suspensión global de la conciencia en la que resulta imposible despertar al paciente a pesar de una estimulación intensa." }
    ],
    "Alta"
  ),
  makeConcept(
    230,
    "Delirium",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Es una alteración orgánica que implica un deterioro cognitivo global que no se explica por la existencia de una demencia y que suele tener un curso agudo y una duración relativamente escasa (hasta dos semanas) Presencia de alteraciones sensoperceptuales del tipo de las ilusiones y alucinaciones visuales, auditivas y táctiles, lo que motiva una alteración de la afectividad y de la conducta en relación con estas manifestaciones perceptuales. Común verlo en el Delirium Tremens del alcoholismo, donde el paciente se sacude constantemente para quitarse supuestos bichos que le caminan por encima.",
    "Es una alteración orgánica que implica un deterioro cognitivo global que no se explica por la existencia de una demencia y que suele tener un curso agudo y una duración relativamente escasa (hasta dos semanas)...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Es una alteración orgánica que implica un deterioro cognitivo global que no se explica por la existencia de una demencia y que suele tener un curso agudo y una duración...",
    [
      { term: "Coma", difference: "Delirium se define en el documento como: Es una alteración orgánica que implica un deterioro cognitivo global que no se explica por la existencia de una demencia y que suele tener un curso agudo y una duración..." }, { term: "Estado Crepuscular", difference: "Delirium se define en el documento como: Es una alteración orgánica que implica un deterioro cognitivo global que no se explica por la existencia de una demencia y que suele tener un curso agudo y una duración..." }
    ],
    "Alta"
  ),
  makeConcept(
    231,
    "Estado Crepuscular",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Son estados transitorios de inicio y fin súbitos de duración variable (desde pocas horas hasta días), con amnesia lacunar posterior, caracterizados por estrechamiento de la conciencia (similar a la de los estados hipnóticos), ausencia de atención al entorno, curso del pensamiento confuso y explosiones emocionales junto con conductas automáticas y alteraciones de la identidad. El paciente puede realizar actos violentos e inesperados, aunque también puede que la conducta sea tranquila. Este término se restringe a alteraciones producidas por la epilepsia (fundamentalmente del lóbulo temporal), y se diferencia de los estados disociativos de fuga, en los que no hay etiología orgánica demostrable.",
    "Son estados transitorios de inicio y fin súbitos de duración variable (desde pocas horas hasta días), con amnesia lacunar posterior, caracterizados por estrechamiento de la conciencia (similar a la de los...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Son estados transitorios de inicio y fin súbitos de duración variable (desde pocas horas hasta días), con amnesia lacunar posterior, caracterizados por estrechamiento de la...",
    [
      { term: "Delirium", difference: "Estado Crepuscular se define en el documento como: Son estados transitorios de inicio y fin súbitos de duración variable (desde pocas horas hasta días), con amnesia lacunar posterior, caracterizados por estrechamiento de la..." }, { term: "Estados oniroides", difference: "Estado Crepuscular se define en el documento como: Son estados transitorios de inicio y fin súbitos de duración variable (desde pocas horas hasta días), con amnesia lacunar posterior, caracterizados por estrechamiento de la..." }
    ],
    "Alta"
  ),
  makeConcept(
    232,
    "Estados oniroides",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Son estados alterados de conciencia donde el sujeto experimenta con una elevada claridad y vividez ilusiones o alucinaciones - generalmente de naturaleza escénica y multimodal, que, dependiendo de su contenido, pueden provocar reacciones emocionales de intenso terror o, por el contrario, de alegría o diversión, así como respuestas motoras consistentes con el contenido emocional (p. ej., agitación o estados de acinesia). Tiene relación con el sueño, a las vivencias oníricas, que suceden durante el sueño. No es tan profundo como en otros estados. Se mezcla la realidad y la fantasía. Alucinaciones escénicas, es contemplativo, como si estuviera viviendo una película, son por lo general visual y a auditivas, a veces se acompañan de cierta actividad motora. Normalmente comienzan con una alteración del sueño que se altera por la presencia de pesadillas",
    "Son estados alterados de conciencia donde el sujeto experimenta con una elevada claridad y vividez ilusiones o alucinaciones - generalmente de naturaleza escénica y multimodal, que, dependiendo de su...",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Son estados alterados de conciencia donde el sujeto experimenta con una elevada claridad y vividez ilusiones o alucinaciones - generalmente de naturaleza escénica y multimodal...",
    [
      { term: "Automatismos de conciencia", difference: "Estados oniroides se define en el documento como: Son estados alterados de conciencia donde el sujeto experimenta con una elevada claridad y vividez ilusiones o alucinaciones - generalmente de naturaleza escénica y multimodal..." }, { term: "Estado Crepuscular", difference: "Estados oniroides se define en el documento como: Son estados alterados de conciencia donde el sujeto experimenta con una elevada claridad y vividez ilusiones o alucinaciones - generalmente de naturaleza escénica y multimodal..." }
    ],
    "Alta"
  ),
  makeConcept(
    233,
    "Automatismos de conciencia",
    "conciencia",
    "Conciencia",
    "Semiología",
    "Los automatismos implican una acción que tiene lugar en ausencia de conciencia. Un automatismo es una parte involuntaria del comportamiento sobre el cual un individuo no tiene control. El comportamiento en sí es generalmente inadecuado a las circunstancias, y puede no corresponderse con carácter de la persona. Puede ser complejo y coordinado, y parecer intencional y dirigido, aunque con falta de juicio. Posteriormente, el individuo puede no tener ningún recuerdo o alguno parcial y confuso de sus acciones.",
    "Los automatismos implican una acción que tiene lugar en ausencia de conciencia.",
    "En entrevista clínica, se explora observando si aparece este fenómeno descrito en la ficha: Los automatismos implican una acción que tiene lugar en ausencia de conciencia.",
    [
      { term: "Estados oniroides", difference: "Automatismos de conciencia se define en el documento como: Los automatismos implican una acción que tiene lugar en ausencia de conciencia." }, { term: "Estado Crepuscular", difference: "Automatismos de conciencia se define en el documento como: Los automatismos implican una acción que tiene lugar en ausencia de conciencia." }
    ],
    "Alta"
  ),
  makeConcept(
    234,
    "Síndrome de delirium",
    "sindromes",
    "Síndromes cerebrales orgánicos agudos",
    "Síndrome",
    "Cuadro agudo con vigilia baja, atención distráctil, orientación fluctuante, alucinaciones y agitación.",
    "El paciente puede estar sudoroso, tembloroso, desorientado por momentos y con alucinaciones visuales o táctiles.",
    "Paciente que ve animales repugnantes que se le acercan y se agita para defenderse.",
    [
      { term: "Síndrome de obnubilación", difference: "Predomina tranquilidad, hipomimia y necesidad de estímulos fuertes." }, { term: "Síndrome oniroide", difference: "Vivencias escénicas y actitud contemplativa." }
    ],
    "Media"
  ),
  makeConcept(
    235,
    "Síndrome esquizofrénico",
    "sindromes",
    "Síndromes psicopatológicos",
    "Síndrome",
    "Desorganización de funciones psíquicas con disociación ideoafectivoconativa.",
    "Puede haber aislamiento, comunicación difícil, alucinaciones auditivas, pensamiento autista y conducta incomprensible.",
    "Paciente con aspecto descuidado, bloqueo del pensamiento y respuestas afectivas incongruentes.",
    [
      { term: "Síndrome paranoide", difference: "Predominan ideas delirantes de persecución y alucinaciones auditivas." }, { term: "Automatismo psíquico", difference: "Destacan robo o influencia del pensamiento y vivencias de despersonalización." }
    ],
    "Alta"
  ),
  makeConcept(
    236,
    "Síndrome paranoico",
    "sindromes",
    "Síndromes delirantes",
    "Síndrome",
    "Delirio único con argumentación lógica, sin trastornos sensoperceptivos importantes.",
    "La persona conserva orientación y comunicación, pero organiza su conducta alrededor de una idea delirante.",
    "Paciente convencido de una persecución específica, con razonamientos aparentemente coherentes.",
    [
      { term: "Síndrome paranoide", difference: "Incluye alucinaciones auditivas y afectación más global." }, { term: "Síndrome esquizofrénico", difference: "Predomina desorganización global de funciones psíquicas." }
    ],
    "Alta"
  ),
  makeConcept(
    237,
    "Síndrome maníaco",
    "sindromes",
    "Síndromes afectivos",
    "Síndrome",
    "Cuadro afectivo con hipertimia, labilidad, pensamiento acelerado, hiperbulia e hiperquinesia.",
    "La persona se muestra eufórica o irritable, acelerada, con aumento de actividad y necesidades.",
    "Paciente con vestuario llamativo, fuga de ideas, hipersociabilidad e insomnio.",
    [
      { term: "Síndrome ansioso", difference: "Predominan temor, tensión vegetativa e irritabilidad." }, { term: "Síndrome depresivo", difference: "Predominan hipotimia, lentitud, hipobulia y aislamiento." }
    ],
    "Media"
  ),
  makeConcept(
    238,
    "Síndrome depresivo",
    "sindromes",
    "Síndromes afectivos",
    "Síndrome",
    "Cuadro afectivo con hipotimia, pensamiento lento, hipobulia, hipoquinesia y alteración de necesidades.",
    "La persona presenta tristeza marcada, retraimiento, menos energía, insomnio o anorexia.",
    "Paciente con postura flexionada, ideas de minusvalía e aislamiento social.",
    [
      { term: "Síndrome maníaco", difference: "Aumento de energía, hipertimia y pensamiento acelerado." }, { term: "Síndrome asténico", difference: "Predomina cansancio fácil e irritabilidad." }
    ],
    "Media"
  ),
  makeConcept(
    239,
    "Síndrome ansioso",
    "sindromes",
    "Síndromes afectivos",
    "Síndrome",
    "Cuadro con ansiedad, irritabilidad, hipervigilancia discreta y manifestaciones vegetativas.",
    "Hay temor, tensión corporal, palpitaciones, sudoración, manos frías e insomnio inicial.",
    "Paciente angustiado con pupilas dilatadas, palpitaciones y miedo a morir o enloquecer.",
    [
      { term: "Síndrome depresivo", difference: "Predomina tristeza, lentitud y retraimiento." }, { term: "Hipervigilancia", difference: "Es un síntoma atencional, no todo el cuadro sindrómico." }
    ],
    "Media"
  ),
  makeConcept(
    240,
    "Síndrome amnésico confabulatorio",
    "sindromes",
    "Síndromes cerebrales orgánicos crónicos",
    "Síndrome",
    "Cuadro crónico con memoria reciente muy afectada y confabulaciones.",
    "La persona olvida hechos recientes y puede rellenar los vacíos con relatos que parecen creíbles.",
    "Olvida que minutos antes recibió una visita y explica la laguna con una historia inventada sin intención.",
    [
      { term: "Síndrome demencial", difference: "Afectación intelectual global y deterioro progresivo." }, { term: "Amnesia", difference: "Síntoma de pérdida de memoria, no síndrome completo." }
    ],
    "Alta"
  ),
  makeConcept(
    241,
    "Síndrome de obnubilación",
    "sindromes",
    "Síndromes cerebrales orgánicos agudos",
    "Síndrome",
    "Cuadro orgánico agudo con vigilia baja, atención distráctil, memoria disminuida, orientación grosera y necesidad de estímulos fuertes para comunicarse.",
    "El paciente está tranquilo, poco expresivo y necesita estímulos intensos para responder.",
    "Enfermo hipomímico, descuidado si no se le auxilia, con pensamiento lento, indiferencia, abulia e hipoquinesia.",
    [
      { term: "Síndrome de delirium", difference: "En delirium predominan agitación, temblores, alucinaciones visuales o táctiles y orientación fluctuante." }, { term: "Síndrome de confusión mental", difference: "En confusión mental la vigilia está casi abolida, hay comprensión abolida y agitación limitada a la cama." }
    ],
    "Alta"
  ),
  makeConcept(
    242,
    "Síndrome oniroide",
    "sindromes",
    "Síndromes cerebrales orgánicos agudos",
    "Síndrome",
    "Cuadro orgánico agudo con vigilia baja, atención centrada en vivencias alucinatorias y alucinaciones visuales escénicas no angustiosas.",
    "El paciente parece vivir una escena de sueño y se mantiene contemplativo.",
    "Paciente hipomímico e inmóvil, con vivencias visuales escénicas, complacencia beatífica y orientación autopsíquica conservada.",
    [
      { term: "Síndrome de delirium", difference: "El delirium suele ser agitado, ansioso o terrorífico y con orientación fluctuante." }, { term: "Síndrome de estado crepuscular", difference: "El estado crepuscular deja amnesia total y conducta agresiva o fugitiva ligada a alucinaciones." }
    ],
    "Alta"
  ),
  makeConcept(
    243,
    "Síndrome de estado crepuscular",
    "sindromes",
    "Síndromes cerebrales orgánicos agudos",
    "Síndrome",
    "Cuadro orgánico agudo con vigilia muy baja, desorientación total sin fluctuaciones, alucinaciones terroríficas y amnesia total posterior.",
    "El paciente entra en un estado estrechado, agresivo o fugitivo, y luego no recuerda lo ocurrido.",
    "Enfermo sudoroso y agresivo, con pánico, alucinaciones visuales terroríficas y lenguaje prácticamente nulo.",
    [
      { term: "Síndrome de delirium", difference: "En delirium suele quedar evocación residual fragmentaria y la orientación fluctúa." }, { term: "Síndrome oniroide", difference: "El oniroide es contemplativo y las escenas no suelen ser angustiosas." }
    ],
    "Alta"
  ),
  makeConcept(
    244,
    "Síndrome de confusión mental",
    "sindromes",
    "Síndromes cerebrales orgánicos agudos",
    "Síndrome",
    "Cuadro orgánico agudo con vigilia casi abolida, memoria y comprensión abolidas, desorientación total e incoherencia.",
    "La conciencia está muy tomada y el paciente apenas comprende o se orienta.",
    "Paciente con perplejidad, movimientos carfólicos como enrollar la sábana, ilusiones visuales e incoherencia.",
    [
      { term: "Síndrome de obnubilación", difference: "La obnubilación es menos profunda y permite comunicación con estímulos fuertes." }, { term: "Síndrome de delirium", difference: "El delirium tiene riqueza alucinatoria y agitación amplia defensiva." }
    ],
    "Alta"
  ),
  makeConcept(
    245,
    "Síndrome oligofrénico",
    "sindromes",
    "Síndromes cerebrales orgánicos crónicos",
    "Síndrome",
    "Cuadro orgánico crónico con capacidades intelectuales muy disminuidas, pensamiento concreto y funciones de relación comparables a las de un niño.",
    "Predomina limitación intelectual y adaptación creadora reducida.",
    "Paciente distraído y descuidado, con respuestas infantiles, sugestibilidad, dependencia e intolerancia a la frustración.",
    [
      { term: "Síndrome demencial", difference: "El demencial implica deterioro adquirido con memoria muy tomada y desorganización progresiva." }, { term: "Síndrome apatoabúlico", difference: "El apatoabúlico destaca indiferencia, abulia e hipoquinesia." }
    ],
    "Alta"
  ),
  makeConcept(
    246,
    "Síndrome demencial",
    "sindromes",
    "Síndromes cerebrales orgánicos crónicos",
    "Síndrome",
    "Cuadro orgánico crónico con vigilia normal, atención distráctil, memoria muy afectada, capacidades intelectuales muy disminuidas y alteración de hábitos.",
    "Hay deterioro global, especialmente de memoria, intelecto, hábitos y personalidad.",
    "Paciente descuidado, comunicación limitada, pensamiento concreto, perseverante o prolijo, con indiferencia o labilidad.",
    [
      { term: "Síndrome amnésico confabulatorio", difference: "En el amnésico confabulatorio predomina memoria reciente tomada con confabulaciones y orientación relativamente conservada." }, { term: "Síndrome oligofrénico", difference: "El oligofrénico corresponde a limitación intelectual del desarrollo, no deterioro adquirido." }
    ],
    "Alta"
  ),
  makeConcept(
    247,
    "Síndrome apatoabúlico",
    "sindromes",
    "Síndromes cerebrales orgánicos crónicos",
    "Síndrome",
    "Cuadro orgánico crónico con indiferencia, abulia, hipoquinesia, hipomnesia y afectación marcada de funciones de relación, hábitos y necesidades.",
    "Predominan apatía, falta de iniciativa y disminución de la actividad.",
    "Paciente con facies indiferente, curso asociado lentificado, toma de hábitos y necesidades.",
    [
      { term: "Síndrome depresivo", difference: "El depresivo tiene hipotimia, ideas de minusvalía y tristeza; el apatoabúlico centra apatía y abulia orgánicas." }, { term: "Síndrome demencial", difference: "El demencial compromete más globalmente las capacidades intelectuales y memoria." }
    ],
    "Alta"
  ),
  makeConcept(
    248,
    "Síndrome paranoide",
    "sindromes",
    "Síndromes delirantes",
    "Síndrome",
    "Cuadro delirante con actitud recelosa, atención hipervigilante, alucinaciones auditivas verbales e ideas delirantes de daño, persecución o referencia.",
    "Hay delirio con alucinaciones auditivas y afectación global de las funciones de relación.",
    "Paciente descuidado y receloso que oye voces, cree que lo persiguen y actúa de acuerdo con el delirio.",
    [
      { term: "Síndrome paranoico", difference: "El paranoico conserva comunicación y presenta delirio único lógico sin trastornos sensoperceptivos importantes." }, { term: "Síndrome esquizofrénico", difference: "El esquizofrénico destaca desorganización global y disociación ideoafectivoconativa." }
    ],
    "Alta"
  ),
  makeConcept(
    249,
    "Síndrome de automatismo psíquico",
    "sindromes",
    "Síndromes delirantes",
    "Síndrome",
    "Cuadro con pseudoalucinaciones auditivas, trastorno del esquema corporal, despersonalización, desrealización y delirios de influencia o robo del pensamiento.",
    "La persona vive sus pensamientos o cuerpo como influidos, robados o manejados desde fuera.",
    "Paciente con atención dirigida hacia adentro, pseudoalucinaciones, pensamiento autista, bloqueo y delirio de influencia.",
    [
      { term: "Síndrome paranoide", difference: "El paranoide se organiza alrededor de persecución, daño o referencia con alucinaciones auditivas." }, { term: "Síndrome esquizofrénico", difference: "El esquizofrénico es más amplio y se define por desorganización de funciones psíquicas." }
    ],
    "Alta"
  ),
  makeConcept(
    250,
    "Síndrome estuporoso",
    "sindromes",
    "Síndromes discinéticos",
    "Síndrome",
    "Síndrome discinético caracterizado por inmovilidad, mutismo, abulia, acinesia y alteración total de necesidades y hábitos, con claridad de conciencia variable.",
    "El paciente queda inmóvil y mudo, sin estar necesariamente en coma.",
    "Paciente descuidado, inmóvil y mutista, con facies de pánico, tristeza, indiferencia o perplejidad según la forma clínica.",
    [
      { term: "Coma", difference: "En coma la claridad de conciencia está abolida; en estuporoso puede mantenerse en grado variable." }, { term: "Síndrome hipercinético", difference: "El hipercinético es el polo opuesto: actividad motora excesiva y agitación." }
    ],
    "Alta"
  ),
  makeConcept(
    251,
    "Síndrome hipercinético",
    "sindromes",
    "Síndromes discinéticos",
    "Síndrome",
    "Síndrome discinético con aumento de actividad motora voluntaria o involuntaria y afectación notable de la adaptación al medio.",
    "El paciente está extremadamente inquieto y puede llegar a agitación psicomotora.",
    "Puede presentarse como agitación catatónica, excitación maníaca, excitación histérica o furor epiléptico.",
    [
      { term: "Síndrome estuporoso", difference: "El estuporoso se define por inmovilidad y mutismo." }, { term: "Síndrome maníaco", difference: "La excitación maníaca es una modalidad del hipercinético, pero el síndrome maníaco es afectivo." }
    ],
    "Alta"
  ),
  makeConcept(
    252,
    "Síndrome hipocondríaco",
    "sindromes",
    "Otros síndromes psicopatológicos",
    "Síndrome",
    "Cuadro centrado en preocupación excesiva por la salud, temor constante a la muerte y autoobservación continua de funciones corporales.",
    "La persona interpreta el cuerpo desde el miedo a una enfermedad grave o mortal.",
    "Consulta repetidamente al médico sin justificación objetiva, usando terminología médica y centrando la atención en funciones corporales.",
    [
      { term: "Idea hipocondríaca", difference: "La idea hipocondríaca es un contenido; el síndrome incluye conducta, afectividad y atención corporal." }, { term: "Síndrome ansioso", difference: "El ansioso se centra en ansiedad general y síntomas vegetativos; el hipocondríaco en temor a enfermedad." }
    ],
    "Alta"
  ),
  makeConcept(
    253,
    "Síndrome asténico",
    "sindromes",
    "Otros síndromes psicopatológicos",
    "Síndrome",
    "Cuadro caracterizado por agotamiento fácil, cansancio, irritabilidad, disforia, intolerancia a ruidos y dificultades de atención y memoria.",
    "La persona se agota rápido y se irrita con facilidad.",
    "Paciente con aspecto cansado, hipomnesia de fijación y evocación, hiperestesia, cenestopatías y sueño fásico.",
    [
      { term: "Síndrome depresivo", difference: "El depresivo se centra en hipotimia, minusvalía y aislamiento; el asténico en cansancio e irritabilidad." }, { term: "Síndrome ansioso", difference: "El ansioso destaca temor, hiperactividad vegetativa e insomnio vespertino." }
    ],
    "Media"
  ),
  makeConcept(
    254,
    "Síndrome psicopático",
    "sindromes",
    "Otros síndromes psicopatológicos",
    "Síndrome",
    "Cuadro de patrones inadaptativos de comportamiento, control de impulsos, seguridad personal, autovaloración, exigencias, intereses y satisfacción de necesidades.",
    "Predominan formas inadaptativas y persistentes de relación consigo mismo, con otros y con las cosas.",
    "Persona sin alteraciones de síntesis o intelectuales importantes, pero con impulsividad, inseguridad, labilidad y dificultades sexuales o sociales.",
    [
      { term: "Síndrome esquizofrénico", difference: "El esquizofrénico implica desorganización psíquica, alucinaciones y disociación ideoafectiva." }, { term: "Síndrome afectivo ansioso", difference: "El ansioso es un cuadro afectivo con ansiedad y manifestaciones vegetativas." }
    ],
    "Alta"
  )
];

function makeConcept(id, name, moduleId, category, type, definition, simple, example, confusion, difficulty = "Media") {
  return { id, name, moduleId, category, type, definition, simple, example, confusion, difficulty };
}

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
