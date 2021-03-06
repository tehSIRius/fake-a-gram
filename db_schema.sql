CREATE DATABASE fakeagram;
USE fakeagram;

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(31) NOT NULL UNIQUE,
	`pass` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `posts` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user` INT NOT NULL,
	`imgur_address` VARCHAR(255) NOT NULL,
	`title` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `comments` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`comment` VARCHAR(255) NOT NULL,
	`post` INT NOT NULL,
	`user` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `likes` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`post` INT NOT NULL,
	`user` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `posts` ADD CONSTRAINT `posts_fk0` FOREIGN KEY (`user`) REFERENCES `users`(`id`);

ALTER TABLE `comments` ADD CONSTRAINT `comments_fk0` FOREIGN KEY (`post`) REFERENCES `posts`(`id`);

ALTER TABLE `comments` ADD CONSTRAINT `comments_fk1` FOREIGN KEY (`user`) REFERENCES `users`(`id`);

ALTER TABLE `likes` ADD CONSTRAINT `likes_fk0` FOREIGN KEY (`post`) REFERENCES `posts`(`id`);

ALTER TABLE `likes` ADD CONSTRAINT `likes_fk1` FOREIGN KEY (`user`) REFERENCES `users`(`id`);
