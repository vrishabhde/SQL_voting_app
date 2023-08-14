use vote_app;

drop table users;
drop table candidates;


create table candidates(
    candidateid int not null auto_increment primary key,
    candidate_name varchar(255) not null unique
);

create table users(
    userId int not null auto_increment primary key,
    username varchar(255) not null unique,
    useremail varchar(255) not null unique,
    password varchar(255) not null,
    isvoted boolean not null default FALSE,
    isadmin boolean not null default FALSE,
    candidateId int default NULL,
    foreign key (candidateId) references candidates (candidateId)

);



