// first request to server  to create order

const paymentStart = () => {
    console.log("payment started..");
    //var amount = document.getElementById('payment_field').value;
    let amount = $('#payment_field').val();
    console.log(amount);
    if (amount == '' || amount == null) {
       
        swal("Sorry!", "Amount is required..", "info");
        return;
    }

    //code..

    //we will use ajax to send request to create order

    $.ajax(
        {
            url: '/index/create_order',
            data: JSON.stringify({ amount: amount, info: 'order_request' }),
            contentType: 'application/json',
            type: 'Post',
            dataType: 'json',
            success: function (response) {
                //invoked when success
                console.log(response)
                if (response.status == "created") {
                    //open payment form

                    let options = {
                        key: 'rzp_test_kbqoBTMPXJhUhP',
                        amount: response.amount,
                        currency: 'INR',
                        name: 'Payment Integration Project',
                        description: 'Donation',
                        image: 'https://cdn.pixabay.com/photo/2024/01/10/03/29/ai-generated-8498790_1280.jpg',
                        order_id: response.id,
                        handler: function (response) {
                            console.log(response.razorpay_payment_id);
                            console.log(response.razorpay_order_id);
                            console.log(response.razorpay_signature);
                            console.log("payment successful !!");
                            swal("Congrates!", "Payment successful !!", "success");
                        },
                        prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                            name: "", //your customer's name
                            email: "",
                            contact: "" //Provide the customer's phone number for better conversion rates 
                        },
                        notes: {
                            address: "Paymnet Integration Project"
                        },
                        theme: {
                            color: "#3399cc"
                        }
                    };

                    let rzp = new Razorpay(options);

                    rzp.on('payment.failed', function (response){
                        console.log(response.error.description);
                        console.log(response.error.code);
                        console.log(response.error.source);
                        console.log(response.error.step);
                        console.log(response.error.reason);
                        console.log(response.error.metadata.order_id);
                        console.log(response.error.metadata.payment_id);
                        alert("");
                        swal("Oops!", "Payment Failed", "error");
                });

                    rzp.open();
                }
            },
            error: function (error) {
                //invoked when error
                console.log(error)
                alert("something went wrong !!")
            }

        }
    )
};