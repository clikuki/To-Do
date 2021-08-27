import project from './projects';
import projectComponent from '../components/projectComponent';
import todoComponent from '../components/todoComponent';

const key = 'projectsArray';

export const load = (projectContainer) =>
{
	const projArray = JSON.parse(localStorage.getItem(key));

	if(projArray)
	{
		const nodeContainer = new DocumentFragment();

		for(const projItem of projArray)
		{
			const projObj = project.add(projItem.name);
			const projElem = projectComponent(projItem.name, projObj.key);

			if(projItem.todos.length > 0)
			{
				projElem.classList.remove('empty');

				const todosContainer = projElem.querySelector('.todos');
				for(const todoInfo of projItem.todos)
				{
					todoInfo.dueDate = new Date(todoInfo.dueDate);

					const todoKey = projObj.todos.add(todoInfo).key;
					const todoElem = todoComponent(todoInfo, projObj.key, todoKey);
					todosContainer.append(todoElem);
				}
			}

			nodeContainer.append(projElem);
		}

		projectContainer.append(nodeContainer);
	}
}

export const save = () =>
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