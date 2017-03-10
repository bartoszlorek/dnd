# Dependent Nodes Definition (DND)

Split interface into multiple nodes and define dependencies between them and application state.

## Initialization

Combine `nodeReducer` with other reducers to manage node's state. And then use `resolveRules` as a middleware.

```
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { nodeReducer, resolveRules } from './and.min.js';

const reducers = combineReducers({
    nodes: nodeReducer,
    ...
});
const store = createStore(
    reducers, {},
    applyMiddleware(resolveRules)
);
```

## Basic Usage

The `name` is required string value, unique for each node in app.

```
import Node from './and.min.js';

<Node name='string' [optional props]>...</Node>
```

#### Optional props

- `test [Function]` gets latest `state` as a first argument and should return `boolean` to activate (or deactivate) node. It's important to **not mutate** the state.
- `deps [Array]` contains `names` of other nodes. Node is active when its dependencies are.
- `strict [Boolean]` when is `true` all dependencies must be active. Default is `false`.
- `rule [Object]` may contains all props above.

**Rules** are handy in complex node cases. On the other hand, passing only `deps` is similar to have dumb node which just watching others.

```
<Node
    name='form1'
    test={(state) => state.input.value > 10}
    deps={['form2']}
    strict={true} >
...
</Node>
```

or just...

```
const rule = {
    test: (state) => state.input.value > 10,
    deps: ['form2'],
    strict: true
}
<Node
    name='form1'
    rule={rule} >
...
</Node>
```

## Complex Usage

In case when multiple nodes are present, it's good practice to use one object combining all rules. That's why you should use `createNodes` function. It's return a Node component with rules scope received by name.

```
import { createNodes } from './and.min.js';

const rules = {
    'form1': {
        test: (state) => state.input.value === 5
    },
    'form2': {
        test: (state) => state.input.value > 10,
        deps: ['form1']
    },
    'side1': {
        deps: ['form1', 'form2'],
        strict: true
    }
}
const Node = createNodes(rules);

<div class='main'>
    <Node name='form1'>...</Node>
    <Node name='form2'>...</Node>
</div>
<div class='sidebar'>
    <Node name='side1'>...</Node>
</div>
```
