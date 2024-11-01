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

create function available_group_tasks(
	group_id integer
) returns setof public.task as $$
	select pt.* from public.task as pt
	where pt.id not in (
		select id from public.task
		left join public.groupTask as gt on gt.task_id = id
		where available_group_tasks.group_id = gt.group_id
	);
$$ language sql stable;
