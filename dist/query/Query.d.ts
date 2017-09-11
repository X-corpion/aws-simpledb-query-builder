import { SelectQuery } from './SelectQuery';
export declare class Query {
    static select(attrs?: string | string[]): SelectQuery;
    static count(): SelectQuery;
}
