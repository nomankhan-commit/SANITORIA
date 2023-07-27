

let Products = {
    variants: null,
    categories: null,
    allProducts: null,
    tax: null,
    id: 0,
    loadGrid: function () {

        let url = "/Products/getAllProducts";
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (e) => {
            debugger;

            if (e.status == 1) {
                fin_common.showToast(1, "loades successfully.");
                $.each(e.data1, (i, e) => {

                let div = `<div class="col-md-3">
                <div class="card">
                <h5 class="card-header">${e.P_name}</h5>
                <div class="card-body">
                <div><img src="/Content/ProductImages/${e.image}" /></div>
                <h5 class="card-title">Sales Price: ${e.salesPrice}</h5>
                <h5 class="card-title">Cost : ${e.cost}</h5>
                </div>
                <div class="img-links">
                <a href="${fin_common.sitrurl + "/Products/Edit/" + e.pid}" class=""><i class="fas fa-edit"></i></a>
              
                
                </div>
                </div>
                </div>`;

                    //<a href="#" class=""><i class="far fa-trash-alt"></i></a>
                    //  <a href="#" class=""><i class="fa fa-eye" aria-hidden="true"></i></a>
              $('#mainDiv').append(div);


                })
            }

        });

    },
    saveProduct: function (url) {
        debugger;
        let obj = {};
        obj.pid = $('#id').val();
        obj.P_name = $('#productname').val();
        obj.image = $('#hiddenImage').val();
        obj.p_type = $('#productType').val();
        obj.p_tax = $('#hiddentax').val();
        obj.invoicingPolicy = $('#invoicePolicy').val();
        obj.salesPrice = $('#salesprice').val();
        obj.total = $('#salepricewithTax').val();
        obj.cost = $('#cost').val();
        obj.category = $('#category').val();
        obj.brand = $('#brand').val();
        obj.company = "";//$('#company').val();

        obj.subCategory = $('#subCategory').val()
        obj.unit =  $('#unit').val();


        if (Products.getAllVariants().length <= 0) {
            fin_common.showToast(2, "Please add atleast one varient.");
            return;
        }

        if (fin_common.hasDuplicateinJson(Products.getAllVariants(), 'variantID')) {
            fin_common.showToast(2, "Varient can not be duplicate.");
            return;
        }


        let data = {
            product: obj,
            productsVariant_s: Products.getAllVariants()
        }

        ajaxHealper.ajaxProcessor('/Products/createProduct', "json", "POST", JSON.stringify(data), true, (e) => {
            debugger;
            if (e.status != 2) {
                fin_common.showToast(1, e.message);
                window.location.href = fin_common.sitrurl + "Products/Index";
            }
            else {
                fin_common.showToast(2, e.message);
            }

        });

    },
    getAllVariants: function () {

        let variants = [];

        $('#variantTableBody tr').each((i, e) => {

            try {
                debugger;
                let guid = $(e).attr('variantguid');
                let variatnID = $(e).find('td[variantname] select').val();
                let id = $(e).find('td[variantvalue] div').attr('id');
                let value = bem_htmlHelper.getTagboxValues(id, []).join(',');

                let obj = {};
                obj.p_id = $('#id').val();
                obj.variantID = variatnID;
                obj.variantValues = value;
                obj.variantGuid = guid;
                variants.push(obj);
            } catch (e) {
                fin_common.showToast(2, e);
            }

         

        })
        return variants;


    },
    delete: function (id) {

        debugger;
        ajaxHealper.ajaxProcessor('/Products/deleteProductProducts', "json", "POST", JSON.stringify({ id: id }), true, (e) => {
            debugger;

            fin_common.showToast(1, e.message);
            Products.loadGrid();


        });

    },
    getProductsByid: function (id) {

        let url = "/Products/productsByid/"+id;
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (e) => {
            debugger;
            console.log(e)
            if (e.status == 1) {

                //p_tax
                $('#id').val(e.data1.product.pid);
                $('#productname').val(e.data1.product.P_name);
                $('#hiddenImage').val(e.data1.product.image);
                $('#productType').val(e.data1.product.p_type);
                $('#hiddentax').val(e.data1.product.p_tax);
                $('#invoicePolicy').val(e.data1.product.invoicingPolicy);
                $('#salesprice').val(e.data1.product.salesPrice);
                $('#salepricewithTax').val(e.data1.product.total);
                $('#cost').val(e.data1.product.cost);
                $('#category').val(e.data1.product.category);
                $('#brand').val(e.data1.product.brand);
                $('#company').val(e.data1.product.company);

               

                $('#subCategory').val(e.data1.product.subCategory);
                $('#unit').val(e.data1.product.unit);

                let selectedTax = [];
                let st = $('#hiddentax').val().split(',');
                for (let i = 0; i < st.length; i++)
                {
                    selectedTax.push(Products.tax.data1.filter(r => r.TaxName==st[i]));
                }

                bem_htmlHelper.multiSelectDropdown("customertaxes", "customertaxes", Products.tax.data1, selectedTax , "id", "TaxName", '');
                Products.applyTaxDLLchange();
                $('#customertaxesCmb').dxDropDownBox('instance')._input().val( $('#hiddentax').val() );

                

                $("#imagebox").html('<img src=/Content/ProductImages/' + e.data1.product.image + '>');

                $.each(e.data1.variants, (i, e) => {
                    debugger;
                    $('#addVariant').trigger('click');
                    let lastTR = $('#variantTableBody tr').last();
                    $(lastTR).find('td[variantname] select').val(e.variantID);
                    $(lastTR).find('td[variantvalue]').empty();
                    $(lastTR).attr('variantguid', e.variantGuid);
                    bem_htmlHelper.inputTextListWithTags(bem_common.getGuid(), 'variantValue', $(lastTR).find('td[variantvalue]'), null, e.variantValues.split(','));
                })


                fin_common.showToast(1, "successfully.");
            }

        });

    },
    applyTaxDLLchange: function () {

        $('#customertaxesCmb').dxDropDownBox('instance').option("onValueChanged", function (args) {
            debugger;


            if (args.value == null) {

            }
            else {

                $('#hiddentax').val(args.value);
            }

        })

    },
    callApi: function () {

        let url = "https://localhost:7151/api/Books";

        let d = {
            "email": "user@example.com",
            "password": "string"
        };

        let token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWtyYW1AZ21haWwuY29tIiwianRpIjoiZjQ3NWEyYTYtOGU3NC00OWFkLTlhY2YtOTY4MzQ3YzA3NDlmIiwiZXhwIjoxNjgyNTIxMzAzLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDMwOSIsImF1ZCI6IlVzZXIifQ.NZ4jxC8dsp34e3wOwJ3ptwZvZ1Ocr5_dOMLLE1tTqEg";


        var xhr = $.ajax({
            type: 'Get',
            url: url,
            datatype: 'json',
            contentType: 'application/json; charset=utf-8',
            data: null,
            async: true,
            headers: { "Authorization": 'Bearer ' + token },
            success: function (success) {
                debugger;
                console.log(success);
            },
            error: function (error) {
                debugger;
                //fin_common.showPanel().hide();
                fin_common.showToast(2, "some thing went wrog.")
                //errorFunction(error)
                //showToast(error.status, error.msg)

            }
        });


    },
}