package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("item")
public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllItems(){

        return new ResponseUtil(200,"Ok",itemService.getAllItems());
    }

    @ResponseStatus(HttpStatus.CREATED) //201
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveItem(@ModelAttribute ItemDTO dto){
        itemService.saveItem(dto);
        return new ResponseUtil(200,"Saved",null);
    }
    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateItem(@RequestBody ItemDTO dto){
        itemService.updateItem(dto);
        return new ResponseUtil(200,"Updated",null);
    }
    @DeleteMapping(path = "/{code}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteItem(@PathVariable String code){
        itemService.deleteItem(code);
        return new ResponseUtil(200,"Deleted",null);
    }
    @GetMapping(params = {"code"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchItem(@RequestParam String code){

        return new ResponseUtil(200,"Ok",itemService.searchItem(code));
    }

    @GetMapping(params = {"itemCode"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getLastId(){

        ItemDTO itemByCode = itemService.findLastItemByCode();
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

        return new  ResponseUtil(200,"0k",id);
    }


}
