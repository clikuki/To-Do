import component from '../modules/component';
import todoComponent from './todoComponent';
import inputComponent from './inputWrapper';
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
			console.log(todoInfo.dueDate);

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
					'Create a new todo'
				]
			})

			const titleInput = inputComponent('Title', 'value', component('input', {
				props: {
					maxlength: 25,
				}
			}));

			const descInput = inputComponent('Description', 'value', component('textarea', {
				props: {
					class: [
						'descTextArea',
						'noResize'
					]
				},
			}))

			const dateInput = inputComponent('Due Date', 'valueAsDate', component('input', {
				props: {
					type: 'date'
				},
			}))

			const priorityInput = inputComponent('Priority', 'value', component('select', {
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
			}) )
			
			const submitBtn = component('button', {
				props: {
					id: 'submitBtn',
					onclick: () => addProject(projectElem, todosContainer, {
						title: titleInput.val(),
						description: descInput.val(),
						dueDate: dateInput.val(),
						priority: priorityInput.val(),
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
					priorityInput.elem,
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