
#添加二条测试数据
SET NAMES UTF8;
USE traveler;
CREATE TABLE traveler_user_share_detail(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  uname varchar(25),
  title VARCHAR(200),
  detail VARCHAR(300),
  pic varchar(300),
  avatar varchar(300)
);