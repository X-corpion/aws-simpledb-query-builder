"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("./Helpers");
class Predicate {
    static and(predicates) {
        return new AndPredicate(predicates);
    }
    static or(predicates) {
        return new OrPredicate(predicates);
    }
    static not(predicate) {
        return new NotPredicate(predicate);
    }
    static intersect(first, second) {
        return new IntersectPredicate(first, second);
    }
    static eq(attribute, value) {
        return new SimplePredicate(attribute, `= ${Helpers_1.wrapValue(value)}`);
    }
    static ne(attribute, value) {
        return new SimplePredicate(attribute, `!= ${Helpers_1.wrapValue(value)}`);
    }
    static gt(attribute, value) {
        return new SimplePredicate(attribute, `> ${Helpers_1.wrapValue(value)}`);
    }
    static ge(attribute, value) {
        return new SimplePredicate(attribute, `>= ${Helpers_1.wrapValue(value)}`);
    }
    static lt(attribute, value) {
        return new SimplePredicate(attribute, `< ${Helpers_1.wrapValue(value)}`);
    }
    static le(attribute, value) {
        return new SimplePredicate(attribute, `<= ${Helpers_1.wrapValue(value)}`);
    }
    static like(attribute, value) {
        return new SimplePredicate(attribute, `like ${Helpers_1.wrapValue(value)}`);
    }
    static notLike(attribute, value) {
        return new SimplePredicate(attribute, `not like ${Helpers_1.wrapValue(value)}`);
    }
    static between(attribute, lb, ub) {
        return new SimplePredicate(attribute, `between ${lb} and ${ub}`);
    }
    static valueIn(attribute, values) {
        const inClause = values.map(v => Helpers_1.wrapValue(v)).join(',');
        return new SimplePredicate(attribute, `in (${inClause})`);
    }
    static every(predicate) {
        return new EveryPredicate(predicate);
    }
    static isNull(attribute) {
        return new SimplePredicate(attribute, ` is null`);
    }
    static notNull(attribute) {
        return new SimplePredicate(attribute, ` is not null`);
    }
}
exports.Predicate = Predicate;
class JointPredicate extends Predicate {
    constructor(predicates, joinKeyword, parens) {
        super();
        this.predicates = predicates;
        this.joinKeyword = joinKeyword;
        this.parens = parens;
    }
    toQuery() {
        return this.predicates.map(p => {
            if (this.parens) {
                return `(${p.toQuery()})`;
            }
            return p.toQuery();
        }).join(` ${this.joinKeyword} `);
    }
}
exports.JointPredicate = JointPredicate;
class AndPredicate extends JointPredicate {
    constructor(predicates) {
        super(predicates, 'and', true);
    }
}
exports.AndPredicate = AndPredicate;
class OrPredicate extends JointPredicate {
    constructor(predicates) {
        super(predicates, 'or', false);
    }
}
exports.OrPredicate = OrPredicate;
class IntersectPredicate extends JointPredicate {
    constructor(first, second) {
        super([first, second], 'intersect', true);
    }
}
exports.IntersectPredicate = IntersectPredicate;
class NotPredicate extends Predicate {
    constructor(predicate) {
        super();
        this.predicate = predicate;
    }
    toQuery() {
        return `not (${this.predicate.toQuery()})`;
    }
}
exports.NotPredicate = NotPredicate;
class SimplePredicate extends Predicate {
    constructor(attribute, statement) {
        super();
        this.attribute = attribute;
        this.statement = statement;
    }
    toQuery() {
        return `${Helpers_1.wrapAttr(this.attribute)} ${this.statement}`;
    }
}
exports.SimplePredicate = SimplePredicate;
class EveryPredicate extends Predicate {
    constructor(predicate) {
        super();
        this.predicate = predicate;
    }
    toQuery() {
        return `every(${Helpers_1.wrapAttr(this.predicate.attribute)}) ${this.predicate.statement}`;
    }
}
exports.EveryPredicate = EveryPredicate;
//# sourceMappingURL=Predicate.js.map