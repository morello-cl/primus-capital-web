(function($) {
    "use strict";

    const date_now = moment().startOf("day");

    const date_end = moment().startOf("day");

    const date_ini = moment().add(-6, 'M');

    console.log('date_ini', date_ini.format('DD-MM-YYYY'));
    
    
    $("#ot_date_ini").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_ini
    });
    
	$("#ot_date_end").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_end,
		minDate: date_ini,
        maxDate: date_end
    });
    
    $("#ot_date_ini").datetimepicker().on("dp.change", function(e) {
		$("#ot_date_end").datetimepicker({
			minDate: $("#ot_date_ini").data("DateTimePicker").date()
        });
    });
    $("#ot_date_end").datetimepicker().on("dp.change", function(e) {
		$("#ot_date_ini").datetimepicker({
			maxDate: $("#ot_date_end").data("DateTimePicker").date()
        });
    });

    console.log('ot_op2', $('input:radio[name=ot_op2]:checked').val());
    $('#ot_opt_op2').hide();

    $('input:radio[name=ot_op2]').click(function(e){
        if($('input:radio[name=ot_op2]:checked').val() === 'ot_opt_per') {
            $('#ot_opt_op2').show();
        } else {
            $('#ot_opt_op2').hide();
        }
    });
    

    $("#tbl_award").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T.",
				searchable: true,
			},
			{
				field: "nomcliente",
				title: "Nombre",
				searchable: true,
			},
			{
				field: "contratos",
				title: "Contratos",
				searchable: true,
			},
			{
				field: "tasa_min",
				title: "Tasa Min.",
				searchable: true,
            },
            {
				field: "tasa_max",
				title: "Tasa Max",
				sortable: true,
				searchable: true,
			},
			{
				field: "mon_doc",
				title: "Mon Doc",
				sortable: true,
				searchable: true,
			},
			{
				field: "mont_ant",
				title: "Mon Ant",
				sortable: true,
				searchable: true,
			},
			{
				field: "dif_precio",
				title: "Dif Precio",
				//formatter: function(value, row, index) {
                //    return numeral(value).format("$ 0");
                //},
                sortable: true,
                searchable: true,
            },
            {
				field: "comision",
				title: "Comision",
				//formatter: function(value, row, index) {
                //    return numeral(value).format("$ 0");
                //},
                sortable: true,
                searchable: true,
            },
            {
				field: "iva",
				title: "IVA",
				//formatter: function(value, row, index) {
                //    return numeral(value).format("$ 0");
                //},
                sortable: true,
                searchable: true,
            },
            {
				field: "gastos",
				title: "Gastos",
				//formatter: function(value, row, index) {
                //    return numeral(value).format("$ 0");
                //},
                sortable: true,
                searchable: true,
            },
            {
				field: "impto",
				title: "Impto",
				//formatter: function(value, row, index) {
                //    return numeral(value).format("$ 0");
                //},
                sortable: true,
                searchable: true,
            },
            {
				field: "mon_oper",
				title: "Mon Oper",
				//formatter: function(value, row, index) {
                //    return numeral(value).format("$ 0");
                //},
                sortable: true,
                searchable: true,
            },
            {
				field: "apl",
				title: "Aplic",
				//formatter: function(value, row, index) {
                //    return numeral(value).format("$ 0");
                //},
                sortable: true,
                searchable: true,
            },
            {
				field: "agirar",
				title: "A Giro",
				//formatter: function(value, row, index) {
                //    return numeral(value).format("$ 0");
                //},
                sortable: true,
                searchable: true,
			}
		],
		url: `/award/api/sp_11_res/${'1900-01-01'}/${date_now.format('YYYY-MM-DD')}`,
		locale: "es-SP",
		sortName: "data.fecha",
		sortOrder: "desc",
		clickToSelect: false,
		showRefresh: true,
		showExport: true,
		//exportDataType: "all",
		//exportTypes: ["json", "xml", "csv", "txt", "sql", "excel"],
		//exportOptions: exportOptionsBoostrapTable,
		search: true,
		searchAlign: "right",
		striped: true,
		//sidePagination: "server",
		pagination: true,
		pageNumber: 1,
		pageSize: 25,
		pageList: [25, 50, 75],
	});

    $("#btn-ot-search").click(function(e) {
        e.preventDefault();

        console.log('#btn-ot-search', $('#reservation').val());

        const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
        const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
        const __url = `/award/api/sp_11_res/${dt_ini}/${dt_end}`;

        $("#tbl_award").bootstrapTable("refresh", {
            url: __url,
        });

        /*
        axios.get(`/award/api/sp_11_res/`, {
            dt_ini: '2019-04-01',
            dt_end: '2019-06-27'
        })
            .then(function(r){
                console.log(r.data);

                $("#tbl_award").bootstrapTable("refresh", {
                    data: r.data,
                });
            })
            .catch(function(err){
                console.log('err', err);
            });
            */
	});
})(jQuery);