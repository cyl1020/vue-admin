import ajax from './ajax';
import jsonp from 'jsonp'

//login
//登录的请求
export const login = (username, password) => ajax('/api/login', {username, password}, "POST")

//category
//获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax('/api/manage/category/list', {parentId})

//更新一级或二级分类的名称
export const reqUpdateCategory = (categoryId, categoryName) => ajax('/api/manage/category/update', {categoryId, categoryName}, "POST")

//添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/api/manage/category/add', {categoryName, parentId}, "POST")


//product
//获取商品分页列表
export const reqProduct = (pageNum, pageSize) => ajax('/api/manage/product/list', {pageNum, pageSize})

//对商品进行上架/下架处理
export const updateStatus = (productId, status) => ajax('/api/manage/product/updateStatus', {productId, status}, "POST")

//根据ID/Name搜索产品分页列表
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/api/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})

//根据分类ID获取分类
export const reqCategory = (categoryId) => ajax('/api/manage/category/info', {categoryId})

//删除上传的照片
export const reqDeleteImg = (name) => ajax('/api/manage/img/delete', {name}, "POST")

//添加/更新商品
//这里的product外面传入的时候就是一个对象
export const reqAddOrUpdateProduct = (product) => ajax('/api/manage/product/' + (product._id ? 'update' : 'add'), product, "POST")


//role
//获取角色列表
export const reqRoleList = () => ajax('/api/manage/role/list')

///添加角色
export const reqAddRole = (roleName) => ajax('/api/manage/role/add', {roleName}, "POST")

//更新角色(给角色设置权限)
export const reqUpdateRole = (role) => ajax('/api/manage/role/update', role, "POST")


//user
//获取所有用户列表
export const reqUserList = () => ajax('/api/manage/user/list')

//删除用户
export const reqDeleteUser = (userId) => ajax('/api/manage/user/delete', {userId}, "POST")

//添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax('/api/manage/user/' + `${user._id ? 'update' : 'add'}`, user, "POST")



//jsonp请求的接口请求函数
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        const {weather_data}= data.results[0]
        resolve({dayPictureUrl, weather, weather_data})
      } else {
        // this.$message({
        //   showClose: true,
        //   message: '获取天气信息失败!',
        //   type: "error"
        // });
        return false
      }
    })
  })
}