\connect engom;

CREATE TYPE roles AS ENUM ('admin', 'student', 'teacher');

/* Create user table in public schema */
CREATE TABLE public."user" (
    id SERIAL PRIMARY KEY,
    first_name varchar(255) NULL,
    last_name varchar(255) NULL,
    email varchar(30) NOT NULL,
    role roles NOT NULL,
	password_hash varchar(255) NOT NULL,
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

/* Create task table in public schema */
CREATE TABLE public.task (
    id SERIAL PRIMARY KEY,
    description varchar(255) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Create groupTask table in public schema */
CREATE TABLE public.groupTask (
    task_id INTEGER REFERENCES public.task (id),
    group_id INTEGER REFERENCES public.group (id),
    lastSentAt TIMESTAMP DEFAULT NULL,
    primary key (task_id, group_id)
);

/* Create userTask table in public schema */
CREATE TABLE public.userTask (
    task_id INTEGER REFERENCES public.task (id),
    user_id INTEGER REFERENCES public."user" (id),
    completedAt TIMESTAMP DEFAULT NULL,
    primary key (user_id, task_id)
);

/* Create task table in public schema */
CREATE TABLE public.vocabulary (
    id SERIAL PRIMARY KEY,
    origin varchar(255) NOT NULL,
    translation varchar(255) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Create vocabularyTask table in public schema */
CREATE TABLE public.vocabularyTask (
    vocabulary_id INTEGER REFERENCES public.vocabulary (id),
    task_id INTEGER REFERENCES public.task (id),
    primary key (vocabulary_id, task_id)
);
