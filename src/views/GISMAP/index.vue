<template>
  <div class="gisMap">
    <div id="glCanvas1">
      <button style="position: absolute;top: 0px; padding: 5px 10px; cursor: pointer; z-index: 1"
        @click="addModelBtn">添加设备</button>
      <button style="position: absolute;top: 40px; padding: 5px 10px; cursor: pointer; z-index: 1"
        @click="setRightMenu">右键菜单</button>
      <button style="position: absolute;top: 120px; padding: 5px 10px; cursor: pointer; z-index: 1"
        @click="showLayer">图层显示</button>
      <button style="position: absolute;top: 160px; padding: 5px 10px; cursor: pointer; z-index: 1"
        @click="hideLayer">图层隐藏</button>
    </div>
    <div id="glCanvas2">
      <button style="position: absolute;top: 40px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="drawPoints">画点</button>
      <button style="position: absolute;top: 160px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="showLayer">图层显示</button>
      <button style="position: absolute;top: 200px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="hideLayer">图层隐藏</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      value2d: false,
      value3d: true
    };
  },
  mounted() {
    this.initGis();
  },
  computed: {
    ...mapState({
      value23D: state => state.init.value23D,
      rangingNum: state => state.map.rangingNum
    })
  },
  watch: {
    value23D(val, oldVal) {
      if (val == true) {
        this.changeMap2d();
      } else {
        this.changeMap3d();
      }
    },
    rangingNum(val, oldVal) {
      if (val == 0) {
        this.measurePolyline()
      } else if (val == 1) {
        this.measurePolygon()
      } else if (val == 2) {
        this.clearAll()
      }
    }
  },
  methods: {
    initGis() {
      var cfg1 = {
        EngineIP: "http://115.236.87.26:9904/", //引擎访问地址（必填）
        dom: document.getElementById("glCanvas1"), //<body>标签中的div的ID（必填）
        key: "wSryzKApfH8y" //产品密钥（必填）
      };
      window.engine = new Engine(cfg1); //创建三维地图对象
      engine.open(); //打开三维地图

      engine.on("EngineFinish", () => {
        //添加图层
        engine.Api.Layers.addLayer({ objType: "FFDX_GEO_3DMODEL" });
      });

      //对象点击事件
      engine.on("MeshClick", (uuid, obj) => {
        console.log(obj);
        let vs = uuid.split(":");
        if (vs[0] == "FFDX_GEO_3DMODEL") {
          engine.Api.Pop.setPop(vs[0], vs[1], function(result) {
            result.innerText = uuid;
            result.style.color = "red";
          });
          engine.Api.Pop.show(vs[0], vs[1]);
        }

        if (window.addModel) {
          let data = JSON.parse(obj);
          console.log(data);
          engine.Api.Models.addModel("FFDX_GEO_3DMODEL", "Obj", {
            id: parseInt(Math.random() * 100 + 1, 10),
            jsType: "Models.Obj",
            shapes: [{ x: data.x, y: data.y, z: data.z, EPSGType: "4326" }],
            assetPath:
              "http://115.236.87.26:8000/lcjy/images/3DModel/Obj/test2.gisway"
          });
          window.addModel = false;
        }
      });

      //右键点击事件
      engine.on("MeshRightClick", uuid => {
        window.uuid = uuid;
      });

      let cfg2 = {
        dom: document.getElementById("glCanvas2"),
        key: "wSryzKApfH8y",
        EngineIP: "http://183.60.191.57:7002/", //引擎访问地址
        ResourcesIP: "http://183.60.191.57:8888/szgz/", //资源访问地址
        LookAt: { x: 120.21094304007175, y: 30.2542158154715 },
        castShadow: true,
        hideBGTile: false //是否隐藏底图切片（默认为true）
      };
      window.map = new MapGis(cfg2); //创建二维地图对象
      map.open(); //打开二维地图
      map.on("MapFinish", () => {});
    },
    addModelBtn() {
      window.addModel = true;
    },
    changeMap2d() {
      document.getElementById("glCanvas1").style.display = "none";
      document.getElementById("glCanvas2").style.display = "block";
      map.fireEvent("MapResize", map);
    },
    changeMap3d() {
      document.getElementById("glCanvas1").style.display = "block";
      document.getElementById("glCanvas2").style.display = "none";
      document.getElementById("btn1").style.display = "block";
      engine.fireEvent("EngineResize", engine);
    },
    delModel() {
      let vs = window.uuid.split(":");
      engine.Api.Models.delModel(vs[0], vs[1]);
      engine.Api.Pop.clearPop("FFDX_GEO_3DMODEL", vs[1]);
    },
    editModel() {
      let vs = window.uuid.split(":");
      engine.Api.MeshInfo.doEdit(vs[0], vs[1], {
        shapes: [
          {
            x: 121.88013965426454,
            y: 28.464585647653905,
            z: 44.705730438232422,
            EPSGType: "4326"
          }
        ]
      });
    },
    setRightMenu() {
      let ul = document.createElement("ul");
      ul.style.cssText = `list-style-type:none;margin:0;cursor:pointer;color:white;`;
      let li_1 = document.createElement("li");
      li_1.innerHTML = "删除设备";
      li_1.event = { type: "click", fn: this.delModel }; //li对象点击事件绑定delModel方法
      ul.appendChild(li_1);
      let li_2 = document.createElement("li");
      li_2.innerHTML = "编辑设备";
      li_2.event = { type: "click", fn: this.editModel }; //li对象点击事件绑定delModel方法
      ul.appendChild(li_2);
      engine.Api.Menus.setMenu("FFDX_GEO_3DMODEL", ul); //设置右键菜单，传入对象的objType和自定义菜单的html
    },
    showLayer() {
      engine.Api.Layers.showLayer("FFDX_GEO_3DMODEL", true);
    },
    hideLayer() {
      engine.Api.Layers.showLayer("FFDX_GEO_3DMODEL", false);
    },
    // 画点
    drawPoints() {
      //在地图上绘制一个点，在回调函数中我们可以拿到该点
      map.Api.Draws.drawPoint({}, function(data) {
        let p = data.point.clone().changeEPSGType("4326"); //将点转为经纬度坐标
        let label_data = {
          name: `我是新画的点`,
          fill_color: "ecedf0",
          font_color: "2e2f37",
          font_size: 14,
          font_face: "微软雅黑",
          align: "left"
        };
        let label = new map.Api.Type.Label(label_data, map, data.marker); //创建标签，将标签添加到绘制的点上
        data.marker.setLabel(label);
      });
    },
    // 测距
    measurePolyline() {
      let moveMarker;
      let cfg = {
        isTool: true,
        depthTest: false,
        color: "#FF4500",
        line_width: 2
      };
      map.Api.Draws.drawLine(cfg, function(data) {
        if (data && data.coordinate.drawObj) {
          let points = data.coordinate.drawObj.points; //线中的所有节点
          var length = 0;
          points.forEach((element, index) => {
            //计算相邻两个节点的距离
            if (index < points.length - 1) {
              length += points[index].distanceTo(points[index + 1]);
            }
          });
          let distance =
            length > 1000
              ? (length / 1000).toFixed(2) + "公里"
              : length.toFixed(2) + "米 <br>";
          let pos = points[points.length - 1].clone(); //在节点位置添加计算所得的结果
          let layer = data.markerLayer;
          if (data.type == "click") {
            let marker = new map.Api.Type.Models.Marker(
              {
                data: {
                  icon: "./images/default/point.png"
                },
                shapes: [pos]
              },
              map
            );
            let label = new map.Api.Type.Label(
              {
                name: distance,
                font_color: "ffffff",
                fill_color: "404b57",
                font_size: 12,
                NotSelect: true,
                align: "left"
              },
              map,
              marker
            );
            marker.setLabel(label);
            layer.add(marker);
            data.coordinate.markers.push(marker);
          } else if (data.type == "move") {
            //跟着鼠标一直移动的节点
            if (!moveMarker) {
              moveMarker = new map.Api.Type.Models.Marker(
                {
                  data: {
                    icon: "./images/default/point.png"
                  },
                  shapes: [pos]
                },
                map
              );
              let label = new map.Api.Type.Label(
                {
                  name: distance,
                  font_color: "ffffff",
                  fill_color: "404b57",
                  font_size: 12,
                  NotSelect: true,
                  align: "left"
                },
                map,
                moveMarker
              );
              moveMarker.setLabel(label);
              layer.add(moveMarker);
              data.coordinate.markers.push(moveMarker);
            } else {
              moveMarker.updateConfg({ name: distance });
              moveMarker.setPosition(pos);
            }
          } else if (data.type == "rightClick") {
            //右键结束
            layer.remove(moveMarker);
          }
        }
      });
    },
    // 测面积
    measurePolygon() {
      let areaMarker;
      let cfg = {
        isTool: true,
        depthTest: false,
        color: "#FF4500",
        line_width: 2
      };
      map.Api.Draws.drawPolygon(cfg, function(data) {
        let point = data.point;
        let layer = data.markerLayer;
        let result = map.Api.Measure.getArea(data.coordinate.drawObj.points);
        if (data.type == "move") {
          if (!areaMarker) {
            areaMarker = new map.Api.Type.Models.Marker(
              {
                data: {
                  name: result.area + result.unit,
                  font_color: "ffffff",
                  fill_color: "404b57",
                  font_size: 12,
                  NotSelect: true
                },
                shapes: [point]
              },
              map
            );
            layer.add(areaMarker);
            data.coordinate.markers.push(areaMarker);
          } else {
            areaMarker.updateConfg({ name: result.area + result.unit });
            areaMarker.setPosition(point);
          }
        } else if (data.type == "rightClick") {
          let point1 =
            data.coordinate.drawObj.points[
              data.coordinate.drawObj.points.length - 2
            ];
          if (areaMarker) {
            areaMarker.updateConfg({ name: result.area + result.unit });
            areaMarker.setPosition(point1);
            areaMarker.updateOffsetxy("65,2");
          }
        }
      });
    },
    clearAll() {
      map.Api.Draws.clear(); //清除地图上所有的绘制对象
    },
    // 图层隐藏
    showLayer() {
      //这里获取的图层是画点的那个markerLayer图层
      let layer = map.Api.Layers.getLayer("标注绘制图层");
      if (layer) {
        layer.setVisible(true);
      }
    },
    hideLayer() {
      let layer = map.Api.Layers.getLayer("标注绘制图层");
      if (layer) {
        layer.setVisible(false);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.gisMap {
  width: 100%;
  height: 100%;
  pointer-events: auto;
  #glCanvas1 {
    width: 100%;
    height: 100%;
    display: block;
  }
  #glCanvas2 {
    width: 100%;
    height: 100%;
    display: none;
  }
}
</style>
