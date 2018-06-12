CREATE TABLE IF NOT EXISTS `user` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`name` varchar(64) NOT NULL,
	`lastname` varchar(64) NOT NULL,
	`telephone` int(20) NOT NULL,
	`email` varchar(64) NOT NULL,
	`id_twitter` int(20),
    `deleted` int(3),
    `created` DATETIME,
	`updated` DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	KEY `name` (`name`),
	KEY `lastname` (`lastname`),
	KEY `telephone` (`telephone`),
	KEY `email` (`email`),
	KEY `id_twitter` (`id_twitter`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_relationship` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`id_user_owner` int(20) NOT NULL,
	`id_user_destination` int(20) NOT NULL,
    `deleted` int(3),
    `created` DATETIME,
	PRIMARY KEY (`id`),
	KEY `id_user_owner` (`id_user_owner`),
	KEY `id_user_destination` (`id_user_destination`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;