const axios = require('axios');



exports.getExchangeRate = async (req, res) => {
    try {
        const { from, to, amount } = req.query;

        if (!from || !to) {
            return res.status(400).json({ message: 'Both "from" and "to" currencies are required.' });
        }

        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: {
                ids: from,
                vs_currencies: to,
            },
        });
        console.log('API Response:', response.data);

        if (!response.data || !response.data[from] || !response.data[from][to]) {
            return res.status(404).json({ message: 'Exchange rate not found for the specified currencies.' });
        }

        const rate = response.data[from][to];

        if (!amount) {
            return res.status(400).json({ message: 'The "amount" parameter is required for conversion.' });
        }

        const convertedAmount = rate * parseFloat(amount);

        return res.status(200).json({
            status: 200,
            fromCurrency: from,
            toCurrency: to,
            rate,
            amount: parseFloat(amount),
            convertedAmount,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching exchange rates.' });
    }
};




