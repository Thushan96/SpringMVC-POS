package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrdersDTO {
    private String oid;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private CustomerDTO customer;
    List<OrderDetailsDTO> orderDetails;

}
