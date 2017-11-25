/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, flowtype/require-variable-type, no-magic-numbers */
import {test} from "tap"
import xstream from "xstream"
import streamSatisfies from "@unction/streamsatisfies"

import mergeLeft from "./index"

test("Object", ({same, end}) => {
  const left = {
    alpha: "1",
    beta: "1",
  }
  const right = {
    alpha: "2",
    beta: "2",
    zeta: "3",
  }

  same(
    mergeLeft(left)(right),
    {
      alpha: "1",
      beta: "1",
      zeta: "3",
    }
  )

  end()
})

test("Array", ({same, end}) => {
  const left = [
    "a",
    "b",
  ]
  const right = [
    "c",
  ]

  same(
    mergeLeft(left)(right),
    [
      "c",
      "a",
      "b",
    ]
  )

  end()
})

test("String", ({same, end}) => {
  const left = "ab"
  const right = "c"

  same(
    mergeLeft(left)(right),
    "cab"
  )

  end()
})

test("Stream", ({equal, end}) => {
  const left = xstream.fromArray(["a", "b"])
  const right = xstream.of("c")

  streamSatisfies(
    "'c'---'a'---'b'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    ({length}) =>
      (position) => {
        equal(length, position)
        end()
      }
  )(
    mergeLeft(left)(right)
  )
})

test("MemoryStream", ({equal, end}) => {
  const left = xstream.fromArray(["a", "b"]).remember()
  const right = xstream.of("c").remember()

  streamSatisfies(
    "'c'---'a'---'b'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    ({length}) =>
      (position) => {
        equal(length, position)
        end()
      }
  )(
    mergeLeft(left)(right)
  )
})

test("Map", ({same, end}) => {
  const left = new Map([["a", "1"], ["b", "0"]])
  const right = new Map([["b", "2"], ["c", "3"]])

  same(
    mergeLeft(left)(right),
    new Map([["a", "1"], ["b", "0"], ["c", "3"]])
  )

  end()
})

test("Set", ({same, end}) => {
  const left = new Set(["a", "1", "b", "0"])
  const right = new Set(["b", "2", "c", "3"])

  same(
    mergeLeft(left)(right),
    new Set(["a", "1", "b", "0", "2", "c", "3"])
  )

  end()
})

test(({throws, end}) => {
  const left = {}
  const right = []

  throws(
    () => mergeLeft(left)(right)
  )

  end()
})

test(({throws, end}) => {
  const left = 1
  const right = 1

  throws(
    () => mergeLeft(left)(right)
  )

  end()
})
