"use strict";
var jsdom = require("jsdom"),
    path = require("path"),
    fs = require("fs");

var SPEC_EXAMPLES = {
    "anolis": "fetch",
    "bikeshed": "css-scoping-1",
    "respec": "IndexedDB",
    "respec draft": "IndexedDB-draft",
    "csswg legacy editor": "css3-fonts",
    "CSS21": "CSS21/Overview",
    "SVG11": "SVG11/Overview",
    "html5": "html5/Overview",
    "whatwg html": "html",
};

Object.keys(SPEC_EXAMPLES).forEach(function(k) {
    var v = SPEC_EXAMPLES[k];
    SPEC_EXAMPLES[k.toLowerCase()] = v;
    SPEC_EXAMPLES[k.toLowerCase().replace(" ", "-")] = v;
    SPEC_EXAMPLES[k.toLowerCase().replace("-", " ")] = v;
});

var MULTI_PAGE_SPECS = {
    "html5": [
        "introduction",
        "infrastructure",
        "dom",
        "semantics",
        "document-metadata",
        "sections",
        "grouping-content",
        "text-level-semantics",
        "edits",
        "embedded-content-0",
        "links",
        "tabular-data",
        "forms",
        "scripting-1",
        "common-idioms",
        "disabled-elements",
        "browsers",
        "webappapis",
        "editing",
        "syntax",
        "the-xhtml-syntax",
        "rendering",
        "obsolete",
        "iana",
        "index",
        "references",
        "acknowledgments"
    ],
    "CSS21": [
        "about",
        "intro",
        "conform",
        "syndata",
        "selector",
        "cascade",
        "media",
        "box",
        "visuren",
        "visudet",
        "visufx",
        "generate",
        "page",
        "colors",
        "fonts",
        "text",
        "tables",
        "ui",
        "aural",
        "refs",
        "changes",
        "sample",
        "zindex",
        "propidx",
        "grammar",
        "leftblank"
    ],
    "SVG11": [
        "intro",
        "concepts",
        "render",
        "types",
        "struct",
        "styling",
        "coords",
        "paths",
        "shapes",
        "text",
        "painting",
        "color",
        "pservers",
        "masking",
        "filters",
        "interact",
        "linking",
        "script",
        "animate",
        "fonts",
        "metadata",
        "backward",
        "extend",
        "svgdtd",
        "svgdom",
        "idl",
        "java",
        "escript",
        "implnote",
        "conform",
        "access",
        "i18n",
        "minimize",
        "refs",
        "eltindex",
        "attindex",
        "propidx",
        "feature",
        "mimereg",
        "changes"
    ]
};

var JS_INJECTION_OPTIONS = {
    features: {
        // Necessary for inline script injection.
        FetchExternalResources: ["script"],
        ProcessExternalResources: ["script"],
        MutationEvents: "2.0"
    }
};

var JSDOM_OPTIONS = {
    "respec-draft": JS_INJECTION_OPTIONS,
    "respec draft": JS_INJECTION_OPTIONS
};

module.exports = getDOM;
function getDOM(filename, callback) {
    var fp = filepath(filename);
    fs.exists(fp, function(exist) {
        if (exist) {
            jsdom.env(fp, JSDOM_OPTIONS[filename] || {}, callback);
        } else {
            callback(new Error("Cannot find file '" + fp + "' for fixture '" + filename + "'."));
        }
    })
}

module.exports.filepath = filepath;
function filepath(filename) {
    filename = SPEC_EXAMPLES[filename.toLowerCase()] || filename;
    var fp = path.join(__dirname, "fixtures", filename);
    return fp.replace(/\.html$/, "") + ".html";
}

var http = require("http");
//var fs = require("fs");
var MIME_TYPES = {
    "html": "text/html",
    "txt": "text/plain",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

var DEFAULT_MIME_TYPE = MIME_TYPES.txt;

function stream(fp, res) {
    var m = fp.match(/\.([a-z]+)$/i);
    var mt = m ? MIME_TYPES[m[1].toLowerCase()] : DEFAULT_MIME_TYPE;
    res.writeHead(200, { "Content-Type": mt });
    fs.createReadStream(fp).pipe(res);
}

module.exports.serve = serve;
function serve(options) {
    options = options || {};
    return http.createServer(function (req, res) {
        var url = req.url.substr(1);
        var fp = path.join(__dirname, "fixtures", url);
        fs.stat(fp, function(err, stat) {
            if (err || !stat.isFile()) {
                fp = filepath(url);
                fs.stat(fp, function(err, stat) {
                    if (err || !stat.isFile()) {
                        res.writeHead(404);
                        res.end();
                    } else {
                        stream(fp, res);
                    }
                });
            } else {
                stream(fp, res);
            }
        });
    }).listen(options.port || 3000, options.host || "127.0.0.1");
}
