package lk.ijse.spring.service.impl;

import lk.ijse.spring.config.WebAppConfig;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.service.ItemService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

@WebAppConfiguration
@ContextConfiguration(classes = {WebAppConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
public class ItemServiceImplTest {

    @Autowired
    ItemService service;

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


    @Test
    public void getAllItems(){
        addItems();

        List<ItemDTO> allItems = service.getAllItems();
        for (ItemDTO allItem : allItems) {
            System.out.println(allItems.toString());
        }

        assertNotNull(allItems);
    }

    @Test
    public void updateItem(){
        addItems();
        ItemDTO c3 = new ItemDTO("I-0003", "Pen", 30, 8);


        service.updateItem(c3);
        assertThrows(RuntimeException.class,()-> service.updateItem( new ItemDTO("I-0009", "Pen", 30, 8))
        );
    }

    @Test
    public void deleteItem(){
        addItems();
        service.deleteItem("I-0002");

        assertThrows(RuntimeException.class,()->service.deleteItem("I-0009"));
    }

    @Test
    public void getLastItem(){
        addItems();

        ItemDTO itemByDto = service.findLastItemByCode();
        System.out.println(itemByDto);

        ItemDTO itemByCode = service.findLastItemByCode();
        String id=null;
        if (itemByCode!= null) {
            int tempId = Integer.parseInt(itemByCode.getCode().split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "I-000" + tempId;
            } else if (tempId <= 99) {
                id = "I-00" + tempId;
            } else if (tempId <= 999) {
                id = "I-0" + tempId;
            } else if (tempId <= 9999) {
                id = "I-" + tempId;
            }
        } else {
            id = "I-0001";
        }

        System.out.println(id);

    }



}
