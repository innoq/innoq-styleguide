'use strict';

if(typeof window !== "undefined") { var global = window; }

var BLANKS = [undefined, null, false];

// flatten array while discarding blank values
function flatCompact(items) {
	return items.reduce(function (memo, item) {
		return BLANKS.indexOf(item) !== -1 ? memo : memo.concat(item.pop ? flatCompact(item) : item);
	}, []);
}

// cf. https://www.w3.org/TR/html5/syntax.html#void-elements
var VOID_ELEMENTS = {}; // poor man's set
["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"].forEach(function (tag) {
	VOID_ELEMENTS[tag] = true;
});

function generateHTML(tag, params) {
	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		children[_key - 2] = arguments[_key];
	}

	return function (stream) {
		stream.write("<" + tag + generateAttributes(params) + ">");

		// NB:
		// * discarding blank values to avoid conditionals within JSX (passing
		//   `null`/`undefined`/`false` is much simpler)
		// * `children` might contain nested arrays due to the use of
		//   collections within JSX (`{items.map(item => <span>item</span>)}`)
		flatCompact(children).forEach(function (child) {
			if (child.call) {
				child(stream);
			} else if (child instanceof HTMLString) {
				stream.write(child.value);
			} else {
				var txt = htmlEncode(child.toString());
				stream.write(txt);
			}
		});

		// void elements must not have closing tags
		if (!VOID_ELEMENTS[tag]) {
			stream.write("</" + tag + ">");
		}
		stream.flush();
	};
}

function HTMLString(str) {
	this.value = str;
}

function generateAttributes(params) {
	if (!params) {
		return "";
	}

	var attribs = Object.keys(params).reduce(function (memo, name) {
		var value = params[name];
		switch (value) {
			// blank attributes
			case null:
			case undefined:
				break;
			// boolean attributes (e.g. `<input … autofocus>`)
			case true:
				memo.push(name);
				break;
			case false:
				break;
			// regular attributes
			default:
				if (typeof value === "number") {
					value = value.toString();
				} else if (!value.substr) {
					throw new Error("invalid attribute value: `" + JSON.stringify(value) + "`");
				}

				// cf. https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				if (/ |"|'|>|'|\/|=/.test(name)) {
					throw new Error("invalid attribute name: `" + JSON.stringify(name) + "`");
				}

				memo.push(name + "=\"" + htmlEncode(value, true) + "\"");
		}
		return memo;
	}, []);
	return attribs.length === 0 ? "" : " " + attribs.join(" ");
}

// adapted from TiddlyWiki <http://tiddlywiki.com> and Python 3's `html` module
function htmlEncode(str, attribute) {
	var res = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	if (attribute) {
		res = res.replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
	}
	return res;
}

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var TAG_MACROS = {};

function registerMacro(tag, fn) {
	// TODO: rename?
	if (TAG_MACROS[tag]) {
		throw new Error("invalid tag macro: <" + tag + "> already registered");
	}

	TAG_MACROS[tag] = fn;
}

function createElement$1(tag, params) {
	var macro = TAG_MACROS[tag];

	for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		children[_key - 2] = arguments[_key];
	}

	return macro ? macro.apply(undefined, [params].concat(toConsumableArray(flatCompact(children)))) : generateHTML.apply(undefined, [tag, params].concat(children));
}

registerMacro('button-group', function (_ref) {
  for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    children[_key - 1] = arguments[_key];
  }

  var title = _ref.title;

  return createElement$1(
    'div',
    { 'class': 'button-group' },
    createElement$1(
      'strong',
      null,
      title
    ),
    children
  );
});

registerMacro('preview-layout', function (params) {
  for (var _len2 = arguments.length, children = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    children[_key2 - 1] = arguments[_key2];
  }

  return createElement$1(
    'html',
    null,
    createElement$1(
      'head',
      null,
      createElement$1('meta', { charset: 'utf-8' }),
      createElement$1(
        'title',
        null,
        'Preview Layout'
      )
    ),
    createElement$1(
      'body',
      null,
      children
    )
  );
});

module.exports = createElement$1;
