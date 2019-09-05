# @unction/mergeLeft


![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> EnumerableType<A> => EnumerableType<A> => EnumerableType<A>

Merges two enumerables, preferring left.

``` javascript
const left = {
  alpha: "1",
  beta: "1"
}
const right = {
  beta: "2",
  zeta: "3"
}

mergeLeft(left)(right)
```

Which returns:

``` javascript
{
  alpha: "1",
  beta: "1",
  zeta: "3"
}
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/mergeLeft.svg?maxAge=2592000&style=flat-square

[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/mergeLeft.svg?maxAge=2592000&style=flat-square
