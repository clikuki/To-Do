/**
 * 
 * @param {String} tag - The tag of the element
 * @param {Object} options - Options for the element
 * @param {Object} options.props - Properties of the element
 * @param {Array} options.children - An array of nodes
 * @returns {HTMLElement} Returns a node with the specifed tag
 */
export default (tag, { props = {}, children = [] }) =>
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
}
