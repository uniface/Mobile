/*global uniface, mapp, $*/
mapp.ui = (function () {
	'use strict';
	//Figure out the index of the occurrence we want to move to in DUMMY.DUMMY
	var getDspIndex = function (dspToFind) {
			var index = -1,
				dummyEnt = mapp.menuInstance.getEntity("DUMMY.DUMMY"),
				occs = dummyEnt.getOccurrences(),
				dspName;
			occs.forEach(function (occ) {
				dspName = occ.getField("PAGE").getValue();
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
			$(".slide-out-button").css('display', 'none'); //special case for slide out
			headerOcc.getField("BACK_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("REFRESH_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("ADD_PHOTO_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("NEW_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("SAVE_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("DELETE_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("MSG_BUTTON").setProperty("style:display", "none");
			headerOcc.getField("EDIT_BUTTON").setProperty("style:display", "none");

			len = buttons.length;
			for (i = 0; i < len; i = i + 1) {

				buttonName = buttons[i];
				if (buttonName === "MENU_BUTTON") { //special case for slide out
					$(".slide-out-button").css('display', 'block');
				} else {
					headerOcc.getField(buttonName).setProperty("style:display", "block");
				}

			}
			//Center title
			$("span[id^='ufld:TITLE.TOOLBAR']").UICenter();

		};
	
	return {
		/*
		 *  Return the DSP associated with a particular path.
		 */
		preCreateInstance: function (instanceToShow, newOcc, transition) {
			//Return an empty function because we don't need to do anything
			//once the DSP is loaded.
			return function () {};

		},

		/*
		 *
		 */
		preSetupInstance: function (instanceToShow, transition) {

			//Return an empty function because we don't need to do anything
			//once the DSP is setup.
			return function () {};
		},

		postDspDisplayed: function (instanceShown, menuItem) {
			var headerEnt = mapp.menuInstance.getEntity("TOOLBAR.DUMMY"),
				headerTitle = headerEnt.getOccurrence(0).getField("TITLE"),
				whichArticle = "#" + instanceShown + "-article";

			headerTitle.setValue(menuItem.label);

			displayButtons(menuItem.buttons);

			$.publish('chui/navigate/leave', $('article.show')[0].id);
			$.publish('chui/navigate/enter', whichArticle);

			//Remove the 'show' class from all articles and remove 'current'
			$('article').removeClass('show');
			$('article').prev().removeClass('show');
			$('article').removeClass('current');


			//Add the 'next' class to all articles so that they aren't displayed
			$('article').addClass('next');
			$('article').prev().addClass('next');

			//Remove the 'next' class and add 'show' to the article we want to display
			$(whichArticle).removeClass('next');
			$(whichArticle).prev().removeClass('next');
			$(whichArticle).addClass('show');
			// Make this the 'current' article displayed
			$(whichArticle).addClass('current');
			$(whichArticle).prev().addClass('show');
			//Remove 'previous' class or subsequent displays are not shown
			$(whichArticle).removeClass('previous');

		},

		backToInstance: function (movingToInstance) {

			//Going back need to recover menuItems
			var menuItem = mapp.config.getMenuItemByInstanceName(movingToInstance),
				headerEnt = mapp.menuInstance.getEntity("TOOLBAR.DUMMY"),
				headerTitle = headerEnt.getOccurrence(0).getField("TITLE");

			$.UIGoToArticle("#" + movingToInstance + "-article");

			//Clean up the DSP we just moved off
			tearDownPage(mapp.currentDsp);
			headerTitle.setValue(menuItem.label);
			displayButtons(menuItem.buttons);

			//Update the current DSP
			mapp.currentDsp = movingToInstance;
		},

		jqEscapeId: function (id) {
			return "#" + id.replace(/(:|\.|\[|\]|,)/g, "\\$1");
		}
	};

}());