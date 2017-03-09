import React from 'react'
import Input from './Input';
import Comment from './Comment';

import createNodes from '../lib/createNodes';
import rules from '../rules';

const Node = createNodes(rules);

//import Node, { NodeProvider } from '../../dist/dnd.min.js';

class App extends React.Component {
    render() {
        return (
            <div>
                <Input />
                <hr />

                <Node name='node1'>
                    <Comment
                        user='node1'
                        text='So far so good...'
                    />
                </Node>
                <Node name='node2'>
                    <Comment
                        user='node2'
                        text='I like jumping.'
                    />
                </Node>
                <Node name='node3'>
                    <Comment
                        user='node3'
                        text="I do not know what's going on, but I like node2."
                    />
                </Node>
                <Node name='node4'>
                    <Comment
                        user='node4'
                        text="You're not that lazy because you wrote so much."
                    />
                </Node>
                <Node name='node5'>
                    <Comment
                        user='node5'
                        text="Are you a dog person?"
                    />
                </Node>
                <Node name='node6'>
                    <Comment
                        user='node6'
                        text="Well done!"
                    />
                </Node>
                <Node name='node7'>
                    <Comment
                        user='node7'
                        text="Probably you missed something."
                    />
                </Node>
            </div>
        );
    }
}

export default App;