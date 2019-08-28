class CaseInsensitiveMap<T, U> extends Map<T, U> {
  constructor(entries?: readonly (readonly [T, U])[] | null | undefined) {
    super(entries)
  }

  public set(key: T, value: U): this {
    if (typeof key === 'string') {
      key = <T><any>key.toUpperCase();
    }
    return Map.prototype.set.call(this, key, value) as this;
  }

  public get(key: T) {
    if (typeof key === 'string') {
      key = <T><any>key.toUpperCase();
    }
    return Map.prototype.get.call(this, key);
  }

  public delete(key: T) {
    if (typeof key === 'string') {
      key = <T><any>key.toUpperCase();
    }
    return Map.prototype.delete.call(this, key);
  }

  public has(key: T) {
    if (typeof key === 'string') {
      key = <T><any>key.toUpperCase();
    }
    return Map.prototype.has.call(this, key);
  }
}

export default CaseInsensitiveMap;