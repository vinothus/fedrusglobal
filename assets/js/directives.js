//a directive to 'enter key press' in elements with the "ng-enter" attribute
App.directive('ngEnter', function () { 
    return function (scope, element, attrs,$compile) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

App.directive('testDirective', function() {
    return {
        restrict: 'E',
        transclude: 'true',
        template: '<span ng-transclude></span>',
        link: function(scope, element, attr) 
        {
          element.append("<strong>"+attr.title+"</strong>");
        }
    };
});


App.directive('webWhatsAppMessage', function() {
    return {
        restrict: 'E',
        transclude: 'true',
        template: '<span ng-transclude></span>',
        link: function(scope, element, attr) 
        {
          if(isNotEmpty(attr.phone))
          {
              element.append("<a href='https://web.whatsapp.com/send/?phone="+attr.phone+"&text&type=phone_number&app_absent=0' target='_blank'><i class='mdi mdi-whatsapp text-success font-size-20'></i></a>");
          }
        }
    };
});




App.directive('popoverToggle', function($timeout) {
  return {
    scope: true,
    link: function(scope, element, attrs) {
      scope.toggle = function() {
      //console.log(scope);
        alert(scope.is_open);
      
        $timeout(function() {
          element.triggerHandler(scope.is_open ? 0 : 1);
          scope.is_open = !scope.is_open;
        });
      };
      return element.on('click', scope.toggle);
    }
  };
});

 App.directive('angularMask', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function ($scope, el, attrs, model) {
        var format = attrs.angularMask,
          arrFormat = format.split('|');

        if (arrFormat.length > 1) {
          arrFormat.sort(function (a, b) {
            return a.length - b.length;
          });
        }

        model.$formatters.push(function (value) {
          return value === null ? '' : mask(String(value).replace(/\D/g, ''));
        });

        model.$parsers.push(function (value) {
          model.$viewValue = mask(value);
          var modelValue = String(value).replace(/\D/g, '');
          el.val(model.$viewValue);
          return modelValue;
        });

        function mask(val) {
          if (val === null) {
            return '';
          }
          var value = String(val).replace(/\D/g, '');
          if (arrFormat.length > 1) {
            for (var a in arrFormat) {
              if (value.replace(/\D/g, '').length <= arrFormat[a].replace(/\D/g, '').length) {
                format = arrFormat[a];
                break;
              }
            }
          }
          var newValue = '';
          for (var nmI = 0, mI = 0; mI < format.length;) {
            if (format[mI].match(/\D/)) {
              newValue += format[mI];
            } else {
              if (value[nmI] != undefined) {
                newValue += value[nmI];
                nmI++;
              } else {
                break;
              }
            }
            mI++;
          }
          return newValue;
        }
      }
    };
  });

App.directive('creditcardFlag', function() {
      return {
        restrict: 'A',
        scope: {
          creditcardTypeModel: '=?'
        },
        link: function($scope, el) {
            el.addClass('card-flag');
            el[0].insertAdjacentHTML('afterend','<span class="_flag"></span>');
            function flag(el) {
                var c = {
                    'amex' : [34,37],
                    'elo' : [636368, 438935,504175,451416,636297,5067,4576,4011],
                    'visa' : [4],
                    'master' : [51,52,53,54,55,677189],
                    'diners' : [300,301,302,303,304,305,309,2014,2149,36,38,39],
                    'hipercard' : [60],
                    'aura' : [50],
                    'discover' : [6011,622,64,65],
                    'jcb' : [35]
                };
                var matched = false;
                for(var a in c){
                    if(!matched)
                        for(var b in c[a]){
                            var r = new RegExp("^"+c[a][b]);
                            var remove = el[0].className.match(/\b(card-flag)\.?[^\s]+/g);
                            var css = el[0].className;
                            var cleanNumber = el[0].value.replace(/[^\d]/g, "");
                            if(cleanNumber.match(r)){
                                matched = true;
                                el[0].className = css.replace(remove,'').concat(' card-flag-'+a);
                                $scope.creditcardTypeModel = a;
                                break;
                            }else{
                                el[0].className = css.replace(remove,'');
                                $scope.creditcardTypeModel = 'none';
                            }
                        }
                    }
                }

                el.bind('keyup keydown blur', function(e) {
                    flag(el);
                });
            }
        };
});

App.directive('clickAndDisable', function() {
  return {
    scope: {
      clickAndDisable: '&'
    },
    link: function(scope, iElement, iAttrs) {
      iElement.bind('click', function() {
        iElement.prop('disabled',true);
        scope.clickAndDisable().finally(function() {
          iElement.prop('disabled',false);
        })
      });
    }
  };
});


//Read More and Less
App.directive("ngTextTruncate", ["$compile", "ValidationServices", "CharBasedTruncation", "WordBasedTruncation",
        function($compile, ValidationServices, CharBasedTruncation, WordBasedTruncation) {
            return {
                restrict: "A",
                scope: {
                    text: "=ngTextTruncate",
                    charsThreshould: "@ngTtCharsThreshold",
                    wordsThreshould: "@ngTtWordsThreshold",
                    customMoreLabel: "@ngTtMoreLabel",
                    customLessLabel: "@ngTtLessLabel"
                },
                controller: function($scope, $element, $attrs) {
                    $scope.toggleShow = function() {
                        $scope.open = !$scope.open;
                    };

                    $scope.useToggling = $attrs.ngTtNoToggling === undefined;
                },
                link: function($scope, $element, $attrs) {
                    $scope.open = false;

                    ValidationServices.failIfWrongThreshouldConfig($scope.charsThreshould, $scope.wordsThreshould);

                    var CHARS_THRESHOLD = parseInt($scope.charsThreshould);
                    var WORDS_THRESHOLD = parseInt($scope.wordsThreshould);

                    $scope.$watch("text", function() {
                        $element.empty();

                        if (CHARS_THRESHOLD) {
                            if ($scope.text && CharBasedTruncation.truncationApplies($scope, CHARS_THRESHOLD)) {
                                CharBasedTruncation.applyTruncation(CHARS_THRESHOLD, $scope, $element);

                            } else {
                                $element.append($scope.text);
                            }

                        } else {

                            if ($scope.text && WordBasedTruncation.truncationApplies($scope, WORDS_THRESHOLD)) {
                                WordBasedTruncation.applyTruncation(WORDS_THRESHOLD, $scope, $element);

                            } else {
                                $element.append($scope.text);
                            }

                        }
                    });
                }
            };
        }
    ])

    .factory("ValidationServices", function() {
        return {
            failIfWrongThreshouldConfig: function(firstThreshould, secondThreshould) {
                if ((!firstThreshould && !secondThreshould) || (firstThreshould && secondThreshould)) {
                    throw "You must specify one, and only one, type of threshould (chars or words)";
                }
            }
        };
    })



    .factory("CharBasedTruncation", ["$compile", function($compile) {
        return {
            truncationApplies: function($scope, threshould) {
                return $scope.text.length > threshould;
            },

            applyTruncation: function(threshould, $scope, $element) {
                if ($scope.useToggling) {
                    var el = angular.element("<span>" +
                        $scope.text.substr(0, threshould) +
                        "<span ng-show='!open'>...</span>" +
                        "<span class='btn-link ngTruncateToggleText' " +
                        "ng-click='toggleShow()'" +
                        "ng-show='!open'>" +
                        " " + ($scope.customMoreLabel ? $scope.customMoreLabel : "More") +
                        "</span>" +
                        "<span ng-show='open'>" +
                        $scope.text.substring(threshould) +
                        "<span ng-show='open' class='btn-link ngTruncateToggleText'" +
                        "ng-click='toggleShow()'>" +
                        " " + ($scope.customLessLabel ? $scope.customLessLabel : "Less") +
                        "</span>" +
                        "</span>" +
                        "</span>");
                    $compile(el)($scope);
                    $element.append(el);

                } else {
                    $element.append($scope.text.substr(0, threshould) + "...");

                }
            }
        };
    }])



    .factory("WordBasedTruncation", ["$compile", function($compile) {
        return {
            truncationApplies: function($scope, threshould) {
                return $scope.text.split(" ").length > threshould;
            },

            applyTruncation: function(threshould, $scope, $element) {
                var splitText = $scope.text.split(" ");
                if ($scope.useToggling) {
                    var el = angular.element("<span>" +
                        splitText.slice(0, threshould).join(" ") + " " +
                        "<span ng-show='!open'>...</span>" +
                        "<span class='btn-link ngTruncateToggleText' " +
                        "ng-click='toggleShow()'" +
                        "ng-show='!open'>" +
                        " " + ($scope.customMoreLabel ? $scope.customMoreLabel : "More") +
                        "</span>" +
                        "<span ng-show='open'>" +
                        splitText.slice(threshould, splitText.length).join(" ") +
                        "<span class='btn-link ngTruncateToggleText'" +
                        "ng-click='toggleShow()'>" +
                        " " + ($scope.customLessLabel ? $scope.customLessLabel : "Less") +
                        "</span>" +
                        "</span>" +
                        "</span>");
                    $compile(el)($scope);
                    $element.append(el);

                } else {
                    $element.append(splitText.slice(0, threshould).join(" ") + "...");
                }
            }
        };
    }]);
//End Of the Read More and Less Code

// App.directive('breadcrumbs', function ($window) {
//  return {
//    restrict: 'C',
//    link: function (scope, element, attrs) {
//        // wrap window object as jQuery object
//        alert('hi');
//      var topClass = 'breadcrumb-fixed'; // get CSS class from directive's attribute value
//      var  offsetTop = element[0].offsetTop; // get element's offset top relative to document
//   angular.element($window).bind("scroll", function() {
//            //console.log(this.innerHeight)
//            if (this.pageYOffset >= offsetTop+50) {
//                 element.addClass(topClass);
//             } else {
//                element.removeClass(topClass);
//             }
//        });
//   }
//  };
// });



 // mainApp.directive('setClassWhenAtTop', function ($window) { var $win = angular.element($window); 
 // // wrap window object as jQuery object //alert('hi'); 
 // return { restrict: 'A', link: function (scope, element, attrs) { 
 // var topClass = attrs.setClassWhenAtTop,  // get CSS class from directive's attribute value 
 // offsetTop = element.offset().top; // get element's offset top relative to document 
 // $win.on('scroll', function (e) { //console.log($win.scrollTop()+'---'+offsetTop); 
 //    if ($win.scrollTop() > offsetTop) { 
 //        element.addClass(topClass); } 
 //        else { element.removeClass(topClass); } }); } }; });
 // element.bind('scroll', function() {



App.directive("setClassWhenAtTop", function ($window,$timeout) {
  return function(scope, element, attrs) {
    var topClass = attrs.setClassWhenAtTop;
    var raw = element[0];

   // offsetTop = element[0].offset;
    
    element.bind('scroll', function() {
       // alert('hi');
        //alert(raw.scrollTop);
          //console.log("scrolling");
          //console.log(raw.scrollTop +"-"+ raw.offsetHeight+"-"+raw.scrollHeight);
           $timeout(function() {
            if (raw.scrollTop >= 55) {
               //console.log('startscroll');
                element.addClass(topClass);
            }else {
                element.removeClass(topClass);
                //console.log('removescroll');
            }
        },50);
    });

    
    // angular.element($window).bind("scroll", function(e) {
    //   console.log(e);
    //   console.log(this.pageYOffset);
    //   scope.$apply();
    // });
  };
});

// App.directive('breadcrumbs', function($window){

//     return {

//         restrict: 'A',
//         link: function(scope,elem,attrs){
//             angular.element($window).bind("scroll", function(evt) {
//                    console.log(evt.offsetX + ':' + evt.offsetY); 
//             });
//             // $(elem).on('breadcrumbs', function(evt){
//             //    console.log(evt.offsetX + ':' + evt.offsetY);
//             // });
//         }

//     }

// });


App.directive('body', function ($window) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
    // wrap window object as jQuery object
    var topClass = 'height-auto'; // get CSS class from directive's attribute value
    var  offsetTop = element[0].offsetTop; // get element's offset top relative to document
   angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= offsetTop) {
                 element.addClass(topClass);
             } else {
                element.removeClass(topClass);
             }
        });
   }
  };
});


// File Directive
App.directive('ngFiles', ['$parse', function ($parse) {
          function fn_link(scope, element, attrs) {
              var onChange = $parse(attrs.ngFiles);
             
              element.on('change', function (event) {
                console.log(event.target.files);
                  onChange(scope, { $files: event.target.files });

                 //  console.log($files_data);
              });
          };
        return {
                  link: fn_link
              }
}]);

App.directive('setFocus',function($timeout){
     return {
        link:  function(scope, element, attrs){
          element.bind('click',function(){
               attrs.$observe('setFocus', function() {
                  $timeout(function() {
                   document.querySelector('#' + attrs.setFocus).focus();
                   //alert('hi');
                  })
              })
           })
        }
      }
});


App.directive('customOnChange', function(ConfirmAlert) {
  return {
    restrict: 'A',
    priority: -1,
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});


// App.directive('onLoadClicker', ['$timeout',
//   function($timeout) {
//     return {
//       restrict: 'A',
//       priority: -1,
//       link: function(scope, iElm, iAttrs, controller) {
//         $timeout(function() {
//           //console.log(iElm[0].onchange);
//           //iElm.triggerHandler('change');
//           //alert('hi');
//           console.log(iAttrs);
//           var onChangeFunc = scope.$eval(iAttrs.onchange);
//           alert(onChangeFunc);
//           iElm.bind('change', onChangeFunc);

//         }, 0);
//       }
//     };
//   }
// ]);



App.directive('hoverText', function () {
    return {
        restrict: 'A',
        scope: {
            hoverText: '=',
            maxChars: '='
        },
        link: function (scope, element,attrs) {
        if(scope.hoverText) {
            // element.tooltip('show'); 
           if(scope.maxChars < scope.hoverText.length)  {
            //console.log('hi');
              var hoverText = scope.hoverText;
                // if (window.jQuery) {  
                //   hoverText = jQuery(hoverText).text();
                // }
                // hoverText = hoverText.replace(/<[^>]*>?/gm, '');
                element.html(hoverText.substr(0, scope.maxChars) + '...')
              // element.html(scope.hoverText.substr(0, scope.maxChars) + '...')
                // element.on('mouseenter', function() {
                //     //attrs.$set('uib-tooltip','test');
                //     //element.attr('uib-tooltip','ss');
                //     element.attr('tooltip-enable','1');
                //     console.log('i');
                //    // element.tooltip();
                // });
                // element.on('mouseleave', function() {
                //     element.text(scope.hoverText.substr(0, scope.maxChars) + '...');
                // });
            } else {
                element.html(scope.hoverText);
            }
        }
        }
    };
})


App.factory('jobsListFactory', function($http, $cacheFactory) {
    return {
        get: function(payload, successCallback){
            var key = 'jobsList_' + payload.q;
            var url = ROOT_URL + "jobs/getJobsListJson";
            if($cacheFactory.get(key) == undefined || $cacheFactory.get(key) == ''){
                $http.get(url, {params: payload}).then(function(data){
                    $cacheFactory(key).put('result', data.data);
                    successCallback(data.data);
                });
            }else{
                successCallback($cacheFactory.get(key).get('result'));
            }
        }
    }
});

App.directive('validFile',function(){
  return {
    require:'ngModel',
    link:function(scope,el,attrs,ngModel){
      //change event is fired when file is selected
      el.bind('change',function(){
        scope.$apply(function(){
          ngModel.$setViewValue(el.val());
          ngModel.$render();
        });
      });
    }
  }
});


/**
 * Directive for an indeterminate (tri-state) checkbox.
 * Based on the examples at http://stackoverflow.com/questions/12648466/how-can-i-get-angular-js-checkboxes-with-select-unselect-all-functionality-and-i
 */
App.directive('indeterminateCheckbox', [function() {
    return {
        scope: true,
        require: '?ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var childList = attrs.childList;
            var property = attrs.property;

            // Bind the onChange event to update children
            element.bind('change', function() {
                scope.$apply(function () {
                    var isChecked = element.prop('checked');

                    // Set each child's selected property to the checkbox's checked property
                    angular.forEach(scope.$eval(childList), function(child) {
                        child[property] = isChecked;
                    });
                });
            });
            
            // Watch the children for changes
            scope.$watch(childList, function(newValue) {
                var hasChecked = false;
                var hasUnchecked = false;
                
                // Loop through the children
                angular.forEach(newValue, function(child) {
                    if (child[property]) {
                        hasChecked = true;
                    } else {
                        hasUnchecked = true;
                    }
                });
                
                // Determine which state to put the checkbox in
                if (hasChecked && hasUnchecked) {
                    element.prop('checked', false);
                    element.prop('indeterminate', true);
                    if (modelCtrl) {
                        modelCtrl.$setViewValue(false);
                    }
                } else {
                    element.prop('checked', hasChecked);
                    element.prop('indeterminate', false);
                    if (modelCtrl) {
                        modelCtrl.$setViewValue(hasChecked);
                    }
                }
            }, true);
        }
    };
}]);


App.directive('stopEvent', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      return element.bind('click', function(e) {
        e.preventDefault();
        return e.stopPropagation();
      });
    }
  };
});

App.directive("dropDown", function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      return element.bind('click', function(event) {
        event.preventDefault();
        return angular.element(this).toggleClass('active');
      });
    }
  };
});

App.directive('focusWhen', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      return scope.$watch(attrs.focusWhen, function(value) {
        if (!value) {
          return;
        }
        return $timeout(function() {
          return element[0].focus();
        });
      });
    }
  };
});

App.directive('ddTextCollapse', ['$compile', function($compile) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {


          /* start collapsed */
          scope.collapsed = false;


          /* create the function to toggle the collapse */
          scope.toggle = function() {
              scope.collapsed = !scope.collapsed;
          };


          /* wait for changes on the text */
          attrs.$observe('ddTextCollapseText', function(text) {


              /* get the length from the attributes */
              var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);


              if (text.length > maxLength) {
                  /* split the text in two parts, the first always showing */
                  var firstPart = String(text).substring(0, maxLength);
                  var secondPart = String(text).substring(maxLength, text.length);


                  /* create some new html elements to hold the separate info */
                  var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                  var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
                  var moreIndicatorSpan = $compile('<span ng-if="!collapsed">...</span>')(scope);
                  var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                  var toggleButton = $compile('<span class="collapse-text-toggle btn-link" ng-click="toggle()">{{collapsed ? " Less" : " More"}}</span>')(scope);
                  

                  /* remove the current contents of the element
                   and add the new ones we created */
                  element.empty();
                  element.append(firstSpan);
                  element.append(secondSpan);
                  element.append(moreIndicatorSpan);
                  //element.append(lineBreak);
                  element.append(toggleButton);
              }
              else {
                  element.empty();
                  element.append(text);
              }
          });
      }
  };
}]);

App.directive('customPopover', function () {
    return {
        restrict: 'A',
        template: '<span>{{label}}</span>',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;

            
        }
    };
});
App.directive('validatePasswordCharacters', function () {
        return {
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModel) {
                ngModel.$validators.lowerCase = function (value) {
                    var pattern = /[a-z]+/;
                    return (typeof value !== 'undefined') && pattern.test(value);
                };
                ngModel.$validators.upperCase = function (value) {
                    var pattern = /[A-Z]+/;
                    return (typeof value !== 'undefined') && pattern.test(value);
                };
                ngModel.$validators.number = function (value) {
                    var pattern = /\d+/;
                    return (typeof value !== 'undefined') && pattern.test(value);
                };
                ngModel.$validators.specialCharacter = function (value) {
                    var pattern = /\W+/;
                    return (typeof value !== 'undefined') && pattern.test(value);
                };
                ngModel.$validators.eightCharacters = function (value) {
                    return (typeof value !== 'undefined') && value.length >= 8;
                };
            }
        }
    });
function iResize() {
    var iFrames = $('iframe');
    for (var i = 0, j = iFrames.length; i < j; i++) {
      iFrames[i].style.height = iFrames[i].contentWindow.document.body.offsetHeight + 'px';
    }
  }

App.directive('myIframe', ['$compile','$timeout','$filter','$sce', 
function($compile,$timeout,$filter,$sce) {
  return {
    restrict: 'EA',
    template: '<iframe></iframe>',
     //replace:true,
    scope: {
      iframeTemplate: '=',
      iframeContext: '=',
       highlightWord: '=',
    },

    link: function($scope, $element, $attrs) {

        function makeEditableAndHighlight(w, d, colour) {
            var range, sel = w.getSelection();
            if (sel.rangeCount && sel.getRangeAt) {
                range = sel.getRangeAt(0);
            }; 

            d.designMode = "on";
            if (range) {
                sel.removeAllRanges();
                sel.addRange(range);
            };

            // Use HiliteColor since some browsers apply BackColor to the whole block
            if (!d.execCommand("HiliteColor", false, colour)) {
                d.execCommand("BackColor", false, colour);
            };
            d.designMode = "off";
        };

        $scope.$on('resumeSearch', function(event, serach_obj, html_content,  $scope) {

          var iframe_window =  $element.find('iframe')[0].contentWindow;
          var iframe_document =  $element.find('iframe')[0].contentDocument;
          if (isNotEmpty(serach_obj) && isNotEmpty(serach_obj[0])) {
            if (typeof prev_search != 'undefined' && isNotEmpty(prev_search) && prev_search != serach_obj[0]) {
              
              while(iframe_window.find(prev_search)) {
                makeEditableAndHighlight(iframe_window, iframe_document, 'transparent');
              }

              while(iframe_window.find(prev_search, false, true)) {
                makeEditableAndHighlight(iframe_window, iframe_document, 'transparent');
              }

              while(iframe_window.find(prev_search)) {
                makeEditableAndHighlight(iframe_window, iframe_document, 'transparent');
              }

            }

            prev_search = serach_obj[0];
            if (iframe_window.find(serach_obj[0], false, false, true)) {
              makeEditableAndHighlight(iframe_window, iframe_document, 'yellow');
            }
          }

          /*$scope.iframeTemplate = $filter('highlightWord')(html_content, serach_obj, 1);
          $compile($element
            .find('iframe').contents()
            .find('body').html($scope.iframeTemplate)
            .contents()
          );      */
      });

      function setScope () {
        angular.forEach($scope.iframeContext, (value, key) => {
          $scope[key] = value;
        });
        setContextWatchers();
      };
      
      function render () {
        if($scope.highlightWord && $scope.highlightWord.length>0) {
        for (var i = 0; i < $scope.highlightWord.length; i++){
          if ($scope.highlightWord[i] !="") {
                matchword = $scope.highlightWord[i].trim();
                matchword = matchword.replace(/\+/g , "\\+");
                var pattern = new RegExp(matchword, "gi");
                 if($scope.iframeTemplate) {
                  text = $scope.iframeTemplate.toString();
                //var pattern =  "(?<![\/w\/d])"+selectedWords[i]+"(?![\/w\/d])";
                $scope.iframeTemplate = $sce.trustAsHtml(text.replace(pattern, '<k class="highlighted">' + $scope.highlightWord[i] + '</k>'));
              } 
            }
        }
        
      }

      $compile($element
            .find('iframe').contents()
            .find('body').html($scope.iframeTemplate)
            .contents()
          )($scope);

      };
      
      function setContextWatchers () {
        angular.forEach($scope.iframeContext, (value, key) => {
          $scope.$watch(
            ($scope) => {
              return $scope.iframeContext[key];
            },
            function() {
              $scope[key] = $scope.iframeContext[key];
            });
        });  
      };
      $scope.$watch('iframeTemplate', function() {
        setScope();
        // render('template');
        $timeout(function () {
             render('template');
          }, 1000, true);
      });
    }
  }
}
]);




      
      
          
          
       
// App.directive('myDynamicHtml', ['$compile', 
// function($compile) {
//   return {
//     restrict: 'E',
//     scope: {
//       contents: '='
//     },
//     link: function($scope, $element, $attrs) {
//       var element = $element;
//       $scope.$watch('contents', function() {
//         let newElement = $compile($scope.contents)($scope);
//         element.replaceWith(newElement);
//         element = newElement;
//       });
//     }
//   };
// }
// ]);
App.directive('historyBackward', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                $window.history.back();
            });
        }
    };
}]);

// convert to us number 
/*
App.directive('phoneInput', function($filter, $browser) {
    return phoneInput;
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
}); */


/**
 * @license ng-bs-daterangepicker v0.0.5
 * (c) 2013 Luis Farzati http://github.com/luisfarzati/ng-bs-daterangepicker
 * License: MIT
 */
    App.directive('input', ['$compile', '$parse', '$filter','$timeout', function($compile, $parse, $filter,$timeout) {
      return {
        restrict: 'E',
        require: '?ngModel',
        link: function($scope, $element, $attributes, ngModel) {
          if ($attributes.type !== 'daterange' || ngModel === null) {
            return;
          }

          var options = {};
         // options.format = 'YYYY-MM-DD';
         options.format = $attributes.format || 'YYYY-MM-DD';

          options.separator = $attributes.separator || ' - ';
          options.minDate = $attributes.minDate && moment($attributes.minDate);
          options.maxDate = $attributes.maxDate && moment($attributes.maxDate);
          options.dateLimit = $attributes.limit && moment.duration.apply(this, $attributes.limit.split(' ').map(function(elem, index) {
            return index === 0 && parseInt(elem, 10) || elem;
          }));
          options.ranges = $attributes.ranges && $parse($attributes.ranges)($scope);
          options.locale = $attributes.locale && $parse($attributes.locale)($scope);
          options.opens = $attributes.opens || $parse($attributes.opens)($scope);

          if ($attributes.enabletimepicker) {
            options.timePicker = true;
            angular.extend(options, $parse($attributes.enabletimepicker)($scope));
          }

          function datify(date) {
            return moment.isMoment(date) ? date.toDate() : date;
          }

          function momentify(date) {
            return (!moment.isMoment(date)) ? moment(date) : date;
          }

          function format(date) {
            return $filter('date')(datify(date), options.format.replace(/Y/g, 'y').replace(/D/g, 'd')); //date.format(options.format);
          }

          function formatted(dates) {
            return [format(dates.startDate), format(dates.endDate)].join(options.separator);
          }

          ngModel.$render = function() {
            if (!ngModel.$viewValue || !ngModel.$viewValue.startDate) {
              return;
            }
            $element.val(formatted(ngModel.$viewValue));
          };

          $scope.$watch(function() {
            return $attributes.ngModel;
          }, function(modelValue, oldModelValue) {

            if (!$scope[modelValue] || (!$scope[modelValue].startDate)) {
              ngModel.$setViewValue({
                startDate: moment().startOf('day'),
                endDate: moment().startOf('day')
              });
              return;
            }

            if (oldModelValue !== modelValue) {
              return;
            }

            $element.data('daterangepicker').startDate = momentify($scope[modelValue].startDate);
            $element.data('daterangepicker').endDate = momentify($scope[modelValue].endDate);
            $element.data('daterangepicker').updateView();
            $element.data('daterangepicker').updateCalendars();
            $element.data('daterangepicker').updateInputText();

          });

          $element.daterangepicker(options, function(start, end, label) {

            var modelValue = ngModel.$viewValue;

            if (angular.equals(start, modelValue.startDate) && angular.equals(end, modelValue.endDate)) {
              return;
            }

             $timeout(function() {
                ngModel.$setViewValue({
                startDate: (moment.isMoment(modelValue.startDate)) ? start : start.toDate(),
                endDate: (moment.isMoment(modelValue.endDate)) ? end : end.toDate()
              });
              ngModel.$render();
              }, 0);

            // $scope.$apply(function() {
            //  ngModel.$setViewValue({
            //    startDate: (moment.isMoment(modelValue.startDate)) ? start : start.toDate(),
            //    endDate: (moment.isMoment(modelValue.endDate)) ? end : end.toDate()
            //  });
            //  ngModel.$render();
            // });

          });

        }

      };

    }]);

App.directive('ssnField', function($filter) {
    var ssnFilter, ssnReverse;
    ssnFilter = $filter('ssnFilter');
    ssnReverse = $filter('ssnReverse');
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var formatter, mask, parser;
        mask = attrs.ssnFieldMask; // not sure how to use this?
        formatter = function(value) {
          return ssnFilter(value, mask);
        };
        parser = function(value) {
          var formatted;
          formatted = ssnReverse(value);
          res_value = ssnFilter(formatted);
          element.val(res_value);

          modelCtrl.$setViewValue(res_value);
          return formatted;
        };
        modelCtrl.$formatters.push(formatter);
        return modelCtrl.$parsers.unshift(parser);
      }
    };
});

App.directive('disallowSpaces', function() {
  return {
    restrict: 'A',

    link: function($scope, $element) {
      $element.bind('input', function() {
        $(this).val($(this).val().replace(/ /g, ''));
      });
    }
  };
});



App.directive('autoActive', ['$location','$timeout','$state', function ($location,$timeout,$state) {
        var altr_paths = [
            {'action' : 'ConfigureApplicationForm', 'path' : '/admin/forms/submissions'}
        ];

        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element) {
                function setActive() {
                    var path = $location.path();

                    angular.forEach(altr_paths, function(path_val, path_key) {
                        if(path.indexOf(path_val['action']) > -1)
                        {
                            path = path_val['path']
                        }
                    });

                    if (path) {
                        angular.forEach(element.find('li'), function (li) {
                            var anchor = li.querySelector('a');
                            if (anchor.href.match('#' + path + '(?=\\?|$)')) {
                                angular.element(li).addClass('active');
                            } else {
                                angular.element(li).removeClass('active');
                            }
                        });
                    }
                }
                $timeout(function() {
                setActive();
              });

                scope.$on('$locationChangeSuccess', setActive);
            }
        }
}]);


App.filter('with', function($filter) {
  return function(input, search) {

    if (!input) return input;
    if (!search) return input;
    var expected = ('' + search).toLowerCase();
    var result = {};
    angular.forEach(input, function(value, key) {
      if (angular.isObject(value)) {
        var actual = ('' + value.name).toLowerCase();
      } else {
        var actual = ('' + value).toLowerCase();
      }

      if (actual.indexOf(expected) !== -1) {
        result[key] = value;
      }
    });
    
    return result;
  
  };
});

App.directive("limitToMax", function() {
  return {
    link: function(scope, element, attributes) {
      element.on("keydown keyup", function(e) {
    if (Number(element.val()) > Number(attributes.max) &&
          e.keyCode != 46 // delete
          &&
          e.keyCode != 8 // backspace
        ) {
          e.preventDefault();
          element.val(attributes.max);
        }
      });
    }
  };
});

App.directive("limitToExp", function() {
  return {
    link: function(scope, element, attributes) {
     
      element.on("change", function(e) {
    if (isNotEmpty(element.val()) && Number(element.val()) > Number(attributes.max) &&
          e.keyCode != 46 // delete
          &&
          e.keyCode != 8 // backspace
        ) {
          e.preventDefault();
          element.val(attributes.max);
        }
    else if (isNotEmpty(element.val()) && Number(element.val()) < Number(attributes.min) &&
          e.keyCode != 46 // delete
          &&
          e.keyCode != 8 // backspace
        ) {
          e.preventDefault();
          element.val(attributes.min);
        }
      });
    }
  };
});

App.directive('onlyNumbers', function () {
    return  {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                if(event.shiftKey){event.preventDefault(); return false;}
                //console.log(event.which);
                if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    // numbers 0 to 9
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number
                    return true;
                } 
                // else if ([110, 190].indexOf(event.which) > -1) {
                //     // dot and numpad dot
                //     return true;
                // }
                else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});

//directive for allowing only single decimal number
App.directive('singleDecimal', function () {
    return {
        link:function(scope,ele){
            ele.bind('keypress',function(e){
                var newVal=$(this).val()+(e.charCode!==0?String.fromCharCode(e.charCode):'');
                if($(this).val().search(/(.*)\.[0-9]/)===0 && newVal.length>$(this).val().length){
                    e.preventDefault();
                }
            });
        }
    };
});



//directive for lazy loading base scroll
App.directive('infinityscroll', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('scroll', function () {
                if ((element[0].scrollTop + element[0].offsetHeight) == element[0].scrollHeight) {
                    //scroll reach to end
                    scope.$apply(attrs.infinityscroll)
                }
            });
        }
    }
});



App.directive('scrollToBottom', function($timeout, $window) {
    return {
        scope: {
            scrollToBottom: "="
        },
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$watchCollection('scrollToBottom', function(newVal) {
                if (newVal) {
                    $timeout(function() {
                        element[0].scrollTop =  element[0].scrollHeight;
                    }, 0);
                }

            });
        }
    };
});

