'use strict';

var Parser = function (src) {
  this.src = src;
  this.c = 0;
  this.lttype = "";
};
Parser.prototype.next = function () {
  this.lttype = this.src[this.c];
  this.c++;
};
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.blck = function () {
  var stmts = [], stmt = true;
  this.next();
  while (stmt) {
    stmt = this.parseStatement();
    stmts.push(stmt);
  }
  return stmts;
};
Parser.prototype.parseStatement = function () {
  var head;
  if (this.c >= this.src.length) {
     return;
  }
  switch (this.lttype) {
    case ';':
      this.next();
      return {
        type: 'foobar',
        start: null,
        loc: {
          start: {},
          end: {}
        },
        end: null
      };
    case 'a':
      head = this.parseNonSeqExpr();
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
  }
};
Parser.prototype.parseNonSeqExpr = function () {
  var head = this.id();
  if (this.lttype === '-') {
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

var tok = "a" + Array(19029).fill("a-a-a-a-a-a-a-a-a-a-a;").join('');
for (var run = 4; run > 0; run--) {
  console.log(run);
  new Parser(tok).blck();
}
