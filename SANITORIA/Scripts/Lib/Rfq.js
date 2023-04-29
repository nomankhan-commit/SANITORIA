let rfq = {
    company:null,
    tax:null,
    varient:null,
    products:null,
    productsVarient:null,
    loadGrid: function () {

        let columns = [
            { dataField: 'rfqName', caption: "rfq" },
            { dataField: 'email', caption: "Email" },
            { dataField: 'phone', caption: "Phone" },
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
        let url = "/rfq/getAll";
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
            product: rfq.getAllProductsDetails()
        }


        ajaxHealper.ajaxProcessor('/Rfq/Create', "json", "POST", JSON.stringify(data), true, (e) => {
            debugger;
            if (e.status != 2) {
                fin_common.showToast(1, e.message);
                window.location.href = fin_common.sitrurl + "rfq/Index";
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

        let url = "/rfq/getbyid/" + id;
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (data) => {
            debugger;

            if (data.status == 1) {


                //'2023-04-07'


                $('#id').val(data.data1.rfq.id);
                $('#vendor').val(data.data1.rfq.vendor);
                $('#orderdeadline').val(fin_common.convertDataToDatePicker(data.data1.rfq.orderDeadLine));
                $('#company').val(data.data1.rfq.company);
                $('#receiptdate').val(fin_common.convertDataToDatePicker(data.data1.rfq.RecieptDate));
              
                $('#deliverto').val(fin_common.convertDataToDatePicker(data.data1.rfq.DeliverTo));

                $.each(data.data1.rfqProducts, (i, e) => {
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


                fin_common.showToast(1, "successfully.");
            }

        });

    },
    delete: function (id) {

        debugger;
        ajaxHealper.ajaxProcessor('/rfq/delete', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;

            fin_common.showToast(1, e.message);
            rfq.loadGrid();


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
                let tax_ = rfq.tax.data1.filter(o => o.id == e)[0];

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
        else
        {
            $(tis).closest('tr').find('td[subtotal] .subtotal').val(sumtotal);
        }
        
       

    }



}