export default {
    'dog': {
        strict: true,
        test: function (state) {
            return state.input.value === 'xxx';
        }
    },
    'cat': {
        deps: ['dog', 'wrong'],
        test: function (state) {
            return state.input.value === 'xxxx';
        }
    },
    'parrot': {
        test: function (state) {
            let value = state.input.value.length;
            return value > 5 && value < 10;
        }
    }
}