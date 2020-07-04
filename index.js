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
	switch (action.type) {
		case 'ADD_TODO' :
			return state.concat([action.todo]);
		case 'REMOVE_TODO' :
			return state.filter((todo) => todo.id !== action.id);
		case 'TOGGLE_TODO' :
			return state.map((todo) => todo.id !== action.id ? state :
				Object.assign({}, todo, {complete: !todo.complete}));
		default:
			return state;
	}
}

function goals(state = [], action) {
	switch (action.type) {
		case 'ADD_GOAL' :
			return state.concat([action.goal]);
		case 'REMOVE_GOAL' :
			return state.filter((goal) => goal.id !== action.id);
		default :
			return state;
	}
}

function app(state = {}, action) {
	return {
		todos: todos(state.todos, action),
		goals: goals(state.goals, action)
	}
}

const store = createState(app);

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