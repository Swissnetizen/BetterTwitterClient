enyo.kind({
    //Informations
    name: "Sam.TweetPanel",
    kind: "enyo.Control",
    //Published properties
    published: {
        Data:"",
    },
    //Stuff to do when created
    create: function() {
        this.inherited(arguments);
        this.DataChanged();    
        
    },
    
    
    //Components
    components: [
        
        {kind: "Sam.BigTweet", name: "BigTweet"},
        
        ],
    //Clone of TweetSetup, to do : DRY
    DataChanged: function(inSender, inEvent) {
        var Data = this.Data;
        var Component = this.$.BigTweet;
        Component.setPicture(Data.profile_image_url_https);
        Component.setUserName(Data.from_user_name);
        Component.setHandle(Data.from_user);
        Component.setMessage(Data.text);
        Component.render();
    },
        
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    });