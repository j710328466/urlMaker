import React, { Component } from 'react';
import Input from '../../components/input/input'

class Detail extends Component {
    constructor() {
        super()
        this.state = {
            url: 'https://h5.jimistore.com/?channelName=${channelName}#/tab/leaseChoose/${id}/',
            param: ''
        }
    }

    handleActivechange(event) {
        let id = event.id,
            channelName = event.channelName,
            text = document.querySelector('#newUrl'),
            newUrl = this.state.url.replace('${channelName}', channelName).replace('${id}', id)

        if (!id || !channelName) {
            alert('有空选项未输入！')
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

export default Detail