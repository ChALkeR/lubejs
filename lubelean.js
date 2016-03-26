'use strict';

var Parser = function () {
  this.c = 0;
};
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.blck = function () {
  var stmts = [];
  for (var i = 0; i < 38000; i++) {
    if (this.c === 22) {
      this.c = 1;
      continue;
    }
    var head = this.parseNonSeqExpr();
    stmts.push({
      type: 'foobar',
      expression: head,
      start: head.start,
      end: head.end,
      loc: {
        start: head.loc.start,
        end: head.loc.end
      }
    });
  }
  return stmts;
};
Parser.prototype.parseNonSeqExpr = function () {
  this.c++;
  var head = {
    type: 'a',
    value: null,
    end: null,
    loc: {
      start: {},
      foo: {},
      foo2: {},
      foo3: {},
      end: this.loc()
    },
    contents: null,
    pDepth: 0,
  };
  if (this.c < 22 && this.c % 2 === 0) {
    this.c++;
    head = {
      type: 'foobar',
      operator: '-',
      start: null,
      end: null,
      loc: {},
      left: head,
      right: this.parseNonSeqExpr(),
    };
  }
  return head;
};

var unused = Array(40000).fill('aaaaaaaaaaaaaaaaaaaaaa').join('');
for (var i = 0; i < 4; i++) {
  new Parser().blck();
}
