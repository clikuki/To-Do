const getIndexFromKey = (array, key) =>
{
	if(typeof key !== 'string') throw new Error('Invalid key: must be a string');
	const index = array.findIndex(todo => todo.key === key);
	if (index === -1) throw new Error('Invalid key: item not found');

	return index;
}

// main methods moved out to minimize duplication
const methods = {
	get: (() =>
	{
		const deepCopy = array =>
		{
			const newArr = [];

			for(const obj of array)
			{
				const newObj = {};
				for(const [key, val] of Object.entries(obj))
				{
					newObj[key] = val;
				}

				newArr.push(newObj);
			}

			return newArr;
		}
	
		return todoList => deepCopy(todoList);
	})(),

	add: (() =>
	{
		const getUniqueKey = (() =>
		{
			const getRandomInt = (min, max) =>
			{
				min = Math.ceil(min);
				max = Math.floor(max);
		
				const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
		
				return randomInt;
			}
		
			const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			const charsLen = chars.length;
			const keylen = {
				min: 10,
				max: 20,
			};
		
			return () =>
			{
				const randInt = getRandomInt(keylen.min, keylen.max);
				let result = '';
		
				for (let i = 0; i < randInt; i++)
				{
					result += chars.charAt(Math.floor(Math.random() * charsLen));
				}
		
				return result;
			}
		})()
	
		const hasReqKeys = todoInfo =>
		{
			for (const key of reqKeys)
			{
				const hasKey = {}.hasOwnProperty.call(todoInfo, key);
				if (!hasKey) return false;
			}
	
			return true;
		}
	
		const hasExtraKeys = todoInfo =>
		{
			for (const key of Object.keys(todoInfo))
			{
				const isValidKey = validKeys.includes(key);
				if (!isValidKey) return true;
			}
	
			return false;
		}
	
		const reqKeys = [
			'title', 'description', 'dueDate', 'priority',
		]
	
		const optionalKeys = [
			'notes', // 'checklist'
		]
	
		const validKeys = [].concat.call(reqKeys, optionalKeys);
	
		return (todoList, todoInfo) =>
		{
			if (typeof todoInfo !== 'object')
			{
				throw new Error('Invalid itemInfo: must be an object');
			}
	
			if (!hasReqKeys(todoInfo) || hasExtraKeys(todoInfo))
			{
				throw new Error('Invalid itemInfo: missing or invalid key/s');
			}
	
			todoList.push({
				key: getUniqueKey(),
				completed: false,
				...todoInfo,
			});
		}
	})(),

	remove: (() =>
	{
		const removeAtIndex = (array, index) => array.splice(index, index + 1);
	
		return (todoList, key) =>
		{
			const todoIndex = getIndexFromKey(todoList, key);
			removeAtIndex(todoList, todoIndex);
		}
	})(),

	edit: (() =>
	{
		const editProps = (obj, editObj) =>
		{
			for(const [key, val] of Object.entries(editObj))
			{
				if({}.hasOwnProperty.call(obj, key))
				{
					obj[key] = val;
				}
				else
				{
					throw new Error('Invalid editObj: must not have invalid keys');
				}
			}
		}
	
		return (todoList, key, editObj) =>
		{
			const todoIndex = getIndexFromKey(todoList, key);
			editProps(todoList[todoIndex], editObj);
		}
	})(),
}

const projectFactory = (projectInfo) =>
{
	const todoList = [];
	return {
		...projectInfo,
		todos: {
			get: () => methods.get(todoList),
			add: todoInfo => methods.add(todoList, todoInfo),
			remove: key => methods.remove(todoList, key),
			edit: (key, editObj) => methods.edit(todoList, key, editObj),
		},
	}
}

export default projectFactory;
