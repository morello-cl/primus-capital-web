function urlSp13resTable(rut, date_ini, date_end) {
	let url = '/wallet-staft/api/sp_13_res/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ws_op2', 'ws_opt_per', -1)}`;

	return url;
}
function urlSp13detTable(rut, date_ini, date_end) {
	let url = '/wallet-staft/api/sp_13_det/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ws_op2', 'ws_opt_per', -1)}`;

	return url;
}
function urlSp13docTable(rut, contrato, date_ini, date_end) {
	let url = '/wallet-staft/api/sp_13_doc/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(contrato) {
		url = `${url}&contrato=${contrato}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ws_op2', 'ws_opt_per', -1)}`;

	return url;
}

(function($) {
	"use strict";

	__exportOptionsTable.worksheetName = 'Cartera Vigente';

    const date_end = moment().startOf("day");

    const date_ini = moment().add(-6, 'M');
     
    $("#ws_date_ini").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		useCurrent: false,
		date: date_ini
    });
    
	$("#ws_date_end").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		useCurrent: false,
		date: date_end,
		minDate: date_ini,
		maxDate: date_end
	});

	$('#btn_ws_date_ini').click(function(e){
		$('#ws_date_ini').data("DateTimePicker").toggle();
	});

	$('#btn_ws_date_end').click(function(e){
		$('#ws_date_end').data("DateTimePicker").toggle();
	});
	
	$("#ws_date_ini").on("dp.change", function(e) {
		console.log('ini.e.date', e.date);
		$("#ws_date_end").data("DateTimePicker").minDate(e.date);
    });
    $("#ws_date_end").on("dp.change", function(e) {
		console.log('end.e.date', e.date);
		$("#ws_date_ini").data("DateTimePicker").maxDate(e.date);
	});


    $('input:radio[name=ws_op2]').click(function(e){
        if($('input:radio[name=ws_op2]:checked').val() === 'ws_opt_per') {
			$('#ws_date_ini_txt').prop('readonly', false);
			$('#ws_date_end_txt').prop('readonly', false);
        } else {
			$('#ws_date_ini_txt').prop('readonly', true);
			$('#ws_date_end_txt').prop('readonly', true);
        }
    });
    

    $("#tbl_ws_res").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				searchable: true,
				sortable: true,
				class: 'text-nowrap',
				formatter: __rutClientFormatTable,
			},
			{
				field: "nomcliente",
				title: "Nombre Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "contratos",
				title: "Contratos",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: __linkTable
			},
			{
				field: "mondoc",
				title: "Mon Doc",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "monant",
				title: "Mon Ant",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "monrec",
				title: "Mon Rec",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "capamort",
				title: "Capa Mort",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "saldo",
				title: "Saldo",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "docvig",
				title: "Doc Vig",
				align: 'right',
                sortable: true,
				searchable: false,
				formatter: __amountFormatTable,
            }
		],
		url: [],
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: true,
		showColumns: true,
		exportDataType: "all",
		exportTypes: __exportTypesTable,
		exportOptions: __exportOptionsTable,
		search: true,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
		theadClasses: 'thead-light'
	});

	$("#tbl_ws_det").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __rutClientFormatTable,
			},
			{
				field: "nomcliente",
				title: "Nombre Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "contrato",
				title: "Contrato",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: __linkTable
			},
			{
				field: "fchot",
				title: "Fecha",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
            },
			{
				field: "tipo",
				title: "Tipo",
				class: 'text-nowrap',
				align: 'center',
				sortable: true,
				searchable: true,
			},
			{
				field: "mondoc",
				title: "Mon Doc.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "monant",
				title: "Mon Ant.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "monrec",
				title: "Mon Rec.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "capamort",
				title: "Capa Mort",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "saldo",
				title: "Saldo",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
            {
				field: "docvig",
				title: "Doc Vig",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            }
		],
		url: [],
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: true,
		showColumns: true,
		exportDataType: "all",
		exportTypes: __exportTypesTable,
		exportOptions: __exportOptionsTable,
		search: true,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
		theadClasses: 'thead-light'
	});

	$("#tbl_ws_doc").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				searchable: true,
				class: 'text-nowrap',
				sortable: true,
				formatter: __rutClientFormatTable,
			},
			{
				field: "nomcliente",
				title: "Nombre Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "iddeudor",
				title: "R.U.T. Deudor",
				searchable: true,
				sortable: true,
				class: 'text-nowrap',
				formatter: __rutDeudorFormatTable,
			},
			{
				field: "nomcliente",
				title: "Nombre Deudor",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "contrato",
				title: "Contrato",
				searchable: true,
				sortable: true,
			},
			{
				field: "fchot",
				title: "Fecha Ot.",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
			},
			{
				field: "tipo",
				title: "Tipo",
				class: 'text-nowrap',
				align: 'center',
				sortable: true,
				searchable: true,
			},
			{
				field: "docto",
				title: "Docto",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
            },
			{
				field: "fchvcto",
				title: "Fecha Vcto.",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
            },
			{
				field: "mora",
				title: "Mora",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable
			},
			{
				field: "mondoc",
				title: "Mon Doc.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "monant",
				title: "Mon Ant.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "monrec",
				title: "Mon Rec.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "capamort",
				title: "Capa Mort",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "saldo",
				title: "Saldo",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
            {
				field: "operacion",
				title: "Operacion",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            }
		],
		url: [],
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: true,
		showColumns: true,
		exportDataType: "all",
		exportTypes: __exportTypesTable,
		exportOptions: __exportOptionsTable,
		search: true,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
		theadClasses: 'thead-light'
	});

    $("#btn-ws-search").click(function(e) {
		e.preventDefault();
		
		if($('input:radio[name=ws_op1]:checked').val() === 'ws_opt_res') {
			$('#tblWsRes').show('slow');
			$('#tblWsDet').hide('slow');
			$('#tblWsDoc').hide('slow');

			const dt_ini = $("#ws_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ws_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
	
			$("#tbl_ws_res").bootstrapTable("refresh", {
				url: urlSp13resTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ws_op1]:checked').val() === 'ws_opt_det') {
			const dt_ini = $("#ws_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ws_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_ws_det").bootstrapTable("refresh", {
				url: urlSp13detTable(0, dt_ini, dt_end),
			});

			$('#tblWsRes').hide('slow');
			$('#tblWsDet').show('slow');
			$('#tblWsDoc').hide('slow');
		} else if($('input:radio[name=ws_op1]:checked').val() === 'ws_opt_doc') {
			const dt_ini = $("#ws_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ws_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_ws_doc").bootstrapTable("refresh", {
				url: urlSp13docTable(0, dt_ini, dt_end),
			});

			$('#tblWsRes').hide('slow');
			$('#tblWsDet').hide('slow');
			$('#tblWsDoc').show('slow');
		}
	});

	$('#btn-ws-clear').click(function(e){
		e.preventDefault();

		// opciones activas por defecto
		$('input:radio[name=ws_op1]').filter('[value=ws_opt_res]').prop('checked', true);
		$('input:radio[name=ws_op2]').filter('[value=ws_opt_hoy]').prop('checked', true);
		$('#ws_date_ini_txt').prop('readonly', true);
		$('#ws_date_end_txt').prop('readonly', true);

		// buscador queda modo default
		$("#ws_date_ini").datetimepicker({
			defaultDate: date_ini
		});
		$("#ws_date_end").datetimepicker({
			defaultDate: date_end
		});

		// limpiar tablas
		$('#tblWsRes').hide('slow');
		$("#tbl_ws_res").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblWsDet').hide('slow');
		$("#tbl_ws_det").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblWsDoc').hide('slow');
		$("#tbl_ws_doc").bootstrapTable("refresh", {
            url: [],
        });
	});

	$("#tbl_ws_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {			
			const dt_ini = $("#ws_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ws_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_ws_det").bootstrapTable("refresh", {
				url: urlSp13detTable(nro_client, dt_ini, dt_end),
			});

			$('#tblWsRes').hide('slow');
			$('#tblWsDet').show('slow');
			$('#tblWsDoc').hide('slow');
		}
	});

	$("#tbl_ws_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {

			const dt_ini = $("#ws_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ws_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_ws_doc").bootstrapTable("refresh", {
				url: urlSp13docTable(row.idcliente, row.contrato, dt_ini, dt_end),
			});

			$('#tblWsRes').hide('slow');
			$('#tblWsDet').hide('slow');
			$('#tblWsDoc').show('slow');
		}
	});

	$("#btn_ws_bk_res").click(function(e){
		e.preventDefault();

		$("#tbl_ws_res").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblWsRes').hide('slow');
	});

	$("#btn_ws_bk_det").click(function(e){
		e.preventDefault();

		$("#tbl_ws_det").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblWsDet').hide('slow');
		$('#tblWsRes').show('slow');
	});

	$("#btn_ws_bk_doc").click(function(e){
		e.preventDefault();

		$("#tbl_ws_doc").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblWsDoc').hide('slow');
		$('#tblWsDet').show('slow');
	});
})(jQuery);