var DEV_TEST = false;
var LEAD_ENDPOINT = DEV_TEST
  ? "https://dev1.mksp.co/api/inbound-lead/v2"
  : "https://makespace.com/api/inbound-lead/v2";
 

  /**
   * Minified by jsDelivr using Terser v3.14.1.
   * Original file: /npm/js-cookie@2.2.1/src/js.cookie.js
   *
   * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
   */
  !function(e){var n;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function t(o){function r(){}function i(n,t,i){if("undefined"!=typeof document){"number"==typeof(i=e({path:"/"},r.defaults,i)).expires&&(i.expires=new Date(1*new Date+864e5*i.expires)),i.expires=i.expires?i.expires.toUTCString():"";try{var c=JSON.stringify(t);/^[\{\[]/.test(c)&&(t=c)}catch(e){}t=o.write?o.write(t,n):encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var f="";for(var u in i)i[u]&&(f+="; "+u,!0!==i[u]&&(f+="="+i[u].split(";")[0]));return document.cookie=n+"="+t+f}}function c(e,t){if("undefined"!=typeof document){for(var r={},i=document.cookie?document.cookie.split("; "):[],c=0;c<i.length;c++){var f=i[c].split("="),u=f.slice(1).join("=");t||'"'!==u.charAt(0)||(u=u.slice(1,-1));try{var a=n(f[0]);if(u=(o.read||o)(u,a)||n(u),t)try{u=JSON.parse(u)}catch(e){}if(r[a]=u,e===a)break}catch(e){}}return e?r[e]:r}}return r.set=i,r.get=function(e){return c(e,!1)},r.getJSON=function(e){return c(e,!0)},r.remove=function(n,t){i(n,"",e(t,{expires:-1}))},r.defaults={},r.withConverter=t,r}(function(){})});

  window.getInvocaSessionId = function() {
    var sessionId = '';
    var cookie = window.Cookies.get('invoca_session');
    if (cookie) {
      try {
        var data = JSON.parse(cookie);
        if (data && data.session && data.session.invoca_id) {
          sessionId = data.session.invoca_id || '';
        }
      } catch (err) {
        // Can't parse the cookie's JSON string
      }
    }
    return sessionId;
  };

  window.getSegmentAnonymousId = function() {
    return analytics && analytics.user ? analytics.user().anonymousId() : '';
  };

  // SEGMENT, based on https://segment.com/docs/sources/website/analytics.js/quickstart/
  !function () {
    var analytics = window.analytics = window.analytics || [];
    if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice."); else {
      analytics.invoked = !0;
      analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"];
      analytics.factory = function (t) {
        return function () {
          var e = Array.prototype.slice.call(arguments);
          e.unshift(t);
          analytics.push(e);
          return analytics
        }
      };
      for (var t = 0; t < analytics.methods.length; t++) {
        var e = analytics.methods[t];
        analytics[e] = analytics.factory(e)
      }
      analytics.load = function (t, e) {
        var n = document.createElement("script");
        n.type = "text/javascript";
        n.async = !0;
        n.src = "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(n, a);
        analytics._loadOptions = e
      };
      analytics.SNIPPET_VERSION = "4.1.0";
      analytics.load('ybQf1OWD6Yy5Mq3w15W6xrXmfdgbKYOx');

      analytics.page({
        page_variant_name: window.__variant
      });

      analytics.ready(function() {
        var invocaSessionId = window.getInvocaSessionId();
        var anonymousId = window.getSegmentAnonymousId();

        document.querySelectorAll('.ganumber').forEach(function(el) {
          el.addEventListener('mousedown', function() {
            analytics.track('schedule.get-quote-requested.tap-to-call', {
              flow_app: 'web',
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
  }();
  window.instapageFormSubmitSuccess = function(form) {
    var formResponseElClass = 'js-form-response-element';

    var invocaSessionId = window.getInvocaSessionId();
    var anonymousId = window.getSegmentAnonymousId();

    // get form field dom nodes
    var nameInput = form.querySelector('[name="Name"]') || form.querySelector('[name="name"]');
    var emailInput = form.querySelector('[name="Email"]');
    var phoneInput = form.querySelector('[name="Phone"]') || form.querySelector('[name="phone"]');
    var zipInput = form.querySelector('[name="Zip"]') ||
      form.querySelector('[name="zip"]') ||
      form.querySelector('[name="zip code"]') ||
      form.querySelector('[name="Zip Code"]');
    var storageDurationInput = form.querySelector('input[type="radio"]:checked');

    // get value from form fields
    var nameValue = nameInput ? nameInput.value : '';
    var emailValue = emailInput ? emailInput.value : '';
    var phoneValue = phoneInput ? phoneInput.value : '';
    var zipValue = zipInput ? zipInput.value : '';
    var storageDurationValue = storageDurationInput ? storageDurationInput.value : '';

    var params = {
      name: nameValue,
      email: emailValue,
      phone_number: phoneValue,
      zip_code: zipValue,
      invoca_session: invocaSessionId,
      // Documented at https://community.segment.com/r/638lpx, analytics is the global that Segment
      // provides, and this is the official way to grab the anonymous id Segment has defined.
      segment_anonymous_id: anonymousId,
      current_page: window.location.pathname + window.location.search + window.location.hash,
      entry_path: window.Cookies.get('userEP') || '',
      entry_referrer: window.Cookies.get('userERef') || '',
      gclid: window.Cookies.get('gclid') || '',
      page_variant_name: window.__variant,
    };
    
    var notes = ['Lead from landing page'] 
    // add intended storage duration radio button form field to param.note for closio
    if(storageDurationValue) {
      notes.push('Storage Duration: ' + storageDurationValue);
    }
    
    // To keep script simple, we don't want to interpret URL, rather just include the entire URL
    // and deligate the task to the consumer.
    notes.push('Url: ' + window.location.href)

    params.note =  notes.join(' | ')   

    // window.URL isn't available in IE <= 11. We're only supporting newer browsers,
    // but just putting this check here to at least prevent the URL call from nuking the page
    // for legacy browsers.
    var utmSource = (
      window.URL
      && (new window.URL(document.location)).searchParams.get('utm_source')
    );
    // We only add utm_source to the API call if it's truthy. The API behaves unpredictably with
    // falsy values on this field, and that sometimes makes it fail to sync the lead to Closeio.
    if (utmSource) {
      params.utm_source = utmSource;
    }

    var formatFormData = function(formData) {
      var leadData = Object.keys(formData).reduce(function(arr, key) {
        arr.push({
          key: key,
          value_type: 'STRING',
          value: formData[key],
        });
        return arr;
      }, []);
      return { lead_data: leadData, phone_number: formData.phone_number };
    };

    var xCSRFInput = document.querySelector('input[name=csrfmiddlewaretoken]');
    var xCSRFToken = xCSRFInput ? xCSRFInput.value : null;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      var formResponseEl = form.getElementsByClassName(formResponseElClass)[0];
      var mustInsertResponseEl = false;
      if (!formResponseEl) {
        formResponseEl = document.createElement('div');
        formResponseEl.className = formResponseElClass;
        mustInsertResponseEl = true;
      }
      var baseStyles = 'text-align: center; font-weight: 600; font-size: 14px; font-family: "Montserrat", "Arial", sans-serif;';

      if (this.readyState == 4) {
        if (this.status === 200 || this.status === 201) {
          if (window.analytics) {
            window.analytics.track('schedule.get-quote-requested', {
              flow_app: 'web',
              invoca_session: invocaSessionId,
              page_variant_name: window.__variant,
              segment_anonymous_id: anonymousId,
            });
          }
          baseStyles += ' margin-top: 16px; color: #0f3916;'
          form.getElementsByTagName('button')[0].remove();
          formResponseEl.innerHTML = 'Thanks! We’ll be in touch with you very soon.'

          var zip = params.zip_code;
          var urlLookup = {
            dev: 'https://dev.mksp.co',
            local: 'http://localhost:8999',
            gro_dev: 'https://gro.dev.mksp.co'
          }
          if (zip && window.location.pathname.indexOf('business') === -1) {
            // send traffic after form submission to web booking flow if we are not on a business page
            // get env query param during testing for the redirect url
            var baseUrlFromLookup = '';
            if (window.location.search) {
              var envQueryParam = new URL(window.location.href).searchParams.get('env')
              baseUrlFromLookup = urlLookup[envQueryParam]
            }
            var baseUrl = baseUrlFromLookup || 'https://makespace.com';
            // attach a zip query param to the redirect url
            var redirectUrl = baseUrl + "/book?zip=" + zip;
            window.location.href = redirectUrl;
          }
        } else if (this.status === 207) {
          baseStyles += ' margin-top: -4px; color: #f12222;'
          formResponseEl.innerHTML = 'Doh! We’re not serving that area (yet).'
        }
        else if (this.status >= 400) {
          baseStyles += ' margin-top: -4px; color: #f12222;'
          formResponseEl.innerHTML = 'Sorry, there was an error. Give us a call and we’ll get you set up ASAP!'
        }
        formResponseEl.style.cssText = baseStyles;

        if (mustInsertResponseEl) {
          form.append(formResponseEl);
        }

        if (analytics) {
          analytics.identify({
            name: nameValue,
            phone: phoneValue,
            invoca_session: invocaSessionId,
            segment_anonymous_id: anonymousId,
          });
        }
      }
    }

    req.open('POST', LEAD_ENDPOINT);
    req.withCredentials = true;
    req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    req.setRequestHeader('X-CSRFToken', xCSRFToken);
    req.send(JSON.stringify(formatFormData(params)));
  };
