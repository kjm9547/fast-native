

import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import MyDropDownPicker from './src/MyDropDownPicker';
import TextInputModal from './src/TextInputModal';

import { useGallery } from './src/use-gallery';

const width = Dimensions.get('screen').width;
const columnSize = width / 3;
export default function App() {
  const { 
    //images,
     pickImage,
      deleteImage,
      imagesWidthAddButton,
      selectedAlbum,
      openModal,
      closeModal,
      modalVisible,
      albumTitle,
      setAlbumTitle,
      addAlbum,
      resetAlbumTitle,
      isDropdownOpen,
    openDropDown,
    closeDropDown

    } = useGallery();
  const onPressOpenGallery = () => {
    pickImage();

  }
  const onLongPressImgae = (imageId) => deleteImage(imageId)
  const onPressAddAlbum =() => {
    openModal();
  }
  const onSubmitEditing = () =>{
    if(!albumTitle) return;
    //1. 앨범에 타이틀 추가
    addAlbum();
    //2. 모달 닫기 & TextInput의 value 초기화
    closeModal();
    resetAlbumTitle();
  }

  const onPressBackdrop = () =>{
    closeModal();
  }
  const onPressHeader = () =>{
    openDropDown();
  }

  const renderItem = ({ item: { id, uri }, index }) => {
    if(id === -1){
      return (
        <TouchableOpacity 
        onPress = {onPressOpenGallery}
        style = {{
          width:columnSize,
           height:columnSize,
            backgroundColor:"lightgrey",
            justifyContent: "center",
            alignItems: "center"
            }}>
            <Text style ={{fontSize:45 , fontWeight:"100"}}>+</Text>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onLongPress={()=>onLongPressImgae(id)}>
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }} />
      </TouchableOpacity>
    )

  }
  return (
    <SafeAreaView style={styles.container}>
      
      <MyDropDownPicker 
      selectedAlbumTitle = {selectedAlbum.title} 
      onPressAddAlbum = {onPressAddAlbum}
      onPressHeader ={onPressHeader}
      isDropdownOpen = {isDropdownOpen}
       />

      <TextInputModal 
      modalVisible={modalVisible}
      albumTitle={albumTitle}
      setAlbumTitle = {setAlbumTitle}
      onSubmitEditing = {onSubmitEditing}
      onPressBackdrop ={onPressBackdrop}
      ></TextInputModal>

      <FlatList
        data={imagesWidthAddButton}
        renderItem={renderItem}
        numColumns={3}
        style ={{zIndex:-1}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: Platform.OS === "android" ? 30 : 0,
  },
});
