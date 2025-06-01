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
('Terraria', 20, 'Juego de aventura y construcción', '2011-05-16', 100, TRUE),
('The Witcher 3', 40, 'Un RPG de mundo abierto con una historia inmersiva', '2015-05-19', 75, TRUE),
('FIFA 23', 60, 'Simulador de fútbol con equipos actualizados', '2022-09-30', 120, TRUE),
('Minecraft', 30, 'Juego de construcción y aventura en un mundo abierto', '2011-11-18', 200, TRUE),
('Call of Duty: Modern Warfare', 70, 'Shooter en primera persona con modo multijugador', '2019-10-25', 85, TRUE),
('Civilization VI', 50, 'Juego de estrategia por turnos', '2016-10-21', 60, TRUE),
('Red Dead Redemption 2', 60, 'Épica aventura en el salvaje oeste', '2018-10-26', 150, TRUE),
('Resident Evil 4 Remake', 70, 'Remake del clásico juego de terror', '2023-03-24', 100, TRUE),
('Stardew Valley', 15, 'Simulador de granja y vida rural', '2016-02-26', 200, TRUE),
('God of War Ragnarök', 70, 'Aventura épica basada en la mitología nórdica', '2022-11-09', 90, TRUE),
('Portal 2', 20, 'Juego de puzles en primera persona', '2011-04-19', 80, TRUE),
('Elden Ring', 60, 'RPG de acción en un mundo abierto', '2022-02-25', 120, TRUE),
('Cities: Skylines', 30, 'Simulador de construcción de ciudades', '2015-03-10', 70, TRUE),
('Doom Eternal', 40, 'Shooter frenético en primera persona', '2020-03-20', 95, TRUE),
('Animal Crossing: New Horizons', 60, 'Simulador de vida en una isla', '2020-03-20', 180, TRUE),
('Hades', 25, 'Roguelike de acción mitológico', '2020-09-17', 110, TRUE);

-- Insertar desarrolladoras y relacionarlas con juegos
INSERT INTO games_developers(id_game, name) VALUES
(1, 'Re-Logic'),                  -- Terraria
(2, 'CD Projekt Red'),            -- The Witcher 3
(3, 'EA Sports'),                 -- FIFA 23
(4, 'Mojang Studios'),            -- Minecraft
(5, 'Infinity Ward'),             -- Call of Duty: Modern Warfare
(6, 'Firaxis Games'),             -- Civilization VI
(7, 'Rockstar Games'),            -- Red Dead Redemption 2
(8, 'Capcom'),                    -- Resident Evil 4 Remake
(9, 'ConcernedApe'),              -- Stardew Valley
(10, 'Santa Monica Studio'),      -- God of War Ragnarök
(11, 'Valve'),                    -- Portal 2
(12, 'FromSoftware'),             -- Elden Ring
(13, 'Colossal Order'),           -- Cities: Skylines
(14, 'id Software'),              -- Doom Eternal
(15, 'Nintendo'),                 -- Animal Crossing: New Horizons
(16, 'Supergiant Games');         -- Hades

-- Insertar URLs de imágenes para los juegos
INSERT INTO games_imgs(id_game, url) VALUES
(1, 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg'),                -- Terraria
(2, 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg'),                -- The Witcher 3
(3, 'https://image.api.playstation.com/vulcan/ap/rnd/202207/0515/BOwvC0Q9dfw4g8eJXnD6YYj8.png'), -- FIFA 23
(4, 'https://cdn.akamai.steamstatic.com/steam/apps/1938650/header.jpg'),               -- Minecraft
(5, 'https://cdn.akamai.steamstatic.com/steam/apps/1938090/header.jpg'),               -- Call of Duty: Modern Warfare
(6, 'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg'),                -- Civilization VI
(7, 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg'),               -- Red Dead Redemption 2
(8, 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg'),               -- Resident Evil 4 Remake
(9, 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg'),                -- Stardew Valley
(10, 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png'), -- God of War Ragnarök
(11, 'https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg'),                  -- Portal 2
(12, 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg'),              -- Elden Ring
(13, 'https://cdn.akamai.steamstatic.com/steam/apps/255710/header.jpg'),               -- Cities: Skylines
(14, 'https://cdn.akamai.steamstatic.com/steam/apps/782330/header.jpg'),               -- Doom Eternal
(15, 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a'), -- Animal Crossing: New Horizons
(16, 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg');              -- Hades

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
    id_game INT,
    id_login INT,
    review TEXT,
    score float,
    FOREIGN KEY (id_game) REFERENCES games(id_game)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (id_login) REFERENCES login(id_login)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE requeriments( 
    id_requeriment INT PRIMARY KEY AUTO_INCREMENT, 
    id_game INT NOT NULL, tipo ENUM('minimos', 'recomendados') NOT NULL, 
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
) VALUES (
    2, 'minimos', 'Intel Core 2 Duo E5200', '4 GB RAM', 'GeForce 9800GTX+ (1GB)', '9 GB disponibles'
);

-- Insertar requerimientos recomendados
INSERT INTO requeriments (
    id_game, tipo, procesador, memoria, graficos, almacenamiento
) VALUES (
    2, 'recomendados', 'Intel Core i5', '8 GB RAM', 'GeForce GTX 560', '9 GB disponibles'
);
