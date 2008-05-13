dojo.provide("dojox.charting.plot2d.ClusteredColumns");

dojo.require("dojox.charting.plot2d.common");
dojo.require("dojox.charting.plot2d.Columns");

dojo.require("dojox.lang.functional");
dojo.require("dojox.lang.functional.reversed");

(function(){
	var df = dojox.lang.functional, dc = dojox.charting.plot2d.common,
		purgeGroup = df.lambda("item.purgeGroup()");

	dojo.declare("dojox.charting.plot2d.ClusteredColumns", dojox.charting.plot2d.Columns, {
		render: function(dim, offsets){
			if(this.dirty){
				dojo.forEach(this.series, purgeGroup);
				this.cleanGroup();
				var s = this.group;
				df.forEachRev(this.series, function(item){ item.cleanGroup(s); });
			}
			var t = this.chart.theme, color, stroke, fill, f,
				ht = this._hScaler.scaler.getTransformerFromModel(this._hScaler),
				vt = this._vScaler.scaler.getTransformerFromModel(this._vScaler),
				gap = this.opt.gap < this._hScaler.bounds.scale / 3 ? this.opt.gap : 0,
				thickness = (this._hScaler.bounds.scale - 2 * gap) / this.series.length,
				baseline = Math.max(0, this._vScaler.bounds.lower),
				baselineHeight = vt(baseline),
				width = thickness;
			for(var i = 0; i < this.series.length; ++i){
				var run = this.series[i], shift = thickness * i;
				if(!this.dirty && !run.dirty){ continue; }
				run.cleanGroup();
				var s = run.group;
				if(!run.fill || !run.stroke){
					// need autogenerated color
					color = run.dyn.color = new dojo.Color(t.next("color"));
				}
				stroke = run.stroke ? run.stroke : dc.augmentStroke(t.series.stroke, color);
				fill = run.fill ? run.fill : dc.augmentFill(t.series.fill, color);
				for(var j = 0; j < run.data.length; ++j){
					var v = run.data[j],
						vv = vt(v),
						height = vv - baselineHeight,
						h = Math.abs(height);
					if(width >= 1 && h >= 1){
						var shape = s.createRect({
							x: offsets.l + ht(j + 0.5) + gap + shift,
							y: dim.height - offsets.b - (v > baseline ? vv : baselineHeight),
							width: width, height: h
						}).setFill(fill).setStroke(stroke);
						run.dyn.fill   = shape.getFill();
						run.dyn.stroke = shape.getStroke();
					}
				}
				run.dirty = false;
			}
			this.dirty = false;
			return this;
		}
	});
})();
