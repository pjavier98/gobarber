import styled from 'styled-components/native';
import { Platform } from 'react-native';

const androidAvatarSize = 100;
const iOSAvatarSize = 186;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 60 : 40}px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 75px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: ${Platform.OS === 'android' ? androidAvatarSize : iOSAvatarSize}px;
  height: ${Platform.OS === 'android' ? androidAvatarSize : iOSAvatarSize}px;
  border-radius: ${Platform.OS === 'android'
    ? androidAvatarSize / 2
    : iOSAvatarSize / 2}px;
  align-self: center;
`;
