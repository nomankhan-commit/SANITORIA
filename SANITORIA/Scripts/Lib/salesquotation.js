let salesquotation = {
    company: null,
    vendor: null,
    warehouse: null,
    tax: null,
    varient: null,
    products: null,
    productsVarient: null,
    customer: null,
    loadGrid: function () {

        let columns = [
            { dataField: 'id', caption: "ID" },

            {
                dataField: 'company', caption: "Company", customizeText: function (cellInfo) {
                    debugger;
                    return salesquotation.company.data1.filter(e => { return e.id == cellInfo.value })[0].Comapny1;

                }
            },

            {
                dataField: 'Customer', caption: "Customer", customizeText: function (cellInfo) {
                    debugger;
                    return salesquotation.vendor.data1.filter(e => { return e.id == cellInfo.value })[0].vendorName

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

                    } else if (options.data.Status == "salesquotation") {
                        color = 'blue';
                    } else {
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
                    let styl = options.data.Status == "Purchase Order" ? 'style="display: none"' : "";


                    $(`<div class="btn-group btn-group-sm">
              <button type="button" id="${options.data.id}"  class="btn elm_edit" data="${data_}" title="Edit"><i class="fas fa-edit"></i></button>
              <button type="button" id="${options.data.id}" ${styl} class="btn delete elm_delete" title="Cancel"><i class="far fa-trash-alt"></i></button>
              </div>`).appendTo(container);
                }
            }];
        let url = "/salesquotation/getAll";
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

        if (salesquotation.getAllProductsDetails() == null || salesquotation.getAllProductsDetails() == undefined || salesquotation.getAllProductsDetails().length == 0) {
            fin_common.showToast(2, 'Please add product.');
            return;
        }

        if (!salesquotation.getAllProductsDetailsValidation()) {
            fin_common.showToast(2, 'Please fill all inputs fields.');
            return;
        }

        if (!salesquotation.checkNegative()) {
            fin_common.showToast(2, 'Value can not be negative.');
            return;
        }



        let obj = {};
        obj.id = $('#id').val();
        obj.Customer = $('#vendor').val();
        obj.orderDeadLine = $('#orderdeadline').val();
        obj.company = $('#company').val();
        obj.RecieptDate = $('#receiptdate').val();
        obj.currenty = $('#currency').val();
        obj.DeliverTo = $('#deliverto').val();

        let data = {
            data: obj,
            product: salesquotation.getAllProductsDetails()
        }


        ajaxHealper.ajaxProcessor('/salesquotation/Create', "json", "POST", JSON.stringify(data), true, (e) => {
            debugger;
            if (e.status != 2) {
                fin_common.showToast(1, e.message);
                window.location.href = fin_common.sitrurl + "salesquotation/Index";
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
    getAllProductsDetailsValidation: function () {

        let isvalid = true;

        $('#producttablebody tr').each((i, e) => {
            debugger;
            let guid = $(e).attr('bankGuid');
            let product = $(e).find('td[product] .product')
            //let varient = $(e).find('td[varient] .varient')
            let qty = $(e).find('td[qty] .qty')
            let unitprice = $(e).find('td[unitprice] .unitprice')
            let taxes = $(e).find('td[taxes] .tax')
            let subtotal = $(e).find('td[subtotal] .subtotal')

            //if (varient.val() == undefined || varient.val() == null || varient.val().length == 0) {
               // $(varient).addClass('inputborder')
                //isvalid = false;
            //} else {
                //$(varient).removeClass('inputborder')
            //}

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
    getByid: function (id) {

        let url = "/salesquotation/getbyid/" + id;
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (data) => {
            debugger;

            if (data.status == 1) {


                //'2023-04-07'


                $('#id').val(data.data1.salesquotation.id);
                $('#vendor').val(data.data1.salesquotation.Customer);
                $('#orderdeadline').val(fin_common.convertDataToDatePicker(data.data1.salesquotation.orderDeadLine));
                $('#company').val(data.data1.salesquotation.company);
                $('#receiptdate').val(fin_common.convertDataToDatePicker(data.data1.salesquotation.RecieptDate));

                $('#deliverto').val(data.data1.salesquotation.DeliverTo);
                $('#status_').html(data.data1.salesquotation.Status);
                $('#salesquotationid_').html(data.data1.salesquotation.salesquotation_id);

                $.each(data.data1.salesquotationProducts, (i, e) => {
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
                if (data.data1.salesquotation.Status != "SalesQuotations") {
                    $('input').prop("disabled", true);
                    $('select').prop("disabled", true);
                    $('button').prop("disabled", true);
                }


                fin_common.showToast(1, "successfully.");
            }

        });

    },
    delete: function (id) {

        debugger;
        ajaxHealper.ajaxProcessor('/salesquotation/delete', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;

            $('#status_').text('Cancel')
            fin_common.showToast(1, e.message);
            salesquotation.loadGrid();


        });

    },
    orderConform: function (id) {


        if (salesquotation.getAllProductsDetails() == null || salesquotation.getAllProductsDetails() == undefined || salesquotation.getAllProductsDetails().length == 0) {
            fin_common.showToast(2, 'Please add product.');
            return;
        }

        if (!salesquotation.getAllProductsDetailsValidation()) {
            fin_common.showToast(2, 'Please fill all inputs fields.');
            return;
        }

        if (!salesquotation.checkNegative()) {
            fin_common.showToast(2, 'Value can not be negative.');
            return;
        }


        debugger;
        ajaxHealper.ajaxProcessor('/salesquotation/ConformOrder', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;


            $('#status_').html('Sales order')
            $('input').prop("disabled", true);
            $('select').prop("disabled", true);
            $('button').prop("disabled", true);
            $('#cancel').show().prop("disabled", true);
            $('#conformorder').hide();
            fin_common.showToast(1, e.message);
            //salesquotation.loadGrid();


        });

    },
    calculate: function (tis) {

        debugger;
        let qty = $(tis).closest('tr').find('td[qty] .qty').val();
        let unitprice = $(tis).closest('tr').find('td[unitprice] .unitprice').val();
        let tax = $(tis).closest('tr').find('td[taxes] .tax').val();

        if ($(tis).hasClass('qty')) {

            let rq = parseInt($(tis).attr('rec_qty'));
            let q = parseInt($(tis).val());
            if (q>rq) {

                alert(`Actual quantity is ${rq} and your quanity is  ${q}`)
                $(tis).val('');
                return;
            }
        }


        let sumtotal = parseFloat(qty) * parseFloat(unitprice);

        if (tax != null && tax != undefined && tax.length > 0) {
            let tx = tax;
            let salesprice = sumtotal;
            let total = [];
            $.each(tx, (i, e) => {
                debugger;
                let tax_ = salesquotation.tax.data1.filter(o => o.id == e)[0];

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

        $('#overallsum').html("SumTotal: " + salesquotation.overAllSum())


    },
    overAllSum: function () {

        var ov = salesquotation.getAllProductsDetails().map(x => (x.subtotal));
        return ov.reduce((curr, next) => parseInt(curr) + parseInt(next));
    }


}