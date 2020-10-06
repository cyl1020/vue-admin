const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/admin/home', // 对应的path
    icon: 'el-icon-s-home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品',
    key: '/admin/products',
    icon: 'el-icon-present',
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/admin/category',
        icon: 'el-icon-shopping-bag-1'
      },
      {
        title: '商品管理',
        key: '/admin/product',
        icon: 'el-icon-s-goods'
      },
    ]
  },

  {
    title: '用户管理',
    key: '/admin/user',
    icon: 'el-icon-user-solid'
  },
  {
    title: '角色管理',
    key: '/admin/role',
    icon: 'el-icon-s-custom',
  },

  {
    title: '图形图表',
    key: '/admin/charts',
    icon: 'el-icon-coin',
    children: [
      {
        title: '柱形图',
        key: '/admin/charts/bar',
        icon: 'el-icon-data-analysis'
      },
      {
        title: '折线图',
        key: '/admin/charts/line',
        icon: 'el-icon-data-line'
      },
      {
        title: '饼图',
        key: '/admin/charts/pie',
        icon: 'el-icon-pie-chart'
      },
    ]
  },

  {
    title: '订单管理',
    key: '/admin/order',
    icon: 'el-icon-s-tools',
  },
]

export default menuList