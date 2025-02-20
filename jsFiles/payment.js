var Iyzipay = require('iyzipay');

var iyzipay = new Iyzipay({
    apiKey: "sandbox-afXhZPW0MQlE4dCUUlHcEopnMBgXnAZI",
    secretKey: "sandbox-wbwpzKIiplZxI3hh5ALI4FJyAcZKL6kq",
    uri: 'https://sandbox-api.iyzipay.com'
});

var request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    price: '1',
    paidPrice: '1.2',
    currency: Iyzipay.CURRENCY.TRY,
    basketId: 'B67832',
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: 'https://www.merchant.com/callback',
    enabledInstallments: [2, 3, 6, 9],
    buyer: {
        id: '***',
        name: 'Sena',
        surname: 'Aydin',
        gsmNumber: '+905330000000',
        email: 'sena@email.com',
        identityNumber: '74300864791',
        lastLoginDate: '2022-08-15 12:43:35',
        registrationDate: '2021-04-21 15:12:09',
        registrationAddress: 'address',
        ip: '85.34.78.112',
        city: 'city',
        country: 'Turkey',
        zipCode: '34732'
    },
    shippingAddress: {
        contactName: 'Sena Aydin',
        city: 'city',
        country: 'Turkey',
        address: 'address',
        zipCode: '34742'
    },
    billingAddress: {
        contactName: 'Sena Aydin',
        city: 'city',
        country: 'Turkey',
        address: 'address',
        zipCode: '34742'
    },
    basketItems: [
        {
            id: 26,
            name: "PORSCHE WHITE",
            price: 45.90,
            type: "CAR-BACK"
        },
        {
        id: 22,
        name: "FERRARI BACK",
        price: 28.90,
        type: "CAR-BACK"
        },
        {
            id: 11,
            name: "NISSAN",
            price: 52.29,
            type: "WHEELS"
        }
    ]
};

iyzipay.checkoutFormInitialize.create(request, function (err, result) {
    //console.log(result);
    console.log(result.checkoutFormContent +
        '<div id="iyzipay-checkout-form" class="responsive"></div>');
 });
