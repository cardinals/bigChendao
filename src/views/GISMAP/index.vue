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
    <div id="glCanvas2"></div>
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
      value23D: state => state.init.value23D
    })
  },
  watch: {
    value23D(val, oldVal) {
      if (val == true) {
        this.changeMap2d()
      } else {
        this.changeMap3d()
      }
    },
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
        EngineIP: "http://115.236.87.26:9004", //引擎访问地址
        ResourcesIP: "http://115.236.87.26:9999/xwyq/", //资源访问地址
        hideBGTile: false //是否隐藏底图切片（默认为true）
      };
      window.earth = new Earth(cfg2); //创建二维地图对象
      earth.open(); //打开二维地图
    },
    addModelBtn() {
      window.addModel = true;
    },
    changeMap2d() {
      document.getElementById("glCanvas1").style.display = "none";
      document.getElementById("glCanvas2").style.display = "block";
      earth.fireEvent("EarthResize", earth);
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
    }
  }
};
</script>

<style lang="less" scoped>
.gisMap {
  width: 100%;
  height: 100%;
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
