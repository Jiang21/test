$(function(){
    //搜索栏
    (function(){
        var oText = $('#text');
        var arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        var iNow = 0;
        oText.val(arrText[0]);
        $('#menu li').each(function(index){
            $(this).on('click',function(){
                $('#menu li').attr('class','gradient');
                $(this).attr('class','active');
                oText.val(arrText[index]);
                iNow = index;
            });
        });
        oText.focus(function(){
            if(oText.val() === arrText[iNow]){
                oText.val('');
            };
        });
        oText.blur(function(){
            if(oText.val()===''){
                console.log(iNow);
                oText.val(arrText[iNow]);
            };
        });
    })();
    //消息切换
    (function(){
        var oUl = $('.update').find('ul');
        var html = '';
        var iNow = 0;
        var timer = null;
        var arrData = [
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
            { 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
            { 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
            { 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
            { 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
        ];
        for(var i =0;i<arrData.length;i++){
            html += '<li><p><strong>'+arrData[i].name+'&nbsp;</strong><span>'+arrData[i].time+'分钟前&nbsp;</span> <a href="'+arrData[i].url+'">写了一篇新文章 :'+arrData[i].title+'</a></p></li>'
        }
        oUl.html(html);

        var height = oUl.find('li').height();
        $('#up').click(function(){
            doMove(-1);
        });
        $('#down').click(function(){
            doMove(1);
        });
        $('.update').hover(function(){
            clearInterval(timer);
        },function(){
            console.log('hahah');
            autoPlay();
        });
        function autoPlay(){
            timer = setInterval(function(){
                doMove(-1);
            },3500);
        };
        autoPlay();

        function doMove( num ) {
            iNow += num;
            if ( Math.abs(iNow) > arrData.length-1 ) {
                iNow = 0;
            }
            if ( iNow > 0 ) {
                iNow = -(arrData.length-1);
            }
            oUl.stop().animate({ 'top': height*iNow }, 2200, 'elasticOut');
        }
    })();
    //options tab切换
    (function(){
        tab($('.tabNav1'),$('.tabCon1'),'click');
        tab($('.tabNav2'),$('.tabCon2'),'click');
        tab($('.tabNav3'),$('.tabCon3'),'mouseover');
        tab($('.tabNav4'),$('.tabCon4'),'mouseover');
        function tab(oUl,oCon,oName){
            var oEle = oUl.children();
            oCon.hide().eq(0).show();
            oEle.each(function(index){
                $(this).on(oName,function(){
                    oEle.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    oEle.find('a').attr('class','triangle_down_gray')
                    $(this).find('a').attr('class','triangle_down_red');
                    oCon.hide().eq(index).show();

                });
            });
        }

    })();
    //BBS论坛
    (function(){
        var oLi = $('.bbs').find('ol').children()
//          oLi.eq(0).addClass('a')
        oLi.each(function(){
            $(this).mouseover(function(){
                oLi.attr('class','');
                $(this).addClass('active');
            });
        })
    })();
    //焦点图切换
    (function(){
        var text =['爸爸去哪了','哈哈，美女啊','嘿嘿，好开心呀'];
        var oDiv = $('.pic');
        var oUl = oDiv.find('ul').children();
        var oL = oDiv.find('ol').children();
        var oText = oDiv.find('p').eq(0);
        var iNow = 0;
        var timer = null;
        outFade(iNow);
        oL.each(function(index){
            $(this).click(function(){
                outFade(index);
                iNow = index;
            });
        });
        oDiv.hover(function(){
            clearInterval(timer);
        },function(){
            auotoPlay();
        })
        function auotoPlay(){
            timer = setInterval(function(){
                iNow++;
                iNow%=oUl.size();
                outFade(iNow);
            },3000)
        };
        auotoPlay();
        function outFade(iNow){
            oL.each(function(index){
                if(index!=iNow){
                    oUl.eq(index).fadeOut().css('zIndex',1);
                    oL.eq(index).removeClass('active');
                }
                else{
                    oUl.eq(index).fadeIn().css('zIndex',2);
                    oL.eq(index).addClass('active');
                    oText.html(text[index]);
                }
            });
        }

    })();
    //日历提示
    (function(){
        var oSpan = $('.calendar h3 span');
        var oImg = $('.calendar ol .img');
        var infoImg = $('.calendar .today_info img');
        var oStrong = $('.today_info strong');
        var oTodayDiv = $('.today_info');
        var oText = $('.today_info p');
        oImg.each(function(){
            $(this).hover(function(){
                var oTop = $(this).parent().position().top -30;
                var oLeft =  $(this).parent().position().left + 50;
                var weak = $(this).parent().index()%oSpan.size();
                oTodayDiv.show().css({'top':oTop,'left':oLeft});
                infoImg.attr('src',$(this).attr('src'));
                oText.html($(this).attr('info'));
                oStrong.html(oSpan.eq(weak).html());
            },function(){
                oTodayDiv.hide();
            });
        });
    })();
});