/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import Icons from 'react-native-vector-icons/Ionicons'
import XButton from './../components/XButton/index'
import TextInput from './../components/XTextInput'
import Tab from './tab'
import Register from './register'
import Toast, {DURATION} from 'react-native-easy-toast'
import config from './../utils/config'
import http from './../utils/http'
import * as utils from './../utils/util'
import {
    AppRegistry,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type : 1,
            username:'',
            password:'',
            passType: true, // 密码是否密文显示

        };
    }

    /**
     * 检测输入的注册信息是否正确
     * */
    _checkInfo(){
        const regexper = {
            phone: /^1[3578]\d{9}$/,
            password: /^[\w|\d]{6,16}/
        };
        if(!this.state.username){
            this.refs.toast.show('请输入用户名');
            return false;
        } else if(!regexper.password.test(this.state.password)){
            this.refs.toast.show('请输入6-16位的密码');
            return false;
        }
        return true;
    }

    /**
     * 登录
     * */
    _login() {
        // 检测输入信息是否正确
        if(!this._checkInfo()){
            return;
        }

        http.post(config.api.base+'/user/login' , {
            username: this.state.username,
            password: this.state.password,
        }).then((res)=>{
            this.refs.toast.show(res.message);
            if(res.success){
                setTimeout(()=>{
                    this._goHome();
                },500)
            }
        }).catch((error) => {
            console.error(error);
        });



    }

    /**
     * 登录成功，跳转到首页
     * */
    _goHome(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'tab',
                component: Tab,
            })
        }
    }

    /**
     * 注册
     * */
    _register() {
        const { navigator } = this.props;
        console.log("asdasd");
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'register',
                component: Register,
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Toast ref="toast"/>
                <View style={styles.iconBox}>
                    <Image
                        style={styles.logoIcon}
                        source={require('./../assets/icons/logo_img.png')}
                    ></Image>
                </View>
                <View style={styles.inputBox}>
                    <View style={styles.userInputBox}>
                        <Image
                            style={styles.userIcon}
                            source={require('./../assets/icons/login/login_user_icon.png')}
                        ></Image>
                        <TextInput
                            style={styles.userInput}
                            value={this.state.username}
                            placeholder="请输入用户名"
                            placeholderTextColor="#ccc"
                            onChangeText={(text) => this.setState({username:text})}
                        />
                    </View>
                    <View style={styles.passInputBox}>
                        <Image
                            style={styles.passIcon}
                            source={require('./../assets/icons/login/login_pass_icon.png')}
                        ></Image>
                        <TextInput
                            style={styles.passInput}
                            value={this.state.password}
                            secureTextEntry={this.state.passType}
                            placeholder="请输入密码"
                            placeholderTextColor="#ccc"
                            onChangeText={(text) => this.setState({password:text})}
                        />
                        <Icons
                            name={this.state.passType ? 'ios-eye-outline' : 'ios-eye'}
                            color={config.theme.skinColor}
                            onPress={() => this.setState({passType:!this.state.passType})}
                            style={styles.passEye}
                        />
                    </View>
                </View>

                <XButton
                    onClick={this._login.bind(this)}
                    text="登录"
                    marginTop={utils.computeSize(50)}
                />

                <View style={styles.operationBox}>
                    <TouchableOpacity
                        onPress={this._register.bind(this)}
                    >
                        <Text style={{color:'#ccc',fontSize: utils.computeSize(26)}}>忘记密码?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this._register.bind(this)}
                    >
                        <Text style={{color:config.theme.skinColor,fontSize: utils.computeSize(26)}}>快速注册</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

let styles = {
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: config.theme.bgColor
    },
    iconBox : {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: utils.computeSize(233),
    },
    logoIcon : {
        width: utils.computeSize(182),
        height: utils.computeSize(182)
    },
    inputBox : {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        marginTop: utils.computeSize(50),
    },
    userInputBox:{
        width: utils.computeSize(560),
        height: utils.computeSize(65),
        borderColor: '#eee',
        borderBottomWidth: 1,
    },
    userIcon: {
        position: 'absolute',
        left: 0,
        bottom: utils.computeSize(10),
        width: utils.computeSize(39),
        height: utils.computeSize(39)
    },
    userInput: {
        height: utils.computeSize(65),
        paddingLeft: utils.computeSize(87),
        fontSize: utils.computeSize(28),
    },
    passInputBox:{
        width: utils.computeSize(560),
        height: utils.computeSize(65),
        marginTop: utils.computeSize(22),
        borderColor: '#eee',
        borderBottomWidth: 1
    },
    passIcon: {
        position: 'absolute',
        left: 0,
        bottom: utils.computeSize(10),
        width: utils.computeSize(39),
        height: utils.computeSize(39)
    },
    passInput: {
        height: utils.computeSize(65),
        paddingLeft: utils.computeSize(87),
        fontSize: utils.computeSize(28),
    },
    passEye: {
        position: 'absolute',
        right: 0,
        bottom: utils.computeSize(5),
        fontSize: utils.computeSize(40),
    },
    operationBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: utils.computeSize(560),
        marginLeft: utils.computeSize(96),
        marginTop: utils.computeSize(30),
    }
}

AppRegistry.registerComponent('Login', () => Login);
