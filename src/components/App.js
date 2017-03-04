import React from 'react'
import Node from './Node';
import NodeProvider from './NodeProvider';
import Input from './Input';

import rules from '../rules';

class App extends React.Component {

    render() {
        return (
            <div>
                <Input />
                <NodeProvider rules={rules}>
                    <Node name='dog'>
                        <h2>Dog</h2>
                    </Node>
                    <Node name='cat'>
                        <h2>Cat</h2>
                    </Node>
                    <Node name='parrot'>
                        <h2>Parrot</h2>
                    </Node>
                </NodeProvider>
            </div>
        );
    }

}

export default App;