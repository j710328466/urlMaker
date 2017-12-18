import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './button.css'

class Buttom extends Component {
    constructor () {
        super()
        this.state = {
            btnText: '提交'
        }
    }

    render() {
        return (
            <button>
                {this.props.btnText}
            </button>
        )
    }
}


export default Buttom