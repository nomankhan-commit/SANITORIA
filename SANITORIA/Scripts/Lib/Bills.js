let Bills = {

    loadGrid: function () {

        let columns = [
            { dataField: 'bill_id', caption: "Bill Id" },
            { dataField: 'payMethod', caption: "Pay Method" },
            { dataField: 'rec', caption: "Recv Id" },
            { dataField: 'totalAmount', caption: "Total Amount" },
            {
                dataField: "Action", cellTemplate: function (container, options) {
                    debugger
                    var data = JSON.stringify(options.data);
                    var data_ = encodeURI(data);
                    $(`<div class="btn-group btn-group-sm">
              <button type="button" id="${options.data.id}" class="btn elm_edit" data="${data_}" title="Edit"><i class="fas fa-edit"></i></button>
              </div>`).appendTo(container);
                }
            }];
        let url = "/Bills/GetAll";
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (e) => {
            debugger;

                fin_common.showToast(1, "loades successfully.");
                devExHelper.bindGrid("#grid", e, columns, null, null, null, true);
            

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
            account: Bills.getAllBankDetails()
        }


        ajaxHealper.ajaxProcessor('/Bills/Create', "json", "POST", JSON.stringify(data), true, (e) => {
            debugger;
            if (e.status != 2) {
                fin_common.showToast(1, e.message);
                window.location.href = fin_common.sitrurl + "Bills/Index";
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

        let url = "/Bills/getbyid/" + id;
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
        ajaxHealper.ajaxProcessor('/Bills/delete', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;

            fin_common.showToast(1, e.message);
            Bills.loadGrid();


        });

    }

}