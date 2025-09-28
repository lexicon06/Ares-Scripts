print("tuti_fruti.js ha sido cargado correctamente.");

// ============================================================================
// BASE DE DATOS DEL TUTI FRUTI
// ============================================================================

var TutiFrutiDB = {
    // Nombres (personas)
    nombres: {
        A: ["Ana", "Alberto", "Alejandra", "Antonio", "Andrea", "Andrés", "Amanda", "Ángel", "Alicia", "Arturo"],
        B: ["Beatriz", "Bruno", "Bárbara", "Benito", "Brenda", "Benjamín", "Blanca", "Boris", "Belén", "Bautista"],
        C: ["Carlos", "Carmen", "Cristina", "César", "Camila", "Claudio", "Carolina", "Celia", "Cristian", "Claudia"],
        D: ["Daniel", "Diana", "Diego", "Dolores", "Damián", "Débora", "David", "Dora", "Darío", "Daniela"],
        E: ["Eduardo", "Elena", "Emilio", "Esperanza", "Esteban", "Eva", "Enrique", "Elisa", "Ernesto", "Emma"],
        F: ["Francisco", "Fernanda", "Felipe", "Florencia", "Fernando", "Fabiola", "Federico", "Fátima", "Fabián", "Felicia"],
        G: ["Gabriel", "Gloria", "Guillermo", "Graciela", "Gonzalo", "Gisela", "Gustavo", "Guadalupe", "Gerardo", "Georgina"],
        H: ["Héctor", "Helena", "Hugo", "Hortensia", "Hernán", "Hilda", "Horacio", "Haydée", "Hamlet", "Herminia"],
        I: ["Ignacio", "Isabel", "Iván", "Irene", "Ismael", "Inés", "Isaac", "Ilda", "Ígor", "Iris"],
        J: ["José", "Julia", "Juan", "Juana", "Jorge", "Josefina", "Javier", "Jessica", "Julio", "Jimena"],
        K: ["Kevin", "Karen", "Kenneth", "Katia", "Klaus", "Karina", "Kai", "Kelly", "Kiko", "Kiara"],
        L: ["Luis", "Laura", "Leonardo", "Lucía", "Lorenzo", "Liliana", "Lucas", "Leticia", "Leandro", "Lorena"],
        M: ["Miguel", "María", "Manuel", "Mónica", "Martín", "Mercedes", "Mario", "Marcela", "Mauricio", "Magdalena"],
        N: ["Nicolás", "Natalia", "Néstor", "Nancy", "Nahuel", "Nora", "Nelson", "Noelia", "Norberto", "Nadia"],
        O: ["Oscar", "Olga", "Omar", "Olivia", "Octavio", "Ofelia", "Orlando", "Ornella", "Osvaldo", "Oriana"],
        P: ["Pedro", "Patricia", "Pablo", "Paola", "Patricio", "Pilar", "Paulo", "Paloma", "Primo", "Priscila"],
        Q: ["Quintero", "Quena", "Quique", "Quela", "Quirino", "Querida", "Quinto", "Quintina", "Qatar", "Quiara"],
        R: ["Ricardo", "Rosa", "Roberto", "Rocío", "Rodrigo", "Raquel", "Rafael", "Ruth", "Ramón", "Renata"],
        S: ["Santiago", "Sofía", "Sebastián", "Sandra", "Sergio", "Silvia", "Salvador", "Susana", "Simón", "Stella"],
        T: ["Tomás", "Teresa", "Teodoro", "Tamara", "Tristán", "Tatiana", "Timoteo", "Tania", "Tadeo", "Tiziana"],
        U: ["Ulises", "Úrsula", "Umberto", "Urania", "Urbano", "Ula", "Ugo", "Undina", "Unai", "Uma"],
        V: ["Víctor", "Victoria", "Vicente", "Verónica", "Valentín", "Valeria", "Vladimiro", "Viviana", "Virgilio", "Violeta"],
        W: ["Walter", "Wanda", "William", "Wendy", "Winston", "Wilma", "Wilson", "Whitney", "Wade", "Waleska"],
        X: ["Xavier", "Ximena", "Xerxes", "Xenia", "Xavi", "Xandra", "Xiomara", "Xulio", "Xoel", "Xara"],
        Y: ["Yago", "Yolanda", "Yves", "Yamila", "Yordan", "Yadira", "Yeray", "Yanet", "Yoel", "Yesica"],
        Z: ["Zacarías", "Zoila", "Zenón", "Zulema", "Zoe", "Zara", "Zacarias", "Zelda", "Zeus", "Zita"]
    },

    // Animales
    animales: {
        A: ["Águila", "Abeja", "Araña", "Ardilla", "Avestruz", "Antílope", "Armadillo", "Anaconda", "Alce", "Alpaca"],
        B: ["Ballena", "Búho", "Burro", "Babosa", "Boa", "Bisonte", "Buitre", "Babuino", "Bagre", "Barracuda"],
        C: ["Caballo", "Conejo", "Cocodrilo", "Cobra", "Ciervo", "Camello", "Canguro", "Cangrejo", "Caracol", "Cebra"],
        D: ["Delfín", "Dinosaurio", "Dálmata", "Dragón", "Dromedario", "Doberman", "Dingo", "Danta", "Dodo", "Damán"],
        E: ["Elefante", "Erizo", "Escorpión", "Estrella de mar", "Escarabajo", "Emú", "Esponja", "Equidna", "Estornino", "Eglefino"],
        F: ["Flamenco", "Foca", "Felino", "Falcón", "Ferret", "Firefly", "Faisán", "Fogonero", "Fragata", "Frailecillo"],
        G: ["Gato", "Gallina", "Gallo", "Gorila", "Gacela", "Gaviota", "Gecko", "Gusano", "Grillo", "Gibón"],
        H: ["Hipopótamo", "Hormiga", "Hurón", "Halcón", "Hamster", "Hiena", "Hámster", "Horda", "Hornero", "Hibisco"],
        I: ["Iguana", "Insecto", "Ibis", "Impala", "Inca", "Inversor", "Isópodo", "Iridiscente", "Ixia", "Indri"],
        J: ["Jirafa", "Jaguar", "Jabalí", "Jilguero", "Jinete", "Jaguarundí", "Jacana", "Jerbo", "Jurel", "Jabiru"],
        K: ["Koala", "Kiwi", "Kanguro", "Krill", "Kudu", "Kea", "Kakapo", "Kelp", "Kestrel", "Kingfish"],
        L: ["León", "Lobo", "Liebre", "Lagarto", "Libélula", "Lince", "Lombriz", "Lechuza", "Llama", "Langosta"],
        M: ["Mono", "Mariposa", "Murciélago", "Mosca", "Medusa", "Mantis", "Morsa", "Mula", "Mapache", "Mangosta"],
        N: ["Nutria", "Ñandú", "Narval", "Náyade", "Newt", "Nematodo", "Numbat", "Necora", "Nilgó", "Noctilio"],
        O: ["Oso", "Oveja", "Orangután", "Orca", "Ornitorrinco", "Ocelote", "Ostras", "Okapi", "Olingo", "Oropéndola"],
        P: ["Perro", "Pez", "Pato", "Pingüino", "Puma", "Pulpo", "Pantera", "Pavo", "Paloma", "Papagayo"],
        Q: ["Quetzal", "Quokka", "Quebrantahuesos", "Quíscalo", "Quinquina", "Quelonio", "Quagga", "Querequetè", "Quisquilla", "Quoll"],
        R: ["Ratón", "Rana", "Rinoceronte", "Reptil", "Raya", "Ruiseñor", "Reno", "Roedor", "Rottweiler", "Robin"],
        S: ["Serpiente", "Sapo", "Salmón", "Sepia", "Suricata", "Salamandra", "Sardina", "Saltamontes", "Sanguijuela", "Serval"],
        T: ["Tigre", "Tortuga", "Tiburón", "Toro", "Tucán", "Tapir", "Tarántula", "Topo", "Trucha", "Tejón"],
        U: ["Urraca", "Urogallo", "Ualabí", "Unicornio", "Unau", "Upupa", "Urial", "Urubitinga", "Ursón", "Uapití"],
        V: ["Vaca", "Víbora", "Venado", "Vencejo", "Vicuña", "Vampiro", "Verderón", "Visón", "Vizcacha", "Vulture"],
        W: ["Wombat", "Walabí", "Wapiti", "Whippet", "Wasp", "Woodpecker", "Wolf", "Whale", "Weasel", "Wildcat"],
        X: ["Xoloitzcuintle", "Xenopus", "Xiphias", "Xerus", "Xema", "Xantusia", "Xenarthra", "Xiphosura", "Xenops", "Xysticus"],
        Y: ["Yak", "Yacaré", "Yaguareté", "Yapok", "Yellowfin", "Yurumí", "Yunco", "Yal", "Yaboa", "Yabiru"],
        Z: ["Zorro", "Zebra", "Zorzal", "Zarigüeya", "Zancudo", "Zunzún", "Zapote", "Zafiro", "Zamuro", "Zigena"]
    },

    // Frutas
    frutas: {
        A: ["Aguacate", "Arándano", "Albaricoque", "Ananas", "Acerola", "Almendra", "Avellana", "Ackee", "Açaí", "Annona"],
        B: ["Banana", "Breva", "Banano", "Bergamota", "Baya", "Babaco", "Breadfruit", "Blackberry", "Bilberry", "Boysenberry"],
        C: ["Cereza", "Ciruela", "Coco", "Chirimoya", "Carambola", "Caqui", "Cidra", "Cranberry", "Curuba", "Cupuaçu"],
        D: ["Durazno", "Dátil", "Damasco", "Durian", "Dragonfruit", "Dewberry", "Date", "Donut peach", "Davidson plum", "Dadap"],
        E: ["Espinaca", "Elderberry", "Emblic", "Etrog", "Entawak", "Eucalipto", "Espino", "Escarchado", "Elderflower", "Eggfruit"],
        F: ["Fresa", "Frambuesa", "Figo", "Feijoa", "Fruta de la pasión", "Framboise", "Fig", "Finger lime", "Forest strawberry", "Fairchild"],
        G: ["Granada", "Grosella", "Guayaba", "Granadilla", "Grosellas", "Gooseberry", "Grapefruit", "Granny Smith", "Golden apple", "Goumi"],
        H: ["Higo", "Huaya", "Honeydew", "Hackberry", "Hardy kiwi", "Hala fruit", "Horned melon", "Huckleberry", "Hawthorn", "Heartnut"],
        I: ["Icaco", "Indian fig", "Ilama", "Ice apple", "Indian gooseberry", "Italian plum", "Imbe", "Indian jujube", "Ita palm", "Ivy gourd"],
        J: ["Jaca", "Jengibre", "Jobo", "Jambose", "Japanese persimmon", "Jujube", "Jabuticaba", "Jackfruit", "Japanese plum", "Jatoba"],
        K: ["Kiwi", "Kumquat", "Kaki", "Key lime", "Kiwano", "Kabos", "Kakadu plum", "Kandis", "Karonda", "Keppel fruit"],
        L: ["Limón", "Lima", "Lichi", "Lucuma", "Longan", "Lulo", "Lingonberry", "Lemon", "Lime", "Loquat"],
        M: ["Manzana", "Mango", "Melón", "Mora", "Mandarina", "Mamey", "Maracuyá", "Membrillo", "Mirtilo", "Mangostán"],
        N: ["Naranja", "Níspero", "Nectarina", "Nuez", "Nanche", "Noni", "Naval orange", "Nutmeg", "Nere", "Natal plum"],
        O: ["Oliva", "Orejón", "Orange", "Olive", "Okra", "Oil palm", "Oregon grape", "Osage orange", "Otaheite apple", "Oxheart cherry"],
        P: ["Pera", "Piña", "Plátano", "Papaya", "Palta", "Pitahaya", "Pomelo", "Physalis", "Pepino", "Passion fruit"],
        Q: ["Quinoto", "Quenepa", "Quince", "Queen Anne cherry", "Queensland nut", "Quararibea", "Quinault", "Quandong", "Queen apple", "Querina"],
        R: ["Rosa mosqueta", "Rambután", "Ruibarbo", "Ribes", "Red currant", "Raspberry", "Raisin", "Rose apple", "Rowan", "Russet apple"],
        S: ["Sandía", "Sauco", "Sapote", "Soursop", "Starfruit", "Strawberry", "Sugar apple", "Surinam cherry", "Sweet cherry", "Serviceberry"],
        T: ["Tomate", "Tamarindo", "Tuna", "Toronja", "Tangelo", "Tangerine", "Tree tomato", "Tayberry", "Thai lime", "Tomato tree"],
        U: ["Uva", "Uchuva", "Umbu", "Ulluco", "Ugli fruit", "Uniq fruit", "Ume", "Uvilla", "Usuma", "Uapaca"],
        V: ["Vainilla", "Vidrio", "Vanilla", "Victoria plum", "Velvet apple", "Voavanga", "Vernonia", "Velvet tamarind", "Vavanga", "Viburnum"],
        W: ["Watermelon", "Wampee", "White currant", "Wild cherry", "Wolfberry", "Wood apple", "White mulberry", "Winter melon", "Wax apple", "Winged bean"],
        X: ["Ximenia", "Xigua", "Xarel-lo", "Xinomavro", "Xanthium", "Xylopia", "Xerophyta", "Xoconostle", "Xiquima", "Xilófago"],
        Y: ["Yaca", "Yuzu", "Youngberry", "Yellow passion fruit", "Yali pear", "Yellow plum", "Yacon", "Yamamomo", "Yew", "Yumberry"],
        Z: ["Zapote", "Zarzamora", "Zucchini", "Ziziphus", "Zwetschge", "Zante currant", "Zereshk", "Zig zag vine", "Zinfandel grape", "Zucchini blossom"]
    },

    // Países
    paises: {
        A: ["Argentina", "Australia", "Austria", "Alemania", "Andorra", "Angola", "Afganistán", "Arabia Saudita", "Argelia", "Armenia"],
        B: ["Brasil", "Bolivia", "Bélgica", "Bangladesh", "Bahamas", "Bahréin", "Barbados", "Bielorrusia", "Belice", "Benín"],
        C: ["Colombia", "Chile", "China", "Canadá", "Cuba", "Costa Rica", "Croacia", "Chipre", "Chad", "Camerún"],
        D: ["Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España"],
        E: ["Estonia", "Etiopía", "Ecuador", "El Salvador", "Emiratos", "Eritrea", "Escocia", "Eslovaquia", "Eslovenia", "España"],
        F: ["Francia", "Filipinas", "Finlandia", "Fiyi", "Finlandia", "Francia", "Filipinas", "Fiyi", "Gabón", "Gambia"],
        G: ["Guatemala", "Grecia", "Ghana", "Guinea", "Georgia", "Gabón", "Gambia", "Guyana", "Granada", "Groenlandia"],
        H: ["Honduras", "Hungría", "Haití", "Holanda", "Honduras", "Hungría", "Haití", "Holanda", "Hong Kong", "Hawái"],
        I: ["Italia", "India", "Indonesia", "Irán", "Irak", "Irlanda", "Islandia", "Israel", "Islas Marshall", "Islas Salomón"],
        J: ["Japón", "Jamaica", "Jordania", "Japón", "Jamaica", "Jordania", "Jersey", "Jiangsu", "Jilin", "Jincheng"],
        K: ["Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Kosovo", "Kazajistán", "Kenia", "Kirguistán", "Kiribati"],
        L: ["Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Letonia", "Lesoto", "Laos", "Líbano"],
        M: ["México", "Marruecos", "Madagascar", "Malasia", "Maldivas", "Malí", "Malta", "Mauricio", "Mauritania", "Mongolia"],
        N: ["Nicaragua", "Níger", "Nigeria", "Noruega", "Nepal", "Nauru", "Nueva Zelanda", "Namibia", "Nicaragua", "Níger"],
        O: ["Omán", "Oceanía", "Ontario", "Ohio", "Oklahoma", "Oregón", "Oxford", "Oaxaca", "Odesa", "Osaka"],
        P: ["Perú", "Paraguay", "Panamá", "Portugal", "Polonia", "Pakistán", "Papúa Nueva Guinea", "Palau", "Paraguay", "Perú"],
        Q: ["Qatar", "Quebec", "Queensland", "Quito", "Querétaro", "Quintana Roo", "Quindío", "Quetzaltenango", "Qinghai", "Qom"],
        R: ["Rusia", "Reino Unido", "República Dominicana", "Rumania", "Ruanda", "República Checa", "República del Congo", "Rusia", "Reino Unido", "República Dominicana"],
        S: ["Suecia", "Suiza", "Singapur", "Sudáfrica", "Somalia", "Sudán", "Siria", "Sri Lanka", "Senegal", "Serbia"],
        T: ["Turquía", "Tailandia", "Tanzania", "Túnez", "Trinidad y Tobago", "Togo", "Timor Oriental", "Turkmenistán", "Tuvalu", "Tayikistán"],
        U: ["Uruguay", "Ucrania", "Uganda", "Uzbekistán", "Estados Unidos", "Reino Unido", "Emiratos Árabes Unidos", "Unión Soviética", "Utah", "Ucrania"],
        V: ["Venezuela", "Vietnam", "Vaticano", "Vanuatu", "Virginia", "Vermont", "Victoria", "Venecia", "Viena", "Valencia"],
        W: ["Washington", "Wisconsin", "Wyoming", "Wales", "Wuhan", "Wichita", "Winnipeg", "Wellington", "Warsaw", "Waterloo"],
        X: ["Xinjiang", "Xiamen", "Xian", "Xalapa", "Xochimilco", "Xavier", "Xativa", "Xàtiva", "Xanthe", "Xerez"],
        Y: ["Yemen", "Yugoslavia", "Yukón", "Yucatán", "Yaoundé", "Yokohama", "York", "Yalta", "Yaroslavl", "Yellowknife"],
        Z: ["Zambia", "Zimbabue", "Zaire", "Zúrich", "Zaragoza", "Zanzibar", "Zagreb", "Zacatecas", "Zadar", "Zakynthos"]
    },

    // Objetos
    objetos: {
        A: ["Avión", "Auto", "Anteojos", "Alfombra", "Almohada", "Anillo", "Armario", "Agenda", "Abanico", "Ancla"],
        B: ["Barco", "Bicicleta", "Botella", "Bolso", "Bastón", "Bandera", "Balón", "Brocha", "Brújula", "Buzón"],
        C: ["Casa", "Carro", "Computadora", "Cuaderno", "Cuchillo", "Cama", "Camisa", "Collar", "Campana", "Cepillo"],
        D: ["Dado", "Dinero", "Disco", "Diamante", "Ducha", "Dedo", "Diente", "Documento", "Disfraz", "Destornillador"],
        E: ["Espejo", "Escalera", "Estufa", "Escritorio", "Esquí", "Estrella", "Escoba", "Encendedor", "Esponja", "Envase"],
        F: ["Foco", "Flor", "Fuente", "Flauta", "Fósforo", "Fotografía", "Frasco", "Frazada", "Ferrocarril", "Florero"],
        G: ["Guitarra", "Globo", "Gorro", "Guante", "Gafas", "Grabadora", "Goma", "Grúa", "Grifo", "Gimnasio"],
        H: ["Helicóptero", "Hacha", "Horno", "Hueso", "Hilo", "Hojas", "Hamaca", "Herramienta", "Hospital", "Hotel"],
        I: ["Iglesia", "Imán", "Instrumento", "Isla", "Icono", "Invitación", "Impresora", "Inodoro", "Interruptor", "Incienso"],
        J: ["Jaula", "Jabón", "Jarra", "Juguete", "Joyero", "Jardín", "Jeringa", "Jirafa", "Jitomate", "Juego"],
        K: ["Karate", "Kayak", "Ketchup", "Kimono", "Kiosco", "Kit", "Karma", "Kebab", "Kaleidoscopio", "Kilómetro"],
        L: ["Lámpara", "Libro", "Lápiz", "Llave", "Luna", "Lavadora", "Linterna", "Lista", "Licuadora", "Lupa"],
        M: ["Mesa", "Mochila", "Martillo", "Micrófono", "Móvil", "Máquina", "Mapa", "Moneda", "Motor", "Manta"],
        N: ["Nave", "Nariz", "Número", "Nieve", "Nido", "Nuez", "Nota", "Navaja", "Neumático", "Nudo"],
        O: ["Ojo", "Oreja", "Oro", "Olla", "Oficina", "Órgano", "Oveja", "Onda", "Oportunidad", "Oasis"],
        P: ["Piano", "Pelota", "Papel", "Pluma", "Puerta", "Pared", "Paraguas", "Pantalón", "Perro", "Piedra"],
        Q: ["Queso", "Quintal", "Quiosco", "Quemador", "Química", "Quilate", "Quilla", "Quirófano", "Quetzal", "Queroseno"],
        R: ["Radio", "Reloj", "Regla", "Rosa", "Ropa", "Refrigerador", "Rueda", "Racket", "Revista", "Rayo"],
        S: ["Silla", "Sofá", "Sombrero", "Sol", "Semáforo", "Sobre", "Saxofón", "Silbato", "Soldado", "Serrucho"],
        T: ["Teléfono", "Televisión", "Taza", "Teclado", "Tambor", "Tijeras", "Tren", "Toalla", "Termómetro", "Taladro"],
        U: ["Uniforme", "Uña", "Universidad", "Ungüento", "Urna", "Ukelele", "Ubre", "Utensilio", "Usuario", "Ultrasonido"],
        V: ["Vaso", "Ventana", "Violín", "Vela", "Vestido", "Volante", "Vacuna", "Ventilador", "Vajilla", "Videojuego"],
        W: ["Wifi", "Walkman", "Whisky", "Waterpolo", "Waffle", "Windsurf", "Web", "Water", "Wrestling", "Wok"],
        X: ["Xilófono", "Xerocopia", "Xenón", "Xilografía", "Xerografía", "Xerez", "Xerus", "Xantina", "Xenofobia", "Xeroftalmia"],
        Y: ["Yate", "Yeso", "Yogurt", "Yunque", "Yodo", "Yema", "Yuca", "Yelmo", "Yantar", "Yerno"],
        Z: ["Zapato", "Zoológico", "Zapatilla", "Zorro", "Zona", "Zumo", "Zócalo", "Zinc", "Zafiro", "Zambomba"]
    }
};

// ============================================================================
// CONFIGURACIÓN DEL JUEGO
// ============================================================================

var TutiFrutiConfig = {
    CATEGORIAS_DEFAULT: ["Nombre", "Animal", "Fruta", "País", "Objeto"],
    PUNTOS_POR_RESPUESTA: 10,
    PUNTOS_BONUS_UNICA: 5,
    TIEMPO_LIMITE: 60, // segundos
    LETRAS_DIFICILES: ["K", "Q", "W", "X", "Y", "Z"],
    MIN_JUGADORES_RANKING: 2
};

// ============================================================================
// ESTADO DEL JUEGO
// ============================================================================

var TutiFrutiState = {
    sesionActiva: false,
    letraActual: null,
    categorias: TutiFrutiConfig.CATEGORIAS_DEFAULT,
    tiempoInicio: 0,
    jugadores: [],
    modoCompetitivo: false,
    ranking: []
};

// ============================================================================
// UTILIDADES
// ============================================================================

var TutiFrutiUtils = {
    /**
     * Obtiene una letra aleatoria evitando las muy difíciles
     */
    obtenerLetraAleatoria: function(incluirDificiles) {
        var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (!incluirDificiles) {
            // Remover letras difíciles por defecto
            letras = "ABCDEFGHIJLMNOPRSTUVZ";
        }
        return letras.charAt(Math.floor(Math.random() * letras.length));
    },

    /**
     * Limpia texto para comparación
     */
    limpiarTexto: function(texto) {
        return stripColors(texto).trim().toLowerCase();
    },

    /**
     * Normaliza texto para comparación (sin acentos, mayúsculas)
     */
    normalizarTexto: function(texto) {
        return texto.toLowerCase()
            .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i')
            .replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n')
            .replace(/ü/g, 'u').trim();
    },

    /**
     * Verifica si una palabra es válida para una categoría y letra
     */
    esValida: function(palabra, categoria, letra) {
        if (!palabra || palabra.length === 0) return false;
        
        var palabraNorm = this.normalizarTexto(palabra);
        var letraNorm = letra.toLowerCase();
        
        // Debe empezar con la letra correcta
        if (palabraNorm.charAt(0) !== letraNorm) return false;
        
        // Verificar si existe en la base de datos
        var categoriaNorm = this.normalizarTexto(categoria);
        var dbCategoria = null;
        
        if (categoriaNorm === 'nombre') dbCategoria = TutiFrutiDB.nombres;
        else if (categoriaNorm === 'animal') dbCategoria = TutiFrutiDB.animales;
        else if (categoriaNorm === 'fruta') dbCategoria = TutiFrutiDB.frutas;
        else if (categoriaNorm === 'pais' || categoriaNorm === 'país') dbCategoria = TutiFrutiDB.paises;
        else if (categoriaNorm === 'objeto') dbCategoria = TutiFrutiDB.objetos;
        
        if (!dbCategoria || !dbCategoria[letra.toUpperCase()]) return false;
        
        var palabrasValidas = dbCategoria[letra.toUpperCase()];
        for (var i = 0; i < palabrasValidas.length; i++) {
            if (this.normalizarTexto(palabrasValidas[i]) === palabraNorm) {
                return true;
            }
        }
        
        return false;
    },

    /**
     * Obtiene pista para una categoría y letra
     */
    obtenerPista: function(categoria, letra) {
        var categoriaNorm = this.normalizarTexto(categoria);
        var dbCategoria = null;
        
        if (categoriaNorm === 'nombre') dbCategoria = TutiFrutiDB.nombres;
        else if (categoriaNorm === 'animal') dbCategoria = TutiFrutiDB.animales;
        else if (categoriaNorm === 'fruta') dbCategoria = TutiFrutiDB.frutas;
        else if (categoriaNorm === 'pais' || categoriaNorm === 'país') dbCategoria = TutiFrutiDB.paises;
        else if (categoriaNorm === 'objeto') dbCategoria = TutiFrutiDB.objetos;
        
        if (!dbCategoria || !dbCategoria[letra.toUpperCase()]) {
            return "No hay pistas disponibles";
        }
        
        var palabras = dbCategoria[letra.toUpperCase()];
        if (palabras.length === 0) return "No hay pistas disponibles";
        
        var pista = palabras[Math.floor(Math.random() * Math.min(3, palabras.length))];
        var pistaCensurada = pista.charAt(0);
        for (var i = 1; i < pista.length; i++) {
            pistaCensurada += i === pista.length - 1 ? pista.charAt(i) : "_";
        }
        
        return pistaCensurada;
    },

    /**
     * Calcula puntos para una respuesta
     */
    calcularPuntos: function(esValida, esUnica) {
        if (!esValida) return 0;
        var puntos = TutiFrutiConfig.PUNTOS_POR_RESPUESTA;
        if (esUnica) puntos += TutiFrutiConfig.PUNTOS_BONUS_UNICA;
        return puntos;
    },

    /**
     * Formatea tiempo transcurrido
     */
    formatearTiempo: function(segundos) {
        var mins = Math.floor(segundos / 60);
        var segs = segundos % 60;
        return mins + ":" + (segs < 10 ? "0" : "") + segs;
    }
};

// ============================================================================
// MANEJO DE JUGADORES
// ============================================================================

var TutiFrutiPlayers = {
    /**
     * Inicializa jugador
     */
    inicializarJugador: function(user) {
        if (!user.tutifruti) {
            user.tutifruti = {
                jugando: false,
                respuestas: {},
                puntos: 0,
                tiempoRespuesta: 0,
                partidasJugadas: 0,
                mejorPuntuacion: 0
            };
        }
    },

    /**
     * Reinicia respuestas del jugador
     */
    reiniciarRespuestas: function(user) {
        this.inicializarJugador(user);
        user.tutifruti.respuestas = {};
        user.tutifruti.tiempoRespuesta = 0;
    },

    /**
     * Registra respuesta del jugador
     */
    registrarRespuesta: function(user, respuestas) {
        this.inicializarJugador(user);
        
        var puntosGanados = 0;
        var respuestasValidas = 0;
        var detalles = [];
        
        for (var i = 0; i < TutiFrutiState.categorias.length; i++) {
            var categoria = TutiFrutiState.categorias[i];
            var respuesta = respuestas[i] ? respuestas[i].trim() : "";
            
            if (respuesta === "") {
                detalles.push(categoria + ": (vacío) - 0 pts");
                continue;
            }
            
            var esValida = TutiFrutiUtils.esValida(respuesta, categoria, TutiFrutiState.letraActual);
            var esUnica = this.esRespuestaUnica(respuesta, categoria);
            var puntos = TutiFrutiUtils.calcularPuntos(esValida, esUnica);
            
            if (esValida) {
                user.tutifruti.respuestas[categoria] = respuesta;
                puntosGanados += puntos;
                respuestasValidas++;
                
                var bonus = esUnica ? " (+bonus única)" : "";
                detalles.push(categoria + ": " + respuesta + " - " + puntos + " pts" + bonus);
            } else {
                detalles.push(categoria + ": " + respuesta + " (inválida) - 0 pts");
            }
        }
        
        user.tutifruti.puntos += puntosGanados;
        user.tutifruti.tiempoRespuesta = this.getTiempoTranscurrido();
        
        return {
            puntosGanados: puntosGanados,
            respuestasValidas: respuestasValidas,
            detalles: detalles,
            tiempoRespuesta: user.tutifruti.tiempoRespuesta
        };
    },

    /**
     * Verifica si una respuesta es única
     */
    esRespuestaUnica: function(respuesta, categoria) {
        var respuestaNorm = TutiFrutiUtils.normalizarTexto(respuesta);
        var contador = 0;
        
        Users.local(function(u) {
            if (u.tutifruti && u.tutifruti.respuestas[categoria]) {
                var otraRespuesta = TutiFrutiUtils.normalizarTexto(u.tutifruti.respuestas[categoria]);
                if (otraRespuesta === respuestaNorm) {
                    contador++;
                }
            }
        });
        
        return contador <= 1;
    },

    /**
     * Obtiene tiempo transcurrido desde inicio
     */
    getTiempoTranscurrido: function() {
        return Math.floor((new Date().getTime() - TutiFrutiState.tiempoInicio) / 1000);
    },

    /**
     * Obtiene ranking de jugadores
     */
    obtenerRanking: function() {
        var jugadores = [];
        
        Users.local(function(u) {
            if (u.tutifruti && u.tutifruti.puntos > 0) {
                jugadores.push({
                    nombre: u.name,
                    puntos: u.tutifruti.puntos,
                    tiempo: u.tutifruti.tiempoRespuesta || 999
                });
            }
        });
        
        // Ordenar por puntos (desc) y luego por tiempo (asc)
        jugadores.sort(function(a, b) {
            if (a.puntos !== b.puntos) {
                return b.puntos - a.puntos;
            }
            return a.tiempo - b.tiempo;
        });
        
        return jugadores;
    }
};

// ============================================================================
// CONTROLADOR PRINCIPAL
// ============================================================================

var TutiFrutiGame = {
    /**
     * Inicia una nueva sesión de juego
     */
    iniciarSesion: function(user, modoCompetitivo) {
        if (TutiFrutiState.sesionActiva) {
            print(user, "(!) Ya hay una sesión activa. Escribe 'tuti stop' para detenerla.");
            return;
        }
        
        TutiFrutiState.sesionActiva = true;
        TutiFrutiState.modoCompetitivo = modoCompetitivo || false;
        TutiFrutiState.letraActual = TutiFrutiUtils.obtenerLetraAleatoria();
        TutiFrutiState.tiempoInicio = new Date().getTime();
        
        // Reiniciar todos los jugadores
        Users.local(function(u) {
            TutiFrutiPlayers.reiniciarRespuestas(u);
            u.tutifruti.jugando = true;
        });
        
        this.mostrarInicio(user);
    },

    /**
     * Detiene la sesión actual
     */
    detenerSesion: function(user) {
        if (!TutiFrutiState.sesionActiva) {
            print(user, "(!) No hay sesión activa.");
            return;
        }
        
        this.mostrarResultadosFinales();
        this.reiniciarSesion();
        print(0, "(X) Sesión de Tuti Fruti terminada por " + user.name);
    },

    /**
     * Muestra el inicio del juego
     */
    mostrarInicio: function(user) {
        print(0, "");
        print(0, "═══════════════════════════════════════");
        print(0, "        🎯 TUTI FRUTI INICIADO! 🎯");
        print(0, "═══════════════════════════════════════");
        print(0, "");
        print(0, "📝 Iniciado por: " + user.name);
        print(0, "🔤 Letra: " + TutiFrutiState.letraActual);
        print(0, "📋 Categorías: " + TutiFrutiState.categorias.join(" • "));
        print(0, "");
        print(0, "📖 INSTRUCCIONES:");
        print(0, "• Escribe las respuestas separadas por comas");
        print(0, "• Ejemplo: Ana, Águila, Aguacate, Argentina, Avión");
        print(0, "• Respuestas únicas dan puntos bonus!");
        print(0, "");
        print(0, "⚡ COMANDOS DISPONIBLES:");
        print(0, "• 'pista [categoria]' - Obtener pista");
        print(0, "• 'tiempo' - Ver tiempo transcurrido");
        print(0, "• 'ranking' - Ver puntuaciones");
        print(0, "• 'tuti stop' - Terminar juego");
        print(0, "");
        print(0, "¡Que comience el juego! ✨");
        print(0, "");
    },

    /**
     * Procesa respuestas del jugador
     */
    procesarRespuestas: function(user, texto) {
        if (!TutiFrutiState.sesionActiva || !user.tutifruti.jugando) {
            return;
        }
        
        var respuestas = texto.split(",");
        
        // Limpiar respuestas
        for (var i = 0; i < respuestas.length; i++) {
            respuestas[i] = respuestas[i].trim();
        }
        
        if (respuestas.length !== TutiFrutiState.categorias.length) {
            print(user, "(!) Debes escribir " + TutiFrutiState.categorias.length + " respuestas separadas por comas.");
            print(user, "Formato: " + TutiFrutiState.categorias.join(", "));
            return;
        }
        
        var resultado = TutiFrutiPlayers.registrarRespuesta(user, respuestas);
        this.mostrarResultadoRespuesta(user, resultado);
    },

    /**
     * Muestra resultado de respuesta individual
     */
    mostrarResultadoRespuesta: function(user, resultado) {
        print(user, "");
        print(user, "━━━ RESULTADO DE " + user.name.toUpperCase() + " ━━━");
        print(user, "⏱️  Tiempo: " + TutiFrutiUtils.formatearTiempo(resultado.tiempoRespuesta));
        print(user, "✅ Válidas: " + resultado.respuestasValidas + "/" + TutiFrutiState.categorias.length);
        print(user, "🏆 Puntos ganados: " + resultado.puntosGanados);
        print(user, "📊 Total acumulado: " + user.tutifruti.puntos);
        print(user, "");
        
        for (var i = 0; i < resultado.detalles.length; i++) {
            print(user, "• " + resultado.detalles[i]);
        }
        
        print(user, "");
        
        // Notificar al canal si es una buena puntuación
        if (resultado.puntosGanados >= 40) {
            print(0, "🔥 " + user.name + " obtuvo " + resultado.puntosGanados + " puntos! 🔥");
        }
    },

    /**
     * Muestra ranking actual
     */
    mostrarRanking: function(user) {
        var ranking = TutiFrutiPlayers.obtenerRanking();
        
        if (ranking.length === 0) {
            print(user, "(!) Aún no hay puntuaciones.");
            return;
        }
        
        print(user, "");
        print(user, "🏆 ═══ RANKING ACTUAL ═══ 🏆");
        print(user, "");
        
        for (var i = 0; i < Math.min(10, ranking.length); i++) {
            var pos = i + 1;
            var jugador = ranking[i];
            var medalla = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : "🏅";
            
            print(user, medalla + " " + pos + ". " + jugador.nombre + 
                  " - " + jugador.puntos + " pts (" + 
                  TutiFrutiUtils.formatearTiempo(jugador.tiempo) + ")");
        }
        
        print(user, "");
    },

    /**
     * Obtiene pista para categoría
     */
    obtenerPista: function(user, categoria) {
        if (!TutiFrutiState.sesionActiva) {
            print(user, "(!) No hay sesión activa.");
            return;
        }
        
        var categoriaNormalizada = TutiFrutiUtils.normalizarTexto(categoria);
        var categoriaEncontrada = null;
        
        for (var i = 0; i < TutiFrutiState.categorias.length; i++) {
            if (TutiFrutiUtils.normalizarTexto(TutiFrutiState.categorias[i]) === categoriaNormalizada) {
                categoriaEncontrada = TutiFrutiState.categorias[i];
                break;
            }
        }
        
        if (!categoriaEncontrada) {
            print(user, "(!) Categoría no válida. Usa: " + TutiFrutiState.categorias.join(", "));
            return;
        }
        
        var pista = TutiFrutiUtils.obtenerPista(categoriaEncontrada, TutiFrutiState.letraActual);
        print(user, "💡 Pista para " + categoriaEncontrada + " (" + TutiFrutiState.letraActual + "): " + pista);
    },

    /**
     * Muestra tiempo transcurrido
     */
    mostrarTiempo: function(user) {
        if (!TutiFrutiState.sesionActiva) {
            print(user, "(!) No hay sesión activa.");
            return;
        }
        
        var tiempoTranscurrido = TutiFrutiPlayers.getTiempoTranscurrido();
        print(user, "⏰ Tiempo transcurrido: " + TutiFrutiUtils.formatearTiempo(tiempoTranscurrido));
    },

    /**
     * Muestra resultados finales
     */
    mostrarResultadosFinales: function() {
        var ranking = TutiFrutiPlayers.obtenerRanking();
        
        if (ranking.length === 0) {
            print(0, "(!) No hubo participantes.");
            return;
        }
        
        print(0, "");
        print(0, "🎊 ═══════ RESULTADOS FINALES ═══════ 🎊");
        print(0, "");
        print(0, "🔤 Letra: " + TutiFrutiState.letraActual);
        print(0, "⏱️  Duración: " + TutiFrutiUtils.formatearTiempo(TutiFrutiPlayers.getTiempoTranscurrido()));
        print(0, "👥 Participantes: " + ranking.length);
        print(0, "");
        
        // Mostrar podium
        for (var i = 0; i < Math.min(5, ranking.length); i++) {
            var pos = i + 1;
            var jugador = ranking[i];
            var medalla = pos === 1 ? "🥇" : pos === 2 ? "🥈" : pos === 3 ? "🥉" : "🏅";
            
            print(0, medalla + " " + pos + ". " + jugador.nombre + " - " + 
                  jugador.puntos + " puntos (" + TutiFrutiUtils.formatearTiempo(jugador.tiempo) + ")");
        }
        
        print(0, "");
        
        // Actualizar estadísticas
        this.actualizarEstadisticas(ranking);
    },

    /**
     * Actualiza estadísticas de jugadores
     */
    actualizarEstadisticas: function(ranking) {
        Users.local(function(u) {
            if (u.tutifruti && u.tutifruti.puntos > 0) {
                u.tutifruti.partidasJugadas++;
                if (u.tutifruti.puntos > u.tutifruti.mejorPuntuacion) {
                    u.tutifruti.mejorPuntuacion = u.tutifruti.puntos;
                }
            }
        });
    },

    /**
     * Reinicia sesión
     */
    reiniciarSesion: function() {
        TutiFrutiState.sesionActiva = false;
        TutiFrutiState.letraActual = null;
        TutiFrutiState.tiempoInicio = 0;
        TutiFrutiState.modoCompetitivo = false;
        
        Users.local(function(u) {
            if (u.tutifruti) {
                u.tutifruti.jugando = false;
                u.tutifruti.respuestas = {};
                u.tutifruti.puntos = 0;
                u.tutifruti.tiempoRespuesta = 0;
            }
        });
    },

    /**
     * Muestra ayuda
     */
    mostrarAyuda: function(user) {
        print(user, "");
        print(user, "🎯 ═══ AYUDA TUTI FRUTI ═══ 🎯");
        print(user, "");
        print(user, "📝 COMANDOS:");
        print(user, "• 'tuti' - Iniciar juego normal");
        print(user, "• 'tuti competitivo' - Iniciar modo competitivo");
        print(user, "• 'tuti stop' - Terminar juego actual");
        print(user, "• 'pista [categoria]' - Obtener pista");
        print(user, "• 'tiempo' - Ver tiempo transcurrido");
        print(user, "• 'ranking' - Ver puntuaciones");
        print(user, "• 'stats' - Ver tus estadísticas");
        print(user, "");
        print(user, "🎮 CÓMO JUGAR:");
        print(user, "1. Alguien inicia con 'tuti'");
        print(user, "2. Se asigna una letra aleatoria");
        print(user, "3. Escribes palabras separadas por comas");
        print(user, "4. Ganas puntos por respuestas válidas");
        print(user, "5. Respuestas únicas dan puntos bonus");
        print(user, "");
        print(user, "💡 CONSEJOS:");
        print(user, "• Usa la base de datos incluida");
        print(user, "• Las respuestas deben empezar con la letra");
        print(user, "• Palabras únicas dan +5 puntos bonus");
        print(user, "• Piensa rápido para mejores tiempos");
        print(user, "");
    },

    /**
     * Muestra estadísticas del usuario
     */
    mostrarEstadisticas: function(user) {
        TutiFrutiPlayers.inicializarJugador(user);
        
        print(user, "");
        print(user, "📊 ═══ TUS ESTADÍSTICAS ═══ 📊");
        print(user, "");
        print(user, "🎮 Partidas jugadas: " + user.tutifruti.partidasJugadas);
        print(user, "🏆 Mejor puntuación: " + user.tutifruti.mejorPuntuacion);
        print(user, "📈 Puntos actuales: " + user.tutifruti.puntos);
        print(user, "");
        
        if (user.tutifruti.partidasJugadas > 0) {
            var promedio = Math.round(user.tutifruti.mejorPuntuacion / user.tutifruti.partidasJugadas * 100) / 100;
            print(user, "📊 Promedio estimado: " + promedio + " puntos");
        }
        
        print(user, "");
    }
};

// ============================================================================
// EVENTOS PRINCIPALES
// ============================================================================

/**
 * Inicialización al cargar
 */
function onLoad() {
    Users.local(function(user) {
        TutiFrutiPlayers.inicializarJugador(user);
    });
    print("🎯 Tuti Fruti cargado con base de datos completa!");
}

/**
 * Usuario se une al canal
 */
function onJoin(user) {
    TutiFrutiPlayers.inicializarJugador(user);
    if (TutiFrutiState.sesionActiva) {
        user.tutifruti.jugando = true;
        print(user, "🎯 Te has unido a la sesión de Tuti Fruti!");
        print(user, "🔤 Letra actual: " + TutiFrutiState.letraActual);
        print(user, "📋 Categorías: " + TutiFrutiState.categorias.join(", "));
    }
}

/**
 * Procesa texto del usuario
 */
function onTextBefore(user, text) {
    var textoLimpio = TutiFrutiUtils.limpiarTexto(text);
    
    // Comandos principales
    if (textoLimpio === "tuti" || textoLimpio === "tuti fruti") {
        TutiFrutiGame.iniciarSesion(user, false);
    } else if (textoLimpio === "tuti competitivo") {
        TutiFrutiGame.iniciarSesion(user, true);
    } else if (textoLimpio === "tuti stop" || textoLimpio === "terminar") {
        TutiFrutiGame.detenerSesion(user);
    } else if (textoLimpio === "ranking") {
        TutiFrutiGame.mostrarRanking(user);
    } else if (textoLimpio === "tiempo") {
        TutiFrutiGame.mostrarTiempo(user);
    } else if (textoLimpio === "stats" || textoLimpio === "estadisticas") {
        TutiFrutiGame.mostrarEstadisticas(user);
    } else if (textoLimpio === "ayuda tuti" || textoLimpio === "tuti ayuda") {
        TutiFrutiGame.mostrarAyuda(user);
    } else if (textoLimpio.indexOf("pista ") === 0) {
        var categoria = textoLimpio.substring(6);
        TutiFrutiGame.obtenerPista(user, categoria);
    } 
    // Procesar respuestas (debe contener comas y estar en sesión activa)
    else if (TutiFrutiState.sesionActiva && user.tutifruti && user.tutifruti.jugando && 
             textoLimpio.indexOf(",") > -1) {
        TutiFrutiGame.procesarRespuestas(user, textoLimpio);
    }
    
    return text;
}

/**
 * Comando de ayuda
 */
function onHelp(user) {
    print(user, "🎯 Tuti Fruti Commands:");
    print(user, "• 'tuti' - Start normal game");
    print(user, "• 'tuti competitivo' - Start competitive mode");  
    print(user, "• 'ayuda tuti' - Full help guide");
    print(user, "• 'stats' - Your statistics");
}

// Inicialización
print("🎯 Tuti Fruti mejorado cargado correctamente!");
