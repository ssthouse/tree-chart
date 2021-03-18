import { addUniqueKey } from './TreeBuilder'
describe('TreeBuilder unit tests', () => {
  it('test addUniqueKey should add unique uuids to every node', () => {
    let input = {
      children: [
        {
          children: [{}]
        },
        {},
        {}
      ]
    }
    expect(addUniqueKey(input)).toEqual({})
  })
})
//# sourceMappingURL=TreeBuilder.spec.js.map
