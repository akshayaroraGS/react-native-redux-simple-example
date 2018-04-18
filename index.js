//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import App from './App';

//const
const ADD_PERSON = 'add';
const DELETE_PERSON = 'delete';

//reducer

const initialState = { friends: [{ name: 'Akshay' }] };
const friendsReducer = function(state = initialState, action) {
	switch (action.type) {
		case ADD_PERSON:
			return {
				friends: [...state.friends, action.friend]
			};
		case DELETE_PERSON:
			return {
				friends: state.friends.filter(p => p.name !== action.friend.name)
			};
		default:
			return state;
	}
};

// create a component
class MyClass extends Component {
	render() {
		return (
			<Provider store={createStore(combineReducers({ friends: friendsReducer }))}>
				<App />
			</Provider>
		);
	}
}

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2c3e50'
	}
});

AppRegistry.registerComponent('ReduxExample', () => MyClass);
