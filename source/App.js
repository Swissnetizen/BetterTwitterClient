
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
                {kind:"onyx.Menu", content: "Hello"}
                ],},
                //End of more toolbar
              {kind: "Sam.SearchPanel", fit: true, onTweetTap: "TweetTaped",}

        //End of first Panel        
        ],},
        
        
        
        
        //The second Panel will show the tweet, images and comments. 
        {name: "Tweet", classes: "onyx", components: [ 
            //More toolbar.
           
            {kind:"onyx.MoreToolbar", components: [ 
                {kind: "onyx.Grabber", ontap: "SwitchPanel",}, {content: "Tweet"}
                //End of More Toolbar
            ],  },
            {kind: "Sam.TweetPanel", name: "TweetPanel"},
            
            
            
               //End of Panel2
                ],  },
 
    ],
    
    
    //Function to Switch the current pannel to the previous one.
    SwitchPanel: function() {
        //Makes sure we are not at index 0, wouldn't want to cause an exeption
    this.setIndex(this.getIndex() === 0 ? 0 : this.getIndex()-1);
    },
    
    TweetTaped: function(inSender, inEvent) {
        this.$.TweetPanel.Data = inEvent.Data;   
    }

});
