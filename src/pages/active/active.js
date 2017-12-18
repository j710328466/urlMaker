import React, { Component } from 'react';
import Input from '../../components/input/input'

class Active extends Component {
    constructor() {
        super()
        this.state = {
            url: '${actLink}?channelName=${channelName}',
            param: ''
        }
    }

    handleActivechange (event) {
        let actLink = event.actLink;
        let channelName = event.channelName;
        let newUrl = actLink;
        let anchorArray = actLink.split('#');
        let postPart = '';

        if (!actLink || !channelName) {
            alert('填都没填完，你急个啥~')
            return
        }
        if(anchorArray.length>1){
        	postPart = '#'+anchorArray[1];
        }

        let firstArray = anchorArray[0].split('?');
        if(firstArray.length<2){
        	newUrl = firstArray[0]+'?channelName='+channelName+postPart;
        }
        else{
        	let secondArray = firstArray[1].split('&');
        	let midParams = '';
        	let hasChannelName = false;
        	for(let i=0;i<secondArray.length;i++){
        		if(secondArray[i].split('=')[0]=='channelName'){
        			midParams += 'channelName='+channelName+'&';
        			hasChannelName = true;
        		}
        		else{
        			midParams += secondArray[i]+'&';
        		}
        	}

        	if(!hasChannelName){
        		midParams += 'channelName='+channelName+'&';
        	}

        	midParams = midParams.substring(0, midParams.length-1);

        	newUrl = firstArray[0]+'?'+midParams+postPart;
        }
            /*
            
            dot = actLink.indexOf('#'),
            cName = actLink.indexOf('channelName'),
            qMark = actLink.indexOf('?') === -1 ? true: false,
            newUrl = this.state.url.replace('${channelName}', channelName).replace('${actLink}', actLink)

        

        if (dot !== -1) {
            var dotLink = actLink.split('#')
            newUrl = dotLink[0] + '?channelName=' + channelName + '#' + dotLink[1]

                if (cName !== -1) {
                    if (dotLink.length > 1 || qMark) {
                        console.log()
                        var splitName = dotLink[0].split('?')
                        console.log(splitName)
                        newUrl = splitName[0] + '?channelName=' + channelName + '#' + dotLink[1]
                    }
                }
            }

            */
        let text = document.querySelector('#newUrl');
        text.innerText = newUrl
    }

    render() {
        return (
            <Input 
                url={this.state.url}
                onSubmit= {this.handleActivechange.bind(this)}
             />
        )
    }
}

export default Active