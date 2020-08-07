mapp.ui.MDSP_HOME = {};

mapp.ui.MDSP_HOME.createJs = function (thisInstance, options) {
    
	var customerEnt = thisInstance.getEntity("CUSTOMER.INSURANCE"),
        policyEnt   = customerEnt.getOccurrence(0).getEntity("POLICY.INSURANCE"),
        id          = policyEnt.getId();
    
    //Escape the colon so that JQuery doesn't interpret it as a CSS selector
	id = mapp.ui.jqEscapeId(id);

    $(id).on('singletap', "li", function(e) {

        var dataId = this.getAttribute("data-id");
        mapp.showScreen("home/detail", {profile:dataId});
        e.preventDefault();

	});

};