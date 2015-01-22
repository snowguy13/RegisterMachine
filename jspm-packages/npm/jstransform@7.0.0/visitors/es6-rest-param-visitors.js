/* */
"format cjs";function _nodeIsFunctionWithRestParam(e){return(e.type===Syntax.FunctionDeclaration||e.type===Syntax.FunctionExpression||e.type===Syntax.ArrowFunctionExpression)&&e.rest}function visitFunctionParamsWithRestParam(e,t,r,o){return t.parametricType&&(utils.catchup(t.parametricType.range[0],o),r.unshift(t),e(t.parametricType,r,o),r.shift()),t.params.length?(r.unshift(t),e(t.params,r,o),r.shift()):utils.catchup(t.rest.range[0]-3,o),utils.catchupWhiteSpace(t.rest.range[1],o),r.unshift(t),e(t.body,r,o),r.shift(),!1}function renderRestParamSetup(e){return"var "+e.rest.name+"=Array.prototype.slice.call(arguments,"+e.params.length+");"}function visitFunctionBodyWithRestParam(e,t,r,o){utils.catchup(t.range[0]+1,o);var n=r[0];return utils.append(renderRestParamSetup(n),o),!0}var Syntax=require("esprima-fb").Syntax,utils=require("../src/utils");visitFunctionParamsWithRestParam.test=function(e){return _nodeIsFunctionWithRestParam(e)},visitFunctionBodyWithRestParam.test=function(e,t){return e.type===Syntax.BlockStatement&&_nodeIsFunctionWithRestParam(t[0])},exports.renderRestParamSetup=renderRestParamSetup,exports.visitorList=[visitFunctionParamsWithRestParam,visitFunctionBodyWithRestParam];
//# sourceMappingURL=es6-rest-param-visitors.js.map