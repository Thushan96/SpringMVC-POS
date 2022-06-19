package lk.ijse.spring.service;

import lk.ijse.spring.dto.ItemDTO;

import java.util.List;

public interface ItemService {
    void saveItem(ItemDTO dto);
    void updateItem(ItemDTO dto);
    void deleteItem(String id);
    ItemDTO searchItem(String id);
    List<ItemDTO> getAllItems();
    ItemDTO findLastItemByCode();
}
