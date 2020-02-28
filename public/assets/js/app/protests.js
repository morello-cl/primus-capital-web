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

    const date_now = moment().startOf("day");
     
    $("#po_date").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_now
    });

	$('#btn_po_date').click(function(e){
		$('#po_date').data("DateTimePicker").toggle();
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
    

    $("#tbl_po_res").bootstrapTable({
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
			},
			{
				field: "fchot",
				title: "Fecha",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				formatter: function(value, row, index) {
					const fecha = moment(value);

                    return fecha.format('DD-MM-YYYY');
                },
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
				formatter: function(value, row, index) {
					const fecha = moment(value);

                    return fecha.format('DD-MM-YYYY');
                },
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
				formatter: function(value, row, index) {
					const fecha = moment(value);

                    return fecha.format('DD-MM-YYYY');
                },
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

	$("#tbl_po_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
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

	$("#tbl_po_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {

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