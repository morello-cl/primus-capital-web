"use strict";

const __exportTypesTable = ["json", "xml", "csv", "txt", "excel"];

const __exportOptionsTable = {
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
	worksheetName: "Informe"
};


