//index.js
import config from '../../config/config'
import utils from '../../utils/index'
const app = getApp()
let Product = new wx.BaaS.TableObject(config.BAAS.TABLE_ID)
let product = Product.create()
Page({
  data: {
    img_logo: config.ROUTE.IMG.LOGO,
    img_unLogin: config.ROUTE.IMG.UNLOGIN,
    img_dot: config.ROUTE.IMG.DOT,
    img_dot_active: config.ROUTE.IMG.DOT_ACTIVE,
    pageCount: 1,
    pageIndex: 0,
    isLogin: false,
    isProfileComplete: false,
    userInfo: {},
    userName:'',
    userPhone: '',
    fenduo:'',

  },

  onLoad() {
    wx.BaaS.login().then(() => {
      this.getUserInfo()
      app.getPageStack()
    })
  },

  getUserInfo(){
    // 等待用户登录后再发起获取信息操作
   
      let userInfo = app.getUserInfo()

      if (wx.BaaS.storage.get('uid')) {
        userInfo = Object.assign(userInfo, {
          isLogin: true,
        })
        
        this.setData({userInfo})
      }
      // 从 BaaS 获取用户进一步信息
      utils.getUserProfile(this, (res) => {
        let _userInfo = res.data.objects[0]
        Object.assign(userInfo,_userInfo)
        this.setData({
          userInfo
        })
      })
  },

  bindNameInput(e) {
    let that = this
    let value = e.detail.value
    
    this.setData({
      userName: value
    })
  },
  bindPhoneInput(e) {
    let that = this
    let value = e.detail.value

    this.setData({
      userPhone: value
    })
  },
  bindFenduoInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      fenduo: value
    })
  },
  signAction(e) {

    let apple = {
      fenduo: this.data.fenduo,
      userPhone: this.data.userPhone,
      userName: this.data.userName
    }
    let fenduo1 = this.data.fenduo
    let userPhone1 = this.data.userPhone
    let userName1 = this.data.userName
    if (userName1 == 0) {
      wx.showModal({
        title: "糟糕，有信息没填完",
        content: "请输入你的名字",
        showCancel: false,
        confirmText: '好',
        confirmColor: '#FD544A'
      })
    } else if (userPhone1 == 0) {
      wx.showModal({
        title: "糟糕，有信息没填完",
        content: "请输入手机号。",
        showCancel: false,
        confirmText: '好',
        confirmColor: '#FD544A'
      })
    } else if (fenduo1 == 0) {
      wx.showModal({
        title: "糟糕，有信息没填完",
        content: "请填写分舵",
        showCancel: false,
        confirmText: '好',
        confirmColor: '#FD544A'
      })
    }  else {
      product.set(apple).save().then((res) => {
        wx.navigateTo({
          url: config.ROUTE.PAGE.ORDER
        })
      }, (err) => {

      })  
    }  
  },







  goToProfile(e) {
    wx.navigateTo({
      url: config.ROUTE.PAGE.PROFILE
    })
  },

  swiper(e) {
    let activePageIndex = e.detail.current
      this.setData({
        pageIndex: activePageIndex
      })
  }
})