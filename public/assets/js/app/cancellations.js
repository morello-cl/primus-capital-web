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

function urlSp12resTable(rut, date_ini, date_end) {
	let url = '/cancellations/api/sp_12_res/?';

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
function urlSp12detTable(rut, date_ini, date_end) {
	let url = '/cancellations/api/sp_12_det/?';

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
function urlSp12docTable(rut, date_ini, date_end) {
	let url = '/cancellations/api/sp_12_doc/?';

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
function urlSp12docTable(rut, date_ini, date_end) {
	let url = '/cancellations/api/sp_12_abo/?';

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

    const date_end = moment().startOf("day");

    const date_ini = moment().add(-6, 'M');
     
    $("#ca_date_ini").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_ini
    });
    
	$("#ca_date_end").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_end,
		minDate: date_ini,
		maxDate: date_end
	});

	$('#btn-ca-clear').click(function(e){
		e.preventDefault();

		// opciones activas por defecto
		$('input:radio[name=ca_op1]').filter('[value=ca_opt_det]').prop('checked', true);
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
		$('#tblCancelRes').collapse('hide');
		$("#tbl_cancel_res").bootstrapTable("refresh", {
            url: urlSp12resTable(null, null, null),
        });
		$('#tblAwardRes').collapse('hide');
		$("#tbl_award_res").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblAwardDet').collapse('hide');
		$("#tbl_award_det").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblAwardDoc').collapse('hide');
		$("#tbl_award_doc").bootstrapTable("refresh", {
            url: [],
        });
	});

	$('#btn_ca_date_ini').click(function(e){
		$('#ca_date_ini').data("DateTimePicker").toggle();
	});

	$('#btn_ca_date_end').click(function(e){
		$('#ca_date_end').data("DateTimePicker").toggle();
	});
    
    $("#ca_date_ini").datetimepicker().on("dp.change", function(e) {
		$("#ca_date_end").datetimepicker({
			minDate: $("#ca_date_ini").data("DateTimePicker").date()
        });
    });
    $("#ca_date_end").datetimepicker().on("dp.change", function(e) {
		$("#ca_date_ini").datetimepicker({
			maxDate: $("#ca_date_end").data("DateTimePicker").date()
        });
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

    $('input:radio[name=ca_op1]').click(function(e){
        if($('input:radio[name=ca_op1]:checked').val() === 'ca_opt_ind') {
            $('#ca_nro').attr('disabled', false);
        } else {
            $('#ca_nro').attr('disabled', true);
        }
	});
	
	$("#tbl_cancel_res").bootstrapTable({
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
				field: "dif_precio",
				title: "Dif Precio",
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
		url: urlSp12resTable(null, null, null),
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: false,
		showColumns: true,
		exportDataType: "all",
		exportTypes: ["json", "xml", "csv", "txt", "sql", "excel"],
		exportOptions: exportOptionsBoostrapTable,
		search: true,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
	});
    

    $("#tbl_cancel_det").bootstrapTable({
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
				field: "tasa_min",
				title: "Tasa Min.",
				align: 'center',
				searchable: true,
            },
            {
				field: "tasa_max",
				title: "Tasa Max",
				align: 'center',
				sortable: true,
				searchable: true,
			},
			{
				field: "mon_doc",
				title: "Mon Doc",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "mont_ant",
				title: "Mon Ant",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "dif_precio",
				title: "Dif Precio",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "comision",
				title: "Comision",
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
				field: "gastos",
				title: "Gastos",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "impto",
				title: "Impto",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "mon_oper",
				title: "Mon Oper",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "apl",
				title: "Aplic",
				align: 'right',
                sortable: true,
                searchable: true,
            },
            {
				field: "agirar",
				title: "A Giro",
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
		showRefresh: false,
		showColumns: true,
		exportDataType: "all",
		exportTypes: ["json", "xml", "csv", "txt", "sql", "excel"],
		exportOptions: exportOptionsBoostrapTable,
		search: true,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
	});

	$("#tbl_cancel_doc").bootstrapTable({
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
				field: "fotorgam",
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
				field: "tasa_doc",
				title: "Tasa",
				align: 'center',
				sortable: true,
				searchable: true,
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
				field: "dias_cob",
				title: "Días Prom.",
				align: 'center',
				sortable: true,
				searchable: true,
			},
			{
				field: "mon_doc",
				title: "Mon Doc.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "mon_ant",
				title: "Mon Ant.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "dif_precio",
				title: "Dif Precio",
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
				field: "gastos",
				title: "Gastos",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "impto",
				title: "Impto",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "mon_gir",
				title: "Mon Oper",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "apl",
				title: "Aplic",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "agirar",
				title: "A Giro",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "diaspond",
				title: "Días Pond.",
				align: 'center',
                sortable: true,
                searchable: true,
            },
		],
		url: [],
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: false,
		showColumns: true,
		exportDataType: "all",
		exportTypes: ["json", "xml", "csv", "txt", "sql", "excel"],
		exportOptions: exportOptionsBoostrapTable,
		search: true,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
	});

	$("#tbl_cancel_abo").bootstrapTable({
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
		url: [],
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: false,
		showColumns: true,
		exportDataType: "all",
		exportTypes: ["json", "xml", "csv", "txt", "sql", "excel"],
		exportOptions: exportOptionsBoostrapTable,
		search: true,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
	});

    $("#btn-ca-search").click(function(e) {
		e.preventDefault();
		
		if($('input:radio[name=ca_op1]:checked').val() === 'ca_opt_res') {
			$('#tblCancelRes').collapse('show');
			$('#tblCancelDet').collapse('hide');
			$('#tblCancelDoc').collapse('hide');
			$('#tblCancelAbo').collapse('hide');

			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
	
			$("#tbl_cancel_res").bootstrapTable("refresh", {
				url: urlSp12resTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ca_op1]:checked').val() === 'ca_opt_det') {
			$('#tblCancelRes').collapse('hide');
			$('#tblCancelDet').collapse('show');
			$('#tblCancelDoc').collapse('hide');
			$('#tblCancelAbo').collapse('hide');

			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_award_det").bootstrapTable("refresh", {
				url: urlSp12detTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ca_op1]:checked').val() === 'ca_opt_doc') {
			$('#tblCancelRes').collapse('hide');
			$('#tblCancelDet').collapse('hide');
			$('#tblCancelDoc').collapse('show');
			$('#tblCancelAbo').collapse('hide');

			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_award_doc").bootstrapTable("refresh", {
				url: urlSp12docTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ca_op1]:checked').val() === 'ca_opt_abo') {
			$('#tblCancelRes').collapse('hide');
			$('#tblCancelDet').collapse('hide');
			$('#tblCancelDoc').collapse('hide');
			$('#tblCancelAbo').collapse('show');

			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_cancel_abo").bootstrapTable("refresh", {
				url: urlSp12aboTable(0, dt_ini, dt_end),
			});
		}
	});

	$("#tbl_cancel_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {			
			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_award_det").bootstrapTable("refresh", {
				url: urlSp12detTable(nro_client, dt_ini, dt_end),
			});

			$('#tblCancelRes').collapse('hide');
			$('#tblCancelDet').collapse('show');
			$('#tblCancelDoc').collapse('hide');
			$('#tblCancelAbo').collapse('hide');
		}
	});

	$("#tbl_cancel_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {
			const dt_ini = $("#ca_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ca_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const rut = $.formatRut($("#ca_nro").val(), false);
			const nro_client = row.idcliente;

			$("#tbl_cancel_doc").bootstrapTable("refresh", {
				url: urlSp12docTable(nro_client, dt_ini, dt_end),
			});

			$('#tblCancelRes').collapse('hide');
			$('#tblCancelDet').collapse('hide');
			$('#tblCancelDoc').collapse('show');
			$('#tblCancelAbo').collapse('hide');
		}
	});
})(jQuery);