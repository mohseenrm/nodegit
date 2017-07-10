module.exports = function(args) {
  var result = [],
      cArg,
      jsArg;

  for(cArg = 0, jsArg = 0; cArg < args.length; cArg++) {
    var arg = args[cArg];

    if (!arg.isReturn && !arg.isSelf) {
      arg.isJsArg = true;
      arg.jsArg = jsArg;

      jsArg++;
    }

    if (cArg === args.length -1) {
      arg.lastArg = true;
      arg.firstArg = false;
    }
    else if(cArg === 0){
      arg.firstArg = true;
      arg.lastArg = false;
    }
    else {
      arg.lastArg = false;
      arg.firstArg = false;
    }

    arg.cArg = cArg;
    arg.isCppClassStringOrArray = ~["String", "Array"].indexOf(arg.cppClassName);
    arg.isConst = ~arg.cType.indexOf("const ");

    // if we have a callback then we also need the corresponding payload for that callback
    if (arg.isCallbackFunction) {
      var payload = args.filter(function(payload) {
        return payload.payloadFor == arg.name || payload.payloadFor == '*';
      })[0];

      if (payload) {
        arg.payload = payload;
      }
    }

    result.push(arg);
  }

  return result;
};
