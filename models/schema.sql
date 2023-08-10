use vote_app;

drop table users;
drop table candidates;

crezate table users(
    userId int not null auto_increment primary key,
    username varchar(255) not null unique,
    useremail varchar(255) not null unique,
    password varchar(255) not null,
    isvoted boolean not null default false,
    isadmin boolean not null default false,
    candidateId int default NULL,
    foreign key (candidateId) references candidates (candidateId)

)