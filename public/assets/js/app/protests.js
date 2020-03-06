function urlSp15resTable(rut, date_ini, date_end) {
	let url = '/protests/api/sp_15_res/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'po_opt3', 'po_opt3_per', -1)}`;

	return url;
}
function urlSp15detTable(rut, date_ini, date_end) {
	let url = '/protests/api/sp_15_det/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'po_opt3', 'po_opt3_per', -1)}`;

	return url;
}
function urlSp15docTable(rut, contrato, date_ini, date_end) {
	let url = '/protests/api/sp_15_doc/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(contrato) {
		url = `${url}&contrato=${contrato}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'po_opt3', 'po_opt3_per', -1)}`;

	return url;
}

(function($) {
	"use strict";

	__exportOptionsTable.worksheetName = 'Protestos';

	$('#po_nro').rut({ formatOn: 'keyup', ignoreControlKeys: false, validateOn: 'keyup' });
	$("#po_nro").rut().on('rutInvalido', function(e) {
		if(v($("#po_nro").val()).isBlank()) {
			$('#po_nro').removeClass('is-invalid');
		} else {
			$('#po_nro').addClass('is-invalid');
		}
	});
	$("#po_nro").rut().on('rutValido', function(e, rut, dv) {
		$('#po_nro').removeClass('is-invalid');
	});

    const date_now = moment().startOf("day");
     
    $("#po_date").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		useCurrent: false,
		date: date_ini
    });

	$('#btn_po_date').click(function(e){
		$('#po_date').data("DateTimePicker").toggle();
	});

    $('input:radio[name=po_opt3]').click(function(e){
        if($('input:radio[name=po_opt3]:checked').val() === 'po_opt3_per') {
			$('#po_date_txt').prop('disabled', false);
        } else {
			$('#po_date_txt').prop('disabled', true);
        }
    });

    $('input:radio[name=po_opt1]').click(function(e){
        if($('input:radio[name=po_opt1]:checked').val() === 'po_opt1_rut') {
            $('#po_nro').attr('disabled', false);
        } else {
            $('#po_nro').attr('disabled', true);
        }
    });
    

    $("#tbl_po_res").bootstrapTable({
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
				field: "candoc",
				title: "Can Doc",
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

	$("#tbl_po_det").bootstrapTable({
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
				field: "contratos",
				title: "Contratos",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: __linkTable
			},
			{
				field: "candoc",
				title: "Can Doc.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "mondoc",
				title: "Mon Doc.",
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

	$("#tbl_po_doc").bootstrapTable({
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
				field: "contratos",
				title: "Contratos",
				align: 'center',
				searchable: true,
				sortable: true,
			},
			{
				field: "fchprot",
				title: "Fch Prot",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
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
				field: "banco",
				title: "Banco",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "motivo",
				title: "Motivo",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "estado",
				title: "Estado",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
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

    $("#btn_po_search").click(function(e) {
		e.preventDefault();

		const dt = $("#po_date").data("DateTimePicker").date().format("YYYY-MM-DD");
		
		if($('input:radio[name=po_opt1]:checked').val() === 'po_opt1_all') {
			$('#tblPoRes').show('slow');
			$('#tblPoDet').hide('slow');
			$('#tblPoDoc').hide('slow');
	
			$("#tbl_po_res").bootstrapTable("refresh", {
				url: urlSp15resTable(0, dt, null),
			});
		} else if($('input:radio[name=po_opt1]:checked').val() === 'po_opt1_rut') {
			let rut = $('#po_nro').val();
			rut = $.formatRut(rut, false);
			rut = rut.slice(0, -2);
			console.log('rut', rut);
			$("#tbl_po_res").bootstrapTable("refresh", {
				url: urlSp15resTable(rut, dt, null),
			});

			$('#tblPoRes').show('slow');
			$('#tblPoDet').hide('slow');
			$('#tblPoDoc').hide('slow');
		}
	});

	$('#btn_po_clear').click(function(e){
		e.preventDefault();

		$('#po_nro').val('');
		$('#po_nro').attr('disabled', true);
		$('#po_nro').removeClass('is-invalid');

		// opciones activas por defecto
		$('input:radio[name=po_opt1]').filter('[value=po_opt1_all]').prop('checked', true);
		$('input:radio[name=po_opt2]').filter('[value=po_opt2_vig]').prop('checked', true);
		$('input:radio[name=po_opt3]').filter('[value=po_opt3_hoy]').prop('checked', true);
		$('#po_date_txt').prop('disabled', true);

		// buscador queda modo default
		$("#po_date").datetimepicker({
			defaultDate: date_now
		});

		// limpiar tablas
		$('#tblPoRes').hide('slow');
		$("#tbl_po_res").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblPoDet').hide('slow');
		$("#tbl_po_det").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblPoDoc').hide('slow');
		$("#tbl_po_doc").bootstrapTable("refresh", {
            url: [],
        });
	});

	$("#tbl_po_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {			
			const dt = $("#po_date").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_po_det").bootstrapTable("refresh", {
				url: urlSp15detTable(nro_client, dt, null),
			});

			$('#tblPoRes').hide('slow');
			$('#tblPoDet').show('slow');
			$('#tblPoDoc').hide('slow');
		}
	});

	$("#tbl_po_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {
			const dt = $("#po_date").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_po_doc").bootstrapTable("refresh", {
				url: urlSp15docTable(nro_client, row.contratos, dt, null),
			});

			$('#tblPoRes').hide('slow');
			$('#tblPoDet').hide('slow');
			$('#tblPoDoc').show('slow');
		}
	});

	$("#btn_po_bk_res").click(function(e){
		e.preventDefault();

		$("#tbl_po_res").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblPoRes').hide('slow');
	});

	$("#btn_po_bk_det").click(function(e){
		e.preventDefault();

		$("#tbl_po_det").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblPoDet').hide('slow');
		$('#tblPoRes').show('slow');
	});

	$("#btn_po_bk_doc").click(function(e){
		e.preventDefault();

		$("#tbl_ws_doc").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblPoDoc').hide('slow');
		$('#tblPoDet').show('slow');
	});
})(jQuery);