import component from "../modules/component";
import getUniqueKey from "../modules/getUniqueKey";

// Code taken from/based on here: https://codepen.io/alireza82/pen/eYWaqLZ

const inputComponentMaker = ({ label, maxlength = 25 }) =>
{
	const uniqueKey = getUniqueKey();

	const mainComponent = component('div', {
		props: {
			class: [
				'inputContainer'
			],
		}
	})

	const inputEl = component('input', {
		props: {
			maxlength: maxlength,
			type: 'text',
			autocomplete: 'off',
			spellcheck: false,
			id: uniqueKey
		}
	})

	const labelElem = component('label', {
		props: {
			class: [
				'placeholder'
			],
			for: uniqueKey,
		},
		children: [
			label
		]
	})

	labelElem.addEventListener('click', () =>
	{
		inputEl.focus();
	})

	inputEl.addEventListener('blur', () =>
	{
		if (inputEl.value != '')
		{
			labelElem.classList.add('inputHasText');;
		} else
		{
			labelElem.classList.remove('inputHasText');
		}
	})

	inputEl.addEventListener('focus', () => labelElem.classList.add('inputFocused'))
	inputEl.addEventListener('blur', () => labelElem.classList.remove('inputFocused'))

	mainComponent.append(inputEl, labelElem);
	return {
		elem: mainComponent,
		val: () => inputEl.value,
	};
}

export default inputComponentMaker;