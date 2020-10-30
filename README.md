# PSI [![Gitter](https://badges.gitter.im/pascal-psi/community.svg)](https://gitter.im/pascal-psi/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

This is a Work-in-Progress ISO 7185 Pascal interpreter I am building in order to get confident with lexers, parsers, interpreters and all that good stuff. All PRs are welcomed and for any question you can join our [gitter chat](https://gitter.im/pascal-psi/community)!

## Installation

To install the CLI, execute the following command:

```
npm install -g @pascal-psi/cli
```

or with Yarn

```
yarn global add @pascal-psi/cli
```

## Usage

`psi <file to interpret>`

## Demos

There are demo programs you can try running in the [demos](demos) directory

## Build

This project is structured as a monorepo using [Lerna](https://github.com/lerna/lerna).

In order to build the project, first install lerna

```
npm install -g lerna
```

or with Yarn:

```
yarn global add lerna
```

And then run `lerna bootstrap` on the root directory. This will install all the dependencies for all the modules and link them together.

If you want to run the CLI, run the `/modules/cli/bin/run` file

## Support:

- Data types
  - Integer (Does not support scientific notation)
  - Real (Does not support scientific notation)
  - Boolean
  - Char
  - Arrays
- Variables
- Procedures
- Functions
- Flow Control
  - If
  - Else If
  - Else
- Loops
  - For...Do
  - While...Do
  - Repeat...Until
- Numerical Operators
  - Addition (+)
  - Subtraction (-)
  - Multiplication (\*)
  - Division (/)
  - Integer Division (div)
  - Modulus (mod)
- Logical Operators
  - AND
  - OR
  - NOT
- Comparison Operators
  - Equals (=)
  - Not Equals (<>)
  - Less than (<)
  - Less or Equal than (<=)
  - Greater than (>)
  - Greater or Equal than (>=)
- Library
  - Write
  - WrtiteLn

## Contributing

Please join the [gitter chat](https://gitter.im/pascal-psi/community) if you are interested in contributing to this project.
