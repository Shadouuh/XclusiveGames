-- Sección de Usuarios
CREATE TABLE login(
    id_login INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nick VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    id_login INT UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    age INT,
    birthday DATE,
    FOREIGN KEY (id_login) REFERENCES login(id_login)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- inserts de ejemplo para usuarios
INSERT INTO login (email, password, nick) VALUES
('usuario1@example.com', 'pass123', 'UserOne'),
('admin@example.com', 'adminPass', 'AdminBoss');

INSERT INTO users (id_login, name, bio, age, birthday) VALUES
(1, 'Usuario Uno Ejemplo', 'Bio del primer usuario.', 25, '1999-05-15'),
(2, 'Administrador Principal', 'Bio del administrador.', 30, '1994-01-20');

-- Tablas básicas primero
CREATE TABLE platforms(
    id_platform INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL
);

CREATE TABLE genres(
    id_genre INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL
);

-- Crear tabla games sin las FKs problemáticas primero
CREATE TABLE games(
    id_game INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    price INT,
    description TEXT,
    release_date DATE,  
    stock INT,
    status BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Tablas de relación muchos-a-muchos
CREATE TABLE games_platforms(
    id_games_plat INT AUTO_INCREMENT PRIMARY KEY,
    id_game INT,
    id_platform INT,
    FOREIGN KEY (id_platform) REFERENCES platforms(id_platform)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (id_game) REFERENCES games(id_game)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE games_genres(
    id_games_genres INT AUTO_INCREMENT PRIMARY KEY,
    id_game INT,
    id_genre INT,
    FOREIGN KEY (id_game) REFERENCES games(id_game)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (id_genre) REFERENCES genres(id_genre)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Crear tabla de relación entre juegos y desarrolladoras
CREATE TABLE games_developers(
    id_dev INT AUTO_INCREMENT PRIMARY KEY,
    id_game INT,
    name VARCHAR(100),
    FOREIGN KEY (id_game) REFERENCES games(id_game)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE games_imgs(
    id_img INT PRIMARY KEY AUTO_INCREMENT,
    id_game INT,
    url VARCHAR(255),
    FOREIGN KEY (id_game) REFERENCES games(id_game)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Insertar géneros (todos juntos)
INSERT INTO genres(name)
VALUES('Terror'), ('Aventura'), ('RPG'), ('Acción'), ('Estrategia'), ('Deportes'), ('Simulación');

-- Insertar plataformas (todas juntas)
INSERT INTO platforms(name)
VALUES('Nintendo'), ('Xbox'), ('PlayStation'), ('PC'), ('Mobile'), ('Steam Deck');

-- Insertar juegos
INSERT INTO games(name, price, description, release_date, stock, status)
VALUES
('Terraria', 20000, 'Juego de aventura y construcción', '2011-05-16', 100, TRUE),
('The Witcher 3', 40000, 'Un RPG de mundo abierto con una historia inmersiva', '2015-05-19', 75, TRUE),
('FIFA 23', 60000, 'Simulador de fútbol con equipos actualizados', '2022-09-30', 120, TRUE),
('Minecraft', 30000, 'Juego de construcción y aventura en un mundo abierto', '2011-11-18', 200, TRUE),
('Call of Duty: Modern Warfare', 70000, 'Shooter en primera persona con modo multijugador', '2019-10-25', 85, TRUE),
('Civilization VI', 50000, 'Juego de estrategia por turnos', '2016-10-21', 60, TRUE),
('Red Dead Redemption 2', 60000, 'Épica aventura en el salvaje oeste', '2018-10-26', 150, TRUE),
('Resident Evil 4 Remake', 70000, 'Remake del clásico juego de terror', '2023-03-24', 100, TRUE),
('Stardew Valley', 15000, 'Simulador de granja y vida rural', '2016-02-26', 200, TRUE),
('God of War Ragnarök', 70000, 'Aventura épica basada en la mitología nórdica', '2022-11-09', 90, TRUE),
('Portal 2', 20000, 'Juego de puzles en primera persona', '2011-04-19', 80, TRUE),
('Elden Ring', 60000, 'RPG de acción en un mundo abierto', '2022-02-25', 120, TRUE),
('Cities: Skylines', 30000, 'Simulador de construcción de ciudades', '2015-03-10', 70, TRUE),
('Doom Eternal', 40000, 'Shooter frenético en primera persona', '2020-03-20', 95, TRUE),
('Animal Crossing: New Horizons', 60000, 'Simulador de vida en una isla', '2020-03-20', 180, TRUE),
('Hades', 25000, 'Roguelike de acción mitológico', '2020-09-17', 110, TRUE);

-- Insertar desarrolladoras y relacionarlas con juegos
INSERT INTO games_developers(id_game, name) VALUES
(1, 'Re-Logic'),
(2, 'CD Projekt Red'),
(3, 'EA Sports'),
(4, 'Mojang Studios'),
(5, 'Infinity Ward'),
(6, 'Firaxis Games'),
(7, 'Rockstar Games'),
(8, 'Capcom'),
(9, 'ConcernedApe'),
(10, 'Santa Monica Studio'),
(11, 'Valve'),
(12, 'FromSoftware'),
(13, 'Colossal Order'),
(14, 'id Software'),
(15, 'Nintendo'),
(16, 'Supergiant Games');

-- Insertar URLs de imágenes para los juegos
INSERT INTO games_imgs(id_game, url) VALUES
(1, 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg'),
(2, 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg'),
(3, 'https://image.api.playstation.com/vulcan/ap/rnd/202207/0515/BOwvC0Q9dfw4g8eJXnD6YYj8.png'),
(4, 'https://cdn.akamai.steamstatic.com/steam/apps/1938650/header.jpg'),
(5, 'https://cdn.akamai.steamstatic.com/steam/apps/1938090/header.jpg'),
(6, 'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg'),
(7, 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg'),
(8, 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg'),
(9, 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg'),
(10, 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png'),
(11, 'https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg'),
(12, 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg'),
(13, 'https://cdn.akamai.steamstatic.com/steam/apps/255710/header.jpg'),
(14, 'https://cdn.akamai.steamstatic.com/steam/apps/782330/header.jpg'),
(15, 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a'),
(16, 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg');

-- Relacionar juegos con plataformas
INSERT INTO games_platforms(id_game, id_platform)
VALUES
(1, 1), -- Terraria en Nintendo
(2, 2), -- The Witcher 3 en Xbox
(2, 3), -- The Witcher 3 en PlayStation
(2, 4), -- The Witcher 3 en PC
(3, 2), -- FIFA 23 en Xbox
(3, 3), -- FIFA 23 en PlayStation
(4, 1), -- Minecraft en Nintendo
(4, 2), -- Minecraft en Xbox
(4, 3), -- Minecraft en PlayStation
(4, 4), -- Minecraft en PC
(4, 5), -- Minecraft en Mobile
(5, 2), -- Call of Duty en Xbox
(5, 3), -- Call of Duty en PlayStation
(5, 4), -- Call of Duty en PC
(6, 4), -- Civilization VI en PC
(6, 1), -- Civilization VI en Nintendo
(6, 6), -- Civilization VI en Steam Deck
(7, 2), -- Red Dead Redemption 2 en Xbox
(7, 3), -- Red Dead Redemption 2 en PlayStation
(7, 4), -- Red Dead Redemption 2 en PC
(8, 2), -- Resident Evil 4 en Xbox
(8, 3), -- Resident Evil 4 en PlayStation
(8, 4), -- Resident Evil 4 en PC
(9, 1), -- Stardew Valley en Nintendo
(9, 2), -- Stardew Valley en Xbox
(9, 3), -- Stardew Valley en PlayStation
(9, 4), -- Stardew Valley en PC
(9, 5), -- Stardew Valley en Mobile
(10, 2), -- God of War en Xbox
(10, 3), -- God of War en PlayStation
(10, 4), -- God of War en PC
(11, 1), -- Portal 2 en Nintendo
(11, 2), -- Portal 2 en Xbox
(11, 3), -- Portal 2 en PlayStation
(11, 4), -- Portal 2 en PC
(12, 4), -- Elden Ring en PC
(12, 1), -- Elden Ring en Nintendo
(12, 6), -- Elden Ring en Steam Deck
(13, 4), -- Cities: Skylines en PC
(13, 1), -- Cities: Skylines en Nintendo
(13, 6), -- Cities: Skylines en Steam Deck
(14, 2), -- Doom Eternal en Xbox
(14, 3), -- Doom Eternal en PlayStation
(14, 4), -- Doom Eternal en PC
(15, 4), -- Animal Crossing en PC
(15, 1), -- Animal Crossing en Nintendo
(15, 5), -- Animal Crossing en Mobile
(16, 2), -- Hades en Xbox
(16, 3); -- Hades en PlayStation

-- Relacionar juegos con géneros
INSERT INTO games_genres(id_game, id_genre)
VALUES
(1, 2), -- Terraria es Aventura
(2, 3), -- The Witcher 3 es RPG
(2, 4), -- The Witcher 3 es Acción
(3, 6), -- FIFA 23 es Deportes
(3, 7), -- FIFA 23 es Simulación
(4, 2), -- Minecraft es Aventura
(4, 7), -- Minecraft es Simulación
(5, 4), -- Call of Duty es Acción
(6, 5), -- Civilization VI es Estrategia
(7, 2), -- Red Dead Redemption 2 es Aventura
(7, 4), -- Red Dead Redemption 2 es Acción
(8, 1), -- Resident Evil 4 es Terror
(8, 4), -- Resident Evil 4 es Acción
(9, 7), -- Stardew Valley es Simulación
(10, 2), -- God of War es Aventura
(10, 4), -- God of War es Acción
(11, 2), -- Portal 2 es Aventura
(12, 3), -- Elden Ring es RPG
(12, 4), -- Elden Ring es Acción
(13, 7), -- Cities: Skylines es Simulación
(13, 5), -- Cities: Skylines es Estrategia
(14, 4), -- Doom Eternal es Acción
(15, 7), -- Animal Crossing es Simulación
(16, 4), -- Hades es Acción
(16, 3); -- Hades es RPG

-- Tablas adicionales
CREATE TABLE pc(
    id_pc INT PRIMARY KEY AUTO_INCREMENT,
    processor VARCHAR(255),
    ram INT,
    storage INT,
    graphics_card VARCHAR(255),
    operating_system VARCHAR(255),
    price INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE image_user(
    id INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE discount(
    id_discount INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    discount_percentage INT,
    start_date DATE,
    end_date DATE,
    status BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Sección del carrito de compras
CREATE TABLE cart (
    id_cart INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_game INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_game) REFERENCES games(id_game)
    ON UPDATE CASCADE,
    UNIQUE(id_user, id_game)
);

-- Sección de transacciones (compras)
CREATE TABLE transactions (
    id_transaction INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
    ON UPDATE CASCADE
);

CREATE TABLE transaction_details (
    id_transaction_detail INT PRIMARY KEY AUTO_INCREMENT,
    id_transaction INT NOT NULL,
    id_game INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_transaction) REFERENCES transactions(id_transaction) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (id_game) REFERENCES games(id_game)
    ON UPDATE CASCADE
);

CREATE TABLE reviews(
    id_review INT PRIMARY KEY AUTO_INCREMENT,
    id_game INT NOT NULL,
    id_login INT NOT NULL,
    review TEXT NOT NULL,
    score float NOT NULL,
    FOREIGN KEY (id_game) REFERENCES games(id_game)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (id_login) REFERENCES login(id_login)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Agregar reseñas de ejemplo para los juegos
INSERT INTO reviews(id_game, id_login, review, score) VALUES
(1, 1, 'Un juego increíble con infinitas posibilidades de construcción y exploración. Me encanta la libertad que ofrece.', 4.5),
(2, 2, 'Una de las mejores historias que he experimentado en un videojuego. Los personajes son memorables y el mundo es inmenso.', 5.0),
(3, 1, 'Buen simulador de fútbol, aunque no trae muchas novedades respecto a versiones anteriores.', 3.5),
(4, 2, 'Un clásico que nunca pasa de moda. La creatividad no tiene límites en este juego.', 4.8),
(5, 1, 'Gráficos impresionantes y buen multijugador, pero la campaña es demasiado corta.', 4.0),
(6, 2, 'Adictivo y desafiante. Cada partida es diferente y la estrategia es fundamental.', 4.7),
(7, 1, 'Una obra maestra en todos los sentidos. La atención al detalle es impresionante.', 5.0),
(8, 2, 'Excelente remake que mantiene la esencia del original pero con gráficos y jugabilidad modernos.', 4.9),
(9, 1, 'Relajante y adictivo. Perfecto para desconectar y disfrutar de la vida virtual en el campo.', 4.6),
(10, 2, 'Una secuela a la altura. Combates épicos y una historia emotiva que no decepciona.', 4.8);

CREATE TABLE requeriments( 
    id_requeriment INT PRIMARY KEY AUTO_INCREMENT, 
    id_game INT NOT NULL, 
    tipo ENUM('minimos', 'recomendados') NOT NULL, 
    procesador VARCHAR(255), 
    memoria VARCHAR(255),
    graficos VARCHAR(255), 
    almacenamiento VARCHAR(255), 
    FOREIGN KEY (id_game) REFERENCES games(id_game)
    ON DELETE CASCADE
    ON UPDATE CASCADE
 );

 -- ejemplo de insercion
 -- Insertar requerimientos mínimos
INSERT INTO requeriments (
    id_game, tipo, procesador, memoria, graficos, almacenamiento
) VALUES 
(2, 'minimos', 'Intel Core 2 Duo E5200', '4 GB RAM', 'GeForce 9800GTX+ (1GB)', '9 GB disponibles'),
(2, 'recomendados', 'Intel Core i5', '8 GB RAM', 'GeForce GTX 560', '9 GB disponibles');
