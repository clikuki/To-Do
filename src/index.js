import project from './modules/projects';
import projectComponent from './components/projectComponent';
import component from './modules/component';
import modal from './modules/modal';
import inputWrapper from './components/inputWrapper';
import './normalize.css';
import './style.css';

const projectContainer = document.querySelector('#projectContainer');

const addProject = (name) =>
{
	try
	{
		// Add to storage and get key
		const projectKey = project.add(name).key;
	
		// Append element to projectContainer
		const projectElem = projectComponent(name, projectKey);
		projectContainer.append(projectElem);
		modal.hide();
	}
	catch (e)
	{
		if(e.message === 'Name must not be an empty string')
		{
			alert('Project name must not be an empty string!')
		}
		else throw e;
	}
}

const getNodes = () =>
{
	const nameInput = inputWrapper('Project name', component('input', {
		props: {
			type: 'text',
			id: 'projectNameInput',
		}
	}), {
		class: [
			'flexGrow'
		]
	})

	const submitBtn = component('button', {
		props: {
			id: 'projectSubmitBtn',
			onclick: () => addProject(nameInput.inputElem.value),
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

window.projects = project;

const addProjectBtn = document.querySelector('#addProject');
addProjectBtn.addEventListener('click', () => modal.show(getNodes()))

// projectElem1.querySelector('.todos').append(todoComponent( testInfo1 ))
