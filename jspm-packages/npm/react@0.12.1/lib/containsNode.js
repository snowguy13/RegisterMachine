/* */
"format cjs";function containsNode(e,t){return e&&t?e===t?!0:isTextNode(e)?!1:isTextNode(t)?containsNode(e,t.parentNode):e.contains?e.contains(t):e.compareDocumentPosition?!!(16&e.compareDocumentPosition(t)):!1:!1}var isTextNode=require("./isTextNode");module.exports=containsNode;
//# sourceMappingURL=containsNode.js.map