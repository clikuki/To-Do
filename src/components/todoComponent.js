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

	const editTodo = (() =>
	{
		const getNodes = (name, date, todoInfo, projKey, todoKey) =>
		{
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
					/* onclick: () => addTodo(projectElem, todosContainer, {
						title: titleInput.val(),
						description: descInput.val(),
						dueDate: dateInput.val(),
						priority: +priorityInput.val(),
					}, key), */
				},
				children: [
					'Create',
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

			return [
				header,
				inputSubmitContainer,
			]
		}

		return (name, date, priorityLevel, projKey, todoKey) =>
		{
			modal.show(getNodes(name, date, priorityLevel, projKey, todoKey));
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
				onclick: () => editTodo(name, date, todoInfo, projKey, todoKey),
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