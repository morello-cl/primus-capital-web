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

function urlSp11resTable(rut, date_ini, date_end) {
	let url = '/award/api/sp_11_res/?';

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
function urlSp11detTable(rut, date_ini, date_end) {
	let url = '/award/api/sp_11_det/?';

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
function urlSp11docTable(rut, contrato, date_ini, date_end) {
	let url = '/award/api/sp_11_doc/?';

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
function urlSp11Ind1(rut, contrato) {
	let url = '/award/api/sp_11_ind1/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(contrato) {
		url = `${url}&contrato=${contrato}`;
	}

	return url;
}
function urlSp11Ind2(rut, contrato) {
	let url = '/award/api/sp_11_ind2/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(contrato) {
		url = `${url}&contrato=${contrato}`;
	}

	return url;
}
function urlSp11IndApl(rut, contrato) {
	let url = '/award/api/sp_11_indapl/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(contrato) {
		url = `${url}&contrato=${contrato}`;
	}

	return url;
}

(function($) {
	"use strict";
	
	$('#ot_nro').rut({ formatOn: 'keyup', ignoreControlKeys: false, validateOn: 'keyup' });
	$("#ot_nro").rut().on('rutInvalido', function(e) {
		if(v($("#ot_nro").val()).isBlank()) {
			$('#ot_nro').removeClass('is-invalid');
		} else {
			$('#ot_nro').addClass('is-invalid');
		}
	});
	$("#ot_nro").rut().on('rutValido', function(e, rut, dv) {
		$('#ot_nro').removeClass('is-invalid');
	});

    const date_now = moment().startOf("day");

    const date_end = moment().startOf("day");

    const date_ini = moment().add(-6, 'M');
     
    $("#ot_date_ini").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_ini
    });
    
	$("#ot_date_end").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		defaultDate: date_end,
		minDate: date_ini,
		maxDate: date_end
	});

	$('#btn_ot_date_ini').click(function(e){
		$('#ot_date_ini').data("DateTimePicker").toggle();
	});

	$('#btn_ot_date_end').click(function(e){
		$('#ot_date_end').data("DateTimePicker").toggle();
	});
    
    $("#ot_date_ini").datetimepicker().on("dp.change", function(e) {
		$("#ot_date_end").datetimepicker({
			minDate: $("#ot_date_ini").data("DateTimePicker").date()
        });
    });
    $("#ot_date_end").datetimepicker().on("dp.change", function(e) {
		$("#ot_date_ini").datetimepicker({
			maxDate: $("#ot_date_end").data("DateTimePicker").date()
        });
    });


    $('input:radio[name=ot_op2]').click(function(e){
        if($('input:radio[name=ot_op2]:checked').val() === 'ot_opt_per') {
			$('#ot_date_ini_txt').prop('readonly', false);
			$('#ot_date_end_txt').prop('readonly', false);
        } else {
			$('#ot_date_ini_txt').prop('readonly', true);
			$('#ot_date_end_txt').prop('readonly', true);
        }
    });

    $('input:radio[name=ot_op1]').click(function(e){
        if($('input:radio[name=ot_op1]:checked').val() === 'ot_opt_ind') {
            $('#ot_nro').attr('disabled', false);
        } else {
            $('#ot_nro').attr('disabled', true);
        }
    });
    

    $("#tbl_award_res").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				searchable: true,
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
			},
			{
				field: "contratos",
				title: "Contratos",
				align: 'center',
				searchable: true,
			},
			{
				field: "tasa_min",
				title: "Tasa Min",
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
				title: "I.V.A.",
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

	$("#tbl_award_det").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				class: 'text-nowrap',
				searchable: true,
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
				title: "Días Prom",
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
				field: "mon_ant",
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
				title: "I.V.A.",
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
				title: "Días Pond",
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

	$("#tbl_award_doc").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				searchable: true,
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
			},
			{
				field: "contrato",
				title: "Contrato",
				align: 'center',
				searchable: true,
			},
			{
				field: "iddeudor",
				title: "R.U.T. Deudor",
				searchable: true,
				class: 'text-nowrap',
				formatter: function(value, row, index) {
					const rut_client = $.formatRut(value + "-" + row.dvdeudor, false);

                    return rut_client;
                },
			},
			{
				field: "nomdeudor",
				title: "Nombre Deudor",
				class: 'text-nowrap',
				searchable: true,
			},
			{
				field: "fotorgam",
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
				field: "fvcmto",
				title: "Fch Vcto",
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
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "tipo",
				title: "Tipo",
				class: 'text-nowrap',
				searchable: true,
			},
			{
				field: "docto",
				title: "Docto",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "operacion",
				title: "Operación",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "dias_cob",
				title: "Días Prom",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "mondcto",
				title: "Mon dcto",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "monant",
				title: "Mon Ant",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "difprecio",
				title: "Dif Precio",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "comision",
				title: "Comisión",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "ivacom",
				title: "I.V.A.",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "gastos",
				title: "Gastos",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "impto",
				title: "Impto",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "montoagirar",
				title: "A Girar",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
		],
		url: [],
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: false,
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
	
	$("#tbl_award_ind2").bootstrapTable({
		columns: [
			{
				field: "iddeudor",
				title: "R.U.T. Deudor",
				searchable: true,
				class: 'text-nowrap'
			},
			{
				field: "nomdeudor",
				title: "Nombre Deudor",
				class: 'text-nowrap',
				searchable: true,
			},
			{
				field: "docto",
				title: "Nro Docto",
				align: 'center',
				searchable: true,
			},
			{
				field: "fvcmto",
				title: "Vencimiento",
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
				title: "Monto Docto",
				align: 'center',
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "monant",
				title: "Anticipado",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "saldoPrecio",
				title: "Saldo Precio",
				align: 'right',
				visible: false,
				sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
			{
				field: "difpecio",
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
				field: "dias_cob",
				title: "Días Cob",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "actpago",
				title: "actpago",
				visible: false,
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
            },
            {
				field: "operacion",
				title: "operacion",
				visible: false,
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

    $("#btn-ot-search").click(function(e) {
		e.preventDefault();
		
		if($('input:radio[name=ot_op1]:checked').val() === 'ot_opt_res') {
			$('#tblAwardRes').show('slow');
			$('#tblAwardDet').hide('slow');
			$('#tblAwardDoc').hide('slow');
			$('#tblAwardDeC').hide('slow');

			const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const rut = $.formatRut($("#ot_nro").val(), false);
			const nro_client = rut.substring(0, rut.length -2 );
	
			$("#tbl_award_res").bootstrapTable("refresh", {
				url: urlSp11resTable(nro_client, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ot_op1]:checked').val() === 'ot_opt_det') {
			$('#tblAwardRes').hide('slow');
			$('#tblAwardDet').show('slow');
			$('#tblAwardDoc').hide('slow');
			$('#tblAwardDeC').hide('slow');

			const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const rut = $.formatRut($("#ot_nro").val(), false);
			const nro_client = rut.substring(0, rut.length -2 );

			$("#tbl_award_det").bootstrapTable("refresh", {
				url: urlSp11detTable(nro_client, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ot_op1]:checked').val() === 'ot_opt_doc') {
			$('#tblAwardRes').hide('slow');
			$('#tblAwardDet').hide('slow');
			$('#tblAwardDoc').show('slow');
			$('#tblAwardDeC').hide('slow');

			const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const rut = $.formatRut($("#ot_nro").val(), false);
			const nro_client = rut.substring(0, rut.length -2 );

			$("#tbl_award_doc").bootstrapTable("refresh", {
				url: urlSp11docTable(nro_client, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ot_op1]:checked').val() === 'ot_opt_ind'){
			$('#tblAwardRes').hide('slow');
			$('#tblAwardDet').hide('slow');
			$('#tblAwardDoc').hide('slow');
			$('#tblAwardDeC').hide('slow');
		}
	});

	$('#btn-ot-clear').click(function(e){
		e.preventDefault();

		// opciones activas por defecto
		$('input:radio[name=ot_op1]').filter('[value=ot_opt_res]').prop('checked', true);
		$('#ot_nro').prop('disabled', true);
		$('#ot_nro').val(null);
		$('input:radio[name=ot_op2]').filter('[value=ot_opt_hoy]').prop('checked', true);
		$('#ot_date_ini_txt').prop('readonly', true);
		$('#ot_date_end_txt').prop('readonly', true);

		// buscador queda modo default
		$("#ot_date_ini").datetimepicker({
			defaultDate: date_ini
		});
		$("#ot_date_end").datetimepicker({
			defaultDate: date_end
		});

		// limpiar tablas
		$('#tblAwardRes').hide('slow');
		$("#tbl_award_res").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblAwardDet').hide('slow');
		$("#tbl_award_det").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblAwardDoc').hide('slow');
		$("#tbl_award_doc").bootstrapTable("refresh", {
            url: [],
		});
		$('#tblAwardDeC').hide('slow');
	});

	$("#tbl_award_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {			
			const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$('input:radio[name=ot_op1]').filter('[value=ot_opt_det]').prop('checked', true);

			$("#tbl_award_det").bootstrapTable("refresh", {
				url: urlSp11detTable(nro_client, dt_ini, dt_end),
			});

			$('#tblAwardRes').hide('slow');
			$('#tblAwardDet').show('slow');
			$('#tblAwardDoc').hide('slow');
		}
	});

	$("#tbl_award_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {
			console.log('doc.field', field);
			console.log('doc.row', row);

			const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;
			const nro_contrato = row.contrato;

			$("#tbl_award_doc").bootstrapTable("refresh", {
				url: urlSp11docTable(nro_client, nro_contrato, dt_ini, dt_end),
			});

			$('#tblAwardRes').hide('slow');
			$('#tblAwardDet').hide('slow');
			$('#tblAwardDoc').show('slow');
		}
	});

	$("#tbl_award_doc").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {
			const url = urlSp11Ind1(row.idcliente, row.contrato);

			console.log('url', url);
			axios.get(url)
				.then(function(r) {
					console.log('r.data', r.data);

					$('#ot_client_name').text(r.data[0].nomcliente);

					$('#ot_ejecutivo').val(r.data[0].ejecutivo);
					$('#ot_producto').val(r.data[0].tipo);
					$('#ot_contrato').val(r.data[0].nroContrato + ' / ' + r.data[0].ndocs);
					$('#ot_fecha_c').val(moment(r.data[0].fecha).format('DD-MM-YYYY'));
					$('#ot_tasa_o').val(r.data[0].tasa_op);

					$('#ot_mon_doc').val(r.data[0].mon_doc);
					$('#ot_mon_ant').val(r.data[0].mon_ant);
					$('#ot_dif_precio').val(r.data[0].dif_precio);
					$('#ot_comision').val(r.data[0].comision);
					$('#ot_iva').val('');

					$('#ot_impto').val(r.data[0].impto);
					$('#ot_gastos').val(r.data[0].gastos);
					$('#ot_mon_oper').val('');
					$('#ot_aplicacion').val(r.data[0].aplicacion);
					$('#ot_mon_gir').val(r.data[0].mon_gir);
				})
				.catch(function(err) {
					console.log('err.code', err.code);
					console.log('err.message', err.message);
					console.log('err.stack', err.stack);
		
			});

			const url_ind_apl = urlSp11IndApl(row.idcliente, row.contrato);

			console.log('url_ind_apl', url_ind_apl);
			axios.get(url_ind_apl)
				.then(function(r) {
					console.log('indpal', r.data);

					$('#ot_apli_doc').val();
					$('#ot_apli_pro').val();
					$('#ot_apli_cta').val();
					$('#ot_apli_cta').val();
					$('#ot_apli_prote').val();
				})
				.catch(function(err) {
					console.log('err.code', err.code);
					console.log('err.message', err.message);
					console.log('err.stack', err.stack);
		
			});

			$("#tbl_award_ind2").bootstrapTable("refresh", {
				url: urlSp11Ind2(row.idcliente, row.contrato),
			});

			$('#tblAwardRes').hide('slow');
			$('#tblAwardDet').hide('slow');
			$('#tblAwardDoc').hide('slow');
			$('#tblAwardDeC').show('slow');
		}
	});
})(jQuery);