const APP_NAME = 'OorwinApp';
var APP_ENV = 'prod';
// var APP_VERSION = new Date().getTime();
var APP_VERSION = (new Date().toISOString().slice(0, 10)).replaceAll('-','');


if (location.host.indexOf('beanhiredev.com') > -1) {
    APP_ENV = 'dev';
} else if (location.host.indexOf('oorwinats.com') > -1) {
    APP_ENV = 'web';
} else if (location.host.indexOf('oorwinlabs.com') > -1 || location.host.indexOf('oorwin.info') > -1) {
    APP_ENV = 'qa';
} else if (location.host.indexOf('oorwin.com') > -1) {
    APP_ENV = 'prod';
} else if (location.host.indexOf('oorwin.us') > -1) {
    APP_ENV = 'produs';
} else if (location.host.indexOf('beanhiredev.us') > -1) {
    APP_ENV = 'devus';
} else if (location.host.indexOf('localhost') > -1) {
    APP_ENV = 'local';
}



var CLIENT_KEY = 'zTIXxipN5oV5WlDzTIXvjvWs5oWNoj4zTIcm1V5oXgclDzT1KbGKzTkAcvWsaQ7O';
var ROOT_LOC = window.location.hostname;
var ROOT_URL = window.location.origin + '/';

if (APP_ENV == 'local') { 
    var WEB_API_URL = 'http://api.localhost/paramesh_qa_api/';
    var ROOT_URL = window.location.origin+'/paramesh_qa_spa/';
    var BOLD_BI_SERVER_URL = "http://192.168.168.121:50068/bi/api/site/site2";
} else if (APP_ENV == 'web') { // dev Environment
    var WEB_API_URL = "https://api.beanhiredev.com/api/v2/";
}else if (APP_ENV == 'dev') { // dev Environment
    var WEB_API_URL = "https://api.beanhiredev.com/api/v2/";
    var BOLD_BI_SERVER_URL = "https://bi.oorwin.com/bi/api/site/dev";
} else if (APP_ENV == 'qa') { // Qa Environment
    var WEB_API_URL = "https://api.oorwinlabs.com/api/v2/";
    var BOLD_BI_SERVER_URL = "https://bi.oorwin.com/bi/api/site/dev";

    if(location.host.indexOf('oorwin.info') > -1)
    {
        var WEB_API_URL = "https://api.oorwin.info/api/v2/";
    }
} else if (APP_ENV == 'prod') { // Production Environment
    var WEB_API_URL = "https://api.oorwin.com/api/v2/";
    var BOLD_BI_SERVER_URL = "https://bi.oorwin.com/bi/api/site/prod";
} else if (APP_ENV == 'produs') { // Production Environment
    var WEB_API_URL = "https://api.oorwin.us/api/v2/";
    var BOLD_BI_SERVER_URL = "https://bi.oorwin.us/bi/api/site/prod";
} else if (APP_ENV == 'devus') { // Production Environment
    var WEB_API_URL = "https://api.beanhiredev.us/api/v2/";
}


var ONBOARDING_API_URL = WEB_API_URL +"onboarding/";

var DOCCUMENT_API_URL = WEB_API_URL +"cpanel/";

