﻿
$(document).ready(function(){
    

    var arr = [];
    $("img").each(function(index, el) {
        arr.push($(this).attr("src"))
    });

    var img_len = 0;
    var btn = false;



    //loading大小
    var load_wid;
    var contaier = $("#container")[0];
    $.each(arr, function(index, val) {
         var img = new Image();
         img.src = val;
         img.onload = function(){
            img_len++;
            // console.log(img_len)
            if (img_len >= arr.length) {
                btn = true;
                $(".click_").text("点击开启探索")
                //定义loading的位置
            };
        };  
    });


    load_wid = $(".load").width();
    //初始化先显示北京
    
    var load = $(".load")[0];

    css(load,"scale",100);
    // css(load,"translateX",-(load_wid/2));
    // css(load,"translateY",-(load_wid/2));

//首页字幕依次出现

    $('.click_1').fadeIn(1000,function(){
        $('.click_2').fadeIn(1000,function(){
            $('.click_3').fadeIn(1000,function(){
                $('.click_').fadeIn();
                $('.load').fadeIn();
            })
        })
    })

    
    $("#container").css({
        transformOrigin: '422px 156.74px'
    });
    css(container,"scale",5600)

    $('.load').css({
        left: ($("body").width())*0.5,
        top: ($("body").height())*0.54
    });


    $(".load").on("click",function(){
        if(btn){
            $("#media")[0].play();
            $(".click_1,.click_2,.click_3").fadeOut(1000);
            $(".click_").fadeOut(500);
            MTween({
                el: $(".load")[0],
                target:{
                    left: 99,
                    top: 485,
                    scale: 50,
                    // opacity: 0
                },
                time: 1000,
                type: "easeBothStrong",
                callBack: function(){
                    $("#loading").fadeOut(500);
                    // $("#container").fadeIn(500);
                    $("#container,#beijing .a0").fadeIn(500,function(){
                        code();
                    })
                }

            })

        }
    })
    

// 音乐播放


    $("#audio_btn img").on("click",function(){
        if ($(this).hasClass('audio_rotate')) {
            $(this).removeClass('audio_rotate');
            $("#media")[0].pause();
        }else{
            $(this).addClass('audio_rotate');
            $("#media")[0].play();
        }
    })

function code(){


    show_company($("#beijing"));

    setTimeout(function(){

        //北京视角拉低
        MTween({
            el: $("#container")[0],
            target: {
                scale: 100
            },
            time: 1000,
            type: "easeBothStrong"
        })
        //北京透明
        $("#beijing").fadeOut(1000,function(){
            $("#beijing").remove();
            $(".bj_cli").animate({opacity:1}, 500);
            // animation($(".bj_cli .guangquan"))
            $(".beijing_text").fadeIn(100);
        });

        setTimeout(function(){
            //北京到上海跳跃
            var bi_sh = $(".bj_sh img")[0];

            css(bi_sh,"rotate",-75)

            MTween({
                el: bi_sh,
                target: {
                    rotate: 33
                },
                time: 2100,
                type: "easeBothStrong",
                callProcess: function(){
                    var rote = css(bi_sh,"rotate")
                    //当旋转到一定角度，上海亮点显示，去除北京亮点
                    // console.log(rote)
                    if(rote >= (-25)){
                        if ($(".sh_cli").css('opacity') == 0) {
                            // console.log($(".sz_cli").css('opacity'))
                            $(".shanghai_text").fadeIn(300);
                            $(".sh_cli").animate({opacity: 1},300);
                        };
                    }
                },
                callBack: function(){
                    $(".bj_sh").remove();
                    animate2();
                }
            })
        },1000)

    },4000)

    
    //进入上海

    function animate2(){


            $("#container").css('transformOrigin', '589px 491px');

            $("#shanghai").fadeIn(1000);
            $(".sh_cli").animate({opacity: 0},100);
            MTween({
                el: contaier,
                target: {scale:5600},
                time: 500,
                type: "easeBothStrong",
                callBack: function(){
                    show_company($("#shanghai"));
                    setTimeout(function(){

                        $("#shanghai").fadeOut(2000,function(){
                            $("#shanghai").remove();
                            $(".sh_cli").animate({opacity:1}, 500);
                            // animation($(".sh_cli  .guangquan"))
                            $(".shanghai_text").fadeIn(100);
                        });

                        MTween({
                            el: contaier,
                            target: {scale: 100},
                            time:1000,
                            type: "easeBothStrong",
                            callBack: function(){
                                //上海到广州的跳跃
                                var sh_gz = $(".sh_gz img")[0];
                                css(sh_gz,"rotate",-62)

                                MTween({
                                    el: sh_gz,
                                    target: {rotate: 32},
                                    time: 2000,
                                    type: "easeBothStrong",
                                    callProcess: function(){
                                        var rote = css(sh_gz,"rotate")
                                        //当旋转到一定角度，上海亮点显示，去除北京亮点
                                        // console.log(rote)
                                        if(rote >= (-10)){
                                            if ($(".gz_cli").css('opacity') == 0) {
                                                // console.log($(".sh_cli").css('opacity'))
                                                $(".guangzhou_text").fadeIn(300);
                                                $(".gz_cli").animate({opacity: 1},300);
                                            };
                                        }
                                    },
                                    callBack: function(){
                                        $(".sh_gz").remove();
                                        //卡时间
                                        setTimeout(function(){
                                            animate3();
                                        },850)
                                    }
                                })

                            }
                        })

                    },3000)
                }

            })
    }

    //进入广州
    function animate3(){
        $("#container").css('transformOrigin', '336px 783px');

        $("#guangzhou").fadeIn(1000);
        $(".gz_cli").animate({opacity: 0},500);
        MTween({
            el: container,
            target: {
                scale: 5600
            },
            time: 1000,
            type: "easeBothStrong",
            callBack: function(){
                show_company($("#guangzhou"));
                setTimeout(function(){
                    //深圳缩小
                    $("#guangzhou").fadeOut(2000,function(){
                        $("#guangzhou").remove();
                        $(".gz_cli").animate({opacity:1}, 500);
                        // animation($(".gz_cli .guangquan"))
                        $(".guangzhou_text").fadeIn(100);
                    });

                    MTween({
                        el: contaier,
                        target: {scale:100},
                        time: 1500,
                        type: "easeBothStrong",
                        callBack: function(){
                            //广州到深圳
                            var gz_sz = $(".gz_sz img")[0];
                            css(gz_sz,"rotate",114)

                            MTween({
                                el: gz_sz,
                                target: {rotate: -55},
                                time: 1500,
                                type: "easeBothStrong",
                                callProcess: function(){
                                    var rote = css(gz_sz,"rotate")
                                    //当旋转到一定角度，上海亮点显示，去除北京亮点
                                    // console.log(rote)
                                    if(rote <= 46){
                                        if ($(".sz_cli").css('opacity') == 0) {
                                            $(".shenzhen_text").fadeIn(300);
                                            $(".sz_cli").animate({opacity: 1},300);
                                        };
                                    }
                                },
                                callBack:function(){
                                    $(".gz_sz").remove();
                                    animate4();
                                }
                            })
                        }
                    })


                },3000)
            }
        })
    }

    function animate4(){
        $("#container").css('transformOrigin', '366px 798px');

        $("#shenzhen").fadeIn(1000);
        $(".sz_cli").animate({opacity: 0},300);
        MTween({
            el: container,
            target: {
                scale: 5600
            },
            time: 2000,
            type: "easeBothStrong",
            callBack: function(){
                show_company($("#shenzhen"));
                setTimeout(function(){
                    //深圳缩小  
                    $("#shenzhen").fadeOut(1000,function(){
                        $("#shenzhen").remove();
                        $(".sz_cli").animate({opacity:1}, 2000);
                        // animation($(".sz_cli .guangquan"))
                        $(".shenzhen_text").fadeIn(2000);
                    });
                    MTween({
                        el: container,
                        target: {
                            scale: 100
                        },
                        time: 1500,
                        type: "easeBothStrong",
                        callBack: function(){
                            //深圳到武汉
                            //卡时间
                            setTimeout(function(){
                                var sz_wh = $(".sz_wh img")[0];
                                css(sz_wh,"rotate",66)
                                MTween({
                                    el: sz_wh,
                                    target: {rotate: -78},
                                    time: 2500,
                                    type: "easeBothStrong",
                                    callProcess: function(){
                                        var rote = css(sz_wh,"rotate")
                                        //当旋转到一定角度，上海亮点显示，去除北京亮点
                                        // console.log(rote)
                                        if(rote <= (-18)){
                                            if ($(".wh_cli").css('opacity') == 0) {
                                                $(".wh_cli").animate({opacity: 1},300);
                                                $(".wuhan_text").fadeIn(300);
                                                $(".wuhan_text").fadeIn(100);
                                                // animation($(".wh_cli .guangquan"))
                                            };
                                        }
                                    },
                                    callBack:function(){
                                        $(".sz_wh").remove();
                                        animate5();
                                    }
                                })
                            },3500)
                        }
                    })
                },3500)
            }
        })
    }

    // 武汉到厦门
    function animate5(){

        var wh_xm = $(".wh_xm img")[0];
        css(wh_xm,"rotate",-62)
        MTween({
            el: wh_xm,
            target: {rotate: 46},
            time: 2000,
            type: "easeBothStrong",
            callProcess: function(){
                var rote = css(wh_xm,"rotate")
                //当旋转到一定角度，上海亮点显示，去除北京亮点
                // console.log(rote)
                if(rote >= 4){
                    if ($(".xm_cli").css('opacity') == 0) {
                        $(".xiamen_text").fadeIn(300);
                        $(".xm_cli").animate({opacity: 1},300);
                        $(".xiamen_text").fadeIn(100);
                        // animation($(".xm_cli .guangquan"));
                    };
                }
            },
            callBack:function(){
                $(".wh_xm").remove();
                animate6();
            }
        })

    }

    // 厦门到杭州
    function animate6(){

        var xm_hz = $(".xm_hz img")[0];
        css(xm_hz,"rotate",61)
        MTween({
            el: xm_hz,
            target: {rotate: -33},
            time: 2000,
            type: "easeBothStrong",
            callProcess: function(){
                var rote = css(xm_hz,"rotate")
                //当旋转到一定角度，上海亮点显示，去除北京亮点
                // console.log(rote)
                if(rote <= 18){
                    if ($(".hz_cli").css('opacity') == 0) {
                        $(".hangzhou_text").fadeIn(300);
                        $(".hz_cli").animate({opacity: 1},300);
                        $(".hangzhou_text").fadeIn(100);
                        // animation($(".hz_cli .guangquan"));
                    };
                }
            },
            callBack:function(){
                $(".xm_hz").remove();
                animate7();
            }
        })

    }

    // 杭州到重庆
    function animate7(){

        var hz_cq = $(".hz_cq img")[0];
        css(hz_cq,"rotate",125)
        MTween({
            el: hz_cq,
            target: {rotate: -38},
            time: 2000,
            type: "easeBothStrong",
            callProcess: function(){
                var rote = css(hz_cq,"rotate")
                //当旋转到一定角度，上海亮点显示，去除北京亮点
                // console.log(rote)
                if(rote <= 18){
                    if ($(".cq_cli").css('opacity') == 0) {
                        $(".chongqing_text").fadeIn(300);
                        $(".cq_cli").animate({opacity: 1},300);
                        $(".chongqing_text").fadeIn(100);
                        // animation($(".cq_cli .guangquan"));
                    };
                }
            },
            callBack:function(){
                $(".hz_cq").remove();
                animate8();
            }
        })

    }

    // 重庆到成都
    function animate8(){

        var cq_cd = $(".cq_cd img")[0];
        css(cq_cd,"rotate",120)
        MTween({
            el: cq_cd,
            target: {rotate: -126},
            time: 1500,
            type: "easeBothStrong",
            callProcess: function(){
                var rote = css(cq_cd,"rotate")
                //当旋转到一定角度，上海亮点显示，去除北京亮点
                // console.log(rote)
                if(rote <= 43){
                    if ($(".cd_cli").css('opacity') == 0) {
                        $(".chengdu_text").fadeIn(300);
                        $(".cd_cli").animate({opacity: 1},300);
                        $(".chengdu_text").fadeIn(100);
                        // animation($(".cd_cli .guangquan"));
                    };
                }
            },
            callBack:function(){
                $(".cq_cd").remove();
                animate9();
            }
        })

    }

    //成都福建
    function animate9(){

        var cd_fz = $(".cd_fz img")[0];
        css(cd_fz,"rotate",159)
        MTween({
            el: cd_fz,
            target: {rotate: 416},
            time: 2000,
            type: "easeBothStrong",
            callProcess: function(){
                var rote = css(cd_fz,"rotate")
                //当旋转到一定角度，上海亮点显示，去除北京亮点
                // console.log(rote)
                if(rote >= 320){
                    if ($(".fz_cli").css('opacity') == 0) {
                        $(".fuzhou_text").fadeIn(300);
                        $(".fz_cli").animate({opacity: 1},300);
                        $(".fuzhou_text").fadeIn(100);
                        // animation($(".fz_cli .guangquan"));
                    };
                }
            },
            callBack:function(){
                $(".cd_fz").remove();
                bot2_();
            }
        })

    }


    //尾页方案2上拉动画效果
    function bot2_(){
         $("#bot").fadeIn(function(){
            $("#cli").fadeOut(1500,function(){
                $("#cli").remove();
            });
            $("#city_text").fadeOut(1500,function(){
                $("#city_text").remove();
                $(".mask").remove();

            });

                $(".mask_box").addClass('bot_ani');
                $(".mask_box").css('transform', 'translateY(-122%)');
            // var top_ = $('body').height()/100*62;
            // var mask_box_hei = $(".mask_box").height();
            // console.log(top_)
            
            // var mask_box = $(".mask_box")[0];
            // $(".mask_box").animate({top: (-top_)}, 20000)
            // css(mask_box,"translateY",0)
            // MTween({
            //     el: mask_box,
            //     target: {translateY: -(mask_box_hei+mask_box_hei/5)},
            //     time: 20000,
            //     type: "linear"
            // })

            // $(".mask_box").animate({top: -(top_)},20000)


         });
    }

    //城市里的公司一次点亮的方法
    function show_company(city){
        
        var num = 0;

        var len = city.find('.city').length;
        // console.log(len)
        var timer = setInterval(function(){
            num++;
            if (num >= len-1) {
                clearInterval(timer)
            };
        city.find('.a'+num).fadeIn(400);

        },400)
    }
}


//js定义动画
    function animation(obj){

        css(obj[0], 'scale',100);
        ani1()
        function ani1(){
            MTween({
                el: obj[0],
                target: {opacity: 0,scale: 150},
                time: 800,
                type: "easeBothStrong",
                callBack: function(){
                    ani2();
                }
            })
        }

        function ani2(){
            MTween({
                el: obj[0],
                target: {opacity: 100,scale: 100},
                time: 800,
                type: "easeBothStrong",
                callBack: function(){
                    ani1();
                }
            })
        }
    }


    //落地页动画
    function el_ani(obj){
        // obj.children('p').eq(0).css('display', 'block').addClass('bandown');
        obj.children('p').eq(0).fadeIn();
        setTimeout(function(){
            obj.children('p').eq(1).fadeIn();
        },500)
    };

    $("#bot .text").each(function(index, el) {
        var str = $(this).text();

        $(this).text(str.toUpperCase())
    });

    weixinShare()

});

function weixinShare() {
$.ajax({
    url : './weixinapi/api.php',
    data : {
        url: location.href.split('#')[0],
        type: "signature"
    },
    dataType: "json",
    success : function(result) {
        if (result.code != 0) {
            alert('获取签名出错');
            return;
        }
        configWeixin(result.data)   
    }
});
var setupWeixinShare = function (message) {
                wx.onMenuShareTimeline(message);
                wx.onMenuShareAppMessage(message);
                wx.onMenuShareQQ(message);
                wx.onMenuShareWeibo(message);
                wx.onMenuShareQZone(message);
        };

        var configWeixin = function (options) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: options.appId, // 必填，公众号的唯一标识
                timestamp: options.timestamp, // 必填，生成签名的时间戳
                nonceStr: options.nonceStr, // 必填，生成签名的随机串
                signature: options.signature,// 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'onMenuShareQZone'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        };

        wx.ready(function () {
            setupWeixinShare({
                title: '寻找城市里的每一个幕后英雄', // 分享标题
                desc: '这个H5里面，有每一个你', // 分享描述授人以鱼不如授人以渔，内创改变了她们
                link: 'http://www.zgjrzj.com/lg/index.html', // 分享链接
                imgUrl: 'http://www.zgjrzj.com/lg/imgs/logo.jpg', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.hideMenuItems({
                menuList: [
                'menuItem:copyUrl',
                'menuItem:originPage','menuItem:editTag',
                'menuItem:share:email','menuItem:delete',
                'menuItem:openWithQQBrowser','menuItem:openWithSafari'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        });
}
