"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.method1 = (req, res) => {
    // tslint:disable-next-line:no-console
    console.log('method1 - ');
    // tslint:disable-next-line:no-console
    console.log(req);
    res.send('Hello World!');
};
exports.method2 = (req, res) => {
    // tslint:disable-next-line:no-console
    console.log('method2 - ');
    // tslint:disable-next-line:no-console
    console.log(req);
    res.send('Hello Route!');
};
//# sourceMappingURL=testMethods.js.map