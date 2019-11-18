$(document).ready(function() {
    var d2 = [];
    for (var i = 1; i != 3; ++i) d2.push(i)
    var d4 = [];
    for (var i = 1; i != 5; ++i) d4.push(i)
    var d6 = [];
    for (var i = 1; i != 7; ++i) d6.push(i)
    var d8 = [];
    for (var i = 1; i != 9; ++i) d8.push(i)
    var d10 = [];
    for (var i = 1; i != 11; ++i) d10.push(i)
    var d12 = [];
    for (var i = 1; i != 13; ++i) d12.push(i)
    var d20 = [];
    for (var i = 1; i != 21; ++i) d20.push(i)
    var d100 = [];
    for (var i = 1; i != 101; ++i) d100.push(i)

    function dice_roll(d, n) {
        out = [];
        if (d == "d2") {
            d = d2;
        } else if (d == "d4") {
            d = d4;
        } else if (d == "d6") {
            d = d6;
        } else if (d == "d8") {
            d = d8;
        } else if (d == "d10") {
            d = d10;
        } else if (d == "d12") {
            d = d12;
        } else if (d == "d20") {
            d = d20;
        } else if (d == "d100") {
            d = d100;
        }
        for (var i = 1; i <= n; i++) {
            var roll = d[d.length * Math.random() | 0];
            out.push(roll);
        }
        return(out);
    };

    function prepare_dice() {
        $("#dice_output").text("");
        $("tbody tr").each(function() {
            count = $(this).find(".count").text();
            if (count > 0) {
                dice = $(this).attr("id");
                modifier_sign = $(this).find(".modifier-sign").find(".selected").text();
                modifier_value = $(this).find(".modifier-value").find("input").val();
                $("#dice_output").text($("#dice_output").text() + "\n" + count + dice + " " + modifier_sign + modifier_value);
                $("#roll_btn").removeClass("hidden");
            }
        });
    };
    
    $(".plus").click(function() {
        var c = Number($(this).closest("tr").find(".count").text());
        $(this).closest("tr").find(".count").text(String(c + 1));
        prepare_dice();
    });
    $(".minus").click(function() {
        var c = Number($(this).closest("tr").find(".count").text())
        if (c > 0) {
            $(this).closest("tr").find(".count").text(String(c - 1));
        }
        prepare_dice();
    });

    $(".modifier-value").click(function() {
        if (!$(this).closest("tr").find(".modifier-plus").hasClass("selected")) {
            if (!$(this).closest("tr").find(".modifier-minus").hasClass("selected")) {
                $(this).closest("tr").find(".modifier-plus").click();
            }
        }
        prepare_dice();
    });
    $(".modifier-plus").click(function() {
        if ($(this).hasClass("selected")) {
            $(this).css("background-color", "rgba(0, 255, 0, 0.3)");
            $(this).removeClass("selected");
        } else {
            $(this).css("background-color", "rgba(0, 255, 0, 1)");
            $(this).addClass("selected");
        }

        $(this).parent().find(".modifier-minus").css("background-color", "rgba(255, 0, 0, 0.3)")
        $(this).parent().find(".modifier-minus").removeClass("selected");
        prepare_dice();
    });
    $(".modifier-minus").click(function() {
        if ($(this).hasClass("selected")) {
            $(this).css("background-color", "rgba(255, 0, 0, 0.3)");
            $(this).removeClass("selected");
        } else {
            $(this).css("background-color", "rgba(255, 0, 0, 1)");
            $(this).addClass("selected");
        }
        $(this).parent().find(".modifier-plus").css("background-color", "rgba(0, 255, 0, 0.3)")
        $(this).parent().find(".modifier-plus").removeClass("selected");
        prepare_dice();
    });
});