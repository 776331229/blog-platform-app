/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Icons from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        //这里获取从FirstPageComponent传递过来的参数: id
        this.setState({
            data:this.props.data
        });
    }

    /**
     * 返回上一页
     * */
    _back(){
        this.props.navigator.pop();
    }

    /**
     * 加载ok
     * */
    _onLoad(){
        console.log("加载ok");
    }

    /**
     *
     * */
    _onProgress(){
        console.log("开始播放");
    }

    /**
     * 播放结束
     * */
    _onEnd(){
        console.log("播放结束");
    }

    /**
     * 出错啦
     * */
    _onError(){
        console.log("出错了");
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <TouchableOpacity onPress={this._back.bind(this)} style={styles.headerBack}>
                        <Icons
                            name="ios-arrow-back"
                            size={20}
                            style={styles.headerBackIcon}
                        />
                        <Text style={styles.headerBackText}>返回</Text>
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.headerTitle}>详情页</Text>
                </View>
                <View style={styles.videoBox}>
                    <Video
                        style={styles.video}
                        source={{uri: 'http://www.w3school.com.cn/i/movie.mp4'}}
                        onLoad={this._onLoad.bind(this)}
                        onProgress={this._onProgress.bind(this)}
                        onEnd={this._onEnd.bind(this)}
                        onError={this._onError.bind(this)}
                    />
                </View>
                <Text>我是详情页</Text>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    headerBox: {
        width: Dimensions.get('window').width,
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: '#ee735c'
    },
    headerBack: {
        position: 'absolute',
        top: 24,
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
    videoBox: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width/2,
        backgroundColor: 'black'
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width/2,
    }
});

AppRegistry.registerComponent('Home', () => Detail);
