

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
import BIgImgModal from './src/BIgImgModal';
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
    openTextInputModal,
    closeTextInputModal,
    textInputModalVisible,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropDown,
    closeDropDown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage
  } = useGallery();
  const onPressOpenGallery = () => {
    pickImage();

  }
  const onLongPressImgae = (imageId) => deleteImage(imageId)
  const onPressAddAlbum = () => {
    openTextInputModal();
  }
  const onSubmitEditing = () => {
    if (!albumTitle) return;
    //1. 앨범에 타이틀 추가
    addAlbum();
    //2. 모달 닫기 & TextInput의 value 초기화
    closeTextInputModal();
    resetAlbumTitle();
  }


  const onPressTextInputModalBackDrop = () => {
    closeTextInputModal();
  }
  const onPressBigImgModalBackDrop = () => {
    closeBigImgModal();
  }
  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropDown();
    }
    else {
      openDropDown();
    }

  }

  const onPressAlbum = (album) => {
    selectAlbum(album)
    closeDropDown();
  }

  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId);
  }

  const onPressImage = (image) => {
    selectImage(image);
    openBigImgModal();
    
  }

  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Text style={{ fontSize: 45, fontWeight: "100" }}>+</Text>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={()=> onPressImage(image)} onLongPress={() => onLongPressImgae(id)} >
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }} />
      </TouchableOpacity>
    )

  }
  return (
    <SafeAreaView style={styles.container}>

      <MyDropDownPicker
        selectedAlbum={selectedAlbum}
        deleteAlbum={deleteAlbum}
        onPressAddAlbum={onPressAddAlbum}
        onPressHeader={onPressHeader}
        isDropdownOpen={isDropdownOpen}
        albums={albums}
        onLongPressAlbum={onLongPressAlbum}
        onPressAlbum={onPressAlbum}
      />

      <TextInputModal
        modalVisible={textInputModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}        
        onPressBackDrop={onPressTextInputModalBackDrop}
      ></TextInputModal>

      <BIgImgModal
        modalVisible ={bigImgModalVisible}
        onPressBackdrop={onPressBigImgModalBackDrop}
        selectedImage={selectedImage}
      />
      <FlatList
        data={imagesWidthAddButton}
        renderItem={renderItem}
        numColumns={3}
        style={{ zIndex: -1 }}
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
