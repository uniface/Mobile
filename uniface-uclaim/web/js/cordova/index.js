/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
		console.log(navigator.camera);
    },
	
	takePic: function() {
	    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
	                                destinationType: Camera.DestinationType.FILE_URI
	                                });
    
	    function onSuccess(imageData) {
	        var test = "data:image/jpeg;base64," + imageData;
	        alert(test);
	    }
    
	    function onFail(message) {
	        alert('Failed because: ' + message);
	    }
	},
	
	scanme: function() {
	    cordova.plugins.barcodeScanner.scan(
	       function (result) {
   			//if web storage is supported, save the lastUrl into localStorage.
			if(typeof(Storage) !== "undefined") {
				localStorage.setItem("lastUrl", result.text);
   			} else {
   				//Current do nothing
   			}
			
			window.location = result.text;
	           // alert("We got a barcode\n" +
// 	                 "Result: " + result.text + "\n" +
// 	                 "Format: " + result.format + "\n" +
// 	                 "Cancelled: " + result.cancelled);
	       }, 
	       function (error) {
	           alert("Scanning failed: " + error);
	       }
	    );
	},
	
	reload: function() {
		window.location = localStorage.getItem("lastUrl");
	}
};
