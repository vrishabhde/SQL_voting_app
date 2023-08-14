use vote_app;

drop table users;
create table users(
    userId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) NOT NULL UNIQUE,
    useremail varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    isvoted boolean NOT NULL default false,
    isadmin boolean NOT NULL default false,
    candidateId int default NULL,
    foreign key (candidateId) references candidates (candidateId)
);




INSERT INTO users (username,useremail, password) VALUES ("user1", "user1@123", "12457878");