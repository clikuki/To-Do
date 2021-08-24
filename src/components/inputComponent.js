import component from "../modules/component";
import getUniqueKey from "../modules/getUniqueKey";

const inputComponentMaker = (label, tag, valueName, options = {}) =>
{
	const uniqueKey = getUniqueKey();

	const mainComponent = component('div', {
		props: {
			class: [
				'inputContainer'
			],
		},
	})

	const inputEl = component(tag, {
		props: {
			...options,
			autocomplete: 'off',
			spellcheck: false,
			id: uniqueKey
		}
	})

	const labelElem = component('label', {
		props: {
			for: uniqueKey,
		},
		children: [
			`${label}: `
		]
	})

	mainComponent.append(labelElem, inputEl);
	return {
		elem: mainComponent,
		val: () => inputEl[valueName],
	};
}

export default inputComponentMaker;