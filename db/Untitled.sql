-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: mydriverapp
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `trip_id` int NOT NULL AUTO_INCREMENT,
  `pickup` varchar(145) DEFAULT NULL,
  `dropoff` varchar(145) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`trip_id`),
  KEY `fk_trips_users_idx` (`user_id`),
  CONSTRAINT `fk_trips_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` VALUES (5,'Santa Rosa, CA, USA','Mc Dowell Elementary School, South McDowell Boulevard, Petaluma, CA, USA','50.29','2023-02-10','2023-02-09 22:55:02','2023-02-09 22:55:02',20),(6,'720 Santa Alicia Drive, Rohnert Park, CA, USA','Boylan Point Agency, Cleveland Avenue, Santa Rosa, CA, USA','33.21','2023-02-23','2023-02-09 23:53:53','2023-02-09 23:53:53',20),(7,'Peet\'s Coffee, Old Redwood Highway, Cotati, CA, USA','Cotati, CA, USA','1.75','2023-03-10','2023-02-09 23:54:47','2023-02-09 23:54:47',20),(8,'Tacos al Carbón, Sebastopol Road, Santa Rosa, CA, USA','Twin Peaks, San Francisco, CA, USA','169.67','2023-02-21','2023-02-09 23:55:38','2023-02-09 23:55:38',20),(9,'San Francisco International Airport (SFO), San Francisco, CA, USA','Shake Shack Oakland, Telegraph Avenue, Oakland, CA, USA','67.92','2023-02-21','2023-02-09 23:56:59','2023-02-09 23:56:59',20),(10,'adasdas, Gornje Komarice, Serbia','Asdad, Morocco','6213.29','2023-03-02','2023-02-09 23:57:14','2023-02-09 23:57:14',20),(11,'Mc Dowell Elementary School, South McDowell Boulevard, Petaluma, CA, USA','McDonald\'s, Commerce Boulevard, Rohnert Park, CA, USA','32.54','2023-03-07','2023-02-09 23:57:47','2023-02-09 23:57:47',20),(12,'Santa Rosa, CA, USA','Texas, USA','3663.08','2023-02-09','2023-02-19 16:12:12','2023-02-19 16:12:12',20);
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(145) DEFAULT NULL,
  `last_name` varchar(145) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(555) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20,'Leo','Nascimento','leo@gmail.com','$2b$10$tfDSwB4QIu1OSnEAf7L09Omfad2PMtcRFLWl4DnMEL4cGurbV7mDe',NULL,'2023-02-01 21:59:36','2023-02-01 21:59:36');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-07 15:53:33
