﻿let Bills = {

    loadGrid: function () {

        let columns = [
            { dataField: 'bill_id', caption: "Bill Id" },
            { dataField: 'payMethod', caption: "Pay Method" },
            { dataField: 'rec', caption: "Recv Id" },
            { dataField: 'totalAmount', caption: "Total Amount" },
            { dataField: 'ParentBill', caption: "Parent Bill" },
            { dataField: 'Rec_Prod_ID', caption: "Product ID" },
            {
                dataField: 'createat', caption: "Create date",
                customizeText: function (cellInfo) {
                    debugger;
                    return fin_common.convertDataToDatePicker(cellInfo.value);

                }
            },
            {
                dataField: "Action", cellTemplate: function (container, options) {
                    debugger
                    if (options.data.ParentBill == null) {

                        var data = JSON.stringify(options.data);
                        var data_ = encodeURI(data);
                        $(`<div class="btn-group btn-group-sm">
              <button type="button" id="${options.data.ID}" class="btn elm_edit" data="${data_}" title="Edit"><i class="fas fa-edit"></i></button>
              </div>`).appendTo(container);

                    }
                }
            }];
        let url = "/Bills/GetAll";
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (e) => {
            debugger;

                fin_common.showToast(1, "loades successfully.");
                devExHelper.bindGrid("#grid", e, columns, null, null, null, true);
            

        });

    },
    getByid: function (id) {

        let url = "/Bills/getbyid/" + id;
        ajaxHealper.ajaxProcessor(url, "json", "POST", null, true, (data) => {
            debugger;

            

                //
                //data.bill
                //['id', 'Recid', 'po_id', 'product', 'varientID', 'varient', 'qty', 'REC_qty', 'unitprice', 'taxes', 'subtotal']
                // ['ID', 'bill_id', 'rfq', 'po', 'rec', 'payMethod', 'totalAmount', 'createat', 'updateat', 'createby', 'updatedBy']

            $('#billid').html(data.bill.bill_id)
                let columns = [
                    //{ dataField: 'id', caption: "Bill Id" },
                    {
                        dataField: 'Recid', caption: "Receive ID", cellTemplate: function (container, options) {
                            debugger

                            $(`<span"> REC_${options.data.Recid}</span>`).appendTo(container);
                        }
                    },
                    {
                        dataField: 'po_id', caption: "PO ID", cellTemplate: function (container, options) {
                            debugger

                            $(`<span"> PO_${options.data.po_id}</span>`).appendTo(container);
                        }
                    },
                    { dataField: 'product', caption: "Product" },
                    //{ dataField: 'varientID', caption: "Varients" },
                    { dataField: 'varient', caption: "Varients" },
                    { dataField: 'qty', caption: "Quantity" },
                    { dataField: 'REC_qty', caption: "Rec Qty" },
                    { dataField: 'unitprice', caption: "Unit Price" },
                    { dataField: 'taxes', caption: "Taxes" },
                    { dataField: 'subtotal', caption: "Total" },
                   ];


            var SUM = summary = [
                
                {
                    column: 'subtotal',
                    summaryType: 'sum',
                    //valueFormat: ",##0.###"
                }
               

            ]

            devExHelper.bindGrid("#grid", data.details, columns, null, null, SUM, true);

                fin_common.showToast(1, "successfully.");
            

        });

    },
  

}