var Mock = require("mockjs")
var express = require("express")
var router = express.Router();

var mockDatas = require('../mock/mock-module/common');

mockDatas.forEach(item => {
    router.use(item.test, function(req,res) {
        var data = require(item.mock);
        return res.json(data);
    });
});

module.exports = router;