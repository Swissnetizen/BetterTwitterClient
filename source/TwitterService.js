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

//Component to provide acces to twiter web services(replacement to standalone twitter services)
enyo.kind({
    name: "Sam.TwitterService",
    kind: "enyo.Component",
    //Components, not shown on screen.
    components: [
        {kind: "enyo.WebService", jsonp: true, onResponse: "ShowSearchResults", url: "https://search.twitter.com/search.json", name: "SearchWebService"},
    ],
    
    events: {
        
    },
    
    //Initiates a search request
    StartSearchRequest(Query) {
        var request = new enyo.JsonpRequest({
            url: "http://search.twitter.com/search.json",
        });
        
        
        request.response(function(inSender, inEvent) {
            
        });
        request.go({ q: Query });
    }

});