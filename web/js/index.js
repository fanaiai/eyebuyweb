var interval;
var des = ["黑龙江哈尔滨", "香港香港岛", "香港九龙", "韩国", "陕西西安", "陕西延安", "重庆", "辽宁鞍山", "辽宁铁岭", "辽宁葫芦岛", "辽宁沈阳", "辽宁大连", "贵州贵阳", "英国", "美国", "福建龙岩", "福建莆田", "福建福州", "福建漳州", "福建泉州", "福建厦门", "福建南平", "甘肃兰州", "澳大利亚", "湖南长沙", "湖南郴州", "湖北荆州", "湖北武汉", "湖北宜昌", "海外", "海南海口", "浙江金华", "浙江衢州", "浙江舟山", "浙江绍兴", "浙江湖州", "浙江温州", "浙江杭州", "浙江宁波", "浙江嘉兴", "浙江台州", "法国", "河南郑州", "河南漯河", "河南洛阳", "河南新乡", "河南开封", "河南平顶山", "河南安阳", "河南南阳", "河南信阳", "河北邢台", "河北衡水", "河北秦皇岛", "河北石家庄", "河北廊坊", "河北唐山", "河北保定", "江西赣州", "江西萍乡", "江西新余", "江西宜春", "江西吉安", "江西南昌", "江西九江", "江西上饶", "江苏连云港", "江苏苏州", "江苏无锡", "江苏徐州", "江苏常州", "江苏宿迁", "江苏南通", "江苏南京", "日本", "新疆克拉玛依", "意大利", "德国", "广西桂林", "广西南宁", "广东韶关", "广东深圳", "广东江门", "广东汕头", "广东揭阳", "广东惠州", "广东广州", "广东佛山", "广东中山", "广东东莞", "广东东沙", "山西长治", "山西大同", "山东青岛", "山东菏泽", "山东聊城", "山东潍坊", "山东济宁", "山东济南", "山东威海", "山东临沂", "安徽蚌埠", "安徽安庆", "安徽合肥", "天津", "四川成都", "吉林长春", "吉林延边朝鲜族", "吉林四平", "北京", "云南昆明", "上海", "america", "africa", "非洲", "撒哈拉", "东京", "briza", "spain", "canada1"]
    // des=['浙江','canada1',"新疆"]
    var features = [];
    var s = 0;

    function animatesource(dataset) {
        for (var i = 0; i < dataset.features.length; i++) {
        // if (dataset.features[i].center[1] < dataset.features[i].geometry.coordinates[1]) {
        //     dataset.features[i].geometry.coordinates[1] -= dataset.features[i].v;
        //     dataset.features[i].v += 1
        // } else {
            if (i + 1 >= des.length) {
                window.clearInterval(interval)
                map.removeLayer("point")
            }
            if (!map.getLayer("point" + i)) {
                map.addLayer({
                    "id": "point" + i,
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [dataset.features[i]]
                        }
                    },
                    "type": "circle",
                    "paint": {
                        "circle-radius": 5,
                        "circle-color": "#ff7cbf",
                        "circle-blur": 1
                    }
                });
            // map.addLayer({
            //     "id": "img" + i,
            //     "source": {
            //         "type": "geojson",
            //         "data": {
            //             "type": "FeatureCollection",
            //             "features": [dataset.features[i]]
            //         }
            //     },
            //     "type": "symbol",
            //     "layout": {
            //         "icon-image": "cat",
            //         "icon-size": 0.25
            //     }
            // });
            (function(i) {
                window.setInterval(function() {
                    if (map.getPaintProperty("point" + i, 'circle-blur') == 1) {
                        map.setPaintProperty("point" + i, 'circle-blur', 2);
                    } else {
                        map.setPaintProperty("point" + i, 'circle-blur', 1);
                    }
                })
            })(i)
        }
        // }
    }
    map.getSource('single-point').setData(dataset);

}
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFuYWlhaSIsImEiOiJjajQ1YXlrZWkxbnRyMzNydXRqMDZiYXEzIn0.ztl8K4ErFftucvDAaqDcpw';
var map = new mapboxgl.Map({
    container: 'map',
    minZoom: 0,
    zoom: 0,
    bearing: 0,
    renderWorldCopies: false,
    // pitch: 100,
    // maxBounds :new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]),
    zoom: 1,
    style: 'mystyle.json'
});
map.on('load', function() {
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        limit: 5,
        flyTo: false
    })
    map.loadImage('img/dot.gif', (error, image) => {
        if (error) throw error;
        map.addImage('cat', image);
    })
    map.addControl(geocoder);
    map.addSource('single-point', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    });

    map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
            "circle-radius": 2,
            "circle-color": "#ff7cbf"
        }
    });

    geocoder.query(des[s])
    geocoder.on('result', function(ev) {
        s++;
        // ev.result.geometry.coordinates[1] += 30
        ev.result.v = 0.5
        features.push(ev.result)
        if (s < des.length) {
            geocoder.query(des[s])
        }
    });
    // geocoder.on('loading', function(ev) {
    //     s++;
    //     if (s < des.length) {
    //         geocoder.query(des[s])
    //     }
    // });
    var dataset = {
        "type": "FeatureCollection",
        "features": features
    }
    interval = window.setInterval(function() {
        animatesource(dataset)
    }, 40)
});

$(function(){
$("#searchbtn").click(function(){
    var keyword=$("#search").val();
    $.ajax({
        type:'post',
        url:'http://localhost:5000/hello',
        data:{'keyword':keyword},
        success:function(d){
            console.log(d)
        }
    })
})
})
