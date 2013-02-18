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
//Loads Modules
var Types = require("./Types");

//Gets the mime type from an extension
var GetMimeType = function(Extension) {
    return Types.Mime[Extension];
};
//Gets the extension of the file; only the last one, for example if you did: GetExtension("Spam.tar.gz") you would get ".gz" not "tar.gz"
var GetExtension = function(FileName) {
    return FileName.substring(FileName.lastIndexOf(".")+1, FileName.length);
};


//Gets the encoding from the extension; Converts extension then retrives encoding from object
var GetEncodingFromExtension = function(Extension) {
    return Types.Encoding[GetMimeType(Extension)];
};
    
    

//Gets encoding from the MIME/type
var GetEncodingFromMimeType = function(MimeType) {
    return Types.Encoding[MimeType];
};
//Exports functions
exports.GetMimeType = GetMimeType;
exports.GetEncodingFromMimeType = GetEncodingFromMimeType;
exports.GetEncodingFromExtension = GetEncodingFromExtension;
exports.GetExtension = GetExtension;

