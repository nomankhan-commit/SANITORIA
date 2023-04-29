let variants = {

    loadGrid: function () {

        let columns = [
            { dataField: 'VariantName' },
            //{ dataField: 'values' },
            //{ dataField: 'isMultiList' },
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
        let url = "/Products/LoadVariants";
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (e) => {
            debugger;

            if (e.status == 1) {
                fin_common.showToast(1, "User loades successfully.");
                devExHelper.bindGrid("#grid", e.data1, columns, null, null, null, true);
            }

        });

    },
    loadUser: function (data) {
        //data.imgGuid;
        $('#id').val(data.id);
        $('#attributename').val(data.VariantName);
        $('#attributevalues').val(data.values);
        document.getElementById('multiselect').checked = data.isMultiList;
        bem_htmlHelper.inputTextListWithTags('attributevalues', 'attributevalues', $('#attributevalues_div'), null, data.values == null  ? [] : data.values.split(','));
    },
    save: function (url) {

        let obj = {};
        obj.id = $('#id').val();
        obj.VariantName = $('#attributename').val();
        obj.values = bem_htmlHelper.getTagboxValues('attributevalues', []).join(',');  
        obj.isMultiList = document.getElementById('multiselect').checked;

        ajaxHealper.ajaxProcessor(url, "json", "POST", JSON.stringify(obj), true, (e) => {
            debugger;
            if (e.status != 2) {
                fin_common.showToast(1, e.message);
                window.location.href = fin_common.sitrurl + "Products/productvariants";
            }
            else {
                fin_common.showToast(2, e.message);
            }

        });

    },
    delete: function (id) {

        debugger;
        ajaxHealper.ajaxProcessor('/Products/deleteProductvariants', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;

            fin_common.showToast(1, e.message);
            variants.loadGrid();


        });

    }

}