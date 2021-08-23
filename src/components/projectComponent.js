import component from '../modules/component';
import getUniqueKey from '../modules/getUniqueKey';
import arrow from '../assets/arrow.svg';
import add from '../assets/add_48x48.png';

const headerComponent = (() =>
{
	const toggleTodo = (projectElem) => projectElem.classList.toggle('active');

	return (name, projectElem) =>
	{
		const mainComponent = component('div', {
			props: {
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
				onclick: () => toggleTodo(projectElem),
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
				src: add
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
				// 'empty',
			],
			'data-key': getUniqueKey(),
		}
	})

	const header = headerComponent(name, mainComponent);

	const todosContainer = component('div', {
		props: {
			class: [
				'todos',
			],
		}
	});

	mainComponent.append(header, todosContainer);
	return mainComponent;
}

export default projectComponent;