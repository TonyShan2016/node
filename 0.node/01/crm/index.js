/**
 * Created by ShanGuo on 2017/5/14.
 */
(function () {
    let $$ = (ele) => document.querySelector(ele);

    let userList = $$('#userList');

    // 获取用户数据
    function getInitData(callBack) {
        $.ajax({
            url: '/getAllUsers',
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                if(result && result.error === 0) {
                    typeof callBack === 'function'? callBack(result['data']) : null;
                }
            }
        });
    }
    getInitData(bindData);

    // 数据绑定
    function bindData(data) {
        let str = '';
        for (let i = 0; i < data.length; i++) {
            let curData = data[i];
            str += `
                <li>
                <span>${curData.id}</span>
                <span>${curData.name}</span>
                <span>${curData.tel}</span>
                <span><a href="">修改</a> <a class="removeBtn" href="javascript:;" data-rid=${curData.id}>删除</a></span>
                </li>
              `
        }
        userList.innerHTML = str;
        let removeBtn = document.querySelectorAll('.removeBtn');
        for(let i = 0; i < removeBtn.length; i++){
            let curBtn = removeBtn[i];
            curBtn.onclick = removeInfo;
        }

        function removeInfo() {
            let rid = this.getAttribute('data-rid');
            let that = this;
            $.ajax({
                url: '/removeUserInfo',
                data: {
                    rid: rid
                },
                dataType: 'json',
                success: function (result) {
                    if(result && result.error === 0) {
                        userList.removeChild(that.parentNode.parentNode);
                        alert(result.msg);
                    }
                }
            })
        }
    }






})();
