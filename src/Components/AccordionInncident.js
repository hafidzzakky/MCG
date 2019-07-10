import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export class AccordionInncident extends Component {
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
            <View style={{borderBottomColor: '#dbdbdb', borderBottomWidth: 1, marginTop: 0, backgroundColor: '#fff', marginTop: 10, paddingBottom: 10}}>
                {console.log(this.props.data)}
                <View style={{padding: 5, paddingRight: 10, paddingLeft: 10}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'justify'}}>{this.props.data.ActionTakenBy.nama}</Text>
                    <Text style={{fontSize: 13, textAlign: 'justify'}}>{this.props.data.ImmediateAction}</Text>
                </View>
                {
                    this.state.expanded &&
                    <View style={{padding: 5, paddingRight: 10, paddingLeft: 10}}>
                        <Text>{this.props.data.Description}</Text>
                    </View>
                }
                <TouchableOpacity 
                onPress={()=>this.toggleExpand()}
                style={styles.accordion}>
                    <Icons name={this.state.expanded ? 'chevron-up' : 'chevron-down'} size={25} color="#5a5a5a" />
                </TouchableOpacity>
            </View>
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
        right: 10,
        top: 5
    }
}

export default AccordionInncident
