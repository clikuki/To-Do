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

			modal.hide();
			const todoElem = todoComponent(todoInfo);
			todosContainer.append(todoElem);
			projectElem.classList.remove('empty');
		}

		const getNodes = (projectElem, todosContainer) =>
		{
			const titleInput = inputComponent({ label: 'Title' });
			const descInput = inputComponent({ label: 'Description' });
			const dueDateInput = component('input', {
				props: {
					type: 'date'
				}
			});
			const priorityInput = inputComponent({ label: 'Priority' });

			const getInputVals = () => ({
				title: titleInput.val(),
				description: descInput.val(),
				dueDate: dueDateInput.valueAsDate,
				priority: +priorityInput.val(),
			})

			const submitBtn = component('button', {
				props: {
					onclick: () => addProject(projectElem, todosContainer, getInputVals()),
				},
				children: [
					'Create',
				]
			});

			return [
				component('h2', {
					props: {
						class: [
							'heading',
						],
					},
					children: [
						'Create a new project'
					]
				}),
				component('div', {
					props: {
						class: [
							'centerDiv',
							'verticalFlex',
						],
					},
					children: [
						titleInput.elem,
						component('span', {
							children: [
								'Due Date: ',
								dueDateInput,
							]
						}),
						priorityInput.elem,
						descInput.elem,
						submitBtn,
					]
				}),

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