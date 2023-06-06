import * as React from 'react';
import {View, ViewProps} from 'react-native';


interface OwnProps {
  children?: React.ReactNode;
  background?: string;
  border?: string;
}

type ContainerProps = OwnProps & ViewProps;

const Container: React.FC<ContainerProps> = ({
  children,
  background,
  border,
  style,
  ...rest
}) => {
  const {card} = {card:"white"};
  return (
    <View
      style={[
        {backgroundColor: background || card},
        !!border && {borderColor: border},
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
};

export default Container;
