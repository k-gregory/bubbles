import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

export class Progress extends React.PureComponent{
    constructor(props){
        super(props);
        this.bar = null;
    }

    componentDidMount(){
        this.updateWidth(this.props.completeness);
    }

    updateWidth(newWidth){
        this.bar.style.width = newWidth * 100 + "%";
    }

    componentWillReceiveProps(nextProps){
        this.updateWidth(nextProps.completeness)
    }

    render(){
        return (
            <div className={style.progress}>
                <div ref={d=>{this.bar = d}} className={style.progressCompleted} />
            </div>
        );
    }
}

Progress.propTypes = {
    completeness: PropTypes.number.isRequired,
};