
$(document).ready(function(){
    

    var arr = [];
    $("img").each(function(index, el) {
        arr.push($(this).attr("src"))
    });

    var img_len = 0;
    var btn = false;


    //音乐自动播放
    // function autoPlayMusic() {
    //     // 自动播放音乐效果，解决浏览器或者APP自动播放问题
    //     function musicInBrowserHandler() {
    //         // musicPlay(true);
    //         document.body.removeEventListener('touchstart', musicInBrowserHandler);
    //     }
    //     document.body.addEventListener('touchstart', musicInBrowserHandler);

    //     // 自动播放音乐效果，解决微信自动播放问题
    //     function musicInWeixinHandler() {
    //         // musicPlay(true);
    //         document.addEventListener("WeixinJSBridgeReady", function () {
    //             // musicPlay(true);
    //         }, false);
    //         document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
    //     }
    //     document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
    // }
    // function musicPlay(isPlay) {
    //     var audio = document.getElementById('musicid');
    //     if (isPlay && audio.paused) {
    //         audio.play();
    //     }
    //     if (!isPlay && !audio.paused) {
    //         audio.pause();
    //     }
    // }
    // autoPlayMusic();

    $.each(arr, function(index, val) {
         var img = new Image();
         img.src = val;
         img.onload = function(){
            img_len++;
            // console.log(img_len)
            if (img_len >= arr.length) {
                // var audio = document.createElement("audio");
                // audio.src = "audio/4.mp3";
                // audio.addEventListener("canplaythrough",function(e) {
                // 　　console.log(e)
                    btn = true;
                    $(".click_").text("请点击")
                // },
                // false);
                // var audio = new Audio();
                // audio.src = "audio/4.mp3";
                // audio.addEventListener('error', function(e){
                //     console.log(e)
                //     btn = true;
                //     $(".click_").text("请点击")
                // }, false);
                
            };
        };  
    });

    //初始化先显示北京
    var contaier = $("#container")[0];
    var load = $(".load")[0];

    css(load,"scale",400);
    css(load,"translateX",-25);
    css(load,"translateY",-25);


    $("#container").css({
        transformOrigin: '422px 156.74px'
    });

    css(container,"scale",5600)


    $(".load").on("click",function(){
        if(btn){
            $("#media")[0].play();
            $(".click_").fadeOut(500);
            MTween({
                el: $(".load")[0],
                target:{
                    left: 74,
                    top: 510,
                    scale: 1,
                    opacity: 0
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
            // $(".load").animate({left: 74,top:510,scale:1,opacity:0}, 2000,function(){
            //     $("#loading").fadeOut(1000);
            //     $("#container").fadeIn(1000);
            //     $("#beijing .a0").fadeIn(1000,function(){
            //         $("#media")[0].play();
            //         code();
            //     })
            // })
            // MTween({
            //     el: load,
            //     target: {left:74,top:510,scale:100,opacity:0},
            //     time: 2000,
            //     type: "easeBothStrong",
            //     callBack: function(){
            //         $("#loading").fadeOut(1000);
            //         $("#container").fadeIn(1000);
            //         $("#beijing .a0").fadeIn(1000,function(){
            //             $("#media")[0].play();
            //             code();
            //         })
            //     }
            // })
            // $("#loading").hide();
            // code();
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
                    rotate: 40
                },
                time: 3000,
                type: "easeBothStrong",
                callProcess: function(){
                    var rote = css(bi_sh,"rotate")
                    //当旋转到一定角度，上海亮点显示，去除北京亮点
                    // console.log(rote)
                    if(rote >= (-25)){
                        if ($(".sh_cli").css('opacity') == 0) {
                            console.log($(".sz_cli").css('opacity'))
                            $(".sh_cli").animate({opacity: 1},300);
                        };
                    }
                },
                callBack: function(){
                    animate2();
                }
            })
        },1000)

    },4000)

    
    //进入上海

    function animate2(){


            $("#container").css('transformOrigin', '589px 491px');

            $("#shanghai").fadeIn(300);
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
                            $(".sh_cli").animate({opacity:1}, 500);
                            // animation($(".sh_cli  .guangquan"))
                            $(".shanghai_text").fadeIn(100);
                        });

                        MTween({
                            el: contaier,
                            target: {scale: 100},
                            time:2000,
                            type: "easeBothStrong",
                            callBack: function(){
                                //上海到广州的跳跃
                                var sh_gz = $(".sh_gz img")[0];
                                css(sh_gz,"rotate",-62)

                                MTween({
                                    el: sh_gz,
                                    target: {rotate: 32},
                                    time: 3000,
                                    type: "easeBothStrong",
                                    callProcess: function(){
                                        var rote = css(sh_gz,"rotate")
                                        //当旋转到一定角度，上海亮点显示，去除北京亮点
                                        // console.log(rote)
                                        if(rote >= (-10)){
                                            if ($(".gz_cli").css('opacity') == 0) {
                                                console.log($(".sh_cli").css('opacity'))
                                                $(".gz_cli").animate({opacity: 1},300);
                                            };
                                        }
                                    },
                                    callBack: function(){
                                        animate3();
                                    }
                                })

                            }
                        })

                    },4000)
                }

            })
    }

    //进入广州
    function animate3(){
        $("#container").css('transformOrigin', '336px 783px');

        $("#guangzhou").fadeIn(300);
        $(".gz_cli").animate({opacity: 0},500);
            MTween({
                el: container,
                target: {
                    scale: 5600
                },
                time: 2000,
                type: "easeBothStrong",
                callBack: function(){
                    show_company($("#guangzhou"));
                    setTimeout(function(){
                        //深圳缩小
                        $("#guangzhou").fadeOut(2000,function(){
                            $(".gz_cli").animate({opacity:1}, 500);
                            // animation($(".gz_cli .guangquan"))
                            $(".guangzhou_text").fadeIn(100);
                        });

                        MTween({
                            el: contaier,
                            target: {scale:100},
                            time: 2000,
                            type: "easeBothStrong",
                            callBack: function(){
                                //广州到深圳
                                var gz_sz = $(".gz_sz img")[0];
                                css(gz_sz,"rotate",114)

                                MTween({
                                    el: gz_sz,
                                    target: {rotate: -74},
                                    time: 1500,
                                    type: "easeBothStrong",
                                    callProcess: function(){
                                        var rote = css(gz_sz,"rotate")
                                        //当旋转到一定角度，上海亮点显示，去除北京亮点
                                        // console.log(rote)
                                        if(rote <= 46){
                                            if ($(".sz_cli").css('opacity') == 0) {
                                                $(".sz_cli").animate({opacity: 1},300);
                                            };
                                        }
                                    },
                                    callBack:function(){
                                        animate4();
                                    }
                                })
                            }
                        })


                    },4000)
                }
            })
    }

    function animate4(){
        $("#container").css('transformOrigin', '366px 798px');

        $("#shenzhen").fadeIn(300);
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
                        $(".sz_cli").animate({opacity:1}, 2000);
                        // animation($(".sz_cli .guangquan"))
                        $(".shenzhen_text").fadeIn(2000);
                    });
                    MTween({
                        el: container,
                        target: {
                            scale: 100
                        },
                        time: 2000,
                        type: "easeBothStrong",
                        callBack: function(){
                            //深圳到武汉
                            var sz_wh = $(".sz_wh img")[0];
                            css(sz_wh,"rotate",66)
                            MTween({
                                el: sz_wh,
                                target: {rotate: -88},
                                time: 2000,
                                type: "easeBothStrong",
                                callProcess: function(){
                                    var rote = css(sz_wh,"rotate")
                                    //当旋转到一定角度，上海亮点显示，去除北京亮点
                                    // console.log(rote)
                                    if(rote <= (-18)){
                                        if ($(".wh_cli").css('opacity') == 0) {
                                            $(".wh_cli").animate({opacity: 1},300);
                                            $(".wuhan_text").fadeIn(100);
                                            // animation($(".wh_cli .guangquan"))
                                        };
                                    }
                                },
                                callBack:function(){

                                    animate5();
                                }
                            })
                        }
                    })
                },4000)
            }
        })
    }

    // 武汉到厦门
    function animate5(){

        setTimeout(function(){
            var wh_xm = $(".wh_xm img")[0];
            css(wh_xm,"rotate",-67)
            MTween({
                el: wh_xm,
                target: {rotate: 75},
                time: 2000,
                type: "easeBothStrong",
                callProcess: function(){
                    var rote = css(wh_xm,"rotate")
                    //当旋转到一定角度，上海亮点显示，去除北京亮点
                    // console.log(rote)
                    if(rote >= 4){
                        if ($(".xm_cli").css('opacity') == 0) {
                            $(".xm_cli").animate({opacity: 1},300);
                            $(".xiamen_text").fadeIn(100);
                            // animation($(".xm_cli .guangquan"));
                        };
                    }
                },
                callBack:function(){

                    animate6();
                }
            })
        },500)

    }

    // 厦门到杭州
    function animate6(){

        setTimeout(function(){
            var xm_hz = $(".xm_hz img")[0];
            css(xm_hz,"rotate",70)
            MTween({
                el: xm_hz,
                target: {rotate: -60},
                time: 2000,
                type: "easeBothStrong",
                callProcess: function(){
                    var rote = css(xm_hz,"rotate")
                    //当旋转到一定角度，上海亮点显示，去除北京亮点
                    // console.log(rote)
                    if(rote <= 18){
                        if ($(".hz_cli").css('opacity') == 0) {
                            $(".hz_cli").animate({opacity: 1},300);
                            $(".hangzhou_text").fadeIn(100);
                            // animation($(".hz_cli .guangquan"));
                        };
                    }
                },
                callBack:function(){

                    animate7();
                }
            })
        },500)

    }

    // 杭州到重庆
    function animate7(){

        setTimeout(function(){
            var hz_cq = $(".hz_cq img")[0];
            css(hz_cq,"rotate",125)
            MTween({
                el: hz_cq,
                target: {rotate: -60},
                time: 2000,
                type: "easeBothStrong",
                callProcess: function(){
                    var rote = css(hz_cq,"rotate")
                    //当旋转到一定角度，上海亮点显示，去除北京亮点
                    // console.log(rote)
                    if(rote <= 18){
                        if ($(".cq_cli").css('opacity') == 0) {
                            $(".cq_cli").animate({opacity: 1},300);
                            $(".chongqing_text").fadeIn(100);
                            // animation($(".cq_cli .guangquan"));
                        };
                    }
                },
                callBack:function(){

                    animate8();
                }
            })
        },500)

    }

    // 重庆到成都
    function animate8(){

        setTimeout(function(){
            var cq_cd = $(".cq_cd img")[0];
            css(cq_cd,"rotate",131)
            MTween({
                el: cq_cd,
                target: {rotate: -142},
                time: 1000,
                type: "easeBothStrong",
                callProcess: function(){
                    var rote = css(cq_cd,"rotate")
                    //当旋转到一定角度，上海亮点显示，去除北京亮点
                    // console.log(rote)
                    if(rote <= 43){
                        if ($(".cd_cli").css('opacity') == 0) {
                            $(".cd_cli").animate({opacity: 1},300);
                            $(".chengdu_text").fadeIn(100);
                            // animation($(".cd_cli .guangquan"));
                        };
                    }
                },
                callBack:function(){
                    animate9();
                }
            })
        },500)

    }

    //成都福建
    function animate9(){

        setTimeout(function(){
            var cd_fz = $(".cd_fz img")[0];
            css(cd_fz,"rotate",159)
            MTween({
                el: cd_fz,
                target: {rotate: 422},
                time: 2000,
                type: "easeBothStrong",
                callProcess: function(){
                    var rote = css(cd_fz,"rotate")
                    //当旋转到一定角度，上海亮点显示，去除北京亮点
                    // console.log(rote)
                    if(rote >= 320){
                        if ($(".fz_cli").css('opacity') == 0) {
                            $(".fz_cli").animate({opacity: 1},300);
                            $(".fuzhou_text").fadeIn(100);
                            // animation($(".fz_cli .guangquan"));
                        };
                    }
                },
                callBack:function(){

                    bot2_();
                }
            })
        },500)

    }


    //尾页方案2上拉动画效果
    function bot2_(){
         $("#bot").fadeIn(function(){
            var top_ = $('body').height()/100*62;
            console.log(top_)
            var mask_box = $(".mask_box")[0];
            // $(".mask_box").animate({top: (-top_)}, 5000)
            
            $(".mask_box").animate({top: -(top_)},15000)


         });
    }
    //尾页
    function bot(){
        el_ani($(".bot_p1"));
        setTimeout(function(){
           el_ani($(".bot_p2")); 
           setTimeout(function(){
            el_ani($(".bot_p3"));
               setTimeout(function(){
                el_ani($(".bot_p4"));

                   setTimeout(function(){
                    el_ani($(".bot_p5"));

                       setTimeout(function(){
                        el_ani($(".bot_p6"));

                           setTimeout(function(){
                            el_ani($(".bot_p7"));

                               setTimeout(function(){
                                el_ani($(".bot_p8")); 
                                setTimeout(function(){
                                    $(".botto").fadeIn();
                                },600)
                               },600) 
                           },600) 
                       },600) 
                   },600)
               },600)
           },600)
        },600)
    }
    //城市里的公司一次点亮的方法
    function show_company(city){
        
        var num = 0;

        var len = city.find('.city').length;
        console.log(len)
        var timer = setInterval(function(){
            num++;
            if (num >= len-1) {
                clearInterval(timer)
            };
        city.find('.a'+num).fadeIn(500);

        },500)
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
        },400)
    };

    $("#bot .text").each(function(index, el) {
        var str = $(this).text();

        $(this).text(str.toUpperCase())
    });

});