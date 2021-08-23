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

const projectElem = projectComponent('Test');

projectContainer.append(projectElem);
projectElem.querySelector('.todos').append(todoComponent( testInfo1 ))
