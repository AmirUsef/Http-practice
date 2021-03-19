$(document).ready(function() {
    $("#login").click(function() {
        let userName = $("#input1").val();
        let password = $("#input2").val();
        if (userName == "") {
            $("#error1").html("الزامی")
            $("#input1").css("border", "solid red")
        } else {
            $("#input1").css("border", "solid")
            $("#error1").html("")
        }
        if (password == "") {
            $("#error2").html("الزامی")
            $("#input2").css("border", "solid red")
        } else {
            $("#input2").css("border", "solid")
            $("#error2").html("")
        }
        if (userName != "" && password != "") {
            let user = { userName: userName, password: password }
            $.ajax({
                type: "POST",
                url: "http://localhost:5005/",
                data: JSON.stringify(user),
                async: false,
                success: function(result) {
                    if (result == "wrong username")
                        alert("نام کاریری اشتباه ");
                    else if (result == "wrong pass")
                        alert("پسوورد اشتباه");
                    else if (result == "successful")
                        alert("ورود موفقیت آمیز");
                }
            });
        }
    })
})