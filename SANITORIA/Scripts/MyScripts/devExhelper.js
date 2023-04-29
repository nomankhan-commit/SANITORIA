var devExHelper = {

    bindGrid: function (divid, jsonData, columns, drillFunction, extraparam, smmarayArray, showloader) {


        $(divid).dxDataGrid({

            dataSource: jsonData,
            columns: columns,
            showColumnLines: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            showBorders: true,
            sorting: {
                mode: 'multiple',
            },
            columnAutoWidth: true,
            //scrolling: { mode: 'virtual' },
            //columnResizingMode: "widget",
            searchPanel: {
                visible: true,
                width: 240,
                placeholder: 'Search...',
            },
            summary: {
                totalItems: smmarayArray,
            },
            loadPanel: {
                enabled: showloader
            },
            //filterRow: {
            //    visible: true
            //},
            headerFilter: {
                visible: true,
            },
            columnChooser: {
                enabled: true,
                //mode: "dragAndDrop" // or "select"
                mode: "select"
            },
            export: {
                enabled: true,
            },
            paging: {
                pageSize: 25,
            },
            pager: {
                visible: true,
                allowedPageSizes: [10, 25, 50],
                showPageSizeSelector: true,
                showInfo: true,
                showNavigationButtons: true,
            },
            onCellClick: function (e) {
                debugger;
                if (e.rowType == 'data') {
                    if (Object.keys(e).indexOf('summaryTexts') == -1) {
                        if ($(e.cellElement).hasClass('linkColumns')) {
                            return;
                        }
                        if (drillFunction != null) {

                            drillFunction(e, extraparam)

                        }

                    }
                }

            }

        });


    }

}