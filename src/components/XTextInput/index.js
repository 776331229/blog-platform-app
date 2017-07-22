import {
    TextInput
} from 'react-native';
export default class XTextInput extends TextInput {

    //设置默认属性
    static defaultProps = {
        autoCapitalize: "none", //不自动大写
        autoCorrect: false, //不自动纠正拼写
    };

}