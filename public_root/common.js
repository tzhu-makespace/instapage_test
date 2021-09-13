
/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/js-cookie@2.2.1/src/js.cookie.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
 !function(e){var n;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function t(o){function r(){}function i(n,t,i){if("undefined"!=typeof document){"number"==typeof(i=e({path:"/"},r.defaults,i)).expires&&(i.expires=new Date(1*new Date+864e5*i.expires)),i.expires=i.expires?i.expires.toUTCString():"";try{var c=JSON.stringify(t);/^[\{\[]/.test(c)&&(t=c)}catch(e){}t=o.write?o.write(t,n):encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var f="";for(var u in i)i[u]&&(f+="; "+u,!0!==i[u]&&(f+="="+i[u].split(";")[0]));return document.cookie=n+"="+t+f}}function c(e,t){if("undefined"!=typeof document){for(var r={},i=document.cookie?document.cookie.split("; "):[],c=0;c<i.length;c++){var f=i[c].split("="),u=f.slice(1).join("=");t||'"'!==u.charAt(0)||(u=u.slice(1,-1));try{var a=n(f[0]);if(u=(o.read||o)(u,a)||n(u),t)try{u=JSON.parse(u)}catch(e){}if(r[a]=u,e===a)break}catch(e){}}return e?r[e]:r}}return r.set=i,r.get=function(e){return c(e,!1)},r.getJSON=function(e){return c(e,!0)},r.remove=function(n,t){i(n,"",e(t,{expires:-1}))},r.defaults={},r.withConverter=t,r}(function(){})});

 window.getInvocaSessionId = function () {
   var sessionId = "";
   var cookie = window.Cookies.get("invoca_session");
   if (cookie) {
     try {
       var data = JSON.parse(cookie);
       if (data && data.session && data.session.invoca_id) {
         sessionId = data.session.invoca_id || "";
       }
     } catch (err) {
       // Can't parse the cookie's JSON string
     }
   }
   return sessionId;
 };
 
 window.getSegmentAnonymousId = function () {
   return analytics && analytics.user ? analytics.user().anonymousId() : "";
 };
 
 // SEGMENT, based on https://segment.com/docs/sources/website/analytics.js/quickstart/
 !(function () {
   var analytics = (window.analytics = window.analytics || []);
   if (!analytics.initialize)
     if (analytics.invoked)
       window.console &&
         console.error &&
         console.error("Segment snippet included twice.");
     else {
       analytics.invoked = !0;
       analytics.methods = [
         "trackSubmit",
         "trackClick",
         "trackLink",
         "trackForm",
         "pageview",
         "identify",
         "reset",
         "group",
         "track",
         "ready",
         "alias",
         "debug",
         "page",
         "once",
         "off",
         "on",
       ];
       analytics.factory = function (t) {
         return function () {
           var e = Array.prototype.slice.call(arguments);
           e.unshift(t);
           analytics.push(e);
           return analytics;
         };
       };
       for (var t = 0; t < analytics.methods.length; t++) {
         var e = analytics.methods[t];
         analytics[e] = analytics.factory(e);
       }
       analytics.load = function (t, e) {
         var n = document.createElement("script");
         n.type = "text/javascript";
         n.async = !0;
         n.src =
           "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
         var a = document.getElementsByTagName("script")[0];
         a.parentNode.insertBefore(n, a);
         analytics._loadOptions = e;
       };
       analytics.SNIPPET_VERSION = "4.1.0";
       analytics.load("ybQf1OWD6Yy5Mq3w15W6xrXmfdgbKYOx");
 
       analytics.page({
         page_variant_name: window.__variant,
       });
 
       analytics.ready(function () {
         var invocaSessionId = window.getInvocaSessionId();
         var anonymousId = window.getSegmentAnonymousId();
 
         document.querySelectorAll(".ganumber").forEach(function (el) {
           el.addEventListener("mousedown", function () {
             analytics.track("schedule.get-quote-requested.tap-to-call", {
               flow_app: "web",
               invoca_session: invocaSessionId,
               segment_anonymous_id: anonymousId,
             });
             analytics.identify({
               invoca_session: invocaSessionId,
               segment_anonymous_id: anonymousId,
             });
           });
         });
 
         analytics.identify({
           invoca_session: invocaSessionId,
           segment_anonymous_id: anonymousId,
         });
       });
     }
 })();