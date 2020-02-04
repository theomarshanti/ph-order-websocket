import * as express from "express";

export const method1 = (req: any, res: any) => {
    // tslint:disable-next-line:no-console
    console.log('method1 - ');
    // tslint:disable-next-line:no-console
    console.log(req);
    res.send('Hello World!');
}

export const method2 = (req: any, res: any) => {
    // tslint:disable-next-line:no-console
    console.log('method2 - ');
    // tslint:disable-next-line:no-console
    console.log(req);
    res.send('Hello Route!');
}