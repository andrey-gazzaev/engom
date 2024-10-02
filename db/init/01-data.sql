\connect engom;

CREATE EXTENSION pgcrypto;

/* Create some dummy users */
INSERT INTO public."user" (first_name, last_name, email, role, password_hash) VALUES
('Chelsie', 'Stiedemann', 'Omari_Johns17@hotmail.com', 'student',  crypt('student', gen_salt('md5'))),
('Delphine', 'Davis', 'Amari.Yundt94@yahoo.com', 'student',  crypt('student', gen_salt('md5'))),
('Alda', 'Ankunding', 'Alene10@hotmail.com', 'student',  crypt('student', gen_salt('md5'))),
('Briana', 'Johns', 'Arlie_Gerlach@gmail.com', 'teacher',  crypt('teacher', gen_salt('md5'))),
('admin', 'admin', 'admin@engom.com', 'admin',  crypt('admin', gen_salt('md5')));

/* Create some dummy group*/
INSERT INTO public.group (name) VALUES
('A1 group'),
('B1 group');

/* Create some dummy posts*/
INSERT INTO public.groupUser (user_id, group_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 1),
(4, 2);

/* Create some dummy users */
INSERT INTO public.task (description) VALUES
('p1 ex3'),
('p5 ex5 and 6'),
('p153 ex8 and 9'),
('p1 ex4'),
('p3 ex2');

/* Create some dummy posts*/
INSERT INTO public.groupTask (task_id, group_id, lastSentAt) VALUES
(1, 1, null),
(2, 1, null),
(3, 2, null),
(4, 1, null),
(4, 2, null),
(5, 2, null);

INSERT INTO public.userTask (task_id, user_id, completedAt) VALUES
(1, 1, null),
(2, 1, null),
(3, 2, null),
(4, 1, null),
(4, 2, null),
(5, 2, null),
(5, 3, null);

/* Create some dummy users */
INSERT INTO public.vocabulary (origin, translation) VALUES
('Anxiety', 'Беспокойство'),
('Closet', 'Шкаф'),
('Bedroom', 'Спальня'),
('Mattress', 'Матрас'),
('Dinner', 'Обед');

INSERT INTO public.vocabularyTask (vocabulary_id, task_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 1),
(4, 1),
(5, 2);
