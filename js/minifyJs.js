(function(window){// String#toLowerCase and String#toUpperCase don't produce correct results in browsers with Turkish
// locale, for this reason we need to detect this case and redefine lowercase/uppercase methods
// with correct but slower alternatives. See https://github.com/angular/angular.js/issues/11387
if ('i' !== 'I'.toLowerCase()) {
  lowercase = manualLowercase;
  uppercase = manualUppercase;
}


var
    msie,             // holds major version number for IE, or NaN if UA is not IE.
    jqLite,           // delay binding since jQuery could be loaded after us.
    jQuery,           // delay binding
    slice             = [].slice,
    splice            = [].splice,
    push              = [].push,
    toString          = Object.prototype.toString,
    getPrototypeOf    = Object.getPrototypeOf,
    ngMinErr          = minErr('ng'),

    /** @name angular */
    angular           = window.angular || (window.angular = {}),
    angularModule,
    uid               = 0;

// Support: IE 9-11 only
/**
 * documentMode is an IE-only property
 * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
 */
msie = window.document.documentMode;


/**
 * @private
 * @param {*} obj
 * @return {boolean} Returns true if `obj` is an array or array-like object (NodeList, Arguments,
 *                   String ...)
 */
function isArrayLike(obj) {

  // `null`, `undefined` and `window` are not array-like
  if (obj == null || isWindow(obj)) return false;

  // arrays, strings and jQuery/jqLite objects are array like
  // * jqLite is either the jQuery or jqLite constructor function
  // * we have to check the existence of jqLite first as this method is called
  //   via the forEach method when constructing the jqLite object in the first place
  if (isArray(obj) || isString(obj) || (jqLite && obj instanceof jqLite)) return true;

  // Support: iOS 8.2 (not reproducible in simulator)
  // "length" in obj used to prevent JIT error (gh-11508)
  var length = 'length' in Object(obj) && obj.length;

  // NodeList objects (with `item` method) and
  // other objects with suitable length characteristics are array-like
  return isNumber(length) &&
    (length >= 0 && ((length - 1) in obj || obj instanceof Array) || typeof obj.item === 'function');

}

/**
 * @ngdoc function
 * @name angular.forEach
 * @module ng
 * @kind function
 *
 * @description
 * Invokes the `iterator` function once for each item in `obj` collection, which can be either an
 * object or an array. The `iterator` function is invoked with `iterator(value, key, obj)`, where `value`
 * is the value of an object property or an array element, `key` is the object property key or
 * array element index and obj is the `obj` itself. Specifying a `context` for the function is optional.
 *
 * It is worth noting that `.forEach` does not iterate over inherited properties because it filters
 * using the `hasOwnProperty` method.
 *
 * Unlike ES262's
 * [Array.prototype.forEach](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.18),* providing 'undefined' or 'null' values for `obj` will not throw a TypeError,but rather just * return the value provided. * ```js var values = {name: 'misko',gender: 'male'};// Copied from://http://docs.closure-library.googlecode.com/git/local_closure_goog_string_string.js.source.html#line1021//Prereq: s is a string. var escapeForRegexp = function(s) { return s .replace(/([-() [\]{}+?*.$^|,:#<!\\]) /g,'\\$1')//eslint-disable-next-line no-control-regex .replace(/\x08/g,'\\x08'); }}function bind(self,fn){var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2):[]}); * ``` * * It is also possible to set it as the default `paramSerializer` in the *{@link $httpProvider#defaults `$httpProvider`;}; var interceptorFactories = this.interceptors = []; this.$get = ['$browser','$injector','$rootScope','$q','$cacheFactory','$sce','$httpBackend','$$cookieReader',function($browser,$httpBackend,$$cookieReader,$cacheFactory,$rootScope,$q,$injector,$sce){defaults.paramSerializer = isString(defaults.paramSerializer) ?
      $injector.get(defaults.paramSerializer):defaults.paramSerializer}function createHttpBackend($browser,createXhr,$browserDefer,callbacks,rawDocument){// TODO(vojta):fix the signature return function(method,url,post,callback,headers,timeout,withCredentials,responseType,eventHandlers,uploadEventHandlers) { url = url || $browser.url(../..) ; if (lowercase(method) === 'jsonp') { var callbackPath = callbacks.createCallback(url); var jsonpDone = jsonpReq(url,callbackPath,function(status,text) { // jsonpReq only ever sets status to 200 (OK),404 (ERROR) or -1 (WAITING) var response = (status === 200) && callbacks.getResponse(callbackPath); completeRequest(callback,status,response,'',text,'complete'); callbacks.removeCallback(callbackPath); }); } else { var xhr = createXhr(method,url); xhr.open(method,url,true); forEach(headers,function(value,key) { if (isDefined(value)) { xhr.setRequestHeader(key,value); } }); xhr.onload = function requestLoaded() { var statusText = xhr.statusText || '';//responseText is the old-school way of retrieving response (supported by IE9)//response/responseType properties were introduced in XHR Level2 spec (supported by IE10) var response = ('response' in xhr) ? xhr.response : xhr.responseText;//normalize IE9 bug (http://bugs.jquery.com/ticket/1450) var status = xhr.status === 1223 ? 204 : xhr.status;//fix status code when it is 0 (0 status is undocumented) .//Occurs when accessing file resources or on Android 4.1 stock browser//while retrieving files from application cache. if (status === 0) { status = response ? 200 : urlResolve(url) .protocol === 'file' ? 404 : 0; } completeRequest(callback,status,response,xhr.getAllResponseHeaders(),statusText,'complete'); }; var requestError = function() {//The response is always empty//See https://xhr.spec.whatwg.org/#request-error-steps and https://fetch.spec.whatwg.org/#concept-network-error completeRequest(callback,-1,null,null,'','error'); }; var requestAborted = function() { completeRequest(callback,-1,null,null,'','abort'); }; var requestTimeout = function() {//The response is always empty//See https://xhr.spec.whatwg.org/#request-error-steps and https://fetch.spec.whatwg.org/#concept-network-error completeRequest(callback,-1,null,null,'','timeout'); }; xhr.onerror = requestError; xhr.onabort = requestAborted; xhr.ontimeout = requestTimeout; forEach(eventHandlers,function(value,key) { xhr.addEventListener(key,value); }); forEach(uploadEventHandlers,function(value,key) { xhr.upload.addEventListener(key,value); }); if (withCredentials) { xhr.withCredentials = true; } if (responseType) { try { xhr.responseType = responseType; } catch (e) {//WebKit added support for the json responseType value on 9/3/2013//https://bugs.webkit.org/show_bug.cgi?id=73648 Versions of Safari prior to 7 are//known to throw when setting the value "json" as the response type. Other older//browsers implementing the responseType////The json response type can be ignored if not supported,because JSON payloads are//parsed on the client-side regardless. if (responseType !== 'json') { throw e; } } } xhr.send(isUndefined(post) ? null : post); } if (timeout > 0) { var timeoutId = $browserDefer(timeoutRequest,timeout); } else if (isPromiseLike(timeout)) { timeout.then(timeoutRequest); } function timeoutRequest() { if (jsonpDone) { jsonpDone(); } if (xhr) { xhr.abort(); } } function completeRequest(callback,status,response,headersString,statusText,xhrStatus) {//cancel timeout and subsequent timeout promise resolution if (isDefined(timeoutId)) { $browserDefer.cancel(timeoutId); } jsonpDone = xhr = null; callback(status,response,headersString,statusText,xhrStatus); } }}