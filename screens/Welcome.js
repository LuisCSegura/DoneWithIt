import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

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
    TextLinkContent,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from './../components/styles';

const Welcome = ({ navigation, route }) => {

    const {name, email, photoUrl}=route.params;
    const AvatarImg= photoUrl ? {uri: photoUrl} : require('./../assets/AvatarIcon.png');

    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/Background.jpg')} />
                <WelcomeContainer>
                    <PageTitle welcome={true}>HELLO FRIEND</PageTitle>
                    <SubTitle welcome={true}>{name || 'John Doe' }</SubTitle>
                    <SubTitle>{email || 'example@mail.com'}</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={AvatarImg} />
                        <Line />
                        <StyledButton onPress={() => { navigation.navigate("Login"); }}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>

                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Welcome;