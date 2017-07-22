/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import ListItem from './../../components/ListItem'
import Detail from './detail'
import config from './../../utils/config'
import http from './../../utils/http'
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    ListView,
    Dimensions,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

let dataItem = {
    lists:[],
    page:1, // 当前第几页
    pageNum:10, // 一页加载几条数据
    total:0 // 一共有几页
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isRefreshing:false, // 是否正在刷新
            dataSource:ds.cloneWithRows([]),
        }
    }

    /**
     * 组件家在完成
     * */
    componentDidMount(){
        this._fetchDta();
    }

    /**
     * 获取数据
     * */
    _fetchDta(){
        http.get(config.api.base1+config.api.creations , {
            acessToken: 'asd',
            page: dataItem.page
        }).then((res)=>{
            if(res.success){
                this._handleData(res);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    /**
     * 获取到数据后，对数据进行处理
     * @param res 获得到的数据
     * */
    _handleData(res){
        if(dataItem.page === 1 ) dataItem.lists = [];
        ++dataItem.page;
        dataItem.total = res.total;
        dataItem.lists = dataItem.lists.concat(res.data);

        setTimeout(()=>{
            this.setState({
                isRefreshing:false,
                dataSource:this.state.dataSource.cloneWithRows(dataItem.lists),
            })
        },1000);
    }

    /**
     * 下拉刷新,下面调用时候， 用bind（this）,保持该函数里this的指向。
     * */
    _onRefresh(){
        if(this.state.isRefreshing){
            return;
        }
        this.setState({isRefreshing: true});
        this._fetchDta();
    }

    /**
     * 上拉加载数据
     * */
    _onEndReached(){
        if(dataItem.total === dataItem.lists.length){
            return;
        }
        this._fetchDta();
    }

    _renderItem(row){
        return (
            <ListItem
                key={row.id}
                onGoNext={this._goNext.bind(this)}
                row={row} />
        )
    }

    /**
     * 上拉加载底部样式，当还有数据时候，显示loading
     * 当没有更多数据，且有数据时候，则提示没有更多了
     * */
    _renderFooter(){
        if(dataItem.total === dataItem.lists.length && dataItem.lists.length > 5)
        return (
            <View style={styles.noData}>
                <Text style={styles.noDataText}>没有更多的了</Text>
            </View>
        )

        return (
            <ActivityIndicator

            />
        )
    }

    /**
     * 跳转到下一个页面
     * */
    _goNext(row){
        this.props.navigator.push({
            name : 'detail',
            component: Detail,
            passProps: {
                data: 'llll'
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>狗狗说</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#aaa"
                            title="努力加载中..."
                            titleColor="#aaa"
                        />
                    }
                    onEndReached={this._onEndReached.bind(this)}
                    onEndReachedThreshold={50}
                    renderFooter={ this._renderFooter.bind(this) }
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    header: {
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: '#ee735c'
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    noData: {
        width: Dimensions.get('window').width,
        padding: 10
    },
    noDataText: {
        textAlign: 'center',
        color: '#333'
    }
});

AppRegistry.registerComponent('Home', () => Home);
