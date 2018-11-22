/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/
exports.isValidXML = xmlString => {
  const singleTag = /<([^\/>]+)\/>/g;
  const errorTag = /<</;
  const xmlArr = xmlString.match(/<[^> ]+[^>]*>[^<]*/g);
  const storage = [];
  const open = {
    '<a>': '</a>',
    '<b>': '</b>',
    '<a>test' : '</a>'
  };
  const opentag = Object.keys(open);
  let result = true;

  if (errorTag.test(xmlArr)) {
    result = false;
  } else {
    result = true;
  }

  if (xmlArr.length <= 1 && !singleTag.test(xmlArr)) {
    result = false;
  } 

  xmlArr.filter((item, idx, array) => {
    if (array.indexOf(item) !== idx) {
      result = false;
    }
  });

  for (var i = 0; i < xmlArr.length; i++) {
    if (opentag.includes(xmlArr[i])) {
      storage.push(xmlArr[i]);
    } else {
      const lastInStack = storage[storage.length - 1];
      if (xmlArr[i] === open[lastInStack]) {
        storage.pop();
      } else {
        result = false;
      }
    }
  }

  return result ? true : false;
};
