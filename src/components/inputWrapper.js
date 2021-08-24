import component from "../modules/component";
import getUniqueKey from "../modules/getUniqueKey";

/**
 * @param {String} labelText 
 * @param {HTMLElement} inputElem 
 * @returns An input element wrapped with a div with a <label> element
 */
const inputWrapper = (labelText, valueGetterKey, inputElem, containerProps = {}) =>
{
	const id = inputElem.id || getUniqueKey();
	inputElem.id = id;

	const mainComponentClasses = [
		'inputContainer'
	]
	
	if(containerProps.class)
	{
		for(const className of containerProps.class)
		{
			mainComponentClasses.push(className);
		}
	}

	const mainComponent = component('div', {
		props: {
			...containerProps,
			class: mainComponentClasses,
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