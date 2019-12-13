"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 8080;
app.use(function (req, res) {
    if (req.get('authorization') === 'ASUPERSECUREAUTTHTOKEN') {
        res.json({
            ok: true
        });
    }
    else {
        res.status(403).json({
            ok: false
        });
    }
});
app.listen(port, function () { return console.log("Listening on port " + port + "!"); });
