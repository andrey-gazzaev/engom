\connect engom;

CREATE TYPE roles AS ENUM ('admin', 'student', 'teacher');

/* Create user table in public schema */
CREATE TABLE public."user" (
    id SERIAL PRIMARY KEY,
    first_name varchar(255) NULL,
    last_name varchar(255) NULL,
    email varchar(30) NOT NULL,
    role roles NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.user IS 'App users.';

/* Create group table in public schema */
CREATE TABLE public.group (
    id SERIAL PRIMARY KEY,
    name varchar(30) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Create groupUser table in public schema */
CREATE TABLE public.groupUser (
    user_id INTEGER REFERENCES public."user" (id),
    group_id INTEGER REFERENCES public.group (id),
		primary key (user_id, group_id)
);
