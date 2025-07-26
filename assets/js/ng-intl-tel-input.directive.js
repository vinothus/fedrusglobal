App.directive('ngIntlTelInput', ['ngIntlTelInput', '$log', '$window', '$parse',
    function (ngIntlTelInput, $log, $window, $parse) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attr, ctrl,$rootScope) {
          // Warning for bad directive usage.
          if ((!!attr.type && (attr.type !== 'text' && attr.type !== 'tel')) || elm[0].tagName !== 'INPUT') {
            $log.warn('ng-intl-tel-input can only be applied to a *text* or *tel* input');
            return;
          }

          // Override default country.
          if (attr.initialCountry) {
            ngIntlTelInput.set({initialCountry: attr.initialCountry});
          } 
          
          if(typeof INITIAL_COUNTRY !== 'undefined')
          {
             ngIntlTelInput.set({initialCountry: INITIAL_COUNTRY});
          }


          // Initialize.
          ngIntlTelInput.init(elm);
          // Set Selected Country Data.
          function setSelectedCountryData(model) {
            var getter = $parse(model);
            var setter = getter.assign;
            setter(scope, elm.intlTelInput('getSelectedCountryData'));
          }
          // Handle Country Changes.
          function handleCountryChange() {
            setSelectedCountryData(attr.selectedCountry);
          }
          // Country Change cleanup.
          function cleanUp() {
            angular.element($window).off('countrychange', handleCountryChange);
          }
          // Selected Country Data.
          if (attr.selectedCountry) {
            setSelectedCountryData(attr.selectedCountry);
            angular.element($window).on('countrychange', handleCountryChange);
            scope.$on('$destroy', cleanUp);
          }
          // Validation.
          ctrl.$validators.ngIntlTelInput = function (value) {
            // if phone number is deleted / empty do not run phone number validation
            // if (value || elm[0].value.length > 0) {
            //     return elm.intlTelInput('isValidNumber');
            // } else {
            //     /*console.log(elm.intlTelInput("getValidationError"));
            //     alert('invalid');*/
            //     return true;
            // }
            const required = attr.required || false;
            if (value && isNotEmpty(value)) {
              return elm.intlTelInput('isValidNumber');
            }else{
              if(required){
                return false;
              }else{
                return true;
              }
            }
          };
          // Set model value to valid, formatted version.
          ctrl.$parsers.push(function (value) {
            return elm.intlTelInput('getNumber');
          });
          // Set input value to model value and trigger evaluation.
          /*ctrl.$formatters.push(function (value) {
            if (value) {
              if(value.charAt(0) !== '+') {
                value = '+' + value;
              }
              elm.intlTelInput('setNumber', value);
            }
            return value;
          });*/

          ctrl.$formatters.push(function (value) {
            if (value) {
              if(value.charAt(0) !== '+') {
                value = '+1' + value;
              }
              elm.intlTelInput('setNumber', value);

              value = elm.val();
              // console.log("ele val"+ value);
            }
            return value;
            // let number = intlTelInputUtils.formatNumber(value, elm.intlTelInput('selectedCountryData').iso2, intlTelInputUtils.numberFormat);
            // let number = intlTelInputUtils.formatNumber(value);
            // return number;
          });

        }
      };
    }]);
