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
function urlSp11docTable(rut, date_ini, date_end) {
	let url = '/award/api/sp_11_doc/?';

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
		url: null,
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

	$("#tbl_award_det").bootstrapTable({
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
		url: null,
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

	$("#tbl_award_doc").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				searchable: true,
				class: 'text-nowrap',
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
				field: "fvcmto",
				title: "Fvcmto",
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
				title: "Días Cob.",
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
				title: "Iva Com",
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
				title: "Monto a Girar",
				align: 'right',
				searchable: true,
				formatter: function(value, row, index) {
                    return numeral(value).format("0,000[.]0");
                },
			},
		],
		url: null,
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

    $("#btn-ot-search").click(function(e) {
		e.preventDefault();
		
		if($('input:radio[name=ot_op1]:checked').val() === 'ot_opt_res') {
			$('#tblAwardRes').collapse('show');
			$('#tblAwardDet').collapse('hide');
			$('#tblAwardDoc').collapse('hide');

			const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const rut = $.formatRut($("#ot_nro").val(), false);
			const nro_client = rut.substring(0, rut.length -2 );
	
			$("#tbl_award_res").bootstrapTable("refresh", {
				url: urlSp11resTable(nro_client, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ot_op1]:checked').val() === 'ot_opt_det') {
			$('#tblAwardRes').collapse('hide');
			$('#tblAwardDet').collapse('show');
			$('#tblAwardDoc').collapse('hide');

			const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const rut = $.formatRut($("#ot_nro").val(), false);
			const nro_client = rut.substring(0, rut.length -2 );

			$("#tbl_award_det").bootstrapTable("refresh", {
				url: urlSp11detTable(nro_client, dt_ini, dt_end),
			});
		} else if($('input:radio[name=ot_op1]:checked').val() === 'ot_opt_doc') {
			const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const rut = $.formatRut($("#ot_nro").val(), false);
			const nro_client = rut.substring(0, rut.length -2 );

			$("#tbl_award_doc").bootstrapTable("refresh", {
				url: urlSp11docTable(nro_client, dt_ini, dt_end),
			});

			$('#tblAwardRes').collapse('hide');
			$('#tblAwardDet').collapse('hide');
			$('#tblAwardDoc').collapse('show');
		} else if($('input:radio[name=ot_op1]:checked').val() === 'ot_opt_ind'){
			$('#tblAwardRes').collapse('hide');
			$('#tblAwardDet').collapse('hide');
			$('#tblAwardDoc').collapse('hide');
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

	$("#tbl_award_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {			
			const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_award_det").bootstrapTable("refresh", {
				url: urlSp11detTable(nro_client, dt_ini, dt_end),
			});

			$('#tblAwardRes').collapse('hide');
			$('#tblAwardDet').collapse('show');
			$('#tblAwardDoc').collapse('hide');
		}
	});

	$("#tbl_award_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {
			console.log('doc.field', field);
			console.log('doc.row', row);

			const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const rut = $.formatRut($("#ot_nro").val(), false);
			const nro_client = row.idcliente;

			$("#tbl_award_doc").bootstrapTable("refresh", {
				url: urlSp11docTable(nro_client, dt_ini, dt_end),
			});

			$('#tblAwardRes').collapse('hide');
			$('#tblAwardDet').collapse('hide');
			$('#tblAwardDoc').collapse('show');
		}
	});
})(jQuery);