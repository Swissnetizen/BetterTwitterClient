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

//BigTweet Kind that wil display more information

enyo.kind({
    kind: "enyo.Control",
    name: "Sam.BigTweet",
    
    components: [
        {kind: "Sam.Tweet", name: "MainComponent"},
        {kind: "GTS.DividerDrawer", caption: "Images",}
    ],

    published: {
        Picture: "",
        Handle: "",
        UserName: "",
        Message: "",
    },
  
    create: function() {
        this.inherited(arguments);
        this.PictureChanged();
        this.HandleChanged();
        this.UserNameChanged();
        this.MessageChanged();
    },
   
    PictureChanged: function() {
        this.$.MainComponent.setPicture(this.Picture);
    },

    HandleChanged: function() {
        this.$.MainComponent.setHandle(this.Handle);
      
        
    },

    MessageChanged: function() {
        this.$.MainComponent.setMessage(this.Message);
    },
    UserNameChanged: function() {
        this.$.MainComponent.setUserName(this.UserName + ":");
     
    },







});
    