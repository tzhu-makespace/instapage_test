var DEV_TEST = false;
var LEAD_ENDPOINT = DEV_TEST
  ? "https://dev1.mksp.co/api/inbound-lead/v2"
  : "https://makespace.com/api/inbound-lead/v2";

var INSTAPAGE_COMMON = "https://s3.amazonaws.com/customer-web-dev1.mksp.co/static/js/common.js";

window.makespaceFormatFormData = function (formData) {
  var leadData = Object.keys(formData).reduce(function(arr, key) {
    arr.push({
      key: key,
      value_type: 'STRING',
      value: formData[key],
    });
    return arr;
  }, []);
  return { lead_data: leadData, phone_number: formData.phone_number };
}

window.makespacePostLeadSubmitRedirect = function () {
    // no need to redirect.
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
}

// "import" common.js
var script = document.createElement('script');
script.src=INSTAPAGE_COMMON;
document.head.appendChild(script);

