\connect engom;

CREATE role "admin";
CREATE role "student";
CREATE role "teacher";

GRANT ALL ON ALL TABLES IN SCHEMA public TO "admin";
GRANT ALL ON ALL TABLES IN SCHEMA public TO "student";
GRANT ALL ON ALL TABLES IN SCHEMA public TO "teacher";
