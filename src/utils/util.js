import {
    Dimensions
} from 'react-native';

/**
 * 计算宽度 以设计稿为750宽度来计算
 * @param val 实际从设计稿中量取的尺寸
 * */
export const computeSize = (val)=> {
    let width = Dimensions.get('window').width;
    return val ? (val / 750 ) * width : width;
}