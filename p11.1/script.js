$(document).ready(function() {
    $('#viewOrdersBtn').on('click', function() {
        
        // 5. Do not allow duplicate rows if the View Orders button is clicked multiple times.
        $('#ordersTable tbody').empty();
        $('#message').text(''); // Clear previous error messages

        // 2. Use $.getJSON() to retrieve data from orders.json
        $.getJSON('orders.json')
            .done(function(data) {
                let totalOrders = 0;
                let totalSales = 0.0;

                // 4. Use $.each() to process all the JSON records
                $.each(data, function(index, order) {
                    const row = `
                        <tr>
                            <td>${order.orderId}</td>
                            <td>${order.customerName}</td>
                            <td>${order.foodItem}</td>
                            <td>${order.quantity}</td>
                            <td>$${parseFloat(order.totalAmount).toFixed(2)}</td>
                            <td>${order.orderStatus}</td>
                        </tr>
                    `;
                    $('#ordersTable tbody').append(row);
                    
                    totalOrders++;
                    totalSales += parseFloat(order.totalAmount);
                });

                // Update summary values
                $('#totalOrders').text(totalOrders);
                $('#totalSales').text(totalSales.toFixed(2));
            })
            .fail(function() {
                // 8. Display an appropriate message if orders.json cannot be loaded
                $('#message').text('Error: Unable to load orders.json. Please check if the file exists and is accessible.');
            });
    });
});
