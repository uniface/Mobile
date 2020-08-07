/*global uniface, mapp*/
mapp.ui = (function () {
	'use strict';
	//Figure out the index of the occurrence we want to move to in DUMMY.DUMMY
	var getDspIndex = function (dspToFind) {
			var index = -1,
				dummyEnt = mapp.menuInstance.getEntity("DUMMY.DUMMY"),
				occs = dummyEnt.getOccurrences();

			occs.forEach(function (occ) {
				var dspName = occ.getField("PAGE").getValue();
				if (dspName === dspToFind) {
					index = occ.getIndex();
				}
			});
			return index;
		},

		tearDownPage = function (instanceName) {

			//Call the tearDown operation on the DSP so it can do any tidying up required
			var instance = uniface.getInstance(instanceName);
			instance.activate("tearDown");
		},

		displayButtons = function (buttons) {
			var headerEnt = mapp.menuInstance.getEntity("TOOLBAR.DUMMY"),
				headerOcc = headerEnt.getOccurrence(0),
				len,
				i,
				buttonName;

			//Hide all the buttons and then re-display only the ones this page needs
			headerOcc.getField("MENU_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("BACK_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("ADD_PHOTO_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("NEW_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("SAVE_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("DELETE_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("EDIT_BUTTON").setProperty("style:display", "none");
			
			if(typeof buttons == 'undefined') {
				buttons= [];
			};

			len = buttons.length;
			for (i = 0; i < len; i = i + 1) {

				buttonName = buttons[i];
				headerOcc.getField(buttonName).setProperty("style:display", "block");

			}
		};

	return {
		/*
		 *  Return the DSP associated with a particular path.
		 */
		preCreateInstance: function (instanceToShow, newOcc, transition) {

			//Return an empty function because we don't need to do anything
			//once the DSP is loaded.
			//TODO: Polymer has loading masks that we should probably be using here.
			return function () {};

		},

		/*
		 *
		 */
		preSetupInstance: function (instanceToShow, transition) {

			return function () {};
		},

		postDspDisplayed: function (instanceShown, menuItem) {

			var headerEnt = mapp.menuInstance.getEntity("TOOLBAR.DUMMY"),
				headerTitle = headerEnt.getOccurrence(0).getField("TITLE"),
				index = getDspIndex(instanceShown),
//				pageContainer = document.querySelector('core-animated-pages');
				pageContainer = document.querySelector('dtop-pages');
				
			var menupages = mapp.menuInstance.getEntity("DUMMY.DUMMY");
			headerTitle.setValue(menuItem.label);
			displayButtons(menuItem.buttons);
			//set all pages to display none
			$("span[id^='ufld:PAGE.DUMMY']").css("display", "none");
			menupages.getOccurrence(index).getField("PAGE").setProperty("style:display", "block");
			pageContainer.selected = index;
			
		},

		backToInstance: function (movingToInstance) {

			var menuItem = mapp.config.getMenuItemByInstanceName(movingToInstance),
				headerEnt = mapp.menuInstance.getEntity("TOOLBAR.DUMMY"),
				headerTitle = headerEnt.getOccurrence(0).getField("TITLE"),
				movingToIndex = getDspIndex(movingToInstance);

			headerTitle.setValue(menuItem.label);

			displayButtons(menuItem.buttons);

//			document.querySelector('core-animated-pages').selected = movingToIndex;
			document.querySelector('dtop-pages').selected = movingToIndex;
			

			//Clean up the DSP we just moved off
			tearDownPage(mapp.currentDsp);

			//Update the current DSP now the transition is complete
			mapp.currentDsp = movingToInstance;
		}
	};
}());