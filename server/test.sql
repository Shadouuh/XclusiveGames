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
('Civilization VI', 50, 'Juego de estrategia por turnos', '2016-10-21', 60, TRUE);

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
(6, 6); -- Civilization VI en Steam Deck

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
(6, 5); -- Civilization VI es Estrategia

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

CREATE TABLE review(
    id_review INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE requeriments( 
    id_requeriment INT PRIMARY KEY AUTO_INCREMENT, 
    id_game INT NOT NULL, tipo ENUM('minimos', 'recomendados') NOT NULL, 
    procesador VARCHAR(255), 
    memoria VARCHAR(255),
    graficos VARCHAR(255), 
    almacenamiento VARCHAR(255), 
    FOREIGN KEY (id_game) REFERENCES games(id_game) 
 );