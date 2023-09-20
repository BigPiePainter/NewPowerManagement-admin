CREATE TABLE `courses_question_packages` (
   `id` bigint unsigned NOT NULL,
   `type` tinyint unsigned NOT NULL DEFAULT '1' COMMENT '类型 1课程 2好题包',
   `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '课程/好提包名称',
   `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '封面图/视频',
   `cover_mime_type` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文件类型',
   `teacher_id` bigint unsigned DEFAULT '1' COMMENT '老师ID',
   `grade_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '学习阶段ID',
   `subject_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '学科ID',
   `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '详情描述',
   `difficulty_level` int unsigned DEFAULT '1' COMMENT '好题难度系数',
   `created_at` datetime NOT NULL COMMENT '创建时间',
   `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
   `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
   PRIMARY KEY (`id`) USING BTREE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='课程/好题包'

CREATE TABLE `course_mini_lessons` (
   `id` bigint unsigned NOT NULL,
   `course_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '课程ID',
   `mini_lesson_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '视频ID',
   `sort` int unsigned NOT NULL DEFAULT '0' COMMENT '排序值越大越靠前',
   `created_at` datetime NOT NULL COMMENT '创建时间',
   `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
   `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
   PRIMARY KEY (`id`) USING BTREE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='课程微课表'

CREATE TABLE `question_package_questions` (
   `id` bigint unsigned NOT NULL,
   `package_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '好题包ID',
   `question_store_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '题库ID',
   `sort_value` int unsigned NOT NULL DEFAULT '0' COMMENT '排序值越大越靠前',
   `created_at` datetime NOT NULL COMMENT '创建时间',
   `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
   `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
   PRIMARY KEY (`id`) USING BTREE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='好题包题目'

CREATE TABLE `student_courses_question_packages` (
   `id` bigint unsigned NOT NULL,
   `courses_question_package_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '课程/好题包ID',
   `type` tinyint NOT NULL DEFAULT '0' COMMENT '类型 1课程 2好题包',
   `student_id` bigint NOT NULL COMMENT '学生ID',
   `valid` tinyint NOT NULL DEFAULT '1' COMMENT '有效 1有效 2无效',
   `order_id` bigint DEFAULT NULL COMMENT '订单id',
   `created_at` datetime NOT NULL COMMENT '创建时间',
   `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
   `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
   PRIMARY KEY (`id`) USING BTREE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='学生获得的课程好题包'