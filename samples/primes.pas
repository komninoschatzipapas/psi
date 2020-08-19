{ Prints all the prime numbers in the range 1..n }
program primes;

var
  n: integer;
  p: array[1..100] of boolean;
  i: integer;
  j: integer;
begin
  n := 100;

  for i := 1 to 100 do
  begin
    p[i] := true
  end;

  for i := 2 to 100 do
  begin
    if p[i] then
    begin
      j := i * i;
      while j <= 100 do
      begin
        p[j] := false;
        j = j + i;
      end;
    end;
  end;

  for i := 1 to 100 do
  begin
    if p[i] then writeln[i];
  end;

end.