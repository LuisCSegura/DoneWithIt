import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
// formik
import { Formik } from 'formik';

//datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';


import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledButton,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    Colors,
    MsBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from './../components/styles';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';

//colors
const { brand, darkLight, primary } = Colors;
//keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
//API Client
import axios from 'axios';

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [message, setMessage]=useState();
    const [messageType, setMessageType]=useState();
    

    //Actual date of birth to be sent
    const [dob, setDob] = useState();
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    };
    const showDatePicker = () => {
        setShow(true);
    };


    //Signup handling
    const handleSignup =(credentials, setSubmitting)=>{
        handleMessage(null);
        const url='https://warm-waters-20510.herokuapp.com/user/signup';

        axios.post(url, credentials).then((response)=>{
            const result=response.data;
            const {message, status, data}=result;
            if(status !== 'SUCCESS'){
                handleMessage(message, status);
            }else{
                navigation.navigate('Welcome', {...data});
            }
            setSubmitting(false);
        }).catch(error=>{
            console.log(error.JSON());
            setSubmitting(false);
            handleMessage('An error ocurred. Check your network and tray again.');

        });
    }

    const handleMessage = (message, type ='FAILED')=>{
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>DONE WITH IT</PageTitle>
                    <SubTitle>Account Signup</SubTitle>

                    <Formik
                        initialValues={{ name: '', email: '', dateOfBirth: '', password: '', confirmPassword: '' }}
                        onSubmit={(values, {setSubmitting}) => {
                            values={...values, dateOfBirth: dob};
                            if(values.email==''|| values.password==''||values.name==''|| values.dateOfBirth==''|| values.confirmPassword==''){
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            }else if(values.password!== values.confirmPassword){
                                handleMessage('The passwords do not match');
                                setSubmitting(false);
                            }else{
                                handleSignup(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Full Name:"
                                    icon="person"
                                    placeholder="John Doe"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                <MyTextInput
                                    label="Email Address:"
                                    icon="mail"
                                    placeholder="example@gmail.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput
                                    label="Date of Birth:"
                                    icon="calendar"
                                    placeholder="YYYY - MM - DD"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={dob ? dob.toDateString() : ''}
                                    isDate={true}
                                    editable={false}
                                    showDatePicker={showDatePicker}
                                />
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode='date'
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}

                                <MyTextInput
                                    label="Password:"
                                    icon="lock"
                                    placeholder="********"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MyTextInput
                                    label="Confirm Password:"
                                    icon="lock"
                                    placeholder="********"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsBox type={messageType}>{message}</MsBox>
                    
                                {!isSubmitting && 
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Signup</ButtonText>
                                </StyledButton>}

                                {isSubmitting && 
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary}/>
                                </StyledButton>}

                                <Line />
                                <ExtraView>
                                    <ExtraText>Already have an account? </ExtraText>
                                    <TextLink onPress={() => navigation.navigate("Login")}>
                                        <TextLinkContent>Login</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons onPress={showDatePicker} name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
}

export default Signup;