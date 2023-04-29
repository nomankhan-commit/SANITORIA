var bem_htmlHelper = {

    // textBoxes Generate, more according to need.
    textBox: function (id, ctrlName) //Simple TextBox
    {
        //var html = '<input class="form-control valid" data-val="true" data-val-length="The field Module must be a string with a minimum length of 3 and a maximum length of 100." data-val-length-max="100" data-val-length-min="3"  data-val-required="The Module field is required." id="moduleAlias" name="moduleAlias" type="text" value=""><span class="field-validation-valid text-danger" data-valmsg-for="moduleAlias" data-valmsg-replace="true"></span>';
        return _createTextBox(id, ctrlName, false, false, null, null);
    },
    textBoxRequired: function (id, ctrlName) //Required only
    {
        return _createTextBox(id, ctrlName, true, false, null, null);
    },
    textBoxRequiredStringLength: function (id, ctrlName, max, min) //Required with String length Max and min
    {
        return _createTextBox(id, ctrlName, true, true, max || 100, min || 3);
    },
    textBoxRequiredMaxLength: function (id, ctrlName, max) //Required with Max length
    {
        return _createTextBox(id, ctrlName, true, false, max || 100, null);
    },
    textBoxRequiredMinLength: function (id, ctrlName, min) //Required with Max length
    {
        return _createTextBox(id, ctrlName, true, false, null, min || 3);
    },
    textBoxRequiredCompared: function (id, ctrlName, compareTo) //Required only
    {
        return _createTextBox(id, ctrlName, true, false, null, null, compareTo);
    },

    // textBoxes with label Generate, more according to need.
    textBoxWithLabel: function (id, ctrlName) {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBox(id, ctrlName));
    },
    textBoxRequiredWithLabel: function (id, ctrlName) //Required only
    {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxRequired(id, ctrlName));
    },
    textBoxRequiredStringLengthWithLabel: function (id, ctrlName, max, min) //Required with String length Max and min
    {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxRequiredStringLength(id, ctrlName, max, min));
    },
    textBoxRequiredMaxLengthWithLabel: function (id, ctrlName, max) //Required with Max length
    {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxRequiredMaxLength(id, ctrlName, max));
    },
    textBoxRequiredMinLengthWithLabel: function (id, ctrlName, min) //Required with Max length
    {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxRequiredMinLength(id, ctrlName, min));
    },
    textBoxRequiredComparedWithLabel: function (id, ctrlName, compareTo) //Required only
    {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxRequiredCompared(id, ctrlName, compareTo));
    },

    // textBoxesByType Generate, more according to need.
    textBoxByType: function (id, ctrlName, type) //Simple TextBox By type
    {
        return _createTextBox(id, ctrlName, false, false, null, null, null, type);
    },
    textBoxByTypeRequired: function (id, ctrlName, type) //Required only
    {
        return _createTextBox(id, ctrlName, true, false, null, null, null, type);
    },
    textBoxByTypeRequiredStringLength: function (id, ctrlName, max, min, type) //Required with String length Max and min
    {
        return _createTextBox(id, ctrlName, true, true, max || 100, min || 3, null, type);
    },
    textBoxByTypeRequiredMaxLength: function (id, ctrlName, max, type) //Required with Max length
    {
        return _createTextBox(id, ctrlName, true, false, max || 100, null, null, type);
    },
    textBoxByTypeRequiredMinLength: function (id, ctrlName, min, type) //Required with Max length
    {
        return _createTextBox(id, ctrlName, true, false, null, min || 3, null, type);
    },
    textBoxByTypeRequiredCompared: function (id, ctrlName, compareTo, type) //Required only
    {
        return _createTextBox(id, ctrlName, true, false, null, null, compareTo, type);
    },

    // textBoxes with label Generate, more according to need.
    textBoxByTypeWithLabel: function (id, ctrlName, type) {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxByType(id, ctrlName, type));
    },
    textBoxByTypeRequiredWithLabel: function (id, ctrlName, type) //Required only
    {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxByTypeRequired(id, ctrlName, type));
    },
    textBoxByTypeRequiredStringLengthWithLabel: function (id, ctrlName, max, min, type) //Required with String length Max and min
    {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxByTypeRequiredStringLength(id, ctrlName, max, min, type));
    },
    textBoxByTypeRequiredMaxLengthWithLabel: function (id, ctrlName, max, type) //Required with Max length
    {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxByTypeRequiredMaxLength(id, ctrlName, max, type));
    },
    textBoxByTypeRequiredMinLengthWithLabel: function (id, ctrlName, min, type) //Required with Max length
    {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxByTypeRequiredMinLength(id, ctrlName, min, type));
    },
    textBoxByTypeRequiredComparedWithLabel: function (id, ctrlName, compareTo, type) //Required only
    {
        return _createlabel(id, ctrlName, bem_htmlHelper.textBoxByTypeRequiredCompared(id, ctrlName, compareTo, type));
    },

    // tagBox Generate
    inputTextListWithTags: function (id, ctrlName, parentContainer, maxItems, selectedValues) {
        return _createDevExTagBox(id, ctrlName, parentContainer, maxItems, selectedValues);
    },

    // Html Select 
    selectControl: function (id, ctrlName, data, keyExpr, displayExpr) //Simple TextBox
    {
        return _createSelectControl(id, ctrlName, false, data, keyExpr, displayExpr);
    },
    selectControlRequired: function (id, ctrlName, data, keyExpr, displayExpr) //Required only
    {
        return _createSelectControl(id, ctrlName, true, data, keyExpr, displayExpr);
    },

    //DatePicker
    textBoxDatePicker: function (id, ctrlName, defaultDate, parentContainer) {
        var ctrl = _createTextBox(id, ctrlName, false, false, null, null),
            parent = document.getElementById(parentContainer) || parentContainer;

        $(parent).append(ctrl);

        $('#' + id).datepicker({
            format: "mm/dd/yyyy",

        });

        //return ctrl;
    },
    textBoxDatePickerRequired: function (id, ctrlName, defaultDate, parentContainer) {
        var ctrl = _createTextBox(id, ctrlName, true, false, null, null),
            parent = document.getElementById(parentContainer) || parentContainer;

        $(parent).append(ctrl);

        $('#' + id).datepicker({
            format: "mm/dd/yyyy"
        });

        //return ctrl;
    },
    textBoxDatePickerWithLabel: function (id, ctrlName, defaultDate, parentContainer) {
        var ctrl = _createlabel(id, ctrlName, _createTextBox(id, ctrlName, false, false, null, null)),
            parent = document.getElementById(parentContainer) || parentContainer;

        $(parent).append(ctrl);

        $('#' + id).datepicker({
            format: "mm/dd/yyyy",

        });

        //return ctrl;
    },
    textBoxDatePickerRequiredWithLabel: function (id, ctrlName, defaultDate, parentContainer) {
        var ctrl = _createlabel(id, ctrlName, _createTextBox(id, ctrlName, true, false, null, null)),
            parent = document.getElementById(parentContainer) || parentContainer;

        $(parent).append(ctrl);

        $('#' + id).datepicker({
            format: "mm/dd/yyyy"
        });

        //return ctrl;
    },

    textBoxNumericRange: function (id, ctrlName, parentContainer) {
        $(parentContainer).addClass("form-inline");
        $(parentContainer).addClass("ui-tbrange-numeric");
        var fromctrl = _createlabel(id + 'from', 'From', bem_htmlHelper.textBoxByType(id, ctrlName, 'number')),
            ToCtrl = _createlabel(id + 'from', 'To', bem_htmlHelper.textBoxByType(id + "_", ctrlName, 'number'));
        $(parentContainer).append(fromctrl).append(ToCtrl);
    },

    textBoxNumericRangeRequired: function (id, ctrlName, parentContainer) {
        $(parentContainer).addClass("form-inline");
        $(parentContainer).addClass("ui-tbrange-numeric");
        var fromctrl = _createlabel(id + 'from', 'From', bem_htmlHelper.textBoxByTypeRequired(id, ctrlName, 'number')),
            ToCtrl = _createlabel(id + 'from', 'To', bem_htmlHelper.textBoxByTypeRequired(id, ctrlName, 'number'));
        $(parentContainer).append(fromctrl).append(ToCtrl);
    },

    getTextBoxNumericRange: function (parentContainer) {
        var values = "";
        try {
            //$(parentContainer).find("input[type=number],input[type=text]").each(function (i, e) {
            $(parentContainer).find("input[type=number]").each(function (i, e) {
                values += $(e).val();
                values += ",";
            });
            return values.slice(0, values.length - 1);
        }
        catch (e) {
            console.log(e.message);
            return "";
        }
    },

    //DatePicker Range
    textBoxDateRangePicker: function (id, ctrlName, defaultDate, parentContainer) {

        var ctrl = _createDateTimeTextbox(id, ctrlName, false);
        parent = document.getElementById(parentContainer);

        if (parent == null || parent == undefined) {
            parent = parentContainer;
        }

        $(parent).append(ctrl);

        $('#' + id + ' input').each(function () {
            $(this).datepicker('clearDates');
        });

        return ctrl;
    },
    textBoxDateRangePickerRequired: function (id, ctrlName, defaultDate, parentContainer) {

        var ctrl = _createDateTimeTextbox(id, ctrlName, true),
        parent = document.getElementById(parentContainer);

        if (parent == null || parent == undefined) {
            parent = parentContainer;
        }
        $(parent).append(ctrl);

        $('#' + id + ' input').each(function () {
            $(this).datepicker('clearDates');
        });

        return ctrl;
    },
    textBoxCustomDateRange: function (id, ctrlName, defaultDate, parentContainer) {

        var ctrl = _createDateTimeTextbox(id, ctrlName, true),
            parent = document.getElementById(parentContainer);
        var subDateTypes = bem_common.getSubDateTypes();
        var ddlCustom = '<select class="form-control subDataType">';
        $.each(subDateTypes, function (i, e) {
            if (i == 0)
                ddlCustom += '<option value="' + e.key + '" selected="selected">' + e.value + '</option>';
            else
                ddlCustom += '<option value="' + e.key + '">' + e.value + '</option>';
        });
        ddlCustom += '</select>';
        if (parent == null || parent == undefined) {
            parent = parentContainer;
        }
        $(parent).html(ddlCustom);
        $(parent).append(ctrl);

        $('#' + id + ' input').each(function () {
            $(this).datepicker('clearDates');
        });

        $('.subDataType', parent).unbind('change');
        $('.subDataType', parent).change(function () {     
            subType = this.value;
            var result = ['', ''];
            if (subType === "1")//Custom Date
            {                
                $('#' + id + ' input').each(function () {
                    $(this).datepicker('clearDates').removeClass("ui-disable");
                });

                // if custom dates are found in attributes, then populate these.
                /*
                var defValueFrm = parent.attr("hidValueFrom");
                var defValueTo = parent.attr("hidValueTo");
                if (defValueFrm != "" && defValueFrm != undefined && defValueTo != "" && defValueTo != undefined) {
                   
				   $('#' + id + ' input').each(function () {
						$(this).removeClass("ui-disable");
					});
					
                    parent.find('input:eq(0)').val(defValueFrm);
                    parent.find('input:eq(1)').val(defValueTo);
                    parent.removeClass("ui-disable");
                }
				else{
					$('#' + id + ' input').each(function () {
						$(this).datepicker('clearDates').removeClass("ui-disable");
					});
				}*/
               
            }
            else //other subDateType
            {
                result = bem_common.loadParamSubDataType(this.value);
                if (result.length > 0) {
                    $('#' + id + ' input').each(function (i, e) {
                        $(this).datepicker("setDate", result[i]);//.addClass("ui-disable");
                        if ($(this).parents(".ui-disable").length <= 0) {
                            $(this).addClass("ui-disable");
                        }
                        else {
                            $(this).removeClass("ui-disable");
                        }
                    });
                }
                try {
                    //this case handled for preview and other screens, where dashboard edit doesn't exist. may be in future replace it with proper fix.
                    if (bem_dsh_dashboard) {
                        bem_dsh_dashboard.setQueryAllow(true, $(parent).closest('tr'));
                    }
                } catch (e) { }
            }
            var priorDates = bem_common.getParamPriorDate(subType, result[0], result[1]) || [];
            var paramGuid = $(this).closest('.param').attr('id');
            var priors = $('#frmParameters,#frmPreviewParameters').find('[priorof="' + paramGuid + '"]');
            var normaldates = $('#frmParameters,#frmPreviewParameters').find('[id="' +paramGuid + '"]');
            $.each(priors, function (i, e) {
                $(e).find('[id$=Frm]').val(priorDates[0]);
                $(e).find('[id$=To]').val(priorDates[1]);
                if (subType === "1") {
                    $(e).find('[id$=Frm]').datepicker('clearDates').removeAttr('readonly');
                    $(e).find('[id$=To]').datepicker('clearDates').removeAttr('readonly');
                }
                else {
                    $(e).find('[id$=Frm]').datepicker('destroy').attr('readonly', 'readonly');
                    $(e).find('[id$=To]').datepicker('destroy').attr('readonly', 'readonly');
                }
            });
            $.each(normaldates, function (i, e) {
                //$(e).find('[id$=Frm]').val(priorDates[0]);
                //$(e).find('[id$=To]').val(priorDates[1]);
                if (subType === "1") {
                    $(e).find('[id$=Frm]').datepicker('clearDates').removeAttr('readonly');
                    $(e).find('[id$=To]').datepicker('clearDates').removeAttr('readonly');
                }
                else {
                    $(e).find('[id$=Frm]').datepicker('destroy').attr('readonly', 'readonly');
                    $(e).find('[id$=To]').datepicker('destroy').attr('readonly', 'readonly');
                }
            });
        });
        $('input', parent).unbind('change');
        $('input', parent).change(function () {
            var dateFunc = $('.subDataType', parent).val();
            if (dateFunc === "1")//Custom Date
            {


                var fromDate = $(parent).find('[id$=Frm]').val();
                var toDate = $(parent).find('[id$=To]').val();
                var priorDates = bem_common.getParamPriorDate($(ddlCustom).val(), fromDate, toDate) || [];
                var paramGuid = $(this).closest('.param').attr('id');
                var priors = $('#frmParameters,#frmPreviewParameters').find('[priorof="' + paramGuid + '"]');
                $.each(priors, function (i, e) {
                    $(e).find('[id$=Frm]').val(priorDates[0]);
                    $(e).find('[id$=To]').val(priorDates[1]);
                });
            }
        });
        return ctrl;
    },
    textBoxPriorDate: function (id, ctrlName, parentContainer, priorOf, subType, fromDate, toDate) {
        var ctrl = _createDateTimeTextbox(id, ctrlName, true),
            parent = document.getElementById(parentContainer);
        var priorOfLabel = '<span class="ui-paramTo">Prior Of ' + priorOf + '</span>';

        if (parent == null || parent == undefined) {
            parent = parentContainer;
        }
        $(parent).html(priorOfLabel);
        $(parent).append(ctrl);

        $('#' + id + ' input').each(function () {
            $(this).datepicker('clearDates');
        });
        var result = bem_common.getParamPriorDate(subType, fromDate, toDate) || [];
        if (result.length > 0) {
            $('#' + id + ' input').each(function (i, e) {
                if (subType == 1) //custom date
                    $(this).datepicker("setDate", result[i]).removeAttr('readonly');
                else
                    $(this).datepicker("destroy").val(result[i]).attr('readonly', 'readonly');
                //$(this).datepicker("setDate", result[i]);
            });
        }
        return ctrl;
    },
    getTextBoxDateRangePickerValues: function (id) {
        var value = "";
        try {
            $('#' + id + ' input').each(function () {
                value += $(this).val();
                value += ",";
            });

            return value.slice(0, value.length - 1);;

        } catch (e) {
            console.log(id, e.message);
            return "";
        }
    },

    //Single Select //
    singleSelectDropdown: function (id, name, data, selectedValues, keyExpr, dataField, width) {
        _createDevExDropdpwnList(id, name, false, false, data, selectedValues, keyExpr, dataField, null, null, width, null);
    },
    singleSelectRequiredDropdown: function (id, name, data, selectedValues, keyExpr, dataField, width, isKeyExprZeroValues) {
        _createDevExDropdpwnList(id, name, true, false, data, selectedValues, keyExpr, dataField, null, null, width, null, isKeyExprZeroValues);
    },
    singleSelectRequiredDropdownWithCellTemplate: function (id, name, data, selectedValues, keyExpr, dataField, width, columnTemplateFun, valueChangedFun) {
        _createDevExDropdpwnList(id, name, true, false, data, selectedValues, keyExpr, dataField, null, null, width, columnTemplateFun, null, valueChangedFun);
    },


    //getSingleSelectValuesByGuid : function(guid , data, guidName, valueExpr){        
    //    try {
    //        var dropDownInstance = $(guid + 'CmbTreeList').dxTreeList('instance');
    //        if (dropDownInstance != undefined) {
    //            var res = dropDownInstance.getSelectedRowsData()[0];
    //            return res[valueExpr];
    //        }
    //        else {
    //            var seldata = [];
    //            var thisGuid = guid.replace("#", "");
    //            if (data != undefined && data != null && data.length > 0) {
    //                for (var i = 0; i < data.length; i++) {
    //                    if (data[i][guidName] == thisGuid)
    //                        seldata.push(data[i]);
    //                }
    //            }
    //            return seldata[0][valueExpr]
    //        }
    //    }
    //    catch (e) {
    //        console.log(e);
    //    }
    //},


    //Get Tagbox Values
    getTagboxValues: function (id, data) {
        //
        try {
            var tagBoxInstance;
            if (typeof (id) == 'string') {
                tagBoxInstance = $("#" + id).dxTagBox('instance');
            } else {
                tagBoxInstance = $(id).dxTagBox('instance');
            }

            if (tagBoxInstance != undefined) {
                var selectedVals = tagBoxInstance.option("value");
                return selectedVals;
            }
            else {
                return data;
            }
        }
        catch (ex) {
            console.log(ex);
            return null;
        }
    },
    setTagboxValues: function (id, data) {
        try {
            var tagBoxInstance;
            if (typeof (id) == 'string') {
                tagBoxInstance = $("#" + id).dxTagBox('instance');
            } else {
                tagBoxInstance = $(id).dxTagBox('instance');
            }

            if (tagBoxInstance != undefined) {
                var selectedVals = tagBoxInstance.option("value", data || []); 
                return selectedVals;
            }
            else {
                return data;
            }
        }
        catch (ex) {
            console.log(ex);
            return null;
        }
    },

    //Get values from devEx dropdomnlist
    getSingleSelectObject: function (id) {
        try {
            var res = $(id + 'CmbTreeList').dxTreeList('instance').getSelectedRowsData()[0];
            return res;

        } catch (e) {
            console.log(e);
            return null;
        }
    },
    getSingleSelectValue: function (id, keyExpr, data) {
        //try {
        //    var res = $(id + 'CmbTreeList').dxTreeList('instance').getSelectedRowsData()[0];
        //    return res[keyExpr];

        //} catch (e) {
        //    console.log(e);
        //    return null;
        //}
        try {
            var dropDownInstance = $(id + 'CmbTreeList').dxTreeList('instance');
            if (dropDownInstance != undefined) {
                var res = dropDownInstance.getSelectedRowsData()[0];
                return res[keyExpr];
            }
            else {
                return data;
            }

        }
        catch (e) {
            console.log(e);
        }
    },

    //Tree List Funcs
    treeListDeselectAll: function (id) {
        $("#" + id).dxTreeList('instance').deselectAll();
    },
    getTreeListSingleSelectValue: function (id, keyExpr, data) {
        try {
            var dxTreeList = $(id).dxTreeList('instance');
            if (dxTreeList != undefined) {
                var res = dxTreeList.getSelectedRowsData()[0];
                return res[keyExpr];
            }
            else {
                return data;
            }

        }
        catch (e) {
            console.log(e);
        }
    },

    //MultiSelect
    multiSelectDropdown: function (id, name, data, selectedValues, keyExpr, dataField , placeholder) {
        _createDevExMultiSelectDropdpwnList(id, name, false, false, data, selectedValues, keyExpr, dataField, placeholder, null, null);
    },
    multiSelectRequiredDropdown: function (id, name, data, selectedValues, keyExpr, dataField, isKeyExprZeroValues) {
        _createDevExMultiSelectDropdpwnList(id, name, true, false, data, selectedValues, keyExpr, dataField, null, null, null, isKeyExprZeroValues);
    },
    multiSelectRequiredIfDropdown: function (id, name, data, selectedValues, keyExpr, dataField, ctrlToCheck, valueToCheck) {
        var requiredIf = {};
        requiredIf.ctrl = ctrlToCheck;
        requiredIf.value = valueToCheck;
        _createDevExMultiSelectDropdpwnList(id, name, false, false, data, selectedValues, keyExpr, dataField, null, null, requiredIf);
    },

    //Hirarcal Selection
    hierarchalSingleSelectDropdown: function (id, name, data, selectedValues, keyExpr, dataField, parentExpr, iconClass) {
        _createDevExHierarchalList(id, name, false, false, data, selectedValues, keyExpr, dataField, parentExpr, null, '100%', iconClass, 'single', null);
    },
    hierarchalSingleSelectRequiredDropdown: function (id, name, data, selectedValues, keyExpr, dataField, parentExpr, iconClass, isfoldercreated) {
        _createDevExHierarchalList(id, name, true, false, data, selectedValues, keyExpr, dataField, parentExpr, null, '100%', iconClass, 'single', null, isfoldercreated);
    },
    hierarchalMultiSelectDropdown: function (id, name, data, selectedValues, keyExpr, dataField, parentExpr, iconClass, width) {
        _createDevExHierarchalList(id, name, false, false, data, selectedValues, keyExpr, dataField, parentExpr, null, '100%', iconClass, 'multiple', width);
    },

    //Get values from devEx multi dropdomnlist
    getMultiSelectObject: function (id, data) {
        //try {
        //    var res = $(id + 'CmbTreeList').dxTreeList('instance').getSelectedRowsData();
        //    return res;

        //} catch (e) {
        //    console.log(e);
        //    return null;
        //}        
        try {
            var treeInstance = $(id + 'CmbTreeList').dxTreeList('instance');
            if (treeInstance != undefined) {
                return treeInstance.getSelectedRowsData();
            }
            else {
                return data;
            }
        }
        catch (e) {
            console.log(e);
        }
    },

    //Get values from devEx multi dropdownlist on edit when no tree expanded
    getMultiSelectObjectOnEdit: function (id, data) {

        try {
            var hiddenvalues = $(id + 'Cmb input[type=hidden]').val().split(',');
            if (hiddenvalues != undefined) {
                for (var count = 0; count < hiddenvalues.length; count++) {
                    console.log(hiddenvalues[count]);
                    data.push({
                        "catalogName": hiddenvalues[count]
                    });
                }
            }
            else {
                return data;
            }
        }
        catch (e) {
            console.log(e);
        }
    },
    //Treelist 
    singleSelectTreelist: function (id, data, selectedValues, keyExpr, dataField, isBtnSearch, columnTemplateFun, selectionMode) {
        //
        var selMode = selectionMode != undefined || selectionMode != null ? selectionMode : 'single';
        return _CreateDevExTreeList(id, data, selectedValues, keyExpr, dataField, null, '100%', selMode, isBtnSearch, columnTemplateFun, false, false);
    },
    singleSelectTreelistNoSelection: function (id, data, selectedValues, keyExpr, dataField, isBtnSearch, columnTemplateFun) {
        return _CreateDevExTreeList(id, data, selectedValues, keyExpr, dataField, null, null, 'none', isBtnSearch, columnTemplateFun, false, false);
    },
    singleSelectHirarcalTreelist: function (id, data, selectedValues, keyExpr, dataField, parentExpr, isBtnSearch, columnTemplateFun, isSkipSelectionIfAlreadySelected, expandedRowKeys) {
        return _CreateDevExTreeList(id, data, selectedValues, keyExpr, dataField, parentExpr, '100%', 'single', isBtnSearch, columnTemplateFun, false, false, null, isSkipSelectionIfAlreadySelected, expandedRowKeys);
    },
    multiSelectTreelist: function (id, data, selectedValues, keyExpr, dataField, isBtnSearch, columnTemplateFun) {
        return _CreateDevExTreeList(id, data, selectedValues, keyExpr, dataField, null, '100%', 'multiple', isBtnSearch, columnTemplateFun, false, false);
    },
    multiSelectHirarcalTreelist: function (id, data, selectedValues, keyExpr, dataField, parentExpr, isBtnSearch, columnTemplateFun) {
        return _CreateDevExTreeList(id, data, selectedValues, keyExpr, dataField, parentExpr, '100%', 'multiple', isBtnSearch, columnTemplateFun, false, false);
    },

    multiColumnsTreelist: function (id, data, selectedValues, keyExpr, parentExpr, Columns, height, isDrilldown) {
        return _CreateDevExTreeList(id, data, selectedValues, keyExpr, null, parentExpr, height || '100%', 'multiple', false, Columns, true, true, isDrilldown);
    },

    //Color chooser
    setColorChooserColor: function (id, ctrl, color) {
        _setColorChooser(id, ctrl, color, null);
    },
    setColorChooserColorAndOnChange: function (id, ctrl, color, changeFunc) {
        _setColorChooser(id, ctrl, color, changeFunc);
    },

    //Events Binding
    bindDevExDropDownOnValueChange: function (id, fn) {
        _bindDevExDropDownEvents(id, "onValueChanged", fn);
    },

    bindDevExDropDownOnOpened: function (id, fn) {
        _bindDevExDropDownEvents(id, "onOpened", fn);
    },

    bindDevExTreeListOptionChange: function (id, fn) {
        _bindDevExTreeListEvents(id, "onOptionChanged", fn);
    },
    getParentIdFromTreeListOptionChangeArgs: function (e) {
        if (e && e.component.option().selectedRowKeys[0]) {
            var parentid = e.component.option().selectedRowKeys[0];
            if (!parentid) {
                parentid = 1;
            }

            return parentid;
        }

        return null;
    },
    popoverWithHtml: function (id, title, content) {
        return _createPopover(id, title, content, true);
    },
    setHierarchalListValueOnEdit: function (selectedValue, treeList) {
        if (selectedValue != "" && selectedValue != undefined && selectedValue != "0") {
            treeList.deselectAll();
            treeList.selectRows(selectedValue, true);
        } else {
            treeList.deselectAll();
        }
    },
    _CreateDevExDateTime: function (id, savedataid, isreadonly, date) {
        var myDate;
        if (date == null || date == "") {
            myDate = new Date;
            date = (myDate.getMonth() + 1) + "/" + myDate.getDate() + "/" + myDate.getFullYear() + ", " + myDate.getHours() + ":" + myDate.getMinutes();
            $(savedataid).val(date);

        }
        if (isreadonly) { date = null; }
        $(id).dxDateBox({

            type: "datetime",
            value: date,
            //readOnly: isreadonly,
            disabled: isreadonly,
            onValueChanged: function (data) {
                //alert( data.value);
                //$(savedataid).val(getDateString(data.value));
                $(savedataid).val(data.value);
            }
        });
    }
};

//Private methods

function _createlabel(id, name, textBox) {
    if (name == null || name == undefined || name == '') {
        name = id;
    }
    //var label = '<div><div class="col-sm-2 text-right"><label class="required control-label" for=' + id + '>' + name + '</label></div>' + textBox + '</div>';
    var label = '<div class="form-group"><label class="required" for=' + id + '>' + name + '</label>' + textBox + '</div>';
    return label;
}

function _createTextBox(id, name, isRequired, isStringLength, maxLength, minLength, compareTo, type) {
    //var input = $('<div class="col-sm-4"><input class="form-control valid" data-val="true" id="' + id + '" name="' + id + '" type="' + (type || "text") + '" value="" isDynamic="true" /></div>');
    var input = $('<input class="form-control valid" data-val="true" id="' + id + '" name="' + id + '" type="' + (type || "text") + '" value="" isDynamic="true" />');


    if (name == null || name == undefined || name == '') {
        name = id;
    }

    var label = '<span class="field-validation-valid text-danger" data-valmsg-for="' + id + '" data-valmsg-replace="true"></span>';

    input = _applyValidations(input, name, isRequired, isStringLength, maxLength, minLength, compareTo, null);

    return $(input).prop('outerHTML') + label;
}


function _createSelectControl(id, name, isRequired, data, keyExpr, displayExpr) {
    var input = $('<select class="form-control valid" data-val="true" id="' + id + '" name="' + id + '" isDynamic="true" ></select>');

    if (name == null || name == undefined || name == '') {
        name = id;
    }

    if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            $(input).append('<option value="' + (data[i][keyExpr] || data[i][0]) + '">' + (data[i][displayExpr] || data[i][1]) + '</option>');
        }
    }

    var label = '<span class="field-validation-valid text-danger" data-valmsg-for="' + id + '" data-valmsg-replace="true"></span>';

    input = _applyValidations(input, name, isRequired, null, null, null, null, null);

    return $(input).prop('outerHTML') + label;
}

function _applyValidations(input, name, isRequired, isStringLength, maxLength, minLength, compareTo, requiredIf) {

    //Required
    if (isRequired) {
        $(input).attr('data-val-required', 'The ' + name + ' field is required.');
    }

    //Required If
    if (requiredIf != null || requiredIf != undefined) {
        var dependentCtrl = requiredIf["ctrl"];
        var dependentValue = requiredIf["value"];

        $(input).attr('data-val-requiredif', name + ' is required due to ' + dependentCtrl + ' being equal to ' + dependentValue + '.');
        $(input).attr('data-val-requiredif-dependentproperty', dependentCtrl);
        $(input).attr('data-val-requiredif-dependentvalue', dependentValue);
        $(input).attr('data-val-requiredif-operator', 'EqualTo');
    }

    //Compare with other
    if (compareTo != null || compareTo != undefined) {
        $(input).attr('data-val-equalto', 'The ' + name + ' field is not match with ' + compareTo + '.');
        $(input).attr('data-val-equalto-other', compareTo);
    }

    //String Length
    if (isStringLength) {

        if (maxLength != null && minLength != null) {
            $(input).attr('data-val-length', 'The field ' + name + ' must be a string with a minimum length of ' + minLength + ' and a maximum length of ' + maxLength + '.');
            $(input).attr('data-val-length-max', maxLength);
            $(input).attr('data-val-length-min', minLength);
        }
    }
    else {
        //Max Length
        if (maxLength != null) {
            $(input).attr('data-val-maxlength', 'The field ' + name + ' must be a maximum length of ' + maxLength + '.');
            $(input).attr('data-val-maxlength-max', maxLength);
        }

        //Min Length
        if (minLength != null) {
            $(input).attr('data-val-minlength', 'The field ' + name + ' must be a maximum length of ' + minLength + '.');
            $(input).attr('data-val-minlength-min', minLength);
        }
    }

    return $(input).prop('outerHTML');
}

function _createDateTimeTextbox(id, ctrlName, isRequired, extended) {
    var div = $('<span id="' + id + '" class="input-daterange form-inline"></span>');

    var ctrlFrm = '<div class="form-group ui-paramTxtval">' + _createTextBox((id + 'Frm'), ('From date'), isRequired, false, null, null) + '</div>';
    var ctrlTo = '<div class="form-group ui-paramTxtval">' + _createTextBox((id + 'To'), ('To date'), isRequired, false, null, null) + '</div>';

    div.append(ctrlFrm).append('<div class="form-group"><span class="ui-paramTo">TO</span></div>').append(ctrlTo);


    return $(div).prop('outerHTML');
}

function _createDevExTagBox(id, ctrlName, parentContainer, maxItems, selectedValues) {

    var container = $('<div id = "' + id + '" name = "' + ctrlName + '"></div>');
    $(parentContainer).append(container);

    var ctrlId = '#' + id;
    $(ctrlId).dxTagBox({
        acceptCustomValue: true,
        showClearButton: true,
        placeholder: 'Enter Value',
        //multiline: false,

        onCustomItemCreating: function (args) {
            var newValue = args.text,
                component = args.component,
                currentItems = component.option("items");

            for (var i = 0; i < component._selectedItems.length; i++) {

                if (newValue == component._selectedItems[i]) {
                    newValue = "";
                }
            }
            if (newValue != "") // This condition is added for if you want to pass the currentTabList 
                currentItems.unshift(newValue);
            return newValue;
        },
        onValueChanged: function (e) {
            
            $(e.element).css('border', '1px solid #ddd');
            _restrictMaxItemsInTagBox(e, maxItems);
        },
        onInitialized: function (e) {
            if(selectedValues != "") e.component.option("value", selectedValues);
        },
        onContentReady: function () {
            $('.dx-overlay-content').css('display', 'none');
        }

    }).dxTagBox('instance');

    return $(parentContainer).prop('outerHTML');
}

function _restrictMaxItemsInTagBox(e, maxItems) {
    if (maxItems != null && maxItems > 0) {
        if (e.value.length > maxItems) {
            var newValue = e.value.slice(0, maxItems);
            e.component.option("value", newValue);
        }
    }
}


//popovers
function _createPopover(id, ctrlName, content, isHtml) {
    var popover = $(id).popover({
        content: content || '',
        html: isHtml,
        title: ctrlName || "",
        container: 'body',
        placement: 'auto'
    });

    return popover;
}


function _createDevExMultiSelectDropdpwnList(id, name, isRequired, showClearBtn, responseData, selectedData, keyExpr, dataField, placeholder, height, requiredIf, isKeyExprZeroValues) {
    
    if (id != null && id != undefined && id.indexOf('#') == -1) {
        id = "#" + id;
    }

    var treeList;
    //var data = JSON.parse(responseData), //Comented By Emran
    var data = responseData, //modified By Emran
        selectedValue = selectedData || [],
        txtId = id;

    id = _addPostfixWithId(id, "Cmb");

    var dropdown = $(id).dxDropDownBox({
        placeholder: placeholder,
        showClearButton: showClearBtn,
        value: '',
        contentTemplate: function (e) {
            var value = e.component.option("value"),
                $treeListModules = $("<div id='" + id.replace('#', '') + "TreeList'>").dxTreeList({
                    height: height || 300,
                    dataSource: data,
                    keyExpr: keyExpr || "",
                    rootValue : (isKeyExprZeroValues != undefined || isKeyExprZeroValues == true) ? "-1" : "0",
                    showColumnHeaders: true,
                    filterRow: { visible: true },
                    selection: { allowSelectAll: true, mode: "multiple" },
                    columns: [{
                        dataField: dataField || "", caption: "Select All"
                    }],
                    showRowLines: false,
                    columnAutoWidth: false,
                    onSelectionChanged: function (e) {
                        selectedValue = _handleSelectionMultiSelect(e, dropdown, keyExpr, dataField);
                    },
                    onContentReady: function (e) {
                        _setMultiListValueOnEdit(data, selectedValue, treeList, keyExpr);     //_____set drop down value on Edit________
                    },
                });
            treeList = $treeListModules.dxTreeList("instance");
            return $treeListModules;
        },
        onContentReady: function (e) {
            //
            _setMultiDropdownTextOnEdit(data, id, selectedValue, keyExpr, dataField);          //_____set drop down value on Edit________
        },
        onValueChanged: function (e) {
            if (e.value == null) {
                if (treeList != null) {
                    treeList.deselectAll();
                    selectedValue = [];
                }
            }
        }
    }).dxDropDownBox('instance');
    if (isRequired || requiredIf != null) {
        txtId = txtId.replace('#', '');// + 'Value';
        var ErrorLabel = '<span class="field-validation-valid" data-valmsg-for="' + txtId + '" data-valmsg-replace="true"></span>',
         input = $(id + ' > div.dx-dropdowneditor-input-wrapper > div > div > input').addClass('valid').attr('id', txtId).attr('name', txtId).attr('data-val', 'true');

        input = _applyValidations(input, name, isRequired, false, null, null, null, requiredIf);
        //console.log(input);

        if ($('span[data-valmsg-for="' + txtId + '"]').length < 1) {
            $(id).after(ErrorLabel);
        }

    }

}

function _setMultiListValueOnEdit(data, selectedValue, treeList, keyExpr) {
    if (selectedValue.length > 0) {
        var temp = [];
        $.each(selectedValue, function (key, value) {
            temp.push(value[keyExpr]);
        });

        treeList.option('selectedRowKeys', temp);
    }
}

function _setMultiDropdownTextOnEdit(data, id, selectedValue, keyExpr, dataField) {
    var temp = []
    if (selectedValue.length > 4) {
        $(id).dxDropDownBox('instance').option('value', selectedValue.length + ' ' + dataField + '(s) selected');
    }
    else {
        /*$.each(selectedValue, function (key, value) {
            if (value && typeof (value) != "undefined") {
                temp.push(value[dataField]);
            }

            $(id).dxDropDownBox('instance').option('selectedRowKeys', temp);
           
        });*/

        for (var i = 0; i < selectedValue.length; i++) {
            var selItem = data.filter(function (x) { return x[keyExpr] == selectedValue[i][keyExpr] });
            if (selItem.length > 0) {
                temp.push(selItem[0][dataField]);
            }
        }

        $(id).dxDropDownBox('instance').option('value', temp.join(','));
    }
}

function _handleSelectionMultiSelect(e, dropdown, keyExpr, dataField) {
    debugger;
    var count = e.component.getSelectedRowsData().length;
    var selectedValues = e.component.getSelectedRowsData();
    var temp = [];
    if (count == 0) {
        dropdown.option("value", "");
        dropdown._input().val('');
    }
    else {
        if (count > 4) {
            dropdown.option("value", count + " " + dataField + "(s) selected");
            dropdown._input().val(count + " " + dataField + "(s) selected");
        }
        else {
            $.each(selectedValues, function (key, value) {
                temp.push(value[dataField]);
            });
            dropdown.option("value", temp.join(','));
            dropdown._input().val(temp.join(','));
        }
    }
    return selectedValues;
}



function _createDevExDropdpwnList(id, name, isRequired, showClearBtn, responseData, selectedData, keyExpr, dataField, placeholder, height, width, columnTemplateFun, isKeyExprZeroValues, valueChangedFun) {
    
    if (id != null && id != undefined && id.indexOf('#') == -1) {
        id = "#" + id;
    }

    var treeList;
    //var data = JSON.parse(responseData), // Comented By Emran
    var data = responseData, // Modified by Emran
        selectedValue = selectedData || '',
        txtId = id;

    var columns = [{
        dataField: dataField || ""
    }];

    if (columnTemplateFun && $.isFunction(columnTemplateFun)) {
        columns = [{
            dataField: dataField || '',
            cellTemplate: function (element, info) {
                columnTemplateFun(element, info);
            }
        }];
    }

    id = _addPostfixWithId(id, "Cmb");

    var dropdown = $(id).dxDropDownBox({
        placeholder: placeholder || "Select a value...",//"Select a value...",
        showClearButton: showClearBtn,
        value: '',
        contentTemplate: function (e) {
            var value = e.component.option("value"),
                $treeListModules = $("<div id='" + id.replace('#', '') + "TreeList'>").dxTreeList({
                    height: height || 300,
                    dataSource: data,
                    keyExpr: keyExpr || "",
                    rootValue: (isKeyExprZeroValues != undefined || isKeyExprZeroValues == true) ? "-1" : "0",
                    showColumnHeaders: false,
                    filterRow: { visible: true },
                    selection: { mode: "single" },
                    columns: columns,
                    showRowLines: false,
                    columnAutoWidth: false,
                    onSelectionChanged: function (e) {
                        _handleSelection(e, dropdown, keyExpr, dataField);
                    },
                    onContentReady: function (e) {
                        _setListValueOnEdit(data, selectedValue, treeList);     //_____set drop down value on Edit________
                    },
                    onDisposing: function (e) {

                    }
                });
            treeList = $treeListModules.dxTreeList("instance");
            return $treeListModules;
        },
        onContentReady: function (e) {
            _setDropdownTexOnEdit(data, id, selectedValue, keyExpr, dataField);          //_____set drop down value on Edit________
        },
        onValueChanged: function (e) {
            if (e.value == null) {
                if (treeList != null) {
                    treeList.deselectAll();
                    selectedValue = ""; //$("#moduleid").val("");
                }
            }

            if (valueChangedFun && $.isFunction(valueChangedFun)) {
                valueChangedFun(e.value);
            }
        },

    }).dxDropDownBox('instance');

    if (width && width != null && width != undefined) {
        dropdown.option('dropDownOptions', { width: width });
    }

    if (isRequired) {
        txtId = txtId.replace('#', '');// + 'Value';

        var ErrorLabel = '<span class="field-validation-valid" data-valmsg-for="' + txtId + '" data-valmsg-replace="true"></span>',
         input = $(id + ' > div.dx-dropdowneditor-input-wrapper > div > div > input').addClass('valid').attr('id', txtId).attr('name', txtId).attr('data-val', 'true');

        input = _applyValidations(input, name, true, false, null, null, null, null);
        //console.log(input);

        if ($('span[data-valmsg-for="' + txtId + '"]').length < 1) {
            $(id).after(ErrorLabel);
        }

    }

}

function _setDropdownTexOnEdit(data, id, selectedValue, keyExpr, dataField) {
    if (selectedValue != "" && selectedValue != undefined && selectedValue != "0") {
        $.each(data, function (index, value) {
            if (value[keyExpr] == selectedValue) {
                var dropdown = $(id).dxDropDownBox('instance');
                dropdown.option('value', value[dataField]);
            }
        });
    }
}

function _setListValueOnEdit(data, selectedValue, treeList) {

    if (selectedValue != "" && selectedValue != undefined && selectedValue != "0") {
        treeList.selectRows([selectedValue], true);
    }
    else {
        //treeList.selectRows(data[0].moduleid, true); //To Confirm
    }
}

function _handleSelection(e, dropdown, keyExpr, dataField) {
    var count = e.component.getSelectedRowsData().length;
    if (count > 0) {
        var _selectedObj = e.component.getSelectedRowsData()[0];
        var key = _selectedObj[keyExpr];
        var value = _selectedObj[dataField];
        dropdown.option("value", value);
        return key;
    }
}

function _addPostfixWithId(id, postfix) {
    var newID = id + postfix;
    $(id).attr('id', newID.replace('#', ''));
    return newID;
}


function _createDevExHierarchalList(id, name, isRequired, showClearBtn, responseData, selectedData, keyExpr, dataField, parentExpr, placeholder, height, iconClass, selectionMode, width, isfoldercreated) {

    if (id != null && id != undefined && id.indexOf('#') == -1) {
        id = "#" + id;
    }

    var treeList;
    var data = responseData,
        selectedValue = selectedData || '',
        txtId = id;

    id = _addPostfixWithId(id, "Cmb");

    var dropdown = $(id).dxDropDownBox({
        //valueExpr: "folderName",
        //displayExpr: "folderid",
        value: '',
        placeholder: placeholder || "Select a value...",
        showClearButton: showClearBtn || false,
        onContentReady: function (e) {
            _setHierarchalDropdownTexOnEdit(data, id, selectedValue, keyExpr, dataField);
        },
        dropDownOptions: {
            autoResizeEnabled: false,
            height: 300,
        },
        contentTemplate: function (e) {
            var dropDown2 = e;
            $treeList = $("<div id='" + id.replace('#', '') + "TreeList'>").dxTreeList({
                height: height || 300,
                dataSource: data,
                keyExpr: keyExpr || "",
                parentIdExpr: parentExpr || "",
                showColumnHeaders: false,
                filterRow: { visible: true },
                selection: { mode: selectionMode || "single" },
                columns: [{
                    dataField: dataField || "",
                    cellTemplate: function (element, info) {
                        element.prepend("<div ><i class='" + iconClass + "'>&nbsp;</i>" + info.text + "</div>");
                        $(element).closest('tr').attr(keyExpr, info.data["keyExpr"]);
                    }
                }],
                onSelectionChanged: function (e) {
                    if (!isfoldercreated || isfoldercreated == undefined)
                        _handleHierarchalSelection(e, dropDown2, keyExpr, dataField);
                    else var array1 = _handleHierarchalSelection1(e, dropDown2, keyExpr, dataField);
                },
                onContentReady: function (e) {
                    _setHierarchalListValueOnEdit(data, selectedValue, treeList);     //_____set drop down value on Edit________                        
                },
                showRowLines: false,
                columnAutoWidth: false,
            });
            treeList = $treeList.dxTreeList("instance");
            return $treeList;
        },
    }).dxDropDownBox('instance');

    if (width && width != null && width != undefined) {

        dropdown.option('dropDownOptions', { width: width });
    }

    if (isRequired) {
        txtId = txtId.replace('#', '');// + 'Value';

        var ErrorLabel = '<span class="field-validation-valid" data-valmsg-for="' + txtId + '" data-valmsg-replace="true"></span>',
         input = $(id + ' > div.dx-dropdowneditor-input-wrapper > div > div > input').addClass('valid').attr('id', txtId).attr('name', txtId).attr('data-val', 'true');

        input = _applyValidations(input, name, true, false, null, null, null, null);
        //console.log(input);

        if ($('span[data-valmsg-for="' + txtId + '"]').length < 1) {
            $(id).after(ErrorLabel);
        }

    }

}

function _setHierarchalListValueOnEdit(data, selectedValue, treeList) {    
    if (selectedValue != "" && selectedValue != undefined && selectedValue != "0") {
        treeList.deselectAll();
        treeList.selectRows(selectedValue, true);
    } else {
        treeList.deselectAll();
    }
    //treeList.repaint();
}

function _setHierarchalDropdownTexOnEdit(data, id, selectedValue, keyExpr, dataField) {
    if (selectedValue != "" && selectedValue != undefined && selectedValue != "0") {
        $.each(data, function (index, value) {
            if (value[keyExpr] == selectedValue) {
                var dropdown = $(id).dxDropDownBox('instance');
                dropdown.option('value', value[dataField]);
            }
        });
    }
}


function _handleHierarchalSelection(e, dropDown, keyExpr, dataField) {
    
    var count = e.component.getSelectedRowsData().length;
    if (count > 0) {
        var value = e.component.getSelectedRowsData()[0][dataField];
        dropDown.component.option("value", value);
    }
}

function _handleHierarchalSelection1(e, dropDown, keyExpr, dataField) {
    
    var count = e.component.getSelectedRowsData().length;
    if (count > 0) {
        var value = e.component.getSelectedRowsData()[0][dataField];
        dropDown.component.option("value", value);
        //return e.component.getSelectedRowsData()[0];

       // $('#dvParentFolder input[type="hidden"]').trigger("change");
    }
}


function _CreateDevExTreeList(id, responseData, selectedData, keyExpr, dataField, parentExpr, height, selectionMode, isBtnSearch, columnTemplateFun, showRowLines, showColumnHeaders, isDrilldown, isSkipSelectionIfAlreadySelected, expandedRowKeys) {
    if (id != null && id != undefined && id.indexOf('#') == -1) {
        id = "#" + id;
    }
    var txtSearch, chkbyBtn, btnSearch,
        selectedValue = selectedData || '',
        treeList;

    if (isBtnSearch) {
        txtSearch = $(id + 'SearchText');
        chkbyBtn = $(id + 'SearchBybtn');
        btnSearch = $(id + 'SearchBtn');
    }

    if (!expandedRowKeys) {
        expandedRowKeys = [1];
    }
    var setting = {
        dataSource: responseData,
        height: height,
        selection: { mode: selectionMode || "single" },
        keyExpr: keyExpr || '',
        filterRow: {
            visible: !isBtnSearch,
        },
        expandedRowKeys: expandedRowKeys,
        showRowLines: showRowLines || false,
        showColumnHeaders: showColumnHeaders || false,
        columnAutoWidth: false,
        onRowExpanded: function (e) { 
            if (isDrilldown) // For Drill down only
                _expandCurrentCollapsOtherRows(e);
        },
        onContentReady: function (e) {   
            // isSkipSelectionIfAlreadySelected means that make selection on initail load only, dont forcefully change user's selection afterwards automatically.
            debugger
            var selectedKeys = e.component.getSelectedRowKeys();
            if (isSkipSelectionIfAlreadySelected && selectedKeys.length > 0) {
                selectedValue = selectedKeys;
            }

            if (selectedValue != undefined && selectedValue != null && selectedValue.length > 0)
                _setHierarchalListValueOnEdit(responseData, selectedValue, $(id).dxTreeList('instance'));    
                    
            if (isBtnSearch) {
                _buttonSearchFilterTreelist(chkbyBtn, btnSearch, txtSearch, $(id).dxTreeList('instance'));
            }
        },
    };

    if ($.isArray(columnTemplateFun)) {
        setting.columns = columnTemplateFun
    }
    else if ($.isFunction(columnTemplateFun)) {
        setting.columns = [{
            dataField: dataField || '',
            cellTemplate: function (element, info) {
                columnTemplateFun(element, info);
            }
        },
            { // to enable search by description
                dataField: 'description',
                allowSearch: true,
                visible: false
            }
        ];

        // for making searches on both columnName and columnAlias
        if (dataField == 'columnAlias') {
            setting.columns.push({ // to enable search by description
                dataField: 'columnName',
                allowSearch: true,
                visible: false
            });
        }
        else if (dataField == 'columnName') {
            setting.columns.push({ // to enable search by description
                dataField: 'columnAlias',
                allowSearch: true,
                visible: false
            });
        }

    }


    if (parentExpr != null && parentExpr != '') {
        setting["parentIdExpr"] = parentExpr || "";
    }

    return treeList = $(id).dxTreeList(setting).dxTreeList('instance');
}

function _expandCurrentCollapsOtherRows(row) {        
    var currentRowKey = row.key;
    var AllExpandedRows = row.component.option("expandedRowKeys");
    $.each(AllExpandedRows, function (i, e) {
        if (e != currentRowKey)
            row .component.collapseRow(e);
    });
}


function _buttonSearchFilterTreelist(chkbyBtn, btnSearch, txtSearch, treeList) {
    chkbyBtn.unbind('change');
    chkbyBtn.change(function () {

        btnSearch.unbind('click');
        txtSearch.unbind('keyup');

        //txtSearch.unbind('focusout');
        //txtSearch.on('focusout', function () {
        //    treeList.searchByText("");
        //});

        if (chkbyBtn.prop('checked')) {
            btnSearch.removeAttr('disabled');
            btnSearch.click(function () {
                treeList.searchByText(txtSearch.val() || '');
            });
        }
        else {
            btnSearch.attr('disabled', 'disabled');
            txtSearch.on('keyup', function (e) {
                if (e.currentTarget.value.length > 2) {
                    treeList.searchByText(e.currentTarget.value || '');
                }
                else {
                    treeList.searchByText("");
                }
            });
        }

    }).trigger('change');
}


function _setColorChooser(id, ctrl, color, changeFn) {

    if (id != null && id != undefined && $.type(id) == "string" && id.indexOf('#') == -1) {
        id = "#" + id;
    }

    $(id).spectrum({
        showInitial: true,
        showInput: true,
        preferredFormat: "hex",
        color: color,
        showPalette: true,
        palette: [
            ['black', 'white', 'yellow', 'grey'],
            ['red', 'green', 'blue', 'orange'],
        ],
        change: function (color) {
            $(ctrl).val(color.toHexString());
            if (changeFn) {
                changeFn(color.toHexString());
            }
        }
    });

    
}


function _bindDevExDropDownEvents(id, eventName, eventFun) {
    var instance = $(id + 'Cmb').dxDropDownBox('instance');
    var events = Object.keys(instance.option());
    if ($.inArray(eventName, events) >= 0) {
        instance.option(eventName, function () {
            eventFun(instance.option('value'));
        });
        instance.option(eventName).call();
    }
}


function _bindDevExTreeListEvents(id, eventName, eventFun) {
    var instance = $(id).dxTreeList('instance');
    var events = Object.keys(instance.option());
    if ($.inArray(eventName, events) >= 0) {
        instance.option(eventName, eventFun);
        instance.option(eventName).call();
    }
}