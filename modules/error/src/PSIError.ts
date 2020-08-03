import deepEqual from 'deep-equal';

export interface DebugInfoProvider {
  start: {
    linePosition: number;
    characterPosition: number;
  };
  end: {
    linePosition: number;
    characterPosition: number;
  };
}

export enum PSIErrorType {
  LexerError = 'LexerError',
  ParserError = 'ParserError',
}

export default class PSIError implements DebugInfoProvider {
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
    private readonly debugInfoProvider: DebugInfoProvider,
    message: string,
  ) {
    this.message = message;
    this.start = debugInfoProvider.start;
    this.end = debugInfoProvider.end;
  }
}

export function assert(
  debugInfoProvider: DebugInfoProvider,
  cond: any,
  message: string,
) {
  if (!cond) {
    throw new PSIError(debugInfoProvider, message);
  }
}

export function assertEquality(
  debugInfoProvider: DebugInfoProvider,
  obj1: any,
  obj2: any,
  message: string,
) {
  if (!deepEqual(obj1, obj2)) {
    throw new PSIError(debugInfoProvider, message);
  }
}
