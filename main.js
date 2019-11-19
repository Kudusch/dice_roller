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

    function max_roll(d) {
        if (d == "d2") {
            d = 2;
        } else if (d == "d4") {
            d = 4;
        } else if (d == "d6") {
            d = 6;
        } else if (d == "d8") {
            d = 8;
        } else if (d == "d10") {
            d = 10;
        } else if (d == "d12") {
            d = 12;
        } else if (d == "d20") {
            d = 20;
        } else if (d == "d100") {
            d = 100;
        }
        return(d);
    };

    function prepare_dice() {
        $("#dice_output").text("");
        var lines = "";
        var dice = {};
        $("tbody tr").each(function() {
            count = $(this).find(".count").text();
            if (count > 0) {
                die = $(this).attr("id");
                modifier_value = $(this).find(".modifier-value").find("input").val();
                modifier_value = (modifier_value<=0?"":"+") + modifier_value;
                modifier_value = (modifier_value=="0"?"":modifier_value);
                lines = lines + "<p>" + count + die + modifier_value + "</p>";
                dice[die] = {"count":count, modifier:modifier_value}
            }
            $("#dice_output").html(lines);
            if (lines == "") {
                $("#roll_btn").addClass("half");
            } else {
                $("#roll_btn").removeClass("half");
            }
        });
        return(dice);
    };

    const sum = arr => arr.reduce((a,b) => a + b, 0)
    
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
        if ($(this).find("input").val() == 0) {
            $(this).addClass("half");
        } else {
            $(this).removeClass("half");
        }
        prepare_dice();
    });

    $("#roll_btn").click(function() {
        dice = prepare_dice();
        $("#roll_output").html("");
        var lines = "";
        var roll_total = 0;
        for (var i in dice) {
            roll = dice_roll(i, dice[i]["count"]);
            roll_sum = parseInt(sum(roll));
            roll_total += roll_sum + parseInt((dice[i]["modifier"]==""?0:dice[i]["modifier"]));
            roll = roll.map(function style_roll(n) {if (n == max_roll(i)) {return("<span class='max'>" + n + "</span>");} else if (n == 1) {return("<span class='min'>" + n + "</span>");} else {return(n);}})
            lines += "<p>" + i + ": " + roll.join(", ") + " = " + roll_sum + dice[i]["modifier"] + "</p>"
        }
        $("#roll_output").html(lines + "<p>" + roll_total + "</p>");
    });
});