const treeList = [{
  label: '平台权限', // 菜单标题名称
  key: 'all', // 对应的path
  children: [{
      label: '首页', // 菜单标题名称
      key: '/home', // 对应的path
    },
    {
      label: '商品',
      key: '/products',
      children: [ // 子菜单列表
        {
          label: '品类管理',
          key: '/category'
        },
        {
          label: '商品管理',
          key: '/product'
        },
      ]
    },

    {
      label: '用户管理',
      key: '/user'
    },
    {
      label: '角色管理',
      key: '/role',
    },

    {
      label: '图形图表',
      key: '/charts',
      children: [{
          label: '柱形图',
          key: '/charts/bar'
        },
        {
          label: '折线图',
          key: '/charts/line'
        },
        {
          label: '饼图',
          key: '/charts/pie'
        },
      ]
    },

    {
      label: '订单管理',
      key: '/order'
    }
  ]
}]

export default treeList