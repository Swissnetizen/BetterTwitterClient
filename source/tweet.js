
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



//Tweet kind based on tutorial tweet kind.

enyo.kind({
  name: "Sam.Tweet",
  kind: "onyx.Item",
  components: [
      //The container.
     
          //Picture of the person who posted the tweet
          {tag: "img", name: "Picture", classes: "Tweet-Image",},
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
        Picture: "",
        handle: "",
        UserName: "",
        Message: "",
  },
  
   create: function() {
        this.inherited(arguments);
        this.PictureChanged();
        this.handleChanged();
        this.UserNameChanged();
        this.MessageChanged();
  },
   
    PictureChanged: function() {
        this.$.Picture.setAttribute("src", this.Picture);
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