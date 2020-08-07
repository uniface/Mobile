define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dojox/mobile/sniff",
	"dojox/mobile/_ItemBase"
], function(declare, lang, win, domClass, domConstruct, domStyle, domAttr, has, ItemBase){

	// module:
	//		mdojo/ToolBarMenuButton

	return declare(ItemBase, {
		// summary:
		//		A button widget which is placed in the Heading widget.
		// description:
		//		ToolBarMenuButton is a button which is typically placed in the
		//		Heading widget. It is a subclass of dojox/mobile/_ItemBase just
		//		like ListItem or IconItem. So, unlike Button, it has basically
		//		the same capability as ListItem or IconItem, such as icon
		//		support, transition, etc.

		// selected: Boolean
		//		If true, the button is in the selected state.
		selected: false,

		/* internal properties */
		baseClass: "mblToolBarButton",

		_selStartMethod: "touch",
		_selEndMethod: "touch",

		buildRendering: function(){

			this.domNode = domConstruct.create("div");
			domAttr.set(this.domNode, "role", "button");
			this.inherited(arguments);

			this.domNode.innerHTML = "";

			domClass.toggle(this.domNode, "fa fa-bars");
		},

		startup: function(){
			if(this._started){ return; }

			this.connect(this.domNode, "onkeydown", "_onClick"); // for desktop browsers

			this.inherited(arguments);
			if(!this._isOnLine){
				this._isOnLine = true;
				// retry applying the attribute for which the custom setter delays the actual 
				// work until _isOnLine is true. 
				//this.set("icon", this._pendingIcon !== undefined ? this._pendingIcon : this.icon);
				// Not needed anymore (this code executes only once per life cycle):
				delete this._pendingIcon; 
			}
		},

		_onClick: function(e){
			// summary:
			//		Internal handler for click events.
			// tags:
			//		private
			if(e && e.type === "keydown" && e.keyCode !== 13){ return; }
			if(this.onClick(e) === false){ return; } // user's click action
			this.defaultClickAction(e);
		},

		onClick: function(/*Event*/ /*===== e =====*/){
			// summary:
			//		User defined function to handle clicks
			// tags:
			//		callback
		},

		_setSelectedAttr: function(/*Boolean*/selected){
			// summary:
			//		Makes this widget in the selected or unselected state.
			var replace = function(node, a, b){
				domClass.replace(node, a + " " + a + "45", b + " " + b + "45");
			};
			this.inherited(arguments);
			domClass.toggle(this.domNode, "mblToolBarButtonSelected", selected);
		}
	});
});
