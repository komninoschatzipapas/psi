block = declarations compound_statement
declarations = ("VAR" (variable_declaration ";")+ | procedure_declaration)*
variable_declaration = variable ("," variable)* ":" type
procedure_declaration = "PROCEDURE" ("(" procedure_parameters ")") ";" block ";"
procedure_parameters = (variable_declaration (";" variable_declaration)*)*
type = "INTEGER" | "REAL"
program = "PROGRAM" variable ";" block "."
compound_statement = "BEGIN" statement_list "END"
statement_list = statement (";" statement)*
statement = compound_statement | assignment_expression | empty
assignment_expression = variable ":=" expression
variable = [a-zA-Z][a-zA-Z0-9]*
empty =
term = factor (("*" | "div" | "/" | "%") factor)*
factor = INTEGER | "+" factor | "-" factor | "(" expression ")" | variable
