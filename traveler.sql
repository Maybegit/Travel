/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : traveler

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-11-27 12:44:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `traveler_active`
-- ----------------------------
DROP TABLE IF EXISTS `traveler_active`;
CREATE TABLE `traveler_active` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) DEFAULT NULL,
  `detail` varchar(128) DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `date1` date DEFAULT NULL,
  `pic` varchar(128) DEFAULT NULL,
  `merchant` varchar(300) NOT NULL,
  `avatar` varchar(300) NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of traveler_active
-- ----------------------------
INSERT INTO `traveler_active` VALUES ('9', 'sdsdsd', 'sdsdsd撒大声地', '222.00', '2019-11-20', '/images/9241.2944640764731574239438220.jpg', '问问', '/8.jpg', '0');
INSERT INTO `traveler_active` VALUES ('10', '增城白水寨', '风景美丽，很多美女哈哈哈啊哈哈啊哈哈哈啊哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈安琥', '9999.00', '2019-11-20', '/images/7470.9856990552341574248316161.jpg', 'maybegit', '/8.jpg', '0');
INSERT INTO `traveler_active` VALUES ('11', '番禺莲花山风景名胜区', '大萨达把数据库的哈萨克副经理文身断发挥洒来看山东黄金卡拉水电费哈萨克劳动法好帅防空火箭代理费寰谛凤翎见客户 洪都拉斯喝多了就卡死大萨达撒', '2588.00', '2019-09-21', '/images/2759.1006502984691574319356761.jpg', 'bbb', '/8.jpg', '0');
INSERT INTO `traveler_active` VALUES ('15', '2222', '2222', '2222.00', '2019-12-26', '/images/7583.7689221520591574751490625.jpg', '22222', '/8.jpg', '19');

-- ----------------------------
-- Table structure for `traveler_active_detail`
-- ----------------------------
DROP TABLE IF EXISTS `traveler_active_detail`;
CREATE TABLE `traveler_active_detail` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `detail` varchar(200) DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `date1` date DEFAULT NULL,
  `date2` date DEFAULT NULL,
  `pic` varchar(128) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `merchant` varchar(300) NOT NULL,
  `avatar` varchar(300) NOT NULL,
  `uid` int(11) NOT NULL,
  UNIQUE KEY `tid` (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of traveler_active_detail
-- ----------------------------
INSERT INTO `traveler_active_detail` VALUES ('8', '三生三世', '少时诵诗书所', '159.00', '2019-11-20', '2019-11-22', '/images/3588.3193957906271574239280809.jpg', null, '是是是', '/8.jpg', '0');
INSERT INTO `traveler_active_detail` VALUES ('9', 'sdsdsd', 'sdsdsd撒大声地', '222.00', '2019-11-20', '2019-11-20', '/images/1633.3654464411531574239438219.jpg+/images/7569.597878837041574239438219.jpg+/images/9241.2944640764731574239438220.jpg', null, '问问', '/8.jpg', '0');
INSERT INTO `traveler_active_detail` VALUES ('10', '增城白水寨', '风景美丽，很多美女哈哈哈啊哈哈啊哈哈哈啊哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈安琥', '9999.00', '2019-11-20', '2019-12-20', '/images/6094.9858424062841574248316160.jpg+/images/5391.6667606717891574248316160.jpg+/images/1998.17735521607981574248316161.jp', null, 'maybegit', '/8.jpg', '0');
INSERT INTO `traveler_active_detail` VALUES ('11', '番禺莲花山风景名胜区', '大萨达把数据库的哈萨克副经理文身断发挥洒来看山东黄金卡拉水电费哈萨克劳动法好帅防空火箭代理费寰谛凤翎见客户 洪都拉斯喝多了就卡死大萨达撒', '2588.00', '2019-09-21', '2019-09-26', '/images/5608.0433965589661574319356760.jpg+/images/9671.0119229804081574319356761.jpg+/images/2759.1006502984691574319356761.jpg', null, 'bbb', '/8.jpg', '0');
INSERT INTO `traveler_active_detail` VALUES ('15', '2222', '2222', '2222.00', '2019-12-26', '2020-11-26', '/images/1671.71119301218191574751490625.jpg+/images/6127.3245068283131574751490625.jpg+/images/7583.7689221520591574751490625.jp', null, '22222', '/8.jpg', '19');

-- ----------------------------
-- Table structure for `traveler_index_carousel`
-- ----------------------------
DROP TABLE IF EXISTS `traveler_index_carousel`;
CREATE TABLE `traveler_index_carousel` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `pic` varchar(128) DEFAULT NULL,
  `title` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of traveler_index_carousel
-- ----------------------------
INSERT INTO `traveler_index_carousel` VALUES ('1', 'carousel1.jpg', '武功山是集人文景观和自然景观为一体的山岳型风景名胜区，是江南名山最后一座正在开发的处女山');
INSERT INTO `traveler_index_carousel` VALUES ('2', 'carousel2.jpg', '杨梅坑位于大亚湾，是深圳最美的溪谷，美人鱼取景地');

-- ----------------------------
-- Table structure for `traveler_user`
-- ----------------------------
DROP TABLE IF EXISTS `traveler_user`;
CREATE TABLE `traveler_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(32) DEFAULT NULL,
  `upwd` varchar(32) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `avatar` varchar(128) DEFAULT NULL,
  `user_name` varchar(32) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `isuser` int(11) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of traveler_user
-- ----------------------------
INSERT INTO `traveler_user` VALUES ('1', 'tom', '123456', '15975835385', '/images/3643.87614658262741574821086608.jpg', '汤姆', '1', '1');
INSERT INTO `traveler_user` VALUES ('16', 'admin', '123456', '18320082602', '/images/9416.6676126464481574749099185.jpg', null, null, '1');
INSERT INTO `traveler_user` VALUES ('17', 'maybe222', '123456', null, '/5.jpg', null, null, '0');
INSERT INTO `traveler_user` VALUES ('18', 'chengzhan', '123456', null, '/7.jpg', null, null, '1');
INSERT INTO `traveler_user` VALUES ('19', 'tom', '123456', null, '/8.jpg', null, null, '0');
INSERT INTO `traveler_user` VALUES ('24', 'admin', '123456', null, '/9.jpg', null, null, '0');
INSERT INTO `traveler_user` VALUES ('25', 'rouran', '123456', '18320082602', '/1.jpg', null, null, '1');
INSERT INTO `traveler_user` VALUES ('26', 'hetao', '123456', '15220476710', '/5.jpg', null, null, '1');
INSERT INTO `traveler_user` VALUES ('27', 'tom55', '123456', '13532808640', '/4.jpg', null, null, '1');
INSERT INTO `traveler_user` VALUES ('28', 'dcz0668', '123456', '18218632430', '/2.jpg', null, null, '1');

-- ----------------------------
-- Table structure for `traveler_user_order0`
-- ----------------------------
DROP TABLE IF EXISTS `traveler_user_order0`;
CREATE TABLE `traveler_user_order0` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `uname` varchar(300) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of traveler_user_order0
-- ----------------------------
INSERT INTO `traveler_user_order0` VALUES ('44', '10', '1', 'tom');

-- ----------------------------
-- Table structure for `traveler_user_order1`
-- ----------------------------
DROP TABLE IF EXISTS `traveler_user_order1`;
CREATE TABLE `traveler_user_order1` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `phone` bigint(20) NOT NULL,
  `uname` varchar(300) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of traveler_user_order1
-- ----------------------------
INSERT INTO `traveler_user_order1` VALUES ('21', '8', '1', '15975835385', 'tom');

-- ----------------------------
-- Table structure for `traveler_user_shareall`
-- ----------------------------
DROP TABLE IF EXISTS `traveler_user_shareall`;
CREATE TABLE `traveler_user_shareall` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `uname` varchar(25) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `detail` varchar(300) DEFAULT NULL,
  `pic` varchar(300) DEFAULT NULL,
  `avatar` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of traveler_user_shareall
-- ----------------------------
INSERT INTO `traveler_user_shareall` VALUES ('24', '1', 'tom', '北岳泰山风景名胜区', '大萨达撒多多大萨达环境山卡拉涤魂圣枪爱空间大哈萨克暗示健康大厦良好的卡拉十点多撒大家卡萨丁哈萨克激烈的撒谎都是块级ad哈萨克了解到哈数据库来的哈三联看得见哈数据库来的哈萨克讲道理哈萨克大家拉屎的进口蜡圣诞节阿斯利康大大家好卡拉圣诞节开始啦很大声科技联合大厦框架类的哈萨克进来动画阿萨德加快点哈数据库的哈数据库刘德华撒即可领导哈斯离开大家奥斯卡德令哈市框架类的哈杀戮空间洪都拉斯看', '/images/5299.5240931985421573867904227.jpg', '/1.jpg');
INSERT INTO `traveler_user_shareall` VALUES ('25', '1', 'tom', '白云山风景名胜区', '奥术大师大所大所大所多群翁绕弯儿无群翁认为热无热无若 认为群若翁热无若翁绕弯儿翁热无若翁柔然翁热无若werewolf热污染翁认为热无若热污染翁热无若绕弯儿翁任务认为热热二位若翁热热二问 ', '/images/5891.7176144905591573867966115.jpg', '/1.jpg');
INSERT INTO `traveler_user_shareall` VALUES ('26', '1', 'tom', '桂林山水风景名胜区', '大萨达大萨达撒多大萨达撒多未确认群翁撒多撒大所多大萨达撒大所大所大所大萨达撒大所大所大所大所大所大所大所人体各特特瑞特大萨达撒大萨达撒大师大儿童日个人退给他欢聚一堂聚一块一客流量规划 大萨达撒大萨达撒', '/images/3808.24441484218551573868044733.jpg', '/1.jpg');
INSERT INTO `traveler_user_shareall` VALUES ('27', '1', 'tom', '白云山风景名胜区域', '很快就的哈市科技大卡司大街上看来大家阿斯利康登记卡拉事件队列开始微弱温润我我若为打算看来大家阿斯利康大水坑绿多军绿付过过过过过为借口来加入未来科技人离开我打开了大家啊杀戮空间奥斯卡了大家按数量轻微起来看打死了看大家都来就立刻打三大框架阿拉打算大萨达撒群翁群无大萨达撒', '/images/1540.2602989616311573868338072.jpg', '/1.jpg');
INSERT INTO `traveler_user_shareall` VALUES ('28', '1', 'tom', '丹霞山风景名胜区', '大萨达撒多撒大萨达覆盖范围分为威风威风威风威风范文芳威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风分为非威风威风威风威风桃花源记还有图教育开口我刻录脱欧退还给积分换钢结构擐甲挥戈', '/images/4298.1384505981881573869791135.jpg', '/1.jpg');
INSERT INTO `traveler_user_shareall` VALUES ('29', '1', 'tom', '湛江七星岩风景名胜区', '大萨达大萨达等待哒哒哒哒哒哒多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多  哒哒哒哒哒哒多多多过付 嘎嘎嘎嘎嘎过过过过过过过过过过过过过过或或或或或或或或或或或或或或或或或或或或或或或或或结局解决军军军军军军军军军军军军军军军军军军军军军扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩', '/images/1945.30866538204171573884155606.jpg', '/1.jpg');
INSERT INTO `traveler_user_shareall` VALUES ('31', '1', 'tom', '湛江湖光岩风景名胜区', '的房间暗黑风嘎啦嘎尔感染而离开过还记得快两个月份的好感劳动法酷狗号发来工业燃料涵盖了各环节阿道夫老大哥哈弗德古拉国际化大发了个看哈乱风刀霜剑福克斯的恢复且为了乳房哈伦裤句废话把看到了较高的发哈饿了发大水接口返回拉尔夫哈利的时刻就发货时打开两极分化', '/images/9270.4356595039951574313284952.jpg', '/1.jpg');

-- ----------------------------
-- Table structure for `traveler_user_share_detail`
-- ----------------------------
DROP TABLE IF EXISTS `traveler_user_share_detail`;
CREATE TABLE `traveler_user_share_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `uname` varchar(25) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `detail` varchar(300) DEFAULT NULL,
  `pic` varchar(300) DEFAULT NULL,
  `avatar` varchar(300) DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of traveler_user_share_detail
-- ----------------------------
INSERT INTO `traveler_user_share_detail` VALUES ('24', '1', 'tom', '北岳泰山风景名胜区', '大萨达撒多多大萨达环境山卡拉涤魂圣枪爱空间大哈萨克暗示健康大厦良好的卡拉十点多撒大家卡萨丁哈萨克激烈的撒谎都是块级ad哈萨克了解到哈数据库来的哈三联看得见哈数据库来的哈萨克讲道理哈萨克大家拉屎的进口蜡圣诞节阿斯利康大大家好卡拉圣诞节开始啦很大声科技联合大厦框架类的哈萨克进来动画阿萨德加快点哈数据库的哈数据库刘德华撒即可领导哈斯离开大家奥斯卡德令哈市框架类的哈杀戮空间洪都拉斯看', '/images/9198.6873900491941573867904227.jpg+/images/5403.6997462673141573867904227.jpg+/images/252.40350407551571573867904227.jpg+/images/5299.5240931985421573867904227.jpg', '/1.jpg', '2019-11-11');
INSERT INTO `traveler_user_share_detail` VALUES ('25', '1', 'tom', '白云山风景名胜区', '奥术大师大所大所大所多群翁绕弯儿无群翁认为热无热无若 认为群若翁热无若翁绕弯儿翁热无若翁柔然翁热无若werewolf热污染翁认为热无若热污染翁热无若绕弯儿翁任务认为热热二位若翁热热二问 ', '/images/5876.9573058929941573867966115.jpg+/images/2584.73493105645371573867966115.jpg+/images/7885.5405767760181573867966115.jpg+/images/5891.7176144905591573867966115.jpg', '/1.jpg', '2019-11-11');
INSERT INTO `traveler_user_share_detail` VALUES ('26', '1', 'tom', '桂林山水风景名胜区', '大萨达大萨达撒多大萨达撒多未确认群翁撒多撒大所多大萨达撒大所大所大所大萨达撒大所大所大所大所大所大所大所人体各特特瑞特大萨达撒大萨达撒大师大儿童日个人退给他欢聚一堂聚一块一客流量规划 大萨达撒大萨达撒', '/images/4977.3731003134781573868044733.jpg+/images/5529.3003552418491573868044733.jpg+/images/9680.698899406341573868044733.jpg+/images/3808.24441484218551573868044733.jpg', '/1.jpg', '2019-11-11');
INSERT INTO `traveler_user_share_detail` VALUES ('27', '1', 'tom', '白云山风景名胜区域', '很快就的哈市科技大卡司大街上看来大家阿斯利康登记卡拉事件队列开始微弱温润我我若为打算看来大家阿斯利康大水坑绿多军绿付过过过过过为借口来加入未来科技人离开我打开了大家啊杀戮空间奥斯卡了大家按数量轻微起来看打死了看大家都来就立刻打三大框架阿拉打算大萨达撒群翁群无大萨达撒', '/images/2415.91141891589041573868338057.jpg+/images/3700.1961462113741573868338057.jpg+/images/5435.245451597331573868338057.jpg+/images/1540.2602989616311573868338072.jpg', '/1.jpg', '2019-11-11');
INSERT INTO `traveler_user_share_detail` VALUES ('28', '1', 'tom', '丹霞山风景名胜区', '大萨达撒多撒大萨达覆盖范围分为威风威风威风威风范文芳威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风威风分为非威风威风威风威风桃花源记还有图教育开口我刻录脱欧退还给积分换钢结构擐甲挥戈', '/images/4815.5234744584741573869791133.jpg+/images/7547.6117106604161573869791134.jpg+/images/647.68991108650871573869791134.jpg+/images/4298.1384505981881573869791135.jpg', '/1.jpg', '2019-11-11');
INSERT INTO `traveler_user_share_detail` VALUES ('29', '1', 'tom', '湛江七星岩风景名胜区', '大萨达大萨达等待哒哒哒哒哒哒多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多  哒哒哒哒哒哒多多多过付 嘎嘎嘎嘎嘎过过过过过过过过过过过过过过或或或或或或或或或或或或或或或或或或或或或或或或或结局解决军军军军军军军军军军军军军军军军军军军军军扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩', '/images/5954.2976711831971573884155605.jpg+/images/8388.1347950321291573884155606.jpg+/images/836.72506448194911573884155606.jpg+/images/1945.30866538204171573884155606.jpg', '/1.jpg', '2019-11-11');
INSERT INTO `traveler_user_share_detail` VALUES ('31', '1', 'tom', '湛江湖光岩风景名胜区', '的房间暗黑风嘎啦嘎尔感染而离开过还记得快两个月份的好感劳动法酷狗号发来工业燃料涵盖了各环节阿道夫老大哥哈弗德古拉国际化大发了个看哈乱风刀霜剑福克斯的恢复且为了乳房哈伦裤句废话把看到了较高的发哈饿了发大水接口返回拉尔夫哈利的时刻就发货时打开两极分化', '/images/930.07645518385911574313284951.jpg+/images/3750.9791763833311574313284951.jpg+/images/1252.23716729580881574313284952.jpg+/images/9270.4356595039951574313284952.jpg', '/1.jpg', '2019-11-11');
