\connect engom;

create function completed_task(
	task_id integer,
	user_id integer
) returns date as $$
DECLARE
  curtime timestamp := now();
begin
	update public.userTask as ut
	set completedAt=curtime
	where ut.task_id=completed_task.task_id and ut.user_id=completed_task.user_id;

	return curtime;
end;
$$ LANGUAGE plpgsql;

create function uncompleted_task(
	task_id integer,
	user_id integer
) returns void as $$
begin
	update public.userTask as ut
	set completedAt=null
	where ut.task_id=uncompleted_task.task_id and ut.user_id=uncompleted_task.user_id;
end;
$$ LANGUAGE plpgsql;
