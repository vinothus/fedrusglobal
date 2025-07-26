
if (typeof app_initialized != 'undefined' && app_initialized) {
  // do something here
} else {
  var App = angular.module("OorwinApp", ['ui.mask','ngIdle','ngSanitize','ui.router','oc.lazyLoad','ngStorage','ngScrollbar','ngAnimate','ui.bootstrap','ui.bootstrap.datetimepicker','cnf.ngConfirmAlert','ui.multiselect','angularUtils.directives.dirPagination','ngCkeditor','ngTagsInput','angucomplete-alt']);

}

App.config(['ngIntlTelInputProvider', function (ngIntlTelInputProvider) {
  ngIntlTelInputProvider.set({initialCountry: 'us',
                defaultCountry: 'us',
                separateDialCode: true,
                nationalMode: false,
                utilsScript: 'assets/js/ng-intl-tel-input/utils.js'
            });
}]);

App.config(function($httpProvider) 
{
    // console.log(window.sessionStorage.data);
   $httpProvider.interceptors.push('myInterceptor');
});

App.run(['$rootScope', '$http', '$state', '$stateParams','$timeout', function ($rootScope, $http, $state, $stateParams,$timeout ) { 
  $rootScope.$state = $state; $rootScope.$stateParams = $stateParams; 


    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        // $rootScope.page_loading = 1;
        $('#ng_load_script').html('<div id="ng_load_script_before"></div>');

        body_ele = document.getElementsByTagName("body");
        if(typeof body_ele != 'undefined')
        {
          body_ele[0].classList.remove("uib-dropdown-open");
        }

        if (isEmpty($rootScope['CareerLayout'])) {
          event.preventDefault();
          $timeout(function() {
            $state.go(toState, toParams);
            $rootScope.page_loading = 0;
            //$urlRouter.listen();
          }, 0);
        }

  });

    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.title = $state.current.title;
    });
}]);

App.config(['$uibTooltipProvider', function($uibTooltipProvider){
 $uibTooltipProvider.setTriggers({
  'mouseenter': 'mouseleave',
  'click': 'click',
  'focus': 'blur',
  'hideonclick': 'click'
 });
}]);



function returnAsString(string) {
    if (isNotEmpty(string)) {
        return '' + string;
    }

    return string;
}

function getStateName(state_id) {
    var state_name = null;
    angular.forEach(obj_states_list, function(state) {
        if (state.id == state_id) {
            state_name = state.name;
            return false;
        }
    });
    
    return state_name;
}

function getCountryName(country_id) {
    country_name = null
    angular.forEach(obj_countries_list, function(country) {
        if (country.id == country_id) {
            country_name = country.name;
            return false;
        }
    });

    return country_name;
}

function compareDatesAreSame(date1, date2) {
    return new Date(date1).getFullYear() == new Date(date2).getFullYear() && new Date(date1).getMonth() == new Date(date2).getMonth() && new Date(date1).getDate() == new Date(date2).getDate(); 
}

// Give date in Y-m-d format,
// Get exact date irrespective of local timezone
function getDateBasedOnYearMonthDate(date) {
    var date_arr = date.split("-");
    var date = parseInt(date_arr.pop());
    var month = parseInt(date_arr.pop()) - 1;
    var year = parseInt(date_arr.pop());

    return new Date(year, month, date);
}

function countDecimals(value) {
    // if (Math.floor(value) === value) return 0;
    // if (roundToFixedDecimals(value) === Math.floor(value)) return 0;

    value = roundToFixedDecimals(value);
    var value_arr = value.toString().split(".");
    
    if (value_arr.length && typeof value_arr[1] != 'undefined') {
        return value_arr[1].length || 0;
    }
    
    return 0;
    // return value.toString().split(".")[1].length || 0; 
}

// generate unique id
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 10);
}

function ChangeUrl(page, url) {
        if (typeof (history.pushState) != "undefined") {
            //var obj = { Page: page, Url: url };
            history.pushState({}, '', url);
        } else {
            alert(CONFIG_MESSAGES.app_browser_not_support_html5);
        }
    }

App.factory('myInterceptor',
function ($q,$rootScope) {
  $rootScope.screenHeight = (window.innerHeight);
  //console.log($rootScope.screenHeight);
    var interceptor = {
        'request': function (config) {
          //console.log($rootScope.loading);
          if($rootScope.loading==2){
              $rootScope.loading = 0;
          }else{
            $rootScope.loading = 1;
          }
        // Successful request method
            return config; // or $q.when(config);
        },
        'response': function (response) {
         	$rootScope.loading = 0;
          // console.log(response);
        // successful response
            return response; // or $q.when(config);
        },
        'requestError': function (rejection) {
            // an error happened on the request
            // if we can recover from the error
            // we can return a new request
            // or promise
            	$rootScope.loading = 0;
            return response; // or new promise
                // Otherwise, we can reject the next
                // by returning a rejection
                // return $q.reject(rejection);
        },
        'responseError': function (rejection) {
            // an error happened on the request
            // if we can recover from the error
            // we can return a new response
            // or promise
            $rootScope.loading = 0;
            ajaxErrorCallBackFunc(rejection.data.error);
            return rejection; // or new promise
                // Otherwise, we can reject the next
                // by returning a rejection
                // return $q.reject(rejection);
        }
    };
    return interceptor;
});

App.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ model_title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        //scope.title = attrs.title;
        console.log(attrs.id);
      }
    };
  });

function roundToFixedDecimals(number, decimals) {
    if (typeof decimals == 'undefined') {
        decimals = 8;
    }

    fixed_decimal = Number(Math.round(number+'e'+decimals)+'e-'+decimals);

    if (isNaN(fixed_decimal)) {
        return 0;
        // return parseFloat(number).toFixed(decimals);
    }
    
    return fixed_decimal;
}

function showAlertMessage(message_data) {
   var $body = angular.element(document.body);   // 1
  var $rootScope = $body.scope().$root; 
  $rootScope.root_error_scope_status=message_data.status;
  $rootScope.root_error_scope_msg=message_data.message;
  //document.getElementById('root_error_scope_msg').innerHTML = message_data.message;
  $rootScope.root_error_scope=1;
    setTimeout(function(){ 
       hideAlertMessage();
  }, 7000);
}

function hideAlertMessage() {
  var $body = angular.element(document.body);   // 1
  var $rootScope = $body.scope().$root;         // 2
  $rootScope.$apply(function () {               // 3
    $rootScope.root_error_scope = 0;
    $rootScope.root_error_scope_msg = "";
  });
}

function ajaxErrorCallBackFunc(err_msg) {
    if (typeof err_msg == 'undefined') {
        return true;
       // var err_msg = 'Something went wrong with the request, please try again.';
    }
    
    // ajax error callback function
    showAlertMessage({
        status : 0,
        message : err_msg
    });
}

setTimeout(function() {
    hideFlashMessage()
}, 7000);

function hideFlashMessage() {
    var $body = angular.element(document.body);
    var $bodyScope = $body.scope();
    if (typeof $bodyScope != 'undefined' && typeof $bodyScope.$root != 'undefined') {
      var $rootScope = $body.scope().$root;
      $rootScope.$apply(function() {
          $rootScope.showFlash = false;
          angular.element(document.getElementById('flash_msg')).innerHTML = "";
      });
    }
}


App.controller('navMenuCntrl',function($scope,$controller,$http,$rootScope) {

});


function showFormValidationErrorMessages(response) {
    if (typeof response != 'undefined' && typeof response.data != 'undefined' 
        && typeof response.data.validations != 'undefined') {

        message = response.data.message;
        for (field_name in response.data.validations) {
            message += '<p>' + response.data.validations[field_name] + '</p>';
        }

        showAlertMessage({
            'status': 0,
            'message': message
        });
        
        return false;
    }

    if (typeof response.data.message != 'undefined') {
        showAlertMessage({
            status: 0,
            message : response.data.message
        });
    }
}

// show angular form validation errors
function showAngularFormValidationErrors(form_validation_errors) {
    /*for (error in form_validation_errors) {
        if (angular.isObject(error)) {
            
        } else if (angular.isArray(error)) {
            angular.forEach(error, function() {
                
            });
        }
        
        message += '<p>' + response.data.validations[field_name] + '</p>';
    }*/

    showAlertMessage({
        'status': 0,
        'message': "Please enter all required fields."
    });
    
    return false;
}

// get app session storage
function getAppSessionStorage() {
  var SessionData;

  try {
    if (isNotEmpty(window.sessionStorage['ngStorage-data'])) {
      SessionData = JSON.parse(window.sessionStorage['ngStorage-data']);
      SessionData = JSON.parse(SessionData);
    } else if (isNotEmpty(window.sessionStorage.data)) {
      SessionData = JSON.parse(window.sessionStorage.data);
    }
  } catch (err) {
    SessionData = {};
  }

  return SessionData;
}

App.filter('trustAsHtml', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
});