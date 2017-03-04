export default {
    'dog': {
        strict: true,
        deps: [],
        test: function (state) {
            return state.input.value === 'dog';
        }
    },
    'cat': {
        deps: ['dog', 'sand', 'ok']
    }
}