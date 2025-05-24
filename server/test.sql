create table login(
    id_login int PRIMARY KEY AUTO_INCREMENT,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    nick varchar(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

create table users(
    id_user int PRIMARY KEY AUTO_INCREMENT,
    id_login int,
    name varchar(255),
    bio text,
    age int,
    birthday date,
    FOREIGN KEY (id_login) REFERENCES login(id_login)
)

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