/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-magic-numbers */
import {test} from "tap"
import xstream from "xstream"
import streamSatisfies from "@unction/streamsatisfies"

import mergeLeft from "./index"

test(({same, end}) => {
  const left = {
    alpha: "1",
    beta: "1",
  }
  const right = {
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

test(({same, end}) => {
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

test(({same, end}) => {
  const left = "ab"
  const right = "c"

  same(
    mergeLeft(left)(right),
    "abc"
  )

  end()
})

test(({equal, end}) => {
  const left = xstream.of("a")
  const right = xstream.of("b")

  streamSatisfies(
    "'a'---'b'---|"
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

test(({equal, end}) => {
  const left = xstream.of("a").remember()
  const right = xstream.of("b").remember()

  streamSatisfies(
    "'a'---'b'---|"
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

test(({same, end}) => {
  const left = new Map([["a", "1"], ["b", "0"]])
  const right = new Map([["b", "2"], ["c", "3"]])

  same(
    mergeLeft(left)(right),
    new Map([["a", "1"], ["b", "0"], ["c", "3"]])
  )

  end()
})

test(({same, end}) => {
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

test(({throws, end}) => {
  const left = new Buffer("a")
  const right = new Buffer("a")

  throws(
    () => mergeLeft(left)(right)
  )

  end()
})
