import {Image, ImageProps} from 'react-native';
import React from 'react';
import {icAvatar} from '@icons';
import {scale} from '@utils';

type Props = {
  size?: number;
  avatar?: any;
  style?: any;
};

const Avatar: React.FC<Props & ImageProps> = ({
  size = scale(110),
  avatar = icAvatar,
  style,
  ...restProps
}: Props) => {
  return (
    <Image
      resizeMode="contain"
      borderRadius={100}
      style={[{height: size, width: size}, style]}
      {...restProps}
      source={avatar}
    />
  );
};

export default Avatar;
