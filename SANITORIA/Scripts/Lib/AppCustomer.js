let AppCustomer = {

    loadGrid: function () {

        let columns = [
            { dataField: 'username', caption: "Name" },
            { dataField: 'phone', caption: "Phone" },
            { dataField: 'email', caption: "Email" },
            //{ dataField: 'address', caption: "Address" },
            //{ dataField: 'zipcode', caption: "ZipCode" },
            //{ dataField: 'website', caption: "WebSite" }


        ];

        devExHelper.bindGrid("#grid", AppCustomer.data, columns, null, null, null, true);

      

    },
  

}