
/*if (isNotEmpty(window.sessionStorage['ngStorage-data'])) {
    var SessionData = JSON.parse(window.sessionStorage['ngStorage-data']);
    var SessionData = JSON.parse(SessionData);
}*/ 

App.factory('checkCandidateSubmissionService', function($http,$rootScope) {

    var getData = function(data,url='') {
      if(isEmpty(url))
      {
        url = WEB_API_URL+'applications/getActiveSubmissions';
      }
      return $http({method:"POST", url:url,data:data}).then(function(result){
        return result.data;
      });
    };
     // $rootScope.loading = 0;
    return { getData: getData };
});

App.factory('checkPipelineSubmissionData', function($http,$rootScope) {

    var getCount = function(data,url='') {
      if(isEmpty(url))
      {
        url = WEB_API_URL+'applications/checkJobSubmissionData';
      }
      return $http({method:"POST", url:url,data:data}).then(function(result){
        return result.data;
      });
    };
    return { getCount: getCount };
});



App.filter('isShowAvilableCredits', function() {
    return function(input) {
        if(isEmpty(input)) {
            return true;
        }
        else if (input.toString().toLowerCase().indexOf('subsidary_') !== -1) {
        
            return true;
        }
        else
        {
           return false;
        }
    };
});

App.filter('commaToValue',function($filter) {

  return function(input,obj,key_name='',seperator=', ') {
    // console.log(input);
    var arrResult=[];
    if(typeof input != 'undefined'){
        if (isEmpty(input,false)) {
            return input;
        }
      if(!isNaN(input)){
        var ar=[input];
      } else if(typeof input == 'string') {
        var ar = input.split(',');// this will make string an array
      } else if(typeof input == 'object') {
        var ar = input;
      }
      
      angular.forEach(ar,function(k,v) {
        angular.forEach(obj,function(objkey,objindex) {
            if(ar[v]==obj[objindex]['id']) {
              if(key_name=='date' && typeof obj[objindex][key_name] !== 'undefined') {
                arrResult.push($filter('setDateFormat')(obj[objindex][key_name]));
              } else if(typeof obj[objindex]['name'] !== 'undefined') {
                arrResult.push(obj[objindex]['name']);
              } else if(typeof obj[objindex]['full_name'] !== 'undefined') {
                arrResult.push(obj[objindex]['full_name']);
              }
            }
        });
      });

      return arrResult.join(seperator);
    }else {
      return '-';
   }
    }
});


App.filter('getStateNameWithCode',function() {

  return function(input,obj) {
    // console.log(input);
    var arrResult=[];
    if(typeof input != 'undefined'){
        if (isEmpty(input,false)) {
            return input;
        }
      if(!isNaN(input)){
        var ar=[input];
      }else {
        var ar = input.split(',');// this will make string an array
      }
      angular.forEach(ar,function(k,v) {
        angular.forEach(obj,function(objkey,objindex) {
            if(ar[v]==obj[objindex]['code']) {
              arrResult.push(obj[objindex]['name']);
            }
        });
      });

      return arrResult.join(', ');
    }else {
      return '-';
   }
    }
});


App.filter('currencyWithFixedDecimals', function($filter) {
    return function (number, symbol, force_decimals) {
        var decimals = countDecimals(number);
        
        if (decimals > 8) {
            decimals = 8;
        }

        if (typeof force_decimals != 'undefined' && decimals < force_decimals) {
            decimals = force_decimals;
        }

        return $filter('currency')(number, symbol, decimals);
    }
});


App.filter('titlecase', function() {
    return function(s) {
        s = (s === undefined || s === null) ? '' : s;
        return s.toString().toLowerCase().replace(/\b([a-z])/g, function(ch) {
            return ch.toUpperCase();
        });
    };
});
App.filter('ucfirst', function() {
    return function(input) {
        if (isEmpty(input)) {
            return input;
        }

        if (!isNaN(input)) 
        {
            if(input == 1)
                return "Yes";
            else if(input == 0)
                return "No";
            else
                return input;

        }
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

App.filter('ucwords',function() {
    return function(input, seperator=' ') {
        if (isEmpty(input)) {
            return '';
        }
        if (!isNaN(input)) 
        {
            if(input == 1)
                return "Yes";
            else if(input == 0)
                return "No";
            else
                return input;
        }

        function getString(resultString,currentString) {
            return resultString +" "+currentString.charAt(0).toUpperCase() + currentString.slice(1);
        }

        let strArray = input.split(seperator);
        return strArray.reduce(getString,'');

    }
});


App.filter('objLength', function() {
 return function(object) {
  var count = 0;

  for(var i in object){
    // console.log(i);
    // console.log('@@@@@@@@@@@@@@@@@@@');
    // console.log(count);
    // console.log('##################');
    
    count++;
  }
  return count;
 }
});


App.filter('objToValue',function() {
  return function(input,obj) {
    if(input){
  //  console.log(input);
    var arrResult=[];
    
      var ar = input;
     //  console.log(ar);
      angular.forEach(ar[0],function(k,v) {

        angular.forEach(obj,function(objkey,objindex) {
        //  console.log(k);
        //  console.log(k['user_id'] + " - "+obj[objindex]['id']);

            if(k['user_id']==obj[objindex]['id']) {
              arrResult.push(obj[objindex]['name']);
            }
        });
      });

       return arrResult.join(', ');
    }else {
      return '-';
   }
    }
});


 App.directive('datepickerLocaldate', ['$parse', function ($parse) {
        var directive = {
            restrict: 'A',
            require: ['ngModel'],
            link: link
        };
        return directive;

        function link(scope, element, attr, ctrls) {
            var ngModelController = ctrls[0];

            // called with a JavaScript Date object when picked from the datepicker
            ngModelController.$parsers.push(function (viewValue) {
                // undo the timezone adjustment we did during the formatting
                viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
                // we just want a local date in ISO format
                return viewValue.toISOString().substring(0, 10);
            });

            // called with a 'yyyy-mm-dd' string to format
            ngModelController.$formatters.push(function (modelValue) {
                if (!modelValue) {
                    return undefined;
                }
                // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
                var dt = new Date(modelValue);
                // 'undo' the timezone offset again (so we end up on the original date again)
                dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
                return dt;
            });
        }
    }]);


// App.directive('datepickerLocaldate', ['$parse', function ($parse) {
//     var directive = {
//         restrict: 'A',
//         require: ['ngModel'],
//         link: link
//     };
//     return directive;
//     function link(scope, element, attr, ctrls) {
//         var ngModelController = ctrls[0];

//         // called with a JavaScript Date object when picked from the datepicker
//         ngModelController.$parsers.push(function (viewValue) {
//             console.log(viewValue);console.log(viewValue);console.log(viewValue);
//             // undo the timezone adjustment we did during the formatting
//             viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
//             // we just want a local date in ISO format
//             return viewValue.toISOString().substring(0, 10);
//         });
//     }
// }]);

App.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

App.filter('objToString',function() {
  return function(inputdata,default_value) {
      if(inputdata) {
        if (typeof inputdata !== "object" && !Array.isArray(inputdata)) {
            return inputdata;
        } else {
            var arrResult = [];
            angular.forEach(inputdata,function(v,k) {
                if(typeof v['text'] !== 'undefined') arrResult.push(v['text']);
                else if(typeof v['name'] !== 'undefined') arrResult.push(v['name']);
                else arrResult.push(v);
            });
            //return arrResult.toString();  
            return arrResult.join(', ');
        }
      }else {
          if(typeof default_value !== 'undefined') return default_value;
          else return '-';
      }
  }

});


App.filter('toTrusted', function ($sce) {
    return function (value) {
        return $sce.trustAsHtml(value);
    };
});

App.filter('htmlToText', function ($sce) {
    return function (value) {
      try {
        if (window.jQuery) {  
              value = jQuery(value).text();
          }
          value = value.replace(/<[^>]*>?/gm, '');
          return value;
        }catch(err){
          return value;
        }
        // return $sce.trustAsHtml(value);
    };
});

App.filter('bgv_status_filter',function(){
  return function(inputData){
    if(inputData) {
     return (inputData.replace(/_/g, ' ').replace(/\b\w/g, function(match) {
        return match.toUpperCase();
    }));
    }else{
      return '';
    };
  }
})
App.filter('targetPercentage', ['$window', function ($window) {
  return function (input, total, percentile=0) {
     if ($window.isNaN(input))
         return '';
 
     if (input == 0)
     percentile ? '0%' : 0;
    
     var percentage_amount = ((input*100)/total);
     var fixed_percentage = percentage_amount.toFixed(2);
     var float_percentage = parseFloat(fixed_percentage);
     return percentile ? float_percentage + '%' : float_percentage;
  };
 }]);
App.filter('highlightWord', function($sce,$filter) {
    return function(text, selectedWords,flag=0) {
      // console.log(text);
      // console.log('hi');
      // console.log(selectedWords.length);
      if(isNotEmpty(selectedWords)) {
        selectedWords = Object.values(selectedWords);
        count = $filter('lengthOfObj')(selectedWords);
        

        selectedWords.sort(function(a, b){
          return b.length - a.length;
        });

        // console.log(selectedWords);

        for (var i = 0; i <=  count; i++){
          
          // if (matchword !="") {
            if(isNotEmpty(selectedWords[i])) {
              matchword = selectedWords[i].trim();
           // console.log(selectedWords[i]);
                firstChar = lastChar= matchword
                firstChar = firstChar.substring(0,1);
                lastChar = lastChar.substring(matchword.length,(matchword.length-1));

                if(lastChar=='*') {
                    lastChar = '';
                    matchword = matchword.substring(0,(matchword.length-1));
                    matchword += lastChar;
                    selectedWords[i] = matchword;
                }
                
               matchword = matchword.replace(/([<>*+()?\\])/g, "\\$1");  
                //var pattern = new RegExp("\\b"+matchword+"\\b", "gmi");
              
                 if(text) {
                  // console.log(text.match(pattern).index);
                  text = text.toString();


                  var firstPattern = "\\b";
                  var lastPattern = "\\b";
                  var regPattern  = /^[a-zA-Z0-9]$/;

                  if(!regPattern.test(firstChar)) {
                      firstPattern = "\\B";
                  }
                  if(!regPattern.test(lastChar)) {
                      lastPattern = "\\B";

                  }
                  if(lastChar=='') {
                    lastPattern = '(\w*)';
                  }
                  // console.log(firstPattern+matchword+lastPattern);
                  // text = $sce.trustAsHtml(text.replace(new RegExp(firstPattern+'('+matchword+',)'+lastPattern,'igm'), '<k class="highlighted">' + selectedWords[i] + '</k>,'));

                  // var pattern = new RegExp('(?<!</?[^>]*|&[^;]*)'+firstPattern+'('+matchword+')'+lastPattern,'igm');
                  var pattern='';
                  var pattern = new RegExp(firstPattern+'('+matchword+')'+lastPattern,'igm');

                  var highlightedClass="style='background:#f1c40f;'"
                  if(flag){
                    highlightedClass="style='background:#f39c12;'"
                  }

                  //text = text.replace(pattern, '<span '+highlightedClass+'>'+selectedWords[i]+'</span>');
                  text = text.replace(pattern, "<span "+highlightedClass+">$&</span>");
                  // console.log(text);
                  // text = $sce.trustAsHtml(text.replace(, '<k class="highlighted">' + selectedWords[i] + '</k>'));
                  // text = $sce.trustAsHtml();
              } 
            }
        }
        if(flag) {
          return text;
        }
        return $sce.trustAsHtml(text);
      }
      else { 
        return text;
      }
    };
});
App.filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            if(splitIndex)
                return input.split(splitChar)[splitIndex];
            else
                return input.split(splitChar);

        }
    });

App.filter('reverseSplit', function() {
      return function(input, splitChar, splitIndex) {
              let strArr = input.split(splitChar);
              return strArr[strArr.length - splitIndex];
      }
  });

App.filter('getCountryName',function() {
  return function(input) {

    obj=obj_countries_list;
    field='name';
    var arrResult=[];
    if(input){
      if(!isNaN(input)){
        var ar=[input];
      }else {
        var ar = input.split(','); // this will make string an array
      }
       
      angular.forEach(ar,function(k,v) {
        angular.forEach(obj,function(objkey,objindex) {
            if(ar[v]==obj[objindex]['id']) {
              arrResult.push(obj[objindex][field]);
            }
        });
      });

      return arrResult.toString();
    }else {
      return '-';
   }
    }
});

App.filter('getStateName',function() {
  return function(input, field) {
    var arrResult=[];
    obj=obj_states_list;
    if(isEmpty(field)) field='name';
    if(input){
      if(!isNaN(input)){
        var ar=[input];
      }else if(typeof input !== "object" && !Array.isArray(input)) {

          var ar = input.split(','); // this will make string an array
      }else {
          var ar = input;
      }
      
      angular.forEach(ar,function(k,v) {
        angular.forEach(obj,function(objkey,objindex) {
          if(typeof ar[v] === 'object') {
            if(ar[v]['id']==obj[objindex]['id']) {
              arrResult.push(obj[objindex][field]);
            }
          } else {
            if(ar[v]==obj[objindex]['id']) {
              arrResult.push(obj[objindex][field]);
            }
          }
        });
      });
      return arrResult.toString();
    }else {
      return '-';
   }
    }
});


App.directive('uibDatepickerPopup', function (dateFilter,$filter,$parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModel) {
            if(isNotEmpty(CONFIG_DATE_FORMAT[DATE_FORMAT_JS])) {
              DATE_FORMAT_JS = CONFIG_DATE_FORMAT[DATE_FORMAT_JS];
            }
            if (isNotEmpty(attrs.customFormat)) {
              attrs.$set("uibDatepickerPopup", attrs.customFormat);
            } else {
              attrs.$set("uibDatepickerPopup", DATE_FORMAT_JS);
            }

            element.addClass('CustomDatePickerCls');
           
                 scope.$watch(ngModel, function(value) {
                 var attrName = element.attr('name');
                 element.attr('modelFieldName',attrName);
             });
            
            // ngModel.$viewChangeListeners.push(function(){
            //     $parse(attrs.ngModel).assign(scope, ngModel.$viewValue);
            //     console.log(ngModel);
            // });

          //   ngModel.$parsers.push(function(viewValue) {
          //   date = dateFilter(viewValue,'yyyy-MM-dd');
          //   //console.log(date);
          //  // ngModel['$modelValue'] = date;
          //  // ngModel['$$rawModelValue'] =  new Date(date);
          //  // ngModel.setModelValue = date;
          // //  ngModel.$render();
           
          //   console.log(ngModel);
          //   });
        }
    };
});

App.filter('export_range', function() {
   return function(n,exportLimit) {
       var res = [];
       noOfiteration = Math.ceil(n/exportLimit);
       for (var i = 1; i <= noOfiteration; i++) {
           res.push(parseInt(i));
       }
       return res;
   };
});

App.filter('sqlsetDateFormat',function(dateFilter,$filter){
  return function(input, format) {
      if(input) {
        //console.log(input);
        //alert(input);
        //console.log(dt);
        if(isNotEmpty(CONFIG_DATE_FORMAT[DATE_FORMAT_JS])) {
          DATE_FORMAT_JS = CONFIG_DATE_FORMAT[DATE_FORMAT_JS];
        }
        if(typeof format !='undefined' && format != ''){
            //var dt = new Date(input);
            var dt = getDateBasedOnYearMonthDate(input);
            dt.setMinutes(dt.getMinutes() + 480);
            return dateFilter(dt,DATE_FORMAT_JS+' hh:mm:ss a');
        }
        else {
         //   console.log(input);
        data = input;
        if (typeof input !== "object") 
        { 
          if(input.charAt(input.length-1) =="Z")
          {
            data = input.split('T');
            data = data[0]; 
          }
        }
        //var dt = new Date(data);
        var dt = getDateBasedOnYearMonthDate(data);

        //dt.setMinutes(dt.getMinutes() + 480);
        return dateFilter(dt,DATE_FORMAT_JS);
        }
      }
      return 'N/A';
  }

});


App.filter('setDateFormat',function(dateFilter,$filter){
  return function(input, format, seperator) {
      if(input) {
        if(isNotEmpty(CONFIG_DATE_FORMAT[DATE_FORMAT_JS])) {
          DATE_FORMAT_JS = CONFIG_DATE_FORMAT[DATE_FORMAT_JS];
        }
        if(typeof format !='undefined' && format != '') {
            //var dt = new Date(input);
            var dt = getDateBasedOnYearMonthDate(input);
            if(TIME_FORMAT_JS == 1 || TIME_FORMAT_JS == 0)
            {
              TIME_FORMAT_JS = "hh:mm:ss a";
            }
            return dateFilter(dt,DATE_FORMAT_JS+' '+TIME_FORMAT_JS);
        }
        else {
        data = input;       
        if (typeof input !== "object") { 
            if(input.charAt(input.length-1) =="Z") {
              data = input.split('T');
              data = data[0]; 
              if(data[1] && data[1]>0) {
                //console.log(data[1]);
              }else {
                raw_data = input.split(" ");
                data = raw_data[0];
               //console.log(data); 
              }
            } else {
                //data = new Date(input);
                data = getDateBasedOnYearMonthDate(input);
                if(data == 'Invalid Date'){
                  data = input;
                }
            }
        } 
        // return data;
          // var dt = new Date(data);
        // dt.setMinutes(dt.getMinutes() + 480);
          return dateFilter(data,DATE_FORMAT_JS);
        }
      }
      if(typeof seperator !== 'undefined') return seperator;
      else return 'N/A';
  }

});


/*App.filter('toLocalDate', function() {

  return function(input) {
    date = new Date(input);
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);

    console.log(newDate);
    return newDate;
  }
  
});*/


App.filter('toLocalDate',function(dateFilter,$filter){
  return function(input, format, seperator) {
      if(input) {

        if(isNotEmpty(CONFIG_DATE_FORMAT[DATE_FORMAT_JS])) {
          DATE_FORMAT_JS = CONFIG_DATE_FORMAT[DATE_FORMAT_JS];
        }
        if(typeof format !='undefined' && format != '') {
            var dt = new Date(input);
            if(TIME_FORMAT_JS == 1 || TIME_FORMAT_JS == 0)
            {
              TIME_FORMAT_JS = "hh:mm:ss a";
            }
            
            var newDate = new Date(dt.getTime()+dt.getTimezoneOffset()*60*1000);
            var offset = dt.getTimezoneOffset() / 60;
            var hours = dt.getHours();
            newDate.setHours(hours - offset);
            return dateFilter(newDate,DATE_FORMAT_JS+' '+TIME_FORMAT_JS);
        }
        else {
         //   console.log(input);
        data = input;
        if (typeof input !== "object") 
        {
          if(input.charAt(input.length-1) =="Z")
          { 
            data = input.split('T');
            data = data[0]; 
          }
        } 
          var dt = new Date(data);
          dt.setMinutes(dt.getMinutes() + 480);
          return dateFilter(dt,DATE_FORMAT_JS);
        }
      }
      if(typeof seperator !== 'undefined') return seperator;
      else return 'N/A';
  }

});

App.filter('setReportsDateFormat',function(dateFilter,$filter){
    return function(input, range) {
        if(input) {
         // console.log(input);
               if(isNotEmpty(CONFIG_DATE_FORMAT[DATE_FORMAT_JS])) {
                DATE_FORMAT_JS = CONFIG_DATE_FORMAT[DATE_FORMAT_JS];
              }
              startDate = dateFilter(input['startDate'],DATE_FORMAT_JS);
              endDate = dateFilter(input['endDate'],DATE_FORMAT_JS);
              var returnData = startDate+' to '+endDate;
              var is_loop = 1;
              var jsDateFormat = 'YYYY-MM-DD';
              currnetStartDate = moment(input['startDate']).format(jsDateFormat);
              currentEndDate = moment(input['endDate']).format(jsDateFormat);
              //console.log("---"+input['startDate']+"+++"+input['endDate']);
              angular.forEach(range, function(val,key){
                  //console.log(val[0]);
                  if(is_loop) {
                    startDate = moment(val[0]).format(jsDateFormat);
                    endDate = moment(val[1]).format(jsDateFormat);
                    //console.log(key+"---"+startDate+"+++"+endDate);
                    if( currnetStartDate == startDate &&  currentEndDate == endDate) {
                        returnData = key;
                        //console.log('Welcome');
                        is_loop = 0; //Break;
                    }
                  }
                  
              });
            return returnData;
        }
    }
  });


  App.filter('toCompanyTimezone',function(dateFilter,$filter,$rootScope){
    return function(input, format, seperator) {
        if(input) {
          if(isNotEmpty(CONFIG_DATE_FORMAT[DATE_FORMAT_JS])) {
            DATE_FORMAT_JS = CONFIG_DATE_FORMAT[DATE_FORMAT_JS];
          }
          if(typeof format !='undefined' && format != '') {
              var dt = new Date(input);
              if(TIME_FORMAT_JS == 1 || TIME_FORMAT_JS == 0)
              {
                TIME_FORMAT_JS = "hh:mm:ss a";
              }
              var date = new Date(input);
              var utc = date.getTime();
              var offset;
              $companySettings = $rootScope.masterLayout ? $rootScope.masterLayout['company_settings'] : {};
              angular.forEach(obj_timezones_country_list[$companySettings.country_id],function(val,key){
                if(val.id == $companySettings['timezone']){
                    var getTimezone = val.name.split("(")[1].split(")")[0];
                    if(getTimezone.indexOf(":") != -1){
                      var hrs = getTimezone.split(":")[0];
                      var mins = getTimezone.split(":")[1];
                      if(hrs.indexOf("-") != -1){
                         var totalHours = hrs.split("-")[1] * 60;
                         offset = -((parseInt(totalHours) + parseInt(mins)) / 60);
                      }
                      else{
                         var totalHours = hrs.split("+")[1] * 60;
                         offset = +((parseInt(totalHours) + parseInt(mins)) / 60);
                      }
                    }
                    else{
                      var hrs = getTimezone.split(".")[0];
                      var mins = getTimezone.split(".")[1];
                      if(hrs.indexOf("-") != -1){
                         var totalHours = hrs.split("-")[1] * 60;
                         offset = -((parseInt(totalHours) + parseInt(mins)) / 60);
                      }
                      else{
                         var totalHours = hrs.split("+")[1] * 60;
                         offset = +((parseInt(totalHours) + parseInt(mins)) / 60);
                      }
                    }
                }
              });
              var newDate = new Date(utc + (3600000 * (offset)));
              return dateFilter(newDate,DATE_FORMAT_JS+' '+TIME_FORMAT_JS);
          }
          else {
           //   console.log(input);
          data = input;
          if (typeof input !== "object") 
          {
            if(input.charAt(input.length-1) =="Z")
            { 
              data = input.split('T');
              data = data[0]; 
            }
          } 
            var dt = new Date(data);
            dt.setMinutes(dt.getMinutes() + 480);
            return dateFilter(dt,DATE_FORMAT_JS);
          }
        }
        if(typeof seperator !== 'undefined') return seperator;
        else return 'N/A';
    }
  
  });

  App.filter('toHours',function(dateFilter,$filter,$rootScope){
    return function(input, format, seperator) {
        if(input) {
          if(isNotEmpty(CONFIG_DATE_FORMAT[DATE_FORMAT_JS])) {
            DATE_FORMAT_JS = CONFIG_DATE_FORMAT[DATE_FORMAT_JS];
          }
          if(typeof format !='undefined' && format != '') {
              var dt = new Date(input);
              if(TIME_FORMAT_JS == 1 || TIME_FORMAT_JS == 0)
              {
                TIME_FORMAT_JS = "hh:mm:ss a";
              }
              var date = new Date(input);
              var utc = date.getTime();
              var offset;
              $companySettings = $rootScope.masterLayout ? $rootScope.masterLayout['company_settings'] : {};
              angular.forEach(obj_timezones_country_list[$companySettings.country_id],function(val,key){
                if(val.id == $companySettings['timezone']){
                    var getTimezone = val.name.split("(")[1].split(")")[0];
                    if(getTimezone.indexOf(":") != -1){
                      var hrs = getTimezone.split(":")[0];
                      var mins = getTimezone.split(":")[1];
                      if(hrs.indexOf("-") != -1){
                         var totalHours = hrs.split("-")[1] * 60;
                         offset = -((parseInt(totalHours) + parseInt(mins)) / 60);
                      }
                      else{
                         var totalHours = hrs.split("+")[1] * 60;
                         offset = +((parseInt(totalHours) + parseInt(mins)) / 60);
                      }
                    }
                    else{
                      var hrs = getTimezone.split(".")[0];
                      var mins = getTimezone.split(".")[1];
                      if(hrs.indexOf("-") != -1){
                         var totalHours = hrs.split("-")[1] * 60;
                         offset = -((parseInt(totalHours) + parseInt(mins)) / 60);
                      }
                      else{
                         var totalHours = hrs.split("+")[1] * 60;
                         offset = +((parseInt(totalHours) + parseInt(mins)) / 60);
                      }
                    }
                }
              });
              var newDate = new Date(utc + (3600000 * (offset)));
              return timeSince(newDate, offset)
              // return dateFilter(newDate,DATE_FORMAT_JS+' '+TIME_FORMAT_JS);
          }
          else {
           //   console.log(input);
          data = input;
          if (typeof input !== "object") 
          {
            if(input.charAt(input.length-1) =="Z")
            { 
              data = input.split('T');
              data = data[0]; 
            }
          } 
            var dt = new Date(data);
            dt.setMinutes(dt.getMinutes() + 480);
            return dateFilter(dt,DATE_FORMAT_JS);
          }
        }
        if(typeof seperator !== 'undefined') return 'N/A';
        else return 'N/A';
    }
  
  });

  function timeSince(date,offset) {

    var seconds = Math.floor((new Date(new Date().getUTCFullYear(),new Date().getUTCMonth(),new Date().getUTCDate(),new Date().getUTCHours(),new Date().getUTCMinutes(),new Date().getUTCSeconds(),new Date().getUTCMilliseconds()) - date + (offset * 60 * 60 * 1000)) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minutes ago";
    }
    // return Math.floor(seconds) + " seconds ago";
    return "Less than a minute ago";
  }
  

App.filter('setDateFormatPromotions',function(dateFilter,$filter){
  return function(input, format, seperator) {
      if(input) {
        //console.log(input);
        //alert(input);
        //console.log(dt);
        if(typeof format !='undefined' && format != ''){
            var dt = new Date(input);
            return dateFilter(dt,DATE_FORMAT_JS);
        }
        else {
         //   console.log(input);
        data = input;
        if (typeof input !== "object") 
        {
          if(input.charAt(input.length-1) =="Z")
          { 
            data = input.split('T');
            data = data[0]; 
          }
        } 
          var dt = new Date(data);
          dt.setMinutes(dt.getMinutes() + 480);
          return dateFilter(dt,DATE_FORMAT_JS);
        }
      }
      if(typeof seperator !== 'undefined') return seperator;
      else return 'N/A';
  }

});


App.filter('setCalDateFormat',function(dateFilter,$filter){
  return function(input, format, seperator) {
      if(input) {
        //console.log(input);
        //alert(input);
        //console.log(dt);
        if(typeof format !='undefined' && format != ''){
            var dt = new Date(input);
            return dateFilter(dt,DATE_FORMAT_JS+' '+TIME_FORMAT_JS);
        }
        else {
         //   console.log(input);
        data = input;
        if (typeof input !== "object") { 
          if(input.charAt(input.length-1) =="Z")
          {
            data = input.split('T');
            data = data[0]; 
          }
        } else {
            data = input.split(' ');
            data = data[0];
        }
          var dt = new Date(data);
         // dt.setMinutes(dt.getMinutes() + 480);
          return dateFilter(dt,DATE_FORMAT_JS);
        }
      }
      if(typeof seperator !== 'undefined') return seperator;
      else return 'N/A';
  }

});


App.filter('setDateobjInterview',function(dateFilter,$filter){
  return function(input, format) { 
  tempinput = {}   
  if(input) { 
    if (typeof input !== "object" && !Array.isArray(input)) {
      console.log(DATE_FORMAT_JS);
      if(DATE_FORMAT_JS == 'dd/MM/yy') {
        tempinput = input.split('/');
        if(tempinput[2].length==2) tempinput[2] = (tempinput[2]>50) ? '19'+tempinput[2] : '20'+tempinput[2];
        input = tempinput[2]+'-'+tempinput[1]+'-'+tempinput[0];     
      } else if(DATE_FORMAT_JS == 'dd/MM/yyyy') {
        tempinput = input.split('/');
        input = tempinput[2]+'-'+tempinput[1]+'-'+tempinput[0];
      } else if(DATE_FORMAT_JS == 'MM/dd/yy') {
         tempinput = input.split('/');
         if(tempinput[2].length==2) tempinput[2] = (tempinput[2]>50) ? '19'+tempinput[2] : '20'+tempinput[2];
          input = tempinput[2]+'-'+tempinput[0]+'-'+tempinput[1];
      } else if(DATE_FORMAT_JS == 'MM/dd/yyyy') {
         tempinput = input.split('/');
         input = tempinput[2]+'-'+tempinput[0]+'-'+tempinput[1];
      } else if(DATE_FORMAT_JS == 'dd/MMM/yyyy') {
          tempinput = input.split('/');
          input = tempinput[2]+'-'+tempinput[1]+'-'+tempinput[0];
          input = new Date(input);
          //console.log('hi');
      }
      else if(DATE_FORMAT_JS == 'dd/MMM/y') {
          tempinput = input.split('/');
          input = tempinput[2]+'-'+tempinput[1]+'-'+tempinput[0];
          input = new Date(input);
          //console.log('hi');
      }
      else if(DATE_FORMAT_JS == 'MMMM d, y') {
         tempinput =input.split(/[ ,]+/);
          input = tempinput[2]+'-'+tempinput[1]+'-'+tempinput[0];
          input = new Date(input);
          //console.log('hi');
      }
      else if(DATE_FORMAT_JS == 'dd/MM/y') {
        tempinput = input.split('/');
        input = tempinput[2]+'-'+tempinput[1]+'-'+tempinput[0];
      } 
      else if(DATE_FORMAT_JS == 'MM/dd/y') {
         tempinput = input.split('/');
         input = tempinput[2]+'-'+tempinput[0]+'-'+tempinput[1];
      }
    } 
   // console.log(input);

  }
    //alert(input);
      if(input) {
         return  input;
      }
      return '';
    }
  });


App.filter('setDateobj',function(dateFilter,$filter){
  return function(input, format) {
      if(input) {
         return  dt = new Date(input);

      }
      return '';
    }
  });

App.filter('convertCstToIst',function(dateFilter,$filter){
  return function(input, format) {
      if(input) {
        var dt = new Date(input);
        var cstTime = dt.getTime();
        return cstTime - (11.5 * 60 * 60 * 1000);
      }
      return '';
    }
  });


App.filter('numToDate',function(dateFilter,$filter){
    return function(input, format) {
        if(input) {
          var current = new Date();
          current = current.getTime();
          var msPerMinute = 60 * 1000;
          var msPerHour = msPerMinute * 60;
          var msPerDay = msPerHour * 24;
          var msPerWeek = msPerDay * 7;
          var msPerMonth = msPerDay * 30;
          var msPerYear = msPerDay * 365;

          var elapsed = current - input;

          if (elapsed < msPerMinute) {
               return Math.round(elapsed/1000) + ' seconds ago';   
          }else if (elapsed < msPerHour) {
               return Math.round(elapsed/msPerMinute) + ' minutes ago';   
          }else if (elapsed < msPerDay ) {
               return Math.round(elapsed/msPerHour ) + ' hours ago';   
          }else if (elapsed < msPerWeek) {
              return Math.round(elapsed/msPerDay) + ' days ago';   
          }else if (elapsed < msPerMonth) {
              return Math.round(elapsed/msPerWeek) + ' weeks ago';   
          }else if (elapsed < msPerYear) {
              return Math.round(elapsed/msPerMonth) + ' months ago';   
          }else {
              return Math.round(elapsed/msPerYear ) + ' years ago';   
          }
        }
        return '';
      }
      
  });

App.filter('experienceNumToYearMonths',function(){
  return function(input, format) {
      if((input['@attributes'] == undefined) && input!='0.00'){
       var splitExp = input.split('.');
       var result='';
       if(splitExp[0]!='0' && splitExp[0]!=undefined)
       {
       result+=splitExp[0]+' Year ';
       }
       if(splitExp[1]!='00' && splitExp[1]!=undefined)
       {
       result+=splitExp[1]+' Months';
       }
       return result;
      }else{
        return 'Not Specified';
      }
  }
});

App.filter('setTimeFormat',function(dateFilter,$filter){
  return function(input, format) {
      if(input) {

        //console.log(input);
        var dt=new Date(input);
        //console.log(dt);
        if(typeof format !='undefined' && format != '')
            return dateFilter(dt,'hh:mm a');
        else
            return dateFilter(dt,'hh:mm a');
      }
      return 'N/A';
  }

});

App.directive('focusMe', function($timeout, $parse) {
  return {
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        console.log('value=',value);
        if(value === true) { 
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
      element.bind('blur', function() {
        console.log('blur')
        scope.$apply(model.assign(scope, false));
      })
    }
  };
});




/* App.directive("validateDate", function() {
     return {
         require: 'ngModel',
         link: function(scope, elm, attrs, ctrl) {
             ctrl.$validators.validateDate = function(modelValue, viewValue) {
                 if(!isNaN(modelValue) || ctrl.$isEmpty(modelValue)){
                     return true;
                 }
                 return false;
             };
         }
     };
 });*/

App.directive('myDate', function(dateFilter) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
         ngModel.$parsers.push(function(viewValue) {
          
        return dateFilter(viewValue,DATE_FORMAT_JS);
    //   return $filter('date')(viewValue,'yyyy-MM-dd');
     });

        
    }
  };
});

App.directive('sysDate', function(dateFilter,$parse) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
       //value = ngModel.$viewValue;

        // ngModel.$viewChangeListeners.push(function(){
        //     $parse(attrs.ngModel).assign(scope, ngModel.$viewValue);
        //     console.log(ngModel);
        // });

        ngModel.$parsers.push(function(viewValue) {
            date = dateFilter(viewValue,'yyyy-MM-dd');
            //console.log(date);
           // ngModel['$modelValue'] = date;
            ngModel['$$rawModelValue'] =  new Date(date);
           // ngModel.setModelValue = date;
          //  ngModel.$render();
           
            console.log(ngModel);
        });
        //  ngModelCtrl.$viewValue = '111';
        //     ngModelCtrl.$render(); 

        //     ngModelCtrl.$modelValue = value;
        //     scope.ngModel = value; // overwrites ngModel value


       
        // console.log(ngModelCtrl);
        

        // ngModel.$parsers.push(function(viewValue) {
          
        // return dateFilter(viewValue,DATE_FORMAT_JS);
        // //   return $filter('date')(viewValue,'yyyy-MM-dd');
        //  });

        //return dateFilter(ngModel.viewValue,DATE_FORMAT_JS);

        // ngModel.$parsers.push(function(viewValue) {
        // date = dateFilter(viewValue,'yyyy-MM-dd');
        // console.log(ngModel);
        // ngModel.$setModelValue = date;
        //   //ngModel.$setModelValue(date);
        //    ngModel.$render();
        // return viewValue;

        //return $filter('date')(viewValue,'yyyy-MM-dd');
  //  });
    }
  };
});

App.directive('myTime', function(dateFilter) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
         ngModel.$parsers.push(function(viewValue) {
          
      return dateFilter(viewValue,'HH:mm:ss');
    //   return $filter('date')(viewValue,'yyyy-MM-dd');
     });
        
    }
  };
});

App.directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compile);
      },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      }
   )};
}]);

App.filter('matchKeyField',function() {
  return function(input,obj,field) {
    var arrResult=[];
    if(input){
      if(!isNaN(input)){
        var ar=[input];
      }else {
        var ar = input.split(','); // this will make string an array
      }
       
      angular.forEach(ar,function(k,v) {
        angular.forEach(obj,function(objkey,objindex) {
            if(ar[v]==obj[objindex]['id']) {
              arrResult.push(obj[objindex][field]);
            }
        });
      });

      return arrResult.toString();
    }else {
      return 'N/A';
   }
    }
});



App.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        // Check val has any string
        if(/^[a-zA-Z]/.test(val))
        {
          return val != null ? val : null;
        }
        else
        {
          return val != null ? parseInt(val, 10) : null;
        }
      });
      ngModel.$formatters.push(function(val) {
        return val != null ? '' + val : val;
      });
    }
  };
});
App.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        // If we want 1 decimal place, we want to mult/div by 10
        // If we want 2 decimal places, we want to mult/div by 100, etc
        // So use the following to create that factor
        var factor = "100" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
});

App.filter('lengthOfObj',function() {
  return function(input) {
      count=Object.keys(input).length;
      return count;
    }
});

App.filter('getFirstKey',function() {
  return function(input) {
      angular.forEach(input,function(k,v) {
          console.log(v);
          return v;
      });
      //count=Object.keys(input).length;
      return 0;
    }
});


App.filter('getFirstKeyVal',function() {
  return function(input) {
      return Object.keys(input)[0];
    }
});


var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};
 App.filter('highlight', function($sce) {
    return function(text, phrase) {      
      if (phrase && text) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="highlighted">$1</span>')
         return $sce.trustAsHtml(text)
    }
  });

//Remove Html Tags
App.filter('removeHTMLTags', function() {
  return function(text) {
    //return  text ? String(text).replace(/<?!br[^>]+>/gm, '') : '';
    return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
  };
});


App.directive("compareTo", compareTo);







App.directive('buttonSpinner', ["$compile", function ($compile) {
    return {
        restrict: 'A',
        scope: {
            spinning: '=buttonSpinner',
            spinningIcon: '@?',
            buttonPrepend: '@?',
            buttonAppend: '@?'
        },
        transclude: true,
        template: 
        "<span ng-if=\"!!buttonPrepend\" ng-hide=\"spinning\"><i class=\"{{ buttonPrepend }}\"></i>&nbsp;</span>" +
        "<span ng-if=\"!!buttonPrepend\" ng-show=\"spinning\"><i class=\"{{ !!spinningIcon ? spinningIcon : 'mdi mdi-loading mdi-spin' }}\"></i>&nbsp;</span>" +
        "<ng-transclude></ng-transclude>" +
        "<span ng-if=\"!!buttonAppend\" ng-hide=\"spinning\">&nbsp;<i class=\"{{ buttonAppend }}\"></i></span>" +
        "<span ng-if=\"!buttonPrepend\" ng-show=\"spinning\">&nbsp;<i class=\"{{ !!spinningIcon ? spinningIcon : 'mdi mdi-loading mdi-spin' }}\"></i></span>"
    }
}]);

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


// Select filter
App.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});


App.directive('winHeight', function ($window) {
    return{
        link: function (scope, element, attrs) {
            // $window.resize(function () {
            //     scope.winHeight();
            // });

            var topClass = attrs.winHeight;
            //alert(topClass);
             scope.$watch(function(){
              // var he = scope.winHeight();
              //  //alert(he);
              //   if(topClass) {
              //     var myEl = angular.element( document.querySelector( '#'+topClass ) );
              //     myEl.css('color','red');
              //   }else {
              //       attrs.$set('style', 'height:' + he+'px');
              //   }

              setTimeout(function () {
               var he = scope.winHeight();
               //alert(he);
               // attrs.$set('style', 'height:' + he+'px');
               attrs.$set('style', 'height:' + he+'px');
            }, 150);
                //
             });

            
            scope.winHeight = function () {
                //alert(angular.element('#PoolSubmissionCtrlID').height());
                return angular.element(document.querySelector('#'+topClass))[0].offsetHeight;
                //                element.css('height', );
            }
        }
    }
});

 App.filter('range', function(){
    return function(n) {
      var res = [];
      for (var i = 1; i <= n; i++) {
        res.push(i);
      }
      return res;
    };
  });

 App.filter('customRange', function(){
    return function(n) {
      var res = [];
      for (var i = 1; i <= n; i++) {
        res.push(i);
      }
      return res;
    };
  });

 App.directive('backButton', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    //alert('hi');
                    //console.log($window.history);
                    if($window.history['length']==1) {
                      window.location = ROOT_URL+'#/applications';
                    } else {
                      $window.history.back();
                    }
                    //
                });
            }
        };
  }]);

 App.directive('setTableMaxHeight', function($window){
  return{
    link: function(scope, element, attrs){
      removeHeight = parseInt(attrs.setTableMaxHeight);
        if(!scope.closeTrialNotification && scope.isShowTrailNotification)
        {
              removeHeight =  removeHeight-20;
        }
        element.css('max-height', ($window.innerHeight-removeHeight) + 'px');
    }
  }
});

 App.directive('setTableMinHeight', function($window){
  return{
    link: function(scope, element, attrs){
      removeHeight = parseInt(attrs.setTableMaxHeight);
      
      if(!scope.closeTrialNotification && scope.isShowTrailNotification)
      {
              removeHeight =  removeHeight-20;
      }
      element.css('min-height', ($window.innerHeight-removeHeight) + 'px');
    }
  }
});


App.factory('Flash', function() {
  return {
    message: ''
  };
});

// App.factory('Thread', function($resource) {
//   return $resource('api/threads/:id.json', {
//     id: 'index'
//   });
// });


 App.filter('smartDate', function($filter) {
  var $dateFilter;
  $dateFilter = $filter('date');
  return function(date) {
    var oneDayAgo;
    

    oneDayAgo = Date.now() - 86400000;
    date = date*1000;
    year = $dateFilter(date, "yyyy");
    old_year = $dateFilter(oneDayAgo, "yyyy");
    
    if (date < oneDayAgo) {
      return $dateFilter(date, "MMM dd");
    }else if(year != old_year){
      return $dateFilter(date, "yyyy MMM dd");
    } else {
      return $dateFilter(date, "h:mm a");
    }
  };
});


App.filter('convetTimeStamp', function() {
  return function(date) {
    if(date){
      return (new Date(date)).getTime() / 1000;
    }else {
      return '';
    }
    
  };
});

App.filter('diffCurrentDay', function($filter) {
  return function(date) {
    if(date) {
      var day_start = new Date();
      var day_end = new Date(date);
      var total_days = (day_end - day_start) / (1000 * 60 * 60 * 24);
      if(total_days < 0) {
          total_days = 0;
      }
      return Math.round(total_days);
    }else {
      return 0;
    }
  }

});

App.filter('timeAgo', function($filter) {
  var units;
  units = [
    {
      name: "second",
      limit: 60,
      in_seconds: 1
    }, {
      name: "minute",
      limit: 3600,
      in_seconds: 60
    }, {
      name: "hour",
      limit: 86400,
      in_seconds: 3600
    }, {
      name: "day",
      limit: 604800,
      in_seconds: 86400
    }, {
      name: "week",
      limit: 2629743,
      in_seconds: 604800
    }, {
      name: "month",
      limit: 31556926,
      in_seconds: 2629743
    }, {
      name: "year",
      limit: null,
      in_seconds: 31556926
    }
  ];
  return function(date) {
    var diff, i, len, unit;
    diff = (Date.now() - date*1000) / 1000;
    if (diff < 5) {
      return "just now";
    }
    for (i = 0, len = units.length; i < len; i++) {
      unit = units[i];
      if (diff < unit.limit || !unit.limit) {
        diff = Math.floor(diff / unit.in_seconds);
        return diff + " " + unit.name + (diff > 1 ? 's' : '') + " ago";
      }
    }
  };
});

App.filter('smartName', function() {
  return function(person, fullName) {
    if (fullName == null) {
      fullName = true;
    }
    if (currentUser.email === person.email) {
      return 'me';
    } else if (fullName) {
      return (person.name).trim();
    } else {
      return person.email;
    }
  };
});

App.filter('nameAndEmail', function() {
  return function(person) {
    return person.name + " <" + person.email + ">";
  };
});

App.filter('getParticipantsNames', function() {
  return function(person) {
    
     var arrResult=[];
     angular.forEach(person,function(k,v) {
        if(k['name']){
        arrResult.push(k['name']);
        }
     });
     names =  arrResult.join(', ');
     return (names.length>20)?(names.substring(0, 20)+'...'):names;
    //return person.name + " <" + person.email + ">";
  };
});

App.filter('extension', function() {
    return function(input) {
      if(input)
      return input.split('.').pop();
      else
      return '';  
    };
  });

App.filter('roundup', function () {
        return function (value) {
            return Math.ceil(value);
        };
});

App.filter('jsonToParse',function() {
  return function(input) {
      return JSON.parse(input);
  }
});

App.filter('convertIdToValue',function() {
  return function(input,obj,seperator, limit) {
    var arrResult=[];
    if(input){
      if(!isNaN(input)){
        var ar=[input];
      }else {
        var ar = input.split(','); // this will make string an array
      }
      angular.forEach(ar,function(k,v) {
        angular.forEach(obj,function(objvalue,objkey) {
            if(ar[v]==objkey) {
              arrResult.push(objvalue);
            }
        });
      });
      arrResultStr = arrResult.join(', ');
      if((typeof limit !== 'undefined') && (arrResultStr.length > limit)) arrResultStr = arrResultStr.substr(0, limit-1)+'...';
      return arrResultStr;
    }else {
      if(typeof seperator !== 'undefined') return seperator;
      else return '-';
   }
    }
});

App.filter('email_exploder',function() {
  return function(input,pattern,type) {
    if(input){
      return_value = '-';
      if(!isNaN(input)){
        var full_name = [input, input];
      }else {
        var full_name_email = input.split('@');
        var full_name = full_name_email[0];
        if(pattern == '{first}.{last}' || pattern == '{f}.{last}') {
          var full_name_arr = full_name.split('.');

          if(type == 'first_name') return_value = full_name_arr[0];
          else if(type == 'last_name') return_value = full_name_arr[1];
        } else if(pattern == '{f}{last}') {
          if(type == 'first_name') return_value = full_name.charAt(0);
          else if(type == 'last_name') return_value = full_name.substr(1);
        } else if(pattern == '{last}.{first}' || pattern == '{l}.{first}') {
          var full_name_arr = full_name.split('.');

          if(type == 'first_name') return_value = full_name_arr[1];
          else if(type == 'last_name') return_value = full_name_arr[0];
        } else if(pattern == '{l}{first}') {
          if(type == 'first_name') return_value = full_name.substr(1);
          else if(type == 'last_name') return_value = full_name.charAt(0);
        } else {
          if(type == 'first_name') return_value = full_name;
          else if(type == 'last_name') return_value = ''; 
        }
      }
      return return_value;
    }else {
      return '-';
   }
    }
});

App.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});


App.filter('firstletter', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() : '';
    }
});

App.filter('snakeCase', function() {
    return function(input) {
     var words = input.split('_');
     for ( var i = 0, len = words.length; i < len; i++ )
         words[i] = words[i].charAt( 0 ).toUpperCase() + words[i].slice( 1 );
     return words.join( ' ' );
    }
});


App.filter('dicedate', function() {
    return function(input) {
      if(input) {
       objData = input.split(" ");
        // console.log(objData);
        date = objData[2];
        month = objData[1];
        year = objData[5];

      return month+"/"+date+"/"+year;
      //return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
    else {
      return '';
    }
  } 
});

App.filter('getEmailCount',function() {
  return function(input,obj) {
    var arrResult=[];
    if(input){
        var totalEmails = 0;
        angular.forEach(obj,function(opt,key) {
              if(isNotEmpty(opt.get_contacts_count)){
                totalEmails += opt.get_contacts_count.length
              }else if(isNotEmpty(opt.get_contacts_cnt)){
                totalEmails += opt.get_contacts_cnt
              }
        });
     
      return input+" ("+totalEmails+")";
    }else {
      return '-';
   }
    }
});

App.filter('convertDateFormat', function() {
    return function(input, date_format) {
      if(input) {
        inputarr = input.split(' ');
        input = inputarr[0];
        if(!date_format) date_format = 'yyyy/mm/dd';

        if(date_format == 'yyyy/mm/dd') {
          objData = input.split("/");
          // console.log(objData);
          date = objData[2];
          month = objData[1];
          year = objData[0];
        } else if(date_format == 'mm/dd/yyyy') {
          objData = input.split("/");
          // console.log(objData);
          date = objData[1];
          month = objData[0];
          year = objData[2];
        }
        
        if(typeof date === 'undefined') return '-';
        return month+"/"+date+"/"+year;
        //return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
    else {
      return '';
    }
  } 
});

App.filter('careerbuilderLocation', function() {
    return function(input) {
      if(input) {
        objData = input.split("-");
        // console.log(objData);
        city = objData[2];
        state = objData[1];
        country = objData[0];
        
        return city+", "+state;
        //return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
    else {
      return '';
    }
  } 
});

App.filter('toNumber', function() {
    return function(input) {
      if(input) {
        return Math.round(input);
    }
    else {
      return '';
    }
  } 
});

App.filter('monsterJobTypeFilter', function() {
  return function(input) {
    if(input) {
      if(typeof input === 'object') {
        if(typeof input['JobType'] !== 'undefined') {
          if(typeof input['JobType'] === 'object') {
            var input = Object.values(input['JobType']).join(",");
            return input;
          } else {
            return input['JobType'];
          }
        } else {
          return '-';  
        }
      } else {
        return input;  
      }
    }
    else {
      return '';
    }
  } 
});

App.filter('monsterSalaryFilter', function() {
  return function(input) {
    if(input) {
      if(typeof input === 'object') {
        if(input['Min'] && (typeof input['Min'] === 'string') && (input['Max'] != '0')) {
          if(typeof input['Type'] === 'string') {
            var salary_type = input['Type'];
          } else {
            var salary_type = '';
          }
          if(typeof input['Currency'] === 'string') {
            var currency_type = input['Currency'];
          } else {
            var currency_type = '';
          }
          return input['Min']+' - '+input['Max']+' '+currency_type+'/'+salary_type;
        } else {
          return '-';
        }
      } else {
        return input;  
      }
    }
    else {
      return '';
    }
  } 
});

App.filter('monsterWorkauthFilter', function() {
  return function(input, power) {
    if(input) {
      if(typeof input === 'object') {
        if(typeof input['WorkAuth'] !== 'undefined') {
          if(typeof input['WorkAuth']['Country'] !== 'undefined') {
            if(input['WorkAuth']['AuthType'] == 'Authorized' || input['WorkAuth']['AuthType'] == 'Authorized Current') {
              if(typeof power !== 'undefined') {
                return input['WorkAuth']['Country'] + ' Authorized';
              } else {
                return input['WorkAuth']['Country'];
              }
            } else {
              return '-';
            }
          } else {
            var country = '';
            angular.forEach(input['WorkAuth'],function(opt,key) {
              if(typeof opt['Country'] !== 'undefined') {
                if(opt['AuthType'] == 'Authorized' || opt['AuthType'] == 'Authorized Current') {
                  if(country) country += ', ';
                  country += opt['Country'];
                }
              }
            });
            if(country == '') country = '-';
            if(typeof power !== 'undefined') {
              return country + ' Authorized';
            } else {
              return country;
            }
          }
        } else {
          return '-';  
        }
      } else {
        return input;  
      }
    }
    else {
      return '';
    }
  } 
});

App.filter('toFloat', function() {
  return function(input, decimals) {
    if(input) {
      input = parseFloat(input);
      return input.toFixed(decimals);
    }
    else {
      return 0;
    }
  } 
});

App.filter('monsterEducationFilter', function() {
  return function(input) {
    if(typeof input === 'object') {
      if(typeof input[0] === 'undefined') {
        input[0] = input;
      }

      if(typeof input[0]['Level'] === 'string') {
        return input[0]['Level'];
      } else {
        return '';
      }
    } else {
      return '';
    }

  } 
});

App.filter('monsterJobBoardsFilter', function() {
  return function(input) {
    if(input) {
      if(typeof input === 'object') {
        if(typeof input['Board'] !== 'undefined') {
          if(typeof input['Board'] === 'object') {
            var input = Object.values(input['Board']).join(", ");
            return input;
          } else {
            return input['Board'];
          }
        } else {
          return '-';  
        }
      } else {
        return input;  
      }
    }
    else {
      return '';
    }
  } 
});

App.filter('monsterPowerEducationFilter', function() {
  return function(input, monsterEducationObj) {
    if(input) {
      var res_input = input;
      angular.forEach(monsterEducationObj,function(opt,key) {
        if(opt['id'] == input) {
          res_input = opt['name'];
          return false;
        }
      });
      return res_input;
    } else {
      return '-';
    }
  } 
});

App.filter('monsterAddressFilter', function() {
  return function(input) {
    if(input) {
      objData = input.split("-");
      city = objData[2];
      state = objData[1];
      country = objData[0];
      
      return city+", "+state;
    } else {
      return '-';
    }
  } 
});

App.filter('monsterJellyJobTitleCompanyFilter', function() {
  return function(input) {
    if(input) {
      if(typeof input[0] === 'undefined') {
        input[0] = input;
      }
      
      angular.forEach(input,function(opt,key) {
        if((typeof opt['Job']['Title']['@attributes']['JellyDot'] !== 'undefined') && (opt['Job']['Title']['@attributes']['JellyDot'])) {
          var start_year = opt['DateFrom']['@attributes']['Year'].slice(-2);
          var end_year = opt['DateTo']['@attributes']['Year'].slice(-2);
          res_input = opt['Job']['Title'] + ', ' + opt['Company']['Name'] + ' (' + start_year + ' - ' + end_year + ')';
          return false;
        }
      });

      return res_input;
    } else {
      return '-';
    }
  } 
});

App.filter('monsterDateFilter', function() {
  return function(input) {
    if(input) {
      var dt1 = new Date(input);
      var dt2 = new Date();
      var diffDays  = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
      
      return diffDays + 'days ago';
    } else {
      return '-';
    }
  } 
});


// Commented by Anil, already one function in app.js
// function isEmpty(obj){
//   for (var i in obj) if (obj.hasOwnProperty(i)) return false;
//     return true;
// } 

App.directive('ngMin', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var minValidator = function (value) {
                var min = scope.$eval(attr.ngMin) || 0;
                if (!isEmpty(value) && value < min) {
                    ctrl.$setValidity('ngMin', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
});

App.directive('ngMax', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function () {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function (value) {
                var max = scope.$eval(attr.ngMax) || Infinity;
                if (!isEmpty(value) && value > max) {
                    ctrl.$setValidity('ngMax', false);
                    return undefined;
                } else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
});


// to convert number to us format
App.filter('tel', function () {
    return function (tel) {
        return tel;
        // console.log(tel);
        // if (!tel && REGION !='usa') { return ''; }

        // var value = tel.toString().trim().replace(/^\+/, '');

        // if (value.match(/[^0-9]/)) {
        //     return tel;
        // }

        // var country, city, number;

        // switch (value.length) {
        //     case 1:
        //     case 2:
        //     case 3:
        //         city = value;
        //         break;

        //     default:
        //         city = value.slice(0, 3);
        //         number = value.slice(3);
        // }

        // if(number){
        //     if(number.length>3){
        //         number = number.slice(0, 3) + '-' + number.slice(3,7);
        //     }
        //     else{
        //         number = number;
        //     }

        //     return ("(" + city + ") " + number).trim();
        // }
        // else{
        //     return "" + city;
        // }

    };
});

App.filter('numberFormat', function () {
    return function (input,country) {
        if(input==0) {
            input = '';
        }

         if(country == 'usa' && input && (!(typeof CURRENCY === 'undefined') && CURRENCY != 'INR')){
            input2 = input;
            input = input.replace(/" "/g,"");
            input = input.replace(/-/g,"");
            input = input.replace("(","");
            input = input.replace(")","");
            input = input.replace(/\+/g,"");
          if(input.length == 10 ){
             $firstPart =  input.substring(0,3);
             $secondPart = input.substr(3,3);
             $thirdPart = input.substr(6,input.length-1);
             return "("+$firstPart+") "+$secondPart+"-"+$thirdPart;
          }
          else{
            return input2;
          }
          
        }
        else{
          return input;
        }
       
    };
});

App.filter('ssnFilter', function() {
    return function(value, mask = false) {
      if (value) {
        val = value.toString().replace(/\D/g, "");
        len = val.length;
        if (len < 4) {
          return val;
        } else if ((3 < len && len < 6)) {
          if (mask) {
            return `***-${val.substr(3)}`;
          } else {
            return `${val.substr(0, 3)}-${val.substr(3)}`;
          }
        } else if (len > 5) {
          if (mask) {
            return `***-**-${val.substr(5, 4)}`;
          } else {
            return `${val.substr(0, 3)}-${val.substr(3, 2)}-${val.substr(5, 4)}`;
          }
        }
      }
      return value;
    };
});


App.filter('aadharFilter', function() {
    return function(value, mask = false) {
      if (value) {
        val = value.toString().replace(/\D/g, "");
        len = val.length;
        if (len < 5) {
          return val;
        } else if ((4 < len && len < 9)) {
          if (mask) {
            return `***-${val.substr(4)}`;
          } else {
            return `${val.substr(0, 4)}-${val.substr(4)}`;
          }
        } else if (len > 9) {
          if (mask) {
            return `****-***-${val.substr(8, 4)}`;
          } else {
            return `${val.substr(0, 4)}-${val.substr(4, 4)}-${val.substr(8, 4)}`;
          }
        }
      }
      return value;
    };
});




App.filter("ssnReverse", function() {
    return function(value) {
      if (!!value) {
        return value.replace(/\D/g, "").substr(0, 9);
      }
      return value;
    };
});
// Top skills filter for Monster
App.filter('getTopSkillsByDateYear', function() {
 return function(input, selectedWords) {
    if(input) {
        var data = [];
        angular.forEach(input,function(opt,key) {
            if(!isEmpty(opt.LastUsed)) {
                /*if(!isEmpty(opt.Matches) || Object.values(selectedWords).indexOf(opt.Name) > -1) {
                    data.push(opt);
                } else {
                    var hasSome = Object.values(selectedWords).some(function(v){ return v.indexOf(opt.Name)>=0 });
                    if(hasSome>-1) data.push(opt);
                }*/
                if(!isEmpty(opt.Matches)) {
                    data.push(opt);
                }
            }
        });

        if(isEmpty(data)) {
            angular.forEach(input,function(opt,key) {
                if(!isEmpty(opt.LastUsed)) {
                    if(!isEmpty(opt.Matches) || Object.values(selectedWords).indexOf(opt.Name) > -1) {
                        data.push(opt);
                    } else {
                        var hasSome = Object.values(selectedWords).some(function(v){ return v.indexOf(opt.Name)>=0 });
                        if(hasSome>-1) data.push(opt);
                    }
                }
            });
        }
        
        var sortedData = data.sort(function(a, b) { 
            /*if(isEmpty(a.LastUsed)) a.LastUsed = new Date('1900-01-01T00:00:00');
            if(isEmpty(b.LastUsed)) b.LastUsed = new Date('1900-01-01T00:00:00');*/
            if(b.LastUsed && a.LastUsed) {
               a_date = new Date(a.LastUsed).getTime();
               b_date = new Date(b.LastUsed).getTime();

               a_years = parseFloat(a.YrsUsed);
               b_years = parseFloat(b.YrsUsed);

               //return (b_date) - (a_date); 

               if(a_date == b_date)
               {
                   return (a_years > b_years) ? -1 : (a_years < b_years) ? 1 : 0;
               }
               else
               {
                   return (a_date > b_date) ? -1 : 1;
               }
            }
         }); 
         return sortedData.slice(0,3);
    }
    else {
        return {};
    }
 } 
});
// Recent search job_title filter for Monster Power Resume Search
App.filter('convertStringOrObject', function() {
 return function(input, element_key) {
   // console.log("come hrer", input);
   if(typeof element_key === 'undefined' || element_key === '') element_key='title';
   if(input) {
     var data = input;
     if(angular.isArray(data)){
      var tempArr = data.map((elem)=>{
        // console.log("each elem", elem);
        // return (elem.title!=null) ? elem.title : '';
        return (elem[element_key]!=null) ? elem[element_key] : '';
      });
      // console.log("String", tempArr.join());
      return tempArr.join();
     }else{
      return data;
     } 
   }
   else {
     return '';
   }
 } 
});


App.filter('customActionLink',function() {
    return function(input,id,action,permission,pool_id=0,module='',field='') {
        if(id==0){
            if(module == 'interviews' && field == 'interviews_computed_end_client_id'){
              return 'N/A';
            }else if(module == 'candidates' && (field == 'account' || field == 'account_contact_name')){
              return '';
            }else{
              return 'Internal';
            }
        }
        else if(id<0){
            return input;
        }
        else if(isNotEmpty(permission[action['permission']]) && isNotEmpty(permission[action['permission']]['view'])  && isNotEmpty(id)) {
            var url = action['url'];
            if(pool_id == 1 && typeof action['resource_url'] != 'undefined'){
                var url = action['resource_url'];
            }
            var res_url = url.replace("{id}", id);
            return '<a target="_blank" rel="opener" href="'+res_url+'">'+input+'</a>';
        }else {
            return input;
        }
    }
});

App.filter('customActionIcon',function() {
    return function(input,id,action,permission) {
        if(id<0){
            return;
        }
        else if(isNotEmpty(permission) && isNotEmpty(permission[action['permission']]['view']) && isNotEmpty(id) && isNotEmpty(input)) {
          var url = action['url'];
          var res_url = url.replace("{id}", id);
          return '<a target="_blank" rel="opener" href="'+res_url+'"><i class="mdi mdi-eye"></i></a>';
        }else {
          return '';
       }    
    }
});

App.filter('diceContactTypeFilter',function() {
    return function(input) {
        if(isNotEmpty(input['email']) && isNotEmpty(input['phone'])) {
            if(isNotEmpty(input['relation']) && input['relation']=='2') {
                return 'Email AND Phone';    
            } else {
                return 'Email OR Phone';
            }
        } else if(isNotEmpty(input['email'])) {
          return 'Email';
        } else if(isNotEmpty(input['phone'])) {
          return 'Phone';
        }
    }
});

App.filter('uniqueOBJ', function() {
    return function(arr, field) {
        if(arr) {
            var o = {}, i, l = arr.length, r = [];
            for(i=0; i<l;i+=1) {
              o[arr[i][field]] = arr[i];
            }
            for(i in o) {
              r.push(o[i]);
            }
            return r;
        }
        else return {};  
    };
});

App.filter('replace', [function () {

    return function (input, from, to) {
      
      if(input === undefined) {
        return;
      }
  
      var regex = new RegExp(from, 'g');
      return input.replace(regex, to);
       
    };


}]);

App.filter('stringToArray', function() {
  return function(input) {
    var arr = input.split(',');
    return arr;
  };
});

App.filter('JobGrabberJobSumCount',function() {

    return function(input) {
        // console.log(input);
        var total_count = 0;
        if(typeof input != 'undefined'){
            if (isEmpty(input,false)) {
                return 0;
            }
            input = JSON.parse(input);
            angular.forEach(input,function(k,v) {
                if(typeof k.job_cnt !== 'undefined' && !isEmpty(k.job_cnt)){
                    total_count += parseInt(k.job_cnt);
                }
            });

            return total_count;
        } else {
            return 0;
        }
    }
});

App.filter('harvestingGetJobboardName',function() {
    return function(input) {
        if(typeof input != 'undefined'){
            if (isEmpty(input,false)) {
                return '';
            }
            input = JSON.parse(input);
            jobboard_name = '';
            console.log(input);
            if(typeof input.data !== 'undefined' && !isEmpty(input.data)){
                if(typeof input.data.harvestJobBoards !== 'undefined' && !isEmpty(input.data.harvestJobBoards)){
                    jobboards_arr = input.data.harvestJobBoards;
                    angular.forEach(jobboards_arr,function(k1,v1) {
                        if(k1){
                          if(jobboard_name) jobboard_name += ', ';
                          
                          jobboard_name += getResumeJobboardNames(v1);
                        }
                    });
                }
            }

            return jobboard_name;
        } else {
            return '';
        }
    }
});


App.filter('getResumeJobboard',function() {
    return function(input) {

      if(typeof input != 'undefined'){
            if (isEmpty(input,false)) {
                return '';
            }
            input = parseInt(input);

            console.log(getResumeJobboardNames(input))
            return getResumeJobboardNames(input);
      } 
      else 
      {
        return '';
      }
    }
});



App.filter('phoneFormat', function () {
  return function (tel) {
    ext = intlTelInputUtils.formatNumberByType(tel, null, 4);
    if(ext) {
      // India
      if(typeof ext == 'string' && ext.localeCompare("+91") == 1) {
        phone =  intlTelInputUtils.formatNumberByType(tel, null, intlTelInputUtils.numberFormat.INTERNATIONAL);
      } else {
        type = intlTelInputUtils.getNumberType(tel);
        if(type == 1) {
          phone = intlTelInputUtils.formatNumberByType(tel, null, type);
        } else {
          phone = intlTelInputUtils.formatNumberByType(tel, null, 4) +  intlTelInputUtils.formatNumberByType(tel, null, 2);
        }
      }
    } else {
      phone = intlTelInputUtils.formatNumberByType(tel, null, 4) +  intlTelInputUtils.formatNumberByType(tel, null, 2);
    }


    if (phone)
      return phone;
    else
      return tel;
  };
});


App.filter('appendHttps', function () {
  return function (url) {
    if (url.indexOf("https://") == -1) {
        if(url.indexOf("http://") == 0) {
            url = url.replace("http","https");
            return url;
        } else {
            return 'https://'+url;
        } 
    }
    else {
      return url;
    }
  };
});


App.filter('selectedfilter', function () {

  return function (optionsList, dataList, currentObj, property='user_id') {
    var optionObj = [];
    if(!Array.isArray(dataList))
    {
      dataList = Object.values(dataList)
    }
    optionObj = optionsList.filter(function (filterValue) {
      if(!isEmpty(property)){
      if (currentObj[property] && currentObj[property] == filterValue['id']) {
        return true;
      }
      else {
        if (dataList.some(function (listVal) {
          if(listVal[property]){
            return listVal[property] == filterValue['id'];
          }
          return false;
        })) {
          return false;
        }
        else {
          return true;
        }
      }}
      else{
        if (currentObj && currentObj == filterValue['id']) {
          return true;
        }
        else {
          if (dataList.some(function (listVal) {
            if(listVal){
              return listVal == filterValue['id'];
            }
            return false;
          })) {
            return false;
          }
          else {
            return true;
          }
        }
      }
    });
    return optionObj;
  }
});
App.filter('refillOption', function () {

  return function (optionsList, deleteList, currentObj) {
    var optionObj = [];
    if(typeof deleteList == 'undefined' && isEmpty(deleteList)){
      return optionsList;
    }
    optionObj = deleteList.filter(function (filterValue) {
      if (currentObj && currentObj == filterValue['id']) {
        return true;
      }
    });    
    optionsList = optionObj ? optionsList.concat(optionObj) : optionsList;
    return optionsList;
  }
});


App.filter('companyDateFormat',function(dateFilter,$filter){
  return function(input, format, seperator) {
      if(input) {
        if(isNotEmpty(CONFIG_DATE_FORMAT[DATE_FORMAT_JS])) {
          DATE_FORMAT_JS = CONFIG_DATE_FORMAT[DATE_FORMAT_JS];
        }
        if(typeof format !='undefined' && format != '') {
            //var dt = new Date(input);
            var dt = getDateBasedOnYearMonthDate(input);
            if(TIME_FORMAT_JS == 1 || TIME_FORMAT_JS == 0)
            {
              TIME_FORMAT_JS = "hh:mm:ss a";
            }
            return dateFilter(dt,DATE_FORMAT_JS+' '+TIME_FORMAT_JS);
        }
        else {
        data = input;     

        if (typeof input !== "object") { 
            if(input.charAt(input.length-1) =="Z") {
              data = input.split('T');
              data = data[0]; 
              if(data[1] && data[1]>0) {
                //console.log(data[1]);
              }else {
                raw_data = input.split(" ");
                data = raw_data[0];
               //console.log(data); 
              }

            } else {
                if(data == 'Invalid Date'){
                  data = input;
                }
            }
        }else 
        {
          var input = new Date(data).toISOString();
          data = input.split('T');
          data = data[0]; 
          data = data.replace(/-/g, '\/');
          data = new Date(data);
        } 

        // dt.setMinutes(dt.getMinutes() + 480);
          return dateFilter(data,DATE_FORMAT_JS);
        }
      }
      if(typeof seperator !== 'undefined') return seperator;
      else return 'N/A';
  }

});


App.filter('citystateToLocationString',function() {
  return function(city,state, limit=0, default_value, c_prty=null, s_prty=null) {
    var location = '';
    var add_state = true;
      if(!isEmpty(city) || !isEmpty(state) ) {
        if(!isEmpty(city)){
          if (typeof city !== "object" && !Array.isArray(city)) {
            location += city;
          } else {
              var arrCity = [];
              angular.forEach(city,function(v,k) {
                isEmpty(c_prty) ? arrCity.push(v['city_state']) : arrCity.push(v[c_prty]);                  
              });
              location += arrCity.join(' | ');
          }
          if(location.includes(",")) add_state = false;
        }
        if(add_state && !isEmpty(state)){
          if(!isEmpty(city)){
            location +=', ';
          }
          if (typeof state !== "object" && !Array.isArray(state)) {
            location += state;
          } else {
              var arrState = [];
              angular.forEach(state,function(v,k) {
                isEmpty(s_prty) ? arrState.push(v['name']) : arrState.push(v[c_prty]);                  
              });
              location += arrState.join(', ');
          }
        }
        return (location.length > limit && limit !=0) ?  (location.slice(0, limit) + '...'): location;
      }else {
          if(typeof default_value !== 'undefined') return default_value;
          else return '-';
      }
  }

});
App.filter('getStateIdWithCode',function() {

  return function(input) {
    var arrResult=[];
    obj=obj_states_list;
    if(typeof input != 'undefined'){
        if (isEmpty(input,false)) {
            return input;
        }
      if(!isNaN(input)){
        var ar=[input];
      }else {
        var ar = input.split(',');
      }
      angular.forEach(ar,function(k,v) {
        angular.forEach(obj,function(objkey,objindex) {
            if(ar[v]==obj[objindex]['code']) {
              arrResult.push(obj[objindex]['id']);
            }
        });
      });
      return arrResult.join(', ');
    }else {
      return '-';
   }
    }
});

App.filter('careerbuilderedgeLocation', function() {
  return function(objData) {
    if(objData) {
      city = objData['City'];
      state = objData['State'];
      country = objData['Country'];
      
      return city+", "+state;
      
  }
  else {
    return '-';
  }
} 
});

App.filter('panFilter', function() {
  return function(value, mask = false) {
    if (value) {
      val = value.toString();
      len = val.length;
      if (len == 10) {
        if (mask) {
          return `******${val.substr(6,4)}`;
        }
      }
    }
    return value;
  };
});

App.filter('sourceString', function () {
  return function (inputdata, removeHtml=false) {
    var sourceString = '';
    if (typeof inputdata !== "object" && !Array.isArray(inputdata)) {
      return sourceString;
    } else {
      if(removeHtml){
        sourceString = String(sourceString).replace(/<[^>]+>/gm, '');
      }
      if (typeof inputdata['updated_source'] == 'undefined' && !isEmpty(inputdata['additional_fields'])) {
         var arrString = inputdata['additional_fields'].split(',');
         inputdata['updated_source'] = arrString[0];
         if (!isEmpty(arrString[1])) inputdata['updated_source_action'] = arrString[1];
      }
      if (!isEmpty(inputdata['updated_source'])) {
        sourceString = sourceString + ' through ' + inputdata['updated_source'].charAt(0).toUpperCase() + inputdata['updated_source'].slice(1);
      }
      if (!isEmpty(inputdata['updated_source_action'])) {
        var action = inputdata['updated_source_action'];
        var arrAction = action.split('#');
        arrAction[0] = arrAction[0].trim();
        if (typeof arrAction[1] !== 'undefined') {
          arrAction[1] = arrAction[1].trim();
          var str = arrAction[0].toLowerCase();
          if(str == 'contacts'){
            str = 'accounts/'+str;
          }
          var res_url = '#/' + str + '/' + arrAction[1]+'/view';
          sourceString = sourceString +' <a target="_blank" href="' + res_url + '">' + arrAction[0].charAt(0).toUpperCase() + arrAction[0].slice(1) + '</a>';
        }
        else{
          sourceString = sourceString + ' '+ arrAction[0].charAt(0).toUpperCase() + arrAction[0].slice(1);
        }
      }
      return sourceString;
    }
    
  }
});


App.filter('setMaxExperience',function() {

  return function(input,limit) {
          var exp = limit;
          if(isNotEmpty(input))
          {
              exp = input
          }
          return exp;
    }
  });

App.filter('selectStringToValue',function() {

  return function(input,obj) {
    // console.log(input);
    var arrResult=[];
    if(typeof input != 'undefined'){
        if (isEmpty(input,false)) {
            return input;
        }
      var ar=[input];
      angular.forEach(ar,function(k,v) {
        angular.forEach(obj,function(objkey,objindex) {
            if(ar[v]==obj[objindex]['id']) {
              if(typeof obj[objindex]['name'] !== 'undefined') {
                arrResult.push(obj[objindex]['name']);
              } else if(typeof obj[objindex]['full_name'] !== 'undefined') {
                arrResult.push(obj[objindex]['full_name']);
              }
            }
        });
      });

      return arrResult.join(', ');
    }else {
      return '-';
   }
    }
});
App.filter('getCandidateName',function() {
  return function(input) {
    var arrResult=[];
    if(input){
      if(!isNaN(input)){
        return '';
      }
      if(typeof input == "object" && !Array.isArray(input)) {
          var ar = ar=[input];
      }else {
          var ar = input;
      } 
      angular.forEach(ar,function(v,k) {
        var str ='';
        str = v.first_name;
        if(isNotEmpty(v.last_name)){
          str +=' '+v.last_name
        }
        arrResult.push(str);
      });
      return arrResult.toString();
    }else {
      return '';
   }
    }
});
App.filter('daysLeft',function(dateFilter,$filter){
    return function(input, format) {
        if(input) {
            var current = new Date();
            current = current.getTime();
            input = new Date(input);
            input = input.getTime();
            var msPerMinute = 60 * 1000;
            var msPerHour = msPerMinute * 60;
            var msPerDay = msPerHour * 24;
            var msPerWeek = msPerDay * 7;
            var msPerMonth = msPerDay * 30;
            var msPerYear = msPerDay * 365;

            var days_left = input - current;
            if(days_left < 0){
                 return 'Expired'; 
            }
            else if (days_left < msPerMinute) {
               return Math.round(days_left/1000) + ' seconds left';   
            }else if (days_left < msPerHour) {
                return Math.round(days_left/msPerMinute) + ' minutes left';   
            }else if (days_left < msPerDay ) {
                return Math.round(days_left/msPerHour ) + ' hours left';   
            }else if (days_left < msPerWeek) {
                return Math.round(days_left/msPerDay) + ' days left';   
            }else if (days_left < msPerMonth) {
                return Math.round(days_left/msPerWeek) + ' weeks left';   
            }else if (days_left < msPerYear) {
                return Math.round(days_left/msPerMonth) + ' months left';   
            }else {
                return Math.round(days_left/msPerYear ) + ' years left';   
            }
        }
        return '';
      }
  });



  App.filter('arrangeInputData', function () {
    return function (input) {
      var arrResult = {};
      if (isEmpty(input) || Array.isArray(input)) {
        return input;
      }
      var ar = input;
      angular.forEach(ar, function (val, key) {
        console.log(key, val);
        if (!isEmpty(val) && key != 'invoice_code_config') {
          var arrField = [];
          if (!isEmpty(val['check'])) {
            angular.forEach(val['check'], function (v, k) {
              if (v) {
                arrField.push(k);
              }
            });
          } else if (val.hasOwnProperty('min') && val.hasOwnProperty('max')) {
            arrField.push(val['min'] + '-' + val['max']);
          } else {
            var isSingleDim = 0;
  
            if (typeof val == "object" || Array.isArray(val)) {
              angular.forEach(val, function (v, k) {
                if (typeof v == "object" && !Array.isArray(v)) {
                  if (!isEmpty(v['name'])) {
                    arrField.push(v['name']);
                  }
                  else {
                    arrField.push(v.toString()); //implode(',',v);
                  }
                } else {
                  isSingleDim = 1;
                }
              });
            }
            else {
              arrField.push(val);
            }
            if (!isEmpty(isSingleDim)) {
              arrField.push(val.toString()); //implode(',',val);
            }
          }
          arrResult[key] = arrField.toString(); //implode(',', arrField);
        }
        else {
          if (Array.isArray(val)) {
            arrResult[key] = val.toString();
          }
          else {
            arrResult[key] = val;
          }
        }
      });
      return arrResult;
    }
  });

App.filter('underscoreless', function () {
    return function (input) {
        return input.replace(/_/g, ' ');
    };
});

App.filter('customerInsightCompanysize',function() {
  return function(inputdata) {
      if(inputdata) {
        if (typeof inputdata !== "object" && !Array.isArray(inputdata)) {
            return inputdata;
        } else {
            var arrResult = '';
            if(!isEmpty(inputdata[0]) && !isEmpty(inputdata[1])) arrResult = inputdata[0]+' - '+inputdata[1];
            else if(!isEmpty(inputdata[0]) && isEmpty(inputdata[1])) arrResult = '>'+inputdata[0];
            else if(!isEmpty(inputdata[1]) && isEmpty(inputdata[0])) arrResult = '<'+inputdata[1];
            return arrResult;
        }
      }else {
          return '';
      }
  }

});


App.filter('interviewer_feedback_type',function() {
  return function(inputdata) {
    console.log('data');
      if(inputdata) {
        var data =  {
          'star':'Star Rating',
          'numeric':'Numeric Scale',
          'multi_optional':'Multi Optional',
          'optional' : 'Optional',
          'descriptive':'Descriptive',
        };
        return data[inputdata];
      }else {
          return '';
      }
  }

});

App.filter('filterMultiple',['$filter',function ($filter) {
  return function (items, keyObj) {

    var filterObj = {
              data:items,
              filteredData:[],
              applyFilter : function(obj,key){
                 
                if(this.filteredData.length == 0)
                  this.filteredData = this.data;

                if(obj){
                  var fObj = {};
                  if(angular.isString(obj)){
                    fObj[key] = obj;
                    fData = fData.concat($filter('filter')(this.data,fObj));

                    fData =  [...new Map(fData.map(item => [item['id'], item])).values()]
                  }
                  // else if(angular.isArray(obj)){
                  //   if(obj.length > 0){ 
                  //     for(var i=0;i<obj.length;i++){
                  //       if(angular.isString(obj[i])){
                  //         fObj[key] = obj[i];
                  //         fData = fData.concat($filter('filter')(this.data,fObj));  
                  //       }
                  //     }
                      
                  //   }                   
                  // }                 
                  if(fData.length > 0){
                    // console.log('----------');
                   
                  }
                   this.filteredData = fData;

                }
              }
        };

    if(keyObj){
        var fData = [];
      angular.forEach(keyObj,function(obj,key){
        filterObj.applyFilter(obj,key);
      });     
    }
    
    return filterObj.filteredData;
  }
}]);

App.filter("nl2br", function($filter) {
 return function(data) {
   if (!data) return data;
   // data = data.replace(/<p>(&nbsp;)+<\/p>/i, '');
   // data = data.replace(/<p>(?:&nbsp;)+<\/p>/i, '');

   return data.replace(/\n\r?/g, '<br />');
 };
});


App.filter('hhmmss', function () {
  return function (time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
  }
});
App.filter('showFirstTwentyWords', function() {
  return function(input) {
      if (!input) return input;
      
      var words = input.split(' ');

      if (words.length > 20) {
          var firstTwentyWords = words.slice(0, 20).join(' ');
          return `${firstTwentyWords}`;
      } else {
          return input;
      }
  };
});
App.filter('wordCount', function() {
  return function(input) {
      if (!input) return 0;
      var words = input.split(/\s+/);
      return words.length;
  };
});