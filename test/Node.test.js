import nodeReducer from '../src/components/Node/nodeReducer';
import resolveRules from '../src/components/Node/resolveRules';
import getActiveState from '../src/components/Node/getActiveState';

describe('nodeReducer', () => {

    const fakeNode = {
        name: 'fake',
        deps: [],
        test: (state) => {},
        strict: false,
        active: false
    }
    const fakeNodeActive = Object.assign(
        {}, fakeNode, { active: true }
    )

    it('should return initial state', () => {
        expect(
            nodeReducer(undefined, {})
        ).toEqual([])
    })

    it('should handle ADD_NODE', () => {
        expect(
            nodeReducer([], {
                type: 'ADD_NODE',
                node: fakeNode
            })
        ).toEqual(
            [fakeNode]
        )
    })

    it('should handle REMOVE_NODE', () => {
        expect(
            nodeReducer([], {
                type: 'REMOVE_NODE',
                node: fakeNode
            })
        ).toEqual(
            []
        )
    })

    it('should handle ACTIVATE_NODE', () => {
        expect(
            nodeReducer([fakeNode], {
                type: 'ACTIVATE_NODE',
                name: 'fake'
            })
        ).toEqual(
            [fakeNodeActive]
        )
    })

    it('should handle DEACTIVATE_NODE', () => {
        expect(
            nodeReducer([fakeNodeActive], {
                type: 'DEACTIVATE_NODE',
                name: 'fake'
            })
        ).toEqual(
            [fakeNode]
        )
    })

});


describe('getActiveState', () => {

    it('should handle empty store', () => {
        expect(
            getActiveState({})
        ).toEqual({})
    })

    it('should handle incomplete store', () => {
        const fakeStore = {
            nodes: [
                { name: 'dog' },
                { name: 'cat' }
            ]
        }
        expect(
            getActiveState(fakeStore)
        ).toEqual({
            'dog': false,
            'cat': false
        })
    })

    it('should handle complete store', () => {
        const fakeStore = {
            nodes: [
                { name: 'dog', test: state => true },
                { name: 'cat', deps: [] }
            ]
        }
        expect(
            getActiveState(fakeStore)
        ).toEqual({
            'dog': true,
            'cat': false
        })
    })

    it('should handle complete store with deps', () => {
        const fakeStore = {
            nodes: [
                { name: 'dog', test: state => true },
                { name: 'cat', deps: ['dog'] }
            ]
        }
        expect(
            getActiveState(fakeStore)
        ).toEqual({
            'dog': true,
            'cat': true
        })
    })

    it('should prevent reassign state by passing null', () => {
        const fakeStore = {
            nodes: [
                { name: 'dog', test: state => true, active: true },
                { name: 'cat', deps: ['dog'], active: false }
            ]
        }
        expect(
            getActiveState(fakeStore)
        ).toEqual({
            'dog': null,
            'cat': true
        })
    })

});

describe('resolveRules', () => {
    const fakeStore = {
        getState: () => {},
        dispatch: (action) => {}
    };

    it('should pass action to next', () => {
        const chain = [];
        const fakeNext = (action) => {
            chain.push(action);
        };
        const action = {
            type: 'ADD_NODE'
        };

        resolveRules(fakeStore)(fakeNext)(action);
        expect(chain).toEqual([action]);
    })

});

