var log = function () {
    console.log(arguments)
};

// 这个函数用来根据 weibo 对象生成一条微博的 HTML 代码
var weiboTemplate;
weiboTemplate = function (weibo) {
    var w = weibo;
    console.log('weibo of template', w)
    var t;
    t = `
    <div class="weibo-cell">
        <img src="${ w.avatar }" class="avatar">
        ${ w.weibo }
        ${ w.created_time }
        by: ${ w.name }
        <div class="weibo-content">
            <button class="weibo-delete" data-id="${ w.id }">删除</button>
            <button class="weibo-comment">评论(${ w.comments_num })</button>
            <button class="weibo-edit">编辑</button>
        </div>
        <div class="comment-div hide comment-container">
            <div class="comment-list">
                <!--{% for c in t.comment %}-->
                <!--<div class="cell-inner item">-->
                    <!--<img src="{{ c.avatar }}" class="avatar-s">-->
                    <!--<span class="comment">{{ c.comment }}</span>-->
                    <!--{{ c.created_time }}-->
                    <!--by:{{ c.name }}-->
                <!--</div>-->
                <!--{% endfor %}-->
            </div>
            <input id="id-input-comment-id" type="hidden" name="weibo_id" value="{{ t.id }}">
            <input id="id-input-comment-content" name="content" class="left m" placeholder="Comment">
            <button id="id-button-comment-add" class="comment-add" data-weibo-id="{{ t.id }}">发表</button>
        </div>
        <div class="hide edit-container" id="edit">
            <input id="id-input-edit-id" type="hidden" name="weibo_id" value="{{ t.id }}">
            <input id="id-input-edit" name="weibo" class="left m" placeholder="Edit">
            <button id="id-button-edit" class="weibo-edit" data-weibo-id="{{ t.id }}">编辑</button>
        </div>
    </div>              
    `;
    return t
};

var commentTemplate;
commentTemplate = function (comment) {
    var c = comment;
    log('temeplate的C', c)
    var t;
    t = `
    <div class="cell-inner item">
        <img src="${ c.avatar }" class="avatar-s">
        <span class="comment">${ c.comment }</span>
        ${ c.created_time }
        by:${ c.name }
    </div>
    `;
    return t
};

var bindEventCommentToggle;
bindEventCommentToggle = function () {
    // 展开评论事件
    $('.weibo-container').on('click', '.weibo-comment', function () {
        var a = $(this)
        log('weibo comment toggle', a)
        $(this).parent().next().slideToggle();
        // 因为展开评论是一个超链接 a 标签
        // 所以需要 return false 来阻止它的默认行为
        // a 的默认行为是跳转链接，没有指定 href 的时候就跳转到当前页面
        // 所以需要阻止
        // return false;
    })
};

var bindEventEditToggle;
bindEventEditToggle = function () {
    // 展开评论事件
    $('.weibo-container').on('click', '.weibo-edit', function () {
        $(this).parent().next().next().slideToggle();
        // $('#edit').slideToggle();
        // 因为展开评论是一个超链接 a 标签
        // 所以需要 return false 来阻止它的默认行为
        // a 的默认行为是跳转链接，没有指定 href 的时候就跳转到当前页面
        // 所以需要阻止
        return false;
    })
};

var bindEventCommentAdd = function () {
    // 给按钮绑定添加 weibo 事件
    var m = $('.weibo-container').find('.comment-add')
    var n = m.find('.comment-add-button')
    var p = $('.weibo-container').find('.comment-add').find('.comment-add-button')
    n.on('click', function () {
        // 得到微博的内容并且生成 form 数据
        log('m is, n is, p is', m, n, p)
        var w_id = $(this).prev().prev().val()
        var w = $(this).parent()
        var ts = $(this)
        log('w is, this is', w, ts)
        var weibo_id = $(this).data('weibo-id');
        var content = $(this).prev().val();
        log('w_id, id, comment,', w_id, weibo_id, content);
        var form = {
            weibo_id: weibo_id,
            comment: content,
        };
        log('form', form)
        // 这个响应函数会在 AJAX 调用完成后被调用
        var response = function (r) {
            /*
             这个函数会被 weiboAdd 调用，并且传一个 r 参数进来
             r 参数的结构如下
             {
             'success': 布尔值,
             'data': 数据,
             'message': 错误消息
             }
             */
            // arguments 是包含所有参数的一个 list
            if (r.success) {
                // 如果成功就添加到页面中
                // 因为添加微博会返回已添加的微博数据所以直接用 r.data 得到
                var c = r.data;
                log('c传入前', c)
                var b = ts
                var d = b.closest('.weibo-cell')
                var a = d.find('.comment-list')
                var x = ts.closest('.weibo-cell').find('.comment-list')
                log('a is,d is, b is, x is', a, d, b, x)
                x.prepend(commentTemplate(c))
                // location.reload()
                alert("添加成功")
            } else {
                // 失败，弹出提示
                alert(r.message)
            }
        };

        // 把上面的 form 和 response 函数传给 weiboAdd
        // api 在 api.js 中，因为页面会先引用 api.js 再引用 weibo.js
        // 所以 weibo.js 里面可以使用 api.js 中的内容
        api.commentAdd(form, response)
    })
};

var bindEventWeiboAdd = function () {
    // 给按钮绑定添加 weibo 事件
    $('#id-button-weibo-add').on('click', function () {
        // 得到微博的内容并且生成 form 数据
        var weibo = $('#id-input-weibo').val();
        var weibo_w = $('#id-input-weibo').parent();
        log('weibo_w is', weibo_w)
        log('weibo,', weibo);
        var form = {
            weibo: weibo,
        };

        // 这个响应函数会在 AJAX 调用完成后被调用
        var response = function (r) {
            /*
             这个函数会被 weiboAdd 调用，并且传一个 r 参数进来
             r 参数的结构如下
             {
             'success': 布尔值,
             'data': 数据,
             'message': 错误消息
             }
             */
            // arguments 是包含所有参数的一个 list
            console.log('成功', arguments);
            log(r);
            if (r.success) {
                // 如果成功就添加到页面中`
                // 因为添加微博会返回已添加的微博数据所以直接用 r.data 得到
                var w = r.data;
                // $('.weibo-container').prepend(weiboTemplate(w));
                // $(this).parent().prepend(weiboTemplate(w));
                $('.weibo-container').prepend(weiboTemplate(w))
                alert("添加成功")
                // location.reload()
            } else {
                // 失败，弹出提示
                alert(r.message)
            }
        };

        // 把上面的 form 和 response 函数传给 weiboAdd
        // api 在 api.js 中，因为页面会先引用 api.js 再引用 weibo.js
        // 所以 weibo.js 里面可以使用 api.js 中的内容
        api.weiboAdd(form, response)
    })
};

var bindEventWeiboEdit = function () {
    // 给按钮绑定添加 weibo 事件
    var m = $('.weibo-container').find('.edit-container')
    var n = m.find('.weibo-edit')
    var p = $('.weibo-container').find('.edit-container').find('.weibo-edit')
    p.on('click', function () {
        // $('.weibo-container').on('click', '.weibo-edit', function(){
        // 得到微博的内容并且生成 form 数据
        var ts = $(this)
        log('weibo edit ts m n p ', ts, m, n, p)
        var weibo = $(this).prev().val();
        var weibo_id = $(this).data('weibo-id');
        // log('weibo_id', weibo_id);
        // log('weibo_weibo', weibo);
        var form = {
            weibo_id: weibo_id,
            weibo: weibo,
        };
        log('edit的form', form)
        // 这个响应函数会在 AJAX 调用完成后被调用
        var response = function (r) {
            /*
             这个函数会被 weiboAdd 调用，并且传一个 r 参数进来
             r 参数的结构如下
             {
             'success': 布尔值,
             'data': 数据,
             'message': 错误消息
             }
             */
            // arguments 是包含所有参数的一个 list
            console.log('成功', arguments);
            log(r);
            if (r.success) {
                // 如果成功就添加到页面中
                // 因为添加微博会返回已添加的微博数据所以直接用 r.data 得到
                var w = r.data;
                var x = ts.closest('.weibo-cell')
                var y = x.find('.weibo-content-span')
                var z = x.find('.weibo-created_time-span')
                var created_time = w.created_time
                log('edit x y w', x, y, w)
                y.replaceWith(weibo)
                // y.value = weibo
                // z.replaceWith(created_time)
                // $('.weibo-container').prepend(x);
                // x.remove()
                alert("修改成功")
            } else {
                // 失败，弹出提示
                alert(r.message)
            }
        };

        // 把上面的 form 和 response 函数传给 weiboAdd
        // api 在 api.js 中，因为页面会先引用 api.js 再引用 weibo.js
        // 所以 weibo.js 里面可以使用 api.js 中的内容
        api.weiboEdit(form, response)
    })
};

var bindEventWeiboDelete = function () {
    // 绑定删除微博按钮事件
    $('.weibo-container').on('click', '.weibo-delete', function () {
        // 得到当前的 weibo_id
        var weiboId = $(this).data('id');
        log(weiboId);
        // 得到整个微博条目的标签
        var weiboCell = $(this).closest('.weibo-cell');

        // 调用 api.weiboDelete 函数来删除微博并且在删除成功后删掉页面上的元素
        api.weiboDelete(weiboId, function (response) {
            // 直接用一个匿名函数当回调函数传给 weiboDelete
            // 这是 js 常用的方式
            var r = response;
            if (r.success) {
                console.log('成功', arguments);
                // slideUp 可以以动画的形式删掉一个元素
                $(weiboCell).slideUp();
                alert("删除成功")
            } else {
                console.log('错误', arguments);
                alert("删除失败")
            }
        })
    })
};

var bindEvents;
bindEvents = function () {
    // 不同的事件用不同的函数去绑定处理
    // 这样逻辑就非常清晰了
    bindEventCommentToggle()
    bindEventEditToggle()
    bindEventCommentAdd()
    bindEventWeiboAdd()
    bindEventWeiboDelete()
    bindEventWeiboEdit()
};

// 页面载入完成后会调用这个函数，所以可以当做入口
$(document).ready(function () {
    // 用 bindEvents 函数给不同的功能绑定事件处理
    // 这样逻辑就非常清晰了
    bindEvents();
    //good
});

