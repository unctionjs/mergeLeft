/* eslint-disable no-extra-parens */
import type from "@unction/type"
import key from "@unction/key"
import xstream from "xstream"

const mapping = {
  Array: (left: ArrayType): Function => (right: ArrayType): ArrayType => [
    ...right,
    ...left,
  ],
  Object: (left: ObjectType): Function => (right: ObjectType): ObjectType => ({
    ...right,
    ...left,
  }),
  // "Map": (left): Function => (right) => new Error("I have no idea how to merge a Map"),
  // "WeakMap": (left): Function => (right) => new Error("I have no idea how to merge a WeakMap"),
  // "Set": (left) => (right): Function => new Error("I have no idea how to merge a Set"),
  // "WeakSet": (left): Function => (right) => new Error("I have no idea how to merge a WeakSet"),
  String: (left: string): Function => (right: string): string => `${left}${right}`,
  // "Buffer": (left): Function => (right) => new Error("I have no idea how to merge a Buffer"),
  Stream: (left: StreamType): Function => (right: StreamType): StreamType => xstream.merge(right, left),
}

export default function mergeLeft (left: IterableType): Function {
  const leftType = type(left)

  return function mergeLeftLeft (right: IterableType): IterableType {
    return key(leftType)(mapping)(left)(right)
  }
}
