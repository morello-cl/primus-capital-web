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
function urlSp12docTable(rut, contrato, date_ini, date_end) {
	let url = '/cancellations/api/sp_12_doc/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(contrato) {
		url = `${url}&contrato=${contrato}`;
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

	let _originalOption = '';

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
				sortable: true
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
    
    $("#tbl_cancel_det").bootstrapTable({
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
				searchable: true,
				class: 'text-nowrap',
				/*formatter: function(value, row, index) {
					const fecha = moment(value);

                    return fecha.format('DD-MM-YYYY');
                },*/
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
				field: "intmora",
				title: "Int Mora",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "intdev",
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

	$("#tbl_cancel_doc").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: function(value, row, index) {
					const rut = $.formatRut(value + "-" + row.dvcliente, true);

                    return rut;
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
				field: "iddeudor",
				title: "R.U.T. Deudor",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: function(value, row, index) {
					const rut = $.formatRut(value + "-" + row.dvdeudor, true);

                    return rut;
                },
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
			},
			{
				field: "f_otorg",
				title: "Fch Ot",
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
				formatter: function(value, row, index) {
					const fecha = moment(value);

                    return fecha.format('DD-MM-YYYY');
                },
            },
			{
				field: "mondcto",
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
				field: "intmora",
				title: "Int Mora",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "intdev",
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
				title: "excedente",
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

	$("#tbl_cancel_abo").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: function(value, row, index) {
                    return $.formatRut(value + "-" + row.dvcliente, true);
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
				field: "iddeudor",
				title: "R.U.T. Deudor",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: function(value, row, index) {
                    return $.formatRut(value + "-" + row.dvdeudor, true);
                },
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
				formatter: function(value, row, index) {
					const fecha = moment(value);

                    return fecha.format('DD-MM-YYYY');
                },
			},
			{
				field: "f_pago",
				title: "Fch Pago",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				formatter: function(value, row, index) {
					const fecha = moment(value);

                    return fecha.format('DD-MM-YYYY');
                },
			},
			{
				field: "quienpaga",
				title: "Quien",
				align: 'center',
				searchable: false
			},
			{
				field: "formpago",
				title: "Form Pago",
				align: 'center',
				searchable: false
            },
			{
				field: "mondcto",
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
				title: "Int Mora",
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
				field: "excgen",
				title: "excedente",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
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

			$("#tbl_cancel_doc").bootstrapTable("refresh", {
				url: urlSp12docTable(nro_client, dt_ini, dt_end),
			});

			$('#tblCancelRes').hide('slow');
			$('#tblCancelDet').hide('slow');
			$('#tblCancelDoc').show('slow');
			$('#tblCancelAbo').hide('slow');
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

		$('#tblCancelDeC').hide('slow');
		$('#tblCancelDoc').show('slow');
	});
})(jQuery);