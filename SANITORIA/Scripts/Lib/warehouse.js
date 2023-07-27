let warehouse = {

    loadGrid: function () {

        let columns = [
            { dataField: 'warehouse1', caption: "warehouse Name" },
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
        // <button type="button" id="${options.data.id}" class="btn delete elm_delete" title="Delete"><i class="far fa-trash-alt"></i></button>
        let url = "/warehouse/getAll";
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
        obj.warehouse1 = $('#warehouse').val();
        obj.address = $('#address').val();
        

        ajaxHealper.ajaxProcessor('/warehouse/Create', "json", "POST", JSON.stringify(obj), true, (e) => {
            debugger;
            if (e.status != 2) {
                fin_common.showToast(1, e.message);
                window.location.href = fin_common.sitrurl + "warehouse/Index";
            }
            else {
                fin_common.showToast(2, e.message);
            }

        });

    },
    delete: function (id) {

        debugger;
        ajaxHealper.ajaxProcessor('/Warehouse/delete', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;

            fin_common.showToast(1, e.message);
            warehouse.loadGrid();


        });

    },
    getByid: function (id) {

        let url = "/Warehouse/getbyid/" + id;
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (data) => {
            debugger;

            if (data.status == 1) {

                $('#id').val(data.data1.wherhouse.id);
                $('#warehouse').val(data.data1.wherhouse.warehouse1);
                document.getElementById('address').textContent = data.data1.wherhouse.address;
                fin_common.showToast(1, "successfully.");
            }

        });

    }
}