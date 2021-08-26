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

	const emptyModal = () => modalContent.textContent = '';

	const fillModal = docFragment => modalContent.appendChild(docFragment);

	/**
	 * Hides the modal box
	 */
	const hide = () =>
	{
		emptyModal();
		modalState('add');
	}

	/**
	 * Reveals the modal box
	 * @param {DocumentFragment} nodes 
	 */
	const show = docFragment =>
	{
		emptyModal();
		fillModal(docFragment);
		modalState('remove');
	}

	const modalContent = component('div', {
		props: {
			id: 'modalContent',
		}
	});

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