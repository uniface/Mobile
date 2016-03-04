mapp.ui.MDSP_CLAIM = {};

mapp.ui.MDSP_CLAIM.createJs = function (thisInstance, options) {

    //Rename layout article instance name to the name of this instance
	var instanceName = thisInstance.getName();
	$("#MDSP_CLAIM-article").attr("id", instanceName + "-article");
};
    
mapp.ui.MDSP_CLAIM.setupJs = function (thisInstance, options) {
    
    var mode = options.mode;

    if(mode == "u" || mode == "c") {
		var claimOccurrence = thisInstance.getEntity("CLAIM.INSURANCE").getOccurrence(0),
            contactEnt      = claimOccurrence.getEntity("CLAIMCONTACT.INSURANCE"),
            photoEnt        = claimOccurrence.getEntity("CLAIMPHOTO.INSURANCE");
        
		$("li.comp.hidable").show();

		contactEnt.setProperty("html:class", "list deletable showIndicators");
		photoEnt.setProperty("html:class", "list deletable showIndicators");
    } else {
        $("li.comp.hidable").hide();
    };
};