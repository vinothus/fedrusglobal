var getTemplate = function(fieldData, prefix, bulk_form_id='') 
{
    var template = '';
    // console.log(bulk_form_id);
    model_name_min = model_name_max = model_name_suffix='';
    bulk_edit_resume_original_name = 0;
    var bulk_form_depedent_id = 0;

    if(bulk_form_id!=''){
        bulk_form_depedent_id = bulk_form_id;
        prefix = prefix+'['+bulk_form_id+']';   
        model_name = prefix+'[field.related_table][field.field_name]'; 
        bulk_edit_resume_original_name = bulk_form_id;
        if(fieldData.field_type == 'range'){
            model_name_min = prefix+'[field.related_table][field.field_name]'+"['min']";
            model_name_max = prefix+'[field.related_table][field.field_name]'+"['max']";
        }
        if(fieldData.field_type == 'numberselect'){
            model_name_min = prefix+'[field.related_table][field.field_name]'+"['number']";
            model_name_max = prefix+'[field.related_table][field.field_name]'+"['type']";
        }
        
        if(fieldData.field_type == 'name_suffix'){
            model_name_suffix = prefix+'[field.related_table]'+"['first_name_prefix']";
        }
        
        if(fieldData.field_type == 'extension_phone_number'){
            model_name_suffix = prefix+'[field.related_table]'+"['extension_phone_number']";
        }
    }else{
        model_name = prefix+'[field.related_table][field.field_name]';
        if(fieldData.field_name == 'so_original_name'){
            bulk_edit_resume_original_name = 1;
        };
        if(fieldData.field_type == 'range'){
            model_name_min = prefix+'[field.related_table][field.field_name]'+"['min']";
            model_name_max = prefix+'[field.related_table][field.field_name]'+"['max']";
        }
        if(fieldData.field_type == 'numberselect'){
            model_name_min = prefix+'[field.related_table][field.field_name]'+"['number']";
            model_name_max = prefix+'[field.related_table][field.field_name]'+"['type']";
        }

        if(fieldData.field_type == 'name_suffix'){
            model_name_suffix = prefix+'[field.related_table]'+"['first_name_prefix']";
        }

        if(fieldData.field_type == 'extension_phone_number'){
            model_name_suffix = prefix+'[field.related_table]'+"['extension_phone_number']";
        }
        
    }

    textTemplate = '<div class="custom-form-fields">';
    textTemplate += '<div class="custom-form-group" ng-hide="(isHiringTypeInternal && (field.field_name==\'client_contract_period\')) || (isHiringTypeInternal && field.field_name==\'client_contact_email\') || (!fromQuickAdd && field.field_name==\'client_contact_email\' && field.related_table==\'jobs\' && !isHiringTypeInternal && (isNotEmpty(stages_data) && showClientVendorSection)) || (field.related_table==\'pool_jobs\' && field.field_name==\'client_contact_email\' && !isEmpty(stages_data) && showClientVendorSection) || (field.field_name==\'so_number\' && field.related_table==\'assignment_invoice_information\' && !show_assignment_so_fields)">';
    textTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> <span ng-if="(field.related_table==\'assignment_invoice_information\' && (field.field_name==\'so_number\'))" class="pl-1" uib-tooltip="Timesheet module will be enabled only if entered this information" tooltip-placement="right" tooltip-append-to-body="true"><i class="oorwin-information"></i></span></label>';
    //textTemplate += '</div>';
    textTemplate += '<div class="form-control-wrap" ng-hide="(isHiringTypeInternal && (field.field_name==\'client_contract_period\')) || (isHiringTypeInternal && field.field_name==\'client_contact_email\') || (!fromQuickAdd && field.field_name==\'client_contact_email\' && field.related_table==\'jobs\' && !isHiringTypeInternal && (isNotEmpty(stages_data) && showClientVendorSection)) || (field.related_table==\'pool_jobs\' && field.field_name==\'client_contact_email\' && !isEmpty(stages_data) && showClientVendorSection)">';
    textTemplate += '<div ng-class="defineFieldAttrObj[field.field_name][\'after\'] ? \'input-group\' : \'\'">';
    textTemplate += '<input ng-if="field.field_name!=\'gst\'" ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" autocomplete="false" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" ng-blur="textTemplateBlurEvent(field)" ng-maxlength="255"/>';
    textTemplate += '<input ng-if="field.field_name==\'gst\'" ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" autocomplete="false" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" ng-pattern="/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[a-zA-Z]{1}[0-9a-zA-Z]{1})+$/" />';
    textTemplate += '<span ng-if="defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span class="input-group-text" compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted"></span></span>';

    textTemplate += '</div>';
    textTemplate += '</div>';
    textTemplate += '</div>';
    textTemplate += '</div>';

    emailTemplate = '<div class="custom-form-fields">';
    emailTemplate += '<div class="custom-form-group">';
    emailTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // emailTemplate += '</div>';
    emailTemplate += '<div class="form-control-wrap"><div ng-class="defineFieldAttrObj[field.field_name][\'after\'] ? \'input-group\' : \'\'">';
    emailTemplate += '<input ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-pattern = \'/^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$/i\' />';
    
    emailTemplate += '<span ng-if="defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span class="input-group-text" compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted"></span></span>';
    emailTemplate += '</div>';
    emailTemplate += '</div>';
    emailTemplate += '</div>';
    emailTemplate += '</div>';

    ssnTemplate = '<div class="custom-form-fields">';
    ssnTemplate += '<div class="custom-form-group">';
    ssnTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // ssnTemplate += '</div>';
    ssnTemplate += '<div class="form-control-wrap">';
    ssnTemplate += '<input ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" type="text" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ui-mask="999-99-9999"/>';
    ssnTemplate += '</div>';
    ssnTemplate += '</div>';
    ssnTemplate += '</div>';

    phoneTemplate = '<div class="custom-form-fields">';
    phoneTemplate += '<div class="custom-form-group" ng-hide="(isHiringTypeInternal && field.field_name==\'client_contact_phone\') || (!fromQuickAdd && field.field_name==\'client_contact_phone\' && field.related_table==\'jobs\' && !isHiringTypeInternal && (isNotEmpty(stages_data) && showClientVendorSection)) || (field.related_table==\'pool_jobs\' && field.field_name==\'client_contact_phone\' && !isEmpty(stages_data) && showClientVendorSection)">';
    phoneTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // phoneTemplate += '</div>';
    phoneTemplate += '<div class="form-control-wrap" ng-hide="(isHiringTypeInternal && field.field_name==\'client_contact_phone\') || (!fromQuickAdd && field.field_name==\'client_contact_phone\' && field.related_table==\'jobs\' && !isHiringTypeInternal && (isNotEmpty(stages_data) && showClientVendorSection)) || (field.related_table==\'pool_jobs\' && field.field_name==\'client_contact_phone\' && !isEmpty(stages_data) && showClientVendorSection)">';
    // phoneTemplate += '<input ui-mask="(999) 999-9999"  ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" phone-input />';
    phoneTemplate += '<input ng-disabled="isDisabledField(field)" type="text" class="form-control" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-intl-tel-input />';
    phoneTemplate += '</div>';
    phoneTemplate += '</div>';
    phoneTemplate += '</div>';


    extensionPhoneNumberTemplate = '<div class="custom-form-fields">';
    extensionPhoneNumberTemplate += '<div class="custom-form-group" ng-hide="(isHiringTypeInternal && field.field_name==\'client_contact_phone\') || (!fromQuickAdd && field.field_name==\'client_contact_phone\' && field.related_table==\'jobs\' && !isHiringTypeInternal && (isNotEmpty(stages_data) && showClientVendorSection)) || (field.related_table==\'pool_jobs\' && field.field_name==\'client_contact_phone\' && !isEmpty(stages_data) && showClientVendorSection)">';
    extensionPhoneNumberTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // extensionPhoneNumberTemplate += '</div>';
    extensionPhoneNumberTemplate += '<div class="form-control-wrap" ng-hide="(isHiringTypeInternal && field.field_name==\'client_contact_phone\') || (!fromQuickAdd && field.field_name==\'client_contact_phone\' && field.related_table==\'jobs\' && !isHiringTypeInternal && (isNotEmpty(stages_data) && showClientVendorSection)) || (field.related_table==\'pool_jobs\' && field.field_name==\'client_contact_phone\' && !isEmpty(stages_data) && showClientVendorSection)">';
    // extensionPhoneNumberTemplate += '<input ui-mask="(999) 999-9999"  ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" phone-input />';
    extensionPhoneNumberTemplate += '<div class="row">';
    extensionPhoneNumberTemplate += '<div class="col-md-8 pr-0">';
    extensionPhoneNumberTemplate += '<input ng-disabled="isDisabledField(field)" type="text" class="form-control" placeholder="{{::field.place_holder}}" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-intl-tel-input />';
    extensionPhoneNumberTemplate += '</div>';
    extensionPhoneNumberTemplate += '<div class="form-control-wrap col-md-4 pl-1" >';
    extensionPhoneNumberTemplate += '<input ng-disabled="isDisabledField(field)" type="text" class="form-control" placeholder="{{::field.place_holder}}" name="extension_phone_number" placeholder="Ext" ng-model="'+model_name_suffix+'" maxlength="10" only_numbers/>';
    extensionPhoneNumberTemplate += '</div>';
    extensionPhoneNumberTemplate += '</div>';
    extensionPhoneNumberTemplate += '</div>';
    extensionPhoneNumberTemplate += '</div>';
    extensionPhoneNumberTemplate += '</div>';

    numberTemplate = '<div class="custom-form-fields">';
    numberTemplate += '<div class="custom-form-group">';
    numberTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // numberTemplate += '</div>';
    numberTemplate += '<div class="form-control-wrap">';
    // for campaing field restriction
    numberTemplate += '<input ng-if="field.field_name==\'campaigns_needed\'" ng-disabled="isDisabledField(field)" type="number" class="form-control" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" placeholder="{{::field.place_holder}}" ng-pattern="/^[0-9.]*$/" limit-to-max min="1" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" />';
    
    numberTemplate += '<input ng-if="field.field_name!=\'campaigns_needed\'"  ng-disabled="isDisabledField(field)" type="text" class="form-control" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" placeholder="{{::field.place_holder}}" ng-pattern="/^[0-9.]*$/" string-to-number ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" />';

    numberTemplate += '</div>';
    numberTemplate += '</div>';
    numberTemplate += '</div>';
    // numberTemplate += '<a ng-if="defineFieldAttrObj[field.field_name][\'tooltip\']" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="{{ ::(defineFieldAttrObj[field.field_name][\'tooltip\']) | toTrusted }}"><i class="mdi  mdi-information-outline"></i></a>';

    decimalTempalte = '<div class="custom-form-fields">';
    decimalTempalte += '<div class="custom-form-group" ng-if="!(isHiringTypeNonBillable && (field.related_table==\'assignment_billing_information\' || field.related_table== \'assignment_payment_revises\') && (field.field_name==\'bill_rate\' || field.field_name==\'ot_bill_rate\'))">';
    decimalTempalte += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // decimalTempalte += '</div>';
    decimalTempalte += '<div class="form-control-wrap" ng-if="!(isHiringTypeNonBillable && (field.related_table==\'assignment_billing_information\' || field.related_table== \'assignment_payment_revises\') && (field.field_name==\'bill_rate\' || field.field_name==\'ot_bill_rate\'))">';
    decimalTempalte += '<input ng-if="!allowZeroForDecimals" ng-disabled="isDisabledField(field)" type="decimal" class="form-control" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-pattern="/^[1-9]\\d{0,7}(\\.\\d{0,2})*(,\\d+)?$/"  ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" ng-enter="{{ ::defineFieldAttrObj[field.field_name][\'ng_enter\'] }}" />';
    decimalTempalte += '<input ng-if="allowZeroForDecimals" ng-disabled="isDisabledField(field)" type="decimal" class="form-control" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-pattern="/^[0-9]\\d{0,7}(\\.\\d{0,2})*(,\\d+)?$/"  ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" />';
    decimalTempalte += '</div>';
    decimalTempalte += '</div>';
    decimalTempalte += '</div>';

    percentageTemplate = '<div class="custom-form-fields">';
    percentageTemplate += '<div class="custom-form-group">';
    percentageTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // percentageTemplate += '</div>';
    percentageTemplate += '<div class="form-control-wrap">';
    percentageTemplate += '<input  ng-disabled="isDisabledField(field)" type="decimal" class="form-control" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-pattern="/^[1-9]\\d{0,2}(\\.\\d{0,2})*(,\\d+)?$/" />';
    percentageTemplate += '</div>';
    percentageTemplate += '</div>';
    percentageTemplate += '</div>';

    dateTemplate = '<div class="custom-form-fields" ng-if="!(isHiddenField && field.field_name==\'frequency_start_date\')">';
    dateTemplate += '<div class="custom-form-group" ng-init="setDateFormat(field,'+model_name+')">';
    dateTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // dateTemplate += '</div>';
    dateTemplate += '<div class="form-control-wrap"><div class="input-group">';   
    dateTemplate += '<input valid-date ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control rounded" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" uib-datepicker-popup is-open="datepickers['+bulk_form_id+'+\'_\'+$index+\'_\'+field.field_name]" datepicker-options="dateOptions" ng-click="datepicker($event,'+bulk_form_id+'+\'_\'+$index+\'_\'+field.field_name)" ng-model-options="{timezone:\'UTC\'}" close-text="Close" ng-required="isRequiredField(field)" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" />';
    dateTemplate += ' <div class="input-group-append"><i class="oorwin-calendar input-group-text font-size-18" onerror="this.onerror=null;" ng-click="datepicker($event,'+bulk_form_id+'+\'_\'+$index+\'_\'+field.field_name)"></i></div></div></div>';
    dateTemplate += '</div>';
    dateTemplate += '</div>';

    dateTemplateTargetDate = '<div class="custom-form-fields" ng-if="!(isHiddenField && field.field_name==\'frequency_start_date\')">';
    dateTemplateTargetDate += '<div class="custom-form-group" ng-init="setDateFormat(field,'+model_name+')">';
    dateTemplateTargetDate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    dateTemplateTargetDate += '<div class="form-control-wrap"><div class="input-group">';   
    dateTemplateTargetDate += '<input valid-date ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control rounded" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" uib-datepicker-popup is-open="datepickers['+bulk_form_id+'+\'_\'+$index+\'_\'+field.field_name]" datepicker-options="dateOptionsTargetJob" ng-click="datepicker($event,'+bulk_form_id+'+\'_\'+$index+\'_\'+field.field_name)" ng-model-options="{timezone:\'UTC\'}" close-text="Close" ng-required="isRequiredField(field)" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" />';
    dateTemplateTargetDate += ' <div class="input-group-append"><i class="oorwin-calendar input-group-text font-size-18" onerror="this.onerror=null;" ng-click="datepicker($event,'+bulk_form_id+'+\'_\'+$index+\'_\'+field.field_name)"></i></div></div></div>';
    dateTemplateTargetDate += '</div>';
    dateTemplateTargetDate += '</div>';

    checkboxTemplate = '<div class="custom-form-fields">';
    checkboxTemplate += '<div class="custom-form-group" ng-hide="(isHiringTypeInternal && field.related_table==\'jobs\' && (field.field_name==\'show_client_vendor\')) || (field.field_name==\'show_so_in_bills\' && field.related_table==\'assignment_invoice_information\' && !show_assignment_so_fields)">';
    checkboxTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // checkboxTemplate += '</div>';
    checkboxTemplate += '<div class="custom-control custom-checkbox success" ng-hide="(isHiringTypeInternal && field.related_table==\'jobs\' && (field.field_name==\'show_client_vendor\'))">';
    checkboxTemplate += '<input ng-disabled="isDisabledField(field)" ng-true-value="\'1\'" ng-false-value="\'0\'" class="custom-control-input" name="{{::field.field_name}}" type="checkbox" ng-model="'+model_name+'" value="{{::field.value}}" ng-required="isRequiredField(field)" id="{{::field.field_name}}'+bulk_form_depedent_id+'" placeholder="{{::field.instructions}}" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}">';
    checkboxTemplate += '<label for="{{::field.field_name}}'+bulk_form_depedent_id+'" class="custom-control-label line-height-24"></label>';
    checkboxTemplate += '</div>';
    checkboxTemplate += '</div>';
    checkboxTemplate += '</div>'; 

    textareaTemplate = '<div class="custom-form-fields">';
    // textareaTemplate += '<div class="col-md-6">';
    textareaTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // textareaTemplate += '</div>';
    // textareaTemplate += '<div class="col-md-6">';
    textareaTemplate += '<textarea ng-disabled="isDisabledField(field)" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'" ng-required="isRequiredField(field)">{{::field.value}}</textarea>';
    textareaTemplate += '</div>';
    // textareaTemplate += '</div>';

    textareaTemplateFullWidth = '<div class="custom-form-fields">';
    // textareaTemplateFullWidth += '<div class="col-md-3">';
    textareaTemplateFullWidth += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // textareaTemplateFullWidth += '</div>';
    // textareaTemplateFullWidth += '<div class="col-md-9">';
    textareaTemplateFullWidth += '<textarea ng-disabled="isDisabledField(field)" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'" ng-required="isRequiredField(field)">{{::field.value}}</textarea>';
    textareaTemplateFullWidth += '</div>';
    // textareaTemplateFullWidth += '</div>';

    textareaeditorTemplate = '<div class="custom-form-fields">';
    // textareaeditorTemplate += '<div class="col-md-12">';
    textareaeditorTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // textareaeditorTemplate += '</div>';
    // textareaeditorTemplate += '<div class="col-md-12">';
    textareaeditorTemplate += '<textarea ng-disabled="isDisabledField(field)" ckeditor="" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'" ng-required="isRequiredField(field)">{{::field.value}}</textarea>';
    textareaeditorTemplate += '</div>';
    // textareaeditorTemplate += '</div>';

    selectTemplate = '<div class="custom-form-fields">';
    selectTemplate += '<div class="custom-form-group" ng-hide="(isHiringTypeInternal && (field.related_table==\'jobs\' || field.related_table==\'job_pay_details\' || field.related_table==\'job_pay_billing_details\') && (field.field_name==\'client_pay_type\' || field.field_name==\'placement_type\')) ||  (isHiringTypeNonBillable && (field.related_table==\'assignment_billing_information\' || field.related_table== \'assignment_payment_revises\') && (field.field_name==\'bill_type\'))">';
    selectTemplate += '<div class="d-flex align-items-center">';
    selectTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span><span ng-if="(field.related_table==\'jobs\' && (field.field_name==\'domain\'))" class="pl-1" uib-tooltip="Job Domain is identified by the system parsing through the Job Description and is editable if the user wants to change the domain." tooltip-placement="right" tooltip-append-to-body="true"><i class="oorwin-information">';
    selectTemplate +=  '</i></span></label><a class="pl-2" ng-if="(field.field_name==\'work_authorization\' && masterLayout.company_settings.operation_country_id == 1 && id && !onboarding_id)" ng-click="changeWorkAuthorization(field,\'add_emp\',\' \',completed_i9_id)"><i class="mdi mdi-pencil"></i></a>';
    selectTemplate += '</div>';
    selectTemplate += '<div class="form-control-wrap" ng-hide="(isHiringTypeInternal && (field.related_table==\'jobs\' || field.related_table==\'job_pay_details\' || field.related_table==\'job_pay_billing_details\') && (field.field_name==\'client_pay_type\' || field.field_name==\'placement_type\')) ||  (isHiringTypeNonBillable && (field.related_table==\'assignment_billing_information\' || field.related_table== \'assignment_payment_revises\') && (field.field_name==\'bill_type\'))">';
    selectTemplate += '<div ng-class="defineFieldAttrObj[field.field_name][\'after\'] ? \'input-group\' : \'\'">'; 
    selectTemplate += '<select ng-disabled="isDisabledField(field) || (field.field_name==\'work_authorization\' && masterLayout.company_settings.operation_country_id == 1 && id && !onboarding_id)" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}">';
    selectTemplate += '<option value="">Select</option>';
    selectTemplate += '<option ng-repeat="option in field.options" value="{{option.id}}">{{option.name}}</option>';
    selectTemplate += '</select>';
    selectTemplate += '<span ng-if="defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span class="input-group-text"  compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted"><span></span>';
    selectTemplate += '</div>';
    selectTemplate += '</div>';
    selectTemplate += '</div>';
    selectTemplate += '</div>';


    multipleTemplate = '<div class="custom-form-fields">';
    multipleTemplate += '<div class="custom-form-group" ng-init="multipleStrInput(field,'+model_name+',field.options)">';
    multipleTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // multipleTemplate += '</div>';
    multipleTemplate += '<div class="form-control-wrap">';
    multipleTemplate += '<multiselect ng-disabled="{{isDisabledField(field)}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" class="form-control" multiple="true" ng-model="'+model_name+'" options="cs.name for cs in field.options" change="selected()" ng-required="isRequiredField(field)" ></multiselect>';
    multipleTemplate += '</div>';
    multipleTemplate += '</div>';
    multipleTemplate += '</div>';



    multipleGroupTemplate = '<div class="custom-form-fields multiselect-by-group">';
    multipleGroupTemplate += '<div class="custom-form-group" ng-init="multipleStrInputGroup(field,'+model_name+',field.options)">';
    multipleGroupTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // multipleGroupTemplate += '</div>';
    multipleGroupTemplate += '<div class="form-control-wrap">';
    multipleGroupTemplate += '<multiselect ng-disabled="{{isDisabledField(field)}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" class="form-control" multiple="true" ng-model="'+model_name+'" options="cs.name for cs in field.options"  groupby="category_name" isgroupselect="1" change="selected()" ng-required="isRequiredField(field)" ></multiselect>';
    multipleGroupTemplate += '</div>';
    multipleGroupTemplate += '</div>';
    multipleGroupTemplate += '</div>';

    


    dependent_selectstate_tableTemplate = '<div class="custom-form-fields">';
    dependent_selectstate_tableTemplate += '<div class="custom-form-group">';
    dependent_selectstate_tableTemplate += '<label  class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // dependent_selectstate_tableTemplate += '</div>';
    dependent_selectstate_tableTemplate += '<div class="form-control-wrap">';
    dependent_selectstate_tableTemplate += '<select ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" class="form-control custom-select" ng-model="'+model_name+'" ng-required="isRequiredField(field)" convert-to-number>';
    dependent_selectstate_tableTemplate += '<option value="">Select</option>';
    dependent_selectstate_tableTemplate += '<option ng-repeat="option in getStatesListDropdownOptions(field,'+bulk_form_depedent_id+')" value="{{option.id}}">{{option.name}}</option>';
    dependent_selectstate_tableTemplate += '</select>';
    dependent_selectstate_tableTemplate += '</div>';
    dependent_selectstate_tableTemplate += '</div>';
    dependent_selectstate_tableTemplate += '</div>';

    dependent_multiselectstate_tableTemplate = '<div class="custom-form-fields">';
    dependent_multiselectstate_tableTemplate += '<div class="custom-form-group">';
    dependent_multiselectstate_tableTemplate += '<label ng-init="multipleInput(field,'+model_name+',CountryStateList['+prefix+'[field.related_table][field.map_condition]])"  class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label> ';                                       
    // dependent_multiselectstate_tableTemplate += '</div>';
    dependent_multiselectstate_tableTemplate += '<div class="form-control-wrap"> ';     
    dependent_multiselectstate_tableTemplate += '<multiselect ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" multiple="true" ng-model="'+model_name+'" options="cs.name for cs in getStatesListDropdownOptions(field,'+bulk_form_depedent_id+')" change="selected()" ng-required="isRequiredField(field)"></multiselect>';
    dependent_multiselectstate_tableTemplate += '</div>';
    dependent_multiselectstate_tableTemplate += '</div>';
    dependent_multiselectstate_tableTemplate += '</div>';

    locationTemplate = '<div class="custom-form-fields">';
    locationTemplate += '<div class="custom-form-group">';
    locationTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // locationTemplate += '</div>';
    locationTemplate += '<div class="form-control-wrap">';
    locationTemplate += '<div angucomplete-alt id="{{::field.field_name}}" pause="500" selected-object="selectedCustomLocation" selected-object-data="'+bulk_form_id+'" remote-url="'+WEB_API_URL+'integration/getLocation/1/{{masterLayout[\'company_settings\'][\'country_id\']}}" remote-url-request-formatter="remoteUrlRequestFnCustomLocation" remote-url-data-field="data.items" title-field="name" description-field="description" minlength="2" initial-value="'+model_name+'" input-class="form-control" match-class="highlight" disable-input="isDisabledField(field)" field-required="isRequiredField(field)" override-suggestions="true" field-required-class="error" template-url="custom-autocomplete-template.html" input-name="{{::field.field_name}}">';
    // locationTemplate += '<div angucomplete-alt id="{{::field.field_name}}" pause="500" selected-object="selectedCustomLocation" remote-url="'+WEB_API_URL+'integration/getLocation/" remote-url-request-formatter="remoteUrlRequestFnCustomLocation" remote-url-data-field="items" title-field="name" description-field="description" minlength="2" initial-value="'+model_name+'" input-class="form-control" match-class="highlight" disable-input="(!field.is_required && field.field_security[0].readonly)" field-required="isRequiredField(field)" override-suggestions="true" field-required-class="error" template-url="custom-autocomplete-template.html" input-name="{{::field.field_name}}">';
    locationTemplate += '</div>';
    locationTemplate += '</div>';
    locationTemplate += '</div>';
    locationTemplate += '</div>';

    multiLocationTemplate = '<div class="custom-form-fields">';
    multiLocationTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    multiLocationTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    multiLocationTemplate += '</div>';
    multiLocationTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    multiLocationTemplate += '<fieldset ng-init="tagsCitiesInput(field,'+model_name+')">';
    multiLocationTemplate += '<tags-input ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" display-property="city_state" max-tags="10" replace-spaces-with-dashes="false" class="tag-autocomplete"  key-property="city_state" text="city_state" on-tag-adding="checkTagCount(field)" on-tag-added="tagChanged($tag,field)" on-tag-removed="tagRemoved($tag,field)" ><auto-complete source="loadCitiesList($query, '+prefix+'[field.related_table]'+', field)" min-length="3" load-on-focus="false" load-on-empty="false" max-results-to-show="32" template="my-custom-city-template"></auto-complete></tags-input>';
    multiLocationTemplate += '<script type="text/ng-template" id="my-custom-city-template"><span ng-bind-html="$highlight($getDisplayText())"></span></script>';
    multiLocationTemplate += '</fieldset>';
    multiLocationTemplate += '</div>';
    multiLocationTemplate += '</div>';
    multiLocationTemplate += '</div>';

    selectcountrytableTemplate = '<div class="custom-form-fields">';
    selectcountrytableTemplate += '<div class="custom-form-group">';
    selectcountrytableTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // selectcountrytableTemplate += '</div>';
    selectcountrytableTemplate += '<div class="form-control-wrap">';
    selectcountrytableTemplate += '<select ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" class="form-control custom-select" ng-model="'+model_name+'" ng-change="field.field_name != \'nationality\' ? countrySelected('+bulk_form_id+'): \'\'" ng-required="isRequiredField(field)" convert-to-number>';
    selectcountrytableTemplate += '<option value="">Select</option>';
    selectcountrytableTemplate += '<option ng-repeat="option in CountryList" value="{{option.id}}">{{option.name}} </option>';
    selectcountrytableTemplate += '</select>';
    selectcountrytableTemplate += '</div>';
    // selectcountrytableTemplate +=  '<ui-select class="w-100" skip-focusser="true" ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" theme="select2" ng-model="'+model_name+'" ng-change="field.field_name != \'nationality\' ? countrySelected(): \'\'" ng-required="isRequiredField(field)">';
    // selectcountrytableTemplate += '<ui-select-match placeholder="Select" class="cuser_{{$index}} form-control pt-1"  style="height:36px;"> {{$select.selected.name}} </ui-select-match>';
    // selectcountrytableTemplate += '<ui-select-choices class="cuser_{{$index}}" repeat="options.id as options in (CountryList | filter: {name: $select.search}) track by $index"><div ng-bind-html="options.name | highlight: $select.search"></div></ui-select-choices><ui-select-no-choice><div>No records found</div></ui-select-no-choice></ui-select>';
    selectcountrytableTemplate += '</div>';
    selectcountrytableTemplate += '</div>';

    selecttableTemplate = '<div class="custom-form-fields">';
    selecttableTemplate += '<div class="custom-form-group">';
    selecttableTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span><span ng-if="(field.related_table==\'requisitions\' && (field.field_name==\'approval_flow\'))" class="pl-1" uib-tooltip="Despite the system selected flow the flow selected here will be considered as approval flow" tooltip-placement="right" tooltip-append-to-body="true"><i class="oorwin-information"></i></span></label>';
    // selecttableTemplate += '</div>';
    selecttableTemplate += '<div class="form-control-wrap">';
    selecttableTemplate += '<div ng-class="defineFieldAttrObj[field.field_name][\'after\'] ? \'input-group\' : \'\'">';
    selecttableTemplate += '<select ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}"  ng-focus="'+fieldData.field_name+'_old = '+model_name+';"  convert-to-number>';
    selecttableTemplate += '<option value="">Select</option> <option ng-repeat="option in field.options" value="{{option.id}}">{{option.name}} </option>';
    selecttableTemplate += '</select>';
    selecttableTemplate += '<span ng-if="defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted" class="input-group-text"></span></span>';
    selecttableTemplate += '</div>';
    selecttableTemplate += '</div>';
    selecttableTemplate += '</div>';
    selecttableTemplate += '</div>';

    searchselecttableTemplate = '<div class="custom-form-fields"><div class="custom-form-group" ng-init="multipleInput(field,'+model_name+',field.options)">';
    searchselecttableTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // searchselecttableTemplate += '</div>';
    searchselecttableTemplate += '<div class="form-control-wrap">';
    searchselecttableTemplate += '<div ng-class="defineFieldAttrObj[field.field_name][\'after\'] ? \'input-group\' : \'\'">';
    searchselecttableTemplate += '<multiselect ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'" options="cs.name for cs in field.options" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" ng-required="isRequiredField(field)" ng-click="'+fieldData.field_name+'_old = '+model_name+';"></multiselect>';
    searchselecttableTemplate += '<span ng-if="defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span class="input-group-text" compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted"></span></span></div>';
    searchselecttableTemplate += '</div>';
    searchselecttableTemplate += '</div>';
    searchselecttableTemplate += '</div>';

    multisearchselecttableTemplate = '<div class="custom-form-fields">';
    multisearchselecttableTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    multisearchselecttableTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    multisearchselecttableTemplate += '</div>';
    multisearchselecttableTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    multisearchselecttableTemplate += '<fieldset ng-init="tagsMultiSearchInput(field,'+model_name+')">';
    multisearchselecttableTemplate += '<tags-input ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" max-tags="10" replace-spaces-with-dashes="false" class="tag-autocomplete"  key-property="id" display-property="name" text="name" add-from-autocomplete-only="true" ><auto-complete source="loadSearchList($query, '+prefix+'[field.related_table]'+', field)" min-length="3" load-on-focus="false" load-on-empty="false" max-results-to-show="32" template="my-custom-multisearch-template"></auto-complete></tags-input>';
    multisearchselecttableTemplate += '<script type="text/ng-template" id="my-custom-multisearch-template"><span ng-bind-html="$highlight($getDisplayText())"></span></script>';
    multisearchselecttableTemplate += '</fieldset>';
    multisearchselecttableTemplate += '</div>';
    multisearchselecttableTemplate += '</div>';
    multisearchselecttableTemplate += '</div>';

    //account contact dependent form field
    searchselectAccountContactTemplate = '<div class="custom-form-fields" ng-hide="(field.related_table == \'candidates\') && (field.field_name == \'vendor_contact_name\') && !(show_vendor_field)">';
    searchselectAccountContactTemplate += '<div class="custom-form-group">';
    searchselectAccountContactTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // searchselectAccountContactTemplate += '</div>';
    searchselectAccountContactTemplate += '<div class="form-control-wrap">';
    searchselectAccountContactTemplate += '<div class="input-group">';
    searchselectAccountContactTemplate += '<multiselect ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'" options="cs.name for cs in field.options" ng-change="getFormAccountContactDetails(field,'+model_name+')" ng-required="isRequiredField(field)"></multiselect>';
    // searchselectAccountContactTemplate += '<span ng-if="defineFieldAttrObj[field.field_name][\'after\']" compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted" class="input-group-append border-0l"></span></div>';

    searchselectAccountContactTemplate += '<span ng-if="masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table == \'candidates\')" class="input-group-append input-group-append-alt border-0l"><a ng-click="openAccountContactFormPopup(field)" class="input-group-text"><i class="mdi mdi-plus"></i></a></span></div>';
    searchselectAccountContactTemplate += '</div>';
    searchselectAccountContactTemplate += '</div>';
    searchselectAccountContactTemplate += '</div>';


    searchCodeTemplate = '<div class="custom-form-fields">';
    searchCodeTemplate += '<div class="custom-form-group">';
    searchCodeTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span>  </label>';
    // searchCodeTemplate += '</div>';

    searchCodeTemplate += '<div class="form-control-wrap" ng-init="setCodeValue(field,'+model_name+')">';
    // searchCodeTemplate += '<div class="input-group">';
    searchCodeTemplate += '<div angucomplete-alt input-name="{{::field.field_name}}" id="{{::field.field_name}}"  pause="500" selected-object="setDetailsBySelectedObj" remote-url="{{::WEB_API_URL}}getSearchListJson/{{::field.map_table}}" remote-url-request-formatter="remoteUrlRequestFn" remote-url-data-field="data" title-field="code" description-field="description" minlength="3" initial-value="selected_code[field.field_name][\'code\']" input-class="form-control" match-class="highlight" disable-input="isDisabledField(field)" field-required="isRequiredField(field)"></div>';

    //  currently hiding this functionality, once it is done will remove this 
    // searchCodeTemplate += '<span compile-html" ng-if="masterLayout[\'permissions\'][\'access\'][\'candidates\'][\'add\'] && (field.related_table == \'otp_candidate_details\')" class="input-group-append border-0l"><a ng-click="openAccountFormPopup(field)""><i class="mdi mdi-plus"></i></a></span>';

    // searchCodeTemplate += '</div>';
    searchCodeTemplate += '</div>';
    searchCodeTemplate += '</div>';
    searchCodeTemplate += '</div>';
    searchCodeTemplate += '</div>';


    prefixTemplate = '<div class="custom-form-fields">';
    prefixTemplate += '<div class="custom-form-group">';
    prefixTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // prefixTemplate += '</div>';
    prefixTemplate += '<div class="form-control-wrap" ng-init="SetPrefixData(field)">';
    prefixTemplate += '<input ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" required="" readonly ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" />';
    prefixTemplate += '</div>';
    prefixTemplate += '</div>';
    prefixTemplate += '</div>';


    fileTemplate = '<div class="custom-form-fields">';
    fileTemplate += '<div class="custom-form-group mb-2" ng-hide="(field.field_name==\'so_original_name\' && field.related_table==\'assignment_invoice_information\' && !show_assignment_so_fields)">';
    fileTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // fileTemplate += '</div>';
    
    //for other uploads
    fileTemplate += '<div ng-if="!uploadFromServiceProviders" class="form-control-wrap">';
    // <small class="d-block text-muted">(File types: JPG, PNG, PDF, XLSX, DOC)</small>';
    fileTemplate += '<div class="drag-and-drop-area mt-4 text-center d-flex flex-column align-items-center justify-content-center"><div class="drag-and-drop-area-text m-0 d-flex align-items-center flex-wrap justify-content-center">';
    fileTemplate += '<input ng-disabled="isDisabledField(field)" type="file" name="{{::field.field_name}}" class="file-upload" ng-required="isRequiredField(field)" onchange="angular.element(this).scope().uploadedFile(this,angular.element(this).scope().field,'+bulk_form_id+')" ng-model="'+model_name+'">';
    fileTemplate += '<label class="mb-0 px-1 cursor-pointer">Drag & Drop</label> OR ';
    fileTemplate += '<label class="mb-0 px-1 cursor-pointer" style="color:#27ae60;">Browse & Find</label> a file here';
    fileTemplate += '</div></div>';
    fileTemplate += '</div>';


    //upload from multiple providers
    fileTemplate += '<div ng-if="uploadFromServiceProviders" class="form-control-wrap"><div class="dropzone dropzone-default h-100p d-flex align-items-center position-relative" ng-class="{\'border border-danger\' : file_not_uploaded}" id="dropzone_orwn_support"><div class="w-100 dropzone-msg dz-message"><small class="dropzone-msg-desc"><span class="dropdown" uib-dropdown dropdown-append-to-body="true">You can <a href="javascript:void(0)" class="dropdown-toggle" uib-dropdown-toggle><u>Browse</u></a>';
    fileTemplate += '<ul class="list-unstyled dropdown-menu" style="z-index:9999;" uib-dropdown-menu><li class="nowrap dropdown-item"><a href="javascript:void(0)"><img src="assets/images/onboarding/mac.png" height="20" /><span class="inline-block pl-1">Local Machine</span><input class="position-absolute from-local-computer-file" type="file" onchange="angular.element(this).scope().uploadedFile(this,angular.element(this).scope().field,'+ bulk_form_id+')" ng-required="isRequiredField(field)" ng-file /></a></li>';
    // fileTemplate += '<li class="dropdown-item"><a ng-if="!connectedOAuthProviders[\'box\']" ng-click="getLoginProvider(\'box\')"><img src="assets/images/onboarding/box.png" height="20" /><span class="pl-1">Box</span></a><a ng-if="connectedOAuthProviders[\'box\']" ng-click="fetchOAuthFoldersList(\'box\')"><img src="assets/images/onboarding/box.png" height="20" /><span class="pl-1">Box</span></a></li>';
    fileTemplate += '<li ng-if="'+bulk_form_id+'" class="dropdown-item"><a ng-if="!connectedOAuthProviders[\'dropbox\']" ng-click="getLoginProvider(\'dropbox\','+ bulk_form_id +')"><img src="assets/images/onboarding/drop_box.png" height="20" /><span class="pl-1">Dropbox</span></a><a ng-if="connectedOAuthProviders[\'dropbox\']" ng-click="fetchOAuthFoldersList(\'dropbox\','+ bulk_form_id +')"><img src="assets/images/onboarding/drop_box.png" height="20" /><span class="pl-1">Dropbox</span></a></li>';
    fileTemplate += '<li ng-if="'+!bulk_form_id+'" class="dropdown-item"><a ng-if="!connectedOAuthProviders[\'dropbox\']" ng-click="getLoginProvider(\'dropbox\')"><img src="assets/images/onboarding/drop_box.png" height="20" /><span class="pl-1">Dropbox</span></a><a ng-if="connectedOAuthProviders[\'dropbox\']" ng-click="fetchOAuthFoldersList(\'dropbox\')"><img src="assets/images/onboarding/drop_box.png" height="20" /><span class="pl-1">Dropbox</span></a></li>';
    fileTemplate += '<li ng-if="'+bulk_form_id+'" class="dropdown-item"><a ng-if="!connectedOAuthProviders[\'google_drive\']" ng-click="getLoginProvider(\'google_drive\','+ bulk_form_id +')"><img src="assets/images/onboarding/drive.png" height="20" /><span class="pl-1">Google Drive</span></a><a ng-if="connectedOAuthProviders[\'google_drive\']" ng-click="fetchOAuthFoldersList(\'google_drive\','+ bulk_form_id +')"><img src="assets/images/onboarding/drive.png" height="20" /><span class="pl-1">Google Drive</span></a></li>';
    fileTemplate += '<li ng-if="'+!bulk_form_id+'" class="dropdown-item"><a ng-if="!connectedOAuthProviders[\'google_drive\']" ng-click="getLoginProvider(\'google_drive\')"><img src="assets/images/onboarding/drive.png" height="20" /><span class="pl-1">Google Drive</span></a><a ng-if="connectedOAuthProviders[\'google_drive\']" ng-click="fetchOAuthFoldersList(\'google_drive\')"><img src="assets/images/onboarding/drive.png" height="20" /><span class="pl-1">Google Drive</span></a></li>';
    fileTemplate += '<li ng-if="'+bulk_form_id+'" class="dropdown-item"><a ng-if="!connectedOAuthProviders[\'one_drive\']" ng-click="getLoginProvider(\'one_drive\','+ bulk_form_id +')"><img src="assets/images/onboarding/one_drive.png" height="20" /><span class="pl-1">One Drive</span></a><a ng-if="connectedOAuthProviders[\'one_drive\']" ng-click="fetchOAuthFoldersList(\'one_drive\','+ bulk_form_id +')"><img src="assets/images/onboarding/one_drive.png" height="20" /><span class="pl-1">One Drive</span></a></li>';
    fileTemplate += '<li ng-if="'+!bulk_form_id+'" class="dropdown-item"><a ng-if="!connectedOAuthProviders[\'one_drive\']" ng-click="getLoginProvider(\'one_drive\')"><img src="assets/images/onboarding/one_drive.png" height="20" /><span class="pl-1">One Drive</span></a><a ng-if="connectedOAuthProviders[\'one_drive\']" ng-click="fetchOAuthFoldersList(\'one_drive\')"><img src="assets/images/onboarding/one_drive.png" height="20" /><span class="pl-1">One Drive</span></a></li>';
    fileTemplate += '</ul></span> and find a file here</small></div></div></div>';
    //upload from multiple providers ends

    fileTemplate += '<div ng-if="'+model_name+'[\'original_name\'] && !('+prefix+'[field.related_table][\'is_resume\'])" && '+model_name+' ">';
    fileTemplate += '<div ng-if="'+model_name+'[\'original_name\'] && showOriginalNameField['+bulk_edit_resume_original_name+']"  class="form-group my-2 input-group">';
    fileTemplate += '<input type="text" class="form-control" ng-model="originalName.new_name"/>';
    fileTemplate += '<span class="input-group-append input-group-append-alt">';
    fileTemplate += '<a class="input-group-text bg-white" ng-if="'+model_name+'[\'original_name\'] && showOriginalNameField['+bulk_edit_resume_original_name+']" ng-click="saveOriginalName(field,'+model_name+'[\'original_name\'],'+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Save"><i class="oorwin-save"></i></a>';
    fileTemplate += '</span></div>';
    fileTemplate += '<div class="border rounded d-flex align-items-center justify-content-between w-100 p-2" ng-if="'+model_name+'[\'original_name\'] && !showOriginalNameField['+bulk_edit_resume_original_name+']">';
    fileTemplate += '<div class="font-size-14">{{'+model_name+'[\'original_name\'] |limitTo : 18}}</div>';
    fileTemplate += '<div class="d-flex justify-content-between"><a class="btn btn-transparent p-1" ng-if="'+model_name+' && !showOriginalNameField['+bulk_edit_resume_original_name+'] && field.related_table ==\'assignment_invoice_information\'" ng-click="DeleteAttachment(field,'+model_name+','+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Delete"><i class="oorwin-delete"></i>';
    fileTemplate += '<a ng-if="'+model_name+'[\'original_name\'] && !showOriginalNameField['+bulk_edit_resume_original_name+']" ng-click="editOriginalName(field,'+model_name+'[\'original_name\'],'+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Edit"><i class="oorwin-edit icon"></i></a></div></div>';
    fileTemplate += '</div>';

    fileTemplate += '<div ng-if="!('+model_name+'[\'original_name\']) && !('+prefix+'[field.related_table][\'is_resume\']) && !('+prefix+'[field.related_table][\'id\'])">';
    fileTemplate += '<div ng-if="'+model_name+' && showOriginalNameField['+bulk_edit_resume_original_name+']"  class="form-group my-2 input-group">';
    fileTemplate += '<input type="text" class="form-control" ng-model="originalName.new_name"/>';
    fileTemplate += '<span class="input-group-append input-group-append-alt">';
    fileTemplate += '<a class="input-group-text bg-white" ng-if="'+model_name+' && showOriginalNameField['+bulk_edit_resume_original_name+']" ng-click="saveOriginalName(field,'+model_name+','+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Save"><i class="oorwin-save"></i></a>';
    fileTemplate += '</span></div>';
    fileTemplate += '<div class="border rounded d-flex align-items-center justify-content-between w-100 p-2" ng-if="'+model_name+' && !showOriginalNameField['+bulk_edit_resume_original_name+']">'; 
    fileTemplate += '<div class="font-size-14">{{'+model_name+' |limitTo : 18}}</div>'; 
    fileTemplate += '<a ng-if="'+model_name+' && !showOriginalNameField['+bulk_edit_resume_original_name+']" ng-click="editOriginalName(field,'+model_name+','+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Edit"><i class="oorwin-edit icon"></i></a></div>';
    fileTemplate += '</div>';
    
    fileTemplate += '<div compile-html" ng-if="(field.related_table == \'job_submissions\') && !('+model_name+'[\'original_name\']) && '+prefix+'[field.related_table][\'is_resume\']">';
    fileTemplate += '<div ng-if="'+model_name+' && showOriginalNameField['+bulk_edit_resume_original_name+']" class="form-group my-2 input-group">';
    fileTemplate += '<input type="text" class="form-control" ng-model="originalName.new_name"/>';
    fileTemplate += '<span class="input-group-append input-group-append-alt">';
    fileTemplate += '<a class="input-group-text bg-white" ng-click="saveOriginalName(field,'+model_name+','+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Save"><i class="oorwin-save"></i></a>';
    fileTemplate += '</span></div>';
    fileTemplate += '<a ng-click="downloadFile(\'candidate_document_details\','+prefix+'[field.related_table][\'is_resume\'])""  ng-title="'+model_name+'[field.related_table][field.field_name]" >';
    fileTemplate += '{{'+model_name+'|limitTo : 18}}</a>';
    fileTemplate += '<a ng-if="'+model_name+' && !showOriginalNameField['+bulk_edit_resume_original_name+']" ng-click="editOriginalName(field,'+model_name+','+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Edit"><i class="mdi mdi-pencil"></i></a>';
    fileTemplate += '</div>';

    //id download
    fileTemplate += '<div compile-html" ng-if="!('+model_name+'[\'original_name\']) && !('+prefix+'[field.related_table][\'is_resume\'])  && '+model_name+' && '+prefix+'[field.related_table][\'id\']">';
    fileTemplate += '<div ng-if="'+model_name+' && showOriginalNameField['+bulk_edit_resume_original_name+']" class="form-group my-2 input-group">';
    fileTemplate += '<input type="text" class="form-control" ng-model="originalName.new_name"/>';
    fileTemplate += '<span class="input-group-append input-group-append-alt">';
    fileTemplate += '<a class="input-group-text bg-white" ng-if="'+model_name+' && showOriginalNameField['+bulk_edit_resume_original_name+']" ng-click="saveOriginalName(field,'+model_name+','+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Save"><i class="oorwin-save"></i></a>';
    fileTemplate += '</span></div>';
    fileTemplate += '<div class="border rounded p-1 d-flex align-items-center justify-content-between"><a ng-click="downloadFile(field.related_table,'+prefix+'[field.related_table][\'id\'],field)"" ng-title="'+model_name+'[field.related_table][field.field_name]" >';
    fileTemplate += '{{'+model_name+'|limitTo : 18}}</a>';
    fileTemplate += '<div class="d-flex justify-content-between"><a class="btn btn-transparent p-1" ng-if="'+model_name+' && !showOriginalNameField['+bulk_edit_resume_original_name+'] && field.related_table ==\'assignment_invoice_information\'" ng-click="DeleteAttachment(field,'+model_name+','+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Delete"><i class="oorwin-delete"></i>';
    fileTemplate += '<a class="btn btn-transparent p-1" ng-if="'+model_name+' && !showOriginalNameField['+bulk_edit_resume_original_name+']" ng-click="editOriginalName(field,'+model_name+','+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Edit"><i class="oorwin-edit"></i></a></div></div>';
    fileTemplate += '</div>';


    fileTemplate += '<div compile-html" ng-if="(field.related_table != \'job_submissions\') && !('+model_name+'[\'original_name\']) && ('+prefix+'[field.related_table][\'is_resume\'])  && '+model_name+' && '+prefix+'[field.related_table][\'id\']">';
    fileTemplate += '<div ng-if="'+model_name+' && showOriginalNameField['+bulk_edit_resume_original_name+']" class="form-group my-2 input-group">';
    fileTemplate += '<input type="text" class="form-control" ng-model="originalName.new_name"/>';
    fileTemplate += '<span class="input-group-append input-group-append-alt">';
    fileTemplate += '<a class="input-group-text" ng-if="'+model_name+' && showOriginalNameField['+bulk_edit_resume_original_name+']" ng-click="saveOriginalName(field,'+model_name+','+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Save"><i class="oorwin-save"></i></a>';
    fileTemplate += '</span></div>';
    fileTemplate += '<div class="border rounded p-1 d-flex align-items-center justify-content-between"> <a ng-click="downloadFile(field.related_table,'+prefix+'[field.related_table][\'id\'])"" ng-title="'+model_name+'[field.related_table][field.field_name]" >';
    fileTemplate += '{{'+model_name+'|limitTo : 18}}</a>';
    fileTemplate += '<a class="btn btn-transparent p-1" ng-if="'+model_name+' && !showOriginalNameField['+bulk_edit_resume_original_name+']" ng-click="editOriginalName(field,'+model_name+','+bulk_edit_resume_original_name+')" tooltip-placement="bottom" tooltip-append-to-body="true" uib-tooltip="Edit"><i class="oorwin-edit"></i></div>';
    fileTemplate += '</div>';


    //fileTemplate += '<div>{{'+model_name+'[\'original_name\']}}</div>';
    fileTemplate += '</div>';
    fileTemplate += '</div>';
    fileTemplate += '</div>';


    urlTemplate = '<div class="custom-form-fields">';
    urlTemplate += '<div class="custom-form-group">';
    urlTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // urlTemplate += '</div>';
    urlTemplate += '<div class="form-control-wrap">';
    urlTemplate += '<input type="{{::field.type}}" ng-disabled="isDisabledField(field)" class="form-control" id="{{::field.field_name}}" name="{{::field.field_name}}"  ng-model="'+model_name+'" ng-required="(for_portal == 1) ? field.required_in_portal : field.is_required" placeholder="{{::field.place_holder}}" ng-pattern="/(http(s)?://.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/">';//BG-3641
    urlTemplate += '</div>';
    urlTemplate += '</div>';
    urlTemplate += '</div>';

    checkBoxesTemplate = '<div class="custom-form-fields">';
    checkBoxesTemplate += '<div class="custom-form-group">';
    checkBoxesTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // checkBoxesTemplate += '</div>';
    checkBoxesTemplate += '<div class="form-control-wrap" ng-init="setMultiCheckBox(field,'+model_name+',field.options)">';
    checkBoxesTemplate += '<div class="custom-control custom-checkbox success custom-control-inline" ng-repeat="option in field.options">';
    checkBoxesTemplate += '<input ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" class="custom-control-input" type="checkbox" ng-model="'+model_name+'[\'check\'][option.name]"  ng-value="{{option.name}}" id="{{::field.field_name+\'_\'+option.name}}'+bulk_form_depedent_id+'" ng-required="isRequiredField(field)">';
    checkBoxesTemplate += '<label for="{{::field.field_name+\'_\'+option.name}}'+bulk_form_depedent_id+'" class="custom-control-label line-height-24">{{option.name}}</label>';
    checkBoxesTemplate += '</div>';
    checkBoxesTemplate += '</div>';
    checkBoxesTemplate += '</div>';
    checkBoxesTemplate += '</div>';

    tagTemplate = '<div class="custom-form-fields">';
    tagTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    tagTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    tagTemplate += '</div>';
    tagTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    tagTemplate += '<fieldset ng-init="tagsInput(field,'+model_name+')">';
    tagTemplate += '<tags-input ng-disabled="isDisabledField(field)" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)"></tags-input>';
    tagTemplate += '</fieldset>';
    tagTemplate += '</div>';
    tagTemplate += '</div>';
    tagTemplate += '</div>';




    tagEmailTemplate = '<div class="custom-form-fields">';
    tagEmailTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    tagEmailTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    tagEmailTemplate += '</div>';
    tagEmailTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    tagEmailTemplate += '<fieldset ng-init="tagsInput(field,'+model_name+')">';
    tagEmailTemplate += '<tags-input allowed-tags-pattern="^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+.)+[A-Za-z]{2,}" ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" display-property="text" replace-spaces-with-dashes="false" class="tag-autocomplete"><auto-complete source="loadHireUsers($query)" min-length="2" load-on-focus="false" load-on-empty="false" max-results-to-show="32" template="my-custom-template"></auto-complete></tags-input>';
    tagEmailTemplate += '<script type="text/ng-template" id="my-custom-template"><span ng-bind-html="$highlight($getDisplayText())"></span></script>';
    tagEmailTemplate += '</fieldset>';
    tagEmailTemplate += '</div>';
    tagEmailTemplate += '</div>';
    tagEmailTemplate += '</div>';




    tagSkillsTemplate = '<div class="custom-form-fields">';
    tagSkillsTemplate += '<div class="tg d-flex align-items-center justify-content-between pr-28" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    tagSkillsTemplate += '<label class="form-label mb-0"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    tagSkillsTemplate += '<i ng-if="::field.label_name == \'Primary Skills\'" ng-show=\'jobTitle\' class="oorwin oorwin-setting-module cursor-pointer font-size-14 mt-8 text-success" uib-tooltip="Click me to generate the skills" tooltip-placement="top" tooltip-append-to-body="true" ng-click="getSkills(field)"></i>';
    tagSkillsTemplate += '</div>';
    tagSkillsTemplate += '<div class="tg d-flex align-items-center" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    tagSkillsTemplate += '<fieldset ng-init="tagsInput(field,'+model_name+')" style="display: inline-block;width: 88%;">';
    tagSkillsTemplate += '<tags-input ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" display-property="text" replace-spaces-with-dashes="false" class="tag-autocomplete"><auto-complete source="loadTechnicalSkills($query)" min-length="2" load-on-focus="false" load-on-empty="false" max-results-to-show="32" template="my-custom-template"></auto-complete></tags-input>';
    tagSkillsTemplate += '<script type="text/ng-template" id="my-custom-template"><span ng-bind-html="$highlight($getDisplayText())"></span></script>';
    tagSkillsTemplate += '</fieldset> ';

    tagSkillsTemplate += '<i class="oorwin oorwin-refresh cursor-pointer font-size-14 mt-8" uib-tooltip="Reset"  tooltip-placement="right" tooltip-append-to-body="true" ng-click="resetSkills(field)"></i>';
    tagSkillsTemplate += '</div>';
    tagSkillsTemplate += '</div>';
    tagSkillsTemplate += '</div>';


    
    radioTemplate = '<div class="custom-form-fields">';
    radioTemplate += '<div class="custom-form-group">';
    radioTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> <span ng-if="(field.related_table==\'assignment_invoice_information\' && (field.field_name==\'calculate_invoice_billing_by\'))" class="pl-1" uib-tooltip="Invoice calculation based on timesheets will have effect based on your selection" tooltip-placement="right" tooltip-append-to-body="true"><i class="oorwin-information"></i></span></label>';
    // radioTemplate += '</div>';
    // radioTemplate += '<div class="">';
    radioTemplate += '<div class="custom-control custom-radio success custom-control-inline" ng-repeat="option in field.options">'; 
    radioTemplate += '<input ng-disabled="isDisabledField(field)" id="{{::field.field_name+\'_\'+option.name}}'+bulk_form_depedent_id+'" name="{{::field.field_name}}" class="custom-control-input" type="radio" ng-model="'+model_name+'" value="{{option.id}}" ng-required="isRequiredField(field)">';
    radioTemplate += '<label for="{{::field.field_name+\'_\'+option.name}}'+bulk_form_depedent_id+'" class="custom-control-label line-height-24">{{option.name}} </label>';
    // radioTemplate += '</div>';
    radioTemplate += '</div>';
    radioTemplate += '</div>';
    radioTemplate += '</div>';

    multiselecttableTemplate = '<div ng-init="multipleInput(field,'+model_name+',field.options)" class="">';
    multiselecttableTemplate += '<div class="custom-form-group">';
    multiselecttableTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span>'; 
    multiselecttableTemplate += '<span ng-if="(field.related_table==\'jobs\' && (field.field_name==\'share_to_partners\'))" class="pl-1" uib-tooltip="Once Saved, this cannot be edited" tooltip-placement="right" tooltip-append-to-body="true"><i class="oorwin-information"></i></span>';
    multiselecttableTemplate += '</label>';
    // multiselecttableTemplate += '</div>';
    multiselecttableTemplate += '<div class="form-control-wrap">';
    multiselecttableTemplate += '<div ng-class="defineFieldAttrObj[field.field_name][\'after\'] ? \'input-group\' : \'\'">'; 
    multiselecttableTemplate += '<multiselect ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" multiple = "true" ng-model="'+model_name+'" options="cs.name for cs in field.options" change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" ng-required="isRequiredField(field)" ></multiselect>';
    multiselecttableTemplate += '<span ng-if="defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt"><span class="input-group-text"  compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted"><span></span>';
    multiselecttableTemplate += '</div></div>';
    multiselecttableTemplate += '</div>';
    multiselecttableTemplate += '</div>';

    currencyTemplate = '<div class="custom-form-fields">';
    currencyTemplate += '<div class="custom-form-group">';
    currencyTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span>'; 
    currencyTemplate += '</label>';
    // currencyTemplate += '</div>';
    currencyTemplate += '<div class="form-control-wrap">';
    currencyTemplate += '<input ng-disabled="{{isDisabledField(field)}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" class="form-control" multiple = "true" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-pattern="/^[0-9.]*$/" >';
    currencyTemplate += '</div>';
    currencyTemplate += '</div>';
    currencyTemplate += '</div>';

    rangeTemplate = '<div class="custom-form-fields">';
    rangeTemplate += '<div class="custom-form-group"  ng-hide="(isHiringTypeInternal && (field.related_table==\'jobs\' || field.related_table==\'job_pay_details\' || field.related_table==\'job_pay_billing_details\') && (field.field_name==\'client_rate\'))">';
    rangeTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span>'; 
    rangeTemplate += '</label>';
    // rangeTemplate += '</div>';
    rangeTemplate += '<div class="form-control-wrap" ng-if="!(isHiringTypeInternal && (field.related_table==\'jobs\' || field.related_table==\'job_pay_details\' || field.related_table==\'job_pay_billing_details\') && (field.field_name==\'client_rate\'))">';
    rangeTemplate += '<div class="row">';
    rangeTemplate += '<div class="col-md-5 pr-0">';
    rangeTemplate += '<input type="number" ng-init="rangeInput(field,'+model_name+')" ng-disabled="{{isDisabledField(field)}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" class="form-control not-required" multiple = "true"  ng-model="'+model_name_min+'" ng-pattern="/^[0-9.]*$/" limit-to-max min="0">';
    rangeTemplate += '</div>';
    rangeTemplate += '<div class="px-0 pt-2 text-center col-md-2">';
    rangeTemplate += 'To';
    rangeTemplate += '</div>';
    rangeTemplate += '<div class="col-md-5 pl-0">';
    rangeTemplate += '<input type="number" ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" placeholder="{{::field.place_holder}}" class="form-control" multiple = "true" ng-model="'+model_name_max+'" ng-required="isRequiredField(field)" ng-pattern="/^[0-9.]*$/" limit-to-max min="{{'+model_name_min+'}}">';
    rangeTemplate += '</div>';
    rangeTemplate += '</div>';
    rangeTemplate += '</div>';
    rangeTemplate += '</div>';
    rangeTemplate += '</div>';


    aadharTemplate = '<div class="custom-form-fields">';
    aadharTemplate += '<div class="custom-form-group">';
    aadharTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // aadharTemplate += '</div>';
    aadharTemplate += '<div class="form-control-wrap">';
    aadharTemplate += '<input ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" type="text" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ui-mask="9999-9999-9999"/>';
    aadharTemplate += '</div>';
    aadharTemplate += '</div>';
    aadharTemplate += '</div>';

    passportTemplate = '<div class="custom-form-fields">';
    passportTemplate += '<div class="custom-form-group">';
    passportTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // passportTemplate += '</div>';
    passportTemplate += '<div class="form-control-wrap">';
    passportTemplate += '<input ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" type="text" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-pattern="/[a-zA-Z]{1,2}[0-9]{6,9}$/" />';
    passportTemplate += '</div>';
    passportTemplate += '</div>';
    passportTemplate += '</div>';


    pancardTemplate = '<div class="custom-form-fields">';
    pancardTemplate += '<div class="custom-form-group">';
    pancardTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // pancardTemplate += '</div>';
    pancardTemplate += '<div class="form-control-wrap">';
    pancardTemplate += '<input ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" type="text" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" maxlength="10" ng-pattern="/[a-zA-Z0-9]{10}$/"/>';
    pancardTemplate += '</div>';
    pancardTemplate += '</div>';
    pancardTemplate += '</div>';


    pincodeTemplate = '<div class="custom-form-fields">';
    pincodeTemplate += '<div class="custom-form-group">';
    pincodeTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // pincodeTemplate += '</div>';
    pincodeTemplate += '<div class="form-control-wrap">';
    pincodeTemplate += '<input ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" type="text" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" maxlength="6" ng-pattern="/[1-9][0-9]{5}$/"/>';
    pincodeTemplate += '</div>';
    pincodeTemplate += '</div>';
    pincodeTemplate += '</div>';


    // template for project name
    jobProjectNameTemplate = '<div class="custom-form-fields"><div class="custom-form-group">';
    jobProjectNameTemplate += '<label class="form-label"> {{::field.label_name}}<span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    jobProjectNameTemplate += '<div class="form-control-wrap"  ng-init="setFormFieldProjectName(field,'+model_name+')">';
    jobProjectNameTemplate += '<div class="input-group">';
    jobProjectNameTemplate += '<div class="form-control" angucomplete-alt input-name="{{::field.field_name}}" id="{{::field.field_name}}"  pause="500" selected-object="setProjectId" placeholder="Search Project" remote-url="{{::WEB_API_URL}}getProjectsListJson" remote-url-request-formatter="remoteUrlRequestFn" remote-url-data-field="data" title-field="name" description-field="description" minlength="3" initial-value="selected_project_name[\'name\']" input-class="form-control" match-class="highlight" disable-input="isDisabledField(field)" input-changed="projectChanged" field-required="isRequiredField(field)">';
    jobProjectNameTemplate += '</div>';
    jobProjectNameTemplate += '<span compile-html" ng-if="defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span class="input-group-text" compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted"></span></span></div>'; 
    jobProjectNameTemplate += '</div>';
    jobProjectNameTemplate += '</div>';
    jobProjectNameTemplate += '</div>';

    /*For Account type
    accountTemplate = '<div class="custom-form-group">';
    accountTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span>  </label>';
    accountTemplate += '</div>';
    accountTemplate += '<div class="form-control-wrap" ng-init="setAccountName(field,'+model_name+','+prefix+"[field.related_table]['contact_name']"+')">';
    accountTemplate += '<div class="input-group" >';
    accountTemplate += '<div angucomplete-alt input-name="{{::field.field_name}}" id="{{::field.field_name}}"  pause="500" selected-object="setAccountId" remote-url="{{::WEB_API_URL}}getAccountsListJson" remote-url-request-formatter="remoteUrlRequestFn" remote-url-data-field="data" title-field="account_name" description-field="description" minlength="3" initial-value="selected_account_name[\'name\']" input-class="form-control" match-class="highlight" disable-input="isDisabledField(field)" field-required="isRequiredField(field)">';
    accountTemplate += '</div>';
    
    accountTemplate += '<span compile-html" ng-if="masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table != \'assignments\') && (field.related_table != \'opportunities\') && (field.related_table != \'jobs\')" class="input-group-append border-0l"><a ng-click="openAccountFormPopup(field)""><i class="mdi mdi-plus"></i></a></span>';

    accountTemplate += '<span ng-if= "masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table == \'assignments\') && defineFieldAttrObj[field.field_name][\'after\']" compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted" class="input-group-append border-0l"></span>';

    accountTemplate += '<span ng-if= "masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table == \'opportunities\') && defineFieldAttrObj[field.field_name][\'after\']" compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted" class="input-group-append border-0l"></span>';

    accountTemplate += '<span ng-if= "masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table == \'jobs\') && defineFieldAttrObj[field.field_name][\'after\']" compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted" class="input-group-append border-0l"></span>';
    */

    //For Multi State Template
    multiStateTemplate = '<div class="custom-form-fields">';
    multiStateTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    multiStateTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    multiStateTemplate += '</div>';
    multiStateTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    multiStateTemplate += '<fieldset ng-init="tagsCitiesInput(field,'+model_name+')">';
    multiStateTemplate += '<tags-input ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" display-property="city_state"  max-tags="10" replace-spaces-with-dashes="false" class="tag-autocomplete"   on-tag-adding="checkTagCount(field)" ><auto-complete source="loadStatesList($query, '+prefix+'[field.related_table]'+')" min-length="3" load-on-focus="false" load-on-empty="false" max-results-to-show="32" template="my-custom-state-template"></auto-complete></tags-input>';
    multiStateTemplate += '<script type="text/ng-template" id="my-custom-state-template"><span ng-bind-html="$highlight($getDisplayText())"></span></script>';
    multiStateTemplate += '</fieldset>';
    multiStateTemplate += '</div>';
    multiStateTemplate += '</div>';
    multiStateTemplate += '</div>';

    // Additional Text field for Range Field when Other option selected in select field
    customPayRateTemplate = '<div class="custom-form-fields">';
    customPayRateTemplate += '<div class="custom-form-group" ng-hide="(isHiringTypeInternal && (field.related_table==\'jobs\' || field.related_table==\'job_pay_details\' || field.related_table==\'job_pay_billing_details\') && (field.field_name==\'client_rate\'))">';
    customPayRateTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span>'; 
    customPayRateTemplate += '</label>';
    // customPayRateTemplate += '</div>';
    customPayRateTemplate += '<div class="form-control-wrap" ng-if="!(isHiringTypeInternal && field.related_table==\'jobs\' && (field.field_name==\'client_rate\'))">';
    customPayRateTemplate += '<div class="d-flex align-items-center" ng-if="'+prefix+'[field.related_table][field.dependent_field_name]!=\'Other\'" >';
    customPayRateTemplate += '<div class="">';
    customPayRateTemplate += '<input type="number" ng-init="rangeInput(field,'+model_name+')" placeholder="{{::field.place_holder}}" ng-disabled="{{isDisabledField(field)}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" class="form-control not-required" multiple = "true"  ng-model="'+model_name_min+'" ng-pattern="/^[0-9.]*$/" limit-to-max min="0">';
    customPayRateTemplate += '</div>';
    customPayRateTemplate += '<div class="px-3">';
    customPayRateTemplate += 'To';
    customPayRateTemplate += '</div>';
    customPayRateTemplate += '<div class="">';
    customPayRateTemplate += '<input type="number" ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" multiple = "true" ng-model="'+model_name_max+'" ng-required="isRequiredField(field)" ng-pattern="/^[0-9.]*$/" limit-to-max min="{{'+model_name_min+'}}">';
    customPayRateTemplate += '</div></div>';
    customPayRateTemplate += '<div ng-if="'+prefix+'[field.related_table][field.dependent_field_name]==\'Other\'" ng-init="rangeInput(field,\'\')">';
    customPayRateTemplate += '<input ng-disabled="isDisabledField(field) placeholder="{{::field.place_holder}}"" type="{{::field.type}}" class="form-control" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+prefix+'[field.related_table][\''+fieldData.field_name+'_other'+'\']" ng-required="isRequiredField(field)" autocomplete="false"/>';
    customPayRateTemplate += '</div></div>';
    customPayRateTemplate += '</div>';
    customPayRateTemplate += '</div>';

    //For Curreny field and Other text field
    currencyPayRateTemplate = '<div class="custom-form-fields">';
    currencyPayRateTemplate += '<div class="custom-form-group">';
    currencyPayRateTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span>'; 
    currencyPayRateTemplate += '</label>';
    // currencyPayRateTemplate += '</div>';
    currencyPayRateTemplate += '<div class="form-control-wrap" ng-if="'+prefix+'[field.related_table][field.dependent_field_name].toLowerCase()!=\'other\'" >';
    currencyPayRateTemplate += '<input ng-disabled="{{isDisabledField(field)}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" class="form-control" multiple = "true" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-pattern="/^[0-9.]*$/" >';
    currencyPayRateTemplate += '</div>';
    currencyPayRateTemplate += '<div class="form-control-wrap" ng-if="'+prefix+'[field.related_table][field.dependent_field_name].toLowerCase()==\'other\'" ng-init="'+model_name+'=\'\';">';
    currencyPayRateTemplate += '<input ng-disabled="isDisabledField(field)" type="{{::field.type}}" placeholder="{{::field.place_holder}}" class="form-control" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+prefix+'[field.related_table][\''+fieldData.field_name+'_other'+'\']" ng-required="isRequiredField(field)" autocomplete="false"/>';
    currencyPayRateTemplate += '</div>';
    currencyPayRateTemplate += '</div>';
    currencyPayRateTemplate += '</div>';

    //For Multi Language Template
    multiLanguageTemplate = '<div class="custom-form-fields">';
    multiLanguageTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    multiLanguageTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    multiLanguageTemplate += '</div>';
    multiLanguageTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    multiLanguageTemplate += '<fieldset ng-init="tagsInput(field,'+model_name+')">';
    multiLanguageTemplate += '<tags-input ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" display-property="text"  max-tags="10" replace-spaces-with-dashes="false" class="tag-autocomplete" on-tag-adding="checkTagCount(field)" ><auto-complete source="loadLanguagesList($query)" min-length="3" load-on-focus="true" load-on-empty="true" max-results-to-show="100" template="my-custom-lang-template"></auto-complete></tags-input>';
    multiLanguageTemplate += '<script type="text/ng-template" id="my-custom-lang-template"><span ng-bind-html="$highlight($getDisplayText())"></span></script>';
    multiLanguageTemplate += '</fieldset>';
    multiLanguageTemplate += '</div>';
    multiLanguageTemplate += '</div>';
    multiLanguageTemplate += '</div>';


    //For Multi Language Template
    multiAutoCompleteTemplate = '<div class="custom-form-fields">';
    multiAutoCompleteTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    multiAutoCompleteTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    multiAutoCompleteTemplate += '</div>';
    multiAutoCompleteTemplate += '<div class="tg" ng-class="(field.field_type==\'tag\' && field.cnf_form_id==2) ? \'\' : \'\'">';
    multiAutoCompleteTemplate += '<fieldset ng-init="tagsInput(field,'+model_name+')">';
    multiAutoCompleteTemplate += '<tags-input ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" display-property="text"  max-tags="10" replace-spaces-with-dashes="false" class="tag-autocomplete" on-tag-adding="checkTagCount(field)" ><auto-complete source="loadCustomAutoList($query, field.options)" min-length="3" load-on-focus="true" load-on-empty="true" max-results-to-show="100" template="my-custom-lang-template"></auto-complete></tags-input>';
    multiAutoCompleteTemplate += '<script type="text/ng-template" id="my-custom-lang-template"><span ng-bind-html="$highlight($getDisplayText())"></span></script>';
    multiAutoCompleteTemplate += '</fieldset>';
    multiAutoCompleteTemplate += '</div>';
    multiAutoCompleteTemplate += '</div>';
    multiAutoCompleteTemplate += '</div>';


    // For combine  Number field and Select Field
    customNumberSelectTemplate = '<div class="custom-form-fields">';
    customNumberSelectTemplate += '<div class="custom-form-group">';
    customNumberSelectTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
    // customNumberSelectTemplate += '</div>';
    customNumberSelectTemplate += '<div class="row"><div class="col-md-6">';
    customNumberSelectTemplate += '<input ng-init="numberSelectInput(field,'+model_name+')" ng-disabled="isDisabledField(field)" type="number" class="form-control" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name_min+'" ng-required="isRequiredField(field)" ng-pattern="/^[0-9.]*$/" string-to-number ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" />';
    customNumberSelectTemplate += '</div>';
    customNumberSelectTemplate += '<div class="col-md-6">';
    customNumberSelectTemplate += '<select ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" class="form-control custom-select" ng-model="'+model_name_max+'" ng-required="isRequiredField(field)" convert-to-number>';
    customNumberSelectTemplate += '<option value="">Select</option>';
    customNumberSelectTemplate += '<option ng-repeat="option in field.options" value="{{option.id}}">{{option.name}}</option>';
    customNumberSelectTemplate += '</select>';
    customNumberSelectTemplate += '</div></div>';
    customNumberSelectTemplate += '</div>';
    customNumberSelectTemplate += '</div>';


    

    nameSuffixSelectTemplate = '<div class="custom-form-fields">';
    nameSuffixSelectTemplate += '<div class="custom-form-group"  >';
    nameSuffixSelectTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span>'; 
    nameSuffixSelectTemplate += '</label>';
    // nameSuffixSelectTemplate += '</div>';
    nameSuffixSelectTemplate += '<div class="form-control-wrap" >';
    nameSuffixSelectTemplate += '<div class="row">';
    nameSuffixSelectTemplate += '<div class="col-md-4 pr-0">';
    nameSuffixSelectTemplate += '<select  ng-disabled="{{isDisabledField(field)}}" name="first_name_prefix" class="form-control not-required"  ng-model="'+model_name_suffix+'" >';
    
    nameSuffixSelectTemplate += '<option value="">Select</option>';
   // '<option value="Mr">Mr</option><option value="Mrs">Mrs</option><option value="Ms">Ms</option>';
    nameSuffixSelectTemplate += '<option ng-repeat="option in field.options" value="{{option.id}}">{{option.name}}</option>';
    nameSuffixSelectTemplate += '</select>';
    nameSuffixSelectTemplate += '</div>';
    
    nameSuffixSelectTemplate += '<div class="col-md-8 pl-1">';
    nameSuffixSelectTemplate += '<input type="text" ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" multiple = "true" ng-model="'+model_name+'" ng-required="isRequiredField(field)" >';
    nameSuffixSelectTemplate += '</div>';
    nameSuffixSelectTemplate += '</div>';
    nameSuffixSelectTemplate += '</div>';
    nameSuffixSelectTemplate += '</div>';
    nameSuffixSelectTemplate += '</div>';


    dependentSelectTimezoneTableTemplate = '<div class="custom-form-fields">';
    dependentSelectTimezoneTableTemplate += '<div class="custom-form-group">';
    dependentSelectTimezoneTableTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    dependentSelectTimezoneTableTemplate += '<div class="form-control-wrap">';
    dependentSelectTimezoneTableTemplate += '<select ng-disabled="isDisabledField(field)" name="{{::field.field_name}}" class="form-control custom-select" ng-model="'+model_name+'" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" ng-required="isRequiredField(field)">';
    dependentSelectTimezoneTableTemplate += '<option value="">Select</option>';
    dependentSelectTimezoneTableTemplate += '<option ng-repeat="option in getTimezoneListDropdownOptions(field,'+bulk_form_depedent_id+')" value="{{option.id}}">{{option.name}} </option>';
    dependentSelectTimezoneTableTemplate += '</select>';
    dependentSelectTimezoneTableTemplate += '</div>';
    dependentSelectTimezoneTableTemplate += '</div>';
    dependentSelectTimezoneTableTemplate += '</div>';


    // select2Template = '<div class="custom-form-fields">';
    // select2Template += '<div class="custom-form-group" ng-hide="(isHiringTypeInternal && field.related_table==\'jobs\' && (field.field_name==\'client_pay_type\' || field.field_name==\'placement_type\')) ||  (isHiringTypeNonBillable && (field.related_table==\'assignment_billing_information\' || field.related_table== \'assignment_payment_revises\') && (field.field_name==\'bill_type\'))">';
    // select2Template += '<div class="d-flex align-items-center">';
    // select2Template += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label><a class="pl-2" ng-if="(field.field_name==\'work_authorization\' && masterLayout.company_settings.operation_country_id == 1 && id)" ng-click="changeWorkAuthorization(field,\'add_emp\',\' \',completed_i9_id)"><i class="mdi mdi-pencil"></i></a>';
    // select2Template += '</div>';
    // select2Template += '<div class="form-control-wrap" ng-hide="(isHiringTypeInternal && field.related_table==\'jobs\' && (field.field_name==\'client_pay_type\' || field.field_name==\'placement_type\')) ||  (isHiringTypeNonBillable && (field.related_table==\'assignment_billing_information\' || field.related_table== \'assignment_payment_revises\') && (field.field_name==\'bill_type\'))">';
    // select2Template += '<div ng-class="defineFieldAttrObj[field.field_name][\'after\'] ? \'input-group\' : \'\'">'; 
    // select2Template += '<div class="input-group">'
    // select2Template +='<ui-select ng-disabled="isDisabledField(field) || (field.field_name==\'work_authorization\' && masterLayout.company_settings.operation_country_id == 1 && id)" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" skip-focusser="true"  input-id="user_{{$index}}"  theme="select2" style="width: 252px;">';
    // select2Template +='<ui-select-match placeholder="Select" class="cuser_{{$index}} form-control pt-1" style="height:36px;">{{$select.selected.name}}</ui-select-match>';
    // select2Template +='<ui-select-choices class="cuser_{{$index}}" repeat="options.id as options in (field.options | filter: {name: $select.search}) track by $index">';
    // select2Template +='<div ng-bind-html="options.name | highlight: $select.search"></div>';
    // select2Template +='</ui-select-choices>';
    // select2Template +='<ui-select-no-choice><div>No records found</div></ui-select-no-choice>';
    // select2Template +='</ui-select>';
    // select2Template += '</div>';
    // select2Template += '<span ng-if="defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span class="input-group-text"  compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted"><span></span>';
    // select2Template += '</div>';
    // select2Template += '</div>';
    // select2Template += '</div>';
    // select2Template += '</div>';


    
    switch(fieldData.field_type) {





        case 'text':
            if(fieldData.is_prefix)
                template = prefixTemplate;
            else
                template = textTemplate;
            break; 
        case 'email':
            template = emailTemplate;
            break; 
        case 'account_contact_email':
            template = emailTemplate;
            break;
        case 'ssn':
            template = ssnTemplate;
            break; 
        case 'phone':
            template = phoneTemplate;
            break;
        case 'extension_phone_number':
            template = extensionPhoneNumberTemplate;
            break;
        case 'account_contact_phone':
            template = phoneTemplate;
            break; 
        case 'number':
            template = numberTemplate;
            break; 
        case 'decimal':
            template = decimalTempalte;
            break; 
        case 'percentage':
            template = percentageTemplate;
            break; 
        case 'date':
            template = (fieldData.field_name =='targetDate' &&fieldData.related_table =='jobs')? dateTemplateTargetDate: dateTemplate;
            break;
        case 'checkbox':
            template = checkboxTemplate;
            break; 
        case 'textarea':
            template = textareaTemplate;
            break;
        case 'textareaeditor':
            template = textareaeditorTemplate;
            break;
        case 'select':
            template = selectTemplate;
            break;
        case 'multiple':
            template = multipleTemplate;
            break;
        case 'multiplegroup':
            template = multipleGroupTemplate;
            break;
        case 'dependent_selectstate_table':
            template = dependent_selectstate_tableTemplate;
            break;  
        case 'dependent_multiselectstate_table':
            template = dependent_multiselectstate_tableTemplate;
            break;  
        case 'location':
            template = locationTemplate;
            break; 
        case 'multicity':
            template = multiLocationTemplate;
            break;
        case 'selectcountrytable':
            template = selectcountrytableTemplate;
            break;
        case 'selecttable':
            template = selecttableTemplate;
            break;
        case 'searchselecttable':
            template = searchselecttableTemplate;
            break; 
        case 'multisearchselecttable':
            template = multisearchselecttableTemplate;
            break; 
        case 'account_contact':
            template = searchselectAccountContactTemplate;           
            break;
        case 'autoselecttable':
            template = searchCodeTemplate;       
            break; 
        case 'file':
            template = fileTemplate;
            break; 
        case 'url':
            template = urlTemplate;
            break;
        case 'checkboxes':
            template = checkBoxesTemplate;
            break; 
        case 'radio':
            template = radioTemplate;
            break;
        case 'tag':
            template = tagTemplate;
            break;
        case 'tag_email':
            template = tagEmailTemplate;
            break;
        case 'tag_technical_skills':
            template = tagSkillsTemplate;
            break;
        case 'multiselecttable':
            template = multiselecttableTemplate;
            break;
        case 'currency':
            template = currencyTemplate;
            break;
        case 'range':
            template = rangeTemplate;
            break;
        case 'aadhar':
            template = aadharTemplate;
            break;

        case 'passport':
            template = passportTemplate;
            break;

        case 'pancard':
            template = pancardTemplate;
            break;
            
        case 'multistate':
            template = multiStateTemplate;
            break;

        case 'multilanguage':
            template = multiLanguageTemplate;
            break;
        case 'multicustomauto':
            template = multiAutoCompleteTemplate;
            break;

        case 'numberselect':
            template = customNumberSelectTemplate;
            break;

       case 'pincode':
            template = pincodeTemplate;
            break; 
       case 'name_suffix':

            template = nameSuffixSelectTemplate;
            console.log(template);

            break 

        /*For Account type
        case 'account':
            template = accountTemplate;
            break;*/
    }

    if((fieldData.related_table=='candidates' && fieldData.field_name=='comment')||(fieldData.related_table=='jobs' && fieldData.field_name=='comment')) {
        template = textareaTemplateFullWidth;   
    }
    
    if(fieldData.related_table=='candidates' && fieldData.field_name=='expected_pay_rate'){
        template = customPayRateTemplate;
    }

    if(fieldData.related_table=='jobs' && fieldData.field_name=='project_name'){
        template = jobProjectNameTemplate;
    }

    if(fieldData.related_table=='candidates' && fieldData.field_name=='current_pay_rate'){
        template = currencyPayRateTemplate;
    }

    if(fieldData.related_table=='job_submissions' && (fieldData.field_name=='expected_pay' || fieldData.field_name=='expected_pay_rate' || fieldData.field_name=='current_pay_rate')){
        template = currencyPayRateTemplate;
    }

    if(fieldData.related_table=='account_interview_address' && fieldData.field_name=='timezone'){
        template = dependentSelectTimezoneTableTemplate;
    }

    return template;
}


var getConfigTemplate = function(fieldData, prefix, attrs)
{
    var template = '';

    model_name = prefix+'[field.related_table][field.field_name]';

    accountNameTemplate = '<div class="custom-form-fields">';
    accountNameTemplate += '<div class="custom-form-group">';
    accountNameTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // accountNameTemplate += '</div>';
    accountNameTemplate += '<div class="form-control-wrap">';
    //accountNameTemplate += '<div angucomplete-alt placeholder="" selected-object="setCompanyName" input-changed="companyChanged" remote-url="{{::WEB_API_URL}}web/getAccounts" remote-url-request-formatter="remoteCompanyUrlRequestFn" title-field="name" image-field="logo" search-fields="name" minlength="3" pause="200" description-field="domain" input-class="form-control" match-class="highlight" initial-value="{\'name\' : '+model_name+', \'linkedin_url\': '+prefix+'[\'accounts\'][\'linkedin_url\'], \'domain\': '+prefix+'[\'accounts\'][\'website\']}" field-required="true" template-url="accountname-autocomplete-template.html" input-name="{{::field.field_name}}">';
    accountNameTemplate += '<div angucomplete-alt placeholder="" selected-object="setCompanyNameLinkedinURL" input-changed="companyChanged" remote-url="{{::WEB_API_URL}}web/getAccounts" remote-url-request-formatter="remoteCompanyUrlRequestFn" title-field="title" image-field="pagemap.cse_image.0.src" search-fields="title" minlength="3" pause="200" description-field="" input-class="form-control" match-class="highlight" initial-value="{\'title\' : '+model_name+', \'link\': '+prefix+'[\'accounts\'][\'linkedin_url\']}" field-required="true" template-url="accountname-autocomplete-template.html" input-name="{{::field.field_name}}">';
    accountNameTemplate += '</div>';                                    
    accountNameTemplate += '</div>';
    accountNameTemplate += '</div>';
    accountNameTemplate += '</div>';

    websiteTemplate = '<div class="custom-form-fields">';
    websiteTemplate += '<div class="custom-form-group">';
    websiteTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // websiteTemplate += '</div>';
    websiteTemplate += '<div class="form-control-wrap">';
    websiteTemplate += '<input ng-disabled="isDisabledField(field)" type="{{::field.type}}" class="form-control" id="{{::field.field_name}}" placeholder="{{::field.place_holder}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" autocomplete="false" ng-blur="getCustomerInsights('+model_name+')" ng-pattern="/(http(s)?://.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/"/>';
    websiteTemplate += '</div>';
    websiteTemplate += '</div>';
    websiteTemplate += '</div>';
    

    clientTemplate = '<div class="custom-form-group">';
    clientTemplate += '<div class="form-control-wrap" ng-if="!isHiringTypeNonBillable">';
    clientTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span>  </label>';
    clientTemplate += '</div>';

    if (isNotEmpty(attrs.mdAutoComplete)) {
        clientTemplate += '<div class="" ng-if="!isHiringTypeNonBillable">\
            <div class="input-group" ng-if="!isHiringTypeInternal">\
                <md-autocomplete class="form-control" md-input-id="{{::field.field_name}}" md-input-class="form-control" \
                    md-selected-item="'+ model_name + '" \
                    ng-required="isRequiredField(field)" ng-disabled="isDisabledField(field)" \
                    md-no-cache="false" md-search-text="accountSearchInput" \
                    md-search-text-change="fetchAccountsListJson(accountSearchInput)" \
                    md-selected-item-change="mdAutoCompleteFldChangeEvent(item)" \
                    md-items="item in fetchAccountsListJson(accountSearchInput)" \
                    md-item-text="item.name" md-min-length="3" md-delay="500" \
                    md-clear-button="false" placeholder="" \
                    md-input-name="{{::field.field_name}}"> \
                    <md-item-template> \
                        <span md-highlight-text="accountSearchInput" md-highlight-flags="^i">\
                            {{item.name}}\
                        </span>\
                    </md-item-template>\
                    <md-not-found>\
                        No results found.\
                    </md-not-found>\
                </md-autocomplete>\
            ';
    } else {
        clientTemplate += '<div class="form-control-wrap" ng-init="setAccountName(field,'+model_name+','+prefix+"[field.related_table]['client_manager_name']"+','+prefix+"[field.related_table]['secondary_contact']"+')">';
        clientTemplate += '<div class="input-group" ng-if="!isHiringTypeInternal">';
        clientTemplate += '<div class="form-control" angucomplete-alt input-name="{{::field.field_name}}" id="{{::field.field_name}}"  pause="500" selected-object="setAccountId" remote-url="{{::WEB_API_URL}}getAccountsListJson" remote-url-request-formatter="remoteUrlRequestFn" remote-url-data-field="data" title-field="account_name" description-field="description" minlength="3" initial-value="selected_account_name[\'name\']" input-class="form-control" match-class="highlight" disable-input="isDisabledField(field)" field-required="isRequiredField(field)">';
        clientTemplate += '</div>';
    }
    clientTemplate += '<span compile-html" ng-if="masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table != \'assignments\') && (field.related_table != \'opportunities\') && (field.related_table != \'leads\') && (field.related_table != \'jobs\' && (field.related_table != \'requisitions\'))" class="input-group-append input-group-append-alt"><a class="input-group-text" ng-click="openAccountFormPopup(field)""><i class="mdi mdi-plus"></i></a></span>';

    clientTemplate += '<span ng-if= "masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table == \'assignments\') && defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span class="input-group-text" compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted" ></span></span>';

    clientTemplate += '<span ng-if= "masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table == \'opportunities\') && defineFieldAttrObj[field.field_name][\'after\']"  class="input-group-append input-group-append-alt border-0l"><span  compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted" class="input-group-text"></span></span>';

    clientTemplate += '<span ng-if= "masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table == \'jobs\') && defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted"  class="input-group-text"></span></span>';

    clientTemplate += '<span ng-if= "masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table == \'leads\') && defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span  compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted" class="input-group-text"></span></span>';


    // clientTemplate += '<span compile-html" ng-if="(field.related_table==\'pool_jobs\')" ng class="input-group-append border-0l"><a ng-click="setPoolSubmissionConfigure($event,form_model)"><i class="mdi mdi-settings"></i></a></span>';                                  
    

    
    clientTemplate += '</div>';
    clientTemplate += '<div class="input-group" ng-if="isHiringTypeInternal">';
    clientTemplate += '<span class="form-control border-0">Internal</span>';  
    clientTemplate += '</div>';
    clientTemplate += '</div>';
    clientTemplate += '</div>';




    ///account form field
    accountTemplate = '<div class="custom-form-fields" ng-hide="(field.related_table == \'candidates\') && (field.field_name == \'vendor\') && !(show_vendor_field)">';
    accountTemplate += '<div class="custom-form-group">';
    accountTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span>  </label>';
    // accountTemplate += '</div>';

    accountTemplate += '<div class="form-control-wrap" ng-init="setFormFieldAccountName(field,'+model_name+')">';
    accountTemplate += '<div class="input-group">';
    accountTemplate += '<div class="form-control" angucomplete-alt input-name="{{::field.field_name}}" id="{{::field.field_name}}"  pause="500" selected-object="setFormFieldAccountId" remote-url="'+WEB_API_URL+'getAccountsListJson/{{::field.id}}" remote-url-request-formatter="remoteUrlRequestFn" remote-url-data-field="data" title-field="account_name" description-field="description" minlength="3" initial-value="selected_account_name[field.field_name]" input-class="form-control" match-class="highlight" disable-input="isDisabledField(field)" field-required="isRequiredField(field)">';
    accountTemplate += '</div>';

    accountTemplate += '<span compile-html" ng-if="masterLayout[\'permissions\'][\'access\'][\'accounts\'][\'add\'] && (field.related_table == \'candidates\') && (isEmpty(AccountID))" class="input-group-append input-group-append-alt border-0l"><a class="input-group-text" ng-click="openAccountFormPopup(field)""><i class="mdi mdi-plus"></i></a></span>';
    accountTemplate += '</div>';
    accountTemplate += '</div>';
    accountTemplate += '</div>';
    accountTemplate += '</div>';



    clientManagerNameTemplate = '<div class="custom-form-fields">';
    clientManagerNameTemplate += '<div class="custom-form-group" ng-if="(fromQuickAdd && field.related_table==\'jobs\') || (!isHiringTypeInternal && !fromQuickAdd && field.related_table==\'jobs\' && (isEmpty(stages_data) || !showClientVendorSection)) || (field.related_table==\'pool_jobs\' && (isEmpty(stages_data) || !showClientVendorSection)) || (field.related_table==\'opportunities\') || (field.related_table==\'one_time_placements\') || (field.related_table==\'projects\')">';

    clientManagerNameTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // clientManagerNameTemplate += '</div>';
    clientManagerNameTemplate += '<div class="form-control-wrap">'; //ng-init="multipleStrInput(field,'+model_name+',field.options)"
    clientManagerNameTemplate += '<div class="input-group" g-if="(!isHiringTypeInternal && fromQuickAdd && field.related_table==\'jobs\') || (!isHiringTypeInternal && !fromQuickAdd && field.related_table==\'jobs\' && (isEmpty(stages_data) || !showClientVendorSection)) || (field.related_table==\'pool_jobs\' && (isEmpty(stages_data) || !showClientVendorSection)) || (field.related_table==\'opportunities\') || (field.related_table==\'one_time_placements\') || (field.related_table==\'projects\')">';
    clientManagerNameTemplate += '<multiselect selected-object="setAccountContactDetails" ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'"  options  = "cs.name for cs in objClientListNames" change="selected(field, '+model_name+')" ng-required="field.is_required" ></multiselect>';
    clientManagerNameTemplate += '</multiselect>'; 
    clientManagerNameTemplate += '<span compile-html" ng-if="masterLayout[\'permissions\'][\'access\'][\'contacts\'][\'add\']" class="input-group-append input-group-append-alt border-0l"><a class="input-group-text" ng-click="openAccountContactFormPopup(field)""><i class="mdi mdi-plus"></i></a></span>';                                  
    clientManagerNameTemplate += '</div>';
    clientManagerNameTemplate += '<div class="input-group" ng-if="(isHiringTypeInternal && fromQuickAdd && field.related_table==\'jobs\') || (isHiringTypeInternal && field.related_table==\'pool_jobs\')">';
    clientManagerNameTemplate += '<span class="form-control border-0">Internal</span>';  
    clientManagerNameTemplate += '</div>';
    clientManagerNameTemplate += '</div>';
    clientManagerNameTemplate += '</div>';
    clientManagerNameTemplate += '</div>';

    interviewiersTemplate = '<div class="custom-form-fields">';
    interviewiersTemplate += '<div class="custom-form-group"ng-init="multipleInput(field,'+model_name+',field.options)">';
    interviewiersTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    interviewiersTemplate += '<div class="form-control-wrap">'; //ng-init="multipleStrInput(field,'+model_name+',field.options)"
    interviewiersTemplate += '<div class="input-group">';
    interviewiersTemplate += '<multiselect ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'"  multiple = "true" options="cs.name for cs in field.options" change="selected(field, '+model_name+')" ng-required="isRequiredField(field)" ></multiselect>';
    interviewiersTemplate += '</multiselect>'; 
    interviewiersTemplate += '<span compile-html" class="input-group-append input-group-append-alt border-0l"><a class="input-group-text" uib-tooltip="Add Interviewer" tooltip-placement="bottom" tooltip-append-to-body="true"ng-click="openAddInterviewerPopup(field)""><i class="mdi mdi-plus"></i></a></span>';                                  
    interviewiersTemplate += '</div>';
    interviewiersTemplate += '</div>';
    interviewiersTemplate += '</div>';
    interviewiersTemplate += '</div>';

    opportunityLeadTemplate = '<div class="custom-form-fields"><div class="custom-form-group" ng-init="multipleInput(field,'+model_name+',field.options)">';
    opportunityLeadTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    opportunityLeadTemplate += '<div class="form-control-wrap">';
    opportunityLeadTemplate += '<div ng-class="defineFieldAttrObj[field.field_name][\'after\'] ? \'input-group\' : \'\'">';
    opportunityLeadTemplate += '<multiselect ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'" options="cs.name for cs in objLeadListNames" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" ng-required="isRequiredField(field)" ng-click="'+fieldData.field_name+'_old = '+model_name+';"></multiselect>';
    opportunityLeadTemplate += '<span ng-if="defineFieldAttrObj[field.field_name][\'after\']" class="input-group-append input-group-append-alt border-0l"><span class="input-group-text" compile-html ng-bind-html="defineFieldAttrObj[field.field_name][\'after\'] | toTrusted"></span></span></div>';
    opportunityLeadTemplate += '</div>';
    opportunityLeadTemplate += '</div>';
    opportunityLeadTemplate += '</div>';
    
    clientManagerNameMultipleTemplate = '<div class="custom-form-fields">';
    clientManagerNameMultipleTemplate += '<div class="custom-form-group" ng-if="(field.related_table==\'opportunities\')">';

    clientManagerNameMultipleTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // clientManagerNameMultipleTemplate += '</div>';
    clientManagerNameMultipleTemplate += '<div class="form-control-wrap">'; //ng-init="multipleStrInput(field,'+model_name+',field.options)"
    clientManagerNameMultipleTemplate += '<div class="input-group" g-if="(!isHiringTypeInternal && fromQuickAdd && field.related_table==\'jobs\') || (!isHiringTypeInternal && !fromQuickAdd && field.related_table==\'jobs\' && (isEmpty(stages_data) || !showClientVendorSection)) || (field.related_table==\'pool_jobs\' && (isEmpty(stages_data) || !showClientVendorSection)) || (field.related_table==\'opportunities\') || (field.related_table==\'one_time_placements\') || (field.related_table==\'projects\')">';
    clientManagerNameMultipleTemplate += '<multiselect selected-object="setAccountContactDetails" ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'"  options  = "cs.name for cs in objClientListNames" change="selected(field, '+model_name+')" ng-required="field.is_required" multiple="true"></multiselect>';
    clientManagerNameMultipleTemplate += '</multiselect>'; 
    //clientManagerNameMultipleTemplate += '<span compile-html" ng-if="masterLayout[\'permissions\'][\'access\'][\'contacts\'][\'add\']" class="input-group-append input-group-append-alt border-0l"><a class="input-group-text" ng-click="openAccountContactFormPopup(field)""><i class="mdi mdi-plus"></i></a></span>';                                  
    clientManagerNameMultipleTemplate += '</div>';
    clientManagerNameMultipleTemplate += '<div class="input-group" ng-if="(isHiringTypeInternal && fromQuickAdd && field.related_table==\'jobs\') || (isHiringTypeInternal && field.related_table==\'pool_jobs\')">';
    clientManagerNameMultipleTemplate += '<span class="form-control border-0">Internal</span>';  
    clientManagerNameMultipleTemplate += '</div>';
    clientManagerNameMultipleTemplate += '</div>';
    clientManagerNameMultipleTemplate += '</div>';
    clientManagerNameMultipleTemplate += '</div>';

    // behalfTemplate = '<div class="custom-form-group">';
    // behalfTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // behalfTemplate += '</div>';
    // behalfTemplate += '<div class="form-control-wrap">';
    // behalfTemplate += '<input ng-disabled="isDisabledField(field)" ng-true-value="\'1\'" ng-false-value="\'0\'" class="custom-checkbox" name="{{::field.field_name}}" ng-change="changeBehalf()" type="checkbox"  ng-model="'+model_name+'" value="{{::field.value}}" ng-required="isRequiredField(field)" id="{{::field.field_name}}" placeholder="{{::field.instructions}}" ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}">';
    // behalfTemplate += '<label for="{{::field.field_name}}"></label>';
    // behalfTemplate += '</div>';

    opportunityOwnerTemplate = '<div class="custom-form-fields">';
    opportunityOwnerTemplate += '<div class="custom-form-group" ng-init="multipleStrInput(field,'+model_name+',field.options)">';
    opportunityOwnerTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
    // opportunityOwnerTemplate += '</div>';
    opportunityOwnerTemplate += '<div class="form-control-wrap" ng-if = "isOnBehalf == true">';
    opportunityOwnerTemplate += '<multiselect ng-disabled="true || {{ isDisabledField(field) }}" name="{{::field.field_name}}" class="form-control" multiple="true" ng-model="'+model_name+'" options="cs.name for cs in field.options" change="selected()" ng-required="isRequiredField(field)" ></multiselect>';
    opportunityOwnerTemplate += '</div>';
    opportunityOwnerTemplate += '<div class="form-control-wrap" ng-if = "isOnBehalf == false">';
    opportunityOwnerTemplate += '<multiselect ng-disabled="{{ isDisabledField(field) }}" name="{{::field.field_name}}" class="form-control" multiple="true" ng-model="'+model_name+'" options="cs.name for cs in field.options" change="selected()" ng-required="isRequiredField(field)" ></multiselect>';
    opportunityOwnerTemplate += '</div>';
    opportunityOwnerTemplate += '</div>';
    opportunityOwnerTemplate += '</div>';

        

    if (fieldData.field_type == 'account') {
        template = accountTemplate;
    } else {
        switch(fieldData.field_name) {
            case 'account_name':
                template = accountNameTemplate;
                break; 
            case 'website':
                template = websiteTemplate;
                break; 
            case 'client':
            case 'client_id':
                template = clientTemplate;
                break; 
            case 'client_manager_name':
                template = clientManagerNameTemplate;
                break;
            case 'interviewers':
                template=interviewiersTemplate;
                break;    
            case 'secondary_contact':
                template = clientManagerNameMultipleTemplate;
                break; 
            case 'lead_id':
                template = opportunityLeadTemplate;
                break;
            // case 'on_behalf_of':
            //     template = behalfTemplate;
            //     break; 
            // case 'opportunity_owner':
            //     template = opportunityOwnerTemplate;
            //     break;            
        }
    }

    if(fieldData.related_table=='opportunities' && fieldData.field_name == 'workflow_id') {
        opportunityWorkflowTemplate = '<div class="custom-form-fields">';
        opportunityWorkflowTemplate += '<div class="custom-form-group">';
        opportunityWorkflowTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
        // opportunityWorkflowTemplate += '</div>';
        opportunityWorkflowTemplate += '<div class="form-control-wrap">';
        opportunityWorkflowTemplate += '<div class="input-group" ng-if="!isHiringTypeInternal">';
        opportunityWorkflowTemplate += '<div angucomplete-alt input-name="{{::field.field_name}}" id="{{::field.field_name}}"  pause="500" selected-object="setAccountId" remote-url="{{::WEB_API_URL}}getAccountsListJson" remote-url-request-formatter="remoteUrlRequestFn" remote-url-data-field="data" title-field="account_name" description-field="description" minlength="2" initial-value="selected_account_name" input-class="form-control" match-class="highlight" disable-input="isDisabledField(field)" field-required="isRequiredField(field)">';
        opportunityWorkflowTemplate += '</div>';
        opportunityWorkflowTemplate += '<span compile-html" class="input-group-append border-0l"><a class="input-group-text" ng-click="openAccountFormPopup(field)""><i class="mdi mdi-plus"></i></a></span>';
        opportunityWorkflowTemplate += '<span compile-html" ng-if="(field.related_table==\'pool_jobs\')" ng class="input-group-append border-0l"><a class="input-group-text" ng-click="setPoolSubmissionConfigure($event,form_model)"><i class="mdi mdi-settings"></i></a></span>';
        opportunityWorkflowTemplate += '</div>';
        opportunityWorkflowTemplate += '<div class="input-group" ng-if="isHiringTypeInternal">';
        opportunityWorkflowTemplate += '<span class="form-control border-0">Internal</span>';  
        opportunityWorkflowTemplate += '</div>';
        opportunityWorkflowTemplate += '</div>';
        opportunityWorkflowTemplate += '</div>';
        opportunityWorkflowTemplate += '</div>';

        template = opportunityWorkflowTemplate;
    } else if(fieldData.related_table=='opportunities' && fieldData.field_name == 'workflow_stage_id') {
        opportunityWorkflowStageTemplate = '<div class="custom-form-fields">';
        opportunityWorkflowStageTemplate += '<div class="custom-form-group">';
        opportunityWorkflowStageTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span> </label>';
        // opportunityWorkflowStageTemplate += '</div>';
        opportunityWorkflowStageTemplate += '<div class="form-control-wrap">';
        opportunityWorkflowStageTemplate += '<div class="input-group" ng-if="!isHiringTypeInternal">';
        opportunityWorkflowStageTemplate += '<multiselect selected-object="setAccountContactDetails" ng-disabled="{{isDisabledField(field)}}" name="{{::field.field_name}}" class="form-control" ng-model="'+model_name+'"  options  = "cs.name for cs in objClientListNames" change="selected(field, '+model_name+')" ng-required="field.is_required" ></multiselect>';
        opportunityWorkflowStageTemplate += '</multiselect>'; 
        opportunityWorkflowStageTemplate += '<span compile-html" class="input-group-append border-0l"><a class="input-group-text" ng-click="openAccountContactFormPopup(field)""><i class="mdi mdi-plus"></i></a></span>';                                  
        opportunityWorkflowStageTemplate += '</div>';
        opportunityWorkflowStageTemplate += '<div class="input-group" ng-if="isHiringTypeInternal">';
        opportunityWorkflowStageTemplate += '<span class="form-control border-0">Internal</span>';  
        opportunityWorkflowStageTemplate += '</div>';
        opportunityWorkflowStageTemplate += '</div>';
        opportunityWorkflowStageTemplate += '</div>';
        opportunityWorkflowStageTemplate += '</div>';

        template = opportunityWorkflowStageTemplate;
    }
    else if (fieldData.related_table=='otp_billing_details' && fieldData.field_name == 'ctc_per_year') {
        permPlacementBillCTCTemplate = '<div class="custom-form-fields">';
        permPlacementBillCTCTemplate += '<div class="custom-form-group" ng-if="!(isHiringTypeNonBillable && (field.related_table==\'assignment_billing_information\' || field.related_table== \'assignment_payment_revises\') && (field.field_name==\'bill_rate\' || field.field_name==\'ot_bill_rate\'))">';
        permPlacementBillCTCTemplate += '<label class="form-label"> {{::field.label_name}} <span ng-if="isRequiredField(field)" class="mandatory-cls text-danger">*</span></label>';
        permPlacementBillCTCTemplate += '<div class="form-control-wrap" ng-if="!(isHiringTypeNonBillable && (field.related_table==\'assignment_billing_information\' || field.related_table== \'assignment_payment_revises\') && (field.field_name==\'bill_rate\' || field.field_name==\'ot_bill_rate\'))">';
        permPlacementBillCTCTemplate += '<div class="input-group">';
        permPlacementBillCTCTemplate += '<input ng-if="!allowZeroForDecimals" ng-disabled="isDisabledField(field)" type="decimal" class="form-control" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-pattern="/^[1-9]\\d{0,7}(\\.\\d{0,2})*(\\d+)?$/"  ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" ng-enter="{{ ::defineFieldAttrObj[field.field_name][\'ng_enter\'] }}" />';
        permPlacementBillCTCTemplate += '<input ng-if="allowZeroForDecimals" ng-disabled="isDisabledField(field)" type="decimal" class="form-control" id="{{::field.field_name}}" name="{{::field.field_name}}" ng-model="'+model_name+'" ng-required="isRequiredField(field)" ng-pattern="/^[0-9]\\d{0,7}(\\.\\d{0,2})*(\\d+)?$/"  ng-change="{{ ::defineFieldAttrObj[field.field_name][\'ng_change\'] }}" />';
        permPlacementBillCTCTemplate += '<span class="input-group-append input-group-append-alt border-0l"><span class="input-group-text bg-success" uib-tooltip="Calculate the billing as per the slab" tooltip-placement="right" tooltip-append-to-body="true" compile-html><a ng-click="checkInAccountInvoiceSlabs()"><i class="oorwin-right-arrow text-white"></i></a></span></span>';
        permPlacementBillCTCTemplate += '</div>';
        permPlacementBillCTCTemplate += '</div>';
        permPlacementBillCTCTemplate += '</div>';

        template = permPlacementBillCTCTemplate;
    }

    return template;
}