import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthContext from "../component/AuthContext";
import Screen from "../component/Screen";
import Colors from "../modules/Colors";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Collections, RootStackParamList, User } from "../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
const HomeScreen = () => {
    const {user:me} =useContext(AuthContext)
    const [loadingUsers,setLoadingUsers] = useState(true)
    const [users,setUsers] = useState<User[]>([]);
    const {navigate} = useNavigation<NativeStackNavigationProp <RootStackParamList>>();


    const LoadUsers = useCallback(async ()=>{
        try{
            setLoadingUsers(true);
            const snapshot =await firestore().collection(Collections.USERS).get();
            setUsers(
                snapshot.docs
                .map(doc => doc.data() as User)
                .filter(u => u.userId !== me?.userId),
                    
            );

        }finally{
            setLoadingUsers(false)
        }
        
    },[me?.userId])

    useEffect(()=>{
        LoadUsers();
    },[LoadUsers])

    const onPressLogout = useCallback(()=>{
        auth().signOut();
    },[])

    const renderLoading = useCallback(()=>(
        <View style={styles.loadingContainer}>
            <ActivityIndicator/>
        </View>
    ),[])

    if (me == null) {
        return null;
    }
    return( 
    <Screen title="홈">
        <View style={styles.container}>
            <View>
                <Text style={styles.sectionTitle}>나의정보</Text>
                <View style={styles.userSectionContent}>
                    <View style={styles.myProfile}>
                    <Text style={styles.myNameText}>{me.name}</Text>
                    <Text style={styles.myEmailText}>{me.email}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={onPressLogout}>
                    <Text style={styles.logoutText}>로그아웃</Text>
                </TouchableOpacity>
                </View>
                
            </View>
            <View style={styles.userListSection}>
                {
                    loadingUsers ? renderLoading() : <>
                    <Text style={styles.sectionTitleText}>
                        다른 사용자와 대화해보세요!
                    </Text>
                    <FlatList
                        style={styles.userList}
                        data={users}
                        ItemSeparatorComponent={()=><View style ={{height:10}}></View>}
                        renderItem={({item:user})=>(
                            <TouchableOpacity
                                style={styles.userListItem}
                                onPress={()=>{
                                    navigate('Chat', {
                                        userIds:[me.userId,user.userId],
                                        other:user,
                                    })
                                }}
                                >
                                <Text style={styles.otherNameText}>{user.name}</Text>
                                <Text style={styles.otherEmailText}>{user.email}</Text>
                                
                            </TouchableOpacity>
                        )}

                        ListEmptyComponent={()=>{
                            return(
                                <Text style={{color:Colors.BLACK,}}>null</Text>
                            )
                        }}
                    />
                    </>
                }
            </View>
        </View>
    </Screen>)
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
    sectionTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
        color:Colors.BLACK
    },
    userSectionContent:{
        backgroundColor:Colors.BLACK,
        borderRadius:12,
        padding:20,
        alignItems:"center",
        flexDirection:"row"

    },
    myProfile:{
        flex:1,
    },
    myNameText:{
        color:Colors.WHITE,
        fontSize:16,
        fontWeight:"bold",
    },
    myEmailText:{
        marginTop:4,
        color:Colors.WHITE,
        fontSize:14
    },
    logoutText:{
        color:Colors.WHITE,
    },
    loadingContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    userListSection:{
        flex:1,
        marginTop:40,
    },
    sectionTitleText:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
        color:Colors.BLACK
    },
    userList:{
        flex:1
    },
    userListItem:{
        backgroundColor:Colors.LIGHT_GRAY,
        borderRadius:12,
        padding:20
    },
    otherNameText:{
        fontSize:16,
        fontWeight:'bold',
        color:Colors.BLACK
    },
    otherEmailText:{
        marginTop:4,
        fontSize:14,
        color:Colors.BLACK
    }
})
export default HomeScreen;
