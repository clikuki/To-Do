import getUniqueKey from "./getUniqueKey";

const getIndexFromKey = (array, key) =>
{
	if (typeof key !== 'string') throw new Error('Key must be a string');
	const index = array.findIndex(item => item.key === key);
	if (index === -1) throw new Error('Item not found');

	return index;
}

const removeAtIndex = (array, index) => array.splice(index, index + 1);

const todoMethods = (() =>
{
	const get =  (() =>
	{
		const deepCopy = array =>
		{
			const newArr = [];

			for (const obj of array)
			{
				const newObj = {};
				for (const [key, val] of Object.entries(obj))
				{
					newObj[key] = val;
				}

				newArr.push(newObj);
			}

			return newArr;
		}

		return todoList => deepCopy(todoList);
	})()

	const add = (() =>
	{
		const reqKeys = {
			title: String,
			description: String,
			dueDate: Date, 
			priority: Number,
		}

		const priorityRange = {
			min: 1,
			max: 3,
		}

		const valCheck = todoInfo =>
		{
			const checksArray = [
				todoInfo.title.length <= 0,
				todoInfo.priority < priorityRange.min,
				todoInfo.priority > priorityRange.max,
			]

			for(const check of checksArray)
			{
				if(check) return false;
			}

			return true;
		}

		const keyCheck = todoInfo =>
		{
			try
			{
				let numOfKeys = 0;
	
				for (const [key, val] of Object.entries(todoInfo))
				{
					const validKey = Object.keys(reqKeys).includes(key);
					const correctType = val.constructor === reqKeys[key];

					if(validKey && correctType) ++numOfKeys;
					else return false;
				}
	
				if(numOfKeys !== Object.keys(reqKeys).length) return false;
	
				return true;
			}
			catch
			{
				return false;
			}
		}

		return (todoList, todoInfo) =>
		{
			if (typeof todoInfo !== 'object')
			{
				throw new Error('TodoInfo must be an object');
			}

			if (!keyCheck(todoInfo))
			{
				throw new Error('Invalid or missing key/s');
			}

			if(!valCheck(todoInfo))
			{
				throw new Error('Invalid values');
			}

			const todoObj = {
				key: getUniqueKey(),
				completed: false,
				...todoInfo,
			};

			todoList.push(todoObj);
			return todoObj;
		}
	})()

	const remove = (todoList, key) =>
	{
		const todoIndex = getIndexFromKey(todoList, key);
		return removeAtIndex(todoList, todoIndex);
	}

	const edit = (() =>
	{
		const editProps = (obj, editObj) =>
		{
			for (const [key, val] of Object.entries(editObj))
			{
				if ({}.hasOwnProperty.call(obj, key))
				{
					obj[key] = val;
				}
			}
		}

		return (todoList, key, editObj) =>
		{
			const todoIndex = getIndexFromKey(todoList, key);
			editProps(todoList[todoIndex], editObj);
		}
	})()

	return {
		get,
		add,
		remove,
		edit,
	}
})()

const projectMethods = (() =>
{
	const projectArray = [];

	const get = (() =>
	{
		const dupe = (obj) => Object.fromEntries(Object.entries(obj));

		return (key) =>
		{
			if(typeof key !== 'string')
			{
				return projectArray.map(project => dupe(project));
			}
			else
			{
				const projectIndex = getIndexFromKey(projectArray, key)
				return projectArray[projectIndex];
			}
		}
	})();

	const add = (projectName = undefined) =>
	{
		if (typeof projectName !== 'string') throw new TypeError('Name must be a string');
		if (projectName === '') throw new Error('Name must not be an empty string');

		const todoList = [];
		const project = {
			projectName,
			key: getUniqueKey(),
			todos: {
				get: () => todoMethods.get(todoList),
				add: todoInfo => todoMethods.add(todoList, todoInfo),
				remove: key => todoMethods.remove(todoList, key),
				edit: (key, editObj) => todoMethods.edit(todoList, key, editObj),
			},
		}

		projectArray.push(project);
		return project;
	}

	const remove = (key) =>
	{
		const projectIndex = getIndexFromKey(projectArray, key);
		return removeAtIndex(projectArray, projectIndex);
	}

	const changeName = (() =>
	{
		return (key, newName) =>
		{
			if(typeof newName !== 'string') return;

			const projectIndex = getIndexFromKey(projectArray, key);
			projectArray[projectIndex].projectName = newName;
		};
	})()

	return {
		get,
		add,
		remove,
		changeName,
	}
})()

export default projectMethods;
