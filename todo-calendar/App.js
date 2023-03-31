import dayjs from 'dayjs';
import { Image, SafeAreaView,StyleSheet, Text, View,TouchableOpacity,FlatList } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { getCalendarColumns} from './src/util'

import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list';
import Calendar from './src/Calendar';

const statusBarHeight = getStatusBarHeight(true);

const ArrowButton = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <SimpleLineIcons name={iconName} size={15} color="#404040" />
    </TouchableOpacity>
  )
}
export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(now);

  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
   } = useCalendar(now);
   const { todoList} = useTodoList(selectedDate)
  
  const onPressLeftArrow = subtract1Month
  const onPressRightArrow = add1Month
const onPressHeaderDate = showDatePicker;
const onPressDate = setSelectedDate;


  const ListHeaderComponent = () =>(
    <Calendar
      columns ={columns}
        selectedDate={selectedDate}
        onPressLeftArrow = {onPressLeftArrow}
        onPressRightArrow = {onPressRightArrow}
        onPressHeaderDate ={onPressHeaderDate}
        onPressDate = {onPressDate}
      />
  )
  return (
    <SafeAreaView style={styles.container}>
      <Image
      source={{
        // 출처: https://kr.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1189772.htm
        uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
      }}
      style = {{
        width:"100%",
        height:"100%",
        position:"absolute",
      }}
      />
      

      <FlatList
        data={todoList}
        ListHeaderComponent = {ListHeaderComponent}
        renderItem = { ({item:todo}) => {
          return(
            <Text>{todo.content}</Text>
          )
        }}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
