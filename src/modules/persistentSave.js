import project from './projects';
import projectComponent from '../components/projectComponent';
import todoComponent from '../components/todoComponent';

const key = 'projectsArray';

// For testing
window.get = () => localStorage.getItem(key);
window.del = () => localStorage.removeItem(key);
window.project = project;

const load = (projectContainer) =>
{
	const projArray = JSON.parse(localStorage.getItem(key));

	if(projArray)
	{
		for(const projItem of projArray)
		{
			const projObj = project.add(projItem.name);
			const projElem = projectComponent(projItem.name, projObj.key);

			if(projItem.todos.length > 0)
			{
				projElem.classList.remove('empty');

				const todosContainer = projElem.querySelector('.todos');

				for(let todoInfo of projItem.todos)
				{
					todoInfo = {
						...todoInfo,
						dueDate: new Date(todoInfo.dueDate),
					}

					const todoKey = projObj.todos.add(todoInfo).key;
					const todoElem = todoComponent(todoInfo, projObj.key, todoKey);
					todosContainer.append(todoElem);
				}
			}

			projectContainer.append(projElem);
		}
	}
}

const save = () =>
{
	const projArray = project.get().map(projectItem => ({
			name: projectItem.projectName,
			todos: projectItem.todos.get().map(todoItem => ({
				completed: todoItem.completed,
				title: todoItem.title,
				description: todoItem.description,
				dueDate: todoItem.dueDate,
				priority: todoItem.priority,
			})),
		}));

	localStorage.setItem(key, JSON.stringify(projArray));
}

const methods = {
	load,
	save,
}

export default methods;