import { Predicate } from './Predicate';
import { SelectQuery } from './SelectQuery';
export declare enum Order {
    ASC = "asc",
    DESC = "desc",
}
export declare class FromQuery {
    readonly selectQuery: SelectQuery;
    readonly domain: string;
    private wherePredicate;
    private orderByAttr;
    private order;
    private limitN;
    constructor(selectQuery: SelectQuery, domain: string);
    where(predicate: Predicate): FromQuery;
    orderBy(attribute: string, order: Order): FromQuery;
    limit(limit: number): FromQuery;
    toQueryString(): string;
}
