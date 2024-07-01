export const propertyPrice = (price) => {
    return Number(price).toLocaleString('en', {
        style: 'currency',
        currency: 'USD',
    });
};