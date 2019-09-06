/* eslint-disable flowtype/require-variable-type, no-magic-numbers */
import { of } from "most";
import streamSatisfies from "@unction/streamsatisfies";

import mergeLeft from "./index";

test("Array", () => {
  const left = [
    "a",
    "b",
  ];
  const right = [
    "c",
  ];

  expect(mergeLeft(left)(right)).toEqual([
    "c",
    "a",
    "b",
  ]);
});

test("Object", () => {
  const left = {
    alpha: "1",
    beta: "1",
  };
  const right = {
    alpha: "2",
    beta: "2",
    zeta: "3",
  };

  expect(mergeLeft(left)(right)).toEqual({
    alpha: "1",
    beta: "1",
    zeta: "3",
  });
});

test("Set", () => {
  const left = new Set(["a", "1", "b", "0"]);
  const right = new Set(["b", "2", "c", "3"]);

  expect(mergeLeft(left)(right)).toEqual(new Set(["a", "1", "b", "0", "2", "c", "3"]));
});

test("Map", () => {
  const left = new Map([["a", "1"], ["b", "0"]]);
  const right = new Map([["b", "2"], ["c", "3"]]);

  expect(mergeLeft(left)(right)).toEqual(new Map([["a", "1"], ["b", "0"], ["c", "3"]]));
});

test("String", () => {
  const left = "ab";
  const right = "c";

  expect(mergeLeft(left)(right)).toEqual("cab");
});

test("Stream", done => {
  const left = of("a");
  const right = of("b");

  streamSatisfies(
    "'b'---'a'---|"
  )(
    (given) => (expected) => expect(given).toBe(expected)
  )(
    doesNotThrow
  )(
    ({length}) =>
      (position) => {
        expect(length).toBe(position);
        done();
      }
  )(
    mergeLeft(left)(right)
  );
});

test("works", () => {
  const left = {};
  const right = [];

  expect(() => mergeLeft(left)(right)).toThrow();
});

test("works", () => {
  const left = 1;
  const right = 1;

  expect(() => mergeLeft(left)(right)).toThrow();
});
