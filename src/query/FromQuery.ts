import { wrapAttr } from './Helpers';
import { Predicate } from './Predicate';
import { SelectQuery } from './SelectQuery';

export enum Order {
  ASC = 'asc',
  DESC = 'desc'
}

export class FromQuery {

  private wherePredicate: Predicate;
  private orderByAttr: string;
  private order: Order;
  private limitN: number;

  constructor(
      public readonly selectQuery: SelectQuery,
      public readonly domain: string
  ) {
  }

  public where(predicate: Predicate): FromQuery {
    this.wherePredicate = predicate;
    return this;
  }

  public orderBy(attribute: string, order: Order): FromQuery {
    this.orderByAttr = wrapAttr(attribute);
    this.order = order;
    return this;
  }

  public limit(limit: number): FromQuery {
    this.limitN = limit;
    return this;
  }

  public toQueryString(): string {
    let stmt = 'select ' + this.selectQuery.selectClause +
        ' from ' + wrapAttr(this.domain);
    if (this.wherePredicate) {
      stmt += ` where ${this.wherePredicate.toQuery()}`;
    }
    if (this.order && this.orderByAttr) {
      stmt += ` order by ${this.orderByAttr} ${this.order}`;
    }
    if (this.limitN !== undefined) {
      stmt += ` limit ${this.limitN}`;
    }
    return stmt;
  }

}
