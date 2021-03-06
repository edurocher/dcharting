define(["dojo/_base/connect", "dojo/_base/declare", "./Base"], 
	function(hub, declare, Base){

	return declare(Base, {
		// summary:
		//		Base action class for chart actions.
	
		constructor: function(chart, plot, param){
			// summary:
			//		Create a new base chart action.
			// chart: dcharting/Chart
			//		The chart this action applies to.
			// plot: String|dcharting/plot2d/Base?
			//		Optional target plot for this chart action.  Default is "default".
			// params: Object|null
			//		Hash of initialization parameters for the action.
			//		The hash can contain any of the action's properties, excluding read-only properties.
		},
	
		connect: function(){
			// summary:
			//		Connect this action to the chart.
			for(var i = 0; i < this._listeners.length; ++i){
				this._listeners[i].handle = hub.connect(this.chart.domNode, this._listeners[i].eventName,
						this, this._listeners[i].methodName);
			}
		},
	
		disconnect: function(){
			// summary:
			//		Disconnect this action from the chart.
			for(var i = 0; i < this._listeners.length; ++i){
				hub.disconnect(this._listeners[i].handle);
				delete this._listeners[i].handle;
			}
		}
});

});
