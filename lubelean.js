'use strict'

var Parser = function (src) {
  this.src = src;
  this.c = 0;
  this.lttype = "";
};
var lp = Parser.prototype;
lp.next = function () {
  this.skipS();
  if (this.c >= this.src.length) {
      this.lttype = 'eof';
      return ;
  }
  this.lttype = this.src[this.c];
  this.c++;
};
lp.skipS = function() {
     var c = this.c,
         l = this.src,
         e = l.length,
         flag = true;
     while (c < e && flag) {
       switch (l.charCodeAt(c)) {
         case 32:
             while (++c < e &&  l.charCodeAt(c) == 32);
             continue ;
         default :
            flag = false;
       }
     } 
  this.c = c ;
};
lp.loc = function() { return { }; }
lp.loc = function() { return { }; }
lp.loc = function() { return { }; }
lp.blck = function () {
  var stmts = [], stmt;
  while (stmt = this.parseStatement()) stmts.push(stmt);
  return (stmts);
};
lp.parseStatement = function () {
  var head, l, e ;
  switch (this.lttype) {
    case ';':
      l  =  { type: 'EmptyStatement', start : this.c - 1,
              loc : { start : {} , end : {} },
              end : this.c };
      this.next();
      return l;
    case 'a':
      var head = this.id();
      head = this.parseNonSeqExpr(head) ;
      head = {
        expression: head,
        start: head.start ,
        end: head.end ,
        loc: { start : head.loc.start, end : head.loc.end }
      };
      return head;
  }
};
lp.parseNonSeqExpr = function(head) {
  while (true) {
    switch (this.lttype) {
      case '-':
        break;
      default:
        return head;
    }
    this.next() ;
    head =  {
      operator: '-',
      start: head.start ,
      end: {},
      loc: {},
      left: head,
      right: this.parseNonSeqExpr(this.id()),
    };
 }
};
lp.id = function () {
   this.next();
   return { loc : { start : {}, end : this.loc() } };
};

var tok = "";
while (tok.length - 400000 <= -400) {
  tok += "aaaaaaaaaaaaaaaaaaaaa";
}

tok = "a" + Array(19029).fill("a-a-a-a-a-a-a-a-a-a; ").join('');
console.log( 'length of the input:' , tok.length )  ;

var run = 4; while ( run    ) {
  console.log(run ) ;
  var parser = new Parser(tok);
  parser.next() ;
  parser.blck() ;
  run--;
}
