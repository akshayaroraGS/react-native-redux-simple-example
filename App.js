/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput, ListView, Image, Alert } from 'react-native';
import { connect } from 'react-redux';

class App extends Component {
	state = { text: '' };

	onTextChange(text) {
		this.setState({ text });
	}

	btnClick() {
		if (!!this.state.text) {
			this.props.dispatchAddFriend({ name: this.state.text });
			this.setState({ text: '' });
		} else {
			Alert.alert('Error',"Please enter a friend's Name");
		}
	}

	renderRow(row) {
		return (
			<View style={styles.rowView}>
				<Text style={styles.rowText}>{row.name}</Text>
				<TouchableOpacity onPress={() => this.props.dispatchDeleteFriend(row)}>
					<Image
						style={{ height: 30, width: 30, alignContent: 'flex-end', alignSelf: 'flex-end' }}
						source={require('./images/delete.png')}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		this.data = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(this.props.friends);
		return (
			<View style={styles.container}>
				{this.props.friends.lenght !== 0 ? (
					<ListView style={styles.list} dataSource={this.data} renderRow={this.renderRow.bind(this)} />
				) : (
					<Text>No Data Found</Text>
				)}
				<View style={styles.line} />
				<TextInput
					style={styles.textInput}
					value={this.state.text}
					onChangeText={this.onTextChange.bind(this)}
					placeholder="Enter Name"
					placeholderTextColor="grey"
				/>
				<TouchableOpacity style={styles.btnFooter} onPress={this.btnClick.bind(this)}>
					<Text style={{ color: 'white', fontSize: 20 }}> Add Data </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	list: {
		flex: 1,
		backgroundColor: '#0339e9',
		width: '100%',
		top: 20
	},
	rowView: { flex: 1, flexDirection: 'row', width: '100%', backgroundColor: '#e1f1d1', paddingVertical: 5 },
	rowText: { flex: 1, fontSize: 20, color: 'grey', fontWeight: 'bold', padding: 5 },
	textInput: {
		height: 40,
		width: '100%',
		backgroundColor: '#d4deff',
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 20,
		position: 'absolute',
		bottom: 50
	},
	line: { width: '100%', height: 1, backgroundColor: 'grey', bottom: 90, position: 'absolute' },
	btnFooter: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: 50,
		backgroundColor: '#232326',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

//actions

const addFriend = function(friend) {
	return {
		type: 'add',
		friend
	};
};

const deleteFriend = function(friend) {
	return {
		type: 'delete',
		friend
	};
};

// action close

const mapStateToProps = function(state) {
	return { friends: state.friends.friends };
};
const mapDispatchToProps = function(dispach) {
	return {
		dispatchAddFriend: friend => dispach(addFriend(friend)),
		dispatchDeleteFriend: friend => dispach(deleteFriend(friend))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
