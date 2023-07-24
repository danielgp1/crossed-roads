CREATE TABLE users (
    id int PRIMARY KEY AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    profile_name varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    profile_pic_url varchar(255),
    current_color varchar(255) DEFAULT "#FFFFFF",
    longitude double,
    latitude double,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE available_colors (
    user_id INT,
    color_hash VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (user_id, color_hash)
);