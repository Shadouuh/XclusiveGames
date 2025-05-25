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
);

-- inserts de ejemplo para usuarios
INSERT INTO login (email, password, nick) VALUES
('usuario1@example.com', 'pass123', 'UserOne'),
('admin@example.com', 'adminPass', 'AdminBoss');

INSERT INTO users (id_login, name, bio, age, birthday) VALUES
(1, 'Usuario Uno Ejemplo', 'Bio del primer usuario.', 25, '1999-05-15'),
(2, 'Administrador Principal', 'Bio del administrador.', 30, '1994-01-20');

-- seccion de juegos (unicamente para prueba del carrito)
CREATE TABLE games(
    id_game INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- inserts de ejemplo para juegos
INSERT INTO games (name, price, stock) VALUES
('Aventura epica I', 59.99, 100),
('Estrategia Total II', 39.95, 50),
('Puzzle Misterioso', 19.50, 75),
('Carreras Veloces GT', 49.99, 30);

-- Sseccion del carrito de compras
-- este carrito es temporal, los items se mueven a transacciones al comprar.
CREATE TABLE cart (
    id_cart INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_game INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_game) REFERENCES games(id_game),
    UNIQUE(id_user, id_game) -- (un usuario solo puede tener una entrada por juego en el carrito (se actualiza la cantidad))
);

-- inserts de ejemplo para el carrito
INSERT INTO cart (id_user, id_game, quantity) VALUES
(1, 1, 1), -- usuario 1 añade 1 'Aventura epica I'
(1, 3, 2); -- usuario 1 añade 2 'Puzzle Misterioso'

-- seccion de transacciones (compras)
CREATE TABLE transactions (
    id_transaction INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- tabla para los detalles de cada transaccion (que juegos se compraron en cada transaccion)
-- esto es crucial para el "comprobante"
CREATE TABLE transaction_details (
    id_transaction_detail INT PRIMARY KEY AUTO_INCREMENT,
    id_transaction INT NOT NULL,
    id_game INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_transaction) REFERENCES transactions(id_transaction), -- si se borra la transaccion, se borran sus detalles
    FOREIGN KEY (id_game) REFERENCES games(id_game) 
);

-- inserts de ejemplo para transacciones y detalles de transaccion
INSERT INTO transactions (id_user, total_amount) VALUES
(1, 98.99);

-- se registran los detalles de esa transaccion (obteniendo el id_transaction recien creado)
SET @last_transaction_id = LAST_INSERT_ID(); -- MySQL specific, o manejar programáticamente

INSERT INTO transaction_details (id_transaction, id_game, quantity, price_at_purchase) VALUES
(@last_transaction_id, 1, 1, 59.99), -- 1 'Aventura epica I'
(@last_transaction_id, 3, 2, 19.50); -- 2 'Puzzle Misterioso'

-- Ejemplo de otra transacción para el mismo usuario, comprando "2 iguales y otro distinto"
-- Usuario 1 (id_user = 1) compra:
-- 2 'Estrategia Total II' (precio 39.95 cada uno)
-- 1 'Carreras Veloces GT' (precio 49.99)
-- Total: (2 * 39.95) + 49.99 = 79.90 + 49.99 = 129.89

INSERT INTO transactions (id_user, total_amount) VALUES
(1, 129.89);

SET @last_transaction_id_2 = LAST_INSERT_ID();

INSERT INTO transaction_details (id_transaction, id_game, quantity, price_at_purchase) VALUES
(@last_transaction_id_2, 2, 2, 39.95), -- 2 'Estrategia Total II'
(@last_transaction_id_2, 4, 1, 49.99); -- 1 'Carreras Veloces GT'


create table pc(
    id_pc int PRIMARY KEY AUTO_INCREMENT,
    processor varchar(255),
    ram int,
    storage int,
    graphics_card varchar(255),
    operating_system varchar(255),
    price int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,  
)

create table image_user(
    id int 
)

create table discount(
    id_discount int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255),
    description text,
    discount_percentage int,
    start_date date,
    end_date date,
    status boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
)

create table games(
    id_games int PRIMARY KEY AUTOINCREMENT,
    id_review int,    
    name varchar(255),
    price int,
    plataform varchar(255),
    genre varchar(255),
    description text,
    release_date date,  
    stock int,
    status boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
)

create table review(
    id_review
)