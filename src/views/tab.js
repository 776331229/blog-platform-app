/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Navigator,
    TabBarIOS
} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons'
import Home from './homePage/home'

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedTab: 'homeTab'
        }
    }

    _renderContent(color: string, pageText: string, num?: number) {
        return (
            <View style={[styles.tabContent, {backgroundColor: color}]}>
                <Text style={styles.tabText}>{pageText}</Text>
                <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
            </View>
        );
    }

    render() {
        return (
            <TabBarIOS
                unselectedTintColor="#565e6a"
                tintColor="#57b1f8"
                barTintColor="white">
                <Icons.TabBarItem
                    title="首页"
                    iconName="ios-home-outline"
                    selectedIconName="ios-home"
                    selected={this.state.selectedTab === 'homeTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'homeTab',
                        });
                    }}>
                    <Navigator
                        initialRoute={{
                            name: 'home',
                            component: Home,
                            title: '首页',
                        }}

                        renderScene={
                            (route , navigator)=>{
                                let Component = route.component;
                                return <Component {...route.component} navigator={navigator} />
                            }
                        }
                    />
                </Icons.TabBarItem>
                <Icons.TabBarItem
                    title="录制"
                    iconName="ios-videocam-outline"
                    selectedIconName="ios-videocam"
                    selected={this.state.selectedTab === 'videoCameraTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'videoCameraTab',
                        });
                    }}>
                    {this._renderContent('#414A8C', '录制')}
                </Icons.TabBarItem>
                <Icons.TabBarItem
                    title="我的"
                    iconName="ios-person-outline"
                    selectedIconName="ios-person"
                    selected={this.state.selectedTab === 'myTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'myTab',
                        });
                    }}>
                    {this._renderContent('#414A8C', '我的')}
                </Icons.TabBarItem>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
});

AppRegistry.registerComponent('Tab', () => Tab);
