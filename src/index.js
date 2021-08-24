import projects from './modules/projects';
import projectComponent from './components/projectComponent';
import component from './modules/component';
import modal from './modules/modal';
import getUniqueKey from './modules/getUniqueKey';
import './normalize.css';
import './style.css';

const testInfo1 = {
	title: 'test title',
	description: 'A descriptive description',
	dueDate: '08/07/21',
	priority: 1,
};

const projectContainer = document.querySelector('#projectContainer');

const getNodes = () => [
	component('h2', {
		props: {
			class: [
				'heading',
			],
		},
		children: [
			'Create new Project'
		]
	}),
	
]

const addProject = document.querySelector('#addProject');
addProject.addEventListener('click', () =>
{
	// modal.show(getNodes())
	const projectElem1 = projectComponent('Test');
	projectContainer.append(projectElem1);
})

// projectElem1.querySelector('.todos').append(todoComponent( testInfo1 ))
