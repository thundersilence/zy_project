//index.js
//获取应用实例

Page({
  data: {
    dataList: [],
    imgWidth: 0,
    windowHeight: 0,
    windowWidth: 0,
    imgMargin: 6,
    topArr:[0,0]
  },
  //事件处理函数
  onLoad: function () {
    wx.showLoading({
      title: '**加载的标题**',
    })
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var windowHeight = res.windowHeight;
        var windowWidth = res.windowWidth;
        var imgMargin = that.data.imgMargin;
        var imgWidth = (windowWidth-3*imgMargin)/2;
        that.setData({
          windowHeight: windowHeight,
          windowWidth: windowWidth,
          imgWidth: imgWidth,
        },function (){that.loadMoreImages();})
      },
    })
  },
  loadMoreImages: function(){
    var images = [
      'http://seopic.699pic.com/photo/50035/0520.jpg_wh1200.jpg',

      'http://www.hello.com/img_/hellowithwaves.png',

      'https://www.chimpstickers.com/wp-content/uploads/2017/10/expression001-hello.png',

      'https://i.ytimg.com/vi/kJ2dr9jAThY/maxresdefault.jpg',

      'https://d3gkr6tq7ky0sd.cloudfront.net/image_resize/crop/mw1500/mh750/products/29/Hello-Coat-Rack-Yellow-Block.jpg',

      'https://miro.medium.com/fit/c/240/240/1*RSKT7Smg-HDn6Fwnf_50EQ.png',

      'http://cdn.shopify.com/s/files/1/0986/5790/products/HelloDecal-PRINT_grande.png?v=1481472974',

      'https://d3avoj45mekucs.cloudfront.net/rojakdaily/media/jessica-chua/entertainment/2018/oct/he110%20channel%20introduction/hello_main.jpg?ext=.jpg',

      'https://www.slurp-ramen.com/wp-content/uploads/2017/06/hello.png',

      'https://static1.squarespace.com/static/59a76cda03596e127d16f1f4/t/59a76df3e6f2e1cdbf36be12/1542322072949/?format=1500w',

      'https://supersimple.com/wp-content/uploads/hello-2-1080-740.jpg',

      'http://www.ccpixs.com/ccimages/hello-gold-foil-text-m-1235.jpg',

      'http://cdn.ecommercedns.uk/files/5/224895/2/3568062/heart503-l2.jpg',

      'https://hello.com/img_/hello_logo_white.png',

      'https://tzeyang.com/wp-content/uploads/2018/03/Hello.jpg.png',

      'https://cdn.shopify.com/s/files/1/1239/7018/products/Hello_Pin_on_pink_cropped_2048x.jpg?v=1542211774',

      'https://images-na.ssl-images-amazon.com/images/I/41dfDiAGcPL.jpg',

      'https://bilingua.io/wp-content/uploads/2017/05/hello-in-100-languages-1024x571.jpg',

      'https://www.pitara.com/wordpress/wp-content/uploads/2004/08/who-invented-hello.jpg',

      'https://www.mdc-partners.com/wp-content/uploads/2017/09/hello.png'
    ];
    var pic_num =images.length;
    var arr = [];
    for(var i=0;i<pic_num;i++){

      var current_object = {
        src: images[i],
        left: 0,
        top: 0,
        height:0,
      }

      arr.push(current_object);
    } 
    var dataList = this.data.dataList.concat(arr);
    this.setData({dataList: dataList})
    wx.hideLoading();
  },
  loadImage: function(e){
    var index = e.currentTarget.dataset.index;
    var realHeight = e.detail.height;
    var realWidth = e.detail.width;
    var imgWidth = this.data.imgWidth;
    var imgHeight = realHeight/realWidth*imgWidth;
    var margin = this.data.imgMargin;
    var dataList = this.data.dataList;
    var obj = dataList[index];
    obj.height = imgHeight;
    var left_top = this.data.topArr[0];
    var right_top = this.data.topArr[1];
    if (left_top>right_top) { 
      obj.left = margin;
      obj.top = right_top + margin;
      right_top += margin + obj.height;
    }
    else { //放到第二列
      obj.left = margin * 2 + imgWidth;
      obj.top = left_top + margin;
      left_top+= margin + obj.height;
    }
    
    this.setData({
      dataList: dataList,
      topArr: [left_top,right_top]
    });
    
  }

})
