import projects from './modules/projects';
import projectComponent from './components/projectComponent';
import todoComponent from './components/todoComponent';
import './normalize.css';
import './style.css';

const testInfo1 = {
	title: 'test title',
	description: 'A descriptive description',
	dueDate: '08/07/21',
	priority: 1,
};

const projectContainer = document.querySelector('#projectContainer');

const addProject = document.querySelector('#addProject');
addProject.addEventListener('click', () =>
{
	const projectElem1 = projectComponent('Test');
	projectContainer.append(projectElem1);
})

// projectElem1.querySelector('.todos').append(todoComponent( testInfo1 ))
