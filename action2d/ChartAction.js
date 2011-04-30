dojo.provide("dojox.charting.action2d.ChartAction");

dojo.require("dojox.charting.action2d.Base");

dojo.declare("dojox.charting.action2d.ChartAction", dojox.charting.action2d.Base, {

	constructor: function(chart, plot){
		//	summary:
		//		Create a new base chart action.
		//	chart: dojox.charting.Chart
		//		The chart this action applies to.
		//	plot: String?|dojox.charting.plot2d.Base?
		//		Optional target plot for this chart action.  Default is "default".
	},

	connect: function(){
		//	summary:
		//		Connect this action to the chart.
		for(var i = 0; i < this._listeners.length; ++i){
			this._listeners[i].handle = dojo.connect(this.chart.node, this._listeners[i].eventName, 
					this, this._listeners[i].methodName);
		}
	},

	disconnect: function(){
		//	summary:
		//		Disconnect this action from the chart.
		for(var i = 0; i < this._listeners.length; ++i){
			dojo.disconnect(this._listeners[i].handle);
			delete this._listeners[i].handle;
		}
	}
});
