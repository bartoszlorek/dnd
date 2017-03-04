import React from 'react'
import Node from './Node';
import Input from './Input';

import nodeRules from '../redux/nodeRules'

class App extends React.Component {

    render() {
        return (
            <div>
                <Input />
                <Node name='dog' rule={nodeRules.dog}>
                    <h2>Dog</h2>
                </Node>
                <Node name='cat' rule={nodeRules.cat}>
                    <h2>Cat</h2>
                </Node>
                <Node name='parrot'>
                    <h2>Parrot</h2>
                </Node>
            </div>
        );
    }

}

export default App;