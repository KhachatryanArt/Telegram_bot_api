const CoinService = require("../service/coinService");
const {Markup} = require("telegraf");

class CoinController {
    static async start(ctx) {
        ctx.reply("Hii, I am the BinanceCoin bot," +
            "I help you in the crypto world" + "\n" +
            "I will help you earn money......" + "\n" +
            "A lot of moneyπ°π°π°π°π°π°π°π°π°π°π°π°π°π°π°π°" + "\n" + "To get the price of " +
            "any token just send me the message" + "\n" + "ππππππππPrice <TOKEN>ππππππππ" + "\n" + "" +
            " For example to get the price of BTC: Price BTCπΈπΈπΈπΈπΈ" + "\n" + "If you want" +
            " to receive a letter when the price of the currency changes, write the amount " +
            "you specified <TOKEN> max min" + "\n" + "For example: BTC xxxxxx yyyyyy πΈπΈπΈπΈπΈπΈπΈπΈπΈπΈ", {

            ...Markup.inlineKeyboard([
                Markup.button.callback('πΈBTC Price', 'BTC'),
                Markup.button.callback('πΈLTC Price', 'LTC'),
                Markup.button.callback('πΈETH Price', 'ETH'),
                Markup.button.callback('πΈXRP Price', 'XRP'),
                Markup.button.callback('πΈBNB Price', 'BNB'),
                Markup.button.callback('πΈSOL Price', 'SOL'),
                Markup.button.callback('πΈMATIC Price', 'MATIC'),
                Markup.button.callback('πΈSHIB Price', 'SHIB'),
            ], {
                columns: 3
            })
        })
    }

    static async getPriceButton(ctx) {
        let coin = ctx.update.callback_query.data;
        let coinForUrl = coin.toLowerCase();
        await CoinService.getPrice(coin, coinForUrl, ctx)

    }

    static async getPrice(ctx) {
        let query = ctx.message.text.trim()
        let coin = query.split(" ")[1];
        let coinForUrl = coin.toLowerCase();
        await CoinService.getPrice(coin, coinForUrl, ctx)
    }

    static async getMinMaxPrice(ctx) {

        let query = ctx.message.text.trim()
        let coin = query.split(" ")[0];
        let maxPrice = query.split(" ")[1];
        let minPrice = query.split(" ")[2] || 0;
        let coinForUrl = coin.toLowerCase();
        await CoinService.getMinMaxPrice(ctx, query, coin, maxPrice, minPrice, coinForUrl);
    }

    static async getSentiment(ctx){
        
        await CoinService.getSentiment(ctx);
    }
}

module.exports = CoinController