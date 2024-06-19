const picocolors = require("picocolors");
const express = require('express');
const mongo = require('mongodb')


const app = express();

const port = process.env.PORT ?? 5000;

// Connection URL
const url = 'mongodb://db-mongo:27017';
const client = new mongo.MongoClient(url);
const dbName = 'dbHeroe';
const colection = "heroes";
var db;
var collection;

async function saveAllData(){
    await client.connect();
    db = client.db(dbName);
    collection = db.collection(colection);
    await collection.deleteMany({$or:[{"casa":"DC"},{"casa":"Marvel"}]})
    //await collection.insertOne({"nombre": nombre,"nombrePJ": nombrePJ,"añoAparición": añoAparición,"casa": casa,"biografía": biografía,"equipamiento": equipamiento,"NumImages": NumImages})
    await collection.insertMany([
        {nombre: "Superman", nombrePJ: "Clark Kent / Kal-El", añoAparición: 1938, casa: "DC", biografía: "Nacido en el planeta Krypton como Kal-El, fue enviado a la Tierra antes de la destrucción de su planeta. Criado por una familia de granjeros en Kansas, Clark Kent desarrolló habilidades sobrehumanas y decidió usar sus poderes para proteger a la humanidad como Superman.", equipamiento: "Traje con el emblema de la 'S', capa roja.", NumImages: 1, imgs: ["Superman.png"]},
        {nombre: "Aquaman", nombrePJ: "Arthur Curry", añoAparición: 1941, casa: "DC", biografía: "Arthur Curry es el rey de Atlantis, con la habilidad de comunicarse telepáticamente con la vida marina y capacidades sobrehumanas. Protege tanto el reino submarino como la superficie.", equipamiento: "Tridente de Atlántida.",NumImages: 1, imgs: ["Aquaman.png"]},
        {nombre: "Batman", nombrePJ: "Bruce Wayne", añoAparición: 1939, casa: "DC", biografía: "Después de presenciar el asesinato de sus padres cuando era niño, Bruce Wayne juró vengarse de los criminales. Con una mente brillante y recursos financieros ilimitados, se entrenó física y mentalmente para convertirse en el vigilante enmascarado conocido como Batman.", equipamiento: "Traje de murciélago, Batimóvil, cinturón de utilidades.",NumImages: 1, imgs: ["Batman.png"]},
        {nombre: "Wonder Woman", nombrePJ: "Diana Prince", añoAparición: 1941, casa: "DC", biografía: "Princesa de las Amazonas de la isla de Themyscira, Diana fue enviada al mundo de los hombres como embajadora de paz. Posee habilidades sobrehumanas y armas mágicas que utiliza para combatir el mal como Wonder Woman.", equipamiento: "Lazo de la verdad, brazaletes indestructibles, tiara.",NumImages: 1, imgs: ["Wonder Woman.png"]},
        {nombre: "Peacemaker", nombrePJ: "Christopher Smith", añoAparición: 1966, casa: "DC", biografía: "Christopher Smith, también conocido como Peacemaker, es un diplomático que ama la paz tanto que está dispuesto a usar la fuerza extrema para lograrla. Smith es un pacifista al borde de la locura, que utiliza su entrenamiento militar y un arsenal avanzado para eliminar amenazas a la paz.", equipamiento: "Armadura, armas de fuego avanzadas, casco con tecnología especial.", NumImages: 1, imgs: ["Peacemaker.png"]},
        {nombre: "Martian Manhunter", nombrePJ: "J'onn J'onzz", añoAparición: 1955, casa: "DC", biografía: "J'onn J'onzz es un marciano verde con poderes telepáticos, de cambio de forma y más. Llega a la Tierra y se convierte en un defensor de la humanidad como Martian Manhunter.", equipamiento: "Ninguno específico.", NumImages: 1, imgs: ["Martian Manhunter.png"]},
        {nombre: "Flash", nombrePJ: "Barry Allen", añoAparición: 1956, casa: "DC", biografía: "Barry Allen, un científico forense, obtuvo supervelocidad tras un accidente en su laboratorio. Utiliza su capacidad de moverse a velocidades increíbles para combatir el crimen como Flash.", equipamiento: "Traje rojo de alta tecnología.", NumImages: 1, imgs: ["Flash.png"]},
        {nombre: "Green Lantern", nombrePJ: "Hal Jordan", añoAparición: 1959, casa: "DC", biografía: "Hal Jordan, un piloto de pruebas, fue elegido por un anillo de poder alienígena para convertirse en miembro del Green Lantern Corps, una fuerza policial intergaláctica encargada de mantener el orden en el universo.", equipamiento: "Anillo de poder que crea constructos de luz sólida.", NumImages: 1, imgs: ["Green-Lantern.png"]},
        {nombre: "Cyborg", nombrePJ: "Victor Stone", añoAparición: 1980, casa: "DC", biografía: "Victor Stone fue gravemente herido en un accidente, y su padre científico reemplazó gran parte de su cuerpo con tecnología avanzada, convirtiéndolo en Cyborg, un héroe mitad humano, mitad máquina.", equipamiento: "Tecnología cibernética avanzada.", NumImages: 1, imgs: ["Cyborg.png"]},
        {nombre: "The Flash (Wally West)", nombrePJ: "Wally West", añoAparición: 1959, casa: "DC", biografía: "Wally West, sobrino de Barry Allen, también obtiene supervelocidad tras un accidente similar. Se convierte en Kid Flash y eventualmente asume el manto de The Flash para proteger Central City.", equipamiento: "Traje de alta tecnología.", NumImages: 1, imgs: ["Flash.png"]},
        {nombre: "Shazam", nombrePJ: "Billy Batson", añoAparición: 1939, casa: "DC", biografía: "Billy Batson, un joven huérfano, puede transformarse en el superhéroe Shazam al decir la palabra mágica 'Shazam'. Gana los poderes de seis figuras mitológicas para luchar contra el mal.", equipamiento: "Poderes mágicos.", NumImages: 1, imgs: ["shazam.png"]},
        {nombre: "Doctor Fate", nombrePJ: "Kent Nelson", añoAparición: 1940, casa: "DC", biografía: "Kent Nelson es un arqueólogo que encuentra el casco de Nabu, convirtiéndose en Doctor Fate, un poderoso hechicero y defensor contra las fuerzas del mal.", equipamiento: "Casco de Nabu, artefactos mágicos.", NumImages: 1, imgs: ["Dr fate.png"]},
        {nombre: "Hawkgirl", nombrePJ: "Shiera Hall", añoAparición: 1940, casa: "DC", biografía: "Shiera Hall es una reencarnación de una guerrera egipcia con habilidades de vuelo gracias a sus alas y su maza de Nth metal. Lucha contra el crimen como Hawkgirl.", equipamiento: "Ala y maza de Nth metal.", NumImages: 0, imgs: ["Hawkgirl.png"]},
        {nombre: "Supergirl", nombrePJ: "Kara Zor-El", añoAparición: 1959, casa: "DC", biografía: "Kara Zor-El es la prima de Superman, enviada a la Tierra desde Krypton. Comparte muchos de los poderes de Superman y lucha contra el mal como Supergirl.", equipamiento: "Traje de Supergirl.", NumImages: 0, imgs: ["Supergirl.png"]},
        {nombre: "Blue Beetle", nombreP: "Jaime Reyes", añoAparición: 2006, casa: "DC", biografía: "Jaime Reyes, un adolescente, encuentra un escarabajo alienígena que le otorga una armadura avanzada y diversas habilidades. Se convierte en el superhéroe Blue Beetle.", equipamiento: "Armadura alienígena.", NumImages: 0, imgs: ["Blue Beetle.png"]},
        {nombre: "Batgirl", nombrePJ: "Barbara Gordon", añoAparición: 1967, casa: "DC", biografía: "Barbara Gordon, hija del comisionado Gordon, lucha contra el crimen en Gotham City como Batgirl. Es experta en artes marciales y utiliza su intelecto y tecnología avanzada.", equipamiento: "Traje de Batgirl, dispositivos tecnológicos.", NumImages: 0, imgs: ["Batgirl.png"]},
        {nombre: "Black Canary", nombrePJ: "Dinah Lance", añoAparición: 1947, casa: "DC", biografía: "Dinah Lance es una experta en artes marciales y posee un grito sónico devastador conocido como el 'Canary Cry'. Lucha contra el crimen como Black Canary.", equipamiento: "Habilidades de combate, grito sónico.", NumImages: 0, imgs: ["Black Canary.png"]},
        {nombre: "Zatanna", nombrePJ: "Zatanna Zatara", añoAparición: 1964, casa: "DC", biografía: "Zatanna Zatara es una maga talentosa que usa sus habilidades para luchar contra el mal. Es una de las hechiceras más poderosas del universo DC.", equipamiento: "Magia.", NumImages: 0, imgs: ["Zatanna.png"]},
        {nombre: "Nightwing", nombrePJ: "Dick Grayson", añoAparición: 1984, casa: "DC", biografía: "Dick Grayson, el primer Robin, se convierte en el héroe independiente Nightwing. Es un experto en acrobacias y combate, y protege la ciudad de Blüdhaven.", equipamiento: "Traje de Nightwing, bastones eskrima.", NumImages: 0, imgs: ["Nightwing.png"]},
        {nombre: "Red Tornado", nombrePJ: "John Smith", añoAparición: 1968, casa: "DC", biografía: "Red Tornado es un androide con la capacidad de crear ciclones y manipular el aire. Lucha contra el mal mientras busca comprender su propia humanidad.", equipamiento: "Poderes de viento.", NumImages: 1, imgs: ["Red Tornado.png"]},
        {nombre: "Mr. Freeze", nombrePJ: "Victor Fries", añoAparición: 1959, casa: "DC", biografía: "Victor Fries, también conocido como Mr. Freeze, es un científico especializado en criogenia. Tras un accidente en su laboratorio, debe usar un traje refrigerante para sobrevivir. Motivado por el deseo de encontrar una cura para su esposa enferma, Nora, Mr. Freeze utiliza tecnología avanzada de congelación en su vida criminal.", equipamiento: "Traje refrigerante, pistola de congelación, tecnología criogénica.", NumImages: 1, imgs: ["Mr-Freeze.png"]},
        {nombre: "Penguin", nombrePJ: "Oswald Cobblepot", añoAparición: 1941, casa: "DC", biografía: "Oswald Cobblepot, conocido como Penguin, es un criminal astuto y el dueño del club nocturno Iceberg Lounge en Gotham City. Aunque carece de superpoderes, es un maestro estratega y usa su riqueza e influencias para cometer crímenes y luchar contra Batman.", equipamiento: "Paraguas multifuncionales, armas de fuego, recursos financieros.", NumImages: 1, imgs: ["Penguin.png"]},
        {nombre: "Joker", nombrePJ: "Desconocido", añoAparición: 1940, casa: "DC", biografía: "El Joker es el archienemigo de Batman, conocido por su apariencia de payaso y su mente criminal retorcida. Su verdadero nombre y origen varían en diferentes historias, pero es consistentemente retratado como un genio del crimen con una obsesión por el caos y la anarquía.", equipamiento: "Gases venenosos, armas diversas, artefactos explosivos.", NumImages: 1, imgs: ["Joker.png"]},
        {nombre: "Harley Quinn", nombrePJ: "Harleen Quinzel", añoAparición: 1992, casa: "DC", biografía: "Harleen Quinzel, una ex psiquiatra del Asilo Arkham, se enamoró del Joker y se transformó en su compañera criminal, Harley Quinn. Conocida por su personalidad excéntrica y habilidades acrobáticas, Harley se ha convertido en una villana destacada en Gotham City.", equipamiento: "Mazo gigante, pistolas, dispositivos explosivos.", NumImages: 1, imgs: ["Harley-Queen.png"]},
    ], {ordered: false});

    await collection.insertMany([
        {nombre: "Spider-Man", nombrePJ: "Peter Parker", añoAparición: 1962, casa: "Marvel", biografía: "Peter Parker, un adolescente común y corriente, obtuvo habilidades arácnidas después de ser mordido por una araña radiactiva. Decidió usar sus nuevos poderes para el bien tras la muerte de su tío Ben, adoptando la identidad de Spider-Man.", equipamiento: "Traje arácnido, lanzatelarañas.", NumImages: 3, imgs: ["Spiderman 1.png", "Spiderman 2.png"]},
        {nombre: "Iron Man", nombrePJ: "Tony Stark", añoAparición: 1963, casa: "Marvel", biografía: "Tony Stark es un genio inventor y empresario multimillonario que, tras ser herido gravemente, crea una armadura de alta tecnología para salvar su vida y proteger al mundo como Iron Man.", equipamiento: "Armadura de Iron Man con tecnología avanzada.", NumImages: 1, imgs: ["Iron-Man.png"]},
        {nombre: "Captain America", nombrePJ: "Steve Rogers", añoAparición: 1941, casa: "Marvel", biografía: "Steve Rogers, un joven débil pero valiente, fue transformado en un supersoldado mediante un suero experimental durante la Segunda Guerra Mundial. Con su escudo indestructible, lucha por la justicia como Captain America.", equipamiento: "Escudo de vibranium.", NumImages: 1, imgs: ["captain america.png"]},
        {nombre: "Thor", nombrePJ: "Thor Odinson", añoAparición: 1962, casa: "Marvel", biografía: "Dios del trueno de la mitología nórdica y príncipe de Asgard, Thor fue enviado a la Tierra para aprender la humildad y proteger a la humanidad, armado con su poderoso martillo Mjolnir.", equipamiento: "Martillo Mjolnir.", NumImages: 1, imgs: ["Thor.png"]},
        {nombre: "Black Panther", nombrePJ: "T'Challa", añoAparición: 1966, casa: "Marvel", biografía: "T'Challa es el rey de Wakanda, una nación africana avanzada tecnológicamente. Como Black Panther, utiliza su traje de vibranium y habilidades mejoradas para proteger a su pueblo y al mundo.", equipamiento: "Traje de vibranium, garras retráctiles.", NumImages: 1, imgs: ["black panther.png"]},
        {nombre: "Doctor Strange", nombrePJ: "Stephen Strange", añoAparición: 1963, casa: "Marvel", biografía: "Stephen Strange, un neurocirujano de renombre, se convierte en el Hechicero Supremo después de un accidente que daña sus manos. Utiliza magia y artes místicas para proteger el universo.", equipamiento: "Capa de levitación, Ojo de Agamotto.", NumImages: 1, imgs: ["Dr Strange.png"]},
        {nombre: "Hulk", nombrePJ: "Bruce Banner", añoAparición: 1962, casa: "Marvel", biografía: "El Dr. Bruce Banner, un científico brillante, se transforma en el increíble Hulk, un ser de fuerza descomunal, cada vez que se enfurece debido a la exposición a radiación gamma.", equipamiento: "Su propia fuerza y resistencia sobrehumanas.", NumImages: 1, imgs: ["Hulk.png"]},
        {nombre: "Wolverine", nombrePJ: "Logan / James Howlett", añoAparición: 1974, casa: "Marvel", biografía: "Logan, también conocido como Wolverine, es un mutante con un factor de curación, sentidos agudizados y garras retráctiles de adamantium. Es miembro de los X-Men y un guerrero feroz.", equipamiento: "Garras de adamantium.", NumImages: 2, imgs: ["Wolverine 1.png", "Wolverine 2.png"]},
        {nombre: "Scarlet Witch", nombrePJ: "Wanda Maximoff", añoAparición: 1964, casa: "Marvel", biografía: "Wanda Maximoff, también conocida como Scarlet Witch, posee habilidades mágicas y de manipulación de la realidad. Es miembro de los Avengers y una de las más poderosas heroínas del universo Marvel.", equipamiento: "Poderes .", NumImages: 1, imgs: ["Scarlet Witch.png"]},
        {nombre: "Hawkeye", nombrePJ: "Clint Barton", añoAparición: 1964, casa: "Marvel", biografía: "Clint Barton, conocido como Hawkeye, es un arquero maestro con una puntería increíble. Es miembro de los Avengers y utiliza su arco y flechas especializadas para combatir el mal.", equipamiento: "Arco y flechas especializadas.", NumImages: 1, imgs: ["Hawkeye.png"]},
        {nombre: "Black Widow", nombrePJ: "Natasha Romanoff", añoAparición: 1964, casa: "Marvel", biografía: "Natasha Romanoff, una ex espía soviética, se convierte en una agente de S.H.I.E.L.D. y miembro de los Avengers. Es experta en artes marciales, sigilo y espionaje.", equipamiento: "Armas de alta tecnología, habilidades de combate.", NumImages: 1, imgs: ["Black Widow.png"]},
        {nombre: "Daredevil", nombrePJ: "Matt Murdock", añoAparición: 1964, casa: "Marvel", biografía: "Matt Murdock, un abogado ciego, utiliza sus sentidos agudizados y habilidades acrobáticas para luchar contra el crimen en Hell's Kitchen como Daredevil.", equipamiento: "Bastón de combate.", NumImages: 1, imgs: ["Daredevil.png"]},
        {nombre: "Ant-Man", nombrePJ: "Scott Lang", añoAparición: 1979, casa: "Marvel", biografía: "Scott Lang, un ladrón reformado, toma el manto de Ant-Man al usar un traje que le permite reducir su tamaño mientras aumenta su fuerza. Es miembro de los Avengers.", equipamiento: "Traje de Ant-Man, partículas Pym.", NumImages: 1, imgs: ["Ant-Man.png"]},
        {nombre: "Vision", nombrePJ: "Vision", añoAparición: 1968, casa: "Marvel", biografía: "Vision es un androide sintético creado por Ultron y dotado de emociones humanas. Es miembro de los Avengers y tiene habilidades como la densidad controlada y el rayo de la gema de la mente.", equipamiento: "Gema de la mente.", NumImages: 1, imgs: ["vision.png"]},
        {nombre: "Star-Lord", nombrePJ: "Peter Quill", añoAparición: 1976, casa: "Marvel", biografía: "Peter Quill, un aventurero espacial, se convierte en el líder de los Guardianes de la Galaxia. Es conocido como Star-Lord y usa tecnología avanzada para proteger el universo.", equipamiento: "Pistolas elementales, casco de Star-Lord.", NumImages: 0, imgs: ["Star-Lord.png"]},
        {nombre: "Falcon", nombrePJ: "Sam Wilson", añoAparición: 1969, casa: "Marvel", biografía: "Sam Wilson es un ex paracaidista del ejército que se convierte en el superhéroe Falcon. Utiliza un traje con alas mecánicas para volar y luchar junto a los Avengers.", equipamiento: "Traje de vuelo con alas mecánicas.", NumImages: 1, imgs: ["Falcon.png"]},
        {nombre: "Punisher", nombrePJ: "Frank Castle", añoAparición: 1974, casa: "Marvel", biografía: "Frank Castle, un ex marine, se convierte en el vigilante conocido como Punisher después de que su familia es asesinada por la mafia. Utiliza sus habilidades militares y un vasto arsenal para luchar contra el crimen, operando fuera de los límites de la ley.", equipamiento: "Armas de fuego, explosivos, equipo táctico.", NumImages: 1, imgs: ["Punisher.png"]},
        {nombre: "Deadpool", nombrePJ: "Wade Wilson", añoAparición: 1991, casa: "Marvel", biografía: "Wade Wilson, conocido como Deadpool, es un mercenario con un factor de curación acelerado que le otorga una casi inmortalidad. Conocido por su humor irreverente, tendencia a romper la cuarta pared y habilidades de combate, Deadpool lucha por dinero o por causas que le interesan.", equipamiento: "Katana, pistolas, equipo táctico, dispositivo de teletransportación.", NumImages: 1, imgs: ["Deadpool.png"]},
        {nombre: "She-Hulk", nombrePJ: "Jennifer Walters", añoAparición: 1980, casa: "Marvel", biografía: "Jennifer Walters, prima de Bruce Banner, obtiene poderes similares a los de Hulk tras una transfusión de sangre. Es una abogada y heroína conocida como She-Hulk.", equipamiento: "Su fuerza sobrehumana.",NumImages: 1, imgs: ["She Hulk.png"]},
        {nombre: "Storm", nombrePJ: "Ororo Munroe", añoAparición: 1975, casa: "Marvel", biografía: "Ororo Munroe, conocida como Storm, puede controlar el clima. Es una mutante poderosa y miembro destacado de los X-Men.", equipamiento: "Poderes de manipulación del clima.",NumImages: 1, imgs: ["Storm.png"]},
        {nombre: "Annihilus", nombrePJ: "Annihilus", añoAparición: 1968, casa: "Marvel", biografía: "Annihilus es el señor de la Zona Negativa, un universo alternativo. Es un conquistador con un intelecto superior y una ambición insaciable por destruir toda la vida para garantizar su propia supervivencia eterna.", equipamiento: "Control de la Vara de Control Cósmico, tecnología avanzada.", NumImages: 1, imgs: ["Annihilus.png"]},
        {nombre: "Dr. Doom", nombrePJ: "Victor Von Doom", añoAparición: 1962, casa: "Marvel", biografía: "Victor Von Doom es el dictador de Latveria y uno de los más grandes enemigos de los Cuatro Fantásticos. Es un genio científico y un hechicero poderoso, utilizando su armadura avanzada y habilidades mágicas para intentar conquistar el mundo.", equipamiento: "Armadura avanzada, habilidades mágicas, tecnología científica.", NumImages: 1, imgs: ["Dr-Doom.png"]},
        {nombre: "Green Goblin", nombrePJ: "Norman Osborn", añoAparición: 1964, casa: "Marvel", biografía: "Norman Osborn, el industrial millonario, se convierte en el Green Goblin tras experimentar con una fórmula de su propia invención. Es uno de los enemigos más peligrosos de Spider-Man, utilizando su inteligencia, tecnología avanzada y locura para causar estragos.", equipamiento: "Planeador, bombas calabaza, fórmula de fuerza mejorada.", NumImages: 1, imgs: ["Green-Goblin.png"]},
        {nombre: "Juggernaut", nombrePJ: "Cain Marko", añoAparición: 1965, casa: "Marvel", biografía: "Cain Marko, hermanastro de Charles Xavier, se convierte en el Juggernaut después de encontrar la Gema de Cyttorak, que le otorga una fuerza y resistencia sobrehumanas. Es una fuerza imparable, literalmente, y uno de los enemigos más formidables de los X-Men.", equipamiento: "Gema de Cyttorak, casco protector.", NumImages: 1, imgs: ["Juggernaut.png"]},
        {nombre: "Loki", nombrePJ: "Loki Laufeyson", añoAparición: 1962, casa: "Marvel", biografía: "Loki, el dios de las mentiras y las travesuras, es el hermano adoptivo de Thor. Utiliza sus habilidades mágicas y su intelecto para sembrar el caos y lograr sus objetivos, a menudo enfrentándose a los Avengers.", equipamiento: "Magia, cetro de Chitauri, habilidades de engaño.", NumImages: 1, imgs: ["Loki.png"]},
        {nombre: "Magneto", nombrePJ: "Max Eisenhardt / Erik Lehnsherr", añoAparición: 1963, casa: "Marvel", biografía: "Magneto, nacido como Max Eisenhardt, es un mutante con el poder de controlar el magnetismo. Es uno de los mayores enemigos de los X-Men, luchando por la supremacía mutante y a menudo actuando como un villano complejo con motivos de protección y venganza.", equipamiento: "Control del magnetismo, casco que bloquea telepatía.", NumImages: 1, imgs: ["Magneto.png"]}
    ], {ordered: false});

    await client.close();
    console.log(picocolors.green("Datos bases guardados"))
}

module.exports = {saveAllData};