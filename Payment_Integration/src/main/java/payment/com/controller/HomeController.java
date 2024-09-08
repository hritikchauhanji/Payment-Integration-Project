package payment.com.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.razorpay.*;

@Controller
@RequestMapping("/index")
public class HomeController {

	@GetMapping("/")
	public String index() {
		return "/index";
	}
	
	@PostMapping("/create_order")
	@ResponseBody
	public String createOrder(@RequestBody Map<String , Object> data) throws RazorpayException {
//		System.out.println("order");
//		System.out.println(data);
		
		int amt = Integer.parseInt(data.get("amount").toString());
		
		RazorpayClient razorpayClient = new RazorpayClient("rzp_test_kbqoBTMPXJhUhP","ZHMHNF4uvQcoGTsd30LqTgRJ");
		
		JSONObject ob = new JSONObject();
		ob.put("amount", amt*100);
		ob.put("currency", "INR");
		ob.put("receipt", "txn_234567");
		
		//create new order
		
		Order order = razorpayClient.orders.create(ob);
//		System.out.println(order);
		
		//if you want you can save this to your data..
		
		
		
		
		return order.toString();
	}
}
