/* Create An Action Creator
 *
 * You need to create an action creator called 'mealCreator' that should:
 *   - Accept an id
 *   - Return a Redux action with a 'type' property that has a value of 'CREATE_MEAL'
 *   - Include the id passed to the action creator
*/

const CREATE_MEAL = 'CREATE_MEAL';

function mealCreator(id) {
	return {
		type: CREATE_MEAL,
		id
	}
}