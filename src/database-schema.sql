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
	date_resolved date,
	description text not null,
	resolver int not null,
	status int not null,
	type int not null	
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
insert into expense_reimbursement.expense_role (role_id, expense_role) 
values (1, 'admin');
insert into expense_reimbursement.expense_role (role_id, expense_role) 
values (2, 'finance-manager');
insert into expense_reimbursement.expense_role (role_id, expense_role) 
values (3, 'user');

insert into expense_reimbursement.reimbursement_status (status_id, status)
values (1, 'Pending');
insert into expense_reimbursement.reimbursement_status (status_id, status)
values (2, 'Approved');
insert into expense_reimbursement.reimbursement_status (status_id, status)
values (3, 'Denied');

insert into expense_reimbursement.reimbursement_type (type_id, type)
values (1, 'Lodging');
insert into expense_reimbursement.reimbursement_type (type_id, type)
values (2, 'Travel');
insert into expense_reimbursement.reimbursement_type (type_id, type)
values (3, 'Food');
insert into expense_reimbursement.reimbursement_type (type_id, type)
values (4, 'Other');

insert into expense_reimbursement.expense_user (user_id, username, password, first_name, last_name, email, expense_role) 
values (1, 'raynor', 'marshall', 'Jim', 'Raynor', 'raynor@raynorsraiders.com', 1);
insert into expense_reimbursement.expense_user (user_id, username, password, first_name, last_name, email, expense_role) 
values (2, 'skerrigan', 'ghost', 'Sarah', 'Kerrigan', 'kerrigan@korhal.com', 2);
insert into expense_reimbursement.expense_user (user_id, username, password, first_name, last_name, email, expense_role) 
values (3, 'tassadar', 'khala', 'Tassadar', 'of Aiur', 'tassadar@aiur.com', 2);
insert into expense_reimbursement.expense_user (user_id, username, password, first_name, last_name, email, expense_role) 
values (4, 'nova', 'ghost', 'Nova', 'Terra', 'nova@tarsonis.com', 2);
insert into expense_reimbursement.expense_user (user_id, username, password, first_name, last_name, email, expense_role) 
values (5, 'artanis', 'templar', 'Artanis', 'the Hierarch', 'artanis@aiur.com', 3);
insert into expense_reimbursement.expense_user (user_id, username, password, first_name, last_name, email, expense_role) 
values (6, 'tychus', 'marine', 'Tychus', 'Findlay', 'tychus@raynorsraiders.com', 3);
insert into expense_reimbursement.expense_user (user_id, username, password, first_name, last_name, email, expense_role) 
values (7, 'mengsk', 'emperor', 'Arcturus', 'Mensgk', 'mengsk@terrandominion.com', 3);
insert into expense_reimbursement.expense_user (user_id, username, password, first_name, last_name, email, expense_role) 
values (8, 'zeratul', 'darktemplar', 'Zeratul', 'of the Nerazim', 'zeratul@nerazim.com', 3);

insert into expense_reimbursement.reimbursement (reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (1, 5, 145.6, '2018/6/15', '2018/6/25', 'Hotel on Aiur', 3, 2, 1);
insert into expense_reimbursement.reimbursement (reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (2, 5, 2040.15, '2018/6/17', '2018/6/25', 'Ship rental for trip to Aiur', 3, 3, 2);
insert into expense_reimbursement.reimbursement (reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (3, 6, 45.5, '2018/7/6', '2018/7/10', 'Dinner at Jim''s Steakhouse', 2, 2, 3);
insert into expense_reimbursement.reimbursement (reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (4, 6, 3680.23, '2018/7/20', '2018/7/25', 'Supplies for trip to Tarsonis', 4, 3, 4);
insert into expense_reimbursement.reimbursement (reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (5, 7, 340.09, '2019/1/23', null, 'Dinner meeting with clients on Tarsonis', 1, 1, 3);
insert into expense_reimbursement.reimbursement (reimbursement_id, author, amount, date_submitted, date_resolved, description, resolver, status, type)
values (6, 7, 1406.90, '2019/1/26', null, 'Transportation to Mar Sara', 1, 1, 2);