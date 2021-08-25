import component from '../modules/component';
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