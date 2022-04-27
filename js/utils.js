function remove(array, item) {
	const index = array.indexOf(item);
	if (index !== -1) {
	  array.splice(index, 1);
	}
}
	
function findParent(roots, parent) {
	for(let r in roots) {
		const root = roots[r];
		if(root.code === parent) {
			return root;
		}
		if(root.children.length > 0) {
			const value = findParent(root.children, parent);
			if(value != null) {
				return value;
			}
		}
	}
	return null;
}