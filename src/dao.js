class DataGenerator {
  static generateOrgChartData (depth) {
    let data = {
      'name': 'Lao Lao',
      'title': 'general manager',
      'children': [
        {'name': 'Bo Miao', 'title': 'department manager'},
        {
          'name': 'Su Miao',
          'title': 'department manager',
          'children': [
            {'name': 'Tie Hua', 'title': 'senior engineer'},
            {
              'name': 'Hei Hei',
              'title': 'senior engineer',
              'children': [
                {'name': 'Pang Pang', 'title': 'engineer'},
                {'name': 'Xiang Xiang', 'title': 'UE engineer'}
              ]
            }
          ]
        },
        {'name': 'Hong Miao', 'title': 'department manager'},
        {'name': 'Chun Miao', 'title': 'department manager'}
      ]
    }

    for (let i = 0; i < 3; i++) {
      data['children'].push({
        'name': 'Lao Lao',
        'title': 'general manager',
        'children': [
          {'name': 'Bo Miao', 'title': 'department manager'},
          {
            'name': 'Su Miao',
            'title': 'department manager',
            'children': [
              {'name': 'Tie Hua', 'title': 'senior engineer'}
            ]
          }
        ]
      })
    }

    let temp = data
    for (let i = 0; i < depth; i++) {
      if (!temp.children) {
        temp.children = []
      }
      temp.children.push({
        'name': 'Lao Lao',
        'title': 'general manager',
        'children': [
          {'name': 'Bo Miao', 'title': 'department manager'},
          {
            'name': 'Su Miao',
            'title': 'department manager',
            'children': [
              {'name': 'Tie Hua', 'title': 'senior engineer'},
              {
                'name': 'Hei Hei',
                'title': 'senior engineer',
                'children': [
                  {'name': 'Xiang Xiang', 'title': 'UE engineer'}
                ]
              }
            ]
          }
        ]
      })
      temp = temp.children[0]
    }

    return data
  }
}

export default DataGenerator
