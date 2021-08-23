import component from "../modules/component";

/**
 * 
 * @param {Object} todoInfo - Info of the todo item
 * @param {String} todoInfo.title - Title of the todo item
 * @param {String} todoInfo.description - Description of the todo item
 * @param {String} todoInfo.dueDate - Deadline of todo item
 * @param {Number} todoInfo. priority - The priority of the todo item
 * @returns {HTMLElement} Returns a todo component
 */
const todoComponent = (todoInfo) =>
{
	const mainComponent = component('div', {
		props: {
			class: [
				'todoItem'
			],
			'data-priority': todoInfo.priority,
		}
	})

	const todoName = component('h3', {
		children: [
			todoInfo.title
		],
		props: {
			class: [
				'todoName'
			]
		}
	})

	mainComponent.append(todoName);
	return mainComponent;
}

export default todoComponent;