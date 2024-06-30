import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

type IconProps = React.ComponentProps<typeof Ionicons> &
  React.ComponentProps<typeof AntDesign> &
  React.ComponentProps<typeof Feather> &
  React.ComponentProps<typeof Entypo> &
  React.ComponentProps<typeof FontAwesome> &
  React.ComponentProps<typeof FontAwesome5> &
  React.ComponentProps<typeof FontAwesome5Pro> &
  React.ComponentProps<typeof Fontisto> &
  React.ComponentProps<typeof EvilIcons> &
  React.ComponentProps<typeof Foundation> &
  React.ComponentProps<typeof Octicons> &
  React.ComponentProps<typeof MaterialCommunityIcons> &
  React.ComponentProps<typeof MaterialIcons> &
  React.ComponentProps<typeof SimpleLineIcons> &
  React.ComponentProps<typeof Zocial>;

export default function Icons({
  type = 'MaterialIcons',
  ...props
}: {type?: string} & IconProps) {
  switch (type) {
    case 'AntDesign':
      return <AntDesign {...props} />;

    case 'Feather':
      return <Feather {...props} />;

    case 'Entypo':
      return <Entypo {...props} />;

    case 'FontAwesome':
      return <FontAwesome {...props} />;

    case 'FontAwesome5Brands':
    case 'FontAwesome5':
      return <FontAwesome5 {...props} />;

    case 'fontawesome5pro':
      return <FontAwesome5Pro {...props} />;

    case 'Fontisto':
      return <Fontisto {...props} />;

    case 'EvilIcons':
      return <EvilIcons {...props} />;

    case 'Foundation':
      return <Foundation {...props} />;

    case 'Octicons':
      return <Octicons {...props} />;

    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...props} />;

    case 'Ionicons':
      return <Ionicons {...props} />;

    case 'SimpleLineIcons':
      return <SimpleLineIcons {...props} />;

    case 'Zocial':
      return <Zocial {...props} />;
  }
  return <MaterialIcons {...props} />;
}
