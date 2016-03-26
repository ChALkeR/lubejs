'use strict';

var Parser = function () {
  this.c = 0;
};
Parser.prototype.next = function () {
  this.c++;
};
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.blck = function () {
  var stmts = [];
  for (var i = 0; i < 38000; i++) {
    stmts.push(this.parseStatement());
  }
  return stmts;
};
Parser.prototype.parseStatement = function () {
  if (this.c === 22) {
    this.c = 1;
    return {
      type: 'foobar',
      start: null,
      loc: {
        start: {},
        end: {}
      },
      end: null
    };
  }
  var head = this.parseNonSeqExpr();
  return {
    type: 'foobar',
    expression: head,
    start: head.start,
    end: head.end,
    loc: {
      start: head.loc.start,
      end: head.loc.end
    }
  };
};
Parser.prototype.parseNonSeqExpr = function () {
  var head = this.id();
  if (this.c < 22 && this.c % 2 === 0) {
    this.next();
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
Parser.prototype.id = function () {
  this.next();
  return {
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
};

var unused = Array(19029).fill('aaaaaaaaaaaaaaaaaaaaaa').join('');
for (var run = 4; run > 0; run--) {
  console.log(run);
  new Parser().blck();
}
