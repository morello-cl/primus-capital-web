function urlSp16resTable(rut, date_ini, date_end) {
	let url = '/extensions/api/sp_16_res/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ex_opt2', 'ex_opt2_otr', -1)}`;

	return url;
}
function urlSp16detTable(rut, date_ini, date_end) {
	let url = '/extensions/api/sp_16_det/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	
	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ex_opt2', 'ex_opt2_otr', -1)}`;

	return url;
}
function urlSp16docTable(rut, date_ini, date_end) {
	let url = '/extensions/api/sp_16_doc/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	
	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ex_opt2', 'ex_opt2_otr', -1)}`;

	return url;
}

(function($) {
	"use strict";

	__exportOptionsTable.worksheetName = 'Prorrogas';

    const date_now = moment().startOf("day");
     
    $("#ex_date").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		useCurrent: false,
		date: date_ini
    });

	$('#btn_ex_date').click(function(e){
		$('#ex_date').data("DateTimePicker").toggle();
	});

    $('input:radio[name=ex_opt2]').click(function(e){
        if($('input:radio[name=ex_opt2]:checked').val() === 'ex_opt2_otr') {
			$('#ex_date_txt').prop('readonly', false);
        } else {
			$('#ex_date_txt').prop('readonly', true);
        }
    });

    $('input:radio[name=ws_op1]').click(function(e){
        if($('input:radio[name=ws_op1]:checked').val() === 'ws_opt_ind') {
            $('#ws_nro').attr('disabled', false);
        } else {
            $('#ws_nro').attr('disabled', true);
        }
    });
    

    $("#tbl_ex_res").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				searchable: true,
				sortable: true,
				class: 'text-nowrap',
				formatter: __rutClientFormatTable,
				sorter: __sorterRutTable
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
				field: "candoc",
				title: "Candoc",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable
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
				field: "interes",
				title: "Interes",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "comision",
				title: "Comisión",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "iva",
				title: "IVA",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "total",
				title: "Total",
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
	});

	$("#tbl_ex_det").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				__rutClientFormatTable,
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
				field: "candoc",
				title: "Can Doc",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
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
				field: "interes",
				title: "Interes",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "comision",
				title: "Comisión",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "iva",
				title: "I.V.A.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "total",
				title: "Total",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
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
	});

	$("#tbl_ex_doc").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T.",
				searchable: true,
				sortable: true,
				class: 'text-nowrap',
				formatter: __rutClientFormatTable,
				sorter: __sorterRutTable
			},
			{
				field: "nomcliente",
				title: "Cliente",
				searchable: true,
			},
			{
				field: "iddeudor",
				title: "R.U.T. Deudor",
				searchable: true,
				class: 'text-nowrap',
				formatter: __rutDeudorFormatTable,
				sorter: __sorterRutTable
			},
			{
				field: "nomcliente",
				title: "Deudor",
				searchable: true,
				class: 'text-nowrap',
				sortable: true,
			},
			{
				field: "contrato",
				title: "Contrato",
				searchable: true,
				sortable: true,
				align: 'center',
			},
			{
				field: "numdoc",
				title: "Num Doc",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "dias",
				title: "Días",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
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
				field: "interes",
				title: "Interes",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "comision",
				title: "Comisión",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "iva",
				title: "I.V.A.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "total",
				title: "Total",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
			},
			{
				field: "fchpro",
				title: "Fch Pro",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable
			},
			{
				field: "fchvcto1",
				title: "Fch Vcto 1",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable
			},
			{
				field: "fchvcto2",
				title: "Fch Vcto 2",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable
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
	});

    $("#btn_ex_search").click(function(e) {
		e.preventDefault();

		const dt = $("#ex_date").data("DateTimePicker").date().format("YYYY-MM-DD");
		
		if($('input:radio[name=ex_opt1]:checked').val() === 'ex_opt1_all') {
			$('#tblExRes').show('slow');
			$('#tblExDet').hide('slow');
			$('#tblExDoc').hide('slow');
	
			$("#tbl_ex_res").bootstrapTable("refresh", {
				url: urlSp16resTable(0, dt, null),
			});
		} else if($('input:radio[name=ex_opt1]:checked').val() === 'ex_opt1_rut') {
			$("#tbl_ex_doc").bootstrapTable("refresh", {
				url: urlSp16docTable(0, dt, null),
			});

			$('#tblExRes').hide('slow');
			$('#tblExDet').hide('slow');
			$('#tblExDoc').show('slow');
		}
	});

	$('#btn_ex_clear').click(function(e){
		e.preventDefault();

		// opciones activas por defecto
		$('input:radio[name=ex_opt1]').filter('[value=ex_opt1_all]').prop('checked', true);
		$('input:radio[name=ex_opt2]').filter('[value=ex_opt2_hoy]').prop('checked', true);
		$('#ex_date').prop('readonly', true);

		// buscador queda modo default
		$("#ex_date").datetimepicker({
			defaultDate: date_now
		});

		// limpiar tablas
		$('#tblExRes').hide('slow');
		$("#tbl_ex_res").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblExDet').hide('slow');
		$("#tbl_ex_det").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblExDoc').hide('slow');
		$("#tbl_ex_doc").bootstrapTable("refresh", {
            url: [],
        });
	});

	$("#tbl_ex_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
		console.log('field', field);
		if(field === 'contrato') {			
			const dt = $("#ex_date").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_ex_det").bootstrapTable("refresh", {
				url: urlSp16detTable(nro_client, dt, null),
			});

			$('#tblExRes').hide('slow');
			$('#tblExDet').show('slow');
			$('#tblExDoc').hide('slow');
		}
	});

	$("#tbl_ex_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {

			const dt = $("#ex_date").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_ex_doc").bootstrapTable("refresh", {
				url: urlSp16docTable(nro_client, dt, null),
			});

			$('#tblExRes').hide('slow');
			$('#tblExDet').hide('slow');
			$('#tblExDoc').show('slow');
		}
	});

	$("#btn_ex_bk_res").click(function(e){
		e.preventDefault();

		$("#tbl_ex_res").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblExRes').hide('slow');
	});

	$("#btn_ex_bk_det").click(function(e){
		e.preventDefault();

		$("#tbl_ex_det").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblExDet').hide('slow');
		$('#tblExRes').show('slow');
	});

	$("#btn_ex_bk_doc").click(function(e){
		e.preventDefault();

		$("#tbl_ex_doc").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblExDoc').hide('slow');
		$('#tblExDet').show('slow');
	});
})(jQuery);