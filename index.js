/* eslint-disable max-statements */
import type from "@unction/type"
import xstream from "xstream"

export default function mergeLeft (left: FunctorType): Function {
  return function mergeLeftLeft (right: FunctorType): FunctorType {
    if (type(left) !== type(right)) {
      throw new Error(`mergeLeft received a ${type(left)} and ${type(right)} which aren't the same`)
    }

    switch (type(left)) {
      case "Array": {
        return [
          ...right,
          ...left,
        ]
      }

      case "Object": {
        return {
          ...right,
          ...left,
        }
      }

      case "Map": {
        return new Map([
          ...right,
          ...left,
        ])
      }

      case "Set": {
        return new Set([
          ...right,
          ...left,
        ])
      }

      case "String": {
        return `${left}${right}`
      }

      case "Buffer": {
        throw new Error(`mergeLeft doesn't know how to deal with ${type(left)}`)
      }

      case "Stream":
      case "MemoryStream": {
        return xstream.merge(left, right)
      }

      default: {
        throw new Error(`mergeLeft doesn't know how to deal with ${type(left)}`)
      }
    }
  }
}
