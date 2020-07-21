function printReceipt(barcodes) {
    const goods = loadAllGoods();
    let decodeGoods = createDecodeGoodsInfo(barcodes,goods);
    let decodeGoodsReceipt = calculateDecodeGoodsReceipt(decodeGoods);
    let receipt = combineReceipt(decodeGoodsReceipt);
    console.log(receipt);
    return receipt;
    console.log(`
***<store earning no money>Receipt ***
Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
----------------------
Total: 23 (yuan)
**********************`)
}
//加载所有商品信息数据
function loadAllGoods(){
const goods = [
    {
       barcode: 'ITEM000000',
       name: 'Coca-Cola',
       price: 3
     },
     {
       barcode: 'ITEM000001',
       name: 'Sprite',
       price: 3
     },
     {
       barcode: 'ITEM000002',
       name: 'Apple',
       price: 5
     },
     {
       barcode: 'ITEM000003',
       name: 'Litchi',
       price: 15
     },
     {
       barcode: 'ITEM000004',
       name: 'Battery',
       price: 2
     },
     {
       barcode: 'ITEM000005',
       name: 'Instant Noodles',
       price: 4
     }
 ];
 return goods;
}
//创建被解码的商品信息列表
function createDecodeGoodsInfo(barcodes,goods){
    let decodeGoods = [];
    let barcodeMap = countSameBarcode(barcodes);
    let simpleBarcodes = [];
    //去重复
    for(let i = 0, len = barcodes.length; i < len; i++){
        if(barcodes.indexOf(barcodes[i]) != i){
            continue;
        }
        simpleBarcodes.push(barcodes[i]);
    }
    //获取被解码的商品信息列表
    for(let i = 0, len = simpleBarcodes.length; i < len; i++){
        let good = getDecodeGoodInfo(simpleBarcodes[i],goods);
        if(good){
            good.quantity = barcodeMap.get(good.barcode);
            decodeGoods.push(good);
        }
    }
    return decodeGoods;
}
// 统计同一商品数量
function countSameBarcode(barcodes){
    let barcodeMap = new Map();
    for(let i = 0, len = barcodes.length; i < len; i++){
        let barcodeValue = barcodeMap.get(barcodes[i]);
        if(barcodeValue){
            barcodeMap.set(barcodes[i],barcodeValue+1);
        }else{
            barcodeMap.set(barcodes[i],1);
        }
    }
    return barcodeMap;
}
// 获得被解码的商品信息
function getDecodeGoodInfo(barcode,goods){
    let good = null;
    for(let i = 0, len = goods.length; i < len; i++){
        good = goods[i];
        if(barcode == good.barcode){
            //找到该barcode对应的商品信息
            break;
        }
    }
    return good;
}
// 生成商品清单
function calculateDecodeGoodsReceipt(decodeGoods){
    let decodeGoodsReceipt = "";
    let total = 0;
    for(let i = 0, len = decodeGoods.length; i < len; i++){
        let subtotal = (decodeGoods[i].quantity * decodeGoods[i].price);
        total += subtotal;
        let str = "Name: " + decodeGoods[i].name 
        + ", Quantity: " + decodeGoods[i].quantity
        + ", Unit price: " +  decodeGoods[i].price
        + " (yuan), Subtotal: " + subtotal + " (yuan)\n";
        decodeGoodsReceipt += str;
    }
    decodeGoodsReceipt += "----------------------\nTotal: " + total + " (yuan)\n";
    return decodeGoodsReceipt;
}
// 组合清单
function combineReceipt(decodeGoodsReceipt){
    
    let receipt = "\n***<store earning no money>Receipt ***\n" + decodeGoodsReceipt + "**********************";
    return receipt;
}

module.exports = {
    printReceipt
};