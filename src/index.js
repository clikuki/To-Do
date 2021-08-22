import projects from './modules/projects';
import projectComponent from './components/projectComponent';
import './normalize.css';
import './style.css';

const testInfo1 = {
	title: 'test title',
	description: 'A descriptive description',
	dueDate: '08/07/21',
	priority: 1,
};

const projectContainer = document.querySelector('#projectContainer');

projectContainer.append(projectComponent('Test'));
