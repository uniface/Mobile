/*
 *  Require in all the modules we'll be using in Uniface so that we can use
 *  the var parser = require("dojo/parser") notation in order to get module
 *  references synchronously
 */

require([
	"dojo/parser",
	"dojo/dom",
	"dojo/_base/array",
	"dojo/store/Memory",
	"dojo/store/Observable",
	"dijit/registry",
	"dojox/mobile/Heading",
	"dojox/mobile/ListItem",
	"dojox/mobile/ScrollableView",
	"dojox/mobile/RoundRect",
	"dojox/mobile/RoundRectCategory",
	"dojox/mobile/RoundRectList",
	"dojox/mobile/RoundRectStoreList",
	"dojox/mobile/CheckBox",
	"dojox/mobile/ToolBarButton",
	"dojox/mobile/TabBar",
	"dojox/mobile/TabBarButton",
	"dojox/mobile/SwapView",
	"mapp/dojo/ToolBarMenuButton"
]);

require([
		"dojo/dom",
		"dojo/dom-attr",
		"dojo/dom-style",
		"dojo/on",
		"dojo/query",
		"dojo/_base/array",
		"dojo/_base/lang",
		"dijit/registry",
		"dojox/mobile/View",
		"dojox/mobile/ProgressIndicator",
		"dojox/mobile/ToolBarButton",
		"mapp/dojo/ToolBarMenuButton"],
function(
		dom,
		domAttr,
		domStyle,
		on,
		query,
		array,
		lang,
		registry,
		View,
		ProgressIndicator,
		ToolBarButton,
		ToolBarMenuButton) {

mapp.ui             = {};
mapp.ui.currentView = null;

/*
 *
 */
mapp.ui.preCreateInstance = function(instanceToShow, newOcc, transition) {

	var pageView = createNewView(instanceToShow, newOcc);
	return showView(pageView, instanceToShow, transition);
}


/*
 *
 */
mapp.ui.preSetupInstance = function(instanceToShow, transition) {

		//Get the View that is wrapping the DSP we want to move to
		var movingToViewId = 'page-view-' + instanceToShow;
		var pageView = registry.byId(movingToViewId);

		//We already have this DSP instance
		return showView(pageView, instanceToShow, transition);
}

mapp.ui.postDspDisplayed = function() {

}

mapp.ui.backToInstance = function(movingToInstance) {
	//Get the View that is wrapping the DSP we want to move to
	var movingToViewId = 'page-view-' + movingToInstance;
	var movingToView   = registry.byId(movingToViewId);

	//Transition from the current view to the view we're moving to
	mapp.ui.currentView.performTransition(movingToViewId, -1, "slide");

	// Listen for the afterTransitionOut event, this tells us that the
	// transition is complete and we can start destroying things.
	// Trying to destroy the view before the transition is complete causes
	// the next view to remain hidden which gives the user a blank screen.
	var signal = on(mapp.ui.currentView, "afterTransitionOut",
		function(moveTo, dir, transition, context, method){

			signal.remove();

			//Clean up the DSP we just moved off
			tearDownPage(mapp.currentDsp);

			//Update the current view and DSP now the transition is complete
			mapp.ui.currentView = movingToView;
			mapp.currentDsp     = movingToInstance;
	});
}

/*
 *  getNavigationButton
 *  
 */
mapp.ui.getNavigationButton = function(instanceName) {

	var menuItem = mapp.config.getMenuItemByInstanceName(instanceName);

	if( mapp.config.isRootItem(menuItem) ) {
		//This instance is at the root of the menu structure, so pass back a menu button
		return new ToolBarMenuButton({
			onClick: mapp.toggle
		});
	} else {
		//This instance is a child of another DSP so pass back a back button
		return new ToolBarButton({
			arrow: "left",
			onClick: mapp.goBack,
			label: "Back"
		});
	}
}

var createNewView = function(instanceToShow, newOcc) {

	var className  = 'page-view-' + instanceToShow;
	var classString = 'class:' + className;
	newOcc.setProperty(classString, "true")

	//Find the node we're hanging the new view off
	var queryString = '.' + className + ' > div';
	var nodeList = query(queryString);
	var viewNode = nodeList[0];
	domAttr.set(viewNode, "id", className);

	//Find the node we're going to use to hide the DSP as it loads
	queryString  = queryString + ' > div';
	nodeList     = query(queryString);
	var maskNode = nodeList[0];
	//domStyle.set(maskNode, "visibility", "hidden");

	var pageView = new View(null, viewNode);
	pageView.startup();

	return pageView;
}

var showView = function(pageView, instanceToShow, transition) {

	//Get an instance of a progress indicator and attach it to our view
	//var prog = ProgressIndicator.getInstance();
	//dom.byId(pageView.domNode).appendChild(prog.domNode);
	//prog.start(); // start the progress indicator

	if(mapp.ui.currentView) {
		//If we're currently on another view then transition to the one we want to show
		mapp.ui.currentView.performTransition(pageView.id, 1, transition);	
	} else {
		//We're not currently on a view so we're probably loading the first screen
		pageView.set("selected", true);
	}
	
	mapp.ui.currentView = pageView;

	//Return a function that should be run once Uniface finishes loading the DSP
	return function() {
		pageView.resize();

		setTimeout(function() {
			//prog.stop();										// stop the progress indicator
			//domStyle.set(maskNode, "visibility", "visible");	// show the contents of the view
		}, 100);
	};
}

var tearDownPage = function(instanceName) {

	//Call the tearDown operation on the DSP so it can do any tidying up required
	var instance = uniface.getInstance(instanceName);
	instance.activate("tearDown");
}

});