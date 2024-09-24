\connect engom;

/* Create some dummy users */
INSERT INTO public.user (first_name, last_name, email, role) VALUES
('Chelsie', 'Stiedemann', 'Omari_Johns17@hotmail.com', 'student'),
('Delphine', 'Davis', 'Amari.Yundt94@yahoo.com', 'student'),
('Alda', 'Ankunding', 'Alene10@hotmail.com', 'student');
('Briana', 'Johns', 'Arlie_Gerlach@gmail.com', 'teacher');
('admin', 'admin', 'admin@engom.com', 'admin');

/* Create some dummy group*/
INSERT INTO public.group (name) VALUES
('A1 group'),
('B1 group'),

/* Create some dummy posts*/
INSERT INTO public.groupUser (user_id, group_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 1),
(4, 2),
