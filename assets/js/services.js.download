App.service('FormServices', function($http,$rootScope,$timeout) {
    
   this.formSubmit=function(url,data) {

   		var request = $http({
                        method: "post",
                        url: url,
                        data: data
                    });
       return( request.then( handleSuccess, handleError ) );
   }
   function handleSuccess( response ) {
   //	console.log();
      return(response['data']);
	}
	function handleError( response ) {
	     $rootScope.errorMessage = CONFIG_MESSAGES.services_invalid_operation;  
	} 
});

App.service('CustomAjaxService', function($http, $q) {
    this.ajaxCall = function(method, url, postData) {
      return $http({method: method, url: url, data: postData})
                  .then(function(response) {
                      return response.data;
                  }, function(response) {
                      return response.data;
                  });
    }
   
});



App.factory('HireApiServices',function($http,$q,$rootScope,$window, $state){

  var factory = {};
    factory.get = function(url, params, loading) {

        // var deferred = $q.defer();

        if(isEmpty(params))
        {
            params = {};
        }


        $rootScope.loading = 1;
        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }

        return $http({
            method : 'GET',
            url : WEB_API_URL+url,
            params : params
        }).then(function success(data) {

            $rootScope.loading = 0;   

            // if(data.status == -1) {
            //     showAlertMessage({
            //         status : 0,
            //         message : 'This internet connection isn\'t strong enough at the moment. Please hop on to stable Internet to enjoy seamless experience.'
            //     });
            //     return false;
            // }

            if(data.status == 500) {
                showAlertMessage({
                    status : 0,
                    message : 'OOPS !!! - Looks like there is an issue with the data fetch. Please refresh your page and retry.'
                });
                return false;
            }

            if (status == 408) {
                showAlertMessage({
                    status : 0,
                    message : 'OOPS !!! - Looks like there is an issue with the data fetch. Please refresh your page and retry.'
                });
                return false;
            }

            if (status == 413) {
                showAlertMessage({
                    status : 0,
                    message : 'Request data is too large.'
                });
                return false;
            }

            if(data.status == 429) {
                $state.go('too_many_attempts');
                return;
            }

            if(data.data.status == 401 || data.data.status == 403){
                // window.location='#hcm/invalid_access';
                window.location = '#/unauthorized';

            } else if(data.data.status == 410){
                if(data.data.is_subscribed == 0) {
                    $state.go('not_subscribed');
                } else if(data.data.is_admin_user) {
                    // window.location='settings/#/admin/subscriptions/upgrade';
                    window.location='#/not_subscribed';
                } else {
                    showAlertMessage(response.data);
                    window.location='login.html';
                }
            }
            if(isNotEmpty(data.data) && isNotEmpty(data.data.is_request_limit_exceeded)) {
                $state.go('limit_exceeded');
                return;
            }
            return data;
            // deferred.resolve(data);
            // return deferred.promise;
        });
    }
    factory.post = function(url,data, loading) {
        // var deferred = $q.defer();
        
        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }

        return $http({
            method : 'POST',
            url : WEB_API_URL+url,
            data : data
        }).then(function success(data){
            $rootScope.loading = 0;  

            // if(data.status == -1) {
            //     showAlertMessage({
            //         status : 0,
            //         message : 'This internet connection isn\'t strong enough at the moment. Please hop on to stable Internet to enjoy seamless experience.'
            //     });
            //     return false;
            // } 

            if(data.status == 500) {
                showAlertMessage({
                    status : 0,
                    message : 'OOPS !!! - Looks like there is an issue with the data fetch. Please refresh your page and retry.'
                });
                return false;
            }
            if (status == 413) {
                showAlertMessage({
                    status : 0,
                    message : 'Request data is too large.'
                });
                return false;
            }

            if (status == 408) {
                showAlertMessage({
                    status : 0,
                    message : 'Server Timeout. Please refresh your page and retry.'
                });
                return false;
            }

            if(data.status == 429) {
                $state.go('too_many_attempts');
                return;
            }

            if ([401, 403].indexOf(data.status) > -1 || data.data.status == 401 || data.data.status == 403){
                //window.location='#/invalid_access';
                window.location = '#/unauthorized';
            }  else if ([410].indexOf(data.status) > -1 || data.data.status == 410){
                if(data.data.is_subscribed == 0) {
                    $state.go('not_subscribed');
                } else if(data.data.is_admin_user) {
                    // window.location='settings/#/admin/subscriptions/upgrade';
                    window.location='#/not_subscribed';
                } else {
                    //showAlertMessage(response.data);
                    window.location='504.html';
                }
            }

            if(isNotEmpty(data.data) && isNotEmpty(data.data.is_request_limit_exceeded)) {
                $state.go('limit_exceeded');
                return;
            }

            return data;
            // deferred.resolve(data);
            // return deferred.promise;
        });
    }
    factory.postAttachment = function(url,data, loading){
        
        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        
        return $http({
            method : 'POST',
            url : WEB_API_URL+url,
            headers:{ 'Content-Type': undefined },
            data : data
        }).then(function success(data){
            $rootScope.loading = 0;


            // if(data.status == -1) {
            //     showAlertMessage({
            //         status : 0,
            //         message : 'This internet connection isn\'t strong enough at the moment. Please hop on to stable Internet to enjoy seamless experience.'
            //     });
            //     return false;
            // }

            if(data.status == 500) {
                showAlertMessage({
                    status : 0,
                    message : 'OOPS !!! - Looks like there is an issue with the data fetch. Please refresh your page and retry.'
                });
                return false;
            }
           
            if (status == 408) {
                showAlertMessage({
                    status : 0,
                    message : 'Server Timeout. Please refresh your page and retry.'
                });
                return false;
            }
           
            if (status == 413) {
                showAlertMessage({
                    status : 0,
                    message : 'Request data is too large.'
                });
                return false;
            }

            if(data.status == 429) {
                $state.go('too_many_attempts');
                return;
            }

            if(data.data.status == 401 || data.data.status == 403){
                //window.location='#/invalid_access';
                window.location = '#/unauthorized';
            }  else if ([410].indexOf(data.status) > -1 || data.data.status == 410){
                if(data.data.is_admin_user) {
                    window.location='#/admin/subscriptions/upgrade';
                } else {
                    //showAlertMessage(response.data);
                    window.location='504.html';
                }
            } 
            // $rootScope.sub_loading = 0;

            if(isNotEmpty(data.data) && isNotEmpty(data.data.is_request_limit_exceeded)) {
                $state.go('limit_exceeded');
                return;
            }
            return data;
        });
    }
    factory.delete = function(url, data, loading) {
        if(isEmpty(data))
        {
            data = {};
        }

        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        return $http({
            method : 'DELETE',
            url : WEB_API_URL+url,
            params : data
        }).then(function success(data) {
            $rootScope.loading = 0;

            status = data.status;
            if(isEmpty(status))
            {
                status = data.data.status;
            }

            // if(status == -1) {
            //     showAlertMessage({
            //         status : 0,
            //         message : 'This internet connection isn\'t strong enough at the moment. Please hop on to stable Internet to enjoy seamless experience.'
            //     });
            //     return false;
            // }

            if (status == 401 || status == 403) {
                window.location = '#not_found';
            }
            if (status == 413) {
                showAlertMessage({
                    status : 0,
                    message : 'Request data is too large.'
                });
                return false;
            }

            if(status == 429) {
                $state.go('too_many_attempts');
                return;
            }

            if(isNotEmpty(data.data) && isNotEmpty(data.data.is_request_limit_exceeded)) {
                $state.go('limit_exceeded');
                return;
            }

            return data;
        });
    }
  return factory;

});

App.factory('HrApiServices',function($http, $rootScope, $window, $state) {
    var factory = {};
    factory.get = function(url, params, loading) {
        if(isEmpty(params))
        {
            params = {};
        }

        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }

        return $http({
            method : 'GET',
            url : WEB_API_URL+url,
            params : params
        }).then(function success(data) {
            $rootScope.loading = 0;

            status = data.status;
            if(isEmpty(status))
            {
                status = data.data.status;
            }

            // if(status == -1) {
            //     showAlertMessage({
            //         status : 0,
            //         message : 'This internet connection isn\'t strong enough at the moment. Please hop on to stable Internet to enjoy seamless experience.'
            //     });
            //     return false;
            // }

            if(status == 500) {
                showAlertMessage({
                    status : 0,
                    message : 'OOPS !!! - Looks like there is an issue with the data fetch. Please refresh your page and retry.'
                });
                return false;
            }
           
            if (status == 408) {
                showAlertMessage({
                    status : 0,
                    message : 'OOPS !!! - Looks like there is an issue with the data fetch. Please refresh your page and retry.'
                });
                return false;
            }

            if (status == 413) {
                showAlertMessage({
                    status : 0,
                    message : 'Request data is too large.'
                });
                return false;
            }
            if(status == 429) {
                $state.go('too_many_attempts');
                return;
            }

            if (status == 401 || status == 403)
            {
                window.location = '#/unauthorized';
            } else if(data.data.status == 410){
                if(data.data.is_subscribed == 0) {
                    $state.go('not_subscribed');
                } else if(data.data.is_admin_user) {
                    // window.location='settings/#/admin/subscriptions/upgrade';
                    window.location='#/not_subscribed';
                } else {
                    showAlertMessage(response.data);
                    window.location='login.html';
                }
            }

            if(isNotEmpty(data.data) && isNotEmpty(data.data.is_request_limit_exceeded)) {
                $state.go('limit_exceeded');
                return;
            }
            return data;
        });
    },
    factory.post = function(url, data, loading) {
        if(isEmpty(data))
        {
            data = {};
        }

        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }

        return $http({
            method : 'POST',
            url : WEB_API_URL+url,
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;

            status = data.status;
            if(isEmpty(status))
            {
                status = data.data.status;
            }

            // if(status == -1) {
            //     showAlertMessage({
            //         status : 0,
            //         message : 'This internet connection isn\'t strong enough at the moment. Please hop on to stable Internet to enjoy seamless experience.'
            //     });
            //     return false;
            // }

            if(status == 500) {
                showAlertMessage({
                    status : 0,
                    message : 'OOPS !!! - Looks like there is an issue with the data fetch. Please refresh your page and retry.'
                });
                return false;
            }
           
            if (status == 408) {
                showAlertMessage({
                    status : 0,
                    message : 'Server Timeout. Please refresh your page and retry.'
                });
                return false;
            }

            if (status == 401 || status == 403) {
                window.location = '#/not_found';
            }

            if (status == 413) {
                showAlertMessage({
                    status : 0,
                    message : 'Request data is too large.'
                });
                return false;
            }

            if(status == 429) {
                $state.go('too_many_attempts');
                return;
            }

            if(isNotEmpty(data.data) && isNotEmpty(data.data.is_request_limit_exceeded)) {
                $state.go('limit_exceeded');
                return;
            }
            return data;
        });
    }
    factory.postAttachment = function(url, data, loading) {
        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        return $http({
            method : 'POST',
            url : WEB_API_URL+url,
            headers:{ 'Content-Type': undefined },
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;

            status = data.status;
            if(isEmpty(status))
            {
                status = data.data.status;
            }

            // if(status == -1) {
            //     showAlertMessage({
            //         status : 0,
            //         message : 'This internet connection isn\'t strong enough at the moment. Please hop on to stable Internet to enjoy seamless experience.'
            //     });
            //     return false;
            // }

            if(status == 500) {
                showAlertMessage({
                    status : 0,
                    message : 'OOPS !!! - Looks like there is an issue with the data fetch. Please refresh your page and retry.'
                });
                return false;
            }
           
            if (status == 408) {
                showAlertMessage({
                    status : 0,
                    message : 'Server Timeout. Please refresh your page and retry.'
                });
                return false;
            }

            if (status == 401 || status == 403) {
                window.location = '#/not_found';
            }

            if (status == 413) {
                showAlertMessage({
                    status : 0,
                    message : 'Request data is too large.'
                });
                return false;
            }

            if(status == 429) {
                $state.go('too_many_attempts');
                return;
            }

            if(isNotEmpty(data.data) && isNotEmpty(data.data.is_request_limit_exceeded)) {
                $state.go('limit_exceeded');
                return;
            }
            return data;
        });
    }
    factory.delete = function(url, data, loading) {
        if(isEmpty(data))
        {
            data = {};
        }

        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        return $http({
            method : 'DELETE',
            url : WEB_API_URL+url,
            params : data
        }).then(function success(data) {
            $rootScope.loading = 0;

            status = data.status;
            if(isEmpty(status))
            {
                status = data.data.status;
            }

            // if(status == -1) {
            //     showAlertMessage({
            //         status : 0,
            //         message : 'This internet connection isn\'t strong enough at the moment. Please hop on to stable Internet to enjoy seamless experience.'
            //     });
            //     return false;
            // }

            if (status == 401 || status == 403) {
                window.location = '#not_found';
            }
            if (status == 413) {
                showAlertMessage({
                    status : 0,
                    message : 'Request data is too large.'
                });
                return false;
            }

            if(status == 429) {
                $state.go('too_many_attempts');
                return;
            }

            if(isNotEmpty(data.data) && isNotEmpty(data.data.is_request_limit_exceeded)) {
                $state.go('limit_exceeded');
                return;
            }

            return data;
        });
    }
    factory.put = function(url, data, loading) {
        if(isEmpty(data))
        {
            data = {};
        }
        
        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        return $http({
            method : 'PUT',
            url : WEB_API_URL+url,
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;

            status = data.status;
            if(isEmpty(status))
            {
                status = data.data.status;
            }

            // if(status == -1) {
            //     showAlertMessage({
            //         status : 0,
            //         message : 'This internet connection isn\'t strong enough at the moment. Please hop on to stable Internet to enjoy seamless experience.'
            //     });
            //     return false;
            // }

            if (status == 401 || status == 403) {
                window.location = '#not_found';
            }
            if (status == 413) {
                showAlertMessage({
                    status : 0,
                    message : 'Request data is too large.'
                });
                return false;
            }

            if(status == 429) {
                $state.go('too_many_attempts');
                return;
            }

            if(isNotEmpty(data.data) && isNotEmpty(data.data.is_request_limit_exceeded)) {
                $state.go('limit_exceeded');
                return;
            }
            return data;
        });
    }
    return factory;
});


App.factory('OnboardingApiServices',function($http, $rootScope, $window, $state) {
    var factory = {};
    factory.get = function(url, params, loading) {
        if(isEmpty(params))
        {
            params = {};
        }

        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }

        return $http({
            method : 'GET',
            url : ONBOARDING_API_URL+url,
            params : params
        }).then(function success(data) {
            $rootScope.loading = 0;

            status = data.status;
            if(isEmpty(status))
            {
                status = data.data.status;
            }

            if (status == 401 || status == 403)
            {
                window.location = '#/unauthorized';
            } 

            if(data.data.status == 410) {
                if(data.data.is_subscribed == 0) {
                    $state.go('not_subscribed');
                } else if(data.data.is_admin_user) {
                    window.location = '#/admin/subscriptions/upgrade';
                } else {
                    showAlertMessage(response.data);
                    window.location='login.html';
                }
            }
            return data;
        });
    },
    factory.post = function(url, data, loading) {
        if(isEmpty(data))
        {
            data = {};
        }

        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }

        return $http({
            method : 'POST',
            url : ONBOARDING_API_URL+url,
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;
            return data;
        });
    }
    factory.postAttachment = function(url, data, loading) {
        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        return $http({
            method : 'POST',
            url : ONBOARDING_API_URL+url,
            headers:{ 'Content-Type': undefined },
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;
            return data;
        });
    }
    factory.delete = function(url, data, loading) {
        if(isEmpty(data))
        {
            data = {};
        }

        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        return $http({
            method : 'DELETE',
            url : ONBOARDING_API_URL+url,
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;
            return data;
        });
    }
    factory.put = function(url, data, loading) {
        if(isEmpty(data))
        {
            data = {};
        }
        
        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        return $http({
            method : 'PUT',
            url : ONBOARDING_API_URL+url,
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;
            return data;
        });
    }
    return factory;
});

App.factory('DoccumentApiServices',function($http, $rootScope, $window, $state) {
    var factory = {};
    factory.get = function(url, params, loading) {
        if(isEmpty(params))
        {
            params = {};
        }

        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }

        return $http({
            method : 'GET',
            url : DOCCUMENT_API_URL+url,
            params : params
        }).then(function success(data) {
            $rootScope.loading = 0;

            status = data.status;
            if(isEmpty(status))
            {
                status = data.data.status;
            }

            if(data.data.status == 410) {
                if(data.data.is_subscribed == 0) {
                    $state.go('not_subscribed');
                } else if(data.data.is_admin_user) {
                    window.location = '#/admin/subscriptions/upgrade';
                } else {
                    showAlertMessage(response.data);
                    window.location='login.html';
                }
            }
            return data;
        });
    },
    factory.post = function(url, data, loading) {
        if(isEmpty(data))
        {
            data = {};
        }

        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }

        return $http({
            method : 'POST',
            url : DOCCUMENT_API_URL+url,
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;
            return data;
        });
    }
    factory.postAttachment = function(url, data, loading) {
        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        return $http({
            method : 'POST',
            url : DOCCUMENT_API_URL+url,
            headers:{ 'Content-Type': undefined },
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;
            return data;
        });
    }
    factory.delete = function(url, data, loading) {
        if(isEmpty(data))
        {
            data = {};
        }

        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        return $http({
            method : 'DELETE',
            url : DOCCUMENT_API_URL+url,
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;
            return data;
        });
    }
    factory.put = function(url, data, loading) {
        if(isEmpty(data))
        {
            data = {};
        }
        
        if(isNotEmpty(loading) && (loading == 'false' || loading == 'none'))
        {
            $rootScope.loading = 0;
        }
        else
        {
            $rootScope.loading = 1;
        }
        return $http({
            method : 'PUT',
            url : DOCCUMENT_API_URL+url,
            data : data
        }).then(function success(data) {
            $rootScope.loading = 0;
            return data;
        });
    }
    return factory;
});

// App.service('ApiServices', function($http,$rootScope,$timeout) {
//    this.formSubmit=function(url,method,data,headers) {

//     // headers :  { 'Content-Type': undefined }
//     // var arrToken = []
//      // headers.push();
//      // $http.defaults.headers.common['Authorization'] = "bearer "+window.sessionStorage.data.token;
//       var request = $http({
//                 method: "post",
//                 url: url,
//                 data: data
//             });

//       return( request.then( handleSuccess, handleError ) );
//    }
//    function handleSuccess( response ) {
//       return(response['data']);
//   }
//   function handleError( response ) {
//       $rootScope.errorMessage= CONFIG_MESSAGES.services_invalid_operation;  
//   } 
// });



// App.factory('userService', ['$rootScope', function ($rootScope) {
//     var service = {
//         model: {
//             name: '',
//             email: ''
//         },
//         SaveState: function () {
//             sessionStorage.userService = angular.toJson(service.model);
//         },
//         RestoreState: function () {
//             service.model = angular.fromJson(sessionStorage.userService);
//         }
//     }

//     $rootScope.$on("savestate", service.SaveState);
//     $rootScope.$on("restorestate", service.RestoreState);

//     return service;
// }]);