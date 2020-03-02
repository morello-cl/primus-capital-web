const __exportTypes = ["json", "xml", "csv", "txt", "excel"];
const exportOptionsBoostrapTable = {
	consoleLog: false,
	csvEnclosure: '"',
	csvSeparator: ";",
	csvUseBOM: true,
	displayTableName: false,
	escape: false,
	excelstyles: [
		"css",
		"properties",
		"to",
		"export",
		"to",
		"excel"
	],
	fileName: `primus-capital-${moment().format("YYYYMMDD_HHmmSS")}`,
	htmlContent: false,
	ignoreColumn: [],
	ignoreRow: [],
	jspdf: {
		orientation: "p",
		unit: "pt",
		format: "a4",
		margins: {
			left: 20,
			right: 10,
			top: 10,
			bottom: 10
		},
		autotable: {
			styles: {
				cellPadding: 2,
				rowHeight: 12,
				fontSize: 8,
				fillColor: 255,
				textColor: 50,
				fontStyle: "normal",
				overflow: "ellipsize",
				halign: "left",
				valign: "middle"
			},
			headerStyles: {
				fillColor: [
					52, 73, 94
				],
				textColor: 255,
				fontStyle: "bold",
				halign: "center"
			},
			alternateRowStyles: {
				fillColor: 245
			},
			tableExport: {
				onAfterAutotable: null,
				onBeforeAutotable: null,
				onTable: null
			}
		}
	},
	numbers: {
		html: {
			decimalMark: ".",
			thousandsSeparator: ","
		},
		output: {
			decimalMark: ",",
			thousandsSeparator: "."
		}
	},
	onCellData: null,
	onCellHtmlData: null,
	outputMode: "file",
	tbodySelector: "tr",
	theadSelector: "tr",
	tableName: "primus_capital_report",
	type: "csv",
	worksheetName: "Otorgamientos"
};

function urlSp15resTable(rut, date_ini, date_end) {
	let url = '/protests/api/sp_15_res/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(date_ini){
		url = `${url}&date[gte]=${date_ini}`;
	} else {
		url = `${url}&date[gte]=1900-01-01`;
	}
	if(date_end) {
		url = `${url}&date[lte]=${date_end}`;
	} else {
		url = `${url}&date[lte]=${moment().format('YYYY-MM-DD')}`;
	}

	return url;
}
function urlSp15detTable(rut, date_ini, date_end) {
	let url = '/protests/api/sp_15_det/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(date_ini){
		url = `${url}&date[gte]=${date_ini}`;
	} else {
		url = `${url}&date[gte]=1900-01-01`;
	}
	if(date_end) {
		url = `${url}&date[lte]=${date_end}`;
	} else {
		url = `${url}&date[lte]=${moment().format('YYYY-MM-DD')}`;
	}

	return url;
}
function urlSp15docTable(rut, date_ini, date_end) {
	let url = '/protests/api/sp_15_doc/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(date_ini){
		url = `${url}&date[gte]=${date_ini}`;
	} else {
		url = `${url}&date[gte]=1900-01-01`;
	}
	if(date_end) {
		url = `${url}&date[lte]=${date_end}`;
	} else {
		url = `${url}&date[lte]=${moment().format('YYYY-MM-DD')}`;
	}

	return url;
}

(function($) {
	"use strict";

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
		defaultDate: date_now
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
				title: "R.U.T.",
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
				field: "candoc",
				title: "Can Doc",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
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
			}
		],
		url: [],
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: true,
		showColumns: true,
		exportDataType: "all",
		exportTypes: __exportTypes,
		exportOptions: exportOptionsBoostrapTable,
		search: true,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
	});

	$("#tbl_po_det").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
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
				field: "candoc",
				title: "Can Doc.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
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
			}
		],
		url: [],
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: true,
		showColumns: true,
		exportDataType: "all",
		exportTypes: __exportTypes,
		exportOptions: exportOptionsBoostrapTable,
		search: true,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
	});

	$("#tbl_po_doc").bootstrapTable({
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
				title: "Cliente",
				class: 'text-nowrap',
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
				class: 'text-nowrap',
				searchable: true,
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
				formatter: function(value, row, index) {
					const fecha = moment(value, 'DD-MM-YYYY H:mm:SS');

                    return fecha.format('DD-MM-YYYY');
                },
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
				field: "banco",
				title: "Banco",
				class: 'text-nowrap',
				searchable: true,
			},
			{
				field: "motivo",
				title: "Motivo",
				class: 'text-nowrap',
				searchable: true,
			},
			{
				field: "estado",
				title: "Estado",
				class: 'text-nowrap',
				searchable: true,
			}
		],
		url: [],
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: true,
		showColumns: true,
		exportDataType: "all",
		exportTypes: __exportTypes,
		exportOptions: exportOptionsBoostrapTable,
		search: true,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
	});

    $("#btn_po_search").click(function(e) {
		e.preventDefault();
		
		if($('input:radio[name=po_opt1]:checked').val() === 'po_opt1_all') {
			$('#tblPoRes').show('slow');
			$('#tblPoDet').hide('slow');
			$('#tblPoDoc').hide('slow');

			//const dt_ini = $("#ws_date").data("DateTimePicker").date().format("YYYY-MM-DD");
			//const dt_end = $("#ws_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
	
			$("#tbl_po_res").bootstrapTable("refresh", {
				url: urlSp15resTable(0, null, null),
			});
		} else if($('input:radio[name=po_opt1]:checked').val() === 'po_opt1_rut') {
			$("#tbl_po_doc").bootstrapTable("refresh", {
				url: urlSp15docTable(0, null, null),
			});

			$('#tblPoRes').hide('slow');
			$('#tblPoDet').hide('slow');
			$('#tblPoDoc').show('slow');
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
			const dt_end = $("#po_date").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_po_det").bootstrapTable("refresh", {
				url: urlSp15detTable(nro_client, null, dt_end),
			});

			$('#tblPoRes').hide('slow');
			$('#tblPoDet').show('slow');
			$('#tblPoDoc').hide('slow');
		}
	});

	$("#tbl_po_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {
			const dt_end = $("#po_date").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_po_doc").bootstrapTable("refresh", {
				url: urlSp15docTable(nro_client, null, dt_end),
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