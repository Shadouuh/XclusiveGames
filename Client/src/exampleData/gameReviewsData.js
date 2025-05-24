const gameReviews = [
    {
      "gameId": 1,
      "reviews": [
        {
          "id": 1,
          "rating": 5,
          "comment": "The Witcher 3 es una obra maestra. El mundo abierto, las misiones secundarias y la narrativa son increíbles. Geralt es un protagonista inolvidable y las decisiones morales te hacen reflexionar."
        },
        {
          "id": 2,
          "rating": 4,
          "comment": "Gráficos impresionantes y una historia cautivadora. Las batallas contra monstruos son desafiantes y satisfactorias. Solo le quito una estrella por algunos bugs menores."
        },
        {
          "id": 3,
          "rating": 5,
          "comment": "Las expansiones Blood and Wine y Hearts of Stone son tan buenas como el juego principal. La cantidad de contenido es abrumadora."
        },
        {
          "id": 4,
          "rating": 4,
          "comment": "El combate podría ser más fluido, pero la historia y los personajes compensan cualquier defecto. Ciri es un personaje fantástico."
        }
      ]
    },
    {
      "gameId": 2,
      "reviews": [
        {
          "id": 5,
          "rating": 5,
          "comment": "Red Dead Redemption 2 ofrece el mejor mundo abierto jamás creado. La atención al detalle es asombrosa, desde los paisajes hasta las interacciones con NPCs."
        },
        {
          "id": 6,
          "rating": 5,
          "comment": "La historia de Arthur Morgan es conmovedora y el final me dejó sin palabras. Rockstar ha creado una experiencia cinematográfica."
        },
        {
          "id": 7,
          "rating": 4,
          "comment": "El realismo a veces afecta la jugabilidad, haciendo que algunas acciones sean lentas. Pero la inmersión que logra es incomparable."
        },
        {
          "id": 8,
          "rating": 5,
          "comment": "Los personajes secundarios están muy bien desarrollados. Cada campamento tiene su propia dinámica y las conversaciones son naturales."
        }
      ]
    },
    {
      "gameId": 3,
      "reviews": [
        {
          "id": 9,
          "rating": 3,
          "comment": "Cyberpunk 2077 tiene una ambientación increíble y misiones interesantes, pero los bugs y problemas técnicos arruinan la experiencia."
        },
        {
          "id": 10,
          "rating": 4,
          "comment": "Después de los parches, el juego ha mejorado considerablemente. La historia principal es excelente y los personajes son memorables."
        },
        {
          "id": 11,
          "rating": 2,
          "comment": "Night City se ve impresionante pero se siente vacía. Las mecánicas de RPG son superficiales comparadas con lo prometido."
        },
        {
          "id": 12,
          "rating": 3,
          "comment": "Judy y Panam son personajes fantásticos, pero el juego necesita más contenido y mejor IA para los NPCs."
        }
      ]
    },
    {
      "gameId": 4,
      "reviews": [
        {
          "id": 13,
          "rating": 5,
          "comment": "Elden Ring combina perfectamente la exploración de mundo abierto con el desafío característico de FromSoftware. El diseño de niveles es magistral."
        },
        {
          "id": 14,
          "rating": 5,
          "comment": "Los jefes son memorables y desafiantes. Cada descubrimiento se siente gratificante y la libertad para explorar es refrescante."
        },
        {
          "id": 15,
          "rating": 4,
          "comment": "La dificultad puede ser frustrante para nuevos jugadores, pero superar los desafíos ofrece una satisfacción única."
        },
        {
          "id": 16,
          "rating": 5,
          "comment": "El worldbuilding a través del entorno y los objetos es fascinante. George R.R. Martin y Miyazaki crearon un mundo que invita a ser descubierto."
        }
      ]
    },
    {
      "gameId": 5,
      "reviews": [
        {
          "id": 17,
          "rating": 4,
          "comment": "God of War reinventa la saga con éxito. La relación entre Kratos y Atreus es el corazón del juego, y el combate es satisfactorio."
        },
        {
          "id": 18,
          "rating": 5,
          "comment": "La cámara sin cortes añade inmersión a la experiencia. La mitología nórdica está muy bien integrada en la historia."
        },
        {
          "id": 19,
          "rating": 5,
          "comment": "El Leviathan Axe es una de las mejores armas en videojuegos. Lanzarla y recuperarla nunca deja de ser satisfactorio."
        },
        {
          "id": 20,
          "rating": 4,
          "comment": "Los puzzles son interesantes pero a veces repetitivos. Los reinos son hermosos y variados visualmente."
        }
      ]
    },
    {
      "gameId": 6,
      "reviews": [
        {
          "id": 21,
          "rating": 3,
          "comment": "Hogwarts Legacy cumple el sueño de explorar el mundo mágico, pero la historia principal es algo predecible."
        },
        {
          "id": 22,
          "rating": 4,
          "comment": "El sistema de combate es divertido y la recreación de Hogwarts es espectacular. Cada sala común tiene su encanto único."
        },
        {
          "id": 23,
          "rating": 3,
          "comment": "Las misiones secundarias son repetitivas y el mundo abierto se siente algo vacío fuera de las áreas principales."
        },
        {
          "id": 24,
          "rating": 4,
          "comment": "Volar en escoba y montar hipogrifos es una delicia. La personalización del personaje y la Sala de los Menesteres son grandes aciertos."
        }
      ]
    },
    {
      "gameId": 7,
      "reviews": [
        {
          "id": 25,
          "rating": 4,
          "comment": "Resident Evil 4 Remake actualiza un clásico respetando su esencia. Los gráficos son impresionantes y las mejoras en el gameplay lo hacen más accesible."
        },
        {
          "id": 26,
          "rating": 5,
          "comment": "El pueblo inicial sigue siendo tan terrorífico como siempre, pero con un nivel de detalle asombroso. Las nuevas mecánicas de sigilo son bienvenidas."
        },
        {
          "id": 27,
          "rating": 4,
          "comment": "Leon S. Kennedy nunca ha lucido mejor. El sistema de inventario sigue siendo un mini-juego de Tetris adictivo."
        },
        {
          "id": 28,
          "rating": 5,
          "comment": "El remake añade profundidad a personajes secundarios como Luis Serra. El balance entre acción y terror es perfecto."
        }
      ]
    },
    {
      "gameId": 8,
      "reviews": [
        {
          "id": 29,
          "rating": 2,
          "comment": "Starfield tiene momentos brillantes pero se siente incompleto. La exploración espacial es repetitiva y los planetas carecen de personalidad."
        },
        {
          "id": 30,
          "rating": 3,
          "comment": "Las mecánicas de RPG son sólidas pero no innovadoras. La construcción de naves es divertida pero limitada."
        },
        {
          "id": 31,
          "rating": 4,
          "comment": "La historia principal tiene giros interesantes y algunas misiones secundarias son memorables. New Atlantis es una ciudad impresionante."
        },
        {
          "id": 32,
          "rating": 2,
          "comment": "Demasiados tiempos de carga y planetas generados proceduralmente que se sienten todos iguales. Bethesda prometió demasiado."
        }
      ]
    },
    {
      "gameId": 9,
      "reviews": [
        {
          "id": 33,
          "rating": 5,
          "comment": "Baldur's Gate 3 establece un nuevo estándar para los RPG. La libertad de elección es incomparable y las consecuencias se sienten significativas."
        },
        {
          "id": 34,
          "rating": 5,
          "comment": "El combate por turnos es profundo y estratégico. Los compañeros son complejos y tienen sus propias motivaciones e historias."
        },
        {
          "id": 35,
          "rating": 4,
          "comment": "El Acto 3 se siente algo apresurado comparado con los anteriores, pero la calidad general es excepcional."
        },
        {
          "id": 36,
          "rating": 5,
          "comment": "La implementación de las reglas de D&D 5e es brillante y accesible incluso para quienes no conocen el juego de mesa."
        }
      ]
    },
    {
      "gameId": 10,
      "reviews": [
        {
          "id": 37,
          "rating": 3,
          "comment": "Diablo IV ofrece un excelente combate y progresión de personaje, pero la historia no está a la altura de entregas anteriores."
        },
        {
          "id": 38,
          "rating": 4,
          "comment": "Sanctuary nunca ha lucido mejor. Los dungeons son variados y el diseño artístico es consistentemente oscuro y atmosférico."
        },
        {
          "id": 39,
          "rating": 2,
          "comment": "El endgame se vuelve repetitivo rápidamente y las temporadas no añaden suficiente contenido interesante."
        },
        {
          "id": 40,
          "rating": 3,
          "comment": "Lilith es una villana carismática pero subutilizada. El sistema de loot necesita mejoras para ser más gratificante."
        }
      ]
    },
    {
      "gameId": 11,
      "reviews": [
        {
          "id": 41,
          "rating": 4,
          "comment": "Counter-Strike 2 mejora la fórmula clásica con gráficos actualizados y mejor física. Las nuevas granadas de humo dinámicas añaden una capa estratégica adicional."
        },
        {
          "id": 42,
          "rating": 5,
          "comment": "El nuevo motor Source 2 hace que el juego se sienta más fluido y responsivo. Los mapas clásicos han sido actualizados con cuidado."
        },
        {
          "id": 43,
          "rating": 3,
          "comment": "Algunos cambios en las mecánicas afectan negativamente a jugadores veteranos. El matchmaking sigue teniendo problemas con los cheaters."
        },
        {
          "id": 44,
          "rating": 4,
          "comment": "Sigue siendo el shooter táctico definitivo. La economía del juego y el balance de armas es casi perfecto."
        }
      ]
    },
    {
      "gameId": 12,
      "reviews": [
        {
          "id": 45,
          "rating": 2,
          "comment": "FIFA 23 apenas trae novedades respecto a entregas anteriores. El modo carrera sigue siendo ignorado y Ultimate Team está diseñado para fomentar microtransacciones."
        },
        {
          "id": 46,
          "rating": 3,
          "comment": "La inclusión del fútbol femenino es un paso adelante, pero necesita más desarrollo. La jugabilidad es sólida pero casi idéntica a FIFA 22."
        },
        {
          "id": 47,
          "rating": 2,
          "comment": "Los servidores tienen problemas constantes y el juego favorece demasiado a quienes gastan dinero real en sobres."
        },
        {
          "id": 48,
          "rating": 3,
          "comment": "La tecnología HyperMotion2 añade algunas animaciones nuevas, pero el impacto en la jugabilidad es mínimo."
        }
      ]
    },
    {
      "gameId": 13,
      "reviews": [
        {
          "id": 49,
          "rating": 5,
          "comment": "Minecraft sigue siendo relevante después de tantos años por su libertad creativa ilimitada. Las actualizaciones constantes mantienen el juego fresco."
        },
        {
          "id": 50,
          "rating": 5,
          "comment": "La comunidad de modders expande el juego infinitamente. Desde mods técnicos hasta completas conversiones, las posibilidades son infinitas."
        },
        {
          "id": 51,
          "rating": 4,
          "comment": "El modo supervivencia ofrece un desafío equilibrado y el modo creativo permite dar rienda suelta a la imaginación."
        },
        {
          "id": 52,
          "rating": 5,
          "comment": "La simplicidad visual esconde una complejidad mecánica asombrosa. Los redstone contraptions pueden llegar a ser increíblemente complejos."
        }
      ]
    },
    {
      "gameId": 14,
      "reviews": [
        {
          "id": 53,
          "rating": 4,
          "comment": "GTA V tiene una de las mejores campañas de la historia y GTA Online sigue recibiendo contenido años después."
        },
        {
          "id": 54,
          "rating": 5,
          "comment": "Los tres protagonistas ofrecen perspectivas únicas de Los Santos. La sátira social es mordaz y a menudo hilarante."
        },
        {
          "id": 55,
          "rating": 3,
          "comment": "GTA Online está demasiado centrado en microtransacciones y el grinding es excesivo para jugadores nuevos."
        },
        {
          "id": 56,
          "rating": 4,
          "comment": "Los detalles del mundo abierto siguen impresionando incluso años después del lanzamiento. La radio y las emisoras son excelentes."
        }
      ]
    },
    {
      "gameId": 15,
      "reviews": [
        {
          "id": 57,
          "rating": 5,
          "comment": "The Last of Us Part I es una obra maestra narrativa. La relación entre Joel y Ellie es el corazón de una historia emocionalmente devastadora."
        },
        {
          "id": 58,
          "rating": 5,
          "comment": "El remake mejora los gráficos y la jugabilidad manteniendo intacta la esencia original. Las expresiones faciales transmiten emociones complejas."
        },
        {
          "id": 59,
          "rating": 4,
          "comment": "La IA de los enemigos podría ser más sofisticada, pero la tensión en los encuentros sigue siendo efectiva."
        },
        {
          "id": 60,
          "rating": 5,
          "comment": "El DLC Left Behind añade profundidad al personaje de Ellie y está perfectamente integrado en esta versión."
        }
      ]
    },
    {
      "gameId": 16,
      "reviews": [
        {
          "id": 61,
          "rating": 4,
          "comment": "Forza Horizon 5 ofrece la mejor experiencia de conducción arcade con un mundo abierto espectacular."
        },
        {
          "id": 62,
          "rating": 5,
          "comment": "México está recreado con un nivel de detalle impresionante y la variedad de vehículos es enorme. Los cambios climáticos son espectaculares."
        },
        {
          "id": 63,
          "rating": 4,
          "comment": "Las carreras son divertidas pero el progreso puede sentirse algo repetitivo después de muchas horas."
        },
        {
          "id": 64,
          "rating": 5,
          "comment": "La personalización de vehículos es profunda y satisfactoria. El modo foto es uno de los mejores en cualquier juego."
        }
      ]
    },
    {
      "gameId": 17,
      "reviews": [
        {
          "id": 65,
          "rating": 5,
          "comment": "Hollow Knight es una joya indie con un diseño artístico precioso y una jugabilidad precisa."
        },
        {
          "id": 66,
          "rating": 5,
          "comment": "La exploración es gratificante y los jefes son desafiantes pero justos. La banda sonora complementa perfectamente la atmósfera melancólica."
        },
        {
          "id": 67,
          "rating": 4,
          "comment": "Algunas áreas como Deepnest pueden resultar frustrantes por su diseño laberíntico, pero la satisfacción de dominarlas es inmensa."
        },
        {
          "id": 68,
          "rating": 5,
          "comment": "La historia contada a través del entorno y pequeños detalles es fascinante. El DLC Godmaster añade un desafío extremo para los más hábiles."
        }
      ]
    },
    {
      "gameId": 18,
      "reviews": [
        {
          "id": 69,
          "rating": 5,
          "comment": "Stardew Valley es el juego perfecto para relajarse. Cultivar, relacionarte con los habitantes del pueblo y explorar las minas crea un ciclo de juego adictivo pero tranquilo."
        },
        {
          "id": 70,
          "rating": 5,
          "comment": "Las actualizaciones constantes añaden contenido sustancial. El multijugador permite compartir la granja con amigos."
        },
        {
          "id": 71,
          "rating": 4,
          "comment": "Los primeros días de cada temporada pueden sentirse algo repetitivos, pero la libertad para jugar a tu ritmo compensa este pequeño defecto."
        },
        {
          "id": 72,
          "rating": 5,
          "comment": "Los personajes del pueblo tienen historias sorprendentemente profundas. Cada uno de los posibles romances tiene su encanto único."
        }
      ]
    },
    {
      "gameId": 19,
      "reviews": [
        {
          "id": 73,
          "rating": 5,
          "comment": "Hades redefine el género roguelike con una narrativa que se integra perfectamente con la mecánica de morir y volver a intentarlo."
        },
        {
          "id": 74,
          "rating": 5,
          "comment": "El combate es fluido, los personajes carismáticos y el arte estilizado es precioso. Cada arma se siente completamente diferente."
        },
        {
          "id": 75,
          "rating": 4,
          "comment": "Después de muchas horas, algunas conversaciones comienzan a repetirse, pero la variedad de builds mantiene fresca la jugabilidad."
        },
        {
          "id": 76,
          "rating": 5,
          "comment": "La banda sonora es excepcional, especialmente durante las peleas contra jefes. El sistema de bendiciones de los dioses permite experimentar con diferentes estilos de juego."
        }
      ]
    },
    {
      "gameId": 20,
      "reviews": [
        {
          "id": 77,
          "rating": 4,
          "comment": "Disco Elysium ofrece una experiencia RPG única centrada en el diálogo y la introspección."
        },
        {
          "id": 78,
          "rating": 5,
          "comment": "El sistema de habilidades que representan diferentes facetas de tu personalidad es brillante, y la escritura es de las mejores en videojuegos."
        },
        {
          "id": 79,
          "rating": 3,
          "comment": "La falta de combate tradicional puede decepcionar a algunos jugadores, pero las batallas dialécticas son igual de intensas."
        },
        {
          "id": 80,
          "rating": 5,
          "comment": "Revachol es una ciudad fascinante llena de historia y conflictos políticos. Las voces añadidas en The Final Cut son excelentes."
        }
      ]
    }
  ];

export default gameReviews;

export const getReviewsByGameId = (gameId) => {
  const gameReview = gameReviews.find(review => review.gameId === gameId);
  return gameReview ? gameReview.reviews : [];
};

export const getAverageRating = (gameId) => {
  const reviews = getReviewsByGameId(gameId);
  if (reviews.length === 0) return 0;
  
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};