import React, { useContext } from "react";
import { useCallback, useMemo, useState } from "react";
import Screen from "../component/Screen";
import validator from 'validator';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Colors from "../modules/Colors";
import AuthContext from "../component/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
const SignupScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [name, setName] = useState('');
    const {processingSignup,singup}=useContext(AuthContext)
    const {navigate} = useNavigation<NativeStackNavigationProp <RootStackParamList>>();
    const emailErroText = useMemo(() => {
        if (email.length === 0) {
            return '이메일을 입력해주세요'
        }

        if (!validator.isEmail(email)) {
            return '올바른 이메일이 아닙니다.';
        }
        return null;
    }, [email])

    const passwordErrorText = useMemo(() => {
        if (password.length === 0) {
            return '비밀번호를 입력해주세요.'
        }
        if (password.length < 6) {
            return '비밀번호는 6자리 이상이어야 합니다.';
        }
        if (password !== confirmedPassword) {
            return '비밀번호를 확인해주세요.';
        }
        return null;
    }, [password, confirmedPassword])

    const confirmedPasswordErrorText = useMemo(() => {
        if (confirmedPassword.length === 0) {
            return '비밀번호를 입력해주세요.'
        }
        if (confirmedPassword.length < 6) {
            return '비밀번호는 6자리 이상이어야 합니다.';
        }
        if (password !== confirmedPassword) {
            return '비밀번호를 확인해주세요.';
        }
    }, [password, confirmedPassword])

    const nameErrorText = useMemo(() => {
        if (name.length === 0) {
            return '이름을 입력해주세요.'
        }

        return null;
    }, [name.length])

    const onChangeEmailText = useCallback((text: string) => {
        setEmail(text);
    }, [])

    const onChangePasswordText = useCallback((text: string) => {
        setPassword(text);
    }, [])

    const onChangeConfirmedPasswordText = useCallback((text: string) => {
        setConfirmedPassword(text);
    }, [])

    const onChangeNameText = useCallback((text: string) => {
        setName(text);
    }, [])

    const signupButtonEnabled = useMemo(()=>{
        return(
            emailErroText == null && passwordErrorText == null && confirmedPasswordErrorText == null && nameErrorText == null
        );
    }, [
        emailErroText,
        passwordErrorText,
        confirmedPasswordErrorText,
        nameErrorText
    ]);
    
    const signupButtonStyle = useMemo(()=>{
        if(signupButtonEnabled){
            return styles.signupButton;
        }
        return [styles.signupButton, styles.disabledSignupButton]
    },[signupButtonEnabled]);

    const onPressSignupButton = useCallback(async ()=> {
        try{
        await singup(email,password,name);
        }
        catch(error:any){
            Alert.alert(error.message)
        }
    },[singup,email,password,name]);
    const onPressSigninButton = useCallback(()=> {
        navigate('Signin');
    },[navigate]);
    return (
        <Screen title="회원가입">
            {processingSignup ?(
                    <View style={styles.signingContainer}>
                        <ActivityIndicator/>
                    </View>

                ):
                <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>이메일</Text>
                    <TextInput
                        value={email}
                        style={styles.input}
                        onChangeText={onChangeEmailText}
                    />
                    {emailErroText && (<Text style={styles.errorText}> {emailErroText}</Text>)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>비밀번호</Text>
                    <TextInput
                        value={password}
                        style={styles.input}
                        onChangeText={onChangePasswordText}
                        secureTextEntry
                    />
                    {passwordErrorText && (<Text style={styles.errorText}> {passwordErrorText}</Text>)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>비밀번호 확인</Text>
                    <TextInput
                        value={confirmedPassword}
                        style={styles.input}
                        onChangeText={onChangeConfirmedPasswordText}
                        secureTextEntry
                    />
                    {confirmedPasswordErrorText && (<Text style={styles.errorText}> {confirmedPasswordErrorText}</Text>)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>이름</Text>
                    <TextInput
                        value={name}
                        style={styles.input}
                        onChangeText={onChangeNameText}
                    />
                    {nameErrorText&& (<Text style={styles.errorText}> {nameErrorText}</Text>)}
                </View>
                <View>
                    <TouchableOpacity style={signupButtonStyle} onPress={onPressSignupButton} disabled ={!signupButtonEnabled}>
                        <Text style={styles.signupButtonText}>회원가입</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signinTextButton} onPress={onPressSigninButton}>
                        <Text style={styles.signinButtonText}>이미 계정이 있으신가요?</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
            
        </Screen>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:20,
    },
    section:{
        marginBottom:20
    },
    input:{
            marginTop:10,
            borderWidth:1,
            padding:10,
            borderRadius:10,
            borderColor:Colors.GRAY,
            fontSize:16
    },
    errorText:{
        fontSize:14,
        color:Colors.RED,
        marginTop:4,
    },
    title:{
        fontSize:16,
        fontWeight:'bold'
    },
    signupButton:{
        backgroundColor:Colors.BLACK,
        borderRadius:10,
        alignItems:"center",
        padding:20,

    },
    signupButtonText:{
        color:Colors.WHITE,
        fontSize:16,
        fontWeight:"bold"
    },
    disabledSignupButton:{
        backgroundColor:Colors.GRAY,
        
    },
    signinTextButton:{
        marginTop: 5,
        fontSize: 16,
        alignItems:"center",
        padding: 10,
        color:Colors.BLACK,

    },
    signinButtonText:{
        fontSize:16,
        color:Colors.BLACK,
    },
    signingContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default SignupScreen;