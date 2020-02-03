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

(function($) {
	"use strict";
	
	$('#ot_nro').rut({ formatOn: 'keyup', ignoreControlKeys: false, validateOn: 'keyup' });
	$("#ot_nro").rut().on('rutInvalido', function(e) {
		$('#ot_nro').addClass('is-invalid');
	});
	$("#ot_nro").rut().on('rutValido', function(e, rut, dv) {
		$('#ot_nro').removeClass('is-invalid');
	});

    const date_now = moment().startOf("day");

    const date_end = moment().startOf("day");

    const date_ini = moment().add(-6, 'M');

    console.log('date_ini', date_ini.format('DD-MM-YYYY'));
    
    
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

    console.log('ot_op2', $('input:radio[name=ot_op2]:checked').val());
    $('#ot_opt_op2').hide();

    $('input:radio[name=ot_op2]').click(function(e){
        if($('input:radio[name=ot_op2]:checked').val() === 'ot_opt_per') {
            $('#ot_opt_op2').show();
        } else {
            $('#ot_opt_op2').hide();
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
		url: urlSp11resTable(null, null, null),
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

        console.log('#btn-ot-search', $('#reservation').val());

        const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
        const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
        const __url = `/award/api/sp_11_res/${dt_ini}/${dt_end}`;

        $("#tbl_award_res").bootstrapTable("refresh", {
            url: urlSp11resTable($.formatRut($("#ot_nro").val(), false), dt_ini, dt_end),
        });
	});

	$("#tbl_award_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {
			console.log('field', field);
			console.log('row', row);
		}
	});
})(jQuery);