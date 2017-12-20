# [Advent of Code 2017](http://adventofcode.com/)

## [Challenges](challenges)

## Run the tasks

* Latest task: ``npm start``
* Older tasks (e.g. task 1): ``npm start 1``

## Bonus challenge: Minified versions

Note: The minified version works for the given inputs. It's not meant to be a serious production version because it's using global variables and some obscure hacks to make the code smaller.

### Size in bytes

 Day |    A |    B | Total
-----|------|------|-------
 1   |   75 |   83 |   158
 2   |  112 |  140 |   252
 3   |  105 |  273 |   378
 4   |  111 |  151 |   262
 5   |   77 |  101 |   178
 6   |  199 |  223 |   422
 7   |  197 |  581 |   778
 8   |  372 |  395 |   767
 9   |  202 |  207 |   409
 10  |  283 |  453 |   736
 11* | 1045 | 1251 |  2296
 12* |  503 |  805 |  1308
 13* |  770 |  489 |  1259
 14* |  382 |  864 |  1246
 15* |  453 |  728 |  1181
 16* | 1060 | 1387 |  2447
 17  |  115 |  112 |   227
 18* | 1182 | 1754 |  2936
 19* | 1230 | 1317 |  2547
 20* | 1161 | 1511 |  2672
 ∑   |      |      | 22459
 Avg |      |      |  1123

`*` Not minified

## Execution time* (ms)

 Day |       A |       B |    Total
-----|---------|---------|----------
 1   |    1.88 |    0.37 |     2.25
 2   |    2.14 |    0.48 |     2.62
 3   |    2.17 |    4.73 |     6.90
 4   |    4.74 |   17.64 |    22.38
 5   |    5.62 |  165.20 |   170.82
 6   | 1534.95 | 1647.95 |  3266.40
 7   |    5.14 |    5.29 |    10.43
 8   |    7.51 |    7.92 |    15.43
 9   |    4.50 |    2.09 |     6.59
 10  |    1.93 |   20.62 |    22.55
 11  |    3.57 | 1864.59 |  1868.16
 12  |    6.29 |  131.30 |   137.59
 13  |    2.80 |  402.06 |   404.86
 14  |  512.76 |  505.27 |  1018.03
 15  |  686.18 | 1294.48 |  1980.66
 16  |    3.42 |   15.98 |    19.40
 17  |    2.02 |  566.43 |   568.45
 18  |    2.66 |   41.74 |    44.40
 19  |   19.57 |   14.38 |    33.95
 20  |    6.47 |  246.58 |   253.05
 ∑   |         |         |  9854.82
 Avg |         |         |   492.74

`*` Middle one of three runs on 13-inch 2016 MacBook Pro with 2.4GHz Intel Core i7 using Node.js 9.3.0
