﻿let SalesReceived = {
    company: null,
    vendor: null,
    customer: null,
    warehouse: null,
    tax: null,
    varient: null,
    products: null,
    productsVarient: null,
    loadGrid: function () {

        let columns = [
            { dataField: 'REC_id', caption: "Sales REC ID" },
            //{ dataField: 'so_ID', caption: "so ID" },

            {
                dataField: 'company', caption: "Company", customizeText: function (cellInfo) {
                    ;
                    return SalesReceived.company.data1.filter(e => { return e.id == cellInfo.value })[0].Comapny1;

                }
            },

            {
                dataField: 'customer', caption: "Customer", customizeText: function (cellInfo) {
                    ;
                    return SalesReceived.customer.data1.filter(e => { return e.id == cellInfo.value })[0].Name

                }
            },

            {
                dataField: 'RecieptDate', caption: "Reciept Date", customizeText: function (cellInfo) {
                    ;

                    return fin_common.convertDataToDatePicker(cellInfo.value);

                }
            },
            {
                dataField: 'orderDeadLine', caption: "Order Dead Line", customizeText: function (cellInfo) {
                    ;
                    return fin_common.convertDataToDatePicker(cellInfo.value);

                }
            },
            { dataField: 'currenty', caption: "Currency" },
            {
                dataField: 'Status', caption: "Status",

                cellTemplate: function (container, options) {
                    
                    let color = 'green';
                    if (options.data.Status == "Purchase Order") {
                        color = 'green';

                    } else if (options.data.Status == "SalesReceived") {
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
                    
                    var data = JSON.stringify(options.data);
                    var data_ = encodeURI(data);


                    let styl = "";

                    if (options.data.Status == "waiting for bill" || options.data.Status == "close") {
                        styl = 'style="display: none"';
                    }

                    $(`<div class="btn-group btn-group-sm">
              <button type="button" id="${options.data.id}" class="btn elm_edit" data="${data_}" title="Edit"><i class="fas fa-edit"></i></button>
              <button type="button" id="${options.data.id}" ${styl} class="btn delete elm_delete" title="Cancel"><i class="far fa-trash-alt"></i></button>
              </div>`).appendTo(container);
                }
            }];
        ;
        let url = "/SalesReccievd/getall";
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (e) => {
            ;

            if (e.status == 1) {
                fin_common.showToast(1, "loades successfully.");
                devExHelper.bindGrid("#grid", e.data1, columns, null, null, null, true);
            }

        });

    },
    save: function (url) {
        ;

        //'2023-04-07'
        if (SalesReceived.getAllProductsDetails() == null || SalesReceived.getAllProductsDetails() == undefined || SalesReceived.getAllProductsDetails().length == 0) {
            fin_common.showToast(2, 'Please add product.');
            return;
        }

        if (!SalesReceived.getAllProductsDetailsValidation()) {
            fin_common.showToast(2, 'Please fill all inputs fields.');
            return;
        }

        if (!SalesReceived.checkNegative()) {
            fin_common.showToast(2, 'Value can not be negative.');
            return;
        }

        if (!SalesReceived.checkGreater()) {
            fin_common.showToast(2, 'Rec quantity can not be greter than actual quantity.');
            return;
        }



        let obj = {};
        obj.id = $('#id').val();
        obj.SO_ID = $('#poidhidden').val();//soidhidden
        obj.Customer = $('#vendor').val();
        obj.orderDeadLine = $('#orderdeadline').val();
        obj.company = $('#company').val();
        obj.RecieptDate = $('#receiptdate').val();
        obj.currenty = $('#currency').val();
        obj.DeliverTo = $('#deliverto').val();

        let data = {
            data: obj,
            product: SalesReceived.getAllProductsDetails()
        }


        ajaxHealper.ajaxProcessor('/SalesReccievd/Create', "json", "POST", JSON.stringify(data), true, (e) => {
            ;
            if (e.status != 2) {
                $('#status_').html('waiting for bill');
                fin_common.showToast(1, e.message);
                //window.location.href = fin_common.sitrurl + "/Reccievd/Index";
                $('#SalesReceivedid_').html("REC_" + e.data1)
                let p = SalesReceived.getAllProductsDetails();
                let sutotalarray = SalesReceived.getAllProductsDetails().map(e => (e.subtotal));

                let array = sutotalarray

                let sum = array.reduce((a, b) => { return parseInt(a) + parseInt(b) });

                $('#sumtotal').html('<strong>Sum Total : </strong>' + sum);
                debugger;
                $.each(p, (i, e) => {

                    let product = SalesReceived.products.data1.find(x => { return x.pid == e.product }).P_name;
                    let tax = '';
                    if (e.taxes != undefined && e.taxes != null) {
                        tax = e.taxes.split(',').map(e => (SalesReceived.tax.data1.filter(x => { return x.id == e })[0].TaxName)).join();
                    }

                    //<td>${e.varient}</td >
                    let tr = `<tr>
                                <td>${product}</td>
                                
                                <td>${e.qty}</td>
                                <td>${e.REC_qty}</td>
                                <td>${e.unitprice}</td>
                                <td>${tax}</td>
                                <td>${e.subtotal}</td>
                                </tr>`;
                    $('#producttablebody_bill').append(tr);

                })

                $('#bill').show();
            }
            else {
                fin_common.showToast(2, e.message);
            }

        });

    },
    getAllProductsDetails: function () {

        let data = [];

        $('#producttablebody tr').each((i, e) => {
            ;
            let guid = $(e).attr('bankGuid');
            let product = $(e).find('td[product] .product').val();
            let varient = $(e).find('td[varient] .varient').val();
            let qty = $(e).find('td[qty] .qty').val();
            let recqty = $(e).find('td[RECqty] .RECqty').val();
            let unitprice = $(e).find('td[unitprice] .unitprice').val();
            let taxes = $(e).find('td[taxes] .tax').val();
            let subtotal = $(e).find('td[subtotal] .subtotal').val();

            let obj = {};
            obj.id = $('#id').val();
            obj.product = product;
            //obj.varient = varient.join(',');
            obj.qty = qty;
            obj.REC_qty = recqty;
            obj.unitprice = unitprice;
            obj.taxes = taxes.join(',');
            obj.subtotal = subtotal;
            data.push(obj);

        })
        return data;
    },
    getAllProductsDetailsValidation: function () {

        let isvalid = true;

        $('#producttablebody tr').each((i, e) => {
            ;

            let recqty = $(e).find('td[RECqty] .RECqty')

            if (recqty.val() == undefined || recqty.val() == null || recqty.val().length == 0) {
                $(recqty).addClass('inputborder')
                isvalid = false;
            } else {
                $(recqty).removeClass('inputborder')
            }

        })
        return isvalid;
    },
    checkNegative: function () {

        let isvalid = true;

        $('#producttablebody tr').each((i, e) => {
            ;

            let recqty = $(e).find('td[RECqty] .RECqty')

            if (parseInt(recqty.val()) < 0) {
                isvalid = false;
                $(recqty).addClass('inputborder')
            }
            else {
                $(recqty).removeClass('inputborder')
            }

        })
        return isvalid;
    },
    checkGreater: function () {

        let isvalid = true;

        $('#producttablebody tr').each((i, e) => {
            ;

            let recqty = $(e).find('td[RECqty] .RECqty')
            let qty = $(e).find('td[qty] .qty')

            if (parseInt(recqty.val()) > parseInt(qty.val())) {
                isvalid = false;
                $(recqty).addClass('inputborder')
            }
            else {
                $(recqty).removeClass('inputborder')
            }

        })
        return isvalid;
    },
    getByid: function (id) {

        let url = "/SalesOrder/getbyid/" + id;
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (data) => {
            ;

            if (data.status == 1) {


                //'2023-04-07'


                //$('#id').val(data.data1.so.id);
                $('#vendor').val(data.data1.so.Customer).prop("disabled", true);;
                $('#orderdeadline').val(fin_common.convertDataToDatePicker(data.data1.so.orderDeadLine)).prop("disabled", true);;
                $('#company').val(data.data1.so.company).prop("disabled", true);;
                $('#receiptdate').val(fin_common.convertDataToDatePicker(data.data1.so.RecieptDate)).prop("disabled", true);;

                $('#deliverto').val(data.data1.so.DeliverTo).prop("disabled", true);;
                $('#status_').html(data.data1.so.Status).prop("disabled", true);
                $('#SalesReceivedid_').html(data.data1.so.SalesReceived_id).prop("disabled", true);;

                if (data.data1.so.Status == 'close') {
                    $('#save, #bill').remove();
                }

                if (data.data1.so.Status == "Nothing to bill") {

                    $('#conformorder').hide()
                    $('#SalesReceivedorder').show()

                } else {
                    $('#conformorder').show()
                    $('#SalesReceivedorder').hide()
                }


                $.each(data.data1.soProducts, (i, e) => {
                    ;
                    $('#addproduct').trigger('click');
                    let lastTR = $('#productTable tr').last();

                    $(lastTR).find('td[product] .product').val(e.product).trigger('change').prop("disabled", true);
                    $(lastTR).find('td[varient] .varient').val(e.varient.split(',')).prop("disabled", true);
                    $(lastTR).find('td[qty] .qty').val(e.qty).prop("disabled", true);
                    $(lastTR).find('td[unitprice] .unitprice').val(e.unitprice).prop("disabled", true);;
                    $(lastTR).find('td[taxes] .tax').val(e.taxes.split(',')).prop("disabled", true);;
                    $(lastTR).find('td[subtotal] .subtotal').val(e.subtotal).prop("disabled", true);;

                })


                fin_common.showToast(1, "successfully.");
            }

        });

    },
    getByidonedit: function (id) {

        let url = "/SalesReccievd/getbyid/" + id;
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (data) => {
            ;

            if (data.status == 1) {


                //'2023-04-07'


                //$('#id').val(data.data1.rfq.id);
                $('#vendor').val(data.data1.rfq.customer).prop("disabled", true);;
                $('#orderdeadline').val(fin_common.convertDataToDatePicker(data.data1.rfq.orderDeadLine)).prop("disabled", true);;
                $('#company').val(data.data1.rfq.company).prop("disabled", true);;
                $('#receiptdate').val(fin_common.convertDataToDatePicker(data.data1.rfq.RecieptDate)).prop("disabled", true);;

                $('#deliverto').val(data.data1.rfq.DeliverTo).prop("disabled", true);;
                $('#status_').html(data.data1.rfq.Status).prop("disabled", true);;
                $('#SalesReceivedid_').html(data.data1.rfq.REC_id).prop("disabled", true);;

                if (data.data1.rfq.Status == 'close') {
                    $('#save, #bill').remove();
                }

                //if (data.data1.rfq.Status == "waiting for bill") { $('#bill').show();}


                if (data.data1.rfq.Status == "Nothing to bill") {

                    $('#conformorder').hide()
                    $('#SalesReceivedorder').show()

                } else {
                    $('#conformorder').show()
                    $('#SalesReceivedorder').hide()
                }


                $.each(data.data1.rfqProducts, (i, e) => {
                    ;
                    $('#addproduct').trigger('click');
                    let lastTR = $('#productTable tr').last();

                    $(lastTR).find('td[product] .product').val(e.product).trigger('change').prop("disabled", true);
                    $(lastTR).find('td[varient] .varient').val(e.varient.split(',')).prop("disabled", true);
                    $(lastTR).find('td[qty] .qty').val(e.qty).prop("disabled", true);
                    $(lastTR).find('td[unitprice] .unitprice').val(e.unitprice).prop("disabled", true);;
                    $(lastTR).find('td[taxes] .tax').val(e.taxes.split(',')).prop("disabled", true);;
                    $(lastTR).find('td[subtotal] .subtotal').val(e.subtotal).prop("disabled", true);;
                    $(lastTR).find('td[recqty] .RECqty').val(e.REC_qty).prop("disabled", true);
                })
                $('.qty').trigger('keyup')

                fin_common.showToast(1, "successfully.");
            }

        });

    },
    delete: function (id) {

        ;
        ajaxHealper.ajaxProcessor('/SalesOrder/delete', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            ;

            fin_common.showToast(1, e.message);
            SalesReceived.loadGrid();


        });

    },
    paybill: function () {


        let paymethod = $("input[name='paymethod']:checked").val();
        let SalesReceivedid = $('#SalesReceivedid_').text();

        if (paymethod == null || paymethod == undefined) {
            fin_common.showToast(2, 'Please select Cash or Bank.');
            return;
        }

        let sutotalarray = SalesReceived.getAllProductsDetails().map(e => (e.subtotal));
        let array = sutotalarray;
        let sum = array.reduce((a, b) => { return parseInt(a) + parseInt(b) });

        let obj = { SALES_rec: SalesReceivedid, payMethod: paymethod, totalAmount: sum }
        ;
        ajaxHealper.ajaxProcessor('/SalesReccievd/paybill', "json", "POST", JSON.stringify({ data: obj }), true, (e) => {
            ;
            fin_common.showToast(1, e.message);
            window.location.href = fin_common.sitrurl + "/SalesReccievd/Index";
        });

    },
    orderConform: function (id) {

        ;
        ajaxHealper.ajaxProcessor('/SalesOrder/ConformOrder', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            ;

            fin_common.showToast(1, e.message);
            $('#status_').html('Nothing to bill')


            $('#conformorder').hide();
            $('#SalesReceivedorder').show();

            //SalesReceived.loadGrid();


        });

    },
    calculate: function (tis) {

        ;
        let qty = $(tis).closest('tr').find('td[qty] .qty').val();
        let RECqty = $(tis).closest('tr').find('td[RECqty] .RECqty').val();
        let unitprice = $(tis).closest('tr').find('td[unitprice] .unitprice').val();
        let tax = $(tis).closest('tr').find('td[taxes] .tax').val();

        if (parseInt(RECqty) > parseInt(qty)) {
            fin_common.showToast(2, 'Sale quentity can not be greater than Actual quantity.');
            return;
        }


        let sumtotal = parseFloat(RECqty) * parseFloat(unitprice);

        if (tax != null && tax != undefined && tax.length > 0) {
            let tx = tax;
            let salesprice = sumtotal;
            let total = [];
            $.each(tx, (i, e) => {
                ;
                let tax_ = SalesReceived.tax.data1.filter(o => o.id == e)[0];

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

        $('#overallsum').html("SumTotal: " + SalesReceived.overAllSum())

    },
    overAllSum: function () {

        var ov = SalesReceived.getAllProductsDetails().map(x => (x.subtotal));
        return ov.reduce((curr, next) => parseInt(curr) + parseInt(next));
    }




}