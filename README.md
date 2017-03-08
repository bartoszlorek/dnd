# Dependent Nodes Definition (DND)

Split interface into multiple nodes and define dependencies between them and application state.

## Usage

First combine `nodeReducer` with other reducers to manage node's state. And then use `resolveRules` as a middleware when creating a store.

```
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Node, { nodeReducer, resolveRules } from './and.min.js';

const reducers = combineReducers({
    nodes: nodeReducer,
    ...
});
const store = createStore(
    reducers, {},
    applyMiddleware(resolveRules)
);
```

The `name` is required string value, unique for all nodes. The rest of props are optional.

```
<Node name='string' [optional props]>...</Node>
```

#### Optional props:

- `test [Function]` calls when state is changing. Should return `boolean` to activate (or not) node.
- `deps [Array]` contains `names` of other nodes. Node is active when its dependencies are.
- `strict [Boolean]` when is `true` all dependencies must be active. Default is `false`.
- `rule [Object]` may contains all props above.

## Examples

Notice that test gets latest state of application as first argument. It's important to not mutate the state.

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

Nodes can be wrapped with `NodeProvider` to pass multiple `rules` with only one property.

```
import { NodeProvider } from './and.min.js';

const rules = {
    'form1': {
        test: (state) => state.input.value > 10,
        deps: ['form2'],
        strict: true
    },
    'form2': {
        test: (state) => state.input.value === 5
    }
}
<NodeProvider rules={rules}>
    <Node name='form1'>...</Node>
    <Node name='form2'>...</Node>
</NodeProvider>
```
