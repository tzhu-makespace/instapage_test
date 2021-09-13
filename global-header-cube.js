// NOTE: This is for Cube LP usage only.

LEAD_ENDPOINT =
  "https://5s4rpi8v7d.execute-api.us-east-1.amazonaws.com/Prod/close-cube-lead";
LEAD_CUSTOM_FIELDS = {
  phone_number: "custom.phone", // to be replaced by standard fields in contact
  email: "custom.email", // to be replaced by standard fields in contact
  delivery_zip: "custom.cf_4S7HlAYtCN1kxcmBsg8PWefBG5jHmSs033TGTm0wosA", // alternative zip incase the appointment location is different from user address.
  service_type: "custom.cf_lROhUw4uKvTpqoRUlAF9RITbGqdgPC0XfIkzIUGDEve",
  storage_reason: "custom.cf_jHwUqhkfQMLMq7C2aOPUXUVCUVJYAVuyDuzaq8xFSSj",
  cube_use_case: "custom.cf_hUz5OCBrYDHokGeOo0Bk6e92TbIQqmdqtw8eTgGc1w7",
  disqualification_reason:
    "custom.cf_CegDfw096Xco4KuhPTtDNVch7kdckPsz16wfgiSlqkW",
  cube_size: "custom.cf_k5O95kc66CoDS3XKzS6SKalwD1ggn4Hc1D5CJrzsm72",
  storage_duration: "custom.cf_bi2uE0RpGIKOnr3Unbo8tw4VCCqGPHy8FXMrZr41XwE",
  loss_reason: "custom.cf_Am1J7983j8FHA2PJCw1T2LzoB8WvMUQi6Q6wqS3tQcb",
};


// custom functions used by common.js
window.makespaceFormatFormData = function (formData) {
  var leadData = Object.keys(LEAD_CUSTOM_FIELDS).reduce(function (hash, key) {
    if (key in formData) {
      hash[LEAD_CUSTOM_FIELDS[key]] = formData[key];
    }
    return hash;
  }, {});

  leadData["name"] = formData.name;

  return leadData;
};

window.makespacePostLeadSubmitRedirect() = function () {
  // no need to redirect.
};


// "import" common.js
var script = document.createElement('script');
script.src='//tzhu-makespace.github.io/instapage_test/common.js';
document.head.appendChild(script);

