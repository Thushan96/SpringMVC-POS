package lk.ijse.spring.service.impl;

import lk.ijse.spring.config.WebAppConfig;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.service.PurchaseOrderService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.List;

@WebAppConfiguration
@ContextConfiguration(classes = {WebAppConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
public class PurchaseOrderServiceImplTest {
    @Autowired
    PurchaseOrderService orderService;

    @Autowired
    CustomerService customerService;

    @Autowired
    ItemService  service;

    @Test
    public void generateId(){
        OrdersDTO lastOrder = orderService.findLastOrder();
        System.out.println(lastOrder);
    }

    @Test
    public void placeOrder(){

        Date date=new Date(2022-06-21);
        List<OrderDetailsDTO> detailsDTOS=new ArrayList<>();
        detailsDTOS.add(new OrderDetailsDTO("O-0001","I-0001",2,200));
        OrdersDTO ordersDTO = new OrdersDTO("O-0001",date, new CustomerDTO("C-0001", "Dasun", "Galle", "100"),detailsDTOS);


        orderService.purchaseOrder(ordersDTO);

    }

    public void addItems() {
        ItemDTO c1 = new ItemDTO("I-0001", "Soap", 200, 2);
        ItemDTO c2 = new ItemDTO("I-0002", "Book", 150, 1);
        ItemDTO c3 = new ItemDTO("I-0003", "Pen", 30, 4);
        ItemDTO c4 = new ItemDTO("I-0004", "Pencil", 50, 5);
        service.saveItem(c1);
        service.saveItem(c2);
        service.saveItem(c3);
        service.saveItem(c4);

    }


    public void addCustomers() {
        CustomerDTO c1 = new CustomerDTO("C-0001", "Dasun", "Galle", "100");
        CustomerDTO c2 = new CustomerDTO("C-0002", "Kamal", "Panadura", "200");
        CustomerDTO c3 = new CustomerDTO("C-0003", "Ramal", "Kaluthara", "300");
        CustomerDTO c4 = new CustomerDTO("C-0004", "Oshan", "Colombo", "400");
        customerService.saveCustomer(c1);
        customerService.saveCustomer(c2);
        customerService.saveCustomer(c3);
        customerService.saveCustomer(c4);

    }
}
