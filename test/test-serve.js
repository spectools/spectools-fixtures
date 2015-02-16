"use strict";

var assert = require("assert"),
    self = require("../index"),
    request = require("request");



suite("Server", function() {
    test("serves specs through short name url", function(done) {
        var server = self.serve();
        request("http://127.0.0.1:3000/anolis", function(err, res, body) {
            assert.equal(200, res.statusCode);
            assert.equal("text/html", res.headers['content-type']);
            assert(body.length > 0);
            server.close();
            done();
        });
    });
    
    test("serves multi page specs", function(done) {
        var server = self.serve();
        request("http://127.0.0.1:3000/html5", function(err, res, body) {
            assert.equal(200, res.statusCode);
            assert.equal("text/html", res.headers['content-type']);
            assert(body.length > 0);
            request("http://127.0.0.1:3000/html5/overview", function(err, res2, body2) {
                assert.equal(200, res2.statusCode);
                assert.equal("text/html", res2.headers['content-type']);
                assert.equal(body, body2);
                server.close();
                done();
            });
        });
    });
    
    test("serves sub resources", function(done) {
        var server = self.serve();
        request("http://127.0.0.1:3000/resources/modified-respec-w3c-common.js", function(err, res, body) {
            assert.equal(200, res.statusCode);
            assert.equal("text/javascript", res.headers['content-type']);
            assert(body.length > 0);
            server.close();
            done();
        });
    });
});