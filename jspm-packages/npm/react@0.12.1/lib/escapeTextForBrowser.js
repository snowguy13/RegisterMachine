/* */
"format cjs";"use strict";function escaper(e){return ESCAPE_LOOKUP[e]}function escapeTextForBrowser(e){return(""+e).replace(ESCAPE_REGEX,escaper)}var ESCAPE_LOOKUP={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"},ESCAPE_REGEX=/[&><"']/g;module.exports=escapeTextForBrowser;
//# sourceMappingURL=escapeTextForBrowser.js.map