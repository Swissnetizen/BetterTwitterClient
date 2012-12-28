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
            {kind: "onyx.Input", name: "SearchTerm", placeholder: "Search", onkeydown: "SearchOnEnter",},
                //The image that makes the search box more pleasing.
            {tag: "Image", src: "assets/search-input-search.png", ontap: "Search",},
                //End of SearchTerm
        ],},
        // The List
        {kind: "enyo.List", count: 0, onSetupItem: "TweetSetup", name: "SearchPanelTweetList", fit: true, touchOverscroll: false, components:[
            {kind: "Sam.Tweet", name: "Tweet2", ontap: "SendTweetTap"}
        ], }
        
    ],        
    
    
    
    published:{
      Service:"",  
    },



        //Function to allow users to use the enter key to search
    SearchOnEnter: function(inSender, inEvent) {
        //Apearntly the enter key keycode is 13
        if (inEvent.keyCode === 13) {
        this.Search();
        return true;
        }
    },
    
    
    
    Search: function () {
        this.Service.Search(this.$.SearchTerm.hasNode().value, function(inRequst, inResponse) {console.log(inResponse.results);});
    }
    
    
    
  
    


});