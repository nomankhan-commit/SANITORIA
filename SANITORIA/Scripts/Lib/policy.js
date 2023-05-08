//const { json } = require("modernizr");

var policy = {
    itemList: [],
    columns: [

        { dataField: 'id', sortOrder: 'desc' },
        { dataField: 'title', caption: "Ttile" },
        //{ dataField: 'controller', caption: "Controller"},
        //{ dataField: 'action', caption: "Action"},
        //{ dataField: 'eventsAccess', caption: "Event Access" },
        //{ dataField: 'isPageBlock', caption: "isPageBlock"},
        {
            dataField: "Action", cellTemplate: function (container, options) {
                debugger

                var data = JSON.stringify(options.data);
                var data_ = encodeURI(data);
                // <button type="button" id="${options.data.Bank_ID}" class="btn view" title="View" data="${data_}"><i class="fa fa-eye" aria-hidden="true"></i></button>
                $(`<div class="btn-group btn-group-sm">
              <a href="/Security/EditPolicy/${options.data.id}" id="${options.data.id}" class="btn elm_edit" data="${data_}" title="Edit"><i class="fas fa-edit"></i></a>
              </div>`).appendTo(container);
            }
        }
        //<button type="button" id="${options.data.id}" class="btn delete" title="Delete"><i class="far fa-trash-alt"></i></button>
    ],
    loadGrid: function (data) {

        fin_common.showPanel(3000, 'top', 'body').show();

        devExHealper.bindGrid("#grid", data, policy.columns, null, null, null, false);


        fin_common.showPanel().hide();



    },
    save: function (data) {

        //fin_common.showPanel(3000, 'top', 'body').show();
        debugger;
        var url = "/Security/CreatePolicy";
        var dataType = "json";
        var postType = "POST";
        var data = JSON.stringify({ formData: data, policylist: data.policylist });
        var xxhr = ajaxHealper.ajaxProcessor(url, dataType, postType, data, true, function (success, extrapram) {
            debugger;

            if (success.status == 1) {
                fin_common.showToast(1, "Save succeccfully.")
                $('#myModal').modal('hide');
                setTimeout(function () {
                    //    location.reload()
                    location.href = "/Security/Policy"
                }, 1000)
            } else {

                fin_common.showToast(2, success.msg)
            }

            //fin_banks.getData(id);
        },
            function (error) {

                fin_common.showToast(2, "some thing went wrog.")

            });

    },
    getFormData: function () {

        var id = $('#id').val()
        var title = $('#title').val()
        //var users = $("#Users").val()

        var formData = {};
        formData.id = id;
        formData.title = title;
        //formData.users = users;
        formData.users = null;
        formData.policylist = policy.getPolicylist();

        return formData;
    },
    getPolicylist: function () {
        policy.itemList = [];
        $("#itemTablebody tr").each(function (i, e) {
            var obj = {};
            obj.controller = $(e).find('.controller').val()
            obj.action = $(e).find('.action').val()
            obj.ispageBlock = $(e).find('.ispageblock').is(":checked")
            obj.eventAccess = $(e).find('.events ').val().join(",")
            //$("select[name=projects]").val().join(',')

            policy.itemList.push(obj);

        })

        return policy.itemList;

    },
    bindDataonEdit: function (data) {

        debugger;
        console.log(data)
        $('#title').val(data.title).trigger('change');
        //var users = data.users.split(',');
        //$('#Users').val(users).trigger('change');
        $('#id').val(data.id);

        if (policylist != null) {
            policy.bindpolicylist(policylist);
        }

    },
    bindpolicylist: function (list) {


        $.each(list, function (e, i) {

            $('#additemRow').trigger('click')

        })

        $("#itemTablebody tr").each(function (i, e) {

            $(e).find('.controller').val(list[i].controller)
            $(e).find('.action').val(list[i].action)
            $(e).find('.ispageblock').prop("checked", list[i].ispageBlock);

            if (list[i].eventAccess != null) {
                $(e).find('.events').val(list[i].eventAccess.split(',')).trigger('change')
            }



        })


    },
    delete: function (id) {

        var url = "/PO/makeCancel_register";
        var dataType = "json";
        var postType = "POST";
        var data = JSON.stringify({ id: id });
        var xxhr = ajaxHealper.ajaxProcessor(url, dataType, postType, data, true, function (success, extrapram) {
            debugger;

            fin_common.showToast(1, "Delete succeccfully.")

            setTimeout(function () { location.reload() }, 1000)

        },
            function (error) {

                fin_common.showToast(2, "some thing went wrog.")

            });

    },
    checkPolicyNameAlreadyExist: function (policyName) {
        var result = null;
        //fin_common.showPanel(3000, 'top', 'body').show();
        debugger;
        var url = "/Security/checkPolicyNameAlreadyExist";
        var dataType = "json";
        var postType = "POST";
        var data = JSON.stringify({ policy: policyName });
        var xxhr = ajaxHealper.ajaxProcessor(url, dataType, postType, data, false, function (success, extrapram) {
            debugger;

            if (success.status == 1) {
                result = false;
            }
            else {
                result = true;
                fin_common.showToast(2, success.msg)
            }


        },
            function (error) {

                fin_common.showToast(2, "some thing went wrog.")

            });
        return result;
    },

}