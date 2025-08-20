const axios = require('axios');

async function testDeleteCart() {
    try {
        const response = await axios.delete('https://specsauradataplazma.vercel.app/api/cart/68161626256bfaf273192665', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZiNTZhNDA3ODU2ODg0ZjM1MjM3MmEiLCJpYXQiOjE3NDYyNTM2MzQsImV4cCI6MTc0NjQyNjQzNH0.rpVkEI2iXsbE4qT3RXpltItzZF8fTIInqaR4yDF6zL0',
                'Content-Type': 'application/json'
            }
        });
        ////////console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
    }
}

testDeleteCart(); 