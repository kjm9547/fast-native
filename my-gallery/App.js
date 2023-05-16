

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

import { useGallery } from './src/use-gallery';

const width = Dimensions.get('screen').width;
const columnSize = width / 3;
export default function App() {
  const { images, pickImage, deleteImage,imagesWidthAddButton } = useGallery();
  const onPressOpenGallery = () => {
    pickImage();

  }
  const onLongPressImgae = (imageId) => deleteImage(imageId)
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
      <Button title="갤러리 열기" onPress={onPressOpenGallery} />
      <FlatList
        data={imagesWidthAddButton}
        renderItem={renderItem}
        numColumns={3}
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
