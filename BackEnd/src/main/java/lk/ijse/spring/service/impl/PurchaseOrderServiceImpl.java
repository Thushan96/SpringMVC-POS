package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.OrdersDTO;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.entity.OrderDetails;
import lk.ijse.spring.entity.OrderItem_PK;
import lk.ijse.spring.entity.Orders;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrderDetailsRepo;
import lk.ijse.spring.repo.OrderRepo;
import lk.ijse.spring.service.PurchaseOrderService;
import lk.ijse.spring.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderDetailsRepo orderDetailsRepo;

    @Autowired
    private ItemRepo  itemRepo;

    @Override
    public void purchaseOrder(OrdersDTO dto) {

        Orders order = mapper.map(dto, Orders.class);
        System.out.println(order.toString());

        if(!orderRepo.existsById(order.getOid())){
            orderRepo.save(order);

            if (!order.getOrderDetails().isEmpty()){
                for (OrderDetails orderDetail : order.getOrderDetails()) {
                    Item item = itemRepo.findById(orderDetail.getItemCode()).get();
                    item.setQty(item.getQty()-orderDetail.getQty());
                    itemRepo.save(item);
                }
            }else {
                throw new RuntimeException("No items added for the order..!");
            }

        }else{
            throw new RuntimeException("Purchase Order Failed..!, Order ID " + dto.getOid() + " Already Exist.!");

        }
    }

    @Override
    public void deleteOrder(String oid) {
        if (orderRepo.existsById(oid)){
            orderRepo.deleteById(oid);
        }else{
            throw new RuntimeException("Delete Order Failed..!, Order ID " + oid + " Not Exist..!");
        }

    }

    @Override
    public void updateOrder(OrdersDTO dto) {
        if (orderRepo.existsById(dto.getOid())){
            Orders order = mapper.map(dto, Orders.class);

            if (dto.getOrderDetails().isEmpty()){
               throw new RuntimeException("No items added for the order..!");
            }

            for (OrderDetails orderDetail : order.getOrderDetails()) {
                Item item = itemRepo.findById(orderDetail.getItemCode()).get();

                OrderDetails initialValues = orderDetailsRepo.findById(new OrderItem_PK(orderDetail.getOid(), orderDetail.getItemCode())).get();

                int newQty=orderDetail.getQty();
                int initialQty=initialValues.getQty();
                if (newQty>initialQty){
                    int dif=newQty-initialQty;
                    item.setQty(item.getQty()-dif);
                }else if (newQty < initialQty) {
                    int dif = initialQty - newQty;
                    item.setQty(item.getQty() + dif);
                }
                itemRepo.save(item);
            }
            orderRepo.deleteById(dto.getOid());
            orderRepo.save(order);
        }else{
            throw new RuntimeException("Update Order Failed..!, Order ID " + dto.getOid() + " Not Exist.!");
        }

    }

    @Override
    public OrdersDTO searchOrder(String oid) {
        if (orderRepo.existsById(oid)){
            return  mapper.map(orderRepo.findById(oid).get(),OrdersDTO.class);
        }else {
            throw new RuntimeException("Search Order Failed..!, Order ID " + oid + " Not Exist.!");
        }
    }

    @Override
    public List<OrdersDTO> getAllOrders() {
        return mapper.map(orderRepo.findAll(), new TypeToken<List<OrdersDTO>>() {}.getType() );
    }

    @Override
    public OrdersDTO findLastOrder() {
        if (orderRepo.findTopByOrderByOidDesc()==null){
            return null;
        }else {
            return mapper.map(orderRepo.findTopByOrderByOidDesc(), OrdersDTO.class);
        }
    }


}
