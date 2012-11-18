//Tweet kind based on tutorial tweet kind.

enyo.kind({
  name: "Sam.Tweet",
  kind: "onyx.Item",
  components: [
      //The container.
     
          //Picture of the person who posted the tweet
          {tag: "img", name: "picture", classes: "Tweet-Image",},
          //Name of the person who posted the tweet
          { tag: "b", name: "UserName"}, {name: "handle", classes: "Tweet-Handle", tag: "div",},
          //The tweet itself
          {name: "Message", classes: "Tweet-Message",},

    ],
    //Handlers
    handlers: {
        ontap: "OnTap",
    },

   
    //Published properties
    published: {
        picture: "",
        handle: "",
        UserName: "",
        Message: "",
  },
  
   create: function() {
        this.inherited(arguments);
        this.pictureChanged();
        this.handleChanged();
        this.UserNameChanged()
        this.MessageChanged();
  },
   
    pictureChanged: function() {
        this.$.picture.setAttribute("src", this.icon);
  },

     handleChanged: function() {
        //Checks if the Handle and User's Name are the same, it doesn't make  sense to show the same thing twice
        if (this.handle !== this.UserName && this.handle !== "") {
            this.$.handle.setContent(" @" + this.handle + "\n");
        } else if (this.handle === this.UserName) {
            this.$.handle.setContent(" ");
        }
  },

    MessageChanged: function() {
        this.$.Message.setContent(this.Message);
  },
    UserNameChanged: function() {
        if (this.UserName !== this.handle) {
            this.$.UserName.setContent(this.UserName + ":");
        } else if (this.UserName === this.handle) {
            this.$.UserName.setContent("@" + this.UserName + ":");
        }
},
    OnTap: function(inSender, inEvent) {
        console.log(inSender);
        
        console.log(inEvent);
        
    },
    
});