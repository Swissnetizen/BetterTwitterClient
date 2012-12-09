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
    //Kind name and couple of options.
	name: "App",
	fit: true,
    kind:"Panels",
    classes:"app-panels onyx",
    arrangerKind: "CollapsingArranger",
    //Components
    components: [ 
        {kind: "Sam.TwitterService", name: "Service"},
        //The 1st Panel that will contain a scoller to show the tweets, the toolbar will contain the view picker.
        {name: "Panel1", layoutKind: "FittableRowsLayout", classes: "Panel1 onyx", components: [ 
                {kind:"onyx.MoreToolbar",  components: [ 
                    {kind:"onyx.Menu", content: "Hello"}
                    ],},
                    //End of more toolbar
                  {kind: "Sam.SearchPanel", fit: true, onTweetTap: "TweetTapped", name: "dfhgfght"}

        //End of first Panel        
            ],
        },
        //The second Panel will show the tweet, images and comments. 
        {name: "Tweet", classes: "onyx", components: [ 
            //More toolbar.
           
            {kind:"onyx.MoreToolbar", components: [ 
                {kind: "onyx.Grabber", ontap: "SwitchPanel",}, {content: "Tweet"}
                //End of More Toolbar
            ],  },
            {kind: "Sam.TweetPanel", name: "TweetPanel"},
            //End of Panel2
            ],  
        },
    ],
    
    //Function to Switch the current pannel to the previous one.
    SwitchPanel: function() {
        //Makes sure we are not at index 0, wouldn't want to cause an exeption
        this.setIndex(this.getIndex() === 0 ? 0 : this.getIndex()-1);
    },
    //Called when a tweet is tapped on any of the panels
    TweetTapped: function(inSender, inEvent) {
        this.$.TweetPanel.Data = inEvent.Data;
        this.$.TweetPanel.DataChanged();
    }

});
