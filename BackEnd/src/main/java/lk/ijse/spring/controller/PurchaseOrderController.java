package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.service.PurchaseOrderService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("purchase_Order")
@CrossOrigin
public class PurchaseOrderController {

    @Autowired
    PurchaseOrderService  purchaseOrderS;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllOrders() {
        return new ResponseUtil(200, "Ok", purchaseOrderS.getAllOrders());
    }

    @ResponseStatus(HttpStatus.CREATED) //201
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil purchaseOrder(@RequestBody OrdersDTO ordersDTO) {
        System.out.println(ordersDTO.toString());
        purchaseOrderS.purchaseOrder(ordersDTO);
        return new ResponseUtil(200, "Purchase order Successful", null);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateOrder(@RequestBody OrdersDTO ordersDTO) {
        purchaseOrderS.updateOrder(ordersDTO);
        return new ResponseUtil(200, "Updated", null);
    }

    @DeleteMapping(params = {"oid"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteOrder(@RequestParam String oid) {
        purchaseOrderS.deleteOrder(oid);
        return new ResponseUtil(200, "Deleted", null);
    }

    @GetMapping(path = "/{oid}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchOrder(@PathVariable String oid) {
        return new ResponseUtil(200, "Ok", purchaseOrderS.searchOrder(oid));
    }

    @GetMapping(params = {"OrderId"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getLastId(){

        OrdersDTO lastOrder = purchaseOrderS.findLastOrder();
        String id=null;
        if (lastOrder!= null) {
            int tempId = Integer.parseInt(lastOrder.getOid().split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "O-000" + tempId;
            } else if (tempId <= 99) {
                id = "O-00" + tempId;
            } else if (tempId <= 999) {
                id = "O-0" + tempId;
            } else if (tempId <= 9999) {
                id = "O-" + tempId;
            }
        } else {
            id = "O-0001";
        }

        return new  ResponseUtil(200,"0k",id);
    }


}
