import React, { Component } from 'react';
import Input from '../../components/input/input'

class Home extends Component {
    constructor () {
        super()
        this.state = {
            url: 'https://h5.jimistore.com/?channelName=${channelName}#/tab/lease'
        }
    }

    handleActivechange(event) {
        let channelName = event.channelName,
            text = document.querySelector('#newUrl'),
            newUrl = this.state.url.replace('${channelName}', channelName)

        if (!channelName) {
            alert('你这样的只能活三集~')
            return
        }
        text.innerText = newUrl
    }

    render () {
        return (
            <Input 
                url={this.state.url}
                onSubmit={this.handleActivechange.bind(this)}
            />
        )
    }
}

export default Home