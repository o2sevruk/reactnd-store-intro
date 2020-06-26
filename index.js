function createState() {
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
	
	return {
		getState,
		subscribe
	}
}

const store = createState();

store.subscribe(() => {
	console.log('The new state is: ', store.getState());
});

store.subscribe(() => {
	console.log('The store changed!');
});