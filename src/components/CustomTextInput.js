import React from 'react';
import { TextInput} from 'react-native';
import { Colors } from "../config";

export default class TextInputCustom extends React.Component {
state ={
  focused : false
}

  render() { 
      const {style} =this.props
      const {focused} =this.state
    return (
        <TextInput
        onBlur={()=>this.setState({focused:false})}
        onFocus={()=>this.setState({focused:true})}
        placeholderTextColor="#ccc"
        underlineColorAndroid="transparent"
        {...this.props}
        style={[style,{borderWidth:1,borderColor:focused?Colors.primary:"#ccc"}]}
/>
    );
  }
}