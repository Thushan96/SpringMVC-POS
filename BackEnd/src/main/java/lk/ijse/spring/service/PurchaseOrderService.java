package lk.ijse.spring.service;

import lk.ijse.spring.dto.OrdersDTO;

import java.util.List;

public interface PurchaseOrderService {
    void purchaseOrder(OrdersDTO  dto);
    void deleteOrder(String oid);
    void updateOrder(OrdersDTO dto);
    OrdersDTO searchOrder(String oid);
    List<OrdersDTO> getAllOrders();
    OrdersDTO findLastOrder();
}
