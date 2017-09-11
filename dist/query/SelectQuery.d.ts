import { FromQuery } from './FromQuery';
export declare class SelectQuery {
    readonly selectClause: string;
    constructor(selectClause: string);
    from(domain: string): FromQuery;
}
