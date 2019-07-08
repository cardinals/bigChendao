<template>
  <div class="gisMap">
    <div id="glCanvas1">
      <!--三维地图DIV-->
      <button style="position: absolute;top: 0px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="addModel">添加设备</button>
      <button style="position: absolute;top: 40px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="editModel">修改设备</button>
      <button style="position: absolute;top: 80px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="deleteModel">删除设备</button>
      <button style="position: absolute;top: 120px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="changeModelState">改变模型状态</button>
      <button style="position: absolute;top: 160px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="resetModelState">还原模型状态</button>
      <button style="position: absolute;top: 200px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="showLayer3D(true)">图层显示</button>
      <button style="position: absolute;top: 240px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="showLayer3D(false)">图层隐藏</button>
      <button style="position: absolute;top: 360px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="flyToPoint3D">定位</button>
      <!-- <button style="position: absolute;top: 400px; padding: 5px 10px; cursor: pointer; z-index: 1"
          onclick="flyToLine3D()">漫游</button> -->
      <!-- <button style="position: absolute;top: 440px; padding: 5px 10px; cursor: pointer; z-index: 1"
          onclick="hotMap3D()">热力图</button> -->
      <button style="position: absolute;top: 400px; padding: 5px 10px; cursor: pointer; z-index: 1"
        @click="changeMap">切换到二维</button>
      <button style="position: absolute;top: 40px; padding: 5px 10px; cursor: pointer; z-index: 1"
        @click="setRightMenu">右键菜单</button>
      
    </div>
    <div id="glCanvas2">
      <!-- <button style="position: absolute;top: 40px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="drawPoints">画点</button>-->

      <!--二维地图DIV-->
      <button style="position: absolute;top: 0px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="addMarker">添加marker</button>
      <button style="position: absolute;top: 40px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="deleteMarker">删除marker</button>
      <button style="position: absolute;top: 80px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="showLayer2D(true)">图层显示</button>
      <button style="position: absolute;top: 120px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="showLayer2D(false)">图层隐藏</button>
      <button style="position: absolute;top: 160px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="flyToPoint2D">定位</button>
      <!--<button style="position: absolute;top: 200px; padding: 5px 10px; cursor: pointer; z-index: 1"
          onclick="hotMap2D()">热力图</button>-->
      <button style="position: absolute;top: 240px; padding: 5px 10px; cursor: pointer; z-index: 1"
          @click="changeMap">切换到三维</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { parse } from "path";
export default {
  data() {
    return {
      value23d: false
    };
  },
  mounted() {
    this.initGis();
  },
  computed: {
    ...mapState({
      value23D: state => state.init.value23D,
      rangingNum: state => state.map.rangingNum,
      BigOrLitNumber: state => state.map.bigOrLitNum
    })
  },
  watch: {
    value23D(val, oldVal) {
      if (val == true) {
        this.value23d = val
        this.changeMap2d();
      } else {
        this.value23d = val
        this.changeMap3d();
      }
    },
    rangingNum(val, oldVal) {
      if (val == 0) {
        this.measurePolyline();
      } else if (val == 1) {
        this.measurePolygon();
      } else if (val == 2) {
        this.clearAll();
      }
    },
    BigOrLitNumber(val, oldVal) {
      if (val == 0 && this.value23d == true) {
        this.zoom2D(true)
        this.$store.dispatch("triggerBigOrLit", null)
      } else if (val == 1 && this.value23d == true) {
        this.zoom2D(false)
        this.$store.dispatch("triggerBigOrLit", null)
      } else if (val == 0 && this.value23d == false) {
        this.zoom3D(true)
        this.$store.dispatch("triggerBigOrLit", null)
      } else if (val == 1 && this.value23d == false) {
        this.zoom3D(false)
        this.$store.dispatch("triggerBigOrLit", null)
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

      let arrayModel = [
        {
          id: "1",
          x: 121.86425426983708,
          y: 28.446380495447645,
          z: 214.41484451293945
        },
        {
          id: "2",
          x: 121.86428426983708,
          y: 28.445480495447645,
          z: 214.81484451293945
        },
        {
          id: "3",
          x: 121.86598426983708,
          y: 28.446980495447645,
          z: 214.81484451293945
        },
        {
          id: "4",
          x: 121.83598426983708,
          y: 28.426980495447645,
          z: 214.81484451293945
        },
        {
          id: "5",
          x: 121.8668426983708,
          y: 28.447980495447645,
          z: 214.81484451293945
        }
      ];
      engine.on("EngineFinish", () => {
        //添加图层,在图层添加的回调方法中进行模型的添加
        engine.Api.Layers.addLayer({ objType: "FFDX_GEO_3DMODEL" }, function(
          data
        ) {
          arrayModel.forEach(element => {
            engine.Api.Models.addModel(
              data,
              "Obj",
              {
                id: element.id,
                jsType: "Models.Obj",
                shapes: [
                  { x: element.x, y: element.y, z: element.z, EPSGType: "4326" }
                ],
                assetPath:
                  "http://115.236.87.26:8000/lcjy/images/3DModel/Obj/test2.gisway"
              },
              () => {
                //在模型添加的回调中进行气泡的设置并显示
                engine.Api.Pop.setPop(data, element.id, function(result) {
                  let div = document.createElement("div");
                  div.textContent = "我是气泡" + element.id;
                  div.style.cssText = `
                                color:red;
                                background:black;
                                height:30px;
                                line-height:30px;
                            `;
                  result.appendChild(div);
                });
                engine.Api.Pop.display(data, element.id); //在地图上显示多个气泡用display方法，始终只显示单个气泡用show方法
              }
            );
          });
        });
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

      map.on("MapFinish", () => {
        markerLayer = map.Api.Layers.getLayer("marker图层"); //二维marker图层
        let layerControl = map.getControl("LayerControl");
        if (!markerLayer) {
          markerLayer = new map.Api.Layers.MarkerLayer(
            { objType: "marker图层" },
            map
          );
          layerControl.addLayer(markerLayer);
        }
      });

      map.on("MeshClick", e => {
        //点击marker弹出窗口
        console.log(e);
        let div = document.createElement("div");
        div.textContent = "我是弹出窗口";
        div.style.cssText = `
            width:300px;
            height:200px;
            background:#000000;
            color:#FFFFFF;
            position:absolute;
            top:0px;
            right:0px;
            z-index:999;
            line-height:200px;
            text-align:center;
        `;
        document.body.appendChild(div);
      });
    },
    initMarker() {
      let marker_arr = [
        { id: "10", x: 120.20899039190837, y: 30.25377328887613, z: 0 },
        { id: "11", x: 120.2103851405965, y: 30.25532096480706, z: 0 },
        { id: "12", x: 120.21238606852216, y: 30.254917830012005, z: 0 },
        { id: "13", x: 120.21303516310394, y: 30.25361110585507, z: 0 },
        { id: "14", x: 120.21239679735824, y: 30.252911398894618, z: 0 },
        { id: "15", x: 120.21081965845704, y: 30.254042048721498, z: 0 }
      ];

      marker_arr.forEach(element => {
        let point = new map.Api.Type.Point(element.x, element.y, element.z);
        let marker = new map.Api.Type.Models.Marker(
          {
            data: {
              id: element.id,
              icon: "./images/default/point.png"
            },
            shapes: [point]
          },
          map
        );
        let label = new map.Api.Type.Label(
          {
            name: `我是设备点` + element.id,
            fill_color: "ecedf0",
            font_color: "2e2f37",
            font_size: 14,
            font_face: "微软雅黑",
            align: "left"
          },
          map,
          marker
        );
        marker.setLabel(label);
        markerLayer.add(marker);
      });
    },
    addModel() {
      engine.Api.Models.addModel(
        "FFDX_GEO_3DMODEL",
        "Obj",
        {
          id: "6",
          jsType: "Models.Obj",
          shapes: [
            {
              x: 121.8638426983708,
              y: 28.441980495447645,
              z: 214.81484451293945,
              EPSGType: "4326"
            }
          ],
          assetPath:
            "http://115.236.87.26:8000/lcjy/images/3DModel/Obj/test2.gisway"
        },
        () => {
          //在模型添加的回调中进行气泡的设置并显示
          engine.Api.Pop.setPop("FFDX_GEO_3DMODEL", "6", function(result) {
            let div = document.createElement("div");
            div.textContent = "我是新增模型对象";
            div.style.cssText = `
                                color:red;
                                background:black;
                                height:30px;
                                line-height:30px;
                            `;
            result.appendChild(div);
          });
          engine.Api.Pop.display("FFDX_GEO_3DMODEL", "6"); //在地图上显示多个气泡用display方法，始终只显示单个气泡用show方法
        }
      );
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
    deleteModel() {
      engine.Api.Models.delModel("FFDX_GEO_3DMODEL", "6");
    },
    editModel() {
      engine.Api.Pop.clearPop("FFDX_GEO_3DMODEL", "6");
      engine.Api.MeshInfo.doEdit("FFDX_GEO_3DMODEL", "6", {
        shapes: [
          {
            x: 121.8638426983708,
            y: 28.441980495447645,
            z: 414.81484451293945,
            EPSGType: "4326"
          }
        ]
      });
    },
    changeModelState() {
      engine.Api.Pop.clearPop("FFDX_GEO_3DMODEL", "2");
      engine.Api.MeshInfo.changeColor("FFDX_GEO_3DMODEL", "2", "FF0000");
    },
    resetModelState() {
      engine.Api.MeshInfo.restColor("FFDX_GEO_3DMODEL", "2");
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
    showLayer3D(show) {
      if (show == true) {
        engine.Api.Layers.showLayer("FFDX_GEO_3DMODEL", true);
      } else if (show == false) {
        engine.Api.Layers.showLayer("FFDX_GEO_3DMODEL", false);
      }
    },
    zoom3D(wheel) {
      if (wheel == true) {
        engine.Api.Camera.zoom(true);
      } else if (wheel == false) {
        engine.Api.Camera.zoom(false);
      }
    },
    flyToPoint3D() {
      engine.Api.Camera.lookAt("FFDX_GEO_3DMODEL", "4", false);
    },
    flyToLine3D() {},
    addMarker() {
      let point = new map.Api.Type.Point(
        120.21096986216192,
        30.252517521923203,
        0
      );
      let marker = new map.Api.Type.Models.Marker(
        {
          data: {
            id: "16",
            icon: "./images/default/point.png"
          },
          shapes: [point]
        },
        map
      );
      let label = new map.Api.Type.Label(
        {
          name: `我是新增的点`,
          fill_color: "ecedf0",
          font_color: "2e2f37",
          font_size: 14,
          font_face: "微软雅黑",
          align: "left"
        },
        map,
        marker
      );
      marker.setLabel(label);
      markerLayer.add(marker);
    },
    deleteMarker() {
      let m = markerLayer.getModel("16");
      markerLayer.remove(m);
    },
    showLayer2D(show) {
      //这里获取的图层是画点的那个markerLayer图层
      let layer = map.Api.Layers.getLayer("marker图层");
      if (layer) {
        if (show == true) {
          layer.setVisible(true);
        } else if (show == false) {
          layer.setVisible(false);
        }
      }
    },
    zoom2D(wheel) {
      if (wheel == true) {
        let wheelEvent = new WheelEvent("syntheticWheel", {
          deltaY: -33.33333206176758,
          deltaMode: 0
        });
        map.fireEvent("MouseWheel", wheelEvent, map);
      } else if (wheel == false) {
        let wheelEvent = new WheelEvent("syntheticWheel", {
          deltaY: 33.33333206176758,
          deltaMode: 0
        });
        map.fireEvent("MouseWheel", wheelEvent, map);
      }
    },

    flyToPoint2D() {
      map.Api.Camera.lookAt("marker图层", "10", false);
    },

    drawPoints() {
      //在地图上绘制一个点，在回调函数中我们可以拿到该点
      map.Api.Draws.drawPoint({}, function(data) {
        let p = data.point.clone().changeEPSGType("4326"); //将点转为经纬度坐标
        console.log(p);
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
    },
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
