
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

//Base for SearchPanel and all other tweetlist kinds
enyo.kind({
    name: "Sam.TweetList",
    kind: "enyo.Control",
    
    components: [
        {kind: "enyo.List", count: 0, onSetupItem: "TweetSetup", name: "SearchPanelTweetList", fit: true, touchOverscroll: false, components:[
                {kind: "Sam.Tweet", name: "Tweet2", ontap: "SendTweetTap"}
            ], 
        }
    ],
    
    
    
    events: {
        onTweetTap:""
    },
    
    published: {
        Tweets:[]
    }
    TweetSetup: function(inSender, inEvent) {
        var Data = this.Tweets[inEvent.index];
        var Component = this.$.Tweet2;
        Component.setPicture(Data.profile_image_url_https);
        Component.setUserName(Data.from_user_name);
        Component.setHandle(Data.from_user);
        Component.setMessage(Data.text);
        
    },
    

  //Function that retrives data from twitter

    //Shows the search results on screen; code based on enyo tutorial code, code rewiten
    onTweetsChanged: function() {
        //Checking if there is any data in "inResponse"

        this.$.SearchPanelTweetList.setCount(this.Tweets.length);
        this.$.SearchPanelTweetList.reset();

    },    
    
   SendTweetTap: function(inSender, inEvent) {
       //Sends the TweetTap event for the main app to deal with!
        var Index = inEvent.index;
        inEvent.Data = this.Data[Index];
        this.doTweetTap(inEvent);
   },