//   Copyright 2012 Samarth AGARWAL
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

enyo.kind({
    name: "Sam.SearchPanel",
    kind: "enyo.Control",
    data: [],
    layoutKind: "FittableRowsLayout",
    classes: "onyx",
    //Events this component will produce
    events: {
        onTweetTap: "",
    },
    


    //The components
    components: [
        //The webservice used to get the tweets. Note this is the key-less version, full fuctionality might not be avalible 
        {kind: "enyo.WebService", jsonp: true, onResponse: "ShowSearchResults", url: "https://search.twitter.com/search.json", name: "SearchWebService"},
        //The search box
        {kind: "onyx.InputDecorator", classes:"SearchTerm", components: [
                //Input
            {kind: "onyx.Input", name: "SearchTerm", placeholder: "Search", onkeydown: "searchOnEnter",},
                //The image that makes the search box more pleasing.
            {tag: "Image", src: "assets/search-input-search.png", ontap: "Search",},
                //End of SearchTerm
        ],},
        // The List
        {kind: "enyo.List", count: 0, onSetupItem: "TweetSetup", name: "SearchPanelTweetList", fit: true, touchOverscroll: false, components:[
            {kind: "Sam.Tweet", name: "Tweet2", ontap: "SendTweetTap"}
        ], }
        
    ],        





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
        //Sends the request
        this.$.SearchWebService.send({q: this.$.SearchTerm.hasNode().value});
    
    },
    //Shows the search results on screen; code based on enyo tutorial code, code rewiten
    ShowSearchResults: function(inRequest, inResponse) {
        //Checking if there is any data in "inResponse"
        console.log(inResponse);
        if (inResponse.data) {
            this.Data = inResponse.data.results;
            this.$.SearchPanelTweetList.setCount(this.Data.length);
            this.$.SearchPanelTweetList.reset();

        } else {
            // If there is no data in inResponse then return
            return;
            }
    },    
    
   SendTweetTap: function(inSender, inEvent) {
       //Sends the TweetTap event for the main app to deal with!
        var Index = inEvent.index;
        inEvent.Data = this.Data[Index];
        this.doTweetTap(inEvent);
   },         


});