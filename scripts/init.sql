CREATE DATABASE IF NOT EXISTS device_management;

USE device_management;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(128) NOT NULL
);

CREATE TABLE devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  categoryId INT NOT NULL,
  color VARCHAR(16) NOT NULL,
  partNumber INT NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);
