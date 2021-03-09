CREATE DATABASE jwtauth;

--download extention
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);


INSERT INTO user (user_name, user_email, user_password) VALUES ('henry', 'henrylu213@gmail.com', 'kthl8822');