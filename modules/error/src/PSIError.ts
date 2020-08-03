import deepEqual from 'deep-equal';

export interface DebugInfoProviderLike {
  start: {
    linePosition: number;
    characterPosition: number;
  };
  end: {
    linePosition: number;
    characterPosition: number;
  };
}

export abstract class DebugInfoProvider implements DebugInfoProviderLike {
  start = {
    linePosition: -1,
    characterPosition: -1,
  };
  end = {
    linePosition: -1,
    characterPosition: -1,
  };

  public setPosition(line: number, character: number, type: 'start' | 'end') {
    this[type].linePosition = line;
    this[type].characterPosition = character;
    return this;
  }

  public inheritStartPositionFrom(positionProvider: {
    linePosition: number;
    characterPosition: number;
  }) {
    this.start.linePosition = positionProvider.linePosition;
    this.start.characterPosition = positionProvider.characterPosition;
    return this;
  }

  public inheritEndPositionFrom(positionProvider: {
    linePosition: number;
    characterPosition: number;
  }) {
    this.end.linePosition = positionProvider.linePosition;
    this.end.characterPosition = positionProvider.characterPosition;
    return this;
  }

  public inheritPositionFrom(fullPositionProvider: {
    start: {
      linePosition: number;
      characterPosition: number;
    };
    end: {
      linePosition: number;
      characterPosition: number;
    };
  }) {
    this.start.linePosition = fullPositionProvider.start.linePosition;
    this.start.characterPosition = fullPositionProvider.start.characterPosition;

    this.end.linePosition = fullPositionProvider.end.linePosition;
    this.end.characterPosition = fullPositionProvider.end.characterPosition;

    return this;
  }
}

export enum PSIErrorType {
  LexerError = 'LexerError',
  ParserError = 'ParserError',
}

export default class PSIError extends DebugInfoProvider {
  message: string;

  start: {
    linePosition: number;
    characterPosition: number;
  };
  end: {
    linePosition: number;
    characterPosition: number;
  };

  constructor(
    private readonly debugInfoProvider: DebugInfoProviderLike,
    message: string,
  ) {
    super();
    this.message = message;
    this.start = debugInfoProvider.start;
    this.end = debugInfoProvider.end;
  }
}

export function assert(
  debugInfoProvider: DebugInfoProviderLike,
  cond: any,
  message: string,
) {
  if (!cond) {
    throw new PSIError(debugInfoProvider, message);
  }
}

export function assertEquality(
  debugInfoProvider: DebugInfoProviderLike,
  obj1: any,
  obj2: any,
  message: string,
) {
  if (!deepEqual(obj1, obj2)) {
    throw new PSIError(debugInfoProvider, message);
  }
}
