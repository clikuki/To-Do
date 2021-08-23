import component from '../modules/component';
import edit from '../assets/edit_48x48.png';

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

	/**
	 * @param {Object} todoInfo
	 * @param {String} todoInfo.title
	 * @param {String} todoInfo.description
	 * @param {String} todoInfo.dueDate
	 * @param {Number} todoInfo. priority
	 * @returns {HTMLElement} Returns a todo component
	 */
	return (todoInfo) =>
	{
		const mainComponent = component('div', {
			props: {
				class: [
					'todoItem'
				],
				onclick: (e) => toggleTodoState(mainComponent, status, editBtn, e.target),
				'data-priority': todoInfo.priority,
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
				todoInfo.dueDate
			],
			props: {
				class: [
					'date'
				]
			}
		})
		
		const editBtn = component('img', {
			props: {
				src: edit,
			}
		})
	
		mainComponent.append( name, status, date, editBtn );
		return mainComponent;
	}
})()

export default todoComponent;