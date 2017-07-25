/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import * as utils from './../../utils/util'
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
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
        const {marginTop,bgColor,borderBtn} = this.props;
        return (
            <View style={styles.buttonBox}>
                <TouchableOpacity
                    onPress={this.props.onClick}
                    disabled={this.state.disabled}
                    style={[styles.button , { marginTop: marginTop , backgroundColor: bgColor || '#7fd2c5' } , this.state.disabled && styles.disabled ]}
                >
                    <Text style={styles.buttonText}>
                        {this.props.text || '确定'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    buttonBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        width:utils.computeSize(560),
        paddingTop: utils.computeSize(25),
        paddingBottom: utils.computeSize(25),
        borderRadius: 3
    },
    buttonText: {
        color: '#ffff',
        fontSize: utils.computeSize(34),
    },
    disabled: {
        backgroundColor: 'gray'
    }
});

AppRegistry.registerComponent('XButton', () => XButton);
