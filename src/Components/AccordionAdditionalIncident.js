import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export class AccordionAdditionalIncident extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        //   data: props.data,
          expanded : false,
        }
    }

    toggleExpand=()=>{
        this.setState({expanded : !this.state.expanded})
    }

    render() {
        return (
            <TouchableOpacity
            onPress={()=>this.toggleExpand()}
            style={{
                borderRadius: 0,  
                borderBottomColor: '#dbdbdb', 
                borderBottomWidth: 1, 
                flex: 1, backgroundColor: '#fff'}}>
                <View style={{paddingTop: 15, paddingRight: 10, paddingLeft: 10, paddingBottom: 20, justifyContent: 'center'}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>{this.props.data.AssignTo.nama}</Text>
                    <Text style={{fontSize: 13, textAlign: 'justify'}}>{this.props.data.ResponsibleDepartment}</Text>
                    <View style={{position: 'absolute',borderRadius:20, top: 15, right: 10}}>
                        <Text style={{fontWeight: 'bold', fontSize: 11, alignSelf: 'center', textAlign: 'center'}}>{this.props.data.chosenDate}</Text>
                        <View style={{borderRadius:20, backgroundColor: '#e74c3c', padding: 5, width: 60, marginTop: 3, marginLeft: 25}}>
                            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 11, alignSelf: 'center', textAlign: 'center'}}>{this.props.data.Priority}</Text>
                        </View>
                    </View>
                    {
                        this.state.expanded &&
                        <View style={{marginTop: 10}}>
                            <Text>{this.props.data.ImmediateAction}</Text>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = {
    separator:{
        height: 1, 
        backgroundColor: '#dbdbdb',
         marginTop: 10, 
         marginBottom: 5
    },
    accordion:{
        backgroundColor: '#f7f7f7',
        padding: 1,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 5,
        top: 5
    }
}

export default AccordionAdditionalIncident
