if
  : "IF" expression "THEN" statement
  ;

if_statement
  : if ("ELSE" if)* ("ELSE" statement)?
  ;

block
  : declarations compound_statement
  ;

declarations
  : ("VAR" (variable_declaration ";")+ | procedure_declaration)*
  ;

variable_declaration
  : variable ("," variable)* ":" type
  ;

procedure_declaration
  : "PROCEDURE" ("(" procedure_parameters ")") ";" block ";"
  ;

procedure_parameters
  : (variable_declaration (";" variable_declaration)*)*
  ;

type
  : "INTEGER"
  | "REAL"
  | "BOOLEAN"
  | "CHAR"
  ;

program
  : "PROGRAM" variable ";" block "."
  ;

compound_statement
  : "BEGIN" statement_list "END"
  ;

statement_list:
  : statement (";" statement)*
  ;

statement
  : compound_statement
  | assignment_expression
  | if_statement
  | empty
  ;

assignment_expression
  : variable ":=" expression
  ;

variable:
  [a-zA-Z][a-zA-Z0-9]*
  ;

empty
  :
  ;

term
  : comparison (("*" | "div" | "/" | "%") term)*
  ;

comparison:
  : factor (("=" | "<>" | "<" | ">" | "<=" | ">=") comparison)*
  ;

factor
  : INTEGER
  | "+" factor
  | "-" factor
  | "(" expression ")"
  | variable
  | "TRUE"
  | "FALSE"
  | character_constant
  ;

character_constant
  : "'" UTF16_CHARACTER "'"