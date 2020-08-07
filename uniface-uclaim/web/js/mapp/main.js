/*global uniface, console*/

uniface.DataObject.prototype.getId = function () {
	'use strict';
	return this._ido.ro.fieldId;
};

mapp = (function () {
	'use strict';

	return {
		currentPath: null,
		currentDsp: "",
		refreshOnNextBack: false,
		menuInstance: null, //The Menu DSP Instance

		/*
		 *  showScreen
		 *
		 *  Handles loading and displaying a page
		 *
		 *  pagePath - string - The path to the page as described by the app's menu config file
		 *  options  - object - An object of parameters that will be passed to the DSP being
		 *                      displayed
		 *
		 */
		showScreen: function (pagePath, options, transition) {
			if (pagePath === mapp.currentPath) {
				//We're being asked to move to the same path we're already on so just jump out here
				console.log("Tried to navigate to " + pagePath + " but we're already there");
				return;
			}

			//Make options an empty object if no options passed in
			options = (typeof options === "undefined") ? {} : options;

			var updateState = (typeof options.updateState === "undefined") ? true : options.updateState, //Default updateState to true
				menuItem = mapp.config.getMenuItemByPath(pagePath),
				dspToShow = menuItem.dsp,
				//Does this menu item define a DSP instance name? If not, default it to the name of the DSP;
				instanceToShow = (typeof menuItem.instanceName === "undefined") ? dspToShow : menuItem.instanceName,
				//Get any static parameters defined in the menu config and combine them with any that were passed in
				staticOptions = (typeof menuItem.params === "undefined") ? {} : menuItem.params,
				attrname,
				optionString,
				instance,
				dummyEnt,
				newOcc,
				processingComplete,
				state;

			//Default transition to slide
			transition = (typeof transition === "undefined") ? "slide" : transition;

			//we'll give precedence to options passed in over static options
			for (attrname in staticOptions) {
				if (staticOptions.hasOwnProperty(attrname)) {
					options[attrname] = staticOptions[attrname];
				}
			}

			//Convert options object in a string so it can be passed to Uniface
			optionString = JSON.stringify(options);
			//TODO: if this errors then something dodgy was passed in, raise an appropriate exception

			instance = uniface.getInstance(instanceToShow);
			if (instance === null) {
				//We don't have this DSP in the browser yet, go and create it

				//First, create a new container to hold the DSP we're going to load
				dummyEnt = mapp.menuInstance.getEntity("DUMMY.DUMMY");

				//newOcc = dummyEnt.createOccurrence(-1);
				newOcc = dummyEnt.getOccurrence(0);
				if (newOcc.getStatus() !== uniface.Occurrence.STATUS_EMPTY) {
					newOcc = dummyEnt.createOccurrence(-1);
				}

				/*
				 *  Call the UI layer and let it do any setup it needs to do. This will
				 *  return a function that should be called once the DSP is loaded. This
				 *  could be used to disable a loading mask created by mapp.ui.preCreateInstance
				 *  , for example.
				 *
				 *	TODO: It would be much better to implement promises for this sort of behaviour
				 */
				processingComplete = mapp.ui.preCreateInstance(instanceToShow, newOcc, transition);

				//Call the server to create our DSP
				uniface.createInstance(
					dspToShow, //Component Name
					instanceToShow, //Instance Name
					"appCreate", //Operation Name
					optionString //Parameters
				).then(function () {

					var instance = uniface.getInstance(instanceToShow),
						//Get the DSP and assign it to the DSP Container field
						newOccs = mapp.menuInstance.getEntity("DUMMY.DUMMY").getOccurrences(),
						newOcc = newOccs[newOccs.length - 1];

					newOcc.getField("PAGE").setValue(instanceToShow);
					processingComplete();
					mapp.ui.postDspDisplayed(instanceToShow, menuItem);
					mapp.currentDsp = instanceToShow;

				}).catch(function(e) {
  					console.log(e); // "oh, no!"
  				});
			} else {
				//We already have this DSP in the browser

				processingComplete = mapp.ui.preSetupInstance(instanceToShow);

				//Trigger the DSP's setup event handlers
				instance.activate("appSetup", optionString)
					.then(function () {
						processingComplete();
						mapp.ui.postDspDisplayed(instanceToShow, menuItem);
						mapp.currentDsp = instanceToShow;
					});
			}

			if (updateState) {
				//Update the browser navigation bar
				state = {
					path: pagePath
				};
				if (pagePath !== "home") {
					history.pushState(state, null);
				} else {
					history.replaceState(state, null);
				}
			}

			console.log("New current path: " + pagePath);
			mapp.currentPath = pagePath;
		},

		/*
		 *  goBack
		 *
		 *  Causes the app to go back one page in its navigation stack. The
		 *  page being moved off will have its teardown operation called and
		 *  optionally the page being moved to will have its refresh operation
		 *  called
		 *
		 *  refreshPage - boolean - Defaults to false. Whether the page we're
		 *                          moving to should be refreshed or not.
		 */
		goBack: function (refreshPage) {
			//Default refreshPage to false
			refreshPage = (typeof refreshPage === "undefined") ? false : refreshPage;

			if (refreshPage) {
				//refreshOnNextBack causes the popstate event listener
				//to tell the previous DSP to refresh before we go
				//back to it
				mapp.refreshOnNextBack = true;
			}

			//Simply trigger the browser's back "button". The popstate event listener defined
			//in the menu DSP will handle the actual transition
			window.history.back();

			//Don't put any code here that relies on the back having happened already. The back
			//will happen asyncronously
		},

		/*
		 *  getNavigationButton
		 *
		 */
		getNavigationButton: function (instanceName) {
			return mapp.ui.getNavigationButton(instanceName);

		},

		/*
		 *  writeContactToOcc
		 *
		 */
		writeContactToOcc: function (contact, occ) {
			function setFieldValue(pValue, pFieldName, pOccurrence) {
				pOccurrence.getField(pFieldName).setValue((pValue === null) ? "" : pValue);
			}

			setFieldValue(contact.id, "ID", occ);
			setFieldValue(contact.displayName, "DISPLAY_NAME", occ);
			setFieldValue(contact.birthday, "BIRTHDAY", occ);
			if (typeof contact.name === "object") {
				setFieldValue(contact.name.formatted, "FORMATTED_NAME", occ);
				setFieldValue(contact.name.familyName, "FAMILY_NAME", occ);
				setFieldValue(contact.name.givenName, "GIVEN_NAME", occ);
				setFieldValue(contact.name.middleName, "MIDDLE_NAME", occ);
				setFieldValue(contact.name.honorificPrefix, "HONORIFIC_PREFIX", occ);
				setFieldValue(contact.name.honorificSuffix, "HONORIFIC_SUFFIX", occ);
			}
		},

		/*
		 *  The operations in this section are called by the framework operations and shouldn't
		 *  be invoked directly from application code
		 */


		_backToPage: function (movingToInstance, refreshPage) {

			//Get the DSP instance we're moving to
			var dspInstance = uniface.getInstance(movingToInstance),
				optionString;

			//Default refreshPage to false
			refreshPage = (typeof refreshPage === "undefined") ? false : refreshPage;
			if (refreshPage) {
				//Unpack the options we stashed against this DSP instance
				//and pass them into the appRefresh operation
				optionString = JSON.stringify(dspInstance.mapp.params);
				dspInstance.activate("appRefresh", optionString);
			}

			//Call the UI layer to actually handle visually going back to the last DSP
			mapp.ui.backToInstance(movingToInstance);
		}
	};
}());
/*
 *  This section contains functions only used by JavaScript in this file.
 *  They aren't callable externally or from Uniface
 */