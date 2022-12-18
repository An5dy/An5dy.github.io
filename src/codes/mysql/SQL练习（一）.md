---
title: SQL练习（一）
category: Database
tag:
  - MySQL
article: true
timeline: true
---



一直想提高自己对 SQL 的认知水平，最近终于下决心好好学习下，首先做了《[超经典SQL练习题，做完这些你的 SQL 就过关了](https://blog.csdn.net/flycat296/article/details/63681089)》这篇文章中的50道 SQL 题目，确实蛮有意思的，写 SQL 重要的是在于思路，不同的思路有不同的解法，当然 SQL 的性能问题暂时还未考虑，后面将会不断的补充和完善。练习使用的数据库为 MySQL8。



## 数据
### 学生表（Student）
#### 建表语句
```sql
CREATE TABLE `Student` (
  `SId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '学生编号',
  `Sname` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '学生姓名',
  `Sage` datetime DEFAULT NULL COMMENT '出生年月',
  `Ssex` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '学生性别'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```
#### 数据
```sql
INSERT INTO `Student` VALUES('01' , '赵雷' , '1990-01-01' , '男');
INSERT INTO `Student` VALUES('02' , '钱电' , '1990-12-21' , '男');
INSERT INTO `Student` VALUES('03' , '孙风' , '1990-05-20' , '男');
INSERT INTO `Student` VALUES('04' , '李云' , '1990-08-06' , '男');
INSERT INTO `Student` VALUES('05' , '周梅' , '1991-12-01' , '女');
INSERT INTO `Student` VALUES('06' , '吴兰' , '1992-03-01' , '女');
INSERT INTO `Student` VALUES('07' , '郑竹' , '1989-07-01' , '女');
INSERT INTO `Student` VALUES('09' , '张三' , '2017-12-20' , '女');
INSERT INTO `Student` VALUES('10' , '李四' , '2017-12-25' , '女');
INSERT INTO `Student` VALUES('11' , '李四' , '2017-12-30' , '女');
INSERT INTO `Student` VALUES('12' , '赵六' , '2017-01-01' , '女');
INSERT INTO `Student` VALUES('13' , '孙七' , '2018-01-01' , '女');
```
### 课程表（Course）
#### 建表语句
```sql
CREATE TABLE `Course` (
  `CId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '课程编号',
  `Cname` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '课程名称',
  `TId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '教师编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```
#### 数据
```sql
INSERT INTO `Course` VALUES('01' , '语文' , '02');
INSERT INTO `Course` VALUES('02' , '数学' , '01');
INSERT INTO `Course` VALUES('03' , '英语' , '03');
```
### 教师表（Teacher）
#### 建表语句
```sql
CREATE TABLE `Teacher` (
  `TId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '教师编号',
  `Tname` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '教师姓名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```
#### 数据
```sql
INSERT INTO `Teacher` VALUES('01' , '张三');
INSERT INTO `Teacher` VALUES('02' , '李四');
INSERT INTO `Teacher` VALUES('03' , '王五');
```
### 成绩表（SC）
#### 建表语句
```sql
CREATE TABLE `SC` (
  `SId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '学生编号',
  `CId` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '课程编号',
  `score` decimal(18,1) DEFAULT NULL COMMENT '分数'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```
#### 数据
```sql
INSERT INTO `SC` VALUES('01' , '01' , 80);
INSERT INTO `SC` VALUES('01' , '02' , 90);
INSERT INTO `SC` VALUES('01' , '03' , 99);
INSERT INTO `SC` VALUES('02' , '01' , 70);
INSERT INTO `SC` VALUES('02' , '02' , 60);
INSERT INTO `SC` VALUES('02' , '03' , 80);
INSERT INTO `SC` VALUES('03' , '01' , 80);
INSERT INTO `SC` VALUES('03' , '02' , 80);
INSERT INTO `SC` VALUES('03' , '03' , 80);
INSERT INTO `SC` VALUES('04' , '01' , 50);
INSERT INTO `SC` VALUES('04' , '02' , 30);
INSERT INTO `SC` VALUES('04' , '03' , 20);
INSERT INTO `SC` VALUES('05' , '01' , 76);
INSERT INTO `SC` VALUES('05' , '02' , 87);
INSERT INTO `SC` VALUES('06' , '01' , 31);
INSERT INTO `SC` VALUES('06' , '03' , 34);
INSERT INTO `SC` VALUES('07' , '02' , 89);
INSERT INTO `SC` VALUES('07' , '03' , 98);
```
### 1 查询" 01 "课程比" 02 "课程成绩高的学生的信息及课程分数
```sql
SELECT * FROM 
 (SELECT Sid, score FROM SC WHERE SC.Cid = '01') AS t1,
 (SELECT Sid, score FROM SC WHERE SC.Cid = '02') AS t2 
WHERE t1.Sid = t2.Sid 
AND t1.score > t2.score;
```
### 1.1 查询同时存在" 01 "课程和" 02 "课程的学生情况
```sql
SELECT * FROM 
  (SELECT SId, score FROM SC WHERE SC.CId = '01') AS t1,
  (SELECT SId, score FROM SC WHERE SC.CId = '02') AS t2 
WHERE t1.SId = t2.SId;
```
### 1.2 查询存在" 01 "课程但可能不存在" 02 "课程的情况(不存在时显示为 null )
```sql
SELECT * FROM 
  (SELECT SId, score FROM SC WHERE SC.CId = '01') AS t1 
LEFT JOIN 
  (SELECT SId, score FROM SC WHERE SC.CId = '02') AS t2 
ON 
t1.SId = t2.SId;
```
### 1.3 查询不存在" 01 "课程但存在" 02 "课程的情况
```sql
SELECT * FROM SC WHERE CId = '02' AND SId NOT IN (SELECT SId FROM SC WHERE CId = '01');
```
### 2 查询平均成绩大于等于 60 分的同学的学生编号和学生姓名和平均成绩
```sql
SELECT s.SId, s.Sname, c.avgscore FROM 
Student AS s 
INNER JOIN 
(SELECT SId, AVG(SC.score) AS avgscore FROM SC GROUP BY SId HAVING avgscore >= 60) AS c 
ON 
s.SId = c.SId;
```
### 3 查询在 SC 表存在成绩的学生信息
```sql
-- 方法1
SELECT * FROM Student WHERE SId IN (SELECT SId FROM SC);
-- 方法2
SELECT DISTINCT Student.* FROM Student, SC WHERE Student.SId = SC.SId;
-- 方法3
SELECT DISTINCT Student.* FROM Student INNER JOIN SC ON Student.SId = SC.SId;
```
### 4 查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩(没成绩的显示为null)
```sql
-- 方法1
SELECT s.SId, s.Sname, sc.coursecount, sc.sumscore FROM 
  Student AS s 
LEFT JOIN 
  (SELECT SId, SUM(sc.score) as sumscore, COUNT(sc.CId) as coursecount FROM SC GROUP BY SId) AS sc 
ON s.SId = sc.SId;
-- 方法2
SELECT s.SId, s.Sname, sc.coursecount, sc.sumscore FROM 
  (SELECT SId, SUM(sc.score) as sumscore, COUNT(sc.CId) as coursecount FROM SC GROUP BY SId) as sc 
RIGHT JOIN 
  Student AS s 
ON s.SId = sc.SId;
```
### 4.1 查有成绩的学生信息
```sql
SELECT * FROM Student WHERE EXISTS (SELECT * FROM SC WHERE SC.SId=Student.SId);
```
### 5 查询「李」姓老师的数量
```sql
SELECT COUNT(*) FROM Teacher WHERE Tname LIKE '李%';
```
### 6 查询学过「张三」老师授课的同学的信息
```sql
-- 方法1
SELECT * FROM Student WHERE SId IN 
  (SELECT SId FROM SC WHERE CId IN 
    (SELECT CId FROM Course WHERE Tid IN 
      (SELECT TId FROM Teacher WHERE Tname='张三')));
-- 方法2
SELECT student.* FROM 
  Teacher, Course, Student, SC 
WHERE Teacher.Tname = '张三' 
AND Teacher.TId = Course.TId 
AND Course.CId = SC.CId 
AND SC.SId = Student.SId;
```
### 7 查询没有学全所有课程的同学的信息
```sql
-- 方法1
SELECT * FROM 
  Student 
WHERE SId NOT IN 
  (SELECT SId FROM SC GROUP BY SId HAVING COUNT(SC.CId) = (SELECT COUNT(*) FROM Course));
-- 方法2
SELECT DISTINCT Student.* FROM 
  (SELECT Student.SId,Course.CId FROM Student,Course) AS t1 
LEFT JOIN 
  (SELECT SC.SId,SC.CId FROM SC) AS t2 
ON t1.SId = t2.SId 
AND t1.CId = t2.CId, Student 
WHERE t2.SId IS NULL 
AND t1.SId = Student.SId;
```
### 8 查询至少有一门课与学号为" 01 "的同学所学相同的同学的信息
```sql
-- 方法1
SELECT * FROM 
  Student 
WHERE SId IN 
  (SELECT SId FROM SC WHERE SC.CId IN 
    (SELECT Sc.CId FROM SC WHERE SId = '01') 
  GROUP BY SId HAVING COUNT(CId) > 1);
-- 方法2
SELECT DISTINCT Student.* FROM 
  Student, SC 
WHERE SC.CId IN (SELECT CId FROM SC WHERE SId = '01') 
AND SC.SId = Student.SId;
```
### 9 查询和" 01 "号的同学学习的课程完全相同的其他同学的信息
```sql
SELECT * FROM Student WHERE Student.SId NOT IN(
SELECT t1.SId FROM
(SELECT Student.SId, t.CId FROM 
Student, (SELECT SC.CId FROM SC WHERE SC.SId='01') AS t) AS t1 
LEFT JOIN SC ON t1.SId=SC.SId AND t1.CId=SC.CId WHERE SC.CId IS NULL) AND Student.SId!='01';
```
### 10 查询没学过"张三"老师讲授的任一门课程的学生姓名
```sql
-- 方法1
SELECT * FROM 
  Student 
WHERE SId NOT IN 
  (SELECT SId FROM SC WHERE CId IN 
    (SELECT CId FROM Course WHERE TId IN 
      (SELECT TId FROM Teacher WHERE Tname='张三')));
-- 方法2
SELECT * FROM 
  Student 
WHERE Student.SId NOT IN 
  (SELECT Student.SId FROM Student LEFT JOIN SC ON Student.SId = SC.SId WHERE EXISTS 
    (SELECT * FROM Teacher,Course WHERE Teacher.Tname = '张三' AND Teacher.TId = Course.TId AND Course.CId = SC.CId));
```
### 11 查询两门及其以上不及格课程的同学的学号，姓名及其平均成绩
```sql
SELECT Student.SId, Student.Sname, scoreavg FROM 
  Student,
  (SELECT SId,AVG(score) as scoreavg FROM 
  SC WHERE score < 60 GROUP BY SId HAVING COUNT(CId) >= 2) AS t 
WHERE Student.SId=t.SId;
```
### 12 检索" 01 "课程分数小于 60，按分数降序排列的学生信息
```sql
SELECT Student.* FROM Student, (SELECT * FROM SC WHERE CId = '01' AND score < 60) as t WHERE Student.SId = t.SId ORDER BY t.score DESC;
SELECT Student.* FROM Student,SC WHERE Student.SId = SC.SId AND SC.CId='01' AND SC.score<60 ORDER BY SC.score DESC;
```
### 13 按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩
```sql
SELECT SC.SId, SC.CId, SC.score, t.scoreavg FROM SC LEFT JOIN (SELECT SId, AVG(score) as scoreavg FROM SC GROUP BY SId) AS t ON SC.SId=t.SId ORDER BY t.scoreavg DESC;
```
### 14 查询各科成绩最高分、最低分和平均分：
> 以如下形式显示：课程 ID，课程 name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率
> 及格为>=60，中等为：70-80，优良为：80-90，优秀为：>=90
> 要求输出课程号和选修人数，查询结果按人数降序排列，若人数相同，按课程号升序排列
```sql
SELECT Course.CId AS '课程 ID', Course.Cname AS '课程 name', t1.total AS '选修人数', t1.scoremax AS '最高分', 
t1.scoremin AS '最低分', t1.scoreavg AS '平均分', t1.passrate AS '及格率', t1.mediumtate AS '中等率', t1.goodrate AS '优良率', t1.excellentrate AS '优秀率' FROM
(SELECT CId,
MAX(score) AS 'scoremax',
MIN(score) AS 'scoremin',
ROUND(AVG(score), 2) AS 'scoreavg',
COUNT(*) AS 'total',
CONCAT(ROUND(COUNT(score >= 60 OR NULL) / COUNT(*) * 100, 2), '%') AS 'passrate',
CONCAT(ROUND(COUNT((score >= 70 AND score <80) OR NULL) / COUNT(*) * 100, 2), '%') AS 'mediumtate',
CONCAT(ROUND(COUNT((score >= 80 AND score <90) OR NULL) / COUNT(*) * 100, 2), '%') AS 'goodrate',
CONCAT(ROUND(COUNT(score >= 90 OR NULL) / COUNT(*) * 100, 2), '%') AS 'excellentrate'
FROM SC GROUP BY CId) AS t1 LEFT JOIN Course ON t1.CId=Course.CId
ORDER BY t1.total DESC, Course.CId ASC;
```
### 15 按各科成绩进行排序，并显示排名， Score 重复时保留名次空缺
```sql
-- mysql8才支持的写法
SELECT *,RANK() over(ORDER BY score DESC) AS '排名' FROM SC;
-- 一般写法
SELECT SId, CId, score, rank1 AS '排名' FROM (
SELECT SId, CId, score, @curRank := IF(@curScore = score, @curRank, @incRank) AS rank1, @incRank := @incRank + 1, @curScore := score FROM SC,
(SELECT @curRank := 0, @incRank := 1, @curScore := NULL) AS t1 ORDER BY score DESC
) AS t2;
```
### 15.1 按各科成绩进行排序，并显示排名， Score 重复时合并名次
```sql
-- mysql8才支持的写法
SELECT *,DENSE_RANK() over (ORDER BY score DESC) AS '排名' FROM SC;
-- 一般写法
SELECT SId, CId, score, 
CASE
  WHEN @curScore = score 
    THEN @curRank
  WHEN @curScore := score 
    THEN @curRank := @curRank + 1
END AS '排名'
FROM SC,(SELECT @curRank := 0, @curScore := '') AS t1 ORDER BY score DESC;
```
### 16 查询学生的总成绩，并进行排名，总分重复时保留名次空缺
```sql
SELECT t1.SId, t1.totalScore, RANK() over (ORDER BY t1.totalScore DESC) AS '排名' FROM (SELECT SId, SUM(score) as totalScore FROM SC GROUP BY SId ORDER BY totalScore) as t1;
SELECT t.SId, t.totalScore, t.rank1 AS '排名' FROM (SELECT t1.SId, t1.totalScore, 
@curRank := IF(@curScore = t1.totalScore, @curRank, @incRank) AS 'rank1', @curScore := t1.totalScore, @incRank := @incRank + 1
FROM (SELECT SId, SUM(score) AS totalScore FROM SC GROUP BY SId ORDER BY totalScore DESC) AS t1, (SELECT @curScore := NULL, @curRank := 0, @incRank := 1) AS t2) as t;
```
### 16.1 查询学生的总成绩，并进行排名，总分重复时不保留名次空缺
```sql
SELECT t1.SId, t1.totalScore, DENSE_RANK() over (ORDER BY t1.totalScore DESC) AS '排名' FROM (SELECT SId, SUM(score) as totalScore FROM SC GROUP BY SId ORDER BY totalScore) as t1;
SELECT t.SId, t.totalScore, t.rank1 AS '排名' FROM
(SELECT *,
@curRank := IF(@curScore = totalScore, @curRank, @curRank := @curRank + 1) AS 'rank1', @curScore := totalScore
FROM (SELECT SId, SUM(score) AS totalScore FROM SC GROUP BY SId ORDER BY totalScore DESC) AS t1, (SELECT @curRank := 0, @curScore := NULL) AS t2) AS t;
```
### 17 统计各科成绩各分数段人数：课程编号，课程名称，[100-85]，[85-70]，[70-60]，[60-0] 及所占百分比
```sql
SELECT Course.CId AS '课程编号', Course.Cname AS '课程名称', t1.p1 AS '[100-85]', t1.p2 AS '[85-70]', t1.p3 AS '[70-60]', t1.p4 AS '[60-0]' FROM Course LEFT JOIN (
SELECT CId, 
CONCAT(ROUND(COUNT((score <= 100 AND score >= 85) OR NULL) / COUNT(*), 2) * 100, '%') AS 'p1',
CONCAT(ROUND(COUNT((score < 85 AND score >= 70) OR NULL) / COUNT(*), 2) * 100, '%') AS 'p2',
CONCAT(ROUND(COUNT((score < 70 AND score >= 60) OR NULL) / COUNT(*), 2) * 100, '%') AS 'p3',
CONCAT(ROUND(COUNT((score < 60 AND score >= 0) OR NULL) / COUNT(*), 2) * 100, '%') AS 'p4'
FROM SC GROUP BY CId) AS t1 ON Course.CId = t1.CId;
```
### 18 查询各科成绩前三名的记录
```sql
SELECT SC.CId, SC.SId, SC.score FROM SC WHERE (SELECT COUNT(*) FROM SC AS a WHERE a.SId = SC.SId AND SC.score < a.score) < 3 ORDER BY SC.CId, SC.score DESC;-- 获取小于3条的成绩
```
### 19 查询每门课程被选修的学生数
```sql
SELECT CId, COUNT(SId) FROM SC GROUP BY CId;
```
### 20 查询出只选修两门课程的学生学号和姓名
```sql
SELECT Student.SId, Student.Sname FROM (SELECT SId FROM SC GROUP BY SId HAVING COUNT(DISTINCT CId) = 2) t1 LEFT JOIN Student USING(SId);
```
### 21 查询男生、女生人数
```sql
SELECT Ssex, COUNT(*) AS '人数' FROM Student GROUP BY Ssex;
```
### 22 查询名字中含有「风」字的学生信息
```sql
SELECT * FROM Student WHERE Sname LIKE '%风%';
```
### 23 查询同名同性学生名单，并统计同名人数
```sql
SELECT Student.*, t1.nums AS '同名人数' FROM (SELECT Sname, Ssex, COUNT(*) AS nums FROM Student GROUP BY Sname, Ssex HAVING COUNT(*) > 1) AS t1 LEFT JOIN Student ON Student.Sname=t1.Sname;
```
### 24 查询 1990 年出生的学生名单
```sql
SELECT * FROM Student WHERE YEAR(Sage) = '1990';
```
### 25 查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列
```sql
SELECT CId, AVG(score) AS '平均成绩' FROM SC GROUP BY CId ORDER BY 平均成绩 DESC, CId;
```
### 26 查询平均成绩大于等于 85 的所有学生的学号、姓名和平均成绩
```sql
SELECT Student.SId, Student.Sname, t1.`平均成绩` FROM (SELECT SId, AVG(score) AS '平均成绩' FROM SC GROUP BY SId HAVING 平均成绩 > 85) AS t1 LEFT JOIN Student ON t1.SId = Student.SId;
```
### 27 查询课程名称为「数学」，且分数低于 60 的学生姓名和分数
```sql
SELECT Student.Sname, SC.score FROM Student INNER JOIN SC USING(SId) INNER JOIN Course ON SC.CId=Course.CId WHERE SC.score < 60 AND Course.Cname = '数学';
```
### 28 查询所有学生的课程及分数情况（存在学生没成绩，没选课的情况）
```sql
SELECT Student.Sname, SC.CId, SC.score FROM Student LEFT JOIN SC USING(SId);
```
### 29 查询任何一门课程成绩在 70 分以上的姓名、课程名称和分数
```sql
SELECT Student.Sname, Course.Cname, SC.score FROM Student INNER JOIN SC USING(SId) INNER JOIN Course USING(CId) WHERE SC.score > 70;
```
### 30 查询存在不及格的课程
```sql
SELECT DISTINCT(CId) FROM SC WHERE score < 60;
```
### 31 查询课程编号为 01 且课程成绩在 80 分以上的学生的学号和姓名
```sql
SELECT DISTINCT Student.SId, Student.Sname FROM Student INNER JOIN SC USING(SId) WHERE SC.CId='01' AND SC.score > 80;
```
### 32 求每门课程的学生人数
```sql
SELECT CId, COUNT(SId) FROM SC GROUP BY CId;
```
### 33 成绩不重复，查询选修「张三」老师所授课程的学生中，成绩最高的学生信息及其成绩
```sql
SELECT Student.*, Sc.score, SC.CId FROM Teacher INNER JOIN Course USING(TId) INNER JOIN SC USING(CId) INNER JOIN Student USING(SId) WHERE Tname='张三' ORDER BY score DESC LIMIT 1;
```
### 34 成绩有重复的情况下，查询选修「张三」老师所授课程的学生中，成绩最高的学生信息及其成绩
```sql
SELECT * FROM (SELECT t1.*,
CASE
  WHEN @curScore = t1.score THEN
    @curRank
  WHEN @curScore := t1.score THEN
   @curRank := @curRank + 1
END AS 'rank' FROM 
(SELECT Student.*, SC.score FROM Teacher INNER JOIN Course USING(TId) INNER JOIN SC USING(CId) INNER JOIN Student USING(SId) WHERE Tname='张三' ORDER BY score DESC) AS t1,
(SELECT @curScore := NULL, @curRank := 0) AS t2) AS t WHERE t.rank = 1;
```
### 35 查询不同课程成绩相同的学生的学生编号、课程编号、学生成绩
```sql
-- 方法1
SELECT DISTINCT t1.SId, t1.CId, t1.score FROM SC AS t1, SC AS t2 WHERE t1.SId = t2.SId AND t1.CId != t2.CId AND t1.score = t2.score;

-- 方法2
SELECT * FROM SC AS t1 WHERE EXISTS (SELECT * FROM SC AS t2 WHERE t1.SId = t2.SId AND t1.CId != t2.CId AND t1.score = t2.score);
```
### 36 查询每门课程成绩最好的前两名
```sql
-- mysql8写法
SELECT * FROM (SELECT *, ROW_NUMBER() over (PARTITION BY CId ORDER BY score DESC) AS A FROM SC) AS B WHERE B.A < 3;

-- 依次匹配
SELECT * FROM SC AS t1 WHERE (SELECT COUNT(*) FROM SC AS t2 WHERE t2.score > t1.score AND t1.CId = t2.CId) < 2 ORDER BY t1.CId;

-- 排名获取
SELECT t.SId, t.CId, t.score FROM (
SELECT *,
@curRank := IF(@curCid = t1.CId, @curRank := @curRank + 1, @curRank := 1) AS 'rank',
@curCid := t1.CId
FROM (SELECT * FROM SC ORDER BY CId, score DESC) AS t1, (SELECT @curCid := NULL, @curRank := 1) AS t2) AS t WHERE t.rank < 3;
```
### 37 统计每门课程的学生选修人数（超过 5 人的课程才统计）
```sql
SELECT CId, COUNT(DISTINCT SId) AS '学生选修人数' FROM SC GROUP BY CId HAVING 学生选修人数 > 5;
```
### 38 检索至少选修两门课程的学生学号
```sql
SELECT SId FROM SC GROUP BY SId HAVING COUNT(DISTINCT CId) >= 2;
```
### 39 查询选修了全部课程的学生信息
```sql
SELECT SId FROM SC GROUP BY SId HAVING COUNT(CId) = (SELECT COUNT(DISTINCT Cname) FROM Course);
```
### 40 查询各学生的年龄，只按年份来算
```sql
SELECT TIMESTAMPDIFF(YEAR, Sage, CURRENT_TIMESTAMP) AS '年龄' FROM Student;
```
### 41 按照出生日期来算，当前月日 < 出生年月的月日则，年龄减一
```sql
SELECT SId, Sname, TIMESTAMPDIFF(YEAR,Sage,CURRENT_TIMESTAMP) AS '年龄' FROM Student;
```
### 42 查询本周过生日的学生
```sql
SELECT * FROM Student WHERE YEARWEEK(Sage) = YEARWEEK(CURDATE());
SELECT * FROM Student WHERE YEARWEEK(Sage) = YEARWEEK(CURRENT_DATE());
```
### 43 查询下周过生日的学生
```sql
SELECT * FROM Student WHERE WEEK(Sage) = WEEK(CURRENT_DATE) + 1;
```
### 44 查询本月过生日的学生
```sql
SELECT * FROM Student WHERE MONTH(Sage) = MONTH(CURRENT_DATE);
```
### 45 查询下月过生日的学生
```sql
SELECT * FROM Student WHERE MONTH(Sage) = MONTH(CURRENT_DATE) + 1;
```
## 参考
- [50道SQL练习题](https://zhuanlan.zhihu.com/p/32137597)





























