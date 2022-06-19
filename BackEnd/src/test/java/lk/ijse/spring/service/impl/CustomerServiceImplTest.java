package lk.ijse.spring.service.impl;

import lk.ijse.spring.config.WebAppConfig;
import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@WebAppConfiguration
@ContextConfiguration(classes = {WebAppConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
public class CustomerServiceImplTest {

    @Autowired
    CustomerService customerService;

    @Test
    void getAllCustomers() {
        //add multiple customers
        addCustomers();

        List<CustomerDTO> allCustomers = customerService.getAllCustomers();
        for (CustomerDTO allCustomer : allCustomers) {
            System.out.println(allCustomer.toString());
        }

        //Test customer availability
        assertNotNull(allCustomers);

    }
    @Test
    public void getLastCustomer(){
        addCustomers();

        CustomerDTO lastCustomerById = customerService.findLastCustomerById();
        System.out.println(lastCustomerById);

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
