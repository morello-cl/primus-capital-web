function urlSp11resTable(rut, date_ini, date_end) {
	let url = '/award/api/sp_11_res/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ot_op2', 'ot_opt_per', -1)}`;

	return url;
}
function urlSp11detTable(rut, date_ini, date_end) {
	let url = '/award/api/sp_11_det/?';

	if(rut) {
		url = `${url}&rut=${rut}`;
	}

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ot_op2', 'ot_opt_per', -1)}`;

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

	url = `${url}${__addUrlDateTime(date_ini, date_end, 'ot_op2', 'ot_opt_per', -1)}`;

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
function urlSp11IndDep(rut, contrato) {
	let url = '/award/api/sp_11_inddep/?';

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

	__exportOptionsTable.worksheetName = 'Otorgamientos';

	let _originalOption = '';
	let _awardCliente = '';
	let _awardContrato = '';
	let _awardNRoot = '';
	
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

    const date_end = moment().startOf("day");

    const date_ini = moment().add(-6, 'M');
     
    $("#ot_date_ini").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		useCurrent: false,
		date: date_ini
    });
    
	$("#ot_date_end").datetimepicker({
		format: "DD-MM-YYYY",
		locale: "es",
		useCurrent: false,
		date: date_end,
		minDate: date_ini,
		maxDate: date_end
	});

	$('#btn_ot_date_ini').click(function(e){
		$('#ot_date_ini').data("DateTimePicker").toggle();
	});
	$('#btn_ot_date_end').click(function(e){
		$('#ot_date_end').data("DateTimePicker").toggle();
	});   
    $("#ot_date_ini").on("dp.change", function(e) {
		console.log('ini.e.date', e.date);
		$("#ot_date_end").data("DateTimePicker").minDate(e.date);
    });
    $("#ot_date_end").on("dp.change", function(e) {
		console.log('end.e.date', e.date);
		$("#ot_date_ini").data("DateTimePicker").maxDate(e.date);
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
				sortable: true,
				class: 'text-nowrap',
				formatter: __rutClientFormatTable,
				sorter: __sorterRutTable,
				searchFormatter: false
			},
			{
				field: "nomcliente",
				title: "Nombre Cliente",
				class: 'text-nowrap',
				sortable: true,
				searchable: true,
			},
			{
				field: "contratos",
				title: "Contratos",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: __linkTable
			},
			{
				field: "tasa_min",
				title: "Tasa Min",
				align: 'center',
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
				searchFormatter: false,
            },
            {
				field: "tasa_max",
				title: "Tasa Max",
				align: 'center',
				sortable: true,
				searchable: true,
				formatter: __numeralFormatTable,
				searchFormatter: false,
			},
			{
				field: "mon_doc",
				title: "Mon Doc",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "mont_ant",
				title: "Mon Ant",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "dif_precio",
				title: "Dif Precio",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "comision",
				title: "Comisión",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "iva",
				title: "I.V.A.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "gastos",
				title: "Gastos",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "impto",
				title: "Impto",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "mon_oper",
				title: "Mon Oper",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "apl",
				title: "Aplic",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "agirar",
				title: "A Giro",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
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
		theadClasses: 'thead-light'
	});

	$("#tbl_award_det").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __rutClientFormatTable,
				sorter: __sorterRutTable,
				searchFormatter: false,
			},
			{
				field: "nomcliente",
				title: "Nombre Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "contrato",
				title: "Contrato",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: __linkTable,
			},
			{
				field: "fotorgam",
				title: "Fecha",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				sorter: __sorterDateTable,
				formatter: __dateFormatTable,
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
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "mon_ant",
				title: "Mon Ant",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "dif_precio",
				title: "Dif Precio",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
            {
				field: "comision",
				title: "Comisión",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "iva",
				title: "I.V.A.",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "gastos",
				title: "Gastos",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "impto",
				title: "Impto",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "mon_gir",
				title: "Mon Oper",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "apl",
				title: "Aplic",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "agirar",
				title: "A Giro",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
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
		theadClasses: 'thead-light'
	});

	$("#tbl_award_doc").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				searchable: true,
				sortable: true,
				class: 'text-nowrap',
				formatter: __rutClientFormatTable,
				sorter: __sorterRutTable,
				searchFormatter: false,
			},
			{
				field: "nomcliente",
				title: "Nombre Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "contrato",
				title: "Contrato",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: __linkTable
			},
			{
				field: "iddeudor",
				title: "R.U.T. Deudor",
				searchable: true,
				sortable: true,
				class: 'text-nowrap',
				formatter: __rutDeudorFormatTable,
				searchFormatter: false,
			},
			{
				field: "nomdeudor",
				title: "Nombre Deudor",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "fotorgam",
				title: "Fch Ot",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
			},
			{
				field: "fvcmto",
				title: "Fch Vcto",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
			},
			{
				field: "tasa_doc",
				title: "Tasa",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "tipo",
				title: "Tipo",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "docto",
				title: "Docto",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "operacion",
				title: "Operación",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "dias_cob",
				title: "Días Prom",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "mondcto",
				title: "Mon dcto",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "monant",
				title: "Mon Ant",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "difprecio",
				title: "Dif Precio",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "comision",
				title: "Comisión",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "ivacom",
				title: "I.V.A.",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "gastos",
				title: "Gastos",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "impto",
				title: "Impto",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "montoagirar",
				title: "A Girar",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
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
		theadClasses: 'thead-light'
	});
	
	$("#tbl_award_ind2").bootstrapTable({
		columns: [
			{
				field: "iddeudor",
				title: "R.U.T. Deudor",
				searchable: true,
				sortable: true,
				class: 'text-nowrap',
				formatter: __rutDeudorFormatTable,
				sorter: __sorterRutTable,
				searchFormatter: false,
			},
			{
				field: "nomdeudor",
				title: "Nombre Deudor",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "docto",
				title: "Nro Docto",
				align: 'center',
				searchable: true,
				sortable: true,
				formatter: __numeralFormatTable,
				searchFormatter: false,
			},
			{
				field: "fvcmto",
				title: "Vencimiento",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
				formatter: __dateFormatTable,
				sorter: __sorterDateTable,
            },
            {
				field: "mondcto",
				title: "Monto Docto",
				align: 'center',
				sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "monant",
				title: "Anticipado",
				align: 'right',
				sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "saldoPrecio",
				title: "Saldo Precio",
				align: 'right',
				visible: false,
				sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "difpecio",
				title: "Dif Precio",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "comision",
				title: "Comisión",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "dias_cob",
				title: "Días Cob",
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "actpago",
				title: "actpago",
				visible: false,
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
            },
            {
				field: "operacion",
				title: "operacion",
				visible: false,
				align: 'right',
                sortable: true,
				searchable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
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
		theadClasses: 'thead-light'
	});

	$("#tbl_award_inddep").bootstrapTable({
		columns: [
			{
				field: "idcliente",
				title: "R.U.T. Cliente",
				searchable: true,
				sortable: true,
				class: 'text-nowrap',
				formatter: __rutClientFormatTable,
				sorter: __sorterRutTable,
				searchFormatter: false,
			},
			{
				field: "nomcliente",
				title: "Nombre Cliente",
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
			},
			{
				field: "monto",
				title: "Monto",
				align: 'right',
				searchable: true,
				sortable: true,
				formatter: __amountFormatTable,
				searchFormatter: false,
			},
			{
				field: "nombanco",
				title: "Banco",
				align: 'center',
				class: 'text-nowrap',
				searchable: true,
				sortable: true,
            },
            {
				field: "ctacteclie",
				title: "Cta. Cte.",
				align: 'center',
				class: 'text-nowrap',
				sortable: true,
				searchable: true,
			}
		],
		url: [],
		locale: "es-SP",
		clickToSelect: false,
		showRefresh: false,
		showColumns: false,
		exportDataType: "all",
		exportTypes: __exportTypesTable,
		exportOptions: __exportOptionsTable,
		search: false,
		searchAlign: "right",
		striped: true,
		pagination: true,
		pageNumber: 1,
		pageSize: 10,
		pageList: [20, 30, 40, 50],
		theadClasses: 'thead-light'
	});

	$("#btn_aw_bk_res").click(function(e){
		e.preventDefault();

		$("#tbl_award_res").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblAwardRes').hide('slow');
	});

	$("#btn_aw_bk_det").click(function(e){
		e.preventDefault();

		$("#tbl_award_det").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblAwardDet').hide('slow');

		if(_originalOption === 'ot_opt_res') {			
			$('#tblAwardRes').show('slow');
		}
	});

	$("#btn_aw_bk_doc").click(function(e){
		e.preventDefault();

		$("#tbl_award_doc").bootstrapTable("refresh", {
			url: [],
		});

		$('#tblAwardDoc').hide('slow');
		$('#tblAwardDet').show('slow');
	});

	$("#btn_aw_bk_dec").click(function(e){
		e.preventDefault();

		$('#tblAwardDeC').hide('slow');
		$('#tblAwardDoc').show('slow');
	});

    $("#btn-ot-search").click(function(e) {
		e.preventDefault();

		_originalOption = $('input:radio[name=ot_op1]:checked').val();
		
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
		e.preventDefault();

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
		e.preventDefault();

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
		e.preventDefault();

		if(field === 'contrato') {
			const url = urlSp11Ind1(row.idcliente, row.contrato);

			_awardCliente = row.idcliente;
			_awardContrato = row.contrato;

			console.log('url', url);
			axios.get(url)
				.then(function(r) {
					console.log('urlSp11Ind1.data', r.data);

					$('#ot_client_name').text(r.data[0].nomcliente);

					$('#ot_ejecutivo').val(r.data[0].ejecutivo);
					$('#ot_producto').val(r.data[0].tipo);
					$('#ot_contrato').val(r.data[0].nroContrato + ' / ' + r.data[0].ndocs);
					$('#ot_fecha_c').val(__dateFormat(r.data[0].fecha));
					$('#ot_tasa_o').val(r.data[0].tasa_op);

					$('#ot_mon_doc').val(numeral(r.data[0].mon_doc).format("$ 0,000[.]0"));
					$('#ot_mon_ant').val(numeral(r.data[0].mon_ant).format("$ 0,000[.]0"));
					$('#ot_dif_precio').val(numeral(r.data[0].dif_precio).format("$ 0,000[.]0"));
					$('#ot_comision').val(numeral(r.data[0].comision).format("$ 0,000[.]0"));
					$('#ot_iva').val(numeral(r.data[0].iva).format("$ 0,000[.]0"));

					$('#ot_impto').val(numeral(r.data[0].impto).format("$ 0,000[.]0"));
					$('#ot_gastos').val(numeral(r.data[0].gastos).format("$ 0,000[.]0"));
					$('#ot_mon_oper').val(numeral(r.data[0].montoOperacion).format("$ 0,000[.]0"));
					$('#ot_aplicacion').val(numeral(r.data[0].aplicacion).format("$ 0,000[.]0"));
					$('#btn_aw_agirar').text(numeral(r.data[0].aGirar).format("$ 0,000[.]0"));

					if(parseInt(r.data[0].aGirar) > 0) {
						$('#btn_aw_agirar').attr('type', 'button');
						$('#btn_aw_agirar').attr('href', '#');
					} else {
						$('#btn_aw_agirar').removeAttr('type');
						$('#btn_aw_agirar').removeAttr('href');
					}
					
					// llenamos futuro modal de agirar
					$('#aw_cli').val(r.data[0].nomcliente);
					$('#aw_rut').val(_awardCliente);
					$('#aw_con').val(r.data[0].nroContrato);
					$('#aw_fec').val(__dateFormat(r.data[0].fecha));

					const url_ind_apl = urlSp11IndApl(_awardCliente, r.data[0].nroot);
					_awardNRoot = r.data[0].nroot;

					console.log('url_ind_apl', url_ind_apl);
					axios.get(url_ind_apl)
						.then(function(r) {
							console.log('urlSp11IndApl.data', r.data);
		
							if(Array.isArray(r.data) && r.data.length) {
								$('#ot_apli_doc').text(numeral(r.data[0].aplicacionadocto).format("$ 0,000[.]0"));
								$('#ot_apli_pro').val(numeral(r.data[0].aplprorroga).format("$ 0,000[.]0"));
								$('#ot_apli_cta').val(numeral(r.data[0].aplcxc).format("$ 0,000[.]0"));
								$('#ot_apli_prote').val(numeral(r.data[0].aplprotesto).format("$ 0,000[.]0"));

								if(parseInt(r.data[0].aplicacionadocto) > 0) {
									const dt_ini = $("#ot_date_ini").data("DateTimePicker").date().format("YYYY-MM-DD");
									const dt_end = $("#ot_date_end").data("DateTimePicker").date().format("YYYY-MM-DD");

									$('#ot_apli_doc').attr('href', `/cancellations?page=abono&rut=${_awardCliente}&contrato=${_awardContrato}&${__addUrlDateTime(dt_ini, dt_end, 'ot_op2', 'ot_opt_per', -1)}`);
								} else {
									$('#ot_apli_doc').removeAttr('href');
								}

							} else {
								$('#ot_apli_doc').val('');
								$('#ot_apli_pro').val('');
								$('#ot_apli_cta').val('');
								$('#ot_apli_cta').val('');
								$('#ot_apli_prote').val('');
							}
						})
						.catch(function(err) {
							console.log('err.code', err.code);
							console.log('err.message', err.message);
							console.log('err.stack', err.stack);
				
					});
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

	$("#modalDeposito").on('shown.bs.modal', function(e){

		$("#tbl_award_inddep").bootstrapTable("refresh", {
			url: urlSp11IndDep(_awardCliente, _awardNRoot),
		});
	});

	$('#modalDeposito').on('hidden.bs.modal', function(e){
		$("#tbl_award_inddep").bootstrapTable("refresh", {
			url: [],
		});
	});
})(jQuery);