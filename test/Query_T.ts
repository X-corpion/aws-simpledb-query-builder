import { expect } from 'chai';

import { Order, Predicate, Query } from '../src';

describe('Query', () => {

  describe('Simple', () => {

    it('should handle select all', () => {
      const query = Query.select()
          .from('foo')
          .toQueryString();
      expect(query).to.equal('select * from `foo`');
    });

    it('should not wrap id with backticks', () => {
      const query = Query.select('itemName()')
          .from('foo')
          .toQueryString();
      expect(query).to.equal('select itemName() from `foo`');
    });

    it('should handle query with only select from', () => {
      const query = Query.select(['foo', 'bar'])
          .from('baz')
          .toQueryString();
      expect(query).to.equal('select `foo`,`bar` from `baz`');
    });

    it('should wrap value with single quotes', () => {
      const query = Query.select()
          .from('foo')
          .where(Predicate.ge('a', '1'))
          .toQueryString();
      expect(query).to.equal('select * from `foo` where `a` >= \'1\'');
    });

    it('should not wrap id attribute in where clause', () => {
      const query = Query.select()
          .from('foo')
          .where(Predicate.ne('itemName()', '1'))
          .toQueryString();
      expect(query).to.equal('select * from `foo` where itemName() != \'1\'');
    });

    it('should generate where...order by', () => {
      const query = Query.select()
          .from('foo')
          .where(Predicate.ne('a', 'b'))
          .orderBy('a', Order.DESC)
          .toQueryString();
      expect(query).to.equal('select * from `foo` where `a` != \'b\' order by `a` desc');
    });

    it('should generate where...order by...limit', () => {
      const query = Query.select()
          .from('foo')
          .where(Predicate.ne('a', 'b'))
          .orderBy('a', Order.ASC)
          .limit(10)
          .toQueryString();
      expect(query).to.equal('select * from `foo` where `a` != \'b\' order by `a` asc limit 10');
    });

    it('should generate correct EVERY query', () => {
      const query = Query.select()
          .from('foo')
          .where(Predicate.every(Predicate.like('a', '%M')))
          .toQueryString();
      expect(query).to.equal('select * from `foo` where every(`a`) like \'%M\'');
    });

  });

  describe('Composite', () => {

    it('should wrap AND predicates in parens', () => {
      const query = Query.select()
          .from('foo')
          .where(
              Predicate.and([
                  Predicate.or([
                      Predicate.lt('a', '1'),
                      Predicate.gt('c', '2')
                  ]),
                  Predicate.eq('a', '2')
              ])
          )
          .limit(10)
          .toQueryString();
      expect(query).to.equal('select * from `foo` where (`a` < \'1\' or `c` > \'2\') and (`a` = \'2\') limit 10');
    });

    it('should wrap INTERSECT predicates in parens', () => {
      const query = Query.select()
          .from('foo')
          .where(
              Predicate.intersect(
                Predicate.or([
                  Predicate.lt('a', '1'),
                  Predicate.gt('c', '2')
                ]),
                Predicate.eq('a', '2')
              )
          )
          .limit(10)
          .toQueryString();
      expect(query).to.equal('select * from `foo` where (`a` < \'1\' or `c` > \'2\') intersect (`a` = \'2\') limit 10');
    });

  });

});
