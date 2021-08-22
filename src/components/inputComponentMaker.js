import component from "../modules/component";

const inputComponentMaker = ({ label, maxlength = 25 }) =>
{
	const mainComponent = component('div', {
		class: [
			'inputContainer'
		],
	})

	const inputEl = component('input', {
		maxlength: maxlength,
		type: 'text',
		autocomplete: 'off',
		spellcheck: false,
	})

	const labelElem = component('div', {
		class: [
			'placeholder'
		]
	}, [ label ])

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

	mainComponent.append(inputEl, labelElem);
	return {
		elem: mainComponent,
		val: () => inputEl.value,
	};
}

export default inputComponentMaker;