/* eslint-disable flowtype/require-variable-type, no-magic-numbers */
import {test} from "tap"
import {of} from "most"
import streamSatisfies from "@unction/streamsatisfies"

import mergeLeft from "./index"

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

test("Set", ({same, end}) => {
  const left = new Set(["a", "1", "b", "0"])
  const right = new Set(["b", "2", "c", "3"])

  same(
    mergeLeft(left)(right),
    new Set(["a", "1", "b", "0", "2", "c", "3"])
  )

  end()
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

test("String", ({same, end}) => {
  const left = "ab"
  const right = "c"

  same(
    mergeLeft(left)(right),
    "cab"
  )

  end()
})

test("Stream", ({equal, doesNotThrow, end}) => {
  const left = of("a")
  const right = of("b")

  streamSatisfies(
    "'b'---'a'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
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
