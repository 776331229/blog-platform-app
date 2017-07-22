/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import Icons from 'react-native-vector-icons/Ionicons'
import {
    AppRegistry,
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            up: 1  // 是否点赞，1：点赞，0：不点赞
        }
    }

    render() {
        let row = this.props.row;
        return (
            <TouchableHighlight onPress={this.props.onGoNext}>
                <View style={styles.rowItem}>
                    <Text style={styles.rowTitle}>{row.title}</Text>
                    <Image
                        style={styles.rowItemImage}
                        source={{uri: row.image}}
                    >
                        <Icons
                            name="ios-play"
                            size={28}
                            style={styles.playIcon}
                        />
                    </Image>
                    <View style={styles.handleBox}>
                        <View style={styles.handleItem}>
                            <Icons
                                name={row.up === 1 ? 'ios-heart' : 'ios-heart-outline'}
                                style={[styles.handleIcon,row.up === 1? styles.up : null ]}
                            />
                            <Text style={[styles.handleText , row.up === 1 ? styles.up : null ]}>喜欢</Text>
                        </View>
                        <View style={styles.handleItem}>
                            <Icons
                                name="ios-chatboxes-outline"
                                style={styles.handleIcon}
                            />
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

let styles = StyleSheet.create({
    rowItem: {
        width: Dimensions.get('window').width,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    rowTitle: {
        padding: 10,
    },
    rowItemImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 0.56,
    },
    playIcon: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        width: 46,
        height: 46,
        paddingTop: 9,
        paddingLeft: 18,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 23,
        backgroundColor: 'transparent',
        color: '#ee735c',
    },
    handleBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee'

    },
    handleItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        width:Dimensions.get('window').width/2 - 0.5,
        padding: 10,
        backgroundColor: '#fff',

    },
    handleIcon: {
        fontSize: 18,
        color: '#333'
    },
    up: {
        color: '#ee735c'
    },

    handleText: {
        paddingLeft: 5,
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    }
});

AppRegistry.registerComponent('ListItem', () => ListItem);
