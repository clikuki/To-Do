import projects from './modules/projects';
import projectComponent from './components/projectComponent';
import component from './modules/component';
import modal from './modules/modal';
import inputWrapper from './components/inputWrapper';
import './normalize.css';
import './style.css';

const projectContainer = document.querySelector('#projectContainer');

const addProject = (name) =>
{
	modal.hide();
	const projectElem = projectComponent(name);
	projectContainer.append(projectElem);
}

const getNodes = () =>
{
	const nameInput = inputWrapper('Project name', 'value', component('input', {
		props: {
			type: 'text',
		}
	}), {
		id: 'projectNameInput',
	})

	const submitBtn = component('button', {
		props: {
			id: 'projectSubmitBtn',
			onclick: () => addProject(nameInput.val()),
		},
		children: [
			'Create'
		]
	})

	return [
		component('h2', {
			props: {
				class: [
					'heading',
					'noSideMargin',
				],
			},
			children: [
				'Create new Project'
			]
		}),
		component('div', {
			props: {
				class: [
					'centerDiv'
				]
			},
			children: [
				nameInput.elem,
				submitBtn,
			]
		}),
	]
}

const addProjectBtn = document.querySelector('#addProject');
addProjectBtn.addEventListener('click', () => modal.show(getNodes()))

// projectElem1.querySelector('.todos').append(todoComponent( testInfo1 ))
