"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("./Helpers");
const SelectQuery_1 = require("./SelectQuery");
class Query {
    static select(attrs) {
        if (!attrs) {
            return new SelectQuery_1.SelectQuery('*');
        }
        if (typeof attrs === 'string') {
            return new SelectQuery_1.SelectQuery(Helpers_1.wrapAttr(attrs));
        }
        const clause = attrs
            .map(a => Helpers_1.wrapAttr(a))
            .join(',');
        return new SelectQuery_1.SelectQuery(clause);
    }
    static count() {
        return new SelectQuery_1.SelectQuery('count(*)');
    }
}
exports.Query = Query;
//# sourceMappingURL=Query.js.map