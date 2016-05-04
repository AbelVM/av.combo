/*


Si non confectus, non reficiat


*/
'use strict';
(function () {

    window.av = window.av || {};

    /**
     * Turn a plain <select> into a featured one
     * @param   {Object} params
     *      {
     *      selector: css selector of the original <select>
     *      ns: if any, the parent namespace of jQuery
     *      transformer: if any, function that generates the featured contents from {text, value}
     *      callback: if any, the function executed when the selected option changes, using the selected value as parameter
     *      id: if any, the id of the avcombo
     *      }
     * @author Abel Vázquez
     */
    av.combo = function (params) {

        params.ns = params.ns || window;
        params.transformer = params.transformer || function (text, value) {
            return text;
        };
        if (params.customstyle !== true) {
            params.ns.$('head').append('<link rel="stylesheet" href="./av.combo.css" type="text/css" />');
        };
        params.callback = params.callback || function (value) {
            console.log('av.combo, selected value: ' + value);
        };
        params.id = params.id || 'avcombo';
        var $ = params.ns.$,
            source = $(params.selector),
            selected = source.find("option[selected]"),
            options = $("option", source);

        $("body").append('<dl id="'+params.id+'" class="av-combo"></dl>');
        $("#"+params.id).append('<dt><a href="#">' + params.transformer(selected.text(), selected.val()) + '<span class="value">' + selected.val() + '</span></a></dt><dd><ul></ul></dd>')
        options.each(function () {
            $("#"+params.id+" dd ul").append('<li><a href="#">' + params.transformer($(this).text(), $(this).val()) + '<span class="value">' + $(this).val() + '</span></a></li>');
        });
        source.replaceWith($("#"+params.id));
        $(".av-combo dt a").click(function () {
            $(".av-combo dd ul").toggle();
        });
        $(document).bind('click', function (e) {
            var $clicked = $(e.target);
            if (!$clicked.parents().hasClass("av-combo"))
                $(".av-combo dd ul").hide();
        });
        $(".av-combo dd ul li a").click(function () {
            var text = $(this).html();
            $(".av-combo dt a").html(text);
            $(".av-combo dd ul").hide();
            $("#"+params.id).val($(this).find("span.value").html());
            params.callback instanceof Function && params.callback($(this).find("span.value").get(0).innerHTML);
        });
    }

})();
