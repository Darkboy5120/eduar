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
drop table if exists `aplication_comment_reaction`;
drop table if exists `aplication_comment`;
drop table if exists `aplication_download`;
drop table if exists `aplication_favorite`;
drop table if exists `aplication_endorsement`;
drop table if exists `aplication_interaction`;
drop table if exists `interaction`;
drop table if exists `aplication_image_background`;
drop table if exists `aplication_image_thumbnail`;
drop table if exists `aplication_image`;
drop table if exists `aplication_version`;
drop table if exists `aplication`;
drop table if exists `aplication_category`;
drop table if exists `verified_developer`;
drop table if exists `developer_karma_achievement`;
drop table if exists `developer`;
drop table if exists `consumer`;
drop table if exists `user_notification`;
drop table if exists `notification`;
drop table if exists `checker`;
drop table if exists `user_photo`;
drop table if exists `karma_achievement_progress`;
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
  `only_developers` varchar(50) not null,
  `goal_count` varchar(50) not null,
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
  `auth` varchar(28) not null,
  `registerdate` timestamp default current_timestamp not null,
  primary key(pk_email),
  unique key(auth)
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `karma_achievement_progress` (
  `fk_karma_achievement_id` smallint unsigned not null,
  `fk_user_id` varchar(50) not null,
  `checked` enum('0', '1') default '0' not null,
  `current_count` varchar(50) default '0' not null,
  primary key(fk_karma_achievement_id, fk_user_id),
  foreign key(fk_karma_achievement_id) references karma_achievement(pk_id) on delete cascade,
  foreign key(fk_user_id) references user(pk_email) on delete cascade
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
  primary key(fk_user_id),
  foreign key(fk_user_id) references user(pk_email) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification` (
  `type` varchar(25) not null,
  primary key(type)
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `user_notification` (
  `pk_id` smallint unsigned not null auto_increment,
  `fk_user_id` varchar(50) not null,
  `ischecked` enum("0", "1") not null,
  `fk_notification_type` varchar(25) not null,
  `registerdate` timestamp default current_timestamp not null,
  primary key(pk_id),
  foreign key(fk_user_id) references user(pk_email) on delete cascade,
  foreign key(fk_notification_type) references notification(type) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `consumer` (
  `fk_user_id` varchar(50) not null,
  primary key(fk_user_id),
  foreign key(fk_user_id) references user(pk_email) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `developer` (
  `fk_consumer_id` varchar(50) not null,
  `twitter` varchar(255) null,
  `facebook` varchar(255) null,
  `website` varchar(255) null,
  `linkedln` varchar(255) null,
  `github` varchar(255) null,
  primary key(fk_consumer_id),
  foreign key(fk_consumer_id) references consumer(fk_user_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `verified_developer` (
  `fk_developer_id` varchar(50) not null,
  `phone` varchar(15) not null,
  `backhumanidpath` varchar(255) null,
  `fronthumanidpath` varchar(255) null,
  `isverified` enum("0", "1") not null,
  `registerdate` timestamp default current_timestamp not null,
  primary key(fk_developer_id),
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
  primary key(fk_aplication_id, version),
  foreign key(fk_aplication_id) references aplication(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_image` (
  `pk_filepath` varchar(255) not null,
  `fk_aplication_id` smallint unsigned not null,
  primary key(pk_filepath),
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

create table `interaction` (
  `type` varchar(25) not null,
  primary key(type)
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_interaction` (
  `pk_id` smallint unsigned not null auto_increment,
  `fk_aplication_id` smallint unsigned not null,
  `fk_consumer_id` varchar(50) not null,
  `fk_interaction_type` varchar(25) not null,
  `registerdate` timestamp default current_timestamp not null,
  primary key(pk_id),
  foreign key(fk_aplication_id) references aplication(pk_id) on delete cascade,
  foreign key(fk_consumer_id) references consumer(fk_user_id) on delete cascade,
  foreign key(fk_interaction_type) references interaction(type) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_endorsement` (
  `fk_aplicationinteraction_id` smallint unsigned not null,
  `fk_aplicationinteraction_type` varchar(25) not null,
  primary key(fk_aplicationinteraction_id, fk_aplicationinteraction_type),
  foreign key(fk_aplicationinteraction_id) references aplication_interaction(pk_id) on delete cascade,
  foreign key(fk_aplicationinteraction_type) references aplication_interaction(fk_interaction_type) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_favorite` (
  `fk_aplicationinteraction_id` smallint unsigned not null,
  `fk_aplicationinteraction_type` varchar(25) not null,
  primary key(fk_aplicationinteraction_id, fk_aplicationinteraction_type),
  foreign key(fk_aplicationinteraction_id) references aplication_interaction(pk_id) on delete cascade,
  foreign key(fk_aplicationinteraction_type) references aplication_interaction(fk_interaction_type) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_download` (
  `fk_aplicationinteraction_id` smallint unsigned not null,
  `fk_aplicationinteraction_type` varchar(25) not null,
  primary key(fk_aplicationinteraction_id, fk_aplicationinteraction_type),
  foreign key(fk_aplicationinteraction_id) references aplication_interaction(pk_id) on delete cascade,
  foreign key(fk_aplicationinteraction_type) references aplication_interaction(fk_interaction_type) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_comment` (
  `pk_id` smallint unsigned not null auto_increment,
  `fk_aplicationinteraction_id` smallint unsigned not null,
  `comment` varchar(255) not null,
  primary key(pk_id),
  unique key(fk_aplicationinteraction_id),
  foreign key(fk_aplicationinteraction_id) references aplication_interaction(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `aplication_comment_reaction` (
  `pk_id` smallint unsigned not null auto_increment,
  `fk_reaction_id` smallint unsigned not null,
  `fk_aplicationcomment_id` smallint unsigned not null,
  `fk_consumer_id` varchar(50) not null,
  primary key(pk_id),
  unique key(fk_consumer_id, fk_aplicationcomment_id),
  foreign key(fk_reaction_id) references comment_reaction(pk_id) on delete cascade,
  foreign key(fk_aplicationcomment_id) references aplication_comment(fk_aplicationinteraction_id) on delete cascade,
  foreign key(fk_consumer_id) references consumer(fk_user_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_verified_developer` (
  `fk_verifieddeveloper_id` varchar(50) not null,
  `fk_usernotification_id` smallint unsigned not null,
  foreign key(fk_verifieddeveloper_id) references verified_developer(fk_developer_id) on delete cascade,
  foreign key(fk_usernotification_id) references user_notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_karma_achievement` (
  `fk_karmaachievement_id` smallint unsigned not null,
  `fk_usernotification_id` smallint unsigned not null,
  foreign key(fk_karmaachievement_id) references karma_achievement(pk_id) on delete cascade,
  foreign key(fk_usernotification_id) references user_notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_karma_level` (
  `fk_karmalevel_id` smallint unsigned not null,
  `fk_usernotification_id` smallint unsigned not null,
  foreign key(fk_karmalevel_id) references karma_level(pk_level) on delete cascade,
  foreign key(fk_usernotification_id) references user_notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_aplication_comment_reaction` (
  `fk_aplicationcommentreaction_id` smallint unsigned not null,
  `fk_usernotification_id` smallint unsigned not null,
  foreign key(fk_aplicationcommentreaction_id) references aplication_comment_reaction(pk_id) on delete cascade,
  foreign key(fk_usernotification_id) references user_notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_aplication_download` (
  `fk_aplicationdownload_id` smallint unsigned not null,
  `fk_usernotification_id` smallint unsigned not null,
  foreign key(fk_aplicationdownload_id) references aplication_download(fk_aplicationinteraction_id) on delete cascade,
  foreign key(fk_usernotification_id) references user_notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_aplication_endorsement` (
  `fk_aplicationendorsement_id` smallint unsigned not null,
  `fk_usernotification_id` smallint unsigned not null,
  foreign key(fk_aplicationendorsement_id) references aplication_endorsement(fk_aplicationinteraction_id) on delete cascade,
  foreign key(fk_usernotification_id) references user_notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_aplication_favorite` (
  `fk_aplicationfavorite_id` smallint unsigned not null,
  `fk_usernotification_id` smallint unsigned not null,
  foreign key(fk_aplicationfavorite_id) references aplication_favorite(fk_aplicationinteraction_id) on delete cascade,
  foreign key(fk_usernotification_id) references user_notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

create table `notification_aplication_comment` (
  `fk_aplicationcomment_id` smallint unsigned not null,
  `fk_usernotification_id` smallint unsigned not null,
  foreign key(fk_aplicationcomment_id) references aplication_comment(pk_id) on delete cascade,
  foreign key(fk_usernotification_id) references user_notification(pk_id) on delete cascade
) engine=InnoDB default charset=utf8 collate=utf8_unicode_ci;

insert into `aplication_category` (`name`) values
("Matemáticas"),
("Agronomía"),
("Física y astronomía"),
("Salud y producción animal"),
("Química"),
("Antropología y arqueología"),
("Sociología"),
("Biología"),
("Psicología"),
("Educación"),
("Ingenieria"),
("Arquitectura"),
("Urbanismo"),
("Geografía"),
("Artes"),
("Ciencias de la tierra"),
("Ciencias jurídicas y políticas"),
("Ciencias económicas y administrativas"),
("Tecnología y ciencias medicas"),
("Filosofía"),
("Linguistuca"),
("Literatura"),
("Historia"),
("Ciencias biomémicas"),
("Ciencias clínicas");

insert into `interaction` (`type`) values
("download"),
("endorsement"),
("favorite"),
("comment");

insert into `notification` (`type`) values
("aplication_comment"),
("aplication_download"),
("aplication_endorsement"),
("aplication_favorite"),
("comment_reaction"),
("karma_level"),
("karma_achievement"),
("verified_developer");

COMMIT;

START TRANSACTION;

insert into `user` (`pk_email`, `firstname`, `lastname`, `birthdate`, `auth`, `registerdate`) values ('hmaldonado0@ucol.mx', 'Hilario', 'Maldonado', '2024-02-02', '7ccGzpgo8QOly1SF1QFmKijnJPr2', '2022-04-18 15:03:31');
insert into `consumer` (`fk_user_id`) values ('hmaldonado0@ucol.mx');
insert into `karma_achievement` (
  `title`, `only_developers`,  `goal_count`, `description`, `pointsgain`
  ) values
  ('Amor a primera vista', '0', '1', 'Dale favorito a un AR por primera vez', '10'),
  ('Esto me gusta', '0', '1', 'Dale Me gusta a un AR por primera vez', '10'),
  ('Es hora de aprender', '0', '1', 'Descarga una AR por primera vez', '10'),
  ('Gracias por tu contribución! :)', '1', '1', 'Sube una AR por primera vez', '30');
insert into `karma_level` (`minpoints`, `maxpoints`, `description`) values
  ('0', '50', 'Parece que acabas de crear tu cuenta, te invitamos a descargar de las AR que Eduar tiene para ti'),
  ('50', '100', 'Este es el segundo nivel, quiere decir que ya has interactuado un poco con Eduar y conoces de que trata la plataforma, gracias a miembros como tu Eduar esta creciendo'),
  ('100', '150', 'Gracias por seguirte interesando por Eduar, estas contribuyendo a la educación de mucha gente, sigue asi!');

COMMIT;
