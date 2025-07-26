//angular.module('OorwinApp').requires.push('dndLists');

if (typeof app_initialized != 'undefined' && app_initialized) {
  // do something here
} else {
  // Use existing module instead of redefining it
  var App = angular.module("OorwinApp");
  
}

var table_listing_url = "careers/getJobList";
var listing_page_url  = ROOT_URL + "careers/";
var inFormOrLink;

inFormOrLink = false;

var CURRENT_MODULE_ID = 1;
var sectionsFields = [];
var CustomFormData = [];
var Object = Object;
//angular.module(App).requires.push('ui.mask');

App.controller('processLinkedInUser', function ($scope, $rootScope, $sessionStorage, pageOnLoadData,$localStorage) {
    if (isNotEmpty(pageOnLoadData.data.data)) {
        var ResData = angular.toJson({'cp_token':pageOnLoadData.data.data.token});
        $sessionStorage.data = ResData;
        $localStorage.cpdata = ResData;
        $scope.SessionToken = $rootScope.SessionToken = pageOnLoadData.data.data.token;
        window.location.href = ROOT_URL + Redirection_PATH+'#/'+pageOnLoadData.data.data.redirectTo;
    } else {
        showAlertMessage({
            status : 0,
            message :'Invalid Request, Please try Again!'});
    }
});

//angular.module(App).requires.push('ui.mask');
App.controller('jobsListCtrl', function ($scope,$http,ConfirmAlert,dateFilter,$controller,$rootScope,$filter,$uibModal,$sessionStorage,HireApiServices) {
    angular.extend(this, $controller('ListingCtrl', {$scope: $scope}));
    //angular.extend(this, $controller('DynamicFormCtrl', {$scope: $scope}));
});

App.controller('ListingCtrl',function($scope,$filter,$uibModal,$http,$location,ConfirmAlert,$rootScope,$controller,dateFilter,HireApiServices,$stateParams,$state,$sessionStorage){
  $scope.loadCitiesList = function ($query, Obj, field, isMulti=1) {
    return $http.get(WEB_API_URL + 'integration/getLocation/1', { params: { q: $query} }).then(function (response) {
        var cities_list = response.data.data.items;
        return cities_list;
     
    });
};      
$scope.experiencearray=[{
    "id":1,
    "name":"0-2 Years",
    "value":'0-2'
},
{
    "id":2,
    "name":"2-5 Years",
    "value":'2-5'
},
{
    "id":3,
    "name":"3-5 Years",
    "value":'3-5'
},
{
  "id":4,
  "name":"5-8 Years",
  "value":'5-8'
},
{
    "id":5,
    "name":"8-10 Years",
    "value":'8-10'
},
{
    "id":6,
    "name":"10-12 Years",
    "value":'10-12'
},
{
    "id":7,
    "name":"12+ Years",
    "value":'12-20'
}];
// $scope.jobtypearray=[{
//     "id":1,
//     "name":"Full Time",
//     "value":'Full Time'
// },
// {
//     "id":2,
//     "name":"Contract",
//     "value":'Contractual'

// },
// {
//   "id":3,
//   "name":"Remote",
//   "value":'include_remote'
// },
// ];

  $scope.selected_tab = $state.current.name;
  $scope.jobViewPopUp=false;
        let details = navigator.userAgent;
        let regexp = /android|iphone|kindle|ipad/i;
        $scope.isMobileDevice = 1;
        $scope.isMobileDevice = regexp.test(details);
       
        $scope.CountryList = obj_countries_list;
        $scope.StatesList=obj_states_list;
        $scope.CountryStateList=obj_country_states;

        $scope.list_data = [];
        $scope.usersList = [];
        $scope.pageno = 1;
        $scope.total_count = 0;
        $scope.itemsPerPage_new=$scope.itemsPerPage = 15; 
        $scope.sort ='desc';
        $scope.orderby ='cp_published_on';
        $scope.view_type = '';
        $scope.JobListFilter={};

        $scope.jobUrl = ROOT_URL + BASE_PATH+'/#/job';
        var pagenumber=1;
        // if($location.search()){

        //   if(isNotEmpty(($location.search()).page)) {
        //     pagenumber = ($location.search()).page;  
        //   }

        //   if(isNotEmpty(($location.search()).view_id)) {
        //     custom_view_id = ($location.search()).view_id;  
        //   }

        //   if(isNotEmpty(($location.search()).sort)) {
        //     $scope.sort = ($location.search()).sort;  
        //   }

        //   if(isNotEmpty(($location.search()).orderby)) {
        //     $scope.orderby = ($location.search()).orderby;  
        //   }
        // }

        $scope.getDefaultData = true;
        $scope.externalApplyButtons = true;
        $scope.Job_type=[];
        $scope.Experience=[];
        $scope.hasFilter=false;
        $scope.selectedExperience = function () {
            $scope.JobListFilter.Experience = $filter('filter')($scope.experiencearray, {checked: true});
        }
        $scope.selectedJobType = function () {
            $scope.JobListFilter.Job_type = $filter('filter')($scope.jobtypearray, {checked: true});
        }
        $scope.getJobList = function(pageno, list_type,hasFilter=false) {

            if (typeof $scope.jobListSearch1 != 'undefined') {
              $scope.jobListSearch1 = $scope.jobListSearch1.replace(/'/g, '');
            } 
            $scope.selected=angular.copy($state.current.name);
            if(typeof list_type === 'undefined') list_type = 1;
            $scope.list_type = list_type;

            if($scope.selected_tab=='userProfile.saved_jobs'){
              $scope.list_type=3;
            }
            if($scope.selected=='userProfile.refer'){
              $scope.list_type=1;
            } 
            if($scope.selected=='userProfile.myJobs'){
                $scope.list_type=2;
              } 

            if($scope.list_type == 1) {
                $scope.selected_tab = 'list';
            } else if($scope.list_type == 2) {
                $scope.selected_tab = 'my_jobs';
            }

            $scope.pageno = pageno;
            $scope.currentPage = pageno;
            postData = {};
            postData.limit = $scope.itemsPerPage;
            postData.page = pageno;
            postData.order = $scope.orderby;
            postData.sort = $scope.sort;
              
            postData.list_type = $scope.list_type;
            if (typeof $scope.JobListFilter.jobListSearch1 != 'undefined') {
                $scope.JobListFilter.jobListSearch1 = $scope.JobListFilter.jobListSearch1.replace(/'/g, '');
            }
            postData.search1 = $scope.JobListFilter.jobListSearch1;
          
            postData.search3 = $scope.JobListFilter.jobListSearch3;
            postData.search4 = $scope.JobListFilter.jobListSearch4;
            postData.Experience=[];
            postData.Job_type=[];

            postData.search2 =[];
            if(!isEmpty($scope.JobListFilter.jobListSearch2)){
                console.log($scope.JobListFilter.jobListSearch2);
              angular.forEach($scope.JobListFilter.jobListSearch2,function(k,v){
                if(k.name){
                var name  = k.name; 
                name = name.replace(/'/g, '');
                postData.search2.push(name);
                $name= name.split(',');
                postData.search2.push($name[0]);
                }
              });
            }

            if(!isEmpty($scope.JobListFilter.Job_type)){
              angular.forEach($scope.JobListFilter.Job_type,function(k,v){
                if(k.id){
                    postData.Job_type.push(k.id);
                }
              });
            }
          if (!isEmpty($scope.JobListFilter.Experience)) {
            angular.forEach($scope.JobListFilter.Experience, function (k, v) {
              if (k.value) {
                var exp = k.value.split('-');
                for (var i = parseInt(exp[0]); i <= parseInt(exp[1]); i++) {
                  if (isNotEmpty(i) && exp[0] != i) {
                    $combination = exp[0] + '-' + i;
                    postData.Experience.push($combination);
                  }
                }
              }
            });
          }
            if(hasFilter)
             $scope.hasFilter=true;
             else
              $scope.hasFilter=false;
                      
            postData.sub_domain = $rootScope.sub_domain;
            var organization_name = getQueryParameterByName('organization_name');
            if(isNotEmpty(organization_name))
            {
               postData.organization_name = $rootScope.organization_name = organization_name;
            }
            

            if(isNotEmpty($scope.SessionToken)) {
                postData.login_access_token = $scope.SessionToken;
            }

            postData.getDefaultData = $scope.getDefaultData;
            postData.template_format = $scope.NewTemplate;

            HireApiServices.post(table_listing_url,postData)
            .then(function success(response){
                response_data = response.data;
                var scroll_id = 0;
                if(response_data.status == 1) {
                    //$scope.showTooltip = false;
                    $rootScope.referral_settings = response_data.data.referral_settings;
                    $scope.other_info = response_data.data.list_details.other_info;
                    $scope.externalApplyButtons = !([28,1684,1686].includes($scope.other_info['company_details']['id']));
                    var items = response_data.data.list_details.data;  
                    $scope.usersList = response_data.data.list_details.users_list;  
                    $scope.submission_status_list = response_data.data.list_details.submission_status_list ?? [];  
                    $scope.submission_status = response_data.data.list_details.submission_status ?? {};  
                    $scope.total_count = response_data.data.list_details.total;
                    $scope.last_page = response_data.data.list_details.last_page;
                    $scope.Applied_jobs = !isEmpty(response_data.data.applied_jobs) ? response_data.data.applied_jobs : [];
                    // $scope.header_columns = response_data.data.header_columns;
                    $scope.company_name = !isEmpty($scope.other_info['company_details']['display_name']) ?  $scope.other_info['company_details']['display_name'] : 'Oorwin Labs';
                    // if($scope.NewTemplate){
                      if($scope.currentPage == 1){
                        $scope.list_data = [];
                      }
                      if(!isEmpty($scope.list_data)){
                        scroll_id = $scope.list_data[$scope.list_data.length - 1]['id'];
                      }
                      items = $scope.list_data.concat(items.filter(obj1 => $scope.list_data.every(obj2 => obj1.id !== obj2.id)));
                    // }
                    $scope.list_data = items;
                    $rootScope.curent_date = response_data.data.current_date;
                    if(isEmpty($scope.JobListFilter.Job_type)){
                        $scope.jobtypearray = response_data.data.job_type;
                    };
                    if($scope.getDefaultData) {
                        $scope.table_headers_list = response_data.data.header_columns;
                        $scope.default_currency = response_data.data.default_currency;
                    }
                    // var elec = document.getElementById('d_'+scroll_id);
                    // if(!isEmpty(elec)){
                    //   elec.setAttribute('tabIndex',-1);
                    //   elec.focus();
                    //   elec.removeAttribute('tabIndex');
                    //   elec.scrollIntoView();
                    // } 
                    // $scope.referral_settings = response_data.data.referral_settings;

                    $scope.savedJobList=[]; 
                    if(!isEmpty($scope.other_info['cp_user_joblist'])){
                      angular.forEach($scope.other_info['cp_user_joblist'], function (value, key) {
                        $scope.savedJobList[value]=value;
                      }); 
                    }
                    $scope.job_list_columns = response_data.data.job_list_columns;
                    //jsonDefaultFields=response_data.data.header_columns;

                    /*page_url="page="+pageno;
                    if($scope.orderby!='id') {
                        page_url+="&orderby="+$scope.orderby+"&sort="+$scope.sort;  
                    }*/
                    //$location.path(page_url);
                    //$location.search(page_url);
                    // loadIndeedScript();
                    // setTimeout(function(){$scope.loadIndeedScript()},5000)
                } else {
                    showAlertMessage(response_data);
                    $state.go('list');
                }
                if($scope.list_data.length==0)
                     $scope.job_details = false;
                if($scope.list_data.length>0 &&$scope.selected_tab=='list'){
                if($scope.pageno==1){
                $scope.getSelectedJob($scope.list_data[0]);

                }}
                $scope.getDefaultData = false;
                if($scope.selected_tab=='my_jobs'&&$scope.list_data.length>0){
                  angular.extend(this, $controller('CandidateDocumentsCtrl', {$scope: $scope}));
                }
            });
        }
        $scope.getSelectedJob=function(job){
          if(job){
        //   if (isEmpty($scope.SessionToken)) {
        //     var session_token = getSessionStorageToken();
        //     if (!isEmpty(session_token)) {
        //         var ResData = angular.toJson({ 'cp_token': session_token });
        //         $sessionStorage.data = ResData;
        //         $scope.SessionToken = $rootScope.SessionToken = session_token;
        //     }
        // }
        $scope.showapply_button=true;
        $scope.similar_jobs = [];
        $scope.is_publish = false;
        $rootScope.has_workflow = 0;
        $rootScope.is_mandatory_signin = 0;
        $rootScope.assessment_id = 0;
        
        
        job_id = '';
        $scope.job_id = job.computed_sha1_job_id;
        console.log($scope.job_id);
        
        $scope.showExternalApplyButtons = true;
        $rootScope.page_loading = 1;
        var data = {'login_access_token':$scope.SessionToken, 'sub_domain':$rootScope.sub_domain};
        data['job_id'] = $scope.job_id;
        data['view_type']='1';
        HireApiServices.post('careers/job_view',data)
        .then(function success(response){
          if(response.data.status){
            response_data = response.data.data;
            console.log(response_data);
            
            if($scope.NewTemplate) {
                job_view_template = 'template_new';
            } else {
                job_view_template = response_data.view_page;
            }
            // $scope.job_view_template = 'careers/templates/'+job_view_template+'.html';
            $scope.job_details = response_data.job_details;
            $scope.loginStatus = response_data.loginstatus;
            // $scope.client_logo = response_data.client_logo;
            $scope.arrCompanyDetails = response_data.arrCompanyDetails;
            $scope.job_view_columns= response_data.job_view_columns;
            // $scope.view_page = response_data.view_page;
            // Custom Meta Data
            $scope.socialMediaLink('',$scope.job_details);
    
            $scope.hideExternalApplyButtonsFor = [28,1684,1686,2015];
            if($scope.hideExternalApplyButtonsFor.includes($scope.arrCompanyDetails.id)) {
                $scope.showExternalApplyButtons = false;
            }
    
            $scope.is_already_applied = response_data.is_already_applied;
            $scope.shareUserID = response_data.shareUserID;
            //$scope.company_id = response_data.company_id;
    
            // $scope.job_title_code = $scope.job_details['title']+'('+$scope.job_details['code']+')';
            $scope.MONSTER_APPLY_ID = response_data.MONSTER_APPLY_ID;//MONSTER_APPLY_ID;
            $scope.job_details.location = response_data.strLocation;
            $scope.strLocation= response_data.strLocation;
            $scope.strIndeedApplyJobID = response_data.strIndeedApplyJobID;
            $scope.applyPostUrl = response_data.applyPostUrl;
            $scope.applyMonsterUrl = response_data.applyMonsterUrl;
            $scope.companyName = response_data.companyName;
            $scope.jobUrl = response_data.jobUrl;
            
            $scope.candidate_id = response_data.candidate_id;
            $scope.is_publish = response_data.is_publish;
            // $scope.next_job_id = response_data.job_Ids['next_job_id'];
            // $scope.previous_job_id = response_data.job_Ids['previous_job_id'];
            // $scope.arrFormData = !isEmpty(response_data.arrFormData) ? response_data.arrFormData : [];
            // $scope.permissions = !isEmpty($scope.arrFormData.permissions) ? $scope.arrFormData.permissions : [];
            // $scope.sectionsFields = !isEmpty($scope.arrFormData.form_section_fields) ? $scope.arrFormData.form_section_fields.cnf_form_section : [];
            // $scope.arrAdditionFields = !isEmpty($scope.arrFormData.arrAdditionFields) ? $scope.arrFormData.arrAdditionFields : [];
            // $scope.arrDefaultReqFields = !isEmpty($scope.arrFormData.arrDefaultReqFields) ? $scope.arrFormData.arrDefaultReqFields : [];
            $rootScope.referral_settings = response_data.referral_settings;
            $rootScope.page_loading = 0;
            $rootScope.jobPostingWorkflow = response_data.jobPostingWorkflow;
            $rootScope.record_id = response_data.job_details.id;
            $rootScope.postSubmissionRedirection = response_data.postSubmissionRedirectUrl;
            if(!isEmpty($rootScope.jobPostingWorkflow)) {
                $rootScope.has_workflow = $rootScope.jobPostingWorkflow.workflow_id ? 1 : 0;
                $rootScope.assessment_id = !isEmpty($rootScope.jobPostingWorkflow.assessment_id) ? $rootScope.jobPostingWorkflow.assessment_id : 0;
                $rootScope.is_mandatory_signin = $rootScope.jobPostingWorkflow.is_mandatory_signin;
            }else{
              $rootScope.is_mandatory_signin = 0;
              $rootScope.has_workflow =  0;
              $rootScope.assessment_id  = 0;
            }
            if(!$rootScope.show_signin){
                $rootScope.is_mandatory_signin =  0;
            }
            $scope.job_details['company_description']=$rootScope.company_description;
            
          
        }});
        }}
        $scope.printPage = function() {
            if(!$scope.isMobileDevice){
            var contents =  $("#printSectionId").html();
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title> </title> <style>.noprint{display:none}div{color:black !important}</style>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 100);
        }
        }
        
        $scope.getSelectedJobView=function(job){
            $scope.jobViewPopUp=true;
            $scope.getSelectedJob(job);
        }
        // $scope.changeView = function(type){
         
        //   if(isNotEmpty(type))
        //   {
        //     $scope.view_type = type;
        //   }
        //   else 
        //   {
        //     $scope.view_type = 0;

        //   }
        // }
        $scope.LoadMoreList = function(){
          var pageNo = parseInt($scope.pageno) + 1;
          $scope.getJobList(pageNo);
        }


        list_type = 1;
        if($scope.selected_tab == 'userProfile.myJobs') list_type = 2; 
        $scope.getJobList(pagenumber, list_type);
        $scope.appendChildScopeToParentScope =function(childscope){
          $scope = childscope;
        }
        
        $scope.resetSearch = function(){
          $scope.JobListFilter.jobListSearch1 = '';
          $scope.JobListFilter.jobListSearch2 = '';
          $scope.JobListFilter.jobListSearch3 = '';
          $scope.JobListFilter.jobListSearch4 = '';
          $scope.JobListFilter.Experience = [];
          $scope.JobListFilter.Job_type=[];
          $scope.hasFilter = false;
          $scope.getJobList(1);
        }

    //   $scope.referral_candidates = [];
    //   $scope.referCandidate = function(job_details) {
    //     if (isEmpty(SessionToken) && isEmpty($scope.SessionToken)) {
    //       showAlertMessage({'status':0,'message':'Please login to continue'});
    //       $state.go('list');
    //     }
    //     var postData = {};
    //     postData.referee_id = $scope.other_info.candidate_id;
    //     postData.sub_domain = $rootScope.sub_domain;

    //     if (isNotEmpty(SessionToken))
    //       postData.login_access_token = SessionToken;
        
    //     if (isNotEmpty($scope.SessionToken))
    //       postData.login_access_token = $scope.SessionToken;

    //     postData.computed_sha1_job_id = job_details.computed_sha1_job_id;
        
    //     if (typeof list_type === 'undefined')
    //       postData.list_type = 1;
    //     else
    //       postData.list_type = 2;

    //     $scope.btn_loading = true;
    //     HireApiServices.post('careers/get_referral_candidates',postData)
    //       .then(function success(response) {
    //         $scope.btn_loading = false;
    //         if (!response.data.status) {
    //           showAlertMessage({
    //               status : 0,
    //               message : response.data.message
    //           });
    //           $state.reload();
    //         } else {
    //           var modalInstance = $uibModal.open({
    //               animation: true,
    //               ariaLabelledBy: 'modal-title',
    //               ariaDescribedBy: 'referCandidateModalBody',
    //               templateUrl: 'careerPortalReferCandidate.html',
    //               controller: 'careerPortalReferCandidateModalInstanceCtrl',
    //               size:'lg modal-dialog-aside',
    //               windowClass: 'fixed-right',
    //               resolve: {
    //                 items: function () {
    //                       return  response.data.data;
    //                   }
    //               }
    //           });
    //         }
    //       }, function() {
    //         $scope.btn_loading = false;
    //         ajaxErrorCallBackFunc();
    //       });
    //   }
    //   $scope.referCandidateWithoutJob = function() {
    //     if (isEmpty(SessionToken) && isEmpty($scope.SessionToken)) {
    //       showAlertMessage({'status':0,'message':'Please login to continue'});
    //       $state.go('list');
    //     }
    //     var postData = {};
    //     postData.referee_id = $scope.other_info.candidate_id;
    //     postData.sub_domain = $rootScope.sub_domain;

    //     if (isNotEmpty(SessionToken))
    //       postData.login_access_token = SessionToken;
        
    //     if (isNotEmpty($scope.SessionToken))
    //       postData.login_access_token = $scope.SessionToken;
        
    //     if (typeof list_type === 'undefined')
    //       postData.list_type = 1;
    //     else
    //       postData.list_type = 2;

    //     $scope.btn_loading = true;
    //     HireApiServices.post('careers/get_referral_candidates',postData).then(function success(response) {
    //       $scope.btn_loading = false;
    //       if (!response.data.status) {
    //         showAlertMessage({
    //             status : 0,
    //             message : response.data.message
    //         });
    //         $state.reload();
    //       } else {
    //         var modalInstance = $uibModal.open({
    //             animation: true,
    //             ariaLabelledBy: 'modal-title',
    //             ariaDescribedBy: 'referCandidateModalBody',
    //             templateUrl: 'careerPortalWithouJobReferCandidate.html',
    //             controller: 'careerPortalReferCandidateWithoutJobModalInstanceCtrl',
    //             size:'lg modal-dialog-centered',
    //             windowClass: 'fixed-right',
    //             resolve: {
    //               items: function () {
    //                   return  response.data.data;
    //               }
    //           }
    //         });
    //       }
    //     }, function() {
    //       $scope.btn_loading = false;
    //       ajaxErrorCallBackFunc();
    //     });
    //   }

    
  
      $scope.saveTheJob=function(data_rest,save_type){
        if(save_type==2||save_type==3){
        ConfirmAlert.swal({   
            title: "Are you sure?",   
            text: "You want to delete "+(save_type==3?'all records':'this record'), 
          imageUrl: $scope.alertdeleteimage, 
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes",   
            cancelButtonText: "No",   
          }, function(isConfirm){  
              if (isConfirm) {
                $scope.saveJobApi(data_rest,save_type);
              }})}
              else{
                $scope.saveJobApi(data_rest,save_type);
              }
             
      }
      $scope.saveJobApi=function(data_rest,save_type){
        let postData={};
        postData['job_id']=data_rest.id?? 0;
        postData['sub_domain']=$rootScope.sub_domain;
        postData['save_type']=save_type;
       if (isNotEmpty(SessionToken))postData.login_access_token = SessionToken;
      if (isNotEmpty($scope.SessionToken)) postData.login_access_token = $scope.SessionToken;
          HireApiServices.post('careers/saveTheJob',postData)
          .then(function success(response) {
              var response_data = response.data;
              showAlertMessage({
                  status : response_data.status,
                  message : response_data.message
              });
                $state.reload();
          }); 

      }
      $scope.deleteSubmittedApplication=function(data_rest,delete_type){
        ConfirmAlert.swal({   
            title: "Are you sure?",   
            text: "You want to delete "+(delete_type==2?'all records':'this record'), 
          imageUrl: $scope.alertdeleteimage, 
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes",   
            cancelButtonText: "No",   
          }, function(isConfirm){  
              if (isConfirm) {
                postData={};
                postData['job_id']=data_rest.id?? 0;
                postData['sub_domain']=$rootScope.sub_domain;
                postData['delete_type']=delete_type;
               if (isNotEmpty(SessionToken))postData.login_access_token = SessionToken;
              if (isNotEmpty($scope.SessionToken)) postData.login_access_token = $scope.SessionToken;
              HireApiServices.post('careers/deleteSubmittedApplication',postData)
              .then(function success(response) {
                  var response_data = response.data;
                  showAlertMessage({
                      status : response_data.status,
                      message : response_data.message
                  });
                    $state.reload();
              }); 
              }
              })

      }
});
App.controller('CandidateDocumentsCtrl', function($scope, $rootScope, $controller, $sessionStorage, $rootScope,HireApiServices, $stateParams) {

  if(!isEmpty($stateParams['token'])) {
      $rootScope.redirect_token = $stateParams['token'];
      if(isEmpty($scope.SessionToken) && isNotEmpty($sessionStorage)) {
          $scope.showPageSigninPopup(1);
      }
  }
  else {
      if(isEmpty($scope.SessionToken) && isNotEmpty($sessionStorage)) {
          var obj = (typeof $sessionStorage.data === 'string') ? JSON.parse($sessionStorage.data) : $sessionStorage.data;
          $scope.SessionToken = obj.cp_token;
          reloadPath('#/login.html');
          // return;
      }
  }

  CURRENT_MODULE_ID = 2;
  $scope.Custom = {};
  $scope.CustomForm = {};
  $scope.folders_list = [];
  // $scope.showFolderDocList = false;

  $scope.getCandidateDocumentsList = function() {
  var data = {'login_access_token':$scope.SessionToken, 
  'sub_domain':$rootScope.sub_domain};
  $rootScope.page_loading = true;

  HireApiServices.post('careers/candidate_documents',data)
  .then(function success(response){
      response_data = response.data;
      if (response_data.status) {
          response_data = response_data.data;
          $scope.all_document_types = response_data.all_document_types;
          $scope.company_id = response_data.company_id;
          $scope.candidate_id = response_data.candidate_id;
          $scope.folders_list = response_data.folders_list;
          $rootScope.referral_settings = response_data.referral_settings;
          $scope.referral_settings = response_data.referral_settings;
          angular.extend(this, $controller('CandidateDocumentUpdateRequestCtrl', { $scope: $scope, $rootScope:$rootScope }));
      }
      else {
          showAlertMessage(response_data);
      }
      $rootScope.page_loading = false;
  });
  }
  if(!isEmpty($scope.SessionToken)) {
      $scope.getCandidateDocumentsList();
  }

  angular.extend(this, $controller('CommonCandidateDocumentUpdateRequestCtrl', { $scope: $scope, $rootScope:$rootScope }));

  $scope.getFolderDocList = function(folder) {
      params = {
          'request_id' : folder.id,
          'job_id' : folder.job_id,
          'candidate_id' : $scope.candidate_id,
          'login_access_token':$scope.SessionToken,
          'sub_domain':$rootScope.sub_domain
      }
      if(typeof pageno == 'undefined')
      {
          pageno=1;
      }
      params.limit = 15;
      params.page = pageno;
      $scope.newPageNumber = pageno;
      $scope.selectedFolderLabelList = [];
      $scope.master = [];
      $scope.selectedFolder = {};
      $scope.no_action = true;
      HireApiServices.post("careers/getCandidateFolderDocList",params)
      .then(function success(response){
          response = response.data;
          if(response.status){
              $scope.selectedFolder = folder;
              $scope.showFolderDocList = false;
              
              var canDocumentUpdateRequestData = response.data;
              $scope.document_types_options = canDocumentUpdateRequestData.document_types_options;
              $scope.document_statuses_options = canDocumentUpdateRequestData.document_statuses_options;
              $scope.canRequestObj = canDocumentUpdateRequestData.canRequestObj;
              $scope.candidate_stages = !isEmpty($scope.canRequestObj) ? $scope.canRequestObj.stages : [];
              $scope.stages = canDocumentUpdateRequestData.stages;
              $scope.request_id = canDocumentUpdateRequestData.request_id;

              popupScopeObj = $scope;
              $scope.showFolderDocList = true;
          }
      });
  }
  
$scope.downloadFile = function(document) {
  return downloadAttachments(document.download_url);
}

  if(!isEmpty($rootScope.redirect_token) && !isEmpty($scope.SessionToken)) {
      $scope.openCandidateDocumentRequestPopup();
  }

});
// App.controller('careerPortalReferCandidateModalInstanceCtrl', function ($scope,$uibModalInstance,$uibModal,HrApiServices,$state,items, $rootScope) {
//   $scope.job_details = items.job_record;
//   $scope.referral_candidates = {};

//   if (isNotEmpty(items.referral_candidates))
//     $scope.referral_candidates = items.referral_candidates;

//   $scope.referData = {}
//   $scope.referData.job_code = $scope.job_details.code;
//   $scope.referData.job_id = $scope.job_details.id;
//   $scope.referData.apply_behalf_of_candidate = "1";

//   $scope.cancel = function() {
//     $uibModalInstance.close(false);
//   };

//   $scope.saveReferral = function(){
//       if(!$scope.referCandidateForm.$valid) {
//           $scope.submitted = 1;
//           return false;
//       }

//       if (isNotEmpty(SessionToken))
//         $scope.referData.login_access_token = SessionToken;
      
//       if (isNotEmpty($scope.SessionToken))
//         $scope.referData.login_access_token = $scope.SessionToken;


//       $scope.referData.sub_domain = $rootScope.sub_domain;
//       $scope.referData.web_domain = ROOT_URL;
//       HrApiServices.post('careers/save_referral_details',$scope.referData)
//       .then(function success(response) {
//           var response_data = response.data;
//           showAlertMessage({
//               status : response_data.status,
//               message : response_data.message
//           });
//           if (response_data.status == 1) {
//             $scope.cancel();
//           }
//           return false;
//       });
//   }
//   $scope.careerPortalAddCandidateFromReferPopup = function() { 
//     $uibModal.open({
//         animation: true,
//         ariaLabelledBy: 'addReferCandidateModalTitle',
//         ariaDescribedBy: 'addReferCandidateModalBody',
//         templateUrl: 'careerPortalAddReferCandidate.html',
//         controller: 'careerPortalAddReferCandidateModalCtrl',
//         size:'lg modal-dialog-aside',
//         windowClass: 'fixed-right',
//         resolve: {
//             items: function () {
//                 return {};
//             }
//         }
//     }).result.then(function(response) {
//         if (isNotEmpty(response.data)) {
//           if (isNotEmpty(response.data.referral_candidates)) {
//             $scope.referral_candidates = response.data.referral_candidates;
//           }
//           if (response.status && isNotEmpty(response.data.candidate_id)) {
//             candidate_id = response.data.candidate_id.id;
//             candidate_name = response.data.candidate_id.name;
//             $scope.referData.candidate_id = [{'id':parseInt(candidate_id),'name':candidate_name}];
//           }
//         }
//     }, function() {

//     });
//   }


// });

// angular.module('OorwinApp').controller('careerPortalAddReferCandidateModalCtrl', function ($scope, $rootScope, $uibModalInstance, $uibModal, $http, HrApiServices,$controller) {
//   $scope.addCandidateDetails = {};
//   $scope.isExcelFile = 0;
//   $scope.Custom = {};
//   $scope.Custom['form_file_inputs'] = {};
//   $scope.configFormArr = {};
//   $scope.form_name = 'addReferCandidateForm';
//   $scope.form_model = 'addCandidateDetails';
//   $scope[$scope.form_model] = {};
//   $scope[$scope.form_name] = {};

//   angular.extend(this, $controller('careerPortalReferResumeCtrl', {$scope: $scope}));

//   $scope.cancel = function () {
//     $uibModalInstance.close(false);
//   };

//   $scope.addReferCandidate = function() {
//       $scope.submitted = 0;
//       $scope.validation_errors = {};
//       $scope.validation_errors[$scope.form_name] = {};

//       if (!$scope[$scope.form_name]['form'].$valid) {
//           $scope.submitted = 1;
//           return false;
//       }
      
//       if ($scope.addReferCandidateForm.form.$valid) {
//           element = document.getElementById('document_file');
//           if(element.files.length > 0 && isEmpty($scope.isExcelFile)) {
          
//               filterfile = element.files[0]['name'].substring(element.files[0]['name'].lastIndexOf('.') + 1).toLowerCase();
              
//               if(parseInt(element.files[0]['size']) > 10485760){
//                   showAlertMessage({
//                       'status': 0,
//                       'message': "File Size should not exceed 10 MB"
//                   });
//               } else if(filterfile == "rtf" || filterfile == "doc" || filterfile == "docx" 
//               || filterfile == "pdf" || filterfile == "txt" || filterfile == "html"){
//                   $scope.submitReferCandidateForm();
//               }else {
//                   showAlertMessage({
//                       'status': 0,
//                       'message': 'Invalid File Format'
//                   });
//               }
//           } else {
//               $scope.submitReferCandidateForm();
//           }
          
//       } else {
//           $scope.submitted = 1;
//       }
//   }

//   $scope.submitReferCandidateForm = function() {
//       formres = new FormData();
//       if($scope.Custom.form_file_inputs) { 
//         angular.forEach($scope.Custom.form_file_inputs,function(k,v){
//             if($scope.Custom.form_file_inputs[v]) {
//               angular.forEach($scope.Custom.form_file_inputs[v], function (value, key) {
//                   formres.append('document_file['+v+']', value); 
//               }); 
//              delete $scope.Custom.form_file_inputs[v];
//              }
//         });
//       }

//       postData = $scope[$scope.form_model]['candidates'];

  
      
//       if (isNotEmpty(SessionToken))
//         formres.append('login_access_token', SessionToken);
      
//       if (isNotEmpty($scope.SessionToken))
//         formres.append('login_access_token', $scope.SessionToken);

//         formres.append('sub_domain',$rootScope.sub_domain);

//       formres.append("data", angular.toJson(postData));
//       action_url = 'careers/save_referral_candidate';
//       $scope.btn_loading = true;
//       HrApiServices.postAttachment(action_url,formres)
//       .then(function success(response){
//         $scope.btn_loading = false;
//         if (!response.data.status) {
//           if (isNotEmpty(response.data.data) && isNotEmpty(response.data.data.send_request)) {
//             $scope.change_referee_request_popup(response.data.data.candidate_id);
//           } else {
//             showAlertMessage({'status':response.data.success, 'message':response.data.message});
//             $uibModalInstance.close(response.data);
//           }
//         } else {
//           showAlertMessage({'status':response.data.success, 'message':response.data.message});
//           $uibModalInstance.close(response.data);
//         }
//       });
//   }

//   $scope.change_referee_request_popup = function(referred_candidate_id) {
//     $uibModal.open({
//       animation: true,
//       ariaLabelledBy: 'sendChangeRefereeRequestModalTitle',
//       ariaDescribedBy: 'sendChangeRefereeRequestModalBody',
//       templateUrl: 'careerPortalChangeRefereeRequest.html',
//       controller: 'sendChangeRefereeRequestCtrl',
//       size:'lg modal-dialog-aside',
//       windowClass: 'fixed-right',
//       resolve: {
//           items: function () {
//               return {'referred_candidate_id':referred_candidate_id};
//           }
//       }
//     }).result.then(function(response) {
//     }, function() {

//     });
//   } 
// });

// angular.module('OorwinApp').controller('careerPortalReferResumeCtrl', function ($scope, $rootScope,$uibModal, $http, HrApiServices, ConfirmAlert) {
//     $scope.total_file_size = 0;
//     $scope.files_size = {};
//   $scope.resume_file_list = function (element, is_additional='') {
//      $scope.$apply(function($scope) {
//          name=element.name;
//          var isValidFile = $scope.validateFile(element);
//          if(isValidFile) {
//              $scope.files = element.files; 
//              $scope.files_size[$scope.files[0].name] = $scope.files[0].size;

//              if(typeof $scope.Custom['form_file_inputs'] === 'undefined') $scope.Custom['form_file_inputs'] = {};
//              if(!isEmpty(is_additional)){
//                  if(typeof $scope.Custom['form_file_inputs'][name] === 'undefined') $scope.Custom['form_file_inputs'][name] = [];
//                  if(typeof $scope.Custom[name] === 'undefined')$scope.Custom[name] = [];
//                  length = $scope.Custom[name].length;
//                  $scope.Custom['form_file_inputs'][name+'_'+length] = $scope.files;
//                  $scope.Custom[name].push({'unique_name' : '','original_name':$scope.files[0].name, 'is_add_doc' : 1});
//              }
//              else{
//                  $scope.Custom['form_file_inputs'][name]=$scope.files;
//                 if (isNotEmpty($scope.Custom[name]) && isNotEmpty($scope.Custom[name]['original_name'])) {
//                     if (isNotEmpty($scope.files_size) && 
//                         isNotEmpty($scope.files_size[$scope.Custom[name]['original_name']]) &&
//                          isNotEmpty($scope.total_file_size)
//                     ) {
//                         $scope.total_file_size -= $scope.files_size[$scope.Custom[name]['original_name']]
//                     }
//                 }
//                  $scope.Custom[name]={};
//                  $scope.Custom[name]['unique_name']='';
//                  $scope.Custom[name]['original_name']=$scope.files[0].name;
//                  $scope.Custom['is_resume']='';
//                  $scope.submitResume();
//              }

//          } 
//          else {
//              if(element.files.length>0 && isEmpty(is_additional)){
//                  $scope.Custom[name]='';
//                  $scope.Custom['form_file_inputs'] = undefined;
//              }
//          }

//      });
//   };

//   $scope.validateFile = function(element){
//       if(element.files.length>0) {
//           filterfile = element.files[0]['name'].substring(element.files[0]['name'].lastIndexOf('.') + 1).toLowerCase();
//           if (!checkStringLength(element.files[0].name)) {  
//               showAlertMessage({
//                   status : 0,
//                   message : CONFIG_MESSAGES.file_name_limit_exceeds
//               });
//               return false;
//           } 
//           if(parseInt(element.files[0]['size']) > TOTAL_FILE_SIZE_LIMIT){
//               showAlertMessage({
//                   'status': 0,
//                   'message': "File Size should not exceed 8 MB"
//               });
//               return false;
//           } else if(!(filterfile == "rtf" || filterfile == "doc" || filterfile == "docx" || filterfile == "xlsx"
//           || filterfile == "pdf" || filterfile == "txt" || filterfile == "html")){
//               showAlertMessage({
//                   'status': 0,
//                   'message': 'Invalid File Format'
//               });
//               return false;   
//           }
//             $scope.total_file_size += element.files[0]['size'];
//             if($scope.total_file_size > TOTAL_FILE_SIZE_LIMIT) {
//                 $scope.total_file_size -= element.files[0]['size'];
//                 return showAlertMessage({ 
//                     status: 0, 
//                     message: "Total File size should not exceed 8 MB" 
//                 });
//             }
//       }
//       else{
//           return false;
//       }
//       return true;
//   }

//   $scope.submitResume = function() {
//     console.log("hello")
//       var FormParsingRes = new FormData();
//       var file_type = '';
//       var url = 'careers/ResumeParser';
//       if(!isEmpty($scope.Custom.form_file_inputs)) {
//           angular.forEach($scope.Custom.form_file_inputs,function(k,v){
//               if($scope.Custom.form_file_inputs[v]) {
//                 angular.forEach($scope.Custom.form_file_inputs[v], function (value, key) {
//                   FormParsingRes.append('document_file['+v+']', value); 
//                   file_type = value['name'].substring(value['name'].lastIndexOf('.') + 1).toLowerCase();
//                   FormParsingRes.append('file_type', file_type); 
//                 }); 
//                 }
//           });
//         }
//         else{
//           showAlertMessage({
//               'status': 0,
//               'message': 'Please select a valid file!'
//           });
//           return false;
//       }
      
//       $scope.isExcelFile = 0;
//       if(file_type == 'xlsx'){
//           $scope.isExcelFile = 1;
//       }

//       if (isNotEmpty(SessionToken))
//         FormParsingRes.append('login_access_token', SessionToken);
      
//       if (isNotEmpty($scope.SessionToken))
//         FormParsingRes.append('login_access_token', $scope.SessionToken);

//         FormParsingRes.append('sub_domain',$rootScope.sub_domain);

//       $scope.btn_loading = true;
//       HrApiServices.postAttachment(url,FormParsingRes)
//       .then(function success(response) {
//         $scope.btn_loading = false;
//           var message_data = response.data;
//           if (message_data.status) {
//               if (!isEmpty($scope.isExcelFile)) {
//                   var excelData = message_data.data.excelData;
//                   var header_fields = message_data.data.header_fields;
//                   angular.forEach(header_fields, function (v, k) {
//                       $scope[$scope.form_model]['candidates'][k] = excelData[1][k];
//                   });
//               }

//               $scope.arrResponseData = message_data.data;

//               if (isNotEmpty($scope.arrResponseData.arrListDetails)) {
//                   $scope[$scope.form_model]['candidates'] = $scope.arrResponseData.arrListDetails;
//               }
//               showAlertMessage({
//                   'status': 1,
//                   'message': "File Uploaded Successfully!"
//               });
//           }
//           else {
//               showAlertMessage(message_data);
//           }
//       });
//   }
//     $scope.removeFile = function(file, name) {
//         ConfirmAlert.swal({
//             title: "Are you sure?",
//             text: "You want to delete this attachment",
//             imageUrl: $scope.alertdeleteimage,
//             showCancelButton: true,
//             confirmButtonColor: "#DD6B55",
//             confirmButtonText: "Yes",
//             cancelButtonText: "No",
//         }, function(isConfirm) {
//             if (isConfirm) {     
//                 if (isNotEmpty($scope.files_size[file.original_name])) {
//                     $scope.total_file_size -= $scope.files_size[file.original_name];
//                 }  
//                 $scope.Custom[name].splice($scope.Custom[name].indexOf(file), 1); 
//                 $scope.Custom['form_file_inputs'][name].splice($scope.Custom['form_file_inputs'][name].indexOf(file), 1);   
//             }
//         });
//     }
// });

// angular.module('OorwinApp').controller('sendChangeRefereeRequestCtrl', function ($scope, $rootScope,$uibModal, $uibModalInstance, $http, HrApiServices, items) {

//   $scope.sendRequestDetails = {};
//   $scope.configFormArr = {};
//   $scope.form_name = 'sendRequestForm';
//   $scope.form_model = 'sendRequestDetails';
//   $scope[$scope.form_model] = {};
//   $scope[$scope.form_name] = {};

//   $scope.sendChangeRefereeRequest = function() {
//     formres = new FormData();
//     postData = $scope[$scope.form_model];

//     if (isEmpty(postData.change_referee_request)) {
//       $uibModalInstance.close();
//       return;
//     }
    
//     if (isNotEmpty(SessionToken))
//       formres.append('login_access_token', SessionToken);
    
//     if (isNotEmpty($scope.SessionToken))
//       formres.append('login_access_token', $scope.SessionToken);

//       formres.append('sub_domain',$rootScope.sub_domain);
//       postData.referred_candidate_id = items.referred_candidate_id;
//       postData.web_domain = ROOT_URL;
      
//       formres.append("data", angular.toJson(postData));
//       action_url = 'careers/change_referee_request';
//       $scope.btn_loading = true;
//       HrApiServices.postAttachment(action_url,formres).then(function success(response) {
//         $scope.btn_loading = false;
//         response_data = response.data;
//         showAlertMessage({'status':response.data.status, 'message':response.data.message});
//         $scope.referral_candidates = response_data.data.referral_candidates;
//         $uibModalInstance.close();
//       });
//   }

//   $scope.cancel = function () {
    
//       $uibModalInstance.close(false);
//   };
// });
// App.controller('careerPortalReferCandidateWithoutJobModalInstanceCtrl', function ($scope,$uibModalInstance,$uibModal,HrApiServices,$state,items, $rootScope) {

//   $scope.referral_candidates = {};
//   $scope.referral_candidates = items.referral_candidates;

//   $scope.addCandidateDetails = {};
//   $scope.form_name = 'referCandidateWithoutJobForm';
//   $scope.form_model = 'addCandidateDetails';
//   $scope[$scope.form_model] = {};
//   $scope[$scope.form_name] = {};

//   $scope.is_refer_new_candidate = 1;
//   $scope.addCandidateDetails.candidates = {};
//   $scope.addCandidateDetails.candidates.is_refer_new_candidate = "1";
//   $scope.withoutJobCandidateType = function(candidate_type) {
//     $scope.is_refer_new_candidate = candidate_type;
//   }

//   $scope.cancel = function() {
//       $uibModalInstance.close(false);
//   };

//   $scope.submitted = 0;
//   $scope.referCandidateWithoutJob = function() {
//     $scope.submitted = 0;
//     $scope.validation_errors = {};
//     $scope.validation_errors[$scope.form_name] = {};

//     if (!$scope[$scope.form_name]['form'].$valid) {
//         $scope.submitted = 1;
//         return false;
//     }
   
//     postData = $scope[$scope.form_model]['candidates'];
//     postData.is_refer_new_candidate = $scope.is_refer_new_candidate;

//     if (isNotEmpty(SessionToken))
//       postData.login_access_token = SessionToken;
    
//     if (isNotEmpty($scope.SessionToken))
//       postData.login_access_token = $scope.SessionToken;

//     postData.sub_domain = $rootScope.sub_domain;
//     postData.web_domain = ROOT_URL;
//     action_url = 'careers/refer_new_candidate_without_job';
//     $scope.btn_loading = true;
//     HrApiServices.post(action_url,postData)
//     .then(function success(response) {
//       $scope.btn_loading = false;
//       var response_data = response.data;
//       console.log("response",response_data);
//       showAlertMessage({
//           status : response_data.status,
//           message : response_data.message
//       });

//       if (response.data.status) {
//         $uibModalInstance.close(response.data);        
//       }
//     });
//   }
// });

App.filter('jobpublishdateFilter',function($rootScope){
    return function(input) {
        var arrResult = [];     
        if(input) {
            //input_arr = input.split(' ');
            //date = input[0];
            date = new Date(input);

            var seconds = Math.floor((new Date($rootScope.curent_date) - date) / 1000);

            var interval = seconds / 31536000;

            if (interval > 1) {
              return Math.floor(interval) + " years ago";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
              return Math.floor(interval) + " months ago";
            }
            interval = seconds / 86400;
            if (interval > 1) {
              return Math.floor(interval) + " days ago";
            }
            interval = seconds / 3600;
            if (interval > 1) {
              return Math.floor(interval) + " hours ago";
            }
            interval = seconds / 60;
            if (interval > 1) {
              return Math.floor(interval) + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";

        } else {
          return '-';
        }
    }

});