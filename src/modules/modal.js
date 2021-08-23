import component from './component';

const modal = (() =>
{
	const bodyElem = document.querySelector('body');
	const mainElem = document.querySelector('main');

	const modalState = operation =>
	{
		const classSwitch = (elem, operation, className) => 
		{
			elem.classList[operation](className);
		}

		classSwitch(modalBg, operation, 'invis');

		if(operation === 'add') operation = 'remove';
		else operation = 'add';

		classSwitch(mainElem, operation, 'stopScroll')
	}

	const fillModal = nodes =>
	{
		modalContent.textContent = '';
		modalContent.append(...nodes);
	}

	/**
	 * Hides the modal box
	 */
	const hide = () => modalState('add');

	/**
	 * Reveals the modal box
	 * @param {Array<HTMLElement>} nodes 
	 */
	const show = nodes =>
	{
		fillModal(nodes);
		modalState('remove');
	}

	const modalContent = component('div');

	const modalCloseBtn = component('button', {
		props: {
			id: 'modalCloseBtn',
			onclick: hide,
		},
	})
	
	const modalBox = component('div', {
		props: {
			id: 'modal',
		},
		children: [
			modalCloseBtn,
			modalContent,
		]
	});

	const modalBg = component('div', {
		props: {
			id: 'modalBg',
			class: [
				'invis'
			]
		},
		children: [
			modalBox
		]
	});

	bodyElem.append(modalBg);

	return {
		show,
		hide,
	}
})()

export default modal;