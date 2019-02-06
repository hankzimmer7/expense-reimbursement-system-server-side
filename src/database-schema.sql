-- Code to initially create and populate the sql database

--Make the schema
drop schema if exists expense_reimbursement cascade;
create schema expense_reimbursement;

-- Create the tables
create table expense_reimbursement.expense_user
(
	user_id serial primary key,
	username varchar(20) not null unique,
	password varchar(20) not null,
	first_name varchar(30) not null,
	last_name varchar(30) not null,
	email varchar(30) not null,
	expense_role int not null
);

create table expense_reimbursement.expense_role
(
	role_id serial primary key,
	expense_role varchar(20) not null unique
);

create table expense_reimbursement.reimbursement
(	
	reimbursement_id serial primary key,
	author int not null,
	amount decimal not null,
	date_submitted date not null,
	date_resolved date not null,
	description text not null,
	resolver int,
	status int not null,
	type int
);

create table expense_reimbursement.reimbursement_status
(
	status_id serial primary key,
	status varchar(10) not null unique
);

create table expense_reimbursement.reimbursement_type
(
	type_id serial primary key,
	type varchar(10) not null unique
);

-- Add the foreign keys
alter table expense_reimbursement.expense_user
add constraint fk_role 
foreign key (expense_role) references expense_reimbursement.expense_role (role_id)
on delete cascade on update cascade;

alter table expense_reimbursement.reimbursement
add constraint fk_reimbursement_author 
foreign key (author) references expense_reimbursement.expense_user (user_id)
on delete cascade on update cascade;

alter table expense_reimbursement.reimbursement
add constraint fk_reimbursement_resolver
foreign key (resolver) references expense_reimbursement.expense_user (user_id)
on delete cascade on update cascade;

alter table expense_reimbursement.reimbursement
add constraint fk_reimbursement_status
foreign key (status) references expense_reimbursement.reimbursement_status (status_id)
on delete cascade on update cascade;

alter table expense_reimbursement.reimbursement
add constraint fk_reimbursement_type
foreign key (type) references expense_reimbursement.reimbursement_type (type_id)
on delete cascade on update cascade;

-- Populate tables
insert into expense_reimbursement.expense_role (expense_role) 
values ('admin');
insert into expense_reimbursement.expense_role (expense_role) 
values ('finance-manager');
insert into expense_reimbursement.expense_role (expense_role) 
values ('user');

insert into expense_reimbursement.reimbursement_status (status)
values ('Pending');
insert into expense_reimbursement.reimbursement_status (status)
values ('Approved');
insert into expense_reimbursement.reimbursement_status (status)
values ('Denied');

insert into expense_reimbursement.reimbursement_type (type)
values ('Lodging');
insert into expense_reimbursement.reimbursement_type (type)
values ('Travel');
insert into expense_reimbursement.reimbursement_type (type)
values ('Food');
insert into expense_reimbursement.reimbursement_type (type)
values ('Other');

insert into expense_reimbursement.expense_user (username, password, first_name, last_name, email, expense_role) 
values ('raynor', 'marshall', 'Jim', 'Raynor', 'raynor@raynorsraiders.com', 1);
insert into expense_reimbursement.expense_user (username, password, first_name, last_name, email, expense_role) 
values ('skerrigan', 'ghost', 'Sarah', 'Kerrigan', 'kerrigan@korhal.com', 2);
insert into expense_reimbursement.expense_user (username, password, first_name, last_name, email, expense_role) 
values ('tassadar', 'khala', 'Tassadar', 'of Aiur', 'tassadar@aiur.com', 2);
insert into expense_reimbursement.expense_user (username, password, first_name, last_name, email, expense_role) 
values ('nova', 'ghost', 'Nova', 'Terra', 'nova@tarsonis.com', 2);
insert into expense_reimbursement.expense_user (username, password, first_name, last_name, email, expense_role) 
values ('artanis', 'templar', 'Artanis', 'the Hierarch', 'artanis@aiur.com', 3);
insert into expense_reimbursement.expense_user (username, password, first_name, last_name, email, expense_role) 
values ('tychus', 'marine', 'Tychus', 'Findlay', 'tychus@raynorsraiders.com', 3);
insert into expense_reimbursement.expense_user (username, password, first_name, last_name, email, expense_role) 
values ('mengsk', 'emperor', 'Arcturus', 'Mensgk', 'mengsk@terrandominion.com', 3);
insert into expense_reimbursement.expense_user (username, password, first_name, last_name, email, expense_role) 
values ('zeratul', 'darktemplar', 'Zeratul', 'of the Nerazim', 'zeratul@nerazim.com', 3);


insert into expense_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (5, 145.6, '2018/6/15', '2018/6/25', 'Hotel on Aiur', 3, 2, 1);
insert into expense_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (5, 2040.15, '2018/6/17', '2018/6/25', 'Ship rental for trip to Aiur', 3, 3, 2);
insert into expense_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (6, 45.5, '2018/7/6', '2018/7/10', 'Dinner at Jim''s Steakhouse', 2, 2, 3);
insert into expense_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (6, 3680.23, '2018/7/20', '2018/7/25', 'Supplies for trip to Tarsonis', 4, 3, 4);
insert into expense_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (7, 340.09, '2019/1/23', '1970/1/1', 'Dinner meeting with clients on Tarsonis', 1, 1, 3);
insert into expense_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (7, 1406.90, '2019/1/26', '1970/1/1', 'Transportation to Mar Sara', 1, 1, 2);
insert into expense_reimbursement.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (8, 530, '2018/5/26', '2018/5/28', 'Parts for fixing ship', 3, 2, 4);