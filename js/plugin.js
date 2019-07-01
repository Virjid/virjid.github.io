(function ($) {
    var namespace = 'vCalendar';

    var util = {
        MONTH_NAMES: ['January','February','March',
                      'April'  ,'May'     ,'June',
                      'July'   ,'August'  ,'September',
                      'October','November','December'],
        isLeapYear(_year) {
            if(_year%400 === 0 || 
                (_year%4 === 0 && _year%100 !== 0)) return true;
            else                                    return false;
        },

    };

    var methods = {
        init(options) {
            options = $.extend($.fn.vCalendar.defaults, options);

            if (this.filter(function() {
                return $(this).data(namespace);
            }).length !== 0) { // 元素已经被初始化
                $.error('The plugin has already been initialized');
            }
            this.data(namespace, options);

            var current_pointer_div = $(`<div class="current-pointer"/>`);
            var year_div = $(`<p class="year"/>`);
            var month_title_div = $(`<h1 class="month"/>`);
            var month_div = $(`<p class="month"/>`);
            year_div.appendTo(current_pointer_div);
            month_title_div.appendTo(current_pointer_div);
            month_div.appendTo(current_pointer_div);

            var today = new Date();
            var year = today.getFullYear();
            var month = today.getMonth() + 1;
            var day = today.getDate();

            year_div.text(year);
            month_title_div.text(month);
            month_div.text(util.MONTH_NAMES[month-1]);

            var date_list = $(`<ol class="date-list"/>`);

            // if (month in [1,3,5,7,8,10,12] && day==1) {
            //     var tomorrow = 31;
            //     month = 
            // } else {

            // }
            var tomorrow = day - 1;
            if (tomorrow<1) tomorrow = new Date(year,month-1,0).getDate();
            $(`<li class="date"/>`).text(tomorrow<10?`0${tomorrow}`:tomorrow).appendTo(date_list);
            $(`<li class="date today"/>`).text(day<10?`0${day}`:day).appendTo(date_list);
            var futures = [day+1,day+2,day+3];
            for (let i = 0; i < 3; i++) {
                let date = $(`<li class="date"/>`);
                date.text(futures[i]<10?`0${futures[i]}`:futures[i]);
                date.appendTo(date_list);
            }

            current_pointer_div.appendTo(this);
            date_list.appendTo(this);
        },
        destory(options) {

        }
    };

    $.fn.vCalendar = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error(`Method ${method} does not exist on jQuery.vCalendar`);
        }
    };
})(jQuery);