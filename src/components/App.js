import React from 'react'
import Input from './Input';

import Node from '../lib/Node';
import NodeProvider from '../lib/NodeProvider';
import rules from '../rules';

//import Node, { NodeProvider } from '../../dist/and.min.js';

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