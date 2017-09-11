import { wrapAttr } from './Helpers';
import { SelectQuery } from './SelectQuery';

export class Query {

  public static select(attrs?: string | string[]): SelectQuery {
    if (!attrs) {
      return new SelectQuery('*');
    }
    if (typeof attrs === 'string') {
      return new SelectQuery(wrapAttr(attrs));
    }
    const clause = attrs
        .map(a => wrapAttr(a))
        .join(',');
    return new SelectQuery(clause);
  }

  public static count(): SelectQuery {
    return new SelectQuery('count(*)');
  }

}
