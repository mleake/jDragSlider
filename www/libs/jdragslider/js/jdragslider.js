(function () {

    var namespace = 'dragSlider';

    window.dragSlider = function (jHandle, closestParentSelector, isHorizontal, fn) {
        jHandle.data('isDragging', true);

        if ('undefined' === typeof fn) {
            fn = function (percent) {
            };
        }

        var jParent = jHandle.closest(closestParentSelector);
        var max = 0;
        var min = 0;
        if (true === isHorizontal) {
            min = jParent.offset().left;
            max = min + jParent.width();
        }
        else {
            min = jParent.offset().top;
            max = min + jParent.height();
        }


        $(window)
            .off('mouseup.' + namespace)
            .on('mouseup.' + namespace, function () {
                jHandle.data('isDragging', false);
                $(window).off('mouseup.' + namespace);
                $(window).off('mousemove.' + namespace);
            });
        $(window)
            .off('mousemove.' + namespace)
            .on('mousemove.' + namespace, function (e) {
                if (true === jHandle.data('isDragging')) {
                    var value;
                    if (true === isHorizontal) {
                        value = e.pageX;
                    }
                    else {
                        value = e.pageY;
                    }

                    if (value < min) {
                        value = min;
                    }
                    if (value > max) {
                        value = max;
                    }
                    value -= min;
                    var percent = value / (max - min) * 100;
                    if (false === isHorizontal) {
                        percent = Math.abs(percent - 100);
                        value = Math.abs(value - max);
                    }
                    fn(value, percent);
                }
            });
    };
})();