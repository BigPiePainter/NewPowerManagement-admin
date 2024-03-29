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

CREATE TABLE `products` (
   `id` bigint unsigned NOT NULL,
   `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '商品名称',
   `type` tinyint unsigned NOT NULL DEFAULT '1' COMMENT '产品类型  1课程 2好题',
   `category_id` bigint NOT NULL DEFAULT '0' COMMENT '课程分类ID',
   `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '封面图',
   `version_type` tinyint unsigned NOT NULL DEFAULT '1' COMMENT '版本类型 1:基础版 2:培优版 3:创新版',
   `version` tinyint unsigned NOT NULL DEFAULT '1' COMMENT '版本1:课程/好题A 2:课程/好题B 3:课程/好题C 4:课程/好题D',
   `grade_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '学习阶段ID',
   `subject_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '学科ID',
   `sales_quantity` int unsigned NOT NULL DEFAULT '0' COMMENT '销量',
   `android_point` int unsigned DEFAULT NULL COMMENT '安卓积分',
   `android_price` int unsigned DEFAULT NULL COMMENT '安卓售价 单位分',
   `ios_point` int unsigned DEFAULT NULL COMMENT 'IOS积分',
   `t_coin` int unsigned DEFAULT NULL COMMENT 'IOS T币数量',
   `status` tinyint unsigned NOT NULL DEFAULT '2' COMMENT '状态 1已上架 2未上架',
   `hot` tinyint DEFAULT '2' COMMENT '热门商品 1热门 2不是',
   `created_at` datetime NOT NULL COMMENT '创建时间',
   `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
   `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
   PRIMARY KEY (`id`) USING BTREE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='商品表'

CREATE TABLE `share_parents` (
   `id` bigint unsigned NOT NULL,
   `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
   `option_user` bigint unsigned NOT NULL COMMENT '操作人id',
   `option_type` int unsigned NOT NULL COMMENT '操作人类型 1老师 2管理员',
   `student_id` bigint unsigned NOT NULL COMMENT '学生id',
   `parents_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '家长手机号',
   `business_type` int unsigned NOT NULL COMMENT '业务类型 1 巩固作业 2 AI课',
   `business_id` bigint unsigned NOT NULL COMMENT '业务id',
   `created_at` datetime NOT NULL COMMENT '创建时间',
   `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
   `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
   PRIMARY KEY (`id`) USING BTREE,
   UNIQUE KEY `pw` (`password`) USING BTREE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='分享给家长数据'

SELECT orders.*,
       order_products.product_id AS product_id,
       products.name AS product_name,
       products.cover AS product_cover,
       courses_question_packages.name AS courses_question_packages_name,
       courses_question_packages.cover AS courses_question_packages_cover,
       students.name AS student_name
FROM (SELECT * FROM orders ${ew.customSqlSegment}) orders
        LEFT JOIN order_products ON orders.id = order_products.order_id
        LEFT JOIN products ON order_products.product_id = products.id
        LEFT JOIN courses_question_packages ON order_products.product_id = courses_question_packages.id
        LEFT JOIN students ON orders.student_id = students.id

SELECT student_answer_question_records.*,
  question_stores.answer AS key_answer,
  question_stores.type AS question_type,
  courses_question_packages.id AS course_question_package_id,
  courses_question_packages.name AS courses_question_packages_name,
  courses_question_packages.cover AS courses_question_packages_cover,
  courses_question_packages.difficulty_level AS difficulty_level,
  teachers.name AS teacher_name,
  students.name AS student_name
FROM student_answer_question_records
  LEFT JOIN question_stores ON student_answer_question_records.question_id = question_stores.id
  LEFT JOIN courses_question_packages ON student_answer_question_records.question_package_id = courses_question_packages.id
  LEFT JOIN teachers ON courses_question_packages.teacher_id = teachers.id
  LEFT JOIN students ON student_answer_question_records.student_id = students.id
WHERE student_answer_question_records.deleted_at IS NULL AND student_answer_question_records.student_id=#{studentId}