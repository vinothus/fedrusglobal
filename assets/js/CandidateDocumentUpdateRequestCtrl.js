var popupScopeObj;
function openInNewWindow(url, options) {
    var openedWindow = window.open(url, options.name);
    if (!openedWindow || openedWindow.closed || typeof openedWindow.closed == 'undefined') {
        showAlertMessage({
            status: 0,
            message: "Popup blocked, Please allow popup to continue."
        });
    }

    return openedWindow;
}

App.controller('CandidateDocumentUpdateRequestCtrl', function ($scope,$rootScope,$filter,$uibModal,$http,$location,ConfirmAlert, $controller,$rootScope,HireApiServices) {
    
    $scope.saveCandidateDocumentUpdateRequest = function(additionalData = '') {
        
        var stages = additionalData.job_workflow_stages.filter(item => item.trigger_type != 'after_previous_stage').map(item => { return item.id; });
        formres = new FormData();
        var request_data = {
            stage_ids:!isEmpty(additionalData.stage_ids) ? additionalData.stage_ids : stages,
            can_document_data: additionalData.can_document_data,
            token: $scope.SessionToken,
            documents: additionalData.documents,
            request_id: additionalData.request_id,
            deletedDocumentsObj: additionalData.deletedDocumentsObj,
            can_documents: {},
            form_fields:{},
        };
        
        if(isNotEmpty(additionalData.CandidateFormFields)){
            angular.forEach(additionalData.CandidateFormFields, function (value, key){
                request_data['form_fields'][value['stage_id']] = value;
            });
        };
        if (isNotEmpty(additionalData.CandidateRequestTemplates)) {
            angular.forEach(additionalData.CandidateRequestTemplates, function (templateObj, key) {
                    formres.append(templateObj.form_data_key, templateObj.fileDetails);
            });
        }
        if (isNotEmpty(additionalData.CandidateRequestDocuments)) {
            angular.forEach(additionalData.CandidateRequestDocuments, function (documentObj, key) {
                doc_key = generateUniqueId();
                request_data['can_documents'][doc_key] = {
                    document_name: documentObj.document_name,
                    status: documentObj.status,
                    document_type: documentObj.document_type,
                    expiry_date: documentObj.expiry_date,
                    stage_id: documentObj.stage_id
                };
                if (typeof documentObj.attachment_name != 'undefined') {
                    formres.append("can_document[" + doc_key + "]", documentObj.attachment_name);
                }
            });
        }

        formres.append('data', angular.toJson(request_data));
        formres.append('login_access_token', $scope.SessionToken);
        formres.append('sub_domain', $rootScope.sub_domain);
        formres.append('request_id', additionalData.request_id);
        if(!isEmpty(additionalData.is_save)){
            formres.append('is_save', additionalData.is_save);
        }
        url = "candidate_application/saverequestdetails";   
        HireApiServices.postAttachment(url, formres).then(function(response) {
            $scope.loading = 0;
            message_data = response.data;
            showAlertMessage(message_data);
           $scope.getCandidateDocumentsList();
        }, function(error) {
            $scope.loading = 0;

            showAlertMessage({
                status : 0,
                message : 'Something went wrong.'
            });
        });
    }
    
    $scope.openCandidateDocumentRequestPopup = function (reqData=[],doc_status='') 
    {        
        if(!isEmpty($rootScope.redirect_token) && isEmpty(reqData)) {
            var popup_data = {'login_access_token':$scope.SessionToken,
            'sub_domain':$rootScope.sub_domain,
            'stage_token' : $rootScope.redirect_token
            };
        }
        else {
            var popup_data = {'login_access_token':$scope.SessionToken,
             'sub_domain':$rootScope.sub_domain,
                job_id: reqData.job_id,
                workflow_id: reqData.workflow_id,
                request_id: reqData.id
            };
            if(!isEmpty(reqData['stage_status'])) {
                popup_data['status'] = reqData['stage_status'];
            }
        }
        if(!isEmpty(doc_status)) {
            popup_data['document_status'] = doc_status;
        }
        HireApiServices.post('candidate_application/CanDocumentUpdateRequest',popup_data)
                .then(function success(response) {
                    var message_data = response.data;
                    if (message_data.status) {
                        popup_data.requestObj = message_data.data;
                        popup_data.portal_styles = $scope.portal_styles;
                        if(!isEmpty($rootScope.redirect_token)) {
                            delete($rootScope.redirect_token);
                        }
                        var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'candidateDocumentUpdateRequestModalTitle',
                        ariaDescribedBy: 'candidateDocumentUpdateRequestModalBody',
                        templateUrl: 'candidateDocumentUpdateRequest.html',
                        controller: 'CandidateDocumentUpdateRequestPopupCtrl',
                        size: 'xxl modal-dialog-centered modal-dialog-scrollable w-80',
                        keyboard: false,
                        backdrop: 'static',
                        resolve: {
                            items: popup_data
                        }
                        });
                        modalInstance.result.then(function (workflow_data) {
                            if(!isEmpty(workflow_data)){
                                $scope.saveCandidateDocumentUpdateRequest(workflow_data);
                            }
                        }, function () {
                            // 
                        });
                    }
                    else {
                        showAlertMessage(message_data);
                    }
                });
    }
       
});

var canDocumentUpdateRequestModalInstance;
App.controller('CandidateDocumentUpdateRequestPopupCtrl', function($scope, $rootScope, $controller, $uibModalInstance, ConfirmAlert,
    $filter, items, dateFilter, HireApiServices, OnboardingApiServices) {
    canDocumentUpdateRequestModalInstance = $uibModalInstance;
    popupScopeObj = $scope;
    
    $scope.SessionToken = items.login_access_token;
    BASE_PATH = 'careers';
    $scope.BASE_PATH = BASE_PATH;
    $scope.portal_styles = items.portal_styles;

    $scope.form_submitted = 0;
    if (isNotEmpty(items.canDocumentUpdateRequest)) {
        $scope.canDocumentUpdateRequest = items.canDocumentUpdateRequest;
    } else {
        $scope.canDocumentUpdateRequest = {
            form_data : {
                fields : {}, sections : {},
                required_fields : {},
                required_sections : {}
            }
        };
    }

    $scope.job_id = items.job_id;
    $scope.document_status = !isEmpty(items.document_status) ? items.document_status : '';
    var canDocumentUpdateRequestData = items.requestObj;
    $scope.document_types_options = canDocumentUpdateRequestData.document_types_options;
    $scope.templates = canDocumentUpdateRequestData.templates;
    $scope.document_statuses_options = canDocumentUpdateRequestData.document_statuses_options;
    $scope.job_workflow_stages = canDocumentUpdateRequestData.job_workflow_stages;
    $scope.currentStage = canDocumentUpdateRequestData.currentStage;
    $scope.request_id = canDocumentUpdateRequestData.request_id;
    $scope.assessment_details = canDocumentUpdateRequestData.assessment_details;
    $scope.form_fields = canDocumentUpdateRequestData.form_fields;
    if(!isEmpty(canDocumentUpdateRequestData.submitted_docs)) {
        $scope.submitted_docs = canDocumentUpdateRequestData.submitted_docs;
    }
	$scope.stage_ids = {};
    $scope.stage_ids[$scope.currentStage.id] = $scope.currentStage.id;
    $scope.nextStage = $scope.previousStage = {};
    $scope.nextStage_trigger_type = '';
    $scope.nextStage_mandatory = 0;
    $scope.has_previous_stage = 0;
    $scope.stage_templates = [];
    $scope.stage_assessments = [];
    $scope.stage_form_fields = [];
    $scope.stage_templates[$scope.currentStage.id] = $scope.templates;
    $scope.stage_assessments[$scope.currentStage.id] = $scope.assessment_details;
    if(isNotEmpty($scope.form_fields)){
        $scope.stage_form_fields[$scope.currentStage.id] = $scope.form_fields;
    };
    var next_ind = $scope.job_workflow_stages.findIndex(function (fval) { return fval.id == $scope.currentStage.id });
    if (next_ind > -1 && !isEmpty($scope.job_workflow_stages[next_ind + 1])) {
        $scope.nextStage = $scope.job_workflow_stages[next_ind + 1];
        $scope.nextStage_trigger_type = $scope.nextStage.trigger_type;
        if($scope.nextStage_trigger_type == 'along_previous_stage'){
            $scope.nextStage_mandatory = $scope.nextStage.is_mandatory;
        }
    }
    $scope.country_id = '';
    if(isNotEmpty(canDocumentUpdateRequestData['company_settings']))
    {
        $rootScope.initial_country = canDocumentUpdateRequestData['company_settings']['initial_country'];
        $scope.country_id = canDocumentUpdateRequestData['company_settings']['country_id'];
        INITIAL_COUNTRY = canDocumentUpdateRequestData['company_settings']['initial_country'];
    }
    $scope.configFormArr = {};
    
    $scope.form_name = 'can_document_update_form';
    $scope.form_model = 'candidateDocumentUpdateRequestData'; 
    
    $scope[$scope.form_model] = {};

    if (isNotEmpty(canDocumentUpdateRequestData.profile_data)) {
        $scope[$scope.form_model] = canDocumentUpdateRequestData.profile_data;
    }
    $scope.allowed_file_types = canDocumentUpdateRequestData.allowed_file_types;
    
    if (isEmpty($scope[$scope.form_model])) {
        $scope[$scope.form_model] = {};
    }
    
    $scope[$scope.form_name] = {};
    $scope.total_file_size = 0;
    
    $scope.CandidateRequestDocuments = {}; 
    $scope.save_form_fields_data = []; 
    $scope.medaitior_form_feilds = [];
    
    $scope.CandidateRequestTemplates = [];
    $scope.temp_documents = [];

    angular.extend(this, $controller('CommonCandidateDocumentUpdateRequestCtrl', { $scope: $scope, $rootScope:$rootScope }));
    var valid = true;
    $scope.updateCandidateDocumentRequest = function(is_return= '') {
        if($scope.total_file_size > 8388608){
            showAlertMessage({
                status : 0,
                message : "Total Document(s) File(s) size can't be more than 8 MB"
            });
            return false;
        }
        $scope.is_submitted = true;
        $scope.stage_templates[$scope.currentStage.id] = angular.copy($scope.templates);     

        valid = $scope.prepareDataToSave();
        if (valid == false) {
            return false;
        }
        angular.forEach($scope.stage_templates, function(stage_temp, stage_key) {
            candidateTemplatesData = $scope.validateCandidateTemplates(stage_temp);
            if (candidateTemplatesData === false) {
                valid = candidateTemplatesData;
                return;
            }
            if(!isEmpty(candidateTemplatesData.documents)) {
                $scope.temp_documents = $scope.temp_documents.concat(candidateTemplatesData.documents.filter(item => !$scope.temp_documents.find(doc => doc.id == item.id)));
            }
        });        
        if (valid === false) {
            return false;
        }

        $scope.stage_form_fields[$scope.currentStage.id] = angular.copy($scope.form_fields); 
        var is_form_valid = true;
        angular.forEach($scope.stage_form_fields,function(stage_fields,stage_key){
            if(is_form_valid){
                angular.forEach(stage_fields,function(question,key){
                    if(isEmpty(question.answer)){
                        is_form_valid = false;
                        return;
                    }
                    if(is_form_valid && question.question_type=='multiselect'){
                        if(Object.values(question.answer).indexOf(true) > -1){
                            is_form_valid = true;
                        }else{
                            is_form_valid = false;
                        }
                    }
                });
            }else{
                return;
            }
        });
        if(!is_form_valid){
            showAlertMessage({
                status : 0,
                message : "Please Fill All the Field(s)"
            });
            valid = false;
            return false;
        }else{
            valid=true;
        }
        if(!isEmpty($scope.form_fields)){
            $scope.form_fields['stage_id'] = $scope.currentStage.id;
            $scope.medaitior_form_feilds[$scope.currentStage.id] = $scope.form_fields;
            $scope.save_form_fields_data.push($scope.form_fields);
        }
        angular.forEach($scope.stage_assessments, function(stage_assmt, stage_tkey) {
            if (stage_assmt.status == 'invited') {
                showAlertMessage({
                    status : 0,
                    message : "Please complete Assessment(s)"
                });
                valid = false;
                return false;
            }
        });

        if (valid === false) {
            return false;
        } 

        if(!isEmpty(is_return)){
            var request_data = {
                can_document_data: $scope[$scope.form_model],
                documents:$scope.temp_documents,
                CandidateRequestTemplates:$scope.CandidateRequestTemplates,
                CandidateRequestDocuments: $scope.CandidateRequestDocuments,
                CandidateFormFields :$scope.save_form_fields_data,
                job_workflow_stages : $scope.job_workflow_stages,
                request_id : $scope.request_id,
                deletedDocumentsObj: $scope.deletedDocumentsObj,
            };
            console.log(request_data);
            $uibModalInstance.close(request_data);
        }
    }
    $scope.is_required = function(question,index){
        if($scope.currentStage.is_mandatory){
            if(question.question_type == 'multiselect'){
                checkbox_field_obj = $scope.form_fields[index]['answer'];
                if(isNotEmpty(checkbox_field_obj) && Object.values(checkbox_field_obj).indexOf(true) > -1){
                    return false;
                }
            }
            return true;
        }else{
            return false;
        }
    }
    $scope.nextCandidateDocumentRequest = function() {
        var valid = $scope.saveCandidateDocumentRequest(false);
        // $scope[$scope.form_name] = {};

        if(valid){
            $scope.is_previous = 0;
            $scope.getNextStageDetails($scope.nextStage.id);
        }
    }

    $scope.is_changed = false;
    $scope.candidate_documents = [];
    $scope.saveCandidateDocumentRequest = function (is_save = true) {
        var is_valid = true;
        $scope.is_submitted = true;

        if(!isEmpty($scope.currentStage.is_mandatory)) {
            valid = $scope.prepareDataToSave(false);
            if (valid == false) {
                return false;
            }
            candidateTemplatesData = $scope.validateCandidateTemplates($scope.templates,false);

            if(!isEmpty($scope.uploaderCandidateDocumentErrorMessage)) {
                showAlertMessage({
                    status : 0,
                    message : $scope.uploaderCandidateDocumentErrorMessage
                });
                return false;
            }
            if (candidateTemplatesData === false) {
                valid = candidateTemplatesData;
            }
            if (valid == false) {
                return false;
            }
        } else {
            $scope.is_submitted = false;
            $scope.prepareDataToSave(true);
            candidateTemplatesData = $scope.validateCandidateTemplates($scope.templates,true);
        }

        if (!isEmpty(candidateTemplatesData.documents)) {
            $scope.temp_documents = $scope.temp_documents.concat(candidateTemplatesData.documents.filter(item => !$scope.temp_documents.find(doc => doc.id == item.id)));
        }
        if (!isEmpty($scope.valid_docs)) {
            $scope.candidate_documents = $scope.candidate_documents.concat($scope.valid_docs.filter(item => !$scope.candidate_documents.find(doc => doc.document_type == item.document_type)));
        }
        if($scope.currentStage.is_mandatory) {
            if(!$scope[$scope.form_name]['form'].$valid){
                $scope.is_submitted = true;
                return false;
            }
            if(!isEmpty($scope.CandidateRequestDocuments)) {
                angular.forEach($scope.CandidateRequestDocuments, function (crd_val, crd_key) {
                    if($scope.document_types_options[crd_key]){
                        if(!crd_val.original_name) {
                            is_valid = false;
                        }
                    }
                    
                });
            }
            if(is_valid && !isEmpty($scope.templates)) {
                angular.forEach($scope.templates, function (tem_val, tem_key) {
                    if(!tem_val.is_configured && tem_val.digi_sign) {
                        is_valid = false;
                    }
                });
            }
            if(is_valid && !isEmpty($scope.assessment_details)) {
                if($scope.assessment_details.status=='invited') {
                    showAlertMessage({
                        status : 0,
                        message : 'Please complete Assessment(s)'
                    });
                    is_valid = false;
                    return false;
                }
            }
        } else {
            var submitted_docs_empty = true;
            var submitted_templates_empty = true;
            if(isNotEmpty($scope.submitted_docs) && !isEmpty($scope.submitted_docs[$scope.currentStage.id])){
                var data = $scope.submitted_docs[$scope.currentStage.id];
                if(!isEmpty(data['documents'])){
                    submitted_docs_empty = false;
                }
                if(!isEmpty(data['templates'])){
                    submitted_templates_empty = false;
                }
            }
            if ((!isEmpty($scope.document_types_options) && isEmpty($scope.valid_docs) && submitted_docs_empty) && (!isEmpty($scope.templates) && isEmpty($scope.temp_documents) && submitted_templates_empty)) {
                is_valid = false;
            }
        }
        $scope.form_changed = false;
        if(!isEmpty($scope.form_fields)){
            angular.forEach($scope.form_fields,function(value,key){
                if(!isEmpty(value['answer']) && !$scope.form_changed){
                    $scope.is_changed = true;
                    $scope.form_changed = true;
                    $scope.form_fields['stage_id'] = $scope.currentStage.id;
                    $scope.save_form_fields_data.push($scope.form_fields);
                    $scope.medaitior_form_feilds[$scope.currentStage.id] = $scope.form_fields;
                    return  true;
                }
            });
           
        }
        
        console.log(is_save, $scope.currentStage.is_mandatory, is_valid, $scope.is_changed);
        if(is_save && is_valid && isEmpty($scope.is_changed)) {
            $scope.cancel();
        }
        if ((is_save || $scope.currentStage.is_mandatory) && is_valid === false && !isEmpty($scope.is_changed)) {
            if(!isEmpty($scope.uploaderCandidateDocumentErrorMessage)) {
                showAlertMessage({
                    status : 0,
                    message : $scope.uploaderCandidateDocumentErrorMessage
                });
                return false;
            }
        }
        
        if ((is_save || $scope.currentStage.is_mandatory) && is_valid === false) {
            error_msg = "Please fill atleast one document in stage.";
            if($scope.currentStage.is_mandatory) {
                error_msg = "Please fill all the details to save.";
                if(!is_save) {
                    error_msg = "Please fill all the details to move to the next stage.";
                }
            }
            console.log(error_msg);
            showAlertMessage({
                status : 0,
                message : error_msg
            });
            return false;
        }
        if(is_save) {
            var request_data = {
                can_document_data: $scope[$scope.form_model],
                documents: $scope.temp_documents,
                CandidateRequestTemplates: $scope.CandidateRequestTemplates,
                CandidateRequestDocuments: $scope.candidate_documents,
                CandidateFormFields :$scope.save_form_fields_data,
                job_workflow_stages: $scope.job_workflow_stages,
                request_id: $scope.request_id,
                stage_ids: Object.keys($scope.stage_ids),
                deletedDocumentsObj: $scope.deletedDocumentsObj,
                is_save: 1
            };
            console.log(request_data);
            $uibModalInstance.close(request_data);
        }
        return true;
    }

    $scope.previousCandidateDocumentRequest = function() {
        var response = $scope.saveCandidateDocumentRequest(false);
        // if(response){
            $scope.is_previous = 1;
        
            var next_ind = $scope.job_workflow_stages.findIndex(function (fval) { return fval.id == $scope.currentStage.id });
            if (next_ind > -1 && !isEmpty($scope.job_workflow_stages[next_ind-1])) {
                prev_id = $scope.job_workflow_stages[next_ind-1]['id'];
            }
            $scope.getNextStageDetails(prev_id);
        // }
       
    }

    $scope.openAssessmentWindow = function(assessment) {
        if (assessment.url) {
            openInNewWindow(assessment.url, {
                name: assessment.title
            });
            // return false;
        }

        // return true;
    }

    $scope.createDocFromTemplate = function(template) {
        if (template.update_doc_recipient_url) {
            openInNewWindow(template.update_doc_recipient_url, {
                name: template.unique_id
            });
            return false;
        }

        if (!template.digi_sign) {
            return false;
        }

        var requestData = {
            template_id: template.unique_id,
            token: template.token
        };

        OnboardingApiServices.post('external/create_document_from_template', requestData).then(function (response) {
            if (isEmpty(response.data.success)) {
                showAlertMessage(response.data);
                return false;
            }

            if (response.data.success && isNotEmpty(response.data.data.document)) {
                var documentObj = response.data.data.document;
                angular.forEach($scope.templates, function (iterTemplate, index) {
                    if (isNotEmpty(iterTemplate.unique_id) && iterTemplate.unique_id == template.unique_id) {

                        $scope.is_changed = true;
                        $scope.templates[index]['parent_id'] = template.id;
                        $scope.templates[index]['parent_unique_id'] = template.unique_id;
                        $scope.templates[index]['id'] = documentObj.id;
                        $scope.templates[index]['created_document_id'] = documentObj.id;
                        $scope.templates[index]['created_document_unique_id'] = $scope.templates[index]['unique_id'] = documentObj.unique_id;
                    }
                });

                template.update_doc_recipient_url = response.data.data.update_doc_recipient_url;
                
                openInNewWindow(response.data.data.update_doc_recipient_url, {
                    name: template.unique_id
                });
            }
        });
    }

    $scope.getNextStageDetails = function (stage_id) {
        var popup_data = {'login_access_token':$scope.SessionToken, 'sub_domain':$rootScope.sub_domain, 'job_id':$scope.job_id, 'stage_id': stage_id, 'request_id':$scope.request_id};
        if (!isEmpty($scope.document_status)) {
            popup_data['document_status'] = $scope.document_status;
            if (!isEmpty($scope.submitted_docs) && !isEmpty($scope.submitted_docs[stage_id])) {
                if (!isEmpty($scope.submitted_docs[stage_id]['documents'])) {
                    if (isEmpty(popup_data['document_ids'])) {
                        popup_data['document_ids'] = [];
                    }
                    angular.forEach($scope.submitted_docs[stage_id]['documents'], function (doc) {
                        popup_data['document_ids'].push(doc['document_type']);
                    });
                }
                if (!isEmpty($scope.submitted_docs[stage_id]['templates'])) {
                    angular.forEach($scope.submitted_docs[stage_id]['templates'], function (doc) {
                        if (isEmpty(popup_data['template_ids'])) {
                            popup_data['template_ids'] = [];
                        }
                        if (doc['type'] == 'manual') {
                            popup_data['template_ids'].push(doc['id']);
                        }
                        else {
                            popup_data['template_ids'].push(doc['parent_id']);
                        }
                    });
                }
            }
        }
        HireApiServices.post('candidate_application/getNextStageCanDocument',popup_data)
            .then(function success(response) {
                var message_data = response.data;

                if (message_data.status) { 
                    $scope.previousStage = angular.copy($scope.currentStage);
                    $scope.stage_templates[$scope.previousStage.id] = angular.copy($scope.templates);     
                    $scope.stage_assessments[$scope.previousStage.id] = angular.copy($scope.assessment_details);  
                    if(isNotEmpty($scope.form_fields)){
                        $scope.stage_form_fields[$scope.previousStage.id]  = angular.copy($scope.form_fields);  
                    };
                    $scope.document_types_options = message_data.data.document_types_options;
                    $scope.templates = message_data.data.templates;
                    $scope.currentStage = message_data.data.currentStage;
                    $scope.stage_ids[$scope.currentStage.id] = $scope.currentStage.id;
                    $scope.assessment_details = message_data.data.assessment_details;
                    $scope.stage_assessments[$scope.currentStage.id] = $scope.assessment_details;     
                    $scope.form_fields  = message_data.data.form_fields; 
                    if(isNotEmpty($scope.form_fields)){
                        $scope.stage_form_fields[$scope.currentStage.id] = $scope.form_fields;    
                    };


                    $scope.nextStage = {};
                    $scope.nextStage_trigger_type = '';
                    $scope.nextStage_mandatory = 0;
                    var next_ind = $scope.job_workflow_stages.findIndex(function (fval) { return fval.id == $scope.currentStage.id });
                    if (next_ind > -1 && !isEmpty($scope.job_workflow_stages[next_ind+1])) {
                        $scope.nextStage = $scope.job_workflow_stages[next_ind+1];
                        $scope.nextStage_trigger_type = $scope.nextStage.trigger_type;
                        if($scope.nextStage_trigger_type == 'along_previous_stage'){
                            $scope.nextStage_mandatory = $scope.nextStage.is_mandatory;
                        }
                    }

                    if(!isEmpty($scope.medaitior_form_feilds[$scope.currentStage.id])){
                        $scope.form_fields  = $scope.medaitior_form_feilds[$scope.currentStage.id]; 
                        $scope.stage_form_fields[$scope.currentStage.id] = $scope.medaitior_form_feilds[$scope.currentStage.id]; 
                    }
                    /*if (next_ind > -1 && !isEmpty($scope.job_workflow_stages[next_ind-1])) {
                        $scope.previousStage = $scope.job_workflow_stages[next_ind-1];
                    }*/

                    $scope.has_previous_stage = (next_ind - 1) > -1 ? 1 : 0;
                    if(!isEmpty($scope.stage_templates[$scope.currentStage.id])) {
                        angular.forEach($scope.templates, function (templateObj, t_index) {
                            var pt_index = $scope.stage_templates[$scope.currentStage.id].findIndex(item => item.parent_id == templateObj.id);
                            if (pt_index > -1 && templateObj.digi_sign == true) {
                                $scope.templates[t_index] = $scope.stage_templates[$scope.currentStage.id][pt_index];
                            }
                        });
                    }

                    else {
                        if (!isEmpty($scope.submitted_docs) && !isEmpty($scope.submitted_docs[$scope.currentStage.id])) {
                            $scope.setDefaultData();
                        }
                    }
                }
            });
    }
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.setDefaultData = function () {
        if (!isEmpty($scope.submitted_docs[$scope.currentStage.id]['documents'])) {
            submitted_documents = $scope.submitted_docs[$scope.currentStage.id]['documents'];
            angular.forEach($scope.document_types_options, function (doc_type, d_ind) {
                doc = submitted_documents.find(item => item.document_type == d_ind);
                if (!isEmpty(doc)) {
                    // $scope.CandidateRequestDocuments[d_ind] = doc['details'];
                    $scope.CandidateRequestDocuments[d_ind] = {};
                    $scope.CandidateRequestDocuments[d_ind]['id'] = doc['id'];
                    $scope.CandidateRequestDocuments[d_ind]['document_name'] = doc['document_name'];
                    $scope.CandidateRequestDocuments[d_ind]['document_type'] = doc['document_type'];
                    $scope.CandidateRequestDocuments[d_ind]['expiry_date'] = doc['expiry_date'] ? new Date(doc['expiry_date']) : '';
                    $scope.CandidateRequestDocuments[d_ind]['original_name'] = doc['original_name'];
                    $scope.CandidateRequestDocuments[d_ind]['stage_id'] = doc['stage_id'];
                    $scope.CandidateRequestDocuments[d_ind]['status'] = doc['status'];
                    $scope.CandidateRequestDocuments[d_ind]['document_status'] = doc['document_status'];
                    $scope.CandidateRequestDocuments[d_ind]['is_submitted'] = true;
                }
            });
        }
        if (!isEmpty($scope.submitted_docs[$scope.currentStage.id]['templates'])) {
            submitted_templates = $scope.submitted_docs[$scope.currentStage.id]['templates'];
            angular.forEach($scope.templates, function (temp, t_ind) {
                if (temp.digi_sign == true) {
                    template = submitted_templates.find(item => item.parent_id == temp.id);
                    if (!isEmpty(template)) {
                        $scope.templates[t_ind]['status'] = template.status;
                        $scope.templates[t_ind]['parent_id'] = template.parent_id;
                        $scope.templates[t_ind]['document_status'] = template.document_status;
                        $scope.templates[t_ind]['is_configured'] = template.is_configured;
                        $scope.templates[t_ind]['is_submitted'] = true;
                        $scope.templates[t_ind]['update_doc_recipient_url'] = template['document_url'];
                        $scope.templates[t_ind]['created_document_id'] = template.id;
                        $scope.templates[t_ind]['created_document_unique_id'] = $scope.templates[t_ind]['unique_id'] = template.unique_id;
                    }
                }
                if (temp.type == 'manual') {
                    template = submitted_templates.find(item => item.id == temp.id);
                    if (!isEmpty(template) && !isEmpty(template.uploaded_documents)) {
                        if (isEmpty($scope.normalUploadFilesObj.candidate_templates[template.unique_id])) {
                            $scope.normalUploadFilesObj.candidate_templates[template.unique_id] = {};
                        }
                        var unique_id = generateUniqueId();
                        $scope.normalUploadFilesObj.candidate_templates[template.unique_id][unique_id] = {
                            template: template, unique_id: unique_id, name: template.uploaded_documents[0].document_name, is_submitted:true
                        };
                        $scope.templates[t_ind]['document_status'] = template.document_status;
                        $scope.templates[t_ind]['is_submitted'] = true;
                    };
                }
            });            
        }
    }

    if (!isEmpty($scope.submitted_docs) && !isEmpty($scope.submitted_docs[$scope.currentStage.id])) {
        $scope.setDefaultData();
    }
});

App.controller('CommonCandidateDocumentUpdateRequestCtrl', function($scope, dateFilter,ConfirmAlert, $controller, $rootScope, HireApiServices, OnboardingApiServices) {
    
    $scope.popupUploaderDocuments = {};

    $scope.normalUploadFilesObj = {'candidate_templates' : {}};
    $scope.deletedDocumentsObj = {'templates' : [], 'documents':[]};
	$scope.candidate_selected_template_ids_arr = [];
	$scope.delete_document_uploaded_file_ids = [];
	$scope.deleted_request_documents_arr = [];

    angular.extend(this, $controller('DynamicFormCtrl', { $scope: $scope }));

    $scope.validateCandidateTemplates = function (templates,is_partial=false) {
        var digi_sign_template_found = manual_upload_found = found_request_documents = false;

        var templatesData = { documents: [] };

        angular.forEach(templates, function (template) {
            if(is_partial) {
                digi_sign_template_found = manual_upload_found = found_request_documents = false;
            }
            var insertObj = { id: template.id };
            if (template.type == 'fyi') {
                return;
            }
            if (template.is_document) {
                insertObj['type'] = 'document';
            } else {
                insertObj['type'] = 'template';                
                if (template.digi_sign) {
                    if(isEmpty(template.is_configured)){
                        digi_sign_template_found = true;
                    }
                    if(!isEmpty(template.is_submitted)) {
                        return;
                    }
                }
            }

            if(template.type == 'manual') {
                if (isEmpty($scope.normalUploadFilesObj.candidate_templates[template.unique_id])) {
                    manual_upload_found = true;
                }                
                if(!isEmpty(template.is_submitted)) {
                    return;
                }
            }

            if ($scope.isSavedRequestDocument(template)) {
                found_request_documents = true;
                return true;
            }

            if (is_partial && (manual_upload_found || digi_sign_template_found)) {
                return false;
            }
            insertObj['stage_id'] = $scope.currentStage.id;
            insertObj['is_checklist'] = true;
            insertObj['digi_sign'] = template['digi_sign'];
            templatesData['documents'].push(insertObj);
            console.log(insertObj);
        });

        if (manual_upload_found && !is_partial) {
            showAlertMessage({
                status: 0,
                message: 'Please upload file in Manual Templates.',
            });

            return false;
        }

        if (digi_sign_template_found && !is_partial) {
            showAlertMessage({
                status: 0,
                message: 'Templates for Digital signs must be filled out.',
            });

            return false;
        }

        return templatesData;
    }

    $scope.file_list = function ($files, fld_name, template) {
        fld_name = fld_name + "[candidate_templates][" + template.id + "]";
        if (isEmpty($scope.normalUploadFilesObj.candidate_templates[template.unique_id])) {
            $scope.normalUploadFilesObj.candidate_templates[template.unique_id] = {};
        }

        angular.forEach($files, function (fileDetails, key) {
            length_exceeded = false;
            if (!checkStringLength(fileDetails.name)) {
                length_exceeded = true;
                $scope.$apply(function ($scope) {
                    if (length_exceeded) {
                        showAlertMessage({
                            status: 0,
                            message: CONFIG_MESSAGES.file_name_limit_exceeds
                        });
                    }
                });

                return false;
            }
            if (!isValidExtension(fileDetails.name)) {
                $scope.$apply(function ($scope) {
                    showAlertMessage({
                        status: 0,
                        message: CONFIG_MESSAGES.invalid_file_extension
                    });
                });
                return false;
            }

            if (fileDetails.size > 5242880) {
                $scope.$apply(function ($scope) {
                    showAlertMessage({
                        status: 0,
                        message: "File size should be below 5 MB"
                    });
                });
                return false;
            }
            $scope.is_changed = true;
            var loop_fld_name = fld_name;
            var unique_id = generateUniqueId();

            temp_index = $scope.templates.findIndex(temp => temp.id == template.id);
            if(temp_index > -1) {
                if(!isEmpty($scope.templates[temp_index]['is_submitted'])) {
                    delete $scope.templates[temp_index]['is_submitted'];
                }
            }

            loop_fld_name = loop_fld_name + "[" + template.id + "][" + unique_id + "]";
            $scope.CandidateRequestTemplates.push({
                form_data_key: loop_fld_name, fileDetails: fileDetails
            });

            $scope.normalUploadFilesObj.candidate_templates[template.unique_id][unique_id] = {
                fld_name: loop_fld_name, template: template,
                unique_id: unique_id, fileDetails: fileDetails, name: fileDetails.name
            };
        });

        $scope.$apply();
    };

    $scope.prepareDataToSave = function (is_partial=false) {
        // if(isEmpty($scope.document_types_options)) {
        //     return true;
        // }

        $scope.validation_errors = {};
        $scope.validation_errors[$scope.form_name] = {};
        $scope.setValidationErrorsForCustomForm();

        if (!$scope[$scope.form_name]['form'].$valid) {
            return false;
        }
        if (isEmpty($scope.document_types_options)) {
            return true;
        }
        var required_section_names = [];
        var is_documents_mandatory = false;

        $scope.required_sections = {documents:'documents'};

        if (isNotEmpty($scope.required_sections)) {
            angular.forEach($scope.required_sections, function () {
                is_documents_mandatory = true;
                if (isEmpty($scope.CandidateRequestDocuments)) {
                    required_section_names.push('Documents');
                }
            });
        }

        if (isNotEmpty(required_section_names)) {
            showAlertMessage({
                status: 0,
                message: 'Please fill atleast one record in section(s)' + required_section_names.join(', ')
            });

            return false;
        }

        $scope.valid_docs = [];
        if (is_documents_mandatory) {
            var isValid = true;
            angular.forEach($scope.CandidateRequestDocuments, function (documentObj, key) {

                if (isValid || is_partial) {
                    if (!isEmpty($scope.document_types_options[key])) {
                        if (typeof documentObj.document_type === 'undefined' || documentObj.document_type == '') {
                            $scope.CandidateRequestDocuments[key]['document_type'] = key;
                        }
                        if (typeof documentObj.stage_id === 'undefined' || documentObj.stage_id == '') {
                            $scope.CandidateRequestDocuments[key]['stage_id'] = $scope.currentStage.id;
                        }
                        isValid = $scope.validateCandidateDocument(documentObj);
                        if (isValid && isEmpty(documentObj['is_submitted'])) {
                            $scope.valid_docs.push(documentObj);
                        }
                    }
                }
            });

            if (isNotEmpty($scope.uploaderCandidateDocumentErrorMessage) && !is_partial) {
                showAlertMessage({
                    status: 0,
                    message: $scope.uploaderCandidateDocumentErrorMessage
                });
                return false;
            }
        }

        $scope.error_div_cls = 0;
        $scope.loading = 1;

        
        var selected_document_type_ids = [];
        if (isNotEmpty($scope.CandidateRequestDocuments)) {
            angular.forEach($scope.CandidateRequestDocuments, function (documentObj, key) {
                if(!isEmpty(documentObj.document_type)) {
                    selected_document_type_ids.push(parseInt(documentObj.document_type));
                }
            });
        }
        duplicates = new Set(selected_document_type_ids).size !== selected_document_type_ids.length;
        if (duplicates) {
            showAlertMessage({
                status: 0,
                message: "Document types should not be duplicate"
            });
            return false;
        }
        if(!selected_document_type_ids.length) {
            return false;
        }
        return true;
    }

    $scope.validateCandidateDocument = function(documentObj) {
        $scope.uploaderCandidateDocumentErrorMessage = null;

        $scope.new_expiry_date = documentObj.expiry_date;
        if(documentObj.expiry_date !==undefined && documentObj.expiry_date !=''){
            documentObj.expiry_date = new Date(documentObj.expiry_date);
            documentObj.expiry_date.setMinutes( documentObj.expiry_date.getMinutes() +  documentObj.expiry_date.getTimezoneOffset() );
        }

        if (
            isEmpty(documentObj.document_type) || isEmpty(documentObj.status, false) || isEmpty(documentObj.document_name) || isEmpty(documentObj.original_name) 
        ) {
            $scope.uploaderCandidateDocumentErrorMessage = "Please fill mandatory fields";
        } 

        else if(documentObj.expiry_date !==undefined && documentObj.expiry_date !='' && dateFilter(documentObj.expiry_date, "yyyy-MM-dd") < dateFilter(new Date(), "yyyy-MM-dd") && documentObj.status == 'active'){
           $scope.uploaderCandidateDocumentErrorMessage = "Expiry date should be greater than current date.";
        }

        else {
            var ext = documentObj.original_name.split('.').pop();
            ext = ext.toLowerCase();
            if ($scope.allowed_file_types.indexOf(ext) === -1) {
                $scope.uploaderCandidateDocumentErrorMessage = 'File extension not supported';
            }
        }
        documentObj.expiry_date = dateFilter(documentObj.expiry_date, "yyyy-MM-dd");


        if (isNotEmpty($scope.uploaderCandidateDocumentErrorMessage)) {
            return false;
        }

        return true;
    }
   
    $scope.total_file_size = 0;
    $scope.uploadedCandidateDocumentFile = function(element) {
        var document_type_id = element.name;
        length_exceeded = false;
        $scope.files = element.files; 
        if (!checkStringLength(element.files[0].name)) {         
            length_exceeded = true;
            $scope.$apply(function($scope) {
                element.value = null;
                if (length_exceeded) {
                    showAlertMessage({
                        status : 0,
                        message : CONFIG_MESSAGES.file_name_limit_exceeds
                    });
                }
            });
            return false;
        } 
        if(!isValidExtension(element.files[0].name)){
            $scope.$apply(function($scope) {
                element.value = null;
                showAlertMessage({
                    status : 0,
                    message : CONFIG_MESSAGES.invalid_file_extension
                });
            });
            return false;    
        } 
        if(element.files[0].size > 5242880){
            $scope.$apply(function($scope) {
                element.value = null;
                showAlertMessage({
                    status : 0,
                    message : "File size can't be more than 5 MB"
                });
            });
            return false;
        }

        $scope.total_file_size = $scope.total_file_size + element.files[0].size;

        var file = element.files;
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded; 
        reader.readAsDataURL(file[0]);
        if (!isEmpty($scope.CandidateRequestDocuments[document_type_id])) {
            if (!isEmpty($scope.CandidateRequestDocuments[document_type_id].is_submitted)) {
                $scope.deletedDocumentsObj['documents'].push($scope.CandidateRequestDocuments[document_type_id]);
            }
        }
        delete $scope.CandidateRequestDocuments[document_type_id]['is_submitted'];
        $scope.is_changed = true;
        $scope.CandidateRequestDocuments[document_type_id].attachment_name = $scope.files[0];
        $scope.CandidateRequestDocuments[document_type_id].original_name = $scope.files[0].name;
        new_original_name = ($scope.files[0].name.length >=25) ? $scope.files[0].name.substr(0,25) + '....': $scope.files[0].name;

        document.getElementById(document_type_id).innerHTML = new_original_name;
    }

    $scope.isEmpty = function(obj) {
        return isEmpty(obj);
    };

    $scope.deleteNormalUploadedFile = function (normalUploadedFile, template) {
        ConfirmAlert.swal({
            title: "Are you sure?",
            text: 'You want to delete',
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }, function (isConfirm) {
            if (isConfirm) {
                // $scope.formres.delete(normalUploadedFile.fld_name);
                var select_file = $scope.normalUploadFilesObj['candidate_templates'][template.unique_id][normalUploadedFile.unique_id];
                if(!isEmpty(select_file)) {
                    var f_ind = $scope.CandidateRequestTemplates.findIndex(item => item.form_data_key == select_file.fld_name);
                    if(f_ind > -1) {
                        $scope.CandidateRequestTemplates.splice(f_ind, 1);
                    }
                }
                if(!isEmpty(normalUploadedFile.is_submitted) && !isEmpty(normalUploadedFile['template'])) {
                    $scope.deletedDocumentsObj['templates'].push(normalUploadedFile['template']);
                }
                delete $scope.normalUploadFilesObj['candidate_templates'][template.unique_id][normalUploadedFile.unique_id];
                
                temp_index = $scope.templates.findIndex(temp => temp.id == template.id);
                if(temp_index > -1) {
                    if(!isEmpty($scope.templates[temp_index]['is_submitted'])) {
                        delete $scope.templates[temp_index]['is_submitted'];
                    }
                }
            }
        });
    }
    
	$scope.showUploadedTemplateDocuments = function(template) {
		if (typeof template.uploaded_documents != 'undefined' && Object.keys(template.uploaded_documents).length > 0) {
			return true;
		}

		return false;
	}

	$scope.showConfigureBtn = function(template) {
		if (template.digi_sign == true) {
            if (isNotEmpty(template.document_status) && (template.document_status != 'in_process' && template.document_status != 'rejected')) {
				return false;
			}
			return true;
		}
		return false;
	}
	
	$scope.showVerifyBtn = function(template) {
		if (template.digi_sign == true) {
			if (isNotEmpty(template.verify_url) && template.document_status == 'submitted') {
				return true;
			}
		}
		return false;
	}

	$scope.verifyDocument = function(template) {
		if (isNotEmpty(template.verify_url)) {
			openInNewWindow(template.verify_url, {
				name : template.unique_id
			});			
			return true;
		}
		return false;
	}


    $scope.verifyAssessment = function(assessment) {
        if (isNotEmpty(assessment.url)) {
            openInNewWindow(assessment.url, {
                name : assessment.title
            });         
            return true;
        }
        return false;
    }
    
	$scope.isSavedRequestDocument = function(template) {
		if (template.is_edit && typeof template.request_document_id != 'undefined') {
			return true;
		}
		
		return false;
	}
    
	$scope.downloadFile = function(document) {
        if(!isEmpty($scope.SessionToken)){
            var url =  WEB_API_URL + 'candidate_application/'+ 'download_template_external/:id/?token=:token'.replace(':id', document.request_document_id).replace(':token', document.token);
        }
        else {
            var url =  WEB_API_URL + 'candidate_application/'+ 'download_template/:id'.replace(':id', document.request_document_id);
        }
		return downloadAttachments(url);
	}
   
	$scope.downloadTemplate = function(template) {
        if(!isEmpty($scope.SessionToken)){
            var url =  ONBOARDING_API_URL + 'download_template_external/:id/?token=:token'.replace(':id', template.unique_id).replace(':token', template.token);
            window.open(url, '_blank');
        }
        else {
            var url = ONBOARDING_API_URL + 'download_template/:id'.replace(':id', template.unique_id);
            return downloadAttachments(url);
        }
    }
   
	$scope.downloadDocument = function(template) {
        params = {};
        if(!isEmpty($scope.SessionToken)){
            var url =  WEB_API_URL + 'candidate_application/'+ 'download_template_external/:id/?token=:token'.replace(':id', template.unique_id).replace(':token', template.token);
        }
        else {
            var url =  WEB_API_URL + 'candidate_application/'+ 'download_template/:id'.replace(':id', template.unique_id);
            params = {is_checklist:template.requestDocumentObj.is_checklist, is_document:template.requestDocumentObj.type};
        }
		return downloadAttachments(url, params);
	}

	$scope.downloadUploadedTemplateDocument = function(uploadedDoc) {
        if(!isEmpty(uploadedDoc.download_url)) {
            window.open(uploadedDoc.download_url,'_blank');
        }
        else {
            var url =  WEB_API_URL + 'candidate_application/'+ 'download_request_uploaded_document?doc_id=' + uploadedDoc.id;
            return downloadAttachments(url);
        }
	}

	$scope.downloadOnboardingPdf = function(template) {

        if (!isEmpty($scope.SessionToken)) {
            var pdf_url = ONBOARDING_API_URL + 'external/download_onboarding_pdf?token=' + template.token;
            window.open(pdf_url,'_blank');
        }
        else {
            downloadAttachments(ONBOARDING_API_URL + 'download_onboarding_pdf/' + template.unique_id);
            /*OnboardingApiServices.get('queue/download_onboarding_pdf/'+ template.unique_id, {}).then(function(response) {
                showAlertMessage(response.data);
            });*/
        }
	}
    
	$scope.shareOnboardingDocument = function(template) {
		ConfirmAlert.swal({
			title: '',
			text: 'Do you want to share the completed document with the Candidate',
			showCancelButton: true,
			imageUrl: 'assets/images/newui/restore.svg',
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Yes",
			cancelButtonText: "No",
		}, function(isConfirm) {
			if (isConfirm) {
				HireApiServices.get('candidate_application/share_document_with_candidate/'+template.id).then(function(response) {
					showAlertMessage(response.data);
				});
			}
		});
	}
});
App.controller('CandidateSubmissionDocumentApprovalPopupCtrl', function($scope, $rootScope, $controller, $uibModalInstance, ConfirmAlert, items, dateFilter, HireApiServices) {

    $scope.active_tab = 'submitted';
    $scope.can_view_assessment = true;
    popupScopeObj = $scope;
    angular.extend(this, $controller('CommonCandidateDocumentUpdateRequestCtrl', { $scope: $scope, $rootScope:$rootScope }));

    $scope.updateSubmissionDocuments = function (status) {
        var is_verify = $scope.verifyCandidateTemplates();
        if (is_verify === false) {
            return false;
        }

        is_verify = $scope.verifyCandidateAssessments();
        if (is_verify === false) {
            return false;
        }

        var params = {};
        params.job_id = items.job_id;
        params.candidate_id = items.candidate_id;
        params.request_id = $scope.request_id;
        params.stage_ids = Object.keys($scope.stages);
        params.status = status;
        HireApiServices.post('candidate_application/updateSubmissionDocuments', params)
            .then(function success(response) {
                var message_data = response.data;
                if (message_data.status) {
                    showAlertMessage(message_data);
                    $scope.cancel();
                }
            });
    }
    
    $scope.cancel = function () {
		$uibModalInstance.close();
    };

    $scope.verifyCandidateTemplates = function () {
        var digi_sign_template_found = found_request_documents = false;

        angular.forEach($scope.candidate_stages, function(stage, s_index) {
            if (isEmpty(stage.templates)) {
                return true;
            }

            angular.forEach(stage.templates, function(template, t_index) {
                if (template.type == 'fyi') {
                    return;
                }
                if (template.is_document) {                
                    if (template.digi_sign) {
                        if (isNotEmpty(template.verify_url) && template.document_status == 'submitted') {
                            digi_sign_template_found = true;
                        }
                    }
                }
    
                if ($scope.isSavedRequestDocument(template)) {
                    found_request_documents = true;
                    return true;
                }
            });
        });


        if (digi_sign_template_found) {
            showAlertMessage({
                status: 0,
                message: 'Digital sign templates must be verify.',
            });

            return false;
        }
        return true;
    }


    $scope.verifyCandidateAssessments = function () {
        var pending_assessment = false;

        angular.forEach($scope.candidate_stages, function(stage, s_index) {
            if (isEmpty(stage.assessment)) {
                return true;
            }

            if(stage.assessment.is_qualified == -1) {
                pending_assessment = true;
            }
        });


        if (pending_assessment) {
            showAlertMessage({
                status: 0,
                message: 'Assessment must be verify.',
            });

            return false;
        }
        return true;
    }
    
    $scope.getCandidateWorkflowDocuments = function () {
        var params = {};
        params.job_id = items.job_id;
        params.candidate_id = items.candidate_id;
        params.request_id = items.request_id;
        params.status = $scope.active_tab;
        HireApiServices.get('candidate_application/getSubmissionDocuments', params)
            .then(function success(response) {
                var message_data = response.data;
                if (message_data.status) {
                    var canDocumentUpdateRequestData = message_data.data;
                    $scope.document_types_options = canDocumentUpdateRequestData.document_types_options;
                    $scope.document_statuses_options = canDocumentUpdateRequestData.document_statuses_options;
                    $scope.canRequestObj = canDocumentUpdateRequestData.canRequestObj;
                    $scope.candidate_stages = !isEmpty($scope.canRequestObj) ? $scope.canRequestObj.stages : [];
                    $scope.stages = canDocumentUpdateRequestData.stages;
                    $scope.request_id = canDocumentUpdateRequestData.request_id;
                }
                else {
                    showAlertMessage(message_data);
                }
            }, function (error) {

            });
    }
	$scope.makeActiveTab = function(type) {
		$scope.active_tab = type;
        $scope.getCandidateWorkflowDocuments();
	}
	$scope.makeActiveTab($scope.active_tab);

});

window.addEventListener('message', function (event) {
    var source_origin = event.origin;

    if (source_origin !== location.origin) {
        return;
    }

    if (typeof event.data.document_sent != 'undefined' &&
        typeof event.data.document_id != 'undefined') {
        popupScopeObj.$apply(function () {
            angular.forEach(popupScopeObj.templates, function(templateObj, index) {
                if (isNotEmpty(templateObj.created_document_id) && templateObj.created_document_id == event.data.document_id) {
                    popupScopeObj.templates[index]['status'] = event.data.status;
                    popupScopeObj.templates[index]['document_status'] = event.data.status;
                    popupScopeObj.templates[index]['is_configured'] = true;
                    popupScopeObj.is_changed = true;
                }
            });
        });(event);
    }
    
	if (typeof event.data.verify_document != 'undefined' &&
    typeof event.data.document_id != 'undefined') {

        popupScopeObj.$apply(function() {
            if (isNotEmpty(popupScopeObj.candidate_stages)) {
                angular.forEach(popupScopeObj.candidate_stages, function(stage, s_index) {
                    if (isEmpty(stage.templates)) {
                        return true;
                    }

                    angular.forEach(stage.templates, function(templateObj, t_index) {
                        if (templateObj.id == event.data.document_id && templateObj.digi_sign == true) {
                            popupScopeObj.candidate_stages[s_index]['templates'][t_index]['document_status'] = event.data.document_status;
                            popupScopeObj.candidate_stages[s_index]['templates'][t_index]['status'] = event.data.document_status;
                            popupScopeObj.canRequestObj.stages[s_index]['templates'][t_index]['document_status'] = event.data.document_status;    
                        }
                    });

                });
            }
        });
    }

    if (typeof event.data.verify_assessment != 'undefined' &&
    typeof event.data.stage_id != 'undefined') {
        

        popupScopeObj.$apply(function() {
            if (isNotEmpty(popupScopeObj.candidate_stages)) {
                stage = popupScopeObj.candidate_stages[event.data.stage_id];
                if (isEmpty(stage.assessment)) {
                    return true;
                }
                popupScopeObj.candidate_stages[event.data.stage_id]['assessment']['is_qualified'] = event.data.is_qualified;
            }
        });(event);
    }

    if (typeof event.data.assessment_submitted != 'undefined' &&
        typeof event.data.status != 'undefined') {
        popupScopeObj.$apply(function () {
            popupScopeObj.assessment_details['status'] = 'written';
        });(event);

        if(event.data.page_reload === true) {
            location.reload();
            // window.location.href="";
        }

    }

}, false);

App.controller('AssessmentPopupCtrl', function ($scope, $filter, $uibModal,$http, $location, $controller,$rootScope,$uibModalInstance,assessment_id,HireApiServices) 
{
    $scope.assessment_id = assessment_id;
    $scope.assessment_title = '';
    $scope.questions = [];
    $scope.assessment_details = [];
    $scope.test = [];
    $scope.test_error = false;
    $scope.test_success = false;
    $scope.error_msg = 'Loading...';

    $scope.getTestDetails = function() {
        $rootScope.page_loading = 1;
        HireApiServices.get('oorwin_assessments/getTestDetails', {'assessment_id': $scope.assessment_id, 'subdomain':$rootScope.sub_domain}).then(function (response) {
            response = response.data;
            $rootScope.page_loading = 0;
            if(response.status == 1) {
                $scope.questions = response.data.questions;
                $scope.assessment_details = response.data.assessment_details;
                $scope.assessment_title = response.data.assessment_details.name;
                $scope.test_error = false;
                $scope.test_success = false;
            } else {
                $scope.test_success = false;
                $scope.test_error = true;
                $scope.error_msg = response.message;
                $scope.assessment_title = '';
            }
        }, function (error) {
            $rootScope.page_loading = 0;
        });
    }

    $scope.isValidCheckbox = function(question) {
        if(isEmpty(question.submitted_answer)) {
            return false;
        }
        var isValid = false;
        angular.forEach(question.submitted_answer, function(value, key){
            if(value === true)
            {
                isValid = true;
            }
        });

        return isValid;
    }


    $scope.save = function() {
        $scope.errorSubmit = false;
        if($scope.assessmentForm.$invalid) {
            $scope.errorSubmit = true;
            return;
        }

        angular.forEach($scope.questions, function(question, key){
            if(question.type == 'check_boxes') {
                if($scope.isValidCheckbox(question) === false) {
                    $scope.errorSubmit = 1;
                }
            }
        });

        if($scope.errorSubmit) {
            return;
        }

        $scope.test_success = true;
        $scope.error_msg = "Submitting Request...";
        $uibModalInstance.close($scope.questions);
       
    }

    $scope.getTestDetails();
  
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});