import expect from 'expect';
import deepFreeze from 'deep-freeze';
import ChatReducer from './ChatReducer'

describe(ChatReducer, () => {
	it('should set interested to action', () => {
		const stateBefore = {};
		const action = {
			type: 'INTERESTED',
			interested: false
		};

		const stateAfter = { interested: false };
		
		deepFreeze(stateBefore);
		deepFreeze(action);

		expect(ChatReducer(stateBefore, action)).toEqual(stateAfter);
	});
});