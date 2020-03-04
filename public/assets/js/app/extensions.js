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
		defaultDate: date_now
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
				field: "candoc",
				title: "Candoc",
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
				field: "interes",
				title: "Interes",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "comision",
				title: "Comisión",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "iva",
				title: "IVA",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "total",
				title: "Total",
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
	});

	$("#tbl_ex_det").bootstrapTable({
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
				formatter: function(value, row, index) {
					const fecha = moment(value, 'DD-MM-YYYY H:mm:SS');

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
					const fecha = moment(value, 'DD-MM-YYYY H:mm:SS');

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
					const fecha = moment(value, 'DD-MM-YYYY H:mm:SS');

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
		
		if($('input:radio[name=ex_opt1]:checked').val() === 'ex_opt1_all') {
			$('#tblExRes').show('slow');
			$('#tblExDet').hide('slow');
			$('#tblExDoc').hide('slow');

			//const dt_ini = $("#ws_date").data("DateTimePicker").date().format("YYYY-MM-DD");
			//const dt_end = $("#ws_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
	
			$("#tbl_ex_res").bootstrapTable("refresh", {
				url: urlSp16resTable(0, null, null),
			});
		} else if($('input:radio[name=ex_opt1]:checked').val() === 'ex_opt1_rut') {
			$("#tbl_ex_doc").bootstrapTable("refresh", {
				url: urlSp16docTable(0, null, null),
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
			const dt = $("#ex_date_txt").data("DateTimePicker").date().format("YYYY-MM-DD");
			//const dt_end = $("#ws_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
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

			//const dt_ini = $("#ws_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			//const dt_end = $("#ws_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt = $("#ex_date_txt").data("DateTimePicker").date().format("YYYY-MM-DD");
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