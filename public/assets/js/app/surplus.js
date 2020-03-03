function urlSp14resTable(rut, date_ini, date_end) {
	let url = '/surplus/api/sp_14_res/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'sp_op2', 'sp_opt_per')}`;

	return url;
}
function urlSp14detTable(rut, date_ini, date_end) {
	let url = '/surplus/api/sp_14_det/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'sp_op2', 'sp_opt_per')}`;

	return url;
}
function urlSp14docTable(rut, contrato, date_ini, date_end) {
	let url = '/surplus/api/sp_14_doc/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}
	if(contrato) {
		url = `${url}&contrato=${contrato}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'sp_op2', 'sp_opt_per')}`;

	return url;
}
function urlSp14aboTable(rut, date_ini, date_end) {
	let url = '/surplus/api/sp_14_abo/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'sp_op2', 'sp_opt_per')}`;

	return url;
}
function urlSp14carTable(rut, date_ini, date_end) {
	let url = '/surplus/api/sp_14_car/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'sp_op2', 'sp_opt_per')}`;

	return url;
}

(function($) {
	"use strict";

	__exportOptionsTable.worksheetName = 'Excedentes';
	
    const date_now = moment().startOf("day");

    const date_end = moment().startOf("day");

	const date_ini = moment().add(-3, 'M');
     
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

    $("#tbl_sp_res").bootstrapTable({
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

	$("#tbl_sp_det").bootstrapTable({
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
				field: "fecha",
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

	$("#tbl_sp_doc").bootstrapTable({
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
				searchable: true,
			},
			
			{
				field: "contrato",
				title: "Contrato",
				searchable: true,
				sortable: true,
				formatter: function(value, row, index) {
					return `<a href="#" class="badge badge-secondary"><strong>${value}</strong></a>`;
				}
			},
			{
				field: "f_otorg",
				title: "Fch Ot",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				formatter: __dateFormatTable,
			},
			{
				field: "tipo",
				title: "Tipo",
				class: 'text-nowrap',
				searchable: true
            },
            {
				field: "docto",
				title: "Docto",
				sortable: true,
				searchable: true,
			},
			{
				field: "f_vcmto",
				title: "Fch Vcto",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				formatter: __dateFormatTable,
			},
			{
				field: "mondoc",
				title: "Mon Doc",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "monant",
				title: "Mon Ant",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "monrec",
				title: "Mon Rec",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "capamort",
				title: "Cap Amort",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "intmora",
				title: "Int Mora",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "intdev",
				title: "Int Dev",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "reajuste",
				title: "Reajuste",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "saldo",
				title: "Saldo",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "excedente",
				title: "Excedente",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "aplic",
				title: "Aplic",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "operacion",
				title: "Operacion",
                sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
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

	$("#tbl_sp_abo").bootstrapTable({
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
				title: "Nombre",
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
				searchable: true,
			},
			{
				field: "contrato",
				title: "Contrato",
				searchable: true,
				sortable: true
			},
			{
				field: "f_otorg",
				title: "Fch Ot.",
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
			},
			{
				field: "tipo",
				title: "Tipo",
				searchable: true,
				sortable: true
			},
			{
				field: "docto",
				title: "Docto",
				searchable: true,
				sortable: true
			},
			{
				field: "f_vcmto",
				title: "Fch Vcto",
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
			},
			{
				field: "f_pago",
				title: "Fch Pago",
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
			},
			{
				field: "quienpaga",
				title: "Quien Paga",
				searchable: true,
				sortable: true
			},
			{
				field: "formpago",
				title: "Form Pago",
				searchable: true,
				sortable: true
			},
			{
				field: "mondcto",
				title: "Mon Dcto",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "monant",
				title: "Mon Ant",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "monrec",
				title: "Mon Rec",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "capamort",
				title: "Cap Amort",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "int_mora",
				title: "Int Mora",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "int_dev",
				title: "Int Dev",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "reajuste",
				title: "Reajuste",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "saldo",
				title: "Saldo",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "excgen",
				title: "Excgen",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "aplic",
				title: "Aplic",
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
			},
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
	$("#tbl_sp_car").bootstrapTable({
		columns: [
			{
				field: "concepto",
				title: "Concepto",
				searchable: true,
				class: 'text-nowrap'
			},
			{
				field: "iddeudor",
				title: "R.U.T. Deudor",
				searchable: true,
				class: 'text-nowrap',
				formatter: __rutDeudorFormatTable,
			},
			{
				field: "nomdeudor",
				title: "Nombre Deudor",
				searchable: true,
				class: 'text-nowrap',
			},
			{
				field: "docto",
				title: "Docto",
				searchable: true,
			},
			{
				field: "monto",
				title: "Monto",
				searchable: true,
				formatter: __numeralFormatTable,
            },
            {
				field: "cargo",
				title: "Cargo",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "abono",
				title: "Abono",
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
			},
			{
				field: "fecha",
				title: "Fecha",
				sortable: true,
				searchable: true,
				formatter: __dateFormatTable,
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

    $("#btn-sp-search").click(function(e) {
		e.preventDefault();
		
		if($('input:radio[name=sp_op1]:checked').val() === 'sp_opt_res') {
			$('#tblSpRes').show('slow');
			$('#tblSpDet').hide('slow');
			$('#tblSpDoc').hide('slow');
			$('#tblSpAbo').hide('slow');
			$('#tblSpCar').hide('slow');

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
	
			$("#tbl_sp_res").bootstrapTable("refresh", {
				url: urlSp14resTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=sp_op1]:checked').val() === 'sp_opt_doc') {
			$('#tblSpRes').hide('slow');
			$('#tblSpDet').hide('slow');
			$('#tblSpDoc').show('slow');
			$('#tblSpAbo').hide('slow');
			$('#tblSpCar').hide('slow');

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_sp_doc").bootstrapTable("refresh", {
				url: urlSp14docTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=sp_op1]:checked').val() === 'sp_opt_abo'){
			$('#tblSpRes').hide('slow');
			$('#tblSpDet').hide('slow');
			$('#tblSpDoc').hide('slow');
			$('#tblSpAbo').show('slow');
			$('#tblSpCar').hide('slow');

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_sp_abo").bootstrapTable("refresh", {
				url: urlSp14aboTable(0, dt_ini, dt_end),
			});
		} else if($('input:radio[name=sp_op1]:checked').val() === 'sp_opt_car'){
			$('#tblSpRes').hide('slow');
			$('#tblSpDet').hide('slow');
			$('#tblSpDoc').hide('slow');
			$('#tblSpAbo').hide('slow');
			$('#tblSpCar').show('slow');

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

			$("#tbl_sp_car").bootstrapTable("refresh", {
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
		$('#tblSpRes').hide('slow');
		$("#tbl_sp_res").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblSpDet').hide('slow');
		$("#tbl_sp_det").bootstrapTable("refresh", {
            url: [],
        });
		$('#tblSpDoc').hide('slow');
		$("#tbl_sp_doc").bootstrapTable("refresh", {
            url: [],
		});
		$('#tblSpAbo').hide('slow');
		$("#tbl_sp_abo").bootstrapTable("refresh", {
            url: [],
		});
		$('#tblSpCar').hide('slow');
		$("#tbl_sp_car").bootstrapTable("refresh", {
            url: [],
        });
	});

	$("#tbl_sp_res").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contratos') {			
			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;

			$("#tbl_sp_det").bootstrapTable("refresh", {
				url: urlSp14detTable(nro_client, dt_ini, dt_end),
			});

			$('#tblSpRes').hide('slow');
			$('#tblSpDet').show('slow');
			$('#tblSpDoc').hide('slow');
			$('#tblSpAbo').hide('slow');
			$('#tblSpCar').hide('slow');
		}
	});

	$("#tbl_sp_det").on('click-cell.bs.table', function(e, field, value, row, $element) {
		if(field === 'contrato') {
			console.log('doc.field', field);
			console.log('doc.row', row);

			const dt_ini = $("#sp_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
			const dt_end = $("#sp_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");
			const nro_client = row.idcliente;
			const nro_contrato = row.contrato;

			$("#tbl_sp_doc").bootstrapTable("refresh", {
				url: urlSp14docTable(nro_client, nro_contrato, dt_ini, dt_end),
			});

			$('#tblSpRes').hide('slow');
			$('#tblSpDet').hide('slow');
			$('#tblSpDoc').show('slow');
			$('#tblSpAbo').hide('slow');
			$('#tblSpCar').hide('slow');
		}
	});

	$("#btn_sp_bk_res").click(function(e){
		e.preventDefault();

		$("#tbl_sp_res").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblSpRes').hide('slow');
	});

	$("#btn_sp_bk_det").click(function(e){
		e.preventDefault();

		$("#tbl_sp_det").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblSpDet').hide('slow');
		$('#tblSpRes').show('slow');
	});

	$("#btn_sp_bk_doc").click(function(e){
		e.preventDefault();

		$("#tbl_sp_doc").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblSpDoc').hide('slow');
		$('#tblSpDet').show('slow');
	});
})(jQuery);