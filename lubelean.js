'use strict';

var Parser = function () {
  this.src = 'a-a-a-a-a-a-a-a-a-a-a;a';
  this.c = 0;
  this.lttype = 'a';
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
  var stmts = [];
  for (var i = 0; i < 38000; i++) {
    stmts.push(this.parseStatement());
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
      this.lttype = 'a';
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

var unused = Array(19029).fill('aaaaaaaaaaaaaaaaaaaaaa').join('');
for (var run = 4; run > 0; run--) {
  console.log(run);
  new Parser().blck();
}
