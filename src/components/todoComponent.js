import component from '../modules/component';
import inputWrapper from './inputWrapper';
import modal from '../modules/modal';
import project from '../modules/projects';
import edit from '../assets/edit_48x48.png';
import remove from '../assets/delete_48x48.png';

const todoComponent = (() =>
{
	const toggleTodoState = (todoElem, statusDisplayElem, editBtn, clickedElem) =>
	{
		if(clickedElem === editBtn) return;

		const currStatus = statusDisplayElem.textContent.toLowerCase();

		if(currStatus === 'complete') statusDisplayElem.textContent = 'Incomplete';
		else statusDisplayElem.textContent = 'Complete';
		todoElem.classList.toggle('completed');
	}
	
	const parseDate = (dateObj) =>
	{
		const day = dateObj.getDate();
		const month = dateObj.getMonth() + 1;
		const year = dateObj.getFullYear();

		return `${day}/${month}/${year}`
	}

	const removeTodo = (() =>
	{
		const removeFromStorage = (projKey, todoKey) =>
		{
			const projObj = project.get(projKey);
			projObj.todos.remove(todoKey)
		}

		const removeFromDOM = (todoElem) =>
		{
			todoElem.remove();
		}

		return (todoElem, projKey, todoKey) =>
		{
			removeFromStorage(projKey, todoKey);
			removeFromDOM(todoElem);
		}
	})()

	const editTodoCB = (() =>
	{
		const editTodo = (() =>
		{
			const editStorage = (projKey, todoKey, todoInfo) =>
			{
				const projObj = project.get(projKey);
				projObj.todos.edit(todoKey, todoInfo);
			}

			/**
			 * @param {HTMLElement} projectElem 
			 * @param {HTMLElement} name 
			 * @param {HTMLElement} date 
			 * @param {Object} todoInfo 
			 */
			const editElem = (projectElem, name, date, todoInfo) =>
			{
				name.textContent = todoInfo.title;
				date.textContent = parseDate(todoInfo.dueDate);
				projectElem.setAttribute('data-priority', todoInfo.priority);
			}

			return (projectElem, name, date, projKey, todoKey, todoInfo) =>
			{
				try
				{
					editStorage(projKey, todoKey, todoInfo);	
					editElem(projectElem, name, date, todoInfo);
					modal.hide();
				}
				catch (e)
				{
					if(e.message === 'Invalid value/s')
					{
						alert('Invalid values! ')
					}
					else throw e;
				}
			}
		})()

		const getNodes = (projectElem, name, date, todoInfo, projKey, todoKey) =>
		{
			const nodeContainer = new DocumentFragment();
		
			const header = component('h2', {
				props: {
					class: [
						'heading',
						'noSideMargin',
					]
				},
				children: [
					'Edit todo info'
				]
			})

			const titleInput = inputWrapper('Title', component('input', {
				props: {
					maxlength: 25,
					value: todoInfo.title,
				}
			}));

			const descInput = inputWrapper('Description', component('textarea', {
				props: {
					class: [
						'descTextArea',
						'noResize'
					],
				},
			}))

			const dateInput = inputWrapper('Due Date', component('input', {
				props: {
					type: 'date',
					valueAsDate: todoInfo.dueDate,
				},
			}))

			const priorityInput = (() =>
			{
				const optionMaker = (value, text) => component('option', {
					props: {
						value,
					},
					children: [
						text
					]
				})

				const inputElem = component('select', {
					children: [
						optionMaker(1, 'High'),
						optionMaker(2, 'Medium'),
						optionMaker(3, 'Low'),
					]
				})

				return inputWrapper('Priority', inputElem)
			})()

			// Setting it in function doesn't work
			descInput.elem.querySelector('textarea').value = todoInfo.description;
			dateInput.elem.querySelector('input').valueAsDate = todoInfo.dueDate;
			priorityInput.elem.querySelector('select').value = todoInfo.priority;
			
			const submitBtn = component('button', {
				props: {
					id: 'todoSubmitBtn',
					onclick: () => editTodo(projectElem, name, date, projKey, todoKey, {
						title: titleInput.inputElem.value,
						description: descInput.inputElem.value,
						dueDate: dateInput.inputElem.valueAsDate,
						priority: +priorityInput.inputElem.value,
					}),
				},
				children: [
					'Edit',
				]
			});

			const submitBtnContainer = component('div', {
				props: {
					class: [
						'centerDiv',
						'flexGrow'
					],
				},
				children: [
					submitBtn,
				]
			})

			const leftSide = component('div', {
				props: {
					class: [
						'verticalFlex',
						'flexGrow',
					]
				},
				children: [
					titleInput.elem,
					descInput.elem,
				]
			})

			const rightSide = component('div', {
				props: {
					class: [
						'verticalFlex',
						'flexGrow',
					],
					id: 'inputSubmitContainer',
				},
				children: [
					dateInput.elem,
					priorityInput.elem,
					submitBtnContainer,
				]
			})

			const inputSubmitContainer = component('div', {
				props: {
					class: [
						'flex',
					],
				},
				children: [
					leftSide,
					rightSide,
				]
			})

			nodeContainer.append( header, inputSubmitContainer );
			return nodeContainer;
		}

		return (projectElem, name, date, todoInfo, projKey, todoKey) =>
		{
			modal.show(getNodes(projectElem, name, date, todoInfo, projKey, todoKey));
		}
	})()

	/**
	 * @param {Object} todoInfo
	 * @param {String} todoInfo.title
	 * @param {String} todoInfo.description
	 * @param {String} todoInfo.dueDate
	 * @param {Number} todoInfo. priority
	 * @returns {HTMLElement} Returns a todo component
	 */
	return (todoInfo, projKey, todoKey) =>
	{
		const mainComponent = component('div', {
			props: {
				class: [
					'todoItem'
				],
				onclick: (e) => toggleTodoState(mainComponent, status, editBtn, e.target),
				'data-priority': todoInfo.priority,
				'data-key': todoKey,
			}
		})
	
		const name = component('h3', {
			children: [
				todoInfo.title
			],
			props: {
				class: [
					'name'
				]
			}
		})

		const status = component('span', {
			children: [
				'Incomplete'
			],
			props: {
				class: [
					'status'
				]
			}
		})
	
		const date = component('span', {
			children: [
				parseDate(todoInfo.dueDate)
			],
			props: {
				class: [
					'date'
				]
			}
		})

		const removeBtn = component('img', {
			props: {
				src: remove,
				onclick: () => removeTodo(mainComponent, projKey, todoKey)
			}
		})
		
		const editBtn = component('img', {
			props: {
				src: edit,
				onclick: () => editTodoCB(mainComponent, name, date, todoInfo, projKey, todoKey),
			}
		})

		const btnContainer = component('div', {
			children: [
				removeBtn,
				editBtn,
			]
		})
	
		mainComponent.append( name, status, date, btnContainer );
		return mainComponent;
	}
})()

export default todoComponent;