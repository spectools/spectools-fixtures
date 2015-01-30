"use strict";

var assert = require("assert"),
    self = require("../index"),
    path = require("path");

suite("Fixtures", function() {
    test("file path 'static' method returns correct path for Anolis", function() {
        var spec = path.join(__dirname, "..", "fixtures", "fetch.html");
        assert.equal(self.filepath("anolis"), spec);
        assert.equal(self.filepath("Anolis"), spec);
    });
    
    test("file path 'static' method returns correct path for Bikeshed", function() {
        var spec = path.join(__dirname, "..", "fixtures", "css-scoping-1.html");
        assert.equal(self.filepath("bikeshed"), spec);
        assert.equal(self.filepath("BikeShed"), spec);
        assert.equal(self.filepath("Bikeshed"), spec);
    });
    
    test("file path 'static' method returns correct path for the legacy CSS WG editor", function() {
        var spec = path.join(__dirname, "..", "fixtures", "css3-fonts.html");
        assert.equal(self.filepath("csswg legacy editor"), spec);
        assert.equal(self.filepath("CSSWG legacy editor"), spec);
    });
    
    test("file path 'static' method returns correct path for ReSpec", function() {
        var spec = path.join(__dirname, "..", "fixtures", "IndexedDB.html");
        assert.equal(self.filepath("respec"), spec);
        assert.equal(self.filepath("ReSpec"), spec);
        assert.equal(self.filepath("Respec"), spec);
    });
    
    test("file path 'static' method returns correct path for ReSpec drafts", function() {
        var spec = path.join(__dirname, "..", "fixtures", "IndexedDB-draft.html");
        assert.equal(self.filepath("respec-draft"), spec);
        assert.equal(self.filepath("ReSpec-draft"), spec);
        assert.equal(self.filepath("Respec-draft"), spec);
        assert.equal(self.filepath("respec draft"), spec);
    });
    
    test("file path 'static' method returns correct path for the HTML5 spec", function() {
        var dir = path.join(__dirname, "..", "fixtures", "html5");
        assert.equal(self.filepath("html5"),            path.join(dir, "Overview.html"));
        assert.equal(self.filepath("html5/Overview"),   path.join(dir, "Overview.html"));
        assert.equal(self.filepath("html5/references"), path.join(dir, "references.html"));
    });
    
    test("file path 'static' method returns correct path for the HTML spec", function() {
        var spec = path.join(__dirname, "..", "fixtures", "html.html");
        assert.equal(self.filepath("html"), spec);
    });
    
    test("file path 'static' method returns correct path for the CSS 2.1 spec", function() {
        var dir = path.join(__dirname, "..", "fixtures", "CSS21");
        assert.equal(self.filepath("CSS21"),          path.join(dir, "Overview.html"));
        assert.equal(self.filepath("CSS21/Overview"), path.join(dir, "Overview.html"));
        assert.equal(self.filepath("CSS21/page"),     path.join(dir, "page.html"));
    });
    
    test("file path 'static' method returns correct path for the SVG 1.1 spec", function() {
        var dir = path.join(__dirname, "..", "fixtures", "SVG11");
        assert.equal(self.filepath("SVG11"),          path.join(dir, "Overview.html"));
        assert.equal(self.filepath("SVG11/Overview"), path.join(dir, "Overview.html"));
        assert.equal(self.filepath("SVG11/extend"),   path.join(dir, "extend.html"));
    });
});