(function () {
    function id(x) { return x[0]; }
    var empty = function (d) { return null; };
    var nth = function (i) { return (function (d) { return d[i]; }); };
    var notnull = function (d) { return d != null; };
    var v = function (i) { return (function (d) { return i; }); };
    var grammar = {
        Lexer: undefined,
        ParserRules: [
            { "name": "program$ebnf$1", "symbols": [] },
            { "name": "program$ebnf$1$subexpression$1", "symbols": ["nl", "line"], "postprocess": nth(1) },
            { "name": "program$ebnf$1", "symbols": ["program$ebnf$1", "program$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) { return d[0].concat([d[1]]); } },
            { "name": "program", "symbols": ["line", "program$ebnf$1"], "postprocess": function (d) { return [d[0]].concat(d[1]).filter(notnull); } },
            { "name": "line", "symbols": ["_", "command", "eol"], "postprocess": nth(1) },
            { "name": "line", "symbols": ["_", "section", "eol"], "postprocess": function (d) { return ({ node: 'section', name: d[1] }); } },
            { "name": "line", "symbols": ["_", "label", "eol"], "postprocess": function (d) { return ({ node: 'label', name: d[1] }); } },
            { "name": "line", "symbols": ["eol"], "postprocess": empty },
            { "name": "command$string$1", "symbols": [{ "literal": "r" }, { "literal": "a" }, { "literal": "m" }, { "literal": "p" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "command", "symbols": ["command$string$1", "__", "float", "sep", "integer"], "postprocess": function (_a) {
                    var time = _a[2], amount = _a[4];
                    return ({ node: 'ramp', time: time, steps: amount });
                } },
            { "name": "command$string$2", "symbols": [{ "literal": "w" }, { "literal": "a" }, { "literal": "i" }, { "literal": "t" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "command", "symbols": ["command$string$2", "__", "float"], "postprocess": function (_a) {
                    var time = _a[2];
                    return ({ node: 'ramp', time: time, steps: 0 });
                } },
            { "name": "command$string$3", "symbols": [{ "literal": "b" }, { "literal": "r" }, { "literal": "a" }, { "literal": "n" }, { "literal": "c" }, { "literal": "h" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "command", "symbols": ["command$string$3", "__", "integer", "sep", "labelname"], "postprocess": function (d) { return ({ node: 'branch', count: d[2], target: d[4] }); } },
            { "name": "command$string$4", "symbols": [{ "literal": "s" }, { "literal": "e" }, { "literal": "t" }, { "literal": "_" }, { "literal": "p" }, { "literal": "w" }, { "literal": "m" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "command", "symbols": ["command$string$4", "__", "integer"], "postprocess": function (_a) {
                    var value = _a[2];
                    return ({ node: 'pwm', value: value });
                } },
            { "name": "command$string$5", "symbols": [{ "literal": "s" }, { "literal": "t" }, { "literal": "a" }, { "literal": "r" }, { "literal": "t" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "command", "symbols": ["command$string$5"], "postprocess": function (d) { return ({ node: 'start' }); } },
            { "name": "command$string$6", "symbols": [{ "literal": "t" }, { "literal": "r" }, { "literal": "i" }, { "literal": "g" }, { "literal": "g" }, { "literal": "e" }, { "literal": "r" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "command", "symbols": ["command$string$6", "__", "waittarget"], "postprocess": function (d) { return ({ node: 'trigger', send: 0, wait: d[2] }); } },
            { "name": "command$string$7", "symbols": [{ "literal": "t" }, { "literal": "r" }, { "literal": "i" }, { "literal": "g" }, { "literal": "g" }, { "literal": "e" }, { "literal": "r" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "command$ebnf$1$subexpression$1", "symbols": ["sep", "waittarget"], "postprocess": nth(1) },
            { "name": "command$ebnf$1", "symbols": ["command$ebnf$1$subexpression$1"], "postprocess": id },
            { "name": "command$ebnf$1", "symbols": [], "postprocess": function (d) { return null; } },
            { "name": "command", "symbols": ["command$string$7", "__", "sendtarget", "command$ebnf$1"], "postprocess": function (d) { return ({ node: 'trigger', send: d[2] ? d[2] : 0, wait: d[3] ? d[3] : 0 }); } },
            { "name": "command$string$8", "symbols": [{ "literal": "e" }, { "literal": "n" }, { "literal": "d" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "command$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": ["sep", "interruptsignal"], "postprocess": nth(1) },
            { "name": "command$ebnf$2$subexpression$1$ebnf$1", "symbols": ["command$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id },
            { "name": "command$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function (d) { return null; } },
            { "name": "command$ebnf$2$subexpression$1", "symbols": ["__", "interruptsignal", "command$ebnf$2$subexpression$1$ebnf$1"], "postprocess": function (d) { var s = [d[1], d[2]]; return { reset: s.includes('r'), int: s.includes('i') }; } },
            { "name": "command$ebnf$2", "symbols": ["command$ebnf$2$subexpression$1"], "postprocess": id },
            { "name": "command$ebnf$2", "symbols": [], "postprocess": function (d) { return null; } },
            { "name": "command", "symbols": ["command$string$8", "command$ebnf$2"], "postprocess": function (d) { return (Object.assign({ node: 'end', reset: false, int: false }, d[1])); } },
            { "name": "sep", "symbols": ["_", { "literal": "," }, "_"], "postprocess": empty },
            { "name": "eol$ebnf$1", "symbols": ["comment"], "postprocess": id },
            { "name": "eol$ebnf$1", "symbols": [], "postprocess": function (d) { return null; } },
            { "name": "eol", "symbols": ["_", "eol$ebnf$1"], "postprocess": empty },
            { "name": "comment$ebnf$1", "symbols": [] },
            { "name": "comment$ebnf$1", "symbols": ["comment$ebnf$1", /[^\r\n]/], "postprocess": function arrpush(d) { return d[0].concat([d[1]]); } },
            { "name": "comment", "symbols": [{ "literal": "#" }, "comment$ebnf$1"], "postprocess": empty },
            { "name": "label", "symbols": ["labelname", { "literal": ":" }], "postprocess": id },
            { "name": "labelname$ebnf$1", "symbols": [/[._a-zA-Z0-9]/] },
            { "name": "labelname$ebnf$1", "symbols": ["labelname$ebnf$1", /[._a-zA-Z0-9]/], "postprocess": function arrpush(d) { return d[0].concat([d[1]]); } },
            { "name": "labelname", "symbols": ["labelname$ebnf$1"], "postprocess": function (d) { return d[0].join(''); } },
            { "name": "interruptsignal", "symbols": [/[rR]/], "postprocess": v("r") },
            { "name": "interruptsignal", "symbols": [/[iI]/], "postprocess": v("i") },
            { "name": "sendtarget", "symbols": [/[sS]/, "target"], "postprocess": nth(1) },
            { "name": "waittarget", "symbols": [/[wW]/, "target"], "postprocess": nth(1) },
            { "name": "target", "symbols": [{ "literal": "1" }], "postprocess": v(1) },
            { "name": "target", "symbols": [{ "literal": "2" }], "postprocess": v(2) },
            { "name": "target", "symbols": [{ "literal": "3" }], "postprocess": v(4) },
            { "name": "target$string$1", "symbols": [{ "literal": "1" }, { "literal": "2" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "target", "symbols": ["target$string$1"], "postprocess": v(3) },
            { "name": "target$string$2", "symbols": [{ "literal": "1" }, { "literal": "3" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "target", "symbols": ["target$string$2"], "postprocess": v(5) },
            { "name": "target$string$3", "symbols": [{ "literal": "2" }, { "literal": "3" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "target", "symbols": ["target$string$3"], "postprocess": v(6) },
            { "name": "target$string$4", "symbols": [{ "literal": "1" }, { "literal": "2" }, { "literal": "3" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "target", "symbols": ["target$string$4"], "postprocess": v(7) },
            { "name": "section$subexpression$1$string$1", "symbols": [{ "literal": "." }, { "literal": "E" }, { "literal": "N" }, { "literal": "G" }, { "literal": "I" }, { "literal": "N" }, { "literal": "E" }, { "literal": "1" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "section$subexpression$1", "symbols": ["section$subexpression$1$string$1"] },
            { "name": "section$subexpression$1$string$2", "symbols": [{ "literal": "." }, { "literal": "e" }, { "literal": "n" }, { "literal": "g" }, { "literal": "i" }, { "literal": "n" }, { "literal": "e" }, { "literal": "1" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "section$subexpression$1", "symbols": ["section$subexpression$1$string$2"] },
            { "name": "section", "symbols": ["section$subexpression$1"], "postprocess": v("engine1") },
            { "name": "section$subexpression$2$string$1", "symbols": [{ "literal": "." }, { "literal": "E" }, { "literal": "N" }, { "literal": "G" }, { "literal": "I" }, { "literal": "N" }, { "literal": "E" }, { "literal": "2" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "section$subexpression$2", "symbols": ["section$subexpression$2$string$1"] },
            { "name": "section$subexpression$2$string$2", "symbols": [{ "literal": "." }, { "literal": "e" }, { "literal": "n" }, { "literal": "g" }, { "literal": "i" }, { "literal": "n" }, { "literal": "e" }, { "literal": "2" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "section$subexpression$2", "symbols": ["section$subexpression$2$string$2"] },
            { "name": "section", "symbols": ["section$subexpression$2"], "postprocess": v("engine2") },
            { "name": "section$subexpression$3$string$1", "symbols": [{ "literal": "." }, { "literal": "E" }, { "literal": "N" }, { "literal": "G" }, { "literal": "I" }, { "literal": "N" }, { "literal": "E" }, { "literal": "3" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "section$subexpression$3", "symbols": ["section$subexpression$3$string$1"] },
            { "name": "section$subexpression$3$string$2", "symbols": [{ "literal": "." }, { "literal": "e" }, { "literal": "n" }, { "literal": "g" }, { "literal": "i" }, { "literal": "n" }, { "literal": "e" }, { "literal": "3" }], "postprocess": function joiner(d) { return d.join(''); } },
            { "name": "section$subexpression$3", "symbols": ["section$subexpression$3$string$2"] },
            { "name": "section", "symbols": ["section$subexpression$3"], "postprocess": v("engine3") },
            { "name": "integer$ebnf$1", "symbols": [{ "literal": "-" }], "postprocess": id },
            { "name": "integer$ebnf$1", "symbols": [], "postprocess": function (d) { return null; } },
            { "name": "integer$ebnf$2", "symbols": [/[0-9]/] },
            { "name": "integer$ebnf$2", "symbols": ["integer$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) { return d[0].concat([d[1]]); } },
            { "name": "integer", "symbols": ["integer$ebnf$1", "integer$ebnf$2"], "postprocess": function (d) { return parseInt(d[1].join("") * (d[0] ? -1 : 1)); } },
            { "name": "float$ebnf$1", "symbols": ["mantissa"], "postprocess": id },
            { "name": "float$ebnf$1", "symbols": [], "postprocess": function (d) { return null; } },
            { "name": "float", "symbols": ["integer", "float$ebnf$1"], "postprocess": function (d) { return Math.sign(d[0]) * (Math.abs(d[0]) + d[1]); } },
            { "name": "mantissa$ebnf$1", "symbols": [] },
            { "name": "mantissa$ebnf$1", "symbols": ["mantissa$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) { return d[0].concat([d[1]]); } },
            { "name": "mantissa", "symbols": [{ "literal": "." }, "mantissa$ebnf$1"], "postprocess": function (d) { return parseFloat("0" + d.join('')); } },
            { "name": "__$ebnf$1", "symbols": ["ws"] },
            { "name": "__$ebnf$1", "symbols": ["__$ebnf$1", "ws"], "postprocess": function arrpush(d) { return d[0].concat([d[1]]); } },
            { "name": "__", "symbols": ["__$ebnf$1"], "postprocess": empty },
            { "name": "_$ebnf$1", "symbols": [] },
            { "name": "_$ebnf$1", "symbols": ["_$ebnf$1", "ws"], "postprocess": function arrpush(d) { return d[0].concat([d[1]]); } },
            { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": empty },
            { "name": "ws", "symbols": [/[ \t]/], "postprocess": empty },
            { "name": "nl$ebnf$1", "symbols": [{ "literal": "\r" }], "postprocess": id },
            { "name": "nl$ebnf$1", "symbols": [], "postprocess": function (d) { return null; } },
            { "name": "nl", "symbols": ["nl$ebnf$1", { "literal": "\n" }], "postprocess": empty }
        ],
        ParserStart: "program"
    };
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = grammar;
    }
    else {
        window.grammar = grammar;
    }
})();
//# sourceMappingURL=grammar.js.map