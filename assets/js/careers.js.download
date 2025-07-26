App.config(function ($locationProvider, $stateProvider, $urlRouterProvider,$ocLazyLoadProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider
        .state("list", {
        //url : '/list',
        url : '/list?page&orderby&sort&view_id&organization_name',
        templateUrl : "careers/jobs_list.html?noCache=true",
        controller : "jobsListCtrl",
        title : "Careers",
        selected_tab : 'list',
        resolve: {
                deps: [
                   "$ocLazyLoad", function ($ocLazyLoad) {
                       return $ocLazyLoad.load({
                           name: "Careers",
                           insertBefore: "#ng_load_script_before",
                           // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                           files: [
                                "src_js/controllers/career_portal/jobs_list.js?t="+APP_VERSION,
                                "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                                "src_js/controllers/career_portal/CandidateDocumentUpdateRequestCtrl.js?t="+APP_VERSION

                           ]
                       });
                   }
               ],
           }
        })
        .state("process_linkedin_user", {
          url : '/process_linkedin_user',
          templateUrl : "careers/jobs_list.html?noCache=true",
          controller : "processLinkedInUser",
          title : "Careers",
          selected_tab : 'list',
          resolve: {
            deps: [
              "$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name: "Careers",
                  insertBefore: "#ng_load_script_before",
                  // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                  files: [
                    "src_js/controllers/career_portal/jobs_list.js?t="+APP_VERSION,
                    // "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION
                  ]
                });
              }
            ],
            pageOnLoadData: function(HireApiServices) {
              token = getQueryParameterByName('token');
              return  HireApiServices.get('careers/processLinkedInUser', {token : token, sub_domain : getQueryParameterByName('sub_domain')})
              .then(function(response_data) {
                  return response_data;
              });
            }
          }
        })
        .state("userProfile.refer",{
            url : '/refer',
            templateUrl : "careers/refer.html?noCache=true",
            controller : "CareerPortalReferralsCandidatesCtrl",
            title : "Refer",
            selected_tab : 'refer', 
            resolve: {
                deps: [
                     "$ocLazyLoad", function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: "Careers",
                                insertBefore: "#ng_load_script_before",
                                // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                                files: [
                                    "src_js/controllers/career_portal/referrals/referralsCtrl.js?t="+APP_VERSION,
                                    "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                                ]
                            });
                        }
                    ],
                 }
             })
       
        .state("userProfile.myJobs", {
            url : '/myJobs',
            templateUrl : "careers/CommonList.html?noCache=true",
            controller : "jobsListCtrl",
            title : "My Jobs",
            selected_tab : 'myJobs',
            resolve: {
                    deps: [
                       "$ocLazyLoad", function ($ocLazyLoad) {
                           return $ocLazyLoad.load({
                               name: "Careers",
                               insertBefore: "#ng_load_script_before",
                               // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                               files: [
                                    "src_js/controllers/career_portal/CandidateDocumentUpdateRequestCtrl.js?t="+APP_VERSION,
                                    "src_js/controllers/career_portal/jobs_list.js?t="+APP_VERSION,
                                    "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                               ]
                           });
                       }
                   ],
               }
            })
        .state("userActivation", {
            url : '/userActivation/:id',
            templateUrl : "careers/jobs_list.html?noCache=true",
            controller : "userActivationCtrl",
            title : "User Activation",
            resolve: {
                deps: [
                   "$ocLazyLoad", function ($ocLazyLoad) {
                       return $ocLazyLoad.load({
                           name: "Careers",
                           insertBefore: "#ng_load_script_before",
                           // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                           files: [
                            "src_js/controllers/career_portal/user_activation.js?t="+APP_VERSION,
                            //"src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION
                           ]
                       });
                   }
               ],
            }
        })
        // .state("job", {
        //     url : '/job/:id?t&source&postedby',
        //     templateUrl : "careers/job_view.html?noCache=true",
        //     controller : "jobViewCtrl",
        //     title : "View Job",
        //         resolve: {
        //             deps: [
        //                "$ocLazyLoad", function ($ocLazyLoad) {
        //                    return $ocLazyLoad.load({
        //                        name: "View Job",
        //                        insertBefore: "#ng_load_script_before",
        //                        // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                        files: [
        //                             "src_js/controllers/career_portal/user_profile_apply.js?t="+APP_VERSION,
        //                             "src_js/controllers/career_portal/job_view.js?t="+APP_VERSION,
        //                             "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
        //                             "assets/js/angular-ui-toggle.min.js?t="+APP_VERSION,
        //                             "assets/js/angular-file-upload.min.js?t="+APP_VERSION,
        //                             'src_js/controllers/CommonFileUploaderCtrl.js?t='+APP_VERSION,
        //                             "src_js/controllers/career_portal/CandidateDocumentUpdateRequestCtrl.js?t="+APP_VERSION
        //                        ]
        //                    });
        //                }
        //            ],
        //        }
        // })
        .state("resetPassword", {
            url : '/resetPassword/:id',
            templateUrl : "careers/resetPassword.html?noCache=true",
            controller : "ResetPwdFormCtrl",
            title : "Reset Password",
            resolve: {
                deps: [
                   "$ocLazyLoad", function ($ocLazyLoad) {
                       return $ocLazyLoad.load({
                           name: "Careers",
                           insertBefore: "#ng_load_script_before",
                           // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                           files: [
                            "src_js/controllers/career_portal/reset_password.js?t="+APP_VERSION,
                            //"src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION
                           ]
                       });
                   }
               ],
            }
        })
        
        .state("job", {
            url : '/job/:id?t&source&postedby&share',
            templateUrl : "careers/registration.html?noCache=true",
            controller : "jobViewCtrl",
            title : "View Job",
                resolve: {
                    deps: [
                       "$ocLazyLoad", function ($ocLazyLoad) {
                           return $ocLazyLoad.load({
                               name: "View Job",
                               insertBefore: "#ng_load_script_before",
                               // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                               files: [
                                    "src_js/controllers/career_portal/user_profile_apply.js?t="+APP_VERSION,
                                    "src_js/controllers/career_portal/job_view.js?t="+APP_VERSION,
                                    "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                                    "assets/js/angular-file-upload.min.js?t="+APP_VERSION,
                                    'src_js/controllers/CommonFileUploaderCtrl.js?t='+APP_VERSION,
                                    "src_js/controllers/career_portal/CandidateDocumentUpdateRequestCtrl.js?t="+APP_VERSION
                               ]
                           });
                       }
                   ],
               }
        })
        .state("jobDetails", {
            url : '/job/details/:id?t&source&postedby&share',
            templateUrl : "careers/job_view_new.html?noCache=true",
            controller : "jobViewCtrl",
            title : "View Job",
                resolve: {
                    deps: [
                       "$ocLazyLoad", function ($ocLazyLoad) {
                           return $ocLazyLoad.load({
                               name: "View Job",
                               insertBefore: "#ng_load_script_before",
                               // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                               files: [
                                    "src_js/controllers/career_portal/user_profile_apply.js?t="+APP_VERSION,
                                    "src_js/controllers/career_portal/job_view.js?t="+APP_VERSION,
                                    "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                                    "assets/js/angular-file-upload.min.js?t="+APP_VERSION,
                                    'src_js/controllers/CommonFileUploaderCtrl.js?t='+APP_VERSION,
                                    "src_js/controllers/career_portal/CandidateDocumentUpdateRequestCtrl.js?t="+APP_VERSION
                               ]
                           });
                       }
                   ],
               }
        })

        .state("jobIndeedDetails", {
            url : '/job/indeed_details/:id?t&source&postedby&share',
            templateUrl : "careers/job_indeed_view.html?noCache=true",
            controller : "jobIndeedViewCtrl",
            title : "View Job",
                resolve: {
                    deps: [
                       "$ocLazyLoad", function ($ocLazyLoad) {
                           return $ocLazyLoad.load({
                               name: "View Job",
                               insertBefore: "#ng_load_script_before",
                               // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                               files: [
                                    "src_js/controllers/career_portal/user_profile_apply.js?t="+APP_VERSION,
                                    "src_js/controllers/career_portal/job_indeed_view.js?t="+APP_VERSION,
                                    "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                                    "assets/js/angular-file-upload.min.js?t="+APP_VERSION,
                                    'src_js/controllers/CommonFileUploaderCtrl.js?t='+APP_VERSION,
                                    "src_js/controllers/career_portal/CandidateDocumentUpdateRequestCtrl.js?t="+APP_VERSION
                               ]
                           });
                       }
                   ],
               }
        })
        // .state("userProfile.referrals", {
        //     url : '/referrals',
        //     templateUrl : "careers/referrals/index.html?noCache=true",
        //     controller : "CareerPortalReferralsCtrl",
        //     title : "Referrals",
        //     selected_tab : 'referrals',
        //     resolve: {
        //         deps: [
        //            "$ocLazyLoad", function ($ocLazyLoad) {
        //                return $ocLazyLoad.load({
        //                    name: "Careers",
        //                    insertBefore: "#ng_load_script_before",
        //                    files: [
        //                         "src_js/controllers/career_portal/referrals/referralsCtrl.js?t="+APP_VERSION,
        //                         "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                                
        //                        "src_js/controllers/career_portal/user_profile.js?t="+APP_VERSION,
        //                    ]
        //                });
        //             }
        //         ],
        //     }
        // })
        // .state("userProfile.referrals.candidates", {
        //     url : '/candidates?page&orderby&sort&view_id',
        //     templateUrl : "careers/referrals/candidates.html?noCache=true",
        //     controller : "CareerPortalReferralsCandidatesCtrl",
        //     title : "Referral Candidates",
        //     selected_tab : 'referrals-candidates',
        //     resolve: {
        //         deps: [
        //            "$ocLazyLoad", function ($ocLazyLoad) {
        //                return $ocLazyLoad.load({
        //                    name: "Careers",
        //                    insertBefore: "#ng_load_script_before",
        //                    files: [
        //                         "src_js/controllers/career_portal/referrals/referralsCtrl.js?t="+APP_VERSION,
        //                         "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                                
        //                        "src_js/controllers/career_portal/user_profile.js?t="+APP_VERSION,
        //                    ]
        //                });
        //             }
        //         ],
        //     }
        // })
        .state("userProfile.referrals", {
            url : '/list?page&orderby&sort&view_id',
            templateUrl : "careers/referrals/referrals.html?noCache=true",
            controller : "CareerPortalReferralsListCtrl",
            title : "Referrals List",
            selected_tab : 'referrals-list',
            resolve: {
                deps: [
                   "$ocLazyLoad", function ($ocLazyLoad) {
                       return $ocLazyLoad.load({
                           name: "Careers",
                           insertBefore: "#ng_load_script_before",
                           files: [
                                "src_js/controllers/career_portal/referrals/referralsCtrl.js?t="+APP_VERSION,
                                "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION
                           ]
                       });
                    }
                ],
            }
        })
        
        .state("my_documents", {
            url : '/my_documents?token',
            templateUrl : "careers/candidate_documents.html?noCache=true",
            controller : "CandidateDocumentsCtrl",
            title : "My Documents",
            selected_tab : 'my_documents',
            resolve: {
                deps: [
                   "$ocLazyLoad", function ($ocLazyLoad) {
                       return $ocLazyLoad.load({
                           name: "Careers",
                           insertBefore: "#ng_load_script_before",
                           // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                           files: [
                            "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                            "src_js/controllers/career_portal/candidate_documents.js?t="+APP_VERSION,
                            "src_js/controllers/career_portal/CandidateDocumentUpdateRequestCtrl.js?t="+APP_VERSION
                           ]
                       });
                   }
               ],
            }
        })
        .state("userProfile.saved_jobs", {
            url : '/saved_jobs?token',
            templateUrl : "careers/CommonList.html?noCache=true",
            controller : "jobsListCtrl",
            title : "My saved_jobs",
            selected_tab : 'saved_jobs',
            resolve: {
                deps: [
                   "$ocLazyLoad", function ($ocLazyLoad) {
                       return $ocLazyLoad.load({
                           name: "Careers",
                           insertBefore: "#ng_load_script_before",
                           // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                           files: [
                            "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                            "src_js/controllers/career_portal/jobs_list.js?t="+APP_VERSION,
                           ]
                       });
                   }
               ],
            }
        })
         .state("userProfile", {
            url : '/userProfile',
            templateUrl : "careers/user_profile.html?noCache=true",
            controller : "userProfileCtrl",
            title : "User Profile",
            selected_tab : 'userProfile',
            resolve: {
                deps: [
                   "$ocLazyLoad", function ($ocLazyLoad) {
                       return $ocLazyLoad.load({
                           name: "Careers",
                           insertBefore: "#ng_load_script_before",
                           // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                           files: [
                                "src_js/controllers/career_portal/CandidateDocumentUpdateRequestCtrl.js?t="+APP_VERSION,
                               "src_js/controllers/DynamicFormCtrl.js?t="+APP_VERSION,
                           ]
                       });
                   }
               ],
            }
        })
       
    // For any unmatched url, redirect to /list
    $urlRouterProvider.otherwise(function($injector) {
       var $state = $injector.get('$state');
              $state.go('list');
     });

});