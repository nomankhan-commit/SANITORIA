

let po = {
    company: null,
    vendor: null,
    warehouse: null,
    tax: null,
    varient: null,
    products: null,
    productsVarient: null,
    loadGrid: function () {

        let columns = [
            { dataField: 'PO_id', caption: "PO Id" },
            { dataField: 'RFQ_ID', caption: "po ID" },

            {
                dataField: 'company', caption: "Company", customizeText: function (cellInfo) {
                    debugger;
                    return po.company.data1.filter(e => { return e.id == cellInfo.value })[0].Comapny1;

                }
            },

            {
                dataField: 'vendor', caption: "Vendor", customizeText: function (cellInfo) {
                    debugger;
                    return po.vendor.data1.filter(e => { return e.id == cellInfo.value })[0].vendorName

                }
            },

            {
                dataField: 'RecieptDate', caption: "Reciept Date", customizeText: function (cellInfo) {
                    debugger;

                    return fin_common.convertDataToDatePicker(cellInfo.value);

                }
            },
            {
                dataField: 'orderDeadLine', caption: "Order Dead Line", customizeText: function (cellInfo) {
                    debugger;
                    return fin_common.convertDataToDatePicker(cellInfo.value);

                }
            },
            { dataField: 'currenty', caption: "Currency" },
            {
                dataField: 'Status', caption: "Status",

                cellTemplate: function (container, options) {
                    debugger
                    let color = 'green';
                    if (options.data.Status == "Purchase Order") {
                        color = 'green';

                    } else if (options.data.Status == "po") {
                        color = 'blue';
                    }
                    else if (options.data.Status == "Nothing to bill") {
                        color = 'gray';
                    }
                    else {
                        color = 'red';
                    }

                    $(`<p  style='color:${color}'> ${options.data.Status} </p>`).appendTo(container);
                }
            },


            {
                dataField: "Action", cellTemplate: function (container, options) {
                    debugger
                    var data = JSON.stringify(options.data);
                    var data_ = encodeURI(data);
                    let styl = options.data.Status == "Nothing to bill" ? 'style="display: none"' : "";

                    $(`<div class="btn-group btn-group-sm">
              <button type="button" id="${options.data.id}" class="btn elm_edit" data="${data_}" title="Edit"><i class="fas fa-edit"></i></button>
              <button type="button" id="${options.data.id}" ${styl} class="btn delete elm_delete" title="Cancel"><i class="far fa-trash-alt"></i></button>
              </div>`).appendTo(container);
                }
            }];
        let url = "/PurchaseOrder/getAll";
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

        //'2023-04-07'


        let obj = {};
        obj.id = $('#id').val();
        obj.vendor = $('#vendor').val();
        obj.orderDeadLine = $('#orderdeadline').val();
        obj.company = $('#company').val();
        obj.RecieptDate = $('#receiptdate').val();
        obj.currenty = $('#currency').val();
        obj.DeliverTo = $('#deliverto').val();

        let data = {
            data: obj,
            product: po.getAllProductsDetails()
        }


        ajaxHealper.ajaxProcessor('/PurchaseOrder/Create', "json", "POST", JSON.stringify(data), true, (e) => {
            debugger;
            if (e.status != 2) {
                fin_common.showToast(1, e.message);
                window.location.href = fin_common.sitrurl + "/purchaseorder/Index";
            }
            else {
                fin_common.showToast(2, e.message);
            }

        });

    },
    getAllProductsDetails: function () {

        let data = [];

        $('#producttablebody tr').each((i, e) => {
            debugger;
            let guid = $(e).attr('bankGuid');
            let product = $(e).find('td[product] .product').val();
            let varient = $(e).find('td[varient] .varient').val();
            let qty = $(e).find('td[qty] .qty').val();
            let unitprice = $(e).find('td[unitprice] .unitprice').val();
            let taxes = $(e).find('td[taxes] .tax').val();
            let subtotal = $(e).find('td[subtotal] .subtotal').val();

            let obj = {};
            obj.id = $('#id').val();
            obj.product = product;
            obj.varient = varient.join(',');
            obj.qty = qty;
            obj.unitprice = unitprice;
            obj.taxes = taxes.join(',');
            obj.subtotal = subtotal;
            data.push(obj);

        })
        return data;
    },
    getByid: function (id) {

        let url = "/PurchaseOrder/getbyid/" + id;
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (data) => {
            debugger;

            if (data.status == 1) {


                //'2023-04-07'


                $('#id').val(data.data1.po.id);
                $('#vendor').val(data.data1.po.vendor);
                $('#orderdeadline').val(fin_common.convertDataToDatePicker(data.data1.po.orderDeadLine));
                $('#company').val(data.data1.po.company);
                $('#receiptdate').val(fin_common.convertDataToDatePicker(data.data1.po.RecieptDate));

                $('#deliverto').val(data.data1.po.DeliverTo);
                $('#status_').html(data.data1.po.Status);
                $('#poid_').html(data.data1.po.PO_id);


                $.each(data.data1.poProducts, (i, e) => {
                    debugger;
                    $('#addproduct').trigger('click');
                    let lastTR = $('#productTable tr').last();

                    $(lastTR).find('td[product] .product').val(e.product).trigger('change');
                    $(lastTR).find('td[varient] .varient').val(e.varient.split(','));
                    $(lastTR).find('td[qty] .qty').val(e.qty);
                  
                    $(lastTR).find('td[unitprice] .unitprice').val(e.unitprice);
                    $(lastTR).find('td[taxes] .tax').val(e.taxes.split(','));
                    $(lastTR).find('td[subtotal] .subtotal').val(e.subtotal);

                })
                $('.qty').trigger('keyup')
                if (data.data1.po.Status == "Nothing to bill") {

                    $('#conformorder').hide()
                    $('#receivedorder').show()
                    $('input').prop("disabled", true);
                    $('select').prop("disabled", true);
                    $('.qty, .unitprice').prop("disabled", false);

                }
                else
                {
                    $('#conformorder').show()
                    $('#receivedorder').hide()

                    $('#conformorder').hide()
                    $('#receivedorder').show()
                    $('input').prop("disabled", true);
                    $('select').prop("disabled", true);
                    $('.qty, .unitprice, #orderdeadline, #receiptdate').prop("disabled", false);

                }

                if (data.data1.po.Status == "Cancel") {
                    $('#conformorder').hide()
                    $('#receivedorder').hide()
                    $('#save').hide()
                    $('#email').hide()
                    $('#addproduct').hide()
                    $('input').prop("disabled", true);
                    $('select').prop("disabled", true);
                }


                fin_common.showToast(1, "successfully.");
            }

        });

    },
    delete: function (id) {

        debugger;
        ajaxHealper.ajaxProcessor('/PurchaseOrder/delete', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;

            fin_common.showToast(1, e.message);
            po.loadGrid();


        });

    },
    orderConform: function (id) {

        debugger;
        ajaxHealper.ajaxProcessor('/PurchaseOrder/ConformOrder', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;

            fin_common.showToast(1, e.message);
            $('#status_').html('Nothing to bill')
            $('input').prop("disabled", true);
            $('select').prop("disabled", true);
            $('.qty, .unitprice').prop("disabled", false);

            $('#conformorder').hide();
            $('#receivedorder').show();

            //po.loadGrid();


        });

    },
    calculate: function (tis) {

        debugger;
        let qty = $(tis).closest('tr').find('td[qty] .qty').val();
        let unitprice = $(tis).closest('tr').find('td[unitprice] .unitprice').val();
        let tax = $(tis).closest('tr').find('td[taxes] .tax').val();

        let sumtotal = parseFloat(qty) * parseFloat(unitprice);

        if (tax != null && tax != undefined && tax.length > 0) {
            let tx = tax;
            let salesprice = sumtotal;
            let total = [];
            $.each(tx, (i, e) => {
                debugger;
                let tax_ = po.tax.data1.filter(o => o.id == e)[0];

                if (tax_.taxComputation == 2) {
                    let d = (parseFloat(salesprice) / 100) * tax_.amount;
                    total.push(parseFloat(salesprice) + d);
                }
                else {
                    let d = tax_.amount;
                    total.push(d);
                }
            })

            let txtotal = total.reduce((curr, next) => curr + next);

            let finalToal =
                txtotal < parseFloat(salesprice)
                    ? (parseFloat(salesprice) + txtotal)
                    : txtotal

            total = [];
            $(tis).closest('tr').find('td[subtotal] .subtotal').val(finalToal);
        }
        else {
            $(tis).closest('tr').find('td[subtotal] .subtotal').val(sumtotal);
        }

        $('#overallsum').html("SumTotal: " + po.overAllSum())

    },
    overAllSum: function () {

        var ov = po.getAllProductsDetails().map(x => (x.subtotal));
        return ov.reduce((curr, next) => parseInt(curr) + parseInt(next));
    }


}