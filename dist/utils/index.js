"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
const delay = (n) => {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, n);
    });
};
exports.delay = delay;
