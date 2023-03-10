-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `taste` varchar(600) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `size` int NOT NULL,
  `pgvg` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL,
  `manufacturer` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `goods` (`id`, `brand`, `title`, `taste`, `size`, `pgvg`, `price`, `manufacturer`) VALUES
(1,	'Fruit Ninja',	'Sour Apple',	'Зеленое яблоко, Яблоко',	30,	'60/40',	1350,	'БВР'),
(2,	'Fruit Ninja',	'Peach',	'Персик',	30,	'60/40',	1350,	'БВР'),
(3,	'Fruit Ninja',	'Pineapple Ice',	'Лед, Ананас',	30,	'60/40',	1350,	'БВР'),
(4,	'Fruit Ninja',	'Mango Ice',	'Лед, Манго',	30,	'60/40',	1350,	'БВР'),
(5,	'Fruit Ninja',	'Citrus',	'Цитрус',	30,	'60/40',	1350,	'БВР'),
(6,	'Uncle Baker',	'Strawberry Donut',	'Клубника, Пончик, Выпечка',	30,	'60/40',	1490,	'БВР'),
(7,	'Uncle Baker',	'Tiramisu',	'Тирамису',	30,	'60/40',	1490,	'БВР'),
(8,	'Uncle Baker',	'Apple Strudel',	'Яблоко, Штрудель, Пирог, Выпечка',	30,	'60/40',	1490,	'БВР'),
(9,	'Uncle Baker',	'Lemon Pie',	'Лимон, Пирог, Выпечка',	30,	'60/40',	1490,	'БВР'),
(10,	'Vegas',	'Thriller',	'Ментол, Табак, Сигара',	50,	'30/70',	680,	'БВР'),
(11,	'Vegas',	'Butterflies',	'Кулер, Банан, Малина',	50,	'30/70',	680,	'БВР'),
(12,	'Vegas',	'Cheater',	'Смородина, Кулер',	50,	'30/70',	680,	'БВР'),
(13,	'Vegas',	'Xscape',	'Персик, Маракуйя',	50,	'30/70',	680,	'БВР'),
(14,	'Vegas',	'Billie Jean',	'Сигара, Табак, Вишня',	50,	'30/70',	680,	'БВР'),
(15,	'Vegas',	'Scream',	'Кулер, Клюква',	50,	'30/70',	680,	'БВР');

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(312) COLLATE utf8mb4_general_ci NOT NULL,
  `orderlist` json NOT NULL,
  `status` varchar(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `orders` (`id`, `username`, `address`, `orderlist`, `status`) VALUES
(6,	'4444',	'test address',	'[{\"id\": 2, \"amount\": 10}, {\"id\": 3, \"amount\": 3}]',	NULL),
(7,	'inordic',	'adress 1',	'[{\"id\": 6, \"amount\": 3}, {\"id\": 7, \"amount\": 3}, {\"id\": 8, \"amount\": 2}, {\"id\": 4, \"amount\": 3}, {\"id\": 5, \"amount\": 1}]',	NULL),
(8,	'test',	'fsdfdsfdsfdsfsdfds',	'[{\"id\": 6, \"amount\": 3}, {\"id\": 7, \"amount\": 3}, {\"id\": 8, \"amount\": 2}, {\"id\": 4, \"amount\": 3}, {\"id\": 5, \"amount\": 1}]',	NULL);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `usermail` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userhash` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `username`, `password`, `usermail`, `address`, `userhash`) VALUES
(2,	'userdd',	'ingP3pI3LX91.',	'test@mail.rus',	NULL,	NULL),
(3,	'123',	'injY8GPhDQhbc',	'da',	NULL,	NULL),
(4,	'dasd',	'injY8GPhDQhbc',	'dasda',	NULL,	NULL),
(5,	'dasda',	'inFHG3qvSyAF.',	'123213',	NULL,	NULL),
(6,	'124',	'inqFEyEx8yjfM',	'1',	NULL,	NULL),
(7,	'111',	'inFHG3qvSyAF.',	'eqwewqewqe',	NULL,	NULL),
(8,	'rrerrerre',	'injY8GPhDQhbc',	'eega@mail.eu',	NULL,	NULL),
(9,	'sadsadsadsadad',	'injY8GPhDQhbc',	'dddasdasdasdasdasd',	NULL,	NULL),
(10,	'eeqweqewqewqewq',	'inWPOR3V7AGRU',	'dadadadadadadaada',	NULL,	NULL),
(11,	'jaja',	'injY8GPhDQhbc',	'jaja@mail.ru',	NULL,	NULL),
(15,	'',	'inWSYLbKCoLko',	'',	NULL,	NULL),
(16,	'test',	'inpo6Syn5OpQ6',	'test@mail.ru',	NULL,	''),
(17,	'dasdasdadadadadadadsdsadasd',	'inqFEyEx8yjfM',	'sdascx',	NULL,	NULL),
(18,	'xxx',	'inUdIDT0t6EYg',	'xxx',	NULL,	''),
(19,	'login',	'injqk4zz3nke6',	'hui@mail.ru',	NULL,	''),
(20,	'4444',	'inIaLvWFZZ47k',	'4444',	'dasdadadasd',	''),
(21,	'inordic',	'injqk4zz3nke6',	'inordic@mail.ru',	'adress 1',	'');

-- 2023-02-24 20:58:56
