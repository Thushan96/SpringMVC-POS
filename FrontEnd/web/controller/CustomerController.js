var baseUrl="http://localhost:8080/Spring_Pos/customer";

loadAllCustomers();
loadNewCustomerId();


//Methods
function loadAllCustomers() {
    $("#customer-Tbody").empty();
    $.ajax({
        url: baseUrl,
        method: "GET",
        // dataType:"json", // please convert the response into JSON
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contactNo}</td></tr>`;
                $("#customer-Tbody").append(row);
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });

}

// get last customer Id
function loadNewCustomerId(){
    $.ajax({
        url: baseUrl+"?custId",
        method: "GET",
        // dataType:"json", // please convert the response into JSON
        success: function (resp) {
            $("#customer-id").val(resp.data);
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}
function saveCustomer() {

    var custData = $("#customerForm").serialize();
    console.log(custData);
    $.ajax({
        url: baseUrl,
        method: "POST",
        data:custData,
        success:function (res){
            if (res.code==200){
                alert("Successfully Customer Registered");
                loadAllCustomers();
                loadCustomerId();
                loadNewCustomerId();

            }

        },
        error: function (ob) {
            alert(ob.responseJSON.message);

        }
    });

    $("#staticBackdrop").modal('hide');
    $("#save-customer").attr('disabled', true);
}

function searchCustomerFromID(cId){
    // $.ajax({
    //     url: "http://localhost:8080/BackEnd_Web_exploded/customer?option=SEARCH&cusId="+cId,
    //     method: "GET",
    //     success: function (resp) {
    //          console.log("in search method"+resp.name);
    //             return resp;
    //     },
    //     error: function (ob, state) {
    //         return null;
    //         console.log(ob, state)
    //     }
    // });
    // for (let i = 0; i < customerDB.length; i++) {
    //     if(customerDB[i].getCustomerId()==cId){
    //         return customerDB[i];
    //     }
    // }
    console.log("search customer called but no method called");
}


function clearAll() {
    $('#customer-id,#customer-name,#customer-address,#customer-mobile').val("");
    $('#customer-id,#customer-name,#customer-address,#customer-mobile').css('border', '2px solid #ced4da');
    $('#customer-id').focus();
    $("#btnCustomer").attr('disabled', true);
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcusCno").text("");
}


$("#save-customer").click(function () {
    saveCustomer();
    clearAll();
    loadNewCustomerId();
});




$("#clear-customer").click(function (){
   clearAll();
    $("#save-customer").attr('disabled', true);
    $("#update-customer").attr('disabled', true);
    $('#customer-id').attr('readonly', false);
    loadNewCustomerId();
});

$('#search-button').click(function (){
    var customerID=$("#txtCustomer").val()
    $.ajax({
        url: baseUrl+"/"+customerID,
        method: "GET",
        success: function (resp) {
            if (resp.code==200){
                $("#staticBackdrop1").modal('show');
                $("#customer-id1").val(resp.data.id);
                $("#customer-name1").val(resp.data.name);
                $("#customer-address1").val(resp.data.address);
                $("#customer-mobile1").val(resp.data.contactNo);
                $('#txtCustomer').val("");
            }
            },
        error: function (ob, state) {
            alert(ob.responseJSON.message);
        }

    });

    $("#search-button").attr('disabled', true);

});

function clearAfterUpdate() {
    $('#customer-id1,#customer-name1,#customer-address1,#customer-mobile1').val("");
    $('#customer-id1,#customer-name1,#customer-address1,#customer-mobile1').css('border', '2px solid #ced4da');
    loadAllCustomers();
    $("#lblcusId1,#lblcusname1,#lblcusaddress1,#lblcusCno1").text("");
}


$("#update-customer1").click(function (){
    updateCustomer();
    clearAfterUpdate();
    loadNewCustomerId();
    // loadCustomerId();
});

$("#closebtn").click(function (){
    clearAfterUpdate();
});

function updateCustomer(){
    var cusOb={
        id:$("#customer-id1").val(),
        name:$("#customer-name1").val(),
        address:$("#customer-address1").val(),
        contactNo:$("#customer-mobile1").val(),
    }

    $.ajax({
        url: baseUrl,
        method: "PUT",
        contentType:"application/json",
        data: JSON.stringify(cusOb),
        success: function (res) {
            if (res.code == 200) {
                alert("Successfully Updated");
                loadAllCustomers();
            }
        },
        error: function (ob, errorStatus) {
            alert(ob.responseJSON.message);
        }
    });
    $("#staticBackdrop1").modal('hide');
}

$("#delete-customer1").click(function (){
    deleteCustomer();
    loadAllCustomers();
    loadCustomerId();
    loadNewCustomerId();
});

function deleteCustomer(){
    var customerId=$("#customer-id1").val();
    $.ajax({
        url: baseUrl+"?id=" +customerId,
        method: "DELETE",
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                alert("Customer Successfully Deleted");
                loadAllCustomers();
                loadCustomerId();
                loadNewCustomerId();
            }

        },
        error: function (ob) {
            alert(ob.responseJSON.message);

        }
    });

    $("#staticBackdrop1").modal('hide');
}

$('#clear-customer2').click(function (){
    $('#txtCustomer').val("");
    $('#txtCustomer').css('border', '2px solid #ced4da');
    $("#lblCustId").text("");
    $("#search-button").attr('disabled', true);
});

// VALIDATIONS

const cusIDRegEx = /^(C-)[0-9]{1,4}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusMobileRegEx = /^[0-9]{10}$/;

function formValid() {
    var cusID = $("#customer-id").val();
    $("#customer-id").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#customer-name").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customer-name").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#customer-address").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusMobile = $("#customer-mobile").val();
                var resp = cusMobileRegEx.test(cusMobile);
                $("#customer-address").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#customer-mobile").css('border', '2px solid green');
                    $("#lblcusCno").text("");
                    return true;
                } else {
                    $("#customer-mobile").css('border', '2px solid red');
                    $("#lblcusCno").text("Customer Mobile No is a required field : 10 digits");
                    return false;
                }
            } else {
                $("#customer-address").css('border', '2px solid red');
                $("#lblcusaddress").text("Customer Address  is a required field : Minimum 7");
                return false;
            }
        } else {
            $("#customer-name").css('border', '2px solid red');
            $("#lblcusname").text("Customer Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#customer-id").css('border', '2px solid red');
        $("#lblcusid").text("Customer ID is a required field : Pattern C-0000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#customer-id").val();
    if (cusIDRegEx.test(cusID)) {
        $("#customer-name").focus();
        var cusName = $("#customer-name").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customer-address").focus();
            var cusAddress = $("#customer-address").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#customer-mobile").focus();
                var cusMobile = $("#customer-mobile").val();
                var resp = cusMobileRegEx.test(cusMobile);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                        loadNewCustomerId();
                    }
                } else {
                    $("#customer-mobile").focus();
                }
            } else {
                $("#customer-address").focus();
            }
        } else {
            $("#customer-name").focus();
        }
    } else {
        $("#customer-id").focus();
    }
}

$('#customer-id,#customer-name,#customer-address,#customer-mobile,#txtCustomer,#customer-id1,#customer-name1,#customer-address1,#customer-mobile1').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#customer-id,#customer-name,#customer-address,#customer-mobile').on('blur', function () {
    formValid();
});

function setButton() {
    let b = formValid();
    if (b) {
        $("#save-customer").attr('disabled', false);
    } else {
        $("#save-customer").attr('disabled', true);
    }
}

$("#customer-id").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
    if (eventOb.key == "Control") {
        var typedCustomerID = $("#customer-id").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#customer-id").val(srcCustomer.getCustomerId());
        $("#customer-name").val(srcCustomer.getCustomerName());
        $("#customer-address").val(srcCustomer.getCustomerAddress());
        $("#customer-mobile").val(srcCustomer.getCustomerContactNo());
        $("#update-customer").attr('disabled', false);
        $("#save-customer").attr('disabled', true);
        $('#customer-id').attr('readonly', true);
    }
});

$("#customer-name").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#customer-address").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#customer-mobile").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCustomer").on('keyup',function (eventOb){
    searchButton();
});

function checkformValid() {
    var cusID = $("#txtCustomer").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtCustomer").css('border', '2px solid blue');
        $("#lblCustId").text("");
        return true;
    } else {
        $("#txtCustomer").css('border', '2px solid red');
        $("#lblCustId").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}


function searchButton() {
    let b = checkformValid();
    if (b) {
        $("#search-button").attr('disabled', false);
    } else {
        $("#search-button").attr('disabled', true);
    }
}
// ------
function checkFormValid() {
    var cusID = $("#customer-id1").val();
    $("#customer-id1").css('border', '2px solid green');
    $("#lblcusId1").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#customer-name1").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customer-name1").css('border', '2px solid green');
            $("#lblcusname1").text("");
            var cusAddress = $("#customer-address1").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusMobile = $("#customer-mobile1").val();
                var resp = cusMobileRegEx.test(cusMobile);
                $("#customer-address1").css('border', '2px solid green');
                $("#lblcusaddress1").text("");
                if (resp) {
                    $("#customer-mobile1").css('border', '2px solid green');
                    $("#lblcusCno1").text("");
                    return true;
                } else {
                    $("#customer-mobile1").css('border', '2px solid red');
                    $("#lblcusCno1").text("Customer Mobile No is a required field : 10 digits");
                    return false;
                }
            } else {
                $("#customer-address1").css('border', '2px solid red');
                $("#lblcusaddress1").text("Customer Address is a required field : Minimum 7");
                return false;
            }
        } else {
            $("#customer-name1").css('border', '2px solid red');
            $("#lblcusname1").text("Customer Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#customer-id1").css('border', '2px solid red');
        $("#lblcusId1").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function IfValid() {
    var cusID = $("#customer-id1").val();
    if (cusIDRegEx.test(cusID)) {
        $("#customer-name1").focus();
        var cusName = $("#customer-name1").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customer-address1").focus();
            var cusAddress = $("#customer-address1").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#customer-mobile1").focus();
                var cusMobile = $("#customer-mobile1").val();
                var resp = cusMobileRegEx.test(cusMobile);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#customer-mobile1").focus();
                }
            } else {
                $("#customer-address1").focus();
            }
        } else {
            $("#customer-name1").focus();
        }
    } else {
        $("#customer-id1").focus();
    }
}

$('#customer-id1,#customer-name1,#customer-address1,#customer-mobile1').on('blur', function () {
    checkFormValid();
});

function setUpdateButton() {
    let b = checkFormValid();
    if (b) {
        $("#update-customer1").attr('disabled', false);
    } else {
        $("#update-customer1").attr('disabled', true);
    }
}

$("#customer-id1").on('keyup', function (eventOb) {
    setUpdateButton();
    if (eventOb.key == "Enter") {
        IfValid();
    }

});

$("#customer-name1").on('keyup', function (eventOb) {
    setUpdateButton();
    if (eventOb.key == "Enter") {
        IfValid();
    }
});

$("#customer-address1").on('keyup', function (eventOb) {
    setUpdateButton();
    if (eventOb.key == "Enter") {
        IfValid();
    }
});

$("#customer-mobile1").on('keyup', function (eventOb) {
    setUpdateButton();
    if (eventOb.key == "Enter") {
        IfValid();
    }
});






