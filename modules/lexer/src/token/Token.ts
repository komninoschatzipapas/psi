import { DebugInfoProvider } from 'error';

export default abstract class Token implements DebugInfoProvider {
  public abstract value: any;

  public start = {
    linePosition: -1,
    characterPosition: -1,
  };
  public end = {
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
