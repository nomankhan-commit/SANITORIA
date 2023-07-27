let vendor = {

    loadGrid: function () {

        let columns = [
            { dataField: 'vendorName', caption: "Vendor Name" },
            { dataField: 'email', caption: "Email" },
            { dataField: 'phone', caption: "Phone" },
            {
                dataField: "Action", cellTemplate: function (container, options) {
                    debugger
                    var data = JSON.stringify(options.data);
                    var data_ = encodeURI(data);
                    $(`<div class="btn-group btn-group-sm">
              <button type="button" id="${options.data.id}" class="btn elm_edit" data="${data_}" title="Edit"><i class="fas fa-edit"></i></button>
              </div>`).appendTo(container);
                }

                // <button type="button" id="${options.data.id}" class="btn delete elm_delete" title="Delete"><i class="far fa-trash-alt"></i></button>

            }];
        let url = "/vendor/getAll";
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (e) => {
            debugger;

            if (e.status == 1) {
                fin_common.showToast(1, "loades successfully.");
                devExHelper.bindGrid("#grid", e.data1, columns, null, null, null, true);
            }

        });

    },
    save: function (url) {
        debugger;
        let obj = {};
        obj.id = $('#id').val();
        obj.vendorName = $('#vname').val();
        obj.phone = $('#phone').val();
        obj.email = $('#email').val();
        obj.website = $('#website').val();
        obj.address = $('#address').val();
        obj.zipcode = $('#zipcode').val();

        

        let data = {
            data: obj,
            account: vendor.getAllBankDetails()
        }


        ajaxHealper.ajaxProcessor('/vendor/Create', "json", "POST", JSON.stringify(data), true, (e) => {
            debugger;
            if (e.status != 2) {
                fin_common.showToast(1, e.message);
                window.location.href = fin_common.sitrurl + "vendor/Index";
            }
            else {
                fin_common.showToast(2, e.message);
            }

        });

    },
    getAllBankDetails: function () {

        let bank = [];

        $('#bankaccountBody tr').each((i, e) => {
            debugger;
            let guid = $(e).attr('bankGuid');
            let bankName = $(e).find('td[bankname] .bankname').val();
            let account = $(e).find('td[accountnumber] .account').val();
          
            let obj = {};
            obj.v_id = $('#id').val();
            obj.bankname = bankName;
            obj.account = account;
            obj.bankGudi = guid;
            bank.push(obj);

        })
        return bank;


    },
    getByid: function (id) {

        let url = "/vendor/getbyid/" + id;
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (data) => {
            debugger;
            
            if (data.status == 1) {

                $('#id').val(data.data1.vendor_.id);
                $('#vname').val(data.data1.vendor_.vendorName);
                $('#phone').val(data.data1.vendor_.phone);
                $('#email').val(data.data1.vendor_.email);
                $('#website').val(data.data1.vendor_.website);
                
                document.getElementById('address').textContent = data.data1.vendor_.address;

                $('#zipcode').val(data.data1.vendor_.zipcode);
              
                //$("#imagebox").html('<img src=/Content/ProductImages/' + data.data1.product.image + '>');

                $.each(data.data1.bankaccount, (i, e) => {
                    debugger;
                    $('#addbankaccount').trigger('click');
                    let lastTR = $('#bankaccountBody tr').last();
                    $(lastTR).find('td[bankname] .bankname').val(e.bankName);
                    $(lastTR).find('td[accountnumber] .account').val(e.account);
                    $(lastTR).attr('variantguid', e.bankGudi);
                    
                })


                fin_common.showToast(1, "successfully.");
            }

        });

    },
    delete: function (id) {

        debugger;
        ajaxHealper.ajaxProcessor('/vendor/delete', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;

            fin_common.showToast(1, e.message);
            vendor.loadGrid();


        });

    }

}