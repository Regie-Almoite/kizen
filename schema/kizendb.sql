-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2022 at 05:41 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kizendb`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_records`
--

CREATE TABLE `activity_records` (
  `activity_records_id` int(11) NOT NULL,
  `status_id` int(11) DEFAULT NULL,
  `error_id` int(11) DEFAULT NULL,
  `comment` longtext DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `machine_id` int(11) DEFAULT NULL,
  `product` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activity_records`
--

INSERT INTO `activity_records` (`activity_records_id`, `status_id`, `error_id`, `comment`, `user_id`, `machine_id`, `product`, `created_at`) VALUES
(14, 2, 6, '', 1, 1, '', '2022-08-23 12:15:32'),
(16, 2, 6, '', 1, 1, '', '2022-08-23 12:17:07'),
(17, 3, 6, '', 1, 1, '', '2022-08-23 12:17:47'),
(18, 4, 6, '', 1, 1, '', '2022-08-23 12:17:54'),
(23, 2, 6, '', 1, 1, '', '2022-08-23 12:43:44'),
(24, 1, 6, '', 1, 1, '', '2022-08-23 12:46:37'),
(25, 2, 6, '', 1, 1, '', '2022-08-23 12:46:45'),
(26, 4, 6, '', 1, 1, '', '2022-08-23 12:47:16'),
(27, 1, 6, '', 1, 1, '', '2022-08-23 12:47:55'),
(28, 3, 6, '', 1, 2, '', '2022-08-23 13:19:50'),
(29, 1, 6, '', NULL, 2, '', '2022-08-24 11:22:09'),
(30, 3, 2, '', 2, 4, '', '2022-08-24 11:24:20'),
(31, 1, 6, '', 2, 4, '', '2022-08-24 11:28:44');

-- --------------------------------------------------------

--
-- Table structure for table `errors`
--

CREATE TABLE `errors` (
  `error_id` int(11) NOT NULL,
  `error_description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `errors`
--

INSERT INTO `errors` (`error_id`, `error_description`, `created_at`, `updated_at`) VALUES
(1, 'Input Jam', '2022-08-15 16:35:48', '2022-08-15 16:35:48'),
(2, 'Output Jam', '2022-08-15 16:35:58', '2022-08-15 16:35:58'),
(3, 'In DC not in place', '2022-08-15 16:36:08', '2022-08-15 16:36:08'),
(4, 'Out DC not in place', '2022-08-15 16:36:19', '2022-08-15 16:36:19'),
(5, 'Plunger Error', '2022-08-15 16:36:30', '2022-08-15 16:36:30'),
(6, 'None', '2022-08-15 16:36:30', '2022-08-15 16:36:30');

-- --------------------------------------------------------

--
-- Table structure for table `machines`
--

CREATE TABLE `machines` (
  `machine_id` int(11) NOT NULL,
  `equipment_type` varchar(45) DEFAULT NULL,
  `model` varchar(45) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `machines`
--

INSERT INTO `machines` (`machine_id`, `equipment_type`, `model`, `brand`, `status_id`, `created_at`, `updated_at`) VALUES
(1, 'PICK and PLACE HANDLER', 'MT9510', 'MULTITEST', 1, '2022-08-14 16:21:50', '2022-08-14 16:21:50'),
(2, 'PICK and PLACE HANDLER', 'MT9510', 'MULTITEST', 1, '2022-08-14 16:23:00', '2022-08-14 16:23:00'),
(3, 'PICK and PLACE HANDLER', 'MT9510', 'MULTITEST', 1, '2022-08-14 16:23:27', '2022-08-14 16:23:27'),
(4, 'GRAVITY HANDLER', 'MT9918', 'MULTITEST', 1, '2022-08-14 16:24:49', '2022-08-14 16:24:49'),
(5, 'GRAVITY HANDLER', 'MT9918', 'MULTITEST', 2, '2022-08-14 16:25:07', '2022-08-14 16:25:07'),
(6, 'GRAVITY HANDLER', 'MT9918', 'MULTITEST', 5, '2022-08-14 16:25:20', '2022-08-14 16:25:20'),
(7, 'GRAVITY HANDLER', 'MT9918', 'MULTITEST', 4, '2022-08-14 16:26:09', '2022-08-14 16:26:09'),
(8, 'GRAVITY HANDLER', 'MT9918', 'MULTITEST', 4, '2022-08-14 16:26:10', '2022-08-14 16:26:10'),
(9, 'PICK and PLACE HANDLER', 'MT9510', 'MULTITEST', 3, '2022-08-14 16:27:11', '2022-08-14 16:27:11'),
(10, 'PICK and PLACE HANDLER', 'MT9510', 'MULTITEST', 3, '2022-08-14 16:27:12', '2022-08-14 16:27:12');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `created_at`, `updated_at`) VALUES
(1, 'ADMIN', '2022-08-11 18:00:53', '2022-08-11 18:00:53'),
(2, 'PRDUCTION SUPERVISOR', '2022-08-11 18:00:53', '2022-08-11 18:00:53'),
(3, 'ENGINEEER', '2022-08-13 16:37:20', '2022-08-13 16:37:33'),
(4, 'TECHNICIAN', '2022-08-13 16:39:06', '2022-08-13 16:39:06'),
(5, 'OPERATOR', '2022-08-18 09:11:38', '2022-08-18 09:11:38');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `status_id` int(11) NOT NULL,
  `status_code` varchar(45) DEFAULT NULL,
  `status_name` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`status_id`, `status_code`, `status_name`, `created_at`, `updated_at`) VALUES
(1, 'PR', 'Production Run', '2022-08-14 15:18:53', '2022-08-14 15:18:53'),
(2, 'SU', 'Machine Setup', '2022-08-14 15:19:26', '2022-08-14 15:19:26'),
(3, 'PD', 'Production Down', '2022-08-14 15:19:38', '2022-08-14 15:19:38'),
(4, 'ED', 'Equipment Down', '2022-08-14 15:20:48', '2022-08-14 15:20:48'),
(5, 'ID', 'Idle', '2022-08-14 15:20:58', '2022-08-14 15:20:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'Regienald', 'Almoite', 'admin@example.com', '$2b$10$umhYSoeDoszWwqFCHZoZX.BDJFcCik23uIhFMjep1lbbr0xTFLQeO', 1, '2022-08-12 21:01:10', '2022-08-19 23:15:25'),
(2, 'Ben Francis', 'De Leon', 'operator@example.com', '$2b$10$gZavb.qAcfmqWTqnEaSzd.mdOe0PgEkF1zWYFv1KwbTlfKU3PXVgW', 5, '2022-08-15 16:46:34', '2022-08-15 16:46:34'),
(3, 'Marco', 'Lazaro', 'prodsup@example.com', '$2b$10$FXUOrZsoyXzNzlavKZLHV.q23Cg5a7VjmIE0CzTc5WGpV/nhcJkZa', 2, '2022-08-15 16:49:06', '2022-08-15 16:49:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_records`
--
ALTER TABLE `activity_records`
  ADD PRIMARY KEY (`activity_records_id`),
  ADD KEY `machine_id_idx` (`machine_id`),
  ADD KEY `user_id_idx` (`user_id`),
  ADD KEY `error_id_idx` (`error_id`);

--
-- Indexes for table `errors`
--
ALTER TABLE `errors`
  ADD PRIMARY KEY (`error_id`);

--
-- Indexes for table `machines`
--
ALTER TABLE `machines`
  ADD PRIMARY KEY (`machine_id`),
  ADD KEY `status_id_idx` (`status_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `role_id_idx` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_records`
--
ALTER TABLE `activity_records`
  MODIFY `activity_records_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `errors`
--
ALTER TABLE `errors`
  MODIFY `error_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `machines`
--
ALTER TABLE `machines`
  MODIFY `machine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_records`
--
ALTER TABLE `activity_records`
  ADD CONSTRAINT `error_id` FOREIGN KEY (`error_id`) REFERENCES `errors` (`error_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `machine_id` FOREIGN KEY (`machine_id`) REFERENCES `machines` (`machine_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `machines`
--
ALTER TABLE `machines`
  ADD CONSTRAINT `status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
