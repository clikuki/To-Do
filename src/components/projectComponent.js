import component from '../modules/component';
import todoComponent from './todoComponent';
import inputComponent from './inputWrapper';
import project from '../modules/projects';
import modal from '../modules/modal';
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
		const addTodo = (projectElem, todosContainer, todoInfo, projKey) =>
		{
			try
			{
				// Add to storage
				const projectObj = project.get(projKey);
				const todoKey = projectObj.todos.add(todoInfo).key;

				// Add to project todos
				const todoElem = todoComponent(todoInfo, todoKey);
				todosContainer.append(todoElem);
				projectElem.classList.remove('empty');
				modal.hide();
			}
			catch (e)
			{
				if(e.message === 'Invalid itemInfo: invalid or missing key/s')
				{
					alert('Don\'t leave the date option as null!')
				}
				else throw e;
			}
		}

		const getNodes = (projectElem, todosContainer, key) =>
		{
			const header = component('h2', {
				props: {
					class: [
						'heading',
						'noSideMargin',
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
					id: 'todoSubmitBtn',
					onclick: () => addTodo(projectElem, todosContainer, {
						title: titleInput.val(),
						description: descInput.val(),
						dueDate: dateInput.val(),
						priority: +priorityInput.val(),
					}, key),
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

		return (projectElem, todosContainer, key) =>
		{
			modal.show(getNodes(projectElem, todosContainer, key));
		}
	})()

	return (name, projectElem, key, todosContainer) =>
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
				onclick: () => addTodos(projectElem, todosContainer, key),
			},
		})

		mainComponent.append(toggleTodosBtn, projectName, addTodoBtn)
		return mainComponent;
	}
})()

const projectComponent = (name, key) =>
{
	const mainComponent = component('div', {
		props: {
			class: [
				'project',
				'active',
				'empty',
			],
			'data-key': key,
		}
	})

	const todosContainer = component('div', {
		props: {
			class: [
				'todos',
			],
		}
	});

	const header = headerComponent(name, mainComponent, key, todosContainer);

	mainComponent.append(header, todosContainer);
	return mainComponent;
}

export default projectComponent;