function generateId() {
	return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function createStore(reducer) {
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

// Reducers
const ADD_TODO = 'ADD_TODO',
	REMOVE_TODO = 'REMOVE_TODO',
	TOGGLE_TODO = 'TOGGLE_TODO',
	ADD_GOAL = 'ADD_GOAL',
	REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction(todo) {
	return {
		type: ADD_TODO,
		todo
	}
}

function removeTodoAction(id) {
	return {
		type: REMOVE_TODO,
		id
	}
}

function toggleTodoAction(id) {
	return {
		type: TOGGLE_TODO,
		id
	}
}

function addGoalAction(goal) {
	return {
		type: ADD_GOAL,
		goal
	}
}

function removeGoalAction(id) {
	return {
		type: REMOVE_GOAL,
		id
	}
}

function todos(state = [], action) {
	switch (action.type) {
		case ADD_TODO :
			return state.concat([action.todo]);
		case REMOVE_TODO :
			return state.filter((todo) => todo.id !== action.id);
		case TOGGLE_TODO :
			return state.map((todo) => todo.id !== action.id ? todo :
				Object.assign({}, todo, {complete: !todo.complete}));
		default:
			return state;
	}
}

function goals(state = [], action) {
	switch (action.type) {
		case ADD_GOAL :
			return state.concat([action.goal]);
		case REMOVE_GOAL :
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

const store = createStore(app);

store.subscribe(() => {
	const {todos, goals} = store.getState();
	
	document.getElementById('todos').innerHTML = '';
	document.getElementById('goals').innerHTML = '';
	
	todos.forEach(addTodoToDOM);
	goals.forEach(addGoalToDOM);
});

function addTodo() {
	const input = document.getElementById('todo'),
		name = input.value;
	input.value = '';
	
	if (!name) return;
	
	store.dispatch(addTodoAction({
		name,
		id: generateId(),
		complete: false
	}));
}

function addGoal() {
	const input = document.getElementById('goal'),
		name = input.value;
	input.value = '';
	
	if (!name) return;
	
	store.dispatch(addGoalAction({
		name,
		id: generateId()
	}));
}

function addTodoToDOM(todo) {
	const node = document.createElement('li'),
		text = document.createTextNode(todo.name),
		removeBtn = createRemoveBtn(() => {
			store.dispatch(removeTodoAction(todo.id))
		});
	node.appendChild(text);
	node.appendChild(removeBtn);
	
	node.style.textDecoration = todo.complete ? 'line-through' : 'none';
	node.addEventListener('click', () => {
		store.dispatch(toggleTodoAction(todo.id));
	});
	
	document.getElementById('todos').appendChild(node);
}

function addGoalToDOM(goal) {
	const node = document.createElement('li'),
		text = document.createTextNode(goal.name),
		removeBtn = createRemoveBtn(() => {
			store.dispatch(removeGoalAction(goal.id));
		});
	node.appendChild(text);
	node.appendChild(removeBtn);
	
	document.getElementById('goals').appendChild(node);
}

function createRemoveBtn(onClick) {
	const removeBtn = document.createElement('button');
	removeBtn.type = 'button';
	removeBtn.innerText = 'X';
	removeBtn.addEventListener('click', onClick);
	
	return removeBtn;
}

document.getElementById('todoBtn').addEventListener('click', addTodo);

document.getElementById('goalBtn').addEventListener('click', addGoal);