enyo.kind({
    //Kind name and couple of options
	name: "App",
	fit: true,
    kind:"Panels",
    classes:"app-panels onyx",
    arrangerKind: "CollapsingArranger",
	
    
    
    
    
    //Components
    components: [ 
        //The 1st Panel that will contain a scoller to show the tweets, the toolbar will contain the view picker.
        {name: "Panel1", layoutKind: "FittableRowsLayout", classes: "Panel1 onyx", components: [ 
            {kind:"onyx.MoreToolbar",  components: [ 
                //The search box
                {kind: "onyx.InputDecorator", components: [
                    //Input
                    {kind: "onyx.Input", name: "SearchTerm", placeholder: "Search", onkeydown: "searchOnEnter",},
                        //The image that makes the search box more pleasing.
                        {kind: "Image", src: "http://enyojs.com/tutorial/onyx/search-input-search.png", ontap: "Search",},
                //End of SearchTerm
                ],},
                //End of more toolbar
                ],},
                {kind: "enyo.Scroller",name: "TweetList", fit: true,}
        //End of first Panel        
        ],},
        
        
        
        
        //The second Panel will show the tweet, images and comments. 
        {name: "Panel2", classes: "onyx", components: [ 
            //More toolbar.
           
        {kind:"onyx.MoreToolbar", components: [ 
                {kind: "onyx.Grabber", ontap: "SwitchPanel",}, {content: "Panel2"}
                //End of More Toolbar
                ],  },
                {kind: "Tweet", handle: "Samarthwiz", text: "Hello world!", icon: "http://a0.twimg.com/profile_images/1276099630/f23a8e27-71cf-4140-8e4a-6ed6338441f2_normal.png",}
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
    

 //Prepeares a tweet and adds it to tweetlist  
 addTweet: function(inResult) {
    this.createComponent({
      kind: Tweet,
      container: this.$.TweetList,
      icon: inResult.profile_image_url_https,
      UserName: inResult.from_user_name,
      handle: inResult.from_user,
      text: inResult.text
    })
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
      //Creates a new service; maybe I should use enyo.webservice instead.
      var service = new enyo.JsonpRequest({url: "https://search.twitter.com/search.json", callback: "callback"});
    service.response(enyo.bind(this, "ShowSearchResults"));
    service.go({q: Query});
},
    //Shows the search results on screen; code copied form enyo tutorial todo: Rewrite code.
    ShowSearchResults: function(inRequest, inResponse) {
        //Checking if there is any data in "inResponse"
        console.log(inResponse);
        if (inResponse) {
            this.$.TweetList.destroyClientControls();
            enyo.forEach(inResponse.results, this.addTweet, this);
        this.$.TweetList.render();
        }
        // If there is no data in inResponse then return
        else {return;}
    }
            

});
