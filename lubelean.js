'use strict';

var Parser = function (src) {
  this.src = src;
  this.c = 0;
  this.lttype= "";
};
var lp = Parser.prototype;
lp.next = function () {
  if (this.c >= this.src.length) {
      this.lttype = 'eof';
      return;
  }
  this.lttype = this.src[this.c];
  this.c++;
};
lp.loc = function() { return {}; }
lp.loc = function() { return {}; }
lp.loc = function() { return {}; }
lp.loc = function(l) { return {}; }
lp.blck = function () {
  var stmts = [], stmt;
  while (stmt = this.parseStatement(false)) {
    stmts.push(stmt);
  }
  return stmts;
};
lp.parseStatement = function (nullNo) {
  var head;
  switch (this.lttype) {
    case ';':
      this.next();
      return {
        type: 'EmptyStatement',
        start: null,
        loc: {
          start: {},
          end: {}
        },
        end: null
      };
    case 'a':
      head = this.id();
      head = this.parseNonSeqExpr(head);
      return {
        type: 'ExpressionStatement',
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
lp.parseNonSeqExpr = function(head) {
  var n;
  while (!false) {
    switch (this.lttype) {
      case '-':
      case 'op':
        this.next();
        n = this.parseNonSeqExpr(this.id());
        head = {
          type: 'BinaryExpression',
          operator: '-',
          start: null,
          end: n.end ,
          loc: {},
          left: head,
          right: n,
        };
        break;
      default:
        return head;
    }
  }
};
lp.id = function () {
   var e = {
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
   this.next();
   return e;
};

var tok = "";
while (tok.length <= 399600) {
  tok += "aaaaaaaaaaaaaaaaaaaaa";
}

tok = "a" + Array(19029).fill("a-a-a-a-a-a-a-a-a-a-a;").join('');
console.log('length of the input:', tok.length);

var run = 4; while ( run    ) {
  console.log(run ) ;
  var parser = new Parser(tok);
  parser.next() ;
  parser.blck() ;
  run--;
}
