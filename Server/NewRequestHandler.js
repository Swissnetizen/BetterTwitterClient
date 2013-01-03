//Validates the Request Type and makes sure it is a type that this server can handle.
var ValidateRequestType = function(Type) {
    var Result;
    if (Type === 'get' || Type === 'post') {
        Result = true;
    } else if (Type ==! 'get' || Type ==! 'post' || Type ==! 'put' || Type ==! 'delete') {
        Result = new TypeError('Unknown type');
    } else if (Type === 'put' || Type === 'delete') {
        Result = new TypeError('Incorrect type: only types post and get are accepted.');
    }
    return Result;    
};
//Validates a URL in the request object.
var ValidateRequestPath = function(Path) {
    //Todo: Actually evaluate the path!
    return true;
};
//Makes sure that the Request Query is an object.
var ValidateRequestQuery = function(Object) {
    return typeof Object === 'object' ? true : new TypeError('Incorrect data type used in request parameter, data type should be object, check the schema!');
};
//Ties the last 3 three functions togehter.
var ValidateRequestObject = function(Request) {
    var Test1 = ValidateRequestType(Request.Type);
    var Test2 = ValidateRequestPath(Request.Path);
    var Test3 = ValidateRequestQuery(Request.Query);
    if (Test1 === true) {
        if (Test2 === true) {
            if (Test3 === true) {
                return true;
            } else {
                return Test3;
            }
        } else {
            return Test2;
        }
    } else {
        return Test1;    
    }
};
//The Main Function that relies on the above.
exports.Handler = function(socket, Request) {
    socket.get('T', function(T) {
        if (ValidateRequestObject(Request) === true) {
            T.[Request.Type](Request.Path, Request.Query, function(Err, Reply) {
                //Checks to see if there's an error.
                if (Err) {
                    console.warn(Err);
                    socket.emit('error', Err);
                }
                //Even if there's an error, the reply will also be sent.
                if (Reply) {
                    socket.emit('Response', Reply);
                }
            });
        } else {
            socket.emit('error', ValidateRequestType(Request.type));
        }
    });
};


