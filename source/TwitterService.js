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

//Component to provide access to twiter web services(replacement to standalone twitter services)
enyo.kind({
    //Information for this kind.
    name: "Sam.TwitterService",
    kind: "enyo.Component",
    //Global varibles.
    IdentifersNum: 0,

 
    
    
    

    Search: function(Query, Callback) {
//        Method for requesting search requests from twitter
        
        //Creates the request object.
        var Request = new enyo.JsonpRequest({
            url: "https://search.twitter.com/search.json",
        });
        //Prepares the Request Ticket, like the ticket with the number you get at a support centre to wait for.

        //Sets the onResponse fuction

        Request.response(Callback);
        //Starts the request.
        Request.go({ q: Query });
        //Returns the requestTicket
        return true;
    }

});