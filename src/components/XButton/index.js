/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

export default class XButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'确定',
            disabled: false // 按钮是否可用
        }
    }

    /**
     * 把按钮设置成不可用，
     * */
    _disabled(){
        this.setState({
            disabled : true
        });
    }

    /**
     * 把按钮设置成可用
     * */
    _enabled(){
        this.setState({
            disabled : false
        });
    }

    render() {
        const {marginTop,bgColor} = this.props;
        return (
            <TouchableOpacity
                onPress={this.props.onClick}
                disabled={this.state.disabled}
                style={[styles.button , { marginTop: marginTop , backgroundColor: bgColor || '#3077d1' } , this.state.disabled && styles.disabled ]}
            >
                <Text style={styles.buttonText}>
                    {this.props.text || '确定'}
                </Text>
            </TouchableOpacity>
        );
    }
}

let styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        width:Dimensions.get('window').width - 60,
        marginLeft: 30,
        padding: 10,
        borderRadius: 3
    },
    buttonText: {
        color: '#ffff'
    },
    disabled: {
        backgroundColor: 'gray'
    }
});

AppRegistry.registerComponent('XButton', () => XButton);
