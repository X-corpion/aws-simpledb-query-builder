"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FromQuery_1 = require("./FromQuery");
class SelectQuery {
    constructor(selectClause) {
        this.selectClause = selectClause;
    }
    from(domain) {
        return new FromQuery_1.FromQuery(this, domain);
    }
}
exports.SelectQuery = SelectQuery;
//# sourceMappingURL=SelectQuery.js.map