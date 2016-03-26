'use strict';

var Parser = function (src) {
  this.src = src;
  this.c = 0;
  this.lttype = "";
};
Parser.prototype.next = function () {
  if (this.c >= this.src.length) {
      this.lttype = 'eof';
      return;
  }
  this.lttype = this.src[this.c];
  this.c++;
};
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.loc = function () { return {}; }
Parser.prototype.blck = function () {
  var stmts = [], stmt;
  this.next();
  while (stmt = this.parseStatement(false)) {
    stmts.push(stmt);
  }
  return stmts;
};
Parser.prototype.parseStatement = function (nullNo) {
  var head;
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
      head = this.parseNonSeqExpr(this.id());
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
Parser.prototype.parseNonSeqExpr = function(head) {
  while (!false) {
    switch (this.lttype) {
      case '-':
      case 'op':
        this.next();
        head = {
          type: 'foobar',
          operator: '-',
          start: null,
          end: null,
          loc: {},
          left: head,
          right: this.parseNonSeqExpr(this.id()),
        };
        break;
      default:
        return head;
    }
  }
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

var tok = "";
while (tok.length <= 399600) {
  tok += "aaaaaaaaaaaaaaaaaaaaa";
}

tok = "a" + Array(19029).fill("a-a-a-a-a-a-a-a-a-a-a;").join('');
console.log('length of the input:', tok.length);

for (var run = 4; run > 0; run--) {
  console.log(run);
  new Parser(tok).blck();
}
