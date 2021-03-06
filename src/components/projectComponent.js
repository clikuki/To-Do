import component from '../modules/component';
import todoComponent from './todoComponent';
import inputWrapper from './inputWrapper';
import { save } from '../modules/persistentSave';
import project from '../modules/projects';
import modal from '../modules/modal';
import arrow from '../assets/arrow.svg';
import add from '../assets/add_48x48.png';
import remove from '../assets/delete_48x48.png';

const headerComponent = (() =>
{
	const toggleTodoList = (projectElem, btnContainer, clickedElem) =>
	{
		if (clickedElem.parentElement !== btnContainer)
		{
			projectElem.classList.toggle('active');
		}
	}

	const addTodoCB = (() =>
	{
		const addTodo = (() =>
		{
			const errorObj = {
				'Invalid or missing key/s': 'Don\'t leave the date option empty!',
				'Invalid value/s': 'Don\'t leave the title option empty!',
			}

			const addToStorage = (projKey, todoInfo) =>
			{
				const projectObj = project.get(projKey);
				return projectObj.todos.add(todoInfo).key;
			}

			const appendToDOM = (projectElem, todosContainer, todoInfo, projKey, todoKey) =>
			{
				const todoElem = todoComponent(todoInfo, projKey, todoKey);
				todosContainer.append(todoElem);
				projectElem.classList.remove('empty');
			}

			return (projectElem, todosContainer, todoInfo, projKey) =>
			{
				try
				{
					// Add to storage and get key
					const todoKey = addToStorage(projKey, todoInfo);

					// Append to project todos
					appendToDOM(projectElem, todosContainer, todoInfo, projKey, todoKey);

					save();
					modal.hide();
				}
				catch (e)
				{
					const userMessage = errorObj[e.message];
					if(userMessage)
					{
						alert(userMessage)
					}
					else throw e;
				}
			}
		})()

		const getNodes = (projectElem, todosContainer, key) =>
		{
			const nodeContainer = new DocumentFragment();
		
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

			const titleInput = inputWrapper('Title', component('input', {
				props: {
					maxlength: 25,
				}
			}));

			const descInput = inputWrapper('Description', component('textarea', {
				props: {
					class: [
						'descTextArea',
						'noResize'
					]
				},
			}))

			const dateInput = inputWrapper('Due Date', component('input', {
				props: {
					type: 'date'
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
			
			const submitBtn = component('button', {
				props: {
					id: 'todoSubmitBtn',
					onclick: () => addTodo(projectElem, todosContainer, {
						title: titleInput.inputElem.value,
						description: descInput.inputElem.value,
						dueDate: dateInput.inputElem.valueAsDate,
						priority: +priorityInput.inputElem.value,
					}, key),
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

			nodeContainer.append( header, inputSubmitContainer )
			return nodeContainer;
		}

		return (projectElem, todosContainer, key) =>
		{
			modal.show(getNodes(projectElem, todosContainer, key));
		}
	})()

	const removeProject = (() =>
	{
		const removeFromStorage = (key) =>
		{
			project.remove(key);
		}
		
		const removeFromDOM = (projectElem) =>
		{
			projectElem.remove()
		}

		return (projectElem, key) =>
		{
			removeFromStorage(key);
			removeFromDOM(projectElem);
			save();
		}
	})()

	const clearCompletedTodos = (() =>
	{
		const getCompletedTodos = (todosContainer) =>
		{
			const elemArray = [...todosContainer.querySelectorAll('.completed')];
			const keyArray = elemArray.map(elem =>  elem.getAttribute('data-key'));

			return [elemArray, keyArray];
		}

		const removeFromStorage = (projKey, todoKeys) =>
		{
			const projObj = project.get(projKey);

			for(const key of todoKeys)
			{
				projObj.todos.remove(key);
			}
		}

		const removeElems = (projectElem, todosContainer, elemArray) =>
		{
			for(const elem of elemArray)
			{
				elem.remove();
			}

			if(todosContainer.children.length === 0)
			{
				projectElem.classList.add('empty');
			}
		}
		
		return (projectElem, todosContainer, projKey) =>
		{
			const [elemArray, keyArray] = getCompletedTodos(todosContainer);

			removeFromStorage(projKey, keyArray);
			removeElems(projectElem, todosContainer, elemArray);
			save();
		}
	})()

	return (name, projectElem, key, todosContainer) =>
	{
		const mainComponent = component('div', {
			props: {
				onclick: (e) => toggleTodoList(projectElem, btnContainer, e.target),
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

		const toggleTodosArrow = component('img', {
			props: {
				src: arrow,
				class: [
					'arrow',
					'noGray',
				],
			}
		})

		const clearCompleteTodosBtn = component('button', {
			props: {
				onclick: () => clearCompletedTodos(projectElem, todosContainer, key),
			},
			children: [
				'Clear completed To-Dos'
			],
		})

		const removeProjectBtn = component('img', {
			props: {
				src: remove,
				title: 'Remove project',
				onclick: () => removeProject(projectElem, key),
			}
		})

		const addTodoBtn = component('img', {
			props: {
				src: add,
				title: 'Add a todo',
				onclick: () => addTodoCB(projectElem, todosContainer, key),
			},
		})

		const btnContainer = component('div', {
			props: {
				class: [
					'projectBtns',
					'centerDiv',
				]
			},
			children: [
				clearCompleteTodosBtn,
				removeProjectBtn,
				addTodoBtn,
			]
		})

		mainComponent.append(toggleTodosArrow, projectName, btnContainer)
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