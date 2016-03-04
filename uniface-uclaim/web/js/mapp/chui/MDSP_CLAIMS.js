mapp.ui.MDSP_CLAIMS = {};

mapp.ui.MDSP_CLAIMS.createJs = function (thisInstance, options) {
    
    thisInstance.mapp.update = false;

	var claimEnt = thisInstance.getEntity("CLAIM.INSURANCE"),
	    id       = claimEnt.getId();
    
    //Escape the colon so that JQuery doesn't interpret it as a CSS selector
	id = mapp.ui.jqEscapeId(id);

	$(id).on('singletap', "li", function(e) {

//		if($("button[id^='ufld:EDIT']").text().toLowerCase() == "edit") {
		if($("button[id^='ufld:EDIT']").attr("edit-id") == "Edit") {
			var dataId = this.getAttribute("data-id");
			mapp.showScreen("claims/detail", {profile:dataId});
			e.stopPropagation();
		};

	});
};

mapp.ui.MDSP_CLAIMS.setupJs = function (thisInstance, options) {
    
	thisInstance.mapp.update = false;
	$("li[id^='uocc:CLAIM']").removeClass("selected");

	$("button[id^='ufld:EDIT_BUTTON']").text(mapp.ui.MDSP_CLAIMS.edittext);
	$("button[id^='ufld:EDIT_BUTTON']").attr("edit-id","Edit");

	var claimEnt = thisInstance.getEntity("CLAIM.INSURANCE");
	claimEnt.setProperty("html:class", "show-detail list deletable");
};