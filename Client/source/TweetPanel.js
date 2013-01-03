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
    //Information
    name: "Sam.TweetPanel",
    kind: "enyo.Control",
    //Published properties
    published: {
        Data:"",
//        Reset: DataChanged(),
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