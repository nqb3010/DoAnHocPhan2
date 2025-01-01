/*
 Navicat Premium Data Transfer

 Source Server         : 20.2.136.157_3306
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : 20.2.136.157:3306
 Source Schema         : quanlydotthuctap

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 30/12/2024 17:21:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cong_ty
-- ----------------------------
DROP TABLE IF EXISTS `cong_ty`;
CREATE TABLE `cong_ty`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_congty` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `linh_vuc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dia_chi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sdt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mo_ta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cong_ty
-- ----------------------------
INSERT INTO `cong_ty` VALUES (17, 'viettel', 'cntt', 'hao lac', '0973064395', 'nguyenlong@gmail.com', 'it');

-- ----------------------------
-- Table structure for danh_gia
-- ----------------------------
DROP TABLE IF EXISTS `danh_gia`;
CREATE TABLE `danh_gia`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_phancong_giangvien` int NOT NULL,
  `heso1` float NULL DEFAULT NULL,
  `heso2` float NULL DEFAULT NULL,
  `heso3` float NULL DEFAULT NULL,
  `tongket` float NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `instructor_id`(`id_phancong_giangvien` ASC) USING BTREE,
  CONSTRAINT `danh_gia_ibfk_1` FOREIGN KEY (`id_phancong_giangvien`) REFERENCES `phan_cong_giangvien` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of danh_gia
-- ----------------------------

-- ----------------------------
-- Table structure for dot_thuctap
-- ----------------------------
DROP TABLE IF EXISTS `dot_thuctap`;
CREATE TABLE `dot_thuctap`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_dot` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bat_dau` date NOT NULL,
  `ket_thuc` date NOT NULL,
  `hoc_ky` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mo_ta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `trang_thai` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dot_thuctap
-- ----------------------------
INSERT INTO `dot_thuctap` VALUES (7, 'dfdfd', '2021-10-27', '2023-12-30', 'dfdfd', 'fdfdf', 1);
INSERT INTO `dot_thuctap` VALUES (9, 'sdsdsd', '2024-12-26', '2024-12-30', 'sdsd', 'dsdsd', 1);
INSERT INTO `dot_thuctap` VALUES (10, 'ssdsd', '2024-12-26', '2024-12-30', 'sdsd', 'dsd', 1);

-- ----------------------------
-- Table structure for giang_vien
-- ----------------------------
DROP TABLE IF EXISTS `giang_vien`;
CREATE TABLE `giang_vien`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ho` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ten` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sdt` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_nguoidung` int NULL DEFAULT NULL,
  `id_khoa` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `faculty_id`(`id_khoa` ASC) USING BTREE,
  INDEX `user_id`(`id_nguoidung` ASC) USING BTREE,
  CONSTRAINT `giang_vien_ibfk_1` FOREIGN KEY (`id_khoa`) REFERENCES `khoa` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `giang_vien_ibfk_2` FOREIGN KEY (`id_nguoidung`) REFERENCES `nguoi_dung` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of giang_vien
-- ----------------------------
INSERT INTO `giang_vien` VALUES (26, 'Trịnh Trần', 'Phương', '0338432114', 'trinhtranphuong@viu.edu.vn', 31, 1);
INSERT INTO `giang_vien` VALUES (27, 'Trịnh Trần', 'Phương', '0338432114', 'trinhtranphuong@viu.edu.vn', 32, 1);
INSERT INTO `giang_vien` VALUES (28, 'Trịnh Trần Phương', 'Tuấn', '0338432114', 'trinhtranphuongtuan@viu.edu.vn', 33, 1);
INSERT INTO `giang_vien` VALUES (29, 'nguyễn hữu', 'long', '0973064395', 'nguyenhuulong@viu.edu.vn', 34, 1);

-- ----------------------------
-- Table structure for khoa
-- ----------------------------
DROP TABLE IF EXISTS `khoa`;
CREATE TABLE `khoa`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_khoa` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of khoa
-- ----------------------------
INSERT INTO `khoa` VALUES (1, 'Công nghệ thông tin');
INSERT INTO `khoa` VALUES (2, 'KT');
INSERT INTO `khoa` VALUES (3, 'Điện');

-- ----------------------------
-- Table structure for khoa_hoc
-- ----------------------------
DROP TABLE IF EXISTS `khoa_hoc`;
CREATE TABLE `khoa_hoc`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_khoahoc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of khoa_hoc
-- ----------------------------
INSERT INTO `khoa_hoc` VALUES (1, 'K45');
INSERT INTO `khoa_hoc` VALUES (2, 'K46');
INSERT INTO `khoa_hoc` VALUES (3, 'K47');
INSERT INTO `khoa_hoc` VALUES (4, 'K48');

-- ----------------------------
-- Table structure for lop_hoc
-- ----------------------------
DROP TABLE IF EXISTS `lop_hoc`;
CREATE TABLE `lop_hoc`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_lop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id_khoahoc` int NULL DEFAULT NULL,
  `id_khoa` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `course_id`(`id_khoahoc` ASC) USING BTREE,
  INDEX `faculty_id`(`id_khoa` ASC) USING BTREE,
  CONSTRAINT `lop_hoc_ibfk_1` FOREIGN KEY (`id_khoahoc`) REFERENCES `khoa_hoc` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `lop_hoc_ibfk_2` FOREIGN KEY (`id_khoa`) REFERENCES `khoa` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of lop_hoc
-- ----------------------------
INSERT INTO `lop_hoc` VALUES (6, 'K4518-CNTT1', 1, 1);
INSERT INTO `lop_hoc` VALUES (7, 'K4518-CNTT2', 1, 1);
INSERT INTO `lop_hoc` VALUES (8, 'K4518-CNTT3', 1, 1);

-- ----------------------------
-- Table structure for nguoi_dung
-- ----------------------------
DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mat_khau` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vai_tro` enum('Admin','giang_vien') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `trang_thai` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of nguoi_dung
-- ----------------------------
INSERT INTO `nguoi_dung` VALUES (1, 'admin', '$2a$10$O.0l/f4bYhkCaBG/7WLftuB6H6KDPMBd/ldKSWuyavQ4aP5kxMav6', 'Admin', 1);
INSERT INTO `nguoi_dung` VALUES (31, 'trinhtranphuong@viu.edu.vn', '$2b$10$O48pcp5JGTvncAqnqc/mpOUq863zvsCNN9cl0LJjTMgjRXFoXxAg.', 'giang_vien', 1);
INSERT INTO `nguoi_dung` VALUES (32, 'trinhtranphuong@viu.edu.vn', '$2b$10$0fPRuJA1fsAUYtpfMckrSOMCmmbrWITOsB2UllEEwIzFiOjnnTHwy', 'giang_vien', 1);
INSERT INTO `nguoi_dung` VALUES (33, 'trinhtranphuongtuan@viu.edu.vn', '$2b$10$NVIkba5Vxh0gRatc2k4oUe1qUYSVDSC/t9gjcfN/fG84ZrflNx2Jm', 'giang_vien', 1);
INSERT INTO `nguoi_dung` VALUES (34, 'nguyenhuulong@viu.edu.vn', '$2b$10$LR9XAUxhRJPOwjY.GYSt6eir.P7VZYzGo9JNzpaTGb8ggC3soJroy', 'giang_vien', 1);

-- ----------------------------
-- Table structure for phan_cong_giangvien
-- ----------------------------
DROP TABLE IF EXISTS `phan_cong_giangvien`;
CREATE TABLE `phan_cong_giangvien`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_sinhvien` int NULL DEFAULT NULL,
  `id_giangvien` int NULL DEFAULT NULL,
  `id_dotthuctap` int NULL DEFAULT NULL,
  `id_congty` int NULL DEFAULT NULL,
  `trang_thai` enum('đã phê duyệt','bị từ chối','đã hoàn thành') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `student_id`(`id_sinhvien` ASC) USING BTREE,
  INDEX `lecturer_id`(`id_giangvien` ASC) USING BTREE,
  INDEX `intern_id`(`id_dotthuctap` ASC) USING BTREE,
  INDEX `company_id`(`id_congty` ASC) USING BTREE,
  CONSTRAINT `phan_cong_giangvien_ibfk_1` FOREIGN KEY (`id_sinhvien`) REFERENCES `sinh_vien` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `phan_cong_giangvien_ibfk_2` FOREIGN KEY (`id_giangvien`) REFERENCES `giang_vien` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `phan_cong_giangvien_ibfk_3` FOREIGN KEY (`id_dotthuctap`) REFERENCES `dot_thuctap` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `phan_cong_giangvien_ibfk_4` FOREIGN KEY (`id_congty`) REFERENCES `cong_ty` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 111 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of phan_cong_giangvien
-- ----------------------------

-- ----------------------------
-- Table structure for sinh_vien
-- ----------------------------
DROP TABLE IF EXISTS `sinh_vien`;
CREATE TABLE `sinh_vien`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_sinhvien` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ho` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ten` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_lophoc` int NOT NULL,
  `trang_thai` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `class_id`(`id_lophoc` ASC) USING BTREE,
  CONSTRAINT `sinh_vien_ibfk_1` FOREIGN KEY (`id_lophoc`) REFERENCES `lop_hoc` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sinh_vien
-- ----------------------------
INSERT INTO `sinh_vien` VALUES (70, '232323', '', 'long ', 6, 0);
INSERT INTO `sinh_vien` VALUES (71, '2100373', 'nguyễn văn', 'a', 6, 0);

SET FOREIGN_KEY_CHECKS = 1;
