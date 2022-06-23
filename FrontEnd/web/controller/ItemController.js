var itemUrl="http://localhost:8080/Spring_Pos/item";


loadAllItems();
loadNewItemCode();

//Methods
function loadAllItems() {
    $("#item-Tbody").empty();
    $.ajax({
        url: itemUrl,
        method: "GET",
        success: function (resp) {
            for (const item of resp.data) {
                let row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.unitPrice}</td><td>${item.qty}</td></tr>`;
                $("#item-Tbody").append(row);
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });

}

//load new Item code
function loadNewItemCode(){
    $.ajax({
        url: itemUrl+"?itemCode",
        method: "GET",
        // dataType:"json", // please convert the response into JSON
        success: function (resp) {
            $("#Item-id").val(resp.data);
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}



function saveItem() {
    var itemData = $("#itemForm").serialize();
    console.log(itemData);
    $.ajax({
        url: itemUrl,
        method: "POST",
        data:itemData,
        success:function (res){
            if (res.code==200){
                alert("Item Successfully Updated");
                loadAllItems();
                loadItemId();
                loadNewItemCode();
            }else {
                alert(res.data);
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);

        }
    });
    $("#ItemstaticBackdrop").modal('hide');
    $("#save-Item").attr('disabled', true);
}

function searchItemFromID(iCode){
    for (let i = 0; i < itemDB.length; i++) {
        if(itemDB[i].getItemCode()==iCode){
            return itemDB[i];
        }
    }
}


function clearAllItems() {
    $('#Item-id,#Item-name,#Item-price,#Item-quantity').val("");
    $('#Item-id,#Item-name,#Item-price,#Item-quantity').css('border', '2px solid #ced4da');
    $('#Item-id').focus();
    $("#save-Item").attr('disabled', true);
    loadAllCustomers();
    $("#lblItemCode,#lblItemName,#lblItemPrice,#lblItemQty").text("");
}





$("#save-Item").click(function () {
    saveItem();
    clearAllItems();
    loadAllItems();
    loadItemId();
    loadNewItemCode();
});



$("#clear-Item").click(function (){
    clearAllItems();
    $("#save-Item").attr('disabled', true);
    // $("#update-customer").attr('disabled', true);
});

$('#itemSearch_button').click(function (){
    var itemCode=$("#txtItem").val();
    $.ajax({
        url: itemUrl+"?code="+itemCode,
        method: "GET",
        success: function (resp) {
            var item=resp.data;
            if (resp.code==200){
                $("#staticBackdrop2").modal('show');
                $("#Item-Code1").val(item.code);
                $("#item-name1").val(item.name);
                $("#item-price1").val(item.unitPrice);
                $("#Item-Quantity1").val(item.qty);
                $('#txtItem').val("");
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }

    });
    $("#itemSearch_button").attr('disabled', true);

});

function clearAfterItemUpdate() {
    $('#Item-Code1,#item-name1,#item-price1,#Item-Quantity1').val("");
    $('#Item-Code1,#item-name1,#item-price1,#Item-Quantity1').css('border', '2px solid #ced4da');
    loadAllItems();
    $("#lblItemCode1,#lblItemName1,#lblItemPrice1,#lblItemQty1").text("");
}


$("#update-item1").click(function (){
    updateItem();
    clearAfterItemUpdate();
    loadItemId();
});

$("#item_closebtn").click(function (){
    clearAfterItemUpdate();
});

function updateItem(){
    var itemOb={
        code:$("#Item-Code1").val(),
        name:$("#item-name1").val(),
        unitPrice:parseFloat($("#item-price1").val()),
        qty:parseInt($("#Item-Quantity1").val()),
    }

    $.ajax({
        url: itemUrl,
        method: "PUT",
        contentType:"application/json",
        data: JSON.stringify(itemOb),
        success: function (res) {
            if (res.code == 200) {
                alert("Item Successfully Updated");
                // loadAllItems();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });

    $("#staticBackdrop2").modal('hide');
}

$("#delete-item1").click(function (){
    deleteItem();
    loadAllItems();
    loadItemId();
    loadNewItemCode();
});

function deleteItem(){
    var itemCode=$("#Item-Code1").val();
    $.ajax({
        url: itemUrl+"/"+itemCode,
        method: "DELETE",
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                alert("Item Successfully Deleted");
                loadAllItems();
                loadItemId();
                loadNewItemCode();
            }

        },
        error: function (ob) {
            alert(ob.responseJSON.message);

        }
    });

    $("#staticBackdrop2").modal('hide');
}

$('#clear-item2').click(function (){
    $('#txtItem').val("");
    $('#txtItem').css('border', '2px solid #ced4da');
    $("#lblICode").text("");
    $("#itemSearch_button").attr('disabled', true);
});

// VALIDATIONS

const itemCodeRegEx =  /^(I-)[0-9]{1,4}$/;
const itemNameRegEx = /^[A-z ]{3,20}$/;
const itemPriceRegEx = /^[0-9](.){1,6}$/;
const itemQtyRegEx = /^[0-9]{1,3}$/;

function itemformValid() {
    var itemID = $("#Item-id").val();
    $("#Item-id").css('border', '2px solid green');
    $("#lblItemCode").text("");
    if (itemCodeRegEx.test(itemID)) {
        var itemName = $("#Item-name").val();
        if (itemNameRegEx.test(itemName)) {
            $("#Item-name").css('border', '2px solid green');
            $("#lblItemName").text("");
            var itemPrice = $("#Item-price").val();
            if (itemPriceRegEx.test(itemPrice)) {
                var ItemQuantity = $("#Item-quantity").val();
                var resp = itemQtyRegEx.test(ItemQuantity);
                $("#Item-price").css('border', '2px solid green');
                $("#lblItemPrice").text("");
                if (resp) {
                    $("#Item-quantity").css('border', '2px solid green');
                    $("#lblItemQty").text("");
                    return true;
                } else {
                    $("#Item-quantity").css('border', '2px solid red');
                    $("#lblItemQty").text("Item Quantity is a required field : Minimum 7");
                    return false;
                }
            } else {
                $("#Item-price").css('border', '2px solid red');
                $("#lblItemPrice").text("Item Price is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#Item-name").css('border', '2px solid red');
            $("#lblItemName").text("Item Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#Item-id").css('border', '2px solid red');
        $("#lblItemCode").text("Item Code is a required field : Pattern I-0001");
        return false;
    }
}

function itemcheckIfValid() {
    var itemID = $("#Item-id").val();
    if (itemCodeRegEx.test(itemID)) {
        $("#Item-name").focus();
        var itemName = $("#Item-name").val();
        if (itemNameRegEx.test(itemName)) {
            $("#Item-price").focus();
            var itemPrice = $("#Item-price").val();
            if (itemPriceRegEx.test(itemPrice)) {
                $("#Item-quantity").focus();
                var itemQty = $("#Item-quantity").val();
                var resp = itemQtyRegEx.test(itemQty);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAllItems();
                        loadNewItemCode();
                    }
                } else {
                    $("#Item-quantity").focus();
                }
            } else {
                $("#Item-price").focus();
            }
        } else {
            $("#Item-name").focus();
        }
    } else {
        $("#Item-id").focus();
    }
}

$('#Item-id,#Item-name,#Item-price,#Item-quantity,#txtItem,#Item-Code1,#item-name1,#item-price1,#Item-Quantity1').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#Item-id,#Item-name,#Item-price,#Item-quantity').on('blur', function () {
    itemformValid();
});

function setItemButton() {
    let b = itemformValid();
    if (b) {
        $("#save-Item").attr('disabled', false);
    } else {
        $("#save-Item").attr('disabled', true);
    }
}

$("#Item-id").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        itemcheckIfValid();
    }
    if (eventOb.key == "Control") {
        var typedItemID = $("#Item-id").val();
        var srcItem = searchItemFromID(typedItemID);
        $("#Item-id").val(srcItem.getItemCode());
        $("#Item-name").val(srcItem.getItemName());
        $("#Item-price").val(srcItem.getItemprice());
        $("#Item-quantity").val(srcItem.getItemQuantity());
        $("#update-Item").attr('disabled', false);
        $("#save-Item").attr('disabled', true);
        $('#Item-id').attr('readonly', true);
    }
});

$("#Item-name").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        itemcheckIfValid();
    }
});

$("#Item-price").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        itemcheckIfValid();
    }
});

$("#Item-quantity").on('keyup', function (eventOb) {
    setItemButton();
    if (eventOb.key == "Enter") {
        itemcheckIfValid();
    }
});

$("#txtItem").on('keyup',function (eventOb){
    itemSearchButton();
});

function itemCheckformValid() {
    var itemCode = $("#txtItem").val();
    if (itemCodeRegEx.test(itemCode)) {
        $("#txtItem").css('border', '2px solid blue');
        $("#lblICode").text("");
        return true;
    } else {
        $("#txtItem").css('border', '2px solid red');
        $("#lblICode").text("Item Code is a required field : Pattern I-0001");
        return false;
    }
}


function itemSearchButton() {
    let b = itemCheckformValid();
    if (b) {
        $("#itemSearch_button").attr('disabled', false);
    } else {
        $("#itemSearch_button").attr('disabled', true);
    }
}
// ------
function checkFormValidate() {
    var itemID = $("#Item-Code1").val();
    $("#Item-Code1").css('border', '2px solid green');
    $("#lblItemCode1").text("");
    if (itemCodeRegEx.test(itemID)) {
        var itemName = $("#item-name1").val();
        if (itemNameRegEx.test(itemName)) {
            $("#item-name1").css('border', '2px solid green');
            $("#lblItemName1").text("");
            var itemPrice = $("#item-price1").val();
            if (itemPriceRegEx.test(itemPrice)) {
                var ItemQuantity = $("#Item-Quantity1").val();
                var resp = itemQtyRegEx.test(ItemQuantity);
                $("#item-price1").css('border', '2px solid green');
                $("#lblItemPrice1").text("");
                if (resp) {
                    $("#Item-Quantity1").css('border', '2px solid green');
                    $("#lblItemQty1").text("");
                    return true;
                } else {
                    $("#Item-Quantity1").css('border', '2px solid red');
                    $("#lblItemQty1").text("Item Quantity is a required field : Minimum 7");
                    return false;
                }
            } else {
                $("#item-price1").css('border', '2px solid red');
                $("#lblItemPrice1").text("Item Price is a required field : Pattern 100.00 or 100");
                return false;
            }
        } else {
            $("#item-name1").css('border', '2px solid red');
            $("#lblItemName1").text("Item Name is a required field : Minimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#Item-id").css('border', '2px solid red');
        $("#lblItemCode1").text("Item Code is a required field : Pattern I-0001");
        return false;
    }
}

function itemIfValid() {
    var ItemCode = $("#Item-Code1").val();
    if (itemCodeRegEx.test(ItemCode)) {
        $("#item-name1").focus();
        var itemName = $("#item-name1").val();
        if (itemNameRegEx.test(itemName)) {
            $("#item-price1").focus();
            var itemPrice = $("#item-price1").val();
            if (itemPriceRegEx.test(itemPrice)) {
                $("#Item-Quantity1").focus();
                var itemQty = $("#Item-Quantity1").val();
                var resp = itemQtyRegEx.test(itemQty);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAllItems();
                    }
                } else {
                    $("#Item-Quantity1").focus();
                }
            } else {
                $("#item-price1").focus();
            }
        } else {
            $("#item-name1").focus();
        }
    } else {
        $("#Item-Code1").focus();
    }
}

$('#Item-Code1,#item-name1,#item-price1,#Item-Quantity1').on('blur', function () {
    checkFormValidate();
});

function setItemUpdateButton() {
    let b = checkFormValidate();
    if (b) {
        $("#update-item1").attr('disabled', false);
    } else {
        $("#update-item1").attr('disabled', true);
    }
}

$("#Item-Code1").on('keyup', function (eventOb) {
    setItemUpdateButton();
    if (eventOb.key == "Enter") {
        itemIfValid();
    }

});

$("#item-name1").on('keyup', function (eventOb) {
    setItemUpdateButton();
    if (eventOb.key == "Enter") {
        itemIfValid();
    }
});

$("#item-price1").on('keyup', function (eventOb) {
    setItemUpdateButton();
    if (eventOb.key == "Enter") {
        itemIfValid();
    }
});

$("#Item-Quantity1").on('keyup', function (eventOb) {
    setItemUpdateButton();
    if (eventOb.key == "Enter") {
        itemIfValid();
    }
});



