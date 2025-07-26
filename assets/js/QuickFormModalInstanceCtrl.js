var isVisibleFunc = function(field, $scope,bulk_form_id='') {
    if (typeof field == 'undefined') {
        return false;
    }

    if(field.related_table == 'custom_lead_form') {
        return true;
    }
    if(field.related_table == 'jobs' && typeof $scope[$scope.form_model] != 'undefined'){
        if(isNotEmpty($scope[$scope.form_model][field.related_table]) && $scope[$scope.form_model][field.related_table].hasOwnProperty('title')){
            $scope.checkJobTitleEmpty($scope[$scope.form_model][field.related_table]);
        }
    }
    if(field.related_table == 'requisitions' && typeof $scope[$scope.form_model] != 'undefined'){
        if(isNotEmpty($scope[$scope.form_model][field.related_table]) && $scope[$scope.form_model][field.related_table].hasOwnProperty('title')){
            $scope.checkJobTitleEmpty($scope[$scope.form_model][field.related_table]);
        }
    }
    if((field.related_table == 'jobs' || field.related_table == 'pool_jobs') && (field.field_name=='client_contact_email' || field.field_name =='client_contact_phone')){ // For Configure Fields Hide and show
       
        if(typeof $scope[$scope.form_model] == 'undefined') {
            if(isEmpty($scope.customdata['jobs']['client'])) {
                return false;
            }
            return true;
        }
      
        if(typeof $scope[$scope.form_model]['job_submissions'] != 'undefined') {
            return true;
        }else if(isEmpty($scope[$scope.form_model][field.related_table])){
            return false;
        }
        else if(isEmpty($scope[$scope.form_model][field.related_table]['client_manager_name'])){
            return false;
        }

    }

    if((field.related_table == 'jobs' && isNotEmpty($scope.masterLayout.company_settings.company_type) && $scope.masterLayout.company_settings.company_type != 'recruitment') && (field.field_name == 'client' || field.field_name == 'job_hiring_type')){ // For Configure Fields Hide and show
        if(typeof $scope[$scope.form_model] == 'undefined') {
            if(isEmpty($scope.customdata['jobs']['client'])) {
                return false;
            }
            return true;
        }

        if(isEmpty($scope[$scope.form_model][field.related_table])){
            return false;
        }
        else if(isEmpty($scope[$scope.form_model][field.related_table]['client'])){
            return false;
        }
        else if(isEmpty($scope[$scope.form_model][field.related_table]['job_hiring_type'])){
            return false;
        }
    }

    if(field.related_table == 'jobs' && field.field_name == 'share_to_partners') {
        if(typeof $scope.masterLayout != 'undefined' && $scope.isUnsubscribedAddon('partner_login')) {
            return false;
        }

        if(typeof $scope.from_create_job == 'undefined' || isEmpty($scope.from_create_job)) {
            return false;
        }
    }
/*
    if((field.related_table == 'jobs') && ( field.field_name == 'client_contract_period' 
    || field.field_name == 'job_type' || field.field_name =='hire_rate' || field.field_name == 'contract_period' || field.field_name == 'pay_type' )){ // For Configure Fields Hide and show
        if(typeof $scope[$scope.form_model] == 'undefined') {
            if(isEmpty($scope.customdata['jobs']['placement_type'])) {
                return true;
            }
            return true;
        }
        
        if(isEmpty($scope[$scope.form_model][field.related_table])){
            return true;
        }
        else if(isNotEmpty($scope[$scope.form_model][field.related_table]['placement_type']) && $scope[$scope.form_model][field.related_table]['placement_type'] == 'one_time_placement') {
            $scope[$scope.form_model][field.related_table]['job_type'] = '';
            $scope[$scope.form_model][field.related_table]['client_contract_period'] = '';
            $scope[$scope.form_model][field.related_table]['contract_period'] = '';
            $scope[$scope.form_model][field.related_table]['hire_rate'] = '';
            $scope[$scope.form_model][field.related_table]['pay_type'] = '';
            return false;
        }

        

    } */
        // if ($scope.form_model == 'createJobMultiSectionData' || $scope.form_model == 'viewJobMultiSectionData') {
            if ((field.related_table == 'job_pay_details' || field.related_table == 'job_pay_billing_details') && (field.field_name == 'client_contract_period'
            || field.field_name == 'job_type' || field.field_name == 'hire_rate' || field.field_name == 'contract_period' || field.field_name == 'pay_type' || field.field_name == 'placement_type' || field.field_name == 'client_rate' || field.field_name == 'client_pay_type'  || field.field_name == 'otp_bill_type' || field.field_name == 'otp_bill_value' || field.field_name == 'rpo_bill_type' || field.field_name == 'rpo_bill_value')) { // For Configure Fields Hide and show
               
                if(isNotEmpty(field.field_security) && isNotEmpty(field.field_security[0]) && field.field_security[0].access == 'none') {
                    return false;
                } 


                if(isEmpty(field.field_security)) {
                    return false;
                }
                
                var form_model_name = $scope.form_model;
                if(field.related_table == 'job_pay_billing_details'){
                    form_model_name = $scope.add_more_form_model;
                }
                if (typeof $scope[form_model_name] == 'undefined') {
                    if (isEmpty($scope.customdata) || isEmpty($scope.customdata['job_pay_details']['placement_type'])) {
                        return true;
                    }
                return true;
            }

            if(isNotEmpty(bulk_form_id))
            {
                if (isEmpty($scope[form_model_name][bulk_form_id][field.related_table])) {
                    return true;
                }
                else if (isNotEmpty($scope[form_model_name][bulk_form_id][field.related_table]['placement_type']) && $scope[form_model_name][bulk_form_id][field.related_table]['placement_type'] == 'one_time_placement') {
                    $scope[form_model_name][bulk_form_id][field.related_table]['job_type'] = '';
                    $scope[form_model_name][bulk_form_id][field.related_table]['client_contract_period'] = '';
                    $scope[form_model_name][bulk_form_id][field.related_table]['contract_period'] = '';
                    // $scope[form_model_name][field.related_table]['hire_rate'] = '';
                    $scope[form_model_name][bulk_form_id][field.related_table]['pay_type'] = '';
                    if(isNotEmpty($scope.job_account_name) && (isEmpty($scope[form_model_name][bulk_form_id][field.related_table]['otp_bill_type']) || isEmpty($scope[form_model_name][bulk_form_id][field.related_table]['otp_bill_value']))){
                        $scope[form_model_name][bulk_form_id][field.related_table]['otp_bill_type'] = $scope.job_account_name['placement_type'];
                        $scope[form_model_name][bulk_form_id][field.related_table]['otp_bill_value'] = $scope.job_account_name['placement_value'];
                    }
                    if(field.field_name == 'placement_type' || field.field_name == 'client_pay_type' || field.field_name == 'hire_rate' || field.field_name == 'otp_bill_type' || field.field_name == 'otp_bill_value') {
                        return true;
                    } else {
                        return false;
                    }
                }else if (isNotEmpty($scope[form_model_name][bulk_form_id][field.related_table]['placement_type']) && $scope[form_model_name][bulk_form_id][field.related_table]['placement_type'] != 'one_time_placement') {
                    $scope[form_model_name][bulk_form_id][field.related_table]['otp_bill_type'] = '';
                    $scope[form_model_name][bulk_form_id][field.related_table]['otp_bill_value'] = '';
                    if(field.field_name == 'otp_bill_type' || field.field_name == 'otp_bill_value') {
                        return false;
                    } else {
                        return true;
                    }
                }

            }
                    
            else if (isEmpty($scope[form_model_name][field.related_table])) {
                return true;
            }
            else if (isNotEmpty($scope[form_model_name][field.related_table]['placement_type']) && $scope[form_model_name][field.related_table]['placement_type'] == 'one_time_placement') {
                $scope[form_model_name][field.related_table]['job_type'] = '';
                $scope[form_model_name][field.related_table]['client_contract_period'] = '';
                $scope[form_model_name][field.related_table]['contract_period'] = '';
                // $scope[form_model_name][field.related_table]['hire_rate'] = '';
                $scope[form_model_name][field.related_table]['pay_type'] = '';
                $scope[form_model_name][field.related_table]['client_rate'] = '';                
                $scope[form_model_name][field.related_table]['rpo_bill_type'] = null;
                $scope[form_model_name][field.related_table]['rpo_bill_value'] = null;
                // console.log($scope.job_account_name);
                if(isNotEmpty($scope.job_account_name) && (isEmpty($scope[form_model_name][field.related_table]['otp_bill_type']) || isEmpty($scope[form_model_name][field.related_table]['otp_bill_value']))){
                    if(isNotEmpty($scope.job_account_name['placement_type'])) {
                        $scope[form_model_name][field.related_table]['otp_bill_type'] = $scope.job_account_name['placement_type'];
                    }
                    if(isNotEmpty($scope.job_account_name['placement_value'])) {
                        $scope[form_model_name][field.related_table]['otp_bill_value'] = $scope.job_account_name['placement_value'];
                    }
                }
                if(field.field_name == 'placement_type' || field.field_name == 'client_pay_type' || field.field_name == 'hire_rate'  || field.field_name == 'otp_bill_type' || field.field_name == 'otp_bill_value' ) {
                    return true;
                } else {
                    return false;
                }
            }
            else if (isNotEmpty($scope[form_model_name][field.related_table]['placement_type']) && $scope[form_model_name][field.related_table]['placement_type'] == 'rpo_placement') {

                $scope[form_model_name][field.related_table]['job_type'] = '';
                $scope[form_model_name][field.related_table]['client_contract_period'] = '';
                $scope[form_model_name][field.related_table]['contract_period'] = '';
                $scope[form_model_name][field.related_table]['pay_type'] = '';
                $scope[form_model_name][field.related_table]['client_rate'] = '';
                $scope[form_model_name][field.related_table]['otp_bill_type'] = null;
                $scope[form_model_name][field.related_table]['otp_bill_value'] = null;

                if(field.field_name == 'placement_type' || field.field_name == 'client_pay_type' || field.field_name == 'hire_rate'  || field.field_name == 'rpo_bill_type' || field.field_name == 'rpo_bill_value') {
                    return true;
                } else {
                    return false;
                }
            }
            else if (isNotEmpty($scope[form_model_name][field.related_table]['placement_type']) && ($scope[form_model_name][field.related_table]['placement_type'] != 'one_time_placement' || $scope[form_model_name][field.related_table]['placement_type'] != 'rpo_placement')) {
                $scope[form_model_name][field.related_table]['otp_bill_type'] = null;
                $scope[form_model_name][field.related_table]['otp_bill_value'] = null;
                $scope[form_model_name][field.related_table]['rpo_bill_type'] = null;
                $scope[form_model_name][field.related_table]['rpo_bill_value'] = null;
                if(field.field_name == 'otp_bill_type' || field.field_name == 'otp_bill_value' || field.field_name == 'rpo_bill_type' || field.field_name == 'rpo_bill_value') {
                    return false;
                } else {
                    return true;
                }
            }

        }
    // }

    //Requsition Configure Fields Hide & Show
    if((field.related_table == 'requisition_pay_details' || field.related_table == 'requisition_pay_billing_details') && (field.field_name == 'contract_period')){
        var form_model_name = $scope.form_model;
        if(field.related_table == 'requisition_pay_billing_details'){
            form_model_name = $scope.add_more_form_model;
        }
        if(isNotEmpty(bulk_form_id))
        {
            if (isEmpty($scope[form_model_name][bulk_form_id][field.related_table])) {
                return true;
            }
            else if(isNotEmpty($scope[$scope.form_model][bulk_form_id][field.related_table]['job_type']) && ($scope[$scope.form_model][bulk_form_id][field.related_table]['job_type'] == 'Full Time')) {
                $scope[$scope.form_model][bulk_form_id][field.related_table]['contract_period'] = ''; 
                return false;
            }
        }     
        else if(isEmpty($scope[$scope.form_model][field.related_table])){
            return true;
        }
        else if(isNotEmpty($scope[$scope.form_model][field.related_table]['job_type']) && ($scope[$scope.form_model][field.related_table]['job_type'] == 'Full Time')) {
            $scope[$scope.form_model][field.related_table]['contract_period'] = ''; 
            return false;
        }
    }

    //Jobs campaigns needed configure fiels Hide and Show
    if((field.related_table == 'jobs') && (field.field_name == 'campaigns_needed')){
        var form_model_name = $scope.form_model;     
        // console.log($scope[$scope.form_model][field.related_table]);
         if(isNotEmpty($scope[$scope.form_model]) && isNotEmpty($scope[$scope.form_model][field.related_table]) && isEmpty($scope[$scope.form_model][field.related_table]['source_campaign']) || (isNotEmpty($scope[$scope.form_model][field.related_table]['source_campaign']) && ($scope[$scope.form_model][field.related_table]['source_campaign'] != 'yes'))) {
            // $scope[$scope.form_model][field.related_table]['campaigns_needed'] = ''; 
            return false;
        }
    }


    if ((field.related_table == 'project_billing_details' || field.related_table == 'projects') && (field.field_name == 'effective_date' || field.field_name == 'comments' || field.field_name == 'po_number' || field.field_name == 'include_po_in_invoice' || field.field_name == 'from_address' || field.field_name == 'to_address' || field.field_name == 'client_id' || field.field_name == 'client_manager_name' || field.field_name == 'client_contact_email')

    ) {
        if(isNotEmpty($scope[$scope.form_model]['project_billing_details']) && isNotEmpty($scope[$scope.form_model]['project_billing_details']['bill_type'])) {
            if($scope[$scope.form_model]['project_billing_details']['bill_type'] == 'non_billable') {
                $scope[$scope.form_model][field.related_table][field.field_name] = null;
                return false;
            }

            if($scope[$scope.form_model]['project_billing_details']['bill_type'] != 'fixed_recurring' && field.field_name == 'effective_date') {
                $scope[$scope.form_model]['project_billing_details'][field.field_name] = null;
                return false;
            }
        }
    } 

    if((field.related_table == 'job_pay_details') && ( field.field_name == 'client_contract_period' 
    ||   field.field_name == 'placement_type' || field.field_name == 'client_rate' || field.field_name == 'client_pay_type' || field.field_name == 'otp_bill_value' || field.field_name == 'otp_bill_type' || field.field_name == 'rpo_bill_value' || field.field_name == 'rpo_bill_type')){ // For Configure Fields Hide and show
        
        if(isNotEmpty(field.field_security) && isNotEmpty(field.field_security[0]) && field.field_security[0].access == 'none') {
                return false;
        } 


        if(isEmpty(field.field_security)) {
            return false;
        }



        if(typeof $scope[$scope.form_model] == 'undefined') {
            return true;
        }


        if(isEmpty($scope[$scope.form_model][field.related_table])){
            return true;
        }
        else if((isNotEmpty($scope[$scope.form_model]['jobs']['job_hiring_type']) && $scope[$scope.form_model]['jobs']['job_hiring_type'] == 1)) {
            return false;
        }
        else if(!$scope[$scope.form_model]['jobs']['id'])
        {   
            // set the default value based on placement type
            if(field.field_name == 'client_pay_type')
            {

                var pay_options = [];
                angular.forEach(field.options,function(v_opt,k_opt)
                {
                    pay_options[v_opt.id]= v_opt.id;
                });
                
                if($scope[$scope.form_model][field.related_table]['placement_type'] == 'one_time_placement' && (isNotEmpty(pay_options['salary']) || isNotEmpty(pay_options['Annual Salary'])))
                {
                    //added since in production option id is Annual Salary and in qa option id sis salary 
                    if(!$scope.is_set_client_type || $scope.is_set_client_type != $scope[$scope.form_model][field.related_table]['placement_type'])
                        $scope[$scope.form_model][field.related_table]['client_pay_type'] = pay_options['salary'] ? 'salary' : 'Annual Salary';
                    
                    $scope.is_set_client_type = $scope[$scope.form_model][field.related_table]['placement_type'];
                }
                else if($scope[$scope.form_model][field.related_table]['placement_type'] == 'contractual'  && (isNotEmpty(pay_options['monthly']) || isNotEmpty(pay_options['Monthly'])))
                {
                    if(!$scope.is_set_client_type || $scope.is_set_client_type != $scope[$scope.form_model][field.related_table]['placement_type'])
                        $scope[$scope.form_model][field.related_table]['client_pay_type'] = pay_options['monthly'] ? 'monthly':'Monthly';
                    
                    $scope.is_set_client_type = $scope[$scope.form_model][field.related_table]['placement_type'];
                }


            }
            
            return true;
        }

    }

    if((field.related_table == 'job_pay_details') && (field.field_name == 'contract_period')){ // For Configure Fields Hide and show
        if(typeof $scope[$scope.form_model] == 'undefined') {
            if(isEmpty($scope.customdata['jobs']['pay_type'])) {
                return true;
            }
            return true;
        }
        if(isEmpty($scope[$scope.form_model][field.related_table])){
            return true;
        }
        else if(isNotEmpty($scope[$scope.form_model][field.related_table]['job_type']) && ($scope[$scope.form_model][field.related_table]['job_type'] == 'Full Time' || $scope[$scope.form_model][field.related_table]['job_type'] == 'Permanent' )) {
            $scope[$scope.form_model][field.related_table]['contract_period'] = ''; 
            return false;
        }
    }

    if((field.related_table == 'account_billing_addresses') && (field.field_name == 'add_sez_in_billing_address_and_gst')) { 
        if(isNotEmpty(bulk_form_id))
        {
            if(isEmpty($scope[$scope.form_model][bulk_form_id][field.related_table]) || isEmpty($scope[$scope.form_model][bulk_form_id][field.related_table]['is_sez'])){
                $scope[$scope.form_model][bulk_form_id][field.related_table]['add_sez_in_billing_address_and_gst'] = 0;
                return false;
            }
        }
        else if(isEmpty($scope[$scope.form_model][field.related_table]) || isEmpty($scope[$scope.form_model][field.related_table]['is_sez'])){
            $scope[$scope.form_model][field.related_table]['add_sez_in_billing_address_and_gst'] = 0;
            return false;
        }
    }
    
    // if ($scope.form_model == 'createJobMultiSectionData' || $scope.form_model == 'viewJobMultiSectionData') {
        if ((field.related_table == 'job_pay_billing_details') && (field.field_name == 'client_contract_period'
            || field.field_name == 'placement_type' || field.field_name == 'client_rate'  || field.field_name == 'client_pay_type')) { // For Configure Fields Hide and show
            if (typeof $scope[$scope.add_more_form_model] == 'undefined') {
                return true;
            }

            if (isEmpty($scope[$scope.add_more_form_model][field.related_table])) {
                return true;
            }
            else if ((isNotEmpty($scope[$scope.$parent.form_model]['jobs'])) && (isNotEmpty($scope[$scope.$parent.form_model]['jobs']['job_hiring_type']) && $scope[$scope.$parent.form_model]['jobs']['job_hiring_type'] == 1)) {
                return false;
            }
            // else if ((isNotEmpty($scope[$scope.form_model]['jobs']['job_hiring_type']) && $scope[$scope.form_model]['jobs']['job_hiring_type'] == 1)) {
            //     return false;
            // }
            else if ((isNotEmpty($scope[$scope.form_model]) && isEmpty($scope[$scope.$parent.form_model]['jobs']['id']))) {
                // set the default value based on placement type
                if (field.field_name == 'client_pay_type') {
                    var pay_options = [];
                    angular.forEach(field.options, function (v_opt, k_opt) {
                        pay_options[v_opt.id] = v_opt.id;
                    });

                    if ($scope[$scope.add_more_form_model][field.related_table]['placement_type'] == 'one_time_placement' && (isNotEmpty(pay_options['salary']) || isNotEmpty(pay_options['Annual Salary']))) {
                        //added since in production option id is Annual Salary and in qa option id sis salary 
                        
                        if(!$scope.is_set_client_type || $scope.is_set_client_type != $scope[$scope.add_more_form_model][field.related_table]['placement_type'])
                        $scope[$scope.add_more_form_model][field.related_table]['client_pay_type'] = pay_options['salary'] ? 'salary' : 'Annual Salary';
                    
                        $scope.is_set_client_type = $scope[$scope.add_more_form_model][field.related_table]['placement_type'];
                    }
                    else if ($scope[$scope.add_more_form_model][field.related_table]['placement_type'] == 'contractual' && (isNotEmpty(pay_options['monthly']) || isNotEmpty(pay_options['Monthly']))) {

                        if(!$scope.is_set_client_type || $scope.is_set_client_type != $scope[$scope.add_more_form_model][field.related_table]['placement_type'])
                        $scope[$scope.add_more_form_model][field.related_table]['client_pay_type'] = pay_options['monthly'] ? 'monthly' : 'Monthly';

                        $scope.is_set_client_type = $scope[$scope.add_more_form_model][field.related_table]['placement_type'];
                    }
                }

                return true;
            }

        }
       
        if ((field.related_table == 'job_pay_billing_details') && (field.field_name == 'contract_period')) { // For Configure Fields Hide and show
            if (typeof $scope[$scope.add_more_form_model] == 'undefined') {
                if (isEmpty($scope.customdata['job_pay_billing_details']['pay_type'])) {
                    return true;
                }
                return true;
            }
            if (isEmpty($scope[$scope.add_more_form_model][field.related_table])) {
                return true;
            }
            else if (isNotEmpty($scope[$scope.add_more_form_model][field.related_table]['job_type']) && ($scope[$scope.add_more_form_model][field.related_table]['job_type'] == 'Full Time' || $scope[$scope.add_more_form_model][field.related_table]['job_type'] == 'Permanent')) {
                $scope[$scope.add_more_form_model][field.related_table]['contract_period'] = '';
                return false;
            }
        }
    // }
    if((field.related_table == 'users') && (field.field_name == 'period_of_contract')){ // For Configure Fields Hide and show
        if(typeof $scope[$scope.form_model] == 'undefined') {
            if(isEmpty($scope.customdata['users']['employment_type'])) {
                return true;
            }
            return true;
        }
        if(isEmpty($scope[$scope.form_model][field.related_table])){
            return true;
        }
        else if(isNotEmpty($scope[$scope.form_model][field.related_table]['employment_type']) && ($scope[$scope.form_model][field.related_table]['employment_type'] == 'contractor' || $scope[$scope.form_model][field.related_table]['employment_type'] == 'c2h')) {
            // $scope[$scope.form_model][field.related_table]['period_of_contract'] = '';
            return true;
        }else
        {
            $scope[$scope.form_model][field.related_table]['period_of_contract'] = '';
            return false
        }
    }

    if((field.related_table == 'opportunities') && (field.field_name == 'lead_id')){ // For Configure Fields Hide and show
        if(typeof $scope[$scope.form_model] == 'undefined') {
            if(isEmpty($scope.customdata['opportunities']['source_type'])) {
                return true;
            }
            return true;
        }
        if(isEmpty($scope[$scope.form_model][field.related_table])){
            return true;
        }
        else if(isNotEmpty($scope[$scope.form_model][field.related_table]['source_type']) && ($scope[$scope.form_model][field.related_table]['source_type'] == 'lead')) {
            return true;
        }
        else {
            $scope[$scope.form_model][field.related_table]['lead_id'] = '';
            return false
        }
    }

    if((field.related_table == 'opportunities') && (field.field_name == 'actual_end_date')){ // For Configure Fields Hide and show
        if(typeof $scope[$scope.form_model] == 'undefined') {
            if(isEmpty($scope.customdata['opportunities']['actual_end_date'])) {
                return true;
            }
            return true;
        }
        if(isEmpty($scope[$scope.form_model][field.related_table])){
            return true;
        }
        else if($scope[$scope.form_model][field.related_table]['workflow_stage_id'] == "-1") {
            if (typeof field.field_security != 'undefined' && typeof field.field_security[0] != 'undefined'  && field.field_security[0].access != 'none') {
                return field.field_security[0].access;
            }
            return false;
        }
        else {
            return false
        }
    }

    if((field.related_table == 'opportunities') && (field.field_name == 'client_manager_name')){ // For Configure Fields Hide and show
        if(typeof $scope[$scope.form_model] == 'undefined') {
            if(isEmpty($scope.customdata['opportunities']['source_type'])) {
                return true;
            }
            return true;
        }
        if(isEmpty($scope[$scope.form_model][field.related_table])){
            return true;
        }
        else if(isNotEmpty($scope[$scope.form_model][field.related_table]['source_type']) && ($scope[$scope.form_model][field.related_table]['source_type'] == 'contact')) {
            return true;
        } 
        else {
            $scope[$scope.form_model][field.related_table]['client_manager_name'] = '';
            return false
        }
    }

    if((field.related_table == 'opportunities') && (field.field_name == 'secondary_contact')){ // For Configure Fields Hide and show
        if(typeof $scope[$scope.form_model] == 'undefined') {
            if(isEmpty($scope.customdata['opportunities']['source_type'])) {
                return true;
            }
            return true;
        }
        if(isEmpty($scope[$scope.form_model][field.related_table])){
            return true;
        }
        else if(isNotEmpty($scope[$scope.form_model][field.related_table]['source_type']) && ($scope[$scope.form_model][field.related_table]['source_type'] == 'contact')) {
            return true;
        } 
        else {
            $scope[$scope.form_model][field.related_table]['secondary_contact'] = '';
            return false
        }
    }

    if((field.related_table == 'leads') && (field.field_name == 'actual_end_date')){ // For Configure Fields Hide and show
        if(typeof $scope[$scope.form_model] == 'undefined') {
            if(isEmpty($scope.customdata['leads']['actual_end_date'])) {
                return true;
            }
            return true;
        }
        if(isEmpty($scope[$scope.form_model][field.related_table])){
            return true;
        }
        else if($scope[$scope.form_model][field.related_table]['workflow_stage_id'] == "-1" || $scope[$scope.form_model][field.related_table]['workflow_stage_id'] == "-2") {
            if (typeof field.field_security != 'undefined' && typeof field.field_security[0] != 'undefined'  && field.field_security[0].access != 'none') {
                return field.field_security[0].access;
            }
            return false;
        }
        else {
            return false
        }
    }
    
    if(field.related_table == 'accounts'){

        if(field.field_name == 'submmision_workflow'){
            if($scope.isAccessApp(APP_CONSTANTS.APP_SLUGS.HIRE_SLUG)){
                return true;
            }else{
                return false;
            }
        }
    }
    if((field.related_table == 'assets')){ // For Configure Fields Hide and show


        if(field.field_name == 'purchased_date' || field.field_name == 'purchase_amount')
        {
            if(!isEmpty($scope[$scope.form_model][field.related_table]) && $scope[$scope.form_model][field.related_table]['ownership']=='Own') {
                return true;
            }else if(!isEmpty($scope[$scope.form_model][field.related_table]) && $scope[$scope.form_model][field.related_table]['ownership']=='Purchase'){
                return true;
            }
            else 
            {
                return false;
            }
        }
        

        if(field.field_name == 'rental_date'
            || field.field_name == 'rental_end_date' || field.field_name == 'vendor' || field.field_name == 'rental_type'  || field.field_name == 'rental_amount'
        )
        {

            if(!isEmpty($scope[$scope.form_model][field.related_table]) && ($scope[$scope.form_model][field.related_table]['ownership']=='Rent'))
            {
                return true;
            }
            else 
            {
                 return false;
            }
        }


        if(field.field_name == 'subscription_start_date'
        || field.field_name == 'utility' || field.field_name == 'no_expiry')
        {

            if(!isEmpty($scope[$scope.form_model][field.related_table]) && $scope[$scope.form_model][field.related_table]['ownership']=='Free'  || !isEmpty($scope[$scope.form_model][field.related_table]) && $scope[$scope.form_model][field.related_table]['ownership']=='Trial' || !isEmpty($scope[$scope.form_model][field.related_table]) && $scope[$scope.form_model][field.related_table]['ownership']=='Purchase') 
            {
                return true;
            }
            else 
            {
                return false;
            }
        }

        if(field.field_name == 'subscription_end_date')
        {

            if($scope[$scope.form_model][field.related_table]['type']!='Hardware' && 
             !isEmpty($scope[$scope.form_model][field.related_table]) &&
             $scope[$scope.form_model][field.related_table]['no_expiry'] == 0 ||
             $scope[$scope.form_model][field.related_table]['no_expiry'] == undefined
             &&
             !isEmpty($scope[$scope.form_model][field.related_table]['ownership'])
             && $scope[$scope.form_model][field.related_table]['ownership'] != 'Own'
             && $scope[$scope.form_model][field.related_table]['ownership'] != 'Rent'            ) 
            {
                return true;
            }
            else 
            {
                return false;
            }
        }

        if(field.field_name == 'no_of_licence')
        {

            if(!isEmpty($scope[$scope.form_model][field.related_table]) && $scope[$scope.form_model][field.related_table]['utility'] == 'Multiple' && $scope[$scope.form_model][field.related_table]['type']!='Hardware') 
            {
                return true;
            }
            else 
            {
                return false;
            }
        }
       
        
      
        if(field.field_name == 'serial_num' || field.field_name == 'model')
        {
            if(isEmpty($scope[$scope.form_model][field.related_table])){
                return true;
            }
            if($scope[$scope.form_model][field.related_table]['type']=='Hardware') {
                return true;
            }
            else 
            {
                return false;
            }
        
        }


        if(field.field_name == 'license_key' || field.field_name == 'model')
            {
                if(isEmpty($scope[$scope.form_model][field.related_table])){
                    return true;
                }
                if($scope[$scope.form_model][field.related_table]['type'] != 'Hardware') {
                    return true;
                }
                else 
                {
                    return false;
                }
            
            }

    }
    
    
    

    if ($scope.isHiringTypeNonBillable && 
        (field.related_table=='assignments' || field.related_table=='assignment_billing_information') &&
        (field.field_name == 'client_id' || field.field_name == 'bill_type' || 
        field.field_name == 'bill_rate' || field.field_name == 'ot_bill_rate')
    ) {
        return false;
    }

    if (field.related_table == 'assignment_overhead_costs') {
        if (!Array.isArray($scope[$scope.form_model][field.related_table]) && isNotEmpty($scope[$scope.form_model][field.related_table]) && isNotEmpty($scope[$scope.form_model][field.related_table]['rate_type'])) {
            if ($scope[$scope.form_model][field.related_table]['rate_type'] == 'fixed_per_period') {
                if (field.field_name == 'percentage_on' || field.field_name == 'percentage') {
                    if (isNotEmpty($scope[$scope.form_model][field.related_table][field.field_name])) {
                        $scope[$scope.form_model][field.related_table][field.field_name] = null;
                    }
                   return false; 
                }
            }

            if ($scope[$scope.form_model][field.related_table]['rate_type'] == 'percentage') {
                if (field.field_name == 'fixed_per_period') {
                    if (isNotEmpty($scope[$scope.form_model][field.related_table][field.field_name])) {
                        $scope[$scope.form_model][field.related_table][field.field_name] = null;
                    }
                   return false; 
                }
            }

            if ($scope[$scope.form_model][field.related_table]['rate_type'] == 'flat') {
                if (field.field_name == 'fixed_per_period' || field.field_name == 'percentage_on' || field.field_name == 'percentage' || field.field_name == 'effective_until') {
                    if (isNotEmpty($scope[$scope.form_model][field.related_table][field.field_name])) {
                        $scope[$scope.form_model][field.related_table][field.field_name] = null;
                    }
                   return false; 
                }
            }
        }
    }

    if (field.related_table == 'assignment_additional_pay_information') {
        if (!Array.isArray($scope[$scope.form_model][field.related_table]) && isNotEmpty($scope[$scope.form_model][field.related_table]) && isNotEmpty($scope[$scope.form_model][field.related_table]['pay_mode'])) {
            if ($scope[$scope.form_model][field.related_table]['pay_mode'] == 'fixed_value') {
                if (field.field_name == 'pay_value') {
                    if (isNotEmpty($scope[$scope.form_model][field.related_table][field.field_name])) {
                        $scope[$scope.form_model][field.related_table][field.field_name] = null;
                    }
                   return false; 
                }
            }
        }
    }
    
    if (typeof field.field_security != 'undefined' &&
        typeof field.field_security[0] != 'undefined' 
        && field.field_security[0].access != 'none') {
        return field.field_security[0].access;
    }

    
    return false;
}

var isConfigVisibleFunc = function(field, $scope)
{
    if (typeof field == 'undefined') 
    {
        return false;
    }

    
    if(field.field_name == 'cycle_starts_from')
    {
        if (
            isEmpty($scope[$scope.form_model]['assignment_timesheet_information']) || 
            isEmpty($scope[$scope.form_model]['assignment_timesheet_information']['timesheet_cycle']) || 
            $scope[$scope.form_model]['assignment_timesheet_information']['timesheet_cycle'] == 'by_dates' ||  $scope[$scope.form_model]['assignment_timesheet_information']['timesheet_cycle'] == 'daily'
        ) {
            if (isNotEmpty($scope[$scope.form_model]['assignment_timesheet_information'])) {
                $scope[$scope.form_model]['assignment_timesheet_information'][field.field_name] = undefined;
            }

            if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
            {
                $scope[$scope.form_name]['form'][field.field_name].$error = {};
            }
            return false;
        }


        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {'required' : true};
        }
    }
    
    if (field.field_name == 'external_approvers') {
        /*if (
            isEmpty($scope[$scope.form_model]['assignment_timesheet_information']) ||
            isEmpty($scope[$scope.form_model]['assignment_timesheet_information']['approval_flow']) || 
            $scope[$scope.form_model]['assignment_timesheet_information']['approval_flow'] != 'external'
        ) {*/
        if (
            isEmpty($scope[$scope.form_model]['assignment_timesheet_information']) ||
            isEmpty($scope[$scope.form_model]['assignment_timesheet_information']['approval_flow']) || 
            ($scope[$scope.form_model]['assignment_timesheet_information']['approval_flow'] != 'external' &&
            (isEmpty($scope.external_approver_approval_flows) || !$scope.external_approver_approval_flows.includes($scope[$scope.form_model]['assignment_timesheet_information']['approval_flow'])))
        ) {
            if (isNotEmpty($scope[$scope.form_model]['assignment_timesheet_information']) && 
                isEmpty($scope[$scope.form_model]['assignment_timesheet_information'][field.field_name])) {
                $scope[$scope.form_model]['assignment_timesheet_information'][field.field_name] = undefined;
            }

            if (typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined') {
                $scope[$scope.form_name]['form'][field.field_name].$error = {};
            }

            return false;
        }

        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {'required' : true};
        }
    }

    if (field.field_name == 'period_of_contract') {
        if (
            isEmpty($scope[$scope.form_model]['users']) ||
            isEmpty($scope[$scope.form_model]['users']['employment_type']) || 
            ($scope[$scope.form_model]['users']['employment_type'] != 'c2h' && $scope[$scope.form_model]['users']['employment_type'] != 'contractor')
        ) {
            if (isNotEmpty($scope[$scope.form_model]['users']) && 
                isEmpty($scope[$scope.form_model]['users'][field.field_name])) {
                $scope[$scope.form_model]['users'][field.field_name] = undefined;
            }

            if (typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined') {
                $scope[$scope.form_name]['form'][field.field_name].$error = {};
            }

            return false;
        }

        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {'required' : true};
        }
    }

    if (field.field_name == 'discount_value') {
        if ((isEmpty($scope[$scope.form_model]['assignment_invoice_information'])) && 
            (
                isEmpty($scope[$scope.form_model]['accounts']) ||
                isEmpty($scope[$scope.form_model]['accounts']['discount_type']) || 
                typeof $scope[$scope.form_model]['accounts']['discount_type'] == 'number'
            )
        ) {
            if (isNotEmpty($scope[$scope.form_model]['accounts']) && 
                isEmpty($scope[$scope.form_model]['accounts'][field.field_name])) {
                $scope[$scope.form_model]['accounts'][field.field_name] = undefined;
            }

            if (typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined') {
                $scope[$scope.form_name]['form'][field.field_name].$error = {};
            }

            return false;
        }

        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {'required' : true};
        }
    }



    if (field.field_name == 'placement_value') {
        if (
            isEmpty($scope[$scope.form_model]['accounts']) ||
            isEmpty($scope[$scope.form_model]['accounts']['placement_type']) || 
            typeof $scope[$scope.form_model]['accounts']['placement_type'] == 'number'
        ) {
            if (isNotEmpty($scope[$scope.form_model]['accounts']) && 
                isEmpty($scope[$scope.form_model]['accounts'][field.field_name])) {
                $scope[$scope.form_model]['accounts'][field.field_name] = undefined;
            }

            if (typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined') {
                $scope[$scope.form_name]['form'][field.field_name].$error = {};
            }

            return false;
        }

        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {'required' : true};
        }
    } 


    if (field.related_table == 'otp_billing_details' && field.field_name == 'placement_bill_value') {
        if (
            isEmpty($scope[$scope.form_model]['otp_billing_details']) ||
            isEmpty($scope[$scope.form_model]['otp_billing_details']['placement_bill_type']) || 
            typeof $scope[$scope.form_model]['otp_billing_details']['placement_bill_type'] == 'number'
        ) {
            if (isNotEmpty($scope[$scope.form_model]['otp_billing_details']) && 
                isEmpty($scope[$scope.form_model]['otp_billing_details'][field.field_name])) {
                $scope[$scope.form_model]['otp_billing_details'][field.field_name] = undefined;
            }

            if (typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined') {
                $scope[$scope.form_name]['form'][field.field_name].$error = {};
            }

            return false;
        }

        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {'required' : true};
        }
    }      

    if(field.field_name == 'inactive_start_date' || field.field_name == 'inactive_end_date')
    {
        if (isNotEmpty($scope.inactive_status_details)) {
            if(isEmpty($scope[$scope.form_model]['candidates']['candidate_status']) || $scope[$scope.form_model]['candidates']['candidate_status'] != $scope.inactive_status_details.id)
            {
                if(isEmpty($scope[$scope.form_model]['candidates'][field.field_name])) 
                {
                    $scope[$scope.form_model]['candidates'][field.field_name] = undefined;
                }
                if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
                {
                    $scope[$scope.form_name]['form'][field.field_name].$error = {};
                }
                return false;
            }
        }

        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {'required' : true};
        }
    }

    if(field.field_name == 'vendor' || field.field_name == 'vendor_contact_name')
    {
        if (isNotEmpty($scope.candidate_source_details)) {
            if(isEmpty($scope[$scope.form_model]['candidates']['source']) || $scope[$scope.form_model]['candidates']['source'] != $scope.candidate_source_details.id)
            {
                if(isEmpty($scope[$scope.form_model]['candidates'][field.field_name])) 
                {
                    $scope[$scope.form_model]['candidates'][field.field_name] = undefined;
                }
                if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
                {
                    $scope[$scope.form_name]['form'][field.field_name].$error = {};
                }
                return false;
            }
            $scope.show_vendor_field = false;
            if(!isEmpty($scope[$scope.form_model]['candidates']['source'])){
                if($scope[$scope.form_model]['candidates']['source'] == $scope.candidate_source_details['id']){
                    $scope.show_vendor_field = true;
                }else{
                    $scope.show_vendor_field = false;
                }
            }
        }

        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {'required' : true};
        }
    }

    if(field.field_name == 'client' || field.field_name == 'client_manager_name' || field.field_name == 'client_contact_phone' || field.field_name == 'client_contact_email' || field.field_name == 'placement_type' ||  field.field_name == 'client_contract_period' || field.field_name == 'contract_period' || field.field_name == 'client_pay_type' || field.field_name == 'client_rate')
    {
        $scope.isHiringTypeInternal = false;
        
        if( isNotEmpty($scope[$scope.form_model]['jobs']) && isNotEmpty($scope[$scope.form_model]['jobs']['job_hiring_type']) && $scope[$scope.form_model]['jobs']['job_hiring_type'] == 1)
        {
            if(isEmpty($scope[$scope.form_model]['jobs'][field.field_name])) 
            {
                $scope[$scope.form_model]['jobs'][field.field_name] = undefined;
            }
            if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
            {
                $scope[$scope.form_name]['form'][field.field_name].$error = {};
            }
            $scope.isHiringTypeInternal = true;
            return true;
        }
        
        // if ($scope.form_model == 'createJobMultiSectionData' || $scope.form_model == 'viewJobMultiSectionData') {
            if (field.related_table == 'job_pay_details' && isNotEmpty($scope[$scope.form_model])  && isNotEmpty($scope[$scope.form_model]['job_pay_details']) && isNotEmpty($scope[$scope.form_model]['jobs']) 
            && isNotEmpty($scope[$scope.form_model]['jobs']['job_hiring_type']) && $scope[$scope.form_model]['jobs']['job_hiring_type'] == 1) {
                if (isEmpty($scope[$scope.form_model]['job_pay_details'][field.field_name])) {
                    $scope[$scope.form_model]['job_pay_details'][field.field_name] = undefined;
                }
                if (typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined') {
                    $scope[$scope.form_name]['form'][field.field_name].$error = {};
                }
                $scope.isHiringTypeInternal = true;
                return true;
            }
            if (field.related_table == 'job_pay_billing_details' && isNotEmpty($scope[$scope.add_more_form_model])  && isNotEmpty($scope[$scope.add_more_form_model]['job_pay_billing_details']) && isNotEmpty($scope[$scope.$parent.form_model]['jobs']) 
            && isNotEmpty($scope[$scope.$parent.form_model]['jobs']['job_hiring_type']) && $scope[$scope.$parent.form_model]['jobs']['job_hiring_type'] == 1) {
                if (isEmpty($scope[$scope.add_more_form_model]['job_pay_billing_details'][field.field_name])) {
                    $scope[$scope.add_more_form_model]['job_pay_billing_details'][field.field_name] = undefined;
                }
                if (typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined') {
                    $scope[$scope.form_name]['form'][field.field_name].$error = {};
                }
                $scope.isHiringTypeInternal = true;
                return true;
            }
        // }

        
        if(isNotEmpty($scope[$scope.form_model]['pool_jobs']) && isNotEmpty($scope[$scope.form_model]['pool_jobs']['job_hiring_type']) && $scope[$scope.form_model]['pool_jobs']['job_hiring_type'] == 1)
        {
            if(isEmpty($scope[$scope.form_model]['pool_jobs'][field.field_name])) 
            {
                $scope[$scope.form_model]['pool_jobs'][field.field_name] = undefined;
            }
            if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
            {
                $scope[$scope.form_name]['form'][field.field_name].$error = {};
            }
            $scope.isHiringTypeInternal = true;
            return true;
        }

        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {'required' : true};
        }
    }


    if(field.field_name == 'show_client_vendor') {
        $scope.showClientVendorSection = false;
        
        if(isNotEmpty($scope[$scope.form_model]['jobs']) && isNotEmpty($scope[$scope.form_model]['jobs']['show_client_vendor']) && $scope[$scope.form_model]['jobs']['show_client_vendor'] == 1)
        {
            $scope.showClientVendorSection = true;
        }

        if(isNotEmpty($scope[$scope.form_model]['pool_jobs']) && isNotEmpty($scope[$scope.form_model]['pool_jobs']['show_client_vendor']) && $scope[$scope.form_model]['pool_jobs']['show_client_vendor'] == 1)
        {
            $scope.showClientVendorSection = true;
        }
    }

    if((field.related_table == 'projects') && (field.field_name == 'parent_project_id' || field.field_name == 'reason'))
    {   
        if (
            isEmpty($scope[$scope.form_model]['projects']) ||
            isEmpty($scope[$scope.form_model]['projects']['is_sub_project'])
        ) {
            if (isNotEmpty($scope[$scope.form_model]['projects'])) {
                var parent_project_id = document.getElementById(field.field_name+'_value');
                // if (!isEmpty(parent_project_id) && !isEmpty(parent_project_id.value)) {
                //     parent_project_id.value = undefined;
                // }
                $scope[$scope.form_model]['projects'][field.field_name] = undefined;
                $scope[$scope.form_model]['projects']['code'] = undefined; // we have parent_project_id as code
            }

            if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
            {
                $scope[$scope.form_name]['form'][field.field_name].$error = {};
            }
            return false;
        }

        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {'required' : true};
        }
    }

    if((field.related_table == 'assignment_invoice_information') && (field.field_name == 'calculate_invoice_billing_by') && (
        isNotEmpty($scope.pageOnLoadData['invoice_additional_config']) && ($scope.pageOnLoadData['invoice_additional_config']['consider_bill_rate_per_day'] == 'per_day')
    )) {
        if (isNotEmpty($scope[$scope.form_model]['assignment_invoice_information'])) {
            $scope[$scope.form_model]['assignment_invoice_information'][field.field_name] = undefined;
        }

        if(typeof $scope[$scope.form_name]['form'][field.field_name] != 'undefined')
        {
            $scope[$scope.form_name]['form'][field.field_name].$error = {};
        }
        return false;
    }

    return true;
}

var disabledFunc = function(field, $scope) {

    if (typeof field == 'undefined') {
        return false;
    }

    if(field.field_name == "mark_as_default" && field.related_table== "resumesform") {
        if(typeof $scope.createCandidateMultiSectionData !== 'undefined') {
            if(typeof $scope.createCandidateMultiSectionData.resumesform!='undefined' && $scope.createCandidateMultiSectionData.resumesform.mark_as_default==1) {
                return true;
            }
        }
        if(typeof $scope.viewCandidateMultiSectionData !== 'undefined') {
            if(typeof $scope.viewCandidateMultiSectionData.resumesform!='undefined' && $scope.viewCandidateMultiSectionData.resumesform.mark_as_default==1) {
                return true;
            }
        }
    }
    if(field.field_name =='mark_as_default' && (field.related_table=='account_billing_addresses' || field.related_table =='account_shipping_addresses')){
        if(typeof $scope.createAccountMultiSectionData !='undefined'){
            if(typeof $scope.createAccountMultiSectionData[field.related_table]!='undefined' && $scope.createAccountMultiSectionData[field.related_table].mark_as_default==1) {
                return true;
            }
        }
    }
    if(field.field_name == "created_at" && field.related_table== "resumesform") {
        if(typeof $scope.createCandidateMultiSectionData !== 'undefined') {
            if(typeof $scope.createCandidateMultiSectionData.resumesform!='undefined') {
                return true;
            }
        }
        if(typeof $scope.viewCandidateMultiSectionData !== 'undefined') {
            if(typeof $scope.viewCandidateMultiSectionData.resumesform!='undefined') {
                return true;
            }
        }
    }
    if(field.field_name == "mark_as_default" && field.related_table== "job_pay_details") {
        if(typeof $scope.createJobData !== 'undefined') {
            if($scope.createJobData.job_pay_details.mark_as_default==1) {
                return true;
            }
        }
        if(typeof $scope.quick_form_model !== 'undefined') {
            if($scope.quick_form_model.job_pay_details.mark_as_default==1) {
                return true;
            }
        }
    }
    if(field.field_name == "mark_as_default" && field.related_table== "requisition_pay_details") {
        if(typeof $scope.createRequisitionData !== 'undefined') {
            if($scope.createRequisitionData.requisition_pay_details.mark_as_default==1) {
                return true;
            }
        }
        if(typeof $scope.quick_form_model !== 'undefined') {
            if($scope.quick_form_model.requisition_pay_details.mark_as_default==1) {
                return true;
            }
        }
    }

    if(field.field_name == "mark_as_default" && field.related_table== "candidate_expected_pay_details") {
        if(typeof $scope.createCandidateData !== 'undefined') {
            if(typeof $scope.createCandidateData.candidate_expected_pay_details !='undefined' && $scope.createCandidateData.candidate_expected_pay_details.mark_as_default==1) {
                return true;
            }
        }
        if(typeof $scope.quick_form_model !== 'undefined') {
            if($scope.quick_form_model.candidate_expected_pay_details.mark_as_default==1) {
                return true;
            }
        }
    }
    if(field.field_name == "document_type"   || field.field_name== "expiry_date") {
        if (typeof $scope[$scope.form_model][field.related_table] != 'undefined') {
            console.log($scope[$scope.form_model][field.related_table]);
            if(isNotEmpty($scope[$scope.form_model][field.related_table].folder_id)){
                return true;
            }
            else{
                return false;
            }
        }
    }
    if(field.field_name == "client_job_id" && field.related_table== "jobs") {
        if(typeof $scope.createJobData !== 'undefined') {
            if($scope.createJobData.jobs.job_hiring_type ==1) {
                // $scope.createJobData.jobs.client_job_id = '';
                return true;
            }
        }
    }

    if(field.field_name == "calculate_invoice_billing_by") {
        if (isNotEmpty($scope.configFormArr) && isNotEmpty($scope.configFormArr.disable_invoice_billing_calculation)) {
            return true;
        }
    }

    if(field.field_name == "invoice_status" && field.related_table== "otp_invoice_information") {
       return true;
    }

    if(field.field_name == "project_id" && field.related_table== "jobs") {
       return true;
    }

    if(field.field_name == "computed_employee_email" || field.field_name == "assignee_phone"  && field.related_table== "assets") {
        return true;
     }
 
    var field_name = field.field_name;
    /*if(field.field_name == 'client_contact_email' || field.field_name == 'client_contact_phone') {
       if(field.related_table=='jobs') 
            return false;

        return true;  
    }*/

    if (typeof $scope.defined_disabled_fields != 'undefined' &&
        $scope.defined_disabled_fields.indexOf(field_name) != -1) {
        return true;
    }

    
    if(field.is_visible && field.is_required)
    {
        return false;
    }
    

    if (typeof field.field_security != 'undefined' &&
        typeof field.field_security[0] != 'undefined' 
        && field.field_security[0].access == 'view') {
        // return field.field_security[0].access;
        // return !field.is_required && field.field_security[0].readonly;
        return !field.is_required;
    }

    return false;
}

var setDateFormatFunc = function(field, inputdata, $scope) {
    if (isNotEmpty(inputdata)) {
        var dt = new Date(inputdata);

        if (angular.isDate(dt)) {
            if (typeof $scope[$scope.form_model][field.related_table] != 'undefined') {
                $scope[$scope.form_model][field.related_table][field.field_name] = dt;
            }
            return;
        }

        inputdata = inputdata.toString();
        data = inputdata.split('T');
        if (data[1]) {} else {
            dt.setMinutes(dt.getMinutes() + 480);
        }

        if (typeof $scope[$scope.form_model][field.related_table] != 'undefined') {
            $scope[$scope.form_model][field.related_table][field.field_name] = dt;
        }
    }
}

var getStatesListDropdownOptionsFunc = function(field, $scope,bulk_form_id='') {
        var country = null;
        if(isNotEmpty(bulk_form_id))
        {
            // alert(bulk_form_id);
            if (typeof field != 'undefined') {
                if (typeof field.map_condition != 'undefined' && isNotEmpty(field.map_condition)) {
                    if (isObject($scope[$scope.form_model][bulk_form_id]) && 
                        isObject($scope[$scope.form_model][bulk_form_id][field.related_table]) &&
                        typeof $scope[$scope.form_model][bulk_form_id][field.related_table][field.map_condition] != 'undefined'
                    ) {
                        country = $scope[$scope.form_model][bulk_form_id][field.related_table][field.map_condition];
                    }
                }
            }        
        }
        else
        {
            if(field.field_name == 'willing_to_relocate'){
                field.map_condition = 'country';
            }
            if (typeof field != 'undefined') {
                if (typeof field.map_condition != 'undefined' && isNotEmpty(field.map_condition)) {
                    if (isObject($scope[$scope.form_model]) && 
                        isObject($scope[$scope.form_model][field.related_table]) &&
                        typeof $scope[$scope.form_model][field.related_table][field.map_condition] != 'undefined'
                    ) {
                        country = $scope[$scope.form_model][field.related_table][field.map_condition];
                    }
                }
            }

        }


        if (country != null) {
            return $scope.CountryStateList[country];
        } else if (!isEmpty($scope.country_id)) {
            return $scope.CountryStateList[$scope.country_id];
        }
        // console.log($scope.CountryStateList[1]);
        return $scope.CountryStateList[1];
}

var getTimezoneListDropdownOptionsFunc = function(field, $scope,bulk_form_id = '') {
        var country = null;
        if(isNotEmpty(bulk_form_id))
        {
            if (typeof field != 'undefined') {
                if (typeof field.map_condition != 'undefined' && isNotEmpty(field.map_condition)) {
                    if (isObject($scope[$scope.form_model][bulk_form_id]) && 
                        isObject($scope[$scope.form_model][bulk_form_id][field.related_table]) &&
                        typeof $scope[$scope.form_model][bulk_form_id][field.related_table][field.map_condition] != 'undefined'
                    ) {
                        country = $scope[$scope.form_model][bulk_form_id][field.related_table][field.map_condition];
                    }
                }
            }         
        }else if (typeof field != 'undefined') {
            if (typeof field.map_condition != 'undefined' && isNotEmpty(field.map_condition)) {
                if (isObject($scope[$scope.form_model]) && 
                    isObject($scope[$scope.form_model][field.related_table]) &&
                    typeof $scope[$scope.form_model][field.related_table][field.map_condition] != 'undefined'
                ) {
                    country = $scope[$scope.form_model][field.related_table][field.map_condition];
                }
            }
        }

        if (country != null) {
            return $scope.TimezonesCountryList[country];
        }
        return $scope.TimezonesCountryList[1];
}
App.controller('QuickFormModalInstanceCtrl', function($scope, $uibModal, $uibModalInstance, items, $filter, $rootScope, $controller, HrApiServices, $state) 
{   
    $scope.CountryList = obj_countries_list;
    $scope.StatesList = obj_states_list;
    $scope.CountryStateList = obj_country_states;

    $scope.configFormArr = items.configFormArr;
    $scope.products_services_details = items.products_services_details;
    $scope.sectionsFields = items.form_section_fields['cnf_form_section'];

    $scope.is_return_obj = items.is_return_obj ? items.is_return_obj : false;
    $scope.defined_required_fields = [];
    $scope.submit_method = items.submit_method;
    $scope.module = $scope.configFormArr['module'];
    $scope.form_model = "quick_form_model";
    $scope.form_name = "quick_form";
    $scope.validation_errors = {};
    $scope.validation_errors[$scope.form_name] = {};
    $scope[$scope.form_model] = {};
    $scope[$scope.form_name] = {};
    if(items.opportunity_id)
    {
        $scope.opportunity_id=items.opportunity_id;
        $scope.account_name =items.account_name;
        $scope.selec_account_id = items.client;
        if(isNotEmpty(items.objClientListNames))
        {
            $scope.objClientListNames = items.objClientListNames;
        }
    }

    if(items.contact_id)
    {
        $scope.contact_id=items.contact_id;
        $scope.account_name =items.account_name;
        $scope.selec_account_id = items.client;
        if(isNotEmpty(items.objClientListNames))
        {
            $scope.objClientListNames = items.objClientListNames;
        }
    }
    if(isNotEmpty($scope.configFormArr) && isNotEmpty($scope.configFormArr.form_options))
    {
        var defined_required_fields = $scope.configFormArr.form_options.defined_required_fields;
        var show_in_table_list_fields_arr = $scope.configFormArr.form_options.show_in_table_list_fields_arr;
        var defined_disabled_fields = $scope.configFormArr.form_options.defined_disabled_fields;
        var defineFieldAttrObj = $scope.configFormArr.form_options.defineFieldAttrOptions;
        //var removeSelectAllInMultiselect = $scope.configFormArr.form_options.remove_select_all_in_multiselect;
    }

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

    // $scope.removeSelectAllInMultiselect = [];
    // if (typeof removeSelectAllInMultiselect != 'undefined') {
    //     $scope.removeSelectAllInMultiselect = removeSelectAllInMultiselect;
    // }
    
    if(isNotEmpty(items.default_data)) {
        $scope[$scope.form_model] = items.default_data;
    }
    if(isNotEmpty($scope.configFormArr['module']) && $scope.configFormArr['module'] == 'add_contact_form' && isNotEmpty(items.account_id)){
        $scope[$scope.form_model]['account_contacts']['account_id'] = items.account_id;
    }

    if(isNotEmpty(items.form_slug) && items.form_slug == 'add_contact_form' && isNotEmpty(items.default_data) && isNotEmpty($scope[$scope.form_model]['account_contacts']['account_id'])){
        $scope.account_id = $scope[$scope.form_model]['account_contacts']['account_id'];
    }

    if(isNotEmpty(items.lookup_name_populate) && isNotEmpty($scope.configFormArr['module'])) {
        if($scope.configFormArr['module'] == 'add_contact_form'){
            $scope[$scope.form_model]['account_contacts']['first_name'] = items.lookup_name_populate;
        }else{
            $scope[$scope.form_model]['leads']['first_name'] = items.lookup_name_populate;
        }
    }
    $scope.getStatesListDropdownOptions = function(field,bulk_form_id='') {
        return getStatesListDropdownOptionsFunc(field, $scope,bulk_form_id);
    }

    $scope.getTimezoneListDropdownOptions = function(field,bulk_form_id='') {
        return getTimezoneListDropdownOptionsFunc(field, $scope,bulk_form_id);
    }

    $scope.configureFields = $scope.configFormArr['configure_fields'];
    var CURRENT_MODULE_ID = 1;
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isFieldVisible = function(field,bulk_form_id='') {
        return isVisibleFunc(field, $scope,bulk_form_id);
    }

    $scope.isConfigVisible = function(field)
    {
        return isConfigVisibleFunc(field, $scope);
    }

    $scope.fromQuickAdd = true;
    

    var TodaysDate = new Date();
    $scope.dateOptionsTargetJob = {maxDate:TodaysDate.setDate(TodaysDate.getDate()+150)};
    $scope.get_job_statuses =  function() {
        var statuses = items['status_list'];
        var status_ids = {}
        angular.forEach(statuses, function(value, key) {
            if(value.name == 'Active') {
                status_ids.status_active_id = value.id;
            }
            if(value.name == 'Target Date Expired') {
                status_ids.target_date_id = value.id;
            }
        });
        return status_ids;
    }
    if(isNotEmpty(items.form_slug) && items.form_slug == 'job_comment_form' && isNotEmpty(items.target_date)){
        var TodaysDate = new Date();
        $scope.dateOptionsTargetJob = {minDate:TodaysDate.setDate(TodaysDate.getDate()),maxDate:TodaysDate.setDate(TodaysDate.getDate()+150)};
        $scope[$scope.form_model]['jobs'] = {};
        $scope[$scope.form_model]['jobs']['targetDate'] = items.target_date;
    }

    $scope.get_job_hiring_stages = function() {
        
        if($scope[$scope.form_model]['jobs'].job_hiring_type != 1) {
            
            if($scope.masterLayout.company_settings.operation_country_id == 2 || $scope.masterLayout.company_settings.operation_country_id == 702) {
                // $scope[$scope.form_model]['jobs'].placement_type = "one_time_placement"; 
                // $scope[$scope.form_model]['jobs'].job_type = ""; 
                $scope[$scope.form_model]['job_pay_details'].placement_type = "one_time_placement"; 
                $scope[$scope.form_model]['job_pay_details'].job_type = ""; 
            }

        } else {
            // $scope[$scope.form_model]['jobs'].placement_type = "";
            // $scope[$scope.form_model]['jobs'].pay_type = "monthly";
            $scope[$scope.form_model]['job_pay_details'].placement_type = "";
            $scope[$scope.form_model]['job_pay_details'].pay_type = "monthly";
        }

    }

    //Quick Add Trainings from Attendees Tab
    $scope.getTrainerDetails = function(){
        if(isNotEmpty($scope[$scope.form_model]['trainings']['trainer_name'][0]['id'])) {
            var trainer_id = $scope[$scope.form_model]['trainings']['trainer_name'][0]['id'];
            HrApiServices.get('trainings/get_trainer_details/'+trainer_id).then(function(success) {
                        message_data = success.data.data;
                        $scope[$scope.form_model]['trainings']['trainer_email'] = message_data.email;
                        $scope[$scope.form_model]['trainings']['trainer_contact_phone'] = message_data.contacts_mobile;
                },function(error) {

            });
        }    
    }

    $scope.openAddTrainer = function(type) {
        $scope.type = type;
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'trainerTitle',
            ariaDescribedBy: 'trainerBody',
            templateUrl: 'trainer.html',
            controller: 'TrainerCtrl',
            size: 'md extra_large_large',
            resolve: {
                trainerObj: function () {
                    return [];
                }
            }
        }).result.then(function(response) {
            if(response == 0){
                return false;
            }else{
                $scope.itemsPerPage = $scope.itemsPerPage_new = 15;
        
                if (typeof pageno == 'undefined') {
                        pageno = 1;
                }
                var requestData = {};
                $scope.pageno = 1;
                $scope.pageno = requestData.page = pageno;
                requestData.search_key = '';
                requestData.limit = $scope.itemsPerPage;
                HrApiServices.get('trainings/get_trainers',requestData).then(function(response) {
                $scope.training_users = response.data.data.data;
                $scope.total_training_users = response.data.data.total;
                $scope.trainers_load = response.data.trainers_list;
    
                //Code for Quick Add of Trainer
                if(typeof $scope.type == 'undefined'){
                    var arrResult = [];
                    angular.forEach($scope.trainers_load,function(objkey,objindex) {
                        arrResult.push({'id':parseInt($scope.trainers_load[objindex]['id']),'name':$scope.trainers_load[objindex]['name']});
                    });
                    var trainer_id = arrResult[$scope.trainers_load.length-1]['id'];
                    $scope.trainers_list = $scope.trainers_load;
                    $scope.getQuickAddTrainer(trainer_id,$scope.trainers_list); 
                }  
            },function(error){
                $scope.form_submitted = 0;
                ajaxErrorCallBackFunc();
            });    
            }  
        }, function() {
            //on cancel button press
        });
    };

    $scope.getQuickAddTrainer = function(trainer_id,list){
        $scope.trainer_id = trainer_id;
        $scope.trainers_list = list;
        // console.log($scope.trainers_list);
        var arrResult = [];
            angular.forEach($scope.trainers_list,function(objkey,objindex) {
                if($scope.trainer_id==$scope.trainers_list[objindex]['id']) 
                {
                    arrResult.push({'id':parseInt($scope.trainer_id),'name':$scope.trainers_list[objindex]['name']});
                }
            });
            $scope[$scope.form_model]['trainings']['trainer_name'] = arrResult;
    }

    $scope.checkTargetDate = function(targetDate) {
        var target_date_reached = false;
        if(targetDate) {
            targetDate = targetDate.toString();
            targetDate = targetDate.replace(/(.+) (.+)/, "$1T$2Z");
            targetDate = new Date(targetDate).setHours(24, 0, 0, 0);
            var today = new Date().setHours(0, 0, 0, 0);
            var target_date_reached = (today > targetDate);
        }
        return target_date_reached;
    }

    $scope.check_status = function()
    {
        // console.log($scope[$scope.form_model]['jobs']['status']);
        var field_target_date = $scope[$scope.form_model]['jobs']['targetDate'];
        var target_date_reached = $scope.checkTargetDate(field_target_date);
        var status_options = $scope.get_job_statuses();
        // console.log(target_date_reached);
        if(target_date_reached) {
                $scope[$scope.form_model]['jobs']['status'] = status_options.target_date_id;
                showAlertMessage({'status':0,'message':'Please Update the Target Date'});
        }
    }

     $scope.check_target_date = function() {
        var field_target_date = $scope[$scope.form_model]['jobs']['targetDate'];
        var target_date_reached = $scope.checkTargetDate(field_target_date);
        var status_options = $scope.get_job_statuses();
        if(target_date_reached) {
            $scope[$scope.form_model]['jobs']['status'] = status_options.target_date_id;
        } else {
            if($scope[$scope.form_model]['jobs']['status'] == status_options.target_date_id) {
                $scope[$scope.form_model]['jobs']['status'] = status_options.status_active_id;
            }
        }
    }

    if($scope.module =="accounts"){
        $scope[$scope.form_model][$scope.module] = {};
        $scope[$scope.form_model][$scope.module]['account_owner'] = "  ";
        $scope[$scope.form_model][$scope.module]['billing_cycle'] = "monthly";
        $scope[$scope.form_model][$scope.module]['type'] = "Client";
        $scope[$scope.form_model][$scope.module]['invoice_terms'] = 4;
    }

    angular.extend(this, $controller('CommonFormEventsCtrl', {$scope: $scope}));  

    $scope.isDisabledField = function(field) {
        return disabledFunc(field, $scope);
    }

    $scope.calculateOpportunityAmount = function(){
		opp_amount = 0;
        if(isNotEmpty($scope[$scope.form_model]['opportunities']['product_service'])){
            angular.forEach($scope[$scope.form_model]['opportunities']['product_service'], function (value, key) {
                opp_amount = opp_amount+$scope.products_services_details[value['id']]['unit_price'] * $scope[$scope.form_model]['opportunities']['units'];
            });
        }
        $scope[$scope.form_model]['opportunities']['opportunity_amount'] = opp_amount;
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
           
            name = element.name;
            $scope.form_file_inputs[field.field_name] = $scope.files;
            $scope[$scope.form_model][field.related_table][field.field_name] = {};
            $scope[$scope.form_model][field.related_table][field.field_name]['original_name'] = $scope.files[0].name;
            $scope[$scope.form_model][field.related_table][field.field_name]['attachment_name'] = '';
            $scope[$scope.form_model][field.related_table]['is_resume'] =0;
           
        });
    }

    $scope.downloadFile = function(table, id,field='') {
        if(!isEmpty(field)){
            if(field.field_name =='po_original_name'){
                table = table+'_po';
            }
        }

        downloadAttachments(WEB_API_URL+table+'/download/'+table+'/'+id)   
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

    $scope.duplicateUseremailPopup = function(message_data) {
        var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'duplicateUserEmailPopupModalInfo.html',
              controller: 'duplicateUseremailPopupCtrl',
              size:'modal-dialog',
              resolve: {
               message_data: function () {
                   return message_data;
               },
            }
        });
        modalInstance.result.then(function (selectedItem) {
        }, function () {
         
        });
    }
    

    $scope.submit_quick_form = function()
    {
        $scope.setValidationErrorsForCustomForm();
        // check discount value field validation based on discount type field. Added by Ramesh 21-01-20
        if($scope[$scope.form_model]['accounts']!=undefined && isNotEmpty($scope[$scope.form_model]['accounts']['discount_type']) && typeof $scope[$scope.form_model]['accounts']['discount_type'] !== 'number')
        {
            if(isEmpty($scope[$scope.form_model]['accounts']['discount_value'])) 
            {
                $scope[$scope.form_name]['form']['discount_value'].$invalid = true;
                return showAlertMessage({
                    status : 0,
                    message : 'Some required fields are missing.'
                }); 
            }else{
                $scope[$scope.form_name]['form']['discount_value'].$invalid = false;
            }
        }

        if($scope[$scope.form_model]['accounts']!=undefined && 
            isNotEmpty($scope[$scope.form_model]['accounts']['placement_type']) && 
            typeof $scope[$scope.form_model]['accounts']['placement_type'] !== 'number')
        {
            if(isEmpty($scope[$scope.form_model]['accounts']['placement_value'])) 
            {
                $scope[$scope.form_name]['form']['placement_value'].$invalid = true;
                return showAlertMessage({
                    status : 0,
                    message : 'Some required fields are missing.'
                }); 
            }else{
                $scope[$scope.form_name]['form']['placement_value'].$invalid = false;
            }
        }

        if (!$scope[$scope.form_name]['form'].$valid) {  

                showAlertMessage({
                    message : ' We need a little more information before we can proceed. Please fill the required fields.  ',  
                    status : 0
                });     
                
            return false;
        }        
        formres = new FormData();

         if ($scope.form_file_inputs) { //Append Main Form Attachments
            angular.forEach($scope.form_file_inputs, function (k, v) {
                if ($scope.form_file_inputs[v]) {
                    angular.forEach($scope.form_file_inputs[v], function (value, key) {
                        formres.append('main_form_file[' + v + ']', value);
                    });
                    delete $scope.form_file_inputs[v];
                }
            });
        }
        
        var form_data = $scope[$scope.form_model];
        if($scope.opportunity_id){
            form_data['opportunity_id'] = $scope.opportunity_id;
        }
        if ($scope.candidate_account_contact)
            form_data['candidate_account_contact'] = $scope.candidate_account_contact;
        
        //  Returning Form Object without posting to api
        if(isNotEmpty(form_data['opportunities'])) {
            if(isNotEmpty(form_data['opportunities']['secondary_contact']) && isNotEmpty(form_data['opportunities']['client_manager_name'])) {
                let primaryContactInSecondaryContact = form_data['opportunities']['secondary_contact'].find(val => (val.id == form_data['opportunities']['client_manager_name'][0]['id']));
                console.log(primaryContactInSecondaryContact);
                if(primaryContactInSecondaryContact) {
                    showAlertMessage({
                        status : 0,
                        message : 'Please remove the primary contact in secondary contact field'
                    });
                    return false;
                }
            }
        }
        
        if($scope.is_return_obj){
            $uibModalInstance.close(form_data);
            return true;
        }
        formres.append("data", angular.toJson(form_data));
        HrApiServices.postAttachment($scope.submit_method, formres,true)
        .then(function(response) {

            if(isNotEmpty(response.data.data) && isNotEmpty(response.data.data.credits)) {
                if(response.data.data.credits){
                    // console.log(response.data.credits)
                    $rootScope.showAlertRecordLimitPopup(response);
                    return false;
                }
            }
             if(isNotEmpty(response.data.data) && isNotEmpty(response.data.data.checkUserEmailExists)){
                $scope.duplicateUseremailPopup(response);
                return false;
            }
            response.data.newData = form_data;
            var validations_arr = '';
            if (typeof response.data.data != 'undefined' && isNotEmpty(response.data.data.validations)){
                validations_arr = response.data.data.validations;
            }   
            if (response.data.status) {

                var resMsg = response.data.message;
                if (typeof response.data.data != 'undefined' && isNotEmpty(response.data.data.message))
                    resMsg = response.data.data.message;

                showAlertMessage({
                    status : 1,
                    message : resMsg
                });     
                 /*
                    displaying accountprimary contact after adding a new contact as a primary contact -Abdul(24-01-2020)
                    If condition to avoid pop-up js issues in pages e.g. /assignments
                    Quick Add Form
                */
                if ($scope.submit_method === 'account_contacts' && typeof $scope.getAccountPrimaryContactDetails != 'undefined') {
                    $scope.getAccountPrimaryContactDetails();
                    $uibModalInstance.close(response);
                }
                else if($scope.submit_method === 'account_contacts'){
                    curr_account_id = $scope[$scope.form_model]['account_contacts']['account_id'];
                    $scope.getContacts(curr_account_id, 1, popup=false)
                    $uibModalInstance.close(response);
                }
                else if ($scope.submit_method === 'trainings/save'){
                    $uibModalInstance.dismiss('cancel');
                }else{
                    $uibModalInstance.close(response);
                }
            }else if(!response.data.status && $scope.submit_method === 'accounts' && isEmpty(validations_arr)) {
                $scope.getDuplicateAccount(response);
            }else if(!response.data.status && $scope.submit_method === 'account_contacts') {
                $scope.getDuplicateContact(response); 
            }else if($scope.submit_method === 'jobs/save' && !response.data.status && isNotEmpty(response.data.data.validate_flag)){
                $scope.openDuplicateJobPopup(response.data.data.existing_job_record_cnt, response.data.data.existing_job_popup_details);
            }else {
                showFormValidationErrorMessages(response);
            }
            $scope.candidate_account_contact = false;
            //$state.reload();
        }, function() {
            ajaxErrorCallBackFunc();
        });
    }
    $scope.getContacts = function(RecordID, PageNo, popup=false)
    {
        //for Quick Add Contact - From Parse & submit Candidate issue
    }

    $scope.getDuplicateAccount = function (responseData) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'duplicateAccountListTitle',
            ariaDescribedBy: 'duplicateAccountListBody',
            templateUrl: 'duplicateAccountList.html',
            controller: 'duplicateAccountCtrl',
            size: 'lg modal-dialog-scrollable',
            windowClass: 'modal-dialog-centered',
            appendTo: '',
            scope:$scope,
            resolve: {
                responseData: function() {
                  return responseData;
                }
              }
        }).result.then(function() {
            // Prepare send documents data            
        }, function() {
            //on cancel button press
        });
    }

    
    $scope.getDuplicateContact = function (responseData) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'duplicateContactListTitle',
            ariaDescribedBy: 'duplicateContactListBody',
            templateUrl: 'duplicateContactList.html',
            controller: 'duplicateContactCtrl',
            size: 'lg modal-dialog-scrollable',
            windowClass: 'modal-dialog-centered',
            appendTo: '',
            scope:$scope,
            resolve: {
                responseData: function() {
                  return responseData;
                }
              }
        }).result.then(function() {
            // Prepare send documents data            
        }, function() {
            //on cancel button press
        });
    }

    $scope.openDuplicateJobPopup = function(cnt, data) {
		var modalInstance = $uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'duplicateJobModulePopupModal.html',
			controller: 'duplicateJobModuleInstanceCtrl',
			size: 'lg',
			backdrop: 'static',
			keyboard: false,
			resolve: {
				count: function () {
					return cnt;
				},
				data: function () {
					return data;
				},
			}
		});
		modalInstance.result.then(function (selectedItem) {
			if(isNotEmpty(selectedItem))
			{
				$scope[$scope.form_model]['is_force_save'] = 1;
				$scope.submit_quick_form();
			}else{
                delete $scope[$scope.form_model]['is_force_save'];
				return false;
			}

		}, function () {                     
		});
	}

   

    $scope.saveAccount = function() 
    {                
        $scope.setValidationErrorsForCustomForm();
        // console.log($scope[$scope.form_name].$error);

        if (!$scope[$scope.form_name].$valid) {
            return false;
        }

        formres = new FormData();
        
        var form_data = $scope[$scope.form_model];
        
        formres.append("data", angular.toJson(form_data));

        HrApiServices.postAttachment('accounts', formres)
        .then(function(response) {
            if (response.data.status) {
                showAlertMessage({
                    status : 1,
                    message : response.data.message
                });

                $uibModalInstance.close(response);

            } else {
                showFormValidationErrorMessages(response);
            }
        }, function() {
            ajaxErrorCallBackFunc();
        });
    }

   

    $scope.remoteCompanyUrlRequestFn = function(str) {
        $rootScope.loading = 2;
        return {query: str};
    };

    $scope.setCompanyName = function(selected) 
    {
        if(typeof $scope[$scope.form_model]['accounts'] == 'undefined')
            $scope[$scope.form_model]['accounts'] = [];

        if (selected.originalObject) 
        {
            $scope[$scope.form_model]['accounts']['account_name'] = selected.originalObject.name;
            $scope[$scope.form_model]['accounts']['website'] = selected.originalObject.domain;
            $scope[$scope.form_model]['accounts']['display_name'] = selected.originalObject.name;
        }

    }

    $scope.setCompanyNameLinkedinURL = function(selected) 
    {
        if (isNotEmpty(selected) && isNotEmpty(selected.originalObject) && angular.isObject(selected)) {
            if(typeof $scope[$scope.form_model]['accounts'] == 'undefined') $scope[$scope.form_model]['accounts'] = [];
                
            if (selected.originalObject) 
            {
                $scope[$scope.form_model]['accounts']['account_name'] = selected.originalObject.title;
                $scope[$scope.form_model]['accounts']['linkedin_url'] = selected.originalObject.link;
                $scope[$scope.form_model]['accounts']['display_name'] = selected.originalObject.title;
            }

            if(isNotEmpty($scope[$scope.form_model]['accounts']['linkedin_url'])){
                cmp_insight_data = $scope.getCustomerInsights(0, $scope[$scope.form_model]['accounts']['linkedin_url']);
            }
        }
    }

    $scope.companyChanged = function(selected)
    {
        if(typeof $scope[$scope.form_model]['accounts'] == 'undefined')
            $scope[$scope.form_model]['accounts'] = [];

        if (typeof selected != 'undefined' && selected != null) 
        {
            $scope[$scope.form_model]['accounts']['account_name'] = selected;
        }
    }
    $scope.projectChanged = function(selected)
    {
        if(typeof $scope[$scope.form_model]['jobs'] == 'undefined')
            $scope[$scope.form_model]['jobs'] = [];

        if (typeof selected != 'undefined' && selected != null) 
        {
            $scope[$scope.form_model]['jobs']['project_name'] = selected;
        }
    }
    

    $scope.getCustomerInsights = function(account_id, linkedin_url) 
    {
        if(typeof linkedin_url === 'undefined') linkedin_url = false;

        $scope.cmp_insight_data = {};
        $scope.isLoader = true;
        postData = {};
        if(linkedin_url) {
            postData.linkedin_url = linkedin_url;
            postData.extra_info = 'no';
        } else {
            postData.account_id = account_id;
        }

        HrApiServices.post('accounts/getCustomerInsights', postData,'none')
            .then(function(success) {
                if(success.data.status) 
                {
                    $scope.cmp_insight_data = success.data.data;
                    cmp_insight_data_logo = "https://logo.clearbit.com/"+$scope.cmp_insight_data.domain;
                    $scope.cmp_insight_data.clearbit_logo = cmp_insight_data_logo;  

                    if(typeof $scope[$scope.form_model]['accounts'] !== 'undefined'){
                        $scope[$scope.form_model]['accounts']['website'] = $scope.cmp_insight_data.domain;
                    } 
                    if(typeof $scope[$scope.form_model]['jobs'] !== 'undefined'){
                        $scope[$scope.form_model]['jobs']['do_not_publish'] = isNotEmpty($scope.cmp_insight_data.publish_jobs_selection)?$scope.cmp_insight_data.publish_jobs_selection:0;
                    } 

                    setTimeout(function(){
                        if(typeof $scope.cmp_insight_data.immigrations != 'undefined')
                            $scope.loadChart(true, $scope.cmp_insight_data.immigrations[0]);
                    }, 1000);

                   // cmp_insight_data_logo = "https://logo.clearbit.com/"+success.data.data.clearbit_logo;
                    $scope.cmp_insight_logo = success.data.data.clearbit_logo;

                } else {
                    $scope.cmp_insight_logo = $scope.cmp_insight_data_default_logo;
                }
            }, function() {
        });
    }

});

App.controller('CommonFormEventsCtrl', function($scope, $timeout, $http, ConfirmAlert, $uibModal, $rootScope, $filter, $sce, HrApiServices, $controller) 
{
    $scope.textTemplateBlurEvent = function(field) {
        console.log('textTemplateBlurEvent');
        if(field.related_table=='jobs' && (field.field_name=='title' || field.field_name=='client')) {
            $scope.getCandidateApplicationWorkflow();
        }
    }

    $scope.getCandidateApplicationWorkflow = function() {
        console.log($scope.form_model);
        if(isNotEmpty($scope.form_model) && ($scope.form_model=='createJobData' || $scope.form_model =='quick_form_model' || $scope.form_model =='updateSaveForm')) {
            field_name = 'title';
            field_name1 = 'client';
            if(!isEmpty($scope[$scope.form_model]['jobs'][field_name]) && !isEmpty($scope[$scope.form_model]['jobs'][field_name1])) {
                HrApiServices.post('accounts/getCandidateApplicationWorkflow',{'title':$scope[$scope.form_model]['jobs'][field_name], 'account_id':$scope[$scope.form_model]['jobs'][field_name1]},true).then(function success(response)
                {
                    if(!isEmpty(response.data.data.candidate_application_workflow)) {
                        $scope[$scope.form_model]['jobs']['candidate_application_workflow'] = response.data.data.candidate_application_workflow;
                    } else {
                        $scope[$scope.form_model]['jobs']['candidate_application_workflow'] = {};
                    }
                });
            } else {
                $scope[$scope.form_model]['jobs']['candidate_application_workflow'] = {};   
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
   
    $scope.remoteUrlRequestFn = function(str) {
        var params = { q: str };
        if(typeof $scope[$scope.form_model] != 'undefined' && typeof $scope[$scope.form_model]['projects'] !== 'undefined') { // add params
            if (typeof $scope[$scope.form_model]['projects']['id'] !== 'undefined') {
                params['record_id'] = $scope[$scope.form_model]['projects']['id'];
            }
            if (typeof $scope[$scope.form_model]['projects']['client_id'] !== 'undefined') {
                params['client_id'] = $scope[$scope.form_model]['projects']['client_id'];
            }
        }
        return params;
    };

    $scope.selected_account_name = {};
    $scope.account_contacts_list = [];
    // $scope.candidate_account_contact = false;
    $scope.setAccountName = function(field, account_id, client_manager_name='',secondary_contact='') 
    {
        $scope.selec_account_id = account_id;
        if((typeof account_id === 'undefined' || isEmpty(account_id)) && isNotEmpty($scope[$scope.form_model][field.related_table]) && isNotEmpty(field.related_table)) {
            $scope[$scope.form_model][field.related_table][field.field_name] = '';
        }
        $scope.selected_account_name = {};

        // for OTP
        if(isEmpty(client_manager_name) && 
            typeof $scope.copyOfOTP !== 'undefined' && 
            isNotEmpty($scope.copyOfOTP['one_time_placements']) && 
            isNotEmpty($scope.copyOfOTP['one_time_placements']['client_manager_name'])
        ) {
            client_manager_name =  $scope.copyOfOTP['one_time_placements']['client_manager_name'];
        }

        // if (isNotEmpty(account_id) && isNotEmpty(account_id.name) && isNotEmpty(account_id.id)) {
        //     $scope.selected_account_name = account_id;

        //     if (typeof $scope[$scope.form_model]['assignments'] !== 'undefined' && isNotEmpty($scope.getAccountApprovers)) {
        //         $scope.getAccountApprovers();
        //     }

        //     return;
        // }

        if(isNotEmpty(account_id)) {
            HrApiServices.get('accounts/getAccountName',{'id':account_id},true)
            .then(function success(response)
            {   if (response.data.status == 1) {
                    response_data = response.data;
                    $scope.selected_account_name['name'] = response_data.data.account.account_name;
                    $scope.objClientListNames = response_data.data['contacts'];
                    $scope.client_address = response_data.data['client_address'];
                    
                    if(client_manager_name && 
                        (typeof $scope[$scope.form_model]['jobs'] !== 'undefined' || 
                        typeof $scope[$scope.form_model]['pool_jobs'] !== 'undefined' || 
                        typeof $scope[$scope.form_model]['opportunities'] !== 'undefined' || 
                        typeof $scope[$scope.form_model]['one_time_placements'] !== 'undefined' || 
                        typeof $scope[$scope.form_model]['projects'] !== 'undefined')
                    ) {
                        if(!isEmpty($scope.objClientListNames)) {
                            client_manager_name_found = false;
                            angular.forEach($scope.objClientListNames, function(value, key) {
                                if(!client_manager_name_found) {
                                    if(value.id==client_manager_name){
                                        $scope[$scope.form_model][field.related_table]['client_manager_name'] = [{'id':client_manager_name, 'name':value.name}];
                                        client_manager_name_found = true;
                                    }
                                }
                            });
                        }
                    }
                    if(isNotEmpty(secondary_contact) && typeof $scope[$scope.form_model]['opportunities'] !== 'undefined'){
                        secondary_contact_field_obj = {'field_name' : 'secondary_contact','field_type' : 'multiselecttable','related_table':'opportunities'};
                        $scope.multipleInput(secondary_contact_field_obj,$scope[$scope.form_model]['opportunities']['secondary_contact'],$scope.objClientListNames);
                    }

                    // Set Client billing address
                    if(isNotEmpty($scope.client_address) && (typeof $scope[$scope.form_name]['form'] != 'undefined') && 
                        (typeof $scope[$scope.form_name]['form']['to_address'] !== 'undefined') &&
                        (typeof $scope[$scope.form_model]['project_billing_details'] !== 'undefined')
                    ) {
                        $scope[$scope.form_model]['project_billing_details']['to_address'] = $scope.client_address;
                    }

                    // Set Client OTP Invoicing days
                    if (typeof $scope[$scope.form_model]['one_time_placements'] != 'undefined') {
                        if(typeof $scope[$scope.form_model]['otp_billing_details'] == 'undefined') {
                            $scope[$scope.form_model]['otp_billing_details'] = {
                                invoicing_date : response_data.data.account.otp_invoicing_days
                            };
                        } else if (isEmpty($scope[$scope.form_model]['otp_billing_details']['id'])) { // Do not change in edit
                            $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = response_data.data.account.otp_invoicing_days;;
                        }
                    }
                }
            });    


            if(typeof $scope[$scope.form_model]['one_time_placements'] !== 'undefined' && typeof $scope[$scope.form_model]['otp_billing_details'] == 'undefined') {
                HrApiServices.get('accounts/getAccountInvoiceInformation',{'account_id':account_id},true).then(function success(response)
                {
                   var account_otp_invoice_information = response.data.data.account_invoice_information;
                    if(isEmpty($scope[$scope.form_model]['otp_billing_details'])){
                        $scope[$scope.form_model]['otp_billing_details'] = {};
                    }
                   $scope[$scope.form_model]['otp_invoice_information']['invoice_terms'] = account_otp_invoice_information['invoice_terms'];
                   $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = account_otp_invoice_information['otp_invoicing_days'];
                   $scope[$scope.form_model]['otp_billing_details']['placement_bill_type'] = account_otp_invoice_information['placement_type'];
                   $scope[$scope.form_model]['otp_billing_details']['enable_invoice_slabs'] = account_otp_invoice_information['enable_invoice_slabs'];
                    if(isNotEmpty(account_otp_invoice_information['placement_value'])) {
                        $scope[$scope.form_model]['otp_billing_details']['placement_bill_value'] = roundToFixedDecimals(account_otp_invoice_information['placement_value']);
                        $scope[$scope.form_model]['otp_billing_details']['invoice_amount'] = roundToFixedDecimals(account_otp_invoice_information['placement_value']);
                    }

                    $scope.checkInAccountInvoiceSlabs();
                });    
            }


            

            if(typeof $scope.getCustomerInsights !== 'undefined') {
                $scope.getCustomerInsights(account_id);
            }
        }
    }
    $scope.selected_project_name = {};
    $scope.setProjectId = function(selected) {
        $scope.selectedProjectObj = selected.originalObject;  

        if(isNotEmpty($scope.selectedProjectObj)) {
            if(typeof $scope[$scope.form_model] !== 'undefined') {
                if(typeof $scope[$scope.form_model]['jobs'] !== 'undefined') {
                    console.log(selected.originalObject);
                    $scope[$scope.form_model]['jobs']['project_name'] = isNotEmpty(selected.originalObject.id)?selected.originalObject.id:'';
                    $scope[$scope.form_model]['jobs']['project_id'] = isNotEmpty(selected.originalObject.project_code)?selected.originalObject.project_code:'';
                    $scope.selected_project_name = {}; 
                    $scope.selected_project_name['name'] = selected.originalObject.name;

                }
            }
        } 
                              
    }


    $scope.setAccountId = function(selected) 
    {
        console.log(selected);
        $scope.selectedAccountObj = '';
        if(typeof selected.originalObject !== 'undefined') {
            $scope.selectedAccountObj = selected.originalObject;
    
            if(typeof $scope[$scope.form_model] !== 'undefined') {

                if(typeof $scope[$scope.form_model]['pool_jobs'] !== 'undefined') {
                    $scope[$scope.form_model]['pool_jobs']['client'] = isNotEmpty(selected.originalObject.id)?selected.originalObject.id:'';
                    if($scope[$scope.form_model]['pool_jobs']['job_hiring_type'] == 4) {
                        if(isNotEmpty(selected.originalObject.actbillingaddress)) {
                            var selected_account_billing_details = selected.originalObject.actbillingaddress;
                            if(isNotEmpty(selected_account_billing_details.city)) {
                                $scope[$scope.form_model]['pool_jobs']['city'] = selected_account_billing_details.city;
                            } else {
                                $scope[$scope.form_model]['pool_jobs']['city'] = '';
                                angular.element(document.querySelector('input[name="city"]')).value = '';
                            }
                            if(isNotEmpty(selected_account_billing_details.country)) {
                                $scope[$scope.form_model]['pool_jobs']['country'] = selected_account_billing_details.country;
                            } else {
                                $scope[$scope.form_model]['pool_jobs']['country'] = '';
                            }
                            if(isNotEmpty(selected_account_billing_details.state)) {
                                var state_name = $filter('getStateName')(selected_account_billing_details.state);
                                $scope[$scope.form_model]['pool_jobs']['state'] = [{'id':selected_account_billing_details.state,'name':state_name}];
                            } else {
                                $scope[$scope.form_model]['pool_jobs']['state'] = [];
                            }
                        } else {
                            $scope[$scope.form_model]['pool_jobs']['city'] = '';
                            angular.element(document.querySelector('input[name="city"]')).value = '';
                            $scope[$scope.form_model]['pool_jobs']['country'] = $rootScope.masterLayout.company_settings.country_id;
                            $scope[$scope.form_model]['pool_jobs']['state'] = [];
                        }
                    }
                }else if(typeof $scope[$scope.form_model]['jobs'] !== 'undefined') {
                    $scope[$scope.form_model]['jobs']['client'] = isNotEmpty(selected.originalObject.id)?selected.originalObject.id:'';
                    // $scope[$scope.form_model]['jobs']['do_not_publish'] = isNotEmpty(selected.originalObject.publish_jobs_selection)?selected.originalObject.publish_jobs_selection:0;
                    if($scope[$scope.form_model]['jobs']['job_hiring_type'] == 4) {
                        
                        if(isNotEmpty(selected.originalObject.actbillingaddress)) {
                            var selected_account_billing_details = selected.originalObject.actbillingaddress;
                            if(isNotEmpty(selected_account_billing_details.city)) {
                                $scope[$scope.form_model]['jobs']['city'] = selected_account_billing_details.city;
                            } else {
                                $scope[$scope.form_model]['jobs']['city'] = '';
                                angular.element(document.querySelector('input[name="city"]')).value = '';
                            }
                            if(isNotEmpty(selected_account_billing_details.country)) {
                                $scope[$scope.form_model]['jobs']['country'] = selected_account_billing_details.country;
                            } else {
                                $scope[$scope.form_model]['jobs']['country'] = '';
                            }
                            if(isNotEmpty(selected_account_billing_details.state)) {
                                var state_name = $filter('getStateName')(selected_account_billing_details.state);
                                $scope[$scope.form_model]['jobs']['state'] = [{'id':selected_account_billing_details.state,'name':state_name}];
                            } else {
                                $scope[$scope.form_model]['jobs']['state'] = [];
                            }
                        } else {
                            $scope[$scope.form_model]['jobs']['city'] = '';
                            angular.element(document.querySelector('input[name="city"]')).value = '';
                            $scope[$scope.form_model]['jobs']['country'] = $rootScope.masterLayout.company_settings.country_id;
                            $scope[$scope.form_model]['jobs']['state'] = [];
                        }
                    }
                    $scope.getCandidateApplicationWorkflow();
                }else if(typeof $scope[$scope.form_model]['opportunities'] !== 'undefined') {
                    $scope[$scope.form_model]['opportunities']['client'] = isNotEmpty(selected.originalObject.id)?selected.originalObject.id:'';
                } else if(typeof $scope[$scope.form_model]['account_contacts'] !== 'undefined') {
                    $scope[$scope.form_model]['account_contacts']['account_id'] = isNotEmpty(selected.originalObject.id)?selected.originalObject.id:'';
                } else if(typeof $scope[$scope.form_model]['one_time_placements'] !== 'undefined') {
                    $scope[$scope.form_model]['one_time_placements']['client_id'] = isNotEmpty(selected.originalObject.id)?selected.originalObject.id:'';
                    if(typeof $scope[$scope.form_model]['otp_billing_details'] == 'undefined') {
                        $scope[$scope.form_model]['otp_billing_details'] = {
                            invoicing_date : selected.originalObject.otp_invoicing_days
                        };
                    } else {
                        $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = selected.originalObject.otp_invoicing_days;
                    }
                } else if(typeof $scope[$scope.form_model]['leads'] !== 'undefined') {
                    $scope[$scope.form_model]['leads']['client'] = isNotEmpty(selected.originalObject.id)?selected.originalObject.id:'';
                }  else if(typeof $scope[$scope.form_model]['projects'] !== 'undefined') {
                    $scope[$scope.form_model]['projects']['client_id'] = isNotEmpty(selected.originalObject.id)?selected.originalObject.id:'';
                } else if(typeof $scope[$scope.form_model]['requisitions'] !== 'undefined') {
                    $scope[$scope.form_model]['requisitions']['client'] = isNotEmpty(selected.originalObject.id)?selected.originalObject.id:'';
                }

                $scope.selected_account_name = {}; 
                $scope.selected_account_name['name'] = isNotEmpty(selected.originalObject.account_name)?selected.originalObject.account_name:'';

                $scope.selec_account_id = selected.originalObject.id;

                if(typeof $scope.getCustomerInsights !== 'undefined') {
                    $scope.getCustomerInsights(selected.originalObject.id);
                }

                $scope.unsetCustomerData(selected.customId);
                $scope.objClientListNames = {};    
                
                if (typeof $scope[$scope.form_model]['projects'] !== 'undefined') {
                    HrApiServices.get('projects/getCustomerClientNames',{'account_id':selected.originalObject.id},true).then(function success(response)
                    {
                        $scope.objClientListNames = response.data.data.customerClientsList;

                        if (isNotEmpty($scope[$scope.form_model]['project_billing_details'])) {
                            $scope[$scope.form_model]['project_billing_details']['to_address'] = response.data.data.latestBillingAddress ? response.data.data.latestBillingAddress : null;
                        }
                    });

                } else {
                    current_params = {'account_id':selected.originalObject.id,'get_job_hiring_type':1};
                    if(typeof $scope[$scope.form_model]['opportunities'] !== 'undefined'){
                        current_params['get_lead_details'] = 1;
                    }

                    HrApiServices.get('accounts/getCustomerClientNames',current_params,true).then(function success(response)
                    {


                        $scope.objClientListNames = response.data.data.contact_details; 
                        $scope.objLeadListNames = response.data.data.lead_details; 
                        job_hring_type = response.data.data.job_hiring_type;
                        if(isNotEmpty(job_hring_type)){
                            $scope[$scope.form_model]['jobs']['job_hiring_type'] = job_hring_type;
                            // $scope.objClientListNames = response.data.data.contact_details;  // re-initiate contacts data
                        }
                        

                    });

                    if(isNotEmpty($scope[$scope.form_model]['one_time_placements'])) {
                        HrApiServices.get('accounts/getAccountInvoiceInformation',{'account_id':selected.originalObject.id},true).then(function success(response)
                        {
                           var account_otp_invoice_information = response.data.data.account_invoice_information;
                           $scope[$scope.form_model]['otp_invoice_information']['invoice_terms'] = account_otp_invoice_information['invoice_terms'];
                           $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = account_otp_invoice_information['otp_invoicing_days'];
                           $scope[$scope.form_model]['otp_billing_details']['placement_bill_type'] = account_otp_invoice_information['placement_type'];
                           $scope[$scope.form_model]['otp_billing_details']['enable_invoice_slabs'] = account_otp_invoice_information['enable_invoice_slabs'];
                            if(isNotEmpty(account_otp_invoice_information['placement_value'])) {
                                $scope[$scope.form_model]['otp_billing_details']['placement_bill_value'] = roundToFixedDecimals(account_otp_invoice_information['placement_value']);
                                $scope[$scope.form_model]['otp_billing_details']['invoice_amount'] = roundToFixedDecimals(account_otp_invoice_information['placement_value']);
                            }

                            $scope.checkInAccountInvoiceSlabs();
                        });

                    }
                }
            }
        } else {

            if(typeof $scope[$scope.form_model] !== 'undefined') {
                if(typeof $scope[$scope.form_model]['pool_jobs'] !== 'undefined') {
                    $scope[$scope.form_model]['pool_jobs']['client'] = '';
                }else if(typeof $scope[$scope.form_model]['jobs'] !== 'undefined') {
                    $scope[$scope.form_model]['jobs']['client'] = '';
                }
                /*For Account type
                else if(typeof $scope[$scope.form_model]['candidates'] !== 'undefined'){
                    $scope[$scope.form_model]['candidates']['contact_name'] = '';
                }*/
                

                $scope.selec_account_id = '';

                $scope.objClientListNames = {};
                $scope.unsetCustomerData(selected.customId);
            }
        }

        
        if (typeof $scope.jobClientChange !== 'undefined' && typeof $scope.jobClientChange == 'function') {
            $scope.jobClientChange();
        }
    }

    $scope.setFormFieldAccountId = function(selected) 
    {
        $scope.selectedAccountObj = '';
        if(typeof selected.originalObject !== 'undefined') {
            $scope.selectedAccountObj = selected.originalObject;
    
            if(typeof $scope[$scope.form_model] !== 'undefined') {

                $scope.selected_account_name = {}; 
                $scope.selected_account_name[selected.customId] = isNotEmpty(selected.originalObject.account_name) ? selected.originalObject.account_name : null;

                //side widget account
                $scope.vendor_info['account_contact']['account_name'] = $scope.selected_account_name[selected.customId];
                $scope.vendor_info['account_contact']['contact_name'] = null;
                $scope.vendor_info['account_contact']['phone'] = null;
                $scope.vendor_info['account_contact']['email'] = null;


                $scope.selected_account_id = selected.originalObject.id;
                //set account value
                // $scope[$scope.form_model]['candidates'][selected.customId] = selected.originalObject.id;

                $scope.objClientListNames = {};
                $scope.account_contacts_list = [];
                var account_id = selected.originalObject.id;
                // $scope.account_contacts_list[selected.customId][account_id] = [];

                var params = {};
                params.account_id   = account_id;//selected.originalObject.id;
                params.customId     = selected.customId;

                HrApiServices.post('get_form_account_dependents',params,true)
                .then(function success(response)
                {
                    response = response.data.data;
                    $scope.objClientListNames = response.objClientListNames;
                    var dependent_fields = response.dependent_fields;
                    var selected_account_form_field = response.account_form_field;

                    //set account value
                    $scope[$scope.form_model][selected_account_form_field.related_table][selected.customId] = selected.originalObject.id;

                    //if not empty dependent fields - make changes,else no
                    if (isNotEmpty(dependent_fields)) {
                        angular.forEach(dependent_fields, function(dependent_field, key) {
                            if (dependent_field['field_type'] == 'account_contact') {
                                $scope[$scope.form_model][dependent_field['related_table']][dependent_field['field_name']] = '';//contact

                                //append options
                                angular.forEach($scope.sectionsFields, function(section, index) {
                                    angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                                        if (fieldObj.field_name == dependent_field['field_name']) {
                                            $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                                            $scope.sectionsFields[index]['cnf_form_field'][child_index].options = $scope.objClientListNames;
                                        }
                                    });
                                });

                                //accounts contacts records for phone,email
                                $scope.account_contacts_list[account_id] = [];
                                // $scope.account_contacts_list[selected.customId][account_id] = [];
                                if (isNotEmpty(response.account_contacts[account_id])) {
                                    $scope.account_contacts_list[account_id] = response.account_contacts[account_id];
                                }

                            } else {
                                //phone,or email
                                $scope[$scope.form_model][dependent_field['related_table']][dependent_field['field_name']] = null;
                            }
                        });//foreach dependent fields
                    }//not empty dependent fields
                    
                });//response  
                
            }//form model defined

        }//account object selected from auto suggestion 
    }

    $scope.setFormFieldProjectName = function(field, project_id) 
    {
        if ((typeof project_id === 'undefined' || isEmpty(project_id)) && isNotEmpty(field.related_table)) {
            $scope[$scope.form_model][field.related_table][field.field_name] = '';
        }
        if(typeof $scope[$scope.form_model] !== 'undefined') {
            if(typeof $scope[$scope.form_model]['jobs'] !== 'undefined') {
                $scope.selected_project_name = {}; 
                $scope.selected_project_name['name'] = isNotEmpty($scope[$scope.form_model]['jobs']['project_code_name'])?$scope[$scope.form_model]['jobs']['project_code_name']:'';
            }
        }

    }

    $scope.setFormFieldAccountName = function(field, account_id) 
    {
        if ((typeof account_id === 'undefined' || isEmpty(account_id)) && isNotEmpty(field.related_table)) {
            $scope[$scope.form_model][field.related_table][field.field_name] = '';
        }

        $scope.account_contacts_list = [];
        // $scope.account_contacts_list[field.field_name][account_id] = [];
        $scope.selected_account_name = {};
        var old_account_contact_id = 0;

        var params = {};
        params.account_id = account_id;
        params.customId   = field.field_name;

        $scope.selected_account_id = account_id;

        if(isNotEmpty(account_id)) {
            
            if (isNotEmpty($scope.sectionsFields)) {
                angular.forEach($scope.sectionsFields, function(section, index) {
                    angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                        if (fieldObj.field_type == 'account_contact' && fieldObj.dependent_field_name == field.field_name) {
                            //saved contact id
                            old_account_contact_id = $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name];
                        }
                    });
                });
            }

            HrApiServices.post('get_form_account_dependents', params, true).then(function success(response)
            {   
                // if (response.data.data.status == 1) {
                    response_data = response.data.data;
                    //account name
                    $scope.selected_account_name[field.field_name] = isNotEmpty(response_data.account.account_name) ? response_data.account.account_name : null;

                    //side widget account
                    $scope.vendor_info['account_contact']['account_name'] = $scope.selected_account_name[field.field_name];

                    //contacts list options
                    $scope.objClientListNames = response_data.objClientListNames;

                    if (isNotEmpty($scope.sectionsFields)) {
                        angular.forEach($scope.sectionsFields, function(section, index) {
                            angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                                if (fieldObj.field_type == 'account_contact' && fieldObj.dependent_field_name == field.field_name) {
                                    
                                    //saved contact id
                                    // old_account_contact_id = $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name];
                                    
                                    // making model value as empty
                                    $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = [];
                                    
                                    // Append options
                                    $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                                    $scope.sectionsFields[index]['cnf_form_field'][child_index].options = $scope.objClientListNames;
        
                                    //edit page - initial value
                                    if (isNotEmpty(old_account_contact_id) && isNotEmpty($scope.objClientListNames)) {
                                        angular.forEach($scope.objClientListNames, function(value, key) {
                                            if (value.id==old_account_contact_id) {
                                                $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = [{'id':value.id, 'name':value.name}];
                                            }
                                        });
                                    }
                                }
                            });
                        });

                        //accounts contacts records for phone,email
                        if (isNotEmpty(account_id) &&  typeof $scope.account_contacts_list[account_id] == 'undefined') {
                            $scope.account_contacts_list[account_id] = [];
                            if (isNotEmpty(response_data.account_contacts[account_id])) {
                                $scope.account_contacts_list[account_id] = response_data.account_contacts[account_id];

                                //side widget account contact,phone,email
                                angular.forEach($scope.account_contacts_list[account_id], function(value, key) {
                                    if (value.id==old_account_contact_id) {
                                        $scope.vendor_info['account_contact']['contact_name'] = value.name;
                                        $scope.vendor_info['account_contact']['phone'] = value.phone;
                                        $scope.vendor_info['account_contact']['email'] = value.email;
                                    }
                                });
                            }
                        }
                    }
                //} else {

                    //account name empty
                    //$scope.selected_account_name[field.field_name] = null;

                    //account contacts
                    //$scope.objClientListNames - field_name
                    //$scope.account_contacts_list - field_name
                //}
            });            
        }
    }

    $scope.getFormAccountContactDetails = function(field, account_contact) {
        var selected_account_field_name = field.dependent_field_name;
        var selected_account_id = $scope[$scope.form_model][field.related_table][field.dependent_field_name];

        //selected contact id
        var selected_account_contact_id = 0;
        if (isNotEmpty(account_contact)) {
            selected_account_contact_id = account_contact[0].id;

            //side widget account - contact
            $scope.vendor_info['account_contact']['contact_name'] = account_contact[0].name;
        }

        var account_contact_dependent_fields = [];
        //get dependent fields - phone,email - account_contact_phone, account_contact_email
        if (isNotEmpty($scope.sectionsFields)) {
            angular.forEach($scope.sectionsFields, function(section, index) {
                angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                    if ((fieldObj.field_type == 'account_contact_phone' || fieldObj.field_type == 'account_contact_email') && fieldObj.dependent_field_name == selected_account_field_name) {
                        account_contact_dependent_fields.push(fieldObj);
                    }
                });
            });
        }
        
        if (isNotEmpty(selected_account_id) && isNotEmpty(selected_account_contact_id) && isNotEmpty($scope.account_contacts_list[selected_account_id]) && isNotEmpty(account_contact_dependent_fields)) {
            //dependent fields - phone,email - assign values
            angular.forEach($scope.account_contacts_list[selected_account_id], function(contactObj) {
                if (contactObj.id == selected_account_contact_id) {
                    //dependent fields - 
                    angular.forEach(account_contact_dependent_fields, function(dependent_field) {
                        if (dependent_field.field_type == 'account_contact_phone' && dependent_field.dependent_field_name == selected_account_field_name) {
                            $scope[$scope.form_model][dependent_field.related_table][dependent_field.field_name] = contactObj.phone;
                        }
                        if (dependent_field.field_type == 'account_contact_email' && dependent_field.dependent_field_name == selected_account_field_name) {
                            $scope[$scope.form_model][dependent_field.related_table][dependent_field.field_name] = contactObj.email;
                        }
                    });
                }
            });
        }

        //side widget account
        angular.forEach($scope.account_contacts_list[selected_account_id], function(contactObj) {
            if (contactObj.id == selected_account_contact_id) {
                //side widget account - contact phone,email
                $scope.vendor_info['account_contact']['phone'] = contactObj.phone;
                $scope.vendor_info['account_contact']['email'] = contactObj.email;
            }
        });
    }


    $scope.unsetCustomerData = function(customId) {
        // console.log("customId", customId);
        if(customId == 'PoolJob.client') {
            $scope[$scope.form_model]['PoolJob.client_manager_name'] = [];
            $scope[$scope.form_model]['PoolJob.client_contact_email']  = '';
            $scope[$scope.form_model]['PoolJob.client_contact_phone'] = '';
        } else if(customId == 'Job.client') {
            $scope[$scope.form_model]['Job.client_manager_name'] = [];
            $scope[$scope.form_model]['Job.client_contact_email']  = '';
            $scope[$scope.form_model]['Job.client_contact_phone'] = '';
        }
        /* For Account type
        else if(customId == 'account_selection'){
            $scope[$scope.form_model]['candidates.contact_name'] = [];
            $scope[$scope.form_model]['candidates.contact_email']  = '';
            $scope[$scope.form_model]['candidates.contact_number'] = '';
        }*/
        else  {
            // console.log("Jobs create form", $scope[$scope.form_model]['jobs']);
            if(isNotEmpty($scope[$scope.form_model]['jobs'])) {
                $scope[$scope.form_model]['jobs']['client_manager_name'] = '';
                $scope[$scope.form_model]['jobs']['client_contact_email']  = '';
                $scope[$scope.form_model]['jobs']['client_contact_phone'] = '';
            }else if(isNotEmpty($scope[$scope.form_model]['opportunities'])) {
                $scope[$scope.form_model]['opportunities']['client_manager_name'] = [{'id':'','name':''}];
                $scope[$scope.form_model]['opportunities']['client_contact_email']  = '';
                $scope[$scope.form_model]['opportunities']['client_contact_phone'] = '';
            } else if(isNotEmpty($scope[$scope.form_model]['account_contacts'])) {
                // $scope[$scope.form_model]['assignments']['client_id'] = [{'id':'','name':''}];
                // $scope[$scope.form_model]['opportunities']['client_contact_email']  = '';
                // $scope[$scope.form_model]['opportunities']['client_contact_phone'] = '';
            } else if(isNotEmpty($scope[$scope.form_model]['one_time_placements']))
            {
                $scope[$scope.form_model]['one_time_placements']['client_manager_name'] = [{'id':'','name':''}];
                $scope[$scope.form_model]['one_time_placements']['client_contact_email']  = '';
                $scope[$scope.form_model]['one_time_placements']['client_contact_phone'] = '';
            } 
            else if(isNotEmpty($scope[$scope.form_model]['leads'])) {
                 // do nothing
            } 
            else if(isNotEmpty($scope[$scope.form_model]['projects'])) {
                $scope[$scope.form_model]['projects']['client_manager_name'] = [{'id':'', 'name':''}];
                $scope[$scope.form_model]['projects']['client_contact_email']  = '';
            } 
            else if(isNotEmpty($scope[$scope.form_model]['requisitions'])) {
                //do nothing
            }
            
            else {
                $scope[$scope.form_model]['pool_jobs']['client_manager_name'] = [];
                $scope[$scope.form_model]['pool_jobs']['client_contact_email']  = '';
                $scope[$scope.form_model]['pool_jobs']['client_contact_phone'] = '';
            }
        }
    }
   
    // set Code
    $scope.setCodeValue = function(field) {
        if (typeof $scope.selected_code == 'undefined') {
            $scope.selected_code = {}; //check undefined
        }

        if (isNotEmpty($scope[$scope.form_model]) && 
            isNotEmpty($scope[$scope.form_model][field.related_table]) &&
            isNotEmpty($scope[$scope.form_model][field.related_table]['code'])
        ) {
            
            if(field.field_name == 'submission_id') {
                $scope.selected_code[field.field_name] = { code: $scope[$scope.form_model][field.related_table]['submission_id'].toString()};
            } else {
                $scope.selected_code[field.field_name] = { code: $scope[$scope.form_model][field.related_table]['code']};
            }
          
        }
    }

    // process data based on selected obj 
    $scope.setDetailsBySelectedObj = function(selected) 
    { 
        $scope.selectedObj = '';
        if(typeof selected.originalObject !== 'undefined') {
            $scope.selectedObj = selected.originalObject;
            if (typeof $scope.selected_code == 'undefined') {
                $scope.selected_code = {}; //check undefined
            }
            $scope.selected_code[selected.customId] = { code : $scope.selectedObj.code };

            if(typeof $scope[$scope.form_model] !== 'undefined') {
                if(typeof $scope[$scope.form_model]['otp_candidate_details'] !== 'undefined' && selected.customId == 'candidate_id') {
                    // set initial value 
                    // $scope.selected_code['candidate_id'] = {};
                    // $scope.selected_code['candidate_id'] = $scope.selectedObj.code;

                    $scope[$scope.form_model]['otp_candidate_details']['candidate_id'] = $scope.selectedObj.id;
                    $scope[$scope.form_model]['otp_candidate_details']['code'] = $scope.selectedObj.code;
                    $scope[$scope.form_model]['otp_candidate_details']['first_name'] = $scope.selectedObj.first_name;
                    $scope[$scope.form_model]['otp_candidate_details']['middle_name'] = $scope.selectedObj.middle_name;
                    $scope[$scope.form_model]['otp_candidate_details']['last_name'] = $scope.selectedObj.last_name;
                    $scope[$scope.form_model]['otp_candidate_details']['email'] = $scope.selectedObj.email;
                    $scope[$scope.form_model]['otp_candidate_details']['phone'] = $scope.selectedObj.phone;
                    $scope[$scope.form_model]['otp_candidate_details']['mobile'] = $scope.selectedObj.mobile;
                    $scope[$scope.form_model]['otp_candidate_details']['source'] = $scope.selectedObj.source;
                    $scope[$scope.form_model]['otp_candidate_details']['experience'] = $scope.selectedObj.experience;
                    // $scope[$scope.form_model]['otp_candidate_details']['owner'] = $scope.selectedObj.owner_ship;
                    $scope.fieldObj = [
                        { 
                            field_name : 'owner', 
                            related_table : 'otp_candidate_details', 
                            selectedIds : $scope.selectedObj.owner_ship, 
                            options : $scope.usersList,
                            selectInitialValue : true // this optional, set for auto select inital id 
                        }
                    ];
                    $scope.changeFieldOptions($scope.fieldObj);
                    
                } else if(typeof $scope[$scope.form_model]['otp_recruitment_details'] !== 'undefined' && selected.customId == 'job_id') {
                    $scope[$scope.form_model]['otp_recruitment_details']['job_id'] = $scope.selectedObj.id;
                    $scope[$scope.form_model]['otp_recruitment_details']['code'] = $scope.selectedObj.code;
                    $scope.fieldObj = [
                        { 
                            field_name : 'account_manager', 
                            related_table : 'otp_recruitment_details', 
                            showAllOptions : true,
                            selectedIds : $scope.selectedObj.hiring_manager, options : $scope.usersList,
                            selectInitialValue : true // this optional, set for auto select inital id
                        },
                        { 
                            field_name : 'recruiter', 
                            related_table : 'otp_recruitment_details', 
                            selectedIds : $scope.selectedObj.assigned_recruiter, 
                            options : $scope.userGroupsList,
                            showAllOptions : true,
                            selectInitialValue : true // this optional, set for auto select inital id 
                        },
                        { 
                            field_name : 'recruitment_manager',
                            related_table : 'otp_recruitment_details',
                            selectedIds : $scope.selectedObj.recruitment_manager,
                            options : $scope.usersList,
                            showAllOptions : true,
                            selectInitialValue : true // this optional, set for auto select inital id 
                        }
                    ];
                    $scope.changeFieldOptions($scope.fieldObj);

                } else if(typeof $scope[$scope.form_model]['otp_recruitment_details'] !== 'undefined' && selected.customId == 'submission_id'){
                    $scope[$scope.form_model]['otp_recruitment_details']['submission_id'] = $scope.selectedObj.code;

                    if(isNotEmpty($scope.selectedObj.job_id))
                    {
                        $scope[$scope.form_model]['otp_recruitment_details']['job_id'] = $scope.selectedObj.job_id;
                        $scope[$scope.form_model]['otp_recruitment_details']['code'] = $scope.selectedObj.job_code;

                        angular.element(document.querySelector('#job_id_value')).val($scope.selectedObj.job_code);
                        var submitted_by_user_id =  '';
                        if(isNotEmpty($scope.selectedObj.submitted_by))
                        {
                            submitted_by_user_id = $scope.selectedObj.submitted_by.toString();
                        }
                        $scope.fieldObj = [
                        { 
                            field_name : 'account_manager', 
                            related_table : 'otp_recruitment_details', 
                            selectedIds : $scope.selectedObj.hiring_manager, options : $scope.usersList,
                            showAllOptions : true,

                            selectInitialValue : true // this optional, set for auto select inital id
                        },
                        { 
                            field_name : 'recruiter', 
                            related_table : 'otp_recruitment_details', 
                            selectedIds : submitted_by_user_id, 
                            options : $scope.userGroupsList,
                            showAllOptions : true,
                            selectInitialValue : true // this optional, set for auto select inital id 
                        },
                            { 
                                field_name : 'recruitment_manager',
                                related_table : 'otp_recruitment_details',
                                selectedIds : $scope.selectedObj.recruitment_manager,
                                options : $scope.usersList,
                                 showAllOptions : true,
                                selectInitialValue : true, // this optional, set for auto select inital id 
                            }
                        ];    
                    }
                    else
                    {
                        $scope.fieldObj = [
                        
                        { 
                            field_name : 'recruiter', 
                            related_table : 'otp_recruitment_details', 
                            selectedIds : submitted_by_user_id, 
                            options : $scope.userGroupsList,
                            selectInitialValue : true, // this optional, set for auto select inital id 
                            showAllOptions : true
                        }
                    ];
                    }
                    
                    $scope.changeFieldOptions($scope.fieldObj);




                }else if(typeof $scope[$scope.form_model]['otp_sales_details'] !== 'undefined' && selected.customId == 'opportunity_id') {
                    $scope[$scope.form_model]['otp_sales_details']['opportunity_id'] = $scope.selectedObj.id;
                    $scope[$scope.form_model]['otp_sales_details']['code'] = $scope.selectedObj.code;
                    $scope.fieldObj = [
                        { 
                            field_name : 'sales_executive', 
                            related_table : 'otp_sales_details', 
                            selectedIds : $scope.selectedObj.opportunity_owner, 
                            options : $scope.usersList,
                            selectInitialValue : true // this optional, set for auto select inital id 
                        }
                    ];
                    $scope.changeFieldOptions($scope.fieldObj);
                }

                 else if(typeof $scope[$scope.form_model]['assignment_recruitment_details'] !== 'undefined' && selected.customId == 'job_id') {
                    $scope[$scope.form_model]['assignment_recruitment_details']['job_id'] = $scope.selectedObj.id;
                    $scope[$scope.form_model]['assignment_recruitment_details']['code'] = $scope.selectedObj.code;
                    
                    // console.log($scope.usersList);
                    // console.log($scope.selectedObj);
                    $scope.fieldObj = [
                        { 
                            field_name : 'account_manager', 
                            related_table : 'assignment_recruitment_details', 
                            selectedIds : $scope.selectedObj.hiring_manager, options : $scope.usersList,
                            selectInitialValue : true // this optional, set for auto select inital id
                        },
                        { 
                            field_name : 'recruiter', 
                            related_table : 'assignment_recruitment_details', 
                            selectedIds : $scope.selectedObj.assigned_recruiter, 
                            options : $scope.usersList,
                            selectInitialValue : true // this optional, set for auto select inital id 
                        }
                    ];
                   $scope.changeFieldOptions($scope.fieldObj);

                } else if(typeof $scope[$scope.form_model]['assignment_sales_details'] !== 'undefined' && selected.customId == 'opportunity_id') {
                    $scope[$scope.form_model]['assignment_sales_details']['opportunity_id'] = $scope.selectedObj.id;
                    $scope[$scope.form_model]['assignment_sales_details']['code'] = $scope.selectedObj.code;
                    $scope.fieldObj = [
                        { 
                            field_name : 'sales_executive', 
                            related_table : 'assignment_sales_details', 
                            selectedIds : $scope.selectedObj.opportunity_owner, 
                            options : $scope.usersList,
                            selectInitialValue : true // this optional, set for auto select inital id 
                        }
                    ];
                    $scope.changeFieldOptions($scope.fieldObj);
                } else if(typeof $scope[$scope.form_model]['projects'] !== 'undefined' && selected.customId == 'parent_project_id') {
                    $scope[$scope.form_model]['projects']['parent_project_id'] = $scope.selectedObj.id;
                }

                // $scope.unsetCustomerData(selected.customId);
            }
        }
    }

    // manipulating field options
    $scope.changeFieldOptions = function (provided_field_obj) {
        angular.forEach(provided_field_obj, function(field_obj, field_index) {
            // check and convert id's to array
            if (field_obj.selectedIds) {
                if (typeof field_obj.selectedIds !== "object" && !Array.isArray(field_obj.selectedIds)) {
                    var idArr = field_obj.selectedIds.split(',');
                } else {
                    var idArr = field_obj.selectedIds;
                }
            } else {
                return true;
            }

            $scope.filteredOptions = field_obj.options.filter(function(item){
                return (idArr.indexOf(item.id.toString()) != -1 || isNotEmpty(field_obj.showAllOptions));  
            });
            $scope.sections_fields = $scope.sectionsFields;
            if (isNotEmpty($scope.from_onboarding)) {
                $scope.sections_fields = $scope.sectionsFields['assignment'];    
            }
            angular.forEach($scope.sections_fields, function(section, index) {
                angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                    if (fieldObj.field_name == field_obj.field_name && fieldObj.related_table == field_obj.related_table) {
                        // if filtered options are empty, we won't change existing options
                        if (isNotEmpty($scope.filteredOptions)) {
                            // making model value as empty
                            $scope[$scope.form_model][field_obj.related_table][field_obj.field_name] = [];

                            // Append options
                            $scope.sections_fields[index]['cnf_form_field'][child_index].options = [];
                            $scope.sections_fields[index]['cnf_form_field'][child_index].options = $scope.filteredOptions;
                            // Here, we are selecting first index value
                            if (isNotEmpty(field_obj.selectInitialValue) && isNotEmpty(idArr[0])) {
                                $scope.multipleInput(fieldObj, idArr[0], $scope.filteredOptions);
                            }
                        }
                    }
                });
            });
        });
    }

    $scope.setPoolSubmissionConfigure = function ($event,data) {
        $event.preventDefault();

        SecData = angular.toJson($scope[data]);
        SecData = JSON.parse(SecData);
        // console.log(SecData);
        SecData['pool_jobs']['client_name'] = $scope.selected_account_name['name'];
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'PoolSubmissionConfigure.html',
            controller: 'PoolSubmissionConfigureModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: 'sm extra_large',
            resolve: {
                items: function () {
                    return SecData;
                },
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope[data]['pool_jobs']['submission_stages_data'] = selectedItem.json_data;
            $scope.stagesDataObj = selectedItem.data;
        });
    }


    $scope.default_client_id=0;
    $scope.set_details=0;

    if(typeof $scope[$scope.form_model] !== 'undefined' && typeof $scope[$scope.form_model]['jobs'] !== 'undefined') {
        if(isEmpty($scope[$scope.form_model]['jobs']['client_manager_name'])) {
            $scope.set_details = 1;
        }
    }
    
    $scope.selected = function(field, value=null) {

     if(value==null){
         return 0;
     }else{
        if($scope.default_client_id==0){
            if(typeof value[0] !='undefined'){
                // $scope.default_client_id=value[0].id;
            }else{
                return 0;
            }
        }
     }

    if(typeof $scope[$scope.form_model]['jobs'] !='undefined' && (typeof value[0] !== 'undefined')){
       if($scope.default_client_id==value[0].id){
            if($scope.set_details==0){
                $scope.client_contact_email=$scope[$scope.form_model]['jobs']['client_contact_email'];
                $scope.client_contact_phone=$scope[$scope.form_model]['jobs']['client_contact_phone'];
                $scope.set_details=1;
            }
            // $scope[$scope.form_model][field.related_table]['client_contact_email']  = $scope.client_contact_email;
            // $scope[$scope.form_model][field.related_table]['client_contact_phone']  = $scope.client_contact_phone;
            return 0;
       }
    }
       if(isNotEmpty(field) && field.field_name == 'client_manager_name')
       {

          if(typeof $scope.assignClientDetails != 'undefined' && isEmpty($scope.assignClientDetails)) {
            $scope.assignClientDetails = 1;
            return false;
          }

          if(isNotEmpty(value) && typeof value[0] !== 'undefined') {
            if($scope.set_details==0 && typeof $scope[$scope.form_model]['jobs'] != 'undefined' && $scope[$scope.form_model]['jobs']['id']) {
                $scope.set_details = 1;
                return false;
            }

            if($scope.set_details==0 && typeof $scope[$scope.form_model]['pool_jobs'] != 'undefined' && $scope[$scope.form_model]['pool_jobs']['id']) {
                $scope.set_details = 1;
                return false;
            }
            
            $scope.default_client_id=value[0].id
              HrApiServices.get('accounts/getCustomerClientMailMobileData',{'account_id':value[0].id},true)
              .then(function success(response)
              {
                if(response.data.status == 1)
                 {
                    // console.log(response.data);
                    $scope.client_manager_name_div = 1;
                    $scope[$scope.form_model][field.related_table]['client_contact_email']  = response.data.data.email_id;
                    $scope[$scope.form_model][field.related_table]['client_contact_phone'] = response.data.data.phone;
                 }
                 else
                 {
                    $scope[$scope.form_model][field.related_table]['client_contact_email']  = "";
                    $scope[$scope.form_model][field.related_table]['client_contact_phone'] = "";
                    $scope.client_manager_name_div = "";
                 }
              });
          }
       }

    }
    
    $scope.openAccountContactFormPopup = function(field_obj,type=0)
    {
        //type 0 = Mandantory Fields, 1= All Fields
        postData = {};
        postData['form_slug'] = 'add_contact_form';
        postData['module_id'] = APP_CONSTANTS.MODULE_SLUGS.CONTACTS_SLUG['id'];
        if (field_obj.field_name == 'account_contact_name' && field_obj.field_type == 'account_contact') {
            if (isEmpty($scope.selected_account_id)) {
                objStatus = {'status':0,'message':'Please Select Customer.'};
                showAlertMessage(objStatus);;return false;
            }
            postData['account_id'] = $scope.selected_account_id;
            $scope.candidate_account_contact = true;
        } else {
            if (isEmpty($scope.selec_account_id))
            {
                objStatus = {'status':0,'message':'Please Select Customer.'};
                showAlertMessage(objStatus);;return false;
            }
            postData['account_id'] = $scope.selec_account_id;
        }
        if(type){
            postData['all_fields'] = true;
        }

        HrApiServices.get('getQuickForm',postData,true).then(function(success) {
            if(isNotEmpty(success.data.data.credits)) {
                if(success.data.data.credits){
                    // console.log(success.data.data.credits)
                    $rootScope.showAlertRecordLimitPopup(success);
                    return false;
                }
            }
            if(success.data.success)
            {
                $scope.showAccountFormPopup(success.data.data, field_obj);
            }
        }, function(error) {

        });        
    }
    $scope.openAddInterviewerPopup = function(fieldObj){
        console.log(fieldObj);
        console.log($scope[$scope.form_model][fieldObj.related_table]['interviewers']);
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addInterviewerPopup.html',
            controller: 'addInterviewerCtrl',
            size: 'lg modal-dialog-aside w-50',
            resolve: {
                items: function (HireApiServices) {
                    return {};
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
            if(selectedItem !=='undefined' && isNotEmpty(selectedItem)){
                if(isNotEmpty($scope[$scope.form_model][fieldObj.related_table]['interviewers'])){
                    $scope[$scope.form_model][fieldObj.related_table]['interviewers'].push(selectedItem);
                }else{
                    $scope[$scope.form_model][fieldObj.related_table]['interviewers']=[];
                    $scope[$scope.form_model][fieldObj.related_table]['interviewers'].push(selectedItem);
                }
               
                angular.forEach($scope.sectionsFields, function(section, index) {
                    angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                        if (fieldObj.field_name == 'interviewers') {
                            var restoreOptionsArr = [];
                            if (typeof $scope.sectionsFields[index]['cnf_form_field'][child_index].options != 'undefined') {
                                restoreOptionsArr = angular.copy($scope.sectionsFields[index]['cnf_form_field'][child_index].options);
                            }
                            $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                            $scope.sectionsFields[index]['cnf_form_field'][child_index].options = restoreOptionsArr;
                            $scope.sectionsFields[index]['cnf_form_field'][child_index].options.push(selectedItem);
                        }
                    });
                });

            }
        });
    }

    $scope.countrySelected = function (bulk_form_id='') {
        if(isNotEmpty(bulk_form_id))
        {
            if (!isEmpty($scope[$scope.form_model][bulk_form_id][$scope.module_slug]) && $scope[$scope.form_model][bulk_form_id][$scope.module_slug]['state'] != 'undefined') {
                $scope[$scope.form_model][bulk_form_id][$scope.module_slug]['state'] = '';
            }

        }        
        else if (!isEmpty($scope[$scope.form_model][$scope.module_slug]) && $scope[$scope.form_model][$scope.module_slug]['state'] != 'undefined') {
            if($scope.module_slug == 'jobs') {
                $scope[$scope.form_model][$scope.module_slug]['state'] = [{'name': 'Select','id': ''}];
                $scope[$scope.form_model][$scope.module_slug]['city'] = '';
            } else {
                $scope[$scope.form_model][$scope.module_slug]['state'] = '';
            }
        }
    }

    $scope.resetSkills = function(fieldObj){

        if(typeof $scope[$scope.form_model][fieldObj.related_table] != 'undefined') {
            $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = [];
        }   
    }

    $scope.checkJobTitleEmpty = function(jobTitle=''){
        if (jobTitle['title'] !== undefined ) {
            $scope.jobTitle = true;
        } else {
            $scope.jobTitle = false;
        }
    }

    $scope.getSkills = function(field){
        var JobTitle = $scope[$scope.form_model][field.related_table]['title'];
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'addSkillsPopup.html',
            controller: 'getSkillsModalInstanceCtrl',
            size: 'lg modal-dialog',
            windowClass: 'fixed-right',
            backdrop: false,
            centered: true,
            resolve: {
                items: function () {
                    return JobTitle;
                },
            }
        }); 
        modalInstance.result.then(function (skills) {
            if ($scope[$scope.form_model][field.related_table].hasOwnProperty('primary_skills') && !isEmpty($scope[$scope.form_model][field.related_table]['primary_skills'])) {
                var primarySkills = $scope[$scope.form_model][field.related_table]['primary_skills'];
                var mergedSkills = skills.filter(skill =>
                    !primarySkills.some(primarySkill =>
                        primarySkill.text === skill.text
                    )
                );
            console.log(mergedSkills)
                $scope[$scope.form_model][field.related_table]['primary_skills'] = primarySkills.concat(mergedSkills);
            } else {
                $scope[$scope.form_model][field.related_table]['primary_skills'] = skills;
            }
        }, function () {
            
        });
        
    };
    

    $scope.openAccountFormPopup = function(field_obj)
    {   
        postData = {};
        postData['form_slug'] = 'add_account_form';
        postData['module_id'] = APP_CONSTANTS.MODULE_SLUGS.ACCOUNTS_SLUG['id'];
        postData['candidate_account_vendor'] = false;
        if (field_obj.field_name == 'account' && field_obj.related_table == 'candidates')
            postData['candidate_account_vendor'] = true;
         
        HrApiServices.get('getQuickForm',postData,true).then(function(success) {
            if(isNotEmpty(success.data.data.credits)) {
                if(success.data.data.credits){
                    // console.log(success.data.data.credits)
                    $rootScope.showAlertRecordLimitPopup(success);
                    return false;
                }
            }
            if(success.data.success)
            {
                $scope.showAccountFormPopup(success.data.data, field_obj);
            }
        }, function(error) {

        });        
    }


    $scope.showAccountFormPopup = function(obj, field_obj)
    {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "QuickDynamicForm.html",
            controller: 'QuickFormModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: 'lg modal-dialog-aside',
            windowClass:'fixed-right',
            scope: $scope,
            backdrop: 'static',
            resolve: {
                items: function() {
                    return obj;
                },
            }
        });
        modalInstance.result.then(function(selectedItem) {
            selectedItem = selectedItem.data;
            angular.forEach($scope.sectionsFields, function(section, index) {
                angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                    if (fieldObj.field_name == 'client_id' && field_obj.field_name=='client_id' && fieldObj.related_table != 'assignments') {
                        var restoreOptionsArr = [];
                        if (typeof $scope.sectionsFields[index]['cnf_form_field'][child_index].options != 'undefined') {
                            restoreOptionsArr = angular.copy($scope.sectionsFields[index]['cnf_form_field'][child_index].options);
                        }

                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = restoreOptionsArr;
                        
                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options.push(selectedItem.data);
                        
                        if(typeof $scope[$scope.form_model][fieldObj.related_table] == 'undefined') {
                            $scope[$scope.form_model][fieldObj.related_table] = [];
                        }
                        $scope.multipleInput(fieldObj,selectedItem['data']['id'].toString(),fieldObj.options);

                        //$scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = titleData.data.id;
                    } else if(fieldObj.field_name == 'client'  && field_obj.field_name=='client') {
                        
                        delete $scope.selected_account_name;

                        $scope.selected_account_name = {};
                        
                        if(typeof $scope[$scope.form_model][fieldObj.related_table] == 'undefined') {
                            $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = [];
                            $scope.selected_account_name['name'] = '';
                        } else {
                            $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = selectedItem['data']['id'];
                            $scope.selec_account_id = selectedItem['data']['id'];
                            // $scope.selected_account_name['name'] = selectedItem['data']['name'];
                            $scope.selected_account_name['name'] = selectedItem['data']['name'];
                            document.getElementById(fieldObj.field_name+'_value').value = selectedItem['data']['name'];
                            //    $scope.selec_account_id = selectedItem['data']['id'];
                            $scope.objClientListNames = {};
                            //$scope[$scope.form_model][fieldObj.related_table]['client_manager_name'] = {};
                            $scope.unsetCustomerData('jobs');
                            if(fieldObj.related_table =='jobs'){
                                // $scope.jobClientChange();
                                $scope[$scope.form_model][fieldObj.related_table]['do_not_publish'] = isNotEmpty(selectedItem['data']['publish_jobs_selection'])?selectedItem['data']['publish_jobs_selection']:0;
                            }
                        }
                        //console.log($scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name]);

                    } else if(fieldObj.field_name == 'account' &&  field_obj.field_type == 'account' && field_obj.field_name=='account') {
                        //field_obj - selected field name
                        $scope.selected_account_name = {}; 
                        $scope.selected_account_name[field_obj.field_name] = null;

                        //side widget account
                        $scope.vendor_info['account_contact']['account_name'] = null;
                        $scope.vendor_info['account_contact']['contact_name'] = null;
                        $scope.vendor_info['account_contact']['phone'] = null;
                        $scope.vendor_info['account_contact']['email'] = null;
                        
                        $scope.selected_account_id = 0;
                        //set account value
                        $scope[$scope.form_model][field_obj.related_table][field_obj.field_name] = '';
                        
                        $scope.objClientListNames = {};
                        $scope.account_contacts_list = [];
                        

                        $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = selectedItem['data']['id'];
                        $scope.selected_account_id = selectedItem['data']['id'];
                        $scope.selected_account_name['account'] = selectedItem['data']['name'];
                        // $scope.selected_account_name[field_obj.field_name] = selectedItem['data']['name'];
                        document.getElementById(fieldObj.field_name+'_value').value = selectedItem['data']['name'];
                        $scope[$scope.form_name]['form'][fieldObj.field_name].$valid = true;
                        $scope[$scope.form_name]['form'][fieldObj.field_name].$invalid = false;

                        //side widget account
                        $scope.vendor_info['account_contact']['account_name'] = selectedItem['data']['name'];

                        $scope.objClientListNames = {};
                        //unset contacts
                        if (isNotEmpty($scope.sectionsFields)) {
                            angular.forEach($scope.sectionsFields, function(section, index) {
                                angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                                    if (fieldObj.field_type == 'account_contact' && fieldObj.dependent_field_name == field_obj.field_name) {
                                        // making model value as empty
                                        $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = [];

                                        // Append options
                                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = $scope.objClientListNames;
                                    }   
                                });
                            });
                        }
                    } else if(fieldObj.field_name == 'client_manager_name'  && field_obj.field_name == 'client_manager_name') {

                        if(typeof $scope[$scope.form_model][fieldObj.related_table] == 'undefined') {
                            $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = [];
                            // console.log('three one');
                        } else {
                            // console.log('three two');
                            if(typeof $scope.objClientListNames === 'undefined') {
                                $scope.objClientListNames = [];
                            }
                            $scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name] = [{'id':selectedItem['data']['new_contact_id'],'name':selectedItem['data']['new_account_name']}];
                            var GroupList = {'id':selectedItem['data']['new_contact_id'],'name':selectedItem['data']['new_account_name']};
                            $scope.objClientListNames.push(GroupList);
                            // console.log($scope.objClientListNames);
                            $scope.multipleInput('',selectedItem['data']['new_contact_id'].toString(),$scope.objClientListNames,'contact_id',field_obj.client_index);
                        }
                        //console.log($scope[$scope.form_model][fieldObj.related_table][fieldObj.field_name]);
                    }
                });
            });

            if(typeof field_obj != 'undefined' && isNotEmpty($scope.accounts_list))
            {
                list = angular.copy($scope.accounts_list);
                $scope.accounts_list = [];
                $scope.accounts_list = list;
                $scope.accounts_list.push({'id' : selectedItem.data.id, 'name' : selectedItem.data.name});
                $scope.multipleInput(field_obj, selectedItem['data']['id'].toString(), $scope.accounts_list);
            }

            // set account details while adding new account
            if(typeof field_obj != 'undefined' && field_obj.field_name != 'contact_id' && field_obj.related_table == 'assignments') {
                if (typeof field_obj.activeTab == 'undefined') {
                    field_obj.activeTab_id = $scope.first_client_tab_id;
                    field_obj.activeTab = 'client';
                }

                // set accont id and reset contact details
                $scope.billableAssignment['assignmentClientVendorDetails'][field_obj.activeTab][
                    field_obj.activeTab_id].account_id = selectedItem.data;
                $scope.assignment_account_contacts_list[selectedItem.data.account_id] = [];
                $scope.billableAssignment.assignmentClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['contact_person'] = [];
                $scope.billableAssignment.assignmentClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['phone'] = '';
                $scope.billableAssignment.assignmentClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['email'] = '';

                // While adding client_id from assignment main section
                if(typeof field_obj != 'undefined' && field_obj.field_name == 'client_id' && field_obj.related_table == 'assignments') {
                    $scope[$scope.form_model][field_obj.related_table][field_obj.field_name] = selectedItem['data'];
                    $scope.getAccountApprovers();
                    return; // no need to move, to next.
                }

                $scope.assignmentVendorTabChangeEvent(selectedItem.data);

                return; // no need to move, to next.
            }

            // Set Contact details of account
            if(typeof field_obj != 'undefined' && (field_obj.comingFrom == 'onboardingAccountContacts' || field_obj.comingFrom == 'assignmentAccountContacts')) {
                selectedItem.data.id = selectedItem.data.new_contact_id;
                selectedItem.data.name = selectedItem.data.new_account_name;
                selectedItem.data.account_id = selectedItem.data.new_account_id;
                selectedItem.data.email = selectedItem.data.new_contact_email;
                selectedItem.data.phone = selectedItem.data.new_contact_phone;

                $scope.assignment_account_contacts_list[selectedItem['data']['new_account_id']].push(selectedItem.data);
                $scope.assignment_account_contacts_list[undefined] = true;
                $timeout(function() {
                    delete $scope.assignment_account_contacts_list[undefined];
                    $scope.$apply();
                });

                $scope.billableAssignment.assignmentClientVendorDetails[$scope.vendor_client_active_tab][$scope.active_client_tab_id].email = selectedItem['data']['new_contact_email'];
                $scope.billableAssignment.assignmentClientVendorDetails[$scope.vendor_client_active_tab][$scope.active_client_tab_id].phone = selectedItem['data']['new_contact_phone'];

                $scope.billableAssignment.assignmentClientVendorDetails[$scope.vendor_client_active_tab][$scope.active_client_tab_id]['contact_person'] = [selectedItem.data];

                return; // no need to move, to next.
            }

            if(typeof field_obj != 'undefined' && field_obj.field_name == 'account_id' && field_obj.source == 'account_contacts') {
                $scope.createAccountData.account_contacts.account_id = selectedItem['data']['id'];
                $scope.selected_account_name['name'] = selectedItem['data']['name'];
                document.getElementById('account_contacts.account_id_value').value = selectedItem['data']['name'];                
            }

            //After add contact reload the contact list in account contacts Ramesh 10-01-20

            if(typeof field_obj != 'undefined' && field_obj.field_name == 'account_contact_id' && field_obj.source == 'account_contacts') {
                $scope.getTableListData(1,'', 'contact_details');
            }


            // set account details while adding new account in jobs Client Vendor Information
            if(typeof field_obj != 'undefined' && field_obj.field_name != 'contact_id' && field_obj.related_table == 'jobs') {

                // set accont id and reset contact details
                if(field_obj.from == 'vendor_section') {
                    // console.log(field_obj.from);
                    $scope.createJobData['jobClientVendorDetails'][field_obj.activeTab][
                    field_obj.activeTab_id].account_id = selectedItem.data;

                    $scope.createJobData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['contact_person'] = [];
                    $scope.createJobData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['phone'] = '';
                    $scope.createJobData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['email'] = '';
                } else if(field_obj.from = 'main_section' && field_obj.field_name == 'client') {
                    if(typeof $scope.createJobData['jobClientVendorDetails'] == 'undefined') {
                        $scope.createJobData.jobClientVendorDetails = {};
                        $scope.createJobData.jobClientVendorDetails['client'] = [];
                        $scope.createJobData.jobClientVendorDetails['client'][1] = {
                            'account_id': '',
                            'contact_person': '',
                            'email': '',
                            'phone': ''
                        };
                    }
                    $scope.createJobData.jobClientVendorDetails['client'][1]['account_id'] = {'id':selectedItem.data.account_id,'name':selectedItem.data.name};
                    $scope.createJobData.jobClientVendorDetails['client'][1]['contact_person'] = '';
                    $scope.createJobData.jobClientVendorDetails['client'][1]['email'] = '';
                    $scope.createJobData.jobClientVendorDetails['client'][1]['phone'] =  '';
                }
                
                
                return; // no need to move, to next.
            }

            // Set Contact details of account
            if(typeof field_obj != 'undefined' && (field_obj.comingFrom == 'jobAccountContacts')) {
                selectedItem.data.id = selectedItem.data.new_contact_id;
                selectedItem.data.name = selectedItem.data.new_account_name;
                selectedItem.data.account_id = selectedItem.data.new_account_id;
                selectedItem.data.email = selectedItem.data.new_contact_email;
                selectedItem.data.phone = selectedItem.data.new_contact_phone;
                
                if(typeof $scope.job_account_contacts_list[selectedItem['data']['new_account_id']] == 'undefined') {
                    $scope.job_account_contacts_list[selectedItem['data']['new_account_id']] = [];
                }
                
                $scope.job_account_contacts_list[selectedItem['data']['new_account_id']].push(selectedItem.data);
                $scope.job_account_contacts_list[undefined] = true;
                $timeout(function() {
                    delete $scope.job_account_contacts_list[undefined];
                    $scope.$apply();
                });

    
                $scope.createJobData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id].email = selectedItem['data']['new_contact_email'];
                $scope.createJobData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id].phone = selectedItem['data']['new_contact_phone'];

                $scope.createJobData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id].contact_person = [selectedItem.data];
                if(field_obj.activeTab == 'client' && field_obj.activeTab_id == 0) {
                    $scope.createJobData['jobs']['client_manager_name'] = [selectedItem.data];
                    $scope.createJobData['jobs']['client_contact_email'] = selectedItem.data.email;
                    $scope.createJobData['jobs']['client_contact_phone'] = selectedItem.data.phone;
                }

                return; // no need to move, to next.
            }


            // set account details while adding new account in pool jobs Client Vendor Information
            if(typeof field_obj != 'undefined' && field_obj.field_name != 'contact_id' && field_obj.related_table == 'pool_jobs') {
                // console.log($scope.saveSubmissionData);
                // console.log($scope.updateSubmissionForm);
                // set accont id and reset contact details
                if(typeof $scope.saveSubmissionData != 'undefined') {
                    if(field_obj.from == 'vendor_section') {
                    // console.log(field_obj.from);
                    $scope.saveSubmissionData['jobClientVendorDetails'][field_obj.activeTab][
                    field_obj.activeTab_id].account_id = selectedItem.data;

                    $scope.saveSubmissionData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['contact_person'] = [];
                    $scope.saveSubmissionData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['phone'] = '';
                    $scope.saveSubmissionData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['email'] = '';
                    } else if(field_obj.from = 'main_section' && field_obj.field_name == 'client') {
                        if(typeof $scope.saveSubmissionData['jobClientVendorDetails'] == 'undefined') {
                            $scope.saveSubmissionData.jobClientVendorDetails = {};
                            $scope.saveSubmissionData.jobClientVendorDetails['client'] = [];
                            $scope.saveSubmissionData.jobClientVendorDetails['client'][1] = {
                                'account_id': '',
                                'contact_person': '',
                                'email': '',
                                'phone': ''
                            };
                        }
                        $scope.saveSubmissionData.jobClientVendorDetails['client'][1]['account_id'] = {'id':selectedItem.data.account_id,'name':selectedItem.data.name};
                        // console.log($scope.saveSubmissionData.jobClientVendorDetails['client'][0]['account_id']);
                        $scope.saveSubmissionData.jobClientVendorDetails['client'][1]['contact_person'] = '';
                        $scope.saveSubmissionData.jobClientVendorDetails['client'][1]['email'] = '';
                        $scope.saveSubmissionData.jobClientVendorDetails['client'][1]['phone'] =  '';
                    }
                } else if(typeof $scope.updateSubmissionForm != 'undefined') {
                    if(field_obj.from == 'vendor_section') {
                        // console.log(field_obj.from);
                        $scope.updateSubmissionForm['jobClientVendorDetails'][field_obj.activeTab][
                        field_obj.activeTab_id].account_id = selectedItem.data;

                        $scope.updateSubmissionForm.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['contact_person'] = [];
                        $scope.updateSubmissionForm.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['phone'] = '';
                        $scope.updateSubmissionForm.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id]['email'] = '';
                    } else if(field_obj.from = 'main_section' && field_obj.field_name == 'client') {
                        $scope.updateSubmissionForm.jobClientVendorDetails['client'][0]['account_id'] = {'id':selectedItem.data.account_id,'name':selectedItem.data.name};
                        $scope.updateSubmissionForm.jobClientVendorDetails['client'][0]['contact_person'] = '';
                        $scope.updateSubmissionForm.jobClientVendorDetails['client'][0]['email'] = '';
                        $scope.updateSubmissionForm.jobClientVendorDetails['client'][0]['phone'] =  '';
                    }
                }
                
                return; // no need to move, to next.
            }

            // Set Contact details of account
            if(typeof field_obj != 'undefined' && (field_obj.comingFrom == 'pooljobAccountContacts')) {
                selectedItem.data.id = selectedItem.data.new_contact_id;
                selectedItem.data.name = selectedItem.data.new_account_name;
                selectedItem.data.account_id = selectedItem.data.new_account_id;
                selectedItem.data.email = selectedItem.data.new_contact_email;
                selectedItem.data.phone = selectedItem.data.new_contact_phone;

                $scope.job_account_contacts_list[selectedItem['data']['new_account_id']].push(selectedItem.data);
                $scope.job_account_contacts_list[undefined] = true;
                $timeout(function() {
                    delete $scope.job_account_contacts_list[undefined];
                    $scope.$apply();
                });

    
                $scope.saveSubmissionData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id].email = selectedItem['data']['new_contact_email'];
                $scope.saveSubmissionData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id].phone = selectedItem['data']['new_contact_phone'];

                $scope.saveSubmissionData.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id].contact_person = [selectedItem.data];
                if(field_obj.activeTab == 'client' && field_obj.activeTab_id == 0) {
                    $scope.saveSubmissionData['pool_jobs']['client_manager_name'] = [selectedItem.data];
                    $scope.saveSubmissionData['pool_jobs']['client_contact_email'] = selectedItem.data.email;
                    $scope.saveSubmissionData['pool_jobs']['client_contact_phone'] = selectedItem.data.phone;
                }

                return; // no need to move, to next.
            }



            // Set Contact details of account
            if(typeof field_obj != 'undefined' && (field_obj.comingFrom == 'pooljobAccountContactspopup')) {
                selectedItem.data.id = selectedItem.data.new_contact_id;
                selectedItem.data.name = selectedItem.data.new_account_name;
                selectedItem.data.account_id = selectedItem.data.new_account_id;
                selectedItem.data.email = selectedItem.data.new_contact_email;
                selectedItem.data.phone = selectedItem.data.new_contact_phone;

                $scope.job_account_contacts_list[selectedItem['data']['new_account_id']].push(selectedItem.data);
                $scope.job_account_contacts_list[undefined] = true;
                $timeout(function() {
                    delete $scope.job_account_contacts_list[undefined];
                    $scope.$apply();
                });

    
                $scope.updateSubmissionForm.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id].email = selectedItem['data']['new_contact_email'];
                $scope.updateSubmissionForm.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id].phone = selectedItem['data']['new_contact_phone'];

                $scope.updateSubmissionForm.jobClientVendorDetails[field_obj.activeTab][field_obj.activeTab_id].contact_person = [selectedItem.data];
                if(field_obj.activeTab == 'client' && field_obj.activeTab_id == 0) {
                    $scope.updateSubmissionForm['pool_jobs']['client_manager_name'] = [selectedItem.data];
                    $scope.updateSubmissionForm['pool_jobs']['client_contact_email'] = selectedItem.data.email;
                    $scope.updateSubmissionForm['pool_jobs']['client_contact_phone'] = selectedItem.data.phone;
                }

                return; // no need to move, to next.
            }

            // set account details while adding new account
            if(typeof field_obj != 'undefined' && field_obj.field_name == 'client_id' && (field_obj.related_table == 'one_time_placements' || field_obj.related_table == 'projects')) {
                $scope[$scope.form_model][field_obj.related_table][field_obj.field_name] = selectedItem.data.id;
                $scope.selected_account_name['name'] = selectedItem['data']['name'];
                $scope.selec_account_id = selectedItem.data.id;
                return; // no need to move, to next.
            }

             // Set Contact details of account - candidates - vendor info
             if(typeof field_obj != 'undefined' && field_obj.field_name == 'account_contact_name' && field_obj.field_type == 'account_contact') {

                //side widget account
                $scope.vendor_info['account_contact']['contact_name'] = null;
                $scope.vendor_info['account_contact']['phone'] = null;
                $scope.vendor_info['account_contact']['email'] = null;

                $scope.objClientListNames = {};
                $scope.account_contacts_list = [];

                $scope.objClientListNames = selectedItem.data.account_contact_data.objClientListNames;
                var dependent_fields = selectedItem.data.account_contact_data.dependent_fields;
                var selected_account_form_field = selectedItem.data.account_contact_data.account_form_field;
                var account_id = selectedItem.data.account_contact_data.account.id;

                //if not empty dependent fields - make changes,else no
                if (isNotEmpty(dependent_fields)) {
                    angular.forEach(dependent_fields, function(dependent_field, key) {
                        if (dependent_field['field_type'] == 'account_contact') {
                            $scope[$scope.form_model][dependent_field['related_table']][dependent_field['field_name']] = '';//contact

                            //append options
                            angular.forEach($scope.sectionsFields, function(section, index) {
                                angular.forEach(section['cnf_form_field'], function(fieldObj, child_index) {
                                    if (fieldObj.field_name == dependent_field['field_name']) {
                                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = [];
                                        $scope.sectionsFields[index]['cnf_form_field'][child_index].options = $scope.objClientListNames;
                                    }
                                });
                            });

                            //new contact set as - initial value
                            if (isNotEmpty(selectedItem.data.new_contact_id) && isNotEmpty($scope.objClientListNames)) {
                                angular.forEach($scope.objClientListNames, function(value, key) {
                                    if (value.id==selectedItem.data.new_contact_id) {
                                        $scope[$scope.form_model][dependent_field['related_table']][dependent_field['field_name']] = [{'id':value.id, 'name':value.name}];

                                        $scope.vendor_info['account_contact']['contact_name'] = value.name;
                                        $scope.vendor_info['account_contact']['phone'] = selectedItem.data.new_contact_phone;
                                        $scope.vendor_info['account_contact']['email'] = selectedItem.data.new_contact_email;
                                    }
                                });
                            }

                            //accounts contacts records for phone,email
                            $scope.account_contacts_list[account_id] = [];
                            // $scope.account_contacts_list[selected.customId][account_id] = [];
                            if (isNotEmpty(selectedItem.data.account_contact_data.account_contacts[account_id])) {
                                $scope.account_contacts_list[account_id] = selectedItem.data.account_contact_data.account_contacts[account_id];
                            }

                        } else {
                            //phone,or email
                            $scope[$scope.form_model][dependent_field['related_table']][dependent_field['field_name']] = null;
                        }
                    });//foreach dependent fields
                }//not empty dependent fields     

                return; // no need to move, to next.           
            }

        }, function() {

        });
        $scope.modalInstance = modalInstance;
    }


    $scope.convertDateStringToObject = function(fields_obj) {
        angular.forEach(fields_obj, function(fields_arr, obj_index) {
            angular.forEach(fields_arr, function(field) {
                
                if (angular.isArray($scope[$scope.form_model][obj_index])) {
                    angular.forEach($scope[$scope.form_model][obj_index], function(loop_obj, key) {
                        if (typeof $scope[$scope.form_model][obj_index][key][field] != 'undefined') {
                            $scope[$scope.form_model][obj_index][key][field] = 
                                $scope.getDateFromString($scope[$scope.form_model][obj_index][key][field]);
                        }
                    });
                } else if (isObject($scope[$scope.form_model][obj_index])) {
                    $scope[$scope.form_model][obj_index][field] = $scope.getDateFromString($scope[$scope.form_model][obj_index][field]);
                }
            });
        });
    }

    $scope.convertNumberToString = function(fields_obj) {
        angular.forEach(fields_obj, function(fields_arr, obj_index) {
            angular.forEach(fields_arr, function(field) {
                if (isNotEmpty($scope[$scope.form_model]) && isObject($scope[$scope.form_model][obj_index])) {
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

    $scope.setValidationErrorsForCustomForm = function() {
        $scope['validation_errors'] = {};

        console.log($scope[$scope.form_name]['form']);

        if($scope.isPipelineBulkForm || $scope.isSubmissionBulkForm) {
            angular.forEach($scope[$scope.form_name]['form'], function(formscontrolls, form_key) {
                angular.forEach(formscontrolls.$$controls, function(inputEle) {
                    var field_name = inputEle.$name;
                    
                    if (typeof field_name == 'undefined' || field_name == '') {
                        return true;
                    }
                    if(isEmpty($scope['validation_errors'][$scope.form_name])) {
                        $scope['validation_errors'][$scope.form_name] = {};
                    }
                    if(isEmpty($scope['validation_errors'][$scope.form_name][form_key])) {
                        $scope['validation_errors'][$scope.form_name][form_key] = {};
                    }

                    $scope['validation_errors'][$scope.form_name][form_key][field_name] = false;
                    if (isNotEmpty($scope[$scope.form_name]['form'][form_key][field_name]) && (Object.keys($scope[$scope.form_name]['form'][form_key][field_name].$error).length > 0 || (isEmpty($scope[$scope.form_name]['form'][form_key][field_name].$viewValue) && $scope[$scope.form_name]['form'][form_key][field_name].$$attr.required))) {
                        $scope['validation_errors'][$scope.form_name][form_key][field_name] = true;
                    }
                    if(isEmpty($scope[$scope.form_name]['form'][form_key][field_name].$viewValue) && $scope[$scope.form_name]['form'][form_key][field_name].$$attr.required){
                        $scope[$scope.form_name]['form'][form_key][field_name].$invalid = true;
                    }
                    
                });
            });
        } else {
            angular.forEach($scope[$scope.form_name]['form'].$$controls, function(inputEle) {
                var field_name = inputEle.$name;
                
                if (typeof field_name == 'undefined' || field_name == '') {
                    return true;
                }
                if(isEmpty($scope['validation_errors'][$scope.form_name])) {
                    $scope['validation_errors'][$scope.form_name] = {};
                }

                



                $scope['validation_errors'][$scope.form_name][field_name] = false;
                if (isNotEmpty($scope[$scope.form_name]['form'][field_name])
                 && ((Object.keys($scope[$scope.form_name]['form'][field_name].$error).length > 0)
                  || (isEmpty($scope[$scope.form_name]['form'][field_name].$viewValue, false) && ($scope[$scope.form_name]['form'][field_name].$$attr.required)))) {
                    $scope['validation_errors'][$scope.form_name][field_name] = true;
                 
                }
                if(isEmpty($scope[$scope.form_name]['form'][field_name].$viewValue,false) && $scope[$scope.form_name]['form'][field_name].$$attr.required){
                    $scope[$scope.form_name]['form'][field_name].$invalid = true;

                }

                if(field_name =='client' && $scope.form_name == 'create_job_form')
                {
                    if(!(isEmpty($scope[$scope.form_name]['form'][field_name].$viewValue) && ($scope[$scope.form_name]['form'][field_name].$$attr.required 
                        || $scope[$scope.form_name]['form'][field_name].$$scope.fieldRequired))) {
                        $scope['validation_errors'][$scope.form_name][field_name] = false;
                        $scope[$scope.form_name]['form'][field_name].$invalid = false;
                        $scope[$scope.form_name]['form'].$valid = true;
                    }
                }

                if(field_name =='city' || field_name =='client'){
                    if(isEmpty($scope[$scope.form_name]['form'][field_name].$viewValue) && ($scope[$scope.form_name]['form'][field_name].$$attr.required || $scope[$scope.form_name]['form'][field_name].$$scope.fieldRequired)){
                        $scope['validation_errors'][$scope.form_name][field_name] = true;
                        $scope[$scope.form_name]['form'][field_name].$invalid = true;
                        $scope[$scope.form_name]['form'][field_name].$valid = false;
                        $scope[$scope.form_name]['form'].$invalid = true;
                        $scope[$scope.form_name]['form'].$valid = false;

                    }
                    
                }
                
            });
        }
    }

    $scope.isRequiredField = function(field) {

        if (typeof field == 'undefined') {
            return false;
        }

        var field_name = field.field_name;
        if (typeof $scope.disable_validation_fields_arr != 'undefined' &&
            angular.isArray($scope.disable_validation_fields_arr) &&
            $scope.disable_validation_fields_arr.indexOf(field_name) > -1
        ) {
            return false;
        }
        if(field.related_table == "candidates" && 
            typeof $scope.for_portal != undefined && 
            isNotEmpty($scope.for_portal)
        ) {
            if(isNotEmpty(field.required_in_portal)) {
                if(field.field_type == 'checkboxes' && typeof $scope[$scope.form_model] !== 'undefined'){
                    checkbox_field_obj = $scope[$scope.form_model][field.related_table][field.field_name];
                    if(isNotEmpty(checkbox_field_obj) && isNotEmpty(checkbox_field_obj['check'])){
                        if (Object.values(checkbox_field_obj['check']).indexOf(true) > -1) {
                            return false;
                        }
                    }
                }
                return true;
            } else {
                return false;
            }
        }else if(field.related_table == "assets"){
           if(field.field_name == 'assign_to') {
                if(!isEmpty($scope[$scope.form_model][field.related_table]) && $scope[$scope.form_model][field.related_table]['status']=='Assigned') 
            {
                return true;
            }
            else 
            {
                return false;
            }
        }
        } else if(field.related_table == 'assignment_invoice_information'){
            if(typeof $scope.billableAssignment !== 'undefined' && typeof $scope.billableAssignment['assignment_invoice_information'] !== 'undefined') {
                if(field.field_name == 'so_number') {
                    if(!isEmpty($scope.billableAssignment['assignment_invoice_information']['so_original_name'])){
                        return true;
                    } else {
                        return false;
                    }
                } else if(field.field_name == 'so_original_name') {
                    if(!isEmpty($scope.billableAssignment['assignment_invoice_information']['so_number'])){
                        return true;
                    } else {
                        return false;
                    }
                } else if(field.field_name == 'po_number') {
                    if(!isEmpty($scope.billableAssignment['assignment_invoice_information']['po_original_name']) || field.is_required){
                        return true;
                    } else {
                        return false;
                    }
                } else if(field.field_name == 'po_original_name') {
                    if(!isEmpty($scope.billableAssignment['assignment_invoice_information']['po_number']) && field.is_required){
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }


        if (field.is_required) {
            //if candidate source is vendor returns true otherwise false
            if(field.field_name == 'vendor' && field.related_table == 'candidates'  && field.field_type == 'account'){
                if(typeof $scope.createCandidateData !== 'undefined' && $scope.vendor_source !== 'undefined') {
                    if($scope.createCandidateData['candidates']['source'] != $scope.vendor_source['id']){
                        return false;
                    }
                }
            }

            if(field.field_type == 'checkboxes' && typeof $scope[$scope.form_model] !== 'undefined'){
                checkbox_field_obj = $scope[$scope.form_model][field.related_table][field.field_name];
                if(isNotEmpty(checkbox_field_obj) && isNotEmpty(checkbox_field_obj['check'])){
                    if (Object.values(checkbox_field_obj['check']).indexOf(true) > -1) {
                        return false;
                    }
                }
            }

            //If Customer Type is internal, for show_client_vendor validation returns false
            if(field.field_name == 'show_client_vendor' && field.related_table == 'jobs' && field.field_type == 'checkbox'){
                if(typeof $scope.createJobData !== 'undefined') {
                    if($scope.createJobData['jobs']['job_hiring_type']=='1'){
                        return false;
                    }
                }
                if(typeof $scope[$scope.form_model] !== 'undefined') {
                    if($scope[$scope.form_model]['jobs']['job_hiring_type']=='1'){
                        return false;
                    }
                }
            }

            //If Assignment Hiring Type is non-billable, for assignment_invoice_info section validation returns false
            if($scope.isHiringTypeNonBillable) {
                if (typeof $scope.assignment_invoice_info_section_id == 'undefined') {
                    $scope.assignment_invoice_info_section_id = 0;
                }

                if(field.related_table == 'assignment_invoice_information') {
                    $scope.assignment_invoice_info_section_id = field.cnf_form_section_id
                    return false;
                }

                // For custom fields
                if((field.related_table == 'assignment_additional_fields') && 
                    ($scope.assignment_invoice_info_section_id == field.cnf_form_section_id)
                ) {
                    return false;
                }

            }

            return true;
        }
        
        if (isNotEmpty($scope.defined_required_fields)) {
            if ($scope.defined_required_fields.indexOf(field_name) != -1) {
                return true;
            }
        }

        return false;
    }

    $scope.selectedCustomLocation = function(selected) {

        // selected_country = selected_state = selected_statename = selected_city = selected_zip = '';
        if (selected.originalObject) 
        {
            selected_country = selected_state = selected_statename = selected_city = selected_zip = '';
             
            if(typeof selected.originalObject === 'string') {
                selected_city = selected.originalObject;
            } else if(isEmpty(selected.originalObject.city)) {
                selected_city = selected.originalObject.name;
            } else {
                selected_country = selected.originalObject.country_id;
                selected_state = selected.originalObject.state_id;
                selected_statename = selected.originalObject.statename;
                selected_city = selected.originalObject.city;
                selected_zip = '';
                if (selected.originalObject.zip) 
                {
                    selected_zip = selected.originalObject.zip;
                }
            }
        // }

            if (selected.customId == 'work_location_city' && typeof $scope[$scope.form_model]['assignments'] != 'undefined') {
                if (typeof $scope[$scope.form_model]['assignment_location_details'] == 'undefined') {
                    $scope[$scope.form_model]['assignment_location_details'] = {};
                }
                
                $scope[$scope.form_model]['assignment_location_details']['work_location_city'] = selected_city;
                $scope[$scope.form_model]['assignment_location_details']['work_location_country'] = selected_country;
                $scope[$scope.form_model]['assignment_location_details']['work_location_state'] = selected_state;
                delete $scope[$scope.form_model]['assignment_location_details']['zip_code'];
            }

            angular.element(document.querySelector('#'+selected.customId)).value = selected_city;

            if(selected.customId == 'user_city' &&  typeof $scope[$scope.form_model]['user_addresses'] !== 'undefined') {
                $scope[$scope.form_model]['user_addresses']['zip_code'] = selected_zip;
                $scope[$scope.form_model]['user_addresses']['user_city'] = selected_city;
                $scope[$scope.form_model]['user_addresses']['user_country'] = selected_country;
                $scope[$scope.form_model]['user_addresses']['user_state'] = selected_state;
            }
            else if(typeof $scope[$scope.form_model]['jobs'] !== 'undefined') {
                $scope[$scope.form_model]['jobs']['zip_code'] = selected_zip;
                $scope[$scope.form_model]['jobs']['city'] = selected_city;
                $scope[$scope.form_model]['jobs']['country'] = selected_country;
                $scope[$scope.form_model]['jobs']['state'] = [];
                data = { 'id': selected_state, 'name': selected_statename };
                $scope[$scope.form_model]['jobs']['state'].push(data);   
            } else if(typeof $scope[$scope.form_model]['candidates'] !== 'undefined') {
                $scope[$scope.form_model]['candidates']['zip_code'] = selected_zip;
                $scope[$scope.form_model]['candidates']['city'] = selected_city;
                $scope[$scope.form_model]['candidates']['country'] = selected_country;
                $scope[$scope.form_model]['candidates']['state'] = selected_state;
            } else if(typeof $scope[$scope.form_model]['candidate_work_details'] !== 'undefined') {
                $scope[$scope.form_model]['candidate_work_details']['city'] = selected_city;
                $scope[$scope.form_model]['candidate_work_details']['work_country'] = selected_country;
                $scope[$scope.form_model]['candidate_work_details']['work_state'] = selected_state;
            } else if(typeof $scope[$scope.form_model]['account_contacts'] !== 'undefined') {
                $scope[$scope.form_model]['account_contacts']['city'] = selected_city;
                $scope[$scope.form_model]['account_contacts']['state'] = selected_state;
                $scope[$scope.form_model]['account_contacts']['country'] = selected_country;
                $scope[$scope.form_model]['account_contacts']['postal_code'] = selected_zip;
            } else if(typeof $scope[$scope.form_model]['leads'] !== 'undefined') {
                $scope[$scope.form_model]['leads']['city'] = selected_city;
                $scope[$scope.form_model]['leads']['state'] = selected_state;
                $scope[$scope.form_model]['leads']['country'] = selected_country;
                $scope[$scope.form_model]['leads']['postal_code']= selected_zip;
            } else if(typeof $scope[$scope.form_model]['accounts'] !== 'undefined') {
                if(selected.customId == 'shipping_city') 
                {
                    custom_city = 'shipping_city';
                    custom_country = 'shipping_country';
                    custom_state = 'shipping_state';
                    custom_postal_code = 'shipping_postal_code';
                }
                else 
                {
                    custom_city = 'billing_city';
                    custom_country = 'billing_country';
                    custom_state = 'billing_state';
                    custom_postal_code = 'billing_postal_code';
                }

                $scope[$scope.form_model]['accounts'][custom_city] = selected_city;
                $scope[$scope.form_model]['accounts'][custom_country] = selected_country;
                $scope[$scope.form_model]['accounts'][custom_state] = selected_state;
                $scope[$scope.form_model]['accounts'][custom_postal_code] = selected_zip;

                delete $scope[$scope.form_model]['accounts']['zip_code'];
            } else if(typeof $scope[$scope.form_model]['users'] !== 'undefined') {
                if(selected.customId == 'user_city') 
                {
                    if(isEmpty($scope[$scope.form_model]['user_addresses']))
                    {
                        $scope[$scope.form_model]['user_addresses'] = {};
                    }
                    $scope[$scope.form_model]['user_addresses']['user_city'] = selected_city;
                    $scope[$scope.form_model]['user_addresses']['user_country'] = selected_country;
                    $scope[$scope.form_model]['user_addresses']['user_state'] = selected_state;
                    delete $scope[$scope.form_model]['user_addresses']['zip_code'];
                }          
            } else if(typeof $scope[$scope.form_model]['pool_jobs'] !== 'undefined'){
                $scope[$scope.form_model]['pool_jobs']['city'] = selected_city;
                $scope[$scope.form_model]['pool_jobs']['country'] = selected_country;

                $scope[$scope.form_model]['pool_jobs']['state'] = [];
                data = { 'id': selected_state, 'name': selected_statename };
                $scope[$scope.form_model]['pool_jobs']['state'].push(data);
            } else if(typeof $scope[$scope.form_model]['one_time_placements'] !== 'undefined'){
                $scope[$scope.form_model]['otp_work_location_details']['work_location_city'] = selected_city;
                $scope[$scope.form_model]['otp_work_location_details']['work_location_country'] = selected_country;
                $scope[$scope.form_model]['otp_work_location_details']['work_location_state'] = selected_state;
                // console.log('otp_work_location_details', $scope[$scope.form_model]['otp_work_location_details']);
            } else {
                $scope[$scope.form_model]['state'] = [];
                data = { 'id': selected_state, 'name': selected_statename };
                $scope[$scope.form_model]['state'].push(data);  
            }
        /*} 
        else 
        {
            if (typeof $scope[$scope.form_model]['assignments'] !== 'undefined')  
            {
                if(isNotEmpty($scope[$scope.form_model]['assignment_location_details']))
                {
                    $scope[$scope.form_model]['assignment_location_details']['work_location_city'] = '';
                }
            }
        }*/
        }else if(typeof selected.originalObject == 'undefined'){
            selected_city = null;
            angular.element(document.querySelector('#'+selected.customId)).value = selected_city;
            if(typeof $scope[$scope.form_model]['candidates'] !== 'undefined' && selected.customId == 'city') {
                $scope[$scope.form_model]['candidates']['city'] = selected_city;
            }
        } 
}

    $scope.remoteUrlRequestFnCustomLocation = function(str) {
        $rootScope.loading = 2;
        //$scope[$scope.form_model]['city'] = str;
        selected_country = '';
        if(typeof $scope[$scope.form_model]['candidates'] !== 'undefined') {
            selected_country = $scope[$scope.form_model]['candidates']['country'];
        }
        else if (typeof $scope[$scope.form_model]['candidate_work_details'] !== 'undefined') {
            selected_country = $scope[$scope.form_model]['candidate_work_details']['work_country'];
        }
        else if(typeof $scope[$scope.form_model]['account_contacts'] !== 'undefined') {
            selected_country =  $scope[$scope.form_model]['account_contacts']['country'];        
        }
         else if(typeof $scope[$scope.form_model]['leads'] !== 'undefined') {       
            selected_country =  $scope[$scope.form_model]['leads']['country'];
        }
        else if(typeof $scope[$scope.form_model]['jobs'] !== 'undefined') {
            selected_country =  $scope[$scope.form_model]['jobs']['country'];
        }
        else if(typeof $scope[$scope.form_model]['account_billing_addresses'] !== 'undefined') {
            selected_country =   $scope[$scope.form_model]['account_billing_addresses']['country'];
        }
        else if(typeof $scope[$scope.form_model]['account_shipping_addresses'] !== 'undefined') {
            selected_country =   $scope[$scope.form_model]['account_shipping_addresses']['country'];
        }
        else if(typeof $scope[$scope.form_model]['pool_jobs'] !== 'undefined'){
            selected_country = $scope[$scope.form_model]['pool_jobs']['country']
        }
         else if(typeof $scope[$scope.form_model]['one_time_placements'] !== 'undefined'){
            selected_country =   $scope[$scope.form_model]['otp_work_location_details']['work_location_country'] 
        }
        else if(typeof $scope[$scope.form_model]['user_addresses'] !== 'undefined') {                   
             selected_country =   $scope[$scope.form_model]['user_addresses']['user_country'];            
        }
        else if (typeof $scope[$scope.form_model]['assignment_location_details'] !== 'undefined') {
            selected_country =  $scope[$scope.form_model]['assignment_location_details']['work_location_country'];
        }
        else if (typeof $scope[$scope.form_model]['user_emergency_contacts'] !== 'undefined') {
            selected_country = $scope[$scope.form_model]['user_emergency_contacts']['emergency_country'];
        }        
        else if(typeof $scope[$scope.form_model]['account_interview_address'] !== 'undefined') {
            selected_country =   $scope[$scope.form_model]['account_interview_address']['country'];
        }          
        return isNotEmpty(selected_country)?{ q: str, country_id: selected_country }:{ q: str }
    };

     $scope.datepickers = {};
    $scope.datepicker = function($event, which) {
        $event.preventDefault();
        $scope.datepickers[which] = true;
    };

    $scope.tokenize = function(slug1, slug2) {
        var result = slug1;
        result = result.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
        result = result.replace(/-/gi, "_");
        result = result.replace(/\s/gi, "-");
        if (slug2) {
            result += '-' + $scope.token(slug2);
        }
        return result;
    };

     $scope.setMultiCheckBox = function(field, inputdata, obj) {
        //  make it as object
        if (isEmpty($scope[$scope.form_model][field.related_table])) {
            $scope[$scope.form_model][field.related_table] = {};
        }

        $scope[$scope.form_model][field.related_table][field.field_name] = {};
        var check_data = {};
        angular.forEach(obj, function(val, key) {
            check_data[val.id] = false;
        });
        $scope[$scope.form_model][field.related_table][field.field_name]['check'] = check_data;
        if (inputdata) {
            if (typeof inputdata !== "object" && !Array.isArray(inputdata)) {
                var arr = inputdata.split(',');
            } else {
                var arr = inputdata;
            }

            angular.forEach(arr, function(val, key) {
                if(typeof val === 'object' && !Array.isArray(val)){
                    $scope[$scope.form_model][field.related_table][field.field_name]['check'] = val;
                }
                else {
                $scope[$scope.form_model][field.related_table][field.field_name]['check'][val] = true;
                }
            });

        } else {

        }
    }
    
    $scope.tagsInput = function(field, inputdata) {
        if (field && inputdata) {
            if (typeof inputdata !== "object" && !Array.isArray(inputdata)) {
                var ar = inputdata.split(',');
            } else {
                var ar = inputdata;
            }

            var arrResult = [];
            var temp_arr = [];
            angular.forEach(ar, function(k, v) {
                if (ar[v].length < 70){
                    if(temp_arr.indexOf(ar[v]) === -1) {
                        temp_arr.push(ar[v]);
                        arrResult.push({ 'text': ar[v] });
                    }
                }
                else if(ar[v].hasOwnProperty('text')){
                    if(temp_arr.indexOf(ar[v]['text']) === -1) {
                        temp_arr.push(ar[v]['text']);
                        arrResult.push(ar[v]);
                    }
                }
            });

            $scope[$scope.form_model][field.related_table][field.field_name] = arrResult;
        }
    }
    $scope.tagsCitiesInput = function(field, inputdata) {
        if (inputdata) {
            if (typeof inputdata !== "object" && !Array.isArray(inputdata)) {
                var ar = inputdata.split('|');
            } else {
                var ar = inputdata;
            }

            var arrResult = [];
            angular.forEach(ar, function(k, v) {
                if (ar[v].length < 70){
                    arrResult.push({'city_state':ar[v]});
                }
                else if(ar[v].hasOwnProperty('city_state')){
                    arrResult.push(ar[v]);
                }
            });
            $scope[$scope.form_model][field.related_table][field.field_name] = arrResult;
        }
    }

    $scope.tagsMultiSearchInput = function(field, inputdata) {
        if (inputdata) {
            if (typeof inputdata !== "object" && !Array.isArray(inputdata)) {
                var ar = inputdata.split(',');
            } else {
                var ar = inputdata;
            }

            var field_options = [];
            if(isNotEmpty(field.options)) {
                angular.forEach(field.options,function(v, k)
                {
                    field_options[v.id]= v;
                });
            }
            
            var arrResult = [];
            angular.forEach(ar, function(v, k) {
                if(isNotEmpty(field_options[v])) {
                    arrResult.push(field_options[v]);
                }
            });
            $scope[$scope.form_model][field.related_table][field.field_name] = arrResult;
        }
    }

    $scope.checkTagCount = function(field, maxCount=10){

        // Don't use this ternary type of syntax some browser not supported.. 
        // var list = $scope[$scope.form_model][field.related_table][field.field_name] ?? [];
        var list = [];
        if(isNotEmpty($scope[$scope.form_model][field.related_table]) && isNotEmpty($scope[$scope.form_model][field.related_table][field.field_name]))
        {
            list = $scope[$scope.form_model][field.related_table][field.field_name];
        }
      return maxCount > list.length;
    }
    $scope.tagChanged = function(tag, field){    

       
        // var tagCount = $scope.checkTagCount(field);
         if(isNotEmpty(tag.state_id)){             
            if(isEmpty($scope[$scope.form_model][field.related_table]['country'])){
                $scope[$scope.form_model][field.related_table]['country'] = tag.country_id;
            }

            var arrResult = [];
                if(isNotEmpty($scope[$scope.form_model][field.related_table]['state']))
                {
                    arrResult = $scope[$scope.form_model][field.related_table]['state'].filter((state) => { return state.id;});
                }
                arrResult.push({id:tag.state_id, name:tag.statename, country_id:tag.country_id});
                arrResult = arrResult.filter(function(value, index){ return arrResult.findIndex((val) => {return val.id == value.id ;}) == index });

            $scope[$scope.form_model][field.related_table]['state'] = isEmpty(arrResult) ?  [{'name': 'Select','id': ''}] : arrResult;
        }   
        // return tagCount;
    }

    $scope.tagRemoved = function(tag, field){
      
        var code = tag.city_state.split(', ');
        if(code.length > 1){
            var selectedCode = code[1].trim();
            var stateCount = $scope[$scope.form_model][field.related_table][field.field_name].filter((val) => {var scode = val.city_state.split(', ');
             return scode.length > 1 ? (scode[1].toLowerCase().indexOf(selectedCode.toLowerCase()) != -1) : false;});
             if(isEmpty(stateCount)){
                var state_id = $filter('getStateIdWithCode')(selectedCode);
                state_id = state_id.split(', ');
                var stateList = $scope[$scope.form_model][field.related_table]['state'];
                $scope[$scope.form_model][field.related_table]['state'] = stateList.filter((state) => {return !state_id.includes(state.id.toString());});
             }
        }
    }

    $scope.GetSelectedCountry = function(country_id, modal_inst) {
        if (country_id) {
            $http({
                method: "post",
                url: ROOT_URL + "getStates/" + country_id,
            }).then(function(success) {
                $scope.map_options[modal_inst] = success.data;
            }, function(error) {

            });
        }
    };

    $scope.setDateFormat = function(field, inputdata) {
        return setDateFormatFunc(field, inputdata, $scope);
    }

    $scope.SetPrefixData = function(field) 
    {
        var prefixData = field.PrefixData;

        if(typeof prefixData == 'undefined')
            return true;

        if(typeof $scope[$scope.form_model][field.related_table] == 'undefined') 
            $scope[$scope.form_model][field.related_table] = {};


        if(!$scope[$scope.form_model][field.related_table][field.field_name]) 
        {
            $scope[$scope.form_model][field.related_table][field.field_name] = prefixData.prefix+' '+prefixData.start_number;
            $scope[$scope.form_model][field.related_table]['pre_stat_number'] = prefixData.start_number;
        }
    }


    $scope.SetEmpPrefixData = function() 
    {
        var emp_type = $scope[$scope.form_model]['users']['employment_type'];
        if($scope.id) {
            return true;
        }
        if(isEmpty(emp_type)) {
            emp_type = 'fulltime';
        }

        prefixData = $scope.emp_type_codes[emp_type];
        if(isEmpty(prefixData)) {
            emp_type = 'fulltime';
            $scope[$scope.form_model]['users']['employment_type'] = emp_type;
            prefixData = $scope.emp_type_codes[emp_type];
        }
        $scope[$scope.form_model]['users']['code'] = prefixData.prefix+' '+prefixData.start_number;
        $scope[$scope.form_model]['users']['pre_stat_number'] = prefixData.start_number;
        
    }

    if(isNotEmpty($scope.emp_type_codes) && isNotEmpty($scope[$scope.form_model]['users'])) {
        $scope.SetEmpPrefixData();
    }


    $scope.multipleStrInputGroup = function(field, inputdata, obj) {
        if (inputdata) {

            inputdata=inputdata.toString();
            
            var arr = inputdata.split(',');
            // console.log(arr);
            
            var arrResult = [];
            angular.forEach(arr, function(k, v) {
                angular.forEach(obj, function(objkey, objindex) {
                    if (isNotEmpty(arr[v]) && arr[v] == obj[objindex]['id']) {
                        console.log(arr[v]);
                        arrResult.push({order: obj[objindex]['order'],'category_name': obj[objindex]['category_name'],'id': arr[v], 'name': obj[objindex]['name'] });
                    }
                });
            });
            if (typeof field.related_table != 'undefined' && field.related_table != '')
                $scope[$scope.form_model][field.related_table][field.field_name] = arrResult;
            else
                $scope[$scope.form_model][field.field_name] = arrResult;

        }
    }

    $scope.multipleStrInput = function(field, inputdata, obj) {
        if (inputdata) {

            inputdata=inputdata.toString();
            
            var arr = inputdata.split(',');
            var arrResult = [];
            angular.forEach(arr, function(k, v) {
                angular.forEach(obj, function(objkey, objindex) {
                    if (isNotEmpty(arr[v]) && arr[v] == obj[objindex]['id']) {
                        arrResult.push({ 'id': arr[v], 'name': obj[objindex]['name'] });
                    }
                });
            });
            if (typeof field.related_table != 'undefined' && field.related_table != '')
                $scope[$scope.form_model][field.related_table][field.field_name] = arrResult;
            else
                $scope[$scope.form_model][field.field_name] = arrResult;
        }
    }

    $scope.rangeInput = function(field,inputdata){
        if (!isEmpty(inputdata)) {
                var inputMin = 0;
                var inputMax = 0;
            if (/\-/g.test(inputdata)) {
                inputdata = inputdata.split('-');
                //inputMin = JSON.parse(inputdata[0]);
                //inputMax = JSON.parse(inputdata[1]);
                if(isEmpty(inputdata[0])) {
                    inputMin = 0;
                } else {
                    inputMin = parseFloat(inputdata[0]);
                }
                if(isEmpty(inputdata[1])) {
                    inputMax = 0;
                } else {
                    inputMax = parseFloat(inputdata[1]);
                }
            } else {
                //inputMin = 0;
                //inputMax = JSON.parse(inputdata);
                if(typeof inputdata == 'object'){
                    inputMin = parseFloat(inputdata['min']);
                    inputMax = parseFloat(inputdata['max']);
                }
                else{
                    inputMin = inputMax = parseFloat(inputdata);
                }
            }
            if(isNotEmpty($scope[$scope.form_model][field.related_table])){
                $scope[$scope.form_model][field.related_table][field.field_name] = {};
                $scope[$scope.form_model][field.related_table][field.field_name] = { 'min':inputMin, 'max':inputMax };
            }else{
                angular.forEach($scope[$scope.form_model], function(v,k){
                    if(!isNaN(k) && isNotEmpty($scope[$scope.form_model][k][field.related_table]))
                    {
                        $scope[$scope.form_model][k][field.related_table][field.field_name] = {};
                        $scope[$scope.form_model][k][field.related_table][field.field_name] = { 'min':inputMin, 'max':inputMax };
                    }
                });
            }
        }else{
            if(isEmpty($scope[$scope.form_model][field.related_table]))
            {
                $scope[$scope.form_model][field.related_table] = {};
            }

            $scope[$scope.form_model][field.related_table][field.field_name] = {};
            $scope[$scope.form_model][field.related_table][field.field_name] = { 'min':0, 'max':0 };
        }
    }

     $scope.multipleInput = function(field, inputdata, obj, static_field_name, index) {
        if (field.field_type == 'account' || field.field_type == 'account_contact')
            return;
        if ((angular.isArray(inputdata) || angular.isObject(inputdata)) && 
            (field.field_name != 'includable_days_for_billing')) {
            return;
        }

        if(field.map_table == 'CnfKeywordOption')
        {
            var keyboardOptions = [];
            angular.forEach(obj, function(objkey, objindex) {
                objdata = {};
                objdata['id'] = objkey['id'];
                objdata['name'] = objkey['name'];
                keyboardOptions.push(objdata)
            });
            field.options = keyboardOptions;
                
        }

        
        if (inputdata) {
            // console.log(inputdata);
            // console.log(field.field_name);
            // console.log(obj);

            if (typeof inputdata !== "object" && !Array.isArray(inputdata)) {
                inputdata=inputdata.toString();
                var arr = inputdata.split(',');
            } else {
                var arr = inputdata;
            }

            var arrResult = [];
            // console.log(arr, obj);
            angular.forEach(arr, function(k, v) {
                angular.forEach(obj, function(objkey, objindex) {
                    /* https://oorwin.atlassian.net/browse/OOR-16468
                    if(field["field_name"] == "assignment_title_id") {
                        objkey.name = $filter('limitTo')(objkey.name, 10) + (objkey.name.length > 10 ? '...' : '');
                    }*/

                    if (arr[v] == obj[objindex]['id']) {
                        objdata = {};
                        if (isNaN(arr[v]))
                            objdata['id'] = arr[v];
                        else
                            objdata['id'] = parseInt(arr[v]);

                            objdata['name'] = obj[objindex]['name'];
                        if(typeof objkey['country_id'] !='undefined' && isNotEmpty(objkey['country_id'])) {
                                objdata['country_id'] =  objkey['country_id'];                          
                        }    
                        
                        arrResult.push(objdata)
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
    $scope.loadTechnicalSkills = function ($query) {
        /*return $http.get(ROOT_URL + 'assets/js/technical_skills.json', { cache: true }).then(function (response) {
            var technical_skills = response.data;
            return technical_skills.filter(function (skill) {
                return skill.text.toLowerCase().indexOf($query.toLowerCase()) != -1;
            });
        });*/

        return $http.get(ROOT_URL + 'assets/js/technical_skills.json', { cache: true }).then(function (response) {
            var technical_skills = response.data;
            technical_skills_arr = technical_skills.filter(function (skill) {
                skill_text = skill.text.toLowerCase();
                return skill_text.startsWith($query.toLowerCase())?true:false;
            });
            
            if(isEmpty(technical_skills_arr)) {
                return technical_skills.filter(function (skill) {
                    return skill.text.toLowerCase().indexOf($query.toLowerCase()) != -1;
                });
            }
            return technical_skills_arr;
        });
    };

    $scope.show_assignment_so_fields = false;
    $scope.showAssignmentSOFields = function() {
        $scope.show_assignment_so_fields = false;
        if(isNotEmpty($scope.form_model) && isNotEmpty($scope[$scope.form_model].assignments) && isNotEmpty($scope[$scope.form_model].assignments.placement_type)) {
            if(isNotEmpty($scope.assignment_salesorder_settings) && isNotEmpty($scope.assignment_salesorder_settings['salesorder_mandatory']) && isNotEmpty($scope.assignment_salesorder_settings['placement_type'])) {
                var so_placement_type_arr = $scope.assignment_salesorder_settings['placement_type'];
                if(so_placement_type_arr.includes($scope[$scope.form_model].assignments.placement_type)) {
                    $scope.show_assignment_so_fields = true;
                }
            }
        }
    }
    if(isNotEmpty($scope.form_model) && $scope.form_model=='billableAssignment') {
        $scope.showAssignmentSOFields();
    }
    
    $scope.hideHirngTypeEffectiveFields = function() {
        $scope.isHiringTypeNonBillable = 0;
        if (isNotEmpty($scope[$scope.form_model].assignments) && 
            isNotEmpty($scope[$scope.form_model]['assignments']['hiring_type']) && 
            ($scope[$scope.form_model]['assignments']['hiring_type'] == 'non_billable'))
        {
            $scope.isHiringTypeNonBillable = 1;
            HrApiServices.get('internalProjectList').then(function(response){
                angular.forEach($scope.sectionsFields.find(x => x.name === 'Assignment Details').cnf_form_field, function(field){
                    if(field.field_name === 'project_id'){
                        field.options = response.data
                    }
                })
            })

            // set validations null
            // console.log($scope[$scope.form_name]['form']);
            // $scope[$scope.form_model]['assignments']['client_id']['id'] = 0;
            // $scope[$scope.form_name]['form']['client_id'].$valid = true;
            // $scope[$scope.form_name]['form']['bill_rate'].$valid = true;
            // $scope[$scope.form_name]['form']['invoice_terms'].$valid = true;

            if (isNotEmpty($scope[$scope.form_model].assignment_timesheet_information) && isNotEmpty($scope[$scope.form_model].assignment_timesheet_information.restrict_time_entries)) {
                $scope.billableAssignment.assignment_timesheet_information.restrict_time_entries.validate_hours_byweek = 0;
                $scope.billableAssignment.assignment_timesheet_information.restrict_time_entries.validate_hours_byweek_hours = '';
            }
        }
        else {
            // console.log($scope[$scope.form_name]['form']);
            $scope.isHiringTypeNonBillable = 0;
            if (isNotEmpty($scope[$scope.form_model]['assignments']) && $scope[$scope.form_model]['assignments']['client_id'] == 0) 
            {
                $scope[$scope.form_model]['assignments']['client_id'] = null;
            }
            
            // $scope[$scope.form_name]['form']['client_id'].$valid = false;
            // $scope[$scope.form_name]['form']['bill_rate'].$valid = false;
            // $scope[$scope.form_name]['form']['invoice_terms'].$valid = false;
            
            if (isNotEmpty($scope[$scope.form_model].assignment_timesheet_information) && isNotEmpty($scope[$scope.form_model].assignment_timesheet_information.restrict_time_entries)) {
                if(isEmpty($scope[$scope.form_model]['assignments']['id'])) {
                    $scope.billableAssignment.assignment_timesheet_information.restrict_time_entries.validate_hours_byweek = 1;        
                }
            }
        }
            // console.log('form', $scope.isHiringTypeNonBillable, $scope[$scope.form_model]['assignments'], $scope[$scope.form_name]['form']);
    }
    
    $scope.hideFrequencyStartDate = function() {
        $scope.isHiddenField = 1;
        if (isNotEmpty($scope[$scope.form_model]) && 
            isNotEmpty($scope[$scope.form_model].assignment_invoice_information) && 
            isNotEmpty($scope[$scope.form_model]['assignment_invoice_information']['invoice_cycle']) && 
            ($scope[$scope.form_model]['assignment_invoice_information']['invoice_cycle'] == 'weekly' || 
            $scope[$scope.form_model]['assignment_invoice_information']['invoice_cycle'] == 'bi_weekly' || 
            $scope[$scope.form_model]['assignment_invoice_information']['invoice_cycle'] == 'four_weeks' )
        ) {
            $scope.isHiddenField = 0;
        }
    }
    // calling by default to check and hide field
    $scope.hideFrequencyStartDate();

    $scope.changeBasePayCycleEvent = function() {
        // if (isNotEmpty($scope[$scope.form_model]) && 
        //     isNotEmpty($scope[$scope.form_model].employee_payment_revises) && 
        //     isNotEmpty($scope[$scope.form_model]['employee_payment_revises']['salary_cycle']) 
        //     && (typeof $scope[$scope.form_model]['employee_payment_revises']['base_pay_cycle'] == 'undefined')
        // ) {
        //     $scope[$scope.form_model]['employee_payment_revises']['base_pay_cycle'] = $scope[$scope.form_model]['employee_payment_revises']['salary_cycle'];
        // }

        if (isNotEmpty($scope[$scope.form_model]) && 
            isNotEmpty($scope[$scope.form_model].employee_payment_revises) && 
            isNotEmpty($scope[$scope.form_model]['employee_payment_revises']['salary_cycle']) 
        ) {
            $scope[$scope.form_model]['employee_payment_revises']['base_line_pay_cycle'] = $scope[$scope.form_model]['employee_payment_revises']['salary_cycle'];
        }

        angular.forEach($scope[$scope.form_model], function(val, key)
        {
            if(key != 'employee_payment_revises'){
                if(val.hasOwnProperty("employee_payment_deductions")){
                    $scope[$scope.form_model][key]['employee_payment_deductions']['deduction_cycle'] = $scope[$scope.form_model]['employee_payment_revises']['salary_cycle']
                }
                // if(val.hasOwnProperty("employee_payment_bonuses")){
                //     $scope[$scope.form_model][key]['employee_payment_bonuses']['bonus_cycle'] = $scope[$scope.form_model]['employee_payment_revises']['salary_cycle']
                // }
            }
        });
    }

    $scope.calculatePaymentDeductionAmount = function () {
        angular.forEach($scope[$scope.form_model], function(val, key)
        {
            if(key != 'employee_payment_revises'){
                if(val.hasOwnProperty("employee_payment_deductions")){
                    if(isNotEmpty(val['employee_payment_deductions']['deduction_type']) && isNotEmpty(val['employee_payment_deductions']['percentage_amount']))
                    {
                        if (val['employee_payment_deductions']['deduction_type'] == 'percentage') {
                            $scope[$scope.form_model][key]['employee_payment_deductions']['deduction_amount'] = roundToFixedDecimals(($scope[$scope.form_model]['employee_payment_revises']['salary']/100)*val['employee_payment_deductions']['percentage_amount']);
                        } else {
                            $scope[$scope.form_model][key]['employee_payment_deductions']['deduction_amount'] = val['employee_payment_deductions']['percentage_amount'];
                        }
                    }
                    else if (isEmpty(val['employee_payment_deductions']['percentage_amount'])) {
                       $scope[$scope.form_model][key]['employee_payment_deductions']['deduction_amount'] = ''; 
                    } else {
                       $scope[$scope.form_model][key]['employee_payment_deductions']['deduction_amount'] = val['employee_payment_deductions']['percentage_amount']; 
                    }
                }
            }
        });
    }

    $scope.changeLeavePlan = function () {
        if(isEmpty($scope[$scope.form_model]['users']['id'])) {
            return false;
        }
        $scope[$scope.form_model]['leave_plan_update'] = {};
        if(isNotEmpty($scope[$scope.form_model]['users']['leave_plan_id'])) {
            var selected_leave_plan = $scope[$scope.form_model]['users']['leave_plan_id'];
            
            post_url = 'admin/leaves/get_employee_leaves';
            employee_ids = [$scope[$scope.form_model]['users']['id']];
            HrApiServices.post(post_url, {'employee_ids':employee_ids}, true).then(function success(response) {
                if(response.data.status) {
                    if(response.data.data.leave_plan_details.plan_id != selected_leave_plan[0]['id']) {
                        $uibModal.open({
                            animation: true,
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'assignEmployeePopUp.html',
                            controller: 'assignEmployeeInstanceCtrl',
                            size:'xl modal-dialog-aside',
                            windowClass: 'fixed-right',
                            resolve: {
                                items: function () {
                                    return { 
                                        current_plan_name: response.data.data.leave_plan_details.plan_name ? response.data.data.leave_plan_details.plan_name : 'Not Assigned',
                                        employee_ids: employee_ids,
                                        plans_list: response.data.data.active_plans_list,
                                        update_column: 'leave_plan_id',
                                        label_name: 'Leave Plan',
                                        activeIndex: 3,
                                        emp_leave_plan_details : response.data.data.leave_plan_details,
                                        from_emp_form : true,
                                        selected_leave_plan : selected_leave_plan
                                    };
                                }
                            }
                        }).result.then(function (success_data) {
                            if(isEmpty(success_data.new_plan)) {
                                $scope[$scope.form_model]['users']['leave_plan_id'] = [{'id':response.data.data.leave_plan_details.plan_id, 'name':response.data.data.leave_plan_details.plan_name}];
                            } else {
                                $scope[$scope.form_model]['leave_plan_update'] = success_data;
                            }
                        }, function () {
                            // cancel...
                            $scope[$scope.form_model]['users']['leave_plan_id'] = [{'id':response.data.data.leave_plan_details.plan_id, 'name':response.data.data.leave_plan_details.plan_name}];
                        });
                    }
                } else {
                    if(isNotEmpty(response.data.data.leave_plan_details.plan_id)) {
                        $scope[$scope.form_model]['users']['leave_plan_id'] = [{'id':response.data.data.leave_plan_details.plan_id, 'name':response.data.data.leave_plan_details.plan_name}];
                    } else {
                        $scope[$scope.form_model]['users']['leave_plan_id'] = [];
                    }
                    showAlertMessage(response.data);
                }
            });
        }
    }

    $scope.getRoleResponsibilities  = function(){
        if(isNotEmpty($scope[$scope.form_model]['users']['employee_designation'])){
            if($scope.rolesResponsibilities && isNotEmpty($scope.additional_data_employee['roledescriptions'])){
                $scope[$scope.form_model]['users']['roles_responsibilities'] = isNotEmpty($scope.additional_data_employee['roledescriptions'][$scope[$scope.form_model]['users']['employee_designation'][0]['id']])?$scope.additional_data_employee['roledescriptions'][$scope[$scope.form_model]['users']['employee_designation'][0]['id']]:'';
            }
        }else{
            $scope.rolesResponsibilities = true;
        }
    }

    $scope.loadSearchList = function ($query, Obj, field) {
        record_id = '';
        if(isNotEmpty(Obj.id)) record_id = Obj.id;
        return $http.get(WEB_API_URL + 'integration/getSearchList', { params: { q: $query, field: {'map_table':field.map_table}, record_id : record_id }}).then(function (response) {
            var search_list = response.data.data.items;
            return search_list;
        });
    };

    $scope.loadCitiesList = function ($query, Obj, field, isMulti=1) {
        var selected_country = !isEmpty(Obj) ? Obj['country'] : 0;
        var country_id = $rootScope.masterLayout['company_settings']['country_id'];
        return $http.get(WEB_API_URL + 'integration/getLocation/1/' + country_id, { params: { q: $query, isMulti: isMulti, country_id:selected_country } }).then(function (response) {
            var cities_list = response.data.data.items;
            return cities_list.filter(function (cities) {
                return cities.city_state.toLowerCase().indexOf($query.toLowerCase()) != -1;
            });
        });
    };

    $scope.loadStatesList = function ($query, Obj) {
        var selected_country = Obj['country'];
        var country_id = isEmpty(selected_country) ? 0 : selected_country;
        return $http.get(WEB_API_URL + 'integration/getStateLocation/'+ country_id, { params: { q: $query, isMulti: 1 } }).then(function (response) {
            var states_list = response.data.data.items;
            return states_list.filter(function (states) {
                return states.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
            });
        });
    };

    $scope.calculateInvoicingDate = function () {
        if (isNotEmpty($scope[$scope.form_model]['one_time_placements']) && 
            isEmpty($scope[$scope.form_model]['one_time_placements']['client_hire_date']))
        {
            // set bill date to empty
            $scope[$scope.form_model]['otp_billing_details']['bill_date'] = "";
            $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = "";
            $scope[$scope.form_name]['form']['bill_date'].$invalid = true;
            $scope[$scope.form_name]['form']['client_hire_date'].$invalid = true;
            return showAlertMessage({status : 0, message: 'Please select Client Hire Date, than set Bill Date.'});
        }

        if (isNotEmpty($scope[$scope.form_model]['otp_billing_details']) && 
            isNotEmpty($scope[$scope.form_model]['otp_billing_details']['bill_date']))
        {
            var client_hire_date = new Date($scope[$scope.form_model]['one_time_placements']['client_hire_date']);
            var bill_date = new Date($scope[$scope.form_model]['otp_billing_details']['bill_date']);
            if (bill_date < client_hire_date) {
                $scope[$scope.form_model]['otp_billing_details']['bill_date'] = "";
                $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = "";
                $scope[$scope.form_name]['form']['bill_date'].$invalid = true;
                return showAlertMessage({status: 0, message: 'Bill Date should not earlier than Client Hire Date.'});
            }

            // Include hire date (add 1 day as per BA)
            var total_days = 1 + (bill_date - client_hire_date) / (86400000);
            $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = Math.round(total_days);
        }
    }

    $scope.calculateBillDate = function () {
        if (isNotEmpty($scope[$scope.form_model]['one_time_placements']) && 
            isEmpty($scope[$scope.form_model]['one_time_placements']['client_hire_date']))
        {
            // set invoicing date to empty and show error msg
            $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = "";
            $scope[$scope.form_name]['form']['invoicing_date'].$invalid = true;
            $scope[$scope.form_name]['form']['client_hire_date'].$invalid = true;
            return showAlertMessage({status : 0, message: 'Please select Client Hire Date, than set Invoicing Date.'});
        }

        if (isNotEmpty($scope[$scope.form_model]['otp_billing_details']) && 
            isNotEmpty($scope[$scope.form_model]['otp_billing_details']['invoicing_date']))
        {
            var client_hire_date = new Date($scope[$scope.form_model]['one_time_placements']['client_hire_date']);
            var invoicing_date_days = $scope[$scope.form_model]['otp_billing_details']['invoicing_date'];
            var bill_date =  new Date(client_hire_date.getTime() + (invoicing_date_days) * (86400000));
            if (bill_date < client_hire_date) {
                $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = "";
                $scope[$scope.form_name]['form']['invoicing_date'].$invalid = true;
                return showAlertMessage({status: 0, message: 'Bill Date should not earlier than Client Hire Date.'});
            }

            $scope[$scope.form_model]['otp_billing_details']['bill_date'] =  bill_date;
        }
    }

    $scope.calculateInvoicingDatePopUp = function () {
        if (isNotEmpty($scope[$scope.form_model]['one_time_placements']) && 
            isNotEmpty($scope[$scope.form_model]['one_time_placements']['client_hire_date']) &&
            isNotEmpty($scope[$scope.form_model]['otp_billing_details']) && 
            isNotEmpty($scope[$scope.form_model]['otp_billing_details']['bill_date'])
        ) {
            ConfirmAlert.swal({
                title: "Please check.",
                text: "Changing Client Hire Date will effect Bill Date.",
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
            }, function(isConfirm) { 
                if (isConfirm) {
                    //calculate invoicing date
                    if (isNotEmpty($scope[$scope.form_model]['otp_billing_details']) && 
                        isNotEmpty($scope[$scope.form_model]['otp_billing_details']['bill_date'])
                    ) {
                        var client_hire_date = new Date($scope[$scope.form_model]['one_time_placements']['client_hire_date']);
                        var bill_date = new Date($scope[$scope.form_model]['otp_billing_details']['bill_date']);
                        if (bill_date < client_hire_date) {
                            // make it empty, bc'z negative days are not dipayed in field
                            $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = '';
                            return showAlertMessage({status: 0, message: 'Bill Date should not earlier than Client Hire Date.'});
                        }

                        // Include hire date (add 1 day as per BA)
                        var total_days = 1 + (bill_date - client_hire_date) / (86400000);
                        $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = Math.round(total_days);
                    } 
                } else {
                    // reset client hire date
                    $scope[$scope.form_model]['one_time_placements']['client_hire_date'] = new Date($scope.copyOfOTP['one_time_placements']['client_hire_date']);
                }
            });
            
        }

        // calculate bill date based on invoicing_date (days)
        if (isNotEmpty($scope[$scope.form_model]['one_time_placements']) && 
            isNotEmpty($scope[$scope.form_model]['one_time_placements']['client_hire_date']) &&
            isNotEmpty($scope[$scope.form_model]['otp_billing_details']) && 
            (typeof $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] != 'undefined') &&
            ($scope[$scope.form_model]['otp_billing_details']['invoicing_date'] != null) &&
            isEmpty($scope[$scope.form_model]['otp_billing_details']['bill_date'])
        ) {
            var client_hire_date = new Date($scope[$scope.form_model]['one_time_placements']['client_hire_date']);
            var invoicing_days = $scope[$scope.form_model]['otp_billing_details']['invoicing_date'];
            var bill_date =  new Date(client_hire_date.getTime() + (invoicing_days) * (86400000));
            if (bill_date < client_hire_date) {
                $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = "";
                $scope[$scope.form_name]['form']['invoicing_date'].$invalid = true;
                return showAlertMessage({status: 0, message: 'Bill Date should not earlier than Client Hire Date.'});
            }
            $scope[$scope.form_model]['otp_billing_details']['bill_date'] =  bill_date;
            
            // Include hire date (add 1 day as per BA)
            if (isEmpty($scope[$scope.form_model]['otp_billing_details']['invoicing_date'])) {
                var total_days = 1 + (bill_date - client_hire_date) / (86400000);
                $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = Math.round(total_days);
            }
        }
    }
    
    $scope.calculateInvoiceAmount = function () {
        if (isNotEmpty($scope[$scope.form_model]['otp_billing_details']) &&
            isNotEmpty($scope[$scope.form_model]['otp_billing_details']['ctc_per_year']) &&
            isNotEmpty($scope[$scope.form_model]['otp_billing_details']['placement_bill_type']) && 
            isNotEmpty($scope[$scope.form_model]['otp_billing_details']['placement_bill_value'])
        ) {
            //calculate invoice amount
            if ($scope[$scope.form_model]['otp_billing_details']['placement_bill_type'] == 'percentage') {
                $scope[$scope.form_model]['otp_billing_details']['invoice_amount'] = roundToFixedDecimals(($scope[$scope.form_model]['otp_billing_details']['ctc_per_year']/100)*$scope[$scope.form_model]['otp_billing_details']['placement_bill_value']);
            } else {
                $scope[$scope.form_model]['otp_billing_details']['invoice_amount'] = $scope[$scope.form_model]['otp_billing_details']['placement_bill_value'];
            }
        } else if (isEmpty($scope[$scope.form_model]['otp_billing_details']['placement_bill_type'])) {
           $scope[$scope.form_model]['otp_billing_details']['invoice_amount'] = ''; 
        } else {
           $scope[$scope.form_model]['otp_billing_details']['invoice_amount'] = $scope[$scope.form_model]['otp_billing_details']['placement_bill_value']; 
        }
    }

    $scope.checkInAccountInvoiceSlabs = function() {

        if(typeof $scope[$scope.form_model]['one_time_placements'] !== 'undefined') {

            if ($scope[$scope.form_model]['otp_billing_details']['enable_invoice_slabs'] == 1 
                && isNotEmpty($scope[$scope.form_model]['otp_billing_details']['ctc_per_year'])) {

                var payloadObj = {"account_id" : $scope[$scope.form_model]['one_time_placements']['client_id']};
                payloadObj['ctc_per_year'] = $scope[$scope.form_model]['otp_billing_details']['ctc_per_year'];

                HrApiServices.get('accounts/getAccountInvoiceSlab',payloadObj,true).then(function success(response) {

                    if (response.data.status == 1) {

                        var accountInvoiceSlab = response.data.data.invoiceSlab;

                        $scope[$scope.form_model]['otp_invoice_information']['invoice_terms'] = accountInvoiceSlab['invoice_terms_id'];
                        $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = accountInvoiceSlab['invoice_days'];
                        $scope[$scope.form_model]['otp_billing_details']['placement_bill_type'] = accountInvoiceSlab['placement_bill_type'];
                        
                        if(isNotEmpty(accountInvoiceSlab['placement_bill_value'])) {
                            $scope[$scope.form_model]['otp_billing_details']['placement_bill_value'] = roundToFixedDecimals(accountInvoiceSlab['placement_bill_value']);
                            $scope[$scope.form_model]['otp_billing_details']['invoice_amount'] = roundToFixedDecimals(accountInvoiceSlab['placement_bill_value']);
                        }

                        $scope.calculateInvoiceAmount();
                    } 
                    else {

                        HrApiServices.get('accounts/getAccountInvoiceInformation',{'account_id':payloadObj['account_id']},true).then(function success(response)
                        {
                           var account_otp_invoice_information = response.data.data.account_invoice_information;
                           $scope[$scope.form_model]['otp_invoice_information']['invoice_terms'] = account_otp_invoice_information['invoice_terms'];
                           $scope[$scope.form_model]['otp_billing_details']['invoicing_date'] = account_otp_invoice_information['otp_invoicing_days'];
                           $scope[$scope.form_model]['otp_billing_details']['placement_bill_type'] = account_otp_invoice_information['placement_type'];

                            if(isNotEmpty(account_otp_invoice_information['placement_value'])) {
                                $scope[$scope.form_model]['otp_billing_details']['placement_bill_value'] = roundToFixedDecimals(account_otp_invoice_information['placement_value']);
                                $scope[$scope.form_model]['otp_billing_details']['invoice_amount'] = roundToFixedDecimals(account_otp_invoice_information['placement_value']);
                            }
                        });

                        $scope.calculateInvoiceAmount();
                    }
                });    
            }
        }
    }
    
    $scope.loadLanguagesList = function ($query) {
        return $http.get(WEB_API_URL + 'integration/getLanguages', { params: { q: $query } }).then(function (response) {
            var lang_list = response.data.data.items;
            return lang_list.filter(function (langs) {
                return langs.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
            }).map(function (lang){ return {'text': lang.name};});
        });
    };

    $scope.loadCustomAutoList = function ($query,list_items) {
            return list_items.filter(function (items) {
                return items.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
            }).map(function (item){ return {'text': item.name};});
        
    };

    
    $scope.numberSelectInput = function(field,inputdata){
        if (!isEmpty(inputdata)) {
                var inputNum = '';
                var inputType = '';
            if (/\s/g.test(inputdata)) {
                inputdata = inputdata.split(' ');
                if(isEmpty(inputdata[0])) {
                    inputNum = 0;
                } else {
                    inputNum = parseFloat(inputdata[0]);
                }
                if(isEmpty(inputdata[1])) {
                    inputType = '';
                } else {
                    inputType = inputdata[1];
                }
            } else {
                if(typeof inputdata == 'object'){
                    inputNum = parseFloat(inputdata['number']);
                    inputType = inputdata['type'];
                }
                else{
                    inputNum = inputType = inputdata;
                }
            }
            $scope[$scope.form_model][field.related_table][field.field_name] = {};
            $scope[$scope.form_model][field.related_table][field.field_name] = { 'number':inputNum, 'type':inputType };
        }else{
            if(typeof $scope[$scope.form_model][field.related_table] !== 'undefined') {
                $scope[$scope.form_model][field.related_table][field.field_name] = {};
                $scope[$scope.form_model][field.related_table][field.field_name] = { 'number':0, 'type':'' };
            }
        }
    }

    //
    $scope.addModuleTaskPopup = function (task_id, from_calendar=0) {
        // if (!task_id) {
        // console.log("category", $scope.module_specific_category);//return;
        //create task 
        // console.log("candidte id",$scope.candidateId);
        // console.log("from_calendar",from_calendar);
        $rootScope.from_calendar = false;
        if (isNotEmpty(from_calendar)) {
            $rootScope.from_calendar = true;
        }
        var postData = {};
        postData.task_category_id = $scope.module_specific_category.id;

        postData['module_id'] = $scope.module_id;

        if (typeof $scope.FromPopup == 'undefined') {
            postData['FromPopup'] = 0;
        } else {
            postData['FromPopup'] = 1;
            postData['candidateId'] = $scope.candidateId;
        }

        if ($scope.module_id == 1) {
            postData['job_id'] = $scope.id;
        } else if ($scope.module_id == 2 || $scope.module_id == 3 ) {
            postData['FromPopup'] = 1;
            postData['candidateId'] = $scope.id;
        }

        if (isNotEmpty($scope.candidateId))
            postData['candidateId'] = $scope.candidateId;

        postData['module_record_id'] = $scope.id;
        $action_url = 'task_categories/tasks/create';
        if (task_id) {
            postData['task_id'] = task_id;
            $action_url = 'task_categories/tasks/edit';
        }
        
        HrApiServices.post($action_url, postData, true)
        .then(function success(response) {
            // console.log("response", response);//return;
            //return;
            $scope.openModuleTaskPopup(response.data.data);
        });
    }

    $scope.openModuleTaskPopup = function (obj) {
        $uibModal.open({
             animation: true,
             ariaLabelledBy: 'modal-title',
             ariaDescribedBy: 'modal-body',
             templateUrl: 'addTaskPopup.html',
             controller: 'ModuleTaskInstanceCtrl',
             size: 'lg modal-dialog-aside',
             scope:$scope,
             resolve: {
                  items: function() {
                    /* if ($scope.module_id == 4) {
                         return { 'task_record_id': enc_id, 'task_category_id': $scope.module_specific_category.id};
                    } else {
                         return { 'task_record_id': enc_id};
                    } */
                    return obj;
                 },
             }
        }).result.then(function(selectedItem) {
            if (isNotEmpty(selectedItem)){
                $rootScope.interview_task_data = selectedItem;
                // console.log("task data",$rootScope.interview_task_data);
            }
        }, function() {
             //on cancel button press
        });
    };

    $scope.get_task_account_contacts = function (record_id) {
        $scope.account_contacts = {};
        var url = 'accounts/getAccountName?id='+record_id;
        HrApiServices.get(url,{},true)
            .then(function success(response) {
               $scope.account_contacts = response.data.data.contacts;
            });
    };

    $scope.get_task_job_info = function (record_id) {
        $scope.account_contacts = {};
        var url = 'task_categories/get_job_client/'+record_id;
        HrApiServices.get(url,{},true)
            .then(function success(response) {
                // console.log("response", response);
                if (response.data.status) {
                    $scope.job_client_id = response.data.data.job_client_id;
                    $scope.account_contacts = response.data.data.job_account_contacts;
                }
            });
    };

    $scope.get_task_candidate_info = function (record_id) {

        var postData = {};
        if (typeof $scope.FromPopup == 'undefined') {
            postData['FromPopup'] = 0;
        } else {
            postData['FromPopup'] = 1;
            postData['candidateId'] = record_id;
        }

        if ($scope.selected_module == 'candidates' || $scope.selected_module == 'resource_pool') {
            postData['FromPopup'] = 1;
            postData['candidateId'] = record_id;
        }
        // postData['record_id'] = record_id;

        $scope.account_contacts = {};
        var url = 'task_categories/get_candidate_info';
        HrApiServices.post(url,postData,true)
            .then(function success(response) {
            // console.log("response", response);
            if (response.data.status) {
                if (isNotEmpty(response.data.data.candidateDetails) && !($scope.task_id)) {
                    var candidateDetails = response.data.data.candidateDetails;
                    if (candidateDetails.first_name == null) {
                        candidateDetails.first_name = "";
                    }
                    if (candidateDetails.middle_name == null) {
                        candidateDetails.middle_name = "";
                    }
                    if (candidateDetails.last_name == null) {
                        candidateDetails.last_name = "";
                    }
                    if (candidateDetails.job_title == null) {
                        candidateDetails.job_title = "";
                    }
                    $scope[$scope.form_model]['tasks'].title = candidateDetails.applicant_id + " " + candidateDetails.first_name + " " + candidateDetails.middle_name + " " + candidateDetails.last_name + " " + candidateDetails.job_title;
                }
            }
        });
    }

    $scope.setTaskFormRecordFieldId = function(selected) 
    {
        if (isEmpty($scope.selected_module)) {
            showAlertMessage({'status':0, 'message':'Please select module'}); 
            return false;           
        }
        // console.log("selected ", selected);
        $scope.selectedRecordObj = '';
        if(typeof selected.originalObject !== 'undefined') {
            $scope.selectedRecordObj = selected.originalObject;
    
            if(typeof $scope[$scope.form_model] !== 'undefined') {
                $scope.selected_record_name = {}; 
                $scope.selected_record_name[selected.customId] = isNotEmpty(selected.originalObject.name) ? selected.originalObject.name : null;

                // $scope.selected_account_id = selected.originalObject.id;
                $scope.record_id = selected.originalObject.id;
                //set task form record_id value
                $scope[$scope.form_model]['tasks'][selected.customId] = selected.originalObject.id;

                if ($scope.selected_module == 'accounts')
                    $scope.get_task_account_contacts($scope.record_id);
                
                if ($scope.selected_module == 'jobs')
                    $scope.get_task_job_info($scope.record_id);

                if ($scope.selected_module == 'candidates' || $scope.selected_module == 'resource_pool')
                    $scope.get_task_candidate_info($scope.record_id);
                
            }//form model defined
        }//module object selected from auto suggestion 
    }
    

    $scope.viewModuleTaskPopup = function (task_id) {
        $action_url = 'task_categories/'+$scope.module_specific_category.id+'/tasks/'+task_id+'/view';
        HrApiServices.get($action_url, {}, true)
        .then(function success(response) {
            if (response.data.status == 1) {
                $scope.openViewModuleTaskPopup(response.data.data);
            } else {
                showAlertMessage(response.data);
                location.href = ROOT_URL;
                return;
            }
        });
    }

    $scope.openViewModuleTaskPopup = function (obj) {
        $uibModal.open({
             animation: true,
             ariaLabelledBy: 'modal-title',
             ariaDescribedBy: 'modal-body',
             templateUrl: 'ViewTaskPopup.html',
             controller: 'ModuleTaskViewInstanceCtrl',
             size: 'xl modal-dialog-aside',
             windowClass:'fixed-right',
             scope:$scope,
             resolve: {
                  items: function() {
                      /* if ($scope.module_id == 4) {
                         return { 'task_record_id': enc_id, 'task_category_id': $scope.module_specific_category.id};
                     } else {
                         return { 'task_record_id': enc_id};
                     } */
                    return obj;
                 },
             }
        }).result.then(function() {
 
        }, function() {
             //on cancel button press
        });
    };

    $scope.taskCategoryAddTaskPopup = function (task_id) {
        // console.log("category", $scope.module_specific_category);//return;
        //create task 
        //console.log("candidte id",$scope.candidateId);
        var postData = {};
        postData.task_category_id = $scope.module_specific_category.id;

        /*postData['module_id'] = $scope.module_id;

        if (typeof $scope.FromPopup == 'undefined') {
            postData['FromPopup'] = 0;
        } else {
            postData['FromPopup'] = 1;
            postData['candidateId'] = $scope.candidateId;
        }

        if ($scope.module_id == 1) {
            postData['job_id'] = $scope.id;
        } else if ($scope.module_id == 2 || $scope.module_id == 3 ) {
            postData['FromPopup'] = 1;
            postData['candidateId'] = $scope.id;
        }

        if (isNotEmpty($scope.candidateId))
            postData['candidateId'] = $scope.candidateId;*///

        $action_url = 'task_categories/tasks/create';
        if (task_id) {
            postData['task_id'] = task_id;
            $action_url = 'task_categories/tasks/edit';
        }
        
        HrApiServices.post($action_url, postData, true)
        .then(function success(response) {
            // console.log("response", response);//return;
            $scope.openTaskCategoryTaskPopup(response.data.data);
        });
    }

    $scope.openTaskCategoryTaskPopup = function (obj) {
        $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'addTaskCategoryTaskPopup.html',
                controller: 'TaskCategoriesTaskInstanceCtrl',
                size: 'lg',
                scope:$scope,
                resolve: {
                    items: function() {
                        /* if ($scope.module_id == 4) {
                            return { 'task_record_id': enc_id, 'task_category_id': $scope.module_specific_category.id};
                        } else {
                            return { 'task_record_id': enc_id};
                        } */
                    return obj;
                    },
                }
        }).result.then(function() {
    
        }, function() {
                //on cancel button press
        });
    };  
    
    $scope.viewTaskCategoryTaskPopup = function (task_id) {
        $action_url = 'task_categories/'+$scope.module_specific_category.id+'/tasks/'+task_id+'/view';
        // console.log("action url", $action_url);return;
        HrApiServices.get($action_url, {}, true)
        .then(function success(response) {
            // console.log("response", response);//return;
            $scope.openViewTaskCategoryTaskPopup(response.data.data);
        });
    }

    $scope.openViewTaskCategoryTaskPopup = function (obj) {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'ViewTaskCategoryTaskPopup.html',
            controller: 'ModuleTaskViewInstanceCtrl',
            size: 'lg modal-dialog-aside',
            windowClass:'fixed-right',
            scope:$scope,
            resolve: {
                items: function() {
                    return obj;
                },
            }
        }).result.then(function() {

        }, function() {
            //on cancel button press
        });
    };
    
    if (!isEmpty($scope[$scope.form_model])) {
        if (!isEmpty($scope[$scope.form_model]['job_pay_details'])) {
            $scope.convertNumberToString({
                'job_pay_details': ['mark_as_default']
            });
        }
        if (!isEmpty($scope[$scope.form_model]['candidate_expected_pay_details'])) {
            $scope.convertNumberToString({
                'candidate_expected_pay_details': ['mark_as_default']
            });
        }
    }

    $scope.openSearchProjectPopup = function(field_obj = '') {
        var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'searchProjectPopup.html',
                controller: 'searchProjectModalInstanceCtrl',
                size:'xl modal-dialog-aside',
                windowClass:'fixed-right',
                backdrop: false,
                resolve: {
                    items: function () {
                        return field_obj;
                    },
                }
        }); 
        modalInstance.result.then(function (selectedItem) {
            if(isNotEmpty(selectedItem) && field_obj.field_name == 'project_name' && field_obj.related_table == 'jobs') {
                $scope.createJobData['jobs']['project_id'] = selectedItem.project_code;
                $scope.createJobData['jobs']['project_name'] = selectedItem.id;
                $scope[$scope.form_model]['jobs']['project_name'] = selectedItem.id;
                angular.element(document.querySelector("#project_name_value")).val(selectedItem.name);
                // delete $scope.selected_project_name;
                // $scope.selected_project_name = {}; 
                // $scope.selected_project_name['name'] = selectedItem.name;
            }
        }, function () {
            
        });
    }
});

App.controller('searchProjectModalInstanceCtrl', function($scope, $uibModal, $uibModalInstance, items, $filter, $rootScope, $controller, HireApiServices, ConfirmAlert, $window, $location, $state) 
{
   
    $scope.total_count = 0;
    $scope.itemsPerPage = 15;
    $scope.default_search_filter = '';
    $scope.table_headers_list = {};
    $scope.table_headers_list = {'name':'Project Name', 'client_id':'Client', 'start_date':'Start Date', 'end_date':'End Date', 'assigned_employee_count':'Resources'};

    $scope.getProjectsList = function(PageNo = '') {
        params = {};
        params['page'] = PageNo;
        params['itemsPerPage'] = $scope.itemsPerPage;
        params.default_search_filter = $scope.default_search_filter;
        params['sort'] = 'desc';
        params['orderField'] = 'id';
        HireApiServices.post('projects/getList',params).then(function success(response){
            if(response.data.status == 1){
                $scope.list_data = response.data.data.list;
                $scope.total_count = response.data.data.pagination.total;
                $scope.currentPage = response.data.data.pagination.current_page;
            }
        });
    }

    $scope.getProjectsList(1);

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }

    $scope.addProjectDetailsToForm = function(project_data = '') {
        $scope.project_details = project_data;
        $uibModalInstance.close($scope.project_details);
    }
});

App.controller('getSkillsModalInstanceCtrl', function($scope, $uibModal, $uibModalInstance, items, $filter, $rootScope, $controller, HireApiServices, ConfirmAlert, $window, $location, $state,$http) 
{
   
    $scope.jobtitle = items;
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }

    $scope.fetchJobTitlesAndSkills = function() {
        var data = {
            "jobtitle": $scope.jobtitle
        };
        HireApiServices.post('getJobSkills',data)
            .then(function(response) {
                console.log(response.data)
                // $scope.skills = response.data;
                $scope.skills = response.data.map(function(skill) {
                    return { text: skill };
                });
            }, function(error) {
                console.error('Error fetching job titles and skills:', error);
            });
    };
    $scope.fetchJobTitlesAndSkills();

    $scope.removeSkill = function(index) {
        $scope.skills.splice(index, 1); 
        console.log($scope.skills)
    };
    $scope.update = function() {
        $uibModalInstance.close($scope.skills);
    };
});

App.controller('duplicateAccountCtrl', function($scope, $timeout, $http, ConfirmAlert, $uibModal, $uibModalInstance, responseData ,$rootScope, $filter, $sce, HrApiServices, $controller) 
{
    $scope.oldAccountData = {};
    $scope.accountStatus = [{"id":"1","name":"Active"},{"id":"2","name":"Key Account"},{"id":"3","name":"Inactive"},{"id":"4","name":"Blacklisted"},{"id":"5","name":"Retired"}];

    $scope.checkFieldsGetDupRecords = function (){
        fields = ['account_name'];
        len = 0;
        $scope.oldAccountData = responseData.data;
        angular.forEach(fields, function (item) {
            if (isEmpty(responseData.data[item])) {
                len = len +1;
            }
        });
        return !(fields.length == len);
    }

    $scope.getAccountDuplicates = function () {
        $scope.loading = 1;
        if ($scope.checkFieldsGetDupRecords()) {
            postData = {};
            account_data = responseData.data
            postData.account_name = account_data.account_name;
            postData.phone_number = account_data.phone_number;
            postData.website = account_data.website;
            postData.id = $scope.id;
            HrApiServices.post("accounts/getAccountDuplicates", postData, 'none')
                .then(function (response) {
                    $scope.loading = 0;
                    response = response.data;
                    if (response.success) {
                        $scope.duplicate_accounts_list = response.data.list_details;
                        $scope.dup_table_columns = response.data.table_columns;
                        var accountStatusLookup = {};
                        $scope.accountStatus.forEach(function(account) {
                          accountStatusLookup[account.id] = account.name;
                        });
              
                        $scope.duplicate_accounts_list.forEach(function(account) {
                          var accountId = account.account_status;
                          account.account_status_name = accountStatusLookup[accountId];
                        });
                    } else {
                        $scope.duplicate_accounts_list = [];
                        $scope.dup_table_columns = {};
                        $scope.dup_master = { checkbox: false };
                        $scope.selected_dup_accounts = {};
                        
                    }

                });
        }
    }
    $scope.getAccountDuplicates ();

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
});

App.controller('duplicateContactCtrl', function($scope, $timeout, $http, ConfirmAlert, $uibModal, $uibModalInstance, responseData,$rootScope, $filter, $sce, HrApiServices, $controller) 
{
    $scope.oldAccountData = {};
    
    $scope.checkFieldsGetDupRecords = function (){
        fields = ['email_id'];
        len = 0;
        $scope.oldContactData = responseData.data;
        angular.forEach(fields, function (item) {
            if (isEmpty(responseData.data.data[item])) {
                len = len +1;
            }
        });
        return !(fields.length == len);
    }

    $scope.current_account_id_popup = isNotEmpty(responseData.data.data.account_id) ? responseData.data.data.account_id : '';

    $scope.getContactDuplicates = function () {
        $scope.loading = 1;
        if ($scope.checkFieldsGetDupRecords()) {
            postData = {};
            contact_data = responseData.data.data;
            postData.first_name = contact_data.first_name;
            postData.last_name = contact_data.last_name;
            postData.phone = contact_data.phone;
            postData.mobile = contact_data.mobile;
            postData.email_id = contact_data.email_id;
            postData.id = $scope.id;
            HrApiServices.post("accounts/contacts/getContactDuplicates", postData, 'false')
                .then(function (response) {
                    $scope.loading = 0;
                    response = response.data;
                    if (response.success) {
                        $scope.duplicate_contacts_list = response.data.list_details;
                        $scope.selected_dup_contact = {};
                        if ($scope.duplicate_contacts_list.length === 1) {
                            $scope.selected_dup_contact = { id: $scope.duplicate_contacts_list[0].id };
                        }
                        $scope.dup_table_columns = response.data.table_columns;
                    } else {
                        $scope.duplicate_contacts_list = [];
                        $scope.dup_table_columns = {};
						$scope.dup_master = { radio: false };
						$scope.selected_dup_contacts = {};
                    }

                });
        }
    }
    $scope.getContactDuplicates ();

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }

    $scope.update = function() {
        if (isNotEmpty($scope.selected_dup_contact)) {
            postData = {};
            postData.data = responseData.data.newData;
            postData.contactId = $scope.selected_dup_contact;
            
            HrApiServices.post("accounts/contacts/duplicateContactUpdate", postData)
            .then(function(response) {
                var resMsg = response.data.message;
                if (isNotEmpty(response.data.message))
                    resMsg = response.data.message;
    
                showAlertMessage({
                    status: 1,
                    message: resMsg     
                });
                $uibModalInstance.dismiss();
                $scope.modalInstance.dismiss(); 
            });
        }else{
            showAlertMessage({
                status: 0,
                message: "Please select any one record."
            });
            return;
        }
    };
});

App.directive('compileHtml', function($compile, $parse) {
    return {
        link : function(scope, element, attr) {
            var parsed = $parse(attr.ngBindHtml);

            function getStringValue() {
                return (parsed(scope) || '').toString();
            }

            scope.$watch(getStringValue, function() {
                //The -9999 makes it skip directives so that we do not recompile ourselves
                $compile(element, null, -9999)(scope);
            });
        }
    }
});

// Directive to generate fields based on field type
App.directive('fieldItem', function ($compile) 
{   
    var linker = function(scope, element, attrs) {
        element.html(getTemplate(scope.field, scope.form_model, scope.section_arr_id, scope.form_model_data, scope.form_styles)).show();
        $compile(element.contents())(scope);
    }

    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: true // true - it will take controller scope so that we can call all the methods & properties
    };
});

App.directive('configFieldItem', function ($compile) 
{
    var linker = function(scope, element, attrs) {
        element.html(getConfigTemplate(scope.field, scope.form_model, attrs, scope.form_styles)).show();
        $compile(element.contents())(scope);
    }

    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: true // true - it will take controller scope so that we can call all the methods & properties
    };
});

App.filter('roundToFixedDecimals', function() {
    return roundToFixedDecimals;
});

App.filter('currency', function() {
    return currency;
});



App.controller('ModuleTaskInstanceCtrl', function($scope, $uibModal, $uibModalInstance, items, $filter, $rootScope, $controller, HrApiServices, ConfirmAlert, $window, $location, $state) 
{   
    $scope.total_file_size_mb = parseInt(TOTAL_FILE_SIZE_LIMIT/(1024*1024));
    // console.log("items", items);//return;

    // $scope.configureFields = $scope.configFormArr.form_options['configure_fields'];

    $scope.sectionsFields = items.form_section_fields.cnf_form_section;

    $scope.notes_status = items.notes_status;

    // Record data
    $scope.task_id = items.id;
    $scope.show_todo = false;
    // Form Configuration
    $scope.configFormArr = items.configFormArr;

    var defineFieldAttrObj = $scope.configFormArr.form_options.defineFieldAttrOptions;
    $scope.defineFieldAttrObj = [];
    if (typeof defineFieldAttrObj != 'undefined') {
        $scope.defineFieldAttrObj = defineFieldAttrObj;
    }
    $scope.static_section = isNotEmpty($scope.configFormArr.static_section) ? $scope.configFormArr.static_section : '';

    $scope.form_name = 'Task_form';
    $scope.form_model = 'task';

    $scope.form_fields_array_index = 'cnf_form_field';
    $scope.ng_submit_action = 'saveModuleTask()';

    $scope.save_url = 'task_categories/'+items.task_category_id+'/tasks/save';
    $scope.save_method = 'POST';

    if ($scope.task_id) {
        $scope.copyOfTask = angular.copy(items.task);
        $scope.save_url = 'task_categories/'+items.task_category_id+'/tasks/update/'+$scope.task_id;
        $scope.save_method = 'PUT';
    }

    $scope[$scope.form_name] = {};
    $scope[$scope.form_model] = {};
    $scope[$scope.form_model]['task_attachments'] = {};
    $scope[$scope.form_model]['task_attachments']['attachments'] = {};

    $scope.taskfilesData = [];
    $scope.taskDocuments = isNotEmpty(items.taskDocuments) ? items.taskDocuments : [];

    $scope.configureFields = $scope.configFormArr.form_options['configure_fields'];

    $scope.configure_fields = isNotEmpty($scope.configFormArr.form_options.configure_fields) ? $scope.configFormArr.form_options.configure_fields : '[]';

    $scope.add_comments = 0;

    $scope.is_call_note_type = 0;
    $scope.is_active_other_notes = 0;

    if (isEmpty(items.task))
        $scope[$scope.form_model]['tasks'] = {};

    if (isNotEmpty(items.task)) {
        $scope[$scope.form_model] = items.task;
        $scope.taskfilesData = items.task.tasks.task_attachments;

        // noteTypeID = items.task.tasks.note_type_id;
        // if(noteTypeID) {
        //     noteTypeID = noteTypeID.toString();
        //     var arr = noteTypeID.split(',');
        //     var obj = $scope.notes_status;
        //     var arrResult = [];
        //     angular.forEach(arr, function (k, v) {
        //         angular.forEach(obj, function (objkey, objindex) {
        //             if (arr[v] == obj[objindex]['id'] && obj[objindex]['name'] == 'Call') {
        //                 $scope.is_call_note_type = 1;
        //             }
        //             if (arr[v] == obj[objindex]['id'] && obj[objindex]['name']!='Notes' && obj[objindex]['name']!='Call' && obj[objindex]['name']!='Email' && obj[objindex]['name']!='Meeting') {
        //                 $scope.is_active_other_notes = 1;
        //             }
        //         });
        //     });
        // }
    }

    $scope.isDisable = 0;
    if (!$scope.masterLayout['permissions']['access']['tasks']['add']) {
        $scope.isDisable = 1;
    }

    $scope.changeNoteType = function(note_type_id,note_type_name) {
        $scope[$scope.form_model]['tasks']['note_type_id'] = note_type_id;
        $scope.is_call_note_type = 0;
        $scope.is_active_other_notes = 0;
        if(note_type_name == 'Call'){
            $scope.is_call_note_type = 1;
            $scope[$scope.form_model]['tasks']['is_call_answered'] = 1;
        }
        if(note_type_name!='Notes' && note_type_name!='Call' && note_type_name!='Email' && note_type_name!='Meeting'){
             $scope.is_active_other_notes = 1;
        }
    }

    $scope.dueTimeChange = function (){

        var timeStr = $scope[$scope.form_model]['tasks'].due_time;
        var parts = timeStr.split(':');
        var hour = parseInt($.trim(parts[0]));
        hour -= 1;

        if(hour <= 0){
            hour += 12;
            if(parts[1].match(/(AM|am)/)){
                parts[1] = parts[1].replace('AM', 'PM').replace('am', 'pm')
            } else {
                parts[1] = parts[1].replace('PM', 'AM').replace('pm', 'am')
            }
        }

        timeStr = hour + ':' + parts[1];
        
        if( timeStr == '11:00 AM' ){
            var newDate = $scope[$scope.form_model]['tasks'].due_date;
            newDate.setDate(newDate.getDate() - 1);
            $scope[$scope.form_model]['tasks'].reminder_date_time = newDate;
            timeStr = '11:00 PM';
        } else if( timeStr == '11:30 AM' ){
            var newDate = $scope[$scope.form_model]['tasks'].due_date;
            newDate.setDate(newDate.getDate() - 1);
            $scope[$scope.form_model]['tasks'].reminder_date_time = newDate;
            timeStr = '11:30 PM';
        } 
        // else {
        //     var remainderDate = new Date();
        //     $scope[$scope.form_model]['tasks'].reminder_date_time = remainderDate.setDate(remainderDate.getDate() + 1);
        // }

        $scope[$scope.form_model]['tasks'].reminder_time = timeStr;
    }

    // if (items.task_category_id == 1 && isEmpty(items.task)) {
    if (isEmpty(items.task)) {
        $scope[$scope.form_model]['tasks']['status'] = '1';
        $scope[$scope.form_model]['tasks']['priority'] = '1';
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        $scope[$scope.form_model]['tasks'].due_date = currentDate;
        $scope[$scope.form_model]['tasks'].reminder_date_time = currentDate;
        $scope[$scope.form_model]['tasks'].reminder_time = '9:00 AM';
        // $scope[$scope.form_model].reminder_time = hours + ':' + mins + ' ' + ampm;
        $scope[$scope.form_model]['tasks']['tag_account'] = 0;
        if($scope.module_id == MODULE_SLUGS.OPPORTUNITIES_SLUG.id || $scope.module_id == MODULE_SLUGS.LEADS_SLUG.id || $scope.module_id == MODULE_SLUGS.ACCOUNTS_SLUG.id || $scope.module_id == MODULE_SLUGS.CONTACTS_SLUG.id){
            $scope.show_todo = true;
            if(typeof $scope[$scope.form_model]['task_assignees'] == 'undefined'){
                $scope[$scope.form_model]['task_assignees'] = {};
            }
            if ($scope.module_id == 4) {
                $scope[$scope.form_model]['tasks']['tag_account'] = 1;
            }
            if(isNotEmpty(items.current_module_record_details) && isNotEmpty(items.current_module_record_details.task_notifiers)){
                opp_owner_ids = items.current_module_record_details.task_notifiers.split(',');
                var task_notifiers_arr = [];
                var task_assignees_arr = [];
                angular.forEach(opp_owner_ids, function(val, key) {
                    if (isNotEmpty(items.all_users_arr) && isNotEmpty(items.all_users_arr[val])) {
                        task_notifiers_arr[key] = items.all_users_arr[val];
                        task_assignees_arr[key] = {};
                        task_assignees_arr[key]['id'] = parseInt(val); 
                        task_assignees_arr[key]['name'] = items.all_users_arr[val]['name'];
                    }
                });
                $scope[$scope.form_model]['task_assignees']['assign_to'] = task_assignees_arr;
                $scope[$scope.form_model]['tasks']['notifiers'] = task_notifiers_arr;
            }
        }
    }
    
    // console.log("can",console.log("can",items.candidateDetails));
    // console.log("module", $scope.module_id);
    // console.log("task", $scope.task_id);

    if (isNotEmpty(items.candidateDetails) &&  ($scope.module_id == 2 || $scope.module_id == 3) 
        && !($scope.task_id)) {

        var candidateDetails = items.candidateDetails;
        if (candidateDetails.first_name == null) {
            candidateDetails.first_name = "";
        }
        if (candidateDetails.middle_name == null) {
            candidateDetails.middle_name = "";
        }
        if (candidateDetails.last_name == null) {
            candidateDetails.last_name = "";
        }
        if (candidateDetails.job_title == null) {
            candidateDetails.job_title = "";
        }
        $scope[$scope.form_model]['tasks'].title = candidateDetails.applicant_id + " " + candidateDetails.first_name + " " + candidateDetails.middle_name + " " + candidateDetails.last_name + " " + candidateDetails.job_title;
    }
    // console.log("job task form",$scope[$scope.form_model]['tasks']);

    $scope.convertNumberToStringTask = function(fields_obj) {
        angular.forEach(fields_obj, function(fields_arr, obj_index) {
            angular.forEach(fields_arr, function(field) {
                // console.log("fields_arr", $scope[$scope.form_model][obj_index]);
                if (isObject($scope[$scope.form_model][obj_index])) {
                    $scope[$scope.form_model][obj_index][field] = returnAsString($scope[$scope.form_model][obj_index][field]);
                }

            });
        });
    }

    $scope.convertNumberToStringTask({
        'tasks' : ['priority', 'status']
    });

    //var CURRENT_MODULE_ID = 14;
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isFieldVisible = function(field,bulk_form_id='') {
        return isVisibleFunc(field, $scope,bulk_form_id);
    }

    $scope.isConfigVisible = function(field)
    {
        return isConfigVisibleFunc(field, $scope);
    }

    $scope.fromQuickAdd = true;

    angular.extend(this, $controller('CommonFormEventsCtrl', {$scope: $scope}));  

    angular.extend(this, $controller('TaskTagModulesCtrl', {$scope: $scope}));

    $scope.isDisabledField = function(field) {
        return disabledFunc(field, $scope);
    }
    //previous
    

    $scope.get_comments = function (record_id) {
        if(record_id) {
            postData = {};
            postData['taskId'] = record_id;
            HrApiServices.post('tasks/getComments', postData)
                .then(function success(response) {
                    $scope.comments_list = response.data.data;
                    $scope.comments = '';
                });
        }
    };

    $scope.TagAccountCheck = function(task_record) {
        if (task_record.module_slug == 'accounts' && task_record.record_id) {
            $scope[$scope.form_model]['tasks']['tag_account'] = 1;
        } else if (task_record.module_slug == 'contacts' || task_record.module_slug == 'jobs') {
            // console.log('heere',JSON.parse(task_record.other_items));
            $scope.other_items = JSON.parse(task_record.other_items);
            if ($scope.other_items && $scope.other_items['account_id'].length) {
                $scope[$scope.form_model]['tasks']['tag_account'] = 1;
            } else {
                $scope[$scope.form_model]['tasks']['tag_account'] = 0;
            }
        } else {
            $scope[$scope.form_model]['tasks']['tag_account'] = 0;
        }
    }

    if ($scope.module_id == 1) {
        $scope.account_contacts = {};
        $scope.account_contacts = items.job_account_contacts;
    }

    if($scope.module_id === 4 && isEmpty($scope.account_contacts)) {
        $scope.account_contacts = {};
        console.log(items.current_module_record_details);
        var url = 'accounts/getAccountName?id='+items.current_module_record_details.id;
        HrApiServices.get(url,{},true)
            .then(function success(response) {
               $scope.account_contacts = response.data.data.contacts;
        });
    }
    // console.log("account contacts", $scope.account_contacts);
    
    $scope[$scope.form_model]['tasks']['contact_ids'] = {};
    if (isNotEmpty(items.task)) {
        // console.log("task", items.task);//return;
        // if ($scope.module_id == 1) {
        //     $scope[$scope.form_model]['tasks'].account_contacts = {};
        //     $scope[$scope.form_model]['tasks'].account_contacts = items.job_account_contacts;
        // }

        if (isNotEmpty(items.assigned_contacts))
            $scope[$scope.form_model]['tasks']['contact_ids'] = items.assigned_contacts;

        $scope[$scope.form_model]['tasks']['append_url_for_tasks'] = items.task.tasks.append_url_for_tasks;

        $scope.get_comments($scope.task_id);
        $scope.add_comments = $scope.task_id ? 1 : 0;

        $scope.TagAccountCheck(items.task.tasks);
        //console.log("appendurl", $scope[$scope.form_model]['tasks']['append_url_for_tasks']);
    }

    
    $scope.SaveNotes = function(ActionUrl,comments) { 
        postData = {};
        // postData['task_id'] =  RecordID;
        postData['task_id']     =  $scope.task_id;//$scope.ViewRecordID;
        postData['comments']    =  comments;

        if (comments) { 
            HrApiServices.post(ActionUrl,postData,true).then(function success(response) {
                if (response.data.status == 1) {
                  showAlertMessage({'status':1, 'message':response.data.message});
                  $scope.get_comments($scope.task_id);
                  $scope.task['task_comments']['comments'] = '';
                  if(isNotEmpty($scope.task_comments.comments)){
                    $scope.task_comments.comments = '';
                  }
                } else {
                    message = response.data.message;
                    if (typeof response.data.validations !='undefined') {
                      for (field_name in response.data.validations) {
                          message += response.data.validations[field_name];
                      }
                    }
                  showAlertMessage({'status':0, 'message': message});
                }            
              }, function(error) {
                showAlertMessage({'status':0, 'message':"{{trans('messages.invalid_operation')}}"});          
                });
            } else {
                $scope.errorSubmit=1;
            }
    }


    $scope.saveModuleTask = function() {

        /* if ( ($scope.Task.tag_account == 0 && (typeof $scope.Task.contact_ids != 'undefined' && $scope.Task.contact_ids.length == 0)) 
        && ( module_id == 4 || ( module_id == 1 && $scope.job_client_id ) )) {
            var validation_msg = "Please select Associate with or Tag Account";
            showAlertMessage({ 'status': 0, 'message': validation_msg });
            return;
        } */

        // console.log("form", $scope[$scope.form_model],$scope.form_model);//return;
        if ( ($scope[$scope.form_model]['tasks']['tag_account'] == 0 && (typeof $scope[$scope.form_model]['tasks']['contact_ids'] != 'undefined' && $scope[$scope.form_model]['tasks']['contact_ids'].length == 0)) 
        && ( $scope.module_id == 4 || ( $scope.module_id == 1 && $scope.job_client_id ) )) {
            var validation_msg = "Please select Associate with or Tag Account";
            showAlertMessage({ 'status': 0, 'message': validation_msg });
            return;
        }


        
        $scope.setValidationErrorsForCustomForm();

        var curFormValidationSuccess = $scope[$scope.form_name]['form'].$valid;
        if (!curFormValidationSuccess) {
            showAngularFormValidationErrors();
            return false;
        }

         /* $scope.Task.moduleId = $scope.module_id;
        $scope.Task.module_slug = $scope.module_slug;
        $scope.Task.opportunity_id = $scope.id; */

        $scope[$scope.form_model]['tasks']['moduleId'] = $scope.module_id;
        $scope[$scope.form_model]['tasks']['module_slug'] = $scope.module_slug;
        $scope[$scope.form_model]['tasks']['opportunity_id'] = $scope.id;
        if (isNotEmpty($scope.candidateId))
        $scope[$scope.form_model]['tasks']['opportunity_id'] = $scope.candidateId;


        //console.log("code",$scope[$scope.form_model]['tasks']['code']);
        //console.log("$scope.calendar_module", $scope.calendar_module);return;
        var task_code = null;
        if (isNotEmpty($scope[$scope.form_model]['tasks']['code'])) {
            task_code = $scope[$scope.form_model]['tasks']['code'];
            task_code = task_code.substring(0,3);
        }

        if (isNotEmpty($scope.calendar_module) && task_code !== 'TSK') {
            $scope[$scope.form_model]['tasks']['module_slug'] = $scope.calendar_module;
        }

        if (isNotEmpty($rootScope.from_calendar)) {
            $scope[$scope.form_model]['tasks']['module_slug'] = 'calendar';
        }

        /* if (isNotEmpty($scope.is_interview)) {
            // var taskData = {task:$scope.Task, files:$scope.files, action_url:action_url};
            var taskData = {task:$scope[$scope.form_model]['tasks'], files:$scope.files, action_url:action_url};
            $uibModalInstance.close(taskData);
            return true;
        } */
        
        var requestData = $scope[$scope.form_model];
        method = $scope.save_method;    
        save_url = $scope.save_url;	
        /* if (typeof $scope.formres == 'undefined') {
            $scope.formres = new FormData();
        } */

        $scope.formres = [];
        $scope.formres = new FormData();
        // console.log("taskdocuments",$scope.taskDocuments);
        // $scope.formres.attachments = [];
        var total_file_size = 0;
        if (isNotEmpty($scope.taskDocuments)) {
            angular.forEach($scope.taskDocuments, function (file, key) {
                if(typeof file.size !== 'undefined'){
                    total_file_size = total_file_size + file.size;
                }
                $scope.formres.append('attachments[]', file);
            });
        }
        //check total files size ---- Limit to 5MB
        if(total_file_size > TOTAL_FILE_SIZE_LIMIT){
            var errorMessage = [];
            errorMessage['status'] = 0;
            errorMessage['message'] = CONFIG_MESSAGES.total_file_size_limit_exceeded;
            showAlertMessage(errorMessage);
            return false;
        }

        if (method == 'PUT') {
        	$scope.formres.set("_method", "PUT");
        	$scope.formres.set("data", angular.toJson(requestData));
        } else {
            requestData['selected_tagged_modules'] = $scope.SearchListData;
        	$scope.formres.append("data", angular.toJson(requestData));
        }
        
        if (isNotEmpty($scope.is_interview) && isEmpty($rootScope.from_calendar)) {
            // var taskData = {task:$scope.Task, files:$scope.files, action_url:action_url};
            // var taskData = {task:$scope.formres, action_url:save_url};
            var taskData = {task:requestData, action_url:save_url};
            if(isNotEmpty($scope.taskDocuments)){
                taskData['task_files'] = $scope.taskDocuments;
            }
            // console.log("taskData", taskData);//return;
            $uibModalInstance.close(taskData);
            return true;
        }
        
        $scope.btn_loading = true;
        HrApiServices.postAttachment(save_url, $scope.formres).then(function(response) {
            $scope.btn_loading = false;
            $scope.cancel();
            if (response.data.status) {
                showAlertMessage({
                    status : 1,
                    message : response.data.message
                });
                // $location.path('interviews/calendar');
                if ($scope.is_from_calendar) {
                    $state.reload();//$location.path('interviews/calendar');//$window.location.reload();//$route.reload();
                } else {
                    $scope.getTableListData(1,'','tasks');
                    if(isNotEmpty($scope[$scope.form_model]['tasks']['is_add_note'])){
                        $scope.getNotesTabList($scope[$scope.form_model]['tasks']['opportunity_id']);
                    }
                    // $location.path('task_categories/'+response.data.data.task_category_id+'/tasks');
                }
            } else {
                showFormValidationErrorMessages(response);
            }
        }, function() {
            $scope.btn_loading = false;
            ajaxErrorCallBackFunc();
        });
        
    }

    $scope.getTaskDetails = function() {

        // console.log("form", $scope[$scope.form_model],$scope.form_model);//return;
        if ( ($scope[$scope.form_model]['tasks']['tag_account'] == 0 && (typeof $scope[$scope.form_model]['tasks']['contact_ids'] != 'undefined' && $scope[$scope.form_model]['tasks']['contact_ids'].length == 0)) 
        && ( $scope.module_id == 4 || ( $scope.module_id == 1 && $scope.job_client_id ) )) {
            var validation_msg = "Please select Associate with or Tag Account";
            showAlertMessage({ 'status': 0, 'message': validation_msg });
            return;
        }

        $scope.setValidationErrorsForCustomForm();

        var curFormValidationSuccess = $scope[$scope.form_name]['form'].$valid;
        if (!curFormValidationSuccess) {
            showAngularFormValidationErrors();
            return false;
        }

        $scope[$scope.form_model]['tasks']['moduleId'] = $scope.module_id;
        $scope[$scope.form_model]['tasks']['module_slug'] = $scope.module_slug;
        $scope[$scope.form_model]['tasks']['opportunity_id'] = $scope.id;
        if (isNotEmpty($scope.candidateId))
        $scope[$scope.form_model]['tasks']['opportunity_id'] = $scope.candidateId;

        var task_code = null;
        if (isNotEmpty($scope[$scope.form_model]['tasks']['code'])) {
            task_code = $scope[$scope.form_model]['tasks']['code'];
            task_code = task_code.substring(0,3);
        }

        if (isNotEmpty($scope.calendar_module) && task_code !== 'TSK') {
            $scope[$scope.form_model]['tasks']['module_slug'] = $scope.calendar_module;
        }

        if (isNotEmpty($rootScope.from_calendar)) {
            $scope[$scope.form_model]['tasks']['module_slug'] = 'calendar';
        }
        
        var requestData = $scope[$scope.form_model];
        method = $scope.save_method;    
        save_url = $scope.save_url;	

        $scope.formres = [];
        $scope.formres = new FormData();
        
        var total_file_size = 0;
        if (isNotEmpty($scope.taskDocuments)) {
            angular.forEach($scope.taskDocuments, function (file, key) {
                if(typeof file.size !== 'undefined'){
                    total_file_size = total_file_size + file.size;
                }
                $scope.formres.append('attachments[]', file);
            });
        }
        //check total files size ---- Limit to 5MB
        if(total_file_size > TOTAL_FILE_SIZE_LIMIT){
            var errorMessage = [];
            errorMessage['status'] = 0;
            errorMessage['message'] = CONFIG_MESSAGES.total_file_size_limit_exceeded;
            showAlertMessage(errorMessage);
            return false;
        }

        if (method == 'PUT') {
        	$scope.formres.set("_method", "PUT");
        	$scope.formres.set("data", angular.toJson(requestData));
        } else {
        	$scope.formres.append("data", angular.toJson(requestData));
        }

        $uibModalInstance.close({saveData:$scope.formres,data:requestData,file:$scope.taskfilesData,taskDocuments:$scope.taskDocuments});
    
    }

    $scope.uploadedTaskFile = function (element) {
        length_exceeded = false;

        if ($scope.taskfilesData.length > 4) {
            $scope.$apply(function($scope) {
                alert_response = {};
                alert_response['status'] = 0;
                alert_response['message'] = 'The total number of files should be maximum 5';
                showAlertMessage(alert_response);
            });
            return false;
        }
       
        if (isNotEmpty($scope.taskDocuments)) {
            $scope.total_file_size =  $scope.taskDocuments.map(item => item.size).reduce((prev, curr) => prev + curr, 0);
        } else {
            $scope.total_file_size = 0;
        }
        
        if (($scope.total_file_size + parseInt(element.files[0]['size'])) > TOTAL_FILE_SIZE_LIMIT) {
            $scope.$apply(function($scope) {
                showAlertMessage({
                    'status': 0,
                    'message': CONFIG_MESSAGES.total_file_size_limit_exceeded
                });
            });
            return false;
        }
        
        $scope.$apply(function ($scope) {
            var objFile = { 'id': '', 'attachment_name': element.files[0]['name'] };
            if (!checkStringLength(objFile['attachment_name'])) {            
                length_exceeded = true;
                $scope.taskfilesData = element.files; 
                if (length_exceeded) {
                    element.value = null;
                    showAlertMessage({
                        status : 0,
                        message : CONFIG_MESSAGES.file_name_limit_exceeds
                    });
                }
                return false;
            }  
            if(!isValidExtension(objFile['attachment_name'])) {  
              element.value = null;               
              showAlertMessage({
                status : 0,
                message : CONFIG_MESSAGES.invalid_file_extension
              });   
              return false; 
            } 
            $scope.taskfilesData.push(objFile);
            $scope.taskDocuments.push(element.files[0]);
        });
    }

    $scope.downloadTaskAttachment = function(id) {
        downloadAttachments(WEB_API_URL + 'tasks/download_task_attachment/' + id);
    }
    $scope.removeFile = function(file) {
        ConfirmAlert.swal({
            title: "Are you sure?",
            text: "You want to delete this attachment",
            type: "warning",
            // imageUrl: $scope.alertdeleteimage,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }, function(isConfirm) {
            if (isConfirm) {
                if (file.id) {
                    HrApiServices.delete('tasks/delete_attachment/'+ file.id).then(function(response) {
                        var deleteResponse = response.data;
                        showAlertMessage(deleteResponse);
                    });
                }
                // $scope['files'].splice($scope['files'].indexOf(file), 1); 
                $scope['taskfilesData'].splice($scope['taskfilesData'].indexOf(file), 1);  
               
                if (isNotEmpty($scope.taskDocuments)) {
                    angular.forEach($scope.taskDocuments, function (k, v) {
                        if ($scope.taskDocuments[v]['name'] == file.attachment_name) {
                            $scope.taskDocuments.splice(v, 1);
                        }
                    });
                }
                // console.log("documents delete",$scope.taskDocuments);   
            }
        });
    }

    $scope.tagAndUnTagTaskUrl = function(task_id,is_tag) {
        if(is_tag == 0){
            tag_meesage = "You want to untag this link";
        }
        else{
            tag_meesage = "You want to tag this link";
        }
        ConfirmAlert.swal({
            title: "Are you sure?",
            text: tag_meesage,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }, function(isConfirm) {
            if (isConfirm) {
                params = {};
                params.is_tag = is_tag;
                HrApiServices.post('tasks/tagAndUnTagTaskUrl/'+task_id, params, true)
                .then(function success(response) {
                    showAlertMessage({
                        status : response.data.status,
                        message : response.data.message
                    });
                    // $scope.Task.append_url_for_tasks = response.data.data.append_url_for_tasks;
                    $scope[$scope.form_model]['tasks'].append_url_for_tasks = response.data.data.append_url_for_tasks;
                });
            }
        });
    }
});

App.controller('ModuleTaskViewInstanceCtrl', function($scope, $uibModal, $uibModalInstance, items, $filter, $rootScope, $controller, HrApiServices, ConfirmAlert, items) {

    $scope.task = items.task.tasks;
    // console.log("task", $scope.task);
    // console.log("module slug", $scope.task.module_slug, "job_client_id", $scope.job_client_id,
    // "assigned_contacts", $scope.task.assigned_contacts);
	$scope.permissions = items.permissions;
    $scope.sectionsFields = items.form_section_fields.cnf_form_section;
    // console.log("section fields", $scope.sectionsFields);
    $scope.module_id = items.module_id;
    $scope.module_slug = items.module_slug;
    $scope.customdata = {};
    $scope.customdata = items.task;
    $scope.task_layout_slug = items.task_layout_slug;
    $scope.notes_type_details = items.notes_type_details;
   
    if ($scope.task_layout_slug == 'module_specific_task_layout') {
        $scope.tag_account = items.tag_account_contact_details.tag_account;
        $scope.job_client_id = items.tag_account_contact_details.job_client_id;
        $scope.assigned_contacts = items.tag_account_contact_details.assigned_contacts;
        $scope.assigned_account = items.tag_account_contact_details.assigned_account;//id
        $scope.assigned_account_value = items.tag_account_contact_details.assigned_account_value;

        //selected module, selectd respective module record in view page
        //selected module, selectd respective module record in view page
        $scope.selected_module = items.task.tasks.module_slug;
        $scope.selected_module_name = '';
        if (isNotEmpty($scope.selected_module)) {
            $scope.selected_module_name = $filter('titlecase')($scope.selected_module);
            $scope.selected_module_name = $scope.selected_module_name.replace("_"," ");
        }

        $scope.selected_record_value = '';
        $scope.selected_record_value = items.tag_account_contact_details.selected_record_value;

        $scope.record_id = $scope.task.record_id;
        
    }
    // console.log("append url", $scope.task['append_url_for_tasks']);
    
    // Record data
    $scope.id = $scope.task_id = items.id;
    $scope.task_category_id = items.task_category_id;

    // Layout data
    // $scope.page_title = $scope.pageOnLoadData.layout.page_title;

    // Form Configuration
    $scope.configFormArr = items.configFormArr;
    $scope.static_section = isNotEmpty($scope.configFormArr.static_section) ? $scope.configFormArr.static_section : '';

    // $scope.form_name = 'Task_form';
    // $scope.form_model = 'task';

    // $scope.form_fields_array_index = 'cnf_form_field';

    // $scope[$scope.form_name] = {};
    // $scope[$scope.form_model] = {};

    // if (isNotEmpty(items.task)) {
    //     $scope[$scope.form_model] = items.task;
    // }

    $scope.configure_fields = isNotEmpty($scope.configFormArr.form_options.configure_fields) ? $scope.configFormArr.form_options.configure_fields : [];

    // console.log("module slug", $scope.task.module_slug, "job_client_id", $scope.job_client_id,
    // "assigned_contacts", $scope.task.assigned_contacts);

    //angular.extend(this, $controller('DynamicFormCtrl', {$scope: $scope}));

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.get_comments = function (record_id) {
        postData = {};
        postData['taskId'] = record_id;
        HrApiServices.post('tasks/getComments', postData)
            .then(function success(response) {
                $scope.comments_list = response.data.data;
                $scope.comments = '';
            });
    };

    if (isNotEmpty($scope.id)) {
        $scope.get_comments($scope.id);
        $scope.add_comments = 1;
    }


    $scope.taskfilesData = [];
    $scope.taskDocuments = [];
    //attachments
    $scope.taskfilesData = items.task.tasks.task_attachments;
    // $scope.taskfilesData = items.filesArray;


    $scope.downloadTaskAttachment = function(id) {
        downloadAttachments(WEB_API_URL + 'tasks/download_task_attachment/' + id);
    }
    
    $scope.removePreFileData = function (id) {
        angular.element(document.querySelector("#" + id)).val("");
    }


    $scope.uploadedJobFile = function (element) {
        if (!$scope.taskfilesData) {
            $scope.taskfilesData = [];
        }
        var formres = new FormData();
        $scope.$apply(function ($scope) {
            //console.log(element.files[0]['name']);
            var objFile = { 'id': '', 'attachment_name': element.files[0]['name'] };
            if (!checkStringLength(objFile['attachment_name'])) {            
                $scope.files = element.files; 
                element.value = null;
                showAlertMessage({
                    status : 0,
                    message : CONFIG_MESSAGES.file_name_limit_exceeds
                });
                return false;
                
            }
            if(!isValidExtension(objFile['attachment_name'])){
                element.value = null;
                showAlertMessage({
                    status : 0,
                    message : CONFIG_MESSAGES.invalid_file_extension
                }); 
                return false;
            } 

            formres.append('attachments[]', element.files[0]);
            formres.append('taskId', $scope.id);

            HrApiServices.postAttachment("task_categories_task/fileuploadatview",formres,true).then(function(response) {
                var data = response.data;
                $scope.taskfilesData = data; 
            });

        });
    }
    $scope.removeFile = function(file) {
        ConfirmAlert.swal({
            title: "Are you sure?",
            text: "You want to delete this attachment",
            //type: "warning",
            imageUrl: $scope.alertdeleteimage,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }, function(isConfirm) {
            if (isConfirm) {
                if (file.id) {
                    HrApiServices.delete('tasks/delete_attachment/'+ file.id).then(function(response) {
                        var deleteResponse = response.data;
                        showAlertMessage(deleteResponse);
                    });
                }
                // $scope['files'].splice($scope['files'].indexOf(file), 1); 
                $scope['taskfilesData'].splice($scope['taskfilesData'].indexOf(file), 1);  
            }
        });
    }


    $scope.tagAndUnTagTaskUrl = function(task_id,is_tag) {
        if(is_tag == 0){
            tag_meesage = "You want to untag this link";
        }
        else{
            tag_meesage = "You want to tag this link";
        }
        ConfirmAlert.swal({
            title: "Are you sure?",
            text: tag_meesage,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }, function(isConfirm) {
            if (isConfirm) {
                params = {};
                params.is_tag = is_tag;
                HrApiServices.post('tasks/tagAndUnTagTaskUrl/'+task_id, params, true)
                .then(function success(response) {
                    showAlertMessage({
                        status : response.data.status,
                        message : response.data.data.message
                    });
                    // $scope.Task.append_url_for_tasks = response.data.data.append_url_for_tasks;
                    // $scope['task']['tasks']['append_url_for_tasks'] = response.data.append_url_for_tasks;
                    $scope['task']['append_url_for_tasks'] = response.data.data.append_url_for_tasks;
                });
            }
        });
    }

    $scope.SaveNotes = function(ActionUrl,comments) { 
        postData = {};
        // postData['task_id'] =  RecordID;
        postData['task_id']     =  $scope.task_id;//$scope.ViewRecordID;
        postData['comments']    =  comments;

        if (comments) { 
            HrApiServices.post(ActionUrl,postData,true).then(function success(response) {
                if (response.data.status == 1) {
                  showAlertMessage({'status':1, 'message':response.data.message});
                  $scope.get_comments($scope.task_id);
                  $scope.task_comments.comments = '';
                } else {
                    message = response.data.message;
                    if (typeof response.data.validations !='undefined') {
                      for (field_name in response.data.validations) {
                          message += response.data.validations[field_name];
                      }
                    }
                  showAlertMessage({'status':0, 'message': message});
                }            
              }, function(error) {
                showAlertMessage({'status':0, 'message':"{{trans('messages.invalid_operation')}}"});          
                });
            } else {
                $scope.errorSubmit=1;
            }
    }

    // console.log("module slug", $scope.task.module_slug, "job_client_id", $scope.job_client_id,
    // "assigned_contacts", $scope.task.assigned_contacts);
});  

App.controller('TaskCategoriesTaskInstanceCtrl', function($scope, $uibModal, $uibModalInstance, items, $filter, $rootScope, $controller, HrApiServices, ConfirmAlert, items) 
{
    // Initial Data while page load
	$scope.pageOnLoadData = items;

	$scope.permissions = $scope.pageOnLoadData.permissions;
    $scope.sectionsFields = $scope.pageOnLoadData.form_section_fields.cnf_form_section;
    
    $scope.module_id = $scope.pageOnLoadData.module_id;
    $scope.module_slug = $scope.pageOnLoadData.module_slug;

    // Record data
    $scope.id = $scope.task_id = $scope.pageOnLoadData.id;
    $scope.task_category_id = $scope.pageOnLoadData.task_category_id;
    $scope.layout_form_slug = $scope.pageOnLoadData.layout_form_slug;
    
    // Layout data
    $scope.page_title = $scope.pageOnLoadData.layout.page_title;

    // Form Configuration
    $scope.configFormArr = $scope.pageOnLoadData.configFormArr;
    $scope.static_section = isNotEmpty($scope.configFormArr.static_section) ? $scope.configFormArr.static_section : '';

    $scope.configureFields = $scope.configFormArr.form_options['configure_fields'];

    $scope.form_name = 'Task_form';
    $scope.form_model = 'task';

    $scope.form_fields_array_index = 'cnf_form_field';
    $scope.ng_submit_action = 'saveTask()';

    $scope.save_url = 'task_categories/'+$scope.task_category_id+'/tasks/save';
    $scope.save_method = 'POST';

    if ($scope.id) {
        $scope.copyOfTask = angular.copy($scope.pageOnLoadData.task);
        $scope.save_url = 'task_categories/'+$scope.task_category_id+'/tasks/update/'+$scope.id;
        $scope.save_method = 'PUT';
    }

    $scope[$scope.form_name] = {};
    $scope[$scope.form_model] = {};
    $scope[$scope.form_model]['task_attachments'] = {};
    $scope[$scope.form_model]['task_attachments']['attachments'] = {};

    $scope.taskfilesData = [];
    $scope.taskDocuments = [];

    $scope.get_comments = function (record_id) {
        postData = {};
        postData['taskId'] = record_id;
        HrApiServices.post('tasks/getComments', postData)
            .then(function success(response) {
                $scope.comments_list = response.data.data;
                $scope.comments = '';
            });
    };

    if (isNotEmpty($scope.pageOnLoadData.task)) {
        $scope[$scope.form_model] = $scope.pageOnLoadData.task;
        $scope.taskfilesData = $scope.pageOnLoadData.task.tasks.task_attachments;

        $scope.get_comments($scope.task_id);
        $scope.add_comments = 1;
    }

    $scope.configure_fields = isNotEmpty($scope.configFormArr.form_options.configure_fields) ? $scope.configFormArr.form_options.configure_fields : '[]';

    //
    $scope.modules = $scope.pageOnLoadData.modules;
    $scope.selected_module = null;
    $scope.record_id = 0;
    $scope.show_search_record_field = true;
    // $scope.isDisableRecord = true;
    $scope.account_id_for_view_link = 0;
   
    $scope.create_task_module_fields = true;//module_slug,record

    $scope.show_tag_account = false;
    $scope.show_tag_contact = false;

    $scope.job_client_id = 0;

    $scope.account_contacts = {};

    $scope.add_comments = 0;

    // console.log("modules", $scope.modules);
    if (isNotEmpty($scope.modules)) {

        $scope.get_task_account_contacts = function (record_id) {
            $scope.account_contacts = {};
            var url = 'accounts/getAccountName?id='+record_id;
            HrApiServices.get(url,{},true)
                .then(function success(response) {
                   $scope.account_contacts = response.data.data.contacts;
                   // console.log('res', $scope.account_contacts);
                   
                   $scope[$scope.form_model]['tasks']['contact_ids'] = $scope.pageOnLoadData.assigned_contacts;
                //    console.log("selected contact iddds", $scope.pageOnLoadData.assigned_contacts);
                });
        };

        // $scope[$scope.form_model]['tasks']['tag_account'] == 0
        $scope.TagAccountCheck = function(task_record) {
            if (task_record.module_slug == 'accounts' && task_record.record_id) {
                $scope[$scope.form_model]['tasks']['tag_account'] = 1;
            } else if (task_record.module_slug == 'contacts' || task_record.module_slug == 'jobs') {
                // console.log('heere',JSON.parse(task_record.other_items));
                $scope.other_items = JSON.parse(task_record.other_items);
                if ($scope.other_items && $scope.other_items['account_id'].length) {
                  $scope[$scope.form_model]['tasks']['tag_account'] = 1;
                } else {
                  $scope[$scope.form_model]['tasks']['tag_account'] = 0;
                }
            } else {
                $scope[$scope.form_model]['tasks']['tag_account'] = 0;
            }

            if (task_record.module_slug == 'accounts') {
                if (task_record.record_id > 0) {
                    $scope.get_task_account_contacts(task_record.record_id);
                } else {
                    $scope[$scope.form_model]['tasks']['contact_ids'] =     $scope.pageOnLoadData.assigned_contacts;

                    $scope.show_tag_account = true;
                    $scope.show_search_record_field = false;

                    // $scope.account_id_for_view_link = $scope.pageOnLoadData.account_id_for_view_link;
                    // console.log("accoun tid", $scope.account_id_for_view_link);
                }
            }

            if (task_record.module_slug == 'jobs') {
                $scope.account_contacts = $scope.pageOnLoadData.job_account_contacts;
                $scope[$scope.form_model]['tasks']['contact_ids'] = $scope.pageOnLoadData.assigned_contacts;
            }
        }
        
        if (isNotEmpty($scope.pageOnLoadData.task)) {
            $scope.selected_module = $scope.pageOnLoadData.task.tasks.module_slug;
            $scope.record_id = $scope.pageOnLoadData.task.tasks.record_id;

            // console.log("selected module" , $scope.selected_module, "record", $scope.record_id);
            $scope.create_task_module_fields = false;

            // $scope[$scope.form_model]['tasks'] = {};
            $scope[$scope.form_model]['tasks']['module_slug'] = $scope.selected_module;
            $scope[$scope.form_model]['tasks']['record_id'] = $scope.record_id;

            //selected module, selectd respective module record in edit page
            $scope.selected_module_name = '';
            if (isNotEmpty($scope.selected_module)) {
                $scope.selected_module_name = $filter('titlecase')($scope.selected_module);
                $scope.selected_module_name = $scope.selected_module_name.replace("_"," ");
            }

            $scope.selected_record_name = {};
            $scope.selected_record_name['record_id'] = $scope.pageOnLoadData.selected_record_value;
            
            $scope.job_client_id = $scope.pageOnLoadData.job_client_id;

            $scope.TagAccountCheck($scope.pageOnLoadData.task.tasks);
        }
    }
    // console.log("create form", $scope[$scope.form_model]);

    // angular.extend(this, $controller('DynamicFormCtrl', {$scope: $scope}));

    // $scope.convertNumberToString({
    //     'tasks' : ['priority', 'status']
    // });

    $scope.convertNumberToStringTask = function(fields_obj) {
        angular.forEach(fields_obj, function(fields_arr, obj_index) {
            angular.forEach(fields_arr, function(field) {
                // console.log("fields_arr", $scope[$scope.form_model][obj_index]);
                if (isObject($scope[$scope.form_model][obj_index])) {
                    $scope[$scope.form_model][obj_index][field] = returnAsString($scope[$scope.form_model][obj_index][field]);
                }

            });
        });
    }

    $scope.convertNumberToStringTask({
        'tasks' : ['priority', 'status']
    });

    $scope.isFieldVisible = function(field,bulk_form_id='') {
        return isVisibleFunc(field, $scope,bulk_form_id);
    }

    $scope.isConfigVisible = function(field)
    {
        return isConfigVisibleFunc(field, $scope);
    }

    $scope.fromQuickAdd = true;

    angular.extend(this, $controller('CommonFormEventsCtrl', {$scope: $scope}));  

    $scope.isDisabledField = function(field) {
        return disabledFunc(field, $scope);
    }

    //module specific task - selected module
    $scope.selectedTaskModule = function() {
        $scope.selected_module = $scope[$scope.form_model]['tasks']['module_slug'];
        if ($scope.selected_module == 'accounts')
            $scope[$scope.form_model]['tasks']['tag_account'] = 1;
    }

    if ($scope.layout_form_slug == 'module_specific_task_layout' && isEmpty($scope.task)) {
        // if (isNotEmpty($scope.selected_module) && isNotEmpty($scope.record_id)) {
        //     //show tag account, tag contact based on selected module
        //     if ($scope.selected_module == 'accounts') {
        //         $scope.show_tag_account = true;
        //         $scope.show_tag_contact = true;
        //     }
        // }
        $scope[$scope.form_model]['tasks'] = {};
        $scope[$scope.form_model]['tasks']['tag_account'] = 0;
        $scope[$scope.form_model]['tasks']['contact_ids'] = {};
    }

    if ($scope.layout_form_slug == 'module_specific_task_layout' && isEmpty(items.task)) {
        $scope[$scope.form_model]['tasks'] = {};
        $scope[$scope.form_model]['tasks']['status'] = '1';
        $scope[$scope.form_model]['tasks']['priority'] = '1';
        $scope[$scope.form_model]['tasks'].due_date = new Date();
        $scope[$scope.form_model]['tasks'].reminder_date_time = new Date();
        // $scope[$scope.form_model].reminder_time = hours + ':' + mins + ' ' + ampm;
    }
    $scope.saveTask = function() {
        
        $scope.setValidationErrorsForCustomForm();

        var curFormValidationSuccess = $scope[$scope.form_name]['form'].$valid;
        if (!curFormValidationSuccess) {
            showAngularFormValidationErrors();
            return false;
        }
        
        if ($scope.layout_form_slug == 'module_specific_task_layout') {
            //module and record not selected

            //automated tasks - not require module,record, reminder date and time
            if (isNotEmpty($scope.pageOnLoadData.task)) {
                var task_code = $scope.pageOnLoadData.task.tasks.code;
                task_code = task_code.substring(0,3);
                
                if (task_code !== 'TSK' && isEmpty($scope.selected_module)) {
                    showAlertMessage({'status':0, 'message':'Please select module'}); 
                    return false;  
                }
            }

            if (isEmpty($scope.pageOnLoadData.task) && isEmpty($scope.selected_module)) {
                showAlertMessage({'status':0, 'message':'Please select module'}); 
                return false;   
            }

            if ($scope.selected_module == 'accounts' && isNotEmpty($scope.pageOnLoadData.task) && (isEmpty($scope.record_id) || $scope.record_id == 0)) {
                //module_slug=accounts,record_id=0,tag_account=1/0,tag_contact have values
            } else {
                var task_code = null;
                if (isNotEmpty($scope.pageOnLoadData.task)) {
                    task_code = $scope.pageOnLoadData.task.tasks.code;
                    task_code = task_code.substring(0,3);
                }

                if ($scope.selected_module != 'calendar' && isEmpty($scope.record_id) && task_code !== 'TSK') {
                    showAlertMessage({'status':0, 'message':'Please select the record'}); 
                    return false;  
                }
            }

            //check tag account,tag contact
            if ( ($scope[$scope.form_model]['tasks']['tag_account'] == 0 && (typeof $scope[$scope.form_model]['tasks']['contact_ids'] != 'undefined' && $scope[$scope.form_model]['tasks']['contact_ids'].length == 0)) && ( $scope.selected_module == 'accounts' || ( $scope.selected_module == 'jobs' && $scope.job_client_id ) )) {
                var validation_msg = "Please select Associate with or Tag Account";
                showAlertMessage({ 'status': 0, 'message': validation_msg });
                return;
            }

            $scope[$scope.form_model]['tasks']['opportunity_id'] = $scope.record_id;

        }
        //return;
        
        var requestData = $scope[$scope.form_model];
        method = $scope.save_method;    
        save_url = $scope.save_url;	
        if (typeof $scope.formres == 'undefined') {
            $scope.formres = new FormData();
        }

       /*  angular.forEach($scope.taskfilesData, function(file, key) {
            $scope.formres.append('attachments[]', file); 
        }); */

        if (isNotEmpty($scope.taskDocuments)) {
            angular.forEach($scope.taskDocuments, function (file, key) {
                $scope.formres.append('attachments[]', file);
            });
        }

        if (method == 'PUT') {
        	$scope.formres.set("_method", "PUT");
        	$scope.formres.set("data", angular.toJson(requestData));
        } else {
        	$scope.formres.append("data", angular.toJson(requestData));
        }
        
        $scope.btn_loading = true;
        HrApiServices.postAttachment(save_url, $scope.formres).then(function(response) {
            $scope.btn_loading = false;
            $scope.cancel();
            if (response.data.status) {
                showAlertMessage({
                    status : 1,
                    message : response.data.message
                });
                $scope.getTableListData(1,'','tasks');                
            } else {
                showFormValidationErrorMessages(response);
            }
        }, function() {
            $scope.btn_loading = false;
            ajaxErrorCallBackFunc();
        });
    }
    $scope.uploadedTaskFile = function (element) {
        length_exceeded = false;

        if ($scope.taskfilesData.length > 4) {
            $scope.$apply(function($scope) {
                alert_response = {};
                alert_response['status'] = 0;
                alert_response['message'] = 'The total number of files should be maximum 5';
                showAlertMessage(alert_response);
            });
            return false;
        }

        if (parseInt(element.files[0]['size']) > 5242880) {
            $scope.$apply(function($scope) {
                showAlertMessage({
                    'status': 0,
                    'message': "File Size should not exceed 5 MB"
                });
            });
            return false;
        }
        
        $scope.$apply(function ($scope) {
            var objFile = { 'id': '', 'attachment_name': element.files[0]['name'] };
            if (!checkStringLength(objFile['attachment_name'])) {            
                length_exceeded = true;
                $scope.taskfilesData = element.files; 
                if (length_exceeded) {
                    element.value = null;
                    showAlertMessage({
                        status : 0,
                        message : CONFIG_MESSAGES.file_name_limit_exceeds
                    });
                }
                return false;
            }  
            if(!isValidExtension(objFile['attachment_name'])) {  
              element.value = null;               
              showAlertMessage({
                status : 0,
                message : CONFIG_MESSAGES.invalid_file_extension
              });   
              return false; 
            } 
            $scope.taskfilesData.push(objFile);
            $scope.taskDocuments.push(element.files[0]);
        });
    }

    $scope.downloadTaskAttachment = function(id) {
        downloadAttachments(WEB_API_URL + 'tasks/download_task_attachment/' + id);
    }
    $scope.removeFile = function(file) {
        ConfirmAlert.swal({
            title: "Are you sure?",
            text: "You want to delete this attachment",
            //type: "warning",
            imageUrl: $scope.alertdeleteimage,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }, function(isConfirm) {
            if (isConfirm) {
                if (file.id) {
                    HrApiServices.delete('tasks/delete_attachment/'+ file.id).then(function(response) {
                        var deleteResponse = response.data;
                        showAlertMessage(deleteResponse);
                    });
                }
                // $scope['files'].splice($scope['files'].indexOf(file), 1); 
                $scope['taskfilesData'].splice($scope['taskfilesData'].indexOf(file), 1);  
               
                if (isNotEmpty($scope.taskDocuments)) {
                    angular.forEach($scope.taskDocuments, function (k, v) {
                        if ($scope.taskDocuments[v]['name'] == file.attachment_name) {
                            $scope.taskDocuments.splice(v, 1);
                        }
                    });
                }   
            }
        });
    }

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.tagAndUnTagTaskUrl = function(task_id,is_tag) {
        if(is_tag == 0){
            tag_meesage = "You want to untag this link";
        }
        else{
            tag_meesage = "You want to tag this link";
        }
        ConfirmAlert.swal({
            title: "Are you sure?",
            text: tag_meesage,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }, function(isConfirm) {
            if (isConfirm) {
                params = {};
                params.is_tag = is_tag;
                HrApiServices.post('tasks/tagAndUnTagTaskUrl/'+task_id, params, true)
                .then(function success(response) {
                    showAlertMessage({
                        status : response.data.status,
                        message : response.data.data.message
                    });
                    $scope['task']['tasks']['append_url_for_tasks'] = response.data.data.append_url_for_tasks;
                });
            }
        });
    }

    $scope.SaveNotes = function(ActionUrl,comments) { 
        postData = {};
        // postData['task_id'] =  RecordID;
        postData['task_id']     =  $scope.task_id;//$scope.ViewRecordID;
        postData['comments']    =  comments;

        if (comments) { 
            HrApiServices.post(ActionUrl,postData,true).then(function success(response) {
                if (response.data.status == 1) {
                  showAlertMessage({'status':1, 'message':response.data.message});
                  $scope.get_comments($scope.task_id);
                  $scope.task_comments.comments = '';
                } else {
                    message = response.data.message;
                    if (typeof response.data.validations !='undefined') {
                      for (field_name in response.data.validations) {
                          message += response.data.validations[field_name];
                      }
                    }
                  showAlertMessage({'status':0, 'message': message});
                }            
              }, function(error) {
                showAlertMessage({'status':0, 'message':"{{trans('messages.invalid_operation')}}"});          
                });
            } else {
                $scope.errorSubmit=1;
            }
    }

    if ($scope.module_id == 1) {
        $scope.account_contacts = {};
        $scope.account_contacts = items.job_account_contacts;
    }
});

App.controller('TaskTagModulesCtrl', function($scope, $timeout, $http, ConfirmAlert, $uibModal, $rootScope, $filter, $sce, HrApiServices, $controller) {
    $scope.selectedModuleIds = [];
    $scope.selectedModuleIds = {'job_id':[],'candidate_id':[],'account_id':[],'contact_id':[],'opportunity_id':[],'lead_id':[],'submission_id':[],'resource_pool_id':[]};
    $scope.SearchListData = [];

    $scope.getJobsListPopupFromTasks = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'JobSearchCheckboxModal.html',
            controller: 'JobSearchFromTasksModalInstanceCtrl',
            size:'xl modal-dialog-scrollable',
            window: 'fixed-center',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                items: function () {
                    return { 'items': $scope.SearchListData['job_id']};
                },

            }
        });
        modalInstance.result.then(function (selectedItem) {
            if(isEmpty($scope.SearchListData)) {
                $scope.SearchListData = {'job_id' : []};
            } else {
                $scope.SearchListData.job_id = [];
            }
            angular.forEach(selectedItem, function (v, k) {
                $scope.SearchListData['job_id'].push(v);
            });

            $scope.getSelectedTasksJobsData();
        }, function () {

        });
    }

    $scope.getSelectedTasksJobsData = function () {
        postData = {}
        postData.SearchDataID = $scope.SearchListData['job_id'];
        HrApiServices.post("notes/getSelectedJobs", postData, true).then(function (success) {
            $scope.task_jobs = success.data.jobs;
            $scope.total = success.data.total;
            if (success.data.total) {
                $scope.selectedModuleIds['job_id'] = $scope.task_jobs;
            }
        }, function (error) {

        });
    }

    $scope.getCandidatesListPopupFromTasks = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'CandidateSearchCheckboxModal.html',
            controller: 'CandidateSearchFromTasksModalInstanceCtrl',
            size: 'xl modal-dialog-scrollable',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                items: function () {
                    return { 'items': $scope.SearchListData['candidate_id'], 'is_non_blocked_candidates': 1, 'listType': 'candidates', 'is_all_candidates': 1,'url': 'candidates','custom_view_id':'all' };
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            if(isEmpty($scope.SearchListData)) {
                $scope.SearchListData = {'candidate_id' : []};
            } else {
                $scope.SearchListData.candidate_id = [];
            }
            angular.forEach(selectedItem, function (v, k) {
                $scope.SearchListData['candidate_id'].push(v);  
            });
            $scope.getSelectedTasksCandidatesData();
        }, function () {

        });
    }

    $scope.getSelectedTasksCandidatesData = function () {
        postData = {}
        postData.SearchDataID = $scope.SearchListData['candidate_id'];

        HrApiServices.post("notes/getSelectedCandidates", postData, true).then(function (success) {
            $scope.task_candidates = success.data.candidates;
            $scope.total = success.data.total;
            if (success.data.total) {
                $scope.selectedModuleIds['candidate_id'] = $scope.task_candidates;
            }
        }, function (error) {

        });
    }

    $scope.getAccountsListPopupFromTasks = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'AccountSearchCheckboxModal.html',
            controller: 'AccountSearchFromTasksModalInstanceCtrl',
            size: 'xl modal-dialog-scrollable',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                items: function () {
                    return { 'items': $scope.SearchListData['account_id'] };
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            if(isEmpty($scope.SearchListData)) {
                $scope.SearchListData = {'account_id' : []};
            } else {
                $scope.SearchListData.account_id = [];
            }
            angular.forEach(selectedItem, function (v, k) {
                $scope.SearchListData['account_id'].push(v);  
            });
            $scope.getSelectedTasksAccountsData();
        }, function () {

        });
    }

    $scope.getSelectedTasksAccountsData = function () {
        postData = {}
        postData.SearchDataID = $scope.SearchListData['account_id'];

        HrApiServices.post("notes/getSelectedAccounts", postData, true).then(function (success) {
            $scope.task_accounts = success.data.accounts;
            $scope.total = success.data.total;
            if (success.data.total) {
                $scope.selectedModuleIds['account_id'] = $scope.task_accounts;
            }
        }, function (error) {

        });
    }

    $scope.getContactsListPopupFromTasks = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'ContactSearchCheckboxModal.html',
            controller: 'ContactSearchFromTasksModalInstanceCtrl',
            size: 'xl modal-dialog-scrollable',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                items: function () {
                    return { 'items': $scope.SearchListData['contact_id'] };
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            if(isEmpty($scope.SearchListData)) {
                $scope.SearchListData = {'contact_id' : []};
            } else {
                $scope.SearchListData.contact_id = [];
            }
            angular.forEach(selectedItem, function (v, k) {
                $scope.SearchListData['contact_id'].push(v);  
            });
            $scope.getSelectedTasksContactsData();
        }, function () {

        });
    }

    $scope.getSelectedTasksContactsData = function () {
        postData = {}
        postData.SearchDataID = $scope.SearchListData['contact_id'];

        HrApiServices.post("notes/getSelectedContacts", postData, true).then(function (success) {
            $scope.task_contacts = success.data.contacts;
            $scope.total = success.data.total;
            if (success.data.total) {
                $scope.selectedModuleIds['contact_id'] = $scope.task_contacts;
            }
        }, function (error) {

        });
    }

    $scope.getOpportunitiesListPopupFromTasks = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'OpportunitySearchCheckboxModal.html',
            controller: 'OpportunitySearchFromTasksModalInstanceCtrl',
            size: 'xl modal-dialog-scrollable',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                items: function () {
                    return { 'items': $scope.SearchListData['opportunity_id'] };
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            if(isEmpty($scope.SearchListData)) {
                $scope.SearchListData = {'opportunity_id' : []};
            } else {
                $scope.SearchListData.opportunity_id = [];
            }
            angular.forEach(selectedItem, function (v, k) {
                $scope.SearchListData['opportunity_id'].push(v);  
            });
            $scope.getSelectedTasksOpportunitiesData();
        }, function () {

        });
    }

    $scope.getSelectedTasksOpportunitiesData = function () {
        postData = {}
        postData.SearchDataID = $scope.SearchListData['opportunity_id'];

        HrApiServices.post("notes/getSelectedOpportunities", postData, true).then(function (success) {
            $scope.task_opportunities = success.data.opportunities;
            $scope.total = success.data.total;
            if (success.data.total) {
                $scope.selectedModuleIds['opportunity_id'] = $scope.task_opportunities;
            }
        }, function (error) {

        });
    }

    $scope.getLeadsListPopupFromTasks = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'LeadSearchCheckboxModal.html',
            controller: 'LeadSearchFromTasksModalInstanceCtrl',
            size: 'xl modal-dialog-scrollable',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                items: function () {
                    return { 'items': $scope.SearchListData['lead_id'] };
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            if(isEmpty($scope.SearchListData)) {
                $scope.SearchListData = {'lead_id' : []};
            } else {
                $scope.SearchListData.lead_id = [];
            }
            angular.forEach(selectedItem, function (v, k) {
                $scope.SearchListData['lead_id'].push(v);  
            });
            $scope.getSelectedTasksLeadsData();
        }, function () {

        });
    }

    $scope.getSelectedTasksLeadsData = function () {
        postData = {}
        postData.SearchDataID = $scope.SearchListData['lead_id'];

        HrApiServices.post("notes/getSelectedLeads", postData, true).then(function (success) {
            $scope.task_leads = success.data.leads;
            $scope.total = success.data.total;
            if (success.data.total) {
                $scope.selectedModuleIds['lead_id'] = $scope.task_leads;
            }
        }, function (error) {

        });
    }

    $scope.getSubmissionsListPopupFromTasks = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'SubmissionSearchCheckboxModal.html',
            controller: 'SubmissionSearchFromTasksModalInstanceCtrl',
            size: 'xl modal-dialog-scrollable',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                items: function () {
                    return { 'items': $scope.SearchListData['submission_id'] };
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            if(isEmpty($scope.SearchListData)) {
                $scope.SearchListData = {'submission_id' : []};
            } else {
                $scope.SearchListData.submission_id = [];
            }
            angular.forEach(selectedItem, function (v, k) {
                $scope.SearchListData['submission_id'].push(v);  
            });
            $scope.getSelectedTasksSubmissionsData();
        }, function () {

        });
    }

    $scope.getSelectedTasksSubmissionsData = function () {
        postData = {}
        postData.SearchDataID = $scope.SearchListData['submission_id'];

        HrApiServices.post("notes/getSelectedSubmissions", postData, true).then(function (success) {
            $scope.task_submissions = success.data.submissions;
            $scope.total = success.data.total;
            if (success.data.total) {
                $scope.selectedModuleIds['submission_id'] = $scope.task_submissions;
            }
        }, function (error) {

        });
    }

    $scope.getResourcePoolListPopupFromTasks = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'CandidateSearchCheckboxModal.html',
            controller: 'CandidateSearchFromTasksModalInstanceCtrl',
            size: 'xl modal-dialog-scrollable',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                items: function () {
                    return { 'items': $scope.SearchListData['resource_pool_id'], 'url': 'resourcePool', 'custom_view_id':'all_list' };
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            if(isEmpty($scope.SearchListData)) {
                $scope.SearchListData = {'resource_pool_id' : []};
            } else {
                $scope.SearchListData.resource_pool_id = [];
            }
            angular.forEach(selectedItem, function (v, k) {
                $scope.SearchListData['resource_pool_id'].push(v);  
            });
            $scope.getSelectedTasksResourcePoolData();
        }, function () {

        });
    }

    $scope.getSelectedTasksResourcePoolData = function () {
        postData = {}
        postData.SearchDataID = $scope.SearchListData['resource_pool_id'];

        HrApiServices.post("notes/getSelectedCandidates", postData, true).then(function (success) {
            $scope.task_candidates = success.data.candidates;
            $scope.total = success.data.total;
            if (success.data.total) {
                $scope.selectedModuleIds['resource_pool_id'] = $scope.task_candidates;
            }
        }, function (error) {

        });
    }
});

App.controller('JobSearchFromTasksModalInstanceCtrl', function ($scope, $uibModalInstance, items, $http, $rootScope, $filter, $uibModal, $state, HireApiServices, $timeout, ConfirmAlert) {    
    $scope.pageno = 1;
    $scope.itemsPerPage = 15;
    $scope.pagination = {};
    $scope.itemsPerPage_new = 15;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isEmpty = function (obj) {
        for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        return true;
    };

    $scope.getLocation = function (obj) {
        var loc = [];
        if (obj.city) {
            loc.push(obj.city);
        }
        if (obj.state) {
            loc.push(obj.state);
        }

        if (obj.country) {
            loc.push(obj.country);
        }

        return loc.toString();
    }

    $scope.getSearchJobList = function (pageno) {
        $scope.pageno = pageno;
        $scope.list_data = [];
        $scope.currentPage = $scope.pagination['currentPage'] = pageno;
        postData = {};
        postData.limit = $scope.itemsPerPage;
        postData.page = pageno;
        postData.order = 'id';
        postData.sort = 'desc';
        postData.custom_view_id = 'all';

        postData.is_list_for_popup = 1;
        postData.SearchData = {};
        postData.searchFields = {};
        postData.getActiveJobs = 1;

        postData.header_columns = { "id": "id", "code": "code", "title": 'title', 'state': 'state', 'city': 'city', 'country': 'country', 'created_at': 'created_at', 'created_by': 'created_by', 'updated_at': 'updated_at', 'client': 'client' };
        postData.default_search_filter = $scope.default_search_filter;

        HireApiServices.post("jobs", postData, true).then(function success(response) {
            $scope.showTooltip = false;
            $scope.list_data = response.data.data.list;
            $scope.total_count = response.data.data.pagination.total;
            $scope.table_headers_list = response.data.data.columns;
            $scope.maxPageLimit = response.data.data.pagination.last_page;
        });
    }
    $scope.getSearchJobList(1);

    $scope.getItemPerChange = function () {
        $scope.itemsPerPage = $scope.itemsPerPage_new;
        $scope.getSearchJobList(1);
    }

    $scope.clearGoToText = function() {
        $scope.pagination.goto_page_num = '';
        $scope.pagination['currentPage'] = 1;
        $scope.getSearchJobList(1);
    }

    $scope.JobIDs = items.items;
    $scope.selectedLabelList = [];

    if (isNotEmpty($scope.JobIDs)) {
        angular.forEach($scope.JobIDs, function (val, key) {
            $scope.selectedLabelList[val] = parseInt(val);
        });
    }

    $scope.isSelectAll = function (event, master) {
        if (master) {
            for (var i = 0; i < $scope.list_data.length; i++) {
                id = $scope.list_data[i].id
                $scope.selectedLabelList[id] = id;
            }
        }
        else {
            $scope.master = false;
            $scope.selectedLabelList = [];
        }
    }

    $scope.isLabelChecked = function (curid) {
        var len = 0;
        $scope.master = [];
        $scope.hideShow = 0;
        angular.forEach($scope.selectedLabelList, function (val, key) {
            if (val) {
                len = len + 1;
            }
        });
        if (parseInt($scope.list_data.length) == parseInt(len)) {
            $scope.master = true;
        } else {
            $scope.master = false;
        }
        if (len == 0) {
            $scope.selectedLabelList = [];
            $scope.hideShow = 1;
        }
    }

    $scope.addToNoteselected = function () {
        if (isNotEmpty($scope.selectedLabelList)) {
            var selectedIds = [];
            angular.forEach($scope.selectedLabelList, function (v, k) {
                if (v) {
                    selectedIds.push(v);
                }
            });

            if (selectedIds.length > 1 && items.limitedJobs) {
                showAlertMessage({"success":0,"message":"Please select maximum of one Job only"});
                return;
            }

            $uibModalInstance.close(selectedIds);
        } else {
            showAlertMessage({ 'status': 0, 'message': 'Please select a job' });
        }
    }
});

App.controller('CandidateSearchFromTasksModalInstanceCtrl', function ($scope, $uibModalInstance, items, $http, $rootScope, $filter, $uibModal, HireApiServices, $sessionStorage, ConfirmAlert) {
    $scope.JobID = items.items;
    $scope.selectedLabelList = [];
    $scope.tagcandidateToJob = 0;
    $scope.pageno = 1;
    $scope.itemsPerPage = 15;
    $scope.itemsPerPage_new = 15;

    $scope.url = items.url;
    $scope.custom_view_id = items.custom_view_id;
     
    if (typeof items.tagcandidateToJob !== 'undefined') {
        $scope.tagcandidateToJob = items.tagcandidateToJob;
    }

    $scope.getLocation = function (obj) {
        var loc = [];
        if (obj.city) {
            loc.push(obj.city);
        }
        if (obj.state) {
            loc.push(obj.state);
        }

        if (obj.country) {
            loc.push(obj.country);
        }

        return loc.toString();
    }

    $scope.isLabelChecked = function (curid) {
        var len = 0;
        $scope.master = [];
        $scope.hideShow = 0;
        angular.forEach($scope.selectedLabelList, function (val, key) {
            if (val) {
                len = len + 1;
            }
        });
        if (parseInt($scope.list_data.length) == parseInt(len)) {
            $scope.master = true;
        } else {
            $scope.master = false;
        }
        if (len == 0) {
            $scope.selectedLabelList = [];
            $scope.hideShow = 1;
        }
    }

    $scope.isSelectAll = function (event, master) {
        if (master) {
            for (var i = 0; i < $scope.list_data.length; i++) {
                id = $scope.list_data[i].id
                $scope.selectedLabelList[id] = id;
            }
        }
        else {
            $scope.master = false;
            $scope.selectedLabelList = [];
        }
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isEmpty = function (obj) {
        for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        return true;
    };

    $scope.getItemPerChange = function () {
        $scope.itemsPerPage = $scope.itemsPerPage_new;
        $scope.getSearchCandidateList(1);
    }

    $scope.getSearchCandidateList = function (pageno) {
        $scope.pageno = pageno;
        $scope.list_data = [];
        $scope.currentPage = pageno;
        postData = {};
        postData.limit = $scope.itemsPerPage;
        postData.page = pageno;
        postData.order = 'id';
        postData.sort = 'desc';
        postData.custom_view_id = $scope.custom_view_id;
        postData.activePoolCategory = 1;
        postData.is_all_candidates = $scope.is_all_candidates;
        postData.quick_list = 1;
        postData.is_child_list = 1;
        postData.SearchData = {};
        postData.searchFields = {};
        $scope.pagination = {};
        $scope.pagination['currentPage'] = pageno;

        if (isNotEmpty(items['is_all_candidates'])) {
            postData.is_all_candidates = 1;
        }

        if (isNotEmpty(items['is_non_blocked_candidates'])) {
            postData.is_non_blocked_candidates = 1;
        }
        postData.is_check_active_status_category = 1;

        postData.header_columns = { "id": "id", "applicant_id": "applicant_id", "first_name": "First Name", "last_name": 'last_name', 'job_title': 'job_title', 'state': 'state', 'city': 'city', 'country': 'country', 'owner_ship': 'owner_ship', 'created_at': 'created_at', 'created_by': 'created_by', 'updated_at': 'updated_at','email':'email' };

        postData.default_search_filter = $scope.default_search_filter;
        HireApiServices.post($scope.url, postData, true).then(function (response) {
            $scope.showTooltip = false;
            $scope.list_data = response.data.data.list;
            $scope.total_count = response.data.data.pagination.total;
            $scope.table_headers_list = response.data.data.columns;
        }, function (error) {

        });
    }

    $scope.addToNote = function () {
        if (isNotEmpty($scope.selectedLabelList)) {
            var selectedIds = [];
            angular.forEach($scope.selectedLabelList, function (v, k) {
                if (v) {
                    selectedIds.push(v);
                }
            });

            if (selectedIds.length > 1 && items.limitedCandidates) {
                showAlertMessage({"success":0,"message":"Please select maximum of one Candidate only"});
                return;
            }

            $uibModalInstance.close(selectedIds);
        } else {
            showAlertMessage({ 'status': 0, 'message': 'Please select a candidate' });
        }
    }
    
    $scope.getSearchCandidateList(1);

    $scope.CandidateIDs = items.items;
    $scope.selectedLabelList = [];

    if (isNotEmpty($scope.CandidateIDs)) {
        angular.forEach($scope.CandidateIDs, function (val, key) {
            $scope.selectedLabelList[val] = parseInt(val);
        });
    }
});

App.controller('AccountSearchFromTasksModalInstanceCtrl', function ($scope, $uibModalInstance, items, $http, $rootScope, $filter, $uibModal, $state, HireApiServices, $timeout, ConfirmAlert) {    
    $scope.pageno = 1;
    $scope.itemsPerPage = 15;
    $scope.pagination = {};
    $scope.itemsPerPage_new = 15;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isEmpty = function (obj) {
        for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        return true;
    };

    $scope.getSearchAccountList = function (pageno) {
        $scope.pageno = pageno;
        $scope.list_data = [];
        $scope.currentPage = $scope.pagination['currentPage'] = pageno;
        postData = {};
        postData.limit = $scope.itemsPerPage;
        postData.page = pageno;
        postData.order = 'id';
        postData.sort = 'desc';
        postData.custom_view_id = 'all';

        postData.is_list_for_popup = 1;
        postData.SearchData = {};
        postData.searchFields = {};

        postData.header_columns = { "id": "id", "account_name": "account_name", "type": 'type', 'website': 'website'};
        postData.default_search_filter = $scope.default_search_filter;

        HireApiServices.post("accounts/get_list", postData, true).then(function success(response) {
            $scope.showTooltip = false;
            $scope.list_data = response.data.data.list;
            $scope.total_count = response.data.data.pagination.total;
            $scope.table_headers_list = response.data.data.columns;
            $scope.maxPageLimit = response.data.data.pagination.last_page;
        });
    }
    $scope.getSearchAccountList(1);

     $scope.getItemPerChange = function () {
        $scope.itemsPerPage = $scope.itemsPerPage_new;
        $scope.getSearchAccountList(1);
    }

    $scope.clearGoToText = function() {
        $scope.pagination.goto_page_num = '';
        $scope.pagination['currentPage'] = 1;
        $scope.getSearchAccountList(1);
    }

    $scope.AccountIDs = items.items;
    $scope.selectedLabelList = [];

    if (isNotEmpty($scope.AccountIDs)) {
        angular.forEach($scope.AccountIDs, function (val, key) {
            $scope.selectedLabelList[val] = parseInt(val);
        });
    }

    $scope.isSelectAll = function (event, master) {
        if (master) {
            for (var i = 0; i < $scope.list_data.length; i++) {
                id = $scope.list_data[i].id
                $scope.selectedLabelList[id] = id;
            }
        }
        else {
            $scope.master = false;
            $scope.selectedLabelList = [];
        }
    }

    $scope.isLabelChecked = function (curid) {
        var len = 0;
        $scope.master = [];
        $scope.hideShow = 0;
        angular.forEach($scope.selectedLabelList, function (val, key) {
            if (val) {
                len = len + 1;
            }
        });
        if (parseInt($scope.list_data.length) == parseInt(len)) {
            $scope.master = true;
        } else {
            $scope.master = false;
        }
        if (len == 0) {
            $scope.selectedLabelList = [];
            $scope.hideShow = 1;
        }
    }

    $scope.addToNoteselected = function () {
        if (isNotEmpty($scope.selectedLabelList)) {
            var selectedIds = [];
            angular.forEach($scope.selectedLabelList, function (v, k) {
                if (v) {
                    selectedIds.push(v);
                }
            });

            if (selectedIds.length > 1 && items.limitedJobs) {
                showAlertMessage({"success":0,"message":"Please select maximum of one Account only"});
                return;
            }

            $uibModalInstance.close(selectedIds);
        } else {
            showAlertMessage({ 'status': 0, 'message': 'Please select a account' });
        }
    }
});

App.controller('ContactSearchFromTasksModalInstanceCtrl', function ($scope, $uibModalInstance, items, $http, $rootScope, $filter, $uibModal, $state, HireApiServices, $timeout, ConfirmAlert) {    
    $scope.pageno = 1;
    $scope.itemsPerPage = 15;
    $scope.pagination = {};
    $scope.itemsPerPage_new = 15;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isEmpty = function (obj) {
        for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        return true;
    };

    $scope.getSearchContactList = function (pageno) {
        $scope.pageno = pageno;
        $scope.list_data = [];
        $scope.currentPage = $scope.pagination['currentPage'] = pageno;
        postData = {};
        postData.limit = $scope.itemsPerPage;
        postData.page = pageno;
        postData.order = 'id';
        postData.sort = 'desc';
        postData.custom_view_id = 'all';

        postData.is_list_for_popup = 1;
        postData.SearchData = {};
        postData.searchFields = {};

        postData.header_columns = { "id": "id", "first_name": "first_name", "last_name": 'last_name', 'email_id': 'email_id'};
        postData.default_search_filter = $scope.default_search_filter;

        HireApiServices.post("accounts/contacts/get_list", postData, true).then(function success(response) {
            $scope.showTooltip = false;
            $scope.list_data = response.data.data.list;
            $scope.total_count = response.data.data.pagination.total;
            $scope.table_headers_list = response.data.data.columns;
            $scope.maxPageLimit = response.data.data.pagination.last_page;
        });
    }
    $scope.getSearchContactList(1);

    $scope.getItemPerChange = function () {
        $scope.itemsPerPage = $scope.itemsPerPage_new;
        $scope.getSearchContactList(1);
    }

    $scope.clearGoToText = function() {
        $scope.pagination.goto_page_num = '';
        $scope.pagination['currentPage'] = 1;
        $scope.getSearchContactList(1);
    }

    $scope.ContactIDs = items.items;
    $scope.selectedLabelList = [];

    if (isNotEmpty($scope.ContactIDs)) {
        angular.forEach($scope.ContactIDs, function (val, key) {
            $scope.selectedLabelList[val] = parseInt(val);
        });
    }

    $scope.isSelectAll = function (event, master) {
        if (master) {
            for (var i = 0; i < $scope.list_data.length; i++) {
                id = $scope.list_data[i].id
                $scope.selectedLabelList[id] = id;
            }
        }
        else {
            $scope.master = false;
            $scope.selectedLabelList = [];
        }
    }

    $scope.isLabelChecked = function (curid) {
        var len = 0;
        $scope.master = [];
        $scope.hideShow = 0;
        angular.forEach($scope.selectedLabelList, function (val, key) {
            if (val) {
                len = len + 1;
            }
        });
        if (parseInt($scope.list_data.length) == parseInt(len)) {
            $scope.master = true;
        } else {
            $scope.master = false;
        }
        if (len == 0) {
            $scope.selectedLabelList = [];
            $scope.hideShow = 1;
        }
    }

    $scope.addToNoteselected = function () {
        if (isNotEmpty($scope.selectedLabelList)) {
            var selectedIds = [];
            angular.forEach($scope.selectedLabelList, function (v, k) {
                if (v) {
                    selectedIds.push(v);
                }
            });

            if (selectedIds.length > 1 && items.limitedJobs) {
                showAlertMessage({"success":0,"message":"Please select maximum of one Contact only"});
                return;
            }

            $uibModalInstance.close(selectedIds);
        } else {
            showAlertMessage({ 'status': 0, 'message': 'Please select a contact' });
        }
    }
});

App.controller('OpportunitySearchFromTasksModalInstanceCtrl', function ($scope, $uibModalInstance, items, $http, $rootScope, $filter, $uibModal, $state, HireApiServices, $timeout, ConfirmAlert) {    
    $scope.pageno = 1;
    $scope.itemsPerPage = 15;
    $scope.pagination = {};
    $scope.itemsPerPage_new = 15;


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isEmpty = function (obj) {
        for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        return true;
    };

    $scope.getSearchOpportunityList = function (pageno) {
        $scope.pageno = pageno;
        $scope.list_data = [];
        $scope.currentPage = $scope.pagination['currentPage'] = pageno;
        postData = {};
        postData.limit = $scope.itemsPerPage;
        postData.page = pageno;
        postData.order = 'id';
        postData.sort = 'desc';
        postData.custom_view_id = 'all';

        postData.is_list_for_popup = 1;
        postData.SearchData = {};
        postData.searchFields = {};

        postData.header_columns = { "id": "id", "code": "code", "opportunity_name": 'opportunity_name', 'client': 'client'};
        postData.default_search_filter = $scope.default_search_filter;

        HireApiServices.post("opportunities/list/0", postData, true).then(function success(response) {
            $scope.showTooltip = false;
            $scope.list_data = response.data.data.list;
            $scope.total_count = response.data.data.pagination.total;
            $scope.table_headers_list = response.data.data.columns;
            $scope.maxPageLimit = response.data.data.pagination.last_page;
        });
    }
    $scope.getSearchOpportunityList(1);

    $scope.getItemPerChange = function () {
        $scope.itemsPerPage = $scope.itemsPerPage_new;
        $scope.getSearchOpportunityList(1);
    }

    $scope.clearGoToText = function() {
        $scope.pagination.goto_page_num = '';
        $scope.pagination['currentPage'] = 1;
        $scope.getSearchOpportunityList(1);
    }

    $scope.OpportunityIDs = items.items;
    $scope.selectedLabelList = [];

    if (isNotEmpty($scope.OpportunityIDs)) {
        angular.forEach($scope.OpportunityIDs, function (val, key) {
            $scope.selectedLabelList[val] = parseInt(val);
        });
    }

    $scope.isSelectAll = function (event, master) {
        if (master) {
            for (var i = 0; i < $scope.list_data.length; i++) {
                id = $scope.list_data[i].id
                $scope.selectedLabelList[id] = id;
            }
        }
        else {
            $scope.master = false;
            $scope.selectedLabelList = [];
        }
    }

    $scope.isLabelChecked = function (curid) {
        var len = 0;
        $scope.master = [];
        $scope.hideShow = 0;
        angular.forEach($scope.selectedLabelList, function (val, key) {
            if (val) {
                len = len + 1;
            }
        });
        if (parseInt($scope.list_data.length) == parseInt(len)) {
            $scope.master = true;
        } else {
            $scope.master = false;
        }
        if (len == 0) {
            $scope.selectedLabelList = [];
            $scope.hideShow = 1;
        }
    }

    $scope.addToNoteselected = function () {
        if (isNotEmpty($scope.selectedLabelList)) {
            var selectedIds = [];
            angular.forEach($scope.selectedLabelList, function (v, k) {
                if (v) {
                    selectedIds.push(v);
                }
            });

            if (selectedIds.length > 1 && items.limitedJobs) {
                showAlertMessage({"success":0,"message":"Please select maximum of one Account only"});
                return;
            }

            $uibModalInstance.close(selectedIds);
        } else {
            showAlertMessage({ 'status': 0, 'message': 'Please select a opportunity' });
        }
    }
});

App.controller('LeadSearchFromTasksModalInstanceCtrl', function ($scope, $uibModalInstance, items, $http, $rootScope, $filter, $uibModal, $state, HireApiServices, $timeout, ConfirmAlert) {    
    $scope.pageno = 1;
    $scope.itemsPerPage = 15;
    $scope.pagination = {};
    $scope.itemsPerPage_new = 15;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isEmpty = function (obj) {
        for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        return true;
    };

    $scope.getSearchLeadList = function (pageno) {
        $scope.pageno = pageno;
        $scope.list_data = [];
        $scope.currentPage = $scope.pagination['currentPage'] = pageno;
        postData = {};
        postData.limit = $scope.itemsPerPage;
        postData.page = pageno;
        postData.order = 'id';
        postData.sort = 'desc';
        postData.custom_view_id = 'all';

        postData.is_list_for_popup = 1;
        postData.SearchData = {};
        postData.searchFields = {};

        postData.header_columns = { "id": "id", "first_name": "first_name", "last_name": 'last_name', 'email_id': 'email_id'};
        postData.default_search_filter = $scope.default_search_filter;

        HireApiServices.post("leads/list/0", postData, true).then(function success(response) {
            $scope.showTooltip = false;
            $scope.list_data = response.data.data.list;
            $scope.total_count = response.data.data.pagination.total;
            $scope.table_headers_list = response.data.data.columns;
            $scope.maxPageLimit = response.data.data.pagination.last_page;
        });
    }
    $scope.getSearchLeadList(1);

    $scope.getItemPerChange = function () {
        $scope.itemsPerPage = $scope.itemsPerPage_new;
        $scope.getSearchLeadList(1);
    }

    $scope.clearGoToText = function() {
        $scope.pagination.goto_page_num = '';
        $scope.pagination['currentPage'] = 1;
        $scope.getSearchLeadList(1);
    }

    $scope.LeadIDs = items.items;
    $scope.selectedLabelList = [];

    if (isNotEmpty($scope.LeadIDs)) {
        angular.forEach($scope.LeadIDs, function (val, key) {
            $scope.selectedLabelList[val] = parseInt(val);
        });
    }

    $scope.isSelectAll = function (event, master) {
        if (master) {
            for (var i = 0; i < $scope.list_data.length; i++) {
                id = $scope.list_data[i].id
                $scope.selectedLabelList[id] = id;
            }
        }
        else {
            $scope.master = false;
            $scope.selectedLabelList = [];
        }
    }

    $scope.isLabelChecked = function (curid) {
        var len = 0;
        $scope.master = [];
        $scope.hideShow = 0;
        angular.forEach($scope.selectedLabelList, function (val, key) {
            if (val) {
                len = len + 1;
            }
        });
        if (parseInt($scope.list_data.length) == parseInt(len)) {
            $scope.master = true;
        } else {
            $scope.master = false;
        }
        if (len == 0) {
            $scope.selectedLabelList = [];
            $scope.hideShow = 1;
        }
    }

    $scope.addToNoteselected = function () {
        if (isNotEmpty($scope.selectedLabelList)) {
            var selectedIds = [];
            angular.forEach($scope.selectedLabelList, function (v, k) {
                if (v) {
                    selectedIds.push(v);
                }
            });

            if (selectedIds.length > 1 && items.limitedJobs) {
                showAlertMessage({"success":0,"message":"Please select maximum of one Account only"});
                return;
            }

            $uibModalInstance.close(selectedIds);
        } else {
            showAlertMessage({ 'status': 0, 'message': 'Please select a lead' });
        }
    }
});

App.controller('SubmissionSearchFromTasksModalInstanceCtrl', function ($scope, $uibModalInstance, items, $http, $rootScope, $filter, $uibModal, $state, HireApiServices, $timeout, ConfirmAlert) {    
    $scope.pageno = 1;
    $scope.itemsPerPage = 15;
    $scope.pagination = {};
    $scope.itemsPerPage_new = 15;


    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.isEmpty = function (obj) {
        for (var i in obj) if (obj.hasOwnProperty(i)) return false;
        return true;
    };

    $scope.getSearchSubmissionList = function (pageno) {
        $scope.pageno = pageno;
        $scope.list_data = [];
        $scope.currentPage = $scope.pagination['currentPage'] = pageno;
        postData = {};
        postData.limit = $scope.itemsPerPage;
        postData.page = pageno;
        postData.order = 'id';
        postData.sort = 'desc';
        postData.custom_view_id = 'all';

        postData.is_list_for_popup = 1;
        postData.SearchData = {};
        postData.searchFields = {};

        postData.header_columns = { "id": "id", "job_submissions.submission_id": "job_submissions.submission_id", "candidates.first_name": 'candidates.first_name', 'candidates.last_name': 'candidates.last_name'};
        postData.default_search_filter = $scope.default_search_filter;

        HireApiServices.post("applications", postData, true).then(function success(response) {
            $scope.showTooltip = false;
            $scope.list_data = response.data.data.list;
            $scope.total_count = response.data.data.pagination.total;
            $scope.table_headers_list = response.data.data.columns;
            $scope.maxPageLimit = response.data.data.pagination.last_page;
        });
    }
    $scope.getSearchSubmissionList(1);

    $scope.getItemPerChange = function () {
        $scope.itemsPerPage = $scope.itemsPerPage_new;
        $scope.getSearchSubmissionList(1);
    }

    $scope.clearGoToText = function() {
        $scope.pagination.goto_page_num = '';
        $scope.pagination['currentPage'] = 1;
        $scope.getSearchSubmissionList(1);
    }

    $scope.LeadIDs = items.items;
    $scope.selectedLabelList = [];

    if (isNotEmpty($scope.LeadIDs)) {
        angular.forEach($scope.LeadIDs, function (val, key) {
            $scope.selectedLabelList[val] = parseInt(val);
        });
    }

    $scope.isSelectAll = function (event, master) {
        if (master) {
            for (var i = 0; i < $scope.list_data.length; i++) {
                id = $scope.list_data[i].id
                $scope.selectedLabelList[id] = id;
            }
        }
        else {
            $scope.master = false;
            $scope.selectedLabelList = [];
        }
    }

    $scope.isLabelChecked = function (curid) {
        var len = 0;
        $scope.master = [];
        $scope.hideShow = 0;
        angular.forEach($scope.selectedLabelList, function (val, key) {
            if (val) {
                len = len + 1;
            }
        });
        if (parseInt($scope.list_data.length) == parseInt(len)) {
            $scope.master = true;
        } else {
            $scope.master = false;
        }
        if (len == 0) {
            $scope.selectedLabelList = [];
            $scope.hideShow = 1;
        }
    }

    $scope.addToNoteselected = function () {
        if (isNotEmpty($scope.selectedLabelList)) {
            var selectedIds = [];
            angular.forEach($scope.selectedLabelList, function (v, k) {
                if (v) {
                    selectedIds.push(v);
                }
            });

            if (selectedIds.length > 1 && items.limitedJobs) {
                showAlertMessage({"success":0,"message":"Please select maximum of one Submission only"});
                return;
            }

            $uibModalInstance.close(selectedIds);
        } else {
            showAlertMessage({ 'status': 0, 'message': 'Please select a submission' });
        }
    }
});