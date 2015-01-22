/* */
"format cjs";var jstransform=require("./src/jstransform"),arrowFuncVisitors=require("./visitors/es6-arrow-function-visitors"),restParamVisitors=require("./visitors/es6-rest-param-visitors");exports.process=function(e){return jstransform.transform(arrowFuncVisitors.visitorList.concat(restParamVisitors.visitorList),e).code};
//# sourceMappingURL=jestPreprocessor.js.map