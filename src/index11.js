/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    ListView,
    Navigator,
    TouchableOpacity,
    ActivityIndicator,
    Button,
    DatePickerIOS,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Navigator
} from 'react-native';
import Nav from './components/ListItem/'
import Login from './views/login'

export default class AwesomeProject extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    key: 1,
                    value: '123'
                },
                {
                    key: 2,
                    value: '2222'
                },
                {
                    key: 3,
                    value: '3333'
                },
                {
                    key: 3,
                    value: '3333'
                },
                {
                    key: 3,
                    value: '3333'
                },
                {
                    key: 3,
                    value: '3333'
                }
            ]),
            show: false,
            date: new Date()
        };
    }

    showLoading = () => {
        this.setState(
            {
                show: true
            }
        );
    };

    onDateChange = (date) => {
        this.setState({date: date});
    };

    render() {
        let DEFAULT_NAME = 'Login';

        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=> <Text>{rowData.value}</Text>}
                ></ListView>
                <View>
                    <NavBar>
                        <NavTitle>
                            <Text>assdasdas</Text>
                        </NavTitle>

                    </NavBar>
                </View>
                <TouchableOpacity
                    style={ styles.customBtn }
                    onLongPress={ this.showLoading }
                >
                    <Text style={styles.btnText}>确定</Text>
                </TouchableOpacity>

                <Button
                    title="Learn More"
                    color="#841584"
                    onPress={ this.showLoading }
                ></Button>

                {/* loading */}
                <ActivityIndicator
                    animating={this.state.show}
                    size="large"
                ></ActivityIndicator>

                <DatePickerIOS
                    date={this.state.date}
                    onDateChange={this.onDateChange}
                ></DatePickerIOS>

                <Image
                    style={styles.imageSie}
                    source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                />

                <KeyboardAvoidingView
                    behavior="position"
                    style={styles.container}
                >

                    <TextInput
                        placeholder="123123"
                        style={styles.textInput}
                    />
                </KeyboardAvoidingView>

                <Nav></Nav>

                <Navigator
                    initialRoute={{ name: DEFAULT_NAME, component: Login }}
                    configureScene={(route) => {
                        return Navigator.SceneConfigs.VerticalDownSwipeJump;
                      }}
                    renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }} />
            </View>

        );
    }
}

let styles = {
    customBtn: {
        width: 100,
        height: 30,
        backgroundColor: '#f00',
        borderRadius: 100,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    btnText: {
        textAlign: 'center'
    },
    imageSie: {
        width: 100,
        height: 100
    },
    textInput: {
        borderRadius: 5,
        borderWidth: 1,
        height: 44,
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
