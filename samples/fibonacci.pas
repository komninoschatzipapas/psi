{ Prints the first n fibonacci numbers }
program fibonacci;

var
  n: integer;
  a1: integer;
  a2: integer;
  i: integer;
  temp: integer;
begin
  n := 10;

  a1 := 1;
  a2 := 1;

  if n >= 1 then writeln(a1);

  if n >= 2 then
  begin
    writeln(a2);
  end;

  if n >= 3 then
    for i := 0 to n do
    begin
      temp := a2;
      a2 := a1 + a2;
      a1 := temp;
      writeln(a2);
    end;
end.