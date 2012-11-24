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
        //The webservice used to get the tweets, Note this is the key-less version, full fuctionality might not be avalible 
        {kind: "enyo.WebService", jsonp: true, onResponse: "ShowSearchResults", url: "https://search.twitter.com/search.json", name: "SearchWebService"},
        //The search box
        {kind: "onyx.InputDecorator", classes:"SearchTerm", components: [
                //Input
            {kind: "onyx.Input", name: "SearchTerm", placeholder: "Search", onkeydown: "searchOnEnter",},
                //The image that makes the search box more pleasing.
            {tag: "Image", src: "assets/search-input-search.png", ontap: "Search",},
                //End of SearchTerm
        ],},
        // The scroller
        {kind: "enyo.List", count: 0, onSetupItem: "TweetSetup", name: "SearchPanelTweetList", fit: true, touchOverscroll: false, components:[{kind: "Sam.Tweet", name: "Tweet2", onTap: "SendTweetTap"}] }
        
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
    
   SendTweetTap: function(inEvent) {
       //Sends the TweetTap event for the main app to deal with!
       this.doTweetTap(inEvent);
   },         


});