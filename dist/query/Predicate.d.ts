export declare abstract class Predicate {
    static and(predicates: Predicate[]): AndPredicate;
    static or(predicates: Predicate[]): OrPredicate;
    static not(predicate: Predicate): NotPredicate;
    static intersect(predicates: Predicate[]): IntersectPredicate;
    static eq(attribute: string, value: string): SimplePredicate;
    static ne(attribute: string, value: string): SimplePredicate;
    static gt(attribute: string, value: string): SimplePredicate;
    static ge(attribute: string, value: string): SimplePredicate;
    static lt(attribute: string, value: string): SimplePredicate;
    static le(attribute: string, value: string): SimplePredicate;
    static like(attribute: string, value: string): SimplePredicate;
    static notLike(attribute: string, value: string): SimplePredicate;
    static between(attribute: string, lb: string, ub: string): SimplePredicate;
    static valueIn(attribute: string, values: any[]): SimplePredicate;
    static every(predicate: SimplePredicate): Predicate;
    static isNull(attribute: string): SimplePredicate;
    static notNull(attribute: string): SimplePredicate;
    abstract toQuery(): string;
}
export declare abstract class JointPredicate extends Predicate {
    private predicates;
    private joinKeyword;
    private parens;
    constructor(predicates: Predicate[], joinKeyword: string, parens: boolean);
    toQuery(): string;
}
export declare class AndPredicate extends JointPredicate {
    constructor(predicates: Predicate[]);
}
export declare class OrPredicate extends JointPredicate {
    constructor(predicates: Predicate[]);
}
export declare class IntersectPredicate extends JointPredicate {
    constructor(predicates: Predicate[]);
}
export declare class NotPredicate extends Predicate {
    private predicate;
    constructor(predicate: Predicate);
    toQuery(): string;
}
export declare class SimplePredicate extends Predicate {
    readonly attribute: string;
    readonly statement: string;
    constructor(attribute: string, statement: string);
    toQuery(): string;
}
export declare class EveryPredicate extends Predicate {
    private predicate;
    constructor(predicate: SimplePredicate);
    toQuery(): string;
}
