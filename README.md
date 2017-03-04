# Asynchronous Node Definition (AND)

Split interface into multiple nodes and define dependencies between them and application state.

## Usage

The `name` is required string value, unique for all nodes. Rest properties are optional.

```
<Node name='string' [optional properties]>...</Node>
```

#### Optional properties:

- `test [Function]` calls when state is changing. Should return `boolean` to activate (or not) node.
- `deps [Array]` contains `names` of other nodes. Node is active when its dependencies are.
- `strict [Boolean]` when is `true` all its dependencies must be active. Default is `false`.
- `rule [Object]` may contains all properties.

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

Nodes can be wrapped with `NodeProvider` to pass multiple rules with only one property.

```
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
