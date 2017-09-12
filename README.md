# AWS SimpleDB Query Builder
This is a tested, working query builder that supports the current spec of simpledb.

## How to use

#### TypeScript example:

```typescript
import { Order, Predicate, Query } aws-node-query-builder';

Query.select('foo')
  .from('bar')
  .where(Predicate.and([
      Predicate.ne('baz', 'a'),
      Predicate.or([
          Predicate.eq('qux', 'b'),
          Predicate.eq('qux', 'c'),
      ])
  ]))
  .orderBy('itemName()', qb.Order.DESC)
  .limit(10)
  .toQueryString();
// select `foo` from `bar` where (`baz` != 'a') and (`qux` = 'b' or `qux` = 'c') order by itemName() desc limit 10
```

#### JavaScript (node) example:

```javascript
var qb = require('aws-node-query-builder');

qb.Query.select('foo')
  .from('bar')
  .where(qb.Predicate.and([
      qb.Predicate.ne('baz', 'a'),
      qb.Predicate.or([
          qb.Predicate.eq('qux', 'b'),
          qb.Predicate.eq('qux', 'c'),
      ])
  ]))
  .orderBy('itemName()', qb.Order.DESC)
  .limit(10)
  .toQueryString();
// select `foo` from `bar` where (`baz` != 'a') and (`qux` = 'b' or `qux` = 'c') order by itemName() desc limit 10

```
