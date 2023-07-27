var ajaxHealper = {

    ajaxProcessor: function (url, dataType, postType, data, async, successfunction, errorFunction, extraParam) {

        //var cityname = $('#cityname').val();
        //var id = $('#cityID').val();

        //var dataType = 'json';
        //var postType = 'POST';
        //var Controller = 'Admin';
        //var Method = 'addCites';
        //var data = { id: id, city1: cityname };

        //var issessionalive = fin_common.checkSession();
        //if (issessionalive == null || issessionalive == false) {
        //    alert("Session has been expired.")
        //    location.href = "/Login/Index";
        //    return;
        //}

        var xhr = $.ajax({
            type: postType,
            url: url,
            datatype: dataType,
            contentType: 'application/json; charset=utf-8',
            data: data,
            async: async,
            success: function (success) {
                debugger;
                successfunction(success, extraParam)

                //debugger;

                //if (success.status == 1) {
                //    $('.citymodal').modal('hide')
                //    showToast(success.status, success.msg)
                //    setTimeout(function () { location.reload(); }, 2000)
                //}
                //else if (success.status == 2) {
                //    showToast(success.status, success.msg)
                //}
                //else {//3
                //    showToast(success.status, success.msg)
                //}


            },
            error: function (error) {
                debugger;
                //fin_common.showPanel().hide();
                fin_common.showToast(2, "some thing went wrog.")
                //errorFunction(error)
                //showToast(error.status, error.msg)

            }
        });


        return xhr;




    },
    ajaxProcessor_login: function (url, dataType, postType, data, async, successfunction, errorFunction, extraParam) {

        //var cityname = $('#cityname').val();
        //var id = $('#cityID').val();

        //var dataType = 'json';
        //var postType = 'POST';
        //var Controller = 'Admin';
        //var Method = 'addCites';
        //var data = { id: id, city1: cityname };

        var xhr = $.ajax({
            type: postType,// get , post, 
            url: url,
            datatype: dataType,
            contentType: 'application/json; charset=utf-8',
            data: data,
            async: async,
            success: function (success) {
                debugger;
                successfunction(success, extraParam)

                //debugger;

                //if (success.status == 1) {
                //    $('.citymodal').modal('hide')
                //    showToast(success.status, success.msg)
                //    setTimeout(function () { location.reload(); }, 2000)
                //}
                //else if (success.status == 2) {
                //    showToast(success.status, success.msg)
                //}
                //else {//3
                //    showToast(success.status, success.msg)
                //}


            },
            error: function (error) {
                debugger;
                fin_common.showPanel().hide();
                fin_common.showToast(2, "some thing went wrog.")
                //errorFunction(error)
                //showToast(error.status, error.msg)

            }
        });


        return xhr;




    }







}