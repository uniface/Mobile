mapp.ui.MDSP_HOME = {};

mapp.ui.MDSP_HOME.createJs = function (thisInstance, options) {
    
    var customerEnt = thisInstance.getEntity("CUSTOMER.INSURANCE"),
        policyEnt   = customerEnt.getOccurrence(0).getEntity("POLICY.INSURANCE"),
        policyList  = document.getElementById(policyEnt.getId());

	//Attach event listener to handle taps on a policy
	policyList.addEventListener("core-activate", function(e) {
		var id = e.detail.item.getAttribute("data-id");
		mapp.showScreen("home/detail", {profile:id});
	});

};