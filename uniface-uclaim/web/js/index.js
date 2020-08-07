require([
	"dojo/dom",
	"dojo/_base/declare",
	"dojo/store/Memory",
	"dojo/store/Observable",
	"dojo/topic",
	"dojox/mobile",
	"dojox/mobile/compat",
	"dojox/mobile/ContentPane",
	"dojox/mobile/View",
	"dojox/mobile/Heading",
	"dojox/mobile/IconMenu",
	"dojox/mobile/IconMenuItem",
	"dojox/mobile/Button",
	"dojox/mobile/ToolBarButton",
	"mdojo/ToolBarMenuButton",
	"dojox/mobile/View",
	"dojox/mobile/SwapView",
	"dojox/mobile/ScrollableView",
	"dojox/mobile/EdgeToEdgeList",
	"dojox/mobile/ListItem",
	"dojox/mobile/TabBar",
	"dojox/mobile/TabBarButton",
	"dojox/mobile/RoundRectStoreList",
	"sidepane/SidePane",
	"dojo/ready"
],
function(
		dom,
		declare,
		Memory,
		Observable,
		topic,
		mobile,
		compat,
		ContentPane,
		View,
		Heading,
		IconMenu,
		IconMenuItem,
		Button,
		ToolBarButton,
		ToolBarMenuButton,
		View,
		SwapView,
		ScrollableView,
		EdgeToEdgeList,
		ListItem,
		TabBar,
		TabBarButton,
		RoundRectStoreList,
		SidePane,
		ready) {

	function setPosition(){
		pos = sidePane.get("position") == "start" ? "end" : "start";
		sidePane.set('position', pos);
		if(pos == "start"){
			leftTip.style.display = "";
			rightTip.style.display = "none";
		}else{
			leftTip.style.display = "none";
			rightTip.style.display = "";
		}
	}

	function toggle(){
		if(menuSidePane.get("state") == "open"){
			menuSidePane.close();
		}else{
			menuSidePane.open();
		}
	}

	function itemSelected() {
		console.log(this.label + ' selected');
	}

	function createMenu(){

		var sidePaneDiv = dom.byId("sidePane");
		var menuDiv     = dom.byId("menu");

		menuSidePane = new SidePane({
			mode:    'push',
			position: 'start'
		}, sidePaneDiv);

		var menuView = new View({
			style: "height:100%"
		}, menuDiv);

		var menuList = EdgeToEdgeList({
			style: "height:100%"
		});
		menuView.addChild(menuList);

		menuList.addChild( createMenuItem("Home") );
		menuList.addChild( createMenuItem("Customers") );
		menuList.addChild( createMenuItem("Orders") );
		menuList.addChild( createMenuItem("Employees") );
		menuList.addChild( createMenuItem("Suppliers") );
		menuList.addChild( createMenuItem("My Stats") );
		menuList.addChild( createMenuItem("Admin") );
		menuList.addChild( createMenuItem("Options") );
		menuList.addChild( createMenuItem("System") );

		menuSidePane.startup();
		menuView.startup();

		return menuView;
	}

	function createMenuItem(label){

		var menuItem = new ListItem({
			label: label,
			onClick: toggle,
			clickable: true,
			noArrow: true
		});

		return menuItem;
	}

	function createPage() {

		var pageDiv = dom.byId("page");

		var pageView = new View({
			style: "height:100%; width:100%"
		}, pageDiv);

		var heading = new Heading({
			label: "Home"
		});
		pageView.addChild(heading);

		var menuButton = new ToolBarMenuButton({
			onClick: toggle
		});
		heading.addChild(menuButton);

		var newButton = new ToolBarButton({
			moveTo: "productDetails",
			label: "New",
			style: "float:right"
		});
		heading.addChild(newButton);

		return pageView;
	}

	function createProductDetailPage() {

		var pageDiv = dom.byId("productDetails");

		var pageView = new View({
			style: "height:100%; width:100%"
		}, pageDiv);

		var heading = new Heading({
			label: "Product Details"
		});
		pageView.addChild(heading);

		var backButton = new ToolBarButton({
			moveTo: "page",
			transitionDir: -1,
			label: "Back",
			arrow: "left"
		});
		heading.addChild(backButton);

		return pageView;
	}

	function createTabBar() {

		var tabBar = new TabBar({
			fill: "always",
			barType:"segmentedControl",
			//syncWithViews: true
		});

		var tabBarButton;
		tabBarButton = new TabBarButton({
			selected: true,
			label: "New",
			moveTo: "view1"
		});
		tabBar.addChild(tabBarButton);

		tabBarButton = new TabBarButton({
			label: "Recent",
			moveTo: "view2"
		});
		tabBar.addChild(tabBarButton);

		tabBarButton = new TabBarButton({
			label: "Old",
			moveTo: "view3"
		});
		tabBar.addChild(tabBarButton);

		topic.subscribe("/dojox/mobile/viewChanged", function(e){

			//We've been passed the view we just moved to, get the ID
			var viewId = e.id;

			//Loop over all the buttons in the tab bar setting "selected"
			//as appropriate based on the view we moved to
			var buttons = tabBar.getChildren();
			for (var i = 0; i < buttons.length; i++) {
				var button = buttons[i];
				console.log(button.moveTo);
				if(button.moveTo == viewId) {
					button.set("selected", true);
				}
				else {
					button.set("selected", false);
				}
			}
		});

		return tabBar;	
	}

	function createView(id, content){

		var view = new SwapView({
			id: id
		});

		if(content){
			var content = new ContentPane({
				content: content
			});

			view.addChild(content);
		}

		return view;
	}

	function createProductStore() {

		var data = [
			{
				id: 1,
				label: "Chef Anton's Cajun Seasoning",
				icon: "./NorthWind/Products/28x28/1.jpg",
				moveTo: "productDetails"
			},{
				id: 2,
				label: "Chef Anton's Gumbo Mix",
				icon: "./NorthWind/Products/28x28/2.jpg",
				moveTo: "productDetails"
			},{
				id: 3,
				label: "Grandma's Boysenberry Spread",
				icon: "./NorthWind/Products/28x28/3.jpg",
				moveTo: "productDetails"
			},{
				id: 4,
				label: "Uncle Bob's Organic Dried Pears",
				icon: "./NorthWind/Products/28x28/4.jpg",
				moveTo: "productDetails"
			},{
				id: 5,
				label: "Northwoods Cranberry Sauce",
				icon: "./NorthWind/Products/28x28/5.jpg",
				moveTo: "productDetails"
			},{
				id: 6,
				label: "Mishi Kobe Niku",
				icon: "./NorthWind/Products/28x28/6.jpg",
				moveTo: "productDetails"
			}
		];

		return Observable(new Memory({idProperty:"id", data: data}));
	}


	ready(function(){


		/*
		 *  Create Menu
		 */
		var menuView  = createMenu();


		/*
		 *  Create Product View
		 */
		var pageView  = createPage();
		var tabBar    = createTabBar();
		var viewOne   = createView("view1");
		var viewTwo   = createView("view2", "Pane 2");
		var viewThree = createView("view3", "Pane 3");

		//Create a data store of products
		var store = createProductStore();

		//Create the List
		var list = new RoundRectStoreList({
				store:store,
				query:{},
				transition:"slide"
		});

		viewOne.addChild(list);

		pageView.addChild(tabBar);

		pageView.addChild(viewOne);
		pageView.addChild(viewTwo);
		pageView.addChild(viewThree);
		pageView.startup();


		/*
		 *  Create Product Detail View
		 */
		 var productDetailView = createProductDetailPage();
		 productDetailView.startup();

	});
});