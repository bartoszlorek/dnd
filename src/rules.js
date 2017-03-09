const sentence = 'fox jumps over the lazy dog';

export default {
    'node1': {
        test: (state) => state.input.value.slice(0, 3) === 'fox'
    },
    'node2': {
        test: (state) => state.input.value.indexOf('jump') !== -1
    },
    'node3': {
        deps: ['node2']
    },
    'node4': {
        test: (state) => state.input.value.length >= 23
    },
    'node5': {
        test: (state) => state.input.value.indexOf('dog') !== -1
    },
    'node6': {
        test: (state) => state.input.value === sentence
    },
    'node7': {
        test: (state) => {
            let length = state.input.value.length;
            return state.input.value.slice(0, length)
                !== sentence.slice(0, length);
        }
    }
}