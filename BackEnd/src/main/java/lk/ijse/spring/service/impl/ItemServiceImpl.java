package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveItem(ItemDTO dto) {
    if (!repo.existsById(dto.getCode())){
        repo.save(mapper.map(dto, Item.class));
    }else {
        throw new RuntimeException("Item already in stock! Try Again");
    }
    }

    @Override
    public void updateItem(ItemDTO dto) {
        if (repo.existsById(dto.getCode())){
            repo.save(mapper.map(dto,Item.class));
        }else{
            throw new RuntimeException("Item not available! Please check Id");
        }

    }

    @Override
    public void deleteItem(String id) {
        if (repo.existsById(id)){
            repo.deleteById(id);
        }else{
            throw new RuntimeException("Item not available! Please check Id");
        }
    }

    @Override
    public ItemDTO searchItem(String id) {
        if (repo.existsById(id)){
            return mapper.map(repo.findById(id).get(),ItemDTO.class);
        }else{
            throw new RuntimeException("Item not available! Please check Id");
        }
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return mapper.map(repo.findAll(),new TypeToken<List<ItemDTO>>(){}.getType());
    }

    @Override
    public ItemDTO findLastItemByCode() {
        if (repo.findTopByOrderByCodeDesc()==null){
            return null;
        }else{
            return mapper.map(repo.findTopByOrderByCodeDesc(),ItemDTO.class);
        }
    }


}
