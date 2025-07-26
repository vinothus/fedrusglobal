const CUSTOM_SLUG = 'custom';

const DATE_FILTER_SLUG_OPTIONS = {
	'ALL_SLUG' : 'all',
	'TODAY_SLUG' : 'today',
	'THIS_WEEK_SLUG' : 'this_week',
	'LAST_WEEK_SLUG' : 'last_week',
	'THIS_MONTH_SLUG' : 'this_month',
	'LAST_MONTH_SLUG' : 'last_month',
	'THIS_QUARTER_SLUG' : 'this_quarter',
	'LAST_NINETY_DAYS' : 'last_ninety_days',
	'LAST_THIRTY_DAYS_SLUG' : 'last_thirty_days',
	'CUSTOM_SLUG' : CUSTOM_SLUG
};

const DATE_FILTER_OPTIONS = {
	'all' : 'All',
	'this_week' : 'This week',
	'last_week' : 'Last week',
	'this_month' : 'This month',
	'last_month' : 'Last month',
	'last_ninety_days' : 'Last 90 days',
	'last_thirty_days' : 'Last 30 days',
	'custom' : 'Custom'
};

const STATUSES = {
	'ACTIVE_STATUS' : 'active',
	'INACTIVE_STATUS' : 'inactive',
	'APPROVED_STATUS' : 'approved',
	'REJECTED_STATUS' : 'rejected',
	'PENDING_STATUS' : 'pending',
	'SUBMITTED_STATUS' : 'submitted',
	'PAID_STATUS' : 'paid',
	'DRAFT_STATUS' : 'draft',
	'INVOICED_STATUS' : 'invoiced',
};

// access level
const ACCESS_LEVELS = {
	ADMIN_LEVEL_ID : 1,
	ADMIN_ROLE_ID : 1,
	EMPLOYEE_LEVEL_ID : 2,
	SUPERVISOR_LEVEL_ID : 3,
	NO_ACCESS_LEVEL_ID : 4,
	NO_ACCESS_ROLE_ID : 0
} 

const MESSAGES = {
	ATLEAST_ONE_LINE_ITEM_IS_MANDATORY : 'Atleast one line item is mandatory.',
    END_DATE_GREATER_THAN_START_DATE : 'End date should be greater than start date.',
    MAX_DIFFERENCE_BETWEEN_START_AND_END_DATE_IS_DIFF_VAL : 'Maximum difference between start date and end dates are :diff_days days.',
    MUST_SET_A_TRANSACTIONAL_AMOUNT : 'You must set a transactional amount.',
	AMOUNT_RECEIVED_PLUS_CREDITS_NOT_LESS_THAN_CHARGES : "The Amount Received (plus credits) can't be less than the selected charges"
};

const FIELD_PERMISSIONS = {
	EDIT_APPROVE_CONST : 'edit_approve',
};

const APP_SLUGS = {
	HIRE_SLUG : 'hire',
	HR_SLUG : 'hr',
	CRM_SLUG : 'crm',
};


const MODULE_SLUGS = {
	JOB_SLUG : {
		slug : 'jobs',
		id : 1
	},
	CANDIDATES_SLUG : {
		slug : 'candidates',
		id : 2
	},
	RESOURCE_POOL_SLUG : {
		slug : 'resource_pool',
		id : 3
	},
	ACCOUNTS_SLUG : {
		slug : 'accounts',
		id : 4
	},
	SUBMISSIONS_SLUG : {
		slug : 'submissions',
		id : 5
	},
	CONTACTS_SLUG : {
		slug : 'contacts',
		id : 6
	},
	EMPLOYEES_SLUG : {
		slug : 'employees',
		id : 7
	},
	ASSIGNMENTS_SLUG : {
		slug : 'assignments',
		id : 8
	},
	ONBOARDING_SLUG : {
		slug : 'onboarding',
		id : 9
	},
	OFFBOARDING_SLUG : {
		slug : 'offboarding',
		id : 27
	},
	TIMESHEETS_SLUG : {
		slug : 'timesheets',
		id : 10
	},
	EXPENSES_SLUG : {
		slug : 'expenses',
		id : 11
	},
	LEAVES_SLUG : {
		slug : 'leaves',
		id : 12
	},
	INVOICES_SLUG : {
		slug : 'invoices',
		id : 13
	},
	TASKS_SLUG : {
		slug : 'tasks',
		id : 14
	},
	DOCUMENTS_SLUG : {
		slug : 'documents',
		id : 15,
		name : 'Documents'
	},
	OPPORTUNITIES_SLUG : {
		slug : 'opportunities',
		id : 17
	},
	IMMIGRATION_SLUG : {
		slug : 'immigration',
		id : 18
	},
	CAMPAIGNS_SLUG : {
		slug : 'campaigns',
		id : 19,
		name : 'Campaigns'
	},
	ONE_TIME_PLACEMENT_SLUG : {
		slug : 'one_time_placement',
		id : 21
	},
	TRAININGS_SLUG : {
		slug : 'trainings',
		id : 24
	},
	LEADS_SLUG : {
		slug : 'leads',
		id : 23
	},
	PROJECTS_SLUG : {
		slug : 'projects',
		id : 28
	},
	PERFORMANCE_SLUG : {
		slug : 'performance',
		id : 31
	},
    REQUISITION_SLUG : {
        slug : 'requisitions',
        id : 32
	},
	INTERVIEWS_SLUG : {
        slug : 'interviews',
        id : 35
	},
	POOL_SUBMISSION_MODULE_SLUG : {
        slug : 'interviews',
        id : 36
	},
	HELP_DESK_SLUG : {
		slug : 'help_desk',
		id : -1
	},
	TARGETS_MODULE_SLUG : {
		slug : 'targets',
		id: 34
	},
	ASSETS_SLUG : {
		slug : 'assets',
		id : 39
	},
};

const DEFAULT_DATE_FILTER = 'last_ninety_days';

const TS_TASKS =  {
	'STD_HOURS_TASK_ID' : 1,
	'OT_HOURS_TASK_ID' : 2,
	'TIME_OFF_HOURS_TASK_ID' : 3
};

const TASK_TYPES = {
	'ALL_TASKS' : 'all_tasks',
	'MY_TASKS'  : 'my_tasks',
	'MY_COMPLETED_TASKS' : 'my_completed_tasks',
	'TASKS_ASSIGNED_BY_ME' : 'tasks_assigned_by_me'
};

const DUE_ON_INVOICE_CONST = 'due_on_invoice';
const EXCEL_LIMIT = 100000;
const SEND_MAIL_LIMIT = 1000;
const TOTAL_FILE_SIZE_LIMIT = 15728640;
const APP_CONSTANTS = {
	STATUS_COLORS : {'submitted' : 'text-warning', 'approved' : 'text-success', 'rejected' : 'text-danger', 'cancelled' : 'text-danger'},
	DATE_FILTER_OPTIONS : DATE_FILTER_OPTIONS,
	DEFAULT_PAGE_LIMIT : 15,
	DEFAULT_DATE_FILTER : 'last_ninety_days',
	DATE_FILTER_SLUG_OPTIONS : DATE_FILTER_SLUG_OPTIONS,
	PAGE_LIMITS_LIST : {
	    15 : 15, 25 : 25, 50 : 50, 100 : 100
	},
	STATUSES : STATUSES,
	TASK_TYPES : TASK_TYPES,
	MESSAGES : MESSAGES,
	FIELD_PERMISSIONS : FIELD_PERMISSIONS,
	ACCESS_LEVELS : ACCESS_LEVELS,
	TS_TASKS : TS_TASKS,
	APP_SLUGS :APP_SLUGS,
	MODULE_SLUGS : MODULE_SLUGS,
	ALLOWABLE_EXTENSIONS : [
		'jpg', 'jpeg', 'bmp', 'gif', 'png', 'txt', 'doc', 'docx', 'pdf', 
		'xlsx', 'csv', 'xls', 'ppt', 'pptx', 'pps', 'ppsx', 'odt', 'zip','rtf','html','msg'
	]
};

const APP_DETAILS = {
	name : APP_NAME,
	env : APP_ENV,
	version : APP_VERSION
};


// I9 Status
const I9_STATUSES = {
		INITIATED_SECTION1 :1,
		REINITIATED_SECTION1 :2,
		AWAITING_SECTION1 :3,
		APPROVED_SECTION1 :4, 
		INITIATED_SECTION2 :5,
		REINITIATED_SECTION2 :6,
		AWAITING_SECTION2 :7,
		APPROVED_SECTION2 :8, 
		I9_APPROVED :9,
		INITIATED_SECTION3 :10,
		REINITIATED_SECTION3 :11,
		AWAITING_SECTION3 :12,
		APPROVED_SECTION3 :13,
		SECTION3_MISSING :14,
		SECTION3_MISSING_USER_NOT_ACCEPTED :15,	

		APPROVED_ADDITIONAL_SECTION_3 : 16,
		ADDITIONAL_SECTION_3_MISSING : 17,
		ADDITIONAL_SECTION_3_MISSING_USER_NOT_ACCEPTED : 18,

		APPROVED_ADDITIONAL_SECTION_3_1 : 19,
		ADDITIONAL_SECTION_3_1_MISSING : 20,
		ADDITIONAL_SECTION_3_1_MISSING_USER_NOT_ACCEPTED : 21,

		APPROVED_ADDITIONAL_SECTION_3_2 : 22,
		ADDITIONAL_SECTION_3_2_MISSING : 23,
		ADDITIONAL_SECTION_3_2_MISSING_USER_NOT_ACCEPTED : 24,

		APPROVED_ADDITIONAL_SECTION_3_3 : 25,
		ADDITIONAL_SECTION_3_3_MISSING : 26,
		ADDITIONAL_SECTION_3_3_MISSING_USER_NOT_ACCEPTED : 27,

		APPROVED_ADDITIONAL_SECTION_3_4 : 28,
		ADDITIONAL_SECTION_3_4_MISSING : 29,
		ADDITIONAL_SECTION_3_4_MISSING_USER_NOT_ACCEPTED : 30,

		APPROVED_ADDITIONAL_SECTION_3_5 : 31,
		ADDITIONAL_SECTION_3_5_MISSING : 32,
		ADDITIONAL_SECTION_3_5_MISSING_USER_NOT_ACCEPTED : 33,
};


const I9_SECTION_DOCUMENTS_TYPE = [
	'LIST_A', 'LIST_B', 'LIST_C', 'LIST_D', 'SECTION_1', 'SECTION_3', 'ADDITIONAL_SECTION_3', 
	'ADDITIONAL_SECTION_3_1', 'ADDITIONAL_SECTION_3_2', 'ADDITIONAL_SECTION_3_3', 'ADDITIONAL_SECTION_3_4', 'ADDITIONAL_SECTION_3_5'
];

//Month Constants
const MONTHSCON = {
	'January' :1,
	'February' :2,
	'March' :3,
	'April' :4,
	'May' :5,
    'June' :6, 
    'July':7,
    'August' :8, 
    'September' :9,
    'October' :10,
    'November' :11, 
    'December' :12,
};

// Date formats
const CONFIG_DATE_FORMAT = {"dd\/MM\/yy":"dd\/MM\/yy","dd\/MM\/yyyy":"dd\/MM\/yyyy","MM\/dd\/yy":"MM\/dd\/yy","MM\/dd\/yyyy":"MM\/dd\/y","dd\/MMM\/yyyy":"dd\/MMM\/y", "F d, Y":"MMMM dd, y"};
const ConifgDateFormats = CONFIG_DATE_FORMAT;

if (APP_ENV == 'local') { 
	
	var FIREBASE_CONFIG = {
		apiKey: "AIzaSyASuKz7lkr6uDz5u0Tl0OQcFOsGgUMedsM",
		authDomain: "oorwinhiredev.firebaseapp.com",
		databaseURL: "https://oorwinhiredev.firebaseio.com",
		projectId: "oorwinhiredev",
		storageBucket: "oorwinhiredev.appspot.com",
		messagingSenderId: "234407193468",
		appId: "1:234407193468:web:1ecaed6fc6753737c512f9",
		measurementId: "G-ZW50CPTHDV"
	}; 
    var RECHAPTCHA_SITE_KEY = '6LdyqLsUAAAAALt0qkQC19EN7nJZJtKi6OlKlzN2';

} else if (APP_ENV == 'dev' || APP_ENV == 'qa' || APP_ENV == 'web') { // dev Environment
    var FIREBASE_CONFIG = {
    	apiKey: "AIzaSyDfsIBu9dOw-wn6tEUm0Iu0bjXelmuLgFE",
		authDomain: "oorwinhiredev.firebaseapp.com",
		databaseURL: "https://oorwinhiredev.firebaseio.com",
		projectId: "oorwinhiredev",
		storageBucket: "oorwinhiredev.appspot.com",
		messagingSenderId: "234407193468",
		appId: "1:234407193468:web:e8fa12e9ec72cd8ec512f9",
		measurementId: "G-H7WDSKRNVK"
	};
	if(APP_ENV == 'web') {
		var RECHAPTCHA_SITE_KEY = '6LcCrsYZAAAAAMJmz3800b6a38mlLLnq5S04OE7k';
	} else {
		var RECHAPTCHA_SITE_KEY = '6LdyqLsUAAAAALt0qkQC19EN7nJZJtKi6OlKlzN2';
	}
} else if (APP_ENV == 'devus') { // dev Environment
    var FIREBASE_CONFIG = {
    	apiKey: "AIzaSyDfsIBu9dOw-wn6tEUm0Iu0bjXelmuLgFE",
		authDomain: "oorwinhiredev.firebaseapp.com",
		databaseURL: "https://oorwinhiredev.firebaseio.com",
		projectId: "oorwinhiredev",
		storageBucket: "oorwinhiredev.appspot.com",
		messagingSenderId: "234407193468",
		appId: "1:234407193468:web:e8fa12e9ec72cd8ec512f9",
		measurementId: "G-H7WDSKRNVK"
	};

	var RECHAPTCHA_SITE_KEY = '6LfNpdcZAAAAAH9Owf1nlbwv6aTL6qhwmDv9j36a';
	
} else if (APP_ENV == 'prod' || APP_ENV == 'produs') { // Production Environment
    
    var FIREBASE_CONFIG = {
	  apiKey: "AIzaSyAZCXAOUMvTMGAmkxZ7GOpPj87l9x6yCyM",
	  authDomain: "oorwinhire-accd1.firebaseapp.com",
	  // authDomain: "auth.oorwin.com",
	  databaseURL: "https://oorwinhire-accd1.firebaseio.com",
	  projectId: "oorwinhire-accd1",
	  storageBucket: "oorwinhire-accd1.appspot.com",
	  messagingSenderId: "610263339773",
	  appId: "1:610263339773:web:17085a4b60c62e3b3ee494",
	  measurementId: "G-Y48WZY5NZY"
	};

    var RECHAPTCHA_SITE_KEY = '6Lf6QsAUAAAAADm9UOJQhU5CmAwTfvlCDwZ2Ebdg';
}

const BRANDING_ADDON_MONTHLY_TITLE = 'Subscription Based';
const BRANDING_ADDON_LIFE_TIME_TITLE = 'Life Time';

const HIRE_LICENSE_SLUG    = 'hire_users';
const HR_LICENSE_SLUG      = 'hr_users';
const CRM_LICENSE_SLUG     = 'crm_users';
const MASS_MAILS_SLUG      = 'mass_mails_credits';
const CONTACTS_SEARCH_SLUG = 'contacts_search_credits';
const OORWIN_BRANDING_SLUG = 'oorwin_branding';
const I9_CREDITS_SLUG = 'i9_forms';
const SMS_CREDITS_SLUG = 'sms_credits';
const LINKEDIN_CREDITS_SLUG = 'linkedin_credits';
/*subscription addons*/
const RESUME_JOB_INBOX_CREDITS_SLUG = 'resume_job_inbox';
const QUICK_BOOKS_CREDITS_SLUG = 'quick_books';
// const VIDEO_INTERVIEWS_CREDITS_SLUG = 'video_interviews';
const CHATBOAT_CREDITS_SLUG = 'chatbot';
const JOB_GRABBER_CREDITS_SLUG = 'job_grabber';
const RESUME_HARVESTING_CREDITS_SLUG = 'resume_harvesting';
const REPORT_BUILDER_CREDITS_SLUG = 'report_builder';
const DIGITAL_ONBOARDING_CREDITS_SLUG = 'digital_onboarding_templates';

/*Subscription Titles*/
const HIRE_LICENSE_TITLE = 'ATS User Licenses';
const HR_LICENSE_TITLE = 'HRM User Licenses';
const CRM_LICENSE_TITLE = 'CRM User Licenses';
const MASS_MAILS_TITLE = 'Mass Mail Credits';
const CONTACTS_SEARCH_TITLE = 'Contact Search (Accounts)';
const LINKEDIN_CREDITS_TITLE = 'Contact Search (Linkedin)';
const I9_TITLE = 'I-9 Forms';
const SMS_CREDITS_TITLE = 'SMS Text Credits';
const OORWIN_BRANDING_TITLE = 'Remove Oorwin Branding';
/*subscription addons*/
const RESUME_JOB_INBOX_TITLE =  'Resume & Job Inbox';
const QUICK_BOOKS_TITLE =  'QuickBooks Integration';
// const VIDEO_INTERVIEWS_TITLE =  'Video Interviews';
const CHATBOAT_TITLE =  'Chatbot';
const JOB_GRABBER_TITLE =  'Job Grabber';
const RESUME_HARVESTING_TITLE =  'Resume Harvester';
const REPORT_BUILDER_TITLE =  'Custom Report Builder';
const DIGITAL_ONBOARDING_TITLE =  'Digital Onboarding & Templates';

const ADDON_TITLES = {
	'hire_users' : HIRE_LICENSE_TITLE,
	'hr_users' : HR_LICENSE_TITLE,
	'crm_users' : CRM_LICENSE_TITLE,
	'mass_mails_credits' : MASS_MAILS_TITLE,
	'contacts_search_credits' : CONTACTS_SEARCH_TITLE,
	'i9_forms' : I9_TITLE,
	'sms_credits' : SMS_CREDITS_TITLE,
	'linkedin_credits' : LINKEDIN_CREDITS_TITLE,
	'oorwin_branding': OORWIN_BRANDING_TITLE,
	'resume_job_inbox' :RESUME_JOB_INBOX_TITLE,
	'quick_books' :QUICK_BOOKS_TITLE,
	// 'video_interviews' :VIDEO_INTERVIEWS_TITLE,
	'chatbot' :CHATBOAT_TITLE,
	'job_grabber' :JOB_GRABBER_TITLE,
	'resume_harvesting' :RESUME_HARVESTING_TITLE,
	'report_builder' :REPORT_BUILDER_TITLE,
	'digital_onboarding_templates' :DIGITAL_ONBOARDING_TITLE
};

const ADDON_SLUGS = [
	HIRE_LICENSE_SLUG, 
	HR_LICENSE_SLUG, 
	CRM_LICENSE_SLUG, 
	MASS_MAILS_SLUG, 
	CONTACTS_SEARCH_SLUG, 
	I9_CREDITS_SLUG, 
	SMS_CREDITS_SLUG, 
	LINKEDIN_CREDITS_SLUG, 
	RESUME_JOB_INBOX_CREDITS_SLUG,
	QUICK_BOOKS_CREDITS_SLUG,
	// VIDEO_INTERVIEWS_CREDITS_SLUG,
	CHATBOAT_CREDITS_SLUG,
	JOB_GRABBER_CREDITS_SLUG,
	RESUME_HARVESTING_CREDITS_SLUG,
	REPORT_BUILDER_CREDITS_SLUG,
	DIGITAL_ONBOARDING_CREDITS_SLUG
];

const SUBSCRIPTION_ADDONS = [
	RESUME_JOB_INBOX_CREDITS_SLUG,
	// VIDEO_INTERVIEWS_CREDITS_SLUG,
	CHATBOAT_CREDITS_SLUG,
	JOB_GRABBER_CREDITS_SLUG,
	RESUME_HARVESTING_CREDITS_SLUG,
	REPORT_BUILDER_CREDITS_SLUG,
	DIGITAL_ONBOARDING_CREDITS_SLUG
];

const MONTHLY_ADDON_SLUGS = [MASS_MAILS_SLUG, CONTACTS_SEARCH_SLUG, I9_CREDITS_SLUG, SMS_CREDITS_SLUG, LINKEDIN_CREDITS_SLUG];
const LICENSE_SLUGS = [HIRE_LICENSE_SLUG, HR_LICENSE_SLUG, CRM_LICENSE_SLUG];
const LICENSE_APPS = ['hire', 'hr', 'crm'];
const PLAN_CYCLES = [1,3,6,12];
const ARCHIVE_CONFIRMATION_MESSAGE = "\n Do you Want to Archive this record? \n \n This record will be in archives for 90 days, after which the system will permanently delete the record.";
if (APP_ENV == 'prod' || APP_ENV == 'production' || APP_ENV == 'produs') { // Production Environment
	
	var STRIPE_US_PUBLISH_KEY = 'pk_live_SFcGvLkGZ9zDyPgRqZxpOq1N00Sy3TYeqn';
	var STRIPE_IN_PUBLISH_KEY = 'pk_live_TGwwMgQfki4IAoQRRYgCS4hQ00XR5AHvja';
} else {

	var STRIPE_US_PUBLISH_KEY = 'pk_test_ISess9P0WgSTKQ7yeAm7jt9n00ptaDHqk1';
	var STRIPE_IN_PUBLISH_KEY = 'pk_test_xBuuocGEVpuvk5j20aJ7FrGa00RcbmBoY2';
}

const LIMITED_PLAN = 'limited';
const UN_LIMITED_OPTIONS = 'unlimited_options';
const UN_LIMITED_INC_ADDONS = 'unlimited_inc_addons';
const UN_LIMITED_EXCL_ADDONS = 'unlimited_excl_addons';

const SUBSCRIPTION_MONTHLY = 1;
const SUBSCRIPTION_QUARTERLY = 3;
const SUBSCRIPTION_HALF_YEARLY = 6;
const SUBSCRIPTION_YEARLY = 12;

const USA_ID = 1;
const INDIA_ID = 2;
const SINGAPORE_ID = 702;

const SUBSCRIPTION_PLAN_LEVELS = {
		'free' : 1,
		'starter_trial' : 2,
		'professional_trial' : 3,
		'enterprise_trial' : 4,
		'trial' : 5,
		'starter' : 6,
		'professional' : 7,
		'enterprise' : 8,
		'classic' : 9
}

const VMS_ICONS = {	
	1 : 'vms-vectorvms.png',
	2 : 'covendis.png',
	3 : 'ilabor-i-logo.png',
	4 : 'suppliers-ford.png',
	5 : 'scout_exchange.png',
	6 : 'totalmsp.png',
	7 : 'onesource-b4health.png',
	8 : 'dot-staff.png',
	9 : 'fieldglass.png',
	10 : 'pinnacle1.png',
	11 : 'health-trust.png',
	12 : 'vizient.png',
	13 : 'wabtec.png',
	14 : 'beeline.png',
	15 : 'augustus.png',
	16 : 'successfactors.png',
	17 : 'reflik.png',
	18 : 'gustav.png',
	19 : 'zoho-public.png',
	20 : 'amplifiedsourcing.png',
	21 : 'staffinglogic.png',
	22 : 'acro-service-corp.png',
	23 : 'prowand.png',
	24 : 'successfactors.png',
	25 : 'lnttechservices.png',
	26 : 'platform.png',
	27 : 'tapfin.png',
	28 : 'ausy.png',
	29 : 'comau.png',
	30 : 'ag-agile1.png',
	31 : 'focusoneconnect.png',
	32 : 'wtcvms-einstein2.png',
	33 : 'careerstaff.png',
	34 : 'identity-medefis5.png',
	35 : 'emids.png',
	36 : 'bounty.png',
	37 : 'tcs.png',
	38 : 'stafferlink.png',
	39 : 'mindtree.png',
	40 : 'bullhorn.png',
	41 : 'infosys.png',
	42 : 'ctdi.png',
	43 : 'procurewise.png',
	44 : 'mynexthire.png',
	45 : 'taleo.png',
	46 : 'coupahost.png',
	47 : 'elevate.png',
	48 : 'eastridge.png',
	49 : 'crowdstaffing.png',
	50 : 'simplify.png',
	51 : 'recruitifi.png',
	52 : 'simpli.png',
	53 : 'hireline.png',
	54 : 'myworkday.png',
	55 : 'trio.png',
	56 : 'alberta.png',
	57 : 'flextrack.png',
	58 : 'ontario.png',
	59 : 'baronedc.png',
	60 : 'jobdiva.png',
	61 : 'upglide.png',
	62 : 'cbrex.png',
	63 : 'hwl.png',
	64 : 'ripple.png'

};
