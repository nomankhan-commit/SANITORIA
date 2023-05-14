let Brand = {

    loadGrid: function () {

        let columns = [
            { dataField: 'Brand1' },
            //{ dataField: 'CostingMethod' },
            //{ dataField: 'InventoryValuation' },
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
        let url = "/Products/LoadBrand";
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
        obj.Brand1 = $('#Brand').val();
        
        ajaxHealper.ajaxProcessor(url, "json", "POST", JSON.stringify(obj), true, (e) => {
            debugger;
            if (e.status != 2) {
                fin_common.showToast(1, e.message);
                window.location.href = fin_common.sitrurl + "Products/producBrand";
            }
            else {
                fin_common.showToast(2, e.message);
            }

        });

    },
    delete: function (id) {

        debugger;
        ajaxHealper.ajaxProcessor('/Products/deleteProductBrand', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;

            fin_common.showToast(1, e.message);
            Brand.loadGrid();


        });

    }

}