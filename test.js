/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
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
    "a---b---|"
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
