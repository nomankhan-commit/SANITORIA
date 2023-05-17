/*/*const { debug } = require("console");*/

var fin_common = {
    sitrurl: "https://localhost:44341/",
    showPanel: function (timeout = 3000, position = 'top', dev = 'body') {
        
        const loadPanel = $('.loadpanel').dxLoadPanel({
            shadingColor: 'rgba(0,0,0,0.4)',
            position: { position: dev },
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            closeOnOutsideClick: false,
            onShown() {
                setTimeout(() => {
                    //loadPanel.hide();
                }, timeout);
            },
            onHidden() {
                //showEmployeeInfo(employee);
            },
        }).dxLoadPanel('instance');

        return loadPanel;

    },
    showToast: function (type, msg) {

        if (type == 1) {
            toastr.success(msg);
        }
        else if (type == 2) {
            toastr.error(msg);
        }
        else if (type == 3) {
            toastr.info(msg);
        }
        else if (type == 4) {
            toastr.warning(msg);
        }
    },
    DocumentUploader: function () {

        //$('#uploadimge').on('change', function (e) {
        var d = new Date().valueOf();
        var n = d.toString();
        var result = '';
        var length = 32;
        var p = 0;
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = length; i > 0; --i) {
            result += ((i & 1) && n.charAt(p) ? n.charAt(p) : chars[Math.floor(Math.random() * chars.length)]);
            if (i & 1) p++;
        };
        var files = e.target.files;
        var myID = 3; //uncomment this to make sure the ajax URL works
        if (files.length > 0) {
            if (window.FormData !== undefined) {
                var data = new FormData();
                for (var x = 0; x < files.length; x++) {
                    data.append("file" + x, files[x]);
                }
                $.ajax({
                    type: "POST",
                    url: '/imageUploader/uploadimage?id=' + myID + '&name=' + result + '&folder=appoiments',
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        $("#imageBoxFor").html('<img src=/content/loading.gif style="width:200px">');
                    },
                    data: data,
                    success: function (result) {
                        debugger;
                        $("#imageAppoiment").val(result);
                        setTimeout(function () { $("#imageBoxFor").html('<img src=/Content/appoiments/' + result + '>'); }, 1500)


                    },
                    error: function (xhr, status, p3, p4) {
                        var err = "Error " + " " + status + " " + p3 + " " + p4;
                        if (xhr.responseText && xhr.responseText[0] == "{")
                            err = JSON.parse(xhr.responseText).Message;
                        console.log(err);
                    }
                });
            } else {
                alert("This browser doesn't support HTML5 file uploads!");
            }
        }
        // });




    },
    convertJsonDateToDate: function (date) {

        if (date == null || date == undefined || date == "undefined") {
            return "";
        }
        else {

            var date = new Date(parseInt(date.substr(6)));
            return date.toLocaleDateString('en-US')

        }



    },
    appCleave: function (elm, formate = 'thousand') {

        new Cleave(elm, {
            numeral: true,
            numeralThousandsGroupStyle: formate
        });

    },
    convertNumberToWords: function (amount, wordInputid) {
        debugger;
        var words = new Array();
        words[0] = '';
        words[1] = 'One';
        words[2] = 'Two';
        words[3] = 'Three';
        words[4] = 'Four';
        words[5] = 'Five';
        words[6] = 'Six';
        words[7] = 'Seven';
        words[8] = 'Eight';
        words[9] = 'Nine';
        words[10] = 'Ten';
        words[11] = 'Eleven';
        words[12] = 'Twelve';
        words[13] = 'Thirteen';
        words[14] = 'Fourteen';
        words[15] = 'Fifteen';
        words[16] = 'Sixteen';
        words[17] = 'Seventeen';
        words[18] = 'Eighteen';
        words[19] = 'Nineteen';
        words[20] = 'Twenty';
        words[30] = 'Thirty';
        words[40] = 'Forty';
        words[50] = 'Fifty';
        words[60] = 'Sixty';
        words[70] = 'Seventy';
        words[80] = 'Eighty';
        words[90] = 'Ninety';
        amount = amount.toString();
        var atemp = amount.split(".");
        var number = atemp[0].split(",").join("");
        var n_length = number.length;
        var words_string = "";
        if (n_length <= 9) {
            var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            var received_n_array = new Array();
            for (var i = 0; i < n_length; i++) {
                received_n_array[i] = number.substr(i, 1);
            }
            for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                n_array[i] = received_n_array[j];
            }
            for (var i = 0, j = 1; i < 9; i++, j++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    if (n_array[i] == 1) {
                        n_array[j] = 10 + parseInt(n_array[j]);
                        n_array[i] = 0;
                    }
                }
            }
            value = "";
            for (var i = 0; i < 9; i++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    value = n_array[i] * 10;
                } else {
                    value = n_array[i];
                }
                if (value != 0) {
                    words_string += words[value] + " ";
                }
                if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Crores ";
                }
                if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Lakhs ";
                }
                if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Thousand ";
                }
                if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                    words_string += "Hundred and ";
                } else if (i == 6 && value != 0) {
                    words_string += "Hundred ";
                }
            }
            words_string = words_string.split("  ").join(" ");
        }

        $(wordInputid).val(words_string);
        return words_string;


    },
    getCurrentDatewithMonthName: function () {

        //--------date work--------//
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth());
        var yyyy = today.getFullYear()

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var month = monthNames[today.getMonth()];
        var todayDate = dd + "/" + month + "/" + yyyy

        return todayDate;
        //$("#date").val(todayDate);

    },
    printPreview: function (data) {
        var type = 'application/pdf';
        let blob = null;
        const blobURL = URL.createObjectURL(fin_common.pdfBlobConversion(data, 'application/pdf'));
        const theWindow = window.open(blobURL);
        const theDoc = theWindow.document;
        const theScript = document.createElement('script');
        function injectThis() {
            window.print();
        }
        theScript.innerHTML = 'window.onload = ${injectThis.toString()};';
        theDoc.body.appendChild(theScript);
    },
    pdfBlobConversion: function (b64Data, contentType) {
        //converts base64 to blob type for windows
        contentType = contentType || '';
        var sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset = offset + sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    },
    guid: function () {
        var u = '', i = 0;
        while (i++ < 36) {
            var c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1], r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            u += (c == '-' || c == '4') ? c : v.toString(16)
        }
        return "uuid" + u;
    },
    dropDownChangeEventes: function (dropDownOBJ, isEdit, categoryDropDownid, controlDropDownid) {
        debugger;
        data = {};
        data.vendorName = $(dropDownOBJ).val();
        data.isValueString = true;
        data.venderID = 0;
        // if (!isEdit)
        //{
        ajaxProcessor('json',
            'POST',
            'Common',
            'getProjectCategoryByVendorsID',
            JSON.stringify(data),
            categoryDropDownid,
            controlDropDownid,
            fin_common.successFunctionFor_dropDownChangeEventes,
            function (err) { });
        //}

    },
    successFunctionFor_dropDownChangeEventes: function (data, Catelm1, Contelm2) {
        debugger
        var categoryDropDown = '<option value="">---Select---</option>';
        var projectsDropDown = '<option value="">---Select---</option>';
        if (data != null) {

            for (var i = 0; i < data[0].length; i++) {
                categoryDropDown += '<option value="' + data[0][i].Category + '"> ' + data[0][i].Category + ' </option>';

            }
            for (var i = 0; i < data[1].length; i++) {
                projectsDropDown += '<option value="' + data[1][i].Control + '"> ' + data[1][i].Control + ' </option>';

            }
            $(Catelm1).html(categoryDropDown)
            $(Contelm2).html(projectsDropDown)//pwd is project drop donw id

        }

    },
    errorFunctionFor_dropDownChangeEventes: function (error) {

        alert(error.statusText)
    },
    Populate_Report_Data: function () {

        //fin_common.showPanel(3000, 'top', 'body').show();
        debugger;
        var url = "/Common/Populate_Report_Data";
        var dataType = "json";
        var postType = "POST";
        var data = null;
        var xxhr = ajaxHealper.ajaxProcessor(url, dataType, postType, data, false, function (success, extrapram) {
            debugger;
            //fin_common.showToast(1, success.msg)
        },
            function (error) {

                fin_common.showToast(2, error)

            });


    },
    numberWithCommas: function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getLinkAccto_VT: function (vt, voucher_ID, bill_ID, imagePATH, amount, isOnlyBills) {

        debugger;
        if (amount == 0) {
            return 'javascript:;';
        }

        if (vt == 'BRV') {
            return "" + subFolder + "/BankReciept/Edit/" + voucher_ID;
        }
        else if (vt == 'BPV') {
            return "" + subFolder + "/BankPayment/Edit/" + voucher_ID;
        }
        else if (vt == 'CRV') {
            return "" + subFolder + "CashReceived/Edit/" + voucher_ID;
        }
        else if (vt == 'CPV') {
            return "" + subFolder + "/CashPayment/Edit/" + voucher_ID;
        }
        else if (vt == 'P_Bill' || vt == 'Bill') {
            return "" + subFolder + "/uploadITEMS/UN_VerifiedBill/" + imagePATH;
        }
        else {
            return 'javascript:;';
        }

    },
    convertDateToMonthName: function (data) {
        debugger
        let da = new Date(data).toLocaleDateString('fr-FR')
        var month1 = parseInt(da.split('/')[1])
        var day = parseInt(da.split('/')[0])
        var year = parseInt(da.split('/')[2])

        const monthNames = ['', "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        var month = monthNames[month1];
        var todayDate = day + "/" + month + "/" + year

        return todayDate;

    },
    get_and_apply_SecurityPolicy: function () {

        //fin_common.showPanel(3000, 'top', 'body').show();
        debugger;
        var url = "/Common/getuserSecurityPolicy";
        var dataType = "json";
        var postType = "POST";
        var data = null;
        var xxhr = ajaxHealper.ajaxProcessor(url, dataType, postType, data, true, function (success, extrapram) {
            debugger;
            //success.policyLList
            //dyn = new {
            //    userid = session.CSession.userid,
            //    policyLList = session.CSession.policylist,
            //    RequestControler = control,
            //    requesAction= action
            //};
            //success.RequestControler.replace(/[^a-z0-9\s]/gi, '')

            if (success != null && success.policyLList != null && success.policyLList.length > 0) {

                if (!success.policyLList[0].ispageBlock) {

                    if (success.policyLList[0].eventAccess.indexOf(",") != -1) {
                        var restrictedEvents = success.policyLList[0].eventAccess.split(',');
                        $.each(restrictedEvents, function (i, e) {

                            if (e == "Add") {
                                $(document).find(fin_enum.elm_add).remove()
                            }
                            if (e == "Edit") {
                                $(document).find(fin_enum.elm_edit).remove()
                            }
                            if (e == "Submit") {
                                $(document).find(fin_enum.elm_submit).remove()
                            }
                            if (e == "Move") {
                                $(document).find(fin_enum.elm_move).remove()
                            }
                            if (e == "Cancel") {
                                $(document).find(fin_enum.elm_cancel).remove()
                            }
                            if (e == "Delete") {
                                $(document).find(fin_enum.elm_delete).remove()
                            }

                        })
                    }
                    else {
                        var e = success.policyLList[0].eventAccess;
                        if (e == "Add") {
                            $(document).find(fin_enum.elm_add).remove()
                        }
                        if (e == "Edit") {
                            $(document).find(fin_enum.elm_edit).remove()
                        }
                        if (e == "Submit") {
                            $(document).find(fin_enum.elm_submit).remove()
                        }
                        if (e == "Move") {
                            $(document).find(fin_enum.elm_move).remove()
                        }
                        if (e == "Cancel") {
                            $(document).find(fin_enum.elm_cancel).remove()
                        }
                        if (e == "Delete") {
                            $(document).find(fin_enum.elm_delete).remove()
                        }
                    }


                }

            }

            //$('#myModal').modal('hide');
            //if (success.status) {
            //    fin_common.showToast(1, "Save succeccfully.")
            //} else {

            //    fin_common.showToast(2, "Some thing went wrong.")
            //}

            //setTimeout(function () { location.reload() }, 1000)

            //fin_banks.getData(id);
        },
            function (error) {

                fin_common.showToast(2, "some thing went wrog.")

            });


    },
    checkSession: function () {
        var issessionAlive = null;

        var url = "/Login/checkSession";
        var dataType = "json";
        var postType = "POST";
        var data = null;

        var xhr = $.ajax({
            type: postType,
            url: url,
            datatype: dataType,
            contentType: 'application/json; charset=utf-8',
            data: data,
            async: false,
            success: function (success) {

                issessionAlive = success.isSessionAlive;

            },
            error: function (error) {
                debugger;
                fin_common.showPanel().hide();
                fin_common.showToast(2, "some thing went wrog.")


            }
        });

        return issessionAlive;


    },
    convertDataToDatePicker: function (date) {

        let yyyy = fin_common.convertJsonDateToDate(date).split('/')[2];
        let mm = fin_common.convertJsonDateToDate(date).split('/')[0];
        let dd = fin_common.convertJsonDateToDate(date).split('/')[1];

        return yyyy + "-" + (mm > 10 ? mm : "0"+mm) + "-" + dd;

    },
    validateEmail: function (email) {

        if (email==null) {
            return false;
        }

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        } else {
            return (false)
        }
        
        

    },
    allLetter:function(inputtxt)
    {
    //var letters = /^[A-Za-z]+$/;
        var letters = /^[A-Za-z\s]*$/;
    if (inputtxt.match(letters)) {
        return true;
    }
    else {
        return false;
    }
    },
    hasDuplicateinJson: function(arrayObj, colName) {
        var hash = Object.create(null);
        return arrayObj.some((arr) => {
            return arr[colName] && (hash[arr[colName]] || !(hash[arr[colName]] = true));
        });
    },
    getDifferenceInDays: function (_date2, _date1) {

        //const date1 = new Date('7/13/2010');
        //const date2 = new Date('12/15/2010');
        const date1 = new Date(_date2);
        const date2 = new Date(_date1);
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);

    },
    validatePhone : function(txtPhone) {
        var a = document.getElementById(txtPhone).value;
var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
if (filter.test(a)) {
    return true;
}
else {
    return false;
}
    }
}

function ajaxProcessor(dataType, POST, controller, method, data, param1, param2, successFunction, errorFunction) {

    //var dataType = json;
    //var postType = POST;
    //var Controller = controller;
    //var Method = method;
    //var data = data;

    $.ajax({
        type: POST,
        url: "/" + controller + "/" + method,
        datatype: dataType,
        contentType: 'application/json; charset=utf-8',
        data: data,
        success: function (data) {

            successFunction(data, param1, param2)

        },
        error: errorFunction
    });

}