import { RootNode } from './VueTree.types'
import { addUniqueKey, treeBuilder } from './TreeUtils'
import { extractTransformOriginOffsets } from './TreeUtils'

interface ExampleNode {
  name: string
}

describe('TreeBuilder unit tests', () => {
  it('test addUniqueKey should add unique uuids to every node', () => {
    let input: RootNode<{}> = {
      children: [
        {
          children: [
            {
              children: [{}]
            }
          ]
        },
        {},
        {}
      ]
    }
    const extractKeys = <T>(node: RootNode<T>): Array<string | undefined> => {
      let ids: Array<string | undefined> = [node._key]
      ;(node.children || []).forEach((n) => ids.push(...extractKeys(n)))
      return ids
    }

    const gotNode = addUniqueKey(input)
    const gotKeys = extractKeys(gotNode)
    expect(gotKeys).toHaveLength(6)

    // Every key should be set
    expect(gotKeys.filter((item, index) => item === undefined)).toHaveLength(0)

    // Check for duplicates
    expect(
      gotKeys.filter((item, index) => gotKeys.indexOf(item) != index)
    ).toHaveLength(0)
  })

  it('test treeBuilder builds a correct tree', () => {
    const input: RootNode<ExampleNode> = {
      name: 'root',
      children: [
        { name: 'foo', children: [{ name: 'foo bar' }] },
        { name: 'bar', children: [{ name: 'bar foo' }] }
      ]
    }
    const got = treeBuilder(input, 100, 3)
    expect(got).toEqual([])
  })

})

describe('extractTransformOriginOffsets table tests', () => {
  type tcase = [string | undefined, [number, number]]
  const cases: Array<tcase> = [
    ['', [0, 0]],
    [undefined, [0, 0]],
    ['I dont match', [0, 0]],
    ['scale(20)', [0, 0]],
    ['translate(1px, 2px)', [1, 2]],
    ['translate(2px,1px)', [2, 1]],
    ['translate(23px, 15px)', [23, 15]]
  ]
  test.each(cases)(
    "extractTransformOriginOffsets('%s') should be %s",
    (input, expectedOutput) => {
      expect(extractTransformOriginOffsets(input)).toEqual(expectedOutput)
    }
  )
})
