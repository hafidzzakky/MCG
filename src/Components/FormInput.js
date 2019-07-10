import React from 'react';
import { View, Text } from 'react-native';
import {
    Item, 
    Label, 
    Input, 
    Textarea,
    Content,
    Form
} from 'native-base';

export const FormInput = ({ label, keyboardType, placeholder, password,  meta: { touched, error, warning}, input: {onChange, ...restInput }}) => {
    return(
        <View style={{flexDirection:'column', alignItems: 'flex-start'}}>
            <View style={{flexDirection: 'row', alignItems:'center'}}>
                <Item floatingLabel style={{ marginTop: -10}}>
                    <Label style={{fontSize: 13}}>{label}</Label>
                    <Input 
                        secureTextEntry={password}
                        style={{fontSize: 13}}
                        label={label}
                        keyboardType={keyboardType}
                        onChangeText={onChange}
                        {...restInput}
                        placeholder={placeholder}
                    />
                </Item>
            </View>
            {touched && ((error && <Text style={{color: '#e74c3c', margin: 5, marginLeft: 20}}>{error}</Text>) || 
            (warning && <Text style={{color: '#f39c12', margin: 5, width: '100%'}}>{warning}</Text>))}
        </View>
    );
}

export const komentarEverywhere = ({ button, label, keyboardType, placeholder, meta: { touched, error, warning }, input: {onChange, ...restInput }}) => {
    return(
        <Content padder contentContainerStyle={{ justifyContent: 'center', flex: 1, width: 285}}>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>Komentar</Text>
            <Form style={{width: '100%'}}>
            <Textarea 
            rowSpan={5} 
            bordered 
            onChangeText={onChange}
            {...restInput}
            placeholder={placeholder} />
            </Form>
            {touched && ((error && <Text style={{color: '#e74c3c', margin: 5, marginLeft: 20}}>{error}</Text>) || 
            (warning && <Text style={{color: '#f39c12', margin: 5, width: '100%'}}>{warning}</Text>))}
            {button()}
        </Content> 
    );
}
