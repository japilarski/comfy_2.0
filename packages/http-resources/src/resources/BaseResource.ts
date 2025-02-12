import { toJson } from "../utils/toJson";

export abstract class BaseResource<T> {
  abstract toObject(): T;

  toString(): string {
    return toJson(this.toObject());
  }
}