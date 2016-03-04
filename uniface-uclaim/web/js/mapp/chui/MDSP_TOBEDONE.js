mapp.ui.MDSP_TOBEDONE = {};

mapp.ui.MDSP_TOBEDONE.createJs = function (thisInstance, options) {
    
	//Swap out the static article ID with one containing the actual instance name
	var instanceName = thisInstance.getName();
	$("#MDSP_TOBEDONE-article").attr("id", instanceName + "-article");

};