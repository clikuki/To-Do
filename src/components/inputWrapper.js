import component from "../modules/component";
import getUniqueKey from "../modules/getUniqueKey";

/**
 * @param {String} labelText 
 * @param {HTMLElement} inputElem 
 * @returns An input element wrapped with a div with a <label> element
 */
const inputWrapper = (labelText, valueGetterKey, inputElem) =>
{
	const id = inputElem.id || getUniqueKey();
	inputElem.id = id;

	const mainComponent = component('div', {
		props: {
			class: [
				'inputContainer'
			],
		},
	})

	const labelElem = component('label', {
		props: {
			for: id,
		},
		children: [
			`${labelText}: `
		]
	})

	mainComponent.append(labelElem, inputElem);
	return {
		elem: mainComponent,
		val: () => inputElem[valueGetterKey],
	};
}

export default inputWrapper;