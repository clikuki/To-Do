/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/normalize.css":
/*!***************************!*\
  !*** ./src/normalize.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/inputWrapper.js":
/*!****************************************!*\
  !*** ./src/components/inputWrapper.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/component */ "./src/modules/component.js");
/* harmony import */ var _modules_getUniqueKey__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/getUniqueKey */ "./src/modules/getUniqueKey.js");



/**
 * @param {String} labelText 
 * @param {HTMLElement} inputElem 
 * @returns An input element wrapped with a div with a <label> element
 */
const inputWrapper = (labelText, inputElem, containerProps = {}) =>
{
	const id = inputElem.id || (0,_modules_getUniqueKey__WEBPACK_IMPORTED_MODULE_1__.default)();
	inputElem.id = id;

	const mainComponentClasses = [
		'inputContainer'
	]
	
	if(containerProps.class)
	{
		for(const className of containerProps.class)
		{
			mainComponentClasses.push(className);
		}
	}

	const mainComponent = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
		props: {
			...containerProps,
			class: mainComponentClasses,
		},
	})

	const labelElem = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('label', {
		props: {
			for: id,
		},
		children: [
			`${labelText}: `
		]
	})

	mainComponent.append(labelElem, inputElem);
	return {
		elem: mainComponent,
		inputElem,
	};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (inputWrapper);

/***/ }),

/***/ "./src/components/projectComponent.js":
/*!********************************************!*\
  !*** ./src/components/projectComponent.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/component */ "./src/modules/component.js");
/* harmony import */ var _todoComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoComponent */ "./src/components/todoComponent.js");
/* harmony import */ var _inputWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inputWrapper */ "./src/components/inputWrapper.js");
/* harmony import */ var _modules_persistentSave__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/persistentSave */ "./src/modules/persistentSave.js");
/* harmony import */ var _modules_projects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/projects */ "./src/modules/projects.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _assets_arrow_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/arrow.svg */ "./src/assets/arrow.svg");
/* harmony import */ var _assets_add_48x48_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/add_48x48.png */ "./src/assets/add_48x48.png");
/* harmony import */ var _assets_delete_48x48_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/delete_48x48.png */ "./src/assets/delete_48x48.png");










const headerComponent = (() =>
{
	const toggleTodoList = (projectElem, btnContainer, clickedElem) =>
	{
		if (clickedElem.parentElement !== btnContainer)
		{
			projectElem.classList.toggle('active');
		}
	}

	const addTodoCB = (() =>
	{
		const addTodo = (() =>
		{
			const errorObj = {
				'Invalid or missing key/s': 'Don\'t leave the date option empty!',
				'Invalid value/s': 'Don\'t leave the title option empty!',
			}

			const addToStorage = (projKey, todoInfo) =>
			{
				const projectObj = _modules_projects__WEBPACK_IMPORTED_MODULE_4__.default.get(projKey);
				return projectObj.todos.add(todoInfo).key;
			}

			const appendToDOM = (projectElem, todosContainer, todoInfo, projKey, todoKey) =>
			{
				const todoElem = (0,_todoComponent__WEBPACK_IMPORTED_MODULE_1__.default)(todoInfo, projKey, todoKey);
				todosContainer.append(todoElem);
				projectElem.classList.remove('empty');
			}

			return (projectElem, todosContainer, todoInfo, projKey) =>
			{
				try
				{
					// Add to storage and get key
					const todoKey = addToStorage(projKey, todoInfo);

					// Append to project todos
					appendToDOM(projectElem, todosContainer, todoInfo, projKey, todoKey);

					(0,_modules_persistentSave__WEBPACK_IMPORTED_MODULE_3__.save)();
					_modules_modal__WEBPACK_IMPORTED_MODULE_5__.default.hide();
				}
				catch (e)
				{
					const userMessage = errorObj[e.message];
					if(userMessage)
					{
						alert(userMessage)
					}
					else throw e;
				}
			}
		})()

		const getNodes = (projectElem, todosContainer, key) =>
		{
			const nodeContainer = new DocumentFragment();
		
			const header = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('h2', {
				props: {
					class: [
						'heading',
						'noSideMargin',
					],
				},
				children: [
					'Create a new todo'
				]
			})

			const titleInput = (0,_inputWrapper__WEBPACK_IMPORTED_MODULE_2__.default)('Title', (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('input', {
				props: {
					maxlength: 25,
				}
			}));

			const descInput = (0,_inputWrapper__WEBPACK_IMPORTED_MODULE_2__.default)('Description', (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('textarea', {
				props: {
					class: [
						'descTextArea',
						'noResize'
					]
				},
			}))

			const dateInput = (0,_inputWrapper__WEBPACK_IMPORTED_MODULE_2__.default)('Due Date', (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('input', {
				props: {
					type: 'date'
				},
			}))

			const priorityInput = (() =>
			{
				const optionMaker = (value, text) => (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('option', {
					props: {
						value,
					},
					children: [
						text
					]
				})

				const inputElem = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('select', {
					children: [
						optionMaker(1, 'High'),
						optionMaker(2, 'Medium'),
						optionMaker(3, 'Low'),
					]
				})

				return (0,_inputWrapper__WEBPACK_IMPORTED_MODULE_2__.default)('Priority', inputElem)
			})()
			
			const submitBtn = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('button', {
				props: {
					id: 'todoSubmitBtn',
					onclick: () => addTodo(projectElem, todosContainer, {
						title: titleInput.inputElem.value,
						description: descInput.inputElem.value,
						dueDate: dateInput.inputElem.valueAsDate,
						priority: +priorityInput.inputElem.value,
					}, key),
				},
				children: [
					'Create',
				]
			});

			const submitBtnContainer = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
				props: {
					class: [
						'centerDiv',
						'flexGrow'
					],
				},
				children: [
					submitBtn,
				]
			})

			const leftSide = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
				props: {
					class: [
						'verticalFlex',
						'flexGrow',
					]
				},
				children: [
					titleInput.elem,
					descInput.elem,
				]
			})

			const rightSide = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
				props: {
					class: [
						'verticalFlex',
						'flexGrow',
					],
					id: 'inputSubmitContainer',
				},
				children: [
					dateInput.elem,
					priorityInput.elem,
					submitBtnContainer,
				]
			})

			const inputSubmitContainer = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
				props: {
					class: [
						'flex',
					],
				},
				children: [
					leftSide,
					rightSide,
				]
			})

			nodeContainer.append( header, inputSubmitContainer )
			return nodeContainer;
		}

		return (projectElem, todosContainer, key) =>
		{
			_modules_modal__WEBPACK_IMPORTED_MODULE_5__.default.show(getNodes(projectElem, todosContainer, key));
		}
	})()

	const removeProject = (() =>
	{
		const removeFromStorage = (key) =>
		{
			_modules_projects__WEBPACK_IMPORTED_MODULE_4__.default.remove(key);
		}
		
		const removeFromDOM = (projectElem) =>
		{
			projectElem.remove()
		}

		return (projectElem, key) =>
		{
			removeFromStorage(key);
			removeFromDOM(projectElem);
			(0,_modules_persistentSave__WEBPACK_IMPORTED_MODULE_3__.save)();
		}
	})()

	const clearCompletedTodos = (() =>
	{
		const getCompletedTodos = (todosContainer) =>
		{
			const elemArray = [...todosContainer.querySelectorAll('.completed')];
			const keyArray = elemArray.map(elem =>  elem.getAttribute('data-key'));

			return [elemArray, keyArray];
		}

		const removeFromStorage = (projKey, todoKeys) =>
		{
			const projObj = _modules_projects__WEBPACK_IMPORTED_MODULE_4__.default.get(projKey);

			for(const key of todoKeys)
			{
				projObj.todos.remove(key);
			}
		}

		const removeElems = (projectElem, todosContainer, elemArray) =>
		{
			for(const elem of elemArray)
			{
				elem.remove();
			}

			if(todosContainer.children.length === 0)
			{
				projectElem.classList.add('empty');
			}
		}
		
		return (projectElem, todosContainer, projKey) =>
		{
			const [elemArray, keyArray] = getCompletedTodos(todosContainer);

			removeFromStorage(projKey, keyArray);
			removeElems(projectElem, todosContainer, elemArray);
			(0,_modules_persistentSave__WEBPACK_IMPORTED_MODULE_3__.save)();
		}
	})()

	return (name, projectElem, key, todosContainer) =>
	{
		const mainComponent = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
			props: {
				onclick: (e) => toggleTodoList(projectElem, btnContainer, e.target),
				class: [
					'projectHeader',
					'heading',
				]
			}
		})

		const projectName = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('h2', {
			props: {
				class: [
					'projectName',
				],
			},
			children: [
				name
			]
		})

		const toggleTodosArrow = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('img', {
			props: {
				src: _assets_arrow_svg__WEBPACK_IMPORTED_MODULE_6__,
				class: [
					'arrow',
					'noGray',
				],
			}
		})

		const clearCompleteTodosBtn = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('button', {
			props: {
				onclick: () => clearCompletedTodos(projectElem, todosContainer, key),
			},
			children: [
				'Clear completed To-Dos'
			],
		})

		const removeProjectBtn = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('img', {
			props: {
				src: _assets_delete_48x48_png__WEBPACK_IMPORTED_MODULE_8__,
				title: 'Remove project',
				onclick: () => removeProject(projectElem, key),
			}
		})

		const addTodoBtn = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('img', {
			props: {
				src: _assets_add_48x48_png__WEBPACK_IMPORTED_MODULE_7__,
				title: 'Add a todo',
				onclick: () => addTodoCB(projectElem, todosContainer, key),
			},
		})

		const btnContainer = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
			props: {
				class: [
					'projectBtns',
					'centerDiv',
				]
			},
			children: [
				clearCompleteTodosBtn,
				removeProjectBtn,
				addTodoBtn,
			]
		})

		mainComponent.append(toggleTodosArrow, projectName, btnContainer)
		return mainComponent;
	}
})()

const projectComponent = (name, key) =>
{
	const mainComponent = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
		props: {
			class: [
				'project',
				'active',
				'empty',
			],
			'data-key': key,
		}
	})

	const todosContainer = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
		props: {
			class: [
				'todos',
			],
		}
	});

	const header = headerComponent(name, mainComponent, key, todosContainer);

	mainComponent.append(header, todosContainer);
	return mainComponent;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectComponent);

/***/ }),

/***/ "./src/components/todoComponent.js":
/*!*****************************************!*\
  !*** ./src/components/todoComponent.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/component */ "./src/modules/component.js");
/* harmony import */ var _inputWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputWrapper */ "./src/components/inputWrapper.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_persistentSave__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/persistentSave */ "./src/modules/persistentSave.js");
/* harmony import */ var _modules_projects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/projects */ "./src/modules/projects.js");
/* harmony import */ var _assets_edit_48x48_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/edit_48x48.png */ "./src/assets/edit_48x48.png");
/* harmony import */ var _assets_delete_48x48_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/delete_48x48.png */ "./src/assets/delete_48x48.png");








const todoComponent = (() =>
{
	const toggleTodoState = (() =>
	{
		const editStorage = (projKey, todoKey) =>
		{
			const projObj = _modules_projects__WEBPACK_IMPORTED_MODULE_4__.default.get(projKey);
			const completeState = !projObj.todos.get(todoKey).completed;
			projObj.todos.edit(todoKey, { completed: completeState });
		}

		const editElem = (todoElem, statusDisplayElem) =>
		{
			const currStatus = statusDisplayElem.textContent.toLowerCase();
			if(currStatus === 'complete') statusDisplayElem.textContent = 'Incomplete';
			else statusDisplayElem.textContent = 'Complete';
			todoElem.classList.toggle('completed');
		}

		return (todoElem, statusDisplayElem, projKey, todoKey) =>
		{
			editStorage(projKey, todoKey);
			editElem(todoElem, statusDisplayElem);
			(0,_modules_persistentSave__WEBPACK_IMPORTED_MODULE_3__.save)();
		}
	})()
	
	const parseDate = (dateObj) =>
	{
		const day = dateObj.getDate();
		const month = dateObj.getMonth() + 1;
		const year = dateObj.getFullYear();

		return `${day}/${month}/${year}`
	}

	const removeTodo = (() =>
	{
		const removeFromStorage = (projKey, todoKey) =>
		{
			const projObj = _modules_projects__WEBPACK_IMPORTED_MODULE_4__.default.get(projKey);
			projObj.todos.remove(todoKey);
		}

		const getProjAndTodosContainer = (projKey) =>
		{
			const projectElem = document.querySelector(`[data-key='${projKey}']`);
			const todosContainer = projectElem.querySelector(`.todos`);

			return [projectElem, todosContainer];
		}

		const todoEmptyCheck = (projKey) =>
		{
			const [projectElem, todosContainer] = getProjAndTodosContainer(projKey);

			if(todosContainer.children.length === 0)
			{
				projectElem.classList.add('empty');
			}
		}

		const removeFromDOM = (todoElem, projKey) =>
		{
			todoElem.remove();
			todoEmptyCheck(projKey);
		}

		return (todoElem, projKey, todoKey) =>
		{
			removeFromStorage(projKey, todoKey);
			removeFromDOM(todoElem, projKey);
			(0,_modules_persistentSave__WEBPACK_IMPORTED_MODULE_3__.save)();
		}
	})()

	const editTodoCB = (() =>
	{
		const editTodo = (() =>
		{
			const editStorage = (projKey, todoKey, todoInfo) =>
			{
				const projObj = _modules_projects__WEBPACK_IMPORTED_MODULE_4__.default.get(projKey);
				projObj.todos.edit(todoKey, todoInfo);
			}

			/**
			 * @param {HTMLElement} projectElem 
			 * @param {HTMLElement} name 
			 * @param {HTMLElement} date 
			 * @param {Object} todoInfo 
			 */
			const editElem = (projectElem, name, date, todoInfo) =>
			{
				name.textContent = todoInfo.title;
				date.textContent = parseDate(todoInfo.dueDate);
				projectElem.setAttribute('data-priority', todoInfo.priority);
			}

			return (todoElem, nameElem, dateElem, projKey, todoKey, newTodoInfo) =>
			{
				try
				{
					editStorage(projKey, todoKey, newTodoInfo);	
					editElem(todoElem, nameElem, dateElem, newTodoInfo);
					(0,_modules_persistentSave__WEBPACK_IMPORTED_MODULE_3__.save)();
					_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default.hide();
				}
				catch (e)
				{
					if(e.message === 'Invalid value/s')
					{
						alert('Invalid values! ')
					}
					else throw e;
				}
			}
		})()

		const getNodes = (todoElem, nameElem, dateElem, todoInfo, projKey, todoKey) =>
		{
			const nodeContainer = new DocumentFragment();
		
			const header = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('h2', {
				props: {
					class: [
						'heading',
						'noSideMargin',
					]
				},
				children: [
					'Edit todo info'
				]
			})

			const titleInput = (0,_inputWrapper__WEBPACK_IMPORTED_MODULE_1__.default)('Title', (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('input', {
				props: {
					maxlength: 25,
					value: todoInfo.title,
				}
			}));

			const descInput = (0,_inputWrapper__WEBPACK_IMPORTED_MODULE_1__.default)('Description', (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('textarea', {
				props: {
					class: [
						'descTextArea',
						'noResize'
					],
				},
			}))

			const dateInput = (0,_inputWrapper__WEBPACK_IMPORTED_MODULE_1__.default)('Due Date', (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('input', {
				props: {
					type: 'date',
					valueAsDate: todoInfo.dueDate,
				},
			}))

			const priorityInput = (() =>
			{
				const optionMaker = (value, text) => (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('option', {
					props: {
						value,
					},
					children: [
						text
					]
				})

				const inputElem = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('select', {
					children: [
						optionMaker(1, 'High'),
						optionMaker(2, 'Medium'),
						optionMaker(3, 'Low'),
					]
				})

				return (0,_inputWrapper__WEBPACK_IMPORTED_MODULE_1__.default)('Priority', inputElem)
			})()

			// Setting it in function doesn't work
			descInput.elem.querySelector('textarea').value = todoInfo.description;
			dateInput.elem.querySelector('input').valueAsDate = todoInfo.dueDate;
			priorityInput.elem.querySelector('select').value = todoInfo.priority;
			
			const submitBtn = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('button', {
				props: {
					id: 'todoSubmitBtn',
					onclick: () => editTodo(todoElem, nameElem, dateElem, projKey, todoKey, {
						title: titleInput.inputElem.value,
						description: descInput.inputElem.value,
						dueDate: dateInput.inputElem.valueAsDate,
						priority: +priorityInput.inputElem.value,
					}),
				},
				children: [
					'Edit',
				]
			});

			const submitBtnContainer = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
				props: {
					class: [
						'centerDiv',
						'flexGrow'
					],
				},
				children: [
					submitBtn,
				]
			})

			const leftSide = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
				props: {
					class: [
						'verticalFlex',
						'flexGrow',
					]
				},
				children: [
					titleInput.elem,
					descInput.elem,
				]
			})

			const rightSide = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
				props: {
					class: [
						'verticalFlex',
						'flexGrow',
					],
					id: 'inputSubmitContainer',
				},
				children: [
					dateInput.elem,
					priorityInput.elem,
					submitBtnContainer,
				]
			})

			const inputSubmitContainer = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
				props: {
					class: [
						'flex',
					],
				},
				children: [
					leftSide,
					rightSide,
				]
			})

			nodeContainer.append( header, inputSubmitContainer );
			return nodeContainer;
		}

		return (todoElem, nameElem, dateElem, todoInfo, projKey, todoKey) =>
		{
			_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default.show(getNodes(todoElem, nameElem, dateElem, todoInfo, projKey, todoKey));
		}
	})()

	/**
	 * @param {Object} todoInfo
	 * @param {Boolean} todoInfo.completed
	 * @param {String} todoInfo.title
	 * @param {String} todoInfo.description
	 * @param {String} todoInfo.dueDate
	 * @param {Number} todoInfo. priority
	 * @returns {HTMLElement} Returns a todo component
	 */
	return (todoInfo, projKey, todoKey) =>
	{
		const mainComponent = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
			props: {
				class: [
					'todoItem'
				],
				onclick: (e) =>
				{
					if(![editBtn, removeBtn].includes(e.target))
					{
						toggleTodoState(mainComponent, status, projKey, todoKey)
					}
				},
				'data-priority': todoInfo.priority,
				'data-key': todoKey,
			}
		})

		if(todoInfo.completed) mainComponent.classList.add('completed');
	
		const name = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('h3', {
			children: [
				todoInfo.title
			],
			props: {
				class: [
					'name'
				]
			}
		})

		const status = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('span', {
			children: [
				todoInfo.completed ? 'Complete' : 'Incomplete',
			],
			props: {
				class: [
					'status'
				]
			}
		})
	
		const date = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('span', {
			children: [
				parseDate(todoInfo.dueDate)
			],
			props: {
				class: [
					'date'
				]
			}
		})

		const removeBtn = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('img', {
			props: {
				src: _assets_delete_48x48_png__WEBPACK_IMPORTED_MODULE_6__,
				onclick: () => removeTodo(mainComponent, projKey, todoKey)
			}
		})
		
		const editBtn = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('img', {
			props: {
				src: _assets_edit_48x48_png__WEBPACK_IMPORTED_MODULE_5__,
				onclick: () => editTodoCB(mainComponent, name, date, todoInfo, projKey, todoKey),
			}
		})

		const btnContainer = (0,_modules_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
			children: [
				removeBtn,
				editBtn,
			],
		})
	
		mainComponent.append( name, status, date, btnContainer );
		return mainComponent;
	}
})()

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todoComponent);

/***/ }),

/***/ "./src/modules/component.js":
/*!**********************************!*\
  !*** ./src/modules/component.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * 
 * @param {String} tag - The tag of the element
 * @param {Object} options - Options for the element
 * @param {Object} options.props - Properties of the element
 * @param {Array<HTMLElement>} options.children - An array of nodes
 * @returns {HTMLElement} Returns a node with the specifed tag
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((tag, { props = {}, children = [] } = {}) =>
{
	const element = document.createElement(tag);

	for(const [key, value] of Object.entries(props))
	{
		switch(key)
		{
			case 'style':
				for(const [style, value] of Object.entries(options.style))
				{
					element.style[style] = value;
				}
				break;

			case 'class':
				element.classList.add(...value);
				break;

			default:
				if(typeof value !== 'function') element.setAttribute(key, value);
				else element[key] = value;
				break;
		}
	}

	if(children && children.length > 0)
	{
		element.append(...children);
	}

	return element;
});


/***/ }),

/***/ "./src/modules/getUniqueKey.js":
/*!*************************************!*\
  !*** ./src/modules/getUniqueKey.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getRandomInt = (min, max) =>
{
	min = Math.ceil(min);
	max = Math.floor(max);

	const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

	return randomInt;
}

const getRandChar = () => chars.charAt(Math.floor(Math.random() * charsLen))

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charsLen = chars.length;
const keylen = {
	min: 10,
	max: 20,
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() =>
{
	const length = getRandomInt(keylen.min, keylen.max);
	const result = Array.from({ length }, () => getRandChar()).join('');

	return result;
});

/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/modules/component.js");


const modal = (() =>
{
	const bodyElem = document.querySelector('body');
	const mainElem = document.querySelector('main');

	const modalState = operation =>
	{
		const classSwitch = (elem, operation, className) => 
		{
			elem.classList[operation](className);
		}

		classSwitch(modalBg, operation, 'invis');

		if(operation === 'add') operation = 'remove';
		else operation = 'add';

		classSwitch(mainElem, operation, 'stopScroll')
	}

	const emptyModal = () => modalContent.textContent = '';

	const fillModal = docFragment => modalContent.appendChild(docFragment);

	/**
	 * Hides the modal box
	 */
	const hide = () =>
	{
		emptyModal();
		modalState('add');
	}

	/**
	 * Reveals the modal box
	 * @param {DocumentFragment} nodes 
	 */
	const show = docFragment =>
	{
		emptyModal();
		fillModal(docFragment);
		modalState('remove');
	}

	const modalContent = (0,_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
		props: {
			id: 'modalContent',
		}
	});

	const modalCloseBtn = (0,_component__WEBPACK_IMPORTED_MODULE_0__.default)('button', {
		props: {
			id: 'modalCloseBtn',
			onclick: hide,
		},
	})
	
	const modalBox = (0,_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
		props: {
			id: 'modal',
		},
		children: [
			modalCloseBtn,
			modalContent,
		]
	});

	const modalBg = (0,_component__WEBPACK_IMPORTED_MODULE_0__.default)('div', {
		props: {
			id: 'modalBg',
			class: [
				'invis'
			]
		},
		children: [
			modalBox
		]
	});

	bodyElem.append(modalBg);

	return {
		show,
		hide,
	}
})()

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./src/modules/persistentSave.js":
/*!***************************************!*\
  !*** ./src/modules/persistentSave.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "load": () => (/* binding */ load),
/* harmony export */   "save": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");
/* harmony import */ var _components_projectComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/projectComponent */ "./src/components/projectComponent.js");
/* harmony import */ var _components_todoComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/todoComponent */ "./src/components/todoComponent.js");




const key = 'projectsArray';

const load = (projectContainer) =>
{
	const projArray = JSON.parse(localStorage.getItem(key));

	if(projArray)
	{
		const nodeContainer = new DocumentFragment();

		for(const projItem of projArray)
		{
			const projObj = _projects__WEBPACK_IMPORTED_MODULE_0__.default.add(projItem.name);
			const projElem = (0,_components_projectComponent__WEBPACK_IMPORTED_MODULE_1__.default)(projItem.name, projObj.key);

			if(projItem.todos.length > 0)
			{
				projElem.classList.remove('empty');

				const todosContainer = projElem.querySelector('.todos');
				for(const todoInfo of projItem.todos)
				{
					todoInfo.dueDate = new Date(todoInfo.dueDate);

					const todoKey = projObj.todos.add(todoInfo).key;
					const todoElem = (0,_components_todoComponent__WEBPACK_IMPORTED_MODULE_2__.default)(todoInfo, projObj.key, todoKey);
					todosContainer.append(todoElem);
				}
			}

			nodeContainer.append(projElem);
		}

		projectContainer.append(nodeContainer);
	}
}

const save = () =>
{
	const projArray = _projects__WEBPACK_IMPORTED_MODULE_0__.default.get().map(projectItem => ({
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

/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getUniqueKey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getUniqueKey */ "./src/modules/getUniqueKey.js");


const getIndexFromKey = (array, key) =>
{
	if (typeof key !== 'string') throw new Error('Key must be a string');
	const index = array.findIndex(item => item.key === key);
	if (index === -1)
	{
		throw new Error('Item not found');
	}

	return index;
}

const removeAtIndex = (array, index) => array.splice(index, index + 1);

const todoMethods = (() =>
{
	const keyCheck = (() =>
	{
		const reqKeys = {
			completed: Boolean,
			title: String,
			description: String,
			dueDate: Date, 
			priority: Number,
		}

		return todoInfo =>
		{
			try
			{
				for (const [key, val] of Object.entries(todoInfo))
				{
					const validKey = Object.keys(reqKeys).includes(key);
					const correctType = val.constructor === reqKeys[key];
	
					if(!(validKey && correctType)) return false;
				}
	
				return true;
			}
			catch
			{
				return false;
			}
		}
	})()

	const valCheck = (() =>
	{
		const priorityRange = {
			min: 1,
			max: 3,
		}

		return todoInfo =>
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
	})() 

	const get = (() =>
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

		return (todoList, key) =>
		{
			if(key) {
				const todoIndex = getIndexFromKey(todoList, key);
				return todoList[todoIndex];
			}

			return	deepCopy(todoList);
		}
	})()

	const add =  (todoList, todoInfo) =>
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
			throw new Error('Invalid value/s');
		}

		const todoObj = {
			key: (0,_getUniqueKey__WEBPACK_IMPORTED_MODULE_0__.default)(),
			completed: false,
			...todoInfo,
		};

		todoList.push(todoObj);
		return todoObj;
	}

	const remove = (todoList, key) =>
	{
		const todoIndex = getIndexFromKey(todoList, key);
		return removeAtIndex(todoList, todoIndex);
	}

	const edit = (() =>
	{
		const editProps = (obj, editObj) =>
		{
			if(!keyCheck(editObj)) throw new TypeError('Invalid value/s');

			for (const [key, val] of Object.entries(editObj))
			{
				obj[key] = val;
			}
		}

		return (todoList, key, editObj) =>
		{
			const todoIndex = getIndexFromKey(todoList, key);
			editProps(todoList[todoIndex], editObj);
			return todoList[todoIndex];
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
			key: (0,_getUniqueKey__WEBPACK_IMPORTED_MODULE_0__.default)(),
			todos: {
				get: (key) => todoMethods.get(todoList, key),
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectMethods);


/***/ }),

/***/ "./src/assets/add_48x48.png":
/*!**********************************!*\
  !*** ./src/assets/add_48x48.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/add_48x48.png";

/***/ }),

/***/ "./src/assets/arrow.svg":
/*!******************************!*\
  !*** ./src/assets/arrow.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/arrow.svg";

/***/ }),

/***/ "./src/assets/delete_48x48.png":
/*!*************************************!*\
  !*** ./src/assets/delete_48x48.png ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/delete_48x48.png";

/***/ }),

/***/ "./src/assets/edit_48x48.png":
/*!***********************************!*\
  !*** ./src/assets/edit_48x48.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/edit_48x48.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/projects */ "./src/modules/projects.js");
/* harmony import */ var _components_projectComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/projectComponent */ "./src/components/projectComponent.js");
/* harmony import */ var _modules_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/component */ "./src/modules/component.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _components_inputWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/inputWrapper */ "./src/components/inputWrapper.js");
/* harmony import */ var _modules_persistentSave__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/persistentSave */ "./src/modules/persistentSave.js");
/* harmony import */ var _normalize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./normalize.css */ "./src/normalize.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.css */ "./src/style.css");









const projectContainer = document.querySelector('#projectContainer');
_modules_persistentSave__WEBPACK_IMPORTED_MODULE_5__.load(projectContainer);

const addProject = (name) =>
{
	try
	{
		// Add to storage and get key
		const projectKey = _modules_projects__WEBPACK_IMPORTED_MODULE_0__.default.add(name).key;
	
		// Append element to projectContainer
		const projectElem = (0,_components_projectComponent__WEBPACK_IMPORTED_MODULE_1__.default)(name, projectKey);
		projectContainer.append(projectElem);
		_modules_persistentSave__WEBPACK_IMPORTED_MODULE_5__.save();
		_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default.hide();
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
	const nodeContainer = new DocumentFragment();

	const header = (0,_modules_component__WEBPACK_IMPORTED_MODULE_2__.default)('h2', {
		props: {
			class: [
				'heading',
				'noSideMargin',
			],
		},
		children: [
			'Create new Project'
		]
	})

	const nameInput = (0,_components_inputWrapper__WEBPACK_IMPORTED_MODULE_4__.default)('Project name', (0,_modules_component__WEBPACK_IMPORTED_MODULE_2__.default)('input', {
		props: {
			type: 'text',
			id: 'projectNameInput',
		}
	}), {
		class: [
			'flexGrow'
		]
	})

	const submitBtn = (0,_modules_component__WEBPACK_IMPORTED_MODULE_2__.default)('button', {
		props: {
			id: 'projectSubmitBtn',
			onclick: () => addProject(nameInput.inputElem.value),
		},
		children: [
			'Create'
		]
	})

	const flexDiv = (0,_modules_component__WEBPACK_IMPORTED_MODULE_2__.default)('div', {
		props: {
			class: [
				'centerDiv'
			]
		},
		children: [
			nameInput.elem,
			submitBtn,
		]
	});

	nodeContainer.append( header, flexDiv );
	return nodeContainer;
}

const addProjectBtn = document.querySelector('#addProject');
addProjectBtn.addEventListener('click', () => _modules_modal__WEBPACK_IMPORTED_MODULE_3__.default.show(getNodes()))

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmeUM7QUFDb0I7QUFDakI7QUFDUjtBQUNpQjtBQUNEO0FBQzNCO0FBQ0o7O0FBRXJCO0FBQ0EseURBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwREFBVztBQUNoQztBQUNBO0FBQ0Esc0JBQXNCLHFFQUFnQjtBQUN0QztBQUNBLEVBQUUseURBQVk7QUFDZCxFQUFFLHdEQUFVO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQiwyREFBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsbUJBQW1CLGlFQUFZLGlCQUFpQiwyREFBUztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGLG1CQUFtQiwyREFBUztBQUM1QjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRixpQkFBaUIsMkRBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4Qyx3REFBVSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2svLi9zcmMvbm9ybWFsaXplLmNzcz9mYzU1Iiwid2VicGFjazovL3dlYnBhY2svLi9zcmMvc3R5bGUuY3NzP2UzMjAiLCJ3ZWJwYWNrOi8vd2VicGFjay8uL3NyYy9jb21wb25lbnRzL2lucHV0V3JhcHBlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLy4vc3JjL2NvbXBvbmVudHMvdG9kb0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLy4vc3JjL21vZHVsZXMvY29tcG9uZW50LmpzIiwid2VicGFjazovL3dlYnBhY2svLi9zcmMvbW9kdWxlcy9nZXRVbmlxdWVLZXkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay8uL3NyYy9tb2R1bGVzL21vZGFsLmpzIiwid2VicGFjazovL3dlYnBhY2svLi9zcmMvbW9kdWxlcy9wZXJzaXN0ZW50U2F2ZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLy4vc3JjL21vZHVsZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnBhY2svd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYnBhY2svLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IGNvbXBvbmVudCBmcm9tIFwiLi4vbW9kdWxlcy9jb21wb25lbnRcIjtcbmltcG9ydCBnZXRVbmlxdWVLZXkgZnJvbSBcIi4uL21vZHVsZXMvZ2V0VW5pcXVlS2V5XCI7XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsVGV4dCBcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGlucHV0RWxlbSBcbiAqIEByZXR1cm5zIEFuIGlucHV0IGVsZW1lbnQgd3JhcHBlZCB3aXRoIGEgZGl2IHdpdGggYSA8bGFiZWw+IGVsZW1lbnRcbiAqL1xuY29uc3QgaW5wdXRXcmFwcGVyID0gKGxhYmVsVGV4dCwgaW5wdXRFbGVtLCBjb250YWluZXJQcm9wcyA9IHt9KSA9Plxue1xuXHRjb25zdCBpZCA9IGlucHV0RWxlbS5pZCB8fCBnZXRVbmlxdWVLZXkoKTtcblx0aW5wdXRFbGVtLmlkID0gaWQ7XG5cblx0Y29uc3QgbWFpbkNvbXBvbmVudENsYXNzZXMgPSBbXG5cdFx0J2lucHV0Q29udGFpbmVyJ1xuXHRdXG5cdFxuXHRpZihjb250YWluZXJQcm9wcy5jbGFzcylcblx0e1xuXHRcdGZvcihjb25zdCBjbGFzc05hbWUgb2YgY29udGFpbmVyUHJvcHMuY2xhc3MpXG5cdFx0e1xuXHRcdFx0bWFpbkNvbXBvbmVudENsYXNzZXMucHVzaChjbGFzc05hbWUpO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IG1haW5Db21wb25lbnQgPSBjb21wb25lbnQoJ2RpdicsIHtcblx0XHRwcm9wczoge1xuXHRcdFx0Li4uY29udGFpbmVyUHJvcHMsXG5cdFx0XHRjbGFzczogbWFpbkNvbXBvbmVudENsYXNzZXMsXG5cdFx0fSxcblx0fSlcblxuXHRjb25zdCBsYWJlbEVsZW0gPSBjb21wb25lbnQoJ2xhYmVsJywge1xuXHRcdHByb3BzOiB7XG5cdFx0XHRmb3I6IGlkLFxuXHRcdH0sXG5cdFx0Y2hpbGRyZW46IFtcblx0XHRcdGAke2xhYmVsVGV4dH06IGBcblx0XHRdXG5cdH0pXG5cblx0bWFpbkNvbXBvbmVudC5hcHBlbmQobGFiZWxFbGVtLCBpbnB1dEVsZW0pO1xuXHRyZXR1cm4ge1xuXHRcdGVsZW06IG1haW5Db21wb25lbnQsXG5cdFx0aW5wdXRFbGVtLFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbnB1dFdyYXBwZXI7IiwiaW1wb3J0IGNvbXBvbmVudCBmcm9tICcuLi9tb2R1bGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgdG9kb0NvbXBvbmVudCBmcm9tICcuL3RvZG9Db21wb25lbnQnO1xuaW1wb3J0IGlucHV0V3JhcHBlciBmcm9tICcuL2lucHV0V3JhcHBlcic7XG5pbXBvcnQgeyBzYXZlIH0gZnJvbSAnLi4vbW9kdWxlcy9wZXJzaXN0ZW50U2F2ZSc7XG5pbXBvcnQgcHJvamVjdCBmcm9tICcuLi9tb2R1bGVzL3Byb2plY3RzJztcbmltcG9ydCBtb2RhbCBmcm9tICcuLi9tb2R1bGVzL21vZGFsJztcbmltcG9ydCBhcnJvdyBmcm9tICcuLi9hc3NldHMvYXJyb3cuc3ZnJztcbmltcG9ydCBhZGQgZnJvbSAnLi4vYXNzZXRzL2FkZF80OHg0OC5wbmcnO1xuaW1wb3J0IHJlbW92ZSBmcm9tICcuLi9hc3NldHMvZGVsZXRlXzQ4eDQ4LnBuZyc7XG5cbmNvbnN0IGhlYWRlckNvbXBvbmVudCA9ICgoKSA9Plxue1xuXHRjb25zdCB0b2dnbGVUb2RvTGlzdCA9IChwcm9qZWN0RWxlbSwgYnRuQ29udGFpbmVyLCBjbGlja2VkRWxlbSkgPT5cblx0e1xuXHRcdGlmIChjbGlja2VkRWxlbS5wYXJlbnRFbGVtZW50ICE9PSBidG5Db250YWluZXIpXG5cdFx0e1xuXHRcdFx0cHJvamVjdEVsZW0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgYWRkVG9kb0NCID0gKCgpID0+XG5cdHtcblx0XHRjb25zdCBhZGRUb2RvID0gKCgpID0+XG5cdFx0e1xuXHRcdFx0Y29uc3QgZXJyb3JPYmogPSB7XG5cdFx0XHRcdCdJbnZhbGlkIG9yIG1pc3Npbmcga2V5L3MnOiAnRG9uXFwndCBsZWF2ZSB0aGUgZGF0ZSBvcHRpb24gZW1wdHkhJyxcblx0XHRcdFx0J0ludmFsaWQgdmFsdWUvcyc6ICdEb25cXCd0IGxlYXZlIHRoZSB0aXRsZSBvcHRpb24gZW1wdHkhJyxcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgYWRkVG9TdG9yYWdlID0gKHByb2pLZXksIHRvZG9JbmZvKSA9PlxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBwcm9qZWN0T2JqID0gcHJvamVjdC5nZXQocHJvaktleSk7XG5cdFx0XHRcdHJldHVybiBwcm9qZWN0T2JqLnRvZG9zLmFkZCh0b2RvSW5mbykua2V5O1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBhcHBlbmRUb0RPTSA9IChwcm9qZWN0RWxlbSwgdG9kb3NDb250YWluZXIsIHRvZG9JbmZvLCBwcm9qS2V5LCB0b2RvS2V5KSA9PlxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCB0b2RvRWxlbSA9IHRvZG9Db21wb25lbnQodG9kb0luZm8sIHByb2pLZXksIHRvZG9LZXkpO1xuXHRcdFx0XHR0b2Rvc0NvbnRhaW5lci5hcHBlbmQodG9kb0VsZW0pO1xuXHRcdFx0XHRwcm9qZWN0RWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdlbXB0eScpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gKHByb2plY3RFbGVtLCB0b2Rvc0NvbnRhaW5lciwgdG9kb0luZm8sIHByb2pLZXkpID0+XG5cdFx0XHR7XG5cdFx0XHRcdHRyeVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gQWRkIHRvIHN0b3JhZ2UgYW5kIGdldCBrZXlcblx0XHRcdFx0XHRjb25zdCB0b2RvS2V5ID0gYWRkVG9TdG9yYWdlKHByb2pLZXksIHRvZG9JbmZvKTtcblxuXHRcdFx0XHRcdC8vIEFwcGVuZCB0byBwcm9qZWN0IHRvZG9zXG5cdFx0XHRcdFx0YXBwZW5kVG9ET00ocHJvamVjdEVsZW0sIHRvZG9zQ29udGFpbmVyLCB0b2RvSW5mbywgcHJvaktleSwgdG9kb0tleSk7XG5cblx0XHRcdFx0XHRzYXZlKCk7XG5cdFx0XHRcdFx0bW9kYWwuaGlkZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoIChlKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgdXNlck1lc3NhZ2UgPSBlcnJvck9ialtlLm1lc3NhZ2VdO1xuXHRcdFx0XHRcdGlmKHVzZXJNZXNzYWdlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGFsZXJ0KHVzZXJNZXNzYWdlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHRocm93IGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KSgpXG5cblx0XHRjb25zdCBnZXROb2RlcyA9IChwcm9qZWN0RWxlbSwgdG9kb3NDb250YWluZXIsIGtleSkgPT5cblx0XHR7XG5cdFx0XHRjb25zdCBub2RlQ29udGFpbmVyID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcblx0XHRcdGNvbnN0IGhlYWRlciA9IGNvbXBvbmVudCgnaDInLCB7XG5cdFx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdFx0Y2xhc3M6IFtcblx0XHRcdFx0XHRcdCdoZWFkaW5nJyxcblx0XHRcdFx0XHRcdCdub1NpZGVNYXJnaW4nLFxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0J0NyZWF0ZSBhIG5ldyB0b2RvJ1xuXHRcdFx0XHRdXG5cdFx0XHR9KVxuXG5cdFx0XHRjb25zdCB0aXRsZUlucHV0ID0gaW5wdXRXcmFwcGVyKCdUaXRsZScsIGNvbXBvbmVudCgnaW5wdXQnLCB7XG5cdFx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdFx0bWF4bGVuZ3RoOiAyNSxcblx0XHRcdFx0fVxuXHRcdFx0fSkpO1xuXG5cdFx0XHRjb25zdCBkZXNjSW5wdXQgPSBpbnB1dFdyYXBwZXIoJ0Rlc2NyaXB0aW9uJywgY29tcG9uZW50KCd0ZXh0YXJlYScsIHtcblx0XHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0XHRjbGFzczogW1xuXHRcdFx0XHRcdFx0J2Rlc2NUZXh0QXJlYScsXG5cdFx0XHRcdFx0XHQnbm9SZXNpemUnXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9LFxuXHRcdFx0fSkpXG5cblx0XHRcdGNvbnN0IGRhdGVJbnB1dCA9IGlucHV0V3JhcHBlcignRHVlIERhdGUnLCBjb21wb25lbnQoJ2lucHV0Jywge1xuXHRcdFx0XHRwcm9wczoge1xuXHRcdFx0XHRcdHR5cGU6ICdkYXRlJ1xuXHRcdFx0XHR9LFxuXHRcdFx0fSkpXG5cblx0XHRcdGNvbnN0IHByaW9yaXR5SW5wdXQgPSAoKCkgPT5cblx0XHRcdHtcblx0XHRcdFx0Y29uc3Qgb3B0aW9uTWFrZXIgPSAodmFsdWUsIHRleHQpID0+IGNvbXBvbmVudCgnb3B0aW9uJywge1xuXHRcdFx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdFx0XHR2YWx1ZSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0XHR0ZXh0XG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9KVxuXG5cdFx0XHRcdGNvbnN0IGlucHV0RWxlbSA9IGNvbXBvbmVudCgnc2VsZWN0Jywge1xuXHRcdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0XHRvcHRpb25NYWtlcigxLCAnSGlnaCcpLFxuXHRcdFx0XHRcdFx0b3B0aW9uTWFrZXIoMiwgJ01lZGl1bScpLFxuXHRcdFx0XHRcdFx0b3B0aW9uTWFrZXIoMywgJ0xvdycpLFxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSlcblxuXHRcdFx0XHRyZXR1cm4gaW5wdXRXcmFwcGVyKCdQcmlvcml0eScsIGlucHV0RWxlbSlcblx0XHRcdH0pKClcblx0XHRcdFxuXHRcdFx0Y29uc3Qgc3VibWl0QnRuID0gY29tcG9uZW50KCdidXR0b24nLCB7XG5cdFx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdFx0aWQ6ICd0b2RvU3VibWl0QnRuJyxcblx0XHRcdFx0XHRvbmNsaWNrOiAoKSA9PiBhZGRUb2RvKHByb2plY3RFbGVtLCB0b2Rvc0NvbnRhaW5lciwge1xuXHRcdFx0XHRcdFx0dGl0bGU6IHRpdGxlSW5wdXQuaW5wdXRFbGVtLnZhbHVlLFxuXHRcdFx0XHRcdFx0ZGVzY3JpcHRpb246IGRlc2NJbnB1dC5pbnB1dEVsZW0udmFsdWUsXG5cdFx0XHRcdFx0XHRkdWVEYXRlOiBkYXRlSW5wdXQuaW5wdXRFbGVtLnZhbHVlQXNEYXRlLFxuXHRcdFx0XHRcdFx0cHJpb3JpdHk6ICtwcmlvcml0eUlucHV0LmlucHV0RWxlbS52YWx1ZSxcblx0XHRcdFx0XHR9LCBrZXkpLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdCdDcmVhdGUnLFxuXHRcdFx0XHRdXG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc3Qgc3VibWl0QnRuQ29udGFpbmVyID0gY29tcG9uZW50KCdkaXYnLCB7XG5cdFx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdFx0Y2xhc3M6IFtcblx0XHRcdFx0XHRcdCdjZW50ZXJEaXYnLFxuXHRcdFx0XHRcdFx0J2ZsZXhHcm93J1xuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0c3VibWl0QnRuLFxuXHRcdFx0XHRdXG5cdFx0XHR9KVxuXG5cdFx0XHRjb25zdCBsZWZ0U2lkZSA9IGNvbXBvbmVudCgnZGl2Jywge1xuXHRcdFx0XHRwcm9wczoge1xuXHRcdFx0XHRcdGNsYXNzOiBbXG5cdFx0XHRcdFx0XHQndmVydGljYWxGbGV4Jyxcblx0XHRcdFx0XHRcdCdmbGV4R3JvdycsXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdHRpdGxlSW5wdXQuZWxlbSxcblx0XHRcdFx0XHRkZXNjSW5wdXQuZWxlbSxcblx0XHRcdFx0XVxuXHRcdFx0fSlcblxuXHRcdFx0Y29uc3QgcmlnaHRTaWRlID0gY29tcG9uZW50KCdkaXYnLCB7XG5cdFx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdFx0Y2xhc3M6IFtcblx0XHRcdFx0XHRcdCd2ZXJ0aWNhbEZsZXgnLFxuXHRcdFx0XHRcdFx0J2ZsZXhHcm93Jyxcblx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdGlkOiAnaW5wdXRTdWJtaXRDb250YWluZXInLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdGRhdGVJbnB1dC5lbGVtLFxuXHRcdFx0XHRcdHByaW9yaXR5SW5wdXQuZWxlbSxcblx0XHRcdFx0XHRzdWJtaXRCdG5Db250YWluZXIsXG5cdFx0XHRcdF1cblx0XHRcdH0pXG5cblx0XHRcdGNvbnN0IGlucHV0U3VibWl0Q29udGFpbmVyID0gY29tcG9uZW50KCdkaXYnLCB7XG5cdFx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdFx0Y2xhc3M6IFtcblx0XHRcdFx0XHRcdCdmbGV4Jyxcblx0XHRcdFx0XHRdLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdGxlZnRTaWRlLFxuXHRcdFx0XHRcdHJpZ2h0U2lkZSxcblx0XHRcdFx0XVxuXHRcdFx0fSlcblxuXHRcdFx0bm9kZUNvbnRhaW5lci5hcHBlbmQoIGhlYWRlciwgaW5wdXRTdWJtaXRDb250YWluZXIgKVxuXHRcdFx0cmV0dXJuIG5vZGVDb250YWluZXI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChwcm9qZWN0RWxlbSwgdG9kb3NDb250YWluZXIsIGtleSkgPT5cblx0XHR7XG5cdFx0XHRtb2RhbC5zaG93KGdldE5vZGVzKHByb2plY3RFbGVtLCB0b2Rvc0NvbnRhaW5lciwga2V5KSk7XG5cdFx0fVxuXHR9KSgpXG5cblx0Y29uc3QgcmVtb3ZlUHJvamVjdCA9ICgoKSA9PlxuXHR7XG5cdFx0Y29uc3QgcmVtb3ZlRnJvbVN0b3JhZ2UgPSAoa2V5KSA9PlxuXHRcdHtcblx0XHRcdHByb2plY3QucmVtb3ZlKGtleSk7XG5cdFx0fVxuXHRcdFxuXHRcdGNvbnN0IHJlbW92ZUZyb21ET00gPSAocHJvamVjdEVsZW0pID0+XG5cdFx0e1xuXHRcdFx0cHJvamVjdEVsZW0ucmVtb3ZlKClcblx0XHR9XG5cblx0XHRyZXR1cm4gKHByb2plY3RFbGVtLCBrZXkpID0+XG5cdFx0e1xuXHRcdFx0cmVtb3ZlRnJvbVN0b3JhZ2Uoa2V5KTtcblx0XHRcdHJlbW92ZUZyb21ET00ocHJvamVjdEVsZW0pO1xuXHRcdFx0c2F2ZSgpO1xuXHRcdH1cblx0fSkoKVxuXG5cdGNvbnN0IGNsZWFyQ29tcGxldGVkVG9kb3MgPSAoKCkgPT5cblx0e1xuXHRcdGNvbnN0IGdldENvbXBsZXRlZFRvZG9zID0gKHRvZG9zQ29udGFpbmVyKSA9PlxuXHRcdHtcblx0XHRcdGNvbnN0IGVsZW1BcnJheSA9IFsuLi50b2Rvc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuY29tcGxldGVkJyldO1xuXHRcdFx0Y29uc3Qga2V5QXJyYXkgPSBlbGVtQXJyYXkubWFwKGVsZW0gPT4gIGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpKTtcblxuXHRcdFx0cmV0dXJuIFtlbGVtQXJyYXksIGtleUFycmF5XTtcblx0XHR9XG5cblx0XHRjb25zdCByZW1vdmVGcm9tU3RvcmFnZSA9IChwcm9qS2V5LCB0b2RvS2V5cykgPT5cblx0XHR7XG5cdFx0XHRjb25zdCBwcm9qT2JqID0gcHJvamVjdC5nZXQocHJvaktleSk7XG5cblx0XHRcdGZvcihjb25zdCBrZXkgb2YgdG9kb0tleXMpXG5cdFx0XHR7XG5cdFx0XHRcdHByb2pPYmoudG9kb3MucmVtb3ZlKGtleSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVtb3ZlRWxlbXMgPSAocHJvamVjdEVsZW0sIHRvZG9zQ29udGFpbmVyLCBlbGVtQXJyYXkpID0+XG5cdFx0e1xuXHRcdFx0Zm9yKGNvbnN0IGVsZW0gb2YgZWxlbUFycmF5KVxuXHRcdFx0e1xuXHRcdFx0XHRlbGVtLnJlbW92ZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZih0b2Rvc0NvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdHByb2plY3RFbGVtLmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiAocHJvamVjdEVsZW0sIHRvZG9zQ29udGFpbmVyLCBwcm9qS2V5KSA9PlxuXHRcdHtcblx0XHRcdGNvbnN0IFtlbGVtQXJyYXksIGtleUFycmF5XSA9IGdldENvbXBsZXRlZFRvZG9zKHRvZG9zQ29udGFpbmVyKTtcblxuXHRcdFx0cmVtb3ZlRnJvbVN0b3JhZ2UocHJvaktleSwga2V5QXJyYXkpO1xuXHRcdFx0cmVtb3ZlRWxlbXMocHJvamVjdEVsZW0sIHRvZG9zQ29udGFpbmVyLCBlbGVtQXJyYXkpO1xuXHRcdFx0c2F2ZSgpO1xuXHRcdH1cblx0fSkoKVxuXG5cdHJldHVybiAobmFtZSwgcHJvamVjdEVsZW0sIGtleSwgdG9kb3NDb250YWluZXIpID0+XG5cdHtcblx0XHRjb25zdCBtYWluQ29tcG9uZW50ID0gY29tcG9uZW50KCdkaXYnLCB7XG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHRvbmNsaWNrOiAoZSkgPT4gdG9nZ2xlVG9kb0xpc3QocHJvamVjdEVsZW0sIGJ0bkNvbnRhaW5lciwgZS50YXJnZXQpLFxuXHRcdFx0XHRjbGFzczogW1xuXHRcdFx0XHRcdCdwcm9qZWN0SGVhZGVyJyxcblx0XHRcdFx0XHQnaGVhZGluZycsXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0Y29uc3QgcHJvamVjdE5hbWUgPSBjb21wb25lbnQoJ2gyJywge1xuXHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0Y2xhc3M6IFtcblx0XHRcdFx0XHQncHJvamVjdE5hbWUnLFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdG5hbWVcblx0XHRcdF1cblx0XHR9KVxuXG5cdFx0Y29uc3QgdG9nZ2xlVG9kb3NBcnJvdyA9IGNvbXBvbmVudCgnaW1nJywge1xuXHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0c3JjOiBhcnJvdyxcblx0XHRcdFx0Y2xhc3M6IFtcblx0XHRcdFx0XHQnYXJyb3cnLFxuXHRcdFx0XHRcdCdub0dyYXknLFxuXHRcdFx0XHRdLFxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRjb25zdCBjbGVhckNvbXBsZXRlVG9kb3NCdG4gPSBjb21wb25lbnQoJ2J1dHRvbicsIHtcblx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdG9uY2xpY2s6ICgpID0+IGNsZWFyQ29tcGxldGVkVG9kb3MocHJvamVjdEVsZW0sIHRvZG9zQ29udGFpbmVyLCBrZXkpLFxuXHRcdFx0fSxcblx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdCdDbGVhciBjb21wbGV0ZWQgVG8tRG9zJ1xuXHRcdFx0XSxcblx0XHR9KVxuXG5cdFx0Y29uc3QgcmVtb3ZlUHJvamVjdEJ0biA9IGNvbXBvbmVudCgnaW1nJywge1xuXHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0c3JjOiByZW1vdmUsXG5cdFx0XHRcdHRpdGxlOiAnUmVtb3ZlIHByb2plY3QnLFxuXHRcdFx0XHRvbmNsaWNrOiAoKSA9PiByZW1vdmVQcm9qZWN0KHByb2plY3RFbGVtLCBrZXkpLFxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRjb25zdCBhZGRUb2RvQnRuID0gY29tcG9uZW50KCdpbWcnLCB7XG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHRzcmM6IGFkZCxcblx0XHRcdFx0dGl0bGU6ICdBZGQgYSB0b2RvJyxcblx0XHRcdFx0b25jbGljazogKCkgPT4gYWRkVG9kb0NCKHByb2plY3RFbGVtLCB0b2Rvc0NvbnRhaW5lciwga2V5KSxcblx0XHRcdH0sXG5cdFx0fSlcblxuXHRcdGNvbnN0IGJ0bkNvbnRhaW5lciA9IGNvbXBvbmVudCgnZGl2Jywge1xuXHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0Y2xhc3M6IFtcblx0XHRcdFx0XHQncHJvamVjdEJ0bnMnLFxuXHRcdFx0XHRcdCdjZW50ZXJEaXYnLFxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0Y2xlYXJDb21wbGV0ZVRvZG9zQnRuLFxuXHRcdFx0XHRyZW1vdmVQcm9qZWN0QnRuLFxuXHRcdFx0XHRhZGRUb2RvQnRuLFxuXHRcdFx0XVxuXHRcdH0pXG5cblx0XHRtYWluQ29tcG9uZW50LmFwcGVuZCh0b2dnbGVUb2Rvc0Fycm93LCBwcm9qZWN0TmFtZSwgYnRuQ29udGFpbmVyKVxuXHRcdHJldHVybiBtYWluQ29tcG9uZW50O1xuXHR9XG59KSgpXG5cbmNvbnN0IHByb2plY3RDb21wb25lbnQgPSAobmFtZSwga2V5KSA9Plxue1xuXHRjb25zdCBtYWluQ29tcG9uZW50ID0gY29tcG9uZW50KCdkaXYnLCB7XG5cdFx0cHJvcHM6IHtcblx0XHRcdGNsYXNzOiBbXG5cdFx0XHRcdCdwcm9qZWN0Jyxcblx0XHRcdFx0J2FjdGl2ZScsXG5cdFx0XHRcdCdlbXB0eScsXG5cdFx0XHRdLFxuXHRcdFx0J2RhdGEta2V5Jzoga2V5LFxuXHRcdH1cblx0fSlcblxuXHRjb25zdCB0b2Rvc0NvbnRhaW5lciA9IGNvbXBvbmVudCgnZGl2Jywge1xuXHRcdHByb3BzOiB7XG5cdFx0XHRjbGFzczogW1xuXHRcdFx0XHQndG9kb3MnLFxuXHRcdFx0XSxcblx0XHR9XG5cdH0pO1xuXG5cdGNvbnN0IGhlYWRlciA9IGhlYWRlckNvbXBvbmVudChuYW1lLCBtYWluQ29tcG9uZW50LCBrZXksIHRvZG9zQ29udGFpbmVyKTtcblxuXHRtYWluQ29tcG9uZW50LmFwcGVuZChoZWFkZXIsIHRvZG9zQ29udGFpbmVyKTtcblx0cmV0dXJuIG1haW5Db21wb25lbnQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByb2plY3RDb21wb25lbnQ7IiwiaW1wb3J0IGNvbXBvbmVudCBmcm9tICcuLi9tb2R1bGVzL2NvbXBvbmVudCc7XG5pbXBvcnQgaW5wdXRXcmFwcGVyIGZyb20gJy4vaW5wdXRXcmFwcGVyJztcbmltcG9ydCBtb2RhbCBmcm9tICcuLi9tb2R1bGVzL21vZGFsJztcbmltcG9ydCB7IHNhdmUgfSBmcm9tICcuLi9tb2R1bGVzL3BlcnNpc3RlbnRTYXZlJztcbmltcG9ydCBwcm9qZWN0IGZyb20gJy4uL21vZHVsZXMvcHJvamVjdHMnO1xuaW1wb3J0IGVkaXQgZnJvbSAnLi4vYXNzZXRzL2VkaXRfNDh4NDgucG5nJztcbmltcG9ydCByZW1vdmUgZnJvbSAnLi4vYXNzZXRzL2RlbGV0ZV80OHg0OC5wbmcnO1xuXG5jb25zdCB0b2RvQ29tcG9uZW50ID0gKCgpID0+XG57XG5cdGNvbnN0IHRvZ2dsZVRvZG9TdGF0ZSA9ICgoKSA9PlxuXHR7XG5cdFx0Y29uc3QgZWRpdFN0b3JhZ2UgPSAocHJvaktleSwgdG9kb0tleSkgPT5cblx0XHR7XG5cdFx0XHRjb25zdCBwcm9qT2JqID0gcHJvamVjdC5nZXQocHJvaktleSk7XG5cdFx0XHRjb25zdCBjb21wbGV0ZVN0YXRlID0gIXByb2pPYmoudG9kb3MuZ2V0KHRvZG9LZXkpLmNvbXBsZXRlZDtcblx0XHRcdHByb2pPYmoudG9kb3MuZWRpdCh0b2RvS2V5LCB7IGNvbXBsZXRlZDogY29tcGxldGVTdGF0ZSB9KTtcblx0XHR9XG5cblx0XHRjb25zdCBlZGl0RWxlbSA9ICh0b2RvRWxlbSwgc3RhdHVzRGlzcGxheUVsZW0pID0+XG5cdFx0e1xuXHRcdFx0Y29uc3QgY3VyclN0YXR1cyA9IHN0YXR1c0Rpc3BsYXlFbGVtLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZihjdXJyU3RhdHVzID09PSAnY29tcGxldGUnKSBzdGF0dXNEaXNwbGF5RWxlbS50ZXh0Q29udGVudCA9ICdJbmNvbXBsZXRlJztcblx0XHRcdGVsc2Ugc3RhdHVzRGlzcGxheUVsZW0udGV4dENvbnRlbnQgPSAnQ29tcGxldGUnO1xuXHRcdFx0dG9kb0VsZW0uY2xhc3NMaXN0LnRvZ2dsZSgnY29tcGxldGVkJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICh0b2RvRWxlbSwgc3RhdHVzRGlzcGxheUVsZW0sIHByb2pLZXksIHRvZG9LZXkpID0+XG5cdFx0e1xuXHRcdFx0ZWRpdFN0b3JhZ2UocHJvaktleSwgdG9kb0tleSk7XG5cdFx0XHRlZGl0RWxlbSh0b2RvRWxlbSwgc3RhdHVzRGlzcGxheUVsZW0pO1xuXHRcdFx0c2F2ZSgpO1xuXHRcdH1cblx0fSkoKVxuXHRcblx0Y29uc3QgcGFyc2VEYXRlID0gKGRhdGVPYmopID0+XG5cdHtcblx0XHRjb25zdCBkYXkgPSBkYXRlT2JqLmdldERhdGUoKTtcblx0XHRjb25zdCBtb250aCA9IGRhdGVPYmouZ2V0TW9udGgoKSArIDE7XG5cdFx0Y29uc3QgeWVhciA9IGRhdGVPYmouZ2V0RnVsbFllYXIoKTtcblxuXHRcdHJldHVybiBgJHtkYXl9LyR7bW9udGh9LyR7eWVhcn1gXG5cdH1cblxuXHRjb25zdCByZW1vdmVUb2RvID0gKCgpID0+XG5cdHtcblx0XHRjb25zdCByZW1vdmVGcm9tU3RvcmFnZSA9IChwcm9qS2V5LCB0b2RvS2V5KSA9PlxuXHRcdHtcblx0XHRcdGNvbnN0IHByb2pPYmogPSBwcm9qZWN0LmdldChwcm9qS2V5KTtcblx0XHRcdHByb2pPYmoudG9kb3MucmVtb3ZlKHRvZG9LZXkpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGdldFByb2pBbmRUb2Rvc0NvbnRhaW5lciA9IChwcm9qS2V5KSA9PlxuXHRcdHtcblx0XHRcdGNvbnN0IHByb2plY3RFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEta2V5PScke3Byb2pLZXl9J11gKTtcblx0XHRcdGNvbnN0IHRvZG9zQ29udGFpbmVyID0gcHJvamVjdEVsZW0ucXVlcnlTZWxlY3RvcihgLnRvZG9zYCk7XG5cblx0XHRcdHJldHVybiBbcHJvamVjdEVsZW0sIHRvZG9zQ29udGFpbmVyXTtcblx0XHR9XG5cblx0XHRjb25zdCB0b2RvRW1wdHlDaGVjayA9IChwcm9qS2V5KSA9PlxuXHRcdHtcblx0XHRcdGNvbnN0IFtwcm9qZWN0RWxlbSwgdG9kb3NDb250YWluZXJdID0gZ2V0UHJvakFuZFRvZG9zQ29udGFpbmVyKHByb2pLZXkpO1xuXG5cdFx0XHRpZih0b2Rvc0NvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggPT09IDApXG5cdFx0XHR7XG5cdFx0XHRcdHByb2plY3RFbGVtLmNsYXNzTGlzdC5hZGQoJ2VtcHR5Jyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVtb3ZlRnJvbURPTSA9ICh0b2RvRWxlbSwgcHJvaktleSkgPT5cblx0XHR7XG5cdFx0XHR0b2RvRWxlbS5yZW1vdmUoKTtcblx0XHRcdHRvZG9FbXB0eUNoZWNrKHByb2pLZXkpO1xuXHRcdH1cblxuXHRcdHJldHVybiAodG9kb0VsZW0sIHByb2pLZXksIHRvZG9LZXkpID0+XG5cdFx0e1xuXHRcdFx0cmVtb3ZlRnJvbVN0b3JhZ2UocHJvaktleSwgdG9kb0tleSk7XG5cdFx0XHRyZW1vdmVGcm9tRE9NKHRvZG9FbGVtLCBwcm9qS2V5KTtcblx0XHRcdHNhdmUoKTtcblx0XHR9XG5cdH0pKClcblxuXHRjb25zdCBlZGl0VG9kb0NCID0gKCgpID0+XG5cdHtcblx0XHRjb25zdCBlZGl0VG9kbyA9ICgoKSA9PlxuXHRcdHtcblx0XHRcdGNvbnN0IGVkaXRTdG9yYWdlID0gKHByb2pLZXksIHRvZG9LZXksIHRvZG9JbmZvKSA9PlxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBwcm9qT2JqID0gcHJvamVjdC5nZXQocHJvaktleSk7XG5cdFx0XHRcdHByb2pPYmoudG9kb3MuZWRpdCh0b2RvS2V5LCB0b2RvSW5mbyk7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcHJvamVjdEVsZW0gXG5cdFx0XHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBuYW1lIFxuXHRcdFx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZGF0ZSBcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSB0b2RvSW5mbyBcblx0XHRcdCAqL1xuXHRcdFx0Y29uc3QgZWRpdEVsZW0gPSAocHJvamVjdEVsZW0sIG5hbWUsIGRhdGUsIHRvZG9JbmZvKSA9PlxuXHRcdFx0e1xuXHRcdFx0XHRuYW1lLnRleHRDb250ZW50ID0gdG9kb0luZm8udGl0bGU7XG5cdFx0XHRcdGRhdGUudGV4dENvbnRlbnQgPSBwYXJzZURhdGUodG9kb0luZm8uZHVlRGF0ZSk7XG5cdFx0XHRcdHByb2plY3RFbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1wcmlvcml0eScsIHRvZG9JbmZvLnByaW9yaXR5KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICh0b2RvRWxlbSwgbmFtZUVsZW0sIGRhdGVFbGVtLCBwcm9qS2V5LCB0b2RvS2V5LCBuZXdUb2RvSW5mbykgPT5cblx0XHRcdHtcblx0XHRcdFx0dHJ5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRlZGl0U3RvcmFnZShwcm9qS2V5LCB0b2RvS2V5LCBuZXdUb2RvSW5mbyk7XHRcblx0XHRcdFx0XHRlZGl0RWxlbSh0b2RvRWxlbSwgbmFtZUVsZW0sIGRhdGVFbGVtLCBuZXdUb2RvSW5mbyk7XG5cdFx0XHRcdFx0c2F2ZSgpO1xuXHRcdFx0XHRcdG1vZGFsLmhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaCAoZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKGUubWVzc2FnZSA9PT0gJ0ludmFsaWQgdmFsdWUvcycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YWxlcnQoJ0ludmFsaWQgdmFsdWVzISAnKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHRocm93IGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KSgpXG5cblx0XHRjb25zdCBnZXROb2RlcyA9ICh0b2RvRWxlbSwgbmFtZUVsZW0sIGRhdGVFbGVtLCB0b2RvSW5mbywgcHJvaktleSwgdG9kb0tleSkgPT5cblx0XHR7XG5cdFx0XHRjb25zdCBub2RlQ29udGFpbmVyID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcblx0XHRcdGNvbnN0IGhlYWRlciA9IGNvbXBvbmVudCgnaDInLCB7XG5cdFx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdFx0Y2xhc3M6IFtcblx0XHRcdFx0XHRcdCdoZWFkaW5nJyxcblx0XHRcdFx0XHRcdCdub1NpZGVNYXJnaW4nLFxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0XHQnRWRpdCB0b2RvIGluZm8nXG5cdFx0XHRcdF1cblx0XHRcdH0pXG5cblx0XHRcdGNvbnN0IHRpdGxlSW5wdXQgPSBpbnB1dFdyYXBwZXIoJ1RpdGxlJywgY29tcG9uZW50KCdpbnB1dCcsIHtcblx0XHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0XHRtYXhsZW5ndGg6IDI1LFxuXHRcdFx0XHRcdHZhbHVlOiB0b2RvSW5mby50aXRsZSxcblx0XHRcdFx0fVxuXHRcdFx0fSkpO1xuXG5cdFx0XHRjb25zdCBkZXNjSW5wdXQgPSBpbnB1dFdyYXBwZXIoJ0Rlc2NyaXB0aW9uJywgY29tcG9uZW50KCd0ZXh0YXJlYScsIHtcblx0XHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0XHRjbGFzczogW1xuXHRcdFx0XHRcdFx0J2Rlc2NUZXh0QXJlYScsXG5cdFx0XHRcdFx0XHQnbm9SZXNpemUnXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdH0pKVxuXG5cdFx0XHRjb25zdCBkYXRlSW5wdXQgPSBpbnB1dFdyYXBwZXIoJ0R1ZSBEYXRlJywgY29tcG9uZW50KCdpbnB1dCcsIHtcblx0XHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0XHR0eXBlOiAnZGF0ZScsXG5cdFx0XHRcdFx0dmFsdWVBc0RhdGU6IHRvZG9JbmZvLmR1ZURhdGUsXG5cdFx0XHRcdH0sXG5cdFx0XHR9KSlcblxuXHRcdFx0Y29uc3QgcHJpb3JpdHlJbnB1dCA9ICgoKSA9PlxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBvcHRpb25NYWtlciA9ICh2YWx1ZSwgdGV4dCkgPT4gY29tcG9uZW50KCdvcHRpb24nLCB7XG5cdFx0XHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0XHRcdHZhbHVlLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0XHRcdHRleHRcblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pXG5cblx0XHRcdFx0Y29uc3QgaW5wdXRFbGVtID0gY29tcG9uZW50KCdzZWxlY3QnLCB7XG5cdFx0XHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0XHRcdG9wdGlvbk1ha2VyKDEsICdIaWdoJyksXG5cdFx0XHRcdFx0XHRvcHRpb25NYWtlcigyLCAnTWVkaXVtJyksXG5cdFx0XHRcdFx0XHRvcHRpb25NYWtlcigzLCAnTG93JyksXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9KVxuXG5cdFx0XHRcdHJldHVybiBpbnB1dFdyYXBwZXIoJ1ByaW9yaXR5JywgaW5wdXRFbGVtKVxuXHRcdFx0fSkoKVxuXG5cdFx0XHQvLyBTZXR0aW5nIGl0IGluIGZ1bmN0aW9uIGRvZXNuJ3Qgd29ya1xuXHRcdFx0ZGVzY0lucHV0LmVsZW0ucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKS52YWx1ZSA9IHRvZG9JbmZvLmRlc2NyaXB0aW9uO1xuXHRcdFx0ZGF0ZUlucHV0LmVsZW0ucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZUFzRGF0ZSA9IHRvZG9JbmZvLmR1ZURhdGU7XG5cdFx0XHRwcmlvcml0eUlucHV0LmVsZW0ucXVlcnlTZWxlY3Rvcignc2VsZWN0JykudmFsdWUgPSB0b2RvSW5mby5wcmlvcml0eTtcblx0XHRcdFxuXHRcdFx0Y29uc3Qgc3VibWl0QnRuID0gY29tcG9uZW50KCdidXR0b24nLCB7XG5cdFx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdFx0aWQ6ICd0b2RvU3VibWl0QnRuJyxcblx0XHRcdFx0XHRvbmNsaWNrOiAoKSA9PiBlZGl0VG9kbyh0b2RvRWxlbSwgbmFtZUVsZW0sIGRhdGVFbGVtLCBwcm9qS2V5LCB0b2RvS2V5LCB7XG5cdFx0XHRcdFx0XHR0aXRsZTogdGl0bGVJbnB1dC5pbnB1dEVsZW0udmFsdWUsXG5cdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjogZGVzY0lucHV0LmlucHV0RWxlbS52YWx1ZSxcblx0XHRcdFx0XHRcdGR1ZURhdGU6IGRhdGVJbnB1dC5pbnB1dEVsZW0udmFsdWVBc0RhdGUsXG5cdFx0XHRcdFx0XHRwcmlvcml0eTogK3ByaW9yaXR5SW5wdXQuaW5wdXRFbGVtLnZhbHVlLFxuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdCdFZGl0Jyxcblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cblx0XHRcdGNvbnN0IHN1Ym1pdEJ0bkNvbnRhaW5lciA9IGNvbXBvbmVudCgnZGl2Jywge1xuXHRcdFx0XHRwcm9wczoge1xuXHRcdFx0XHRcdGNsYXNzOiBbXG5cdFx0XHRcdFx0XHQnY2VudGVyRGl2Jyxcblx0XHRcdFx0XHRcdCdmbGV4R3Jvdydcblx0XHRcdFx0XHRdLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdHN1Ym1pdEJ0bixcblx0XHRcdFx0XVxuXHRcdFx0fSlcblxuXHRcdFx0Y29uc3QgbGVmdFNpZGUgPSBjb21wb25lbnQoJ2RpdicsIHtcblx0XHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0XHRjbGFzczogW1xuXHRcdFx0XHRcdFx0J3ZlcnRpY2FsRmxleCcsXG5cdFx0XHRcdFx0XHQnZmxleEdyb3cnLFxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSxcblx0XHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0XHR0aXRsZUlucHV0LmVsZW0sXG5cdFx0XHRcdFx0ZGVzY0lucHV0LmVsZW0sXG5cdFx0XHRcdF1cblx0XHRcdH0pXG5cblx0XHRcdGNvbnN0IHJpZ2h0U2lkZSA9IGNvbXBvbmVudCgnZGl2Jywge1xuXHRcdFx0XHRwcm9wczoge1xuXHRcdFx0XHRcdGNsYXNzOiBbXG5cdFx0XHRcdFx0XHQndmVydGljYWxGbGV4Jyxcblx0XHRcdFx0XHRcdCdmbGV4R3JvdycsXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRpZDogJ2lucHV0U3VibWl0Q29udGFpbmVyJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0XHRkYXRlSW5wdXQuZWxlbSxcblx0XHRcdFx0XHRwcmlvcml0eUlucHV0LmVsZW0sXG5cdFx0XHRcdFx0c3VibWl0QnRuQ29udGFpbmVyLFxuXHRcdFx0XHRdXG5cdFx0XHR9KVxuXG5cdFx0XHRjb25zdCBpbnB1dFN1Ym1pdENvbnRhaW5lciA9IGNvbXBvbmVudCgnZGl2Jywge1xuXHRcdFx0XHRwcm9wczoge1xuXHRcdFx0XHRcdGNsYXNzOiBbXG5cdFx0XHRcdFx0XHQnZmxleCcsXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0XHRsZWZ0U2lkZSxcblx0XHRcdFx0XHRyaWdodFNpZGUsXG5cdFx0XHRcdF1cblx0XHRcdH0pXG5cblx0XHRcdG5vZGVDb250YWluZXIuYXBwZW5kKCBoZWFkZXIsIGlucHV0U3VibWl0Q29udGFpbmVyICk7XG5cdFx0XHRyZXR1cm4gbm9kZUNvbnRhaW5lcjtcblx0XHR9XG5cblx0XHRyZXR1cm4gKHRvZG9FbGVtLCBuYW1lRWxlbSwgZGF0ZUVsZW0sIHRvZG9JbmZvLCBwcm9qS2V5LCB0b2RvS2V5KSA9PlxuXHRcdHtcblx0XHRcdG1vZGFsLnNob3coZ2V0Tm9kZXModG9kb0VsZW0sIG5hbWVFbGVtLCBkYXRlRWxlbSwgdG9kb0luZm8sIHByb2pLZXksIHRvZG9LZXkpKTtcblx0XHR9XG5cdH0pKClcblxuXHQvKipcblx0ICogQHBhcmFtIHtPYmplY3R9IHRvZG9JbmZvXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gdG9kb0luZm8uY29tcGxldGVkXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0b2RvSW5mby50aXRsZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdG9kb0luZm8uZGVzY3JpcHRpb25cblx0ICogQHBhcmFtIHtTdHJpbmd9IHRvZG9JbmZvLmR1ZURhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHRvZG9JbmZvLiBwcmlvcml0eVxuXHQgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFJldHVybnMgYSB0b2RvIGNvbXBvbmVudFxuXHQgKi9cblx0cmV0dXJuICh0b2RvSW5mbywgcHJvaktleSwgdG9kb0tleSkgPT5cblx0e1xuXHRcdGNvbnN0IG1haW5Db21wb25lbnQgPSBjb21wb25lbnQoJ2RpdicsIHtcblx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdGNsYXNzOiBbXG5cdFx0XHRcdFx0J3RvZG9JdGVtJ1xuXHRcdFx0XHRdLFxuXHRcdFx0XHRvbmNsaWNrOiAoZSkgPT5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmKCFbZWRpdEJ0biwgcmVtb3ZlQnRuXS5pbmNsdWRlcyhlLnRhcmdldCkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dG9nZ2xlVG9kb1N0YXRlKG1haW5Db21wb25lbnQsIHN0YXR1cywgcHJvaktleSwgdG9kb0tleSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdCdkYXRhLXByaW9yaXR5JzogdG9kb0luZm8ucHJpb3JpdHksXG5cdFx0XHRcdCdkYXRhLWtleSc6IHRvZG9LZXksXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdGlmKHRvZG9JbmZvLmNvbXBsZXRlZCkgbWFpbkNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcblx0XG5cdFx0Y29uc3QgbmFtZSA9IGNvbXBvbmVudCgnaDMnLCB7XG5cdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHR0b2RvSW5mby50aXRsZVxuXHRcdFx0XSxcblx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdGNsYXNzOiBbXG5cdFx0XHRcdFx0J25hbWUnXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0Y29uc3Qgc3RhdHVzID0gY29tcG9uZW50KCdzcGFuJywge1xuXHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0dG9kb0luZm8uY29tcGxldGVkID8gJ0NvbXBsZXRlJyA6ICdJbmNvbXBsZXRlJyxcblx0XHRcdF0sXG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHRjbGFzczogW1xuXHRcdFx0XHRcdCdzdGF0dXMnXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9KVxuXHRcblx0XHRjb25zdCBkYXRlID0gY29tcG9uZW50KCdzcGFuJywge1xuXHRcdFx0Y2hpbGRyZW46IFtcblx0XHRcdFx0cGFyc2VEYXRlKHRvZG9JbmZvLmR1ZURhdGUpXG5cdFx0XHRdLFxuXHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0Y2xhc3M6IFtcblx0XHRcdFx0XHQnZGF0ZSdcblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRjb25zdCByZW1vdmVCdG4gPSBjb21wb25lbnQoJ2ltZycsIHtcblx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdHNyYzogcmVtb3ZlLFxuXHRcdFx0XHRvbmNsaWNrOiAoKSA9PiByZW1vdmVUb2RvKG1haW5Db21wb25lbnQsIHByb2pLZXksIHRvZG9LZXkpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRcblx0XHRjb25zdCBlZGl0QnRuID0gY29tcG9uZW50KCdpbWcnLCB7XG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHRzcmM6IGVkaXQsXG5cdFx0XHRcdG9uY2xpY2s6ICgpID0+IGVkaXRUb2RvQ0IobWFpbkNvbXBvbmVudCwgbmFtZSwgZGF0ZSwgdG9kb0luZm8sIHByb2pLZXksIHRvZG9LZXkpLFxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRjb25zdCBidG5Db250YWluZXIgPSBjb21wb25lbnQoJ2RpdicsIHtcblx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdHJlbW92ZUJ0bixcblx0XHRcdFx0ZWRpdEJ0bixcblx0XHRcdF0sXG5cdFx0fSlcblx0XG5cdFx0bWFpbkNvbXBvbmVudC5hcHBlbmQoIG5hbWUsIHN0YXR1cywgZGF0ZSwgYnRuQ29udGFpbmVyICk7XG5cdFx0cmV0dXJuIG1haW5Db21wb25lbnQ7XG5cdH1cbn0pKClcblxuZXhwb3J0IGRlZmF1bHQgdG9kb0NvbXBvbmVudDsiLCIvKipcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IHRhZyAtIFRoZSB0YWcgb2YgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnByb3BzIC0gUHJvcGVydGllcyBvZiB0aGUgZWxlbWVudFxuICogQHBhcmFtIHtBcnJheTxIVE1MRWxlbWVudD59IG9wdGlvbnMuY2hpbGRyZW4gLSBBbiBhcnJheSBvZiBub2Rlc1xuICogQHJldHVybnMge0hUTUxFbGVtZW50fSBSZXR1cm5zIGEgbm9kZSB3aXRoIHRoZSBzcGVjaWZlZCB0YWdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgKHRhZywgeyBwcm9wcyA9IHt9LCBjaGlsZHJlbiA9IFtdIH0gPSB7fSkgPT5cbntcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcblxuXHRmb3IoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHByb3BzKSlcblx0e1xuXHRcdHN3aXRjaChrZXkpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnc3R5bGUnOlxuXHRcdFx0XHRmb3IoY29uc3QgW3N0eWxlLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob3B0aW9ucy5zdHlsZSkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlW3N0eWxlXSA9IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdjbGFzcyc6XG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi52YWx1ZSk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZih0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicpIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuXHRcdFx0XHRlbHNlIGVsZW1lbnRba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKVxuXHR7XG5cdFx0ZWxlbWVudC5hcHBlbmQoLi4uY2hpbGRyZW4pO1xuXHR9XG5cblx0cmV0dXJuIGVsZW1lbnQ7XG59XG4iLCJjb25zdCBnZXRSYW5kb21JbnQgPSAobWluLCBtYXgpID0+XG57XG5cdG1pbiA9IE1hdGguY2VpbChtaW4pO1xuXHRtYXggPSBNYXRoLmZsb29yKG1heCk7XG5cblx0Y29uc3QgcmFuZG9tSW50ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcblxuXHRyZXR1cm4gcmFuZG9tSW50O1xufVxuXG5jb25zdCBnZXRSYW5kQ2hhciA9ICgpID0+IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyc0xlbikpXG5cbmNvbnN0IGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbmNvbnN0IGNoYXJzTGVuID0gY2hhcnMubGVuZ3RoO1xuY29uc3Qga2V5bGVuID0ge1xuXHRtaW46IDEwLFxuXHRtYXg6IDIwLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT5cbntcblx0Y29uc3QgbGVuZ3RoID0gZ2V0UmFuZG9tSW50KGtleWxlbi5taW4sIGtleWxlbi5tYXgpO1xuXHRjb25zdCByZXN1bHQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoIH0sICgpID0+IGdldFJhbmRDaGFyKCkpLmpvaW4oJycpO1xuXG5cdHJldHVybiByZXN1bHQ7XG59OyIsImltcG9ydCBjb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuXG5jb25zdCBtb2RhbCA9ICgoKSA9Plxue1xuXHRjb25zdCBib2R5RWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblx0Y29uc3QgbWFpbkVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG5cblx0Y29uc3QgbW9kYWxTdGF0ZSA9IG9wZXJhdGlvbiA9PlxuXHR7XG5cdFx0Y29uc3QgY2xhc3NTd2l0Y2ggPSAoZWxlbSwgb3BlcmF0aW9uLCBjbGFzc05hbWUpID0+IFxuXHRcdHtcblx0XHRcdGVsZW0uY2xhc3NMaXN0W29wZXJhdGlvbl0oY2xhc3NOYW1lKTtcblx0XHR9XG5cblx0XHRjbGFzc1N3aXRjaChtb2RhbEJnLCBvcGVyYXRpb24sICdpbnZpcycpO1xuXG5cdFx0aWYob3BlcmF0aW9uID09PSAnYWRkJykgb3BlcmF0aW9uID0gJ3JlbW92ZSc7XG5cdFx0ZWxzZSBvcGVyYXRpb24gPSAnYWRkJztcblxuXHRcdGNsYXNzU3dpdGNoKG1haW5FbGVtLCBvcGVyYXRpb24sICdzdG9wU2Nyb2xsJylcblx0fVxuXG5cdGNvbnN0IGVtcHR5TW9kYWwgPSAoKSA9PiBtb2RhbENvbnRlbnQudGV4dENvbnRlbnQgPSAnJztcblxuXHRjb25zdCBmaWxsTW9kYWwgPSBkb2NGcmFnbWVudCA9PiBtb2RhbENvbnRlbnQuYXBwZW5kQ2hpbGQoZG9jRnJhZ21lbnQpO1xuXG5cdC8qKlxuXHQgKiBIaWRlcyB0aGUgbW9kYWwgYm94XG5cdCAqL1xuXHRjb25zdCBoaWRlID0gKCkgPT5cblx0e1xuXHRcdGVtcHR5TW9kYWwoKTtcblx0XHRtb2RhbFN0YXRlKCdhZGQnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXZlYWxzIHRoZSBtb2RhbCBib3hcblx0ICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBub2RlcyBcblx0ICovXG5cdGNvbnN0IHNob3cgPSBkb2NGcmFnbWVudCA9PlxuXHR7XG5cdFx0ZW1wdHlNb2RhbCgpO1xuXHRcdGZpbGxNb2RhbChkb2NGcmFnbWVudCk7XG5cdFx0bW9kYWxTdGF0ZSgncmVtb3ZlJyk7XG5cdH1cblxuXHRjb25zdCBtb2RhbENvbnRlbnQgPSBjb21wb25lbnQoJ2RpdicsIHtcblx0XHRwcm9wczoge1xuXHRcdFx0aWQ6ICdtb2RhbENvbnRlbnQnLFxuXHRcdH1cblx0fSk7XG5cblx0Y29uc3QgbW9kYWxDbG9zZUJ0biA9IGNvbXBvbmVudCgnYnV0dG9uJywge1xuXHRcdHByb3BzOiB7XG5cdFx0XHRpZDogJ21vZGFsQ2xvc2VCdG4nLFxuXHRcdFx0b25jbGljazogaGlkZSxcblx0XHR9LFxuXHR9KVxuXHRcblx0Y29uc3QgbW9kYWxCb3ggPSBjb21wb25lbnQoJ2RpdicsIHtcblx0XHRwcm9wczoge1xuXHRcdFx0aWQ6ICdtb2RhbCcsXG5cdFx0fSxcblx0XHRjaGlsZHJlbjogW1xuXHRcdFx0bW9kYWxDbG9zZUJ0bixcblx0XHRcdG1vZGFsQ29udGVudCxcblx0XHRdXG5cdH0pO1xuXG5cdGNvbnN0IG1vZGFsQmcgPSBjb21wb25lbnQoJ2RpdicsIHtcblx0XHRwcm9wczoge1xuXHRcdFx0aWQ6ICdtb2RhbEJnJyxcblx0XHRcdGNsYXNzOiBbXG5cdFx0XHRcdCdpbnZpcydcblx0XHRcdF1cblx0XHR9LFxuXHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRtb2RhbEJveFxuXHRcdF1cblx0fSk7XG5cblx0Ym9keUVsZW0uYXBwZW5kKG1vZGFsQmcpO1xuXG5cdHJldHVybiB7XG5cdFx0c2hvdyxcblx0XHRoaWRlLFxuXHR9XG59KSgpXG5cbmV4cG9ydCBkZWZhdWx0IG1vZGFsOyIsImltcG9ydCBwcm9qZWN0IGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHByb2plY3RDb21wb25lbnQgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9qZWN0Q29tcG9uZW50JztcbmltcG9ydCB0b2RvQ29tcG9uZW50IGZyb20gJy4uL2NvbXBvbmVudHMvdG9kb0NvbXBvbmVudCc7XG5cbmNvbnN0IGtleSA9ICdwcm9qZWN0c0FycmF5JztcblxuZXhwb3J0IGNvbnN0IGxvYWQgPSAocHJvamVjdENvbnRhaW5lcikgPT5cbntcblx0Y29uc3QgcHJvakFycmF5ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcblxuXHRpZihwcm9qQXJyYXkpXG5cdHtcblx0XHRjb25zdCBub2RlQ29udGFpbmVyID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKTtcblxuXHRcdGZvcihjb25zdCBwcm9qSXRlbSBvZiBwcm9qQXJyYXkpXG5cdFx0e1xuXHRcdFx0Y29uc3QgcHJvak9iaiA9IHByb2plY3QuYWRkKHByb2pJdGVtLm5hbWUpO1xuXHRcdFx0Y29uc3QgcHJvakVsZW0gPSBwcm9qZWN0Q29tcG9uZW50KHByb2pJdGVtLm5hbWUsIHByb2pPYmoua2V5KTtcblxuXHRcdFx0aWYocHJvakl0ZW0udG9kb3MubGVuZ3RoID4gMClcblx0XHRcdHtcblx0XHRcdFx0cHJvakVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnZW1wdHknKTtcblxuXHRcdFx0XHRjb25zdCB0b2Rvc0NvbnRhaW5lciA9IHByb2pFbGVtLnF1ZXJ5U2VsZWN0b3IoJy50b2RvcycpO1xuXHRcdFx0XHRmb3IoY29uc3QgdG9kb0luZm8gb2YgcHJvakl0ZW0udG9kb3MpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0b2RvSW5mby5kdWVEYXRlID0gbmV3IERhdGUodG9kb0luZm8uZHVlRGF0ZSk7XG5cblx0XHRcdFx0XHRjb25zdCB0b2RvS2V5ID0gcHJvak9iai50b2Rvcy5hZGQodG9kb0luZm8pLmtleTtcblx0XHRcdFx0XHRjb25zdCB0b2RvRWxlbSA9IHRvZG9Db21wb25lbnQodG9kb0luZm8sIHByb2pPYmoua2V5LCB0b2RvS2V5KTtcblx0XHRcdFx0XHR0b2Rvc0NvbnRhaW5lci5hcHBlbmQodG9kb0VsZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG5vZGVDb250YWluZXIuYXBwZW5kKHByb2pFbGVtKTtcblx0XHR9XG5cblx0XHRwcm9qZWN0Q29udGFpbmVyLmFwcGVuZChub2RlQ29udGFpbmVyKTtcblx0fVxufVxuXG5leHBvcnQgY29uc3Qgc2F2ZSA9ICgpID0+XG57XG5cdGNvbnN0IHByb2pBcnJheSA9IHByb2plY3QuZ2V0KCkubWFwKHByb2plY3RJdGVtID0+ICh7XG5cdFx0bmFtZTogcHJvamVjdEl0ZW0ucHJvamVjdE5hbWUsXG5cdFx0dG9kb3M6IHByb2plY3RJdGVtLnRvZG9zLmdldCgpLm1hcCh0b2RvSXRlbSA9PiAoe1xuXHRcdFx0Y29tcGxldGVkOiB0b2RvSXRlbS5jb21wbGV0ZWQsXG5cdFx0XHR0aXRsZTogdG9kb0l0ZW0udGl0bGUsXG5cdFx0XHRkZXNjcmlwdGlvbjogdG9kb0l0ZW0uZGVzY3JpcHRpb24sXG5cdFx0XHRkdWVEYXRlOiB0b2RvSXRlbS5kdWVEYXRlLFxuXHRcdFx0cHJpb3JpdHk6IHRvZG9JdGVtLnByaW9yaXR5LFxuXHRcdH0pKSxcblx0fSkpO1xuXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkocHJvakFycmF5KSk7XG59IiwiaW1wb3J0IGdldFVuaXF1ZUtleSBmcm9tIFwiLi9nZXRVbmlxdWVLZXlcIjtcblxuY29uc3QgZ2V0SW5kZXhGcm9tS2V5ID0gKGFycmF5LCBrZXkpID0+XG57XG5cdGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdLZXkgbXVzdCBiZSBhIHN0cmluZycpO1xuXHRjb25zdCBpbmRleCA9IGFycmF5LmZpbmRJbmRleChpdGVtID0+IGl0ZW0ua2V5ID09PSBrZXkpO1xuXHRpZiAoaW5kZXggPT09IC0xKVxuXHR7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJdGVtIG5vdCBmb3VuZCcpO1xuXHR9XG5cblx0cmV0dXJuIGluZGV4O1xufVxuXG5jb25zdCByZW1vdmVBdEluZGV4ID0gKGFycmF5LCBpbmRleCkgPT4gYXJyYXkuc3BsaWNlKGluZGV4LCBpbmRleCArIDEpO1xuXG5jb25zdCB0b2RvTWV0aG9kcyA9ICgoKSA9Plxue1xuXHRjb25zdCBrZXlDaGVjayA9ICgoKSA9PlxuXHR7XG5cdFx0Y29uc3QgcmVxS2V5cyA9IHtcblx0XHRcdGNvbXBsZXRlZDogQm9vbGVhbixcblx0XHRcdHRpdGxlOiBTdHJpbmcsXG5cdFx0XHRkZXNjcmlwdGlvbjogU3RyaW5nLFxuXHRcdFx0ZHVlRGF0ZTogRGF0ZSwgXG5cdFx0XHRwcmlvcml0eTogTnVtYmVyLFxuXHRcdH1cblxuXHRcdHJldHVybiB0b2RvSW5mbyA9PlxuXHRcdHtcblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbF0gb2YgT2JqZWN0LmVudHJpZXModG9kb0luZm8pKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29uc3QgdmFsaWRLZXkgPSBPYmplY3Qua2V5cyhyZXFLZXlzKS5pbmNsdWRlcyhrZXkpO1xuXHRcdFx0XHRcdGNvbnN0IGNvcnJlY3RUeXBlID0gdmFsLmNvbnN0cnVjdG9yID09PSByZXFLZXlzW2tleV07XG5cdFxuXHRcdFx0XHRcdGlmKCEodmFsaWRLZXkgJiYgY29ycmVjdFR5cGUpKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0Y2F0Y2hcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0fSkoKVxuXG5cdGNvbnN0IHZhbENoZWNrID0gKCgpID0+XG5cdHtcblx0XHRjb25zdCBwcmlvcml0eVJhbmdlID0ge1xuXHRcdFx0bWluOiAxLFxuXHRcdFx0bWF4OiAzLFxuXHRcdH1cblxuXHRcdHJldHVybiB0b2RvSW5mbyA9PlxuXHRcdHtcblx0XHRcdGNvbnN0IGNoZWNrc0FycmF5ID0gW1xuXHRcdFx0XHR0b2RvSW5mby50aXRsZS5sZW5ndGggPD0gMCxcblx0XHRcdFx0dG9kb0luZm8ucHJpb3JpdHkgPCBwcmlvcml0eVJhbmdlLm1pbixcblx0XHRcdFx0dG9kb0luZm8ucHJpb3JpdHkgPiBwcmlvcml0eVJhbmdlLm1heCxcblx0XHRcdF1cblx0XG5cdFx0XHRmb3IoY29uc3QgY2hlY2sgb2YgY2hlY2tzQXJyYXkpXG5cdFx0XHR7XG5cdFx0XHRcdGlmKGNoZWNrKSByZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9KSgpIFxuXG5cdGNvbnN0IGdldCA9ICgoKSA9PlxuXHR7XG5cdFx0Y29uc3QgZGVlcENvcHkgPSBhcnJheSA9PlxuXHRcdHtcblx0XHRcdGNvbnN0IG5ld0FyciA9IFtdO1xuXG5cdFx0XHRmb3IgKGNvbnN0IG9iaiBvZiBhcnJheSlcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgbmV3T2JqID0ge307XG5cdFx0XHRcdGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBPYmplY3QuZW50cmllcyhvYmopKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bmV3T2JqW2tleV0gPSB2YWw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRuZXdBcnIucHVzaChuZXdPYmopO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbmV3QXJyO1xuXHRcdH1cblxuXHRcdHJldHVybiAodG9kb0xpc3QsIGtleSkgPT5cblx0XHR7XG5cdFx0XHRpZihrZXkpIHtcblx0XHRcdFx0Y29uc3QgdG9kb0luZGV4ID0gZ2V0SW5kZXhGcm9tS2V5KHRvZG9MaXN0LCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gdG9kb0xpc3RbdG9kb0luZGV4XTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuXHRkZWVwQ29weSh0b2RvTGlzdCk7XG5cdFx0fVxuXHR9KSgpXG5cblx0Y29uc3QgYWRkID0gICh0b2RvTGlzdCwgdG9kb0luZm8pID0+XG5cdHtcblx0XHRpZiAodHlwZW9mIHRvZG9JbmZvICE9PSAnb2JqZWN0Jylcblx0XHR7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RvZG9JbmZvIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0aWYgKCFrZXlDaGVjayh0b2RvSW5mbykpXG5cdFx0e1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG9yIG1pc3Npbmcga2V5L3MnKTtcblx0XHR9XG5cblx0XHRpZighdmFsQ2hlY2sodG9kb0luZm8pKVxuXHRcdHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZS9zJyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdG9kb09iaiA9IHtcblx0XHRcdGtleTogZ2V0VW5pcXVlS2V5KCksXG5cdFx0XHRjb21wbGV0ZWQ6IGZhbHNlLFxuXHRcdFx0Li4udG9kb0luZm8sXG5cdFx0fTtcblxuXHRcdHRvZG9MaXN0LnB1c2godG9kb09iaik7XG5cdFx0cmV0dXJuIHRvZG9PYmo7XG5cdH1cblxuXHRjb25zdCByZW1vdmUgPSAodG9kb0xpc3QsIGtleSkgPT5cblx0e1xuXHRcdGNvbnN0IHRvZG9JbmRleCA9IGdldEluZGV4RnJvbUtleSh0b2RvTGlzdCwga2V5KTtcblx0XHRyZXR1cm4gcmVtb3ZlQXRJbmRleCh0b2RvTGlzdCwgdG9kb0luZGV4KTtcblx0fVxuXG5cdGNvbnN0IGVkaXQgPSAoKCkgPT5cblx0e1xuXHRcdGNvbnN0IGVkaXRQcm9wcyA9IChvYmosIGVkaXRPYmopID0+XG5cdFx0e1xuXHRcdFx0aWYoIWtleUNoZWNrKGVkaXRPYmopKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHZhbHVlL3MnKTtcblxuXHRcdFx0Zm9yIChjb25zdCBba2V5LCB2YWxdIG9mIE9iamVjdC5lbnRyaWVzKGVkaXRPYmopKVxuXHRcdFx0e1xuXHRcdFx0XHRvYmpba2V5XSA9IHZhbDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gKHRvZG9MaXN0LCBrZXksIGVkaXRPYmopID0+XG5cdFx0e1xuXHRcdFx0Y29uc3QgdG9kb0luZGV4ID0gZ2V0SW5kZXhGcm9tS2V5KHRvZG9MaXN0LCBrZXkpO1xuXHRcdFx0ZWRpdFByb3BzKHRvZG9MaXN0W3RvZG9JbmRleF0sIGVkaXRPYmopO1xuXHRcdFx0cmV0dXJuIHRvZG9MaXN0W3RvZG9JbmRleF07XG5cdFx0fVxuXHR9KSgpXG5cblx0cmV0dXJuIHtcblx0XHRnZXQsXG5cdFx0YWRkLFxuXHRcdHJlbW92ZSxcblx0XHRlZGl0LFxuXHR9XG59KSgpXG5cbmNvbnN0IHByb2plY3RNZXRob2RzID0gKCgpID0+XG57XG5cdGNvbnN0IHByb2plY3RBcnJheSA9IFtdO1xuXG5cdGNvbnN0IGdldCA9ICgoKSA9PlxuXHR7XG5cdFx0Y29uc3QgZHVwZSA9IChvYmopID0+IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhvYmopKTtcblxuXHRcdHJldHVybiAoa2V5KSA9PlxuXHRcdHtcblx0XHRcdGlmKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gcHJvamVjdEFycmF5Lm1hcChwcm9qZWN0ID0+IGR1cGUocHJvamVjdCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBwcm9qZWN0SW5kZXggPSBnZXRJbmRleEZyb21LZXkocHJvamVjdEFycmF5LCBrZXkpXG5cdFx0XHRcdHJldHVybiBwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XTtcblx0XHRcdH1cblx0XHR9XG5cdH0pKCk7XG5cblx0Y29uc3QgYWRkID0gKHByb2plY3ROYW1lID0gdW5kZWZpbmVkKSA9PlxuXHR7XG5cdFx0aWYgKHR5cGVvZiBwcm9qZWN0TmFtZSAhPT0gJ3N0cmluZycpIHRocm93IG5ldyBUeXBlRXJyb3IoJ05hbWUgbXVzdCBiZSBhIHN0cmluZycpO1xuXHRcdGlmIChwcm9qZWN0TmFtZSA9PT0gJycpIHRocm93IG5ldyBFcnJvcignTmFtZSBtdXN0IG5vdCBiZSBhbiBlbXB0eSBzdHJpbmcnKTtcblxuXHRcdGNvbnN0IHRvZG9MaXN0ID0gW107XG5cdFx0Y29uc3QgcHJvamVjdCA9IHtcblx0XHRcdHByb2plY3ROYW1lLFxuXHRcdFx0a2V5OiBnZXRVbmlxdWVLZXkoKSxcblx0XHRcdHRvZG9zOiB7XG5cdFx0XHRcdGdldDogKGtleSkgPT4gdG9kb01ldGhvZHMuZ2V0KHRvZG9MaXN0LCBrZXkpLFxuXHRcdFx0XHRhZGQ6IHRvZG9JbmZvID0+IHRvZG9NZXRob2RzLmFkZCh0b2RvTGlzdCwgdG9kb0luZm8pLFxuXHRcdFx0XHRyZW1vdmU6IGtleSA9PiB0b2RvTWV0aG9kcy5yZW1vdmUodG9kb0xpc3QsIGtleSksXG5cdFx0XHRcdGVkaXQ6IChrZXksIGVkaXRPYmopID0+IHRvZG9NZXRob2RzLmVkaXQodG9kb0xpc3QsIGtleSwgZWRpdE9iaiksXG5cdFx0XHR9LFxuXHRcdH1cblxuXHRcdHByb2plY3RBcnJheS5wdXNoKHByb2plY3QpO1xuXHRcdHJldHVybiBwcm9qZWN0O1xuXHR9XG5cblx0Y29uc3QgcmVtb3ZlID0gKGtleSkgPT5cblx0e1xuXHRcdGNvbnN0IHByb2plY3RJbmRleCA9IGdldEluZGV4RnJvbUtleShwcm9qZWN0QXJyYXksIGtleSk7XG5cdFx0cmV0dXJuIHJlbW92ZUF0SW5kZXgocHJvamVjdEFycmF5LCBwcm9qZWN0SW5kZXgpO1xuXHR9XG5cblx0Y29uc3QgY2hhbmdlTmFtZSA9ICgoKSA9PlxuXHR7XG5cdFx0cmV0dXJuIChrZXksIG5ld05hbWUpID0+XG5cdFx0e1xuXHRcdFx0aWYodHlwZW9mIG5ld05hbWUgIT09ICdzdHJpbmcnKSByZXR1cm47XG5cblx0XHRcdGNvbnN0IHByb2plY3RJbmRleCA9IGdldEluZGV4RnJvbUtleShwcm9qZWN0QXJyYXksIGtleSk7XG5cdFx0XHRwcm9qZWN0QXJyYXlbcHJvamVjdEluZGV4XS5wcm9qZWN0TmFtZSA9IG5ld05hbWU7XG5cdFx0fTtcblx0fSkoKVxuXG5cdHJldHVybiB7XG5cdFx0Z2V0LFxuXHRcdGFkZCxcblx0XHRyZW1vdmUsXG5cdFx0Y2hhbmdlTmFtZSxcblx0fVxufSkoKVxuXG5leHBvcnQgZGVmYXVsdCBwcm9qZWN0TWV0aG9kcztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCBwcm9qZWN0IGZyb20gJy4vbW9kdWxlcy9wcm9qZWN0cyc7XG5pbXBvcnQgcHJvamVjdENvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdENvbXBvbmVudCc7XG5pbXBvcnQgY29tcG9uZW50IGZyb20gJy4vbW9kdWxlcy9jb21wb25lbnQnO1xuaW1wb3J0IG1vZGFsIGZyb20gJy4vbW9kdWxlcy9tb2RhbCc7XG5pbXBvcnQgaW5wdXRXcmFwcGVyIGZyb20gJy4vY29tcG9uZW50cy9pbnB1dFdyYXBwZXInO1xuaW1wb3J0ICogYXMgcGVyc2lzdCBmcm9tICcuL21vZHVsZXMvcGVyc2lzdGVudFNhdmUnO1xuaW1wb3J0ICcuL25vcm1hbGl6ZS5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbmNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdENvbnRhaW5lcicpO1xucGVyc2lzdC5sb2FkKHByb2plY3RDb250YWluZXIpO1xuXG5jb25zdCBhZGRQcm9qZWN0ID0gKG5hbWUpID0+XG57XG5cdHRyeVxuXHR7XG5cdFx0Ly8gQWRkIHRvIHN0b3JhZ2UgYW5kIGdldCBrZXlcblx0XHRjb25zdCBwcm9qZWN0S2V5ID0gcHJvamVjdC5hZGQobmFtZSkua2V5O1xuXHRcblx0XHQvLyBBcHBlbmQgZWxlbWVudCB0byBwcm9qZWN0Q29udGFpbmVyXG5cdFx0Y29uc3QgcHJvamVjdEVsZW0gPSBwcm9qZWN0Q29tcG9uZW50KG5hbWUsIHByb2plY3RLZXkpO1xuXHRcdHByb2plY3RDb250YWluZXIuYXBwZW5kKHByb2plY3RFbGVtKTtcblx0XHRwZXJzaXN0LnNhdmUoKTtcblx0XHRtb2RhbC5oaWRlKCk7XG5cdH1cblx0Y2F0Y2ggKGUpXG5cdHtcblx0XHRpZihlLm1lc3NhZ2UgPT09ICdOYW1lIG11c3Qgbm90IGJlIGFuIGVtcHR5IHN0cmluZycpXG5cdFx0e1xuXHRcdFx0YWxlcnQoJ1Byb2plY3QgbmFtZSBtdXN0IG5vdCBiZSBhbiBlbXB0eSBzdHJpbmchJylcblx0XHR9XG5cdFx0ZWxzZSB0aHJvdyBlO1xuXHR9XG59XG5cbmNvbnN0IGdldE5vZGVzID0gKCkgPT5cbntcblx0Y29uc3Qgbm9kZUNvbnRhaW5lciA9IG5ldyBEb2N1bWVudEZyYWdtZW50KCk7XG5cblx0Y29uc3QgaGVhZGVyID0gY29tcG9uZW50KCdoMicsIHtcblx0XHRwcm9wczoge1xuXHRcdFx0Y2xhc3M6IFtcblx0XHRcdFx0J2hlYWRpbmcnLFxuXHRcdFx0XHQnbm9TaWRlTWFyZ2luJyxcblx0XHRcdF0sXG5cdFx0fSxcblx0XHRjaGlsZHJlbjogW1xuXHRcdFx0J0NyZWF0ZSBuZXcgUHJvamVjdCdcblx0XHRdXG5cdH0pXG5cblx0Y29uc3QgbmFtZUlucHV0ID0gaW5wdXRXcmFwcGVyKCdQcm9qZWN0IG5hbWUnLCBjb21wb25lbnQoJ2lucHV0Jywge1xuXHRcdHByb3BzOiB7XG5cdFx0XHR0eXBlOiAndGV4dCcsXG5cdFx0XHRpZDogJ3Byb2plY3ROYW1lSW5wdXQnLFxuXHRcdH1cblx0fSksIHtcblx0XHRjbGFzczogW1xuXHRcdFx0J2ZsZXhHcm93J1xuXHRcdF1cblx0fSlcblxuXHRjb25zdCBzdWJtaXRCdG4gPSBjb21wb25lbnQoJ2J1dHRvbicsIHtcblx0XHRwcm9wczoge1xuXHRcdFx0aWQ6ICdwcm9qZWN0U3VibWl0QnRuJyxcblx0XHRcdG9uY2xpY2s6ICgpID0+IGFkZFByb2plY3QobmFtZUlucHV0LmlucHV0RWxlbS52YWx1ZSksXG5cdFx0fSxcblx0XHRjaGlsZHJlbjogW1xuXHRcdFx0J0NyZWF0ZSdcblx0XHRdXG5cdH0pXG5cblx0Y29uc3QgZmxleERpdiA9IGNvbXBvbmVudCgnZGl2Jywge1xuXHRcdHByb3BzOiB7XG5cdFx0XHRjbGFzczogW1xuXHRcdFx0XHQnY2VudGVyRGl2J1xuXHRcdFx0XVxuXHRcdH0sXG5cdFx0Y2hpbGRyZW46IFtcblx0XHRcdG5hbWVJbnB1dC5lbGVtLFxuXHRcdFx0c3VibWl0QnRuLFxuXHRcdF1cblx0fSk7XG5cblx0bm9kZUNvbnRhaW5lci5hcHBlbmQoIGhlYWRlciwgZmxleERpdiApO1xuXHRyZXR1cm4gbm9kZUNvbnRhaW5lcjtcbn1cblxuY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGRQcm9qZWN0Jyk7XG5hZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gbW9kYWwuc2hvdyhnZXROb2RlcygpKSlcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==