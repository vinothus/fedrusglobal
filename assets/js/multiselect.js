angular.module('ui.multiselect', [])

    //from bootstrap-ui typeahead parser
    .factory('optionParser', ['$parse', function($parse) {

        //                      00000111000000000000022200000000000000003333333333333330000000000044000
        var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

        return {
            parse: function(input) {

                var match = input.match(TYPEAHEAD_REGEXP),
                    modelMapper, viewMapper, source;
                //console.log(match);
                if (!match) {
                    throw new Error(
                        "Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" +
                        " but got '" + input + "'.");
                }

                return {
                    itemName: match[3],
                    source: $parse(match[4]),
                    viewMapper: $parse(match[2] || match[1]),
                    modelMapper: $parse(match[1])
                };
            }
        };
    }])

    .directive('multiselect', ['$parse', '$document', '$compile', 'optionParser',

        function($parse, $document, $compile, optionParser) {
            return {
                restrict: 'E',
                require: 'ngModel',
                //transclude: true,
                link: function(originalScope, element, attrs, modelCtrl) {
                    //console.log(attrs);

                    //      $scope.$watch('name', function() {
                    //    // all the code here...
                    // });

                    var exp = attrs.options,
                    parsedResult = optionParser.parse(exp),
                    isMultiple = attrs.multiple ? true : false,
                    required = false,

                    disabled = attrs.ngDisabled ? attrs.ngDisabled : 'false',
                    appendtextto = attrs.appendtextto ? attrs.appendtextto : false,
                    dropup = attrs.dropup ? attrs.dropup : false,
                    select_for = attrs.id ? attrs.id : Math.floor((Math.random() * 6) + 1001),
                    selecttype = attrs.selecttype ? attrs.selecttype : '',
                    fullheader = attrs.fullheader ? attrs.fullheader : 15,
                    placeholder = attrs.placeholder ? attrs.placeholder : '',
                    scope = originalScope.$new(),
                    changeHandler = attrs.change || angular.noop;
                    groupby = attrs.groupby ? attrs.groupby : '';
                    isGroupSelect = attrs.isgroupselect ? attrs.isgroupselect : '';
                    orderby = attrs.orderby ? attrs.orderby : 'label';

                    if(groupby) {
                        console.log('multiselectjs');
                        console.log(groupby);
                    }

                    select_for = select_for + Math.floor((Math.random() * 6) + 1001);
                    scope.items = [];
                    scope.header = '';
                    scope.multiple = isMultiple;
                    if (disabled == '0') {
                        disabled = 0;
                    } else if (disabled != 'false') {
                        disabled = 1;
                    } else {
                        disabled = 0;
                    }
                    scope.disabled = disabled;

                    scope.multiselect = element;
                    scope.myModelCtrl = modelCtrl;
                    scope.appendtextto = appendtextto;
                    scope.dropup = dropup;
                    scope.selecttype = selecttype;
                    scope.fullheader = fullheader;
                    scope.placeholder = placeholder;
                    scope.groupby = groupby;
                    scope.isGroupSelect = isGroupSelect;
                    scope.orderby = orderby;
                    scope.items_group = {};

                   

                    scope.order_by = 'label';    
                    if(typeof attrs.orderby != 'undefined' && attrs.orderby == 'false')
                    {
                        scope.order_by = '';    
                    }

                    if(typeof attrs.orderBy != 'undefined' && attrs.orderBy == 'false')
                    {
                        scope.order_by = '';    
                    }

                    //alert(Math.floor((Math.random()*6)+1001));
                    //console.log(attrs);
                    scope.select_for = select_for;
                    originalScope.$on('$destroy', function() {
                        scope.$destroy();
                    });

                    var popUpEl = angular.element('<multiselect-popup></multiselect-popup>');

                    //required validator
                    if (attrs.required || attrs.ngRequired) {
                        required = true;
                    }


                    attrs.$observe('required', function(newVal) {
                        required = newVal;
                    });


                    //watch disabled state
                    scope.$watch(function() {
                        // alert(ngModel);
                        //alert('hi');
                        //lert(attrs.disabled);

                        // return $parse(attrs.disabled)(originalScope);
                    }, function(newVal) {
                        //parseModel();
                        //scope.disabled = newVal;
                    });

                    //watch single/multiple state for dynamically change single to multiple
                    scope.$watch(function() {
                        return $parse(attrs.multiple)(originalScope);
                    }, function(newVal) {
                        isMultiple = newVal || false;
                    });

                    //watch option changes for options that are populated dynamically
                    scope.$watch(function() {
                        return parsedResult.source(originalScope);
                    }, function(newVal) {
                        if (angular.isDefined(newVal))
                            parseModel();
                    });

                    //watch model change
                    scope.$watch(function() {
                        return modelCtrl.$modelValue;
                    }, function(newVal, oldVal) {
                        //when directive initialize, newVal usually undefined. Also, if model value already set in the controller
                        //for preselected list then we need to mark checked in our scope item. But we don't want to do this every time
                        //model changes. We need to do this only if it is done outside directive scope, from controller, for example.
                        // parseModel();
                        /*console.log(parsedResult.source(originalScope));

                        console.log(newVal);*/


                        //element.append($compile(popUpEl)(scope));
                        //setModelValue(true);
                        // angular.forEach(modelCtrl.$modelValue,function(ks,vs){

                        // }
                        // console.log('oldVal');
                        // console.log(oldVal);
                        // console.log('current --------');
                        // console.log(modelCtrl.$modelValue);

                        if (isEmpty(modelCtrl.$modelValue)) {
                            scope.uncheckAll();
                        } else {
                            angular.forEach(scope.items, function(item) {
                                angular.forEach(modelCtrl.$modelValue, function(ks, vs) {
                                    if (item.model.id == ks.id) {
                                        item.checked = true;
                                    } else {
                                        item.checked = false;
                                    }
                                });
                            });
                        }

                        if (angular.isDefined(newVal)) {
                            markChecked(newVal);
                            scope.$eval(changeHandler);
                        } else {
                            scope.uncheckAll();
                        }


                        getHeaderText();
                        // console.log(newVal);
                        // console.log(oldVal);
                        modelCtrl.$setValidity('required', scope.valid());
                    }, true);

                    scope.$watch('items', function() {

                    });

                    function isEmpty(obj) {
                        for (var i in obj)
                            if (obj.hasOwnProperty(i))
                                return false;
                        return true;
                    }

                    function parseModel() {
                        scope.items.length = 0;
                         scope.multi_select_all_group = [];
                        var model = parsedResult.source(originalScope);
                        if (model) {
                            for (var i = 0; i < model.length; i++) {
                                var local = {};
                                local[parsedResult.itemName] = model[i];
                                scope.items.push({
                                    label: parsedResult.viewMapper(local),
                                    model: model[i],
                                    checked: false,
                                    disabled: model[i].disabled
                                });

                                if(scope.groupby)
                                {
                                    if(isEmpty(scope.items_group[model[i].category_name]))
                                    {
                                        scope.items_group[model[i].category_name] = [];   
                                        scope.multi_select_all_group[model[i].category_name] = 0;
                                    }
                                    scope.items_group[model[i].category_name].push({
                                        label: parsedResult.viewMapper(local),
                                        model: model[i],
                                        checked: false,
                                        disabled: model[i].disabled
                                    });

                                }
                            }

                            if(scope.groupby)
                            {
                                angular.forEach(scope.items_group, function(items,groupby)
                                {
                                    is_sub_select = 1;

                                    angular.forEach(items,function(item)
                                    {
                                        if(!item.checked)
                                        {
                                            is_sub_select = 0;
                                        }
                                    });
                                     scope.multi_select_all_group[groupby] = is_sub_select;

                                });

                            }

                        }
                    }

                    parseModel();

                    element.append($compile(popUpEl)(scope));

                    function getHeaderText() {
                        if (!modelCtrl.$modelValue || !modelCtrl.$modelValue.length) return scope.header = scope.placeholder;
                        if (isMultiple) {
                            arrHeader = [];
                            angular.forEach(modelCtrl.$modelValue, function(ks, vs) {
                                // arrHeader.push();
                                arrHeader.push(modelCtrl.$modelValue[vs].name);
                            });
                            strHeader = arrHeader.toString();
                            /*if(scope.fullheader) {
                              scope.header =strHeader;
                            } else {*/
                            if (strHeader.length > scope.fullheader)
                                scope.header = strHeader.substring(0, scope.fullheader) + '..';
                            else
                                scope.header = strHeader;
                            //}

                            //console.log(scope.header);
                            //scope.header = modelCtrl.$modelValue.length + ' ' + 'selected';
                            // scope.header = modelCtrl.$modelValue.name;
                            //console.log(modelCtrl.$modelValue);
                        } else {
                            var local = {};
                            local[parsedResult.itemName] = modelCtrl.$modelValue[0].name;
                            //scope.header = parsedResult.viewMapper(local);
                            //scope.header = modelCtrl.$modelValue[0].name;
                            strHeader = modelCtrl.$modelValue[0].name;
                            /*if(scope.fullheader) {
                              scope.header =strHeader;
                            } else {*/
                                scope.selectId = modelCtrl.$modelValue[0].id;
                            if (isNotEmpty(strHeader)) {
                                if (strHeader.length > scope.fullheader)
                                    scope.header = strHeader.substring(0, scope.fullheader) + '..';
                                else
                                    scope.header = strHeader;
                            }
                            else
                                scope.header = strHeader;
                            
                            //}
                        }
                    }

                    scope.valid = function validModel() {
                        if (!required) return true;
                        var value = modelCtrl.$modelValue;
                        return (angular.isArray(value) && value.length > 0) || (!angular.isArray(value) && value != null);
                    };

                    function selectSingle(item) {
                        /*if (item.checked) {
                          scope.uncheckAll();
                        } else {
                          scope.uncheckAll();
                          item.checked = !item.checked;
                        }*/
                        scope.uncheckAll();
                        item.checked = true;
                        setModelValue(false);
                    }

                    function selectMultiple(item) {
                        if (item.disabled) return;

                        item.checked = !item.checked;
                        setModelValue(true);

                        // scope.multi_select_all_group[item.model.category_name] = 1;
                        if(scope.multi_select_all && !item.checked) scope.multi_select_all = 0;
                        else if(!scope.multi_select_all && item.checked) {
                            multi_select_all = 1;
                            angular.forEach(scope.items, function(item) {
                                if(multi_select_all && !item.checked) {
                                    multi_select_all = 0;
                                }


                            });
                            scope.multi_select_all = multi_select_all;
                        }


                        if(scope.multi_select_all_group[item.model.category_name] && !item.checked) scope.multi_select_all_group[item.model.category_name] = 0;
                        else if(!scope.multi_select_all_group[item.model.category_name] && item.checked) {
                            multi_group_select_all = 1;
                            angular.forEach(scope.items, function(sub_item) {
                                if(multi_group_select_all && !sub_item.checked && item.model.category_name == sub_item.model.category_name ) {
                                    multi_group_select_all = 0;
                                }

                            });
                            scope.multi_select_all_group[item.model.category_name] = multi_group_select_all;
                        }


                       
                    }

                    function setModelValue(isMultiple) {
                        var value;

                        if (isMultiple) {
                            value = [];
                            angular.forEach(scope.items, function(item) {
                                if (item.checked) value.push(item.model);
                            })
                        } else {
                            angular.forEach(scope.items, function(item) {
                                if (item.checked) {
                                    value = [item.model];
                                    //return false;
                                }
                            })
                        }
                        modelCtrl.$setViewValue(value);
                    }

                    function markChecked(newVal) {
                        if (!angular.isArray(newVal)) {
                            angular.forEach(scope.items, function(item) {
                                if (angular.equals(item.model, newVal)) {
                                    item.checked = true;
                                    return false;
                                }
                            });
                        } else {
                            // console.log('array');
                            angular.forEach(newVal, function(i) {
                                angular.forEach(scope.items, function(item) {
                                    if (angular.equals(item.model, i)) {
                                        item.checked = true;
                                    }
                                    //

                                });
                            });
                        }
                    }

                    scope.checkAll = function() {
                        if (!isMultiple) return;
                        if (scope.multi_select_all == 1) {
                            angular.forEach(scope.items, function(item) {
                                if (item.disabled) return;
                                item.checked = true;
                                scope.multi_select_all_group[item.model.category_name] = 1;
                            });
                        } else {
                            angular.forEach(scope.items, function(item) {
                                if (item.disabled) return;
                                item.checked = false;
                                scope.multi_select_all_group[item.model.category_name] = 0;

                            });
                        }
                        setModelValue(true);
                    };


                    scope.checkGroupAll = function(groupby) {
                        // console.log(scope.items);
                        // console.log(groupby);

                        // console.log(scope.items_group);
                        // if (!isMultiple) return;
                        // console.log(scope.multi_select_all_group[groupby]);

                        
                        if (scope.multi_select_all_group[groupby] == 1) {
                            angular.forEach(scope.items, function(item) {
                                if (item.disabled) return;
                                if(item.model.category_name == groupby){
                                    item.checked = true;
                                }    
                            });
                        } else {
                            angular.forEach(scope.items, function(item) {
                                if (item.disabled) return;
                                if(item.model.category_name == groupby){
                                    item.checked = false;
                                }
                                // item.checked = false;
                            });
                        }
                        setModelValue(true);
                    };

                    

                    scope.uncheckAll = function() {
                        angular.forEach(scope.items, function(item) {
                            if (item.disabled) return;
                            item.checked = false;
                        });
                        setModelValue(true);
                    };

                    scope.select = function(item) {
                        if (isMultiple === false) {
                            selectSingle(item);
                            scope.toggleSelect();
                        } else {
                            selectMultiple(item);
                        }
                    }
                }
            };
        }
    ])

    .directive('multiselectPopup', ['$document', function($document) {
        return {
            restrict: 'E',
            scope: false,
            replace: true,
            templateUrl: 'multiselect.tmpl.html',
            link: function(scope, element, attrs) {
                scope.isVisible = false;

                scope.toggleSelect = function() {
                    scope.clear();
                    if (!scope.disabled) {
                        if (element.hasClass('open')) {
                            element.removeClass('open');
                            $document.unbind('click', clickHandler);

                            if (scope.appendtextto) {
                                updateAppendToElementText();
                            }
                        } else {
                            //console.log(scope.dropup);
                            if (scope.dropup) {
                                /*if (element.hasClass('dropdown')) {
                                    element.removeClass('dropdown');
                                }*/
                                if (!element.hasClass('dropup')) {
                                    element.addClass('dropup');
                                }
                            }
                            element.addClass('open');
                            scope.focus();
                            $document.bind('click', clickHandler);
                        }
                    }
                };

                function clickHandler(event) {
                    if (elementMatchesAnyInArray(event.target, element.find(event.target.tagName))) {
                        // console.log(event.target.tagName);
                        return;
                    }

                    element.removeClass('open');
                    $document.unbind('click', clickHandler);
                    scope.$digest();

                    /*if(scope.appendtextto) {
                        updateAppendToElementText();
                    }*/
                }

                scope.focus = function focus() {
                    var searchBox = element.find('input')[0];
                    searchBox.focus();

                    if (scope.selecttype) {
                        var searchBoxPositions = searchBox.getBoundingClientRect();
                        if (searchBoxPositions.top <= 100) {
                            if (element.hasClass('dropup')) {
                                element.removeClass('dropup');
                            }
                        } else {
                            element.addClass('dropup');
                        }
                    }
                }

                scope.clear = function clear() {
                    if (typeof scope.searchText !== 'undefined' && typeof scope.searchText.label !== 'undefined') scope.searchText.label = '';
                }

                var elementMatchesAnyInArray = function(element, elementArray) {
                    for (var i = 0; i < elementArray.length; i++)
                        if (element == elementArray[i])
                            return true;
                    return false;
                }

                var updateAppendToElementText = function() {
                    if (scope.selecttype == 'notify_emailids') {
                        appendtexttoElement = document.getElementById(scope.appendtextto);

                        var notifier_names = '';
                        if (appendtexttoElement.hasChildNodes()) {
                            var len = appendtexttoElement.children.length;
                            for (var i = 0; i < len; i++) {
                                cur_child = appendtexttoElement.children[i];
                                if (cur_child.id == 'names_list_container') { // || cur_child.id == 'ids_list' 
                                    appendtexttoElement.removeChild(cur_child);
                                    i--;
                                    len--;
                                    notifier_names = cur_child.innerHTML;
                                } else if (cur_child.tagName == 'BR') { // || cur_child.id == 'ids_list' 
                                    appendtexttoElement.removeChild(cur_child);
                                    i--;
                                    len--;
                                }
                            }
                        }

                        myModelValue = scope.myModelCtrl.$modelValue;
                        console.log(myModelValue);
                        if (myModelValue.length) {
                            var element_text = '';
                            /*if(typeof strNotifierNames != 'undefined') {
                                element_text = element_text.replace('@'+strNotifierNames, "");
                            }
                            if(typeof strNotifierIds != 'undefined') {
                                element_text = element_text.replace(strNotifierIds, "");
                            }*/


                            //arrNotifierNames = [];
                            //arrNotifierIds = [];
                            element_text += '<customSpan id="names_list_container">';
                            if (notifier_names) element_text += notifier_names;
                            angular.forEach(myModelValue, function(ks, vs) {
                                //arrNotifierNames.push(myModelValue[vs].name);
                                //arrNotifierIds.push(myModelValue[vs].id);

                                //if(vs != 0) element_text += ',';
                                if (element_text.indexOf('notify_to_' + myModelValue[vs].id) === -1) {
                                    if (element_text.indexOf('notify_to_') !== -1) element_text += ' ';
                                    element_text += '<customSpan id="notify_to_' + myModelValue[vs].id + '" class="multiselect_names_list notes-notify_to" notify_to="' + myModelValue[vs].id + '" contenteditable="false">@' + myModelValue[vs].name + '</customSpan>';
                                }
                            });
                            element_text += '</customSpan> ';
                            //strNotifierNames = arrNotifierNames.join(', ');
                            //strNotifierIds = arrNotifierIds.join(', ');

                            //element_text += '<customSpan id="names_list" class="multiselect_names_list" contenteditable="false">@'+strNotifierNames+'</customSpan> ';//' @'+strNotifierNames;
                            //element_text += '<customSpan id="ids_list" class="multiselect_ids_list" style="display:none;">'+strNotifierIds+'</customSpan>';
                            appendtexttoElement.innerHTML = element_text + appendtexttoElement.innerHTML + '<br/> ';
                        }
                        scope.clear();

                        //appendtexttoElement.focus();
                        /*var cursor_pos = getCaretCharacterOffsetWithin(appendtexttoElement);
                        SetCaretPosition(appendtexttoElement, cursor_pos);*/

                        setEndOfContenteditable(appendtexttoElement);
                    } else if (scope.selecttype == 'note_type_id') {
                        appendtexttoElement = document.getElementById(scope.appendtextto);

                        /*myModelValue = scope.myModelCtrl.$modelValue;
                        console.log(myModelValue);
                        var element_text = '';
                        if(myModelValue.length) {
                            element_text = myModelValue[0].name;
                        }
                        appendtexttoElement.innerHTML = element_text;*/

                        setEndOfContenteditable(appendtexttoElement);
                    }
                }
            }
        }
    }]);