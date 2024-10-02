\connect engom;

create type public.token as (
  role roles,
  exp integer,
  user_id integer,
  is_admin boolean
);

create function public.authenticate(
  email text,
  password text
) returns public.token as $$
declare
  account public."user";
begin
  select u.* into account
    from public."user" as u
    where u.email = authenticate.email;

  if account.password_hash = crypt(password, account.password_hash) then
    return (
      account.role,
      extract(epoch from now() + interval '7 days'),
      account.id,
      account.role = 'admin'
    )::public.token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;
