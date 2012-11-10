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
          {name: "text", classes: "Tweet-Message",},

    ],
    
    
    
    //Published properties
    published: {
        picture: "",
        handle: "",
        UserName: "",
        text: "",
  },
  
   create: function() {
        this.inherited(arguments);
        this.pictureChanged();
        this.handleChanged();
        this.UserNameChanged()
        this.textChanged();
  },
   
   pictureChanged: function() {
        this.$.picture.setAttribute("src", this.icon);
  },

  handleChanged: function() {
        //Checks if the Handle and User's Name are the same, it doesn't make  sense to show the same thing twice
        if (this.handle !== this.UserName) {
            this.$.handle.setContent(" @" + this.handle + "\n");
        } else if (this.handle === this.UserName) {
            this.$.handle.setContent("");
        }
  },

  textChanged: function() {
        this.$.text.setContent(this.text);
  },
  UserNameChanged: function() {
        if (this.UserName !== this.handle) {
            this.$.UserName.setContent(this.UserName + ":");
        } else if (this.UserName === this.handle) {
            this.$.UserName.setContent("@" + this.UserName + ":");
        }
}
  
  
});