'use strict'

var Parser = function (src) {
  this.src = src;
  this.c = 0;
  this.lttype= "";
  this.prec = 0 ;
};
var lp = Parser.prototype;
lp.next = function () {
  this.skipS();
  if (this.c >= this.src.length) {
      this. lttype =  'eof' ;
      return ;
  }
  var c = this.c,
      l = this.src,
      peek  = this.src.charCodeAt(this.c),
      start =  c;
  switch (peek) {
    case 45:
      c++ ;
      this.prec = 0xAD;
      this.lttype = 'op';
      this.c = c;
      break;
    case 59:
      this.c = c;
      this.lttype = ';';
      this.c++;
      break;
    default:
      this.c++;
      this.lttype= 'Identifier';
  }
};
lp.skipS = function() {
     var c = this.c,
         l = this.src,
         e = l.length,
         start = c,
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
    case 'Identifier': break;
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
   var e = {  type   : 'Identifier' ,
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

tok = "n" + Array(19029).fill("a-a-a-a-a-a-a-a-a-a; ").join('');
console.log( 'length of the input:' , tok.length )  ;

var run = 10; while ( run    ) {
  console.log(run ) ;
  var parser = new Parser(tok);
  parser.next() ;
  parser.blck() ;
  run--;
}
