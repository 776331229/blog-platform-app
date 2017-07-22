/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';
import Login from './views/login'

export default class AwesomeProject extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let DEFAULT_NAME = 'Login';

        return (
            <Navigator
                initialRoute={{ name: DEFAULT_NAME, component: Login }}
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromRight;
                  }}
                renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }} />

        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
