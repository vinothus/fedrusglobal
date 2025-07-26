var OAuthScopeArr ={createTemplateScope:undefined, createTemplateDocumentScope:undefined, addDocumentScope:undefined, editDocumentScope:undefined,  addDocumentInFormScope:undefined};
App.controller('DynamicFormCtrl', function($scope, $timeout, $http, ConfirmAlert, $uibModal, $rootScope, $filter,$controller, $sce, HrApiServices, HireApiServices, $state) 
{
    var CURRENT_MODULE_ID = $scope.module_id;
    

    if(isNotEmpty($scope.configFormArr) && isNotEmpty($scope.configFormArr.form_options))
    {
        var defined_required_fields = $scope.configFormArr.form_options.defined_required_fields;
        var show_in_table_list_fields_arr = $scope.configFormArr.form_options.show_in_table_list_fields_arr;
        var defined_disabled_fields = $scope.configFormArr.form_options.defined_disabled_fields;
        var defineFieldAttrObj = $scope.configFormArr.form_options.defineFieldAttrOptions;
        //var removeSelectAllInMultiselect = $scope.configFormArr.form_options.remove_select_all_in_multiselect;
    }

    $scope.show_auth_providers_for = [APP_CONSTANTS.MODULE_SLUGS.RESOURCE_POOL_SLUG['id'],APP_CONSTANTS.MODULE_SLUGS.CANDIDATES_SLUG['id']];
    $scope.newField = {};
    $scope.fields = [];
    $scope.newTab = {};
    $scope.newSec = {};
    $scope.list_of_data = [];

    $scope.defined_required_fields = [];
    if (typeof defined_required_fields != 'undefined') {
        $scope.defined_required_fields = defined_required_fields;
    }

    $scope.defineFieldAttrObj = [];
    if (typeof defineFieldAttrObj != 'undefined') {
        $scope.defineFieldAttrObj = defineFieldAttrObj;
    }
    
    $scope.defined_disabled_fields = [];
    if (typeof defined_disabled_fields != 'undefined') {
        $scope.defined_disabled_fields = defined_disabled_fields;
    }

    $scope.show_in_table_list_fields_arr = [];
    if (typeof show_in_table_list_fields_arr != 'undefined') {
        $scope.show_in_table_list_fields_arr = show_in_table_list_fields_arr;
    }

    if(typeof $scope.show_add_more == 'undefined') {
        $scope.show_add_more = true;
    }

     $scope.fromQuickAdd = false;
     
    // $scope.removeSelectAllInMultiselect = [];
    //  if (typeof removeSelectAllInMultiselect != 'undefined') {
    //     $scope.removeSelectAllInMultiselect = removeSelectAllInMultiselect;
    // }
    // configurations
    
    $scope.validation_errors = {};
    $scope.validation_errors[$scope.form_name] = {};

    $scope.CountryList = obj_countries_list;
    $scope.StatesList = obj_states_list;
    $scope.CountryStateList = obj_country_states;
    $scope.TimezonesCountryList = obj_timezones_country_list;
    var TodaysDate = new Date();
    $scope.dateOptionsTargetJob = {maxDate:TodaysDate.setDate(TodaysDate.getDate()+150)};

    
    if (typeof $scope[$scope.form_model]!== 'undefined' && typeof $scope[$scope.form_model]['accounts'] !== 'undefined') {
        angular.forEach($scope.sectionsFields, function(section, index) {
            angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                if (fieldObj.field_name == 'submmision_workflow') {
                    var internalIndex = $scope.sectionsFields[index]['cnf_form_field'][child_index].options.findIndex(function(option) {
                        return option.id === 1 && option.name === 'Internal';
                    });
                    // console.log(internalIndex)
                    if (internalIndex !== -1) {
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options.splice(internalIndex, 1);
                    }
                    // console.log($scope.sectionsFields[index]['cnf_form_field'][child_index].options)
                }
            });
        });
    }
    

    $scope.setEffectiveDate = function() {
        if (isEmpty($scope.billableAssignment.assignment_billing_information)) {
            $scope.billableAssignment.assignment_billing_information = {};
        }
        
        if (isEmpty($scope.billableAssignment.assignment_billing_information.effective_date)) {
            if (isNotEmpty($scope[$scope.form_model].assignments) && isEmpty($scope[$scope.form_model]['assignments']['id'])) {
                $scope.billableAssignment.assignment_billing_information.effective_date= $scope[$scope.form_model]['assignments']['start_date'];
            }
        }
    }

    $scope.showInTableListFields = function(field) {
        if (typeof $scope.show_in_table_list_fields_arr == 'undefined') {
            return false;
        }

        if ($scope.show_in_table_list_fields_arr.indexOf(field.field_name) > -1) {
            return true;
        }

        return false;
    }

    $scope.getDateFromString = function(date_str) {
        if (isEmpty(date_str)) {
            return date_str;
        }
        
        return new Date(date_str);
    }
    
    $scope.validateBirthDate = function(date_of_birth) {

        var today = new Date();
        var birthDate = new Date(date_of_birth);
        var age = today.getFullYear() - birthDate.getFullYear();
        var months = today.getMonth() - birthDate.getMonth();
        var date = today.getDate() - birthDate.getDate();
        if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if(months<0){
            months +=12;
        }
        if(date<0){
            date +=30;
        }
        if(age < 14)
        {
            showAlertMessage({
                status : 0,
                message : "Minimum age should be 14 years"
            });
            return false;
        } 
    }
    
    $scope.parseDynamicHtml = function(dynamic_html) {
        // return $scope.trustAsHtml(dynamic_html);
        return $filter('toTrusted')(dynamic_html);

        // <span style="display:inline-block;" ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted"></span>
    }

    $scope.getStatesListDropdownOptions = function(field,bulk_form_id='') {
        return getStatesListDropdownOptionsFunc(field, $scope,bulk_form_id);
    }

    $scope.getTimezoneListDropdownOptions = function(field,bulk_form_id='') {
        return getTimezoneListDropdownOptionsFunc(field, $scope,bulk_form_id);
    }

    $scope.getThresholdVal = function (data, thresold) {
        let str = data.split('<a href');
        if (data.length > thresold) {
            return str[0].length;
        } else {
            return data.length;
        }
    }

    $scope.setCustomMenu = function(id) {
        $scope.curSection = id;
        $timeout(function() {
            document.querySelector('#dynamicform_view_' + id).focus();
        });
    }

   
    
    $scope.isAddMoreVisible = function(section) {
        var isVisible = false;
        angular.forEach(section['cnf_form_field'], function(fieldObj) {
            if ($scope.isFieldVisible(fieldObj)) {
                isVisible = true;
                return false;
            }
        });

        if (section.table_name == 'account_contacts') {
            if(isEmpty($rootScope.masterLayout.permissions.access['contacts']['add']))
            {
                return false;
            }
            return isVisible && section.is_multiple == 1;
        }

        if (section.table_name=='assignment_billing_information' || section.table_name=='job_pay_details' || section.table_name=='candidate_expected_pay_details' || section.table_name=='requisition_pay_details' ) {
            return isVisible && section.is_multiple == 0;
        }

        // show quick book config option for aadmin in assignment-invoice_info section
        if (section.table_name=='assignment_invoice_information' ) {
            return isVisible && $rootScope.masterLayout.user_details.is_admin_user;
        }

        return isVisible && section.is_multiple == 1;
    }

    $scope.checkPayDetailsPermssion = function(section) {
        var editable_fields = 0;
        angular.forEach(section['cnf_form_field'], function(fieldObj) {
            if(fieldObj.field_name != 'mark_as_default') {
                if (typeof fieldObj.field_security != 'undefined' &&
                    typeof fieldObj.field_security[0] != 'undefined' 
                    && fieldObj.field_security[0].access == 'edit') {
                        editable_fields++;
                }
            }
            
        });

        if(editable_fields > 0) {
            return true;
        } else {
            return false;
        }
    }
    $scope.openAddAssetCategory = function() {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'assetsCategoryTitle',
            ariaDescribedBy: 'assetsCategoryModalBody',
            templateUrl: 'addAssetsCategoryModal.html',
            controller: 'addAssetsCategoryModalCtrl',
            size: 'md modal-dialog-aside',
            resolve: {
                items: function () {
                    return [ $scope[$scope.form_model]['assets']['type']];
                }
            }
        }).result.then(function(titleData) {
            angular.forEach($scope.sectionsFields, function(section, index) {
                angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                    if (fieldObj.field_name == 'category') {
                        var restoreOptionsArr = [];
                        if (typeof $scope.sectionsFields[index]['cnf_form_field'][child_index].options != 'undefined') {
                            restoreOptionsArr = angular.copy($scope.sectionsFields[index]['cnf_form_field'][child_index].options);
                        }

                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = restoreOptionsArr;
                        
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options.push(titleData.data);
                        
                        if(typeof $scope[$scope.form_model][fieldObj.related_table] == 'undefined') {
                            $scope[$scope.form_model][fieldObj.related_table] = [];
                        }

                        $scope.multipleInput(fieldObj,titleData['data']['id'].toString(),fieldObj.options);
                        //$scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = titleData.data.id;
                    }
                });
            });
        }, function() {
            //on cancel button press
        });
    };

    $scope.openAddAssetBrand = function() {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'assetsBrandTitle',
            ariaDescribedBy: 'assetsBrandModalBody',
            templateUrl: 'addAssetsBrandModal.html',
            controller: 'addAssetsBrandModalCtrl',
            size: 'md modal-dialog-aside',
            resolve: {
                items: function () {
                    return [ $scope[$scope.form_model]['assets']['type']];
                }
            }
        }).result.then(function(titleData) {
            angular.forEach($scope.sectionsFields, function(section, index) {
                angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                    if (fieldObj.field_name == 'brand') {
                        var restoreOptionsArr = [];
                        if (typeof $scope.sectionsFields[index]['cnf_form_field'][child_index].options != 'undefined') {
                            restoreOptionsArr = angular.copy($scope.sectionsFields[index]['cnf_form_field'][child_index].options);
                        }

                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = restoreOptionsArr;
                        
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options.push(titleData.data);
                        
                        if(typeof $scope[$scope.form_model][fieldObj.related_table] == 'undefined') {
                            $scope[$scope.form_model][fieldObj.related_table] = [];
                        }

                        $scope.multipleInput(fieldObj,titleData['data']['id'].toString(),fieldObj.options);
                        //$scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = titleData.data.id;
                    }
                });
            });
        }, function() {
            //on cancel button press
        });
    };
    
    $scope.changeAssetType = function() {
        var asset_type_val = $scope[$scope.form_model]['assets']['type'];
            var options = [{"id":"Free","name":"Free"},{"id":"Trial","name":"Trial"},{"id":"Purchase","name":"Purchase"}];
            var status_options =  [{"id":"Active","name":"Active"},{"id":"Expired","name":"Expired"}];
            if(asset_type_val == 'Hardware') {
                options = [{"id":"Own","name":"Own"},{"id":"Rent","name":"Rent"}];
                status_options = [{"id":"Assigned","name":"Assigned"},{"id":"Inventory","name":"Inventory"},{"id":"Decommissioned","name":"Decommissioned"},{"id":"Under Maintenance","name":"Under Maintenance"}];
            }

            // alert($scope[$scope.form_model]['assets']['brand']);
            
            angular.forEach($scope.sectionsFields, function(section, index) {
                angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                    if (fieldObj.field_name == 'ownership') {
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = options;
                    }
                    else if (fieldObj.field_name == 'status') {
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = status_options;
                    }
                });
            });
            var data = {
                type: asset_type_val
            };
            HrApiServices.post('assets/changeFields',data)
            .then(function(response){
                var data = response.data.data

                // var cat_data = Object.entries(data.category_data).map(e=>e[1]);
                // var brand_data = Object.entries(data.brand_data).map(e=>e[1]);
                var cat_data = data.category_data
                var brand_data = data.brand_data
                var brand_options = brand_data.map(function(item) {
                    return {
                        id: item.id,
                        name: item.name
                    };
                });
                var category_options = cat_data.map(function(item) {
                    return {
                        id: item.id,
                        name: item.name
                    };
                });
                angular.forEach($scope.sectionsFields, function(section, index) {
                    angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                        if (fieldObj.field_name == 'category') {
                            $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                            $scope.sectionsFields[index]['cnf_form_field'][child_index].options = category_options;
                        }else if (fieldObj.field_name == 'brand') {
                            $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                            $scope.sectionsFields[index]['cnf_form_field'][child_index].options = brand_options;
                        }
                    });
                });
            },
            function(error){

            })
        
    };

    $scope.getAssigneeDetails = function(){
        if(isNotEmpty($scope[$scope.form_model]['assets']['assign_to'][0]['id'])) {
            var assignee_id = $scope[$scope.form_model]['assets']['assign_to'][0]['id'];
            HrApiServices.get('assets/get_assignee_details/'+assignee_id).then(function(success) {
                        message_data = success.data.data;
                        console.log(message_data)
                        $scope[$scope.form_model]['assets']['computed_employee_email'] = message_data.email;
                        $scope[$scope.form_model]['assets']['assignee_phone'] = message_data.contact_number;
                },function(error) {

            });
        }    
    }


    $scope.isDisabledField = function(field) {
        return disabledFunc(field, $scope);
    }

    $scope.isFieldVisible = function(field,bulk_form_id='') {
        return isVisibleFunc(field, $scope,bulk_form_id);
    }

    $scope.isConfigVisible = function(field)
    {
        return isConfigVisibleFunc(field, $scope);
    }

    
    angular.extend(this, $controller('CommonFormEventsCtrl', {$scope: $scope}));    

   
    $scope.map_options = {};

    

    var formres;

    $scope.addMore = function(section, Data) {
        var show_auth_providers = false
        if($scope.show_auth_providers_for.includes(CURRENT_MODULE_ID)){
            show_auth_providers = true
        }
        var SecData = [];
        $scope.list_of_mult_sec_form_ids = {};

        SecData['section_name'] = section.name;
        SecData['KeyIndex'] = section.table_name;
        SecData['SubForm'] = section['cnf_form_field'];
        SecData['ModelName'] = section.table_name;
        SecData['FormData'] = "";
        SecData['show_auth_providers'] = show_auth_providers;
        if (typeof $scope.defined_disabled_fields != 'undefined') {
            SecData['defined_disabled_fields'] = $scope.defined_disabled_fields;
        }

        if (typeof $scope.defineFieldAttrObj != 'undefined'){
            SecData['defineFieldAttrObj'] = $scope.defineFieldAttrObj;
        }

        if (SecData['KeyIndex'] == 'assignment_overhead_costs' ||  SecData['KeyIndex'] == 'assignment_additional_pay_information') {
            SecData['billing_details'] = $scope[$scope.form_model]['assignment_billing_information'] ? $scope[$scope.form_model]['assignment_billing_information'] : null;
            SecData['assignments'] = $scope[$scope.form_model]['assignments'] ? $scope[$scope.form_model]['assignments'] : null;
        }
        var loadTemplateUrl = 'CustomMultiSubFormModal.html';
        var loadTemplateUrlSize = 'xl modal-dialog-aside';
        SecData['isMultiForm'] = 1;
        if(section.table_name == 'assignment_additional_pay_information' || section.table_name == 'assignment_overhead_costs' || section.table_name == 'assignment_po_informations' || section.table_name == 'employee_payment_revises' || section.table_name == 'user_emergency_contacts' || section.table_name == 'user_dependants' || section.table_name == 'user_education_details' || section.table_name == 'opportunity_splits'){
            SecData['isMultiForm'] = 0;
            loadTemplateUrl = 'CustomSubFormModal.html';
            loadTemplateUrlSize = 'xl modal-dialog-aside w-50';
        }
        if(section.table_name == 'opportunity_splits'){
            var maxlength = 3;
            if(isNotEmpty($scope[$scope.form_model]['opportunity_splits']) && ($scope[$scope.form_model]['opportunity_splits'].length) >= parseInt(maxlength)){
                showAlertMessage({'status' : 0, 'message' : 'Maximum 3 records only allowed.'});
                return false;
            }
        }
        //Only when Parsing Candidate
        var from_parse = false;
        var parseData = [];
        if((typeof $scope.parsing_details != 'undefined' && isNotEmpty($scope.from_create_candidate)) || isNotEmpty($scope.addMoreParseDataPopUp)){
            from_parse = true;
            parseData = $scope[$scope.form_model][section.table_name];
        }

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: loadTemplateUrl,
            // templateUrl: 'CustomSubFormModal.html',
            controller: 'CustomSubFormModalInstanceCtrl',
            controllerAs: '$ctrl',
            backdrop: 'static',
            size: loadTemplateUrlSize,
            windowClass: 'fixed-right',
            scope: $scope,
            resolve: {
                items: function() {
                    return SecData;
                },
                data_rest: function(){
                    return parseData;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) 
        {
            if(SecData['isMultiForm'] == 1){
                if(isNotEmpty($scope.RecordID) && !$scope.from_can_view)
                {
                    formres = new FormData();
                    $scope.sendData = {};

                    $scope.sendData['is_multi'] = 1;
                    $scope.sendData[section.table_name] = [];
                    var i=0;
                    console.log(section.table_name);

                    angular.forEach(selectedItem, function(val,key){
                        angular.forEach(val, function(valSec,keySec){
                            $scope.sendData[section.table_name][i] = valSec;
                            if (isNotEmpty($scope.form_file_inputs) && $scope.form_file_inputs[key]['original_name']) {
                                angular.forEach($scope.form_file_inputs[key]['original_name'], function(value, keySec) {
                                    console.log(value);    
                                    formres.append('document_file['+i+']', value);
                                });
                                delete $scope.form_file_inputs[key];
                            }
                            i++;
                        });
                    });
                    formres.append("data", angular.toJson($scope.sendData));
                    HrApiServices.postAttachment($scope.SUB_RECORD_SAVE_URL, formres)
                    .then(function(success) {
                        message_data = success.data;
                        if (success.data.success) {
                            showAlertMessage(message_data);
                        } else {
                            showFormValidationErrorMessages(success);
                        }
                        /*
                        displaying accountprimary contact after adding a new contact as a primary contact -Abdul(21-01-2020)
                        */ 
                        if (section.table_name=='account_contacts') {
                            $scope.getAccountPrimaryContactDetails();
                        } 
                        if (message_data.status == 1) {
                            if(typeof message_data.data.recordID !== 'undefined') recordID = message_data.data.recordID;
                            else recordID = message_data.recordID;
                            $scope[$scope.form_model][section.table_name]=[];
                                angular.forEach(message_data.data.record_data, function(valSec,keySec){
                                    if ((section.table_name == 'job_pay_billing_details' && valSec.mark_as_default != 1) || (section.table_name == 'candidate_expected_pay_billing_details' && valSec.mark_as_default != 1) || (section.table_name == 'requisition_pay_billing_details' && valSec.mark_as_default != 1)) {
                                        if(!isEmpty(valSec['client_rate'])){
                                            var str = valSec['client_rate'].split('-');
                                            var min = isNotEmpty(str[0] && str[0]!='undefined')?str[0]:0;
                                            var max = isNotEmpty(str[1] && str[1]!='undefined')?str[1]:'';
                                            valSec['client_rate'] = min+'-'+max;
                                        }
                                        if(!isEmpty(valSec['hire_rate'])){
                                            var str1 = valSec['hire_rate'].split('-');
                                            var min = isNotEmpty(str1[0] && str1[0]!='undefined')?str1[0]:0;
                                            var max = isNotEmpty(str1[1] && str1[1]!='undefined')?str1[1]:'';
                                            valSec['hire_rate'] = min+'-'+max;
                                        }
                                        $scope[$scope.form_model][section.table_name].push(valSec);
                                    }
                                    if(section.table_name != 'job_pay_billing_details' && section.table_name != 'candidate_expected_pay_billing_details' && section.table_name != 'requisition_pay_billing_details'){
                                        $scope[$scope.form_model][section.table_name].push(valSec);
                                    }
                                });

                            if(section.table_name == 'resumesform') {
                                if(typeof message_data.data.list_data !== 'undefined') {
                                    if(!isEmpty(message_data.data.list_data)) {
                                        $scope[$scope.form_model][section.table_name] = message_data.data.list_data;
                                    }
                                }
                            }
                            if(section.table_name=='account_billing_addresses' || section.table_name=='account_shipping_addresses'){
                                if(typeof message_data.data.list_data !== 'undefined') {
                                    if(!isEmpty(message_data.data.list_data)) {
                                        $scope[$scope.form_model][section.table_name] = message_data.data.list_data;
                                    }
                                }
                            }
                            if(section.table_name == 'asset_documents') {
                                if(typeof message_data.data.list_data !== 'undefined') {
                                    if(!isEmpty(message_data.data.list_data)) {
                                        $scope[$scope.form_model][section.table_name] = message_data.data.list_data;
                                        console.log(message_data.data.list_data);
                                    }
                                }
                            }
                            if (section.table_name == 'job_pay_billing_details') {
                                angular.forEach(message_data.data.record_data, function(valSec,keySec){
                                    if (valSec.mark_as_default == '1') {
                                        if (typeof message_data.data.list_data !== 'undefined') {
                                            if (!isEmpty(message_data.data.list_data)) {
                                                $scope[$scope.form_model]['job_pay_details'] = message_data.data.list_data['job_pay_details'];
                                            // $scope[$scope.form_model][section.table_name] = message_data.data.list_data[section.table_name];
                                            }
                                        }
                                    }
                                });
                            }

                            if (section.table_name == 'candidate_expected_pay_billing_details') {
                                angular.forEach(message_data.data.record_data, function(valSec,keySec){
                                    if (valSec.mark_as_default == '1') {
                                        if (typeof message_data.data.list_data !== 'undefined') {
                                            if (!isEmpty(message_data.data.list_data)) {
                                                $scope[$scope.form_model]['candidate_expected_pay_details'] = message_data.data.list_data['candidate_expected_pay_details'];
                                                //$scope[$scope.form_model][section.table_name] = message_data.data.list_data[section.table_name];
                                            }
                                        }
                                    }
                                });
                            }
    
                            if (section.table_name == 'requisition_pay_billing_details') {
                                angular.forEach(message_data.data.record_data, function(valSec,keySec){
                                    if (valSec.mark_as_default == '1') {
                                        if (typeof message_data.data.list_data !== 'undefined') {
                                            if (!isEmpty(message_data.data.list_data)) {
                                                $scope[$scope.form_model]['requisition_pay_details'] = message_data.data.list_data['requisition_pay_details'];
                                            // $scope[$scope.form_model][section.table_name] = message_data.data.list_data[section.table_name];
                                            }
                                        }
                                    }
                                });
                            }
    
                            $scope.list_acti_data = [];
                            return;                           
                        }
                    }, function(error) {

                    });
                }
                else
                {
                    if (!$scope.isEmpty(selectedItem)) 
                    {
                        if(isEmpty($scope[$scope.form_model]))
                        {
                            $scope[$scope.form_model] = {};  
                        }
                        if(isEmpty($scope[$scope.form_model][section.table_name]) || from_parse)
                        {
                            $scope[$scope.form_model][section.table_name] = [];
                        }

                        angular.forEach(selectedItem, function(val,key){
                            if(isNotEmpty($scope.form_file_inputs) && isNotEmpty($scope.form_file_inputs[key]) && typeof $scope.form_file_inputs[key]['original_name'] !== 'undefined') {   
                                selectedItem[key][section.table_name]['attachment_name'] = $scope.form_file_inputs[key]['original_name'];
                            }
                        });

                        if(section.table_name == 'resumesform') {
                            angular.forEach(selectedItem, function(valSec,keySec){
                                if(valSec[section.table_name].mark_as_default=='1') {
                                    if(!isEmpty($scope[$scope.form_model][section.table_name])) {
                                        angular.forEach($scope[$scope.form_model][section.table_name], function(value, key) {
                                            $scope[$scope.form_model][section.table_name][key]['mark_as_default'] = 0;
                                        });
                                    }
                                } else {
                                    if(isEmpty($scope[$scope.form_model][section.table_name])) {
                                        valSec[section.table_name].mark_as_default = 1;
                                    }
                                }
                            });

                        }

                        if(section.table_name=='account_billing_addresses' || section.table_name=='account_shipping_addresses'){
                            angular.forEach(selectedItem, function(valSec,keySec){
                                if(valSec[section.table_name].mark_as_default=='1') {
                                    if(!isEmpty($scope[$scope.form_model][section.table_name])) {
                                        angular.forEach($scope[$scope.form_model][section.table_name], function(value, key) {
                                            $scope[$scope.form_model][section.table_name][key]['mark_as_default'] = 0;
                                        });
                                    }
                                } else {
                                    if(isEmpty($scope[$scope.form_model][section.table_name])) {
                                        valSec[section.table_name].mark_as_default = 1;
                                    }
                                }
                            });
                        }
                        

                        
                        if(section.table_name == 'job_pay_details' || section.table_name == 'job_pay_billing_details') {
                            angular.forEach(selectedItem, function(valSec,keySec){
                                if(valSec[section.table_name].mark_as_default == '1') {
                                    var temp_base_data = $scope[$scope.form_model]['job_pay_details'];
                                    $scope[$scope.form_model]['job_pay_details'] = valSec[section.table_name];
                                    temp_base_data['mark_as_default'] = 0;
                                    if(!isEmpty(temp_base_data['client_rate'])){
                                        var min = temp_base_data['client_rate']['min'];
                                        var max = temp_base_data['client_rate']['max'];
                                        temp_base_data['client_rate'] = min+'-'+max;
                                    }
                                    if(!isEmpty(temp_base_data['hire_rate'])){
                                        var min = temp_base_data['hire_rate']['min'];
                                        var max = temp_base_data['hire_rate']['max'];
                                        temp_base_data['hire_rate'] = min+'-'+max;
                                    }
                                    valSec[section.table_name] = temp_base_data;
                                }
                            });
                        }

                        if(section.table_name == 'candidate_expected_pay_details' || section.table_name == 'candidate_expected_pay_billing_details') {
                            angular.forEach(selectedItem, function(valSec,keySec){
                                if(valSec[section.table_name].mark_as_default == '1') {
                                    var temp_base_data = $scope[$scope.form_model]['candidate_expected_pay_details'];
                                    $scope[$scope.form_model]['candidate_expected_pay_details'] = valSec[section.table_name];
                                    temp_base_data['mark_as_default'] = 0;
                                    if(!isEmpty(temp_base_data['expected_pay_rate'])){
                                        var min = temp_base_data['expected_pay_rate']['min'];
                                        var max = temp_base_data['expected_pay_rate']['max'];
                                        temp_base_data['expected_pay_rate'] = min+'-'+max;
                                    }
                                    valSec[section.table_name] = temp_base_data;
                                }
                            });
                        }
    
                        if(section.table_name == 'requisition_pay_details'|| section.table_name == 'requisition_pay_billing_details') {
                            angular.forEach(selectedItem, function(valSec,keySec){
                                console.log(valSec);
                                if(valSec[section.table_name].mark_as_default == '1') {
                                    var temp_base_data = $scope[$scope.form_model]['requisition_pay_details'];
                                    $scope[$scope.form_model]['requisition_pay_details'] = valSec[section.table_name];
                                    temp_base_data['mark_as_default'] = 0;
                                    if(!isEmpty(temp_base_data['hire_rate'])){
                                        var min = temp_base_data['hire_rate']['min'];
                                        var max = temp_base_data['hire_rate']['max'];
                                        temp_base_data['hire_rate'] = min+'-'+max;
                                    }
                                    valSec[section.table_name] = temp_base_data;
                                }
                            });

                        }
                        angular.forEach(selectedItem, function(val,key){
                            angular.forEach(val, function(valSec,keySec){
                                if(typeof valSec['original_name'] != 'undefined' && isObject(valSec['original_name'])){
                                    valSec['original_name'] = (typeof valSec['original_name']['original_name'] != 'undefined') ? valSec['original_name']['original_name'] : ''; 
                                    // console.log(valSec['original_name']);
                                }
                                if ((section.table_name == 'job_pay_billing_details' && valSec.mark_as_default != 1) || (section.table_name == 'candidate_expected_pay_billing_details' && valSec.mark_as_default != 1 )|| (section.table_name == 'requisition_pay_billing_details' && valSec.mark_as_default != 1 ) ) {
                                    if(!isEmpty(valSec['client_rate'])){
                                        var str = valSec['client_rate'].split('-');
                                        var min = isNotEmpty(str[0] && str[0]!='undefined')?str[0]:0;
                                        var max = isNotEmpty(str[1] && str[1]!='undefined')?str[1]:'';
                                        valSec['client_rate'] = min+'-'+max;
                                    }
                                    if(!isEmpty(valSec['hire_rate'])){
                                        var str1 = valSec['hire_rate'].split('-');
                                        var min = isNotEmpty(str1[0] && str1[0]!='undefined')?str1[0]:0;
                                        var max = isNotEmpty(str1[1] && str1[1]!='undefined')?str1[1]:'';
                                        valSec['hire_rate'] = min+'-'+max;
                                    }
                                }
                                $scope[$scope.form_model][section.table_name].push(valSec);
                                i++;
                            });
                        });
                    }    
                }
            }else{
                if (!$scope[$scope.form_model][section.table_name]) {
                    $scope[$scope.form_model][section.table_name] = [];
                }
                if(isNotEmpty($scope.RecordID))
                {
                    formres = new FormData();
                    $scope.sendData = {};
    
                    if (selectedItem.attachment_name) {
                        angular.forEach(selectedItem.attachment_name, function(value, key) {
                            formres.append('document_file', value);
                        });
                        delete selectedItem['attachment_name'];
                    }
    
                    $scope.sendData[section.table_name] = selectedItem;
                    formres.append("data", angular.toJson($scope.sendData));
    
                    HrApiServices.postAttachment($scope.SUB_RECORD_SAVE_URL, formres)
                    .then(function(success) {
                        message_data = success.data;
                        if (success.data.success) {
                            showAlertMessage(message_data);
                        } else {
                            showFormValidationErrorMessages(success);
                        }
                        
                        if($rootScope.masterLayout.user_details.is_admin_user)
                        {
                            //$scope.init();
                        } 
                        /*
                        displaying accountprimary contact after adding a new contact as a primary contact -Abdul(21-01-2020)
                        */ 
                        if (section.table_name=='account_contacts') {
                            $scope.getAccountPrimaryContactDetails();
                        } 
                        if (message_data.status == 1) {
                            if(typeof message_data.data.recordID !== 'undefined') recordID = message_data.data.recordID;
                            else recordID = message_data.recordID;
    
                            if (typeof selectedItem['id'] == 'undefined' || !selectedItem['id']) {
                                selectedItem['id'] = recordID;
    
                                if(typeof message_data.data.candidate_id !== 'undefined') candidate_id = message_data.data.candidate_id;
                                else if(typeof message_data.candidate_id !== 'undefined') candidate_id = message_data.candidate_id;
                                else candidate_id = '';
                                if(candidate_id) selectedItem['candidate_id'] = candidate_id;
    
                                if(section.table_name == 'employee_payment_revises' && typeof message_data.data.record_data !== 'undefined' && isNotEmpty(message_data.data.record_data)) {
                                    selectedItem['deductions'] = message_data.data.record_data;
                                }  
                                else if(section.table_name == 'employee_payment_revises' && typeof message_data.record_data !== 'undefined' && isNotEmpty(message_data.record_data)) {
                                    selectedItem['deductions'] = message_data.record_data;
                                }   
                               
                                $scope[$scope.form_model][section.table_name].push(selectedItem);
                            }
    
                            if(section.table_name == 'resumesform') {
                                if(typeof message_data.data.list_data !== 'undefined') {
                                    if(!isEmpty(message_data.data.list_data)) {
                                        $scope[$scope.form_model][section.table_name] = message_data.data.list_data;
                                    }
                                }
                            }
                            
                            if (section.table_name == 'job_pay_billing_details') {
                                if (selectedItem.mark_as_default == '1') {
                                    if (typeof message_data.data.list_data !== 'undefined') {
                                        if (!isEmpty(message_data.data.list_data)) {
                                            $scope[$scope.form_model]['job_pay_details'] = message_data.data.list_data['job_pay_details'];
                                            $scope[$scope.form_model][section.table_name] = message_data.data.list_data[section.table_name];
                                        }
                                    }
                                }
                            }
    
                            if (section.table_name == 'candidate_expected_pay_billing_details') {
                                if (selectedItem.mark_as_default == '1') {
                                    if (typeof message_data.data.list_data !== 'undefined') {
                                        if (!isEmpty(message_data.data.list_data)) {
                                            $scope[$scope.form_model]['candidate_expected_pay_details'] = message_data.data.list_data['candidate_expected_pay_details'];
                                            $scope[$scope.form_model][section.table_name] = message_data.data.list_data[section.table_name];
                                        }
                                    }
                                }
                            }
                            if (section.table_name == 'account_billing_addresses'|| section.table_name=='account_shipping_addresses'){
                                if(typeof message_data.data.list_data !== 'undefined') {
                                    if(!isEmpty(message_data.data.list_data)) {
                                        $scope[$scope.form_model][section.table_name] = message_data.data.list_data;
                                    }
                                }
                            }
    
                            if (section.table_name == 'requisition_pay_billing_details') {
                                if (selectedItem.mark_as_default == '1') {
                                    if (typeof message_data.data.list_data !== 'undefined') {
                                        if (!isEmpty(message_data.data.list_data)) {
                                            $scope[$scope.form_model]['requisition_pay_details'] = message_data.data.list_data['requisition_pay_details'];
                                            $scope[$scope.form_model][section.table_name] = message_data.data.list_data[section.table_name];
                                        }
                                    }
                                }
                            }
    
                            $scope.list_acti_data = [];
                            return;                           
                        }
                    }, function(error) {
    
                    });
                }
                else
                {
                    if (!$scope.isEmpty(selectedItem)) 
                    {
                        if(section.table_name == 'resumesform') {
                            if(selectedItem.mark_as_default=='1') {
                                if(!isEmpty($scope[$scope.form_model][section.table_name])) {
                                    angular.forEach($scope[$scope.form_model][section.table_name], function(value, key) {
                                        $scope[$scope.form_model][section.table_name][key]['mark_as_default'] = 0;
                                    });
                                }
                            } else {
                                if(isEmpty($scope[$scope.form_model][section.table_name])) {
                                    selectedItem.mark_as_default = 1;
                                }
                            }
                        }
                        if(section.table_name == 'account_billing_addresses' || section.table_name=='account_shipping_addresses') {
                            if(selectedItem.mark_as_default=='1') {
                                if(!isEmpty($scope[$scope.form_model][section.table_name])) {
                                    angular.forEach($scope[$scope.form_model][section.table_name], function(value, key) {
                                        $scope[$scope.form_model][section.table_name][key]['mark_as_default'] = 0;
                                    });
                                }
                            } else {
                                if(isEmpty($scope[$scope.form_model][section.table_name])) {
                                    selectedItem.mark_as_default = 1;
                                }
                            }
                        }
                        
                        if(section.table_name == 'job_pay_details' || section.table_name == 'job_pay_billing_details') {
                            if(selectedItem.mark_as_default == '1') {
                                var temp_base_data = $scope[$scope.form_model]['job_pay_details'];
                                $scope[$scope.form_model]['job_pay_details'] = selectedItem;
                                temp_base_data['mark_as_default'] = 0;
                                if(!isEmpty(temp_base_data['client_rate'])){
                                    var min = temp_base_data['client_rate']['min'];
                                    var max = temp_base_data['client_rate']['max'];
                                    temp_base_data['client_rate'] = min+'-'+max;
                                }
                                if(!isEmpty(temp_base_data['hire_rate'])){
                                    var min = temp_base_data['hire_rate']['min'];
                                    var max = temp_base_data['hire_rate']['max'];
                                    temp_base_data['hire_rate'] = min+'-'+max;
                                }
                                selectedItem = temp_base_data;
                            }
                        }
    
                        if(section.table_name == 'candidate_expected_pay_details' || section.table_name == 'candidate_expected_pay_billing_details') {
                            if(selectedItem.mark_as_default == '1') {
                                var temp_base_data = $scope[$scope.form_model]['candidate_expected_pay_details'];
                                $scope[$scope.form_model]['candidate_expected_pay_details'] = selectedItem;
                                temp_base_data['mark_as_default'] = 0;
                                if(!isEmpty(temp_base_data['expected_pay_rate'])){
                                    var min = temp_base_data['expected_pay_rate']['min'];
                                    var max = temp_base_data['expected_pay_rate']['max'];
                                    temp_base_data['expected_pay_rate'] = min+'-'+max;
                                }
                                selectedItem = temp_base_data;
                            }
                        }
    
                        if(section.table_name == 'requisition_pay_details'|| section.table_name == 'requisition_pay_billing_details') {
                            if(selectedItem.mark_as_default == '1') {
                                var temp_base_data = $scope[$scope.form_model]['requisition_pay_details'];
                                $scope[$scope.form_model]['requisition_pay_details'] = selectedItem;
                                temp_base_data['mark_as_default'] = 0;
                                if(!isEmpty(temp_base_data['hire_rate'])){
                                    var min = temp_base_data['hire_rate']['min'];
                                    var max = temp_base_data['hire_rate']['max'];
                                    temp_base_data['hire_rate'] = min+'-'+max;
                                }
                                selectedItem = temp_base_data;
                            }
                        }
    
                        $scope[$scope.form_model][section.table_name].push(selectedItem);
                    }    
                }
            }
            
    
        }, function() {
    
        });
    }


    $scope.addRevisePayment = function(section, Data) {
        var SecData = [];
        SecData['section_name'] = section.name;
        SecData['KeyIndex'] = section.table_name;
        SecData['SubForm'] = section['cnf_form_field'];
        SecData['ModelName'] = section.table_name;
        SecData['FormData'] = "";

        SecData['FormData'] = Data;
        
        if (typeof $scope.defined_disabled_fields != 'undefined') {
            SecData['defined_disabled_fields'] = $scope.defined_disabled_fields;
        }

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'CustomSubFormAssignmentReviseModal.html',
            controller: 'CustomSubFormModalInstanceCtrl',
            controllerAs: '$ctrl',
            backdrop: 'static',
            size:'md modal-dialog-aside w-50',
            windowClass: 'fixed-right',
            scope: $scope,
            resolve: {
                items: function() {
                    return SecData;
                },
                data_rest: function(){
                    return '';
                }
            }
        });

        modalInstance.result.then(function(selectedItem) 
        {

            if (!$scope[$scope.form_model][section.table_name]) {
                $scope[$scope.form_model][section.table_name] = [];
            }


            if(isNotEmpty($scope.RecordID))
            {
                formres = new FormData();
                $scope.sendData = {};

               
                $scope.sendData['assignment_payment_revises'] = selectedItem;
                formres.append("data", angular.toJson($scope.sendData));

                HrApiServices.postAttachment($scope.SUB_RECORD_SAVE_URL, formres)
                .then(function(success) {
                    message_data = success.data;
                    if (success.data.success) {
                        showAlertMessage(message_data);
                    } else {
                        showFormValidationErrorMessages(success);
                    }
                    
                    if($rootScope.masterLayout.user_details.is_admin_user)
                    {
                        //$scope.init();
                    } 
                    if (message_data.status == 1) {
                        recordID = message_data.data.recordID;

                        if (typeof selectedItem['id'] == 'undefined' || !selectedItem['id']) {
                            selectedItem['id'] = recordID;
                            $scope[$scope.form_model][section.table_name].push(selectedItem);
                        }
                        else 
                        {
                            rec_index = $scope[$scope.form_model][section.table_name].indexOf(Data);
                            $scope[$scope.form_model][section.table_name][rec_index] = selectedItem;
                        }

                        $scope.list_acti_data = [];
                        return;                           
                    }
                }, function(error) {

                });
            }
            else
            {
                if ((typeof selectedItem['id'] == 'undefined' || !selectedItem['id']) && isEmpty(Data))
                {
                    $scope[$scope.form_model][section.table_name].push(selectedItem);
                }
                else
                {
                    rec_index = $scope[$scope.form_model][section.table_name].indexOf(Data);
                    $scope[$scope.form_model][section.table_name][rec_index] = selectedItem;
                } 
            }
            

        }, function() {

        });
    }

    $scope.addAdditionalField = function(section, Data = '') {
        var show_auth_providers = false
        if($scope.show_auth_providers_for.includes(CURRENT_MODULE_ID)){
            show_auth_providers = true
        }
        var SecData = [];
        SecData['section_name'] = section.name;
        SecData['KeyIndex'] = section.table_name;
        SecData['SubForm'] = section['cnf_form_field'];
        SecData['ModelName'] = section.table_name;
        SecData['show_auth_providers'] = show_auth_providers;

        if (typeof $scope.defined_disabled_fields != 'undefined') {
            SecData['defined_disabled_fields'] = $scope.defined_disabled_fields;
        }

        SecData['FormData'] = angular.copy(Data);
        if(isNotEmpty(Data)){
            SecData['editIndex'] = $scope[$scope.form_model][section.table_name].indexOf(Data);
        }
        if (typeof $scope.defineFieldAttrObj != 'undefined' && (SecData['KeyIndex'] == 'assignment_overhead_costs' ||  SecData['KeyIndex'] == 'assignment_additional_pay_information')) {
            SecData['defineFieldAttrObj'] = $scope.defineFieldAttrObj;
            SecData['billing_details'] = $scope[$scope.form_model]['assignment_billing_information'] ? $scope[$scope.form_model]['assignment_billing_information'] : null;
            SecData['assignments'] = $scope[$scope.form_model]['assignments'] ? $scope[$scope.form_model]['assignments'] : null;
        }

        if (SecData['FormData'] && SecData['KeyIndex'] == 'employee_payment_revises') {
            SecData['defineFieldAttrObj'] = $scope.defineFieldAttrObj;
            SecData['FormData']['salary'] = (SecData['FormData']['salary']) ? roundToFixedDecimals(SecData['FormData']['salary']) : 0;
            SecData['FormData']['base_pay'] = (SecData['FormData']['base_pay']) ? roundToFixedDecimals(SecData['FormData']['base_pay']) : 0;
            SecData['FormData']['base_line_pay'] = (SecData['FormData']['base_line_pay']) ? roundToFixedDecimals(SecData['FormData']['base_line_pay']) : 0;
            SecData['FormData']['over_time_pay'] = (SecData['FormData']['over_time_pay']) ? roundToFixedDecimals(SecData['FormData']['over_time_pay']) : 0;
        }
        if (SecData['FormData'] && SecData['KeyIndex'] == 'opportunity_splits') {
            SecData['defineFieldAttrObj'] = $scope.defineFieldAttrObj;
            SecData['FormData']['split_value'] = (SecData['FormData']['split_value']) ? roundToFixedDecimals(SecData['FormData']['split_value']) : 0;
            SecData['FormData']['split_amount'] = (SecData['FormData']['split_amount']) ? roundToFixedDecimals(SecData['FormData']['split_amount']) : 0;
        }

        // console.log(SecData);
        
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'CustomSubFormModal.html',
            controller: 'CustomSubFormModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: 'xl modal-dialog-aside w-50',
            scope: $scope,
            resolve: {
                items: function() {
                    return SecData;
                },
                data_rest: function(){
                    return '';
                }
            }
        });
        modalInstance.result.then(function(selectedItem) {
            existedRequestDocuments = {};
            if(selectedItem.hasOwnProperty('existedRequestDocuments')) {
                existedRequestDocuments = selectedItem['existedRequestDocuments'];
                delete selectedItem.existedRequestDocuments;
            }
            if (!$scope[$scope.form_model][section.table_name]) {
                $scope[$scope.form_model][section.table_name] = [];
            }

            if(isNotEmpty($scope.RecordID) && !$scope.from_can_view)
            {
                formres = new FormData();
                $scope.sendData = {};

                if (selectedItem.attachment_name) {
                    angular.forEach(selectedItem.attachment_name, function(value, key) {
                        formres.append('document_file', value);
                    });
                    delete selectedItem['attachment_name'];
                }

                $scope.sendData[section.table_name] = selectedItem;
                formres.append("data", angular.toJson($scope.sendData));

                HrApiServices.postAttachment($scope.SUB_RECORD_SAVE_URL, formres)
                .then(function(success) {
                    message_data = success.data;
                    if (success.data.success) {
                        showAlertMessage(message_data);
                    } else {
                        showFormValidationErrorMessages(success);
                    }
                    
                    if($rootScope.masterLayout.user_details.is_admin_user)
                    {
                        //$scope.init();
                    } 
                    if (message_data.status == 1) {  
                    /*
                    displaying accountprimary contact after adding a new contact as a primary contact -Abdul(10-01-2020)
                    */                
                        if (section.table_name=='account_contacts') {
                            $scope.getAccountPrimaryContactDetails();
                        }                       
                        recordID = message_data.data.recordID;
                        
                        if(typeof message_data.data.candidate_id !== 'undefined') candidate_id = message_data.data.candidate_id;
                        else if(typeof message_data.candidate_id !== 'undefined') candidate_id = message_data.candidate_id;
                        else candidate_id = '';
                        if(candidate_id) selectedItem['candidate_id'] = candidate_id;
                        
                        if (typeof selectedItem['id'] == 'undefined' || !selectedItem['id']) {
                            selectedItem['id'] = recordID;
                            $scope[$scope.form_model][section.table_name].push(selectedItem);
                        }
                        else 
                        {
                            rec_index = $scope[$scope.form_model][section.table_name].indexOf(Data);
                            $scope[$scope.form_model][section.table_name][rec_index] = selectedItem;
                            if(section.table_name == 'employee_payment_revises' && typeof message_data.data.record_data !== 'undefined' && isNotEmpty(message_data.data.record_data)) {
                                $scope[$scope.form_model][section.table_name][rec_index]['deductions'] = message_data.data.record_data;
                            }                            
                        }
                        $scope.list_acti_data = [];

                        if(section.table_name == 'resumesform') {
                            if(typeof message_data.data.list_data !== 'undefined') {
                                if(!isEmpty(message_data.data.list_data)) {
                                    $scope[$scope.form_model][section.table_name] = message_data.data.list_data;
                                }
                            }
                        }
                        if(section.table_name == 'account_billing_addresses' || section.table_name == 'account_shipping_addresses') {
                            if(typeof message_data.data.list_data !== 'undefined') {
                                if(!isEmpty(message_data.data.list_data)) {
                                    $scope[$scope.form_model][section.table_name] = message_data.data.list_data;
                                }
                            }
                        }

                        if (section.table_name == 'job_pay_billing_details') {
                            if (selectedItem.mark_as_default == '1') {
                                if (typeof message_data.data.list_data !== 'undefined') {
                                    if (!isEmpty(message_data.data.list_data)) {
                                        $scope[$scope.form_model]['job_pay_details'] = message_data.data.list_data['job_pay_details'];
                                        $scope[$scope.form_model][section.table_name] = message_data.data.list_data[section.table_name];
                                    }
                                }
                            }
                        }

                        if (section.table_name == 'requisition_pay_billing_details') {
                            if (selectedItem.mark_as_default == '1') {
                                if (typeof message_data.data.list_data !== 'undefined') {
                                    if (!isEmpty(message_data.data.list_data)) {
                                        $scope[$scope.form_model]['requisition_pay_details'] = message_data.data.list_data['requisition_pay_details'];
                                        $scope[$scope.form_model][section.table_name] = message_data.data.list_data[section.table_name];
                                    }
                                }
                            }
                        }

                        if (section.table_name == 'candidate_expected_pay_billing_details') {
                            if (selectedItem.mark_as_default == '1') {
                                if (typeof message_data.data.list_data !== 'undefined') {
                                    if (!isEmpty(message_data.data.list_data)) {
                                        $scope[$scope.form_model]['candidate_expected_pay_details'] = message_data.data.list_data['candidate_expected_pay_details'];
                                        $scope[$scope.form_model][section.table_name] = message_data.data.list_data[section.table_name];
                                    }
                                }
                            }
                        }

                        

                        return;                           
                    }
                }, function(error) {

                });
            }
            else
            {                
                if(section.table_name == 'requisition_pay_details' || section.table_name == 'requisition_pay_billing_details') {
                    if(selectedItem.mark_as_default == '1') {
                        var temp_base_data = $scope[$scope.form_model]['requisition_pay_details'];
                        $scope[$scope.form_model]['requisition_pay_details'] = selectedItem;
                        temp_base_data['mark_as_default'] = 0;
                        if(!isEmpty(temp_base_data['hire_rate'])){
                            var min = temp_base_data['hire_rate']['min'];
                            var max = temp_base_data['hire_rate']['max'];
                            temp_base_data['hire_rate'] = min+'-'+max;
                        }
                        selectedItem = temp_base_data;
                    }
                }

                if(section.table_name == 'job_pay_details' || section.table_name == 'job_pay_billing_details') {
                    if(selectedItem.mark_as_default == '1') {
                        var temp_base_data = $scope[$scope.form_model]['job_pay_details'];
                        $scope[$scope.form_model]['job_pay_details'] = selectedItem;
                        temp_base_data['mark_as_default'] = 0;
                        if(!isEmpty(temp_base_data['client_rate'])){
                            var min = temp_base_data['client_rate']['min'];
                            var max = temp_base_data['client_rate']['max'];
                            temp_base_data['client_rate'] = min+'-'+max;
                        }
                        if(!isEmpty(temp_base_data['hire_rate'])){
                            var min = temp_base_data['hire_rate']['min'];
                            var max = temp_base_data['hire_rate']['max'];
                            temp_base_data['hire_rate'] = min+'-'+max;
                        }
                        selectedItem = temp_base_data;
                    }
                }

                if(section.table_name == 'candidate_expected_pay_details' || section.table_name == 'candidate_expected_pay_billing_details') {
                    if(selectedItem.mark_as_default == '1') {
                        var temp_base_data = $scope[$scope.form_model]['candidate_expected_pay_details'];
                        $scope[$scope.form_model]['candidate_expected_pay_details'] = selectedItem;
                        temp_base_data['mark_as_default'] = 0;
                        if(!isEmpty(temp_base_data['expected_pay_rate'])){
                            var min = temp_base_data['expected_pay_rate']['min'];
                            var max = temp_base_data['expected_pay_rate']['max'];
                            temp_base_data['expected_pay_rate'] = min+'-'+max;
                        }
                        selectedItem = temp_base_data;
                    }
                }

                if(isNotEmpty(existedRequestDocuments)){
                    angular.forEach(existedRequestDocuments,function(val,key){
                        $scope[$scope.form_model][section.table_name][key]['status'] = val;
                        delete $scope[$scope.form_model][section.table_name][key]['list_key'];
                    });
                }

                if ((typeof selectedItem['id'] == 'undefined' || !selectedItem['id']) && isEmpty(Data))
                {
                    $scope[$scope.form_model][section.table_name].push(selectedItem);
                }
                else
                {
                    rec_index = $scope[$scope.form_model][section.table_name].indexOf(Data);
                    $scope[$scope.form_model][section.table_name][rec_index] = selectedItem;
                }
            }
        }, function() {

        });
    }

    $scope.getRecruiterDetails = function (id) {
        var postData = {};
        postData['form_slug'] = 'add_job';
        postData['module_id'] = 1;
        postData['id'] = id
        HireApiServices.post('jobs/getRecruiterDetails', postData, true)
            .then(function success(response) {
                var SecData = [];
                SecData['section_name'] = 'Edit Recruitment Team';
                SecData['KeyIndex'] = 'jobs';
                SecData['SubForm'] = response.data.data['form_section_fields']['cnf_form_section'][0]['cnf_form_field'];
                SecData['ModelName'] = 'jobs';
                SecData['FormData'] = response.data.data['arrListDetails'];
                $scope.add_more_form_name = 'jobs_recruitment_details';
                $scope.add_more_form_model = 'JobRecruitmentMultiSectionData';
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'CustomSubFormModal.html',
                    controller: 'CustomSubFormModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    // size: 'lg extra_large',
                    windowClass: 'fixed-right',
                    size: 'md modal-dialog-aside w-50',
                    scope: $scope,
                    resolve: {
                        items: function () {
                            return SecData;
                        },
                        data_rest: function(){
                            return '';
                        }
                    }
                });
            });
    }

    $scope.configureCampaignFields = function(id, title='') {
      post_data = {};
      post_data['id'] = id;
      post_data['form_slug'] = "add_job";
      post_data['module_id'] = 1;

      HireApiServices.post('jobs/getCampaignFieldsDetails', post_data, true)
            .then(function success(response) {
              var SecData = [];
              SecData['KeyIndex'] = 'jobs';
              SecData['SubForm'] = response.data.data['form_section_fields']['cnf_form_section'][0]['cnf_form_field'];
              SecData['FormData'] = response.data.data['arrListDetails'];
              SecData['job_title'] = title;
              $scope.add_more_form_name = 'edit_job_campaign_fields';
              $scope.add_more_form_model = 'createJobData';

              var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'editCampaignFields.html',
              controller: 'CustomSubFormModalInstanceCtrl',
              controllerAs: '$ctrl',
              windowClass: 'fixed-right',
              size: 'md modal-dialog-aside w-50',
              scope: $scope,
              resolve: {
                  items: function () {
                      return SecData;
                  },
                  data_rest: function () {
                      return '';
                  },
              }
          });
            
      });
    }

    $scope.DeleteSubRecord = function(section, field) {
        fields = $scope[$scope.form_model][section.table_name];
        if (section.table_name == 'job_pay_billing_details' && field['id']) {
            var postData = {};
            postData['id'] = field['id'];
            HireApiServices.post('applications/checkJobPaySubmissions', postData, true)
                .then(function success(response) {
                    response = response.data;
                    if (!isEmpty(response.data)) {
                        ConfirmAlert.swal({
                            title: "Are you sure?",
                            text: "Selected billing details are mapped with submission record(s).\nPlease map another billing details with the submission to complete delete action.",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Proceed",
                            cancelButtonText: "Cancel",
                        }, function (isConfirm) {
                            if (isConfirm) {
                                HrApiServices.post($scope.SUB_RECORD_DELETE_URL + section.table_name, field)
                                    .then(function (success) {
                                        message_data = success.data;
                                        showAlertMessage(message_data);
                                        if ($rootScope.masterLayout.user_details.is_admin) {
                                            if (typeof $scope.init === 'function') {
                                                $scope.init();
                                                //console.log($scope.list_acti_data);
                                            }
                                        }
                                        if (message_data.status == 1) {
                                            fields.splice(fields.indexOf(field), 1);
                                            $scope.list_acti_data = [];
                                        }
                                    }, function (error) {

                                    });
                            }
                        });
                    }
                });
                return;
        }
        if(section.table_name == 'assignment_po_informations' && !isEmpty(field['id']) && !isEmpty($scope[$scope.form_model].assignment_invoice_information) && !isEmpty($scope[$scope.form_model].assignment_invoice_information.include_po_in_invoice) && $scope[$scope.form_model].assignment_invoice_information.include_po_in_invoice != 'No'){
            let idCountPo = 0;
            $scope[$scope.form_model][section.table_name].forEach(item => {
                if (item.hasOwnProperty('id')) {
                    idCountPo++;
                }
            });
            if(idCountPo <=1){
                showAlertMessage({
                    status: 0,
                    message: 'Please Add Purchase Order Information section else Uncheck Show PO Number Box.'
                });
                return false;
            }
        }
        ConfirmAlert.swal({
            title: "Are you sure?",
            text: "You want to delete this record",
            //type: "warning",
            imageUrl: $scope.alertdeleteimage,  
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }, function(isConfirm) {
            if (isConfirm) {
                if (field['id']) {
                    HrApiServices.post($scope.SUB_RECORD_DELETE_URL+section.table_name, field)
                    .then(function(success) {
                        message_data = success.data;
                        showAlertMessage(message_data);
                        if($rootScope.masterLayout.user_details.is_admin)
                        {
                            if (typeof $scope.init === 'function') {
                                $scope.init();
                                //console.log($scope.list_acti_data);
                            } 
                        }                          
                        if (message_data.status == 1) {
                            fields.splice(fields.indexOf(field), 1);
                            // Deleting ids from Selected List if it exists for compare option

                            if(isNotEmpty($scope.compareDocumentsModel) && $scope.compareDocumentsModel[field['id']]){
                                delete $scope.compareDocumentsModel[field['id']];
                            }
                            if(isNotEmpty($scope.compareDocumentsModelIDS) && $scope.compareDocumentsModelIDS.indexOf(field['id'].toString()) > -1){
                                $scope.compareDocumentsModelIDS.splice($scope.compareDocumentsModelIDS.indexOf(field['id'].toString()), 1);
                            }
                            
                            /*
                            displaying account primary contact tab after deleting a primary contact -Abdul(10-01-2020)
                            */
                            if(section.table_name=='account_contacts')
                            {
                                $scope.getAccountPrimaryContactDetails();
                            }
                            $scope.list_acti_data = [];
                        }
                    }, function(error) {

                    });
                }
                else{
                    fields.splice(fields.indexOf(field), 1);
                    message_data = {'message' : 'Record Deleted Successfully','status' : 1 };
                    showAlertMessage(message_data);
                }
            } else {

            }
        });
    }

    $scope.isEmpty = function(obj) {
        for (var i in obj)
            if (obj.hasOwnProperty(i))
                return false;
        return true;
    };

    
    $scope.isVisibleFieldForMultiSection = function(field)
    {
        var allowed_fields = [
            'emergency_email', 'emergency_phone', 'education_institute_name', 'education_degree',
            'education_specialization','last_name','user_dependants_visa_type',
            'user_dependants_last_name', 'city', 'contract_name', 'contract_start_date', 'status','country',
            'street','state','emergency_contact_name','original_name','aggregate','expiry_date','client_rate',
            'job_type','client_contract_period','contract_period', 'hire_rate','pay_type','pay_amount','pay_value','pay_mode','additional_pay_type','overhead_cost_type', 'amount','fixed_per_period','effective_until','effective_date','percentage','percentage_on','rate_type','po_number','po_value'
        ];

        if(field.related_table=="job_pay_billing_details" || field.related_table=="requisition_pay_details"){
            if(isNotEmpty(field.field_security) && isNotEmpty(field.field_security[0]) && field.field_security[0].access != 'none') {
                return true;
            } else {
                return false;
            }
        }

        if(field.related_table=='candidate_education_details' && (field.field_name=='start_date' || field.field_name=='end_date')) {
            return true;   
        }

        if(field.related_table=='resumesform' && (field.field_name=='created_at')) {
            return true;   
        }

        if(field.related_table=='candidate_work_details' && (field.field_name=='work_start_date' || field.field_name=='work_end_date' || field.field_name=='work_city' || field.field_name=='work_country' || field.field_name=='work_state')) {
            return true;   
        }

        if(field.related_table=='account_billing_addresses' && (field.field_name=='name' || field.field_name=='gst')) {
            return true;   
        }

        if(field.related_table=="employee_payment_revises"){
            if(isNotEmpty(field.field_security) && isNotEmpty(field.field_security[0]) && field.field_security[0].access != 'none') {
                return true;
            } else {
                return false;
            }
        }

        if(field.related_table=='opportunity_splits') {
            if(isNotEmpty(field.field_security) && isNotEmpty(field.field_security[0]) && field.field_security[0].access != 'none') {
                return true;
            } else {
                return false;
            } 
        }
        if(field.is_visible == 1 && field.is_required == 1)
        {
            return true;
        }

        if(allowed_fields.indexOf(field.field_name) != -1)
        {
            return true;
        }

        return false;
    }

    $scope.preview = function(record_id, table_name)
    {
        if(table_name == 'watermark_resumesform') {
            $scope.filePreview.show_watermark_settings = true;
        } else {
            $scope.filePreview.show_watermark_settings = false;
        }
        
        HrApiServices.get('getPreviewUrl', {'record_id' : record_id, 'table_name' : table_name})
        .then(function(success) {
            if($scope.filePreview.show_watermark_settings) {
                var watermark_settings_data = success.data.watermark_settings_data;
                watermark_settings_data['record_id'] = record_id;
                watermark_settings_data['url'] = success.data.url;
                watermark_settings_data['download_name'] = success.data.download_name;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'FilePreviewPopup.html',
                    controller: 'DocWaterMarkingController',
                    size:'xxl modal-dialog-aside',
                    windowClass: 'fixed-right',
                    resolve: {
                        pageOnLoadData: function() {
                            return watermark_settings_data;
                        }
                    }
                });
                modalInstance.result.then(function(selectedItem) {
                
                }, function() {
                });
            } else {
                $scope.filePreview.open = true;
                if(success.data.is_image)
                {
                    $scope.filePreview.imagePreviewIframe = "<img src='"+ success.data.url +"'>";
                } 
                else 
                {
                    //iframe = "<iframe width='100%' height='600px' src='https://docs.google.com/gview?url="+success.data.url+"&embedded=true'></iframe>";

                    iframe = "<iframe width='100%' height='600px' src='"+success.data.url+"'></iframe>";

                    $scope.filePreview.imagePreviewIframe = $sce.trustAsHtml(iframe);
                }   
            }
        }, function(error) {

        });
    }

    $scope.isSectionHasRecords = function(section)
    {
        if(isNotEmpty($scope[$scope.form_model][section]))
        {
            return true;
        }

        return false;
    }

    $scope.getSectionFields = function(section)
    {
        if(isNotEmpty(section) &&  isNotEmpty(section['cnf_form_field']))
        {
            return section['cnf_form_field'];
        }
        return [];
    }

    $scope.getSectionData = function(section)
    {

        if(isNotEmpty(section) && isNotEmpty($scope[$scope.form_model][section.table_name]))
        {
            return $scope[$scope.form_model][section.table_name];
        }
        return [];

    }


    $scope.getSectionWiseData = function(section)
    {
        data = {};
        angular.forEach(section['cnf_form_field'], function(value, key) {
            data[value.field_name] = $scope[$scope.form_model][value.related_table][value.field_name];
        });

        return data;
    }

    $scope.downloadFile = function(table, id,field = '') {
        if(!isEmpty(field)){
            if(field.field_name =='po_original_name'){
                table = table+'_po';
            }
        }
        var url = '';
        if($scope.download_url == 'pool_portal/DownloadCandidate' && isNotEmpty($rootScope.masterLayout.company_details.id))
        {
            url = WEB_API_URL+$scope.download_url+'/'+table+'/'+id+'/'+$rootScope.masterLayout.company_details.id;
        }else{
            url = WEB_API_URL+$scope.download_url+'/'+table+'/'+id;
        }
        downloadAttachments(url)   
    }

    $scope.previewFile = function(table, id,field = '') {
        var params = {
            'field_name' : field.field_name,
            'table_name' : field.related_table,
            'record_id' : $scope[$scope.form_model][field.related_table]['id'],
        };

        HireApiServices.get('getPreviewUrl', params, true)
        .then(function success(success){
            if(success.data.status) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'FilePreviewPopup.html',
                    controller: 'filePreviewPopupCtrl',
                    size:'xxl modal-dialog-aside',
                    windowClass: 'fixed-right',
                    resolve: {
                        items: function () {
                            return success;
                        },
                        field: function () {
                            return field;
                        },
                        form_data: function () {
                            return $scope[$scope.form_model];
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                }, function () {

                });
            } else {
                showAlertMessage(success.data);
            }
        },function (error){ 
        });  
    }
    
    $scope.showOriginalNameField = {};
    $scope.originalName = {};
    $scope.editOriginalName = function(field,model_name,bulk_form_id){
        $scope.showOriginalNameField[bulk_form_id] = true;
        var lastIndxDot = model_name.lastIndexOf('.');
        var old_original_name = model_name.substring(0, lastIndxDot);
        $scope.originalName.new_name = old_original_name;
    }
    $scope.DeleteAttachment = function(field,model_name,bulk_form_id){
        $scope[$scope.form_model][field.related_table][field.field_name] = '';
    }
    $scope.saveOriginalName = function(field,model_name,bulk_form_id){
        if(isEmpty($scope.originalName.new_name)){
            showAlertMessage({
                status : 0,
                message : "Attachment name should not be empty"
            });
            return false;
        }
        $scope.showOriginalNameField = {};
        var extension = model_name.substring(model_name.lastIndexOf('.'));
        if(typeof $scope[$scope.form_model][field.related_table] !=='undefined'){
            if(isNotEmpty($scope[$scope.form_model][field.related_table][field.field_name]['original_name'])){
                // this one is for added attachmnet
                $scope[$scope.form_model][field.related_table][field.field_name]['original_name'] = $scope.originalName.new_name+extension;
            }else{
                // this one is for edit attachment
                $scope[$scope.form_model][field.related_table][field.field_name] = $scope.originalName.new_name+extension;
            }
        }
        else{
            $scope[$scope.form_model][bulk_form_id][field.related_table][field.field_name] = $scope.originalName.new_name+extension;
        }
    }      

    $scope.form_file_inputs = {};
    
    
    $scope.fileModified = false;
    $scope.uploadedFile = function(element,field,bulk_form_id='') {
        $scope.fileModified = true;
        $scope.$apply(function($scope) {
            $scope.files = element.files;
            if (!checkStringLength(element.files[0].name)) {            
                $scope.files = element.files; 
                element.value = null;
                showAlertMessage({
                    status : 0,
                    message : CONFIG_MESSAGES.file_name_limit_exceeds
                });
                return false;
            }  
            if(!isValidExtension(element.files[0].name)){
                element.value = null;
                showAlertMessage({
                    status : 0,
                    message : CONFIG_MESSAGES.invalid_file_extension
                });
                return false;    
            } 

            if(element.files[0].size > TOTAL_FILE_SIZE_LIMIT){
                element.value = null;
                showAlertMessage({
                    status : 0,
                    message : CONFIG_MESSAGES.file_size_limit_exceeded
                });
                return false;
            }

            if (typeof $scope.form_file_inputs === 'undefined') {
                $scope.form_file_inputs = {};
            }
            if($scope.isPipelineBulkForm || $scope.isSubmissionBulkForm){
                $scope.form_file_inputs[bulk_form_id] = {};  
                name = element.name;
                $scope.form_file_inputs[bulk_form_id][field.field_name] = $scope.files;
                $scope[$scope.form_model][bulk_form_id][field.related_table][field.field_name] = {};
                $scope[$scope.form_model][bulk_form_id][field.related_table][field.field_name]['original_name'] = $scope.files[0].name;
                $scope[$scope.form_model][bulk_form_id][field.related_table][field.field_name]['attachment_name'] = '';
                $scope[$scope.form_model][bulk_form_id][field.related_table]['is_resume'] =0;
            }else{
                name = element.name;
                $scope.form_file_inputs[field.field_name] = $scope.files;
                $scope[$scope.form_model][field.related_table][field.field_name] = {};
                $scope[$scope.form_model][field.related_table][field.field_name]['original_name'] = $scope.files[0].name;
                $scope[$scope.form_model][field.related_table][field.field_name]['attachment_name'] = '';
                $scope[$scope.form_model][field.related_table]['is_resume'] =0;
            }
            //console.log($scope[$scope.form_model][field.related_table][field.field_name]);
        });
    }

    $scope.passwordConfirmation = function(id, type, field_name, field_type) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'PwdConfirmationModal.html',
            controller: 'PwdConfirmationModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: 'sm extra_large',
            resolve: {
                items: function () {
                    return {'id':id, 'type':type, 'field_name':field_name, 'field_type':field_type};
                },
            }
        });

        modalInstance.result.then(function (response_data) {
            console.log(response_data);
            if(type == 'candidate') var table_name = 'candidates';
            if(type == 'accounts') var table_name = type;
            temp_field_name = field_name+'_decrypted';
            $scope.customdata[table_name][temp_field_name] = response_data.field_value.toString();
            $scope.customdata[table_name][field_name] = response_data.field_value.toString();
        }, function () {

        });
    }

    $scope.checkForResumeCompareOption = function(section) {
        if(typeof $scope.pageOnLoadData !== 'undefined' && typeof $scope.pageOnLoadData.candidate !== 'undefined') {
            if(!$scope.isEmpty($scope.pageOnLoadData.candidate.resumesform) && $scope.compareDocumentsModelIDS.length==2) {
                return true;
            } else {
                return false;
            }
        }
    }

    $scope.collapseSection = function (id,type) {
        //$scope.masterLayout['user_sections'] = [];
        postData = {};
        postData['section_id']=id;
        postData['is_collapse']=type;

        HrApiServices.post('saveUserSectionCollapse', postData, true).
            then(function (response) {
                var data = response.data;
                if(data.status==0){
                    showAlertMessage({
                        status : 0,
                        message : data.message
                    });
                }
                if(type==0){
                    $rootScope.masterLayout['user_sections'][id] = id;
                }else{
                    $rootScope.masterLayout['user_sections'][id] = '';
                }
            });
    }

    $scope.fetchLinkedinProfileInfo = function(related_table) {
        record_data = $scope.customdata[related_table];

        if($rootScope.isUnsubscribedAddon('linkedin_credits')) {
            $rootScope.showUnSubscribedPopup();return;
        }

        if(related_table=='candidates') {
            url = 'candidates/getLinkedinProfileDetails';
        } else if(related_table=='account_contacts') {
            url = 'accounts/contacts/getLinkedinProfileDetails';
        } else if(related_table=='leads') {
            url = 'leads/getLinkedinProfileDetails';
        } 

        postData = {};
        postData['profile_url'] = record_data.linkedin_url;
        postData['record_id'] = record_data.id;

        HireApiServices.post(url, postData)
        .then(function(response) {
            response_data = response.data;
            if(response_data.status == 1)
            {
                showAlertMessage(response_data);
                $state.reload();

                /*if(related_table=='candidates') {
                    record_data_updated = response_data.data.updated_data;
                    if(record_data_updated.email) $scope.customdata[related_table]['email'] = record_data_updated.email;
                    if(record_data_updated.phone) $scope.customdata[related_table]['phone'] = record_data_updated.phone;
                    if(record_data_updated.mobile) $scope.customdata[related_table]['mobile'] = record_data_updated.mobile;
                    if(record_data_updated.alternate_email) $scope.customdata[related_table]['alternate_email'] = record_data_updated.alternate_email;

                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'LinkedinSavedContactInfo.html',
                        controller: 'LinkedinSavedContactInfoCtrl',
                        controllerAs: '$ctrl',
                        size: 'lg extra_large',
                        //scope: $scope,
                        resolve: {
                            items: function () {
                                //return {'contact_info':response_data.data, 'resource_id':record_data.id};
                                return {'response_data':response_data.data, 'resource_id':record_data.id};
                            },
                        }
                    });
                    modalInstance.result.then(function (selectedItem) {
                        
                    }, function () {
                        
                    });
                } else {
                    $state.reload();
                }*/
            } else {
                showAlertMessage(response_data);
            }
        }, function(error) {
            showAlertMessage({'status':0, 'message':"{{trans('messages.invalid_operation')}}"});
        });
    }


    $scope.openEditSectionPopup = function(section) {
        Data = $scope.getSectionWiseData(section);

        var SecData = [];
        SecData['section_name'] = section.name;
        SecData['KeyIndex'] = section.table_name;
        SecData['SubForm'] = section['cnf_form_field'];
        SecData['ModelName'] = section.table_name;

        SecData['FormData'] = angular.copy(Data);


        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'CustomSubFormModal.html',
            controller: 'CustomSubFormModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: 'xl modal-dialog-aside w-50 w-50',
            WindowClass:'fixed-right',
            scope: $scope,
            resolve: {
                items: function() {
                    return SecData;
                },
                data_rest: function(){
                    return '';
                }
            }
        });
        modalInstance.result.then(function(selectedItem) {
            if (!$scope[$scope.form_model][section.table_name]) {
                $scope[$scope.form_model][section.table_name] = [];
            }

            if(isNotEmpty($scope.RecordID))
            {
                formres = new FormData();
                $scope.sendData = {};

                if (selectedItem.attachment_name) {
                    angular.forEach(selectedItem.attachment_name, function(value, key) {
                        formres.append('document_file', value);
                    });
                    delete selectedItem['attachment_name'];
                }

                $scope.sendData[section.id] = selectedItem;
                formres.append("data", angular.toJson($scope.sendData));

                HrApiServices.postAttachment($scope.SUB_RECORD_SAVE_URL, formres)
                .then(function(success) {
                    message_data = success.data;
                    showAlertMessage(message_data);
                    if($rootScope.masterLayout.user_details.is_admin_user)
                    {
                        //$scope.init();
                    } 
                    if (message_data.status == 1) {
                        $state.reload();
                    }
                }, function(error) {

                });
            }
        }, function() {

        });
    }
    $scope.validateURL = function(url){
        if (isEmpty(url)) {
            return url
        }
        if (url.match(/^http?:\/\//i) || url.match(/^https?:\/\//i)) {
            return url;
        }
        return url = 'http://' + url;
    }
});

angular.module('OorwinApp').controller('DocWaterMarkingController', function ($scope, $rootScope, $http, $uibModal, $location, $controller, HrApiServices, $state, pageOnLoadData, $uibModalInstance) {
    angular.extend(this, $controller('WaterMarkingController', { $scope: $scope, pageOnLoadData : pageOnLoadData }));

    $scope.closePopup = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

App.controller('CustomSubFormModalInstanceCtrl', function($scope, $uibModalInstance, items, $filter, $rootScope, $controller,$uibModal,HireApiServices,$state, data_rest, HrApiServices) 
{

    if(typeof $rootScope.customSelect !== 'undefined'){ 
        setTimeout(() => {
            $rootScope.customSelect(true);
        }, 1500);
    }
    
    angular.extend(this, $controller('CommonFormEventsCtrl', {$scope: $scope}));

    $scope.newField = items;
    $scope.parent_form_model = angular.copy($scope.form_model);

    if($scope.newField['ModelName'] == 'assignment_payment_revises' || $scope.newField['ModelName'] == 'assignment_overhead_costs' || $scope.newField['ModelName'] == 'assignment_po_informations' ||  $scope.newField['ModelName'] == 'assignment_additional_pay_information' ||  $scope.newField['ModelName'] == 'employee_payment_revises' ||  $scope.newField['ModelName'] == 'opportunity_splits') {
        $scope.allowZeroForDecimals = true;
    }
    $scope.outh_provider_modules = ['candidate_document_details','employee_documents']
    if ($scope.newField.show_auth_providers) {
        OAuthScopeArr ={createTemplateScope:undefined, createTemplateDocumentScope:undefined, addDocumentScope:undefined, editDocumentScope:undefined,  addDocumentInFormScope:$scope};
        angular.extend(this, $controller('oAuthCtrl', { $scope: $scope }));
    }
    $scope.CountryList = obj_countries_list;
    $scope.StatesList = obj_states_list;
    $scope.CountryStateList = obj_country_states;
    $scope.TimezonesCountryList = obj_timezones_country_list;

    var CURRENT_MODULE_ID = $scope.module_id;

    $scope.form_name = $scope.add_more_form_name;
    $scope.form_model = $scope.add_more_form_model;

    $scope.validation_errors = {};
    $scope.validation_errors[$scope.form_name] = {};

    $scope.error_div_cls = 0;
    $scope.datepickers = {};
    $scope[$scope.form_model] = {};

    $scope.defined_required_fields = [];
    if (typeof defined_required_fields != 'undefined') {
        $scope.defined_required_fields = defined_required_fields;
    }

    $scope.defined_disabled_fields = [];
    if (typeof items['defined_disabled_fields'] != 'undefined') {
        $scope.defined_disabled_fields = items['defined_disabled_fields'];
    }
    $scope.defineFieldAttrObj = [];
    if (typeof items['defineFieldAttrObj'] != 'undefined') {
        $scope.defineFieldAttrObj = items['defineFieldAttrObj'];
    }
    if($scope.form_name == 'edit_job_campaign_fields') {
        $scope.FormData = items.FormData;
        $scope.job_title = items.job_title;
    }

    $scope.MultiSectionField = [];
    $scope.multi_parse_section_data = [];
    if (isNotEmpty(data_rest)) {
        $scope.multi_parse_section_data = data_rest;
        angular.forEach($scope.multi_parse_section_data, function(val,key){
            $scope.MultiSectionField.push($scope.newField.SubForm);
        });
    }else{
        $scope.MultiSectionField[0] = $scope.newField.SubForm;
    }
    $scope.isMultiForm = 0;
    if (typeof items['isMultiForm'] != 'undefined') {
        $scope.isMultiForm = items['isMultiForm'];
        $scope[$scope.form_name] = {};
    }


    $scope.multiSubSectionField = [];
    $scope.multiSubSectionField['deductionsform'] = [];
    //$scope.multiSubSectionField['bonusform'] = [];

    $scope.isFieldVisible = function(field,bulk_form_id='') {
        return isVisibleFunc(field, $scope,bulk_form_id);
    }

    $scope.isConfigVisible = function(field)
    {
        return isConfigVisibleFunc(field, $scope);
    }

    
    $scope.KeyIndex = $scope.newField.KeyIndex;
    $scope.outh_provider_modules = ['candidate_document_details','employee_documents']
    if ($scope.outh_provider_modules.includes($scope.KeyIndex)) {
        OAuthScopeArr ={createTemplateScope:undefined, createTemplateDocumentScope:undefined, addDocumentScope:undefined, editDocumentScope:undefined,  addDocumentInFormScope:$scope};
        angular.extend(this, $controller('oAuthCtrl', { $scope: $scope }));
    }
    
    
    $scope.list_of_mult_sec_form_ids = {};
    $scope.addMultiFormSection = function(data, index=0){
        $scope.MultiSectionField.push($scope.newField.SubForm);
        // console.log($scope.MultiSectionField);
    }
    $scope.getTimeStampId = function()
    {
        return new Date().getTime();
    }

    $scope.addMultiSubFormSection = function(sectionKey){
        if($scope.multiSubSectionField[sectionKey].length > 4){
            showAlertMessage({
                status : 0,
                message : 'Maximum deduction should not be greathe than 5'
            });
            return false;
        }
        $scope.multiSubSectionField[sectionKey].push($scope.jsonAdditionSubFormFields['sections'][sectionKey]['cnf_form_field']);
    }

    $scope.RemoveMultiFormSection = function(datas, data,index){
        // console.log(index);
        // angular.forEach($scope[$scope.form_model],function(val,key)
        // {
        //      if(key > index)
        //      {

        //      }
        // });

        delete $scope[$scope.form_model][index];
        delete $scope[$scope.form_name]['form'][index];

        // delete $scope[$scope.form_name].form[index];
        datas.splice(datas.indexOf(data), 1);
        
    }

    $scope.removeMultiSubSection = function(datas,section_form_name,data,timestamp,index){
        delete $scope[$scope.form_model][timestamp];
        if(isNotEmpty(items['FormData']) && isNotEmpty(items['FormData']['deductions']) && isNotEmpty(items['FormData']['deductions'][index])){
           delete items['FormData']['deductions'][index];
        }
        delete datas[index];
    }

    if ($scope.KeyIndex == 'assignment_payment_revises' && isNotEmpty(items["FormData"])) {
        var decimals_arr = ['pay_rate', 'ot_pay_rate', 'bill_rate', 'ot_bill_rate'];
        decimals_arr.map(function(field) {
            if (isNotEmpty(items["FormData"][field])) {
                items["FormData"][field] = roundToFixedDecimals(items["FormData"][field]);
            }
        });
    }

    if (items.FormData) {
        data = angular.toJson(items.FormData);
        $scope[$scope.form_model][$scope.KeyIndex] = items.FormData;
        //console.log(typeof $scope[$scope.form_model][$scope.KeyIndex]['contact_owner']);
        if (isNotEmpty($scope[$scope.form_model][$scope.KeyIndex]['contact_owner']) && typeof $scope[$scope.form_model][$scope.KeyIndex]['contact_owner'] != 'string' ) {
            var arr = $scope[$scope.form_model][$scope.KeyIndex]['contact_owner'];
            angular.forEach(arr, function(k, v) {
                arr.push(arr[v]['id']);
            }); 
            $scope[$scope.form_model][$scope.KeyIndex]['contact_owner'] = arr;
        }
        else{
            $scope[$scope.form_model][$scope.KeyIndex]['contact_owner'] = $scope[$scope.form_model][$scope.KeyIndex]['contact_owner'];
        }

        if($scope.KeyIndex == 'employee_payment_revises') {
            if(isEmpty(items.FormData.deductions)) {
                //$scope.multiSubSectionField['deductionsform'][0] = $scope.jsonAdditionSubFormFields.sections.deductionsform.cnf_form_field;
                $scope.multiSubSectionField['deductionsform'] = [];
            }
            else{
                angular.forEach(items.FormData.deductions, function(val,key){
                    $scope.multiSubSectionField['deductionsform'].push($scope.jsonAdditionSubFormFields.sections.deductionsform.cnf_form_field);
                });
            }

            // if(isEmpty(items.FormData.bonuses)) {
            //     $scope.multiSubSectionField['bonusform'][0] = $scope.jsonAdditionSubFormFields.sections.bonusform.cnf_form_field;
            // }
            // else{
            //     angular.forEach(items.FormData.bonuses, function(val,key){
            //         $scope.multiSubSectionField['bonusform'].push($scope.jsonAdditionSubFormFields.sections.bonusform.cnf_form_field);
            //     });
            // }
        }
    } else {    

        if(!$scope.isMultiForm){
            $scope[$scope.form_model][$scope.KeyIndex] = {};

            if($scope.KeyIndex == 'account_contacts' && 
                typeof $rootScope.masterLayout != 'undefined')
            {
                $scope[$scope.form_model][$scope.KeyIndex]['contact_owner'] = [$rootScope.masterLayout.user_details.id];
                $scope[$scope.form_model][$scope.KeyIndex]['country'] = $rootScope.masterLayout.company_settings.country_id;
            }
            else if($scope.KeyIndex == 'assignment_documents')
            {
                $scope[$scope.form_model][$scope.KeyIndex]['status'] = 1;
            }
            else if($scope.KeyIndex == 'user_emergency_contacts' && 
                typeof $rootScope.masterLayout != 'undefined')
            {
                $scope[$scope.form_model][$scope.KeyIndex]['emergency_country'] = $rootScope.masterLayout.company_settings.country_id;
            }
            else if($scope.KeyIndex == 'user_emergency_contacts' && 
                typeof $rootScope.masterLayout == 'undefined') // this Else If block uses in profile update requests
            {
                $scope[$scope.form_model][$scope.KeyIndex]['emergency_country'] = $scope.country_id;
            }
            else if($scope.KeyIndex == 'account_documents' || $scope.KeyIndex == 'employee_documents' ||  $scope.KeyIndex == 'candidate_document_details'  || $scope.KeyIndex == 'project_documents')
            {
                $scope[$scope.form_model][$scope.KeyIndex]['status'] = 'active';
            }
            else if($scope.KeyIndex == 'account_billing_addresses' && 
                typeof $rootScope.masterLayout != 'undefined')
            {
                $scope[$scope.form_model][$scope.KeyIndex]['country'] = $rootScope.masterLayout.company_settings.country_id;
            }
            else if($scope.KeyIndex == 'account_shipping_addresses' && 
                typeof $rootScope.masterLayout != 'undefined')
            {
                $scope[$scope.form_model][$scope.KeyIndex]['country'] = $rootScope.masterLayout.company_settings.country_id;
            }
            else if($scope.KeyIndex == 'candidate_work_details' && 
                typeof $scope[$scope.form_model][$scope.KeyIndex]['id'] === 'undefined' && typeof $rootScope.masterLayout != 'undefined')
            {
                $scope[$scope.form_model][$scope.KeyIndex]['work_country'] = $rootScope.masterLayout.company_settings.country_id;
            }
            else if($scope.KeyIndex == 'resumesform') {
                $scope[$scope.form_model][$scope.KeyIndex]['mark_as_default'] = 1;
            }
            else if($scope.KeyIndex == 'assignment_payment_revises') {
                $scope[$scope.form_model][$scope.KeyIndex]['pay_type'] = 'hourly';
                $scope[$scope.form_model][$scope.KeyIndex]['bill_type'] = 'hourly';
            }
            else if($scope.KeyIndex == 'job_pay_billing_details') {   
                if (isNotEmpty($scope.default_job_pay_details)) {
                    $scope[$scope.form_model][$scope.KeyIndex] = angular.copy($scope.default_job_pay_details);
                }
            }else if($scope.KeyIndex == 'requisition_pay_billing_details') {   
                if (isNotEmpty($scope.default_requisition_pay_details)) {
                    $scope[$scope.form_model][$scope.KeyIndex] = angular.copy($scope.default_requisition_pay_details);
                }
            }
            else if($scope.KeyIndex == 'candidate_expected_pay_billing_details') {   
                if (isNotEmpty($scope.default_candidate_expected_pay_details)) {
                    $scope[$scope.form_model][$scope.KeyIndex] = angular.copy($scope.default_candidate_expected_pay_details);
                }
                console.log('1');
            }        
            else if($scope.KeyIndex == 'account_interview_address' && 
                typeof $rootScope.masterLayout != 'undefined')
            {
                $scope[$scope.form_model][$scope.KeyIndex]['country'] = $rootScope.masterLayout.company_settings.country_id;
                $scope[$scope.form_model][$scope.KeyIndex]['timezone'] = $rootScope.masterLayout.company_settings.timezone;
            }
        }

        if($scope.KeyIndex == 'employee_payment_revises') {
            $scope.multiSubSectionField['deductionsform'] = [];
            //$scope.multiSubSectionField['deductionsform'][0] = $scope.jsonAdditionSubFormFields.sections.deductionsform.cnf_form_field;
            //$scope.multiSubSectionField['bonusform'][0] = $scope.jsonAdditionSubFormFields.sections.bonusform.cnf_form_field;
        }
    }
    
    $scope.loadMultiData = function(timestamp, index){
        
        $scope.list_of_mult_sec_form_ids[timestamp] = timestamp;
        $scope[$scope.form_model][timestamp] = {};
        $scope[$scope.form_model][timestamp][$scope.KeyIndex] = {};
        if(isNotEmpty($scope.multi_parse_section_data[index])){
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]= $scope.multi_parse_section_data[index];
            if($scope.KeyIndex == 'candidate_work_details'){
                if(isNotEmpty($scope.multi_parse_section_data[index]['work_start_date'])){
                    var work_start_date = new Date($scope.multi_parse_section_data[index]['work_start_date']);
                    $scope[$scope.form_model][timestamp][$scope.KeyIndex]['work_start_date'] = work_start_date; 
                }
                if(isNotEmpty($scope.multi_parse_section_data[index]['work_start_date'])){
                    var work_end_date = new Date($scope.multi_parse_section_data[index]['work_end_date']);
                    $scope[$scope.form_model][timestamp][$scope.KeyIndex]['work_end_date'] = work_end_date;  
                } 
            }
            if($scope.KeyIndex == 'candidate_education_details'){
                if(isNotEmpty($scope.multi_parse_section_data[index]['start_date'])){
                    var start_date = new Date($scope.multi_parse_section_data[index]['start_date']);
                    $scope[$scope.form_model][timestamp][$scope.KeyIndex]['start_date'] = start_date; 
                }
                if(isNotEmpty($scope.multi_parse_section_data[index]['end_date'])){
                    var end_date = new Date($scope.multi_parse_section_data[index]['end_date']);
                    $scope[$scope.form_model][timestamp][$scope.KeyIndex]['end_date'] = end_date;  
                } 
            }

            if($scope.KeyIndex == 'resumesform'){
                if(typeof $scope.multi_parse_section_data[index]['original_name'] != 'undefined'){
                    $scope[$scope.form_model][timestamp][$scope.KeyIndex]['is_resume'] =0; 
                }
            }
        }
        
        if($scope.KeyIndex == 'account_contacts' && 
            typeof $rootScope.masterLayout != 'undefined')
        {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['contact_owner'] = [$rootScope.masterLayout.user_details.id];
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['country'] = $rootScope.masterLayout.company_settings.country_id;
        }
        else if($scope.KeyIndex == 'assignment_documents')
        {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['status'] = 1;
        }
        else if($scope.KeyIndex == 'user_emergency_contacts' && 
            typeof $rootScope.masterLayout != 'undefined')
        {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['emergency_country'] = $rootScope.masterLayout.company_settings.country_id;
        }
        else if($scope.KeyIndex == 'user_emergency_contacts' && 
            typeof $rootScope.masterLayout == 'undefined') // this Else If block uses in profile update requests
        {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['emergency_country'] = $scope.country_id;
        }
        else if($scope.KeyIndex == 'account_documents' || $scope.KeyIndex == 'employee_documents' ||  $scope.KeyIndex == 'candidate_document_details'  || $scope.KeyIndex == 'project_documents')
        {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['status'] = 'active';
        }
        else if($scope.KeyIndex == 'account_billing_addresses' && 
            typeof $rootScope.masterLayout != 'undefined')
        {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['country'] = $rootScope.masterLayout.company_settings.country_id;
        }
        else if($scope.KeyIndex == 'account_shipping_addresses' && 
            typeof $rootScope.masterLayout != 'undefined')
        {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['country'] = $rootScope.masterLayout.company_settings.country_id;
        }
        else if($scope.KeyIndex == 'candidate_work_details' && 
            typeof $scope[$scope.form_model][timestamp][$scope.KeyIndex]['id'] === 'undefined' && typeof $rootScope.masterLayout != 'undefined')
        {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['work_country'] = $rootScope.masterLayout.company_settings.country_id;
        }
        else if($scope.KeyIndex == 'resumesform') {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['mark_as_default'] = 0;
        }
        else if($scope.KeyIndex == 'assignment_payment_revises') {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['pay_type'] = 'hourly';
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['bill_type'] = 'hourly';
        }
        else if($scope.KeyIndex == 'job_pay_billing_details') {   
            if (isNotEmpty($scope.default_job_pay_details)) {
                $scope[$scope.form_model][timestamp][$scope.KeyIndex] = angular.copy($scope.default_job_pay_details);
            }
        }else if($scope.KeyIndex == 'requisition_pay_billing_details') {   
            if (isNotEmpty($scope.default_requisition_pay_details)) {
                $scope[$scope.form_model][timestamp][$scope.KeyIndex] = angular.copy($scope.default_requisition_pay_details);
            }
        }
        else if($scope.KeyIndex == 'candidate_expected_pay_billing_details') {   
            if (isNotEmpty($scope.default_candidate_expected_pay_details)) {
                console.log($scope[$scope.form_model]);
                $scope[$scope.form_model][timestamp][$scope.KeyIndex] = angular.copy($scope.default_candidate_expected_pay_details);
            }
        }        
        else if($scope.KeyIndex == 'account_interview_address' && 
            typeof $rootScope.masterLayout != 'undefined')
        {
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['country'] = $rootScope.masterLayout.company_settings.country_id;
            $scope[$scope.form_model][timestamp][$scope.KeyIndex]['timezone'] = $rootScope.masterLayout.company_settings.timezone;
        }
    }

    $scope.loadMultiSubFormData = function(timestamp, sectionkey,index){
        if(isEmpty($scope[$scope.form_model][timestamp])){
            $scope[$scope.form_model][timestamp] = {};
        }
        if(isNotEmpty(items.FormData) && isNotEmpty(items.FormData.deductions) && sectionkey == 'deductionsform'){
            if(typeof items.FormData.deductions[index] == 'undefined'){
                $scope[$scope.form_model][timestamp]['employee_payment_deductions'] = {};
                if(isNotEmpty($scope[$scope.form_model]['employee_payment_revises']) && isNotEmpty($scope[$scope.form_model]['employee_payment_revises']['salary_cycle'])){
                    $scope[$scope.form_model][timestamp]['employee_payment_deductions']['deduction_cycle'] = $scope[$scope.form_model]['employee_payment_revises']['salary_cycle']
                }
                return;
            }

            if(isNotEmpty(items.FormData.deductions[index]) && isNotEmpty(items.FormData.deductions[index]['effective_start_date'])){
                var deduction_effective_start_date = new Date(items.FormData.deductions[index]['effective_start_date']);
                items.FormData.deductions[index]['effective_start_date'] = deduction_effective_start_date; 
            }
            if(isNotEmpty(items.FormData.deductions[index]) && isNotEmpty(items.FormData.deductions[index]['percentage_amount'])){
                items.FormData.deductions[index]['percentage_amount'] = roundToFixedDecimals(items.FormData.deductions[index]['percentage_amount']);
            }
            if(isNotEmpty(items.FormData.deductions[index]) && isNotEmpty(items.FormData.deductions[index]['deduction_amount'])){
                items.FormData.deductions[index]['deduction_amount'] = roundToFixedDecimals(items.FormData.deductions[index]['deduction_amount']);
            }
            if(isNotEmpty(items.FormData.deductions[index]) && isNotEmpty(items.FormData.deductions[index]['deduction_category'])){
                items.FormData.deductions[index]['deduction_category'] = items.FormData.deductions[index]['deduction_category'].toString();
            }

            // if(isNotEmpty(items.FormData.deductions[index]['effective_end_date'])){
            //     var deduction_effective_end_date = new Date(items.FormData.deductions[index]['effective_end_date']);
            //     items.FormData.deductions[index]['effective_end_date'] = deduction_effective_end_date; 
            // }
            $scope[$scope.form_model][timestamp]['employee_payment_deductions'] = items.FormData.deductions[index];
            if(isNotEmpty($scope[$scope.form_model]['employee_payment_revises']) && isNotEmpty($scope[$scope.form_model]['employee_payment_revises']['salary_cycle'])){
                $scope[$scope.form_model][timestamp]['employee_payment_deductions']['deduction_cycle'] = $scope[$scope.form_model]['employee_payment_revises']['salary_cycle']
            }         
        }

        else if(!$scope[$scope.form_model][timestamp].hasOwnProperty("employee_payment_deductions") && sectionkey == 'deductionsform'){
            $scope[$scope.form_model][timestamp]['employee_payment_deductions'] = {};
            if(isNotEmpty($scope[$scope.form_model]['employee_payment_revises']) && isNotEmpty($scope[$scope.form_model]['employee_payment_revises']['salary_cycle'])){
                $scope[$scope.form_model][timestamp]['employee_payment_deductions']['deduction_cycle'] = $scope[$scope.form_model]['employee_payment_revises']['salary_cycle']
            }
        }

        // if(isNotEmpty(items.FormData) && isNotEmpty(items.FormData.bonuses[index]) && sectionkey == 'bonusform'){
        //     if(isNotEmpty(items.FormData.bonuses[index]['effective_start_date'])){
        //         var bonus_effective_start_date = new Date(items.FormData.bonuses[index]['effective_start_date']);
        //         items.FormData.bonuses[index]['effective_start_date'] = bonus_effective_start_date; 
        //     }
        //     if(isNotEmpty(items.FormData.bonuses[index]['effective_end_date'])){
        //         var bonus_effective_end_date = new Date(items.FormData.bonuses[index]['effective_end_date']);
        //         items.FormData.bonuses[index]['effective_end_date'] = bonus_effective_end_date; 
        //     }
        //     items.FormData.bonuses[index]['bonus_category'] = items.FormData.bonuses[index]['bonus_category'].toString();
        //     $scope[$scope.form_model][timestamp]['employee_payment_bonuses'] = items.FormData.bonuses[index];            
        // }
        // else if(!$scope[$scope.form_model][timestamp].hasOwnProperty("employee_payment_bonuses") && sectionkey == 'bonusform'){
        //     $scope[$scope.form_model][timestamp]['employee_payment_bonuses'] = {};
        //     if(isNotEmpty($scope[$scope.form_model]['employee_payment_revises']) && isNotEmpty($scope[$scope.form_model]['employee_payment_revises']['salary_cycle'])){
        //         $scope[$scope.form_model][timestamp]['employee_payment_bonuses']['bonus_cycle'] = $scope[$scope.form_model]['employee_payment_revises']['salary_cycle']
        //     }
        // }
        // else if(isEmpty(items.FormData) && isEmpty($scope[$scope.form_model][timestamp]['employee_payment_bonuses']) && sectionkey == 'bonusform'){
        //     $scope[$scope.form_model][timestamp]['employee_payment_bonuses'] = {};
        // }
    }

    $scope.addKeywordFromDocumentAddPopup = function() {
        if($scope[$scope.form_model][$scope.KeyIndex]['document_type'] == undefined){
            $scope[$scope.form_model][$scope.KeyIndex]['document_type'] = '';
        }
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'addDocumentKeywordModalTitle',
            ariaDescribedBy: 'addDocumentKeywordModalBody',
            templateUrl: 'addDocumentKeywordModal.html',
            controller: 'addDocumentKeywordModalCtrl',
            size: 'extra_large modal-dialog-aside',
            appendTo: '',
            resolve: {
                items: function () {
                    return {};
                }
            }
        }).result.then(function(response) {
            doc_id = response.data.id;
            name = response.data.name;
            $scope.jsonAdditionFields['sections']['documentsform']['cnf_form_field'][1]['options'].push({name:name,id:doc_id});
            $scope.jsonAdditionFields['sections']['documentsform']['cnf_form_field'][1]['other_options'].push({name:name,id:doc_id});
            $scope[$scope.form_model][$scope.KeyIndex]['document_type'] = doc_id.toString();
        }, function() {

        });
    }
    // ['assignment_payment_revises']

    $scope.isDisabledField = function(field) {
        return disabledFunc(field, $scope);
    }

    $scope.datepicker = function($event, which) {
        $event.preventDefault();
        //$event.stopPropagation();
        $scope.datepickers[which] = true;
    };

    $scope.saveSubForm = function() {
        $scope.error_div_cls = 0;
        var checkValidation = 1;
        // console.log('hi');

        $scope.setValidationErrorsForCustomForm();

        if ($scope.outh_provider_modules.includes($scope.keyIndex)) {
            if(isEmpty($scope[$scope.form_model][$scope.KeyIndex]) || 
                (isEmpty($scope[$scope.form_model][$scope.KeyIndex]['attachment_name']) && isEmpty($scope[$scope.form_model][$scope.KeyIndex]['unique_name']))
            ) {
                $scope.file_not_uploaded = true;
            }
        }

        if (!$scope[$scope.form_name].$valid || isNotEmpty($scope.file_not_uploaded)) {
            
            showAlertMessage({
                    message : ' Uh Oh! There are few empty fields missing. Fill them in with some info to proceed ',
                    status : 0
                });

            $scope.error_div_cls = 1;
            checkValidation = 0;
            return false;
        }
        
        /*angular.forEach($scope[$scope.form_name].$error, function(k, v) {
            if (v === "required" || v === "pattern") {
                checkValidation = 0;
            }
        });*/

        if (checkValidation) {
            if($scope.KeyIndex == 'user_education_details') {
                var start_date = new Date($scope[$scope.form_model][$scope.KeyIndex]['education_start_date']);
                if (isNotEmpty($scope[$scope.form_model][$scope.KeyIndex]['education_end_date'])) {
                    var end_date = new Date($scope[$scope.form_model][$scope.KeyIndex]['education_end_date']);
                    if (new Date(start_date) > new Date(end_date)) {
                        showAlertMessage({
                            status : 0,
                            message : 'End date should be greater than start date.'
                        });
                        return false;
                    }
                }
            }

            if($scope.KeyIndex == 'employee_payment_revises') {
                angular.forEach($scope[$scope.form_model][$scope.KeyIndex], function(val, key)
                {
                    if (Array.isArray(val) || isObject(val)) {
                        var arrField = [];
                        if (isNotEmpty(val['check'])) {
                            angular.forEach(val['check'], function(v, k) {
                                if (v) {
                                    arrField.push(k);
                                }
                            });
                            $scope[$scope.form_model][$scope.KeyIndex][key] = arrField.join(',');
                        }
                    }
                });
                $scope[$scope.form_model][$scope.KeyIndex].deductions = [];
                //$scope[$scope.form_model][$scope.KeyIndex].bonuses = [];
                payment_effective_date = $scope[$scope.form_model][$scope.KeyIndex]['effective_date'];
                hasDeductionsEffectiveDateError = hasDeductionsCategoryError = false;
                deduction_categories_arr = [];
                angular.forEach($scope[$scope.form_model], function(val, key)
                {
                    if(key != $scope.KeyIndex){
                        if(isNotEmpty(val['employee_payment_deductions'])){
                            if (isNotEmpty(val['employee_payment_deductions']['effective_start_date']) && 
                                (new Date(payment_effective_date) > new Date(val['employee_payment_deductions']['effective_start_date']))
                            ) {
                                hasDeductionsEffectiveDateError = true;
                            }
                            else if(deduction_categories_arr.includes(val['employee_payment_deductions']['deduction_category'])){
                                hasDeductionsCategoryError = true;
                            }
                            else{
                                $scope[$scope.form_model][$scope.KeyIndex].deductions.push(val['employee_payment_deductions']);
                                deduction_categories_arr.push(val['employee_payment_deductions']['deduction_category']);
                            }
                        }
                        // if(isNotEmpty(val['employee_payment_bonuses'])){
                        //     if (isNotEmpty(val['employee_payment_bonuses']['effective_start_date']) && 
                        //         (new Date(payment_effective_date) > new Date(val['employee_payment_bonuses']['effective_start_date']))
                        //     ) {
                        //         hasBonusesEffectiveDateError = true;
                        //     }
                        //     else{
                        //         $scope[$scope.form_model][$scope.KeyIndex].bonuses.push(val['employee_payment_bonuses']);
                        //         delete $scope[$scope.form_model][key];
                        //     }
                        // }
                    }
                });

                if (hasDeductionsEffectiveDateError) {
                    showAlertMessage({
                        status : 0,
                        message : 'Effective date should be greater than or equal to Payment Information Effective date'
                    });
                    return false;
                }
                if (hasDeductionsCategoryError) {
                    showAlertMessage({
                        status : 0,
                        message : 'Deduction Category should be different'
                    });
                    return false;
                }

                angular.forEach($scope[$scope.form_model], function(val, key)
                {
                    if(key != $scope.KeyIndex){
                        if(isNotEmpty(val['employee_payment_deductions'])){
                            delete $scope[$scope.form_model][key];
                        }
                    }
                });
                // if (hasBonusesEffectiveDateError) {
                //     showAlertMessage({
                //         status : 0,
                //         message : 'Effective date should be greater than or equal to Payment Information Effective date'
                //     });
                //     return false;
                // }
            }

            if($scope.KeyIndex == 'assignment_overhead_costs') {
                var assignment_start_date = assignment_end_date = '';
                // Get assignment start date and end date
                if (isNotEmpty(items.assignments)) { // in create assignment
                    assignment_start_date = items.assignments['start_date'];
                    assignment_end_date = items.assignments['end_date'];
                } else if (isNotEmpty($scope.customdata) && isNotEmpty($scope.customdata['assignments'])) { // in view assignment
                    assignment_start_date = $scope.customdata['assignments']['start_date'];
                    assignment_end_date = $scope.customdata['assignments']['end_date'];
                }

                if (isNotEmpty($scope[$scope.form_model][$scope.KeyIndex]['effective_date'])) {
                    var effective_date = $scope[$scope.form_model][$scope.KeyIndex]['effective_date'];
                    if ((isNotEmpty(assignment_start_date) && new Date(assignment_start_date) > new Date(effective_date) ) || 
                        ( isNotEmpty(assignment_end_date)  && ( new Date(effective_date) > new Date(assignment_end_date) ) )
                    ) {
                        showAlertMessage({
                            status : 0,
                            message : 'Effective date should be in between assignment start date and end date.'
                        });
                        return false;
                    }
                }

                if (isNotEmpty(effective_date) && isNotEmpty($scope[$scope.form_model][$scope.KeyIndex]['effective_until'])) {
                    var effective_until = $scope[$scope.form_model][$scope.KeyIndex]['effective_until'];
                    if (new Date(effective_date) > new Date(effective_until)) {
                        showAlertMessage({
                            status : 0,
                            message : 'Effective until should be greater than effective date.'
                        });
                        return false;
                    }

                    if (isNotEmpty(assignment_end_date)  && ( new Date(effective_until) > new Date(assignment_end_date) ) ) {
                        showAlertMessage({
                            status : 0,
                            message : 'Effective until should not exceed assignment end date.'
                        });
                        return false;
                    }
                }
            }

            if($scope.KeyIndex == 'assignment_po_informations') {
                var po_start_date = new Date($scope[$scope.form_model][$scope.KeyIndex]['start_date']);
                if (isNotEmpty($scope[$scope.form_model][$scope.KeyIndex]['end_date'])) {
                    var po_end_date = new Date($scope[$scope.form_model][$scope.KeyIndex]['end_date']);
                    if (new Date(po_start_date) > new Date(po_end_date)) {
                        showAlertMessage({
                            status : 0,
                            message : 'End date should be greater than start date.'
                        });
                        return false;
                    }
                }
            }

            if($scope.KeyIndex == 'account_documents' || $scope.KeyIndex == 'candidate_document_details'  || $scope.KeyIndex == 'employee_documents' || $scope.KeyIndex == 'project_documents') {
                if($scope[$scope.form_model][$scope.KeyIndex]['expiry_date'] != null){
                    var dateobj = new Date($scope[$scope.form_model][$scope.KeyIndex]['expiry_date']);
                    var expiry_date = angular.copy(dateobj);
                    if(isNotEmpty(expiry_date) && expiry_date != 'Invalid Date') {
                        var expiry_date_entered = expiry_date.toISOString().substr(0,10);
                        var todays_date_iso = new Date();
                        var todays_date = todays_date_iso.toISOString().substr(0,10);
                        if(expiry_date_entered < todays_date && $scope[$scope.form_model][$scope.KeyIndex]['status'] == 'active') {
                            var errorMessage = [];
                            errorMessage['status'] = 0;
                            errorMessage['message'] = "Please Fill Future Dates";
                            showAlertMessage(errorMessage);
                            return false;
                        }
                    }
                }
            }

            if($scope.KeyIndex == 'user_dependants') {
                if (isNotEmpty($scope[$scope.form_model][$scope.KeyIndex]['user_dependants_date_of_birth'])) {
                    var dob = new Date($scope[$scope.form_model][$scope.KeyIndex]['user_dependants_date_of_birth']);
                    if (new Date(dob) > new Date()) {
                        showAlertMessage({
                            status : 0,
                            message : 'Date of birth must be a date  before or equal to today.'
                        });
                        return false;
                    }
                }
            }
            if($scope.KeyIndex == 'account_billing_addresses') {
                if(isNaN($scope[$scope.form_model][$scope.KeyIndex]['country'])){
                    $scope[$scope.form_model][$scope.KeyIndex]['country'] = "";
                }
                var check_empty_values = Object.values($scope[$scope.form_model][$scope.KeyIndex]).every(o => o === "");
                if(check_empty_values == true){
                    showAlertMessage({
                        status : 0,
                        message : 'Please enter atleast a field.'
                    });
                    return false;
                }
            }
            if($scope.KeyIndex == 'account_shipping_addresses') {
                if(isNaN($scope[$scope.form_model][$scope.KeyIndex]['country'])){
                    $scope[$scope.form_model][$scope.KeyIndex]['country'] = "";
                }
                var check_empty_values = Object.values($scope[$scope.form_model][$scope.KeyIndex]).every(o => o === "");
                if(check_empty_values == true){
                    showAlertMessage({
                        status : 0,
                        message : 'Please enter atleast a field.'
                    });
                    return false;
                }
            }

            if ($scope.KeyIndex == 'jobs' && $scope.add_more_form_name == 'jobs_recruitment_details') {
                postData = {};
                postData['id'] = $scope.newField.FormData.encid;
                postData['update_details'] = $scope.JobRecruitmentMultiSectionData.jobs;
                HireApiServices.post('jobs/updateJobRecruitmentTeam', postData, true)
                    .then(function success(response) {
                        showAlertMessage(response.data);
                        $state.reload();
                        
                    })
            }

            if($scope.KeyIndex == 'job_pay_billing_details') {
                if(isEmpty($scope[$scope.form_model][$scope.KeyIndex]['mark_as_default'])) {
                    if(!isEmpty($scope[$scope.form_model][$scope.KeyIndex]['client_rate'])){
                        var min = $scope[$scope.form_model][$scope.KeyIndex]['client_rate']['min'];
                        var max = $scope[$scope.form_model][$scope.KeyIndex]['client_rate']['max'];
                        $scope[$scope.form_model][$scope.KeyIndex]['client_rate'] = min+'-'+max;
                    }
                    if(!isEmpty($scope[$scope.form_model][$scope.KeyIndex]['hire_rate'])){
                        var min = $scope[$scope.form_model][$scope.KeyIndex]['hire_rate']['min'];
                        var max = $scope[$scope.form_model][$scope.KeyIndex]['hire_rate']['max'];
                        $scope[$scope.form_model][$scope.KeyIndex]['hire_rate'] = min+'-'+max;
                    }
                }
            }

            if($scope.KeyIndex == 'requisition_pay_billing_details') {
                if(isEmpty($scope[$scope.form_model][$scope.KeyIndex]['mark_as_default'])) {
                    if(!isEmpty($scope[$scope.form_model][$scope.KeyIndex]['hire_rate'])){
                        var min = $scope[$scope.form_model][$scope.KeyIndex]['hire_rate']['min'];
                        var max = $scope[$scope.form_model][$scope.KeyIndex]['hire_rate']['max'];
                        $scope[$scope.form_model][$scope.KeyIndex]['hire_rate'] = min+'-'+max;
                    }
                }
            }

            if($scope.KeyIndex == 'candidate_expected_pay_billing_details') {
                if(isEmpty($scope[$scope.form_model][$scope.KeyIndex]['mark_as_default'])) {
                    if(!isEmpty($scope[$scope.form_model][$scope.KeyIndex]['expected_pay_rate'])){
                        var min = $scope[$scope.form_model][$scope.KeyIndex]['expected_pay_rate']['min'];
                        var max = $scope[$scope.form_model][$scope.KeyIndex]['expected_pay_rate']['max'];
                        $scope[$scope.form_model][$scope.KeyIndex]['expected_pay_rate'] = min+'-'+max;
                    }
                }
            }

            
            if($scope.KeyIndex == 'account_interview_address') {
                if(isNaN($scope[$scope.form_model][$scope.KeyIndex]['country'])){
                    $scope[$scope.form_model][$scope.KeyIndex]['country'] = "";
                }
                var check_empty_values = Object.values($scope[$scope.form_model][$scope.KeyIndex]).every(o => o === "");
                if(check_empty_values == true){
                    showAlertMessage({
                        status : 0,
                        message : 'Please enter atleast a field.'
                    });
                    return false;
                }
            }

            if ($scope.KeyIndex == 'jobs' && $scope.add_more_form_name == 'edit_job_campaign_fields') {
                postData = {};
                postData['id'] = $scope.newField.FormData.id;
                postData['update_details'] = $scope[$scope.form_model][$scope.KeyIndex];
                HireApiServices.post('jobs/updateJobCampaignFields', postData, true)
                    .then(function success(response) {
                        showAlertMessage(response.data);
                        $state.reload();
                });
            }

            if ($scope.KeyIndex == 'opportunity_splits') {
                if ($scope.$parent.opportunity && $scope.$parent.opportunity.opportunity_amount) {
                    $scope.opportunity_amount = $scope.$parent.opportunity.opportunity_amount;
                } else if ($scope.$parent.pageOnLoadData && $scope.$parent.pageOnLoadData.opportunity.opportunities.opportunity_amount) {
                    $scope.opportunity_amount = $scope.$parent.pageOnLoadData.opportunity.opportunities.opportunity_amount;
                }

                if (parseFloat($scope[$scope.form_model]['opportunity_splits']['split_amount']) > parseFloat($scope.opportunity_amount)) {
                    showAlertMessage({'status': 0, 'message': 'Split Amount should be less than Opportunity Amount'});
                    return false;
                }   
            }

            if($scope.KeyIndex == 'employee_documents' || $scope.KeyIndex == 'candidate_document_details' || $scope.KeyIndex == 'account_documents' || $scope.KeyIndex == 'project_documents'){
                $scope.checkExistedDocuments();
                return false;
            }

            //if($scope.subform.$valid){
            $uibModalInstance.close($scope[$scope.form_model][$scope.KeyIndex]);
        } else {
            $scope.error_div_cls = 1;
        }
    };

    $scope.checkExistedDocuments = function() {
        if(isEmpty($scope[$scope.parent_form_model][$scope.KeyIndex])){
            $uibModalInstance.close($scope[$scope.form_model][$scope.KeyIndex]);
            return false;
        }

        current_document_type = $scope[$scope.form_model][$scope.KeyIndex]['document_type'];
        existed_documents = [];
        existed_document_types = {};
        angular.forEach(items.SubForm,function(val,key){
            if(val.field_name == 'document_type'){
                angular.forEach(val.options,function(val1,key1){
                    existed_document_types[val1['id']] = val1;
                });
            }
        })
        document_statuses_options = {'active':{'id':'active','name':'Active'},'inactive':{'id':'inactive','name':'Inactive'}};

        angular.forEach($scope[$scope.parent_form_model][$scope.KeyIndex], function (val, key) {
            if(key != items.editIndex && ($scope.newField.FormData.folder_id != val.folder_id || val.folder_id == null) && val.document_type == current_document_type && val.status == 'active'){
                val.list_key = key;
                existed_documents.push(val);
            }
        });

        if(existed_documents.length == 0){
            $uibModalInstance.close($scope[$scope.form_model][$scope.KeyIndex]);
            return false;
        }

        data_options = {
            'existed_documents':existed_documents,
            'document_statuses_options':document_statuses_options,
            'existed_document_types':existed_document_types,
            'from_edit_record' : true
        };
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'existedDocumentsPopupTitle',
            ariaDescribedBy: 'existedDocumentsPopupBody',
            templateUrl: 'existedDocumentsPopup.html',
            controller: 'existedDocumentsPopupCtrl',
            size: 'xl modal-dialog-aside',
            appendTo: '',
            resolve: {
               items: function () {
                    return data_options;
               },
            }
        }).result.then(function(existedRequestDocuments) {
            $scope[$scope.form_model][$scope.KeyIndex]['existedRequestDocuments'] = existedRequestDocuments;
            $uibModalInstance.close($scope[$scope.form_model][$scope.KeyIndex]);
        }, function() {

        });
    }

    $scope.saveMultiSectionSubForm = function(form_name) {
        $scope.error_div_cls = 0;
        var checkValidation = 1;

        $scope.setValidationErrorsForMultiSectionForm();

        var formValid = true;

        console.log($scope[$scope.form_name]['form']);
        
        angular.forEach($scope[$scope.form_name]['form'], function (val, key) {
            if(isNotEmpty(val))
            {
                if (!val.$valid) {
                    console.log(val.$error);
                    formValid = false;
                    return false;
                }
            }
            
        });
        if (!formValid) {

            showAlertMessage({
                    message : 'Uh oh! You have missed few mandatory fields. Fill them to proceed',
                    status : 0
                });

            return false;
        }

        if (formValid) {
            if($scope.KeyIndex == 'user_education_details') {
                angular.forEach($scope[$scope.form_model], function(valEmp, keyEmp){
                    var start_date = new Date($scope[$scope.form_model][keyEmp][$scope.KeyIndex]['education_start_date']);
                    if (isNotEmpty($scope[$scope.form_model][keyEmp][$scope.KeyIndex]['education_end_date'])) {
                        var end_date = new Date($scope[$scope.form_model][keyEmp][$scope.KeyIndex]['education_end_date']);
                        if (new Date(start_date) > new Date(end_date)) {
                            showAlertMessage({
                                status : 0,
                                message : 'End date should be greater than start date.'
                            });
                            return false;
                        }
                    }
                });
            }

            if($scope.KeyIndex == 'employee_payment_revises') {
                angular.forEach($scope[$scope.form_model], function(valEmp, keyEmp){
                    angular.forEach(valEmp[$scope.KeyIndex], function(val, key)
                    {
                        if (Array.isArray(val) || isObject(val)) {
                            var arrField = [];
                            if (isNotEmpty(val['check'])) {
                                angular.forEach(val['check'], function(v, k) {
                                    if (v) {
                                        arrField.push(k);
                                    }
                                });
                                $scope[$scope.form_model][keyEmp][$scope.KeyIndex][key] = arrField.join(',');
                            }
                        }
                    });
                });
            }

            if($scope.KeyIndex == 'assignment_overhead_costs') {
                var assignment_start_date = assignment_end_date = '';
                // Get assignment start date and end date
                if (isNotEmpty(items.assignments)) { // in create assignment
                    assignment_start_date = items.assignments['start_date'];
                    assignment_end_date = items.assignments['end_date'];
                } else if (isNotEmpty($scope.customdata) && isNotEmpty($scope.customdata['assignments'])) { // in view assignment
                    assignment_start_date = $scope.customdata['assignments']['start_date'];
                    assignment_end_date = $scope.customdata['assignments']['end_date'];
                }

                if (isNotEmpty($scope[$scope.form_model][$scope.KeyIndex]['effective_date'])) {
                    var effective_date = $scope[$scope.form_model][$scope.KeyIndex]['effective_date'];
                    if ((isNotEmpty(assignment_start_date) && new Date(assignment_start_date) > new Date(effective_date) ) || 
                        ( isNotEmpty(assignment_end_date)  && ( new Date(effective_date) > new Date(assignment_end_date) ) )
                    ) {
                        showAlertMessage({
                            status : 0,
                            message : 'Effective date should be in between assignment start date and end date.'
                        });
                        return false;
                    }
                }

                if (isNotEmpty(effective_date) && isNotEmpty($scope[$scope.form_model][$scope.KeyIndex]['effective_until'])) {
                    var effective_until = $scope[$scope.form_model][$scope.KeyIndex]['effective_until'];
                    if (new Date(effective_date) > new Date(effective_until)) {
                        showAlertMessage({
                            status : 0,
                            message : 'Effective until should be greater than effective date.'
                        });
                        return false;
                    }

                    if (isNotEmpty(assignment_end_date)  && ( new Date(effective_until) > new Date(assignment_end_date) ) ) {
                        showAlertMessage({
                            status : 0,
                            message : 'Effective until should not exceed assignment end date.'
                        });
                        return false;
                    }
                }
            }

            if($scope.KeyIndex == 'account_documents' || $scope.KeyIndex == 'candidate_document_details'  || $scope.KeyIndex == 'employee_documents' || $scope.KeyIndex == 'project_documents') {
                if($scope[$scope.form_model][$scope.KeyIndex]['expiry_date'] != null){
                    var dateobj = new Date($scope[$scope.form_model][$scope.KeyIndex]['expiry_date']);
                    var expiry_date = angular.copy(dateobj);
                    if(isNotEmpty(expiry_date) && expiry_date != 'Invalid Date') {
                        var expiry_date_entered = expiry_date.toISOString().substr(0,10);
                        var todays_date_iso = new Date();
                        var todays_date = todays_date_iso.toISOString().substr(0,10);
                        if(expiry_date_entered < todays_date && $scope[$scope.form_model][$scope.KeyIndex]['status'] == 'active') {
                            var errorMessage = [];
                            errorMessage['status'] = 0;
                            errorMessage['message'] = "Please Fill Future Dates";
                            showAlertMessage(errorMessage);
                            return false;
                        }
                    }
                }
            }

            if($scope.KeyIndex == 'user_dependants') {
                angular.forEach($scope[$scope.form_model], function(valEmp, keyEmp){
                    if (isNotEmpty($scope[$scope.form_model][keyEmp][$scope.KeyIndex]['user_dependants_date_of_birth'])) {
                        var dob = new Date($scope[$scope.form_model][keyEmp][$scope.KeyIndex]['user_dependants_date_of_birth']);
                        if (new Date(dob) > new Date()) {
                            showAlertMessage({
                                status : 0,
                                message : 'Date of birth must be a date  before or equal to today.'
                            });
                            return false;
                        }
                    }
                });
            }
            if($scope.KeyIndex == 'account_billing_addresses') {
                angular.forEach($scope[$scope.form_model], function(valAcc, keyAcc){
                    if(isNaN($scope[$scope.form_model][keyAcc][$scope.KeyIndex]['country'])){
                        $scope[$scope.form_model][keyAcc][$scope.KeyIndex]['country'] = "";
                    }
                    var check_empty_values = Object.values($scope[$scope.form_model][keyAcc][$scope.KeyIndex]).every(o => o === "");
                    if(check_empty_values == true){
                        showAlertMessage({
                            status : 0,
                            message : 'Please enter atleast a field.'
                        });
                        return false;
                    }
                });
            }
            if($scope.KeyIndex == 'account_shipping_addresses') {
                angular.forEach($scope[$scope.form_model], function(valAcc, keyAcc){
                    if(isNaN($scope[$scope.form_model][keyAcc][$scope.KeyIndex]['country'])){
                        $scope[$scope.form_model][keyAcc][$scope.KeyIndex]['country'] = "";
                    }
                    var check_empty_values = Object.values($scope[$scope.form_model][keyAcc][$scope.KeyIndex]).every(o => o === "");
                    if(check_empty_values == true){
                        showAlertMessage({
                            status : 0,
                            message : 'Please enter atleast a field.'
                        });
                        return false;
                    }
                });
            }

            if ($scope.KeyIndex == 'jobs' && $scope.add_more_form_name == 'jobs_recruitment_details') {
                postData = {};
                postData['id'] = $scope.newField.FormData.encid;
                postData['update_details'] = $scope.JobRecruitmentMultiSectionData.jobs;
                HireApiServices.post('jobs/updateJobRecruitmentTeam', postData, true)
                    .then(function success(response) {
                        showAlertMessage(response.data);
                        $state.reload();
                        
                    })
            }

            if($scope.KeyIndex == 'job_pay_billing_details') {
                if(isNotEmpty($scope[$scope.form_model][$scope.KeyIndex])){
                    delete $scope[$scope.form_model][$scope.KeyIndex];
                }
                angular.forEach($scope[$scope.form_model], function(valPay, keyPay){
                    if(isEmpty($scope[$scope.form_model][keyPay][$scope.KeyIndex]['mark_as_default'])) {
                        if(!isEmpty($scope[$scope.form_model][keyPay][$scope.KeyIndex]['client_rate'])){
                            var min = $scope[$scope.form_model][keyPay][$scope.KeyIndex]['client_rate']['min'];
                            var max = $scope[$scope.form_model][keyPay][$scope.KeyIndex]['client_rate']['max'];
                            $scope[$scope.form_model][keyPay][$scope.KeyIndex]['client_rate'] = min+'-'+max;
                        }
                        if(!isEmpty($scope[$scope.form_model][keyPay][$scope.KeyIndex]['hire_rate'])){
                            var min = $scope[$scope.form_model][keyPay][$scope.KeyIndex]['hire_rate']['min'];
                            var max = $scope[$scope.form_model][keyPay][$scope.KeyIndex]['hire_rate']['max'];
                            $scope[$scope.form_model][keyPay][$scope.KeyIndex]['hire_rate'] = min+'-'+max;
                        }
                    }
                });
            }

            if($scope.KeyIndex == 'candidate_expected_pay_billing_details') {
                console.log($scope[$scope.form_model]);
                if(isNotEmpty($scope[$scope.form_model][$scope.KeyIndex])){
                    delete $scope[$scope.form_model][$scope.KeyIndex];
                }
                angular.forEach($scope[$scope.form_model], function(valPay, keyPay){
                    if(isEmpty($scope[$scope.form_model][keyPay][$scope.KeyIndex]['mark_as_default'])) {
                        if(!isEmpty($scope[$scope.form_model][keyPay][$scope.KeyIndex]['expected_pay_rate'])){
                            var min = $scope[$scope.form_model][keyPay][$scope.KeyIndex]['expected_pay_rate']['min'];
                            var max = $scope[$scope.form_model][keyPay][$scope.KeyIndex]['expected_pay_rate']['max'];
                            $scope[$scope.form_model][keyPay][$scope.KeyIndex]['expected_pay_rate'] = min+'-'+max;
                        }
                    }
                });
            }

            
            if($scope.KeyIndex == 'account_interview_address') {
                angular.forEach($scope[$scope.form_model], function(valAcc, keyAcc){
                    if(isNaN($scope[$scope.form_model][keyAcc][$scope.KeyIndex]['country'])){
                        $scope[$scope.form_model][keyAcc][$scope.KeyIndex]['country'] = "";
                    }
                    var check_empty_values = Object.values($scope[$scope.form_model][keyAcc][$scope.KeyIndex]).every(o => o === "");
                    if(check_empty_values == true){
                        showAlertMessage({
                            status : 0,
                            message : 'Please enter atleast a field.'
                        });
                        return false;
                    }
                });
            }

            if($scope.KeyIndex == 'requisition_pay_billing_details') {
                if(isNotEmpty($scope[$scope.form_model][$scope.KeyIndex])){
                    delete $scope[$scope.form_model][$scope.KeyIndex];
                }
                angular.forEach($scope[$scope.form_model], function(valPay, keyPay){
                    if(isEmpty($scope[$scope.form_model][keyPay][$scope.KeyIndex]['mark_as_default'])) {
                        if(!isEmpty($scope[$scope.form_model][keyPay][$scope.KeyIndex]['hire_rate'])){
                            var min = $scope[$scope.form_model][keyPay][$scope.KeyIndex]['hire_rate']['min'];
                            var max = $scope[$scope.form_model][keyPay][$scope.KeyIndex]['hire_rate']['max'];
                            $scope[$scope.form_model][keyPay][$scope.KeyIndex]['hire_rate'] = min+'-'+max;
                        }
                    }
                });
            }

           


            console.log($scope[$scope.form_model]);
            angular.forEach($scope[$scope.form_name]['form'], function (val, key) {
                if(isEmpty(val))
                {
                  delete $scope[$scope.form_model][key];
                }
            });


            $uibModalInstance.close($scope[$scope.form_model]);
        } else {
            $scope.error_div_cls = 1;
        }
    };

    $scope.calculatePaymentSplitAmount = function () {
        angular.forEach($scope[$scope.form_model], function(val, key)
        {
            if(isNotEmpty(val['split_type']) && isNotEmpty(val['split_value']))
            {
                if (val['split_type'] == 'percentage' && isEmpty($scope.$parent.opportunity_info)) {
                    $scope[$scope.form_model][key]['split_amount'] = roundToFixedDecimals(($scope.$parent.opportunity['opportunity_amount']/100)*val['split_value']);
                } else if (val['split_type'] == 'percentage' && isNotEmpty($scope.$parent.opportunity_info)){
                    $scope[$scope.form_model][key]['split_amount'] = roundToFixedDecimals(($scope.$parent.opportunity_info['opportunity_amount']/100)*val['split_value']);
                } 
                else {
                    $scope[$scope.form_model][key]['split_amount'] = val['split_value'];
                }
            }
            else if (isEmpty(val['split_value'])) {
                $scope[$scope.form_model][key]['split_amount'] = ''; 
            } else {
                $scope[$scope.form_model][key]['split_amount'] = val['split_value']; 
            }
        });
    }
    
    $scope.calculateOverheadCostAmount =function () {
        $scope.overhead_cost = $scope[$scope.form_model]['assignment_overhead_costs'];
        $scope.overhead_cost['amount'] = 0;
        if (isNotEmpty($scope.overhead_cost) && isNotEmpty($scope.overhead_cost['percentage_on']) && $scope.overhead_cost['percentage']) {
            if (isNotEmpty(items.billing_details) && isNotEmpty(items.billing_details[$scope.overhead_cost['percentage_on']])) {
                $scope.overhead_cost['amount'] = roundToFixedDecimals(((items.billing_details[$scope.overhead_cost['percentage_on']] * $scope.overhead_cost['percentage'])/100), 2);
            }
        }
    };

    $scope.calculateAdditionalPayAmount =function () {
        $scope.payInfo = $scope[$scope.form_model]['assignment_additional_pay_information'];
        $scope.payInfo['pay_amount'] = 0;
        if (isNotEmpty($scope.payInfo) && isNotEmpty($scope.payInfo['pay_mode']) && $scope.payInfo['pay_value']) {

            if ($scope.payInfo['pay_mode'] == 'percentage_of_bill_rate') {
                $scope.pay_mode = 'bill_rate'
            } else {
                $scope.pay_mode = 'pay_rate'
            }
            if (isNotEmpty(items.billing_details) && isNotEmpty(items.billing_details[$scope.pay_mode])) {
                $scope.payInfo['pay_amount'] = roundToFixedDecimals(((items.billing_details[$scope.pay_mode] * $scope.payInfo['pay_value'])/100), 2);
            }
        }
    };


    $scope.saveReviseForm = function() {
        $scope.error_div_cls = 0;
        var checkValidation = 1;

        $scope.setValidationErrorsForCustomForm();
        if (!$scope[$scope.form_name].$valid) {
            $scope.error_div_cls = 1;
            checkValidation = 0;
            return false;
        }
        
        if (checkValidation) {
            if($scope.KeyIndex == 'assignment_payment_revises') {
                if (isNotEmpty($scope[$scope.form_model][$scope.KeyIndex]['effective_date'])) {
                    var assignment_start_date = assignment_end_date = '';
                    // Get assignment start date and end date
                    if (isNotEmpty($scope['billableAssignment'])) { // in create assignment
                        assignment_start_date = $scope['billableAssignment']['start_date'];
                        assignment_end_date = $scope['billableAssignment']['end_date'];
                    } else if (isNotEmpty($scope.customdata) && isNotEmpty($scope.customdata['assignments'])) { // in view assignment
                        assignment_start_date = $scope.customdata['assignments']['start_date'];
                        assignment_end_date = $scope.customdata['assignments']['end_date'];
                    }

                    var effective_date = $scope[$scope.form_model][$scope.KeyIndex]['effective_date'];
                    if ((isNotEmpty(assignment_start_date) && new Date(assignment_start_date) > new Date(effective_date) ) || 
                        ( isNotEmpty(assignment_end_date)  && ( new Date(effective_date) > new Date(assignment_end_date) ) )
                    ) {
                        showAlertMessage({
                            status : 0,
                            message : 'Effective date should be in between assignment start date and end date.'
                        });
                        return false;
                    }
                }
            }

            //if($scope.subform.$valid){
            $uibModalInstance.close($scope[$scope.form_model][$scope.KeyIndex]);
        } else {
            $scope.error_div_cls = 1;
        }
    };
    
    $scope.DateConvert = function(field_name, keyindex, inputdata) {
        if (inputdata)
            $scope[$scope.form_model][keyindex][field_name] = new Date(inputdata);
        $scope[$scope.form_model][keyindex][field_name].setMinutes($scope[$scope.form_model][keyindex][field_name].getMinutes() + 480);

    }
    $scope.showOriginalNameField = {};
    $scope.originalName = {};
    $scope.editOriginalName = function(field,model_name,bulk_form_id){
        $scope.showOriginalNameField[bulk_form_id] = true;
        var lastIndxDot = model_name.lastIndexOf('.');
        var old_original_name = model_name.substring(0, lastIndxDot);
        $scope.originalName.new_name = old_original_name;
    }
    $scope.DeleteAttachment = function(field,model_name,bulk_form_id){
        $scope[$scope.form_model][field.related_table][field.field_name] = '';
    }
    $scope.saveOriginalName = function(field,model_name,bulk_form_id){
        if(isEmpty($scope.originalName.new_name)){
            showAlertMessage({
                status : 0,
                message : "Attachment name should not be empty"
            });
            return false;
        }
        $scope.showOriginalNameField = {};
        var extension = model_name.substring(model_name.lastIndexOf('.'));
        if(typeof $scope[$scope.form_model][$scope.KeyIndex] !=='undefined'){
            $scope[$scope.form_model][$scope.KeyIndex]['original_name'] = $scope.originalName.new_name+extension;
        }
        else{
            $scope[$scope.form_model][bulk_form_id][$scope.KeyIndex]['original_name'] = $scope.originalName.new_name+extension;
        }
    }


    $scope.uploadedFile = function(element,field,bulk_form_id='') {
        $scope.$apply(function($scope) {
            $scope.files = element.files;
            if (!checkStringLength(element.files[0].name)) {            
                $scope.files = element.files; 
                element.value = null;
                showAlertMessage({
                    status : 0,
                    message : "File name can't exceeds the limit allowed of 200 characters" 
                });
                return false;                
            }  
            if(!isValidExtension(element.files[0].name)){
                element.value = null;
                showAlertMessage({
                    status : 0,
                    message : "Invalid File Extension"
                });
                return false;    
            } 
            if(element.files[0].size > TOTAL_FILE_SIZE_LIMIT){
                element.value = null;
                showAlertMessage({
                    status : 0,
                    message : CONFIG_MESSAGES.file_size_limit_exceeded
                });
                return false;
            }
            if(bulk_form_id!=''){
                $scope.form_file_inputs[bulk_form_id] = {};  
                name = element.name;
                $scope.form_file_inputs[bulk_form_id][field.field_name] = $scope.files;
                if(isEmpty($scope[$scope.form_model][bulk_form_id])){
                    $scope[$scope.form_model][bulk_form_id] = {};
                    $scope[$scope.form_model][bulk_form_id][field.related_table] = {};
                }
                $scope[$scope.form_model][bulk_form_id][field.related_table][field.field_name] = {};
                $scope[$scope.form_model][bulk_form_id][field.related_table][field.field_name]['original_name'] = $scope.files[0].name;
                $scope[$scope.form_model][bulk_form_id][field.related_table][field.field_name]['attachment_name'] = '';
                console.log($scope.form_file_inputs[bulk_form_id][field.field_name]);

            }else{
                $scope[$scope.form_model][$scope.KeyIndex]['original_name'] = $scope.files[0].name;
                $scope[$scope.form_model][$scope.KeyIndex]['attachment_name'] = $scope.files;
                if ($scope.outh_provider_modules.includes($scope.keyIndex)) {
                    $scope.file_not_uploaded = false;
                }
                if($scope.KeyIndex == 'employee_documents' || $scope.KeyIndex == 'candidate_document_details' || $scope.KeyIndex == 'account_documents' || $scope.KeyIndex == 'project_documents'){
                    $scope[$scope.form_model][$scope.KeyIndex]['document_name'] = $scope.files[0].name.split('.')[0];
                }
            }
        });
    }

    $scope.uploadOauthFile = function(file, bulk_form_id = '') {
        if(isNotEmpty(bulk_form_id)){
            $scope[$scope.form_model][bulk_form_id][$scope.KeyIndex]['original_name'] = file[0].name;
            $scope[$scope.form_model][bulk_form_id][$scope.KeyIndex]['attachment_name'] = file;
        }
        else{
            $scope[$scope.form_model][$scope.KeyIndex]['original_name'] = file[0].name;
            $scope[$scope.form_model][$scope.KeyIndex]['attachment_name'] = file;
        }
        $scope.file_not_uploaded = false;
    }

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.multipleInput = function(field, inputdata, obj) {
        if (inputdata) {
            if (typeof inputdata !== "object" && !Array.isArray(inputdata)) {
                var arr = inputdata.split(',');
            } else {
                var arr = inputdata;
            }
            var arrResult = [];
            angular.forEach(arr, function(k, v) {
                angular.forEach(obj, function(objkey, objindex) {
                    if (isNotEmpty(arr[v]['id']) && arr[v]['id'] == obj[objindex]['id']) {
                        if (isNaN(arr[v]['id']))
                            arrResult.push({ 'id': arr[v]['id'], 'name': obj[objindex]['name'] });
                        else
                            arrResult.push({ 'id': parseInt(arr[v]['id']), 'name': obj[objindex]['name'] });
                    } 
                    else if (arr[v] == obj[objindex]['id']){
                        if (isNaN(arr[v]))
                            arrResult.push({ 'id': arr[v], 'name': obj[objindex]['name'] });
                        else
                            arrResult.push({ 'id': parseInt(arr[v]), 'name': obj[objindex]['name'] });
                    }
                });
            });

            if (typeof field.related_table != 'undefined' && field.related_table != '') {
                $scope[$scope.form_model][field.related_table][field.field_name] = arrResult;
            } else {
                $scope[$scope.form_model][field.field_name] = arrResult;
            }
        }
    }

    $scope.isCheckValid = function(obj) {
        if (obj) {
            if (typeof obj !== "object" && !Array.isArray(obj)) {
                return true;
            } else {
                if (Date.parse(obj)) {
                    return true;
                    // console.log('date - '+obj);
                } else {
                    for (var i in obj)
                        if (obj.hasOwnProperty(i))
                            return true;
                    return false;
                }
            }
        } else {
            return false;
        }
    };


    $scope.isRequiredField = function(field) {

            if (typeof field == 'undefined') {
                return false;
            }

            if (field.is_required) {
                return true;
            }

            var field_name = field.field_name;
            
            if(field.field_name == 'show_client_vendor' && field.related_table == 'jobs' && field.field_type == 'checkbox'){
                if(typeof $scope.createJobData !== 'undefined') {
                    if($scope.createJobData['jobs']['job_hiring_type']=='1'){
                        return false;
                    }
                }
            }
            if ($scope.defined_required_fields.indexOf(field_name) != -1) {
                return true;
            }

            return false;
        }

    $scope.getStatesListDropdownOptions = function(field,bulk_form_id='') {

        return getStatesListDropdownOptionsFunc(field, $scope,bulk_form_id);
    }

    $scope.getTimezoneListDropdownOptions = function(field,bulk_form_id='') {
        return getTimezoneListDropdownOptionsFunc(field, $scope,bulk_form_id);
    }

    

    $scope.setValidationErrorsForCustomForm = function() {

        angular.forEach($scope[$scope.form_name].$$controls, function(inputEle) {
            var field_name = inputEle.$name;


            if (typeof field_name == 'undefined' || field_name == '') {
                return true;
            }
            $scope['validation_errors'][$scope.form_name][field_name] = false;
            if (typeof $scope[$scope.form_name][field_name] != 'undefined' && Object.keys($scope[$scope.form_name][field_name].$error).length > 0) {
                $scope['validation_errors'][$scope.form_name][field_name] = true;
            }
        });
    }

    $scope.setValidationErrorsForMultiSectionForm = function() {
        angular.forEach($scope[$scope.form_name].form, function(value, key) {
            $scope['validation_errors'][$scope.form_name][key] = {};
            if(isNotEmpty(value) && isNotEmpty(value.$$controls))
            {
                angular.forEach(value.$$controls, function(inputEle) {
                    var field_name = inputEle.$name;
    
                    if (typeof field_name == 'undefined' || field_name == '') {
                        return true;
                    }                
                    $scope['validation_errors'][$scope.form_name][key][field_name] = false;
                    if (Object.keys($scope[$scope.form_name].form[key][field_name].$error).length > 0) {
                        $scope['validation_errors'][$scope.form_name][key][field_name] = true;
                    }

                    if(field_name =='city'){
                        if(isEmpty($scope[$scope.form_name].form[key][field_name].$viewValue) && ($scope[$scope.form_name].form[key][field_name].$$attr.required || $scope[$scope.form_name].form[key][field_name].$$scope.fieldRequired)){
                            $scope['validation_errors'][$scope.form_name][key][field_name] = true;
                            $scope[$scope.form_name]['form'][key][field_name].$invalid = true;
                            $scope[$scope.form_name]['form'][key][field_name].$valid = false;
                            $scope[$scope.form_name]['form'][key].$invalid = true;
                            $scope[$scope.form_name]['form'][key].$valid = false;
                        }
                    }
                });
            }
           
        });
    }

    $scope.setDateFormat = function(field, inputdata) {
        return setDateFormatFunc(field, inputdata, $scope);
    }

    $scope.isAddMoreVisible = function(section) {
        var isVisible = false;
        angular.forEach(section['cnf_form_field'], function(fieldObj) {
            if ($scope.isFieldVisible(fieldObj)) {
                isVisible = true;
                return false;
            }
        });


        if (section.table_name=='assignment_billing_information' || section.table_name=='job_pay_details' || section.table_name=='candidate_expected_pay_details' || section.table_name=='requisition_pay_details') {
            return isVisible  && section.is_multiple == 0;
        }

        return isVisible && section.is_multiple == 1;
    }

    $scope.convertNumberToString = function(fields_obj) {
        angular.forEach(fields_obj, function(fields_arr, obj_index) {
            angular.forEach(fields_arr, function(field) {
                if (isObject($scope[$scope.form_model][obj_index])) {
                    $scope[$scope.form_model][obj_index][field] = returnAsString($scope[$scope.form_model][obj_index][field]);
                }
            });
        });
    }

    $scope.formatNumberDecimals = function(number_field_obj) {
        var fixed_decimals = 8;

        angular.forEach(number_field_obj, function(number_field_arr, obj_index) {
            angular.forEach(number_field_arr, function(number_field) {

                if (angular.isArray($scope[$scope.form_model][obj_index])) {
                    angular.forEach($scope[$scope.form_model][obj_index], function(loop_obj, key) {
                        if (typeof $scope[$scope.form_model][obj_index][key][number_field] != 'undefined' &&
                            isNotEmpty($scope[$scope.form_model][obj_index][key][number_field])
                        ) {
                            $scope[$scope.form_model][obj_index][key][number_field] = 
                                roundToFixedDecimals($scope[$scope.form_model][obj_index][key][number_field]);
                        }
                    });
                } else if (isObject($scope[$scope.form_model][obj_index])) {
                    if (isNotEmpty($scope[$scope.form_model][obj_index][number_field])) {
                        $scope[$scope.form_model][obj_index][number_field] = 
                            roundToFixedDecimals($scope[$scope.form_model][obj_index][number_field]);
                    }
                }
            });
        });
    }

    $scope.convertNumberToString({
        'assignment_documents' : ['status'],
        'resumesform' : ['source_id', 'mark_as_default'],
        'account_documents' : ['document_type'],
        'candidate_document_details' : ['document_type'],
        'employee_documents' : ['document_type'],
        'project_documents' : ['document_type'],
        'job_pay_details' : ['mark_as_default'],
        'requisition_pay_details' : ['mark_as_default'],
        'candidate_expected_pay_details' : ['mark_as_default'],
        'account_billing_addresses':['mark_as_default'],
        'account_shipping_addresses':['mark_as_default']

    });

    $scope.selectedCustomLocation = function(selected, bulk_form_id='') {
        if (selected.originalObject) 
        {
            selected_country = selected.originalObject.country_id;
            selected_state = selected.originalObject.state_id;
            selected_statename = selected.originalObject.statename;
            selected_city = selected.originalObject.city;
            selected_zip = '';
            selected_timezone = '';

            if (selected.originalObject.zip) 
            {
                selected_zip = selected.originalObject.zip;
            }
            if (selected.originalObject.timezone) 
            {
                selected_timezone = selected.originalObject.timezone;
            }

            if(isEmpty(selected_city))
            {
                selected_city = selected.searchStr;
            }

            angular.element(document.querySelector('#'+selected.customId)).value = selected_city;

            /*$scope[$scope.form_model]['city'] = selected_city;
            $scope[$scope.form_model]['country'] = selected_country;
            $scope[$scope.form_model]['zip_code'] = selected_zip;*/

            if(bulk_form_id!=''){
                if(typeof $scope[$scope.form_model][bulk_form_id]['account_contacts'] !== 'undefined') {
                    $scope[$scope.form_model][bulk_form_id]['account_contacts']['country'] = selected_country;
                    $scope[$scope.form_model][bulk_form_id]['account_contacts']['state']= selected_state;
                    $scope[$scope.form_model][bulk_form_id]['account_contacts']['city']= selected_city;
                    $scope[$scope.form_model][bulk_form_id]['account_contacts']['postal_code']= selected_zip;
    
                    delete $scope[$scope.form_model][bulk_form_id]['account_contacts']['zip_code'];
                }
                else if(typeof $scope[$scope.form_model][bulk_form_id]['account_billing_addresses'] !== 'undefined') {
                    $scope[$scope.form_model][bulk_form_id]['account_billing_addresses']['country'] = selected_country;
                    $scope[$scope.form_model][bulk_form_id]['account_billing_addresses']['state']= selected_state;
                    $scope[$scope.form_model][bulk_form_id]['account_billing_addresses']['city']= selected_city;
                    $scope[$scope.form_model][bulk_form_id]['account_billing_addresses']['postal_code']= selected_zip;
                    console.log($scope[$scope.form_model][bulk_form_id]['account_billing_addresses']);return;
    
                    delete $scope[$scope.form_model][bulk_form_id]['account_billing_addresses']['zip_code'];
                }
                else if(typeof $scope[$scope.form_model][bulk_form_id]['account_shipping_addresses'] !== 'undefined') {
                    $scope[$scope.form_model][bulk_form_id]['account_shipping_addresses']['country'] = selected_country;
                    $scope[$scope.form_model][bulk_form_id]['account_shipping_addresses']['state']= selected_state;
                    $scope[$scope.form_model][bulk_form_id]['account_shipping_addresses']['city']= selected_city;
                    $scope[$scope.form_model][bulk_form_id]['account_shipping_addresses']['postal_code']= selected_zip;
    
                    delete $scope[$scope.form_model][bulk_form_id]['account_shipping_addresses']['zip_code'];
                } else if(typeof $scope[$scope.form_model][bulk_form_id]['users'] !== 'undefined') {
                    if (selected.customId == 'user_city') {
                        if (isEmpty($scope[$scope.form_model][bulk_form_id]['user_addresses'])) {
                            $scope[$scope.form_model][bulk_form_id]['user_addresses'] = {};
                        }
                        $scope[$scope.form_model][bulk_form_id]['user_addresses']['user_city'] = selected_city;
                        $scope[$scope.form_model][bulk_form_id]['user_addresses']['user_country'] = selected_country;
                        $scope[$scope.form_model][bulk_form_id]['user_addresses']['user_state'] = selected_state;
                        delete $scope[$scope.form_model][bulk_form_id]['user_addresses']['zip_code'];
                    }      
                } else if(typeof $scope[$scope.form_model][bulk_form_id]['user_emergency_contacts'] !== 'undefined'){
                    if(selected.customId == 'emergency_city') 
                    {
                         custom_city = 'emergency_city';
                         custom_country = 'emergency_country';
                         custom_state = 'emergency_state';
                         index = "user_emergency_contacts";
                    } 
                    $scope[$scope.form_model][bulk_form_id][index][custom_city] = selected_city;
                    $scope[$scope.form_model][bulk_form_id][index][custom_country] = selected_country;
                    $scope[$scope.form_model][bulk_form_id][index][custom_state] = selected_state;
                    delete $scope[$scope.form_model][bulk_form_id][index]['zip_code'];
                }
                else if(typeof $scope[$scope.form_model][bulk_form_id]['pool_jobs'] !== 'undefined'){
                    $scope[$scope.form_model][bulk_form_id]['pool_jobs']['country'] = selected_country;
                    $scope[$scope.form_model][bulk_form_id]['pool_jobs']['state']= selected_state;
                    $scope[$scope.form_model][bulk_form_id]['pool_jobs']['city']= selected_city;
                }
                else if(typeof $scope[$scope.form_model][bulk_form_id]['leads'] !== 'undefined'){
                    $scope[$scope.form_model][bulk_form_id]['leads']['country'] = selected_country;
                    $scope[$scope.form_model][bulk_form_id]['leads']['state']= selected_state;
                    $scope[$scope.form_model][bulk_form_id]['leads']['city']= selected_city;
                    $scope[$scope.form_model][bulk_form_id]['leads']['postal_code']= selected_zip;
                }
                else if(typeof $scope[$scope.form_model][bulk_form_id]['candidate_work_details'] !== 'undefined') {
                    $scope[$scope.form_model][bulk_form_id]['candidate_work_details']['work_city'] = selected_city;
                    $scope[$scope.form_model][bulk_form_id]['candidate_work_details']['work_country'] = selected_country;
                    $scope[$scope.form_model][bulk_form_id]['candidate_work_details']['work_state'] = selected_state;
                }
                else if(typeof $scope[$scope.form_model][bulk_form_id]['account_interview_address'] !== 'undefined') {
                    $scope[$scope.form_model][bulk_form_id]['account_interview_address']['country'] = selected_country;
                    $scope[$scope.form_model][bulk_form_id]['account_interview_address']['state']= selected_state;
                    $scope[$scope.form_model][bulk_form_id]['account_interview_address']['city']= selected_city;
                    $scope[$scope.form_model][bulk_form_id]['account_interview_address']['postal_code']= selected_zip;
                    $scope[$scope.form_model][bulk_form_id]['account_interview_address']['timezone']= selected_timezone;
                    console.log(selected);
                }
                else
                {
                    $scope[$scope.form_model][bulk_form_id]['state'] = [];
                    data = { 'id': selected_state, 'name': selected_statename };
                    $scope[$scope.form_model][bulk_form_id]['state'].push(data);    
    
                    $scope[$scope.form_model][bulk_form_id]['city'] = selected_city;
                    $scope[$scope.form_model][bulk_form_id]['country'] = selected_country;
                    $scope[$scope.form_model][bulk_form_id]['zip_code'] = selected_zip;
                }
            }else{
                if(typeof $scope[$scope.form_model]['account_contacts'] !== 'undefined') {
                    $scope[$scope.form_model]['account_contacts']['country'] = selected_country;
                    $scope[$scope.form_model]['account_contacts']['state']= selected_state;
                    $scope[$scope.form_model]['account_contacts']['city']= selected_city;
                    $scope[$scope.form_model]['account_contacts']['postal_code']= selected_zip;
    
                    delete $scope[$scope.form_model]['account_contacts']['zip_code'];
                }
                else if(typeof $scope[$scope.form_model]['account_billing_addresses'] !== 'undefined') {
                    $scope[$scope.form_model]['account_billing_addresses']['country'] = selected_country;
                    $scope[$scope.form_model]['account_billing_addresses']['state']= selected_state;
                    $scope[$scope.form_model]['account_billing_addresses']['city']= selected_city;
                    $scope[$scope.form_model]['account_billing_addresses']['postal_code']= selected_zip;
                    console.log($scope[$scope.form_model]['account_billing_addresses']);return;
    
                    delete $scope[$scope.form_model]['account_billing_addresses']['zip_code'];
                }
                else if(typeof $scope[$scope.form_model]['account_shipping_addresses'] !== 'undefined') {
                    $scope[$scope.form_model]['account_shipping_addresses']['country'] = selected_country;
                    $scope[$scope.form_model]['account_shipping_addresses']['state']= selected_state;
                    $scope[$scope.form_model]['account_shipping_addresses']['city']= selected_city;
                    $scope[$scope.form_model]['account_shipping_addresses']['postal_code']= selected_zip;
    
                    delete $scope[$scope.form_model]['account_shipping_addresses']['zip_code'];
                } else if(typeof $scope[$scope.form_model]['users'] !== 'undefined') {
                    if (selected.customId == 'user_city') {
                        if (isEmpty($scope[$scope.form_model]['user_addresses'])) {
                            $scope[$scope.form_model]['user_addresses'] = {};
                        }
                        $scope[$scope.form_model]['user_addresses']['user_city'] = selected_city;
                        $scope[$scope.form_model]['user_addresses']['user_country'] = selected_country;
                        $scope[$scope.form_model]['user_addresses']['user_state'] = selected_state;
                        delete $scope[$scope.form_model]['user_addresses']['zip_code'];
                    }      
                } else if(typeof $scope[$scope.form_model]['user_emergency_contacts'] !== 'undefined'){
                    if(selected.customId == 'emergency_city') 
                    {
                         custom_city = 'emergency_city';
                         custom_country = 'emergency_country';
                         custom_state = 'emergency_state';
                         index = "user_emergency_contacts";
                    } 
                    $scope[$scope.form_model][index][custom_city] = selected_city;
                    $scope[$scope.form_model][index][custom_country] = selected_country;
                    $scope[$scope.form_model][index][custom_state] = selected_state;
                    delete $scope[$scope.form_model][index]['zip_code'];
                }
                else if(typeof $scope[$scope.form_model]['pool_jobs'] !== 'undefined'){
                    $scope[$scope.form_model]['pool_jobs']['country'] = selected_country;
                    $scope[$scope.form_model]['pool_jobs']['state']= selected_state;
                    $scope[$scope.form_model]['pool_jobs']['city']= selected_city;
                }
                else if(typeof $scope[$scope.form_model]['leads'] !== 'undefined'){
                    $scope[$scope.form_model]['leads']['country'] = selected_country;
                    $scope[$scope.form_model]['leads']['state']= selected_state;
                    $scope[$scope.form_model]['leads']['city']= selected_city;
                    $scope[$scope.form_model]['leads']['postal_code']= selected_zip;
                }
                else if(typeof $scope[$scope.form_model]['candidate_work_details'] !== 'undefined') {
                    $scope[$scope.form_model]['candidate_work_details']['work_city'] = selected_city;
                    $scope[$scope.form_model]['candidate_work_details']['work_country'] = selected_country;
                    $scope[$scope.form_model]['candidate_work_details']['work_state'] = selected_state;
                }
                else if(typeof $scope[$scope.form_model]['account_interview_address'] !== 'undefined') {
                    $scope[$scope.form_model]['account_interview_address']['country'] = selected_country;
                    $scope[$scope.form_model]['account_interview_address']['state']= selected_state;
                    $scope[$scope.form_model]['account_interview_address']['city']= selected_city;
                    $scope[$scope.form_model]['account_interview_address']['postal_code']= selected_zip;
                    $scope[$scope.form_model]['account_interview_address']['timezone']= selected_timezone;
                }
                else
                {
                    $scope[$scope.form_model]['state'] = [];
                    data = { 'id': selected_state, 'name': selected_statename };
                    $scope[$scope.form_model]['state'].push(data);    
    
                    $scope[$scope.form_model]['city'] = selected_city;
                    $scope[$scope.form_model]['country'] = selected_country;
                    $scope[$scope.form_model]['zip_code'] = selected_zip;
                }
            }
        } else if(typeof selected.originalObject == 'undefined'){
            selected_city = '';
            angular.element(document.querySelector('#'+selected.customId)).value = selected_city;
            if(bulk_form_id!=''){
                if(typeof $scope[$scope.form_model][bulk_form_id]['account_interview_address'] !== 'undefined' && selected.customId == 'city') {
                    $scope[$scope.form_model][bulk_form_id]['account_interview_address']['city'] = selected_city;
                }
                else if(typeof $scope[$scope.form_model][bulk_form_id]['account_shipping_addresses'] !== 'undefined' && selected.customId == 'city') {
                    $scope[$scope.form_model][bulk_form_id]['account_shipping_addresses']['city'] = selected_city;
                }
                else if(typeof $scope[$scope.form_model][bulk_form_id]['account_billing_addresses'] !== 'undefined' && selected.customId == 'city') {
                    $scope[$scope.form_model][bulk_form_id]['account_billing_addresses']['city'] = selected_city;
                }
            }
        } 
    }
});

App.controller('PwdConfirmationModalInstanceCtrl',function($scope,items,$controller,$uibModalInstance,HireApiServices){
    console.log(items);
    $scope.user_password = {};
    $scope.user_password.field_value = '';
    $scope.errorSubmit = 0;

    $scope.verifyPwdConfirmation = function() {
        if($scope.passwordForm.$valid)
        {
            $scope.user_password.record_id = items.id;
            $scope.user_password.record_type = items.type;
            $scope.user_password.field_name = items.field_name;
            $scope.user_password.field_type = items.field_type;

            HireApiServices.post('user/preferences/verifyPassword', $scope.user_password)
            .then(function(response) {
                response_data = response.data;
                if(response_data.status == 1)
                {
                    //$scope.user_password.field_value = response_data.field_value;
                    $uibModalInstance.close(response_data.data);
                }
                else
                {
                    showAlertMessage(response_data);
                }
            }, function(error) {
                showAlertMessage({'status':0, 'message':"{{trans('messages.invalid_operation')}}"});
            });
        }
        else 
        {
          $scope.errorSubmit = 1;
        }       
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

App.controller('addDocumentKeywordModalCtrl', function ($scope, $uibModalInstance, $http, HrApiServices) {
    $scope.addDocumentTypeKeyword = function () {
        $scope.errorSubmit = 1;
        
        if ($scope.addDocumentKeywordForm.$valid) {

            HrApiServices.post('documents/addDocumentTypeKeyword', $scope.KeywordTypeData)
            .then(function(response) {
                showAlertMessage({'status' : response.data.success, 'message' : response.data.message});

                if (response.data.success) {
                    $uibModalInstance.close(response.data);
                }
            }, function() {
                ajaxErrorCallBackFunc();
            });
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});