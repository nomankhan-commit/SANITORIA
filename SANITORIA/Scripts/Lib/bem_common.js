/// <reference path="ajaxHelper.js" />
/// <reference path="../toastr.min.js" />

var bem_common = {
    gridSettings: function (dataSrc, columns) {
        return {
            width: '100%',
            dataSource: dataSrc,// bem_aac_module.getData(deletedIndicator),//------------get Data
            columns: columns,
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
            loadPanel: { enabled: true },
            paging: { pageSize: 10 },
            pager: {
                allowedPageSizes: [10, 25, 50, 100], showNavigationButtons: true, showPageSizeSelector: true,
            },
            searchPanel: { width: 250, placeholder: "Search", visible: true },
            onRowClick: function (e) {
               
                if (e.rowElement.length > 0) {
                    if (e.rowElement.find(".checkRadioBtn").length > 0) {

                        e.rowElement.find(".checkRadioBtn").prop("checked", true);
                    }
                }

                
            },
        };
    },
    lazyLoad_gridSettings: function (dataSrc, columns) {
        return {
            width: '100%',
            height: 390,
            dataSource: dataSrc,// bem_aac_module.getData(deletedIndicator),//------------get Data
            columns: columns,
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
            loadPanel: { enabled: true },
            remoteOperations: { selection: true, allowSearch: true },
            scrolling: {
                mode: 'virtual'
            },
            paging: { enabled: false },
            selection:
            {
                mode: 'single', // change in multiple if checkbox is needed 
            },
            onSelectionChanged: function (selectedItems) {
                selectionChangedRaised = true;
            },
            onRowClick: function (e) {
                if (!selectionChangedRaised) {
                    var dataGrid = e.component;
                    var keys = dataGrid.getSelectedRowKeys();
                    dataGrid.deselectRows(keys);
                }
                selectionChangedRaised = false;
            },
            searchPanel: { width: 250, placeholder: "Search", visible: true },
            filterRow: { visibility: true, allowFilter: true },
        };
    },
    LoadData: function (dataSrc, columns, defaultpagesize, allowPageSizes, _allowMultipleselection, _selectionMode, _isallowFilter, _issortingfromServer) {
        return {
            dataSource: dataSrc,
            //columnMinWidth:50,
            //columnAutoWidth:true,
            // paging and filter attribute off when lazy loading not applied from server, requires totalCount
            remoteOperations: {
                paging: _isallowFilter,
                sorting: _issortingfromServer, //Specifies whether or not sorting must be performed on the server side.
                filtering: _isallowFilter,
                selection: true
               , allowSearch: true
            },
            filterRow: { visibility: _isallowFilter, allowFilter: _isallowFilter },
            searchPanel: { visible: true, placeholder: "Search...", allowSearch: true },
            headerfilter: { visible: _isallowFilter },
            selection: { allowSelectAll: _allowMultipleselection, mode: _selectionMode },
            paging: {
                pageSize: defaultpagesize
            },
            onContentReady: function (option) {
                if ($('#bem-selAll_chkBox').length > 0)
                    bem_common.gridSelectAllHandler($('#bem-selAll_chkBox')[0], "btnDeleteSelected", "btnRestoreSelected", ".bem-chkBox");
            },
            pager: {
                //showNavigationButtons: true,
                showPageSizeSelector: true,
                allowedPageSizes: allowPageSizes,
                showInfo: true,
                visible: true
            },
            columns: columns,
            rowAlternationEnabled: true,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
        };
    },
    LoadData1: function (dataSrc, columns, defaultpagesize, allowPageSizes, _allowMultipleselection, _selectionMode, _isallowFilter, _issortingfromServer) {
        return {
            dataSource: dataSrc,
            // paging and filter attribute off when lazy loading not applied from server, requires totalCount
            remoteOperations: {
                paging: _isallowFilter,
                sorting: _issortingfromServer, //Specifies whether or not sorting must be performed on the server side.
                filtering: _isallowFilter,
                selection: true
               , allowSearch: true
            },
            filterRow: { visibility: _isallowFilter, allowFilter: _isallowFilter },
            searchPanel: { visible: true, placeholder: "Search...", allowSearch: true },
            headerfilter: { visible: _isallowFilter },
            selection: { allowSelectAll: true, mode: "multiple", selectAllMode: "allPages", showCheckBoxesMode: "always" },
            paging: {
                pageSize: defaultpagesize
            },

            pager: {
                //showNavigationButtons: true,
                showPageSizeSelector: true,
                allowedPageSizes: allowPageSizes,
                showInfo: true,
                visible: true
            },
            columns: columns,
            rowAlternationEnabled: true,
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,

            //    //onSelectionChanged: function (selectedItems) {
            //    //    alert("changed");
            //}
        };
    },
    GetNewSystemCode: function (isPopup) {
        var systemCode;
        ajaxHelper.ajaxGetJson('/Common/GetNewSystemCode', function (data) {
            systemCode = data;
        }, isPopup, false);
        return systemCode;
    },
    getNewLicenseKey: function (isPopup) {
        var licenseKey;
        ajaxHelper.ajaxGetJson('/Common/GetNewLicenseKey', function (data) {
            licenseKey = data;
        }, isPopup, false);
        return licenseKey;
    },
    showStatusMsg: function (isPopup, msg, msgType, timeout) {
        if (!timeout) {
            timeout = '5000';
        }

        var notificationOptions = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": timeout,
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        if (toastr) {
            toastr.options = notificationOptions;

            if (isPopup) {
                if (msgType == 1) {//Success
                    toastr["success"](msg, "Success");
                }
                else if (msgType == 2) {//Error
                    if (msg && msg.length > 0) {
                        toastr["error"](msg, "Error");
                    }
                }
                else if (msgType == 3) {//Warning
                    toastr["warning"](msg, "Warning");
                }
            }
            else {
                if (msgType == 1) {//Success
                    toastr["success"](msg, "Success");
                }
                else if (msgType == 2) {//Error
                    if (msg && msg.length > 0) {
                        toastr["error"](msg, "Error");
                    }
                }
                else if (msgType == 3) {//Warning
                    toastr["warning"](msg, "Warning");
                }
            }
        }
    },
    hideStatusMsg: function (isPopup) {
        if (isPopup)
            $('.modal:visible').find('.status-msg').find('.alert').remove();
        else
            $('#statusDiv').find('.alert').remove();
    },
    ajaxError: function (jqXHR, exception) {
        var msg = '';
        if (jqXHR.status === 0 && exception === 'error') {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (jqXHR.status === 0 && exception === 'abort') {
            // here message is removed, so that when user cancels dashboard preview page execution then he should not see multiple error messages for ajax request abort.
           // msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        var html = $(jqXHR.responseText);
        var srvErr = $(html[1]).text();
        if (srvErr && srvErr.trim().length > 0) {
            msg += ' Server Error: ' + srvErr;
        }
        return msg;
    },
    validateForm: function (frm) {
        var form = Object.prototype.toString.call(frm) == '[object String]' ? document.getElementById(frm) : $(frm);
        return _validate(form);
    },
    validateTableRow: function (tr) {
        var elms = $('input[data-val="true"],select[data-val="true"]', tr) || [];
        if (elms.length > 0) {
            var isValid = true;
            for (var i = 0; i < elms.length; i++) {
                if (!bem_common.validateForm(elms[i]))
                    isValid = false;
            }
            return isValid;
        }
        else {
            return true;
        }
    },
    rebindValidation: function (frm) { //Must call after the dynamic controls added, for validations.
        var form = Object.prototype.toString.call(frm) == '[object String]' ? document.getElementById(frm) : $(frm);

        $(form).unbind();
        $(form).data("validator", null);
        $.validator.unobtrusive.parse(form);

    },
    hideSideMenu: function () {
        $('[data-toggle="ui-nav"]').trigger('click');
    },
    getGuid: function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    parseJsonAndDecode: function (value) {
        try {
            var obj = decodeURI(value);
            return JSON.parse(obj);
        } catch (e) {
            console.log(e.message, value);
            return {};
        }
    },
    stringfyJsonAndEncode: function (obj) {
        try {
            var value = JSON.stringify(obj);
            return encodeURI(value);
        } catch (e) {
            console.log(e.message, obj);
            return '';
        }
    },
    parseBoolean: function (string) {
        var bool;
        bool = (function () {
            switch (false) {
                case string.toLowerCase() !== 'true':
                    return true;
                case string.toLowerCase() !== 'false':
                    return false;
            }
        })();
        if (typeof bool === "boolean") {
            return bool;
        }
        return void 0;
    },
    getCommonParameterDataType: function (dataType) {
        switch (parseInt(dataType)) {
            case 1:
                return 'Text';
            case 2:
                return 'Number';
            case 3:
                return 'Date';
            case 4:
                return 'Bool';
            default:
                return '';
        }
    },
    getParameterTypeCustomQuery: function (dataType) {
        switch (parseInt(dataType)) {
            case 1:
                return 'Text';
            case 2:
                return 'Single Date';
            case 3:
                return 'Date';
            case 4:
                return 'Number';
            case 5:
                return 'Decimal';
            default:
                return '';
        }
    },
    getDataTypeKpiDataModel: function (dataType) {
        switch (parseInt(dataType)) {
            case 1:
                return 'Text';
            case 2:
                return 'Bool';
            case 3:
                return 'Date';
            case 4:
                return 'Number';
            default:
                return '';
        }
    },
    //Dashboard And Components
    //loadParamSubDataType: function (subDataType) {
    //    if (subDataType && subDataType != '') {
    //        var values = '';
    //        ajaxHelper.ajaxPostJsonData(JSON.stringify({ subDataType: parseInt(subDataType) }), '/Dashboard/GetParamSubTypeValues', function (data) {
    //            values = data;
    //        }, false, false);
    //        return values;
    //    }
    //},
    loadParamSubDataType: function (subDataType) {
        if (subDataType && subDataType != '') {
            var values = '';
            ajaxHelper.ajaxPostJsonData(JSON.stringify({ subType: parseInt(subDataType) }), '/Common/GetSubDateValue', function (data) {
                values = data;
            }, false, false);
            return values;
        }
    },
    getSubDateTypes: function () {
        var dateTypes = [];
        ajaxHelper.ajaxGetJson('/Common/GetSubDateTypes', function (data) {
            $.each(data, function (i, e) {
                dateTypes.push({ key: e.key, value: e.value });
            });
        }, false, false);
        return dateTypes;
    },
    getParamPriorDate: function (subDataType, fromDate, toDate) {
        if (subDataType && subDataType != '') {
            var values = '';
            ajaxHelper.ajaxPostJsonData(JSON.stringify({ subType: parseInt(subDataType), fromDate: fromDate, toDate: toDate }), '/Common/GetPriorFromToDates', function (data) {
                values = data;
            }, false, false);
            return values;
        }
    },
    //UI Helper
    btnLoading: function (id, showOrhide, xhr, lastHeading) {
        var ctrl = $(id),
            previous = $(id).text() || $(id).html() || "",
            loaderClass = '<i class="fa fa-circle-o-notch fa-spin"></i> Loading';

        if (ctrl != undefined && ctrl != null && showOrhide === 'show') {
            var deferred = $.Deferred();

            $(ctrl).html(loaderClass).attr('disabled', 'disabled');
            if (xhr != null && xhr != undefined) {
                xhr.complete(function () {

                    deferred.promise();
                    bem_common.btnLoading(id, 'hide', null, previous);
                    bem_common.enableButton(ctrl);    
                });
            }

            //setTimeout(function () {
            //    deferred.promise();
            //    bem_common.btnShowLoading(id, 'hide', null, previous);
            //}, 10000);
        }
        else if (ctrl != undefined && ctrl != null && showOrhide === 'hide') {
            $(ctrl).html(lastHeading).removeAttr('disabled');
        }
    },

    btnLoadingwithicon: function (id, showOrhide, xhr, lastHeading) {
        var ctrl = $(id);
        var previous = lastHeading;
        var loaderClass = '<i class="fa fa-circle-o-notch fa-spin"></i> Loading';
        if (ctrl != undefined && ctrl != null && showOrhide === 'show') {
            //var deferred = $.Deferred();
            $(ctrl).html(loaderClass).attr('disabled', 'disabled');
            if (xhr != null && xhr != undefined) {
                xhr.complete(function () {
                    //deferred.promise();
                    bem_common.btnLoadingwithicon(id, 'hide', null, previous);
                    bem_common.enableButton(ctrl);
                });
            }
            //setTimeout(function () {
            //    deferred.promise();
            //    bem_common.btnShowLoading(id, 'hide', null, previous);
            //}, 10000);
        }
        else if (ctrl != undefined && ctrl != null && showOrhide === 'hide') {
            $(ctrl).html(lastHeading).removeAttr('disabled');
        }
        },

    //showLoadinglTillTaskComplete: function (id, timeout, taskFun) {
    //    var panel = $(id).find('.loading-allow'),
    //            refreshBlock = $("<div class='refresh-block'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>");
    //    if (panel.length > 0) {
    //        refreshBlock.appendTo(panel);
    //    }
    //    else {
    //        refreshBlock.appendTo(id);
    //    }
    //    if (taskFun && $.isFunction(taskFun)) {
    //        taskFun();
    //    }

    //    if (timeout) {
    //        setTimeout(function () {
    //            bem_common.hideLoadingPanel(id);
    //        }, 1000);

    //    }
    //},
    disableButton: function (btn) {
        $(btn).prop("disabled", true).addClass("ui-disable");
    },        
      enableButton : function (btn) {
          $(btn).prop("disabled", false).removeClass('ui-disable');
    },  
    showLoadingPanel: function (id, timeout, height) {
        panel = $(id).find('.loading-allow');
        var refreshBlock;
        if (height != undefined) {
            refreshBlock = $("<div class='refresh-block' style='height:" + height + "px'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>");
        }
        else {
            refreshBlock = $("<div class='refresh-block'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>");
        }
        if (panel.length > 0) {
            refreshBlock.appendTo(panel).focus();
            $(id).addClass('hideOverFlow');
        }
        else {
            refreshBlock.appendTo(id).focus();
            $(id).addClass('hideOverFlow');
        }

        if (timeout) {
            setTimeout(function () {
                bem_common.hideLoadingPanel(id);
                $(id).removeClass('hideOverFlow');
            }, timeout);
        }
    },
    showLoadingPanel_Comp: function (id, timeout, height) {
        panel = $(id).find('.loading-allow');
        var refreshBlock;
        if (height != undefined) {
            refreshBlock = $("<div class='refresh-block' style='height:" + height + "px'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>");
        }
        else {
            refreshBlock = $("<div class='refresh-block'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>");
        }
        if (panel.length > 0) {
            refreshBlock.appendTo(panel).focus();
            $(id).addClass('hideOverFlow');
        }
        else {
            refreshBlock.appendTo(id).focus();
            $(id).addClass('hideOverFlow');
        }

        if (timeout) {
            setTimeout(function () {
                $(id).addClass('hideOverFlow');
                //bem_common.hideLoadingPanel(id);
                // $(id).removeClass('hideOverFlow');
            }, timeout);
        }
    },
    showLoadingPanelFullPage: function (id, timeout, height) {
        panel = $(id).find('.loading-allow');
        var refreshBlock;
        if (height != undefined) {
            refreshBlock = $("<div class='refresh-block' id='dsh_fullPageLoader' style='height:" + height + "px'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>");
        }
        else {
            refreshBlock = $("<div class='refresh-block'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>");
        }
        if (panel.length > 0) {
            refreshBlock.appendTo(panel).focus();
            $(id).addClass('hideOverFlow');
        }
        else {
            refreshBlock.appendTo(id).focus();
            $(id).addClass('hideOverFlow');
        }

        if (timeout) {
            setTimeout(function () {
                bem_common.hideLoadingPanelFullPage('#dsh_fullPageLoader');
                $(id).removeClass('hideOverFlow');
            }, timeout);
        }
    },
    showLoadingPanelOnXhr: function (id, xhr) {
        var panel = $(id).find('.loading-allow'),
                refreshBlock = $("<div class='refresh-block'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>");

        if (panel.length > 0) {
            refreshBlock.appendTo(panel);
        }
        else {
            refreshBlock.appendTo(id);
        }

        xhr.complete(function () {
            bem_common.hideLoadingPanel(id);
        });

        //if (timeout) {
        //    setTimeout(function () {
        //        bem_common.hideLoadingPanel(id);
        //    }, 1000);
        //}
    },

    hideLoadingPanel: function (id) {
        var panels = $(id).find('.loading-allow');
        if (panels.length > 0) {
            panels.find('.refresh-block').remove();
        }
        else {
            $(id).find('.refresh-block').remove();
        }
        $(id).removeClass('hideOverFlow');
    },
    hideLoadingPanelFullPage: function (id) {
        //var panels = $(id).find('.loading-allow');
        //if (panels.length > 0) {
        //    panels.find('.refresh-block').remove();
        //}
        //else {
        //    $(id).find('.refresh-block').remove();
        //}
        $(id).remove();
        $(id).find('.refresh-block').remove();
        $(id).removeClass('hideOverFlow');
    },
    handleIndexView: function (currBtnId, folderBtnId, listBtnId, gridBtnId, view) {
        $(currBtnId).addClass("active");
        switch (view) {
            case "grid":
                $('#' + folderBtnId).removeClass('active');
                $('#' + listBtnId).removeClass('active');
                $('.ui-folderviewtoggle').addClass('ui-girdView ');
                $('.ui-folderviewtoggle').addClass('ui-bgwhite');
                $('.ui-folderviewtoggle').removeClass('ui-folderlistview');
                break;

            case "folder":
                $('#' + gridBtnId).removeClass('active');
                $('#' + listBtnId).removeClass('active');
                $('.ui-folderviewtoggle').removeClass('ui-folderlistview');
                $('.ui-folderviewtoggle').removeClass('ui-girdView');
                $('.ui-folderviewtoggle').removeClass('ui-bgwhite');
                break;
            case "list":
                $('#' + folderBtnId).removeClass('active');
                $('#' + gridBtnId).removeClass('active');
                $('.ui-folderviewtoggle').addClass('ui-folderlistview');
                $('.ui-folderviewtoggle').removeClass('ui-girdView');
                $('.ui-folderviewtoggle').removeClass('ui-bgwhite');
                break;
            default:
                break;
        }
    },
    gridSelectAllHandler: function (selAllChkBox, btnDelId, btnRestoreId, chkBoxClass) {
        if (selAllChkBox.checked) {
            $('#' + btnDelId).removeAttr('disabled');
            if ($('#btnTrash').children('span').html() != "Go to Trash") {
                $('#' + btnRestoreId).removeAttr('disabled');
            } else {
                $('#' + btnRestoreId).attr('disabled', 'disabled');
            }
            //$('#' + btnRestoreId).removeAttr('disabled');
            var isDisabled;
            $(chkBoxClass).each(function () {
                isDisabled = $(this).parent("label").hasClass('ui-disable');
                if (!isDisabled)
                    $(this).prop('checked', true);
            });
        }
        else {
            $('#' + btnDelId).attr('disabled', 'disabled');
            $('#' + btnRestoreId).attr('disabled', 'disabled');
            $(chkBoxClass).each(function () {
                $(this).prop('checked', false);
            });
        }
    },
    //gridSelectAllHandler: function (selAllChkBox, btnDelId, btnRestoreId, chkBoxClass) {        
    //    if (selAllChkBox.checked) {
    //        $('#' + btnDelId).removeAttr('disabled');
    //        $('#' + btnRestoreId).removeAttr('disabled');
    //        var isDisabled;
    //        $(chkBoxClass).each(function () {
    //            isDisabled = $(this).parent("label").hasClass('ui-disable');
    //            if(!isDisabled)
    //                $(this).prop('checked', true);                    
    //        });
    //    }
    //    else {
    //        $('#' + btnDelId).attr('disabled', 'disabled');
    //        $('#' + btnRestoreId).attr('disabled', 'disabled');
    //        $(chkBoxClass).each(function () {
    //            $(this).prop('checked', false);
    //        });
    //    }
    //},
    gridCheckBoxHandler: function (chkBox, btnDelId, btnRestoreId) {
        var checkeditems = $('input:checkbox:checked' + chkBox).length;
        if (checkeditems > 0) {
            $('#' + btnDelId).removeAttr('disabled');
            if ($('#btnTrash').children('span').html() != "Go to Trash") {
                $('#' + btnRestoreId).removeAttr('disabled');
            } else {
                $('#' + btnRestoreId).attr('disabled', 'disabled');
            }
        }
        else {
            $('#' + btnDelId).attr('disabled', 'disabled');
            $('#' + btnRestoreId).attr('disabled', 'disabled');
        }
    },

    getOperatorByType: function (arg) {
        var model = {};
        model.type = arg.dataType;
        var xhr = ajaxHelper.ajaxPostJsonDataAndExtraParam(JSON.stringify(model), '/DataModel/GetOperatorByType', bem_common.getOperatorByTypeSuccess, false, true, arg);
        return xhr;
    },

    getOperatorByTypeSuccess: function (response, arg) {
        arg.bindChangeEvents(arg, response);
    },

    getOperatorByTypeAndSummaryFunc: function (arg) {
        var model = {};
        model.type = arg.dataType;
        model.func = arg.func;
        var xhr = ajaxHelper.ajaxPostJsonDataAndExtraParam(JSON.stringify(model), '/DataModel/GetOperatorByTypeAndSummaryFunc', bem_common.getOperatorByTypeAndSummaryFuncSucccess, false, true, arg);
        return xhr;
    },

    getOperatorByTypeAndSummaryFuncSucccess: function (response, arg) {
        arg.bindChangeEvents(arg, response);
    },

    fieldLoader: function (id, isvisible, className) {
        if (id != null && isvisible) {
            $(id).append("<span class='ui-miniloader'><img src='/images/mini-loader.gif' alt='' class='mCS_img_loaded'></span>");
        }
        else if (className != null && isvisible) {
            $(className).each(function () {
                if ($(this).find('input[type=text]').attr('disabled') == 'disabled' || $(this).find('input[type=password]').attr('disabled') == 'disabled') { //alert('disabled'); 
                } else {
                    ($(this).append("<span class='ui-miniloader'><img src='/images/mini-loader.gif' alt='' class='mCS_img_loaded'></span>"))
                }
            });
        }
        if (id != null && !isvisible) {
            $(id).find("span.ui-miniloader").remove();
        }
        else if (className != null && !isvisible) {
            $(className).find("span.ui-miniloader").remove();
        }

    },

    initGridsterForKpi: function (elem) {
        var gridsterSettings = {
            widget_selector: 'li',
            autogenerate_stylesheet: true,
            auto_init: false,
            widget_margins: [5, 5],
            widget_base_dimensions: [300, 180],
            resize: {
                enabled: true,
                axes: ['x'],
                stop: function (e, ui, $widget) {
                    bem_kpi.adjustGridsterSize();
                }
            },
            avoid_overlapped_widgets: true,
            autogrow_cols: true,
            //min_cols: 8,
            shift_widgets_up: false,
            shift_larger_widgets_down: false,
            collision: {
                wait_for_mouseup: true
            },
            min_rows: 30

        };

        return $(elem).gridster(gridsterSettings).data('gridster').disable();
    },
    loadGroups: function (selectedValues, userid) {
        var user = {};
        user.isDeleted = false;
        user.userid = userid;


        var xhr = ajaxHelper.ajaxPostJsonDataAndExtraParam(JSON.stringify(user), '/UserAccess/GetViewAsUsers', bem_common.loadGroupsSuccess, false, true, selectedValues);
    },

    loadGroupsSuccess: function (response, selectedValues) {

        bem_htmlHelper.singleSelectDropdown("#cmbGroups", "Groups", response, selectedValues, "userid", "Name");
        $('#confirm-Viewas').modal('show');
        //bem_common.rebindValidation('frmUser');
        //if (bem_uac_users.isEditUrl == "False")
        //    $("#cmbGroupsCmb").dxDropDownBox('instance').option("disabled", true);


    },
    replaceDateParameters: function (query, Parameters, type) {
        //;
        switch (type) {
            case 'subscription':
                {
                    $(Parameters).each(function (i, e) {
                        if (e.dataType === 3 && (e.fromValue != undefined && e.toValue != undefined)) {
                            // console.log(e.paramName); 
                            var dateparameterName = e.paramName;
                            var fromDate = dateparameterName.substring(0, dateparameterName.lastIndexOf('@')) + '_from@'; //console.log(fromDate);
                            var toDate = dateparameterName.substring(0, dateparameterName.lastIndexOf('@')) + '_to@'; //console.log(toDate);
                            query = query.replace(fromDate, "'" + e.fromValue + "'").replace(toDate, "'" + e.toValue + "'");
                            //console.log(query);
                        }
                    });
                }
            case 'dataalert':
                {
                    $(Parameters).each(function (i, e) {
                        if (e.dataType === 3 && (e.valueFrom != undefined && e.valueTo != undefined)) {
                            // console.log(e.paramName); 
                            var dateparameterName = e.paramName;
                            var fromDate = dateparameterName.substring(0, dateparameterName.lastIndexOf('@')) + '_from@'; //console.log(fromDate);
                            var toDate = dateparameterName.substring(0, dateparameterName.lastIndexOf('@')) + '_to@'; //console.log(toDate);
                            query = query.replace(fromDate, "'" + e.valueFrom + "'").replace(toDate, "'" + e.valueTo + "'");
                            //console.log(query);
                        }
                    });
                }

            default:

                $(Parameters).each(function (i, e) {
                    if (e.dataType === 3 && (e.fromValue != undefined && e.toValue != undefined)) {
                        // console.log(e.paramName); 
                        var dateparameterName = e.paramName;
                        var fromDate = dateparameterName.substring(0, dateparameterName.lastIndexOf('@')) + '_from@'; //console.log(fromDate);
                        var toDate = dateparameterName.substring(0, dateparameterName.lastIndexOf('@')) + '_to@'; //console.log(toDate);
                        query = query.replace(fromDate, "'" + e.fromValue + "'").replace(toDate, "'" + e.toValue + "'");
                       // console.log(query);
                    }
                });
        }

        return query;
    },
    widgetActivityEndLog: function (logid, actstatus, error, async, tempDataName) {
        var log = {};
        log.logid = logid;
        log.actStat = actstatus;
        log.error = error;
        log.tempDataName = tempDataName;
        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify(log), '/Common/WidgetExecutionActEndTime', function () { }, false, async);

    },
    WidgetActivityRenderStart: function (logid) {

        var log = {};
        log.logid = logid;

        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify(log), '/Common/WidgetExecutionRenderStartTime', function () { }, false, true);
    },
    WidgetActivityRenderEnd: function (logid) {

        var log = {};
        log.logid = logid;

        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify(log), '/Common/WidgetExecutionRenderEndTime', function () { }, false, true);
    },
    setDefaultPage: function (id, type) {
        var defaultSettings = {};
        defaultSettings.defaultPageid = id;
        defaultSettings.defaultType = type;
        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify(defaultSettings), '/Common/SetDefaultPage', function (response)
        { bem_common.showStatusMsg(false, response.msg, response.msgType); }
        , false, true);

    },
    setIsLeftMenuPinned: function (isLeftMenuPinned) {
        var defaultSettings = {};
        defaultSettings.isLeftMenuPinned = isLeftMenuPinned;
        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify(defaultSettings), '/Common/SetIsLeftMenuPinned', function (response) {
            if (response.msgType == 2) {
                bem_common.showStatusMsg(false, response.msg, response.msgType);
            }
        }
        , false, true);
    },
    saveFavorite: function (id, type) {
        var defaultSettings = {};
        defaultSettings.favoriteItemid = id;
        defaultSettings.favoriteItemTypeid = type;

        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify(defaultSettings), '/Common/SaveFavorite', function (response) {
            if (response.msgType == 1) {
                var $btn = $(".unfavorite[itemid=" + id + "]");
                $btn.attr('class', 'favorite').attr('title', 'Unfavorite').attr('favoriteid', response.data);
                $('span:first', $btn).text("Unfavorite");

                if ($btn.parents("li").length > 1) {
                    $($btn.parents("li")[1]).addClass("ui-foldrstarselected");
                }
            }

            bem_common.showStatusMsg(false, response.msg, response.msgType);
        }
            , false, true);
    },
    deleteFavorite: function (id) {
        var defaultSettings = {};
        defaultSettings.favoriteid= id;
       
        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify(defaultSettings), '/Common/DeleteFavorite', function (response) {
            if (response.msgType == 1) {
                var $btn = $("[favoriteid=" + id + "]");
                $btn.attr('class', 'unfavorite').attr('title', 'Favorite');
                $('span:first', $btn).text("Favorite");

                if ($btn.parents("li").length > 1) {
                    $($btn.parents("li")[1]).removeClass("ui-foldrstarselected");
                }
            }

            bem_common.showStatusMsg(false, response.msg, response.msgType);
        }
            , false, true);

    },
    enableDefaultPageSetting: function (id, isEnable) {

        if (isEnable) {
            $(id).removeAttr('disabled');
        }
        else {
            $(id).attr('disabled', 'disabled');
        }

    }, 
    getRecyclebinCount: function (moduleType) {
        var recyclebin = {};
        recyclebin.moduleType = moduleType || 0;
        var trashCount = 0;
        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify(recyclebin), "/Recyclebin/GetTrashItems", function (result) {

            $('#trashlength').text('Trash (Items ' + result.length + ')');

            trashCount = result.length;

        }, false, false);

        return trashCount;
    },

    getActivePallete: function () {
        
        var resultdata;
        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify({ palleteId: 0 }), "/AppSettings/GetPalleteGroups", function (result) {
            resultdata = result;
        }, false, false);

        return resultdata;
    },
    getPalleteGroups: function (palleteId) {
        var pallet = {};
        var resultdata;
        pallet.paletteid = parseInt(palleteId);
        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify(pallet), '/AppSettings/EditPaletteGroup', function (data) {
            resultdata = data;
        }, false, false);

        return resultdata;
    },

    getColorPalleteArray: function (color) {
        
        color=color==undefined?new Array():color;
        var colorsArray = new Array();
        if (color.length > 0) {
            for (var i = 0; i < color.length; i++) {
                if (color[i]['colorCode'] != "") {
                    colorsArray.push(color[i]['colorCode']);
                }
                else {
                    colorsArray.push("#000000");
                }

            }
        }
        else {
            colorsArray = "";
        }

        return colorsArray;
    },

    isInt: function (value) {
        return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
    },
    returnIconsInDataModelTree:function(providerid,datatype,providerDataType)
    {
        
        var icon = '';
        datatype = parseInt(datatype);
        switch (providerid)
        {
            case 5: // forexcel
            case 6:
                {
                    if (providerDataType.toLowerCase() == "text")
                    {
                        icon = "biui-ico-string";
                    }
                    else if (providerDataType.toLowerCase() == "integer" || providerDataType.toLowerCase() == "real")
                    {
                        icon = "biui-ico-numeric";
                    }
                    else if (providerDataType.toLowerCase() == "date")// || dataType == 'date' || dataType == 'time') 
                    {
                        icon = "fa fa-calendar";
                    }
                    else
                    {
                        icon = "biui-ico-boolean";
                    }
                    break;
                }
            default:

                {
                    if (datatype == 1) //|| dataType == 'nchar' || dataType == 'nvarchar' || dataType == 'varchar' || dataType == 'string')
                    {
                        icon = "biui-ico-string";
                    }
                    else if (datatype == 2)//|| dataType == 'smallint' || dataType == 'bigint' || dataType == 'decimal' || dataType == 'float' || dataType == 'real') 
                    {
                        icon = "biui-ico-numeric";
                    }
                    else if (datatype == 3)// || dataType == 'date' || dataType == 'time') 
                    {
                        icon = "fa fa-calendar";
                    }
                    else if (datatype == 4) //|| dataType == 'bool')
                    {
                        icon = "biui-ico-boolean";
                    }
                    break;
                }
        }

        return icon;
    },
    setActionLinks: function (totalCount, progressiveCount) {
        if (progressiveCount >= totalCount) {
            setTimeout(function () {
                $('#action_buttons').removeClass('ui-disable');
                $('ul.nav.navbar-nav.navbar-right.ui-main-rightnav.ui-Nofi').removeClass('ui-disable');
            }, 1500);
        }
    },
    loadOperatorByType: function (type, cmb) {
        var options = '';
        switch (parseInt(type)) {
            default:
            case 1:
                options += '<option value="1">is equal to</option>' +
                    '<option value="2">is not equal to</option>' +
                    '<option value="3">contains</option>' +
                    '<option value="4">does not contain</option>' +
                    '<option value="5">begins with</option>' +
                    '<option value="6">ends with</option>' +
                    '<option value="7">Is Null</option>' +
                    '<option value="8">Not Null </option>' +
                    '<option value="9">any of</option>' +
                    '<option value="10">none of</option>';
                break;
            case 2:
                options += '<option value="1">is equal to</option>' +
                    '<option value="2">is not equal to</option>' +
                    '<option value="16">Greater than</option>' +
                    '<option value="17">Less than</option>' +
                    '<option value="18">Greater than equal to</option>' +
                    '<option value="19">Less than equal to</option>' +
                    '<option value="7">Is Null</option>' +
                    '<option value="8">Not Null </option>' +
                    '<option value="9">any of</option>' +
                    '<option value="10">none of</option>';
                break;
            case 3:
                options += '<option value="15">Between</option>' +
                    '<option value="1">is equal to</option>' +
                    '<option value="2">is not equal to</option>' +
                    '<option value="16">Greater than</option>' +
                    '<option value="17">Less than</option>' +
                    '<option value="18">Greater than equal to</option>' +
                    '<option value="19">Less than equal to</option>' +
                    '<option value="7">Is Null</option>' +
                    '<option value="8">Not Null </option>' +
                    '<option value="9">any of</option>' +
                    '<option value="10">none of</option>';
                break;
            case 4:
            case 5:
                options += '<option value="1">is equal to</option>' +
                    '<option value="2">is not equal to</option>' +
                    '<option value="11">is greater than</option>' +
                    '<option value="12">is greater than or equal to</option>' +
                    '<option value="13">is less than</option>' +
                    '<option value="14">is less than or equal to</option>' +
                    '<option value="7">Is Null</option>' +
                    '<option value="8">Not Null </option>' +
                    '<option value="9">any of</option>' +
                    '<option value="10">none of</option>' +
                    '<option value="15"> Between</option>';
                break;
            case 6:
                options += '<option value="1">is equal to</option>' +
                    '<option value="2">is not equal to</option>' +
                    '<option value="11">is greater than</option>' +
                    '<option value="12">is greater than or equal to</option>' +
                    '<option value="13">is less than</option>' +
                    '<option value="14">is less than or equal to</option>' +
                    '<option value="7">Is Null</option>' +
                    '<option value="8">Not Null </option>' +
                    '<option value="9">any of</option>' +
                    '<option value="10">none of</option>' +
                    '<option value="15"> Between</option>';
                break;


        }
        $(cmb).html(options);
    },
    applyAutocomplete: function (selector, at, data) {        
        //reference url: https://github.com/ichord/At.js/wiki/Base-Document#settings
        if (!data) {
            data = [];
        }

        $(selector).atwho({
            at: at,
            data: data.sort(),            
            limit: 10
        });
    },
    applyAutocompleteFromExternalSource: function (selector, at, url, dataLimit) {
        //reference url: https://github.com/ichord/At.js/wiki/Base-Document#settings
        $(selector).atwho({
            at: at,
            //data: data.sort(),
            //data: '/Dashboard/GetAllUsernamesForAutoComplete',    // for testing username
            data: url,
            limit: dataLimit
        });
    },
    //testing
    setTableColumnsSize: function (componentColumns, columnSizeList) {
        $(columnSizeList).each(function (i, e) {
            if (!componentColumns[e.columnIndex].isHidden)
                componentColumns[e.columnIndex].columnWidth = e.columnWidth;
            //grid.columnOption(e.columnIndex, 'visibleWidth', e.columnWidth);
            //grid.columnOption(e.columnIndex, 'width', e.columnWidth);
        });

        return componentColumns;
    },
    // this method is used to show license dialog when license is expired and application is running on grace days case only.
    showLicenseInfo: function () {
        var xhr = ajaxHelper.ajaxGetJson('/License/GetLicenseInfo/', bem_common.showLicenseInfoSuccess, false, true);
    },
    showLicenseInfoSuccess: function (response) {
        if (response && response.length > 0) {
            $("body").append(response);
            $("#LicenseInfo").modal('show');
        }        
    },
    // this method is used to show license details
    showLicenseDetails: function () {
        var xhr = ajaxHelper.ajaxGetJson('/License/GetLicenseDetails/', bem_common.showLicenseInfoSuccess, false, true);
    },
    getNewLicense: function (licenseKey) {
        var xhr = ajaxHelper.ajaxPostJsonData(JSON.stringify({ licenseKey: licenseKey }), '/License/FixLicense', function (data) {
            if (data.msgType == '1') {
                bem_common.showStatusMsg(false, data.msg, data.msgType);
                $("#LicenseInfo").modal('hide');
                setTimeout(function () {
                    window.location.reload(true);
                }, 3500);
            }
            else {
                bem_common.showStatusMsg(true, data.msg, data.msgType);
            }

        }, false, true);
        bem_common.btnLoading('#btnRequestNewLicense', 'show', xhr);
    },
    addInHistory: function (url, pageTitle, stateObj) {
        //window.history.replaceState(stateObj, pageTitle, url);
        window.history.pushState(stateObj, pageTitle, url);
    },
    addPageHistory: function (currentPageUrl, selectedParent) {
        if (selectedParent != 1) {
            var newUrl = currentPageUrl + "/" + selectedParent;
            if (window.location.pathname != newUrl) {
                bem_common.addInHistory(newUrl, newUrl);
            }            
        }
        else if (window.location.pathname != currentPageUrl && window.location.pathname != currentPageUrl + "/") {
            bem_common.addInHistory(currentPageUrl, currentPageUrl);
        }
    },
    isPageReloaded: function () {
        //check for Navigation Timing API support
        if (window.performance) {
            if (performance.navigation.type == performance.navigation.TYPE_RELOAD || performance.navigation.type == performance.navigation.TYPE_BACK_FORWARD) {
                //console.info("This page is reloaded");
                return true;
            }
        }

        return false;       
    },
    isInternetExplorer: function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {  // If Internet Explorer, return version number
            return true;
        } else {
            return false;
        }
    },
    getUniqueFromArray: function (array) {
        var uniqueArray = [];

        for (var value of array) {
            if (uniqueArray.indexOf(value) === -1) {
                uniqueArray.push(value);
            }
        }
        return uniqueArray;
    },
    addParameterToUrl: function (param, url){
        _url = url;
        _url += (_url.split('?')[1] ? '&' : '?') + param;
        return _url;
    }
}

function _validate(form) {
    if (form == null || form == undefined) {
        throw "Invalid Form object to validate.";
        return false;
    }

    $(form).validate();

    if (!$(form).valid()) {
        //bem_common.showStatusMsg(false, "Error occured- need to update this msg later.", 2);
        return false;
    }
    return true;
}