"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("./Helpers");
var Order;
(function (Order) {
    Order["ASC"] = "asc";
    Order["DESC"] = "desc";
})(Order = exports.Order || (exports.Order = {}));
class FromQuery {
    constructor(selectQuery, domain) {
        this.selectQuery = selectQuery;
        this.domain = domain;
    }
    where(predicate) {
        this.wherePredicate = predicate;
        return this;
    }
    orderBy(attribute, order) {
        this.orderByAttr = Helpers_1.wrapAttr(attribute);
        this.order = order;
        return this;
    }
    limit(limit) {
        this.limitN = limit;
        return this;
    }
    toQueryString() {
        let stmt = 'select ' + this.selectQuery.selectClause +
            ' from ' + Helpers_1.wrapAttr(this.domain);
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
exports.FromQuery = FromQuery;
//# sourceMappingURL=FromQuery.js.map