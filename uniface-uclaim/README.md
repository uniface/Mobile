# UClaim #

UClaim is a basic mobile demonstration following the basic action of making an Insurance claim from a mobile device. An ancilliary web function delivers the insurance home dashboard function.
This version demonstrates usage of three external JavaScript libraries polymer, ChocolateChip, and bootstrap.

## Dependencies ##

UClaim has been written and tested with:

 * Uniface 9.7 pre-release
 * SQLite
 
 Inherent in the software example is a dependency on the following JavaScript libraries:
 
 * Polymer
 * ChocolateChip
 * Bootstrap
 * AngularJS
 * Jquery
 
 We also acknowledge the use of:
 AdminLTE version 2.2.0
 ionicons-2.0.1     Copyright (c) 2014 Drifty (http://drifty.com/)
 qr-code            Copyright (c) 2012 davidshimjs
 iOS Images         Copyright SarahMockford
 
 ## Setup ##

This project can be downloaded and setup standalone.

### Setup UClaim as a standalone project ###
These instructions allow you to create a new stand alone project on your local machine.

 * For these steps you'll need the Project Setup Tool. Follow the instructions here https://github.com/uniface/Development-Tooling/tree/master/uniface-project-setup-tool to setup this tool before continuing
 * Clone the UClaim repository onto your local machine. For these steps we'll assume it's been cloned into C:\Projects\uclaim
 * Open a command prompt in the root of the project and type "projectsetup97" to invoke the Project Setup Tool
 * Work through the setup process checking the details picked up by the setup tool make sense. Ignore referencies to userid and password they are not used.
 * When complete click on one of the presentation links
 
## Mobile setup ##
Under the download folder U_Scan you will find a ScannerApp-debug.apk for Android. To install move or email this file to your mobile Android device and install by doubleclicking on that file on the device.
When run the app presents two options to reload an existing URL or to scan a QR-Code. To connect your device to your PC you must first change the desktop link url from localhost for the PC name to the actual PC host name. When this is done relaunching the desktop app and logging in with the user ID 'admin' password 'password' will on the menu bar present an Android qr-code link. When selected the necessary qr code to connect to this PC will be presented.
Scan this code with your Android device and the phone will be directed to the correct URL for this PC.

Note the correct URL is dependent on the correct PC host name used in the desktop and may require disabling of, or modification of, your access rights in your PC firewall software. If available try pinging the PC from your Android device to verrify connection. 
 
## Contributing to the project ##

To set up the project for development follow the steps above to create uOutlook as a standalone project. Once complete the only other tool required is the Version Control project, allowing granular exports of source code suitable for use with BitBucket. To set this up follow these steps:

 * Visit https://github.com/uniface/Development-Tooling/tree/master/uniface-version-control and follow the setup instructions to download the Version Control tool
 * Open the IDE and using the Utilities->Import menu import the file FILESYNC_Menu.xml. Assuming you extracted the Version Control tool to C:\\UnifacePackages, this would be found in C:\\UnifacePackages\\VersionControl\\imports
 * Compile the additional menu, which will in turn compile the menu we just imported
 * In the IDE go to Utilities->Preferences->General and tick the check box "Enable Additional Menu"
 * Now that the additional menu is enabled we can go to Utilities->Additional->Settings and using the browse button next to "Uniface Source Directory" select ./src. This points the tool at our source code.
 * Everything is now setup and we can go to Utilities->Additional->Project to verify that everything is setup correctly. Visiting this screen will sync your Uniface repository with the src folder. If it's working correctly then you should see the contents of this folder in the tree view.

## Contributors ##
* James Roger
* George Mockford
* Dave Akerman
