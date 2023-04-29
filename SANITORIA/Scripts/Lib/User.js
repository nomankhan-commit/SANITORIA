let user = {

    loadGrid: function () {

        let columns = [
            { dataField: 'CompleteName' },
            { dataField: 'contactNo' },
            { dataField: 'email' },
            { dataField: 'isActive' },
            { dataField: 'nic' },
            {
                dataField: "Action", cellTemplate: function (container, options) {
                    debugger
                    var data = JSON.stringify(options.data);
                    var data_ = encodeURI(data);
                    $(`<div class="btn-group btn-group-sm">
              <button type="button" id="${options.data.id}" class="btn elm_edit" data="${data_}" title="Edit"><i class="fas fa-edit"></i></button>
              <button type="button" id="${options.data.id}" class="btn delete elm_delete" title="Delete"><i class="far fa-trash-alt"></i></button>
              </div>`).appendTo(container);
                }
            }];
        let url = "/Users/LoadUsers";
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (e) => {
            debugger;
            if (e.status == 1) {
                fin_common.showToast(1,"User loades successfully.");
                devExHelper.bindGrid("#usergrid", e.data1, columns, null, null, null, true);
            }
            

        });
        

    },
    loadUser: function (data) {
        //data.imgGuid;
        $('#id').val(data.id);
        $('#email').val(data.email);
        $('#completename').val(data.CompleteName);
        $('#password').val(data.password);
        $('#Cpassword').val(data.password);
        $('#contactno').val(data.contactNo);
        $('#nic').val(data.nic);
        $('#userimageguid').val(data.imgGuid);
        $("#imageBoxFor").html('<img src=/Content/UserImages/' + data.imgGuid + '>');
        document.getElementById('active').checked = data.isActive;

    },
    save: function (url) {

        let userobj = {};
        userobj.id = $('#id').val();
        userobj.email = $('#email').val();
        userobj.CompleteName = $('#completename').val();
        userobj.password = $('#password').val();
        //userobj.abc = $('#Cpassword').val();
        userobj.contactNo = $('#contactno').val();
        userobj.nic = $('#nic').val();
        userobj.imgGuid = $('#userimageguid').val();
        userobj.isActive = document.getElementById('active').checked;

        ajaxHealper.ajaxProcessor(url, "json", "POST", JSON.stringify(userobj), true, (e) => {
            debugger;
            if (e.status!=2)
            {
                fin_common.showToast(1, e.message);
                window.location.href = fin_common.sitrurl + "Users/index";
            }
            else
            {
                fin_common.showToast(2, e.message);
            }
           
        });

    },
    delete: function (id) {

        debugger;
        ajaxHealper.ajaxProcessor('/Users/Delete', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;
           
            fin_common.showToast(1, e.message);
            user.loadGrid();


        });

    }
   
}