import React from 'react';
import style from './Comment.css';

class Comment extends React.Component {
    render() {
        return (
            <p className={style.comment}>
                <span className={style.user}>{this.props.user}</span>{': '}
                <span className={style.text}>{this.props.text}</span>
            </p>
        );
    }
}

export default Comment;