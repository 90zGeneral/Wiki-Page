DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS articles CASCADE;


CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	title VARCHAR(50),
	department TEXT,
	full_time BOOLEAN,
	username TEXT,
	email TEXT,
	password TEXT
);

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50)
);

CREATE TABLE articles (
	id SERIAL PRIMARY KEY,
	title VARCHAR(150),
	content TEXT,
	date_written TIMESTAMP (2) WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	author_id INTEGER references authors,
	category_id INTEGER references categories
);




