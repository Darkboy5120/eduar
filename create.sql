SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

drop table if exists `notification_aplication_comment`;
drop table if exists `notification_aplication_favorite`;
drop table if exists `notification_aplication_endorsement`;
drop table if exists `notification_aplication_download`;
drop table if exists `notification_aplication_comment_reaction`;
drop table if exists `notification_karma_level`;
drop table if exists `notification_karma_achievement`;
drop table if exists `notification_verified_developer`;
drop table if exists `developer_karma_achievement`;
drop table if exists `aplication_comment_reaction`;
drop table if exists `aplication_comment`;
drop table if exists `aplication_download`;
drop table if exists `aplication_favorite`;
drop table if exists `aplication_endorsement`;
drop table if exists `aplication_unique_interaction`;
drop table if exists `aplication_image_background`;
drop table if exists `aplication_image_thumbnail`;
drop table if exists `aplication_image`;
drop table if exists `aplication_version`;
drop table if exists `aplication`;
drop table if exists `aplication_category`;
drop table if exists `verified_developer`;
drop table if exists `developer`;
drop table if exists `consumer`;
drop table if exists `notification`;
drop table if exists `checker`;
drop table if exists `user_photo`;
drop table if exists `user`;
drop table if exists `comment_reaction`;
drop table if exists `karma_achievement`;
drop table if exists `karma_level`;

create table `karma_level` (
  `pk_level` smallint unsigned not null auto_increment,
  `description` varchar(255) not null,
  `minpoints` smallint not null,
  `maxpoints` smallint not null,
  primary key(pk_level)
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `karma_achievement` (
  `pk_id` smallint unsigned not null auto_increment,
  `title` varchar(50) not null,
  `description` varchar(255) not null,
  `pointsgain` smallint not null,
  primary key(pk_id),
  unique key(title)
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `comment_reaction` (
  `pk_id` smallint unsigned not null auto_increment,
  `name` varchar(50) not null,
  primary key(pk_id),
  unique key(name)
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `user` (
  `pk_email` varchar(50) not null,
  `firstname` varchar(50) not null,
  `lastname` varchar(50) not null,
  `birthdate` date not null,
  `password` varchar(255) not null,
  primary key(pk_email)
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `user_photo` (
  `fk_user_id` varchar(50) not null,
  `filepath` varchar(255) not null,
  unique key(fk_user_id),
  unique key(filepath),
  foreign key(fk_user_id) references user(pk_email) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `checker` (
  `fk_user_id` varchar(50) not null,
  unique key(fk_user_id),
  foreign key(fk_user_id) references user(pk_email) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification` (
  `pk_id` smallint unsigned not null auto_increment,
  `fk_user_id` varchar(50) not null,
  `ischecked` enum("0", "1") not null,
  `type` enum("0", "1", "2", "3", "4", "5", "6", "7") not null,
  `registerdate` timestamp default current_timestamp not null,
  primary key(pk_id),
  foreign key(fk_user_id) references user(pk_email) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `consumer` (
  `fk_user_id` varchar(50) not null,
  unique key(fk_user_id),
  foreign key(fk_user_id) references user(pk_email) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `developer` (
  `fk_consumer_id` varchar(50) not null,
  `twitter` varchar(255) null,
  `facebook` varchar(255) null,
  `website` varchar(255) null,
  `linkedln` varchar(255) null,
  `github` varchar(255) null,
  foreign key(fk_consumer_id) references consumer(fk_user_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `verified_developer` (
  `fk_developer_id` varchar(50) not null,
  `phone` varchar(15) not null,
  `backhumanidpath` varchar(255) null,
  `fronthumanidpath` varchar(255) null,
  `isverified` enum("0", "1") not null,
  `registerdate` timestamp default current_timestamp not null,
  unique key(fk_developer_id),
  unique key(phone),
  foreign key(fk_developer_id) references developer(fk_consumer_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_category` (
  `pk_id` smallint unsigned not null auto_increment,
  `name` varchar(50) not null,
  primary key(pk_id),
  unique key(name)
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication` (
  `pk_id` smallint unsigned not null auto_increment,
  `fk_developer_id` varchar(50) not null,
  `fk_aplicationcategory_id` smallint unsigned not null not null,
  `name` varchar(50) not null,
  `filepath` varchar(255) not null,
  `description` varchar(255) not null,
  `github` varchar(255) null,
  `lastupdate` timestamp default current_timestamp not null,
  `registerdate` timestamp default current_timestamp not null,
  primary key(pk_id),
  unique key(fk_developer_id),
  unique key(name),
  unique key(filepath),
  foreign key(fk_developer_id) references developer(fk_consumer_id) on delete cascade,
  foreign key(fk_aplicationcategory_id) references aplication_category(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_version` (
  `fk_aplication_id` smallint unsigned not null,
  `title` varchar(50) not null,
  `description` varchar(255) not null,
  `version` decimal(5,3) not null,
  `registerdate` timestamp default current_timestamp not null,
  unique key(fk_aplication_id, version),
  foreign key(fk_aplication_id) references aplication(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_image` (
  `pk_filepath` varchar(255) not null,
  `fk_aplication_id` smallint unsigned not null,
  primary key(pk_filepath),
  unique key(fk_aplication_id),
  foreign key(fk_aplication_id) references aplication(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_image_thumbnail` (
  `fk_aplication_id` smallint unsigned not null,
  `fk_aplicationimage_id` varchar(255) not null,
  unique key(fk_aplication_id),
  unique key(fk_aplicationimage_id),
  foreign key(fk_aplication_id) references aplication(pk_id) on delete cascade,
  foreign key(fk_aplicationimage_id) references aplication_image(pk_filepath) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_image_background` (
  `fk_aplication_id` smallint unsigned not null,
  `fk_aplicationimage_id` varchar(255) not null,
  unique key(fk_aplication_id),
  unique key(fk_aplicationimage_id),
  foreign key(fk_aplication_id) references aplication(pk_id) on delete cascade,
  foreign key(fk_aplicationimage_id) references aplication_image(pk_filepath) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_unique_interaction` (
  `pk_id` smallint unsigned not null auto_increment,
  `fk_aplication_id` smallint unsigned not null,
  `fk_consumer_id` varchar(50) not null,
  `registerdate` timestamp default current_timestamp not null,
  primary key(pk_id),
  unique key(fk_aplication_id, fk_consumer_id),
  foreign key(fk_aplication_id) references aplication(pk_id) on delete cascade,
  foreign key(fk_consumer_id) references consumer(fk_user_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_endorsement` (
  `fk_aplicationuniqueinteraction_id` smallint unsigned not null,
  foreign key(fk_aplicationuniqueinteraction_id) references aplication_unique_interaction(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_favorite` (
  `fk_aplicationuniqueinteraction_id` smallint unsigned not null,
  foreign key(fk_aplicationuniqueinteraction_id) references aplication_unique_interaction(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_download` (
  `fk_aplicationuniqueinteraction_id` smallint unsigned not null,
  foreign key(fk_aplicationuniqueinteraction_id) references aplication_unique_interaction(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_comment` (
  `pk_id` smallint unsigned not null auto_increment,
  `fk_aplication_id` smallint unsigned not null,
  `fk_consumer_id` varchar(50) not null,
  `comment` varchar(255) not null,
  `registerdate` timestamp default current_timestamp not null,
  primary key(pk_id),
  unique key(fk_aplication_id, fk_consumer_id),
  foreign key(fk_aplication_id) references aplication(pk_id) on delete cascade,
  foreign key(fk_consumer_id) references consumer(fk_user_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_comment_reaction` (
  `pk_id` smallint unsigned not null auto_increment,
  `fk_reaction_id` smallint unsigned not null,
  `fk_aplicationcomment_id` smallint unsigned not null,
  `fk_consumer_id` varchar(50) not null,
  primary key(pk_id),
  unique key(fk_consumer_id, fk_aplicationcomment_id),
  foreign key(fk_reaction_id) references comment_reaction(pk_id) on delete cascade,
  foreign key(fk_aplicationcomment_id) references aplication_comment(pk_id) on delete cascade,
  foreign key(fk_consumer_id) references consumer(fk_user_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `developer_karma_achievement` (
  `fk_developer_id` varchar(50) not null,
  `fk_karmaachievement_id` smallint unsigned not null,
  `registerdate` timestamp default current_timestamp not null,
  unique key(fk_developer_id, fk_karmaachievement_id),
  foreign key(fk_developer_id) references developer(fk_consumer_id) on delete cascade,
  foreign key(fk_karmaachievement_id) references karma_achievement(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_verified_developer` (
  `fk_verifieddeveloper_id` varchar(50) not null,
  `fk_notification_id` smallint unsigned not null,
  foreign key(fk_verifieddeveloper_id) references verified_developer(fk_developer_id) on delete cascade,
  foreign key(fk_notification_id) references notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_karma_achievement` (
  `fk_karmaachievement_id` smallint unsigned not null,
  `fk_notification_id` smallint unsigned not null,
  foreign key(fk_karmaachievement_id) references karma_achievement(pk_id) on delete cascade,
  foreign key(fk_notification_id) references notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_karma_level` (
  `fk_karmalevel_id` smallint unsigned not null,
  `fk_notification_id` smallint unsigned not null,
  foreign key(fk_karmalevel_id) references karma_level(pk_level) on delete cascade,
  foreign key(fk_notification_id) references notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_aplication_comment_reaction` (
  `fk_aplicationcommentreaction_id` smallint unsigned not null,
  `fk_notification_id` smallint unsigned not null,
  foreign key(fk_aplicationcommentreaction_id) references aplication_comment_reaction(pk_id) on delete cascade,
  foreign key(fk_notification_id) references notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_aplication_download` (
  `fk_aplicationdownload_id` smallint unsigned not null,
  `fk_notification_id` smallint unsigned not null,
  foreign key(fk_aplicationdownload_id) references aplication_download(fk_aplicationuniqueinteraction_id) on delete cascade,
  foreign key(fk_notification_id) references notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_aplication_endorsement` (
  `fk_aplicationendorsement_id` smallint unsigned not null,
  `fk_notification_id` smallint unsigned not null,
  foreign key(fk_aplicationendorsement_id) references aplication_endorsement(fk_aplicationuniqueinteraction_id) on delete cascade,
  foreign key(fk_notification_id) references notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_aplication_favorite` (
  `fk_aplicationfavorite_id` smallint unsigned not null,
  `fk_notification_id` smallint unsigned not null,
  foreign key(fk_aplicationfavorite_id) references aplication_favorite(fk_aplicationuniqueinteraction_id) on delete cascade,
  foreign key(fk_notification_id) references notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_aplication_comment` (
  `fk_aplicationcomment_id` smallint unsigned not null,
  `fk_notification_id` smallint unsigned not null,
  foreign key(fk_aplicationcomment_id) references aplication_comment(pk_id) on delete cascade,
  foreign key(fk_notification_id) references notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

COMMIT;