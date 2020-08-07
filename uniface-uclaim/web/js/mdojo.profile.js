dependencies = {
	stripConsole: "normal",

	layers: [
		{
			name: "dojo.js",
			customBase: false,
			boot: true,
			dependencies: [
				"dojox/mobile",
				"dojox/mobile/compat",
				"dojo/parser",
                "dojo/dom",
                "dojo/_base/array",
                "dojo/store/Memory",
                "dojo/store/Observable",
                "dijit/registry",
                "dojox/mobile/Heading",
                "dojox/mobile/ListItem",
                "dojox/mobile/ScrollableView",
                "dojox/mobile/RoundRectCategory",
                "dojox/mobile/RoundRectList",
                "dojox/mobile/RoundRectStoreList",
                "dojox/mobile/CheckBox",
                "dojox/mobile/ToolBarButton",
                "dojox/mobile/IconMenu",
                "dojox/mobile/IconMenuItem"
			]
		},
		{
			name: "../dojox/mobile/_compat.js",
			layerDependencies: [
				"dojo.js"
			],
			dependencies: [
				"dojox/mobile/_compat"
			]
		}
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ]
	]
}