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

//Tweet kind based on tutorial tweet kind.

enyo.kind({
  name: "Sam.Tweet",
  kind: "onyx.Item",
  components: [
      //The container.
     
          //Picture of the person who posted the tweet
          {tag: "img", name: "Picture", classes: "Tweet-Image",},
          //Name of the person who posted the tweet
          { tag: "b", name: "UserName"}, {name: "Handle", classes: "Tweet-Handle", tag: "div",},
          //The tweet itself
          {name: "Message", classes: "Tweet-Message",},

    ],
    //Handlers
    Handlers: {
        ontap: "OnTap",
    },

   
    //Published properties
    published: {
        Picture: "",
        Handle: "",
        UserName: "",
        Message: "",
        Selected: true,
  },
  
   create: function() {
        this.inherited(arguments);
        this.PictureChanged();
        this.HandleChanged();
        this.UserNameChanged();
        this.MessageChanged();
  },
   
    PictureChanged: function() {
        this.$.Picture.setAttribute("src", this.Picture);
  },

     HandleChanged: function() {
        //Checks if the Handle and User's Name are the same, it doesn't make  sense to show the same thing twice
        if (this.Handle !== this.UserName && this.Handle !== "") {
            this.$.Handle.setContent(" @" + this.Handle + "\n");
        } else if (this.Handle === this.UserName) {
            this.$.Handle.setContent(" ");
        }
  },

    MessageChanged: function() {
        this.$.Message.setContent(this.Message);
  },
    UserNameChanged: function() {
        if (this.UserName !== this.Handle) {
            this.$.UserName.setContent(this.UserName + ":");
        } else if (this.UserName === this.Handle) {
            this.$.UserName.setContent("@" + this.UserName + ":");
        }
},

    
    OnTap: function(inSender, inEvent) {
        console.log(inSender);
        Sam.Tweet.addRemoveClass(".onyx-item-selected ", this.Selected);
        console.log(inEvent);
        
    },
    
    SelectedChanged: function(inSender, inEvent) {
        this.addRemoveClass(".onyx-item-selected ", this.Selected);
        console.log("Selected!");
        this.render();
    }
});