/* */
"format cjs";!function(e){"use strict";function t(){"production"!==e.env.NODE_ENV?m(_.ReactReconcileTransaction&&E,"ReactUpdates: must inject a reconcile transaction class and batching strategy"):m(_.ReactReconcileTransaction&&E)}function n(){this.reinitializeTransaction(),this.dirtyComponentsLength=null,this.callbackQueue=u.getPooled(),this.reconcileTransaction=_.ReactReconcileTransaction.getPooled()}function r(e,n,r){t(),E.batchedUpdates(e,n,r)}function o(e,t){return e._mountDepth-t._mountDepth}function a(t){var n=t.dirtyComponentsLength;"production"!==e.env.NODE_ENV?m(n===v.length,"Expected flush transaction's stored dirty-components length (%s) to match dirty-components array length (%s).",n,v.length):m(n===v.length),v.sort(o);for(var r=0;n>r;r++){var a=v[r];if(a.isMounted()){var i=a._pendingCallbacks;if(a._pendingCallbacks=null,a.performUpdateIfNecessary(t.reconcileTransaction),i)for(var s=0;s<i.length;s++)t.callbackQueue.enqueue(i[s],a)}}}function i(n,r){return"production"!==e.env.NODE_ENV?m(!r||"function"==typeof r,"enqueueUpdate(...): You called `setProps`, `replaceProps`, `setState`, `replaceState`, or `forceUpdate` with a callback that isn't callable."):m(!r||"function"==typeof r),t(),"production"!==e.env.NODE_ENV?h(null==l.current,"enqueueUpdate(): Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate."):null,E.isBatchingUpdates?(v.push(n),void(r&&(n._pendingCallbacks?n._pendingCallbacks.push(r):n._pendingCallbacks=[r]))):void E.batchedUpdates(i,n,r)}function s(t,n){"production"!==e.env.NODE_ENV?m(E.isBatchingUpdates,"ReactUpdates.asap: Can't enqueue an asap callback in a context whereupdates are not being batched."):m(E.isBatchingUpdates),g.enqueue(t,n),y=!0}var u=require("./CallbackQueue"),c=require("./PooledClass"),l=require("./ReactCurrentOwner"),p=require("./ReactPerf"),d=require("./Transaction"),f=require("./Object.assign"),m=require("./invariant"),h=require("./warning"),v=[],g=u.getPooled(),y=!1,E=null,C={initialize:function(){this.dirtyComponentsLength=v.length},close:function(){this.dirtyComponentsLength!==v.length?(v.splice(0,this.dirtyComponentsLength),x()):v.length=0}},b={initialize:function(){this.callbackQueue.reset()},close:function(){this.callbackQueue.notifyAll()}},R=[C,b];f(n.prototype,d.Mixin,{getTransactionWrappers:function(){return R},destructor:function(){this.dirtyComponentsLength=null,u.release(this.callbackQueue),this.callbackQueue=null,_.ReactReconcileTransaction.release(this.reconcileTransaction),this.reconcileTransaction=null},perform:function(e,t,n){return d.Mixin.perform.call(this,this.reconcileTransaction.perform,this.reconcileTransaction,e,t,n)}}),c.addPoolingTo(n);var x=p.measure("ReactUpdates","flushBatchedUpdates",function(){for(;v.length||y;){if(v.length){var e=n.getPooled();e.perform(a,null,e),n.release(e)}if(y){y=!1;var t=g;g=u.getPooled(),t.notifyAll(),u.release(t)}}}),M={injectReconcileTransaction:function(t){"production"!==e.env.NODE_ENV?m(t,"ReactUpdates: must provide a reconcile transaction class"):m(t),_.ReactReconcileTransaction=t},injectBatchingStrategy:function(t){"production"!==e.env.NODE_ENV?m(t,"ReactUpdates: must provide a batching strategy"):m(t),"production"!==e.env.NODE_ENV?m("function"==typeof t.batchedUpdates,"ReactUpdates: must provide a batchedUpdates() function"):m("function"==typeof t.batchedUpdates),"production"!==e.env.NODE_ENV?m("boolean"==typeof t.isBatchingUpdates,"ReactUpdates: must provide an isBatchingUpdates boolean attribute"):m("boolean"==typeof t.isBatchingUpdates),E=t}},_={ReactReconcileTransaction:null,batchedUpdates:r,enqueueUpdate:i,flushBatchedUpdates:x,injection:M,asap:s};module.exports=_}(require("github:jspm/nodelibs@0.0.3/process"));
//# sourceMappingURL=ReactUpdates.js.map