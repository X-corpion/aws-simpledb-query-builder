import { FromQuery } from './FromQuery';

export class SelectQuery {

  constructor(public readonly selectClause: string) {
  }

  public from(domain: string): FromQuery {
    return new FromQuery(this, domain);
  }
}
