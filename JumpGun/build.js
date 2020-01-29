(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.aZ.al === region.a8.al)
	{
		return 'on line ' + region.aZ.al;
	}
	return 'on lines ' + region.aZ.al + ' through ' + region.a8.al;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}


// BYTES

function _Bytes_width(bytes)
{
	return bytes.byteLength;
}

var _Bytes_getHostEndianness = F2(function(le, be)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(new Uint8Array(new Uint32Array([1]))[0] === 1 ? le : be));
	});
});


// ENCODERS

function _Bytes_encode(encoder)
{
	var mutableBytes = new DataView(new ArrayBuffer($elm$bytes$Bytes$Encode$getWidth(encoder)));
	$elm$bytes$Bytes$Encode$write(encoder)(mutableBytes)(0);
	return mutableBytes;
}


// SIGNED INTEGERS

var _Bytes_write_i8  = F3(function(mb, i, n) { mb.setInt8(i, n); return i + 1; });
var _Bytes_write_i16 = F4(function(mb, i, n, isLE) { mb.setInt16(i, n, isLE); return i + 2; });
var _Bytes_write_i32 = F4(function(mb, i, n, isLE) { mb.setInt32(i, n, isLE); return i + 4; });


// UNSIGNED INTEGERS

var _Bytes_write_u8  = F3(function(mb, i, n) { mb.setUint8(i, n); return i + 1 ;});
var _Bytes_write_u16 = F4(function(mb, i, n, isLE) { mb.setUint16(i, n, isLE); return i + 2; });
var _Bytes_write_u32 = F4(function(mb, i, n, isLE) { mb.setUint32(i, n, isLE); return i + 4; });


// FLOATS

var _Bytes_write_f32 = F4(function(mb, i, n, isLE) { mb.setFloat32(i, n, isLE); return i + 4; });
var _Bytes_write_f64 = F4(function(mb, i, n, isLE) { mb.setFloat64(i, n, isLE); return i + 8; });


// BYTES

var _Bytes_write_bytes = F3(function(mb, offset, bytes)
{
	for (var i = 0, len = bytes.byteLength, limit = len - 4; i <= limit; i += 4)
	{
		mb.setUint32(offset + i, bytes.getUint32(i));
	}
	for (; i < len; i++)
	{
		mb.setUint8(offset + i, bytes.getUint8(i));
	}
	return offset + len;
});


// STRINGS

function _Bytes_getStringWidth(string)
{
	for (var width = 0, i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		width +=
			(code < 0x80) ? 1 :
			(code < 0x800) ? 2 :
			(code < 0xD800 || 0xDBFF < code) ? 3 : (i++, 4);
	}
	return width;
}

var _Bytes_write_string = F3(function(mb, offset, string)
{
	for (var i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		offset +=
			(code < 0x80)
				? (mb.setUint8(offset, code)
				, 1
				)
				:
			(code < 0x800)
				? (mb.setUint16(offset, 0xC080 /* 0b1100000010000000 */
					| (code >>> 6 & 0x1F /* 0b00011111 */) << 8
					| code & 0x3F /* 0b00111111 */)
				, 2
				)
				:
			(code < 0xD800 || 0xDBFF < code)
				? (mb.setUint16(offset, 0xE080 /* 0b1110000010000000 */
					| (code >>> 12 & 0xF /* 0b00001111 */) << 8
					| code >>> 6 & 0x3F /* 0b00111111 */)
				, mb.setUint8(offset + 2, 0x80 /* 0b10000000 */
					| code & 0x3F /* 0b00111111 */)
				, 3
				)
				:
			(code = (code - 0xD800) * 0x400 + string.charCodeAt(++i) - 0xDC00 + 0x10000
			, mb.setUint32(offset, 0xF0808080 /* 0b11110000100000001000000010000000 */
				| (code >>> 18 & 0x7 /* 0b00000111 */) << 24
				| (code >>> 12 & 0x3F /* 0b00111111 */) << 16
				| (code >>> 6 & 0x3F /* 0b00111111 */) << 8
				| code & 0x3F /* 0b00111111 */)
			, 4
			);
	}
	return offset;
});


// DECODER

var _Bytes_decode = F2(function(decoder, bytes)
{
	try {
		return $elm$core$Maybe$Just(A2(decoder, bytes, 0).b);
	} catch(e) {
		return $elm$core$Maybe$Nothing;
	}
});

var _Bytes_read_i8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getInt8(offset)); });
var _Bytes_read_i16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getInt16(offset, isLE)); });
var _Bytes_read_i32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getInt32(offset, isLE)); });
var _Bytes_read_u8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getUint8(offset)); });
var _Bytes_read_u16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getUint16(offset, isLE)); });
var _Bytes_read_u32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getUint32(offset, isLE)); });
var _Bytes_read_f32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getFloat32(offset, isLE)); });
var _Bytes_read_f64 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 8, bytes.getFloat64(offset, isLE)); });

var _Bytes_read_bytes = F3(function(len, bytes, offset)
{
	return _Utils_Tuple2(offset + len, new DataView(bytes.buffer, bytes.byteOffset + offset, len));
});

var _Bytes_read_string = F3(function(len, bytes, offset)
{
	var string = '';
	var end = offset + len;
	for (; offset < end;)
	{
		var byte = bytes.getUint8(offset++);
		string +=
			(byte < 128)
				? String.fromCharCode(byte)
				:
			((byte & 0xE0 /* 0b11100000 */) === 0xC0 /* 0b11000000 */)
				? String.fromCharCode((byte & 0x1F /* 0b00011111 */) << 6 | bytes.getUint8(offset++) & 0x3F /* 0b00111111 */)
				:
			((byte & 0xF0 /* 0b11110000 */) === 0xE0 /* 0b11100000 */)
				? String.fromCharCode(
					(byte & 0xF /* 0b00001111 */) << 12
					| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
					| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
				)
				:
				(byte =
					((byte & 0x7 /* 0b00000111 */) << 18
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 12
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
						| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
					) - 0x10000
				, String.fromCharCode(Math.floor(byte / 0x400) + 0xD800, byte % 0x400 + 0xDC00)
				);
	}
	return _Utils_Tuple2(offset, string);
});

var _Bytes_decodeFailure = F2(function() { throw 0; });



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.ce,
		impl.cs,
		impl.cp,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_enqueueEffects(managers, result.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $justgook$elm_tiled$Tiled$Level$Hexagonal = function (a) {
	return {$: 3, a: a};
};
var $justgook$elm_tiled$Tiled$Level$Isometric = function (a) {
	return {$: 1, a: a};
};
var $justgook$elm_tiled$Tiled$Level$Orthogonal = function (a) {
	return {$: 0, a: a};
};
var $justgook$elm_tiled$Tiled$Level$Staggered = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.b) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.e),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.e);
		} else {
			var treeLen = builder.b * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.f) : builder.f;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.b);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.e) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.e);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{f: nodeList, b: (len / $elm$core$Array$branchFactor) | 0, e: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $justgook$elm_tiled$Tiled$Layer$Image = function (a) {
	return {$: 0, a: a};
};
var $justgook$elm_tiled$Tiled$Layer$InfiniteTile = function (a) {
	return {$: 3, a: a};
};
var $justgook$elm_tiled$Tiled$Layer$Object = function (a) {
	return {$: 1, a: a};
};
var $justgook$elm_tiled$Tiled$Layer$Tile = function (a) {
	return {$: 2, a: a};
};
var $justgook$elm_tiled$Tiled$Layer$ImageData = F9(
	function (id, image, name, opacity, visible, x, y, transparentcolor, properties) {
		return {D: id, bn: image, cf: name, I: opacity, K: properties, bQ: transparentcolor, T: visible, bT: x, bU: y};
	});
var $justgook$elm_tiled$Tiled$Properties$Bool = function (a) {
	return {$: 0, a: a};
};
var $justgook$elm_tiled$Tiled$Properties$Color = function (a) {
	return {$: 4, a: a};
};
var $justgook$elm_tiled$Tiled$Properties$File = function (a) {
	return {$: 5, a: a};
};
var $justgook$elm_tiled$Tiled$Properties$Float = function (a) {
	return {$: 2, a: a};
};
var $justgook$elm_tiled$Tiled$Properties$Int = function (a) {
	return {$: 1, a: a};
};
var $justgook$elm_tiled$Tiled$Properties$Object = function (a) {
	return {$: 6, a: a};
};
var $justgook$elm_tiled$Tiled$Properties$String = function (a) {
	return {$: 3, a: a};
};
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $justgook$elm_tiled$Tiled$Properties$decodeProperty = function (typeString) {
	switch (typeString) {
		case 'bool':
			return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Properties$Bool, $elm$json$Json$Decode$bool);
		case 'int':
			return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Properties$Int, $elm$json$Json$Decode$int);
		case 'float':
			return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Properties$Float, $elm$json$Json$Decode$float);
		case 'string':
			return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Properties$String, $elm$json$Json$Decode$string);
		case 'color':
			return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Properties$Color, $elm$json$Json$Decode$string);
		case 'file':
			return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Properties$File, $elm$json$Json$Decode$string);
		case 'object':
			return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Properties$Object, $elm$json$Json$Decode$int);
		default:
			return $elm$json$Json$Decode$fail('I can\'t decode the property type ' + typeString);
	}
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm$json$Json$Decode$field = _Json_decodeField;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $justgook$elm_tiled$Tiled$Properties$decode = A2(
	$elm$json$Json$Decode$map,
	$elm$core$Dict$fromList,
	$elm$json$Json$Decode$list(
		A2(
			$elm$json$Json$Decode$andThen,
			function (kind) {
				return A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'value',
					$justgook$elm_tiled$Tiled$Properties$decodeProperty(kind),
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'name',
						$elm$json$Json$Decode$string,
						$elm$json$Json$Decode$succeed(
							F2(
								function (a, b) {
									return _Utils_Tuple2(a, b);
								}))));
			},
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'type',
				$elm$json$Json$Decode$string,
				$elm$json$Json$Decode$succeed($elm$core$Basics$identity)))));
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						$elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _v0 = A2($elm$json$Json$Decode$decodeValue, pathDecoder, input);
			if (!_v0.$) {
				var rawValue = _v0.a;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (!_v1.$) {
					var finalResult = _v1.a;
					return $elm$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _v1.a;
					return $elm$json$Json$Decode$fail(
						$elm$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return $elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2($elm$json$Json$Decode$andThen, handleResult, $elm$json$Json$Decode$value);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2($elm$json$Json$Decode$field, key, $elm$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var $justgook$elm_tiled$Tiled$Layer$decodeImage = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'properties',
	$justgook$elm_tiled$Tiled$Properties$decode,
	$elm$core$Dict$empty,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'transparentcolor',
		$elm$json$Json$Decode$string,
		'none',
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'y',
			$elm$json$Json$Decode$float,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'x',
				$elm$json$Json$Decode$float,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'visible',
					$elm$json$Json$Decode$bool,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'opacity',
						$elm$json$Json$Decode$float,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'name',
							$elm$json$Json$Decode$string,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'image',
								$elm$json$Json$Decode$string,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'id',
									$elm$json$Json$Decode$int,
									$elm$json$Json$Decode$succeed($justgook$elm_tiled$Tiled$Layer$ImageData))))))))));
var $justgook$elm_tiled$Tiled$Layer$ObjectData = function (id) {
	return function (draworder) {
		return function (name) {
			return function (objects) {
				return function (opacity) {
					return function (visible) {
						return function (x) {
							return function (y) {
								return function (color) {
									return function (properties) {
										return {at: color, a6: draworder, D: id, cf: name, bu: objects, I: opacity, K: properties, T: visible, bT: x, bU: y};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $justgook$elm_tiled$Tiled$Object$Ellipse = function (a) {
	return {$: 2, a: a};
};
var $justgook$elm_tiled$Tiled$Object$Point = function (a) {
	return {$: 0, a: a};
};
var $justgook$elm_tiled$Tiled$Object$PolyLine = function (a) {
	return {$: 4, a: a};
};
var $justgook$elm_tiled$Tiled$Object$Polygon = function (a) {
	return {$: 3, a: a};
};
var $justgook$elm_tiled$Tiled$Object$Rectangle = function (a) {
	return {$: 1, a: a};
};
var $justgook$elm_tiled$Tiled$Object$Tile = function (a) {
	return {$: 5, a: a};
};
var $justgook$elm_tiled$Tiled$Object$commonDimension = F2(
	function (a, b) {
		return {C: b.C, D: a.D, F: a.F, cf: a.cf, K: a.K, M: a.M, T: a.T, z: b.z, bT: a.bT, bU: a.bU};
	});
var $justgook$elm_tiled$Tiled$Object$commonDimensionArgsGid = F3(
	function (a, b, c) {
		return {bg: c, C: b.C, D: a.D, F: a.F, cf: a.cf, K: a.K, M: a.M, T: a.T, z: b.z, bT: a.bT, bU: a.bU};
	});
var $justgook$elm_tiled$Tiled$Object$commonDimensionPolyPoints = F3(
	function (a, b, c) {
		return {C: b.C, D: a.D, F: a.F, cf: a.cf, aT: c, K: a.K, M: a.M, T: a.T, z: b.z, bT: a.bT, bU: a.bU};
	});
var $justgook$elm_tiled$Tiled$Object$decodeCommon = function () {
	var common = F8(
		function (id, name, kind, visible, x, y, rotation, properties) {
			return {D: id, F: kind, cf: name, K: properties, M: rotation, T: visible, bT: x, bU: y};
		});
	return A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'properties',
		$justgook$elm_tiled$Tiled$Properties$decode,
		$elm$core$Dict$empty,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'rotation',
			$elm$json$Json$Decode$float,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'y',
				$elm$json$Json$Decode$float,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'x',
					$elm$json$Json$Decode$float,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'visible',
						$elm$json$Json$Decode$bool,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'type',
							$elm$json$Json$Decode$string,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'name',
								$elm$json$Json$Decode$string,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'id',
									$elm$json$Json$Decode$int,
									$elm$json$Json$Decode$succeed(common)))))))));
}();
var $justgook$elm_tiled$Tiled$Object$decodeDimension = function () {
	var dimension = F2(
		function (width, height) {
			return {C: height, z: width};
		});
	return A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'height',
		$elm$json$Json$Decode$float,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'width',
			$elm$json$Json$Decode$float,
			$elm$json$Json$Decode$succeed(dimension)));
}();
var $justgook$elm_tiled$Tiled$Object$decodeGid = A2($elm$json$Json$Decode$field, 'gid', $elm$json$Json$Decode$int);
var $justgook$elm_tiled$Tiled$Object$decodePolyPoints = $elm$json$Json$Decode$list(
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'y',
		$elm$json$Json$Decode$float,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'x',
			$elm$json$Json$Decode$float,
			$elm$json$Json$Decode$succeed(
				F2(
					function (x, y) {
						return {bT: x, bU: y};
					})))));
var $elm$json$Json$Decode$map3 = _Json_map3;
var $justgook$elm_tiled$Tiled$Object$when = F3(
	function (checkDecoder, check, passDecoder) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (checkVal) {
				return check(checkVal) ? passDecoder : $elm$json$Json$Decode$fail('Check failed with input');
			},
			checkDecoder);
	});
var $justgook$elm_tiled$Tiled$Object$decode = function () {
	var tile = A3(
		$justgook$elm_tiled$Tiled$Object$when,
		A2($elm$json$Json$Decode$field, 'gid', $elm$json$Json$Decode$int),
		$elm$core$Basics$lt(0),
		A2(
			$elm$json$Json$Decode$map,
			$justgook$elm_tiled$Tiled$Object$Tile,
			A4($elm$json$Json$Decode$map3, $justgook$elm_tiled$Tiled$Object$commonDimensionArgsGid, $justgook$elm_tiled$Tiled$Object$decodeCommon, $justgook$elm_tiled$Tiled$Object$decodeDimension, $justgook$elm_tiled$Tiled$Object$decodeGid)));
	var rectangle = A2(
		$elm$json$Json$Decode$map,
		$justgook$elm_tiled$Tiled$Object$Rectangle,
		A3($elm$json$Json$Decode$map2, $justgook$elm_tiled$Tiled$Object$commonDimension, $justgook$elm_tiled$Tiled$Object$decodeCommon, $justgook$elm_tiled$Tiled$Object$decodeDimension));
	var polyline = A2(
		$elm$json$Json$Decode$map,
		$justgook$elm_tiled$Tiled$Object$PolyLine,
		A4(
			$elm$json$Json$Decode$map3,
			$justgook$elm_tiled$Tiled$Object$commonDimensionPolyPoints,
			$justgook$elm_tiled$Tiled$Object$decodeCommon,
			$justgook$elm_tiled$Tiled$Object$decodeDimension,
			A2($elm$json$Json$Decode$field, 'polyline', $justgook$elm_tiled$Tiled$Object$decodePolyPoints)));
	var polygon = A2(
		$elm$json$Json$Decode$map,
		$justgook$elm_tiled$Tiled$Object$Polygon,
		A4(
			$elm$json$Json$Decode$map3,
			$justgook$elm_tiled$Tiled$Object$commonDimensionPolyPoints,
			$justgook$elm_tiled$Tiled$Object$decodeCommon,
			$justgook$elm_tiled$Tiled$Object$decodeDimension,
			A2($elm$json$Json$Decode$field, 'polygon', $justgook$elm_tiled$Tiled$Object$decodePolyPoints)));
	var point = A3(
		$justgook$elm_tiled$Tiled$Object$when,
		A2($elm$json$Json$Decode$field, 'point', $elm$json$Json$Decode$bool),
		$elm$core$Basics$eq(true),
		A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Object$Point, $justgook$elm_tiled$Tiled$Object$decodeCommon));
	var ellipse = A3(
		$justgook$elm_tiled$Tiled$Object$when,
		A2($elm$json$Json$Decode$field, 'ellipse', $elm$json$Json$Decode$bool),
		$elm$core$Basics$eq(true),
		A2(
			$elm$json$Json$Decode$map,
			$justgook$elm_tiled$Tiled$Object$Ellipse,
			A3($elm$json$Json$Decode$map2, $justgook$elm_tiled$Tiled$Object$commonDimension, $justgook$elm_tiled$Tiled$Object$decodeCommon, $justgook$elm_tiled$Tiled$Object$decodeDimension)));
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[point, ellipse, tile, polygon, polyline, rectangle]));
}();
var $justgook$elm_tiled$Tiled$Layer$Index = 1;
var $justgook$elm_tiled$Tiled$Layer$TopDown = 0;
var $justgook$elm_tiled$Tiled$Layer$decodeDraworder = A2(
	$elm$json$Json$Decode$andThen,
	function (result) {
		switch (result) {
			case 'topdown':
				return $elm$json$Json$Decode$succeed(0);
			case 'index':
				return $elm$json$Json$Decode$succeed(1);
			default:
				return $elm$json$Json$Decode$fail('Unknow render order');
		}
	},
	$elm$json$Json$Decode$string);
var $justgook$elm_tiled$Tiled$Layer$decodeObjectLayer = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'properties',
	$justgook$elm_tiled$Tiled$Properties$decode,
	$elm$core$Dict$empty,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'color',
		$elm$json$Json$Decode$string,
		'none',
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'y',
			$elm$json$Json$Decode$float,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'x',
				$elm$json$Json$Decode$float,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'visible',
					$elm$json$Json$Decode$bool,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'opacity',
						$elm$json$Json$Decode$float,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'objects',
							$elm$json$Json$Decode$list($justgook$elm_tiled$Tiled$Object$decode),
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'name',
								$elm$json$Json$Decode$string,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'draworder',
									$justgook$elm_tiled$Tiled$Layer$decodeDraworder,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'id',
										$elm$json$Json$Decode$int,
										$elm$json$Json$Decode$succeed($justgook$elm_tiled$Tiled$Layer$ObjectData)))))))))));
var $justgook$elm_tiled$Tiled$Layer$TileChunkedData = function (id) {
	return function (chunks) {
		return function (name) {
			return function (opacity) {
				return function (visible) {
					return function (width) {
						return function (height) {
							return function (startx) {
								return function (starty) {
									return function (x) {
										return function (y) {
											return function (properties) {
												return {a3: chunks, C: height, D: id, cf: name, I: opacity, K: properties, cn: startx, co: starty, T: visible, z: width, bT: x, bU: y};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $justgook$elm_tiled$Tiled$Layer$Chunk = F5(
	function (data, height, width, x, y) {
		return {b2: data, C: height, z: width, bT: x, bU: y};
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$bytes$Bytes$LE = 0;
var $elm$bytes$Bytes$Encode$getWidth = function (builder) {
	switch (builder.$) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 4;
		case 3:
			return 1;
		case 4:
			return 2;
		case 5:
			return 4;
		case 6:
			return 4;
		case 7:
			return 8;
		case 8:
			var w = builder.a;
			return w;
		case 9:
			var w = builder.a;
			return w;
		default:
			var bs = builder.a;
			return _Bytes_width(bs);
	}
};
var $elm$bytes$Bytes$Encode$write = F3(
	function (builder, mb, offset) {
		switch (builder.$) {
			case 0:
				var n = builder.a;
				return A3(_Bytes_write_i8, mb, offset, n);
			case 1:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_i16, mb, offset, n, !e);
			case 2:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_i32, mb, offset, n, !e);
			case 3:
				var n = builder.a;
				return A3(_Bytes_write_u8, mb, offset, n);
			case 4:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_u16, mb, offset, n, !e);
			case 5:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_u32, mb, offset, n, !e);
			case 6:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_f32, mb, offset, n, !e);
			case 7:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_f64, mb, offset, n, !e);
			case 8:
				var bs = builder.b;
				return A3($elm$bytes$Bytes$Encode$writeSequence, bs, mb, offset);
			case 9:
				var s = builder.b;
				return A3(_Bytes_write_string, mb, offset, s);
			default:
				var bs = builder.a;
				return A3(_Bytes_write_bytes, mb, offset, bs);
		}
	});
var $elm$bytes$Bytes$Encode$writeSequence = F3(
	function (builders, mb, offset) {
		writeSequence:
		while (true) {
			if (!builders.b) {
				return offset;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$builders = bs,
					$temp$mb = mb,
					$temp$offset = A3($elm$bytes$Bytes$Encode$write, b, mb, offset);
				builders = $temp$builders;
				mb = $temp$mb;
				offset = $temp$offset;
				continue writeSequence;
			}
		}
	});
var $elm$bytes$Bytes$Decode$decode = F2(
	function (_v0, bs) {
		var decoder = _v0;
		return A2(_Bytes_decode, decoder, bs);
	});
var $elm$bytes$Bytes$Decode$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$bytes$Bytes$Decode$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$bytes$Bytes$Decode$Decoder = $elm$core$Basics$identity;
var $elm$bytes$Bytes$Decode$map = F2(
	function (func, _v0) {
		var decodeA = _v0;
		return F2(
			function (bites, offset) {
				var _v1 = A2(decodeA, bites, offset);
				var aOffset = _v1.a;
				var a = _v1.b;
				return _Utils_Tuple2(
					aOffset,
					func(a));
			});
	});
var $elm$bytes$Bytes$Decode$succeed = function (a) {
	return F2(
		function (_v0, offset) {
			return _Utils_Tuple2(offset, a);
		});
};
var $justgook$elm_tiled$Tiled$Layer$listStep = F2(
	function (decoder, _v0) {
		var n = _v0.a;
		var xs = _v0.b;
		return (n <= 0) ? $elm$bytes$Bytes$Decode$succeed(
			$elm$bytes$Bytes$Decode$Done(xs)) : A2(
			$elm$bytes$Bytes$Decode$map,
			function (x) {
				return $elm$bytes$Bytes$Decode$Loop(
					_Utils_Tuple2(
						n - 1,
						A2($elm$core$List$cons, x, xs)));
			},
			decoder);
	});
var $elm$bytes$Bytes$Decode$loopHelp = F4(
	function (state, callback, bites, offset) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var decoder = _v0;
			var _v1 = A2(decoder, bites, offset);
			var newOffset = _v1.a;
			var step = _v1.b;
			if (!step.$) {
				var newState = step.a;
				var $temp$state = newState,
					$temp$callback = callback,
					$temp$bites = bites,
					$temp$offset = newOffset;
				state = $temp$state;
				callback = $temp$callback;
				bites = $temp$bites;
				offset = $temp$offset;
				continue loopHelp;
			} else {
				var result = step.a;
				return _Utils_Tuple2(newOffset, result);
			}
		}
	});
var $elm$bytes$Bytes$Decode$loop = F2(
	function (state, callback) {
		return A2($elm$bytes$Bytes$Decode$loopHelp, state, callback);
	});
var $justgook$elm_tiled$Tiled$Layer$listOfBytesDecode = F2(
	function (len, decoder) {
		return A2(
			$elm$bytes$Bytes$Decode$loop,
			_Utils_Tuple2(len, _List_Nil),
			$justgook$elm_tiled$Tiled$Layer$listStep(decoder));
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$bytes$Bytes$Decode$unsignedInt32 = function (endianness) {
	return _Bytes_read_u32(!endianness);
};
var $elm$bytes$Bytes$width = _Bytes_width;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $justgook$elm_tiled$Tiled$Layer$bytesToList = F2(
	function (onFail, bytes) {
		return A2(
			$elm$core$Maybe$withDefault,
			$elm$json$Json$Decode$fail(onFail),
			A2(
				$elm$core$Maybe$map,
				$elm$json$Json$Decode$succeed,
				A2(
					$elm$core$Maybe$map,
					$elm$core$List$reverse,
					A2(
						$elm$core$Maybe$andThen,
						function (b) {
							return A2(
								$elm$bytes$Bytes$Decode$decode,
								A2(
									$justgook$elm_tiled$Tiled$Layer$listOfBytesDecode,
									($elm$bytes$Bytes$width(b) / 4) | 0,
									$elm$bytes$Bytes$Decode$unsignedInt32(0)),
								b);
						},
						bytes))));
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$bytes$Bytes$Decode$map2 = F3(
	function (func, _v0, _v1) {
		var decodeA = _v0;
		var decodeB = _v1;
		return F2(
			function (bites, offset) {
				var _v2 = A2(decodeA, bites, offset);
				var aOffset = _v2.a;
				var a = _v2.b;
				var _v3 = A2(decodeB, bites, aOffset);
				var bOffset = _v3.a;
				var b = _v3.b;
				return _Utils_Tuple2(
					bOffset,
					A2(func, a, b));
			});
	});
var $folkertdev$elm_flate$Inflate$GZip$andMap = F2(
	function (argument, _function) {
		return A3($elm$bytes$Bytes$Decode$map2, $elm$core$Basics$apL, _function, argument);
	});
var $elm$bytes$Bytes$Decode$andThen = F2(
	function (callback, _v0) {
		var decodeA = _v0;
		return F2(
			function (bites, offset) {
				var _v1 = A2(decodeA, bites, offset);
				var newOffset = _v1.a;
				var a = _v1.b;
				var _v2 = callback(a);
				var decodeB = _v2;
				return A2(decodeB, bites, newOffset);
			});
	});
var $elm$bytes$Bytes$Decode$bytes = function (n) {
	return _Bytes_read_bytes(n);
};
var $elm$bytes$Bytes$BE = 1;
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $folkertdev$elm_flate$Checksum$Crc32$tinf_crc32case = function (i) {
	switch (i) {
		case 0:
			return 0;
		case 1:
			return 498536548;
		case 2:
			return 997073096;
		case 3:
			return 651767980;
		case 4:
			return 1994146192;
		case 5:
			return 1802195444;
		case 6:
			return 1303535960;
		case 7:
			return 1342533948;
		case 8:
			return 3988292384;
		case 9:
			return 4027552580;
		case 10:
			return 3604390888;
		case 11:
			return 3412177804;
		case 12:
			return 2607071920;
		case 13:
			return 2262029012;
		case 14:
			return 2685067896;
		default:
			return 3183342108;
	}
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $folkertdev$elm_flate$Checksum$Crc32$step = F2(
	function (_byte, crc) {
		var a = (crc ^ _byte) >>> 0;
		var b = ((a >>> 4) ^ $folkertdev$elm_flate$Checksum$Crc32$tinf_crc32case(a & 15)) >>> 0;
		var c = (b >>> 4) ^ $folkertdev$elm_flate$Checksum$Crc32$tinf_crc32case(b & 15);
		return c;
	});
var $elm$bytes$Bytes$Decode$unsignedInt8 = _Bytes_read_u8;
var $folkertdev$elm_flate$Checksum$Crc32$crc32Help = function (_v0) {
	var remaining = _v0.aB;
	var crc = _v0.av;
	return (remaining >= 8) ? A3(
		$elm$bytes$Bytes$Decode$map2,
		F2(
			function (word1, word2) {
				var byte8 = 255 & word2;
				var byte7 = 255 & (word2 >>> 8);
				var byte6 = 255 & (word2 >>> 16);
				var byte5 = 255 & (word2 >>> 24);
				var byte4 = 255 & word1;
				var byte3 = 255 & (word1 >>> 8);
				var byte2 = 255 & (word1 >>> 16);
				var byte1 = 255 & (word1 >>> 24);
				return $elm$bytes$Bytes$Decode$Loop(
					{
						av: A2(
							$folkertdev$elm_flate$Checksum$Crc32$step,
							byte8,
							A2(
								$folkertdev$elm_flate$Checksum$Crc32$step,
								byte7,
								A2(
									$folkertdev$elm_flate$Checksum$Crc32$step,
									byte6,
									A2(
										$folkertdev$elm_flate$Checksum$Crc32$step,
										byte5,
										A2(
											$folkertdev$elm_flate$Checksum$Crc32$step,
											byte4,
											A2(
												$folkertdev$elm_flate$Checksum$Crc32$step,
												byte3,
												A2(
													$folkertdev$elm_flate$Checksum$Crc32$step,
													byte2,
													A2($folkertdev$elm_flate$Checksum$Crc32$step, byte1, crc)))))))),
						aB: remaining - 8
					});
			}),
		$elm$bytes$Bytes$Decode$unsignedInt32(1),
		$elm$bytes$Bytes$Decode$unsignedInt32(1)) : ((remaining > 0) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_byte) {
			return $elm$bytes$Bytes$Decode$Loop(
				{
					av: A2($folkertdev$elm_flate$Checksum$Crc32$step, _byte, crc),
					aB: remaining - 1
				});
		},
		$elm$bytes$Bytes$Decode$unsignedInt8) : $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done((crc ^ 4294967295) >>> 0)));
};
var $folkertdev$elm_flate$Checksum$Crc32$tinf_crc32 = function (buffer) {
	var length = $elm$bytes$Bytes$width(buffer);
	var initialCrc = 4294967295;
	return (!length) ? 0 : A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$bytes$Bytes$Decode$decode,
			A2(
				$elm$bytes$Bytes$Decode$loop,
				{av: initialCrc, aB: length},
				$folkertdev$elm_flate$Checksum$Crc32$crc32Help),
			buffer));
};
var $folkertdev$elm_flate$Checksum$Crc32$crc32 = $folkertdev$elm_flate$Checksum$Crc32$tinf_crc32;
var $elm$bytes$Bytes$Decode$fail = _Bytes_decodeFailure;
var $folkertdev$elm_flate$Inflate$GZip$flags = {a4: 16, av: 2, ba: 4, cf: 8, cq: 1};
var $elm$core$Basics$neq = _Utils_notEqual;
var $folkertdev$elm_flate$Inflate$GZip$skipUntilZero = function () {
	var go = function (n) {
		return A2(
			$elm$bytes$Bytes$Decode$map,
			function (_byte) {
				return (!_byte) ? $elm$bytes$Bytes$Decode$Done(n + 1) : $elm$bytes$Bytes$Decode$Loop(n + 1);
			},
			$elm$bytes$Bytes$Decode$unsignedInt8);
	};
	return A2($elm$bytes$Bytes$Decode$loop, 0, go);
}();
var $elm$bytes$Bytes$Decode$unsignedInt16 = function (endianness) {
	return _Bytes_read_u16(!endianness);
};
var $folkertdev$elm_flate$Inflate$GZip$gzipFindBuffer = function (sliced) {
	if ((sliced.bl !== 31) || (sliced.bm !== 139)) {
		return $elm$core$Maybe$Nothing;
	} else {
		if (sliced.br !== 8) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!(!(sliced.aN & 224))) {
				return $elm$core$Maybe$Nothing;
			} else {
				var headerSize = 10;
				var flagSet = function (flag) {
					return !(!(sliced.aN & flag));
				};
				var skipExtra = flagSet($folkertdev$elm_flate$Inflate$GZip$flags.ba) ? A2(
					$elm$bytes$Bytes$Decode$andThen,
					function (extraSize) {
						return A2(
							$elm$bytes$Bytes$Decode$map,
							function (_v1) {
								return extraSize + 2;
							},
							$elm$bytes$Bytes$Decode$bytes(extraSize));
					},
					$elm$bytes$Bytes$Decode$unsignedInt16(0)) : $elm$bytes$Bytes$Decode$succeed(0);
				var skipFileComment = flagSet($folkertdev$elm_flate$Inflate$GZip$flags.a4) ? $folkertdev$elm_flate$Inflate$GZip$skipUntilZero : $elm$bytes$Bytes$Decode$succeed(0);
				var skipFileName = flagSet($folkertdev$elm_flate$Inflate$GZip$flags.cf) ? $folkertdev$elm_flate$Inflate$GZip$skipUntilZero : $elm$bytes$Bytes$Decode$succeed(0);
				var skipAll = A2(
					$folkertdev$elm_flate$Inflate$GZip$andMap,
					skipFileComment,
					A2(
						$folkertdev$elm_flate$Inflate$GZip$andMap,
						skipFileName,
						A2(
							$folkertdev$elm_flate$Inflate$GZip$andMap,
							skipExtra,
							$elm$bytes$Bytes$Decode$succeed(
								F3(
									function (a, b, c) {
										return (a + b) + c;
									})))));
				var checkHeaderCrc = function (bytesRead) {
					return flagSet($folkertdev$elm_flate$Inflate$GZip$flags.av) ? A2(
						$elm$bytes$Bytes$Decode$andThen,
						function (checksum) {
							var _v0 = A2(
								$elm$bytes$Bytes$Decode$decode,
								$elm$bytes$Bytes$Decode$bytes(bytesRead),
								sliced.by);
							if (!_v0.$) {
								var header = _v0.a;
								return (!_Utils_eq(
									checksum,
									$folkertdev$elm_flate$Checksum$Crc32$crc32(header) & 65535)) ? $elm$bytes$Bytes$Decode$fail : $elm$bytes$Bytes$Decode$succeed(2);
							} else {
								return $elm$bytes$Bytes$Decode$fail;
							}
						},
						$elm$bytes$Bytes$Decode$unsignedInt16(0)) : $elm$bytes$Bytes$Decode$succeed(0);
				};
				var decoder = A2(
					$elm$bytes$Bytes$Decode$andThen,
					function (skipped0) {
						return A2(
							$elm$bytes$Bytes$Decode$andThen,
							function (skipped1) {
								var skipped = skipped0 + skipped1;
								return $elm$bytes$Bytes$Decode$bytes(
									$elm$bytes$Bytes$width(sliced.j) - skipped);
							},
							checkHeaderCrc(skipped0 + headerSize));
					},
					skipAll);
				return A2($elm$bytes$Bytes$Decode$decode, decoder, sliced.j);
			}
		}
	}
};
var $folkertdev$elm_flate$Inflate$GZip$GzipSlice = F9(
	function (orig, id1, id2, method, flg, restOfHeader, buffer, crc32, decompressedLength) {
		return {j: buffer, b1: crc32, b4: decompressedLength, aN: flg, bl: id1, bm: id2, br: method, by: orig, ck: restOfHeader};
	});
var $folkertdev$elm_flate$Inflate$GZip$gzipSlice = function (buffer) {
	var decoder = A2(
		$folkertdev$elm_flate$Inflate$GZip$andMap,
		$elm$bytes$Bytes$Decode$unsignedInt32(0),
		A2(
			$folkertdev$elm_flate$Inflate$GZip$andMap,
			$elm$bytes$Bytes$Decode$unsignedInt32(0),
			A2(
				$folkertdev$elm_flate$Inflate$GZip$andMap,
				$elm$bytes$Bytes$Decode$bytes(
					(($elm$bytes$Bytes$width(buffer) - 10) - 4) - 4),
				A2(
					$folkertdev$elm_flate$Inflate$GZip$andMap,
					$elm$bytes$Bytes$Decode$bytes(6),
					A2(
						$folkertdev$elm_flate$Inflate$GZip$andMap,
						$elm$bytes$Bytes$Decode$unsignedInt8,
						A2(
							$folkertdev$elm_flate$Inflate$GZip$andMap,
							$elm$bytes$Bytes$Decode$unsignedInt8,
							A2(
								$folkertdev$elm_flate$Inflate$GZip$andMap,
								$elm$bytes$Bytes$Decode$unsignedInt8,
								A2(
									$folkertdev$elm_flate$Inflate$GZip$andMap,
									$elm$bytes$Bytes$Decode$unsignedInt8,
									$elm$bytes$Bytes$Decode$succeed(
										$folkertdev$elm_flate$Inflate$GZip$GzipSlice(buffer))))))))));
	return A2($elm$bytes$Bytes$Decode$decode, decoder, buffer);
};
var $elm$bytes$Bytes$Encode$Bytes = function (a) {
	return {$: 10, a: a};
};
var $elm$bytes$Bytes$Encode$bytes = $elm$bytes$Bytes$Encode$Bytes;
var $folkertdev$elm_flate$Inflate$BitReader$decode = F2(
	function (bytes, _v0) {
		var reader = _v0;
		var initialState = {d: 0, j: bytes, i: 0, g: 0, x: 0};
		var _v1 = reader(initialState);
		if (!_v1.$) {
			var _v2 = _v1.a;
			var value = _v2.a;
			return $elm$core$Result$Ok(value);
		} else {
			var e = _v1.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$bytes$Bytes$Encode$encode = _Bytes_encode;
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$bytes$Bytes$Encode$Seq = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$getWidths = F2(
	function (width, builders) {
		getWidths:
		while (true) {
			if (!builders.b) {
				return width;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$width = width + $elm$bytes$Bytes$Encode$getWidth(b),
					$temp$builders = bs;
				width = $temp$width;
				builders = $temp$builders;
				continue getWidths;
			}
		}
	});
var $elm$bytes$Bytes$Encode$sequence = function (builders) {
	return A2(
		$elm$bytes$Bytes$Encode$Seq,
		A2($elm$bytes$Bytes$Encode$getWidths, 0, builders),
		builders);
};
var $folkertdev$elm_flate$Experimental$ByteArray$ByteArray = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $folkertdev$elm_flate$Experimental$ByteArray$empty = A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, $elm$core$Array$empty, 0, 0);
var $folkertdev$elm_flate$Inflate$BitReader$BitReader = $elm$core$Basics$identity;
var $folkertdev$elm_flate$Inflate$BitReader$loopHelp = F3(
	function (accum, callback, state) {
		loopHelp:
		while (true) {
			var _v0 = callback(accum);
			var decoder = _v0;
			var _v1 = decoder(state);
			if (_v1.$ === 1) {
				var e = _v1.a;
				return $elm$core$Result$Err(e);
			} else {
				if (!_v1.a.a.$) {
					var _v2 = _v1.a;
					var newAccum = _v2.a.a;
					var newState = _v2.b;
					var $temp$accum = newAccum,
						$temp$callback = callback,
						$temp$state = newState;
					accum = $temp$accum;
					callback = $temp$callback;
					state = $temp$state;
					continue loopHelp;
				} else {
					var _v3 = _v1.a;
					var result = _v3.a.a;
					var newState = _v3.b;
					return $elm$core$Result$Ok(
						_Utils_Tuple2(result, newState));
				}
			}
		}
	});
var $folkertdev$elm_flate$Inflate$BitReader$loop = F2(
	function (state, callback) {
		return A2($folkertdev$elm_flate$Inflate$BitReader$loopHelp, state, callback);
	});
var $folkertdev$elm_flate$Inflate$BitReader$map = F2(
	function (f, _v0) {
		var g = _v0;
		return function (s) {
			var _v1 = g(s);
			if (!_v1.$) {
				var _v2 = _v1.a;
				var value = _v2.a;
				var newState = _v2.b;
				return $elm$core$Result$Ok(
					_Utils_Tuple2(
						f(value),
						newState));
			} else {
				var e = _v1.a;
				return $elm$core$Result$Err(e);
			}
		};
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$bytes$Bytes$Encode$U16 = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$unsignedInt16 = $elm$bytes$Bytes$Encode$U16;
var $elm$bytes$Bytes$Encode$U32 = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$unsignedInt32 = $elm$bytes$Bytes$Encode$U32;
var $elm$bytes$Bytes$Encode$U8 = function (a) {
	return {$: 3, a: a};
};
var $elm$bytes$Bytes$Encode$unsignedInt8 = $elm$bytes$Bytes$Encode$U8;
var $folkertdev$elm_flate$Experimental$ByteArray$toBytes = function (_v0) {
	var array = _v0.a;
	var finalSize = _v0.b;
	var finalBytes = _v0.c;
	var initial = function () {
		var finalInt32 = finalBytes >>> ((4 - finalSize) * 8);
		switch (finalSize) {
			case 4:
				return _List_fromArray(
					[
						A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, finalBytes)
					]);
			case 1:
				return _List_fromArray(
					[
						$elm$bytes$Bytes$Encode$unsignedInt8(finalInt32)
					]);
			case 2:
				return _List_fromArray(
					[
						A2($elm$bytes$Bytes$Encode$unsignedInt16, 1, finalInt32)
					]);
			case 3:
				return _List_fromArray(
					[
						A2($elm$bytes$Bytes$Encode$unsignedInt16, 1, finalInt32 >> 8),
						$elm$bytes$Bytes$Encode$unsignedInt8(255 & finalInt32)
					]);
			default:
				return _List_Nil;
		}
	}();
	var folder = F2(
		function (element, accum) {
			return A2(
				$elm$core$List$cons,
				A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, element),
				accum);
		});
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			A3($elm$core$Array$foldr, folder, initial, array)));
};
var $folkertdev$elm_flate$Inflate$BitReader$andThen = F2(
	function (f, _v0) {
		var g = _v0;
		return function (s) {
			var _v1 = g(s);
			if (!_v1.$) {
				var _v2 = _v1.a;
				var value = _v2.a;
				var newState = _v2.b;
				var _v3 = f(value);
				var h = _v3;
				return h(newState);
			} else {
				var e = _v1.a;
				return $elm$core$Result$Err(e);
			}
		};
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Bitwise$or = _Bitwise_or;
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!value.$) {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $folkertdev$elm_flate$Experimental$ByteArray$push = F2(
	function (value, input) {
		var array = input.a;
		var finalSize = input.b;
		var finalBytes = input.c;
		if (finalSize === 4) {
			return A3(
				$folkertdev$elm_flate$Experimental$ByteArray$ByteArray,
				A2($elm$core$Array$push, finalBytes, array),
				1,
				value << 24);
		} else {
			if (!finalSize) {
				return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, 1, value << 24);
			} else {
				var offset = finalSize;
				var internalIndex = $elm$core$Array$length(array) - 1;
				var _new = ((255 & value) << ((3 - offset) * 8)) | finalBytes;
				var mask = 4278190080 >>> (offset * 8);
				return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize + 1, _new);
			}
		}
	});
var $folkertdev$elm_flate$Experimental$ByteArray$pushMany = F3(
	function (nbytes, value_, input) {
		var array = input.a;
		var finalSize = input.b;
		var finalBytes = input.c;
		var value = (nbytes === 4) ? value_ : (((1 << (nbytes * 8)) - 1) & value_);
		if (!nbytes) {
			return input;
		} else {
			if (finalSize === 4) {
				return A3(
					$folkertdev$elm_flate$Experimental$ByteArray$ByteArray,
					A2($elm$core$Array$push, finalBytes, array),
					nbytes,
					value << ((4 - nbytes) * 8));
			} else {
				if (!finalSize) {
					return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, nbytes, value << ((4 - nbytes) * 8));
				} else {
					var freeSpace = 4 - finalSize;
					if (_Utils_cmp(nbytes, freeSpace) > 0) {
						var bytesLeftOver = (finalSize + nbytes) - 4;
						var forFinal = value >>> (bytesLeftOver * 8);
						var newFinal = finalBytes | forFinal;
						var amount = ((8 - finalSize) - nbytes) * 8;
						var forNextFinal = (((1 << (bytesLeftOver * 8)) - 1) & value) << amount;
						return A3(
							$folkertdev$elm_flate$Experimental$ByteArray$ByteArray,
							A2($elm$core$Array$push, newFinal, array),
							nbytes - freeSpace,
							forNextFinal);
					} else {
						var amount = (4 - (finalSize + nbytes)) * 8;
						var forFinal = value << amount;
						var newFinal = finalBytes | forFinal;
						return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize + nbytes, newFinal);
					}
				}
			}
		}
	});
var $folkertdev$elm_flate$Experimental$ByteArray$appendBytesHelp = function (_v0) {
	var remaining = _v0.a;
	var bytearray = _v0.b;
	var array = bytearray.a;
	var finalSize = bytearray.b;
	var finalBytes = bytearray.c;
	return (remaining >= 4) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_new) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(
					remaining - 4,
					A3($folkertdev$elm_flate$Experimental$ByteArray$pushMany, 4, _new, bytearray)));
		},
		$elm$bytes$Bytes$Decode$unsignedInt32(1)) : ((remaining >= 1) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_new) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(
					remaining - 1,
					A2($folkertdev$elm_flate$Experimental$ByteArray$push, _new, bytearray)));
		},
		$elm$bytes$Bytes$Decode$unsignedInt8) : $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(bytearray)));
};
var $folkertdev$elm_flate$Experimental$ByteArray$appendBytes = F2(
	function (bytes, barray) {
		var array = barray.a;
		var finalSize = barray.b;
		var finalBytes = barray.c;
		var decoder = A2(
			$elm$bytes$Bytes$Decode$loop,
			_Utils_Tuple2(
				$elm$bytes$Bytes$width(bytes),
				barray),
			$folkertdev$elm_flate$Experimental$ByteArray$appendBytesHelp);
		var _v0 = A2($elm$bytes$Bytes$Decode$decode, decoder, bytes);
		if (!_v0.$) {
			var v = _v0.a;
			return v;
		} else {
			return barray;
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $folkertdev$elm_flate$Inflate$Internal$buildTree = F3(
	function (lengths, offset, num) {
		var tableDict = function () {
			var updater = function (maybeValue) {
				if (maybeValue.$ === 1) {
					return $elm$core$Maybe$Just(1);
				} else {
					var v = maybeValue.a;
					return $elm$core$Maybe$Just(v + 1);
				}
			};
			var folder = F3(
				function (key, value, accum) {
					return ((_Utils_cmp(key, offset) > -1) && (_Utils_cmp(key, num + offset) < 0)) ? A3($elm$core$Dict$update, value, updater, accum) : accum;
				});
			return A3($elm$core$Dict$foldl, folder, $elm$core$Dict$empty, lengths);
		}();
		var offsetsDict = A3(
			$elm$core$Dict$foldl,
			F3(
				function (key, value, _v4) {
					var sum = _v4.a;
					var dict = _v4.b;
					return _Utils_Tuple2(
						sum + value,
						A3($elm$core$Dict$insert, key, sum, dict));
				}),
			_Utils_Tuple2(0, $elm$core$Dict$empty),
			tableDict);
		var newTable = function () {
			var helper = F4(
				function (key, value, i, array) {
					helper:
					while (true) {
						if (_Utils_cmp(i, key) > 0) {
							var $temp$key = key,
								$temp$value = value,
								$temp$i = i - 1,
								$temp$array = A2($elm$core$List$cons, 0, array);
							key = $temp$key;
							value = $temp$value;
							i = $temp$i;
							array = $temp$array;
							continue helper;
						} else {
							return A2($elm$core$List$cons, value, array);
						}
					}
				});
			var foldHelp = F3(
				function (key, value, _v3) {
					var i = _v3.a;
					var array = _v3.b;
					return _Utils_Tuple2(
						key - 1,
						A4(helper, key, value, i, array));
				});
			var anotherGo = F2(
				function (i, array) {
					anotherGo:
					while (true) {
						if (i >= 0) {
							var $temp$i = i - 1,
								$temp$array = A2($elm$core$List$cons, 0, array);
							i = $temp$i;
							array = $temp$array;
							continue anotherGo;
						} else {
							return array;
						}
					}
				});
			return function (_v2) {
				var a = _v2.a;
				var b = _v2.b;
				return A2(anotherGo, a, b);
			}(
				A3(
					$elm$core$Dict$foldr,
					foldHelp,
					_Utils_Tuple2(15, _List_Nil),
					tableDict));
		}();
		var go2 = F3(
			function (i, currentTranslation, currentOffsets) {
				go2:
				while (true) {
					if ((i - num) < 0) {
						var _v0 = A2($elm$core$Dict$get, offset + i, lengths);
						if (_v0.$ === 1) {
							var $temp$i = i + 1,
								$temp$currentTranslation = currentTranslation,
								$temp$currentOffsets = currentOffsets;
							i = $temp$i;
							currentTranslation = $temp$currentTranslation;
							currentOffsets = $temp$currentOffsets;
							continue go2;
						} else {
							var v = _v0.a;
							if (!(!v)) {
								var _v1 = A2($elm$core$Dict$get, v, currentOffsets);
								if (_v1.$ === 1) {
									return currentTranslation;
								} else {
									var w = _v1.a;
									var $temp$i = i + 1,
										$temp$currentTranslation = A3($elm$core$Array$set, w, i, currentTranslation),
										$temp$currentOffsets = A3($elm$core$Dict$insert, v, w + 1, currentOffsets);
									i = $temp$i;
									currentTranslation = $temp$currentTranslation;
									currentOffsets = $temp$currentOffsets;
									continue go2;
								}
							} else {
								var $temp$i = i + 1,
									$temp$currentTranslation = currentTranslation,
									$temp$currentOffsets = currentOffsets;
								i = $temp$i;
								currentTranslation = $temp$currentTranslation;
								currentOffsets = $temp$currentOffsets;
								continue go2;
							}
						}
					} else {
						return currentTranslation;
					}
				}
			});
		var translation2 = A3(
			go2,
			0,
			A2($elm$core$Array$repeat, num, 0),
			offsetsDict.b);
		return {aa: newTable, ao: translation2};
	});
var $folkertdev$elm_flate$Inflate$Internal$clcIndices = _List_fromArray(
	[16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var $folkertdev$elm_flate$Inflate$BitSet$BitSet320 = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {$: 0, a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $folkertdev$elm_flate$Inflate$BitSet$insert = F2(
	function (n, input) {
		var b1 = input.a;
		var b2 = input.b;
		var b3 = input.c;
		var b4 = input.d;
		var b5 = input.e;
		var b6 = input.f;
		var b7 = input.g;
		var b8 = input.h;
		var b9 = input.i;
		var b10 = input.j;
		if (n >= 320) {
			return input;
		} else {
			var bit = 1 << (n % 32);
			var _v0 = (n / 32) | 0;
			switch (_v0) {
				case 0:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(bit | b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 1:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(bit | b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 2:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(bit | b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 3:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(bit | b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 4:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(bit | b5)(b6)(b7)(b8)(b9)(b10);
				case 5:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(bit | b6)(b7)(b8)(b9)(b10);
				case 6:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(bit | b7)(b8)(b9)(b10);
				case 7:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(bit | b8)(b9)(b10);
				case 8:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(bit | b9)(b10);
				case 9:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(bit | b10);
				default:
					return input;
			}
		}
	});
var $folkertdev$elm_flate$Inflate$BitSet$member = F2(
	function (n, input) {
		var b1 = input.a;
		var b2 = input.b;
		var b3 = input.c;
		var b4 = input.d;
		var b5 = input.e;
		var b6 = input.f;
		var b7 = input.g;
		var b8 = input.h;
		var b9 = input.i;
		var b10 = input.j;
		if (n >= 320) {
			return false;
		} else {
			var bit = 1 << (n % 32);
			var _v0 = (n / 32) | 0;
			switch (_v0) {
				case 0:
					return (bit & b1) > 0;
				case 1:
					return (bit & b2) > 0;
				case 2:
					return (bit & b3) > 0;
				case 3:
					return (bit & b4) > 0;
				case 4:
					return (bit & b5) > 0;
				case 5:
					return (bit & b6) > 0;
				case 6:
					return (bit & b7) > 0;
				case 7:
					return (bit & b8) > 0;
				case 8:
					return (bit & b9) > 0;
				case 9:
					return (bit & b10) > 0;
				default:
					return false;
			}
		}
	});
var $elm$core$Bitwise$complement = _Bitwise_complement;
var $folkertdev$elm_flate$Inflate$BitSet$remove = F2(
	function (n, input) {
		var b1 = input.a;
		var b2 = input.b;
		var b3 = input.c;
		var b4 = input.d;
		var b5 = input.e;
		var b6 = input.f;
		var b7 = input.g;
		var b8 = input.h;
		var b9 = input.i;
		var b10 = input.j;
		if (n >= 320) {
			return input;
		} else {
			var bit = ~(1 << (n % 32));
			var _v0 = (n / 32) | 0;
			switch (_v0) {
				case 0:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(bit & b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 1:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(bit & b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 2:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(bit & b3)(b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 3:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(bit & b4)(b5)(b6)(b7)(b8)(b9)(b10);
				case 4:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(bit & b5)(b6)(b7)(b8)(b9)(b10);
				case 5:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(bit & b6)(b7)(b8)(b9)(b10);
				case 6:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(bit & b7)(b8)(b9)(b10);
				case 7:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(bit & b8)(b9)(b10);
				case 8:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(bit & b9)(b10);
				case 9:
					return $folkertdev$elm_flate$Inflate$BitSet$BitSet320(b1)(b2)(b3)(b4)(b5)(b6)(b7)(b8)(b9)(bit & b10);
				default:
					return input;
			}
		}
	});
var $folkertdev$elm_flate$Inflate$Internal$copySegment = F5(
	function (i, value, bitset, lengths, length) {
		var end = i + length;
		var go = F3(
			function (j, currentBitSet, accum) {
				go:
				while (true) {
					if ((j - end) < 0) {
						if (!(!value)) {
							var $temp$j = j + 1,
								$temp$currentBitSet = A2($folkertdev$elm_flate$Inflate$BitSet$insert, j, currentBitSet),
								$temp$accum = A3($elm$core$Dict$insert, j, value, accum);
							j = $temp$j;
							currentBitSet = $temp$currentBitSet;
							accum = $temp$accum;
							continue go;
						} else {
							if (A2($folkertdev$elm_flate$Inflate$BitSet$member, j, currentBitSet)) {
								var $temp$j = j + 1,
									$temp$currentBitSet = A2($folkertdev$elm_flate$Inflate$BitSet$remove, j, currentBitSet),
									$temp$accum = A2($elm$core$Dict$remove, j, accum);
								j = $temp$j;
								currentBitSet = $temp$currentBitSet;
								accum = $temp$accum;
								continue go;
							} else {
								var $temp$j = j + 1,
									$temp$currentBitSet = currentBitSet,
									$temp$accum = accum;
								j = $temp$j;
								currentBitSet = $temp$currentBitSet;
								accum = $temp$accum;
								continue go;
							}
						}
					} else {
						return _Utils_Tuple2(currentBitSet, accum);
					}
				}
			});
		var _v0 = A3(go, i, bitset, lengths);
		var newBitSet = _v0.a;
		var newLengths = _v0.b;
		return _Utils_Tuple3(i + length, newBitSet, newLengths);
	});
var $folkertdev$elm_flate$Inflate$Internal$decodeSymbolInnerLoop = F5(
	function (table, cur, tag, bitsAvailable, sum) {
		decodeSymbolInnerLoop:
		while (true) {
			var newTag = tag >>> 1;
			if (!table.b) {
				return {d: bitsAvailable, aJ: cur, a$: sum, x: tag};
			} else {
				var value = table.a;
				var rest = table.b;
				var newerCur = ((cur << 1) + (tag & 1)) - value;
				var newSum = sum + value;
				if (newerCur >= 0) {
					var $temp$table = rest,
						$temp$cur = newerCur,
						$temp$tag = newTag,
						$temp$bitsAvailable = bitsAvailable - 1,
						$temp$sum = newSum;
					table = $temp$table;
					cur = $temp$cur;
					tag = $temp$tag;
					bitsAvailable = $temp$bitsAvailable;
					sum = $temp$sum;
					continue decodeSymbolInnerLoop;
				} else {
					return {d: bitsAvailable - 1, aJ: newerCur, a$: newSum, x: newTag};
				}
			}
		}
	});
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $folkertdev$elm_flate$Inflate$BitReader$moveFromReserve = F2(
	function (nbits, state) {
		var masked = (nbits === 32) ? (state.i << state.d) : ((((1 << nbits) - 1) & state.i) << state.d);
		return {d: state.d + nbits, j: state.j, i: state.i >>> nbits, g: state.g - nbits, x: masked | state.x};
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $folkertdev$elm_flate$Inflate$BitReader$runDecoder = F3(
	function (width, valueDecoder, state) {
		var decoder = A3(
			$elm$bytes$Bytes$Decode$map2,
			$elm$core$Tuple$pair,
			valueDecoder,
			$elm$bytes$Bytes$Decode$bytes(
				$elm$bytes$Bytes$width(state.j) - width));
		var _v0 = A2($elm$bytes$Bytes$Decode$decode, decoder, state.j);
		if (!_v0.$) {
			var value = _v0.a;
			return $elm$core$Result$Ok(value);
		} else {
			return $elm$core$Result$Err('BitReader.runDecoder: Unexpected end of Bytes');
		}
	});
var $folkertdev$elm_flate$Inflate$BitReader$unsignedInt24 = function (endianness) {
	if (!endianness) {
		return A3(
			$elm$bytes$Bytes$Decode$map2,
			F2(
				function (b2, b1) {
					return (b1 << 16) | b2;
				}),
			$elm$bytes$Bytes$Decode$unsignedInt16(endianness),
			$elm$bytes$Bytes$Decode$unsignedInt8);
	} else {
		return A3(
			$elm$bytes$Bytes$Decode$map2,
			F2(
				function (b1, b2) {
					return (b1 << 16) | b2;
				}),
			$elm$bytes$Bytes$Decode$unsignedInt16(endianness),
			$elm$bytes$Bytes$Decode$unsignedInt8);
	}
};
var $folkertdev$elm_flate$Inflate$BitReader$readMoreBits = function (state) {
	readMoreBits:
	while (true) {
		var freeSpaceOnTag = 32 - state.d;
		if ((_Utils_cmp(freeSpaceOnTag, state.g) < 1) && (state.g > 0)) {
			return $elm$core$Result$Ok(
				A2($folkertdev$elm_flate$Inflate$BitReader$moveFromReserve, freeSpaceOnTag, state));
		} else {
			if (!$elm$bytes$Bytes$width(state.j)) {
				return $elm$core$Result$Ok(
					A2($folkertdev$elm_flate$Inflate$BitReader$moveFromReserve, state.g, state));
			} else {
				var state1 = A2($folkertdev$elm_flate$Inflate$BitReader$moveFromReserve, state.g, state);
				var _v0 = function () {
					var _v1 = $elm$bytes$Bytes$width(state.j);
					switch (_v1) {
						case 0:
							return _Utils_Tuple3(
								0,
								0,
								$elm$bytes$Bytes$Decode$succeed(0));
						case 1:
							return _Utils_Tuple3(1, 8, $elm$bytes$Bytes$Decode$unsignedInt8);
						case 2:
							return _Utils_Tuple3(
								2,
								16,
								$elm$bytes$Bytes$Decode$unsignedInt16(0));
						case 3:
							return _Utils_Tuple3(
								3,
								24,
								$folkertdev$elm_flate$Inflate$BitReader$unsignedInt24(0));
						default:
							return _Utils_Tuple3(
								4,
								32,
								$elm$bytes$Bytes$Decode$unsignedInt32(0));
					}
				}();
				var width = _v0.a;
				var additionallyAvailable = _v0.b;
				var decoder = _v0.c;
				var _v2 = A3($folkertdev$elm_flate$Inflate$BitReader$runDecoder, width, decoder, state1);
				if (_v2.$ === 1) {
					var e = _v2.a;
					return $elm$core$Result$Err(e);
				} else {
					var _v3 = _v2.a;
					var newReserve = _v3.a;
					var newBuffer = _v3.b;
					var $temp$state = {d: state1.d, j: newBuffer, i: newReserve, g: additionallyAvailable, x: state1.x};
					state = $temp$state;
					continue readMoreBits;
				}
			}
		}
	}
};
var $folkertdev$elm_flate$Inflate$Internal$decodeSymbol = F2(
	function (table, tree) {
		return function (state) {
			var _v0 = (state.d < 16) ? $folkertdev$elm_flate$Inflate$BitReader$readMoreBits(state) : $elm$core$Result$Ok(state);
			if (_v0.$ === 1) {
				var e = _v0.a;
				return $elm$core$Result$Err(e);
			} else {
				var d = _v0.a;
				var _v1 = A5($folkertdev$elm_flate$Inflate$Internal$decodeSymbolInnerLoop, table, 0, d.x, d.d, 0);
				var cur = _v1.aJ;
				var tag = _v1.x;
				var bitsAvailable = _v1.d;
				var sum = _v1.a$;
				var _v2 = A2($elm$core$Array$get, sum + cur, tree.ao);
				if (_v2.$ === 1) {
					return $elm$core$Result$Err('Index into trans tree out of bounds');
				} else {
					var result = _v2.a;
					return $elm$core$Result$Ok(
						_Utils_Tuple2(
							result,
							{d: bitsAvailable, j: d.j, i: d.i, g: d.g, x: tag}));
				}
			}
		};
	});
var $folkertdev$elm_flate$Inflate$BitReader$readBits = F2(
	function (numberOfBits, base) {
		return function (state) {
			if (!numberOfBits) {
				return $elm$core$Result$Ok(
					_Utils_Tuple2(base, state));
			} else {
				var _v0 = (_Utils_cmp(state.d, numberOfBits) < 0) ? $folkertdev$elm_flate$Inflate$BitReader$readMoreBits(state) : $elm$core$Result$Ok(state);
				if (_v0.$ === 1) {
					var e = _v0.a;
					return $elm$core$Result$Err(e);
				} else {
					var d = _v0.a;
					var val = d.x & (65535 >>> (16 - numberOfBits));
					var newTag = d.x >>> numberOfBits;
					return $elm$core$Result$Ok(
						_Utils_Tuple2(
							val + base,
							{d: d.d - numberOfBits, j: d.j, i: d.i, g: d.g, x: newTag}));
				}
			}
		};
	});
var $folkertdev$elm_flate$Inflate$BitReader$succeed = function (x) {
	return function (s) {
		return $elm$core$Result$Ok(
			_Utils_Tuple2(x, s));
	};
};
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$elm_flate$Inflate$Internal$decodeDynamicTreeLength = F4(
	function (codeTree, hlit, hdist, _v0) {
		var i = _v0.a;
		var bitset = _v0.b;
		var lengths = _v0.c;
		if (_Utils_cmp(i, hlit + hdist) < 0) {
			var table = A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(codeTree.aa));
			return A2(
				$folkertdev$elm_flate$Inflate$BitReader$andThen,
				function (sym) {
					switch (sym) {
						case 16:
							var prev = A2(
								$elm$core$Maybe$withDefault,
								0,
								A2($elm$core$Dict$get, i - 1, lengths));
							return A2(
								$folkertdev$elm_flate$Inflate$BitReader$map,
								A2(
									$elm$core$Basics$composeR,
									A4($folkertdev$elm_flate$Inflate$Internal$copySegment, i, prev, bitset, lengths),
									$elm$bytes$Bytes$Decode$Loop),
								A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 2, 3));
						case 17:
							return A2(
								$folkertdev$elm_flate$Inflate$BitReader$map,
								A2(
									$elm$core$Basics$composeR,
									A4($folkertdev$elm_flate$Inflate$Internal$copySegment, i, 0, bitset, lengths),
									$elm$bytes$Bytes$Decode$Loop),
								A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 3, 3));
						case 18:
							return A2(
								$folkertdev$elm_flate$Inflate$BitReader$map,
								A2(
									$elm$core$Basics$composeR,
									A4($folkertdev$elm_flate$Inflate$Internal$copySegment, i, 0, bitset, lengths),
									$elm$bytes$Bytes$Decode$Loop),
								A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 7, 11));
						case 0:
							return A2($folkertdev$elm_flate$Inflate$BitSet$member, i, bitset) ? $folkertdev$elm_flate$Inflate$BitReader$succeed(
								$elm$bytes$Bytes$Decode$Loop(
									_Utils_Tuple3(
										i + 1,
										bitset,
										A2($elm$core$Dict$remove, i, lengths)))) : $folkertdev$elm_flate$Inflate$BitReader$succeed(
								$elm$bytes$Bytes$Decode$Loop(
									_Utils_Tuple3(i + 1, bitset, lengths)));
						default:
							return $folkertdev$elm_flate$Inflate$BitReader$succeed(
								$elm$bytes$Bytes$Decode$Loop(
									_Utils_Tuple3(
										i + 1,
										A2($folkertdev$elm_flate$Inflate$BitSet$insert, i, bitset),
										A3($elm$core$Dict$insert, i, sym, lengths))));
					}
				},
				A2($folkertdev$elm_flate$Inflate$Internal$decodeSymbol, table, codeTree));
		} else {
			return $folkertdev$elm_flate$Inflate$BitReader$succeed(
				$elm$bytes$Bytes$Decode$Done(lengths));
		}
	});
var $folkertdev$elm_flate$Inflate$BitSet$empty = $folkertdev$elm_flate$Inflate$BitSet$BitSet320(0)(0)(0)(0)(0)(0)(0)(0)(0)(0);
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $folkertdev$elm_flate$Inflate$Internal$decodeTreeLengths = F4(
	function (hlit, hdist, hclen, codeLengths) {
		var clcs = A2($elm$core$List$take, hclen, $folkertdev$elm_flate$Inflate$Internal$clcIndices);
		var initialLengths = function () {
			var go = F3(
				function (xs, ys, accum) {
					go:
					while (true) {
						if (!xs.b) {
							return accum;
						} else {
							var index = xs.a;
							var restIndex = xs.b;
							if (!ys.b) {
								return accum;
							} else {
								var codeLength = ys.a;
								var restCodeLength = ys.b;
								if (!(!codeLength)) {
									var $temp$xs = restIndex,
										$temp$ys = restCodeLength,
										$temp$accum = A3($elm$core$Dict$insert, index, codeLength, accum);
									xs = $temp$xs;
									ys = $temp$ys;
									accum = $temp$accum;
									continue go;
								} else {
									var $temp$xs = restIndex,
										$temp$ys = restCodeLength,
										$temp$accum = accum;
									xs = $temp$xs;
									ys = $temp$ys;
									accum = $temp$accum;
									continue go;
								}
							}
						}
					}
				});
			return A3(go, clcs, codeLengths, $elm$core$Dict$empty);
		}();
		var codeTree = A3($folkertdev$elm_flate$Inflate$Internal$buildTree, initialLengths, 0, 19);
		var initialBitSet = A3(
			$elm$core$Dict$foldl,
			F2(
				function (i, _v0) {
					return $folkertdev$elm_flate$Inflate$BitSet$insert(i);
				}),
			$folkertdev$elm_flate$Inflate$BitSet$empty,
			initialLengths);
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$loop,
			_Utils_Tuple3(0, initialBitSet, initialLengths),
			A3($folkertdev$elm_flate$Inflate$Internal$decodeDynamicTreeLength, codeTree, hlit, hdist));
	});
var $folkertdev$elm_flate$Inflate$BitReader$exactly = F2(
	function (tableCount, decoder) {
		var helper = function (_v0) {
			var n = _v0.a;
			var xs = _v0.b;
			return (n <= 0) ? $folkertdev$elm_flate$Inflate$BitReader$succeed(
				$elm$bytes$Bytes$Decode$Done(
					$elm$core$List$reverse(xs))) : A2(
				$folkertdev$elm_flate$Inflate$BitReader$map,
				function (x) {
					return $elm$bytes$Bytes$Decode$Loop(
						_Utils_Tuple2(
							n - 1,
							A2($elm$core$List$cons, x, xs)));
				},
				decoder);
		};
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$loop,
			_Utils_Tuple2(tableCount, _List_Nil),
			helper);
	});
var $folkertdev$elm_flate$Inflate$Internal$cont = F3(
	function (hlit, hdist, hclen) {
		var buildTrees = function (lengths) {
			return _Utils_Tuple2(
				A3($folkertdev$elm_flate$Inflate$Internal$buildTree, lengths, 0, hlit),
				A3($folkertdev$elm_flate$Inflate$Internal$buildTree, lengths, hlit, hdist));
		};
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$map,
			buildTrees,
			A2(
				$folkertdev$elm_flate$Inflate$BitReader$andThen,
				A3($folkertdev$elm_flate$Inflate$Internal$decodeTreeLengths, hlit, hdist, hclen),
				A2(
					$folkertdev$elm_flate$Inflate$BitReader$exactly,
					hclen,
					A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 3, 0))));
	});
var $folkertdev$elm_flate$Inflate$BitReader$map2 = F3(
	function (f, _v0, _v1) {
		var fa = _v0;
		var fb = _v1;
		return function (state) {
			var _v2 = fa(state);
			if (_v2.$ === 1) {
				var e = _v2.a;
				return $elm$core$Result$Err(e);
			} else {
				var _v3 = _v2.a;
				var a = _v3.a;
				var newState = _v3.b;
				var _v4 = fb(newState);
				if (_v4.$ === 1) {
					var e = _v4.a;
					return $elm$core$Result$Err(e);
				} else {
					var _v5 = _v4.a;
					var b = _v5.a;
					var newerState = _v5.b;
					return $elm$core$Result$Ok(
						_Utils_Tuple2(
							A2(f, a, b),
							newerState));
				}
			}
		};
	});
var $folkertdev$elm_flate$Inflate$BitReader$andMap = F2(
	function (a, f) {
		return A3($folkertdev$elm_flate$Inflate$BitReader$map2, $elm$core$Basics$apL, f, a);
	});
var $folkertdev$elm_flate$Inflate$BitReader$map3 = F4(
	function (f, a, b, c) {
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$andMap,
			c,
			A2(
				$folkertdev$elm_flate$Inflate$BitReader$andMap,
				b,
				A2(
					$folkertdev$elm_flate$Inflate$BitReader$andMap,
					a,
					$folkertdev$elm_flate$Inflate$BitReader$succeed(f))));
	});
var $folkertdev$elm_flate$Inflate$Internal$decodeTrees = A2(
	$folkertdev$elm_flate$Inflate$BitReader$andThen,
	$elm$core$Basics$identity,
	A4(
		$folkertdev$elm_flate$Inflate$BitReader$map3,
		$folkertdev$elm_flate$Inflate$Internal$cont,
		A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 5, 257),
		A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 5, 1),
		A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 4, 4)));
var $folkertdev$elm_flate$Inflate$BitReader$error = function (e) {
	return function (s) {
		return $elm$core$Result$Err(e);
	};
};
var $folkertdev$elm_flate$Inflate$BitReader$getBit = A2($folkertdev$elm_flate$Inflate$BitReader$readBits, 1, 0);
var $folkertdev$elm_flate$Experimental$ByteArray$get = F2(
	function (index, _v0) {
		var array = _v0.a;
		var finalSize = _v0.b;
		var finalBytes = _v0.c;
		var offset = index % 4;
		if (_Utils_cmp(
			index,
			($elm$core$Array$length(array) * 4) + finalSize) > -1) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (_Utils_cmp(
				index,
				$elm$core$Array$length(array) * 4) > -1) {
				return $elm$core$Maybe$Just(255 & (finalBytes >>> (8 * (3 - offset))));
			} else {
				var internalIndex = (index / 4) | 0;
				var _v1 = A2($elm$core$Array$get, internalIndex, array);
				if (_v1.$ === 1) {
					return $elm$core$Maybe$Nothing;
				} else {
					var int32 = _v1.a;
					return $elm$core$Maybe$Just(255 & (int32 >>> (8 * (3 - offset))));
				}
			}
		}
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $folkertdev$elm_flate$Experimental$ByteArray$copyToBackInternal = F5(
	function (startIndex, size, array, finalSize, finalBytes) {
		copyToBackInternal:
		while (true) {
			var offset = startIndex % 4;
			var internalIndex = (startIndex / 4) | 0;
			if (size <= 0) {
				return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes);
			} else {
				if (_Utils_cmp(
					startIndex + 4,
					(($elm$core$Array$length(array) - 1) * 4) + finalSize) > -1) {
					var _v0 = A2(
						$folkertdev$elm_flate$Experimental$ByteArray$get,
						startIndex,
						A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes));
					if (_v0.$ === 1) {
						return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes);
					} else {
						var value = _v0.a;
						var _v1 = A2(
							$folkertdev$elm_flate$Experimental$ByteArray$push,
							value,
							A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes));
						var newArray = _v1.a;
						var newFinalSize = _v1.b;
						var newFinalBytes = _v1.c;
						var $temp$startIndex = startIndex + 1,
							$temp$size = size - 1,
							$temp$array = newArray,
							$temp$finalSize = newFinalSize,
							$temp$finalBytes = newFinalBytes;
						startIndex = $temp$startIndex;
						size = $temp$size;
						array = $temp$array;
						finalSize = $temp$finalSize;
						finalBytes = $temp$finalBytes;
						continue copyToBackInternal;
					}
				} else {
					var _v2 = A2($elm$core$Array$get, internalIndex, array);
					if (_v2.$ === 1) {
						return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes);
					} else {
						var value = _v2.a;
						var written = A2($elm$core$Basics$min, 4 - offset, size);
						var maskedFront = value << (8 * offset);
						var maskedBack = function () {
							if (_Utils_cmp(4 - offset, size) > 0) {
								var bytesWeNeedToRemove = 4 - size;
								var bytesWeHave = (3 - offset) + 1;
								return maskedFront >> (bytesWeNeedToRemove * 8);
							} else {
								return maskedFront >> (offset * 8);
							}
						}();
						var _v3 = A3(
							$folkertdev$elm_flate$Experimental$ByteArray$pushMany,
							written,
							maskedBack,
							A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes));
						var x = _v3.a;
						var y = _v3.b;
						var z = _v3.c;
						var $temp$startIndex = startIndex + written,
							$temp$size = size - written,
							$temp$array = x,
							$temp$finalSize = y,
							$temp$finalBytes = z;
						startIndex = $temp$startIndex;
						size = $temp$size;
						array = $temp$array;
						finalSize = $temp$finalSize;
						finalBytes = $temp$finalBytes;
						continue copyToBackInternal;
					}
				}
			}
		}
	});
var $folkertdev$elm_flate$Experimental$ByteArray$copyToBack = F3(
	function (startIndex, size, _v0) {
		var array = _v0.a;
		var finalSize = _v0.b;
		var finalBytes = _v0.c;
		return A5($folkertdev$elm_flate$Experimental$ByteArray$copyToBackInternal, startIndex, size, array, finalSize, finalBytes);
	});
var $folkertdev$elm_flate$Inflate$Internal$HuffmanTable = $elm$core$Basics$identity;
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $folkertdev$elm_flate$Inflate$Internal$buildBitsBase = F2(
	function (delta, first) {
		var initializer = function (i) {
			return (_Utils_cmp(i, delta) < 0) ? 0 : (((i - delta) / delta) | 0);
		};
		var folder = F2(
			function (bit, _v0) {
				var sum = _v0.a;
				var accum = _v0.b;
				return _Utils_Tuple2(
					sum + (1 << bit),
					A2(
						$elm$core$Array$push,
						{aH: sum, a: bit},
						accum));
			});
		var bits = A2($elm$core$Array$initialize, 30, initializer);
		var base = A3(
			$elm$core$Array$foldl,
			folder,
			_Utils_Tuple2(first, $elm$core$Array$empty),
			bits).b;
		return base;
	});
var $folkertdev$elm_flate$Inflate$Internal$hardcodedDistanceTable = A2($folkertdev$elm_flate$Inflate$Internal$buildBitsBase, 2, 1);
var $folkertdev$elm_flate$Inflate$Internal$hardcodedLengthTable = function (_v0) {
	var array = _v0;
	return A3(
		$elm$core$Array$set,
		28,
		{aH: 258, a: 0},
		array);
}(
	A2($folkertdev$elm_flate$Inflate$Internal$buildBitsBase, 4, 3));
var $folkertdev$elm_flate$Inflate$Internal$readHuffmanTable = F2(
	function (index, _v0) {
		var table = _v0;
		return A2($elm$core$Array$get, index, table);
	});
var $folkertdev$elm_flate$Inflate$Internal$decodeLength = function (symbol) {
	var _v0 = A2($folkertdev$elm_flate$Inflate$Internal$readHuffmanTable, symbol - 257, $folkertdev$elm_flate$Inflate$Internal$hardcodedLengthTable);
	if (_v0.$ === 1) {
		return $folkertdev$elm_flate$Inflate$BitReader$error(
			function () {
				var _v1 = $folkertdev$elm_flate$Inflate$Internal$hardcodedDistanceTable;
				var internal = _v1;
				return 'index out of bounds in hardcodedLengthTable: requested index ' + ($elm$core$String$fromInt(symbol - 257) + ('but hardcodedLengthTable has length ' + $elm$core$String$fromInt(
					$elm$core$Array$length(internal))));
			}());
	} else {
		var entry = _v0.a;
		return A2($folkertdev$elm_flate$Inflate$BitReader$readBits, entry.a, entry.aH);
	}
};
var $folkertdev$elm_flate$Inflate$Internal$decodeOffset = F2(
	function (outputLength, dt) {
		var table_ = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			$elm$core$List$tail(dt.aa));
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$andThen,
			function (distance) {
				var _v0 = A2($folkertdev$elm_flate$Inflate$Internal$readHuffmanTable, distance, $folkertdev$elm_flate$Inflate$Internal$hardcodedDistanceTable);
				if (_v0.$ === 1) {
					return $folkertdev$elm_flate$Inflate$BitReader$error(
						function () {
							var _v1 = $folkertdev$elm_flate$Inflate$Internal$hardcodedDistanceTable;
							var internal = _v1;
							return 'index out of bounds in hardcodedDistanceTable: requested index ' + ($elm$core$String$fromInt(distance) + ('but hardcodedLengthTable has length ' + $elm$core$String$fromInt(
								$elm$core$Array$length(internal))));
						}());
				} else {
					var entry = _v0.a;
					return A2(
						$folkertdev$elm_flate$Inflate$BitReader$map,
						function (v) {
							return outputLength - v;
						},
						A2($folkertdev$elm_flate$Inflate$BitReader$readBits, entry.a, entry.aH));
				}
			},
			A2($folkertdev$elm_flate$Inflate$Internal$decodeSymbol, table_, dt));
	});
var $folkertdev$elm_flate$Inflate$Internal$inflateBlockDataHelp = F2(
	function (trees, _v0) {
		var outputLength = _v0.a;
		var output = _v0.b;
		var table = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			$elm$core$List$tail(trees.X.aa));
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$andThen,
			function (symbol) {
				return (symbol === 256) ? $folkertdev$elm_flate$Inflate$BitReader$succeed(
					$elm$bytes$Bytes$Decode$Done(output)) : ((symbol < 256) ? $folkertdev$elm_flate$Inflate$BitReader$succeed(
					$elm$bytes$Bytes$Decode$Loop(
						_Utils_Tuple2(
							outputLength + 1,
							A2($folkertdev$elm_flate$Experimental$ByteArray$push, symbol, output)))) : A3(
					$folkertdev$elm_flate$Inflate$BitReader$map2,
					F2(
						function (length, offset) {
							return $elm$bytes$Bytes$Decode$Loop(
								_Utils_Tuple2(
									outputLength + length,
									A3($folkertdev$elm_flate$Experimental$ByteArray$copyToBack, offset, length, output)));
						}),
					$folkertdev$elm_flate$Inflate$Internal$decodeLength(symbol),
					A2($folkertdev$elm_flate$Inflate$Internal$decodeOffset, outputLength, trees.V)));
			},
			A2($folkertdev$elm_flate$Inflate$Internal$decodeSymbol, table, trees.X));
	});
var $folkertdev$elm_flate$Inflate$Internal$inflateBlockData = F3(
	function (trees, outputLength, output) {
		return A2(
			$folkertdev$elm_flate$Inflate$BitReader$loop,
			_Utils_Tuple2(outputLength, output),
			$folkertdev$elm_flate$Inflate$Internal$inflateBlockDataHelp(trees));
	});
var $folkertdev$elm_flate$Inflate$BitReader$flushHelp = function (state0) {
	var availableSpace = 32 - state0.d;
	var state = A2(
		$folkertdev$elm_flate$Inflate$BitReader$moveFromReserve,
		A2($elm$core$Basics$min, availableSpace, state0.g),
		state0);
	var reserveEncoder = (state.g > 24) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt32, 0, state.i)
		]) : ((state.g > 16) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt16, 0, state.i),
			$elm$bytes$Bytes$Encode$unsignedInt8(state.i >> 16)
		]) : ((state.g > 8) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt16, 0, state.i)
		]) : ((state.g > 1) ? _List_fromArray(
		[
			$elm$bytes$Bytes$Encode$unsignedInt8(state.i)
		]) : _List_Nil)));
	var tagEncoder = (state.d > 24) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt32, 0, state.x)
		]) : ((state.d > 16) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt16, 0, state.x),
			$elm$bytes$Bytes$Encode$unsignedInt8(state.x >> 16)
		]) : ((state.d > 8) ? _List_fromArray(
		[
			A2($elm$bytes$Bytes$Encode$unsignedInt16, 0, state.x)
		]) : ((state.d > 1) ? _List_fromArray(
		[
			$elm$bytes$Bytes$Encode$unsignedInt8(state.x)
		]) : _List_Nil)));
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			_Utils_ap(
				tagEncoder,
				_Utils_ap(
					reserveEncoder,
					_List_fromArray(
						[
							$elm$bytes$Bytes$Encode$bytes(state.j)
						])))));
};
var $folkertdev$elm_flate$Inflate$BitReader$flush = function (state) {
	return {
		d: 0,
		j: $folkertdev$elm_flate$Inflate$BitReader$flushHelp(state),
		i: 0,
		g: 0,
		x: 0
	};
};
var $folkertdev$elm_flate$Inflate$Internal$uncompressedBlockDecoder = function (bufferWidth) {
	var decodeLengths = A3(
		$elm$bytes$Bytes$Decode$map2,
		$elm$core$Tuple$pair,
		$elm$bytes$Bytes$Decode$unsignedInt16(0),
		$elm$bytes$Bytes$Decode$unsignedInt16(0));
	return A2(
		$elm$bytes$Bytes$Decode$andThen,
		function (_v0) {
			var length = _v0.a;
			var invlength = _v0.b;
			if (!_Utils_eq(length, (~invlength) & 65535)) {
				return $elm$bytes$Bytes$Decode$fail;
			} else {
				var remainingSize = (bufferWidth - 4) - length;
				return A3(
					$elm$bytes$Bytes$Decode$map2,
					$elm$core$Tuple$pair,
					$elm$bytes$Bytes$Decode$bytes(length),
					$elm$bytes$Bytes$Decode$bytes(remainingSize));
			}
		},
		decodeLengths);
};
var $folkertdev$elm_flate$Inflate$Internal$inflateUncompressedBlock = function (state_) {
	var state = $folkertdev$elm_flate$Inflate$BitReader$flush(state_);
	var _v0 = A2(
		$elm$bytes$Bytes$Decode$decode,
		$folkertdev$elm_flate$Inflate$Internal$uncompressedBlockDecoder(
			$elm$bytes$Bytes$width(state.j)),
		state.j);
	if (_v0.$ === 1) {
		return $elm$core$Result$Err('inflateUncompressedBlock: ran out of bounds');
	} else {
		var _v1 = _v0.a;
		var block = _v1.a;
		var newBuffer = _v1.b;
		return $elm$core$Result$Ok(
			_Utils_Tuple2(
				block,
				_Utils_update(
					state,
					{j: newBuffer})));
	}
};
var $folkertdev$elm_flate$Experimental$ByteArray$length = function (_v0) {
	var array = _v0.a;
	var finalSize = _v0.b;
	var finalBytes = _v0.c;
	var _v1 = $elm$core$Array$length(array) * 4;
	if (!_v1) {
		return finalSize;
	} else {
		var l = _v1;
		return l + finalSize;
	}
};
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.e)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.e, tail);
		return (notAppended < 0) ? {
			f: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.f),
			b: builder.b + 1,
			e: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			f: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.f),
			b: builder.b + 1,
			e: $elm$core$Elm$JsArray$empty
		} : {f: builder.f, b: builder.b, e: appended});
	});
var $elm$core$Array$appendHelpTree = F2(
	function (toAppend, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		var itemsToAppend = $elm$core$Elm$JsArray$length(toAppend);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(tail)) - itemsToAppend;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, tail, toAppend);
		var newArray = A2($elm$core$Array$unsafeReplaceTail, appended, array);
		if (notAppended < 0) {
			var nextTail = A3($elm$core$Elm$JsArray$slice, notAppended, itemsToAppend, toAppend);
			return A2($elm$core$Array$unsafeReplaceTail, nextTail, newArray);
		} else {
			return newArray;
		}
	});
var $elm$core$Array$builderFromArray = function (_v0) {
	var len = _v0.a;
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = F2(
		function (node, acc) {
			if (!node.$) {
				var subTree = node.a;
				return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
			} else {
				return A2($elm$core$List$cons, node, acc);
			}
		});
	return {
		f: A3($elm$core$Elm$JsArray$foldl, helper, _List_Nil, tree),
		b: (len / $elm$core$Array$branchFactor) | 0,
		e: tail
	};
};
var $elm$core$Array$append = F2(
	function (a, _v0) {
		var aTail = a.d;
		var bLen = _v0.a;
		var bTree = _v0.c;
		var bTail = _v0.d;
		if (_Utils_cmp(bLen, $elm$core$Array$branchFactor * 4) < 1) {
			var foldHelper = F2(
				function (node, array) {
					if (!node.$) {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, array, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpTree, leaf, array);
					}
				});
			return A2(
				$elm$core$Array$appendHelpTree,
				bTail,
				A3($elm$core$Elm$JsArray$foldl, foldHelper, a, bTree));
		} else {
			var foldHelper = F2(
				function (node, builder) {
					if (!node.$) {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, builder, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpBuilder, leaf, builder);
					}
				});
			return A2(
				$elm$core$Array$builderToArray,
				true,
				A2(
					$elm$core$Array$appendHelpBuilder,
					bTail,
					A3(
						$elm$core$Elm$JsArray$foldl,
						foldHelper,
						$elm$core$Array$builderFromArray(a),
						bTree)));
		}
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{f: nodeList, b: nodeListSize, e: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $folkertdev$elm_flate$Inflate$Internal$sdtree = {
	aa: _List_fromArray(
		[0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
	ao: A2(
		$elm$core$Array$append,
		$elm$core$Array$fromList(
			_List_fromArray(
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])),
		A2($elm$core$Array$repeat, 288 - 32, 0))
};
var $folkertdev$elm_flate$Inflate$Internal$sltree = {
	aa: _List_fromArray(
		[0, 0, 0, 0, 0, 0, 0, 24, 152, 112, 0, 0, 0, 0, 0, 0]),
	ao: $elm$core$Array$fromList(
		_List_fromArray(
			[256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 280, 281, 282, 283, 284, 285, 286, 287, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255]))
};
var $folkertdev$elm_flate$Inflate$Internal$uncompressHelp = function (output) {
	var uncompressBlock = function (btype) {
		switch (btype) {
			case 0:
				return A2(
					$folkertdev$elm_flate$Inflate$BitReader$map,
					function (bytes) {
						return A2($folkertdev$elm_flate$Experimental$ByteArray$appendBytes, bytes, output);
					},
					A2(
						$folkertdev$elm_flate$Inflate$BitReader$andThen,
						function (_v1) {
							return $folkertdev$elm_flate$Inflate$Internal$inflateUncompressedBlock;
						},
						A2($folkertdev$elm_flate$Inflate$BitReader$exactly, 5, $folkertdev$elm_flate$Inflate$BitReader$getBit)));
			case 1:
				return A3(
					$folkertdev$elm_flate$Inflate$Internal$inflateBlockData,
					{V: $folkertdev$elm_flate$Inflate$Internal$sdtree, X: $folkertdev$elm_flate$Inflate$Internal$sltree},
					$folkertdev$elm_flate$Experimental$ByteArray$length(output),
					output);
			case 2:
				return A2(
					$folkertdev$elm_flate$Inflate$BitReader$andThen,
					function (_v2) {
						var ltree = _v2.a;
						var dtree = _v2.b;
						return A3(
							$folkertdev$elm_flate$Inflate$Internal$inflateBlockData,
							{V: dtree, X: ltree},
							$folkertdev$elm_flate$Experimental$ByteArray$length(output),
							output);
					},
					$folkertdev$elm_flate$Inflate$Internal$decodeTrees);
			default:
				return $folkertdev$elm_flate$Inflate$BitReader$error(
					'invalid block type: ' + ($elm$core$String$fromInt(btype) + ' (only 0, 1 and 2 are valid block types)'));
		}
	};
	var readTwoBits = A3(
		$folkertdev$elm_flate$Inflate$BitReader$map2,
		F2(
			function (b1, b2) {
				return b1 + (2 * b2);
			}),
		$folkertdev$elm_flate$Inflate$BitReader$getBit,
		$folkertdev$elm_flate$Inflate$BitReader$getBit);
	var go = F2(
		function (isFinal, blockType) {
			return (!(!isFinal)) ? A2(
				$folkertdev$elm_flate$Inflate$BitReader$map,
				$elm$bytes$Bytes$Decode$Done,
				uncompressBlock(blockType)) : A2(
				$folkertdev$elm_flate$Inflate$BitReader$map,
				$elm$bytes$Bytes$Decode$Loop,
				uncompressBlock(blockType));
		});
	return A2(
		$folkertdev$elm_flate$Inflate$BitReader$andThen,
		$elm$core$Basics$identity,
		A3($folkertdev$elm_flate$Inflate$BitReader$map2, go, $folkertdev$elm_flate$Inflate$BitReader$getBit, readTwoBits));
};
var $folkertdev$elm_flate$Inflate$Internal$uncompress = A2(
	$folkertdev$elm_flate$Inflate$BitReader$map,
	A2($elm$core$Basics$composeR, $folkertdev$elm_flate$Experimental$ByteArray$toBytes, $elm$core$List$singleton),
	A2($folkertdev$elm_flate$Inflate$BitReader$loop, $folkertdev$elm_flate$Experimental$ByteArray$empty, $folkertdev$elm_flate$Inflate$Internal$uncompressHelp));
var $folkertdev$elm_flate$Inflate$Internal$inflate = function (buffer) {
	var _v0 = A2($folkertdev$elm_flate$Inflate$BitReader$decode, buffer, $folkertdev$elm_flate$Inflate$Internal$uncompress);
	if (_v0.$ === 1) {
		var e = _v0.a;
		return $elm$core$Result$Err(e);
	} else {
		var values = _v0.a;
		return $elm$core$Result$Ok(
			$elm$bytes$Bytes$Encode$encode(
				$elm$bytes$Bytes$Encode$sequence(
					A2($elm$core$List$map, $elm$bytes$Bytes$Encode$bytes, values))));
	}
};
var $elm$core$Result$toMaybe = function (result) {
	if (!result.$) {
		var v = result.a;
		return $elm$core$Maybe$Just(v);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$elm_flate$Inflate$GZip$inflate = function (buffer) {
	return A2(
		$elm$core$Maybe$andThen,
		A2($elm$core$Basics$composeR, $folkertdev$elm_flate$Inflate$Internal$inflate, $elm$core$Result$toMaybe),
		A2(
			$elm$core$Maybe$andThen,
			$folkertdev$elm_flate$Inflate$GZip$gzipFindBuffer,
			$folkertdev$elm_flate$Inflate$GZip$gzipSlice(buffer)));
};
var $folkertdev$elm_flate$Inflate$Inflate$inflateGZip = $folkertdev$elm_flate$Inflate$GZip$inflate;
var $folkertdev$elm_flate$Flate$inflateGZip = $folkertdev$elm_flate$Inflate$Inflate$inflateGZip;
var $folkertdev$elm_flate$Inflate$ZLib$InflateError = function (a) {
	return {$: 6, a: a};
};
var $folkertdev$elm_flate$Inflate$ZLib$InvalidAdler = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$Inflate$ZLib$InvalidChecksum = {$: 0};
var $folkertdev$elm_flate$Inflate$ZLib$InvalidMethod = {$: 2};
var $folkertdev$elm_flate$Inflate$ZLib$InvalidSlice = {$: 5};
var $folkertdev$elm_flate$Inflate$ZLib$InvalidWindowSize = {$: 3};
var $folkertdev$elm_flate$Inflate$ZLib$PresetDictionaryIssue = {$: 4};
var $folkertdev$elm_flate$Checksum$Adler32$a32 = {aH: 65521, bt: 5552};
var $folkertdev$elm_flate$Checksum$Adler32$step8Bytes = F5(
	function (remaining, s1, s2, word1, word2) {
		var byte8 = 255 & word2;
		var byte7 = 255 & (word2 >>> 8);
		var byte6 = 255 & (word2 >>> 16);
		var byte5 = 255 & (word2 >>> 24);
		var byte4 = 255 & word1;
		var byte3 = 255 & (word1 >>> 8);
		var byte2 = 255 & (word1 >>> 16);
		var byte1 = 255 & (word1 >>> 24);
		var s1a_1 = s1 + byte1;
		var s1a_2 = s1a_1 + byte2;
		var s1a_3 = s1a_2 + byte3;
		var s1a_4 = s1a_3 + byte4;
		var s2a_1 = s2 + s1a_1;
		var s2a_2 = s2a_1 + s1a_2;
		var s2a_3 = s2a_2 + s1a_3;
		var s2a_4 = s2a_3 + s1a_4;
		var s1b_1 = s1a_4 + byte5;
		var s1b_2 = s1b_1 + byte6;
		var s1b_3 = s1b_2 + byte7;
		var s1b_4 = s1b_3 + byte8;
		var s2b_1 = s2a_4 + s1b_1;
		var s2b_2 = s2b_1 + s1b_2;
		var s2b_3 = s2b_2 + s1b_3;
		var s2b_4 = s2b_3 + s1b_4;
		return $elm$bytes$Bytes$Decode$Loop(
			{aB: remaining - 8, n: s1b_4, o: s2b_4});
	});
var $folkertdev$elm_flate$Checksum$Adler32$processChunkHelp = function (_v0) {
	var remaining = _v0.aB;
	var s1 = _v0.n;
	var s2 = _v0.o;
	return (remaining >= 8) ? A3(
		$elm$bytes$Bytes$Decode$map2,
		A3($folkertdev$elm_flate$Checksum$Adler32$step8Bytes, remaining, s1, s2),
		$elm$bytes$Bytes$Decode$unsignedInt32(1),
		$elm$bytes$Bytes$Decode$unsignedInt32(1)) : ((remaining > 0) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_byte) {
			return $elm$bytes$Bytes$Decode$Loop(
				{aB: remaining - 1, n: s1 + _byte, o: (s1 + _byte) + s2});
		},
		$elm$bytes$Bytes$Decode$unsignedInt8) : $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(
			{n: s1 % $folkertdev$elm_flate$Checksum$Adler32$a32.aH, o: s2 % $folkertdev$elm_flate$Checksum$Adler32$a32.aH})));
};
var $folkertdev$elm_flate$Checksum$Adler32$processChunk = function (config) {
	return A2($elm$bytes$Bytes$Decode$loop, config, $folkertdev$elm_flate$Checksum$Adler32$processChunkHelp);
};
var $folkertdev$elm_flate$Checksum$Adler32$chunkedFold = function (_v0) {
	var bufferSize = _v0.a1;
	var maxBlockSize = _v0.bq;
	var go = function (_v1) {
		var remainingLength = _v1.aW;
		var s1 = _v1.n;
		var s2 = _v1.o;
		return (!remainingLength) ? $elm$bytes$Bytes$Decode$succeed(
			$elm$bytes$Bytes$Decode$Done(
				{n: s1, o: s2})) : ((_Utils_cmp(remainingLength, maxBlockSize) < 0) ? A2(
			$elm$bytes$Bytes$Decode$map,
			$elm$bytes$Bytes$Decode$Done,
			$folkertdev$elm_flate$Checksum$Adler32$processChunk(
				{aB: remainingLength, n: s1, o: s2})) : A2(
			$elm$bytes$Bytes$Decode$map,
			function (result) {
				return $elm$bytes$Bytes$Decode$Loop(
					{aW: remainingLength - maxBlockSize, n: result.n, o: result.o});
			},
			$folkertdev$elm_flate$Checksum$Adler32$processChunk(
				{aB: maxBlockSize, n: s1, o: s2})));
	};
	return A2(
		$elm$bytes$Bytes$Decode$loop,
		{aW: bufferSize, n: 1, o: 0},
		go);
};
var $folkertdev$elm_flate$Checksum$Adler32$adler32 = function (buffer) {
	var _v0 = A2(
		$elm$bytes$Bytes$Decode$decode,
		$folkertdev$elm_flate$Checksum$Adler32$chunkedFold(
			{
				a1: $elm$bytes$Bytes$width(buffer),
				bq: $folkertdev$elm_flate$Checksum$Adler32$a32.bt
			}),
		buffer);
	if (_v0.$ === 1) {
		return 0;
	} else {
		var s1 = _v0.a.n;
		var s2 = _v0.a.o;
		return ((s2 << 16) | s1) >>> 0;
	}
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $folkertdev$elm_flate$Inflate$ZLib$Slices = F4(
	function (cmf, flg, buffer, a32) {
		return {aG: a32, j: buffer, as: cmf, aN: flg};
	});
var $folkertdev$elm_flate$Inflate$ZLib$decodeAdler32Checksum = $elm$bytes$Bytes$Decode$unsignedInt32(1);
var $elm$bytes$Bytes$Decode$map4 = F5(
	function (func, _v0, _v1, _v2, _v3) {
		var decodeA = _v0;
		var decodeB = _v1;
		var decodeC = _v2;
		var decodeD = _v3;
		return F2(
			function (bites, offset) {
				var _v4 = A2(decodeA, bites, offset);
				var aOffset = _v4.a;
				var a = _v4.b;
				var _v5 = A2(decodeB, bites, aOffset);
				var bOffset = _v5.a;
				var b = _v5.b;
				var _v6 = A2(decodeC, bites, bOffset);
				var cOffset = _v6.a;
				var c = _v6.b;
				var _v7 = A2(decodeD, bites, cOffset);
				var dOffset = _v7.a;
				var d = _v7.b;
				return _Utils_Tuple2(
					dOffset,
					A4(func, a, b, c, d));
			});
	});
var $folkertdev$elm_flate$Inflate$ZLib$slice = function (buffer) {
	var decoder = A5(
		$elm$bytes$Bytes$Decode$map4,
		$folkertdev$elm_flate$Inflate$ZLib$Slices,
		$elm$bytes$Bytes$Decode$unsignedInt8,
		$elm$bytes$Bytes$Decode$unsignedInt8,
		$elm$bytes$Bytes$Decode$bytes(
			($elm$bytes$Bytes$width(buffer) - 2) - 4),
		$folkertdev$elm_flate$Inflate$ZLib$decodeAdler32Checksum);
	return A2($elm$bytes$Bytes$Decode$decode, decoder, buffer);
};
var $folkertdev$elm_flate$Inflate$ZLib$inflate = function (buffer) {
	var _v0 = $folkertdev$elm_flate$Inflate$ZLib$slice(buffer);
	if (_v0.$ === 1) {
		return $elm$core$Result$Err($folkertdev$elm_flate$Inflate$ZLib$InvalidSlice);
	} else {
		var sliced = _v0.a;
		if (!(!A2($elm$core$Basics$modBy, 31, (256 * sliced.as) + sliced.aN))) {
			return $elm$core$Result$Err($folkertdev$elm_flate$Inflate$ZLib$InvalidChecksum);
		} else {
			if ((sliced.as & 15) !== 8) {
				return $elm$core$Result$Err($folkertdev$elm_flate$Inflate$ZLib$InvalidMethod);
			} else {
				if ((sliced.as >> 4) > 7) {
					return $elm$core$Result$Err($folkertdev$elm_flate$Inflate$ZLib$InvalidWindowSize);
				} else {
					if (!(!(sliced.aN & 32))) {
						return $elm$core$Result$Err($folkertdev$elm_flate$Inflate$ZLib$PresetDictionaryIssue);
					} else {
						var _v1 = $folkertdev$elm_flate$Inflate$Internal$inflate(sliced.j);
						if (_v1.$ === 1) {
							var e = _v1.a;
							return $elm$core$Result$Err(
								$folkertdev$elm_flate$Inflate$ZLib$InflateError(e));
						} else {
							var resultBuffer = _v1.a;
							var found = $folkertdev$elm_flate$Checksum$Adler32$adler32(resultBuffer);
							return (!_Utils_eq(sliced.aG, found)) ? $elm$core$Result$Err(
								$folkertdev$elm_flate$Inflate$ZLib$InvalidAdler(
									{ca: found, cm: sliced.aG})) : $elm$core$Result$Ok(resultBuffer);
						}
					}
				}
			}
		}
	}
};
var $folkertdev$elm_flate$Inflate$Inflate$inflateZLib = function (buffer) {
	var _v0 = $folkertdev$elm_flate$Inflate$ZLib$inflate(buffer);
	if (_v0.$ === 1) {
		var e = _v0.a;
		return $elm$core$Maybe$Nothing;
	} else {
		var value = _v0.a;
		return $elm$core$Maybe$Just(value);
	}
};
var $folkertdev$elm_flate$Flate$inflateZlib = $folkertdev$elm_flate$Inflate$Inflate$inflateZLib;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $danfishgold$base64_bytes$Encode$isValidChar = function (c) {
	if ($elm$core$Char$isAlphaNum(c)) {
		return true;
	} else {
		switch (c) {
			case '+':
				return true;
			case '/':
				return true;
			default:
				return false;
		}
	}
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $danfishgold$base64_bytes$Encode$unsafeConvertChar = function (_char) {
	var key = $elm$core$Char$toCode(_char);
	if ((key >= 65) && (key <= 90)) {
		return key - 65;
	} else {
		if ((key >= 97) && (key <= 122)) {
			return (key - 97) + 26;
		} else {
			if ((key >= 48) && (key <= 57)) {
				return ((key - 48) + 26) + 26;
			} else {
				switch (_char) {
					case '+':
						return 62;
					case '/':
						return 63;
					default:
						return -1;
				}
			}
		}
	}
};
var $danfishgold$base64_bytes$Encode$encodeCharacters = F4(
	function (a, b, c, d) {
		if ($danfishgold$base64_bytes$Encode$isValidChar(a) && $danfishgold$base64_bytes$Encode$isValidChar(b)) {
			var n2 = $danfishgold$base64_bytes$Encode$unsafeConvertChar(b);
			var n1 = $danfishgold$base64_bytes$Encode$unsafeConvertChar(a);
			if ('=' === d) {
				if ('=' === c) {
					var n = (n1 << 18) | (n2 << 12);
					var b1 = n >> 16;
					return $elm$core$Maybe$Just(
						$elm$bytes$Bytes$Encode$unsignedInt8(b1));
				} else {
					if ($danfishgold$base64_bytes$Encode$isValidChar(c)) {
						var n3 = $danfishgold$base64_bytes$Encode$unsafeConvertChar(c);
						var n = ((n1 << 18) | (n2 << 12)) | (n3 << 6);
						var combined = n >> 8;
						return $elm$core$Maybe$Just(
							A2($elm$bytes$Bytes$Encode$unsignedInt16, 1, combined));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}
			} else {
				if ($danfishgold$base64_bytes$Encode$isValidChar(c) && $danfishgold$base64_bytes$Encode$isValidChar(d)) {
					var n4 = $danfishgold$base64_bytes$Encode$unsafeConvertChar(d);
					var n3 = $danfishgold$base64_bytes$Encode$unsafeConvertChar(c);
					var n = ((n1 << 18) | (n2 << 12)) | ((n3 << 6) | n4);
					var combined = n >> 8;
					var b3 = n;
					return $elm$core$Maybe$Just(
						$elm$bytes$Bytes$Encode$sequence(
							_List_fromArray(
								[
									A2($elm$bytes$Bytes$Encode$unsignedInt16, 1, combined),
									$elm$bytes$Bytes$Encode$unsignedInt8(b3)
								])));
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $danfishgold$base64_bytes$Encode$encodeChunks = F2(
	function (input, accum) {
		encodeChunks:
		while (true) {
			var _v0 = $elm$core$String$toList(
				A2($elm$core$String$left, 4, input));
			_v0$4:
			while (true) {
				if (!_v0.b) {
					return $elm$core$Maybe$Just(accum);
				} else {
					if (_v0.b.b) {
						if (_v0.b.b.b) {
							if (_v0.b.b.b.b) {
								if (!_v0.b.b.b.b.b) {
									var a = _v0.a;
									var _v1 = _v0.b;
									var b = _v1.a;
									var _v2 = _v1.b;
									var c = _v2.a;
									var _v3 = _v2.b;
									var d = _v3.a;
									var _v4 = A4($danfishgold$base64_bytes$Encode$encodeCharacters, a, b, c, d);
									if (!_v4.$) {
										var enc = _v4.a;
										var $temp$input = A2($elm$core$String$dropLeft, 4, input),
											$temp$accum = A2($elm$core$List$cons, enc, accum);
										input = $temp$input;
										accum = $temp$accum;
										continue encodeChunks;
									} else {
										return $elm$core$Maybe$Nothing;
									}
								} else {
									break _v0$4;
								}
							} else {
								var a = _v0.a;
								var _v5 = _v0.b;
								var b = _v5.a;
								var _v6 = _v5.b;
								var c = _v6.a;
								var _v7 = A4($danfishgold$base64_bytes$Encode$encodeCharacters, a, b, c, '=');
								if (_v7.$ === 1) {
									return $elm$core$Maybe$Nothing;
								} else {
									var enc = _v7.a;
									return $elm$core$Maybe$Just(
										A2($elm$core$List$cons, enc, accum));
								}
							}
						} else {
							var a = _v0.a;
							var _v8 = _v0.b;
							var b = _v8.a;
							var _v9 = A4($danfishgold$base64_bytes$Encode$encodeCharacters, a, b, '=', '=');
							if (_v9.$ === 1) {
								return $elm$core$Maybe$Nothing;
							} else {
								var enc = _v9.a;
								return $elm$core$Maybe$Just(
									A2($elm$core$List$cons, enc, accum));
							}
						}
					} else {
						break _v0$4;
					}
				}
			}
			return $elm$core$Maybe$Nothing;
		}
	});
var $danfishgold$base64_bytes$Encode$encoder = function (string) {
	return A2(
		$elm$core$Maybe$map,
		A2($elm$core$Basics$composeR, $elm$core$List$reverse, $elm$bytes$Bytes$Encode$sequence),
		A2($danfishgold$base64_bytes$Encode$encodeChunks, string, _List_Nil));
};
var $danfishgold$base64_bytes$Encode$toBytes = function (string) {
	return A2(
		$elm$core$Maybe$map,
		$elm$bytes$Bytes$Encode$encode,
		$danfishgold$base64_bytes$Encode$encoder(string));
};
var $danfishgold$base64_bytes$Base64$toBytes = $danfishgold$base64_bytes$Encode$toBytes;
var $justgook$elm_tiled$Tiled$Layer$decodeTiles = F2(
	function (encoding, compression) {
		return (compression === 'gzip') ? A2(
			$elm$json$Json$Decode$andThen,
			A2(
				$elm$core$Basics$composeR,
				$danfishgold$base64_bytes$Base64$toBytes,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Maybe$andThen($folkertdev$elm_flate$Flate$inflateGZip),
					$justgook$elm_tiled$Tiled$Layer$bytesToList('Tile layer gzip compression can not decompress'))),
			$elm$json$Json$Decode$string) : ((compression === 'zlib') ? A2(
			$elm$json$Json$Decode$andThen,
			A2(
				$elm$core$Basics$composeR,
				$danfishgold$base64_bytes$Base64$toBytes,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Maybe$andThen($folkertdev$elm_flate$Flate$inflateZlib),
					$justgook$elm_tiled$Tiled$Layer$bytesToList('Tile layer zlib compression can not decompress'))),
			$elm$json$Json$Decode$string) : ((compression !== 'none') ? $elm$json$Json$Decode$fail('Tile layer compression \"' + (compression + '\" not supported yet')) : ((encoding === 'base64') ? A2(
			$elm$json$Json$Decode$andThen,
			function (string) {
				return A2(
					$justgook$elm_tiled$Tiled$Layer$bytesToList,
					'Tile layer base64 encoded fail to decoding',
					$danfishgold$base64_bytes$Base64$toBytes(string));
			},
			$elm$json$Json$Decode$string) : $elm$json$Json$Decode$list($elm$json$Json$Decode$int))));
	});
var $justgook$elm_tiled$Tiled$Layer$decodeChunk = F2(
	function (encoding, compression) {
		return A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'y',
			$elm$json$Json$Decode$int,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'x',
				$elm$json$Json$Decode$int,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'width',
					$elm$json$Json$Decode$int,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'height',
						$elm$json$Json$Decode$int,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'data',
							A2($justgook$elm_tiled$Tiled$Layer$decodeTiles, encoding, compression),
							$elm$json$Json$Decode$succeed($justgook$elm_tiled$Tiled$Layer$Chunk))))));
	});
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $justgook$elm_tiled$Tiled$Layer$toNone = A2(
	$elm$core$Basics$composeR,
	$elm$core$Maybe$map(
		function (s) {
			return (s === '') ? 'none' : s;
		}),
	$elm$core$Maybe$withDefault('none'));
var $justgook$elm_tiled$Tiled$Layer$decodeEncodingCompression = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (encoding, compression) {
			return _Utils_Tuple2(
				$justgook$elm_tiled$Tiled$Layer$toNone(encoding),
				$justgook$elm_tiled$Tiled$Layer$toNone(compression));
		}),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'encoding', $elm$json$Json$Decode$string)),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'compression', $elm$json$Json$Decode$string)));
var $justgook$elm_tiled$Tiled$Layer$decodeTileChunkedData = A2(
	$elm$json$Json$Decode$andThen,
	function (_v0) {
		var encoding = _v0.a;
		var compression = _v0.b;
		return A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'properties',
			$justgook$elm_tiled$Tiled$Properties$decode,
			$elm$core$Dict$empty,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'y',
				$elm$json$Json$Decode$float,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'x',
					$elm$json$Json$Decode$float,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'starty',
						$elm$json$Json$Decode$int,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'startx',
							$elm$json$Json$Decode$int,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'height',
								$elm$json$Json$Decode$int,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'width',
									$elm$json$Json$Decode$int,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'visible',
										$elm$json$Json$Decode$bool,
										A3(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'opacity',
											$elm$json$Json$Decode$float,
											A3(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'name',
												$elm$json$Json$Decode$string,
												A3(
													$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
													'chunks',
													$elm$json$Json$Decode$list(
														A2($justgook$elm_tiled$Tiled$Layer$decodeChunk, encoding, compression)),
													A3(
														$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
														'id',
														$elm$json$Json$Decode$int,
														$elm$json$Json$Decode$succeed($justgook$elm_tiled$Tiled$Layer$TileChunkedData)))))))))))));
	},
	$justgook$elm_tiled$Tiled$Layer$decodeEncodingCompression);
var $justgook$elm_tiled$Tiled$Layer$TileData = function (id) {
	return function (data) {
		return function (name) {
			return function (opacity) {
				return function (visible) {
					return function (width) {
						return function (height) {
							return function (x) {
								return function (y) {
									return function (properties) {
										return {b2: data, C: height, D: id, cf: name, I: opacity, K: properties, T: visible, z: width, bT: x, bU: y};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $justgook$elm_tiled$Tiled$Layer$decodeTileLayer = A2(
	$elm$json$Json$Decode$andThen,
	function (_v0) {
		var encoding = _v0.a;
		var compression = _v0.b;
		return A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'properties',
			$justgook$elm_tiled$Tiled$Properties$decode,
			$elm$core$Dict$empty,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'y',
				$elm$json$Json$Decode$float,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'x',
					$elm$json$Json$Decode$float,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'height',
						$elm$json$Json$Decode$int,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'width',
							$elm$json$Json$Decode$int,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'visible',
								$elm$json$Json$Decode$bool,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'opacity',
									$elm$json$Json$Decode$float,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'name',
										$elm$json$Json$Decode$string,
										A3(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'data',
											A2($justgook$elm_tiled$Tiled$Layer$decodeTiles, encoding, compression),
											A3(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'id',
												$elm$json$Json$Decode$int,
												$elm$json$Json$Decode$succeed($justgook$elm_tiled$Tiled$Layer$TileData)))))))))));
	},
	$justgook$elm_tiled$Tiled$Layer$decodeEncodingCompression);
var $justgook$elm_tiled$Tiled$Layer$decode = function (infinite) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (string) {
			switch (string) {
				case 'tilelayer':
					return infinite ? A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Layer$InfiniteTile, $justgook$elm_tiled$Tiled$Layer$decodeTileChunkedData) : A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Layer$Tile, $justgook$elm_tiled$Tiled$Layer$decodeTileLayer);
				case 'imagelayer':
					return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Layer$Image, $justgook$elm_tiled$Tiled$Layer$decodeImage);
				case 'objectgroup':
					return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Layer$Object, $justgook$elm_tiled$Tiled$Layer$decodeObjectLayer);
				default:
					return $elm$json$Json$Decode$fail('Invalid layer type: ' + string);
			}
		},
		A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string));
};
var $justgook$elm_tiled$Tiled$Tileset$Embedded = function (a) {
	return {$: 1, a: a};
};
var $justgook$elm_tiled$Tiled$Tileset$EmbeddedTileData = function (columns) {
	return function (firstgid) {
		return function (image) {
			return function (imageheight) {
				return function (imagewidth) {
					return function (margin) {
						return function (name) {
							return function (spacing) {
								return function (tilecount) {
									return function (tileheight) {
										return function (tilewidth) {
											return function (transparentcolor) {
												return function (tiles) {
													return function (properties) {
														return {au: columns, af: firstgid, bn: image, ax: imageheight, ay: imagewidth, az: margin, cf: name, K: properties, aC: spacing, aE: tilecount, O: tileheight, aF: tiles, Q: tilewidth, bQ: transparentcolor};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $justgook$elm_tiled$Tiled$Tileset$SpriteAnimation = F2(
	function (duration, tileid) {
		return {a7: duration, bP: tileid};
	});
var $justgook$elm_tiled$Tiled$Tileset$decodeSpriteAnimation = A3(
	$elm$json$Json$Decode$map2,
	$justgook$elm_tiled$Tiled$Tileset$SpriteAnimation,
	A2($elm$json$Json$Decode$field, 'duration', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'tileid', $elm$json$Json$Decode$int));
var $justgook$elm_tiled$Tiled$Tileset$TilesDataObjectgroup = F7(
	function (draworder, name, objects, opacity, visible, x, y) {
		return {a6: draworder, cf: name, bu: objects, I: opacity, T: visible, bT: x, bU: y};
	});
var $justgook$elm_tiled$Tiled$Tileset$decodeTilesDataObjectgroup = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'y',
	$elm$json$Json$Decode$int,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'x',
		$elm$json$Json$Decode$int,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'visible',
			$elm$json$Json$Decode$bool,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'opacity',
				$elm$json$Json$Decode$int,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'objects',
					$elm$json$Json$Decode$list($justgook$elm_tiled$Tiled$Object$decode),
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'name',
						$elm$json$Json$Decode$string,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'draworder',
							$justgook$elm_tiled$Tiled$Layer$decodeDraworder,
							$elm$json$Json$Decode$succeed($justgook$elm_tiled$Tiled$Tileset$TilesDataObjectgroup))))))));
var $justgook$elm_tiled$Tiled$Tileset$decodeTilesData = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'id',
	$elm$json$Json$Decode$int,
	A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'properties',
		$justgook$elm_tiled$Tiled$Properties$decode,
		$elm$core$Dict$empty,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'objectgroup',
			$elm$json$Json$Decode$maybe($justgook$elm_tiled$Tiled$Tileset$decodeTilesDataObjectgroup),
			$elm$core$Maybe$Nothing,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'animation',
				$elm$json$Json$Decode$list($justgook$elm_tiled$Tiled$Tileset$decodeSpriteAnimation),
				_List_Nil,
				$elm$json$Json$Decode$succeed(
					F4(
						function (a, b, c, d) {
							var _v0 = _Utils_Tuple3(
								a,
								b,
								$elm$core$Dict$toList(c));
							if (((!_v0.a.b) && (_v0.b.$ === 1)) && (!_v0.c.b)) {
								var _v1 = _v0.b;
								return $elm$core$Maybe$Nothing;
							} else {
								return $elm$core$Maybe$Just(
									{ad: a, D: d, ag: b, K: c});
							}
						}))))));
var $justgook$elm_tiled$Tiled$Tileset$decodeTiles = A2(
	$elm$json$Json$Decode$andThen,
	A2(
		$elm$core$List$foldl,
		F2(
			function (info_, acc) {
				if (!info_.$) {
					var info = info_.a;
					return A2(
						$elm$json$Json$Decode$andThen,
						A2(
							$elm$core$Basics$composeR,
							A2(
								$elm$core$Dict$insert,
								info.D,
								{ad: info.ad, ag: info.ag, K: info.K}),
							$elm$json$Json$Decode$succeed),
						acc);
				} else {
					return acc;
				}
			}),
		$elm$json$Json$Decode$succeed($elm$core$Dict$empty)),
	$elm$json$Json$Decode$list($justgook$elm_tiled$Tiled$Tileset$decodeTilesData));
var $justgook$elm_tiled$Tiled$Tileset$decodeEmbeddedTileset = function (firstgid) {
	return A2(
		$elm$json$Json$Decode$map,
		$justgook$elm_tiled$Tiled$Tileset$Embedded,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'properties',
			$justgook$elm_tiled$Tiled$Properties$decode,
			$elm$core$Dict$empty,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'tiles',
				$justgook$elm_tiled$Tiled$Tileset$decodeTiles,
				$elm$core$Dict$empty,
				A4(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
					'transparentcolor',
					$elm$json$Json$Decode$string,
					'none',
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'tilewidth',
						$elm$json$Json$Decode$int,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'tileheight',
							$elm$json$Json$Decode$int,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'tilecount',
								$elm$json$Json$Decode$int,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'spacing',
									$elm$json$Json$Decode$int,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'name',
										$elm$json$Json$Decode$string,
										A3(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'margin',
											$elm$json$Json$Decode$int,
											A3(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'imagewidth',
												$elm$json$Json$Decode$int,
												A3(
													$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
													'imageheight',
													$elm$json$Json$Decode$int,
													A3(
														$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
														'image',
														$elm$json$Json$Decode$string,
														firstgid(
															A3(
																$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
																'columns',
																$elm$json$Json$Decode$int,
																$elm$json$Json$Decode$succeed($justgook$elm_tiled$Tiled$Tileset$EmbeddedTileData))))))))))))))));
};
var $justgook$elm_tiled$Tiled$Tileset$ImageCollection = function (a) {
	return {$: 2, a: a};
};
var $justgook$elm_tiled$Tiled$Tileset$ImageCollectionTileData = function (columns) {
	return function (firstgid) {
		return function (margin) {
			return function (name) {
				return function (spacing) {
					return function (tilecount) {
						return function (tilewidth) {
							return function (tileheight) {
								return function (tiles) {
									return function (properties) {
										return function (grid) {
											return {au: columns, af: firstgid, bh: grid, az: margin, cf: name, K: properties, aC: spacing, aE: tilecount, O: tileheight, aF: tiles, Q: tilewidth};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $justgook$elm_tiled$Tiled$Tileset$GridData = F3(
	function (height, orientation, width) {
		return {C: height, bx: orientation, z: width};
	});
var $justgook$elm_tiled$Tiled$Tileset$decodeGrid = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'width',
	$elm$json$Json$Decode$int,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'orientation',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'height',
			$elm$json$Json$Decode$int,
			$elm$json$Json$Decode$succeed($justgook$elm_tiled$Tiled$Tileset$GridData))));
var $justgook$elm_tiled$Tiled$Tileset$decodeImageCollectionTileDataTiles = function () {
	var decodeImageTile = A4(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'properties',
		$justgook$elm_tiled$Tiled$Properties$decode,
		$elm$core$Dict$empty,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'objectgroup',
			$elm$json$Json$Decode$maybe($justgook$elm_tiled$Tiled$Tileset$decodeTilesDataObjectgroup),
			$elm$core$Maybe$Nothing,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'animation',
				$elm$json$Json$Decode$list($justgook$elm_tiled$Tiled$Tileset$decodeSpriteAnimation),
				_List_Nil,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'imagewidth',
					$elm$json$Json$Decode$int,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'imageheight',
						$elm$json$Json$Decode$int,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'image',
							$elm$json$Json$Decode$string,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'id',
								$elm$json$Json$Decode$int,
								$elm$json$Json$Decode$succeed(
									F7(
										function (id, image, imageheight, imagewidth, animation, objectgroup, properties) {
											return _Utils_Tuple2(
												id,
												{ad: animation, bn: image, ax: imageheight, ay: imagewidth, ag: objectgroup, K: properties});
										})))))))));
	return A2(
		$elm$json$Json$Decode$map,
		A2(
			$elm$core$List$foldl,
			F2(
				function (_v0, acc) {
					var i = _v0.a;
					var v = _v0.b;
					return A3($elm$core$Dict$insert, i, v, acc);
				}),
			$elm$core$Dict$empty),
		A2(
			$elm$json$Json$Decode$field,
			'tiles',
			$elm$json$Json$Decode$list(decodeImageTile)));
}();
var $justgook$elm_tiled$Tiled$Tileset$decodeImageCollectionTileData = function (firstgid) {
	return A2(
		$elm$json$Json$Decode$map,
		$justgook$elm_tiled$Tiled$Tileset$ImageCollection,
		A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'grid',
			A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, $justgook$elm_tiled$Tiled$Tileset$decodeGrid),
			$elm$core$Maybe$Nothing,
			A4(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
				'properties',
				$justgook$elm_tiled$Tiled$Properties$decode,
				$elm$core$Dict$empty,
				A2(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
					$justgook$elm_tiled$Tiled$Tileset$decodeImageCollectionTileDataTiles,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'tileheight',
						$elm$json$Json$Decode$int,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'tilewidth',
							$elm$json$Json$Decode$int,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'tilecount',
								$elm$json$Json$Decode$int,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'spacing',
									$elm$json$Json$Decode$int,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'name',
										$elm$json$Json$Decode$string,
										A3(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'margin',
											$elm$json$Json$Decode$int,
											firstgid(
												A3(
													$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
													'columns',
													$elm$json$Json$Decode$int,
													$elm$json$Json$Decode$succeed($justgook$elm_tiled$Tiled$Tileset$ImageCollectionTileData)))))))))))));
};
var $justgook$elm_tiled$Tiled$Tileset$Source = function (a) {
	return {$: 0, a: a};
};
var $justgook$elm_tiled$Tiled$Tileset$SourceTileData = F2(
	function (firstgid, source) {
		return {af: firstgid, bK: source};
	});
var $justgook$elm_tiled$Tiled$Tileset$decodeSourceTileset = A2(
	$elm$json$Json$Decode$map,
	$justgook$elm_tiled$Tiled$Tileset$Source,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'source',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'firstgid',
			$elm$json$Json$Decode$int,
			$elm$json$Json$Decode$succeed($justgook$elm_tiled$Tiled$Tileset$SourceTileData))));
var $justgook$elm_tiled$Tiled$Tileset$decode = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			$justgook$elm_tiled$Tiled$Tileset$decodeEmbeddedTileset(
			A2($NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required, 'firstgid', $elm$json$Json$Decode$int)),
			$justgook$elm_tiled$Tiled$Tileset$decodeSourceTileset,
			$justgook$elm_tiled$Tiled$Tileset$decodeImageCollectionTileData(
			A2($NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required, 'firstgid', $elm$json$Json$Decode$int))
		]));
var $justgook$elm_tiled$Tiled$Level$LeftDown = 2;
var $justgook$elm_tiled$Tiled$Level$LeftUp = 3;
var $justgook$elm_tiled$Tiled$Level$RightDown = 0;
var $justgook$elm_tiled$Tiled$Level$RightUp = 1;
var $justgook$elm_tiled$Tiled$Level$decodeRenderOrder = A2(
	$elm$json$Json$Decode$andThen,
	function (result) {
		switch (result) {
			case 'right-down':
				return $elm$json$Json$Decode$succeed(0);
			case 'right-up':
				return $elm$json$Json$Decode$succeed(1);
			case 'left-down':
				return $elm$json$Json$Decode$succeed(2);
			case 'left-up':
				return $elm$json$Json$Decode$succeed(3);
			default:
				return $elm$json$Json$Decode$fail('Unknow render order');
		}
	},
	$elm$json$Json$Decode$string);
var $justgook$elm_tiled$Tiled$Level$decodeLevelData = A2(
	$elm$json$Json$Decode$andThen,
	function (infinite) {
		return A4(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
			'properties',
			$justgook$elm_tiled$Tiled$Properties$decode,
			$elm$core$Dict$empty,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'width',
				$elm$json$Json$Decode$int,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'version',
					$elm$json$Json$Decode$float,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'tilewidth',
						$elm$json$Json$Decode$int,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'tilesets',
							$elm$json$Json$Decode$list($justgook$elm_tiled$Tiled$Tileset$decode),
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'tileheight',
								$elm$json$Json$Decode$int,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'tiledversion',
									$elm$json$Json$Decode$string,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'renderorder',
										$justgook$elm_tiled$Tiled$Level$decodeRenderOrder,
										A3(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'nextobjectid',
											$elm$json$Json$Decode$int,
											A3(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'layers',
												$elm$json$Json$Decode$list(
													$justgook$elm_tiled$Tiled$Layer$decode(infinite)),
												A3(
													$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
													'height',
													$elm$json$Json$Decode$int,
													A4(
														$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
														'backgroundcolor',
														$elm$json$Json$Decode$string,
														'',
														$elm$json$Json$Decode$succeed(
															function (backgroundcolor) {
																return function (height) {
																	return function (layers) {
																		return function (nextobjectid) {
																			return function (renderorder) {
																				return function (tiledversion) {
																					return function (tileheight) {
																						return function (tilesets) {
																							return function (tilewidth) {
																								return function (version) {
																									return function (width) {
																										return function (props) {
																											return {B: backgroundcolor, C: height, E: infinite, v: layers, H: nextobjectid, K: props, L: renderorder, N: tiledversion, O: tileheight, P: tilesets, Q: tilewidth, S: version, z: width};
																										};
																									};
																								};
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															})))))))))))));
	},
	A2($elm$json$Json$Decode$field, 'infinite', $elm$json$Json$Decode$bool));
var $justgook$elm_tiled$Tiled$Level$X = 0;
var $justgook$elm_tiled$Tiled$Level$Y = 1;
var $justgook$elm_tiled$Tiled$Level$decodeAxis = A2(
	$elm$json$Json$Decode$andThen,
	function (a) {
		switch (a) {
			case 'x':
				return $elm$json$Json$Decode$succeed(0);
			case 'y':
				return $elm$json$Json$Decode$succeed(1);
			default:
				return $elm$json$Json$Decode$fail('Uknown axis `' + (a + '`'));
		}
	},
	$elm$json$Json$Decode$string);
var $justgook$elm_tiled$Tiled$Level$Even = 1;
var $justgook$elm_tiled$Tiled$Level$Odd = 0;
var $justgook$elm_tiled$Tiled$Level$decodeOddOrEven = A2(
	$elm$json$Json$Decode$andThen,
	function (a) {
		switch (a) {
			case 'odd':
				return $elm$json$Json$Decode$succeed(0);
			case 'even':
				return $elm$json$Json$Decode$succeed(1);
			default:
				return $elm$json$Json$Decode$fail('Uknown axis `' + (a + '`'));
		}
	},
	$elm$json$Json$Decode$string);
var $justgook$elm_tiled$Tiled$Level$decodeStaggeredlevelData = A2(
	$elm$json$Json$Decode$andThen,
	function (infinite) {
		return A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'staggerindex',
			$justgook$elm_tiled$Tiled$Level$decodeOddOrEven,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'staggeraxis',
				$justgook$elm_tiled$Tiled$Level$decodeAxis,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'hexsidelength',
					$elm$json$Json$Decode$int,
					A4(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
						'properties',
						$justgook$elm_tiled$Tiled$Properties$decode,
						$elm$core$Dict$empty,
						A3(
							$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
							'width',
							$elm$json$Json$Decode$int,
							A3(
								$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
								'version',
								$elm$json$Json$Decode$float,
								A3(
									$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
									'tilewidth',
									$elm$json$Json$Decode$int,
									A3(
										$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
										'tilesets',
										$elm$json$Json$Decode$list($justgook$elm_tiled$Tiled$Tileset$decode),
										A3(
											$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
											'tileheight',
											$elm$json$Json$Decode$int,
											A3(
												$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
												'tiledversion',
												$elm$json$Json$Decode$string,
												A3(
													$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
													'renderorder',
													$justgook$elm_tiled$Tiled$Level$decodeRenderOrder,
													A3(
														$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
														'nextobjectid',
														$elm$json$Json$Decode$int,
														A3(
															$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
															'layers',
															$elm$json$Json$Decode$list(
																$justgook$elm_tiled$Tiled$Layer$decode(infinite)),
															A3(
																$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
																'height',
																$elm$json$Json$Decode$int,
																A4(
																	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
																	'backgroundcolor',
																	$elm$json$Json$Decode$string,
																	'',
																	$elm$json$Json$Decode$succeed(
																		function (backgroundcolor) {
																			return function (height) {
																				return function (layers) {
																					return function (nextobjectid) {
																						return function (renderorder) {
																							return function (tiledversion) {
																								return function (tileheight) {
																									return function (tilesets) {
																										return function (tilewidth) {
																											return function (version) {
																												return function (width) {
																													return function (props) {
																														return function (hexsidelength) {
																															return function (staggeraxis) {
																																return function (staggerindex) {
																																	return {B: backgroundcolor, C: height, bi: hexsidelength, E: infinite, v: layers, H: nextobjectid, K: props, L: renderorder, bL: staggeraxis, bM: staggerindex, N: tiledversion, O: tileheight, P: tilesets, Q: tilewidth, S: version, z: width};
																																};
																															};
																														};
																													};
																												};
																											};
																										};
																									};
																								};
																							};
																						};
																					};
																				};
																			};
																		}))))))))))))))));
	},
	A2($elm$json$Json$Decode$field, 'infinite', $elm$json$Json$Decode$bool));
var $justgook$elm_tiled$Tiled$Level$decode = A2(
	$elm$json$Json$Decode$andThen,
	function (orientation) {
		switch (orientation) {
			case 'orthogonal':
				return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Level$Orthogonal, $justgook$elm_tiled$Tiled$Level$decodeLevelData);
			case 'isometric':
				return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Level$Isometric, $justgook$elm_tiled$Tiled$Level$decodeLevelData);
			case 'staggered':
				return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Level$Staggered, $justgook$elm_tiled$Tiled$Level$decodeStaggeredlevelData);
			case 'hexagonal':
				return A2($elm$json$Json$Decode$map, $justgook$elm_tiled$Tiled$Level$Hexagonal, $justgook$elm_tiled$Tiled$Level$decodeStaggeredlevelData);
			default:
				return $elm$json$Json$Decode$fail('Unknown orientation `' + (orientation + '`'));
		}
	},
	A2($elm$json$Json$Decode$field, 'orientation', $elm$json$Json$Decode$string));
var $justgook$elm_tiled$Tiled$decode = $justgook$elm_tiled$Tiled$Level$decode;
var $justgook$elm_image$Image$Info$FromData = function (a) {
	return {$: 3, a: a};
};
var $justgook$elm_image$Image$Info$FromDataBitDepth8 = 3;
var $justgook$elm_image$Image$Info$FromDataChannel4 = function (a) {
	return {$: 3, a: a};
};
var $justgook$elm_image$Image$Internal$ImageData$List = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $justgook$elm_image$Image$fromList = F2(
	function (w, l) {
		return A2(
			$justgook$elm_image$Image$Internal$ImageData$List,
			$justgook$elm_image$Image$Info$FromData(
				{
					at: $justgook$elm_image$Image$Info$FromDataChannel4(3),
					C: ($elm$core$List$length(l) / w) | 0,
					z: w
				}),
			l);
	});
var $author$project$JumpGun$Build$getLevelData = function (level) {
	switch (level.$) {
		case 0:
			var info = level.a;
			return {B: info.B, C: info.C, E: info.E, v: info.v, H: info.H, K: info.K, L: info.L, N: info.N, O: info.O, P: info.P, Q: info.Q, S: info.S, z: info.z};
		case 1:
			var info = level.a;
			return {B: info.B, C: info.C, E: info.E, v: info.v, H: info.H, K: info.K, L: info.L, N: info.N, O: info.O, P: info.P, Q: info.Q, S: info.S, z: info.z};
		case 2:
			var info = level.a;
			return {B: info.B, C: info.C, E: info.E, v: info.v, H: info.H, K: info.K, L: info.L, N: info.N, O: info.O, P: info.P, Q: info.Q, S: info.S, z: info.z};
		default:
			var info = level.a;
			return {B: info.B, C: info.C, E: info.E, v: info.v, H: info.H, K: info.K, L: info.L, N: info.N, O: info.O, P: info.P, Q: info.Q, S: info.S, z: info.z};
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $danfishgold$base64_bytes$Decode$lowest6BitsMask = 63;
var $elm$core$Char$fromCode = _Char_fromCode;
var $danfishgold$base64_bytes$Decode$unsafeToChar = function (n) {
	if (n <= 25) {
		return $elm$core$Char$fromCode(65 + n);
	} else {
		if (n <= 51) {
			return $elm$core$Char$fromCode(97 + (n - 26));
		} else {
			if (n <= 61) {
				return $elm$core$Char$fromCode(48 + (n - 52));
			} else {
				switch (n) {
					case 62:
						return '+';
					case 63:
						return '/';
					default:
						return '\u0000';
				}
			}
		}
	}
};
var $danfishgold$base64_bytes$Decode$bitsToChars = F2(
	function (bits, missing) {
		var s = $danfishgold$base64_bytes$Decode$unsafeToChar(bits & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var r = $danfishgold$base64_bytes$Decode$unsafeToChar((bits >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var q = $danfishgold$base64_bytes$Decode$unsafeToChar((bits >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var p = $danfishgold$base64_bytes$Decode$unsafeToChar(bits >>> 18);
		switch (missing) {
			case 0:
				return A2(
					$elm$core$String$cons,
					p,
					A2(
						$elm$core$String$cons,
						q,
						A2(
							$elm$core$String$cons,
							r,
							$elm$core$String$fromChar(s))));
			case 1:
				return A2(
					$elm$core$String$cons,
					p,
					A2(
						$elm$core$String$cons,
						q,
						A2($elm$core$String$cons, r, '=')));
			case 2:
				return A2(
					$elm$core$String$cons,
					p,
					A2($elm$core$String$cons, q, '=='));
			default:
				return '';
		}
	});
var $danfishgold$base64_bytes$Decode$bitsToCharSpecialized = F4(
	function (bits1, bits2, bits3, accum) {
		var z = $danfishgold$base64_bytes$Decode$unsafeToChar((bits3 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var y = $danfishgold$base64_bytes$Decode$unsafeToChar((bits3 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var x = $danfishgold$base64_bytes$Decode$unsafeToChar(bits3 >>> 18);
		var w = $danfishgold$base64_bytes$Decode$unsafeToChar(bits3 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var s = $danfishgold$base64_bytes$Decode$unsafeToChar(bits1 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var r = $danfishgold$base64_bytes$Decode$unsafeToChar((bits1 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var q = $danfishgold$base64_bytes$Decode$unsafeToChar((bits1 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var p = $danfishgold$base64_bytes$Decode$unsafeToChar(bits1 >>> 18);
		var d = $danfishgold$base64_bytes$Decode$unsafeToChar(bits2 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var c = $danfishgold$base64_bytes$Decode$unsafeToChar((bits2 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var b = $danfishgold$base64_bytes$Decode$unsafeToChar((bits2 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var a = $danfishgold$base64_bytes$Decode$unsafeToChar(bits2 >>> 18);
		return A2(
			$elm$core$String$cons,
			x,
			A2(
				$elm$core$String$cons,
				y,
				A2(
					$elm$core$String$cons,
					z,
					A2(
						$elm$core$String$cons,
						w,
						A2(
							$elm$core$String$cons,
							a,
							A2(
								$elm$core$String$cons,
								b,
								A2(
									$elm$core$String$cons,
									c,
									A2(
										$elm$core$String$cons,
										d,
										A2(
											$elm$core$String$cons,
											p,
											A2(
												$elm$core$String$cons,
												q,
												A2(
													$elm$core$String$cons,
													r,
													A2($elm$core$String$cons, s, accum))))))))))));
	});
var $danfishgold$base64_bytes$Decode$decode18Help = F5(
	function (a, b, c, d, e) {
		var combined6 = ((255 & d) << 16) | e;
		var combined5 = d >>> 8;
		var combined4 = 16777215 & c;
		var combined3 = ((65535 & b) << 8) | (c >>> 24);
		var combined2 = ((255 & a) << 16) | (b >>> 16);
		var combined1 = a >>> 8;
		return A4(
			$danfishgold$base64_bytes$Decode$bitsToCharSpecialized,
			combined3,
			combined2,
			combined1,
			A4($danfishgold$base64_bytes$Decode$bitsToCharSpecialized, combined6, combined5, combined4, ''));
	});
var $elm$bytes$Bytes$Decode$map5 = F6(
	function (func, _v0, _v1, _v2, _v3, _v4) {
		var decodeA = _v0;
		var decodeB = _v1;
		var decodeC = _v2;
		var decodeD = _v3;
		var decodeE = _v4;
		return F2(
			function (bites, offset) {
				var _v5 = A2(decodeA, bites, offset);
				var aOffset = _v5.a;
				var a = _v5.b;
				var _v6 = A2(decodeB, bites, aOffset);
				var bOffset = _v6.a;
				var b = _v6.b;
				var _v7 = A2(decodeC, bites, bOffset);
				var cOffset = _v7.a;
				var c = _v7.b;
				var _v8 = A2(decodeD, bites, cOffset);
				var dOffset = _v8.a;
				var d = _v8.b;
				var _v9 = A2(decodeE, bites, dOffset);
				var eOffset = _v9.a;
				var e = _v9.b;
				return _Utils_Tuple2(
					eOffset,
					A5(func, a, b, c, d, e));
			});
	});
var $danfishgold$base64_bytes$Decode$u16BE = $elm$bytes$Bytes$Decode$unsignedInt16(1);
var $danfishgold$base64_bytes$Decode$u32BE = $elm$bytes$Bytes$Decode$unsignedInt32(1);
var $danfishgold$base64_bytes$Decode$decode18Bytes = A6($elm$bytes$Bytes$Decode$map5, $danfishgold$base64_bytes$Decode$decode18Help, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u16BE);
var $elm$bytes$Bytes$Decode$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var decodeA = _v0;
		var decodeB = _v1;
		var decodeC = _v2;
		return F2(
			function (bites, offset) {
				var _v3 = A2(decodeA, bites, offset);
				var aOffset = _v3.a;
				var a = _v3.b;
				var _v4 = A2(decodeB, bites, aOffset);
				var bOffset = _v4.a;
				var b = _v4.b;
				var _v5 = A2(decodeC, bites, bOffset);
				var cOffset = _v5.a;
				var c = _v5.b;
				return _Utils_Tuple2(
					cOffset,
					A3(func, a, b, c));
			});
	});
var $danfishgold$base64_bytes$Decode$loopHelp = function (_v0) {
	var remaining = _v0.aB;
	var string = _v0.aD;
	if (remaining >= 18) {
		return A2(
			$elm$bytes$Bytes$Decode$map,
			function (result) {
				return $elm$bytes$Bytes$Decode$Loop(
					{
						aB: remaining - 18,
						aD: _Utils_ap(string, result)
					});
			},
			$danfishgold$base64_bytes$Decode$decode18Bytes);
	} else {
		if (remaining >= 3) {
			var helper = F3(
				function (a, b, c) {
					var combined = ((a << 16) | (b << 8)) | c;
					return $elm$bytes$Bytes$Decode$Loop(
						{
							aB: remaining - 3,
							aD: _Utils_ap(
								string,
								A2($danfishgold$base64_bytes$Decode$bitsToChars, combined, 0))
						});
				});
			return A4($elm$bytes$Bytes$Decode$map3, helper, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8);
		} else {
			if (!remaining) {
				return $elm$bytes$Bytes$Decode$succeed(
					$elm$bytes$Bytes$Decode$Done(string));
			} else {
				if (remaining === 2) {
					var helper = F2(
						function (a, b) {
							var combined = (a << 16) | (b << 8);
							return $elm$bytes$Bytes$Decode$Done(
								_Utils_ap(
									string,
									A2($danfishgold$base64_bytes$Decode$bitsToChars, combined, 1)));
						});
					return A3($elm$bytes$Bytes$Decode$map2, helper, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8);
				} else {
					return A2(
						$elm$bytes$Bytes$Decode$map,
						function (a) {
							return $elm$bytes$Bytes$Decode$Done(
								_Utils_ap(
									string,
									A2($danfishgold$base64_bytes$Decode$bitsToChars, a << 16, 2)));
						},
						$elm$bytes$Bytes$Decode$unsignedInt8);
				}
			}
		}
	}
};
var $danfishgold$base64_bytes$Decode$decoder = function (width) {
	return A2(
		$elm$bytes$Bytes$Decode$loop,
		{aB: width, aD: ''},
		$danfishgold$base64_bytes$Decode$loopHelp);
};
var $danfishgold$base64_bytes$Decode$fromBytes = function (bytes) {
	return A2(
		$elm$bytes$Bytes$Decode$decode,
		$danfishgold$base64_bytes$Decode$decoder(
			$elm$bytes$Bytes$width(bytes)),
		bytes);
};
var $danfishgold$base64_bytes$Base64$fromBytes = $danfishgold$base64_bytes$Decode$fromBytes;
var $justgook$elm_image$Image$Internal$ImageData$RGBA = 0;
var $justgook$elm_image$Image$Internal$ImageData$RightDown = 0;
var $justgook$elm_image$Image$Internal$ImageData$defaultOptions = {bd: 0, bw: 0};
var $folkertdev$elm_flate$Flate$crc32 = $folkertdev$elm_flate$Checksum$Crc32$crc32;
var $justgook$elm_image$Image$Internal$PNG$encodeChunk = F2(
	function (kind, data) {
		var length = $elm$bytes$Bytes$width(data);
		var kindAndData = $elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(
				_List_fromArray(
					[
						A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, kind),
						$elm$bytes$Bytes$Encode$bytes(data)
					])));
		return $elm$bytes$Bytes$Encode$sequence(
			_List_fromArray(
				[
					A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, length),
					$elm$bytes$Bytes$Encode$bytes(kindAndData),
					A2(
					$elm$bytes$Bytes$Encode$unsignedInt32,
					1,
					$folkertdev$elm_flate$Flate$crc32(kindAndData))
				]));
	});
var $folkertdev$elm_flate$Flate$Dynamic = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$Flate$WithWindowSize = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$Deflate$Internal$chunksHelp = F2(
	function (chunkSize, _v0) {
		var sizeRemaining = _v0.a;
		var accum = _v0.b;
		return (!sizeRemaining) ? $elm$bytes$Bytes$Decode$succeed(
			$elm$bytes$Bytes$Decode$Done(_List_Nil)) : ((_Utils_cmp(chunkSize, sizeRemaining) > 0) ? A2(
			$elm$bytes$Bytes$Decode$map,
			function (_new) {
				return $elm$bytes$Bytes$Decode$Done(
					$elm$core$List$reverse(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(true, _new),
							accum)));
			},
			$elm$bytes$Bytes$Decode$bytes(sizeRemaining)) : A2(
			$elm$bytes$Bytes$Decode$map,
			function (_new) {
				return $elm$bytes$Bytes$Decode$Loop(
					_Utils_Tuple2(
						sizeRemaining - chunkSize,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(false, _new),
							accum)));
			},
			$elm$bytes$Bytes$Decode$bytes(chunkSize)));
	});
var $folkertdev$elm_flate$Deflate$Internal$chunks = F2(
	function (chunkSize, buffer) {
		var _v0 = A2(
			$elm$bytes$Bytes$Decode$decode,
			A2(
				$elm$bytes$Bytes$Decode$loop,
				_Utils_Tuple2(
					$elm$bytes$Bytes$width(buffer),
					_List_Nil),
				$folkertdev$elm_flate$Deflate$Internal$chunksHelp(chunkSize)),
			buffer);
		if (_v0.$ === 1) {
			return _List_fromArray(
				[
					_Utils_Tuple2(
					true,
					$elm$bytes$Bytes$Encode$encode(
						$elm$bytes$Bytes$Encode$sequence(_List_Nil)))
				]);
		} else {
			if (!_v0.a.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						true,
						$elm$bytes$Bytes$Encode$encode(
							$elm$bytes$Bytes$Encode$sequence(_List_Nil)))
					]);
			} else {
				var value = _v0.a;
				return value;
			}
		}
	});
var $folkertdev$elm_flate$Deflate$Internal$default_block_size = 1024 * 1024;
var $folkertdev$elm_flate$Deflate$BitWriter$empty = {q: 0, r: _List_Nil, x: 0};
var $folkertdev$elm_flate$Deflate$Symbol$code = function (symbol) {
	switch (symbol.$) {
		case 1:
			var _byte = symbol.a;
			return _byte;
		case 0:
			return 256;
		default:
			var length = symbol.a;
			return ((length >= 3) && (length <= 10)) ? ((257 + length) - 3) : (((length >= 11) && (length <= 18)) ? (265 + (((length - 11) / 2) | 0)) : (((length >= 19) && (length <= 34)) ? (269 + (((length - 19) / 4) | 0)) : (((length >= 35) && (length <= 66)) ? (273 + (((length - 35) / 8) | 0)) : (((length >= 67) && (length <= 130)) ? (277 + (((length - 67) / 16) | 0)) : (((length >= 131) && (length <= 257)) ? (281 + (((length - 131) / 32) | 0)) : ((length === 258) ? 285 : (-1)))))));
	}
};
var $folkertdev$elm_flate$Deflate$Symbol$distance = function (symbol) {
	if (symbol.$ === 2) {
		var distance_ = symbol.b;
		if (distance_ <= 4) {
			return $elm$core$Maybe$Just(
				_Utils_Tuple3(distance_ - 1, 0, 0));
		} else {
			var go = F3(
				function (extraBits, code_, base) {
					go:
					while (true) {
						if (_Utils_cmp(base * 2, distance_) < 0) {
							var $temp$extraBits = extraBits + 1,
								$temp$code_ = code_ + 2,
								$temp$base = base * 2;
							extraBits = $temp$extraBits;
							code_ = $temp$code_;
							base = $temp$base;
							continue go;
						} else {
							return _Utils_Tuple3(extraBits, code_, base);
						}
					}
				});
			var _v1 = A3(go, 1, 4, 4);
			var extraBits = _v1.a;
			var code_ = _v1.b;
			var base = _v1.c;
			var delta = (distance_ - base) - 1;
			var half = (base / 2) | 0;
			return (_Utils_cmp(distance_, base + half) < 1) ? $elm$core$Maybe$Just(
				_Utils_Tuple3(
					code_,
					extraBits,
					A2($elm$core$Basics$modBy, half, delta))) : $elm$core$Maybe$Just(
				_Utils_Tuple3(
					code_ + 1,
					extraBits,
					A2($elm$core$Basics$modBy, half, delta)));
		}
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$elm_flate$Deflate$Symbol$update = F3(
	function (index, tagger, array) {
		var _v0 = A2($elm$core$Array$get, index, array);
		if (_v0.$ === 1) {
			return array;
		} else {
			var value = _v0.a;
			return A3(
				$elm$core$Array$set,
				index,
				tagger(value),
				array);
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$dynamicFindFrequencies = F2(
	function (symbol, _v0) {
		var literalCounts = _v0.a;
		var distanceCounts = _v0.b;
		var emptyDistanceCount = _v0.c;
		var _v1 = $folkertdev$elm_flate$Deflate$Symbol$distance(symbol);
		if (_v1.$ === 1) {
			return _Utils_Tuple3(
				A3(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					$folkertdev$elm_flate$Deflate$Symbol$code(symbol),
					function (v) {
						return v + 1;
					},
					literalCounts),
				distanceCounts,
				emptyDistanceCount);
		} else {
			var _v2 = _v1.a;
			var d = _v2.a;
			return _Utils_Tuple3(
				A3(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					$folkertdev$elm_flate$Deflate$Symbol$code(symbol),
					function (v) {
						return v + 1;
					},
					literalCounts),
				A3(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					d,
					function (v) {
						return v + 1;
					},
					distanceCounts),
				false);
		}
	});
var $elm$core$List$sortWith = _List_sortWith;
var $folkertdev$elm_flate$Huffman$calcOptimalMaxBitWidth = function (frequencies) {
	var heapModificationLoop = function (heap) {
		heapModificationLoop:
		while (true) {
			if (!heap.b) {
				return 0;
			} else {
				if (!heap.b.b) {
					var _v1 = heap.a;
					var value = _v1.b;
					return A2($elm$core$Basics$max, 1, value);
				} else {
					var _v2 = heap.a;
					var weight1 = _v2.a;
					var width1 = _v2.b;
					var _v3 = heap.b;
					var _v4 = _v3.a;
					var weight2 = _v4.a;
					var width2 = _v4.b;
					var rest = _v3.b;
					var $temp$heap = A2(
						$elm$core$List$sortWith,
						F2(
							function (a, b) {
								return A2($elm$core$Basics$compare, b, a);
							}),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								weight1 + weight2,
								1 + A2($elm$core$Basics$max, width1, width2)),
							rest));
					heap = $temp$heap;
					continue heapModificationLoop;
				}
			}
		}
	};
	var createHeapFolder = F2(
		function (freq, heap) {
			return (freq > 0) ? A2(
				$elm$core$List$cons,
				_Utils_Tuple2(-freq, 0),
				heap) : heap;
		});
	var createHeap = A3($elm$core$Array$foldl, createHeapFolder, _List_Nil, frequencies);
	return heapModificationLoop(createHeap);
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Array$filter = F2(
	function (isGood, array) {
		return $elm$core$Array$fromList(
			A3(
				$elm$core$Array$foldr,
				F2(
					function (x, xs) {
						return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
					}),
				_List_Nil,
				array));
	});
var $elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var $elm$core$Array$indexedMap = F2(
	function (func, _v0) {
		var len = _v0.a;
		var tree = _v0.c;
		var tail = _v0.d;
		var initialBuilder = {
			f: _List_Nil,
			b: 0,
			e: A3(
				$elm$core$Elm$JsArray$indexedMap,
				func,
				$elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.b * $elm$core$Array$branchFactor;
					var mappedLeaf = $elm$core$Array$Leaf(
						A3($elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						f: A2($elm$core$List$cons, mappedLeaf, builder.f),
						b: builder.b + 1,
						e: builder.e
					};
				}
			});
		return A2(
			$elm$core$Array$builderToArray,
			true,
			A3($elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeLoop = F3(
	function (xarr, yarr, accum) {
		mergeLoop:
		while (true) {
			var _v0 = _Utils_Tuple2(xarr, yarr);
			if (!_v0.a.b) {
				return A2(
					$elm$core$Array$append,
					accum,
					$elm$core$Array$fromList(yarr));
			} else {
				if (!_v0.b.b) {
					return A2(
						$elm$core$Array$append,
						accum,
						$elm$core$Array$fromList(xarr));
				} else {
					var _v1 = _v0.a;
					var x = _v1.a;
					var xrest = _v1.b;
					var _v2 = _v0.b;
					var y = _v2.a;
					var yrest = _v2.b;
					if (_Utils_cmp(x.u, y.u) < 0) {
						var $temp$xarr = xrest,
							$temp$yarr = yarr,
							$temp$accum = A2($elm$core$Array$push, x, accum);
						xarr = $temp$xarr;
						yarr = $temp$yarr;
						accum = $temp$accum;
						continue mergeLoop;
					} else {
						var $temp$xarr = xarr,
							$temp$yarr = yrest,
							$temp$accum = A2($elm$core$Array$push, y, accum);
						xarr = $temp$xarr;
						yarr = $temp$yarr;
						accum = $temp$accum;
						continue mergeLoop;
					}
				}
			}
		}
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$merge = F2(
	function (x, y) {
		return A3(
			$folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeLoop,
			$elm$core$Array$toList(x),
			$elm$core$Array$toList(y),
			$elm$core$Array$empty);
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeNodes = F2(
	function (node1, node2) {
		return {
			_: A2($elm$core$Array$append, node1._, node2._),
			u: node1.u + node2.u
		};
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$package = function (nodes) {
	if ($elm$core$Array$length(nodes) >= 2) {
		var newLen = ($elm$core$Array$length(nodes) / 2) | 0;
		var loop = F2(
			function (currentNodes, accum) {
				loop:
				while (true) {
					if (currentNodes.b && currentNodes.b.b) {
						var self = currentNodes.a;
						var _v1 = currentNodes.b;
						var other = _v1.a;
						var rest = _v1.b;
						var $temp$currentNodes = rest,
							$temp$accum = A2(
							$elm$core$List$cons,
							A2($folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeNodes, self, other),
							accum);
						currentNodes = $temp$currentNodes;
						accum = $temp$accum;
						continue loop;
					} else {
						return $elm$core$Array$fromList(
							$elm$core$List$reverse(accum));
					}
				}
			});
		return A2(
			loop,
			$elm$core$Array$toList(nodes),
			_List_Nil);
	} else {
		return nodes;
	}
};
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$singletonNode = F2(
	function (symbol, weight) {
		return {
			_: A2($elm$core$Array$repeat, 1, symbol),
			u: weight
		};
	});
var $elm_community$list_extra$List$Extra$stableSortWith = F2(
	function (pred, list) {
		var predWithIndex = F2(
			function (_v1, _v2) {
				var a1 = _v1.a;
				var i1 = _v1.b;
				var a2 = _v2.a;
				var i2 = _v2.b;
				var result = A2(pred, a1, a2);
				if (result === 1) {
					return A2($elm$core$Basics$compare, i1, i2);
				} else {
					return result;
				}
			});
		var listWithIndex = A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, a) {
					return _Utils_Tuple2(a, i);
				}),
			list);
		return A2(
			$elm$core$List$map,
			$elm$core$Tuple$first,
			A2($elm$core$List$sortWith, predWithIndex, listWithIndex));
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$update = F3(
	function (index, tagger, array) {
		var _v0 = A2($elm$core$Array$get, index, array);
		if (_v0.$ === 1) {
			return array;
		} else {
			var value = _v0.a;
			return A3(
				$elm$core$Array$set,
				index,
				tagger(value),
				array);
		}
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$calculate = F2(
	function (maxBitWidth, frequencies) {
		var source = $elm$core$Array$fromList(
			A2(
				$elm_community$list_extra$List$Extra$stableSortWith,
				F2(
					function (a, b) {
						return A2($elm$core$Basics$compare, a.u, b.u);
					}),
				$elm$core$Array$toList(
					A2(
						$elm$core$Array$map,
						function (_v3) {
							var symbol = _v3.a;
							var weight = _v3.b;
							return A2($folkertdev$elm_flate$LengthLimitedHuffmanCodes$singletonNode, symbol, weight);
						},
						A2(
							$elm$core$Array$filter,
							function (_v2) {
								var f = _v2.b;
								return f > 0;
							},
							A2($elm$core$Array$indexedMap, $elm$core$Tuple$pair, frequencies))))));
		var weighted = A3(
			$elm$core$List$foldl,
			F2(
				function (_v1, w) {
					return A2(
						$folkertdev$elm_flate$LengthLimitedHuffmanCodes$merge,
						$folkertdev$elm_flate$LengthLimitedHuffmanCodes$package(w),
						source);
				}),
			source,
			A2($elm$core$List$range, 0, maxBitWidth - 2));
		var loop = F2(
			function (symbols, accum) {
				loop:
				while (true) {
					if (!symbols.b) {
						return accum;
					} else {
						var symbol = symbols.a;
						var rest = symbols.b;
						var $temp$symbols = rest,
							$temp$accum = A3(
							$folkertdev$elm_flate$LengthLimitedHuffmanCodes$update,
							symbol,
							function (v) {
								return v + 1;
							},
							accum);
						symbols = $temp$symbols;
						accum = $temp$accum;
						continue loop;
					}
				}
			});
		var allSymbols = A2(
			$elm$core$List$concatMap,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $._;
				},
				$elm$core$Array$toList),
			$elm$core$Array$toList(
				$folkertdev$elm_flate$LengthLimitedHuffmanCodes$package(weighted)));
		return A2(
			loop,
			allSymbols,
			A2(
				$elm$core$Array$repeat,
				$elm$core$Array$length(frequencies),
				0));
	});
var $folkertdev$elm_flate$Huffman$Tree = $elm$core$Basics$identity;
var $folkertdev$elm_flate$Huffman$Code = $elm$core$Basics$identity;
var $folkertdev$elm_flate$Huffman$codeFromRecord = $elm$core$Basics$identity;
var $folkertdev$elm_flate$Huffman$new = function (n) {
	return A2(
		$elm$core$Array$repeat,
		n,
		$folkertdev$elm_flate$Huffman$codeFromRecord(
			{a: 0, z: 0}));
};
var $folkertdev$elm_flate$Huffman$inverseEndianLoop = F4(
	function (i, limit, f, t) {
		inverseEndianLoop:
		while (true) {
			if (_Utils_cmp(i, limit) < 0) {
				var $temp$i = i + 1,
					$temp$limit = limit,
					$temp$f = f >> 1,
					$temp$t = (f & 1) | (t << 1);
				i = $temp$i;
				limit = $temp$limit;
				f = $temp$f;
				t = $temp$t;
				continue inverseEndianLoop;
			} else {
				return t;
			}
		}
	});
var $folkertdev$elm_flate$Huffman$inverseEndian = function (_v0) {
	var width = _v0.z;
	var bits = _v0.a;
	var inverseBits = A4($folkertdev$elm_flate$Huffman$inverseEndianLoop, 0, width, bits, 0);
	return {a: inverseBits, z: width};
};
var $folkertdev$elm_flate$Huffman$setMapping = F3(
	function (symbol, code, _v0) {
		var array = _v0;
		return A3(
			$elm$core$Array$set,
			symbol,
			$folkertdev$elm_flate$Huffman$inverseEndian(code),
			array);
	});
var $folkertdev$elm_flate$Huffman$restoreCanonicalHuffmanCodes = F2(
	function (bitWidths, tree) {
		var symbols = A2(
			$elm_community$list_extra$List$Extra$stableSortWith,
			F2(
				function (_v4, _v5) {
					var a = _v4.b;
					var b = _v5.b;
					return A2($elm$core$Basics$compare, a, b);
				}),
			$elm$core$Array$toList(
				A2(
					$elm$core$Array$filter,
					function (_v3) {
						var codeBitWidth = _v3.b;
						return codeBitWidth > 0;
					},
					A2($elm$core$Array$indexedMap, $elm$core$Tuple$pair, bitWidths))));
		var loop = F2(
			function (_v1, _v2) {
				var symbol = _v1.a;
				var bitWidth = _v1.b;
				var code = _v2.a;
				var prevWidth = _v2.b;
				var currentTree = _v2.c;
				var newBits = code << (bitWidth - prevWidth);
				var nextCode = {a: newBits, z: bitWidth};
				return _Utils_Tuple3(
					newBits + 1,
					bitWidth,
					A3($folkertdev$elm_flate$Huffman$setMapping, symbol, nextCode, currentTree));
			});
		return function (_v0) {
			var x = _v0.c;
			return x;
		}(
			A3(
				$elm$core$List$foldl,
				loop,
				_Utils_Tuple3(0, 0, tree),
				symbols));
	});
var $folkertdev$elm_flate$Huffman$fromBitWidths = function (bitWidths) {
	var symbolCount = function (v) {
		return v + 1;
	}(
		A2(
			$elm$core$Maybe$withDefault,
			0,
			A2(
				$elm$core$Maybe$map,
				$elm$core$Tuple$first,
				function (a) {
					return A2(
						$elm$core$Array$get,
						$elm$core$Array$length(a) - 1,
						a);
				}(
					A2(
						$elm$core$Array$filter,
						function (e) {
							return e.b > 0;
						},
						A2($elm$core$Array$indexedMap, $elm$core$Tuple$pair, bitWidths))))));
	return A2(
		$folkertdev$elm_flate$Huffman$restoreCanonicalHuffmanCodes,
		bitWidths,
		$folkertdev$elm_flate$Huffman$new(symbolCount));
};
var $folkertdev$elm_flate$Huffman$fromFrequencies = F2(
	function (symbolFrequencies, maxBitWidth_) {
		var maxBitWidth = A2(
			$elm$core$Basics$min,
			maxBitWidth_,
			$folkertdev$elm_flate$Huffman$calcOptimalMaxBitWidth(symbolFrequencies));
		var codeBitWidhts = A2($folkertdev$elm_flate$LengthLimitedHuffmanCodes$calculate, maxBitWidth, symbolFrequencies);
		return $folkertdev$elm_flate$Huffman$fromBitWidths(codeBitWidhts);
	});
var $folkertdev$elm_flate$Deflate$Symbol$buildDynamicHuffmanCodec = function (symbols) {
	var _v0 = A3(
		$elm$core$Array$foldl,
		$folkertdev$elm_flate$Deflate$Symbol$dynamicFindFrequencies,
		_Utils_Tuple3(
			A2($elm$core$Array$repeat, 286, 0),
			A2($elm$core$Array$repeat, 30, 0),
			true),
		symbols);
	var literalCounts = _v0.a;
	var distanceCounts = _v0.b;
	var emptyDistanceCount = _v0.c;
	return {
		V: emptyDistanceCount ? A2(
			$folkertdev$elm_flate$Huffman$fromFrequencies,
			A3($elm$core$Array$set, 0, 1, distanceCounts),
			15) : A2($folkertdev$elm_flate$Huffman$fromFrequencies, distanceCounts, 15),
		X: A2($folkertdev$elm_flate$Huffman$fromFrequencies, literalCounts, 15)
	};
};
var $folkertdev$elm_flate$Deflate$Symbol$EndOfBlock = {$: 0};
var $folkertdev$elm_flate$Deflate$Symbol$Literal = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$Deflate$Symbol$Share = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $folkertdev$elm_flate$Deflate$Internal$codeToSymbol = function (code) {
	if (!code.$) {
		var v = code.a;
		return $folkertdev$elm_flate$Deflate$Symbol$Literal(v);
	} else {
		var length = code.a;
		var backwardDistance = code.b;
		return A2($folkertdev$elm_flate$Deflate$Symbol$Share, length, backwardDistance);
	}
};
var $folkertdev$elm_flate$LZ77$Literal = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$elm_flate$LZ77$Pointer = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $folkertdev$elm_flate$PrefixTable$Small = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$elm_flate$PrefixTable$Large = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$PrefixTable$LargePrefixTable = $elm$core$Basics$identity;
var $folkertdev$elm_flate$PrefixTable$insertInList = F6(
	function (i, array, p2, position, remaining, accum) {
		insertInList:
		while (true) {
			if (!remaining.b) {
				var newPositions = A2(
					$elm$core$List$cons,
					_Utils_Tuple2(p2, position),
					accum);
				return _Utils_Tuple2(
					$folkertdev$elm_flate$PrefixTable$Large(
						A3($elm$core$Array$set, i, newPositions, array)),
					$elm$core$Maybe$Nothing);
			} else {
				var current = remaining.a;
				var key = current.a;
				var oldValue = current.b;
				var rest = remaining.b;
				if (!(key - p2)) {
					var newPositions = _Utils_ap(
						accum,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(key, position),
							rest));
					return _Utils_Tuple2(
						$folkertdev$elm_flate$PrefixTable$Large(
							A3($elm$core$Array$set, i, newPositions, array)),
						$elm$core$Maybe$Just(oldValue));
				} else {
					var $temp$i = i,
						$temp$array = array,
						$temp$p2 = p2,
						$temp$position = position,
						$temp$remaining = rest,
						$temp$accum = A2($elm$core$List$cons, current, accum);
					i = $temp$i;
					array = $temp$array;
					p2 = $temp$p2;
					position = $temp$position;
					remaining = $temp$remaining;
					accum = $temp$accum;
					continue insertInList;
				}
			}
		}
	});
var $folkertdev$elm_flate$PrefixTable$insert = F3(
	function (_v0, position, ptable) {
		var prefix_ = _v0;
		var prefix = 16777215 & (prefix_ >>> 0);
		if (!ptable.$) {
			var dict = ptable.a;
			var _v2 = A2($elm$core$Dict$get, prefix, dict);
			if (_v2.$ === 1) {
				return _Utils_Tuple2(
					$folkertdev$elm_flate$PrefixTable$Small(
						A3($elm$core$Dict$insert, prefix, position, dict)),
					$elm$core$Maybe$Nothing);
			} else {
				var oldValue = _v2.a;
				return _Utils_Tuple2(
					$folkertdev$elm_flate$PrefixTable$Small(
						A3($elm$core$Dict$insert, prefix, position, dict)),
					$elm$core$Maybe$Just(oldValue));
			}
		} else {
			var array = ptable.a;
			var index = prefix >> 8;
			var _v3 = A2($elm$core$Array$get, index, array);
			if (_v3.$ === 1) {
				return _Utils_Tuple2(ptable, $elm$core$Maybe$Nothing);
			} else {
				var positions = _v3.a;
				return A6($folkertdev$elm_flate$PrefixTable$insertInList, index, array, 255 & prefix, position, positions, _List_Nil);
			}
		}
	});
var $folkertdev$elm_flate$LZ77$longestCommonPrefixLoop = F5(
	function (i, j, limit, accum, array) {
		longestCommonPrefixLoop:
		while (true) {
			if (_Utils_cmp(i, limit) < 0) {
				var _v0 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, i, array);
				if (_v0.$ === 1) {
					return accum;
				} else {
					var value1 = _v0.a;
					var _v1 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, j, array);
					if (_v1.$ === 1) {
						return accum;
					} else {
						var value2 = _v1.a;
						if (!(value1 - value2)) {
							var $temp$i = i + 1,
								$temp$j = j + 1,
								$temp$limit = limit,
								$temp$accum = accum + 1,
								$temp$array = array;
							i = $temp$i;
							j = $temp$j;
							limit = $temp$limit;
							accum = $temp$accum;
							array = $temp$array;
							continue longestCommonPrefixLoop;
						} else {
							return accum;
						}
					}
				}
			} else {
				return accum;
			}
		}
	});
var $folkertdev$elm_flate$LZ77$max_length = 258;
var $folkertdev$elm_flate$LZ77$longestCommonPrefix = F3(
	function (i, j, array) {
		var remaining = A2(
			$elm$core$Basics$min,
			$folkertdev$elm_flate$LZ77$max_length - 3,
			$folkertdev$elm_flate$Experimental$ByteArray$length(array) - j);
		return A5($folkertdev$elm_flate$LZ77$longestCommonPrefixLoop, i, j, i + remaining, 0, array);
	});
var $folkertdev$elm_flate$PrefixTable$OutOfBounds = {$: 3};
var $folkertdev$elm_flate$PrefixTable$Prefix = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $folkertdev$elm_flate$PrefixTable$PrefixCode = $elm$core$Basics$identity;
var $folkertdev$elm_flate$PrefixTable$Trailing1 = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$PrefixTable$Trailing2 = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $folkertdev$elm_flate$Experimental$ByteArray$getInt32 = F2(
	function (index, _v0) {
		var array = _v0.a;
		var finalBytes = _v0.c;
		var size = $elm$core$Array$length(array);
		return (!(index - size)) ? $elm$core$Maybe$Just(finalBytes) : A2($elm$core$Array$get, index, array);
	});
var $folkertdev$elm_flate$PrefixTable$prefixAt = F2(
	function (k, input) {
		var size = $folkertdev$elm_flate$Experimental$ByteArray$length(input);
		if (_Utils_cmp(k + 2, size) > -1) {
			if (_Utils_cmp(k, size) > -1) {
				return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
			} else {
				if (_Utils_cmp(k + 1, size) > -1) {
					var _v0 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, k, input);
					if (_v0.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var value = _v0.a;
						return $folkertdev$elm_flate$PrefixTable$Trailing1(value);
					}
				} else {
					var _v1 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, k, input);
					if (_v1.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var v1 = _v1.a;
						var _v2 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, k + 1, input);
						if (_v2.$ === 1) {
							return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
						} else {
							var v2 = _v2.a;
							return A2($folkertdev$elm_flate$PrefixTable$Trailing2, v1, v2);
						}
					}
				}
			}
		} else {
			var offset = k % 4;
			var internalIndex = (k / 4) | 0;
			switch (offset) {
				case 0:
					var _v4 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v4.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v4.a;
						var first = 255 & ((int32 >> 24) >>> 0);
						var code = int32 >> 8;
						return A2($folkertdev$elm_flate$PrefixTable$Prefix, first, code);
					}
				case 1:
					var _v5 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v5.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v5.a;
						var first = 255 & ((255 & (int32 >> 16)) >>> 0);
						var code = 16777215 & int32;
						return A2($folkertdev$elm_flate$PrefixTable$Prefix, first, code);
					}
				case 2:
					var _v6 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v6.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v6.a;
						var _v7 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex + 1, input);
						if (_v7.$ === 1) {
							return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
						} else {
							var nextInt32 = _v7.a;
							var first = 255 & ((255 & (int32 >> 8)) >>> 0);
							var code = 16777215 & (((255 & (nextInt32 >> 24)) | ((65535 & int32) << 8)) >>> 0);
							return A2($folkertdev$elm_flate$PrefixTable$Prefix, first, code);
						}
					}
				default:
					var _v8 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v8.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v8.a;
						var _v9 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex + 1, input);
						if (_v9.$ === 1) {
							return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
						} else {
							var nextInt32 = _v9.a;
							var first = 255 & ((255 & int32) >>> 0);
							var code = (65535 & (nextInt32 >> 16)) | ((255 & int32) << 16);
							return A2($folkertdev$elm_flate$PrefixTable$Prefix, first, code);
						}
					}
			}
		}
	});
var $folkertdev$elm_flate$LZ77$updatePrefixTableLoop = F4(
	function (k, limit, buffer, prefixTable) {
		updatePrefixTableLoop:
		while (true) {
			if (_Utils_cmp(k, limit) < 0) {
				var _v0 = A2($folkertdev$elm_flate$PrefixTable$prefixAt, k, buffer);
				if (!_v0.$) {
					var code = _v0.b;
					var _v1 = A3($folkertdev$elm_flate$PrefixTable$insert, code, k, prefixTable);
					var newPrefixTable = _v1.a;
					var $temp$k = k + 1,
						$temp$limit = limit,
						$temp$buffer = buffer,
						$temp$prefixTable = newPrefixTable;
					k = $temp$k;
					limit = $temp$limit;
					buffer = $temp$buffer;
					prefixTable = $temp$prefixTable;
					continue updatePrefixTableLoop;
				} else {
					return prefixTable;
				}
			} else {
				return prefixTable;
			}
		}
	});
var $folkertdev$elm_flate$LZ77$flushLoop = F5(
	function (i, windowSize, buffer, prefixTable, encoders) {
		flushLoop:
		while (true) {
			var _v0 = A2($folkertdev$elm_flate$PrefixTable$prefixAt, i, buffer);
			switch (_v0.$) {
				case 3:
					return encoders;
				case 1:
					var p1 = _v0.a;
					return A2(
						$elm$core$Array$push,
						$folkertdev$elm_flate$LZ77$Literal(p1),
						encoders);
				case 2:
					var p1 = _v0.a;
					var p2 = _v0.b;
					return A2(
						$elm$core$Array$push,
						$folkertdev$elm_flate$LZ77$Literal(p2),
						A2(
							$elm$core$Array$push,
							$folkertdev$elm_flate$LZ77$Literal(p1),
							encoders));
				default:
					var p1 = _v0.a;
					var key = _v0.b;
					var _v1 = A3($folkertdev$elm_flate$PrefixTable$insert, key, i, prefixTable);
					var newPrefixTable = _v1.a;
					var matched = _v1.b;
					if (!matched.$) {
						var j = matched.a;
						var distance = i - j;
						if ((distance - windowSize) <= 0) {
							var length = 3 + A3($folkertdev$elm_flate$LZ77$longestCommonPrefix, i + 3, j + 3, buffer);
							var newEncoders = A2(
								$elm$core$Array$push,
								A2($folkertdev$elm_flate$LZ77$Pointer, length, distance),
								encoders);
							var newerPrefixTable = A4($folkertdev$elm_flate$LZ77$updatePrefixTableLoop, i + 1, i + length, buffer, newPrefixTable);
							var $temp$i = i + length,
								$temp$windowSize = windowSize,
								$temp$buffer = buffer,
								$temp$prefixTable = newerPrefixTable,
								$temp$encoders = newEncoders;
							i = $temp$i;
							windowSize = $temp$windowSize;
							buffer = $temp$buffer;
							prefixTable = $temp$prefixTable;
							encoders = $temp$encoders;
							continue flushLoop;
						} else {
							var $temp$i = i + 1,
								$temp$windowSize = windowSize,
								$temp$buffer = buffer,
								$temp$prefixTable = newPrefixTable,
								$temp$encoders = A2(
								$elm$core$Array$push,
								$folkertdev$elm_flate$LZ77$Literal(p1),
								encoders);
							i = $temp$i;
							windowSize = $temp$windowSize;
							buffer = $temp$buffer;
							prefixTable = $temp$prefixTable;
							encoders = $temp$encoders;
							continue flushLoop;
						}
					} else {
						var $temp$i = i + 1,
							$temp$windowSize = windowSize,
							$temp$buffer = buffer,
							$temp$prefixTable = newPrefixTable,
							$temp$encoders = A2(
							$elm$core$Array$push,
							$folkertdev$elm_flate$LZ77$Literal(p1),
							encoders);
						i = $temp$i;
						windowSize = $temp$windowSize;
						buffer = $temp$buffer;
						prefixTable = $temp$prefixTable;
						encoders = $temp$encoders;
						continue flushLoop;
					}
			}
		}
	});
var $folkertdev$elm_flate$PrefixTable$max_distance = 32768;
var $folkertdev$elm_flate$PrefixTable$max_window_size = $folkertdev$elm_flate$PrefixTable$max_distance;
var $folkertdev$elm_flate$PrefixTable$newLargePrefixTable = A2($elm$core$Array$repeat, 65535, _List_Nil);
var $folkertdev$elm_flate$PrefixTable$new = function (nbytes) {
	return (_Utils_cmp(nbytes, $folkertdev$elm_flate$PrefixTable$max_window_size) < 0) ? $folkertdev$elm_flate$PrefixTable$Small($elm$core$Dict$empty) : $folkertdev$elm_flate$PrefixTable$Large($folkertdev$elm_flate$PrefixTable$newLargePrefixTable);
};
var $folkertdev$elm_flate$LZ77$flush = F2(
	function (windowSize, buffer) {
		var codes = A5(
			$folkertdev$elm_flate$LZ77$flushLoop,
			0,
			windowSize,
			buffer,
			$folkertdev$elm_flate$PrefixTable$new(
				$folkertdev$elm_flate$Experimental$ByteArray$length(buffer)),
			$elm$core$Array$empty);
		return codes;
	});
var $folkertdev$elm_flate$Experimental$ByteArray$fromBytesHelp = function (_v0) {
	var remaining = _v0.a;
	var array = _v0.b;
	if (remaining >= 40) {
		return A2(
			$elm$bytes$Bytes$Decode$andThen,
			$elm$core$Basics$identity,
			A6(
				$elm$bytes$Bytes$Decode$map5,
				F5(
					function (a, b, c, d, e) {
						return A6(
							$elm$bytes$Bytes$Decode$map5,
							F5(
								function (f, g, h, i, j) {
									return $elm$bytes$Bytes$Decode$Loop(
										_Utils_Tuple2(
											remaining - 40,
											A2(
												$elm$core$Array$append,
												array,
												$elm$core$Array$fromList(
													_List_fromArray(
														[a, b, c, d, e, f, g, h, i, j])))));
								}),
							$elm$bytes$Bytes$Decode$unsignedInt32(1),
							$elm$bytes$Bytes$Decode$unsignedInt32(1),
							$elm$bytes$Bytes$Decode$unsignedInt32(1),
							$elm$bytes$Bytes$Decode$unsignedInt32(1),
							$elm$bytes$Bytes$Decode$unsignedInt32(1));
					}),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1)));
	} else {
		if (remaining >= 20) {
			return A6(
				$elm$bytes$Bytes$Decode$map5,
				F5(
					function (a, b, c, d, e) {
						return $elm$bytes$Bytes$Decode$Loop(
							_Utils_Tuple2(
								remaining - 20,
								A2(
									$elm$core$Array$push,
									e,
									A2(
										$elm$core$Array$push,
										d,
										A2(
											$elm$core$Array$push,
											c,
											A2(
												$elm$core$Array$push,
												b,
												A2($elm$core$Array$push, a, array)))))));
					}),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1));
		} else {
			if (remaining >= 4) {
				return A2(
					$elm$bytes$Bytes$Decode$map,
					function (a) {
						return $elm$bytes$Bytes$Decode$Loop(
							_Utils_Tuple2(
								remaining - 4,
								A2($elm$core$Array$push, a, array)));
					},
					$elm$bytes$Bytes$Decode$unsignedInt32(1));
			} else {
				switch (remaining) {
					case 0:
						return $elm$bytes$Bytes$Decode$succeed(
							$elm$bytes$Bytes$Decode$Done(
								_Utils_Tuple3(0, 0, array)));
					case 1:
						return A2(
							$elm$bytes$Bytes$Decode$map,
							function (_byte) {
								return $elm$bytes$Bytes$Decode$Done(
									_Utils_Tuple3(1, _byte << 24, array));
							},
							$elm$bytes$Bytes$Decode$unsignedInt8);
					case 2:
						return A2(
							$elm$bytes$Bytes$Decode$map,
							function (_byte) {
								return $elm$bytes$Bytes$Decode$Done(
									_Utils_Tuple3(2, _byte << 16, array));
							},
							$elm$bytes$Bytes$Decode$unsignedInt16(1));
					default:
						return A3(
							$elm$bytes$Bytes$Decode$map2,
							F2(
								function (bytes, _byte) {
									return $elm$bytes$Bytes$Decode$Done(
										_Utils_Tuple3(3, (bytes << 16) | (_byte << 8), array));
								}),
							$elm$bytes$Bytes$Decode$unsignedInt16(1),
							$elm$bytes$Bytes$Decode$unsignedInt8);
				}
			}
		}
	}
};
var $folkertdev$elm_flate$Experimental$ByteArray$fromBytes = function (buffer) {
	var _v0 = A2(
		$elm$bytes$Bytes$Decode$decode,
		A2(
			$elm$bytes$Bytes$Decode$loop,
			_Utils_Tuple2(
				$elm$bytes$Bytes$width(buffer),
				$elm$core$Array$empty),
			$folkertdev$elm_flate$Experimental$ByteArray$fromBytesHelp),
		buffer);
	if (_v0.$ === 1) {
		return $folkertdev$elm_flate$Experimental$ByteArray$empty;
	} else {
		var _v1 = _v0.a;
		var finalSize = _v1.a;
		var finalBytes = _v1.b;
		var array = _v1.c;
		return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes);
	}
};
var $folkertdev$elm_flate$LZ77$encodeWithOptions = F2(
	function (_v0, buffer) {
		var windowSize = _v0.ct;
		return A2(
			$folkertdev$elm_flate$LZ77$flush,
			windowSize,
			$folkertdev$elm_flate$Experimental$ByteArray$fromBytes(buffer));
	});
var $folkertdev$elm_flate$ByteArray$decodeByteArrayHelp = function (_v0) {
	var remaining = _v0.a;
	var accum = _v0.b;
	return (remaining >= 4) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_new) {
			var byte4 = 255 & (_new >>> 0);
			var byte3 = 255 & ((_new >> 8) >>> 0);
			var byte2 = 255 & ((_new >> 16) >>> 0);
			var byte1 = 255 & ((_new >> 24) >>> 0);
			var newAccum = A2(
				$elm$core$Array$push,
				byte4,
				A2(
					$elm$core$Array$push,
					byte3,
					A2(
						$elm$core$Array$push,
						byte2,
						A2($elm$core$Array$push, byte1, accum))));
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(remaining - 4, newAccum));
		},
		$elm$bytes$Bytes$Decode$unsignedInt32(1)) : ((remaining > 0) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_new) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(
					remaining - 1,
					A2($elm$core$Array$push, _new, accum)));
		},
		$elm$bytes$Bytes$Decode$unsignedInt8) : $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(accum)));
};
var $folkertdev$elm_flate$ByteArray$decoder = function (n) {
	return A2(
		$elm$bytes$Bytes$Decode$loop,
		_Utils_Tuple2(n, $elm$core$Array$empty),
		$folkertdev$elm_flate$ByteArray$decodeByteArrayHelp);
};
var $folkertdev$elm_flate$ByteArray$fromBytes = function (buffer) {
	var _v0 = A2(
		$elm$bytes$Bytes$Decode$decode,
		$folkertdev$elm_flate$ByteArray$decoder(
			$elm$bytes$Bytes$width(buffer)),
		buffer);
	if (_v0.$ === 1) {
		return $elm$core$Array$empty;
	} else {
		var value = _v0.a;
		return value;
	}
};
var $folkertdev$elm_flate$Deflate$Internal$compress = F2(
	function (maybeWindowSize, buf) {
		if (maybeWindowSize.$ === 1) {
			return A2(
				$elm$core$Array$push,
				$folkertdev$elm_flate$Deflate$Symbol$EndOfBlock,
				A2(
					$elm$core$Array$map,
					$folkertdev$elm_flate$Deflate$Symbol$Literal,
					$folkertdev$elm_flate$ByteArray$fromBytes(buf)));
		} else {
			var windowSize = maybeWindowSize.a;
			return A2(
				$elm$core$Array$push,
				$folkertdev$elm_flate$Deflate$Symbol$EndOfBlock,
				A2(
					$elm$core$Array$map,
					$folkertdev$elm_flate$Deflate$Internal$codeToSymbol,
					A2(
						$folkertdev$elm_flate$LZ77$encodeWithOptions,
						{ct: windowSize},
						buf)));
		}
	});
var $folkertdev$elm_flate$Deflate$BitWriter$flushIfNeeded = F3(
	function (tag, bitsWritten, encoders) {
		return (bitsWritten >= 16) ? {
			q: bitsWritten - 16,
			r: A2(
				$elm$core$List$cons,
				A2($elm$bytes$Bytes$Encode$unsignedInt16, 0, tag),
				encoders),
			x: tag >> 16
		} : {q: bitsWritten, r: encoders, x: tag};
	});
var $folkertdev$elm_flate$Deflate$BitWriter$writeBits = F3(
	function (bitwidth, bits, state) {
		return A3($folkertdev$elm_flate$Deflate$BitWriter$flushIfNeeded, state.x | (bits << state.q), state.q + bitwidth, state.r);
	});
var $folkertdev$elm_flate$Huffman$encode = F2(
	function (symbol, _v0) {
		var table = _v0;
		var _v1 = A2($elm$core$Array$get, symbol, table);
		if (_v1.$ === 1) {
			return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 0, 0);
		} else {
			var width = _v1.a.z;
			var bits = _v1.a.a;
			return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, width, bits);
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$extraLength = function (symbol) {
	if (symbol.$ === 2) {
		var length = symbol.a;
		return (((length >= 3) && (length <= 10)) || (length === 258)) ? $elm$core$Maybe$Nothing : (((length >= 11) && (length <= 18)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				1,
				A2($elm$core$Basics$modBy, 2, length - 11))) : (((length >= 19) && (length <= 34)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				2,
				A2($elm$core$Basics$modBy, 4, length - 19))) : (((length >= 35) && (length <= 66)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				3,
				A2($elm$core$Basics$modBy, 8, length - 35))) : (((length >= 67) && (length <= 130)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				4,
				A2($elm$core$Basics$modBy, 16, length - 67))) : (((length >= 131) && (length <= 257)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				5,
				A2($elm$core$Basics$modBy, 32, length - 131))) : $elm$core$Maybe$Nothing)))));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$elm_flate$Deflate$Symbol$encode = F3(
	function (symbol, htrees, bitWriter) {
		var maybeExtra = function () {
			var _v2 = $folkertdev$elm_flate$Deflate$Symbol$extraLength(symbol);
			if (_v2.$ === 1) {
				return $elm$core$Basics$identity;
			} else {
				var _v3 = _v2.a;
				var bits = _v3.a;
				var extra = _v3.b;
				return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, bits, extra);
			}
		}();
		var maybeDistance = function () {
			var _v0 = $folkertdev$elm_flate$Deflate$Symbol$distance(symbol);
			if (_v0.$ === 1) {
				return $elm$core$Basics$identity;
			} else {
				var _v1 = _v0.a;
				var code_ = _v1.a;
				var bits = _v1.b;
				var extra = _v1.c;
				return A2(
					$elm$core$Basics$composeR,
					A2($folkertdev$elm_flate$Huffman$encode, code_, htrees.V),
					(bits > 0) ? A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, bits, extra) : $elm$core$Basics$identity);
			}
		}();
		return maybeDistance(
			maybeExtra(
				A3(
					$folkertdev$elm_flate$Huffman$encode,
					$folkertdev$elm_flate$Deflate$Symbol$code(symbol),
					htrees.X,
					bitWriter)));
	});
var $folkertdev$elm_flate$Deflate$Symbol$bitwidth_code_order = _List_fromArray(
	[16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var $folkertdev$elm_flate$Deflate$Symbol$calculateCodes = function (runLengths) {
	var loop2 = F3(
		function (r, c, codes) {
			loop2:
			while (true) {
				if (c >= 3) {
					var n = A2($elm$core$Basics$min, 6, c);
					var $temp$r = r,
						$temp$c = c - n,
						$temp$codes = A2(
						$elm$core$Array$push,
						_Utils_Tuple3(16, 2, n - 3),
						codes);
					r = $temp$r;
					c = $temp$c;
					codes = $temp$codes;
					continue loop2;
				} else {
					return A2(
						$elm$core$Array$append,
						codes,
						A2(
							$elm$core$Array$repeat,
							c,
							_Utils_Tuple3(r.y, 0, 0)));
				}
			}
		});
	var loop1 = F2(
		function (c, codes) {
			loop1:
			while (true) {
				if (c >= 11) {
					var n = A2($elm$core$Basics$min, 138, c);
					var $temp$c = c - n,
						$temp$codes = A2(
						$elm$core$Array$push,
						_Utils_Tuple3(18, 7, n - 11),
						codes);
					c = $temp$c;
					codes = $temp$codes;
					continue loop1;
				} else {
					if (c >= 3) {
						return A2(
							$elm$core$Array$push,
							_Utils_Tuple3(17, 3, c - 3),
							codes);
					} else {
						return A2(
							$elm$core$Array$append,
							codes,
							A2(
								$elm$core$Array$repeat,
								c,
								_Utils_Tuple3(0, 0, 0)));
					}
				}
			}
		});
	var folder = F2(
		function (r, codes) {
			return (!r.y) ? A2(loop1, r.U, codes) : A3(
				loop2,
				r,
				r.U - 1,
				A2(
					$elm$core$Array$push,
					_Utils_Tuple3(r.y, 0, 0),
					codes));
		});
	return A3($elm$core$Array$foldl, folder, $elm$core$Array$empty, runLengths);
};
var $folkertdev$elm_flate$Huffman$getWidth = function (_v0) {
	var width = _v0.z;
	return width;
};
var $folkertdev$elm_flate$Huffman$lookup = F2(
	function (symbol, _v0) {
		var array = _v0;
		return A2($elm$core$Array$get, symbol, array);
	});
var $folkertdev$elm_flate$Deflate$Symbol$calculateRunLengths = F2(
	function (lengths, accum) {
		calculateRunLengths:
		while (true) {
			if (!lengths.b) {
				return A3($elm$core$List$foldr, $elm$core$Array$push, $elm$core$Array$empty, accum);
			} else {
				var _v1 = lengths.a;
				var e = _v1.a;
				var size = _v1.b;
				var rest = lengths.b;
				var list = A2(
					$elm$core$List$indexedMap,
					$elm$core$Tuple$pair,
					A2(
						$elm$core$List$map,
						function (x) {
							return A2(
								$elm$core$Maybe$withDefault,
								0,
								A2(
									$elm$core$Maybe$map,
									$folkertdev$elm_flate$Huffman$getWidth,
									A2($folkertdev$elm_flate$Huffman$lookup, x, e)));
						},
						A2($elm$core$List$range, 0, size - 1)));
				var folder = F2(
					function (_v3, runLengths) {
						var i = _v3.a;
						var c = _v3.b;
						if (!runLengths.b) {
							return A2(
								$elm$core$List$cons,
								{U: 1, y: c},
								runLengths);
						} else {
							var last = runLengths.a;
							var remaining = runLengths.b;
							return _Utils_eq(last.y, c) ? A2(
								$elm$core$List$cons,
								{U: last.U + 1, y: last.y},
								remaining) : A2(
								$elm$core$List$cons,
								{U: 1, y: c},
								runLengths);
						}
					});
				var $temp$lengths = rest,
					$temp$accum = A3($elm$core$List$foldl, folder, accum, list);
				lengths = $temp$lengths;
				accum = $temp$accum;
				continue calculateRunLengths;
			}
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$buildBitWidthCodes = F3(
	function (literalCodeCount, distanceCodeCount, trees) {
		var runLengths = A2(
			$folkertdev$elm_flate$Deflate$Symbol$calculateRunLengths,
			_List_fromArray(
				[
					_Utils_Tuple2(trees.X, literalCodeCount),
					_Utils_Tuple2(trees.V, distanceCodeCount)
				]),
			_List_Nil);
		return $folkertdev$elm_flate$Deflate$Symbol$calculateCodes(runLengths);
	});
var $folkertdev$elm_flate$Deflate$Symbol$positionLoop = F3(
	function (predicate, i, elements) {
		positionLoop:
		while (true) {
			if (!elements.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = elements.a;
				var xs = elements.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(i);
				} else {
					var $temp$predicate = predicate,
						$temp$i = i + 1,
						$temp$elements = xs;
					predicate = $temp$predicate;
					i = $temp$i;
					elements = $temp$elements;
					continue positionLoop;
				}
			}
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$position = F2(
	function (predicate, elements) {
		return A3($folkertdev$elm_flate$Deflate$Symbol$positionLoop, predicate, 0, elements);
	});
var $folkertdev$elm_flate$Huffman$positionFromTheEnd = F2(
	function (predicated, array) {
		var folder = F2(
			function (element, _v1) {
				var index = _v1.a;
				var accum = _v1.b;
				if (!accum.$) {
					return _Utils_Tuple2(index, accum);
				} else {
					return predicated(element) ? _Utils_Tuple2(
						index,
						$elm$core$Maybe$Just(index)) : _Utils_Tuple2(index - 1, $elm$core$Maybe$Nothing);
				}
			});
		var finalIndex = $elm$core$Array$length(array) - 1;
		return A2(
			$elm$core$Maybe$map,
			function (v) {
				return finalIndex - v;
			},
			A3(
				$elm$core$Array$foldr,
				folder,
				_Utils_Tuple2(finalIndex, $elm$core$Maybe$Nothing),
				array).b);
	});
var $folkertdev$elm_flate$Huffman$usedMaxSymbol = function (_v0) {
	var array = _v0;
	return A2(
		$elm$core$Maybe$map,
		function (trailingZeros) {
			return ($elm$core$Array$length(array) - 1) - trailingZeros;
		},
		A2(
			$folkertdev$elm_flate$Huffman$positionFromTheEnd,
			function (_v1) {
				var value = _v1;
				return value.z > 0;
			},
			array));
};
var $folkertdev$elm_flate$Deflate$Symbol$writeDynamicHuffmanCodec = F2(
	function (trees, bitWriter) {
		var literal_code_count = A2(
			$elm$core$Basics$max,
			257,
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$folkertdev$elm_flate$Huffman$usedMaxSymbol(trees.X)) + 1);
		var distance_code_count = A2(
			$elm$core$Basics$max,
			1,
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$folkertdev$elm_flate$Huffman$usedMaxSymbol(trees.V)) + 1);
		var codes = A3(
			$folkertdev$elm_flate$Deflate$Symbol$buildBitWidthCodes,
			literal_code_count,
			distance_code_count,
			{V: trees.V, X: trees.X});
		var codeCounts = A3(
			$elm$core$Array$foldl,
			function (_v2) {
				var i = _v2.a;
				return A2(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					i,
					function (v) {
						return v + 1;
					});
			},
			A2($elm$core$Array$repeat, 19, 0),
			codes);
		var bitWidthEncoder = A2($folkertdev$elm_flate$Huffman$fromFrequencies, codeCounts, 7);
		var bitwidthCodeCount = A2(
			$elm$core$Basics$max,
			4,
			A2(
				$elm$core$Maybe$withDefault,
				0,
				A2(
					$elm$core$Maybe$map,
					function (trailingZeros) {
						return 19 - trailingZeros;
					},
					A2(
						$folkertdev$elm_flate$Deflate$Symbol$position,
						function (i) {
							var _v1 = A2($folkertdev$elm_flate$Huffman$lookup, i, bitWidthEncoder);
							if (_v1.$ === 1) {
								return false;
							} else {
								var value = _v1.a;
								return $folkertdev$elm_flate$Huffman$getWidth(value) > 0;
							}
						},
						$elm$core$List$reverse($folkertdev$elm_flate$Deflate$Symbol$bitwidth_code_order)))));
		var v1 = function (writer) {
			return A3(
				$elm$core$List$foldl,
				F2(
					function (i, current) {
						var width = _Utils_eq(
							A2($elm$core$Array$get, i, codeCounts),
							$elm$core$Maybe$Just(0)) ? 0 : A2(
							$elm$core$Maybe$withDefault,
							0,
							A2(
								$elm$core$Maybe$map,
								$folkertdev$elm_flate$Huffman$getWidth,
								A2($folkertdev$elm_flate$Huffman$lookup, i, bitWidthEncoder)));
						return A3($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 3, width, current);
					}),
				writer,
				A2($elm$core$List$take, bitwidthCodeCount, $folkertdev$elm_flate$Deflate$Symbol$bitwidth_code_order));
		};
		var v2 = function (writer) {
			return A3(
				$elm$core$Array$foldl,
				F2(
					function (_v0, current) {
						var code_ = _v0.a;
						var bits = _v0.b;
						var extra = _v0.c;
						return (bits > 0) ? A3(
							$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
							bits,
							extra,
							A3($folkertdev$elm_flate$Huffman$encode, code_, bitWidthEncoder, current)) : A3($folkertdev$elm_flate$Huffman$encode, code_, bitWidthEncoder, current);
					}),
				writer,
				codes);
		};
		return v2(
			v1(
				A3(
					$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
					4,
					bitwidthCodeCount - 4,
					A3(
						$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
						5,
						distance_code_count - 1,
						A3($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 5, literal_code_count - 257, bitWriter)))));
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeCompressDynamic = F3(
	function (maybeWindowSize, buf, bitWriter) {
		var compressed = A2($folkertdev$elm_flate$Deflate$Internal$compress, maybeWindowSize, buf);
		var huffmanTree = $folkertdev$elm_flate$Deflate$Symbol$buildDynamicHuffmanCodec(compressed);
		var huffmanTreeWriter = A2($folkertdev$elm_flate$Deflate$Symbol$writeDynamicHuffmanCodec, huffmanTree, bitWriter);
		return A3(
			$elm$core$Array$foldl,
			F2(
				function (symbol, first) {
					return A3($folkertdev$elm_flate$Deflate$Symbol$encode, symbol, huffmanTree, first);
				}),
			huffmanTreeWriter,
			compressed);
	});
var $folkertdev$elm_flate$Deflate$BitWriter$flushLoop = F3(
	function (tag, bitsWritten, encoders) {
		flushLoop:
		while (true) {
			if (bitsWritten > 0) {
				var $temp$tag = tag >> 8,
					$temp$bitsWritten = A2($elm$core$Basics$max, 0, bitsWritten - 8),
					$temp$encoders = A2(
					$elm$core$List$cons,
					$elm$bytes$Bytes$Encode$unsignedInt8(tag),
					encoders);
				tag = $temp$tag;
				bitsWritten = $temp$bitsWritten;
				encoders = $temp$encoders;
				continue flushLoop;
			} else {
				return {q: bitsWritten, r: encoders, x: tag};
			}
		}
	});
var $folkertdev$elm_flate$Deflate$BitWriter$flush = function (state) {
	return A3($folkertdev$elm_flate$Deflate$BitWriter$flushLoop, state.x, state.q, state.r);
};
var $folkertdev$elm_flate$Deflate$BitWriter$writeBit = function (b) {
	if (!b) {
		return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 1, 0);
	} else {
		return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 1, 1);
	}
};
var $folkertdev$elm_flate$Deflate$Internal$encodeDynamicBlock = F3(
	function (windowSize, _v0, bitWriter) {
		var isLastBlock = _v0.a;
		var buffer = _v0.b;
		return $folkertdev$elm_flate$Deflate$BitWriter$flush(
			A3(
				$folkertdev$elm_flate$Deflate$Internal$encodeCompressDynamic,
				windowSize,
				buffer,
				A3(
					$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
					2,
					2,
					A2($folkertdev$elm_flate$Deflate$BitWriter$writeBit, isLastBlock, bitWriter))));
	});
var $folkertdev$elm_flate$Deflate$BitWriter$run = function (state) {
	return $elm$core$List$reverse(state.r);
};
var $folkertdev$elm_flate$Deflate$Internal$encodeDynamic = F2(
	function (windowSize, buffer) {
		var encodedChunks = A2(
			$elm$core$List$map,
			$folkertdev$elm_flate$Deflate$Internal$encodeDynamicBlock(windowSize),
			A2($folkertdev$elm_flate$Deflate$Internal$chunks, $folkertdev$elm_flate$Deflate$Internal$default_block_size, buffer));
		return $elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(
				$folkertdev$elm_flate$Deflate$BitWriter$run(
					A3(
						$elm$core$List$foldl,
						F2(
							function (chunk, first) {
								return chunk(first);
							}),
						$folkertdev$elm_flate$Deflate$BitWriter$empty,
						encodedChunks))));
	});
var $folkertdev$elm_flate$Deflate$Internal$max_non_compressed_block_size = 65535;
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (!node.$) {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						f: _List_Nil,
						b: 0,
						e: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (!_v0.$) {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (!_v0.$) {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $folkertdev$elm_flate$ByteArray$fasterEncodeFolderR = F2(
	function (_byte, _v0) {
		var bytesOnAccum = _v0.a;
		var accum = _v0.b;
		var encoders = _v0.c;
		switch (bytesOnAccum) {
			case 0:
				var value = 255 & _byte;
				return _Utils_Tuple3(1, value, encoders);
			case 1:
				var value = accum | ((255 & _byte) << 8);
				return _Utils_Tuple3(2, value, encoders);
			case 2:
				var value = accum | ((255 & _byte) << 16);
				return _Utils_Tuple3(3, value, encoders);
			default:
				var value = accum | ((255 & _byte) << 24);
				return _Utils_Tuple3(
					0,
					0,
					A2(
						$elm$core$List$cons,
						A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, value),
						encoders));
		}
	});
var $folkertdev$elm_flate$ByteArray$fasterEncodeR = function (_v0) {
	var bytesOnAccum = _v0.a;
	var accum = _v0.b;
	var otherEncoders = _v0.c;
	var encoders = function () {
		switch (bytesOnAccum) {
			case 0:
				return otherEncoders;
			case 1:
				return A2(
					$elm$core$List$cons,
					$elm$bytes$Bytes$Encode$unsignedInt8(accum),
					otherEncoders);
			case 2:
				return A2(
					$elm$core$List$cons,
					A2($elm$bytes$Bytes$Encode$unsignedInt16, 1, accum),
					otherEncoders);
			default:
				var otherBytes = accum >> 8;
				var firstByte = 255 & accum;
				return A2(
					$elm$core$List$cons,
					A2($elm$bytes$Bytes$Encode$unsignedInt16, 1, otherBytes),
					A2(
						$elm$core$List$cons,
						$elm$bytes$Bytes$Encode$unsignedInt8(firstByte),
						otherEncoders));
		}
	}();
	return encoders;
};
var $folkertdev$elm_flate$ByteArray$toBytes = function (array) {
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			$folkertdev$elm_flate$ByteArray$fasterEncodeR(
				A3(
					$elm$core$Array$foldr,
					$folkertdev$elm_flate$ByteArray$fasterEncodeFolderR,
					_Utils_Tuple3(0, 0, _List_Nil),
					array))));
};
var $folkertdev$elm_flate$Deflate$BitWriter$writeEncoder = F2(
	function (encoder, state) {
		return {
			q: state.q,
			r: A2($elm$core$List$cons, encoder, state.r),
			x: state.x
		};
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeRawBlock = F2(
	function (_v0, bitWriter) {
		var isLastBlock = _v0.a;
		var buffer = _v0.b;
		var byteArray = $folkertdev$elm_flate$ByteArray$fromBytes(buffer);
		var size = A2(
			$elm$core$Basics$min,
			$elm$core$Array$length(byteArray),
			$folkertdev$elm_flate$Deflate$Internal$max_non_compressed_block_size);
		var sliced = A3($elm$core$Array$slice, 0, size, byteArray);
		return A2(
			$folkertdev$elm_flate$Deflate$BitWriter$writeEncoder,
			$elm$bytes$Bytes$Encode$bytes(
				$folkertdev$elm_flate$ByteArray$toBytes(sliced)),
			A2(
				$folkertdev$elm_flate$Deflate$BitWriter$writeEncoder,
				A2($elm$bytes$Bytes$Encode$unsignedInt16, 0, ~size),
				A2(
					$folkertdev$elm_flate$Deflate$BitWriter$writeEncoder,
					A2($elm$bytes$Bytes$Encode$unsignedInt16, 0, size),
					$folkertdev$elm_flate$Deflate$BitWriter$flush(
						A3(
							$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
							2,
							0,
							A2($folkertdev$elm_flate$Deflate$BitWriter$writeBit, isLastBlock, bitWriter))))));
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeRaw = function (buffer) {
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			$folkertdev$elm_flate$Deflate$BitWriter$run(
				A3(
					$elm$core$List$foldl,
					F2(
						function (chunk, first) {
							return A2($folkertdev$elm_flate$Deflate$Internal$encodeRawBlock, chunk, first);
						}),
					$folkertdev$elm_flate$Deflate$BitWriter$empty,
					A2(
						$folkertdev$elm_flate$Deflate$Internal$chunks,
						A2($elm$core$Basics$min, $folkertdev$elm_flate$Deflate$Internal$max_non_compressed_block_size, $folkertdev$elm_flate$Deflate$Internal$default_block_size),
						buffer)))));
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $folkertdev$elm_flate$Huffman$fromList = A2(
	$elm$core$Basics$composeL,
	A2($elm$core$Basics$composeL, $elm$core$Basics$identity, $elm$core$Array$fromList),
	$elm$core$List$map($folkertdev$elm_flate$Huffman$codeFromRecord));
var $folkertdev$elm_flate$Huffman$hardcodedStaticHuffmanTree = {
	V: $folkertdev$elm_flate$Huffman$fromList(
		_List_fromArray(
			[
				{a: 0, z: 5},
				{a: 16, z: 5},
				{a: 8, z: 5},
				{a: 24, z: 5},
				{a: 4, z: 5},
				{a: 20, z: 5},
				{a: 12, z: 5},
				{a: 28, z: 5},
				{a: 2, z: 5},
				{a: 18, z: 5},
				{a: 10, z: 5},
				{a: 26, z: 5},
				{a: 6, z: 5},
				{a: 22, z: 5},
				{a: 14, z: 5},
				{a: 30, z: 5},
				{a: 1, z: 5},
				{a: 17, z: 5},
				{a: 9, z: 5},
				{a: 25, z: 5},
				{a: 5, z: 5},
				{a: 21, z: 5},
				{a: 13, z: 5},
				{a: 29, z: 5},
				{a: 3, z: 5},
				{a: 19, z: 5},
				{a: 11, z: 5},
				{a: 27, z: 5},
				{a: 7, z: 5},
				{a: 23, z: 5}
			])),
	X: $folkertdev$elm_flate$Huffman$fromList(
		_List_fromArray(
			[
				{a: 12, z: 8},
				{a: 140, z: 8},
				{a: 76, z: 8},
				{a: 204, z: 8},
				{a: 44, z: 8},
				{a: 172, z: 8},
				{a: 108, z: 8},
				{a: 236, z: 8},
				{a: 28, z: 8},
				{a: 156, z: 8},
				{a: 92, z: 8},
				{a: 220, z: 8},
				{a: 60, z: 8},
				{a: 188, z: 8},
				{a: 124, z: 8},
				{a: 252, z: 8},
				{a: 2, z: 8},
				{a: 130, z: 8},
				{a: 66, z: 8},
				{a: 194, z: 8},
				{a: 34, z: 8},
				{a: 162, z: 8},
				{a: 98, z: 8},
				{a: 226, z: 8},
				{a: 18, z: 8},
				{a: 146, z: 8},
				{a: 82, z: 8},
				{a: 210, z: 8},
				{a: 50, z: 8},
				{a: 178, z: 8},
				{a: 114, z: 8},
				{a: 242, z: 8},
				{a: 10, z: 8},
				{a: 138, z: 8},
				{a: 74, z: 8},
				{a: 202, z: 8},
				{a: 42, z: 8},
				{a: 170, z: 8},
				{a: 106, z: 8},
				{a: 234, z: 8},
				{a: 26, z: 8},
				{a: 154, z: 8},
				{a: 90, z: 8},
				{a: 218, z: 8},
				{a: 58, z: 8},
				{a: 186, z: 8},
				{a: 122, z: 8},
				{a: 250, z: 8},
				{a: 6, z: 8},
				{a: 134, z: 8},
				{a: 70, z: 8},
				{a: 198, z: 8},
				{a: 38, z: 8},
				{a: 166, z: 8},
				{a: 102, z: 8},
				{a: 230, z: 8},
				{a: 22, z: 8},
				{a: 150, z: 8},
				{a: 86, z: 8},
				{a: 214, z: 8},
				{a: 54, z: 8},
				{a: 182, z: 8},
				{a: 118, z: 8},
				{a: 246, z: 8},
				{a: 14, z: 8},
				{a: 142, z: 8},
				{a: 78, z: 8},
				{a: 206, z: 8},
				{a: 46, z: 8},
				{a: 174, z: 8},
				{a: 110, z: 8},
				{a: 238, z: 8},
				{a: 30, z: 8},
				{a: 158, z: 8},
				{a: 94, z: 8},
				{a: 222, z: 8},
				{a: 62, z: 8},
				{a: 190, z: 8},
				{a: 126, z: 8},
				{a: 254, z: 8},
				{a: 1, z: 8},
				{a: 129, z: 8},
				{a: 65, z: 8},
				{a: 193, z: 8},
				{a: 33, z: 8},
				{a: 161, z: 8},
				{a: 97, z: 8},
				{a: 225, z: 8},
				{a: 17, z: 8},
				{a: 145, z: 8},
				{a: 81, z: 8},
				{a: 209, z: 8},
				{a: 49, z: 8},
				{a: 177, z: 8},
				{a: 113, z: 8},
				{a: 241, z: 8},
				{a: 9, z: 8},
				{a: 137, z: 8},
				{a: 73, z: 8},
				{a: 201, z: 8},
				{a: 41, z: 8},
				{a: 169, z: 8},
				{a: 105, z: 8},
				{a: 233, z: 8},
				{a: 25, z: 8},
				{a: 153, z: 8},
				{a: 89, z: 8},
				{a: 217, z: 8},
				{a: 57, z: 8},
				{a: 185, z: 8},
				{a: 121, z: 8},
				{a: 249, z: 8},
				{a: 5, z: 8},
				{a: 133, z: 8},
				{a: 69, z: 8},
				{a: 197, z: 8},
				{a: 37, z: 8},
				{a: 165, z: 8},
				{a: 101, z: 8},
				{a: 229, z: 8},
				{a: 21, z: 8},
				{a: 149, z: 8},
				{a: 85, z: 8},
				{a: 213, z: 8},
				{a: 53, z: 8},
				{a: 181, z: 8},
				{a: 117, z: 8},
				{a: 245, z: 8},
				{a: 13, z: 8},
				{a: 141, z: 8},
				{a: 77, z: 8},
				{a: 205, z: 8},
				{a: 45, z: 8},
				{a: 173, z: 8},
				{a: 109, z: 8},
				{a: 237, z: 8},
				{a: 29, z: 8},
				{a: 157, z: 8},
				{a: 93, z: 8},
				{a: 221, z: 8},
				{a: 61, z: 8},
				{a: 189, z: 8},
				{a: 125, z: 8},
				{a: 253, z: 8},
				{a: 19, z: 9},
				{a: 275, z: 9},
				{a: 147, z: 9},
				{a: 403, z: 9},
				{a: 83, z: 9},
				{a: 339, z: 9},
				{a: 211, z: 9},
				{a: 467, z: 9},
				{a: 51, z: 9},
				{a: 307, z: 9},
				{a: 179, z: 9},
				{a: 435, z: 9},
				{a: 115, z: 9},
				{a: 371, z: 9},
				{a: 243, z: 9},
				{a: 499, z: 9},
				{a: 11, z: 9},
				{a: 267, z: 9},
				{a: 139, z: 9},
				{a: 395, z: 9},
				{a: 75, z: 9},
				{a: 331, z: 9},
				{a: 203, z: 9},
				{a: 459, z: 9},
				{a: 43, z: 9},
				{a: 299, z: 9},
				{a: 171, z: 9},
				{a: 427, z: 9},
				{a: 107, z: 9},
				{a: 363, z: 9},
				{a: 235, z: 9},
				{a: 491, z: 9},
				{a: 27, z: 9},
				{a: 283, z: 9},
				{a: 155, z: 9},
				{a: 411, z: 9},
				{a: 91, z: 9},
				{a: 347, z: 9},
				{a: 219, z: 9},
				{a: 475, z: 9},
				{a: 59, z: 9},
				{a: 315, z: 9},
				{a: 187, z: 9},
				{a: 443, z: 9},
				{a: 123, z: 9},
				{a: 379, z: 9},
				{a: 251, z: 9},
				{a: 507, z: 9},
				{a: 7, z: 9},
				{a: 263, z: 9},
				{a: 135, z: 9},
				{a: 391, z: 9},
				{a: 71, z: 9},
				{a: 327, z: 9},
				{a: 199, z: 9},
				{a: 455, z: 9},
				{a: 39, z: 9},
				{a: 295, z: 9},
				{a: 167, z: 9},
				{a: 423, z: 9},
				{a: 103, z: 9},
				{a: 359, z: 9},
				{a: 231, z: 9},
				{a: 487, z: 9},
				{a: 23, z: 9},
				{a: 279, z: 9},
				{a: 151, z: 9},
				{a: 407, z: 9},
				{a: 87, z: 9},
				{a: 343, z: 9},
				{a: 215, z: 9},
				{a: 471, z: 9},
				{a: 55, z: 9},
				{a: 311, z: 9},
				{a: 183, z: 9},
				{a: 439, z: 9},
				{a: 119, z: 9},
				{a: 375, z: 9},
				{a: 247, z: 9},
				{a: 503, z: 9},
				{a: 15, z: 9},
				{a: 271, z: 9},
				{a: 143, z: 9},
				{a: 399, z: 9},
				{a: 79, z: 9},
				{a: 335, z: 9},
				{a: 207, z: 9},
				{a: 463, z: 9},
				{a: 47, z: 9},
				{a: 303, z: 9},
				{a: 175, z: 9},
				{a: 431, z: 9},
				{a: 111, z: 9},
				{a: 367, z: 9},
				{a: 239, z: 9},
				{a: 495, z: 9},
				{a: 31, z: 9},
				{a: 287, z: 9},
				{a: 159, z: 9},
				{a: 415, z: 9},
				{a: 95, z: 9},
				{a: 351, z: 9},
				{a: 223, z: 9},
				{a: 479, z: 9},
				{a: 63, z: 9},
				{a: 319, z: 9},
				{a: 191, z: 9},
				{a: 447, z: 9},
				{a: 127, z: 9},
				{a: 383, z: 9},
				{a: 255, z: 9},
				{a: 511, z: 9},
				{a: 0, z: 7},
				{a: 64, z: 7},
				{a: 32, z: 7},
				{a: 96, z: 7},
				{a: 16, z: 7},
				{a: 80, z: 7},
				{a: 48, z: 7},
				{a: 112, z: 7},
				{a: 8, z: 7},
				{a: 72, z: 7},
				{a: 40, z: 7},
				{a: 104, z: 7},
				{a: 24, z: 7},
				{a: 88, z: 7},
				{a: 56, z: 7},
				{a: 120, z: 7},
				{a: 4, z: 7},
				{a: 68, z: 7},
				{a: 36, z: 7},
				{a: 100, z: 7},
				{a: 20, z: 7},
				{a: 84, z: 7},
				{a: 52, z: 7},
				{a: 116, z: 7},
				{a: 3, z: 8},
				{a: 131, z: 8},
				{a: 67, z: 8},
				{a: 195, z: 8},
				{a: 35, z: 8},
				{a: 163, z: 8},
				{a: 99, z: 8},
				{a: 227, z: 8}
			]))
};
var $folkertdev$elm_flate$Deflate$Internal$encodeCompressStatic = F3(
	function (maybeWindowSize, buf, bitWriter) {
		var huffmanTrees = $folkertdev$elm_flate$Huffman$hardcodedStaticHuffmanTree;
		var compressed = A2($folkertdev$elm_flate$Deflate$Internal$compress, maybeWindowSize, buf);
		return A3(
			$elm$core$Array$foldl,
			F2(
				function (symbol, first) {
					return A3($folkertdev$elm_flate$Deflate$Symbol$encode, symbol, huffmanTrees, first);
				}),
			bitWriter,
			compressed);
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeStaticBlock = F3(
	function (windowSize, _v0, bitWriter) {
		var isLastBlock = _v0.a;
		var buffer = _v0.b;
		return $folkertdev$elm_flate$Deflate$BitWriter$flush(
			A3(
				$folkertdev$elm_flate$Deflate$Internal$encodeCompressStatic,
				windowSize,
				buffer,
				A3(
					$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
					2,
					1,
					A2($folkertdev$elm_flate$Deflate$BitWriter$writeBit, isLastBlock, bitWriter))));
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeStatic = F2(
	function (windowSize, buffer) {
		return $elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(
				$folkertdev$elm_flate$Deflate$BitWriter$run(
					A3(
						$elm$core$List$foldl,
						F2(
							function (chunk, first) {
								return A3($folkertdev$elm_flate$Deflate$Internal$encodeStaticBlock, windowSize, chunk, first);
							}),
						$folkertdev$elm_flate$Deflate$BitWriter$empty,
						A2($folkertdev$elm_flate$Deflate$Internal$chunks, $folkertdev$elm_flate$Deflate$Internal$default_block_size, buffer)))));
	});
var $folkertdev$elm_flate$Flate$deflateWithOptions = F2(
	function (encoding, buffer) {
		switch (encoding.$) {
			case 0:
				return $folkertdev$elm_flate$Deflate$Internal$encodeRaw(buffer);
			case 2:
				if (!encoding.a.$) {
					var _v1 = encoding.a;
					return A2($folkertdev$elm_flate$Deflate$Internal$encodeStatic, $elm$core$Maybe$Nothing, buffer);
				} else {
					var w = encoding.a.a;
					return A2(
						$folkertdev$elm_flate$Deflate$Internal$encodeStatic,
						$elm$core$Maybe$Just(w),
						buffer);
				}
			default:
				if (!encoding.a.$) {
					var _v2 = encoding.a;
					return A2($folkertdev$elm_flate$Deflate$Internal$encodeDynamic, $elm$core$Maybe$Nothing, buffer);
				} else {
					var w = encoding.a.a;
					return A2(
						$folkertdev$elm_flate$Deflate$Internal$encodeDynamic,
						$elm$core$Maybe$Just(w),
						buffer);
				}
		}
	});
var $elm$core$Basics$pow = _Basics_pow;
var $folkertdev$elm_flate$Flate$deflateZlibWithOptions = F2(
	function (encoding, buffer) {
		var windowSizeHelp = function (size) {
			var kb = 1024;
			return (size <= 256) ? 0 : ((size <= 512) ? 1 : ((_Utils_cmp(size, 1 * kb) < 1) ? 2 : ((_Utils_cmp(size, 2 * kb) < 1) ? 3 : ((_Utils_cmp(size, 4 * kb) < 1) ? 4 : ((_Utils_cmp(size, 8 * kb) < 1) ? 5 : ((_Utils_cmp(size, 16 * kb) < 1) ? 6 : ((_Utils_cmp(size, 32 * kb) < 1) ? 7 : 0)))))));
		};
		var windowSize = function () {
			switch (encoding.$) {
				case 0:
					return 0;
				case 2:
					if (!encoding.a.$) {
						var _v1 = encoding.a;
						return 0;
					} else {
						var size = encoding.a.a;
						return windowSizeHelp(size);
					}
				default:
					if (!encoding.a.$) {
						var _v2 = encoding.a;
						return 0;
					} else {
						var size = encoding.a.a;
						return windowSizeHelp(size);
					}
			}
		}();
		var mask16 = function (value) {
			return value & (A2($elm$core$Basics$pow, 2, 16) - 1);
		};
		var encodedTrailer = _List_fromArray(
			[
				A2(
				$elm$bytes$Bytes$Encode$unsignedInt32,
				1,
				$folkertdev$elm_flate$Checksum$Adler32$adler32(buffer))
			]);
		var data = A2($folkertdev$elm_flate$Flate$deflateWithOptions, encoding, buffer);
		var compressionLevel = 2;
		var cmf = (windowSize << 4) | 8;
		var check = (cmf << 8) + (compressionLevel << 6);
		var flag = (!(!A2($elm$core$Basics$modBy, 31, check))) ? ((compressionLevel << 6) + (31 - A2($elm$core$Basics$modBy, 31, check))) : (compressionLevel << 6);
		var encodedHeader = _List_fromArray(
			[
				$elm$bytes$Bytes$Encode$unsignedInt8(cmf),
				$elm$bytes$Bytes$Encode$unsignedInt8(flag)
			]);
		return $elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(
				_Utils_ap(
					encodedHeader,
					_Utils_ap(
						_List_fromArray(
							[
								$elm$bytes$Bytes$Encode$bytes(data)
							]),
						encodedTrailer))));
	});
var $folkertdev$elm_flate$LZ77$max_distance = 32768;
var $folkertdev$elm_flate$LZ77$maxWindowSize = $folkertdev$elm_flate$LZ77$max_distance;
var $folkertdev$elm_flate$Flate$deflateZlib = $folkertdev$elm_flate$Flate$deflateZlibWithOptions(
	$folkertdev$elm_flate$Flate$Dynamic(
		$folkertdev$elm_flate$Flate$WithWindowSize($folkertdev$elm_flate$LZ77$maxWindowSize)));
var $justgook$elm_image$Image$Internal$PNG$packIntoInt32 = F4(
	function (r, g, b, a) {
		return (((255 & r) << 24) | ((255 & g) << 16)) | (((255 & b) << 8) | (255 & a));
	});
var $justgook$elm_image$Image$Internal$PNG$encodePixel32 = F2(
	function (px, prev) {
		var r = px >>> 24;
		var prevR = prev >>> 24;
		var prevG = 255 & (prev >> 16);
		var prevB = 255 & (prev >> 8);
		var prevA = 255 & prev;
		var g = 255 & (px >> 16);
		var b = 255 & (px >> 8);
		var a = 255 & px;
		return A2(
			$elm$bytes$Bytes$Encode$unsignedInt32,
			1,
			A4($justgook$elm_image$Image$Internal$PNG$packIntoInt32, r - prevR, g - prevG, b - prevB, a - prevA));
	});
var $justgook$elm_image$Image$Internal$PNG$encodeIDAT = F2(
	function (_v0, arr) {
		var order = _v0.bw;
		var scanLineFilter = $elm$bytes$Bytes$Encode$unsignedInt8(1);
		var _v1 = function () {
			switch (order) {
				case 0:
					return _Utils_Tuple2($elm$core$Array$foldl, $elm$core$Array$foldl);
				case 1:
					return _Utils_Tuple2($elm$core$Array$foldr, $elm$core$Array$foldl);
				case 2:
					return _Utils_Tuple2($elm$core$Array$foldl, $elm$core$Array$foldr);
				default:
					return _Utils_Tuple2($elm$core$Array$foldr, $elm$core$Array$foldr);
			}
		}();
		var fold1 = _v1.a;
		var fold2 = _v1.b;
		return A3(
			$elm$core$Basics$composeR,
			$elm$bytes$Bytes$Encode$encode,
			A2($elm$core$Basics$composeR, $folkertdev$elm_flate$Flate$deflateZlib, $elm$bytes$Bytes$Encode$bytes),
			A3(
				fold1,
				F2(
					function (sArr, acc) {
						return function (_v4) {
							var line = _v4.b;
							return $elm$bytes$Bytes$Encode$sequence(
								_List_fromArray(
									[acc, line]));
						}(
							A3(
								fold2,
								F2(
									function (px, _v3) {
										var prev = _v3.a;
										var acc2 = _v3.b;
										var packed = A2($justgook$elm_image$Image$Internal$PNG$encodePixel32, px, prev);
										return _Utils_Tuple2(
											px,
											$elm$bytes$Bytes$Encode$sequence(
												_List_fromArray(
													[acc2, packed])));
									}),
								_Utils_Tuple2(0, scanLineFilter),
								sArr));
					}),
				$elm$bytes$Bytes$Encode$sequence(_List_Nil),
				arr));
	});
var $justgook$elm_image$Image$Internal$PNG$encodeIHDR = F3(
	function (width, height, _v0) {
		var format = _v0.bd;
		var interlace = 0;
		var _v1 = function () {
			switch (format) {
				case 0:
					return _Utils_Tuple2(8, 6);
				case 1:
					return _Utils_Tuple2(8, 2);
				case 2:
					return _Utils_Tuple2(16, 0);
				default:
					return _Utils_Tuple2(8, 0);
			}
		}();
		var depth = _v1.a;
		var color = _v1.b;
		return $elm$bytes$Bytes$Encode$sequence(
			_List_fromArray(
				[
					A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, width),
					A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, height),
					$elm$bytes$Bytes$Encode$unsignedInt8(depth),
					$elm$bytes$Bytes$Encode$unsignedInt8(color),
					$elm$bytes$Bytes$Encode$unsignedInt8(0),
					$elm$bytes$Bytes$Encode$unsignedInt8(0),
					$elm$bytes$Bytes$Encode$unsignedInt8(interlace)
				]));
	});
var $justgook$elm_image$Image$Internal$PNG$encodeSignature = $elm$bytes$Bytes$Encode$sequence(
	_List_fromArray(
		[
			$elm$bytes$Bytes$Encode$unsignedInt8(137),
			$elm$bytes$Bytes$Encode$unsignedInt8(80),
			$elm$bytes$Bytes$Encode$unsignedInt8(78),
			$elm$bytes$Bytes$Encode$unsignedInt8(71),
			$elm$bytes$Bytes$Encode$unsignedInt8(13),
			$elm$bytes$Bytes$Encode$unsignedInt8(10),
			$elm$bytes$Bytes$Encode$unsignedInt8(26),
			$elm$bytes$Bytes$Encode$unsignedInt8(10)
		]));
var $justgook$elm_image$Image$Info$dimensions = function (meta) {
	switch (meta.$) {
		case 0:
			var width = meta.a.z;
			var height = meta.a.C;
			return {C: height, z: width};
		case 1:
			var width = meta.a.z;
			var height = meta.a.C;
			return {C: height, z: width};
		case 2:
			var width = meta.a.z;
			var height = meta.a.C;
			return {C: height, z: width};
		default:
			var width = meta.a.z;
			var height = meta.a.C;
			return {C: height, z: width};
	}
};
var $justgook$elm_image$Image$Internal$ImageData$splitAt = F2(
	function (index, xs) {
		var len = $elm$core$Array$length(xs);
		var _v0 = _Utils_Tuple2(
			index > 0,
			_Utils_cmp(index, len) < 0);
		if (_v0.a) {
			if (_v0.b) {
				return _Utils_Tuple2(
					A3($elm$core$Array$slice, 0, index, xs),
					A3($elm$core$Array$slice, index, len, xs));
			} else {
				return _Utils_Tuple2(xs, $elm$core$Array$empty);
			}
		} else {
			if (_v0.b) {
				return _Utils_Tuple2($elm$core$Array$empty, xs);
			} else {
				return _Utils_Tuple2($elm$core$Array$empty, $elm$core$Array$empty);
			}
		}
	});
var $justgook$elm_image$Image$Internal$ImageData$fromArray = F3(
	function (w, arr, acc) {
		fromArray:
		while (true) {
			if (_Utils_cmp(
				$elm$core$Array$length(arr),
				w) > 0) {
				var _v0 = A2($justgook$elm_image$Image$Internal$ImageData$splitAt, w, arr);
				var a1 = _v0.a;
				var a2 = _v0.b;
				var $temp$w = w,
					$temp$arr = a2,
					$temp$acc = A2($elm$core$Array$push, a1, acc);
				w = $temp$w;
				arr = $temp$arr;
				acc = $temp$acc;
				continue fromArray;
			} else {
				return A2($elm$core$Array$push, arr, acc);
			}
		}
	});
var $justgook$elm_image$Image$Internal$ImageData$applyIf = F3(
	function (bool, f, a) {
		return bool ? f(a) : a;
	});
var $justgook$elm_image$Image$Internal$Array2D$lastIndex_ = function (arr) {
	return $elm$core$Array$length(arr) - 1;
};
var $justgook$elm_image$Image$Internal$Array2D$lastLength = function (arr) {
	return A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$core$Maybe$map,
			$elm$core$Array$length,
			A2(
				$elm$core$Array$get,
				$justgook$elm_image$Image$Internal$Array2D$lastIndex_(arr),
				arr)));
};
var $justgook$elm_image$Image$Internal$Array2D$push = F2(
	function (item, arr) {
		return A2(
			$elm$core$Maybe$withDefault,
			arr,
			A2(
				$elm$core$Maybe$map,
				function (arr2) {
					return A3(
						$elm$core$Array$set,
						$justgook$elm_image$Image$Internal$Array2D$lastIndex_(arr),
						A2($elm$core$Array$push, item, arr2),
						arr);
				},
				A2(
					$elm$core$Array$get,
					$justgook$elm_image$Image$Internal$Array2D$lastIndex_(arr),
					arr)));
	});
var $justgook$elm_image$Image$Internal$ImageData$fromList = F3(
	function (w, l, acc) {
		fromList:
		while (true) {
			if (l.b) {
				var a = l.a;
				var rest = l.b;
				var newAcc = A3(
					$justgook$elm_image$Image$Internal$ImageData$applyIf,
					_Utils_cmp(
						$justgook$elm_image$Image$Internal$Array2D$lastLength(acc),
						w) > -1,
					$elm$core$Array$push($elm$core$Array$empty),
					acc);
				var $temp$w = w,
					$temp$l = rest,
					$temp$acc = A2($justgook$elm_image$Image$Internal$Array2D$push, a, newAcc);
				w = $temp$w;
				l = $temp$l;
				acc = $temp$acc;
				continue fromList;
			} else {
				return acc;
			}
		}
	});
var $justgook$elm_image$Image$Internal$ImageData$toArray2d = function (image) {
	toArray2d:
	while (true) {
		switch (image.$) {
			case 0:
				var meta = image.a;
				var l = image.b;
				return A3(
					$justgook$elm_image$Image$Internal$ImageData$fromList,
					$justgook$elm_image$Image$Info$dimensions(meta).z,
					l,
					$elm$core$Array$fromList(
						_List_fromArray(
							[$elm$core$Array$empty])));
			case 1:
				var l = image.b;
				return A3(
					$elm$core$List$foldl,
					A2($elm$core$Basics$composeR, $elm$core$Array$fromList, $elm$core$Array$push),
					$elm$core$Array$empty,
					l);
			case 2:
				var meta = image.a;
				var arr = image.b;
				return A3(
					$justgook$elm_image$Image$Internal$ImageData$fromArray,
					$justgook$elm_image$Image$Info$dimensions(meta).z,
					arr,
					$elm$core$Array$empty);
			case 3:
				var arr = image.b;
				return arr;
			default:
				var d = image.b;
				var b = image.c;
				var _v1 = A2($elm$bytes$Bytes$Decode$decode, d, b);
				if (!_v1.$) {
					if (_v1.a.$ === 4) {
						var _v2 = _v1.a;
						return $elm$core$Array$empty;
					} else {
						var newData = _v1.a;
						var $temp$image = newData;
						image = $temp$image;
						continue toArray2d;
					}
				} else {
					return $elm$core$Array$empty;
				}
		}
	}
};
var $justgook$elm_image$Image$Internal$PNG$encode = function (imgData) {
	var opt = $justgook$elm_image$Image$Internal$ImageData$defaultOptions;
	var chunkIEND = A2(
		$justgook$elm_image$Image$Internal$PNG$encodeChunk,
		1229278788,
		$elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(_List_Nil)));
	var arr = $justgook$elm_image$Image$Internal$ImageData$toArray2d(imgData);
	var chunkIDAT = A2(
		$justgook$elm_image$Image$Internal$PNG$encodeChunk,
		1229209940,
		$elm$bytes$Bytes$Encode$encode(
			A2($justgook$elm_image$Image$Internal$PNG$encodeIDAT, opt, arr)));
	var height = $elm$core$Array$length(arr);
	var width = A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$core$Maybe$map,
			$elm$core$Array$length,
			A2($elm$core$Array$get, 0, arr)));
	var chunkIHDR = A2(
		$justgook$elm_image$Image$Internal$PNG$encodeChunk,
		1229472850,
		$elm$bytes$Bytes$Encode$encode(
			A3($justgook$elm_image$Image$Internal$PNG$encodeIHDR, width, height, opt)));
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			_List_fromArray(
				[$justgook$elm_image$Image$Internal$PNG$encodeSignature, chunkIHDR, chunkIDAT, chunkIEND])));
};
var $justgook$elm_image$Image$Internal$ImageData$Array = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $justgook$elm_image$Image$Internal$ImageData$Array2d = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $justgook$elm_image$Image$Internal$ImageData$Bytes = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $justgook$elm_image$Image$Internal$ImageData$List2d = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $justgook$elm_image$Image$Internal$ImageData$map = F2(
	function (fn, image) {
		map:
		while (true) {
			switch (image.$) {
				case 0:
					var meta = image.a;
					var l = image.b;
					return A2(
						$justgook$elm_image$Image$Internal$ImageData$List,
						meta,
						A2($elm$core$List$map, fn, l));
				case 1:
					var meta = image.a;
					var l = image.b;
					return A2(
						$justgook$elm_image$Image$Internal$ImageData$List2d,
						meta,
						A2(
							$elm$core$List$map,
							$elm$core$List$map(fn),
							l));
				case 2:
					var meta = image.a;
					var arr = image.b;
					return A2(
						$justgook$elm_image$Image$Internal$ImageData$Array,
						meta,
						A2($elm$core$Array$map, fn, arr));
				case 3:
					var meta = image.a;
					var arr = image.b;
					return A2(
						$justgook$elm_image$Image$Internal$ImageData$Array2d,
						meta,
						A2(
							$elm$core$Array$map,
							$elm$core$Array$map(fn),
							arr));
				default:
					var meta = image.a;
					var d = image.b;
					var b = image.c;
					var _v1 = A2($elm$bytes$Bytes$Decode$decode, d, b);
					if (!_v1.$) {
						if (_v1.a.$ === 4) {
							var _v2 = _v1.a;
							return A3($justgook$elm_image$Image$Internal$ImageData$Bytes, meta, d, b);
						} else {
							var newData = _v1.a;
							var $temp$fn = fn,
								$temp$image = newData;
							fn = $temp$fn;
							image = $temp$image;
							continue map;
						}
					} else {
						return A3($justgook$elm_image$Image$Internal$ImageData$Bytes, meta, d, b);
					}
			}
		}
	});
var $justgook$elm_image$Image$Internal$Pixel$addChannel = $justgook$elm_image$Image$Internal$ImageData$map(
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Bitwise$shiftLeftBy(8),
		$elm$core$Basics$add(255)));
var $justgook$elm_image$Image$Internal$ImageData$getInfo = function (image) {
	switch (image.$) {
		case 4:
			var meta = image.a;
			return meta;
		case 3:
			var meta = image.a;
			return meta;
		case 1:
			var meta = image.a;
			return meta;
		case 2:
			var meta = image.a;
			return meta;
		default:
			var meta = image.a;
			return meta;
	}
};
var $justgook$elm_image$Image$Internal$Pixel$px8AlphaTo32 = function (px_) {
	var px = px_ >>> 8;
	return (255 & px_) + ((px + ((px + ((px + (px << 8)) << 8)) << 8)) << 8);
};
var $justgook$elm_image$Image$Internal$Pixel$px8to32 = function (px) {
	return 255 + ((px + ((px + ((px + (px << 8)) << 8)) << 8)) << 8);
};
var $justgook$elm_image$Image$Internal$Pixel$toBit32 = function (image) {
	var _v0 = $justgook$elm_image$Image$Internal$ImageData$getInfo(image);
	switch (_v0.$) {
		case 0:
			var color = _v0.a.at;
			switch (color.$) {
				case 0:
					return image;
				case 2:
					return image;
				case 4:
					return image;
				case 1:
					return A2($justgook$elm_image$Image$Internal$ImageData$map, $justgook$elm_image$Image$Internal$Pixel$px8AlphaTo32, image);
				default:
					return image;
			}
		case 1:
			var bitsPerPixel = _v0.a.bY;
			switch (bitsPerPixel) {
				case 0:
					return A2($justgook$elm_image$Image$Internal$ImageData$map, $justgook$elm_image$Image$Internal$Pixel$px8to32, image);
				case 1:
					return image;
				case 2:
					return $justgook$elm_image$Image$Internal$Pixel$addChannel(image);
				default:
					return image;
			}
		case 2:
			return image;
		default:
			var color = _v0.a.at;
			switch (color.$) {
				case 0:
					return image;
				case 1:
					return image;
				case 2:
					return image;
				default:
					return image;
			}
	}
};
var $justgook$elm_image$Image$Advanced$toPng32 = A2($elm$core$Basics$composeR, $justgook$elm_image$Image$Internal$Pixel$toBit32, $justgook$elm_image$Image$Internal$PNG$encode);
var $justgook$elm_image$Image$toPngUrl = A2(
	$elm$core$Basics$composeR,
	$justgook$elm_image$Image$Advanced$toPng32,
	A2(
		$elm$core$Basics$composeR,
		$danfishgold$base64_bytes$Base64$fromBytes,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Maybe$withDefault(''),
			$elm$core$Basics$append('data:image/png;base64,'))));
var $author$project$JumpGun$Build$withTileLayer = F2(
	function (fn, layer) {
		if (layer.$ === 2) {
			var tileData = layer.a;
			return fn(tileData);
		} else {
			return $elm$core$Basics$identity;
		}
	});
var $author$project$JumpGun$Build$decode = A2(
	$elm$json$Json$Decode$map,
	A2(
		$elm$core$Basics$composeR,
		$author$project$JumpGun$Build$getLevelData,
		A2(
			$elm$core$Basics$composeR,
			function ($) {
				return $.v;
			},
			A2(
				$elm$core$Basics$composeR,
				A2(
					$elm$core$List$foldl,
					$author$project$JumpGun$Build$withTileLayer(
						function (_v0) {
							var data = _v0.b2;
							var width = _v0.z;
							return $elm$core$List$cons(
								$justgook$elm_image$Image$toPngUrl(
									A2($justgook$elm_image$Image$fromList, width, data)));
						}),
					_List_Nil),
				A2(
					$elm$core$Basics$composeR,
					$elm$json$Json$Encode$list($elm$json$Json$Encode$string),
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Tuple$pair('lut'),
						$elm$core$List$singleton))))),
	A2($elm$json$Json$Decode$field, 'level', $justgook$elm_tiled$Tiled$decode));
var $author$project$JumpGun$Build$done = _Platform_outgoingPort('done', $elm$core$Basics$identity);
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $author$project$JumpGun$Build$init = function (flags) {
	var _v0 = A2($elm$json$Json$Decode$decodeValue, $author$project$JumpGun$Build$decode, flags);
	if (!_v0.$) {
		var info = _v0.a;
		return _Utils_Tuple2(
			0,
			$author$project$JumpGun$Build$done(
				$elm$json$Json$Encode$object(info)));
	} else {
		var err = _v0.a;
		return _Utils_Tuple2(
			0,
			$author$project$JumpGun$Build$done(
				$elm$json$Json$Encode$string(
					$elm$json$Json$Decode$errorToString(err))));
	}
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$core$Platform$worker = _Platform_worker;
var $author$project$JumpGun$Build$main = $elm$core$Platform$worker(
	{
		ce: $author$project$JumpGun$Build$init,
		cp: function (_v0) {
			return $elm$core$Platform$Sub$none;
		},
		cs: F2(
			function (_v1, model) {
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			})
	});
_Platform_export({'JumpGun':{'Build':{'init':$author$project$JumpGun$Build$main($elm$json$Json$Decode$value)(0)}}});}(this));