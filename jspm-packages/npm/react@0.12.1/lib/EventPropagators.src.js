/* */ 
"format cjs";
(function(process) {
  "use strict";
  var EventConstants = require("./EventConstants");
  var EventPluginHub = require("./EventPluginHub");
  var accumulateInto = require("./accumulateInto");
  var forEachAccumulated = require("./forEachAccumulated");
  var PropagationPhases = EventConstants.PropagationPhases;
  var getListener = EventPluginHub.getListener;
  function listenerAtPhase(id, event, propagationPhase) {
    var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
    return getListener(id, registrationName);
  }
  function accumulateDirectionalDispatches(domID, upwards, event) {
    if ("production" !== process.env.NODE_ENV) {
      if (!domID) {
        throw new Error('Dispatching id must not be null');
      }
    }
    var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
    var listener = listenerAtPhase(domID, event, phase);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
    }
  }
  function accumulateTwoPhaseDispatchesSingle(event) {
    if (event && event.dispatchConfig.phasedRegistrationNames) {
      EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker, accumulateDirectionalDispatches, event);
    }
  }
  function accumulateDispatches(id, ignoredDirection, event) {
    if (event && event.dispatchConfig.registrationName) {
      var registrationName = event.dispatchConfig.registrationName;
      var listener = getListener(id, registrationName);
      if (listener) {
        event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
        event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
      }
    }
  }
  function accumulateDirectDispatchesSingle(event) {
    if (event && event.dispatchConfig.registrationName) {
      accumulateDispatches(event.dispatchMarker, null, event);
    }
  }
  function accumulateTwoPhaseDispatches(events) {
    forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
  }
  function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
    EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID, toID, accumulateDispatches, leave, enter);
  }
  function accumulateDirectDispatches(events) {
    forEachAccumulated(events, accumulateDirectDispatchesSingle);
  }
  var EventPropagators = {
    accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
    accumulateDirectDispatches: accumulateDirectDispatches,
    accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
  };
  module.exports = EventPropagators;
})(require("github:jspm/nodelibs@0.0.3/process"));
