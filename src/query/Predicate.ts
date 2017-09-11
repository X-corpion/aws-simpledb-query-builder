import { wrapAttr, wrapValue } from './Helpers';

export abstract class Predicate {

  public static and(predicates: Predicate[]): AndPredicate {
    return new AndPredicate(predicates);
  }

  public static or(predicates: Predicate[]): OrPredicate {
    return new OrPredicate(predicates);
  }

  public static not(predicate: Predicate): NotPredicate {
    return new NotPredicate(predicate);
  }

  public static intersect(first: Predicate, second: Predicate): IntersectPredicate {
    return new IntersectPredicate(first, second);
  }

  public static eq(attribute: string, value: string): SimplePredicate {
    return new SimplePredicate(attribute, `= ${wrapValue(value)}`);
  }

  public static ne(attribute: string, value: string): SimplePredicate {
    return new SimplePredicate(attribute, `!= ${wrapValue(value)}`);
  }

  public static gt(attribute: string, value: string): SimplePredicate {
    return new SimplePredicate(attribute, `> ${wrapValue(value)}`);
  }

  public static ge(attribute: string, value: string): SimplePredicate {
    return new SimplePredicate(attribute, `>= ${wrapValue(value)}`);
  }

  public static lt(attribute: string, value: string): SimplePredicate {
    return new SimplePredicate(attribute, `< ${wrapValue(value)}`);
  }

  public static le(attribute: string, value: string): SimplePredicate {
    return new SimplePredicate(attribute, `<= ${wrapValue(value)}`);
  }

  public static like(attribute: string, value: string): SimplePredicate {
    return new SimplePredicate(attribute, `like ${wrapValue(value)}`);
  }

  public static notLike(attribute: string, value: string): SimplePredicate {
    return new SimplePredicate(attribute, `not like ${wrapValue(value)}`);
  }

  public static between(attribute: string, lb: string, ub: string): SimplePredicate {
    return new SimplePredicate(attribute, `between ${lb} and ${ub}`);
  }

  public static valueIn(attribute: string, values: any[]): SimplePredicate {
    const inClause = values.map(v => wrapValue(v)).join(',');
    return new SimplePredicate(attribute, `in (${inClause})`);
  }

  public static every(predicate: SimplePredicate): Predicate {
    return new EveryPredicate(predicate);
  }

  public static isNull(attribute: string): SimplePredicate {
    return new SimplePredicate(attribute, ` is null`);
  }

  public static notNull(attribute: string): SimplePredicate {
    return new SimplePredicate(attribute, ` is not null`);
  }

  public abstract toQuery(): string;

}

export abstract class JointPredicate extends Predicate {

  constructor(
      private predicates: Predicate[],
      private joinKeyword: string,
      private parens: boolean
  ) {
    super();
  }

  public toQuery(): string {
    return this.predicates.map(p => {
      if (this.parens) {
        return `(${p.toQuery()})`;
      }
      return p.toQuery();
    }).join(` ${this.joinKeyword} `);
  }

}

export class AndPredicate extends JointPredicate {
  constructor(predicates: Predicate[]) {
    super(predicates, 'and', true);
  }
}

export class OrPredicate extends JointPredicate {
  constructor(predicates: Predicate[]) {
    super(predicates, 'or', false);
  }
}

export class IntersectPredicate extends JointPredicate {
  constructor(first: Predicate, second: Predicate) {
    super([first, second], 'intersect', true);
  }
}

export class NotPredicate extends Predicate {

  constructor(private predicate: Predicate) {
    super();
  }

  public toQuery(): string {
    return `not (${this.predicate.toQuery()})`;
  }

}

export class SimplePredicate extends Predicate {

  constructor(
      public readonly attribute: string,
      public readonly statement: string
  ) {
    super();
  }

  public toQuery(): string {
    return `${wrapAttr(this.attribute)} ${this.statement}`;
  }
}

export class EveryPredicate extends Predicate {

  constructor(
      private predicate: SimplePredicate
  ) {
    super();
  }

  public toQuery(): string {
    return `every(${wrapAttr(this.predicate.attribute)}) ${this.predicate.statement}`;
  }
}
