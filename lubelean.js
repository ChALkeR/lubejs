'use strict'

var Parser = function (src) {
  this.src = src;
  this.c = 0;
  this.lttype= "";
};
var lp = Parser.prototype;
lp.next = function () {
  this.skipS();
  if (this.c >= this.src.length) {
      this. lttype =  'eof' ;
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
     while ( c < e && flag ) {
       switch ( l.charCodeAt ( c ) ) {
         case 32:
             while ( ++c < e &&  l.charCodeAt (  c ) == 32 );
             continue ;
         default :
            flag = false;
       }
     } 
  this.c = c ;
};
lp . loc      = function()  { return  { }; }
lp . loc = function()  { return  { }; }
lp . loc    = function(l) { return  { }; }
lp.blck = function () { // blck ([]stmt)
  var stmts = [], stmt;
  while (stmt = this.parseStatement( false )) stmts.push(stmt);
  return (stmts);
};
lp.parseStatement = function ( nullNo       ) {
  var head, l, e ;
  switch (this.lttype) {
    case ';':
       l  =  { type: 'EmptyStatement', start : this.c - 1,
               loc : { start : {} , end : {} },
               end : this.c };
       this.next   () ;
       return l;
    case 'a': break;
    default: return;
  }
  var head = this.id();
  head = this.parseNonSeqExpr(head) ;
  head = { 
    type : 'ExpressionStatement', 
    expression : head,
    start : head.start ,
    end : head.end ,
    loc : { start : head.loc.start, end : head.loc.end }
  };
  return head  ;
};
lp.parseNonSeqExpr = function(head) {
  var n, _b = null, _e = null;
  while (!false) {
    switch (this.lttype) {
      case '-' :
      case 'op' :
         break ;
     default:
        return head;
    }
    this.next() ;
    n = (this.parseNonSeqExpr(this.id()))   ;
    head =  {
        type: 'BinaryExpression',
   operator : '-',
      start : head.start ,
        end : n.end ,
      loc   : {  },
     left   : head,
    right   : n,
   }  ;
 }
};
lp.id = function () {
   var e = {  type   : 'a' ,
             value   : null,
            start    : this.c0,
               end   : this.c , 
            loc      : { start : {}, end : this.loc() },
           contents  : null                               ,
              pDepth : 0 ,
   };
   this.next   () ;
   return e ; 
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
