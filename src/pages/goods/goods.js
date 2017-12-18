import React, { Component } from 'react';
import Input from '../../components/input/input'

class Goods extends Component {
    constructor() {
        super()
        this.state = {
            url: 'https://h5.jimistore.com/?channelName=${channelName}#/tab/typeList/${id}/${name}',
            param: ''
        }
    }

    handleActivechange(event) {
        let id = event.id,
            channelName = event.channelName,
            name = event.name,
            text = document.querySelector('#newUrl'),
            newUrl = this.state.url.replace('${channelName}', channelName).replace('${id}', id).replace('${name}', name)

        if (!id || !channelName || !name) {
            alert('你有bug没调完~')
            return
        }
        text.innerText = newUrl
    }

    render() {
        return (
            <Input 
                url={this.state.url}
                onSubmit={this.handleActivechange.bind(this)}
            />
        )
    }
}

export default Goods