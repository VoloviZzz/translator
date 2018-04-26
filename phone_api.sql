-- MySQL dump 10.15  Distrib 10.0.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: phone_api
-- ------------------------------------------------------
-- Server version	10.0.34-MariaDB-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `my_tree`
--

DROP TABLE IF EXISTS `my_tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_tree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `left_key` int(11) NOT NULL DEFAULT '0',
  `right_key` int(11) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '1',
  `name` varchar(150) NOT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `ip_adress` varchar(100) DEFAULT NULL,
  `type` int(2) NOT NULL DEFAULT '0',
  `status` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `left_key` (`left_key`,`right_key`,`level`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_tree`
--

LOCK TABLES `my_tree` WRITE;
/*!40000 ALTER TABLE `my_tree` DISABLE KEYS */;
INSERT INTO `my_tree` VALUES (1,1,42,1,'Россия',NULL,NULL,0,0),(2,2,17,2,'Уральский ФО',NULL,NULL,0,0),(3,18,31,2,'Центральный ФО',NULL,NULL,0,0),(4,32,41,2,'Северо-Западный ФО',NULL,NULL,0,0),(5,3,16,3,'Челябинская область',NULL,NULL,0,0),(6,19,20,3,'Московская область',NULL,NULL,0,0),(7,21,28,3,'Воронежская область',NULL,NULL,0,0),(8,29,30,3,'Белгородская область',NULL,NULL,0,0),(9,33,40,3,'Архангельская область',NULL,NULL,0,0),(10,4,5,4,'Магнитогорск',NULL,NULL,0,0),(11,6,7,4,'Агаповский район',NULL,NULL,0,0),(12,22,23,4,'Воронеж',NULL,NULL,0,0),(13,24,25,4,'Россошь',NULL,NULL,0,0),(14,26,27,4,'Нововоронеж',NULL,NULL,0,0),(15,36,37,4,'Архангельск',NULL,NULL,0,0),(16,34,35,4,'Котляс',NULL,NULL,0,0),(19,12,13,4,'Какой-то треш','/uploads/original.png','Какой-то треш',1,1),(21,38,39,4,'Новый город',NULL,NULL,0,0);
/*!40000 ALTER TABLE `my_tree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL DEFAULT 'Новая новость',
  `photo` varchar(200) NOT NULL DEFAULT 'no_photo.jpg',
  `body` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (35,'Кончились новости, пока я тестил удаление.','/uploads/34.png','<abz>Круто, можно огромные пнгехи вставлять.</abz><img src=\"/uploads/Снимок экрана от 2018-04-18 12-39-00.png\"><abz>Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Тольконые задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. </abz><img src=\"/uploads/Снимок экрана от 2018-04-23 18-50-09.png\"><abz>дачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. Только нужно не забыть  остальные задачи. </abz>'),(36,'Новая новость','/uploads/4170177-color-gradient-wallpaper-hd.jpg','<abz>Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость </abz><img src=\"/uploads/New Project.png\"><abz>Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость </abz><img src=\"/uploads/New Project (1).png\"><abz>Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость </abz><img src=\"/uploads/New Project (2).png\"><abz>Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость Новая новость </abz>'),(37,'Эх я устал(ред)','/uploads/original.png','<abz>(ред)Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал </abz><img src=\"/uploads/New Project (2).png\"><abz>Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал Очень устал </abz><img src=\"/uploads/google_translate_copyrighted-512.png\"><abz>Всё отредактировал</abz><img src=\"/uploads/original.png\"><abz>И даже новое докинул</abz>');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,'/uploads/title_img.jpg'),(2,'/uploads/title_img2.jpg');
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('fN2-EMwzGNYakiURIcG8wp3QZudmpU_C',1524806027,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"auth\":true,\"phone\":\"89068513783\"}'),('x3CtrENhxygLO9_jvkonvCrXU1Kmh_gY',1524813598,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"number\":2,\"auth\":true,\"phone\":\"89068513783\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `surname` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `second_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `pass` varchar(200) NOT NULL,
  `tmp_code` int(200) DEFAULT NULL,
  `b_date` date NOT NULL,
  `active` int(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'asd','asd','asd','asd@asd.ry','123','1231234',6067,'2018-04-14',0),(5,'йцу','фыв','ячс','asd@asd.ry','123456789','c20ad4d76fe97759aa27a0c99bff6710',2684,'2018-04-01',0),(6,'Попытаев','Владимир','Николаевич','showjackajacksona@gmail.com','89068513783','e10adc3949ba59abbe56e057f20f883e',4697,'1998-06-16',1);
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

-- Dump completed on 2018-04-26 13:24:41
