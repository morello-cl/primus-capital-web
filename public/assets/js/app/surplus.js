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

function urlSp14resTable(rut, date_ini, date_end) {
	let url = '/surplus/api/sp_14_res/?';

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
function urlSp14detTable(rut, date_ini, date_end) {
	let url = '/surplus/api/sp_14_det/?';

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
function urlSp14docTable(rut, date_ini, date_end) {
	let url = '/surplus/api/sp_14_doc/?';

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
function urlSp14aboTable(rut, date_ini, date_end) {
	let url = '/surplus/api/sp_14_abo/?';

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
function urlSp14carTable(rut, date_ini, date_end) {
	let url = '/surplus/api/sp_14_car/?';

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
     
    $("#sp_date_ini").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_ini
    });
    
	$("#sp_date_end").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_end,
		minDate: date_ini,
		maxDate: date_end
	});

	$('#btn_sp_date_ini').click(function(e){
		$('#sp_date_ini').data("DateTimePicker").toggle();
	});

	$('#btn_sp_date_end').click(function(e){
		$('#sp_date_end').data("DateTimePicker").toggle();
	});
    
    $("#sp_date_ini").datetimepicker().on("dp.change", function(e) {
		$("#sp_date_end").datetimepicker({
			minDate: $("#sp_date_ini").data("DateTimePicker").date()
        });
    });
    $("#sp_date_end").datetimepicker().on("dp.change", function(e) {
		$("#sp_date_ini").datetimepicker({
			maxDate: $("#sp_date_end").data("DateTimePicker").date()
        });
    });


    $('input:radio[name=sp_op2]').click(function(e){
        if($('input:radio[name=sp_op2]:checked').val() === 'sp_opt_per') {
			$('#sp_date_ini_txt').prop('readonly', false);
			$('#sp_date_end_txt').prop('readonly', false);
        } else {
			$('#sp_date_ini_txt').prop('readonly', true);
			$('#sp_date_end_txt').prop('readonly', true);
        }
    });

    $("#tbl_surplus_res").bootstrapTable({
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
				field: "noant",
				title: "No Ant.",
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
				field: "excendete",
				title: "Exedente",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "egresos",
				title: "Egresos",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                }
            },
            {
				field: "saldo",
				title: "Saldo",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                }
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

	$("#tbl_surplus_det").bootstrapTable({
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
				field: "noant",
				title: "No Ant",
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
				field: "excedente",
				title: "Excedente",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "aplic",
				title: "Aplic",
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

	$("#tbl_surplus_doc").bootstrapTable({
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

	$("#tbl_surplus_abo").bootstrapTable({
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
	$("#tbl_surplus_car").bootstrapTable({
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

    $("#btn-sp-search").click(function(e) {
		e.preventDefault();
		
		if($('input:radio[name=sp_op1]:checked').val() === 'sp_opt_res') {
			$('#tblSurplusRes').show('slow');
			$('#tblSurplusDet').hide('slow');
			$('#tblSurplusDoc').hide('slow');
			$('#tblSurplusAbo').hide('slow');
			$('#tblSurplusCar').hide('slow');

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
	
			$("#tbl_surplus_res").bootstrapTable("refresh", {
				url: urlSp14resTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=sp_op1]:checked').val() === 'sp_opt_det') {
			$('#tblSurplusRes').hide('slow');
			$('#tblSurplusDet').show('slow');
			$('#tblSurplusDoc').hide('slow');
			$('#tblSurplusAbo').hide('slow');
			$('#tblSurplusCar').hide('slow');

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = rut.substring(0, rut.length -2 );

			$("#tbl_surplus_det").bootstrapTable("refresh", {
				url: urlSp14detTable(nro_client, dt_ini, dt_end),
			});
		} else if($('input:radio[name=sp_op1]:checked').val() === 'sp_opt_doc') {
			$('#tblSurplusRes').hide('slow');
			$('#tblSurplusDet').hide('slow');
			$('#tblSurplusDoc').show('slow');
			$('#tblSurplusAbo').hide('slow');
			$('#tblSurplusCar').hide('slow');

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_surplus_doc").bootstrapTable("refresh", {
				url: urlSp14docTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=sp_op1]:checked').val() === 'ot_opt_abo'){
			$('#tblSurplusRes').hide('slow');
			$('#tblSurplusDet').hide('slow');
			$('#tblSurplusDoc').hide('slow');
			$('#tblSurplusAbo').show('slow');
			$('#tblSurplusCar').hide('slow');

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_surplus_doc").bootstrapTable("refresh", {
				url: urlSp14aboTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=sp_op1]:checked').val() === 'ot_opt_car'){
			$('#tblSurplusRes').hide('slow');
			$('#tblSurplusDet').hide('slow');
			$('#tblSurplusDoc').hide('slow');
			$('#tblSurplusAbo').hide('slow');
			$('#tblSurplusCar').show('slow');

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_surplus_car").bootstrapTable("refresh", {
				url: urlSp14carTable(0, dt_ini, dt_end),
			});
		}
	});

	$('#btn-sp-clear').click(function(e){
		e.preventDefault();

		// opciones activas por defecto
		$('input:radio[name=sp_op1]').filter('[value=sp_opt_res]').prop('checked', true);
		$('input:radio[name=sp_op2]').filter('[value=sp_opt_hoy]').prop('checked', true);
		$('#sp_date_ini_txt').prop('readonly', true);
		$('#sp_date_end_txt').prop('readonly', true);

		// buscador queda modo default
		$("#sp_date_ini").datetimepicker({
			defaultDate: date_ini
		});
		$("#sp_date_end").datetimepicker({
			defaultDate: date_end
		});

		// limpiar tablas
		$('#tblSurplusRes').hide('slow');
		$("#tbl_surplus_res").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblSurplusDet').hide('slow');
		$("#tbl_surplus_det").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblSurplusDoc').hide('slow');
		$("#tbl_surplus_doc").bootstrapTable("refresh", {
            url: [],
		});
		$('#tblSurplusAbo').hide('slow');
		$("#tbl_surplus_abo").bootstrapTable("refresh", {
            url: [],
		});
		$('#tblSurplusCar').hide('slow');
		$("#tbl_surplus_car").bootstrapTable("refresh", {
            url: [],
        });
	});

	$("#tbl_surplus_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {			
			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_surplus_det").bootstrapTable("refresh", {
				url: urlSp14detTable(nro_client, dt_ini, dt_end),
			});

			$('#tblSurplusRes').hide('slow');
			$('#tblSurplusDet').show('slow');
			$('#tblSurplusDoc').hide('slow');
			$('#tblSurplusAbo').hide('slow');
			$('#tblSurplusCar').hide('slow');
		}
	});

	$("#tbl_surplus_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {
			console.log('doc.field', field);
			console.log('doc.row', row);

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const rut = $.formatRut($("#ot_nro").val(), false);
			const nro_client = row.idcliente;

			$("#tbl_surplus_doc").bootstrapTable("refresh", {
				url: urlSp11docTable(nro_client, dt_ini, dt_end),
			});

			$('#tblSurplusRes').hide('slow');
			$('#tblSurplusDet').hide('slow');
			$('#tblSurplusDoc').show('slow');
			$('#tblSurplusAbo').hide('slow');
			$('#tblSurplusCar').hide('slow');
		}
	});
})(jQuery);