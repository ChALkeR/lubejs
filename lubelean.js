'use strict'

var Parser = function (src) {
  this.peek = 0;
  this.n = 0;
  this.src = src;
  this.col = 0;
  this.c = 0;
  this.li = 1;
  this.v        = 12 ;  
  this. i   =       null ; 
  this. lttype= "";
  this. ltcontents = "" ;
  this.li0 = 0;
  this.col0 = 0;
  this.c0 = 0;
};
var _c = function (c) { return c.charCodeAt(0); };
var _0 = _c('0'),
    _9 = _c('9'),
    _a = _c('a'),
    _z = _c('z'),
    _A = _c('A'),
    _Z = _c('Z'),
    _mul = _c('*'),
    _ws = _c(' '),
    _cubO = _c('{'),
    _cubC = _c('}'),
    _semi = _c(';'),
    _and = _c('&'),
    _mod = _c(('%')),
    _min = _c(('-')),
    _add = _c(('+'));
var cfFor = 2, cfShortNotValid = 8 , cfNonAssigNotValid = 1, METHD = 1 << 4, cfY = 1 << 8 ;
var cfExpectHeadBePrim = ((1) << ((5))), CFLAGS_PTRN_MEM = cfShortNotValid|cfNonAssigNotValid ; 
var    funcFlag = 2 ,
       breakFlag = (funcFlag << 1 ),
    continueFlag = breakFlag << 1 ,
       methdFlag = yieldFlag << 1 , 
       yieldFlag = continueFlag << 1 ; 
var nameInit = 2 ,
    nameGet = nameInit << 2 ,
    nameSet = nameGet << 1 ,
    nameVar = ( 1 ),
    nameMethd = nameInit << ( ( 4) ) ; 
var Num,num = Num = function (c) { return (c >= _0 && c <= _9)};
var IDHead = function (c) {
  return (c <= _z && c >= _a) ||
         (IDS_[c >> 5] & (1 << (c & 31)));
};
var fromRunLenCodes = function (runLenArray, bitm ) {
  bitm = bitm || [];
  var bit = runLenArray[0];
  var runLenIdx = 1, bitIdx = 0;
  var runLen = 0;
  while (runLenIdx < runLenArray.length) {
    runLen = runLenArray[runLenIdx];
    while (runLen--) {
      while ((32 * (bitm.length)) < bitIdx) bitm.push(0); 
      if (bit) bitm[bitIdx >> 5] |= (1 << (31 & bitIdx));
      bitIdx++ ;
    }
    runLenIdx++ ;
    bit ^= 1;
  }
  return (bitm);
}
var lp = Parser.prototype;
lp.next = function () {
  this.skipS();
  if (this.c >= this.src.length) {
      this. lttype =  'eof' ;
      this.ltcontents=  '<<EOF>>';
      return ;
  }
  var c = this.c,
      l = this.src,
      peek,
      start =  c;
  peek  = this.src.charCodeAt(start);
  if ( IDHead(peek) )this.readAnIdentifierToken('');
  else if (Num(peek))this.readNumberLiteral(peek);
  else { 
    switch (peek) {
      case _min:
         this.opAddMin(peek);
         break;
      case _mul:
         if ( l.charCodeAt(c+1) == peek) c++ ; 
      case _mod: 
         c++ ;
         this.lttype = 'op';
         this.ltcontents = l.slice(this.c,c)  ; 
         this.c=c;
         break ;
      case _and:
         c++ ;
         this.lttype = 'op';
         this.ltcontents = '&';
         this.c=c;
         break ;
      default:
        this.c=c;
        this.c0  = c   ;
        this.col0= this.col;
        this.li0 = this. li ;
        this.readMisc();
    }
  }

  this.col += ( this.c - start );
};
lp . opAddMin = function(peek) {
        var c = this.c, assig = false, l = this.src ;
        c++ ;
        var r = l.charCodeAt ( c ) ;
        this.ltcontents = this.src.slice(this.c,c)  ;
        this.lttype = assig ? '=' : this.ltcontents ;
        this.c=c;
}
lp.skipS = function() {
     var c = this.c,
         l = this.src,
         e = l.length,
         start = c;
     while ( c < e ) {
       switch ( l.charCodeAt ( c ) ) {
         case _ws :
             while ( ++c < e &&  l.charCodeAt (  c ) == _ws );
             continue ;
         default :
            this.col += (c-start ) ;
            this.c=c;
            return ;
       }
     } 
  this.col += (c-start ) ;
  this.c = c ;
};
lp.readAnIdentifierToken = function ( v ) {
   if ( !v ) {
     this.li0 = this.li;
     this.col0 = this.col;
     this.c0 = this.c;
    }
    var c = this.c,
        l = this.src,
        e = (l.length),
        peek ,
        r ,
        n = c + 1 ; // the head is already supplied in v
    while ( ++c  < e ) {
      break ;
    }
    this.c = c;
    this.lttype= 'Identifier'   ;
};
lp.readMisc = function () {  this.ltcontents = this.lttype = this.  src.   charAt (   this.c ++  )    ; };
lp.semiLoc = function () {
  switch (this.lttype) {
    case ';': var n = this.loc() ;   this.next () ;  return n  ;
    case 'eof': return this.loc ();
    case '}':
      return this. locOn   ( 1   )                                    ;
  }
  return null ;
};
lp . semiI = function() { return this. ltcontents == ';' ? this.c : 0 ;  }
lp . loc      = function()  { return  { line: this.li , column: this.col       }; }
lp . locBegin = function()  { return  { line: this.li0, column: this.col0      }; }
lp . locOn    = function(l) { return  { line: this.li, column: this.col - l  }; }  
lp . numstr    =   function () {
  var n = {
    type : 'Literal',
   value : null , 
   start : this.c0,
     end : this.c,
   loc : { start : this.locBegin() , end    : this.loc() } ,
   contents : this.ltcontents
  };
  this.next   () ;
  return n   ;
};
lp.lit = function(_v) { 
  var n = {
    type : 'Literal',
   value : _v ,
   start : this.c0,
     end : this.c,
   loc : { start : this.locBegin(),
     end : this.loc() } ,
   contents : this.ltcontents
  };
  this.next   () ;
  return n   ;
};
lp.tok = function() {
 return {
      type : this.lttype,
  contents : this.ltcontents,
     start : this.c - this.ltcontents.length,
       end : this.c,
     loc : { start : this.locOn (this.ltcontents.length),
               end : this.loc   ()   }
 };   
}
lp.parseProgram = function () {
  this.next() ;
  var prog = this.blck() ;
  var e0   = null,             e   =     null  ;
  if ( prog.length ) { e0 = prog[ 0 ]; e       =   prog[ prog . length  -1    ]  ; }
  prog = ({
      type: 'Program',
      body: prog,
    start : e0 ? e0 . start :  0,
      end : e  ? e  .   end :  this.c ,
      sourceType : "script",
      loc:  { start: e0 ? e0 . loc. start :  { line: 1, column: 0 }  , end :   (       e   ?      e.loc.end  :   {   line: this.li , column : this.col }   )   }

   });
   this.next()
   return prog ;
};
lp.blck = function () { // blck ([]stmt)
  var stmts = [], stmt;
  while (stmt = this.parseStatement( false )) stmts.push(stmt);
  return (stmts);
};
lp.parseStatement = function ( nullNo       ) {
  var head, l, e ;
  switch (this.lttype) {
    case '{': return this.parseBlckStatement();
    case ';':
       l  =  { type: 'EmptyStatement', start : this.c - 1,
               loc : { start : this.locOn(1) , end : this.loc() }, end : this.c };

       this.next   () ;
       return l;
             
    case 'eof': return;
  }
  var head = this.parseExprHead (0);
  if (!head) return;
  head = this .parseNonSeqExpr(head, 0, 0 ) ;
  e  = this.semiI() || head . end  ;
  head = { 
    type : 'ExpressionStatement', 
    expression : core( head ) , 
    start : head.start ,
    end : e ,
    loc : { start : head.loc.start, end : this.semiLoc() || head .loc.end }
  };

  return head  ;
};
lp.parseBlckStatement = function () {
  var startc = this.c-1, startLoc = this.locOn(1)  ;
  this.next () ;
  var _e = this.blck   () ;  
  var n = {
        type  : 'BlockStatement',
        body  : _e  ,
        start : startc ,
          end : this.c ,
        loc   :{ start : startLoc , end :   this.loc   ()  } 
  }
  this.next();
  return n;
};
lp.parseNonSeqExpr = function (head, breakIfLessThanThis , cFlags_For ) {
  var n ;
  var _b = null  , _e = null  ; 
  var hasPrefixOrPostfix = false, prec, o, precOrAssocDistance;
  while (!false) {
    switch (this.lttype) {
      case '-' :
      case 'op' :
         break ;

     default:
        return head;
    }
    precOrAssocDistance = prec - breakIfLessThanThis;
    if (precOrAssocDistance != 0 ? precOrAssocDistance < 0 : (prec & 1)) return head;
    o = this. ltcontents ;
    this.next   () ;
    n = (this.parseNonSeqExpr(this.parseExprHead(),prec, cFlags_For ))   ;
    head =  {
        type: (prec==0x09 || prec == 0x0B ) ? 'LogicalExpression' : 'BinaryExpression' , 
   operator :o,
      start : head.start ,
        end : n.end ,
      loc   : {    start : head.loc.start , end : n.loc.end   }  , 
     left   : core(head) ,
    right   : core(n) ,
   }  ;
 }
};
lp.parseExprHead = function (cFlags_For_Sh_Non_Ex ) {
  if ( this . lttype == 'Identifier' ) {
      return this.id () ;
  }
};
lp.id = function () {
   var e = {  type   : 'Identifier' ,
             value   : null ,
            start    : this.c0,
               end   : this.c , 
            loc      : { start : this.locBegin   ()  ,
                         end :   this.loc        ()   } ,
           contents  : this. ltval                               ,
              pDepth : 0 ,
   };
   this.next   () ;
   return e ; 
};

var core = function(n ) { return ( ( n . type == 'paren' ? n.expr : n )) ; } 

var IDS_ = (fromRunLenCodes([0,8472,1,21,1,3948,2], fromRunLenCodes([0,65,26,6,26,47,1,10,1,4,1,5,23,1,31,1,458,4,12,14,5,7,1,1,1,129,5,1,2,2,4,1,1,6,1,1,3,1,1,1,20,1,83,1,139,8,166,1,38,2,1,7,39,72,27,5,3,45,43,35,2,1,99,1,1,15,2,7,2,10,3,2,1,16,1,1,30,29,89,11,1,24,33,9,2,4,1,5,22,4,1,9,1,3,1,23,25,71,21,79,54,3,1,18,1,7,10,15,16,4,8,2,2,2,22,1,7,1,1,3,4,3,1,16,1,13,2,1,3,14,2,19,6,4,2,2,22,1,7,1,2,1,2,1,2,31,4,1,1,19,3,16,9,1,3,1,22,1,7,1,2,1,5,3,1,18,1,15,2,23,1,11,8,2,2,2,22,1,7,1,2,1,5,3,1,30,2,1,3,15,1,17,1,1,6,3,3,1,4,3,2,1,1,1,2,3,2,3,3,3,12,22,1,52,8,1,3,1,23,1,16,3,1,26,3,5,2,35,8,1,3,1,23,1,10,1,5,3,1,32,1,1,2,15,2,18,8,1,3,1,41,2,1,16,1,16,3,24,6,5,18,3,24,1,9,1,1,2,7,58,48,1,2,12,7,58,2,1,1,2,2,1,1,2,1,6,4,1,7,1,3,1,1,1,1,2,2,1,4,1,2,9,1,2,5,1,1,21,4,32,1,63,8,1,36,27,5,115,43,20,1,16,6,4,4,3,1,3,2,7,3,4,13,12,1,17,38,1,1,5,1,2,43,1,333,1,4,2,7,1,1,1,4,2,41,1,4,2,33,1,4,2,7,1,1,1,4,2,15,1,57,1,4,2,67,37,16,16,86,2,6,3,620,2,17,1,26,5,75,3,11,7,13,1,4,14,18,14,18,14,13,1,3,15,52,35,1,4,1,67,88,8,41,1,1,5,70,10,31,49,30,2,5,11,44,4,26,54,23,9,53,82,1,93,47,17,7,55,30,13,2,10,44,26,36,41,3,10,36,107,4,1,4,3,2,9,192,64,278,2,6,2,38,2,6,2,8,1,1,1,1,1,1,1,31,2,53,1,7,1,1,3,3,1,7,3,4,2,6,4,13,5,3,1,7,116,1,13,1,16,13,101,1,4,1,2,10,1,1,2,6,6,1,1,1,1,1,1,16,2,4,5,5,4,1,17,41,2679,47,1,47,1,133,6,4,3,2,12,38,1,1,5,1,2,56,7,1,16,23,9,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,550,3,25,9,7,5,2,5,4,86,4,5,1,90,1,4,5,41,3,94,17,27,53,16,512,6582,74,20950,42,1165,67,46,2,269,3,16,10,2,20,47,16,31,2,80,39,9,2,103,2,35,2,8,63,11,1,3,1,4,1,23,29,52,14,50,62,6,3,1,1,1,12,28,10,23,25,29,7,47,28,1,16,5,1,10,10,5,1,41,23,3,1,8,20,23,3,1,3,50,1,1,3,2,2,5,2,1,1,1,24,3,2,11,7,3,12,6,2,6,2,6,9,7,1,7,1,43,1,10,10,115,29,11172,12,23,4,49,8452,366,2,106,38,7,12,5,5,1,1,10,1,13,1,5,1,1,1,2,1,2,1,108,33,363,18,64,2,54,40,12,116,5,1,135,36,26,6,26,11,89,3,6,2,6,2,6,2,3,35,12,1,26,1,19,1,2,1,15,2,14,34,123,69,53,267,29,3,49,47,32,16,27,5,38,10,30,2,36,4,8,1,5,42,158,98,40,8,52,156,311,9,22,10,8,152,6,2,1,1,44,1,2,3,1,2,23,10,23,9,31,65,19,1,2,10,22,10,26,70,56,6,2,64,1,15,4,1,3,1,27,44,29,3,29,35,8,1,28,27,54,10,22,10,19,13,18,110,73,55,51,13,51,784,53,75,45,32,25,26,36,41,35,3,1,12,48,14,4,21,1,1,1,35,18,1,25,84,7,1,1,1,4,1,15,1,10,7,47,38,8,2,2,2,22,1,7,1,2,1,5,3,1,18,1,12,5,286,48,20,2,1,1,184,47,41,4,36,48,20,1,59,43,85,26,390,64,31,1,448,57,1287,922,102,111,17,196,2748,1071,4049,583,8633,569,7,31,113,30,18,48,16,4,31,21,5,19,880,69,11,1,66,13,16480,2,3070,107,5,13,3,9,7,10,5990,85,1,71,1,2,2,1,2,2,2,4,1,12,1,1,1,7,1,65,1,4,2,8,1,7,1,28,1,4,1,5,1,1,3,7,1,340,2,25,1,25,1,31,1,25,1,31,1,25,1,31,1,25,1,31,1,25,1,8,4148,197,1339,4,1,27,1,2,1,1,2,1,1,10,1,4,1,1,1,1,6,1,4,1,1,1,1,1,1,3,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,4,1,7,1,4,1,4,1,1,1,10,1,17,5,3,1,5,1,17,4420,42711,41,4149,11,222,2,5762,10590,542])));

// this is the one that triggers a segmentation fault (code 139),  and occasionally an 'invalid instruction' (code 132)
// it happens about 7 times out of 30 rounds
var tok = "n";
while (tok.length - 400000 <= -400) {
  tok += ";{a-b*c&d%e*a-b*c&d%e }";
}

console.log( 'length of the input:' , tok.length )  ;

var run = 120; while ( run    ) {
   console.log(run ) ;
   new Parser((tok)).parseProgram() ;
   run -- ; 
}
