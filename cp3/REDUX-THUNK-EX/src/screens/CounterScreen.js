import React, { useCallback, useState } from "react";
import {View} from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { addCount, deleteCount } from "../actions/counter";
import { Button } from "../components/Button";
import { Header } from "../components/Header/Header";
import { Icon } from "../components/Icons";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";
export default CounterScreen = (props) => {
    //const[value,setValue] = useState(0)
    const value = useSelector((state)=> state.count.count)
    /*
        useSelector? store에 있는 값을 가져오기 위함이다..
        useDispatch? redux action을 사용하기 위한 hook
    */
    const dispatch = useDispatch();
    const onPressMinus = useCallback(()=>{
        //setValue((value)=>value-1)
        dispatch(deleteCount())//action을 가져온다
    },[])
    const onPressPlus = useCallback(()=>{
        //setValue((value)=>value+1)
        dispatch(addCount())
    },[])
    return(
        <View style={{flex:1}}>
            <Header.Title title ='COUNTER'></Header.Title>
            <View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressMinus}>
                        <Icon name='remove' size={20} color='black'></Icon>
                    </Button>

                    <Spacer horizontal space={20}/>
                    <Typography fontSize={20}>
                        {`${value}개`}
                    </Typography>
                    <Spacer horizontal space={20}/>
                    <Button paddingHorizontal={4} paddingVertical={4} onPress={onPressPlus}>
                        <Icon name='add' size={20} color='black'></Icon>
                    </Button>
                </View>

            </View>
        </View>


    )
}