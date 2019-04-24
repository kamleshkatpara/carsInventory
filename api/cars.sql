-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.38-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for cars
CREATE DATABASE IF NOT EXISTS `cars` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cars`;

-- Dumping structure for table cars.accesstoken
CREATE TABLE IF NOT EXISTS `accesstoken` (
  `id` varchar(255) NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `scopes` text,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table cars.accesstoken: ~2 rows (approximately)
/*!40000 ALTER TABLE `accesstoken` DISABLE KEYS */;
INSERT INTO `accesstoken` (`id`, `ttl`, `scopes`, `created`, `userId`) VALUES
	('0LlxUpTMKVwWXeUX3sQeWX2geLtxcWNXCPV9ifsCCwI7W9LAAgsxKq1F0YGsaPik', 1209600, NULL, '2019-04-23 02:24:51', 1),
	('5QP79Kq1JVvhYA239Dlc8aGNOagBcZu8T3LXS642plfV2WDrQoogmf8Uvhf8VFl1', 1209600, NULL, '2019-04-23 02:26:50', 1);
/*!40000 ALTER TABLE `accesstoken` ENABLE KEYS */;

-- Dumping structure for table cars.acl
CREATE TABLE IF NOT EXISTS `acl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(512) DEFAULT NULL,
  `property` varchar(512) DEFAULT NULL,
  `accessType` varchar(512) DEFAULT NULL,
  `permission` varchar(512) DEFAULT NULL,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table cars.acl: ~0 rows (approximately)
/*!40000 ALTER TABLE `acl` DISABLE KEYS */;
/*!40000 ALTER TABLE `acl` ENABLE KEYS */;

-- Dumping structure for table cars.manufacturers
CREATE TABLE IF NOT EXISTS `manufacturers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manufacturer_name` varchar(512) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Dumping data for table cars.manufacturers: ~3 rows (approximately)
/*!40000 ALTER TABLE `manufacturers` DISABLE KEYS */;
INSERT INTO `manufacturers` (`id`, `manufacturer_name`, `created_at`, `updated_at`) VALUES
	(1, 'Tata', '2019-04-21 17:22:06', '2019-04-21 17:22:06'),
	(2, 'Maruti', '2019-04-21 17:22:06', '2019-04-23 03:22:33'),
	(14, 'sdsdsd', '2019-04-23 03:33:53', NULL);
/*!40000 ALTER TABLE `manufacturers` ENABLE KEYS */;

-- Dumping structure for table cars.models
CREATE TABLE IF NOT EXISTS `models` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model_name` varchar(512) NOT NULL,
  `manufacturer_id` int(11) NOT NULL,
  `color` varchar(512) NOT NULL,
  `manufacturing_year` datetime DEFAULT NULL,
  `registration_number` int(11) DEFAULT NULL,
  `note` varchar(512) DEFAULT NULL,
  `first_image` varchar(512) DEFAULT NULL,
  `second_image` varchar(512) DEFAULT NULL,
  `model_count` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table cars.models: ~2 rows (approximately)
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` (`id`, `model_name`, `manufacturer_id`, `color`, `manufacturing_year`, `registration_number`, `note`, `first_image`, `second_image`, `model_count`, `created_at`, `updated_at`) VALUES
	(1, 'Nano', 1, 'red', '2019-04-21 17:22:06', 110, 'anything', 'string', 'string', 0, '2019-04-21 17:22:06', '2019-04-21 17:22:06'),
	(2, 'WagonR', 2, 'blue', '2019-04-21 17:22:06', 210, 'anything', 'string', 'string', 20, '2019-04-21 17:22:06', '2019-04-21 17:22:06');
/*!40000 ALTER TABLE `models` ENABLE KEYS */;

-- Dumping structure for table cars.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table cars.role: ~0 rows (approximately)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Dumping structure for table cars.rolemapping
CREATE TABLE IF NOT EXISTS `rolemapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `principalType` varchar(512) DEFAULT NULL,
  `principalId` varchar(255) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `principalId` (`principalId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table cars.rolemapping: ~0 rows (approximately)
/*!40000 ALTER TABLE `rolemapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `rolemapping` ENABLE KEYS */;

-- Dumping structure for table cars.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `realm` varchar(512) DEFAULT NULL,
  `username` varchar(512) DEFAULT NULL,
  `password` varchar(512) NOT NULL,
  `email` varchar(512) NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table cars.user: ~1 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `realm`, `username`, `password`, `email`, `emailVerified`, `verificationToken`) VALUES
	(1, 'admin', 'admin', '$2a$10$6kHUgUUTrOUHq20ZkkDFu.YCioGmPDFw9GrrrHaskiwf4ewM0Ne6e', 'caradmin@cars.com', 0, NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
