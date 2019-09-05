import type from "@unction/type";
import {merge} from "most";
import {EnumerableType} from "./types";

export default function mergeLeft<A> (left: EnumerableType<A>) {
  return function mergeLeftLeft (right: EnumerableType<A>) {
    if (type(left) !== type(right)) {
      throw new Error(`mergeLeft received a ${type(left)} and ${type(right)} which aren't the same`);
    }

    switch (type(left)) {
      case "Array": {
        return [...right, ...left];
      }

      case "Object": {
        return {...right,
          ...left,
        };
      }

      case "Map": {
        return new Map([...right, ...left]);
      }

      case "Set": {
        return new Set([...right, ...left]);
      }

      case "String": {
        return `${right}${left}`;
      }

      case "Stream": {
        return merge(right, left);
      }

      default: {
        throw new Error(`mergeLeft doesn't know how to deal with ${type(left)}`);
      }
    }
  };
}
