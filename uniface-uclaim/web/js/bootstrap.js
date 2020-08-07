require([	"dbootstrap",
			"unifacejs/udojo/EditBox",
			"unifacejs/udojo/Button",
			"unifacejs/udojo/CheckBox",
			"unifacejs/udojo/Dropdown",
			"unifacejs/udojo/Textarea",
			"unifacejs/udojo/ListBox",
			"unifacejs/udojo/DatePicker",
			"unifacejs/udojo/RadioGroup",
			"unifacejs/udojo/Password"],
function(	dbootstrap,
			EditBox,
			Button,
			CheckBox,
			Dropdown,
			Textarea,
			ListBox,
			DatePicker,
			RadioGroup,
			Password){

	UNIFACE.widgetFactory.addCreator("UNIFACE.dijit.editbox",
		function() {
			return new EditBox();
		}
	);
	UNIFACE.widgetFactory.addCreator("UNIFACE.dijit.button",
		function() {
			return new Button();
		}
	);
	UNIFACE.widgetFactory.addCreator("UNIFACE.dijit.checkbox",
		function() {
			return new CheckBox();
		}
	);
	UNIFACE.widgetFactory.addCreator("UNIFACE.dijit.dropdown",
		function() {
			return new Dropdown();
		}
	);
	UNIFACE.widgetFactory.addCreator("UNIFACE.dijit.textarea",
		function() {
			return Textarea();
		}
	);
	UNIFACE.widgetFactory.addCreator("UNIFACE.dijit.listbox",
		function() {
			return new ListBox();
		}
	);
	UNIFACE.widgetFactory.addCreator("UNIFACE.dijit.datepicker",
		function() {
			return new DatePicker();
		}
	);
	UNIFACE.widgetFactory.addCreator("UNIFACE.dijit.radiogroup",
		function() {
			return new RadioGroup();
		}
	);
	UNIFACE.widgetFactory.addCreator("UNIFACE.dijit.password",
		function() {
			return new Password();
		}
	);

	//startUniface();
});

UNIFACE.errorWidget = {
    show: function(a_domNode, a_message) {
        if (a_message) {
            dijit.showTooltip(a_message, a_domNode);
        } else {
            dijit.hideTooltip(a_domNode);
        }
    },
    hide : function() {
        if (dijit._masterTT) {
            dijit.hideTooltip(dijit._masterTT.aroundNode);
        }
    }
};

UNIFACE.extension.register("errorWidget", UNIFACE.errorWidget);