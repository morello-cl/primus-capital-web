function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function urlSp12resTable(rut, date_ini, date_end) {
	let url = '/cancellations/api/sp_12_res/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	
	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ca_op2', 'ca_opt_per', -1)}`;

	return url;
}
function urlSp12detTable(rut, date_ini, date_end) {
	let url = '/cancellations/api/sp_12_det/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ca_op2', 'ca_opt_per', -1)}`;

	return url;
}
function urlSp12docTable(rut, contrato, date_ini, date_end) {
	let url = '/cancellations/api/sp_12_doc/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(contrato) {
		url = `${url}&contrato=${contrato}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ca_op2', 'ca_opt_per', -1)}`;

	console.log('urlSp12docTable', url);

	return url;
}
function urlSp12aboTable(rut, contrato, date_ini, date_end) {
	let url = '/cancellations/api/sp_12_abo/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(contrato) {
		url = `${url}&contrato=${contrato}`;
	}
	
	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ca_op2', 'ca_opt_per', -1)}`;

	return url;
}

(function($) {
	"use strict";

	__exportOptionsTable.worksheetName = 'Cancelaciones';

	let _originalOption = '';

    const date_end = moment().startOf("day");

    const date_ini = moment().add(-6, 'M');
     
    $("#ca_date_ini").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		useCurrent: false,
		date: date_ini
    });
    
	$("#ca_date_end").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		useCurrent: false,
		date: date_end,
		minDate: date_ini,
		maxDate: date_end
	});

	$('#btn_ca_date_ini').click(function(e){
		$('#ca_date_ini').data("DateTimePicker").toggle();
	});

	$('#btn_ca_date_end').click(function(e){
		$('#ca_date_end').data("DateTimePicker").toggle();
	});
	
	$("#ca_date_ini").on("dp.change", function(e) {
		console.log('ini.e.date', e.date);
		$("#ca_date_end").data("DateTimePicker").minDate(e.date);
    });
    $("#ca_date_end").on("dp.change", function(e) {
		console.log('end.e.date', e.date);
		$("#ca_date_ini").data("DateTimePicker").maxDate(e.date);
	});


    $('input:radio[name=ca_op2]').click(function(e){
        if($('input:radio[name=ca_op2]:checked').val() === 'ca_opt_per') {
			$('#ca_date_ini_txt').prop('readonly', false);
			$('#ca_date_end_txt').prop('readonly', false);
        } else {
			$('#ca_date_ini_txt').prop('readonly', true);
			$('#ca_date_end_txt').prop('readonly', true);
        }
    });
	
	$("#tbl_cancel_res").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				searchable: true,
				sortable: true,
				class: 'text-nowrap',
				formatter: function(value, row, index) {
					const rut_client = $.formatRut(value + "-" + row.dvcliente, true);

                    return rut_client;
                },
			},
			{
				field: "nomcliente",
				title: "Nombre Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true
			},
			{
				field: "contratos",
				title: "Contratos",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: function(value, row, index) {
					return `<a href="#" class="badge badge-secondary"><strong>${value}</strong></a>`;
				}
			},
			{
				field: "mondoc",
				title: "Mon Doc",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "monant",
				title: "Mon Ant",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "monrec",
				title: "Mon Rec",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "capamort",
				title: "Cap Amort",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
            {
				field: "int_mora",
				title: "Int. Mora",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "int_dev",
				title: "Int Dev",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "reajuste",
				title: "Reajuste",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "saldo",
				title: "Saldo",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "excedente",
				title: "Excedente",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
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
    
    $("#tbl_cancel_det").bootstrapTable({
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
				sortable: true
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
				field: "f_otorg",
				title: "Fch Ot",
				align: 'center',
				searchable: true,
				sortable: true,
				class: 'text-nowrap',
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
            },
            {
				field: "tipo",
				title: "Tipo",
				align: 'center',
				class: 'text-nowrap',
				sortable: true,
				searchable: true,
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
				title: "Cap Amort",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "intmora",
				title: "Int Mora",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "intdev",
				title: "Int Dev",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "reajuste",
				title: "Reajuste",
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
				field: "excedente",
				title: "Excedente",
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

	$("#tbl_cancel_doc").bootstrapTable({
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
				sortable: true
			},
			{
				field: "iddeudor",
				title: "R.U.T. Deudor",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __rutDeudorFormatTable,
			},
			{
				field: "nomdeudor",
				title: "Nombre Deudor",
				class: 'text-nowrap',
				searchable: true,
				sortable: true
			},
			{
				field: "contrato",
				title: "Contrato",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: __linkTable,
			},
			{
				field: "f_otorg",
				title: "Fch Ot",
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
				align: 'center',
				sortable: true,
				searchable: true,
			},
			{
				field: "f_vcmto",
				title: "Fch Vcmto",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
            },
			{
				field: "mondcto",
				title: "Mon Doc.",
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
				title: "Cap Amort",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "intmora",
				title: "Int Mora",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "intdev",
				title: "Int Dev",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "reajuste",
				title: "Reajuste",
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
				field: "excedente",
				title: "excedente",
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

	$("#tbl_cancel_abo").bootstrapTable({
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
				sortable: true
			},
			{
				field: "iddeudor",
				title: "R.U.T. Deudor",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __rutDeudorFormatTable,
			},
			{
				field: "nomdeudor",
				title: "Nombre Deudor",
				class: 'text-nowrap',
				searchable: true,
				sortable: true
			},
			{
				field: "contrato",
				title: "Contrato",
				align: 'center',
				searchable: true,
				sortable: true
			},
			{
				field: "f_otorg",
				title: "Fch Ot",
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
				align: 'center',
				sortable: true,
				searchable: true,
			},
			{
				field: "f_vcmto",
				title: "Fch Vcmto",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
			},
			{
				field: "f_pago",
				title: "Fch Pago",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
			},
			{
				field: "quienpaga",
				title: "Quien",
				align: 'center',
				searchable: false,
				sortable: true,
			},
			{
				field: "formpago",
				title: "Form Pago",
				align: 'center',
				searchable: false,
				sortable: true,
            },
			{
				field: "mondcto",
				title: "Mon Doc.",
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
				title: "Cap Amort",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "int_mora",
				title: "Int Mora",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "int_dev",
				title: "Int Dev",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
            },
            {
				field: "reajuste",
				title: "Reajuste",
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
				field: "excgen",
				title: "excedente",
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
		theadClasses: 'thead-light'
	});

    $("#btn-ca-search").click(function(e) {
		e.preventDefault();

		_originalOption = $('input:radio[name=ca_op1]:checked').val();
		
		if($('input:radio[name=ca_op1]:checked').val() === 'ca_opt_res') {
			$('#tblCancelRes').show('slow');
			$('#tblCancelDet').hide('slow');
			$('#tblCancelDoc').hide('slow');
			$('#tblCancelAbo').hide('slow');

			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
	
			$("#tbl_cancel_res").bootstrapTable("refresh", {
				url: urlSp12resTable(0, dt_ini, dt_end),
			});

		} else if($('input:radio[name=ca_op1]:checked').val() === 'ca_opt_det') {
			$('#tblCancelRes').hide('slow');
			$('#tblCancelDet').show('slow');
			$('#tblCancelDoc').hide('slow');
			$('#tblCancelAbo').hide('slow');

			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_cancel_det").bootstrapTable("refresh", {
				url: urlSp12detTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ca_op1]:checked').val() === 'ca_opt_doc') {
			$('#tblCancelRes').hide('slow');
			$('#tblCancelDet').hide('slow');
			$('#tblCancelDoc').show('slow');
			$('#tblCancelAbo').hide('slow');

			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_cancel_doc").bootstrapTable("refresh", {
				url: urlSp12docTable(0, null, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ca_op1]:checked').val() === 'ca_opt_abo') {
			$('#tblCancelRes').hide('slow');
			$('#tblCancelDet').hide('slow');
			$('#tblCancelDoc').hide('slow');
			$('#tblCancelAbo').show('slow');

			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_cancel_abo").bootstrapTable("refresh", {
				url: urlSp12aboTable(0, null, dt_ini, dt_end),
			});
		}
	});

	$('#btn-ca-clear').click(function(e){
		e.preventDefault();

		// opciones activas por defecto
		$('input:radio[name=ca_op1]').filter('[value=ca_opt_res]').prop('checked', true);
		$('input:radio[name=ca_op2]').filter('[value=ca_opt_hoy]').prop('checked', true);
		$('#ca_date_ini_txt').prop('readonly', true);
		$('#ca_date_end_txt').prop('readonly', true);

		// buscador queda modo default
		$("#ca_date_ini").datetimepicker({
			defaultDate: date_ini
		});
		$("#ca_date_end").datetimepicker({
			defaultDate: date_end
		});

		// limpiar tablas
		$('#tblCancelRes').hide('slow');
		$("#tbl_cancel_res").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblCancelDet').hide('slow');
		$("#tbl_cancel_det").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblCancelDoc').hide('slow');
		$("#tbl_cancel_doc").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblCancelAbo').hide('slow');
		$("#tbl_cancel_abo").bootstrapTable("refresh", {
            url: [],
        });
	});

	$("#tbl_cancel_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {			
			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_cancel_det").bootstrapTable("refresh", {
				url: urlSp12detTable(nro_client, dt_ini, dt_end),
			});

			$('#tblCancelRes').hide('slow');
			$('#tblCancelDet').show('slow');
			$('#tblCancelDoc').hide('slow');
			$('#tblCancelAbo').hide('slow');
		}
	});

	$("#tbl_cancel_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {
			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;
			const nro_contrato = row.contrato;

			$("#tbl_cancel_doc").bootstrapTable("refresh", {
				url: urlSp12docTable(nro_client, nro_contrato, dt_ini, dt_end),
			});

			$('#tblCancelRes').hide('slow');
			$('#tblCancelDet').hide('slow');
			$('#tblCancelDoc').show('slow');
			$('#tblCancelAbo').hide('slow');
		}
	});

	$("#tbl_cancel_doc").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {
			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;
			const nro_contrato = row.contrato;

			$("#tbl_cancel_abo").bootstrapTable("refresh", {
				url: urlSp12aboTable(nro_client, nro_contrato, dt_ini, dt_end),
			});

			$('#tblCancelRes').hide('slow');
			$('#tblCancelDet').hide('slow');
			$('#tblCancelDoc').hide('slow');
			$('#tblCancelAbo').show('slow');
		}
	});

	$("#btn_ca_bk_res").click(function(e){
		e.preventDefault();

		$("#tbl_cancel_res").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblCancelRes').hide('slow');
	});

	$("#btn_ca_bk_det").click(function(e){
		e.preventDefault();

		$("#tbl_cancel_det").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblCancelDet').hide('slow');

		if(_originalOption === 'ca_opt_res') {			
			$('#tblCancelRes').show('slow');
		}
	});

	$("#btn_ca_bk_doc").click(function(e){
		e.preventDefault();

		$("#tbl_cancel_doc").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblCancelDoc').hide('slow');
		$('#tblCancelDet').show('slow');
	});

	$("#btn_ca_bk_abo").click(function(e){
		e.preventDefault();

		if(getUrlVars()['page'] !== 'abono') {
			$('#tblCancelDeC').hide('slow');
			$('#tblCancelDoc').show('slow');
		} else {
			window.location.href = "/cancellations";
		}
	});
})(jQuery);

$(window).on('load', function(){
	if(getUrlVars()['page'] === 'abono') {
		console.log('date[gte]', getUrlVars()['date[gte]']);
		console.log('date[lte]', getUrlVars()['date[lte]']);

		$('input:radio[name=ca_op2]').filter('[value=ca_opt_per]').prop('checked', true);

		$("#tbl_cancel_abo").bootstrapTable("refresh", {
			url: urlSp12aboTable(getUrlVars()['rut'], getUrlVars()['contrato'], getUrlVars()['date[gte]'], getUrlVars()['date[lte]']),
		});

		$('#tblCancelRes').hide('slow');
		$('#tblCancelDet').hide('slow');
		$('#tblCancelDoc').hide('slow');
		$('#tblCancelAbo').show('slow');
	}
});