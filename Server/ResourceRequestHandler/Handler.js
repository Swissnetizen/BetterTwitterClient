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

//Loading modules

var fs = require("fs");
var url = require("url");
var Tools = require("./Functions");


//Defining variables
var content = "";
var code = 500;
var MimeType;
var Encoding;
var PathName;
//What a log should look like
var ToLog = {
    "RecivedAt": 0,
    "Sender": "",
    "ItemRequested": {"Name": "", "MimeType": "", "Extension": "", "OriginalRequest": "", "Encoding": ""},
    "Response": {"MimeType": "", "code": 0, "SentAt": 0,},

    "Errors": []
};
var RecivedAt = 0;
var SentAt = 0;
//function to handle most to all web requests
var HandleRequest = function(request, response) {
    RecivedAt = Date.now() / 1000;
    //Gets request
    ToLog = { "RecivedAt": 0, "Sender": "", "ItemRequested": {"Name": "", "MimeType": "", "Extension": "", "OriginalRequest": "", "Encoding": ""}, "Response": {"MimeType": "", "code": 0, "SentAt": 0,}, "Errors": []};
    ToLog.RecivedAt = RecivedAt;
    ToLog.Sender = request.connection.from;
    PathName = url.parse(request.url).pathname;
    ToLog.ItemRequested.OriginalRequest = PathName;
    //Corrects Request
    PathName = PathName.charAt(0) === "/" && PathName.length === 1 ? "index.html" : PathName;
    PathName = PathName.charAt(0) === "/" ? PathName.substring(1, PathName.length) : PathName;
    ToLog.ItemRequested.Name = PathName;
    //Process the FileNames and gets the mime type    
    MimeType = Tools.GetMimeType(Tools.GetExtension(PathName));
    ToLog.ItemRequested.MimeType = MimeType;
    Encoding = Tools.GetEncodingFromMimeType(MimeType);
    ToLog.ItemRequested.Encoding = Encoding;

   //Reads the file

    fs.readFile(PathName, Encoding, function(error, file) {
    
        if (error) {
            code = 500;
            content = code + " " + error;
            console.log(error);
            ToLog.Errors.push(error);
            MimeType = "text/plain";
            Encoding = "utf8";
            if (error.errno === 34) {
                code = 404;
                content = code + " " + error;
                console.log(error);
                ToLog.Errors.push(error);
                MimeType = "text/plain";
                Encoding = "utf8";
            } else {
                code = 500;
                content = code + " " + error;
                console.log(error);
                ToLog.Errors.push(error);
                MimeType = "text/plain";
                Encoding = "utf8";
            }
        
        } else if (file) {
            content = file;
            code = 200;
            
        }
   

        response.writeHead(code, {"Content-Type": MimeType, 'Access-Control-Allow-Origin': '*'});
        response.write(content, Encoding);
        response.end();
        SentAt = Date.now() / 1000;
        
        
        
    });
    ToLog.Response.MimeType = MimeType;
    ToLog.Response.code = code;
    ToLog.Response.SentAt = SentAt;
    console.log(ToLog);
};


exports.Handler = HandleRequest;
