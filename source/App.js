
//Copyright (c) 2012 Samarth AGARWAL 
//Permission is hereby granted, free of charge, 
//to any person obtaining a copy of this software and associated documentation files (the "Software"), 
//to deal in the Software without restriction, 
//including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
//and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
//EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
//IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
//DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
//ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



enyo.kind({
    //Kind name and couple of options
	name: "App",
	fit: true,
    kind:"Panels",
    classes:"app-panels onyx",
    arrangerKind: "CollapsingArranger",
    Data: [],
	
    
    
    
    
    //Components
    components: [ 
        //The 1st Panel that will contain a scoller to show the tweets, the toolbar will contain the view picker.
        {name: "Panel1", layoutKind: "FittableRowsLayout", classes: "Panel1 onyx", components: [ 
            {kind:"onyx.MoreToolbar",  components: [ 
                {kind:"onyx.Menu", content: "Hello"}
                ],},
                //End of more toolbar
               
                  //The search box
            {kind: "onyx.InputDecorator", classes:"SearchTerm", components: [
                //Input
                {kind: "onyx.Input", name: "SearchTerm", placeholder: "Search", onkeydown: "searchOnEnter",},
                    //The image that makes the search box more pleasing.
                {tag: "Image", src: "assets/search-input-search.png", ontap: "Search",},
                //End of SearchTerm
            ],},
        {kind: "enyo.List", count: 0, onSetupItem: "TweetSetup", name: "TweetList", fit: true, touchOverscroll: false, components:[{kind: "Sam.Tweet", name: "Tweet2"}] }
        
        //End of first Panel        
        ],},
        
        
        
        
        //The second Panel will show the tweet, images and comments. 
        {name: "Tweet", classes: "onyx", components: [ 
            //More toolbar.
           
            {kind:"onyx.MoreToolbar", components: [ 
                {kind: "onyx.Grabber", ontap: "SwitchPanel",}, {content: "Tweet"}
                //End of More Toolbar
            ],  },
            //BigTweet
            {kind: "Sam.BigTweet"}
            
            
               //End of Panel2
                ],  },
 
    ],
 
    
    
    //Function to Switch the current pannel to the previous one.
    SwitchPanel: function() {
        //Makes sure we are not at index 0, wouldn't want to cause an exeption
        if (this.index === 0) {
            return false;
        } else {
            this.setIndex(this.index-1);
            return true;
        }
    },
    
    TweetSetup: function(inSender, inEvent) {
        var Data = this.Data[inEvent.index];
        var Component = this.$.Tweet2;
        Component.setPicture(Data.profile_image_url_https);
        Component.setUserName(Data.from_user_name);
        Component.setHandle(Data.from_user);
        Component.setMessage(Data.text);
        
    },
    
    //Function to allow users to use the enter key to search
    searchOnEnter: function(inSender, inEvent) {
        //Apearntly the enter key keycode is 13
        if (inEvent.keyCode === 13) {
        this.Search();
        return true;
        }
  },
  //Function that retrives data from twitter
  Search: function(inSender, inEvent) {
        //Gets the query
        var Query = this.$.SearchTerm.hasNode().value;
        //Creates a new service; perhaps I should use enyo.webservice instead.
        var service = new enyo.JsonpRequest({url: "https://search.twitter.com/search.json", callback: "callback"});
        service.response(enyo.bind(this, "ShowSearchResults"));
        service.go({q: Query});
    },
    //Shows the search results on screen; code copied form enyo tutorial todo: Rewrite code.
    ShowSearchResults: function(inRequest, inResponse) {
        //Checking if there is any data in "inResponse"
        console.log(inResponse);
        if (inResponse) {
            this.Data = inResponse.results;
            this.$.TweetList.setCount(this.Data.length);
            this.$.TweetList.reset();

        } else {
            // If there is no data in inResponse then return
            return;
            }
    },    
    
            

});
