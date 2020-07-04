/* Create A Reducer
 *
 * You need to create a reducer called "appReducer" that accepts two arguments:
 * - First, an array containing information about ice cream
 * - Second, an object with a 'DELETE_FLAVOR' `type` key
 * (i.e., the object contains information to delete the flavor from the state)
 *
 * The action your reducer will receive will look like this:
 * { type: 'DELETE_FLAVOR', flavor: 'Vanilla' }
 *
 * And the initial state will look something like this (as such, refrain
 * from passing in default values for any parameters!):
 * [{ flavor: 'Chocolate', count: 36 }, { flavor: 'Vanilla', count: 210 }];
*/

const arr = [
	{flavor: 'Chocolate', count: 36},
	{flavor: 'Vanilla', count: 210}
];

function appReducer(state, action) {
	if (action.type === 'DELETE_FLAVOR') {
		return state.filter((f) => f.flavor !== action.flavor);
	}
	
	return state;
}

console.log(appReducer(arr, {
	type: 'DELETE_FLAVOR',
	flavor: 'Vanilla'
}));