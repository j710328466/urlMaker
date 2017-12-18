import React, { Component } from 'react';
import './input.css'
import CopyBoard from 'copy-to-clipboard'

class Input extends Component {
    constructor() {
        super()
        this.state = {
            url: '',
            channelName: '',
            id: '',
            name: '',
            actLink: ''
        }
    }

    componentDidMount () {
        var path = window.location.pathname,
            channelName = document.querySelector('.channelName'),
            idLabel = document.querySelector('.idLabel'),
            text = document.querySelector('.idLabel span'),
            nameLabel = document.querySelector('.nameLabel'),
            actLink = document.querySelector('.actLink'),
            siderBar_btn = document.querySelectorAll('.siderBar_btn a')
        
        for (let i = 0; i < siderBar_btn.length; i++) {
            siderBar_btn[i].style.background = ''
        }
        if (path === '/') {
            idLabel.style.display = 'none'
            nameLabel.style.display = 'none'
            actLink.style.display = 'none'
            siderBar_btn[0].style.background = '#66d5f7'
        } else if (path === '/goods') {
            actLink.style.display = 'none'
            siderBar_btn[1].style.background = '#66d5f7'
            text.innerText = '专区ID：'
        } else if (path === '/detail') {
            nameLabel.style.display = 'none'
            actLink.style.display = 'none'
            siderBar_btn[2].style.background = '#66d5f7'
        } else if (path === '/active') {
            idLabel.style.display = 'none'
            nameLabel.style.display = 'none'
            siderBar_btn[3].style.background = '#66d5f7'
        }
    }

    handleChannelNameChange (event) {
        this.setState({
            channelName: event.target.value
        })
    }

    handleIdChange (event) {
        this.setState({
            id: event.target.value
        })
    }

    handleNameChange (event) {
        this.setState({
            name: event.target.value
        })
    }

    handleActLinkChange (event) {
        this.setState({
            actLink: event.target.value
        })
    }

    create () {
        var Url = encodeURIComponent(this.state.url),
            channelName = encodeURIComponent(this.state.channelName),
            id = encodeURIComponent(this.state.id),
            name = encodeURIComponent(this.state.name),
            actLink = this.state.actLink

        if (this.props.url) {
            this.props.onSubmit({
                Url,
                channelName,
                id,
                name,
                actLink
            })
        }
    }

    reset () {
        var text = document.querySelector('#newUrl')

        this.setState({
            url: '',
            channelName: '',
            id: '',
            name: '',
            actLink: ''
        })
        text.innerText = ''
    }

    targetChange () {
        let text = document.querySelector('#newUrl').innerText
        if (text) {
            window.open(text)
        }
    }

    copyChange () {
        let text = document.querySelector('#newUrl').innerText
        if (text) {
            alert('复制成功！要是没成功那我也没办法~')
            CopyBoard(text)
        }
    }

    render () {
        return (
            <div className="main">
                <div className="cont">
                    <label className="channelName">
                        渠道名：
                        <input
                            value={this.state.channelName}
                            onChange={this.handleChannelNameChange.bind(this)}
                        />
                    </label>

                    <br />

                    <label className="idLabel">
                        <span>商品ID：</span>
                        <input
                            value={this.state.id}
                            onChange={this.handleIdChange.bind(this)}
                        />
                    </label>

                    <br />

                    <label className="nameLabel">
                        专区名称：
                        <input
                            value={this.state.name}
                            onChange={this.handleNameChange.bind(this)}
                        />
                    </label>

                    <label className="actLink">
                        活动链接：
                        <input
                            value={this.state.actLink}
                            onChange={this.handleActLinkChange.bind(this)}
                        />
                    </label>

                    <br />
                    <div className="btns">
                        <div 
                            className="changeHref_btn"
                            onClick={this.create.bind(this)} >
                            生成
                        </div>
                        <div
                            className="changeHref_btn"
                            onClick={this.reset.bind(this)} >
                            重置
                        </div>
                        <div
                            className="changeHref_btn"
                            onClick={this.copyChange.bind(this)} >
                            复制链接
                        </div>
                        <div
                            className="changeHref_btn"
                            onClick={this.targetChange.bind(this)} >
                            跳转链接
                        </div>
                    </div>
                </div>
                <p id="newUrl" ></p>
                <div className="changeHref">
                    
                </div>
            </div>
        )
    }
}

export default Input