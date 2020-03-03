function urlSp13resTable(rut, date_ini, date_end) {
	let url = '/wallet-staft/api/sp_13_res/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ws_op2', 'ws_opt_per')}`;

	return url;
}
function urlSp13detTable(rut, date_ini, date_end) {
	let url = '/wallet-staft/api/sp_13_det/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ws_op2', 'ws_opt_per')}`;

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

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ws_op2', 'ws_opt_per')}`;

	return url;
}

(function($) {
	"use strict";

	__exportOptionsTable.worksheetName = 'Cartera Vigente';

    const date_now = moment().startOf("day");

    const date_end = moment().startOf("day");

    const date_ini = moment().add(-6, 'M');
     
    $("#ws_date_ini").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_ini
    });
    
	$("#ws_date_end").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_end,
		minDate: date_ini,
		maxDate: date_end
	});

	$('#btn_ws_date_ini').click(function(e){
		$('#ws_date_ini').data("DateTimePicker").toggle();
	});

	$('#btn_ws_date_end').click(function(e){
		$('#ws_date_end').data("DateTimePicker").toggle();
	});
    
    $("#ws_date_ini").datetimepicker().on("dp.change", function(e) {
		$("#ws_date_end").datetimepicker({
			minDate: $("#ws_date_ini").data("DateTimePicker").date()
        });
    });
    $("#ws_date_end").datetimepicker().on("dp.change", function(e) {
		$("#ws_date_ini").datetimepicker({
			maxDate: $("#ws_date_end").data("DateTimePicker").date()
        });
    });


    $('input:radio[name=ws_op2]').click(function(e){
        if($('input:radio[name=ws_op2]:checked').val() === 'w_opt_per') {
			$('#ws_date_ini_txt').prop('readonly', false);
			$('#ws_date_end_txt').prop('readonly', false);
        } else {
			$('#ws_date_ini_txt').prop('readonly', true);
			$('#ws_date_end_txt').prop('readonly', true);
        }
    });

    $('input:radio[name=ws_op1]').click(function(e){
        if($('input:radio[name=ws_op1]:checked').val() === 'ws_opt_ind') {
            $('#ws_nro').attr('disabled', false);
        } else {
            $('#ws_nro').attr('disabled', true);
        }
    });
    

    $("#tbl_ws_res").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T.",
				searchable: true,
				class: 'text-nowrap',
				formatter: function(value, row, index) {
					const rut_client = $.formatRut(value + "-" + row.dvcliente, false);

                    return rut_client;
                },
			},
			{
				field: "nomcliente",
				title: "Nombre",
				class: 'text-nowrap',
				searchable: true,
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
				title: "Capa Mort",
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
				field: "docvig",
				title: "Doc Vig",
				align: 'right',
                sortable: true,
				searchable: false,
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
				title: "R.U.T.",
				class: 'text-nowrap',
				searchable: true,
				formatter: function(value, row, index) {
					const rut_client = $.formatRut(value + "-" + row.dvcliente, false);

                    return rut_client;
                },
			},
			{
				field: "nomcliente",
				title: "Nombre Cliente",
				class: 'text-nowrap',
				searchable: true,
			},
			{
				field: "contrato",
				title: "Contrato",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: function(value, row, index) {
					return `<a href="#" class="badge badge-secondary"><strong>${value}</strong></a>`;
				}
			},
			{
				field: "fchot",
				title: "Fecha",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				formatter: __dateFormatTable,
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
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "monant",
				title: "Mon Ant.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "monrec",
				title: "Mon Rec.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "capamort",
				title: "Capa Mort",
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
				field: "docvig",
				title: "Doc Vig",
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

	$("#tbl_ws_doc").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T.",
				searchable: true,
				class: 'text-nowrap',
				formatter: function(value, row, index) {
					const rut_client = $.formatRut(value + "-" + row.dvcliente, false);

                    return rut_client;
                },
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
				formatter: function(value, row, index) {
					const rut_deudor = $.formatRut(value + "-" + row.dvcliente, false);

                    return rut_deudor;
                },
			},
			{
				field: "nomcliente",
				title: "Deudor",
				searchable: true,
			},
			{
				field: "contrato",
				title: "Contrato",
				searchable: true,
			},
			{
				field: "fchot",
				title: "Fecha Ot.",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				formatter: __dateFormatTable,
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
            },
			{
				field: "fchvcto",
				title: "Fecha Vcto.",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				formatter: __dateFormatTable,
            },
			{
				field: "mora",
				title: "Mora",
				searchable: true,
			},
			{
				field: "mondoc",
				title: "Mon Doc.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "monant",
				title: "Mon Ant.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "monrec",
				title: "Mon Rec.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "capamort",
				title: "Capa Mort",
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
				field: "operacion",
				title: "Operacion",
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

    $("#btn-ws-search").click(function(e) {
		e.preventDefault();
		
		if($('input:radio[name=ws_op1]:checked').val() === 'ws_opt_con') {
			$('#tblWsRes').show('slow');
			$('#tblWsDet').hide('slow');
			$('#tblWsDoc').hide('slow');

			const dt_ini = $("#ws_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ws_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
	
			$("#tbl_ws_res").bootstrapTable("refresh", {
				url: urlSp13resTable(0, dt_ini, dt_end),
			});
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
		$('input:radio[name=ws_op1]').filter('[value=ws_opt_con]').prop('checked', true);
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