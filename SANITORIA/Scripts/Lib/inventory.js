

let inventory = {
    company: null,
    vendor: null,
    warehouse: null,
    tax: null,
    varient: null,
    products: null,
    productsVarient: null,
    loadGrid: function () {

        //['Recid', 'po_id', 'product', 'varientID', 'varient', 'qty', 'REC_qty', 'unitprice',
        //    'taxes', 'subtotal', 'pid', 'P_name', 'p_des', 'p_type', 'p_tax', 'invoicingPolicy',
        //    'salesPrice', 'cost', 'total', 'subCategory', 'unit', 'category', 'brand', 'company',
        //    'createAT', 'updateAt', 'createdBy', 'updatedBy', 'image', 'isActive']

        let columns = [
            { dataField: 'id', caption: "Rec Product" },
            { dataField: 'Recid', caption: "Rec Id" },
            //{ dataField: 'po_id', caption: "PO Id" },
            { dataField: 'product', caption: "Product Id" },
            { dataField: 'P_name', caption: "P-Name" },
            { dataField: 'varient', caption: "varient" },
            { dataField: 'REC_qty', caption: "Rec QTY" },
            { dataField: 'Temp_Rec_Qty', caption: "onHand" },
            { dataField: 'unitprice', caption: "unit price" },
            { dataField: 'unit', caption: "Unit" },
            { dataField: 'subCategory', caption: "subCategory" },
         
            //{ dataField: 'Recid', caption: "inventory Id" },
            //{ dataField: 'Recid', caption: "inventory Id" },
            //{ dataField: 'Recid', caption: "inventory Id" },
            //{ dataField: 'Recid', caption: "inventory Id" },
            
           ];
        let url = "/inventory/getAll";
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (e) => {
            debugger;

                fin_common.showToast(1, "loades successfully.");
                devExHelper.bindGrid("#grid", e, columns, null, null, null, true);
            

        });

    },
    save: function (url) {
        debugger;

        //'2023-04-07'
        if (inventory.getAllProductsDetails() == null || inventory.getAllProductsDetails() == undefined || inventory.getAllProductsDetails().length == 0) {
            fin_common.showToast(2, 'Please add product.');
            return;
        }

        if (!inventory.getAllProductsDetailsValidation()) {
            fin_common.showToast(2, 'Please fill all inputs fields.');
            return;
        }

        if (!inventory.checkNegative()) {
            fin_common.showToast(2, 'Value can not be negative.');
            return;
        }

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
            product: inventory.getAllProductsDetails()
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
            obj.varient = varient == undefined ? "" : varient.join(',');
            obj.qty = qty;
            obj.unitprice = unitprice;
            obj.taxes = taxes == undefined ? "" : taxes.join(',');
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


                $('#id').val(data.data1.inventory.id);
                $('#vendor').val(data.data1.inventory.vendor);
                $('#orderdeadline').val(fin_common.convertDataToDatePicker(data.data1.inventory.orderDeadLine));
                $('#company').val(data.data1.inventory.company);
                $('#receiptdate').val(fin_common.convertDataToDatePicker(data.data1.inventory.RecieptDate));

                $('#deliverto').val(data.data1.inventory.DeliverTo);
                $('#status_').html(data.data1.inventory.Status);
                $('#poid_').html(data.data1.inventory.PO_id);


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
                if (data.data1.inventory.Status == "Nothing to bill") {

                    $('#conformorder').hide()
                    $('#receivedorder').show()
                    $('input').prop("disabled", true);
                    $('select').prop("disabled", true);
                    $('.qty, .unitprice').prop("disabled", false);

                }
                else {
                    $('#conformorder').show()
                    $('#receivedorder').hide()

                    //$('#conformorder').hide()
                    //$('#receivedorder').show()
                    $('input').prop("disabled", true);
                    $('select').prop("disabled", true);
                    $('.qty, .unitprice, #orderdeadline, #receiptdate').prop("disabled", false);

                }

                if (data.data1.inventory.Status == "Cancel") {
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
            inventory.loadGrid();


        });

    },
    orderConform: function (id) {

        if (inventory.getAllProductsDetails() == null || inventory.getAllProductsDetails() == undefined || inventory.getAllProductsDetails().length == 0) {
            fin_common.showToast(2, 'Please add product.');
            return;
        }

        if (!inventory.getAllProductsDetailsValidation()) {
            fin_common.showToast(2, 'Please fill all inputs fields.');
            return;
        }

        if (!inventory.checkNegative()) {
            fin_common.showToast(2, 'Value can not be negative.');
            return;
        }


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

            //inventory.loadGrid();


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
                let tax_ = inventory.tax.data1.filter(o => o.id == e)[0];

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

        $('#overallsum').html("SumTotal: " + inventory.overAllSum())

    },
    overAllSum: function () {

        var ov = inventory.getAllProductsDetails().map(x => (x.subtotal));
        return ov.reduce((curr, next) => parseInt(curr) + parseInt(next));
    },
    getAllProductsDetailsValidation: function () {

        let isvalid = true;

        $('#producttablebody tr').each((i, e) => {
            debugger;
            let guid = $(e).attr('bankGuid');
            let product = $(e).find('td[product] .product')
            let varient = $(e).find('td[varient] .varient')
            let qty = $(e).find('td[qty] .qty')
            let unitprice = $(e).find('td[unitprice] .unitprice')
            let taxes = $(e).find('td[taxes] .tax')
            let subtotal = $(e).find('td[subtotal] .subtotal')

            if (varient.val() == undefined || varient.val() == null || varient.val().length == 0) {
                $(varient).addClass('inputborder')
                isvalid = false;
            } else {
                $(varient).removeClass('inputborder')
            }

            if (qty.val() == '') {
                isvalid = false;
                $(qty).addClass('inputborder')
            } else {
                $(qty).removeClass('inputborder')
            }

            if (unitprice.val() == '') {
                isvalid = false;
                $(unitprice).addClass('inputborder')
            } else {
                $(unitprice).removeClass('inputborder')
            }

            if (taxes.val().length == 0) {
                isvalid = false;
                $(taxes).addClass('inputborder')
            } else {
                $(taxes).removeClass('inputborder')
            }

            if (subtotal.val() == '') {
                isvalid = false;
                $(subtotal).addClass('inputborder')
            } else {
                $(subtotal).removeClass('inputborder')
            }


        })
        return isvalid;
    },
    checkNegative: function () {

        let isvalid = true;

        $('#producttablebody tr').each((i, e) => {
            debugger;

            let qty = $(e).find('td[qty] .qty')
            let unitprice = $(e).find('td[unitprice] .unitprice')

            if (parseInt(qty.val()) < 0) {
                $(qty).addClass('inputborder')
                isvalid = false;
            }
            else {
                $(qty).removeClass('inputborder')
            }

            if (parseInt(unitprice.val()) < 0) {
                isvalid = false;
                $(unitprice).addClass('inputborder')
            }
            else {
                $(unitprice).removeClass('inputborder')
            }




        })
        return isvalid;
    },

}