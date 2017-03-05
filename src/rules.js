export default {
    'dog': {
        test: (state) => state.input.value === 'xxx',
        strict: true,
    },
    'cat': {
        deps: ['dog', 'wrong'],
        test: (state) => state.input.value === 'xxxx'
    },
    'parrot': {
        test: (state) => {
            let value = state.input.value.length;
            return value > 5 && value < 10;
        }
    }
}