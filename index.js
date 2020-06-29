function createState(reducer) {
	// The store should have four parts
	// 1. The state
	// 2. Get the state.
	// 3. Listen to changes on the state.
	// 4. Update the state
	
	let state,
		listeners = [];
	
	const getState = () => state;
	
	const subscribe = (listener) => {
		listeners.push(listener);
		
		return () => {
			listeners = listeners.filter((l) => l !== listener);
		}
	}
	
	const dispatch = (action) => {
		state = reducer(state, action);
		
		listeners.forEach((listener) => listener());
	}
	
	return {
		getState,
		subscribe,
		dispatch
	}
}

function todos(state = [], action) {
	if (action.type === 'ADD_TODO') {
		return state.concat([action.todo]);
	}
	
	return state;
}

const store = createState(todos);

store.subscribe(() => {
	console.log('The new state is: ', store.getState());
});

store.dispatch({
	type: 'ADD_TODO',
	todo: {
		id: 0,
		title: 'Read a book',
		state: false
	}
});