/*global define*/
'use strict';
define( [], function () {

	var rangeMin = {
		ref: "props.rangeMin",
		label: "Lower Value",
		type: "number",
		expression: "optional",
		defaultValue: 0,
		show: true
	};

	var rangeMax = {
		ref: "props.rangeMax",
		label: "Upper Value",
		type: "number",
		expression: "optional",
		defaultValue: 100,
		show: true
	};

	var sliderStep = {
		ref: "props.step",
		label: "Step",
		type: "number",
		expression: "optional",
		defaultValue: 1,
		show: true
	};

	var varMin = {
		ref: "props.varMin",
		label: "Variable for Lower Value",
		type: "string"
	};

	var varMax = {
		ref: "props.varMax",
		label: "Variable for Upper Value",
		type: "string"
	};

	var orientation = {
		ref: "props.orientation",
		label: "Orientation",
		type: "string",
		component: "dropdown",
		default: "horizontal",
		options: [
			{
				value: "horizontal",
				label: "Horizontal"
			},
			{
				value: "vertical",
				label: "Vertical"
			},
			{
				value: "vertical left",
				label: "Vertical left"
			},
			{
				value: "vertical right",
				label: "Vertical right"
			}
		]
	};

	var pinHandle = {
		ref: "props.pinHandle",
		type: "string",
		component: "radiobuttons",
		label: "Activated handles",
		options: [
			{
				value: "",
				label: "Allow min & max"
			},
			{
				value: "min",
				label: "Allow only max"
			},
			{
				value: "max",
				label: "Allow only min"
			}
		]
	};

	var preventEqualMinMax = {
		ref: "props.preventEqualMinMax",
		type: "boolean",
		label: "Prevent min to be equal max",
		defaultValue: true
	};

	var showValues = {
		ref: "props.showValues",
		type: "boolean",
		label: "Show values",
		defaultValue: true
	};

	var moveValuesWithHandles = {
		ref: "props.moveValuesWithHandles",
		type: "boolean",
		label: "Move values with handles",
		defaultValue: false,
		show: function ( data ) {
			return data.showValues;
		}
	};

	// ****************************************************************************************
	// Property Panel definition
	// ****************************************************************************************

	var settings = {
		uses: "settings",
		items: {
			rangeSettings: {
				type: "items",
				label: "Slider: Range",
				items: {
					sliderStep: sliderStep,
					rangeMin: rangeMin,
					rangeMax: rangeMax,
					varMin: varMin,
					varMax: varMax,
					orientation: orientation,
					preventEqualMinMax: preventEqualMinMax,
					pinHandle: pinHandle,
					showValues: showValues,
					moveValuesWithHandles: moveValuesWithHandles
				}
			}
		}
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			settings: settings

		}
	};

} );