use vote_app;

drop table candidates;
create table candidates(
    candidateId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cname varchar(255) NOT NULL UNIQUE
);


INSERT INTO candidates (cname) VALUES ("candidate1");
INSERT INTO candidates (cname) VALUES ("candidate2");
INSERT INTO candidates (cname) VALUES ("candidate3");
INSERT INTO candidates (cname) VALUES ("candidate4");


