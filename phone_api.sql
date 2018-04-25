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
  PRIMARY KEY (`id`),
  KEY `left_key` (`left_key`,`right_key`,`level`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_tree`
--

LOCK TABLES `my_tree` WRITE;
/*!40000 ALTER TABLE `my_tree` DISABLE KEYS */;
INSERT INTO `my_tree` VALUES (1,1,44,1,'Россия'),(2,2,19,2,'Уральский ФО'),(3,20,33,2,'Центральный ФО'),(4,34,43,2,'Северо-Западный ФО'),(5,3,18,3,'Челябинская область'),(6,21,22,3,'Московская область'),(7,23,30,3,'Воронежская область'),(8,31,32,3,'Белгородская область'),(9,35,42,3,'Архангельская область'),(10,4,5,4,'Магнитогорск'),(11,6,7,4,'Агаповский район'),(12,24,25,4,'Воронеж'),(13,26,27,4,'Россошь'),(14,28,29,4,'Нововоронеж'),(15,38,39,4,'Архангельск'),(16,36,37,4,'Котляс'),(19,12,13,4,'Новый город'),(21,40,41,4,'Новый город'),(22,14,15,4,'Новый город');
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Небензя предупредил США о тяжелых последствиях в случае удара по Сирии‍','/uploads/title_img.jpg','<abz> Премьер-министр Великобритании Тереза Мэй в ходе телефонного разговора с президентом США Дональдом Трампом заявила, что Лондону необходимо получить больше доказательств предполагаемой химической атаки в Сирии, прежде чем присоединяться к нанесению ударов по этой стране, сообщает газета The Times. </abz>\n<photo>/uploads/title_img2.jpg</photo>\n<abz> Премьер-министр Великобритании Тереза Мэй в ходе телефонного разговора с президентом США Дональдом Трампом заявила, что Лондону необходимо получить больше доказательств предполагаемой химической атаки в Сирии, прежде чем присоединяться к нанесению ударов по этой стране, сообщает газета The Times. </abz>'),(2,'Небензя предупредил США о тяжелых последствиях в случае удара по Сирии‍','/uploads/title_img2.jpg','<abz> Премьер-министр Великобритании Тереза Мэй в ходе телефонного разговора с президентом США Дональдом Трампом заявила, что Лондону необходимо получить больше доказательств предполагаемой химической атаки в Сирии, прежде чем присоединяться к нанесению ударов по этой стране, сообщает газета The Times. </abz>\n<photo>/uploads/title_img.jpg</photo>\n<abz> Премьер-министр Великобритании Тереза Мэй в ходе телефонного разговора с президентом США Дональдом Трампом заявила, что Лондону необходимо получить больше доказательств предполагаемой химической атаки в Сирии, прежде чем присоединяться к нанесению ударов по этой стране, сообщает газета The Times. </abz>\n'),(4,'Заголовок ','/uploads/03.png','<abz>Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости </abz>  <photo>/uploads/30.png</photo> <abz>Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости </abz> <photo>/uploads/30.png</photo> <abz>Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости Тело новости </abz>'),(5,'Ууу Новая новосиь','/uploads/Снимок экрана от 2018-04-11 15-29-26.png','<abz>Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости </abz><img src=\"/uploads/Снимок экрана от 2018-04-18 12-43-56.png\"><abz>Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости Ууу текст новой новости </abz><img src=\"/uploads/34.png\">'),(6,'Так так так с телефона','/uploads/IMG_20180424_124357.jpg','<abz>Так так так описание с телефона</abz><img src=\"/uploads/Screenshot_2018-04-22-23-11-18-687_com.android.chrome.png\"><abz>Воооооот</abz>'),(33,'fgfdgdfg','/uploads/Снимок экрана от 2018-04-18 12-38-29.png','<abz>dfgdfgdf</abz>'),(34,'Новость','/uploads/IMG_20180420_170848.jpg','<abz>О мой бог, какой красавчик</abz><img src=\"/uploads/IMG_20180419_205631_426.jpg\"><abz>Настолько красив что его кидают Мэрилин Монро</abz>');
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
INSERT INTO `sessions` VALUES ('0TXMYh7UyTVaTpYr6Lg2lk8msGqMNRbr',1524645303,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('fBQwooQC5pwmE10sM8m-CDuTK6e42cxm',1524646407,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"auth\":true,\"phone\":\"89068513783\"}'),('x3CtrENhxygLO9_jvkonvCrXU1Kmh_gY',1524735125,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"number\":2,\"auth\":true,\"phone\":\"89068513783\"}'),('zUdsUQmCqSjHxXKfzFamN7sk2pbC-xy7',1524655322,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"auth\":true,\"phone\":\"89068513783\"}');
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

-- Dump completed on 2018-04-25 14:45:40
