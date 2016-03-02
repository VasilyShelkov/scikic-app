const ChatReducer = (state = {}, action) => {
	switch(action.type) {
		case 'INTERESTED':
			return {
				interested: action.interested
			};
		default:
			return state;
	};
}

export default ChatReducer;