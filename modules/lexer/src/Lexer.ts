import * as Token from './token';
import CaseInsensitiveMap from '@pascal-psi/case-insensitive-map';
import * as Types from '@pascal-psi/data-types';
import PSIError, { DebugInfoProvider } from '@pascal-psi/error';

export class Lexer {
  protected readonly reservedKeywords = new CaseInsensitiveMap<
    string,
    () => Token.Token
  >([
    ['PROGRAM', () => new Token.ProgramToken()],
    ['VAR', () => new Token.VariableToken()],
    ['BEGIN', () => new Token.BeginToken()],
    ['END', () => new Token.EndToken()],
    ['DIV', () => new Token.IntegerDivisionToken()],
    ['INTEGER', () => new Token.IntegerToken()],
    ['REAL', () => new Token.RealToken()],
    ['PROCEDURE', () => new Token.ProcedureToken()],
    ['TRUE', () => new Token.TrueToken()],
    ['FALSE', () => new Token.FalseToken()],
    ['BOOLEAN', () => new Token.BooleanToken()],
    ['IF', () => new Token.IfToken()],
    ['THEN', () => new Token.ThenToken()],
    ['ELSE', () => new Token.ElseToken()],
    ['CHAR', () => new Token.CharToken()],
    ['AND', () => new Token.AndToken()],
    ['OR', () => new Token.OrToken()],
    ['NOT', () => new Token.NotToken()],
    ['FOR', () => new Token.ForToken()],
    ['TO', () => new Token.ToToken()],
    ['DOWNTO', () => new Token.DownToToken()],
    ['DO', () => new Token.DoToken()],
    ['WHILE', () => new Token.WhileToken()],
    ['REPEAT', () => new Token.RepeatToken()],
    ['UNTIL', () => new Token.UntilToken()],
    ['ARRAY', () => new Token.ArrayToken()],
    ['OF', () => new Token.OfToken()],
  ]);

  private readonly numberRegex = /^\d$/;
  private readonly idFistCharacterRegex = /^[a-zA-Z_]$/;
  private readonly idRegex = /^[a-zA-Z0-9_]$/;
  private readonly whitespaceRegex = /^\s$/;

  private sourceCode: string;
  private position: number;
  private currentCharacter: string | null;

  public get linePosition(): number {
    return this.sourceCode.slice(0, this.position).split('\n').length;
  }

  public get characterPosition(): number {
    const lastNewline = this.sourceCode
      .slice(0, this.position)
      .lastIndexOf('\n');

    return lastNewline !== -1 ? this.position - lastNewline - 1 : this.position;
  }

  private getPositionMinus(a: number) {
    this.position -= a;
    const position = {
      linePosition: this.linePosition,
      characterPosition: this.characterPosition,
    };
    this.position += a;
    return position;
  }

  constructor(sourceCode: string) {
    this.sourceCode = sourceCode;
    this.position = 0;
    this.currentCharacter = this.sourceCode[this.position];
  }

  private peek(length = 1) {
    const peekPosition = this.position + length;

    if (peekPosition >= this.sourceCode.length) {
      return null;
    } else {
      return this.sourceCode.substring(this.position + 1, peekPosition + 1);
    }
  }

  private advance(length = 1) {
    this.position += length;

    if (this.position >= this.sourceCode.length) {
      return null;
    } else {
      return this.sourceCode[this.position];
    }
  }

  private whitespace() {
    while (
      this.currentCharacter !== null &&
      this.currentCharacter.match(this.whitespaceRegex)
    ) {
      this.currentCharacter = this.currentCharacter = this.advance();
    }
  }

  private comment() {
    const startPosition = {
      linePosition: this.linePosition,
      characterPosition: this.characterPosition,
    };

    while (
      this.currentCharacter != '}' &&
      (this.currentCharacter != '*' || this.peek() != ')')
    ) {
      if (this.currentCharacter === null) {
        throw new PSIError(
          {
            start: startPosition,
            end: this,
          },
          'Could not find closing comment bracket',
        );
      }
      this.currentCharacter = this.advance();
    }
    this.currentCharacter = this.advance(this.currentCharacter == '}' ? 1 : 3);
  }

  private number() {
    const startPosition = {
      linePosition: this.linePosition,
      characterPosition: this.characterPosition,
    };

    let number = '';
    while (
      this.currentCharacter !== null &&
      this.currentCharacter.match(this.numberRegex)
    ) {
      number += this.currentCharacter;
      this.currentCharacter = this.advance();
    }

    if (
      this.currentCharacter == '.' &&
      this.peek() != '.' // Fix conflicts with integer subrange type
    ) {
      number += this.currentCharacter;
      this.currentCharacter = this.advance();
      while (
        this.currentCharacter !== null &&
        this.currentCharacter.match(this.numberRegex)
      ) {
        number += this.currentCharacter;
        this.currentCharacter = this.advance();
      }

      return new Token.RealConstToken(new Types.PSIReal(parseFloat(number)))
        .inheritStartPositionFrom(startPosition)
        .inheritEndPositionFrom(this);
    } else {
      return new Token.IntegerConstToken(new Types.PSIInteger(parseInt(number)))
        .inheritStartPositionFrom(startPosition)
        .inheritEndPositionFrom(this);
    }
  }

  private id() {
    const startPosition = {
      linePosition: this.linePosition,
      characterPosition: this.characterPosition,
    };
    let id = '';
    while (
      this.currentCharacter !== null &&
      this.currentCharacter.match(this.idRegex)
    ) {
      id += this.currentCharacter;
      this.currentCharacter = this.advance();
    }
    if (this.reservedKeywords.has(id)) {
      return (this.reservedKeywords.get(id) as () => Token.Token)()
        .inheritStartPositionFrom(startPosition)
        .inheritEndPositionFrom(this);
    } else {
      return new Token.IdToken(id)
        .inheritStartPositionFrom(startPosition)
        .inheritEndPositionFrom(this);
    }
  }

  private characterConstant() {
    if (this.currentCharacter === null) {
      throw new PSIError(
        {
          start: this,
          end: this,
        },
        'Invalid character constant',
      );
    }
    const character = this.currentCharacter;
    this.currentCharacter = this.advance();
    if (this.currentCharacter != "'") {
      throw new PSIError(
        {
          start: this,
          end: this,
        },
        'Invalid character constant',
      );
    }
    this.currentCharacter = this.advance();
    return new Token.CharConstantToken(new Types.PSIChar(character))
      .inheritStartPositionFrom(this)
      .inheritEndPositionFrom(this);
  }

  public peekNextToken(): Token.Token {
    const oldPosition = this.position;
    const oldCurrentCharacter = this.currentCharacter;
    const token = this.getNextToken();
    this.position = oldPosition;
    this.currentCharacter = oldCurrentCharacter;
    return token;
  }

  public getNextToken(): Token.Token {
    while (this.currentCharacter != null) {
      if (this.currentCharacter.match(this.whitespaceRegex)) {
        this.whitespace();
        continue;
      } else if (
        this.currentCharacter == '{' ||
        (this.currentCharacter == '(' && this.peek() == '*')
      ) {
        this.comment();
        continue;
      } else if (this.currentCharacter == ':' && this.peek() == '=') {
        this.currentCharacter = this.advance(2);
        return new Token.AssignToken()
          .inheritStartPositionFrom(this.getPositionMinus(2))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == ';') {
        this.currentCharacter = this.advance();
        return new Token.SemiToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '+') {
        this.currentCharacter = this.advance();
        return new Token.PlusToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '-') {
        this.currentCharacter = this.advance();
        return new Token.MinusToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '*') {
        this.currentCharacter = this.advance();
        return new Token.MultiplicationToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '%') {
        this.currentCharacter = this.advance();
        return new Token.ModToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '/') {
        this.currentCharacter = this.advance();
        return new Token.RealDivisionToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '(') {
        this.currentCharacter = this.advance();
        return new Token.OpeningParenthesisToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == ')') {
        this.currentCharacter = this.advance();
        return new Token.ClosingParenthesisToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '.') {
        this.currentCharacter = this.advance();
        if (this.currentCharacter == '.') {
          this.currentCharacter = this.advance();
          return new Token.DoubleDotToken()
            .inheritStartPositionFrom(this.getPositionMinus(2))
            .inheritEndPositionFrom(this);
        } else {
          return new Token.DotToken()
            .inheritStartPositionFrom(this.getPositionMinus(1))
            .inheritEndPositionFrom(this);
        }
      } else if (this.currentCharacter == ':') {
        this.currentCharacter = this.advance();
        return new Token.ColonToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == ',') {
        this.currentCharacter = this.advance();
        return new Token.CommaToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '=') {
        this.currentCharacter = this.advance();
        return new Token.EqualsToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '<' && this.peek() == '>') {
        this.currentCharacter = this.advance(2);
        return new Token.NotEqualsToken()
          .inheritStartPositionFrom(this.getPositionMinus(2))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '>' && this.peek() == '=') {
        this.currentCharacter = this.advance(2);
        return new Token.GreaterEqualsToken()
          .inheritStartPositionFrom(this.getPositionMinus(2))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '<' && this.peek() == '=') {
        this.currentCharacter = this.advance(2);
        return new Token.LessEqualsToken()
          .inheritStartPositionFrom(this.getPositionMinus(2))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '>') {
        this.currentCharacter = this.advance();
        return new Token.GreaterThanToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '<') {
        this.currentCharacter = this.advance();
        return new Token.LessThanToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == '[') {
        this.currentCharacter = this.advance();
        return new Token.OpeningBracketToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == ']') {
        this.currentCharacter = this.advance();
        return new Token.ClosingBracketToken()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter == "'") {
        this.currentCharacter = this.advance();
        return this.characterConstant()
          .inheritStartPositionFrom(this.getPositionMinus(1))
          .inheritEndPositionFrom(this);
      } else if (this.currentCharacter.match(this.numberRegex)) {
        return this.number();
      } else if (this.currentCharacter.match(this.idFistCharacterRegex)) {
        return this.id();
      } else {
        throw new PSIError(
          {
            start: this,
            end: this,
          },
          `Undefined token '${this.currentCharacter}'`,
        );
      }
    }

    return new Token.EofToken().inheritPositionFrom({
      start: this,
      end: this,
    });
  }
}

export * from './token';
