import component from '../modules/component';
import todoComponent from './todoComponent';
import inputComponent from './inputComponent';
import modal from '../modules/modal';
import getUniqueKey from '../modules/getUniqueKey';
import arrow from '../assets/arrow.svg';
import add from '../assets/add_48x48.png';

const headerComponent = (() =>
{
	const toggleTodoList = (projectElem, addTodoBtn, clickedElem) =>
	{
		if (clickedElem === addTodoBtn) return;
		projectElem.classList.toggle('active');
	}

	const addTodos = (() =>
	{
		const addProject = (projectElem, todosContainer, todoInfo) =>
		{
			// Todo: add checks before adding todo item
			console.log(todoInfo);
			window.info = todoInfo;

			modal.hide();
			const todoElem = todoComponent(todoInfo);
			todosContainer.append(todoElem);
			projectElem.classList.remove('empty');
		}

		const getNodes = (projectElem, todosContainer) =>
		{
			const header = component('h2', {
				props: {
					class: [
						'heading',
					],
				},
				children: [
					'Create a new project'
				]
			})

			const titleInput = inputComponent('Title', 'input', 'value');

			const descInput = inputComponent('Description', 'textarea', 'value', {
				class: [
					'descTextArea',
					'noResize'
				]
			})

			const dateInput = inputComponent('Due Date', 'input', 'valueAsDate', {
				type: 'date'
			})

			const priorityInput = component('select', {
						props: {
							id: 'priority',
						},
						children: [
							component('option', {
								props: {
									value: 1,
								},
								children: [
									'High'
								]
							}),
							component('option', {
								props: {
									value: 2,
								},
								children: [
									'Medium'
								]
							}),
							component('option', {
								props: {
									value: 3,
								},
								children: [
									'Low'
								]
							}),
						]
					}) 

			const priorityInputContainer = component('div', {
				props: {
					class: [
						'inputContainer'
					]
				},
				children: [
					component('label', {
						props: {
							for: 'priority',
						},
						children: [
							'Priority:',
						],
					}),
					priorityInput,
				]
			})
			
			const submitBtn = component('button', {
				props: {
					id: 'submitBtn',
					onclick: () => addProject(projectElem, todosContainer, {
						title: titleInput.val(),
						description: descInput.val(),
						dueDate: dateInput.val(),
						priority: priorityInput.value,
					}),
				},
				children: [
					'Create',
				]
			});

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
					priorityInputContainer,
					submitBtn,
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

		return (projectElem, todosContainer) =>
		{
			modal.show(getNodes(projectElem, todosContainer));
		}
	})()

	const testInfo = {
		title: 'test title',
		description: 'A descriptive description',
		dueDate: '08/07/21',
		priority: 1,
	};

	return (name, projectElem, todosContainer) =>
	{
		const mainComponent = component('div', {
			props: {
				onclick: (e) => toggleTodoList(projectElem, addTodoBtn, e.target),
				class: [
					'projectHeader',
					'heading',
				]
			}
		})

		const projectName = component('h2', {
			props: {
				class: [
					'projectName',
				],
			},
			children: [
				name
			]
		})

		const toggleTodosBtn = component('img', {
			props: {
				src: arrow,
				class: [
					'arrow',
					'noGray',
				],
			}
		})

		const addTodoBtn = component('img', {
			props: {
				src: add,
				onclick: () => addTodos(projectElem, todosContainer),
			},
		})

		mainComponent.append(toggleTodosBtn, projectName, addTodoBtn)
		return mainComponent;
	}
})()

const projectComponent = (name) =>
{
	const mainComponent = component('div', {
		props: {
			class: [
				'project',
				'active',
				'empty',
			],
			'data-key': getUniqueKey(),
		}
	})

	const todosContainer = component('div', {
		props: {
			class: [
				'todos',
			],
		}
	});

	const header = headerComponent(name, mainComponent, todosContainer);

	mainComponent.append(header, todosContainer);
	return mainComponent;
}

export default projectComponent;