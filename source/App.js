enyo.kind({
    //Kind name and couple of options
	name: "App",
	fit: true,
    kind:"Panels",
    classes:"app-panels, onyx",
    arrangerKind: "CollapsingArranger",
	//Components
    components: [ 
        //The 1st Panel that will contain a scoller to show the tweets, the toolbar will contain the view picker.
        {name: "Panel1", components: [ 
            {kind:"onyx.MoreToolbar", components: [ 
                {kind: "onyx.Grabber",}, {content: "Panel1"}
                ],  }   ],    },
        //The second Panel will show the tweet, images and comments. 
        {name: "Panel2", components: [ 
            //More toolbar.
        {kind:"onyx.MoreToolbar", components: [ 
                {kind: "onyx.Grabber",}, {content: "Panel2"}
                ],  }   ],  },
 ],
    

});
