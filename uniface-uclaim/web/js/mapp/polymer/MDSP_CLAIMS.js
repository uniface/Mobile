mapp.ui.MDSP_CLAIMS = {};

mapp.ui.MDSP_CLAIMS.createJs = function (thisInstance, options) {
    
	var claimEnt  = thisInstance.getEntity("CLAIM.INSURANCE");
	var claimList = document.getElementById( claimEnt.getId() );

	claimList.addEventListener("core-activate", function(e) {
		var id = e.detail.item.getAttribute("data-id");
		mapp.showScreen("claims/detail", {profile:id});
	});
};

mapp.ui.MDSP_CLAIMS.setupJs = function (thisInstance, options) {};