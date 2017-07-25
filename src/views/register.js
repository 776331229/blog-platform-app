/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import Icons from 'react-native-vector-icons/Ionicons'
import XButton from './../components/XButton/index'
import XHeader from './../components/XHeader/index'
import Toast, {DURATION} from 'react-native-easy-toast'
import Login from './login'
import config from './../utils/config'
import http from './../utils/http'
import TextInput from './../components/XTextInput'
import * as utils from './../utils/util'
import {
    AppRegistry,
    View,
    Image
} from 'react-native';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type : 1,
            username:'',
            password:'',
            confirmPassword:'',
            passType: true, // 密码是否密文显示
            nickName:'',
            sex:'男',
            phone:'',
            email:'',
            address:''
        };
    }

    /**
     * 检测输入的注册信息是否正确
     * */
    _checkInfo(){
        const regexper = {
            phone: /^1[3578]\d{9}$/,
            password: /^[\w|\d]{6,16}/,
            email: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.(?:com|cn)$/,
        };
        if(!this.state.username){
            this.refs.toast.show('请输入用户名');
            return false;
        } else if(!regexper.password.test(this.state.password)){
            this.refs.toast.show('请输入6-16位的密码');
            return false;
        } else if(this.state.confirmPassword !== this.state.password){
            this.refs.toast.show('密码输入不一致');
            return false;
        } else if(!this.state.nickName){
            this.refs.toast.show('请输入昵称');
            return false;
        } else if(!regexper.phone.test(this.state.phone)){
            this.refs.toast.show('请输入正确的手机号码');
            return false;
        } else if(!regexper.email.test(this.state.email)){
            this.refs.toast.show('请输入正确的邮箱地址');
            return false;
        } else if(!this.state.address){
            this.refs.toast.show('请输入联系地址');
            return false;
        }
        return true;
    }

    /**
     * 注册
     * */
    _register() {
        // 检测输入信息是否正确
        if(!this._checkInfo()){
          return;
        }

        http.get(config.api.base+'/user/addUser' , {
            username: this.state.username,
            password: this.state.password,
            sex: this.state.sex,
            nickName: this.state.nickName,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
        }).then((res)=>{
            if(res.success){
                // this._handleData(res);
                this.refs.toast.show('注册成功');
                setTimeout(()=>{
                    this._goLogin();
                },500)

            }
        }).catch((error) => {
            console.error(error);
        });
    }

    /**
     * 注册成功后，跳转到登录页面
     * */
    _goLogin(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'login',
                component: Login,
            })
        }
    }

    /**
     * 返回上一页
     * */
    _back(){
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Toast ref="toast"/>
                <XHeader
                    onBack={this._back.bind(this)}
                />
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
                    <View style={styles.passInputBox}>
                        <Image
                            style={styles.passIcon}
                            source={require('./../assets/icons/login/login_pass_icon.png')}
                        ></Image>
                        <TextInput
                            style={styles.passInput}
                            value={this.state.confirmPassword}
                            secureTextEntry={this.state.passType}
                            placeholder="请输入确认密码密码"
                            placeholderTextColor="#ccc"
                            onChangeText={(text) => this.setState({confirmPassword:text})}
                        />
                    </View>
                    <View style={styles.passInputBox}>
                        <Image
                            style={styles.passIcon}
                            source={require('./../assets/icons/login/login_pass_icon.png')}
                        ></Image>
                        <TextInput
                            style={styles.passInput}
                            value={this.state.nickName}
                            placeholder="请输入昵称"
                            placeholderTextColor="#ccc"
                            onChangeText={(text) => this.setState({nickName:text})}
                        />
                    </View>
                    <View style={styles.passInputBox}>
                        <Image
                            style={styles.passIcon}
                            source={require('./../assets/icons/login/login_pass_icon.png')}
                        ></Image>
                        <TextInput
                            style={styles.passInput}
                            value={this.state.phone}
                            placeholder="请输入手机号码"
                            placeholderTextColor="#ccc"
                            keyboardType="phone-pad"
                            onChangeText={(text) => this.setState({phone:text})}
                        />
                    </View>
                    <View style={styles.passInputBox}>
                        <Image
                            style={styles.passIcon}
                            source={require('./../assets/icons/login/login_pass_icon.png')}
                        ></Image>
                        <TextInput
                            style={styles.passInput}
                            value={this.state.email}
                            placeholder="请输入邮箱地址"
                            placeholderTextColor="#ccc"
                            keyboardType="email-address"
                            onChangeText={(text) => this.setState({email:text})}
                        />
                    </View>
                    <View style={styles.passInputBox}>
                        <Image
                            style={styles.passIcon}
                            source={require('./../assets/icons/login/login_pass_icon.png')}
                        ></Image>
                        <TextInput
                            style={styles.passInput}
                            value={this.state.address}
                            placeholder="请输入地址"
                            placeholderTextColor="#ccc"
                            onChangeText={(text) => this.setState({address:text})}
                        />
                    </View>
                </View>

                <XButton
                    onClick={this._register.bind(this)}
                    text="注册"
                    marginTop={40}
                />
            </View>
        );
    }
}

let styles = {
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
}

AppRegistry.registerComponent('Register', () => Register);
