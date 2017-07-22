/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react'
import Icons from 'react-native-vector-icons/Ionicons'
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

export default class XButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const {title} = this.props;
        return (
            <View style={styles.headerBox}>
                <TouchableOpacity onPress={this.props.onBack} style={styles.headerBack}>
                    <Icons
                        name="ios-arrow-back"
                        size={20}
                        style={styles.headerBackIcon}
                    />
                    <Text style={styles.headerBackText}>返回</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.headerTitle}>{title}</Text>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    headerBox: {
        width: Dimensions.get('window').width,
        paddingTop: 3,
        paddingBottom: 12
    },
    headerBack: {
        position: 'absolute',
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerBackIcon: {
        color: '#333',
        fontSize: 20,
        marginRight: 5
    },
    headerBackText: {
        color: '#333'
    },
    headerTitle: {
        width: Dimensions.get('window').width - 120,
        marginLeft: 60,
        textAlign: 'center'
    },
});

AppRegistry.registerComponent('XButton', () => XButton);
