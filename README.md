# PSI [![Gitter](https://badges.gitter.im/pascal-psi/community.svg)](https://gitter.im/pascal-psi/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
This is a Work-in-Progress ISO 7185 Pascal interpreter I am building in order to get confident with lexers, parsers, interpreters and all that good stuff. All PRs are wellcome and for any question you can join our [gitter chat](https://gitter.im/pascal-psi/community)!

### Currently supports:
* Data types
  * Integer
  * Real
  * Boolean
  * Char
* Variables
* Procedures
* Flow Control
  * If
  * Else If
  * Else
* Number Operators
  * Addition (+)
  * Subtraction (-)
  * Multiplication (*)
  * Division (div)
  * Integer Division (/)
  * Modulus (mod)
* Logical Operators
  * AND
  * OR
  * NOT
* Comparison Operators
  * Equals (=)
  * Not Equals (<>)
  * Less than (<)
  * Less or Equal than (<=)
  * Greater than (>)
  * Greater or Equal than (>=)

**WARNING:** The current version of the interpreter does not feature type promotion meaning that using `1` as an if condition for example will result in an error since `1` is strictly not a boolean.
